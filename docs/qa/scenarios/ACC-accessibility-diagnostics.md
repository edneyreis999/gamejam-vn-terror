---
id: ACC-accessibility-diagnostics
area: ACC
title: Completar o desktop suportado por teclado e inspecionar V3
persona: Joana, jogadora ampliada
journey: J-reproduce-campaign
expected: Teclado, foco, zoom com área efetiva mínima de 1280×720, movimento reduzido e as três leituras QA preservam S01–S12 sem avançar ou mutar a campanha
entry_points: file:///…/prototype/index.html; file:///…/prototype/tests.html; Chrome DevTools — window.expeditionQA.setSeed, snapshot e validate
qa_status: pass
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-09-05-prototype-v2-gdd-layouts/keyboard-size-probes.json; docs/qa/evidence/2026-09-05-prototype-v2-gdd-layouts/reduced-motion-slot-probe.json; docs/qa/evidence/prototype-v2-gdd-layouts/supervisor-keyboard-zoom/summary.json; docs/qa/evidence/prototype-v2-gdd-layouts/supervisor-final-supplements/summary.json; docs/qa/evidence/2026-09-05-prototype-v2-gdd-layouts/seeded-public-contract.json
last_report: docs/qa/reports/2026-09-05-prototype-v2-gdd-layouts.md
overlaps: FOR-formation-roster; CAM-dungeon-progression-outcomes
---

Planejar Tab, Shift+Tab, setas, Enter, Espaço e Escape; inspeção de herói, diálogos, leitura, sacrifício sem segunda confirmação, Conselho, desfechos e reinício; zoom apenas quando a área efetiva continuar ≥1280×720; movimento reduzido deve eliminar a espera visual sem alterar a verdade da campanha. Snapshot V3, seeds-limite, rejeições, objetos destacados e validate não mutante pertencem à observação de agente.

VoiceOver com pessoa usuária permanece uma verificação humana separada. Axe, DOM, comparação visual e travessia por agente não produzem esse veredito. Os relatórios anteriores preservam sua história, mas não são evidência do estado planejado atual.
