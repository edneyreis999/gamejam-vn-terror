# BUG-20260911-ownerless-bust-helper: Helper executa após início rejeitado

- **Status:** verified — focused regression and full current suite
- **Severity:** Medium · **Priority:** P1
- **Disciplina:** Programação · **Responsável:** Edney
- **Found:** 2026-09-11 · **Report:** ../reports/2026-09-11-vn-picture-busts-dialogues.md
- **Scenario:** ART-mz-visual-audio-runtime · **Review:** RD0001

Em uma integração nativa de autoria, `Conversation begin` com slots duplicados foi rejeitado, mas o `Call Common Event 71` seguinte criou Gorvak no slot 60 sem conversa responsável. Não foi observado em uma campanha corretamente autorada.

Reprodução no interpretador real: estado válido de Conselho, sem conversa ativa, comando `Conversation {kind:council, operation:begin, slots:60,60}`, chamada nativa 117 ao helper 71 e fim do evento. Esperado: rejeição e nenhum busto. Obtido: picture reservada permaneceu após terminar o helper.

Falha preservada: `task-09/2026-09-11T10-33-49-447Z`, IT-068, asserção `Rejected begin cannot run an ownerless presentation helper`; CLI passou. A regressão pertence ao teste canônico existente de autoria 2x2 e verifica também início fora da fase correta.

A correção exige conversa ativa e serial correspondente antes de chamar um helper marcado. `Present` também verifica a conversa esperada para trechos com bustos; início fora de fase/contexto informa rejeição. Comandos diretos de outros sistemas continuam pelo caminho nativo. Não altera dados, arte, checkpoint ou fatos de campanha.

Reteste: `task-09/2026-09-11T10-35-04-415Z`, IT-068 PASS e CLI exit 0; inclui os 20 textos 2x2, quatro focos, HIDE, frio/quente e normal/reduzido. A suíte completa pós-correção `task-09/2026-09-11T10-36-54-403Z` passou138/138, sem falhas/skips, CLI exit0. A segunda revisão confirmou a correção e não encontrou outro defeito de código. Nenhum commit foi criado.
