# QA Run Report — 2026-08-31 — dungeon-route-selection

- **Scope:** seleção da ordem dos dois caminhos iniciais, troca após recuo, fechamento de rota, portão final, contrato QA v2 e canários adjacentes
- **Cadence tier:** targeted
- **Build:** `4668b73` · **Environment:** Chrome desktop estável, `file://`, rede desligada, sem servidor; driver `agent-browser` porque `browser-use:browser` não está disponível neste ambiente
- **Started:** 2026-08-31T18:16:10Z · **Closed:** 2026-08-31T18:46:40Z · **Status:** closed — pass

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
- **Evidence:** `../evidence/2026-08-31-dungeon-route-selection/CH-route-order-and-gate-missing-route.png`; `CH-route-order-and-gate-after-retreat.png`; `CH-route-order-and-gate-revisit-first-landmark.png`; `CH-route-order-and-gate-devlog-1-of-2.png`; `CH-route-order-and-gate-final-unlocked.png`; `CH-route-order-and-gate-order-a-victory.png`; `CH-route-order-and-gate-order-b-1-of-2.png`; `CH-route-order-and-gate-order-b-victory.png`; `CH-route-order-and-gate-fresh-reset.png`.
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
- **Evidence:** `../evidence/2026-08-31-dungeon-route-selection/CH-keyboard-zoom-motion-formation-320-effective.png`; `CH-keyboard-zoom-motion-victory.png`.
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
- **Steps observed:** seeds `0` e `4294967295` foram aceitas; `-1` retornou `invalid_seed`; reseed depois de iniciar retornou `campaign_already_started`. Partida sem caminho manteve histórico em 5 eventos, focou `#campaign-error` e publicou `DEPART/destination_required`; selecionar Vozes acrescentou um evento e limpou a rejeição.
- **Reproduction:** duas sessões com seed `20260830`, Vozes e H1/H2/H3 produziram B6 na posição 1 e histórico integral byte a byte igual. O snapshot estava profundamente congelado/destacado; tentativa de mutação não alterou leitura posterior. `validate()` foi não mutante e retornou zero violações. O objeto global expôs exatamente três métodos.
- **Evidence:** `../evidence/2026-08-31-dungeon-route-selection/CH-seeded-diagnostics-reproduction-rejection.png`; `CH-seeded-diagnostics-reproduction-seed-20260830.png`.
- **Findings / bugs:** nenhum.
- **Scenarios settled:** ACC-accessibility-diagnostics e CAM-dungeon-progression-outcomes → pass.
- **Paper cuts:** nenhum.
- **Suggested next charter:** CH-complete-outcomes-canary.

### CH-complete-outcomes-canary — Lia, primeira expedicionária

- **Ran:** 2026-08-31T18:37:00Z → 2026-08-31T18:41:00Z (box respected: yes)
- **Driver / entry:** `agent-browser`, duas sessões frescas por `file:///…/prototype/index.html`; todas as transições acionadas por controles visíveis, sem dispatch.
- **Steps observed:** a sessão de vitória terminou em `5/5/6`, oito epílogos e zero mortos. A sessão de derrota, iniciada com seed `23`, sacrificou legalmente H4, H7, H8, H1, H2, H3, H5 e H6; o terminal informou: “Os oito heróis morreram. Sem ninguém para conduzir de volta, o bardo também morre.”
- **True ends:** **Iniciar nova campanha** após cada terminal retornou a `ready`, seed nula, zero partes e elenco íntegro.
- **Evidence:** `../evidence/2026-08-31-dungeon-route-selection/CH-complete-outcomes-canary-victory.png`; `CH-complete-outcomes-canary-defeat.png`.
- **Findings / bugs:** nenhum; ambos os terminais passaram em `validate()`.
- **Scenarios settled:** CAM-dungeon-progression-outcomes e ENC-encounter-consequences → pass.
- **Paper cuts:** nenhum.
- **Suggested next charter:** CH-sixteen-image-devlog-review.

### CH-sixteen-image-devlog-review — Rui, revisor de conteúdo

- **Ran:** 2026-08-31T18:38:00Z → 2026-08-31T18:45:00Z (box respected: yes)
- **Driver / entry:** inspeção direta dos 16 JPEGs locais e campanha real com `agent-browser` por `file:///…/prototype/index.html`, primeiro em 1440×900 e depois em 320×800.
- **Inventory:** A1–A8 e B1–B8 foram inspecionados em quadro completo e atravessados uma vez cada na UI estreita. Cada arquivo carregou em 1600×900, `object-fit: cover`, três abordagens e sem overflow. Nenhuma imagem contém texto embutido, rótulo de competência ou pista mecânica; a cópia visível continua marcada como provisória onde o GDD assim exige.
- **Devlog sequence:** seed `23` com H4/H7/H8 revelou A1 em `0/3`; a abordagem produziu falha letal; selecionar H4 abriu confirmação, cancelar devolveu foco ao card H4, e confirmar moveu H4 para **Mortos** com H7/H8 ainda na expedição.
- **Evidence:** `../evidence/2026-08-31-dungeon-route-selection/CH-sixteen-image-devlog-review-narrow-encounter.png`; `CH-sixteen-image-devlog-review-seed23-approaches.png`; `CH-sixteen-image-devlog-review-seed23-failure.png`; `CH-sixteen-image-devlog-review-seed23-confirmation.png`; `CH-sixteen-image-devlog-review-seed23-roster.png`.
- **Findings / bugs:** nenhum; não foi inferido canon novo a partir das ilustrações.
- **Scenarios settled:** ART-encounter-art-content e ENC-encounter-consequences → pass.
- **Paper cuts:** nenhum.
- **Suggested next charter:** nenhum; matriz planejada concluída.

## Edge Probes Attempted

- partida vazia e heróis antes da rota; mudanças rápidas entre rádios; abertura/fechamento de elenco com Escape; cancelamento e repetição da confirmação de sacrifício;
- reload durante encontro; todos os JPEGs bloqueados com rede offline; viewport minúsculo com zoom 200%; modo escuro e movimento reduzido;
- seeds mínima/máxima, seed inválida, reseed tardio e tentativa de mutar snapshot; todos apresentaram recuperação ou rejeição coerente.

## Experiential Lens Pass

| Journey | Usability | Accessibility | Perceived performance | Compatibility | Error recoverability | Production parity |
|---|---|---|---|---|---|---|
| J-complete-campaign | Pass — estados e nomes diegéticos visíveis | Pass — teclado, foco, zoom e Axe 0 | Pass — respostas imediatas, sem espera ou layout shift observado | Pass no contrato Chrome-only em 1440 e 320 efetivos, claro/escuro e reduced motion | Pass — erro de rota preserva formação; cancelamentos e reload têm resultado explícito | Pass qualificado — mesmo HTML/CSS/JS local entregue; sem servidor, auth ou storage por desenho |
| J-local-offline-launch | Pass — entrada e fallback mantêm a tarefa clara | Pass — conteúdo essencial independe de imagem/áudio | Pass — carga local e ações imediatas offline | Pass no Chrome suportado e viewport estreito | Pass — imagem ausente degrada, reload inicia sessão limpa | Pass qualificado — rede e 16 imagens bloqueadas; extensões de navegador não foram simuladas |

Safari, Firefox, navegadores móveis, autenticação, backend, extensões, persistência, áudio e serviços externos não foram verificados porque estão fora do contrato confirmado deste protótipo.

## What Was Fixed

Nenhuma correção foi necessária nesta execução.

## Paper Cuts

| Persona | Where (journey/step) | Felt | Sharpness | Outcome |
|---|---|---|---|---|

## Runtime Errors Observed

- CH-route-tests-entry-canary: nenhum erro de página. O console contém avisos esperados das fixtures que exercitam rejeições, imagem e diálogo opcionais; nenhum escapou como falha do runner.
- Demais charters: nenhum erro de página. As rejeições controladas produziram somente os avisos estruturados previstos pelo contrato.

## Human Verifications Needed

Nenhuma prevista; o protótipo não possui pagamento, email, SMS, OAuth ou serviço externo.

## Decisions for a Human

Nenhuma.

## Learnings

- O cartão estático de rota concluída e o rádio único derivado reduzem ambiguidade sem criar uma quarta mecânica de navegação.
- A mesma degradação textual cobre rede offline, JPEG bloqueado e independência de áudio; não foi necessário inventar um fallback remoto.
- O checkpoint mais demonstrável para o devlog continua sendo `1 de 2`: uma rota concluída estática, a outra selecionada e Legado bloqueado.

## Final Status

- **Exit gate (full automated suite):** Pass — título `PASS — 351/351 testes`; `window.__expeditionTestResults = {total: 351, passed: 351, failed: 0}`; zero linhas FAIL. Evidência: `../evidence/2026-08-31-dungeon-route-selection/CH-route-tests-entry-canary-final-351-pass.png`.
- **Issues by user impact:** 0 Blocks-Completion, 0 Data-Loss, 0 Trust-Damage, 0 Friction, 0 Polish.
- **Coverage:** 18/18 linhas Pass, 7/7 charters executados, 6/6 cenários reconciliados, 4/4 jornadas observadas.
- **Verification not performed:** Safari, Firefox, navegadores móveis, serviços, autenticação, persistência e áudio — todos fora do escopo confirmado; extensões reais do navegador não foram simuladas.
- **Verdict:** Pass — ciclo pronto para entrega do protótipo, sem decisão humana pendente.
