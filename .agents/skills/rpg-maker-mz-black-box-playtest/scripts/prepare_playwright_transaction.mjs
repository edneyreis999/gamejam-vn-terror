#!/usr/bin/env node

import { lstat, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import process from "node:process";

import { makeTransactionRunnerSource } from "./playtest_controller_core.mjs";

function valueAfter(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1 || !process.argv[index + 1]) throw new Error(`missing ${flag}`);
  return process.argv[index + 1];
}

async function refuseSymlink(path) {
  try {
    if ((await lstat(path)).isSymbolicLink()) throw new Error(`output cannot be a symlink: ${path}`);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

async function main() {
  const cardPath = resolve(valueAfter("--card"));
  const transactionId = valueAfter("--transaction");
  const phase = process.argv.includes("--recovery") ? "recovery" : "main";
  const output = resolve(valueAfter("--output"));
  const card = JSON.parse(await readFile(cardPath, "utf8"));
  const source = makeTransactionRunnerSource({ card, transactionId, phase });
  await mkdir(dirname(output), { recursive: true });
  await refuseSymlink(output);
  await writeFile(output, `${source}\n`, { encoding: "utf8", mode: 0o600 });
  console.log(JSON.stringify({ result: "prepared", kind: "transaction", transactionId, phase, output }, null, 2));
}

main().catch((error) => {
  console.error(`prepare-playwright-transaction: ${error.message}`);
  process.exitCode = 2;
});
