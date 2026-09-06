---
id: LOC-local-launch-session
area: LOC
title: Abrir jogador e runner locais sem rede
persona: Rui, revisor de conteúdo
journey: J-local-offline-launch
expected: Index e testes abrem por file URL sem rede ou build, usam somente recursos relativos e reiniciam limpos após fechamento ou reload
entry_points: file:///…/prototype/index.html; file:///…/prototype/tests.html
qa_status: pass
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-09-05-prototype-v2-gdd-layouts/offline-local-canary.json; docs/qa/evidence/2026-09-05-prototype-v2-gdd-layouts/browser-manifest-canaries.json; docs/qa/evidence/2026-09-05-prototype-v2-gdd-layouts/final-browser-suite.json
last_report: docs/qa/reports/2026-09-05-prototype-v2-gdd-layouts.md
overlaps: ART-encounter-art-content; ACC-accessibility-diagnostics
---

Planejar abertura do pacote original e de uma cópia relocada no Chrome com rede desligada, chegada à primeira decisão, imagens indisponíveis com fallback textual e reload durante preparação ou encontro. Nenhuma sessão, seed ou elegibilidade de texto visto deve sobreviver.

O canário adjacente abre tests.html, confere IDs únicos do manifesto e o relatório estruturado. O baseline atual é 168 casos (158 V2 e 10 BASE); 231 e 351 permanecem somente em missões e relatórios históricos.
