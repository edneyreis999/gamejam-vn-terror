---
id: "10"
status: completed
depends_on: ["09"]
verification_ids: ["V-004", "V-005", "V-006", "V-007"]
---

# Task 10 — Execute QA and verify the delivery

## Outcome

The actual combined game is walked, viewed and heard against the approved verification contract. In-scope failures are repaired and affected evidence rerun; final delivery flags reflect observed results and explicit remaining gaps.

## Authority

- Activate `rpg-maker-mz-qa-execution`, then `rpg-maker-mz-final-verify`; use `rpg-maker-mz-visual-evidence` for assigned visual claims and the executed plan from [09](task-09.md).
- [spec.md](spec.md), [verification.md](verification.md), all five discipline contracts and the [shared execution contract](tasks.md#shared-execution-contract).
- Existing `docs/qa/` journeys/scenarios/bugs, canonical GDD, native startup instructions and ADR-G003's no-zoom boundary.

## Scope

- Primary criteria: V-004 rendered inspection, V-005 native/directed controls, V-006 buffers plus actual listening, V-007 native saves plus directed Continue. Consume V-001/002/003/008 from 08; revalidate affected technical evidence after fixes.
- Implementation: no feature expansion. Reproduce and route in-scope defects to their owning scene/boundary task, repair at that owner, and rerun affected cases/lots. Do not mute a failing assertion, synthesize directed success or compensate with unapproved artwork.
- Tests/fixtures: reuse 01–08's canonical fixtures and source oracles. Additional technical fixes/tests stay in their existing suites. Synthetic setup never mutates a directed campaign.
- Data/assets: actual integrated game and approved local audio/art. Inspect source files as visual oracles and candidate renders; no new source production.
- QA/docs: current scenario verdicts; a dated `docs/qa/reports/<execution-date>-approved-narrative-dialogue-staging.md`; task/verification result summaries; deduplicated bugs. After applicable acceptance, selected genuine captures and provenance may go in `docs/qa/deliveries/approved-narrative-dialogue-staging/`.
- Delete targets: none preapproved. Preserve personal saves, source history, unrelated work and evidence. Organization/archive decisions require the final-verify candidate audit.

## Entry and commands

Require 09's guide/readiness and the candidate hashes/results from 08. Read `docs/_memory/local-game-run.md`; launch with `npm start` at the repository root using Node 22+ and desktop Chrome. Identify port 18726's process/content before reuse. Keep one active game tab, a dedicated profile and the same origin for Continue; use empty QA files, never overwrite a personal campaign.

Pure/native fixture runs use the canonical focused Node command with actual registered case IDs. Reuse 08's aggregate PASS if its inputs remain equivalent; rerun `node --test rpg-maker/tests/*.test.mjs` only when repairs or stale dependencies justify it.

## Resumable lots

Each lot records candidate/source hashes, entry/checkpoint provenance, viewport and MZ logical area, motion/input path, actual transcript, captures and any defect. A lot is complete only when every required variant has an observed result or an explicit unresolved gap. Continue independent lots when one sensor is unavailable.

| Lot | Entry and scenarios | Required variants and observations | Retained evidence / completion checkpoint |
| --- | --- | --- | --- |
| A — opening and visits | Fresh New Game in an empty QA file; S-01/S-02 | Six units; old/young composition and temporal sound; 1280×720 normal + 1920×1080 reduced; mouse/keyboard across runs; muted opening; all eight hero main/select/full-party/cancel branches, living unselected and dead handling where reachable | Opening transcript/transition/audio and hero branch ledger; real formation checkpoint if one exists, otherwise record that a hero visit creates none |
| B — expeditions and both closures | Continue A's fresh campaign and a separate legal opposite-order run; S-04/S-05 | Church→Park and Park→Church; both families, success plus failure/sacrifice, long result controls, normal/reduced; lover/piece then correct closure/Irati/map; actual prison/threshold/farewell composition | Confirmed reward/reveal checkpoint payload/index hashes, route transcript and cut recordings; one connected campaign continues toward Council |
| C — Council and endings | Earned Council checkpoint from the connected campaign; immutable final-choice parent copies for children; S-07/S-08 | Group Council in both motion profiles; exact sequence and actual cast/reflection; separate reunite/destroy children; no/mixed deaths as selected plan requires; natural credits and skip on separate valid runs | Ordered transcript/cast traces, outcome/audio stills/recordings and child-parent hashes; one complete fresh opening-to-credits chain |
| D — loss and exhaustive native variants | Independent legal total-loss trajectory; reviewed native fixture outputs; S-03/S-06/S-09 plus S-08 loss | Directed total loss; all 30 native successes; both solo initial-route fixtures, Council 0/1/2/3/all legal slots and terminal precedence; all eight epilogues, all pages and whole-image fit at both viewport references, HIDE, no/mixed deaths and solo/loss exclusions | Separate directed/fixture verdicts, complete variant ledger, inspected source-edge/geometry comparisons and native traces; no fiction that every fixture was played |
| E — current-version Continue | Two legally earned files from the runs above; S-10 | Saved opening/new_campaign, result, reward-before-closure, Council-reward and ending boundaries; await writes, close/reopen, Continue and next legitimate input; no repeated committed reward/action/death/choice or cross-file history | Before/after native observations plus actual save/index hashes; last successful boundary stated, including any unsaved reading replay |
| F — audio, controls and remaining output judgments | Contexts already reached in A–E; S-11 plus remaining visual/control gaps | Present/past tavern/expedition/Council/endings; four volume categories, mute/nonzero, HIDE/Settings/Continue, seen FAST; audience/context replacement, initial-only welcome and ending-theme priority | Buffer evidence plus actual recorded sound, listener/date/method/heard result; final visual inspection notes tied to images/transitions, not screenshot existence |

Lots may share matching fresh evidence. Do not replay an unchanged campaign prefix solely to rename a capture. A change to event lists/Rules invalidates affected earned saves; source/art/targets/defaults invalidate the corresponding visual results; audio changes invalidate heard/buffer evidence. Repaired boundaries require new proof before reusing downstream parents.

## Checklist

- [x] Execute the plan's scenarios and required variants through keyboard/mouse only during directed gameplay. Read-only native state may explain observations; never assign seed, roster, reading history, route or progress.
- [x] Inspect every changed portrait/scene consumer and all eight epilogues, including actual source edges with HIDE. Inspect stills and entrance/focus/exit/temporal-cut recordings separately. Geometry assists judgment but does not prove good composition.
- [x] Confirm living-unselected hero visits, actual Council witnesses, black narrator isolation, restored pastel scene, lover prisons and Andirá reflection. Preserve approved source palette; do not silently waive a visual requirement because its art was accepted.
- [x] Execute HIDE/Settings/held-confirmation/seen-FAST boundaries with mouse and keyboard, including long trap results, new closures and final choice. Partial reading must stay unseen and restoration must remain observational.
- [x] **Dispensado pelo usuário, D-020; não executado.** Listen to actual emitted audio and record the listener/method/date and judgment. A decoded Ogg, AudioManager descriptor or recorded file without listening is insufficient. Cue choice and mix tuning remain delegated; no renewed source-choice permission is required.
- [x] Complete two-file native Continue checks using confirmed earned saves and immutable branch provenance. Preserve earlier saves without migration/reset; distinguish allowable replay of unsaved reading from repeated committed actions.
- [x] For failures, retain evidence, deduplicate the local bug, repair within scope through the owning task and rerun affected automated/directed/visual/audio checks. A needed scope/design change is recorded explicitly, not resolved by an invented fallback. No remote message/card is sent.
- [x] Keep accepted/deferred prose/art limitations separate from actual defects. Do not add a solo rewrite, B3–B8 completion, general consistency review, present venue, new ending art, zoom/browser/mobile matrix or unrelated bug cleanup.
- [x] **Captura/áudio de devlog dispensados pelo usuário, D-020/021; imagens de runtime disponíveis.** Produce the actual devlog-ready moment named in the spec: present Rheed over black, young tavern cut, route closure and full epilogue revealed with HIDE; include audible temporal change and the real native event in editor. Do not publish a devlog or substitute source captures.
- [x] Run final-verify for the exact candidate, including candidate-set/consumer/link audit and organization disposition. Run deslop for any coding fixes. Preserve the index; no commit, push, merge or publication.
- [x] Update scenario/lot results, V-004/005/006/007 and all five delivery flags with supported evidence only. Record applicable integrated-output judgments with actual reviewer/listener identity; do not infer human acceptance from agent inspection or source approval. If a required sensor/judgment is missing, leave it pending with the exact gap.
- [x] Record PASS/FAIL/BLOCKED for the precise delivery scope and distinguish that verdict from Git/candidate organization. Keep technical failures as failures to repair, not permission questions. Close only owned servers/tabs/profiles after preserving evidence; do not delete personal saves.

## Validation

Execution modes and variants are fixed by S-01–11 in verification.md; the lot table organizes execution without reducing coverage. The final artifact is a truthful report of the integrated candidate, including unresolved constraints if any, not a promise to test later.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-004, primary | Actual native render/transition inspection plus geometry/source comparison | Correct temporal composition, all dialogue branches, prisons/reflection, complete epilogue art and readable controls | `<run-id>/task-10/visual/` and report inspection ledger |
| V-005, primary | Canonical control results from 08 plus directed S-01/02/04/05/07/08 controls | Native HIDE/Settings/FAST/input preserve read state and do not double-confirm | `<run-id>/task-10/controls/` |
| V-006, primary | Native audio integration plus actual S-11 listening | Correct audible context, volumes/mute, no unintended overlap/repeated welcome, ending precedence | `<run-id>/task-10/audio/`, listener/date/result |
| V-007, primary | Native save integration plus S-10 directed Continue | Actual saved boundary, two-file isolation and no repeated committed action | `<run-id>/task-10/continue/`, payload/index provenance |
| Delivery / retained technical evidence | Final-verify with 08's fresh V-001/002/003/008 evidence | Accurate flags and exact candidate verdict, exclusions preserved, no unobserved PASS | verification.md and dated QA report |

Raw paths are under `docs/qa/evidence/approved-narrative-dialogue-staging/`. Maintained summary and selected delivery material must remain understandable from a fresh clone without raw ignored evidence. Acceptance and organization do not imply staging or publication.

## Execution Notes

**Estado atual: execução completed.** Prisão rústica implementada e verificada; áudio/editor dispensados por D-020/021. Aceite criativo final registrado em2026-09-18: o usuário respondeu “Perfeito” às artes entregues. Ver fechamento ao fim; os bloqueios anteriores abaixo são históricos.

### Histórico inicial (superado pelo fechamento abaixo)


### Entrada reconciliada — 2026-09-18

Guia09 pronto; casos focados pertinentes verdes, agregado08 em andamento. Coleta dirigida independente na cópia congelada em18727, preservando origem entre filhos; agregado usa18726. Arquivo1 novo, normal1280×720, créditos naturais. Request `task-10-request-physical-first.json`; executor instalado e adapter canônico. Resultados ainda não observados.

### Sensores e correções — 2026-09-18

A campanha dirigida inicial `41684d79-84a1-43eb-86c9-21a86c6ef5ba` percorreu abertura → ambas as rotas → Conselho → reunir → epílogos → créditos naturais → Continue. Coleta `executed-awaiting-review`,17 WAVs e2 vídeos; todos os recursos fechados no report. Confirma F-01: HIDE apagava retratos anexados (hide-1/hide-7). A autoria foi corrigida apenas nos mapas/CEs, coordenadas globais preservadas, sem vendor. IT-004/052 verificam o sprite durante HIDE; a seleção IT-004/052/054/059/014 teve5/5 PASS em339.8s. Revisão posterior encontrou o guard de HIDE de IT-054 sem correspondência com o sufixo do perfil (F-02); esse PASS não comprova o novo sensor do Conselho. Correção e rerun ficam pendentes do agregado congelado. O agregado anterior foi interrompido para a correção, sem PASS; seu IT-059 encontrou um seletor antigo de segunda linha, corrigido para segunda caixa da mesma unidade.

Inspeção de todas as caixas/ilustrações dos oito epílogos, ambos perfis: artes inteiras; clipping do indicador em Elowen (bug histórico existente). MessageCore juntava as quebras401; `<br>` nativo preserva as linhas autoradas sem alterar palavras/caixas. Reteste de fonte/IT-073 em andamento. A coleta inicial e seus saves permanecem históricos; a nova campanha usa o candidato corrigido.

Editor: inventário CUA indicou `jp.co.kadokawa.rpgmz` instalado/inativo. Primeiro getApp iniciou PID36314 mas retornou timeoutReached; segunda tentativa após processo confirmado retornou cgWindowNotFound. Sensor de janela indisponível; nenhuma edição/salvamento feito. Processo próprio36314 encerrado comSIGTERM; Steam preexistente preservado. A captura real do evento no editor continua BLOCKED, sem substituir por imagem de JSON ou IT-067.


### Fechamento dirigido e final-verify — 2026-09-18

Onze lotes finais após F-03/F-05: quatro percursos (físico→sobrenatural normal; ordem inversa reduzida preservando o primeiro arquivo; perda total reduzida; destruir em filho do mesmo pai da escolha reunir) e sete retomadas (opening, result, primeira/segunda closure, medallion, ending, two-files). Todos exit0, sem errors, teardown completo; relatórios, UUIDs e entradas em [relatório de QA](../../../docs/qa/reports/2026-09-18-approved-narrative-dialogue-staging.md) e `task-10/final-lots.json`. Os coletores de campanha mantêm `executed-awaiting-review`; os sete Continue têm PASS. Nenhuma inspeção escreveu estado da campanha.

Revisão efetiva dos dois perfis, oito heróis/ramos/despedidas, três limiares,58 quadros de Conselho,16 artes inteiras e todas as páginas de epílogo; transições vistas separadamente em vídeo. HIDE/Settings/FAST e entradas passaram. As cinco correções têm reteste; 134/134 casos canônicos com resultado válido pela composição de 121 PASS preservados do agregado e 13 donos revalidados (12 no lote afetado e IT-058 isolado). O agregado original continua FAIL; não foi renomeado como PASS. O [deep-review](deep-review.md) não encontrou novo defeito. V-005 e V-007 PASS.

Três critérios impedem concluir esta tarefa: (1) artes atuais não mostram prisão de Pérola/Floraí; o escopo preserva assets e não autoriza criar oclusão, exigindo decisão explícita de design/critério; (2) tentativa real de entregar WAV ao sensor retornou `audio content omitted because you do not support audio input`, portanto não existe julgamento da mixagem; (3) CUA não obteve janela do MZ (`cgWindowNotFound`), impedindo a captura de devlog. Não são pedidos renovados de aprovação das fontes/cues. Somente imagens de runtime e áudio gravado estão disponíveis para o devlog; o pacote permanece incompleto.

Final-verify/deslop/auditoria de seleção e links concluídos para o escopo técnico. `static_verified: true`; `implemented`, `runtime_verified`, `human_accepted` e `release_ready` continuam false para a spec completa. Índice vazio, sem commit ou publicação; nenhum recurso próprio ativo nas portas18726/18727. Não houve arquivamento/exclusão/seleção final de mídia, pois falta aceitação integrada compatível. Retomar somente os três critérios acima e qualquer sensor invalidado por sua resolução.

## Retomada concluída — confinamento rústico, 2026-09-18

**Execução técnica da task10: completed.** D-019 autoriza os dois PNGs e a direção refinada pelo usuário: Pérola é pedra rústica erodida que apenas sugere uma anã; Floraí é figueira antiga cuja madeira sugere um elfo genérico. Sem rosto detalhado, roupas ou aparência viva. A primeira versão com corpos reconhecíveis foi substituída, e suas evidências são históricas em `pre-art-direction/`.

D-020 aceita o áudio como pronto para esta entrega, com eventuais ajustes pelo usuário: audição **dispensada**, sem alegação de escuta. D-021 aceita a captura do editor como pronta para a entrega, com produção manual posterior pelo usuário: captura **dispensada**, sem imagem de editor fabricada. São decisões do usuário, não PASS de sensores ausentes.

Runtime alterado nesta retomada: somente oito argumentos `PictureName:str` nos CEs293/295/297/299 e dois PNGs transparentes de1024×1536. Originais intactos; escala44%, posição960/454.664, timing, foco, texto, áudio, regras, plugins e saves preservados. A inversão das oito referências reproduz byte a byte CommonEvents anterior: SHA256 `92bdfabfa6134c4efb6327b7978c28b0708ca457e523282d67296429211c2970`. Isso conserva o alcance dos percursos dirigidos anteriores e dos132 casos não afetados; não os transforma em capturas da arte nova.

Validação final: `node --test --test-name-pattern='^IT-05[23] —' rpg-maker/tests/campaign.test.mjs` — **2/2 PASS**,197.376s. IT-052/053 cobrem as duas ordens, diálogos warning/second, recompensa única, saída e Continue. A cobertura existente foi estendida para HIDE com preservação de retrato/texto/estado e capturas1280×720 normal/1920×1080 reduzido. Não há novo caso nem mock. Imagens reais foram abertas e inspecionadas: material integrado, sugestão do rosto acima da janela, transparência, bordas, leitura e HIDE. São fixtures de engine real, não novas campanhas dirigidas. Evidência local: `docs/qa/evidence/approved-narrative-dialogue-staging/confinement-20260918/`; capturas selecionadas em `docs/qa/deliveries/approved-narrative-dialogue-staging/confinement/`; prompts, origem e hashes em `rpg-maker/asset-provenance/approved-narrative-confinement.json`.

V-004 passa no escopo visual delegado; V-005/007 preservados e fronteiras afetadas revalidadas; V-006 conserva PASS técnico com audição dispensada. Nenhum bloqueio de implementação ou sensor obrigatório permanece sob D-019–021. A revisão criativa final do novo resultado pelo usuário ainda não foi registrada: não se infere aceite humano das novas imagens a partir da autorização de geração. `implemented`, `static_verified` e `runtime_verified` ficam true; `human_accepted` e `release_ready` permanecem false até esse aceite. Isso é distinto do encerramento da execução das dez tarefas.

Auditoria final/deslop: manter os dois assets usados, script de mutação local, teste canônico, proveniência, decisões atualizadas e quatro capturas selecionadas com manifesto. Originais e históricos preservados; nenhum arquivo alheio removido ou organizado por associação. Nenhuma dependência ou mudança de engine/vendor. Sem stage, commit ou publicação. Recursos dos testes encerrados.

## Aceite final — 2026-09-18

O usuário aprovou o resultado visual com “Perfeito”. A [verificação](verification.md#release-verdict) registra as cinco flags true para a spec após conferir a equivalência do candidato e dos inputs de IT-052/053. Áudio e captura do editor continuam dispensados como sensores, sem alegação de execução. Disposições auditadas mantidas; quatro capturas selecionadas/proveniência preservadas; evidências anteriores locais preservadas. Sem novas mudanças de runtime, testes redundantes, stage, commit ou publicação. O estado pendente mencionado na seção anterior é histórico e foi resolvido por este aceite.
