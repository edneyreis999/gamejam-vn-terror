---
id: ACC-accessibility-diagnostics
area: ACC
title: Completar por teclado e reproduzir diagnósticos
persona: Joana, jogadora ampliada
journey: J-reproduce-campaign
expected: Teclado, foco, zoom, movimento reduzido e a API QA de três métodos preservam uma campanha reproduzível e sem backdoors
entry_points: file:///…/prototype/index.html; Chrome DevTools
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence:
last_report:
overlaps: FOR-formation-roster; CAM-dungeon-progression-outcomes
---

Registrar Chrome, viewport 320×800, zoom 200%, movimento reduzido, seed `20260830`, duas sequências idênticas, snapshots, validate e o stop S11 por fixture controlada. Nunca injetar ou reparar estado pela API pública.
