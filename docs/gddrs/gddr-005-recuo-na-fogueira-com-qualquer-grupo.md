# GDDR-005: Recuo na fogueira com qualquer grupo sobrevivente

- **Status:** Accepted
- **Recorded on:** 2026-10-16
- **Decision date:** 2026-10-16
- **Last updated:** 2026-10-16
- **Scope:** Elegibilidade do recuo voluntário nas fogueiras.
- **Decision source:** resposta explícita do usuário na entrevista da spec em 16/10/2026; conversa sem link durável disponível.
- **GDD:** [Cadência, escolhas e recuo](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md#fogueiras-ritmo).

## Context

O GDDR-001 concentrou o recuo nas fogueiras, mas preservou como pendência a condição anterior de três sobreviventes no elenco total. A entrevista resolveu essa fronteira: mesmo com apenas um ou dois heróis vivos, o jogador pode decidir voltar à cidade na pausa.

## Decision

Permitir recuo voluntário em qualquer fogueira com um, dois ou três integrantes vivos, independentemente de quantos sobreviventes restam na cidade ou no elenco total. Retirar a condição de ao menos três vivos. Fora das fogueiras, não oferecer recuo voluntário durante a expedição.

Preservar as consequências existentes: retornar à cidade, reiniciar a tentativa na primeira armadilha, manter mortes e posições já atribuídas e permitir a formação normal. Não trocar integrantes dentro da expedição. A perda do último integrante conserva o retorno automático ou a derrota total, sem criar uma fogueira vazia. Não adicionar confirmação à interação imediata existente.

## Alternatives considered

- Conservar o mínimo de três vivos: a alternativa foi apresentada na entrevista e rejeitada pelo usuário.
- Voltar a oferecer recuo em cada armadilha: não foi escolhido; a cadência do GDDR-001 permanece.

## Rationale

A escolha explícita mantém o papel da fogueira como momento de decidir entre continuar e voltar mesmo quando o grupo está reduzido. O usuário considera aceitável o efeito do recuo sobre a dificuldade; não há medição independente do incremento implementado.

## Consequences

A regra de disponibilidade e sua cobertura de persistência precisam mudar. As demais consequências do recuo continuam válidas. O novo comportamento exige playtest, mas não requer outra ilustração, recurso consumível ou diálogo de confirmação.

## Relationships and supersession

| Related record | Relationship | Replaced scope | Scope remaining active in the earlier record |
| --- | --- | --- | --- |
| [GDDR-001](gddr-001-fogueiras-e-ritmo-da-expedicao.md) | Partially supersedes | Condição anterior de três vivos e sua pendência em “Fronteiras e pendências” | Cadência 2/2/1 e 2/2/2, recuo somente nas fogueiras, conversas opcionais, cenário único, consequências do recuo e retornos automáticos |

## Sources and evidence

- Entrevista da spec em 16/10/2026: decisão explícita de permitir recuo com qualquer quantidade de sobreviventes.
- [Spec incremental](../../planos/tasks/campfire-hero-bonds/spec.md): RQ-002 e contrato de verificação, ainda em revisão técnica; não são prova de implementação.
- [GDDR-001](gddr-001-fogueiras-e-ritmo-da-expedicao.md): contexto e decisão anteriores preservados.

## History

| Date | Change | Source |
| --- | --- | --- |
| 2026-10-16 | Registrado como Accepted; substituição parcial do GDDR-001, sem declarar implementação. | Resposta do usuário na entrevista da spec. |
