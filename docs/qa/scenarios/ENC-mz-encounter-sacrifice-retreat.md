---
id: ENC-mz-encounter-sacrifice-retreat
area: ENC
title: Resolver encontros e reencontrar as ausências
persona: Lia, primeira expedicionária
journey: J-mz-complete-campaign
expected: Escolhas explícitas preservam encontro, progresso e morte nas revisitas e na retomada.
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

Cobertura primária: E2E-003, E2E-004, E2E-005, E2E-012.

[Plano e receitas](../guides/native-mz-cycle.md). Usar ações reais de jogador no runtime MZ; fixtures diretas de estado pertencem somente à integração. A aprovação humana e a audição real não podem ser inferidas de nomes de arquivos, hashes, decodificação ou screenshots.

Retomada atual: E2E003/004/005/012 revisados nas pastas directed-input, directed-absence-03 e directed-loss.

## Incremento vn-picture-busts-dialogues — 2026-09-11

Estado deste incremento: **PASS no escopo de D02/D05: oito despedidas por área, saídas, perda total e Continue terminal**. O `qa_status` e o aceite humano acima pertencem à baseline indicada em seu relatório; não são promovidos para os novos bustos. D02/D08: oito despedidas, vítima comprometida somente em60, saída antes da narração, candidatos independentes e morte única no Continue. LoteL; integração IT012/062/066 é sensor separado.

[Guia e variantes](../guides/vn-picture-busts-dialogues.md) · [Charter](../charters/CH-vn-picture-busts-dialogues.md). A tarefa09 registra evidência e veredito incremental sem apagar o histórico. Fonte relevante alterada reabre somente os sensores afetados.

Resultado consolidado no [relatório de2026-09-11](../reports/2026-09-11-vn-picture-busts-dialogues.md). A cobertura atual e a retenção qualificada das capturas anteriores estão separadas; nenhum aceite humano desta composição é alegado.
