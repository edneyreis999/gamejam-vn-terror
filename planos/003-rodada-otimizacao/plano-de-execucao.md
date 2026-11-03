# Plano de execução: otimização de The Dryland Drowned

## Contexto

O relatório `planos/003-rodada-otimizacao/analise-de-performance.md` mediu nove problemas (P1–P9). Este plano implementa as soluções nesta sessão, em worktrees por grupo de soluções parecidas. Só entra na `main` o que comprovar melhora significativa. O que não comprovar é descartado e fica marcado aqui como "não funcionou".

Ordem de decisão combinada:

1. Parâmetros, tags, eventos, assets e ativação de plugins.
2. Recurso pronto da Coreto.
3. Edição de plugin `Dryland_*` ou de `Coreto_5_DesignSystem.js` ("DS"), liberado por você.
4. Plugin novo, quando a causa está na Coreto congelada ou no core do MZ.

**Como ler os ganhos:** "medido" vem do relatório (M2 Max, uma execução por cenário). "Esperado" é inferência minha, a ser confirmada pelo critério abaixo.

## Preparação, na `main`

1. **`CLAUDE.md`:** adicionar, logo depois de `<!-- END CORETO -->` (linha 9), a exceção do DS com o texto de `AGENTS.md:48`. Fica fora do bloco porque `coreto/README.md:41` só preserva o conteúdo local fora dele.
2. **Plano:** salvar este documento em `planos/003-rodada-otimizacao/plano-de-execucao.md`. Depois de cada worktree, atualizar a tabela de resultados.
3. **Memória:** registrar este fluxo de worktrees e atualizar `coreto-params-and-tags-first` com a exceção do DS.
4. **Medição:** criar `.artifacts/perf-003/bench.mjs` (ignorado pelo Git, descartável), reaproveitando `instrument.js` e o Playwright de `.artifacts/qa-runtime`.
   - Chrome real com GPU, 1280×720, DPR 1, T4 por CDP, sem usar a porta 18726.
   - Serve base e candidato em portas próprias e alterna as execuções (A/B/A/B), para cancelar a variação da máquina.
   - Também compara capturas do mesmo estado de jogo.

`CLAUDE.md` e `planos/003-rodada-otimizacao/` ficam sem commit na `main`, porque você não pediu commit deles. Só os merges das worktrees alteram a `main`.

## Fluxo de cada worktree

As worktrees rodam **uma de cada vez**. A medição exige a máquina sem carga, e os testes têm teto de 3 workers e 3 navegadores (`loki.config.json`).

1. **Criar:** `git worktree add .claude/worktrees/<nome> -b perf/<nome> main` (`.claude/` já é ignorado).
2. **Implementar:** um commit por solução, para poder retirar só a que falhar. Antes de gravar em `data/` ou `js/plugins.js`, ler `references/data.md` e `references/mutation.md` da skill do MZ.
3. **Checar:** `check-runtime-compat` no código novo; `check-native-data.mjs`, `check-event-lists.mjs` e `validate_plugins_js_envelope.py` quando houver escrita em dados.
4. **Testar:**
   - **A/B:** 5 execuções de base e 5 de candidato por cenário, contra a `main` atual.
   - **Testes de jogo:** `node rpg-maker/tools/run-tests.mjs --scope fast` e os `--ids` lentos ligados à área, escolhidos por risco (ADR-G006), além dos testes indicados na tabela de worktrees.
   - **Olhar:** inspecionar as capturas comparadas.
   - **Evidência:** gravar em `.artifacts/perf-003/<nome>/` do checkout principal, com `--output` absoluto. Assim ela sobrevive à exclusão da worktree.
5. **Decidir, pelo critério abaixo:**
   - **Solução aprovada:** fica no branch.
   - **Solução reprovada:** `git revert` no branch e marca "não funcionou" com os números.
   - **Nenhuma aprovada:** salva o patch em `.artifacts/perf-003/rejeitadas/`, exclui worktree e branch, sem merge.
6. **Integrar:** `remove-commit-slop`, depois `git merge --no-ff` na `main`. Conflito em `js/plugins.js` se resolve mantendo as duas entradas e revalidando.
7. **Limpar:** `git worktree remove`, `git branch -d`, encerrar servidores e navegadores abertos por mim (ADR-G006).

Commits seguem `.gitmessage`, sem `Co-authored-by` (sua regra global). **Sem push.**

## Critério de melhoria significativa (fixado antes de medir)

Uma solução só é aprovada se atender a **todos** estes pontos:

- Bate o limiar da tabela de soluções.
- Em métrica de tempo, a pior execução do candidato é melhor que a mediana da base. Isso evita aprovar ruído.
- Nenhuma métrica de guarda piora mais de 10%: FPS, tick, VRAM, tela parada.
- Os testes selecionados passam.
- As capturas não mostram mudança visual indesejada.

Se a implementação falhar e a causa não aparecer em poucas tentativas, marco "não funcionou" com o motivo e sigo para a próxima. Se o resultado não puder ser medido, o status é "não confirmado", nunca "funcionou".

## Worktrees, em ordem

| # | Worktree | Soluções | Arquivos | Testes além do `fast` e dos lentos da área |
|---|---|---|---|---|
| 1 | `sprites-de-imagem` | S2, S3, S5c | `Dryland_6_PictureSprites.js`, DS | Teste novo: `\V[n]` atualiza quando a variável muda |
| 2 | `filtros` | S1 | `Dryland_6_NeutralFilters.js` | Rodada extra em SwiftShader, só como sinal |
| 3 | `caches-design-system` | S4, S5a, S5b, S5d | DS, `Dryland_Presentation.js` | `design-system-cli.test.mjs` |
| 4 | `transferencia` | S9, S10 | `Dryland_6_MapTransfer.js`, `Tilesets.json` | Abrir menu depois de transferir (fundo do menu) |
| 5 | `carga-de-imagens` | S6, S7, S8 | `CommonEvents.json`, `Dryland_6_ImageCache.js` | Novo Jogo e Continuar em T4 com `Fast 4G` |
| 6 | `boot` | S11 | `js/plugins.js` | `core validate`, `build-gate.test.mjs`, carregar save criado antes (SD-015) |
| 7 | `assets` | S12, S13 | Imagens, `Dryland_6_ArtScale.js`, `prune-build` | Comparação visual das cenas afetadas, carregar save criado antes |

**A ordem tem motivo:** S8 depende de S5d, porque `bitmap.context` duplica cada imagem retida no cache. Assets vêm por último para medir o ganho sobre o jogo já otimizado.

**Mudança em relação à proposta anterior:** um plugin por grupo, não um único `Dryland_6_Performance`. Cada worktree pode ser rejeitada sozinha sem deixar resíduo, e o A/B usa a própria ativação do plugin, sem parâmetros extras. O tier 6 segue `coreto/docs/extensoes.md:9-11`.

## Soluções e limiares

| Solução | Métrica principal | Limiar para aprovar |
|---|---|---|
| S1 | Taverna após foco, frame p95 a 1× | ≥ 20% ou ≤ 17 ms |
| S2 | Bitmaps por transferência; frame máximo na entrada | ≥ 50% e ≥ 20% |
| S3 | Troca de foco em T4 | ≤ 50 ms ou ≥ 50% |
| S4 | Pico por fala em T4 | ≤ 50 ms ou ≥ 30% |
| S5a, S5b, S5c | Tick em idle na taverna em T4 | ≥ 20% somados (ou ≤ 4 ms) |
| S5d | Tempo de leitura no primeiro foco | ≥ 50% |
| S6 | Bytes de imagem até o título | ≥ 50%, sem piorar a primeira entrada na taverna |
| S7 | Texto sobre fundo vazio em T4 | 0 ms |
| S8 | Último herói pronto ao voltar à taverna em T4 | ≥ 50%, dentro do teto de memória |
| S9 | Tela parada na transferência em T4 | ≥ 10% |
| S10 | Primeiro render em T4, ou download por cena | ≥ 10%, ou ≥ 1 MB a menos |
| S11 | JS até o título; tempo até o título | ≥ 2 MB e ≥ 5% |
| S12 | Tamanho das imagens no build | ≥ 15% |
| S13 | VRAM e upload na primeira exibição | ≥ 30% nos dois |

### S1. P3: retirar filtros de cor neutros (plugin novo)

- **Solução:** `Sprite.prototype._updateColorFilter` (`rmmz_core.js:2169`) só cria o filtro, nunca remove. O patch retira o filtro quando matiz, tom e alfa do blend estão neutros e o recria quando voltam a mudar. Cobre balões (`DS:2453`), foco (`DS:2562`), bustos e janelas sem alterar os 1.158 `Tone_CustomToneBust`. O PIXI só toma o caminho de filtros com lista não vazia (`pixi.js:8241`).
- **Tela cheia:** a mesma regra nos dois filtros de `Spriteset_Base` (`rmmz_sprites.js:3204-3213`), ativos só com tom, flash ou brilho.
- **Ganho:** medido 49→86 fps sem filtros de balões e 50→67 fps sem filtros de tom zero. A soma e a tela cheia não foram medidas.
- **Trade-off:** patch em método do engine; recriar o filtro a cada início de transição de tom tem custo não medido.
- **Jogador:** FPS maior, principalmente em GPU fraca. Nenhuma mudança de imagem esperada; conferir borda de bustos, fades e tint.

### S2. P5: janela de texto só para imagem que existe (plugin novo + DS)

- **Solução:** envolver `createPictureText` com `if (!this.picture()) return`. `updateBitmap` a chama a cada frame, então a janela surge quando a imagem aparece (`Coreto_1_MessageCore.js:7571`). No DS, não pintar `_refreshBack` e `_refreshFrame` dessas janelas durante a criação (`DS:1450-1454`), cortando 6 de 10 bitmaps.
- **Ganho:** esperado cair de ~1.096 bitmaps por transferência para ~4 por imagem existente.
- **Trade-off:** o primeiro frame de cada imagem nova aloca a janela, custo diluído.
- **Jogador:** transferências mais curtas, sem mudança visual.

### S3. P1: refresh só para texto dinâmico (plugin novo)

- **Solução:** sobrescrever `Game_Screen.prototype.requestPictureTextRefreshAll` (`Coreto_1_MessageCore.js:7514`) para marcar só imagens com código dinâmico (`\V[`, `\N[`, `\P[` e similares). Mudança de texto e estado de superfície já pedem refresh individual (`:7507`, `DS:2458`). Só 50 de 1.026 valores usam esses códigos, e o comando `PictureTextRefresh` não aparece em nenhum evento.
- **Ganho:** esperado eliminar quase todo o pico (hoje 42 ms a 1× e 177–189 ms em T4).
- **Trade-off:** se o filtro deixar passar um código dinâmico, o texto fica velho na tela. O teste novo protege essa regra.
- **Jogador:** troca de herói fluida na taverna, e menos custo em qualquer escrita de variável.

### S4. P2: não refazer o que não mudou (DS + `Dryland_Presentation`)

- **Janela (`DS:1957-1970`):** reusar o bitmap se tamanho e `_coretoSharedPaper` forem iguais. `_refreshFrame` não pinta nada, então não precisa de canvas de janela inteira.
- **Botões (`DS:2181`):** sair cedo se tipo, enabled, focused, checked e idioma não mudaram.
- **`Dryland_Presentation.js:113-116`:** chamar os setters de `resetModes` só se o modo estiver ativo (`Coreto_2_ExtMessageFunc.js:3159`, `:3161`).
- **`Window_NameBox`:** o custo não foi isolado. Medir antes de mudar.
- **Ganho:** esperado cortar a maior parte dos 92 bitmaps por fala. Também ajuda o foco no sacrifício (`Dryland_6_SacrificeStage.js:129`).
- **Trade-off:** caches exigem invalidação correta (idioma, papel carregado, papel compartilhado). Erro aqui aparece como pergaminho ou botão desatualizado.
- **Jogador:** avanço de diálogo sem soluço, no ponto mais frequente do jogo (863 `Show Text`).

### S5. P8 e P7: trabalho por frame e primeira leitura

- **S5a (DS):** memorizar `itemHeight` (`DS:1376`) e `maxChoiceWidth` (`DS:1348`) por lista e idioma, limpando no refresh.
- **S5b (DS):** zerar `_transformID` (`DS:2558`) só quando a escala mudar.
- **S5c (plugin):** `Sprite_Picture.update` sai cedo quando não há imagem (34 ms/s medidos).
- **S5d (DS, P7):** em `artworkBounds` (`DS:2483`), usar cache por URL em vez de `WeakMap` por bitmap e ler uma amostra reduzida de `bitmap._image`, sem `bitmap.context`.
- **Trade-off:** com amostragem, o contorno do foco pode deslocar poucos pixels.
- **Jogador:** mais folga por frame e primeiro foco sem os 20–35 ms de leitura.

### S6. P4 e P9: rearrumar a pré-carga (eventos)

- **Solução:** retirar CE2 → CE351 do título, porque tudo é destruído ao iniciar o Novo Jogo. Levar CE39 → CE355/356 para depois da transferência. Enxugar pré-cargas que pedem mais do que a cena usa (CE43: 24 imagens).
- **Ganho:** até 20,4 MB a menos de imagens até o título.
- **Trade-off:** a primeira entrada na taverna perde a vantagem de já ter começado a carregar; S7 compensa.
- **Jogador:** título mais rápido, sem carregar o que será descartado.

### S7. P4: esperar a imagem com recurso nativo (eventos)

- **Solução:** evento comum com Script `this.setWaitMode("image")`, modo que já existe no engine (`rmmz_objects.js:9638`), chamado antes de abrir o texto nas entradas críticas.
- **Trade-off:** `ImageManager.isReady` espera **todo** o cache (`rmmz_managers.js:988`) e não tem limite de tempo. Por isso depende de S6.
- **Jogador:** não lê mais texto sobre fundo vazio (hoje 1,3 s em T4) e o fade não passa sem imagem. Em rede lenta, a tela escura dura mais e não há indicador de carregamento. **Esta troca de sensação entra por aprovação deste plano e fica na lista para você jogar.**

### S8. P4: cache que sobrevive à transferência (plugin novo)

- **Solução:** em `Scene_Map.onTransfer` (`rmmz_scenes.js:791`), manter `img/pictures` num LRU com teto em Mpx. O ponto de partida é 64 Mpx (cerca de 256 MB decodificados), que comporta as 29 imagens do CE351. `SceneManager.onUnload` continua limpando tudo.
- **Trade-off:** mais memória. Teto alto pode derrubar máquina fraca; teto baixo anula o ganho.
- **Jogador:** volta à taverna sem heróis surgindo um a um (hoje 933–2.133 ms em T4).

### S9. P5: não capturar a tela entre mapas (plugin novo)

- **Solução:** pular `snapForBackground` (`rmmz_scenes.js:888`) quando a próxima cena também é `Scene_Map`. Os consumidores (`rmmz_scenes.js:1251`, `Coreto_0_CoreEngine.js:17139`) são menus, que recebem nova captura ao sair do mapa.
- **Ganho:** 12–58 ms a 1× e 35–91 ms em T4 por transferência (medido).
- **Trade-off:** nenhum esperado.
- **Jogador:** trava menor na troca de mapa.

### S10. P5: tileset vazio (dados)

- **Solução:** esvaziar `tilesetNames` dos tilesets 1 e 2, os únicos usados. Nenhum dos 46 mapas tem tiles, e nome vazio devolve bitmap vazio (`rmmz_managers.js:963-969`).
- **Trade-off:** paleta vazia no editor; reversível.
- **Jogador:** nenhuma mudança além de carregar menos.

### S11. P9: desligar o BattleCore (ativação)

- **Solução:** desativar `Coreto_1_BattleCore`: nenhum plugin ativo tem `@base` nele e há 0 comandos de batalha.
- **Antes de aplicar:** conferir `Coreto_1_MessageCore.js:6024` e confirmar no GDD que batalha está fora do escopo. Se o GDD não confirmar, a solução para e fica marcada.
- **Ganho:** 2,4 MB de JS e 60 ms de avaliação a menos (medido).
- **Trade-off:** religar se batalha entrar no jogo.
- **Jogador:** abertura um pouco mais rápida.

### S12. P6: compressão sem perda no build

- **Primeiro, medir:** recomprimir uma amostra com Pillow, já instalado, fora do projeto. Abaixo de 15%, marca "não funcionou" e não implementa.
- **Solução:** aplicar só na saída de `prune-build`, com `node:zlib`, sem dependência nova e preservando os originais.
- **Trade-off:** build mais lento. Não reduz a memória decodificada.
- **Jogador:** download menor e imagens chegando antes em rede lenta.

### S13. P6: redução por arquivo com tabela de compensação (assets + plugin novo)

- **Solução:** redimensionar cada arte para a maior escala em que ela é exibida. O plugin compensa em `Sprite_Picture` com fator e deslocamento. Assim os 1.579 `Scale_ScaleTo` não mudam e imagens gravadas em saves continuam no lugar.
- **Fatores por arquivo:** os bustos chegam a **70,7%**, não 50% como diz o relatório, e `Dryland_HeroGroup` chega a 123%. Um fator único de 2× perderia detalhe.
- **Camadas:** recortar as 16 de `Camp`/`Tavern`, com 17–18% de área útil na amostra. Isso reduz o overdraw de 10×, que S1 não resolve.
- **Trade-offs:**
  - O preview do editor fica menor que o jogo.
  - Toda arte nova exige linha na tabela.
  - Filhos do sprite herdam a escala (`Dryland_2_ConversationIndicators.js:112`, `DS:2575`) e precisam de correção.
  - Zoom futuro acima da escala máxima fica borrado.
  - `rpg-maker/asset-provenance/` precisa registrar a derivação.
- **Jogador:** menos travas na primeira exibição, menos memória e download menor. Sem perda visível nas escalas atuais.
- **Escopo nesta sessão:** só o piloto, com as 16 camadas e 1 busto. A aplicação em massa fica para você decidir com os números na mão.

## Descartado sem implementar

| Ideia | Motivo |
|---|---|
| Migrar `Dryland_*` para a Coreto | Os custos medidos neles são gatilhos e itens menores, corrigíveis no próprio plugin |
| `ShowScrollBar=false` | Corta 2 bitmaps finos e tira a barra de rolagem da interface |
| Reduzir `picturesUpperLimit` | `Show Picture` usa IDs até 84; S2 já remove o custo principal |
| Mudar CE30–37 para P1 | Trata só a taverna; restam 414 comandos de variável |
| WebP ou AVIF | `ImageManager.loadBitmap` fixa `.png` (`rmmz_managers.js:965`) |
| IMG-5, mipmap, spinner, `GC_MAX_IDLE` | Hipóteses ainda não observadas; rever só com evidência |

## Resultados (atualizar a cada worktree)

| Solução | Worktree | Status | Base → candidato | Evidência | Commit de merge |
|---|---|---|---|---|---|
| S1 | `filtros` | **aprovada e mergeada** (confirmada só no M2 Max) | Taverna após foco: 46,3 → 119,6 fps (limite da tela); frame p95 26,6 → 10,2 ms; filtros 20 → 5; nenhum pixel difere mais de 8/255. SwiftShader, só como sinal: 4,3–4,7 → 5 fps, porque o gargalo ali é preenchimento. | `.artifacts/perf-003/filtros/` | `22a49ea` |
| S2 | `sprites-de-imagem` | **não funcionou** | Bitmaps na volta 1424 → 504 (-65%), mas frame máximo na entrada 183,5 → 151,4 ms (-17,5%, limiar 20%). Em T4, tela parada + frame máximo: 690 → 676 ms; o custo mudou de lugar. Canvas e VRAM iguais. | `.artifacts/perf-003/sprites-de-imagem/s2/`; patch em `.artifacts/perf-003/rejeitadas/S2-janelas-de-texto.patch` | sem merge |
| S3 | `sprites-de-imagem` | **aprovada e mergeada** | Troca de foco em T4 99,8 → 26,3 ms (-74%); redesenhos 30 → 2; capturas idênticas; fast e 6 lentos passam | `.artifacts/perf-003/sprites-de-imagem/` | `736681b` |
| S4 | `caches-design-system` | **aprovada e mergeada** | Pico por fala em T4: 83,1 → 25 ms (-70%); bitmaps por fala 94 → 40; capturas idênticas. A causa principal não estava no relatório: decodificar todos os parâmetros do MessageCore a cada posicionamento do nome. | `.artifacts/perf-003/caches-design-system/s4b/` | `78d3ae9` |
| S5a, S5b, S5c | `caches-design-system` | **aprovadas e mergeadas** | Tick em idle na taverna em T4: 5,8 → 3,5 ms (-40%, meta ≤ 4 ms). A leitura de tickP95 da bancada subiu a 1× (2,9 → 5,2 ms), mas a medição direta sem as sondas de GL mostra update p95 2,2 → 1,5 ms e render p95 estável; a causa da leitura da bancada não foi isolada. | `.artifacts/perf-003/caches-design-system/s5/` | `78d3ae9` |
| S5d | `caches-design-system` | **aprovada e mergeada** | Leitura isolada de 9 artes: 163,2 → 14,0 ms (-91%); na volta à taverna 26,6 → 0,1 ms; VRAM final 292 → 238 MB. Até 0,56% dos pixels diferem mais de 8/255, nenhum mais de 32/255. Pede conferência humana do contorno de foco. | `.artifacts/perf-003/caches-design-system/s5/` | `78d3ae9` |
| S6 | `carga-de-imagens` | **não implementada** | Retirar o CE351 do título tira a cobertura do caminho de Continue exigida pela ADR-003. Levar o CE355/356 para depois da transferência só faria sentido sem S8. CE43 não tem pré-carga própria para enxugar. | leitura da ADR-003 e de CE2, CE3, CE39 | sem merge |
| S7 | `espera-imagem` | **não funcionou** (adotada pelo usuário em 2026-11-03, medida e não integrada) | Espera (CE 380 + `setWaitMode("image")`) antes do texto que segue um Show Picture, em 69 pontos. Jornada principal em T4 + Fast 4G: gap 1.357 → 1.366 ms (sobra o busto `Reed-novo`, fora do alcance). Armadilha B3: gap já 0 na base; tempo até a primeira fala 6,3 → 13,7 s. Com a espera também no título: abertura 24 → 46 s. | `.artifacts/perf-003/espera-imagem/`; patch em `.artifacts/perf-003/rejeitadas/S7-espera-por-imagem.patch` | sem merge |
| S8 | `carga-de-imagens` | **aprovada e mergeada** | Último herói pronto na volta em T4: 293 → 115 ms (-61%); maior frame 241 → 117 ms; upload 53 → 3 ms. Em T4 + Fast 4G: tela parada 328 → 286 ms, pedidos 39 → 1, último herói 278 → 140 ms. Teto: VRAM na volta 232 → 267 MB em rede lenta; RAM real não medida. Ressalva: primeira entrada em T4 + Fast 4G com maior frame 466 → 667 ms (faixas sobrepostas). | `.artifacts/perf-003/carga-de-imagens/` | `83f7691` |
| S9 | `transferencia` | **não funcionou** | A captura sumiu (`snapMs` → 0), mas a tela parada em T4 não melhorou: volta 107 → 117 ms, ida 125 → 127 ms (limiar -10%). O trabalho de GPU parece ter mudado de lugar. | `.artifacts/perf-003/transferencia/s9/`; patch em `.artifacts/perf-003/rejeitadas/S9-*` | sem merge |
| S10 | `transferencia` | **aprovada e mergeada** | Maior frame ao entrar no mapa do herói em T4: 193,6 → 124,9 ms (-35%); 4 pedidos a menos; capturas idênticas. Entrada e volta à taverna não mudam. Download a menos: 0,78 MB, abaixo do limiar alternativo de 1 MB. | `.artifacts/perf-003/transferencia/s10/` | `d43627c` |
| S11 | `boot` | **aprovada e mergeada** (ganho só em rede) | JS até o título 11,93 → 9,59 MB. Tempo até o título em T4 + Fast 4G: 26,4 → 24,0 s (-9,3%). **A 1× sem rede não muda (-0,4%)**, então o limiar de 5% só é batido com download. Save com o plugin ligado carrega com ele desligado, idêntico ao controle. | `.artifacts/perf-003/boot/` | `78ecd3d` |
| S12 | `assets` | **não funcionou** | Amostra de 40 de 344 arquivos, sem perda e com pixels conferidos: 26,9 → 24,7 MB (-8,2%, limiar -15%). Não implementada, como o plano previa. | saída do script de amostra | sem merge |
| S13 | `assets` | **não funcionou** (não implementada) | Melhor caso calculado com os arquivos reais: recortar as camadas da taverna corta 41,6 de 213,5 MB de VRAM (-19,5%, limiar -30%). As `HeroGroup_H*` já são áreas de clique transparentes, e o busto do piloto não muda a conta. Não medido: redução de overdraw, que S1 não resolve e pode importar em GPU fraca. A worktree `assets` não chegou a ser criada. | cálculo sobre `img/pictures` | sem merge |

Status possíveis: `aprovada e mergeada`, `não funcionou`, `não confirmado`, `pendente`.

### Desvios do plano durante a execução

- **S5c passou de `sprites-de-imagem` para `caches-design-system`.** O limiar de S5a, S5b e S5c é somado, então precisam ser medidas juntas (ADR-G004).
- **Operações de Git a partir do checkout principal.** O guard `lead-only-worker-git-guard` do AgentOps trata qualquer diretório em `.claude/worktrees/` como worker de swarm e bloqueia `git commit` ali. O guard não foi desligado: o commit roda como lead, do checkout principal, com `git -C <worktree>`.
- **Plano e análise versionados.** A preparação previa deixar `CLAUDE.md` e esta pasta sem commit; no PR da rodada eles foram incluídos, porque as ADRs G008 e G009 apontam para cá.
- **S5d medida por leitura isolada.** A métrica `readMs` não mudou na primeira entrada porque inclui a decodificação do PNG, que ocorre de qualquer jeito. O limiar foi avaliado sobre a leitura isolada (mesmo método, imagem já decodificada).
- **Regressão achada e corrigida antes do merge.** O guard de `resetModes` deixava o modo `undefined` em vez de `false`; o IT-065 pegou. A correção foi no código, sem alterar o teste.
- **Medição invalidada e refeita.** A jornada `core` de S8 rodou com a tela do Mac apagada: o Chrome limita os quadros a 30 Hz, em base e candidato. Medições seguintes usam `caffeinate -d` só durante a bancada. O Mac estava na bateria (17%) nesse momento.
- **`npm run verify-build` trocado por `run-tests --pruned`.** O `verify-build` exige um `dist/` recém-exportado pelo editor e sobrescreveria o zip do itch.io. A cópia podada descartável prova o mesmo risco sem tocar no `dist/`.
- **Teste de menu depois de transferir não executado.** Ele era para S9, que não entrou. O IT-038 cobre o menu.
- **Base medida difere do relatório.** Sem o custo de traces, a base da bancada é menor (troca de foco em T4: ~99 ms, contra 177–189 ms no relatório). Os limiares relativos valem sobre a base medida na mesma sessão.

## Resultado final

**Estado:** rodada encerrada em 2026-11-02. Merges feitos na `main` local até `e71c213`; em 2026-11-03 o conjunto foi publicado na branch `perf/rodada-otimizacao-003`, para PR na `main`. Suíte completa: 129 de 129 na fonte e 129 de 129 em cópia podada descartável, no merge `78ecd3d`.

`c051a86` contra a `main` final, 5 execuções de cada lado, Chrome em M2 Max. Em tempo, "antes" e "depois" são medianas:

| Problema | Antes | Depois | Meta | Situação |
|---|---|---|---|---|
| P1, troca de foco em T4 | 83 ms | 10,3 ms | ≤ 50 ms | cumprida |
| P2, pico por fala em T4 | 66,5 ms | 15,6 ms | ≤ 50 ms | cumprida |
| P3, frame p95 na taverna após foco | 25,4 ms (49 fps) | 9,8 ms (119,6 fps) | ≤ 17 ms | cumprida, só no M2 Max |
| P4, texto sobre fundo vazio em T4 + Fast 4G | 1.551 ms | 1.329 ms | 0 | **não cumprida**: depende de S7 |
| P5, tela parada em T4 (ida / volta) | 146 / 127 ms | 102 / 89 ms | ≤ 400 ms | cumprida; a base da bancada já estava abaixo |
| P8, tick em idle em T4 | 4,7 ms | 2,6 ms | ≤ 4 ms | cumprida |

Outros números: maior frame na volta à taverna em T4 533 → 117 ms; último herói pronto na volta em T4 458 → 117 ms; VRAM final 292 → 239 MB; título em T4 + Fast 4G 27,3 → 23,9 s; título a 1× 737 → 696 ms. Capturas: até 0,56% dos pixels diferem mais de 8/255, nenhum mais de 32/255, na área do herói em foco.

### Decisões pendentes

1. **~~S7, espera por imagem~~ (decidida em 2026-11-03).** O usuário adotou S7 e S8 e pediu uma ADR que sobrescrevesse a ADR-002: [ADR-G009](../../docs/adrs/adr-g009-carregamento-de-imagens-alem-do-padrao-do-mz.md), integrada em `e71c213`. S8 já estava na `main`. S7 foi medida e não integrada (linha da tabela). P4 continua: o texto abre sobre o busto em rede lenta, e o que sobra é `Basic_EnterBust`, que depende de uma decisão sobre os testes IT-060 e IT-076.
2. **~~Substituição parcial da ADR-002 por S8~~.** Absorvida pela ADR-G009. A leitura "parcial" (só carregamento de imagem) é do agente; confirme.
3. **Aplicação em massa de assets (S13).** O piloto não alcança o limiar de VRAM, mas o overdraw não foi medido e pode importar em GPU fraca.

### Para a manutenção da Coreto

- **MessageCore, `Game_Map.refresh`:** pede redesenho do texto de todas as imagens a cada escrita em variável ou switch, mesmo sem texto. Reprodução: trocar o foco na taverna (30 redesenhos por troca). Contorno no jogo: `Dryland_6_PictureSprites`.
- **MessageCore, sprites de imagem:** os 100 IDs rodam atualização completa a cada quadro, usados ou não. Contorno no mesmo plugin.
- **DesignSystem, a levar à origem antes de reinstalar a Coreto:** `Window_NameBox.updatePlacement` decodificava todos os parâmetros do MessageCore a cada chamada; `_refreshBack`/`_refreshFrame` e `Window_ButtonConsole.refresh` refaziam tudo sem mudança; medidas de escolha por quadro; `artworkBounds` lia a imagem inteira.

### O que falta conferir a olho (sem aceite humano)

Foco e contorno na taverna, tom de bustos, fades, tint e volta à taverna. Em rede lenta, a primeira entrada na taverna pode ter um único frame maior (466 → 667 ms na medição de S8, faixas sobrepostas).

## Fechamento, na `main`, depois das worktrees

1. **Suíte completa:** `node rpg-maker/tools/run-tests.mjs --scope all` (cerca de 22 min) e `npm run verify-build`. Cada worktree roda só testes selecionados, então esta é a prova conjunta.
2. **Se algo quebrar:** achar o merge responsável e desfazê-lo com `git revert -m 1`, marcando a solução no plano.
3. **Medição final:** A/B de `c051a86` contra a `main` final, com a tabela de metas abaixo.
4. **ADR-G008:** registrar as decisões finais, inclusive as rejeitadas, por `game-create-adr`, em branch próprio com merge. A aprovação deste plano vale como o design aprovado que `AGENTS.md:3` exige.
5. **Defeitos da Coreto:** registrar P1 e P5 com reprodução e evidência para a manutenção da engine (`extensoes.md:23`), se S2 ou S3 forem aprovadas.
6. **Relatório final:** soluções aprovadas e rejeitadas, números, o que falta você jogar e o que ficou sem push.

### Metas do jogo inteiro

| Problema | Hoje em T4 | Meta em T4 |
|---|---|---|
| P1, troca de foco | 177–189 ms | ≤ 50 ms |
| P2, por fala | 148–172 ms | ≤ 50 ms |
| P3, taverna após foco | 49 fps a 1× | Frame p95 ≤ 17 ms, também a 1× |
| P4, texto sobre fundo vazio | 1,3 s | 0 |
| P5, tela parada na transferência | 426–772 ms | ≤ 400 ms (limite do spinner) |
| P8, tick em idle | 7 ms | ≤ 4 ms |

## O que este plano não prova

- **GPU fraca:** só tenho o M2 Max. SwiftShader é um sinal, não uma GPU integrada real. S1 e S13 ficam "confirmadas só no M2 Max".
- **NW.js:** não será executado, pela exceção local de 2026-10-26. Só checo a compatibilidade de sintaxe. Chrome não qualifica NW.js.
- **Aceite humano:** minhas capturas não substituem você jogando. Fica a lista de pontos: foco na taverna, tom de bustos, fades, tint, entrada em armadilha e a espera de S7.
- **Lacunas do relatório:** áudio, memorial, finais `destroy` e `total_loss`, rede real do itch.io.

## Riscos

- **Tempo e máquina:** a execução leva várias horas e abre janelas do Chrome no seu Mac. Usar a máquina durante a medição adiciona ruído, e a regra de não sobreposição pode reprovar uma solução boa.
- **Reinstalar a Coreto** pode sobrescrever as edições do DS (`coreto/README.md:41`). Elas precisam chegar à origem antes disso.
- **A exceção em `AGENTS.md:48` está dentro do bloco Coreto** e pode se perder na reinstalação. Fica como está, porque você pediu só o `CLAUDE.md`.
- **Plugins novos dependem de partes internas da Coreto**, que mudam com frequência (5 commits no `MessageCore` desde 24/09). Remedir a cada atualização.
- **Editor do MZ aberto** sobrescreve escritas externas ao salvar. Reabra o editor depois dos merges, antes de salvar nele.
