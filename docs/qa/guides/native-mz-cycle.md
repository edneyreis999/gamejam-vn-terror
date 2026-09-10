# Ciclo de QA nativa MZ — 2026-09-09

Este ciclo full verifica a migração aprovada na spec init-rpg-maker-mz. A matriz abaixo é um plano; não declara jornadas executadas. O relatório datado distingue evidência automatizada, observação visual e parecer humano.

## Preparação e isolamento

Seguir exatamente os comandos de validação, serviço e encerramento do [README nativo](../../../rpg-maker/README.md) e do DX da spec. Servir somente em http://127.0.0.1:18726/; usar um perfil Chrome isolado, vazio no primeiro início, e uma única aba ativa. Continue depende da mesma origem e do mesmo perfil. Não há bloqueio entre abas e não se afirma segurança de concorrência.

Registrar git HEAD e hashes das entradas, versão/layout, Chrome, Node, plugin order, seed, viewport, zoom, preferência de movimento e transcript de ações reais. O início limpo usa mapa 1, depois 2 e 3; nenhum save pessoal, ator, switch ou variável é pré-configurado. Capturar publicamente o estado com expeditionQA.snapshot() e validate(); setSeed(uint32) só antes de Jogar. O executor pode observar janelas, canvas, imagens e rede para medir as superfícies, mas não chamar Action/dispatch nem instalar uma campanha.

A automação deve fechar de fato a aba e criar outra no mesmo perfil para os casos de retomada; navegar apenas ao título na instância existente é insuficiente. Configurações de áudio são preferências nativas e não fatos da campanha. Somente E2E-013 e E2E-017 autorizam injeção de falhas na fronteira de I/O/carregamento.

## Receitas e decisões

1. Campanha sem perdas, seed 0, Gorvak/Elowen/Griznik, Igreja → Parque → Vilarejo; em cada encontro escolher uma abordagem coberta por uma competência viva; Reunir.
2. Repetir sem perdas na ordem Parque → Igreja → Vilarejo; Destruir. Registrar ambas as advertências e a montagem.
3. Seguir pela UI as decisões da receita histórica final-sixth-solo-council, seed 1, em rpg-maker/tests/fixtures/boundary-recipes.json. A última morte do grupo em Vilarejo/6 deixa reservas vivas: Conselho solo e nenhum epílogo individual.
4. Seguir pela UI final-sixth-total-loss, seed 9, do mesmo arquivo. Sacrificar Gorvak explicitamente no primeiro encontro; interromper na despedida, Continuar e observar sua ausência no retorno. Terminar com a oitava perda em Vilarejo/6 e memorial de oito.
5. Uma campanha mista com uma perda e testemunhas vivas: seed 0, grupo H1/H2/H4, Igreja A3-1, sacrificar H4, recuar; selecionar H1/H2/H3 e concluir as três rotas. Ao terminal, usar Continue para execuções separadas dos créditos por teclado, mouse e espera.

As receitas históricas são planos de decisões, não APIs E2E. Descartar expectedSequence, ADVANCE_TEXT e ENTER_DUNGEON do driver; ler cada trecho pelo teclado/mouse e deixar o controlador nativo executar transferências e checkpoints. Se uma utilidade de recuo só estiver disponível depois da leitura, ler antes. Registrar a sequência realmente produzida. Nenhuma fixture de domínio satisfaz uma jornada.

## Matriz de aceitação

Toda evidência vive em docs/qa/evidence/init-rpg-maker-mz/. Um transcript pode fundamentar vários IDs se cada observável estiver identificado.

| ID | Cenário | Observável requerido | Evidência relativa |
|---|---|---|---|
| E2E-001 | LOC-mz-session-recovery-export | — Fresh local entry: Open the DX local Chrome address in a clean isolated browser profile; verify PT-BR notices, no autoplay, activate Jogar once and read the prologue with its tavern background on its exclusive map, then transfer to the distinct tavern map. Verify no duplicate entry mutation or incidental transfer autosave; Continue restores the saved map and event boundary. | task-13/E2E-001/ |
| E2E-002 | FOR-mz-formation-roster | — Tavern and route preparation: Use mouse and fixed-order keyboard inspection, select Gorvak/Elowen/Griznik, consult/cancel roster, choose Igreja then Partir; profile reading never changes membership and departure requires valid preparation. | task-13/E2E-002/ |
| E2E-003 | ENC-mz-encounter-sacrifice-retreat | — Encounter choice handoff: Read the first encounter to all three choices, including the longest labels in a recorded legal recipe; held advance never confirms an approach and no viability label appears. | task-13/E2E-003/ |
| E2E-004 | ENC-mz-encounter-sacrifice-retreat | — Sacrifice and absence: Follow a recorded legal failure recipe, explicitly choose Gorvak, read his farewell, return to the tavern and capture the one-second disappearance plus the permanently empty later visit. | task-13/E2E-004/ |
| E2E-005 | ENC-mz-encounter-sacrifice-retreat | — Retreat and revisit: Reveal an encounter, retreat legally, switch routes then return; same assigned encounter and greatest completed progress remain, while the attempt restarts at position one. | task-13/E2E-005/ |
| E2E-006 | CAM-mz-discovery-closing | — Both discovery orders: Run one legal campaign Igreja-first and one Parque-first; verify each first/second warning, both map pieces, overlap and final-route unlock without replayable completed routes. | task-13/E2E-006/ |
| E2E-007 | CAM-mz-discovery-closing | — Council with witnesses: Complete a recorded campaign with living climax participants; read the full revelation and canonical ordered opinions, with both medallion choices still available. | task-13/E2E-007/ |
| E2E-008 | CAM-mz-discovery-closing | — Solo Council boundary: Use a recorded legal recipe whose last expedition hero dies on final encounter six while reserves live; reach solo confession without automatic town return or hero opinions. | task-13/E2E-008/ |
| E2E-009 | CAM-mz-discovery-closing | — Reunite and Continue: Choose Reunir after its consequences were shown, finish eligible closing material, close/reopen and Continue; the same ending returns without another final choice. | task-13/E2E-009/ |
| E2E-010 | CAM-mz-discovery-closing | — Destroy and Continue: Choose Destruir through normal play, finish closing material, close/reopen and Continue; retain the outcome and eligible epilogues. | task-13/E2E-010/ |
| E2E-011 | CAM-mz-discovery-closing | — Bad ending and Continue: Reach eighth-hero loss through normal play, including a recorded final-position boundary recipe; observe no medallion choice, then Continue the saved bad ending and memorial. | task-13/E2E-011/ |
| E2E-012 | ENC-mz-encounter-sacrifice-retreat | — Saved death continuation: Sacrifice through UI, wait for native autosave completion, close during the farewell and Continue; farewell restarts from its saved boundary and death count is unchanged. | task-13/E2E-012/ |
| E2E-013 | LOC-mz-session-recovery-export | — Native failure feedback: In an isolated browser run inject a storage I/O rejection at a normal checkpoint; observe native failure feedback and no retry-blocking dialog, then reload the last successful save. | task-13/E2E-013/ |
| E2E-014 | LOC-mz-session-recovery-export | — Native New Game: Continue an existing campaign and verify its state; return to title and activate New Game. Verify no replacement confirmation or old-save validation, eight living heroes and cleared reading history. The next successful autosave becomes the campaign loaded by Continue. | task-13/E2E-014/ |
| E2E-015 | ACC-mz-hide-keyboard-qa | — HIDE and options: During both a message and a choice, use HIDE/Tab and restore with Tab/left-click; no unintended action occurs. Open native volume options, mute each category and return to the same scene. | task-13/E2E-015/ |
| E2E-016 | ACC-mz-hide-keyboard-qa | — Desktop accessibility: At 1280×720 and 1920×1080 effective game areas complete preparation and encounter/sacrifice controls by keyboard; check long prose, visible focus and reduced-motion absence. Zoom run retains the minimum area. | task-13/E2E-016/ |
| E2E-017 | LOC-mz-session-recovery-export | — Native image retry: In an isolated served package make one required image unavailable, reach it through UI and observe native Retry; restore asset service and retry without custom text-only continuation. | task-13/E2E-017/ |
| E2E-018 | LOC-mz-session-recovery-export | — Package review in Chrome: validate content and walk entry/choice/save/Continue with all dynamic assets included. Direct RPG Maker editor tests (edit/save/reopen/export through its UI) are out of scope by explicit user instruction; future ADR to be authored by the user. | task-13/E2E-018/ |
| E2E-019 | ACC-mz-hide-keyboard-qa | — QA and evidence: Use only the three documented QA methods around a real legal journey; verify no state/RNG changes from inspection and record revision, seed, actions and motion/viewport alongside the absence capture. | task-13/E2E-019/ |
| E2E-020 | ART-mz-visual-audio-runtime | — Audio review: After explicit Jogar audition every selected provisional context/theme/effect through its scene; record filenames and review status, confirm silent/muted play retains all required information. | task-13/E2E-020/ |
| E2E-021 | LOC-mz-session-recovery-export | — Serve workflow and single-tab contract: Follow the exact DX launch/stop recipe, reopen using the same origin/profile and confirm saved continuation. Verify docs state one active tab without claiming a lock; do not claim concurrent-tab safety. | task-13/E2E-021/ |
| E2E-022 | CAM-mz-discovery-closing | — Terminal eligibility variants: Use recorded legal recipes for no deaths and no eligible climax heroes; verify respectively no memorial and no individual epilogues, with reserves excluded. | task-13/E2E-022/ |
| E2E-023 | CAM-mz-discovery-closing | Updated closing journey — through legal actions reach a memorial and eligible epilogues, verify animated graves and readable cause captions, then skip credits by mouse and keyboard in separate runs. Normal completion and skip preserve terminal Continue and cannot carry input into New Game. | task-13/E2E-023/ |
| V-VISUAL | ART-mz-visual-audio-runtime | Minimum 1280×720 and larger: all surfaces, longest choices, HIDE, all three ending images, eight graves/captions and input focus; capture screenshots. | task-13/V-VISUAL/ |
| V-AUDIO | ART-mz-visual-audio-runtime | Audition and record four ambience contexts/two ending themes, <=10 effects, 40% defaults, mute and no autoplay/stacking. | task-13/V-AUDIO/ |
| V-HUMAN | ART-mz-human-approval | Record actual final art, editorial/cultural and attribution approval; provisional generated assets cannot be silently promoted. | task-13/V-HUMAN/ |
| V-EXPORT | LOC-mz-session-recovery-export | Launch complete exported package in Chrome; dynamic assets resolve; no missing runtime dependency or unapproved network; teardown own server and isolated saves. | task-13/V-EXPORT/ |

## Sensores, editor e devlog

Capturar telas de todas as superfícies em 1280×720 e 1920×1080, escolhas longas/foco, HIDE, três finais e oito sepulturas. A ampliação deve manter a área efetiva mínima; movimento reduzido não deve mostrar o desaparecimento animado. Captura sugerida para devlog: sacrifício de Gorvak → despedida → retorno com desaparecimento de um segundo → cadeira ausente na visita seguinte, sem informações privadas na imagem.

Por orientação explícita do usuário, testes diretamente no editor do RPG Maker estão fora do escopo: não exigir edição, salvar/reabrir ou exportação/reexportação pela interface como validação. O usuário escreverá uma ADR futuramente. Continuam os testes de conteúdo e do runtime/pacote em Chrome, incluindo assets dinâmicos, entrada/escolha/save/Continue e ausência de requests externos não aprovados. Não publicar.

Audição real de quatro contextos, dois temas e efeitos, adequação artística, revisão editorial/cultural e atribuição exigem parecer de uma pessoa. Esta sessão de agente não dispõe de entrada de áudio; decodificação e playback não encerram E2E-020/V-AUDIO. Lucas/Pati/João/Maria/Edney mantêm suas responsabilidades já definidas. Preparar o pacote e as capturas antes de solicitar esses pareceres.

## Encerramento e debrief

Encerrar cada time-box, registrar duração, persona, caminho alcançado, falhas, evidências e próxima missão no relatório. Atualizar os cenários e materializar state.csv pelo script existente; não editar a visualização à mão. Encerrar somente servidores, Chrome e editor de teste criados no ciclo; remover os perfis e saves temporários próprios, preservando evidência e a exportação revisável. Commits e publicação permanecem manuais.

## Executor retomado

As jornadas de aceitação usam o executor instalado, não `node --test` nos drivers
legados. Prepare uma cópia com `prepare` de `rpg-maker/qa/directed-adapter.mjs` e
passe o caminho retornado em `--fixture`:

```sh
DRYLAND_QA_JOURNEY=physical-first-reunite node .agents/skills/rpg-maker-mz-qa-execution/scripts/directed-browser.mjs --project . --fixture <copia-isolada> --case rpg-maker/qa/native-journeys.test.mjs --adapter rpg-maker/qa/directed-adapter.mjs --output <diretorio-novo>
```

Jornadas: `physical-first-reunite`, `supernatural-first-destroy`,
`final-sixth-solo-council`, `final-sixth-total-loss`, `mixed-memorial-credits`.
Para superfícies, usar `native-surfaces.test.mjs` e `DRYLAND_QA_SURFACE` com
`encounter-input`, `absence-retreat`, `storage-recovery`, `image-recovery` ou
`editor-package`. `DRYLAND_QA_VIEWPORT=large-reduced` seleciona 1920×1080 e
movimento reduzido; não representa zoom do navegador.

Exit 0/`executed-awaiting-review` exige inspeção das capturas e revisão por
critério. Preservar cada pasta de execução e anexar `visual-review.json`; nunca
reescrever o relatório bruto para fazê-lo passar. Os drivers legados agora
produzem somente evidência parcial em pastas próprias, sem sobrescrever IDs.

Retomada adicional: `DRYLAND_QA_SURFACE=current-package` valida a cópia atual sem
a frase histórica de edição. `DRYLAND_QA_VIEWPORT=native-zoom` usa janela real,
aguarda zoom de 110% aplicado via Computer Use e exige ao menos 1280×720 pixels
CSS; conferir também o retângulo efetivo do canvas. `large-reduced` continua sendo
1920×1080 emulado com movimento reduzido. O zoom real não altera as preferências
do perfil pessoal do usuário.
