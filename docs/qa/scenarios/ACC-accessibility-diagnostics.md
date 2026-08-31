---
id: ACC-accessibility-diagnostics
area: ACC
title: Completar por teclado e reproduzir diagnósticos
persona: Joana, jogadora ampliada
journey: J-reproduce-campaign
expected: Rádios nativos, cartões estáticos, foco, zoom e movimento reduzido permitem ambas as ordens; snapshot v2 e a API de três métodos reproduzem rejeições sem backdoors
entry_points: file:///…/prototype/index.html; file:///…/prototype/tests.html; Chrome DevTools — window.expeditionQA.setSeed, snapshot e validate
qa_status: pass
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-08-31-dungeon-route-selection/CH-keyboard-zoom-motion-formation-320-effective.png; docs/qa/evidence/2026-08-31-dungeon-route-selection/CH-keyboard-zoom-motion-victory.png; docs/qa/evidence/2026-08-31-dungeon-route-selection/CH-seeded-diagnostics-reproduction-rejection.png; docs/qa/evidence/2026-08-31-dungeon-route-selection/CH-seeded-diagnostics-reproduction-seed-20260830.png; docs/qa/evidence/2026-08-31-dungeon-route-selection/CH-route-tests-entry-canary-final-351-pass.png
last_report: docs/qa/reports/2026-08-31-dungeon-route-selection.md
overlaps: FOR-formation-roster; CAM-dungeon-progression-outcomes
---

Executado Chrome a 320 CSS px efetivos, zoom 200%, modo escuro, movimento reduzido e campanha completa somente por teclado. Axe encontrou zero violações. Seeds-limite, erro inválido/tardio, rejeição fora do histórico, limpeza após ação aceita, snapshots congelados e `validate` não mutante passaram usando somente os três métodos públicos.
