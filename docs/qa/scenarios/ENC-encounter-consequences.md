---
id: ENC-encounter-consequences
area: ENC
title: Resolver escolhas, sacrifícios e recuos
persona: Lia, primeira expedicionária
journey: J-complete-campaign
expected: Abordagens produzem explicação posterior, morte ou recuo sem duplicação; trocar para outro caminho incompleto preserva consequências, atribuições e registros separados
entry_points: file:///…/prototype/index.html
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-08-30-browser-prototype/retreat-revisited-same-encounter.png; docs/qa/evidence/2026-08-30-browser-prototype/devlog-01-competencias.png; docs/qa/evidence/2026-08-30-browser-prototype/devlog-02-abordagens-sem-rotulo.png; docs/qa/evidence/2026-08-30-browser-prototype/devlog-03-falha-explicada.png; docs/qa/evidence/2026-08-30-browser-prototype/devlog-04-confirmacao-h4.png; docs/qa/evidence/2026-08-30-browser-prototype/devlog-05-roster-recalculado.png
last_report: docs/qa/reports/2026-08-30-browser-prototype.md
overlaps: FOR-formation-roster; ART-encounter-art-content
---

Planejar recuo antes do compromisso, troca entre caminhos incompletos, reinício no primeiro marco, encontros já atribuídos intactos e morte persistente na formação seguinte. `CH-route-order-and-gate` cobre a nova transição; `CH-complete-outcomes-canary` e `CH-sixteen-image-devlog-review` preservam as consequências adjacentes. O momento histórico de sacrifício com seed `23` continua válido como canário, não como resultado deste ciclo.
