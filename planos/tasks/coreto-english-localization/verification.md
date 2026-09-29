---
status: approved
implemented: true
static_verified: true (V-001, V-006)
runtime_verified: true within D-024 reduced scope
human_accepted: true (D-025)
release_ready: true (this spec's scope)
---

# Verification — Coreto English localization

This verification contract was approved with the technical design on
2026-09-29 (D-015) and amended the same day by D-017–D-023 (peer review
rounds 01–04). It verifies the localized game on top of the Coreto provider
baseline delivered by separate work (D-013, D-014); it does not validate that
migration. No game validation or player evaluation has been executed. Source
inspection and documentation validation are not runtime evidence.

## Sensor matrix

| ID | Requirement | Sensor | Setup/inputs | Expected observable | Evidence | Freshness owner | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| V-001 | RQ-001/004 | Native CLI validation and read-only source review | Full keyed inventory of player-facing sources/consumers, including string literals in Control Variables (Script) operands (D-023c); both table columns; D-020 baseline | Every source mapped or explicitly non-player/proper-name. No missing or empty cells or keys. Payloads are a key plus native control tags and block wrappers (D-018). A `\V[n]` payload is valid when every value assigned to `V[n]` is a key, a preserved proper name or a composition of them, and the source map lists its assigners. No Portuguese literal remains in a code-122 script. Show Text is keyed per block. The header is exactly `Key` plus `Localization.Languages` (`English`, `Portuguese`), and no template sample key (`Greeting`, `Farewell`, `Wow`) remains. Both columns of a key carry the same set of `\V[n]`, `<I>`, `\EFFECT`/`<CLEAR EFFECTS>` and casing tags; `<br>` is free per language. No straight `"` or tabs in cells | task-07 Execution Notes; rechecked after task-09 copy fixes (table sha256 `979202a9ae625ba7…`) | Source copy, table, assets and consumers | pass (2026-09-29) |
| V-002 | RQ-001/002 | Live browser observation, plus existing game tests only where relevant | Candidate-created campaign and its own saves; native language option | Initial English, retained supported preference, native switching and campaign continuity | [QA report](../../../docs/qa/reports/2026-09-29-coreto-english-localization.md) lots A, B | Providers, configuration, scenes, events and save behavior | pass for the reduced scope (D-024): L10, L11 (A7), L12 |
| V-003 | RQ-004 | Visual inspection in directed play | All layout classes and risk-selected long entries | Complete readable text, including graphics, options and variables, in both languages. `<WordWrap>` picture labels fit their pictures. Italic and animated beats stay readable; Text Effects starts on and animation stops when it is turned off; structural `<br>` breaks keep destination names apart from descriptions | [QA report](../../../docs/qa/reports/2026-09-29-coreto-english-localization.md) lot C | Text, fonts, geometry, assets and text treatment | pass with two fixes in task-09 (Andirá preset, four memorial causes); PT comparison, 1920×1080 and two closings cut (D-024, risk accepted) |
| V-004 | RQ-003/004/005 | Separate agent's readability review and directed player-role session | Fresh agent uninvolved in translation/development; frozen candidate | Specific complexity, comprehension and atmosphere findings with passage/context evidence | [l15-report.md](l15-report.md) | English copy and actual runtime presentation | done as read-only corpus review (D-024); played route cut; 12/16 findings fixed, 4 source-level for Edney |
| V-005 | RQ-003/006 | Human editorial review | Translation and separate-agent findings supplied to Edney | Explicit editorial decision; unresolved concerns remain visible | [entrevista D-025](entrevista.md), [editorial packet](editorial-packet.md) | Source/translation and subsequent editorial changes | accepted by Edney 2026-09-29 (D-025) |
| V-006 | RQ-001/002/004 | Read-only inspection of configuration against the D-020 baseline commit | Coreto plugin parameters, `System.json`, `index.html`, `package.json`, plugin registry and source/bundle hashes | Localization is enabled with `[English, Portuguese]`, the TSV file and English as default. The General category holds the language and Text Effects rows, with keyed labels and `AddOption=true`, beside the four keyed Áudio rows. Every changed parameter path is listed with its reason (D-017). No plugin was added, removed or reordered. Coreto sources and bundles are unchanged. `gameTitle`, `<title>` and `package.json` `window.title` read “The Dryland Drowned” and are not keyed (D-019, D-022) | task-01/02/07 Execution Notes (2026-09-29) | Changed parameters, registry and title | pass (rechecked in task-07; task-06 made no `LanguageImages` change) |

## Independent agent evaluation contract

- Delegate to a fresh agent that has not translated, implemented or co-authored
  the candidate. Do not provide the translator's self-review as its verdict.
- Give it the playable candidate, normal controls and the evaluation brief.
  Player-facing reading comes before implementation or translation rationale.
- Ask it to explain the situation and available choices in its own words, and
  flag unnecessarily complex words, sentences or referents. Record the actual
  passage, location and effect on comprehension. Distinguish uncertainty that
  creates horror from confusion caused by wording.
- Assess whether simpler proposed wording preserves tension, voice, facts and
  clues. Do not impose an arbitrary readability score as proof of accessibility.
- Use only normal player actions to mutate a campaign. The testing agent prepares
  its own campaign/saves under SD-015; no injected state, seed or preexisting save.
- Record exercised coverage honestly. A representative runtime walk does not
  prove every branching passage was seen. Technical design must pair that walk
  with broader translated-corpus review and name unvisited coverage.
- Report this as an agent evaluation, not a human playtest or a claim of an
  independent blind replay. Edney remains the editorial acceptance owner.
- Track findings to resolution or Edney's explicit editorial disposition; repeat
  the affected review after material revisions rather than declaring a first
  report sufficient by its mere existence.

## Commands

Run from the repository root. The commands below are planned, not executed
results. Help/catalog discovery occurred during specification; that does not
verify the eventual candidate. Provider installation is not part of this
increment (D-014).

| Purpose | Existing command | Result |
| --- | --- | --- |
| Discover | `node coreto/tools/coreto/cli.mjs message --help --json` | Read during authoring |
| Create table | `node coreto/tools/coreto/cli.mjs --project 'rpg-maker/The Dryland Drowned' message language create --format tsv --json` | pending; then reduce the template to `Key`/`English`/`Portuguese`, delete sample rows, and edit native table data |
| Validate native table | `node coreto/tools/coreto/cli.mjs --project 'rpg-maker/The Dryland Drowned' message language validate --format tsv --json` | pending |
| Validate changed data | `node coreto/tools/coreto/cli.mjs --project 'rpg-maker/The Dryland Drowned' core validate --json` | pending; inspect diagnostics for localization edits; provider-baseline diagnostics go to the migration owner |
| Existing game tests, only if relevant | Select existing IDs in `rpg-maker/tests/test-manifest.json` using the documented Node runner; no plugin-qualification suite | pending risk selection; not a full-suite gate |
| Supported play surface | `npm start -- --port 18737` from the worktree root, after reading `docs/_memory/local-game-run.md` | pending; never use or clear the user's `127.0.0.1:18726` origin (D-020); preserve preexisting servers/sessions |

CLI table validation verifies structure, not full player-text coverage or English
quality. Review every table cell/reference and reachable source against the keyed
mapping; keep specific omissions open. Existing suites remain unchanged under
D-009. An assertion coupled to old PT strings is an explicitly
identified stale assertion, not a passing test. Real behavioral failures remain
blocking. No new test/generator/adapter code may be written for this increment.

## Runtime scenarios

Browser execution uses normal keyboard/mouse inputs through existing browser
tools or applicable existing directed cases, with read-only observation. Do not
invent new runner code or inject campaign state. The native QA charter is
[CH-coreto-english-localization](../../../docs/qa/charters/CH-coreto-english-localization.md).

| Scenario | Starting state | Steps | Expected result | Evidence | Execution mode | Reason/requirement | Required variants | Evidence to reuse | Invalidation dependencies |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| L10 | Candidate served on `127.0.0.1:18737`; before clearing that origin's storage, the executor confirms with `lsof` that the listener is its own server; no personal saves | Open title → Options → choose PT → return → reopen → choose EN → toggle Text Effects off/on → New Game | Initial EN; language and Text Effects rows visible with localized labels; stored preference retained; warnings, menus and prologue localized; browser tab reads “The Dryland Drowned” | pending | directed-browser | RQ-001/002, native categories/persistence | First run on the clean 18737 origin; returning supported PT/EN preference; keyboard and mouse across path | Same session for configuration/entry | Registry, table, CE002, Options parameters |
| L11 | Own candidate campaign | Conversation → Options switch → return; inspect choice/picture text, variable names, reread and controls; reach one encounter's approach picture labels and one treated passage (italic or animated) | Native refresh, readable text, no unwanted action, lost campaign decision or broken controls; hidden choice window stays hidden; wrapped labels fit | pending | directed-browser + visual | RQ-002/004; redraw, event lifecycle and D-018/D-021 markup | Both directions; dialogue, long approach, variable-to-key name, menu, Text Effects off | L10 campaign | Events, table, providers, font/layout, text treatment |
| L12 | Own candidate campaign and normally selected file | Reach a semantic checkpoint → reopen → Continue in other selected language → play forward | Current-slot save retained; same progress/deaths; no duplicate consequence/checkpoint or obsolete visible language | pending | directed-browser + read-only state | RQ-002; Save continuity on the Coreto baseline | One reading checkpoint and one committed consequence; no old/external saves | L11/L13 saves with provenance | Provider baseline, Bridge, authored lists |
| L13 | Fresh candidate campaigns; branch only through normal choices | Play EN to an ending with a loss; cover the other structurally distinct closing paths and long-layout classes through candidate play | Accessible EN journey, localized choice/outcome/closing/credits and preserved progression/pictures/audio controls | pending | directed-browser + visual | RQ-001/004; unique closing text paths | Reunite, destroy, total loss; representative EN success/failure/retreat; one PT comparison sequence; 1280×720 and representative 1920×1080 | Share own compatible saves only; paired with full corpus V-001/004 | Provider set, native campaign/closing events, table/assets |
| L15 | Frozen candidate and fresh agent with no development participation | Agent plays an EN campaign by normal input; records understanding; afterward reviews all remaining keyed EN copy with context | Evidenced readability/atmosphere report, complete corpus coverage distinct from visited runtime coverage | pending | directed-browser, then independent read-only editorial evaluation | RQ-003/005 | All corpus keys; representative played route, dialogue, failure/loss and closing | Its own played campaign only | English copy, translation context, runtime presentation |

L14 was removed before execution under D-011: generic loader/fault testing would
retest a plugin rather than the localized game. This is an explicit scope removal,
not an executed pass. Likewise no provider-internal unit, compatibility-matrix,
gamepad or plugin certification campaign is required. Game boot and actual
language/resource use are observed within L10–L13. V-006 inspects only this
increment's own configuration edits, not the provider migration (D-014).

Do not require a separate heavy runtime visit to every prose leaf: complete
source/corpus review checks coverage; representatives exercise common rendering
and interpreter paths. Retain the three structurally distinct closings and each
layout/integration class. Record evidence-backed further grouping under G006;
unseen branches are not marked played. Translation/layout changes, and provider
baseline changes delivered by the migration owner, reopen affected observations
and editorial findings. No inherited E2E waiver.

## Evidence and cleanup

All execution and candidate changes belong to the dedicated branch
`spec/coreto-english-localization` and its managed worktree, on top of the
recorded D-020 baseline commit. Do not start the original checkout's runtime as
if it were this candidate. The candidate is always served on port 18737, so its
configuration and saves live only in the `127.0.0.1:18737` origin. The user's
18726 origin, personal saves and settings are never read, written or cleared.

Each result records candidate/source hashes, native version, real inputs,
observations, captures, reviewer and affected keys. Preserve first failures and
retest affected fixes. Reports live in the existing QA tree; raw runs remain
ignored, and selected reviewed devlog captures move to delivery material only
after acceptance. No captures or result artifacts are fabricated during planning.

Close only resources opened for testing, including independent-agent resources.
Confirm actual closure; a failed cleanup stays visible. Preserve user tabs,
servers, storage and personal saves. Gamepad/native zoom remain out of scope.

## QA plan (task-08)

Executable plan: [docs/qa/guides/coreto-english-localization.md](../../../docs/qa/guides/coreto-english-localization.md).
Lot A → L10/L11, lot B → L12, lot C → L13 (1280×720, one 1920×1080 path),
lot D → L15 ([brief](l15-brief.md)), lot E → V-005
([packet](editorial-packet.md)). Human checks: Edney's editorial decision
only. No lot has been executed.

## Human acceptance

| Criterion | Owner | Decision | Evidence/date |
| --- | --- | --- | --- |
| Faithful, accessible English retaining horror and character voice | Edney | accepted (D-025: “essa spec está aprovada”) | 2026-09-29; open follow-ups: L15 F03/F10/F12/F14 |

## Release verdict

`PASS` (final verify, 2026-09-29) for this spec's declared delivery, not for
the game jam release. Candidate: HEAD 92dc14f + working tree, Languages.tsv
sha256 `979202a9ae625ba7…`, plugins.js `cf934a24666bba3b…`, CommonEvents.json
`00a79112c28f756d…`, System.json `ad49ee77c81cac94…`; Node v22.23.2.

- implemented: tasks 01–09 done.
- static_verified: V-001 and V-006 pass on this candidate (`message language
  validate`: 451 keys; `core validate`: valid, one pre-existing warning;
  Coreto sources unchanged).
- runtime_verified: pass within the D-024 reduced scope (L10, L11, L12, one
  L13 campaign; L15 as corpus review). Cut variants are accepted residual
  risk, not passes.
- human_accepted: V-005 accepted by Edney (D-025).
- release_ready: yes, for this scope. Implementation review `SHIP`
  ([review-impl-01](review-impl-01.md)).

Known follow-ups (not blocking, accepted): L15 source-level items F03, F10,
F12, F14; update the existing test helpers (80 stale failures); 22 placeholder
images (art); memorial-cause fix proven by equivalence only.

### Organization (post-acceptance)

- Delivery material: `docs/qa/deliveries/coreto-english-localization/`
  (README, five real captures, `selected-images.json` with hashes).
- Raw evidence archived locally, not versioned:
  `.artifacts/archives/coreto-english-localization-accepted-20260929/`
  (130 files, `MANIFEST.sha256` checked, all OK); available on this machine
  only. `docs/qa/evidence/` stays ignored.
- Candidate set: 77 changed/new paths, all owned by this spec (including the
  review-04 amendments). Nothing excluded. Commits and the PR belong to the
  publication step that follows.

## Specification candidate audit

Keep the spec, verification, stories, interview and two ADRs: each owns a distinct
contract or user decision. Peer reviews (`review-NN.md`) keep the evidence behind
D-017–D-023 and become historical once incorporated. Keep the four discipline contracts for affected text,
UI, configuration and image-text responsibility. Keep source-analysis as dated
repository evidence, not a second live status store. Keep the QA charter linked
from the existing creative-review journey. Keep the GDD and two memory edits
because they remove conflicting PT-BR-only authority. The GDD edit also scopes
animated text out of reduced motion (D-023d). Keep `tasks.md` and
`task-01.md`–`task-09.md` as the approved execution graph. No runtime,
engine/plugin or test-code files are part of this specification delivery. The
provider migration is the separate baseline commit d17d886 (D-014, D-020).

Authoring validation checks local links, RQ/V ownership, explicit approval states,
native-only restrictions and absence of runtime edits. Product-only Part I and
technical interfaces, data, transitions, integrations, verification and file
references are checked manually; no absent historical marker script is claimed.
Full-spec approval was granted on 2026-09-29 (D-015); implementation evidence
flags above remain false. No app, server or browser was opened during authoring.
