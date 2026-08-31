---
id: FOR-formation-roster
area: FOR
title: Escolher caminho e formar expedições
persona: Joana, jogadora ampliada
journey: J-complete-campaign
expected: Caminho e heróis podem ser escolhidos em qualquer ordem; estados disponível, concluído e bloqueado, limites, reservas, mortos e bardo permanecem compreensíveis por teclado
entry_points: file:///…/prototype/index.html
qa_status: pass
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-08-31-dungeon-route-selection/CH-route-order-and-gate-missing-route.png; docs/qa/evidence/2026-08-31-dungeon-route-selection/CH-route-order-and-gate-preparation-preserved.png; docs/qa/evidence/2026-08-31-dungeon-route-selection/CH-keyboard-zoom-motion-formation-320-effective.png
last_report: docs/qa/reports/2026-08-31-dungeon-route-selection.md
overlaps: ACC-accessibility-diagnostics
---

Executado com rota antes/depois dos heróis, troca de rota sem perder H1/H2/H3, erro de partida focado com escolhas preservadas, formações reduzidas na derrota, cartões concluído/bloqueado não focáveis e diálogo de elenco devolvendo foco. Pass em `CH-route-order-and-gate` e `CH-keyboard-zoom-motion`.
