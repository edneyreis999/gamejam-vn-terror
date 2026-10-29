# Coreto — tema para The Dryland Drowned

## Estado atual — última atualização desfeita em 17/10/2026

A pedido do usuário, foi restaurada a versão imediatamente anterior ao segundo
refinamento de 17/10. Tema e CE46 correspondem ao backup `20261017-120425-268`;
Map045 corresponde ao backup `20261017-121242-980`, anterior à mudança de espera.
O asset de fundo preto foi retirado do jogo. O instalador não reaplica o segundo
refinamento. Opções, saves, fontes, hover anterior, contraste do prólogo e posições
de Party/releitura permanecem. Saves e regras não foram alterados.

As notas sobre o segundo refinamento abaixo são históricas e não descrevem a
versão ativa. O Figma não foi alterado nesta reversão solicitada apenas no jogo.
Conferência: comparação dos arquivos restaurados com os backups, sintaxe JS e
integridade dos demais assets do recibo. Não houve novo playtest nesta reversão.
Registro: `evidence/rollback-last-update.json`. Para demonstração, permanecem as
capturas anteriores `refinement-static-card-final.png` e `refinement-encounter.png`.

Implementado e instalado em 17/10/2026 no projeto RPG Maker MZ 1.10.0:
`C:\projetos\gamejam-vn-terror\rpg-maker\The Dryland Drowned`.

O especialista `Dryland_5_CoretoTheme.js` está ativo, no fim de `js/plugins.js`.
Os bundles Coreto e o código da engine não foram editados. O refinamento de menus
altera somente oito callbacks de desenho nas configurações existentes de
OptionsCore e SaveCore, além do especialista visual já instalado. Ordem, ativação,
callbacks de entrada e persistência permanecem iguais. Languages.tsv e regras de
campanha não foram alterados. A autoria nativa mantém as posições de Party e
releitura. As alterações posteriores de fundo e espera foram desfeitas.

## Usar agora

1. Reabra `game.rmmzproject` no editor **antes de salvar**, para carregar o registro atualizado.
2. Reinicie o playtest. O tema é aplicado automaticamente.
3. Em Gerenciador de plugins → `Dryland_5_CoretoTheme`, ajuste tamanho de diálogo,
   tamanho das escolhas e margem lateral, se necessário.
4. Para voltar à aparência anterior, desative esse plugin e reinicie o jogo.

O instalador `Install-CoretoTheme.ps1` também permite reinstalar em outra cópia
do mesmo jogo. Ele verifica as dependências ativas, copia apenas os arquivos do
tema, faz backup e acrescenta uma única entrada ao registro. Uma entrada já
existente é preservada, inclusive seus parâmetros e estado de ativação.
`Configure-CoretoMenus.cjs` conecta os oito callbacks visuais aos desenhos do tema;
mantém o desenho original como fallback quando o tema estiver desativado.
O instalador usa o Node já utilizado pelo projeto.

```powershell
& .\Install-CoretoTheme.ps1 -Project 'C:\caminho\The Dryland Drowned'
```

Não há build nem dependência web em runtime. `installation.json` registra caminhos,
hashes e a pasta do backup. `backups/` fica neste pacote, fora do jogo.

## Componentes implementados

Fonte: [biblioteca editável do Figma](https://www.figma.com/design/mST7JediMzHTA4IkE2skw8/design-system-coreto?node-id=89-71).

| Componente | Integração |
| --- | --- |
| Menu | Título dirigido por eventos, comandos nativos, estado selecionado/pressionado/indisponível e foco dourado. |
| Diálogo | Papel claro, borda dupla, raio de 10 px, nome em Averia Libre na tinta #360A0B, texto Outfit e indicador exportado do Figma. |
| Escolhas | Seleção roxa, marcador dourado, quebra visual de rótulos longos, altura uniforme suficiente para o maior rótulo; IDs e callbacks nativos preservados. |
| Configurações e listas | Superfícies claras, tipografia Outfit e contraste do item selecionado, preservando controles do OptionsCore. |
| Opções | Categorias com ícones vetoriais, seletores de idioma/efeitos, barras de volume, estados com contraste e ajuda de teclado localizada. |
| Saves | Cartões com borda, título Averia, estado indisponível, foco dourado, data localizada, tempo e selo NOVO!. Mantém seleção e carregamento nativos. |
| Botões sobre imagens | Botões, etiquetas, painéis, destinos, abordagens e sacrifício; vínculos e textos nativos. Cartões sem ação têm faixa lateral e nenhum hover. |
| Nome da personagem | Aparência do campo nativo `Window_NameEdit`, preservando teclado e confirmação do MZ/Coreto. |
| Formulários futuros | Funções públicas de desenho de campo e botão, com estados default/focused/error/disabled. O chamador continua responsável por entrada, validação e dados. |

O jogo não possui o formulário de exemplo “Nome da jornada” como fluxo de campanha;
o tema não o insere. Os controles HIDE, FAST e Configurações continuam pertencendo
à Coreto. Retratos, fundos, créditos e placas dos personagens mantêm suas artes
autoradas. A distribuição e as dimensões se adaptam ao jogo 1280×720: a prancha
de apresentação do Figma não é usada como imagem achatada da interface.

## API de desenho para uma tela própria

```javascript
DrylandCoretoTheme.drawField(this.contents, {
  x: 24, y: 24, width: 480,
  label: TextManager.getLocalizedText('sua.chave.de.rotulo'),
  value: nomeDigitado,
  helper: TextManager.getLocalizedText('sua.chave.de.ajuda'),
  state: 'focused' // default, focused, error, disabled
});

DrylandCoretoTheme.drawButton(this.contents,
  { x: 24, y: 136, width: 164, height: 48 },
  TextManager.getLocalizedText('sua.chave.de.confirmacao'),
  'selected', 'primary'); // kind: menu, primary, text
```

As chaves ilustrativas precisam existir em Languages.tsv antes de usar o exemplo.
Essas funções só desenham: não recebem teclas, não alteram variáveis e não salvam.
`DrylandCoretoTheme.colors` e `.fonts` expõem os tokens para extensões locais.

## Arquivos e distribuição

- `Dryland_5_CoretoTheme.js`: plugin especialista tier 5.
- `fonts/`: Outfit, Averia Libre e Cinzel Decorative, com suas licenças OFL.
- `assets/CoretoTheme_*.png`: ícones locais derivados dos SVGs exportados do Figma.
- `assets/*.svg`: fontes vetoriais dos ícones, mantidas neste pacote.
- `Install-CoretoTheme.ps1`: instalação com backup e registro incremental.
- `Configure-CoretoMenus.cjs`: atualização idempotente dos callbacks visuais existentes.
- `Configure-CoretoLayout.cjs`: ajuste idempotente e protegido das duas posições nativas.
- `evidence/`: capturas e log do playtest instalado.

Os nomes de imagem são literais no plugin para que exportadores possam
identificá-los. O script de poda existente conserva `img/system/` e as fontes.
As URLs temporárias do Figma não são usadas pelo jogo.

## Refinamento de opções e saves

[Ícones editáveis no Figma](https://www.figma.com/design/mST7JediMzHTA4IkE2skw8/design-system-coreto?node-id=99-101).
Onze componentes vetoriais de 32×32 px: Settings, Audio, Language, TextEffects,
Music, Ambience, Jingle, SoundEffects, Back, Save e Clock. Traços vinculados aos
tokens existentes; exemplos como instâncias sobre papel e roxo. PNGs e SVGs
exportados estão em `assets/`; o jogo usa PNGs locais e aplica a cor do estado.

Contrastes calculados: texto principal/papel **14,69:1**, creme/roxo **10,88:1**,
texto principal/indisponível **10,45:1**, roxo/papel **9,69:1**. A barra dourada
sobre roxo escuro tem **6,10:1**. Valores e textos não dependem de transparência
para representar inatividade.

Verificação dirigida em Chrome 1280×720, com arquivos instalados e storage isolado:
Geral em inglês/português; efeitos OFF/ON; Áudio e mudança de volume; escolha de
slot para nova campanha; autosave real; reinício; Continuar; rejeição de slot vazio;
carregamento do arquivo criado no teste; retorno pelo botão Voltar. Sem erros na
execução final. Não foram usados saves do usuário nem injetado estado de campanha.
Esta verificação não qualifica NW.js/gamepad nem saves com artes/descrições
customizadas, ausentes no percurso. A Coreto continua responsável por esses dados.

Capturas: `evidence/menus-after-options-pt.png`, `evidence/menus-after-audio.png`,
`evidence/menus-after-load-final.png`, `evidence/menus-after-save-final.png`.
O erro de textura encontrado na primeira passagem foi corrigido e sua captura
preservada em `menus-pass1-button-lifetime-error.png`.

## Verificação realizada

- Correção de fontes: o remapeamento de Alegreya/Cinzel preserva o marcador ESC
  já normalizado pela Coreto. Isso evita exibir `\FontChange<CoretoOutfit>` ou
  `\FontChange<CoretoCinzel>` literalmente nos títulos e nas escolhas.
- Sintaxe JavaScript validada por `node --check`.
- Chrome desktop isolado em 1280×720, usando os arquivos efetivamente instalados.
- Título → tentativa de Continuar sem save: comando permaneceu indisponível.
- Título → Configurações → Português → retorno → Novo jogo → prólogo → taverna.
- HIDE/Tab ocultou e restaurou a interface sem avançar a mensagem observada.
- Clique em personagem → diálogo de grupo → menu localizado com etiqueta NOVO!.
- Capturas de título, Configurações, diálogo e escolhas inspecionadas visualmente.
- Sem exceções JavaScript ou erros de console no percurso final.
- Configuração comparada ao backup: somente oito callbacks visuais alterados;
  hashes dos arquivos instalados conferidos.
- Navegador isolado e servidor de teste encerrados ao terminar.

Limites: não percorremos o jogo inteiro, a tela nativa de entrada de nome nem
todos os rótulos longos. Campos de formulário novos requerem integração na cena
consumidora. A validação é de Chrome desktop; não declara teste de NW.js ou
gamepad (dispensado pela ADR-G005). Não foram criados testes permanentes de
aparência, conforme AGENTS.md. Saves do usuário não foram utilizados.

Momento demonstrável para o devlog: passar do título com foco dourado ao diálogo
com nome na tinta Coreto e abrir o menu de conversa com NOVO!. Capturas sugeridas:
`evidence/theme-title.png`, `evidence/theme-dialogue.png` e
`evidence/theme-hero-talk.png`.

## Identidade global, cartões e hover — 17/10/2026

[Decisões e componentes no Figma](https://www.figma.com/design/mST7JediMzHTA4IkE2skw8/design-system-coreto?node-id=104-182).

- Tinta de títulos, nomes, texto, ajuda e rótulos: **#360A0B**. Sobre roxo, o texto inverso **#FFF8EB** preserva contraste.
- Cartão estático: **#F0DFC0**, sem borda completa, cantos retos e faixa **#BE9A6B** de 4 px a 12 px da margem. Não recebe hover nem confirmação.
- Botão secundário: papel **#F9EACF**, contorno de 1 px, raio 6 px. Hover **#EEDFF2**, contorno roxo **#8224AD** de 2 px.
- Botão primário/selecionado sob ponteiro: **#6D3185**. Foco dourado preservado; pressão **#4D1D6B** prevalece. Hover só em ações habilitadas, sem animação ou som adicional.
- O papel visual dos botões é estável entre escolhas. PictureChoices continua controlando seleção, ativação e interação; Pular créditos usa o vínculo nativo de skip.
- Estados visuais substituem o clareamento antigo das imagens de UI, inclusive grupos transparentes de destinos. Indisponíveis permanecem legíveis com fundo cinza e texto opaco. HIDE continua nativo.
- Novo ícone **Conversation**, 32 × 32 px, vetorial no Figma e local no jogo; mantém as regras existentes de assuntos não lidos.
- Abrange diálogos, confirmações, comandos, console FAST/Configurações/HIDE, nomes de personagens, resumo do grupo, destinos, abordagens, sacrifício, saves e opções. Créditos recebem Outfit e tinta Coreto dentro do pergaminho já autorado.

Contraste calculado: tinta/papel **14,69:1**; tinta/cartão **13,29:1**; tinta/hover **13,67:1**; tinta/indisponível **10,45:1**; creme/roxo **10,88:1**; creme/hover roxo **8,19:1**. São razões dos tokens opacos; transições de cena conservam seu fade nativo.

Verificação dirigida: navegação de opções e volume, nova campanha, grupo formado por três heróis, destinos e encontro; mouse sobre cartão estático, hover/pressão de ação, escolhas longas, revisão de descrição, console e HIDE/restauração. Capturas e snapshots em `evidence/global-ui-*`. Não percorremos todos os finais, sacrifícios ou créditos desta campanha, nem qualificamos NW.js/gamepad.

## Contraste, transições e composição — refinamento de 17/10/2026

- Mensagens transparentes ou escurecidas usam creme **#FFF8EB**, com contorno
  **#360A0B** de 2 px. Mensagens sobre papel continuam com tinta escura. A abertura
  “A long time ago…” foi conferida sobre preto; créditos sobre pergaminho preservam tinta escura.
- As superfícies antigas de janela e de imagens conhecidas de UI são substituídas
  no carregamento. Os fragmentos da moldura nativa ficam sem textura; o botão
  Voltar também nasce com seu bitmap Coreto. Não há uma segunda imagem por baixo.
- Party: centro **(144, 664)**, tamanho **208 × 54 px**, canto inferior esquerdo.
- Releitura: centro **(1086, 128)**, tamanho **208 × 54 px**, borda direita em
  **1190**, alinhada ao título e às opções. Referência: tela **1280 × 720**.
- O instalador inclui backup de `CommonEvents.json`. O configurador aceita as
  coordenadas anteriores conhecidas ou as novas; recusa sobrescrever outra posição
  autorada. Desativar o tema não desfaz os dois ajustes de posição.

Verificação dirigida em Chrome: abertura, taverna, seleção de três heróis, destinos
 e encontro. Sem erros de execução; **2570 quadros** inspecionados sem texturas
 antigas anexadas às superfícies substituídas. Comparação dos eventos confirmou
 somente três valores alterados (X/Y de Party e X da releitura). Não foi percorrida
 toda a campanha nem testado NW.js. Evidências: `refinement-opening-3.png`,
 `refinement-static-card-final.png`, `refinement-encounter.png` e
 `refinement-transition-audit.json`, em `evidence/`.

## Histórico desfeito — contextos visuais e fluidez, segundo refinamento de 17/10/2026

- Menu duplicado do MZ: bitmap nativo não é anexado e o controle permanece oculto
  desde a criação. O menu por imagem mantém entrada e vínculos existentes.
- Taverna e fogueira usam o mesmo hamburguer vetorial, independente da fonte:
  linhas de 32 px dentro da superfície 208 × 54, escala nativa de 60%.
- O papel de uma ação não depende de a lista de escolhas continuar aberta.
  Botões permanecem botões depois de clicar e durante fades.
- Cards sobre cenários (Party, nomes e títulos de encontro): ameixa **#35263D**
  e creme **#FFF8EB**; contraste **13,29:1**. Ajuda em painéis conserva papel.
  Memorial usa pedra **#EDE5D8** e tinta **#360A0B**, contraste **13,94:1**.
- Memorial: texto começa em x=32, y=12, com largura útil reduzida para quebrar
  linhas antes da margem direita. A faixa ocupa x=12–16.
- Terceiro destino bloqueado: BlurFilter nativo (28, qualidade 4) no grupo
  completo, incluindo imagem, descrição e progresso. A disponibilidade nativa
  (switch 33) remove o efeito; não altera elegibilidade nem progresso.
- Hover de herói na taverna: halo dourado segue o canal alfa da arte, associado
  à área nativa do HeroGroup. Não há nova área clicável nem animação contínua.
- Título: Cinzel Decorative 58 em creme sobre ameixa 800 × 144; filete dourado
  de 2 px. CE46 usa fundo preto somente em map.reveal; Ivaí, peças e animação
  continuam nativos. O novo asset CoretoTheme_Black é local, sem rede em runtime.

### Fogueira: diagnóstico e correções

A cena criava bitmaps de texto de 1600×914, 1584×1986, 1136×2147 e 1060×1952
para imagens sem legenda. O especialista agora pula esse desenho quando não há
texto. A inspeção mostrou esses canvases passando de aproximadamente 36,5 MB de
pixels RGBA para dimensão 0×0; retratos e cenário continuam intactos.

Havia também um Wait de 180 frames executado mesmo sem mortos. Map045 agora
consulta deadCount pelo Bridge e só entra no bloco de desaparecimento se houver
perdas e o movimento reduzido estiver desligado. Mantém os 180 frames quando
há animação. Isso remove **3 segundos de espera autorada** na entrada sem perdas.
A pausa de áudio de 60 frames e as leituras do jogador permanecem iguais.

O trecho automatizado medido foi de 10,55 s para 7,90 s. É uma medição local com
encontros sorteados diferentes, não um benchmark controlado de FPS. A evidência
direta é a remoção do Wait vazio e dos canvases desnecessários.

### Verificação deste refinamento

Campanha isolada no Chrome 1280×720: título, novo save, taverna, hover de herói,
menu, destinos, fogueiras sem/com perda, duas rotas iniciais, união do mapa,
rota final, Conselho, final Reunir, memorial e epílogos. Percurso final sem erros.
Os ajustes foram feitos no especialista existente e em comandos nativos;
engine, bundles Coreto, regras de campanha e traduções não foram editados.

Capturas: `polish-after-title.png`, `polish-after-hero-hover.png`,
`polish-after-camp.png`, `polish-after-destinations.png`,
`polish-final-map-reveal.png`, `polish-final-memorial.png`.
Inspeção de transições: 1171 quadros sem menu nativo visível ou botão tratado
como card. Evidências em `evidence/polish-*.json`. O primeiro ensaio do halo
revelou uma incompatibilidade de precisão GLSL, corrigida antes do percurso
final; log preservado em `polish-glow-pass1-errors.json`. As interrupções do
controlador de QA não alteraram a campanha; a continuação carregou o save
produzido pelo próprio jogo. Não foram usados saves do usuário.

O instalador também inclui `Configure-CoretoPolish.cjs` e backup de `Map045.json`.
Reabrir o projeto no editor antes de salvar. Desativar o tema não desfaz as
modificações nativas de layout, fundo ou tempo. NW.js e outros finais não foram
qualificados neste percurso.

A terceira rota também foi inspecionada após liberar: switch 33 ativo, sem filtro
anexado e conteúdo nítido (`polish-final-destination-unlocked.png`).

Transição específica Save → Scene_Map: 267 quadros observados, ambas as cenas
confirmadas, nenhuma aparição do menu nativo (`polish-save-transition-audit.json`).
