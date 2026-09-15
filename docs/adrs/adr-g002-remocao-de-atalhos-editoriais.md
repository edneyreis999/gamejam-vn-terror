# ADR-G002 — Remover eventos de mapa que servem apenas como atalhos editoriais

- **Estado:** Aceita em 2026-09-14.
- **Autoridade:** após avaliar a implementação, o usuário aprovou a organização e solicitou promover as duas decisões a ADRs gerais.
- **Aplicação atual:** 42 eventos removidos em 29 mapas, conforme a [task18](../../planos/tasks/eventbridge-minimal-runtime/task-18.md) e o [inventário aplicado](../../planos/tasks/eventbridge-minimal-runtime/removed-map-shortcuts.json).
- **Origem:** experimento de remoção da [ADR-005 local](../../planos/tasks/eventbridge-minimal-runtime/adrs/adr-005.md).
- **Decisão complementar:** [ADR-G001 — mapas de interação dos heróis](adr-g001-mapas-de-interacao-dos-herois.md).

## Contexto

Map003/event003, Gorvak, chamava CE005. A escolha do retrato jogável chegava a CE005 por CE003, sob o evento automático da taverna, sem passar por event003. A presença de dois chamadores estáticos não provava a necessidade de duas entradas. O evento nomeado oferecia um acesso editorial e sugeria uma responsabilidade que não exercia no jogo.

A investigação encontrou 42 entradas desse tipo na taverna, encontros, Conselho, desfechos e epílogos, incluindo acessos editoriais à configuração e ao preload. O inventário foi reconciliado antes da remoção, preservando os consumidores reais. A preferência do usuário por remoção, inicialmente adiada, foi autorizada para implementação na branch e agora aprovada como decisão geral.

## Decisão

Remover eventos de mapa cuja única função comprovada seja apontar um editor humano para conteúdo que o jogo executa por outro caminho. A documentação de autoria deve indicar o evento, Common Event ou seletor realmente usado. Não manter um segundo seletor sem consumidor para simular que o mapa é dono da interação.

Essa regra exige verificar o caminho real, as referências, o gatilho e os efeitos de cada candidato. Evento sem imagem, acionado por ação ou com uma única chamada não é automaticamente descartável. Um evento automático que inicia uma cena ou uma entrada realmente alcançável pelo jogador tem função, mesmo quando delega todo o conteúdo.

**A quantidade de chamadores não decide a arquitetura de um Common Event.** Um único consumidor funcional pode justificar delegação; dois chamadores não provam que ambos sejam necessários. A remoção de um atalho não autoriza apagar seu Common Event de destino.

## Aplicação e limites

Os 42 eventos foram substituídos por `null`, preservando os IDs dos eventos sobreviventes, as propriedades dos mapas e os caminhos automáticos. Não compactar arrays nem renumerar referências. A aposentadoria dos cinco Common Events de H1 pertence à ADR-G001 e não é consequência automática desta regra.

CE004 continua responsável pela configuração, com consumidores próprios nos plugins. CE351 conserva a lista nativa de preload e as chamadas funcionais de entrada/retorno. Ambos são editados diretamente no banco de eventos comuns. Na aplicação original, as demais conversas e cenas mantiveram seus Common Events. A expansão posterior, autorizada separadamente na ADR-006, migra corpos de cenas e remove seus CEs deslocados; os helpers com consumidores reais continuam.

O [inventário da task16](../../planos/tasks/eventbridge-minimal-runtime/task-16.md#follow-up-do-tópico-1--remover-atalhos-de-autoria-nos-mapas) conserva o diagnóstico inicial e a instrução de adiamento como histórico. Novas remoções exigem evidência equivalente para seus próprios candidatos; esta decisão não autoriza eliminar indistintamente outros eventos parecidos.

## Alternativas e consequências

- **Adicionar comentários aos atalhos:** esclarece seu papel, mas mantém seletores independentes que podem divergir do caminho jogado.
- **Transformar todos os atalhos em entradas reais:** acrescenta comportamento sem necessidade demonstrada. Só faz sentido mediante uma mudança de fluxo deliberada, como o mapa de Gorvak.
- **Apagar os Common Events com poucos consumidores:** confunde reutilização com utilidade e pode destruir configuração, preload ou cenas funcionais. Rejeitado.

A árvore e os mapas deixam de oferecer entradas editoriais enganosas. Em troca, quem edita os fluxos que continuam em Common Events deve acessá-los no banco ou seguir seus consumidores reais. As instruções de autoria precisam acompanhar essa localização. Estruturas salvas que referenciem eventos antigos não recebem garantia de migração; IDs preservados limitam o impacto, mas não provam compatibilidade de todos os saves.

## Substituições

| Registro anterior | Recorte substituído | Permanece vigente |
| --- | --- | --- |
| [eventbridge / ADR-005](../../planos/tasks/eventbridge-minimal-runtime/adrs/adr-005.md) | O estado experimental e a decisão de remoção são promovidos aqui. Em conjunto com ADR-G001, substitui integralmente a ADR local. | Inventário, proveniência, evidências e separação entre remoção de atalhos e migração de H1. |
| [eventbridge / ADR-002](../../planos/tasks/eventbridge-minimal-runtime/adrs/adr-002.md) | Exigir entradas nomeadas nos mapas como acessos editoriais para todos os conteúdos e configuração. | Autoria nativa, associação no seletor efetivamente executado, configuração editável e ausência de despacho pelo Bridge. |
| [eventbridge / ADR-003](../../planos/tasks/eventbridge-minimal-runtime/adrs/adr-003.md) | Manter um atalho editorial no mapa da taverna para abrir a lista de preload, concretizado antes em event014. | CE351, lista única de arquivos, chamadas nativas reais antes do uso, cobertura de entrada/retorno/Continue e carregamento assíncrono do fornecedor. |

Cada registro anterior aponta de volta para esta decisão. A [revisão geral](revisao-2026-09-14.md) explica por que as demais ADRs não precisam ser substituídas por ela.

## Aceite e acompanhamento

A remoção implementada e sua organização estão aprovadas pelo usuário. As verificações estruturais e de execução permanecem vinculadas à [entrega registrada](../../planos/tasks/eventbridge-minimal-runtime/verification.md#architectural-adoption--2026-09-14); a promoção documental não produz nova evidência de runtime.

Para futuras remoções, registrar os candidatos e preservar a prova dos consumidores reais, dos IDs restantes e da continuidade afetada. Se uma entrada passar a ter função jogável, ela deixa de atender ao critério desta ADR. A aprovação de organização não substitui os demais aceites humanos da entrega nem obriga migrar outras conversas.

## Expansão planejada posterior — 2026-09-14

A [ADR-006 incremental](../../planos/tasks/eventbridge-minimal-runtime/adrs/adr-006.md) registra o pedido posterior de planejar outras migrações e remover os Common Events que perderem seus consumidores. Essa remoção tem autorização e critérios próprios; não decorre apenas da retirada de um atalho editorial. O [grafo da expansão](../../planos/tasks/eventbridge-minimal-runtime/tasks.md) e sua verificação registram a execução e os sensores pendentes.
