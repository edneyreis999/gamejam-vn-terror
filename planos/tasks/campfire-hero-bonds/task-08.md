---
id: "08"
status: completed
depends_on: ["07"]
verification_ids: []
---

# Task 08 — Plan the final directed QA cycle

## Outcome

The existing durable QA tree has an executable, risk-grouped campfire plan covering S-01–06, the remaining human judgments and the evidence needed for release assessment.

## Authority

verification.md complete sensor/scenario/human matrices; all discipline contracts; tasks 01–07 evidence handoff; ADR-G003–006 and SD-015; docs/qa/README.md; F-001 waiver.

Read the linked sources and path conventions in [tasks.md](tasks.md#authority-and-execution-boundaries), with [spec.md](spec.md) and [verification.md](verification.md) as the acceptance contract. Primary verification ownership: none; contributes to the named owners below.

Proposed owner/support: Edney (QA planning); João/Maria may support manual scenario preparation. Estimated effort: 0.5–1 day, subject to the graph's capacity rules.

## Scope

- Implementation/data/assets: Activate rpg-maker-mz-qa-report. Update docs/qa/README.md and the existing MZ campaign/recovery/accessibility/creative journeys and affected scenarios. Create docs/qa/guides/campfire-hero-bonds.md and docs/qa/charters/CH-campfire-hero-bonds.md; identify the future dated report and delivery capture locations. Reconcile actual recipe registrations in rpg-maker/qa/recipes.json with existing native QA owners when needed.
- Tests: No new suite or infrastructure self-tests. Plan existing manifest/recipe selections from confirmed IDs and contributions; a missing recipe is work to author in the established owner, not an invented runnable command.
- Fixture and readiness owner: Name producers, input steps, expected observations and same-run provenance for each S-01–06 starting state. Plan alternative fresh campaigns when losses prevent later variants, without seeds/state editing or asking for external saves. Validate scenario readiness against task 07's actual handoff.
- QA/docs: Record actual receipts and follow-ups below; update [verification.md](verification.md) and affected existing contracts for this scope. The durable QA destinations above are owned by this task.
- Delete targets: None.

## Checklist

- [x] Read tasks.md, every task and its receipts; identify implementation leaves. This task starts only after the sole implementation leaf task 07, which transitively covers 01–06.
- [x] Build four resumable execution lots for task 09: progression/retreat; loss/social novelty; native recovery; UI/audio/editorial. Carry every scenario variant, expected observable, retained evidence and invalidation condition.
- [x] Map each requirement to its existing V-ID and single primary owner; separate focused implementation receipts, directed inputs, screenshots, audible observations and human decisions.
- [x] Reuse the existing MZ journeys/scenarios; preserve historical verdicts and create a dated report for this candidate. Deduplicate real bugs locally by discipline; no Trello publication or separate remote QA backlog is authorized.
- [x] Group equivalent heavy paths using actual shared code/data and retained evidence. Preserve Church/Park native entries and final 2/2/2, low-roster and loss boundaries, new suffix/bridge, both locales and the selected second resolution.
- [x] List valid concrete test/recipe commands after registration. Use the declared QA runtime preparer only if needed by the selected execution route; it prepares tools, not a game candidate.
- [x] Plan human review of the complete PT/EN corpus and distinct UI/art/audio/emotional decisions with the named owners; no agent verdict substitutes for them.
- [x] Record F-001 as accepted risk/waived, gamepad/zoom/mobile as excluded, and real pending/failed/evidence-backed omissions separately. Include cleanup of owned resources and the camp-loss/tavern-NEW devlog capture.
- [x] Update task status and the graph from actual results, with evidence paths, revision and remaining gaps. Leave unexecuted criteria pending.

## Validation

Execution mode/reference: use the modes and scenario references below from [verification.md](verification.md). Commands resolve through [tasks.md](tasks.md#commands-and-evidence); choose actual registered IDs and fresh output paths.

| Verification ID / role | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| QA planning deliverable (no V-ID closure) | Plan/graph/scenario audit under qa-report | Every S-01–06 variant and remaining human criterion has an executable entry, observable, evidence destination, owner and freshness rule. | Pending; record exact receipt/capture/decision path in Execution Notes. |
| V-005–009 readiness contribution | Read task 07 handoff and current docs/qa routes/recipes | No external-save prerequisite, guessed recipe ID, duplicate primary ownership or inherited PASS. | Pending; record exact receipt/capture/decision path in Execution Notes. |

Invalidates/reuses: Plan freshness depends on native lists/schema, actual recipes and the candidate hashes from task 07. Reopen affected planning if those change; preserve unaffected proven paths. QA tracker impact is local only.

## Execution Notes

2026-10-16, `feat/campfire-hero-bonds`, base/head `e920095` plus working tree. Prepared docs/qa/guides/campfire-hero-bonds.md and CH-campfire-hero-bonds, extending the four existing journeys and seven scenario owners. The report owns execution status. Lots map S-01–06 to public-input recipes and distinguish pure/native-harness/directed/visual/audio/human sensors. Heavy cases are grouped by risk under G006; no gamepad/zoom/mobile or F-001 expansion.

Evidence and current limits: [verification](verification.md), [QA report](../../../docs/qa/reports/2026-10-16-campfire-hero-bonds.md). Raw receipts under `.artifacts/campfire-*` and `docs/qa/runs/campfire-hero-bonds/` are local ignored evidence, not fresh-clone inputs. Required human acceptance is not inferred.
