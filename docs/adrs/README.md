# Decisões de arquitetura do projeto

Este acervo reúne decisões gerais aceitas para o jogo. As ADRs locais das specs continuam como histórico e como contratos aplicáveis onde não houver substituição explícita. O prefixo **G** distingue a numeração geral das numerações locais; promover uma decisão não renumera seu registro de origem.

| ADR | Decisão | Estado | Data |
| --- | --- | --- | --- |
| [ADR-G001](adr-g001-mapas-de-interacao-dos-herois.md) | Autoria das interações dos heróis em mapas próprios | Aceita; implementada nos oito heróis | 2026-09-14 |
| [ADR-G003](adr-g003-excluir-testes-de-zoom-nativo.md) | Exclusão de testes de zoom nativo da matriz de QA | Aceita | 2026-09-14 |
| [ADR-G002](adr-g002-remocao-de-atalhos-editoriais.md) | Remoção de eventos de mapa que servem apenas como atalhos editoriais | Aceita; aplicada aos 42 eventos inventariados | 2026-09-14 |
| [ADR-G004](adr-g004-autonomia-do-harness-na-execucao-de-tarefas.md) | Autonomia para reorganizar a execução preservando produto, provas e aceite | Aceita | 2026-09-18 |
| [ADR-G005](adr-g005-exclusao-de-testes-de-gamepad.md) | Exclusão de testes de gamepad das campanhas atuais e futuras | Aceita | 2026-09-18 |
| [ADR-G006](adr-g006-selecao-e-agrupamento-de-testes-pesados-por-risco.md) | Seleção e agrupamento de testes pesados por risco; encerramento dos recursos de teste | Aceita | 2026-09-18 |

As ADRs G004–G006 adaptam, por determinação do usuário em 2026-09-18, as decisões 010–012 do projeto Pixi-Rework. Aplicam-se ao planejamento, execução, retomada e fechamento deste jogo, sem nova aprovação para cada reorganização ou omissão elegível. Cada ADR identifica a origem e seus limites locais; nenhuma importa outras decisões do projeto de origem por transitividade. Planos atuais devem ser reconciliados quando a política for aplicada, preservando baselines concluídas, evidências históricas e aceites humanos. A adoção não declara testes executados ou pendências encerradas.

A aprovação é de arquitetura e organização. Os demais julgamentos de UI, arte, narrativa e áudio mantêm seus estados na [verificação da entrega](../../planos/tasks/eventbridge-minimal-runtime/verification.md#human-acceptance). A análise posterior foi incorporada ao [plano de expansão](../../planos/tasks/eventbridge-minimal-runtime/adrs/adr-006.md); a implementação e os sensores de cada fatia constam do grafo e da verificação da spec.

A [revisão de substituições](revisao-2026-09-14.md) registra o exame das 73 ADRs de origem, os recortes substituídos e os contratos preservados. Cada nova substituição tem link de ida e volta. Os registros antigos afetados, antes disponíveis apenas em `.compozy/tasks/` ignorado pelo Git, foram preservados em `historico/` com sua proveniência; os demais arquivos legados não são dependências deste acervo.

Consulte também o [GDD canônico, §26.1](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md#261-autoria-das-interações-e-acessos-editoriais--2026-09-14) e a [ordem de autoridade](../_memory/spec-authoring-playbook.md#authority-order).

A expansão posterior acrescenta quatro substituições parciais, registradas com links recíprocos na [ADR-006](../../planos/tasks/eventbridge-minimal-runtime/adrs/adr-006.md): init ADR-016/017/018 e eventbridge ADR-002. O inventário de73 da promoção permanece histórico.
