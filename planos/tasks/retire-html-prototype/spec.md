---
status: approved
slug: retire-html-prototype
---

# Make RPG Maker MZ the only game project

This is the approved historical baseline, completed and accepted on 2026-09-10. [verification.md](verification.md) owns the final result and later verification; the task graph and review records preserve execution history rather than instructions to restart it.

Launch update (2026-09-11): the package script now lives at the repository root. Use `npm start` there, as documented in the [current MZ README](../../../rpg-maker/README.md#jogar-localmente). The command below remains part of the accepted historical baseline.

## Objective

Remove the retired HTML game directory and every documentation reference that directs people or agents to that directory for implementation, examples, evidence, assets or tests. All ongoing game development uses `rpg-maker/The Dryland Drowned/`. The canonical GDD remains the design authority; native MZ files provide implementation evidence.

The user requested this change on 2026-09-10 because retaining two implementations misdirects model research. This is an incremental maintenance spec after the accepted `init-rpg-maker-mz` delivery, not another game migration. The user explicitly approved this complete spec set on 2026-09-10 after the review interview ("Aprovo"). Approval covers the verification and Programação contracts, historical-reference policy, untouched MZ assets and incompatible-save consequence. The original spec-authoring delivery did not include implementation or tasks. The user subsequently requested task creation; [tasks.md](tasks.md) now contains the graph explicitly approved by the user on 2026-09-10 ("Aprovo"). On 2026-09-10 the user subsequently limited execution to browser-free unit tests and static checks; Chrome, browser integration and directed playtest acceptance are excluded for this increment.

## Scope

- Delete the complete root `retired HTML artifact` directory, including its runtime, tests, assets and documentation, after resolving consumers.
- Clean project documentation, instructions, memories, plans, QA documents, examples and asset provenance, including hidden local historical spec documents.
- Remove executable dependencies on the retired directory from surviving tests and tools; preserve the useful MZ checks.
- Establish explicit game, tooling, testing and design-authority paths.
- Sanitize explanatory provenance in native data where it still names the retired directory, preserving content and obeying native-layout versioning.

## Exclusions

- New gameplay, rewritten dialogue, visual redesign, audio selection, asset replacement, changed plugin order or new dependencies.
- Executing Chrome, browser integration tests or directed playtests for this increment, by explicit user decision on 2026-09-10. Existing browser tests are not deleted merely because their execution is excluded.
- Moving the MZ game, support tools, tests, GDD, narrative documents or team planning into a single folder. Only the game implementation has one root; supporting documents remain in their existing locations.
- Changing creative approval states, save policy, launch protocol, public distribution, Trello, Git history, commits, push or PRs.
- Deleting every occurrence of the word “prototype.” `Baseline de protótipo`, `prototype_baseline`, historical increment names and JavaScript prototype APIs are not directory references.
- Rewriting raw historical captures/logs or deleting unrelated local work. Those are not current documentation or evidence of the current implementation.

## Observed baseline

Read-only inspection on 2026-09-10 found:

| Evidence | Observation |
| --- | --- |
| Root directory and Git inventory | The deletion target exists and contains 65 tracked files; refresh this count before execution. |
| `AGENTS.md`, `docs/_memory/spec-authoring-playbook.md`, `docs/_memory/standing_directives.md`, `docs/_memory/lessons/L-007-e2e-follows-runtime-contract.md` | Active guidance still includes the former direct-file runtime, old layers and old testing entry points. |
| Canonical GDD §1.1; `.compozy/tasks/init-rpg-maker-mz/adrs/adr-002.md` | Local HTTP for MZ is accepted, but retaining the former implementation as an offline reference is also explicitly stated. The new user direction supersedes that retention requirement. |
| `rpg-maker/README.md`, `docs/qa/README.md`, `pitch/README.md` | Navigation and prose still point to the retired game or its assets. |
| `rpg-maker/tests/suites/native-inventory.mjs` | IT-047 executes the retired data and narrative scripts at module load and uses them as its expected result. Deleting the directory alone breaks this suite. |
| `rpg-maker/tests/fixtures/boundary-recipes.json` | Fixture provenance names a former test file; distinguish metadata from an actual read dependency. |
| `rpg-maker/The Dryland Drowned/data/CommonEvents.json` | Native documentation/provenance strings still contain retired paths. |
| `rpg-maker/tools/native-layout.mjs` | Native JSON hashes cover entire files, so even comment-only edits can invalidate the layout manifest and previous saves. |
| `docs/design/opendesign/prototype-v2-gdd-layouts/` | CSS, JavaScript and preparation/verification scripts consume the retired asset tree; the preparation tool can recreate it. |
| `.compozy/tasks/`, `planos/`, `docs/qa/`, `rpg-maker/asset-provenance/` | Historical plans, examples, reports and provenance also need inspection. `.compozy/tasks/` is ignored by Git, so a default search misses it. |

These are source observations, not executed game or test results. No existing spec for this retirement was found in the inspected task roots. New artifacts follow the current skill convention `planos/tasks/<slug>/`; old Compozy baselines remain historical inputs.

## Behavior

### RQ-001 — One game root

After implementation, the deletion target does not exist, is not served, and is not recreated by supported workflows. There is no alias, symlink, renamed copy or fallback implementation. Starting, editing and inspecting the game uses `rpg-maker/The Dryland Drowned/`, including `game.rmmzproject`, `data/` and `js/plugins/`.

### RQ-002 — Unambiguous documentation and agent guidance

Project documentation contains no remaining directory references or instructions to open, inspect, copy from, test against or compare with the retired game. Scope includes Markdown and embedded examples, documentation HTML/CSS/JS, prompts, instruction files, memory, old spec prose, plans, QA and provenance metadata. Check slash/backslash paths, file URLs, relative/absolute paths and equivalent prose.

Update root `AGENTS.md`, its `CLAUDE.md` indirection as necessary, the canonical GDD, memory entry points, `rpg-maker/README.md` and `docs/qa/README.md` together. State positively:

> O jogo está em `rpg-maker/The Dryland Drowned/`. Use os arquivos desse projeto como evidência da implementação e o GDD canônico como autoridade de design. Ferramentas e testes de apoio ficam em `rpg-maker/tools/` e `rpg-maker/tests/`.

Replace obsolete direct-file/session-only/no-audio instructions with the already accepted MZ local-server, autosave, native presentation and audio contracts. Preserve offline local assets, no build, Chrome desktop, validated player actions and observational QA constraints. Do not generalize the MZ exceptions into authorization for remote services or arbitrary dependencies.

### RQ-003 — Historical accuracy without stale navigation

Interview decision confirmed by the user on 2026-09-10: historical mentions of the earlier HTML implementation may remain, provided they do not induce an agent to seek any reference, example, evidence or other material in the retired directory. A historical mention is not permission to recover or consult that implementation.

Do not exempt old documentation from directory-reference cleanup. Remove obsolete commands or links; summarize their historical purpose without redirecting a past observation to current MZ files. Keep original dates, outcomes, limitations, accepted decisions and creative statuses. Historical names may remain only as history, never as instructions to consult a retired implementation.

This is a narrow editorial exception to immutable-baseline guidance, authorized by the user's request to remove all such documentation references. It does not reopen completed specs or recertify historical results. Exact pre-edit artifacts remain in existing history where available. For ignored local documents, preserve original bytes outside the repository before sanitizing; do not delete ignored raw evidence or edit its results. Current guidance must not require recovering an old implementation.

The same rule applies to this spec set after execution: obsolete literal paths used here to define deletion and verification are temporary maintenance identifiers, not permitted reference sources. Sanitize those identifiers into a completed retirement record before declaring the documentation clean. Do not create a blanket scan exemption for this spec or for all historical documents.

### RQ-004 — Independent MZ verification

Supported validators and selected browser-free unit tests run with the retired directory absent. Remove the module-load dependency in IT-047 even when its browser case is not selected, because the shared test entry imports it. Preserve its useful assertions and use the existing unit/content suites to provide meaningful coverage of authored passage identity, content obligations, scene ordering, both lover orders, hero material and three approach branches against reviewed MZ/GDD contracts. Do not weaken useful assertions to counts/existence alone, import a renamed old runtime or generate expected text from the actual text during the same test. IT-047 browser execution is outside this increment; its exclusion must be reported as not executed, not as a pass. Required structural coverage belongs in the existing browser-free content/parser tests.

Use the existing canonical suite and reviewed, finite fixtures where exact wording is still an approved requirement. A fixture is a test oracle, not a second editable narrative catalog. Record why historical migration parity is being replaced by current native-content obligations, and map every retained or retired assertion. Provisional wording must remain revisable through native authorship and explicit fixture review.

### RQ-005 — Self-contained assets, examples and provenance

Explicit interview constraint confirmed on 2026-09-10: all assets already inside the RPG Maker project must remain untouched. Do not delete, move, rename, replace, regenerate, optimize or otherwise modify those files, including assets not detected by a static usage scan. Preserve their paths, filenames and bytes; this cleanup must not break the current game. Only copies inside the retired root directory are deletion targets. Documentation/provenance records may be sanitized without changing the assets they describe.

Required game assets remain inside the MZ project, unchanged in bytes and creative status. Preserve attribution, licenses, hashes, origin descriptions and existing acceptance records without requiring deleted source paths. Documentation examples either use an equivalent existing asset by verified identity or lose the obsolete example and its consumers together; never substitute unrelated art to make a link resolve.

Remove or adapt surviving generators and verification scripts that read or recreate the deleted tree. Audit local ignored migration scripts as well as tracked tools; retire one-off migration tooling that has no ongoing MZ purpose. Do not rerun migration generators against authored native content. Keep pitch and delivery materials usable with their own existing assets.

### RQ-006 — Launch, authored content and save integrity

Preserve the documented command `npm --prefix "rpg-maker/The Dryland Drowned" start`, Node 22+, Chrome, local origin `http://127.0.0.1:18726/`, no dependency installation and no build. Preserve existing port-conflict handling and same-origin/profile requirements for Continuar.

Native edits are limited to explanatory source metadata required by this cleanup. Preserve passage IDs, statuses, speakers, displayed text, scene declarations, command order and gameplay parameters. Use `rpg-maker/tools/revise-layout.mjs` with a new revision if native files change; never bypass the hash check or silently reuse a revision.

Peer-review correction F-001, approved by the user on 2026-09-10: capture the native data before implementation and compare the parsed JSON afterward. Permit only individually identified explanatory source-annotation value changes, recording each file, event/command location, field and before/after value. All other JSON values and array ordering must remain equal, including command codes, indentation, parameters, IDs, text and functional comment metadata. Do not exclude entire comments or all comment commands: scene and section declarations can be functional. Record the manifest revision change separately. A passing refreshed manifest or browser smoke does not replace this preservation comparison.

The already accepted ADR-037 applies: a previous-layout save can be refused without deleting it; Novo jogo remains available. Same-revision saves must continue normally. During the review interview on 2026-09-10, the user explicitly accepted proceeding without migrating old saves when project changes make them incompatible. This does not require rejecting compatible saves or disabling Continuar. No save migration or new compatibility policy is proposed.

## Authority Map

| Source | Owner | Status | Governs | Will change? |
| --- | --- | --- | --- | --- |
| Current user request; [ADR-001](adrs/adr-001.md) | User | Retirement direction accepted | Single implementation and reference policy | Recorded here |
| `docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md` | Design | Canonical | Gameplay, requirement states, MZ exceptions | Reference policy only |
| `AGENTS.md`, `CLAUDE.md`, `docs/_memory/` | Project guidance | Contains stale baseline instructions | Agent entry points and authorship | Yes |
| `.compozy/tasks/init-rpg-maker-mz/` | Completed increment | Human accepted 2026-09-10 | Historical MZ baseline and ADR-037 | Directory-reference sanitation only |
| `rpg-maker/The Dryland Drowned/` | Programação | Current implementation | Native content and game behavior | Source metadata only if needed |
| `rpg-maker/tests/`, `rpg-maker/tools/` | Programação | Existing supporting surfaces | Verification and launch | Dependency cleanup |
| `docs/qa/`, `rpg-maker/asset-provenance/` | Evidence custodians | Mixed historical/current | Honest evidence and attribution | Reference cleanup |
| [Programação contract](retire-html-prototype.programacao.md) | Edney / Programação | Approved | Repository and tooling changes | New |
| [Verification](verification.md) | Programação and user | Approved | Acceptance sensors and evidence | New |

## Technical Design

### Game surfaces

- Plugins: inspect `Dryland_CampaignRules.js`, `Dryland_EventBridge.js` and registered plugin configuration for dependencies; no metadata, command API or order change is expected.
- Data/events: source comments in Common Events are in scope; inspect other JSON before deciding its disposition. Do not change playable commands or editor structure.
- Saves: preserve native serialization and ADR-037. A changed native-file hash requires manifest revision and compatibility verification.
- Scenes, battles, party, switches, variables, transfers and interpreter ownership: no behavioral change. Native command ordering and identifiers remain invariant.
- Rendering, input and audio: unchanged. Required assets remain byte-identical; documentation artboards may change references only.
- Tooling/packaging: remove stale imports/read paths and recreators; use the canonical launch, content validator and Node test suite.
- Disciplines: only Programação's repository/tooling contract changes. Narrative, UI/UX and Technical Art approvals and content are preserved; no new creative contract is needed.

### Event and save lifecycle

No new state, event pages or asynchronous flows. Maintain the action → checkpoint → presentation boundaries. If source-comment cleanup changes native hashes, verify manifest consistency and envelope compatibility with static checks and existing pure unit tests. Real-browser old-save refusal and continuation are not exercised in this increment; do not claim runtime save verification. No interpreter reconstruction, offset repair or silent save removal.

### Failure and cleanup

Before deletion, refresh the consumer inventory across tracked files, hidden instructions and local ignored documentation/tools; protect unrelated changes and unique local files. Every match receives a disposition: remove, replace with a verified current source, sanitize historical prose, preserve a non-directory term, or preserve immutable raw evidence. Stop on an unresolved live dependency or missing required asset instead of creating a fallback.

Make the cleanup in one reviewable change. Record removed paths and consumer dispositions during execution, then remove obsolete navigational identifiers from the final documents. Update links when retiring whole obsolete guides or examples. Never change historical test verdicts to make the cleanup appear verified.

## Acceptance Summary

| ID | Expected observable | Verification ID |
| --- | --- | --- |
| RQ-001 | One executable game root; retired tree absent | V-001, V-004 |
| RQ-002 | Documentation and agent entry points identify MZ without stale references | V-002, V-006 |
| RQ-003 | Historical facts preserved and stale navigation removed | V-002, V-006 |
| RQ-004 | Independent native tests retain meaningful assertions | V-003 |
| RQ-005 | Assets and provenance complete; no tool recreates the retired tree | V-001, V-002, V-004 |
| RQ-006 | Launch configuration/data preserved; envelope compatibility checked without browser execution | V-004, V-005 |

## Open Decisions

The review interview confirmed historical mentions without retired-directory guidance and accepted the native-save compatibility consequence without migration. No remaining product trade-off has been identified. The user approved this complete spec, its Programação contract and verification on 2026-09-10 ("Aprovo"). No open decisions remain. At authoring time, implementation had not started and the requested task graph had been explicitly approved on 2026-09-10 in [tasks.md](tasks.md). GDD and standing-directive edits were assigned to the subsequent implementation, now completed; the accepted design is unchanged.
