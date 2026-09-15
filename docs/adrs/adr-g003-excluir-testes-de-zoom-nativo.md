# ADR-G003 — Excluir testes de zoom nativo da matriz de QA

- **Estado:** Aceita em 2026-09-14.
- **Autoridade:** decisão explícita do usuário: não continuar testando zoom nativo, considerado “over testing”.
- **Escopo:** planejamento, execução e critérios de aceite de QA do jogo; aplicação imediata em `eventbridge-minimal-runtime`.
- **Substitui parcialmente:** a exigência de variantes de zoom nos [cenários da verificação](../../planos/tasks/eventbridge-minimal-runtime/verification.md#runtime-scenarios), no [plano da task16](../../planos/tasks/eventbridge-minimal-runtime/task-16.md) e no [guia de QA](../qa/guides/eventbridge-minimal-runtime.md).

## Contexto

A matriz de QA passou a exigir zoom real de110% no Chrome, além das resoluções desktop e dos modos de movimento. Essa variante exigiu preparação da interface do navegador, distinção entre tamanho de janela, área útil, DPR e escala da captura, e novas execuções após mudanças de conteúdo.

Na expansão de autoria por mapa, `surfaces-zoom-01` parou no preflight porque o controle nativo selecionava outra instância do Chrome. Não houve falha de jogo demonstrada nesse lote. A ausência do sensor, contudo, tornou-se bloqueadora da entrega.

O usuário considera esse esforço desproporcional ao risco e ao objetivo do projeto. O problema é a obrigatoriedade recorrente dessa dimensão de teste. A decisão não depende de consertar o controle da janela nem afirma que testes de zoom sejam inúteis em qualquer produto.

## Decisão

Retirar o zoom nativo do navegador da matriz de QA. Não planejar, executar ou repetir variantes de110%,200% ou outros fatores de ampliação como condição de conclusão de tasks, specs ou entregas. Não usar mudança de DPR, escala de imagem ou simulação de viewport como substituto desse teste retirado.

Manter as verificações de área desktop suportada, resoluções1280×720 e1920×1080, movimento normal/reduzido, legibilidade, foco, navegação por teclado/mouse, HIDE, FAST e continuidade. Essas verificações usam o navegador em escala padrão, sem uma matriz adicional de zoom.

O zoom continua sendo um recurso do navegador. Esta ADR não o desativa, não altera engine/plugins e não declara suporte de zoom verificado. Os requisitos de apresentação do jogo completo no GDD não reintroduzem automaticamente uma campanha de testes de zoom. Uma futura revisão desta decisão deve ser explícita e motivada por uma necessidade de produto ou defeito concreto.

## Aplicação e histórico

Na task16, o sensor de110% passa de bloqueado para **fora do escopo por decisão aprovada**. A tentativa que expirou continua registrada como falha de preflight histórica; não é convertida em PASS. As capturas e resultados anteriores permanecem evidência dos seus próprios períodos.

O guia deixa de prescrever `DRYLAND_QA_ZOOM=110`. Variantes de zoom ainda presentes em código de teste legado não constituem obrigação vigente: devem ser retiradas da seleção executável pelo seu proprietário antes de uma nova execução dessa matriz. Esta alteração documental não declara essa limpeza de código realizada e não autoriza repetir testes de zoom para validá-la.

Os defeitos de enquadramento do Conselho e das despedidas, assim como os pareceres humanos de autoria, UI, memorial e áudio, conservam seus estados. Excluir um sensor não aprova esses itens.

## Alternativas e consequências

- **Continuar reparando a automação de110%:** rejeitado; mantém o custo que motivou a decisão.
- **Trocar por zoom simulado:** rejeitado; conserva uma dimensão de QA retirada e mede comportamento diferente.
- **Excluir toda a verificação visual:** rejeitado; enquadramento, leitura e controles seguem relevantes para a experiência jogada.

A matriz fica menor e a entrega deixa de depender do controle da ampliação do navegador. Em contrapartida, regressões que ocorram exclusivamente sob zoom nativo podem passar despercebidas. Esse limite é assumido; não há alegação de cobertura equivalente.

## Rastreabilidade

A [verificação atual](../../planos/tasks/eventbridge-minimal-runtime/verification.md#exclusão-de-zoom-nativo--adr-g003), a [task16](../../planos/tasks/eventbridge-minimal-runtime/task-16.md#exclusão-de-zoom-nativo--adr-g003), o [guia](../qa/guides/eventbridge-minimal-runtime.md) e o [GDD canônico](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md#11-relação-com-o-protótipo-v20) apontam de volta para esta ADR. Nenhuma ADR-G001/G002 ou ADR local de autoria é substituída: o recorte alterado é o contrato de QA.
