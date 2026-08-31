---
id: LOC-local-launch-session
area: LOC
title: Abrir preparação e runner locais sem rede
persona: Lia, primeira expedicionária
journey: J-local-offline-launch
expected: Index e testes abrem por file URL sem rede; a preparação começa com dois caminhos desmarcados, Legado bloqueado e nenhuma retomada implícita
entry_points: file:///…/prototype/index.html; file:///…/prototype/tests.html
qa_status: pass
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-08-31-dungeon-route-selection/CH-offline-all-images-blocked-fallback.png; docs/qa/evidence/2026-08-31-dungeon-route-selection/CH-route-tests-entry-canary-final-351-pass.png; docs/qa/evidence/2026-08-31-dungeon-route-selection/CH-route-order-and-gate-fresh-reset.png
last_report: docs/qa/reports/2026-08-31-dungeon-route-selection.md
overlaps: ART-encounter-art-content
---

Executado por `file://` e rede desligada: abertura neutra, dois rádios desmarcados, Legado bloqueado, fallback sem JPEG e reload limpo. O gate final local terminou em 351/351 com zero falhas.
