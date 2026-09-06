(function (global) {
  'use strict';
  var App = global.ExpeditionApp;
  var Engine = global.ExpeditionEngine;
  var clock = 1000;
  function create(seed) {
    var root = document.createElement('div');
    root.className = 'test-host';
    root.style.cssText = 'position:fixed;inset-inline-start:-10000px;top:0;width:1280px;height:720px;overflow:auto';
    document.body.appendChild(root);
    var controller = App.createController(root);
    if (seed !== undefined && !global.expeditionQA.setSeed(seed).ok) throw new Error('Semente inválida: ' + seed + '.');
    return { root: root, controller: controller, close: function () { controller.destroy(); root.remove(); } };
  }
  function selector(action) {
    var value = action.heroId || action.dungeonId || action.approachId || action.ending;
    return 'button[data-action="' + action.type + '"]' + (value === undefined ? '' : '[data-value="' + value + '"]');
  }
  function activate(session, action) {
    if (action.type === 'SELECT_DESTINATION' && !session.root.querySelector(selector(action))) activate(session, { type: 'OPEN_DESTINATIONS' });
    var node = session.root.querySelector(selector(action));
    if (!node) throw new Error('Controle ausente para ' + JSON.stringify(action) + ' em ' + session.controller.getState().phase + '.');
    var before = session.controller.getState().sequence;
    clock += 500;
    var event = new MouseEvent('click', { bubbles: true, cancelable: true, view: global });
    try { Object.defineProperty(event, 'timeStamp', { value: clock }); } catch (_error) {}
    node.dispatchEvent(event);
    var expectedSequence = action.type === 'NEW_CAMPAIGN' ? 0 : before + 1;
    if (['OPEN_DESTINATIONS', 'OPEN_ROSTER', 'CLOSE_PANEL'].indexOf(action.type) < 0 && session.controller.getState().sequence !== expectedSequence) {
      throw new Error(action.type + ' não produziu uma transição pública (' + before + ' → ' + session.controller.getState().sequence + ').');
    }
    return node;
  }
  function replay(session, recipe, observe) {
    recipe.actions.forEach(function (record, index) {
      if (observe) observe({ when: 'before', index: index, action: record, state: session.controller.getState(), root: session.root });
      activate(session, record);
      if (observe) observe({ when: 'after', index: index, action: record, state: session.controller.getState(), root: session.root });
    });
    return session.controller.getState();
  }
  function readAll(session, visited) {
    var guard = 500;
    while (session.controller.getState().reading && guard > 0) {
      var state = session.controller.getState();
      if (visited) visited.push(observe(session, state));
      activate(session, { type: 'ADVANCE_TEXT' }); guard -= 1;
    }
    if (!guard) throw new Error('Leitura não terminou dentro do limite.');
  }
  function imageSource(root, selector) {
    var node = root.querySelector(selector + ' img');
    return node ? node.getAttribute('src') : null;
  }
  function observe(session, state) {
    var view = Engine.derivePlayerView(state);
    var stage = session.root.querySelector('.narrative-stage');
    var portrait = session.root.querySelector('.speaker-portrait');
    var stageRect = stage && stage.getBoundingClientRect();
    var portraitRect = portrait && portrait.getBoundingClientRect();
    return {
      phase: state.phase,
      sceneId: state.reading ? state.reading.sceneId : (view.currentEncounter ? 'encounter.' + view.currentEncounter.id : null),
      passageId: state.reading && state.reading.passageIds[state.reading.index],
      text: session.root.textContent,
      passageText: (session.root.querySelector('.passage-text') || session.root.querySelector('.encounter-copy') || {}).textContent || null,
      backgroundSrc: imageSource(session.root, '.scene-background'),
      portraitSrc: imageSource(session.root, '.speaker-portrait'),
      encounterSrc: imageSource(session.root, '.encounter-art'),
      reflection: !!session.root.querySelector('.reflection-portrait'),
      portraitContained: !stageRect || !portraitRect || (portraitRect.left >= stageRect.left - 1 && portraitRect.top >= stageRect.top - 1 && portraitRect.right <= stageRect.right + 1 && portraitRect.bottom <= stageRect.bottom + 1)
    };
  }
  function selectParty(session, heroIds) {
    session.controller.getState().draftPartyIds.slice().forEach(function (id) { if (heroIds.indexOf(id) < 0) activate(session, { type: 'TOGGLE_HERO', heroId: id }); });
    heroIds.forEach(function (id) { if (session.controller.getState().draftPartyIds.indexOf(id) < 0) activate(session, { type: 'TOGGLE_HERO', heroId: id }); });
  }
  function playRoute(session, dungeonId, visited) {
    if (session.controller.getState().phase !== 'formation') throw new Error('A rota deve começar na formação.');
    selectParty(session, ['H1', 'H2', 'H3'].filter(function (id) { return session.controller.getState().deadHeroIds.indexOf(id) < 0; }));
    if (session.controller.getState().selectedDestination !== dungeonId) activate(session, { type: 'SELECT_DESTINATION', dungeonId: dungeonId });
    activate(session, { type: 'DEPART' });
    var guard = 250;
    while (guard > 0) {
      var state = session.controller.getState();
      if (state.reading) { readAll(session, visited); guard -= 1; continue; }
      if (state.phase === 'dungeon_intro') { activate(session, { type: 'ENTER_DUNGEON' }); guard -= 1; continue; }
      if (state.phase === 'encounter_choice') {
        var encounterId = Engine.derivePlayerView(state).currentEncounter.id;
        if (visited) visited.push(observe(session, state));
        var viable = Engine.deriveViability(state.partyIds, encounterId).approaches.filter(function (item) { return item.viable; })[0];
        if (!viable) throw new Error('Receita sem mortes sem abordagem viável em ' + encounterId + '.');
        activate(session, { type: 'CHOOSE_APPROACH', approachId: viable.id }); guard -= 1; continue;
      }
      break;
    }
    if (!guard) throw new Error('Rota excedeu o limite: ' + dungeonId + '.');
  }
  function noDeathCampaign(seed, order, ending) {
    var session = create(seed), visited = [];
    activate(session, { type: 'BEGIN' }); readAll(session, visited);
    order.forEach(function (route) { playRoute(session, route, visited); });
    playRoute(session, 'final', visited);
    if (session.controller.getState().phase !== 'final_choice') throw new Error('Conselho não terminou em final_choice.');
    activate(session, { type: 'CHOOSE_ENDING', ending: ending }); readAll(session, visited);
    return { session: session, visited: visited, state: session.controller.getState() };
  }
  function fixture(path, name) {
    return new Promise(function (resolve, reject) {
      var frame=document.createElement('iframe'),timer=setTimeout(function(){cleanup();reject(new Error('Fixture não respondeu: '+name));},3000);
      frame.hidden=true;
      function cleanup(){clearTimeout(timer);global.removeEventListener('message',receive);frame.remove();}
      function receive(event){if(event.data&&event.data.fixture===name){var data=event.data;cleanup();resolve(data);}}
      global.addEventListener('message',receive);frame.onerror=function(){cleanup();reject(new Error('Fixture não carregou: '+path));};
      frame.src=path;document.body.appendChild(frame);
    });
  }
  global.ExpeditionBrowserDriver = Object.freeze({ create: create, activate: activate, replay: replay, readAll: readAll, selectParty: selectParty, playRoute: playRoute, noDeathCampaign: noDeathCampaign, fixture: fixture, observe: observe });
})(window);
