(function (global) {
  'use strict';

  var T = global.ExpeditionTest;
  var E = global.ExpeditionEngine;
  var D = global.ExpeditionData;
  var N = global.ExpeditionNarrative;

  function copy(value) { return JSON.parse(JSON.stringify(value)); }
  function act(state, type, fields) {
    var before = JSON.stringify(state);
    var result = E.dispatch(state, Object.assign({ type: type, expectedSequence: state.sequence }, fields || {}));
    if (!result.ok) {
      T.equal(result.state, state);
      T.equal(JSON.stringify(state), before, 'Uma rejeição preserva todo o estado, histórico e RNG.');
      T.falsy(result.effects && result.effects.length, 'Uma rejeição não emite efeitos de jogo.');
    }
    return result;
  }
  function accepted(state, type, fields) {
    var result = act(state, type, fields);
    T.truthy(result.ok, type + ' deveria ser aceita.');
    return result.state;
  }
  function finish(state) {
    var guard = 300;
    while (state.reading && guard > 0) { state = accepted(state, 'ADVANCE_TEXT'); guard -= 1; }
    T.truthy(guard > 0, 'A leitura deve terminar.');
    return state;
  }
  function finishScene(state) {
    var sceneId = state.reading && state.reading.sceneId;
    var guard = 300;
    while (state.reading && state.reading.sceneId === sceneId && guard > 0) {
      state = accepted(state, 'ADVANCE_TEXT');
      guard -= 1;
    }
    T.truthy(guard > 0, 'A cena deve terminar.');
    return state;
  }
  function formation(seed) {
    return finish(accepted(E.createReadyState(), 'BEGIN', { seed: seed === undefined ? 7 : seed }));
  }
  function choice(seed, party, dungeon) {
    var state = formation(seed);
    (party || ['H1', 'H2', 'H3']).forEach(function (id) { state = accepted(state, 'TOGGLE_HERO', { heroId: id }); });
    state = accepted(state, 'SELECT_DESTINATION', { dungeonId: dungeon || 'physical' });
    state = accepted(state, 'DEPART');
    state = finish(state);
    state = accepted(state, 'ENTER_DUNGEON');
    return finish(state);
  }
  function firstCode(validation) { return validation.violations[0] && validation.violations[0].code; }

  function rngContract() {
    T.deepEqual(E.normalizeSeed(0), { ok: true, seed: 0 });
    T.falsy(E.normalizeSeed(-1).ok);
    var a = E.createMulberry32(20260831), b = E.createMulberry32(20260831);
    for (var i = 0; i < 12; i += 1) T.deepEqual(a.next(), b.next());
    T.equal(E.selectEligible(['a', 'b', 'c'], 0.999).value, 'c');
  }
  function readingContract() {
    var state = accepted(E.createReadyState(), 'BEGIN', { seed: 19 });
    T.equal(E.snapshot(state).reading.passageId, 'prologue.01');
    var rejected = act(state, 'SKIP_SEEN_TEXT');
    T.falsy(rejected.ok); T.equal(rejected.error.code, 'text_not_seen');
    state = accepted(state, 'ADVANCE_TEXT');
    T.equal(state.seenPassageIds[0], 'prologue.01');
    T.equal(state.reading.index, 1);
  }
  function rewardContract() {
    var state = terminalFixture(['H1', 'H3'], [], 'council');
    state.reading = { sceneId: 'council', passageIds: ['council.01', 'council.02', 'council.03', 'irati.03', 'council.challenge', 'council.confession', 'council.andira', 'opinion.H1', 'opinion.H3'], index: 0 };
    T.truthy(E.validateState(state).ok);
    state = finish(state);
    T.equal(state.phase, 'final_choice');
    T.equal(E.derivePlayerView(state).endingChoices.length, 2);
  }
  function endingContract() {
    var state = terminalFixture(['H1', 'H3'], [], 'final_choice');
    state = accepted(state, 'CHOOSE_ENDING', { ending: 'destroy' });
    T.equal(state.endingId, 'destroy');
    state = finish(state); T.equal(state.phase, 'campaign_complete');
    state = accepted(state, 'NEW_CAMPAIGN');
    T.deepEqual(state, E.createReadyState());
  }
  function observationContract() {
    var state = formation(23), snapshot = E.snapshot(state), view = E.derivePlayerView(state);
    T.equal(snapshot.version, 3); T.equal(snapshot.phase, 'formation');
    T.equal(snapshot.aliveHeroes.length, 8); T.equal(snapshot.mapFragments.found, 0);
    T.truthy(Object.isFrozen(snapshot)); T.truthy(Object.isFrozen(snapshot.assignments));
    T.falsy(JSON.stringify(view).match(/competencyIds|viability|rngState|actionHistory/i));
    var validation = E.validateState(state);
    var snapshotBefore = JSON.stringify(snapshot), viewBefore = JSON.stringify(view), validationBefore = JSON.stringify(validation);
    [
      function () { snapshot.deadHeroes.push('H1'); },
      function () { snapshot.assignments.physical[0] = 'A1'; },
      function () { view.heroes[0].name = 'Alterado'; },
      function () { validation.violations.push({ code: 'injected' }); }
    ].forEach(function (attempt) {
      try { attempt(); } catch (error) { T.truthy(error instanceof TypeError); }
    });
    T.equal(JSON.stringify(snapshot), snapshotBefore);
    T.equal(JSON.stringify(view), viewBefore);
    T.equal(JSON.stringify(validation), validationBefore);
    T.equal(JSON.stringify(E.snapshot(state)), snapshotBefore);
    T.equal(JSON.stringify(E.derivePlayerView(state)), viewBefore);
    T.equal(JSON.stringify(E.validateState(state)), validationBefore);
    var before = JSON.stringify(state); E.validateState(state); E.snapshot(state); E.derivePlayerView(state);
    T.equal(JSON.stringify(state), before);
  }

  function mutate(state, changes) { return Object.assign(copy(state), changes || {}); }
  function formationFixture(dead) {
    var state = mutate(E.createReadyState(), { phase: 'formation', seed: 1, rngState: 1, deadHeroIds: (dead || []).slice() });
    return state;
  }
  function encounterFixture(party, phase, position, dungeon, encounterId) {
    dungeon = dungeon || 'physical';
    position = position || 1;
    var defaults = dungeon === 'physical' ? ['A1','A2','A3','A4','A5'] : (dungeon === 'supernatural' ? ['B1','B2','B3','B4','B5'] : ['A6','A7','A8','B6','B7','B8']);
    var currentId = encounterId || defaults[position - 1];
    var prefix = defaults.filter(function (id) { return id !== currentId; }).slice(0, position - 1).concat([currentId]);
    var state = mutate(E.createReadyState(), { phase: phase || 'encounter_choice', seed: 1, rngState: 1, dungeonId: dungeon, position: position, partyIds: (party || ['H1','H2','H3']).slice(), draftPartyIds: (party || ['H1','H2','H3']).slice() });
    prefix.forEach(function (id, index) { state.assignments[dungeon][index] = id; });
    if (dungeon === 'final') {
      state.assignments.physical = ['A1','A2','A3','A4','A5'];
      state.assignments.supernatural = ['B1','B2','B3','B4','B5'];
      state.completedDungeonIds = ['physical','supernatural'];
      state.progress = { physical:5, supernatural:5, final:Math.max(0, position - 1) };
      state.mapPieceIds = ['physical','supernatural'];
    } else {
      state.progress[dungeon] = Math.max(0, position - 1);
    }
    return state;
  }
  function failureFixture(party, phase, position, dungeon, encounterId) {
    var state = encounterFixture(party, phase || 'sacrifice_choice', position, dungeon, encounterId);
    var encounter = D.encounters[encounterId || state.assignments[state.dungeonId][state.position - 1]];
    var approach = encounter.approaches.find(function (candidate) {
      return state.partyIds.every(function (heroId) {
        return D.heroes[heroId].competencyIds.indexOf(candidate.competencyId) < 0;
      });
    });
    if (!approach) throw new Error('A fixture de falha exige uma abordagem sem competência na equipe.');
    state.pendingOutcome = { encounterId: encounter.id, approachId: approach.id, competencyId: approach.competencyId, success: false };
    return state;
  }
  function terminalFixture(party, dead, phase) {
    var state = mutate(E.createReadyState(), { phase: phase || 'final_choice', seed: 2, rngState: 2, partyIds: (party || []).slice(), draftPartyIds: (party || []).slice(), deadHeroIds: (dead || []).slice(), climaxPartyIds: (party || []).slice().sort(), completedDungeonIds: ['physical','supernatural','final'], progress: { physical:5, supernatural:5, final:6 }, mapPieceIds: ['physical','supernatural'], medallionComplete: true, seenPassageIds: ['council.01'] });
    state.dungeonId = 'final'; state.position = 6;
    state.assignments = {physical:['A1','A2','A3','A4','A5'],supernatural:['B1','B2','B3','B4','B5'],final:['A6','A7','A8','B6','B7','B8']};
    return state;
  }
  function validTerminalPhase(phase) {
    var state = terminalFixture(['H1'], [], phase);
    if (phase === 'council') state.reading = { sceneId: 'council', passageIds: N.scenes.council.passageIds.slice(0, 4).concat(['council.challenge', 'council.confession', 'council.andira', 'opinion.H1']), index: 0 };
    if (phase === 'ending') { state.endingId = 'destroy'; state.reading = { sceneId: 'ending.destroy', passageIds: N.scenes['ending.destroy'].passageIds.slice(), index: 0 }; }
    if (phase === 'memorial') state.reading = { sceneId: 'memorial', passageIds: ['memorial.intro'], index: 0 };
    if (phase === 'epilogue') { state.endingId = 'destroy'; state.reading = { sceneId: 'epilogue.H1', passageIds: N.scenes['epilogue.H1'].passageIds.slice(), index: 0 }; }
    return state;
  }
  var rejectionMessages = {
    invalid_transition: 'Esta ação não está disponível no estado atual.',
    invalid_party_size: 'Escolha exatamente três heróis sobreviventes.',
    destination_required: 'Escolha um caminho antes de partir.',
    destination_unavailable: 'Este caminho não está disponível para expedição.',
    invalid_victim: 'Escolha um herói vivo presente na expedição.',
    retreat_unavailable: 'O recuo não está disponível neste momento.',
    text_not_seen: 'Este trecho ainda não foi lido nesta campanha.',
    invalid_ending: 'Escolha reunir ou destruir o medalhão.',
    stale_action: 'Esta ação pertence a uma tela anterior.',
    invalid_action: 'A ação informada é inválida.',
    invalid_destination: 'Escolha um caminho conhecido.',
    invalid_hero: 'Escolha um herói sobrevivente.',
    invalid_approach: 'Escolha uma abordagem deste encontro.',
    formation_locked: 'A formação inclui automaticamente todos os sobreviventes.',
    invalid_random_value: 'O valor aleatório deve estar entre 0 e 1.'
  };
  function errorCode(result, code) {
    T.falsy(result.ok); T.equal(result.error.code, code);
    T.truthy(rejectionMessages[code], 'A mensagem esperada precisa de um contrato explícito.');
    T.equal(result.error.message, rejectionMessages[code]);
    T.falsy(result.effects && result.effects.length);
  }
  function finishResult(state) { return finish(state); }

  var contracts = {
    13: function () { var s=E.createReadyState(), x=E.snapshot(s); T.equal(x.version,3); T.equal(x.phase,'ready'); T.equal(x.aliveHeroes.length,8); T.deepEqual(x.assignments,{physical:[null,null,null,null,null],supernatural:[null,null,null,null,null],final:[null,null,null,null,null,null]}); T.equal(x.seed,null); T.equal(x.reading,null); T.equal(x.ending,null); },
    14: function () { var s=formationFixture(); s=accepted(s,'SELECT_DESTINATION',{dungeonId:'physical'}); s=accepted(s,'TOGGLE_HERO',{heroId:'H1'}); s=accepted(s,'TOGGLE_HERO',{heroId:'H2'}); s=accepted(s,'TOGGLE_HERO',{heroId:'H3'}); s=accepted(s,'TOGGLE_HERO',{heroId:'H2'}); T.deepEqual(s.draftPartyIds,['H1','H3']); T.equal(s.selectedDungeonId,'physical'); },
    15: function () { var s=formationFixture(); ['H1','H2','H3'].forEach(function(id){s=accepted(s,'TOGGLE_HERO',{heroId:id});}); var before=JSON.stringify(s), r=act(s,'TOGGLE_HERO',{heroId:'H4'}); errorCode(r,'invalid_party_size'); T.deepEqual(r.error.context,{count:4}); T.equal(JSON.stringify(r.state),before); },
    16: function () { [5,6,7].forEach(function(n){var s=formationFixture(D.heroOrder.slice(0,n)); var f=E.deriveFormation(s); T.truthy(f.automatic); T.deepEqual(f.selectedHeroIds,D.heroOrder.slice(n)); errorCode(act(s,'TOGGLE_HERO',{heroId:f.selectedHeroIds[0]}),'formation_locked');}); },
    17: function () { ['H1','ivai','unknown'].forEach(function(id){var s=formationFixture(id==='H1'?['H1']:[]); errorCode(act(s,'TOGGLE_HERO',{heroId:id}),'invalid_hero');}); },
    18: function () { var s=formationFixture(); ['H1','H2','H3'].forEach(function(id){s=accepted(s,'TOGGLE_HERO',{heroId:id});}); s=accepted(s,'SELECT_DESTINATION',{dungeonId:'physical'}); s=accepted(s,'DEPART'); T.equal(s.phase,'dungeon_intro'); T.equal(s.position,1); T.deepEqual(s.partyIds,['H1','H2','H3']); T.falsy(s.partyIds.includes('ivai')); },
    19: function () { var s=formationFixture(); errorCode(act(s,'DEPART'),'destination_required'); s=accepted(s,'SELECT_DESTINATION',{dungeonId:'physical'}); s=accepted(s,'TOGGLE_HERO',{heroId:'H1'}); s=accepted(s,'TOGGLE_HERO',{heroId:'H2'}); var r=act(s,'DEPART'); errorCode(r,'invalid_party_size'); T.deepEqual(r.error.context,{count:2,required:3}); },
    20: function () { var s=formationFixture(); s=accepted(s,'SELECT_DESTINATION',{dungeonId:'supernatural'}); s=accepted(s,'TOGGLE_HERO',{heroId:'H1'}); T.equal(s.selectedDungeonId,'supernatural'); },
    21: function () { var s=formationFixture(); errorCode(act(s,'SELECT_DESTINATION',{dungeonId:'final'}),'destination_unavailable'); errorCode(act(s,'SELECT_DESTINATION',{dungeonId:'unknown'}),'invalid_destination'); s=copy(s); s.completedDungeonIds=['physical']; s.progress.physical=5; s.assignments.physical=['A1','A2','A3','A4','A5']; s.mapPieceIds=['physical']; errorCode(act(s,'SELECT_DESTINATION',{dungeonId:'physical'}),'destination_unavailable'); },
    22: function () { var s=formationFixture(), d=E.deriveDestinations(s); T.equal(d.physical.status,'available'); T.equal(d.supernatural.status,'available'); T.equal(d.final.status,'locked'); s.completedDungeonIds=['physical']; s.progress.physical=5; s.mapPieceIds=['physical']; d=E.deriveDestinations(s); T.equal(d.supernatural.status,'available'); s.completedDungeonIds.push('supernatural'); s.progress.supernatural=5; s.mapPieceIds.push('supernatural'); T.equal(E.deriveDestinations(s).final.status,'available'); },
    23: function () {
      for (var length = 1; length <= 8; length += 1) {
        var entries = D.encounterOrder.slice(0, length);
        T.equal(E.selectEligible(entries, 0).value, entries[0]);
        T.equal(E.selectEligible(entries, 0.9999999999999999).value, entries[length - 1]);
      }
      errorCode(E.selectEligible(['A1'], NaN), 'invalid_random_value');
      rngContract();
      ['physical', 'supernatural'].forEach(function (dungeon) {
        var state = formation(20260831);
        ['H1', 'H2', 'H3'].forEach(function (id) { state = accepted(state, 'TOGGLE_HERO', { heroId: id }); });
        state = accepted(state, 'SELECT_DESTINATION', { dungeonId: dungeon });
        state = finish(accepted(state, 'DEPART'));
        for (var position = 1; position <= 5; position += 1) {
          state = accepted(state, 'ENTER_DUNGEON');
          var drawn = state.assignments[dungeon].filter(Boolean);
          T.equal(new Set(drawn).size, position);
          T.truthy(drawn.every(function (id) { return id[0] === (dungeon === 'physical' ? 'A' : 'B'); }));
          T.deepEqual(state.assignments[dungeon].slice(position), Array(5 - position).fill(null));
          state = finish(state);
          var viable = E.deriveViability(state.partyIds, drawn[position - 1]).approaches.find(function (item) { return item.viable; });
          T.truthy(viable);
          state = finish(accepted(state, 'CHOOSE_APPROACH', { approachId: viable.id }));
        }
        T.includes(state.completedDungeonIds, dungeon);
      });
    },
    24: function () { var s=encounterFixture(['H1','H2','H3'],'dungeon_intro'); s.assignments.physical[0]=null; s.reading=null; var before=s.rngState; s=accepted(s,'ENTER_DUNGEON'); T.truthy(s.assignments.physical[0]); T.deepEqual(s.assignments.physical.slice(1),[null,null,null,null]); var assigned=s.assignments.physical.slice(), after=s.rngState; E.snapshot(s); E.validateState(s); E.derivePlayerView(s); T.deepEqual(s.assignments.physical,assigned); T.equal(s.rngState,after); T.truthy(before!==s.rngState); },
    25: function () { var s=encounterFixture(['H1','H2','H3'],'dungeon_intro'); s.reading=null; s=accepted(s,'ENTER_DUNGEON'); var id=s.assignments.physical[0], rng=s.rngState; s=copy(s); s.phase='dungeon_intro'; s.reading=null; s=accepted(s,'ENTER_DUNGEON'); T.equal(s.assignments.physical[0],id); T.equal(s.rngState,rng); },
    26: function () { var s=encounterFixture(['H1','H2','H3'],'encounter_choice',3); s.progress.physical=2; var r=act(s,'REQUEST_RETREAT'); T.truthy(r.ok); s=accepted(r.state,'CONFIRM_RETREAT'); T.equal(s.progress.physical,2); },
    27: function () {
      var candidates = ['A6', 'A7', 'A8', 'B6', 'B7', 'B8'];
      var state = encounterFixture(['H1', 'H2', 'H3'], 'dungeon_intro', 1, 'final');
      state.assignments.final = [null, null, null, null, null, null];
      state.rngState = 20260831;
      T.deepEqual(E.deriveFinalCandidates(state.assignments), candidates);
      for (var position = 1; position <= 6; position += 1) {
        state = accepted(state, 'ENTER_DUNGEON');
        var revealed = state.assignments.final.filter(Boolean);
        T.equal(new Set(revealed).size, position, 'Cada posição final deve revelar um encontro ainda não atribuído.');
        T.deepEqual(state.assignments.final.slice(position), Array(6 - position).fill(null));
        T.truthy(E.validateState(state).ok);
        state = finish(state);
        var encounter = E.derivePlayerView(state).currentEncounter;
        var approach = E.deriveViability(state.partyIds, encounter.id).approaches.find(function (item) { return item.viable; });
        T.truthy(approach, 'A formação de seis competências deve permitir continuar esta jornada.');
        state = finish(accepted(state, 'CHOOSE_APPROACH', { approachId: approach.id }));
      }
      T.deepEqual(state.assignments.final.slice().sort(), candidates);
      T.equal(state.phase, 'final_choice');
    },
    28: function () {
      [0, 1, 20260831, 4294967295].forEach(function (seed) {
        var a = encounterFixture(['H1','H2','H3'], 'dungeon_intro');
        var b = encounterFixture(['H4','H5','H6'], 'dungeon_intro');
        [a,b].forEach(function (state) { state.assignments.physical[0] = null; state.seed = seed; state.rngState = seed; });
        a = accepted(a, 'ENTER_DUNGEON'); b = accepted(b, 'ENTER_DUNGEON');
        T.truthy(a.assignments.physical[0]); T.equal(a.assignments.physical[0], b.assignments.physical[0]);
        T.equal(a.rngState, b.rngState); T.truthy(a.rngState !== seed);
      });
    },
    29: function () {
      [['H1','H2','H3'], ['H1','H5','H3']].forEach(function (party) {
        var state = encounterFixture(party, 'encounter_choice', 1, 'physical', 'A1');
        state = accepted(state, 'CHOOSE_APPROACH', { approachId:'A1-1' });
        T.truthy(state.pendingOutcome.success);
        T.equal(state.reading.sceneId, 'result.A1-1.success');
        T.deepEqual(state.reading.passageIds, N.scenes['result.A1-1.success'].passageIds);
      });
    },
    30: function () {
      [[], ['H1','H5']].forEach(function (dead) {
        var state = encounterFixture(['H2','H3','H4'], 'encounter_choice', 1, 'physical', 'A1');
        state.deadHeroIds = dead;
        state = accepted(state, 'CHOOSE_APPROACH', { approachId:'A1-1' });
        T.falsy(state.pendingOutcome.success);
        T.equal(state.reading.sceneId, 'result.A1-1.failure');
      });
    },
    31: function () { var s=encounterFixture(); errorCode(act(s,'CHOOSE_APPROACH',{approachId:'unknown'}),'invalid_approach'); errorCode(act(formationFixture(),'CHOOSE_APPROACH',{approachId:'A1-1'}),'invalid_transition'); },
    32: function () { var s=encounterFixture(['H3','H4','H7'],'encounter_choice'); var view=E.derivePlayerView(s); T.equal(view.currentEncounter.approaches.length,3); T.falsy(JSON.stringify(view).match(/competenc|viab/i)); },
    33: function () { var s=failureFixture(['H2','H3','H4']); s=accepted(s,'SELECT_VICTIM',{heroId:'H2'}); T.deepEqual(s.deadHeroIds,['H2']); T.deepEqual(s.partyIds,['H3','H4']); T.equal(s.phase,'death_result'); T.equal(s.reading.passageIds[0],'farewell.H2'); },
    34: function () { var s=failureFixture(['H1']); E.derivePlayerView(s); T.deepEqual(s.deadHeroIds,[]); s=accepted(s,'SELECT_VICTIM',{heroId:'H1'}); T.deepEqual(s.deadHeroIds,['H1']); },
    35: function () { ['ivai','H4','H2'].forEach(function(id){var s=id==='H2'?failureFixture(['H1','H3']):failureFixture(['H1','H2','H5']); if(id==='H2')s.deadHeroIds=['H2']; errorCode(act(s,'SELECT_VICTIM',{heroId:id}),'invalid_victim');}); var s=failureFixture(['H1']); s=accepted(s,'SELECT_VICTIM',{heroId:'H1'}); errorCode(act(s,'SELECT_VICTIM',{heroId:'H1'}),'invalid_transition'); },
    36: function () { var s=encounterFixture(['H2','H3','H4'],'encounter_choice'); s=accepted(s,'CHOOSE_APPROACH',{approachId:'A1-1'}); errorCode(act(s,'REQUEST_RETREAT'),'retreat_unavailable'); s=finishResult(s); errorCode(act(s,'REQUEST_RETREAT'),'retreat_unavailable'); s=accepted(s,'SELECT_VICTIM',{heroId:'H2'}); errorCode(act(s,'REQUEST_RETREAT'),'retreat_unavailable'); },
    37: function () { var s=failureFixture(['H2','H3','H4']); s=accepted(s,'SELECT_VICTIM',{heroId:'H2'}); s=finishResult(s); T.equal(s.phase,'dungeon_intro'); T.deepEqual(s.partyIds,['H3','H4']); errorCode(act(s,'TOGGLE_HERO',{heroId:'H5'}),'invalid_transition'); },
    38: function () { [4,5,6].forEach(function(n){var s=failureFixture(['H1']); s.deadHeroIds=D.heroOrder.filter(function(id){return id!=='H1';}).slice(0,n); s=accepted(s,'SELECT_VICTIM',{heroId:'H1'}); s=finishScene(s); T.equal(s.phase,'automatic_retreat'); s=finishScene(s); T.equal(s.phase,'formation');}); },
    39: function () { var s=failureFixture(['H1'],'sacrifice_choice',5); s.deadHeroIds=['H2','H3']; s=accepted(s,'SELECT_VICTIM',{heroId:'H1'}); s=finishScene(s); T.equal(s.phase,'dungeon_complete'); T.truthy(/^lover\.physical/.test(s.reading.sceneId)); },
    40: function () { var s=failureFixture(['H1'],'sacrifice_choice',6,'final','B8'); s.deadHeroIds=['H2','H3']; s=accepted(s,'SELECT_VICTIM',{heroId:'H1'}); s=finishScene(s); T.equal(s.phase,'council'); T.deepEqual(s.climaxPartyIds,[]); },
    41: function () {
      [{ dungeon: 'physical', position: 1 }, { dungeon: 'physical', position: 5 }, { dungeon: 'final', position: 6 }].forEach(function (boundary) {
        var state = encounterFixture(['H8'], 'encounter_choice', boundary.position, boundary.dungeon);
        state.deadHeroIds = D.heroOrder.slice(0, 7);
        var encounterId = state.assignments[boundary.dungeon][boundary.position - 1];
        var lethal = E.deriveViability(state.partyIds, encounterId).approaches.find(function (item) { return !item.viable; });
        T.truthy(lethal);
        T.truthy(E.validateState(state).ok);
        var mapBefore = state.mapPieceIds.slice(), completedBefore = state.completedDungeonIds.slice();
        state = finish(accepted(state, 'CHOOSE_APPROACH', { approachId: lethal.id }));
        T.equal(state.phase, 'sacrifice_choice');
        state = accepted(state, 'SELECT_VICTIM', { heroId: 'H8' });
        T.equal(state.phase, 'death_result');
        state = finishScene(state);
        T.equal(state.phase, 'ending');
        T.equal(state.endingId, 'bad');
        T.equal(state.reading.sceneId, 'ending.bad');
        T.deepEqual(state.mapPieceIds, mapBefore);
        T.deepEqual(state.completedDungeonIds, completedBefore);
        T.falsy(state.medallionComplete);
        T.deepEqual(state.climaxPartyIds, []);
        T.truthy(E.validateState(state).ok);
      });
    },
    42: function () { ['dungeon_intro','encounter_intro','encounter_choice'].forEach(function(phase){var s=encounterFixture(['H6','H7','H8'],phase); s.deadHeroIds=D.heroOrder.slice(0,5); T.truthy(E.deriveRetreatEligibility(s)); s.deadHeroIds.push('H6'); T.falsy(E.deriveRetreatEligibility(s));}); },
    43: function () { var s=encounterFixture(); s.phase='encounter_intro'; s.reading={sceneId:'encounter.A1',passageIds:N.scenes['encounter.A1'].passageIds.slice(),index:0}; var r=act(s,'REQUEST_RETREAT'); T.truthy(r.ok); var restored=accepted(r.state,'CANCEL_RETREAT'); T.deepEqual(restored.reading,s.reading); T.equal(restored.seenPassageIds.length,0); },
    44: function () { var s=encounterFixture(['H1','H2','H3'],'encounter_choice',2); s.progress.physical=1; var assigned=copy(s.assignments); s=accepted(s,'REQUEST_RETREAT'); s=accepted(s,'CONFIRM_RETREAT'); T.equal(s.phase,'formation'); T.equal(s.progress.physical,1); T.deepEqual(s.assignments,assigned); },
    45: function () { var s=encounterFixture(['H7','H8'],'encounter_choice'); s.deadHeroIds=D.heroOrder.slice(0,6); var r=act(s,'REQUEST_RETREAT'); errorCode(r,'retreat_unavailable'); T.deepEqual(r.error.context,{aliveHeroes:2}); },
    46: function () { var s=formationFixture(); s.sequence=7; s.history=Array.from({length:7},function(_,index){return {sequence:index+1,type:'fixture_action'};}); var first=act(s,'TOGGLE_HERO',{heroId:'H1'}); T.truthy(first.ok); T.equal(first.state.phase,'formation'); var replay=E.dispatch(first.state,{type:'TOGGLE_HERO',heroId:'H1',expectedSequence:7}); errorCode(replay,'stale_action'); T.deepEqual(replay.error.context,{expectedSequence:7,actualSequence:8}); T.equal(replay.state,first.state); },
    47: function () { [null,{}, {type:3,expectedSequence:0},{type:'BEGIN'},{type:'BEGIN',expectedSequence:'0',seed:1},{type:'BEGIN',expectedSequence:0,seed:1,extra:true},{type:'UNKNOWN',expectedSequence:0}].forEach(function(action){errorCode(E.dispatch(E.createReadyState(),action),'invalid_action');}); },
    48: function () { ['CONTINUE_INTRO','ACK_SUCCESS','OPEN_SACRIFICE','ACK_DEATH','ACK_AUTO_RETREAT','ACK_DUNGEON_COMPLETE','CANCEL_SACRIFICE','CONFIRM_SACRIFICE'].forEach(function(type){errorCode(E.dispatch(E.createReadyState(),{type:type,expectedSequence:0}),'invalid_action');}); },
    49: function () {
      T.equal(firstCode(E.validateState({ version: 2 })), 'invalid_state_version');
      var state = formationFixture();
      state.partyIds = ['H1'];
      state.deadHeroIds = ['H1'];
      var validation = E.validateState(state);
      T.falsy(validation.ok);
      var result = act(state, 'TOGGLE_HERO', { heroId: 'H2' });
      T.truthy(result.ok);
      T.equal(result.state.phase, 'invalid');
      T.deepEqual(result.state.invariantViolations, validation.violations);
      T.deepEqual(result.state.draftPartyIds, []);
      [
        { field: 'history', value: null, code: 'invalid_action_history' },
        { field: 'seenPassageIds', value: null, code: 'invalid_reading_cursor' },
        { field: 'mapPieceIds', value: null, code: 'invalid_reward_state' },
        { field: 'presentedDeathIds', value: null, code: 'invalid_dead_roster' },
        { field: 'climaxPartyIds', value: null, code: 'invalid_climax_party' }
      ].forEach(function (probe) {
        var malformedState = copy(accepted(E.createReadyState(), 'BEGIN', { seed: 4 }));
        malformedState[probe.field] = probe.value;
        var malformedValidation = E.validateState(malformedState);
        T.falsy(malformedValidation.ok, probe.field + ' deve ser rejeitado.');
        T.includes(malformedValidation.violations.map(function (item) { return item.code; }), probe.code);
        var quarantined = E.dispatch(malformedState, { type: 'ADVANCE_TEXT', expectedSequence: malformedState.sequence });
        T.truthy(quarantined.ok);
        T.equal(quarantined.state.phase, 'invalid');
        T.deepEqual(quarantined.state.invariantViolations, malformedValidation.violations);
        T.equal(E.snapshot(quarantined.state).phase, 'invalid');
        T.equal(E.derivePlayerView(quarantined.state).phase, 'invalid');
      });
      var missingReading = copy(accepted(E.createReadyState(), 'BEGIN', { seed: 5 }));
      missingReading.reading = null;
      var readingValidation = E.validateState(missingReading);
      T.falsy(readingValidation.ok);
      T.includes(readingValidation.violations.map(function (item) { return item.code; }), 'invalid_reading_cursor');
      T.equal(E.dispatch(missingReading, { type: 'ADVANCE_TEXT', expectedSequence: missingReading.sequence }).state.phase, 'invalid');
      var sacrifice = encounterFixture(['H2','H3','H4'], 'encounter_choice');
      sacrifice = accepted(sacrifice, 'CHOOSE_APPROACH', { approachId: 'A1-1' });
      sacrifice = finishResult(sacrifice);
      var death = accepted(sacrifice, 'SELECT_VICTIM', { heroId: 'H2' });
      [
        { state: sacrifice, mutate: function (s) { s.pendingOutcome = null; }, action: { type: 'SELECT_VICTIM', heroId: 'H2' } },
        { state: sacrifice, mutate: function (s) { s.pendingOutcome.success = 'false'; }, action: { type: 'SELECT_VICTIM', heroId: 'H2' } },
        { state: sacrifice, mutate: function (s) { s.pendingOutcome.competencyId = 'dexterity'; }, action: { type: 'SELECT_VICTIM', heroId: 'H2' } },
        { state: death, mutate: function (s) { delete s.pendingOutcome.victimId; }, action: { type: 'ADVANCE_TEXT' } },
        { state: death, mutate: function (s) { s.pendingOutcome.victimId = 'H9'; }, action: { type: 'ADVANCE_TEXT' } },
        { state: death, mutate: function (s) { s.pendingOutcome.victimId = 'H3'; }, action: { type: 'ADVANCE_TEXT' } }
      ].forEach(function (probe) {
        var malformedOutcome = copy(probe.state);
        probe.mutate(malformedOutcome);
        var outcomeValidation = E.validateState(malformedOutcome);
        T.falsy(outcomeValidation.ok);
        T.includes(outcomeValidation.violations.map(function (item) { return item.code; }), 'invalid_pending_outcome');
        var quarantinedOutcome = E.dispatch(malformedOutcome, Object.assign({ expectedSequence: malformedOutcome.sequence }, probe.action));
        T.truthy(quarantinedOutcome.ok);
        T.equal(quarantinedOutcome.state.phase, 'invalid');
        T.deepEqual(quarantinedOutcome.state.invariantViolations, outcomeValidation.violations);
      });
    },
    50: function () { var s=accepted(E.createReadyState(),'BEGIN',{seed:20260831}); var x=E.snapshot(s); T.equal(x.phase,'intro'); T.deepEqual(x.reading,{sceneId:'prologue',passageId:'prologue.01',index:0,total:3,canSkip:false}); },
    51: function () { readingContract(); var s=encounterFixture(); s.phase='encounter_intro'; s.reading={sceneId:'encounter.A1',passageIds:N.scenes['encounter.A1'].passageIds.slice(),index:0}; s=accepted(s,'ADVANCE_TEXT'); T.equal(s.phase,'encounter_choice'); T.equal(s.pendingOutcome,null); },
    52: function () { var s=accepted(E.createReadyState(),'BEGIN',{seed:1}), before=JSON.stringify(s); E.derivePlayerView(s); E.snapshot(s); T.equal(JSON.stringify(s),before); T.falsy(E.snapshot(s).reading.canSkip); },
    53: function () { var s=accepted(E.createReadyState(),'BEGIN',{seed:1}), before=JSON.stringify(s); var r=act(s,'SKIP_SEEN_TEXT'); errorCode(r,'text_not_seen'); T.deepEqual(r.error.context,{passageId:'prologue.01'}); T.equal(JSON.stringify(r.state),before); },
    54: function () { var s=accepted(E.createReadyState(),'BEGIN',{seed:1}); s=copy(s); s.seenPassageIds=['prologue.01','prologue.02']; s=accepted(s,'SKIP_SEEN_TEXT'); T.equal(s.reading.index,2); },
    55: function () { var s=encounterFixture(); s.phase='encounter_intro'; s.reading={sceneId:'encounter.A1',passageIds:N.scenes['encounter.A1'].passageIds.slice(),index:0}; s.seenPassageIds=s.reading.passageIds.slice(); s=accepted(s,'SKIP_SEEN_TEXT'); T.equal(s.phase,'encounter_choice'); T.equal(s.pendingOutcome,null); },
    56: function () { [-1,3].forEach(function(index){var s=accepted(E.createReadyState(),'BEGIN',{seed:1}); s=copy(s); s.reading.index=index; var v=E.validateState(s); T.equal(firstCode(v),'invalid_reading_cursor');}); },
    57: function () { var s=encounterFixture(['H1','H2','H3'],'approach_result',2); s.pendingOutcome={encounterId:'A2',approachId:'A2-1',competencyId:'dexterity',success:true}; s.reading={sceneId:'result.A2-1.success',passageIds:N.scenes['result.A2-1.success'].passageIds.slice(),index:0}; var validation=E.validateState(s); T.truthy(validation.ok,JSON.stringify(validation)); var old=s.sequence; s=accepted(s,'ADVANCE_TEXT'); T.equal(s.progress.physical,2); T.equal(s.position,3); errorCode(E.dispatch(s,{type:'ADVANCE_TEXT',expectedSequence:old}),'stale_action'); },
    58: function () { var s=encounterFixture(['H2','H3','H4'],'encounter_choice'); s=accepted(s,'CHOOSE_APPROACH',{approachId:'A1-1'}); s=finishResult(s); T.equal(s.phase,'sacrifice_choice'); T.deepEqual(s.deadHeroIds,[]); T.equal(E.derivePlayerView(s).victims.length,3); },
    59: function () { var s=failureFixture(['H2','H3','H4']); s=accepted(s,'SELECT_VICTIM',{heroId:'H2'}); T.deepEqual(s.reading.passageIds,['farewell.H2','death.A1.context']); T.equal(E.resolvePassage(s.reading.passageIds[0]),D.heroes.H2.farewell); },
    60: function () {
      [['physical','supernatural'], ['supernatural','physical']].forEach(function (order) {
        order.forEach(function (route, index) {
          var state = encounterFixture(['H1','H2','H3'], 'encounter_choice', 5, route);
          if (index) {
            state.completedDungeonIds = [order[0]]; state.mapPieceIds = [order[0]];
            state.progress[order[0]] = 5;
            state.assignments[order[0]] = order[0] === 'physical' ? ['A1','A2','A3','A4','A5'] : ['B1','B2','B3','B4','B5'];
          }
          var id = state.assignments[route][4];
          var viable = E.deriveViability(state.partyIds,id).approaches.find(function (item) { return item.viable; });
          state = finishScene(accepted(state,'CHOOSE_APPROACH',{approachId:viable.id}));
          T.equal(state.phase,'dungeon_complete');
          T.equal(state.reading.sceneId,'lover.'+route+(index?'.second':'.first'));
          T.equal(state.reading.passageIds.includes('lover.'+route+'.second'), Boolean(index));
          T.falsy(state.reading.passageIds.includes('lover.'+order[1-index]+'.second'));
          state = finish(state); T.deepEqual(state.mapPieceIds,order.slice(0,index+1));
        });
      });
    },
    61: function () {
      var state = encounterFixture(['H1','H2','H3'], 'encounter_choice', 5);
      T.deepEqual(state.mapPieceIds,[]); T.deepEqual(state.completedDungeonIds,[]);
      var viable = E.deriveViability(state.partyIds,'A5').approaches.find(function (item) { return item.viable; });
      state = finishScene(accepted(state,'CHOOSE_APPROACH',{approachId:viable.id}));
      T.deepEqual(state.completedDungeonIds,['physical']); T.deepEqual(state.mapPieceIds,[]);
      T.equal(state.reading.sceneId,'lover.physical.first');
      state = finish(state); T.deepEqual(state.mapPieceIds,['physical']);
      var before = JSON.stringify(state); errorCode(act(state,'ADVANCE_TEXT'),'invalid_transition'); T.equal(JSON.stringify(state),before);
      var partial = encounterFixture(['H1','H2','H3'],'encounter_choice',2);
      viable = E.deriveViability(partial.partyIds,'A2').approaches.find(function (item) { return item.viable; });
      partial = finish(accepted(partial,'CHOOSE_APPROACH',{approachId:viable.id}));
      T.deepEqual(partial.mapPieceIds,[]); T.deepEqual(partial.completedDungeonIds,[]);
    },
    62: function () { T.truthy(N.scenes.prologue.passageIds.includes('irati.01')); T.deepEqual(N.scenes['irati.02'].passageIds,['irati.02.01']); T.truthy(N.scenes.council.passageIds.includes('irati.03')); },
    63: function () { var s=formationFixture(); s.completedDungeonIds=['physical']; s.progress.physical=5; s.mapPieceIds=['physical']; T.equal(E.deriveDestinations(s).final.status,'locked'); s.completedDungeonIds.push('supernatural'); s.progress.supernatural=5; s.mapPieceIds.push('supernatural'); T.equal(E.deriveDestinations(s).final.status,'available'); T.falsy(s.medallionComplete); },
    64: function () { [['physical'],['physical','physical'],['final']].forEach(function(pieces){var s=formationFixture(); s.mapPieceIds=pieces; T.includes(E.validateState(s).violations.map(function(x){return x.code;}),'invalid_reward_state');}); var c=terminalFixture([],[],'council'); c.seenPassageIds=[]; T.includes(E.validateState(c).violations.map(function(x){return x.context.reward;}),'medallion'); },
    65: function () { rewardContract(); T.deepEqual(N.scenes.council.passageIds.slice(0,4),['council.01','council.02','council.03','irati.03']); },
    66: function () {
      var state = encounterFixture(['H3', 'H1'], 'encounter_choice', 6, 'final');
      state.deadHeroIds = ['H2'];
      T.truthy(E.validateState(state).ok);
      T.deepEqual(state.climaxPartyIds, []);
      var viable = E.deriveViability(state.partyIds, state.assignments.final[5]).approaches.find(function (item) { return item.viable; });
      T.truthy(viable);
      state = accepted(state, 'CHOOSE_APPROACH', { approachId: viable.id });
      state = finishScene(state);
      T.equal(state.phase, 'council');
      T.deepEqual(state.partyIds, ['H3', 'H1']);
      T.deepEqual(state.climaxPartyIds, ['H1', 'H3']);
      T.deepEqual(state.reading.passageIds.filter(function (id) { return id.indexOf('opinion.') === 0; }), ['opinion.H1', 'opinion.H3']);
      T.falsy(state.deadHeroIds.includes('H4'));
      T.truthy(E.validateState(state).ok);
    },
    67: function () { var s=terminalFixture([],[],'council'); s.reading={sceneId:'council',passageIds:N.scenes.council.passageIds.slice(0,4).concat(['council.solo','council.confession','council.andira']),index:0}; s=finishResult(s); T.equal(s.phase,'final_choice'); T.equal(E.derivePlayerView(s).endingChoices.length,2); T.deepEqual(E.snapshot(s).epilogueHeroes,[]); },
    68: function () { var s=terminalFixture(['H1'],['H2'],'final_choice'); [['H2'],['H1','H1'],['H4']].forEach(function(ids){var f=copy(s);f.climaxPartyIds=ids;T.includes(E.validateState(f).violations.map(function(x){return x.code;}),'invalid_climax_party');}); },
    69: function () { var s=terminalFixture(['H1','H5','H7'],[],'final_choice'); var v=E.derivePlayerView(s); T.deepEqual(v.endingChoices.map(function(x){return x.id;}),['reunite','destroy']); T.equal(s.endingId,null); },
    70: function () { ['reunite','destroy'].forEach(function(ending){var s=terminalFixture(['H1'],[],'final_choice');s=accepted(s,'CHOOSE_ENDING',{ending:ending});T.equal(s.endingId,ending);T.equal(s.reading.sceneId,'ending.'+ending);}); },
    71: function () { var s=terminalFixture(['H1'],[],'final_choice'); var r=act(s,'CHOOSE_ENDING',{ending:'third'}); errorCode(r,'invalid_ending'); T.deepEqual(r.error.context,{ending:'third'}); s=validTerminalPhase('council'); errorCode(act(s,'CHOOSE_ENDING',{ending:'reunite'}),'invalid_transition'); },
    72: function () { var s=terminalFixture(['H1'],[],'final_choice'), old=s.sequence; s=accepted(s,'CHOOSE_ENDING',{ending:'reunite'}); errorCode(act(s,'CHOOSE_ENDING',{ending:'destroy'}),'invalid_transition'); errorCode(E.dispatch(s,{type:'CHOOSE_ENDING',ending:'destroy',expectedSequence:old}),'stale_action'); T.equal(s.endingId,'reunite'); },
    73: function () { var s=formationFixture(); s.endingId='bad'; T.includes(E.validateState(s).violations.map(function(x){return x.code;}),'invalid_ending_state'); s=formationFixture(); s.endingId='reunite'; T.includes(E.validateState(s).violations.map(function(x){return x.code;}),'invalid_ending_state'); },
    74: function () { var s=terminalFixture(['H1','H3'],['H2','H5'],'ending'); s.endingId='destroy'; s.reading={sceneId:'ending.destroy',passageIds:N.scenes['ending.destroy'].passageIds.slice(),index:0}; s=finishScene(s); T.deepEqual(s.reading.passageIds,['memorial.intro','memorial.H2','memorial.H5']); },
    75: function () { var s=terminalFixture(['H1'],[],'ending'); s.endingId='reunite'; s.reading={sceneId:'ending.reunite',passageIds:N.scenes['ending.reunite'].passageIds.slice(),index:0}; s=finishScene(s); T.equal(s.phase,'epilogue'); },
    76: function () { var s=terminalFixture([],D.heroOrder,'ending'); s.endingId='bad'; s.medallionComplete=false; s.seenPassageIds=[]; s.reading={sceneId:'ending.bad',passageIds:N.scenes['ending.bad'].passageIds.slice(),index:0}; s=finishScene(s); T.equal(s.phase,'memorial'); T.equal(s.reading.passageIds.length,9); s=finishScene(s); T.equal(s.phase,'campaign_complete'); },
    77: function () { ['reunite','destroy'].forEach(function(ending){var s=terminalFixture(['H1','H3'],['H2'],'ending');s.endingId=ending;s.reading={sceneId:'ending.'+ending,passageIds:N.scenes['ending.'+ending].passageIds.slice(),index:0};s=finishScene(s);s=finishScene(s);T.equal(s.reading.sceneId,'epilogue.H1');s=finishScene(s);T.equal(s.reading.sceneId,'epilogue.H3');}); },
    78: function () {
      [{party:['H1'],dead:[],ending:'reunite'}, {party:[],dead:['H2'],ending:'destroy'}, {party:[],dead:D.heroOrder,ending:'bad'}].forEach(function (vector) {
        var state = terminalFixture(vector.party,vector.dead,'ending'); state.endingId = vector.ending;
        if (vector.ending === 'bad') { state.medallionComplete=false; state.seenPassageIds=[]; }
        state.reading={sceneId:'ending.'+vector.ending,passageIds:N.scenes['ending.'+vector.ending].passageIds.slice(),index:0};
        state = finish(state);
        T.equal(state.phase,'campaign_complete'); T.equal(state.reading,null); T.equal(state.endingId,vector.ending);
        T.deepEqual(state.deadHeroIds,vector.dead); T.equal(state.seed,2);
      });
    },
    79: function () { endingContract(); },
    80: function () { ['sacrifice_choice','council','ending'].forEach(function(phase){var s=phase==='sacrifice_choice'?failureFixture(['H1']):validTerminalPhase(phase);errorCode(act(s,'NEW_CAMPAIGN'),'invalid_transition');}); },
    81: function () {
      function returnState(dead,presented) {
        var state = encounterFixture([], 'automatic_retreat'); state.deadHeroIds=dead; state.presentedDeathIds=presented;
        state.progress.physical=1;
        state.reading={sceneId:'automatic_retreat',passageIds:N.scenes.automatic_retreat.passageIds.slice(),index:0};
        return act(state,'ADVANCE_TEXT');
      }
      var first = returnState(['H1','H2'],[]); T.truthy(first.ok);
      T.deepEqual(first.effects,[{type:'tavern_absence',heroIds:['H1','H2']}]); T.deepEqual(first.state.presentedDeathIds,['H1','H2']);
      var later = returnState(['H1','H2'],first.state.presentedDeathIds); T.truthy(later.ok); T.deepEqual(later.effects,[]);
      var fresh = returnState(['H1','H2','H3'],later.state.presentedDeathIds); T.truthy(fresh.ok);
      T.deepEqual(fresh.effects,[{type:'tavern_absence',heroIds:['H3']}]); T.deepEqual(fresh.state.presentedDeathIds,['H1','H2','H3']);
    },
    82: function () { var s=failureFixture(['H8']); s.deadHeroIds=D.heroOrder.slice(0,7); s=accepted(s,'SELECT_VICTIM',{heroId:'H8'}); s=finishScene(s); T.equal(s.phase,'ending'); T.deepEqual(s.presentedDeathIds,[]); },
    83: function () { observationContract(); },
    84: function () { [0,4294967295].forEach(function(x){T.truthy(E.normalizeSeed(x).ok);});[-1,4294967296,1.5,NaN,'1'].forEach(function(x){var r=E.normalizeSeed(x);T.falsy(r.ok);T.equal(r.error.code,'invalid_seed');}); },
    85: function () { observationContract(); var s=accepted(E.createReadyState(),'BEGIN',{seed:20260831}); T.equal(E.snapshot(s).reading.passageId,'prologue.01'); },
    86: function () { observationContract(); },
    87: function () {
      var intro = encounterFixture(['H1','H2','H3'],'encounter_intro');
      intro.reading={sceneId:'encounter.A1',passageIds:N.scenes['encounter.A1'].passageIds.slice(),index:0};
      var town=formationFixture(['H1']); town.presentedDeathIds=['H1'];
      [intro,failureFixture(['H2','H3','H4']),town].forEach(function(state) {
        var before=JSON.stringify(state); T.truthy(E.validateState(state).ok);
        for(var i=0;i<5;i++) E.validateState(state);
        T.equal(JSON.stringify(state),before);
      });
    },
    88: function () { T.throws(function () { global.ExpeditionApp.createController(null); }, 'ExpeditionApp.createController exige um elemento raiz.'); },
    90: function () {
      var manifest = global.ExpeditionCaseManifest.slice();
      T.truthy(T.auditRegistrations(manifest, manifest).ok);
      var missing = T.auditRegistrations(manifest, manifest.slice(1));
      T.falsy(missing.ok); T.includes(missing.errors[0], 'Caso obrigatório não registrado:');
      var duplicateManifest = T.auditRegistrations(manifest.concat([manifest[0]]), manifest);
      T.falsy(duplicateManifest.ok); T.includes(duplicateManifest.errors[0], 'O manifesto contém ID duplicado:');
      var duplicateRegistration = T.auditRegistrations(manifest, manifest.concat([manifest[0] + ' — duplicado']));
      T.falsy(duplicateRegistration.ok); T.includes(duplicateRegistration.errors[0], 'ID de teste duplicado:');
      var unexpected = T.auditRegistrations(manifest, manifest.concat(['V2/IT-999 — inesperado']));
      T.falsy(unexpected.ok); T.includes(unexpected.errors[0], 'Caso inesperado registrado:');
    },
    91: function () { ['council','final_choice','ending','memorial','epilogue','campaign_complete'].forEach(function(phase){var s=validTerminalPhase(phase); ['TOGGLE_HERO','SELECT_DESTINATION','DEPART','CONFIRM_RETREAT'].forEach(function(type){errorCode(act(s,type,type==='TOGGLE_HERO'?{heroId:'H1'}:type==='SELECT_DESTINATION'?{dungeonId:'physical'}:{}),'invalid_transition');});}); }
  };

  Object.keys(contracts).map(Number).sort(function(a,b){return a-b;}).forEach(function (number) {
    var id = 'V2/UT-' + String(number).padStart(3, '0');
    T.test(id + ' — contrato específico da campanha V3', contracts[number]);
  });
})(window);
