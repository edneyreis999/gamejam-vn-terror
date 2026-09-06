(function (global) {
  'use strict';

  function deepFreeze(value) {
    if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
    Object.getOwnPropertyNames(value).forEach(function (key) { deepFreeze(value[key]); });
    return Object.freeze(value);
  }

  var passages = {};
  var scenes = {};

  function text(id, speakerId, value, status, source) {
    passages[id] = {
      id: id,
      speakerId: speakerId,
      text: value,
      status: status || 'prototype_baseline',
      source: source || 'ADR-007'
    };
    return id;
  }

  function heroText(id, heroId, field) {
    passages[id] = {
      id: id,
      speakerId: heroId,
      heroText: { heroId: heroId, field: field },
      status: 'confirmed',
      source: 'docs/narrativa/herois/'
    };
    return id;
  }

  function encounterText(id, encounterId, field, approachId) {
    var reference = { encounterId: encounterId, field: field };
    if (approachId) reference.approachId = approachId;
    passages[id] = {
      id: id,
      speakerId: null,
      encounterText: reference,
      status: field === 'description' || field === 'deathText' ? 'confirmed' : 'prototype_baseline',
      source: field === 'description' || field === 'deathText' ? 'GDD seção 12' : 'ADR-007'
    };
    return id;
  }

  function scene(id, backgroundId, passageIds) {
    scenes[id] = { id: id, backgroundId: backgroundId, passageIds: passageIds };
  }

  scene('prologue', 'tavern', [
    text('prologue.01', null, 'A chuva acompanha Ivaí até a taverna, onde oito viajantes esperam por uma promessa de tesouro.'),
    text('prologue.02', 'ivai', 'Minha mãe deixou registros de duas rotas e de um vilarejo apagado dos mapas. A recompensa será dividida entre quem voltar comigo.'),
    text('irati.01', null, 'Irati escrevera na margem do último registro: “Não leve outras pessoas para pagar uma dívida que não escolheram.”', 'confirmed', 'GDD seção 4.7')
  ]);

  scene('threshold.physical', 'church', [text('threshold.physical.01', 'ivai', 'A igreja se inclina sobre raízes antigas. O caminho segue sob o altar, onde a pedra parece respirar.')]);
  scene('threshold.supernatural', 'figtree', [text('threshold.supernatural.01', 'ivai', 'As atrações do parque rangem sem vento. Uma voz chama de dentro da figueira mais velha.')]);
  scene('threshold.final', 'council', [text('threshold.final.01', 'ivai', 'As peças sobrepostas conduzem às ruínas do Vilarejo Partido e à Casa do Conselho.')]);

  global.ExpeditionData.encounterOrder.forEach(function (encounterId) {
    var encounter = global.ExpeditionData.encounters[encounterId];
    scene('encounter.' + encounterId, 'encounter', [encounterText('encounter.' + encounterId + '.01', encounterId, 'description')]);
    encounter.approaches.forEach(function (approach) {
      var successScene = 'result.' + approach.id + '.success';
      var failureScene = 'result.' + approach.id + '.failure';
      scene(successScene, 'encounter', [encounterText(successScene + '.01', encounterId, 'successText', approach.id)]);
      scene(failureScene, 'encounter', [encounterText(failureScene + '.01', encounterId, 'failureText', approach.id)]);
    });
    var deathPassage = encounterText('death.' + encounterId + '.context', encounterId, 'deathText');
    scene('death.' + encounterId, 'encounter', [deathPassage]);
  });

  global.ExpeditionData.heroOrder.forEach(function (heroId) {
    heroText('farewell.' + heroId, heroId, 'farewell');
    scene('opinion.' + heroId, 'council', [heroText('opinion.' + heroId, heroId, 'opinion')]);
    scene('epilogue.' + heroId, 'council', [heroText('epilogue.' + heroId, heroId, 'epilogue')]);
    text('memorial.' + heroId, null, global.ExpeditionData.heroes[heroId].label + ' não voltou da expedição.', 'confirmed', 'GDD seção 16.3');
  });

  scene('lover.physical.first', 'church', [
    text('lover.physical.01', null, 'Sob o altar, Pérola permanece incorporada à pedra, consciente e protegida por uma metade quebrada do juramento.'),
    text('lover.physical.warning', 'perola', 'A outra margem guarda o caminho. Não confiem numa promessa que omite o preço.'),
    text('reward.physical', null, 'Pérola entrega a peça anã do mapa, desenhada antes de sua prisão.')
  ]);
  scene('lover.physical.second', 'church', [
    'lover.physical.01', 'lover.physical.warning',
    text('lover.physical.second', 'perola', 'Se Floraí já entregou a peça dele, então Andirá conduziu vocês até a escolha que deseja.'),
    'reward.physical'
  ]);
  scene('lover.supernatural.first', 'figtree', [
    text('lover.supernatural.01', null, 'Floraí fala entre as raízes da figueira que o mantém prisioneiro, ainda separado de Pérola.'),
    text('lover.supernatural.warning', 'florai', 'Procurem a outra peça. E desconfiem de toda voz que diga haver apenas uma saída.'),
    text('reward.supernatural', null, 'Floraí entrega a peça élfica do mapa, preservada entre as raízes.')
  ]);
  scene('lover.supernatural.second', 'figtree', [
    'lover.supernatural.01', 'lover.supernatural.warning',
    text('lover.supernatural.second', 'florai', 'Se Pérola falou primeiro, então alguém conhece a ordem dos nossos passos e espera pelo reencontro.'),
    'reward.supernatural'
  ]);

  scene('irati.02', 'tavern', [text('irati.02.01', null, 'No verso da primeira peça, Ivaí reconhece outro trecho de Irati: “O mapa encontra a segunda metade; ele não decide o destino do medalhão.”', 'confirmed', 'GDD seção 4.7')]);
  scene('map.reveal', 'tavern', [text('map.reveal.01', null, 'As duas peças do mapa se sobrepõem. Linhas antes incompletas revelam a entrada do Vilarejo Partido.'), text('map.reveal.02', 'ivai', 'É lá que encontraremos a outra metade do medalhão — e a verdade que eu devia ter contado antes.')]);

  scene('automatic_retreat', 'encounter', [text('automatic_retreat.01', null, 'Sem ninguém na expedição para continuar, Ivaí retorna à taverna. Os sobreviventes que ficaram na cidade poderão formar um novo grupo.')]);

  scene('council', 'council', [
    text('council.01', null, 'Na Casa do Conselho, um cofre intacto guarda a segunda metade do Medalhão das Duas Margens.'),
    text('council.02', null, 'O registro de Palotina afirma: reunir as metades liberta Floraí e Pérola, mas entrega a vida do descendente amaldiçoado.'),
    text('council.03', null, 'Destruí-las encerra a maldição da linhagem, remove a proteção dos amantes e permite que Andirá os absorva com suas memórias.'),
    text('irati.03', null, 'O último excerto de Irati confirma que a escolha só pode ser voluntária e que nenhuma das duas consequências pode ser evitada.', 'confirmed', 'GDD seção 4.7'),
    text('council.challenge', null, 'O primeiro sobrevivente encara Ivaí e exige que ele diga por que trouxe o grupo até ali.'),
    text('council.solo', 'ivai', 'Sozinho diante do reflexo, Ivaí admite em voz alta aquilo que ocultou dos que ficaram na cidade.'),
    text('council.confession', 'ivai', 'Andirá me mostrou os dois finais. Eu pretendia destruir o medalhão para sobreviver e chamei vocês com uma promessa de tesouro.'),
    text('council.andira', 'andira', 'Na água parada, uma silhueta de asas escuras sorri sem sair do reflexo: “Agora escolha livremente.”')
  ]);

  scene('ending.reunite', 'council', [
    text('ending.reunite.01', null, 'Ivaí reúne as metades. O juramento volta a existir, e a pedra e as raízes libertam Pérola e Floraí.'),
    text('ending.reunite.02', null, 'Andirá perde os amantes, mas não é destruído. A maldição cobra a vida de Ivaí, que cai longe da água.')
  ]);
  scene('ending.destroy', 'council', [
    text('ending.destroy.01', null, 'Ivaí destrói as metades juntas. A maldição de sua linhagem termina e ele permanece vivo.'),
    text('ending.destroy.02', null, 'Sem a proteção, Andirá absorve Floraí, Pérola e as memórias que conservavam do amor entre as duas margens.')
  ]);
  scene('ending.bad', 'council', [
    text('ending.bad.01', null, 'Com os oito heróis mortos, não resta ninguém para impedir que o reflexo alcance Ivaí em chão seco.'),
    text('ending.bad.02', 'andira', 'Água inexistente enche os pulmões do bardo. A dívida termina antes que o medalhão possa ser escolhido.')
  ]);

  scene('memorial', 'council', [text('memorial.intro', null, 'Antes de partir, os sobreviventes dizem os nomes daqueles que a expedição perdeu.')]);

  global.ExpeditionNarrative = deepFreeze({
    version: 1,
    speakers: {
      ivai: { id: 'ivai', name: 'Ivaí', portraitPath: 'assets/characters/ivai.png' },
      florai: { id: 'florai', name: 'Floraí', portraitPath: 'assets/characters/florai.png' },
      perola: { id: 'perola', name: 'Pérola', portraitPath: 'assets/characters/perola.png' },
      andira: { id: 'andira', name: 'Andirá', portraitPath: 'assets/characters/andira.png' }
    },
    backgrounds: {
      tavern: { id: 'tavern', path: 'assets/scenes/taverna.png' },
      church: { id: 'church', path: 'assets/scenes/igreja-interior.png' },
      figtree: { id: 'figtree', path: 'assets/scenes/parque-figueira.png' },
      council: { id: 'council', path: 'assets/scenes/casa-do-conselho.png' },
      encounter: { id: 'encounter', path: null }
    },
    passages: passages,
    scenes: scenes
  });
})(window);
