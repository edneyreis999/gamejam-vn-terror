---
id: FOR-mz-formation-roster
area: FOR
title: Preparar o grupo sem confundir consulta e seleção
persona: Lia, primeira expedicionária
journey: J-mz-complete-campaign
expected: Elenco e perfis preservam a seleção, e Partir exige preparação válida.
entry_points: http://127.0.0.1:18726/; rpg-maker/The Dryland Drowned/game.rmmzproject
qa_status: pass
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/reports/2026-09-09-native-mz-playtest.md
last_report: docs/qa/reports/2026-09-09-native-mz-playtest.md
overlaps: 
---

Cobertura primária: E2E-002.

[Plano e receitas](../guides/native-mz-cycle.md). Usar ações reais de jogador no runtime MZ; fixtures diretas de estado pertencem somente à integração. A aprovação humana e a audição real não podem ser inferidas de nomes de arquivos, hashes, decodificação ou screenshots.

Retomada atual: Preparação, perfil/Elenco sem mutação e partida válida executados em directed-input-20260909-01.

## Incremento vn-picture-busts-dialogues — 2026-09-11

Estado deste incremento: **PASS no escopo de D01: oito heróis/quatro famílias em ambos os modos,112 estados estáveis equivalentes e inspeção temporal atual**. O `qa_status` e o aceite humano acima pertencem à baseline indicada em seu relatório; não são promovidos para os novos bustos. D01: H1–H8×profile/speech/selection/party_full (32seções/72caixas), dono contínuo60/63, foco por caixa e saída conjunta. LoteT.

[Guia e variantes](../guides/vn-picture-busts-dialogues.md) · [Charter](../charters/CH-vn-picture-busts-dialogues.md). A tarefa09 registra evidência e veredito incremental sem apagar o histórico. Fonte relevante alterada reabre somente os sensores afetados.

Resultado consolidado no [relatório de2026-09-11](../reports/2026-09-11-vn-picture-busts-dialogues.md). A cobertura atual e a retenção qualificada das capturas anteriores estão separadas; nenhum aceite humano desta composição é alegado.
