---
id: ART-mz-human-approval
area: ART
title: Registrar o aceite humano de conteúdo e arte
persona: Rui, revisor de conteúdo
journey: J-mz-creative-review
expected: Pessoas registram os quatro pareceres aplicáveis de autoria, UI/leitura, memorial e áudio perceptível desta implementação.
entry_points: http://127.0.0.1:18726/; rpg-maker/The Dryland Drowned/game.rmmzproject
qa_status: untested
bug_ids: BUG-20260909-memorial-survivors-total-loss
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/reports/2026-09-12-eventbridge-minimal-runtime.md
last_report: docs/qa/reports/2026-09-12-eventbridge-minimal-runtime.md
overlaps:
---

Cobertura primária: V-HUMAN.

[Plano e receitas](../guides/native-mz-cycle.md). Usar ações reais de jogador no runtime MZ; fixtures diretas de estado pertencem somente à integração. A aprovação humana e a audição real não podem ser inferidas de nomes de arquivos, hashes, decodificação ou screenshots.

Retomada da baseline anterior: Sem parecer humano final de arte, editorial/cultura e atribuições.

Aceite humano final informado pelo usuário em2026-09-10: “está aprovado pelos testes humanos”. Registro: docs/qa/deliveries/init-rpg-maker-mz/human-acceptance.json. Supera bloqueios humanos históricos; refinamento narrativo conhecido não foi corrigido.

## Incremento eventbridge-minimal-runtime — 2026-09-12

Planejado, **untested**. Quatro julgamentos delimitados em verification.md; autoria/UI/memorial/áudio. Sessões: Parecer humano depois dos materiais dos lotes A/C/D/G. [Guia corrente](../guides/eventbridge-minimal-runtime.md) · [Relatório](../reports/2026-09-12-eventbridge-minimal-runtime.md). Todos os resultados anteriores acima mantêm seu escopo histórico. Estado anterior do tracker: `pass`; relatório: `docs/qa/reports/2026-09-09-native-mz-playtest.md`; evidência: `docs/qa/reports/2026-09-09-native-mz-playtest.md`. Não há campanha dirigida ou aceite humano novo declarado por esta atualização.


## Execução eventbridge-minimal-runtime — 2026-09-13

Estado corrente: **blocked-verify**. Quatro pareceres humanos após implementação continuam pendentes: autoria sem JavaScript, clareza/conforto dos controles, memorial/composição e resposta audível de volume. Capturas, trilhas e resultados técnicos estão disponíveis no relatório; nenhum resultado do agente é tratado como aceite humano. [Relatório e limites](../reports/2026-09-12-eventbridge-minimal-runtime.md). Operador: Codex; personas representam perspectivas de teste. Os pareceres humanos permanecem no contrato de verificação.


## Expansão de autoria por mapa — 2026-09-14

blocked-verify: demonstração nativa de edição/reprodução PASS; quatro pareceres humanos continuam pendentes. MAV-014/MAS-07: MA-I e quatro julgamentos atribuídos; autoria, UI/controles, memorial e áudio. [Guia e entradas atuais](../guides/eventbridge-minimal-runtime.md#expansão-de-autoria-por-mapa--plano-de-execução-2026-09-14) · [Relatório](../reports/2026-09-12-eventbridge-minimal-runtime.md). Task29 é o join canônico; task16 registra execução e limites. A aprovação prévia de Gorvak é parcial de organização, sem aprovação implícita das demais superfícies. Os resultados históricos acima permanecem vinculados às respectivas fontes.


## Integração narrativa aprovada — 2026-09-18

Planejado, execução dirigida ainda não observada. Cobertura: V-004/006 e julgamentos aplicáveis; F. [Guia corrente](../guides/approved-narrative-dialogue-staging.md) e [charter](../charters/CH-approved-narrative-dialogue-staging.md). Preservar os vereditos históricos acima; fonte aprovada não aprova render/escuta do candidato. Sem zoom/gamepad. Prisões ausentes continuam no bug existente; prosa/arte aceitas e refinamento do memorial não são reabertos.
