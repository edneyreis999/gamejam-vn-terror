---
id: "02"
status: completed
depends_on: ["01"]
verification_ids: []
---

# Task 02 — Remember losses and complete each camp grief reaction once

## Outcome

Every genuine camp arrival remembers all campaign losses, then presents all eligible directional grief scenes exactly once before optional interaction. Tavern absence acknowledgments remain independent.

## Authority

RQ-004–006/009/011/012; programming social-unit and grief ordering, witness facts and arrival lifecycle; narrative grief.* (all 16 scenes); art absence/reduced-motion and audio contracts; GDDR-006.

Read the linked sources and path conventions in [tasks.md](tasks.md#authority-and-execution-boundaries), with [spec.md](spec.md) and [verification.md](verification.md) as the acceptance contract. Primary verification ownership: none; contributes to the named owners below.

Proposed owner/support: Edney (Programming/Narrative); Lucas/user for framing. Estimated effort: 2 days, subject to the graph's capacity rules.

## Scope

- Implementation/data/assets: CampaignRules/EventBridge social action/query metadata; Map045 and named native Common Events for all 16 grief scenes; Languages.tsv; System.json allocated IDs; existing camp/stage/bust assets. CE348/349/350 remain tavern owners; inspect their callers to prevent cross-consumption.
- Tests: formation.mjs/content.mjs for eligible speakers and completed units; retreat.mjs IT-009/010/011 for independent tavern absence; persistence.mjs/native-checkpoints.mjs for per-reaction continuation. Keep timing/coordinates out of permanent assertions.
- Fixture and readiness owner: Own a player-earned loss-and-replacement recipe: sacrifice, camp, return, recruit a living companion who stayed in town, reach camp again. Include multiple pending reactions. Cheap domain inputs cover pair permutations; they are not directed gameplay evidence.
- QA/docs: Record actual receipts and follow-ups below; update [verification.md](verification.md) and affected existing contracts for this scope. Hand remaining directed/human observations to tasks 08/09 without claiming acceptance.
- Delete targets: None; do not retire or renumber tavern acknowledgment switches/effects.

## Checklist

- [x] Capture the existing tavern absence switch/effect lifecycle and the native death/witness boundary; preserve it.
- [x] Implement the shared social START/COMPLETE actions, stable unit identities, eligibility/composition/read queries and active-topic guards once, for the approved topic families. Metadata contains identities and references, never dialogue prose or a second interpreter.
- [x] Display all dead campaign heroes in their fixed positions and fade simultaneously over three seconds (2026-10-16 refinement); show only living current-party heroes. Reduced motion starts with empty dead positions; dead pictures never bind to choices.
- [x] Integrate all 16 bilingual grief units through native child interpreters, with living present survivor and young Rheed only. Sort survivor H1–H8, then dead companion H1–H8; a witness is not required.
- [x] After each complete reaction, commit only that directional unit and checkpoint the continuation before the next pending reaction. FINISH_CAMP_ARRIVAL requires narrator completion and no pending eligible grief, then updates the death baseline.
- [x] Preserve the selected arrival tone across its reading and reload. Returning from hero maps/Options or resuming a completed entrance must not replay fades or consumed reactions.
- [x] Verify that a new expedition with no new deaths uses arrival.prior; a replacement survivor can react to an earlier loss; camp reactions do not acknowledge tavern fades or consume future tavern subjects.
- [x] Record the focused loss-arrival observations, native cursor and save provenance for tasks 07/09. Technical collection does not accept emotional pacing or art.
- [x] Update task status and the graph from actual results, with evidence paths, revision and remaining gaps. Leave unexecuted criteria pending.

## Validation

Execution mode/reference: use the modes and scenario references below from [verification.md](verification.md). Commands resolve through [tasks.md](tasks.md#commands-and-evidence); choose actual registered IDs and fresh output paths.

| Verification ID / role | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-003/005 (contribution) | C-FOCUSED + one-time loaded-data inventory + C-LANGUAGE | 16 directions, correct participants/order; only completion consumes a scene; no duplicated read truth or invented biographies. | Pending; record exact receipt/capture/decision path in Execution Notes. |
| V-004/006/007/008 (contribution) | S-02/S-05/S-06 focused native path | A save after one reaction can continue to the remaining reactions; camp/tavern absence and fire bed remain separate. | Pending; record exact receipt/capture/decision path in Execution Notes. |

Invalidates/reuses: Witness snapshot, pair metadata, death baseline, grief event lists and fade ownership invalidate affected evidence. Task 05 consolidates social eligibility; task 07 owns V-004 and task 09 final journeys/human review.

## Execution Notes

2026-10-16, `feat/campfire-hero-bonds`, base/head `e920095` plus working tree. Implemented directional once-only grief, sorted by survivor/dead ID; departure baseline; witness snapshots; repeated all-dead camp fade independent of tavern first-return switches. CE357–375 own arrival/grief. UT-021/076–078 pass. Directed d24d71bc proves two reactions, reload between them, witness/away About and later reaction for the companion who stayed in town.

Evidence and current limits: [verification](verification.md), [QA report](../../../docs/qa/reports/2026-10-16-campfire-hero-bonds.md). Raw receipts under `.artifacts/campfire-*` and `docs/qa/runs/campfire-hero-bonds/` are local ignored evidence, not fresh-clone inputs. Required human acceptance is not inferred.

## Presentation follow-up — 2026-10-16

User-approved refinement implemented on the same branch: nameplates/icons in both stages, three-second native absences with matching cleanup, Talk-specific bust framing and continuous interlocutors across reading units. [Verification](verification.md#presentation-refinement) owns fresh evidence and pending human acceptance. Prior captures remain historical.

Refinement checks complete: 61 fast + IT-009/010/011 pass; directed FIRST85fcd9fe, LOSSES9ec06f29, PT/reducedf3ecd89d pass with agent inspection. See verification for failure history, exact scope and human-acceptance limits.
