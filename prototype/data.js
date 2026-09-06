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

  var heroContent = {
    H1: {
      label: 'Gorvak', pronouns: 'Ele/dele', race: 'Anão', profession: 'Ferreiro',
      summary: 'Gorvak é um ferreiro de arquétipo protetor que suporta pesos e horrores para manter os outros de pé, mas se recusa a admitir quando ele próprio precisa de ajuda.',
      presentationText: 'Lugar velho avisa antes de cair. Prestem atenção aos estalos.',
      farewell: '“Não desperdicem o tempo que estou comprando.”',
      opinion: 'reunir o medalhão e libertar Floraí e Pérola. Ivaí deve aceitar pessoalmente o custo da história que impôs aos outros.',
      epilogue: 'reconstrói a forja, mas grava nela os nomes dos companheiros mortos. Passa a ensinar aos aprendizes que força não é suportar tudo sozinho.'
    },
    H2: {
      label: 'Elowen', pronouns: 'Ela/dela', race: 'Elfa', profession: 'Caçadora',
      summary: 'Elowen é uma caçadora de arquétipo batedora que abre caminhos com precisão e rapidez, mas sua confiança no próprio corpo faz com que assuma riscos antes de ouvir o restante do grupo.',
      presentationText: 'Se existe uma entrada, existe uma saída. Vamos encontrá-la antes que precise de nós.',
      farewell: '“Quando eu correr, não olhem para trás.”',
      opinion: 'destruir o medalhão e salvar Ivaí. Vivo, ele deverá responder pelo dano e participar da reparação; morto, escaparia dessa obrigação.',
      epilogue: 'usa sua parte da recompensa para proteger o território de caça e passa a treinar novos batedores. Pela primeira vez, ensina que velocidade também significa saber quando esperar pelo grupo.'
    },
    H3: {
      label: 'Griznik', pronouns: 'Ele/dele', race: 'Goblin', profession: 'Carpinteiro',
      summary: 'Griznik é um carpinteiro de arquétipo construtor que enxerga saídas onde os outros veem apenas ruínas, mas tenta consertar todos os problemas para não encarar aqueles que não pode resolver.',
      presentationText: 'Nada fica de pé por acaso. Descobrimos o que sustenta isto e descobrimos o que pode cair.',
      farewell: '“Eu seguro a estrutura. Vocês aproveitem a saída.”',
      opinion: 'destruir o medalhão e salvar Ivaí para encerrar as mortes da linhagem. A sobrevivência cria obrigação de reparo, não recompensa.',
      epilogue: 'abre uma oficina dedicada a construções seguras e passa a recusar trabalhos que economizem à custa de vidas. Guarda as lascas recolhidas na expedição em uma parede, junto aos nomes de quem não voltou.'
    },
    H4: {
      label: 'Seraphina', pronouns: 'Ela/dela', race: 'Troll', profession: 'Curandeira',
      summary: 'Seraphina é uma curandeira troll de arquétipo sábia que estuda tanto o corpo quanto as forças que o assombram, mas sua certeza de saber o que é melhor pode fazê-la decidir pelos outros.',
      presentationText: 'Observem antes de nomear o perigo. Um diagnóstico apressado também mata.',
      farewell: '“Vivam. Depois decidam o que esta morte significa.”',
      opinion: 'reunir o medalhão e libertar Floraí e Pérola, restaurando o juramento livremente escolhido. Se o jogador destruir o artefato, ela ainda tratará Ivaí enquanto puder, sem transformar cuidado em absolvição.',
      epilogue: 'abre sua casa de cura e registra tudo o que aprendeu, incluindo os próprios erros. Passa a exigir consentimento claro de seus pacientes, reconhecendo que salvar alguém não lhe concede o direito de escolher por essa pessoa.'
    },
    H5: {
      label: 'Bimbren', pronouns: 'Ele/dele', race: 'Gnomo', profession: 'Mensageiro',
      summary: 'Bimbren é um mensageiro gnomo de arquétipo portador do dever que conhece caminhos e carrega pesos que derrubariam outros viajantes, mas sua obsessão em concluir uma entrega pode fazê-lo ignorar o custo da missão.',
      presentationText: 'Destino confirmado. Agora precisamos garantir que todos cheguem até ele.',
      farewell: '“Minha rota termina aqui. A de vocês, não.”',
      opinion: 'reunir o medalhão e libertar Floraí e Pérola. O compromisso original dos amantes foi livremente escolhido e deve prevalecer sobre a falsa missão.',
      epilogue: 'reabre o serviço de mensagens, mas abandona a regra de que toda entrega deve ser concluída a qualquer preço. Registra os nomes dos companheiros em seu livro de rotas e passa a ensinar que o dever existe para servir pessoas, não para sacrificá-las.'
    },
    H6: {
      label: 'Liora', pronouns: 'Ela/dela', race: 'Gnoma', profession: 'Navegadora',
      summary: 'Liora é uma navegadora de arquétipo cartógrafa que transforma sinais mínimos em caminhos seguros, mas sua necessidade de estar certa a impede de admitir quando perdeu o rumo.',
      presentationText: 'Marquem a entrada. Um caminho só existe quando sabemos percorrê-lo nos dois sentidos.',
      farewell: '“O caminho está marcado. Não deixem que termine comigo.”',
      opinion: 'destruir o medalhão e salvar Ivaí. Uma pessoa viva pode responder pelo que fez, registrar a verdade e corrigir o rumo.',
      epilogue: 'conclui o atlas, mas publica também seus erros, dúvidas e rotas incompletas. Dedica a obra aos companheiros perdidos e passa a ensinar que admitir estar perdida é o primeiro passo para reencontrar o caminho.'
    },
    H7: {
      label: 'Vaelith', pronouns: 'Ele/dele', race: 'Elfo', profession: 'Escriba',
      summary: 'Vaelith é um escriba de arquétipo pesquisador que escala ruínas para registrar conhecimentos proibidos antes que desapareçam, mas sua curiosidade o faz avançar quando deveria deixar certas palavras esquecidas.',
      presentationText: 'Se as paredes quiserem nos ameaçar, ao menos que tenham a cortesia de escrever com clareza.',
      farewell: '“Levem as páginas. Façam minha última linha valer.”',
      opinion: 'reunir o medalhão, libertar os amantes e preservar o artefato como proteção e evidência da verdade ocultada.',
      epilogue: 'organiza o arquivo que buscava, mas restringe textos capazes de causar dano quando lidos sem preparo. Acrescenta os relatos dos companheiros e passa a ensinar que preservar conhecimento também exige saber quando não o divulgar.'
    },
    H8: {
      label: 'Draska', pronouns: 'Ela/dela', race: 'Goblin', profession: 'Mineradora',
      summary: 'Draska é uma mineradora goblin de arquétipo sobrevivente que mantém a cabeça no lugar quando tudo desaba, mas sua necessidade de prever cada risco dificulta confiar nas decisões dos outros.',
      presentationText: 'Antes de avançar: chão, teto, ar e saída. Nessa ordem.',
      farewell: '“Eu marco o caminho. Vocês terminam de percorrê-lo.”',
      opinion: 'destruir o medalhão e salvar Ivaí como opção de menor dano imediato. A sobrevivência dele é uma dívida a ser paga, não um prêmio.',
      epilogue: 'adquire a mina abandonada e funda a cooperativa que planejava. Na entrada, registra os nomes dos companheiros mortos e estabelece uma regra: nenhuma recompensa vale esconder um risco da equipe.'
    }
  };

  var heroes = {};
  Object.keys(heroPairs).forEach(function (heroId) {
    var content = heroContent[heroId];
    heroes[heroId] = Object.assign({
      id: heroId,
      identityStatus: 'confirmed',
      fixedTextStatus: 'confirmed',
      presentationStatus: 'confirmed',
      artStatus: 'prototype_baseline',
      competenciesStatus: 'confirmed',
      competencyIds: heroPairs[heroId],
      portraitPath: 'assets/heroes/' + content.label.toLowerCase() + '.png',
      source: 'docs/narrativa/herois/Ficha_' + heroId + '_' + content.label + '.md'
    }, content);
  });

  var causalFailureTexts = {
    'A1-1': 'A comporta permanece travada; o redemoinho ricocheteia nas paredes e fecha a saída com cacos.',
    'A1-2': 'As presilhas escapam uma após outra, libertando turbilhões que se unem diante da passagem.',
    'A1-3': 'A fuligem aponta para um falso centro; o grupo entra no giro e os cacos bloqueiam o retorno.',
    'A2-1': 'Um nó errado libera a tensão das estacas, que fecham o corredor atrás dos cipós.',
    'A2-2': 'O vento muda sob a copa fechada, conduzindo o grupo ao corredor de estacas ocultas.',
    'A2-3': 'A regra reconstruída repete a mentira dos pés virados, e árvores tombadas isolam a única saída.',
    'A3-1': 'As cunhas se partem sob o primeiro impacto, deixando o socador livre para perseguir o grupo.',
    'A3-2': 'O ritmo muda no meio da travessia, e os pilões menores empurram o grupo para o centro.',
    'A3-3': 'O verso apagado reaparece na caixa sem corda, acelerando o socador até ele abandonar os trilhos.',
    'A4-1': 'As costelas se fecham antes da escalada terminar, derrubando o grupo de volta ao salão.',
    'A4-2': 'As barras resistem e comprimem os braços que as sustentam, reduzindo o vão a uma fresta.',
    'A4-3': 'O rugido interrompe o movimento diante da trava, e a jaula fecha o último espaço livre.',
    'A5-1': 'A grade emperra acima da baia, e a carcaça retorna arrastando correntes pela saída.',
    'A5-2': 'O fecho prende a ferramenta nas correntes aquecidas, que selam o corredor com fogo.',
    'A5-3': 'A leitura do ciclo atrasa uma descarga; a caldeira entra em sobrepressão e incendeia a passagem.',
    'A6-1': 'As raízes arrancadas se dividem em fibras menores e apertam o corredor por todos os lados.',
    'A6-2': 'O túnel alcança tecido ainda vivo, que se fecha ao redor do grupo como uma cicatriz.',
    'A6-3': 'O nome rompido pertence a outro morto; o vínculo do Corpo-Seco se fortalece e reúne as raízes.',
    'A7-1': 'Os ganchos destravados descem juntos e amontoam os sacos diante da saída.',
    'A7-2': 'Uma corrente cede durante o balanço, lançando o grupo de volta à esteira da prensa.',
    'A7-3': 'Uma voz reconhecida recebe resposta; os sacos se agitam e seus ganchos fecham o corredor.',
    'A8-1': 'Os apoios se apoiam numa viga podre, que transfere todo o peso para o centro do forro.',
    'A8-2': 'A passada chega antes da travessia, quebrando os caibros e encurtando a passagem.',
    'A8-3': 'Um eco é tomado por passo real; o grupo entra justamente na faixa onde o teto desaba.',
    'B1-1': 'O eco escolhido responde depois do assobio, e a casa fecha suas frestas ao redor das vozes.',
    'B1-2': 'A promessa apontada como falsa pertence a um dos heróis, e a Matinta apaga seu nome das paredes.',
    'B1-3': 'O assobio abandona o postigo antes que ele seja arrancado e ocupa todas as janelas da casa.',
    'B2-1': 'A sombra escolhida pertence a um morto comum; a figura da frente apaga as velas dos vivos.',
    'B2-2': 'O vínculo resiste nos panos e troca os nomes bordados, incorporando o grupo ao cortejo.',
    'B2-3': 'A costura se rompe junto com o tecido funerário, e as almas reconhecem os nomes expostos.',
    'B3-1': 'Um reflexo é tomado por olho verdadeiro, e as lembranças projetadas cercam o grupo em fogo.',
    'B3-2': 'A memória sustentada contém uma mentira; suas versões queimadas apagam o caminho de volta.',
    'B3-3': 'O barro seca antes da travessia terminar, e as luzes passam a arder sob a pele.',
    'B4-1': 'As exigências parecem compatíveis porque a imitadora altera os troncos durante a comparação.',
    'B4-2': 'O nome desfeito pertence à guardiã verdadeira, ampliando a voz roubada entre as árvores.',
    'B4-3': 'As copas completam o círculo antes da travessia, dobrando os galhos de volta ao mesmo ponto.',
    'B5-1': 'A convocação reconstruída usa a data errada, e o espelho mais antigo troca o rosto de quem lê.',
    'B5-2': 'O reflexo corrigido encontra uma culpa não admitida e ocupa o lugar de quem desviou os olhos.',
    'B5-3': 'O vidro se parte voltado para os demais, multiplicando a figura loira por todo o banheiro.',
    'B6-1': 'O nome restituído pertence a outro poço, e a canção sobe pelas pedras com a voz do grupo.',
    'B6-2': 'O próximo verso interrompe a respiração, tornando o chão seco tão sufocante quanto água profunda.',
    'B6-3': 'Um fio de cabelo se rompe no nó errado, soltando a trança que sustentava a passagem.',
    'B7-1': 'O eco invertido é apenas atraso do salão; o grito verdadeiro aproxima todas as datas do presente.',
    'B7-2': 'A morte apontada como estranha traz o nome de um herói, que termina de surgir na mortalha.',
    'B7-3': 'As penas conduzem a uma corrente de ar fechada pelo tecido, que envolve a saída por inteiro.',
    'B8-1': 'A marca de convite se completa antes de ser fechada, abrindo uma boca dentada na parede.',
    'B8-2': 'Uma voz infantil imita um pedido conhecido e recebe resposta, criando novas portas ao redor.',
    'B8-3': 'O madeiramento termina numa entrada falsa, cujos dentes fecham o cômodo atrás do grupo.'
  };

  function approach(encounterId, number, text, competencyId, successText) {
    var id = encounterId + '-' + number;
    return {
      id: id,
      text: text,
      textStatus: 'confirmed',
      competencyId: competencyId,
      successText: successText,
      failureText: causalFailureTexts[id],
      successTextStatus: 'prototype_baseline',
      failureTextStatus: 'prototype_baseline'
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
      deathText: failureText.charAt(0).toUpperCase() + failureText.slice(1),
      deathTextStatus: 'confirmed',
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
      'Um cadáver ressequido foi incorporado ao tronco central de um pomar subterrâneo. Suas raízes atravessam outros corpos e apertam o corredor como dedos, enquanto frutos duros caem e se abrem cheios de dentes de diferentes povos mortais.',
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
    intro: 'Duas partes do mapa aguardam em caminhos diferentes. O grupo decide qual delas buscar primeiro.',
    centralEnding: 'Na Casa do Conselho, Ivaí decide reunir ou destruir o Medalhão das Duas Margens e assume a consequência escolhida.',
    badEnding: 'Os oito heróis morreram. Sem ninguém para conduzir de volta, o bardo também morre.',
    invalidState: 'O protótipo encontrou um estado inválido. Recarregue a página e registre a semente no console.'
  };

  var destinations = {
    physical: {
      id: 'physical',
      name: 'Caminho da Igreja',
      rumor: 'Sob a igreja tomada pela mata, uma prisioneira de pedra guarda parte do caminho.',
      previewPath: 'assets/destinations/caminho-da-igreja.png',
      landmarkTotal: 5
    },
    supernatural: {
      id: 'supernatural',
      name: 'Parque das Águas Assombradas',
      rumor: 'Nas atrações abandonadas, uma figueira aprisiona uma voz que conhece o mapa.',
      previewPath: 'assets/destinations/parque-das-aguas-assombradas.png',
      landmarkTotal: 5
    },
    final: {
      id: 'final',
      name: 'Vilarejo Partido',
      rumor: 'As duas peças sobrepostas revelam o vilarejo onde a verdade foi enterrada.',
      previewPath: 'assets/destinations/vilarejo-partido.png',
      landmarkTotal: 6
    }
  };

  global.ExpeditionData = deepFreeze({
    version: 2,
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
