# GDDR-002: Conversas autorais e vínculos dos heróis

- **Status:** Accepted
- **Recorded on:** 2026-10-16
- **Decision date:** 2026-10-16
- **Last updated:** 2026-10-16
- **Scope:** Conteúdo, participantes e leitura opcional das conversas dos heróis.
- **Decision source:** discussão com o usuário em 15–16/10/2026, decisões consolidadas e plano de registro aprovado em 16/10/2026; conversa sem link durável disponível.
- **GDD:** [Fogueiras e vínculos](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md#fogueiras-conversas).

## Context

As fichas canônicas oferecem motivações, medos, defeitos, voz e formas de demonstrar carinho. A composição da expedição varia e mortes podem deixar um único herói presente. O GDD já delimita oito relações bilaterais; escrever para cada trio multiplicaria o conteúdo e sua revisão.

## Decision

### Conteúdo completo na próxima spec

- Escrever 48 conversas-base em PT-BR e EN-US: oito heróis × três destinos × duas pausas. A primeira pausa de cada rota oferece a conversa A e a segunda, B; não selecionar aleatoriamente entre as duas.
- Incluir na mesma spec todas as novas narrações, intervenções e falas de luto da fogueira e da taverna. O escopo é de autoria integral, sem etapa preliminar limitada a um herói.
- As conversas exploram passado, desejos, hábitos, cuidado, humor, medo e conflito. Cada conversa acrescenta algo à apresentação da taverna, sem transformar todas em depoimentos sobre trauma.
- O contexto da rota vem da ansiedade de chegar ou não ao destino e das expectativas sobre ele. Não descrever como vivenciados lugares ou detalhes ainda não apresentados, nem presumir uma armadilha sorteada específica.
- Preservar as revelações do Conselho e a ordem variável de conclusão das rotas. Heróis podem questionar Ivaí, que pode se esquivar sem antecipar sua confissão.

### Participantes e relações

Cada conversa-base funciona com o herói central e Rheed jovem e/ou Ivaí. Os dois não precisam responder em todas as conversas. Três blocos do herói intercalados por respostas são referência de tamanho, não formato obrigatório.

Acrescentar intervenções curtas e condicionais dos oito pares da seção 18.1 do GDD quando o companheiro estiver vivo e presente. Sua ausência não impede a conversa-base. Não trocar apenas o nome de quem responde: a fala e sua continuação precisam permanecer coerentes. Os demais pares podem participar do diálogo coletivo nos limites existentes, sem novos arcos bilaterais.

### Escrita e aceite

Detalhes biográficos novos são propostas editoriais, não fatos retroativamente atribuídos ao GDD. A aprovação deste escopo não aprova textos ainda não escritos. A spec deve cuidar de duração, repetição e continuidade quando o jogador lê a conversa B sem ter lido a conversa A; esse último caso ainda não tem solução aprovada. O jogador não é obrigado a esgotar os assuntos.

## Alternatives considered

- Cortar a interação entre heróis: simplificaria a escrita, mas perderia relações já disponíveis no GDD.
- Fazer cada resposta depender de outro herói: frágil diante de composição variável e mortes.
- Exigir Rheed e Ivaí em todas as respostas e cinco blocos fixos: rejeitado em favor de ritmo e vozes variados.
- Sortear duas conversas por rota: preferida progressão autoral A/B.
- Produzir primeiro um piloto de Gorvak: sugestão rejeitada pelo usuário; todos os novos textos entram na próxima spec.

## Rationale

O vínculo deve surgir de personalidade e convivência, não somente de exposição biográfica. Conversas-base independentes de outros heróis mantêm o conteúdo acessível com grupos reduzidos; intervenções dos pares canônicos dão especificidade sem escrever para todas as combinações. A autoria completa permite revisar a progressão entre rotas, luto e Conselho.

## Consequences

O custo inclui escrita, tradução, revisão e integração das 48 conversas-base, além das intervenções e falas adicionais. A duração das conversas e a variedade de voz exigem revisão editorial. A eficácia emocional é hipótese: no playtest, observar se o jogador consegue explicar seu interesse por um herói além da utilidade nas armadilhas. Esse julgamento não é substituído por testes automatizados.

## Relationships and supersession

| Related record | Relationship | Replaced scope | Scope remaining active in the earlier record |
| --- | --- | --- | --- |
| [GDDR-001](gddr-001-fogueiras-e-ritmo-da-expedicao.md) | Complements | Nenhum | Todo o escopo; decisões adotadas conjuntamente |
| [GDDR-003](gddr-003-reconhecimento-das-perdas.md) | Complements | Nenhum | Todo o escopo; decisões adotadas conjuntamente |
| [GDDR-004](gddr-004-descoberta-de-conversas-ineditas.md) | Complements | Nenhum | Todo o escopo; decisões adotadas conjuntamente |

## Sources and evidence

- [Spec incremental](../../planos/tasks/campfire-hero-bonds/spec.md) e [proposta narrativa completa](../../planos/tasks/campfire-hero-bonds/campfire-hero-bonds.narrativa.md), redigidas em 16/10/2026. O design adotado permanece; texto, projeto técnico e evidência de implementação aguardam seus próprios aceites.

- [GDD canônico](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md): regras da campanha, fichas subordinadas, oito pares e apresentação vigente; o registro atualiza o design, não certifica o runtime.
- Discussão de 15–16/10/2026 e autorização de 16/10/2026: fonte das decisões e motivações atribuídas ao usuário.
- Inspeção local durante a discussão: cenário `Dryland_Camp.png` e mapa Acampamento (Map045) existentes, mapa sem eventos. Isso demonstra material disponível, não a feature implementada.
- Textos finais, spec incremental, integração e verificação do novo fluxo permanecem pendentes. Nenhum teste ou aceite emocional é declarado por este registro.

## History

| Date | Change | Source |
| --- | --- | --- |
| 2026-10-16 | Registro como Accepted das decisões consolidadas; implementação e redação final pendentes. | Discussão de 15–16/10/2026 e autorização do plano em 16/10/2026. |
| 2026-10-16 | Acrescentados os documentos da spec e da proposta narrativa como material de revisão. | Autoria da spec solicitada pelo usuário. |
