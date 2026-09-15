---
id: "16"
status: blocked-verify
depends_on: ["15"]
verification_ids: [V-001, V-002, V-003, V-005, V-006, V-007, V-008, V-009, V-010, V-011, V-012, V-014, EXV-003, EXV-004, MAV-013, MAV-014]
---

# Task 16 — Execute resumable QA and verify delivery

## Outcome

**Reopened expansion scope — 2026-09-14:** implementation tasks19–29 and the new task15 planning delta precede this execution. MAV-013/014 extend the current primary criteria; prior completed/blocked lots and human decisions below remain dated history. The expanded candidate now has scoped directed results; the final closeout below owns its remaining sensor/visual/human gaps.

The implemented candidate has fresh, distinctly labeled integration, native-editor, directed gameplay, visual, audible and human evidence for every selected criterion, and verification.md records its actual delivery verdict and remaining limits.

## Authority

**Current acceptance — 2026-09-14:** the user approved the organization of the Gorvak map and shortcut removal, promoted as [ADR-G001](../../../docs/adrs/adr-g001-mapas-de-interacao-dos-herois.md) and [ADR-G002](../../../docs/adrs/adr-g002-remocao-de-atalhos-editoriais.md). Human topic1 is partially accepted for this scope; broader editor usability and the remaining framing, control, memorial and audio judgments are tracked in [verification](verification.md#architectural-adoption--2026-09-14). Historical pending statements below describe earlier execution checkpoints.

- [Spec](spec.md): RQ-001–RQ-018.
- [Verification](verification.md): this task's primary V-IDs, all scenario rows/variants and pending implementation human judgments.
- [Graph/coverage](tasks.md), [QA plan task](task-15.md), the resulting maintained QA plan, all five discipline contracts and ADR-001–003.
- Activate [rpg-maker-mz-qa-execution](../../../.agents/skills/rpg-maker-mz-qa-execution/SKILL.md), then [rpg-maker-mz-final-verify](../../../.agents/skills/rpg-maker-mz-final-verify/SKILL.md). Before browser input, read QA execution's directed-browser reference and applicable project-integration reference.
- Read [local runtime guidance](../../../docs/_memory/local-game-run.md), [QA tree](../../../docs/qa/README.md) and [team workflow](../../../docs/_memory/trello-workflow.md).

## Scope

- Implementation: execute the approved plan, repair in-scope failures through the owning implementation task and rerun affected evidence. No unapproved feature/vendor/creative redesign.
- Tests: canonical rpg-maker/tests/campaign.test.mjs and its owning suites; reuse task 14's full run if still applicable, narrowing repair runs to changed behavior before any justified final regression.
- Fixture and readiness owner: tasks 01–14 supply their assigned setup/proof. This task consolidates remaining editor/browser/visual/audio/human gaps, verifies genuine save provenance and records unavailable sensors explicitly.
- Data/assets: native game/editor copy, final pictures and audio, current provider parameters and actual checkpoint files. No campaign-state writes in directed QA.
- QA/docs: current task-15 plan, docs/qa/scenarios/, docs/qa/bugs/, dated docs/qa/reports/, this task/graph and verification.md. Raw outputs live under docs/qa/evidence/eventbridge-minimal-runtime/task-16/<run>/.
- Delete targets: none by default. The final candidate audit may propose organization of its own evidence; preserve unrelated work, user saves, source assets and useful history.

## Checklist

- [x] Confirm task 15's lots resolve all selected sensors and variants; freeze the candidate revision/dirty inventory, source/configuration/asset hashes, engine/provider versions, Chrome/Node, origin/profile and actual viewport/motion settings.
- [x] Retain applicable task 14 V-004/V-013 evidence and supporting technical outputs with dependency equivalence recorded. Reopen their owning task if changed; do not claim a second primary verification.
- [x] Execute the lots below in resumable sessions through the current plan and real player actions. Record separate native integration, directed gameplay, editor, visual and audible labels.
- [x] Produce the planned [native checkpoint bank](verification.md#reusable-native-checkpoints-for-decision-testing) while playing the required producer paths once. Confirm persisted autosave/index completion and pre-decision facts before capture. For each alternative, prepare an unchanged archive copy in a fresh context before the first page, select its actual file via Continue, play the decision and observe its consequence. Preserve the master and record parent/hash, omitted prefix, chosen branch and resulting save.
- [x] Prefer a compatible bank entry over replaying the campaign prefix for variants in lots B–H and repeated parts of A. Reunir/Destruir share a pre-final-choice parent; sacrifice alternatives share a pre-victim parent; credits use a committed terminal parent. Keep one fresh complete campaign, both route orders, distinct A/B campaigns and actual same-profile close/reopen coverage. A restored terminal save cannot certify another ending or a fresh New Game journey.
- [x] Use read-only native state/storage/network observation only; never inject seeds, dispatch actions directly, mutate campaign switches/variables or present an imported synthetic save as an earned browser checkpoint.
- [x] Run S06/S09E controlled failures and S10 exhaustive fixtures only in labeled isolated integration setups. Preserve native loading/error timing, file bytes and normal Retry where supplied.
- [ ] Inspect captured images and temporal sequences, then perform or obtain actual audible observation. Capture existence, exit 0 and buffer decoding cannot pass visual/audio/human criteria.
- [ ] Record four applicable human decisions with reviewer/date/evidence: editor usability for a non-JavaScript author; UI/reading/control feel; new memorial framing/composition; perceptible audio response. Reuse compatible explicit acceptance only within its actual scope.
- [x] For in-scope failures, preserve failing evidence, identify the cause, repair via the owning task and rerun the affected lot/adjacent dependencies. Deduplicate bugs. Keep unrelated provisional artwork/text and existing excluded defects distinctly reported.
- [x] Close owned tabs/processes/profiles and restore fault-injection setup at every interruption/end without stopping unknown servers or altering personal saves. Record a resumable checkpoint for each incomplete lot.
- [x] Run final-verify with the actual candidate inventory and its candidate-organization reference, including all new/deleted files and useful consumer/asset/doc checks. Publish no remote content and perform no automatic commit.
- [x] Update verification.md lifecycle flags and exact verdict only as supported. Complete this task only when its required evidence and applicable human judgments are satisfied; otherwise record the precise remaining gap while retaining completed lots.
- [ ] After compatible delivery acceptance, preserve selected real Gorvak-edit/memorial/credits captures in the normal docs/qa/deliveries/eventbridge-minimal-runtime/ tree, with provenance independent of ignored raw outputs. Record organization separately from game verification.

## Resumable lots

Task 15 materializes current selectors, file identities and session details from the implemented checkout. These lots carry the approved scenario expectations; they do not introduce new requirements.

| Lot | Entry and execution mode | Scenarios / primary IDs | Required variants and completion checkpoint |
| --- | --- | --- | --- |
| A — Start and author | Same-origin clean isolated player profile; disposable project for native MZ editor interaction, then directed-browser | S01/S02/S03; V-001/V-002/V-003/V-005 | First run, cancelled file selection, second campaign; eight hero entries; manual/automatic formation; available/locked/completed routes; change actual Gorvak conversation CE, public label and visual value; one runtime example from prologue/tavern/encounter/Council/ending/memorial/epilogue families. Record editor trail, old-unit nonexecution, new-unit unread status, rendered change and genuine tavern checkpoint. |
| B — Native continuity and reading | Real dialogue/checkpoints earned through play; directed-browser, with separate native integration where assigned | S04/S07; V-002/V-006/V-009 | Tavern/Council/farewell/epilogue; arbitrary authored picture ID; Options/Continue; normal/reduced motion; AUTO and FAST separately; seen→unseen/choice, partial/cancelled reading, different campaign files, held input. Record unchanged committed facts, intended pictures, provider reset and reading completion; retain save provenance. |
| C — HIDE and control | Active message/choice on supported desktop; directed-browser and human UI judgment | S08; V-005/V-010 | Mouse/keyboard; hide and restore with Tab/left-click; confirm/cancel and held/released gestures; 1280×720 and 1920×1080; default browser scale; native zoom excluded by ADR-G003; motion preference. Record focus visibility, no invisible/double choice, no walking/RPG menu/unread acceleration, and reviewer decision. |
| D — Deaths and complete outcomes | Player-earned campaign choices and compatible pre-decision archive copies; directed-browser; distinct pure-rule and labeled visual integration fixtures for exhaustive outcomes | S05/S10; V-001/V-007 | Both initial route orders; Reunir/Destruir/bad; one/several deaths; first/later return and leave during simultaneous one-second fade; normal/reduced motion; 0/1/3/8-death memorial; correct Council/epilogue eligibility and death captions. Reuse shared prefixes, retain one fresh complete campaign and record each branch parent, reached terminal/return checkpoint and actual framed-asset review. |
| E — Native loading and tavern preload | Disposable local runtime/integration profile; native editor + controlled native integration; genuine player states for presentation | S06/S06T; V-008 | Final 29-file baseline reconciliation including replacements; all heroes/routes independent of eligibility; cold/delayed cache; startup versus active-scene missing file; bust entry/graphic change/memorial; tavern entry, return, Continue, conversations/destinations/roster/map overlay. Record one file selector list, actual requests/order, visible presentation and normal Retry/error timing, without imposing a readiness barrier. |
| F — Campaign files and failures | Two play-earned files A/B on the same origin/profile; directed-browser + read-only storage; unchanged native archive copies prepared before boot; isolated controlled I/O for S09E | S09/S09E; V-011 | Occupied-file/cancel; approach/sacrifice/reward/ending; actual close/reopen; terminal Continue; failed write, unreadable save, revision-only difference, old structural payload reported separately and missing campaign; two distinct eligible choices from independent copies of the same pre-decision parent. Record file IDs/index, preserved last successful save/master/other branch, actual alternative results and no repeated decision/resave/reset. |
| G — Audio | Audible native cue; directed-browser + audio observation and human judgment; retain actual buffer integration from task 12 | S11; V-012 | BGM/BGS/ME/SE; ME active/stopped/replaced; zero mute; HIDE/Options/Continue; FAST/context transitions. Record heard volume response, retained preferences and absence of cue restart/duplication, with listener/date. |
| H — Credits | Player-earned terminal sequence and Continue; directed-browser + visual observation; isolated long-text fixture labeled separately | S12; V-014 | Natural speed-2 roll, native accelerated roll, early/late keyboard/mouse skip, long credit text and no-memorial ending. Record final-line exit, exactly one title return, no orphan event and unchanged saved ending. |

Resume a lot from its recorded earned save/profile or a byte-preserved master copy under the checkpoint protocol. When unavailable/incompatible, play only the missing path from the nearest valid earlier checkpoint; restart at New Game when none exists. Missing states are not permission to install a synthetic campaign. Load by the native UI before the decision under test, retaining autosave in the working context; never restore storage during gameplay or overwrite the archived master. Keep sufficient action transcripts and read-only observations to distinguish setup success from the criterion's expected effect. Different sensors may cite the same run only where each observable was actually inspected.

## Validation

Execution modes/references are exactly those in verification.md: directed-browser for player journeys, native-editor interaction for S03/S06T, controlled native integration for S06/S09E and clearly separated rule/native fixtures for exhaustive S10 variants.

Invalidates/reuses: source/configuration/asset/provider changes reopen only dependent evidence. Task 01 setup/configuration, tasks 02–07 native event indices/pictures, task 08 loader/list, tasks 09–10 input/history, task 11 saves, task 12 audio and task 13 credits define the principal boundaries. Historical runs provide context, not a PASS for this migration.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-001/V-002/V-003/V-005/V-006/V-007/V-008/V-009/V-010/V-011/V-012/V-014 | Lots A–H and retained canonical integration from owning tasks; actual editor/browser/visual/audio/human sensors selected above | All matching verification.md expected observables and required variants are evidenced; sensor gaps stay explicit | docs/qa/evidence/eventbridge-minimal-runtime/task-16/<run>/ plus maintained dated report and verification.md |
| Retain only: V-004/V-013 | Audit task 14 inputs/results; rerun there if stale | No stale enforcement/consumer/package result is imported | Task 14 evidence with recorded dependency equivalence |

Commands from repository root: npm start after server guidance; node --test rpg-maker/tests/*.test.mjs for a justified full canonical rerun; node --check for changed project plugins; git diff --check. Neither validate-content nor revise-layout is an authoring or release prerequisite.

Final-verify reports implemented, static_verified, runtime_verified, human_accepted and release_ready separately. Runtime verification may finish while a human-only judgment remains pending; the overall task/release cannot claim complete readiness in that case. No new broad creative approval, game-wide preload, mobile support or remote publication requirement is added.

## Execution Notes

Tasks01–15 are complete. All technical lots A–H are complete, with applicable task14 evidence retained and full-command failures distinguished from focused corrections. The 17 final directed retests passed; final native110% controls passed302 inputs/125 PNG captures; native-editor runtime04 passed109 inputs/43 PNG captures. MZ Map003 navigation, CE4/5/352 authoring, native29-file preload list, arbitrary picture92 appearance/Options/Continue and genuine save provenance are documented. Runtime/game files remain unchanged since task14. Independent reviews and final inventory are linked through verification.md.

**Blocked only on the four assigned human judgments:** non-JavaScript authoring usability, UI/reading/control feel, memorial framing/composition and perceptible audio response. Image inspection and rendered audio observations are complete; no actual human listening/acceptance is claimed. The concrete review packet is in [verification.md](verification.md#concrete-human-review-packet). `runtime_verified=true`; `human_accepted=false`; `release_ready=false`. These remaining judgments prevent task completion under its explicit checklist. No further technical replay is required unless the candidate or a relevant criterion changes.

Owned directed browsers, profiles and servers are closed; closed disposable run copies are removed, while the native-editor demonstration copy and all raw reports/immutable archives remain. No personal saves, index, commit or remote content were changed. Delivery-media selection/organization follows compatible acceptance and remains a distinct pending checklist item. Resume by recording the four reviewer/date/decision entries, addressing any rejected criterion, and then organizing the accepted evidence.

## Reading-control amendment — 2026-09-14

The user removed AUTO from the pending UI acceptance scope and retained FAST ([ADR-004](adrs/adr-004.md)). This is a design amendment, not acceptance of the UI or the other three human criteria. The delta's implementation, focused validation and historical-evidence limits are recorded in verification.md.

## Follow-up do tópico 1 — Remover atalhos de autoria nos mapas

**Superseded deferral, 2026-09-14:** the user subsequently authorized implementation of this removal and the Gorvak-map experiment on a child branch. [ADR-005](adrs/adr-005.md), [task17](task-17.md) and [task18](task-18.md) now own execution. The no-execution wording below records the earlier request, not a current block. Topic1 acceptance remains pending.


**Registrado em 2026-09-14; pendente, sem execução.** Vinculado ao primeiro tópico do [pacote de verificação humana](verification.md#concrete-human-review-packet): autoria sem JavaScript, V-003/S03. O usuário concordou em remover os eventos de mapa que apenas oferecem acesso editorial a Common Events chamados por outros caminhos e pediu armazenar a pesquisa como follow-up: **“mas não execute ainda”**. Retomar a remoção somente quando o usuário solicitar sua execução; retomar a verificação humana, por si só, não libera esse trabalho. A decisão não representa aceite do tópico 1 nem dos outros três pareceres.

### Diagnóstico e evidência disponível

A pesquisa somente leitura cobriu os 36 mapas e seus 75 eventos na revisão `de4f9768c8fda6cdd075e662fc66e02244ec3d06`. Encontrou 42 candidatos, incluindo Gorvak: 41 apontam para Common Events também alcançados pelo fluxo automático; o outro é o acesso à configuração, cujo CE004 é referenciado diretamente pelo Bridge e pelo início de campanha do CoreEngine. Não foram encontradas referências explícitas aos candidatos por despacho de eventos de mapa nos dados ou nos plugins Dryland inspecionados. Isso é rastreamento estático, não prova de remoção segura.

Somente Gorvak recebeu comprovação dirigida em execução: Novo jogo, menu por mouse, cancelamento, menu por teclado, perfil, conversa e retorno. A cadeia observada foi Map003/evento001 → CE003 → CE005 → CE082/083, com `eventId: 1`; Map003/evento003 não participou desses caminhos. Alterar apenas o seletor desse evento de mapa não redireciona a chamada independente feita por CE003. Editar o conteúdo compartilhado de CE005 afeta o caminho jogável. [Diagnóstico local](../../../docs/qa/evidence/gorvak-event-routing/2026-09-14/diagnostico.md), [execução e observações](../../../docs/qa/evidence/gorvak-event-routing/2026-09-14/run-01/report.json) e [chamadores/proveniência](../../../docs/qa/evidence/gorvak-event-routing/2026-09-14/static-and-provenance.json) preservam a evidência; são arquivos locais ignorados, e o inventário abaixo mantém o escopo durável na task.

### Inventário para retomada

Os caminhos abaixo são relativos a `rpg-maker/The Dryland Drowned/data/`. Intervalos de mapas/eventos correspondem às identidades na ordem indicada; não renumerar IDs como efeito incidental da futura remoção.

| Arquivo(s) / mapa(s) | Evento(s) de mapa candidato(s) | Common Event de destino | Quantidade |
| --- | --- | --- | --- |
| Map003.json — Taverna | 003–010: Gorvak, Elowen, Griznik, Seraphina, Bimbren, Liora, Vaelith, Draska | CE005–012, respectivamente | 8 |
| Map003.json — Taverna | 011 — Interface da taverna | CE038 | 1 |
| Map003.json — Taverna | 012 — Destinos | CE039 | 1 |
| Map003.json — Taverna | 013 — Elenco | CE117 | 1 |
| Map003.json — Taverna | 014 — Taverna — Carregar imagens | CE351 | 1 |
| Map007.json–Map014.json — A1–A8 | 002 — Descrição, abordagens e resultados, em cada mapa | CE013–020, respectivamente | 8 |
| Map015.json–Map022.json — B1–B8 | 002 — Descrição, abordagens e resultados, em cada mapa | CE021–028, respectivamente | 8 |
| Map023.json — Conselho | 002 — Conselho | CE335 | 1 |
| Map023.json — Conselho | 003 — Escolha do medalhão | CE053 | 1 |
| Map025.json–Map027.json — Reunir, Destruir, Perda total | 002 — respectivo desfecho | CE055–057, respectivamente | 3 |
| Map029.json–Map036.json — epílogos H1–H8 | 002 — respectivo epílogo | CE306, 308, 310, 312, 314, 316, 318, 320 | 8 |
| Map003.json — Taverna | 002 — Configuração do jogo | CE004; acesso editorial, com consumidores próprios nos plugins | 1 |

Total: **42 eventos de mapa candidatos**, em 29 arquivos de mapa. Todos têm gatilho de ação, nenhuma imagem e nenhuma condição de página. Esses atributos ajudam a identificá-los, mas não são motivo suficiente para excluir qualquer outro evento.

Caminhos alternativos identificados: taverna por evento001 → CE003 → interações/painéis, com preload CE351 também chamado pelo evento001; encontros por evento001 → CE040 → CE262 → CE013–028; Conselho por CE040 → CE335/053; finais por CE040 → CE336 → CE055–057; epílogos por CE040 → CE041 → unidade correspondente. CE004 é selecionado em `Dryland_EventBridge.ConfigurationCommonEvent` e `VisuMZ_0_CoreEngine.QoL:struct.NewGameCommonEventAll:num`.

### Escopo e condição de retomada

- [ ] Aguardar solicitação explícita de execução deste follow-up; nenhum evento deve ser removido nesta etapa de registro.
- [ ] Na retomada, reconciliar o inventário com a revisão corrente e confirmar referências, caminhos de entrada e efeitos sobre saves/Continue antes de definir o conjunto final de remoção. A evidência de Gorvak não certifica os outros 41 candidatos.
- [ ] Registrar o ajuste incremental dos contratos de autoria afetados por esse follow-up, especialmente os acessos pelo mapa descritos em RQ-002/003/006/009, ADR-002/003 e V-003/S03. Não reescrever evidência histórica como se os atalhos já tivessem sido removidos.
- [ ] Remover somente os eventos de mapa confirmados como atalhos; preservar Common Events de destino, eventos automáticos, configuração CE004, preload CE351, conteúdo, regras e execução das interações. Mover conteúdo para eventos de mapa ou redesenhar o encaminhamento não faz parte deste follow-up.
- [ ] Atualizar as instruções de autoria para apontar ao conteúdo e aos seletores efetivamente usados pelo jogo; validar somente os fluxos, referências e sensores afetados, incluindo a navegação de autoria do tópico 1 e a continuidade pertinente.

Não houve remoção, renomeação, comentário em evento, mudança de plugin ou aceite humano neste registro. O inventário é um follow-up pendente da task16; não constitui uma nova execução da task nem uma ordem automática de implementação.

## Experimental branch QA — ADR-005

EXV-003/004 extend this task after tasks17/18 and the task15 planning delta. Exercise new H1 routing, native map-authored reading, menu selection/return, visual cleanup, HIDE/Options/FAST, full/automatic/dead guards and earned-checkpoint Continue. The prior completed technical lots do not certify the new branch. Keep human topic1 and the three other pending human judgments explicit.

Technical directed execution: `surfaces-normal-04` (1280×720, 532 public inputs, 182 PNG) and `surfaces-reduced-01` (1920×1080, 320 inputs, 129 PNG) finished without errors. The normal run includes selection/removal, H1 full-party rejection, departure and earned A/B Continue; both exercise the eight heroes, HIDE/Options and unread/reread FAST. The agent inspected the relevant native captures recorded in `visual-review.json`. Reports keep their raw awaiting-review status; human authorship/navigation/framing remains pending.

Native MZ authorship was executed through CUA on a disposable copy: Taverna → Conversa — Gorvak → event001, edit first native text, save. `editor-runtime-01` played the changed line from that map through the actual portrait entry (35 inputs, 17 PNG, no errors), completed reading IDs82/83 and returned without changing campaign facts. `editor-before.json`/`editor-after.json` retain original and edited hashes and UI method. Only a text line and editor metadata changed semantically. The principal project was reopened at Map037; demonstration text was never copied back.

The existing [QA report](../../../docs/qa/reports/2026-09-12-eventbridge-minimal-runtime.md) preserves the entry-focus correction, directed-driver failures, scoped equivalence and replay results. Raw reports, PNG and saves remain local ignored evidence. Canonical corrections and the final technical verdict follow below; no prior baseline hash is presented as this branch's fresh result.

Experimental technical closeout: EXV-003 PASS; EXV-004 PENDING. All 22 affected canonical IDs have passing final or explicitly retained evidence, including the preload retest, native transfer guard/ambience and encounter-helper correction. The final results, candidate dispositions and input equivalence are recorded in [verification.md](verification.md#experimental-technical-verdict-and-candidate-audit). Tasks17/18 and task15 are complete. This task remains blocked only on the assigned human judgments and later accepted-delivery media organization; no extra campaign replay is required unless relevant inputs or findings change.


## Map-authorship expansion execution delta — in progress

Execute only after the task29 technical join and task15's new plan. Apply the existing QA-execution and final-verification skills; follow the [expansion contract](verification.md#map-authorship-expansion--2026-09-14), MAS-01–07 and the updated maintained guide. This remains the only QA execution task; no extra QA pair is created.

- [x] Check the current candidate/fixture/archive fingerprints and implementation retirement ledger. Prior V/EXV passes are reusable only within equivalent inputs; do not silently certify new map paths with old Common Event evidence.
- [x] Execute the guide's all-eight hero, prologue/files, campaign outcome, encounter and boundary-control lots with real player input. Include one fresh complete campaign, both initial route orders and all three outcomes across compatible genuine branches.
- [ ] Capture actual root map/interpreter, played units, native file/checkpoint state and normal/reduced presentation. Observe per-hero framing, source cleanup, HIDE/Options/FAST and absence/cue continuity. Native fixtures do not become directed campaign evidence.
- [x] Perform the short disposable-editor edit demonstration and play its changed lines through actual map entries. Keep the main game free of demonstration changes and preserve copy provenance.
- [ ] For MAV-013, report actual directed/visual/audio technical results and limits; for MAV-014, record reviewer/date and explicit authoring, framing/navigation/control and applicable audible judgments. The earlier Gorvak approval does not approve all new surfaces.
- [ ] Repair in-scope defects through their owning task, rerun the affected sensors and preserve failed runs. Validate surviving shared configuration/preload/HIDE/parallel/memorial behavior after CE retirement.
- [ ] Apply final candidate review, reconcile all32 verification IDs, update aggregate readiness only on actual evidence and organize accepted delivery media under the normal QA delivery tree. Close only owned resources. No automatic staging, commit or publication.

Expansion evidence output: `docs/qa/evidence/eventbridge-minimal-runtime/map-authorship-expansion/<run>/`. The final execution closeout below supersedes this initial pending state; historical technical evidence remains dated.


### Expansion execution progress — 2026-09-14

MA-A normal1280×720 with filesA/B and MA-B1920×1080/reduced completed directed collection without browser errors; visual review remains separate. MA-I edits were performed in the native MZ UI on `/var/folders/8h/tbsxqpcx57q288z_4pnryqdm0000gn/T/dryland-directed-IMzMb2/game`. Only two code401 texts changed in the map lists; MZ also updated System.editMapId/versionId and serialization. The same copy passed directed play and inspected PNGs show both exact accented strings, Elowen and clean tavern return. No demonstration text was written to the main project. This proves technical native editability, not human author usability.

The first native110% run could not reach the owned Chrome instance through CUA: bundle selection and its Window menu resolved the user's separate profile, which was not zoomed or changed. Preflight timed out; the failure/cleanup remain in `surfaces-zoom-01`. This was a UI sensor limitation at that checkpoint. ADR-G003 subsequently excluded this sensor; it is no longer a blocker and is not a game or visual PASS.

A fresh physical-first/Reunir campaign with genuine retreat and natural credits completed, but image review confirmed offscreen epilogue portraits. The existing BUG-20260911-tavern-portraits-offscreen now records this same root cause in Maps029–036. `fix-epilogue-framing.mjs` changes two native picture commands per map to the corresponding verified solo framing. No content or game facts changed. The eight epilogues have current focused runtime/visual retests in progress; parents from before this correction cannot seed current runs. Normal/reduced tavern and native-editor evidence retain equivalent affected dependencies because these routes never visit Maps029–036.


### Final expansion handoff — 2026-09-14

**blocked-verify**, after all available directed lots and focused corrections. See the [current report](../../../docs/qa/reports/2026-09-12-eventbridge-minimal-runtime.md#fechamento-da-execução-da-expansão--2026-09-14) and [final verification](verification.md#final-expansion-audit--2026-09-14) for exact runs and verdicts. The three fresh campaigns, ten choice/return branches, three continuity contexts, four audio channels, credits variants and native editor demonstration are recorded. Epilogue retests IT047/062/073 pass; the failed initial captures remain preserved. The current134-case result is composite, not a fresh full PASS command.

Remaining work is bounded: resolve the Council/shared portrait framing scope under the technical-art contract; obtain the four assigned human judgments. The user was asked about expanding Council scope, without assuming assent. Do not repeat unaffected campaigns or tests merely because the task is resumed. Keep the original failure evidence and generate a new run only for a changed/absent sensor or affected runtime slice. All owned directed resources are closed; the main editor project is restored, with no demo changes or automatic Git actions.

Final image inspection also confirms cropped farewell H4 in the retained shared presentation (`continuity-farewell-01/bust-1-farewell-H4.png`). Include farewell calibration in the existing portrait follow-up alongside Council; functional continuity PASS does not imply a framing PASS.


### Exclusão de zoom nativo — ADR-G003

[ADR-G003](../../../docs/adrs/adr-g003-excluir-testes-de-zoom-nativo.md) aceita a retirada desse teste como esforço excessivo de QA. Não retomar `surfaces-zoom-01` nem preparar novas variantes de zoom. A falha anterior permanece histórica; resoluções desktop e modos de movimento continuam no plano. Antes de uma futura execução da matriz canônica que ainda contenha variantes de zoom (IT078), retirar somente essas variantes do código legado, preservando os demais sensores; esta atualização é documental e não executou essa limpeza.

Pendências atuais: enquadramento do Conselho/despedidas e os quatro pareceres da tabela Human Acceptance, com aceite parcial já registrado para autoria/organização de Gorvak. Nenhuma nova execução foi realizada para esta ADR.


### Apoio ao parecer de autoria — comentários dos plugins Dryland

Por solicitação do usuário, foram adicionados comentários nativos MZ imediatamente antes de todas as1.866 chamadas code357 a `Dryland_EventBridge` e `Dryland_Presentation`, em38 arquivos (37 mapas e CommonEvents). Cada descrição explica o efeito do comando e considera seus argumentos: dado consultado/destino, ação solicitada, identidade de leitura, permissão de FAST, foco, efeitos de sessão, HIDE ou ponto de salvamento. Comentários anteriores e anotações657 foram preservados.

A transformação está em [annotate-dryland-plugin-calls.mjs](annotate-dryland-plugin-calls.mjs); `--check` verifica cobertura sem escrever. A segunda execução verificou1.866 chamadas e nenhuma inserção pendente. Comparação independente com a cópia anterior comprovou que os4.517 registros adicionados são exclusivamente108/408 e que todos os registros originais e demais dados foram preservados. Não houve mudança em plugins, engine, assets ou saves.

Essa melhoria ajuda o autor a entender o que ocorre por trás das chamadas; não registra aprovação humana do item1. Os índices numéricos das listas mudam com as inserções; evidências anteriores que citam posições fixas continuam históricas. Não foi executada nova campanha nem teste de zoom para esta edição de comentários.
