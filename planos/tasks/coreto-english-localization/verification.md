---
status: approved
implemented: false
static_verified: false
runtime_verified: false
human_accepted: false
release_ready: false
---

# Verification — Coreto English localization

This verification contract was approved with the technical design on
2026-09-29 (D-015). It verifies the localized game on top of the Coreto provider
baseline delivered by separate work (D-013, D-014); it does not validate that
migration. No game validation or player evaluation has been executed. Source
inspection and documentation validation are not runtime evidence.

## Sensor matrix

| ID | Requirement | Sensor | Setup/inputs | Expected observable | Evidence | Freshness owner | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| V-001 | RQ-001/004 | Native CLI validation and read-only source review | Full keyed inventory of player-facing sources/consumers; both table columns | Every source mapped or explicitly non-player/proper-name; no missing/empty cells or keys; correct tokens and choices | pending | Source copy, table, assets and consumers | pending |
| V-002 | RQ-001/002 | Live browser observation, plus existing game tests only where relevant | Candidate-created campaign and its own saves; native language option | Initial English, retained supported preference, native switching and campaign continuity | pending | Providers, configuration, scenes, events and save behavior | pending |
| V-003 | RQ-004 | Visual inspection in directed play | All layout classes and risk-selected long entries | Complete readable text, including graphics, options and variables, in both languages | pending | Text, fonts, geometry and assets | pending |
| V-004 | RQ-003/004/005 | Separate agent's readability review and directed player-role session | Fresh agent uninvolved in translation/development; frozen candidate | Specific complexity, comprehension and atmosphere findings with passage/context evidence | pending | English copy and actual runtime presentation | pending |
| V-005 | RQ-003/006 | Human editorial review | Translation and separate-agent findings supplied to Edney | Explicit editorial decision; unresolved concerns remain visible | pending | Source/translation and subsequent editorial changes | pending |
| V-006 | RQ-001/002/004 | Read-only inspection of localization configuration | Message Localization/LanguageImages, Options categories, source hashes | Localization enabled with `[English, Portuguese]`, TSV file and English default; language row beside the four Audio rows; no other provider parameter or plugin source changed by this increment | pending | Localization parameters and Options categories | pending |

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
| Create table | `node coreto/tools/coreto/cli.mjs --project 'rpg-maker/The Dryland Drowned' message language create --format tsv --json` | pending; configure/edit native table data afterward |
| Validate native table | `node coreto/tools/coreto/cli.mjs --project 'rpg-maker/The Dryland Drowned' message language validate --format tsv --json` | pending |
| Validate changed data | `node coreto/tools/coreto/cli.mjs --project 'rpg-maker/The Dryland Drowned' core validate --json` | pending; inspect diagnostics for localization edits; provider-baseline diagnostics go to the migration owner |
| Existing game tests, only if relevant | Select existing IDs in `rpg-maker/tests/test-manifest.json` using the documented Node runner; no plugin-qualification suite | pending risk selection; not a full-suite gate |
| Supported play surface | `npm start` after reading `docs/_memory/local-game-run.md` | pending; preserve preexisting server/session |

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
| L10 | Isolated fresh candidate profile, no personal saves | Open title → Options → choose PT → return → reopen → choose EN → New Game | Initial EN, native option visible, stored preference retained, warnings/menus/prologue localized | pending | directed-browser | RQ-001/002, native categories/persistence | First profile; returning supported PT/EN preference; keyboard and mouse across path | Same session for configuration/entry | Registry, table, CE002, Options callbacks |
| L11 | Own candidate campaign | Conversation → Options switch → return; inspect choice/picture text, variable names, reread and controls | Native refresh, readable text, no unwanted action, lost campaign decision or broken controls | pending | directed-browser + visual | RQ-002/004; redraw and event lifecycle | Both directions; dialogue, long approach, variable-to-key name, menu | L10 campaign | Events, table, providers, font/layout |
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
`spec/coreto-english-localization` and its managed worktree. Do not start the
original checkout's runtime as if it were this candidate. Runtime profiles and
saves are created for this worktree's candidate, preserving the user's originals.

Each result records candidate/source hashes, native version, real inputs,
observations, captures, reviewer and affected keys. Preserve first failures and
retest affected fixes. Reports live in the existing QA tree; raw runs remain
ignored, and selected reviewed devlog captures move to delivery material only
after acceptance. No captures or result artifacts are fabricated during planning.

Close only resources opened for testing, including independent-agent resources.
Confirm actual closure; a failed cleanup stays visible. Preserve user tabs,
servers, storage and personal saves. Gamepad/native zoom remain out of scope.

## Human acceptance

| Criterion | Owner | Decision | Evidence/date |
| --- | --- | --- | --- |
| Faithful, accessible English retaining horror and character voice | Edney | pending | pending |

## Release verdict

`NOT_READY` — product and technical design are approved (D-008, D-015).
Translation implementation, all candidate checks and Edney's editorial
acceptance are pending. This is a spec delivery, not a localized game release.

## Specification candidate audit

Keep the spec, verification, stories, interview and two ADRs: each owns a distinct
contract or user decision. Keep the four discipline contracts for affected text,
UI, configuration and image-text responsibility. Keep source-analysis as dated
repository evidence, not a second live status store. Keep the QA charter linked
from the existing creative-review journey. Keep the GDD and two memory edits
because they remove conflicting PT-BR-only authority. No runtime, engine/plugin,
test-code or task files are part of this specification delivery; the uncommitted
provider-migration edits in the worktree belong to separate work (D-014).

Authoring validation checks local links, RQ/V ownership, explicit approval states,
native-only restrictions and absence of runtime edits. Product-only Part I and
technical interfaces, data, transitions, integrations, verification and file
references are checked manually; no absent historical marker script is claimed.
Full-spec approval was granted on 2026-09-29 (D-015); implementation evidence
flags above remain false. No app, server or browser was opened during authoring.
