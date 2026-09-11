# Afogados em Terra Seca — RPG Maker MZ

Aceite humano do incremento registrado em2026-09-10; Tasks01–13 concluídas, com refinamento narrativo conhecido. Veja [entrega e evidências selecionadas](../docs/qa/deliveries/init-rpg-maker-mz/README.md). As referências a revisão pendente abaixo são histórico de implementação, superado pelo aceite do estado atual.

O único projeto de jogo fica em `rpg-maker/The Dryland Drowned/`. Conteúdo, exemplos de implementação e evidências atuais devem partir dos dados, plugins, assets e testes MZ. A entrega mantida acima resume a migração concluída. Sua spec e o grafo originais permanecem em `.compozy/tasks/init-rpg-maker-mz/`, acervo histórico local ignorado pelo Git e indisponível num clone novo.

## Jogar localmente

No Windows (PowerShell ou Prompt de Comando) e no macOS (Terminal), instale Node 22+ e Google Chrome. Na raiz do repositório, execute o mesmo comando nos dois sistemas, sem instalação de dependências:

```sh
npm start
```

Execute na raiz do repositório, onde fica o `package.json` das ferramentas. O `package.json` dentro de `rpg-maker/The Dryland Drowned/` fica reservado ao aplicativo MZ; o comando de desenvolvimento fica fora dessa pasta para não depender de sua preservação pelo editor. Se o PowerShell bloquear `npm.ps1` pela política de execução, use `npm.cmd` no lugar de `npm`, sem alterar a política do sistema.

O comando serve `http://127.0.0.1:18726/` e abre o Chrome automaticamente no Windows e macOS; se a abertura falhar, abra o endereço manualmente no Chrome. Use `npm start -- --no-open` para apenas servir. Os avisos aparecem antes de **Jogar**. Use Enter ou o mouse para confirmar; os diálogos avançam no ritmo do jogador. Encerre o servidor com Ctrl+C no terminal que o iniciou.

Mantenha uma única aba e o mesmo endereço, porta e perfil do navegador para usar **Continuar**. Se a porta estiver ocupada, confira qual servidor está atendendo antes de iniciar outro. A execução local não publica o jogo nem exige build.

Para identificar quem ocupa a porta, use `lsof -nP -iTCP:18726 -sTCP:LISTEN` no macOS ou `netstat -ano | findstr :18726` no Windows. Se for este jogo, reutilize o endereço; caso contrário, escolha uma porta livre, por exemplo `npm start -- --port 18727`. O comando não encerra o processo existente nem troca de porta automaticamente. Saves da porta anterior não aparecem no novo endereço.

### Save e Continuação

A campanha usa somente o autosave nativo `file0`. Decisões, revelações e consequências têm checkpoints explícitos; transferências de mapa não geram saves incidentais. Durante uma escrita, a próxima apresentação aguarda sua conclusão. Em caso de falha, o aviso **Não foi possível salvar.** aparece e o jogo continua; o último save bem-sucedido permanece como ponto de retomada.

Com um save presente, o título oferece **Continuar** e **Novo jogo**. Continuar restaura a campanha, o mapa e a pilha de eventos nativos, inclusive uma despedida pendente. Novo jogo começa diretamente e substitui o save ao concluir a primeira gravação. Não há seleção de slots nem confirmação adicional.

Saves de uma revisão nativa anterior ou com dados inválidos são recusados antes da instalação dos objetos da partida. O título informa **Esta campanha não pode ser carregada.**, preserva o arquivo e mantém Novo jogo disponível. Um arquivo sem metadados de índice também recebe essa explicação; o jogo não reconstrói o índice nem sobrescreve a campanha automaticamente.

No editor, mantenha **Action** separado de **Checkpoint**. O evento deve instalar a decisão validada, chamar o checkpoint correspondente e só então iniciar **Present**. O Common Event **Campanha — Checkpoints após leitura** despacha as consequências da leitura. Carregar um save pode repetir o comando de checkpoint; ele não repete a decisão anterior nem grava novamente a mesma revisão já salva.

## Peças do mapa

Os eventos nativos 46–52 apresentam Pérola, Floraí, os avisos, o recebimento e a montagem automática. A confirmação do recebimento concede a peça e grava o checkpoint; a animação apenas apresenta o resultado. Duas peças liberam a rota final. Com movimento reduzido, as imagens aparecem diretamente. Os PNGs e retratos permanecem provisórios; consulte [proveniência](asset-provenance/README.md).

## Conselho e finais

O Conselho conserva os participantes vivos presentes no clímax e usa uma fala por vez. As escolhas Reunir e Destruir gravam o resultado antes de transferir para o mapa exclusivo; perder os oito heróis leva ao terceiro final. Continuar reproduz somente o resultado salvo. Os eventos História — Conselho, Reunir, Destruir e Bad ending mantêm o texto editável no MZ. O memorial reúne os mortos com retratos, lápides e legendas; movimento reduzido mostra diretamente a composição final. Os epílogos elegíveis levam aos créditos, com Pular créditos por mouse/teclado e retorno automático ao título. Continuar preserva o desfecho salvo e reproduz seu encerramento.

## Controles, diagnóstico e áudio

Tab ou HIDE oculta a interface; Tab ou clique restaura o mesmo trecho sem confirmá-lo. As utilidades superiores Rever descrição e Recuar ficam disponíveis quando as abordagens estão prontas. Pular texto já lido usa S ou o botão visível e para no primeiro trecho ainda não lido.

As opções nativas têm quatro volumes independentes — BGM, BGS, ME e SE — iniciando em40%. Preferências sobrevivem a Novo jogo. O [mapeamento de áudio](asset-provenance/audio.md) registra quatro contextos, dois temas finais e dez efeitos existentes. A seleção é provisória; playback e volume foram verificados, mas a audição e a adequação artística continuam pendentes.

No DevTools, `expeditionQA` oferece somente `setSeed(uint32)` antes de Jogar, `snapshot()` e `validate()`. O snapshot versão4 é uma cópia destacada; não é uma API de mutação. Erros de imagem requerida usam Retry nativo. Campanha inválida interrompe decisões e oferece retorno ao título preservando o arquivo existente.

O [plano de QA nativa](../docs/qa/guides/native-mz-cycle.md) separa testes, jornadas legais no Chrome, exportação e parecer humano. Para a aceitação E2E, use o executor dirigido e as receitas do plano de QA. Os drivers legados `node --test rpg-maker/qa/*.test.mjs` produzem somente evidência parcial. O executor precisa da porta18726 livre e fecha seus próprios perfis e processos.

## Editar as cenas

Abra `The Dryland Drowned/game.rmmzproject` no editor MZ. A árvore reserva título (1), prólogo (2), taverna (3), palco narrativo (4), famílias de armadilhas (5–22), Conselho (23), Finais (24–27) e Memorial/Epílogos (28–36). Os IDs estáveis estão nos campos Note dos mapas como `<drylandMap:prologue>`; a árvore é organização do editor.

O Common Event **História — Prólogo** contém os textos do prólogo. Edite Show Text e preserve os comentários de identidade/proveniência. Salve no editor e recarregue o jogo. Os textos são lidos dos JSON nativos; o script usado na migração inicial não deve ser reexecutado sobre conteúdo editado.

Cada trecho fica entre `@dryland-section <id>` e `@dryland-end`. Dentro dele, os comentários `@passage`, `@speaker`, `@status` e `@source` identificam o texto. Use `narrator`, `ivai`, `perola`, `florai`, `andira` ou `H1`–`H8` como speaker; os status são `confirmed`, `prototype_baseline` e `provisional`. Show Text/Show Choices e apresentação por imagens são permitidos. Script, transferência, salvamento e ações de campanha ficam fora das seções. O comando **Present** executa apenas a faixa indexada e registra a leitura após a confirmação nativa.

Fora das seções, um comentário `@scene {"id":"prologue","backgroundId":"tavern","passageIds":["prologue.01","prologue.02","irati.01"]}` declara a ordem dos IDs, sem repetir texto. `@requires <id> <id>` declara outros trechos já migrados que não podem faltar. As declarações `@hero`, `@encounter`, `@route` e `@competency` reservam os metadados de regras dos respectivos eventos. Os profiles/speeches tornam-se obrigatórios quando um herói é declarado; as tarefas de cada feature transcrevem seu conteúdo. A task11 conferiu258 trechos:193 IDs originais e65 adições, com160 planos da baseline.

`parseEventCatalog(commonEvents, system)` retorna `catalog` (metadados), `locations` (por ID: `commonEventId`, `start` inclusivo, `end` exclusivo e `indent`) e `violations` (um erro primário por ID). `catalog.passages` tem apenas identidade, speaker, status e fonte. O runtime e a CLI fornecem `system.drylandAssets` como inventário derivado; esse campo não é editado nem salvo em System.json. O texto é obtido diretamente dos comandos localizados.

A proveniência histórica de `img/pictures/Dryland_Taverna.png` e das demais artes importadas está em [imported-assets.json](asset-provenance/imported-assets.json), com os caminhos atuais e hashes.

Os eventos de encontros contêm as 16 descrições, 48 abordagens e seus resultados. Cada seção `choices.A1`–`choices.B8` mantém exatamente três ramos no editor. **Rever descrição** e **Recuar** são controles separados dessas abordagens. O Common Event **Campanha — Fluxo de encontros** transfere para o mapa atribuído e encerra o evento anterior; não acrescente Erase Event após uma transferência, pois isso pode apagar o evento do mapa destino.

Os 193 IDs de texto e 160 planos da baseline já estão nos eventos nativos como dependências do domínio. A campanha completa está implementada; o aceite depende das jornadas E2E e dos sensores humanos registrados no plano de QA.

**Sacrifício — Escolha irreversível** apresenta o aviso antes dos candidatos. A primeira ativação de um botão Sacrificar decide a morte, inclusive com um único candidato. **Sacrifício — Palco de candidatos** mantém posições e escalas das imagens no editor. Os textos `farewell.Hn` e `death.<encontro>.context` preservam a despedida e a consequência; `memorial_cause.<encontro>` contém uma síntese provisória para o memorial. O registro de morte guarda os IDs reais de rota, encontro, posição e abordagem.

### Editar bustos e foco dos diálogos

A autoria atual usa **12 Common Events auxiliares (68–79)**. A [spec incremental](../planos/tasks/vn-slot-authorship/spec.md) substitui as receitas por herói e os 104 eventos de restauração do incremento anterior. Todos os PNGs foram preservados: as posições abaixo pressupõem retratos padronizados que Edney ajustará depois.

1. Em **Database → Common Events**, encontre `@dryland-section profile.H1` (Gorvak, CE5), ou a seção desejada nos eventos narrativos 1–67. Edite a imagem em **VNPictureBusts → Enter Bust**, e a base em **Scale To** e **Move To Coordinates**, ambos com duração zero. A entrada fica no próprio evento narrativo. A validação recusa uma entrada sem escala e posição completas antes do texto ou foco. Preserve a orientação `None`.
2. Antes da fala, chame o helper de foco da posição ocupada. O comando **Dryland_EventBridge → Foco por posição** informa somente qual Picture fala. Ajuste o estilo comum no **Plugin Manager → Dryland_EventBridge → Bustos — Foco da conversa**, conforme a tabela abaixo. Repetir o mesmo foco não acumula escala nem reinicia a animação. Se a posição reservada estiver vazia, o foco mantém a composição atual, inclusive ao carregar um save.
3. Edite ou acrescente **Show Text** no mesmo trecho. A retomada calcula a composição pelos mesmos comandos nativos até a caixa atual. Não existe receita de restauração para atualizar. Se um trecho continua a composição de outro, preserve `@visualFrom`, descrito abaixo.
4. Ao alterar os eventos, salve no editor e atribua uma revisão nativa inédita usando os comandos de **Verificar** abaixo. A troca de revisão recusa saves incompatíveis e conserva seus arquivos. Ao alterar **somente os cinco parâmetros de foco**, salve o Plugin Manager e recarregue o jogo: não é necessário trocar a revisão nativa, e Continuar aplica o estilo atual aos saves compatíveis. Confira a conversa, Opções, HIDE, saída e Continuar no Chrome.

| Parâmetro global | Padrão | Limites e efeito |
| --- | --- | --- |
| Escurecimento dos ouvintes | 24 | Inteiro de 0 a 255. Maior = mais escuro; 0 não escurece. Não é porcentagem. |
| Escala dos ouvintes (%) | 90 | Inteiro de 1 a 100; percentual da escala base da entrada. |
| Escala do falante (%) | 100 | Inteiro de 100 a 150; 110 amplia em 10% sobre a escala base. |
| Recuo dos ouvintes (pixels) | 16 | Inteiro de 0 a 100; 0 desativa. Andirá mantém sua posição refletida. |
| Duração da troca de foco (frames) | 20 | Inteiro de 0 a 60; 0 é instantâneo. Movimento reduzido e reconstrução usam 0. |

Exemplo: com base de entrada em 60%, falante em 110% fica em 66%, enquanto ouvinte em 90% fica em 54%. Os dois fatores usam a mesma base, sem multiplicar um ao outro. Para escurecer mais, altere **Escurecimento dos ouvintes** de 24 para 60; não é preciso editar arrays de tom ou os sete comandos Focus. Não há substituição de estilo por cena. O foco neutro mantém todos na base e no tom normal, mesmo com falante acima de 100%.

Esses campos são configuração do projeto, não opções do jogador. Campos ausentes usam os defaults; valores preenchidos inválidos são recusados pelo jogo e pelo validador, com o nome do campo a corrigir. A [spec dos parâmetros](../planos/tasks/vn-focus-parameters/spec.md) registra a migração inicial dos comandos; saves anteriores a essa migração continuam sujeitos à incompatibilidade de revisão.

| Common Event | Função |
| --- | --- |
| 68–72 | Foco nos slots 60, 61, 62, 63 e 64, respectivamente |
| 73 | Entrada dos heróis no Conselho: condições escolhem as imagens; uma base por posição |
| 74 | Intervenção de Andirá: oculta heróis, entra no slot 65 e recebe foco |
| 75 | Retorno dos heróis após a saída de Andirá |
| 76 | Saída do slot esquerdo 60 |
| 77 | Saída do Conselho: 60–63 e 65 |
| 78 | Saída do slot direito 63 |
| 79 | Foco neutro: todos na base de entrada |

No Conselho, as variáveis 144–146 projetam os heróis elegíveis em ordem. No CE73, altere os três grupos **Scale To / Move To Coordinates** para mudar o layout; cada grupo atende todos os oito heróis naquela posição. Só a seleção de imagem exige ramos por herói. Não escreva manualmente nessas variáveis de projeção.

| Uso | Picture | Base X/Y | Escala |
| --- | --- | --- | --- |
| Herói em conversa ou fala isolada | 60 | 320 / 850 | 100% |
| Ivaí ou amante à direita | 63 | 960 / 850 | 100% |
| Heróis no Conselho | 60 / 61 / 62 | 200 / 650; 420 / 650; 640 / 650 | 60% |
| Andirá refletido | 65 | 330 / 500 | 100% |

Esses valores são bases de autoria para a padronização futura; não validam o enquadramento dos PNGs atuais. O slot 64 atende o segundo participante à direita em composições 2×2. Os slots 60–65 são reservados aos diálogos, separados do palco, memorial e interface.

`@visualFrom profile.H1` em `speech.H1` herda a composição visual do perfil. As referências do Conselho herdam entrada do elenco e de Ivaí; a seção atual aplica sua intervenção ou foco. A reconstrução percorre somente comandos visuais e condições permitidas, sem executar texto, decisões ou checkpoints. Referências ausentes, ciclos e relações entre conversas diferentes são recusados pela validação. Ao criar uma nova participação visual, escreva os comandos na própria seção; ao continuar uma existente, reutilize sua fonte.

Cada auxiliar tem trigger **None** e comentário `@dryland-presentation-helper <nome>`. Admite Enter, Exit, Scale, Move e Tone do VNPictureBusts, **Focus** do EventBridge, chamadas acíclicas a auxiliares, waits de até 60 frames e condições de igualdade das projeções 144–146. Preserve os comentários 657 do editor. Argumentos numéricos são literais; não use Script ou expressões nos argumentos `:eval`.

Se acrescentar **Wait** imediatamente após **Focus** dentro de um auxiliar, a espera não pode exceder **Duração da troca de foco**. Ao reduzir esse parâmetro, revise as esperas que tiver adicionado; duração 0 admite somente espera 0. Os auxiliares atuais não contêm esperas após Focus.

**Conversation** continua responsável pela duração da conversa e por limpar seus retratos. Nenhum auxiliar pode abrir uma conversa por conta própria. Imagens aguardam o carregamento real, com **Retry** nativo quando necessário; movimento reduzido usa os mesmos alvos sem animação. HIDE mantém a arte e oculta a interface. Cancelamento e skip conservam os limites da narrativa.

`IT-067` verifica edição de posição/escala, retorno de Opções e Continuar com uma caixa inserida; `IT-068` usa a [fixture técnica 2×2](tests/fixtures/vn-picture-busts-2x2/recipe.json) para testar os quatro focos, repetição, HIDE e saída no MZ real. A fixture não acrescenta história à campanha.

Os scripts de migração em `planos/tasks/` são registros de transformações pontuais. Não os execute novamente para editar o jogo: `CommonEvents.json` salvo no editor é a fonte atual.

A ampliação de participantes além das composições atuais permanece adiada. A [limitação conhecida e proposta de evolução do foco](../docs/known-issues/KI-20260911-bustos-participantes-e-foco-por-posicao.md) registra os limites de autoria e as decisões pendentes para uma eventual extensão do VNPictureBusts.

Recortes do memorial, imagens e estilos de interface ainda têm ajustes em JavaScript. As [demais oportunidades de manutenção pelo editor](../docs/known-issues/KI-20260911-eventbridge-manutencao-visual-no-editor.md) estão registradas para incrementos futuros.

### Taverna e preparação

Os oito eventos **Herói — Nome** contêm `profile.Hn`, `speech.Hn`, `selection.Hn` e `party_full.Hn`. Profile e speech usam o conteúdo aceito; as falas de seleção e grupo cheio permanecem marcadas como provisórias. O busto usa a arte local integral, posicionada e escalada pelo VNPictureBusts. Não há outro catálogo de parágrafos em JavaScript.

O evento **Taverna — Palco** possui as posições nativas dos retratos e botões. A orquestração da taverna mantém Show Choices com ramos editáveis: Herói, Destinos, Elenco e Partir. O comentário `@dryland-choice formation` expande o ramo Herói nos sobreviventes do catálogo e vincula os retratos pelo PictureChoices; o resultado retorna ao ramo original. Os modos `hero`, `destinations` e `roster` mantêm os respectivos ramos. Preserve esses comentários ao editar as escolhas. Os callbacks de foco do ChoiceCmnEvts são somente observacionais; quem decide é a ação validada.

**CaptureContext** registra a revisão da campanha antes de uma decisão. **Action** aceita uma ação tipada e um ID conhecido; `\V[22]` e `\V[30]` consultam as variáveis nativas de herói e destino, sem avaliar código. **Observe** atualiza variáveis e imagens públicas. **Present** apresenta o cursor da campanha ou, dentro da conversa da taverna, o trecho público indicado pela variável 21; conversar não registra leitura da campanha. Os comandos que alteram a campanha continuam fora das faixas de texto.

O evento **Destinos — Painel** contém ilustrações, rumores e títulos públicos em comandos nativos de imagem/MessageCore. Edite esses argumentos no editor. Observe preenche apenas disponibilidade e progresso atuais; o destino escolhido aparece junto de Partir. Esse texto de apresentação não é copiado para o catálogo de regras.

Use setas para percorrer os heróis na ordem canônica, Enter para abrir Conversar/Selecionar e Escape para voltar. Seleção manual exige três integrantes; com até três sobreviventes, todos entram automaticamente. Destinos mostra apenas progresso conhecido. A simulação da campanha é independente dos atores, HP e grupo padrão do RPG Maker.

**Recuar** aparece antes de comprometer uma abordagem quando restam pelo menos três heróis vivos no elenco. A confirmação retorna à taverna e salva a formação retornada; cancelar restaura o encontro. Mortes, encontros revelados e maior percurso conhecido permanecem. Uma nova tentativa começa na primeira posição.

Quando a expedição fica vazia antes de concluir a rota e há reservas vivas, o texto de retorno automático leva à taverna. O evento **Taverna — Ausências** faz os novos mortos desaparecerem juntos durante 60 frames nativos, sem mudar suas posições ou permitir interação com eles. Movimento reduzido deixa os lugares vazios imediatamente. Sair durante o efeito ou usar Continuar a partir do retorno já registrado não o repete; **Elenco** mantém as mortes por escrito.

**Taverna — Palco** restaura apenas os retratos ausentes a cada ciclo, para recuperar a cena após uma conversa sem reiniciar movimentos em andamento. Preserve as condições dos comandos Show Picture e os movimentos simultâneos, sem espera individual por herói.

## Verificar

```sh
node rpg-maker/tools/validate-content.mjs --json
node --test rpg-maker/tests/*.test.mjs
```

A CLI é somente leitura: retorna `{"ok":true,"errors":[]}` com exit 0, erros de conteúdo/projeto com exit 1 e `invalid_arguments` com exit 2. O fixture `--project rpg-maker/tests/fixtures/missing-prologue` deve retornar somente `missing_section` para `prologue.01` e exit 1. `native_layout_mismatch` indica que os dados nativos diferem da revisão declarada.

Após uma alteração nos comandos, textos, IDs ou System, atribua uma revisão nova:

```sh
node rpg-maker/tools/revise-layout.mjs --revision mz-20260909-02
node rpg-maker/tools/validate-content.mjs --json
```

Escolha um identificador ainda não usado. O comando escreve apenas `native-layout-manifest.json`, com hashes SHA-256 de System, MapInfos, CommonEvents e todos os Map*.json. O histórico de revisões impede reutilizar um identificador pelo comando; o validador detecta dados alterados sem atualizar o manifesto. Preferências de volume ficam no mecanismo nativo de configuração, fora desses hashes. Atualizar o manifesto é uma operação de autoria/release, não build nem migração de saves antigos; Continue exige a mesma revisão nativa do save.

O manifesto também registra os arquivos locais de `img/` e `audio/`; mantenha esse inventário atualizado ao importar assets para que a CLI e o boot validem as mesmas referências.

O teste de integração abre o Chrome com um perfil temporário, carrega os plugins reais e inicia o mesmo servidor local. A porta 18726 precisa estar livre. Requer Node 22+, Python 3 e Google Chrome; `DRYLAND_CHROME` pode apontar para outro caminho do executável. O perfil temporário é removido e os processos são encerrados ao terminar.

Resultados e capturas ficam em `docs/qa/evidence/init-rpg-maker-mz/`. `tests/test-manifest.json` declara o escopo incremental: casos ausentes, duplicados, extras e manifesto vazio fazem a suíte falhar. O único arquivo de entrada mantém as integrações seriais na porta documentada. Os testes registrados validam somente os comportamentos já implementados; não representam os 148 casos planejados nem aprovação criativa ou de entrega.
