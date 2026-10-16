---
id: "05"
status: completed
depends_on: ["04"]
verification_ids: ["V-003"]
---

# Task 05 — Offer contextual tavern subjects about every dead companion

## Outcome

Living tavern heroes offer the 16 directional About subjects when their canonical companion has died, with truthful witnessed/away and after/first composition and repeatable reading.

## Authority

RQ-006–008/011/012; programming witness/source facts, composition/read-unit rules and tavern map ownership; narrative tavern.* (all branches); UI menu order; F-001 accepted-risk disposition.

Read the linked sources and path conventions in [tasks.md](tasks.md#authority-and-execution-boundaries), with [spec.md](spec.md) and [verification.md](verification.md) as the acceptance contract. Primary verification ownership: V-003.

Proposed owner/support: Edney (Programming/editorial). Estimated effort: 2 days, subject to the graph's capacity rules.

## Scope

- Implementation/data/assets: Map037–044; CE003/038 for eligible hero context; Languages.tsv for all 16 subjects and eight About labels; CampaignRules/EventBridge for actual remaining composition/query gaps. Preserve CE348–351 and legacy Talk ownership.
- Tests: formation.mjs/content.mjs/retreat.mjs for all canonical directions, availability, composition and consumed units. Task 07 owns native save/load completion; task 06 renders the already-derived novelty.
- Fixture and readiness owner: Own a player-earned recipe for a survivor who witnessed a companion's death and one who stayed in town. Include About before its separate camp reaction, then after that reaction; never edit witnesses or death facts in the browser.
- QA/docs: Record actual receipts and follow-ups below; update [verification.md](verification.md) and affected existing contracts for this scope. Hand remaining directed/human observations to tasks 08/09 without claiming acceptance.
- Delete targets: None.

## Checklist

- [x] Capture current hero-menu counts, selection/removal conditions, return behavior and witness facts; use death-time witnesses rather than current party membership.
- [x] Integrate all 16 bilingual subjects, each with exactly one witness/away opening, one after/first bridge and its three body rows. Three body rows share one body read unit.
- [x] Insert up to two About options after Talk and before formation actions, in canonical companion order, for any living hero regardless of recruitment. Dead companions are names of subjects, never selectable speakers.
- [x] Use completed camp grief only to choose after/first. Reading the tavern subject must not consume the independent camp reaction; later after content makes the same subject new again.
- [x] Retain subjects after completion; mark only the rendered opening/bridge/body on whole-topic completion and save the native continuation. Do not add a dedicated save, dirty flag, observation revision or reload test for legacy Talk.
- [x] Consolidate V-003 across tone, all eight pairs/16 directions, presence/death, A/B eligibility, optional suffixes, multiple grief reactions and repeat/read semantics. Reject stale or ineligible actions without mutation.
- [x] Confirm that candidate Talk still uses its actual legacy read IDs, that shared social state is language-independent, and that no unavailable future unit causes novelty.
- [x] Record static key/participant counts for task 07/09 and current receipts for V-003; preserve pending human editorial decisions.
- [x] Update task status and the graph from actual results, with evidence paths, revision and remaining gaps. Leave unexecuted criteria pending.

## Validation

Execution mode/reference: use the modes and scenario references below from [verification.md](verification.md). Commands resolve through [tasks.md](tasks.md#commands-and-evidence); choose actual registered IDs and fresh output paths.

| Verification ID / role | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-003 (primary) | C-FOCUSED in formation/content/retreat owners | All canonical identities and representative presence/death states choose only eligible speakers/units; completed base alone does not hide a newly eligible suffix/bridge; grief runs once per direction. | Pending; record exact receipt/capture/decision path in Execution Notes. |
| V-004/005/007/009 (contribution) | C-LANGUAGE, content inspection and S-02/S-04 focused inputs | All 16 subjects and alternatives are authored; witness/away and prior-camp bridges are observable; native persistence and final human review remain with their primary owners. | Pending; record exact receipt/capture/decision path in Execution Notes. |

Invalidates/reuses: Changes to witness capture, pair metadata, composition rules, event branches and read IDs reopen V-003. No new prose registry or document-to-runtime synchronizer.

## Execution Notes

2026-10-16, `feat/campfire-hero-bonds`, base/head `e920095` plus working tree. Integrated all16 About topics as witness/away + after/first + fixed body, separate persisted units. Tavern reading does not consume camp grief. UT-077 enumerates ordered grief and contextual novelty. Directed d24d71bc verifies witnessed after, away first, later grief and renewed after bridge through public input.

Evidence and current limits: [verification](verification.md), [QA report](../../../docs/qa/reports/2026-10-16-campfire-hero-bonds.md). Raw receipts under `.artifacts/campfire-*` and `docs/qa/runs/campfire-hero-bonds/` are local ignored evidence, not fresh-clone inputs. Required human acceptance is not inferred.

## Presentation follow-up — 2026-10-16

User-approved refinement implemented on the same branch: nameplates/icons in both stages, three-second native absences with matching cleanup, Talk-specific bust framing and continuous interlocutors across reading units. [Verification](verification.md#presentation-refinement) owns fresh evidence and pending human acceptance. Prior captures remain historical.

Refinement checks complete: 61 fast + IT-009/010/011 pass; directed FIRST85fcd9fe, LOSSES9ec06f29, PT/reducedf3ecd89d pass with agent inspection. See verification for failure history, exact scope and human-acceptance limits.
