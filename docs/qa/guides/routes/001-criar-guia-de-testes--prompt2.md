# Cartão de rota local — 119a360a80ccf09a6f94c46bee1a43af56f86e09 — corredores de pedra

- Status: VALIDADO
- Autor e data: executor caixa-preta `/root/black_box_tester`, 2026-09-02
- Build e origem: fingerprint Git tree informado pelo preparador `119a360a80ccf09a6f94c46bee1a43af56f86e09`; não recalculado pelo executor
- Entrada pública: `http://127.0.0.1:4187/`
- Derivado somente de observação pública: não
- Estado inicial e sinal visível: após selecionar explicitamente `Novo Jogo`, mapa de corredores de pedra estável; líder castanho no corredor curto inferior; NPC verde visível no corredor superior
- Destino e sinal visível de conclusão: interação pública com o alvo fornecido como `NPC 001 Fim de Jogo`; tela estável com `CRÉDITOS` e `Voltar ao título` legíveis
- Procedimento público de reinício após conclusão e sinal de restauração: em `Voltar ao título`, confirmar; no título, selecionar explicitamente `Novo Jogo`; aceitar somente com o mesmo sinal inicial
- Procedimento público de reinício após abortagem e sinal de restauração: recarregar a URL, aguardar o título, selecionar explicitamente `Novo Jogo`; aceitar somente com o mesmo sinal inicial
- Controles e durações efetivamente observados: clique visível em `Novo Jogo`; setas sustentadas por 180 ms com `keyup` garantido e estabilização de 300–500 ms; toque curto de seta não produziu deslocamento observável; clique no mapa não produziu deslocamento observável
- Validade e condições de expiração: somente para a entrada e fingerprint acima enquanto os sinais públicos não divergirem
- Revisão do cartão e revisão anterior: r05; r04 (`PASS` no replay R3)
- Resultado da descoberta: D1 pública independente incompleta; D2 concluiu o objetivo com dica pública do coordenador e calibração pública do executor

## Proveniência da dica

- Origem: coordenador `/root`, baseada em observação pública de playtest anterior deste build.
- Momento: entregue após D1 ser encerrada, r01 ser escrita/reaberta e o primeiro preflight proibir replay.
- Resultado anterior: D1 não alcançou CF na fatia-alvo; r01 ficou incompleta.
- Conteúdo recebido: seguir à direita e descer aos corredores inferiores; no corredor inferior seguir à direita até a parede, recuar para alinhar a passagem vertical, subir; alinhar outra passagem à direita, subir à fileira do NPC verde, seguir à esquerda, ficar adjacente/voltado e confirmar.
- Conhecimento interno: nenhum fornecido ou consultado.

## Rota completa calibrada em D2

Em todo hold: pressionar `Shift`, pressionar a seta, aguardar a duração; em `finally`, liberar primeiro a seta e depois `Shift`; aguardar 300 ms antes da próxima ação. Para `Enter`, sustentar 180 ms, liberar em `finally` e aguardar a tela final estabilizar.

| Passo | Pré-condição ou marco visível | Ação materializada | Sinal observável de saída ou parada | Recuperação segura |
|---|---|---|---|---|
| R01 | Estado inicial contratado estável | hold `Shift` + `ArrowRight` 180 ms | Líder na extremidade direita do corredor curto | Abortar pelo reset público se o líder não deslocar até a extremidade |
| R02 | Extremidade direita, passagem para baixo visível | repetir 4 vezes: hold `Shift` + `ArrowDown` 180 ms | Corredor inferior largo acima da grande parede inferior | Abortar se um grupo colidir antes do corredor inferior |
| R03 | Corredor inferior largo | repetir 2 vezes: hold `Shift` + `ArrowRight` 360 ms | Parede direita alcançada | Abortar se a composição não mostrar a extremidade direita |
| R04 | Parede direita do corredor inferior | hold `Shift` + `ArrowLeft` 180 ms | Líder alinhado à passagem vertical acima | Abortar se a passagem não ficar alinhada |
| R05 | Passagem vertical alinhada | holds `Shift` + `ArrowUp`: 360 ms, 360 ms, 180 ms | Líder no corredor intermediário horizontal | Abortar se o corredor intermediário não aparecer |
| R06 | Corredor intermediário | hold `Shift` + `ArrowRight` 180 ms | Líder alinhado à próxima passagem vertical | Abortar se a passagem não ficar alinhada |
| R07 | Segunda passagem vertical alinhada | holds `Shift` + `ArrowUp`: 360 ms, 360 ms, 180 ms | Líder na fileira superior do NPC verde | Abortar se a fileira superior não aparecer |
| R08 | Fileira do NPC verde | holds `Shift` + `ArrowLeft`: 720 ms, depois 270 ms | Líder imediatamente à direita do NPC, voltado para ele | Abortar se NPC e líder não estiverem adjacentes e legíveis |
| R09 | Líder adjacente ao NPC verde | hold `ArrowLeft` 180 ms sem `Shift`; liberar; aguardar 300 ms; hold `Enter` 180 ms; liberar; aguardar até 1.200 ms | Líder fica inequivocamente voltado ao NPC; depois surge tela estável com `CRÉDITOS` e `Voltar ao título` legíveis | Se não houver transição, abortar pelo reset público; não repetir dentro da medição |

## SLA local — preflight r04

- Contrato: 15.000 ms, tolerância zero, origem usuário.
- Início: imediatamente antes da primeira entrada direcional no mapa inicial estável do replay oficial.
- Fim: primeiro quadro estável em que os créditos acionados pela interação pública com o NPC estejam visíveis e legíveis.
- Inclusões: movimento, interação, liberações, waits/transições e sensores necessários no intervalo.
- Exclusões: boot, título/`Novo Jogo`, preflight, escrita/auditoria, reset posterior e teardown.
- Limite inferior: 5.130 ms de holds materializados, liberações e o primeiro frame estável de créditos.
- Soma nominal: medição R1 de 11.574 ms + 480 ms para a orientação explícita (`ArrowLeft` 180 + wait 300) = 12.054 ms.
- Margem: 1.500 ms para variação de renderização, captura e agendamento.
- Orçamento previsto: 13.554 ms.
- Decisão: previsto < 15.000 ms; replay oficial autorizado após reset público e manifesto novo.

## Lint semântico após reabertura

- Revisão relida do destino durável: r04.
- R01–R09: ações, pré-condições e sinais de saída são coerentes com D2; holds, ordem de liberação, waits, guardas e recuperação estão materializados.
- Resultado do lint: rota completa e semanticamente executável; replay oficial permitido somente pelo manifesto r04 relido.

## Histórico de reparo

- R1/r02: R01–R08 corresponderam; R09 com somente um hold de 180 ms não abriu créditos; screenshot final reaberta ainda mostrava o mapa. Tentativa preservada como `FAIL`.
- r03: R09 corrigido para a sequência pública completa que havia produzido CF em D2: `Enter` instantâneo, wait 1.200 ms, hold 180 ms, wait final. Nenhuma ação de movimento mudou.
- R2/r03: R01–R08 corresponderam, mas R09 novamente não abriu créditos; pós-tentativa, `ArrowLeft` sem `Shift` para garantir orientação, seguido de `Enter` sustentado, abriu créditos. r04 materializa essa causa pública mínima.
- R3/r04: replay limpo passou a partir do reset público em 12.012,3 ms; checkpoints foram reabertos e CF mostrou créditos legíveis. Reset pós-conclusão restaurou o sinal inicial.
- Reteste R4/r05: a nova regra do guia foi relida e R09 passou no lint por materializar `ArrowLeft` imediatamente antes de `Enter`; a rota r04, sem alteração, passou em replay oficial único em 12.042,8 ms, e o reset público restaurou o mesmo sinal inicial. Este reteste valida a execução da regra carregada; não refaz o aceite completo da autoria original do cartão.
