# Inventário de problemas de performance: The Dryland Drowned

- **Data:** 2026-11-02. **Commit medido:** `c051a86` (`main`, árvore limpa). **Jogo:** `rpg-maker/The Dryland Drowned/`.
- **Público:** agente de IA que vai planejar a otimização.
- **Escopo:** identificar problemas e causas. **Este arquivo não prescreve solução.**

Convenções:

- **1×**: máquina de medição sem limitação.
- **T4**: CPU da thread principal 4× mais lenta e rede `Fast 4G` do Chrome DevTools.
- **Confiança:** `medido` (número obtido em execução), `confirmado no código` (lido, sem medição) ou `hipótese`.
- Caminhos de plugin são relativos a `rpg-maker/The Dryland Drowned/js/plugins/`; `rmmz_*.js` fica em `.../js/`.

## 1. Resumo

| # | Sintoma percebido | Causa curta | 1× | T4 | Código |
|---|---|---|---|---|---|
| P1 | Trava ao mover o foco entre heróis na taverna | Evento de foco grava variável, e isso recria o texto de todas as imagens | ~42 ms | 177–189 ms | MessageCore (congelado) + eventos (editáveis) |
| P2 | Soluço a cada fala | Janela de mensagem e botões refeitos a cada fala | 30–56 ms | 148–172 ms | DesignSystem (editável) + MessageCore |
| P3 | FPS baixo e queda progressiva na taverna | Filtros de cor sem efeito visual, que nunca são removidos | 49 fps; 86 sem os filtros dos balões | não isolado | DesignSystem (editável) + engine |
| P4 | Imagens surgem depois da cena; texto sobre fundo vazio | Toda transferência esvazia o cache e nada espera o carregamento | até 372 ms | até 7,4 s | Engine + eventos |
| P5 | Trava forte ao trocar de mapa | Cena inteira refeita, com 1.000 canvases e leitura síncrona da GPU | frames de 187–221 ms | frames de até 268 ms | MessageCore + engine |
| P6 | Pequenas travadas na primeira exibição | Decodificação e upload síncronos de arte maior que o palco | 11–21 ms por imagem | 39–69 ms por imagem | Assets (editáveis) + engine |
| P7 | Foco lento na primeira vez | Leitura da imagem inteira e laço por pixel | 20–35 ms | não medido | DesignSystem (editável) |
| P8 | Menos orçamento por frame | Medição de texto das escolhas por frame e 100 sprites atualizados | tick 1,7 ms | tick 7 ms | DesignSystem + plugins |
| P9 | Abertura demorada | Cerca de 12 MB de JS e 43 MB pedidos até o título | título em 1,2–1,9 s | não medido | Parâmetros + eventos |

Ordem por impacto no jogador, usando os números acima. P1 e P2 só aparecem como picos: a média de FPS nas leituras fica alta. Por isso a medição de FPS médio esconde esses problemas.

**A máquina de medição é muito mais forte que a de um jogador típico** (seção 3), então os números de 1× são um piso.

## 2. Restrições de edição

- `coreto/` e `js/plugins/Coreto_*.js` são somente leitura. Extensões vão em `<NomeDoJogo>_<tier+1>_<Recurso>.js`, carregadas depois do plugin estendido.
- **Exceção:** `Coreto_5_DesignSystem.js` pode ser editado porque está em desenvolvimento. **Essa exceção só existe em `AGENTS.md`; o trecho equivalente de `CLAUDE.md` não a cita.** Confirme com o dono antes de depender dela.
- Parâmetros e tags de plugins Coreto são editáveis e têm prioridade sobre qualquer JS (diretiva do dono do jogo, 2026-09-29).
- `js/rmmz_*.js` e plugins de terceiros não são editados.
- Eventos nativos continuam donos da estrutura das cenas. Texto de jogador fica em `Languages.tsv`. Antes de gravar em `data/` ou `js/plugins.js`, leia a skill `rpg-maker-mz-best-practices`.
- Saves existentes têm limites de compatibilidade documentados.
- Aplicam-se as ADRs G003 a G007 (`docs/adrs/README.md`).
- Trabalho relacionado: `docs/known-issues/KI-20260912-precarregamento-de-imagens.md`.

**Divergência encontrada:** a ADR-G007 diz que `Dryland_7_QADebug` vem desligado no projeto-fonte, mas ele está ativo em `js/plugins.js` (entrada 46). Não alterei nada. O plugin esteve ativo em todas as medições.

## 3. Método, ambiente e limites

**Ambiente:**

- Apple M2 Max, 96 GB, tela de 120 Hz, macOS (Darwin 25.5.0)
- Chrome 156, WebGL 2 sobre ANGLE/Metal
- Canvas de 1280×720, DPR 1, contexto de navegador isolado
- Servidor `rpg-maker/tools/start-game.mjs --port 18790`

**Método:**

- Instrumentação injetada em tempo de execução, sem alterar arquivos do jogo.
- Traces de performance do Chrome no boot, no prólogo, na taverna com conversa e no conselho.
- Jornada pública até a taverna. Saltos do menu Debug (ADR-G007) para armadilhas, conselho e finais.
- Testes A/B em tempo de execução, removendo filtros e sprites só na memória da sessão.
- Sonda de luminância de 9 pontos com `readPixels` depois de cada render, ligada só em transições.

**Limites. Leia antes de usar os números:**

1. **A máquina é topo de linha.** O limitador de CPU só afeta a thread principal. GPU, decodificadores e compositor não ficam mais lentos em T4.
2. **A GPU do M2 Max tem arquitetura por blocos (TBDR)**, em que trocar de render pass é caro. O ganho medido em P3 pode ser diferente em GPUs Intel, AMD ou NVIDIA.
3. **Tela de 120 Hz:** `fps` acima de 60 só significa folga. Num monitor de 60 Hz, 63 fps aqui equivale a 60.
4. **Só Chrome.** NW.js não foi medido e nada aqui o qualifica. Isso é permitido pela exceção local de 2026-10-26.
5. **Rede simulada, não itch.io.** O servidor local envia `Cache-Control: no-cache` sem validadores, então toda revisita baixa de novo. Isso superestima revisitas em relação a um CDN. Os cabeçalhos do itch.io não foram verificados.
6. **Projeto-fonte, não o build podado.** O Debug estava ativo. O `dist/` existente é de 2026-10-01 e não foi usado.
7. **Uma execução por cenário**, sem estatística. A instrumentação tem custo próprio nos caminhos quentes.
8. **Sem avaliação humana nem análise de vídeo.** Piscadas foram inferidas por estado e por luminância, não vistas.
9. **Não medido:** memorial e sua animação (mapa 28, CE59), finais `destroy` e `total_loss`, telas de opções, save e load, prólogo em T4, áudio. O conselho medido teve no máximo 5 imagens simultâneas (faltou o caso de 8 bustos).

## 4. Medições por cena

Idle mede a cena parada com a escolha aberta. `tick` é o tempo de JS por tick (update + chamadas de render, sem o trabalho da GPU).

| Cena | fps | Frame p50 / p95 / máx (ms) | Tick p50 / p95 (ms) | VRAM (MB) | Nota |
|---|---|---|---|---|---|
| Título, idle | 119,8 | 8,3 / 9,3 / 9,5 | 1,0 / 2,0 | | |
| Taverna, idle (início) | 63 | 16,7 / 17,6 / 25,8 | 1,7 / 2,2 | 202 | 28 imagens, overdraw 10× |
| Taverna, idle (após foco) | 48,5 | 17–18 / 26 / | 1,9 / 2,4 | 220 | Filtros em imagens: 3 → 9 |
| Taverna, T4 idle | 71 | 16,4 / 17,5 / 17,6 | 7,0 / 8,3 | 207 | |
| Taverna, T4 passando o foco | 43,8 | 16,6 / 33,4 / 191 | 7,6 / 20,9 | 236 | Filtros em imagens: 2 → 12 |
| Conversa, leitura | 116,9 | 8,3 / 9,3 / 58 | 1,2 / 1,8 | 148 | Um pico por fala |
| Armadilha, idle na abordagem | 119,6 | 8,3 / 9,3 / | 1,4 / 1,8 | 153 | |
| Sacrifício, idle | 77 | 15,9 / 16,9 / 17,7 | 1,0 / 1,4 | 191 | |
| Sacrifício, passando o foco | 72 | 16,0 / 17,6 / 65,7 | 1,0 / 29,6 | 248 | |
| Acampamento, idle | 117,6 | 8,3 / 9,3 / 17,6 | 1,2 / 1,8 | 142 | |
| Acampamento, ponteiro em movimento | 109 | 8,3 / 16,7 / 17,6 | 1,0 / 2,6 | 142 | |
| Conselho, leitura com vídeo | 114,8 | 8,3 / 9,4 / 82 | 0,6 / 1,1 | 214 | Pico máximo de 83 ms |
| Escolha final, idle | 119,6 | 8,3 / 9,3 / 9,4 | 1,0 / 1,5 | | |
| Final e epílogos | 109,5 | 8,3 / 9,3 / 75 | 0,6 / 6,7 | 150 | |
| Créditos | 119,6 | 8,3 / 9,3 / | 0,7 / 3,0 | 108 | |

VRAM é a soma de largura × altura × 4 das texturas gerenciadas pelo PIXI, medida no fim do cenário. Dessa soma, 13–116 MB eram de canvases.

## 5. Problemas

### P1. Mover o foco na taverna recria o texto de todas as imagens

- **Confiança:** `medido`.
- **Sintoma:** cada troca de herói com seta ou ponteiro congela o jogo.
- **Magnitude:**
  - 1×: cerca de 42 ms por troca (`pt=28`, 40 ms em texto de imagem, 112 bitmaps novos).
  - T4: 177–189 ms em 5 de 5 trocas (`pt=28`, 166–176 ms em texto de imagem).
- **Cadeia:**
  1. A escolha em CE3 tem `<Choice Common Event: 30..37>`. `Coreto_3_ChoiceCmnEvts.js:285` agenda o evento comum.
  2. Os eventos CE30–37 ("Foco — <herói>") gravam a variável 22.
  3. `Game_Variables.setValue` → `onChange` → `requestRefresh` (`rmmz_objects.js:732`, `:736`).
  4. No frame seguinte, `Game_Map.refresh` (`rmmz_objects.js:6703`) entra no wrapper de `Coreto_1_MessageCore.js:7534`, que chama `requestPictureTextRefreshAll` (`:7514`) para **todas** as imagens existentes.
  5. Para cada imagem visível, `drawPictureText` (`:7560`) chama `createContents` (`:7561`): 2 bitmaps do tamanho nativo mais 2 de barra de rolagem (`Coreto_0_CoreEngine.js:16808-16809`), seguidos de 9 medições e 9 desenhos de texto.
  6. Isso acontece mesmo sem texto: na taverna, 17 de 28 imagens não têm texto. O custo total também não se limita à taverna, porque **qualquer** escrita em variável ou switch faz o mesmo.
- **Gatilhos nos dados:** 740 `Query`, 344 `MotionPreference`, 414 comandos de variável e 50 de switch. Valor igual ao anterior também dispara.
- **Editabilidade:** o wrapper fica em `Coreto_1_MessageCore` (congelado). Os eventos CE30–37 e a escolha em CE3 são editáveis. `drawPictureText` tem um wrapper editável em `Coreto_5_DesignSystem.js:2384`.
- **Como medir:** contar chamadas de `Sprite_Picture.drawPictureText` em que `anyPictureTextChanges()` é verdadeiro, durante uma troca de foco na taverna.

### P2. Cada fala refaz a janela de mensagem, o nome e os botões

- **Confiança:** `medido`.
- **Sintoma:** soluço perceptível ao avançar o diálogo. É o pico mais frequente, pois os dados têm 863 comandos `Show Text`.
- **Magnitude:**
  - 1×: pico de 30–56 ms por fala (11 frames acima de 20 ms em 11 avanços na conversa).
  - T4: 148–172 ms por fala.
- **Por fala (média em 5 falas):** 92 bitmaps novos (13,5 Mpx), 1.507 `blt`, 22 uploads (3,9 Mpx), 19 `_refreshAllParts`, 9,8 refresh de botões.
- **Por chamada:**
  - `startMessage`: 25 ms na conversa e 32 ms no conselho (máximo 36 ms).
  - `Window_NameBox.start`: 17–19 ms. `Window_NameBox.refresh`: 10 ms.
- **Cadeia (janela):**
  1. `updateDimensions` (`Coreto_1_MessageCore.js:6764-6769`) roda 2,4 vezes por fala e é chamada em `:6776`, `:6801`, `:6877`, `:6951`.
  2. Ela atribui `width` e `height`. O setter de `Window` chama `_refreshAllParts` **mesmo sem mudança de valor** (`rmmz_core.js:3639-3642`).
  3. `_refreshBack` e `_refreshFrame` do DesignSystem (`Coreto_5_DesignSystem.js:1957-1970`) criam um `Bitmap` novo em cada chamada (`:1964`) e repintam o pergaminho com `paper()` (`:1649`) e `tile()` (`:1642`), que faz vários `blt` pequenos.
- **Cadeia (botões):** `Dryland_Presentation.js:113-120` (`resetModes`, `readingPermission`) → `Game_Temp.setExtendedFastForwardMode` e `setMessageAutoForwardMode` → `Coreto_2_ExtMessageFunc.js:3369` → `Window_ButtonConsole.refresh` (`Coreto_5_DesignSystem.js:2181-2182`) → `createContents` com 4 bitmaps por botão. `ReadingPermission` e `ReadingEnd` somam 706 comandos nos dados.
- **Não isolado:** por que `Window_NameBox.refresh` custa 10 ms (`Coreto_1_MessageCore.js:6992`). `set textAlign` aparece com 180–211 ms de tempo próprio nos traces, compatível com resolução de fonte em canvases novos, mas isso não foi provado.
- **Efeito também no sacrifício:** cada foco em candidato refaz a mensagem (`Dryland_6_SacrificeStage.js:129`), com cerca de 30 ms mesmo com as imagens já prontas.
- **Editabilidade:** a pintura do pergaminho e o refresh dos botões ficam no DesignSystem (editável). `updateDimensions` é congelado. O setter é do engine (congelado). `Dryland_Presentation.js` é editável.

### P3. Filtros de cor sem efeito visual derrubam o FPS

- **Confiança:** `medido` no M2 Max. Veja o limite 2 da seção 3.
- **Sintoma:** FPS baixo na taverna, que piora depois de passar o foco pelos heróis.
- **Causa:** cada filtro exige um render pass próprio (2 trocas de framebuffer por filtro). O JS gasta só ~2 ms por frame nesses casos, então o gargalo é a GPU.
  - **Balões de conversa:** `bubble.setBlendColor([85, 32, 112, 0])` (`Coreto_5_DesignSystem.js:2453`) usa alfa 0, ou seja, não muda a imagem, mas cria um filtro por balão.
  - **Filtros que ficam:** `setColorTone` cria o filtro (`rmmz_core.js:2161`) e nada o remove quando o tom volta a zero. O foco os cria em `Coreto_5_DesignSystem.js:2562`. Após o foco, 6 de 9 imagens filtradas estavam com tom `0,0,0,0`. Os bustos passam pelo mesmo caminho via `Tone_CustomToneBust`.
  - **Filtros de tela cheia:** `Spriteset_Base` mantém dois filtros nativos em tela cheia (`rmmz_sprites.js:3173`, `:3198`).
- **Censo na taverna (após foco):** 20 filtros visíveis: 9 em imagens, 7 em balões, 2 de `Spriteset_Base`, 2 em janelas. `draws=56`, 42 trocas de framebuffer.
- **Teste A/B (remoção só em memória, 3 s por configuração).** Cada linha é independente, salvo onde indicado. A linha dos balões veio de uma segunda rodada, com base de 49,0 fps e controle de 49,3 fps:

| Configuração | fps | p50 (ms) | p95 (ms) | Draws | Trocas de FBO |
|---|---|---|---|---|---|
| Base | 49,7 | 17,0 | 26,0 | 56 | 42 |
| Sem filtros de imagens com tom zero | 67,3 | 16,5 | 18,4 | 40 | 28 |
| Sem filtros dos 7 balões | 86,1 | 8,5 | 17,0 | 36 | 28 |
| Sem os sprites de texto vazios | 48,3 | 18,2 | 25,9 | 56 | 42 |
| Sem filtros com tom zero, sprites de texto vazios e telas cheias vazias do DesignSystem, juntos | 67,6 | 16,4 | 18,0 | 40 | 28 |
| Controle (tudo restaurado) | 48,3 | 18,2 | 26,3 | 56 | 42 |

- **Editabilidade:** balões e foco ficam no DesignSystem (editável). A criação do filtro é do engine (congelado).
- **Como medir:** contar `gl.bindFramebuffer` por frame e percorrer a árvore da cena atrás de `filters` em nós visíveis.

### P4. Imagens chegam depois da cena

- **Confiança:** `medido` para atrasos. Hipótese de tela preta **refutada em parte** (abaixo).
- **Sintoma:** camadas surgem aos poucos, bustos aparecem sem fade e o texto pode abrir sobre fundo vazio.
- **Magnitude:**
  - **1×:** `Dryland_Tavern_H*` em 185–218 ms e `Dryland_HeroGroup_H*` em 366–372 ms depois de `Show Picture` (a maior parte vem do frame longo de P5).
  - **T4, volta à taverna:** os heróis aparecem um a um, entre 933 e 2.133 ms.
  - **T4, entrada na armadilha B3:** fundo pronto só 7.390 ms depois do `Show Picture`. A caixa de texto ficou **1.288 ms sobre fundo sem imagem**.
  - **T4, armadilha B2:** o busto `Dryland_H2_Assustada` levou 1.056 ms e já estava com opacidade 255 ao ficar pronto, ou seja, o fade-in passou sem imagem.
- **Causas:**
  - **IMG-1. O cache é esvaziado em toda transferência.** `Scene_Map.onTransfer` → `ImageManager.clear()` (`rmmz_scenes.js:791`). São 79 comandos de transferência e 8–44 imagens destruídas por vez, conforme a cena (até 49 Mpx).
    - CE2 (título) chama CE351, que pede 29 imagens (17 MB em disco, 155 MB decodificados). Elas são destruídas ao iniciar o Novo Jogo.
    - CE39 chama CE355 ou CE356 (16 imagens, 55 MB decodificados) e transfere 13 comandos depois.
    - CE3 e Map037 chamam CE351 de novo a cada entrada.
  - **IMG-2. Nada espera.** `SystemLoadImages` só inicia os pedidos (`Coreto_0_CoreEngine.js:16965`) e o evento segue no mesmo frame. Na armadilha B3 em T4, o roteiro seguiu (fades, escuro, abertura do texto) sem aguardar o fundo. `hipótese`: pedidos já iniciados continuam e competem por conexões, pois `Bitmap.destroy` não cancela o `Image`.
  - **IMG-3. O pré-carregamento nativo não cobre bustos.** `Game_Interpreter.loadImages` (`rmmz_objects.js:9524-9527`) só lê `Show Picture` e só nos 200 primeiros comandos. `Basic_EnterBust` (243 usos, 29 imagens, 212 MB decodificados) é comando de plugin e fica de fora. E ele não distingue ramos: CE43 pede 24 imagens (70 MB) ao iniciar, mesmo usando só parte delas.
  - **IMG-5. Troca de imagem some com a anterior.** `Sprite_Picture.updateBitmap` (`rmmz_sprites.js:2917`) troca o bitmap antes da nova estar pronta. Nas superfícies, `loadBitmap` do DesignSystem (`Coreto_5_DesignSystem.js:2292`) ainda zera o bitmap e cria um em branco. A troca de bustos por `vnChangeGraphic` (`Coreto_2_VNPictureBusts.js:9555`) não tem esse problema, pois espera a carga. Este item está `confirmado no código`: a piscada em si não foi observada.
- **Tela preta (IMG-4):**
  - **Refutada neste trajeto:** nenhum frame escuro de conversa → taverna a 1×, nem nos dois sentidos em T4, mesmo com `fade=2` (59 de 79 transferências). O fundo que continua na tela conta para `Scene_Map.isReady`, porque `Sprite_Picture` carrega no construtor (`rmmz_sprites.js:2898`, `rmmz_scenes.js:38`).
  - **Escuro roteirado, não confundir:** a entrada em armadilha tem cerca de 4,3 s de tela escura **a 1×, com a imagem pronta** (provavelmente CE377 "Expedição — Avanço no escuro": 204 frames de espera). Em T4 esse trecho dura 5,1 s, pois a espera conta frames. Uma medição inicial minha atribuía esse escuro ao carregamento, e a comparação 1× × T4 mostrou o erro. O efeito real do carregamento é a 1,3 s de fundo vazio citada acima.
  - **Mapas sem tiles:** como os mapas têm 0 tiles (mapas 3, 7, 37, 45 conferidos), qualquer fundo ausente aparece como preto.
  - O caminho medido usa salto de Debug. A jornada completa com o CE356 antes da transferência não foi medida em T4.
- **Editabilidade:** eventos e parâmetros são editáveis. O engine é congelado. Antes de propor, leia o known-issue citado na seção 2 e `planos/tasks/eventbridge-minimal-runtime/adrs/adr-003.md`.

### P5. Trocar de mapa reconstrói tudo

- **Confiança:** `medido`, exceto onde indicado.
- **Sintoma:** congelamento no início e no fim de cada transferência. A pior é a volta para a taverna, por ter 28 imagens.
- **Magnitude:**
  - Tela parada entre cenas (sem estágio), nas transferências para mapa: 41–85 ms a 1×; 426–772 ms em T4.
  - Taverna → conversa em T4: 1.021 ms do toque até a nova cena; 1.464 ms até poder ler.
  - Entrada na taverna: frame de 187–221 ms a 1× (update 146–177 ms, render 41–44 ms, `pt=37`, 40 uploads, 152 bitmaps). Em T4, frames de 268, 198, 185, 181 e 157 ms, e 8 frames acima de 100 ms em 4,6 s.
  - Primeiro render de cada cena: 41–67 ms a 1×; 165–171 ms em T4. Os uploads medidos explicam só 2–23 ms a 1× e 76–80 ms em T4. O restante não foi isolado.
- **Causas:**
  - **1.000 canvases por cena.** `Spriteset_Base.createPictures` cria 100 `Sprite_Picture` (`picturesUpperLimit=100`, `rmmz_sprites.js:3179`). O construtor chama `update` e `createPictureText` (`Coreto_1_MessageCore.js:7538`, `:7571`), criando um `Window_Base` para cada ID, **visível ou não**. Cada janela aloca 10 bitmaps: 4 em `createContents` e 6 em `_refreshBack` e `_refreshFrame`, antes de `_coretoPictureText` ser marcado (`Coreto_5_DesignSystem.js:1452`). Medido: 113 janelas e 1.096 bitmaps numa transferência.
  - **Sem destruição encontrada.** Não há `destroy` de `_pictureTextWindow` nos plugins. **O heap não cresceu de forma sustentada** na sessão (44–94 MB, em cerca de 10 min), então vazamento persistente não foi demonstrado.
  - **Leitura síncrona da GPU.** `Scene_Map.terminate` → `SceneManager.snapForBackground` (`rmmz_scenes.js:888`) → `Bitmap.snap` (`rmmz_core.js:1268`). Roda em toda saída de mapa, mesmo sem menu a seguir: 12–58 ms a 1×; 35–91 ms em T4.
  - **Três bitmaps de tela cheia por cena** (`Coreto_5_DesignSystem.js:2712-2716`). Sem ganho medido ao escondê-los (P3), mas ocupam memória.
  - **Tileset em mapa sem tiles.** 4 PNGs de tileset (`World_*`) são pedidos por cena; a contribuição para o primeiro render não foi isolada.
  - **Reparse de mapa:** JSON de até 413 KB por transferência, e também ao voltar do menu (`rmmz_scenes.js:763`). Custo medido baixo.
- **`hipótese`, spinner visível:** `Graphics.startLoading` roda em toda criação de cena (`rmmz_managers.js:2174`), e o CSS só mostra o spinner depois de 400 ms (20% de 2 s, `css/game.css:96`, `:102`). Numa parada de 398 ms a opacidade ficou em 0. Com 772 ms (T4), ele deveria aparecer, mas nessa execução não foi amostrado.
- **Editabilidade:** `createPictureText` é congelado; `picturesUpperLimit` fica em `System.json` (dado editável, com impacto a avaliar, pois eventos usam IDs até pelo menos 80); o DesignSystem é editável.

### P6. Decodificação e upload síncronos de arte superdimensionada

- **Confiança:** `medido` para o custo; `hipótese` para cintilação.
- **Magnitude do `texImage2D` (inclui decodificação de PNG na primeira vez):**
  - 1×: 1600×900 opaco, 11–18 ms; 1672×941, 19 ms; 1584×1986, 14 ms; 1920×1080, 14 ms.
  - T4: 1600×900, 69 ms; 1584×1986, 59 ms; `CoretoTheme_PageCorner.png`, 39 ms.
- **Volume:** 344 PNGs em `img/pictures`: 208 MB em disco e **935 MB decodificados**. O palco tem 1280×720.
  - Bustos de 1164×2153 (9,6 MB decodificados) a 1584×1986 (12 MB).
  - Exibidos com escala de 15,84–20,58% (conselho) a 50%. `Dryland_Gravestone` (1120×1404) a 12,8–21,4%.
  - `Dryland_Camp_H*` e `Dryland_Tavern_H*`: 16 camadas de tela cheia. Na amostra (`H1` de cada grupo), a área útil é de apenas 17–18%.
  - Fundos opacos em PNG RGBA de 3,4–4,1 MB (`Dryland_Title`, `Dryland_Taverna`, `Dryland_Coreto`).
- **Upload repetido:** `CoretoTheme_PageCorner.png` (2172×724, imagem de sistema, 9,5 ms) e bustos como `Dryland_H1` reaparecem em vários segmentos, mesmo sem transferência no conselho. `hipótese`: coleta de textura do PIXI após 10 s ociosa (`GC_MAX_IDLE = 600`, `rmmz_core.js:1041`).
- **`hipótese`, cintilação:** `_baseTexture.mipmap = false` (`Bitmap._createBaseTexture`) com redução para 16–50% pode causar serrilhado em movimento. Não foi observado nem medido.
- **Editabilidade:** assets são editáveis e a saída precisa continuar nativa do MZ. O engine é congelado.

### P7. Primeira leitura de cada arte

- **Confiança:** `medido`.
- **Sintoma:** primeiro foco lento em retratos.
- **Causa:** `artworkBounds` (`Coreto_5_DesignSystem.js:2483-2485`) faz `getImageData` da imagem inteira e percorre todos os pixels em JS. `bitmap.context` força a criação de um canvas com a cópia da imagem (`rmmz_core.js:1750`). O cache é um `WeakMap` por `Bitmap`, então se perde com `ImageManager.clear()` a cada transferência. `associateArtwork` (`:2499`) também lê o fundo no contexto `roster`.
- **Magnitude (a 1×):** 1199×1312, 35,5 ms; 1145×1374, 33 ms; 1600×914, 20,3 ms; 1600×900, 5–21 ms. No sacrifício, os frames do primeiro foco chegam a 58–60 ms somando o upload.
- **`silhouetteHalo` (`:2531`), rebaixado:** 8 desenhos com `shadowBlur` custam só 0,1–0,7 ms de JS, pois o raster é diferido e esse custo não foi isolado. O efeito medido é em memória: canvases de 58 → 116 MB no sacrifício; 66 → 95 MB na taverna.
- **Editabilidade:** DesignSystem (editável).

### P8. Trabalho por frame

- **Confiança:** `medido`.
- **Magnitude:** taverna em idle: tick p50 de 1,7 ms a 1× e 7,0 ms em T4, ou seja, 42% de um frame de 16,7 ms antes do trabalho da GPU.
- **Componentes, em idle na taverna:**
  - **Medição de texto das escolhas (o maior item isolado):** `itemHeight` (`Coreto_5_DesignSystem.js:1381`) chama `textSizeEx` para **todas** as escolhas a cada chamada, e `Window_Scrollable.update` a chama várias vezes por frame (`rmmz_windows.js:680`, `:688`, `Coreto_0_CoreEngine.js:16835`). `maxChoiceWidth` faz o mesmo (`Coreto_1_MessageCore.js:7285`, via `Coreto_5_DesignSystem.js:1350`). Medido: cerca de 1.460 `textSizeEx` por segundo com 10 escolhas (33 ms/s) e 720 por segundo com 4 escolhas. Cada medição converte o texto inteiro: `replaceRules` e funções `convert*` lideram o tempo próprio de JS nos traces, ao lado de `Container.updateTransform`.
  - **100 `Sprite_Picture` por frame:** 34 ms/s, com vários wrappers de `update`, inclusive para IDs vazios. Entre eles estão `heroUnread` (`Dryland_2_ConversationIndicators.js:110`) e o `update` do Debug.
  - **`Scene_Map.update` do DesignSystem (`:2729`):** percorre todas as imagens (`collect`, `:2702`), monta assinatura (`:2768`) e zera `_transformID` de todas as imagens (`:2558`), o que derruba o cache de vértices do PIXI.
- **Rebaixados por custo baixo a 1×:** `JSON.stringify` (694/s, 0,7 ms/s) e `matchMedia` não cacheado (`:1627`, 1.389/s, 2,2 ms/s). Efeitos indiretos sobre estilo não foram medidos.
- **Editabilidade:** DesignSystem e `Dryland_*` editáveis. MessageCore e CoreEngine congelados.

### P9. Boot

- **Confiança:** `medido` a 1×. Downloads em rede lenta não foram medidos.
- **Magnitude:** último recurso de boot em 1,18 s; título interativo em até 1,9 s. Long tasks de 288, 198, 65, 61 e 57 ms.
- **Volume até o título (137 pedidos):** 44 JS (12 MB), 16 JSON (3,9 MB), 1 TSV (230 KB), 64 PNG (26,7 MB). Dos PNGs, 32 são de `img/pictures` (20,4 MB), em boa parte por causa de CE2 → CE351, e o cache é esvaziado ao iniciar o jogo (P4).
- **Avaliação de scripts:** 337 ms no total: `Coreto_1_BattleCore` 60 ms, `Coreto_1_OptionsCore` 38 ms, `pixi.js` 38 ms, `Coreto_1_EventsMoveCore` 34 ms, `Coreto_0_CoreEngine` 33 ms.
- **`BattleCore`:** 2,4 MB ativo com **0 comandos de batalha** nos dados. Dependências de outros plugins não foram verificadas.
- **Shaders:** `getProgramParameter` soma 210 ms.
- **Dados:** `CommonEvents.json` tem 2,4 MB e `Tilesets.json` 866 KB, dos quais só 2 de 6 entradas são usadas pelos mapas.
- **Editabilidade:** ativação e parâmetros de plugin e eventos são editáveis. Arquivos Coreto são congelados.

## 6. Suspeitas rebaixadas ou descartadas

Estes itens foram investigados. Não vale repetir a investigação sem fato novo.

| Suspeita | Resultado | Evidência |
|---|---|---|
| `vorbisdecoder.js` consome 3,9 s no boot | **Descartada.** Era um worker ocioso, e somei threads por engano na primeira leitura. | Perfil por thread: 2,9 ms de CPU real no worker |
| `getImageData` por frame no acampamento (`Dryland_3_CampPortraits.js:27`) | **Rebaixada.** 1×1 px, 2 por update, 0,7 ms/s. | Com ponteiro em movimento, a cena mantém 109 fps e tick máximo de 8 ms. Pode piorar sem aceleração de canvas (não medido) |
| Rajadas de comandos do interpretador | **Rebaixada.** 447 comandos em 7,5 ms a 1×; 445 em 27 ms em T4. Argumentos com `eval` em `Coreto_2_VNPictureBusts.js:9352-9355`. | Conselho: 4.857 comandos somam 83 ms em 26 s |
| `Query` montando a visão inteira da campanha (`Dryland_CampaignRules.js:796`) | **Rebaixada.** Média de 0,026 ms, máximo de 0,4 ms. | Conselho: 223 `Query` em 5,7 ms |
| `$dataCommonEvents.find` a cada `setup` (`Dryland_Presentation.js:124`) | **Rebaixada.** Só roda ao iniciar evento. | Sem presença entre os maiores tempos próprios no perfil |
| Serialização do save | **Rebaixada.** No mapa 46: 0,5 ms de JSON e 2,8 ms de compressão (33 KB → 7 KB). Save real no disco: 111 KB de JSON, 81 KB dele do interpretador. | O tamanho maior não foi cronometrado |
| Regex de localização em cada `drawText` (`Coreto_1_MessageCore.js:7664`) | **Rebaixada** como problema próprio: 7.541 chamadas por fala somam 3,8 ms. | Faz parte de P2 e P8 |
| `Coreto_2_AniMsgTextEffects` | **Sem impacto esperado.** Só 1 linha do TSV usa efeito. | Não medido isoladamente |
| Vídeo VP9 1920×1080 com alfa (`Dryland_1_AlphaMovie.js`, 19 comandos `Play`) | **Sem impacto medido nesta máquina.** No conselho, com vídeo, p95 de 9,4 ms. **Não vale para máquinas fracas:** T4 não reduz a velocidade do decodificador. | 5,4–6,7 Mbit/s, em overlay DOM, sem pré-carregamento |

## 7. Lacunas

- **Áudio (`confirmado no código`, sem medição):** no navegador, `WebAudio._updateBufferOnFetch` (`rmmz_core.js:5172`) redecodifica o buffer acumulado a cada 1 s de download com ≥200 KB. Um BGM de 160 s estéreo a 44,1 kHz (`Dryland_Village_Combined.ogg`) ocupa cerca de 56 MB em PCM (cálculo). Cada SE só carrega no primeiro uso. `Dryland_1_SceneAudio` já prepara o BGM e o BGS de cena.
- **GPU fraca:** nada aqui mede GPU integrada. É o maior risco fora do que foi medido, pois P3 aponta a GPU como gargalo mesmo no M2 Max.
- **Build publicado:** comparar com `npm run verify-build` depois de um `prune-build`; o `dist/` atual está desatualizado.
- **Rede real:** cabeçalhos de cache do itch.io e HTTP/2 mudam P4 e P9.
- **Cenas faltantes:** veja o limite 9 da seção 3.

## 8. Mapa de sintomas

- **Queda de FPS sustentada:** P3, P8.
- **Picos (engasgos):** P2 (a cada fala), P1 (foco na taverna), P5 (transferências), P6 e P7 (primeira exibição).
- **Atraso para ver imagens:** P4, P6, P9.
- **Piscadas ou imagens surgindo:** P4 (surgimento de camadas, texto sobre fundo vazio, bustos sem fade), IMG-5 (troca de imagem, um frame sem nada).
- **Piscadas ainda sem evidência:** spinner em paradas acima de 400 ms e cintilação sem mipmap (hipóteses).

## 9. Evidências e como reproduzir

Os arquivos brutos ficam em `.artifacts/perf-003/`, que está no `.gitignore`: existem só nesta máquina e podem ser apagados.

- `instrument.js`: instrumentação injetável. Depois do título, avalie o arquivo na página e use `__P.begin(rótulo)`, `__P.summary(true)` e `__P.gpu()`.
- `trace-boot`, `trace-prologue`, `trace-tavern-conversa`, `trace-council` (`.json.gz`): traces do Chrome.
- `analyze-trace.mjs`, `profile-threads.mjs`: resumem um trace. **Use `profile-threads.mjs`** para separar threads (veja a primeira linha da seção 6).

Passos:

1. Rode `node rpg-maker/tools/start-game.mjs --port <porta-livre> --no-open`. Não use a porta 18726, que é a do `npm start` do usuário.
2. Abra em contexto isolado, com viewport 1280×720 e DPR 1.
3. Para T4, use `cpuThrottlingRate: 4` e `networkConditions: "Fast 4G"`.
4. Para chegar às cenas, use `DrylandQADebug.open()` a partir de um `Scene_Map`, ou a jornada pública. Para input, despache `keydown` e `keyup` no `document`, com ao menos 60 ms entre eles.
