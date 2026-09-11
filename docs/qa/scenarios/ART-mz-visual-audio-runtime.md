---
id: ART-mz-visual-audio-runtime
area: ART
title: Revisar a apresentação audiovisual do pacote
persona: Rui, revisor de conteúdo
journey: J-mz-creative-review
expected: Telas permanecem legíveis e os contextos, temas e efeitos possuem revisão audiovisual registrada.
entry_points: http://127.0.0.1:18726/; rpg-maker/The Dryland Drowned/game.rmmzproject
qa_status: fail
bug_ids: BUG-20260911-tavern-portraits-offscreen
fix_status: pending
retest_status:
fix_commits:
evidence: docs/qa/deliveries/pr3-taverna/README.md
last_report: planos/tasks/pr3-taverna/verification.md
overlaps: LOC-mz-session-recovery-export
---

Cobertura primária: E2E-018, E2E-020, V-VISUAL, V-AUDIO.

[Plano e receitas](../guides/native-mz-cycle.md). Usar ações reais de jogador no runtime MZ; fixtures diretas de estado pertencem somente à integração. A aprovação humana e a audição real não podem ser inferidas de nomes de arquivos, hashes, decodificação ou screenshots.

Retomada atual: Muitas superfícies e três finais inspecionados; matriz visual maior completa e audição efetiva pendentes.

Aceite humano final informado pelo usuário em2026-09-10: “está aprovado pelos testes humanos”. Registro: docs/qa/deliveries/init-rpg-maker-mz/human-acceptance.json. Supera bloqueios humanos históricos; refinamento narrativo conhecido não foi corrigido.

## Incremento vn-picture-busts-dialogues — 2026-09-11

Estado deste incremento: **FAIL em V007: prisões visíveis ausentes; BLOCKED em V008: sensor do editor indisponível. Demais composições inspecionadas e fixture2x2 passam no escopo**. O `qa_status` e o aceite humano acima pertencem à baseline indicada em seu relatório; não são promovidos para os novos bustos. V007/D09:12assets,21combinações elegíveis de slot,3x1/2x2, duas áreas/movimentos, faces/textos/foco/transições/reflexão/prisões. LotesT/C/R/I/Z/L/F. Zero deslocamento não comprova prisão visível; inspeção de amante sobre fundo é obrigatória.

[Guia e variantes](../guides/vn-picture-busts-dialogues.md) · [Charter](../charters/CH-vn-picture-busts-dialogues.md). A tarefa09 registra evidência e veredito incremental sem apagar o histórico. Fonte relevante alterada reabre somente os sensores afetados.

Resultado consolidado no [relatório de2026-09-11](../reports/2026-09-11-vn-picture-busts-dialogues.md). A cobertura atual e a retenção qualificada das capturas anteriores estão separadas; nenhum aceite humano desta composição é alegado.

## Final verify pr3-taverna — 2026-09-11

**FAIL para o enquadramento dos retratos:** Elowen e Vaelith ficam fora da tela nos quadros iniciais; outros heróis ficam excessivamente ampliados. Reproduzido também com os dados da main. O palco e as interações preservadas do PR passam. [Defeito](../bugs/BUG-20260911-tavern-portraits-offscreen.md) · [evidências e escopo](../../../planos/tasks/pr3-taverna/verification.md). Os aceites históricos acima mantêm seu escopo; este resultado não os reinterpreta nem declara nova aprovação artística.
