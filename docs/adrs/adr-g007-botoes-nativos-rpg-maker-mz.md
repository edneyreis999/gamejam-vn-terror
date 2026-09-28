# ADR-G007 — Padronização de botões com o sistema nativo do RPG Maker MZ

- **Estado:** Aceita em 2026-09-28, por solicitação explícita do usuário.
- **Escopo:** implementação e alteração de botões de escolha nas interfaces do jogo, quando compatíveis com uma lista nativa de escolhas.
- **Referência:** CE002, `Interface — Título e aviso etário`, em [CommonEvents.json](../../rpg-maker/The%20Dryland%20Drowned/data/CommonEvents.json), especificamente as escolhas da tela de título.
- **Autoridade:** respeita a [ordem de autoridade do projeto](../_memory/spec-authoring-playbook.md#authority-order) e os contratos de produto existentes. A aceitação desta decisão não declara uma migração de todas as telas concluída.

## Contexto

O título fornece a referência visual para os botões de escolha: utiliza o sistema de janelas do RPG Maker MZ. Recriar cada botão com pictures independentes duplica apresentação e tratamento de interação, com risco de inconsistência. Adicionar uma lista sobre controles existentes para obter essa estética também pode duplicar ações e encobrir elementos da composição, como os retratos dos heróis.

A padronização precisa preservar as funções e a composição das telas. Nem toda interface é representável como uma lista de escolhas, e a referência do título não impõe essa estrutura aos demais controles.

## Decisão

Para listas de escolhas compatíveis, utilizar `Window_ChoiceList` do RPG Maker MZ, com as integrações já aprovadas do projeto. O próprio componente deve renderizar as opções; não criar pictures independentes ou imagens de botão sobrepostas para reproduzir sua aparência.

O padrão compreende:

- Windowskin do projeto em `img/system/Window.png`, relativo à pasta do jogo, usando sua moldura e seu fundo.
- Fonte e cores provenientes do sistema de janelas do RPG Maker, sem uma paleta ou tipografia paralela por botão.
- Foco/seleção, confirmação/pressionamento, desabilitação e navegação por teclado e toque tratados pelo componente e pelas integrações existentes, quando aplicáveis. Não inventar uma imagem ou animação de estado pressionado que o componente não ofereça.
- Preservação de ações, condições de habilitação, cancelamento e comportamento funcional existentes.
- Largura configurada por `<Choice Width: x>` quando necessário e suportado pela integração existente. No CE002, a referência é `<Choice Width: 352>`; esse valor não é uma dimensão obrigatória para todas as telas.

`<Choice Width: x>` é uma tag oferecida pelo `VisuMZ_1_MessageCore` instalado, cuja documentação define a largura mínima da área de texto. Não é um comando do MZ sem plugins nem uma garantia de largura externa total da janela. A decisão não autoriza editar a engine, plugins congelados ou acrescentar dependências.

## Implementação de referência

No CE002, os comandos nativos Mostrar Escolhas (código 102) apresentam `Novo jogo<Choice Width: 352>`, `Continuar` e `Configurações`. O ramo sem save utiliza `Continuar<Disable>`. A referência é esse menu renderizado por `Window_ChoiceList`, não todas as pictures ou todos os fluxos chamados pelo CE002.

Consultar os eventos, o [windowskin](../../rpg-maker/The%20Dryland%20Drowned/img/system/Window.png), a documentação local do [MessageCore](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_1_MessageCore.js) e as integrações de [Dryland_Presentation](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/Dryland_Presentation.js) antes de reutilizar o padrão. Preservar os contratos existentes de foco e input.

## Exceções para interfaces incompatíveis

Não forçar `Window_ChoiceList` quando a estrutura ou interação exigir outro componente: controles espaciais associados a retratos, áreas clicáveis sobre uma composição, caixas de seleção, sliders ou janelas especializadas como Configurações. Nesses casos:

1. Preservar os controles originais, suas ações e áreas de interação; aplicar a estética do sistema de janelas na apresentação existente onde for compatível.
2. Não acrescentar uma segunda lista, um segundo conjunto de botões ou controles sobrepostos para simular a padronização. Não mover ou redimensionar as imagens dos heróis para acomodar uma lista; preservar as restrições de composição da tela.
3. Reutilizar componentes, assets e comportamentos aprovados. Pictures de ilustração e controles cuja estrutura dependa delas não ficam globalmente proibidos por esta decisão.
4. Registrar na spec ou descrição da alteração o controle afetado, a incompatibilidade concreta e a solução adotada. Uma preferência estética isolada não justifica abandonar o componente nativo em uma lista compatível.

Essas exceções fazem parte da decisão e não exigem nova aprovação a cada aplicação. Uma mudança de função, composição aprovada ou contrato arquitetural fora desses limites exige explicitar o conflito e registrar a decisão substituta conforme a autoridade do projeto.

## Aplicação e verificação

Antes de alterar a interface, identificar os controles atuais, sua autoria e a aplicabilidade desta ADR. Em pedidos de ajuste visual, modificar a apresentação dos controles existentes, sem duplicar controles nem alterar suas funções. Uma migração estrutural precisa estar no escopo autorizado.

Ao implementar mudanças visuais ou funcionais, verificar proporcionalmente ausência de duplicação e sobreposição, legibilidade, foco, navegação, confirmação, cancelamento e opções desabilitadas, quando aplicáveis. Seguir a [ADR-G006](adr-g006-selecao-e-agrupamento-de-testes-pesados-por-risco.md) para selecionar as provas necessárias.

Esta entrega registra a política e seus pontos de consulta; não altera o runtime nem certifica visualmente todas as telas. Não substitui decisões de produto anteriores. Futuras substituições desta política devem ser explícitas e manter a rastreabilidade entre ADRs.

## Alternativas e consequências

- Botões independentes feitos de pictures para listas compatíveis foram rejeitados: duplicam o trabalho já realizado pelo sistema de janelas.
- Converter toda interface em `Window_ChoiceList` foi rejeitado: compromete controles e composições incompatíveis.
- Reutilizar o componente nativo nas listas compatíveis reduz a duplicação; preservar controles especializados exige justificar a exceção e conferir a consistência visual no contexto de cada tela.
