---
id: CAM-mz-discovery-closing
area: CAM
title: Concluir as ordens e desfechos elegíveis
persona: Caio, estrategista recorrente
journey: J-mz-complete-campaign
expected: Peças, Conselho, desfecho, memorial e epílogos correspondem às decisões e continuam salvos.
entry_points: http://127.0.0.1:18726/; rpg-maker/The Dryland Drowned/game.rmmzproject
qa_status: untested
bug_ids: BUG-20260909-final-passage-not-seen
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/reports/2026-09-12-eventbridge-minimal-runtime.md
last_report: docs/qa/reports/2026-09-12-eventbridge-minimal-runtime.md
overlaps:
---

Cobertura primária: E2E-006, E2E-007, E2E-008, E2E-009, E2E-010, E2E-011, E2E-022, E2E-023.

[Plano e receitas](../guides/native-mz-cycle.md). Usar ações reais de jogador no runtime MZ; fixtures diretas de estado pertencem somente à integração. A aprovação humana e a audição real não podem ser inferidas de nomes de arquivos, hashes, decodificação ou screenshots.

Retomada da baseline anterior: ordens, Conselho, elegibilidade e inspeção temporal têm evidências revisadas. Bug de registro do último trecho corrigido e verificado em 66 UT, IT-050/053 e campanha dirigida atualizada. Variante mista com créditos automáticos, mouse e teclado passou em 1920×1080; aceite humano permanece separado.

## Incremento vn-picture-busts-dialogues — 2026-09-11

Estado deste incremento: **PASS funcional em D03–D05; FAIL visual de prisões em V007/D03**. O `qa_status` e o aceite humano acima pertencem à baseline indicada em seu relatório; não são promovidos para os novos bustos. D03/D04/D05/D08: duas ordens, Conselho0/1/2/3, todas opiniões/epílogos elegíveis, Andirá ocultando/restaurando heróis, dois finais e perda total. LotesC/R/I/Z/L.

[Guia e variantes](../guides/vn-picture-busts-dialogues.md) · [Charter](../charters/CH-vn-picture-busts-dialogues.md). A tarefa09 registra evidência e veredito incremental sem apagar o histórico. Fonte relevante alterada reabre somente os sensores afetados.

Resultado consolidado no [relatório de2026-09-11](../reports/2026-09-11-vn-picture-busts-dialogues.md). A cobertura atual e a retenção qualificada das capturas anteriores estão separadas; nenhum aceite humano desta composição é alegado.

## Incremento eventbridge-minimal-runtime — 2026-09-12

Planejado, **untested**. S04/S09/S10/S12; lotes B/D/F/H. Sessões: CH-mz-campaign-terminal-matrix. [Guia corrente](../guides/eventbridge-minimal-runtime.md) · [Relatório](../reports/2026-09-12-eventbridge-minimal-runtime.md). Todos os resultados anteriores acima mantêm seu escopo histórico. Estado anterior do tracker: `pass`; relatório: `docs/qa/reports/2026-09-09-native-mz-playtest.md`; evidência: `docs/qa/reports/2026-09-09-native-mz-playtest.md`. Não há campanha dirigida ou aceite humano novo declarado por esta atualização.


## Execução eventbridge-minimal-runtime — 2026-09-13

Estado corrente: **pass**. S04/S09/S10/S12: Reunir/Destruir compartilham pai anterior à decisão, bad tem produtor próprio de oito perdas; arquivos A/B e Continue terminal preservam bytes. Seis modos finais de créditos foram executados duas vezes cada, com linha final/velocidade observadas; IT058 retido conta o retorno único ao título e a fixture longa permanece integração isolada. [Relatório e limites](../reports/2026-09-12-eventbridge-minimal-runtime.md). Operador: Codex; personas representam perspectivas de teste. Os pareceres humanos permanecem no contrato de verificação.


## Expansão de autoria por mapa — 2026-09-14

Fluxo dos três desfechos PASS; enquadramento do Conselho reprovado, epílogos corrigidos com retestes. MAS-03/04/06: MA-C/D/E/H; duas ordens, três finais, Conselho, memorial, epílogos e créditos. [Guia e entradas atuais](../guides/eventbridge-minimal-runtime.md#expansão-de-autoria-por-mapa--plano-de-execução-2026-09-14) · [Relatório](../reports/2026-09-12-eventbridge-minimal-runtime.md). Task29 é o join canônico; task16 registra execução e limites. A aprovação prévia de Gorvak é parcial de organização, sem aprovação implícita das demais superfícies. Os resultados históricos acima permanecem vinculados às respectivas fontes.
