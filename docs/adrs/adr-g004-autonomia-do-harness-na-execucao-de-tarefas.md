# ADR-G004 — Autonomia do harness na execução de tarefas

- **Estado:** Aceita em 2026-09-18, por determinação explícita do usuário.
- **Escopo:** execução e retomada de grafos aprovados deste projeto, incluindo distribuição das verificações.
- **Origem:** adaptação da ADR-010 do Pixi-Rework, identificada em Rastreabilidade.
- **Relação:** complementada pela [ADR-G006](adr-g006-selecao-e-agrupamento-de-testes-pesados-por-risco.md), que autoriza omissões delimitadas de execuções redundantes; preserva a [ordem de autoridade](../_memory/spec-authoring-playbook.md#authority-order).

## Contexto

Uma tarefa pode receber provas de integração que só se tornam executáveis após tarefas posteriores. A distribuição documental pode bloquear o grafo mesmo quando o produto aprovado e suas dependências técnicas permitem continuar. O usuário adotou para este projeto a decisão de resolver esses impedimentos autonomamente, tomada no Pixi-Rework.

## Decisão

**O agente pode reorganizar a execução sem solicitar nova aprovação quando preservar o produto aprovado, as provas obrigatórias e os critérios de aceite.** Isso inclui ordem, dependências documentais e atribuição de responsabilidades de execução e verificação. Dependências técnicas reais continuam sendo respeitadas.

O contrato de produto define o resultado a preservar. A aprovação anterior do grafo e da matriz não exige nova autorização para ajustes organizacionais abrangidos por esta política. A reorganização não autoriza operar o Trello ou enviar mensagens fora do escopo autorizado da tarefa; a gestão da equipe segue o [workflow local](../_memory/trello-workflow.md).

## Aplicação e retomada

Ao encontrar um impedimento, identificar a obrigação afetada e distinguir dependência funcional de distribuição inadequada do trabalho. Quando houver uma reorganização válida, aplicá-la, reconciliar os documentos e continuar pelas dependências reais.

Registrar na task responsável o problema, a solução, os donos anteriores e novos e onde cada obrigação será encerrada. Atualizar o grafo, a verificação e a matriz existentes quando afetados, sem criar uma árvore paralela de memória ou status. Preservar aprovações e tentativas históricas.

Uma prova transferida conserva identidade, resultado esperado, sensor e aceite. A origem pode encerrar sua parcela reconciliada quando comprovada; o destino mantém a obrigação aberta até executá-la. Transferência não é conclusão, e uma funcionalidade ausente continua pendente. O fechamento final confere que nenhuma obrigação se perdeu entre os responsáveis.

## Limites

Reorganizar não autoriza retirar funcionalidades, variantes, sensores obrigatórios ou critérios de aceite, mudar o esperado para acomodar falhas, enfraquecer guardas ou substituir comportamento ausente por stub. A [ADR-G006](adr-g006-selecao-e-agrupamento-de-testes-pesados-por-risco.md) limita especificamente a proibição de retirar variantes de execução pesada: admite redundâncias comprovadas, preservando requisitos, riscos distintos, E2E e aceites humanos. A exclusão de gamepad tem autorização própria na [ADR-G005](adr-g005-exclusao-de-testes-de-gamepad.md).

Decisão de produto ainda pendente ou ação fora da autorização existente deve ser explicitada ao usuário. Continuar as parcelas independentes autorizadas, mantendo a pendência real. Julgamentos humanos continuam humanos. Preservar engine/plugins, inspeção de QA somente leitura e mutações da campanha exclusivamente por ações validadas do jogador.

Specs concluídas continuam baselines históricas. A reorganização da execução atual não reescreve seus resultados nem dispensa uma spec incremental para mudanças posteriores de comportamento.

## Alternativas e consequências

- Pedir aprovação para toda redistribuição foi rejeitado: transfere decisões operacionais ao usuário e interrompe trabalho autorizado.
- Reorganizar sem rastrear obrigações foi rejeitado: pode reduzir silenciosamente a entrega.
- A autonomia delimitada permite continuar, mas exige conferir os vínculos entre obrigações, responsáveis e evidências. O risco principal é tratar mudança de escopo como organização.

## Rastreabilidade

Em 2026-09-18, o usuário solicitou ler as ADRs 010, 011 e 012 do Pixi-Rework e adaptar as mesmas regras a este projeto, afirmando que suas decisões arquiteturais também se aplicam aqui.

Fonte: `rpg-maker-coreto-rework/Pixi-Rework/docs/adr/010-autonomia-do-harness-na-execucao-de-tarefas.md`, no repositório irmão, lida nesta adoção. O caso histórico da migração Message Core permanece na origem; não constitui evidência de execução deste jogo. Esta ADR é autossuficiente e não importa outras ADRs ou exigências de qualificação do Pixi-Rework por transitividade.

A adoção registra a política vigente; não modifica o código das skills nem declara qualificação adicional de executores ou sensores.
