# Relatório QA — localização PT-BR/EN-US (2026-09-29)

Plano: [guia do ciclo](../guides/coreto-english-localization.md). Escopo
reduzido por Edney (D-024: “teste somente os 30% mais importantes. eu assumo
os riscos”). Executor: agente implementador (execução dirigida, não
independente). Candidato: worktree `coreto-english-localization` após a
task-07, com as correções de texto desta task (abaixo). Evidência bruta
(ignorada pelo Git): `docs/qa/evidence/coreto-english-localization/{A,B,C}/`
com `SHA256SUMS`.

## Ambiente

Servidor do executor `npm start -- --port 18737 --no-open` (PID 9211, dono
confirmado com `lsof`); origem 18737 limpa antes do lote A. Contexto
Playwright das ferramentas do harness, Chrome, 1280×720, DPR 1. O script do
skill de execução não foi usado: exige instalar `playwright` (IT-079), e a
política do ciclo proíbe nova instalação. Entrada só por teclado/mouse;
leitura de estado somente leitura. A campanha do lote C foi conduzida por um
driver de entradas públicas (escolhas por conteúdo, abordagens aleatórias),
guardado como `C/autoplay-driver.js`. Não houve seed, save externo nem mutação.

## Resultados

| Lote / cenário | Resultado | Evidência |
| --- | --- | --- |
| A1 primeira execução | pass: aba “The Dryland Drowned”, aviso e escolhas em EN, `textLocale=English`, `textEffects=true`, sem save | A/01 |
| A2 Options | pass: General (Language English/Português, Text Effects OFF/ON), Audio (Music, Ambience, Jingles, Sound Effects), barra “Switch category / Select / Back” | A/02–03 |
| A3–A4 troca e persistência | pass: rótulos mudam na hora para Geral/Áudio/Idioma/Efeitos de texto; título em PT; PT mantido ao reabrir e após recarregar. Direita não passa do último idioma (volta com Esquerda): comportamento nativo | A/04–06 |
| A5 Text Effects | pass: OFF persiste após recarregar; volta a ON | A/07 |
| A6 Novo jogo | pass: “Choose a file to start a new campaign.”, prólogo em EN | A/08–10 |
| A7 troca no meio do diálogo | pass: a mesma fala de Rheed passa a PT e volta a EN pelo botão Options do console, sem avançar | A/11–12 |
| A8–A9 taverna e rótulos | retido das observações das tasks 03/04 (cartões de destino, elenco, conversa, rótulos quebrados, janela de escolha oculta, cabeçalho do encontro) e reobservado no lote C; não repetido isoladamente (D-024) | tasks 03/04; C |
| B (L12) Continue no outro idioma | pass: após morte comprometida (Elowen, A6), recarregar, trocar para PT no título, Continue → mesmo arquivo, mesmos mortos `[H2]`, rota concluída, grupo e `saveCount=20`; nenhuma consequência repetida; texto em PT (itálico de Rheed correto). Retoma uma leitura antes (sequência 39 vs 40): a conclusão de leitura não é checkpoint; comportamento nativo | B/01–04 |
| C (L13) campanha EN até o fim | pass com correções: três rotas, sacrifícios, Conselho, escolha final, fechamento Reunir, memorial com seis cartões, epílogo de Draska, créditos “The Dryland Drowned” e “Skip credits · Esc”, volta ao título | C/* |
| C Andirá + Text Effects | **falha → corrigida**: com `Underwater` as palavras ficavam esmaecidas (pixel mais escuro 133 vs 72 com OFF). Trocado para `SoftShiver` nas duas colunas; reobservado: só as palavras citadas se movem, contraste ~91; com OFF só o cursor de pausa muda | C/andira-*, andira2-* |
| C memorial | **falha → corrigida**: no cartão de Seraphina “The Song of the Iara in the Dry Well” quebrava em 3 linhas e “Well” era cortado. Quatro causas EN (A1, A5, A7, B6) passavam de 5 linhas com seu nome de encontro; reduzidas a 2 linhas. A correção não foi reexibida em runtime; equivalência: o cartão de Griznik (5 linhas) renderiza inteiro | C/53 |

## Cortes aceitos (D-024)

Sequência de comparação em PT do lote C, caminho 1920×1080, fechamentos
Destruir e Perda total, jogo do L15. Mitigação: V-001 (verificação estática de
todo o corpus), classes de renderização compartilhadas pelos três
fechamentos, observações das tasks 03/04.

## L15

Revisão somente leitura do corpus por agente novo (D-024):
[l15-report.md](../../../planos/tasks/coreto-english-localization/l15-report.md).
16 achados; 12 corrigidos na coluna inglesa, 4 do texto-fonte para Edney.
Trechos alterados não foram reavaliados por outro agente.

## Observações fora do escopo

- 22 imagens de desenvolvimento com “PLACEHOLDER” continuam visíveis
  (arte, fora desta spec).
- Avisos repetidos `CanvasTextAlign 'undefined'` do `rmmz_core.js`, sem erros.

## Encerramento

Contexto do navegador e servidor 18737 encerrados ao fim da task-09 (ver
task-09).
