// Suite: RPG Maker MZ public-input controller
// Invariant: validated transactions produce only the closed public-input vocabulary and always release controls.
// Boundary IN: route-card validation, runner generation, receipts, and route-time summary.
// Boundary OUT: real Chromium delivery, covered by the required Playwright smoke test.

import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

import {
  CARD_SCHEMA,
  LEDGER_SCHEMA,
  RECEIPT_SCHEMA,
  controllerIdentity,
  makePreflightRunnerSource,
  makeTransactionRunnerSource,
  summarizeRouteTime,
  validateRouteCard,
} from "./playtest_controller_core.mjs";

async function temporaryDirectory(t) {
  const directory = await mkdtemp(path.join(os.tmpdir(), "playtest-controller-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return directory;
}

function validCard() {
  const controller = controllerIdentity();
  return {
    schema: CARD_SCHEMA,
    revision: 1,
    target: "Complete the supplied public flow",
    build: {
      identity: "build-fixture",
      validityConditions: ["Public entry and visible guards are unchanged"],
    },
    entry: {
      public: "http://127.0.0.1:8765/",
      reset: "Select New Game",
      startGuard: "The player can move on the initial map",
      finishGuard: "A distinct credits screen is visible",
      rejectingOracle: "The title and ordinary map do not count as credits",
    },
    controller,
    assistedProvenance: ["White-box specialist supplied public-only route guidance"],
    checkpoints: [
      { id: "C0", guard: "Initial controllable map", filename: "C0.png" },
      { id: "C1", guard: "Conversation complete", filename: "C1.png" },
    ],
    transactions: [
      {
        id: "T1",
        stage: "route",
        precondition: "Initial map is controllable",
        action: {
          type: "move",
          dash: true,
          runs: [
            { direction: "left", count: 2 },
            { direction: "up", count: 1 },
          ],
        },
        postcondition: "Player is visibly in front of the intended NPC",
      },
      {
        id: "T2",
        stage: "route",
        precondition: "Player is visibly facing the intended NPC",
        action: { type: "advanceDialogue", confirms: 3 },
        postcondition: "Dialogue is closed",
        checkpointId: "C1",
        recovery: {
          guard: "The same dialogue remains visibly open",
          action: { type: "advanceDialogue", confirms: 1 },
        },
      },
    ],
  };
}

function transactionReceipt(card, transactionId, phase = "main", activeDurationNs = "10", overrides = {}) {
  const validation = validateRouteCard(card);
  const transaction = validation.card.transactions.find((candidate) => candidate.id === transactionId);
  const action = phase === "main" ? transaction.action : transaction.recovery.action;
  return {
    schema: RECEIPT_SCHEMA,
    kind: "transaction",
    controller: controllerIdentity(),
    cardSha256: validation.cardSha256,
    transactionId,
    stage: transaction.stage,
    phase,
    actionType: action.type,
    activeDurationNs,
    delivery: { status: "complete", errors: [] },
    ...overrides,
  };
}

function preflightReceipt() {
  return {
    schema: RECEIPT_SCHEMA,
    kind: "preflight",
    controller: controllerIdentity(),
    preflight: { status: "valid" },
    cadence: { samples: 11, medianMs: 16.67, jitterMs: 0.2 },
  };
}

function ledgerBinding(card) {
  const validation = validateRouteCard(card);
  return {
    schema: LEDGER_SCHEMA,
    kind: "binding",
    runId: "run-1",
    browserId: "browser-1",
    cardPath: "/tmp/card.json",
    cardSha256: validation.cardSha256,
    controller: controllerIdentity(),
  };
}

function bound(card, receipts) {
  return [ledgerBinding(card), ...receipts];
}

function fakePage({ failOnDown, invalidCadence = false, failReceiptEmit = false } = {}) {
  const events = [];
  const frameCounts = [];
  return {
    events,
    frameCounts,
    keyboard: {
      async down(key) {
        events.push(["down", key]);
        if (key === failOnDown) throw new Error(`injected keydown failure: ${key}`);
      },
      async up(key) {
        events.push(["up", key]);
      },
    },
    mouse: {
      async click(x, y) {
        events.push(["click", x, y]);
      },
    },
    locator() {
      return {
        first() {
          return {
            async boundingBox() {
              return { x: 10, y: 20, width: 640, height: 480 };
            },
          };
        },
      };
    },
    async evaluate(_callback, argument) {
      if (typeof argument === "number") frameCounts.push(argument);
      if (failReceiptEmit && argument && typeof argument === "object") throw new Error("injected telemetry failure");
      if (typeof argument === "number" && argument > 2) {
        if (invalidCadence) return Array.from({ length: argument }, () => 0);
        return Array.from({ length: argument }, (_, index) => index * 16.67);
      }
      return null;
    },
  };
}

async function loadRunner(source) {
  return (0, eval)(source);
}

test("accepts a complete card bound to the installed controller", () => {
  const card = validCard();
  const result = validateRouteCard(card);
  assert.equal(result.card.schema, CARD_SCHEMA);
  assert.equal(result.card.transactions.length, 2);
  assert.match(result.cardSha256, /^[a-f0-9]{64}$/);
});

test("rejects raw keys before a runner can be generated", () => {
  const card = validCard();
  card.transactions[0].action = { type: "press", key: "ArrowLeft" };
  assert.throws(() => validateRouteCard(card), /unsupported action type/);
});

test("rejects a card bound to a different controller hash", () => {
  const card = validCard();
  card.controller.sha256 = "0".repeat(64);
  assert.throws(() => validateRouteCard(card), /controller\.sha256/);
});

test("requires every transaction to declare whether it is setup or route", () => {
  const card = validCard();
  delete card.transactions[0].stage;
  assert.throws(() => validateRouteCard(card), /stage/);
});

test("rejects transaction stages outside setup and route", () => {
  const card = validCard();
  card.transactions[0].stage = "teardown";
  assert.throws(() => validateRouteCard(card), /must be setup or route/);
});

test("executes a composite move and releases every control", async () => {
  const validation = validateRouteCard(validCard());
  const card = validation.card;
  const source = makeTransactionRunnerSource({ card, transactionId: "T1" });
  const runner = await loadRunner(source);
  const page = fakePage();

  const result = await runner(page);

  assert.equal(result.delivery.status, "complete");
  assert.equal(result.cadence.pulseFrames, 7);
  assert.equal(result.cadence.gapFrames, 6);
  assert.deepEqual(
    page.events.filter(([event]) => event === "down"),
    [
      ["down", "Shift"],
      ["down", "ArrowLeft"],
      ["down", "ArrowLeft"],
      ["down", "ArrowUp"],
    ],
  );
  const released = new Set(page.events.slice(-7).filter(([event]) => event === "up").map(([, key]) => key));
  assert.deepEqual(released, new Set(["Shift", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", "Escape"]));
  assert.equal(result.telemetry.status, "emitted");
  assert.equal(result.cardSha256, validation.cardSha256);
});

test("reports uncertain delivery and still releases controls after keydown failure", async () => {
  const card = validateRouteCard(validCard()).card;
  const source = makeTransactionRunnerSource({ card, transactionId: "T1" });
  const runner = await loadRunner(source);
  const page = fakePage({ failOnDown: "ArrowLeft" });

  const result = await runner(page);

  assert.equal(result.delivery.status, "uncertain");
  assert.match(result.delivery.errors.join(" "), /injected keydown failure/);
  const released = new Set(page.events.slice(-7).filter(([event]) => event === "up").map(([, key]) => key));
  assert.equal(released.has("ArrowLeft"), true);
});

test("rejects invalid transaction cadence before keydown", async () => {
  const card = validateRouteCard(validCard()).card;
  const runner = await loadRunner(makeTransactionRunnerSource({ card, transactionId: "T1" }));
  const page = fakePage({ invalidCadence: true });

  const result = await runner(page);

  assert.equal(result.delivery.status, "uncertain");
  assert.match(result.delivery.errors.join(" "), /cadence/);
  assert.equal(page.events.some(([event]) => event === "down"), false);
});

test("keeps complete delivery distinct from telemetry failure", async () => {
  const card = validateRouteCard(validCard()).card;
  const runner = await loadRunner(makeTransactionRunnerSource({ card, transactionId: "T2" }));
  const page = fakePage({ failReceiptEmit: true });

  const result = await runner(page);

  assert.equal(result.delivery.status, "complete");
  assert.equal(result.telemetry.status, "invalid");
  assert.match(result.telemetry.error, /injected telemetry failure/);
});

test("paces every dialogue confirmation with a controller-owned frame window", async () => {
  const card = validateRouteCard(validCard()).card;
  const runner = await loadRunner(makeTransactionRunnerSource({ card, transactionId: "T2" }));
  const page = fakePage();

  const result = await runner(page);

  assert.equal(result.delivery.status, "complete");
  assert.equal(result.cadence.dialogueGapFrames, 120);
  assert.equal(page.frameCounts.filter((count) => count === 120).length, 3);
});

test("preflight samples browser cadence without keyboard or mouse input", async () => {
  const runner = await loadRunner(makePreflightRunnerSource());
  const page = fakePage();

  const result = await runner(page);

  assert.equal(result.preflight.status, "valid");
  assert.equal(result.cadence.samples, 11);
  assert.deepEqual(page.events, []);
});

test("measures only complete card coverage and includes an allowed recovery", () => {
  const card = validCard();
  const measured = summarizeRouteTime(bound(card, [
    transactionReceipt(card, "T1", "main", "10"),
    transactionReceipt(card, "T2", "main", "20"),
    transactionReceipt(card, "T2", "recovery", "15"),
  ]), card);
  assert.equal(measured.status, "MEASURED");
  assert.equal(measured.completeCoverage, true);
  assert.equal(measured.totalActiveNs, "45");
  assert.equal(measured.recoveryTransactionCount, 1);

  const invalid = summarizeRouteTime(bound(card, [
    transactionReceipt(card, "T1", "main", "10"),
    transactionReceipt(card, "T2", "main", "20", {
      delivery: { status: "uncertain", errors: ["injected"] },
    }),
  ]), card);
  assert.equal(invalid.status, "INVALID");
  assert.equal(invalid.totalActiveNs, null);
});

test("excludes setup transactions from active route time", () => {
  const card = validCard();
  card.transactions[0].stage = "setup";
  const summary = summarizeRouteTime(bound(card, [
    transactionReceipt(card, "T1", "main", "10"),
    transactionReceipt(card, "T2", "main", "20"),
  ]), card);

  assert.equal(summary.status, "MEASURED");
  assert.equal(summary.totalActiveNs, "20");
  assert.equal(summary.transactionCount, 1);
  assert.equal(summary.setupTransactionCount, 1);
});

test("summary CLI reads the runner JSONL contract", async (t) => {
  const directory = await temporaryDirectory(t);
  const receipts = path.join(directory, "receipts.jsonl");
  const cardPath = path.join(directory, "card.json");
  const card = validCard();
  await writeFile(cardPath, JSON.stringify(card));
  await writeFile(receipts, `${bound(card, [
    transactionReceipt(card, "T1", "main", "42"),
    transactionReceipt(card, "T2", "main", "8"),
  ]).map(JSON.stringify).join("\n")}\n`);
  const script = path.join(import.meta.dirname, "summarize_route_time.mjs");
  const result = spawnSync(process.execPath, [script, "--card", cardPath, "--receipts", receipts], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  const summary = JSON.parse(result.stdout);
  assert.equal(summary.totalActiveNs, "50");
  assert.equal(summary.cardSha256, validateRouteCard(card).cardSha256);
});

test("does not expose a partial subtotal when one nominal receipt is missing", () => {
  const card = validCard();
  const summary = summarizeRouteTime(bound(card, [transactionReceipt(card, "T1")]), card);
  assert.equal(summary.status, "NOT_MEASURED");
  assert.equal(summary.completeCoverage, false);
  assert.equal(summary.totalActiveNs, null);
  assert.deepEqual(summary.missing, ["T2:main"]);
});

test("invalidates duplicate, mixed-card, and out-of-order receipts", () => {
  const card = validCard();
  const t1 = transactionReceipt(card, "T1");
  const t2 = transactionReceipt(card, "T2");

  assert.equal(summarizeRouteTime(bound(card, [t1, t1, t2]), card).status, "INVALID");
  assert.equal(summarizeRouteTime(bound(card, [t1, { ...t2, cardSha256: "f".repeat(64) }]), card).status, "INVALID");
  assert.equal(summarizeRouteTime(bound(card, [t2, t1]), card).status, "INVALID");
});

test("invalidates a missing binding, mixed controller, and malformed duration", () => {
  const card = validCard();
  const t1 = transactionReceipt(card, "T1");
  const t2 = transactionReceipt(card, "T2");

  assert.equal(summarizeRouteTime([t1, t2], card).status, "INVALID");
  assert.equal(summarizeRouteTime(bound(card, [t1, {
    ...t2,
    controller: { ...t2.controller, sha256: "0".repeat(64) },
  }]), card).status, "INVALID");
  assert.equal(summarizeRouteTime(bound(card, [t1, { ...t2, activeDurationNs: "1.5" }]), card).status, "INVALID");
});

test("invalidates unknown recovery, stage drift, and action drift", () => {
  const card = validCard();
  const t1 = transactionReceipt(card, "T1");
  const t2 = transactionReceipt(card, "T2");

  assert.equal(summarizeRouteTime(bound(card, [t1, { ...t1, phase: "recovery" }, t2]), card).status, "INVALID");
  assert.equal(summarizeRouteTime(bound(card, [{ ...t1, stage: "setup" }, t2]), card).status, "INVALID");
  assert.equal(summarizeRouteTime(bound(card, [{ ...t1, actionType: "interact" }, t2]), card).status, "INVALID");
});

test("receipt extractor ignores unrelated console output and preserves controller JSON", async (t) => {
  const directory = await temporaryDirectory(t);
  const consoleLog = path.join(directory, "console.log");
  const output = path.join(directory, "receipts.jsonl");
  const receipt = preflightReceipt();
  await writeFile(
    consoleLog,
    `[debug] unrelated\n[info] __RPG_MAKER_PLAYTEST_RECEIPT__${JSON.stringify(receipt)} @ data:text/html:1\n`,
  );
  const script = path.join(import.meta.dirname, "extract_controller_receipts.mjs");
  const result = spawnSync(process.execPath, [script, "--console-log", consoleLog, "--output", output], {
    encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse((await readFile(output, "utf8")).trim()), receipt);
});

test("persists receipts from individually truncated console snapshots", async (t) => {
  const directory = await temporaryDirectory(t);
  const cardPath = path.join(directory, "card.json");
  const ledger = path.join(directory, "receipts.jsonl");
  const card = validCard();
  await writeFile(cardPath, JSON.stringify(card));
  const persist = path.join(import.meta.dirname, "persist_controller_receipt.mjs");
  const initialize = (...args) => spawnSync(process.execPath, [persist, "--card", cardPath, "--ledger", ledger,
    "--run-id", "run-1", "--browser-id", "browser-1", ...args], { encoding: "utf8" });
  const persistNext = (...args) => spawnSync(process.execPath, [persist, "--ledger", ledger, ...args], { encoding: "utf8" });

  const preflightLog = path.join(directory, "preflight.log");
  await writeFile(preflightLog, `noise\n${"__RPG_MAKER_PLAYTEST_RECEIPT__"}${JSON.stringify(preflightReceipt())}\n`);
  assert.equal(initialize("--console-log", preflightLog, "--preflight").status, 0);

  for (const [transactionId, duration] of [["T1", "11"], ["T2", "13"]]) {
    const snapshot = path.join(directory, `${transactionId}.log`);
    await writeFile(snapshot, `${"__RPG_MAKER_PLAYTEST_RECEIPT__"}${JSON.stringify(
      transactionReceipt(card, transactionId, "main", duration),
    )}\n`);
    const result = persistNext("--console-log", snapshot, "--transaction", transactionId);
    assert.equal(result.status, 0, result.stderr);
  }

  const recoveryLog = path.join(directory, "T2-recovery.log");
  await writeFile(recoveryLog, `${"__RPG_MAKER_PLAYTEST_RECEIPT__"}${JSON.stringify(
    transactionReceipt(card, "T2", "recovery", "5"),
  )}\n`);
  const recovery = persistNext("--console-log", recoveryLog, "--transaction", "T2", "--recovery");
  assert.equal(recovery.status, 0, recovery.stderr);

  const records = (await readFile(ledger, "utf8")).trim().split("\n").map(JSON.parse);
  assert.equal(records[0].kind, "binding");
  assert.deepEqual(records.slice(1).map((record) => record.kind), [
    "preflight", "transaction", "transaction", "transaction",
  ]);
  assert.equal(summarizeRouteTime(records, card).totalActiveNs, "29");
});

test("receipt persistence is idempotent for an exact retry and rejects a conflict", async (t) => {
  const directory = await temporaryDirectory(t);
  const cardPath = path.join(directory, "card.json");
  const ledger = path.join(directory, "receipts.jsonl");
  const snapshot = path.join(directory, "T1.log");
  const card = validCard();
  await writeFile(cardPath, JSON.stringify(card));
  const receipt = transactionReceipt(card, "T1", "main", "11");
  await writeFile(snapshot, `${"__RPG_MAKER_PLAYTEST_RECEIPT__"}${JSON.stringify(receipt)}\n`);
  const persist = path.join(import.meta.dirname, "persist_controller_receipt.mjs");
  const args = [persist, "--card", cardPath, "--ledger", ledger, "--run-id", "run-1",
    "--browser-id", "browser-1", "--console-log", snapshot, "--transaction", "T1"];
  const retryArgs = [persist, "--ledger", ledger, "--console-log", snapshot, "--transaction", "T1"];

  assert.equal(spawnSync(process.execPath, args, { encoding: "utf8" }).status, 0);
  assert.equal(spawnSync(process.execPath, retryArgs, { encoding: "utf8" }).status, 0);
  assert.equal((await readFile(ledger, "utf8")).trim().split("\n").length, 2);

  const wrongLedger = path.join(directory, "typo", "receipts.jsonl");
  const wrongPath = spawnSync(process.execPath, [persist, "--ledger", wrongLedger, "--console-log", snapshot,
    "--transaction", "T1"], { encoding: "utf8" });
  assert.equal(wrongPath.status, 2);
  assert.match(wrongPath.stderr, /new ledger requires/);

  await writeFile(snapshot, [receipt, { ...receipt, activeDurationNs: "12" }]
    .map((record) => `${"__RPG_MAKER_PLAYTEST_RECEIPT__"}${JSON.stringify(record)}`).join("\n"));
  const conflict = spawnSync(process.execPath, retryArgs, { encoding: "utf8" });
  assert.equal(conflict.status, 2);
  assert.match(conflict.stderr, /conflicting receipts/);
});
