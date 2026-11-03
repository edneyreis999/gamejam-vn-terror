# ADR-G008 — Otimização de desempenho comprovada por A/B, em plugins especialistas e no DesignSystem

- **Estado:** Aceita em 2026-11-02, pela aprovação do plano de execução pelo usuário. O texto desta ADR ainda aguarda leitura do usuário.
- **Escopo:** as correções de desempenho da rodada 003 e o critério para aceitar as próximas.
- **Origem:** pedido do usuário em 2026-11-02; [análise de desempenho](../../planos/003-rodada-otimizacao/analise-de-performance.md) e [plano de execução](../../planos/003-rodada-otimizacao/plano-de-execucao.md).
- **Natureza:** decisão de arquitetura e processo (ADR, não GDDR): regras e conteúdo do jogo não mudam.

## Contexto

Os picos medidos estavam na Coreto, no DesignSystem e no engine, não nos plugins `Dryland_*`. `coreto/`, os bundles `Coreto_*.js` e `rmmz_*.js` são somente leitura, com exceção de `Coreto_5_DesignSystem.js`, que está em desenvolvimento. A [ADR-002](../../planos/tasks/eventbridge-minimal-runtime/adrs/adr-002.md) proíbe espera própria por imagem, e a [ADR-003](../../planos/tasks/eventbridge-minimal-runtime/adrs/adr-003.md) exige pré-carga da taverna cobrindo o Continue.

## Decisão

**Uma correção de desempenho só entra se comprovar melhora num A/B com critério fixado antes de medir. Ela fica no ponto editável mais próximo da causa.**

### Ordem de decisão

1. Parâmetros, tags, eventos, dados e ativação de plugins.
2. Recurso pronto da Coreto.
3. Edição de plugin `Dryland_*` ou do DesignSystem.
4. Plugin especialista `Dryland_6_*`, quando a causa está na Coreto congelada ou no engine.

### Prova exigida

- A/B no mesmo ambiente, com execuções alternadas entre base e candidato.
- Limiar por solução definido antes da medição. Em tempo, a pior execução do candidato precisa ser melhor que a mediana da base.
- Testes da área verdes e capturas sem mudança indesejada.
- Sem teste automatizado de orçamento de desempenho: depende da máquina e reprovaria as [perguntas de valor de teste](../../AGENTS.md).

### Adotado

| Onde | O que muda | O que continua igual |
| --- | --- | --- |
| `Dryland_6_PictureSprites` | Texto de imagem só é redesenhado se uma variável exibida mudou; IDs de imagem sem uso param depois de limpar o estado | Código de texto desconhecido mantém o redesenho original (IT-085) |
| `Dryland_6_NeutralFilters` | Filtro de cor neutro sai da lista até ser necessário | Tom, flash, brilho e blend ativos usam o filtro nativo |
| `Dryland_6_ImageCache` | A transferência mantém imagens de `img/pictures` já carregadas, até `RetainedMegapixels` (64) | Carga, prontidão, `LoadError` e Retry nativos; `onUnload` limpa tudo |
| `Coreto_5_DesignSystem.js` | Papel e botões só redesenham com mudança real; offset do nome e medidas de escolha guardados; leitura de arte por amostra, com cache por URL | Aparência, com tolerância de até 0,56% dos pixels acima de 8/255 na área do herói em foco |
| `Dryland_Presentation.js` | `resetModes` só chama o setter se o valor não for `false` | Estado resultante dos modos |
| `Tilesets.json` | Nomes de imagem vazios nos tilesets 1 e 2 | Flags; nenhum dos 46 mapas tem tile |
| `js/plugins.js` | `Coreto_1_BattleCore` desligado | Arquivo mantido; religar se batalha entrar no jogo |

### Não adotado

| Solução | Motivo |
| --- | --- |
| Janela de texto só para imagem em uso | Bitmaps -65%, mas frame máximo só -17,5% (limiar 20%); o custo mudou de lugar |
| Pular a captura de tela entre mapas | Captura zerada, mas tela parada não melhorou |
| Compressão de PNG sem perda no build | -8,2% na amostra (limiar 15%) |
| Recorte das camadas da taverna | No melhor caso, -19,5% de VRAM (limiar 30%). Overdraw não medido |
| Retirar o CE351 do título | Cobre o Continue exigido pela ADR-003 |
| Espera por imagem com `setWaitMode("image")` | Permitida pela [ADR-G009](adr-g009-carregamento-de-imagens-alem-do-padrao-do-mz.md) em 2026-11-03, mas a implementação medida não comprovou ganho e dobrou o tempo até a primeira fala na armadilha B3. Não integrada |

## Alternativas consideradas

- **Um único `Dryland_6_Performance`:** rejeitado porque cada grupo precisava poder ser descartado sem deixar resíduo.
- **Migrar `Dryland_*` para recursos da Coreto:** os custos medidos neles eram gatilhos e itens menores.
- **Corrigir só o DesignSystem nos filtros:** deixaria os bustos de fora, porque a causa está no engine.

## Consequências

Resultado de `c051a86` contra a `main` final, 5 execuções de cada lado, Chrome em M2 Max, com CPU 4× quando indicado:

| Medida | Antes | Depois |
| --- | --- | --- |
| Troca de foco na taverna, CPU 4× | 83 ms | 10,3 ms |
| Pico por fala, CPU 4× | 66,5 ms | 15,6 ms |
| Taverna após foco, frame p95 | 25,4 ms (49 fps) | 9,8 ms (119,6 fps) |
| Maior frame na volta à taverna, CPU 4× | 533 ms | 117 ms |
| Tick em idle, CPU 4× | 4,7 ms | 2,6 ms |
| Título em CPU 4× com Fast 4G | 27,3 s | 23,9 s |

Riscos e custos:

- **Só M2 Max.** O ganho dos filtros é de GPU por blocos. Em SwiftShader foi de 4,3–4,7 para 5 fps, porque o gargalo ali é preenchimento.
- **NW.js não executado**, pela exceção local de 2026-10-26. Só a sintaxe foi checada.
- **Reinstalar a Coreto** pode sobrescrever as edições do DesignSystem. Elas precisam chegar à origem antes.
- **Os plugins dependem de métodos internos da Coreto e do engine.** Remedir a cada atualização da Coreto.
- **O cache de imagens usa mais memória.** VRAM observada dentro do teto; RAM real não medida.
- **Paleta vazia no editor** nos tilesets 1 e 2. Para pintar tiles, restaure os nomes.
- **Sem aceite humano.** Conferir foco na taverna, tom de bustos, fades e tint.

## Relações e substituições

| Registro | Relação | Escopo substituído | Escopo que segue ativo |
| --- | --- | --- | --- |
| [ADR-002](../../planos/tasks/eventbridge-minimal-runtime/adrs/adr-002.md) | Substituída parcialmente pela [ADR-G009](adr-g009-carregamento-de-imagens-alem-do-padrao-do-mz.md) | Ver a ADR-G009 | Ver a ADR-G009 |
| [ADR-003](../../planos/tasks/eventbridge-minimal-runtime/adrs/adr-003.md) | Complementa | Nenhum | Tudo, inclusive a chamada do CE351 no título para o Continue |
| [ADR-G006](adr-g006-selecao-e-agrupamento-de-testes-pesados-por-risco.md) | Aplica | Nenhum | Seleção de testes por risco em cada grupo; suíte completa no fechamento |
| [KI-20260912](../known-issues/KI-20260912-precarregamento-de-imagens.md) | Relacionado | Nenhum | Pré-carga do resto do jogo segue como pendência |

## Fontes e evidências

- [Plano de execução](../../planos/003-rodada-otimizacao/plano-de-execucao.md): limiares, números por solução e desvios.
- `.artifacts/perf-003/`: bancada, capturas e patches rejeitados. É local e ignorado pelo Git, então pode ser apagado.
- Suíte completa no merge `78ecd3d`: 129 de 129 na fonte e numa cópia podada descartável (`run-tests --pruned`). `npm run verify-build` não foi executado, pois exige um `dist/` recém-exportado pelo editor.

## Histórico

| Data | Mudança | Fonte |
| --- | --- | --- |
| 2026-11-02 | Registrada como aceita depois da execução do plano; a substituição parcial da ADR-002 aguarda leitura do usuário | Plano aprovado pelo usuário em 2026-11-02 |
| 2026-11-03 | As cláusulas de imagem da ADR-002 passam a ser substituídas pela ADR-G009, que também cobre a espera por imagem | Pedido do usuário em 2026-11-03 |
