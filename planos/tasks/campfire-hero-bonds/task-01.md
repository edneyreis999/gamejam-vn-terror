---
id: "01"
status: completed
depends_on: []
verification_ids: ["V-001"]
---

# Task 01 — Reach camp at route milestones and choose the next move

## Outcome

The native route reaches Map045 after resolved positions 2 and 4, plays the appropriate shared narrator arrival and offers Continue or immediate retreat. Continue reveals only the following trap; retreat preserves losses, assignments and greatest progress.

## Authority

RQ-001/002/004/009–011; programming state, transition, native ownership and checkpoint contracts; narrative arrival.none/recent/prior; UI camp navigation; art composition; audio contract. GDD §28.1/3 and GDDR-005/006.

Read the linked sources and path conventions in [tasks.md](tasks.md#authority-and-execution-boundaries), with [spec.md](spec.md) and [verification.md](verification.md) as the acceptance contract. Primary verification ownership: V-001.

Proposed owner/support: Edney (Programming); Lucas/user for composition. Estimated effort: 2 days, subject to the graph's capacity rules.

## Scope

- Implementation/data/assets: Game-owned CampaignRules/EventBridge; data/Map045.json; CE040/044/067 and actual route/encounter callers in CommonEvents.json and Map007–022; System.json for verified free IDs; Languages.tsv for the three arrivals and camp controls. Use existing Dryland_Camp.png and audio/bgs/Fire1.ogg. Inspect CE003/038/045/348–351 before changing any shared call.
- Tests: retreat.mjs (UT-029/030/031, IT-013), encounters.mjs (UT-005/006/007/020/055, IT-082/083/084), persistence.mjs checkpoint guards, and their affected helpers. Adapt existing retreat expectations; do not create a parallel route suite.
- Fixture and readiness owner: This task owns an isolated new-campaign route to the first and second camp and observable position/assignment checks. Start with a no-loss representative for native navigation; task 02 supplies the complete loss-arrival behavior, and task 07/09 close integrated continuity and S-01–03. No injected campaign or assumed seed.
- QA/docs: Record actual receipts and follow-ups below; update [verification.md](verification.md) and affected existing contracts for this scope. Hand remaining directed/human observations to tasks 08/09 without claiming acceptance.
- Delete targets: No files. Remove only superseded voluntary-retreat options/branches from their actual native callers; retain reread, automatic retreat, terminal paths and historical records.

## Checklist

- [x] Record current native post-consequence dispatch, retreat callers, command IDs and free event/variable/picture references before edits; put allocated names in native data.
- [x] Initialize the approved candidate schema and witness snapshot before sacrifice; extend phase/history/state validation and editor action/query metadata coherently. Preserve monotonic deaths and one authority for roster/assignments.
- [x] Route resolved positions 2/4 into camp_arrival without assigning the next trap. Keep total-loss/automatic-retreat and terminal route ordering unchanged. Retain position until CONTINUE_FROM_CAMP advances once.
- [x] Author Map045 entry/menu and explicit outgoing cleanup, the three bilingual narrator units and camp entry/arrival-completion/exit checkpoint calls. Reserve the arrival continuation for task 02's real grief units; do not stub them, consume them early or claim loss-arrival completion before that task.
- [x] Remove voluntary retreat choices from introductions and trap menus; preserve reread. At camp allow 1–3 living participants regardless of reserves, retaining the native immediate retreat chain and formation behavior.
- [x] Set the recent-loss baseline at departure and completed arrival. Preserve passage-read FAST for narrator text and distinguish a genuine arrival from Options or hero-map return.
- [x] Author native narrator-to-camp audio transition: one-second BGM/BGS fade, then BGS Fire1 at 25/100/0; restore route/tavern context on exit. Keep native mute/volume handling.
- [x] Update the existing progression/retreat tests and helper navigation for the new camp boundary. Provide focused native entry/exit observations and the fixture recipe; leave loss presentation and full runtime acceptance to their named owners.
- [x] Update task status and the graph from actual results, with evidence paths, revision and remaining gaps. Leave unexecuted criteria pending.

## Validation

Execution mode/reference: use the modes and scenario references below from [verification.md](verification.md). Commands resolve through [tasks.md](tasks.md#commands-and-evidence); choose actual registered IDs and fresh output paths.

| Verification ID / role | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-001 (primary) | C-FAST / C-FOCUSED; existing pure transition owners | All three routes pause at 2/4 with 1–3 participants; no premature next assignment; camp-only unrestricted retreat; invalid/stale actions preserve state. | Pending; record exact receipt/capture/decision path in Execution Notes. |
| V-002/006/008 (contribution) | Focused native inputs; S-01/S-03/S-06 references | Entry/exit continuation and requested audio context are observable; task 07 owns full native persistence, task 09 directed/audio acceptance. | Pending; record exact receipt/capture/decision path in Execution Notes. |

Invalidates/reuses: Route dispatch, Rules/Bridge, action metadata and event-list indices invalidate these results. Reuse only unchanged candidate receipts; later native-list changes require new self-produced saves. No verdict for the still-unimplemented loss/social branches.

## Execution Notes

2026-10-16, `feat/campfire-hero-bonds`, base/head `e920095` plus working tree. Implemented route pauses at resolved positions 2/4, priority of total loss/terminal completion, camp-only retreat for any living party, Map045 and fire-only CE067 context. Schema2 and death-witness source facts are installed. UT-006/007/029–031 and native IT-013 pass against the pruned candidate; all-route directed coverage remains owned by task09.

Evidence and current limits: [verification](verification.md), [QA report](../../../docs/qa/reports/2026-10-16-campfire-hero-bonds.md). Raw receipts under `.artifacts/campfire-*` and `docs/qa/runs/campfire-hero-bonds/` are local ignored evidence, not fresh-clone inputs. Required human acceptance is not inferred.
