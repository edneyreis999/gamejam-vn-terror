# GDDR-001: Fogueiras e ritmo da expedição

- **Status:** Partially superseded
- **Recorded on:** 2026-10-16
- **Decision date:** 2026-10-16
- **Last updated:** 2026-10-16
- **Scope:** Cadência das três rotas, pausas e recuo voluntário durante a expedição.
- **Decision source:** discussão com o usuário em 15–16/10/2026, decisões consolidadas e plano de registro aprovado em 16/10/2026; conversa sem link durável disponível.
- **GDD:** [Fogueiras e vínculos](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md#fogueiras-ritmo).

> **Substituição parcial em 2026-10-16:** o [GDDR-005](gddr-005-recuo-na-fogueira-com-qualquer-grupo.md) substitui a condição anterior de três vivos e a pendência de elegibilidade do recuo. Permanecem ativos a cadência, a oferta somente nas fogueiras, o cenário único, as conversas opcionais e as consequências do recuo. O corpo original abaixo preserva a decisão e as pendências daquela etapa; o sucessor resolve os pontos indicados.

## Context

O usuário quer aproximar o jogador dos heróis antes que novas decisões de sacrifício sejam necessárias. A sequência de armadilhas oferece pouco espaço para convivência. Segundo o usuário, produzir novas ilustrações é o principal custo; reutilizar uma cena para diálogos é viável. O baseline tem cinco armadilhas por rota inicial e seis no Vilarejo, com recuo antes da escolha de abordagem.

## Decision

### Cadência e escolha do jogador

- Igreja e Parque: duas armadilhas → fogueira → duas armadilhas → fogueira → uma armadilha → chegada ao destino.
- Vilarejo: duas armadilhas → fogueira → duas armadilhas → fogueira → duas armadilhas → Conselho.
- As fogueiras não contam como armadilhas e não alteram pools, sorteio ou o total de dezesseis encontros.
- Durante a expedição, o recuo voluntário passa a ser oferecido somente nas fogueiras. O retorno automático por perda do último integrante e o bad ending continuam sujeitos às regras existentes.
- Em cada pausa, o jogador pode conversar com todos, alguns ou nenhum dos heróis vivos presentes antes de continuar ou recuar.
- Reutilizar `Dryland_Camp.png` como cenário; não exigir nova ilustração para cada rota ou conversa.

### Fronteiras e pendências

Esta decisão substitui o momento de oferta do recuo, não aprova reinício diferente da rota, troca de formação no acampamento ou alteração do sorteio. A restrição anterior de recuo com menos de três heróis vivos no elenco total não foi explicitamente revogada; seu alcance nas fogueiras deve ser confirmado na spec, sem presumir recuo irrestrito. Repetição das chegadas após recuo e compatibilidade de saves anteriores permanecem pendentes de especificação.

## Alternatives considered

- Manter apenas a sequência de armadilhas: não oferece o espaço de convivência desejado.
- Manter recuo antes de cada abordagem: substituído pela escolha do usuário de concentrá-lo nas fogueiras.
- Permitir uma única conversa por pausa: não escolhido; o usuário preferiu ouvir todos, alguns ou nenhum dos presentes.

## Rationale

A pausa cria oportunidade para vínculo antes de novas decisões de sacrifício e aproveita uma única ilustração. O usuário informou que, em seus playtests, restringir o recuo não faria diferença relevante. Esse relato sustenta sua decisão de design, mas não é prova independente de balanceamento do novo fluxo.

## Consequences

Espera-se melhorar o ritmo de convivência e dar peso à decisão de prosseguir. A primeira fogueira ocorre após duas armadilhas: um herói pode morrer antes desse aprofundamento, e a apresentação na taverna continua responsável pelo vínculo inicial. As pausas podem aumentar a duração total; isso precisa ser observado. A restrição de recuo altera oportunidades de decisão, mesmo com o relato favorável do usuário.

## Relationships and supersession

| Related record | Relationship | Replaced scope | Scope remaining active in the earlier record |
| --- | --- | --- | --- |
| [GDDR-005](gddr-005-recuo-na-fogueira-com-qualquer-grupo.md) | Partially superseded by | A condição anterior de três vivos e a pendência de elegibilidade do recuo | A cadência, a oferta somente nas fogueiras, o cenário único, as conversas opcionais e as consequências do recuo |
| [GDDR-002](gddr-002-conversas-e-vinculos-dos-herois.md) | Complements | Nenhum | Todo o escopo; decisões adotadas conjuntamente |
| [GDDR-003](gddr-003-reconhecimento-das-perdas.md) | Complements | Nenhum | Todo o escopo; decisões adotadas conjuntamente |
| [GDDR-004](gddr-004-descoberta-de-conversas-ineditas.md) | Complements | Nenhum | Todo o escopo; decisões adotadas conjuntamente |
Substitui parcialmente o GDD anterior nas seções 7, 13.5 e nos recortes do ADR-026 reproduzidos nas seções 1.1 e 25: somente a oferta de recuo antes das abordagens. Permanecem Rever descrição, regras de resolução, sorteio, mortes, retorno automático e consequências do recuo. As specs concluídas conservam seu valor histórico.


## Sources and evidence

- [GDD canônico](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md): regras da campanha, fichas subordinadas, oito pares e apresentação vigente; o registro atualiza o design, não certifica o runtime.
- Discussão de 15–16/10/2026 e autorização de 16/10/2026: fonte das decisões e motivações atribuídas ao usuário.
- Inspeção local durante a discussão: cenário `Dryland_Camp.png` e mapa Acampamento (Map045) existentes, mapa sem eventos. Isso demonstra material disponível, não a feature implementada.
- Textos finais, spec incremental, integração e verificação do novo fluxo permanecem pendentes. Nenhum teste ou aceite emocional é declarado por este registro.

## History

| Date | Change | Source |
| --- | --- | --- |
| 2026-10-16 | Registro como Accepted das decisões consolidadas; implementação e redação final pendentes. | Discussão de 15–16/10/2026 e autorização do plano em 16/10/2026. |
| 2026-10-16 | Substituição parcial por GDDR-005; corpo original preservado. | [GDDR-005](gddr-005-recuo-na-fogueira-com-qualquer-grupo.md) |
