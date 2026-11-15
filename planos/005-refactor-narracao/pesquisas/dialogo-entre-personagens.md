# Pesquisa: como escrever diálogo entre personagens

Status: pesquisa concluída em 2026-11-11. É **referência, não regra adotada**. A seção 6 é uma proposta para orientar agentes de IA e depende de aceite do autor.

[Modelo de ficha](../modelo-ficha-personagem.md) · [Fichas e comparação de vozes](../ficha-personagens/README.md) · [GDD canônico](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md)

## Como ler esta pesquisa

Quatro pesquisas web paralelas, consolidadas aqui:

1. romancistas e roteiristas;
2. escritores de narrativa de jogos;
3. diálogo × narração × textos descritivos;
4. modelos de pré-escrita.

Nenhum livro foi lido na íntegra. Cada regra traz seu nível de evidência:

- **[V]** — lida numa página que cita o autor ou fonte primária diretamente.
- **[S]** — resumo, anotação de terceiros ou trecho de resultado de busca. Use como paráfrase, não como citação.
- **[NV]** — não verificada. Atribuição ou frase encontrada só de segunda mão; não citar como fato.

Os números entre colchetes, como [12], remetem à seção 7 (Fontes).

Nada aqui altera decisões do GDD. Exemplos que mencionam o jogo são ilustrações de aplicação, não conteúdo proposto.

---

## 1. Resumo executivo

1. **Diálogo é ação, não conversa.** Cada fala faz algo com o outro (pressionar, desviar, testar, seduzir) a serviço do que o personagem quer na cena (McKee, Stein, Sorkin).
2. **Subtexto acima de tudo.** O diálogo ruim só significa o que diz. O bom deixa o sentimento real por baixo. A fala direta fica reservada para rupturas (McKee, Stein, Ingold).
3. **Cada tipo de texto tem um dono.**
   - Instrução de jogo: log e interface.
   - Ritmo e comentário: narração.
   - Evocação do mundo: descrição de item.
   - Conflito entre pessoas: diálogo.
   Misturar esses papéis é o erro mais citado (Lobanov, Azhdarchid, Kasavin).
4. **A ficha do personagem não basta.** Antes de cada cena é preciso decidir:
   - o que aconteceu logo antes;
   - o estado emocional agora;
   - quem tem status mais alto;
   - o que cada um quer, o que impede e o que esconde;
   - que valor vira na cena e como cada um sai dela.
   Isso vem de Hagen, Stanislavski, Swain, Story Grid, McKee e Johnstone.
5. **Num VN sem dublagem, a voz vem só do texto.** Vocabulário, tamanho da frase, pausas, quebras de caixa, retrato e não ditos fazem o trabalho do ator. Vale uma batida emocional por caixa (Avellone, Slabinski, devlog Ren'Py).

---

## 2. Regras de ofício para diálogo (livros, roteiro, teatro)

### 2.1 Diálogo não é conversa real

| Regra | Fonte | Aplicação para agente |
| --- | --- | --- |
| Diálogo é linguagem inventada. Fala real transcrita (ex.: tribunal) é tediosa; importa o que se quer dizer. | Sol Stein [S] [9][10] | Proibir saudação, despedida e preenchimento sem função dramática. |
| "Dialogue is not conversation": toda fala responde a uma necessidade, persegue um propósito e é uma ação. | McKee, *Dialogue* [V] [5] | Antes de cada fala, nomear a ação que ela executa (ameaçar, desviar, testar, pedir). |
| Corte o que o leitor pularia. | Elmore Leonard, regra 10 [V] [1] | Cada caixa custa um clique. Se apagar a fala não muda nada, ela sai. |
| Personagens podem não se escutar e responder a outra coisa. É um caos calculado. | Atribuído a Conrad e Carpentier em resenha de *Como Escrever Diálogos* [NV] [24] | Permitir respostas que ignoram a pergunta quando isso revela estado ou relação. |

### 2.2 Objetivo e conflito em cada troca

| Regra | Fonte | Aplicação |
| --- | --- | --- |
| Drama é intenção + obstáculo; o personagem nasce disso. | Aaron Sorkin, MasterClass [V conceito / S detalhe] [13] | O brief da cena exige "o que X quer de Y" e "o que impede". |
| Diálogo é adversarial, ainda que sutil. Primeira pergunta: a troca inicia ou agrava um conflito? | Stein [S] [9] | Rejeitar trocas em que todos concordam sem atrito, salvo como respiro deliberado. |

### 2.3 Subtexto e "on the nose"

| Regra | Fonte | Aplicação |
| --- | --- | --- |
| Diálogo ruim é literal. O bom implica mais do que diz. | McKee, *Dialogue* (notas de leitor) [S] [6] | Escrever primeiro o sentimento real (oculto); depois a fala que só aponta para ele. |
| Três camadas: o dito, o não dito e o indizível. | McKee [S] [6] | No horror, o indizível rende: elipse em vez de explicação. |
| Diálogo oblíquo: a resposta devolve a bola num lugar inesperado. | Stein [S] [9] | Parte das perguntas recebe desvio, contra-pergunta ou mudança de assunto. |
| "On the nose" (dizer exatamente o que sente ou pretende) é o defeito clássico. | ScreenCraft, No Film School, Final Draft [S] [17][18][19] | Usar duas passadas: intenção explícita, depois reescrita em subtexto. |
| **Divergência:** "on the nose" funciona quando é deliberado e raro; serve como etapa de rascunho. | Napoli, BlueCat [S] [20][21] | Reservar a fala direta para confissão, grito ou ruptura, onde pesa por ser rara. |

### 2.4 Exposição

| Regra | Fonte | Aplicação |
| --- | --- | --- |
| Não deixe a exposição virar caroço: quebre, moa fino, use como tijolo. | Le Guin, *Steering the Craft* (compilação) [S] [11] | No máximo um fato novo de lore por fala, distribuído na cena. |
| "As you know, Bob": personagem conta ao outro algo que os dois já sabem. | Crítica de ficção científica [V] [12]; Writing Excuses, James Scott Bell [S] [43][44] | Vetar fala cujo ouvinte já sabe a informação. Quem fala precisa ignorá-la, ou ela vem dentro de um conflito. |
| Exposição como munição: o fato entra como acusação, chantagem ou defesa. | Atribuído a McKee [NV] [7] | Fato do passado entra como arma, nunca como resumo neutro. |
| O romancista tem narração e pensamento interno; nem toda exposição vai no diálogo. | Mad Genius Club [S] [45] | Se a informação é só para o jogador, avaliar narração, log ou objeto antes de pôr na boca de alguém. |

### 2.5 Voz, tags e ritmo

| Regra | Fonte | Aplicação |
| --- | --- | --- |
| Diálogo honesto: o personagem fala como falaria, mesmo feio ou chulo, não como o autor gostaria. | Stephen King, *On Writing* [S] [4] | Não limpar a fala de um personagem rude nem dar eloquência a quem não teria. |
| Teste prático: sem o nome do falante, dá para reconhecer quem fala? | Sugestão consolidada, sem autor único | Revisão obrigatória por cena, comparando com `comparacao-vozes.md`. |
| Só "disse"; nada de advérbio no verbo de fala. | Leonard, regras 3–4 [V] [1]; King [V] [3] | O VN já mostra o nome do falante. O tom vai na escolha de palavras, na pontuação, no retrato ou no efeito, não em "(disse friamente)". |
| Prefira beats de ação a tags, e corte beats repetidos. | Browne & King, *Self-Editing for Fiction Writers* [S] [15][16] | O beat vira troca de retrato, som ou linha curta de narração. Proibir tiques como "suspirou" repetido. |
| Exclamação com parcimônia. | Leonard, regra 5 [V] [1] | No terror, um "!" raro assusta e um frequente vira ruído. Pôr limite por cena. |
| "If it sounds like writing, I rewrite it." | Leonard [V] [1] | Vetar subordinadas longas e conectivos de texto escrito ("outrossim", "no entanto") na boca dos personagens. |
| Ler e encenar em voz alta; diálogo é música. | Sorkin [S] [14] | Alternar falas curtas e longas; usar reticências ou caixa curta como silêncio. |
| Dialeto com moderação: grafia fonética e apóstrofos viram vício. | Leonard, regra 7 [V] [1] | Regionalismo por vocabulário e sintaxe (uma ou duas marcas), não por grafia. Também facilita PT/EN. |

### 2.6 Status

| Regra | Fonte | Aplicação |
| --- | --- | --- |
| Toda fala é uma transação de status. Status é algo que se faz, não que se tem. Alto diz "não chegue perto"; baixo diz "não valho o incômodo". | Keith Johnstone, *Impro* [S] [22][23][37] | Marcar se cada fala sobe ou desce o status. Quem domina interrompe, ordena e não responde. Quem está abaixo justifica, pergunta e se desculpa. |

### Divergências registradas

- **Rigidez das regras.** Leonard admitia exceções, e há quem leia as dez regras como parcialmente irônicas [2]. King é rígido com advérbios, mas admite o caso raríssimo [3].
- **Tag ou beat.** Leonard e King preferem o "disse" invisível. Browne & King preferem beats, mas também cortam beats vazios.
- **"On the nose".** A maioria condena; Napoli e BlueCat aceitam com intenção.

---

## 3. Particularidades de jogos e visual novel

### 3.1 Escolhas do jogador

| Regra | Fonte | Aplicação |
| --- | --- | --- |
| Ofereça três posturas: **Aceitar** (coopera), **Rejeitar** (ataca), **Desviar** (muda de assunto sem quebrar o tom). Duas opções viram binário com resposta certa; quatro dispersam. | Jon Ingold, "Sparkling Dialogue", AdventureX 2018 (notas de Robert Yang) [V/S] [26] | Em cada menu, cada opção tem postura diferente, não a mesma postura em intensidades diferentes. |
| Nada de escolha de enchimento ("O que você acha?"). | Ingold [26] | Descartar opção que não muda postura nem estado. |
| Primeiro o subtexto da cena, depois as escolhas. Ramificar é ação; ação revela personagem. Personagens não ignoram o que o jogador acabou de dizer. | Ingold [26] | Registrar numa linha o que cada um quer e esconde antes de escrever. |
| Laços desaceleram, alçapões aceleram. Personagem que reinicia o laço depois de ser atacado mostra poder. | Ingold [26] | Toda conversa com hub tem saída rápida e explícita. |
| Prefira sequências de pequenas escolhas a uma única grande decisão. | Ingold sobre *80 Days* [S] [27] | Encadear aproximações em vez de um só "sim/não". |
| Toda conversa tem propósito. Na dúvida, escreva os dois caminhos. | Chris Avellone [V parcial / NV "propósito"] [28] | Declarar o propósito no cabeçalho da cena. Sem propósito, não escrever. |
| O problema está no modelo, não no menu. Só mostre falas cujas condições estão cumpridas e decida como tratar repetição. | Emily Short [V] [31] | Cada opção tem condição explícita. Falas já usadas saem do menu ou ganham versão de repetição. |
| O texto da opção deve expressar o que o personagem quer comunicar. | Bruno Dias, sub-q [S] [40] | A opção mostra a intenção, não um resumo neutro. |

### 3.2 Vozes e elenco

| Regra | Fonte | Aplicação |
| --- | --- | --- |
| Parte do ofício é escrever várias personalidades ao mesmo tempo. | Avellone [V] [28] | Conferir cada fala contra a ficha do herói (já existente no projeto). |
| Até o figurante precisa de personalidade. Evite linguagem rebuscada e arcaica. | Mark Slabinski, Game Developer [V] [32] | Todo NPC ganha pelo menos um traço de voz. Falas são ditas, não prosa de narrador. |
| Construa o NPC a partir do lugar onde ele é encontrado. | Avellone [NV] [29] | Derivar o tom do mapa e da etapa da expedição. |
| O NPC também toma iniciativa e volta sozinho a seus temas. | Emily Short [V] [31] | Cada herói tem um tema ao qual retorna. |
| Companheiros ecoam o tema do jogo e não podem só reclamar. | Avellone [S/NV] [30] | Cada herói reage ao sacrifício e à sobrevivência por um ângulo próprio; nem toda fala é atrito. |
| Em cena de grupo, modele os turnos de fala. | Emily Short [V] [42] | Definir quem lidera e quem só faz aparte. |
| Mantenha uma tabela de gatilhos por companheiro (temas, NPCs, eventos). | Avellone [NV] [30] | Tabela de gatilhos por herói ao lado da ficha. |

### 3.3 Sem dublagem, caixa de texto e ritmo por clique

| Regra | Fonte | Aplicação |
| --- | --- | --- |
| Concisão é a habilidade central: "eliminate the unnecessary so that the necessary may speak" (Hofmann). | Slabinski [V] [32] | Depois do rascunho, cortar de 20 a 30%. Se a fala sobrevive sem a palavra, ela sai. |
| Lore é opcional; não force a história do mundo goela abaixo. | Slabinski citando Vandeberghe [V] [32] | Exposição vai para escolha opcional ou objeto, não para fala obrigatória. |
| Grande parte do diálogo humano é não verbal. | Avellone [V] [28] | Retrato e expressão, pausas, reticências medidas e falas interrompidas fazem o papel da atuação. |
| Caixa pequena (ADV): frases curtas, uma de cada vez. Pausas demais deixam a leitura lenta. | Devlog Ren'Py, indie [S] [34] | Uma ideia ou batida por caixa. Revelação ganha caixa própria. Conferir o limite real da janela do jogo. |

### 3.4 Barks e reatividade

| Regra | Fonte | Aplicação |
| --- | --- | --- |
| Barks fazem o mundo parecer vivo e evitam redundância. | Redding (GDC 2009) via Slabinski [S] [32] | Bark sempre ligado a um gatilho de estado. |
| Bark responde a gatilho, informa, soa como quem fala e considera o que o jogador vai sentir. Escreva muitas variantes e corte. | Ryan Matejka [V] [33] | De 3 a 5 variantes por gatilho e herói, sem repetir seguidas. |
| O que os personagens notariam e comentariam? Isso faz o jogo parecer atento ao jogador. | Greg Kasavin, *Hades* [S/NV] [35][36] | Para cada cena, listar estados relevantes (mortos, recrutados, recursos) e escrever ao menos uma variante que reconheça algum. |
| Estados internos podem virar vozes. | Robert Kurvitz, *Disco Elysium* [S] [38] | Medo e exaustão do grupo podem aparecer como interjeição, sem interface nova. |

### 3.5 Horror e tensão

| Regra | Fonte | Aplicação |
| --- | --- | --- |
| Deixe o jogador assustar a si mesmo ("mental modeling"). O efeito se desgasta se nada acontece. | Thomas Grip, Frictional (reportagem) [S] [39] | Nomear a ameaça o mínimo possível: indício, ausência, o que alguém não quer dizer. Intercalar pequenas confirmações. |
| Cada resposta abre uma pergunta nova. | Slabinski [V] [32] | Revelação nunca fecha tudo; deixa um fio solto. |
| O não dito é material dramático. | Ingold [26] | No horror, personagens evitam o assunto, e "Desviar" ganha peso. |

*Lacuna:* não foi encontrada fonte primária específica sobre contenção no diálogo de horror. As regras acima adaptam princípios próximos.

### 3.6 Localização (PT/EN)

| Regra | Fonte | Aplicação no projeto |
| --- | --- | --- |
| Não monte frases por concatenação; use strings inteiras com marcadores. | Murauski, Game Developer [V] [41] | Cada chave de `Languages.tsv` guarda uma frase inteira, nunca um fragmento. |
| Reserve espaço para expansão (≈30% em alguns idiomas) e trate plurais por idioma. | Murauski [41] | Escrever PT e EN com folga abaixo do limite da caixa. |
| Glossário consistente e contexto para o tradutor. | Murauski [41] | Usar `docs/_memory/glossary.md` e nota de contexto quando a fala for ambígua. |
| Expressões idiomáticas e piadas culturais traduzem mal. | Murauski [41]; corpus IF [S] [46] | Exigir equivalente nos dois idiomas, não tradução literal. |

---

## 4. Diálogo × narração × descrição de item, missão e interface

### 4.1 Tabela comparativa

| Tipo | Função | Quem fala | Ponto de vista e tempo | Tamanho | Tom | Revela ou esconde | Erros comuns |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Diálogo** | Conflito e personagem em cena. A informação aparece quando alguém precisa dela. [43][44] | O personagem, dentro do mundo | 1ª pessoa, presente da cena | Curto; uma batida por caixa | Pessoas reais falando [43] | Só o que o personagem sabe e diria àquele ouvinte | "As you know, Bob". Personagem servindo de log de missão: em *Chicory*, ~1/3 do texto virou instrução [47] |
| **Narração com narrador emoldurado** (ex.: velho contador) | Ritmo, sentido e comentário. Em *Bastion*, substitui cutscenes sem parar o jogo [48][49] | O narrador, dentro do mundo, fora da cena | Relato de algo passado, contado no presente da moldura. Ponto de vista estável; não alternar distante e envolvido na mesma peça (Le Guin) [S] [50] | Frases curtas, reativas [49] | Voz própria, sem piscadelas para o jogador [51] | Pode avaliar, adiantar e omitir. Toda narração é em algum grau pouco confiável (resenhas de James Wood) [S] [52] | Narração solene de filme. Repetir falas (o narrador de *Bastion* nunca repete uma linha) [51]. Contar o que o diálogo mostra |
| **Descrição de item e flavor** | Mostrar um mundo maior em poucas palavras, "by osmosis" [V] [53] | Narrador do jogo, documento do mundo ou outra voz [V] [54] | Descritivo, atemporal | 1 a 3 frases [53]; o traço mais marcante [54] | Dentro do mundo; passa o peso emocional do item [54] | O efeito mecânico fica **separado** do texto [54]. Evoca, não define | Texto longo vira "homework" [53]. Tentar cobrir tudo. Esconder a mecânica no flavor |
| **Missão, log e diário** | Dizer o próximo passo: "players always need to know what to do next" [V] [47] | Convenção do jogo. O resumo **não** vai na voz de personagem [S] [55]. Às vezes é escrito como se o jogador o tivesse escrito [S] [56] | Imperativo ou relato do jogador | Curto (exemplo de limite: título ≤100 e descrição ≤250 caracteres) [55] | Claro e funcional; a ação vem antes da voz | Objetivo concreto. Não substitui a cena | Objetivo vago. Log repetindo o diálogo |
| **Codex e lore** | Aprofundar o mundo para quem quiser | Documento do mundo ou narrador [54] | Variável | Pode ser mais longo, porque é opcional [53] | Dentro do mundo | Pode guardar mistério e indicar origem [S] [57][58] | Empurrar a leitura [53] |
| **Interface, tooltip e mensagem de sistema** | Ajuda no momento certo, sem distrair [S] [59] | O jogo, fora do mundo | 2ª pessoa, presente | Mínimo, fácil de escanear [59][60] | Sem jargão. Erro: o que houve, por quê e como resolver [S] [61] | Revela a regra exata | Código técnico no lugar de explicação. Ambiguidade que esconde a regra |

*Lacuna:* as linhas de codex e de interface se apoiam em fontes gerais, não em fontes primárias de jogos.

### 4.2 Regras de fronteira

1. **A instrução de jogo vai no log ou na interface, não no diálogo.** Sem log, os personagens ficam presos a repetir pedidos [V] [47].
2. **O resumo de missão não usa a voz de personagem** [S] [55].
3. **O efeito mecânico não entra no flavor.** O número fica num campo próprio; o flavor dá o tom [V] [54].
4. **Personagem não explica ao outro o que ele já sabe.** Se a informação é só para o jogador, ela vai na narração ou em outro meio [S] [43][44].
5. **A narração reage, não repete.** Ela não reconta a fala que acabou de aparecer [S] [51].
6. **A narração é curta e não cinematográfica** [S] [49].
7. **O narrador não pisca para o jogador** [S] [51].
8. **Ponto de vista estável dentro da mesma peça** [S] [50].
9. **A pouca confiabilidade do narrador é ferramenta.** O leitor percebe mais do que a voz admite [S] [52].
10. **Flavor curto, uma ideia por item** [V] [53].

*Citações não confirmadas:*

- Wood, "the so-called unreliable narrator is in fact highly reliable" [NV]. As resenhas indicam quase o contrário.
- Le Guin: os trechos sobre ponto de vista vêm só de resumos [NV literal].

---

## 5. Modelos de pré-escrita encontrados

| Modelo | Autor | O que pergunta (resumido) | Fonte |
| --- | --- | --- | --- |
| **Nove perguntas** | Uta Hagen, *Respect for Acting* | 1. Quem sou? 2. Que horas são, e por que importa? 3. Onde estou? 4. O que me cerca? 5. Circunstâncias dadas: o que houve antes, o que acontece agora, o que vem depois? 6. Relação com pessoas, objetos e eventos? 7. O que quero agora e na peça? 8. O que está no caminho? 9. O que faço (ação física e verbal) para conseguir? | [S] [62][63] |
| **Circunstâncias dadas, objetivo, obstáculo e táticas** | Stanislavski (via materiais didáticos) | Fatos fixos, incluindo o que aconteceu logo antes. Objetivo da cena ≠ superobjetivo da vida. Táticas como verbos **jogáveis** dirigidos ao outro (acusar, seduzir, cobrar), não verbos de estado (temer). Troca de tática = novo beat. | [S] [64][65][66] |
| **Scene & Sequel** | Dwight Swain, *Techniques of the Selling Writer* | Cena: objetivo → conflito → desastre. Sequela: reação → dilema → decisão (novo objetivo). Expansão por Jack Bickham [NV]. | [S] [67][68] |
| **Cinco obrigações da cena** | Shawn Coyne, Story Grid | Incidente incitante → complicação progressiva → crise (escolha entre opções incompatíveis) → clímax → resolução. A cena precisa mudar um valor. | [S] [69][70] |
| **Beat e virada de valor** | Robert McKee, *Story* | Beat = troca de ação e reação. Cena = série de beats que vira um valor (+ → − ou − → +), e a virada nasce das ações do personagem. | [S] [71][72] |
| **Status** | Keith Johnstone, *Impro* | Decidir antes se o personagem joga alto ou baixo e onde o status muda na cena. | [S] [22][37] |
| **Função da conversa** | Emily Short | Qual é a função deste NPC: cor local ou exposição essencial? Ele precisa realizar algo na história? | [S] [73] |
| **Intenção do jogador** | sub-q (autor não confirmado) | O que o personagem do jogador quer tirar da conversa? O bom diálogo fala de uma coisa querendo dizer outra. | [S] [74] |
| **Planilha e ficha de voz de estúdio** | Game Developer; Game Design Skills | Por fala: falante, texto, gatilho, inflexão ou estado, local, ID da cena, condições. Ficha de voz com ~10 falas de exemplo em estados diferentes. Por que a cena existe? Se não avança enredo nem revela personagem, corte. | [S] [75][76] |

*Lacuna:* não foi encontrado template público verificável de inkle, BioWare, Obsidian ou Supergiant.

---

## 6. Proposta: checklist de pré-escrita para agentes

> **Proposta, não adotada.** Ela cruza os modelos da seção 5 com o [modelo de ficha](../modelo-ficha-personagem.md) do projeto. Antes de virar skill ou instrução, precisa de aceite do autor e de teste em algumas cenas reais.

### 6.1 O que a ficha já cobre (consultar, não decidir de novo)

| Pergunta | Onde está na ficha |
| --- | --- |
| Quem é, o que deseja e teme na vida (superobjetivo) | §1 Identificação, §2 Personalidade em ação |
| O que tenta demonstrar e o que esconde, de modo geral | §2 |
| Como reage a frustração, afeto, autoridade e confronto | §2, tabela de situações |
| Assinatura de fala: tom, vocabulário, formalidade, tratamento, tamanho, ritmo, humor, tiques e o que evitar | §3 |
| Como pede, recusa, discorda e evita | §3, maneiras de conduzir |
| Variações com íntimo, desconhecido, adversário e sob medo | §4 |
| Distinção em relação a vozes vizinhas | [`comparacao-vozes.md`](../ficha-personagens/comparacao-vozes.md) |

Lacuna da ficha: a ficha de voz de estúdio [75][76] recomenda **~10 falas de exemplo em estados diferentes**. Avaliar se vale acrescentar isso ao modelo.

### 6.2 O que se decide por cena (brief que o agente preenche antes de escrever)

**A. Função e tipo de texto**

1. Por que a cena existe? O que ela avança ou revela? Se a resposta for "nada", ela não é escrita (Short, práticas de estúdio).
2. Que tipo de texto é este (diálogo, narração, item, log, interface)? Qualquer instrução de jogo ou exposição está no lugar certo (seção 4.2)?
3. Fontes canônicas consultadas: GDD e o estado de cada fato (Confirmado, Baseline de protótipo, Pendente, Fora do escopo). Nenhum fato novo entra como confirmado.

**B. Circunstâncias**

4. Onde e quando, e por que esse momento importa (Hagen 2–4)?
5. O que aconteceu **logo antes** desta cena? Se é uma sequela, qual foi o desastre e qual a reação (Hagen 5, Swain)?
6. Que estado do jogo a cena deve reconhecer: mortos, recrutados, escolhas anteriores, recursos (Kasavin)?

**C. Estado de cada personagem presente**

7. Estado emocional **ao entrar** e carga de valor (+/−) (Hagen 5, McKee).
8. Qual variação da ficha se aplica (íntimo, desconhecido, adversário, sob medo)?

**D. Relação com o interlocutor**

9. Relação e tensão **atual** entre os dois, não a geral (Hagen 6).
10. Quem tem status alto agora? Onde ele muda na cena (Johnstone)?
11. Registro e forma de tratamento entre eles nesta cena (ficha §3).

**E. Conhecimento e segredos**

12. O que cada personagem sabe, não sabe e esconde?
13. O que o jogador já sabe? Há ironia dramática? (Item proposto pela pesquisa, sem template que o liste explicitamente.)
14. Por personagem, uma linha: o que diz × o que realmente quer dizer (McKee, Ingold).
15. O que fica **indizível**, sem nome, pela tensão de horror (McKee, Grip)?

**F. Objetivo e tática**

16. O que cada um quer **nesta cena** e o que impede (Hagen 7–8, Stanislavski, Sorkin).
17. Táticas como verbos jogáveis dirigidos ao outro, e qual tática vem quando a primeira falha (Stanislavski). Cada troca é um beat.
18. Em escolhas do jogador: cada opção tem postura distinta (Aceitar, Rejeitar, Desviar) e sua condição (Ingold, Short).

**G. Virada e saída**

19. Qual valor vira e em que direção (McKee, Story Grid)?
20. Onde está a crise (escolha entre opções incompatíveis) e o que é decidido (Story Grid)?
21. Como cada um **sai**: conseguiu, frustrou ou conseguiu com problema novo? Que objetivo novo isso cria (Swain)?
22. Que pergunta nova fica aberta (Slabinski)?

### 6.3 Revisão depois de escrever (checklist curto)

- [ ] Cada fala executa uma ação; nenhuma é puro preenchimento.
- [ ] Nenhum "as you know, Bob"; nenhuma instrução de jogo na boca de personagem sem necessidade.
- [ ] Subtexto presente; fala direta só em ruptura deliberada.
- [ ] Sem o nome do falante, a voz é reconhecível (comparar com a ficha e `comparacao-vozes.md`).
- [ ] Uma batida por caixa; cabe na janela com folga para EN.
- [ ] Sem advérbio de fala, beat-tique ou "!" em excesso; dialeto por vocabulário, não por grafia.
- [ ] Texto em `Languages.tsv` como frase inteira, PT e EN; evento só com `$[chave]`.
- [ ] Nenhum fato apresentado como confirmado além do GDD.

---

## 7. Fontes

Níveis: [V] lida diretamente · [S] resumo, secundária ou trecho de busca · [NV] não verificada.

**Romancistas, roteiristas e teatro**

1. Elmore Leonard, 10 regras — https://fs.blog/2013/09/elmore-leonard-10-rules-of-writing/ [V]
2. Leitura das regras de Leonard — https://conversableeconomist.com/2013/09/07/elmore-leonards-ten-rules-of-writing/ [S]
3. Stephen King sobre advérbios — https://www.themarginalian.org/2013/03/13/stephen-king-on-adverbs/ [V]
4. King, honestidade no diálogo — https://www.goodreads.com/author_blog_posts/7201547-the-key-to-writing-good-dialogue-is-honesty-and-if-you-are-honest-abou [S]
5. McKee, *Dialogue* (editora) — https://www.hachettebookgroup.com/titles/robert-mckee/dialogue/9781455591923/?lens=twelve [V]
6. Notas sobre McKee, *Dialogue* — https://medium.com/@pirangy/the-said-the-unsaid-and-the-unsayable-robert-mckee-dialogue-the-art-of-verbal-action-for-the-bd14591be740 [S]
7. Resumos de McKee — https://sobrief-staging.onrender.com/books/dialogue · https://library-sigma-mauve.vercel.app/details/narrative/General-Story-Writing-Principles [NV]
8. *(reservado)*
9. Stein, via Deemer — https://www.ibiblio.org/cdeemer/cfs0901.htm [S]
10. Stein, via Kaye Dacus — https://kayedacus.com/2015/08/10/writing-advice-from-the-bookshelf-sol-stein-on-dialogue/ [S]
11. Le Guin, citações de *Steering the Craft* — https://www.goodreads.com/work/quotes/717892 [S]
12. "As you know, Bob" — https://crookedtimber.org/2023/04/27/red-team-blues-and-the-as-you-know-bob-problem/ [V]
13. Sorkin, MasterClass "Intention & Obstacle" — https://www.masterclass.com/classes/aaron-sorkin-teaches-screenwriting/chapters/intention-obstacle-11ba8c15-7856-490d-85bb-eb0601e02c55 [V/S]
14. Sobre a MasterClass de Sorkin — https://www.goodreads.com/author_blog_posts/15272155-on-aaron-sorkin-s-masterclass [S]
15. Browne & King, *Self-Editing* — https://app.studyraid.com/en/read/124433/5794994/resources-book-self-editing-for-fiction-writers [S]
16. Tags de diálogo — https://storysensei.blogspot.com/2007/02/revisions-dialogue-tags.html [S]
17. ScreenCraft, "on the nose" (PDF) — https://marottaonmoney.com/wp-content/uploads/2020/12/How-to-Avoid-Writing-On-The-Nose-Dialogue-ScreenCraft.pdf [S]
18. No Film School — https://nofilmschool.com/on-the-nose-dialogue [S]
19. Final Draft, subtexto — https://www.finaldraft.com/blog/how-to-write-subtext-in-dialogue [S]
20. Creative Screenwriting, Napoli — https://www.creativescreenwriting.com/cswcms/on-the-nose-dialogue/ [S]
21. BlueCat — https://bluecatscreenplay.com/the-bluecat-screenplay-competition-blog/avoid-nose-dialogue/ [S]
22. James Clear, resumo de *Impro* — https://jamesclear.com/book-summaries/impro [S]
23. Improwiki, status — https://improwiki.com/en/wiki/status [S]
24. Resenha de *Como Escrever Diálogos* — https://www.skoob.com.br/book/706698 · https://www.skoob.com.br/book/181844 [NV; página do livro não confirmada]

**Narrativa de jogos**

26. Ingold, "Sparkling Dialogue" (notas de Robert Yang) — https://www.blog.radiator.debacle.us/2018/11/notes-on-sparking-dialogue-great.html [V/S]
27. IF50, *80 Days* — https://if50.substack.com/p/2014-80-days [S]
28. Avellone, RPG Codex — https://rpgcodex.net/content.php?id=154 [V parcial]
29. Avellone, PCGamesN — https://www.pcgamesn.com/pillars-of-eternity/the-big-interview-chris-avellone-on-how-to-write-an-rpg [NV]
30. Avellone, GameBanshee — https://www.gamebanshee.com/news/96565-chris-avellone-blog-qaa-part-two.html [S/NV]
31. Emily Short, "Conversation design in games" — https://www.gamedeveloper.com/game-platforms/analysis-conversation-design-in-games [V]
32. Slabinski, "8 key principles" — https://www.gamedeveloper.com/game-platforms/8-key-principles-of-writing-effective-game-dialogue [V]
33. Matejka, barks — https://howtowriteagame.substack.com/p/how-to-write-video-game-barks [V]
34. Ritmo em NVL no Ren'Py — https://davisgsee.itch.io/his-own-being/devlog/1007030/controlling-nvl-mode-sentence-pacing-in-renpy [S]
35. Kasavin, GameSpot — https://www.gamespot.com/articles/hades-writer-explains-script-philosophy-after-player-discovers-incredible-detail/1100-6482650/ [NV; acesso bloqueado]
36. Supergiant e *Hades* — https://gamedeveloper.com/design/how-supergiant-weaves-narrative-rewards-into-i-hades-i-cycle-of-perpetual-death [S]
37. Sean Goedecke sobre *Impro* — https://seangoedecke.com/impro [S]
38. Kurvitz e *Disco Elysium* — https://www.jumpdashroll.com/article/disco-elysium-is-this-generations-planescape-torment [S]
39. Grip e Frictional, horror — https://gamedeveloper.com/design/four-ways-to-design-for-horror-from-i-amnesia-i-dev-frictional-games [S]
40. Bruno Dias, "Dialogue and Player Choice" — https://sub-q.com/dialogue-and-player-choice/ [S]
41. Murauski, localização — https://www.gamedeveloper.com/business/how-to-prepare-a-game-for-localization-10-basic-rules [V]
42. Emily Short, conversa com várias pessoas — https://emshort.blog/2009/08/12/modeling-conversation-flow-multiple-people-conversing-some-closing-caveats/ [V]

**Tipos de texto**

43. Writing Excuses — https://writingexcuses.com/?p=13576 [S]
44. James Scott Bell, "As you know, Bob" — https://killzoneblog.com/2016/06/as-you-know-bob.html [S]
45. Mad Genius Club — https://madgeniusclub.com/2021/08/05/as-you-dont-know-bob/ [S]
46. Corpus IF, localização — https://pvliesdonk.github.io/if-craft-corpus/corpus-docs/audience-and-access/localization_considerations [S]
47. Greg Lobanov, quest logs — https://greglobanov.substack.com/p/game-musings-quest-logs-pt-2 [V]
48. Road to the IGF: *Bastion* — https://gamedeveloper.com/game-platforms/road-to-the-igf-supergiant-games-dynamically-narrated-i-bastion-i- [S]
49. Supergiant, "Writing Bastion" — https://supergiantgames.com/blog/in-depth-writing-bastion [S]
50. Resumos de Le Guin sobre ponto de vista — https://spontaneousderivation.com/page/339/ [S]
51. Kasavin sobre exposição — https://www.gamespot.com/articles/kasavin-expounds-on-exposition/1100-6280807 [S]
52. Resenhas de *How Fiction Works* (Wood) — https://newrepublic.com/article/62219/the-art-noticing · https://www.kcrw.com/pages/excerpt-from-how-fiction-works [S]
53. "It should seep in by osmosis" (Reynolds, Kennedy) — https://www.gamedeveloper.com/design/-it-should-seep-in-by-osmosis-devs-discuss-what-makes-great-flavor-text [V]
54. "The Ancient Secrets of Writing Item Descriptions" — https://azhdarchid.bearblog.dev/the-ancient-secrets-of-writing-item-descriptions/ [V]
55. Sansar, quest design — https://simplesthing.github.io/sansar-creator-resources/quest-design.html [S]
56. Andor's Trail, quests — https://andorstrail.gitbook.io/docs/developer-tutorials/quest-making/define-the-structure [S]
57. Wireframe, "Breaking the lore" — https://wireframe.raspberrypi.com/articles/breaking-the-lore [S]
58. FLARE, flavor de item — https://flarerpg.org/?p=2809 [S]
59. Inkbot Design, tooltips — https://inkbotdesign.com/?p=42563 [S]
60. UX Design, escrever para interações — https://uxdesign.cc/how-to-write-for-interactions-3ff03080fb18 [S]
61. Built In, UX writing — https://builtin.com/articles/effective-ux-writing [S]

**Modelos de pré-escrita**

62. Uta Hagen, nove perguntas (Theatrefolk) — https://theatrefolk.com/blog/uta-hagens-nine-questions [S]
63. Backstage, Uta Hagen — https://www.backstage.com/magazine/article/the-definitive-guide-to-uta-hagens-acting-technique-68922/ [S]
64. StageMilk, circunstâncias dadas — https://www.stagemilk.com/?p=7889 [S]
65. Fiveable, atuação — https://fiveable.me/acting-for-the-stage/unit-3 [S]
66. Casting Networks, Stanislavski — https://www.castingnetworks.com/?p=357018 [S]
67. Scene and sequel — https://en.wikipedia.org/wiki/Scene_and_sequel [S]
68. Randy Ingermanson — https://www.advancedfictionwriting.com/?p=75 [S]
69. Story Grid 101 — https://storygrid.com/wp-content/uploads/2020/07/STORY-GRID-101-Print.pdf [S]
70. Savannah Gilbo, estrutura de cena — https://www.savannahgilbo.com/blog/scene-structure [S]
71. Shortform, *Story* — https://www.shortform.com/pdf/story-pdf-robert-mckee [S]
72. Beat (filmmaking) — https://en.wikipedia.org/wiki/Beat_(filmmaking) [S]
73. Emily Short, conversa — https://emshort.blog/how-to-play/writing-if/my-articles/conversation/ [S]
74. sub-q (autor não confirmado) — https://sub-q.com/?p=587 [S]
75. Game Developer, documentação de voz — https://gamedeveloper.com/audio/screen-play-documenting-voice-assets [S]
76. Game Design Skills, roteiro — https://gamedesignskills.com/game-design/write-script/ [S]

### Lacunas para uma próxima rodada

- Ler direto os livros mais citados: McKee (*Dialogue*), Le Guin, Hagen, *The Game Narrative Toolbox*.
- Fonte brasileira sólida (*Como Escrever Diálogos* não foi confirmado na fonte).
- Fontes primárias sobre lore de itens (FromSoftware, Blizzard) e sobre diálogo em VN específico (ADV/NVL).
- Interrupção, silêncio e não-resposta (Pinter) sem fonte verificada.
