# GDD — Visual Novel de Expedição, Armadilhas e Sacrifício

**Título provisório:** Projeto sem título\
**Versão:** 0.6 — fluxo mecânico e randomização consolidados\
**Data:** 30 de agosto de 2026\
**Estado:** fluxo de expedição, randomização e catálogo de armadilhas aprovados\
**Gênero:** visual novel de horror psicológico e sobrenatural, sem combate\
**Duração-alvo:** até 20 minutos por masmorra e aproximadamente 60 minutos por campanha completa, sem contar repetições\
**Autoridade:** este é o GDD canônico do projeto e substitui as versões 0.1, 0.2, 0.3, 0.4 e 0.5 como fonte de verdade.

---

## 1. Como interpretar este documento

Este GDD consolida as decisões das versões históricas e a revisão temática brasileira do catálogo. Quando houver conflito com materiais anteriores, prevalecem as regras expressas neste documento.

Documentos de origem disponíveis neste repositório, mantidos apenas como histórico:

- [GDD v0.1](./GDD_Visual_Novel_Expedicao_e_Sacrificio_v0.1.md)
- [GDD v0.2](./GDD_Visual_Novel_Expedicao_e_Sacrificio_v0.2.md)

Cada definição recebe um dos seguintes estados:

| Estado | Significado | Consequência para a equipe |
|---|---|---|
| **Confirmado** | Decisão vigente e aprovada | Deve ser implementada e não pode ser alterada sem nova decisão de design |
| **Baseline de protótipo** | Regra ou conteúdo provisório necessário para tornar o protótipo executável | Deve ser usado no protótipo; só se torna definitivo após validação |
| **Pendente** | Questão deliberadamente não decidida | Não deve ser presumida nem implementada como regra definitiva |
| **Fora do escopo** | Elemento excluído da primeira versão representativa | Não deve consumir produção nesta etapa |

Uma decisão pendente não invalida as regras confirmadas que a cercam. Por exemplo: a natureza do tesouro continua pendente, embora a masmorra final e as condições mecânicas de vitória e derrota já possuam regras confirmadas.

### 1.1 Decisões que substituem versões anteriores

| Elemento | Regra vigente | Estado | Regra substituída |
|---|---|---|---|
| Heróis escolhidos por expedição | 3 | Confirmado | 4 na v0.1 |
| Formação da expedição | Bardo obrigatório + 3 heróis | Confirmado | Posição do bardo indefinida na v0.1 |
| Competências do bardo | Nenhuma | Confirmado | Indefinidas na v0.1 |
| Competências do elenco | 8 | Confirmado | 6 na v0.1 |
| Ocorrências por competência no elenco | Exatamente 2 | Confirmado | Distribuição assimétrica na v0.1 |
| Pares de competências | Matriz H1–H8, com pares únicos | Confirmado | Pares indefinidos na v0.1 |
| Abordagens por encontro | Exatamente 3 | Confirmado | 2 na v0.2; 3 na v0.1 |
| Estados de viabilidade | 0/3, 1/3, 2/3 e 3/3 | Confirmado | 0/2, 1/2 e 2/2 na v0.2 |
| Falha sem competência | Sempre letal | Confirmado | “Falha grave” na v0.1 |
| Natureza das duas primeiras masmorras | Separação estrita entre ameaça física e sobrenatural | Confirmado | Separação apenas predominante nas versões anteriores |
| Catálogo de encontros | 8 por pool; 16 encontros aprovados | Confirmado | Divisão entre encontros confirmados e provisórios na v0.4 |
| Distribuição das competências nos pools | Pool A: 2 corpóreas + 1 liminar por encontro; Pool B: 1 corpórea + 2 liminares | Confirmado | Matriz anterior da v0.4 |
| Sorteio dos encontros | Preenchimento uniforme, sem repetição e persistente por posição revelada | Confirmado | Embaralhamento integral como baseline de protótipo |
| Recuo voluntário | Permitido antes da escolha de abordagem quando o elenco total ainda possui ao menos 3 heróis | Confirmado | Comportamento pendente na v0.5 |
| Formação com elenco reduzido | Todos os sobreviventes quando restarem apenas 1 ou 2 heróis | Confirmado | Comportamento pendente na v0.5 |
| Masmorra final | 3 encontros restantes do Pool A + 3 do Pool B, em ordem aleatória | Confirmado | Baseline 2 + 2 + 1 com encontro exclusivo na v0.5 |

### 1.2 Regra confirmada das três abordagens

O jogo usa definitivamente **três abordagens por encontro**. A variante de duas abordagens não faz parte do plano vigente.

---

## 2. Resumo executivo

O jogador acompanha um bardo que reuniu oito heróis para encontrar um tesouro ligado à própria família. O mapa até o tesouro foi dividido entre uma masmorra física e uma masmorra sobrenatural; as duas metades revelam a masmorra final.

Antes de cada expedição, o jogador escolhe três heróis sobreviventes quando o elenco possui ao menos três. Se restarem somente um ou dois, todos os sobreviventes partem. O bardo acompanha o grupo automaticamente, mas não ocupa vaga selecionável e não possui competências. As duas primeiras masmorras contêm cinco encontros; a final contém os seis encontros ainda não vistos, três de cada pool. Cada encontro oferece três abordagens plausíveis, associadas internamente a competências diferentes.

Se pelo menos um herói sobrevivente possuir a competência da abordagem escolhida, a ação funciona. Se a competência estiver ausente, a falha é letal e o jogador escolhe um herói presente para morrer. A morte é permanente, remove duas competências do elenco disponível e pode tornar os encontros seguintes mais perigosos.

Não há combate, rolagens, níveis, experiência ou progressão numérica. O desafio nasce da preparação, da leitura das pistas e da responsabilidade por cada sacrifício.

---

## 3. Visão e experiência pretendida

### 3.1 Fantasia central

Ser responsável por reunir, conduzir e tentar preservar um pequeno grupo de aventureiros em expedições nas quais a preparação pode ser tão importante quanto a decisão tomada diante do perigo.

### 3.2 Pilares de experiência

1. **Preparação com consequências:** escolher quem entra também define quais respostas ficam de fora.
2. **Leitura justa, mas não explícita:** o sistema não revela a competência das opções, porém oferece pistas consistentes para inferência e aprendizado.
3. **Perda emocional e estratégica:** cada morte elimina uma pessoa e duas capacidades mecânicas.
4. **Horror por responsabilidade:** o jogador escolhe a abordagem, a vítima e as lacunas que aceita carregar.
5. **Aprendizado entre tentativas:** uma falha deve ser compreensível retrospectivamente e melhorar decisões futuras.

### 3.3 Emoções pretendidas

- Estresse emocional.
- Culpa pelas consequências das próprias decisões.
- Apego crescente aos heróis.
- Medo de perder um personagem importante emocional ou mecanicamente.
- Insegurança diante de opções aparentemente plausíveis.
- Tensão entre preservar pessoas queridas e preservar competências.
- Satisfação ao compreender corretamente uma armadilha.
- Arrependimento ao reconhecer uma pista ignorada.
- Sensação de que certas tragédias começaram na seleção do grupo.

### 3.4 Contrato de aprendizado

O jogo não explica explicitamente todas as relações entre heróis, competências e abordagens. Ainda assim, cada encontro deve permitir que o jogador:

1. formule uma hipótese;
2. escolha uma abordagem;
3. observe o resultado;
4. compreenda retrospectivamente por que funcionou ou falhou;
5. use esse conhecimento em uma tentativa futura.

Uma falha que não possa ser explicada retrospectivamente é um problema de escrita ou apresentação, não uma forma válida de dificuldade.

---

## 4. Premissa narrativa

O protagonista é um bardo ligado a um antigo tesouro de sua família. A localização do tesouro está registrada em um mapa dividido em duas partes:

1. a primeira metade está escondida na masmorra física;
2. a segunda metade está escondida na masmorra sobrenatural;
3. reunidas, as metades revelam a localização da masmorra final;
4. a masmorra final contém o tesouro familiar e o clímax da história.

A ordem vigente da campanha é, portanto: **masmorra física → masmorra sobrenatural → masmorra final**.

A natureza do tesouro e do horror familiar está pendente. Possibilidades registradas, mas não aprovadas:

- uma maldição familiar;
- uma entidade aprisionada;
- um pacto ancestral;
- um segredo que mude a compreensão das expedições;
- um objeto que exija novos sacrifícios;
- a revelação de que o bardo sabia mais do que admitiu.

---

## 5. Estrutura da campanha

### 5.1 Elenco e persistência

- Existem oito heróis recrutáveis.
- O jogador escolhe exatamente três heróis sobreviventes enquanto o elenco total possui ao menos três.
- Se restarem somente um ou dois heróis no elenco total, todos partem na expedição seguinte.
- Cada herói possui exatamente duas competências.
- Cada par de competências é único.
- Cada competência aparece em exatamente dois heróis.
- Os heróis não sobem de nível e não recebem melhorias numéricas.
- A morte é permanente durante a campanha atual.
- Heróis mortos não podem participar de expedições posteriores.
- A campanha termina em derrota se os oito heróis morrerem; nesse momento, o bardo também morre e ocorre o bad ending.

### 5.2 Masmorras

A campanha possui três masmorras, com duração-alvo de até 20 minutos cada.

| Masmorra | Objetivo | Fonte dos encontros | Natureza das ameaças |
|---|---|---|---|
| **Física** | Obter a primeira metade do mapa | Pool A | Material, mecânica, ambiental, arquitetônica, animal ou corporal |
| **Sobrenatural** | Obter a segunda metade do mapa | Pool B | Psicológica, ilusória, ritual, espiritual ou ligada à distorção da identidade e da realidade |
| **Final** | Encontrar o tesouro e concluir a campanha | 3 encontros restantes do Pool A + 3 do Pool B | Combinação das duas naturezas e horror familiar |

Cada uma das duas primeiras masmorras usa exclusivamente o próprio pool. A separação estrita diz respeito à **natureza da ameaça**, enquanto a matriz controla a natureza das abordagens: cada encontro físico oferece duas competências corpóreas e uma liminar; cada encontro sobrenatural oferece uma corpórea e duas liminares. Uma ameaça material ainda pode ser superada por Ocultismo, e uma manifestação sobrenatural por Força, desde que a situação sustente essa lógica.

### 5.3 Quantidade e sorteio

- Cada pool contém oito encontros-base.
- Cada masmorra inicial possui cinco posições de encontro.
- Uma posição vazia é preenchida imediatamente antes de ser revelada, por sorteio uniforme entre os encontros ainda não atribuídos daquele pool.
- Depois de revelado, o encontro permanece naquela posição até o fim da campanha, inclusive após recuos.
- Posições ainda não alcançadas permanecem vazias até a primeira revelação.
- Um encontro não se repete entre as posições da mesma masmorra.
- O sorteio não consulta a composição do grupo.
- O jogo não adiciona nem remove encontros para salvar ou punir uma composição específica.
- A masmorra final usa os três encontros de cada pool que não apareceram nas duas primeiras masmorras e embaralha uniformemente os seis.
- Uma nova campanha apaga todas as posições persistentes e realiza novos sorteios.

O algoritmo completo de preenchimento, persistência e repetição é confirmado na seção 11.

---

## 6. O bardo

### 6.1 Função narrativa

O bardo:

- é o ponto de vista principal;
- reuniu os oito heróis;
- acompanha todas as expedições;
- registra ou narra a história do grupo;
- não é o principal combatente;
- dá unidade a uma história de elenco coletivo;
- possui uma ligação pessoal com o objetivo final.

### 6.2 Participação mecânica

O bardo possui **zero competências**. Consequentemente, ele:

- não torna nenhuma abordagem viável;
- não aumenta a cobertura do grupo;
- não resolve armadilhas;
- não interfere na simetria das competências;
- não substitui mecanicamente um herói morto;
- não participa da verificação de sucesso.

### 6.3 Morte do bardo

O bardo nunca aparece na seleção de sacrifício e não pode morrer em uma armadilha enquanto existir ao menos um herói vivo no elenco total. Se o último herói da expedição morrer, o bardo recua automaticamente quando ainda houver heróis na cidade.

Quando os oito heróis estiverem mortos, o bardo também morre e a campanha termina imediatamente no bad ending. Esta é a única condição mecânica vigente para a morte do bardo.

---

## 7. Loop principal

1. O jogador lê a apresentação da próxima masmorra.
2. Examina os heróis sobreviventes.
3. Interpreta históricos, profissões, falas, equipamentos e características.
4. Escolhe três heróis, ou todos os sobreviventes quando restarem somente um ou dois.
5. O bardo acompanha o grupo automaticamente.
6. O jogo prepara cinco posições nas masmorras iniciais ou seis na final, preservando qualquer posição já revelada na campanha.
7. Cada encontro apresenta três abordagens.
8. As três abordagens permanecem visíveis.
9. O jogo não informa quais abordagens são viáveis.
10. Antes de escolher uma abordagem, o jogador pode recuar se o elenco total ainda possuir ao menos três heróis; isso continua possível depois que a armadilha foi revelada.
11. O jogador escolhe uma abordagem, não um executor.
12. A escolha da abordagem bloqueia o recuo até que toda a consequência seja resolvida.
13. O sistema verifica coletivamente os heróis sobreviventes presentes.
14. Se a competência correspondente estiver presente, ocorre sucesso.
15. Se estiver ausente, ocorre falha letal.
16. Em uma falha, o jogador escolhe um herói presente para ser sacrificado; o bardo nunca aparece nessa seleção.
17. O herói morre permanentemente.
18. Suas competências são removidas da expedição e do elenco disponível.
19. A cobertura do grupo é recalculada.
20. O grupo prossegue mesmo quando resta somente um herói.
21. Se o último herói presente morrer, o bardo recua automaticamente quando houver sobreviventes na cidade; se os oito heróis estiverem mortos, ocorre o bad ending.
22. Após cinco encontros nas masmorras iniciais ou seis na final, a expedição alcança seu objetivo.
23. Depois das duas primeiras masmorras, o grupo acessa a masmorra final.

---

## 8. Sistema de competências

### 8.1 Regras

- Existem oito competências.
- Cada herói possui duas.
- Cada competência aparece em dois heróis.
- Os pares são únicos.
- As competências são binárias: presentes ou ausentes.
- Não existem valores numéricos nem rolagens.
- Uma única ocorrência da competência garante o sucesso.
- Redundância não melhora o resultado imediato.
- Redundância apenas pode preservar uma competência depois de uma morte.
- O bardo não participa da verificação.

### 8.2 Competências e fronteiras

| Competência | Definição operacional | Verbos e ideias recorrentes |
|---|---|---|
| **Força** | Potência física contra peso, resistência ou bloqueio | sustentar, erguer, romper, empurrar, conter |
| **Destreza** | Precisão manual, coordenação fina e manipulação delicada | manipular, encaixar, cortar, destravar, ajustar |
| **Percepção** | Identificação de padrões, perigos, incoerências e sinais ocultos | observar, localizar, identificar, notar, comparar |
| **Conhecimento** | Aplicação de estudo técnico, acadêmico, histórico ou arquitetônico | reconstruir, interpretar, calcular, compreender |
| **Ocultismo** | Compreensão e interferência em fenômenos sobrenaturais | romper selo, inverter rito, conter entidade, neutralizar símbolo |
| **Vontade** | Resistência ao medo, compulsão, manipulação e desintegração psicológica | resistir, ignorar, preservar identidade, permanecer imóvel |
| **Sobrevivência** | Adaptação ao ambiente, rastreamento, navegação, improvisação e primeiros socorros | rastrear, improvisar, contornar, tratar, orientar |
| **Atletismo** | Movimento corporal, corrida, salto, escalada, natação e resistência física | correr, saltar, nadar, escalar, atravessar rapidamente |

As formas de superar uma ameaça material não são intercambiáveis:

| Situação | Competência correta |
|---|---|
| Sustentar uma porta pesada | Força |
| Passar rapidamente antes que a porta feche | Atletismo |
| Manipular a trava interna | Destreza |
| Identificar qual peça aciona a porta | Percepção |
| Compreender o projeto do mecanismo | Conhecimento |
| Improvisar uma rota segura ao redor | Sobrevivência |

### 8.3 Famílias de competências nos pools

Para distribuir as abordagens entre ameaças físicas e sobrenaturais, as competências são agrupadas em duas famílias:

| Família | Competências | Função no catálogo |
|---|---|---|
| **Corpóreas** | Força, Destreza, Sobrevivência e Atletismo | Intervenção física, movimento, adaptação ambiental e manipulação material |
| **Liminares** | Percepção, Conhecimento, Ocultismo e Vontade | Leitura do insólito, interpretação, interferência ritual e resistência psicológica |

“Liminar” não significa poder mágico. Percepção e Conhecimento continuam competências mundanas; o termo indica que elas permitem reconhecer ou interpretar o limite entre o material e o sobrenatural.

Cada encontro do Pool A usa duas competências corpóreas e uma liminar. Cada encontro do Pool B usa uma competência corpórea e duas liminares. Essa proporção define a identidade mecânica dos pools e é auditada na seção 12.4.

---

## 9. Matriz mecânica dos heróis

Os códigos H1–H8 são identificadores provisórios. Não definem nome, gênero, aparência, personalidade ou profissão.

| Herói | Competência 1 | Competência 2 |
|---|---|---|
| H1 | Força | Vontade |
| H2 | Destreza | Atletismo |
| H3 | Percepção | Sobrevivência |
| H4 | Conhecimento | Ocultismo |
| H5 | Força | Conhecimento |
| H6 | Destreza | Percepção |
| H7 | Ocultismo | Atletismo |
| H8 | Vontade | Sobrevivência |

### 9.1 Validação da matriz

Cada competência aparece exatamente duas vezes e os 16 espaços disponíveis são usados: 8 heróis × 2 competências = 8 competências × 2 ocorrências.

Nenhum par se repete. Portanto, heróis que compartilham uma competência não são substitutos completos. H1 e H5, por exemplo, compartilham Força, mas perder H1 remove Vontade, enquanto perder H5 remove Conhecimento.

### 9.2 Cobertura inicial

Entre os 56 trios possíveis:

| Competências diferentes | Trios | Proporção |
|---:|---:|---:|
| 4 | 8 | 14,3% |
| 5 | 32 | 57,1% |
| 6 | 16 | 28,6% |

Três heróis nunca cobrem as oito competências. Entretanto, qualquer trio com seis competências possui ao menos uma solução interna para todo encontro de três competências distintas. Essa consequência é detalhada na seção 17.

---

## 10. Estrutura dos encontros

### 10.1 Regra das três abordagens

Cada encontro apresenta exatamente três abordagens. As três:

- devem parecer plausíveis;
- correspondem a três competências diferentes;
- não revelam seus rótulos ao jogador;
- podem representar desarmar, evitar, atravessar, resistir ou compreender a ameaça;
- têm sucesso garantido quando a competência está presente;
- provocam falha letal quando a competência está ausente.

O termo recomendado é **“superar a armadilha”**, pois nem toda abordagem a desarma literalmente.

### 10.2 Estados de viabilidade

| Estado | Opções viáveis | Interpretação |
|---|---:|---|
| **0 de 3** | 0 | Qualquer abordagem provoca falha letal |
| **1 de 3** | 1 | Existe uma abordagem segura e duas fatais |
| **2 de 3** | 2 | Existem duas abordagens seguras e uma fatal |
| **3 de 3** | 3 | Qualquer abordagem funciona |

Os quatro estados são válidos. Uma composição não tem garantia universal de saída, exceto quando cobre seis competências e ainda mantém seus três heróis vivos.

### 10.3 Requisitos de escrita

- Todas as opções ficam visíveis, mesmo quando inviáveis.
- Todas as opções permanecem selecionáveis; nenhuma pode ser bloqueada por personagem, ordem, tentativa anterior ou condição narrativa.
- Não há “opção obviamente idiota”.
- O jogador escolhe uma abordagem, não o herói que a executa.
- Verbos semelhantes apontam para competências semelhantes.
- Uma competência não muda de significado entre cenas.
- Abordagens bem-sucedidas podem variar em texto e encenação imediata, mas não alteram competências, opções nem encontros posteriores.
- O resultado pode variar em texto, mas não em probabilidade.
- Toda falha deve ser explicável retrospectivamente.

---

## 11. Randomização

### 11.1 Preenchimento das masmorras iniciais

Para cada uma das duas primeiras masmorras:

1. criar cinco posições inicialmente vazias;
2. imediatamente antes de revelar uma posição vazia, sortear uniformemente um encontro entre os ainda não atribuídos do pool correspondente;
3. atribuir o encontro à posição e revelá-lo;
4. manter essa atribuição até o fim da campanha;
5. deixar posições ainda não alcançadas vazias;
6. impedir repetição dentro das cinco posições;
7. não consultar as competências do grupo;
8. registrar a semente e as atribuições para QA.

O preenchimento progressivo é estatisticamente equivalente a embaralhar uniformemente o pool e tomar os cinco primeiros, mas só compromete uma posição quando o jogador está prestes a vê-la. Depois da revelação, recuar nunca rerrola aquela posição.

### 11.2 Preenchimento da masmorra final

Depois que as duas primeiras masmorras forem concluídas, restam exatamente três encontros não utilizados em cada pool. A masmorra final:

1. reúne os três encontros restantes do Pool A e os três do Pool B;
2. cria seis posições inicialmente vazias;
3. imediatamente antes de revelar uma posição vazia, sorteia uniformemente um dos seis encontros ainda não atribuídos;
4. preserva cada atribuição revelada até o fim da campanha;
5. deixa posições ainda não alcançadas vazias;
6. não cria encontro nem regra mecânica exclusiva nesta versão.

Uma campanha concluída apresenta, portanto, todos os 16 encontros confirmados do catálogo.

### 11.3 Recuos, campanhas e sementes

- Recuar retorna a tentativa à primeira posição, mas não apaga atribuições já reveladas.
- Posições ainda não alcançadas continuam vazias e são sorteadas somente na primeira revelação.
- Uma nova campanha, iniciada depois de vitória ou derrota, apaga todas as atribuições e sorteia novamente.
- A repetição deliberada de uma semente existe somente para QA e não é uma opção normal do jogador.

### 11.4 Proibições

O sorteio não deve:

- garantir uma solução;
- criar deliberadamente um encontro impossível;
- retirar encontros porque o grupo está vulnerável;
- favorecer competências ou personagens populares;
- rejeitar sequências ou rerrolar encontros sorteados;
- alterar as abordagens depois da seleção do grupo.

### 11.5 Concentração de competências

Cada competência aparece seis vezes no catálogo completo, distribuída de acordo com sua família: competências corpóreas aparecem quatro vezes no Pool A e duas no Pool B; competências liminares aparecem duas vezes no Pool A e quatro no Pool B. Ainda assim, uma seleção de cinco encontros pode concentrar determinadas combinações.

O sorteio puro sem repetição é a regra confirmada. Sequências concentradas continuam válidas e devem ser registradas para QA; qualquer filtro futuro exigirá uma nova decisão de design, não será introduzido automaticamente por resultado de playtest.

---

## 12. Catálogo de armadilhas

### 12.1 Estados de conteúdo

| Conteúdo | Estado |
|---|---|
| A1–A8 e B1–B8 | Confirmado |
| Oito encontros por pool | Confirmado como escopo |
| Duas competências corpóreas e uma liminar por encontro do Pool A | Confirmado |
| Uma competência corpórea e duas liminares por encontro do Pool B | Confirmado |
| Seis ocorrências de cada competência no catálogo completo | Confirmado |

Os 16 encontros formam uma única matriz vigente. Qualquer reescrita deve preservar três competências distintas, a proporção entre famílias no respectivo pool e seis ocorrências totais de cada competência; caso contrário, a matriz inteira deve ser recalculada.

### 12.2 Pool A — Masmorra Física

#### Identidade

A masmorra física transforma lugares e assombrações do imaginário brasileiro em ameaças materiais. Mata fechada, casarão, engenho, cavalariça, pomar, depósito e telhado compõem um percurso de esmagamento, fogo, vidro, raízes, lâminas e espaços confinados. O elemento folclórico determina a linguagem da cena, mas a consequência imediata é corporal.

#### A1. O Redemoinho do Saci Engarrafado

Uma oficina abandonada está cercada por garrafas escuras, todas fechadas com pequenas presilhas de latão. Quando a primeira se quebra, um redemoinho atravessa o cômodo, arranca lascas das paredes e incorpora os cacos ao próprio giro.

| Abordagem apresentada | Competência interna | Lógica |
|---|---|---|
| Travar a comporta de ventilação e obrigar o vento a mudar de direção | Força | Potência física contra a pressão do redemoinho |
| Fechar as presilhas das garrafas antes que libertem novos turbilhões | Destreza | Manipulação rápida e precisa entre vidro e metal |
| Seguir a fuligem e os cacos para localizar o olho imóvel do redemoinho | Percepção | Leitura do padrão oculto dentro do movimento caótico |

**Falha:** os redemoinhos se unem e fecham a saída com uma muralha de cacos. Um herói precisa abrir a comporta por dentro e permanecer como lastro enquanto o vento o arrasta para longe dos demais.

#### A2. A Trilha de Pés Virados

Uma trilha de terra atravessa uma mata que cresceu para dentro da construção. Pegadas com os calcanhares voltados para a frente indicam caminhos diferentes, enquanto cipós tensionados e estacas escondidas convertem cada direção errada em uma armadilha física.

| Abordagem apresentada | Competência interna | Lógica |
|---|---|---|
| Soltar os nós invertidos sem liberar a tensão das estacas | Destreza | Manipulação delicada do mecanismo oculto nos cipós |
| Abandonar as pegadas e orientar-se pelo vento, pela inclinação e pela vegetação | Sobrevivência | Navegação baseada no ambiente real |
| Reconstruir a regra dos rastros de pés virados e identificar o único desvio coerente | Conhecimento | Aplicação do repertório folclórico à lógica da trilha |

**Falha:** as árvores tombam como cancelas e empurram o grupo para um corredor de estacas. Um herói precisa segurar o último tronco enquanto os outros escapam pela passagem estreita.

#### A3. O Pilão da Cuca

Uma cozinha de engenho contém um pilão grande o bastante para esmagar uma pessoa. O socador percorre trilhos no teto e muda de direção ao som de uma cantiga de ninar emitida por uma caixa sem corda.

| Abordagem apresentada | Competência interna | Lógica |
|---|---|---|
| Improvisar cunhas com madeira, fibras e cascas para desviar os trilhos | Sobrevivência | Uso dos materiais disponíveis contra o mecanismo |
| Atravessar os pilões menores acompanhando o ritmo dos impactos | Atletismo | Movimento corporal, salto e tempo de travessia |
| Apagar o verso que prende a cantiga ao socador | Ocultismo | Ruptura do vínculo sobrenatural que comanda a máquina |

**Falha:** o socador abandona os trilhos e passa a perseguir o grupo. Um herói precisa atraí-lo para o pilão central e permanecer sob o impacto que bloqueia a máquina.

#### A4. A Jaula do Mapinguari

Costelas de ferro fecham-se ao redor de um salão coberto de pelos grossos e marcas de garras. Um rugido vindo de lugar nenhum paralisa os músculos enquanto as barras comprimem lentamente tudo o que está dentro.

| Abordagem apresentada | Competência interna | Lógica |
|---|---|---|
| Escalar as costelas antes que o espaço entre elas desapareça | Atletismo | Escalada e velocidade corporal |
| Conter duas barras e abrir uma passagem à força | Força | Potência física contra a compressão da jaula |
| Resistir ao rugido e alcançar a trava sem se encolher | Vontade | Domínio da paralisia e do terror induzido |

**Falha:** as costelas fecham-se de uma vez. Um herói precisa ocupar o centro e receber a compressão para manter um último vão aberto aos demais.

#### A5. A Cavalariça da Mula-sem-Cabeça

Uma cavalariça de pedra abriga uma carcaça equina de ferro ligada a foles e caldeiras. Sem cabeça, ela percorre baias estreitas enquanto expele fogo pelo pescoço e arrasta correntes incandescentes pelo chão.

| Abordagem apresentada | Competência interna | Lógica |
|---|---|---|
| Erguer a grade de alimentação e prender a carcaça em uma baia | Força | Potência contra o peso da grade e o avanço da máquina |
| Desconectar o fecho do arreio sem tocar nas correntes aquecidas | Destreza | Precisão manual em um mecanismo perigoso |
| Identificar o ciclo de pressão e abrir a válvula entre duas descargas | Conhecimento | Compreensão técnica dos foles e da caldeira |

**Falha:** a caldeira entra em sobrepressão e transforma a saída em uma fornalha. Um herói precisa continuar operando a válvula junto à carcaça até que os outros atravessem.

#### A6. O Pomar do Corpo-Seco

Um cadáver ressequido foi incorporado ao tronco central de um pomar subterrâneo. Suas raízes atravessam outros corpos e apertam o corredor como dedos, enquanto frutos duros caem e se abrem cheios de dentes humanos.

| Abordagem apresentada | Competência interna | Lógica |
|---|---|---|
| Arrancar as raízes principais antes que fechem a passagem | Força | Potência física contra a massa vegetal |
| Identificar fibras mortas e improvisar um túnel entre os pontos sem seiva | Sobrevivência | Leitura e uso prático do ambiente orgânico |
| Romper o nome que prende o cadáver à terra | Ocultismo | Interferência no vínculo que anima as raízes |

**Falha:** as raízes formam um nó vivo ao redor do grupo. Um herói precisa deixar-se envolver pelo tronco para que a planta solte os demais e complete o enxerto.

#### A7. O Depósito do Homem do Saco

Sacos pendem de ganchos móveis em um depósito sem janelas. Alguns contêm apenas areia; outros se debatem e chamam os heróis pelas vozes de pessoas conhecidas enquanto uma esteira conduz todos para uma prensa.

| Abordagem apresentada | Competência interna | Lógica |
|---|---|---|
| Destravar os ganchos certos e abrir espaço entre os sacos | Destreza | Manipulação precisa dos fechos da esteira |
| Balançar entre as correntes e alcançar a saída antes da prensa | Atletismo | Mobilidade, impulso e coordenação corporal |
| Ignorar as vozes conhecidas e não abrir os sacos que pedem ajuda | Vontade | Resistência à culpa e à compulsão afetiva |

**Falha:** os ganchos recolhem os sacos e fecham o corredor. Um herói precisa ocupar um deles e seguir para a prensa para que o contrapeso libere a saída.

#### A8. O Telhado da Pisadeira

O grupo entra no forro baixo de um casarão, onde telhas e vigas descem a cada passo pesado ouvido acima. A presença nunca aparece inteira: somente pés ossudos projetam marcas no reboco enquanto o teto comprime o peito de quem está embaixo.

| Abordagem apresentada | Competência interna | Lógica |
|---|---|---|
| Distribuir o peso pelas vigas mestras e improvisar apoios para o teto | Sobrevivência | Adaptação à estrutura instável com materiais locais |
| Rastejar entre os caibros antes da próxima passada | Atletismo | Velocidade e controle corporal em espaço confinado |
| Distinguir os passos reais dos ecos e localizar a faixa que não será pisada | Percepção | Identificação do padrão escondido no som e no reboco |

**Falha:** dois pés surgem sobre a mesma viga e o telhado desaba em sequência. Um herói precisa permanecer sob a viga mestra e sustentar o impacto tempo suficiente para os demais saírem.

### 12.3 Pool B — Masmorra Sobrenatural

#### Identidade

A masmorra sobrenatural é uma noite de visagens brasileiras na qual assobios, presságios, procissões, reflexos e vozes adquirem vontade própria. As ameaças atacam memória, identidade e percepção antes de assumir qualquer forma material. As figuras do folclore não funcionam como uma coleção de monstros: cada encontro corrompe um sinal familiar e o transforma em regra de horror.

#### B1. O Assobio da Matinta

Um assobio atravessa as frestas de um casarão e responde com a voz do último herói que falou. Cada resposta apaga uma palavra das lembranças do grupo, enquanto portas e janelas respiram como bocas tentando repetir os nomes restantes.

| Abordagem apresentada | Competência interna | Lógica |
|---|---|---|
| Comparar o assobio com os ecos e localizar a fresta que responde antes do som | Percepção | Identificação da origem impossível por uma quebra de padrão |
| Reunir as promessas riscadas nas paredes e descobrir qual delas nunca foi feita | Conhecimento | Reconstrução histórica das contradições deixadas no casarão |
| Arrancar o postigo onde o assobio se aloja e expô-lo ao lado de fora | Força | Intervenção física sobre o único suporte material da presença |

**Falha:** o assobio rouba todas as vozes ao mesmo tempo. Um herói precisa responder com o próprio nome e tornar-se a nova voz da casa para que os demais sejam esquecidos pela presença.

#### B2. A Procissão das Almas

Uma procissão atravessa o corredor sem mover os pés. Cada figura carrega uma vela e um pano bordado com o nome de alguém do grupo; quando a chama correspondente se apaga, a pessoa começa a desaparecer das lembranças dos companheiros.

| Abordagem apresentada | Competência interna | Lógica |
|---|---|---|
| Encontrar a única figura cuja sombra aponta contra a luz das velas | Percepção | Detecção da presença que conduz o cortejo |
| Apagar dos panos o vínculo que atribui os vivos à procissão | Ocultismo | Ruptura da amarra sobrenatural entre nome e vítima |
| Desmanchar a costura de cada nome sem rasgar o tecido funerário | Destreza | Precisão manual para desfazer o suporte físico do vínculo |

**Falha:** as chamas se apagam e a procissão reconhece todo o grupo. Um herói precisa tomar a vela da frente e seguir com os mortos para conduzir o cortejo para longe dos demais.

#### B3. Os Olhos do Boitatá

Pontos de fogo abrem-se na escuridão como olhos sem pálpebras. Eles não queimam a pele: iluminam lembranças que os heróis esconderam e incendeiam essas cenas por dentro, até que a vítima já não saiba se viveu ou inventou o próprio passado.

| Abordagem apresentada | Competência interna | Lógica |
|---|---|---|
| Distinguir os olhos verdadeiros dos reflexos nas lembranças projetadas | Percepção | Reconhecimento do padrão que denuncia a presença real |
| Sustentar uma memória verdadeira sem desviar o olhar para as versões queimadas | Vontade | Preservação da identidade contra a exposição sobrenatural |
| Cobrir o corpo com barro frio e avançar seguindo o vento, não as luzes | Sobrevivência | Adaptação ambiental para atravessar o fogo sem servi-lo de guia |

**Falha:** todos os olhos se fixam em uma única lembrança compartilhada. Um herói precisa reivindicá-la como exclusivamente sua e permanecer dentro dela enquanto os demais recuperam o próprio passado.

#### B4. A Promessa Falsificada à Comadre Fulozinha

Uma voz entre as árvores cobra uma promessa que nenhum herói se lembra de ter feito. A presença imita a guardiã da mata, mas deixa exigências contraditórias gravadas nos troncos e fecha a floresta ao redor de quem aceita uma delas.

| Abordagem apresentada | Competência interna | Lógica |
|---|---|---|
| Comparar as exigências e provar que a promessa foi composta de relatos incompatíveis | Conhecimento | Reconstrução crítica do falso acordo |
| Desfazer o nome roubado que permite à imitadora falar como guardiã | Ocultismo | Exposição e ruptura da identidade sobrenatural falsa |
| Cruzar as copas antes que os galhos completem o círculo | Atletismo | Movimento rápido pela única rota que a presença não controla |

**Falha:** a floresta aceita a promessa como verdadeira e exige alguém em cumprimento. Um herói precisa assumir o acordo falsificado e desaparecer entre as árvores para que os demais sejam liberados.

#### B5. O Espelho da Loira do Banheiro

Um banheiro escolar apodrecido repete o grupo em espelhos que não refletem a mesma hora. A figura loira aparece sempre no vidro mais antigo e troca detalhes com quem a observa: primeiro o uniforme, depois o rosto, por fim o lugar fora do espelho.

| Abordagem apresentada | Competência interna | Lógica |
|---|---|---|
| Reunir datas, nomes e riscos nas portas para reconstruir a convocação original | Conhecimento | Compreensão histórica da sequência que alimenta a aparição |
| Recusar o reflexo corrigido que promete devolver mortos e apagar culpas | Vontade | Resistência à substituição afetiva e identitária |
| Arrancar o espelho mais antigo da parede e virá-lo contra os demais | Força | Intervenção física sobre o ponto de entrada da manifestação |

**Falha:** os reflexos deixam de imitar o grupo e caminham para fora. Um herói precisa entrar no espelho vazio e ocupar o lugar da figura para que os outros reflexos voltem ao vidro.

#### B6. O Canto da Iara no Poço Seco

Um poço sem água devolve uma canção na voz de quem se inclina sobre ele. Cabelos úmidos sobem pelas pedras e formam uma corda, enquanto cada verso convence o ouvinte de que está se afogando em um lugar completamente seco.

| Abordagem apresentada | Competência interna | Lógica |
|---|---|---|
| Restituir ao poço o nome roubado pela canção e romper o chamado | Ocultismo | Interferência direta no encantamento da voz |
| Respirar contra a sensação de afogamento e recusar o próximo verso | Vontade | Resistência à compulsão e ao pânico corporal |
| Desatar o trançado de cabelos sem romper o fio que sustenta a passagem | Destreza | Manipulação delicada do único elemento material da ameaça |

**Falha:** água invisível preenche os pulmões de todos. Um herói precisa descer pela corda e responder ao canto no fundo do poço para que os demais voltem a respirar.

#### B7. A Mortalha da Rasga-Mortalha

O grito de uma ave invisível rasga o teto e deixa cair uma faixa branca coberta por datas futuras. A cada novo grito, uma das datas se aproxima do presente e o nome de um herói começa a surgir no tecido.

| Abordagem apresentada | Competência interna | Lógica |
|---|---|---|
| Comparar cada grito com o eco e localizar o presságio que soa ao contrário | Percepção | Identificação da ruptura no padrão sonoro |
| Interpretar a ordem das datas e descobrir qual morte não pertence ao grupo | Conhecimento | Organização das informações impossíveis da mortalha |
| Seguir penas e correntes de ar até uma passagem que o tecido não alcança | Sobrevivência | Rastreamento e navegação por sinais ambientais |

**Falha:** a data atual aparece inteira e a mortalha desce sobre todos. Um herói precisa escrever o próprio nome no tecido e aceitar o presságio para rasgar uma saída aos demais.

#### B8. A Fome da Cabra-Cabriola

Uma coisa com cascos percorre o lado de fora de uma casa sem portas, falando com vozes de crianças perdidas. A cada resposta, uma nova entrada aparece na parede e dentes crescem ao redor do batente.

| Abordagem apresentada | Competência interna | Lógica |
|---|---|---|
| Fechar a marca de convite antes que a criatura complete uma entrada | Ocultismo | Cancelamento da permissão sobrenatural concedida à presença |
| Recusar as vozes infantis e não responder ao pedido vindo da parede | Vontade | Resistência à manipulação e à culpa |
| Atravessar o madeiramento enquanto as portas falsas devoram os cômodos | Atletismo | Movimento rápido por uma rota corporalmente exigente |

**Falha:** todas as portas se abrem para a mesma boca. Um herói precisa responder ao chamado e atravessar o batente para que a casa volte a ter paredes.

### 12.4 Auditoria de representatividade

Cada competência aparece seis vezes no catálogo completo. A assimetria entre os pools é intencional e define suas identidades mecânicas:

| Competência | Família | Pool A | Pool B | Total |
|---|---|---:|---:|---:|
| Força | Corpórea | 4 | 2 | 6 |
| Destreza | Corpórea | 4 | 2 | 6 |
| Percepção | Liminar | 2 | 4 | 6 |
| Conhecimento | Liminar | 2 | 4 | 6 |
| Ocultismo | Liminar | 2 | 4 | 6 |
| Vontade | Liminar | 2 | 4 | 6 |
| Sobrevivência | Corpórea | 4 | 2 | 6 |
| Atletismo | Corpórea | 4 | 2 | 6 |

No Pool A, os oito encontros produzem 16 espaços corpóreos e 8 liminares: quatro competências corpóreas × quatro ocorrências e quatro liminares × duas ocorrências. No Pool B, a relação se inverte. Somados, os pools usam os 48 espaços disponíveis e preservam seis ocorrências para cada uma das oito competências.

---

## 13. Falha, sacrifício e morte permanente

### 13.1 Gatilho e letalidade

Uma falha ocorre quando nenhum herói sobrevivente da expedição possui a competência da abordagem escolhida. O bardo não participa da verificação.

Toda falha é letal. Não existem:

- ferimentos graduais;
- perda apenas de recursos;
- segunda tentativa gratuita;
- rolagens para escapar;
- porcentagens de sucesso;
- falhas leves.

### 13.2 Fluxo do sacrifício

1. A situação se torna fatal.
2. Todos os heróis presentes são exibidos.
3. O jogador escolhe qual herói será sacrificado; o bardo nunca é uma opção.
4. O escolhido pronuncia uma despedida curta.
5. A morte é apresentada de forma coerente com a armadilha.
6. O herói é removido permanentemente.
7. Suas duas competências desaparecem da expedição e do elenco disponível.
8. A cobertura é recalculada.
9. A expedição continua enquanto houver ao menos um herói presente.
10. Se o último herói presente morrer e houver sobreviventes na cidade, o bardo recua automaticamente.
11. Se o último herói presente era também o último do elenco total, o bardo morre e ocorre o bad ending.

O sacrifício combina perda emocional e estratégica. A armadilha não escolhe automaticamente a vítima.

### 13.3 Justificativa narrativa

Cada encontro deve justificar o sacrifício de forma própria, por exemplo:

- sustentar um teto;
- manter uma comporta aberta;
- atrair um predador;
- ocupar uma entidade;
- permanecer em um ciclo temporal;
- oferecer o próprio sangue;
- servir de contrapeso;
- conter um mecanismo.

A estrutura técnica pode ser reutilizada, mas a justificativa textual não deve ser idêntica entre cenas. Não é necessário escrever uma cena inteiramente exclusiva para cada combinação de vítima e armadilha.

### 13.4 Grupo reduzido

Depois de uma morte, três heróis tornam-se dois e a cobertura máxima cai para quatro competências. Depois de uma segunda morte, resta um herói com duas competências. A expedição prossegue normalmente com esse único herói.

Uma nova expedição usa exatamente três heróis quando o elenco total possui três ou mais sobreviventes. Se restarem apenas um ou dois no elenco total, todos os sobreviventes formam a nova expedição. Nesse estado reduzido, o recuo voluntário fica indisponível.

O efeito bola de neve é intencional como tensão, mas precisa de validação para não tornar a continuação uma sequência automática de mortes.

### 13.5 Recuo e troca de formação

- O jogador pode recuar voluntariamente quando, somando quem está na expedição e quem está na cidade, o elenco total ainda possui ao menos três heróis vivos.
- O recuo pode ocorrer durante a preparação, entre encontros ou depois de uma armadilha e suas três abordagens serem reveladas.
- Escolher uma abordagem é o ponto de compromisso: dessa escolha até a resolução completa do sucesso ou do sacrifício, recuar fica indisponível.
- Todo recuo reinicia a masmorra na primeira posição.
- Mortes e atribuições de encontros já reveladas permanecem.
- Não existe custo, recurso consumido, limite de usos nem punição adicional por recuar.
- A formação só pode ser alterada na cidade depois de um recuo ou entre masmorras; não existe substituição durante uma tentativa.
- Se nenhum herói permanecer na expedição e ainda houver sobreviventes na cidade, o recuo é automático mesmo que restem somente um ou dois heróis no elenco total.

---

## 14. Comunicação ao jogador

### 14.1 Heróis e competências

Os nomes das competências não precisam aparecer como etiquetas. As capacidades devem ser comunicadas repetidamente por:

- profissão e arquétipo;
- biografia e experiências anteriores;
- equipamentos;
- falas e postura;
- ilustrações;
- opiniões de outros personagens;
- resultados observados em expedições anteriores.

### 14.2 Identidade das masmorras

A interface não deve escrever “masmorra física” ou “masmorra sobrenatural”. O jogador deve inferir a identidade por:

- arquitetura;
- rumores e relatos;
- sinais ambientais;
- vocabulário;
- trilha e efeitos sonoros;
- ilustrações;
- objetos encontrados na entrada.

O repertório visual e sonoro parte de assombrações, criaturas e espaços brasileiros. O Pool A enfatiza mata fechada, casarões, telhados, cozinhas, depósitos, pomares e instalações rurais transformadas em ameaças corporais. O Pool B enfatiza assobios, visagens, procissões, presságios, reflexos e vozes que distorcem memória e identidade.

O jogo não deve recorrer a abóboras, “doces ou travessuras”, cemitérios góticos importados ou outros atalhos do Halloween norte-americano. Também não deve representar religiões brasileiras vivas como fonte de maldade; o horror nasce da corrupção ficcional de lendas, sinais e memórias, não da demonização de práticas religiosas.

### 14.3 Abordagens

As opções devem:

- usar verbos consistentes;
- indicar o tipo de ação;
- omitir o nome da competência;
- evitar frases vagas demais;
- permitir compreensão retrospectiva;
- distinguir claramente Força, Atletismo e Destreza.

O texto é a forma primária de validação das pistas. Pistas visuais discretas podem ser adicionadas depois, sem substituir a clareza textual.

---

## 15. Masmorra final

### 15.1 Funções confirmadas

A masmorra final deve:

- testar o elenco sobrevivente;
- cobrar as mortes anteriores;
- combinar ameaças físicas e sobrenaturais;
- conduzir ao tesouro;
- revelar o horror familiar;
- produzir o encerramento central;
- produzir os epílogos.

Nesta versão, sua distinção mecânica vem de reunir os seis encontros ainda não vistos e misturar os dois pools. Ela não possui encontro nem regra exclusiva; identidade, revelação e encenação próprias continuam sendo responsabilidades narrativas pendentes.

### 15.2 Estrutura confirmada

Usar:

- os três encontros do Pool A que não apareceram na masmorra física;
- os três encontros do Pool B que não apareceram na masmorra sobrenatural;
- os seis encontros embaralhados juntos, com distribuição uniforme;
- as mesmas regras de persistência por posição usadas nas masmorras iniciais;
- nenhum encontro exclusivo nesta versão.

Uma campanha concluída apresenta todos os 16 encontros do catálogo: cinco de cada pool nas masmorras iniciais e os três restantes de cada pool na final.

### 15.3 Elementos pendentes

- identidade visual e narrativa própria;
- forma do clímax sem combate;
- verdade sobre o tesouro;
- decisão entre destruir, abandonar ou reivindicar o tesouro;
- forma narrativa de cobrar as mortes anteriores sem acrescentar uma regra mecânica exclusiva.

---

## 16. Finais

### 16.1 Estrutura confirmada

- Existe um encerramento central.
- Cada herói sobrevivente recebe um epílogo curto.
- O resultado combina o encerramento central com os epílogos disponíveis.
- A morte permanente determina quais epílogos aparecem.
- Se os oito heróis morrerem, o bardo também morre e ocorre o bad ending.

Essa composição preserva a ideia de “um final por personagem” sem exigir finais completos para todas as combinações de sobreviventes.

### 16.2 Elementos pendentes

- memoriais ou epílogos póstumos;
- finais alternativos para o tesouro;
- encerramento do bardo quando ele sobrevive;
- final com um único sobrevivente;
- consequências narrativas de muitas mortes;
- revelação da responsabilidade ou culpa do bardo.

---

## 17. Balanceamento e consequências matemáticas

### 17.1 Garantia dos trios com seis competências

Um trio que cobre seis das oito competências deixa somente duas ausentes. Como cada encontro usa três competências diferentes, é impossível que as três estejam entre as duas ausentes.

Portanto, **qualquer trio com seis competências sempre possui ao menos uma abordagem viável em qualquer encontro**, enquanto os três heróis continuarem vivos.

Isso significa que:

- existe ao menos uma solução;
- um jogador que conhece os mapeamentos pode escolhê-la;
- o grupo nunca encontra um estado 0 de 3 intacto.

Isso não significa que:

- todas as opções funcionam;
- o jogo revela a opção correta;
- o jogador não pode errar;
- a garantia permanece depois de uma morte;
- abordagens diferentes produzem necessariamente o mesmo texto.

Existem 16 trios com seis competências, equivalentes a 28,6% das composições iniciais.

### 17.2 Probabilidade de uma expedição passável

Um encontro é passável quando o grupo possui pelo menos uma das três competências associadas. Se um pool tem `k` encontros passáveis entre oito e a masmorra sorteia cinco sem repetição:

`P = C(k, 5) / C(8, 5)`

Como `C(8,5) = 56`:

| Encontros passáveis no pool | Seleções perfeitas | Probabilidade |
|---:|---:|---:|
| 8 | 56 de 56 | 100% |
| 7 | 21 de 56 | 37,5% |
| 6 | 6 de 56 | aproximadamente 10,7% |
| 5 | 1 de 56 | aproximadamente 1,8% |
| 4 ou menos | 0 de 56 | 0% |

Essa probabilidade mede a existência de uma solução em cada encontro, não a capacidade do jogador de identificá-la.

### 17.3 Caso de referência: H1, H2 e H3

H1/H2/H3 cobrem Força, Vontade, Destreza, Atletismo, Percepção e Sobrevivência. Ficam ausentes Conhecimento e Ocultismo. Logo, o trio possui ao menos uma solução em todos os encontros dos dois pools.

Na masmorra física:

| Encontro | Opções viáveis |
|---|---:|
| A1 — O Redemoinho do Saci Engarrafado | 3 de 3 |
| A2 — A Trilha de Pés Virados | 2 de 3 |
| A3 — O Pilão da Cuca | 2 de 3 |
| A4 — A Jaula do Mapinguari | 3 de 3 |
| A5 — A Cavalariça da Mula-sem-Cabeça | 2 de 3 |
| A6 — O Pomar do Corpo-Seco | 2 de 3 |
| A7 — O Depósito do Homem do Saco | 3 de 3 |
| A8 — O Telhado da Pisadeira | 3 de 3 |

Na masmorra sobrenatural:

| Encontro | Opções viáveis |
|---|---:|
| B1 — O Assobio da Matinta | 2 de 3 |
| B2 — A Procissão das Almas | 2 de 3 |
| B3 — Os Olhos do Boitatá | 3 de 3 |
| B4 — A Promessa Falsificada à Comadre Fulozinha | 1 de 3 |
| B5 — O Espelho da Loira do Banheiro | 2 de 3 |
| B6 — O Canto da Iara no Poço Seco | 2 de 3 |
| B7 — A Mortalha da Rasga-Mortalha | 2 de 3 |
| B8 — A Fome da Cabra-Cabriola | 2 de 3 |

B4 é o encontro mais restritivo para esse trio: somente Atletismo funciona.

### 17.4 Exemplos dos quatro estados

#### Estado 2 de 3

**Encontro:** A2 — A Trilha de Pés Virados\
**Grupo:** H1, H2 e H3

| Abordagem | Competência | Resultado |
|---|---|---|
| Soltar os nós invertidos | Destreza | Sucesso por H2 |
| Orientar-se pelo ambiente | Sobrevivência | Sucesso por H3 |
| Reconstruir a regra dos rastros | Conhecimento | Falha; ausente |

#### Estado 1 de 3

**Encontro:** B4 — A Promessa Falsificada à Comadre Fulozinha\
**Grupo:** H1, H2 e H3

| Abordagem | Competência | Resultado |
|---|---|---|
| Provar que a promessa é falsa | Conhecimento | Falha; ausente |
| Desfazer o nome roubado | Ocultismo | Falha; ausente |
| Cruzar as copas | Atletismo | Sucesso por H2 |

#### Estado 0 de 3

**Encontro:** A1 — O Redemoinho do Saci Engarrafado\
**Grupo:** H4, H7 e H8

O encontro exige Força, Percepção e Destreza. Nenhuma está presente; qualquer escolha provoca falha letal.

#### Estado 3 de 3

**Encontro:** A4 — A Jaula do Mapinguari\
**Grupo:** H1, H2 e H5

O grupo possui Atletismo, Força e Vontade. Todas as abordagens funcionam, embora possam produzir descrições diferentes.

### 17.5 Distribuição emergente confirmada

Três abordagens por encontro são a regra definitiva. O sorteio não consulta a formação nem impõe cotas de estados 0/3, 1/3, 2/3 ou 3/3 por masmorra. A distribuição emerge somente da matriz confirmada, da formação atual e das mortes ocorridas.

Considerando os 56 trios intactos contra os oito encontros de cada pool, a matriz vigente produz:

| Pool | 0/3 | 1/3 | 2/3 | 3/3 |
|---|---:|---:|---:|---:|
| A | 1,3% | 25,4% | 52,2% | 21,0% |
| B | 3,6% | 24,1% | 48,2% | 24,1% |

Esses percentuais são referências de QA e balanceamento global, não metas aplicadas a uma campanha individual.

---

## 18. Heróis e conteúdo de personagem

### 18.1 Decisões confirmadas

- Os oito heróis devem partir de arquétipos reconhecíveis de fantasia.
- Cada um possui exatamente duas competências conforme a matriz H1–H8.
- Suas capacidades são comunicadas narrativamente, sem ficha numérica explícita.
- A sobreposição entre heróis permite preservar competências após certas mortes.
- Nomes, personalidades e visuais só devem ser aprofundados depois da validação da matriz de armadilhas.

### 18.2 Arquétipos registrados, mas não aprovados

- Guerreiro.
- Ladina.
- Erudito.
- Ocultista.
- Caçadora ou exploradora.
- Mercenário.
- Inquisidora.
- Artífice.

Essa lista não é o elenco final e ainda não está associada aos códigos H1–H8.

### 18.3 Conteúdo pendente por herói

- nome, gênero e aparência;
- personalidade e profissão;
- relação com o bardo;
- motivo para aceitar a expedição;
- forma narrativa de comunicar as duas competências;
- conflitos e vínculos internos;
- frase de despedida;
- epílogo individual.

---

## 19. Escopo da primeira versão representativa

A primeira versão deve conter:

- um protagonista bardo;
- oito heróis;
- seleção de três heróis sobreviventes por expedição quando houver ao menos três, ou de todos quando restarem apenas um ou dois;
- bardo acompanhando automaticamente, sem ocupar vaga;
- bardo com zero competências;
- três masmorras;
- cinco encontros em cada masmorra inicial e seis na masmorra final;
- oito encontros no Pool A;
- oito encontros no Pool B;
- separação estrita entre os pools iniciais;
- identidade temática baseada em assombrações, criaturas e espaços brasileiros;
- oito competências;
- duas competências por herói;
- duas ocorrências de cada competência no elenco;
- pares de competências únicos;
- quatro competências corpóreas e quatro liminares;
- duas competências corpóreas e uma liminar por encontro do Pool A;
- uma competência corpórea e duas liminares por encontro do Pool B;
- seis ocorrências de cada competência no catálogo completo;
- três abordagens por encontro;
- três competências diferentes por encontro;
- todas as opções sempre visíveis;
- todas as opções sempre selecionáveis;
- competências ocultas na apresentação ao jogador;
- resolução determinística;
- sucesso garantido com a competência;
- falha letal sem a competência;
- estados 0/3, 1/3, 2/3 e 3/3;
- escolha de sacrifício;
- morte permanente;
- recálculo imediato das competências;
- recuo voluntário antes da escolha de abordagem quando o elenco total possuir ao menos três heróis;
- reinício da masmorra após recuo, com mortes e posições reveladas preservadas;
- continuação com um ou dois heróis e recuo voluntário bloqueado quando o elenco total possuir menos de três;
- recuo automático do bardo quando o último herói da expedição morrer e ainda houver sobreviventes na cidade;
- masmorra final formada pelos três encontros restantes de cada pool, sem conteúdo exclusivo nesta versão;
- um encerramento central;
- bad ending quando os oito heróis e o bardo morrerem;
- epílogos dos sobreviventes;
- ausência de combate e progressão numérica.

---

## 20. Fora do escopo

- Combate.
- Rolagens de dados.
- Experiência, níveis ou evolução de atributos.
- Equipamentos com estatísticas.
- Recursos consumíveis.
- Ferimentos graduais.
- Percentuais de sucesso.
- Segunda tentativa gratuita.
- Bônus imediato por redundância.
- Classes secundárias ou competências parciais.
- Escolha manual de executor.
- Geração procedural de texto ou de encontros.
- Relações complexas entre todos os pares de personagens.
- Cenas inteiramente exclusivas para cada combinação de vítima e armadilha.
- Finais completos para todas as combinações de sobreviventes.
- Sistema formal e extenso de pistas visuais antes da validação textual.

---

## 21. Riscos e validações obrigatórias

### 21.1 Trios com seis competências sempre têm uma solução

**Risco:** jogadores veteranos identificarem composições dominantes e nunca precisarem sacrificar ninguém enquanto o trio permanecer intacto.

**Validação:** medir passabilidade, recuos e mortes por composição e nível de experiência do jogador. A quantidade de três abordagens não depende desse teste para permanecer confirmada.

### 21.2 A leitura se tornar o único desafio

**Risco:** com uma composição de seis competências, o sorteio deixa de decidir se existe solução e o jogo pode se reduzir a um teste de associação de texto.

**Validação:** testar se as pistas exigem atenção a históricos e particularidades da cena sem se tornarem arbitrárias.

### 21.3 Efeito bola de neve

**Risco:** a primeira morte reduzir a cobertura máxima de seis para quatro competências e transformar a expedição em uma sequência de mortes inevitáveis.

**Validação:** simular todos os grupos de dois e um herói contra todas as sequências de cinco encontros e contra os seis encontros finais; medir se a continuação obrigatória com elenco reduzido vira uma sequência automática de mortes.

### 21.4 Composições de cobertura alta dominarem

**Risco:** os 16 trios com seis competências tornarem os oito trios com quatro competências escolhas sistematicamente inferiores.

**Validação:** medir também o valor da redundância após mortes e identificar se algum trio domina os dois pools.

### 21.5 Escolhas óbvias

**Risco:** a descrição revelar diretamente qual personagem resolve a situação.

**Validação:** testar opções claras e plausíveis sem rótulos explícitos.

### 21.6 Escolhas arbitrárias e aprendizado pela dor

**Risco:** ocultar tanta informação que mortes iniciais pareçam aleatórias e não gerem aprendizado.

**Validação:** todo participante deve conseguir explicar retrospectivamente uma falha e formular uma hipótese melhor.

### 21.7 Ambiguidade entre competências corpóreas

**Risco:** Força, Atletismo, Destreza e Sobrevivência parecerem intercambiáveis.

**Validação:** auditar os verbos de cada opção conforme a seção 8.2 e perguntar aos participantes qual ação corpórea está sendo descrita.

### 21.8 Sacrifício repetitivo

**Risco:** a mesma tela e justificativa reduzirem o impacto emocional a uma rotina.

**Validação:** manter estrutura visual reutilizável, mas variar a razão narrativa, a despedida e a consequência imediata.

### 21.9 Crescimento de conteúdo

Com 16 encontros e três abordagens, existem:

- 48 resultados de sucesso possíveis;
- 16 cenas-base de falha;
- despedidas adaptáveis para até oito heróis;
- três opções legíveis por encontro.

**Risco:** a multiplicação de variações ultrapassar a capacidade de produção.

**Validação:** usar uma cena-base de falha por encontro, composições visuais reutilizáveis e uma despedida curta por herói.

Quatro abordagens não devem ser adotadas no protótipo: aumentariam o conteúdo para 64 sucessos e fariam grupos de cobertura alta encontrarem soluções com ainda mais facilidade.

### 21.10 Masmorra final pouco distinta

**Risco:** embora use os seis encontros ainda não vistos, o clímax parecer apenas uma continuação dos dois pools por não possuir conteúdo mecânico exclusivo.

**Validação:** verificar se ordem, apresentação e revelação narrativa distinguem a masmorra final sem ampliar o escopo mecânico.

### 21.11 Concentração do sorteio

**Risco:** mesmo com representatividade global equilibrada, uma seleção de cinco encontros concentrar competências ou estruturas narrativas semelhantes.

**Validação:** registrar sementes, frequências e estados de viabilidade. A regra vigente não rejeita sequências; qualquer filtro futuro exige nova decisão de design.

### 21.12 Recuo como reconhecimento sem risco

**Risco:** como o jogador pode recuar depois de ver uma armadilha e antes de escolher uma abordagem, jogadores pacientes podem reconhecer posições e reduzir o risco por repetição.

**Validação:** medir frequência de recuos, tempo repetido e percepção de tensão. O recuo não recebe custo ou limite automaticamente; qualquer punição futura exige nova decisão de design.

### 21.13 Duração da masmorra final

**Risco:** seis encontros fazerem a masmorra final ultrapassar a duração-alvo de 20 minutos.

**Validação:** medir a duração real da final e o tempo da campanha sem contar repetições; ajustar o ritmo e a extensão das cenas antes de alterar a quantidade confirmada de encontros.

---

## 22. Critérios verificáveis do protótipo

O protótipo central estará funcional quando:

1. o jogador escolher exatamente três heróis quando o elenco total possuir ao menos três sobreviventes;
2. uma nova expedição usar todos os sobreviventes quando restarem somente um ou dois;
3. o bardo acompanhar automaticamente sem ocupar vaga;
4. o bardo não contribuir com competências;
5. cada herói possuir exatamente duas competências;
6. cada competência aparecer exatamente duas vezes no elenco;
7. os oito pares de competências serem únicos;
8. cada encontro apresentar exatamente três opções;
9. as três opções usarem competências diferentes;
10. as opções não exibirem os nomes das competências;
11. as três opções permanecerem visíveis e selecionáveis;
12. uma competência presente sempre produzir sucesso;
13. uma competência ausente sempre produzir falha letal;
14. sucessos diferentes não alterarem mecanicamente encontros posteriores;
15. existirem testes para os estados 0/3, 1/3, 2/3 e 3/3;
16. uma falha abrir a seleção de sacrifício somente com os heróis presentes;
17. o herói escolhido morrer permanentemente;
18. suas competências serem removidas e a cobertura ser recalculada;
19. o Pool A possuir oito encontros;
20. o Pool B possuir oito encontros;
21. cada competência aparecer seis vezes no catálogo completo;
22. cada encontro do Pool A usar duas competências corpóreas e uma liminar;
23. cada encontro do Pool B usar uma competência corpórea e duas liminares;
24. cada masmorra inicial preencher cinco posições uniformemente e sem repetição;
25. uma posição revelada permanecer fixa até o fim da campanha e uma posição não alcançada continuar vazia;
26. a masmorra física usar somente o Pool A;
27. a masmorra sobrenatural usar somente o Pool B;
28. a masmorra final usar os três encontros não vistos de cada pool, em ordem aleatória uniforme;
29. H1/H2/H3 possuir ao menos uma solução em todos os encontros;
30. H4/H7/H8 encontrar estado 0/3 em O Redemoinho do Saci Engarrafado;
31. um jogador de teste conseguir explicar uma falha retrospectivamente;
32. um jogador distinguir Força, Atletismo, Destreza e Sobrevivência pelo texto;
33. a expedição continuar quando restar somente um herói presente;
34. o recuo voluntário ficar indisponível quando o elenco total possuir menos de três heróis;
35. o jogador poder recuar com ao menos três heróis vivos antes de escolher uma abordagem, inclusive depois de revelar a armadilha;
36. a escolha da abordagem bloquear o recuo até a resolução completa da consequência;
37. um recuo reiniciar a masmorra sem reverter mortes nem apagar posições reveladas;
38. o recuo não consumir recursos, sofrer limite de usos nem aplicar outra punição;
39. a formação só poder mudar na cidade, nunca durante uma tentativa;
40. a morte do último herói presente provocar recuo automático quando houver sobreviventes na cidade;
41. a morte dos oito heróis provocar também a morte do bardo e o bad ending;
42. uma nova campanha apagar todas as posições persistentes;
43. a semente e as atribuições dos encontros serem registráveis e repetíveis para QA;
44. a identidade das armadilhas ser reconhecivelmente brasileira sem recorrer a ícones do Halloween norte-americano;
45. o horror não representar religiões brasileiras vivas como fonte de maldade.

---

## 23. Decisões pendentes

Esta seção é o registro exaustivo das questões ainda abertas. Nada aqui deve ser tratado como regra implícita.

As regras de abordagens, randomização, repetição, recuo, formação reduzida, sacrifício e morte do bardo não possuem pendências mecânicas nesta versão.

### 23.1 Narrativa

- Natureza do tesouro familiar.
- Maldição, entidade, pacto ou segredo associado.
- Motivações do bardo e dos heróis.
- Arcos dos oito heróis.
- Verdade sobre as duas metades do mapa.
- Revelação final e desfecho moral.

### 23.2 Personagens

- Correspondência entre H1–H8 e arquétipos.
- Nomes, gêneros, aparências, personalidades e profissões.
- Relações com o bardo e entre os heróis.
- Forma de comunicar competências.
- Despedidas e epílogos.

### 23.3 Apresentação

- Engine e plataforma.
- Resolução e orientação da tela.
- Direção de arte.
- Quantidade de sprites, bustos, cenários e CGs.
- Música, efeitos sonoros e eventual uso de voz.
- Interface de seleção do grupo.
- Interface de sacrifício.
- Pistas visuais discretas.

### 23.4 Produção

- Responsabilidades dos cinco integrantes da equipe.
- Cronograma.
- Plano de QA.
- Critérios de corte.
- Processo e plataforma de publicação.
- Público-alvo e classificação indicativa.

---

## 24. Plano de validação recomendado

1. Implementar A1–A8 e B1–B8 como um único catálogo confirmado.
2. Validar automaticamente as proporções por família e as seis ocorrências totais de cada competência.
3. Construir todos os encontros com exatamente três abordagens.
4. Implementar o preenchimento uniforme e persistente das posições.
5. Simular os 56 trios contra os dois pools.
6. Medir, por trio, quantos encontros ficam nos estados 0/3, 1/3, 2/3 e 3/3.
7. Repetir a simulação após a morte de um e de dois heróis.
8. Calcular a chance de sequências de cinco encontros totalmente passáveis.
9. Identificar composições e competências dominantes.
10. Testar especialmente os 16 trios com seis competências.
11. Testar recuo antes e depois da revelação, bloqueio após a escolha, persistência de posições e perda de progresso.
12. Testar recuo automático, expedições com um ou dois heróis e o bad ending após a morte dos oito.
13. Verificar que a masmorra final usa exatamente os seis encontros ainda não vistos.
14. Verificar se iniciantes conseguem inferir as opções e explicar os resultados.
15. Verificar se jogadores experientes ainda sentem risco, apesar do reconhecimento sem custo por recuo.
16. Medir a duração das três masmorras, especialmente a final com seis encontros.
17. Validar se o repertório é reconhecido como brasileiro sem transformar religiões vivas ou identidades regionais em fonte de maldade.
18. Aprofundar nomes, personalidades, visuais e conteúdo narrativo final somente quando essas decisões pendentes forem deliberadas.

---

## 25. Resumo das regras vigentes

O jogo usa um bardo sem competências e três heróis escolhidos entre oito. Se restarem somente um ou dois heróis no elenco total, todos partem na expedição seguinte. Cada herói possui duas das oito competências, em uma matriz simétrica. As duas primeiras masmorras têm identidades estritamente separadas e cinco posições preenchidas progressivamente a partir de pools próprios com oito armadilhas cada.

Cada armadilha apresenta três abordagens associadas a competências distintas. Uma competência presente garante sucesso; uma competência ausente produz falha letal e escolha de sacrifício. Força, Destreza, Sobrevivência e Atletismo formam a família corpórea; Percepção, Conhecimento, Ocultismo e Vontade formam a família liminar.

Cada encontro do Pool A usa duas competências corpóreas e uma liminar; cada encontro do Pool B usa uma corpórea e duas liminares. Cada competência aparece seis vezes no catálogo completo. Os 16 encontros e essa distribuição estão confirmados. Uma posição revelada permanece fixa até o fim da campanha; recuar reinicia a masmorra sem apagar posições nem mortes. A final reúne, em ordem aleatória, os três encontros de cada pool que ainda não apareceram.

O recuo voluntário é permitido antes da escolha de abordagem quando o elenco total possui ao menos três heróis. A escolha bloqueia o recuo até a consequência terminar. Com menos de três heróis, a expedição continua sem recuo voluntário; se o último herói presente morrer e houver reservas, o bardo recua automaticamente. Quando os oito heróis morrem, o bardo também morre e ocorre o bad ending.

Não restam decisões mecânicas abertas nesta versão. O balanceamento, o efeito bola de neve, o uso estratégico do recuo e a duração da masmorra final ainda exigem simulação e playtest. Narrativa, personagens, apresentação e produção permanecem pendentes conforme a seção 23.
