# ADR-G001 — Autoria das interações dos heróis em mapas próprios

- **Estado:** Aceita em 2026-09-14.
- **Autoridade:** após avaliar a implementação, o usuário afirmou “Ficou muito mais organizado” e solicitou promover as duas decisões a ADRs gerais.
- **Aplicação atual:** os oito heróis, em Maps037–044 na branch `experiment/gorvak-interaction-map`. As [task19](../../planos/tasks/eventbridge-minimal-runtime/task-19.md) e [task20](../../planos/tasks/eventbridge-minimal-runtime/task-20.md) registram a expansão e sua evidência técnica sob a [ADR-006 incremental](../../planos/tasks/eventbridge-minimal-runtime/adrs/adr-006.md).
- **Origem:** experimento de mapa da [ADR-005 local](../../planos/tasks/eventbridge-minimal-runtime/adrs/adr-005.md), implementado pela [task17](../../planos/tasks/eventbridge-minimal-runtime/task-17.md).
- **Decisão complementar:** [ADR-G002 — remoção de atalhos editoriais](adr-g002-remocao-de-atalhos-editoriais.md).

## Contexto

A entrada Gorvak no mapa da taverna parecia conter a interação, mas apenas apontava para um Common Event. O fluxo jogado entrava nesse Common Event por outro caminho. A divisão não tornava o evento de mapa o responsável pela conversa e dificultava identificar, no editor, onde alterar a interação real.

O experimento reuniu a interação em um submapa de verdade: a escolha do retrato transfere o jogador e o evento automático do destino contém os comandos que ele joga. O usuário aprovou essa organização. A decisão adota esse padrão para a autoria das interações dos heróis; o experimento original cobriu somente Gorvak.

## Decisão

1. A taverna apresenta os heróis disponíveis. Cada herói migrado tem um mapa próprio, filho da taverna na árvore do MZ, responsável pelo menu, perfil, conversa, bustos, respostas de seleção e retorno. O parentesco na árvore organiza a autoria; as transferências são comandos nativos explícitos.
2. O evento do mapa contém a interação real. Helpers e Common Events funcionais continuam permitidos, mas o mapa não deve apenas redirecionar toda a interação para um controlador externo equivalente ao anterior.
3. **Conversar** e **Selecionar / Retirar do grupo** retornam ao menu do herói. **Voltar à taverna** ou cancelar encerra a visita. O herói permanece visível no próprio menu; Ivaí entra durante sua participação na conversa e sai antes da volta ao menu.
4. A situação dinâmica do grupo aparece no menu, por meio da quantidade atual e da ação disponível. Nome, pronomes, raça, profissão e resumo público continuam no diálogo. Não expor competências ocultas. A ausência de um herói morto e as restrições de formação seguem as regras existentes.
5. Conteúdo e composição ficam nos comandos nativos. CampaignRules continua como única fonte das regras de formação; eventos consultam fatos e acionam as ações existentes por Bridge. Entrar, conversar e voltar são observacionais. O mapa não cria uma nova fase da campanha.

## Ciclo de execução e salvamento

As fronteiras de transferência encerram o caminho do intérprete de origem antes de o autorun de destino assumir a interação. A taverna não pode continuar seu loop de escolhas enquanto o mapa do herói está ativo. Ao retornar, sua apresentação é composta a partir dos fatos atuais, preservando grupo, destino, mortes e efeitos de ausência já consumidos.

Pictures pertencem a `Game_Screen` e sobrevivem à transferência. Cada fronteira deve retirar explicitamente as imagens que encerra; mapas separados não dispensam limpeza. A autoria mantém HIDE, Configurações, foco, movimento reduzido e FAST restrito a trechos já lidos. Não acrescentar autoplay de áudio ou reiniciar a ambiência da taverna por causa da transferência.

O mapa não acrescenta autosave. Os checkpoints semânticos existentes e MZ/SaveCore continuam responsáveis por persistência e Continue. Alterar listas de eventos pode tornar saves antigos estruturalmente incompatíveis; esta decisão não promete migração nem restabelece bloqueio por revisão.

## Implementação de referência

Map037, **Conversa — Gorvak**, evento001, contém menu, textos e comandos de apresentação. CE003 transfere para ele e encerra seu caminho; a saída explícita retorna a Map003. CE005 e CE082–085 foram aposentados como slots nulos, sem renumerar os demais Common Events.

As unidades de leitura de H1 conservam as identidades 82–85 pelo argumento numérico opcional `unit` de `ObservationBegin`; o padrão 0 continua inferindo o Common Event corrente. Esses números não devem ser reutilizados para outro conteúdo: identificam leituras persistidas. Não há registro de endereços de texto ou despacho de narrativa no Bridge.

A composição de referência usa H1 à esquerda e Ivaí à direita, com os assets existentes. Posições e escalas são autoradas no mapa e podem ser calibradas ali. Os valores de Gorvak não se tornam medidas obrigatórias para todos os heróis nem aprovação final de enquadramento ou arte.

Na expansão das tasks19/20, Elowen, Griznik, Seraphina, Bimbren, Liora, Vaelith e Draska usam respectivamente Maps038–044/event001, filhos da Taverna. CE006–012 e CE086–113 foram removidos como slots nulos; as identidades de leitura86–113 permanecem explícitas nos mapas. A aprovação arquitetural de Gorvak não substitui os julgamentos humanos atribuídos à expansão.

## Alternativas e consequências

- **Manter toda a interação nos Common Events:** tecnicamente viável, mas não atende à organização por herói aprovada depois da experiência no editor.
- **Um mapa compartilhado de conversas:** reduz a quantidade de mapas, mas exige selecionar e encaminhar a interação do herói dentro dele. Foi preterido em favor da autoria localizada.
- **Migrar os oito heróis de uma vez no experimento original:** foi preterido para permitir a avaliação de Gorvak e a análise posterior. Essa análise fundamenta a expansão em dois lotes, preservando o funcionamento dos heróis ainda não migrados.

A localização do conteúdo fica explícita para quem edita. O custo é manter um mapa por herói migrado, duas transferências por visita e uma ação deliberada de retorno. Navegação, continuidade de áudio, limpeza de imagens e intérpretes precisam continuar corretos. Não se afirma ganho de desempenho ou isolamento automático de estado.

## Substituições

Os links abaixo são recíprocos. Cada substituição parcial vale para os heróis que adotarem este modelo; atualmente, H1–H8.

| Registro anterior | Recorte substituído | Preservado, respeitando as demais decisões posteriores |
| --- | --- | --- |
| [eventbridge / ADR-005](../../planos/tasks/eventbridge-minimal-runtime/adrs/adr-005.md) | O estado experimental e a decisão de mapa são promovidos aqui. Em conjunto com ADR-G002, substitui integralmente a ADR local. | Histórico do experimento, alternativas, evidências e escopo de execução. |
| [eventbridge / ADR-002](../../planos/tasks/eventbridge-minimal-runtime/adrs/adr-002.md) | Gorvak precisa chamar uma conversa separada por Common Event; a interação passa a morar no mapa. | Autoria nativa, chamadas funcionais diretas, configuração pública e carregamento padrão, sem despacho de texto pelo Bridge. |
| [vn-picture-busts-dialogues / ADR-002](../../planos/tasks/vn-picture-busts-dialogues/adrs/adr-002.md) | Os dois participantes saem ao terminar a conversa da taverna. O herói agora permanece até encerrar a visita. | Continuidade perfil/fala, lados, foco e composição do Conselho, sob a autoria nativa posterior. |
| [pr3-taverna / ADR-001](../../planos/tasks/pr3-taverna/adrs/adr-001.md) | Preservação literal de Position 0, offset −200 e enquadramento anterior de Gorvak na conversa; seu ciclo anterior de saída. | Composição CE38 da taverna, arquivos de Lucas e caráter provisório das falas; orientação editável pela autoria nativa posterior. |
| [init-rpg-maker-mz / ADR-020](historico/init-rpg-maker-mz/adr-020.md) | Ao terminar de conversar, restaurar a interação da taverna sem busto do falante. Agora retorna ao menu do herói, que permanece visível. | Show Text inferior, VNPictureBusts, conversa observacional, ausência de balão e isolamento de input. |
| [init-rpg-maker-mz / ADR-024](historico/init-rpg-maker-mz/adr-024.md) | Exibir todo o status por Conversar. A situação dinâmica de grupo passa ao menu; não se repete o antigo rodapé genérico de status. | Identidade e resumo público no diálogo, destaque no hover, competências ocultas e regras de seleção. |

A [ADR de autoria nativa dos bustos](../../planos/tasks/vn-native-bust-authorship/adrs/adr-001.md) já havia retirado a orientação original obrigatória e o foco exclusivamente global. Esta promoção conserva essa liberdade de edição; não restabelece as restrições antigas.

## Aceite e acompanhamento

A aprovação do usuário encerra o caráter experimental da decisão de arquitetura e organização. A [verificação](../../planos/tasks/eventbridge-minimal-runtime/verification.md#architectural-adoption--2026-09-14) distingue esse aceite dos julgamentos ainda pendentes de enquadramento, controles, memorial, áudio e conteúdo. A promoção não executa uma nova rodada de QA nem certifica alterações posteriores aos testes registrados.

A análise posterior dos outros sete heróis foi incorporada ao [plano incremental](../../planos/tasks/eventbridge-minimal-runtime/spec.md#map-authorship-expansion--2026-09-14), com entradas, leitura, regras, apresentação, Continue e remoção dos Common Events deslocados. O [grafo de tasks](../../planos/tasks/eventbridge-minimal-runtime/tasks.md) registra o andamento dos lotes. Preserve para o devlog o percurso retrato → interação → seleção → retorno e a edição de uma fala no mapa reproduzida no jogo. Uma eventual reversão desta decisão deve ser registrada em outra ADR, preservando o histórico de leitura e a avaliação separada da ADR-G002.


### Aplicação da task20

Maps041–044/event001 acrescentam Bimbren, Liora, Vaelith e Draska ao mesmo ciclo. Os oito mapas são filhos da Taverna, com autoria local, retorno explícito e enquadramento individual. CE009–012/098–113 foram removidos preservando os slots e as identidades de leitura. A [task20](../../planos/tasks/eventbridge-minimal-runtime/task-20.md) e a [verificação](../../planos/tasks/eventbridge-minimal-runtime/verification.md) registram a validação e os limites de aceite; a promoção original desta ADR não aprova automaticamente o enquadramento dos novos heróis.
