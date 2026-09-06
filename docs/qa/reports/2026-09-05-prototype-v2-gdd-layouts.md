# QA Run Report — 2026-09-05 — prototype-v2-gdd-layouts

- **Scope:** campanha V2 integrada ao protótipo local, incluindo preparação, perda, ambas as ordens de rotas, três terminais, acessibilidade desktop, fronteira pública de QA, pacote offline e manifesto do runner
- **Cadence tier:** full para campanha P0/P1; targeted para entradas locais adjacentes
- **Build:** `83ab815fabe090f2abedaf98e1f52d861f0cf47b` com alterações da spec ainda no worktree · **Environment:** Chrome desktop por `file://`, recursos locais, sem build
- **Started:** 2026-09-05T20:39:41-03:00 · **Status:** completed-with-human-verifications-blocked
- **Driver:** `agent-browser` sobre Chrome local; `browser-use:browser` não está exposto nesta sessão

## Personas

| Persona | Base | Device / Network / Locale | Sessions |
|---|---|---|---|
| Caio, estrategista recorrente | seeds registradas por sessão | desktop / wifi-fast / pt-BR | terminal matrix, public contract, browser manifest |
| Lia, primeira expedicionária | seed registrada por sessão | laptop / wifi-fast / pt-BR | first-return loss |
| Joana, jogadora ampliada | seed registrada por sessão | laptop / wifi-fast / pt-BR | keyboard desktop; VoiceOver humano pendente |
| Rui, revisor de conteúdo | seed registrada por sessão | desktop / flaky / pt-BR | offline canary; revisão humana pendente |

## Flows in Scope

- `J-complete-campaign` — concluir a campanha e seus estados de perda (`../journeys/J-complete-campaign.md`)
- `J-local-offline-launch` — abrir o pacote local, operar sem rede e abandonar por reload (`../journeys/J-local-offline-launch.md`)
- `J-reproduce-campaign` — repetir receitas legais e observar o contrato público (`../journeys/J-reproduce-campaign.md`)
- `J-run-browser-contract` — executar e auditar o manifesto local (`../journeys/J-run-browser-contract.md`)

## Session Matrix & Results

| # | Charter | Journey / Scenario | Persona | Tour | Status | Issue | Fix commit |
|---|---|---|---|---|---|---|---|
| 1 | CH-v3-campaign-terminal-matrix | J-complete-campaign / CAM, ENC, FOR | Caio | Feature Tour | Pass | | |
| 2 | CH-v3-first-return-loss | J-complete-campaign / ENC, FOR, CAM | Lia | Interrupt Tour | Pass | | |
| 3 | CH-v3-keyboard-desktop | J-complete-campaign / ACC, FOR, ENC, CAM | Joana | Feature Tour | Pass | | |
| 4 | CH-v3-human-voiceover | J-complete-campaign / ACC, FOR, ENC, CAM | Joana + pessoa operadora | Feature Tour | Blocked (needs human verify) | | |
| 5 | CH-v3-human-editorial-art | J-complete-campaign / ART, ENC, CAM | Rui + pessoa revisora | Locale Tour | Blocked (needs human verify) | | |
| 6 | CH-v3-seeded-public-contract | J-reproduce-campaign / ACC, CAM, FOR, ENC | Caio | Garbage Tour | Pass | | |
| 7 | CH-v3-offline-local-canary | J-local-offline-launch / LOC, ART | Rui | Network Tour | Pass | | |
| 8 | CH-v3-browser-manifest-canary | J-run-browser-contract / LOC, ACC | Caio | Feature Tour | Pass | | |

Status legend: `Pending | Pass | Fixed | Skipped | Blocked (needs human verify) | Blocked (human decision)`

## Preflight Implementation Evidence

Evidence produced before this real-user QA run remains implementation context, not a session verdict. It reports a prior 168/168 browser run, 252/252 visual-contract validation and a seed `20260831` devlog recipe:

- `.compozy/tasks/prototype-v2-gdd-layouts/execution/supervisor-runtime-check-2026-09-05.json`
- `.compozy/tasks/prototype-v2-gdd-layouts/execution/final-relocated-browser-tests-2026-09-05.json`
- `.compozy/tasks/prototype-v2-gdd-layouts/execution/final-visual-capture-2026-09-05.json`
- `.compozy/tasks/prototype-v2-gdd-layouts/execution/final-visual-validation-2026-09-05.json`
- `.compozy/tasks/prototype-v2-gdd-layouts/execution/visual-semantic-probes-2026-09-05.json`
- `.compozy/tasks/prototype-v2-gdd-layouts/evidence/devlog/devlog-journey.json`

## Session Debriefs

- **Campanha e terminais — Pass.** Sessões frescas cobriram Igreja→Parque com reunião e perda total, Parque→Igreja com destruição sem mortes, e Igreja→Parque com destruição após H4/H7/H8 morrerem. Receitas estáticas foram executadas por controles públicos; o replay reverso usou clique nativo e foco programático + Espaço apenas nos heróis, classificado como escopo misto. O suplemento do supervisor prova separadamente 106 ações por Tab/setas/Enter/Espaço com oito vivos, zoom nativo 125% e reunião. Evidência: `../evidence/2026-09-05-prototype-v2-gdd-layouts/native-final-total-loss.json`, `native-reverse-destroy.json`, `native-destroy-with-deaths.json` e `../evidence/prototype-v2-gdd-layouts/supervisor-keyboard-zoom/summary.json`.
- **Perda e reservas — Pass.** Um percurso de ponteiro mostrou aviso irreversível, morte imediata, fade ordinário de um segundo e retorno limpo. Replays nativos terminaram na formação automática com H5 sozinho e com H2/H7; o replay de perda total também registrou a formação automática com H6/H7/H8. A sobreposição da ficha foi alcançável ao mover o ponteiro para fora e voltar ao retrato, sem ocultar DOM. Evidência: `../evidence/2026-09-05-prototype-v2-gdd-layouts/CH-v3-first-return-loss-warning.png`, `CH-v3-first-return-loss-fade-start.png`, `CH-v3-first-return-loss-fade-mid.png`, `CH-v3-first-return-loss-empty.png`, `native-automatic-reserve-one.json`, `native-automatic-reserve-two.json` e `pointer-overlap-probe.json`.
- **Teclado, zoom e movimento reduzido — Pass.** Probes limpos em 1280×720 e 1920×1080 usaram Tab, Shift+Tab, setas, Enter, Espaço e Escape nativos até a primeira escolha; o suplemento de zoom percorreu 106 ações até reunião com oito vivos em zoom nativo 125%, área efetiva 1536×864 e DPR 1,25. Um suplemento final em 1280×720 focou H1 sem morte, matou apenas H1 no primeiro Enter, não atravessou a despedida com tecla mantida, cancelou e confirmou recuo por teclado e observou o lugar vazio 3,9 ms após o retorno com movimento reduzido, sem cartão H1, `.is-fading` ou animação ativa. Evidência: `../evidence/2026-09-05-prototype-v2-gdd-layouts/keyboard-size-probes.json`, `../evidence/prototype-v2-gdd-layouts/supervisor-keyboard-zoom/summary.json` e `../evidence/prototype-v2-gdd-layouts/supervisor-final-supplements/summary.json`.
- **Contrato seeded — Pass.** Seeds 0 e 4294967295 foram aceitas somente antes de Jogar; valores -1 e texto foram rejeitados; tentativa tardia retornou `campaign_already_started`. Snapshot e validate vieram congelados e novas leituras permaneceram intactas; reload voltou a ready com seed nula, oito vivos e sequência zero. Duas campanhas frescas com seed 20260831 e o mesmo prefixo de controles públicos produziram igualdade exata dos 28 campos V3 na ação aceita 19. Texto já concluído ofereceu pulo que parou antes das decisões; um resultado alternativo inédito não ofereceu pulo; reload literal limpou a memória de leitura. Evidência: `../evidence/2026-09-05-prototype-v2-gdd-layouts/seeded-public-contract.json`, `../evidence/prototype-v2-gdd-layouts/supervisor-final-supplements/seed-repeatability-prefix.json`, `seen-text-boundaries.json` e `seen-text-revisit.json`.
- **Pacote local — Pass.** Cópia relocada em rede offline chegou à primeira abordagem com JPEGs locais removidos e fallback textual; reload limpou a sessão. Outra cópia descartável sem `prologue.01` mostrou tela fatal, ação Recarregar e `missing_narrative_content`. Nenhum recurso HTTP(S) foi observado. Evidência: `../evidence/2026-09-05-prototype-v2-gdd-layouts/offline-local-canary.json`.
- **Runner local — Pass.** Uma execução fresca do pacote original registrou 168/168 casos aprovados, 158 IDs V2, 10 BASE, 168 IDs únicos e zero erro de console. Em cópias descartáveis, remoção de `V2/E2E-001`, duplicação do mesmo ID e ausência de `journeys.test.js` falharam com mensagens atribuíveis; fechar imediatamente e reabrir em sessão isolada reiniciou o runner. Evidência: `../evidence/2026-09-05-prototype-v2-gdd-layouts/final-browser-suite.json` e `browser-manifest-canaries.json`.
- **Pares visuais — Pass funcional.** O validador canônico do skill recalculou 252/252 pares atuais sem divergência bloqueante. A sequência demonstrável preparação → aviso de sacrifício → morte → fade → lugar vazio foi preservada. Evidência: `../evidence/2026-09-05-prototype-v2-gdd-layouts/final-visual-validation.json` e as capturas `CH-v3-first-return-loss-*.png`.
- **Dois re-walks experienciais — Pass no escopo aprovado.** Duas jornadas novas aplicaram Usability, Accessibility, Perceived performance, Compatibility, Error recoverability e Production parity durante o percurso. `J-complete-campaign` percorreu 117 ações de ponteiro, exercitou recuo/escape com retorno de foco e terminou em destruição com H4/H7/H8 mortos. `J-reproduce-campaign` repetiu 19 ações públicas em duas sessões frescas, obteve snapshots V3 idênticos e confirmou reload limpo. Evidência aceita: `../evidence/2026-09-05-prototype-v2-gdd-layouts/experiential-lens-rewalks.json`. O arquivo `six-lens-rewalks.json` foi preservado somente como reconciliação histórica por áreas de cenário e está explicitamente marcado como não aceito para este gate.
- **VoiceOver humano — Blocked (needs human verify).** Nenhuma pessoa operou VoiceOver nesta execução; automação de teclado não substitui esse veredito.
- **Editorial, cultura e arte final — Blocked (needs human verify).** A suficiência funcional do fallback de imagem passou, mas prosa, sensibilidade cultural e aceitação de arte final exigem revisão humana.

## Experiential Lens Re-walks

| Journey | Lens | Verdict | Observation during the walk |
|---|---|---|---|
| J-complete-campaign | Usability | Pass | Rótulos visíveis sustentaram preparação, rotas, sacrifício, Conselho e terminal; o recuo apresentou Cancelar e Confirmar recuo. |
| J-complete-campaign | Accessibility | Pass | Tab nativo alcançou controle nomeado, Escape cancelou o recuo e devolveu foco a Recuar; sem overflow em 1280×720. |
| J-complete-campaign | Perceived performance | Pass | Os 117 comandos de clique completaram em mediana de 51,1 ms e máximo de 76,3 ms, incluindo a latência do driver; a progressão foi conferida nos checkpoints. |
| J-complete-campaign | Compatibility | Pass | Chrome desktop, `file://`, 1280×720 e offline completaram a campanha sem recurso HTTP(S). |
| J-complete-campaign | Error recoverability | Pass | O cancelamento real preservou rota e validade; a jornada continuou até destruição. |
| J-complete-campaign | Production parity | Pass | O artefato local do repositório rodou diretamente, sem build, servidor, rede, storage ou mutação de runtime. |
| J-reproduce-campaign | Usability | Pass | Os mesmos controles visíveis conduziram dois prefixos frescos de 19 ações; o diagnóstico permaneceu apenas setup/leitura. |
| J-reproduce-campaign | Accessibility | Pass | Estados reproduzidos mantiveram headings, nomes de botões e ausência de overflow em 1920×1080. |
| J-reproduce-campaign | Perceived performance | Pass | Nas duas execuções, os comandos tiveram mediana de 51,3 ms e máximo de 58,9 ms, incluindo o driver; reload retornou à abertura sem estado parcial. |
| J-reproduce-campaign | Compatibility | Pass | Duas sessões Chrome desktop distintas operaram por `file://`, offline e sem recursos HTTP(S). |
| J-reproduce-campaign | Error recoverability | Pass | Seeds inválidas foram rejeitadas sem iniciar campanha; reload limpou seed, histórico e sequência. |
| J-reproduce-campaign | Production parity | Pass | As duas execuções usaram os mesmos arquivos e controles públicos; snapshots V3 completos coincidiram na ação 19. |

O limite de Compatibility e Production parity é o contrato aprovado do protótipo: Chrome desktop nos tamanhos efetivos, execução local offline e sem build. Mobile, outros navegadores, extensões e servidor não fazem parte deste gate. VoiceOver e julgamento editorial, cultural e de arte final permanecem verificações humanas separadas.

## What Was Fixed

Nenhum código de produto foi alterado nesta execução. Os dois helpers de teclado foram corrigidos para respeitar o `tabindex` roving e evitar alternar H1 duas vezes; a descrição do driver misto foi corrigida para distinguir foco programático de teclado nativo.

## Paper Cuts

Nenhuma fricção de produto foi confirmada. O retrato coberto pela ficha continuou alcançável por um caminho natural do ponteiro até um ponto visível; o centro geométrico não foi tratado como requisito.

## Runtime Errors Observed

Nenhum erro de runtime do produto permaneceu. Falhas preliminares dos helpers e seus transcritos foram preservados em `keyboard-size-probes-failed*.json`, `native-reverse-destroy-failure.json` e `native-automatic-reserve-one-failure.json`; os replays limpos posteriores passaram. Duas tentativas do suplemento final também acionaram corretamente a guarda de 350 ms ao reabrir Recuar cedo demais e foram excluídas da aceitação; o replay deliberadamente espaçado passou. O contador antigo baseado em seletor inexistente também foi excluído e substituído por `reduced-motion-exact-dom.json`.

## Human Verifications Needed

- Uma pessoa usuária deve percorrer o charter VoiceOver e registrar nomes anunciados, ordem, mudanças dinâmicas, diálogos e retorno de foco.
- Uma pessoa revisora deve aprovar PT-BR, sensibilidade cultural, tratamento de Ivaí/Andirá, Conselho, três epílogos e arte final. Os assets atuais continuam baseline provisória.

## Decisions for a Human

Nenhuma decisão de produto foi aberta por esta execução.

## Learnings

- Foco programático + Espaço atravessa o handler de teclado, mas não prova alcançabilidade; somente Tab/setas nativos sustentaram esse veredito.
- Sobreposições devem ser testadas por um ponto visível alcançável e `elementFromPoint`, não por clique sintético no centro do elemento.
- O manifesto deve ser testado também por canários negativos em cópias; um total verde isolado não prova a atribuição dos registros.

## Final Status

Os charters, canários e gates funcionais estão concluídos. Os dois re-walks reais aplicaram as seis lentes experienciais durante `J-complete-campaign` e `J-reproduce-campaign`, sem falha ou fricção confirmada no escopo aprovado de Chrome desktop por `file://`. VoiceOver e revisão editorial, cultural e de arte final permanecem `Blocked (needs human verify)` e não reduzem os veredictos funcionais automatizados.
