---
id: FOR-formation-roster
area: FOR
title: Escolher caminho e formar expedições
persona: Joana, jogadora ampliada
journey: J-complete-campaign
expected: Caminho e heróis podem ser escolhidos em qualquer ordem; estados disponível, concluído e bloqueado, limites, reservas, mortos e bardo permanecem compreensíveis por teclado
entry_points: file:///…/prototype/index.html
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-08-30-browser-prototype/keyboard-opening-focus.png; docs/qa/evidence/2026-08-30-browser-prototype/zoom-200-effective-formation.png; docs/qa/evidence/2026-08-30-browser-prototype/devlog-05-roster-recalculado.png
last_report: docs/qa/reports/2026-08-30-browser-prototype.md
overlaps: ACC-accessibility-diagnostics
---

Planejar rota antes/depois dos heróis, troca de rota sem perder formação, erro de partida com escolhas preservadas, formação automática com um/dois sobreviventes, cartões concluído/bloqueado não focáveis, diálogo de elenco e retorno de foco. `CH-route-order-and-gate` é o alvo; `CH-keyboard-zoom-motion` é o canário de acessibilidade. Preservar a evidência histórica até a nova caminhada.
