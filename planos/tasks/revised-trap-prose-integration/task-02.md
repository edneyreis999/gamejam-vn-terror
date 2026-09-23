---
id: "02"
status: completed
depends_on: ["01"]
verification_ids: [V-001/DEATH]
---

# Task 02 — Integrate death prose and check the authored data

## Outcome and authority

Integrate sixteen approved fatal paragraphs in their existing post-selection narration. Follow [spec](spec.md), [Narrativa](revised-trap-prose-integration.narrativa.md), [Programação](revised-trap-prose-integration.programacao.md) and [ADR-003](adrs/adr-003-proportionate-prose-verification.md). B1 uses the approved progressive voice-loss paragraph.

## Scope

- Edit only prose/message boxes of CE266–281 in `rpg-maker/The Dryland Drowned/data/CommonEvents.json`; CE274 receives B1's exception.
- Preserve CE042/CE291, farewells, victim eligibility, death commitment, completion ownership, assets/audio and unrelated events. No domain/plugin/save implementation is planned.
- Expected wording comes from the frozen catalogue plus the approved B1 exception, not edited CE lists. Reuse 01's static comparison approach; no new death fixture, caller matrix or sacrifice test expansion is required.

## Checklist

- [x] Record the pre-edit Common Events baseline and confirm the sixteen encounter-to-helper associations.
- [x] Materialize the scoped transformation with checked anchors and a focused diff; preserve IDs, null slots, indentation and list termination.
- [x] Replace all sixteen death bodies, applying B1's correction. Keep pre-selection failures and farewells untouched.
- [x] Compare every death paragraph with its independent approved source and mapped CE. Preserve paragraph/word order, allowing only native presentation breaks.
- [x] Check each helper's structure: all boxes precede its existing ReadingEnd; no child ReadingComplete, SELECT_VICTIM, checkpoint or new passage ID. Confirm CE291's caller and farewell-before-death dispatch are unchanged.
- [x] Parse changed JSON and inspect the complete Common Events diff for unintended edits. Check the integrated changed-file list with task 01; engine/plugins/rules/assets remain outside the delta.
- [x] Record revision, static checks and results under V-001/DEATH. Hand final death-box locations to 05.

## Validation

Static correspondence and structure only. No execution of sixteen helpers, three/two/one victim variants, eligibility/ending rules, save/load or engine integration tests. Existing test expectations may be adjusted narrowly if obsolete; assertions must not be weakened or skipped. Task 05 owns risk-selected rendered death text at 1280×720.

## Execution Notes

Completed 2026-09-22 against the same native baseline as task 01. `python3 planos/tasks/revised-trap-prose-integration/integrate-prose.py --write deaths`, the complete verification command without arguments, and `git diff --check` all exited 0. CE266–281 contain all sixteen mapped paragraphs; CE274 uses the approved B1 exception. New boxes preserve native headers and precede each original ReadingEnd. Full structured equality against a baseline copy with only those sixteen message spans replaced confirms unchanged CE042/291, farewells, caller/completion ownership and every other Common Event. No child completion or campaign action was added.

Runtime delta: exactly Map007–022 and CommonEvents.json. Engine/plugins/rules/assets/save implementation remain unchanged. SHA-256 of CommonEvents.json: `71238ecc4cc660c3bea7a2edc9ecd40f250e8327957dfa2c9b64ed1e340c838f`. V-001/DEATH PASS. The task-local transform prints all map hashes and remains replayable/idempotent on this baseline/candidate. No runtime process opened for these checks. New death boxes share the two-line, 68-character preparation described in task 01; final visual evidence belongs to 05.

Diff review caught serializer indentation churn in CommonEvents; restored its original four-space style and reran the check. The resulting diff is limited to the sixteen authorized message bodies.
