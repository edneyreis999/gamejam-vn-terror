---
status: prepared
prepared_on: 2026-09-11
decisions: pending
---

# Preparação da entrevista — redução de escala do falante

Este roteiro atende ao pedido de estudar a pasta e preparar a entrevista. Não aprova uma nova spec nem altera decisões anteriores. Conduzir uma pergunta por vez, com recomendação explícita; resolver por inspeção as dúvidas que o repositório responde.

## Contexto verificado

A pasta indicada já contém uma [spec aprovada](spec.md), uma [verificação histórica](verification.md) e uma transformação pontual. Não foi encontrado um relato separado de issue nessa pasta. O pedido original documentado era permitir `SpeakerScale` entre 1 e 150, com padrão 100, mantendo o cálculo relativo à base de entrada e a independência da escala dos ouvintes.

O próprio `spec.md` informa que esse incremento foi substituído por [vn-native-bust-authorship](../vn-native-bust-authorship/spec.md). O [ADR001 dessa frente](../vn-native-bust-authorship/adrs/adr-001.md) e o [GDD canônico](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md) confirmam a mudança: autoria visual nos comandos VNPictureBusts; EventBridge conserva restauração e ciclo da conversa, sem foco automático nem os cinco parâmetros globais.

A inspeção ocorreu na branch `refactor/native-bust-restoration`, com HEAD `3513a0f925ff101a759723537e764a8dc407ae67` e alterações locais preexistentes. Naquele momento, a verificação da autoria nativa declarava implementação em andamento, e seu checklist ainda tinha validações pendentes. O relatório de revisão registrava SHIP apenas para revisão de código. Isso não estabelece aceite de runtime ou de enquadramento. Revalidar esse estado ao começar a spec, pois a frente pode continuar evoluindo.

O stash listado como `stash@{0}` tinha a descrição `On fix/speaker-scale-reduction: Preservar fix speaker-scale-reduction antes da autoria nativa de bustos`. Seu conteúdo não foi aplicado nem auditado. `lower-speaker-minimum.py` pertence à implementação anterior e não é um procedimento para a árvore atual.

## O que o código já responde

Fontes: [EventBridge](../../../rpg-maker/The%20Dryland%20Drowned/js/plugins/Dryland_EventBridge.js), [configuração dos plugins](../../../rpg-maker/The%20Dryland%20Drowned/js/plugins.js), [Common Events](../../../rpg-maker/The%20Dryland%20Drowned/data/CommonEvents.json), [metadados do VNPictureBusts](../../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_2_VNPictureBusts.js) e [guia de edição](../../../rpg-maker/README.md#editar-cenas-e-conversas).

| Assunto | Evidência atual | Consequência para a entrevista |
| --- | --- | --- |
| Controle antigo | EventBridge está ativo com parâmetros vazios; não há chamadas ao seu antigo `Focus` nos Common Events. | Retomar `SpeakerScale` seria uma nova decisão de autoria, não apenas diminuir um limite. |
| Autoridade visual | VNPictureBusts está ativo antes do EventBridge; `Scale To` recebe alvos X/Y explícitos. | Não transportar automaticamente os limites e a semântica do parâmetro removido. |
| Taverna | CE080 define herói 100 e Ivaí 90; CE081 define herói 90 e Ivaí 100. | Esses auxiliares compartilhados escrevem a escala de novo a cada troca de fala. |
| Conselho | CE068 usa 60 para o herói falante e 54 para heróis ouvintes; CE071 usa 100 para Ivaí falante; CE079 restaura a composição neutra. | A composição já usa valores diferentes conforme a cena e o participante. |
| Entrada | CE005 tem escalas explícitas; o guia avisa que alterar a entrada não recalcula os auxiliares posteriores. | Distinguir “diminuir a entrada” de “manter o tamanho desejado quando a fala muda”. |
| Recuperação | O contrato atual reconstrói o resultado final dos comandos nativos, sem repetir narrativa ou efeitos de campanha. | O tamanho precisa ser consistente também ao voltar de Opções e em Continue compatível. |
| Saves | Alterações nos eventos seguem a revisão nativa estrutural. | Não herdar a promessa antiga de alterar um parâmetro global e continuar saves sem revisão. |

Há uma diferença de unidade essencial: no contrato antigo, base 60% × `SpeakerScale` 80% produzia 48%. No comando nativo `Scale To`, alvo 80 significa escala 80%; para obter 48%, o alvo absoluto é 48. Esses números explicam a diferença e não propõem valores finais de arte.

Não foi reproduzido um defeito novo durante este estudo. O fato de um auxiliar escrever outra escala é comportamento da autoria atual; só será um problema para esta demanda se contrariar o resultado que o usuário pretende.

## Ordem da entrevista

As perguntas abaixo são um roteiro para condução, não um questionário a apresentar de uma vez. Todas as recomendações permanecem propostas até a resposta do usuário.

| Ordem | Decisão a resolver | Pergunta preparada | Recomendação e encaminhamento |
| --- | --- | --- | --- |
| D0 | Qual frente está sendo solicitada | Quer definir a redução de escala na autoria nativa atual, retomar o antigo `SpeakerScale` ou apenas entender o histórico antes de escolher? | Partir da autoria nativa atual, porque é o contrato vigente. Esta pergunta já foi enviada na conversa; a resposta permanece pendente neste registro. |
| D1 | Operação concreta e resultado | Em qual momento o tamanho fica inadequado: na entrada do personagem, quando ele passa a falar ou quando vira ouvinte? | Usar uma conversa concreta como referência. Investigar sua sequência antes de presumir que falta um recurso. |
| D2 | Abrangência | O resultado desejado vale para uma cena, para todos os diálogos da taverna ou também para outras composições, como o Conselho? | Começar pelo conjunto que apresenta a necessidade real; incluir Conselho ou outros trechos somente se a intenção for compartilhada. |
| D3 | Critério visual | O objetivo é reduzir o tamanho geral do personagem ou mudar a diferença entre o mesmo personagem falando e ouvindo? | Separar enquadramento de destaque da fala. Preservar o destaque e a legibilidade já confirmados, salvo nova decisão explícita. Não fixar um percentual por conveniência técnica. |
| D4 | Experiência de autoria | Ao ajustar um personagem, você precisa que as próximas trocas de fala acompanhem esse ajuste automaticamente ou quer controlar os valores nos eventos? | Manter os comandos e auxiliares nativos se eles atenderem à tarefa. Se a repetição for o problema central, especificar a operação de autoria desejada antes de escolher onde programar a automação. |
| D5 | Comportamento entre estados | Ao mudar de falante ou voltar à composição neutra, o busto deve conservar o novo enquadramento ou voltar ao tamanho de entrada? | Explicitar entrada, fala, escuta e neutro com o mesmo exemplo. Só perguntar por novos tempos, deslocamentos ou tons se também houver intenção de mudá-los. |
| D6 | Limite do aceite | Esta entrega deve apenas viabilizar o ajuste pelo autor ou também entregar o enquadramento visual aprovado das cenas escolhidas? | Separar funcionamento técnico de aceite das artes. O GDD mantém o enquadramento final pendente; não encerrar essa pendência por consequência de liberar escala. |

Se D0 escolher o parâmetro antigo, substituir D4 por uma decisão sobre a autoridade única do estilo: configuração global, comandos nativos ou uma precedência deliberada. Expor que isso revisa o ADR001 vigente. Preservar como referência os requisitos históricos de faixa, padrão e cálculo; não reentrevistar esses detalhes sem motivo. Antes de afirmar viabilidade, estudar os consumidores e a recuperação da arquitetura escolhida.

Se D1 mostrar que a autoria atual já atende ao resultado e falta apenas localizar ou ajustar os comandos, recomendar uma orientação ou alteração de conteúdo proporcional. Não inventar uma feature para justificar uma nova spec. Se for necessário mudar comportamento, definir o incremento a partir do contrato atual e conservar os documentos históricos.

## Limites e autoridade para a futura spec

O GDD é a autoridade de produto; a spec e o ADR de autoria nativa definem a responsabilidade atual; os eventos são a autoria concreta da composição; o fornecedor interpreta seus comandos. Uma nova resposta do usuário pode substituir decisões, mas essa substituição deve ficar explícita antes de atualizar o GDD.

Programação entra se mudarem automação, interpretação, restauração ou validação. Technical Art entra se mudarem enquadramento, escalas ou transições autoradas. UI/UX entra se houver uma nova superfície de configuração. Narrativa só entra se a demanda mudar participação ou conteúdo, o que não está estabelecido aqui.

Não há motivo identificado para ampliar elenco, criar participantes adicionais, trocar PNGs, modificar o fornecedor, alterar campanha, acrescentar serviços ou redesenhar saves. Essas frentes não fazem parte do pedido de preparação. Preservar os estados provisórios das artes e textos.

## Verificação a dimensionar depois das respostas

Não foram executados testes, jogo ou editor nesta preparação. Foram lidos código, dados e registros existentes.

Os IDs UT-073 e UT-074 citados pela verificação antiga foram reutilizados na suíte atual para outros contratos: remoção dos controles antigos e preservação de comandos na restauração. Um resultado histórico com o mesmo ID não comprova o comportamento atual. Consultar os casos atuais em [content.mjs](../../../rpg-maker/tests/suites/content.mjs), incluindo IT-067, IT-068 e IT-069, antes de selecionar cobertura.

Para uma mudança apenas de autoria, selecionar as cenas afetadas e observar entrada, alternância de falantes, neutro quando usado e saída. Conferir imagem real e legibilidade; um número correto não aprova enquadramento. Exercitar Opções, Continue compatível, HIDE e movimento reduzido conforme o impacto, preservando o cursor narrativo. Se mudar automação ou cálculo, acrescentar testes proporcionais para repetição sem acúmulo, escala por eixo e restauração, nas suítes canônicas.

O registro final deve distinguir validação estática, resultado no runtime e aceite humano. A política atual de revisão de eventos permanece a referência; qualquer exigência de preservar saves anteriores é uma decisão adicional de escopo.

Momento sugerido para o devlog, se houver implementação: mostrar a edição da escala no fluxo escolhido e a mesma conversa alternando o falante e retornando de Opções. Usar uma cena dentro do escopo e manter explícito o estado provisório das artes.

## Saída esperada da entrevista

Ter uma operação concreta, cenas afetadas, regra de escala compreensível, autoridade de autoria única, comportamento de transição e limite de aceite definidos. Com isso, decidir se basta autoria/documentação ou se há mudança de comportamento que exige nova spec incremental. Somente então redigir `spec.md`, `verification.md` e os contratos das disciplinas realmente afetadas, sem reescrever o histórico aprovado.
