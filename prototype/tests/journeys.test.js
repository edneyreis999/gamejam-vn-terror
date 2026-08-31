(function (global) {
  'use strict';

  var Test = global.ExpeditionTest;
  var Data = global.ExpeditionData;
  var Engine = global.ExpeditionEngine;
  var MAX_SCENARIO_SEED = 100;
  var MAX_DEATH_STEPS = 240;
  var MAX_SHORT_JOURNEY_STEPS = 100;
  var MAX_FULL_JOURNEY_STEPS = 120;
  var MAX_ORDER_JOURNEY_STEPS = 180;

  function fixture(width) {
    var root = document.createElement('div');
    root.style.position = 'fixed';
    root.style.insetInlineStart = '-10000px';
    root.style.width = (width || 1000) + 'px';
    document.body.appendChild(root);
    var controller = global.ExpeditionApp.createController(root);
    return {
      root: root,
      controller: controller,
      cleanup: function () {
        controller.destroy();
        root.remove();
      }
    };
  }

  function availableDestination(state, preferred) {
    var available = Engine.deriveDestinationAvailability(state);
    return available.indexOf(preferred) >= 0 ? preferred : available[0];
  }

  function chooseRoute(current, dungeonId) {
    if (current.controller.getState().selectedDungeonId === dungeonId) {
      return;
    }
    var control = current.root.querySelector('[data-destination-control][value="' + dungeonId + '"]');
    Test.truthy(control, 'O caminho disponível precisa ter um rádio nativo.');
    control.click();
    Test.equal(current.controller.getState().selectedDungeonId, dungeonId);
    Test.truthy(control.checked);
  }

  function ensureHeroes(current, heroIds) {
    heroIds.forEach(function (heroId) {
      var control = current.root.querySelector('[data-action="toggle-hero"][data-id="' + heroId + '"]');
      Test.truthy(control, 'O controle de herói precisa existir.');
      if (control.getAttribute('aria-pressed') !== 'true') {
        control.click();
      }
      control = current.root.querySelector('[data-action="toggle-hero"][data-id="' + heroId + '"]');
      Test.equal(control.getAttribute('aria-pressed'), 'true');
      Test.includes(current.controller.getState().draftPartyIds, heroId);
    });
  }

  function startEncounter(current, heroIds, seed) {
    current.root.querySelector('[data-action="begin"]').click();
    current.root.querySelector('[data-action="continue-intro"]').click();
    (heroIds || ['H1', 'H2', 'H3']).forEach(function (heroId) {
      current.root.querySelector('[data-id="' + heroId + '"]').click();
    });
    chooseRoute(current, 'physical');
    current.root.querySelector('[data-action="depart"]').click();
    current.root.querySelector('[data-action="enter-dungeon"]').click();
    if (seed !== undefined) {
      throw new Error('A jornada de interface usa a semente de início fornecida pelo controlador.');
    }
  }

  function encounterFor(state) {
    return Data.encounters[state.assignments[state.dungeonId][state.position - 1]];
  }

  function uncoveredApproach(state) {
    var covered = [];
    state.partyIds.forEach(function (heroId) {
      Data.heroes[heroId].competencyIds.forEach(function (competencyId) {
        if (covered.indexOf(competencyId) < 0) {
          covered.push(competencyId);
        }
      });
    });
    return encounterFor(state).approaches.filter(function (approach) {
      return covered.indexOf(approach.competencyId) < 0;
    })[0];
  }

  function successfulApproach(state) {
    var covered = [];
    state.partyIds.forEach(function (heroId) {
      Data.heroes[heroId].competencyIds.forEach(function (competencyId) {
        if (covered.indexOf(competencyId) < 0) {
          covered.push(competencyId);
        }
      });
    });
    return encounterFor(state).approaches.filter(function (approach) {
      return covered.indexOf(approach.competencyId) >= 0;
    })[0];
  }

  function stateForFirstEncounter(seed, heroIds) {
    var state = Engine.createReadyState();
    state = Engine.dispatch(state, { type: 'BEGIN', seed: seed }).state;
    state = Engine.dispatch(state, { type: 'CONTINUE_INTRO' }).state;
    state = Engine.dispatch(state, { type: 'SELECT_DESTINATION', dungeonId: 'physical' }).state;
    heroIds.forEach(function (heroId) { state = Engine.dispatch(state, { type: 'TOGGLE_HERO', heroId: heroId }).state; });
    state = Engine.dispatch(state, { type: 'DEPART' }).state;
    return Engine.dispatch(state, { type: 'ENTER_DUNGEON' }).state;
  }

  function scenarioForViability(target) {
    var combinations = [];
    for (var first = 0; first < Data.heroOrder.length - 2; first += 1) {
      for (var second = first + 1; second < Data.heroOrder.length - 1; second += 1) {
        for (var third = second + 1; third < Data.heroOrder.length; third += 1) {
          combinations.push([Data.heroOrder[first], Data.heroOrder[second], Data.heroOrder[third]]);
        }
      }
    }
    for (var seed = 1; seed < MAX_SCENARIO_SEED; seed += 1) {
      for (var index = 0; index < combinations.length; index += 1) {
        var state = stateForFirstEncounter(seed, combinations[index]);
        if (Engine.deriveViability(state.partyIds, encounterFor(state)).count === target) {
          return { seed: seed, heroIds: combinations[index] };
        }
      }
    }
    throw new Error('Nenhuma fixture de viabilidade ' + target + '/3 foi encontrada.');
  }

  function mountSeededEncounter(current, scenario) {
    Test.truthy(current.controller.dispatch({ type: 'BEGIN', seed: scenario.seed }).ok);
    Test.truthy(current.controller.dispatch({ type: 'CONTINUE_INTRO' }).ok);
    scenario.heroIds.forEach(function (heroId) {
      current.root.querySelector('[data-id="' + heroId + '"]').click();
    });
    chooseRoute(current, 'physical');
    current.root.querySelector('[data-action="depart"]').click();
    current.root.querySelector('[data-action="enter-dungeon"]').click();
  }

  function driveDeaths(current, target) {
    var guard = 0;
    while (current.controller.getState().deadHeroIds.length < target && guard < MAX_DEATH_STEPS) {
      guard += 1;
      var state = current.controller.getState();
      if (state.phase === 'ready') {
        current.controller.dispatch({ type: 'BEGIN', seed: 17 });
      } else if (state.phase === 'intro') {
        current.controller.dispatch({ type: 'CONTINUE_INTRO' });
      } else if (state.phase === 'formation') {
        var living = Data.heroOrder.filter(function (heroId) { return state.deadHeroIds.indexOf(heroId) < 0; });
        chooseRoute(current, availableDestination(state, 'physical'));
        if (living.length >= 3) {
          living.slice(0, 3).forEach(function (heroId) { current.controller.dispatch({ type: 'TOGGLE_HERO', heroId: heroId }); });
        }
        current.controller.dispatch({ type: 'DEPART' });
      } else if (state.phase === 'dungeon_intro') {
        current.controller.dispatch({ type: 'ENTER_DUNGEON' });
      } else if (state.phase === 'encounter_choice') {
        var approach = uncoveredApproach(state) || encounterFor(state).approaches[0];
        current.controller.dispatch({ type: 'CHOOSE_APPROACH', approachId: approach.id });
        if (state.partyIds.some(function (heroId) { return Data.heroes[heroId].competencyIds.indexOf(approach.competencyId) >= 0; })) {
          current.controller.dispatch({ type: 'ACK_SUCCESS' });
        } else {
          current.controller.dispatch({ type: 'OPEN_SACRIFICE' });
          current.controller.dispatch({ type: 'SELECT_VICTIM', heroId: state.partyIds[0] });
          current.controller.dispatch({ type: 'CONFIRM_SACRIFICE' });
          current.controller.dispatch({ type: 'ACK_DEATH' });
        }
      } else if (state.phase === 'automatic_retreat') {
        current.controller.dispatch({ type: 'ACK_AUTO_RETREAT' });
      } else if (state.phase === 'dungeon_complete') {
        current.controller.dispatch({ type: 'ACK_DUNGEON_COMPLETE' });
      }
    }
    Test.equal(current.controller.getState().deadHeroIds.length, target);
  }

  function completeSafelyByControls(current, seed) {
    Test.truthy(current.controller.dispatch({ type: 'BEGIN', seed: seed }).ok);
    current.root.querySelector('[data-action="continue-intro"]').click();
    var guard = 0;
    while (current.controller.getState().phase !== 'victory' && guard < MAX_SHORT_JOURNEY_STEPS) {
      guard += 1;
      var state = current.controller.getState();
      if (state.phase === 'formation') {
        chooseRoute(current, availableDestination(state, 'physical'));
        ['H1', 'H2', 'H3'].forEach(function (heroId) { current.root.querySelector('[data-id="' + heroId + '"]').click(); });
        current.root.querySelector('[data-action="depart"]').click();
      } else if (state.phase === 'dungeon_intro') {
        current.root.querySelector('[data-action="enter-dungeon"]').click();
      } else if (state.phase === 'encounter_choice') {
        var approach = successfulApproach(state);
        current.root.querySelector('[data-id="' + approach.id + '"]').click();
      } else if (state.phase === 'approach_result') {
        current.root.querySelector('[data-action="ack-success"]').click();
      } else if (state.phase === 'dungeon_complete') {
        current.root.querySelector('[data-action="ack-dungeon-complete"]').click();
      } else {
        throw new Error('Fase inesperada na jornada segura: ' + state.phase);
      }
    }
    Test.equal(current.controller.getState().phase, 'victory');
  }

  function completeControlledFourByControls(current) {
    var parties = {
      physical: ['H1', 'H2', 'H3'],
      supernatural: ['H1', 'H5', 'H6'],
      final: ['H1', 'H6', 'H7']
    };
    var victims = {
      'physical:5': 'H2',
      'supernatural:5': 'H5',
      'final:5': 'H6',
      'final:6': 'H7'
    };
    Test.truthy(current.controller.dispatch({ type: 'BEGIN', seed: 10 }).ok);
    current.root.querySelector('[data-action="continue-intro"]').click();
    var guard = 0;
    while (current.controller.getState().phase !== 'victory' && guard < MAX_FULL_JOURNEY_STEPS) {
      guard += 1;
      var state = current.controller.getState();
      if (state.phase === 'formation') {
        var nextDungeon = availableDestination(state, 'physical');
        chooseRoute(current, nextDungeon);
        parties[nextDungeon].forEach(function (heroId) { current.root.querySelector('[data-id="' + heroId + '"]').click(); });
        current.root.querySelector('[data-action="depart"]').click();
      } else if (state.phase === 'dungeon_intro') {
        current.root.querySelector('[data-action="enter-dungeon"]').click();
      } else if (state.phase === 'encounter_choice') {
        var victim = victims[state.dungeonId + ':' + state.position];
        var approach = victim ? uncoveredApproach(state) : successfulApproach(state);
        current.root.querySelector('[data-id="' + approach.id + '"]').click();
        if (victim) {
          current.root.querySelector('[data-action="open-sacrifice"]').click();
          current.root.querySelector('[data-action="select-victim"][data-id="' + victim + '"]').click();
          current.root.querySelector('[data-action="confirm-sacrifice"]').click();
          current.root.querySelector('[data-action="ack-death"]').click();
        }
      } else if (state.phase === 'approach_result') {
        current.root.querySelector('[data-action="ack-success"]').click();
      } else if (state.phase === 'dungeon_complete') {
        current.root.querySelector('[data-action="ack-dungeon-complete"]').click();
      } else {
        throw new Error('Fase inesperada na jornada controlada: ' + state.phase);
      }
    }
    Test.equal(current.controller.getState().phase, 'victory');
  }

  Test.test('E2E-001 — entrada file local inicia sessão jogável em português', function () {
    var current = fixture();
    Test.equal(document.documentElement.lang, 'pt-BR');
    Test.includes(current.root.textContent, 'Expedição e Sacrifício');
    var productionScripts = Array.prototype.map.call(document.querySelectorAll('script[src]'), function (script) { return script.getAttribute('src'); });
    Test.truthy(productionScripts.indexOf('data.js') < productionScripts.indexOf('game.js'));
    Test.truthy(productionScripts.indexOf('game.js') < productionScripts.indexOf('app.js'));
    current.root.querySelector('[data-action="begin"]').click();
    Test.includes(current.root.textContent, 'Antes da partida');
    current.root.querySelector('[data-action="continue-intro"]').click();
    Test.includes(current.root.textContent, 'Prepare a expedição');
    current.cleanup();
  });

  Test.test('E2E-003 — formação por controles focáveis leva H1/H2/H3 e o bardo ao threshold', function () {
    var current = fixture();
    current.root.querySelector('[data-action="begin"]').click();
    current.root.querySelector('[data-action="continue-intro"]').click();
    ['H1', 'H2', 'H3'].forEach(function (heroId) {
      var card = current.root.querySelector('[data-id="' + heroId + '"]');
      card.focus();
      Test.equal(document.activeElement, card);
      Test.equal(card.tagName, 'BUTTON');
      card.click();
      var updatedCard = current.root.querySelector('[data-id="' + heroId + '"]');
      Test.equal(updatedCard.getAttribute('aria-pressed'), 'true');
      Test.equal(document.activeElement, updatedCard);
    });
    chooseRoute(current, 'physical');
    var depart = current.root.querySelector('[data-action="depart"]');
    depart.focus();
    depart.click();
    Test.includes(current.root.textContent, 'Caminho do Ferro e das Raízes');
    var roster = current.root.querySelector('.roster-region');
    ['H1', 'H2', 'H3', 'Força', 'Vontade', 'Destreza', 'Atletismo', 'Percepção', 'Sobrevivência'].forEach(function (copy) {
      Test.includes(roster.textContent, copy);
    });
    Test.includes(roster.textContent, 'Bardo');
    Test.includes(roster.textContent, 'nenhuma competência');
    current.cleanup();
  });

  Test.test('E2E-004 — consultar elenco interrompe e devolve o encontro intacto', async function () {
    var current = fixture(320);
    startEncounter(current);
    var title = current.root.querySelector('#encounter-title').textContent;
    var approaches = Array.prototype.map.call(current.root.querySelectorAll('[data-action="choose-approach"]'), function (button) { return button.textContent; });
    var trigger = current.root.querySelector('[data-action="open-roster"]');
    trigger.focus();
    trigger.click();
    ['Na expedição', 'Na cidade', 'Mortos'].forEach(function (label) { Test.includes(current.root.querySelector('#roster-dialog').textContent, label); });
    current.root.querySelector('[data-action="close-roster"]').click();
    await new Promise(function (resolve) { global.setTimeout(resolve, 75); });
    Test.equal(document.activeElement, trigger);
    Test.equal(current.root.querySelector('#encounter-title').textContent, title);
    Test.deepEqual(Array.prototype.map.call(current.root.querySelectorAll('[data-action="choose-approach"]'), function (button) { return button.textContent; }), approaches);
    current.cleanup();
  });

  Test.test('E2E-005 — recuar e reformar revisita a atribuição fixa sem antecipar outra', function () {
    var current = fixture();
    startEncounter(current);
    var state = current.controller.getState();
    var first = encounterFor(state).id;
    Test.falsy(state.assignments.physical[1]);
    current.root.querySelector('[data-action="request-retreat"]').click();
    Test.truthy(current.root.querySelector('#required-dialog').open);
    current.root.querySelector('[data-action="confirm-retreat"]').click();
    chooseRoute(current, 'physical');
    ['H1', 'H2', 'H3'].forEach(function (heroId) { current.root.querySelector('[data-id="' + heroId + '"]').click(); });
    current.root.querySelector('[data-action="depart"]').click();
    current.root.querySelector('[data-action="enter-dungeon"]').click();
    Test.equal(encounterFor(current.controller.getState()).id, first);
    Test.falsy(current.controller.getState().assignments.physical[1]);
    current.cleanup();
  });

  Test.test('E2E-006 — viabilidades zero a três ficam ocultas e explicadas após escolha', function () {
    for (var target = 0; target <= 3; target += 1) {
      var current = fixture();
      var scenario = scenarioForViability(target);
      mountSeededEncounter(current, scenario);
      Test.equal(Engine.deriveViability(current.controller.getState().partyIds, encounterFor(current.controller.getState())).count, target);
      Test.equal(current.root.querySelectorAll('[data-action="choose-approach"]').length, 3);
      Test.falsy(current.root.querySelector('.encounter-decision').textContent.indexOf('Competência exigida') >= 0);
      var approach = encounterFor(current.controller.getState()).approaches[0];
      current.root.querySelector('[data-id="' + approach.id + '"]').click();
      Test.includes(current.root.querySelector('.result-panel').textContent, 'Competência exigida: ' + Data.competencies[approach.competencyId].label);
      Test.includes(current.root.querySelector('.result-panel').textContent, current.controller.getState().pendingOutcome.resultText);
      current.cleanup();
    }
  });

  Test.test('E2E-007 — sacrifício confirmado mostra despedida e remove o herói', async function () {
    var current = fixture();
    mountSeededEncounter(current, { seed: 23, heroIds: ['H4', 'H7', 'H8'] });
    var failure = uncoveredApproach(current.controller.getState());
    current.root.querySelector('[data-id="' + failure.id + '"]').click();
    current.root.querySelector('[data-action="open-sacrifice"]').click();
    var victim = current.controller.getState().partyIds[0];
    current.root.querySelector('[data-action="select-victim"][data-id="' + victim + '"]').click();
    Test.equal(document.activeElement.dataset.action, 'cancel-sacrifice');
    current.root.querySelector('#required-dialog').dispatchEvent(new Event('cancel', { cancelable: true }));
    await new Promise(function (resolve) { global.setTimeout(resolve, 75); });
    Test.equal(current.controller.getState().phase, 'sacrifice_choice');
    Test.equal(document.activeElement.dataset.id, victim);
    current.root.querySelector('[data-action="select-victim"][data-id="' + victim + '"]').click();
    current.root.querySelector('[data-action="confirm-sacrifice"]').click();
    Test.includes(current.root.querySelector('.farewell').textContent, victim);
    Test.includes(current.root.querySelector('.result-explanation').textContent, encounterFor(current.controller.getState()).failureText);
    Test.includes(current.root.querySelector('.roster-region').textContent, victim + ' — Morto');
    current.root.querySelector('[data-action="ack-death"]').click();
    Test.falsy(current.controller.getState().partyIds.indexOf(victim) >= 0);
    current.cleanup();
  });

  Test.test('E2E-008 — recuo posterior volta à formação com mortes e posições preservadas', function () {
    var current = fixture();
    mountSeededEncounter(current, { seed: 23, heroIds: ['H4', 'H7', 'H8'] });
    var failure = uncoveredApproach(current.controller.getState());
    current.root.querySelector('[data-id="' + failure.id + '"]').click();
    current.root.querySelector('[data-action="open-sacrifice"]').click();
    var victim = current.controller.getState().partyIds[0];
    current.root.querySelector('[data-action="select-victim"][data-id="' + victim + '"]').click();
    current.root.querySelector('[data-action="confirm-sacrifice"]').click();
    current.root.querySelector('[data-action="ack-death"]').click();
    current.root.querySelector('[data-action="enter-dungeon"]').click();
    var revealed = current.controller.getState().assignments.physical.slice();
    current.root.querySelector('[data-action="request-retreat"]').click();
    current.root.querySelector('[data-action="confirm-retreat"]').click();
    Test.equal(current.controller.getState().phase, 'formation');
    Test.equal(current.controller.getState().position, null);
    Test.includes(current.controller.getState().deadHeroIds, victim);
    Test.deepEqual(current.controller.getState().assignments.physical, revealed);
    current.cleanup();
  });

  Test.test('E2E-009 — última morte da expedição exige reconhecer recuo automático', function () {
    var current = fixture();
    driveDeaths(current, 3);
    Test.equal(current.controller.getState().phase, 'automatic_retreat');
    Test.includes(current.root.textContent, 'O bardo retorna sozinho.');
    Test.truthy(current.root.querySelector('[data-action="ack-auto-retreat"]'));
    var survivors = Data.heroOrder.filter(function (heroId) { return current.controller.getState().deadHeroIds.indexOf(heroId) < 0; });
    current.root.querySelector('[data-action="ack-auto-retreat"]').click();
    Test.equal(current.controller.getState().phase, 'formation');
    survivors.forEach(function (heroId) { Test.includes(current.root.textContent, heroId); });
    current.cleanup();
  });

  Test.test('E2E-002 — vitória inicia campanha limpa e remontagem descarta progresso', function () {
    var current = fixture();
    completeSafelyByControls(current, 83);
    current.root.querySelector('[data-action="new-campaign"]').click();
    Test.equal(current.controller.getState().phase, 'ready');
    Test.deepEqual(current.controller.getState().deadHeroIds, []);
    Test.equal(current.controller.getState().assignments.physical.filter(Boolean).length, 0);
    current.cleanup();
    var reopened = fixture();
    Test.equal(reopened.controller.getState().phase, 'ready');
    Test.includes(reopened.root.textContent, 'Expedição e Sacrifício');
    reopened.cleanup();
  });

  Test.test('E2E-010 — semente fixa atravessa cinco, cinco e seis até vitória', function () {
    var current = fixture();
    completeSafelyByControls(current, 84);
    var state = current.controller.getState();
    var ids = state.assignments.physical.concat(state.assignments.supernatural, state.assignments.final);
    Test.deepEqual([state.assignments.physical.length, state.assignments.supernatural.length, state.assignments.final.length], [5, 5, 6]);
    Test.equal(new Set(ids).size, 16);
    Test.includes(current.root.querySelector('#victory-title').textContent, 'A expedição alcançou o tesouro');
    current.cleanup();
  });

  Test.test('E2E-011 — quatro sobreviventes recebem somente seus epílogos', function () {
    var current = fixture();
    completeControlledFourByControls(current);
    var labels = Array.prototype.map.call(current.root.querySelectorAll('.epilogue-item strong'), function (node) { return node.textContent; });
    Test.deepEqual(labels, ['H1', 'H3', 'H4', 'H8']);
    Test.includes(current.root.querySelector('#victory-title').textContent, 'Sua natureza permanece pendente no GDD');
    current.cleanup();
  });

  Test.test('E2E-012 — oito sacrifícios legais produzem derrota e nova campanha', function () {
    var current = fixture();
    driveDeaths(current, 8);
    Test.equal(current.controller.getState().phase, 'defeat');
    Test.includes(current.root.textContent, 'o bardo também morre');
    Test.falsy(current.root.querySelector('.epilogue-list'));
    current.root.querySelector('[data-action="new-campaign"]').click();
    Test.equal(current.controller.getState().phase, 'ready');
    Test.deepEqual(current.controller.getState().deadHeroIds, []);
    current.cleanup();
  });

  Test.test('E2E-013 — catálogo inteiro preserva conteúdo, JPEG, redação e fallback', function () {
    var current = fixture();
    var warnings = [];
    var originalWarn = console.warn;
    var observed = {};
    console.warn = function () { warnings.push(Array.prototype.slice.call(arguments)); };
    try {
      Test.truthy(current.controller.dispatch({ type: 'BEGIN', seed: 92 }).ok);
      current.root.querySelector('[data-action="continue-intro"]').click();
      var guard = 0;
      while (current.controller.getState().phase !== 'victory' && guard < MAX_FULL_JOURNEY_STEPS) {
        guard += 1;
        var state = current.controller.getState();
        if (state.phase === 'formation') {
          chooseRoute(current, availableDestination(state, 'physical'));
          ensureHeroes(current, ['H1', 'H2', 'H3']);
          current.root.querySelector('[data-action="depart"]').click();
        } else if (state.phase === 'dungeon_intro') {
          current.root.querySelector('[data-action="enter-dungeon"]').click();
        } else if (state.phase === 'encounter_choice') {
          var encounter = encounterFor(state);
          var main = current.root.querySelector('main');
          var image = current.root.querySelector('img[data-optional-image]');
          var buttons = Array.prototype.map.call(current.root.querySelectorAll('[data-action="choose-approach"]'), function (button) { return button.textContent; });
          Test.equal(current.root.querySelector('#encounter-title').textContent, encounter.title);
          Test.equal(current.root.querySelector('.scene-copy .prose').textContent, encounter.description);
          Test.deepEqual(buttons, encounter.approaches.map(function (approach) { return approach.text; }));
          Test.equal(image.getAttribute('src'), encounter.imagePath);
          Test.equal(image.getAttribute('alt'), '');
          Test.falsy(/pool|masmorra física|masmorra sobrenatural|[AB]\d-\d/i.test(main.textContent));
          var before = JSON.stringify(state);
          image.dispatchEvent(new Event('error'));
          Test.truthy(current.root.querySelector('[data-image-region]').classList.contains('image-fallback'));
          Test.falsy(current.root.querySelector('img[data-optional-image]'));
          Test.equal(JSON.stringify(current.controller.getState()), before);
          Test.equal(current.root.querySelectorAll('[data-action="choose-approach"]').length, 3);
          observed[encounter.id] = { imagePath: encounter.imagePath, dungeonId: state.dungeonId };
          var approach = successfulApproach(state);
          current.root.querySelector('[data-id="' + approach.id + '"]').click();
        } else if (state.phase === 'approach_result') {
          current.root.querySelector('[data-action="ack-success"]').click();
        } else if (state.phase === 'dungeon_complete') {
          current.root.querySelector('[data-action="ack-dungeon-complete"]').click();
        } else {
          throw new Error('Fase inesperada no inventário visual: ' + state.phase);
        }
      }
      Test.equal(current.controller.getState().phase, 'victory');
      Test.deepEqual(Object.keys(observed).sort(), Data.encounterOrder.slice().sort());
      Test.equal(new Set(Object.keys(observed).map(function (encounterId) { return observed[encounterId].imagePath; })).size, 16);
      Test.equal(Object.keys(observed).filter(function (encounterId) { return observed[encounterId].dungeonId === 'final'; }).length, 6);
      Test.equal(warnings.filter(function (args) { return args[0] === 'optional_image_failed'; }).length, 16);
      warnings.forEach(function (args) { Test.truthy(/^assets\/encounters\/[ab][1-8]\.jpg$/.test(args[1]), args[1]); });
    } finally {
      console.warn = originalWarn;
      current.cleanup();
    }
  });

  Test.test('E2E-014 — jornada estreita funciona por controles focados com movimento reduzido', function () {
    var current = fixture(320);
    current.root.style.zoom = '2';
    global.expeditionQA.setSeed(20260830);
    var start = current.root.querySelector('[data-action="begin"]');
    start.focus();
    Test.equal(document.activeElement, start);
    start.click();
    var intro = current.root.querySelector('[data-action="continue-intro"]');
    intro.focus();
    intro.click();
    var guard = 0;
    while (current.controller.getState().phase !== 'victory' && guard < MAX_SHORT_JOURNEY_STEPS) {
      guard += 1;
      var state = current.controller.getState();
      var control;
      if (state.phase === 'formation') {
        chooseRoute(current, availableDestination(state, 'physical'));
        ['H1', 'H2', 'H3'].forEach(function (heroId) {
          control = current.root.querySelector('[data-action="toggle-hero"][data-id="' + heroId + '"]');
          if (control && control.getAttribute('aria-pressed') !== 'true') {
            control.focus();
            control.click();
          }
        });
        control = current.root.querySelector('[data-action="depart"]');
      } else if (state.phase === 'dungeon_intro') {
        control = current.root.querySelector('[data-action="enter-dungeon"]');
      } else if (state.phase === 'encounter_choice') {
        var approach = successfulApproach(state);
        control = current.root.querySelector('[data-id="' + approach.id + '"]');
      } else if (state.phase === 'approach_result') {
        control = current.root.querySelector('[data-action="ack-success"]');
      } else if (state.phase === 'dungeon_complete') {
        control = current.root.querySelector('[data-action="ack-dungeon-complete"]');
      } else {
        throw new Error('Fase inesperada na jornada por teclado: ' + state.phase);
      }
      control.focus();
      Test.equal(document.activeElement, control);
      control.click();
    }
    Test.equal(current.controller.getState().phase, 'victory');
    Test.equal(current.root.querySelectorAll('audio, video, [autoplay]').length, 0);
    Test.truthy(global.matchMedia('(prefers-reduced-motion: reduce)').matches || global.matchMedia('(prefers-reduced-motion: no-preference)').matches);
    current.cleanup();
  });

  Test.test('E2E-015 — duas sessões de cada ordem repetem snapshots e validam invariantes', function () {
    [['physical', 'supernatural'], ['supernatural', 'physical']].forEach(function (order) {
      var records = [];
      for (var index = 0; index < 2; index += 1) {
        var current = fixture();
        try {
          Test.deepEqual(global.expeditionQA.setSeed(20260830), { ok: true, seed: 20260830 });
          driveOrderByControls(current, order);
          records.push({ snapshot: global.expeditionQA.snapshot(), validation: global.expeditionQA.validate() });
        } finally {
          current.cleanup();
        }
      }
      Test.deepEqual(records[0].snapshot, records[1].snapshot, order.join(' → '));
      Test.deepEqual(records[0].validation, { ok: true, violations: [] });
      Test.deepEqual(records[1].validation, { ok: true, violations: [] });
      Test.deepEqual(records[0].snapshot.actionHistory.filter(function (event) { return event.type === 'destination_selected'; }).map(function (event) { return event.dungeon; }), [order[0]]);
    });
  });

  function driveOrderByControls(current, order, stopAfterAcknowledgments) {
    if (current.controller.getState().phase === 'ready') {
      Test.truthy(current.controller.dispatch({ type: 'BEGIN', seed: 20260831 }).ok);
      current.root.querySelector('[data-action="continue-intro"]').click();
    }
    var acknowledgments = 0;
    var guard = 0;
    while (current.controller.getState().phase !== 'victory' && guard < MAX_ORDER_JOURNEY_STEPS) {
      guard += 1;
      var state = current.controller.getState();
      if (state.phase === 'formation') {
        var available = Engine.deriveDestinationAvailability(state);
        var desired = acknowledgments < 2 ? order[acknowledgments] : 'final';
        Test.includes(available, desired, 'A ordem pedida deve permanecer disponível.');
        chooseRoute(current, desired);
        ensureHeroes(current, ['H1', 'H2', 'H3']);
        current.root.querySelector('[data-action="depart"]').click();
      } else if (state.phase === 'dungeon_intro') {
        current.root.querySelector('[data-action="enter-dungeon"]').click();
      } else if (state.phase === 'encounter_choice') {
        var approach = successfulApproach(state);
        current.root.querySelector('[data-id="' + approach.id + '"]').click();
      } else if (state.phase === 'approach_result') {
        current.root.querySelector('[data-action="ack-success"]').click();
      } else if (state.phase === 'dungeon_complete') {
        current.root.querySelector('[data-action="ack-dungeon-complete"]').click();
        acknowledgments += 1;
        if (stopAfterAcknowledgments === acknowledgments) {
          return;
        }
      } else {
        throw new Error('Fase inesperada ao dirigir ordem de caminhos: ' + state.phase);
      }
    }
    Test.equal(current.controller.getState().phase, 'victory');
  }

  Test.test('E2E-016 — heróis primeiro, alerta de caminho e partida física preservada', function () {
    var current = fixture();
    current.root.querySelector('[data-action="begin"]').click();
    current.root.querySelector('[data-action="continue-intro"]').click();
    ensureHeroes(current, ['H1', 'H2', 'H3']);
    current.root.querySelector('[data-action="depart"]').click();
    Test.includes(current.root.querySelector('[role="alert"]').textContent, 'Escolha um caminho antes de partir.');
    chooseRoute(current, 'physical');
    current.root.querySelector('[data-action="depart"]').click();
    Test.equal(current.controller.getState().dungeonId, 'physical');
    Test.deepEqual(current.controller.getState().partyIds, ['H1', 'H2', 'H3']);
    Test.includes(current.root.textContent, 'Caminho do Ferro e das Raízes');
    current.cleanup();
  });

  Test.test('E2E-017 — rota sobrenatural pode vir antes dos heróis sem rótulo interno', function () {
    var current = fixture();
    current.controller.dispatch({ type: 'BEGIN', seed: 20260831 });
    current.root.querySelector('[data-action="continue-intro"]').click();
    Test.equal(current.root.querySelectorAll('[data-destination-control]:checked').length, 0);
    Test.falsy(current.root.querySelector('[data-destination-id="final"] input'));
    chooseRoute(current, 'supernatural'); chooseRoute(current, 'physical'); chooseRoute(current, 'supernatural');
    ensureHeroes(current, ['H1', 'H2', 'H3']);
    current.root.querySelector('[data-action="depart"]').click();
    Test.equal(current.controller.getState().dungeonId, 'supernatural');
    Test.falsy(/masmorra sobrenatural|pool b/i.test(current.root.textContent));
    current.cleanup();
  });

  Test.test('E2E-018 — recuo permite alternar caminhos sem perder registros', function () {
    var current = fixture();
    startEncounter(current);
    for (var resolved = 0; resolved < 2; resolved += 1) {
      var success = successfulApproach(current.controller.getState());
      current.root.querySelector('[data-id="' + success.id + '"]').click();
      current.root.querySelector('[data-action="ack-success"]').click();
      current.root.querySelector('[data-action="enter-dungeon"]').click();
    }
    var physicalAssignments = current.controller.getState().assignments.physical.slice(0, 3);
    current.root.querySelector('[data-action="request-retreat"]').click();
    current.root.querySelector('[data-action="confirm-retreat"]').click();
    Test.equal(current.controller.getState().routeProgress.physical, 2);
    chooseRoute(current, 'supernatural'); ensureHeroes(current, ['H1', 'H2', 'H3']); current.root.querySelector('[data-action="depart"]').click(); current.root.querySelector('[data-action="enter-dungeon"]').click();
    var supernaturalAssignment = current.controller.getState().assignments.supernatural[0];
    var deathsBeforeReturn = current.controller.getState().deadHeroIds.slice();
    current.root.querySelector('[data-action="request-retreat"]').click();
    current.root.querySelector('[data-action="confirm-retreat"]').click();
    chooseRoute(current, 'physical'); ensureHeroes(current, ['H1', 'H2', 'H3']); current.root.querySelector('[data-action="depart"]').click(); current.root.querySelector('[data-action="enter-dungeon"]').click();
    Test.deepEqual(current.controller.getState().assignments.physical.slice(0, 3), physicalAssignments);
    Test.equal(current.controller.getState().assignments.supernatural[0], supernaturalAssignment);
    Test.deepEqual(current.controller.getState().routeProgress, { physical: 2, supernatural: 0, final: 0 });
    Test.deepEqual(current.controller.getState().deadHeroIds, deathsBeforeReturn);
    current.cleanup();
  });

  Test.test('E2E-019 — primeira conclusão produz o estado demonstrável do devlog', function () {
    var current = fixture();
    driveOrderByControls(current, ['physical', 'supernatural'], 1);
    Test.truthy(current.root.querySelector('[data-destination-id="physical"].completed'));
    Test.truthy(current.root.querySelector('[value="supernatural"]:checked'));
    Test.includes(current.root.querySelector('[data-destination-id="final"]').textContent, '1 de 2 partes');
    Test.falsy(current.root.querySelector('[data-destination-id="physical"] input'));
    current.cleanup();
  });

  Test.test('E2E-020 — segunda conclusão desbloqueia e seleciona o legado', function () {
    var current = fixture();
    driveOrderByControls(current, ['physical', 'supernatural'], 2);
    Test.equal(current.root.querySelectorAll('.route-card.completed').length, 2);
    Test.truthy(current.root.querySelector('[value="final"]:checked'));
    Test.includes(current.root.querySelector('[data-destination-id="final"]').textContent, '2 de 2 partes');
    ensureHeroes(current, ['H1', 'H2', 'H3']);
    current.root.querySelector('[data-action="depart"]').click();
    Test.equal(current.controller.getState().dungeonId, 'final');
    Test.equal(current.controller.getState().position, 1);
    current.cleanup();
  });

  Test.test('E2E-021 — preparação mantém controles nativos em zoom efetivo e sem mídia automática', function () {
    var current = fixture(320);
    current.root.style.zoom = '2';
    current.root.querySelector('[data-action="begin"]').click(); current.root.querySelector('[data-action="continue-intro"]').click();
    var radio = current.root.querySelector('[value="physical"]');
    Test.equal(radio.type, 'radio');
    radio.click();
    Test.equal(current.controller.getState().selectedDungeonId, 'physical');
    ['H1', 'H2', 'H3'].forEach(function (heroId) {
      var heroControl = current.root.querySelector('[data-action="toggle-hero"][data-id="' + heroId + '"]');
      Test.equal(heroControl.tagName, 'BUTTON');
      heroControl.click();
    });
    current.root.querySelector('[data-action="depart"]').click();
    Test.equal(current.controller.getState().dungeonId, 'physical');
    Test.truthy(current.root.scrollWidth <= 320);
    Test.equal(current.root.querySelectorAll('audio,video,[autoplay]').length, 0);
    current.cleanup();
  });

  Test.test('E2E-022 — seed e diagnóstico QA v2 reproduzem ação bloqueada', function () {
    var current = fixture();
    Test.deepEqual(global.expeditionQA.setSeed(20260831), { ok: true, seed: 20260831 });
    current.root.querySelector('[data-action="begin"]').click(); current.root.querySelector('[data-action="continue-intro"]').click();
    chooseRoute(current, 'supernatural'); ensureHeroes(current, ['H1', 'H2', 'H3']);
    var acceptedBefore = global.expeditionQA.snapshot().actionHistory.length;
    current.controller.dispatch({ type: 'SELECT_DESTINATION', dungeonId: 'final' });
    Test.equal(global.expeditionQA.snapshot().lastRejectedAction.code, 'destination_unavailable');
    Test.equal(global.expeditionQA.snapshot().actionHistory.length, acceptedBefore);
    chooseRoute(current, 'physical');
    Test.equal(global.expeditionQA.snapshot().lastRejectedAction, null);
    Test.deepEqual(global.expeditionQA.validate(), { ok: true, violations: [] });
    current.cleanup();
  });

  function assertCompletedCampaign(current, expectedInitialOrder) {
    var state = current.controller.getState();
    Test.deepEqual(state.routeProgress, { physical: 5, supernatural: 5, final: 6 });
    Test.equal(new Set(state.assignments.physical.concat(state.assignments.supernatural, state.assignments.final)).size, 16);
    Test.deepEqual(state.actionHistory.filter(function (event) { return event.type === 'destination_selected'; }).map(function (event) { return event.dungeon; }), [expectedInitialOrder[0]]);
    Test.deepEqual(state.actionHistory.filter(function (event) { return event.type === 'party_formed'; }).map(function (event) { return event.dungeon; }), expectedInitialOrder.concat('final'));
    Test.deepEqual(global.expeditionQA.validate(), { ok: true, violations: [] });
  }

  Test.test('E2E-023 — campanha física sobrenatural legado fecha 5 5 6', function () {
    var current = fixture();
    driveOrderByControls(current, ['physical', 'supernatural']);
    assertCompletedCampaign(current, ['physical', 'supernatural']);
    current.cleanup();
  });

  Test.test('E2E-024 — campanha sobrenatural física legado fecha 5 5 6', function () {
    var current = fixture();
    driveOrderByControls(current, ['supernatural', 'physical']);
    assertCompletedCampaign(current, ['supernatural', 'physical']);
    Test.equal(Engine.deriveFinalCandidates(current.controller.getState()).length, 6);
    current.cleanup();
  });
})(window);
