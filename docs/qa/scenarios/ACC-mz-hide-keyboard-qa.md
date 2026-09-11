---
id: ACC-mz-hide-keyboard-qa
area: ACC
title: Jogar com HIDE, teclado e diagnóstico seguro
persona: Joana, jogadora ampliada
journey: J-mz-qa-accessibility
expected: Foco, restauração e opções mantêm o controle explícito sem mutação pelo diagnóstico.
entry_points: http://127.0.0.1:18726/; rpg-maker/The Dryland Drowned/game.rmmzproject
qa_status: pass
bug_ids: BUG-20260909-hide-overlapping-choices; BUG-20260909-options-help-english
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/reports/2026-09-09-native-mz-playtest.md
last_report: docs/qa/reports/2026-09-09-native-mz-playtest.md
overlaps: 
---

Cobertura primária: E2E-015, E2E-016, E2E-019.

[Plano e receitas](../guides/native-mz-cycle.md). Usar ações reais de jogador no runtime MZ; fixtures diretas de estado pertencem somente à integração. A aprovação humana e a audição real não podem ser inferidas de nomes de arquivos, hashes, decodificação ou screenshots.

Retomada 2026-09-09: BUG-20260909-hide-overlapping-choices corrigido e verificado por IT-026 e replay dirigido A2. O cenário agregado volta a untested enquanto opções, variantes de acessibilidade e captura de ausência ainda não estão consolidadas; isso não apaga o defeito nem sua verificação.

Retomada atual: HIDE/opções e QA somente leitura passaram; área maior/reduced motion executados. Zoom específico permanece pendente.

Retomada adicional: zoom real110% executado e inspecionado, área efetiva1555×874 CSS. Tradução da ajuda das opções verificada nas duas áreas, com IT-028 passando. Esta atualização substitui as pendências históricas de zoom/opções acima. Ver lotes directed-zoom e directed-current-package do mesmo ciclo.

## Incremento vn-picture-busts-dialogues — 2026-09-11

Estado deste incremento: **PASS no escopo de D06/D10: controles e interrupções, com evidência dirigida retida e integrações da suíte atual**. O `qa_status` e o aceite humano acima pertencem à baseline indicada em seu relatório; não são promovidos para os novos bustos. D06/D10: HIDE conserva arte, restauração consome Tab/clique, S somente visto, cancelamento não ressuscita pictures. LoteU dirigido; loteX explicitamente integração.

[Guia e variantes](../guides/vn-picture-busts-dialogues.md) · [Charter](../charters/CH-vn-picture-busts-dialogues.md). A tarefa09 registra evidência e veredito incremental sem apagar o histórico. Fonte relevante alterada reabre somente os sensores afetados.

Resultado consolidado no [relatório de2026-09-11](../reports/2026-09-11-vn-picture-busts-dialogues.md). A cobertura atual e a retenção qualificada das capturas anteriores estão separadas; nenhum aceite humano desta composição é alegado.
