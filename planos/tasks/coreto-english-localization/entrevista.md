# Coreto English localization — design interview

Status: product and technical design approved (D-008, D-015), amended by the
peer-review decisions D-017–D-021. Translation implementation is pending on a
Coreto provider baseline delivered separately (D-013, D-014) and frozen by D-020.

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
- **D-016 — Chained CLI calls with a pilot first (2026-09-29):** running Coreto
  CLI calls in sequence from the terminal, with no script file saved in the
  repository, is within D-009. User: “Sim, pode encadear. mas faça de forma
  inteligente. Faça uma pequena parte primeiro [...] teste e garanta que
  funcionou. depois faça o resto.” Task graph approved (“Aprovado”).

Decisions D-017–D-021 come from the peer-review interview on the
[review round 01](review-01.md) findings (2026-09-29).

- **D-017 — Coreto parameters, tags and callbacks are open; native first
  (2026-09-29):** as long as no new plugin is created, changing any parameter of
  the active Coreto plugins and using their tags is fully allowed. This includes
  callback parameters (`:func`/`:eval`). User: “está completamente liberado
  alterar parametros e usar as tags dos plugins da Coreto [...] PRIORIZAR alterar
  parametros e usar tags dos plugins Coreto antes de tentar fazer qlqr gambiarra
  em javascript”, and “Liberados como qualquer parâmetro” for callbacks. Any
  native presentation feature of the plugins may be used at the implementer's
  judgment (“Você está liberado para usar qualquer recurso que julgar cabível,
  desde que ele seja nativo dos plugins”). This supersedes D-014's
  three-parameter limit and D-009's callback restriction. D-009 still forbids new
  plugins, helper scripts, generators, runners and adapters, and any edit to
  Coreto sources or bundles. Each parameter change is recorded for review.
- **D-018 — Key and markup model (2026-09-29):** (a) native control tags
  (`<Bind Picture>`, `<Hide Choice Window>`, `<Show Switch>` and similar) stay
  in the event payload around the key, because `<Hide Choice Window>` is read
  from the raw choice text. (b) Every multi-line picture text uses
  `<WordWrap>` in the event wrapper, outside the key, following the existing
  CE059 memorial. Approach labels share the choice key as
  `\FS[22]<WordWrap>$[key]`; if the A1 pilot shows this does not fit, stop and
  return the decision to Edney (no fallback). (c) Use one key per Show Text
  block. The PT cell joins 401 lines with a space and keeps explicit `<br>`; EN
  uses `<br>` only for intentional breaks. Block-level wrappers stay in the
  event; `\V[n]` and inline emphasis stay in the cell.
- **D-019 — Static English browser title (2026-09-29):** `System.gameTitle` and
  the `index.html` `<title>` become “The Dryland Drowned”. `gameTitle` is never
  keyed, because it feeds `document.title` and savefile info outside the
  localization hooks. In-game copy keeps the approved title pair. D-022 extends
  this to the `package.json` window title.
- **D-020 — Frozen baseline and isolated runtime (2026-09-29):** the migration
  session commits its changes on this branch before task-01. That hash is
  recorded in `tasks.md` as the localization baseline, and all diffs, V-006 and
  the existing-test classification measure against it. A later migration commit
  reopens V-006 and repeats the A1 pilot. Every candidate smoke and QA run uses
  `npm start -- --port 18737` from the worktree (port amended by D-022), and the
  user's 18726 origin is never used.
- **D-021 — Native text treatment (2026-09-29):** the table forbids straight
  double quotes and tabs in cells. Quoted voices, inscriptions and remembered
  speech use `<I>…</I>` in both columns; typographic quotes “ ” are used only
  where the prose needs them. Native presentation features are used under
  D-017 with restraint: AutoColor for glossary folklore names (removed by
  D-022), sparse
  `\EFFECT<…>` on Show Text supernatural beats, and the native Text Effects
  Options row so players can switch animation off. Each use is listed for
  Edney's editorial review (V-005). Text macros are not used inside cells.
- **D-022 — Peer review round 02 decisions (2026-09-29):** decisions on the
  [round 02](review-02.md) findings.
  - (a) Text Effects starts on, which is the native behavior (AniMsg forces it
    on when no preference is stored), and players switch it off in the Options
    row. There is no reduced-motion default.
  - (b) AutoColor is removed. Its whole-word rule uses ASCII-only `\b`, so names
    such as Ivaí, Andirá, Floraí and Boitatá never match. The bug is recorded as
    a Coreto follow-up. If a fixed Message Core arrives before task-03, the
    decision reopens.
  - (c) Structural breaks inside `<WordWrap>` picture wrappers become `<br>`, as
    in CE059.
  - (d) The `package.json` `window.title` also becomes “The Dryland Drowned”.
  - (e) Scrolling credits are keyed per line, and only on translatable lines
    (title and plugin line), with wrappers kept in the event.
  - (f) The credits plugin line stays “Plugins: VisuStella”; it is translated
    faithfully and its content is not changed.
  - (g) The candidate uses the exclusive port 18737. Before clearing its origin,
    confirm with `lsof` that it belongs to the executor.

  User chose each recommended option, except (f), where the user answered
  “Manter Plugins: VisuStella”.

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

- No product or technical decision remains open. The only conditional is the
  D-018 A1 pilot: if the wrapped approach label does not fit, the decision
  returns to Edney.
- The full keyed source map and image-text audit belong to implementation.
- A new conflict discovered during implementation needs a recorded amendment.
  Prefer a Coreto parameter or tag (D-017); never edit Coreto sources, bundles or
  the migration's own changes (D-014).

## Next phases

Record the migration baseline commit (D-020), then execute the amended task
graph from task-01 on top of it. Apply ADR-G004–G006 and SD-015.
