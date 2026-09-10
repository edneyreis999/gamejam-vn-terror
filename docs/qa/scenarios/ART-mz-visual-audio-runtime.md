---
id: ART-mz-visual-audio-runtime
area: ART
title: Revisar a apresentação audiovisual do pacote
persona: Rui, revisor de conteúdo
journey: J-mz-creative-review
expected: Telas permanecem legíveis e os contextos, temas e efeitos possuem revisão audiovisual registrada.
entry_points: http://127.0.0.1:18726/; rpg-maker/The Dryland Drowned/game.rmmzproject
qa_status: pass
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/reports/2026-09-09-native-mz-playtest.md
last_report: docs/qa/reports/2026-09-09-native-mz-playtest.md
overlaps: LOC-mz-session-recovery-export
---

Cobertura primária: E2E-018, E2E-020, V-VISUAL, V-AUDIO.

[Plano e receitas](../guides/native-mz-cycle.md). Usar ações reais de jogador no runtime MZ; fixtures diretas de estado pertencem somente à integração. A aprovação humana e a audição real não podem ser inferidas de nomes de arquivos, hashes, decodificação ou screenshots.

Retomada atual: Muitas superfícies e três finais inspecionados; matriz visual maior completa e audição efetiva pendentes.

Aceite humano final informado pelo usuário em2026-09-10: “está aprovado pelos testes humanos”. Registro: docs/qa/deliveries/init-rpg-maker-mz/human-acceptance.json. Supera bloqueios humanos históricos; refinamento narrativo conhecido não foi corrigido.
