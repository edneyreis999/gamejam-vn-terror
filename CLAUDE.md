@AGENTS.md

<!-- BEGIN CORETO -->
O jogo está em <code>rpg-maker/The Dryland Drowned</code>, relativo à raiz deste projeto.
Trate `coreto/` e `<jogo>/js/plugins/Coreto_*.js` como somente leitura: nunca edite, regenere ou recompile esses arquivos.
Implemente extensões em `<NomeDoJogo>_<tier+1>_<Recurso>.js`, um tier acima do plugin Coreto estendido, e carregue-as depois dele e de suas dependências em `js/plugins.js`; consulte [extensões](coreto/docs/extensoes.md).
Para descobrir e operar recursos, leia [Coreto](coreto/README.md) e use a ajuda, os catálogos da CLI e `skills list`/`skills describe <nome>` antes de criar código próprio. Parâmetros, ativação, eventos e assets do jogo são editáveis; o código da engine permanece congelado.
Crie planos, testes, casos e evidências do jogo fora de `coreto/`. Ao testar, use o [guia de QA](coreto/docs/qa.md).
<!-- END CORETO -->


<!-- loki:instructions:start -->
# Loki Instructions

## Project setup and maturity

Loki supports new and existing game projects. Use `setup-loki-framework` when the user requests initial configuration or an update to the project's maturity and working policies. Setup configures an already installed harness; it does not install skills, reorganize the game, or authorize implementation work.

Preserve existing conventions and commitments. The project profile describes its stage, audience, risks, preservation needs, and agreed working policies. It guides open decisions; it does not automatically waive requirements in skills, approved tasks, or specifications. Surface material conflicts for a user decision. Prototype status or sole-author use does not imply permission to lose data, break compatibility, or rewrite code outside an authorized task.

Keep the setup-owned instruction and profile blocks synchronized in root `AGENTS.md` and `CLAUDE.md`, preserving instructions outside those blocks. Ordinary files are supported on every target OS; no symbolic link is required. On requested updates, reuse settled answers and resolve changed decisions without repeating the full interview. Do not infer a policy change merely because the project appears more mature.

## Companion mode

Use `loki-companion-mode` when the user asks for an opinion, is unsure, wants context gathered for an analysis, or is preparing to execute a plan. The mode is read-only and skeptical, and it advances only by consensus. It ends when the user asks to leave it, explicitly requests a state-changing action, or consensus is reached. During an authorized execution, answer a passing question without pausing that execution.

## Optional execution metrics

At authorized spec execution entry, check for `_execution-metrics.md` before preparation and baseline. When present, use `spec-execution-metrics`; nested procedures share the execution identity. Without the companion, retain the existing workflow. Its presence does not authorize execution.

Keep portable observations beside the spec and progress in the existing task records. Collection failure leaves an explicit gap while authorized delivery continues. Metrics do not select checks, change acceptance, or invoke QA, review or Git operations. Technical closure, collection closure, human playtest and user acceptance remain distinct.

## Test infrastructure ownership

Use `game-test-infrastructure` when an authorized task, verification, or direct request needs test infrastructure created, extended, or repaired. The implementation belongs to the consuming project and grows with its checks. Routine runs use the maintained project command. Planning and review-only requests do not authorize implementation.

The infrastructure skill owns the general creation and repair procedure; the discovered technology guidance owns engine-specific preparation. Tasks and verification retain ownership of their checks, coverage, journeys, and verdicts. The maintained runner handles each run's preparation and cleanup.

## QA planning ownership

Use `game-plan-qa` when performing a QA-plan task or a direct planning request. It owns persona missions, affected technical-check selection, preparation requirements, and the handoff in the existing task or verification record. Without an associated record, return the plan in the conversation; create a separate file only when requested. It does not maintain a cross-spec QA catalogue.

Planning alone does not authorize runtime execution or infrastructure implementation. An authorized QA-plan task also prepares its contracted starting states and human playtest handoff. Graph construction remains with `game-create-playtest-tasks`; technical execution and task status remain with the task executor. The session contract stays with `game-execute-qa`, which can prepare its own mission for standalone dogfooding without a separate planning invocation.

## Persona QA ownership and records

Use `game-execute-qa` for requested dogfooding of the game or its authoring tools, including a task's persona sessions. The QA plan supplies complete missions; a standalone request lets the skill prepare its own. `game-execute-task` retains technical checks and task completion, `game-test-infrastructure` owns missing execution capabilities, and discovered technology guidance owns engine details. A scripted test run does not establish a persona session or human acceptance.

Keep planned sessions, incremental outcomes, debriefs, and retests in the existing task or verification record. Standalone QA returns these results in the conversation with evidence paths. Do not create a session report, QA tree, or bug registry automatically; a separate report requires a request. Reproduced defects stay with their evidence or an existing defect record, not the known-issue deferral collection. Persona sessions do not record human playtest results or trigger final verification.

## Slow-test execution configuration

`loki.config.json` at the project root owns persistent slow-test defaults. Resolve each field independently: an explicit value in the user's current request, then the file, then `10`. The supported fields are `slowTests.maxWorkers` and `slowTests.maxBrowsers`; each must be a positive safe integer. Missing file, section or field uses its default. Reject malformed JSON, a non-object root/section or an invalid configured limit before launching jobs, even when the request overrides it. Preserve unrelated configuration fields when creating or updating the file. A one-run override does not rewrite project defaults.

`maxWorkers` bounds active jobs, including nested runner concurrency. `maxBrowsers` separately bounds live browser instances across those jobs, not tabs, contexts or browser helper processes. Both are ceilings for one executor invocation, not targets or a machine-wide quota. Use fewer jobs when dependencies, exclusive resources or demonstrated contention require it, and record why. Separate invocations need separate writable resources and an explicitly coordinated capacity budget if run together.

Keep one reusable test execution command in the project, outside spec directories. Its first consumer establishes independently selectable checks and resource ownership; later specs add cases and reuse it. Prefer native scheduling when adequate. Persistent test runners and disposable fixture builders are maintained test infrastructure; the single-use rule for scripts editing authored game data does not require deleting them. Disposable fixtures must never overwrite the authored game.

Record effective limits and their sources, actual concurrency, selected coverage and cleanup outcomes. Defaults do not authorize dropping tests, changing their assertions/timeouts or treating an incomplete run as passed. The relevant technology skill supplies runtime-specific preparation; the verification procedure owns the claim. Elapsed-time targets, when requested, are separate from concurrency limits.

## Decision Record Taxonomy: GDDR vs ADR

Loki maintains two separate decision-record types, each owned by its own skill:

- **GDDR** — Game Design Decision Records, owned by `game-create-gddr`.
- **ADR** — Architecture Decision Records, owned by `game-create-adr`.

They are complementary, not redundant. Use this boundary to decide which record a given decision belongs in. This taxonomy only **classifies** a supplied decision; it does not decide **whether, when, or why** to create a record — that remains out of scope for both skills.

### Primary criterion — the subject of the decision

- **GDDR** captures decisions about the **game as a playable experience**: game systems, mechanics, progression, economy and balance, narrative, content, modes, and player experience.
- **ADR** captures **technical, architectural, and operational** decisions: plugin architecture, organization of native data and assets, tooling and CLI, build and distribution, testing strategy, and project or harness process.

### Tie-breaker

- If the decision changes **how the game plays or feels to the player**, it is a **GDDR**.
- If the decision changes **how the project, code, or assets are built, structured, tooled, tested, or distributed** without itself changing play, it is an **ADR**.
- **ADR is the default record for any decision that is not game design.** GDDR is the specific carve-out for design.

### Hybrid decisions

When a decision has both a design facet and a technical facet, **split it**: the design intent goes in a GDDR, the implementation means goes in an ADR, and the two records **cross-link** each other. Never duplicate the same decision across both — each record owns its own facet.

Example: *turn-based combat* (the what and why of play) is a GDDR; *the architecture of the plugin that implements turn-based combat* is an ADR that links back to the GDDR.
<!-- loki:instructions:end -->

<!-- loki:project-profile:start -->
## Project context and authority

This existing RPG Maker MZ game is Afogados em Terra Seca / The Dryland Drowned. Its playable project is `rpg-maker/The Dryland Drowned/`. The canonical design authority is `docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md`; preserve its confirmed, prototype-baseline, pending, and out-of-scope distinctions. This setup does not establish a new maturity stage, audience, deadline, or gameplay objective.

Preserve the project instructions outside the Loki blocks and the applicable accepted ADRs and standing directives. Keep native event structure, player text in PT/EN in `Languages.tsv`, domain plugin rules, authored assets, and existing saves. Preserve documented save-compatibility limits; installing Loki authorizes no content migration. Coreto sources and bundles, engine files, and third-party plugins remain read-only under the existing project contracts.

## Execution and verification policies

Use the current Loki procedures for new work. Completed specs and QA records remain historical baselines; preserve existing delivery contracts, evidence, and human-acceptance status. Before authoring new specs, also read `docs/_memory/spec-authoring-playbook.md`, `docs/_memory/standing_directives.md`, and `docs/_memory/glossary.md`. Retired skill names in historical records do not reactivate the old harness. For current tasks, use the installed procedure matching the requested outcome without dropping existing obligations.

Apply ADR-G004 for autonomous reorganization within authorized delivery, ADR-G005 for the exclusion of gamepad tests, ADR-G003 for native-zoom tests, and ADR-G006 for risk-based heavy-test selection and cleanup; see `docs/adrs/README.md`. Preserve the project's test-value rules and human judgments. QA observation remains read-only; campaign mutations go through validated player actions. Existing accepted fixture and save-preparation contracts remain scoped to their owning tasks.

**Local runtime exception, confirmed 2026-10-26:** ADR-G006 governs runtime coverage. Installing Loki does not make NW.js execution mandatory for custom-code changes in deliveries that exclude it. This overrides the general technology guidance's unconditional NW.js boot requirement for this project; JavaScript/runtime compatibility constraints still apply. Chrome evidence does not qualify NW.js, and no excluded runtime may be reported as verified.

The maintained game suite is `node --test rpg-maker/tests/*.test.mjs`. Follow the existing project policy to select source or published-build verification; `npm run verify-build` verifies the pruned distribution. Use `npm start` for local play only after reading `docs/_memory/local-game-run.md`. Preserve the runner's exclusive-resource constraints: the configured limits of 10 workers and 10 browsers are ceilings, not authorization to parallelize jobs sharing a port, profile, or writable state.

Use existing task/verification records for new Loki QA work, preserving the historical `docs/qa/` tree and existing delivery obligations. Follow `docs/_memory/trello-workflow.md` when relevant; setup does not authorize external updates, publishing, or messages.

## Documentation review

Public authoring interfaces include the installed Coreto CLI (`node coreto/tools/coreto/cli.mjs`) and the project's game plugins and commands. Consult `coreto/README.md` and its relevant authoring/extension guides. For an authorized change to public CLI help or descriptors, apply the discovered technology documentation-review procedure and the project's preservation rules. No maintained project command integrating the Loki CLI documentation-review verifier was found during setup. The first future task changing those descriptions owns that integration outside frozen `coreto/`; setup does not create it or authorize editing frozen interfaces. Existing game-test and localization commands are not substitutes for that documentation check.
<!-- loki:project-profile:end -->
