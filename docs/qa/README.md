# QA viva — Expedição e Sacrifício

Esta é a única árvore durável de QA do protótipo. Cenários guardam o último veredito; jornadas e charters permanecem entre ciclos; cada execução cria um relatório datado.

## Áreas

- `LOC`: abertura local, offline e sessão em memória.
- `FOR`: formação, elenco e foco.
- `ENC`: encontros, consequências, recuo e sacrifício.
- `CAM`: progressão, vitória, derrota e campanha nova.
- `ART`: conteúdo e imagens dos 16 encontros.
- `ACC`: teclado, zoom, movimento reduzido e diagnósticos.

## Entradas públicas

- Jogador: `file:///…/prototype/index.html`, somente Chrome desktop estável.
- Automação local: `file:///…/prototype/tests.html`.
- Operador: `window.expeditionQA` no DevTools, somente `setSeed`, `snapshot` e `validate`.

Não há servidor, instalação, login, persistência ou áudio. Recursos são relativos e devem funcionar com rede desligada. Evidência volumosa fica em `docs/qa/evidence/` e é ignorada; relatórios apontam apenas checkpoints e falhas.

## Aplicabilidade deste ciclo

`make verify`, Playwright, daemon, HTTP/UDS, `config.toml`, CLI do produto e isolamento de runtime/worktree não se aplicam: `_spec.md` e ADR-004 fixam HTML/CSS/JS direto por `file://`, sem build ou servidor. A validação automatizada suportada é abrir `prototype/tests.html`. Superfícies não exercitadas devem ser nomeadas no relatório; não se simula infraestrutura ausente.

## Taxonomia do ciclo

- Jornada e funcional: [J-local-offline-launch](journeys/J-local-offline-launch.md), [J-complete-campaign](journeys/J-complete-campaign.md), [J-reproduce-campaign](journeys/J-reproduce-campaign.md), [J-run-browser-contract](journeys/J-run-browser-contract.md) e os [seis cenários](scenarios/).
- Experiência: charters de campanha, imagem/devlog e acessibilidade.
- Erro/abandono: reload, imagens bloqueadas, recuo, morte e estado inválido.
- Cross-cutting: offline, 320×800, 200%, movimento reduzido, seed repetida e canário `tests.html`.
- Continuidade entre dispositivos foi conscientemente omitida: o GDD não promete persistência e reload inicia sessão nova.
