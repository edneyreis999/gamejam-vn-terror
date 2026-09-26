---
id: ENC-mz-encounter-sacrifice-retreat
area: ENC
title: Resolver encontros e reencontrar as ausências
persona: Lia, primeira expedicionária
journey: J-mz-complete-campaign
expected: Escolhas explícitas preservam encontro, progresso e morte nas revisitas e na retomada.
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

Cobertura primária: E2E-003, E2E-004, E2E-005, E2E-012.

[Plano e receitas](../guides/native-mz-cycle.md). Usar ações reais de jogador no runtime MZ; fixtures diretas de estado pertencem somente à integração. A aprovação humana e a audição real não podem ser inferidas de nomes de arquivos, hashes, decodificação ou screenshots.

Retomada da baseline anterior: E2E003/004/005/012 revisados nas pastas directed-input, directed-absence-03 e directed-loss.

## Incremento vn-picture-busts-dialogues — 2026-09-11

Estado deste incremento: **PASS no escopo de D02/D05: oito despedidas por área, saídas, perda total e Continue terminal**. O `qa_status` e o aceite humano acima pertencem à baseline indicada em seu relatório; não são promovidos para os novos bustos. D02/D08: oito despedidas, vítima comprometida somente em60, saída antes da narração, candidatos independentes e morte única no Continue. LoteL; integração IT012/062/066 é sensor separado.

[Guia e variantes](../guides/vn-picture-busts-dialogues.md) · [Charter](../charters/CH-vn-picture-busts-dialogues.md). A tarefa09 registra evidência e veredito incremental sem apagar o histórico. Fonte relevante alterada reabre somente os sensores afetados.

Resultado consolidado no [relatório de2026-09-11](../reports/2026-09-11-vn-picture-busts-dialogues.md). A cobertura atual e a retenção qualificada das capturas anteriores estão separadas; nenhum aceite humano desta composição é alegado.

## Incremento eventbridge-minimal-runtime — 2026-09-12

Planejado, **untested**. S02/S04/S05/S09; lotes A/B/D/F. Sessões: CH-eventbridge-first-campaign; CH-mz-campaign-terminal-matrix. [Guia corrente](../guides/eventbridge-minimal-runtime.md) · [Relatório](../reports/2026-09-12-eventbridge-minimal-runtime.md). Todos os resultados anteriores acima mantêm seu escopo histórico. Estado anterior do tracker: `pass`; relatório: `docs/qa/reports/2026-09-09-native-mz-playtest.md`; evidência: `docs/qa/reports/2026-09-09-native-mz-playtest.md`. Não há campanha dirigida ou aceite humano novo declarado por esta atualização.


## Execução eventbridge-minimal-runtime — 2026-09-13

Estado corrente: **pass**. S02/S04/S05/S09: campanhas nas duas ordens de rota, sucesso/falha a partir do mesmo A3, vítimas alternativas de um mestre pré-sacrifício, recuo, mortes/ausências e Continue. Provas dirigidas em fresh-physical-01, supernatural-first-01 (falha de verificador separada), bad-01→bad-resume-02, approach-*-final-01, victim-final-01 e return-*; integração canônica retida como sensor distinto. [Relatório e limites](../reports/2026-09-12-eventbridge-minimal-runtime.md). Operador: Codex; personas representam perspectivas de teste. Os pareceres humanos permanecem no contrato de verificação.


## Expansão de autoria por mapa — 2026-09-14

PASS funcional: duas ordens, três abordagens/vítimas, recuo, mortes e retomada por arquivos genuínos. MAS-04/05/06: MA-C/D/E/F; famílias físicas/sobrenaturais, sacrifício/recuo e retomada. [Guia e entradas atuais](../guides/eventbridge-minimal-runtime.md#expansão-de-autoria-por-mapa--plano-de-execução-2026-09-14) · [Relatório](../reports/2026-09-12-eventbridge-minimal-runtime.md). Task29 é o join canônico; task16 registra execução e limites. A aprovação prévia de Gorvak é parcial de organização, sem aprovação implícita das demais superfícies. Os resultados históricos acima permanecem vinculados às respectivas fontes.


## Integração narrativa aprovada — 2026-09-18

Planejado, execução dirigida ainda não observada. Cobertura: S-03/04/06; B/D. [Guia corrente](../guides/approved-narrative-dialogue-staging.md) e [charter](../charters/CH-approved-narrative-dialogue-staging.md). Preservar os vereditos históricos acima; fonte aprovada não aprova render/escuta do candidato. Sem zoom/gamepad. Prisões ausentes continuam no bug existente; prosa/arte aceitas e refinamento do memorial não são reabertos.


## Textos atualizados — 2026-09-25

Campanha dirigida cobriu os 16 encontros e 48 rótulos, releitura A/B, recuo/reformação, falha A5-3, despedida de Gorvak e mortes A5/A1. Continue preservou fatos confirmados de abordagem e vítima. B4-1/B6-1 tiveram apenas paginação ajustada entre frases, validada em novo percurso. **PASS no escopo do incremento; implementação e conforto de leitura aceitos pelo usuário em 2026-09-26.** [Verificação, execuções, capturas e limites](../../../planos/tasks/updated-narrative-copy/verification.md). Os resultados históricos acima e aceites criativos independentes permanecem com seus próprios escopos.
