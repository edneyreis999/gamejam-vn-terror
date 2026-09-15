# Pendência conhecida: avaliar pré-carregamento de imagens

Data: 2026-09-12. Estado: **proposta para investigação futura; sem implementação ou reprodução de defeito**.

**Atualização posterior no mesmo dia:** o usuário incluiu o pré-carregamento de **todas as imagens da taverna** na spec eventbridge-minimal-runtime, usando CoreEngine → System: Load Images. Esse recorte está aprovado para implementação no [ADR-003](../../planos/tasks/eventbridge-minimal-runtime/adrs/adr-003.md), ainda sem execução. Esta pendência passa a tratar o pré-carregamento do restante do jogo; a exclusão original abaixo é histórica no que se refere à taverna.

## Solicitação

Durante a entrevista sobre simplificação do EventBridge, o usuário sugeriu pré-carregar imagens antes de começar a partida para evitar esperas nas cenas. Pediu registrar a ideia como uma pendência em `docs/known-issues` e explicitou que ela **não deve integrar a spec atual de simplificação do Bridge**.

## Evidência disponível

O cabeçalho do [CoreEngine instalado](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_0_CoreEngine.js), linha 39 no levantamento inicial, anuncia pré-carregamento durante a inicialização. A inspeção posterior do CoreEngine 1.90 confirmou o comando SystemLoadImages com seletores de arquivos: ele solicita carregamento sem esperar sua conclusão. O [ADR-002](../../planos/tasks/eventbridge-minimal-runtime/adrs/adr-002.md) registra a pesquisa. A cobertura inicial da taverna reúne 29 arquivos existentes; configuração e comportamento efetivos ainda precisam da implementação e dos sensores da spec.

A existência anunciada do recurso não demonstra que ele resolve todas as esperas. Também não explica nem corrige, por si só, a tela preta relatada ao desativar o Bridge: a [análise da dependência de campanha](../design/2026-09-12-eventbridge-runtime-e-entrevista.md) identificou acessos ao estado que o plugin inicializa. Esse é outro problema.

## Investigação futura

1. Conferir o recurso de pré-carregamento do CoreEngine e sua configuração pelo editor; priorizar o plugin já instalado.
2. Identificar quais imagens precisam estar prontas antes da primeira cena e quais são usadas apenas posteriormente.
3. Medir o efeito na primeira abertura sem cache, no tempo de inicialização e no consumo de memória. Verificar Novo jogo, Continuar e a primeira exibição dos assets afetados.
4. Confirmar a interação com MZ e VNPictureBusts, inclusive imagens que precisem ser carregadas depois da inicialização e o tratamento nativo de arquivos ausentes.

Não presumir que carregar todas as imagens antecipadamente seja necessário. A investigação não autoriza recriar um carregador no Bridge ou o inventário obrigatório de assets cuja remoção foi aprovada.

## Escopo e estado

O pré-carregamento geral permanece fora da spec atual; a taverna é a exceção posteriormente solicitada e incluída em RQ-009/ADR-003. A decisão B3e de retirar a interferência global do Bridge no carregamento permanece vigente. Não houve alteração de configuração, código, assets, teste de execução ou publicação remota por esta atualização documental.
