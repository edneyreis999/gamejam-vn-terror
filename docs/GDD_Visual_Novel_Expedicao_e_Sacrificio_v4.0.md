# GDD — Afogados em Terra Seca

**Título em PT-BR:** Afogados em Terra Seca\
**Título internacional para metadados:** The Dryland Drowned\
**Versão:** 4.0\
**Data:** 4 de setembro de 2026\
**Estado:** visão de design consolidada e aprovada\
**Gênero:** visual novel de horror psicológico e sobrenatural, sem combate\
**Idioma jogável:** PT-BR\
**Duração-alvo:** 60 a 75 minutos na primeira campanha completa; 35 a 50 minutos em repetição\
**Autoridade:** `GDD_Visual_Novel_Expedicao_e_Sacrificio.md`, sem sufixo, é a fonte de verdade atual. O snapshot `GDD_Visual_Novel_Expedicao_e_Sacrificio_v4.0.md` registra o mesmo conteúdo na data de criação e torna-se histórico quando o canônico voltar a evoluir.

---

## 1. Autoridade, estados e escopo documental

Este GDD consolida as regras mecânicas do antigo documento canônico v0.7, reaprova a trama do Medalhão das Duas Margens originada na v0.3 e incorpora as decisões posteriores sobre mundo, personagens, apresentação e plataforma. Em qualquer conflito, este arquivo prevalece sobre versões numeradas, documentos de pendências, protótipo executável, fichas antigas ou specs concluídas anteriormente.

Documentos históricos de origem:

- [GDD v0.1](./GDD_Visual_Novel_Expedicao_e_Sacrificio_v0.1.md)
- [GDD v0.2](./GDD_Visual_Novel_Expedicao_e_Sacrificio_v0.2.md)
- [GDD v0.3](./GDD_Visual_Novel_Expedicao_e_Sacrificio_v0.3.md)
- revisões intermediárias do antigo arquivo canônico, recuperáveis pelo histórico do Git;
- [inventário histórico de pendências da v0.4](./narrativa/Pendencias_e_Decisoes_do_Time_GDD_v0.4.md).

Cada definição deste documento possui um dos três estados abaixo. A ausência de uma etiqueta numa regra declarativa significa **Confirmado**.

| Estado | Significado | Consequência |
|---|---|---|
| **Confirmado** | Decisão vigente e aprovada | É autoridade de design até ser substituída por nova decisão registrada |
| **Hipótese a validar** | Risco ou expectativa que requer simulação ou playtest | A validação produz evidência; não altera o design automaticamente |
| **Fora do escopo** | Elemento deliberadamente excluído deste GDD ou do conteúdo descrito | A fronteira objetiva informa qual trabalho adicional seria necessário |

Não existem decisões `Pendentes` nem `Baseline de protótipo` nesta versão. Uma futura mudança de comportamento deve ser deliberada e, para implementação, descrita em spec incremental. Specs concluídas e o protótipo atual são baselines históricas, não autoridades contra este GDD.

### 1.1 Relação com o protótipo v2.0

O GDD v4.0 é a fonte de verdade da visão completa. O protótipo v2.0 deve buscar essa visão, mas seu recorte exato será definido posteriormente em specs incrementais e no Trello; aprovar este GDD não significa que todo o conteúdo estará obrigatoriamente presente na primeira entrega da v2.0.

Este documento define produto e comportamento. Tarefas, responsáveis por cards, ordem, dependências, datas e progresso pertencem ao [quadro da game jam no Trello](https://trello.com/b/I0FkvVtc/gamejam-visual-novel).

### 1.2 Decisões que substituem versões anteriores

| Elemento | Regra vigente | Regra substituída |
|---|---|---|
| Heróis por expedição | Exatamente 3 quando houver 4 ou mais vivos; todos, automaticamente, quando houver de 1 a 3 | 4 na v0.1 e seleção manual com exatamente 3 sobreviventes na v0.7 |
| Formação | Ivaí obrigatório, fora das vagas, mais os heróis | Posição do bardo indefinida na v0.1 |
| Competências de Ivaí | Nenhuma | Indefinições anteriores |
| Competências do elenco | 8; exatamente 2 por herói e 2 ocorrências de cada no elenco | 6 e distribuição assimétrica na v0.1 |
| Abordagens por encontro | Exatamente 3 | 2 na v0.2 e na trama mecânica original da v0.3 |
| Falha sem competência | Sempre letal; vítima escolhida com um clique | Falha grave e fluxos provisórios anteriores |
| Rotas iniciais | Caminho da Igreja, físico; Parque das Águas Assombradas, sobrenatural | Nomes genéricos e localizações anteriores |
| Ordem das rotas iniciais | Escolhida pelo jogador; a final libera depois de ambas | Ordem fixa da v0.6 |
| Catálogo | 8 encontros por pool; 16 confirmados | Catálogo parcial da v0.4 |
| Sorteio | Uniforme, sem repetição e persistente por posição revelada | Embaralhamento integral provisório |
| Final | 3 encontros restantes de cada pool e escolha do medalhão no Conselho | Encontro final exclusivo e outras variantes anteriores |
| Competências na interface | Nunca nomeadas para o jogador | Etiquetas explícitas do protótipo atual |
| Trama | Medalhão das Duas Margens conforme este documento | Tesouro indefinido da v0.7 |

### 1.3 Regra das três abordagens

O jogo usa definitivamente três abordagens por encontro. Qualquer referência a duas abordagens é histórica.

---

## 2. Resumo executivo

Em um mundo fantástico sem humanos, inspirado no interior e nas regiões ribeirinhas do Brasil, o anão Ivaí reúne oito heróis para buscar o suposto tesouro de sua família. Ele omite que carrega metade do Medalhão das Duas Margens, que sua linhagem está amaldiçoada e que pretende destruir o artefato para salvar a própria vida.

O jogador explora, em qualquer ordem, o Caminho da Igreja e o Parque das Águas Assombradas. Pérola, anã presa em pedra sob o altar da igreja, entrega a metade anã de um mapa. Floraí, elfo aprisionado numa figueira do parque, entrega a metade élfica. Sobrepostas, as duas peças revelam o Vilarejo Partido, onde a segunda metade do medalhão e o registro final de Palotina expõem a verdade.

Cada expedição leva Ivaí e até três heróis. Os encontros apresentam três abordagens plausíveis, associadas internamente a competências ocultas. Uma abordagem funciona quando ao menos um herói presente possui a competência correspondente. Caso contrário, o jogador manda um dos presentes executar uma ação fatal; a morte é permanente.

Depois do sexto encontro final, os heróis ainda vivos na formação do clímax opinam, mas não votam nem bloqueiam opções. O jogador decide como Ivaí: reunir o medalhão, libertar os amantes e morrer; ou destruí-lo, sobreviver e entregar Floraí, Pérola e suas memórias a Andirá. Não há combate, rolagens, níveis, experiência ou progressão numérica.

---

## 3. Visão e experiência pretendida

### 3.1 Fantasia central

Ser responsável por conduzir pessoas competentes por uma expedição cuja preparação esconde lacunas fatais, até descobrir que o narrador transformou essas pessoas em peças de um desfecho decidido de antemão.

### 3.2 Pilares

1. **Preparação com consequências:** escolher quem entra também define quais respostas ficam de fora.
2. **Leitura sem etiquetas:** profissões, histórias, equipamentos e comportamento sugerem capacidades, mas a interface não nomeia competências.
3. **Perda emocional e estratégica:** cada morte elimina uma pessoa e duas capacidades internas.
4. **Horror por responsabilidade:** o jogador escolhe a abordagem, a vítima e, ao final, quem pagará pela ruptura do medalhão.
5. **Narrador comprometido:** Ivaí conduz a história, mas sua versão é parcial e interessada.

### 3.3 Emoções pretendidas

- culpa pelas consequências das próprias decisões;
- apego e medo de perder um herói;
- insegurança diante de opções plausíveis;
- tensão entre preservar pessoas e preservar capacidades;
- satisfação ao reconhecer um padrão;
- arrependimento diante de uma pista ignorada;
- desconfiança crescente de Ivaí;
- desconforto moral diante dos dois desfechos.

### 3.4 Contrato de aprendizado

O jogo permite formular uma hipótese, escolher, observar a consequência e reinterpretar o ocorrido. O texto de sucesso ou falha deve explicar causalmente o resultado dentro da ficção, sem citar a competência exigida, dizer que o grupo a possui ou fazer um herói específico aparecer executando a solução.

Cada encontro possui um único texto de sucesso por abordagem e um único texto de falha por abordagem. Não há variantes por herói. As escolhas podem parecer arbitrárias na versão atual; isso é uma **Hipótese a validar**, não autorização para ampliar o conteúdo.

### 3.5 Público, idioma e duração

- Público principal: pessoas a partir de 16 anos que apreciem visual novels curtas, horror psicológico, escolhas morais e elencos sujeitos a perdas.
- Classificação pretendida no Brasil: 16 anos, sujeita à autoclassificação e à classificação oficial aplicável.
- Avisos de conteúdo: morte permanente, sacrifício, afogamento, perseguição, manipulação, preconceito entre raças fantásticas e horror psicológico.
- Conteúdo excluído: gore explícito, violência sexual, drogas, apostas, compras e interação entre usuários.
- Idioma jogável: somente PT-BR. O título em inglês serve apenas a metadados, apresentação e devlog.
- Primeira campanha: 60 a 75 minutos; repetição: 35 a 50 minutos.
- Distribuição de tempo: introdução e preparação até 8 minutos; cada rota inicial entre 15 e 20; Vilarejo e clímax entre 20 e 25; memorial e epílogos até 5.
- Avanço rápido: somente texto já visto na campanha atual. Pular texto inédito fica fora do escopo porque exigiria novas regras de segurança narrativa e QA.

### 3.6 Plataforma, publicação e entrada

- Alvo: Chrome estável em desktop, com teclado e mouse.
- Layout fluido, sem resolução lógica fixa, com reflow funcional até 320 px de largura efetiva e zoom de 200%.
- A largura reduzida é requisito de reflow e acessibilidade, não suporte oficial a celular ou toque.
- A versão pública pretendida será um jogo HTML5 incorporado à página do itch.io.
- O visitante clica explicitamente em **Jogar**; não há início automático ao carregar a página.
- Não haverá arquivo público para download. O ZIP exigido para envio ao itch.io é somente o pacote de hospedagem e não uma modalidade oferecida ao jogador.
- O pacote preserva `index.html` na raiz, caminhos relativos e ausência de etapa de build, assets remotos ou bibliotecas de terceiros. A rede serve apenas para carregar a página e o pacote hospedado; a partida não faz chamadas próprias de runtime.
- A execução local direta e offline continua disponível à equipe para desenvolvimento e QA; não constitui modalidade pública de distribuição.

### 3.7 Salvamento

- Existe um único salvamento automático local por navegador em `localStorage`, sem conta, nuvem ou comunicação de rede.
- O salvamento ocorre após: preparação concluída; abordagem escolhida e consequência resolvida; sacrifício; conclusão de rota; entrada no clímax; e escolha final.
- O estado inclui formação, sobreviventes, encontros atribuídos, progresso das rotas, inventário, ordem e escolhas necessárias para reprodução determinística.
- Ao continuar, uma cena textual interrompida reinicia do começo; decisões concluídas não são revertidas.
- **Novo jogo** exige confirmação antes de substituir a campanha.
- Salvamento corrompido ou incompatível deve ser informado antes de o jogo permitir iniciar outra campanha.
- A escolha final é gravada imediatamente. Depois dela, **Continuar** reabre apenas o desfecho, o memorial e os epílogos daquela campanha; rever a outra escolha exige um novo jogo.
- O bad ending também marca a campanha como concluída; **Continuar** reabre esse desfecho e seu memorial, sem retornar ao último encontro.

---

## 4. Mundo e trama

### 4.1 Mundo sem humanos

A história ocorre num mundo fantástico secundário inspirado no interior e nas paisagens ribeirinhas brasileiras. Não existem humanos. As populações mortais conhecidas incluem anões, elfos, goblins, gnomos e trolls.

As raças possuem conflitos históricos, políticos e culturais. Esses conflitos não são qualidades biológicas nem tornam povos inteiros moralmente homogêneos. Instituições e lideranças usam diferenças culturais para justificar disputas materiais; indivíduos podem reproduzir, contestar ou atravessar esses preconceitos.

A tecnologia corresponde aproximadamente ao fim do século XIX: transporte animal e fluvial, oficinas, mineração, imprensa e atrações mecânicas. Não existem rádio, automóveis, armas de fogo modernas ou comunicação instantânea.

### 4.2 As famílias dos amantes

- **Casa Araucária:** família élfica de Floraí. Administrava florestas, madeira naval e o porto da margem norte.
- **Casa Basalto:** família anã de Pérola e de seu irmão Tibagi. Controlava pedreiras, mineração, construção e o porto da margem sul.
- As casas disputavam travessia, pedágios, armazenagem e comércio.
- Uma ponte conjunta desabou vinte anos antes do romance e matou trabalhadores das duas margens. O acidente encerrou um tratado; cada lado culpou o outro.
- Andirá não causou o desabamento, mas ampliou sonhos, rumores e certezas hostis.
- A união entre Floraí e Pérola poderia reunir direitos econômicos e contrariava lideranças das duas casas. O preconceito foi usado para transformar disputa material em suposta incompatibilidade natural entre elfos e anões.
- Tibagi temia a perda de autonomia da Casa Basalto. Andirá o manipulou com a promessa de fazê-lo “rei das duas margens”.
- A culpa recai sobre lideranças e seguidores que perseguiram o casal, nunca sobre elfos ou anões coletivamente.

### 4.3 Floraí, Pérola e o medalhão

Floraí, elfo da Casa Araucária, e Pérola, anã da Casa Basalto, recusaram a divisão entre as famílias. Palotina criou para eles o Medalhão das Duas Margens. Floraí ofereceu o artefato a Pérola, que o aceitou livremente e ativou a proteção. O medalhão transforma compromisso consentido em proteção; não cria amor, obediência nem consentimento.

O ritual usou pedra seca retirada do leito do rio, fora do alcance direto de Andirá. As regras são:

1. inteiro e aceito por Pérola, o medalhão impede Andirá de tocá-la, invadir seus sonhos ou localizá-la por água e reflexos;
2. Andirá não pode tomar, destruir nem obrigar magicamente alguém a destruir o artefato;
3. uma tentativa de removê-lo contra a vontade da portadora o divide em duas metades, em vez de transferi-lo;
4. as duas metades continuam protegidas contra intervenção direta de Andirá;
5. somente uma escolha voluntária de um descendente das famílias envolvidas pode encerrar a proteção;
6. reunir as metades restaura o juramento de Floraí e Pérola;
7. destruir as metades juntas apaga a proteção e permite que Andirá tome os amantes.

Depois da ruptura, as famílias separaram o casal, mas Palotina se recusou a desfazer o juramento. Sem o artefato completo, a proteção se tornou prisão: Pérola foi incorporada à pedra e Floraí à figueira. Andirá não conseguia possuí-los, mas tampouco podiam partir.

### 4.4 Palotina

Palotina era uma gnoma, artesã ritual e mediadora de juramentos. Depois da ruptura, as famílias a convocaram à Casa do Conselho. Ela recusou reverter o compromisso e registrou sete regras do medalhão; seus cadernos foram confiscados. Morreu numa enchente ao tentar recuperar os registros.

Seu registro final confirma os únicos efeitos possíveis:

1. reunir as metades restaura o juramento, liberta Floraí e Pérola e entrega a Andirá a vida do descendente amaldiçoado;
2. destruir as metades encerra a maldição da linhagem, mas remove a proteção dos amantes e permite que Andirá os absorva junto das memórias que conservam do relacionamento.

### 4.5 Andirá

Andirá usa pronomes masculinos e não pertence a uma raça mortal. É uma entidade aquática ancestral das cavidades inundadas sob o Vilarejo Partido. Reivindica as duas margens e trata pessoas, memórias e promessas como posses. Obcecou-se por Pérola porque ela rejeitou sua dominação e escolheu Floraí; a união do casal ameaçava a divisão das margens que o fortalecia.

Antes do clímax, manifesta-se por água, sonhos, vozes e reflexos, nunca por um corpo completo. Sinais recorrentes incluem estalos de ecolocalização, ecos alterados, sombras semelhantes a asas, água ondulando em recipientes secos e reflexos invertidos como um morcego pendurado.

No clímax, sua silhueta é alta, com orelhas alongadas, nariz reduzido, olhos refletivos sem pupilas e duas “asas” membranosas formadas por água escura, lama e raízes. Morcegos reais são fauna e presságio; não são malignos nem servos da entidade.

Andirá localiza descendentes pela resposta do corpo e da voz à maldição. Pode amaldiçoar, manipular e omitir, mas fala literalmente a verdade. Não pode tocar os amantes protegidos, tomar ou destruir o medalhão nem forçar magicamente uma escolha. Ele não criou nem controla todas as criaturas do catálogo: a ruptura afinou a fronteira sobrenatural, e as representações do parque atraíram manifestações independentes.

### 4.6 Cronologia

| Marco | Momento relativo à campanha |
|---|---:|
| Colapso da ponte e ruptura do tratado | 100 anos antes |
| Romance, medalhão, perseguição e aprisionamento | 80 anos antes |
| Construção da igreja sobre a prisão de Pérola | Na década seguinte à tragédia |
| Abertura do Parque das Águas Assombradas | 40 anos depois da tragédia |
| Abandono do parque após desaparecimentos | 20 anos antes da campanha |
| Morte de Irati | 2 anos antes da campanha |
| Expedição de Ivaí | Presente |

Sequência causal da tragédia:

1. Floraí e Pérola iniciam o relacionamento enquanto as casas disputam as duas margens.
2. Andirá deseja possuir Pérola e passa a observá-la por águas, sonhos e reflexos.
3. O casal procura Palotina, que cria o medalhão; Floraí o oferece e Pérola o aceita livremente.
4. Andirá promete a Tibagi o domínio das duas margens e afirma que Floraí tomará esse poder se conservar o artefato.
5. Na véspera da fuga do casal, Tibagi tenta arrancar o medalhão de Pérola; a resistência dela faz o objeto se dividir.
6. Tibagi esconde a metade roubada num cofre sob a Casa do Conselho.
7. Pérola descobre o esconderijo, desenha de memória a rota e divide o mapa com Floraí. Uma peça isolada não revela a entrada.
8. Convocada pelas famílias, Palotina recusa desfazer o juramento, registra as sete regras e tem seus cadernos confiscados.
9. As famílias perseguem os amantes pelo rio. Andirá explora a violência, rompe a terra, inunda as ruas e divide o vilarejo.
10. Pérola fica presa na pedra; Floraí, nas raízes da figueira. Suas peças do mapa permanecem ligadas às respectivas prisões.
11. A metade que estava com Pérola é recuperada pela Casa Basalto e chega, gerações depois, a Irati. A metade escondida por Tibagi permanece soterrada.
12. Andirá alimenta versões falsas nas duas famílias e amaldiçoa as linhagens capazes de encerrar a proteção.

### 4.7 Irati e os registros

Irati, mãe de Ivaí, era uma anã e guardiã de genealogias e registros da família de Pérola. Morreu aos 58 anos, dois anos antes da campanha, afogada sobrenaturalmente num cômodo seco. Ela se recusara a buscar a segunda metade do medalhão porque considerava a oferta de Andirá uma coerção.

Deixou para Ivaí a primeira metade do medalhão, uma genealogia, relatos contraditórios e o aviso de não envolver outras pessoas. Seus documentos não provam qual dos dois efeitos do artefato é verdadeiro. O jogador vê somente três excertos curtos: no prólogo, após obter a primeira peça do mapa e durante a revelação final.

Leitura livre, inventário documental e códice ficam fora do escopo porque exigiriam interface e conteúdo adicionais.

### 4.8 Ivaí

Ivaí é um anão de 30 anos, descendente de outro ramo da família de Pérola. É bardo itinerante, cantador e cronista; usa rabeca, barba curta já grisalha e roupas de viagem remendadas. Tem pesadelos, evita água parada e reflexos, sofre crises discretas de falta de ar e esconde metade do medalhão sob a roupa.

É eloquente, observador e capaz de inspirar, mas se torna controlador quando sua sobrevivência é ameaçada. Seu defeito central é transformar pessoas em personagens de uma história cujo final decidiu sozinho.

Depois da morte de Irati, Andirá o procurou em sonhos e reflexos e apresentou os dois resultados. Ivaí pesquisou parcialmente os registros, sem conseguir provar o destino dos amantes. Ainda assim, reuniu os heróis com a promessa de tesouro, omitiu a maldição e planejou destruir o medalhão. Seu arco o força a revelar a história completa e deixar a decisão final com o jogador, depois de ouvir quem sobreviveu ao clímax.

---

## 5. Estrutura da campanha

### 5.1 Elenco e persistência

- Existem oito heróis recrutáveis.
- Com quatro ou mais heróis vivos, o jogador escolhe exatamente três.
- Com um, dois ou três heróis vivos, todos são incluídos automaticamente.
- Ivaí acompanha toda expedição, não ocupa vaga e possui zero competências.
- Cada herói possui exatamente duas competências internas; cada par é único e cada competência aparece em exatamente dois heróis.
- Não há níveis nem melhorias numéricas.
- A morte é permanente na campanha atual e é salva imediatamente.
- Heróis mortos não voltam a participar.
- Se os oito morrerem, Ivaí também morre e ocorre o bad ending.

### 5.2 Destinos

| Destino mostrado ao jogador | Função | Encontros | Natureza interna | Recompensa narrativa |
|---|---|---:|---|---|
| **Caminho da Igreja** | Primeira rota, em qualquer ordem | 5 do Pool A | Física | Pérola e a peça anã do mapa |
| **Parque das Águas Assombradas** | Primeira rota, em qualquer ordem | 5 do Pool B | Sobrenatural | Floraí e a peça élfica do mapa |
| **Vilarejo Partido** | Rota final | 6 restantes, 3 de cada pool | Mista | Segunda metade do medalhão, verdade e escolha final |

A interface nunca usa “físico”, “sobrenatural”, “Pool A” ou “Pool B”. As rotas iniciais começam disponíveis; uma rota concluída não pode ser repetida. O Vilarejo Partido permanece visível e bloqueado até que as duas peças do mapa sejam obtidas e sobrepostas. A ordem escolhida não altera pools, quantidade, mortes, sorteio ou composição final.

No Caminho da Igreja, Pérola permanece incorporada à pedra sob o altar e as fundações. A igreja foi construída para ocultar e sacralizar sua prisão. No parque, Floraí está preso à figueira central; água entre as raízes reflete memórias fragmentadas.

### 5.3 Progressão da revelação

1. **Prólogo:** Ivaí mostra registros incompletos de Irati, diz buscar um tesouro familiar e oculta maldição, medalhão e plano.
2. **Caminho da Igreja concluído:** Pérola reconhece o objeto escondido por Ivaí como metade do medalhão e entrega a peça anã do mapa.
3. **Parque concluído:** Floraí entrega a peça élfica e recorda que Andirá depende de uma escolha voluntária; ele não conhece com segurança os efeitos finais.
4. **Ordem variável:** o primeiro amante encontrado faz somente um aviso vago. O segundo percebe que Ivaí sabe mais do que admite e desperta a suspeita do grupo. Cada um possui uma única linha condicional adicional se sua rota for concluída por último. As memórias dos dois permanecem fragmentárias.
5. **Mapa completo:** as peças anã e élfica sobrepostas revelam o Vilarejo Partido. Elas abrem a rota; não decidem o final.
6. **Conselho:** a segunda metade do medalhão, escondida ali por Tibagi, e o registro final de Palotina revelam os dois resultados. As metades do medalhão, não as peças do mapa, determinam a escolha.

Floraí e Pérola não aparecem nem falam no Conselho. A confirmação final vem do registro de Palotina, e não de projeções ou páginas mágicas.

### 5.4 Sorteio

- Cada pool contém oito encontros-base.
- Cada rota inicial possui cinco posições.
- Uma posição vazia é preenchida imediatamente antes de ser revelada, por sorteio uniforme entre encontros ainda não atribuídos daquele pool.
- Depois de revelado, o encontro permanece na posição até o fim da campanha, inclusive após recuos.
- Posições não alcançadas continuam vazias.
- Não há repetição dentro do mesmo pool nem ajuste do sorteio à formação.
- O Vilarejo usa os três encontros de cada pool que não apareceram antes e embaralha uniformemente os seis.
- Novo jogo apaga as posições e realiza novos sorteios.

O algoritmo completo está na seção 11.

---

## 6. Ivaí na mecânica

Ivaí é o ponto de vista principal, reúne e acompanha o grupo e narra a campanha. Possui zero competências e, portanto, não torna abordagens viáveis, não amplia cobertura, não resolve armadilhas e não substitui um herói.

Ele nunca aparece entre as vítimas de uma armadilha. Se o último herói presente morrer e houver reservas na cidade, Ivaí recua automaticamente. Se a morte deixar todos os oito heróis mortos, Andirá alcança Ivaí antes da recuperação do medalhão: uma poça reflete água onde o chão está seco, a maldição o afoga e a campanha termina sem escolha final.

Na falha, o jogador atua como Ivaí e indica quem executará a ação fatal inevitável. Recusar significaria a morte de toda a expedição, mas não existe comando de recusa. O herói escolhido compreende a situação e reage segundo sua ficha; não há teste, afinidade nem recusa mecânica.

---

## 7. Loop principal

1. O jogo apresenta classificação e avisos de conteúdo antes do início.
2. No menu, **Continuar** aparece quando existe salvamento; **Novo jogo** pede confirmação se for sobrescrevê-lo.
3. Na preparação, o jogador consulta destinos e cards dos heróis em qualquer ordem.
4. Os cards mostram retrato, nome, pronomes, raça, profissão, resumo narrativo e estado, nunca competências.
5. Com quatro ou mais vivos, escolhe exatamente três; com até três, todos entram automaticamente.
6. Escolhe um destino disponível. Nenhuma das duas rotas iniciais vem marcada por padrão; um único destino restante pode vir pré-selecionado.
7. A expedição começa somente após **Partir**.
8. Ivaí acompanha automaticamente.
9. O jogo prepara cinco posições na rota inicial ou seis no Vilarejo, preservando posições reveladas.
10. Cada encontro exibe três abordagens, sem indicar viabilidade ou executor.
11. Antes da escolha, o jogador pode recuar quando o elenco total possui ao menos três vivos.
12. A escolha de abordagem bloqueia o recuo até a consequência terminar.
13. O sistema verifica coletivamente os heróis presentes.
14. Se a competência interna correspondente estiver presente, ocorre sucesso.
15. Se estiver ausente, ocorre falha letal.
16. Na falha, a interface informa previamente que um clique sacrifica de modo imediato e irreversível.
17. Somente os heróis vivos da formação aparecem; clicar uma vez executa o sacrifício, sem confirmação, cancelamento ou desfazer. A regra vale mesmo com um único candidato.
18. A vítima pronuncia sua despedida predefinida e morre; o estado é salvo imediatamente.
19. A cobertura interna é recalculada, e a expedição segue enquanto houver um herói presente.
20. Se o último presente morrer e houver reservas, Ivaí recua automaticamente; se todos os oito morrerem, ocorre o bad ending.
21. Depois de cinco encontros, uma rota inicial entrega sua peça do mapa e fica concluída.
22. Depois das duas peças, o Vilarejo é liberado.
23. Depois do sexto encontro do Vilarejo, a formação remanescente entra no Conselho; não há retorno à cidade.
24. O registro de Palotina revela os dois resultados, Ivaí confessa, Andirá aparece no reflexo e os sobreviventes presentes opinam.
25. O jogador escolhe reunir ou destruir o medalhão.
26. O jogo apresenta o desfecho, o memorial coletivo e os epílogos elegíveis, então grava a campanha como concluída.

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

Os códigos H1–H8 são identificadores internos estáveis ligados aos heróis confirmados na seção 18. Nome, pronomes, raça, aparência, personalidade e profissão são definidos nas respectivas fichas subordinadas.

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
- Cada abordagem possui um único texto de sucesso e um único texto de falha, sem variantes por herói.
- Resultados não alteram competências, opções nem encontros posteriores, exceto pela morte causada por uma falha.
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

Um cadáver ressequido foi incorporado ao tronco central de um pomar subterrâneo. Suas raízes atravessam outros corpos e apertam o corredor como dedos, enquanto frutos duros caem e se abrem cheios de dentes de diferentes povos mortais.

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
2. A interface avisa que o próximo clique causará uma morte imediata, permanente e sem desfazer.
3. Somente os heróis vivos da formação são exibidos; Ivaí nunca é uma opção.
4. O jogador clica uma vez no herói que será sacrificado. Não existe confirmação, cancelamento posterior ou segundo clique, mesmo quando só há um candidato.
5. A morte é salva imediatamente.
6. O escolhido pronuncia a despedida predefinida em sua ficha.
7. A morte é apresentada de forma coerente com a armadilha.
8. O herói é removido permanentemente e suas competências deixam o elenco disponível.
9. A cobertura é recalculada.
10. A expedição continua enquanto houver ao menos um herói presente.
11. Se o último presente morrer e houver sobreviventes na cidade, Ivaí recua automaticamente.
12. Se esse era o último dos oito heróis, Ivaí morre e ocorre o bad ending.

O sacrifício combina perda emocional e estratégica. A armadilha não escolhe automaticamente a vítima.

### 13.3 Justificativa narrativa

O jogador atua como Ivaí e indica quem deve executar uma ação fatal necessária para impedir a morte de toda a expedição. Não há opção de recusa: a escolha da abordagem já tornou a consequência inevitável. O herói compreende a necessidade, reage de acordo com sua ficha e age conscientemente; afinidade, competência, quantidade de sobreviventes ou opinião sobre Ivaí não permitem recusa mecânica.

Cada encontro deve justificar a ação fatal de forma própria, por exemplo:

- sustentar um teto;
- manter uma comporta aberta;
- atrair um predador;
- ocupar uma entidade;
- permanecer em um ciclo temporal;
- oferecer o próprio sangue;
- servir de contrapeso;
- conter um mecanismo.

A estrutura técnica pode ser reutilizada. Cada abordagem possui um texto de falha, e a despedida da ficha é anexada sem criar variações por combinação de herói e armadilha.

### 13.4 Grupo reduzido

Depois de uma morte, três heróis tornam-se dois e a cobertura máxima cai para quatro competências. Depois de uma segunda morte, resta um herói com duas competências. A expedição prossegue normalmente com esse único herói.

Uma nova expedição permite escolher exatamente três heróis quando o elenco possui quatro ou mais sobreviventes. Com um, dois ou três, todos os sobreviventes formam a expedição automaticamente. O recuo voluntário fica indisponível somente quando restarem menos de três heróis no elenco total.

O efeito bola de neve é intencional como tensão, mas precisa de validação para não tornar a continuação uma sequência automática de mortes.

### 13.5 Recuo e troca de formação

- O jogador pode recuar voluntariamente quando, somando quem está na expedição e quem está na cidade, o elenco total ainda possui ao menos três heróis vivos.
- O recuo pode ocorrer durante a preparação, entre encontros ou depois de uma armadilha e suas três abordagens serem reveladas.
- Escolher uma abordagem é o ponto de compromisso: dessa escolha até a resolução completa do sucesso ou do sacrifício, recuar fica indisponível.
- Todo recuo reinicia a masmorra na primeira posição.
- Mortes e atribuições de encontros já reveladas permanecem.
- Não existe custo, recurso consumido, limite de usos nem punição adicional por recuar.
- A formação só pode ser alterada na cidade depois de um recuo ou entre masmorras; não existe substituição durante uma tentativa.
- Ao voltar à cidade, o jogador pode escolher qualquer masmorra inicial disponível, inclusive trocar de caminho depois de um recuo; cada masmorra preserva separadamente suas posições reveladas.
- Se nenhum herói permanecer na expedição e ainda houver sobreviventes na cidade, o recuo é automático mesmo que restem somente um ou dois heróis no elenco total.

---

## 14. Comunicação ao jogador

### 14.1 Regra de invisibilidade das competências

Os oito nomes de competência existem somente no GDD, nos dados internos, nos testes e na documentação de QA. Eles nunca aparecem na interface destinada ao jogador, nem como etiquetas, estatísticas, filtros, cores legendadas ou explicações de resultado.

As bios públicas sugerem capacidades por profissão, experiências, equipamento, comportamento e voz. As fichas de autoria mantêm os nomes internos numa seção explicitamente privada; esse conteúdo não deve ser copiado integralmente para os cards.

As abordagens usam verbos e ações concretas, omitem competências e não identificam um executor. Depois da escolha, o texto explica causalmente o sucesso ou a falha dentro da cena, sem frases como “competência necessária”, “o grupo possui” ou “o grupo não possui”. Há um único texto por resultado de abordagem; nenhum herói aparece agindo como variante do sucesso.

### 14.2 Identidade dos destinos

A interface mostra somente os nomes **Caminho da Igreja**, **Parque das Águas Assombradas** e **Vilarejo Partido**, acompanhados de rumor curto, estado, maior percurso conhecido em marcos e progresso das peças do mapa. Não revela pool, natureza interna, competências, viabilidade ou encontros futuros. O maior percurso é conhecimento, não checkpoint: recuar reinicia a rota na primeira posição.

Arquitetura, relatos, vocabulário, som, imagem e objetos distinguem o caminho material do sobrenatural. O repertório parte de assombrações, criaturas e espaços brasileiros, sem atalhos visuais do Halloween norte-americano. Religiões vivas não são fonte de maldade; o horror vem de manifestações ficcionais, exploração comercial, perseguição e memória corrompida.

### 14.3 Regra editorial das abordagens

- usar verbos consistentes e ações distintas;
- permitir compreensão retrospectiva sem revelar a regra interna;
- distinguir potência, esforço corporal e precisão manual;
- fazer do texto a pista principal; imagem e áudio apenas reforçam;
- aceitar como risco mensurável que algumas escolhas pareçam arbitrárias nesta versão;
- não ampliar para variantes por herói ou múltiplas cenas de sucesso.

---

## 15. Vilarejo Partido e clímax

O Vilarejo Partido mistura, em ordem aleatória, os três encontros não vistos do Pool A e os três não vistos do Pool B. Não possui sétimo encontro, combate, chefe ou regra mecânica exclusiva. Sua distinção vem da combinação dos pools, dos espaços que inspiraram as atrações do parque e da revelação narrativa no Conselho.

Depois do sexto encontro:

1. os heróis ainda vivos na formação entram imediatamente na Casa do Conselho com Ivaí;
2. as peças sobrepostas do mapa indicam um cofre sob o piso;
3. o grupo encontra a segunda metade do medalhão e o registro final de Palotina;
4. o registro declara brevemente os dois resultados possíveis;
5. um sobrevivente exige explicações; se Ivaí estiver sozinho, ele lê e confessa para si mesmo;
6. Ivaí admite que conhecia a maldição, pretendia destruir o artefato e recrutou o grupo sob uma promessa falsa;
7. Andirá surge somente no reflexo da água que invade o piso e exige uma escolha;
8. cada herói elegível dá sua opinião curta e fixa;
9. o jogador escolhe como Ivaí;
10. o jogo apresenta desfecho, memorial e epílogos aplicáveis.

Se a última pessoa da formação morrer no sexto encontro, mas houver heróis vivos na cidade, sua ação abre o caminho. Ivaí alcança o Conselho sozinho, escolhe sem opiniões e não há epílogos individuais. Não existe retorno à cidade nem justificativa para reservas chegarem ao Conselho.

### 15.1 Elegibilidade para opinião e epílogo

Somente um herói que esteja vivo **e** pertença à formação presente depois do sexto encontro opina e tem seu epílogo exibido. Heróis vivos deixados na cidade não testemunham a revelação, não opinam e não aparecem no epílogo. Heróis mortos aparecem apenas no memorial coletivo.

Cada ficha já contém um epílogo predefinido. O jogo não concede, cria, adapta nem combina um novo epílogo segundo o final escolhido: ele apenas exibe literalmente o texto da ficha para cada herói elegível, na ordem estável H1–H8. As opiniões usam a mesma ordem.

### 15.2 Opiniões fixas

| Herói | Reação à mentira | Posição aconselhada |
|---|---|---|
| Gorvak | Exige que Ivaí nomeie os mortos e assuma o custo | Reunir e libertar os amantes |
| Elowen | Reage com explosão e recusa tratar sobrevivência como absolvição | Destruir e salvar Ivaí para que responda pelo dano |
| Griznik | Reconstrói os fatos e transforma sobrevivência em obrigação de reparo | Destruir e encerrar as mortes da linhagem |
| Seraphina | Condena a ausência de consentimento, apesar do impulso de curar Ivaí | Reunir e restaurar o juramento livre |
| Bimbren | Declara a missão fraudulenta e prioriza o compromisso original | Reunir e libertar os amantes |
| Liora | Compara omissões e reconhece que também ocultou suspeitas | Destruir; uma pessoa viva pode responder e registrar a verdade |
| Vaelith | Revolta-se com os registros censurados e quer preservar proteção e prova | Reunir e preservar o juramento |
| Draska | Separa fatos de promessas e escolhe o menor dano imediato | Destruir; a sobrevivência de Ivaí é dívida, não prêmio |

As opiniões ficam equilibradas em quatro para cada opção, mas não formam votação. Nenhuma posição muda, desbloqueia, bloqueia ou altera o resultado.

---

## 16. Finais

### 16.1 Reunir o medalhão

Ivaí confessa sem pedir perdão e reúne as duas metades. O juramento volta a existir, Floraí e Pérola são libertados de suas prisões e seguem juntos. Andirá perde a posse dos amantes, mas não é destruído. A maldição cobra Ivaí: ele se afoga em terra seca e morre sabendo que desfez a injustiça sustentada por sua família.

### 16.2 Destruir o medalhão

Ivaí sobrevive e a maldição da linhagem termina, mas Andirá absorve Floraí, Pérola e as memórias que mantinham do relacionamento.

### 16.3 Bad ending

Quando o oitavo herói morre, Ivaí fica sem proteção antes de recuperar o medalhão completo. Andirá o alcança por uma poça que reflete água sobre chão seco, e a maldição o afoga. Não há escolha final.

### 16.4 Ordem de apresentação

1. desfecho central correspondente à escolha, ou bad ending;
2. memorial coletivo com todos os heróis mortos, omitido quando ninguém morreu;
3. epílogos predefinidos dos heróis elegíveis, somente nos dois finais da escolha;
4. tela de campanha concluída.

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

As oito fichas em [docs/narrativa/herois](./narrativa/herois/) são documentos subordinados a este GDD. Elas são canônicas para voz, aparência, motivação, despedida, epílogo e opinião individual enquanto não contradisserem este documento. Em conflito, o GDD prevalece. O template canônico é [Template_Criacao_de_Herois.md](./narrativa/herois/Template_Criacao_de_Herois.md).

Os nomes das competências na tabela são internos e não compõem as bios públicas.

| Código | Herói | Idade | Raça | Ocupação | Arquétipo | Competências internas | Ficha |
|---|---|---:|---|---|---|---|---|
| H1 | Gorvak | 42 | Anão | Ferreiro | Protetor relutante | Força + Vontade | [Ficha](./narrativa/herois/Ficha_H1_Gorvak.md) |
| H2 | Elowen | 28 | Elfa | Caçadora | Batedora inquieta | Destreza + Atletismo | [Ficha](./narrativa/herois/Ficha_H2_Elowen.md) |
| H3 | Griznik | 36 | Goblin | Carpinteiro | Construtor improvisador | Percepção + Sobrevivência | [Ficha](./narrativa/herois/Ficha_H3_Griznik.md) |
| H4 | Seraphina | 54 | Troll | Curandeira | Sábia contestada | Conhecimento + Ocultismo | [Ficha](./narrativa/herois/Ficha_H4_Seraphina.md) |
| H5 | Bimbren | 39 | Gnomo | Mensageiro | Portador do dever | Força + Conhecimento | [Ficha](./narrativa/herois/Ficha_H5_Bimbren.md) |
| H6 | Liora | 34 | Gnoma | Navegadora | Cartógrafa meticulosa | Destreza + Percepção | [Ficha](./narrativa/herois/Ficha_H6_Liora.md) |
| H7 | Vaelith | 32 | Elfo | Escriba | Pesquisador de campo | Ocultismo + Atletismo | [Ficha](./narrativa/herois/Ficha_H7_Vaelith.md) |
| H8 | Draska | 31 | Goblin | Mineradora | Sobrevivente pragmática | Vontade + Sobrevivência | [Ficha](./narrativa/herois/Ficha_H8_Draska.md) |

A raça declarada na tabela inicial de cada ficha é autoridade sobre descrições internas da própria ficha. Por isso, Gorvak é anão, não orc, e Liora deve ser visualmente descrita como gnoma.

### 18.1 Relações com escopo confirmado

Somente os oito pares que compartilham uma competência recebem relação bilateral específica:

| Par | Relação |
|---|---|
| Gorvak — Bimbren | amizade prática; conflito entre dever e autossacrifício |
| Gorvak — Draska | respeito silencioso; atrito entre suportar e prevenir |
| Elowen — Liora | competição amistosa entre instinto e método |
| Elowen — Vaelith | competição provocativa; divergência sobre risco sobrenatural |
| Griznik — Draska | parceria profissional competitiva; prioridades de segurança |
| Griznik — Liora | parceria investigativa e curiosidade competitiva |
| Seraphina — Bimbren | respeito intelectual; debate sobre dever e cuidado |
| Seraphina — Vaelith | respeito cauteloso e desconfiança sobre limites da investigação |

Os outros vinte pares podem participar de diálogo coletivo, mas não recebem arco bilateral. Desenvolvê-los exigiria escrita e testes combinatórios e está fora do escopo.

Campos das fichas sobre “querer desistir” são gatilhos dramáticos para confronto e voz, não uma regra de deserção. Heróis vivos só deixam o elenco por sacrifício; não abandonam a campanha por afinidade ou reação narrativa.

### 18.2 Regra dos epílogos

Cada ficha define um único epílogo de sobrevivência, independente da escolha final. Esse texto é conteúdo autoral fixo, não recompensa calculada. Ele só é mostrado se o herói estiver vivo e presente na formação do clímax. A ficha também define uma única despedida, usada em qualquer sacrifício.

---

## 19. Apresentação

### 19.1 Interface e acessibilidade

- A tela inicial apresenta classificação pretendida, avisos de conteúdo e o botão Jogar antes de qualquer cena.
- A preparação reúne destino e formação na mesma etapa, selecionáveis em qualquer ordem.
- Cards de herói mostram retrato, nome, pronomes, raça, profissão, resumo público e estado: disponível, selecionado ou morto.
- Com quatro ou mais vivos, Partir só habilita depois de três selecionados e um destino válido.
- Com até três, todos entram automaticamente; ainda é necessário escolher destino e clicar em Partir.
- Destinos mostram nome diegético, rumor, estado e progresso conhecido, sem taxonomia interna.
- Abordagens e resultados nunca mostram competências.
- A seleção de sacrifício deixa a irreversibilidade visível antes dos cards, mas executa a morte no primeiro clique.
- Texto é a fonte obrigatória de informação; cor, som e imagem nunca são o único canal.
- O layout deve preservar ordem de leitura, foco visível, navegação por teclado e reflow até 320 px efetivos ou zoom de 200%.

### 19.2 Direção artística

A direção é pintura digital 2D semirrealista, escura e de baixa saturação. A paleta combina musgo, madeira, lama, pedra, água azul-esverdeada, latão e vermelho escuro. Ambientes e interiores remetem a um Paraná fantástico ribeirinho. O horror é atmosférico; não há gore explícito.

O conjunto de conteúdo visual previsto contém:

- 16 ilustrações de encontro;
- 4 cenários narrativos: cidade ou acampamento, Igreja e Pérola, Parque e Floraí, Conselho;
- 12 retratos estáticos: Ivaí, oito heróis, Floraí, Pérola e Andirá;
- uma pose ou expressão por personagem;
- finais compostos com Conselho, retratos e sobreposições existentes, sem CG exclusivo.

Irati e Palotina aparecem somente em texto, documentos, silhuetas ou detalhes de objetos. As 16 imagens atuais do protótipo são referências ou placeholders porque ainda não representam integralmente o mundo aprovado. A técnica, a hierarquia de acabamento e o esforço por imagem ficam fora do escopo desta etapa e requerem planejamento de Technical Art com Lucas.

### 19.3 Parque das Águas Assombradas

O parque foi aberto pela Companhia das Duas Margens, formada por descendentes comerciais das duas casas, quarenta anos depois da tragédia. Comercializou versões higienizadas das lendas, culpou Andirá isoladamente e apagou a perseguição familiar. Foi construído ao redor da figueira de Floraí, operou por vinte anos, fechou após desaparecimentos e a companhia se dissolveu.

Na versão descrita, essa história aparece somente por uma ou duas referências ambientais. Fundadores, funcionários, documentos empresariais e história comercial detalhada ficam fora do escopo porque exigiriam conteúdo narrativo sem função no loop atual.

### 19.4 Áudio

- Sem vozes.
- Quatro loops ambientais: preparação; Caminho da Igreja; Parque; Vilarejo e Conselho.
- Dois temas curtos de final: amantes libertados; medalhão destruído.
- Até dez efeitos reutilizáveis para interface, mecanismos, madeira, água, eco, asas, sacrifício e revelação.
- Andirá usa estalos semelhantes à ecolocalização e ecos alterados.
- O áudio nunca transmite informação indispensável e todos os arquivos são locais.
- Conteúdo não original exige licença compatível e atribuição.
- Temas individuais, dublagem, áudio binaural e efeitos exclusivos por encontro ficam fora do escopo porque exigiriam produção e QA adicionais.

---

## 20. Escopo de referência do GDD v4.0

A visão completa inclui:

- a trama e o mundo definidos nas seções 2 a 7;
- oito heróis e suas fichas canônicas;
- três destinos e dezesseis encontros;
- três abordagens por encontro;
- seleção, recuo, falha letal, sacrifício e morte permanente;
- randomização persistente por posição;
- salvamento automático local;
- clímax, duas escolhas finais, bad ending, memorial e epílogos;
- interface, arte e áudio nas fronteiras da seção 19;
- execução HTML5 em Chrome desktop e publicação incorporada no itch.io mediante clique em Jogar.

O protótipo executável atual está desatualizado e não restringe esta visão. A primeira ou qualquer outra entrega do protótipo v2.0 implementará apenas o recorte aprovado em specs incrementais e organizado no Trello.

---

## 21. Hipóteses a validar

As hipóteses abaixo exigem simulação, playtest ou revisão. Um resultado não modifica o GDD por si só; qualquer mudança exige decisão explícita e, para implementação, spec incremental.

| Hipótese | Evidência necessária |
|---|---|
| As pistas implícitas permitem compreender resultados sem etiquetas | Jogadores explicam causalmente sucessos e falhas |
| A arbitrariedade aceita não inviabiliza a experiência | Relatos distinguem tensão intencional de falta de informação |
| O efeito bola de neve ainda permite decisões significativas | Simulações e campanhas com dois e um herói |
| Trios de seis competências não dominam todas as escolhas | Comparação dos 56 trios e padrões de seleção |
| A sobreposição de competências conserva valor depois de mortes | Simulação após a perda de um e dois heróis |
| O recuo sem custo não reduz o risco a reconhecimento gratuito | Observação do uso de recuo em campanhas |
| A mistura dos pools dá identidade suficiente ao Vilarejo | Playtest do terceiro destino completo |
| A duração cabe em 60 a 75 minutos | Medição de campanhas sem avanço rápido |
| O clique único de sacrifício não produz frustração inaceitável | Observação de erros de clique e compreensão prévia |
| O salvamento restaura estado e sorteio sem alterar decisões | Testes de recarga em todos os checkpoints |

Balanceamento numérico, ajustes de texto e mudanças de ritmo só podem ser escolhidos depois dessas evidências; até lá, as regras confirmadas permanecem vigentes.

---

## 22. Fora do escopo

| Item excluído | Fronteira objetiva |
|---|---|
| Recorte exato da primeira entrega do protótipo v2.0 | Requer specs incrementais aprovadas e planejamento no Trello |
| Critérios de “versão da jam pronta”, cronograma de publicação e plano detalhado de QA | Requer etapa posterior de implementação, QA e entrega |
| Cronograma, ordem, dependências e responsáveis por tarefas | Pertencem exclusivamente ao Trello |
| Migração para RPG Maker MZ | Requer spec incremental e comprovação de paridade |
| Versão pública para download | A distribuição aprovada é somente o jogo incorporado no itch.io |
| Localização jogável EN-US | Requer tradução, revisão, adaptação de layout e QA próprios |
| Celular e controles por toque | Requer desenho de interação e matriz de dispositivos |
| Conta, nuvem, múltiplos slots ou sincronização de saves | Requer rede, segurança, privacidade e novo desenho de persistência |
| Leitura livre dos registros, inventário documental ou códice | Requer interface e conteúdo adicionais |
| Pular texto ainda não visto | Requer regras de segurança narrativa e QA |
| Combate, níveis, experiência, atributos, equipamentos estatísticos e recursos consumíveis | Requer balanceamento e outro loop de jogo |
| Rolagens, porcentagens, bônus por redundância, ferimentos e falhas leves | Requer reformulação e balanceamento da resolução determinística |
| Recrutamento, substituição durante expedição e ressurreição | Requer novas regras de elenco e persistência |
| Quatro heróis por expedição ou competências para Ivaí | Quebra a matriz e requer rebalanceamento completo |
| Relações bilaterais além dos oito pares definidos | Requer escrita e testes combinatórios |
| Variantes de sucesso ou atuação por herói em cada abordagem | Requer multiplicação combinatória de conteúdo |
| Opiniões dinâmicas, votação ou bloqueio da escolha final | Requer estados narrativos e regras de afinidade |
| Epílogos gerados, adaptados ao final ou para heróis fora do clímax | Requer escrita combinatória e nova regra de elegibilidade |
| História detalhada da companhia do parque | Requer conteúdo narrativo sem função atual |
| Técnica e níveis de acabamento por asset | Requer planejamento de Technical Art conforme disponibilidade de Lucas |
| Animação, lip sync, expressões múltiplas e CGs exclusivos | Requer produção artística adicional |
| Vozes, temas por herói, áudio binaural e SFX exclusivo por encontro | Requer produção e QA de áudio adicionais |
| Assets remotos, código de runtime de terceiros ou comunicação de rede durante a partida | Requer mudança de arquitetura e avaliação de segurança |
| Aparência final das duas peças do mapa | Requer direção conjunta de UI/UX e Technical Art; funcionalmente, uma é anã, outra é élfica e a sobreposição revela o Vilarejo |

---

## 23. Responsabilidades estáveis

- **Edney:** programação principal no runtime vigente; prioridade para RPG Maker quando uma futura migração for aprovada; generalista e apoio eventual à narrativa.
- **Lucas:** Technical Art e ilustração final; apoio em programação somente como contingência.
- **Pati:** UI/UX e Figma; mentoria de João e Maria.
- **João e Maria:** narrativa e testes manuais; como menores aprendizes, não assumem tarefas de outras disciplinas.

Essas fronteiras não atribuem cards. O Trello é a fonte exclusiva para execução, ordem, responsáveis específicos, dependências, paralelismo, prazos e progresso.

---

## 24. Histórico de consolidação

- O sistema de oito heróis, oito competências, três abordagens, dezesseis encontros e sorteio persistente vem do antigo GDD canônico v0.7.
- A trama do Medalhão das Duas Margens foi recuperada da v0.3, mas todas as regras mecânicas conflitantes daquela versão foram descartadas.
- As decisões de mundo, personagens, clímax, apresentação, plataforma e escopo foram aprovadas na entrevista que antecedeu a v4.0.
- As fichas de herói foram elevadas de propostas a referências subordinadas confirmadas.
- O snapshot v4.0 é imutável como registro histórico. Futuras decisões atualizam primeiro o GDD canônico sem sufixo e, quando necessário, geram nova versão numerada.

---

## 25. Resumo das regras vigentes

Afogados em Terra Seca é uma visual novel de horror em PT-BR, para Chrome desktop, concebida para publicação HTML5 incorporada no itch.io. O jogo se passa num mundo fantástico sem humanos. Ivaí, um bardo anão amaldiçoado, conduz oito heróis por duas rotas iniciais em qualquer ordem e pelo Vilarejo Partido.

Com quatro ou mais sobreviventes, o jogador escolhe três; com até três, todos partem automaticamente. Ivaí não ocupa vaga nem possui competência. Cada herói possui duas das oito competências internas, cada par é único e cada competência aparece duas vezes no elenco.

Cada encontro apresenta três abordagens. Uma competência presente garante sucesso; uma ausente produz falha letal. Competências nunca são nomeadas ao jogador. Na falha, um único clique escolhe a vítima presente, sem confirmação ou desfazer; a morte e o estado são salvos imediatamente.

Caminho da Igreja e Parque das Águas Assombradas usam cinco encontros sorteados de pools distintos. O Vilarejo usa os seis restantes. Posições reveladas e mortes persistem; recuar reinicia a rota. As peças anã e élfica do mapa liberam o Vilarejo, onde a outra metade do medalhão e o registro de Palotina revelam os dois resultados.

Somente heróis vivos presentes após o sexto encontro opinam e têm o epílogo predefinido de sua ficha exibido. Mortos aparecem no memorial; vivos na cidade não participam. Reunir o medalhão liberta Floraí e Pérola e mata Ivaí. Destruí-lo salva Ivaí e encerra a maldição, mas permite que Andirá absorva os amantes e suas memórias. Se os oito heróis morrerem, Ivaí morre antes da escolha.

O GDD v4.0 define a visão completa. O recorte de cada incremento do protótipo v2.0 será decidido posteriormente em specs e no Trello.
