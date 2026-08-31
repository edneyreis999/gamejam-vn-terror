---
id: CAM-dungeon-progression-outcomes
area: CAM
title: Concluir os caminhos em ambas as ordens
persona: Caio, estrategista recorrente
journey: J-complete-campaign
expected: Ferro/Vozes e Vozes/Ferro fecham cada rota uma vez, liberam Legado somente com 2 de 2 partes e convergem ao desfecho 5+5+6 com reset limpo
entry_points: file:///…/prototype/index.html
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-08-30-browser-prototype/seed-20260830-victory.png; docs/qa/evidence/2026-08-30-browser-prototype/automatic-retreat-three-dead.png; docs/qa/evidence/2026-08-30-browser-prototype/defeat-eight-dead.png; docs/qa/evidence/2026-08-30-browser-prototype/victory-new-campaign-clean.png
last_report: docs/qa/reports/2026-08-30-browser-prototype.md
overlaps: ENC-encounter-consequences; ACC-accessibility-diagnostics
---

Planejar as duas ordens completas, tentativa prematura do Legado, impossibilidade de repetir caminho concluído, momento de devlog em `1 de 2`, desbloqueio automático em `2 de 2`, dezesseis atribuições únicas e reset terminal. `CH-route-order-and-gate` é o alvo; `CH-complete-outcomes-canary` mantém vitória, derrota e campanha nova como canário adjacente. Nenhum resultado novo é afirmado antes da execução.
