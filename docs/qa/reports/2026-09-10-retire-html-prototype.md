# QA — retirada da implementação HTML — 2026-09-10

**Resultado:** PASS no escopo aprovado de verificações estáticas, unitárias e documentais; aceite final recebido em 2026-09-10 (“está aprovado”). O jogo atual fica exclusivamente em `rpg-maker/The Dryland Drowned/`.

Contrato: [spec e verificação](../../../planos/tasks/retire-html-prototype/verification.md). Plano: [verificação estática e unitária](../guides/retire-html-prototype-verification.md).

| Critério | Resultado | Evidência local |
| --- | --- | --- |
| V-001 — retirada e dependências | A árvore antiga foi removida; 28 ferramentas obsoletas retiradas. 19 snapshots históricos classificados por engano foram restaurados com os bytes originais. | task-02/20260910-01 e correção task-02/20260910-02 |
| V-002 — documentação | Orientações atuais usam MZ; referências navegáveis antigas retiradas; três achados semânticos corrigidos e confirmados por revisão independente. | task-04/20260910-01 |
| V-003 — conteúdo e testes | 65 testes unitários passaram; fixtures negativas detectaram ausência de passagem, ordem alterada e ramo ausente. O teste de conteúdo deixou de importar código retirado. | task-02 e execução final task-03/20260910-01 |
| V-004 — preservação | 1.326 assets com mesmos caminhos e bytes; 50 JSON comparados, permitindo somente a anotação identificada. Manifesto atualizado para mz-20260910-retirement-01; validador aprovado. | task-03/20260910-01 e task-06/20260910-01 |
| V-005 — envelopes | UT-044/045/058 aprovados: round trip, rejeição de dados incompatíveis/inválidos e preservação dos finais. | task-03/20260910-01/selected-case-results |
| V-006 — aceite dos documentos | Aprovado pelo usuário: “está aprovado”. | 2026-09-10; [registro do aceite](../deliveries/retire-html-prototype/human-acceptance.json) |

As evidências acima ficam sob `docs/qa/evidence/retire-html-prototype/`, ignoradas pelo Git. A [revisão independente](../../../planos/tasks/retire-html-prototype/implementation-review.md) registra escopo e correções. Os originais externos estão identificados no manifesto da task 01.

Com Node v22.23.2, a execução final usou uma cópia isolada e o comando `node --test --test-name-pattern='^UT-(?!059)[0-9]{3}' rpg-maker/tests/campaign.test.mjs`: 65 aprovados, zero falhas, exit 0. O validador `node rpg-maker/tools/validate-content.mjs --json` retornou ok e exit 0. A revisão final confirmou equivalência dos inputs e `git diff --check` sem erros.

Chrome, UT-059, todos os ITs, gameplay, screenshots, áudio e armazenamento real não foram executados, conforme exclusão aprovada. Os testes unitários não demonstram essas superfícies. Os assets do RPG Maker e os arquivos de save não foram alterados; a mudança de revisão segue a política existente de incompatibilidade sem migração.

Na execução e organização aqui relatadas, as alterações anteriores do usuário foram preservadas e não houve commit, publicação ou ação no Trello. A organização pós-aceite está registrada no [material da entrega](../deliveries/retire-html-prototype/README.md); o arquivo de originais foi preservado.

Na revisão seguinte de 2026-09-10, foram corrigidas duas indicações desatualizadas de andamento no grafo e no contrato de Programação. A execução `task-06/20260910-02` reconfirmou os hashes dos 42 inputs dos testes, os 1.326 assets e a comparação dos 50 JSON, com apenas a anotação autorizada alterada. O validador passou novamente com Node v26.7.0, exit 0. Os 65 testes não foram repetidos: seus resultados anteriores continuam aplicáveis por equivalência dos inputs. O aceite V-006 estava pendente nessa revisão e foi recebido em seguida.

A conferência de links também encontrou no GDD um link já quebrado em HEAD para o antigo inventário de pendências v0.4. A menção histórica foi preservada como texto, informando que o documento não está nesta árvore; nenhuma decisão de design foi alterada.
