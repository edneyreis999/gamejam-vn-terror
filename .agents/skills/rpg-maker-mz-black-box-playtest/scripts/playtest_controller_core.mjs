import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const CARD_SCHEMA = "rpg-maker-mz-route-card/v2";
export const RECEIPT_SCHEMA = "rpg-maker-mz-controller-receipt/v2";
export const LEDGER_SCHEMA = "rpg-maker-mz-controller-receipt-ledger/v1";
export const RECEIPT_PREFIX = "__RPG_MAKER_PLAYTEST_RECEIPT__";
export const CONTROLLER_NAME = "rpg-maker-mz-playtest-controller";
export const CONTROLLER_VERSION = "1.3.0";

const SCRIPT_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const CONTROLLER_IDENTITY_FILES = [
  "playtest_controller_core.mjs",
  "prepare_playwright_preflight.mjs",
  "prepare_playwright_transaction.mjs",
  "persist_controller_receipt.mjs",
];
const DIRECTIONS = new Set(["up", "down", "left", "right"]);
const MENU_INPUTS = new Set(["up", "down", "left", "right", "confirm", "cancel"]);
const ACTION_TYPES = new Set(["focusCanvas", "move", "interact", "advanceDialogue", "navigateMenu"]);
const TRANSACTION_STAGES = new Set(["setup", "route"]);
const MAX_INPUT_COUNT = 10_000;
const DIALOGUE_GAP_FRAMES = 120;

function fail(path, message) {
  throw new Error(`${path}: ${message}`);
}

function objectAt(value, path) {
  if (!value || typeof value !== "object" || Array.isArray(value)) fail(path, "must be an object");
  return value;
}

function textAt(value, path) {
  if (typeof value !== "string" || value.trim() === "") fail(path, "must be non-empty text");
  return value;
}

function positiveIntegerAt(value, path) {
  if (!Number.isSafeInteger(value) || value < 1 || value > MAX_INPUT_COUNT) {
    fail(path, `must be an integer from 1 to ${MAX_INPUT_COUNT}`);
  }
  return value;
}

function arrayAt(value, path) {
  if (!Array.isArray(value) || value.length === 0) fail(path, "must be a non-empty array");
  return value;
}

function exactKeys(value, allowed, path) {
  const extras = Object.keys(value).filter((key) => !allowed.includes(key));
  if (extras.length) fail(path, `contains unsupported fields: ${extras.join(", ")}`);
}

function validateAction(raw, path) {
  const action = objectAt(raw, path);
  const type = textAt(action.type, `${path}.type`);
  if (!ACTION_TYPES.has(type)) fail(`${path}.type`, `unsupported action type ${type}`);

  if (type === "focusCanvas" || type === "interact") {
    exactKeys(action, ["type"], path);
    return { type };
  }

  if (type === "advanceDialogue") {
    exactKeys(action, ["type", "confirms"], path);
    return { type, confirms: positiveIntegerAt(action.confirms, `${path}.confirms`) };
  }

  if (type === "navigateMenu") {
    exactKeys(action, ["type", "inputs"], path);
    const inputs = arrayAt(action.inputs, `${path}.inputs`).map((input, index) => {
      const control = textAt(input, `${path}.inputs[${index}]`);
      if (!MENU_INPUTS.has(control)) fail(`${path}.inputs[${index}]`, `unsupported menu input ${control}`);
      return control;
    });
    return { type, inputs };
  }

  exactKeys(action, ["type", "dash", "runs"], path);
  if (typeof action.dash !== "boolean") fail(`${path}.dash`, "must be boolean");
  const runs = arrayAt(action.runs, `${path}.runs`).map((rawRun, index) => {
    const run = objectAt(rawRun, `${path}.runs[${index}]`);
    exactKeys(run, ["direction", "count"], `${path}.runs[${index}]`);
    const direction = textAt(run.direction, `${path}.runs[${index}].direction`);
    if (!DIRECTIONS.has(direction)) fail(`${path}.runs[${index}].direction`, `unsupported direction ${direction}`);
    return { direction, count: positiveIntegerAt(run.count, `${path}.runs[${index}].count`) };
  });
  return { type, dash: action.dash, runs };
}

export function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function controllerIdentity() {
  const sourceBundle = CONTROLLER_IDENTITY_FILES
    .map((filename) => `${filename}\0${readFileSync(join(SCRIPT_DIRECTORY, filename), "utf8")}`)
    .join("\0");
  return { name: CONTROLLER_NAME, version: CONTROLLER_VERSION, sha256: sha256(sourceBundle) };
}

function validateController(raw) {
  const controller = objectAt(raw, "controller");
  exactKeys(controller, ["name", "version", "sha256"], "controller");
  const expected = controllerIdentity();
  for (const field of ["name", "version", "sha256"]) {
    const actual = textAt(controller[field], `controller.${field}`);
    if (actual !== expected[field]) fail(`controller.${field}`, `expected ${expected[field]}, received ${actual}`);
  }
  return expected;
}

export function validateRouteCard(raw) {
  const card = objectAt(raw, "card");
  exactKeys(
    card,
    ["schema", "revision", "target", "build", "entry", "controller", "assistedProvenance", "checkpoints", "transactions"],
    "card",
  );
  if (card.schema !== CARD_SCHEMA) fail("card.schema", `expected ${CARD_SCHEMA}`);
  positiveIntegerAt(card.revision, "card.revision");
  textAt(card.target, "card.target");

  const build = objectAt(card.build, "card.build");
  exactKeys(build, ["identity", "validityConditions"], "card.build");
  textAt(build.identity, "card.build.identity");
  arrayAt(build.validityConditions, "card.build.validityConditions").forEach((item, index) =>
    textAt(item, `card.build.validityConditions[${index}]`),
  );

  const entry = objectAt(card.entry, "card.entry");
  exactKeys(entry, ["public", "reset", "startGuard", "finishGuard", "rejectingOracle"], "card.entry");
  for (const field of ["public", "reset", "startGuard", "finishGuard", "rejectingOracle"]) {
    textAt(entry[field], `card.entry.${field}`);
  }

  validateController(card.controller);
  arrayAt(card.assistedProvenance, "card.assistedProvenance").forEach((item, index) =>
    textAt(item, `card.assistedProvenance[${index}]`),
  );

  const checkpointIds = new Set();
  const filenames = new Set();
  arrayAt(card.checkpoints, "card.checkpoints").forEach((rawCheckpoint, index) => {
    const path = `card.checkpoints[${index}]`;
    const checkpoint = objectAt(rawCheckpoint, path);
    exactKeys(checkpoint, ["id", "guard", "filename"], path);
    const id = textAt(checkpoint.id, `${path}.id`);
    if (checkpointIds.has(id)) fail(`${path}.id`, `duplicate checkpoint ${id}`);
    checkpointIds.add(id);
    textAt(checkpoint.guard, `${path}.guard`);
    const filename = textAt(checkpoint.filename, `${path}.filename`);
    if (!/^[A-Za-z0-9][A-Za-z0-9._-]*\.png$/.test(filename)) {
      fail(`${path}.filename`, "must be one safe PNG basename");
    }
    if (filenames.has(filename)) fail(`${path}.filename`, `duplicate evidence filename ${filename}`);
    filenames.add(filename);
  });

  const transactionIds = new Set();
  const transactions = arrayAt(card.transactions, "card.transactions").map((rawTransaction, index) => {
    const path = `card.transactions[${index}]`;
    const transaction = objectAt(rawTransaction, path);
    exactKeys(transaction, ["id", "stage", "precondition", "action", "postcondition", "checkpointId", "recovery"], path);
    const id = textAt(transaction.id, `${path}.id`);
    if (transactionIds.has(id)) fail(`${path}.id`, `duplicate transaction ${id}`);
    transactionIds.add(id);
    const stage = textAt(transaction.stage, `${path}.stage`);
    if (!TRANSACTION_STAGES.has(stage)) fail(`${path}.stage`, "must be setup or route");
    const validated = {
      id,
      stage,
      precondition: textAt(transaction.precondition, `${path}.precondition`),
      action: validateAction(transaction.action, `${path}.action`),
      postcondition: textAt(transaction.postcondition, `${path}.postcondition`),
    };
    if (transaction.checkpointId !== undefined) {
      const checkpointId = textAt(transaction.checkpointId, `${path}.checkpointId`);
      if (!checkpointIds.has(checkpointId)) fail(`${path}.checkpointId`, `unknown checkpoint ${checkpointId}`);
      validated.checkpointId = checkpointId;
    }
    if (transaction.recovery !== undefined) {
      const recovery = objectAt(transaction.recovery, `${path}.recovery`);
      exactKeys(recovery, ["guard", "action"], `${path}.recovery`);
      validated.recovery = {
        guard: textAt(recovery.guard, `${path}.recovery.guard`),
        action: validateAction(recovery.action, `${path}.recovery.action`),
      };
    }
    return validated;
  });

  const normalized = {
    schema: CARD_SCHEMA,
    revision: card.revision,
    target: card.target,
    build,
    entry,
    controller: controllerIdentity(),
    assistedProvenance: card.assistedProvenance,
    checkpoints: card.checkpoints,
    transactions,
  };
  return { card: normalized, cardSha256: sha256(stableJson(normalized)) };
}

function runnerPreamble() {
  return `
    const RECEIPT_SCHEMA = ${JSON.stringify(RECEIPT_SCHEMA)};
    const RECEIPT_PREFIX = ${JSON.stringify(RECEIPT_PREFIX)};
    const controller = ${JSON.stringify(controllerIdentity())};
    const errorText = (error) => error instanceof Error ? error.message : String(error);
    const emitReceipt = async (receipt) => {
      try {
        await page.evaluate(({ prefix, value }) => console.info(prefix + JSON.stringify(value)), {
          prefix: RECEIPT_PREFIX,
          value: receipt,
        });
        return { status: "emitted" };
      } catch (error) {
        return { status: "invalid", error: errorText(error) };
      }
    };
  `;
}

export function makePreflightRunnerSource() {
  return `async (page) => {
    ${runnerPreamble()}
    const timestamps = await page.evaluate((count) => new Promise((resolve) => {
      const values = [];
      const sample = (timestamp) => {
        values.push(timestamp);
        if (values.length === count) resolve(values);
        else requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    }), 12);
    const deltas = timestamps.slice(1).map((value, index) => value - timestamps[index]);
    const sorted = [...deltas].sort((left, right) => left - right);
    const medianMs = sorted[Math.floor(sorted.length / 2)];
    const jitterMs = Math.max(...deltas) - Math.min(...deltas);
    const valid = deltas.length === 11 && deltas.every((value) => Number.isFinite(value) && value > 0);
    const receipt = {
      schema: RECEIPT_SCHEMA,
      kind: "preflight",
      controller,
      preflight: { status: valid ? "valid" : "invalid" },
      cadence: { samples: deltas.length, medianMs, jitterMs },
    };
    const telemetry = await emitReceipt(receipt);
    return { ...receipt, telemetry };
  }`;
}

export function makeTransactionRunnerSource({ card, transactionId, phase = "main" }) {
  const validation = validateRouteCard(card);
  const validated = validation.card;
  textAt(transactionId, "transactionId");
  if (!new Set(["main", "recovery"]).has(phase)) fail("phase", "must be main or recovery");
  const transaction = validated.transactions.find((candidate) => candidate.id === transactionId);
  if (!transaction) fail("transactionId", `unknown transaction ${transactionId}`);
  if (phase === "recovery" && !transaction.recovery) fail("phase", `transaction ${transactionId} has no recovery`);
  const action = phase === "main" ? transaction.action : transaction.recovery.action;

  return `async (page) => {
    ${runnerPreamble()}
    const action = ${JSON.stringify(action)};
    const cardSha256 = ${JSON.stringify(validation.cardSha256)};
    const transactionId = ${JSON.stringify(transactionId)};
    const stage = ${JSON.stringify(transaction.stage)};
    const phase = ${JSON.stringify(phase)};
    const keyMap = {
      up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight",
      confirm: "Enter", cancel: "Escape"
    };
    const releasable = ["Shift", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", "Escape"];
    const waitFrames = async (count) => page.evaluate((frameCount) => new Promise((resolve) => {
      let remaining = frameCount;
      const step = () => {
        remaining -= 1;
        if (remaining <= 0) resolve();
        else requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }), count);
    const cadenceTimestamps = await page.evaluate((count) => new Promise((resolve) => {
      const values = [];
      const sample = (timestamp) => {
        values.push(timestamp);
        if (values.length === count) resolve(values);
        else requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    }), 8);
    const cadenceDeltas = cadenceTimestamps.slice(1).map((value, index) => value - cadenceTimestamps[index]);
    const sortedCadence = [...cadenceDeltas].sort((left, right) => left - right);
    const cadenceValid = cadenceDeltas.length === 7 && cadenceDeltas.every((value) => Number.isFinite(value) && value > 0);
    const medianFrameMs = cadenceValid ? sortedCadence[Math.floor(sortedCadence.length / 2)] : null;
    const pulseFrames = cadenceValid ? Math.max(2, Math.round(120 / medianFrameMs)) : null;
    const gapFrames = cadenceValid ? Math.max(2, Math.round(100 / medianFrameMs)) : null;
    const dialogueGapFrames = ${DIALOGUE_GAP_FRAMES};
    const releaseAll = async () => {
      const errors = [];
      for (const key of releasable) {
        try { await page.keyboard.up(key); }
        catch (error) { errors.push("keyup " + key + ": " + errorText(error)); }
      }
      return errors;
    };
    const pulse = async (key, postFrames = gapFrames) => {
      await page.keyboard.down(key);
      await waitFrames(pulseFrames);
      await page.keyboard.up(key);
      await waitFrames(postFrames);
    };
    const execute = async () => {
      if (action.type === "focusCanvas") {
        const box = await page.locator("canvas").first().boundingBox();
        if (!box) throw new Error("visible canvas not found");
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        return;
      }
      if (action.type === "interact") {
        await pulse(keyMap.confirm, dialogueGapFrames);
        return;
      }
      if (action.type === "advanceDialogue") {
        for (let index = 0; index < action.confirms; index += 1) await pulse(keyMap.confirm, dialogueGapFrames);
        return;
      }
      if (action.type === "navigateMenu") {
        for (const input of action.inputs) {
          await pulse(keyMap[input], input === "confirm" ? dialogueGapFrames : gapFrames);
        }
        return;
      }
      if (action.dash) await page.keyboard.down("Shift");
      for (const run of action.runs) {
        for (let index = 0; index < run.count; index += 1) await pulse(keyMap[run.direction]);
      }
    };

    const errors = await releaseAll();
    if (!cadenceValid) errors.push("cadence sample is invalid");
    const startedMs = await page.evaluate(() => performance.now());
    if (errors.length === 0) {
      try { await execute(); }
      catch (error) { errors.push("execute: " + errorText(error)); }
    }
    errors.push(...await releaseAll());
    const endedMs = await page.evaluate(() => performance.now());
    const activeDurationNs = BigInt(Math.max(0, Math.round((endedMs - startedMs) * 1_000_000)));
    const receipt = {
      schema: RECEIPT_SCHEMA,
      kind: "transaction",
      controller,
      cardSha256,
      transactionId,
      stage,
      phase,
      actionType: action.type,
      activeDurationNs: activeDurationNs.toString(),
      cadence: { medianFrameMs, pulseFrames, gapFrames, dialogueGapFrames },
      delivery: { status: errors.length === 0 ? "complete" : "uncertain", errors },
    };
    const telemetry = await emitReceipt(receipt);
    return { ...receipt, telemetry };
  }`;
}

function receiptJsonAfterPrefix(line) {
  const start = line.indexOf(RECEIPT_PREFIX);
  if (start === -1) return null;
  const payload = line.slice(start + RECEIPT_PREFIX.length);
  let depth = 0;
  let quoted = false;
  let escaped = false;
  for (let index = 0; index < payload.length; index += 1) {
    const character = payload[index];
    if (quoted) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') quoted = false;
      continue;
    }
    if (character === '"') quoted = true;
    else if (character === "{") depth += 1;
    else if (character === "}") {
      depth -= 1;
      if (depth === 0) return payload.slice(0, index + 1);
    }
  }
  throw new Error("truncated controller receipt in console log");
}

export function parseControllerReceipts(consoleText) {
  if (typeof consoleText !== "string") fail("consoleText", "must be text");
  const records = [];
  for (const line of consoleText.split(/\r?\n/)) {
    const payload = receiptJsonAfterPrefix(line);
    if (payload === null) continue;
    const record = JSON.parse(payload);
    if (record.schema !== RECEIPT_SCHEMA) fail("receipt.schema", `expected ${RECEIPT_SCHEMA}`);
    records.push(record);
  }
  return records;
}

export function summarizeRouteTime(records, rawCard) {
  if (!Array.isArray(records)) fail("receipts", "must be an array");
  const validation = validateRouteCard(rawCard);
  const card = validation.card;
  const transactions = records.filter((record) => record?.kind === "transaction");
  const expectedController = controllerIdentity();
  const cardTransactions = new Map(card.transactions.map((transaction, index) => [transaction.id, { transaction, index }]));
  const seen = new Set();
  const missing = [];
  const reasons = [];
  const bindings = records.filter((record) => record?.kind === "binding");
  let bindingValid = bindings.length === 1;
  let runId = null;
  let browserId = null;
  let total = 0n;
  let routeTransactionCount = 0;
  let setupTransactionCount = 0;
  let recoveryTransactionCount = 0;
  let previousOrder = -1;

  const invalidate = (message) => reasons.push(message);
  if (!bindingValid) invalidate(`receipt ledger must contain exactly one binding; received ${bindings.length}`);
  else {
    const binding = bindings[0];
    runId = typeof binding.runId === "string" && binding.runId.trim() !== "" ? binding.runId : null;
    browserId = typeof binding.browserId === "string" && binding.browserId.trim() !== "" ? binding.browserId : null;
    if (binding.schema !== LEDGER_SCHEMA) invalidate("receipt ledger schema mismatch");
    if (runId === null) invalidate("receipt ledger runId missing");
    if (browserId === null) invalidate("receipt ledger browserId missing");
    if (typeof binding.cardPath !== "string" || binding.cardPath.trim() === "") invalidate("receipt ledger cardPath missing");
    if (binding.cardSha256 !== validation.cardSha256) invalidate("receipt ledger card identity mismatch");
    if (stableJson(binding.controller) !== stableJson(expectedController)) invalidate("receipt ledger controller identity mismatch");
    bindingValid = reasons.length === 0;
  }
  for (const [index, record] of transactions.entries()) {
    const path = `receipts[${index}]`;
    if (record.schema !== RECEIPT_SCHEMA) {
      invalidate(`${path}.schema mismatch`);
      continue;
    }
    if (stableJson(record.controller) !== stableJson(expectedController)) invalidate(`${path}.controller identity mismatch`);
    if (record.cardSha256 !== validation.cardSha256) invalidate(`${path}.cardSha256 mismatch`);
    if (typeof record.transactionId !== "string" || record.transactionId.trim() === "") {
      invalidate(`${path}.transactionId missing`);
      continue;
    }
    const expected = cardTransactions.get(record.transactionId);
    if (!expected) {
      invalidate(`${path}.transactionId unknown: ${record.transactionId}`);
      continue;
    }
    if (record.phase !== "main" && record.phase !== "recovery") {
      invalidate(`${path}.phase must be main or recovery`);
      continue;
    }
    if (record.phase === "recovery" && !expected.transaction.recovery) {
      invalidate(`${path}.phase recovery is not declared by the card`);
      continue;
    }
    const key = `${record.transactionId}:${record.phase}`;
    if (seen.has(key)) invalidate(`${path} duplicates ${key}`);
    else seen.add(key);

    const order = expected.index * 2 + (record.phase === "recovery" ? 1 : 0);
    if (order <= previousOrder) invalidate(`${path} is out of card order`);
    previousOrder = Math.max(previousOrder, order);

    if (record.stage !== expected.transaction.stage) invalidate(`${path}.stage mismatch`);
    const expectedAction = record.phase === "main" ? expected.transaction.action : expected.transaction.recovery.action;
    if (record.actionType !== expectedAction.type) invalidate(`${path}.actionType mismatch`);
    if (typeof record.activeDurationNs !== "string" || !/^[0-9]+$/.test(record.activeDurationNs)) {
      invalidate(`${path}.activeDurationNs must be an integer string`);
      continue;
    }
    if (record.delivery?.status !== "complete") invalidate(`${path}.delivery is not complete`);

    if (expected.transaction.stage === "setup") {
      setupTransactionCount += 1;
      continue;
    }
    routeTransactionCount += 1;
    if (record.phase === "recovery") recoveryTransactionCount += 1;
    total += BigInt(record.activeDurationNs);
  }

  for (const transaction of card.transactions) {
    const key = `${transaction.id}:main`;
    if (!seen.has(key)) missing.push(key);
  }
  const completeCoverage = missing.length === 0 && bindingValid;
  const status = reasons.length > 0 ? "INVALID" : completeCoverage && routeTransactionCount > 0 ? "MEASURED" : "NOT_MEASURED";
  return {
    status,
    completeCoverage,
    totalActiveNs: status === "MEASURED" ? total.toString() : null,
    transactionCount: routeTransactionCount,
    setupTransactionCount,
    nominalTransactionCount: card.transactions.length,
    recoveryTransactionCount,
    missing,
    reasons,
    runId,
    browserId,
    cardSha256: validation.cardSha256,
    controller: expectedController,
  };
}
