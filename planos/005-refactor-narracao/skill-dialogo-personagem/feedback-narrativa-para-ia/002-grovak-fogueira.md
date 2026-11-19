entre em modo companion. eu gostaria de trocar uma ideia com você sobre os dialogos que foram gerados pelo grok e as instruções da skill `criar dialogo`

eu vou reescrever os textos gerados de uma forma que fique melhor alinhado com os textos que eu espero para o jogo. E que também fique mais aceitavel para um ser humano ler.
Eu preciso que você entenda a diferença entre os dois textos. o que eu fiz e o que foi gerado.
Entender o que na skill ou na direção de arte fez com que esse texto fosse gerado com os defeitos que eu apontar. 

Você vai precisa entender os problema para corrgir a skill para poder generalizar para outros dialogos.

Importante, essas diretrizes precisam ser genericas o sificiente para funcionar em varios dialogos. o POV é um agente de IA que não vai ter essa explicação e contexto que vou te fornecer logo abaixo.
não reescreva a skill até que você entenda perfeitamente todo o racional usado para corrigir ela e os textos gerados

Depois de arrumar, você vai arrumar P2 e P3 e gerar os textos de P1 P2 e P3 para o Bimbren.



**P2 — Conversa na fogueira**

--------- Gerado -------
**Gorvak:** Rheed. Tem pão. A beirada está dura. Esse pedaço é seu, e eu como o outro. Senta comigo.
(Texto seco, truncado, não da para entender nada do que está acontecendo aqui.)

--------- Corrigido -------
**Gorvak:** Tá bom fome?
(Aqui estou seguindo o tom seco que Gorkvak tem ao se comunicar)

**Rheed:** Poderia dizer que não, mas estaria mentindo para você.
(Rheed já é mais `falador` então ele não poderia responder só com `estou`. eu estou `floreando` mais a resposa dele.)

**Gorvak:** Sente-se aqui, eu tenho pão. a beirada está dura, mas dá pra comer.

**Gorvak:** Tome esse pedaço, eu como o outro.
(sobre essas duas falas de Gorvak, você consegue entender que eu contextualizei muito mais o jogador sobre o que está acontecendo na cena? 
Eu quebrei a fala em duas porque ele fez duas ações diferentes. Na primeira ele chamou o Rheed para se sentar com ele e em seguida `corta o pão`)

--------------------


------- gerado ------
**Rheed (jovem):** Ô, Gorvak. Valeu. Eu como. Quer que eu pegue lenha antes de sentar?
(Nessa frase de Rheed você quase acertou. mas `Eu como` seco assim não tem significado nenhum para um humano. O que precisamos deixar claro aqui é que ele aceitou o pedaço do pão oferecido.
na frase `Quer que eu pegue lenha antes de sentar?` o texto gerado até que ficou bom. aqui o erro foi na interpretação dos papeis na expedição. Rheed serve a Ívai, então se ele tiver indo pegar lenhas é a mando o Ívai, não a mando de Gorvak. mas se o Gorvak fosse o lider dele, estaria certa essa frase.)

**Gorvak:** Não. A lenha espera. Senta agora. Come o seu, que eu como o meu.
(Frase super truncada quase sem sentido. `Come o seu, que eu como o meu.` ninguém fala assim. na skill `criar-dialogo` tem que estar claro para o agente, OS DIALOGOS PRECISAM PREZAR POR FALAS QUE AS PESSOAS FALAM NO DIA A DIA. )

**Rheed (jovem):** Tá. Eu sento. Duro, mas eu como.
(Outro exemplo de frase extremamente truncada, quase sem sentido. ninguém fala `picado assim`. um personagem que tem sérios problemas com dicção falaria desse jeito. 
Alguém que sofreu um derrame cerebral por exemplo. mas um personagem saudável, mesmo que ele fale pouco, ele não falaria picado desse jeito.)

---------- corrigido --------

**Rheed (jovem):** Ô, Gorvak. Valeu. Eu quero sim! Mas eu preciso ir pegar lenha antes de me sentar com vocês.
(Aqui eu corrigi para deixar claro que Rheed aceitou o pão oferecido pelo Gorvak. e adicionei esse conflito no diálogo `Mas eu preciso ir pegar lenha antes de me sentar com vocês.` Esse conflito serve para que Gorvak possa falar em seguida com naturalidade, já que pela ficha dele, ele não é uma pessoa que puxa assunto. mas ele se importa com as pessoas da turma dele. mas você já tinha feito isso bem na frase gerada anteriormente.)

**Gorvak:** Não! (pausa) A lenha pode esperar. 
(Troquei o ponto por exclamação. Para mostrar melhor a indignação de Gorvak em relação ao Rheed ir pegar lenha com estomago vazio.
Eu coloquei essa pausa para dar enfase no não.)

**Gorvak:** Senta aqui.(pausa) Ninguém na minha turma trabalha de barriga vazia.
(Dividi a frase em duas caixas de dialogo para poder enfatizar as duas ações. tanto Gorvak não deixando Rheed ir pegar lenha quando pedindo/ordenando que ele se sente com ele para comer.
e ao final ilumino para o jogador, mais uma vez, que Gorvak se importa com quem ele chama de turma. Afinal, esse é o motivo dele ter aceito o convite.)

*Continuação somente quando Bimbren está vivo e presente:*

-------- gerado ---------
**Bimbren:** Gorvak. Sobrou pão para mais um? Eu sento com vocês, se tiver.
( Se tiver pão, Gorvak estaria fazendo um favor a Bimbren, não faz sentido ele falar  `Eu sento com vocês, se tiver.` . a não ser que Bimbren fosse um personagem super convencido e cheio de si. a ponto de uma pessoa estar fazendo um favor a ele e o simples fato dela sentar com a pessoa já justifica o esforço do favor que a outra pessoa está fazendo.)

**Gorvak:** Tem. Eu parto mais um pedaço para você. Senta e come.
(Texto truncado. se tirar o `senta e come` fica mais natural.)

**Bimbren:** Eu aceito. Está duro. A sopa da minha mãe é ruim assim, e eu como do mesmo jeito. Eu fico até acabar.

**Gorvak:** Come. A sopa dela eu não provei. Pode ficar.

(essas ultimas duas falas também ficaram muito truncada, quase sem sentido.)

---------------------
------------ corrigido --------
**Bimbren:** Hey, Gorvak. Sobrou pão para mais um? Esqueci de trazer, troco por agua que sobrou no meu cantil.
(Adicionei um `Hey` para o texto não ficar muito seco. como se Bimbren tivesse escutando a conversa de Gorvak e Rheed e depois se pronunciou.)

**Gorvak:** Tem. Eu parto mais um pedaço para você.

**Bimbren:** Eu aceito.
(separando as duas ações)

**Bimbren:** Dá pra melhorar esse pão duro sem graça. Minha mãe costumava fazer sopa pra mim quando o pão estava duro. Se me derem o pão de vocês, eu posso fazer uma sopa usando a agua do meu cantil.

**Rheed (jovem):** Por mim, tudo bem. vou buscar a lenha
(repare como eu coloquei continuação da cena anterior, ligando o Rheed com a lenha novamente.
Aqui eu entreguei para o jogador que todos os 3 estão virando um grupo e que eles estão ganhando intimidade. cada um contibuindo com o que pode.)

**Gorvak:** Eu gosto de sopa

(espera. de preferencia uma animação legal e um som de preparo de sopa)

**Gorvak:** Eu não provei a sopa da sua mãe, mas essa está muito boa.

**Rheed (jovem):** Obrigado rapazes, eu ainda vou contar histórias maravilhosas sobre vocês.
(IMPORTANTISSIMO: Rheed jovem sonha em se tornar um contador de história. Reforçar isso durante o jogo reforça também o fato de ser o Rheed velho que está contando essa história.)

---------------------

--------- GERADO -------
**P3 — Gorvak após a morte de Bimbren**

**Gorvak:** O Bimbren não senta mais comigo. Ele não aceitava calado. Me falta ouvir essa resposta.

**Rheed (jovem):** Ele te respondia. Eu fico aqui.

**Gorvak:** Fica. Eu ainda quero ele do meu lado.

O ajuste pendente em P3 é esclarecer **o que Bimbren não aceitava calado**. Essa informação se perdeu na última revisão.
---------------------


----- CORRIGIDO --------

**Gorvak:** O Bimbren não senta mais comigo. Ele não se contantava com o simples. Me falta ouvir suas reclamações.
(olha como eu conectei essa fala com Bimbren reclamando do pão duro. em P2.
- `Ele não se contantava com o simples`. Bimbren naquela ocasião poderia ter comido pão duro, mas como não se contentava com o simples, fez uma sopa.
é Esse tipo de conexão que faz uma história ser boa. é isso que devemos buscar como narrative design. uma história com personagens que se conectam. 
a ficha do personagem se conecta com os dialogos e os dialogos se conectam com a história que queremos contar. 
Uma fala lá na frente se conecta natualmente com uma fala lá atrás e tudo fica conectado. bem amarrado.)
