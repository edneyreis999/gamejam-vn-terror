---
id: "03"
status: completed
depends_on: ["02"]
verification_ids: []
---

# Task 03 — Offer all camp conversations for Gorvak, Elowen, Griznik and Seraphina

## Outcome

H1–H4 each offer their six authored camp conversations, with the five mapped pair interjections, while preserving their existing tavern interactions.

## Authority

RQ-003/008/009/011/012; narrative camp.h1–h4.* and mapped interject.*; programming topic composition and hero-map ownership; UI navigation and art bust contracts.

Read the linked sources and path conventions in [tasks.md](tasks.md#authority-and-execution-boundaries), with [spec.md](spec.md) and [verification.md](verification.md) as the acceptance contract. Primary verification ownership: none; contributes to the named owners below.

Proposed owner/support: Edney (Programming/editorial); João and Maria may support text review. Estimated effort: 2 days, subject to the graph's capacity rules.

## Scope

- Implementation/data/assets: Map037–040 event001; Map045 portrait-to-hero routing; shared native return-context allocation and Common Events only where needed; Languages.tsv; existing Rules/Bridge interfaces from task 02. Establish the same routing contract for all eight hero maps without duplicating social rules.
- Tests: formation.mjs/content.mjs for available topic identities, participants and segment completion; native-controls.mjs IT-077 for FAST boundaries. Reuse current owner suites, and inspect current loaded event keys rather than prose snapshots.
- Fixture and readiness owner: Own a candidate route recipe for A, skipping A and reading B, repeating the same pause after retreat, and a base conversation without its partner. Record how a later party can make its suffix eligible; task 09 executes the final S-04 representative.
- QA/docs: Record actual receipts and follow-ups below; update [verification.md](verification.md) and affected existing contracts for this scope. Hand remaining directed/human observations to tasks 08/09 without claiming acceptance.
- Delete targets: None; preserve retired legacy observation IDs without reusing them.

## Checklist

- [x] Record current Talk/Select/Remove/Back branches and observational IDs in each owning map. Preserve them in tavern context.
- [x] Set explicit camp/tavern return context before transfer; in camp keep the camp backdrop/fire, show only Talk/Back, restore eligible portrait focus on return, and do not create another arrival.
- [x] Integrate all 24 base scenes: H1–H4 × church/park/village × A/B. B stands alone and never queues missed A. Repeated attempts keep authored topics and completed-unit state.
- [x] Integrate exactly these five suffixes at their mapped host scenes: interject.h1.h5, interject.h1.h8, interject.h2.h6, interject.h3.h8, interject.h4.h7. Only a living present named partner can speak; the base remains complete without it.
- [x] Use semantic PT/EN keys in Languages.tsv, one native utterance per authored row unless wrapping needs boxes, speaker metadata and existing bust entry/focus/exit. Check TSV cell restrictions with C-LANGUAGE.
- [x] Before every segment query its read permission and reset FAST at segment end. Commit the base and only the displayed suffix at full-topic completion, then checkpoint the native return continuation.
- [x] Verify menu focus/opening consumes nothing; an unread later suffix remains novel despite a read base; final dialogue input cannot choose another topic or exit.
- [x] Record the 24/5 integration inventory and focused observations. Keep editorial status pending for Edney; do not treat technical integration of the specified proposal as creative acceptance.
- [x] Update task status and the graph from actual results, with evidence paths, revision and remaining gaps. Leave unexecuted criteria pending.

## Validation

Execution mode/reference: use the modes and scenario references below from [verification.md](verification.md). Commands resolve through [tasks.md](tasks.md#commands-and-evidence); choose actual registered IDs and fresh output paths.

| Verification ID / role | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-003/004/005 (contribution) | C-FOCUSED, C-LANGUAGE and one-time native topic enumeration | 24 correct A/B topics and 5 exact suffix mappings; segment read state and FAST permission follow actual eligibility. | Pending; record exact receipt/capture/decision path in Execution Notes. |
| V-007/009 (contribution) | S-04/S-06 representative inputs and captures | Camp/tavern return, keyboard/mouse, HIDE/Options and two-person exchange are observable; final visual/editorial acceptance belongs to task 09. | Pending; record exact receipt/capture/decision path in Execution Notes. |

Invalidates/reuses: Edits to these hero lists, suffix mappings, shared context and localization keys invalidate affected saves/observations. Task 04 reuses the working context/reading protocol, not copied JavaScript dialogue logic.

## Execution Notes

2026-10-16, `feat/campfire-hero-bonds`, base/head `e920095` plus working tree. Integrated all six base topics for H1–H4 (24 bases) and their exact mapped suffixes into native hero maps and Languages.tsv. No prose moved to JS. The one-time content inventory confirms all branches/keys; editorial acceptance remains in task09.

Evidence and current limits: [verification](verification.md), [QA report](../../../docs/qa/reports/2026-10-16-campfire-hero-bonds.md). Raw receipts under `.artifacts/campfire-*` and `docs/qa/runs/campfire-hero-bonds/` are local ignored evidence, not fresh-clone inputs. Required human acceptance is not inferred.
