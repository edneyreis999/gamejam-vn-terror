# Public-input controller and route-card contract

Read this contract in full as invoker, player-author, specialist, or clean replayer. The controller is the exclusive gameplay-input surface. It emits public keyboard and mouse events but neither reads pixels nor accesses RPG Maker state.

The versioned runtime library is `.agents/skills/rpg-maker-mz-black-box-playtest/scripts/playtest_controller_core.mjs`. Invoke it only through the purpose-built helpers below; models do not author or edit runner code.

## Closed action vocabulary

The card accepts five actions:

```json
{ "type": "focusCanvas" }
{ "type": "interact" }
{ "type": "advanceDialogue", "confirms": 3 }
{ "type": "navigateMenu", "inputs": ["down", "down", "confirm"] }
{
  "type": "move",
  "dash": true,
  "runs": [
    { "direction": "left", "count": 7 },
    { "direction": "up", "count": 5 }
  ]
}
```

Directions are `up`, `down`, `left`, and `right`. Menu inputs add `confirm` and `cancel`. Counts describe discrete pulses, never seconds or intended tiles. The controller owns keydown, keyup, cadence, release, and its versioned post-confirmation content window. The specialist supplies counts; the player proves their visible result. Neither the card nor the model selects timing.

`focusCanvas` may establish public focus before the contracted start or enact a frozen recovery. Its Playwright adapter may locate the visible canvas only to target the public click; it may not use DOM or page state to decide gameplay.

`advanceDialogue` may batch pages from one proven dialogue segment. End the transaction when a choice or other irreversible mode can appear. Observe that boundary before `navigateMenu`. A transaction may safely enter or leave a mode when its exact sequence has browser proof and no contained input can commit an unobserved branch.

## Route-card schema

The executable card is one JSON object:

```json
{
  "schema": "rpg-maker-mz-route-card/v2",
  "revision": 1,
  "target": "Complete the supplied public flow",
  "build": {
    "identity": "revision or fingerprint",
    "validityConditions": ["Conditions that keep this card valid"]
  },
  "entry": {
    "public": "URL, file, or authorized launch command",
    "reset": "Public reset",
    "startGuard": "Stable visible initial state",
    "finishGuard": "Distinct visible completion state",
    "rejectingOracle": "Plausible state that must not count as success"
  },
  "controller": {
    "name": "rpg-maker-mz-playtest-controller",
    "version": "1.3.0",
    "sha256": "installed controller hash"
  },
  "assistedProvenance": ["Public guidance received from the specialist"],
  "checkpoints": [
    {
      "id": "C0",
      "guard": "Visible material state",
      "filename": "C0.png"
    }
  ],
  "transactions": [
    {
      "id": "T1",
      "stage": "route",
      "precondition": "Visible state before input",
      "action": { "type": "interact" },
      "postcondition": "Visible state after input",
      "checkpointId": "C0",
      "recovery": {
        "guard": "Visible state in which this correction remains safe",
        "action": { "type": "interact" }
      }
    }
  ]
}
```

`stage` is required and accepts only `setup` or `route`. Setup transactions perform public reset, focus, or entry work before the contracted start guard; route transactions begin only after that guard. `checkpointId` and `recovery` are optional. Every checkpoint is material and owns one safe PNG basename. Preconditions, postconditions, guards, and provenance use only player-visible language. The card contains no physical keys, durations, source facts, internal coordinates, engine identifiers, or executable code.

Get the installed controller identity:

```text
node .agents/skills/rpg-maker-mz-black-box-playtest/scripts/validate_route_card.mjs --identity
```

Validate the card and obtain its canonical JSON hash:

```text
node .agents/skills/rpg-maker-mz-black-box-playtest/scripts/validate_route_card.mjs --card <card.json>
```

The first command is a read-only identity helper. The second is a read-only validation helper. Use the printed canonical hash for specialist approval and invoker matching; do not substitute the file's formatting-dependent byte hash.

## Playwright preflight

Create the runner inside the ignored current-run scratch root:

```text
node .agents/skills/rpg-maker-mz-black-box-playtest/scripts/prepare_playwright_preflight.mjs --output <scratch>/controller-runner.js
```

This is a mutating scratch-bootstrap helper. Invoke the resulting absolute filename once with `browser_run_code_unsafe({filename})`. It samples public browser frame cadence without keyboard or mouse input. Require:

- `preflight.status` equals `valid`;
- `controller` equals the card identity when a card already exists;
- `telemetry.status` equals `emitted`, or classify controller telemetry as invalid without blocking gameplay.

Regenerate the preflight runner for every browser identity. A stale runner hash is not valid preflight. Failed loading, cadence, or adapter execution prevents gameplay input; repair the harness or classify the true terminal cause. Telemetry emission failure affects measurement only.

## Execute one transaction

Prepare the main action:

```text
node .agents/skills/rpg-maker-mz-black-box-playtest/scripts/prepare_playwright_transaction.mjs --card <card.json> --transaction <ID> --output <scratch>/controller-runner.js
```

Prepare its frozen recovery only after the player confirms the recovery guard:

```text
node .agents/skills/rpg-maker-mz-black-box-playtest/scripts/prepare_playwright_transaction.mjs --card <card.json> --transaction <ID> --recovery --output <scratch>/controller-runner.js
```

This mutating scratch-bootstrap helper validates the complete card before overwriting the rolling runner. Invoke only its absolute filename through `browser_run_code_unsafe({filename})`. Raw `browser_press_key`, direct `page.keyboard`, direct `page.mouse`, inline Playwright input code, and arbitrary wait commands are not alternative gameplay paths.

Each runner recalculates browser cadence, derives its private pulse lifecycle, releases every mapped control before and after the action, and returns a receipt. Interpret delivery separately from telemetry:

- `delivery.status: complete`: evaluate the public postcondition;
- `delivery.status: uncertain`: observe the public state, then use the frozen recovery or return to assisted authorship;
- `telemetry.status: invalid`: continue gameplay and mark the affected timing metric invalid.

The player never edits a transaction during replay. A postcondition miss with its exact recovery guard permits the frozen recovery. Any other result is divergence.

## Lossless receipts and two clocks

The runner emits each receipt to the browser console with a private QA prefix. Every transaction receipt carries the canonical card hash and controller identity. The bounded console is transport, not durable timing evidence.

Freeze `<run-id>` and `<browser-id>` in the clean-replay contract. Immediately after preflight and every main or recovery runner returns, use `browser_console_messages` with `level: "info"`, `all: false`, and a unique absolute `<snapshot>` filename. Before observation, analysis, recovery, or the next gameplay input, run the matching **mutating run-artifact helper**:

```text
node .agents/skills/rpg-maker-mz-black-box-playtest/scripts/persist_controller_receipt.mjs --card <card.json> --console-log <snapshot> --ledger <scratch>/controller-receipts.jsonl --run-id <run-id> --browser-id <browser-id> --preflight

node .agents/skills/rpg-maker-mz-black-box-playtest/scripts/persist_controller_receipt.mjs --console-log <snapshot> --ledger <scratch>/controller-receipts.jsonl --transaction <ID>

node .agents/skills/rpg-maker-mz-black-box-playtest/scripts/persist_controller_receipt.mjs --console-log <snapshot> --ledger <scratch>/controller-receipts.jsonl --transaction <ID> --recovery
```

The first command creates an append-only ledger binding header with the canonical card path and identities. Later commands recover that binding from the ledger, extract the exact expected receipt without model transcription, and make an exact retry idempotent. An accidental new ledger path fails instead of silently creating another ledger. Use one snapshot basename per preflight, main, and recovery. A snapshot, extraction, or append failure marks active time invalid; record it and continue toward the finish.

At the finish guard, summarize the complete ledger with the **read-only helper**:

```text
node .agents/skills/rpg-maker-mz-black-box-playtest/scripts/summarize_route_time.mjs --card <card.json> --receipts <scratch>/controller-receipts.jsonl
```

The summarizer requires every nominal card transaction exactly once, permits at most one card-declared recovery immediately after its main transaction, and validates card/controller identity, stage, action type, order, and complete delivery. Its `totalActiveNs` is the active route time: controller delivery plus controller-owned game waits for `route` transactions, including executed frozen recoveries. Setup receipts are required and excluded. Missing coverage returns `NOT_MEASURED`; contradictions return `INVALID`; neither exposes a partial subtotal or revokes observed completion.

Use `.agents/skills/rpg-maker-mz-black-box-playtest/scripts/extract_controller_receipts.mjs` only as a **mutating diagnostic helper** for an optional final console export. Its output is never authoritative for active route time.

Use the external continuous helper in `active-clock.md` for total operational time from the contracted start guard to the visible finish guard. It includes model observation, evidence capture, and tool latency. Preflight is outside both clocks; post-finish evidence and hash validation are outside both.

Human goals attach only to their named metric:

- route or quest goal: active route time;
- agent, end-to-end, replay-total, or total goal: total operational time;
- no named metric or conflicting terms: record the goal against both results and mark its scope ambiguous.

The specialist may estimate or optimize duration but never creates an SLA.

## Test the installed controller

Run the read-only unit and contract suite:

```text
node --test .agents/skills/rpg-maker-mz-black-box-playtest/scripts/test_playtest_controller.mjs
```

Unit success does not prove browser delivery. Before accepting a controller change, also run one controlled-page Playwright smoke test and one public RPG Maker MZ smoke test. The smoke must exercise lossless persistence as well as input delivery. Keep cards, runners, receipts, console snapshots, and screenshots in `.artifacts/`; do not promote them as playtest evidence.
