# ADR-G009 — Carregamento de imagens além do padrão do MZ: cache entre transferências e espera por imagem

- **Estado:** Aceita em 2026-11-03, por decisão explícita do usuário. O texto desta ADR ainda aguarda leitura do usuário.
- **Escopo:** como o jogo carrega, retém e espera imagens de `img/pictures`; substitui as cláusulas de carregamento de imagem da [ADR-002](../../planos/tasks/eventbridge-minimal-runtime/adrs/adr-002.md) e a proibição de espera da [ADR-003](../../planos/tasks/eventbridge-minimal-runtime/adrs/adr-003.md).
- **Origem:** pedido do usuário em 2026-11-03: "pode adotar o S7 e S8 e criar uma ADR para sobrescrever a ADR-002", depois do [plano de execução](../../planos/003-rodada-otimizacao/plano-de-execucao.md) da rodada 003 e da [ADR-G008](adr-g008-otimizacao-por-plugins-especialistas.md).
- **Natureza:** decisão de arquitetura (ADR, não GDDR): regras e conteúdo do jogo não mudam.

## Contexto

A ADR-002 mandou usar o carregamento do MZ como veio: sem comando próprio de espera por imagem, sem polling de bitmap, sem interceptação do carregamento e sem garantia de Retry imediato. A ADR-003 repetiu a proibição ao incluir a pré-carga da taverna ("Script readiness barrier, guessed wait"). As duas partiram de leitura de código e documentação, sem teste com cache vazio.

A rodada 003 mediu o efeito dessa escolha:

- O engine destrói todo o cache em cada transferência de mapa. Na volta à taverna, 39 a 43 imagens eram pedidas de novo e os heróis surgiam um a um.
- Em rede lenta (CPU 4× e Fast 4G), o texto abria sobre fundo vazio por cerca de 1,3 s numa jornada medida no relatório.

## Decisão

**Fica permitido reter imagens já carregadas entre transferências e esperar por imagens antes do texto, nos limites abaixo. Fica substituída a parte da ADR-002 que proibia as duas coisas.**

### Cache entre transferências
Uma transferência pode manter as imagens de `img/pictures` já carregadas, das mais recentes para as mais antigas, até um teto de área (hoje 64 megapixels, parâmetro `RetainedMegapixels`). Só retém o que terminou de carregar. Implementado em `Dryland_6_ImageCache` e integrado na `main`.

### Espera por imagem
Um evento pode esperar o carregamento de imagens antes do texto, com o modo de espera que o engine já oferece, `setWaitMode("image")`, chamado por um evento comum. A espera vale para todo o cache, sem escolher arquivo.

**Limite medido:** a espera nunca pode vir logo depois de uma pré-carga cujas imagens a cena não vai usar de imediato. No título, o CE2 chama a pré-carga de 29 imagens da taverna, e a espera ali aguardou essa pré-carga e atrasou a abertura de 24 s para 46 s.

### O que continua proibido (ADR-002)
Polling de bitmap, interceptação do carregamento e garantia de Retry imediato. O `LoadError` e o Retry nativos seguem valendo. O carregamento assíncrono dos bustos (`Basic_EnterBust`), protegido pelos testes IT-060 e IT-076, não muda.

### O que continua valendo (ADR-003)
A pré-carga das imagens da taverna pelo CoreEngine, inclusive no caminho do Continue, e o resto da ADR-003. Só a proibição de espera deixa de valer.

## Alternativas consideradas

- **Manter a ADR-002 como estava:** rejeitada pelo usuário em 2026-11-03.
- **Espera própria com escolha de arquivo, em plugin:** não avaliada; exigiria polling de bitmap, que continua proibido.
- **Retenção sem teto:** não avaliada. O teto limita a memória em máquina fraca.

## Justificativa

Atribuição: decisão do usuário em 2026-11-03. A retenção tem prova medida (abaixo). A espera foi adotada como permissão, e a primeira implementação, descrita adiante, não comprovou ganho.

## Consequências

**Cache (medido, A/B 5×5, CPU 4×, Chrome em M2 Max):**

| Medida | Antes | Depois |
|---|---|---|
| Último herói pronto na volta à taverna | 293 ms | 115 ms |
| Maior frame na volta | 241 ms | 117 ms |
| Pedidos de imagem na volta, com Fast 4G | 39 | 1 |

A VRAM na volta sobe de 232 para 267 MB em rede lenta, dentro do teto. A RAM real não foi medida.

**Espera (medido, não integrado):** um evento comum `Imagens — aguardar carga` chamado antes do texto que segue um Show Picture, em 69 pontos de 46 lugares dos dados, foi medido em 2026-11-03 e **não foi integrado**:

- Na jornada principal o gap não mudou (1.357 para 1.366 ms). O que sobra é o busto `Reed-novo`, que entra por `Basic_EnterBust` e fica fora do alcance.
- Na armadilha B3 a base já não tinha gap depois das outras correções da rodada (0 ms), e a espera dobrou o tempo até a primeira fala (6,3 s para 13,7 s).
- Com a espera também no título, a abertura foi de 24 s para 46 s.

O patch está em `.artifacts/perf-003/rejeitadas/S7-espera-por-imagem.patch`, um arquivo local e ignorado pelo Git. Esta ADR não obriga a esperar: abre a permissão para quando houver uma cena com problema medido.

Riscos:

- Quem usar a espera deve medir antes e depois. A espera cobre o cache inteiro e não tem limite de tempo.
- O texto sobre fundo vazio na entrada de busto continua sem solução.
- O cache usa mais memória, e isso pesa em máquina fraca.

## Relações e substituições

| Registro | Relação | Escopo substituído | Escopo que segue ativo |
| --- | --- | --- | --- |
| [ADR-002](../../planos/tasks/eventbridge-minimal-runtime/adrs/adr-002.md) | Substitui parcialmente | A proibição de comando próprio de espera por imagem e o "use MZ and the installed providers as supplied" no que o cache descarta numa transferência | Chamadas diretas de evento comum; proibição de polling, interceptação e Retry imediato; `LoadError` e Retry nativos |
| [ADR-003](../../planos/tasks/eventbridge-minimal-runtime/adrs/adr-003.md) | Substitui parcialmente | A proibição de "Script readiness barrier, guessed wait" | Pré-carga da taverna pelo CoreEngine e cobertura do Continue |
| [ADR-G008](adr-g008-otimizacao-por-plugins-especialistas.md) | Complementa | Nenhum. A linha da ADR-002 em G008 passa a remeter a esta ADR | Critério A/B e a lista do que entrou e do que saiu |
| [KI-20260912](../known-issues/KI-20260912-precarregamento-de-imagens.md) | Relacionado | Nenhum | Pré-carga do resto do jogo segue pendente |

## Fontes e evidências

- [Plano de execução](../../planos/003-rodada-otimizacao/plano-de-execucao.md): números por solução.
- `.artifacts/perf-003/carga-de-imagens/` (cache) e `.artifacts/perf-003/espera-imagem/` (espera): locais e ignorados pelo Git, podem ser apagados.
- Medição só em Chrome e M2 Max. NW.js não foi executado, pela exceção local de 2026-10-26.
- A leitura da ADR-002 como "substituição parcial" é minha: o usuário pediu "sobrescrever" a ADR-002 sem delimitar as cláusulas. Delimitei ao carregamento de imagem para não perder as chamadas diretas de evento comum.

## Histórico

| Data | Mudança | Fonte |
| --- | --- | --- |
| 2026-11-03 | Registrada como aceita; leitura do texto pelo usuário pendente | Pedido do usuário em 2026-11-03 |
