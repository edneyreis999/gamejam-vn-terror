QUero que você me ajude a planejar a minha proxima spec.
Use o modo companion.
A ideia é criar uma versão simplificada do mapa do Darkest Dungeon (planos/004-map-darkest-dungeon/map_darkest-dungeon.webp)
Para isso nós vamos precisar de um mapa novo e mais um plugin e algumas imagens

As imagens você pode gerar. ou então desenhar os "quadradinhos" direto no pixi, o que for mais leve.
Nos vamos precisa de um quadrado maior (que vai ser as armadilhas, as fogueiras e a chegada) e dos quadradinhos pequenos que vai ligar um quadrado grande ao outro.
e também uma imagem para o "peão" que vai andar os quadradinhos.

o novo mapa vai apenas implementar esse plugin.

O plugin tem que ser bastante configuravel. eu gosto desse tipo de mapa e pretendo usar em vários outros jogos.
Algumas coisas que estou imaginando de como ele pode funcionar, me diga qual a melhor.

1) montar tudo pelo plugin. Colocar os "nós" configuraveis assim o game design pode criar quantos nós ele quiser e quantas ligações ele quiser podem sair daquele nó (limite de 4).
2) fazer um mix entre plugin e imagens no maps.json do RPG Maker. o Game design pode montar o mapa usando Parallax + Eventos. Ele pode colocar cada nó como um evento no mapa com uma imagem e colocar uma notetag no evento que o plugin vai disponibilizar e essa notetag vai identificar qual nó é aquele. as ligações (quadradinhos menores) o plugin faz automatico.

Eu acho a 2 mais elegante e da mais flexibilidade para o game design, o que vc acha?

-----------

No jogo, esse mapa vai abrir assim que o jogador escolher o grupo e der partir. ao invés de cair direto na primeira armadilha, nós vamos telestranportar ele para esse mapa e ele vai precisar clicar no quadrado para ir para primeira armadilha.
vai ter uma animaçãozinha do peão saindo da Taverna e indo a primeira "casa" que no caso é a armadilha. por enquanto vamos ter apenas 3 tipos de casas, armadilha, fogueira e chegada/destino.
Precisamos ter um hover para indicar qual armadilha é aquela, caso o jogador já tenha conhecido ela. e "?" caso nunca tenha passado naquela casa.

Para essa primeira versão vamos ter somente uma linha reta, como uma fila encadeada. Mas já vamos deixar a estrutura pronta para criar dungeons mais complexas com multiplos caminhos.

------

deu para entender o big pickture?