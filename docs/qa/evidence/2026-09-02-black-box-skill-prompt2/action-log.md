# Log cronológico — descoberta D

- Total t0: `performance.now() = 22292.60000000894 ms`, parede `2026-09-02T22:22:18.318Z`, imediatamente antes da primeira ação jogável no título.
- Geometria observada: viewport CSS 960 × 760.
- D-C0: título estável; `Novo Jogo`, `Continuar` e `Opções` legíveis; `Continuar` não aberto.
- Entrada explícita: tentativa de teclado não confirmou; clique público no rótulo visível `Novo Jogo` confirmou.
- D-C1: mapa inicial correspondeu ao sinal contratado.
- Calibração: toque curto de seta não deslocou; 180 ms sustentados com `keyup` garantido deslocaram uma célula quando passável. A primeira captura após algumas ações saiu preta; recaptura após 400–500 ms recuperou imagem estável.
- Ações úteis extraídas: direita ×2; baixo ×4; esquerda ×1; baixo ×4; esquerda ×4; cima ×8.
- Exploração descartada da rota principal: colisão inicial à esquerda; extremidades esquerda e direita de um corredor intermediário; tentativas de clique no mapa sem deslocamento.
- Último marco: líder no corredor vertical da extrema esquerda, abaixo do corredor superior; NPC verde ainda visível acima.
- Encerramento da descoberta: fatia-alvo atingida antes da conclusão; teclas liberadas; nenhum crédito observado.

## D2 — dica pública e calibração

- Dica recebida após D1 fechada e preflight de r01; origem e conteúdo integral registrados no cartão r02.
- Reset público: URL recarregada; título reapareceu; clique explícito em `Novo Jogo`; sinal inicial restaurado.
- Dash calibrado: hold `Shift` + seta por 180 ms moveu aproximadamente duas células em corredor passável; 360 ms, quatro; 720 ms, oito; 270 ms, três. Cada direção foi liberada antes de `Shift`, em `finally`.
- Rota útil D2: direita 180; baixo 180 ×4; direita 360 ×2; esquerda 180; cima 360, 360, 180; direita 180; cima 360, 360, 180; esquerda 720, 270; `Enter` 180.
- `Enter` instantâneo não ativou; hold de 180 ms ativou a interação.
- D2-CF: créditos estáveis com `CRÉDITOS` e `Voltar ao título` legíveis.

## R1 oficial — r02

- Medição bruta: 11.573,9 ms (`performance.now()` 423151,9 → 434725,8).
- Auditoria: checkpoints inferior, intermediário e adjacência corresponderam; captura pretendida como CF ainda mostrou o mapa.
- Resultado: `FAIL`; R09 incompleto em r02. Nenhuma ação adicional enviada nessa tentativa.

## R2 oficial — r03

- Medição bruta: 12.766,6 ms (`performance.now()` 37920,8 → 50687,4).
- R01–R08 corresponderam; CF não apareceu. Tentativa `FAIL`.
- Calibração pós-falha: `ArrowLeft` sustentado 180 ms sem `Shift`, wait 300 ms, `Enter` sustentado 180 ms abriu créditos. A ausência de orientação explícita era a divergência pública reproduzível.

## R3 oficial — r04

- Medição bruta: 12.012,3 ms (`performance.now()` 273674,0 → 285686,3).
- R01–R09 corresponderam; screenshots inferior, intermediário, adjacência e créditos foram reabertas e inspecionadas.
- SLA: `PASS`, 2.987,7 ms abaixo do limite de 15.000 ms.
- Reset pós-conclusão: `Voltar ao título`, título legível, seleção explícita de `Novo Jogo`; mapa inicial restaurado e evidência reaberta.
