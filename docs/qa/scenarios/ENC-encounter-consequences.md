---
id: ENC-encounter-consequences
area: ENC
title: Resolver escolhas, sacrifícios e recuos
persona: Lia, primeira expedicionária
journey: J-complete-campaign
expected: Abordagens produzem explicação posterior, morte ou recuo sem duplicação; trocar para outro caminho incompleto preserva consequências, atribuições e registros separados
entry_points: file:///…/prototype/index.html
qa_status: pass
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-08-31-dungeon-route-selection/CH-route-order-and-gate-after-retreat.png; docs/qa/evidence/2026-08-31-dungeon-route-selection/CH-route-order-and-gate-revisit-first-landmark.png; docs/qa/evidence/2026-08-31-dungeon-route-selection/CH-sixteen-image-devlog-review-seed23-failure.png; docs/qa/evidence/2026-08-31-dungeon-route-selection/CH-sixteen-image-devlog-review-seed23-confirmation.png; docs/qa/evidence/2026-08-31-dungeon-route-selection/CH-sixteen-image-devlog-review-seed23-roster.png; docs/qa/evidence/2026-08-31-dungeon-route-selection/CH-complete-outcomes-canary-defeat.png; docs/qa/evidence/2026-08-31-dungeon-route-selection/CH-review-remediation-final-last-sacrifice-victory.png
last_report: docs/qa/reports/2026-08-31-dungeon-route-selection.md
overlaps: FOR-formation-roster; ART-encounter-art-content
---

Executado recuo antes do compromisso, troca entre caminhos incompletos, reinício no primeiro marco, atribuições independentes e morte persistente. O canário seed `23` percorreu A1 `0/3`, cancelamento, confirmação de H4 e roster recalculado; a sessão de derrota confirmou oito mortes e a consequência do bardo. Após a remediação, a seed `1` confirmou H1/H3/H4 como sacrifícios nos marcos finais 4/5/6 e encerrou a campanha corretamente quando a expedição ficou vazia no último marco.
