---
status: approved
implemented: true
static_verified: true
runtime_verified: false
human_accepted: true
release_ready: true
---

# Verification — One RPG Maker MZ project

[Spec](spec.md) defines requirements; the [Programação contract](retire-html-prototype.programacao.md) defines engineering ownership. The user approved this contract on 2026-09-10 and subsequently limited its execution to browser-free unit tests and static checks, explicitly confirming that scope with “Atende”. Implementation evidence is recorded below; the user accepted the final documentation on 2026-09-10 ("está aprovado").

## Accepted execution boundary

Do not launch Chrome, a browser driver, directed gameplay or native browser integration tests for this increment. Existing browser cases remain available for other work, but are not acceptance gates here. Do not report their exclusion as a pass. The canonical Node entry mixes unit and browser cases; a UT prefix alone is insufficient because UT-059 launches Chrome.

Static directory/reference checks, asset preservation, native-data comparison and the content validator remain required. Runtime behavior, native storage, visual feedback and real Continuar remain unverified. This is an explicit accepted sensor exclusion, not a claim that unit tests prove those surfaces. Completion may be assessed against this reduced scope while runtime_verified remains false; missing Chrome evidence is not a blocker for this increment.

## Preservation comparisons

Capture all existing MZ assets before implementation and compare their paths and hashes afterward. Every pre-existing asset must remain at the same path with identical bytes, including assets not detected as used.

For V-004, capture the native data file inventory and parsed JSON before edits. Compare the final inventory and every parsed value against that baseline. Only individually identified explanatory source-annotation values may differ; record their exact file/JSON locations and before/after values. All other values, array order and command fields remain identical. Functional comment metadata is protected, so excluding comments wholesale is forbidden. Record the native-layout manifest revision separately. Preserve the comparison result and permitted-change list as execution evidence. This one-time sensor implements approved peer-review F-001 without requiring a permanent test suite.

## Sensor Matrix

| ID | Requirement | Sensor | Setup/inputs | Expected observable | Evidence | Freshness owner | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| V-001 | RQ-001, RQ-005 | Filesystem/static | Updated checkout, tools and asset baseline | Retired directory absent; no alias/fallback or recreating tool; every existing MZ asset preserved | Consumer inventory, tool review, asset paths/hashes | Deleted tree, scripts, imports, assets | passed |
| V-002 | RQ-002, RQ-003, RQ-005 | Static/editorial review | Tracked docs, hidden instructions, ignored local docs/tools | No unresolved directory references, stale navigation or introduced broken links; historical facts and attribution preserved | Search scope, dispositions and link review | Documentation, provenance, examples and this spec set | passed |
| V-003 | RQ-004 | Browser-free Node unit tests and oracle review | Existing unit/content suites; absent retired tree; resolved module imports | Selected unit tests pass; missing passage/order/branch faults fail for the intended reason; no browser launch | Assertion mapping, negative cases and filtered unit output | Tests, oracle, native content, helpers and imports | passed |
| V-004 | RQ-001, RQ-005, RQ-006 | Native-data comparison, content validator, asset hashes, launch-source review | Pre-edit data/assets baseline and final native files | Only identified annotation values differ; other data/assets preserved; validator succeeds; documented launch configuration unchanged | Native comparison, allowed changes, manifest revision, validator, asset comparison and source diff | Baselines, native files, launch source, assets | passed |
| V-005 | RQ-006 | Pure persistence unit tests and manifest review | Current layout and valid/invalid/incompatible envelopes | Pure envelope round trip preserves state; incompatible/invalid envelopes reject; manifest is consistent | Existing unit output and manifest review; no native-storage claim | Envelope functions, fixtures, manifest | passed |
| V-006 | RQ-002, RQ-003 | Document review | Final diff and entry-point docs | MZ game location is clear; history and accepted/provisional distinctions are truthful | Final review decision/date | Final documentation diff | passed |

## Commands

Run from the repository root during implementation verification. Executed results are recorded by their task owners; historical authoring checks remain distinct.

| Scope | Command | Last result |
| --- | --- | --- |
| Change boundary | `git status --short` and `git diff --check` | passed, rechecked on 2026-09-10 |
| Directory absence | Filesystem absence check recorded in task 02 | passed |
| Candidate directory references | Classified static scan of current and historical documents, metadata and tooling | task-04 disposition records |
| Semantic candidate review | `rg -n --hidden --no-ignore -g '!.git/**' -g '!**/node_modules/**' -g '!docs/qa/evidence/**' -g '!docs/qa/runs/**' -e 'protótipo HTML' -e 'HTML prototype' -e 'offline reference' -e 'file://' -e 'ExpeditionNarrative' -e 'ExpeditionData' AGENTS.md CLAUDE.md docs rpg-maker planos pitch .compozy .agents .agents-coreto .codex` | classified in task-04; final-document-scan.json in task-06/20260910-01 records no unresolved references |
| Native validator | `node rpg-maker/tools/validate-content.mjs --json` | passed, exit 0 |
| Browser-free unit selection | `node --test --test-name-pattern='^UT-(?!059)[0-9]{3}' rpg-maker/tests/campaign.test.mjs` | passed, 65/65 in isolated workspace |

Omit search roots only after confirming they are absent. Search is a candidate finder, not the complete oracle: inspect encoded URLs, constructed paths, bare directory mentions and relative links. No matches normally exits 1; unreadable files are not a clean result. Include hidden documentation and JSON metadata. Immutable raw telemetry may retain historical strings but never serve as current guidance. Do not exempt historical documentation wholesale.

Before final scanning, sanitize obsolete deletion-path identifiers in this spec into a completed-retirement description as required by RQ-003. Preserve requirement IDs and outcomes. No permanent scanner is required.

The filtered unit command reflects the inspected suite: UT-059 calls the browser, while the other selected unit bodies operate without it. Before execution, recheck selection and module imports against the final tests; exclude any newly browser-dependent case with an explicit reason, not silent suppression. The entry imports native-inventory.mjs even when IT-047 is not selected, so its obsolete file reads must be resolved. Retain useful browser assertions and map required structural obligations into existing content/parser unit coverage with independent expected results. Do not run the unfiltered aggregate, IT-047, UT-059 or directed runners for this increment. Record selected IDs, excluded cases, Node version and input hashes.

If native files change, assign a fresh unused revision through `rpg-maker/tools/revise-layout.mjs`, then validate. The version change follows existing policy without invoking a browser or promising save migration.

## Unit scenarios and expected-result authority

| Scenario | Setup | Method | Expected result | Authority | Status |
| --- | --- | --- | --- | --- | --- |
| U-001 | MZ/GDD oracle and native content, independent of retired files | Existing content/parser unit tests | Required passages, scene order, hero content, lover-order variants and approach branches satisfy reviewed contracts | RQ-004, native content contract and approved GDD | passed |
| U-002 | Disposable malformed content fixtures | Missing passage, changed required order and missing branch negative cases | Each defect causes its intended assertion/validation failure | RQ-004; no expectations derived from actual text during the same test | passed |
| U-003 | Valid campaign envelopes and deliberately invalid/incompatible copies | Existing UT-044, UT-045 and UT-058 | Round trip preserves campaign facts; invalid versions/data reject at the pure validation boundary | RQ-006; existing envelope contract | passed |

No runtime scenarios are required. The previously planned S-001 launch smoke, S-002 browser continuation and S-003 browser incompatible-save handling were removed from this increment by explicit user instruction. No browser run, screenshots, audio review, full campaign replay or real storage operation is needed to close this spec. Preserve their implementation behavior through the approved no-change contract; do not claim they were exercised.

## Retained native-content oracle

The shared `rpg-maker/tests/helpers/native-content.mjs` independently enumerates 160 ordered scene plans and 258 required passage identities from the accepted native families. UT-047 and the retained browser case IT-047 consume the same contract; IT-047 was not executed in this increment. The expectations are not derived from the observed event text.

The contract preserves hero families and memorial entries, encounter results and death contexts, both lover orders and their warning/reward sequence, and the 16 groups of three approaches. UT-048 rejects missing passages and reordered scenes; UT-052 rejects missing choice branches, using detached fixtures rather than live game mutations.

Exact historical paragraph equality was a migration-only constraint. Native prose remains editable in MZ; text must be nonempty, metadata valid, and the two confirmed map receipts retain exact wording. This does not prove editorial accuracy or detect arbitrary nonempty replacement text. The separate one-time comparison of every native JSON value proves that this retirement changed no prose beyond the identified source annotation. No second editable prose catalog or retired runtime is retained as an oracle.

## Human Acceptance

| Criterion | Owner | Decision | Evidence/date |
| --- | --- | --- | --- |
| Original spec and engineering/verification contracts | User | approved | 2026-09-10 — “Aprovo” |
| Incorporate F-001 native-data comparison | User | approved | 2026-09-10 — “Pode” |
| Remove Chrome/browser tests; retain browser-free unit tests and static comparisons | User | approved | 2026-09-10 — explicit instruction followed by “Atende” |
| Final documentation clearly establishes MZ and preserves historical truth | User | approved | 2026-09-10 — “está aprovado”; [accepted document hashes](../../../docs/qa/deliveries/retire-html-prototype/human-acceptance.json) |

Existing creative acceptance remains attached to its original artifacts; it is neither revoked nor extended here.

## Authoring checks

Read-only inspection identified IT-047 module-load dependence, the canonical mixed test entry, UT-059's browser call and pure persistence cases. No unit suite, content validator or browser test was executed during this amendment. Original document checks and independent review remain recorded in their artifacts. Fresh document integrity checks are separate from implementation acceptance.

## Release Verdict

`PASS` — Native preservation, selected unit verification and documentation review passed. Final human acceptance of the implemented documents was received on 2026-09-10. This verdict covers only the approved retirement scope; runtime verification remains explicitly not performed, and it does not certify the unrelated browser-audio tooling or a public game release.

## Execution evidence — 2026-09-10

V-001/V-003: task-02 evidence under `docs/qa/evidence/retire-html-prototype/task-02/20260910-01/`. The retired directory and obsolete consumers were removed. Negative fixtures reject missing passages, changed scene order and missing choice branches.

V-004/V-005: task-03 evidence under `docs/qa/evidence/retire-html-prototype/task-03/20260910-01/`. All 50 native data files compared; only the named source annotation changed. All 1,326 assets and launch sources preserved. New layout revision `mz-20260910-retirement-01`; validator exit 0, 65 selected units passed. No Chrome or native storage was exercised.

V-002: task-04/20260910-01 dispositions and editorial review, including independent closure of all three semantic findings. Final freshness: task-06/20260910-01. The initial count of 47 removed tools was corrected to 28 after restoring 19 raw MZ plugin snapshots byte for byte; initial evidence remains preserved with its correction.

Follow-up freshness: task-06/20260910-02 reconfirmed 42 unit input hashes, 1,326 assets and the 50 native JSON comparisons. The content validator passed again on Node v26.7.0, exit 0. Stale task-progress statements were corrected and the updated closure documents reviewed. Earlier unit results remain applicable by input equivalence; no unit suite or browser was rerun. At that pre-acceptance checkpoint, V-006, human_accepted and release_ready were pending/false; the subsequent user decision above closes V-006.

## Post-acceptance organization — 2026-09-10

Scope: the accepted `retire-html-prototype` delivery, tied to HEAD `d01cba6fe08b2b1191dc6df246fb54cf391b238a` and the document hashes in [human-acceptance.json](../../../docs/qa/deliveries/retire-html-prototype/human-acceptance.json). The user's “está aprovado” closes V-006. Organizational edits record that decision without changing gameplay or the accepted documentation policy.

The [delivery material](../../../docs/qa/deliveries/retire-html-prototype/README.md) preserves outcome, validation limits and a factual nonvisual devlog brief. No new image is required for this maintenance scope; no playtest or recording is claimed.

Archive: `.artifacts/archives/retire-html-prototype-accepted-20260910/`, with a detailed `manifest.json` mapping 2,128 source files to verified copies (58,876,755 bytes). All 955 originally indexed documents were checked against their baseline hashes before archival. The broader archive also retains all other original-directory files and this increment's raw execution records. The unconsumed candidate-review draft and one-time mutation script were removed from their original spec paths only after verified copying. Final review conclusions and their required hash baselines remain maintained. Existing raw evidence and the original external directory remain available locally; the archive is not available from a fresh clone.

Unrelated browser-audio tooling and postmortem files remain outside this delivery's acceptance. At this organization checkpoint, existing ignore rules covered archive and evidence destinations and the index was preserved. Commit messages and file groups belong to the separately requested commit preparation; no commits or remote actions are part of this organization.

Organization verdict: **PASS**. Rechecked all 2,128 archive hashes, 77 local links in maintained closure documents, positive archive/evidence ignore paths and negative maintained-input paths. All six tasks were completed and the index was empty at this checkpoint. All 42 unit input hashes remain unchanged. See [organization.json](../../../docs/qa/deliveries/retire-html-prototype/organization.json) for the independent organization result. No product tests were rerun during organization.

## Candidate review for the retirement PR — 2026-09-10

The independently based `codex/retire-html-prototype` candidate was reviewed against `origin/main` at `ca4dadc4213508f644090c0fb5b8cb10f6bdce0b`. This publication preparation follows the user's separate authorization to create one PR per logical group; the no-publication statements above describe the completed implementation/organization checkpoints. Audio tooling, postmortems and skill changes are outside this candidate.

Disposition: keep the native test oracle and provenance because maintained tests and asset attribution consume them; keep updated entry points and historical artboards because their readers require the current project and asset paths. Remove the retired runtime and obsolete tools after resolving those consumers. Keep this approved spec, task/review baselines and selected delivery records as frozen decision/evidence history; this verification file owns the final result. Raw logs and archive inventories stay local. No new duplicate status store or gameplay change is introduced.

The future-maintainer review corrected the guide's deleted-workspace dependency, framed authorship-time statements as history, identified ignored migration records and absent pre-analysis evidence as historical references, and retained the native oracle rationale above. All 141 local Markdown links in the candidate's surviving documents resolved to versioned/candidate files or directories. The guide's current commands execute from a normal checkout; its historical comparison is explicitly not reconstructible from the final tree alone. The previously verified local archive is not a long-term backup guarantee and was not recopied in this PR preparation.

Fresh verification ran in the isolated candidate worktree using Node v22.23.2: the filtered command above passed 65 units with zero failures (exit 0), and the native validator returned `{"ok":true,"errors":[]}` (exit 0). All 1,326 versioned files in css/img/audio/movies/icon/fonts/effects matched the Git base and the historical asset baseline. All 50 native JSON files were compared; only `CommonEvents.json/39/list/0/parameters/0`, the approved source annotation, differed. All 35 current provenance hashes matched. The independent oracle and its negative cases were inspected for the limits described above; `git diff --check` and deslop review passed. Local outputs, input fingerprints and the candidate inventory are in `.artifacts/pr-verification/retirement/` of that worktree, deliberately excluded from Git.

Candidate verdict: **PASS** for the retirement PR. The existing human acceptance remains applicable to these documentary corrections. Chrome, UT-059, all IT cases, live save/load, gameplay, screenshots, audio and visual artboard rendering remain unverified in this increment. This verdict certifies neither the other PR groups nor a game release. Commit and publication are tracked by Git and the PR, separately from the historical delivery record.
