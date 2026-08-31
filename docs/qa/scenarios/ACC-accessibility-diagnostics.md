---
id: ACC-accessibility-diagnostics
area: ACC
title: Completar por teclado e reproduzir diagnósticos
persona: Joana, jogadora ampliada
journey: J-reproduce-campaign
expected: Rádios nativos, cartões estáticos, foco, zoom e movimento reduzido permitem ambas as ordens; snapshot v2 e a API de três métodos reproduzem rejeições sem backdoors
entry_points: file:///…/prototype/index.html; file:///…/prototype/tests.html; Chrome DevTools — window.expeditionQA.setSeed, snapshot e validate
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-08-30-browser-prototype/zoom-200-effective-encounter.png; docs/qa/evidence/2026-08-30-browser-prototype/zoom-200-effective-victory.png; docs/qa/evidence/2026-08-30-browser-prototype/exit-gate-231-pass-offline.png; .compozy/tasks/browser-prototype/evidence/visual/task_06/vc-601/implementation.png
last_report: docs/qa/reports/2026-08-30-browser-prototype.md
overlaps: FOR-formation-roster; CAM-dungeon-progression-outcomes
---

Planejar Chrome a 320×800, zoom 200%, movimento reduzido, navegação completa por teclado, rádios disponíveis, cartões concluído/bloqueado fora da ordem de foco, anúncio de seleção única, seed `20260831`, snapshots v2 por ordem, última rejeição, limpeza após ação aceita e validate não mutante. `CH-keyboard-zoom-motion` e `CH-seeded-diagnostics-reproduction` são canários reutilizados; `CH-route-tests-entry-canary` confirma o contrato 351. Nunca injetar ou reparar estado pela API pública.
