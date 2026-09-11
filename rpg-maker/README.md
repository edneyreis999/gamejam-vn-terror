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

**Imagem, posição, escala, tom, animação e foco são autorados nos comandos do VNPictureBusts.** O EventBridge mantém a restauração e o ciclo da conversa; não oferece mais o comando Focus nem os cinco parâmetros globais. A [spec de autoria nativa](../planos/tasks/vn-native-bust-authorship/spec.md) substitui esse contrato anterior.

1. Em **Database → Common Events**, abra **005–012** para os diálogos dos heróis, ou o evento narrativo desejado. Em cada trecho, edite os comandos VNPictureBusts normalmente: imagem, origem, espelhamento, curva, posição, escala e duração. A duração de Scale To e Move To Coordinates pode ser diferente de zero. Os limites e a interpretação dos parâmetros pertencem ao VNPictureBusts.
2. Para destacar quem fala, use **Scale To**, **Move To Coordinates** e **Tone**, antes do Show Text. Você pode escrever os comandos na própria cena ou chamar um auxiliar. Não existe mais um foco automático sobrescrevendo o resultado.
3. A migração preserva o destaque atual em auxiliares nativos: **CE080** destaca o herói na taverna e **CE081** destaca Ivaí. Edite esses eventos para mudar o destaque compartilhado pelos oito diálogos. Como os valores agora são explícitos, mudar a escala da entrada não recalcula os valores desses auxiliares. Ajuste os comandos posteriores que você quiser que acompanhem a entrada.
4. Use **Wait** quando a animação deve terminar antes da fala ou do próximo comando. Comandos sem espera podem executar ao mesmo tempo, conforme o VNPictureBusts. Prefira valores absolutos para composições repetíveis; ajustes relativos acumulam conforme a sequência autorada.
5. Salve no editor, atribua uma revisão nativa inédita pelos comandos de **Verificar** e recarregue o jogo. Mudanças nos eventos continuam sujeitas ao contrato de revisão e incompatibilidade de saves anteriores. Confira a conversa, Opções, HIDE, saída e Continuar no Chrome.

| Common Event | Função atual, inteiramente autorada em comandos nativos |
| --- | --- |
| 68–72 | Destaque das posições 60, 61, 62, 63 e 64 no Conselho |
| 73 | Entrada dos heróis no Conselho, conforme as projeções 144–146 |
| 74–75 | Intervenção de Andirá e retorno dos heróis |
| 76–78 | Saídas do herói, Conselho e personagem da direita |
| 79 | Composição neutra do Conselho |
| 80–81 | Destaque do herói e de Ivaí na taverna |

São **14 auxiliares (68–81)**. Falas isoladas usam a composição da própria entrada. As imagens e os textos existentes foram preservados; o enquadramento final dos PNGs continua sob autoria da equipe.

Pictures 60–65 continuam sendo a convenção dos diálogos existentes. O EventBridge acompanha os IDs criados pelo VNPictureBusts durante a conversa para limpá-los ao sair, sem impor essa faixa. Ao escolher outro ID, confira se ele não é usado pelo fundo, palco, memorial ou interface: reutilizar um ID substitui a imagem que já o ocupava.

`@visualFrom profile.H1` em `speech.H1` informa que a conversa continua a composição do perfil. Preserve essas referências e os comentários `@dryland-section`/`@dryland-end`. Ao retomar, o EventBridge extrai os comandos visuais anteriores à caixa atual e os entrega ao próprio VNPictureBusts. Texto, escolhas, waits e ações da campanha não são repetidos. Referências ausentes, ciclos e mistura de conversas continuam sendo erros estruturais.

A retomada reconstrói o **resultado final** dos comandos, com duração zero. Animações pontuais de batalha não se repetem; efeitos contínuos podem reiniciar seu ciclo. Expressões dos campos `:eval` são código do autor e podem ser avaliadas novamente: use apenas cálculos sem efeitos colaterais. Valores dependentes de tempo, aleatoriedade ou estado alterado podem produzir outro resultado. Não use esses campos para alterar a campanha.

Cada auxiliar mantém trigger **None** e comentário `@dryland-presentation-helper <nome>`. Comandos do VNPictureBusts e seus parâmetros são livres; chamadas a auxiliares devem ser acíclicas. Os ramos de elenco usam as projeções 144–146, sem escrever nelas. Show Text, escolhas, scripts e ações da campanha pertencem aos seus trechos narrativos e de domínio, não aos auxiliares visuais. Os diagnósticos e limites próprios do fornecedor continuam aplicáveis.

**Conversation** delimita a conversa e a limpeza. Imagens aguardam o carregamento real, com Retry nativo. Movimento reduzido elimina durações e waits de apresentação; HIDE conserva os bustos e oculta a interface. O EventBridge não altera engine nem arquivos da VisuStella.

`IT-067` verifica autoria e caixas inseridas; `IT-068` cobre foco manual, HIDE e saída na fixture 2×2; `IT-069` cobre parâmetros antes bloqueados, comandos adicionais, outro Picture ID, Opções e Continue. A [verificação do incremento](../planos/tasks/vn-native-bust-authorship/verification.md) registra os resultados efetivamente executados.

Os scripts de migração em `planos/tasks/` são registros de transformações pontuais. Não os execute novamente para editar o jogo: `CommonEvents.json` salvo no editor é a fonte atual.

A ampliação de participantes além das composições atuais permanece adiada. A [limitação conhecida e proposta de evolução do foco](../docs/known-issues/KI-20260911-bustos-participantes-e-foco-por-posicao.md) registra os limites de autoria e as decisões pendentes para uma eventual extensão do VNPictureBusts.

Recortes do memorial, imagens e estilos de interface ainda têm ajustes em JavaScript. As [demais oportunidades de manutenção pelo editor](../docs/known-issues/KI-20260911-eventbridge-manutencao-visual-no-editor.md) estão registradas para incrementos futuros.

### Taverna e preparação

Os oito eventos **Herói — Nome** contêm `profile.Hn`, `speech.Hn`, `selection.Hn` e `party_full.Hn`. As quatro famílias são placeholders provisórios para todos os oito heróis, com revisão narrativa pendente. A [integração do PR #3](../planos/tasks/pr3-taverna/spec.md) reabre o aceite editorial anterior sem reescrever as falas. O busto usa a arte local integral, posicionada e escalada pelo VNPictureBusts. Não há outro catálogo de parágrafos em JavaScript.

O evento **Taverna — Palco** possui as posições nativas dos retratos e botões. A orquestração da taverna mantém Show Choices com ramos editáveis: Herói, Destinos, Elenco e Partir. O comentário `@dryland-choice formation` expande o ramo Herói nos sobreviventes do catálogo e vincula os retratos pelo PictureChoices; o resultado retorna ao ramo original. Os modos `hero`, `destinations` e `roster` mantêm os respectivos ramos. Preserve esses comentários ao editar as escolhas. Os callbacks de foco do ChoiceCmnEvts são somente observacionais; quem decide é a ação validada.

**CaptureContext** registra a revisão da campanha antes de uma decisão. **Action** aceita uma ação tipada e um ID conhecido; `\V[22]` e `\V[30]` consultam as variáveis nativas de herói e destino, sem avaliar código. **Observe** atualiza variáveis e imagens públicas. **Present** apresenta o cursor da campanha ou, dentro da conversa da taverna, o trecho público indicado pela variável 21; conversar não registra leitura da campanha. Os comandos que alteram a campanha continuam fora das faixas de texto.

O evento **Destinos — Painel** contém ilustrações, rumores e títulos públicos em comandos nativos de imagem/MessageCore. Edite esses argumentos no editor. Observe preenche apenas disponibilidade e progresso atuais; o destino escolhido aparece junto de Partir. Esse texto de apresentação não é copiado para o catálogo de regras.

Use setas para percorrer os heróis na ordem canônica, Enter para abrir Conversar/Selecionar e Escape para voltar. Seleção manual exige três integrantes; com até três sobreviventes, todos entram automaticamente. Destinos mostra apenas progresso conhecido. A simulação da campanha é independente dos atores, HP e grupo padrão do RPG Maker.

**Recuar** aparece antes de comprometer uma abordagem quando restam pelo menos três heróis vivos no elenco. A confirmação retorna à taverna e salva a formação retornada; cancelar restaura o encontro. Mortes, encontros revelados e maior percurso conhecido permanecem. Uma nova tentativa começa na primeira posição.

Quando a expedição fica vazia antes de concluir a rota e há reservas vivas, o texto de retorno automático leva à taverna. O evento **Taverna — Ausências** faz os novos mortos desaparecerem juntos durante 60 frames nativos, sem mudar suas posições ou permitir interação com eles. Movimento reduzido deixa os lugares vazios imediatamente. Sair durante o efeito ou usar Continuar a partir do retorno já registrado não o repete; **Elenco** mantém as mortes por escrito.

A composição do palco preserva as imagens e posições de Lucas no PR #3. Os arquivos `Dryland_Tavern_H1.png` a `Dryland_Tavern_H8.png` contêm essas artes sem alteração de bytes; `Dryland_H1.png` a `Dryland_H8.png` continuam atendendo diálogos, Conselho e memorial. Os arquivos `h1-Gorvak.png` a `h8-Draska.png` entregues no PR também foram preservados. O CE38 mantém escala de 35% para os oito heróis, controles superiores nas posições autoradas e Partir embaixo. A [decisão de integração](../planos/tasks/pr3-taverna/adrs/adr-001.md) registra a separação dos arquivos e a entrada do Gorvak no sistema de foco atual.

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
