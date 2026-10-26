# Bases editáveis das escolhas

As cinco propostas estão integradas como uma versão de desenvolvimento. Edite os PNGs em `rpg-maker/The Dryland Drowned/img/pictures/`, mantendo os nomes. O jogo carrega esses arquivos; as imagens `01-papel.png` a `05-diptico.png` desta pasta continuam sendo referências conceituais.

## Arquivos para desenhar

Os links abaixo abrem os arquivos usados pelo jogo. As medidas são os tamanhos de exibição na tela de 1280 × 720, não necessariamente a resolução do PNG gerado.

| Momento | Base para editar | Tamanho na tela e área reservada |
| --- | --- | --- |
| Escolhas de conversa e botões | [Dryland_ChoicePaper.png](../../../rpg-maker/The%20Dryland%20Drowned/img/pictures/Dryland_ChoicePaper.png) | Faixa horizontal adaptada ao texto; também botões de 208 × 54 e etiquetas de 330 × 48. Mantenha o centro claro e sem desenhos. |
| Três abordagens de um encontro | [Dryland_ApproachPaper.png](../../../rpg-maker/The%20Dryland%20Drowned/img/pictures/Dryland_ApproachPaper.png) | Moldura de 256 × 144; vinheta de 232 × 116. Três miniaturas na base da tela, com descrição completa da opção em foco acima delas. |
| Destinos | [Dryland_DestinationPaper.png](../../../rpg-maker/The%20Dryland%20Drowned/img/pictures/Dryland_DestinationPaper.png) | Área de descrição de 330 × 212. Imagem do local e etiqueta continuam em camadas separadas. |
| Escolha de sacrifício | [Dryland_SacrificePaper.png](../../../rpg-maker/The%20Dryland%20Drowned/img/pictures/Dryland_SacrificePaper.png) | Papel de 400 × 440; retrato de até 330 × 300 acima do nome. O fio fica na margem inferior, inteiro antes da decisão. |
| Decisão final de reunir | [Dryland_FinalReunite.png](../../../rpg-maker/The%20Dryland%20Drowned/img/pictures/Dryland_FinalReunite.png) | Painel de 480 × 570; deixe os 35% inferiores livres para as consequências. |
| Decisão final de destruir | [Dryland_FinalDestroy.png](../../../rpg-maker/The%20Dryland%20Drowned/img/pictures/Dryland_FinalDestroy.png) | Mesmo tamanho e área livre do outro painel, com peso visual equivalente. |

As bases são PNGs rasterizados, sem camadas de pintura internas. Abra-as no seu editor e mantenha seu arquivo de trabalho em PSD, KRA ou equivalente; exporte o PNG sobre o arquivo correspondente. Transparência externa é suportada. A integração recorta margens transparentes e ajusta o desenho ao tamanho indicado, portanto trabalhe na proporção de exibição para evitar distorção. Não pinte os indicadores de seleção: o jogo aplica um halo quente (`#ffe2a3`) em torno do papel e aumenta em 8% a opção em foco, com transição suave. Papel, ilustração e texto crescem juntos; movimento reduzido aplica o destaque imediatamente. Mantenha espaço entre cartões para esse crescimento. Esse tratamento substitui os ornamentos sépia, os cantos e a seta roxa; seu aceite artístico permanece pendente.

## Vinhetas independentes por alternativa

As opções sem foco recebem escurecimento de intensidade 0,24, junto da transição já existente. O papel dos menus fica com 76% do brilho; cartões e ilustrações recebem tom RGB -61. A opção em foco recupera a iluminação e mantém glow e escala. Não escureça os PNGs manualmente; o jogo aplica o efeito. Textos dos menus permanecem opacos para preservar o contraste. Ver [incremento](../../../planos/tasks/choice-focus-dimming/spec.md).

Foram preparados 48 arquivos: `Dryland_Vignette_A1_1.png` até `Dryland_Vignette_A8_3.png` e `Dryland_Vignette_B1_1.png` até `Dryland_Vignette_B8_3.png`. Por exemplo, [Dryland_Vignette_A1_1.png](../../../rpg-maker/The%20Dryland%20Drowned/img/pictures/Dryland_Vignette_A1_1.png) é a primeira abordagem do encontro A1.

Cada alternativa tem uma ilustração própria da ação descrita: abrir uma janela, soltar uma presilha, observar os cacos e assim por diante. A versão atual simplifica essas ações em poucos traços de tinta escura, com fundo transparente, sem cenário e sem hachuras. Preserve o objeto principal, o gesto e bastante espaço vazio para a leitura a 232 × 116. Trocar uma vinheta não altera as outras nem o fundo original do encontro. O [catálogo de ações](ACOES-ILUSTRADAS.md) relaciona cada arquivo ao texto completo em português; os [prompts das bases minimalistas](../../../planos/tasks/minimal-choice-illustrations/asset-prompts.json) detalham a composição de cada ação.

Consulte a ação correspondente em [Languages.tsv](../../../rpg-maker/The%20Dryland%20Drowned/Languages.tsv): a chave `choice.a1.approach_1` corresponde a `Dryland_Vignette_A1_1.png`. A mesma regra vale para os demais encontros. Desenhe a ação sugerida pelo texto, sem indicar antecipadamente sucesso, falha ou competência necessária.

**Para as vinhetas, preserve a largura e a altura atuais do PNG ao exportar.** Os eventos usam escalas para exibir 232 × 116. Se desejar outra resolução, ajuste também a escala do comando Mostrar Imagem no evento correspondente. A liberdade de resolução das seis bases da tabela não se aplica automaticamente às vinhetas.

## Camadas existentes que você também pode editar

- Retratos dos candidatos ao sacrifício: `Dryland_H1.png` a `Dryland_H8.png`, em `img/pictures/`. São compartilhados com outras cenas.
- Ilustrações dos destinos: `Dryland_Destination_physical.png`, `Dryland_Destination_supernatural.png` e `Dryland_Destination_final.png`.
- Fundos dos encontros: `Dryland_Encounter_A1.png` a `Dryland_Encounter_B8.png`. São arquivos separados das vinhetas; alterar o fundo não atualiza as alternativas.

## Onde ajustar composição e texto

| O que ajustar | Arquivo ou evento |
| --- | --- |
| Textos PT e EN | `rpg-maker/The Dryland Drowned/Languages.tsv`; mantenha as chaves. |
| Abordagens A1–A8 | Mapas 007–014, evento 1, página 1. |
| Abordagens B1–B8 | Mapas 015–022, evento 1, página 1. |
| Dois painéis finais | Mapa 023, evento 1, página 1. |
| Destinos | Common Event 39. |
| Candidatos ao sacrifício | Common Events 42 e 43. |
| Arquivos das bases e ativação | Plugin Manager → `Dryland_6_IllustratedChoices`, carregado depois de `Coreto_5_DesignSystem`. |
| Tamanhos lógicos, desenho do foco e prévia do texto ao passar o mouse | [Dryland_6_IllustratedChoices.js](../../../rpg-maker/The%20Dryland%20Drowned/js/plugins/Dryland_6_IllustratedChoices.js). |

Use o editor do RPG Maker para movimentar imagens nos eventos. Textos continuam separados da arte para suportar PT e EN. Ao passar o mouse sobre uma escolha ilustrada, uma faixa mostra seu texto completo no idioma ativo. A faixa também acompanha a seleção por teclado. Ela desaparece ao afastar o mouse, usar HIDE ou confirmar a escolha. Nas abordagens, fica junto das três miniaturas na parte inferior, deixando o centro do cenário livre. As descrições não se repetem dentro das molduras.

Na taverna, a seleção dos retratos e os menus individuais dos heróis não mostram essa faixa suplementar. Suas informações nativas e diálogos permanecem visíveis. O texto completo das abordagens das armadilhas continua acompanhando o foco. Veja a [taverna sem descrição extra](integrado/11-taverna-sem-descricao-extra.png).

A escolha do destino também não mostra a faixa suplementar; as ilustrações e os nomes dos destinos continuam nos cartões. Veja os [destinos sem a faixa extra](integrado/12-destinos-sem-descricao-extra.png).

## Conferir uma edição

Escurecimento das opções sem foco, em 2026-10-23: [menu por teclado](integrado/17-escurecimento-conversa.png) e [abordagem por mouse](integrado/18-escurecimento-encontro.png). Estas capturas mostram a calibração atual; a opção iluminada preserva o glow e a escala.

Glow e escala aplicados em 2026-10-23: [menu por teclado](integrado/15-glow-escala-conversa.png) e [abordagem por mouse](integrado/16-glow-escala-encontro.png). A opção em foco cresce junto com seu conteúdo; as demais ficam mais discretas. Veja a [verificação](../../../planos/tasks/choice-glow-focus/verification.md).

Proposta anterior de foco em sépia, rejeitada em 2026-10-23: [menu por teclado](integrado/13-foco-pergaminho-conversa.png) e [abordagem por mouse](integrado/14-foco-pergaminho-encontro.png). As capturas anteriores abaixo também preservam a apresentação histórica.

Capturas da integração no jogo: [conversa](integrado/01-conversa.png), [destinos](integrado/02-destinos.png), [abordagens minimalistas com o cenário visível](integrado/10-escolhas-minimalistas.png), [sacrifício](integrado/04-sacrificio.png) e [decisão final](integrado/05-decisao-final.png). A [captura 09](integrado/09-escolhas-compactas.png) preserva as gravuras detalhadas no layout compacto; `03`, `06`, `07` e `08` preservam os layouts anteriores dos cartões grandes.

1. Exporte o PNG mantendo o nome e, nas vinhetas, a resolução.
2. Reabra o jogo ou recarregue a página para limpar as imagens em memória.
3. Inicie uma campanha nova para conferir a nova composição. Um save anterior pode conservar a lista de comandos da cena antiga até a próxima transição.
4. Confira o foco com mouse e teclado e leia as alternativas nos dois idiomas.

As artes geradas são bases de desenvolvimento autorizadas para sua edição. A revisão e o acabamento artístico continuam necessários antes da publicação. A [verificação das bases minimalistas](../../../planos/tasks/minimal-choice-illustrations/verification.md) registra a arte atual, gerada pela ferramenta integrada de imagens. A [compactação](../../../planos/tasks/compact-encounter-choices/verification.md), a [correção das imagens](../../../planos/tasks/choice-action-illustrations/verification.md) e a [primeira integração](../../../planos/tasks/illustrated-choice-bases/verification.md) preservam o histórico.
