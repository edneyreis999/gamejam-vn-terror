---
id: ART-mz-human-approval
area: ART
title: Registrar o aceite humano de conteúdo e arte
persona: Rui, revisor de conteúdo
journey: J-mz-creative-review
expected: Pessoas registram os quatro pareceres aplicáveis de autoria, UI/leitura, memorial e áudio perceptível desta implementação.
entry_points: http://127.0.0.1:18726/; rpg-maker/The Dryland Drowned/game.rmmzproject
qa_status: blocked-verify
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
