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

## Ciclo de seleção de caminhos — 2026-08-31

Cadência `targeted`: as quatro jornadas públicas alteradas serão caminhadas, com a ordem de maior risco primeiro.

1. [CH-route-order-and-gate](charters/CH-route-order-and-gate.md) — alvo de 90 minutos para as duas ordens, recuo com troca, fechamento, checkpoint de devlog e liberação do Legado.
2. [CH-route-tests-entry-canary](charters/CH-route-tests-entry-canary.md) — canário novo de 30 minutos para a entrada direta e o total imutável de 351 casos; o histórico `CH-tests-entry-canary` permanece sem edição como registro do baseline de 231.
3. [CH-keyboard-zoom-motion](charters/CH-keyboard-zoom-motion.md) — canário adjacente de teclado, foco, 320×800, zoom 200% e movimento reduzido.
4. [CH-offline-all-images-blocked](charters/CH-offline-all-images-blocked.md) — canário adjacente de `file://`, rede desligada e fallback de imagem.
5. [CH-seeded-diagnostics-reproduction](charters/CH-seeded-diagnostics-reproduction.md) — canário histórico de determinismo com seed `20260830`; o alvo novo registra seed `20260831`, snapshot v2 e rejeições sem reescrever esta missão imutável.
6. [CH-complete-outcomes-canary](charters/CH-complete-outcomes-canary.md) — canário adjacente para vitória, derrota e campanha nova.
7. [CH-sixteen-image-devlog-review](charters/CH-sixteen-image-devlog-review.md) — canário adjacente para conteúdo, arte local e fallback dos dezesseis encontros.

O plano cobre jornada/funcional, experiência, erro/abandono e cross-cutting. Autenticação, permissão, serviço, HTTP/UDS, CLI, configuração, extensão, persistência entre dispositivos e áudio foram considerados e são não aplicáveis ao protótipo local. Esta seção agenda observações; não registra execução, evidência nova ou veredito.
