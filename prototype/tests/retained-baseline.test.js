(function (global) {
  'use strict';
  var T = global.ExpeditionTest, E = global.ExpeditionEngine, D = global.ExpeditionData, N = global.ExpeditionNarrative;
  var Driver = global.ExpeditionBrowserDriver;
  function copy(value) { return JSON.parse(JSON.stringify(value)); }
  function act(state, type, fields) { return E.dispatch(state, Object.assign({ type: type, expectedSequence: state.sequence }, fields || {})); }
  function accept(state, type, fields) { var result = act(state, type, fields); T.truthy(result.ok, type); return result.state; }
  function read(state) { var budget = 100; while (state.reading && budget--) state = accept(state, 'ADVANCE_TEXT'); T.truthy(budget > 0); return state; }
  function formation() { return read(accept(E.createReadyState(), 'BEGIN', { seed: 20260831 })); }
  function invalid(state, code) {
    var before = JSON.stringify(state), validation = E.validateState(state);
    T.falsy(validation.ok); T.includes(validation.violations.map(function (v) { return v.code; }), code);
    T.equal(JSON.stringify(state), before, 'A validação não repara nem altera o estado.');
  }
  T.test('BASE/UT-001 — RNG repetível conserva vinte passos e todos os limites unsigned', function () {
    [0, 20260831, 4294967295].forEach(function (seed) {
      var a = E.createMulberry32(seed), b = E.createMulberry32(seed);
      for (var i = 0; i < 20; i++) T.deepEqual(a.next(), b.next());
      T.deepEqual(E.normalizeSeed(seed), { ok: true, seed: seed });
    });
    [-1, 4294967296, 1.5, NaN, Infinity, null, '1'].forEach(function (seed) { T.equal(E.normalizeSeed(seed).error.code, 'invalid_seed'); });
  });
  T.test('BASE/UT-002 — progresso exige prefixo revelado e permite só uma revelação ainda não resolvida', function () {
    ['physical', 'supernatural', 'final'].forEach(function (route) {
      var state = formation(); state = copy(state); state.progress[route] = 1; invalid(state, 'invalid_progress');
    });
    var state = copy(formation()); state.assignments.physical[0] = 'A1'; T.truthy(E.validateState(state).ok);
    state.assignments.physical[1] = 'A2'; invalid(state, 'invalid_progress');
    state.progress.physical = 1; T.truthy(E.validateState(state).ok);
    state.assignments.physical[1] = null; state.assignments.physical[2] = 'A3'; invalid(state, 'invalid_assignments');
    state = copy(formation()); delete state.progress; invalid(state, 'invalid_progress');
    state = copy(formation()); state.assignments.physical[0] = 'A1'; state.assignments.physical[1] = 'A1'; state.progress.physical = 1;
    invalid(state, 'invalid_assignments');
    var duplicate = E.validateState(state).violations.find(function (issue) { return issue.code === 'invalid_assignments'; });
    T.deepEqual(duplicate.context, { dungeon: 'physical', encounterId: 'A1' });
    ['physical', 'supernatural'].forEach(function (route) {
      var stale = copy(formation());
      stale.assignments[route] = D.encounterOrder.filter(function (id) { return id[0] === (route === 'physical' ? 'A' : 'B'); }).slice(0, 5);
      stale.progress[route] = 4; stale.completedDungeonIds = [route]; stale.mapPieceIds = [route];
      invalid(stale, 'invalid_progress');
      stale.progress[route] = 5; T.truthy(E.validateState(stale).ok);
    });
    [-1, 6, 1.5, NaN, '1'].forEach(function (value) { var bad = copy(formation()); bad.progress.physical = value; invalid(bad, 'invalid_progress'); });
  });
  T.test('BASE/UT-003 — fase, destino selecionado e rota ativa mantêm propriedade exclusiva', function () {
    [1,2].forEach(function (version) { T.equal(E.validateState({version:version}).violations[0].code,'invalid_state_version'); });
    var state = copy(formation()); state.dungeonId = 'physical'; state.position = 1; invalid(state, 'invalid_route_state');
    state = copy(formation()); state.selectedDungeonId = 'unknown'; invalid(state, 'invalid_route_state');
    state = formation(); ['H1','H2','H3'].forEach(function (id) { state = accept(state, 'TOGGLE_HERO', {heroId:id}); });
    state = accept(state, 'SELECT_DESTINATION', {dungeonId:'physical'}); state = accept(state, 'DEPART');
    T.truthy(E.validateState(state).ok); T.equal(state.selectedDungeonId, null);
    [0, 6, null, 1.5].forEach(function (position) { var bad = copy(state); bad.position = position; invalid(bad, 'invalid_route_state'); });
    var bad = copy(state); bad.selectedDungeonId = 'supernatural'; invalid(bad, 'invalid_route_state');
    bad = copy(state); bad.dungeonId = 'unknown'; invalid(bad, 'invalid_route_state');
  });
  T.test('BASE/UT-004 — caminho final não aceita seleção, atividade ou atribuição sem as duas rotas concluídas', function () {
    ['selection', 'assignment', 'active'].forEach(function (vector) {
      var state = copy(formation());
      if (vector === 'selection') state.selectedDungeonId = 'final';
      if (vector === 'assignment') state.assignments.final[0] = 'A1';
      if (vector === 'active') { state.phase = 'dungeon_intro'; state.dungeonId = 'final'; state.position = 1; state.partyIds = ['H1']; state.draftPartyIds = ['H1']; }
      invalid(state, 'premature_final_route');
    });
  });
  T.test('BASE/UT-005 — catálogo de destinos mantém três registros válidos e rejeita forma ausente ou adulterada', function () {
    T.deepEqual(Object.keys(D.destinations), ['physical','supernatural','final']);
    T.deepEqual(Object.keys(E.deriveDestinations(formation())), ['physical','supernatural','final']);
    T.deepEqual(['physical','supernatural','final'].map(function (id) { return D.destinations[id].landmarkTotal; }), [5,5,6]);
    [function (d) { delete d.destinations.physical; }, function (d) { d.destinations.extra = copy(d.destinations.physical); }, function (d) { d.destinations.physical = null; }, function (d) { d.destinations.final.landmarkTotal = 5; }, function (d) { d.destinations.physical.name = ''; }].forEach(function (mutate) {
      var data = copy(D); mutate(data); T.falsy(E.validateCatalog(data, N).ok);
    });
    T.truthy(E.validateCatalog(D, N).ok); T.truthy(Object.isFrozen(D.destinations.physical));
  });
  T.test('BASE/UT-006 — semente e estado do gerador inválidos são diagnosticados sem normalização silenciosa', function () {
    ['seed','rngState'].forEach(function (field) {
      [-1, 4294967296, 0.5, null, '1', NaN].forEach(function (value) { var state = copy(formation()); state[field] = value; invalid(state, 'invalid_rng_state'); });
    });
    var fresh = E.createReadyState(); T.equal(fresh.seed, null); T.equal(fresh.rngState, null); T.truthy(E.validateState(fresh).ok);
  });
  T.test('BASE/IT-001 — seed pendente sobrevive à rejeição e Date.now só fornece a seed padrão', function () {
    var session = Driver.create(), now = Date.now;
    try {
      T.deepEqual(global.expeditionQA.setSeed(42), {ok:true,seed:42});
      T.falsy(global.expeditionQA.setSeed(-1).ok); Date.now = function () { return 900; };
      Driver.activate(session, {type:'BEGIN'}); T.equal(session.controller.getState().seed, 42);
      T.equal(global.expeditionQA.setSeed(7).error.code, 'campaign_already_started'); T.equal(session.controller.getState().seed, 42);
    } finally { Date.now = now; session.close(); }
    session = Driver.create();
    try { Date.now = function () { return 901; }; Driver.activate(session, {type:'BEGIN'}); T.equal(session.controller.getState().seed, 901); }
    finally { Date.now = now; session.close(); }
  });
  T.test('BASE/IT-002 — snapshots atômicos e rejeições sucessivas preservam apenas histórico aceito', function () {
    var session = Driver.create(20260831);
    try {
      Driver.activate(session, {type:'BEGIN'}); Driver.readAll(session);
      var before = global.expeditionQA.snapshot(), serialized = JSON.stringify(before);
      var rejected = session.controller.dispatch({type:'SELECT_DESTINATION',dungeonId:'unknown'});
      T.falsy(rejected.ok); var a = global.expeditionQA.snapshot(); T.equal(a.sequence,before.sequence);
      T.equal(a.lastRejectedAction.code,'invalid_destination'); T.deepEqual(a.actionHistory,before.actionHistory);
      session.controller.dispatch({type:'SELECT_DESTINATION',dungeonId:'final'});
      T.equal(global.expeditionQA.snapshot().lastRejectedAction.code,'destination_unavailable');
      Driver.activate(session, {type:'TOGGLE_HERO',heroId:'H1'});
      var after = global.expeditionQA.snapshot(); T.equal(after.lastRejectedAction,null); T.equal(after.sequence,before.sequence+1);
      T.equal(after.actionHistory.length,before.actionHistory.length+1); T.equal(JSON.stringify(before),serialized);
      T.truthy(Object.isFrozen(after.actionHistory)); T.truthy(Object.isFrozen(after.actionHistory[0]));
      after.actionHistory.forEach(function (event,index) { T.equal(event.sequence,index+1); });
      Driver.selectParty(session,['H1','H2','H3']); Driver.activate(session,{type:'SELECT_DESTINATION',dungeonId:'physical'});
      Driver.activate(session,{type:'DEPART'}); Driver.readAll(session); Driver.activate(session,{type:'ENTER_DUNGEON'}); Driver.readAll(session);
      var choiceBefore = global.expeditionQA.snapshot(), choiceText = JSON.stringify(choiceBefore);
      var approach = E.derivePlayerView(session.controller.getState()).currentEncounter.approaches[0];
      Driver.activate(session,{type:'CHOOSE_APPROACH',approachId:approach.id});
      var resultAfter = global.expeditionQA.snapshot();
      T.equal(choiceBefore.phase,'encounter_choice'); T.equal(resultAfter.phase,'approach_result');
      T.equal(resultAfter.actionHistory.length,choiceBefore.actionHistory.length+1); T.equal(JSON.stringify(choiceBefore),choiceText);
      T.truthy(Object.isFrozen(resultAfter.actionHistory));

    } finally { session.close(); }
  });
  T.test('BASE/IT-004 — ambas as ordens preservam seleção derivada, progresso cinco cinco seis e dezesseis encontros únicos', function () {
    [['physical','supernatural'],['supernatural','physical']].forEach(function (order) {
      var session = Driver.create(20260831);
      try {
        Driver.activate(session,{type:'BEGIN'}); Driver.readAll(session);
        T.equal(session.controller.getState().selectedDungeonId,null);
        Driver.playRoute(session,order[0]);
        T.equal(session.controller.getState().phase,'formation');
        T.equal(session.controller.getState().selectedDungeonId,order[1]);
        Driver.playRoute(session,order[1]);
        T.equal(session.controller.getState().selectedDungeonId,'final');
        Driver.playRoute(session,'final');
        Driver.activate(session,{type:'CHOOSE_ENDING',ending:'reunite'}); Driver.readAll(session);
        var state = session.controller.getState();
        T.deepEqual(state.progress,{physical:5,supernatural:5,final:6});
        var all = state.assignments.physical.concat(state.assignments.supernatural,state.assignments.final);
        T.equal(new Set(all).size,16); T.deepEqual(all.slice().sort(),D.encounterOrder.slice().sort());
        T.deepEqual(state.completedDungeonIds,order.concat(['final'])); T.equal(state.phase,'campaign_complete');
        T.equal(state.endingId,'reunite'); T.truthy(E.validateState(state).ok);
        state.history.forEach(function (event,index) { T.equal(event.sequence,index+1); });
      } finally { session.close(); }
    });
  });
})(window);
