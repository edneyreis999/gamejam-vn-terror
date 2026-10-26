# Operar a CLI

Execute na raiz deste projeto com Node 22.23.2+. `<jogo>` é o caminho informado no [índice](../README.md). Informe esse caminho nas operações sobre o jogo. A CLI não exige npm nem o editor aberto. Nos exemplos de shell, substitua `"<jogo>"` pelo caminho entre aspas simples; dentro dele, represente uma aspa simples por `'\''`.

## Descobrir antes de escrever

```sh
node coreto/tools/coreto/cli.mjs --help --json
node coreto/tools/coreto/cli.mjs message --help --json
node coreto/tools/coreto/cli.mjs message api list --json
node coreto/tools/coreto/cli.mjs message api describe /General/MessageRows --json
```

Os catálogos funcionam sem um jogo selecionado. `api describe` aceita ID, nome ou caminho publicado; consulte contexto, dependências, disponibilidade e formato dos valores. Uma API de runtime descrita não implica uma operação executável pela CLI. Não invente comandos a partir de nomes de métodos.

| Namespace | Recursos |
| --- | --- |
| `design-system` | Tema, tipografia e superfícies; parâmetros, instalação explícita e validação |
| `skills` | `list` e `describe <nome>`: pacotes de autoria entregues, instruções e dependências |
| `core` | Configuração central, comandos, tags e validação estática do jogo |
| `battle` | Regras e apresentação da batalha, parâmetros, sequências e tags |
| `events-move` | Eventos, movimento, rotas, regiões e dados Self/Map |
| `main-menu` | Comandos do menu, categorias, retratos e janelas auxiliares |
| `skills-states` | Tipos, disponibilidade e ordem de habilidades; custos configuráveis, gauges de recursos e seleção do provedor |
| `items-equips` | Inventário, equipamentos, lojas, comandos e tags de banco |
| `message` | Mensagens, escolhas, comandos, tags, textos e tabelas de idiomas |
| `vn` | Bustos, movimento, efeitos, comandos e validação VN |
| `ext-message` | Auto/avanço rápido, console, menus e escapes estendidos |
| `ani-message` | Efeitos animados de texto e presets |
| `options` | Categorias, controles, opções e textos de ajuda |
| `save` | Saves, autosave, comandos e globais |
| `picture-choices` | Escolhas gráficas |
| `choice-common-events` | Common Events associados a escolhas |
| `attached-pictures` | Pictures anexadas |
| `event-title-scene` | Título dirigido por evento |
| `message-visibility` | Visibilidade das janelas de mensagem |
| `config` | Migração da configuração existente, sem ativar plugins |

Cada namespace de plugin publica `api list`, `api describe`, `install` e operações de parâmetros. Grupos adicionais variam: consulte `<namespace> --help --json` para a superfície exata. Prefira descritores específicos a carregar os JSON completos de `coreto/src/`.

## Preparar configuração e ativação

Inspecione `<jogo>/js/plugins.js` e ative os plugins necessários:

```sh
node coreto/tools/coreto/cli.mjs --project "<jogo>" core install --dry-run --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" core install --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" message install --json
```

Execute somente as escritas necessárias à tarefa. `inherit` lê os parâmetros da entrada original, mesmo desativada; `own` usa a entrada Coreto. `install` materializa a configuração e ativa somente o plugin solicitado; não instala dependências nem recompila bundles. Não troque manualmente o seletor para copiar parâmetros.

Na composição completa, a ordem é Core → Battle → SkillsStates (quando usado) → Message → Options → Save → Extended → PictureChoices → VN → Ani → Choice → Attached → EventTitle → Visibility. Os consumidores Battle de tier 2/3 ficam após Battle e seus suportes. Para ActSeqImpact, registre também `pixi-filters` antes desse consumidor; a versão 3.1.0 e a licença MIT são entregues em `<jogo>/js/plugins/pixi-filters.js` e `<jogo>/js/libs/licenses/pixi-filters-3.1.0.txt`. Ative apenas o necessário e confira as dependências do catálogo. Plugins originais não acompanham o pacote; não ative providers concorrentes. Consumidores que exigem recursos de SkillsStates fora do catálogo atual continuam usando o original qualificado.

## Ler, simular, escrever e conferir

```sh
node coreto/tools/coreto/cli.mjs --project "<jogo>" core parameters get --path /Gold/GoldMax --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" core parameters set --path /Gold/GoldMax --value 500000 --dry-run --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" core parameters set --path /Gold/GoldMax --value 500000 --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" core parameters get --path /Gold/GoldMax --json
```

`--value` recebe JSON, inclusive aspas de strings. Nas operações que aceitam `--input`, um arquivo JSON evita erros de escape do shell. Use `--dry-run` quando disponível, leia o diff e consulte o alvo depois da escrita. Reabra o editor e reinicie o playtest para observar a configuração efetiva.

Mapas, eventos e páginas precisam existir. A CLI não cria genericamente a estrutura do jogo. Exemplos de seletores: `map:1/event:1/page:1`, `common-event:1`, `troop:1/page:1`; IDs são os reais do jogo. Índices de comandos são base zero; páginas usam o seletor documentado. Use `commands list` para obter posição, indentação e hash antes de inserir ou atualizar. Operações com `--expected-hash` rejeitam um alvo modificado desde a consulta. Releia o alvo após conflito ou interrupção; não repita uma escrita às cegas.

Tags são editadas pelos grupos `tags`; Mostrar Texto usa `text`; idiomas usam `message language`. Consulte a ajuda de cada grupo para valores, limites e alvos. Funções JavaScript autoradas são analisadas sem execução pela CLI; seu efeito exige playtest.

## Validar e executar

```sh
node coreto/tools/coreto/cli.mjs --project "<jogo>" core validate --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" vn validate --json
node coreto/tools/dev/server.mjs --project "<jogo>"
```

Use `vn validate` somente quando VN fizer parte da configuração. Leia `result.valid` e os diagnósticos; uma resposta JSON válida não comprova configuração válida. A validação inspeciona presença dos arquivos necessários, referências e configuração sem executar o jogo. Não recompila nem compara bundles Coreto com fontes; sucesso não certifica integridade ou comportamento da engine. Personalizações seguem [extensões](extensoes.md).

O servidor oferece os serviços locais de metadados usados pela exportação de textos e pelo editor de coordenadas de pictures. Os arquivos resultantes ficam em `<jogo>/.RPGMakerMZ-metadata/`. Use a URL impressa pelo servidor; outro servidor estático pode não oferecer esses serviços.

Com `--json`, leia `ok`, `operation`, `target`, `result` ou `error`. Códigos usuais: 0 sucesso, 2 entrada inválida, 3 alvo ausente, 4 conflito, 5 falha de I/O, 6 capacidade indisponível. A ajuda do namespace especifica os casos aplicáveis. Validação estática não comprova aparência, áudio ou jornadas: use [QA](qa.md).

## Atualizar uma configuração antiga

Se o registry veio de uma versão anterior sem seletores explícitos, consulte `config migrate --help --json` e simule a normalização antes de salvar no editor:

```sh
node coreto/tools/coreto/cli.mjs --project "<jogo>" config migrate --dry-run --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" config migrate --json
```

A migração preserva valores, ordem e ativação dos provedores enumerados em `supportedProviders` na ajuda; um registry já normalizado não é reescrito. Main Menu, Events & Movement e Design System não fazem parte dessa operação. Para esses namespaces, consulte a ajuda própria antes de instalar ou editar parâmetros.

## Configurar batalha

O Battle próprio suporta MZ 1.10.0/Pixi 5.3.12 e exige Coreto Core antes dele. Consulte a disponibilidade antes de usar sequências de câmera, projétil, impacto ou outros recursos fornecidos por plugins externos. Copiar ou ativar Battle não instala esses consumidores.

```sh
node coreto/tools/coreto/cli.mjs battle api describe /BattleLayout/ListMinRows --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" battle install --dry-run --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" battle install --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" battle parameters set --path /BattleLayout/ListMinRows --value 7 --json
node coreto/tools/coreto/cli.mjs battle api describe ActSeq_Movement_Opacity --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" battle commands list --target common-event:1 --json
```

O comando `install` substitui somente o provider Battle selecionado e materializa seus parâmetros; confira a ordem resultante no Gerenciador de Plugins. IDs antigos `VisuMZ_1_BattleCore` em eventos continuam aceitos pelo provider próprio. Novos comandos podem usar `Coreto_1_BattleCore`. Não mantenha os dois providers ativos.

Tags de habilidades, estados e inimigos usam `skills:ID`, `states:ID` e `enemies:ID`. Layout de tropa usa `troop:ID/name` ou `troop:ID/page:N/comment:I`, onde I aponta para o comando de comentário108; continuações408 pertencem ao mesmo bloco. Use a tag completa como string JSON e o hash retornado por `tags list`. Callbacks são armazenados pela CLI e executados pelo jogo no contexto publicado; a edição offline não os executa.

Após salvar no Editor ou pela CLI, reabra o projeto e reinicie o playtest. Confira uma batalha e o retorno ao mapa, incluindo os consumidores ativados.

## Events & Movement: movimento e rotas

O namespace `events-move` publica parâmetros, comandos, tags, rotas e nomes para movimento, passagem, dados Self/Map, ativação, templates, apresentação, temporizador e seguidores. A ajuda informa os consumidores compatíveis e suas versões; esses plugins e seus assets são instalados separadamente.

Consulte `node coreto/tools/coreto/cli.mjs events-move --help` e `events-move api list` antes de editar. Ative Coreto_0_CoreEngine antes de Events. Use `events-move install --project "<jogo>"` para selecionar Coreto_1_EventsMoveCore; a operação desativa apenas o provedor original de Events e preserva os demais registros e dependências. Posicione Events após Core e antes dos consumidores. A base entregue mantém Events desativado até a seleção explícita do autor. O gerenciador do MZ pode avisar que um consumidor original exige `VisuMZ_1_EventsMoveCore`: o cabeçalho `@base` desse consumidor continua nomeando o original, enquanto o provider ativo é Coreto. Esse aviso nominal foi observado com CommonEventMenu; confira a ordem e as versões qualificadas e mantenha somente um provider Events ativo. Não altere os arquivos originais nem ative ambos para eliminar o aviso.

`CoretoConfigSource=inherit` lê o registro VisuMZ_1_EventsMoveCore mesmo desativado; na ausência dele, lê o próprio registro. `own` usa os valores do registro Coreto. Alterar apenas esse seletor não copia parâmetros. A primeira edição funcional pela CLI materializa os valores efetivos em `own`, preservando valores não editados. Por exemplo:

```sh
node coreto/tools/coreto/cli.mjs events-move parameters get --project "<jogo>" --path /Movement/EnableDir8
node coreto/tools/coreto/cli.mjs events-move parameters set --project "<jogo>" --path /Movement/EnableDir8 --value true --dry-run
```

Remova `--dry-run` para aplicar a edição. `parameters reset` restaura o valor padrão do campo indicado. Comandos nativos existentes conservam o receptor `VisuMZ_1_EventsMoveCore`; o provedor próprio atende esse receptor sem exigir o arquivo original. Use as operações `commands list`, `insert` e `update` com um alvo nativo e o hash retornado pela leitura para controlar conflitos. O editor continua exibindo parâmetros e comandos nas superfícies nativas.

### Rotas de movimento

Use `events-move routes list --target map:190/event:1/page:1/route` para uma rota autônoma. Para a rota de um comando Definir Rota de Movimento, use `map:190/event:1/page:1/command:2/route`; listas de eventos comuns e tropas aceitam o mesmo sufixo `/command:I/route`. Os IDs devem existir no projeto, e as páginas começam em um; os índices de comando e instrução começam em zero. A leitura retorna o hash necessário às alterações:

```sh
node coreto/tools/coreto/cli.mjs events-move routes insert --project "<jogo>" --target map:190/event:1/page:1/route --before 0 --value '"Move Right: 2"' --expected-hash "<fileHash>" --dry-run
node coreto/tools/coreto/cli.mjs events-move routes update --project "<jogo>" --target map:190/event:1/page:1/route --index 0 --value '"Balloon: Heart"' --expected-hash "<fileHash>"
node coreto/tools/coreto/cli.mjs events-move routes remove --project "<jogo>" --target map:190/event:1/page:1/route --index 0 --expected-hash "<fileHash>"
```

A CLI preserva as outras instruções, as opções da rota e seu terminador; em comandos 205, atualiza também as continuações 505. A gramática completa entregue aparece em `events-move --help` (`routeGrammar`). Inclui movimento repetido nas oito direções, `Move Right Until Stop`, `Jump Forward: 2`, alvos por coordenadas (`Move To: 10, 7`), evento (`Move To Event: 2`), jogador (`Move To Player`) ou origem (`Move To Home`), além de Step Toward/Away From, Turn To/Away From e Teleport To. Há efeitos `Animation: 1`, `Balloon: Heart`, `Opacity: 50%`, `Fade Out: 16`, `Index: +1`, `Force Dash: On` e `Hug: Left`. Operandos globais aceitam `\V[1]` e `$gameVariables.value(1)`.

Execute essas instruções de script no Playtest; a prévia de rotas do editor não executa a gramática do plugin. `Turn To: x, y` gira sem deslocar o personagem. Uma rota não pulável para um destino inalcançável pode continuar esperando; substitua a rota explicitamente para interrompê-la. `Crash Move … Until Stop` retoma após a liberação do bloqueio pelo jogador. Force Carry, Pose e bloqueio de padrões usam a apresentação VS8 descrita abaixo.

As tags de mapa `<Diagonal Movement: On>` e `<Diagonal Movement: Off>` selecionam a diagonal padrão. Notas de evento e comentários de página aceitam `<True Random Move>`, `<Random Move Weight: 0.1>` e as tags Move Synch Target, Type, Delay e Distance Opacity. Consulte `events-move api list` e `api describe <id>` para os descritores e alvos de cada tag; a sincronização aceita Player ou Event N como alvo e tipos mimic, reverse mimic, mirror horizontal/vertical, approach, away, custom e random.

As regras de passagem de Events aceitam notas de mapa como `<Player Forbid Region: 70>` e `<Boat Dock Region: 71>`. As listas do mapa acrescentam IDs aos parâmetros. `Allow` vence `Forbid`; `Walk` abrange jogador e eventos, e `Vehicle` abrange os três veículos. `Dock` usa a região à frente do barco/navio e a região atual da aeronave. Os parâmetros `BoatDockRegionOnly`, `ShipDockRegionOnly` e `AirshipDockRegionOnly` restringem o desembarque às regiões de atracação configuradas.

Em notas de evento ou comentários de página, `<Move Only Regions: 70, 71>` substitui as regras normais de passagem desse evento; zero é ignorado. `<Hitbox Right: 2>` amplia sua área retangular em duas casas à direita, com variantes `Left`, `Up` e `Down`. As bordas são inclusivas e todas as casas ocupadas participam da colisão. A consulta de posição desse retângulo não atravessa a costura de um mapa circular. A corda requer simultaneamente uma casa marcada como escada e a etiqueta de terreno configurada em `TerrainTag.Rope`.

`events-move names get|set --target system:variable:ID` e `system:switch:ID` leem ou substituem o nome nativo em `System.json`. Leia o hash com `get`; use-o em `set --expected-hash HASH --value '"<Self> ((Contador))"'`. `--dry-run` calcula a alteração sem gravar. A operação preserva os demais campos e a formatação do arquivo e recusa hash desatualizado, referência duplicada ou marcadores de escopo conflitantes.

`<Self>` usa o contexto do evento chamador; sem um evento, o acesso usa o slot global nativo. `<Map>` compartilha o valor no mapa atual. `((Nome))` e `（（Nome））` permitem `$gameVariables.value("nome")`, `$gameVariables.setValue("nome", valor)` e os equivalentes de switches, sem distinção de maiúsculas ou espaços nas extremidades. Uma referência inexistente emite aviso e retorna zero ou falso; sua escrita não altera dados. Em dados antigos com aliases duplicados, vence o último ID. A CLI recusa criar essa ambiguidade.

`<JS>expressão</JS>` calcula a leitura em tempo de execução, com `this` ligado ao evento quando houver contexto e com `variableId` ou `switchId` disponível. As condições de página que dependem dessas expressões recebem atualização periódica a cada 60 quadros. A CLI apenas compila a expressão para verificar a sintaxe. Nomes antigos com vários marcadores seguem a precedência de leitura JS, Self, Map, global; a escrita segue Self, Map, global. Para novas edições, escolha um escopo. `<Global>` do Save não pode coexistir com Self ou JS.

Scripts podem usar `getSelfVariableValue(mapId, eventId, variableId)` e `setSelfVariableValue(mapId, eventId, variableId, valor)`, assim como `getMapVariableValue(mapId, variableId)` e seu setter. Os equivalentes `SwitchValue` recebem um ID numérico para switches próprios numerados; os helpers Self também aceitam letras nativas como `"A"`. Rotas aceitam `Self Variable 21: 7`, `Self Switch A: Toggle`, `Self Switch 21: On` e `Move Right: \SelfVar[21]`. Cada rota usa o evento que está se movendo. `SelfDataResetAll` apaga os dados próprios dos eventos do mapa indicado; zero seleciona o mapa atual. Os demais mapas e os valores marcados como `<Map>` permanecem intactos.

Nas rotas próprias, `\V[n]` também respeita o escopo Self da variável e lê o evento que está se movendo. `\SelfVar[n]` é a forma explícita.

`events-move commands insert` também publica `CallEvent`, `CallEventSamePageNumber` e `CallEventSamePageName`. A leitura remota usa a página salva no arquivo do mapa e conserva o ID do chamador: “Este Evento”, variáveis Self e eventos comuns filhos pertencem ao chamador. O evento usado como modelo não é alterado. Uma página ou nome ausente termina sem executar outra página; chamadas por nome exigem um evento de mapa como chamador. A troca de mapa encerra o interpretador anterior e descarta sua leitura pendente.

Em Notas de evento ou Comentários de página, use `<Click Trigger>`, `<Activation Square: 2>` (também Circle, Radius, Delta, Diamond, Row ou Column), `<Activation Region: 70>` e `<Bypass Click Stop>`. As tags de proximidade acrescentam formas de ativação por ação/toque; não bloqueiam os gatilhos nativos já possíveis junto ao evento. Os parâmetros RegionOk/RegionTouch associam regiões a eventos comuns; eventos nativos acionáveis têm prioridade. `<Screen Activation>` inicia ao entrar na tela; `<Screen Parallel>` repete sua lista, e `<Screen Parallel Once>` executa uma vez por entrada. Uma lista paralela já iniciada pode terminar fora da tela; apagar o evento cancela seu interpretador. Trocar a página conserva o estado da entrada na tela até sair e entrar novamente.

Nomeie uma página com o Comentário `<Page Name: Nome>`. Para condições próprias, coloque comandos nativos entre os Comentários `<Page Conditions>` e `</Page Conditions>`; em mapas e tropas, o bloco precisa alcançar um Comentário `<Conditions Met>` além de satisfazer as condições nativas. Em eventos comuns paralelos, a condição própria pode ativar a lista mesmo quando a condição nativa não a ativa. Preserve condições e ramificações nativas ao editar esses blocos. A Nota do mapa aceita `<Map Load Common Events: 1, 2>`, `<JS On Map Load>código</JS On Map Load>` e `<JS On Map Exit>código</JS On Map Exit>`. Os blocos JS recebem o mapa em `this`; a CLI valida sua sintaxe sem executá-los. `<Exit Reset Self Data>` na Nota do evento limpa seus dados Self quando seu mapa é aberto após outro mapa.

Os marcadores de condições também podem ser editados nos alvos `common-event:E/comment:I` e `troop:T/page:P/comment:I`. `I` aponta para um Comentário 108 existente; continuações 408 e índices de comandos são preservados. Condições de eventos comuns e tropas usam seu contexto nativo, sem herdar os dados Self de um evento de mapa.

Templates de Events são cadastrados em `Template.List`; nomes ignoram caixa e espaços externos. Mapas da lista são pré-carregados automaticamente; fontes numéricas remotas exigem `Template.PreloadMaps`. A Nota `<Copy Event: Map 1, Event 2>` (ou `<Copy Event: Nome>`) conserva ID e posição do receptor e reutiliza as páginas do modelo. `MorphEventTo` substitui o modelo e `MorphEventRemove` restaura a definição anterior. A preservação usa os IDs resolvidos, inclusive “Este Evento”, e sobrevive ao retorno ao mapa e ao save/load nativo.

Os callbacks recebem `this` como evento receptor e `arguments[0]`, `[1]`, `[2]` como mapa fonte, evento fonte e receptor. Copy executa global pre, nomeado pre, global post, nomeado post. Morph nomeado executa nomeado pre, global pre, global post, nomeado post; restaurar uma transformação preservada não repete callbacks. Spawn executa nomeado pre, global pre, nomeado post, global post; durante pre, o receptor ainda tem o ID fonte, e durante post já tem o ID dinâmico.

`SpawnEventAtXY`, `SpawnEventAtRegion` e `SpawnEventAtTerrainTag` aceitam filtros de colisão e passagem. Os seletores por lista escolhem uma casa elegível; nenhuma casa ou fonte inexistente resulta em switch de sucesso falso, sem criar evento. Um mapa numérico remoto não pré-carregado mostra o alerta nativo e mantém o switch anterior. Os comandos `SpawnEventDespawn…` retiram por ID, coordenada, regiões, terrenos ou todos. IDs começam em 1000; slots retirados não são reutilizados no mesmo estado de jogo. `$gameMap.firstSpawnedEventID()` e `$gameMap.lastSpawnedEventID()` retornam zero quando não há eventos criados. Eventos não preservados desaparecem ao sair do mapa; os preservados retornam com seus dados Self.

`EventLocationSave`, `EventLocationCreate` e `EventLocationDelete` controlam posições salvas. A Nota de mapa `<Save Event Locations>` aplica salvamento automático a todos; `<Save Event Location>` na Nota do evento ou Comentário da página aplica ao evento. O salvamento e a restauração de posições atuam somente em desktop. O estado fica em `$gameSystem` e acompanha o save nativo; esses comandos não gravam um arquivo de save por si. O retorno restaura posição e direção; restaura também o índice da rota se a página continuar igual. Apagar a posição salva faz o próximo carregamento usar a posição autorada. `<Start: 1, 2>`, `<Start X: 2>` e `<Start Y: -1>` acrescentam deslocamentos iniciais; uma posição salva tem precedência. Os aliases `Location` e `Start Location` usam a mesma sintaxe.

A Anotação do evento no editor MZ aceita uma única linha. Separe tags por espaços nesse campo: ao confirmar o evento, o editor descarta o conteúdo depois de uma quebra de linha. A CLI rejeita escritas que produzam uma Anotação de evento multilinha. Para rótulos com várias linhas, use um bloco de Comentários da página (108/408); ao editar esse bloco pela CLI, preserve sua quantidade de linhas. Notes de mapas e do banco de dados mantêm o suporte multilinha.

A apresentação de Events aceita `<Label: Atlas>` e o bloco `<Label>texto</Label>`, com quebras de linha e códigos de texto nativos. `\V[n]` é resolvido no evento receptor ao preparar a página ou executar `EventLabelRefresh`. `EventLabelVisible` mostra, esconde ou alterna todos os rótulos. `Label.SpriteBased` seleciona o rótulo em sprite ou janela; o primeiro aceita `<Label Hue Shift: 2>`. `<Label Range: 3>` usa a forma de `<Label Range Type: Square|Circle|Delta>`; Radius e Diamond são aliases de Delta. Offset/Buffer X, Y ou combinado deslocam rótulos e ícones em pixels.

`<Icon: 64>` desenha uma célula do IconSet. `EventIconChange` é substituído pela próxima preparação de página; `EventIconChangeForced` persiste sobre as tags. `EventIconDelete` mantém o ícone apagado até `EventIconRestore`. Os equivalentes `PlayerIconChange` e `PlayerIconDelete` afetam apenas o jogador. Os comandos aceitam os IDs originais de mapa/evento; zero seleciona o mapa ou chamador atual.

Arquivos em `img/characters` conservam os prefixos nativos `!` (objeto alinhado à grade) e `$` (folha 3×4). `[Inv]` ou `[Invisible]` oculta os pixels do personagem e mantém seu rótulo. `[VS8]` usa a folha 12×8 para caminhada, corrida, transporte, escada, corda e poses; não combine `[VS8]` com `$`. As rotas agora aceitam `Force Carry: On|Off`, `Pose: Victory`, `Pattern Lock: 2` e `Pattern Unlock`, além das rotas anteriores. `Force Dash` seleciona os quadros de corrida durante o movimento. Pattern Lock aceita operandos como `\SelfVar[n]`; a CLI publica a lista de poses na gramática. A pose Sleep continua animada; `this.clearPose()` em uma rota Script encerra uma pose explícita.

`<Scale: 150%>`, `<Scale X: 150%>`, `<Scale Y: 80%>`, `<Mirror Sprite>`, `<Sprite Offset: +8, -4>` e `<Custom Z: 7>` controlam o personagem no tilemap. A escala combinada tem precedência sobre os eixos no mesmo corpo de tags. Sombras usam `Movement.ShowShadows`, `DefaultShadow` e `ShadowLayer`; `<Hide Shadow>` e `<Shadow Filename: Shadow1>` personalizam um evento. `<Step Pattern: Left To Right>` altera o ciclo; também há Right To Left e Spin CW/CCW. Eventos com imagem de tile aceitam `<Tile Expand Right: 1>` e as outras três direções, estendendo o retângulo na folha de tiles.

`<Picture Filename: Marker>` carrega `img/pictures/Marker.png`; Enemy e SV Enemy selecionam suas pastas nativas. Combine com Max Size, Scale, Offset e Blend Mode, por exemplo `<Picture Max Size: 96>` e `<Picture Scale: 50%>`. O maior lado é ajustado ao máximo antes de aplicar a porcentagem. A imagem acompanha o evento; trocar sua página invalida carregamentos antigos, e apagar o evento remove sua imagem. Arquivos ausentes mantêm o erro de carregamento nativo do MZ. Esses anexos estáticos usam uma imagem inteira; a integração com AnimatedPictures pertence à sua capacidade própria.

Os comandos `ShadowHidePlayer`/`ShadowShowPlayer`, `ShadowHideFollowers`/`ShadowShowFollowers` e `ShadowHideAllEvents`/`ShadowShowAllEvents` controlam os três grupos separadamente. Mostrar eventos restaura as sombras permitidas pelas Notes; corrige o comando original que mantinha o grupo oculto. Offsets visuais não deslocam o tile usado pelo clique nativo.

Temporizador: inicie pelo comando nativo de controle do temporizador. `EventTimerFramesSet` e `EventTimerFramesGain` somam Frames + Seconds×60 + Minutes×3600 + Hours×216000; só atuam enquanto ele está em funcionamento e limitam o resultado a pelo menos 1 frame. `EventTimerSpeed` usa valores assinados: -1 reduz um frame por atualização ativa, 0 congela o valor e positivos aumentam. Velocidade positiva também inicia a contagem com pelo menos 1 frame. Iniciar com zero pelo comando nativo não dispara expiração.

`EventTimerPause` preserva o tempo e `EventTimerResume` continua; repeti-los não duplica trabalho. Iniciar/parar nativamente limpa a pausa. `EventTimerExpireEvent` reserva o Common Event quando a contagem cruza zero; atualizações posteriores não o reservam de novo. A atribuição permanece para uma próxima contagem. `EventTimerExpireClear` restaura a expiração nativa, que aborta a batalha. O menu não avança o temporizador; uma transferência preserva seu estado.

Seguidores: `FollowerSetGlobalChase` controla o acompanhamento do grupo e `FollowerSetTargetChase` o do índice escolhido, começando em 1. `FollowerSetControl` redireciona o alvo “Jogador” dos comandos de evento para esse seguidor, sem trocar o personagem controlado pelas teclas. Um índice ausente não recebe a rota. `FollowerReset` restaura o alvo Jogador e o acompanhamento global e individual; pode ser repetido, inclusive após uma transferência. Definir controle não desliga o acompanhamento: desative-o separadamente para manter uma posição manual.

A Note do mapa aceita `<Hide Followers>` e `<Show Followers>` para sobrepor a visibilidade nativa apenas nesse mapa. Se ambas existirem, Hide vence. A transferência recalcula a regra do destino, sem alterar a configuração nativa de mostrar/ocultar seguidores.

O original `VisuMZ_2_CommonEventMenu` 1.02 funciona após `Coreto_1_EventsMoveCore`, com o Events original desativado. Instale o arquivo original licenciado no jogo e mantenha sua descrição nativa; o pacote Coreto não o distribui. `events-move --help` informa as versões dos consumidores compatíveis e `events-move validate` identifica provedor ausente, ordem incorreta, arquivo ausente ou versão declarada incompatível.

No editor, use o comando original **Common Event Menu: Start** e os comentários do Common Event para nome, imagem, ajuda, subtexto e condições. A seleção executa o evento filho e retorna ao chamador. Para permitir cancelar sem ação, selecione um Common Event válido contendo apenas o comando final vazio. Reabrir o menu recalcula as condições por switches. Uma lista sem IDs válidos apresenta o diagnóstico nativo no Playtest e continua sem abrir o menu. Consulte a ajuda para a lista completa de integrações compatíveis.

### Imagens animadas anexas

O original licenciado `VisuMZ_4_AnimatedPictures` 1.05 pode ser carregado após `Coreto_1_EventsMoveCore`. Use um atlas em `img/pictures` com nome como `Marker[ANI][3x2].png` e a Note ou comentário `<Picture Filename: Marker[ANI][3x2]>`. `<Picture Wait Frames: 2>` define duas atualizações do motor por célula, com mínimo de uma; `<Attach Picture Delay Frames: 2>` é uma forma equivalente. As células percorrem as colunas e depois as linhas, repetindo a sequência. O comando `events-move tags` publica `attach-animation-delay`; a validação identifica a ausência do consumidor.

Scale e Offset continuam relativos ao evento. Troca de página e morph reavaliam as tags e substituem a imagem; despawn retira o anexo sem destruir a imagem compartilhada de outro evento. Para atlas, prefira `<Picture Scale: 25%>`: o consumidor original calcula a grade depois do carregamento básico, portanto Max Size pode usar as dimensões anteriores na primeira substituição. Arquivos originais e imagens licenciadas não são distribuídos pelo pacote Coreto.

### Bússola e minimapa

O original `VisuMZ_4_ProximityCompass` 1.08 funciona após `Coreto_1_EventsMoveCore`. Marque eventos com `<Compass Icon: 16>` na Note ou no comentário da página conforme a autoria do consumidor. Um spawn desse modelo recebe seu próprio indicador; movimento atualiza sua posição e despawn o oculta. Transferir ou carregar reconstrói os indicadores dos eventos atuais, incluindo os spawns preservados.

O minimapa consulta as regiões All/Player Allow/Forbid do Events. Por exemplo, `<Player Forbid Region: 70>` deixa a região 70 bloqueada para o jogador e transparente no mapa de passagem; `<Player Allow Region: 90>` permite a região 90. Forbid prevalece sobre Allow. Essa classificação é de passagem do jogador, sem prometer ícones para alvos que o consumidor não representa. Os marcadores e opções específicos da bússola continuam no plugin original; `events-move` publica as regras de região e os comandos de spawn/despawn.

### Perseguição e encontros

O original `VisuMZ_4_EncounterEffects` 1.12 pode ser carregado após `Coreto_1_EventsMoveCore`. As tags de alerta e encontro pertencem ao consumidor original. Para um jogador em quatro direções com um perseguidor diagonal, use PlayerMovementDiagonal = `disable` e `<Enable Diagonal Chase>` no evento. A combinação inversa usa `enable` e `<Disable Diagonal Chase>`. O Coreto respeita a escolha do perseguidor também no retorno à posição inicial, sem alterar a configuração do jogador.

`<Alert Range: 12>`, `<Alert FoV Angle: 360>`, `<Alert Response: chase>` e `<Return Position>` formam um exemplo de perseguidor que detecta, segue e retorna. `<Alert Time: 6>` mantém o alerta por seis atualizações após perder o alvo; `<Return Time: 2>` espera duas antes de retornar. StopAutoMoveEvents e StopAutoMoveMessages controlam a atualização do alerta durante eventos e mensagens, conforme o original; não representam uma pausa geral de toda animação ou movimento já iniciado. Após Battle Processing, uma self switch para uma página sem alerta impede que o mesmo encontro seja iniciado novamente.

### Personagens DragonBones

A integração usa os originais `Public_0_Dragonbones` 5.7.002b e `VisuMZ_2_DragonbonesUnion` 1.32. Carregue a biblioteca antes de DragonbonesUnion, e o consumidor depois do Coreto Events. Biblioteca, plugin licenciado, skeleton, atlas e textura são recursos obrigatórios do jogo e não acompanham a distribuição Coreto.

Configure AssetsPath e atribua uma imagem nativa ao evento: a regra de visibilidade do MZ continua ocultando eventos sem gráfico. O consumidor oculta o quadro dessa imagem e desenha o esqueleto. Use, por exemplo, `<Dragonbones Sprite: Personagem>` na Anotação e `<Dragonbones Sprite Scale: 0.15, 0.15>` em um Comentário da página. Mantenha o nome do recurso sozinho na Anotação: o consumidor original pode incorporar uma segunda tag da mesma linha ao nome do arquivo. As tags de escala, offset, direção e animação DragonBones permanecem na autoria do consumidor original.

Em tile de escada com o TerrainTag de corda configurado no Events, o movimento tenta ropeclimb, ladderclimb e walk; parado, tenta ropeidle, ladderidle e idle. Só a ausência de uma animação opcional usa esse fallback. Skeleton, atlas ou textura ausente é uma falha de recurso. Personagens DragonBones seguem a orientação VS8 na corda; Flip Left e Flip Right do consumidor controlam o espelhamento.

### SaveCore original e continuação de eventos

`VisuMZ_1_SaveCore` 1.14 e `Coreto_1_SaveCore` 0.1.0 funcionam após `Coreto_1_EventsMoveCore`; o provedor original aceita os modos Standard e Single. Mantenha um único provedor de Save ativo. O Events fornece a limpeza do cache de eventos que o SaveCore chama após carregar; eventos com `<Save Event Location>` e seus dados Self continuam disponíveis para movimentação e interação.

No modo Standard, a escolha do arquivo ocorre na lista. No modo Single, use Salvar no menu principal: o arquivo é o slot 0 e Continue pode carregar diretamente do título. O comando nativo Abrir Tela de Save usa a lista do MZ, que não permite gravar o slot 0. Salvar pela tela Save mantém a lista aberta após a confirmação: use Cancelar para voltar ao mapa. A compatibilidade entre provedores de Events de um save antigo é uma verificação distinta da continuação no mesmo provedor.

### Escolhas e popups com MessageCore

`VisuMZ_1_MessageCore` 1.57 e `Coreto_1_MessageCore` 0.1.0 funcionam após `Coreto_1_EventsMoveCore`, inclusive com BattleCore e OptionsCore próprios. As condições Self de visibilidade e habilitação das escolhas usam o evento que iniciou a mensagem, inclusive em uma página chamada por outro evento. Cancelar, reabrir e redesenhar a lista preservam esse contexto.

`MsgPopupPlayer`, `MsgPopupFollower`, `MsgPopupEvent` e `MsgPopupTargetTile` mostram texto no mapa. Ative um único provedor MessageCore após Events. Sem essa capacidade, a validação aponta o comando e o runtime informa a dependência ausente. Os comandos não mostram popups na batalha.

FollowerIndex começa em 0; EventId = 0 usa o evento chamador. Alvos inexistentes não criam popup. O popup guarda o tile do personagem no instante da criação e acompanha a rolagem do mapa, sem seguir movimentos posteriores do personagem. TileX e TileY são arredondados. MsgDuration usa frames, com mínimo de 12; 0 usa 60. PopupExtra permite fades, offsets, escalas, ângulos e arco. O texto usa os códigos e o estilo do MessageCore ativo. O popup desaparece ao expirar e não atravessa uma transferência de mapa.

### Reflexos do VisualParallaxes

O original `VisuMZ_4_VisualParallaxes` 1.15 funciona após `Coreto_1_EventsMoveCore`. Configure regiões ou Terrain Tags refletivos no consumidor, por exemplo `<Solid Reflection Region: 40>`, `<Solid Reflection Opacity: 100%>` e `<Solid Reflection Blur: 0>` na Note do mapa. O consumidor requer os filtros PIXI e não cria suas camadas de reflexo em mapas com loop ou `<No Reflections>`.

O reflexo usa a imagem, posição e escala do personagem, com o eixo Y invertido, e acompanha a rolagem e as mudanças de página, opacidade e gráfico. Spawn e morph atualizam seus próprios reflexos. O Coreto remove os sprites do evento despawnado, incluindo reflexos, preservando imagens compartilhadas por outros personagens; transferir ou retornar do título reconstrói os donos atuais. Máscaras, camadas, filtros e tags específicas de reflexo continuam pertencendo ao consumidor original.

### Autoria de doodads

Carregue `VisuMZ_2_DoodadsSystem` 1.02 e depois `VisuMZ_3_DoodadsEditor` 1.02, ambos após Coreto Events. Para editar e gravar `data/Doodads.json`, inicie um Playtest pelo editor MZ, pressione F10 e use Place Doodads e Save and Close. A autoria exige o NW.js local e acesso ao projeto; reproduzir um layout no navegador não oferece esse fluxo de gravação.

Após salvar, o MZ pode avisar que os dados foram modificados externamente. Aceitar o recarregamento atualiza também a sessão de Playtest; recusar mantém a sessão atual. Reabra F10 para conferir a edição. Use arquivos PNG na pasta de doodads configurada e reinicie o Playtest após adicionar novos arquivos.

Doodads não criam colisão. Marque a região desejada no mapa e use, por exemplo, `<Player Forbid Region: 70>`. Remover a restrição permite passagem sem remover a imagem. Eventos e regiões continuam nos arquivos nativos de mapa; o layout visual permanece em Doodads.json.

## Main Menu: configuração inicial

Use `main-menu --help` e `main-menu api list` pela CLI instalada para descobrir os
parâmetros. `main-menu api describe CORETO-CONFIG-SOURCE` explica a herança e a
configuração própria. `main-menu install --project "<jogo>"` seleciona o provedor e
preserva os demais plugins; ative um Core Engine compatível antes dele.

`main-menu parameters get --path /CommandWindowStyle --project "<jogo>"` consulta o
estilo efetivo. Para editar, use `main-menu parameters set --path /CommandWindowStyle --value '"default"' --project "<jogo>" --dry-run`; remova `--dry-run` para aplicar.
`parameters reset` com o mesmo caminho restaura o padrão. A primeira edição
funcional em `inherit` materializa `own`. Reabra o Editor antes de salvar após uma
edição externa. Esta versão cobre configuração, navegação, retratos e janelas auxiliares; confira
os limites publicados na ajuda antes de adotar os consumidores ainda em qualificação.

### Comandos e categorias do menu

Edite `/CommandList` no Plugin Manager ou use os caminhos publicados em
`main-menu api describe /CommandList`. A lista preserva a ordem autorada; símbolos
e nomes de categoria distinguem maiúsculas de minúsculas. `TextStr` vazio ou igual
a `Untitled` usa `TextJS`. O ícone 0 não desenha um ícone.

`TextJS` e `ExtJS` recebem a janela `Window_MenuCommand` como `this`, sem
argumentos. `ShowJS` e `EnableJS` recebem a mesma janela, o símbolo em
`arguments[0]` e a definição do comando em `arguments[1]`. Retorne um booleano;
essas condições podem ser consultadas várias vezes ao atualizar o menu. A
extensão retornada por `ExtJS` chega como único argumento às ações.

`CallHandlerJS` recebe a janela como `this`. Por exemplo, para contar uma execução
e permanecer no menu, escreva:

```javascript
$gameVariables.setValue(1, $gameVariables.value(1) + 1);
this.refresh();
this.activate();
```

Para escolher um ator, use `SceneManager._scene.commandPersonal();` na ação
direta. `PersonalHandlerJS` recebe a cena `Scene_Menu` como `this`. Consulte o
ator com `this._statusWindow.actor(this._statusWindow.index())`: a atualização
nativa de `$gameParty.menuActor()` ocorre depois desse callback. Para abrir as
habilidades do ator confirmado, use `SceneManager.push(Scene_Skill);`.

Uma categoria usa símbolo `subcategory`, `ExtJS` retornando seu nome e ação
`this.setSubcategory(arguments[0]);`. Os filhos usam esse nome em `Subcategory`.
`return this.isSubcategoryVisible(arguments[1]);` em `ShowJS` esconde uma categoria
sem filhos visíveis. Cancelar volta à raiz e seleciona a categoria de origem
quando ela existe nessa lista. Filhos de uma categoria não definida aparecem na
raiz. Os símbolos de categoria recebem um sufixo numérico na lista visível.

A CLI armazena esses corpos de função sem executá-los. Erros de sintaxe aparecem
no carregamento do plugin e exceções durante o uso chegam ao tratamento de erros
do MZ. Consulte `api describe` para um exemplo de edição de cada campo e reinicie
o Playtest depois de mudar os parâmetros.

### Eventos: disponibilidade dos comandos

No comando de evento **Plugin Command**, escolha uma operação de Main Menu e
informe `Symbol(s)` com os símbolos autorados, por exemplo `save` e `skill`.
A correspondência distingue maiúsculas de minúsculas. A mudança aparece na
próxima abertura ou atualização da lista do menu.

| Operação | Efeito |
| --- | --- |
| Force Show | Mostra os símbolos e substitui Force Hide |
| Force Hide | Oculta os símbolos e substitui Force Show |
| Force Enable | Permite ativação e substitui Force Disable |
| Force Disable | Impede ativação e substitui Force Enable |
| Clear Forced Settings | Remove as quatro substituições dos símbolos selecionados |

Visibilidade e ativação são independentes: mostrar não habilita, e habilitar não
mostra. Repetir uma operação não acumula efeitos. Clear restaura as condições
`ShowJS` e `EnableJS`; uma lista de símbolos vazia não altera nada.

Pela CLI instalada, leia primeiro o evento e use o `fileHash` retornado:

```sh
node coreto/tools/coreto/cli.mjs main-menu commands list --project "<jogo>" --target common-event:1 --json
node coreto/tools/coreto/cli.mjs main-menu commands insert --project "<jogo>" --target common-event:1 --before 0 --command MenuCommandForceHide --value '{"Symbols":["save"]}' --expected-hash "<fileHash>" --dry-run --json
```

Remova `--dry-run` para aplicar. Para editar ou remover uma entrada existente,
use `update` ou `remove` com `--index` e um hash recém-lido. `update` altera os
argumentos do comando indicado; para trocar a operação, remova a entrada e insira
a nova, relendo o hash entre as escritas. A atualização preserva
o receptor legado de eventos existentes; novas entradas usam o receptor Coreto.
Se o arquivo mudou, leia-o novamente antes de editar. Comentários e outros
comandos do evento permanecem preservados. Reabra o Editor antes de salvar.

### Retratos e listas de atores

`/StatusListStyle` controla a lista principal e `/InnerMenuListStyle` controla a
lista de alvos em submenus. Os valores são `default`, `vertical`, `portrait`,
`solo`, `thin` e `thicker`. `/StatusGraphic` escolhe `none`, `face`, `sprite` ou
`svbattler`; o estilo `portrait` usa o retrato quando existe e a apresentação
vertical quando não existe. `/CommandWindowStyle` aceita `default`, `top`,
`thinTop`, `bottom`, `thinBottom` e `mobile`, inclusive em desktop. As dimensões
de linhas/colunas ficam em `/CustomCmdWin`. Os corpos JavaScript em `/ListStyles`
recebem o ator e seu retângulo em `arguments[0]` e `arguments[1]`, com a janela
como `this`; editar pela CLI não executa esses corpos.

Na nota de um ator, `<Menu Image: Actor1_1>` e `<Menu Portrait: Actor1_1>` são
alternativas para o mesmo campo. O arquivo é `img/pictures/Actor1_1.png`.
`<Menu Portrait Offset: +8, -6>` desloca o recorte; um eixo individual, como
`<Menu Image Offset X: -3>`, prevalece sobre o eixo correspondente do par.
Preserve os sinais e espaços. A primeira ocorrência de cada variante é lida.
Para editar seletivamente, consulte `main-menu tags list --target actors:1
--json`, use `menu-image`, `menu-image-offset`, `menu-image-offset-x` ou
`menu-image-offset-y` e passe o `fileHash` retornado em `--expected-hash`.
Use `--occurrence` quando houver duplicatas e releia a lista depois de escrever.

`ChangeActorMenuImageGroup` recebe `Step1` como lista de IDs numéricos e `Step2`
como nome do arquivo. `ChangeActorMenuImageRange` recebe `Step1Start`, `Step1End`
e `Step2`; inclui ambas as pontas, mesmo em ordem inversa. O comando legado
`ChangeActorMenuImageJS` recebe uma lista de trechos JavaScript em `Step1` e
aceita resultados que sejam IDs ou listas de IDs. `ChangeActorMenuImageJS_v124`
recebe os corpos `ActorJS` e `FilenameJS`, que retornam um ID e um nome de arquivo.
A função do arquivo só é executada quando o ator existe. Use `main-menu api
describe <comando> --json` e o fluxo de `commands list`/`commands insert` com hash
para autorar eventos. Os identificadores de eventos legados continuam aceitos.

`/General/ShowReserve` controla a presença de reservas. Com `HideMainMenuOnly`
ativo, a ocultação vale apenas no menu principal. `StatusSelectLast` controla a
seleção anterior e `SoloQuick` permite abrir uma ação pessoal diretamente quando
há um único integrante. `/General/ActorBgMenus` lista as cenas que exibem o
retrato ao fundo; `/General/ActorBgMenuJS` configura seu sprite depois da carga,
com o sprite como `this`. Não grave sprites ou bitmaps em variáveis de jogo.

### Ouro, tempo, variáveis e ponteiro

`/General/ThinGoldWindow` usa a janela de ouro compacta. `/Playtime/Enable` e
`/Variable/Enable` habilitam as janelas auxiliares; cada uma publica `FontSize`,
`BgType`, `AdjustCommandHeight` e `WindowRect`. No estilo padrão, `WindowRect`
executa no contexto de `Scene_Menu`; os estilos horizontais reservam posições
próprias. `AdjustCommandHeight` desconta a altura auxiliar da lista de comandos.
O tempo acompanha o relógio do jogo, com atualização a cada 60 frames.

`/Variable/VarList` recebe IDs de variáveis. O nome cadastrado no banco é o rótulo;
`\I[208] Créditos` acrescenta o ícone 208. IDs sem nome não desenham uma linha.
O valor usa a leitura nativa do MZ, inclusive zero para uma string vazia. Reabrir o
menu recria essas informações com os valores atuais.

Coloque as imagens do cursor em `icon/`, incluindo a extensão no parâmetro.
`/MouseCursor/idleFilenameIcon` define a imagem normal e
`/MouseCursor/clickFilenameIcon` a pressionada; quando esta fica vazia, usa a normal.
Habilite `/MouseCursor/Enable` e configure `anchorX` e `anchorY`: 0 corresponde ao
início da imagem, 0.5 ao centro e 1 ao fim. As âncoras usam as dimensões da imagem
normal. O cursor é instalado no boot, continua entre cenas e deixa os cliques
alcançarem as janelas. Em dispositivos detectados como móveis ele fica desativado.
Reinicie o jogo depois de alterar essas opções; teclado continua disponível.

### Formação com PartySystem

Mantenha `VisuMZ_2_PartySystem` 1.36 depois do Core Engine, Battle Core e Main Menu.
O consumidor continua original. `Coreto_1_MainMenuCore` fornece o desenho de
battlers laterais usado nas listas ativa e reserva, preservando os ícones de
bloqueio e obrigatoriedade e a ajuda de botões do Core.

Para trocar a formação em batalha, habilite **Party Command Window → Add Party
Command** no PartySystem. Para a troca individual, inclua `party` na lista
**Actor Command Window → Battle Commands** do Battle Core e habilite a opção
correspondente do PartySystem. Os comandos nativos `LockPartyMembers` e
`RequirePartyMembers` continuam autorados pelo Plugin Manager e pelos eventos do
consumidor: bloqueio impede trocar a posição; um membro obrigatório fora da equipe
ativa impede encerrar a cena de formação até que ele retorne.

A comparação automatizada desta integração cobre formação, retirada/restauração,
troca da equipe e troca individual em batalha por turnos, com MainMenu original e
Coreto, Core Engine original e Coreto, e Battle Core original e Coreto. A troca de
cada provedor é comparada separadamente. Isso não constitui cobertura de todas
as combinações de sistemas de batalha ou de parâmetros do PartySystem.

### Recompensas com VictoryAftermath

Mantenha `VisuMZ_3_VictoryAftermath` 1.23 depois de Battle Core e Main Menu.
A tela de subida de nível usa a imagem atual de `getMenuImage()`, inclusive
alterações feitas por evento antes da batalha. Habilite o bust em **Level Up**
do consumidor e use arquivos existentes em `img/pictures/`. Uma vitória sem
subida de nível retorna sem abrir esse segmento.

Configure os eventos **Battle End Event** e **Victory Event** e os callbacks de
mecânica no Battle Core. O fluxo de vitória chama essas operações e concede as
recompensas; um evento de retorno não precisa concedê-las novamente. Os pontos
`BattleManager.processBattleCoreJS`, `processPostBattleCommonEvents` e
`Scene_Battle.setVisibleUI` estão descritos em `battle api describe` para autores
de integrações que substituem fases da batalha.

O Core Engine fornece as cores de EXP e nível máximo, os parâmetros exibidos e
os nomes das teclas de continuação. Com Items/Equips original, **Item Quantity
Format** controla a quantidade recebida e **Parameter Value Font Size** controla
os números da subida de nível. Message Core limita a largura da fala por
**Message Width**. A opção **Battle Animation Speed** acelera o combate, mas o
VictoryAftermath mantém sua própria contagem em velocidade normal por meio de
`Scene_Battle.allowUpdateBattleAniSpeed()`.

A qualificação desta integração usa batalhas por turnos, recompensas determinadas,
um ator que sobe de nível, outro que não sobe e um ator no nível máximo. As
comparações isolam MainMenu, Core Engine, Battle Core, Message Core e Options Core;
Items/Equips permanece original. Outros consumidores e modalidades de batalha
exigem os respectivos cenários de integração.

### Classes, retratos e passivas

Use `VisuMZ_2_ClassChangeSystem` 1.20 e `VisuMZ_1_SkillsStatesCore` 1.58
inalterados, depois dos provedores Core, Battle, MainMenu e Message. Configure
**Starting Multiclasses** e **Always Unlocked** no ClassChangeSystem; o comando
pessoal abre a lista para o ator escolhido. A prévia não altera o ator; confirmar
aplica a classe e cancelar mantém a última escolha confirmada.

Na nota do ator, os seletores de classe usam IDs nativos de `Classes.json`:

```text
<Class 1 Menu Portrait: Actor1_2>
<Class 2 Menu Portrait: Evil_1>
<Class 1 Battle Portrait: Monster_1>
<Class 2 Battle Portrait: Evil_2>
<Passive State: 10>
```

Os arquivos correspondentes devem existir em `img/pictures`, sem a extensão no
seletor. Para vê-los no menu, escolha **Status List Style: portrait**; em batalha,
**Battle Layout: portrait**. Os comandos explícitos de imagem do ator continuam
prioritários. Na nota do estado passivo, `<Passive Condition Class: 2>` limita o
efeito à classe indicada; os traços do estado determinam o efeito real, como a
taxa do parâmetro ATK. Use os IDs livres do seu jogo.

Na classe, `<Icon: 76>` define o ícone. Um bloco `<Help Description>` aceita
`<WordWrap>` por meio do Message Core. Coreto Core preserva o despacho das notas
dos atores usado pelo ClassChangeSystem e o alinhamento dos ícones de estados;
Coreto MainMenu mantém os retratos da classe no menu, na janela de classes e na
integração com o BattleCore original.

### Conjuntos de equipamento

Mantenha `VisuMZ_1_ItemsEquipsCore` 1.61, `VisuMZ_1_SkillsStatesCore` 1.58 e
`VisuMZ_2_EquipSetBonuses` 1.05 inalterados, após Core, Battle e MainMenu.
O Coreto Core fornece a interface e o processamento de notas exigidos pelo
EquipSetBonuses mesmo quando Message não está ativo.

Cadastre o conjunto no parâmetro **Equip Sets** do EquipSetBonuses. Por exemplo,
**Guarda**, com **Piece 2** configurado para **MaxHP Plus: 50** e a lista
**Passive States** contendo um estado de taxa ATK 200%. Atribua uma peça de cada
slot com `<Equip Set: Guarda>` nas notas das armaduras; os atributos próprios
dessas peças somam-se ao bônus do conjunto.

As notas do ator podem selecionar imagens para esse limiar:

```text
<Menu Portrait: Actor1_2>
<Battle Portrait: Monster_1>
<Guarda Set, 2 Pieces Menu Portrait: Evil_1>
<Guarda Set, 2 Pieces Battle Portrait: Evil_2>
```

Use arquivos existentes em `img/pictures`, sem extensão nas notas. O menu com
estilo **portrait**, a janela de equipamento com **Menu Portraits** habilitado e
a batalha com layout **portrait** apresentam o ator atual. Remover uma peça
retira o bônus e a passiva do conjunto e restaura a imagem aplicável anterior;
reequipar reativa o efeito sem acumulá-lo.

### Combinar formação, classe, conjunto e vitória

Na composição conjunta, mantenha a ordem Core, Battle, MainMenu, Items,
Message, Options, Save, SkillsStates, ClassChangeSystem, EquipSetBonuses,
PartySystem e VictoryAftermath. Os quatro consumidores continuam originais.
A formação escolhe os membros ativos; classe e equipamento continuam ligados
ao ID do ator, inclusive depois de trocar um membro ativo por um reserva.

Com ClassChangeSystem antes de EquipSetBonuses, um retrato explícito definido
por comando MainMenu tem prioridade no menu. Sem esse valor, aplica-se o
retrato do conjunto ativo, depois o da classe e por fim o retrato-base do ator.
Definir um nome vazio pelo comando retira a prioridade explícita. Desfazer o
conjunto restaura a imagem da classe; voltar a uma classe sem substituição
restaura a imagem-base. Alterar a classe antes ou depois de equipar não muda
essa prioridade.

VictoryAftermath apresenta o retrato de menu atual no aumento de nível.
O retrato explícito de menu não substitui o retrato de batalha definido para
o conjunto ou a classe. Ganhos de nível, recompensas, passivas e formação
permanecem ao retornar ao menu. Para comparações reproduzíveis de recompensas,
configure valores fixos de **Per Action** e **Per Enemy** em **Job Points**:
os padrões de ClassChangeSystem incluem sorteio.


A composição também admite Coreto Core, Battle, Message, Options e Save,
conservando ItemsEquips, SkillsStates e os quatro consumidores originais.
Core e Battle devem preceder MainMenu e os consumidores. Sem Core, MainMenu
interrompe a inicialização com `MM_DEPENDENCY_MISSING`; habilite um dos
providers de Core aceitos antes dele. Battle Coreto exige Coreto Core.

Para integrações de múltiplas classes, Battle preserva
`VisuMZ.BattleCore.Game_Actor_equips.call(actor)`: essa leitura retorna todos os
slots reais do ator, incluindo `null` nos slots vazios, sem mudar equipamentos
ou arma ativa. ClassChangeSystem usa esse acesso durante a ação para evitar
recursão entre equipamentos e traços de classe. A leitura usual
`actor.equips()` mantém o filtro de arma ativa da batalha. O ponto de extensão
está disponível em `api describe` no namespace `battle`.

### Continuar saves de Main Menu

Saves produzidos com Main Menu 1.27 na composição descrita acima podem ser
carregados com Coreto Main Menu e salvos novamente, inclusive com Coreto Save.
Formação, classe, equipamentos, retrato explícito e comandos forçados são
restaurados. Carregar um checkpoint anterior restaura os valores daquele
checkpoint, sem conservar as alterações do save mais recente.

No navegador, preserve a identidade do jogo e a origem que contém o armazenamento.
No NW.js, preserve a pasta de saves do jogo. Os dois formatos de armazenamento
foram verificados separadamente; copiar arquivos nativos para o armazenamento
do navegador não é um procedimento de migração. Mantenha uma cópia dos saves
originais antes de substituir plugins. A qualificação cobre continuação para
Coreto; não estabelece retorno ao plugin original, outras versões de Main Menu
ou importação de campanhas com composições diferentes.

### Personalizar desenhos e opções gráficas

`StatusGraphic` também governa a alternativa sem retrato nas telas de classe e
equipamento: `none` deixa a área sem imagem, `sprite` usa o personagem do mapa e
`svbattler` usa o battler lateral. Um retrato de batalha específico tem prioridade;
na ausência dele, Battle pode usar o retrato de menu disponível.

Os callbacks de `ListStyles` recebem o ator em `arguments[0]` e o retângulo em
`arguments[1]`, com `this` ligado à janela de status. Métodos como
`this.drawActorGraphic(actor, x, y, width, height)` usam a opção gráfica atual.
`this.drawSvActor(nome, x, y)` desenha uma célula da folha SV; um nome contendo
`$` usa a imagem inteira, centralizada em `x` e com a base em `y`. Coloque esse
arquivo em `img/sv_actors` e aguarde `ImageManager.loadSvActor(nome)` carregar
antes de desenhar. O retorno desses callbacks é ignorado.

Ao sair de uma subcategoria por evento comum, abrir novamente o menu começa na
categoria raiz. Voltar de uma tela pessoal, como habilidades, mantém a categoria
que a abriu. Use `api describe` no caminho do campo para consultar o contexto
JavaScript, o resultado esperado e um exemplo de edição. A CLI armazena esse
código; ele só é executado pelo jogo.

## DesignSystem e preset

`design-system api list` descobre parâmetros e métodos de runtime; `design-system api describe /` retorna os defaults. `design-system install --project "<jogo>" --dry-run` prepara a ativação após CoreEngine, MessageCore e ExtMessageFunc. Omita `--dry-run` para confirmar a escrita. A instalação não ativa dependências nem reorganiza entradas existentes.

Use `skills describe game-coreto-eng-design-system --json` para localizar as instruções do preset completo, que também exige OptionsCore e SaveCore. A skill entrega imagens, fontes, receitas, prévia e recuperação. Reinicie o jogo depois de alterar parâmetros. Os métodos `CoretoDesignSystem` são APIs de runtime, não comandos da CLI.


## Items and equipment

Use `node coreto/tools/coreto/cli.mjs items-equips --help --json` to discover the
interface. Add `--project "<jogo>"` using the selected game path. The delivered
bundle is `Coreto_1_ItemsEquipsCore`; install it after Core and any Battle provider,
with only one Items provider active. `items-equips install --dry-run --json`
previews selection and configuration materialization; omit `--dry-run` to apply
an authorized change. Existing unrelated selections are preserved.

Configuration defaults to `inherit`: an inactive original registry entry supplies
its values; without one, the Coreto entry supplies them. `own` uses only the
Coreto entry. `parameters get/set/reset --path /ItemScene/ListWindowCols` follows
the shared configuration workflow. A functional edit materializes effective
values without losing false, zero, empty or unrelated fields; the column reset
default is 1. Use `--value 3` with `set` to author three columns.

`ActorChangeEquipSlots` changes the named actors' slot layout; `ActorResetEquipSlots`
restores their default layout. Discover arguments with `api describe`, and use
`commands list/update/insert/remove` with the current file hash for native event
authoring. Actor arrays use IDs; slot arrays use exact equipment type names from
System. Existing legacy command receivers are preserved. Reopen the Editor after
external edits and restart the game to consume updated parameters.

Inventory supports maximum quantities, categories, sorting, conditional use,
conservation and item color/quantity/new-item labels. Consult `api describe` for each capability's conditions and supported consumers.
The MainMenu composition examples above retain their explicitly named original
Items provider; the Items sections below describe the delivered Coreto provider.

Run `items-equips tags list --target items:1 --json` first and use its `fileHash`
for the next mutation. Read a fresh hash after each change. Use an existing database ID with `items-equips tags set --target items:1 --tag
max --value 3 --expected-hash "<fileHash from list>" --json` to write `<Max: 3>` in its native Note. The `max` tag also
accepts `weapons:ID` and `armors:ID`; 0 prevents holding that object. Defaults
come from `/ItemScene/MaxItems`, `/ItemScene/MaxWeapons` and
`/ItemScene/MaxArmors`. `tags list/remove` uses the same targets, with
`--occurrence` when duplicate physical entries exist.

`categories` writes a complete tag such as `<Categories: Healing, Trade>`;
`category-block` accepts a multiline `<Categories>` block with one name per
line. Membership accumulates without duplicating inventory. In `/Categories/List`,
author a row with `Type: "Category: Healing"`, `Icon: 0`, `SwitchID: 0` and
`SortBy: "Name"`. `SwitchID` hides the tab until enabled. ID sorting uses
descending `<Sort Priority: 80>` then ascending ID. The `color` tag accepts
`<Color: #11aa77>` or a palette index such as `<Color: 17>`.

`item-switch` accepts `<Enable All Switches: 1, 2>` and corresponding Enable Any,
Disable All or Disable Any forms; `SW`, `Switch` and `Switches` are aliases.
Unqualified Enable/Disable means ALL. Evaluation precedence is Enable, Enable
All, Enable Any, Disable, Disable All, Disable Any, taking the first matching
family. Possession, occasion and native user restrictions still apply.

`item-enable-js` takes a complete `<JS Item Enable>` block. Assign `enabled`,
initially true; `this`, `user`, `target`, `a` and `b` all identify the user
battler, while `item` is the database item. Example body: `enabled = user.hp > 1;`.
The recipient is a different concept. Authorship and `items-equips validate`
compile the code for syntax checks without executing it.

`conserve` accepts `<Conserve: 0%>` or `<Preserve: 100%>` (also `％`). Zero always
consumes a consumable; 100 always retains it while the action still takes effect.
`/ItemScene/ItemQuantityFmt` substitutes `%1` and `ItemQuantityFontSize` controls
its text. Key-item numbers follow the native System option. `/New` settings
control new-item labels, cleared on inspection. Restart the game after edits.


### Equipment slots and restrictions

In a Class Note, `<Equip Slots>` contains one exact equipment type name from
Database > Types per line. Names are case-sensitive; repeat a name for duplicate
slots. A forced actor layout overrides the class across class changes until
`ActorResetEquipSlots` restores the current class layout. Removed or incompatible
slots return their equipment once. Native Change Equipment selects the first
empty matching slot, then the last matching slot when full. Initial actor
equipment is remapped from native equipment-type positions, not arbitrary slot
indices; dual wield makes the second slot a weapon when it exists.

Weapons and Armors support `<Equip Copy Limit: 1>`, `<Equip For Classes Only:
1, Ranger>` and an `<Equip Requirements>` block. Use one requirement per line:
`level >= 5`, `atk >= 10`, `Learned Skill: Fire`, or `Switch: 2`. Level aliases
are LV/LVL; parameter names are MAXHP/MAXMP/MHP/MMP/ATK/DEF/MAT/MDF/AGI/LUK.
Comparators are `>`, `>=`, `===`, `<=`, `<`, with unsigned integer thresholds.
Parameters use base values plus permanent additions. Unknown lines are ignored;
this block does not execute JavaScript. Class and skill names ignore case.
Actor refresh releases equipment whose requirements no longer pass; changing a
switch alone does not guarantee an immediate refresh.

`<Equip Weapon Type Limit: 1>` belongs on Weapons and counts `wtypeId`;
`<Equip Armor Type Limit: 2>` belongs on Armors and counts `atypeId`.
Use positive limits. Public selection and Optimize enforce copy/type limits;
event and script changes can bypass them. Replacement excludes the current slot
from its count. `<Added ETypes: 4, Accessory>` on Armors allows additional
non-weapon equipment types; names ignore case. Any sealed primary or added type
prevents equipping. Starting equipment still matches its primary type.

`EquipScene/NonRemoveETypes` removes those type IDs from Clear and the empty
replacement choice; eligible replacement remains possible. `NonOptimizeETypes`
keeps those slots unchanged during Optimize. `CommandAddClear` and
`CommandAddOptimize` control the command entries. `RemoveEquipText` and
`RemoveEquipIcon` label the empty replacement choice. For updated layouts and modern navigation, see the "Item, equipment and shop
presentation" and "Navigation and callable runtime contracts" sections below.
Core `QoL/ModernControls` selects the input mode; it does not enable a layout.

Read a fresh hash before each note edit, using an existing ID and the game's
actual type names:

```sh
node coreto/tools/coreto/cli.mjs --project "<jogo>" items-equips tags list --target classes:1 --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" items-equips tags set --target classes:1 --tag equip-slots --value '"<Equip Slots>\nWeapon\nAccessory\nAccessory\n</Equip Slots>"' --expected-hash "<fileHash>" --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" items-equips tags list --target armors:1 --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" items-equips tags set --target armors:1 --tag equip-copy-limit --value '"<Equip Copy Limit: 1>"' --expected-hash "<fileHash>" --json
```

Native script calls remain available on the selected `Game_Actor`:
`actor.forceChangeEquipSlots([1, 5, 5])` takes equipment type IDs, removes 0/-1
from the supplied array in place and retains that array;
`actor.forceResetEquipSlots()` restores class slots;
`actor.changeEquipById(5, armorId)` uses first-empty/last-full targeting.
Pass existing IDs of the matching native kind and a type present in the layout.
These calls do not create equipment; inventory ownership remains authoritative.
Restart the game after database or parameter edits, and reopen the Editor after
external writes. CLI validation never evaluates authored note code.

### Shop transactions and native batch shops

Use `items-equips commands insert --target common-event:<id> --before <terminator-index>
--command BatchShop --value '{"Step1Start":8,"Step1End":2,"Step2Start":0,"Step2End":0,"Step3Start":0,"Step3End":0,"PurchaseOnly":true,"Blacklist":["Rare"],"Whitelist":["Trade"]}'
--expected-hash "<fresh fileHash>" --json` after listing the existing event.
The reversed range includes item IDs 2 through 8; zero-only ranges add no weapons
or armor. Blank names and separator names are omitted. Blacklist wins over
whitelist. This command uses database prices; author a native Shop Processing
event when a particular event needs custom prices.

Commerce Note tags use complete native strings: `price` (`<Price: 10>`),
`sell-price` (`<Sell Price: 7>`), `sellability` (`<Can Sell>` or `<Cannot Sell>`),
`shop-visibility` (`<Show Shop All Switches: 1, 2>` or the Show/Hide Any/All
variants), `sell-switch`, and `shop-transaction-switch`
(`<Buy Turn On Switches: 1, 2>`, with Buy/Sell and On/Off variants).
Put each switch tag on its own line. The original greedy switch-list grammar
can capture later tags on the same line. A zero-price item needs `<Can Sell>`
to be sold. `<Cannot Sell>` takes precedence. The native unqualified/All
`Cannot Sell` switch form requires all listed switches ON; the Any form blocks
selling when any is ON.

For dynamic prices, author `shop-buy-price-js` or `shop-sell-price-js` blocks:
`<JS Buy Price>\nprice = item.price * 0.5;\n</JS Buy Price>`.
The runtime supplies `item`, mutable `price`, and `this` (the buy window or sell
scene). Buying starts from the native database/event price; selling starts from
database price times `/ShopScene/SellPriceRate`. A sale JS block overrides the
fixed sale tag. The note result then feeds `/ShopScene/BuyPriceJS` or
`/ShopScene/SellPriceJS`, whose body returns a number and receives the item and
price through `arguments[0]` and `arguments[1]`. Buy floors and clamps the final
result to zero; sale floors the note result before the global callback and does
not apply another rounding/clamp afterward. These callbacks also run for
previews: keep them free of transaction effects. CLI validates syntax without
running authored code.

Successful transactions apply native money/inventory changes, then note switches
(On before Off), tracking and configured transaction flags. Cancellation and
refresh preserve ownership and money. `/ShopScene/SwitchBuy` and `SwitchSell`
reset on shop entry. Version 1.61 gates the sale flag on a nonzero SwitchBuy too;
configure both if you need both flags. `getShopTrackingItemBuy/Sell(item)` and
`getShopTrackingGoldBuy/Sell()` read the party's lazy cumulative totals.

The native-layout item panel and default equipment comparison are available for
the acquire → inspect → equip → trade flow. `/ItemScene/ShowShopStatus`,
`ItemSceneAdjustItemList`, `ItemMenuStatusRect`, and the supported StatusWindow
fields control this panel when updated layout and DisabledVanilla are false.
The "Item, equipment and shop presentation" section below describes updated
layouts, pictures and status styles. External consumers require the versions
and provider order documented in their respective sections.

### Equipment parameters and inventory artifacts

Set an `equipment-parameter` tag such as `<MaxHP: +100>` or `<ATK: +1200>` on a
weapon/armor Note. The signed integer replaces that equipment's native base
parameter; final actor limits still apply. Use one line per parameter. Names
are MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI and LUK; this form does not set X/S or
custom parameters.

Use `equipment-parameters-js` for a complete `<JS Parameters>` block, for example
`<JS Parameters>\nATK = user.paramBase(2) * 0.1;\nMaxMP = 5;\n</JS Parameters>`.
Each case-sensitive variable starts at zero and adds a wearer-dependent bonus.
`this`, `user`, `target`, `a` and `b` are the actor; `item` is the database
weapon/armor and `paramId` is the requested base parameter. Prefer base values
instead of recursive full-stat formulas. Authoring validates syntax without
executing the body. Native parameter caching updates on actor refresh.

`/EquipScene/EquipAdjustHpMp` defaults to true. Change/force/discard equipment
uses the qualified native ordering and rounds previous HP/MP proportions against
new maxima when the current values remain positive. It does not revive dead
actors or replenish zero MP. Setting false preserves current amounts subject to
native clamps. Preview actors do not alter real inventory or current HP/MP.

Armor tagged `artifact` with `<Party Artifact>` or `<Troop Artifact>` cannot be
equipped: holding it applies its base parameters and traits to the corresponding
actors/enemies. `<Stackable Party Artifact>` and `<Stackable Troop Artifact>`
repeat both contributions per copy; unstacked applies once. Both side tags can
coexist. A stackable tag makes both declared sides stack for that armor. Removal
updates affected actor and current battle-enemy caches without accumulating on
refresh. Troop effects use static parameters/traits; wearer JS belongs to actors.
Battle Test's automatic item grant removes artifacts, so grant them explicitly
when a battle test needs them. Use normal New Game/event acquisition to qualify
player behavior. `partyArtifacts()`, `troopArtifacts()` and `artifacts()` expose
the party's currently held contributions without changing equipped slots.

### Curses and purification

Author `cursed` as `<Cursed>` on a weapon/armor Note. The equipped slot is disabled
for player removal, Clear and Optimize. Native event/script changes can bypass
this lock. For a transformation, add `purify-transform` with
`<Purify Transform: Clear Ring>` or an existing ID in the same database kind.
Names ignore surrounding whitespace/case; duplicate names select the highest ID.
Run `items-equips validate --json` after authoring: unresolved same-kind targets
report `INVALID_REFERENCE` without writes or executing parameter code. The
runtime diagnoses such invalid content as `IE_PURIFY_TARGET` before changing that
slot; it is not a valid transformation fallback.

Insert `PurifyActors` with `--value '{"Actors":[1,2]}'` or `PurifyParty` with
`--value '{}'` through `commands insert --before <index>` and a fresh event
`--expected-hash`. Actor IDs are serialized in the native string-array form.
Both commands do nothing during battle. Party targets include reserves; actor
lists run in authored order and duplicate entries deliberately invoke an actor
again. An eligible A → cursed B → C chain advances once per invocation. Refresh,
scene re-entry and another invocation after no cursed item remains do not grant
extra equipment.

A compatible transformed object replaces the original in its slot; normal actor
refresh can release it to inventory if other requirements fail. Without a
transformation, or with an incompatible equipment slot/type, removal returns the
original object. `/EquipScene/CursedTextPopup` uses the native interpolation
%1 actor, %2 icon escape, %3 equipment name; empty text disables it. Original
WeaponSwapSystem suppresses curses on weapons to permit swapping; armor curses
remain. That consumer composition is qualified separately from base Items.

### Item, equipment and shop presentation

`items-equips parameters get|set|reset` owns `/ItemScene`, `/EquipScene`,
`/ShopScene` and `/StatusWindow`. Updated layouts take precedence over Item's
vanilla suppression and custom status rectangle. `upper/left`, `upper/right`,
`lower/left` and `lower/right` place help and input; explicit UI positions from an
active Options provider take precedence. Turning off updated Item layout with
`DisabledVanilla: true` suppresses the added status panel.

Compare equipment calculates each actor's current replacement, including Core
custom parameters and wearer formulas, without trading real inventory. Classic
and Double show database parameters in one or two columns. They omit actor-only
custom values. `<Status Style: Classic>` overrides one weapon/armor; use
`<Custom Status Parameters: ATK, DEF, HIT>` to choose ordered standard, extra or
special parameters. `<Status Info>` supplies `key: value` overrides to the status drawing helpers;
a callback can also draw one of those rows without a corresponding native effect. `<Custom Status Info>` appends labels and values. Both accept native text
escapes. Compare custom rows belong in its draw callback.

Display callbacks are JavaScript bodies, stored as native JSON-encoded note
parameters. Shop display callbacks receive the live `Window_ShopStatus` with `this._item`;
that window does not provide `this._actor`. Equipment callbacks receive
`Window_EquipStatus` with `this._actor` and `this._tempActor`. They receive no arguments;
their return is ignored and errors propagate. Classic/Double/Compare reset the
temporary actor before the callback. Equipment portraits use an active MainMenu
provider and the actor's menu image; otherwise the face callback runs. Keep
arbitrary author code out of offline validation.

For a picture behind item/skill/equipment status text, put these complete native
tags in its Note (use an existing project asset):

```text
<Shop Picture Name: Actor1_2>
<Shop Picture Max Dimensions: 100, 80>
<Shop Picture Alignment: Right>
<Shop Picture Position: Bottom>
<Shop Picture Offset: +3, -2>
<Shop Picture Opacity: 50%>
<Custom Status Info>
Origin: Observatory
</Custom Status Info>
```

`img/pictures/Actor1_2.png` is case-sensitive; omit the extension in the tag.
Scaling preserves aspect ratio and never enlarges native dimensions. Dimensions
override separate Max Width/Height. Offsets require a sign; paired and separate
X/Y offsets add together. Add `<Shop Picture Layer: Foreground>` to draw over
text; Foreground wins if both layer tags are present. A raw integer opacity tag
takes precedence over a percentage tag when both are present. Background,
centered/middle placement, fitting the inner window and opacity
255 are defaults. Refresh clears previous content; a late picture only paints
while its item remains selected. Native actor portrait callbacks draw the current
actor when a pending load completes.

Discover exact tag syntax with `items-equips api describe shop-picture` or another
`status-*`/`shop-picture-*` key. For Notes, list the native target first, then use
its current hash with `tags set|remove --expected-hash`; `--dry-run` leaves it
unchanged. Images and Notes stay in the game, and no asset or authored JavaScript
is generated by these commands.
### Navigation and callable runtime contracts

Core Engine's `QoL.ModernControls` selects the input mode. Items keeps native
controls in a pure-vanilla Item scene. Modern Item enters the list immediately:
Left/Right changes categories with one column; PageUp/PageDown changes them with
multiple columns. Shift plus PageUp/PageDown scrolls the multi-column list.
The updated shop's sell list uses one column and Left/Right; its native layout
uses two columns and PageUp/PageDown. Pointer selection
changes categories without consuming an item. Empty categories and unavailable
items retain list focus. Cancel returns from modern lists directly to their
parent; standard mode first returns to category selection.

Modern Equip starts on slots. Up from the first slot selects Optimize/Clear;
Down returns to slots. PageUp/PageDown changes actor. Clicking commands or slots
moves focus. The item list initially selects the current equipment. Shift
removes eligible equipment when `/EquipScene/ShiftShortcutKey` is true; locked,
cursed and nonremovable types remain equipped. Removal returns one owned item.
`equipCmdDesc`, `optimizeCmdDesc`, `clearCmdDesc`, `buttonAssistRemove` and the
Item/Shop `buttonAssist*` values author help without executing JavaScript.

Use `items-equips api list`, then `items-equips api describe <id>` for receiver, arguments, return, context and
examples of actor slot/purification methods, party NEW labels and shop counters.
For example, after loading game objects:

```js
const actor = $gameParty.leader();
actor.forceChangeEquipSlots([1, 5, 5]); // native equipment-type IDs
actor.forceResetEquipSlots();
const bought = $gameParty.getShopTrackingItemBuy($dataItems[1]);
```

The slot method removes 0/-1 in place and retains the caller's array. Repeating
slot configuration does not duplicate equipment. Purification deliberately
advances one authored transformation per invocation, so a repeated call can
advance a chain. The five native plugin commands are ActorChangeEquipSlots,
ActorResetEquipSlots, PurifyActors, PurifyParty and BatchShop. Both Coreto and
legacy command receivers execute the same contract; each event invocation has
one dispatch. Prefer purification commands when the battle guard is required.
Opening another shop intentionally opens another scene; command repetition is
not a deduplication request.

To disable Items, disable every active consumer that requires it as well. Native
Item/Equip/Shop entry remains available with those providers absent. Missing
Core Engine, reversed provider order and duplicate Items providers are invalid
compositions and produce diagnostics. A disabled entry can still supply native
configuration when the active Coreto provider uses `inherit`.


### Original ItemCraftingSys 1.26

The unchanged, separately licensed `VisuMZ_2_ItemCraftingSys` 1.26 is qualified
with this Items provider and either original Core Engine 1.90 or Coreto Core
Engine 0.1.0. Load Core, then `Coreto_1_ItemsEquipsCore`, then ItemCraftingSys.
Keep original Items disabled. The installed package does not include the
original crafting consumer. `items-equips validate` reports a missing provider,
wrong order, unqualified consumer or wrong supported consumer version.

Use native database Notes for recipes. For example, a recipe in Items can hold
`<Proxy: Restorative Tonic>` and this unchanged consumer grammar:

```text
<Custom Crafting Only>
<Crafting Ingredients>
Item 10: 2
Item 11: 1
Gold: 5
</Crafting Ingredients>
```

Replace 10 and 11 with existing ingredient IDs in this game. Put the actual
product in a separate Items record named Restorative Tonic. The proxy copies
its name, icon and description at boot, retaining its own recipe Note and
price. Proxy IDs/names resolve within the same database kind. Do not grant the
proxy directly; crafting grants its resolved product. `numItems(proxy)` reads
the product count, while the proxy itself has no physical inventory entry.

Discover `IE-NT-proxy` and `DataManager.getProxyItem` through `items-equips api
describe`. Author the proxy using `tags set --target items:<recipe-ID> --tag
proxy --value '"<Proxy: Restorative Tonic>"' --expected-hash "<fileHash>"`.
The consumer's native Plugin Command **Custom Item Crafting Scene** selects
recipe IDs (native number arrays such as `["12"]`); its own Plugin Manager
parameters control masking, animation and menu access. Those consumer commands
remain in the original namespace, separate from the five Items commands.

The active Coreto provider exposes the native `VisuMZ.ItemsEquipsCore` version,
live Settings and SortByIDandPriority facilities consumed by crafting. This
interface does not load the original Items plugin. Window `proxyItem()` keeps
raw recipe identity; ordinary `item()` resolves the product. Reopen the Editor
after external authoring and restart the game for database changes.

### Original WeaponSwapSystem 1.14

WeaponSwapSystem 1.14 remains a separately licensed original consumer. The
qualified orders are original Core 1.90 → original Battle 1.90 → Coreto Items →
WeaponSwapSystem, or Coreto Core 0.1.0 → Coreto Battle 0.1.0 → Coreto Items →
WeaponSwapSystem. Original Items stays disabled. Enable exactly one Battle
provider; `items-equips validate` checks its presence, supported version and
position before Items and the consumer. The installer does not include originals.

Author custom physical slots with the existing Items class Note or
ActorChangeEquipSlots command. Without the consumer, multiple weapon slots
remain valid. With it active, the unchanged consumer limits physical weapon
slots to one, then displays one slot per eligible weapon type in Equip. Equip
two different types, enter battle and switch with left/right on Attack or the
native Swap command (`UI.ShowSwapCommand`). Select the actor explicitly when
returning to Equip. In standard navigation, cancel to the command window before
PageUp/PageDown; then choose Equip to inspect that actor's slots.

Native skill `Switch to Weapon Type` and `Require Any Weapon` notes belong to
the consumer. Weapon type IDs come from Database > Types, not weapon IDs. After
removing a weapon, inspect the selected slot and remaining ownership; with only
one available weapon the shortcut is inactive. Empty slots do not carry another
actor's equipment. The consumer owns its per-type swap state and selection rules.

Reached support APIs are available through `core api describe
Game_BattlerBase.checkCacheKey` and `battle api describe
DataManager.battleCommandName`. Core invalidates parameter caches when the native
consumer replaces `_cache`; Battle preserves Command Text, List Name and database
name precedence, including empty text. These are plugin extension contracts;
ordinary game authors use native equipment, skill Notes and player commands.

### Original ButtonCmnEvts 1.11

Load the separately licensed `VisuMZ_4_ButtonCmnEvts` 1.11 after Core and the active
Items provider. Items is optional for this consumer: its quantity renderer becomes
available only when Items executes. A disabled registry entry or a copied file
alone does not enable it. The installer does not distribute this original plugin.

In Plugin Manager, Items → Item Scene → Quantity controls the format (`%1` is the
current count) and font size used by assigned buttons. The equivalent CLI fields
are `/ItemScene/ItemQuantityFmt` and `/ItemScene/ItemQuantityFontSize`:

```sh
node coreto/tools/coreto/cli.mjs items-equips parameters set --path /ItemScene/ItemQuantityFmt --value '"Stock %1"' --project "<jogo>"
node coreto/tools/coreto/cli.mjs items-equips parameters set --path /ItemScene/ItemQuantityFontSize --value 21 --project "<jogo>"
```

Create a Common Event, then give an item these native notes, replacing the event
ID with an existing one and choosing a permitted key:

```text
<Assign Button Common Event: 4>
<Assign Button Slot: 2>
<Assign Button Consume Quantity>
```

Select the item in the Items scene and confirm its assignment. The original
consumer invokes the Common Event from keyboard or visible map button and consumes
one unit per successful activation. At zero it cannot pay the cost. Use
`<Assign Button Show Quantity>` instead to display without consumption; this mode
can still activate at zero. Reassigning another item updates the quantity source
and consumption target. The Common Event should not independently consume the
same item unless that additional cost is intended.

With enabled Options rebinding, alphabet/symbol keys cannot be assigned to these
Common Events, while number keys remain available to buttons and are forbidden in
Options rebinding. Coreto Core/Options work without a Message dependency for this
input contract. Respect native bound-key restrictions and inspect current project
bindings before selecting a key. This qualified interaction does not establish
compatibility with every Options feature or input plugin.

### Original VisualItemInv 1.08

Load the separately licensed `VisuMZ_4_VisualItemInv` 1.08 after Core and, when
active, Items. Its enlarged icon inventory also works without Items. A disabled
Items entry does not enable quantity styling, new-item labels or the Items remove
icon integration. The installer does not distribute this original consumer.

VisualItemInv's native Plugin Manager settings select affected window constructors,
icon size/smoothing and tooltips. Database item/weapon/armor icons remain the image
source; `<Visual Item Picture: filename>` selects a picture owned by the game.
Its help documents background-color notes and image behavior. Keep required images
available; an icon/quantity comparison is not evidence for every picture-loading
case.

With Items active, quantity uses `/ItemScene/ItemQuantityFmt` and
`/ItemScene/ItemQuantityFontSize`. New labels use `/New` settings, with OffsetX and
OffsetY measured from the enlarged cell's top-left. Inspecting an item clears its
new state; re-entering must not restore the marker. The Equip remove entry shows
only `/EquipScene/RemoveEquipIcon`, enlarged by VisualItemInv; RemoveEquipText is
not drawn in that consumer layout. These settings have the same Plugin Manager
fields and `items-equips parameters get/set` routes as the standalone provider.

Use the actual item category when inspecting non-usable materials. The default
first Items category is field-usable items; `RegularItems` includes ordinary items
regardless of occasion. Re-enter after an authored icon/count change to observe
current inventory. Empty lists have no selected item tooltip or stale marker.

### Items and qualified Core supports

Use one Core provider before Items. Either Items provider reads the effective Core extended parameter list and custom parameter names/types for item comparison, equipment preview and status layout. With Coreto Core, these contracts are available whenever Items is active; Message and Options are not prerequisites. Integer custom parameters retain numeric deltas, while percentage parameters use percentage formatting. Configure custom parameters and the extended displayed list in Core, then configure Items status style and callbacks in Items.

WeaponSwapSystem additionally needs one Battle provider before Items. Coreto Battle requires Coreto Core; original Battle is qualified with original or Coreto Core for the reached swap contracts. The Items validator diagnoses a missing Battle provider, a late provider and Coreto Battle paired with original Core. This qualification covers the documented Items/consumer intersections, not every support capability. Message-specific presentation is not exercised by these fixtures. Forward save continuation has its own persistence qualification.

### Combining crafting, visual inventory, swapping and assigned items

Place Core first, then the required Battle provider, optional Options, one Items provider, ItemCraftingSys, WeaponSwapSystem, ButtonCmnEvts and VisualItemInv. Keep each original consumer at its qualified version. A crafting recipe may resolve through a same-kind proxy to the actual owned item or weapon; author the assignment notes on the resulting consumable and equipment restrictions on the resulting weapon. Inspect and assign the acquired item through Items, equip the weapon on the intended actor, and use the native battle swap controls. Shops and buttons use the same current inventory; a displayed quantity is distinct from a consumption requirement.

Keep an existing button assignment when returning to a scene or crafting another unit of the same item. In unchanged ButtonCmnEvts 1.11, assigning the same item/Common Event to the same key again clears its cost/display data. This native consumer behavior is characterized; it is not a repaired Coreto capability. Assigning a different item and retaining the current assignment across scene returns are separately qualified. A zero-stock consuming button must remain unavailable and produce no Common Event effect.

### Forward save continuation

Keep the same game databases and qualified provider/consumer versions when replacing the Items provider. Native MZ saves retain actor-specific forced slots and equipment, inventory and gold, new-item markers, shop purchase/sale tracking, crafting counts/menu/event settings, stored swap weapons and their active type, and assigned Common Event keys/icons/display costs. Continue can reconstruct the current windows from that state; window/image objects are not a save interface.

The qualified direction is original Items to Coreto Items, followed by saving under Coreto and restarting/Continue. Earlier original slots remain unchanged. Native NW saves are filesystem files in the game's resolved save directory; browser IndexedDB is a different storage boundary. Do not interchange the two. Make a copy of existing saves before changing a real game's providers and preserve database identities.

ButtonCmnEvts and VisualItemInv may be disabled in the qualified optional profile without discarding their stored assignment data. That profile does not activate buttons or enlarged visual inventory. WeaponSwapSystem and ItemCraftingSys remain present for their stored contracts; disabling them is not covered by the optional profile. Reverse migration and arbitrary historical campaign saves are not qualified by this continuation check.

### Items native authoring and diagnostics

Use the resolved CLI entrypoint shown by this project's instructions. `items-equips --help` lists operations; `api list` and `api describe` expose native paths, defaults, supported targets and callback context. Parameter edits materialize the effective inherited configuration before changing the selected leaf. `reset` restores that leaf's native default. The configuration-source selector alone does not copy values.

Read the target with `commands list` or `tags list` immediately before a mutation and supply its `fileHash` as `--expected-hash`. Commands address `map:M/event:E/page:P`, `common-event:C` or `troop:T/page:P`; pages are one-based and command indices are zero-based. Tags address `items:ID`, `weapons:ID`, `armors:ID`, `skills:ID` or `classes:ID` only where the selected descriptor permits that kind. A stale hash requires a fresh read and a new decision about the selected index or occurrence. Writes accept `--dry-run`; reads and validation do not change authored files.

A maximum uses a JSON integer such as `3`; a price uses the complete native string such as `"<Price: 10>"`. An actor-specific slot command takes the intended actor IDs and native equipment-type names. Native MZ events, database Notes and Plugin Manager settings remain the authority. Close/reopen the Editor after external writes so an older open document cannot overwrite them.

Run `items-equips validate` after edits. It reports invalid references, absent case-sensitive extensionless picture names under `img/pictures`, and missing or misordered providers/consumers. Supported encrypted pictures follow the game's native encryption setting. Offline editing/validation checks JavaScript syntax without running callbacks; their effects require playing the affected scene. Exit codes are 0 success, 2 invalid input, 3 missing target, 4 conflict, 5 I/O failure and 6 unavailable capability. Validation failures occur before the requested write. After an I/O error, interruption or WRITE_UNCONFIRMED receipt, reread the target before retrying: the replacement may already have reached disk even when confirmation failed.

### Portable Items delivery

The package includes the Items bundle, complete implementation sources, operational catalog and `items-equips` CLI through the shared installer. A general reinstall preserves an existing game's registry and authored database/event files. The namespace's `items-equips install` operation separately selects/materializes the Items provider pair; it does not enable prerequisites or copy licensed original consumers. Keep one active Core provider before Items and install any required original consumers separately at their qualified versions.

After moving the destination, use the resolved relative entrypoint in its root instructions and select the relocated game. Discovery, native authoring and validation operate from `coreto/` without the former origin. Sources remain in code freeze: edit native configuration, events and database Notes, or add game-owned extension plugins. Do not rebuild or alter the delivered Coreto implementation in the game.

## Custo de MP de uma habilidade

Após entregar o bundle `Coreto_1_SkillsStatesCore`, use `skills-states install` para selecionar o provedor. Mantenha Core Engine antes dele e somente um SkillsStates ativo. Consulte `skills-states api list` e `api describe ID` para os controles disponíveis e seus limites.

Use `skills-states tags list --target skills:ID --project "<jogo>" --json` e copie `result.fileHash`. Em seguida execute `skills-states tags set --target skills:ID --tag mp-cost --value 4 --expected-hash HASH --project "<jogo>" --json`, usando o mesmo prefixo `node coreto/tools/coreto/cli.mjs` dos exemplos acima. Substitua ID e HASH pelos valores reais. A escrita altera somente a nota da habilidade; com taxa de custo normal, usá-la com 10 MP deixa 6. Abrir a lista não consome MP. Reabra o projeto no Editor após a escrita externa.

### Tipos e disponibilidade de habilidades

Em Plugin Manager → Skill Settings, `Hidden Skill Types` oculta os tipos globalmente; `Hidden During Battle` os oculta durante a batalha. `Sort: Alphabetical` seleciona os tipos cuja lista do menu será ordenada por nome. Na CLI, use os caminhos `/Skills/HiddenSkillTypes`, `/Skills/BattleHiddenSkillTypes` e `/Skills/SortSkillTypesAbc` em `parameters get|set|reset`. Os valores são arrays de IDs, por exemplo `--value '[2,3]'`; `[]` restaura uma seleção vazia. O seletor compartilhado `inherit/own` mantém sua semântica de materialização na primeira edição.

Nas Notas de uma habilidade, `<Skill Types: 1, 2>` acrescenta tipos sem duplicar a habilidade. `<List Name: Guarda \V[1]>` muda o nome mostrado na lista; `<ID Sort Priority: 90>` eleva a prioridade no menu (padrão 50). Descubra as tags `skill-types`, `list-name` e `sort-priority`. `sort-priority` recebe um inteiro JSON; as demais recebem a string JSON completa, por exemplo `--value '"<Skill Types: 1, 2>"'`. Sempre leia `tags list` para obter um hash atual antes de escrever.

As famílias Show/Hide combinam condições de switches, habilidades aprendidas e habilidades possuídas. Aprendida significa aquisição permanente; possuída inclui habilidades concedidas por traits. Enable/Disable controla a possibilidade de usar uma habilidade visível. As variantes All e Any verificam, respectivamente, todas ou alguma das condições listadas. `api describe` apresenta a grafia nativa e o exemplo de cada variante. Reabra a lista depois de alterar as condições para observar a seleção atual.

`JS Skill Visible` recebe `user`, `skill` e a variável mutável `visible`; `JS Skill Enable` recebe `user`, `skill` e `enabled`. Atribua um booleano à variável correspondente. As outras condições também precisam permitir a operação. O controle global `/Skills/SkillConditionJS` recebe o usuário como `this` e a habilidade em `arguments[0]`, retornando um booleano. A autoria valida a sintaxe sem executar o código; confirme o resultado no jogo.


Em `skills-states parameters get --path /Costs`, cada recurso contém callbacks de cálculo, possibilidade de pagamento, pagamento, texto e gauge. Para adicionar um recurso, copie um objeto, mude `Name` e seus callbacks, e escreva a lista completa com `parameters set --path /Costs --value JSON`. Preserve os cabeçalhos vazios. A CLI verifica a sintaxe sem executar o código. `CalcJS` recebe a habilidade em `arguments[0]` e o battler em `this`; pagamento e elegibilidade recebem também o custo; exibição e texto recebem habilidade, custo e configuração. Os custos são recalculados e pagos na ordem da lista. `paySkillCost(skill)` paga sem verificar elegibilidade; `canPaySkillCost(skill)` somente consulta.

Os defaults cobram HP sem permitir saldo zero; Potion usa o item 7 e isenta inimigos. Custos de ouro e inventário podem atingir o grupo quando pagos por inimigos. Itens não consumíveis e itens-chave são exigidos sem consumo. Tags de limite, porcentagem, ajuste por traits, inventário e JavaScript estão em `api list`; `api describe` identifica os objetos permitidos. As tags dependem dos callbacks configurados: um nome de recurso novo precisa de uma entrada em `/Costs` que interprete sua nota.

Na classe, `<Replace MP Gauge: Nome>` usa o recurso configurado; `none` oculta o gauge. `GaugeCurrentJS` e `GaugeMaxJS` recebem o battler; `GaugeDrawJS` recebe o sprite com `_battler`, `_costSettings`, `currentDisplayedValue()` e `drawFullGauge(color1, color2, x, y, width, height)`.

Nos defaults nativos, substituições de Weapon e Armor debitam origem e destino; a substituição de Item debita somente o destino. Os callbacks entregues preservam esse comportamento qualificado.


Em `/States`, `ReapplyRules` escolhe Ignore, Reset, Greater ou Add; `MaxTurns` limita o contador. As notas `<Reapply Rules: Add>` e `<Max Turns: 4>` substituem esses valores por estado. Com duração nativa fixa de dois turnos, reaplicar esse exemplo produz 2, 4, 4. `ActionEndUpdate` habilita contagem por ação para estados Action End e ajusta Cannot Move para Turn End. `TurnEndOnMap` define os passos por atualização de turno no mapa. Estados sem remoção automática também reduzem seu contador ao fim do turno, mas não são removidos por isso.

Use `<No Death Clear>`, `<No Recover All Clear>` e `<Group Defeat>` nas notas de estados para retenção e derrota do grupo. `<State 4 Turns: +2>` e `<Set State 4 Turns: 0>` em habilidades/itens ajustam estados já aplicados; zero remove, e um estado ausente continua ausente. As tags `bypass-state-damage`, `bypass-state-damage-attacker` e `bypass-state-damage-target` protegem os estados indicados por ID ou nome durante o dano.

Para escrever pelo CLI, consulte `skills-states tags list --target states:ID` e use o hash retornado em `tags set --target states:ID --tag reapply-rules --value '"<Reapply Rules: Add>"' --expected-hash HASH`. Acrescente `--project "<jogo>"` e o prefixo de execução da CLI. `parameters set --path /States/TurnEndOnMap --value 4` altera a frequência de passos. Leia novamente os valores e reabra o projeto no Editor antes de conferir suas telas nativas.

Os callbacks `<JS On Add State>`, `<JS On Erase State>` e `<JS On Expire State>` recebem `this`/`target` como afetado, `state`, `origin`/`a` como origem e `user` como usuário atual (`b` é o afetado). O callback da nota executa antes do global em `/States`. Reaplicar executa Add; remover explicitamente executa Erase; expirar executa Erase seguido de Expire. Erase ainda vê os dados e o texto anteriores, que são limpos antes de Expire. Remoção por passos executa Erase. Código inválido é rejeitado na autoria; exceções no corpo autorado são diagnosticadas em playtest, e o processamento continua conforme o original. Erros internos fora desse corpo propagam. A CLI não executa os corpos.

`setStateData(id, chave, valor)` preserva zero e false; `setStateDisplay(id, "WARD")` atualiza o texto no ícone. Consulte os métodos em `api describe Game_BattlerBase.getStateOrigin` e `api list`: a origem sobrevive à remoção e referências a inimigos pertencem à instância da tropa. `getStateRetainType()` retorna `death`, `recover all` ou texto vazio; limpezas aninhadas podem encerrar esse contexto antes do callback global externo. Fontes, cores e layouts completos ainda pertencem à entrega posterior de apresentação.


Para dano periódico, escreva no estado `<JS HP Slip Damage>`, um corpo como `damage = 10;`, e `</JS HP Slip Damage>`. Use MP ou TP para os outros recursos; para cura, troque Damage por Heal e atribua `heal`. Pela CLI, os identificadores são `js-hp-slip-damage`, `js-mp-slip-heal` e seus equivalentes; passe o bloco completo em `--value` com quebras de linha JSON e o hash de `tags list`. Escrita, descoberta e validação não executam o corpo.

O cálculo recebe o afetado em `this`/`target`/`b`, a origem do estado em `user`/`origin`/`a` e o registro em `state`. O valor fica em cache na aplicação, inclusive aplicação direta; reaplicar recalcula. `<JS Slip Refresh>` recalcula a cada fase de regeneração. Chamar `refresh()` no battler não recalcula por si só. São cálculos: use os callbacks de ciclo de vida para efeitos que alteram estados ou buffs.

Os valores negativos de Damage/Heal são limitados a zero. Os efeitos se somam à regeneração nativa antes do arredondamento e respeitam a opção nativa de morte por dano periódico. Dois estados de 10 e 20 HP produzem perda de 30 e um popup agregado. Com CoreEngine e SkillsStates isolados, MP tem popup agregado, TP altera o recurso silenciosamente e delta zero não cria popup. A composição com outros consumidores tem verificações próprias.

Exceções em callbacks de estado e cálculos periódicos mantêm a continuação do original; em playtest, o diagnóstico inclui o ID do estado e a tag ou caminho do parâmetro. O cálculo preserva o valor atribuído antes da exceção, ou zero se nada foi atribuído. Erros internos fora do corpo autorado continuam propagando.

Categorias são escritas na Note dos estados: `<Positive State>`, `<Negative State>`, `<Category: Red>` ou um bloco `<Categories>` com um nome por linha. Um estado pode pertencer a mais de uma categoria; estados sem classificação usam a cor neutra de `/States/ColorNeutral`. `<Resist State Categories: Red, Positive>` em um objeto de traits impede a aplicação dos membros dessas categorias. Em habilidades/itens, `<State Red Category Remove: All>` remove todos os membros aplicados; um número limita a remoção à ordem dos estados. No próprio estado, `<Remove Other Red States>` remove os outros membros quando ele entra. Categorias ausentes não removem estados alheios.

`/Buffs` configura limites independentes de buffs/debuffs, duração máxima e reaplicação: `ignore` mantém os turnos existentes, `reset` usa os novos, `greater` mantém o maior e `add` soma, respeitando `MaxTurns`. O objeto nativo usa 99 turnos; o default isolado do campo é 9999. `/Buffs/MultiplierJS` recebe `arguments[0]` como ID do parâmetro (0–7) e `arguments[1]` como nível, com `this` ligado ao battler; retorne o multiplicador numérico. Por exemplo, `return 1 + arguments[1] * 0.2;` dá 160% no nível +3. O ícone permanece no desenho de dois níveis quando a pilha ultrapassa dois; o valor exibido acompanha o multiplicador real.

Em Notes de habilidades/itens, `<ATK Buff Turns: +2>` e `<DEF Debuff Turns: +3>` podem coexistir; `<Set ATK Buff Turns: 8>` substitui a duração do buff existente, limitada por `MaxTurns`. Use `skills-states tags list --target skills:ID --project JOGO` para obter o hash, depois `tags set --target skills:ID --tag buff-turns --value '"<ATK Buff Turns: +2>"' --expected-hash HASH --project JOGO`. Substitua ID, JOGO e HASH pelo alvo existente e sua leitura. A edição preserva tags de outros parâmetros. Duração zero mantém a pilha até a remoção normal; sem buff/debuff correspondente, a tag não cria efeito.

Os seis callbacks `/Buffs/onAddBuffJS`, `onAddDebuffJS`, `onEraseBuffJS`, `onEraseDebuffJS`, `onExpireBuffJS` e `onExpireDebuffJS` são corpos de função; `this` é o battler e `arguments[0]` é o parâmetro. Os corpos padrão declaram `user`, `target`, `a`, `b`, `paramId` e `modifier`; conserve essas declarações ao usar os nomes. O retorno é ignorado. Erase observa nível e turnos zerados; expiração chama Erase antes de Expire. Morte limpa os buffs sem esses callbacks; Recover All preserva os buffs existentes. Trocar de sinal passa por zero sem Erase, e reaplicar no limite ainda chama Add. A CLI compila os corpos sem executá-los. `/Buffs/ShowTurns`, `ShowData`, cores e offsets controlam os indicadores descritos abaixo.

Passivos podem vir de `/PassiveStates/Global`, `/PassiveStates/Actor`, `/PassiveStates/Enemy` e de Notes de atores, classes atuais, habilidades aprendidas, armas, armaduras e inimigos. Use `<Passive States: 5, 6>` ou nomes existentes. Habilidades presentes nas ações do inimigo também contribuem; o teste da condição de uso dessa ação não determina o passivo. Acesso a uma habilidade por trait não equivale a aprendê-la. A Note de uma classe secundária não concede seu passivo apenas por ocupar outro slot; a condição Multiclass consulta esses slots.

`<Passive Stackable>` na Note do estado permite acumular fontes repetidas. `battler.passiveStates()` conserva as entradas duplicadas; `battler.states()` deduplica as não empilháveis ao compor os traits. `battler.isStateAffected(ID)` continua consultando apenas estados aplicados diretamente. Remover um passivo exige retirar sua fonte ou desativar sua condição; `removeState(ID)` não elimina a fonte passiva nem dispara seus callbacks de aplicação/remoção.

Na Note do estado, `<Passive Condition Class: 1>` verifica a classe atual do ator; `<Passive Condition Classes: Nome A, Nome B>` aceita uma das classes. `<Passive Condition Multiclass: 1>` consulta os slots do ClassChangeSystem 1.20, quando ativo depois de SkillsStates; sem ele, consulta a classe atual. Essas restrições de classe são do ator, não do inimigo. `<Passive Condition Switch ON: 20>` e OFF têm variantes All/Any; a condição JavaScript adicional só participa quando as demais condições passam.

Para uma condição por variável, escreva `<JS Passive Condition>`, `condition = $gameVariables.value(20) >= 2;` e `</JS Passive Condition>`. O corpo recebe `user`, `target`, `a` e `b` como o battler, `state` como o estado e `condition` inicialmente verdadeiro. `/PassiveStates/PassiveConditionJS` é o corpo global: `this` é o battler, `arguments[0]` é o estado e o retorno é booleano. A CLI valida a sintaxe sem executar o código. Exemplo de autoria: leia `skills-states tags list --target actors:ID --project JOGO` e use `tags set --target actors:ID --tag passive-states --value '"<Passive State: 5>"' --expected-hash HASH --project JOGO`, substituindo ID, JOGO e HASH pelos valores da leitura e 5 por um estado existente.

Condições que dependem de outros passivos ou de parâmetros alterados por eles encontram as mesmas proteções contra recursão do original; não use essa dependência para ordenar passivos. Avaliações JavaScript repetidas no mesmo quadro têm limite por battler e reutilizam o último resultado conhecido. Consultas de conjuntos de traits evitam atualizações recursivas. As condições normais são reavaliadas sem trocar de cena, e aprender/esquecer habilidades ou trocar equipamento/classe invalida suas fontes.

`/PassiveStates/RefreshCacheSwitch` e `RefreshCacheVar` controlam a atualização automática dos participantes enquanto **Scene_Battle** está ativa. O campo ausente no objeto nativo resulta em `true`; o default do campo isolado no Editor é `false`. A CLI preserva `false` explícito e `parameters reset` restaura o fallback de runtime `true`, conforme `defaultReason`. Desativar essa atualização não congela os passivos: consultá-los ou chamar `refresh()` ainda pode atualizar as condições e os parâmetros derivados.


Em habilidades aprendidas, `<Toggle>` liga/desliga a contribuição passiva sem gastar a ação. `<Initial Toggle: On>` ou `Off` escolhe a inicialização; `/Toggles/DefaultToggle` fornece o valor ausente. O valor já inicializado é conservado ao esquecer e reaprender a habilidade. `<Toggle Exclusion Group: Postura>` permite somente uma postura ligada no grupo; grupos separados por vírgula e diferenças de caixa são reconhecidos. A inicialização também considera outras habilidades acessíveis do mesmo grupo.

O menu e a batalha cobram os custos somente ao ligar. Com custo de 4 MP e 10 disponíveis, ligar deixa 6 e desligar mantém 6. Desligar continua disponível sem recursos; ligar exige as condições e recursos normais. Inimigos mantêm a contribuição passiva dos toggles de suas ações, mas não os usam como ações de alternância. Atores em autobatalha ou confusos não alternam durante a batalha. `actor.setSkillToggle(skill, true)` é uma alteração por script sem pagamento; `actor.isSkillToggled(skill)` consulta a escolha e pode inicializá-la.

`/Toggles/ToggleOn`, `ToggleOff`, `ToggleOffLocation` (`front`/`back`), `ToggleOnTextColor` e `ToggleType` controlam os rótulos e a cor. O texto ON substitui os custos exibidos; OFF acompanha o custo na posição configurada. A cor aceita índice da Window ou `#rrggbb`. Na batalha, `<Toggle On Animation: 2>` toca ao **ligar**, usando a animação da habilidade quando ausente; `<Toggle Off Animation: 1>` toca ao desligar, usando `/Toggles/ToggleOffAnimationID` quando ausente. A frase “turned off” no help original da tag On contradiz o comportamento executado: o caminho qualificado usa `requestFauxAnimation` do Core Engine. O menu não solicita essa animação de batalha.

Para autorar, leia `skills-states tags list --target skills:ID --project JOGO` e passe o hash retornado a `tags set --target skills:ID --tag toggle --value '"<Toggle>"' --expected-hash HASH --project JOGO`. As chaves `initial-toggle`, `toggle-exclusion`, `toggle-on-animation` e `toggle-off-animation` aceitam a respectiva tag completa como string JSON. Exemplo de configuração: `skills-states parameters set --path /Toggles/ToggleOffLocation --value '"front"' --project JOGO`. Essas edições são offline e não executam a habilidade.


Auras e miasmas usam Notes de atores, classes atuais, habilidades aprendidas, armas, armaduras e inimigos: `<Aura States: 5, 6>` afeta aliados; `<Miasma State: 7>` afeta adversários somente em batalha. Nomes de estados existentes também são aceitos. Os emissores do grupo são os membros de batalha: reservas não emitem, mas podem receber auras. Habilidades concedidas somente por traits não emitem. Fontes repetidas permanecem na lista de passivos; seus traits só se acumulam com `<Passive Stackable>` no estado.

`<Not User Aura>` ou `<Aura Not For User>` exclui o próprio emissor. As condições podem estar no objeto que emite ou no estado emitido, e **ambos os níveis precisam permitir a emissão**. `<Allow Dead Aura>`/`<Allow Dead Miasma>` permitem um emissor morto naquele nível; `<Dead Aura Only>`/`<Dead Miasma Only>` exigem morte. Quando Allow Dead e Dead Only coexistem, o runtime original ainda exclui emissores vivos, apesar do texto de prioridade no help. Destinatários mortos ou ocultos não recebem auras/miasmas; emissores ocultos não contribuem.

O provedor atualiza os destinatários após mudanças nativas de equipamento, classe, habilidades, vida, participação no grupo e entrada/saída da batalha. A qualificação encontrou caches antigos no original, inclusive miasmas após voltar ao mapa. A entrega segue o critério aprovado de remover contribuições retiradas: os testes conservam a falha original e comparam o resultado automático do candidato ao cálculo original após atualização explícita. Não é necessário inserir chamadas de refresh nos eventos para compensar esse defeito.

A autoria segue o mesmo fluxo de hash: `skills-states tags list --target actors:ID --project JOGO`, depois `tags set --target actors:ID --tag aura-states --value '"<Aura State: 5>"' --expected-hash HASH --project JOGO`. Use `miasma-states`, `aura-not-user`, `allow-dead-aura`, `dead-only-aura`, `allow-dead-miasma` ou `dead-only-miasma` com a tag completa correspondente. As condições também aceitam `states:ID`; a emissão pertence ao objeto fonte, não à Note de um estado aplicado.


Os seis comandos de evento são `SkillActorPaySkillCost`, `SkillEnemyPaySkillCost`, `StateTurnsActorChangeBy`, `StateTurnsActorChangeTo`, `StateTurnsEnemyChangeBy` e `StateTurnsEnemyChangeTo`. Funcionam com os receptores `Coreto_1_SkillsStatesCore` e `VisuMZ_1_SkillsStatesCore`. Pagamento desconta os custos sem executar a ação ou testar elegibilidade. `ActorIDs` contém IDs de atores; `EnemyIndex` contém posições **a partir de zero** na tropa. O default nativo `[1]` seleciona o segundo inimigo. O original declara o tipo inválido `actr[]`; o bundle publica `number[]`, preservando a chave `EnemyIndex:arraynum`.

Os defaults de autoria são listas `[1]`, `SkillID: 99`, `StateID: 5`, `Turns: "+1"` para By ou `"10"` para To e `AutoAddState: "true"`. Esses defaults não são os IDs alocados nas fixtures. `Turns` e `AutoAddState` recebem strings JavaScript: a conclusão do script é avaliada uma vez por comando com `this=VisuMZ`, antes de percorrer os alvos. Variáveis globais MZ estão disponíveis; a CLI valida sintaxe sem executar o código. By soma à duração existente; To substitui. Auto-Add aplica o estado ausente e define diretamente a duração solicitada. Zero remove o estado; o máximo configurado limita os turnos. Estados aplicados sem expiração também podem armazenar turnos, como no original. IDs ausentes não afetam outros alvos. Comandos de turnos de inimigos só executam em batalha; pagamento pode alcançar membros da última tropa fora dela.

Leia `skills-states commands list --target common-event:ID --project JOGO` e use `fileHash` em `--expected-hash`. Exemplo: `skills-states commands insert --target common-event:ID --before 0 --command StateTurnsActorChangeBy --value '{"ActorIDs":[1],"StateID":5,"Turns":"2","AutoAddState":"false"}' --expected-hash HASH --project JOGO`. Substitua os IDs por registros existentes. Também são aceitos `map:ID/event:ID/page:1` e `troop:ID/page:1`. `update --index N` recebe um objeto parcial e `remove --index N` remove o grupo inteiro; ambos exigem `--command` e o hash atual. `--dry-run` não grava. A edição mantém o grupo nativo 357/657, a indentação, o receptor legado em atualizações e os eventos vizinhos.


A cena de habilidades usa `/Skills/EnableLayout` e os quatro valores de `/Skills/LayoutStyle`: `upper/left`, `upper/right`, `lower/left`, `lower/right`. O primeiro termo posiciona a ajuda; o segundo, a entrada. `/Skills/CmdWidth` controla a largura do seletor; quando a chave está ausente no registro nativo, segue `Scene_MenuBase.mainCommandWidth()`. `/Skills/ListWindowCols` controla as colunas fora de batalha. `/Skills/CmdStyle` aceita `text`, `icon`, `iconText` ou `auto`: auto usa ícone e texto quando cabem, ou ícone com o nome da seleção quando falta espaço. `CmdTextAlign`, `IconStypeNorm` e `IconStypeMagic` definem alinhamento e ícones; um `\I[n]` já no nome do tipo tem precedência.

Com ItemsEquips original ativo, o layout atualizado cria sua janela de informações inclusive quando `ShowShopStatus` está desligado, conforme o original. No layout nativo (`EnableLayout=false`), `ShowShopStatus` decide a presença, `SkillSceneAdjustSkillList` decide se a lista cede largura e `SkillMenuStatusRect` é um corpo JavaScript chamado com `this=Scene_Skill`, retornando `Rectangle`. `SkillSceneStatusBgType` escolhe janela (0), escuro (1) ou transparente (2). Sem ItemsEquips, essa janela não é criada. A informação acompanha ator, tipo e seleção; `<List Name: Guarda \V[1]>` altera o nome exibido, sem reescrever o nome do banco de dados.

Em `/States` e `/Buffs`, `ShowTurns`, `ShowData`, `TurnFontSize`, `DataFontSize` e os offsets X/Y controlam os indicadores. A tipografia acompanha a fonte principal do jogo; os indicadores usam negrito e contorno preto. Estados passivos não recebem contador de turnos aplicado. Em Notes de estados, `<Hide State Turns>` oculta apenas o contador e `<Turn Color: #f08040>` substitui sua cor; também aceita índice da Window. As cores positiva/negativa dependem de `<Positive State>` e `<Negative State>`. Dados customizados continuam vindo de `setStateDisplay`; taxas de buff/debuff acompanham os multiplicadores reais.

Exemplos: `skills-states parameters set --path /Skills/LayoutStyle --value '"lower/right"' --project JOGO`; `skills-states parameters set --path /States/TurnOffsetX --value=-2 --project JOGO`. Para valores numéricos negativos, use `--value=-2`, com sinal de igual. As tags `hide-state-turns` e `state-turn-color` usam a tag completa como string JSON e o hash retornado por `tags list --target states:ID`. Os parâmetros de apresentação também são editáveis no Plugin Manager.


### Consumidores de custos e botões

SkillCooldowns 1.08, LimitedSkillUses 1.05 e ButtonCmnEvts 1.11 permanecem plugins originais, carregados depois de Coreto SkillsStates. O provider fornece a enumeração de habilidades do inimigo, os tipos adicionais, toggles e os hooks reais de compilação e texto de custo. `VisuMZ.SkillsStatesCore.Parse_Notetags_Skill_JS` compila as regras da habilidade no carregamento do banco e pode ser estendido pelo consumidor. `Window_Base.makeAdditionalSkillCostText(user, skill, text)` participa da composição antes do texto customizado; `skillCostSeparator()` separa as parcelas. Consultar/desenhar custo não paga recursos.

Com SkillCooldowns, `<Warmup: 2>` e um `<JS Warmup>` que soma 1 começam em 3. O relógio avança na preparação do turno do battler, antes da ação. `<Cooldown: 2>` com `<Global Cooldown Plus: +1>` fica em 3 após o uso e chega a zero após três preparações seguintes; o callback On Cooldown Ready ocorre uma vez nessa transição. Modificadores de tipo alcançam os tipos adicionais. Use as tags completas `<Bypass Cooldowns>` e `<Bypass Warmups>`, ou `<Clear User Cooldowns>` e `<Clear User Warmups>` para reset. Toggle ON omite o cooldown da consulta; desligar revela o contador pago ao ligar. Os contadores são limpos ao sair da batalha.

Com LimitedSkillUses, `<Limited Uses: 2>` permite duas utilizações; a terceira fica desabilitada, com indicação `Empty`. `<Unlimited Use>` exclui a habilidade do limite global. O modificador de trait válido é `<Global Use Max: +1>` (o help original contém um erro de grafia). `<SType 1 Use Max: +2>` usa o tipo nativo da habilidade; a restauração `<User Stype 2 Uses: +1>` também alcança tipos adicionais. `<Bypass Recover All Uses>` e `<After Battle Uses Recover: 0>` preservam o gasto em recuperação total e fim da batalha, respectivamente. Esses gastos persistentes são distintos dos cooldowns transitórios e devem integrar a verificação de save/load.

Para atribuir um botão, use no menu uma habilidade com `<Assign Button Common Event: ID>`, `<Assign Button Slot: 1>` e `<Assign Button Show Cost>` ou `<Assign Button Pay Cost>`. A primeira opção só mostra o custo; a segunda também paga ao ativar o evento, bloqueando quando faltam recursos. O custo usa o ator selecionado na atribuição. Redesenhos repetidos não descontam PM nem executam o evento. A comparação usa eventos comuns distintos para duas ações: no consumidor original 1.11, reutilizar o mesmo evento no mesmo slot apaga os dados de exibição durante a nova atribuição; essa limitação do original não foi alterada.


### Efeitos de vida originais

LifeStateEffects 1.07 requer BattleCore e SkillsStates antes dele. A qualificação substitui somente SkillsStates, com CoreEngine/BattleCore/LifeStateEffects originais fixos. Auto Life, Guts, Curse HP/MP/TP, Doom, Fragile, Undead e transformação de inimigos conservam seus resultados. Auto Life soma as porcentagens dos estados aplicados e os consome; uma nova morte não reaproveita a ressurreição consumida. Doom distingue expiração de remoção explícita. Fragile reage ao dano de ação qualificado, não à simples redução direta de HP. Undead inverte a cura e a regeneração, exceto quando uma fonte possui `<Allow Undead Regen>`.

O consumidor estende `Game_BattlerBase.canClearState(state)`. A limpeza do provider consulta esse hook com o motivo de retenção atual e restaura esse motivo após cada callback de remoção, permitindo que `<Extinct>` sobreviva à morte e impeça ressurreição até sua remoção explícita. `<No Death Clear>` preserva os demais estados marcados; o callback de remoção do estado Auto Life continua ocorrendo uma única vez. O BattleCore original também consulta as configurações efetivas de habilidades via `VisuMZ.SkillsStatesCore.Settings.Skills` ao construir seus comandos.

### Barreiras e Trait Sets com Skills States

Mantenha os originais ElementStatus Core e AntiDmgBarriers depois do provedor Skills States (e Battle Core antes), seguindo as dependências desses consumidores. As tags de barreira continuam pertencendo ao AntiDmgBarriers. Uma barreira aplicada `<All Absorb Barrier: 150>` absorve um golpe de 100, exibe 50 e se remove no próximo golpe de 100, deixando passar 50 de dano. A remoção chama `<JS On Erase State>` uma vez. A atribuição apenas passiva não ativa a proteção; dano periódico e alterações diretas de recurso também não a consomem.

O provedor incorpora os estados passivos configurados nos Trait Sets do ElementStatus original. A troca de Trait Set recompõe os parâmetros, inclusive com aura/miasma e carga TPB; os testes verificam valores de atributos, não apenas carregamento do plugin. O dano periódico autoral é arredondado por estado e aplicado depois da regeneração nativa, acumulando o resultado de HP/MP para o popup. Isso preserva o comportamento do Skills States mesmo quando Battle Core interrompe sua própria regeneração no turno zero.

### Efeitos visuais e tooltips de estados

Visual State Effect e State Tooltips permanecem originais. Na composição verificada, Coreto Core, Battle e Message ficam antes dos consumidores; use exatamente um provedor Skills States (original ou Coreto). Coreto Message reconhece as duas alternativas e rejeita duplicação, versão incompatível ou provedor colocado depois do tooltip. Party System e Class Change System originais são necessários para suas próprias janelas.

O Visual State Effect recebe as chamadas de adição e remoção do provedor: popups, animações, prioridade de cor/opacidade/movimento e restauração acompanham o estado aplicado. Estados passivos continuam contribuindo para a aparência quando sua cópia aplicada é removida. O tooltip lê a duração real com `buffTurns(paramId)`/`debuffTurns(paramId)` (parâmetros 0–7), e `getStateDisplay`, `setStateDisplay` e `clearStateDisplay` aceitam um ID ou o objeto nativo `$dataStates[id]`. Os testes cobrem estados permanentes, fim de ação e fim de turno, troca de combatente sob o ponteiro, buffs/debuffs, passivos, conteúdo vazio, saída de cena e reentrada em batalha.

### Boost e comandos de batalha

O Boost Action original usa `battler.getStateReapplyRulings($dataStates[id])` para aplicar as regras de duração. Com `<Boost Damage>` e `<Boost Turns>`, o nível reservado afeta dano e duração; o custo da habilidade continua sendo pago uma vez ao confirmar a ação. A ajuda aceita `\boostDamage[100]` e `\boostTurn[3]`. Cancelar a seleção de alvo preserva os pontos reservados; Unboost devolve um ponto antes da nova seleção.

No Battle Core, `State Turns Change By` com Auto Add começa na duração solicitada, enquanto um estado existente recebe o acréscimo. `State Turns Change To` define a duração. Ambos respeitam o máximo do SkillsStates e removem o estado ao chegar a zero. “All Skills” consulta os tipos acessíveis e as regras de ocultação; `<Command Text: Golpe direto>` prevalece sobre `<List Name: Golpe listado>` no comando direto, enquanto a lista conserva seu próprio rótulo.

### Conjuntos, formação e classes

EquipSetBonuses original fornece os passivos configurados por quantidade de peças. Um bônus de duas peças entra ao equipar a segunda e sai ao remover qualquer uma; uma fonte aprendida do mesmo estado mantém a contribuição até também ser retirada. Sem `<Passive Stackable>`, fontes sobrepostas não duplicam o multiplicador. Mantenha ItemsEquips original e as dependências do consumidor na ordem exigida.

Com PartySystem original, `condition = user === $gameParty.leader();` dentro de `<JS Passive Condition>` acompanha a mudança de líder. Reservas recebem auras, mas não emitem; `<Not User Aura>` exclui o emissor. A troca de formação, a substituição em batalha e o retorno ao mapa preservam essas regras. O contador que limita avaliações JavaScript por quadro é reiniciado ao terminar a batalha.

Com ClassChangeSystem original, a classe principal fornece suas próprias Notes passivas. A Note da subclasse não vira uma fonte passiva; use `<Passive Condition Multiclass: 2>` no estado concedido por outra fonte para condicioná-lo à classe 2 em um slot. Retirar acesso ao tipo de habilidade não esquece a habilidade aprendida nem elimina seu passivo. Trocas e remoções de equipamento recompõem suas próprias contribuições.

### Selecionar habilidade em mensagens

O comando **Select: Skill** do Message Core abre as habilidades do ator indicado em `ActorID`; zero usa o líder, e um ator explícito pode estar fora do grupo. Mantenha exatamente um SkillsStates compatível antes de Message. Tanto Message original quanto Coreto foram comparados com SkillsStates original/Coreto; Coreto Message exige Coreto Core antes dos dois.

Escolha uma variável existente maior que zero em `VariableID`. A confirmação grava o ID da habilidade, sem executá-la ou gastar seu custo; cancelar grava zero, inclusive com lista vazia. O evento continua uma vez após a escolha. `SkillTypeID=0` aceita os tipos acessíveis; outro valor filtra também os tipos adicionais de `<Skill Types: 2>`. Habilidades ocultas ou sem tipo acessível não entram na lista. Posicione Select: Skill imediatamente após **Mostrar Texto** para juntar a seleção à mensagem, ou use-o sozinho. `message api describe SelectSkill --json --project JOGO` descreve o contrato e os argumentos para autoria.

### Categorias, assistência e alvos da IA

Depois do carregamento, cada estado expõe `categories`, uma lista em maiúsculas com `ALL`, `ANY`, as categorias da Note e `POSITIVE`/`NEGATIVE` quando marcadas. `battler.statesByCategory("positive")` aceita caixa mista e espaços externos; `totalStateCategory` conta os estados ativos, incluindo passivos, e `totalStateCategoryAffected` conta somente os aplicados. Um estado presente das duas formas não é contado duas vezes quando `states()` o apresenta uma vez.

Com Options original ou Coreto depois de SkillsStates, habilite Playtest Effects (`assistMode`) e Resist Negative Effects na categoria Playtest. A resistência impede novos estados negativos e debuffs de atores; estados positivos/neutros e buffs permanecem. Inimigos não recebem essa assistência, e habilitá-la não apaga um estado já aplicado. A configuração salva por Options continua após reiniciar e carregar o jogo. Essas opções de teste exigem a execução em modo playtest.

BattleAI original usa as categorias para `Highest/Lowest Positive State Count` e `Highest/Lowest Negative State Count`; `Highest/Lowest State Count` considera todos os estados ativos. Empates preservam o primeiro candidato válido. Escreva uma condição AI válida junto de `<AI Target: Highest Positive State Count>`; `<No AI Conditions>` deixa a lista de candidatos dessa estratégia vazia no original. Passivos elegíveis participam da contagem. Mantenha BattleAI depois de CoreEngine, BattleCore e SkillsStates.

### Gatilhos automáticos por tipo de habilidade

Mantenha AutoSkillTriggers 1.17 original depois de CoreEngine, BattleCore e SkillsStates. Uma habilidade de tipo nativo Ember com `<Skill Types: 2>` também participa das condições de Tide quando esse é o nome do tipo 2 no banco. A habilidade de reação pode declarar `<Auto Trigger: Skill Type Ember User>` ou `<Auto Trigger: Skill Type Tide Target>`. O ator deve ter aprendido a reação; o inimigo a disponibiliza em sua lista de ações, mesmo quando a condição da ação normal não está ativa. Os requisitos e custos da reação continuam valendo.

O consumidor percorre os tipos para cada relação de destinatário. Se uma mesma reação contém condições User para Ember e Tide, a ação de dois tipos pode executá-la duas vezes: não há deduplicação entre esses dois encontros. A sequência qualificada executa a ação principal, as reações do usuário, a reação do alvo e a reação Friends Only do aliado; cada execução válida paga seu próprio custo. As reações automáticas não iniciam outra cadeia de gatilhos.

Selecionar um toggle na janela de habilidades da batalha muda sua ativação sem despachar a ação normal nem consumir a ação reservada. Ligar paga o custo do toggle uma vez; desligar não paga. Esse gesto não gera as reações por tipo, mesmo que o toggle também declare dois tipos. Ao usar depois uma habilidade normal de dois tipos, as reações ocorrem normalmente. A comparação cobre duas ações consecutivas e os efeitos, recursos, destinatários e ordem reais, com consumidores originais fixos.

### Composição de habilidades e estados

Cooldowns, usos limitados e Boost podem atuar sobre a mesma habilidade: a seleção bloqueada não paga custos nem consome cargas. Barreiras absorvem dano antes de Auto Life; o estado removido deixa de fornecer tom visual e tooltip. Configure os suportes e os consumidores na ordem exigida pelo `api describe`; use um único provedor de cada Core. A combinação foi exercitada com CoreEngine, Battle e Message originais ou Coreto, mantendo ElementStatus e os sete consumidores originais.

Efeitos periódicos JavaScript de estados passivos são recalculados a cada regeneração, depois da regeneração nativa. Estados aplicados mantêm o valor calculado na aplicação, salvo `<JS Slip Refresh>`. Em categorias, `Category` e `Categories` aceitam lista inline ou bloco. `statesByCategory`, `removeStatesByCategory` e `removeStatesByCategoryAll` normalizam o nome; `isStateCategoryResisted` recebe o nome já em maiúsculas. A remoção não elimina a fonte de um estado passivo. Consulte os métodos em `skills-states api describe` para argumentos e efeitos no resultado da ação.

Battle mantém os dados visuais de inimigos compartilhados com os consumidores; a transformação reconstrói esses dados. Alterações de estado feitas por ElementStatus usam o mesmo objeto que a apresentação consulta.

### Continuação de saves de habilidades e estados

A continuação qualificada usa saves produzidos com SkillsStates original e os mesmos suportes e consumidores, substituindo somente esse provedor por Coreto. Ela foi verificada com Save original e Coreto, no armazenamento IndexedDB do navegador e nos arquivos nativos do NW. Mantenha os IDs do banco e a configuração dos consumidores do save de origem.

Habilidades aprendidas, recursos, toggle, estados aplicados, duração, origem, dados e texto de estado, buffs e usos limitados continuam após carregar. Os valores periódicos de HP/MP/TP calculados na aplicação são dados duráveis do estado; não precisam ser reaplicados para funcionar. Passivos, auras e a apresentação visual são reconstruídos a partir das fontes ativas. A sequência verificada carrega o checkpoint original, altera os efeitos e recursos, grava outro slot e continua em um novo contexto/processo; um checkpoint anterior sem esses estados conserva seus valores iniciais.

Cooldowns e reservas de Boost observados fora da batalha seguem o reset da referência; efeitos exclusivos da batalha não são prometidos como progresso de mapa. Sprites, bitmaps, promises e a tropa ativa não integram o save qualificado. Esta cobertura não estabelece importação de qualquer campanha nem compatibilidade de saves Coreto de volta ao original.

### Validação e dados de estado

Use `skills-states validate --project <jogo> --json` para verificar os formatos nativos, a sintaxe JavaScript e a configuração dos provedores. A validação é somente leitura: não executa scripts de autoria nem substitui a observação no jogo. Ela reconhece comandos com os dois receptores compatíveis e Notes de Skills/Items; informa dependências ausentes, duplicadas, versões declaradas incompatíveis e ordem de carregamento. Não compara bundles com fontes nem resolve referências construídas dinamicamente por JavaScript.

Nos callbacks de estados, `stateData(state)` devolve o objeto compartilhado daquele estado. `getStateData`, `setStateData` e `clearStateData` aceitam o objeto nativo ou o ID; limpar substitui o objeto por outro vazio. `setStateOrigin(stateId)` sem segundo argumento usa o usuário ativo do contexto, e `clearStateOrigin(stateId)` remove a origem registrada. Consulte cada método por `skills-states api describe` antes de usá-lo em um callback; esses métodos são APIs do jogo, sem execução remota pela CLI.

Uma habilidade que apenas remove uma categoria presente ou define os turnos de um estado aplicado pode ser elegível sem outro efeito nativo. Alterações de turnos de estados e buffs acontecem quando a ação acerta; uma falha não altera a duração. A remoção limitada por categoria segue a contagem da referência: um limite positivo fracionário remove até o próximo inteiro, e zero ou um limite omitido não remove estados.

### SkillsStates no pacote instalado

Use a CLI relativa à raiz entregue, por exemplo `node coreto/tools/coreto/cli.mjs skills-states --help --project "RPG Maker MZ"`. Ajuste o caminho ao jogo indicado no README da instalação. Descubra a capacidade com `api list`/`api describe`, selecione o provedor com `install` e leia o alvo com `tags list` antes de gravar uma Note com o hash retornado. `validate` verifica a autoria sem executar o jogo. Reinicie o jogo para observar o efeito; uma mudança no arquivo não atualiza dados já carregados.

Mover a pasta que contém `coreto/` e o jogo conserva essa rota. A reinstalação geral atualiza as ferramentas e os bundles, preservando o registry e o conteúdo nativo do jogo existente. A seleção de SkillsStates é uma operação separada; configure um Core Engine compatível antes dele. Não copie consumidores originais sem sua própria instalação/licença nem altere as fontes congeladas da engine para editar uma habilidade.

### State Tooltips externo

Com `VisuMZ_3_StateTooltips` já instalado, `message tooltips --help` apresenta edição dos parâmetros existentes e das notas de States. Use `message api describe TIP-M-015` para parâmetros e `TIP-RX-002` para descrições. A CLI preserva os bundles originais, ativação e ordem; configurar um painel opcional não instala suas dependências. Reinicie o jogo após editar a configuração.
