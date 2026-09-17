---
id: ART-mz-visual-audio-runtime
area: ART
title: Revisar a apresentação audiovisual do pacote
persona: Rui, revisor de conteúdo
journey: J-mz-creative-review
expected: Telas permanecem legíveis e os contextos, temas e efeitos possuem revisão audiovisual registrada.
entry_points: http://127.0.0.1:18726/; rpg-maker/The Dryland Drowned/game.rmmzproject
qa_status: untested
bug_ids: BUG-20260911-tavern-portraits-offscreen
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/reports/2026-09-12-eventbridge-minimal-runtime.md
last_report: docs/qa/reports/2026-09-12-eventbridge-minimal-runtime.md
overlaps: LOC-mz-session-recovery-export
---

Cobertura primária: E2E-018, E2E-020, V-VISUAL, V-AUDIO.

[Plano e receitas](../guides/native-mz-cycle.md). Usar ações reais de jogador no runtime MZ; fixtures diretas de estado pertencem somente à integração. A aprovação humana e a audição real não podem ser inferidas de nomes de arquivos, hashes, decodificação ou screenshots.

Retomada da baseline anterior: Muitas superfícies e três finais inspecionados; matriz visual maior completa e audição efetiva pendentes.

Aceite humano final informado pelo usuário em2026-09-10: “está aprovado pelos testes humanos”. Registro: docs/qa/deliveries/init-rpg-maker-mz/human-acceptance.json. Supera bloqueios humanos históricos; refinamento narrativo conhecido não foi corrigido.

## Incremento vn-picture-busts-dialogues — 2026-09-11

Estado deste incremento: **FAIL em V007: prisões visíveis ausentes; BLOCKED em V008: sensor do editor indisponível. Demais composições inspecionadas e fixture2x2 passam no escopo**. O `qa_status` e o aceite humano acima pertencem à baseline indicada em seu relatório; não são promovidos para os novos bustos. V007/D09:12assets,21combinações elegíveis de slot,3x1/2x2, duas áreas/movimentos, faces/textos/foco/transições/reflexão/prisões. LotesT/C/R/I/Z/L/F. Zero deslocamento não comprova prisão visível; inspeção de amante sobre fundo é obrigatória.

[Guia e variantes](../guides/vn-picture-busts-dialogues.md) · [Charter](../charters/CH-vn-picture-busts-dialogues.md). A tarefa09 registra evidência e veredito incremental sem apagar o histórico. Fonte relevante alterada reabre somente os sensores afetados.

Resultado consolidado no [relatório de2026-09-11](../reports/2026-09-11-vn-picture-busts-dialogues.md). A cobertura atual e a retenção qualificada das capturas anteriores estão separadas; nenhum aceite humano desta composição é alegado.

## Final verify pr3-taverna — 2026-09-11

**FAIL para o enquadramento dos retratos:** Elowen e Vaelith ficam fora da tela nos quadros iniciais; outros heróis ficam excessivamente ampliados. Reproduzido também com os dados da main. O palco e as interações preservadas do PR passam. [Defeito](../bugs/BUG-20260911-tavern-portraits-offscreen.md) · [evidências e escopo](../../../planos/tasks/pr3-taverna/verification.md). Os aceites históricos acima mantêm seu escopo; este resultado não os reinterpreta nem declara nova aprovação artística.

## Incremento eventbridge-minimal-runtime — 2026-09-12

Planejado, **untested**. S04/S05/S06T/S08/S10/S11/S12; lotes B/C/D/E/G/H. Sessões: CH-mz-audio-review; CH-mz-campaign-terminal-matrix. [Guia corrente](../guides/eventbridge-minimal-runtime.md) · [Relatório](../reports/2026-09-12-eventbridge-minimal-runtime.md). Todos os resultados anteriores acima mantêm seu escopo histórico. Estado anterior do tracker: `fail`; relatório: `planos/tasks/pr3-taverna/verification.md`; evidência: `docs/qa/deliveries/pr3-taverna/README.md`. Não há campanha dirigida ou aceite humano novo declarado por esta atualização.


## Execução eventbridge-minimal-runtime — 2026-09-13

Estado corrente: **blocked-verify**. Memorial0/1/3/8, transições/ausências e créditos têm integração e imagens inspecionadas; continuidade e áudio BGS/ME/SE têm observação nativa, BGM tem equivalência isolada sem introduzir música nova. Não há audição humana nem aceite de enquadramento/controle; esses limites impedem PASS global. [Relatório e limites](../reports/2026-09-12-eventbridge-minimal-runtime.md). Operador: Codex; personas representam perspectivas de teste. Os pareceres humanos permanecem no contrato de verificação.


## Expansão de autoria por mapa — 2026-09-14

blocked-verify: enquadramento do Conselho reprovado; epílogos corrigidos; áudio nativo observado, sem audição humana. MAS-01/03/05/06: MA-A/B/C/D/E/F/G/H; imagens em dois viewports/modos e trilhas renderizadas. [Guia e entradas atuais](../guides/eventbridge-minimal-runtime.md#expansão-de-autoria-por-mapa--plano-de-execução-2026-09-14) · [Relatório](../reports/2026-09-12-eventbridge-minimal-runtime.md). Task29 é o join canônico; task16 registra execução e limites. A aprovação prévia de Gorvak é parcial de organização, sem aprovação implícita das demais superfícies. Os resultados históricos acima permanecem vinculados às respectivas fontes.


## Incremento prologo-rheed — 2026-09-17

**Plano inicial — histórico, executado conforme fechamento abaixo.** S01/S05; lotes A/C; V-002/V-004/V-005; matriz visual, bustos e audição sem muting global. [Plano dirigido](../guides/prologo-rheed.md) · [Relatório](../reports/2026-09-17-prologo-rheed.md). Os vereditos anteriores mantêm seu escopo; o ciclo novo não altera os passes históricos nem infere aceite humano. Resultados técnicos da task 01 são apoio limitado, não execução destes lotes.


### Execução prologo-rheed — 2026-09-17

Ciclo concluído no [relatório](../reports/2026-09-17-prologo-rheed.md#fechamento-do-ciclo): A1–A4, controles e retomada atual verificados; áudio confirmado pelo usuário. O suposto bug visual foi encerrado como falso positivo. Saves antigos e dois refinamentos visuais foram excluídos pelo usuário. Veredito PASS no escopo acordado; resultados históricos preservados.
