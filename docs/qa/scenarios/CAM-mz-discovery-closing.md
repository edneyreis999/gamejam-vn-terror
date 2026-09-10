---
id: CAM-mz-discovery-closing
area: CAM
title: Concluir as ordens e desfechos elegíveis
persona: Caio, estrategista recorrente
journey: J-mz-complete-campaign
expected: Peças, Conselho, desfecho, memorial e epílogos correspondem às decisões e continuam salvos.
entry_points: http://127.0.0.1:18726/; rpg-maker/The Dryland Drowned/game.rmmzproject
qa_status: pass
bug_ids: BUG-20260909-final-passage-not-seen
fix_status: fixed
retest_status: passed
fix_commits:
evidence: docs/qa/reports/2026-09-09-native-mz-playtest.md
last_report: docs/qa/reports/2026-09-09-native-mz-playtest.md
overlaps: 
---

Cobertura primária: E2E-006, E2E-007, E2E-008, E2E-009, E2E-010, E2E-011, E2E-022, E2E-023.

[Plano e receitas](../guides/native-mz-cycle.md). Usar ações reais de jogador no runtime MZ; fixtures diretas de estado pertencem somente à integração. A aprovação humana e a audição real não podem ser inferidas de nomes de arquivos, hashes, decodificação ou screenshots.

Retomada atual: ordens, Conselho, elegibilidade e inspeção temporal têm evidências revisadas. Bug de registro do último trecho corrigido e verificado em 66 UT, IT-050/053 e campanha dirigida atualizada. Variante mista com créditos automáticos, mouse e teclado passou em 1920×1080; aceite humano permanece separado.
