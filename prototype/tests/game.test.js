// Suite: motor determinístico da campanha
// Invariant: ações válidas produzem um novo estado coerente e ações inválidas não alteram a campanha.
// Boundary IN: motor, seletores e validadores de ExpeditionEngine com o catálogo real.
// Boundary OUT: controlador do navegador, DOM, foco e API window.expeditionQA.
(function (global) {
  'use strict';

  var T = global.ExpeditionTest;
  var Data = global.ExpeditionData;
  var Engine = global.ExpeditionEngine;
  var MAX_EMPTY_PARTY_STEPS = 30;
  var MAX_DEFEAT_STEPS = 400;
  var MAX_VICTORY_STEPS = 250;

  function freezeFixture(value) {
    if (!value || typeof value !== 'object' || Object.isFrozen(value)) {
      return value;
    }
    Object.keys(value).forEach(function (key) { freezeFixture(value[key]); });
    return Object.freeze(value);
  }

  function stateFixture(state, changes) {
    var copy = JSON.parse(JSON.stringify(state));
    Object.keys(changes || {}).forEach(function (key) { copy[key] = changes[key]; });
    return freezeFixture(copy);
  }

  function accepted(state, action) {
    var result = Engine.dispatch(state, action);
    if (!result.ok) {
      throw new Error('Ação rejeitada: ' + action.type + ' — ' + result.error.code + ': ' + result.error.message);
    }
    return result.state;
  }

  function startFormation(seed) {
    var state = accepted(Engine.createReadyState(), { type: 'BEGIN', seed: seed === undefined ? 7 : seed });
    return accepted(state, { type: 'CONTINUE_INTRO' });
  }

  function selectParty(state, heroIds) {
    var current = state;
    current.draftPartyIds.slice().forEach(function (heroId) {
      if (heroIds.indexOf(heroId) < 0) {
        current = accepted(current, { type: 'TOGGLE_HERO', heroId: heroId });
      }
    });
    heroIds.forEach(function (heroId) {
      if (current.draftPartyIds.indexOf(heroId) < 0) {
        current = accepted(current, { type: 'TOGGLE_HERO', heroId: heroId });
      }
    });
    return current;
  }

  function departWith(heroIds, seed) {
    var state = selectParty(startFormation(seed), heroIds);
    return accepted(state, { type: 'DEPART' });
  }

  function firstEncounter(heroIds, seed) {
    return accepted(departWith(heroIds, seed), { type: 'ENTER_DUNGEON' });
  }

  function failedA1State() {
    return accepted(firstEncounter(['H4', 'H7', 'H8'], 7), { type: 'CHOOSE_APPROACH', approachId: 'A1-1' });
  }

  function openSacrificeState() {
    return accepted(failedA1State(), { type: 'OPEN_SACRIFICE' });
  }

  function competencySet(heroIds) {
    var ids = [];
    heroIds.forEach(function (heroId) {
      Data.heroes[heroId].competencyIds.forEach(function (competencyId) {
        if (ids.indexOf(competencyId) < 0) {
          ids.push(competencyId);
        }
      });
    });
    return ids;
  }

  function chooseApproach(state, shouldSucceed) {
    var snapshot = Engine.snapshot(state);
    var covered = competencySet(state.partyIds);
    var approaches = Data.encounters[snapshot.currentEncounter.id].approaches;
    var chosen = approaches.filter(function (currentApproach) {
      var viable = covered.indexOf(currentApproach.competencyId) >= 0;
      return shouldSucceed ? viable : !viable;
    })[0];
    return chosen || approaches[0];
  }

  function deathResultWithEmptyParty() {
    var state = firstEncounter(['H4', 'H7', 'H8'], 7);
    var guard = 0;
    while (!(state.phase === 'death_result' && state.partyIds.length === 0) && guard < MAX_EMPTY_PARTY_STEPS) {
      guard += 1;
      if (state.phase === 'encounter_choice') {
        state = accepted(state, { type: 'CHOOSE_APPROACH', approachId: chooseApproach(state, false).id });
      } else if (state.phase === 'approach_result' && state.pendingOutcome.success) {
        state = accepted(state, { type: 'ACK_SUCCESS' });
      } else if (state.phase === 'approach_result') {
        state = accepted(state, { type: 'OPEN_SACRIFICE' });
      } else if (state.phase === 'sacrifice_choice') {
        state = accepted(state, { type: 'SELECT_VICTIM', heroId: state.partyIds[0] });
      } else if (state.phase === 'sacrifice_confirmation') {
        state = accepted(state, { type: 'CONFIRM_SACRIFICE' });
      } else if (state.phase === 'death_result' && state.partyIds.length > 0) {
        state = accepted(state, { type: 'ACK_DEATH' });
      } else if (state.phase === 'dungeon_intro') {
        state = accepted(state, { type: 'ENTER_DUNGEON' });
      } else {
        throw new Error('Fase inesperada ao esvaziar a expedição: ' + state.phase);
      }
    }
    if (state.partyIds.length !== 0) {
      throw new Error('A expedição não foi esvaziada dentro do limite do teste.');
    }
    return state;
  }

  function combinations(values, size) {
    var result = [];
    function visit(start, selected) {
      if (selected.length === size) {
        result.push(selected.slice());
        return;
      }
      for (var index = start; index < values.length; index += 1) {
        selected.push(values[index]);
        visit(index + 1, selected);
        selected.pop();
      }
    }
    visit(0, []);
    return result;
  }

  function lowestCoverageParty(living) {
    if (living.length <= 3) {
      return living.slice();
    }
    return combinations(living, 3).sort(function (left, right) {
      return competencySet(left).length - competencySet(right).length;
    })[0];
  }

  function runToDefeat() {
    var state = Engine.createReadyState();
    var guard = 0;
    while (state.phase !== 'defeat' && guard < MAX_DEFEAT_STEPS) {
      guard += 1;
      if (state.phase === 'ready') {
        state = accepted(state, { type: 'BEGIN', seed: 7 });
      } else if (state.phase === 'intro') {
        state = accepted(state, { type: 'CONTINUE_INTRO' });
      } else if (state.phase === 'formation') {
        var living = Engine.snapshot(state).aliveHeroes;
        state = selectParty(state, lowestCoverageParty(living));
        state = accepted(state, { type: 'DEPART' });
      } else if (state.phase === 'dungeon_intro') {
        state = accepted(state, { type: 'ENTER_DUNGEON' });
      } else if (state.phase === 'encounter_choice') {
        state = accepted(state, { type: 'CHOOSE_APPROACH', approachId: chooseApproach(state, false).id });
      } else if (state.phase === 'approach_result' && state.pendingOutcome.success) {
        state = accepted(state, { type: 'ACK_SUCCESS' });
      } else if (state.phase === 'approach_result') {
        state = accepted(state, { type: 'OPEN_SACRIFICE' });
      } else if (state.phase === 'sacrifice_choice') {
        state = accepted(state, { type: 'SELECT_VICTIM', heroId: state.partyIds[0] });
      } else if (state.phase === 'sacrifice_confirmation') {
        state = accepted(state, { type: 'CONFIRM_SACRIFICE' });
      } else if (state.phase === 'death_result') {
        state = accepted(state, { type: 'ACK_DEATH' });
      } else if (state.phase === 'automatic_retreat') {
        state = accepted(state, { type: 'ACK_AUTO_RETREAT' });
      } else if (state.phase === 'dungeon_complete') {
        state = accepted(state, { type: 'CONTINUE_DUNGEON' });
      } else if (state.phase === 'victory') {
        throw new Error('A campanha venceu antes de provar a derrota total.');
      } else {
        throw new Error('Fase inesperada no roteiro de derrota: ' + state.phase);
      }
    }
    if (state.phase !== 'defeat') {
      throw new Error('O roteiro não alcançou derrota dentro do limite.');
    }
    return state;
  }

  function runSafeCampaign(stopBeforeFinalAcknowledgment) {
    var state = Engine.createReadyState();
    var guard = 0;
    while (state.phase !== 'victory' && guard < MAX_VICTORY_STEPS) {
      guard += 1;
      if (state.phase === 'ready') {
        state = accepted(state, { type: 'BEGIN', seed: 20260830 });
      } else if (state.phase === 'intro') {
        state = accepted(state, { type: 'CONTINUE_INTRO' });
      } else if (state.phase === 'formation') {
        state = selectParty(state, ['H1', 'H2', 'H3']);
        state = accepted(state, { type: 'DEPART' });
      } else if (state.phase === 'dungeon_intro') {
        state = accepted(state, { type: 'ENTER_DUNGEON' });
      } else if (state.phase === 'encounter_choice') {
        state = accepted(state, { type: 'CHOOSE_APPROACH', approachId: chooseApproach(state, true).id });
      } else if (state.phase === 'approach_result') {
        if (stopBeforeFinalAcknowledgment && state.dungeonId === 'final' && state.position === 6) {
          return state;
        }
        state = accepted(state, { type: 'ACK_SUCCESS' });
      } else if (state.phase === 'dungeon_complete') {
        state = accepted(state, { type: 'CONTINUE_DUNGEON' });
      } else {
        throw new Error('Fase inesperada no roteiro seguro: ' + state.phase);
      }
    }
    return state;
  }

  function violationCodes(result) {
    return result.violations.map(function (violation) { return violation.code; });
  }

  function qaFixture() {
    var root = document.createElement('div');
    root.style.position = 'fixed';
    root.style.insetInlineStart = '-10000px';
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

  T.test('UT-013 — geradores Mulberry32 com a mesma semente repetem vinte passos', function () {
    var left = Engine.createMulberry32(20260830);
    var right = Engine.createMulberry32(20260830);
    for (var index = 0; index < 20; index += 1) {
      T.deepEqual(left.next(), right.next(), 'passo ' + (index + 1));
    }
  });

  T.test('UT-014 — sementes unsigned mínima e máxima são preservadas', function () {
    T.deepEqual(Engine.normalizeSeed(0), { ok: true, seed: 0 });
    T.deepEqual(Engine.normalizeSeed(4294967295), { ok: true, seed: 4294967295 });
  });

  T.test('UT-015 — sementes inválidas retornam invalid_seed', function () {
    [-1, 4294967296, 1.5, NaN, '42'].forEach(function (seed) {
      T.equal(Engine.normalizeSeed(seed).error.code, 'invalid_seed', String(seed));
    });
  });

  T.test('UT-016 — seleção por limite aleatório escolhe primeiro e último elegível', function () {
    for (var length = 1; length <= 8; length += 1) {
      var items = Data.encounterOrder.slice(0, length);
      T.equal(Engine.selectEligible(items, 0).value, items[0]);
      T.equal(Engine.selectEligible(items, 0.9999999999999999).value, items[items.length - 1]);
    }
    T.equal(Engine.selectEligible(['A1'], NaN).error.code, 'invalid_random_value');
  });

  T.test('UT-017 — revisita preserva encontro e estado do gerador', function () {
    var revealed = firstEncounter(['H1', 'H2', 'H3'], 7);
    var encounterId = Engine.snapshot(revealed).currentEncounter.id;
    var rngState = revealed.rngState;
    var state = accepted(revealed, { type: 'REQUEST_RETREAT' });
    state = accepted(state, { type: 'CONFIRM_RETREAT' });
    state = selectParty(state, ['H1', 'H2', 'H3']);
    state = accepted(state, { type: 'DEPART' });
    state = Engine.revealCurrentPosition(state).state;
    T.equal(Engine.snapshot(state).currentEncounter.id, encounterId);
    T.equal(state.rngState, rngState);
  });

  T.test('UT-018 — recuo confirmado preserva semente, RNG e atribuições', function () {
    var revealed = firstEncounter(['H1', 'H2', 'H3'], 7);
    var before = Engine.snapshot(revealed);
    var confirmation = accepted(revealed, { type: 'REQUEST_RETREAT' });
    var result = Engine.confirmRetreat(confirmation);
    T.equal(result.state.position, 1);
    T.equal(result.state.seed, revealed.seed);
    T.equal(result.state.rngState, revealed.rngState);
    T.deepEqual(result.state.assignments, before.assignments);
  });

  T.test('UT-019 — candidatos finais são os três IDs não usados de cada pool', function () {
    var state = stateFixture(startFormation(7), {
      assignments: {
        physical: ['A1', 'A2', 'A3', 'A4', 'A5'],
        supernatural: ['B1', 'B2', 'B3', 'B4', 'B5'],
        final: [null, null, null, null, null, null]
      }
    });
    T.deepEqual(Engine.deriveFinalCandidates(state), ['A6', 'A7', 'A8', 'B6', 'B7', 'B8']);
  });

  T.test('UT-020 — primeira revelação consome um passo, atribui e registra o encontro', function () {
    var before = departWith(['H1', 'H2', 'H3'], 7);
    var expectedStep = Engine.createMulberry32(7).next();
    var result = Engine.revealCurrentPosition(before);
    T.equal(result.state.rngState, expectedStep.state);
    T.truthy(result.state.assignments.physical[0]);
    T.equal(result.state.actionHistory[result.state.actionHistory.length - 1].type, 'encounter_revealed');
  });

  T.test('UT-021 — estado pronto possui forma limpa e dezesseis posições nulas', function () {
    var state = Engine.createReadyState();
    T.deepEqual({ version: state.version, phase: state.phase, seed: state.seed, dungeon: state.dungeonId, position: state.position }, { version: 1, phase: 'ready', seed: null, dungeon: null, position: null });
    T.equal(state.assignments.physical.concat(state.assignments.supernatural, state.assignments.final).filter(function (value) { return value !== null; }).length, 0);
    T.equal(state.assignments.physical.concat(state.assignments.supernatural, state.assignments.final).length, 16);
    T.deepEqual([state.deadHeroIds, state.actionHistory], [[], []]);
  });

  T.test('UT-022 — BEGIN normaliza a semente e registra campaign_started', function () {
    var result = Engine.dispatch(Engine.createReadyState(), { type: 'BEGIN', seed: 20260830 });
    T.truthy(result.ok);
    T.equal(result.state.phase, 'intro');
    T.equal(result.state.seed, 20260830);
    T.equal(result.state.rngState, 20260830);
    T.deepEqual(result.state.actionHistory, [{ sequence: 1, type: 'campaign_started', seed: 20260830 }]);
  });

  T.test('UT-023 — ação fora da fase retorna invalid_transition e a mesma referência', function () {
    var state = Engine.createReadyState();
    var result = Engine.dispatch(state, { type: 'DEPART' });
    T.equal(result.error.code, 'invalid_transition');
    T.truthy(result.state === state);
    var sacrifice = Engine.dispatch(startFormation(7), { type: 'CONFIRM_SACRIFICE' });
    T.equal(sacrifice.error.code, 'invalid_transition');
    T.truthy(sacrifice.state.phase === 'formation');
  });

  T.test('UT-024 — segundo BEGIN não cria outra campanha ou evento', function () {
    var state = accepted(Engine.createReadyState(), { type: 'BEGIN', seed: 7 });
    var result = Engine.dispatch(state, { type: 'BEGIN', seed: 8 });
    T.equal(result.error.code, 'invalid_transition');
    T.truthy(result.state === state);
    T.equal(state.actionHistory.length, 1);
  });

  T.test('UT-025 — DEPART rejeita zero, um, dois ou quatro selecionados com elenco amplo', function () {
    [[], ['H1'], ['H1', 'H2']].forEach(function (heroIds) {
      var state = selectParty(startFormation(7), heroIds);
      T.equal(Engine.dispatch(state, { type: 'DEPART' }).error.code, 'invalid_party_size');
    });
    var fourSelected = stateFixture(startFormation(7), { draftPartyIds: ['H1', 'H2', 'H3', 'H4'] });
    T.equal(Engine.dispatch(fourSelected, { type: 'DEPART' }).error.code, 'invalid_party_size');
  });

  T.test('UT-026 — três selecionados distintos tornam-se a expedição', function () {
    var state = departWith(['H1', 'H2', 'H3'], 7);
    T.equal(state.phase, 'dungeon_intro');
    T.deepEqual(state.partyIds, ['H1', 'H2', 'H3']);
  });

  T.test('UT-027 — dois sobreviventes são auto-selecionados e ambos são obrigatórios', function () {
    var state = stateFixture(startFormation(7), { deadHeroIds: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'], draftPartyIds: [] });
    var formation = Engine.deriveFormation(state);
    T.equal(formation.mode, 'automatic');
    T.deepEqual(formation.selectedHeroIds, ['H7', 'H8']);
    T.truthy(formation.canDepart);
  });

  T.test('UT-028 — um sobrevivente é automático e zero sobreviventes deriva derrota', function () {
    var one = stateFixture(startFormation(7), { deadHeroIds: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7'], draftPartyIds: [] });
    var zero = stateFixture(startFormation(7), { deadHeroIds: Data.heroOrder.slice(), draftPartyIds: [] });
    T.deepEqual(Engine.deriveFormation(one).selectedHeroIds, ['H8']);
    T.equal(Engine.deriveFormation(zero).mode, 'defeat');
  });

  T.test('UT-029 — morto, desconhecido ou repetição não entra duplicado na formação', function () {
    var deadState = stateFixture(startFormation(7), { deadHeroIds: ['H1'] });
    T.equal(Engine.dispatch(deadState, { type: 'TOGGLE_HERO', heroId: 'H1' }).error.code, 'invalid_hero');
    T.equal(Engine.dispatch(deadState, { type: 'TOGGLE_HERO', heroId: 'HX' }).error.code, 'invalid_hero');
    var selected = accepted(startFormation(7), { type: 'TOGGLE_HERO', heroId: 'H2' });
    selected = accepted(selected, { type: 'TOGGLE_HERO', heroId: 'H2' });
    T.deepEqual(selected.draftPartyIds, []);
  });

  T.test('UT-030 — visão de formação mostra dois rótulos por herói e bardo sem competências', function () {
    var view = Engine.derivePlayerView(startFormation(7));
    T.equal(view.town.length, 8);
    view.town.forEach(function (hero) { T.equal(hero.competencyLabels.length, 2); });
    T.deepEqual(view.bard, { label: 'Bardo', automatic: true, competencyLabels: [] });
  });

  T.test('UT-031 — visão pré-compromisso expõe somente IDs e textos das abordagens', function () {
    var view = Engine.derivePlayerView(firstEncounter(['H1', 'H2', 'H3'], 7));
    T.deepEqual(Object.keys(view.encounter.approaches[0]).sort(), ['id', 'text']);
    var serialized = JSON.stringify(view.encounter.approaches);
    T.falsy(/competency|viab|css|success|holder/i.test(serialized));
  });

  T.test('UT-032 — abordagem coberta produz resultado de sucesso congelado', function () {
    var state = accepted(firstEncounter(['H1', 'H2', 'H3'], 7), { type: 'CHOOSE_APPROACH', approachId: 'A1-1' });
    T.truthy(state.pendingOutcome.success);
    T.equal(state.pendingOutcome.competencyId, 'strength');
    T.truthy(Object.isFrozen(state.pendingOutcome));
  });

  T.test('UT-033 — abordagem sem competência produz resultado letal', function () {
    var state = failedA1State();
    T.falsy(state.pendingOutcome.success);
    T.equal(state.pendingOutcome.competencyId, 'strength');
    T.equal(state.phase, 'approach_result');
  });

  T.test('UT-034 — uma ou duas ocorrências da competência têm a mesma mecânica de sucesso', function () {
    var oneHolder = accepted(firstEncounter(['H1', 'H2', 'H3'], 7), { type: 'CHOOSE_APPROACH', approachId: 'A1-1' }).pendingOutcome;
    var twoHolders = accepted(firstEncounter(['H1', 'H5', 'H2'], 7), { type: 'CHOOSE_APPROACH', approachId: 'A1-1' }).pendingOutcome;
    T.deepEqual(
      { success: oneHolder.success, competencyId: oneHolder.competencyId, resultText: oneHolder.resultText },
      { success: twoHolders.success, competencyId: twoHolders.competencyId, resultText: twoHolders.resultText }
    );
    T.deepEqual([oneHolder.holderHeroIds.length, twoHolders.holderHeroIds.length], [1, 2]);
  });

  T.test('UT-035 — visão pós-compromisso revela competência, posse e explicação', function () {
    var view = Engine.derivePlayerView(accepted(firstEncounter(['H1', 'H2', 'H3'], 7), { type: 'CHOOSE_APPROACH', approachId: 'A1-1' }));
    T.deepEqual(Object.keys(view.outcome).sort(), ['competencyLabel', 'explanation', 'partyHasCompetency', 'success', 'victimId']);
    T.equal(view.outcome.competencyLabel, 'Força');
    T.truthy(view.outcome.partyHasCompetency);
    T.truthy(view.outcome.explanation.length > 0);
  });

  T.test('UT-036 — falha abre escolha com exatamente a expedição viva', function () {
    var state = accepted(failedA1State(), { type: 'OPEN_SACRIFICE' });
    var view = Engine.derivePlayerView(state);
    T.equal(state.phase, 'sacrifice_choice');
    T.deepEqual(view.eligibleVictims.map(function (hero) { return hero.id; }), ['H4', 'H7', 'H8']);
  });

  T.test('UT-037 — bardo, reserva, morto, desconhecido e ID obsoleto são vítimas inválidas', function () {
    var base = openSacrificeState();
    ['BARD', 'H1', 'HX'].forEach(function (heroId) {
      T.equal(Engine.dispatch(base, { type: 'SELECT_VICTIM', heroId: heroId }).error.code, 'invalid_victim');
    });
    var withDeadReserve = stateFixture(base, { deadHeroIds: ['H1'] });
    T.equal(Engine.dispatch(withDeadReserve, { type: 'SELECT_VICTIM', heroId: 'H1' }).error.code, 'invalid_victim');
  });

  T.test('UT-038 — sacrifício confirmado remove a vítima e registra uma morte', function () {
    var state = accepted(openSacrificeState(), { type: 'SELECT_VICTIM', heroId: 'H4' });
    state = accepted(state, { type: 'CONFIRM_SACRIFICE' });
    T.deepEqual(state.partyIds, ['H7', 'H8']);
    T.deepEqual(state.deadHeroIds, ['H4']);
    T.equal(state.pendingVictimId, null);
    T.equal(state.actionHistory[state.actionHistory.length - 1].type, 'hero_sacrificed');
  });

  T.test('UT-039 — morte do último herói presente com reservas inicia recuo automático', function () {
    var deathResult = deathResultWithEmptyParty();
    var assignments = deathResult.assignments;
    var state = accepted(deathResult, { type: 'ACK_DEATH' });
    T.equal(state.phase, 'automatic_retreat');
    T.deepEqual(state.assignments, assignments);
  });

  T.test('UT-040 — morte de todo o elenco entra em derrota, nunca recuo automático', function () {
    var state = runToDefeat();
    T.equal(state.phase, 'defeat');
    T.equal(Engine.snapshot(state).aliveHeroes.length, 0);
    T.falsy(state.actionHistory.some(function (entry, index) { return entry.type === 'automatic_retreat' && index === state.actionHistory.length - 1; }));
  });

  T.test('UT-041 — recuo é elegível antes do compromisso com pelo menos três vivos', function () {
    var preparation = departWith(['H1', 'H2', 'H3'], 7);
    T.truthy(Engine.deriveRetreatEligibility(preparation));
    var confirmation = accepted(preparation, { type: 'REQUEST_RETREAT' });
    T.equal(confirmation.phase, 'retreat_confirmation');
    T.equal(accepted(confirmation, { type: 'CANCEL_RETREAT' }).phase, 'dungeon_intro');

    var state = accepted(preparation, { type: 'ENTER_DUNGEON' });
    T.truthy(Engine.deriveRetreatEligibility(state));
    var threeAlive = stateFixture(state, { deadHeroIds: ['H4', 'H5', 'H6', 'H7', 'H8'] });
    T.truthy(Engine.deriveRetreatEligibility(threeAlive));
  });

  T.test('UT-042 — compromisso ou menos de três vivos torna o recuo indisponível', function () {
    var committed = accepted(firstEncounter(['H1', 'H2', 'H3'], 7), { type: 'CHOOSE_APPROACH', approachId: 'A1-1' });
    T.equal(Engine.dispatch(committed, { type: 'REQUEST_RETREAT' }).error.code, 'retreat_unavailable');
    var reducedFormation = stateFixture(startFormation(7), {
      deadHeroIds: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
      draftPartyIds: ['H7', 'H8']
    });
    var twoAlive = accepted(accepted(reducedFormation, { type: 'DEPART' }), { type: 'ENTER_DUNGEON' });
    T.equal(Engine.dispatch(twoAlive, { type: 'REQUEST_RETREAT' }).error.code, 'retreat_unavailable');
    T.falsy(Engine.deriveRetreatEligibility(startFormation(7)));
  });

  T.test('UT-043 — recuo retorna à formação e preserva mortes e atribuições', function () {
    var state = firstEncounter(['H1', 'H2', 'H3'], 7);
    var before = Engine.snapshot(state);
    state = accepted(state, { type: 'REQUEST_RETREAT' });
    state = accepted(state, { type: 'CONFIRM_RETREAT' });
    T.equal(state.phase, 'formation');
    T.deepEqual(state.partyIds, []);
    T.deepEqual(state.draftPartyIds, []);
    T.equal(state.position, 1);
    T.deepEqual(state.deadHeroIds, before.deadHeroes);
    T.deepEqual(state.assignments, before.assignments);
  });

  T.test('UT-044 — cancelar recuo restaura o mesmo encontro sem sorteio e registra as duas ações', function () {
    var state = firstEncounter(['H1', 'H2', 'H3'], 7);
    var before = Engine.snapshot(state);
    var rngState = state.rngState;
    state = accepted(state, { type: 'REQUEST_RETREAT' });
    state = accepted(state, { type: 'CANCEL_RETREAT' });
    var after = Engine.snapshot(state);
    T.equal(after.currentEncounter.id, before.currentEncounter.id);
    T.equal(state.rngState, rngState);
    T.deepEqual(after.assignments, before.assignments);
    T.deepEqual(after.actionHistory.slice(-2).map(function (entry) { return entry.type; }), ['retreat_requested', 'retreat_cancelled']);
    T.equal(after.actionHistory.length, before.actionHistory.length + 2);
  });

  T.test('UT-045 — elegibilidade usa somente A na física e somente B na sobrenatural', function () {
    var physical = departWith(['H1', 'H2', 'H3'], 7);
    T.truthy(Engine.eligibleEncounterIds(physical).every(function (encounterId) { return /^A/.test(encounterId); }));
    var supernatural = stateFixture(physical, {
      dungeonId: 'supernatural',
      assignments: { physical: ['A1', 'A2', 'A3', 'A4', 'A5'], supernatural: [null, null, null, null, null], final: [null, null, null, null, null, null] }
    });
    T.truthy(Engine.eligibleEncounterIds(supernatural).every(function (encounterId) { return /^B/.test(encounterId); }));
  });

  T.test('UT-046 — posição cinco conclui masmorra inicial e posição seis conclui a final', function () {
    var initial = stateFixture(departWith(['H1', 'H2', 'H3'], 7), { position: 5 });
    T.equal(Engine.advancePosition(initial).state.phase, 'dungeon_complete');
    var finalResult = runSafeCampaign(true);
    T.equal(Engine.advancePosition(finalResult).state.phase, 'victory');
  });

  T.test('UT-047 — avanço respeita física, sobrenatural e final sem replay', function () {
    function assertInvalidDungeonPosition(state) {
      var result = Engine.dispatch(state, { type: 'CONTINUE_DUNGEON' });
      T.truthy(result.ok);
      T.equal(result.state.phase, 'invalid');
      T.includes(result.state.invariantViolations.map(function (item) { return item.code; }), 'invalid_dungeon_position');
    }

    var physicalComplete = stateFixture(departWith(['H1', 'H2', 'H3'], 7), {
      phase: 'dungeon_complete',
      position: 5,
      assignments: { physical: ['A1', 'A2', 'A3', 'A4', 'A5'], supernatural: [null, null, null, null, null], final: [null, null, null, null, null, null] }
    });
    var supernatural = Engine.advanceDungeon(physicalComplete).state;
    T.equal(supernatural.dungeonId, 'supernatural');
    var supernaturalComplete = stateFixture(supernatural, {
      phase: 'dungeon_complete',
      position: 5,
      assignments: { physical: ['A1', 'A2', 'A3', 'A4', 'A5'], supernatural: ['B1', 'B2', 'B3', 'B4', 'B5'], final: [null, null, null, null, null, null] }
    });
    var finalState = Engine.advanceDungeon(supernaturalComplete).state;
    T.equal(finalState.dungeonId, 'final');
    T.equal(Engine.advanceDungeon(stateFixture(finalState, { phase: 'dungeon_complete' })).error.code, 'invalid_dungeon_order');
    var incomplete = stateFixture(departWith(['H1', 'H2', 'H3'], 7), {
      phase: 'dungeon_complete',
      position: 5
    });
    T.equal(accepted(incomplete, { type: 'CONTINUE_DUNGEON' }).phase, 'invalid');
    var wrongPosition = stateFixture(physicalComplete, { position: 1 });
    assertInvalidDungeonPosition(wrongPosition);
    var finalComplete = stateFixture(runSafeCampaign(true), {
      phase: 'dungeon_complete',
      position: 5,
      pendingOutcome: null
    });
    assertInvalidDungeonPosition(finalComplete);
  });

  T.test('UT-048 — final atribui progressivamente somente seis candidatos sem repetição', function () {
    var victory = runSafeCampaign(false);
    var finalIds = victory.assignments.final;
    var candidates = Engine.deriveFinalCandidates(victory);
    T.equal(new Set(finalIds).size, 6);
    T.truthy(finalIds.every(function (encounterId) { return candidates.indexOf(encounterId) >= 0; }));
  });

  T.test('UT-049 — campanha completa contém cada encontro exatamente uma vez', function () {
    var result = Engine.completeCampaign(runSafeCampaign(false));
    T.truthy(result.ok);
    T.equal(new Set(result.encounterIds).size, 16);
    T.deepEqual(result.missingIds, []);
  });

  T.test('UT-050 — ACK_SUCCESS no sexto encontro final entra em vitória com epílogos', function () {
    var finalResult = runSafeCampaign(true);
    var victory = accepted(finalResult, { type: 'ACK_SUCCESS' });
    var view = Engine.derivePlayerView(victory);
    T.equal(victory.phase, 'victory');
    T.equal(view.ending.epilogues.length, 8);
  });

  T.test('UT-051 — nova campanha após vitória limpa mortes, posições, história e RNG', function () {
    var victory = runSafeCampaign(false);
    var ready = accepted(victory, { type: 'NEW_CAMPAIGN' });
    T.deepEqual(ready, Engine.createReadyState());
  });

  T.test('UT-052 — NEW_CAMPAIGN rejeita fase não terminal e limpa derrota como vitória', function () {
    var formation = startFormation(7);
    T.equal(Engine.dispatch(formation, { type: 'NEW_CAMPAIGN' }).error.code, 'invalid_transition');
    var defeat = stateFixture(formation, { phase: 'defeat', deadHeroIds: Data.heroOrder.slice(), draftPartyIds: [], partyIds: [] });
    T.deepEqual(accepted(defeat, { type: 'NEW_CAMPAIGN' }), Engine.createReadyState());
  });

  T.test('UT-053 — snapshot possui exatamente as chaves v1 e posição baseada em um', function () {
    var snapshot = Engine.snapshot(firstEncounter(['H1', 'H2', 'H3'], 7));
    T.deepEqual(Object.keys(snapshot).sort(), ['actionHistory', 'aliveHeroes', 'assignments', 'competencies', 'currentEncounter', 'deadHeroes', 'dungeon', 'invariantViolations', 'party', 'phase', 'position', 'seed', 'version']);
    T.equal(snapshot.position, 1);
  });

  T.test('UT-054 — snapshot mantém posições futuras nulas e sem candidatos antecipados', function () {
    var snapshot = Engine.snapshot(firstEncounter(['H1', 'H2', 'H3'], 7));
    T.equal(snapshot.assignments.physical.filter(Boolean).length, 1);
    T.deepEqual(snapshot.assignments.physical.slice(1), [null, null, null, null]);
    T.deepEqual(snapshot.assignments.supernatural, [null, null, null, null, null]);
    T.deepEqual(snapshot.assignments.final, [null, null, null, null, null, null]);
  });

  T.test('UT-055 — mutar uma cópia do snapshot não altera o motor ou cópia posterior', function () {
    var state = firstEncounter(['H1', 'H2', 'H3'], 7);
    var first = Engine.snapshot(state);
    T.throws(function () { first.party.push('H8'); });
    T.throws(function () { first.assignments.physical[0] = 'A8'; });
    var second = Engine.snapshot(state);
    T.deepEqual(second.party, ['H1', 'H2', 'H3']);
    T.equal(second.assignments.physical[0], 'A1');
  });

  T.test('UT-056 — validateState aceita estado canônico sem mutar estado ou RNG', function () {
    var state = firstEncounter(['H1', 'H2', 'H3'], 7);
    var before = Engine.snapshot(state);
    var rngState = state.rngState;
    T.deepEqual(Engine.validateState(state), { ok: true, violations: [] });
    T.deepEqual(Engine.snapshot(state), before);
    T.equal(state.rngState, rngState);
  });

  T.test('UT-057 — atribuição duplicada informa masmorra, ID e posições baseadas em um', function () {
    var state = stateFixture(startFormation(7), {
      assignments: { physical: ['A1', null, null, 'A1', null], supernatural: [null, null, null, null, null], final: [null, null, null, null, null, null] }
    });
    var violation = Engine.validateState(state).violations.filter(function (item) { return item.code === 'duplicate_encounter_assignment'; })[0];
    T.deepEqual(violation.context, { dungeon: 'physical', encounterId: 'A1', positions: [1, 4] });
  });

  T.test('UT-058 — sobreposição, payload de fase e salto de masmorra são violações separadas', function () {
    var state = stateFixture(startFormation(7), {
      phase: 'sacrifice_confirmation',
      dungeonId: 'final',
      partyIds: ['H1'],
      deadHeroIds: ['H1'],
      pendingOutcome: null,
      pendingVictimId: null
    });
    var codes = violationCodes(Engine.validateState(state));
    T.includes(codes, 'party_death_overlap');
    T.includes(codes, 'missing_phase_payload');
    T.includes(codes, 'missing_victim_payload');
    T.includes(codes, 'impossible_dungeon_transition');
    var encounter = firstEncounter(['H1', 'H2', 'H3'], 7);
    var malformedOutcome = stateFixture(accepted(encounter, { type: 'CHOOSE_APPROACH', approachId: 'A1-1' }), {
      pendingOutcome: { success: true }
    });
    var malformedOutcomeResult = Engine.dispatch(malformedOutcome, { type: 'ACK_SUCCESS' });
    T.truthy(malformedOutcomeResult.ok);
    T.equal(malformedOutcomeResult.state.phase, 'invalid');
    T.includes(malformedOutcomeResult.state.invariantViolations.map(function (item) { return item.code; }), 'invalid_outcome_payload');
    var validResult = accepted(encounter, { type: 'CHOOSE_APPROACH', approachId: 'A1-1' });
    [
      { encounterId: '__proto__' },
      { approachId: 'A1-2' },
      { competencyId: 'will' },
      { holderHeroIds: [], success: true },
      { holderHeroIds: ['H4'], success: true },
      { holderHeroIds: ['H1', 'H1'], success: true },
      { holderHeroIds: ['H1'], success: false },
      { resultText: 'Resultado corrompido.' },
      { victimId: 'H9' }
    ].forEach(function (outcomeChanges) {
      var outcome = JSON.parse(JSON.stringify(validResult.pendingOutcome));
      Object.keys(outcomeChanges).forEach(function (key) { outcome[key] = outcomeChanges[key]; });
      var corrupted = stateFixture(validResult, { pendingOutcome: outcome });
      var corruptedResult = Engine.dispatch(corrupted, { type: outcome.success ? 'ACK_SUCCESS' : 'OPEN_SACRIFICE' });
      T.truthy(corruptedResult.ok);
      T.equal(corruptedResult.state.phase, 'invalid');
      T.includes(corruptedResult.state.invariantViolations.map(function (item) { return item.code; }), 'invalid_outcome_payload');
    });
    var confirmation = accepted(openSacrificeState(), { type: 'SELECT_VICTIM', heroId: 'H4' });
    var invalidVictim = stateFixture(confirmation, { pendingVictimId: 'H9' });
    T.includes(violationCodes(Engine.validateState(invalidVictim)), 'invalid_victim_payload');
    var successfulSacrifice = JSON.parse(JSON.stringify(confirmation.pendingOutcome));
    successfulSacrifice.success = true;
    var invalidSacrifice = stateFixture(confirmation, { pendingOutcome: successfulSacrifice });
    T.includes(violationCodes(Engine.validateState(invalidSacrifice)), 'invalid_outcome_payload');
    var deathResult = accepted(confirmation, { type: 'CONFIRM_SACRIFICE' });
    var missingRegisteredDeath = stateFixture(deathResult, { deadHeroIds: [] });
    T.includes(violationCodes(Engine.validateState(missingRegisteredDeath)), 'invalid_outcome_payload');
    [
      { state: encounter, positions: [0, 6, 1.5, null] },
      { state: stateFixture(encounter, { dungeonId: 'supernatural' }), positions: [0, 6, 1.5, null] },
      { state: stateFixture(encounter, { dungeonId: 'final' }), positions: [0, 7, 1.5, null] }
    ].forEach(function (currentDungeon) {
      currentDungeon.positions.forEach(function (position) {
        var invalidPosition = stateFixture(currentDungeon.state, { position: position });
        T.includes(violationCodes(Engine.validateState(invalidPosition)), 'invalid_dungeon_position', currentDungeon.state.dungeonId + ':' + position);
      });
    });
  });

  T.test('UT-059 — enterInvalid é idempotente e dispatch rejeita estado malformado', function () {
    function cloneReadyState() {
      return JSON.parse(JSON.stringify(Engine.createReadyState()));
    }

    var state = startFormation(7);
    var violation = { code: 'forced_test_violation', message: 'Violação controlada.', context: { field: 'phase' } };
    var invalid = Engine.enterInvalid(state, [violation]);
    T.equal(invalid.phase, 'invalid');
    T.equal(invalid.invariantViolations[0].context.priorSnapshot.phase, 'formation');
    T.truthy(Engine.enterInvalid(invalid, [violation]) === invalid);
    var malformedResult = Engine.dispatch({}, { type: 'BEGIN', seed: 7 });
    T.truthy(malformedResult.ok);
    T.equal(malformedResult.state.phase, 'invalid');
    T.includes(malformedResult.state.invariantViolations.map(function (item) { return item.code; }), 'invalid_state_shape');
    var missingSequence = cloneReadyState();
    delete missingSequence.sequence;
    var missingSequenceResult = Engine.dispatch(missingSequence, { type: 'BEGIN', seed: 7 });
    T.truthy(missingSequenceResult.ok);
    T.equal(missingSequenceResult.state.phase, 'invalid');
    T.includes(missingSequenceResult.state.invariantViolations.map(function (item) { return item.code; }), 'invalid_state_shape');
    var malformedVictory = Engine.dispatch({ phase: 'victory' }, { type: 'NEW_CAMPAIGN' });
    T.truthy(malformedVictory.ok);
    T.equal(malformedVictory.state.phase, 'invalid');
    T.includes(malformedVictory.state.invariantViolations.map(function (item) { return item.code; }), 'invalid_state_shape');
    ['partyIds', 'deadHeroIds', 'draftPartyIds', 'assignments', 'actionHistory', 'invariantViolations'].forEach(function (field) {
      var missingField = cloneReadyState();
      delete missingField[field];
      T.includes(violationCodes(Engine.validateState(missingField)), 'invalid_state_shape', field);
    });
    ['physical', 'supernatural', 'final'].forEach(function (dungeonId) {
      var missingAssignments = cloneReadyState();
      delete missingAssignments.assignments[dungeonId];
      T.includes(violationCodes(Engine.validateState(missingAssignments)), 'invalid_state_shape', dungeonId);
    });
    [-1, 1.5].forEach(function (sequence) {
      var invalidSequence = cloneReadyState();
      invalidSequence.sequence = sequence;
      T.includes(violationCodes(Engine.validateState(invalidSequence)), 'invalid_state_shape', String(sequence));
    });
  });

  T.test('UT-060 — cada ação aceita incrementa a sequência e rejeição não acrescenta evento', function () {
    function acceptOne(state, action, expectedEvent) {
      var beforeSequence = state.sequence;
      var beforeLength = state.actionHistory.length;
      var next = accepted(state, action);
      T.equal(next.sequence, beforeSequence + 1, action.type);
      T.equal(next.actionHistory.length, beforeLength + 1, action.type);
      var appended = next.actionHistory[next.actionHistory.length - 1];
      T.equal(appended.sequence, next.sequence, action.type);
      Object.keys(expectedEvent).forEach(function (key) {
        T.deepEqual(appended[key], expectedEvent[key], action.type + '.' + key);
      });
      return next;
    }

    var state = Engine.createReadyState();
    var withEvent = Engine.appendHistory(state, { type: 'test_event', value: 1 });
    T.equal(withEvent.sequence, 1);
    T.deepEqual(withEvent.actionHistory, [{ sequence: 1, type: 'test_event', value: 1 }]);
    var started = acceptOne(state, { type: 'BEGIN', seed: 7 }, { type: 'campaign_started', seed: 7 });
    var formation = acceptOne(started, { type: 'CONTINUE_INTRO' }, { type: 'formation_opened', dungeon: 'physical' });
    formation = acceptOne(formation, { type: 'TOGGLE_HERO', heroId: 'H1' }, { type: 'formation_selection_changed', heroId: 'H1', selected: true });
    formation = acceptOne(formation, { type: 'TOGGLE_HERO', heroId: 'H1' }, { type: 'formation_selection_changed', heroId: 'H1', selected: false });

    var sacrifice = failedA1State();
    sacrifice = acceptOne(sacrifice, { type: 'OPEN_SACRIFICE' }, { type: 'sacrifice_choice_opened', encounterId: 'A1' });
    sacrifice = acceptOne(sacrifice, { type: 'SELECT_VICTIM', heroId: 'H4' }, { type: 'sacrifice_victim_selected', encounterId: 'A1', heroId: 'H4' });
    sacrifice = acceptOne(sacrifice, { type: 'CANCEL_SACRIFICE' }, { type: 'sacrifice_confirmation_cancelled', encounterId: 'A1' });

    var retreat = firstEncounter(['H1', 'H2', 'H3'], 7);
    retreat = acceptOne(retreat, { type: 'REQUEST_RETREAT' }, { type: 'retreat_requested', dungeon: 'physical', position: 1, fromPhase: 'encounter_choice' });
    retreat = acceptOne(retreat, { type: 'CANCEL_RETREAT' }, { type: 'retreat_cancelled', dungeon: 'physical', position: 1, returnPhase: 'encounter_choice' });

    var automaticRetreat = accepted(deathResultWithEmptyParty(), { type: 'ACK_DEATH' });
    acceptOne(automaticRetreat, { type: 'ACK_AUTO_RETREAT' }, { type: 'automatic_retreat_acknowledged', dungeon: 'physical' });

    var rejected = Engine.dispatch(started, { type: 'BEGIN', seed: 8 });
    T.equal(rejected.state.sequence, started.sequence);
    T.deepEqual(rejected.state.actionHistory, started.actionHistory);
  });

  T.test('UT-061 — setSeed aceita 20260830 com a forma pública exata', function () {
    var current = qaFixture();
    T.deepEqual(global.expeditionQA.setSeed(20260830), { ok: true, seed: 20260830 });
    T.equal(global.expeditionQA.snapshot().seed, 20260830);
    current.cleanup();
  });

  T.test('UT-062 — semente inválida preserva a semente pendente anterior', function () {
    var current = qaFixture();
    global.expeditionQA.setSeed(17);
    T.deepEqual(global.expeditionQA.setSeed(-1), {
      ok: false,
      error: { code: 'invalid_seed', message: 'Use um número inteiro entre 0 e 4294967295.' }
    });
    T.equal(global.expeditionQA.snapshot().seed, 17);
    current.cleanup();
  });

  T.test('UT-063 — setSeed após BEGIN não altera a campanha', function () {
    var current = qaFixture();
    global.expeditionQA.setSeed(23);
    current.root.querySelector('[data-action="begin"]').click();
    T.deepEqual(global.expeditionQA.setSeed(42), {
      ok: false,
      error: { code: 'campaign_already_started', message: 'Defina a semente antes de iniciar a campanha.' }
    });
    T.equal(global.expeditionQA.snapshot().seed, 23);
    current.cleanup();
  });

  T.test('UT-064 — validate agrega catálogo e estado sem transição ou sorteio', function () {
    var current = qaFixture();
    var before = JSON.stringify(global.expeditionQA.snapshot());
    T.deepEqual(global.expeditionQA.validate(), { ok: true, violations: [] });
    T.equal(JSON.stringify(global.expeditionQA.snapshot()), before);
    current.cleanup();
  });

  T.test('UT-065 — objeto global congelado expõe somente três observadores permitidos', function () {
    var current = qaFixture();
    T.truthy(Object.isFrozen(global.expeditionQA));
    T.deepEqual(Object.keys(global.expeditionQA).sort(), ['setSeed', 'snapshot', 'validate']);
    ['dispatch', 'reset', 'assign', 'kill', 'revive'].forEach(function (name) {
      T.equal(global.expeditionQA[name], undefined, name);
    });
    current.cleanup();
  });

  T.test('UT-066 — BEGIN usa Date.now por padrão e a semente pendente tem precedência', function () {
    var originalNow = Date.now;
    Date.now = function () { return 123456789; };
    try {
      var defaultCampaign = qaFixture();
      defaultCampaign.root.querySelector('[data-action="begin"]').click();
      T.equal(global.expeditionQA.snapshot().seed, 123456789);
      defaultCampaign.cleanup();
      var seededCampaign = qaFixture();
      global.expeditionQA.setSeed(20260830);
      seededCampaign.root.querySelector('[data-action="begin"]').click();
      T.equal(global.expeditionQA.snapshot().seed, 20260830);
      T.deepEqual(global.expeditionQA.setSeed(9).error.code, 'campaign_already_started');
      seededCampaign.cleanup();
    } finally {
      Date.now = originalNow;
    }
  });
})(window);
