# UXDR-001 — Linguagem visual e estados de interação do Coreto

- **Estado do design:** Confirmado.
- **Data da decisão e do registro:** 2026-10-30.
- **Fonte da decisão:** revisão de UX/UI nesta conversa, aprovação das pranchas revisadas, aprovação explícita do GIF produzido a partir do sprite sheet enviado pelo usuário e pedido de implementação do plano documental. Conversa sem link durável disponível.
- **Escopo:** menus, ações de texto, escolhas ilustradas, sacrifício, navegação, HIDE e continuidade do diálogo.
- **GDD:** [apresentação e interação do Coreto](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md#uxdr-001-coreto).
- **Entrega deste registro:** documentação e referências visuais. A [implementação e verificação técnica](uxdr-001-implementacao.md) foram concluídas sobre o pacote 1.6.1; o aceite visual humano dos derivados finais permanece pendente.

## Contexto

As ações minimalistas se confundiam com informações sobre o mesmo pergaminho. Foco, estado ativo e disponibilidade precisavam de sinais distintos. O usuário também relatou destaque insuficiente nas imagens, seleção de destinos bloqueados, ordem inadequada de navegação pelo teclado e sobreposição do rótulo de tempo com seu valor.

A revisão foi fundamentada em capturas reais, configuração de fontes e implementação existentes. As pranchas são estudos de apresentação; não constituem evidência de correção do runtime.

## Decisões confirmadas

### Ações de texto, foco e estado ativo

- Padronizar o halo de hover/foco em imagens, botões de texto e texto com ícone. Usar lilás dessaturado, contorno fino e difusão curta, respeitando a silhueta e preservando detalhes e legibilidade. O lilás mantém relação com o roxo da marca e se distingue do pergaminho; o amarelo se mistura mais ao sépia. Calibração inicial: `#BCA6C9`, opacidade 45%, difusão 4 px e expansão de 0,75 px nas imagens. A direção foi solicitada em 30/10; o acabamento desta calibração aguarda aceite visual. Manter a tinta escura, a pena e o lacre nos papéis já definidos, sem halo em informação ou controle indisponível.
- Usar ações leves, sem molduras individuais pesadas. Um traço fino identifica o texto acionável antes do hover.
- Mostrar a pena logo após o texto no hover/foco, reservando espaço para não deslocar o rótulo. A regra vale para palavras e frases sem ilustração.
- Ampliar também ações de texto e texto com ícone em 10% no hover/foco, com halo lilás perceptível nos traços, mantendo a área de interação estável. Com movimento reduzido, conservar halo e contraste sem ampliação. Refinamento solicitado em 30/10 após o aceite do destaque das imagens.
- Usar apoio claro atrás do texto onde a arte do cenário prejudicar sua leitura. Na taverna, preservar a leveza dos nomes e do rodapé compartilhado.
- Informações, como a quantidade de integrantes, não recebem traço de ação, pena ou moldura de botão.
- Reservar o lacre para opção ativa ou submenu aberto, distinguindo-o do botão em foco. Usar como referência a proporção de 16 px para texto de 22 px.
- Não usar o lacre apenas porque um destino está disponível ou é o único caminho restante.

### Escolhas com imagem e sacrifício

- Títulos e descrições dos destinos acompanham o hover/foco da opção com ampliação leve e halo, sem sublinhado nem pena. Preservar tinta escura; indisponíveis não recebem destaque. Calibração de 5%, sem ampliação em movimento reduzido. Refinamento solicitado e aceito em 30/10 na avaliação da seleção de destino.
- Ampliar a imagem em foco em 10%, com contorno e halo acompanhando a silhueta não transparente da arte, sem moldura retangular. O destaque não depende de pena ou lacre.
- Clarear a imagem em foco e manter as demais opções disponíveis na aparência normal. Revisão solicitada em 30/10 durante o aceite da taverna, substituindo o escurecimento das outras opções; intensidade e acabamento aguardam aceite visual.
- Reaproveitar essa linguagem visual na seleção de heróis para sacrifício, preservando expressões, falas e consequências específicas da cena.
- Preservar movimento reduzido e foco perceptível sem depender da animação.

### Memorial — refinamento confirmado em 31/10/2026

- Restaurar a distribuição original das lápides lado a lado, com até quatro por fileira e uma segunda fileira quando necessário. Usar as posições, escalas e inscrições nativas, com o retrato emoldurado.
- Manter um único pergaminho para as lápides, os textos e a frase/controles do rodapé, sem cartões individuais.
- Preservar dados da campanha, animação nativa e movimento reduzido. As alternativas de texto lateral e coluna única foram descartadas pelo usuário. **Aceite visual confirmado em 31/10/2026**, conforme a [captura aceita](assets/uxdr-001/runtime/memorial-lado-a-lado.png).
### Escolha do medalhão — refinamento confirmado em 31/10/2026

- Apresentar um único medalhão no centro do pergaminho. Conservar a mesma gravação nos estados de duas metades, inteiro e quebrado.
- Os controles são os textos “Reunir o medalhão” e “Destruir o medalhão”, com o feedback compartilhado das ações de texto. A ilustração é uma prévia, sem confirmação própria.
- Em repouso, sem foco, mostrar as duas metades. No hover/foco de “Reunir”, aproximar as metades até formar o medalhão inteiro e mostrar “Libertar os amantes e sacrificar Ivaí”.
- No hover/foco de “Destruir”, fragmentar as metades e mostrar “Salvar Ivaí e entregar os amantes a Andirá”. Sair dos controles com o mouse restaura as duas metades; a seleção por teclado mantém sua prévia.
- A prévia não executa consequências. Preservar a confirmação nativa e, em movimento reduzido, apresentar o estado correspondente sem transição animada.
- Esta decisão substitui a apresentação anterior de duas ilustrações acionáveis nesta escolha. O acabamento foi aceito pelo usuário em 31/10/2026; evidências no [acompanhamento da implementação](uxdr-001-implementacao.md#iteração-de-aceite--medalhão-central-2026-10-31).

### Controles indisponíveis e navegação

- Controles efetivamente indisponíveis não recebem foco, hover, ampliação, confirmação nem som de erro. O motivo deve permanecer visível.
- A navegação pelo teclado acompanha a disposição visual, ignora indisponíveis e restaura o foco ao retornar de um submenu.
- Preservar interações explicativas já confirmadas no GDD: tentar adicionar um quarto herói continua sendo uma ação acionável para apresentar a resposta sobre grupo cheio.

### Menus, HIDE e tipografia

- Refinamento solicitado em 31/10/2026: apresentar Efeitos de texto com opções explícitas Desligado/Ligado (Off/On), com lacre no valor ativo, em vez de um toggle indicado apenas no rótulo. Preservar a preferência booleana existente.
- Usar pergaminho unificado e divisórias consistentes nos menus. Separar a região de informações das ações. Revisão solicitada em 2026-10-30: retirar o rótulo “Tempo” e apresentar apenas ampulheta e contador; tempo e ouro usam Outfit no tamanho padrão Body (20 px), com ícones de 1,3× a fonte (26 px). Esta revisão substitui a decisão inicial de separar rótulo e valor do tempo.
- Padronizar todas as divisórias entre controles e seções em `#360A0B` com 30% de opacidade, incluindo as linhas verticais entre botões. Usar o mesmo componente compartilhado em todas as telas; padrão explicitamente confirmado em 2026-10-30.
- Disponibilizar HIDE durante as escolhas de resolução das armadilhas, ocultando enunciado, pergaminho, escolhas e descrição auxiliar. Controles ocultos não permanecem acionáveis.
- Preservar o contrato de restauração por Tab ou clique esquerdo, sem avançar texto nem confirmar uma abordagem, retomando o foco anterior.
- Preservar Averia Libre e Outfit nos papéis efetivamente configurados no jogo. Exemplos e revisão visual devem usar esses arquivos de fonte.
- Revisão solicitada em 2026-10-31: usar Cinzel Decorative exclusivamente no título do jogo; os demais componentes preservam seus papéis de Averia Libre e Outfit.
- Tela de título aceita em 2026-10-31: duas linhas centralizadas, hierarquia de 84/44 px, cor `#F4E3BF` com contorno `#360A0B`, sobre o cenário existente e acima do menu em pergaminho. [Composição aceita em PT](assets/uxdr-001/runtime/titulo-cinzel-decorative.png).

### Iconografia

Manter o traço de tinta escura, formas simples e coerência com a pena e o lacre. Aplicar a linguagem medieval sem perder o reconhecimento da função.

| Função | Ícone confirmado |
| --- | --- |
| Tempo de jogo | Ampulheta acompanhada apenas do contador, sem rótulo |
| Ouro, onde essa informação for aplicável | Moeda |
| Música | Alaúde |
| Efeitos sonoros | Sino |
| Voltar | Seta curva em tinta |
| Sons ambientes | Duas folhas em redemoinho, com poucos traços |

Esta decisão de iconografia não acrescenta economia ou novos controles ao jogo.

### Continuidade do diálogo

Revisão solicitada em 2026-10-30: posicionar o indicador junto à base do pergaminho, no canto inferior direito, em todas as caixas de diálogo. O posicionamento anterior no meio do pergaminho foi rejeitado pelo PO. O nome do falante passa a usar Averia Libre em 28 px e cor `#360A0B`, com espaço reservado antes da fala. Correção solicitada em 31/10/2026: preservar margem interna e altura útil suficientes para não cortar acentos ou descendentes do nome em nenhuma caixa de diálogo. O acabamento desta revisão foi aceito pelo usuário em 2026-10-30, com aplicação a todas as caixas de diálogo.

Usar a borda de página e os três estados do [sprite sheet enviado pelo usuário](assets/uxdr-001/continuidade-sprite-sheet.jpeg), conforme o [GIF aprovado](assets/uxdr-001/continuidade-aprovada.gif).

| Estado ou transição | Apresentação confirmada |
| --- | --- |
| Repouso | Primeiro quadro estático |
| Entrada em hover/foco | Percorrer os quadros 1 → 2 → 3 para abrir a dobra |
| Hover/foco mantido | Permanecer no terceiro quadro, com a dobra aberta |
| Saída do hover/foco | Percorrer a sequência inversa 3 → 2 → 1 |

- Manter o alinhamento da borda durante a troca dos quadros.
- Preservar caixa e texto imóveis; somente o indicador muda de estado.
- O GIF repete uma simulação de entrada e saída do foco para demonstrar a transição. Sua repetição não é uma animação contínua do estado normal.
- A aprovação não acrescenta animação específica de clique nem altera o contrato de avanço do diálogo.
- Preservar movimento reduzido; o estado do indicador deve continuar identificável sem depender da animação.

## Relação com o histórico

Este UXDR especifica a apresentação vigente no recorte aprovado, preservando specs concluídas e evidências anteriores como baselines históricas.

| Referência | Relação |
| --- | --- |
| GDD §19.2, foco em pergaminho de 23/10 | Diferencia ações de texto com pena e escolhas ilustradas com escala, contorno e halo. |
| GDD §19.2, revisão do foco e escurecimento de 23/10 | Confirma o aumento de 10% e a distinção entre imagem fora de foco e indisponível. |
| GDD §19, HIDE; §26, leitura e controles | Complementa a disponibilidade nas escolhas de armadilhas e preserva restauração sem avanço ou confirmação. |
| GDD §1.1, grupo cheio | Preserva a ação explicativa de tentativa de adicionar um quarto herói. |

## Referências visuais aprovadas

Os arquivos abaixo foram preservados neste acervo para não depender de Downloads ou do diretório privado de geração de imagens. Recortes documentais mantêm apenas os trechos aprovados, sem redesenhar os ícones.

| Referência local | Conteúdo preservado e alcance do aceite |
| --- | --- |
| [Ações e proporções](assets/uxdr-001/acoes-e-proporcoes.png) | Taverna como contexto, ações leves, fontes e proporção do lacre. A captura real embutida é referência de contexto, não o resultado de implementação. |
| [Estados das imagens e sacrifício](assets/uxdr-001/estados-imagens-e-sacrificio.png) | Relação entre repouso, foco, escurecimento e indisponibilidade; aplicação aos heróis. O percentual de brilho mostrado é uma amostra de calibração, não um novo valor normativo. |
| [Tempo, ouro e música](assets/uxdr-001/icones-tempo-ouro-musica.png) | Recorte da prancha de ícones aprovada para essas três funções. |
| [Efeitos sonoros e voltar](assets/uxdr-001/icones-efeitos-voltar.png) | Recorte com sino e seta curva. |
| [Ambiente](assets/uxdr-001/icone-ambiente.png) | Recorte com duas folhas em redemoinho. |
| [Sprite sheet de continuidade](assets/uxdr-001/continuidade-sprite-sheet.jpeg) | Arquivo enviado pelo usuário, preservado integralmente. |
| [Animação de continuidade](assets/uxdr-001/continuidade-aprovada.gif) | GIF explicitamente aprovado; montagem dos três quadros alinhados, com demonstração ampliada e em tamanho de uso. |

As decisões textuais delimitam o aceite das pranchas. Aprovar a direção visual não transforma valores de demonstração, ritmos do GIF ou legendas editoriais em contratos adicionais.

## Momento demonstrável

Após a integração, mostrar na taverna a distinção entre ações e informação; alternar foco entre imagens disponíveis e comparar com uma indisponível; demonstrar HIDE na resolução de uma armadilha; entrar e sair do foco do indicador de continuidade.

Captura sugerida para o devlog: sequência curta da dobra 1 → 2 → 3, permanência no terceiro quadro e retorno 3 → 2 → 1, mantendo a caixa e o texto imóveis. Complementar com comparação dos estados das imagens e uma captura da taverna.

## Estado da entrega

Este registro documenta o design confirmado e preserva suas referências. A entrega documental original não alterou o jogo nem declarou validação de runtime. A implementação posterior, suas verificações e evidências estão no [acompanhamento da implementação](uxdr-001-implementacao.md). O aceite visual humano permanece separado da aprovação de design e da conclusão técnica.
