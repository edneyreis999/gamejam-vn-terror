# Localização PT-BR/EN-US — ciclo de QA

Contrato: [spec](../../../planos/tasks/coreto-english-localization/spec.md),
[verificação L10–L15](../../../planos/tasks/coreto-english-localization/verification.md#runtime-scenarios),
[charter](../charters/CH-coreto-english-localization.md). Planejado em
2026-09-29 (task-08). Nenhum lote foi executado; nenhum veredito é herdado.

## Candidato e prontidão

- Candidato congelado na task-07: worktree `coreto-english-localization`,
  HEAD `92dc14f` + alterações não commitadas das tasks 01–07. Tabela
  `Languages.tsv` sha256 `380383434e4ddea1…`, 451 chaves. V-001 e V-006
  passam. Mudança posterior de texto, tabela, eventos ou parâmetros invalida
  os lotes que a exibem.
- Suíte existente: 56 pass, 80 fail (78 presos na pré-condição obsoleta
  `'Jogar'`, 2 prosa PT literal, 1 dependência `playwright` ausente). Sem
  regressão real observada, mas formação, encontros, sacrifício,
  persistência, finais e controles **não** ficam cobertos por ela; os lotes
  A–C são a cobertura em runtime.

## Ambiente e regras

- Servidor do executor: `npm start -- --port 18737 --no-open` no worktree,
  depois de ler `docs/_memory/local-game-run.md`. Antes de limpar a origem,
  confirmar com `lsof -nP -iTCP:18737 -sTCP:LISTEN` que o processo é o do
  executor. Nunca usar nem limpar 18726 (usuário) ou 18727.
- Navegador: contexto Playwright novo e isolado (ferramentas MCP do
  harness), Chrome desktop, DPR 1. O script de execução do skill depende do
  pacote `playwright`, ausente neste checkout (IT-079); não instalar nada
  novo: usar as ferramentas de navegador já disponíveis.
- Entrada só por teclado/mouse. Teclas com pressionar–esperar ~100 ms–soltar
  (um toque instantâneo não chega ao `Input` do MZ). Inspeção somente
  leitura de `ConfigManager`, `$gameMessage`, `$gameVariables`,
  `$dataLocalization`, cena e janelas. Sem seed, save externo, teleporte ou
  mutação por console.
- Campanhas e saves próprios de cada lote, criados por Novo jogo. Registrar
  proveniência ao retomar um save do próprio executor.
- A tabela é lida no boot: recarregar a página após qualquer mudança de
  arquivo antes de observar (senão aparece `undefined`).
- Viewports: 1280×720 em todos os lotes; um caminho representativo em
  1920×1080 no lote C.
- Evidência: `docs/qa/evidence/coreto-english-localization/<lote>/`
  (ignorada pelo Git): capturas numeradas, `state.json` por passo (cena,
  locale, textEffects, texto/escolhas da mensagem, variáveis relevantes) e
  `run.md` com entradas reais. Relatório em
  `docs/qa/reports/2026-09-29-coreto-english-localization.md`.
- Término: fechar o contexto do navegador e o servidor do executor;
  confirmar com `lsof` que 18737 ficou livre.

## Lotes

### A — Primeira execução, opções e troca ao vivo (L10, L11)

| Passo | Entrada | Esperado (independente da implementação) |
| --- | --- | --- |
| A1 | Origem 18737 limpa; abrir `/` | Aba “The Dryland Drowned”; aviso de conteúdo e escolhas **em inglês**; `ConfigManager.textLocale=English`, `textEffects=true` |
| A2 | Title → Options | Categorias General e Audio; General: Language (English, Português ao lado) e Text Effects (ON/OFF); Audio: Music, Ambience, Jingles, Sound Effects; barra “Switch category / Select / Back” |
| A3 | Language → direita; sair; reabrir Options | Rótulos passam a Geral/Áudio/Idioma/Efeitos de texto na hora; título em PT; ao reabrir, PT mantido |
| A4 | Recarregar a página | PT lembrado; escolher EN de novo |
| A5 | Text Effects OFF → ON → OFF; recarregar | Valor persiste; voltar a ON |
| A6 | New Game → File 1 | Seletor “Choose a file to start a new campaign.”, “File 1…”, prólogo em EN; aviso “Saved automatically.” quando houver autosave |
| A7 | No meio do prólogo: botão Options do console → PT → voltar | A mesma fala atualiza para PT; nenhuma fala avança ou é pulada; FAST/HIDE intactos |
| A8 | Taverna: Destinations, Cast, conversa com um herói, Select/Remove, voltar | Cartões de destino com nome em linha própria e descrição quebrada dentro do cartão; status (Available/Locked…); elenco “Nome — Present”; “Party: n/3”; foco utilizável após troca de idioma |
| A9 | Formar grupo, partir, primeiro encontro; trocar idioma nos rótulos das abordagens | Janela de escolha oculta; três rótulos quebrados cabem nos quadros; cabeçalho “Encounter 1/5 — <nome>” traduzido; clique no rótulo escolhe a abordagem; Reread description relê e volta às mesmas opções |

Variantes: teclado e mouse ao longo do caminho; as duas direções de troca.
Reúso: nenhum. Invalidação: registro, tabela, CE002, parâmetros de Options.

### B — Continue no outro idioma (L12)

| Passo | Entrada | Esperado |
| --- | --- | --- |
| B1 | Campanha do lote A (arquivo 1) até um checkpoint semântico de leitura e um de consequência (morte ou recompensa) | Autosave após cada um; anotar `saveCount`, mortos, progresso |
| B2 | Recarregar; trocar idioma no título; Continue → File 1 | Mesmo arquivo; mesmo progresso e mortes; texto no idioma novo; nenhuma consequência ou checkpoint repetido; nenhum texto antigo em imagens |
| B3 | Jogar adiante um encontro | Progresso continua normal |

Somente saves criados pelo executor. Invalidação: base de provedores,
Bridge, listas autorais.

### C — Campanhas completas e finais (L13)

| Passo | Entrada | Esperado |
| --- | --- | --- |
| C1 | Campanha EN até o Conselho com ao menos uma perda; ler Conselho com Text Effects ON e OFF | Falas dos heróis presentes; linha de Andirá em itálico, animada com ON e estática com OFF; escolha final legível em duas linhas |
| C2 | Reunir → epílogos → memorial → créditos (deixar rolar) | Epílogos legíveis (blocos divididos no meio da frase continuam); cartões do memorial com nome, causa (sem itálico), rota e encontro traduzidos; créditos com título “The Dryland Drowned” e linhas literais; “Skip credits · Esc” |
| C3 | Ramo Destruir (campanha própria ou Continue do próprio save antes da escolha) | Fechamento de destruir em EN |
| C4 | Perda total (oito mortes) em campanha própria | Fechamento de perda total e nomes dos mortos em EN |
| C5 | Um trecho representativo de C1–C2 em PT | Mesmos elementos em PT |
| C6 | Um caminho (Conselho → memorial) em 1920×1080 | Escala sem corte |

Classes de layout exigidas: diálogo com nome, escolha longa, rótulos de
imagem, cartões de destino, cartões de memorial, elenco, créditos, avisos,
Options, Save/Load. Ramos não jogados não são marcados como vistos.

### D — Avaliação independente (L15)

Agente novo, sem participação na tradução ou implementação, com o
[briefing L15](../../../planos/tasks/coreto-english-localization/l15-brief.md).
Primeiro joga uma campanha EN por entradas públicas (servidor próprio do
executor em 18737, contexto novo, arquivo próprio); depois lê o corpus
restante pelas chaves com cena e falante. Relatório separa texto visto de
revisão documental. Achados voltam ao tradutor; trechos alterados são
reavaliados.

### E — Pacote editorial de Edney (V-005)

[Esboço do pacote](../../../planos/tasks/coreto-english-localization/editorial-packet.md):
tradução completa, achados do lote D e disposição, lista de tratamentos
D-021, título estático D-019, decisões marcadas “for Edney” nas tasks e as
capturas de devlog. Edney decide; nenhum resultado técnico substitui o
aceite.

## Capturas de devlog

Do jogo real, depois do aceite: opção de idioma (A2), a mesma cena
atmosférica nos dois idiomas (A7) e um painel de escolha em inglês legível
(A9).
