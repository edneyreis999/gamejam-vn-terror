# Playtest RPG Maker MZ — 2026-09-02 — reteste prompt2

- Rodada: R4/r05, reteste caixa-preta visível
- Build e origem: fingerprint Git tree informado `119a360a80ccf09a6f94c46bee1a43af56f86e09`; não recalculado pelo executor
- Entrada pública: `http://127.0.0.1:4187/`
- Browser/geometria: Playwright MCP em navegador real; viewport CSS 960×760
- Estado inicial: `Novo Jogo` selecionado explicitamente; mapa de corredores estável, líder castanho no corredor curto inferior e NPC verde no corredor superior
- Missão: interagir com `NPC 001 Fim de Jogo`; CF exige `CRÉDITOS` e `Voltar ao título` legíveis
- Orçamento total: 10 min; execução fechada dentro do orçamento. Fatias contratadas: leitura/lint/preflight 3 min; replay 2 min; reset/auditoria 3 min; relatório/teardown 2 min
- Cartão: `docs/qa/guides/routes/001-criar-guia-de-testes--prompt2.md`, revisão r05; rota executada r04, preservada sem alteração
- Manifesto: `docs/qa/evidence/2026-09-02-black-box-skill-prompt2-retest/manifesto-r05.md`
- Preflight: limite inferior 5.130 ms; soma nominal 12.054 ms; margem 1.500 ms; orçamento previsto 13.554 ms; replay autorizado
- Replay local: SLA 15.000 ms, tolerância zero, origem usuário; duração bruta **12.042,8 ms — PASS**

## Regra em reteste

O guia agora exige que, quando uma interação depende de orientação, a entrada pública que a produz seja materializada imediatamente antes da confirmação. R09 cumpre: `ArrowLeft` sem `Shift` por 180 ms, liberação, espera de 300 ms e então `Enter` por 180 ms. O manifesto executou essa ordem sem entrada intermediária.

## Checkpoints

| Checkpoint | Expectativa | Observação | Inferência | Evidência | Resultado |
|---|---|---|---|---|---|
| R4-C0 | Título público estável | Título `terror-vn` e comandos legíveis | Entrada pública válida | `R4-C0-title.png` | PASS |
| R4-C1 | Estado inicial contratado | Líder castanho no corredor curto inferior; NPC verde no superior | Novo Jogo entrou no cenário correto | `R4-C1-initial.png` | PASS |
| R4-C2 | Extremidade direita do corredor inferior | Grupo estável junto à parede direita | R01–R03 corresponderam | `R4-C2-lower-right.png` | PASS |
| R4-C3 | Corredor intermediário | Grupo alinhado na passagem vertical; NPC ainda visível | R04–R05 corresponderam | `R4-C3-middle.png` | PASS |
| R4-C4 | Fileira superior | Grupo alcançou a passagem junto à fileira do NPC | R06–R07 corresponderam | `R4-C4-upper-row.png` | PASS |
| R4-CF | Créditos estáveis e legíveis | `CRÉDITOS`, equipe e `Voltar ao título` legíveis | R08–R09 concluíram a missão | `R4-CF-credits.png` | PASS |
| R4-C5 | Retorno público ao título | Título e comandos reapareceram | Saída pública funcional | `R4-C5-returned-title.png` | PASS |
| R4-CR | Mesmo estado inicial após Novo Jogo | Mesma composição inicial contratada | Reset público concluído | `R4-CR-reset-initial.png` | PASS |

## Cronometria e auditoria

- Instrumento: `performance.now()` do navegador; início imediatamente antes da primeira entrada direcional R01; fim após a captura do primeiro quadro estável auditado de créditos.
- Marcos: C2 3.815,8 ms; C3 6.169,3 ms; C4 8.523,0 ms; orientação R09 10.132,8–10.317,1 ms; confirmação 10.619,6–10.804,0 ms; CF 12.042,8 ms.
- Créditos mantidos visíveis por mais 3.000 ms após parar o relógio, pausa explicitamente pós-SLA.
- Evidências C0, C1, C2, C3, C4, CF, C5 e CR foram reabertas e inspecionadas visualmente; o conteúdo correspondeu aos nomes/intenção.
- O primeiro script de medição falhou antes de criar o relógio e antes de enviar qualquer entrada (`performance` indisponível no processo controlador). Portanto, não constituiu tentativa nem alterou o estado. O replay oficial subsequente foi único.
- No título, entradas pré-SLA para estabelecer seleção/foco exigiram nova observação; o estado jogável só foi aceito após confirmação sustentada de `Novo Jogo`. Isso não alterou a medição nem o replay.

## Quatro vereditos

- **Jogo: PASS.** A rota pública concluiu em créditos e o ciclo de retorno ao título/Novo Jogo restaurou o sinal inicial.
- **Ficha: PASS.** Entrada, sinais, orçamento, SLA e resets foram suficientes e corresponderam à superfície observada.
- **Cartão: PASS.** A rota r04 foi executável sem dica ao vivo e cumpriu a SLA; r05 registra apenas este reteste.
- **Guia principal: PASS deste reteste de execução/regra carregada.** A nova regra foi encontrada, aplicada no lint e confirmada no replay. **O aceite completo da autoria ainda não foi refeito**, pois o cartão nasceu antes da revisão e este reteste não repetiu descoberta/autoria independente.

## Limites e teardown

- Áudio: fora do escopo.
- Não verificado: implementação interna, saves/estado oculto, NW.js, locale do navegador, DPR/zoom/resolução interna do Canvas e aceite completo da autoria do cartão sob a revisão atual do guia.
- Console secundário: 0 erros e 2 avisos indicados pelo sensor; conteúdo dos avisos não foi usado como evidência funcional.
- Bugs públicos: nenhum observado nesta rodada.
- Servidor: preexistente e preservado; não iniciado nem encerrado pelo executor.
- Browser: somente a aba criada para esta rodada foi fechada; a aba preexistente `about:blank` foi preservada.
