# Direção sonora pós-armadilha

Status: 31 masters WAV fornecidos pelo usuário em `sons/`, convertidos para OGG na implementação de 2026-10-29. Integração implementada em `feat/002-juicy-morte-heroi`; avaliação audível e aceite de mixagem permanecem pendentes. Sons de ambientação já fornecidos não estão duplicados neste catálogo.

## Regras comuns de produção

Entregar cada nome abaixo em OGG, com master WAV opcional de mesmo basename. Efeitos pontuais, sem loop, música, fala inteligível, gritos, silêncio inicial longo ou reverb cortado. Ataque imediato; não normalizar todos para máxima intensidade. Preservar margem de pico e ausência de clipping. Som mono central é o padrão; profundidade vem de distância e reverberação discretas, sem exigir fones.

Duração padrão: 0,6–1,2 s; impactos/desabamentos podem chegar a 1,8 s incluindo cauda. O acontecimento principal começa nos primeiros 100 ms. Os poucos detalhes internos pertencem ao mesmo acontecimento, não antecipam a próxima caixa. Não incluir um segundo acontecimento mencionado depois da primeira ação textual. Fontes orgânicas podem ser evocadas por materiais, sem gore explícito.

Integração futura: copiar os OGG aprovados para `audio/se/`; Reproduzir SE usa basename sem extensão, pitch 100, pan 0, volume inicial 65 (escala MZ 0–100), ajustável após escuta. Esse volume não foi validado. `05-opressivo` continua como ambiente; sua mixagem/loop ainda precisa de avaliação. Não somar o ambiente aos arquivos gerados. Respeitar volume/mudo do jogador.

Política de leitura rápida: ao entrar em uma caixa com novo cue, encerrar o SE anterior da sequência antes de disparar o próximo (Stop SE 251 interrompe todos os SE: usar apenas no trecho isolado sem outros SE concorrentes). Caixas sem cue deixam a cauda curta terminar. Na saída do trecho, encerrar SE e ambientação para não vazarem. Não esperar o fim do efeito para liberar avanço. Se a implementação existente possuir sons de interface concorrentes, resolver sua propriedade antes de usar Stop SE global; não cortar áudio de outro sistema silenciosamente.

Todos os cues abaixo disparam na entrada da caixa indicada, depois de eventual fade/Wait definido no roteiro. Não há cues dentro da caixa. Para o golpe final A3: avanço da caixa 8 → fade vítima 60 → Wait 60 → SE → caixa 9. Para as demais cenas, essa sequência vale antes da última caixa, com ou sem cue.

## Catálogo de arquivos


### `sfx_a1_garrafas.ogg`

- **Uso:** A1, entrada da caixa 01. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Várias garrafas pequenas de vidro rompem quase juntas; estalos secos próximos, fragmentos finos caindo em pedra, rajada curta atravessando o conjunto. Sem explosão de pólvora.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_a1_janela.ogg`

- **Uso:** A1, entrada da caixa 03. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Madeira de janela antiga sob pressão crescente: rangido áspero curto, ferragem vibrando e corrente de ar próxima. Não incluir fechamento.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_a1_fecho.ogg`

- **Uso:** A1, entrada da caixa 05. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Uma única pancada pesada de folha de madeira na moldura, seguida de dois pequenos cacos caindo. Rajada breve se afastando, sem grito.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_a2_queda.ogg`

- **Uso:** A2, entrada da caixa 01. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Fibras vegetais tensionam e rompem, seguidas de queda pesada de árvore em terra; galhos secos quebram. Sem sequência longa de quedas.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_a2_pressao.ogg`

- **Uso:** A2, entrada da caixa 03. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Casca grossa esmagando e fibras de tronco estalando sob carga, próximas, com grave discreto. Sem impacto final.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_a2_impacto.ogg`

- **Uso:** A2, entrada da caixa 05. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Tronco pesado atinge estacas de madeira: golpe grave abafado, lascas secas e curta acomodação na terra. Sem gore explícito.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 1,0–1,8 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_a3_parafuso_trilho.ogg`

- **Uso:** A3, entrada da caixa 01. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Parafuso de ferro cai em pedra e rola brevemente; logo depois, fixação metálica rompe com estalo áspero. Ambos pertencem à mesma ruptura imediata, sem pausa dramática longa.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_a3_chao.ogg`

- **Uso:** A3, entrada da caixa 02. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Bloco muito pesado golpeia piso de pedra; ataque grave, lascas e pedrinhas dispersas, reverberação curta de recinto fechado. Sem estrondo musical.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 1,0–1,8 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_a3_golpe_pilao.ogg`

- **Uso:** A3, entrada da caixa 09. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Um golpe único de enorme massa contra pilão de madeira: grave seco, fibras comprimidas e breve vibração estrutural. Não incluir tentativas posteriores de subir, pois dependem da leitura.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 1,0–1,8 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_a4_barras.ogg`

- **Uso:** A4, entrada da caixa 01. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Barras grossas de ferro deslizam sob força mecânica, raspagem curta grave e pequenos choques metálicos. Sem fechamento final.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_a4_fecho.ogg`

- **Uso:** A4, entrada da caixa 05. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Fechamento de jaula com golpe de metal maciço abafado e breve vibração das barras. Sem efeitos corporais explícitos.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_a5_fogo.ogg`

- **Uso:** A5, entrada da caixa 01. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Arranque curto de cascos em pedra seguido de sopro de chama envolvendo um corredor, sem relincho ou música.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_a5_cano.ogg`

- **Uso:** A5, entrada da caixa 04. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Cano de água esvaziando: duas golfadas curtas, ar preso e últimos pingos metálicos. Sem fluxo contínuo ou fogo embutido.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_a5_chamas.ogg`

- **Uso:** A5, entrada da caixa 05. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Uma expansão rápida de labaredas, sopro grave e crepitação curta, aproximando e decaindo. Sem gritos.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_a6_raizes.ogg`

- **Uso:** A6, entrada da caixa 01. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Raízes grossas friccionando terra úmida e fibras vegetais sob tensão; movimento curto próximo, sem serpentes ou animais.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_a6_madeira.ogg`

- **Uso:** A6, entrada da caixa 05. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Fibras de madeira se acomodando e casca fechando com estalidos pequenos, secos, íntimos. Sem golpe ou queda.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_a7_ganchos.ogg`

- **Uso:** A7, entrada da caixa 01. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Corrente de ferro puxada abruptamente, ganchos batendo e sacaria grossa roçando, em recinto curto.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_a7_prensa.ogg`

- **Uso:** A7, entrada da caixa 05. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Prensa mecânica fecha com único golpe grave, ferro curto e tecido comprimido. Sem líquido ou som de ossos.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 1,0–1,8 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_a8_telhas.ogg`

- **Uso:** A8, entrada da caixa 01. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Estalo de viga antiga seguido imediatamente de duas telhas quebrando em pedra, próximo, sem desabamento completo.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_a8_desabamento.ogg`

- **Uso:** A8, entrada da caixa 05. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Desabamento compacto de vigas e telhas, massa grave e cascata curta de cerâmica, cauda de detritos pequenos. Sem explosão.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 1,0–1,8 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_b1_assobio.ogg`

- **Uso:** B1, entrada da caixa 01. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Assobio humano distante, fino e soprado, nota instável curta refletida em casa vazia. Sem melodia reconhecível ou palavras.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_b2_velas.ogg`

- **Uso:** B2, entrada da caixa 01. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Sopro curto coletivo apagando chamas pequenas, íntimo e seco, com leve deslocamento de ar; sem música.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_b2_passos.ogg`

- **Uso:** B2, entrada da caixa 04. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Poucos passos lentos de grupo distante sobre terra, cadência irregular humana, afastando-se. Sem marcha musical, vozes ou loop.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_b4_raizes.ogg`

- **Uso:** B4, entrada da caixa 01. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Raízes arrastam terra e folhas secas em movimento lateral curto; floresta próxima, sem vozes incorporadas.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_b4_fecho.ogg`

- **Uso:** B4, entrada da caixa 05. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Madeira viva sob pressão com folhas comprimidas, aproximação curta e fechamento abafado, sem porta mecânica.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_b5_vidro.ogg`

- **Uso:** B5, entrada da caixa 01. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Ressonância fina de vidro tocado e flexionado de modo impossível, curta, sem estilhaçar; timbre físico, não acorde musical.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_b5_selo.ogg`

- **Uso:** B5, entrada da caixa 05. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Pequeno estalo vítreo limpo seguido de ressonância breve que se extingue, sem quebra ou impacto violento.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_b7_tecido.ogg`

- **Uso:** B7, entrada da caixa 01. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Grande pano pesado despenca muito perto e se estende com fricção abafada, sem impacto sólido.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_b7_rasgo.ogg`

- **Uso:** B7, entrada da caixa 05. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Rasgo único de tecido grosso, fibras separando perto do ouvido, seguido de breve fricção abafada. Sem zíper ou couro.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_b8_portas.ogg`

- **Uso:** B8, entrada da caixa 01. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Portas de madeira abrindo quase juntas, dobradiças tensas e deslocamento grave da estrutura; sem rugido de criatura.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


### `sfx_b8_boca.ogg`

- **Uso:** B8, entrada da caixa 05. Execução única; exclusivo deste cue nesta versão.
- **Intenção:** tornar física a primeira ação da caixa, sem anunciar eventos posteriores.
- **Descrição para geração:** Fechamento pesado e abafado, madeira comprimindo com grave orgânico discreto; sem mastigação, grito ou explosão.
- **Perspectiva:** próxima ao ponto de escuta de Ivaí, ambiente coerente com a cena; reverberação curta e natural, sem cauda cinematográfica longa.
- **Envelope e duração:** 0,6–1,2 s; ataque imediato, corpo reconhecível, decaimento natural curto. Impactos devem ter peso sem volume agressivo.
- **Excluir:** vozes, música, sustos sintéticos, acontecimentos seguintes e silêncio inicial. Não sintetizar o nome do herói.
- **Mixagem e avanço rápido:** volume inicial 65, pitch 100, pan 0; aplicar política comum de interrupção. Reavaliar volume junto de `05-opressivo`.


## Sons apenas literários e revisão

B3 e B6 não solicitam arquivos novos. O canto de B6, a fala/eco de B1, cobranças de B4 e chamados de B8 ficam no texto. Não inserir voz genérica que conflite com identidade ou nome. Rangidos, respirações e arrastos sem cue também não geram tarefas de áudio implícitas.

Validar por escuta início sem atraso, material reconhecível, ausência de clipping, relação com ambiente e caudas com avanço rápido. Revisar também leitura lenta, mudo, HIDE/retorno e saída de cena. Nada disso foi testado nesta entrega documental. Um vídeo futuro deve mostrar A3 da seleção ao golpe, com avanço lento e rápido, sem antecipação sonora.
