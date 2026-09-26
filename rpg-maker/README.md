# Afogados em Terra Seca — RPG Maker MZ

O projeto jogável fica em `rpg-maker/The Dryland Drowned/`. A migração [eventbridge-minimal-runtime](../planos/tasks/eventbridge-minimal-runtime/spec.md) está implementada e em regressão/QA; seus [critérios de verificação](../planos/tasks/eventbridge-minimal-runtime/verification.md) distinguem testes, editor, experiência visual, áudio e aceite humano. O [aceite de 2026-09-10](../docs/qa/deliveries/init-rpg-maker-mz/README.md) descreve a baseline histórica e não aprova automaticamente este incremento.

## Jogar localmente

Com Node 22+ e Google Chrome no Windows ou macOS, execute na raiz do repositório:

```sh
npm start
```

O servidor abre `http://127.0.0.1:18726/` no Chrome, sem build ou instalação de dependências do jogo. `npm start -- --no-open` apenas serve; no PowerShell, `npm.cmd start` funciona quando a política bloqueia `npm.ps1`. Encerre com Ctrl+C no terminal que iniciou o processo.

Para Continue, preserve endereço, porta e perfil do navegador. Use uma aba de jogo por vez. Antes de reutilizar uma porta ocupada, identifique o processo e confirme o conteúdo servido: `lsof -nP -iTCP:18726 -sTCP:LISTEN` no macOS ou `netstat -ano | findstr :18726` no Windows. Não encerre processos desconhecidos. `npm start -- --port 18727` usa outra origem, com outros saves.

## Arquivos e retomada

**Jogar/Novo jogo** abre o seletor nativo do SaveCore. Escolha um dos 20 arquivos; selecionar um arquivo ocupado autoriza sua substituição pelo início da nova campanha. Cancelar retorna ao título sem sobrescrever o arquivo. **Continuar** abre a lista nativa para carregar a campanha desejada.

Os checkpoints explícitos gravam no arquivo escolhido: início, partida, revelação, abordagem, sacrifício, consequência, recompensa, Conselho e final. Transferências não acrescentam autosaves incidentais. A gravação segura o evento até concluir; uma falha libera a espera e mantém o último arquivo salvo com sucesso. O comportamento de erro e seleção pertence ao SaveCore/MZ instalado.

Continue restaura objetos, imagens, mapa e pilha dos interpretadores nativos. A retomada do mesmo checkpoint não repete a decisão nem grava novamente a sequência já salva. Um final carregado reapresenta o desfecho comprometido e seu encerramento. Alterar apenas texto ou um rótulo histórico de revisão não cria bloqueio de carregamento. Um save pode conservar o texto da lista de comandos já serializada; inicie um Novo jogo para conferir o texto atual de um mapa. Mudanças estruturais em mapas/listas de comandos podem tornar saves antigos incompatíveis com o conteúdo; não há promessa de migração automática.

## Editar cenas e conversas

Abra `The Dryland Drowned/game.rmmzproject` no MZ. A árvore contém título (1), prólogo (2), taverna (3), palco (4), encontros (7–22), Conselho (23), finais (25–27), memorial (28) epílogos (29–36) e conversas dos heróis (37–44, filhos da taverna). Mapas históricos reservados preservam seus IDs.

Para mudar Gorvak:

1. Na árvore, expanda **Taverna** e abra **Conversa — Gorvak**, Map037.
2. Abra o evento001. O próprio evento contém menu, conversa iniciada por Ivaí, respostas de seleção e retorno; edite **Mostrar texto** no ramo desejado.
3. Edite imagens, posição, escala, tom, duração e saída nos comandos nativos/VNPictureBusts do evento correspondente. Salve pelo editor e inicie uma sessão de teste para ver o resultado.

Prólogo, encontros, Conselho, finais e epílogos têm seus textos e escolhas no evento001 dos respectivos mapas. Maps037–044 correspondem a Gorvak, Elowen, Griznik, Seraphina, Bimbren, Liora, Vaelith e Draska. CE040 encaminha cenas da campanha e conserva as responsabilidades compartilhadas ainda necessárias. Sacrifícios, despedidas, descobertas, memorial, configuração, preload e créditos continuam usando Common Events funcionais. Os42 atalhos editoriais foram removidos; a entrada de autoria é o evento que o jogo executa.

Não é necessário adicionar comentários de identidade ou executar uma CLI para habilitar comandos suportados pelo MZ/provedor. Os comentários históricos de fonte e status podem continuar úteis aos autores. Preserve a distinção criativa do [GDD canônico](../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md); uma edição técnica não aprova texto ou arte provisórios.

### Nomes e consultas da campanha

O evento **Configuração do jogo**, CE4, reúne os comandos **Configurar herói**, **Configurar rota** e **Configurar encontro** do Bridge. Edite seus campos de nome público. O parâmetro **Evento de configuração** do plugin aponta para esse CE; os IDs funcionais H1–H8, rotas e encontros continuam vinculados às regras.

**Query** devolve um fato escalar para uma variável ou switch nativo: fase, seleção, personagem vivo, nome, rota, encontro, leitura, morte ou participantes do clímax. O próprio evento usa o resultado para compor escolhas e imagens. **CaptureContext** precede uma ação da campanha; **Action** recebe a ação e a identidade, por campo direto ou variável. **ReadingComplete** conclui a passagem de campanha capturada. **Checkpoint** vem depois da ação comprometida e antes da apresentação seguinte. Não mova um checkpoint para dentro de uma mensagem ocupada.

### Imagens, interface e leitura

Os eventos autoram imagem, escala, posição, tom, foco, saída e limpeza. O Bridge não reconstrói cenas nem apaga bustos ao encerrar um interpretador. O estado normal do MZ é o estado retomado pelo save.

**Dryland_Presentation** integra controles e apresentação. **BindInterfacePicture** identifica uma imagem como interface para HIDE; fundos, retratos narrativos e lápides permanecem visíveis. **ChoiceFocus** prepara navegação/foco das escolhas. **MotionPreference** consulta movimento reduzido para o evento escolher sua sequência animada ou imediata.

Uma leitura observacional usa **ObservationBegin/ObservationComplete** no interpretador que executa o conteúdo. Nos mapas dos heróis, **ObservationBegin** recebe uma unidade numérica explícita, preservando os IDs de conversa (83/87/91/95/99/103/107/111), seleção (+1) e grupo cheio (+2). Os IDs 82/86/90/94/98/102/106/110 dos perfis removidos ficam aposentados, sem renumeração ou reúso. Só a conclusão marca a unidade como lida. Editar o texto mantém essa identidade; uma unidade realmente nova precisa de uma identidade própria. Para passagens de campanha, o evento consulta **passageRead**, chama **ReadingPermission** e encerra com **ReadingEnd** antes de **ReadingComplete**.

FAST é o controle de aceleração do Extended Message Functions e exige unidade já concluída e seleção do jogador. O botão AUTO foi removido por decisão de 2026-09-14; Configurações e HIDE permanecem. Nova unidade, escolha, transferência, Options/retomada desligam os modos ativos. Não há atalho S de pulo instantâneo. Tab/HIDE oculta a interface; Tab ou clique esquerdo restaura sem confirmar o trecho. Movimento do personagem e aceleração comum de eventos ficam bloqueados; o menu RPG permanece desabilitado por comando nativo.

### Pré-carregamento da taverna

No CE351 **Taverna — Carregar imagens**, edite **CoreEngine → System: Load Images**. A lista inclui 29 arquivos: cenário, oito retratos no palco, oito bustos, Ivaí, botão/tag/painéis, três destinos e três imagens do mapa. Ela é completa mesmo quando personagens ou destinos estão indisponíveis. Entradas, retornos, interações e Continue chamam esse evento antes da apresentação.

O comando inicia pedidos assíncronos; não espera o término. Carregamento e Retry seguem o ciclo normal do MZ/provedor. Um arquivo ausente continua sendo erro real. Pré-carregamento do restante do jogo é uma [pendência separada](../docs/known-issues/KI-20260912-precarregamento-de-imagens.md).

### Ausências, memorial e créditos

O retorno à taverna apresenta cada ausência uma vez. Switches nativos guardam as ausências consumidas; o efeito pendente da sessão não é repetido por Continue. CE45 contém o fade e CE348–350 sua preparação/limpeza.

CE59–60 mostram e animam os retratos finais `Dryland_Memorial_H1`–`H8`, lápides e legendas. CE347 contém as causas curtas; nomes públicos de rota/encontro vêm das consultas. As derivadas têm [proveniência própria](asset-provenance/eventbridge-memorial.json) e preservam os retratos originais. Movimento reduzido mostra a composição final diretamente.

CE61 contém o palco e a imagem **Pular créditos · Esc**. CE63 contém **Mostrar texto em rolagem**, velocidade 2, aceleração permitida, e as atribuições. O último texto determina o término; não há temporizador paralelo. Enter, Shift ou toque mantido aceleram nativamente. Esc ou o botão pula durante a rolagem. Término e pulo seguem a mesma limpeza e **Voltar ao título**.

### Áudio

Options oferece Música, Ambiente, Temas e Efeitos, inicialmente em 40%, persistidos como preferências. Presentation mantém o descritor do ME ativo para que Temas altere o buffer atual, inclusive volume zero, sem reiniciá-lo. Os eventos continuam escolhendo as faixas. Consulte [proveniência e observações de áudio](asset-provenance/audio.md) para separar aceites anteriores, testes de buffer e audição desta mudança.

## Verificar alterações

Execute a suíte canônica na raiz, com Node 22+, Python 3 e Chrome:

```sh
node --test rpg-maker/tests/*.test.mjs
```

Ela usa engine/plugins reais e perfis temporários, serialmente na porta 18726. `DRYLAND_CHROME` pode indicar outro executável. Os recursos próprios são encerrados ao final. `tests/test-manifest.json` registra os casos; resultados ficam na árvore ignorada `docs/qa/evidence/`. Fixtures que instalam estados mecânicos são integração técnica, não campanhas jogadas.

O runtime não expõe console de QA nem preset de seed. No QA dirigido, observações de objetos nativos são somente leitura; decisões passam por teclado/mouse. O [índice de QA](../docs/qa/README.md) aponta o plano corrente. `qa/directed-adapter.mjs` prepara cópias isoladas; `qa/native-save-archive.mjs` captura o arquivo selecionado e seu índice somente após gravação confirmada. Uma ramificação usa uma cópia inalterada do checkpoint antes de abrir o jogo e entra por Continue. Hashes de origem, fontes, payload e índice pertencem à preparação de QA, sem gate de revisão no runtime.

Não há `validate-content`, `revise-layout` nem manifesto obrigatório de layout. Preserve arquivos nativos, imports e todos os assets dinâmicos no pacote local. Engine e plugins VisuStella devem permanecer intactos. Os scripts em `planos/tasks/eventbridge-minimal-runtime/` registram transformações pontuais desta migração; não são comandos de autoria nem devem ser reexecutados sobre conteúdo editado.
