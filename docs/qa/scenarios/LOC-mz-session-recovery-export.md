---
id: LOC-mz-session-recovery-export
area: LOC
title: Retomar e exportar a campanha nativa
persona: Rui, revisor de conteúdo
journey: J-mz-recovery-export
expected: O pacote íntegro restaura seu último checkpoint e oferece recuperação nativa das falhas isoladas.
entry_points: http://127.0.0.1:18726/; rpg-maker/The Dryland Drowned/game.rmmzproject
qa_status: untested
bug_ids: BUG-20260910-save-history-schema
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/reports/2026-09-12-eventbridge-minimal-runtime.md
last_report: docs/qa/reports/2026-09-12-eventbridge-minimal-runtime.md
overlaps: ART-mz-visual-audio-runtime
---

Cobertura primária: E2E-001, E2E-013, E2E-014, E2E-017, E2E-018, E2E-021, V-EXPORT.

[Plano e receitas](../guides/native-mz-cycle.md). Usar ações reais de jogador no runtime MZ; fixtures diretas de estado pertencem somente à integração. A aprovação humana e a audição real não podem ser inferidas de nomes de arquivos, hashes, decodificação ou screenshots.

Retomada da baseline anterior: Recuperação, Novo jogo, Retry e editor/export executados. Consolidação integral de entrada/receita DX permanece pendente.

Consolidação final: E2E001/013/014/017/018/021 e V-EXPORT possuem revisões compostas. Intro seq1 salvo → formação seq4 sem novo autosave; executor usa a receita Python/SIGINT e mesma origem/profile.

BUG-20260910-save-history-schema corrigido e verificado em66 UT, IT-021/023 e pacote dirigido20260910-01. O pacote anterior permanece histórico; manifesto atual current-package-20260910-manifest.json.

## Incremento vn-picture-busts-dialogues — 2026-09-11

Estado deste incremento: **PASS no escopo de save/Continue e interrupções; BLOCKED apenas no sensor de edição MZ V008**. O `qa_status` e o aceite humano acima pertencem à baseline indicada em seu relatório; não são promovidos para os novos bustos. D07/V008: payload+índice genuínos e fontes compatíveis no Continue; old revision recusada sem apagar save; edição nativa Chrome. LotesS/C/R/F. A breve checagem de campo do editor está bloqueada por CUA cgWindowNotFound; não é pedido de aprovação nem PASS.

[Guia e variantes](../guides/vn-picture-busts-dialogues.md) · [Charter](../charters/CH-vn-picture-busts-dialogues.md). A tarefa09 registra evidência e veredito incremental sem apagar o histórico. Fonte relevante alterada reabre somente os sensores afetados.

Resultado consolidado no [relatório de2026-09-11](../reports/2026-09-11-vn-picture-busts-dialogues.md). A cobertura atual e a retenção qualificada das capturas anteriores estão separadas; nenhum aceite humano desta composição é alegado.

## Incremento eventbridge-minimal-runtime — 2026-09-12

Planejado, **untested**. S01/S03/S04/S06/S06T/S09/S09E; lotes A/B/E/F. Sessões: CH-mz-recovery-export. [Guia corrente](../guides/eventbridge-minimal-runtime.md) · [Relatório](../reports/2026-09-12-eventbridge-minimal-runtime.md). Todos os resultados anteriores acima mantêm seu escopo histórico. Estado anterior do tracker: `pass`; relatório: `docs/qa/reports/2026-09-09-native-mz-playtest.md`; evidência: `docs/qa/reports/2026-09-09-native-mz-playtest.md`. Não há campanha dirigida ou aceite humano novo declarado por esta atualização.


## Execução eventbridge-minimal-runtime — 2026-09-13

Estado corrente: **blocked-verify**. A/B, cancelamento, arquivos nativos, ramificações e reabertura passaram; falhas/loading são integração isolada. A navegação mapa→evento e cópia autoral passaram, incluindo picture92 antes/depois de Options/Continue. Resta somente o parecer humano de usabilidade de autoria. [Relatório e limites](../reports/2026-09-12-eventbridge-minimal-runtime.md). Operador: Codex; personas representam perspectivas de teste. Os pareceres humanos permanecem no contrato de verificação.


## Expansão de autoria por mapa — 2026-09-14

PASS técnico: arquivosA/B e Continue nas fronteiras com proveniência jogada; nenhuma campanha de usuário foi alterada. MAS-02/05/07: MA-A/F/I; arquivos/checkpoints genuínos e edição nativa Map002/Map038. [Guia e entradas atuais](../guides/eventbridge-minimal-runtime.md#expansão-de-autoria-por-mapa--plano-de-execução-2026-09-14) · [Relatório](../reports/2026-09-12-eventbridge-minimal-runtime.md). Task29 é o join canônico; task16 registra execução e limites. A aprovação prévia de Gorvak é parcial de organização, sem aprovação implícita das demais superfícies. Os resultados históricos acima permanecem vinculados às respectivas fontes.
