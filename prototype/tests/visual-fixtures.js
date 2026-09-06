(function (global) {
  'use strict';

  var E = global.ExpeditionEngine;
  var N = global.ExpeditionNarrative;
  var HEROES = global.ExpeditionData.heroOrder;

  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function sceneReading(sceneId, passageIds, index) {
    return { sceneId: sceneId, passageIds: (passageIds || N.scenes[sceneId].passageIds).slice(), index: index || 0 };
  }
  function base() {
    var state = clone(E.createReadyState());
    state.seed = 20260831;
    state.rngState = 20260831;
    return state;
  }
  function formation(dead, draft) {
    var state = base();
    state.phase = 'formation';
    state.deadHeroIds = (dead || []).slice();
    state.presentedDeathIds = state.deadHeroIds.slice();
    state.draftPartyIds = (draft || []).slice();
    return state;
  }
  function expedition(party, position, dungeon, encounterId) {
    var state = base();
    state.phase = 'encounter_intro';
    state.dungeonId = dungeon || 'physical';
    state.position = position || 1;
    state.partyIds = (party || ['H1', 'H2', 'H3']).slice();
    state.draftPartyIds = state.partyIds.slice();
    var selectedEncounter = encounterId || 'A1';
    var pool = global.ExpeditionData.encounterOrder.filter(function (id) {
      return state.dungeonId === 'physical' ? id.charAt(0) === 'A' : (state.dungeonId === 'supernatural' ? id.charAt(0) === 'B' : true);
    }).filter(function (id) { return id !== selectedEncounter; });
    for (var i = 0; i < state.position - 1; i += 1) state.assignments[state.dungeonId][i] = pool[i];
    state.assignments[state.dungeonId][state.position - 1] = selectedEncounter;
    state.progress[state.dungeonId] = state.position - 1;
    state.reading = sceneReading('encounter.' + (encounterId || 'A1'));
    return state;
  }
  function terminalBase(party, dead) {
    var state = base();
    state.partyIds = (party || ['H1', 'H3']).slice();
    state.draftPartyIds = state.partyIds.slice();
    state.deadHeroIds = (dead || []).slice();
    state.completedDungeonIds = ['physical', 'supernatural', 'final'];
    state.progress = { physical: 5, supernatural: 5, final: 6 };
    state.dungeonId = 'final'; state.position = 6;
    state.assignments = {physical:['A1','A2','A3','A4','A5'],supernatural:['B1','B2','B3','B4','B5'],final:['A6','A7','A8','B6','B7','B8']};
    state.mapPieceIds = ['physical', 'supernatural'];
    state.medallionComplete = true;
    state.seenPassageIds = ['council.01'];
    state.climaxPartyIds = state.partyIds.slice().sort();
    return state;
  }
  function setReadingState(state, phase, sceneId, passageIds, index) {
    state.phase = phase;
    state.reading = sceneReading(sceneId, passageIds, index);
    return state;
  }
  function fixture(name) {
    var state;
    if (name.indexOf('S01-') === 0) return base();
    if (name.indexOf('S03-') === 0) {
      var selectedMatch = name.match(/^S03-inspect-(h\d)-selected$/);
      var availableMatch = name.match(/^S03-inspect-(h\d)-available$/);
      if (selectedMatch) return formation([], [selectedMatch[1].toUpperCase()]);
      if (availableMatch) return formation([], []);
      if (name === 'S03-manual-one') return formation([], ['H1']);
      if (name === 'S03-manual-two') return formation([], ['H1', 'H2']);
      if (name === 'S03-manual-three' || name === 'S03-selected-and-focused' || name === 'S03-long-sheet-speech') return formation([], ['H1', 'H2', 'H3']);
      if (name === 'S03-automatic-three') return formation(HEROES.slice(0, 5), ['H6', 'H7', 'H8']);
      if (name === 'S03-automatic-two') return formation(HEROES.slice(0, 6), ['H7', 'H8']);
      if (name === 'S03-automatic-one') return formation(HEROES.slice(0, 7), ['H8']);
      if (/first-return|during-fade/.test(name)) {
        var multipleAbsences = name.indexOf('many') >= 0 || name === 'S03-preparing-during-fade' || name === 'S03-destination-open-during-fade';
        state = formation(multipleAbsences ? ['H1', 'H2'] : ['H1'], []);
        state.phase = 'automatic_retreat'; state.dungeonId = 'physical'; state.position = 1;
        state.assignments.physical[0] = 'A1'; state.progress.physical = 1;
        state.presentedDeathIds = [];
        state.reading = sceneReading('automatic_retreat', null, N.scenes.automatic_retreat.passageIds.length - 1);
        return state;
      }
      if (/empty|later-return|reduced-motion/.test(name)) return formation(['H1', 'H2'], []);
      return formation([], []);
    }
    if (name.indexOf('S04-') === 0) {
      state = formation([], ['H1', 'H2', 'H3']);
      if (name === 'S04-dismissed-preserved') state.selectedDungeonId = 'physical';
      if (name === 'S04-completed-church' || name === 'S04-one-available') {
        state.completedDungeonIds = ['physical']; state.progress.physical = 5; state.mapPieceIds = ['physical'];
        state.assignments.physical = ['A1','A2','A3','A4','A5'];
        state.selectedDungeonId = 'supernatural';
      }
      if (name === 'S04-unlocked-final' || name === 'S04-selected-route') {
        state.completedDungeonIds = ['physical','supernatural']; state.progress.physical = 5; state.progress.supernatural = 5;
        state.mapPieceIds = ['physical','supernatural']; state.assignments.physical = ['A1','A2','A3','A4','A5']; state.assignments.supernatural = ['B1','B2','B3','B4','B5'];
        state.selectedDungeonId = 'final';
      }
      return state;
    }
    if (name.indexOf('S11-') === 0) {
      if (name === 'S11-mixed-living-dead') return formation(['H2','H5','H7'], ['H1','H3','H4']);
      if (name === 'S11-reduced-roster') return formation(HEROES.slice(0, 5), ['H6','H7','H8']);
      return formation([], []);
    }
    if (name.indexOf('S02-') === 0) {
      if (name === 'S02-last-before-choice') {
        state = expedition(['H1', 'H2', 'H3'], 1, 'physical', 'A1');
        state.reading.index = state.reading.passageIds.length - 1;
        return state;
      }
      state = base(); state.phase = 'intro';
      state.reading = sceneReading('prologue', null, name === 'S02-ivai-speaking' || name === 'S02-missing-portrait' ? 1 : 0);
      if (name === 'S02-seen-passage') state.seenPassageIds = [state.reading.passageIds[state.reading.index]];
      return state;
    }
    if (name.indexOf('S05-') === 0) {
      var count = name.indexOf('party-one') >= 0 ? 1 : (name.indexOf('party-two') >= 0 ? 2 : 3);
      var encounterId = name.indexOf('long-approach') >= 0 ? 'A2' : 'A1';
      state = expedition(HEROES.slice(0, count), name.indexOf('last-route-position') >= 0 ? 5 : 1, 'physical', encounterId);
      if (name.indexOf('threshold') >= 0) return setReadingState(state, 'dungeon_intro', 'threshold.physical');
      if (name.indexOf('three-approaches') >= 0 || name.indexOf('long-approach') >= 0 ||
          name.indexOf('missing-encounter-image') >= 0 || name.indexOf('last-route-position') >= 0) {
        state.phase = 'encounter_choice'; state.reading = null;
      }
      if (name.indexOf('success') >= 0 || name.indexOf('lethal-failure') >= 0) {
        var success = name.indexOf('success') >= 0;
        if (!success) {
          state.partyIds = ['H2', 'H3', 'H4'];
          state.draftPartyIds = state.partyIds.slice();
        }
        state.phase = 'approach_result';
        state.pendingOutcome = { encounterId: 'A1', approachId: 'A1-1', competencyId: 'strength', success: success };
        state.reading = sceneReading('result.A1-1.' + (success ? 'success' : 'failure'));
      }
      return state;
    }
    if (name.indexOf('S06-') === 0) {
      var victimCount = name.indexOf('one-victim') >= 0 ? 1 : (name.indexOf('two-victims') >= 0 ? 2 : 3);
      var victimParties = { 1: ['H1'], 2: ['H1', 'H2'], 3: ['H1', 'H2', 'H4'] };
      var victimApproaches = { 1: ['A1-2', 'dexterity'], 2: ['A1-3', 'perception'], 3: ['A1-3', 'perception'] };
      state = expedition(victimParties[victimCount], 2, 'physical', 'A1');
      state.pendingOutcome = { encounterId: 'A1', approachId: victimApproaches[victimCount][0], competencyId: victimApproaches[victimCount][1], success: false };
      if (name.indexOf('farewell') >= 0 || name.indexOf('death-context') >= 0) {
        state.deadHeroIds = ['H2']; state.partyIds = state.partyIds.filter(function (id) { return id !== 'H2'; });state.draftPartyIds=state.partyIds.slice();state.pendingOutcome.victimId='H2';
        return setReadingState(state, 'death_result', 'death.A1', ['farewell.H2', 'death.A1.context'], name.indexOf('death-context') >= 0 ? 1 : 0);
      }
      if (name.indexOf('total-roster-loss') >= 0) {
        state = terminalBase([], HEROES); state.endingId = 'bad';
        return setReadingState(state, 'ending', 'ending.bad');
      }
      if(name.indexOf('party-empty')>=0){state.partyIds=[];state.draftPartyIds=[];}
      state.phase = 'sacrifice_choice'; state.reading = null;
      return state;
    }
    if (name.indexOf('S07-') === 0) {
      state = expedition(['H1', 'H2', 'H3'], name.indexOf('last-position')>=0?5:2, 'physical', 'A1');
      if(name.indexOf('ineligible')>=0){state.partyIds=['H1','H2'];state.draftPartyIds=state.partyIds.slice();}
      if (name.indexOf('confirmation') >= 0) {
        state.retreatReturn = { phase: state.phase, reading: clone(state.reading) };
        state.phase = 'retreat_confirmation'; state.reading = null;
      } else if (name.indexOf('automatic') >= 0) {
        state.partyIds = [];
        state.deadHeroIds = name.indexOf('one-reserve') >= 0 ? HEROES.slice(0, 7) : (name.indexOf('two-reserves') >= 0 ? HEROES.slice(0, 6) : HEROES.slice(0, 4));
        state.draftPartyIds = [];
        setReadingState(state, 'automatic_retreat', 'automatic_retreat');
      } else if (name.indexOf('committed') >= 0) {
        state.partyIds = ['H1', 'H3', 'H4']; state.draftPartyIds = state.partyIds.slice();
        state.phase = 'approach_result'; state.pendingOutcome = { encounterId: 'A1', approachId: 'A1-2', competencyId: 'dexterity', success: false };
        state.reading = sceneReading('result.A1-2.failure');
      }
      return state;
    }
    if (name.indexOf('S08-') === 0) {
      state = base(); state.phase = 'dungeon_complete'; state.partyIds = ['H1']; state.draftPartyIds = ['H1']; state.position = 5;
      var physical = name.indexOf('perola') >= 0;
      state.dungeonId = physical ? 'physical' : 'supernatural';
      state.progress[state.dungeonId] = 5; state.completedDungeonIds = [state.dungeonId];
      state.assignments[state.dungeonId] = physical ? ['A1','A2','A3','A4','A5'] : ['B1','B2','B3','B4','B5'];
      var second = name.indexOf('second') >= 0;
      if (second) {
        var first = physical ? 'supernatural' : 'physical';
        state.completedDungeonIds = [first, state.dungeonId]; state.progress[first] = 5; state.mapPieceIds = [first];
        state.assignments[first] = first === 'physical' ? ['A1','A2','A3','A4','A5'] : ['B1','B2','B3','B4','B5'];
      }
      var loverScene = 'lover.' + state.dungeonId + '.' + (second ? 'second' : 'first');
      state.reading = sceneReading(loverScene);
      if(name.indexOf('missing-lover-portrait')>=0)state.reading.index=1;
      if (name.indexOf('one-map-piece') >= 0) { state.mapPieceIds = [state.dungeonId]; state.reading = sceneReading('irati.02'); }
      if (name.indexOf('two-pieces') >= 0) { state.completedDungeonIds = ['physical', 'supernatural']; state.progress.physical = 5; state.progress.supernatural = 5; state.assignments.physical=['A1','A2','A3','A4','A5']; state.assignments.supernatural=['B1','B2','B3','B4','B5']; state.mapPieceIds = ['physical', 'supernatural']; state.reading = sceneReading('map.reveal'); }
      if (name.indexOf('total-loss') >= 0) { state = terminalBase([], HEROES); state.endingId = 'bad'; setReadingState(state, 'ending', 'ending.bad'); }
      return state;
    }
    if (name.indexOf('S09-') === 0) {
      var councilCount = name.indexOf('party-one') >= 0 ? 1 : (name.indexOf('party-two') >= 0 ? 2 : 3);
      state = terminalBase(name.indexOf('ivai-alone') >= 0 ? [] : HEROES.slice(0, councilCount), []);
      if (name.indexOf('final-choice') >= 0) { state.phase = 'final_choice'; state.reading = null; }
      else if (name.indexOf('reunite-committed') >= 0 || name.indexOf('destroy-committed') >= 0) {
        state.endingId = name.indexOf('reunite') >= 0 ? 'reunite' : 'destroy';
        setReadingState(state, 'ending', 'ending.' + state.endingId);
      } else {
        var councilPlan = N.scenes.council.passageIds.slice(0, 4).concat([state.partyIds.length ? 'council.challenge' : 'council.solo', 'council.confession', 'council.andira']);
        state.climaxPartyIds.forEach(function (id) { councilPlan.push('opinion.' + id); });
        setReadingState(state, 'council', 'council', councilPlan, name.indexOf('opinion') >= 0 ? councilPlan.length - 1 : (name.indexOf('missing-art')>=0?councilPlan.indexOf('council.andira'):0));
      }
      return state;
    }
    if (name.indexOf('S10-') === 0) {
      var dead = name.indexOf('memorial-eight') >= 0 || name.indexOf('bad') >= 0 ? HEROES.slice() : (name.indexOf('memorial-multiple') >= 0 ? ['H2', 'H5'] : (name.indexOf('memorial-one') >= 0 ? ['H2'] : []));
      state = terminalBase(['H1', 'H3'], dead);
      if(dead.length===8){state.partyIds=[];state.draftPartyIds=[];state.climaxPartyIds=[];}
      if (name.indexOf('campaign-complete') >= 0 || name.indexOf('no-eligible') >= 0) { state.phase = 'campaign_complete'; state.reading = null; state.endingId = 'destroy'; if (name.indexOf('no-eligible') >= 0) { state.partyIds=[]; state.climaxPartyIds=[]; } }
      else if (name.indexOf('memorial') >= 0) { state.endingId = dead.length === 8 ? 'bad' : 'destroy'; setReadingState(state, 'memorial', 'memorial', ['memorial.intro'].concat(dead.map(function (id) { return 'memorial.' + id; }))); }
      else if (name.indexOf('epilogue') >= 0 || name.indexOf('no-deaths') >= 0) {
        var n = name.indexOf('three') >= 0 ? 3 : (name.indexOf('two') >= 0 ? 2 : 1); state.partyIds = HEROES.slice(0, n); state.climaxPartyIds = state.partyIds.slice(); state.endingId = 'destroy';
        setReadingState(state, 'epilogue', 'epilogue.' + state.partyIds[0]);
      } else { state.endingId = name.indexOf('reunite') >= 0 ? 'reunite' : (name.indexOf('bad') >= 0 ? 'bad' : 'destroy'); setReadingState(state, 'ending', 'ending.' + state.endingId); }
      return state;
    }
    if (name.indexOf('S12-invalid-campaign') === 0) { state = base(); state.phase = 'invalid'; state.invariantViolations = [{ code: 'invalid_party', message: 'A formação atual é inválida.', context: { heroId: 'H1' } }]; return state; }
    if (name.indexOf('S12-missing-narrative-image') === 0) return expedition(['H1','H2','H3'],1,'physical','A1');
    return formation([], []);
  }

  function boot() {
    var name = new URLSearchParams(global.location.search).get('state') || 'S01-fresh-notices';
    var root = document.getElementById('visual-fixture');
    var controller = global.ExpeditionApp.createController(root, fixture(name));
    global.__visualFixtureInspect = function () { return controller.getState(); };
    root.dataset.fixtureState = name;
    if (/^S03-(first-return|preparing-during-fade|destination-open-during-fade)/.test(name)) {
      controller.dispatch({ type: 'ADVANCE_TEXT' });
      if (name === 'S03-destination-open-during-fade') root.querySelector('[data-action="OPEN_DESTINATIONS"]').click();
      if (name === 'S03-preparing-during-fade') root.querySelector('[data-value="H3"]').click();
      var pauseAt = name.indexOf('midpoint') >= 0 || name.indexOf('during-fade') >= 0 ? -500 : 0;
      Array.prototype.forEach.call(root.querySelectorAll('.is-fading'), function (card) {
        card.style.animationDelay = pauseAt + 'ms'; card.style.animationPlayState = 'paused';
      });
    } else if (name.indexOf('S12-fourth-selection-error') === 0) {
      ['H1', 'H2', 'H3', 'H4'].forEach(function (heroId) { controller.dispatch({ type: 'TOGGLE_HERO', heroId: heroId }); });
    } else if (name.indexOf('S12-unavailable-destination-error') === 0) {
      controller.dispatch({ type: 'SELECT_DESTINATION', dungeonId: 'final' });
    } else if (name.indexOf('S12-rejected-stale-action') === 0) {
      controller.dispatch({ type: 'TOGGLE_HERO', heroId: 'H1', expectedSequence: -1 });
    }
    if(typeof root.querySelector==='function'){
    var missingSelector={
      'S02-missing-portrait':'.speaker-portrait img','S05-missing-encounter-image':'.encounter-art img',
      'S08-missing-lover-portrait':'.speaker-portrait img','S08-missing-background':'.scene-background img',
      'S09-missing-art':'.speaker-portrait img','S12-missing-narrative-image':'.encounter-art img'
    }[name];
    if(missingSelector){var missing=root.querySelector(missingSelector);if(missing)missing.src='assets/missing-fixture-image.png';}
    if(name==='S01-missing-entry-art'){var fallback=document.createElement('p');fallback.className='image-fallback';fallback.textContent='Ilustração de entrada — imagem indisponível';root.querySelector('.entry-screen').prepend(fallback);}
    if(name==='S01-long-notices'){root.querySelector('.content-notices p').textContent+=' Este aviso estendido confirma a recomposição em múltiplas linhas sem ocultar a ação principal.';}
    if(name==='S02-long-passage'){root.querySelector('.passage-text').textContent+=' '+new Array(8).fill('A lembrança atravessa a margem enquanto a expedição avalia o preço da escolha.').join(' ');}
    if(name==='S12-long-error'){var error=document.createElement('p');error.className='action-feedback';error.setAttribute('role','alert');error.textContent='Esta ação não pode ser concluída porque o estado atual preserva a campanha e exige uma escolha válida antes de continuar. Revise os controles disponíveis e tente novamente.';root.querySelector('.game-shell').appendChild(error);}
    var inspectMatch = name.match(/^S03-inspect-(h\d)-(?:available|selected)$/);
    var deferredFocus = inspectMatch ? inspectMatch[1].toUpperCase() : (name === 'S03-selected-and-focused' || name === 'S03-long-sheet-speech' ? 'H1' : null);
    if (name === 'S03-missing-portrait' || name === 'S12-missing-hero-portrait') { var heroImage=root.querySelector('.hero-portrait img'); if(heroImage)heroImage.src='assets/missing-fixture-image.png'; }
    if (name.indexOf('S04-') === 0 || name === 'S12-missing-destination-preview') {
      root.querySelector('[data-action="OPEN_DESTINATIONS"]').click();
      if (name === 'S04-dismissed-preserved') root.querySelector('[data-action="CLOSE_PANEL"]').click();
      if (name === 'S04-missing-preview' || name === 'S12-missing-destination-preview') { var preview=root.querySelector('.destination-preview img'); if(preview)preview.src='assets/missing-fixture-image.png'; }
    }
    if (name.indexOf('S11-') === 0) {
      root.querySelector('[data-action="OPEN_ROSTER"]').click();
      if (name === 'S11-long-summary') { var roster=root.querySelector('.roster-list li span:last-child'); if(roster)roster.textContent += ' com uma descrição pública extensa para testar a leitura sem rolagem horizontal.'; }
    }
    }
    if (deferredFocus) {
      global.setTimeout(function () {
        var target = root.querySelector('[data-value="'+deferredFocus+'"]');
        if (target) target.focus();
        global.setTimeout(function () {
          if (name === 'S03-long-sheet-speech') {
            var summary = root.querySelector('.hero-card.is-inspected .hero-summary');
            var speech = root.querySelector('.hero-card.is-inspected .hero-speech');
            if (summary) summary.textContent += ' ' + new Array(5).fill('Ele registra cada sinal do caminho e explica sua experiência sem revelar uma competência interna.').join(' ');
            if (speech) speech.textContent += ' ' + new Array(3).fill('A margem guarda mais histórias do que parece.').join(' ');
          }
          global.__visualFixtureReady = true;
        }, 0);
      }, 0);
    } else global.__visualFixtureReady = true;
  }

  global.addEventListener('DOMContentLoaded', boot, { once: true });
})(window);
