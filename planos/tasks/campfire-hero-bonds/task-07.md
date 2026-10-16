---
id: "07"
status: completed
depends_on: ["06"]
verification_ids: ["V-002","V-004"]
---

# Task 07 — Resume the integrated camp candidate without repeating decisions

## Outcome

The assembled feature saves and restores actual native continuations at all approved semantic boundaries, preserves irreversible state, and retains its loaded content after pruning.

## Authority

RQ-001/002/007/008/011/012; programming checkpoints/failure recovery; V-002/V-004 and S-05; spec packaging; SD-015; F-001 accepted-risk exception.

Read the linked sources and path conventions in [tasks.md](tasks.md#authority-and-execution-boundaries), with [spec.md](spec.md) and [verification.md](verification.md) as the acceptance contract. Primary verification ownership: V-002, V-004.

Proposed owner/support: Edney (Programming). Estimated effort: 1–2 days, subject to the graph's capacity rules.

## Scope

- Implementation/data/assets: Integrated CampaignRules/EventBridge and actual checkpoint callers in Map045, hero maps and CommonEvents.json; affected native QA/test helpers and registration files; Languages.tsv/key/asset references. Fix only contract gaps revealed by this join; no new persistence layer, interpreter reconstruction, migration or content gate.
- Tests: persistence.mjs (UT-042/044/045/063; IT-015/016/017/018/020/024/039/044/062/066 as relevant), native-checkpoints.mjs IT-014, retreat/encounters owners. Update test-manifest.json and execution-groups.json together for justified additions. Reuse canonical IDs rather than blanket-running every listed heavy case.
- Fixture and readiness owner: Own fresh saves from a new campaign on the integrated candidate, including camp entry, one completed grief with more pending, completed optional topic, and Continue/retreat exit. Record origin/profile, file, candidate hashes, native map/list/cursor and checkpoint sequence. Task 09 reuses only compatible saves from the same run or recreates them.
- QA/docs: Record actual receipts and follow-ups below; update [verification.md](verification.md) and affected existing contracts for this scope. Hand remaining directed/human observations to tasks 08/09 without claiming acceptance.
- Delete targets: None.

## Checklist

- [x] Capture the integrated signal before changes; audit each action/completion/checkpoint ordering and its native interpreter continuation, including child-interpreter waits.
- [x] Verify positions/assignments/deaths after Continue, retreat, another attempt, final-member loss and terminal route completion; reject double/stale actions without a repeated reward, death or ending.
- [x] Exercise native save/load at entry, arrival completion, per-grief completion, topic completion and exit; unfinished topics remain unread and successfully saved completed units do not repeat. Include a new suffix/bridge and language-independent read history.
- [x] Verify real saved contents and restored native cursor/pictures, not only domain-object serialization. Separate harness-controlled failure tests from player-earned directed evidence.
- [x] Exercise existing save-failure handling and wait/promise recovery at a representative affected boundary. A failed write retains in-memory completion but reload uses the last successful checkpoint; do not claim unsaved progress durable.
- [x] Honor F-001: no Talk-only checkpoint, observation revision, dirty flag, altered sequence deduplication or dedicated legacy-Talk reload/two-Talk case.
- [x] Run the focused canonical selection against a fresh pruned candidate with --pruned. Confirm loaded native references retain Camp, BGS Fire1, portraits, localized keys and the indicator plugin; do not activate or test against inactive ItemsEquipsCore.
- [x] Consolidate the final 48/8/3/16/16 native content inventory, all locales/references, source revision and remaining human/evidence gaps. Update `rpg-maker/README.md` with camp authoring and the new-campaign/accepted-Talk limitation where relevant. No prose mirror or golden snapshot.
- [x] Hand task 08 the exact native-input recipes, receipts, actual test IDs, invalidation dependencies and evidence locations; run no publication/export workflow merely to create a second implementation.
- [x] Update task status and the graph from actual results, with evidence paths, revision and remaining gaps. Leave unexecuted criteria pending.

## Validation

Execution mode/reference: use the modes and scenario references below from [verification.md](verification.md). Commands resolve through [tasks.md](tasks.md#commands-and-evidence); choose actual registered IDs and fresh output paths.

| Verification ID / role | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-002 (primary) | C-FOCUSED; retreat/encounters/persistence plus selected native continuation | Renewed attempts preserve assigned traps, losses and greatest progress; Continue advances once; automatic return/terminal outcomes remain correct. | Pending; record exact receipt/capture/decision path in Execution Notes. |
| V-004 (primary) | C-FOCUSED in persistence/native-checkpoints; S-05 native boundaries | Actual save/load restores incomplete/completed social state and cursor, with remaining grief and failure recovery; F-001 remains waived. | Pending; record exact receipt/capture/decision path in Execution Notes. |
| V-005 (contribution) | C-LANGUAGE and one-time pruned native content/asset inventory | 48 bases, 8 suffixes, 3 arrivals, 16 reactions and 16 complete contextual subjects have valid loaded references. | Pending; record exact receipt/capture/decision path in Execution Notes. |

Invalidates/reuses: Any save-relevant schema/rules change or edited native command list invalidates affected saves and continuation evidence. Do not reuse historical-spec/user saves. Final QA may reuse fresh compatible receipts without re-running covered combinations; record omissions under G006.

## Execution Notes

2026-10-16, `feat/campfire-hero-bonds`, base/head `e920095` plus working tree. Integrated all four new semantic checkpoints and candidate schema. Fast61 pass; IT-013/018/019 pass; expanded IT-014 passes .artifacts/campfire-checkpoints-20261016-02. Actual native Continue restores camp entry, arrival completion, completed social topic and camp exit. Directed d24d71bc reloads between two grief reactions and interrupts an unfinished topic; 22bbee0c reloads completed topic. The current pruning inventory retains Camp, Fire1, portraits and the active extension; all404 prose rows and881 language keys validate. README documents authoring/new-campaign/F-001 limits.

Evidence and current limits: [verification](verification.md), [QA report](../../../docs/qa/reports/2026-10-16-campfire-hero-bonds.md). Raw receipts under `.artifacts/campfire-*` and `docs/qa/runs/campfire-hero-bonds/` are local ignored evidence, not fresh-clone inputs. Required human acceptance is not inferred.

### Coverage value and maintenance

UT-076/077/078 extend canonical formation/persistence ownership; no parallel suite. The repository's eight questions resolve as follows: (1) they prevent losing newly eligible dialogue, repeating grief, consuming an ineligible topic or saving an unfinished boundary; (2) each changes player-visible progress/read history; (3) these involve several transitions/reloads and cannot be judged as appearance in ten seconds; (4) source-fact contracts are stable despite prose/layout iteration; (5) assertions concern returned state/actions and serialization, not private rendering; (6) existing cases lacked the new social identities/boundaries, while existing retreat/encounter cases were updated instead of duplicated; (7) pure cases need no browser, and IT-014 reuses its existing native save session; (8) the programming owner maintains these canonical suites when changing campaign rules.

Removed only obsolete translated-prose equality assertions from UT-033/034, retaining all rule/ending assertions. They violated question5 (a copy-only revision broke the test) and the repository's explicit no translated-text comparison rule. No failing behavior test was deleted. The initial failure and diagnosis are retained in fast03.

Baseline pruned UT-029/030/031 passed in `.artifacts/campfire-baseline-20261016`. Intermediate fast01/02 exposed helpers that skipped new camp phases; fast03 exposed old retreat/prose expectations. Fast04 passed58 existing cases; fast05 passed61 including the three new social cases. The first expanded IT-014 attempted to install a state after its entry checkpoint and therefore never observed that checkpoint; checkpoint02 starts at the real preceding consequence and passes. These are preserved test-fixture failures, not waived product failures.
