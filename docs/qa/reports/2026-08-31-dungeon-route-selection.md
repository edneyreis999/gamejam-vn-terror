# QA Run Report — 2026-08-31 — dungeon-route-selection

- **Scope:** seleção da ordem dos dois caminhos iniciais, troca após recuo, fechamento de rota, portão final, contrato QA v2 e canários adjacentes
- **Cadence tier:** targeted
- **Build:** baseline `4668b73`; remediação após `1ccc712`, runtime SHA-256 agregado `46ab6971f2b995ec49087f088d887a57b67011045fb06fffce9a610e19dc6f4e` e runner SHA-256 agregado `ac180b85b721dd8277b388af7119f8f5a21e1dbac44b2c9da4ecd9bb9d422c1c` · **Environment:** Chrome desktop estável, `file://`, rede desligada, sem servidor; driver `agent-browser` porque `browser-use:browser` não está disponível neste ambiente
- **Started:** 2026-08-31T18:16:10Z · **Closed:** 2026-09-01T01:11:30Z · **Status:** closed
- **Fresh remediation windows:** runner 2026-09-01T01:11:25Z → 2026-09-01T01:11:30Z; teclado real 2026-09-01T01:11:16Z → 2026-09-01T01:11:17Z.

## Personas

| Persona | Base | Device / Network / Locale | Sessions |
|---|---|---|---|
| Caio, estrategista recorrente | Power User | desktop / offline após carga local / pt-BR | CH-route-order-and-gate, CH-route-tests-entry-canary, CH-seeded-diagnostics-reproduction |
| Joana, jogadora ampliada | Accessibility-Reliant User | laptop 320×800, zoom 200%, reduced motion / offline / pt-BR | CH-keyboard-zoom-motion |
| Lia, primeira expedicionária | New User | laptop / offline / pt-BR | CH-complete-outcomes-canary |
| Rui, revisor de conteúdo | Recovering User | desktop / offline ou imagens bloqueadas / pt-BR | CH-offline-all-images-blocked, CH-sixteen-image-devlog-review |

## Flows in Scope

- `J-complete-campaign` — escolher a ordem inicial, preservar consequências e chegar ao Legado (`../journeys/J-complete-campaign.md`)
- `J-local-offline-launch` — iniciar e abandonar uma sessão somente com arquivos locais (`../journeys/J-local-offline-launch.md`)
- `J-reproduce-campaign` — reproduzir seed, ordem, snapshot v2 e rejeições (`../journeys/J-reproduce-campaign.md`)
- `J-run-browser-contract` — observar exatamente 351 casos no runner local (`../journeys/J-run-browser-contract.md`)

## Session Matrix & Results

| # | Charter | Journey / Scenario | Persona | Tour | Status | Issue | Fix commit |
|---|---|---|---|---|---|---|---|
| 1 | CH-route-order-and-gate | J-complete-campaign / FOR-formation-roster | Caio | Feature Tour | Pass | | |
| 2 | CH-route-order-and-gate | J-complete-campaign / ENC-encounter-consequences | Caio | Feature Tour | Pass | | |
| 3 | CH-route-order-and-gate | J-complete-campaign / CAM-dungeon-progression-outcomes | Caio | Feature Tour | Pass | | |
| 4 | CH-route-order-and-gate | J-complete-campaign / ACC-accessibility-diagnostics | Caio | Feature Tour | Pass | | |
| 5 | CH-route-tests-entry-canary | J-run-browser-contract / LOC-local-launch-session | Caio | Feature Tour | Pass | | |
| 6 | CH-route-tests-entry-canary | J-run-browser-contract / ACC-accessibility-diagnostics | Caio | Feature Tour | Pass | | |
| 7 | CH-keyboard-zoom-motion | J-complete-campaign / FOR-formation-roster | Joana | Interrupt Tour | Pass | | |
| 8 | CH-keyboard-zoom-motion | J-complete-campaign / ENC-encounter-consequences | Joana | Interrupt Tour | Pass | | |
| 9 | CH-keyboard-zoom-motion | J-complete-campaign / CAM-dungeon-progression-outcomes | Joana | Interrupt Tour | Pass | | |
| 10 | CH-keyboard-zoom-motion | J-complete-campaign / ACC-accessibility-diagnostics | Joana | Interrupt Tour | Pass | | |
| 11 | CH-offline-all-images-blocked | J-local-offline-launch / LOC-local-launch-session | Rui | Network Tour | Pass | | |
| 12 | CH-offline-all-images-blocked | J-local-offline-launch / ART-encounter-art-content | Rui | Network Tour | Pass | | |
| 13 | CH-seeded-diagnostics-reproduction | J-reproduce-campaign / ACC-accessibility-diagnostics | Caio | Garbage Tour | Pass | | |
| 14 | CH-seeded-diagnostics-reproduction | J-reproduce-campaign / CAM-dungeon-progression-outcomes | Caio | Garbage Tour | Pass | | |
| 15 | CH-complete-outcomes-canary | J-complete-campaign / CAM-dungeon-progression-outcomes | Lia | Feature Tour | Pass | | |
| 16 | CH-complete-outcomes-canary | J-complete-campaign / ENC-encounter-consequences | Lia | Feature Tour | Pass | | |
| 17 | CH-sixteen-image-devlog-review | J-complete-campaign / ART-encounter-art-content | Rui | Feature Tour | Pass | | |
| 18 | CH-sixteen-image-devlog-review | J-complete-campaign / ENC-encounter-consequences | Rui | Feature Tour | Pass | | |

Status legend: `Pending | Pass | Fixed | Skipped | Blocked (needs human verify) | Blocked (human decision)`

## Session Debriefs

### CH-route-tests-entry-canary — Caio, estrategista recorrente

- **Ran:** 2026-08-31T18:18:00Z → 2026-08-31T18:18:08Z (box respected: yes)
- **Driver / entry:** `agent-browser`, Chrome desktop, `file:///…/prototype/tests.html`, rede desligada após a entrada local.
- **Steps observed:** o runner carregou fontes de produção, manteve o título final `PASS — 351/351 testes`, exportou `{total: 351, passed: 351, failed: 0}` e listou E2E-023/E2E-024 para as duas ordens.
- **Evidence:** `../evidence/2026-08-31-dungeon-route-selection/CH-route-tests-entry-canary-351-pass.png`
- **Findings:** nenhum desvio no contrato automatizado local; avisos do console correspondem aos cenários de erro deliberadamente exercitados pela própria suíte.
- **Bugs filed/updated:** nenhum.
- **Scenarios settled:** nenhum ainda; LOC e ACC exigem os charters de jogador/operador restantes.
- **Paper cuts:** nenhum.
- **Surprises:** o resumo visual não repete a contagem no texto capturado pelo snapshot interativo, mas título e objeto público oferecem duas leituras independentes.
- **Suggested next charter:** CH-route-order-and-gate.

### CH-route-order-and-gate — Caio, estrategista recorrente

- **Ran:** 2026-08-31T18:20:00Z → 2026-08-31T18:27:00Z (box respected: yes)
- **Driver / entry:** `agent-browser`, duas sessões Chrome desktop frescas por `file:///…/prototype/index.html`, rede desligada; seed pública `20260831` definida antes do início.
- **Steps observed:** heróis antes da rota produziram o erro focado `Escolha um caminho antes de partir.` sem perder H1/H2/H3; alternância de rádios e consulta de elenco preservaram escolhas; recuos após um marco em cada rota mantiveram atribuições A7/B1 e registros independentes `1/1`; revisita voltou à posição 1 com a cópia de reinício; cada rota concluída virou cartão estático.
- **Goal / true end:** Ferro→Vozes→Legado e Vozes→Ferro→Legado chegaram a vitória pela UI. Cada sessão terminou com progresso `5/5/6`, contagem `5/5/6`, 16 IDs únicos, zero mortos e `validate()` sem violações; reload da primeira sessão retornou a `ready`, seed nula, zero partes, zero progresso e atribuições vazias.
- **Evidence:** `../evidence/2026-08-31-dungeon-route-selection/CH-route-order-and-gate-missing-route.png`; `../evidence/2026-08-31-dungeon-route-selection/CH-route-order-and-gate-after-retreat.png`; `../evidence/2026-08-31-dungeon-route-selection/CH-route-order-and-gate-revisit-first-landmark.png`; `../evidence/2026-08-31-dungeon-route-selection/CH-route-order-and-gate-devlog-1-of-2.png`; `../evidence/2026-08-31-dungeon-route-selection/CH-route-order-and-gate-final-unlocked.png`; `../evidence/2026-08-31-dungeon-route-selection/CH-route-order-and-gate-order-a-victory.png`; `../evidence/2026-08-31-dungeon-route-selection/CH-route-order-and-gate-order-b-1-of-2.png`; `../evidence/2026-08-31-dungeon-route-selection/CH-route-order-and-gate-order-b-victory.png`; `../evidence/2026-08-31-dungeon-route-selection/CH-route-order-and-gate-fresh-reset.png`.
- **Devlog checkpoint:** Ferro e Raízes estático em `5 de 5`, Vozes e Espelhos como único rádio selecionado e Legado bloqueado em `1 de 2`; o cartão concluído não continha `input` ou `button`.
- **Findings:** nenhum defeito funcional. Axe no checkpoint reportou zero violações; contraste ficou `incomplete` pela limitação conhecida do gradiente, coberta pelos 11 pares AA medidos no contrato visual.
- **Bugs filed/updated:** nenhum.
- **Scenarios settled:** CAM-dungeon-progression-outcomes → pass. FOR, ENC e ACC aguardam suas personas/canários específicos.
- **Paper cuts:** nenhum.
- **Surprises:** o maior percurso permanece visível depois do recuo, mas a frase de limiar comunica corretamente que a tentativa recomeça no primeiro marco.
- **Suggested next charter:** CH-keyboard-zoom-motion.

### CH-keyboard-zoom-motion — Joana, jogadora ampliada

- **Ran:** 2026-08-31T18:29:00Z → 2026-08-31T18:32:00Z (box respected: yes)
- **Driver / entry:** `agent-browser`, `file:///…/prototype/index.html`, viewport 640×800 com zoom CSS do documento em `2` (320 CSS px efetivos), rede desligada, modo escuro e `prefers-reduced-motion: reduce`.
- **Steps observed:** abertura, introdução, escolha do rádio, H1/H2/H3, elenco, Escape, partida, 16 decisões, duas transições e campanha nova foram percorridos com Tab/Shift+Tab, Espaço, Enter e Escape. O diálogo devolveu foco a **Consultar elenco**; os cartões bloqueado/concluído permaneceram fora da ordem focável e cada transição focou um heading seguro.
- **Goal / true end:** vitória por teclado em `5/5/6`, oito epílogos, zero mortes, zero overflow horizontal e reset para `ready`, seed nula, zero partes e zero mortos.
- **Evidence:** `../evidence/2026-08-31-dungeon-route-selection/CH-keyboard-zoom-motion-formation-320-effective.png`; `../evidence/2026-08-31-dungeon-route-selection/CH-keyboard-zoom-motion-victory.png`.
- **Findings:** Axe WCAG A/AA reportou zero violações. O contraste permaneceu `incomplete` apenas porque a ferramenta não resolve o fundo em gradiente; os 11 pares já medidos pelo contrato visual continuam AA.
- **Bugs filed/updated:** nenhum.
- **Scenarios settled:** FOR-formation-roster e ACC-accessibility-diagnostics → pass; ENC e CAM mantidos pass pelas caminhadas convergentes.
- **Paper cuts:** nenhum.
- **Suggested next charter:** CH-offline-all-images-blocked.

### CH-offline-all-images-blocked — Rui, revisor de conteúdo

- **Ran:** 2026-08-31T18:33:00Z → 2026-08-31T18:34:00Z (box respected: yes)
- **Driver / entry:** `agent-browser`, Chrome desktop por `file:///…/prototype/index.html`, rede offline e regra anterior à navegação abortando `**/*.jpg`.
- **Steps observed:** o encontro A7 abriu sem `<img>`, preservou título, descrição, progresso e três abordagens; uma abordagem viável produziu explicação e sucesso. Não havia `<audio>` ou `<video>`. Reload durante o encontro voltou a `ready`, seed nula e progresso `0/0/0`.
- **Evidence:** `../evidence/2026-08-31-dungeon-route-selection/CH-offline-all-images-blocked-fallback.png`.
- **Findings:** nenhum; `validate()` retornou `{ok: true, violations: []}` e não houve erro de página.
- **Bugs filed/updated:** nenhum.
- **Scenarios settled:** LOC-local-launch-session e ART-encounter-art-content → pass, este último confirmado pelo inventário visual abaixo.
- **Paper cuts:** nenhum.
- **Suggested next charter:** CH-seeded-diagnostics-reproduction.

### CH-seeded-diagnostics-reproduction — Caio, estrategista recorrente

- **Ran:** 2026-08-31T18:34:00Z → 2026-08-31T18:36:00Z (box respected: yes)
- **Driver / entry:** `agent-browser`, sessões frescas por `file:///…/prototype/index.html`; inspeção restrita a `setSeed`, `snapshot` e `validate`.
- **Steps observed:** seeds `0` e `4294967295` foram aceitas; `-1` retornou `invalid_seed`; reseed depois de iniciar retornou `campaign_already_started`. Partida sem caminho manteve histórico em 5 eventos, focou `#campaign-error` e publicou `DEPART/destination_required`; selecionar Vozes acrescentou um evento e limpou a rejeição. Separadamente, E2E-022 no runner submeteu `SELECT_DESTINATION/final` ao controlador, comprovou `destination_unavailable` fora do histórico e verificou a limpeza pela ação aceita seguinte; a UI pública manteve o cartão bloqueado estático e não acionável.
- **Reproduction:** a execução fresca de E2E-015 realizou quatro campanhas com seed `20260830`: duas Ferro→Vozes→Legado e duas Vozes→Ferro→Legado. Cada par comparou o snapshot v2 completo — atribuições, marcos atravessados em `destinations`, histórico e diagnóstico — e foi idêntico; E2E-023/E2E-024 confirmaram as identidades explícitas em `destination_selected`, a ordem em `party_formed`, `5/5/6`, 16 encontros únicos e zero violações. O snapshot permaneceu profundamente congelado/destacado; tentativa de mutação não alterou leitura posterior. `validate()` foi não mutante e o objeto global expôs exatamente três métodos.
- **Evidence:** `../evidence/2026-08-31-dungeon-route-selection/CH-seeded-diagnostics-reproduction-rejection.png`; `../evidence/2026-08-31-dungeon-route-selection/CH-seeded-diagnostics-reproduction-seed-20260830.png`; `../evidence/2026-08-31-dungeon-route-selection/CH-review-remediation-final-runner-351-pass.png`.
- **Findings / bugs:** nenhum.
- **Scenarios settled:** ACC-accessibility-diagnostics e CAM-dungeon-progression-outcomes → pass.
- **Paper cuts:** nenhum.
- **Suggested next charter:** CH-complete-outcomes-canary.

### CH-complete-outcomes-canary — Lia, primeira expedicionária

- **Ran:** 2026-08-31T18:37:00Z → 2026-08-31T18:41:00Z (box respected: yes)
- **Driver / entry:** `agent-browser`, duas sessões frescas por `file:///…/prototype/index.html`; todas as transições acionadas por controles visíveis, sem dispatch.
- **Steps observed:** a sessão de vitória terminou em `5/5/6`, oito epílogos e zero mortos. A sessão de derrota, iniciada com seed `23`, sacrificou legalmente H4, H7, H8, H1, H2, H3, H5 e H6; o terminal informou: “Os oito heróis morreram. Sem ninguém para conduzir de volta, o bardo também morre.”
- **True ends:** **Iniciar nova campanha** após cada terminal retornou a `ready`, seed nula, zero partes e elenco íntegro.
- **Evidence:** `../evidence/2026-08-31-dungeon-route-selection/CH-complete-outcomes-canary-victory.png`; `../evidence/2026-08-31-dungeon-route-selection/CH-complete-outcomes-canary-defeat.png`.
- **Findings / bugs:** nenhum; ambos os terminais passaram em `validate()`.
- **Scenarios settled:** CAM-dungeon-progression-outcomes e ENC-encounter-consequences → pass.
- **Paper cuts:** nenhum.
- **Suggested next charter:** CH-sixteen-image-devlog-review.

### CH-sixteen-image-devlog-review — Rui, revisor de conteúdo

- **Ran:** 2026-08-31T18:38:00Z → 2026-08-31T18:45:00Z (box respected: yes)
- **Driver / entry:** inspeção direta dos 16 JPEGs locais e campanha real com `agent-browser` por `file:///…/prototype/index.html`, primeiro em 1440×900 e depois em 320×800.
- **Inventory:** A1–A8 e B1–B8 são JPEGs de 1600×900; a UI foi observada em 1440×900 e 320×800, com `object-fit: cover`, três abordagens e sem overflow. Nenhuma imagem contém texto embutido, rótulo de competência ou pista mecânica, atalho de Halloween norte-americano ou demonização de religiões brasileiras vivas; a cópia visível continua marcada como provisória onde o GDD assim exige.
- **Devlog sequence:** seed `23` com H4/H7/H8 revelou A1 em `0/3`; a abordagem produziu falha letal; selecionar H4 abriu confirmação, cancelar devolveu foco ao card H4, e confirmar moveu H4 para **Mortos** com H7/H8 ainda na expedição.
- **Evidence:** `../evidence/2026-08-31-dungeon-route-selection/CH-sixteen-image-devlog-review-narrow-encounter.png`; `../evidence/2026-08-31-dungeon-route-selection/CH-sixteen-image-devlog-review-seed23-approaches.png`; `../evidence/2026-08-31-dungeon-route-selection/CH-sixteen-image-devlog-review-seed23-failure.png`; `../evidence/2026-08-31-dungeon-route-selection/CH-sixteen-image-devlog-review-seed23-confirmation.png`; `../evidence/2026-08-31-dungeon-route-selection/CH-sixteen-image-devlog-review-seed23-roster.png`.
- **Findings / bugs:** nenhum; não foi inferido canon novo a partir das ilustrações.
- **Scenarios settled:** ART-encounter-art-content e ENC-encounter-consequences → pass.
- **Paper cuts:** nenhum.
- **Suggested next charter:** nenhum; matriz planejada concluída.

## Edge Probes Attempted

| Probe | Input/state | Observed result | Evidence |
|---|---|---|---|
| Partida sem caminho | H1/H2/H3 selecionados e nenhum caminho | `destination_required`, foco no alerta e formação preservada | `../evidence/2026-08-31-dungeon-route-selection/CH-route-order-and-gate-missing-route.png` |
| Mudança rápida de rota | Ferro→Vozes→Ferro antes de partir | Um único rádio marcado e último destino comprometido | `../evidence/2026-08-31-dungeon-route-selection/CH-review-remediation-final-runner-351-pass.png` (IT-155/IT-158) |
| Elenco e Escape | Rota/heróis escolhidos, diálogo aberto | Escape fechou e devolveu foco sem perder seleção | `../evidence/2026-08-31-dungeon-route-selection/CH-keyboard-zoom-motion-formation-320-effective.png` |
| Sacrifício cancelado/repetido | Vítima escolhida, cancelar e confirmar | Cancelamento restaurou foco; confirmação gerou uma morte | `../evidence/2026-08-31-dungeon-route-selection/CH-sixteen-image-devlog-review-seed23-confirmation.png` |
| Reload em encontro | Encontro revelado e página recarregada | Nova sessão `ready`, progresso e atribuições zerados | `../evidence/2026-08-31-dungeon-route-selection/CH-offline-all-images-blocked-fallback.png` |
| JPEGs bloqueados | Regra de rede abortando `**/*.jpg` | Texto e três abordagens permaneceram jogáveis, sem erro de página | `../evidence/2026-08-31-dungeon-route-selection/CH-offline-all-images-blocked-fallback.png` |
| 320 px / zoom 200% | Viewport 640×800 com zoom 2 | Rotas e heróis em uma coluna, sem overflow horizontal | `../evidence/2026-08-31-dungeon-route-selection/CH-review-remediation-real-keyboard-formation.png` |
| Escuro / movimento reduzido | `dark` + `prefers-reduced-motion: reduce` | Jornada por teclado manteve controles e foco; preferência observada como ativa | `../evidence/2026-08-31-dungeon-route-selection/CH-review-remediation-real-keyboard-formation.png` |
| Limites de seed | `0`, `4294967295`, `-1` e reseed tardio | Limites aceitos; inválida/tardia rejeitadas por códigos estruturados | `../evidence/2026-08-31-dungeon-route-selection/CH-seeded-diagnostics-reproduction-seed-20260830.png` |
| Mutação de snapshot | Alteração tentada em cópia retornada | Leitura posterior permaneceu igual e `validate()` não mutou estado | `../evidence/2026-08-31-dungeon-route-selection/CH-review-remediation-final-runner-351-pass.png` (E2E-015, UT-055/UT-064) |

## Experiential Lens Pass

| Journey | Usability | Accessibility | Perceived performance | Compatibility | Error recoverability | Production parity |
|---|---|---|---|---|---|---|
| J-complete-campaign | Pass — estados e nomes diegéticos visíveis | Pass — teclado, foco, zoom e Axe 0 | Pass — respostas imediatas, sem espera ou layout shift observado | Pass no contrato Chrome-only em 1440 e 320 efetivos, modo escuro e reduced motion; modo claro não foi verificado | Pass — erro de rota preserva formação; cancelamentos e reload têm resultado explícito | Pass qualificado — mesmo HTML/CSS/JS local entregue; sem servidor, auth ou storage por desenho |
| J-local-offline-launch | Pass — entrada e fallback mantêm a tarefa clara | Pass — conteúdo essencial independe de imagem/áudio | Pass — carga local e ações imediatas offline | Pass no Chrome suportado e viewport estreito | Pass — imagem ausente degrada, reload inicia sessão limpa | Pass qualificado — rede e 16 imagens bloqueadas; extensões de navegador não foram simuladas |
| J-reproduce-campaign | Pass — ordem e diagnóstico ficam distinguíveis no snapshot | Pass — inspeção não altera a jornada pública | Pass — quatro replays locais concluídos no mesmo gate | Pass no Chrome-only por `file://` | Pass — erros de seed/rota são estruturados e não entram no histórico aceito | Pass qualificado — API QA permanece limitada a três métodos e o bloqueio usa fixture separado |
| J-run-browser-contract | Pass — título e resumo público concordam | Pass — relatório textual permanece legível | Pass — 351 casos concluídos em 5 s na janela fresca | Pass no Chrome desktop suportado | Pass — zero linhas FAIL; fixtures inválidas aparecem como testes esperados | Pass — runner carrega exatamente os mesmos arquivos de produção da entrada local |

Modo claro, Safari, Firefox, navegadores móveis, autenticação, backend, extensões, persistência, áudio e serviços externos não foram verificados porque estão fora do contrato confirmado deste protótipo.

## What Was Fixed

- Entre 01:11:25Z e 01:11:30Z, a quarta remediação abriu o runner pelo HTML local e confirmou 351 aprovados, zero falhas e zero linhas FAIL com os hashes agregados do cabeçalho. Evidência: `../evidence/2026-08-31-dungeon-route-selection/CH-review-round4-remediation-runner-351-pass.png`.
- Entre 01:11:16Z e 01:11:17Z, uma sessão Chrome fresca percorreu abertura, introdução, rádio físico, H1/H2/H3, elenco, fechamento do diálogo e **Partir** com Tab, Espaço e Enter reais em 320 CSS px efetivos, modo escuro e movimento reduzido. A sessão chegou a `dungeon_intro`, posição 1, foco `#threshold-title`, sem overflow e com `validate()` sem violações. Evidência: `../evidence/2026-08-31-dungeon-route-selection/CH-review-round4-real-keyboard-formation.png`.
- A janela fresca da terceira remediação usou o runtime e runner identificados pelos SHA-256 agregados do cabeçalho. Entre 23:29:11Z e 23:29:15Z, Chrome abriu `prototype/tests.html` diretamente e retornou 351 aprovados, zero falhas e `{total: 351, passed: 351, failed: 0}`. Evidência: `../evidence/2026-08-31-dungeon-route-selection/CH-review-round3-remediation-runner-351-pass.png`.
- Entre 21:53:46Z e 21:53:48Z, uma sessão Chrome fresca usou Tab, Espaço e Enter reais em 320 CSS px efetivos, modo escuro e movimento reduzido. Antes de partir, a rota física e H1/H2/H3 estavam selecionados, **Partir** tinha foco e não havia overflow; Enter chegou a `dungeon_intro`, posição 1, foco `#threshold-title` e `validate()` sem violações. Evidência: `../evidence/2026-08-31-dungeon-route-selection/CH-review-remediation-real-keyboard-formation.png`.
- No commit `6b0bfb3`, `prototype/app.js` passou a anunciar o nome diegético da única rota selecionada e a mover foco ao heading de preparação; IT-204/IT-209 e a reexecução Chrome por controles visíveis observaram `Preparação disponível. Caminho selecionado automaticamente: Caminho das Vozes e dos Espelhos.`, foco em `#formation-title` e `validate()` sem violações.
- No commit `6b0bfb3`, `prototype/game.js` passou a concluir a campanha quando o último membro da expedição é sacrificado no sexto marco final, antes da decisão de recuo. UT-039 e a reexecução Chrome com seed `1`, somente por controles visíveis, concluíram `5/5/6`, sacrificaram H1/H3/H4 nos marcos finais 4/5/6, preservaram H2/H5/H6/H7/H8 e terminaram em vitória com `validate()` sem violações. Evidência: `../evidence/2026-08-31-dungeon-route-selection/CH-review-remediation-final-last-sacrifice-victory.png`.

## Paper Cuts

| Persona | Where (journey/step) | Felt | Sharpness | Outcome |
|---|---|---|---|---|

## Runtime Errors Observed

- CH-route-tests-entry-canary: nenhum erro de página. O console contém avisos esperados das fixtures que exercitam rejeições, imagem e diálogo opcionais; nenhum escapou como falha do runner.
- Demais charters: nenhum erro de página. As rejeições controladas produziram somente os avisos estruturados previstos pelo contrato.

## Human Verifications Needed

Nenhuma para este ciclo de mecânica; o protótipo não possui pagamento, email, SMS, OAuth ou serviço externo. Decisões narrativas e de apresentação permanecem `Pendente`/`Fora do escopo` conforme o GDD canônico.

## Decisions for a Human

Nenhuma para este ciclo; decisões narrativas e de apresentação permanecem `Pendente`/`Fora do escopo` conforme o GDD canônico.

## Learnings

- O cartão estático de rota concluída e o rádio único derivado reduzem ambiguidade sem criar uma quarta mecânica de navegação.
- A mesma degradação textual cobre rede offline, JPEG bloqueado e independência de áudio; não foi necessário inventar um fallback remoto.
- O checkpoint mais demonstrável para o devlog continua sendo `1 de 2`: uma rota concluída estática, a outra selecionada e Legado bloqueado.

## Final Status

- **Exit gate (full automated suite):** Chrome desktop, direto por `file:///Users/edney/projects/coreto/gamejam-vn-terror/prototype/tests.html`, rede desligada — reexecutado entre 2026-09-01T01:11:25Z e 2026-09-01T01:11:30Z com 351 aprovados; `window.__expeditionTestResults = {total: 351, passed: 351, failed: 0}`; zero linhas FAIL. Evidência fresca: `../evidence/2026-08-31-dungeon-route-selection/CH-review-round4-remediation-runner-351-pass.png`.
- **Issues by user impact:** 0 Blocks-Completion, 0 Data-Loss, 0 Trust-Damage, 0 Friction, 0 Cosmetic.
- **Coverage:** 18/18 linhas Pass, 7/7 charters executados, 6/6 cenários reconciliados, 4/4 jornadas observadas.
- **Verification not performed:** modo claro, Safari, Firefox, navegadores móveis, serviços, autenticação, persistência e áudio — todos fora do escopo confirmado; extensões reais do navegador não foram simuladas.
- **Verdict:** ready — ciclo de mecânica pronto para entrega do protótipo; decisões `Pendente`/`Fora do escopo` continuam registradas no GDD.
