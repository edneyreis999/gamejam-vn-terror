---
id: "08"
status: completed
depends_on: ["07"]
verification_ids: []
---

# Task 08 — Plan localization QA

## Outcome

A complete, resumable playtest plan for L10–L13 and L15 exists in `docs/qa/`,
derived from the approved verification and charter, with lots, variants,
evidence paths and teardown.

## Authority

- `verification.md`: runtime scenarios L10–L15, evaluation contract
- `docs/qa/charters/CH-coreto-english-localization.md`
- Skill: `rpg-maker-mz-qa-report`

## Scope

- QA docs: charter update, journey/scenario entries under `docs/qa/`,
  run plan with lots A (L10/L11), B (L12), C (L13 closings, 1280×720 and one
  1920×1080 path), D (L15 independent agent), E (Edney review packet).
- Evaluation brief for the fresh agent (player-first, no translator rationale).
- No execution, no PASS claims. Delete targets: none.

## Checklist

- [x] Activate `rpg-maker-mz-qa-report` against the frozen candidate from 07.
- [x] Define entry states (own campaigns/saves only, SD-015, on the
      `127.0.0.1:18737` origin cleared by the executor after an `lsof` ownership
      check, never 18726 or 18727), variants
      and evidence paths under `docs/qa/evidence/coreto-english-localization/`.
- [x] Write the L15 brief and the Edney review packet outline. The packet lists
      every D-021 treatment and the static D-019 browser title.

## Validation

Execution mode/reference: planning only.
Invalidates/reuses: candidate changes after 07 require replanning affected lots.

## Execution Notes

Planned 2026-09-29 against the task-07 candidate (no execution, no verdicts).

- Plan: `docs/qa/guides/coreto-english-localization.md` with lots A (L10/L11),
  B (L12), C (L13), D (L15), E (Edney packet): entry states, steps,
  independent expected results, variants, evidence paths under
  `docs/qa/evidence/coreto-english-localization/`, invalidation and teardown.
- Brief: `l15-brief.md` (player-first, no translator rationale). Packet
  outline: `editorial-packet.md` (every D-021 treatment, the D-019 title, the
  decisions flagged in tasks 02–07).
- Linked from the charter, the QA README (current cycle) and
  `verification.md` → QA plan. The creative-review journey already links the
  charter.
- Environment note carried into the plan: the qa-execution script needs the
  `playwright` package, missing here (IT-079); execution uses the harness's
  Playwright browser tools instead, with no new install.

