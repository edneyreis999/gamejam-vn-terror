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

  Test.test('IT-001 — apenas index.html é montado automaticamente como entrada', function () {
    Test.falsy(document.getElementById('app'), 'O harness não deve se transformar em uma segunda entrada suportada.');
    Test.truthy(global.ExpeditionApp && typeof global.ExpeditionApp.createController === 'function');
  });

  Test.test('IT-002 — imagem local opcional ausente conserva texto e controles', function () {
    var current = fixture();
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
})(window);
