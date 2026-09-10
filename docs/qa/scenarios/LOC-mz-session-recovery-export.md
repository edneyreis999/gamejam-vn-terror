---
id: LOC-mz-session-recovery-export
area: LOC
title: Retomar e exportar a campanha nativa
persona: Rui, revisor de conteúdo
journey: J-mz-recovery-export
expected: O pacote íntegro restaura seu último checkpoint e oferece recuperação nativa das falhas isoladas.
entry_points: http://127.0.0.1:18726/; rpg-maker/The Dryland Drowned/game.rmmzproject
qa_status: pass
bug_ids: BUG-20260910-save-history-schema
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/reports/2026-09-09-native-mz-playtest.md
last_report: docs/qa/reports/2026-09-09-native-mz-playtest.md
overlaps: ART-mz-visual-audio-runtime
---

Cobertura primária: E2E-001, E2E-013, E2E-014, E2E-017, E2E-018, E2E-021, V-EXPORT.

[Plano e receitas](../guides/native-mz-cycle.md). Usar ações reais de jogador no runtime MZ; fixtures diretas de estado pertencem somente à integração. A aprovação humana e a audição real não podem ser inferidas de nomes de arquivos, hashes, decodificação ou screenshots.

Retomada atual: Recuperação, Novo jogo, Retry e editor/export executados. Consolidação integral de entrada/receita DX permanece pendente.

Consolidação final: E2E001/013/014/017/018/021 e V-EXPORT possuem revisões compostas. Intro seq1 salvo → formação seq4 sem novo autosave; executor usa a receita Python/SIGINT e mesma origem/profile.

BUG-20260910-save-history-schema corrigido e verificado em66 UT, IT-021/023 e pacote dirigido20260910-01. O pacote anterior permanece histórico; manifesto atual current-package-20260910-manifest.json.
