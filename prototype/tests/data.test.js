(function (global) {
  'use strict';

  var T = global.ExpeditionTest;
  var Data = global.ExpeditionData;
  var Narrative = global.ExpeditionNarrative;
  var Engine = global.ExpeditionEngine;

  // Transcrição independente de docs/narrativa/herois/Ficha_H1–H8, seções 1, 4, 7 e 8.
  var canonicalHeroes = {
    "H1": {
      "label": "Gorvak",
      "pronouns": "Ele/dele",
      "race": "Anão",
      "profession": "Ferreiro",
      "summary": "Gorvak é um ferreiro de arquétipo protetor que suporta pesos e horrores para manter os outros de pé, mas se recusa a admitir quando ele próprio precisa de ajuda.",
      "presentationText": "Lugar velho avisa antes de cair. Prestem atenção aos estalos.",
      "farewell": "“Não desperdicem o tempo que estou comprando.”",
      "opinion": "reunir o medalhão e libertar Floraí e Pérola. Ivaí deve aceitar pessoalmente o custo da história que impôs aos outros.",
      "epilogue": "reconstrói a forja, mas grava nela os nomes dos companheiros mortos. Passa a ensinar aos aprendizes que força não é suportar tudo sozinho."
    },
    "H2": {
      "label": "Elowen",
      "pronouns": "Ela/dela",
      "race": "Elfa",
      "profession": "Caçadora",
      "summary": "Elowen é uma caçadora de arquétipo batedora que abre caminhos com precisão e rapidez, mas sua confiança no próprio corpo faz com que assuma riscos antes de ouvir o restante do grupo.",
      "presentationText": "Se existe uma entrada, existe uma saída. Vamos encontrá-la antes que precise de nós.",
      "farewell": "“Quando eu correr, não olhem para trás.”",
      "opinion": "destruir o medalhão e salvar Ivaí. Vivo, ele deverá responder pelo dano e participar da reparação; morto, escaparia dessa obrigação.",
      "epilogue": "usa sua parte da recompensa para proteger o território de caça e passa a treinar novos batedores. Pela primeira vez, ensina que velocidade também significa saber quando esperar pelo grupo."
    },
    "H3": {
      "label": "Griznik",
      "pronouns": "Ele/dele",
      "race": "Goblin",
      "profession": "Carpinteiro",
      "summary": "Griznik é um carpinteiro de arquétipo construtor que enxerga saídas onde os outros veem apenas ruínas, mas tenta consertar todos os problemas para não encarar aqueles que não pode resolver.",
      "presentationText": "Nada fica de pé por acaso. Descobrimos o que sustenta isto e descobrimos o que pode cair.",
      "farewell": "“Eu seguro a estrutura. Vocês aproveitem a saída.”",
      "opinion": "destruir o medalhão e salvar Ivaí para encerrar as mortes da linhagem. A sobrevivência cria obrigação de reparo, não recompensa.",
      "epilogue": "abre uma oficina dedicada a construções seguras e passa a recusar trabalhos que economizem à custa de vidas. Guarda as lascas recolhidas na expedição em uma parede, junto aos nomes de quem não voltou."
    },
    "H4": {
      "label": "Seraphina",
      "pronouns": "Ela/dela",
      "race": "Troll",
      "profession": "Curandeira",
      "summary": "Seraphina é uma curandeira troll de arquétipo sábia que estuda tanto o corpo quanto as forças que o assombram, mas sua certeza de saber o que é melhor pode fazê-la decidir pelos outros.",
      "presentationText": "Observem antes de nomear o perigo. Um diagnóstico apressado também mata.",
      "farewell": "“Vivam. Depois decidam o que esta morte significa.”",
      "opinion": "reunir o medalhão e libertar Floraí e Pérola, restaurando o juramento livremente escolhido. Se o jogador destruir o artefato, ela ainda tratará Ivaí enquanto puder, sem transformar cuidado em absolvição.",
      "epilogue": "abre sua casa de cura e registra tudo o que aprendeu, incluindo os próprios erros. Passa a exigir consentimento claro de seus pacientes, reconhecendo que salvar alguém não lhe concede o direito de escolher por essa pessoa."
    },
    "H5": {
      "label": "Bimbren",
      "pronouns": "Ele/dele",
      "race": "Gnomo",
      "profession": "Mensageiro",
      "summary": "Bimbren é um mensageiro gnomo de arquétipo portador do dever que conhece caminhos e carrega pesos que derrubariam outros viajantes, mas sua obsessão em concluir uma entrega pode fazê-lo ignorar o custo da missão.",
      "presentationText": "Destino confirmado. Agora precisamos garantir que todos cheguem até ele.",
      "farewell": "“Minha rota termina aqui. A de vocês, não.”",
      "opinion": "reunir o medalhão e libertar Floraí e Pérola. O compromisso original dos amantes foi livremente escolhido e deve prevalecer sobre a falsa missão.",
      "epilogue": "reabre o serviço de mensagens, mas abandona a regra de que toda entrega deve ser concluída a qualquer preço. Registra os nomes dos companheiros em seu livro de rotas e passa a ensinar que o dever existe para servir pessoas, não para sacrificá-las."
    },
    "H6": {
      "label": "Liora",
      "pronouns": "Ela/dela",
      "race": "Gnoma",
      "profession": "Navegadora",
      "summary": "Liora é uma navegadora de arquétipo cartógrafa que transforma sinais mínimos em caminhos seguros, mas sua necessidade de estar certa a impede de admitir quando perdeu o rumo.",
      "presentationText": "Marquem a entrada. Um caminho só existe quando sabemos percorrê-lo nos dois sentidos.",
      "farewell": "“O caminho está marcado. Não deixem que termine comigo.”",
      "opinion": "destruir o medalhão e salvar Ivaí. Uma pessoa viva pode responder pelo que fez, registrar a verdade e corrigir o rumo.",
      "epilogue": "conclui o atlas, mas publica também seus erros, dúvidas e rotas incompletas. Dedica a obra aos companheiros perdidos e passa a ensinar que admitir estar perdida é o primeiro passo para reencontrar o caminho."
    },
    "H7": {
      "label": "Vaelith",
      "pronouns": "Ele/dele",
      "race": "Elfo",
      "profession": "Escriba",
      "summary": "Vaelith é um escriba de arquétipo pesquisador que escala ruínas para registrar conhecimentos proibidos antes que desapareçam, mas sua curiosidade o faz avançar quando deveria deixar certas palavras esquecidas.",
      "presentationText": "Se as paredes quiserem nos ameaçar, ao menos que tenham a cortesia de escrever com clareza.",
      "farewell": "“Levem as páginas. Façam minha última linha valer.”",
      "opinion": "reunir o medalhão, libertar os amantes e preservar o artefato como proteção e evidência da verdade ocultada.",
      "epilogue": "organiza o arquivo que buscava, mas restringe textos capazes de causar dano quando lidos sem preparo. Acrescenta os relatos dos companheiros e passa a ensinar que preservar conhecimento também exige saber quando não o divulgar."
    },
    "H8": {
      "label": "Draska",
      "pronouns": "Ela/dela",
      "race": "Goblin",
      "profession": "Mineradora",
      "summary": "Draska é uma mineradora goblin de arquétipo sobrevivente que mantém a cabeça no lugar quando tudo desaba, mas sua necessidade de prever cada risco dificulta confiar nas decisões dos outros.",
      "presentationText": "Antes de avançar: chão, teto, ar e saída. Nessa ordem.",
      "farewell": "“Eu marco o caminho. Vocês terminam de percorrê-lo.”",
      "opinion": "destruir o medalhão e salvar Ivaí como opção de menor dano imediato. A sobrevivência dele é uma dívida a ser paga, não um prêmio.",
      "epilogue": "adquire a mina abandonada e funda a cooperativa que planejava. Na entrada, registra os nomes dos companheiros mortos e estabelece uma regra: nenhuma recompensa vale esconder um risco da equipe."
    }
  };

  // Transcrição independente do GDD canônico, seções 12.2 e 12.3.
  var canonicalEncounters = {
    "A1": {
      "title": "O Redemoinho do Saci Engarrafado",
      "description": "Uma oficina abandonada está cercada por garrafas escuras, todas fechadas com pequenas presilhas de latão. Quando a primeira se quebra, um redemoinho atravessa o cômodo, arranca lascas das paredes e incorpora os cacos ao próprio giro.",
      "approaches": [
        "Travar a comporta de ventilação e obrigar o vento a mudar de direção",
        "Fechar as presilhas das garrafas antes que libertem novos turbilhões",
        "Seguir a fuligem e os cacos para localizar o olho imóvel do redemoinho"
      ]
    },
    "A2": {
      "title": "A Trilha de Pés Virados",
      "description": "Uma trilha de terra atravessa uma mata que cresceu para dentro da construção. Pegadas com os calcanhares voltados para a frente indicam caminhos diferentes, enquanto cipós tensionados e estacas escondidas convertem cada direção errada em uma armadilha física.",
      "approaches": [
        "Soltar os nós invertidos sem liberar a tensão das estacas",
        "Abandonar as pegadas e orientar-se pelo vento, pela inclinação e pela vegetação",
        "Reconstruir a regra dos rastros de pés virados e identificar o único desvio coerente"
      ]
    },
    "A3": {
      "title": "O Pilão da Cuca",
      "description": "Uma cozinha de engenho contém um pilão grande o bastante para esmagar uma pessoa. O socador percorre trilhos no teto e muda de direção ao som de uma cantiga de ninar emitida por uma caixa sem corda.",
      "approaches": [
        "Improvisar cunhas com madeira, fibras e cascas para desviar os trilhos",
        "Atravessar os pilões menores acompanhando o ritmo dos impactos",
        "Apagar o verso que prende a cantiga ao socador"
      ]
    },
    "A4": {
      "title": "A Jaula do Mapinguari",
      "description": "Costelas de ferro fecham-se ao redor de um salão coberto de pelos grossos e marcas de garras. Um rugido vindo de lugar nenhum paralisa os músculos enquanto as barras comprimem lentamente tudo o que está dentro.",
      "approaches": [
        "Escalar as costelas antes que o espaço entre elas desapareça",
        "Conter duas barras e abrir uma passagem à força",
        "Resistir ao rugido e alcançar a trava sem se encolher"
      ]
    },
    "A5": {
      "title": "A Cavalariça da Mula-sem-Cabeça",
      "description": "Uma cavalariça de pedra abriga uma carcaça equina de ferro ligada a foles e caldeiras. Sem cabeça, ela percorre baias estreitas enquanto expele fogo pelo pescoço e arrasta correntes incandescentes pelo chão.",
      "approaches": [
        "Erguer a grade de alimentação e prender a carcaça em uma baia",
        "Desconectar o fecho do arreio sem tocar nas correntes aquecidas",
        "Identificar o ciclo de pressão e abrir a válvula entre duas descargas"
      ]
    },
    "A6": {
      "title": "O Pomar do Corpo-Seco",
      "description": "Um cadáver ressequido foi incorporado ao tronco central de um pomar subterrâneo. Suas raízes atravessam outros corpos e apertam o corredor como dedos, enquanto frutos duros caem e se abrem cheios de dentes de diferentes povos mortais.",
      "approaches": [
        "Arrancar as raízes principais antes que fechem a passagem",
        "Identificar fibras mortas e improvisar um túnel entre os pontos sem seiva",
        "Romper o nome que prende o cadáver à terra"
      ]
    },
    "A7": {
      "title": "O Depósito do Homem do Saco",
      "description": "Sacos pendem de ganchos móveis em um depósito sem janelas. Alguns contêm apenas areia; outros se debatem e chamam os heróis pelas vozes de pessoas conhecidas enquanto uma esteira conduz todos para uma prensa.",
      "approaches": [
        "Destravar os ganchos certos e abrir espaço entre os sacos",
        "Balançar entre as correntes e alcançar a saída antes da prensa",
        "Ignorar as vozes conhecidas e não abrir os sacos que pedem ajuda"
      ]
    },
    "A8": {
      "title": "O Telhado da Pisadeira",
      "description": "O grupo entra no forro baixo de um casarão, onde telhas e vigas descem a cada passo pesado ouvido acima. A presença nunca aparece inteira: somente pés ossudos projetam marcas no reboco enquanto o teto comprime o peito de quem está embaixo.",
      "approaches": [
        "Distribuir o peso pelas vigas mestras e improvisar apoios para o teto",
        "Rastejar entre os caibros antes da próxima passada",
        "Distinguir os passos reais dos ecos e localizar a faixa que não será pisada"
      ]
    },
    "B1": {
      "title": "O Assobio da Matinta",
      "description": "Um assobio atravessa as frestas de um casarão e responde com a voz do último herói que falou. Cada resposta apaga uma palavra das lembranças do grupo, enquanto portas e janelas respiram como bocas tentando repetir os nomes restantes.",
      "approaches": [
        "Comparar o assobio com os ecos e localizar a fresta que responde antes do som",
        "Reunir as promessas riscadas nas paredes e descobrir qual delas nunca foi feita",
        "Arrancar o postigo onde o assobio se aloja e expô-lo ao lado de fora"
      ]
    },
    "B2": {
      "title": "A Procissão das Almas",
      "description": "Uma procissão atravessa o corredor sem mover os pés. Cada figura carrega uma vela e um pano bordado com o nome de alguém do grupo; quando a chama correspondente se apaga, a pessoa começa a desaparecer das lembranças dos companheiros.",
      "approaches": [
        "Encontrar a única figura cuja sombra aponta contra a luz das velas",
        "Apagar dos panos o vínculo que atribui os vivos à procissão",
        "Desmanchar a costura de cada nome sem rasgar o tecido funerário"
      ]
    },
    "B3": {
      "title": "Os Olhos do Boitatá",
      "description": "Pontos de fogo abrem-se na escuridão como olhos sem pálpebras. Eles não queimam a pele: iluminam lembranças que os heróis esconderam e incendeiam essas cenas por dentro, até que a vítima já não saiba se viveu ou inventou o próprio passado.",
      "approaches": [
        "Distinguir os olhos verdadeiros dos reflexos nas lembranças projetadas",
        "Sustentar uma memória verdadeira sem desviar o olhar para as versões queimadas",
        "Cobrir o corpo com barro frio e avançar seguindo o vento, não as luzes"
      ]
    },
    "B4": {
      "title": "A Promessa Falsificada à Comadre Fulozinha",
      "description": "Uma voz entre as árvores cobra uma promessa que nenhum herói se lembra de ter feito. A presença imita a guardiã da mata, mas deixa exigências contraditórias gravadas nos troncos e fecha a floresta ao redor de quem aceita uma delas.",
      "approaches": [
        "Comparar as exigências e provar que a promessa foi composta de relatos incompatíveis",
        "Desfazer o nome roubado que permite à imitadora falar como guardiã",
        "Cruzar as copas antes que os galhos completem o círculo"
      ]
    },
    "B5": {
      "title": "O Espelho da Loira do Banheiro",
      "description": "Um banheiro escolar apodrecido repete o grupo em espelhos que não refletem a mesma hora. A figura loira aparece sempre no vidro mais antigo e troca detalhes com quem a observa: primeiro o uniforme, depois o rosto, por fim o lugar fora do espelho.",
      "approaches": [
        "Reunir datas, nomes e riscos nas portas para reconstruir a convocação original",
        "Recusar o reflexo corrigido que promete devolver mortos e apagar culpas",
        "Arrancar o espelho mais antigo da parede e virá-lo contra os demais"
      ]
    },
    "B6": {
      "title": "O Canto da Iara no Poço Seco",
      "description": "Um poço sem água devolve uma canção na voz de quem se inclina sobre ele. Cabelos úmidos sobem pelas pedras e formam uma corda, enquanto cada verso convence o ouvinte de que está se afogando em um lugar completamente seco.",
      "approaches": [
        "Restituir ao poço o nome roubado pela canção e romper o chamado",
        "Respirar contra a sensação de afogamento e recusar o próximo verso",
        "Desatar o trançado de cabelos sem romper o fio que sustenta a passagem"
      ]
    },
    "B7": {
      "title": "A Mortalha da Rasga-Mortalha",
      "description": "O grito de uma ave invisível rasga o teto e deixa cair uma faixa branca coberta por datas futuras. A cada novo grito, uma das datas se aproxima do presente e o nome de um herói começa a surgir no tecido.",
      "approaches": [
        "Comparar cada grito com o eco e localizar o presságio que soa ao contrário",
        "Interpretar a ordem das datas e descobrir qual morte não pertence ao grupo",
        "Seguir penas e correntes de ar até uma passagem que o tecido não alcança"
      ]
    },
    "B8": {
      "title": "A Fome da Cabra-Cabriola",
      "description": "Uma coisa com cascos percorre o lado de fora de uma casa sem portas, falando com vozes de crianças perdidas. A cada resposta, uma nova entrada aparece na parede e dentes crescem ao redor do batente.",
      "approaches": [
        "Fechar a marca de convite antes que a criatura complete uma entrada",
        "Recusar as vozes infantis e não responder ao pedido vindo da parede",
        "Atravessar o madeiramento enquanto as portas falsas devoram os cômodos"
      ]
    }
  };

  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function codes(result) { return result.violations.map(function (item) { return item.code; }); }

  T.test('V2/UT-001 — identidades e apresentações canônicas', function () {
    T.deepEqual(Data.heroOrder.map(function (id) { return Data.heroes[id].label; }), ['Gorvak', 'Elowen', 'Griznik', 'Seraphina', 'Bimbren', 'Liora', 'Vaelith', 'Draska']);
    Data.heroOrder.forEach(function (id) {
      ['label', 'pronouns', 'race', 'profession', 'summary', 'presentationText'].forEach(function (field) {
        T.equal(Data.heroes[id][field], canonicalHeroes[id][field], id + '.' + field);
      });
    });
  });
  T.test('V2/UT-002 — matriz de competências equilibrada', function () {
    var expected = { H1:['strength','will'], H2:['dexterity','athletics'], H3:['perception','survival'], H4:['knowledge','occultism'], H5:['strength','knowledge'], H6:['dexterity','perception'], H7:['occultism','athletics'], H8:['will','survival'] };
    var occurrences = {};
    Data.heroOrder.forEach(function (id) {
      T.deepEqual(Data.heroes[id].competencyIds, expected[id]);
      expected[id].forEach(function (competency) { occurrences[competency] = (occurrences[competency] || 0) + 1; });
    });
    Object.keys(occurrences).forEach(function (competency) { T.equal(occurrences[competency], 2); });
    T.deepEqual(Data.competencyOrder.map(function (id) { return Data.competencies[id].label; }), ['Força', 'Destreza', 'Percepção', 'Conhecimento', 'Ocultismo', 'Vontade', 'Sobrevivência', 'Atletismo']);
    T.equal(Data.competencyOrder.filter(function (id) { return Data.competencies[id].family === 'bodily'; }).length, 4);
    T.equal(Data.competencyOrder.filter(function (id) { return Data.competencies[id].family === 'liminal'; }).length, 4);
    T.truthy(Object.isFrozen(Data.heroes.H8.competencyIds));
    T.falsy(Data.heroes.ivai);
  });
  T.test('V2/UT-003 — textos fixos existem sem variantes', function () {
    Data.heroOrder.forEach(function (id) {
      ['farewell', 'opinion', 'epilogue'].forEach(function (field) {
        T.equal(Data.heroes[id][field], canonicalHeroes[id][field], id + '.' + field);
        T.equal(Engine.resolvePassage(field + '.' + id), canonicalHeroes[id][field], 'Trecho ' + field + '.' + id);
      });
    });
  });
  T.test('V2/UT-004 — conteúdo público obrigatório é validado', function () {
    var fixture = clone(Data); delete fixture.heroes.H1.summary;
    var result = Engine.validateCatalog(fixture, Narrative);
    T.includes(codes(result), 'invalid_hero_content');
    T.deepEqual(result.violations.filter(function (item) { return item.code === 'invalid_hero_content'; })[0].context, { heroId:'H1', field:'summary' });
    fixture = clone(Data); fixture.heroes.H8.competencyIds = fixture.heroes.H1.competencyIds.slice();
    T.includes(codes(Engine.validateCatalog(fixture, Narrative)), 'duplicate_hero_pair');
    fixture = clone(Data); fixture.encounters.A1.approaches.pop();
    T.includes(codes(Engine.validateCatalog(fixture, Narrative)), 'invalid_approach_count');
    fixture = clone(Data); fixture.encounters.B2.approaches[2].competencyId = fixture.encounters.B2.approaches[0].competencyId;
    T.includes(codes(Engine.validateCatalog(fixture, Narrative)), 'duplicate_approach_competency');
  });
  T.test('V2/UT-005 — dezesseis encontros e quarenta e oito abordagens', function () {
    T.deepEqual(Object.keys(Data.encounters).sort(), Data.encounterOrder.slice().sort());
    T.equal(Data.encounterOrder.length, 16);
    var count = 0;
    var competencyOccurrences = {};
    Data.encounterOrder.forEach(function (id) {
      var encounter = Data.encounters[id];
      T.equal(encounter.title, canonicalEncounters[id].title, id + '.title');
      T.equal(encounter.description, canonicalEncounters[id].description, id + '.description');
      T.deepEqual(encounter.approaches.map(function (approach) { return approach.text; }), canonicalEncounters[id].approaches, id + '.approaches');
      T.truthy(encounter.deathText); T.equal(encounter.approaches.length, 3);
      var familyCounts = { bodily: 0, liminal: 0 };
      encounter.approaches.forEach(function (approach) {
        T.truthy(approach.successText); T.truthy(approach.failureText); count += 1;
        competencyOccurrences[approach.competencyId] = (competencyOccurrences[approach.competencyId] || 0) + 1;
        familyCounts[Data.competencies[approach.competencyId].family] += 1;
      });
      T.deepEqual([familyCounts.bodily, familyCounts.liminal], encounter.pool === 'A' ? [2, 1] : [1, 2], id);
      T.equal(encounter.imagePath, 'assets/encounters/' + id.toLowerCase() + '.jpg');
    });
    T.equal(count, 48);
    Data.competencyOrder.forEach(function (id) { T.equal(competencyOccurrences[id], 6, id); });
    Data.encounterOrder.forEach(function (id) { T.truthy(Engine.deriveViability(['H1','H2','H3'], id).count >= 1, id); });
    var zero = Engine.deriveViability(['H4','H7','H8'], 'A1');
    T.equal(zero.label, '0/3');
    T.deepEqual(zero.approaches.map(function (approach) { return approach.viable; }), [false, false, false]);
  });
  T.test('V2/UT-006 — todas as cenas resolvem texto', function () {
    Object.keys(Narrative.scenes).forEach(function (sceneId) {
      Narrative.scenes[sceneId].passageIds.forEach(function (passageId) { T.truthy(Engine.resolvePassage(passageId), sceneId + '/' + passageId); });
    });
    T.truthy(Engine.validateCatalog(Data, Narrative).ok);
  });
  T.test('V2/UT-007 — trecho obrigatório ausente falha fechado', function () {
    var fixture = clone(Narrative); delete fixture.passages['prologue.01'];
    var result = Engine.validateCatalog(Data, fixture);
    T.deepEqual(result.violations.filter(function (item) { return item.context.passageId === 'prologue.01'; })[0], {
      code:'missing_narrative_content', message:'Um trecho obrigatório da história está ausente.', context:{sceneId:'prologue', passageId:'prologue.01'}
    });
  });
  T.test('V2/UT-008 — referências ambíguas ou inexistentes falham fechado', function () {
    var fixture = clone(Narrative); fixture.passages['prologue.01'].heroText = { heroId:'H1', field:'summary' };
    T.includes(codes(Engine.validateCatalog(Data, fixture)), 'missing_narrative_content');
    fixture = clone(Narrative); fixture.scenes.prologue.passageIds[0] = 'unknown';
    T.includes(codes(Engine.validateCatalog(Data, fixture)), 'missing_narrative_content');
  });
  T.test('V2/UT-009 — caminhos remotos e travessias são rejeitados', function () {
    ['https://example.invalid/hero.png','//example.invalid/a.png','data:image/png,x','javascript:alert(1)','/tmp/a.png','assets/../outside.png','assets\\..\\outside.png'].forEach(function (path) {
      var fixture = clone(Data); fixture.heroes.H1.portraitPath = path;
      var violation = Engine.validateCatalog(fixture, Narrative).violations.filter(function (item) { return item.code === 'unsafe_asset_path'; })[0];
      T.equal(violation.context.path, path);
    });
  });
  T.test('V2/UT-010 — caminhos locais opcionais são aceitos', function () {
    T.truthy(Engine.validateCatalog(Data, Narrative).ok);
    T.truthy(/^assets\//.test(Data.heroes.H1.portraitPath));
    T.truthy(/^assets\//.test(Narrative.backgrounds.council.path));
  });
  T.test('V2/UT-011 — prosa permanece texto literal', function () {
    var fixture = clone(Narrative); fixture.passages['prologue.01'] = { text:'<img src=x onerror=alert(1)>' };
    T.equal(Engine.resolvePassage('prologue.01', Data, fixture), '<img src=x onerror=alert(1)>');
  });
  T.test('V2/UT-012 — metadados autorais não vazam para a projeção', function () {
    var view = Engine.derivePlayerView(Engine.createReadyState());
    T.falsy(JSON.stringify(view).includes('prototype_baseline'));
    T.falsy(JSON.stringify(view).includes('sourceStatus'));
  });
})(window);
