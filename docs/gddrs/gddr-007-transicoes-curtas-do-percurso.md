# GDDR-007: Transições curtas entre percurso e cenas

- **Status:** Accepted
- **Recorded on:** 2026-11-06
- **Decision date:** 2026-11-06
- **Last updated:** 2026-11-06
- **Scope:** Entradas nas armadilhas e retornos ao mapa de percurso.
- **Decision source:** Pedido do usuário de 2026-11-06 para implementar as melhorias propostas após relatar transições bruscas.
- **GDD:** [§29.2](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md#292-transições-curtas-entre-percurso-e-cenas--2026-11-06).

## Context

O usuário relatou cortes bruscos nas armadilhas e caminhada. A inspeção identificou transferências sem fade; o incremento de 4/11 havia removido a revelação gradual junto da caminhada no escuro.

## Decision

Suavizar as trocas entre mapa e armadilhas e o retorno da abertura da caminhada e da fogueira com fades curtos. Sincronizar as mudanças de áudio com a troca coberta; preservar continuidade da música quando ela já pertence à rota. Não alterar falas, regras, passos do peão ou vídeos do narrador.

Baseline de protótipo: 400 ms de saída e 400 ms de entrada. O intervalo sugerido de 250–400 ms foi autorizado para implementação; 400 ms é a calibração inicial, não um aceite humano do ritmo.

Refinamento solicitado no mesmo dia: eliminar o duplo escurecimento na partida da taverna e manter o mapa sob a fumaça de entrada de Rheed até ela cobrir a transferência para o coreto, sem tela vazia intermediária.

## Alternatives considered

Manter chegada direta conserva o ritmo anterior, mas não atende ao pedido de suavização. A recomendação aceita foi uma transição curta; restaurar a longa caminhada no escuro não integrou a proposta.

## Rationale

Dar continuidade visual às trocas de cenário sem reintroduzir a sequência de suspense retirada em 4/11. O benefício perceptivo ainda exige playtest.

## Consequences

Cada troca ganha aproximadamente 0,8 segundo, além do carregamento normal. O tempo pode exigir ajuste após escuta e avaliação visual. Sorteio, progresso e persistência permanecem iguais.

## Relationships and supersession

| Related record | Relationship | Replaced scope | Scope remaining active in the earlier record |
| --- | --- | --- | --- |
| [GDD §29.1](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md#291-passos-durante-o-movimento-do-peão--2026-11-04) / [incremento de passos](../../planos/tasks/pawn-movement-steps/spec.md) | Partially supersedes | Chegada visual direta sem transição curta | Remoção da caminhada longa, passos no peão, diálogos, B2 e regras |

## Sources and evidence

[Spec incremental](../../planos/tasks/route-transition-polish/spec.md): implementação e verificação. Relato do usuário e autorização nesta conversa, 2026-11-06. Aceite humano visual e de áudio pendente.

## History

| Date | Change | Source |
| --- | --- | --- |
| 2026-11-06 | Recorded as Accepted; calibração e aceite humano separados | Autorização do usuário nesta conversa |
| 2026-11-06 | Esclarecida a continuidade na partida e na entrada de Rheed para a fogueira | Novo relato e pedido de correção do usuário nesta conversa |
