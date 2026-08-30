(function (global) {
  'use strict';

  var Test = global.ExpeditionTest;
  var Data = global.ExpeditionData;

  function fixture(width) {
    var root = document.createElement('div');
    root.className = 'controller-fixture';
    root.style.position = 'fixed';
    root.style.insetInlineStart = '-10000px';
    root.style.insetBlockStart = '0';
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

  function beginToFormation(controller, seed) {
    Test.truthy(controller.dispatch({ type: 'BEGIN', seed: seed === undefined ? 7 : seed }).ok);
    Test.truthy(controller.dispatch({ type: 'CONTINUE_INTRO' }).ok);
  }

  function selectHeroes(controller, heroIds) {
    heroIds.forEach(function (heroId) {
      Test.truthy(controller.dispatch({ type: 'TOGGLE_HERO', heroId: heroId }).ok);
    });
  }

  function livingIds(state) {
    return Data.heroOrder.filter(function (heroId) {
      return state.deadHeroIds.indexOf(heroId) < 0;
    });
  }

  function ensureParty(controller) {
    var state = controller.getState();
    if (state.phase !== 'formation') {
      return;
    }
    var living = livingIds(state);
    if (living.length >= 3) {
      selectHeroes(controller, living.slice(0, 3));
    }
    Test.truthy(controller.dispatch({ type: 'DEPART' }).ok);
  }

  function failingApproach(state) {
    var encounterId = state.assignments[state.dungeonId][state.position - 1];
    var encounter = Data.encounters[encounterId];
    var covered = [];
    state.partyIds.forEach(function (heroId) {
      Data.heroes[heroId].competencyIds.forEach(function (competencyId) {
        if (covered.indexOf(competencyId) < 0) {
          covered.push(competencyId);
        }
      });
    });
    return encounter.approaches.filter(function (approach) {
      return covered.indexOf(approach.competencyId) < 0;
    })[0] || null;
  }

  function driveDeaths(controller, targetCount) {
    var steps = 0;
    while (controller.getState().deadHeroIds.length < targetCount && steps < 240) {
      steps += 1;
      var state = controller.getState();
      if (state.phase === 'ready') {
        Test.truthy(controller.dispatch({ type: 'BEGIN', seed: 17 }).ok);
      } else if (state.phase === 'intro') {
        Test.truthy(controller.dispatch({ type: 'CONTINUE_INTRO' }).ok);
      } else if (state.phase === 'formation') {
        ensureParty(controller);
      } else if (state.phase === 'dungeon_intro') {
        Test.truthy(controller.dispatch({ type: 'ENTER_DUNGEON' }).ok);
      } else if (state.phase === 'encounter_choice') {
        var failure = failingApproach(state);
        var encounterId = state.assignments[state.dungeonId][state.position - 1];
        var chosen = failure || Data.encounters[encounterId].approaches[0];
        Test.truthy(controller.dispatch({ type: 'CHOOSE_APPROACH', approachId: chosen.id }).ok);
        if (failure) {
          Test.truthy(controller.dispatch({ type: 'OPEN_SACRIFICE' }).ok);
          Test.truthy(controller.dispatch({ type: 'SELECT_VICTIM', heroId: state.partyIds[0] }).ok);
          Test.truthy(controller.dispatch({ type: 'CONFIRM_SACRIFICE' }).ok);
          Test.truthy(controller.dispatch({ type: 'ACK_DEATH' }).ok);
        } else {
          Test.truthy(controller.dispatch({ type: 'ACK_SUCCESS' }).ok);
        }
      } else if (state.phase === 'automatic_retreat') {
        Test.truthy(controller.dispatch({ type: 'ACK_AUTO_RETREAT' }).ok);
      } else if (state.phase === 'dungeon_complete') {
        Test.truthy(controller.dispatch({ type: 'CONTINUE_DUNGEON' }).ok);
      } else {
        throw new Error('Fase inesperada ao produzir mortes legais: ' + state.phase);
      }
    }
    Test.equal(controller.getState().deadHeroIds.length, targetCount, 'A fixture legal deve atingir o número pedido de mortes.');
  }

  function returnToFormation(controller) {
    var guard = 0;
    while (controller.getState().phase !== 'formation' && guard < 80) {
      guard += 1;
      var state = controller.getState();
      if (state.phase === 'dungeon_intro') {
        controller.dispatch({ type: 'ENTER_DUNGEON' });
      } else if (state.phase === 'encounter_choice') {
        var retreat = controller.dispatch({ type: 'REQUEST_RETREAT' });
        if (retreat.ok) {
          controller.dispatch({ type: 'CONFIRM_RETREAT' });
        } else {
          var encounterId = state.assignments[state.dungeonId][state.position - 1];
          var approach = Data.encounters[encounterId].approaches[0];
          controller.dispatch({ type: 'CHOOSE_APPROACH', approachId: approach.id });
        }
      } else if (state.phase === 'approach_result' && state.pendingOutcome.success) {
        controller.dispatch({ type: 'ACK_SUCCESS' });
      } else if (state.phase === 'automatic_retreat') {
        controller.dispatch({ type: 'ACK_AUTO_RETREAT' });
      } else if (state.phase === 'dungeon_complete') {
        controller.dispatch({ type: 'CONTINUE_DUNGEON' });
      } else {
        throw new Error('Não foi possível retornar legalmente à formação a partir de ' + state.phase + '.');
      }
    }
    Test.equal(controller.getState().phase, 'formation');
  }

  function reachThreshold(controller, heroIds) {
    beginToFormation(controller, 23);
    selectHeroes(controller, heroIds || ['H1', 'H2', 'H3']);
    Test.truthy(controller.dispatch({ type: 'DEPART' }).ok);
  }

  function reachEncounter(controller, heroIds, seed) {
    beginToFormation(controller, seed === undefined ? 23 : seed);
    selectHeroes(controller, heroIds || ['H1', 'H2', 'H3']);
    Test.truthy(controller.dispatch({ type: 'DEPART' }).ok);
    Test.truthy(controller.dispatch({ type: 'ENTER_DUNGEON' }).ok);
  }

  function currentEncounter(state) {
    return Data.encounters[state.assignments[state.dungeonId][state.position - 1]];
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
    return currentEncounter(state).approaches.filter(function (approach) {
      return covered.indexOf(approach.competencyId) >= 0;
    })[0];
  }

  function resolveSuccess(controller) {
    var approach = successfulApproach(controller.getState());
    Test.truthy(approach, 'A fixture deve oferecer ao menos uma abordagem coberta.');
    Test.truthy(controller.dispatch({ type: 'CHOOSE_APPROACH', approachId: approach.id }).ok);
    Test.truthy(controller.dispatch({ type: 'ACK_SUCCESS' }).ok);
    return approach;
  }

  function openFailure(controller) {
    var state = controller.getState();
    var approach = failingApproach(state);
    Test.truthy(approach, 'A fixture deve oferecer ao menos uma abordagem descoberta.');
    Test.truthy(controller.dispatch({ type: 'CHOOSE_APPROACH', approachId: approach.id }).ok);
    Test.truthy(controller.dispatch({ type: 'OPEN_SACRIFICE' }).ok);
    return approach;
  }

  function confirmVictim(controller, heroId) {
    Test.truthy(controller.dispatch({ type: 'SELECT_VICTIM', heroId: heroId }).ok);
    Test.truthy(controller.dispatch({ type: 'CONFIRM_SACRIFICE' }).ok);
  }

  function revealThroughPosition(controller, target) {
    while (controller.getState().position < target) {
      resolveSuccess(controller);
      Test.truthy(controller.dispatch({ type: 'ENTER_DUNGEON' }).ok);
    }
  }

  function completeWithoutDeaths(controller, seed) {
    beginToFormation(controller, seed === undefined ? 29 : seed);
    var guard = 0;
    while (controller.getState().phase !== 'victory' && guard < 100) {
      guard += 1;
      var state = controller.getState();
      if (state.phase === 'formation') {
        selectHeroes(controller, ['H1', 'H2', 'H3']);
        Test.truthy(controller.dispatch({ type: 'DEPART' }).ok);
      } else if (state.phase === 'dungeon_intro') {
        Test.truthy(controller.dispatch({ type: 'ENTER_DUNGEON' }).ok);
      } else if (state.phase === 'encounter_choice') {
        resolveSuccess(controller);
      } else if (state.phase === 'dungeon_complete') {
        Test.truthy(controller.dispatch({ type: 'CONTINUE_DUNGEON' }).ok);
      } else {
        throw new Error('Fase inesperada na campanha sem mortes: ' + state.phase);
      }
    }
    Test.equal(controller.getState().phase, 'victory');
  }

  function prepareSoloPartyWithReserve(controller) {
    driveDeaths(controller, 4);
    returnToFormation(controller);
    selectHeroes(controller, livingIds(controller.getState()).slice(0, 3));
    Test.truthy(controller.dispatch({ type: 'DEPART' }).ok);
    Test.truthy(controller.dispatch({ type: 'ENTER_DUNGEON' }).ok);
    for (var index = 0; index < 2; index += 1) {
      openFailure(controller);
      confirmVictim(controller, controller.getState().partyIds[0]);
      Test.truthy(controller.dispatch({ type: 'ACK_DEATH' }).ok);
      Test.truthy(controller.dispatch({ type: 'ENTER_DUNGEON' }).ok);
    }
    Test.equal(controller.getState().partyIds.length, 1);
    Test.equal(livingIds(controller.getState()).length, 2);
  }

  Test.test('IT-001 — apenas index.html é montado automaticamente como entrada', function () {
    Test.falsy(document.getElementById('app'), 'O harness não deve se transformar em uma segunda entrada suportada.');
    Test.truthy(global.ExpeditionApp && typeof global.ExpeditionApp.createController === 'function');
  });

  Test.test('IT-002 — imagem local opcional ausente conserva texto e controles', function () {
    var current = fixture(320);
    reachThreshold(current.controller);
    var scene = current.root.querySelector('[data-image-region]');
    var image = document.createElement('img');
    image.src = 'assets/encounters/inexistente.jpg';
    image.alt = '';
    image.dataset.optionalImage = '';
    scene.appendChild(image);
    image.dispatchEvent(new Event('error', { bubbles: false }));
    Test.truthy(scene.classList.contains('image-fallback'));
    Test.includes(scene.textContent, 'A mata tomou a construção.');
    Test.truthy(current.root.querySelector('[data-action="enter-dungeon"]'));
    current.cleanup();
  });

  Test.test('IT-003 — viewport estreito reflui sem ocultar abertura ou ação', function () {
    var current = fixture(320);
    var artboard = current.root.querySelector('.artboard');
    Test.truthy(current.root.querySelector('[data-action="begin"]'));
    Test.includes(current.root.textContent, 'As competências dos heróis estão visíveis');
    Test.truthy(artboard.getBoundingClientRect().width <= 320);
    Test.truthy(current.root.scrollWidth <= 320, 'A abertura não deve criar rolagem horizontal no contêiner estreito.');
    current.cleanup();
  });

  Test.test('IT-004 — falha de dialog opcional preserva o roster por fallback semântico', function () {
    var current = fixture();
    reachThreshold(current.controller);
    var original = HTMLDialogElement.prototype.showModal;
    HTMLDialogElement.prototype.showModal = function () { throw new Error('capacidade bloqueada'); };
    try {
      current.root.querySelector('[data-action="open-roster"]').click();
      var dialog = current.root.querySelector('#roster-dialog');
      Test.truthy(dialog.hasAttribute('open'));
      Test.includes(dialog.textContent, 'Na expedição');
      Test.includes(dialog.textContent, 'Bardo');
    } finally {
      HTMLDialogElement.prototype.showModal = original;
      current.cleanup();
    }
  });

  Test.test('IT-005 — duas instâncias mantêm campanhas independentes em memória', function () {
    var first = fixture();
    var second = fixture();
    first.controller.dispatch({ type: 'BEGIN', seed: 1 });
    Test.equal(first.controller.getState().phase, 'intro');
    Test.equal(second.controller.getState().phase, 'ready');
    first.cleanup();
    second.cleanup();
  });

  Test.test('IT-006 — destruir e reabrir a instância descarta a sessão anterior', function () {
    var first = fixture();
    first.controller.dispatch({ type: 'BEGIN', seed: 2 });
    first.cleanup();
    var second = fixture();
    Test.equal(second.controller.getState().phase, 'ready');
    Test.equal(second.controller.getState().seed, null);
    second.cleanup();
  });

  Test.test('IT-007 — aberturas repetidas sempre produzem sessão fresca utilizável', function () {
    for (var index = 0; index < 3; index += 1) {
      var current = fixture();
      Test.equal(current.controller.getState().phase, 'ready');
      Test.truthy(current.root.querySelector('[data-action="begin"]'));
      current.cleanup();
    }
  });

  Test.test('IT-008 — fragmentos não pulam a abertura nem fabricam progresso', function () {
    var current = fixture();
    Test.equal(current.controller.getState().phase, 'ready');
    Test.falsy(current.root.textContent.indexOf('Retomar') >= 0);
    current.cleanup();
  });

  Test.test('IT-009 — a interface nunca promete recuperação durável de aba', function () {
    var current = fixture();
    var copy = current.root.textContent;
    Test.falsy(/retomar|recuperar sessão|continuar campanha/i.test(copy));
    Test.includes(copy, 'Iniciar campanha');
    current.cleanup();
  });

  Test.test('IT-011 — disparo duplo de início cria somente uma campanha', function () {
    var current = fixture();
    var first = current.controller.dispatch({ type: 'BEGIN', seed: 3 });
    var second = current.controller.dispatch({ type: 'BEGIN', seed: 4 });
    Test.truthy(first.ok);
    Test.falsy(second.ok);
    Test.equal(current.controller.getState().seed, 3);
    Test.equal(current.controller.getState().actionHistory.length, 1);
    current.cleanup();
  });

  Test.test('IT-012 — abertura fresca não mostra progresso antigo ou promessa de retomada', function () {
    var current = fixture();
    Test.includes(current.root.textContent, 'Baseline jogável para validação mecânica');
    Test.falsy(/posição \d|sobreviventes|retomar/i.test(current.root.textContent));
    current.cleanup();
  });

  Test.test('IT-014 — armazenamento indisponível não interfere na campanha', function () {
    var current = fixture();
    var originalGet = Storage.prototype.getItem;
    var originalSet = Storage.prototype.setItem;
    Storage.prototype.getItem = function () { throw new Error('storage indisponível'); };
    Storage.prototype.setItem = function () { throw new Error('storage indisponível'); };
    try {
      Test.truthy(current.controller.dispatch({ type: 'BEGIN', seed: 5 }).ok);
      Test.equal(current.controller.getState().phase, 'intro');
    } finally {
      Storage.prototype.getItem = originalGet;
      Storage.prototype.setItem = originalSet;
      current.cleanup();
    }
  });

  Test.test('IT-021 — partida inválida mantém formação e explica a correção', function () {
    var current = fixture();
    beginToFormation(current.controller);
    current.root.querySelector('[data-action="depart"]').click();
    Test.equal(current.controller.getState().phase, 'formation');
    Test.includes(current.root.querySelector('[role="alert"]').textContent, 'Escolha exatamente três heróis sobreviventes');
    current.cleanup();
  });

  Test.test('IT-022 — zero sobreviventes nunca abre formação e termina em derrota', function () {
    var current = fixture();
    driveDeaths(current.controller, 8);
    Test.equal(current.controller.getState().phase, 'defeat');
    Test.falsy(current.root.querySelector('[data-action="toggle-hero"]'));
    current.cleanup();
  });

  Test.test('IT-023 — exatamente três sobreviventes exigem os três na partida', function () {
    var current = fixture();
    driveDeaths(current.controller, 5);
    returnToFormation(current.controller);
    var living = livingIds(current.controller.getState());
    selectHeroes(current.controller, living.slice(0, 2));
    Test.falsy(current.controller.dispatch({ type: 'DEPART' }).ok);
    Test.truthy(current.controller.dispatch({ type: 'TOGGLE_HERO', heroId: living[2] }).ok);
    Test.truthy(current.controller.dispatch({ type: 'DEPART' }).ok);
    current.cleanup();
  });

  Test.test('IT-024 — controle obsoleto não recoloca herói morto na formação', function () {
    var current = fixture();
    driveDeaths(current.controller, 1);
    returnToFormation(current.controller);
    var deadId = current.controller.getState().deadHeroIds[0];
    var stale = document.createElement('button');
    stale.dataset.action = 'toggle-hero';
    stale.dataset.id = deadId;
    current.root.querySelector('.formation-panel').appendChild(stale);
    stale.click();
    Test.falsy(current.controller.getState().draftPartyIds.indexOf(deadId) >= 0);
    Test.includes(current.root.querySelector('[role="alert"]').textContent, 'O herói não pode entrar nesta formação');
    current.cleanup();
  });

  Test.test('IT-025 — ativações concorrentes no limite nunca excedem três distintos', function () {
    var current = fixture();
    beginToFormation(current.controller);
    selectHeroes(current.controller, ['H1', 'H2']);
    current.root.querySelector('[data-id="H3"]').click();
    current.root.querySelector('[data-id="H4"]').click();
    var selected = current.controller.getState().draftPartyIds;
    Test.equal(selected.length, 3);
    Test.equal(new Set(selected).size, 3);
    current.cleanup();
  });

  Test.test('IT-026 — seleção reversível não altera a expedição antes da partida', function () {
    var current = fixture();
    beginToFormation(current.controller);
    selectHeroes(current.controller, ['H1', 'H2']);
    Test.deepEqual(current.controller.getState().partyIds, []);
    Test.deepEqual(current.controller.getState().draftPartyIds, ['H1', 'H2']);
    current.cleanup();
  });

  Test.test('IT-027 — seleção repetida de um herói permanece singular', function () {
    var current = fixture();
    beginToFormation(current.controller);
    current.controller.dispatch({ type: 'TOGGLE_HERO', heroId: 'H1' });
    current.controller.dispatch({ type: 'TOGGLE_HERO', heroId: 'H1' });
    current.controller.dispatch({ type: 'TOGGLE_HERO', heroId: 'H1' });
    Test.deepEqual(current.controller.getState().draftPartyIds, ['H1']);
    current.cleanup();
  });

  Test.test('IT-028 — partida antes da preparação obrigatória é rejeitada', function () {
    var current = fixture();
    current.controller.dispatch({ type: 'BEGIN', seed: 6 });
    Test.falsy(current.controller.dispatch({ type: 'DEPART' }).ok);
    Test.equal(current.controller.getState().phase, 'intro');
    current.cleanup();
  });

  Test.test('IT-029 — formação seguinte exclui morto e recalcula registros visíveis', function () {
    var current = fixture();
    driveDeaths(current.controller, 1);
    returnToFormation(current.controller);
    var deadId = current.controller.getState().deadHeroIds[0];
    var record = current.root.querySelector('[data-hero-id="' + deadId + '"]');
    Test.truthy(record.classList.contains('dead'));
    Test.equal(record.tagName, 'ARTICLE');
    Test.includes(record.textContent, Data.competencies[Data.heroes[deadId].competencyIds[0]].label);
    current.cleanup();
  });

  Test.test('IT-030 — oito heróis ficam inspecionáveis e somente três selecionados', function () {
    var current = fixture();
    beginToFormation(current.controller);
    Test.equal(current.root.querySelectorAll('.hero-card').length, 8);
    selectHeroes(current.controller, ['H1', 'H2', 'H3']);
    Test.falsy(current.controller.dispatch({ type: 'TOGGLE_HERO', heroId: 'H4' }).ok);
    Test.equal(current.controller.getState().draftPartyIds.length, 3);
    current.cleanup();
  });

  Test.test('IT-032 — roster sem reservas declara cidade vazia e preserva a expedição', function () {
    var current = fixture();
    driveDeaths(current.controller, 5);
    returnToFormation(current.controller);
    var living = livingIds(current.controller.getState());
    selectHeroes(current.controller, living);
    current.controller.dispatch({ type: 'DEPART' });
    var roster = current.root.querySelector('.roster-region');
    Test.includes(roster.textContent, 'Nenhum herói na cidade.');
    living.forEach(function (heroId) { Test.includes(roster.textContent, heroId); });
    current.cleanup();
  });

  Test.test('IT-033 — sete mortes mantêm sobrevivente e competências legíveis', function () {
    var current = fixture();
    driveDeaths(current.controller, 7);
    var state = current.controller.getState();
    var survivorId = livingIds(state)[0];
    Test.equal(current.root.querySelectorAll('.roster-region .roster-item.dead').length, 7);
    Test.includes(current.root.querySelector('.roster-region').textContent, survivorId);
    Data.heroes[survivorId].competencyIds.forEach(function (competencyId) {
      Test.includes(current.root.textContent, Data.competencies[competencyId].label);
    });
    current.cleanup();
  });

  Test.test('IT-037 — abrir e fechar roster repetidamente não muda a campanha e devolve foco', function () {
    var current = fixture(320);
    reachThreshold(current.controller);
    var before = JSON.stringify(current.controller.getState());
    for (var index = 0; index < 2; index += 1) {
      var trigger = current.root.querySelector('[data-action="open-roster"]');
      trigger.click();
      Test.truthy(current.root.querySelector('#roster-dialog').open);
      current.root.querySelector('[data-action="close-roster"]').click();
      Test.equal(document.activeElement, trigger);
    }
    Test.equal(JSON.stringify(current.controller.getState()), before);
    current.cleanup();
  });

  Test.test('IT-038 — formação inicial mostra elenco integral sem alegar grupo atual', function () {
    var current = fixture();
    beginToFormation(current.controller);
    Test.equal(current.root.querySelectorAll('.hero-card').length, 8);
    Test.deepEqual(current.controller.getState().partyIds, []);
    Test.falsy(current.root.textContent.indexOf('Na expedição') >= 0);
    current.cleanup();
  });

  Test.test('IT-040 — oito cards conservam rótulos e estados no layout suportado', function () {
    var current = fixture(320);
    current.root.querySelector('[data-action="begin"]').click();
    current.root.querySelector('[data-action="continue-intro"]').click();
    Test.equal(current.root.querySelectorAll('.hero-card').length, 8);
    Test.equal(current.root.querySelectorAll('.hero-card span').length, 16);
    Test.equal(global.getComputedStyle(current.root.querySelector('.hero-grid')).gridTemplateColumns.split(' ').length, 1);
    Test.truthy(current.root.scrollWidth <= 320, 'A formação estreita não deve criar rolagem horizontal.');
    current.cleanup();
  });

  Test.test('IT-016 — nova montagem durante consequência descarta a sessão parcial', function () {
    var current = fixture();
    reachEncounter(current.controller, ['H4', 'H7', 'H8']);
    openFailure(current.controller);
    Test.equal(current.controller.getState().phase, 'sacrifice_choice');
    current.cleanup();
    var reopened = fixture();
    Test.equal(reopened.controller.getState().phase, 'ready');
    Test.deepEqual(reopened.controller.getState().deadHeroIds, []);
    reopened.cleanup();
  });

  Test.test('IT-031 — consultar elenco não resolve sacrifício incompleto', function () {
    var current = fixture();
    reachEncounter(current.controller, ['H4', 'H7', 'H8']);
    openFailure(current.controller);
    current.root.querySelector('[data-action="open-roster"]').click();
    Test.equal(current.controller.getState().phase, 'sacrifice_choice');
    Test.truthy(current.root.querySelector('#roster-dialog').open);
    Test.equal(current.root.querySelectorAll('[data-action="select-victim"]').length, 3);
    current.cleanup();
  });

  Test.test('IT-034 — roster pré-compromisso não revela competência de abordagem', function () {
    var current = fixture();
    reachEncounter(current.controller);
    var encounter = currentEncounter(current.controller.getState());
    current.root.querySelector('[data-action="open-roster"]').click();
    var names = encounter.approaches.map(function (approach) { return Data.competencies[approach.competencyId].label; });
    encounter.approaches.forEach(function (approach) {
      var button = current.root.querySelector('[data-id="' + approach.id + '"]');
      Test.deepEqual(Object.keys(button.dataset).sort(), ['action', 'id']);
      Test.falsy(button.className.indexOf(approach.competencyId) >= 0);
    });
    Test.falsy(current.root.querySelector('.encounter-decision').textContent.indexOf('Competência exigida') >= 0);
    Test.equal(names.length, 3);
    current.cleanup();
  });

  Test.test('IT-035 — roster aberto após morte usa estado pós-consequência', function () {
    var current = fixture();
    reachEncounter(current.controller, ['H4', 'H7', 'H8']);
    openFailure(current.controller);
    confirmVictim(current.controller, 'H4');
    current.root.querySelector('[data-action="open-roster"]').click();
    Test.equal(current.controller.getState().phase, 'death_result');
    Test.includes(current.root.querySelector('#roster-dialog').textContent, 'H4 — Morto');
    Test.falsy(current.root.querySelector('#roster-dialog').textContent.indexOf('Na expedição\nH4') >= 0);
    current.cleanup();
  });

  Test.test('IT-036 — fechar roster retorna à mesma decisão não resolvida', async function () {
    var current = fixture(320);
    reachEncounter(current.controller);
    var before = JSON.stringify(current.controller.getState());
    var trigger = current.root.querySelector('[data-action="open-roster"]');
    trigger.focus();
    trigger.click();
    current.root.querySelector('[data-action="close-roster"]').click();
    await new Promise(function (resolve) { global.setTimeout(resolve, 75); });
    Test.equal(JSON.stringify(current.controller.getState()), before);
    Test.equal(document.activeElement.dataset.action, 'open-roster');
    Test.equal(current.root.querySelectorAll('[data-action="choose-approach"]').length, 3);
    current.cleanup();
  });

  Test.test('IT-039 — recuo automático apresenta reservas antes da formação', function () {
    var current = fixture();
    driveDeaths(current.controller, 3);
    Test.equal(current.controller.getState().phase, 'automatic_retreat');
    Test.equal(current.controller.getState().partyIds.length, 0);
    Test.includes(current.root.querySelector('.roster-region').textContent, 'Na cidade');
    Test.equal(current.root.querySelectorAll('.roster-region .roster-item.dead').length, 3);
    current.cleanup();
  });

  Test.test('IT-041 — revelar fora da fase válida preserva atribuições', function () {
    var current = fixture();
    reachEncounter(current.controller, ['H4', 'H7', 'H8']);
    var before = JSON.stringify(current.controller.getState().assignments);
    Test.falsy(current.controller.dispatch({ type: 'ENTER_DUNGEON' }).ok);
    Test.equal(JSON.stringify(current.controller.getState().assignments), before);
    current.cleanup();
  });

  Test.test('IT-042 — primeira entrada cria exatamente uma atribuição antes da escolha', function () {
    var current = fixture();
    reachEncounter(current.controller);
    var state = current.controller.getState();
    Test.equal(state.assignments.physical.filter(Boolean).length, 1);
    Test.equal(state.phase, 'encounter_choice');
    Test.truthy(current.root.querySelector('[data-action="choose-approach"]'));
    Test.equal(current.root.querySelector('.encounter-decision').getAttribute('aria-labelledby'), current.root.querySelector('#approach-title').id);
    current.cleanup();
  });

  Test.test('IT-043 — quinta posição física deixa três encontros A sem uso', function () {
    var current = fixture();
    reachEncounter(current.controller);
    revealThroughPosition(current.controller, 5);
    Test.equal(current.controller.getState().assignments.physical.filter(Boolean).length, 5);
    Test.equal(Data.encounterOrder.filter(function (id) { return id.charAt(0) === 'A'; }).length - 5, 3);
    current.cleanup();
  });

  Test.test('IT-044 — encontro revelado não oferece escolha nem rerrolagem do conteúdo', function () {
    var current = fixture();
    reachEncounter(current.controller);
    Test.falsy(current.root.querySelector('[data-action="reroll"]'));
    Test.falsy(current.root.querySelector('[data-action="choose-encounter"]'));
    Test.equal(current.root.querySelectorAll('[data-action="choose-approach"]').length, 3);
    current.cleanup();
  });

  Test.test('IT-045 — duas entradas rápidas atribuem um único encontro', function () {
    var current = fixture();
    reachThreshold(current.controller);
    Test.truthy(current.controller.dispatch({ type: 'ENTER_DUNGEON' }).ok);
    Test.falsy(current.controller.dispatch({ type: 'ENTER_DUNGEON' }).ok);
    Test.equal(current.controller.getState().assignments.physical.filter(Boolean).length, 1);
    Test.equal(current.controller.getState().actionHistory.filter(function (entry) { return entry.type === 'encounter_revealed'; }).length, 1);
    current.cleanup();
  });

  Test.test('IT-046 — recarregar durante primeira revelação não restaura atribuição', function () {
    var current = fixture();
    reachEncounter(current.controller);
    Test.equal(current.controller.getState().assignments.physical.filter(Boolean).length, 1);
    current.cleanup();
    var reopened = fixture();
    Test.equal(reopened.controller.getState().assignments.physical.filter(Boolean).length, 0);
    reopened.cleanup();
  });

  Test.test('IT-047 — revisitas após recuos conservam o primeiro encontro', function () {
    var current = fixture();
    reachEncounter(current.controller);
    var encounterId = currentEncounter(current.controller.getState()).id;
    for (var attempt = 0; attempt < 2; attempt += 1) {
      Test.truthy(current.controller.dispatch({ type: 'REQUEST_RETREAT' }).ok);
      Test.truthy(current.controller.dispatch({ type: 'CONFIRM_RETREAT' }).ok);
      selectHeroes(current.controller, ['H1', 'H2', 'H3']);
      Test.truthy(current.controller.dispatch({ type: 'DEPART' }).ok);
      Test.truthy(current.controller.dispatch({ type: 'ENTER_DUNGEON' }).ok);
      Test.equal(currentEncounter(current.controller.getState()).id, encounterId);
    }
    current.cleanup();
  });

  Test.test('IT-048 — posição posterior não pode ser saltada pelo fluxo normal', function () {
    var current = fixture();
    reachEncounter(current.controller);
    Test.falsy(current.controller.dispatch({ type: 'ACK_SUCCESS' }).ok);
    Test.equal(current.controller.getState().position, 1);
    Test.falsy(current.controller.getState().assignments.physical[1]);
    current.cleanup();
  });

  Test.test('IT-049 — campanha nova limpa todas as posições anteriores', function () {
    var current = fixture();
    completeWithoutDeaths(current.controller, 31);
    Test.truthy(current.controller.dispatch({ type: 'NEW_CAMPAIGN' }).ok);
    Test.deepEqual(current.controller.getState().assignments, { physical: [null, null, null, null, null], supernatural: [null, null, null, null, null], final: [null, null, null, null, null, null] });
    current.cleanup();
  });

  Test.test('IT-050 — campanha completa usa os dezesseis encontros uma vez', function () {
    var current = fixture();
    completeWithoutDeaths(current.controller, 37);
    var state = current.controller.getState();
    var ids = state.assignments.physical.concat(state.assignments.supernatural, state.assignments.final);
    Test.equal(ids.length, 16);
    Test.equal(new Set(ids).size, 16);
    Data.encounterOrder.forEach(function (id) { Test.includes(ids, id); });
    current.cleanup();
  });

  Test.test('IT-051 — abordagem inexistente não cria resultado', function () {
    var current = fixture();
    reachEncounter(current.controller);
    var before = JSON.stringify(current.controller.getState());
    Test.falsy(current.controller.dispatch({ type: 'CHOOSE_APPROACH', approachId: 'stale' }).ok);
    Test.equal(JSON.stringify(current.controller.getState()), before);
    current.cleanup();
  });

  Test.test('IT-052 — sem expedição viva não há escolha de abordagem', function () {
    var current = fixture();
    driveDeaths(current.controller, 3);
    Test.equal(current.controller.getState().phase, 'automatic_retreat');
    Test.falsy(current.root.querySelector('[data-action="choose-approach"]'));
    Test.falsy(current.controller.dispatch({ type: 'CHOOSE_APPROACH', approachId: 'A1-1' }).ok);
    current.cleanup();
  });

  Test.test('IT-053 — cobertura três de três não marca abordagem segura antes da escolha', function () {
    var scout = fixture();
    reachEncounter(scout.controller, ['H1', 'H2', 'H3'], 43);
    var encounter = currentEncounter(scout.controller.getState());
    scout.cleanup();
    var ids = Data.heroOrder.filter(function (heroId) {
      return encounter.approaches.some(function (approach) { return Data.heroes[heroId].competencyIds.indexOf(approach.competencyId) >= 0; });
    }).slice(0, 3);
    Test.equal(ids.length, 3);
    var current = fixture();
    reachEncounter(current.controller, ids, 43);
    var buttons = current.root.querySelectorAll('[data-action="choose-approach"]');
    Test.equal(buttons.length, 3);
    Array.prototype.forEach.call(buttons, function (button) { Test.equal(button.className, 'button approach-action'); });
    encounter.approaches.forEach(function (approach) {
      Test.truthy(current.controller.dispatch({ type: 'CHOOSE_APPROACH', approachId: approach.id }).ok);
      Test.truthy(current.controller.getState().pendingOutcome.success);
      current.cleanup();
      current = fixture();
      reachEncounter(current.controller, ids, 43);
    });
    current.cleanup();
  });

  Test.test('IT-054 — conteúdo normal pré-escolha omite mapeamentos internos', function () {
    var current = fixture();
    reachEncounter(current.controller);
    var decision = current.root.querySelector('.encounter-decision');
    Test.falsy(decision.textContent.indexOf('Competência exigida') >= 0);
    Test.falsy(decision.textContent.indexOf('/3') >= 0);
    Test.falsy(decision.querySelector('[data-competency]'));
    current.cleanup();
  });

  Test.test('IT-055 — duas abordagens rápidas produzem um compromisso', function () {
    var current = fixture();
    reachEncounter(current.controller);
    var approaches = currentEncounter(current.controller.getState()).approaches;
    Test.truthy(current.controller.dispatch({ type: 'CHOOSE_APPROACH', approachId: approaches[0].id }).ok);
    Test.falsy(current.controller.dispatch({ type: 'CHOOSE_APPROACH', approachId: approaches[1].id }).ok);
    Test.equal(current.controller.getState().actionHistory.filter(function (entry) { return entry.type === 'approach_resolved'; }).length, 1);
    current.cleanup();
  });

  Test.test('IT-056 — roster preserva escolhas antes e consequência depois do compromisso', function () {
    var current = fixture();
    reachEncounter(current.controller, ['H4', 'H7', 'H8']);
    var trigger = current.root.querySelector('[data-action="open-roster"]');
    trigger.focus();
    trigger.click();
    current.root.querySelector('[data-action="close-roster"]').click();
    Test.equal(current.root.querySelectorAll('[data-action="choose-approach"]').length, 3);
    var failure = failingApproach(current.controller.getState());
    Test.truthy(current.controller.dispatch({ type: 'CHOOSE_APPROACH', approachId: failure.id }).ok);
    Test.falsy(current.root.querySelector('[data-action="choose-approach"]'));
    Test.truthy(current.root.querySelector('[data-action="open-sacrifice"]'));
    current.cleanup();
  });

  Test.test('IT-057 — reativar abordagem comprometida não duplica resultado', function () {
    var current = fixture();
    reachEncounter(current.controller);
    var approach = currentEncounter(current.controller.getState()).approaches[0];
    Test.truthy(current.controller.dispatch({ type: 'CHOOSE_APPROACH', approachId: approach.id }).ok);
    var sequence = current.controller.getState().sequence;
    Test.falsy(current.controller.dispatch({ type: 'CHOOSE_APPROACH', approachId: approach.id }).ok);
    Test.equal(current.controller.getState().sequence, sequence);
    current.cleanup();
  });

  Test.test('IT-058 — progressão aguarda reconhecimento do resultado completo', function () {
    var current = fixture();
    reachEncounter(current.controller);
    var approach = successfulApproach(current.controller.getState());
    Test.truthy(current.controller.dispatch({ type: 'CHOOSE_APPROACH', approachId: approach.id }).ok);
    Test.falsy(current.controller.dispatch({ type: 'ENTER_DUNGEON' }).ok);
    Test.includes(current.root.textContent, approach.successText);
    Test.equal(current.controller.getState().position, 1);
    current.cleanup();
  });

  Test.test('IT-059 — morte remove competência do cálculo seguinte', function () {
    var current = fixture();
    reachEncounter(current.controller, ['H4', 'H7', 'H8']);
    openFailure(current.controller);
    var victim = current.controller.getState().partyIds[0];
    var removed = Data.heroes[victim].competencyIds.slice();
    confirmVictim(current.controller, victim);
    Test.truthy(current.controller.dispatch({ type: 'ACK_DEATH' }).ok);
    Test.truthy(current.controller.dispatch({ type: 'ENTER_DUNGEON' }).ok);
    var next = current.controller.getState();
    var covered = [];
    next.partyIds.forEach(function (heroId) {
      Data.heroes[heroId].competencyIds.forEach(function (competencyId) {
        if (covered.indexOf(competencyId) < 0) {
          covered.push(competencyId);
        }
      });
    });
    removed.forEach(function (competencyId) {
      if (!next.partyIds.some(function (heroId) { return Data.heroes[heroId].competencyIds.indexOf(competencyId) >= 0; })) {
        Test.falsy(covered.indexOf(competencyId) >= 0);
      }
    });
    current.cleanup();
  });

  Test.test('IT-060 — quarenta e oito abordagens mantêm regra e texto próprios', function () {
    var approachIds = [];
    Data.encounterOrder.forEach(function (encounterId) {
      var encounter = Data.encounters[encounterId];
      Test.equal(encounter.approaches.length, 3);
      encounter.approaches.forEach(function (approach) {
        approachIds.push(approach.id);
        Test.truthy(approach.text.length > 0);
        Test.truthy(approach.successText.length > 0);
        Test.truthy(Data.competencies[approach.competencyId]);
      });
    });
    Test.equal(approachIds.length, 48);
    Test.equal(new Set(approachIds).size, 48);
    var current = fixture();
    reachEncounter(current.controller);
    Test.equal(current.root.querySelectorAll('[data-action="choose-approach"]').length, 3);
    current.cleanup();
  });

  Test.test('IT-061 — herói fora da expedição é rejeitado como vítima', function () {
    var current = fixture();
    reachEncounter(current.controller, ['H4', 'H7', 'H8']);
    openFailure(current.controller);
    Test.falsy(current.controller.dispatch({ type: 'SELECT_VICTIM', heroId: 'H1' }).ok);
    Test.equal(current.controller.getState().phase, 'sacrifice_choice');
    current.cleanup();
  });

  Test.test('IT-062 — nenhum herói vivo nunca produz seletor vazio', function () {
    var current = fixture();
    driveDeaths(current.controller, 8);
    Test.equal(current.controller.getState().phase, 'defeat');
    Test.falsy(current.root.querySelector('[data-action="select-victim"]'));
    current.cleanup();
  });

  Test.test('IT-063 — herói único é a única vítima e conduz à derrota', function () {
    var current = fixture();
    driveDeaths(current.controller, 7);
    if (current.controller.getState().phase === 'dungeon_intro') {
      Test.truthy(current.controller.dispatch({ type: 'ENTER_DUNGEON' }).ok);
    }
    openFailure(current.controller);
    var survivor = livingIds(current.controller.getState())[0];
    Test.equal(current.root.querySelectorAll('[data-action="select-victim"]').length, 1);
    Test.equal(current.root.querySelector('[data-action="select-victim"]').dataset.id, survivor);
    confirmVictim(current.controller, survivor);
    Test.truthy(current.controller.dispatch({ type: 'ACK_DEATH' }).ok);
    Test.equal(current.controller.getState().phase, 'defeat');
    current.cleanup();
  });

  Test.test('IT-064 — bardo e reserva nunca são vítimas válidas', function () {
    var current = fixture();
    reachEncounter(current.controller, ['H4', 'H7', 'H8']);
    openFailure(current.controller);
    Test.falsy(current.controller.dispatch({ type: 'SELECT_VICTIM', heroId: 'Bardo' }).ok);
    Test.falsy(current.controller.dispatch({ type: 'SELECT_VICTIM', heroId: 'H1' }).ok);
    Test.falsy(current.root.querySelector('[data-id="Bardo"]'));
    Test.equal(current.root.querySelectorAll('[data-action="select-victim"]').length, 3);
    current.cleanup();
  });

  Test.test('IT-065 — duas escolhas de vítima causam uma morte', function () {
    var current = fixture();
    reachEncounter(current.controller, ['H4', 'H7', 'H8']);
    openFailure(current.controller);
    var party = current.controller.getState().partyIds.slice();
    Test.truthy(current.controller.dispatch({ type: 'SELECT_VICTIM', heroId: party[0] }).ok);
    Test.falsy(current.controller.dispatch({ type: 'SELECT_VICTIM', heroId: party[1] }).ok);
    Test.truthy(current.controller.dispatch({ type: 'CONFIRM_SACRIFICE' }).ok);
    Test.deepEqual(current.controller.getState().deadHeroIds, [party[0]]);
    current.cleanup();
  });

  Test.test('IT-066 — roster durante sacrifício não libera recuo nem progressão', function () {
    var current = fixture();
    reachEncounter(current.controller, ['H4', 'H7', 'H8']);
    openFailure(current.controller);
    current.root.querySelector('[data-action="open-roster"]').click();
    Test.equal(current.controller.getState().phase, 'sacrifice_choice');
    Test.falsy(current.controller.dispatch({ type: 'REQUEST_RETREAT' }).ok);
    Test.falsy(current.controller.dispatch({ type: 'ACK_SUCCESS' }).ok);
    current.cleanup();
  });

  Test.test('IT-067 — confirmação repetida não duplica morte nem despedida', function () {
    var current = fixture();
    reachEncounter(current.controller, ['H4', 'H7', 'H8']);
    openFailure(current.controller);
    confirmVictim(current.controller, 'H4');
    var copy = current.root.querySelector('.farewell').textContent;
    Test.falsy(current.controller.dispatch({ type: 'CONFIRM_SACRIFICE' }).ok);
    Test.deepEqual(current.controller.getState().deadHeroIds, ['H4']);
    Test.equal(current.root.querySelectorAll('.farewell').length, 1);
    Test.equal(current.root.querySelector('.farewell').textContent, copy);
    current.cleanup();
  });

  Test.test('IT-068 — recuo fica bloqueado entre compromisso e sacrifício', function () {
    var current = fixture();
    reachEncounter(current.controller, ['H4', 'H7', 'H8']);
    var failure = failingApproach(current.controller.getState());
    Test.truthy(current.controller.dispatch({ type: 'CHOOSE_APPROACH', approachId: failure.id }).ok);
    Test.falsy(current.controller.dispatch({ type: 'REQUEST_RETREAT' }).ok);
    Test.truthy(current.controller.dispatch({ type: 'OPEN_SACRIFICE' }).ok);
    Test.falsy(current.controller.dispatch({ type: 'REQUEST_RETREAT' }).ok);
    current.cleanup();
  });

  Test.test('IT-069 — herói já morto não pode morrer novamente', function () {
    var current = fixture();
    reachEncounter(current.controller, ['H4', 'H7', 'H8']);
    openFailure(current.controller);
    confirmVictim(current.controller, 'H4');
    Test.truthy(current.controller.dispatch({ type: 'ACK_DEATH' }).ok);
    Test.truthy(current.controller.dispatch({ type: 'ENTER_DUNGEON' }).ok);
    openFailure(current.controller);
    Test.falsy(current.controller.dispatch({ type: 'SELECT_VICTIM', heroId: 'H4' }).ok);
    Test.equal(current.controller.getState().deadHeroIds.filter(function (id) { return id === 'H4'; }).length, 1);
    current.cleanup();
  });

  Test.test('IT-070 — falhas repetidas preservam mortes e cópias específicas', function () {
    var current = fixture();
    driveDeaths(current.controller, 3);
    var deaths = current.controller.getState().actionHistory.filter(function (entry) { return entry.type === 'hero_sacrificed'; });
    Test.equal(deaths.length, 3);
    Test.equal(new Set(deaths.map(function (entry) { return entry.heroId; })).size, 3);
    deaths.forEach(function (entry) {
      Test.truthy(Data.encounters[entry.encounterId].failureText.length > 0);
      Test.includes(Data.heroes[entry.heroId].farewell, entry.heroId);
    });
    current.cleanup();
  });

  Test.test('IT-071 — recuo invocado durante consequência não altera campanha', function () {
    var current = fixture();
    reachEncounter(current.controller);
    var approach = currentEncounter(current.controller.getState()).approaches[0];
    Test.truthy(current.controller.dispatch({ type: 'CHOOSE_APPROACH', approachId: approach.id }).ok);
    var before = JSON.stringify(current.controller.getState());
    Test.falsy(current.controller.dispatch({ type: 'REQUEST_RETREAT' }).ok);
    Test.equal(JSON.stringify(current.controller.getState()), before);
    current.cleanup();
  });

  Test.test('IT-072 — três heróis sem reserva ainda podem recuar', function () {
    var current = fixture();
    driveDeaths(current.controller, 5);
    returnToFormation(current.controller);
    var living = livingIds(current.controller.getState());
    selectHeroes(current.controller, living);
    Test.truthy(current.controller.dispatch({ type: 'DEPART' }).ok);
    Test.truthy(current.controller.dispatch({ type: 'ENTER_DUNGEON' }).ok);
    Test.equal(current.controller.getState().partyIds.length, 3);
    Test.equal(livingIds(current.controller.getState()).length, 3);
    Test.truthy(current.controller.dispatch({ type: 'REQUEST_RETREAT' }).ok);
    current.cleanup();
  });

  Test.test('IT-073 — dois sobreviventes não recebem recuo voluntário', function () {
    var current = fixture();
    driveDeaths(current.controller, 6);
    if (current.controller.getState().phase === 'automatic_retreat') {
      Test.truthy(current.controller.dispatch({ type: 'ACK_AUTO_RETREAT' }).ok);
    }
    ensureParty(current.controller);
    if (current.controller.getState().phase === 'dungeon_intro') {
      Test.truthy(current.controller.dispatch({ type: 'ENTER_DUNGEON' }).ok);
    }
    Test.equal(livingIds(current.controller.getState()).length, 2);
    Test.falsy(current.root.querySelector('[data-action="request-retreat"]'));
    Test.falsy(current.controller.dispatch({ type: 'REQUEST_RETREAT' }).ok);
    current.cleanup();
  });

  Test.test('IT-074 — recuo preserva mortos e encontro revelado', function () {
    var current = fixture();
    driveDeaths(current.controller, 1);
    if (current.controller.getState().phase === 'dungeon_intro') {
      Test.truthy(current.controller.dispatch({ type: 'ENTER_DUNGEON' }).ok);
    }
    var dead = current.controller.getState().deadHeroIds.slice();
    var assignment = current.controller.getState().assignments.physical[0];
    Test.truthy(current.controller.dispatch({ type: 'REQUEST_RETREAT' }).ok);
    Test.truthy(current.controller.dispatch({ type: 'CONFIRM_RETREAT' }).ok);
    Test.deepEqual(current.controller.getState().deadHeroIds, dead);
    Test.equal(current.controller.getState().assignments.physical[0], assignment);
    current.cleanup();
  });

  Test.test('IT-075 — abordagem e recuo não vencem o mesmo compromisso', function () {
    var current = fixture();
    reachEncounter(current.controller);
    var approach = currentEncounter(current.controller.getState()).approaches[0];
    Test.truthy(current.controller.dispatch({ type: 'CHOOSE_APPROACH', approachId: approach.id }).ok);
    Test.falsy(current.controller.dispatch({ type: 'REQUEST_RETREAT' }).ok);
    Test.equal(current.controller.getState().actionHistory.filter(function (entry) { return entry.type === 'party_retreated'; }).length, 0);
    current.cleanup();
  });

  Test.test('IT-076 — roster devolve a decisão que ainda permite recuo', async function () {
    var current = fixture(320);
    reachEncounter(current.controller);
    var trigger = current.root.querySelector('[data-action="open-roster"]');
    trigger.focus();
    trigger.click();
    current.root.querySelector('[data-action="close-roster"]').click();
    await new Promise(function (resolve) { global.setTimeout(resolve, 75); });
    Test.equal(current.controller.getState().phase, 'encounter_choice');
    Test.truthy(current.root.querySelector('[data-action="request-retreat"]'));
    Test.equal(document.activeElement, trigger);
    current.cleanup();
  });

  Test.test('IT-077 — recuos repetidos não rerrolam nem cobram custo', function () {
    var current = fixture();
    reachEncounter(current.controller);
    var id = currentEncounter(current.controller.getState()).id;
    var rng = current.controller.getState().rngState;
    for (var attempt = 0; attempt < 2; attempt += 1) {
      Test.truthy(current.controller.dispatch({ type: 'REQUEST_RETREAT' }).ok);
      Test.truthy(current.controller.dispatch({ type: 'CONFIRM_RETREAT' }).ok);
      selectHeroes(current.controller, ['H1', 'H2', 'H3']);
      Test.truthy(current.controller.dispatch({ type: 'DEPART' }).ok);
      Test.truthy(current.controller.dispatch({ type: 'ENTER_DUNGEON' }).ok);
      Test.equal(currentEncounter(current.controller.getState()).id, id);
      Test.equal(current.controller.getState().rngState, rng);
      Test.deepEqual(current.controller.getState().deadHeroIds, []);
    }
    current.cleanup();
  });

  Test.test('IT-078 — recuo na posição quatro reinicia na posição um', function () {
    var current = fixture();
    reachEncounter(current.controller);
    revealThroughPosition(current.controller, 4);
    var revealed = current.controller.getState().assignments.physical.slice(0, 4);
    Test.truthy(current.controller.dispatch({ type: 'REQUEST_RETREAT' }).ok);
    Test.truthy(current.controller.dispatch({ type: 'CONFIRM_RETREAT' }).ok);
    Test.equal(current.controller.getState().position, 1);
    Test.deepEqual(current.controller.getState().assignments.physical.slice(0, 4), revealed);
    current.cleanup();
  });

  Test.test('IT-079 — menos de três vivos remove recuo após consequência', function () {
    var current = fixture();
    driveDeaths(current.controller, 6);
    if (current.controller.getState().phase === 'automatic_retreat') {
      Test.truthy(current.controller.dispatch({ type: 'ACK_AUTO_RETREAT' }).ok);
    }
    ensureParty(current.controller);
    if (current.controller.getState().phase === 'dungeon_intro') {
      Test.truthy(current.controller.dispatch({ type: 'ENTER_DUNGEON' }).ok);
    }
    Test.equal(livingIds(current.controller.getState()).length, 2);
    Test.falsy(current.controller.getState().pendingOutcome);
    Test.falsy(current.root.querySelector('[data-action="request-retreat"]'));
    current.cleanup();
  });

  Test.test('IT-080 — cinco posições reveladas permanecem fixas após recuo', function () {
    var current = fixture();
    reachEncounter(current.controller);
    revealThroughPosition(current.controller, 5);
    var revealed = current.controller.getState().assignments.physical.slice();
    Test.truthy(current.controller.dispatch({ type: 'REQUEST_RETREAT' }).ok);
    Test.truthy(current.controller.dispatch({ type: 'CONFIRM_RETREAT' }).ok);
    Test.deepEqual(current.controller.getState().assignments.physical, revealed);
    Test.equal(revealed.filter(Boolean).length, 5);
    current.cleanup();
  });

  Test.test('IT-081 — expedição vazia é interceptada por recuo automático', function () {
    var current = fixture();
    driveDeaths(current.controller, 3);
    Test.equal(current.controller.getState().phase, 'automatic_retreat');
    Test.falsy(current.controller.dispatch({ type: 'ACK_SUCCESS' }).ok);
    Test.falsy(current.root.querySelector('[data-action="enter-dungeon"]'));
    current.cleanup();
  });

  Test.test('IT-082 — sem reservas nem heróis vivos resulta em derrota', function () {
    var current = fixture();
    driveDeaths(current.controller, 8);
    Test.equal(current.controller.getState().phase, 'defeat');
    Test.falsy(current.root.querySelector('.formation-panel'));
    current.cleanup();
  });

  Test.test('IT-083 — reserva única forma expedição automática sem recuo', function () {
    var current = fixture();
    prepareSoloPartyWithReserve(current.controller);
    openFailure(current.controller);
    confirmVictim(current.controller, current.controller.getState().partyIds[0]);
    Test.truthy(current.controller.dispatch({ type: 'ACK_DEATH' }).ok);
    Test.equal(current.controller.getState().phase, 'automatic_retreat');
    Test.truthy(current.controller.dispatch({ type: 'ACK_AUTO_RETREAT' }).ok);
    Test.equal(current.controller.getState().phase, 'formation');
    Test.equal(current.controller.getState().draftPartyIds.length, 1);
    Test.falsy(current.controller.getState().canRetreat);
    current.cleanup();
  });

  Test.test('IT-084 — bardo não é alvo durante recuo automático', function () {
    var current = fixture();
    driveDeaths(current.controller, 3);
    Test.equal(current.controller.getState().phase, 'automatic_retreat');
    Test.falsy(current.root.querySelector('[data-action="select-victim"]'));
    Test.includes(current.root.querySelector('.roster-region').textContent, 'Bardo');
    current.cleanup();
  });

  Test.test('IT-085 — morte final da expedição vence progressão concorrente uma vez', function () {
    var current = fixture();
    driveDeaths(current.controller, 3);
    var count = current.controller.getState().actionHistory.filter(function (entry) { return entry.type === 'automatic_retreat'; }).length;
    Test.equal(count, 1);
    Test.falsy(current.controller.dispatch({ type: 'ACK_DEATH' }).ok);
    Test.equal(current.controller.getState().actionHistory.filter(function (entry) { return entry.type === 'automatic_retreat'; }).length, 1);
    current.cleanup();
  });

  Test.test('IT-086 — morte final fecha roster obsoleto e atualiza partido', function () {
    var current = fixture();
    prepareSoloPartyWithReserve(current.controller);
    openFailure(current.controller);
    var victim = current.controller.getState().partyIds[0];
    Test.truthy(current.controller.dispatch({ type: 'SELECT_VICTIM', heroId: victim }).ok);
    current.controller.dispatch({ type: 'CONFIRM_SACRIFICE' });
    current.root.querySelector('[data-action="open-roster"]').click();
    Test.truthy(current.root.querySelector('#roster-dialog').open);
    Test.truthy(current.controller.dispatch({ type: 'ACK_DEATH' }).ok);
    Test.equal(current.controller.getState().phase, 'automatic_retreat');
    Test.equal(current.controller.getState().partyIds.length, 0);
    Test.falsy(current.root.querySelector('#roster-dialog').open);
    current.cleanup();
  });

  Test.test('IT-087 — recuo automático reconhecido novamente não duplica transição', function () {
    var current = fixture();
    driveDeaths(current.controller, 3);
    Test.truthy(current.controller.dispatch({ type: 'ACK_AUTO_RETREAT' }).ok);
    var sequence = current.controller.getState().sequence;
    Test.falsy(current.controller.dispatch({ type: 'ACK_AUTO_RETREAT' }).ok);
    Test.equal(current.controller.getState().sequence, sequence);
    current.cleanup();
  });

  Test.test('IT-088 — formação espera a consequência da última morte', function () {
    var current = fixture();
    prepareSoloPartyWithReserve(current.controller);
    openFailure(current.controller);
    confirmVictim(current.controller, current.controller.getState().partyIds[0]);
    Test.equal(current.controller.getState().phase, 'death_result');
    Test.falsy(current.controller.dispatch({ type: 'ACK_AUTO_RETREAT' }).ok);
    Test.falsy(current.root.querySelector('.formation-panel'));
    current.cleanup();
  });

  Test.test('IT-089 — último herói do elenco leva direto à derrota', function () {
    var current = fixture();
    driveDeaths(current.controller, 8);
    Test.equal(current.controller.getState().phase, 'defeat');
    Test.equal(current.controller.getState().actionHistory.filter(function (entry) { return entry.type === 'campaign_lost'; }).length, 1);
    Test.falsy(current.controller.getState().actionHistory.some(function (entry) { return entry.type === 'automatic_retreat' && entry.sequence > current.controller.getState().sequence - 2; }));
    current.cleanup();
  });

  Test.test('IT-090 — expedições perdidas repetidamente preservam histórico cumulativo', function () {
    var current = fixture();
    driveDeaths(current.controller, 6);
    var state = current.controller.getState();
    Test.equal(state.deadHeroIds.length, 6);
    Test.equal(state.actionHistory.filter(function (entry) { return entry.type === 'automatic_retreat'; }).length, 2);
    Test.equal(state.actionHistory.filter(function (entry) { return entry.type === 'hero_sacrificed'; }).length, 6);
    Test.truthy(state.assignments.physical.concat(state.assignments.supernatural, state.assignments.final).filter(Boolean).length > 0);
    current.cleanup();
  });
})(window);
