#!/usr/bin/env node

import { appendFile, lstat, mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import process from "node:process";

import {
  LEDGER_SCHEMA,
  RECEIPT_SCHEMA,
  controllerIdentity,
  parseControllerReceipts,
  stableJson,
  validateRouteCard,
} from "./playtest_controller_core.mjs";

function valueAfter(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1 || !process.argv[index + 1]) throw new Error(`missing ${flag}`);
  return process.argv[index + 1];
}

function optionalValueAfter(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1) return null;
  if (!process.argv[index + 1]) throw new Error(`missing value after ${flag}`);
  return process.argv[index + 1];
}

function exactIdentity(left, right) {
  return stableJson(left) === stableJson(right);
}

async function refuseSymlink(path) {
  try {
    if ((await lstat(path)).isSymbolicLink()) throw new Error(`ledger cannot be a symlink: ${path}`);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

async function readLedger(path) {
  try {
    return (await readFile(path, "utf8")).split(/\r?\n/).filter((line) => line.trim() !== "").map(JSON.parse);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

function selectReceipt(records, expected) {
  const matches = records.filter((record) => {
    if (expected.kind === "preflight") return record.kind === "preflight";
    return record.kind === "transaction"
      && record.transactionId === expected.transactionId
      && record.phase === expected.phase;
  });
  if (matches.length === 0) throw new Error(`snapshot contains no ${expected.key} receipt`);
  const canonical = stableJson(matches[0]);
  if (matches.some((record) => stableJson(record) !== canonical)) {
    throw new Error(`snapshot contains conflicting receipts for ${expected.key}`);
  }
  return matches[0];
}

function validateSelectedReceipt(receipt, expected, validation) {
  const controller = controllerIdentity();
  if (receipt.schema !== RECEIPT_SCHEMA) throw new Error(`unsupported receipt schema: ${receipt.schema}`);
  if (!exactIdentity(receipt.controller, controller)) throw new Error(`${expected.key} controller identity mismatch`);
  if (expected.kind === "preflight") return;

  const transaction = validation.card.transactions.find((candidate) => candidate.id === expected.transactionId);
  if (receipt.cardSha256 !== validation.cardSha256) throw new Error(`${expected.key} card identity mismatch`);
  if (receipt.stage !== transaction.stage) throw new Error(`${expected.key} stage mismatch`);
  const action = expected.phase === "main" ? transaction.action : transaction.recovery.action;
  if (receipt.actionType !== action.type) throw new Error(`${expected.key} action mismatch`);
}

function expectedReceipt(validation) {
  const preflight = process.argv.includes("--preflight");
  const transactionIndex = process.argv.indexOf("--transaction");
  if (preflight === (transactionIndex !== -1)) throw new Error("choose exactly one of --preflight or --transaction <ID>");
  if (preflight) return { kind: "preflight", key: "preflight" };

  const transactionId = valueAfter("--transaction");
  const transaction = validation.card.transactions.find((candidate) => candidate.id === transactionId);
  if (!transaction) throw new Error(`unknown transaction ${transactionId}`);
  const phase = process.argv.includes("--recovery") ? "recovery" : "main";
  if (phase === "recovery" && !transaction.recovery) throw new Error(`transaction ${transactionId} has no recovery`);
  return { kind: "transaction", transactionId, phase, key: `${transactionId}:${phase}` };
}

function validateBinding(binding, expected) {
  if (binding.schema !== LEDGER_SCHEMA || binding.kind !== "binding") throw new Error("ledger has no valid binding header");
  for (const field of ["runId", "browserId", "cardPath", "cardSha256"]) {
    if (binding[field] !== expected[field]) throw new Error(`ledger ${field} mismatch`);
  }
  if (!exactIdentity(binding.controller, expected.controller)) throw new Error("ledger controller identity mismatch");
}

async function main() {
  const consoleLog = resolve(valueAfter("--console-log"));
  const ledger = resolve(valueAfter("--ledger"));
  await refuseSymlink(ledger);
  const existing = await readLedger(ledger);
  const existingBinding = existing[0];
  const suppliedCard = optionalValueAfter("--card");
  const suppliedRunId = optionalValueAfter("--run-id");
  const suppliedBrowserId = optionalValueAfter("--browser-id");

  if (existing.length === 0 && (!suppliedCard || !suppliedRunId || !suppliedBrowserId)) {
    throw new Error("a new ledger requires --card, --run-id, and --browser-id");
  }
  if (existing.length > 0 && (existingBinding?.schema !== LEDGER_SCHEMA || existingBinding?.kind !== "binding")) {
    throw new Error("ledger has no valid binding header");
  }
  if (existing.length > 0 && (
    typeof existingBinding.cardPath !== "string"
    || typeof existingBinding.runId !== "string"
    || typeof existingBinding.browserId !== "string"
  )) {
    throw new Error("ledger binding metadata is malformed");
  }

  const cardPath = resolve(existing.length === 0 ? suppliedCard : existingBinding.cardPath);
  const runId = existing.length === 0 ? suppliedRunId : existingBinding.runId;
  const browserId = existing.length === 0 ? suppliedBrowserId : existingBinding.browserId;
  const validation = validateRouteCard(JSON.parse(await readFile(cardPath, "utf8")));
  const expected = expectedReceipt(validation);
  const receipt = selectReceipt(parseControllerReceipts(await readFile(consoleLog, "utf8")), expected);
  validateSelectedReceipt(receipt, expected, validation);

  const binding = {
    schema: LEDGER_SCHEMA,
    kind: "binding",
    runId,
    browserId,
    cardPath,
    cardSha256: validation.cardSha256,
    controller: controllerIdentity(),
  };
  if (existing.length > 0) {
    validateBinding(existingBinding, binding);
    if (suppliedCard && resolve(suppliedCard) !== cardPath) throw new Error("supplied card does not match ledger binding");
    if (suppliedRunId && suppliedRunId !== runId) throw new Error("supplied runId does not match ledger binding");
    if (suppliedBrowserId && suppliedBrowserId !== browserId) throw new Error("supplied browserId does not match ledger binding");
  } else {
    await mkdir(dirname(ledger), { recursive: true });
  }

  const receiptKey = (record) => record.kind === "preflight" ? "preflight" : `${record.transactionId}:${record.phase}`;
  const persisted = existing.slice(1).filter((record) => receiptKey(record) === expected.key);
  if (persisted.length > 0) {
    if (persisted.length === 1 && stableJson(persisted[0]) === stableJson(receipt)) {
      console.log(JSON.stringify({ result: "already-persisted", key: expected.key, ledger }, null, 2));
      return;
    }
    throw new Error(`ledger contains conflicting receipt for ${expected.key}`);
  }

  const records = existing.length === 0 ? [binding, receipt] : [receipt];
  await appendFile(ledger, `${records.map((record) => JSON.stringify(record)).join("\n")}\n`, { encoding: "utf8", mode: 0o600 });
  console.log(JSON.stringify({ result: "persisted", key: expected.key, ledger }, null, 2));
}

main().catch((error) => {
  console.error(`persist-controller-receipt: ${error.message}`);
  process.exitCode = 2;
});
