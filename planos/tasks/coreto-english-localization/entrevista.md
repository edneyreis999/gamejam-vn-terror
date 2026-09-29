# Coreto English localization — design interview

Status: product and technical design approved (D-008, D-015). Translation
implementation pending on a Coreto provider baseline delivered separately (D-013, D-014).

## Request

Create an incremental specification using `rpg-maker-mz-issue-to-spec` and
`grill-me` for English localization through Coreto Message Core. Author the
specification locally; implementation and task decomposition are later phases.

## Confirmed decisions

- **D-001 — Available languages and initial default (2026-09-28):** Portuguese
  and English are both playable options. English is the initial default.
  User: “Ele vai ser uma opção. O jogo vai ter a opção de jogar português e
  inglês, e por default ele vai ser inglês.” Later decisions resolve selection,
  persistence, switching and locale.
- **D-002 — Whole-game translation (2026-09-28):** translate the entire playable
  experience, including narrative, choices, menus, instructions and any text
  embedded in images. User: “Jogo inteiro”, answering the explicit coverage
  question. Inventory must identify every player-facing text surface; this
  decision does not require translating internal code or project documentation.
- **D-003 — Native language option (2026-09-28):** use Coreto's existing language
  option as the selection mechanism. The user identified the inherited native
  feature in response to the proposed custom selector. No separate selector is
  approved or required by this interview.
- **D-004 — Preserve native switching behavior (2026-09-28):** follow the
  plugin's standard language-switching behavior, including immediate localized
  refresh and remembered preference. User explicitly confirmed native behavior
  when asked whether switching should update the current screen immediately:
  “vamos seguir o comportamento padrão”. English remains the initial default
  when no supported preference has been stored. Do not invent a custom switching
  flow; verify native integration on the affected game surfaces.
- **D-005 — Translation and editorial ownership (2026-09-28):** the agent
  produces the whole-game English translation. Edney personally owns editorial
  review. User: “Eu mesmo vou ser responsável pela revisão, e eu quero que o
  agente faça a tradução do jogo inteiro.” Producing the translation is part of
  the future implementation scope; it is not an instruction to skip spec design.
  Agent completion or technical checks do not constitute Edney's editorial
  acceptance.
- **D-006 — Translation style (2026-09-28):** use natural American English,
  adapting expressions to preserve meaning and horror. Preserve character names
  and folklore-creature names, without adding or removing information. User
  accepted this recommendation: “Sim, podemos seguir assim.”
- **D-007 — Accessible horror and independent agent evaluation (2026-09-28):**
  English must be accessible without losing the horror atmosphere. Include a
  separate agent that did not participate in development, acting as a player
  and evaluating whether the translated text is unnecessarily complex. This is
  a required future verification activity, not an evaluation performed during
  specification. Edney's editorial authority under D-005 remains unchanged.

- **D-008 — Stage 1 approved (2026-09-28):** user answered “Sim” to the
  consolidated product scope and progression to technical design/tests.
- **D-009 — Four-provider replacement and native-only constraint (2026-09-28):**
  user approved substituting Core Engine, Message, Options and Save with the
  delivered Coreto providers. Use Coreto CLI whenever an operation exists, and
  only existing plugin capabilities for localization. No new plugin, custom
  runtime code, helper code or workaround. This supersedes the draft specialist
  and custom callback proposals before implementation. Native limitations must
  be recorded, not patched. Full spec consolidation remains pending.
  The four-provider limit is superseded by D-013; the native-only constraint
  remains in force.
- **D-010 — CLI install with parameter inheritance (2026-09-28):** use the
  Coreto CLI to install the approved providers, inheriting configuration from
  their installed VisuStella counterparts. Preserve values through the CLI's
  documented materialization, not manual selector changes or fresh defaults.
- **D-011 — Test the game, not plugin internals (2026-09-28):** plugins have
  already been tested. Validate the localized game and authored integration;
  do not requalify providers, recreate plugin unit tests or exercise their generic
  internal failure matrix. CLI checks inspect changed data/configuration, while
  game journeys verify actual player outcomes.
- **D-012 — Dedicated branch and worktree (2026-09-28):** keep this spec and its
  subsequent implementation/tests in their own branch and worktree. The managed
  worktree is `coreto-english-localization`; the dedicated branch is
  `spec/coreto-english-localization`. Transfer only this increment's authored
  documents out of the original checkout, preserving any unrelated work.
- **D-013 — Full migration to Coreto providers (2026-09-29):** Edney deliberately
  replaced every previously active VisuStella plugin with its Coreto counterpart
  (Core, Message, Options, Save, ExtMessageFunc, PictureChoices, VNPictureBusts,
  ChoiceCmnEvts, AttachedPictures, EventTitleScene, MessageVisibility) and also
  activated `Coreto_2_AniMsgTextEffects`. User answered “Escolha deliberada” and
  “Sim, manter ativo”. This is a product/technical choice, not a dependency
  finding; it supersedes the four-provider limit of D-009 and ADR-002. The
  VisuStella files and configuration remain on disk, disabled.
- **D-014 — Provider baseline owned outside this spec (2026-09-29):** Edney is
  running tests and adjusting the Coreto migration in another session. User:
  “essa spec não precisa se preocupar com isso. o jogo já está funcional para
  testar a tradução.” This spec treats the active Coreto registry as a delivered
  prerequisite. It does not install, requalify or repair providers, and it does
  not touch migration-side data changes such as the CLI's `PictureIDs`
  serialization (“Não toque nisso”). Localization may still edit the Message
  Localization/LanguageImages parameters and the Options categories it needs.
- **D-015 — Technical design approved (2026-09-29):** user answered “Sim, aprovo
  os 3 pontos”: `Languages.tsv` as the single bilingual prose owner (ADR-002),
  the four discipline contracts and the verification plan.

## Inspected baseline

- The canonical [GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md),
  heading, §3.5 and §22, specified PT-BR only at intake. The confirmed bilingual
  decisions are now incorporated there and in ADR-001; implementation is pending.
- At intake, `rpg-maker/The Dryland Drowned/js/plugins.js` activated
  `VisuMZ_1_MessageCore` and no Coreto plugin. On 2026-09-29 the worktree
  registry has twelve active Coreto plugins and every VisuStella plugin
  disabled (D-013). Localization is still disabled there (`Enable=false`,
  default 28-language list, no `Languages.tsv`, no `textLocale` row).
- [Coreto authoring](../../../coreto/docs/autoria.md) and CLI discovery expose
  language table creation, conversion and validation. These operations alone
  do not establish translation coverage or runtime compatibility.
- `coreto/`, engine code and `Coreto_*.js` bundles remain read-only.
- Source inspection of `coreto/src/message-core/options.js` confirms native
  `textLocale` selection in Options, configured default and persistence through
  `ConfigManager.makeData/applyData`. A supported stored preference overrides
  the initial default. `localization.js` refreshes localized windows and picture
  text when that option changes, with locale-aware picture reloading. These are
  inspected capabilities, not executed game evidence. Integration with the
  game's actual Options provider and accessible entry points remains to inspect.

## Remaining discovery and approval

- No product or technical decision remains open.
- The full keyed source map and image-text audit belong to implementation.
- A new conflict discovered during implementation needs a recorded amendment,
  not a silent workaround or an edit to the provider baseline (D-014).

## Next phases

Decompose the approved spec into tasks, then implement the translation on top
of the delivered Coreto baseline. Apply ADR-G004–G006 and SD-015.
