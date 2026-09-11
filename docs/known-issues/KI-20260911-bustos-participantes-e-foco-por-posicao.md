# Limitação conhecida: participantes adicionais e foco por posição

> Atualização de contrato em 2026-09-11: [autoria nativa de bustos](../../planos/tasks/vn-native-bust-authorship/spec.md) substitui o foco automático e os cinco controles do EventBridge por comandos VNPictureBusts nos eventos. As referências a esses controles abaixo são históricas. A ampliação de participantes e as demais pendências não são implementadas por essa mudança.

Data: 2026-09-11. Público: Edney e futuros responsáveis pela programação e autoria de cenas.

**Estado: adiado por decisão do usuário; retomar somente se houver necessidade.** Este documento registra uma limitação de extensibilidade e uma hipótese de evolução. Não é uma spec aprovada, um defeito reproduzido nas conversas entregues ou autorização para alterar plugins. Não define prazo ou compromisso de implementação.

## Contexto da discussão

Depois da implementação de `vn-slot-authorship`, o usuário perguntou como adicionar mais um herói a um diálogo. A resposta identificou que a apresentação usa foco por posição, mas as posições autorizadas ainda dependem do tipo de conversa e de regras no EventBridge.

O usuário decidiu deixar essa ampliação para o futuro, **se for necessária**, e pediu preservar a ideia de evoluir o VNPictureBusts para uma autoria semelhante a:

```text
Posição 1 fala.
→ A posição 1 recebe o tamanho de falante.
→ As demais posições participantes recebem o tamanho de ouvinte e escurecem.
```

O objetivo é permitir que o autor indique quem fala sem repetir comandos de escala e tom para cada outro personagem. A imagem que ocupa uma posição deve poder mudar sem exigir uma nova regra de foco para cada herói.

Na mesma conversa, surgiu a possibilidade de colocar o escurecimento dos ouvintes nos parâmetros do `Dryland_EventBridge`. Essa centralização é uma discussão separada e menor; não exige implementar a ampliação de participantes. A localização dos textos nos eventos foi compreendida e aceita pelo usuário, sem ação adicional.

## Fonte de verdade e baseline

- O [GDD canônico](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md) mantém as decisões de produto: heróis à esquerda, outros personagens à direita, exceção refletida de Andirá e destaque visual do falante.
- A [spec incremental entregue](../../planos/tasks/vn-slot-authorship/spec.md) e seu [ADR001](../../planos/tasks/vn-slot-authorship/adrs/adr-001.md) registram foco por posição, reconstrução pela mesma autoria e preservação dos PNGs.
- O [guia atual](../../rpg-maker/README.md#editar-bustos-e-foco-dos-diálogos) explica a manutenção suportada hoje.
- A [análise anterior](../design/2026-09-11-bust-common-event-maintenance.md) conserva a motivação da redução dos Common Events e a referência do Map020 do ProjectX. Seus números e propostas representam aquele momento anterior, não o estado atual.

Uma implementação futura deve usar uma nova spec incremental. Este registro não reabre nem substitui as baselines concluídas.

## O que já funcionava antes dos parâmetros globais

O [Dryland_EventBridge](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/Dryland_EventBridge.js) já possui o comando `Focus`. Ele recebe um Picture ID e calcula automaticamente os alvos de escala, posição e tom dos participantes pertencentes à conversa ativa.

O cálculo parte da escala e posição definidas na entrada nativa. O falante volta à base; ouvintes usam uma porcentagem da base e um tom configurado no comando. Repetir o mesmo foco não acumula redução nem reinicia uma animação cujo alvo não mudou. Focar uma posição autorizada, mas vazia, preserva a composição atual.

Os auxiliares publicados em [CommonEvents.json](../../rpg-maker/The%20Dryland%20Drowned/data/CommonEvents.json) são 12, IDs 68–79. CE68–72 focam as posições 60–64; CE74 contém o foco de Andirá em 65. CE79 aplica foco neutro. Os demais auxiliares fazem entradas, intervenção, retorno e saídas.

Portanto, **a automação de “uma posição fala, outras escutam” já existe no EventBridge**. A proposta futura trata de torná-la reutilizável em composições mais livres e avaliar em qual plugin ela deve residir. Não há motivo estabelecido para reimplementar do zero o cálculo já existente.

## Limitação atual e consequência para o editor

Há três limites distintos:

| Limite | Implementação atual | Consequência |
| --- | --- | --- |
| Posições autorizadas por trecho | `dialogueSlots(id)` associa famílias de seções a Picture IDs | Acrescentar um Enter Bust numa posição nova pode ser recusado pelo catálogo, mesmo com argumentos válidos do VNPictureBusts. |
| Posições pertencentes à conversa | O comando `Conversation` aceita conjuntos específicos; `beginConversation` mantém sua propriedade | O foco só deve modificar pictures da conversa ativa. A existência de uma imagem na tela não basta para torná-la participante. |
| Reconstrução | `deriveVisualComposition` lê a autoria nativa e `reconcileConversation` recompõe o estado após retomadas | Uma composição nova precisa ser reconhecida também na recuperação; aparecer durante a execução normal não comprova suporte completo. |

Exemplos atuais: `profile.Hn` permite o slot 60; `speech.Hn` permite 60 e 63. As seções de Conselho permitem 60, 61, 62, 63 e 65. Existe uma fixture técnica 2×2 com 60, 61, 63 e 64, mas isso não torna automaticamente essa composição disponível em todas as cenas narrativas.

Assim, inserir um segundo herói na conversa atual da taverna não é apenas acrescentar imagem e texto pelo editor. Hoje exigiria revisar a validação, a alocação e a recuperação daquela conversa. Essa necessidade de programação é a limitação conhecida registrada aqui.

Adicionar um participante visual usando um herói existente é diferente de criar um novo herói jogável. Um nono herói também envolveria cadastro, elegibilidade, formação e conteúdo. Este registro não propõe ampliar o elenco jogável nem o limite de integrantes da campanha.

## Cenário desejado para uma possível evolução

Exemplo conceitual, ainda sem sintaxe de comando aprovada:

```text
Abrir conversa com as posições 1, 2 e 3.
Entrar Gorvak na posição 1, outro herói na 2 e Ivaí na 3.
Definir imagem, posição e escala base de cada entrada.

Falar na posição 1.
Mostrar texto de Gorvak.

Falar na posição 3.
Mostrar texto de Ivaí.

Encerrar conversa e limpar somente suas imagens.
```

As posições 1–3 acima são nomes conceituais. No projeto atual, Picture IDs reservados são 60–65. O parâmetro de entrada `Position` do VNPictureBusts não é o mesmo que o Picture ID que identifica a imagem; uma API futura deve evitar essa ambiguidade.

Deseja-se avaliar se o autor pode declarar os participantes no editor, trocar suas imagens e alternar o foco sem editar JavaScript por cena. Permanecem pendentes a quantidade de posições suportadas, sua associação a pictures e a necessidade real de aplicar esse fluxo à taverna ou a outras cenas.

## Escurecimento global: discussão independente

**Atualização posterior nesta mesma data:** o usuário autorizou os cinco parâmetros no EventBridge, implementados pelo incremento [vn-focus-parameters](../../planos/tasks/vn-focus-parameters/spec.md). A discussão original abaixo é histórica. O estado da entrega e dos testes está em [verification.md](../../planos/tasks/vn-focus-parameters/verification.md). O restante das oportunidades de interface e memorial possui [known issue separado](KI-20260911-eventbridge-manutencao-visual-no-editor.md).

A [análise de parâmetros do EventBridge](../design/2026-09-11-eventbridge-parametros-de-autoria.md) aprofunda essa centralização, outras oportunidades de manutenção pelo editor e o impacto em validação/saves. Ela é uma proposta separada; a ampliação de participantes registrada aqui continua adiada.

Hoje `listenerTone` é argumento obrigatório de cada comando Focus. Os eventos serializam `[-24,-24,-24,0]`; os três canais negativos iguais escurecem e o quarto controla cinza. O cabeçalho atual do EventBridge não declara um parâmetro global de escurecimento.

É tecnicamente possível expor um parâmetro como **Tom dos ouvintes** no Plugin Manager. Essa centralização permitiria ajustar o estilo uma vez. Apenas acrescentar `@param` não muda os comandos existentes: seus argumentos explícitos continuariam sendo utilizados até a implementação definir e migrar a origem efetiva do valor.

Para uma eventual implementação, decidir:

- Se o parâmetro global será a única fonte ou se certas cenas poderão substituí-lo explicitamente. Se houver exceções, a precedência precisa ser clara no editor.
- Se a interface expõe o tom completo ou apenas uma intensidade de escurecimento. As duas opções têm possibilidades diferentes; não há escolha aprovada neste registro.
- Como fornecer a mesma configuração validada ao executor, ao redutor puro e à ferramenta de validação. Uma dependência exclusiva de `PluginManager` no cálculo puro impediria seu uso equivalente fora do navegador.
- Como invalidar caches e tratar a revisão de apresentação quando a configuração mudar. Saves retomados devem usar uma política definida, sem manter acidentalmente parâmetros antigos.

Escala dos ouvintes, aumento específico do falante, recuo e duração também poderiam ser discutidos como parâmetros, mas não estão aprovados como parte dessa centralização. Hoje o tamanho de falante corresponde à base de entrada; não há multiplicador separado para aumentá-lo.

## Onde uma evolução poderia morar

### Preservar os cinco controles na futura evolução do VNPictureBusts

Por solicitação explícita do usuário, considerar a configuração global de foco como parte da futura atualização/extensão do plugin de bustos da VisuStella:

| Controle no EventBridge | Padrão / limites | Comportamento a preservar |
| --- | --- | --- |
| ListenerDarkness — Escurecimento dos ouvintes | 24 / 0–255 | Campo numérico; deriva RGB negativo igual, com cinza zero. |
| ListenerScale — Escala dos ouvintes | 90% / 1–100% | Percentual independente da base de entrada. |
| SpeakerScale — Escala do falante | 100% / 100–150% | Ampliação sobre a base, sem contaminar o tamanho de escuta. |
| ListenerOffset — Recuo dos ouvintes | 16 pixels / 0–100 | Deslocamento horizontal; respeita a exceção refletida de Andirá neste jogo. |
| FocusDuration — Duração da troca de foco | 20 frames / 0–60 | Movimento reduzido e reconstrução usam duração zero com os mesmos alvos. |

O cenário “posição 1 fala” deve consumir esses controles sem exigir sua repetição nos eventos. Preservar também foco neutro, posição vazia sem efeito, idempotência e proteção de pictures externas. Não criar uma configuração no EventBridge e outra independente na extensão que disputem o resultado. Decidir se o EventBridge delegará a apresentação à extensão e manterá apenas o contexto da campanha, com migração explícita da configuração existente.

Uma atualização do fornecedor não implica automaticamente possuir essa API: verificar o plugin instalado naquela ocasião. A arquitetura, a localização final dos parâmetros e a eventual integração com os presets de tom do VNPictureBusts permanecem decisões da spec futura. Preservar a distinção entre os presets gerais do fornecedor e o estilo de foco das conversas deste jogo.

Na migração futura, exigir equivalência dos defaults e uma prova com valores personalizados: alternância normal, Opções, Continue de save compatível após mudança cosmética, duração configurada, reduced motion, cancelamento e ampliação de escala derivada acima da base. Reutilizar como referência os casos UT073/074 e IT069 da suíte canônica, além de UT071/072 e IT067/068. Se parâmetros ou comandos mudarem de plugin, tratar separadamente a migração estrutural e as alterações cosméticas subsequentes.

Esta inclusão preserva requisitos para retomada; **não autoriza alterar agora o VNPictureBusts nem ampliar participantes**.

### Alternativas de localização

O usuário mencionou evoluir o VNPictureBusts. A localização técnica dessa evolução permanece **pendente**:

| Alternativa a avaliar | Pergunta a resolver |
| --- | --- |
| Evoluir o EventBridge existente | A funcionalidade continuará específica das conversas e regras deste jogo? |
| Criar uma extensão complementar ao VNPictureBusts | É necessário reutilizar o foco em outros jogos, separando apresentação e campanha? |
| Alterar o plugin VNPictureBusts instalado | Existe autorização e uma estratégia sustentável para preservar compatibilidade e futuras atualizações do fornecedor? |

Nenhum arquivo do plugin fornecedor deve ser alterado como consequência deste registro. As instruções do projeto preservam engine e plugins MZ; mudanças desses contratos precisam de design aprovado. Não foi investigada nesta tarefa a viabilidade de extensão nem a documentação externa do fornecedor.

## Comportamentos que a evolução deve preservar

- Uma única autoria nativa para apresentação normal e reconstrução, sem catálogo paralelo de receitas por caixa de texto.
- Bases de escala e posição estáveis; o foco não deve multiplicar valores já reduzidos a cada alternância.
- Propriedade explícita dos participantes: outras pictures de interface, palco ou mapa ficam intactas.
- Entrada e saída durante a conversa, posições vazias, foco neutro e cancelamento com comportamento definido.
- Retomada por Continue, retorno de Opções e skip sem repetir texto, escolhas, efeitos de campanha ou checkpoints.
- Espera real de assets, Retry, HIDE e movimento reduzido.
- Autoria de textos em Show Text nos eventos nativos e preservação das regras de campanha.

Esses pontos registram dependências conhecidas para o estudo futuro; não constituem aceite antecipado de uma nova arquitetura.

## Como retomar esta discussão

O gatilho é uma cena concreta que precise de participantes além da composição atualmente suportada, ou a necessidade de reutilizar o foco fora do EventBridge. Na retomada:

1. Identificar a cena, os participantes simultâneos, suas entradas e saídas e quem precisa alternar o foco.
2. Separar exigência visual de eventuais mudanças de elenco ou formação da campanha.
3. Conferir o estado atualizado de `dialogueSlots`, `Conversation`, `focusedTargets`, `deriveVisualComposition` e `reconcileConversation`; este documento é um retrato de setembro de 2026.
4. Decidir a API de autoria e a responsabilidade dos plugins, incluindo a relação com parâmetros globais.
5. Criar uma spec incremental com migração e critérios verificáveis antes da implementação.

Como ponto de partida para os testes, consultar as suítes canônicas [content.mjs](../../rpg-maker/tests/suites/content.mjs) e [native-controls.mjs](../../rpg-maker/tests/suites/native-controls.mjs), especialmente UT071/072 e IT067/068, além da [fixture técnica 2×2](../../rpg-maker/tests/fixtures/vn-picture-busts-2x2/recipe.json). Uma futura prova deve alternar posições, trocar o personagem que ocupa uma delas, repetir foco, retirar um participante e retomar a conversa por save. Deve também verificar que pictures externas permanecem intactas e que nenhuma decisão narrativa é repetida.

Momento demonstrável futuro: no editor, trocar uma imagem de participante mantendo o mesmo comando “posição fala”; executar a alternância e um Continue com composição idêntica. Captura sugerida: comandos nativos e resultado no jogo, depois da padronização dos retratos.

## Registro desta tarefa

Na criação original deste registro, foi feita leitura do código local, eventos e documentação. Naquela tarefa, nenhum comportamento, parâmetro de plugin, PNG ou diálogo foi alterado. A implementação posterior dos cinco parâmetros tem seu próprio incremento, vinculado acima. Não houve novo playtest, teste de runtime, card remoto ou implementação da evolução. O trabalho permanece adiado por instrução explícita do usuário.
