# QA viva — Expedição e Sacrifício

Esta é a única árvore durável de QA do protótipo. Cenários guardam o último veredito; jornadas e charters permanecem entre ciclos; cada execução cria um relatório datado. O planejamento atual não transforma evidência automatizada, visual ou histórica em observação de uma pessoa.

## Áreas

- `LOC`: abertura local, offline e sessão em memória.
- `FOR`: formação, elenco e foco.
- `ENC`: encontros, consequências, recuo e sacrifício.
- `CAM`: progressão, Conselho, desfechos e campanha nova.
- `ART`: conteúdo, sensibilidade cultural e imagens.
- `ACC`: teclado, zoom dentro do desktop suportado, movimento reduzido e diagnósticos.

## Entradas públicas

- Jogador: `file:///…/prototype/index.html`, somente Chrome desktop estável.
- Automação local: `file:///…/prototype/tests.html`.
- Operador: `window.expeditionQA` no DevTools, somente `setSeed`, `snapshot` e `validate`.

Não há servidor, instalação, login, persistência ou áudio. Recursos são relativos e devem funcionar com rede desligada. Evidência volumosa fica em `docs/qa/evidence/` e é ignorada; relatórios apontam apenas checkpoints e falhas. `docs/qa/state.csv` é uma visualização gerada e nunca é fonte de planejamento.

## Aplicabilidade deste ciclo

`make verify`, daemon, HTTP/UDS, `config.toml`, CLI do produto e isolamento de runtime/worktree não se aplicam: `_spec.md` e os ADRs preservam HTML/CSS/JS direto por `file://`, sem build ou servidor. A validação automatizada suportada é abrir `prototype/tests.html` no Chrome. Playwright não é dependência do produto, mas pode e deve dirigir a QA da task_05 quando estiver disponível, inclusive sobre páginas `file://`. O manifesto desta linha de base contém 168 IDs únicos (158 V2 e 10 BASE); a sessão confere o manifesto carregado e o relatório estruturado em vez de herdar os totais históricos de 231 ou 351.

O desktop suportado exige área efetiva mínima de 1280×720 CSS px, já descontado o zoom do navegador. 1920×1080 é a captura de referência. Larguras estreitas, 320 px efetivos e touch/mobile não pertencem a este incremento. VoiceOver com uma pessoa, aprovação editorial e cultural e aceitação da arte final continuam verificações humanas distintas; resultados automatizados ou observados por agente não as encerram.

## Registro de bugs

Não há arquivo de bug aberto em `docs/qa/bugs/` no início deste ciclo. Um sintoma encontrado deve ser deduplicado no registro vivo, ligado a pelo menos um dos seis cenários e encaminhado ao backlog da disciplina dona (`Narrativa`, `UI/UX`, `Technical Art` ou `Programação`). Não existe backlog separado de QA e este plano não publica cards externos.

## Taxonomia do ciclo atual

- Jornada e funcional: as quatro jornadas públicas e os seis cenários cobrem S01–S12, ambas as ordens iniciais e os três desfechos.
- Experiência: preparação, perda irreversível, leitura, foco, texto PT-BR, arte provisória e estados terminais são observados dentro das jornadas.
- Erro e abandono: recuo, morte, estado rejeitado, imagem ausente, fechamento/reload e reinício explícito têm ramificações planejadas.
- Cross-cutting: offline, teclado, zoom com área efetiva ≥1280×720, movimento reduzido, seed repetida, informação pública/privada e o canário `tests.html`.
- Continuidade entre dispositivos foi conscientemente omitida porque a campanha é somente em memória; reload inicia uma sessão nova.
- Autenticação, permissões, serviço, HTTP/UDS, configuração, extensão, áudio e armazenamento são não aplicáveis ao runtime local.

## Ciclo Prototype V2 — 2026-09-05

Cadência combinada: `full` para a campanha P0/P1 e `targeted` para as entradas adjacentes local e do runner. A ordem abaixo prioriza impacto e raio de regressão. Cada missão usa exatamente uma tour e inclui o estado terminal ou a condição de abandono/reinício que encerra a sessão.

1. [CH-v3-campaign-terminal-matrix](charters/CH-v3-campaign-terminal-matrix.md) — Caio percorre ambas as ordens, os três desfechos e as precedências de morte até **Campanha concluída** e a abertura limpa.
2. [CH-v3-first-return-loss](charters/CH-v3-first-return-loss.md) — Lia investiga sacrifício imediato, ausência no primeiro retorno, retorno posterior e abandono por reload.
3. [CH-v3-keyboard-desktop](charters/CH-v3-keyboard-desktop.md) — Joana percorre S01–S12 por teclado, com zoom dentro do mínimo efetivo e movimento reduzido.
4. [CH-v3-human-voiceover](charters/CH-v3-human-voiceover.md) — Joana e uma pessoa operadora avaliam nomes, ordem, anúncios e mudanças dinâmicas com VoiceOver real.
5. [CH-v3-human-editorial-art](charters/CH-v3-human-editorial-art.md) — Rui conduz a revisão humana PT-BR, editorial, cultural e de arte final sem importar vereditos de automação.
6. [CH-v3-seeded-public-contract](charters/CH-v3-seeded-public-contract.md) — Caio reproduz seeds, fronteiras de texto visto e separação entre projeção pública e diagnóstico V3 somente leitura.
7. [CH-v3-offline-local-canary](charters/CH-v3-offline-local-canary.md) — Rui abre a cópia local sem rede, bloqueia imagens e confirma que reload abandona a campanha.
8. [CH-v3-browser-manifest-canary](charters/CH-v3-browser-manifest-canary.md) — Caio verifica o manifesto atual, o relatório estruturado e a retomada por nova abertura após interrupção.

Os charters anteriores continuam imutáveis como registros de suas missões de 231, 351 e 320 px. Eles não integram a matriz atual e seus debriefs e evidências permanecem nos relatórios históricos.
