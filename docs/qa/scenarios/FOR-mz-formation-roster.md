---
id: FOR-mz-formation-roster
area: FOR
title: Preparar o grupo sem confundir consulta e seleção
persona: Lia, primeira expedicionária
journey: J-mz-complete-campaign
expected: Elenco e perfis preservam a seleção, e Partir exige preparação válida.
entry_points: http://127.0.0.1:18726/; rpg-maker/The Dryland Drowned/game.rmmzproject
qa_status: untested
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/reports/2026-09-12-eventbridge-minimal-runtime.md
last_report: docs/qa/reports/2026-09-12-eventbridge-minimal-runtime.md
overlaps:
---

Cobertura primária: E2E-002.

[Plano e receitas](../guides/native-mz-cycle.md). Usar ações reais de jogador no runtime MZ; fixtures diretas de estado pertencem somente à integração. A aprovação humana e a audição real não podem ser inferidas de nomes de arquivos, hashes, decodificação ou screenshots.

Retomada da baseline anterior: Preparação, perfil/Elenco sem mutação e partida válida executados em directed-input-20260909-01.

## Incremento vn-picture-busts-dialogues — 2026-09-11

Estado deste incremento: **PASS no escopo de D01: oito heróis/quatro famílias em ambos os modos,112 estados estáveis equivalentes e inspeção temporal atual**. O `qa_status` e o aceite humano acima pertencem à baseline indicada em seu relatório; não são promovidos para os novos bustos. D01: H1–H8×profile/speech/selection/party_full (32seções/72caixas), dono contínuo60/63, foco por caixa e saída conjunta. LoteT.

[Guia e variantes](../guides/vn-picture-busts-dialogues.md) · [Charter](../charters/CH-vn-picture-busts-dialogues.md). A tarefa09 registra evidência e veredito incremental sem apagar o histórico. Fonte relevante alterada reabre somente os sensores afetados.

Resultado consolidado no [relatório de2026-09-11](../reports/2026-09-11-vn-picture-busts-dialogues.md). A cobertura atual e a retenção qualificada das capturas anteriores estão separadas; nenhum aceite humano desta composição é alegado.

## Incremento eventbridge-minimal-runtime — 2026-09-12

Planejado, **untested**. S01/S02/S03/S06T; lotes A/C/E. Sessões: CH-eventbridge-first-campaign; CH-mz-recovery-export. [Guia corrente](../guides/eventbridge-minimal-runtime.md) · [Relatório](../reports/2026-09-12-eventbridge-minimal-runtime.md). Todos os resultados anteriores acima mantêm seu escopo histórico. Estado anterior do tracker: `pass`; relatório: `docs/qa/reports/2026-09-09-native-mz-playtest.md`; evidência: `docs/qa/reports/2026-09-09-native-mz-playtest.md`. Não há campanha dirigida ou aceite humano novo declarado por esta atualização.


## Execução eventbridge-minimal-runtime — 2026-09-13

Estado corrente: **blocked-verify**. Formação, oito heróis, grupo cheio/remoção/reseleção, elenco/destinos e arquivos passaram. CE4/5/352, navegação mapa→evento e preload29 foram exercitados no MZ; a cópia autoral passou109 entradas/43 capturas PNG. Restam os pareceres humanos de autoria e UI. [Relatório e limites](../reports/2026-09-12-eventbridge-minimal-runtime.md). Operador: Codex; personas representam perspectivas de teste. Os pareceres humanos permanecem no contrato de verificação.

## Experimental Gorvak map — 2026-09-14

ADR-005 adds one playable child map and removes42 authoring shortcuts. Gorvak now returns to his own menu after conversation/selection; use Voltar à taverna or cancel to leave. The other seven heroes retain their previous interaction. [Current guide](../guides/eventbridge-minimal-runtime.md) owns EXV-003/004 variants and the native-editor replay; [task16](../../../planos/tasks/eventbridge-minimal-runtime/task-16.md) records execution and pending human acceptance. Historical runs above retain their original source scope.


## Expansão de autoria por mapa — 2026-09-14

Executado: formação, oito heróis e arquivos PASS; parecer de UI/autoria pendente. MAS-01/02/05: MA-A/B; oito heróis, formação e arquivos A/B. [Guia e entradas atuais](../guides/eventbridge-minimal-runtime.md#expansão-de-autoria-por-mapa--plano-de-execução-2026-09-14) · [Relatório](../reports/2026-09-12-eventbridge-minimal-runtime.md). Task29 é o join canônico; task16 registra execução e limites. A aprovação prévia de Gorvak é parcial de organização, sem aprovação implícita das demais superfícies. Os resultados históricos acima permanecem vinculados às respectivas fontes.


## Integração narrativa aprovada — 2026-09-18

Planejado, execução dirigida ainda não observada. Cobertura: S-02; A. [Guia corrente](../guides/approved-narrative-dialogue-staging.md) e [charter](../charters/CH-approved-narrative-dialogue-staging.md). Preservar os vereditos históricos acima; fonte aprovada não aprova render/escuta do candidato. Sem zoom/gamepad. Prisões ausentes continuam no bug existente; prosa/arte aceitas e refinamento do memorial não são reabertos.
