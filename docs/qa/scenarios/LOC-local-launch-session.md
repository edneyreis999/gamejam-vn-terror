---
id: LOC-local-launch-session
area: LOC
title: Abrir preparação e runner locais sem rede
persona: Lia, primeira expedicionária
journey: J-local-offline-launch
expected: Index e testes abrem por file URL sem rede; a preparação começa com dois caminhos desmarcados, Legado bloqueado e nenhuma retomada implícita
entry_points: file:///…/prototype/index.html; file:///…/prototype/tests.html
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-08-30-browser-prototype/all-images-blocked-fallback.png; docs/qa/evidence/2026-08-30-browser-prototype/exit-gate-231-pass-offline.png
last_report: docs/qa/reports/2026-08-30-browser-prototype.md
overlaps: ART-encounter-art-content
---

Planejar abertura neutra, três cartões diegéticos, dois rádios iniciais desmarcados, Legado bloqueado, recursos relativos, ausência de persistência e reload limpo. O canário novo `CH-route-tests-entry-canary` cobre o runner de 351 casos; `CH-offline-all-images-blocked` continua como canário adjacente. Preservar os caminhos históricos acima até a execução produzir evidência e relatório novos.
