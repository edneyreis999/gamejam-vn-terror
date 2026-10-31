# Inspirações para vender experiências

## Como transferir uma ideia

Leia esta seção ao consultar o repertório pela primeira vez e a seção do tema antes de formular sua primeira oferta nele. As fontes explicam motivações da VisuStella; a CLI deste projeto confirma os recursos disponíveis para o jogo. Os exemplos abaixo são **aplicações autorais**, não intenções atribuídas aos autores nem receitas prontas. Reconsulte seus IDs antes de usá-los; a pesquisa inicial foi realizada em 2026-10-30.

As tabelas usam **IDs do catálogo público da CLI**, disponíveis neste projeto. Não são IDs de testes. Por exemplo, `BATTLE-P-55` identifica o parâmetro **Critical Duration**, duração do brilho no popup crítico; `BATTLE-P-333` identifica **Flinch Distance X**, deslocamento horizontal da reação ao dano. Consulte-os com `node coreto/tools/coreto/cli.mjs battle api describe BATTLE-P-55 --json`, substituindo o ID pelo recurso desejado. Nesses dois IDs, `P` indica parâmetro; o número identifica a entrada do catálogo.

Parta de uma cena concreta e de uma sensação: reconhecer o acerto, prever uma escolha, sentir urgência, compreender um estado ou lembrar uma conquista. Abstraia a capacidade em um verbo perceptível — destacar, acompanhar, antecipar, revelar, recordar — e transfira esse verbo para a situação do jogo. A capacidade continua a mesma; sua finalidade narrativa pode mudar.

Para sair do uso mais óbvio, experimente uma transformação por vez:

| Transformação | Pergunta interna | Aplicação possível |
| --- | --- | --- |
| Antecipação | O que o jogador pode perceber antes de confirmar? | Reação visual ao destacar uma resposta |
| Consequência | Que sinal torna um acontecimento lembrável? | Biografia ou retrato atualizado após um marco |
| Contraste | O que merece destaque porque o restante é discreto? | Animar uma palavra emocional, mantendo as outras estáveis |
| Ritmo | Em que momento a resposta deve acelerar ou repousar? | Interpolação de uma imagem de recompensa |
| Composição | Duas capacidades confirmadas contam a mesma coisa? | Escolha destacada aciona um evento que troca a expressão de um busto |
| Recontextualização | Onde mais esse mesmo sinal faria sentido? | Uma imagem de save funciona como lembrança do capítulo |

Uma combinação deve formar uma única ideia vendável. Verifique todos os elos, inclusive cena e ordem dos gatilhos; dois recursos disponíveis separadamente podem não funcionar juntos naquele contexto. Se o efeito exigir assets ausentes, diga quais serão necessários. Se exigir uma capacidade nova, volte ao verbo e escolha outra aplicação.

Use a hierarquia polimento → game feel → game juice para ampliar a busca: clareza, conforto e memória também são ofertas, mesmo sem espetáculo. Respeite o tom pedido e as recusas; um jogo contemplativo pode ganhar mais com ritmo de leitura e informação clara do que com movimento constante. Quando uma ideia for recusada, mude a sensação ou o recurso, em vez de reapresentar o mesmo efeito com outro nome.

## Fundação e legibilidade

**Inspiração declarada:** a primeira onda reuniu funcionalidades recorrentes e populares das bibliotecas anteriores de Yanfly, Olivia, Irina e Arisu em núcleos reutilizáveis. Inclui Core, Battle, Main Menu, Message, Events & Movement, Items & Equips, Skills & States, Elements & Status, Save e Options. O artigo oferece uma motivação coletiva; não associa cada um desses núcleos a um jogo específico. [Waves — Wave 1](https://www.yanfly.moe/wiki/Inspiration_Behind_The_Waves_Plugins#Wave_1)

**Aplicação autoral:** procure o atrito que interrompe a experiência antes de acrescentar efeitos. Explore também recursos pouco usados nas telas deste jogo.

| Semente | Consulta local | Limite a conferir |
| --- | --- | --- |
| A mensagem importante fica na mesma página: o jogador acompanha a fala com menos interrupções. | `message api describe /General/MessageRows` | Conferir quantidade de linhas, resolução e combinação de Show Text adjacentes. Valores já salvos podem prevalecer sobre o default; não promete reescrever a fala. |
| O selo de uma conquista chega com energia e repousa suavemente, valorizando aquele instante. | `core api describe CE-C-PictureEasingType` | Exige picture existente e Move Picture nativo sem espera, seguido imediatamente do easing enquanto há movimento. Não fornece a arte nem inicia o movimento sozinho. |

## Combate: reconhecer e compreender

As propostas desta seção reinterpretam capacidades locais de Battle e SkillsStates dentro da motivação coletiva dos núcleos descrita acima. Não atribua a esses plugins inspirações de sistemas externos, como Grandia, Persona ou Octopath, mencionadas em outras partes do catálogo VisuStella.

| Semente | Consulta local | Limite a conferir |
| --- | --- | --- |
| O crítico ganha uma assinatura visual no número: o jogador reconhece o grande acerto imediatamente. | `battle api describe BATTLE-P-54` (Critical Flash Color) e `BATTLE-P-55` (Critical Duration) | Flash do popup, não da tela. Cor usa quatro canais 0–255; duração usa frames. Não promete hit-stop. |
| Drenar energia provoca uma reação no alvo: o desgaste deixa de parecer invisível. | `battle api describe BATTLE-NT-damage-flinch` (Damage Flinch) e `BATTLE-P-333` (Flinch Distance X) | Reação para dano positivo de MP/TP; HP já usa a reação normal. Deslocamento depende da apresentação lateral e não garante retorno automático em qualquer duração. |
| A proteção exibe quantos turnos restam: o jogador pode planejar sem adivinhar. | `skills-states api describe SS-P-State-ShowTurns` | Conferir configuração e janela/sprite que mostra o estado. Exibir a duração não a aumenta nem altera o balanceamento. |
| A técnica do mago é reconhecida pelo gesto e pela breve levitação, antes do resultado. | `battle api describe BATTLE-C-183`, `BATTLE-C-168` e `BATTLE-C-119` | Sequência customizada exige evento comum ligado à habilidade/item; flutuação exige sprite lateral e restauração de altura. Preservar exatamente a aplicação do efeito, sem dano duplicado. |

Não venda as extensões Camera, Impact ou Projectiles como parte do Battle Core. A tabela de integrações em [consulta à CLI](cli.md) identifica os descritores que exigem provedores externos.

## Conversa: expressão e ritmo

**Inspirações declaradas:** Extended Message traz conveniências de leitura de visual novels; Message Visibility permite apreciar a arte; VN Picture Busts facilita encenação expressiva; Attached Pictures compõe imagens em camadas; Animated Message Text Effects cita Undertale para comunicar personalidade e emoção por meio do texto. Confirme na CLI a capacidade que sustentará a oferta. [Visual Novel Series](https://www.yanfly.moe/wiki/Inspiration_Behind_Visual_Novel_Series)

| Semente autoral | Consulta local | Limite a conferir |
| --- | --- | --- |
| O suspeito afirma estar calmo, mas o retrato se move discretamente: o jogador percebe uma tensão. | `vn api describe VN-C13`; `VN-C03` para troca de expressão | Requer busto e imagens apropriadas. É encenação autorada, não detecção automática de mentira. Conferir intensidade, duração e encerramento do efeito. |
| Uma palavra oscila numa lembrança inquietante; na fala seguinte, o texto está estável. A mudança de emoção fica perceptível. | `ani-message api describe ANI-RX-001` e `ANI-DEF-AngleEffects-001` | Preset Swing pode ter sido personalizado/removido. Anima letras/ícones de Show Text com efeitos habilitados; limpar efeitos afeta os próximos caracteres, não os já emitidos. |
| Uma máscara acompanha o rosto durante a conversa: a transformação parece pertencer ao personagem. | `attached-pictures api describe AP-C-PictureAddPicture` | Requer imagens e slots de picture. Filhos herdam transformações do pai; não são clicáveis. Conferir persistência do vínculo ao apagar/recriar um slot e evitar ciclos. |
| O jogador esconde a janela por um instante para contemplar a revelação e depois retoma a mesma fala. | `message-visibility api describe MV-P-ToggleKey:str` | Disponível em Scene_Map sob as condições de entrada; não funciona no título por eventos ou em batalha. Restaurar a janela não deve ser vendido como confirmação da escolha. |
| A leitura automática dá mais tempo às falas longas, ajudando o jogador a acompanhar uma conversa sem tantos cliques. | `ext-message api describe EXT-M-023`, `EXT-M-024` e os descritores de ativação apontados por eles | Conferir AUTO e configuração efetiva. O mínimo não se soma ao tempo por caractere; unidades são atualizações do jogo. Não oferece sincronização com voz externa. |

## Escolhas e abertura: responder antes da confirmação

**Inspirações declaradas:** Picture Choices explora escolhas visuais; Choice Common Events oferece resposta ao destacar uma opção, antes de confirmar; Event Title Scene usa mapas e eventos para dar controle criativo e atmosfera à abertura. Essas ideias pertencem aos três plugins correspondentes, não aos demais plugins da série. [Custom Construct Series](https://www.yanfly.moe/wiki/Inspiration_Behind_Custom_Construct_Series)

| Semente autoral | Consulta local | Limite a conferir |
| --- | --- | --- |
| Ao percorrer respostas, o jogador vê uma reação do interlocutor: aquela ameaça já parece perigosa antes de escolhê-la. | `choice-common-events api describe CC-T-SELECT`; combinar com `vn api describe VN-C03` | O destaque inicial também dispara o evento. Prévias precisam ser curtas, reversíveis e sem consequência definitiva: mudar de opção não cancela o evento anterior. Conferir contexto de mapa/título; não prometer suporte em batalha. |
| Na mesa do alquimista, os frascos são as escolhas; o frasco destacado convida à decisão. | `picture-choices api describe PC-T-BIND` e `PC-C-ChangePictureChoiceSettingsOne` | Pictures devem existir antes da escolha. Filhos anexados não são clicáveis. Trata da apresentação de uma decisão existente, não fornece um sistema de crafting. |
| Antes de Novo Jogo, a própria taverna recebe o jogador: a abertura já transmite o clima da aventura. | `event-title-scene api describe ET-P-MapID:num` e `ET-C-NewGame` | Exige mapa e eventos de título autorados. A cena usa estado temporário novo e é reconstruída ao retornar de Options/Load; não promete continuidade do último save. |

## Exploração, identidade e continuidade

Estas aplicações autorais de Events & Movement, Items & Equips, Main Menu, ElementStatus, Options e Save usam a base coletiva da Wave 1. Não há atribuição individual a um jogo inspirador naquela fonte.

| Semente | Consulta local | Limite a conferir |
| --- | --- | --- |
| O herói se inclina ao correr: atravessar a vila transmite mais energia. | `events-move api describe EV-S-Movement-EnableDashTilt` | Exige movimento com dash; escadas, pose, ícone sobre a cabeça e outros modos de sprite podem suprimir a inclinação. |
| O mercador percebe a aproximação: uma reação breve torna a rua mais acolhedora. | `events-move api describe EV-TAG-activation-proximity` | Exige evento nativo apropriado. Alcance não elimina gatilhos adjacentes; conferir repetição, condições e ausência de interrupção irritante. |
| A relíquia oferece uma ilustração na loja: o jogador enxerga detalhes que o ícone sozinho não comunica. | `items-equips api describe IE-NT-shop-picture` | Requer imagem existente em img/pictures, nome sem extensão, configuração da cena e janela de status compatível. Não promete zoom livre ou modelo 3D. |
| Depois da coroação, o retrato do menu muda: cada pausa lembra a evolução do herói. | `main-menu api describe MM-C-ChangeActorMenuImageGroup` | Requer imagens e atores existentes; a troca persiste no ator/save. Conferir atualização da cena; nome vazio não restaura necessariamente a imagem inicial. |
| Uma escolha marcante passa a fazer parte da biografia: a ficha também conta a história vivida. | `element-status api describe ES-C-ActorChangeBiographyGroup`, `ES-BIOGRAPHY` e `ES-P-StatusMenuList` | Requer layout de Status habilitado. Texto vazio limpa a biografia; Notes e comando em andamento têm momentos de aplicação distintos. |
| O jogador escolhe onde cada ação fica no teclado e passa a se concentrar na aventura. | `options api describe OPT-ITEM-0-35` | Ação abre remapeamento, não é booleano. Depende de Rebind.EnableRebind e Core compatível; a posição padrão 35 pode ter mudado com personalizações. Conferir lista efetiva. |
| O save vira um cartão do capítulo: uma imagem e uma frase lembram onde a aventura parou. | `save api describe SAV-COMMAND-SaveDescription` e `SAV-COMMAND-SavePicture` | Afeta metadados dos próximos saves, sem salvar imediatamente ou reescrever slots antigos. Requer imagem e layout que mostre esses campos. |

## Consistência visual: contribuição nativa Coreto

O DesignSystem é nativo da Coreto. Uma semente é dar às janelas e painéis deste jogo a mesma linguagem de cantos, ajudando telas diferentes a parecerem parte do mesmo mundo. Consulte `design-system api describe /Shapes/PanelRadius` e confira os componentes atendidos e a configuração atual. O descritor define raio em pixels limitado pela dimensão renderizada; ele não promete alterar toda imagem arbitrária do jogo.

Se a conversa chegar ao tema visual, use `skills describe game-coreto-eng-design-system` para conhecer a skill disponível neste projeto. Apresente o benefício da consistência entre as telas; a conversa continua sendo uma oferta, sem aplicar o tema.
