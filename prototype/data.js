(function (global) {
  'use strict';

  function deepFreeze(value) {
    if (!value || typeof value !== 'object' || Object.isFrozen(value)) {
      return value;
    }

    Object.getOwnPropertyNames(value).forEach(function (key) {
      deepFreeze(value[key]);
    });

    return Object.freeze(value);
  }

  var competencies = {
    strength: { id: 'strength', label: 'Força', family: 'bodily' },
    dexterity: { id: 'dexterity', label: 'Destreza', family: 'bodily' },
    perception: { id: 'perception', label: 'Percepção', family: 'liminal' },
    knowledge: { id: 'knowledge', label: 'Conhecimento', family: 'liminal' },
    occultism: { id: 'occultism', label: 'Ocultismo', family: 'liminal' },
    will: { id: 'will', label: 'Vontade', family: 'liminal' },
    survival: { id: 'survival', label: 'Sobrevivência', family: 'bodily' },
    athletics: { id: 'athletics', label: 'Atletismo', family: 'bodily' }
  };

  var heroPairs = {
    H1: ['strength', 'will'],
    H2: ['dexterity', 'athletics'],
    H3: ['perception', 'survival'],
    H4: ['knowledge', 'occultism'],
    H5: ['strength', 'knowledge'],
    H6: ['dexterity', 'perception'],
    H7: ['occultism', 'athletics'],
    H8: ['will', 'survival']
  };

  var heroes = {};
  Object.keys(heroPairs).forEach(function (heroId) {
    heroes[heroId] = {
      id: heroId,
      label: heroId,
      identityStatus: 'prototype_baseline',
      competenciesStatus: 'confirmed',
      competencyIds: heroPairs[heroId],
      farewell: '“Sigam sem mim.” — despedida provisória de ' + heroId + '.',
      farewellStatus: 'prototype_baseline',
      epilogue: heroId + ' sobreviveu à campanha. Epílogo final pendente.',
      epilogueStatus: 'prototype_baseline'
    };
  });

  function approach(encounterId, number, text, competencyId, successText) {
    return {
      id: encounterId + '-' + number,
      text: text,
      textStatus: 'confirmed',
      competencyId: competencyId,
      successText: successText,
      successTextStatus: 'prototype_baseline'
    };
  }

  function encounter(id, pool, title, description, approaches, failureText) {
    return {
      id: id,
      pool: pool,
      title: title,
      description: description,
      contentStatus: 'confirmed',
      approaches: approaches,
      failureText: failureText,
      failureTextStatus: 'confirmed',
      imagePath: 'assets/encounters/' + id.toLowerCase() + '.jpg',
      imageStatus: 'prototype_baseline'
    };
  }

  var encounters = {
    A1: encounter(
      'A1',
      'A',
      'O Redemoinho do Saci Engarrafado',
      'Uma oficina abandonada está cercada por garrafas escuras, todas fechadas com pequenas presilhas de latão. Quando a primeira se quebra, um redemoinho atravessa o cômodo, arranca lascas das paredes e incorpora os cacos ao próprio giro.',
      [
        approach('A1', 1, 'Travar a comporta de ventilação e obrigar o vento a mudar de direção', 'strength', 'A comporta cede, e o redemoinho muda de direção.'),
        approach('A1', 2, 'Fechar as presilhas das garrafas antes que libertem novos turbilhões', 'dexterity', 'As presilhas se fecham antes que novos turbilhões escapem.'),
        approach('A1', 3, 'Seguir a fuligem e os cacos para localizar o olho imóvel do redemoinho', 'perception', 'O olho imóvel é encontrado, e o grupo atravessa fora do giro.')
      ],
      'os redemoinhos se unem e fecham a saída com uma muralha de cacos. Um herói precisa abrir a comporta por dentro e permanecer como lastro enquanto o vento o arrasta para longe dos demais.'
    ),
    A2: encounter(
      'A2',
      'A',
      'A Trilha de Pés Virados',
      'Uma trilha de terra atravessa uma mata que cresceu para dentro da construção. Pegadas com os calcanhares voltados para a frente indicam caminhos diferentes, enquanto cipós tensionados e estacas escondidas convertem cada direção errada em uma armadilha física.',
      [
        approach('A2', 1, 'Soltar os nós invertidos sem liberar a tensão das estacas', 'dexterity', 'Os nós cedem sem disparar as estacas ocultas.'),
        approach('A2', 2, 'Abandonar as pegadas e orientar-se pelo vento, pela inclinação e pela vegetação', 'survival', 'Os sinais reais da mata conduzem o grupo para fora da trilha falsa.'),
        approach('A2', 3, 'Reconstruir a regra dos rastros de pés virados e identificar o único desvio coerente', 'knowledge', 'A regra dos rastros revela o único desvio coerente.')
      ],
      'as árvores tombam como cancelas e empurram o grupo para um corredor de estacas. Um herói precisa segurar o último tronco enquanto os outros escapam pela passagem estreita.'
    ),
    A3: encounter(
      'A3',
      'A',
      'O Pilão da Cuca',
      'Uma cozinha de engenho contém um pilão grande o bastante para esmagar uma pessoa. O socador percorre trilhos no teto e muda de direção ao som de uma cantiga de ninar emitida por uma caixa sem corda.',
      [
        approach('A3', 1, 'Improvisar cunhas com madeira, fibras e cascas para desviar os trilhos', 'survival', 'As cunhas desviam os trilhos e abrem uma passagem segura.'),
        approach('A3', 2, 'Atravessar os pilões menores acompanhando o ritmo dos impactos', 'athletics', 'O grupo acompanha o ritmo dos impactos e cruza a cozinha.'),
        approach('A3', 3, 'Apagar o verso que prende a cantiga ao socador', 'occultism', 'O verso é apagado, e a cantiga perde o domínio sobre o socador.')
      ],
      'o socador abandona os trilhos e passa a perseguir o grupo. Um herói precisa atraí-lo para o pilão central e permanecer sob o impacto que bloqueia a máquina.'
    ),
    A4: encounter(
      'A4',
      'A',
      'A Jaula do Mapinguari',
      'Costelas de ferro fecham-se ao redor de um salão coberto de pelos grossos e marcas de garras. Um rugido vindo de lugar nenhum paralisa os músculos enquanto as barras comprimem lentamente tudo o que está dentro.',
      [
        approach('A4', 1, 'Escalar as costelas antes que o espaço entre elas desapareça', 'athletics', 'A escalada vence o fechamento das costelas de ferro.'),
        approach('A4', 2, 'Conter duas barras e abrir uma passagem à força', 'strength', 'As barras são contidas, mantendo uma passagem aberta.'),
        approach('A4', 3, 'Resistir ao rugido e alcançar a trava sem se encolher', 'will', 'O rugido não paralisa o grupo, e a trava é alcançada.')
      ],
      'as costelas fecham-se de uma vez. Um herói precisa ocupar o centro e receber a compressão para manter um último vão aberto aos demais.'
    ),
    A5: encounter(
      'A5',
      'A',
      'A Cavalariça da Mula-sem-Cabeça',
      'Uma cavalariça de pedra abriga uma carcaça equina de ferro ligada a foles e caldeiras. Sem cabeça, ela percorre baias estreitas enquanto expele fogo pelo pescoço e arrasta correntes incandescentes pelo chão.',
      [
        approach('A5', 1, 'Erguer a grade de alimentação e prender a carcaça em uma baia', 'strength', 'A grade é erguida, prendendo a carcaça em uma baia.'),
        approach('A5', 2, 'Desconectar o fecho do arreio sem tocar nas correntes aquecidas', 'dexterity', 'O fecho é desconectado sem tocar nas correntes incandescentes.'),
        approach('A5', 3, 'Identificar o ciclo de pressão e abrir a válvula entre duas descargas', 'knowledge', 'A válvula é aberta no intervalo exato entre as descargas.')
      ],
      'a caldeira entra em sobrepressão e transforma a saída em uma fornalha. Um herói precisa continuar operando a válvula junto à carcaça até que os outros atravessem.'
    ),
    A6: encounter(
      'A6',
      'A',
      'O Pomar do Corpo-Seco',
      'Um cadáver ressequido foi incorporado ao tronco central de um pomar subterrâneo. Suas raízes atravessam outros corpos e apertam o corredor como dedos, enquanto frutos duros caem e se abrem cheios de dentes humanos.',
      [
        approach('A6', 1, 'Arrancar as raízes principais antes que fechem a passagem', 'strength', 'As raízes principais são arrancadas antes de fechar o corredor.'),
        approach('A6', 2, 'Identificar fibras mortas e improvisar um túnel entre os pontos sem seiva', 'survival', 'Um túnel é aberto entre as fibras sem seiva.'),
        approach('A6', 3, 'Romper o nome que prende o cadáver à terra', 'occultism', 'O nome é rompido, e as raízes perdem o vínculo com o cadáver.')
      ],
      'as raízes formam um nó vivo ao redor do grupo. Um herói precisa deixar-se envolver pelo tronco para que a planta solte os demais e complete o enxerto.'
    ),
    A7: encounter(
      'A7',
      'A',
      'O Depósito do Homem do Saco',
      'Sacos pendem de ganchos móveis em um depósito sem janelas. Alguns contêm apenas areia; outros se debatem e chamam os heróis pelas vozes de pessoas conhecidas enquanto uma esteira conduz todos para uma prensa.',
      [
        approach('A7', 1, 'Destravar os ganchos certos e abrir espaço entre os sacos', 'dexterity', 'Os ganchos certos são destravados, abrindo caminho entre os sacos.'),
        approach('A7', 2, 'Balançar entre as correntes e alcançar a saída antes da prensa', 'athletics', 'O grupo alcança a saída antes que a prensa feche o corredor.'),
        approach('A7', 3, 'Ignorar as vozes conhecidas e não abrir os sacos que pedem ajuda', 'will', 'As vozes não quebram a decisão do grupo, e os sacos permanecem fechados.')
      ],
      'os ganchos recolhem os sacos e fecham o corredor. Um herói precisa ocupar um deles e seguir para a prensa para que o contrapeso libere a saída.'
    ),
    A8: encounter(
      'A8',
      'A',
      'O Telhado da Pisadeira',
      'O grupo entra no forro baixo de um casarão, onde telhas e vigas descem a cada passo pesado ouvido acima. A presença nunca aparece inteira: somente pés ossudos projetam marcas no reboco enquanto o teto comprime o peito de quem está embaixo.',
      [
        approach('A8', 1, 'Distribuir o peso pelas vigas mestras e improvisar apoios para o teto', 'survival', 'Os apoios distribuem o peso e impedem que o teto desça.'),
        approach('A8', 2, 'Rastejar entre os caibros antes da próxima passada', 'athletics', 'O grupo atravessa os caibros antes da próxima passada.'),
        approach('A8', 3, 'Distinguir os passos reais dos ecos e localizar a faixa que não será pisada', 'perception', 'O padrão dos passos revela a faixa segura do forro.')
      ],
      'dois pés surgem sobre a mesma viga e o telhado desaba em sequência. Um herói precisa permanecer sob a viga mestra e sustentar o impacto tempo suficiente para os demais saírem.'
    ),
    B1: encounter(
      'B1',
      'B',
      'O Assobio da Matinta',
      'Um assobio atravessa as frestas de um casarão e responde com a voz do último herói que falou. Cada resposta apaga uma palavra das lembranças do grupo, enquanto portas e janelas respiram como bocas tentando repetir os nomes restantes.',
      [
        approach('B1', 1, 'Comparar o assobio com os ecos e localizar a fresta que responde antes do som', 'perception', 'A fresta impossível é localizada antes que o assobio responda.'),
        approach('B1', 2, 'Reunir as promessas riscadas nas paredes e descobrir qual delas nunca foi feita', 'knowledge', 'A promessa falsa é separada das lembranças riscadas nas paredes.'),
        approach('B1', 3, 'Arrancar o postigo onde o assobio se aloja e expô-lo ao lado de fora', 'strength', 'O postigo é arrancado, expulsando o assobio do casarão.')
      ],
      'o assobio rouba todas as vozes ao mesmo tempo. Um herói precisa responder com o próprio nome e tornar-se a nova voz da casa para que os demais sejam esquecidos pela presença.'
    ),
    B2: encounter(
      'B2',
      'B',
      'A Procissão das Almas',
      'Uma procissão atravessa o corredor sem mover os pés. Cada figura carrega uma vela e um pano bordado com o nome de alguém do grupo; quando a chama correspondente se apaga, a pessoa começa a desaparecer das lembranças dos companheiros.',
      [
        approach('B2', 1, 'Encontrar a única figura cuja sombra aponta contra a luz das velas', 'perception', 'A sombra invertida denuncia a figura que conduz a procissão.'),
        approach('B2', 2, 'Apagar dos panos o vínculo que atribui os vivos à procissão', 'occultism', 'O vínculo é apagado, e os nomes vivos deixam a procissão.'),
        approach('B2', 3, 'Desmanchar a costura de cada nome sem rasgar o tecido funerário', 'dexterity', 'As costuras se desfazem sem romper o tecido funerário.')
      ],
      'as chamas se apagam e a procissão reconhece todo o grupo. Um herói precisa tomar a vela da frente e seguir com os mortos para conduzir o cortejo para longe dos demais.'
    ),
    B3: encounter(
      'B3',
      'B',
      'Os Olhos do Boitatá',
      'Pontos de fogo abrem-se na escuridão como olhos sem pálpebras. Eles não queimam a pele: iluminam lembranças que os heróis esconderam e incendeiam essas cenas por dentro, até que a vítima já não saiba se viveu ou inventou o próprio passado.',
      [
        approach('B3', 1, 'Distinguir os olhos verdadeiros dos reflexos nas lembranças projetadas', 'perception', 'Os olhos verdadeiros são separados dos reflexos nas lembranças.'),
        approach('B3', 2, 'Sustentar uma memória verdadeira sem desviar o olhar para as versões queimadas', 'will', 'Uma memória verdadeira preserva a identidade do grupo.'),
        approach('B3', 3, 'Cobrir o corpo com barro frio e avançar seguindo o vento, não as luzes', 'survival', 'O barro frio protege o corpo, e o vento guia a travessia.')
      ],
      'todos os olhos se fixam em uma única lembrança compartilhada. Um herói precisa reivindicá-la como exclusivamente sua e permanecer dentro dela enquanto os demais recuperam o próprio passado.'
    ),
    B4: encounter(
      'B4',
      'B',
      'A Promessa Falsificada à Comadre Fulozinha',
      'Uma voz entre as árvores cobra uma promessa que nenhum herói se lembra de ter feito. A presença imita a guardiã da mata, mas deixa exigências contraditórias gravadas nos troncos e fecha a floresta ao redor de quem aceita uma delas.',
      [
        approach('B4', 1, 'Comparar as exigências e provar que a promessa foi composta de relatos incompatíveis', 'knowledge', 'As contradições provam que a promessa nunca existiu.'),
        approach('B4', 2, 'Desfazer o nome roubado que permite à imitadora falar como guardiã', 'occultism', 'O nome roubado é desfeito, e a imitadora perde sua voz.'),
        approach('B4', 3, 'Cruzar as copas antes que os galhos completem o círculo', 'athletics', 'O grupo cruza as copas antes que a mata feche o círculo.')
      ],
      'a floresta aceita a promessa como verdadeira e exige alguém em cumprimento. Um herói precisa assumir o acordo falsificado e desaparecer entre as árvores para que os demais sejam liberados.'
    ),
    B5: encounter(
      'B5',
      'B',
      'O Espelho da Loira do Banheiro',
      'Um banheiro escolar apodrecido repete o grupo em espelhos que não refletem a mesma hora. A figura loira aparece sempre no vidro mais antigo e troca detalhes com quem a observa: primeiro o uniforme, depois o rosto, por fim o lugar fora do espelho.',
      [
        approach('B5', 1, 'Reunir datas, nomes e riscos nas portas para reconstruir a convocação original', 'knowledge', 'A sequência original da convocação é reconstruída e interrompida.'),
        approach('B5', 2, 'Recusar o reflexo corrigido que promete devolver mortos e apagar culpas', 'will', 'O reflexo corrigido é recusado, e a troca perde força.'),
        approach('B5', 3, 'Arrancar o espelho mais antigo da parede e virá-lo contra os demais', 'strength', 'O espelho mais antigo é arrancado e voltado contra os demais.')
      ],
      'os reflexos deixam de imitar o grupo e caminham para fora. Um herói precisa entrar no espelho vazio e ocupar o lugar da figura para que os outros reflexos voltem ao vidro.'
    ),
    B6: encounter(
      'B6',
      'B',
      'O Canto da Iara no Poço Seco',
      'Um poço sem água devolve uma canção na voz de quem se inclina sobre ele. Cabelos úmidos sobem pelas pedras e formam uma corda, enquanto cada verso convence o ouvinte de que está se afogando em um lugar completamente seco.',
      [
        approach('B6', 1, 'Restituir ao poço o nome roubado pela canção e romper o chamado', 'occultism', 'O nome volta ao poço, e o chamado se rompe.'),
        approach('B6', 2, 'Respirar contra a sensação de afogamento e recusar o próximo verso', 'will', 'O grupo controla a respiração e recusa o verso seguinte.'),
        approach('B6', 3, 'Desatar o trançado de cabelos sem romper o fio que sustenta a passagem', 'dexterity', 'O trançado é desatado sem romper a passagem.')
      ],
      'água invisível preenche os pulmões de todos. Um herói precisa descer pela corda e responder ao canto no fundo do poço para que os demais voltem a respirar.'
    ),
    B7: encounter(
      'B7',
      'B',
      'A Mortalha da Rasga-Mortalha',
      'O grito de uma ave invisível rasga o teto e deixa cair uma faixa branca coberta por datas futuras. A cada novo grito, uma das datas se aproxima do presente e o nome de um herói começa a surgir no tecido.',
      [
        approach('B7', 1, 'Comparar cada grito com o eco e localizar o presságio que soa ao contrário', 'perception', 'O presságio invertido é localizado entre os ecos.'),
        approach('B7', 2, 'Interpretar a ordem das datas e descobrir qual morte não pertence ao grupo', 'knowledge', 'A data estranha é retirada da ordem imposta pela mortalha.'),
        approach('B7', 3, 'Seguir penas e correntes de ar até uma passagem que o tecido não alcança', 'survival', 'Penas e correntes de ar conduzem a uma passagem fora do tecido.')
      ],
      'a data atual aparece inteira e a mortalha desce sobre todos. Um herói precisa escrever o próprio nome no tecido e aceitar o presságio para rasgar uma saída aos demais.'
    ),
    B8: encounter(
      'B8',
      'B',
      'A Fome da Cabra-Cabriola',
      'Uma coisa com cascos percorre o lado de fora de uma casa sem portas, falando com vozes de crianças perdidas. A cada resposta, uma nova entrada aparece na parede e dentes crescem ao redor do batente.',
      [
        approach('B8', 1, 'Fechar a marca de convite antes que a criatura complete uma entrada', 'occultism', 'A marca de convite é fechada antes que a entrada se complete.'),
        approach('B8', 2, 'Recusar as vozes infantis e não responder ao pedido vindo da parede', 'will', 'As vozes são recusadas, e nenhuma nova porta se abre.'),
        approach('B8', 3, 'Atravessar o madeiramento enquanto as portas falsas devoram os cômodos', 'athletics', 'O grupo atravessa o madeiramento antes que as portas devorem a casa.')
      ],
      'todas as portas se abrem para a mesma boca. Um herói precisa responder ao chamado e atravessar o batente para que a casa volte a ter paredes.'
    )
  };

  var copy = {
    status: 'prototype_baseline',
    provisionalLabel: 'Conteúdo provisório do protótipo',
    intro: 'O bardo reuniu oito heróis para recuperar duas metades de um mapa e seguir até o último caminho. A natureza do tesouro e o horror familiar permanecem pendentes no GDD.',
    dungeonIntroductions: {
      physical: 'A mata tomou a construção. A primeira metade do mapa está adiante.',
      supernatural: 'As vozes sabem nomes que ninguém pronunciou. A segunda metade do mapa está adiante.',
      final: 'As duas metades apontam para o último caminho.'
    },
    centralEnding: 'A expedição alcançou o tesouro. Sua natureza permanece pendente no GDD.',
    badEnding: 'Os oito heróis morreram. Sem ninguém para conduzir de volta, o bardo também morre.',
    invalidState: 'O protótipo encontrou um estado inválido. Recarregue a página e registre a semente no console.'
  };

  var destinations = {
    physical: {
      id: 'physical',
      name: 'Caminho do Ferro e das Raízes',
      rumor: 'Onde o mato rompe telhas e ferragens, algo guarda uma parte do mapa.',
      landmarkTotal: 5
    },
    supernatural: {
      id: 'supernatural',
      name: 'Caminho das Vozes e dos Espelhos',
      rumor: 'Há vozes nos reflexos, repetindo nomes que ninguém lhes contou.',
      landmarkTotal: 5
    },
    final: {
      id: 'final',
      name: 'Caminho do Legado',
      rumor: 'Duas partes do mapa apontam para aquilo que o bardo herdou.',
      landmarkTotal: 6
    }
  };

  global.ExpeditionData = deepFreeze({
    version: 1,
    statuses: {
      confirmed: 'confirmed',
      prototypeBaseline: 'prototype_baseline',
      pending: 'pending',
      outOfScope: 'out_of_scope'
    },
    competencyOrder: ['strength', 'dexterity', 'perception', 'knowledge', 'occultism', 'will', 'survival', 'athletics'],
    heroOrder: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8'],
    encounterOrder: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'],
    competencies: competencies,
    heroes: heroes,
    encounters: encounters,
    destinations: destinations,
    copy: copy
  });
})(window);
