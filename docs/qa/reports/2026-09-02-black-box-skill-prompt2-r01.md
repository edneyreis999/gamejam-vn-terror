# Playtest RPG Maker MZ — 2026-09-02 — NPC 001 Fim de Jogo

- Rodada: `2026-09-02-black-box-skill-prompt2-r01`
- Build: fingerprint informado `119a360a80ccf09a6f94c46bee1a43af56f86e09`; não recalculado pelo executor
- Entrada: `http://127.0.0.1:4187/`; viewport CSS 960 × 760
- Estado inicial: mapa de corredores de pedra, líder castanho no corredor curto inferior e NPC verde no corredor superior
- Missão: interagir com o NPC e obter tela estável com `CRÉDITOS` e `Voltar ao título`
- Orçamento: 30 min; D1 encerrada na fatia-alvo de 10 min; escrita/preflight e D2 guiada/replays executados preservando fechamento
- Relógio total: `performance.now()` t0 22292,6 ms em `2026-09-02T22:22:18.318Z`; execução e fechamento concluídos dentro dos 30 min
- Persona: jogador novo, paciente, sistemático e sem conhecimento interno
- Cartão: `docs/qa/guides/routes/001-criar-guia-de-testes--prompt2.md`, revisão final r04, `VALIDADO`
- Derivado somente de observação pública: não; dica pública do coordenador foi recebida somente depois de D1 fechada
- SLA local: 15.000 ms, tolerância zero; replay final R3 = **12.012,3 ms**; margem realizada 2.987,7 ms

## Vereditos

- Jogo: **PASS** — D2 e R3 alcançaram créditos; R3 cumpriu SLA; retorno ao título e nova partida restauraram o sinal inicial.
- Ficha: **PASS** — entrada, estado, objetivo, sinais, reset, sensores e orçamento foram utilizáveis e corresponderam publicamente.
- Cartão: **PASS para r04** — r01 ficou incompleta; r02 e r03 falharam em R09; r04 reparada passou replay limpo.
- Guia principal: **FAIL** — o primeiro cartão completo produzido pelo fluxo (r02) não reproduziu CF; os reparos posteriores do cartão não restauram `PASS` ao guia nesta rodada.

## Tentativas

| Tentativa | Fonte | Resultado | Medição/observação |
|---|---|---|---|
| D1 | descoberta independente | encerrada incompleta | fatia-alvo atingida; r01 `RASCUNHO` |
| D2 | dica pública pós-D1 + calibração | CF observado | créditos legíveis; rota e dash calibrados |
| R1/r02 | cartão relido | FAIL | 11.573,9 ms; R01–R08 corretos, R09 não abriu créditos |
| R2/r03 | cartão reparado e relido | FAIL | 12.766,6 ms; R09 ainda não abriu créditos |
| R3/r04 | cartão reparado e relido | PASS | 12.012,3 ms; CF legível e dentro da SLA |

## Checkpoints do replay final

| Checkpoint | Expectativa | Observação | Evidência | Resultado |
|---|---|---|---|---|
| R3-C1 | estado inicial restaurado | mapa, líder e NPC corresponderam | `R3-C1-initial.png` | PASS |
| R3-CP-lower | corredor inferior | líder no corredor acima da grande parede | `R3-CP-lower.png` | PASS |
| R3-CP-intermediate | corredor intermediário | líder na passagem correspondente | `R3-CP-intermediate.png` | PASS |
| R3-CP-adjacent | líder junto ao NPC | NPC verde e líder adjacentes | `R3-CP-adjacent.png` | PASS |
| R3-CF | créditos estáveis | `CRÉDITOS` e `Voltar ao título` legíveis | `R3-CF-credits.png` | PASS |
| R3-CR | estado inicial após conclusão | título funcional; `Novo Jogo`; mapa inicial reapareceu | `R3-CR-title-final.png`, `R3-CR-initial-final.png` | PASS |

## Divergências, sensores e limites

- A causa pública dos dois replays falhos foi a orientação não materializada: adjacência visual não garantiu que o líder estivesse voltado ao NPC. Uma entrada `ArrowLeft` sem `Shift` antes de `Enter` tornou a interação reproduzível.
- Algumas primeiras capturas após ações/transições saíram pretas; recapturas estáveis recuperaram o sensor. Capturas pretas foram preservadas e nunca usadas como prova positiva.
- Console secundário: resumos do controlador indicaram 0 erros e 1–2 warnings; conteúdo dos warnings não foi inspecionado. Ausência de erro não foi usada como prova.
- Áudio, estado interno, saves, código, dados, eventos, mapas JSON, plugins e persistência oculta: não verificados.
- Fingerprint: aceito da ficha; não recalculado por isolamento.

## Classificação de reparos

- Agente invocador (ficha/coordenação): nenhum reparo obrigatório; a dica foi entregue no momento permitido e com proveniência pública.
- Agente testador (skill/guia de execução): reparo mínimo e genérico — antes do primeiro replay, exigir que interações direcionais materializem uma ação pública explícita de orientação e a sequência exata que produziu o gatilho; adjacência visual sozinha não satisfaz a pré-condição “voltado”.

## Teardown

- Aba/contexto do navegador criado pela rodada: fechado.
- Servidor preexistente: não encerrado, conforme ficha.
- Processos iniciados pelo executor: nenhum.
