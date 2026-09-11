# Redução dos Common Events de bustos

Análise de 2026-09-11, solicitada durante a revisão de `vn-picture-busts-dialogues`. **Proposta técnica; não é uma mudança implementada nem uma nova decisão de produto.** Público: Edney, responsável pela programação e manutenção no editor.

## Conclusão

Sim: devemos aproveitar a organização por **posição/Picture ID** do Map020. A implementação atual separou demais o comportamento por herói e, principalmente, por caixa de diálogo. Isso tornou a manutenção maior do que o requisito de autoria nativa exige. Essa granularidade foi uma escolha da implementação; o RPG Maker não exige148 Common Events para esse comportamento.

Recomendo combinar **foco por slot**, **enquadramento definido uma vez na entrada** e **reconstrução derivada da mesma autoria visual**. Como alvo de organização, aproximadamente25–30 helpers de apresentação parece plausível, mantendo os eventos narrativos existentes. Esse número é uma estimativa de arquitetura; não foi demonstrado por implementação ou playtest.

Trocar somente o foco por posição deixa os104 eventos `restore` intactos. A redução precisa tratar as duas fontes de repetição.

## O que foi encontrado no jogo atual

Leitura estruturada de [CommonEvents.json](../../rpg-maker/The%20Dryland%20Drowned/data/CommonEvents.json):

| Grupo | IDs | Eventos | Função |
| --- | --- | ---: | --- |
| Taverna | 68–94 | 27 | Entradas, foco/escuta por herói e saídas |
| Conselho | 95–108 | 14 | Entrada do elenco, foco por herói, intervenção e retorno |
| Amantes | 109–111 | 3 | Entrada de Pérola/Floraí e saída |
| Reconstrução | 112–215 | 104 | Uma receita por seção/caixa para recompor a cena |
| Total | 68–215 | 148 | Helpers adicionais; os eventos anteriores continuam existindo |

Os104 `restore` representam70,3% dos novos eventos. Comparando os comandos e desconsiderando apenas o comentário identificador e o terminador, existem **38 corpos distintos**:66 repetições exatas.

Por exemplo, CE112–117 executam exatamente a mesma chamada, ao CE71, entrada de Gorvak. Os seis nomes diferentes atendem duas caixas de perfil, seleção, grupo cheio, despedida e epílogo. Nas cinco caixas de conversa de cada herói, há apenas duas sequências de restauração: foco em Ivaí ou foco no herói.

Esses eventos não estão simplesmente sem uso. [reconcileConversation](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/Dryland_EventBridge.js) procura literalmente `restore.<passageId>.<box>` e lança erro quando não encontra. Apagá-los exige mudar também essa associação.

Há outro problema de manutenção que a contagem de eventos esconde: os oito `council.Hn.focus` repetem24 condições cada, cobrindo três slots × oito heróis. São192 condições e600 comandos VNPictureBusts apenas nesses oito helpers. Cada mudança de política de foco atravessa várias cópias. Isso é risco de divergência de autoria; esta análise não reproduziu um novo defeito visual.

## O que o Map020 faz melhor

Conferi novamente o [Map020 do ProjectX](/Users/edney/projects/coreto/projectX/frontend/data/Map020.json) e seus [Common Events](/Users/edney/projects/coreto/projectX/frontend/data/CommonEvents.json). A referência mantém quatro eventos de foco:

| Common Event | Alvo em destaque | Acionamento no exemplo |
| --- | --- | --- |
| 7 — Fala-ID1 | Picture1 | Switch43 |
| 8 — Fala-ID2 | Picture2 | Switch44 |
| 9 — Fala-ID3 | Picture3 | Switch45 |
| 10 — Fala-ID4 | Picture4 | Switch46 |

O personagem é escolhido ao entrar. Depois, o foco trata o **lugar ocupado**, sem precisar saber o nome do personagem. No evento14, exemplo2x2, quatro entradas específicas são seguidas por chamadas ao mesmo conjunto de quatro focos. A narrativa mantém seus textos; o número de falas não multiplica os helpers de foco.

Há duas distinções importantes para adaptar o padrão:

- **Picture ID e Position são diferentes.** Picture ID identifica a imagem durante a conversa; Position é o ponto de entrada do plugin. O foco deve mirar um slot estável, como60, mesmo que sua coordenada final tenha um ajuste para a arte.
- **Os quatro eventos resolvem foco, não toda a infraestrutura do jogo.** A referência não demonstra nossa reconstrução entre passagens, elegibilidade dinâmica do Conselho ou Continue nas fronteiras exigidas. Quatro focos não significam quatro Common Events para toda a entrega.

Os plugins VNPictureBusts dos dois projetos continuam idênticos. No ProjectX, os focos usam gatilho Parallel e desligam seu próprio switch. A adaptação recomendada mantém chamadas diretas, com trigger None, acompanhando o interpretador responsável pela conversa. Isso preserva a simplicidade de autoria sem introduzir outro fluxo paralelo para cancelamento e skip. Não foi demonstrado defeito no paralelo do ProjectX; a diferença é de integração com nosso ciclo de vida.

## Por que não basta copiar os quatro eventos

O [cabeçalho do plugin instalado](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_2_VNPictureBusts.js) define `Scale_ScaleReset` como retorno aos parâmetros globais. Não significa retornar à escala específica definida na entrada. `Scale_ScaleTo` usa escala absoluta; `Scale_ScaleBy` soma valores, não aplica uma proporção sobre uma base imutável.

Hoje Gorvak entra com46%, Elowen com34% e Ivaí com52%. Os ouvintes correspondentes usam41,4%,30,6% e46,8%. No Conselho, os heróis têm outras bases e coordenadas, conforme a [calibração autorada](../../planos/tasks/vn-picture-busts-dialogues/vn-picture-busts-dialogues.technical-art.md). Um foco genérico que fixe100%/90% mudaria o enquadramento. Multiplicar repetidamente a escala corrente também faria o tamanho acumular alterações.

Isso exige separar **base da composição** e **efeito de foco**. Não exige um evento de foco para cada herói. A base deve continuar vindo da autoria no editor; a regra de foco pode operar sobre ela por posição.

Normalizar ou redimensionar os PNGs permitiria outra solução, mas os assets estão preservados pelo contrato atual. Essa alternativa tampouco elimina os104 `restore`.

## Estratégia recomendada

### 1. Entradas definem a base; os focos usam o slot

Manter a seleção da imagem, posição e escala nos comandos nativos de entrada. Uma entrada reutilizada por perfil, seleção, despedida e epílogo pode continuar em um helper por arte. A identidade do herói permanece relevante para **escolher e calibrar a imagem**, não para definir toda troca de fala.

Proponho uma interface limitada no adaptador de apresentação para registrar os alvos autorados de um slot e aplicar foco relativo. Nomes e assinatura ainda precisam ser especificados. Ela deve:

- Obter a base dos valores autorados, antes da interpolação; nunca capturar a escala de um frame intermediário.
- Aplicar escala, tom e deslocamento a partir dessa base, com parâmetros de efeito também editáveis no editor.
- Tratar nova chamada ao mesmo foco como idempotente.
- Operar somente nos slots ocupados pertencentes à conversa atual.
- Entregar os efeitos aos comandos públicos do VNPictureBusts, preservando seus arquivos.

Os helpers visíveis poderiam se chamar **Foco — esquerda1**, **esquerda2**, **esquerda3**, **direita1** e **direita2**. A posição65 de Andirá continua sendo a composição excepcional de reflexão; ela não ganha deslocamento comum por acidente. A posição64 continua servindo à fixture2x2, sem novo participante na campanha.

Exemplo de autoria proposto, não um comando já disponível:

```text
Entrada de Gorvak no slot60, com seu enquadramento
Foco — esquerda1
Mostrar texto: perfil de Gorvak
Entrada de Ivaí no slot63, com seu enquadramento
Foco — direita1
Mostrar texto: pergunta de Ivaí
Foco — esquerda1
Mostrar texto: resposta de Gorvak
Saída da conversa
```

Elowen usa os mesmos focos. No Conselho, a projeção existente informa quem ocupa60/61/62; cada opinião direciona o foco ao slot ocupado pelo herói elegível. Os ramos necessários à seleção de assets ficam na montagem do elenco, evitando repeti-los em todos os focos.

### 2. Continue usa a mesma autoria visual

Eliminar a obrigação editorial de criar `restore` para cada caixa. A proposta é indexar a composição a partir dos comandos de apresentação autorados e de limites explícitos de conversa/estágio. Esse índice é derivado, reconstruído ao carregar os dados; não é outro catálogo editável em JavaScript.

Para o cursor nativo atual, uma redução pura dos comandos permitidos calcula os alvos finais: quais slots existem, qual imagem/base está em cada um e qual recebe foco. Ela não executa o evento narrativo: ignora texto como efeito e não pode executar ações, escolhas, checkpoints, sons, transferências ou esperas.

Há trabalho real aqui. Ler apenas o prefixo da passagem atual é insuficiente: o herói veio do perfil anterior, e o elenco do Conselho pode ter entrado várias passagens antes. A autoria precisa declarar um início ou uma composição de entrada reutilizável para cada estágio que herda participantes. Taverna contínua, Conselho antes/durante/depois de Andirá e apresentações isoladas devem ter fronteiras explícitas. Não basta substituir os104 nomes por um `switch` JavaScript de104 casos.

O carregamento usa o cursor/pilha nativos já existentes e a formação validada para selecionar o estado derivado. Reconstrói somente os efeitos finais, com prontidão real dos bitmaps e sem animação de entrada repetida. Skip parcial, cancelamento e retorno das configurações precisam compartilhar esse mesmo modelo.

### 3. Orçamento de manutenção

Uma decomposição ilustrativa seria:12 entradas por arte, uma montagem de elenco do Conselho, cinco focos por posição, duas operações da intervenção, três saídas reutilizáveis e um estado de foco neutro. Isso soma24 helpers; particularidades da autoria podem levar a aproximadamente25–30. Não é uma alocação final de IDs nem uma promessa de equivalência já testada.

O principal ganho verificável deve ser editorial: mudar a base de uma entrada atualiza a apresentação normal e a reconstrução; inserir uma caixa com o mesmo foco não cria helper; mudar a política de escuta não exige editar todos os heróis. Apenas esconder comandos duplicados dentro de um evento enorme não atende a esse objetivo.

## Alternativas e impacto no contrato

| Estratégia | Redução esperada | Limitação |
| --- | --- | --- |
| Compartilhar somente os corpos idênticos de `restore` | 148→82 helpers | Exige associação nativa explícita às38 receitas e mudança do resolvedor; conserva autoria duplicada de normal/retomada |
| Foco por slot com branches e valores literais atuais | Reduz focos por herói | Ainda repete calibrações nos ramos e não resolve sozinho a restauração |
| Slots com base autorada + reconstrução derivada | Alvo aproximado25–30 | Exige refatorar o adaptador, validação e contrato de reconstrução |
| Copiar100%/90% e os switches do ProjectX | Poucos eventos de foco | Altera enquadramentos e introduz execução paralela fora do contrato vigente |

Recomendo a terceira opção. A segunda é uma alternativa se a equipe priorizar manter estritamente os seis comandos atuais, aceitando maior repetição de parâmetros. A primeira quantifica uma redução conservadora possível, mas não é necessária como fase intermediária se a refatoração completa for escolhida.

A recomendação preserva a direção do [GDD canônico](../GDD_Visual_Novel_Expedicao_e_Sacrificio.md): conteúdo e enquadramento no editor, foco manual, participantes contínuos, lados, reflexão e elegibilidade. Entretanto, altera o contrato técnico da [spec atual](../../planos/tasks/vn-picture-busts-dialogues/spec.md): gramática restrita a seis comandos, associação de reconstrução e responsabilidade do adaptador. Deve ser materializada em uma **spec incremental**, sem reescrever a baseline como se já usasse essa arquitetura. Esta solicitação autoriza a análise; nenhum desses mecanismos novos foi implementado.

## Estado, migração e evidência necessária

| Informação | Autoridade proposta | Vida útil |
| --- | --- | --- |
| Heróis elegíveis, morte, escolhas | CampaignRules existente | Persistente, sem mudança de regras |
| Imagem, coordenadas, escala-base e parâmetros de efeito | Eventos nativos | Autoria persistente |
| Ocupante de cada slot e composição esperada | Derivação da autoria e contexto validado | Recalculável |
| Ponto da leitura | Cursor/pilha do MZ existentes | Save nativo |
| Foco atual, bitmaps e interpolação | Conversa de apresentação | Transitório; descartado no cancelamento |

Invariantes: um ocupante por slot; foco somente em ocupante válido; alvos sempre calculados da base; Andirá substitui temporariamente os heróis; Cancelar invalida trabalho pendente; reconstrução não avança texto nem campanha. Estados de execução permanecem fechado, preparando, ativo e saindo, com cancelamento válido em qualquer estado vivo. Retomada recompõe os alvos antes de liberar a leitura.

A migração deve partir dos dados atuais, inclusive ajustes manuais posteriores. O gerador histórico não deve ser reexecutado. É necessário mapear todas as chamadas117 e referências implícitas, atualizar os consumidores e só então retirar os helpers substituídos. Preserve IDs dos eventos narrativos; posições vazias no banco não são helpers ativos nem justificam renumerar todo o projeto. Uma revisão nativa inédita deve tratar saves e masters de QA incompatíveis sem apagá-los. O jogo atualmente aberto para revisão permanece intocado por esta análise.

A validação da futura implementação precisa demonstrar:

1. A mesma chamada de foco funciona para dois heróis de bases diferentes no mesmo slot, inclusive após várias alternâncias e chamadas repetidas.
2. Uma edição nativa de escala/posição afeta tanto a leitura normal quanto Continue, sem editar uma segunda receita.
3. Inserir/reordenar uma caixa não exige `restore` por índice nem desloca a composição das seguintes.
4. Todos os21 pares elegíveis herói/posição do Conselho, ausência de heróis e ida/volta de Andirá preservam a composição.
5. Perfil→fala, skip, HIDE, retorno das configurações, carregamento frio, redução de movimento e cancelamento mantêm os contratos existentes.
6. Textos, decisões, mortes, checkpoints e pictures alheias continuam iguais; o parser rejeita comandos fora da interface limitada, inclusive nos ramos não executados.

## Evidência desta análise

Foram executados parse dos dois projetos, inventário de chamadas/branches, agrupamento exato dos104 corpos de restauração, comparação dos plugins e leitura do resolvedor, do materializador e dos contratos. Os números e hashes estão no [registro estruturado](2026-09-11-bust-common-event-maintenance-evidence.json).

Não houve novo playtest, edição no MZ, alteração de JSON do jogo ou plugin. Os138 testes da entrega anterior não validam esta proposta. Os bloqueios anteriores de prisões visíveis e acesso ao editor também não são resolvidos por reduzir Common Events.
