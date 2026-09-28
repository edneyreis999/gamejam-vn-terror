# Container dos heróis preservava a intenção sem preservar a composição

- **Data do postmortem:** 27 de setembro de 2026.
- **Escopo:** tela de escolha de heróis na taverna e texto das caixas de diálogo.
- **Público:** programação, autoria de eventos, UI/UX e revisão de alterações do RPG Maker MZ.
- **Estado:** correção implementada e verificada no fluxo nativo; aceite visual humano e a conclusão agregada da spec continuam pertencendo ao task 13.
- **Fonte histórica da composição:** Git `c47c6fcbc847158d0f96c9ec3eab912f6de127e2`, CE038.
- **Fonte do ajuste:** `planos/tasks/prototype-feedback-refinement/apply-hero-dialogue-feedback.mjs` e os registros de verificação do task 03.

## Resumo

A tela de heróis passou por três estados que precisavam ser distinguidos.

Antes da execução da spec, cada retrato já fazia parte da composição da taverna. O evento comum mostrava a imagem original diretamente, centralizada nas posições do cenário e com escala de 35%, e mostrava o nome em uma etiqueta separada, 151 pixels abaixo do centro do retrato.

Durante a execução da spec, a implementação tentou transformar cada herói em um alvo visual único. Para isso, criou placas de 168×208 pixels, reduziu a arte para caber nelas e anexou imagem e nome à placa. A interação ficou mais explícita, mas a solução tratou a imagem como conteúdo do botão. Isso moveu e redimensionou uma arte que deveria continuar sendo parte do background composto da taverna.

Na correção mais recente, a composição histórica foi restaurada a partir do Git antes de qualquer nova implementação. Cada herói agora possui um grupo estrutural nativo, transparente e sem borda, construído ao redor da posição original. O retrato continua com a mesma origem, centro, posição e escala; o nome continua usando a etiqueta original. A correção também eliminou um defeito de interação descoberto depois: a área de Griznik interceptava o clique no nome visível de Elowen por causa da sobreposição das imagens originais.

## Impacto observado

O problema não era apenas estético. A implementação das placas alterava a leitura espacial da taverna e fazia os heróis parecerem cartões colocados sobre o cenário. Como as placas também passaram a definir os limites dos alvos, qualquer diferença de tamanho ou posição mudava a composição e o comportamento de seleção.

Depois da primeira correção estrutural, a aparência já estava restaurada, mas a ordem de hit testing ainda não correspondia à ordem visual no caso Elowen/Griznik. O jogador podia clicar em um nome que estava visível por cima e ativar o herói que estava abaixo. Esse defeito era específico da interação entre grupos sobrepostos; não exigia nem justificava mover os retratos.

O texto das caixas de diálogo tinha um problema separado: a tinta branca sobre a janela clara oferecia pouco contraste. O ajuste foi limitado ao corpo de `Window_Message`, usando `#211c14` e removendo o contorno escuro. A pele, a geometria, a fonte, o tamanho e a tipografia dos menus permaneceram inalterados.

## Linha do tempo

| Momento | Estado | Consequência |
| --- | --- | --- |
| Baseline Git `c47c6fc` | Retratos nativos em posições fixas: H1 `(344,520)`, H2 `(840,176)`, H3 `(760,497)`, H4 `(1000,448)`, H5 `(528,336)`, H6 `(368,160)`, H7 `(1032,224)`, H8 `(176,264)`; escala 35% | A arte compunha o background da taverna; nomes ficavam em `+151` no eixo Y | 
| Execução original do task 03 | Placas `Dryland_HeroContainer`, retratos ajustados para dentro das placas e nomes anexados a elas | O alvo ficou unificado, mas a composição foi deslocada e redimensionada | 
| Feedback manual | Usuário pediu revert baseado no histórico e um container sem fundo ou borda | A placa não podia continuar sendo a autoridade visual da imagem | 
| Correção estrutural | Oito `Dryland_HeroGroup_H1..H8` transparentes, com retrato e etiqueta nativos como filhos | Agrupamento sem pintura e com geometria histórica preservada | 
| Reprodução dirigida | Clique no nome de Elowen ativava Griznik em uma área sobreposta | A renderização e a prioridade de interação estavam divergentes | 
| Correção final | Hit testing de grupos respeita o grupo visível do topo | O nome visível recebe o clique correto sem mover nenhuma arte | 

## O que havia antes da spec

O baseline não tinha um container semântico único por herói. Ele tinha uma composição de imagens e etiquetas separadas, mas a geometria já estava definida pelo cenário. Essa distinção é importante: a ausência de um container estrutural não significava que a imagem estivesse livre para ser redimensionada.

O contrato implícito era:

```text
imagem do herói: origem central, posição do cenário, escala 35%
nome: etiqueta Dryland_Tag, mesma posição X, posição Y + 151
```

A composição tinha sobreposições intencionais. Em particular, a silhueta de Griznik passa atrás da área onde o nome de Elowen é desenhado. Qualquer solução de interação precisa preservar essa camada visual e decidir explicitamente qual elemento recebe o clique.

## O que a implementação da spec tentou fazer

O task 03 precisava tornar cada herói um alvo visível e selecionável, com estados nativos de foco, seleção, HIDE e limpeza. A implementação escolheu uma placa como base de cada alvo e anexou retrato e nome a ela. Isso resolveu parte do problema de associação semântica, mas criou uma autoridade geométrica paralela:

1. a placa passou a definir o tamanho do alvo;
2. a arte foi encaixada em uma área menor;
3. a posição da arte deixou de ser a posição histórica do cenário;
4. o nome passou a depender do novo sistema de coordenadas;
5. o preload passou a tratar as placas como os assets principais.

O resultado atendia à ideia de “um alvo por herói”, mas não ao requisito visual de que a imagem continuasse compondo o background. O erro foi de modelagem: a implementação confundiu o container de interação com um novo cartão visual.

## O que foi corrigido agora

A correção foi feita em três camadas.

### 1. Revert baseado em evidência

O CE038 do commit `c47c6fcbc847158d0f96c9ec3eab912f6de127e2` foi usado como referência, em vez de reconstruir as posições por aproximação. Os oito retratos foram comparados byte a byte com o baseline. Os nomes voltaram a usar `Dryland_Tag`, com seus parâmetros originais.

### 2. Container estrutural transparente

Foram criados oito assets PNG totalmente transparentes para fornecer os limites nativos dos grupos. Eles não contêm pintura, fundo, borda ou placeholder. O grupo é posicionado no centro histórico do retrato, em escala 100%; o retrato filho usa escala 35% e posição local `(0,0)`; a etiqueta usa posição local `(0,151)`.

H2 e H3 usam as camadas nativas `12` e `11`, nessa ordem, para que o nome de Elowen permaneça acima da silhueta de Griznik. Essa troca de camada não altera a posição ou o tamanho de nenhuma das duas imagens.

### 3. Prioridade de interação e contraste

O plugin de apresentação agora impede que um grupo inferior responda quando outro grupo de herói visível está por cima da mesma área. A regra fica na fronteira de hit testing existente, sem criar um segundo sistema de botões.

O corpo das mensagens usa `#211c14` e contorno zero em `Window_Message.resetFontSettings`. A amostra medida do fundo `#BAB196` contra essa tinta resultou em contraste WCAG de 7,91:1. O valor é uma amostra representativa da janela observada, não uma afirmação de que todos os pixels do fundo sejam uniformes.

## Causa raiz

Houve duas causas relacionadas, mas distintas:

- **Causa visual:** o alvo de interação foi modelado como placa visual. A implementação não separou a responsabilidade semântica do container da responsabilidade artística do retrato.
- **Causa de interação:** depois que os grupos transparentes restauraram a composição, a ordem de desenho dos retratos sobrepostos não foi refletida automaticamente na ordem de hit testing. O grupo de Griznik podia capturar um clique destinado ao nome de Elowen.

O teste inicial cobria posições, escala, seleção por retrato e retorno, mas não reproduzia o ponto específico de sobreposição entre o nome de Elowen e a arte de Griznik. A reprodução dirigida foi necessária para encontrar essa divergência.

## Validação

As verificações relevantes foram:

- IT-086: geometria histórica dos oito retratos, escala 35%, agrupamento, cliques em retrato e nome, HIDE, seleção e retorno — passou.
- IT-074: preload nativo dos assets da taverna e retomada da interação — passou.
- IT-087: preparação, mapa introdutório, restauração do arquivo e fronteira de salvamento — passou.
- IT-009: retorno, fade de 180 frames, posições dos lugares vazios, limpeza e ausência de replay — passou em execução isolada.
- QA dirigido em 1280×720 e 1920×1080: abertura, diálogo, visitas pelos nomes, conversa e retorno — executado; inspeção visual do agente passou.
- Contraste: `#211c14` sobre `#BAB196`, WCAG 7,91:1, AA e AAA para o par medido.
- Idempotência: reaplicação do materializador não alterou `CommonEvents.json` nem `Dryland_Presentation.js`.

As capturas e recibos permanecem no acervo local ignorado de `docs/qa/evidence/prototype-feedback-refinement/hero-dialogue-feedback/runs/`. Eles sustentam a verificação técnica e visual do agente. O julgamento estético humano continua pendente, conforme o contrato do task 13.

## Aprendizados e prevenção

1. Quando uma imagem já é parte do cenário, o container de interação deve ser criado ao redor da geometria existente. O tamanho do alvo não pode virar uma licença para redimensionar a arte.
2. Antes de alterar uma composição, registrar posições, escala, origem, asset e camada no baseline do Git. “Parecer equivalente” não é evidência suficiente para uma correção visual.
3. Containers transparentes precisam de uma regra explícita de sobreposição. Render order e hit order são propriedades diferentes e devem ser testadas separadamente.
4. Testes de interação por centro do retrato não cobrem necessariamente nomes sobrepostos. Casos dirigidos devem clicar os limites semanticamente importantes, inclusive etiquetas que ficam sobre outra arte.
5. Para legibilidade, medir uma combinação de tinta e fundo observada no runtime e manter o restante da janela fora do escopo da correção quando o pedido é apenas contraste.

## Limites do encerramento

Este postmortem explica a correção do container e do contraste, mas não declara a spec `prototype-feedback-refinement` inteira concluída. Alterações preexistentes do working tree, a aceitação visual humana e os critérios agregados do task 13 continuam fora do escopo deste incidente.

O documento é um registro explicativo; o estado técnico e os IDs de verificação permanecem nos arquivos de task e `verification.md`, que são as fontes de controle da execução.

**Momento sugerido para o devlog:** iniciar uma campanha nova, chegar à taverna, observar a composição sem placas, clicar no nome de Elowen, avançar a conversa e retornar à formação. As capturas devem ser identificadas pela execução e resolução; elas não substituem a aceitação visual humana.
