---
id: ENC-encounter-consequences
area: ENC
title: Resolver abordagens, sacrifícios e recuos irreversíveis
persona: Lia, primeira expedicionária
journey: J-complete-campaign
expected: Cada abordagem produz consequência causal, falha oferece aviso antes das vítimas e o primeiro acionamento mata sem confirmação adicional, respeitando recuo e precedência de grupo vazio
entry_points: retired HTML artifact (index.html)
qa_status: pass
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-09-05-prototype-v2-gdd-layouts/native-destroy-with-deaths.json; docs/qa/evidence/2026-09-05-prototype-v2-gdd-layouts/CH-v3-first-return-loss-warning.png; docs/qa/evidence/2026-09-05-prototype-v2-gdd-layouts/CH-v3-first-return-loss-death.png; docs/qa/evidence/2026-09-05-prototype-v2-gdd-layouts/CH-v3-first-return-loss-empty.png
last_report: docs/qa/reports/2026-09-05-prototype-v2-gdd-layouts.md
overlaps: FOR-formation-roster; CAM-dungeon-progression-outcomes; ART-encounter-art-content
---

> Historical record: the HTML implementation has been retired. Procedures and source references below describe that past delivery only; do not execute them, recover its source, or treat its results as evidence of the current game. Current implementation: `rpg-maker/The Dryland Drowned/`; current tests: `rpg-maker/tests/`.


Planejar sucessos e falhas nos dois caminhos, vítima única ou múltipla, entrada repetida, recuo voluntário e retorno automático. A morte persiste; uma tentativa após recuo reinicia no primeiro marco sem apagar atribuições, progresso conhecido ou perdas. Na última posição, reservas não teleportam para o grupo; perda total do elenco prevalece sobre recompensas e Conselho.

A apresentação completa precede escolhas. Texto visto só nasce de avanço concluído nesta campanha; pulo para antes de passagem inédita ou decisão e nunca escolhe abordagem, vítima, desfecho ou campanha nova.
