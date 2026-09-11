# Referência de conversas — Map020 do ProjectX

Análise estática em 2026-09-11. A direção de adaptar o padrão existente, mantendo a autoria visível no editor, foi aceita durante a entrevista. As propostas exploratórias abaixo preservam a pesquisa original; o contrato atual e a autorização posterior de execução estão em [spec.md](spec.md) e [ADR-003](adrs/adr-003.md). Decisões da entrevista em [ADR-002](adrs/adr-002.md).

A consolidação posterior está em [spec.md](spec.md) e seus contratos. Este relatório preserva a pesquisa e sua justificativa; as recomendações exploratórias abaixo não substituem o contrato consolidado. A cobertura inclui os oito heróis da taverna, com perfis, conversas, seleção e grupo cheio. Gorvak com Ivaí pode ilustrar uma demonstração; não limita a entrega nem exige aprovação para seguir às outras conversas.

## Conclusão e estratégia

O exemplo é uma boa referência para **entrada progressiva dos participantes, permanência durante a conversa, destaque por escala e saída conjunta**. Ele já simplifica a autoria: antes da fala, o autor liga um switch; um Common Event executa o destaque usando o VNPictureBusts.

Recomendo adaptar essa receita para os nossos retratos e executar a apresentação na sequência do diálogo. O padrão reutilizável é **montar → destacar → mostrar texto → trocar o destaque → encerrar**. Não é necessário criar detecção automática de falante nem um novo sistema genérico de visual novel.

Na primeira implementação, a opção mais simples é materializar os comandos do plugin junto das falas, com valores explícitos editáveis. Common Events podem agrupar blocos de apresentação quando forem realmente reutilizáveis, chamados diretamente pelo diálogo e validados como parte dele. A conveniência de uma chamada curta não deve esconder um segundo catálogo de personagem, escala e posição em JavaScript.

“Mais genérico”, nesta recomendação, significa uma mesma receita de autoria para várias composições, respeitando o tamanho de cada arte. Não significa que um Common Event sem parâmetros consiga conhecer sozinho a escala correta de qualquer personagem colocado em um slot.

## O que o mapa realmente faz

Fonte: [Map020.json — Ex VNP Busts](/Users/edney/projects/coreto/projectX/frontend/data/Map020.json). O mapa tem 12 eventos não nulos e 15 páginas. Pela convenção atual do ProjectX, seu nome o classifica como referência legada de roteamento; isso não estabelece defeito ou autoriza alterá-lo.

| Evento, página 1 | Exemplo observado |
| --- | --- |
| 1 — 1x1 Conversation | Dois participantes entram em suas primeiras falas e saem juntos. |
| 2 — 1x2 Conversation | Três participantes; alternância do foco por switches. Também contém uma animação adicional, desnecessária para esta migração. |
| 14 — 2x2 Conversation | Quatro participantes, oito acionamentos de foco e nove caixas de texto durante a composição. A última caixa mantém o foco anterior. |
| 8 e 9 | Outros exemplos com até três participantes simultâneos, movimentos e substituições de imagem. |

Não encontrei um exemplo dedicado de **3x1**. É uma adaptação possível da composição de quatro participantes, a ser validada visualmente. O nome “2x2” também não define duas colunas simétricas: o evento usa posições específicas, incluindo uma central.

Os Common Events não são chamados pelo comando nativo `117` no mapa. A ligação é indireta por **Control Switches**, comando `121`, e gatilhos paralelos:

| Switch ligado antes da fala | Common Event | Imagem em destaque | Outras imagens tratadas |
| --- | --- | --- | --- |
| 43 — Fala-ID1 | 7 — Fala-ID1 | 1 | 2, 3, 4 |
| 44 — Fala-ID2 | 8 — Fala-ID2 | 2 | 1, 3, 4 |
| 45 — Fala-ID3 | 9 — Fala-ID3 | 3 | 1, 2, 4 |
| 46 — Fala-ID4 | 10 — Fala-ID4 | 4 | 1, 3, 2 |

Fonte: [CommonEvents.json do ProjectX](/Users/edney/projects/coreto/projectX/frontend/data/CommonEvents.json). Os quatro Common Events têm gatilho `Parallel`, 18 registros cada e nenhuma chamada a outro Common Event. Não há chamada oculta adicional nessa cadeia de foco.

Cada um executa a mesma receita:

1. `Tone_NormalBust` no falante, com duração de 20 frames.
2. `Scale_ScaleReset` no falante, com duração de 20 frames. A configuração global do projeto restaura 100% nos dois eixos.
3. `Tone_PresetBust` com `Dark` nos outros três slots.
4. `Scale_ScaleTo` para 90% nos outros três slots, também em 20 frames.
5. Espera nativa de um frame e desligamento do próprio switch.

O efeito de “vir para a frente” nessa receita vem de **tamanho e contraste**. Esses Common Events não deslocam o falante nem alteram sua ordem de sobreposição. O plugin ordena a sobreposição pelo Picture ID; aumentar a escala não traz uma imagem para cima das outras.

O plugin fornece os efeitos, enquanto os Common Events compõem a automação acionada pelo autor. Portanto, não é necessário repetir manualmente os quatro comandos em cada fala no projeto de referência; o autor repete somente o acionamento do switch. Isso corrige a distinção incompleta feita no início da entrevista sobre “ser manual”.

### Localizadores do exemplo 2x2

Índices base zero em `events[14].pages[0].list`:

| Participante | Picture ID | Posição | Entrada | Primeiro foco |
| --- | ---: | ---: | ---: | ---: |
| Thorin | 1 | 0 | 5 | 15: switch 43 |
| Mhordred | 3 | 10 | 21 | 31: switch 45 |
| Tharok | 4 | 7 | 35 | 45: switch 46 |
| Kilin | 2 | 5 | 51 | 61: switch 44 |

As trocas seguintes estão nos índices 69, 74, 79 e 84. A saída conjunta está no índice 92: `Basic_ExitBusts`, imagens `[1,2,3,4]`, duração 20, `InSine`, autoerase habilitado. As entradas usam duração 20, `OutSine` e deslocamento inicial horizontal de -200; o espelhamento varia. Esses números são evidência da referência, não valores aprovados para o nosso jogo.

## Adaptações necessárias

| Aspecto | ProjectX | Afogados em Terra Seca / consequência |
| --- | --- | --- |
| Plugin | VNPictureBusts 1.03 ativo | Mesmo arquivo, byte a byte, também ativo. Nenhuma compra ou substituição é necessária. |
| Tela | 1280 × 720 | Mesma resolução interna. |
| Posições horizontais | Margem configurada de 100 px | Margem de 200 px. Copiar os números de posição produz coordenadas diferentes. |
| Retratos do 2x2 | Os quatro PNGs têm 504 × 672 px | As dimensões variam muito. Restaurar 100% global ampliaria várias artes além do enquadramento desejado. |
| Espelhamento | `Auto-Reverse` e `Mirror` | A entrevista decidiu preservar a orientação original. Autoraremos `None`. |
| Pictures | Foco afeta IDs 1–4 | Esses IDs já pertencem ao cenário e às peças do mapa. Precisamos de uma faixa própria, após inventário de usos e limpeza. |
| Acionamento | Switches e quatro intérpretes paralelos | Recomendo comandos na sequência do diálogo, com o mesmo ciclo de cancelamento e retomada. |
| Duração da composição | Uma lista contínua do evento do mapa | Nosso Conselho é dividido em passagens; a apresentação precisa sobreviver entre elas. |

### Escala relativa à arte

Escolher uma escala-base por personagem e composição. Usar `Scale_ScaleTo` com valores absolutos calculados na autoria: **falante = base; ouvinte = 0,90 × base** como ponto inicial de avaliação. Evitar incrementos cumulativos e evitar `Scale_ScaleReset` global enquanto as artes não compartilharem uma escala-base adequada.

Exemplo aritmético, sem aprovar enquadramento: no layout atual, Ivaí usa aproximadamente 65,1042%; seu estado de ouvinte seria 58,5938%. Elowen usa aproximadamente 26,0417%; seu estado de ouvinte seria 23,4375%. Colocar ambos em 100% destruiria essa relação. As escalas atuais são referência de migração, não prova de que três bustos cabem bem à esquerda.

Sugiro avaliar primeiro a diferença de escala do exemplo. Um deslocamento adicional curto pode atender ao avanço pedido na entrevista, mas sua direção e amplitude ainda precisam ser definidas. A ordem de sobreposição permanece fixa nessa proposta; se “ir à frente” significar também cobrir os outros bustos, isso é outro requisito. Na continuação da entrevista, o usuário **aceitou escurecer suavemente os ouvintes, além de deixá-los um pouco menores**. A intensidade será calibrada; isso não aprova automaticamente o preset `Dark` da referência.

### Ordem e ciclo de vida

O padrão de switches funciona como automação de autoria na referência, mas liga apresentação a estado global e intérpretes paralelos. Não foi reproduzida nenhuma falha nesse mapa. O risco de transplantá-lo é ter comandos de foco fora do intérprete que o nosso pulo ou cancelamento encerra.

Recomendo execução sequencial dos comandos autorados. Uma eventual chamada direta de Common Event estabelece a ordem dos comandos, mas **não aguarda automaticamente o término da animação**. A política de prontidão da imagem, animação, leitura e saída deve ser explícita; não copiar a espera de um frame como garantia de carregamento.

Hoje `Present` cria um intérprete para uma única passagem. No Conselho, o CE 40 volta ao início após cada passagem; `Observe:encounter` limpa parte das pictures e `Observe:closing` apaga as imagens de 2 a 59. Isso precisa mudar de forma seletiva para que os participantes permaneçam visíveis entre falas. Apenas inserir quatro bustos dentro de cada trecho provocaria novas entradas ou limpeza a cada passagem.

Proposta: separar **fim da passagem** de **fim da conversa visual**. O controlador existente mantém somente o contexto transitório necessário para executar/limpar a composição autorada; a campanha continua dona dos participantes elegíveis e do cursor de leitura. Retomar uma passagem deve reconstruir a composição prevista para aquele ponto, sem repetir falas, decisões ou entradas animadas desnecessárias. Não criar um segundo cursor persistente de história.

## Padrão recomendado para o nosso jogo

- **Uma pessoa:** um busto no lado definido pela entrevista, com escala-base, sem pulsar repetidamente entre caixas consecutivas.
- **1x1:** herói à esquerda, Ivaí à direita. Cada um entra ao começar sua participação e permanece até o fim da conversa. A troca de falante muda somente os estados visuais necessários. O usuário confirmou que o perfil público e o diálogo seguinte da opção Conversar formam uma única conversa visual: o busto do herói atravessa essa fronteira e Ivaí entra na primeira fala dele.
- **2x2:** dois lugares de cada lado, usados apenas quando a cena realmente tiver dois participantes elegíveis de cada categoria. Não colocar um herói à direita nem inventar participantes para preencher a composição.
- **3x1:** até três heróis elegíveis à esquerda e Ivaí à direita. Os heróis mantêm os lugares que receberam ao entrar. O total de oito heróis do elenco não implica oito participantes no Conselho.
- **Entrada coletiva no Conselho — decisão posterior aceita:** os heróis presentes aparecem juntos já na cobrança de explicações, antes de suas opiniões individuais. Essa é uma exceção à entrada na primeira fala individual.
- **Saída:** comando de saída coletiva do plugin para as imagens presentes; limpeza de segurança seletiva também em skip, cancelamento, mudança de cena, título e campanha inválida.
- **HIDE e movimento reduzido:** preservar a composição ao ocultar a interface; retorno não avança texto. Proponho mudanças imediatas de foco e entrada/saída sem movimento quando a preferência de redução de movimento estiver ativa.

Não há hoje uma conversa 2x2 inventariada em Afogados em Terra Seca. O padrão pode ser uma receita de autoria e uma composição de teste, sem criar novas falas na campanha. O 3x1 tem aplicação direta nas opiniões do Conselho.

### Exceção decidida na entrevista: Andirá

A ordem atual é: narração inicial → confissão de Ivaí → fala de Andirá → opiniões dos heróis. Se todos permanecerem desde sua primeira fala até o fim do Conselho, podem coexistir **três heróis + Ivaí + Andirá: uma composição 3x2**, não 3x1.

Além disso, Andirá deve permanecer no reflexo; movê-lo para uma posição comum à direita pode violar essa composição canônica. Pérola e Floraí também têm suas prisões visuais preservadas. A regra geral dos lados precisa explicitar essas exceções.

A decisão posterior da entrevista é manter o padrão de até 3x1 durante as opiniões e tratar a intervenção de Andirá como uma composição própria, restrita ao reflexo, encerrada antes das opiniões. Os bustos dos heróis ficam temporariamente ocultos enquanto Andirá fala e voltam depois da saída dele. Ivaí permanece à direita. Não há saída narrativa dos heróis, mudança de formação ou alteração da ordem das falas; a composição 3x2 deixa de ser necessária para esse trecho.

Fundamento da decisão: a passagem apresenta “Agora escolha livremente” logo após a confissão de Ivaí; o GDD, §15, estabelece que o jogador escolhe como Ivaí. A leitura contextual é que **Andirá se dirige a Ivaí**, enquanto os heróis aconselham depois. O usuário aceitou Andirá à esquerda, oposto ao bardo à direita, como exceção explícita à regra geral dos lados e preservando o reflexo; depois confirmou a ocultação temporária dos bustos dos heróis e seu retorno para as opiniões. Essa confirmação posterior substitui a proposta inicial que havia sido retirada para reconsideração.

## Efeito sobre a spec atual

O rascunho deixa de descrever apenas a transferência de comandos do JavaScript para os eventos. Passa a incluir uma mudança visível de composição. Devem ser revisados em conjunto:

1. Objetivo, exclusões e requisitos de composição: múltiplos bustos, lados, foco e movimentos substituem a proposta anterior de um busto central sem transições.
2. Contrato de comandos: entrada, saída coletiva, escala, posição e o tom que vier a ser aceito. Se forem usados Common Events auxiliares, permitir somente os explicitamente validados, com suas dependências e sem ciclos; não liberar arbitrariamente switches, scripts ou chamadas de eventos.
3. Contrato de pictures e ciclo de vida: a imagem 18 isolada deixa de bastar; rever também os apagamentos em CE 3/40 e EventBridge. Nenhuma faixa nova foi reservada nesta análise.
4. Escopo de autoria: manter as 258 identidades e o texto das 103 caixas inventariadas, acrescentando os pontos de orquestração necessários. Não limitar a implementação aos 63 trechos se a continuidade exige ajustar seus chamadores.
5. Contratos de UI/UX e Technical Art: agora há composição e animação novas para revisar. A antiga justificativa para produzir somente contrato de Programação ficou desatualizada.
6. GDD e ADRs: registrar a substituição da regra de um busto por vez no Conselho quando o contrato visual estiver resolvido; não tratar o rascunho antigo como autoridade contra as novas decisões da entrevista.
7. Verificação: adicionar leitura com múltiplos participantes, escala relativa, continuidade entre passagens, retomada da composição e prova de edição no MZ. Manter a política de nova revisão nativa e recusa de saves incompatíveis sem apagar seus arquivos.

## Próxima sequência de trabalho

Seguir os contratos consolidados e o baseline de protótipo para calibrar os parâmetros visuais. Implementar todas as falas da taverna para os oito heróis, o Conselho e os demais trechos inventariados, validando entrada, foco, permanência, saída e retomada. Uma conversa pode ajudar no desenvolvimento inicial, mas o loop segue por todas as tarefas, incluindo QA e verificação final, sem pausas para aprovar amostras, escopo ou etapas. Corrigir falhas dentro do escopo e manter evidência honesta; a revisão humana posterior é refinamento não bloqueante, conforme ADR-003.

O materializador da migração pode preparar os comandos repetidos, mas os eventos nativos devem continuar sendo a fonte editável. Não criar um gerador que sobrescreva posteriormente as edições manuais do usuário. Não copiar retratos, textos, áudio, switches ou convenções de roteamento do ProjectX para o jogo.

Verificação futura: comparação estática do conteúdo; testes do parser e dos intérpretes; Chrome com assets frios/quentes; HIDE, skip, Continue, mudanças de cena e movimento reduzido; revisão visual das 12 artes e das composições com ocupação máxima. Uma captura isolada não comprova ausência de flicker ou continuidade de animação.

## Evidência e limites

Executado nesta análise: parse estruturado do mapa e dos Common Events; rastreamento dos switches e dos quatro eventos paralelos; leitura de configurações e documentação local; comparação dos arquivos do plugin e dimensões dos assets; inspeção do fluxo atual de leitura e limpeza. Não houve execução do jogo, playtest do ProjectX, captura visual, teste de animação ou alteração de dados/plugins de qualquer projeto. As sequências descritas são evidência estática, não aceitação visual.

Fontes principais, além dos links anteriores:

- [Plugin instalado no ProjectX](/Users/edney/projects/coreto/projectX/frontend/js/plugins/VisuMZ_2_VNPictureBusts.js), documentação de posições, Picture IDs, escala e tom.
- [Configuração do ProjectX](/Users/edney/projects/coreto/projectX/frontend/js/plugins.js) e [configuração do jogo](../../../rpg-maker/The%20Dryland%20Drowned/js/plugins.js).
- [EventBridge](../../../rpg-maker/The%20Dryland%20Drowned/js/plugins/Dryland_EventBridge.js), `Present`, `Observe`, `speakerBust`, encerramento e skip.
- [Regras da campanha](../../../rpg-maker/The%20Dryland%20Drowned/js/plugins/Dryland_CampaignRules.js), formação máxima e ordem do Conselho.
- [GDD canônico](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), autoria nativa, composição do Conselho, reflexo e controles de leitura.
- [Convenção de roteamento do ProjectX](/Users/edney/projects/coreto/projectX/docs/project-conventions/scene-routing-ex-vn.md), [ciclo de eventos](/Users/edney/projects/coreto/projectX/docs/project-conventions/rpg-maker-event-lifecycle.md), [diálogos de exploração](/Users/edney/projects/coreto/projectX/docs/architecture/exploration-dialogue-gabwindow.md) e [inventário de apresentação](/Users/edney/projects/coreto/projectX/docs/domains/scene-presentation-designer/README.md). São contexto da referência; não governam o design de Afogados em Terra Seca.

Identificação da referência no momento da leitura:

| Arquivo | SHA-256 |
| --- | --- |
| ProjectX Map020.json | `e2777d1a239af0304bcc03ecd37bf066b995ce4ff60e5cdce5216f8156cff42f` |
| ProjectX CommonEvents.json | `ed899d649549079a9c71886b515554b99ad810a247aad3bf4f16ab0ed003a336` |
| ProjectX plugins.js | `b458322a89fc150d2db597553c0501fd28e011a63c439f2f52cea20060e59bd5` |
| VNPictureBusts.js, idêntico nos dois projetos | `a4013494d5bd7d996cc39ce00e4817c93d96c54a7c32782ae666ef55a42d203c` |

Os fatos necessários da referência estão transcritos aqui; o checkout externo não deve virar dependência de execução da spec. O inventário e os hashes da implementação atual permanecem em [inventory.md](inventory.md) e [source-evidence.json](source-evidence.json).
