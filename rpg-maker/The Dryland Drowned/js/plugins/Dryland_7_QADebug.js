/*:
 * @target MZ
 * @plugindesc QA Debug tools: jump to a trap using only validated campaign actions. Disabled by default.
 * @author Coreto
 * @orderAfter Coreto_1_MainMenuCore
 * @orderAfter Dryland_CampaignRules
 * @orderAfter Dryland_EventBridge
 * @orderAfter Dryland_2_ConversationIndicators
 * @orderAfter Dryland_6_IllustratedChoices
 *
 * @help
 * QA-only tools (ADR-G007). Turn the plugin on in the Plugin Manager to add a
 * Debug command to the main menu. Turn it off and the game is the default game.
 *
 * Every jump starts a new campaign in the current save file and reaches its
 * target only by sending the same validated actions that events send. It never
 * writes campaign state. The seed that makes the jump possible is shown in the
 * Debug panel so a bug report can be reproduced.
 *
 * The post-build step (npm run prune-build) asks before a build keeps this plugin.
 */
(() => {
  'use strict';

  const BRIDGE = 'Dryland_EventBridge';
  const HEROES = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8'];
  const TRAPS = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'];
  const SEED_LIMIT = 20000;
  const SCENARIO_SEED_LIMIT = 40;
  const CHECKPOINT_EVENT = 44; // "Campanha — Checkpoints após leitura"
  const CHECKPOINT_REASON_VARIABLE = 46; // "Dryland: checkpoint reason"
  const routeOf = trap => (trap.charAt(0) === 'A' ? 'physical' : 'supernatural');
  const text = key => TextManager.getLocalizedText(key);
  const campaign = () => $gameSystem && $gameSystem._dryland && $gameSystem._dryland.campaign;

  // ---------------------------------------------------------------------------
  // Planning: pure rules, no UI and no game state. A request always resolves to
  // the same seed because seeds are tried in ascending order.
  // ---------------------------------------------------------------------------
  let engine = null;
  function getEngine() {
    if (!engine) {
      const eventId = Number(PluginManager.parameters(BRIDGE).ConfigurationCommonEvent);
      const configuration = globalThis.DrylandEventBridge.readConfiguration($dataCommonEvents[eventId]);
      const catalog = globalThis.DrylandCampaignRules.createCatalog(configuration);
      engine = { catalog, rules: globalThis.DrylandCampaignRules.createRules(catalog) };
    }
    return engine;
  }

  // Sends actions to a throwaway state the way the game does, recording each one.
  function session(rules) {
    const sent = [];
    let state = rules.createReadyState();
    const send = action => {
      const result = rules.dispatch(state, Object.assign({}, action, { expectedSequence: state.sequence }));
      if (!result.ok) throw new Error('Rejected ' + action.type + ': ' + (result.error && result.error.code));
      state = result.state;
      sent.push(action);
    };
    const finishReading = () => {
      while (state.reading) send({ type: 'COMPLETE_PASSAGE', passageId: state.reading.passageIds[state.reading.index] });
    };
    return { sent, send, finishReading, state: () => state };
  }

  // Plays a new campaign up to the doorstep of a route: formation, party, departure and its text.
  // The draw of the first encounter is left to the game's own entry flow.
  function toDoorstep(seed, route, party) {
    const { rules } = getEngine();
    const play = session(rules);
    play.send({ type: 'BEGIN', seed });
    play.finishReading();
    if (play.state().phase !== 'formation') throw new Error('Unexpected phase ' + play.state().phase);
    play.send({ type: 'SELECT_DESTINATION', dungeonId: route });
    if (!rules.deriveFormation(play.state()).automatic) for (const heroId of party) play.send({ type: 'TOGGLE_HERO', heroId });
    play.send({ type: 'DEPART' });
    play.finishReading();
    play.send({ type: 'ARRIVE_ROUTE_NODE' });
    return play;
  }

  function firstEncounter(play, route) {
    const { rules } = getEngine();
    const probe = rules.dispatch(play.state(), { type: 'ENTER_DUNGEON', expectedSequence: play.state().sequence });
    return probe.ok ? probe.state.assignments[route][0] : null;
  }

  // First three living heroes, in order, whose competencies win at least one approach.
  function partyFor(encounterId) {
    const { catalog } = getEngine();
    const competencies = id => catalog.heroes[id].competencyIds;
    const encounter = catalog.encounters[encounterId];
    for (let a = 0; a < HEROES.length; a++) for (let b = a + 1; b < HEROES.length; b++) for (let c = b + 1; c < HEROES.length; c++) {
      const party = [HEROES[a], HEROES[b], HEROES[c]];
      if (encounter.approaches.some(ap => party.some(id => competencies(id).indexOf(ap.competencyId) >= 0))) return party;
    }
    return HEROES.slice(0, 3);
  }

  function planTrap(trap) {
    const route = routeOf(trap);
    for (let seed = 0; seed < SEED_LIMIT; seed++) {
      if (firstEncounter(toDoorstep(seed, route, HEROES.slice(0, 3)), route) !== trap) continue;
      const play = toDoorstep(seed, route, partyFor(trap));
      return { seed, label: trap, actions: play.sent, landing: { map: trapMapId(trap), checkpoint: null }, expect: state => state.phase === 'dungeon_intro' && state.routeCursor === 1 && !state.reading };
    }
    throw new Error('No seed found for ' + trap);
  }

  // Plays legal actions on a throwaway state until `stop` holds. The policy only chooses between
  // actions the rules accept: who goes, which approach, who is sacrificed.
  const combos = living => living.flatMap((a, i) => living.slice(i + 1).flatMap((b, j) => living.slice(i + j + 2).map(c => [a, b, c])));
  function chooseParty(catalog, living, wins) {
    const covered = party => new Set(party.flatMap(id => catalog.heroes[id].competencyIds)).size;
    let best = null;
    for (const party of combos(living)) if (!best || (wins ? covered(party) > covered(best) : covered(party) < covered(best))) best = party;
    return best || living;
  }
  function nextAction(rules, catalog, state, policy) {
    if (state.activeSocialTopicId) return { type: 'COMPLETE_SOCIAL_TOPIC', topicId: state.activeSocialTopicId };
    if (state.reading) return { type: 'COMPLETE_PASSAGE', passageId: state.reading.passageIds[state.reading.index] };
    switch (state.phase) {
      case 'camp_arrival': {
        const grief = rules.pendingGrief(state);
        return grief.length ? { type: 'START_SOCIAL_TOPIC', topicId: grief[0] } : { type: 'FINISH_CAMP_ARRIVAL' };
      }
      case 'camp': return { type: 'CONTINUE_FROM_CAMP' };
      case 'formation': {
        if (!state.selectedDungeonId) {
          const destinations = rules.deriveDestinations(state);
          const open = ['physical', 'supernatural', 'final'].find(id => destinations[id].status === 'available');
          return { type: 'SELECT_DESTINATION', dungeonId: open };
        }
        const form = rules.deriveFormation(state);
        const wanted = form.automatic ? form.livingHeroIds : chooseParty(catalog, form.livingHeroIds, policy.wins);
        const missing = wanted.find(id => !form.selectedHeroIds.includes(id));
        return missing && !form.automatic ? { type: 'TOGGLE_HERO', heroId: missing } : { type: 'DEPART' };
      }
      case 'route_map': return { type: 'ARRIVE_ROUTE_NODE' };
      case 'dungeon_intro': return { type: 'ENTER_DUNGEON' };
      case 'encounter_choice': {
        const encounter = catalog.encounters[state.assignments[state.dungeonId][state.position - 1]];
        const has = approach => state.partyIds.some(id => catalog.heroes[id].competencyIds.includes(approach.competencyId));
        const pick = encounter.approaches.find(approach => has(approach) === policy.wins) || encounter.approaches[0];
        return { type: 'CHOOSE_APPROACH', approachId: pick.id };
      }
      case 'sacrifice_choice': return { type: 'SELECT_VICTIM', heroId: state.partyIds.find(id => !state.deadHeroIds.includes(id)) };
      case 'final_choice': return { type: 'CHOOSE_ENDING', ending: policy.ending };
      default: throw new Error('No legal move from phase ' + state.phase);
    }
  }
  function autoplay(seed, stop, policy) {
    const { rules, catalog } = getEngine();
    const play = session(rules);
    play.send({ type: 'BEGIN', seed });
    for (let step = 0; step < 5000; step++) {
      if (stop(play.state())) return play;
      play.send(nextAction(rules, catalog, play.state(), policy));
    }
    throw new Error('Scenario did not settle');
  }

  const SCENARIOS = {
    final_route: {
      policy: { wins: true },
      stop: s => s.phase === 'formation' && !s.reading && !s.activeSocialTopicId && s.completedDungeonIds.includes('physical') && s.completedDungeonIds.includes('supernatural'),
      map: 3, checkpoint: 'camp_exit'
    },
    council: { policy: { wins: true }, stop: s => s.phase === 'council' && s.reading && s.reading.index === 0, map: 23, checkpoint: 'council' },
    reunite: { policy: { wins: true, ending: 'reunite' }, stop: s => s.phase === 'ending' && s.endingId === 'reunite' && s.reading.index === 0, map: 25, checkpoint: 'ending' },
    destroy: { policy: { wins: true, ending: 'destroy' }, stop: s => s.phase === 'ending' && s.endingId === 'destroy' && s.reading.index === 0, map: 26, checkpoint: 'ending' },
    total_loss: { policy: { wins: false }, stop: s => s.phase === 'ending' && s.endingId === 'bad' && s.reading.index === 0, map: 27, checkpoint: 'ending' }
  };

  function planScenario(id) {
    const scenario = SCENARIOS[id];
    if (!scenario) throw new Error('Unknown scenario ' + id);
    let lastError = null;
    for (let seed = 1; seed <= SCENARIO_SEED_LIMIT; seed++) {
      try {
        const play = autoplay(seed, scenario.stop, scenario.policy);
        return { seed, label: id, actions: play.sent, landing: { map: scenario.map, checkpoint: scenario.checkpoint }, expect: scenario.stop };
      } catch (error) {
        lastError = error;
      }
    }
    throw new Error('No seed settles ' + id + ': ' + (lastError && lastError.message));
  }

  // ---------------------------------------------------------------------------
  // Applying a plan through the EventBridge command path (what events use).
  // ---------------------------------------------------------------------------
  function sendLive(interpreter, action) {
    PluginManager.callCommand(interpreter, BRIDGE, 'CaptureContext', {});
    if (action.type === 'COMPLETE_PASSAGE') {
      PluginManager.callCommand(interpreter, BRIDGE, 'ReadingComplete', {});
    } else {
      const value = action.heroId || action.dungeonId || action.approachId || action.topicId || action.ending || '';
      PluginManager.callCommand(interpreter, BRIDGE, 'Action', { action: action.type, value });
    }
    const outcome = $gameVariables.value(24);
    if (outcome !== 'ok') throw new Error('Game rejected ' + action.type + ': ' + outcome);
  }

  function trapMapId(trap) {
    const id = $dataMapInfos.findIndex(info => info && info.name === trap);
    if (id < 1) throw new Error('No map named ' + trap);
    return id;
  }

  // Starts a new campaign in the current save file, as New Game does, and plays the plan.
  function replace(plan) {
    const fileId = $gameSystem.savefileId();
    DataManager.setupNewGame();
    $gameSystem.setSavefileId(fileId);
    $gameTemp._drylandBeginSeed = plan.seed;
    const interpreter = new Game_Interpreter();
    for (const action of plan.actions) sendLive(interpreter, action);
    if (!plan.expect(campaign())) throw new Error('Landing phase was ' + campaign().phase);
    $gamePlayer.reserveTransfer(plan.landing.map, 10, 7, 2, 0);
    // The game's own checkpoint router saves the point the last action reached.
    if (plan.landing.checkpoint) {
      $gameVariables.setValue(CHECKPOINT_REASON_VARIABLE, plan.landing.checkpoint);
      $gameTemp.reserveCommonEvent(CHECKPOINT_EVENT);
    }
    SceneManager.clearStack();
    SceneManager.goto(Scene_Map);
  }

  // ---------------------------------------------------------------------------
  // Winning-approach hint: reads the campaign, never chooses for the player. The setting is kept in
  // the browser's own storage so it survives the plugin being switched off and on, and stays out of
  // the campaign save.
  // ---------------------------------------------------------------------------
  const HINT_KEY = 'Dryland_7_QADebug.hint';
  const PAPER_PICTURE = 'Dryland_ApproachPaper';
  const FIRST_PAPER_ID = 50;
  function hintOn() {
    try {
      return localStorage.getItem(HINT_KEY) === '1';
    } catch (error) {
      return false;
    }
  }
  function setHint(on) {
    try {
      localStorage.setItem(HINT_KEY, on ? '1' : '0');
    } catch (error) {
      console.error(error);
    }
  }

  // Indexes of the approaches that succeed with the current party, or null when no choice is open.
  function winningApproaches() {
    const state = campaign();
    if (!state || state.phase !== 'encounter_choice' || !state.dungeonId) return null;
    const { catalog } = getEngine();
    const encounter = catalog.encounters[state.assignments[state.dungeonId][state.position - 1]];
    if (!encounter) return null;
    const known = new Set(state.partyIds.flatMap(id => catalog.heroes[id].competencyIds));
    return encounter.approaches.map((approach, index) => (known.has(approach.competencyId) ? index : -1)).filter(index => index >= 0);
  }

  function hintLabel(kind) {
    const bitmap = new Bitmap(280, 40);
    bitmap.fontSize = 22;
    bitmap.textColor = ColorManager.systemColor();
    bitmap.drawText(text(kind === 'wins' ? 'debug.hint.wins' : 'debug.hint.none'), 0, 0, 280, 40, 'center');
    return bitmap;
  }
  const updatePicture = Sprite_Picture.prototype.update;
  Sprite_Picture.prototype.update = function() {
    updatePicture.call(this);
    const picture = this.picture();
    let kind = null;
    if (picture && picture.name() === PAPER_PICTURE && hintOn()) {
      const winners = winningApproaches();
      const index = this._pictureId - FIRST_PAPER_ID;
      if (winners && index >= 0 && index <= 2) kind = winners.includes(index) ? 'wins' : (!winners.length && index === 0 ? 'none' : null);
    }
    if (!kind) {
      if (this._qaHint) this._qaHint.visible = false;
      return;
    }
    if (!this.bitmap || !this.bitmap.isReady()) return;
    if (!this._qaHint) {
      this._qaHint = new Sprite();
      this._qaHint.anchor.set(0.5, 0);
      this.addChild(this._qaHint);
    }
    if (this._qaHintKind !== kind || this._qaHintLocale !== ConfigManager.textLocale) {
      this._qaHint.bitmap = hintLabel(kind);
      this._qaHintKind = kind;
      this._qaHintLocale = ConfigManager.textLocale;
    }
    this._qaHint.x = 0;
    this._qaHint.y = -this.bitmap.height * (this.anchor ? this.anchor.y : 0.5) + 6;
    this._qaHint.visible = true;
  };

  // ---------------------------------------------------------------------------
  // Screen
  // ---------------------------------------------------------------------------
  function panelText() {
    const state = campaign();
    if (!state || state.phase === 'ready') return text('debug.panel.none');
    const route = state.dungeonId ? state.dungeonId + ' ' + state.position : '-';
    return [
      text('debug.panel.seed') + ': ' + state.seed,
      text('debug.panel.phase') + ': ' + state.phase,
      text('debug.panel.route') + ': ' + route,
      text('debug.panel.party') + ': ' + (state.partyIds.join(', ') || '-'),
      text('debug.panel.dead') + ': ' + (state.deadHeroIds.join(', ') || '-'),
      text('debug.panel.completed') + ': ' + (state.completedDungeonIds.join(', ') || '-'),
      text('debug.panel.hint') + ': ' + text(hintOn() ? 'debug.hint.on' : 'debug.hint.off')
    ].join('\n');
  }

  function Window_DrylandDebugList() {
    this.initialize(...arguments);
  }
  Window_DrylandDebugList.prototype = Object.create(Window_Command.prototype);
  Window_DrylandDebugList.prototype.constructor = Window_DrylandDebugList;
  Window_DrylandDebugList.prototype.initialize = function(rect, entries) {
    this._entries = entries;
    Window_Command.prototype.initialize.call(this, rect);
  };
  Window_DrylandDebugList.prototype.makeCommandList = function() {
    for (const entry of this._entries) this.addCommand(typeof entry.name === 'function' ? entry.name() : entry.name, entry.symbol, true, entry.ext);
  };

  function Scene_DrylandDebug() {
    this.initialize(...arguments);
  }
  Scene_DrylandDebug.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_DrylandDebug.prototype.constructor = Scene_DrylandDebug;
  Scene_DrylandDebug.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    const helpHeight = this.calcWindowHeight(8, false);
    this._helpWindow = new Window_Help(new Rectangle(0, 0, Graphics.boxWidth, helpHeight));
    this.addWindow(this._helpWindow);
    const rect = new Rectangle(0, helpHeight, Graphics.boxWidth, Graphics.boxHeight - helpHeight);
    this._rootWindow = this.addList(rect, [
      { name: text('debug.go_trap'), symbol: 'goTrap' },
      { name: text('debug.scenarios'), symbol: 'scenarios' },
      { name: () => text('debug.hint') + ': ' + text(hintOn() ? 'debug.hint.on' : 'debug.hint.off'), symbol: 'hint' },
      { name: text('debug.back'), symbol: 'cancel' }
    ], { goTrap: this.openTraps, scenarios: this.openScenarios, hint: this.toggleHint, cancel: this.popScene });
    this._trapWindow = this.addList(rect, TRAPS.map(trap => ({
      name: trap + ' — ' + text('enc.' + trap.toLowerCase() + '.name'), symbol: 'trap', ext: trap
    })), { trap: this.askTrap });
    this._trapWindow.setHandler('cancel', this.closeLists.bind(this));
    this._scenarioWindow = this.addList(rect, Object.keys(SCENARIOS).map(id => ({
      name: text('debug.scn.' + id), symbol: 'scenario', ext: id
    })), { scenario: this.askScenario });
    this._scenarioWindow.setHandler('cancel', this.closeLists.bind(this));
    this._confirmWindow = this.addList(new Rectangle(0, helpHeight, Graphics.boxWidth, this.calcWindowHeight(2, true)), [
      { name: text('debug.confirm'), symbol: 'yes' }, { name: text('debug.cancel'), symbol: 'no' }
    ], { yes: this.runJump, no: this.cancelConfirm });
    this._confirmWindow.setHandler('cancel', this.cancelConfirm.bind(this));
    this.dismiss(this._trapWindow);
    this.dismiss(this._scenarioWindow);
    this.dismiss(this._confirmWindow);
    this.showPanel();
  };
  Scene_DrylandDebug.prototype.addList = function(rect, entries, handlers) {
    const list = new Window_DrylandDebugList(rect, entries);
    for (const symbol of Object.keys(handlers)) list.setHandler(symbol, handlers[symbol].bind(this));
    this.addWindow(list);
    return list;
  };
  Scene_DrylandDebug.prototype.dismiss = function(list) {
    list.hide();
    list.deactivate();
  };
  Scene_DrylandDebug.prototype.present = function(list, index) {
    list.show();
    list.activate();
    if (index !== undefined) list.select(index);
  };
  Scene_DrylandDebug.prototype.showPanel = function() {
    this._helpWindow.setText(panelText());
  };
  Scene_DrylandDebug.prototype.openTraps = function() {
    this._list = this._trapWindow;
    this.dismiss(this._rootWindow);
    this.present(this._list, 0);
  };
  Scene_DrylandDebug.prototype.openScenarios = function() {
    this._list = this._scenarioWindow;
    this.dismiss(this._rootWindow);
    this.present(this._list, 0);
  };
  Scene_DrylandDebug.prototype.toggleHint = function() {
    setHint(!hintOn());
    this._rootWindow.refresh();
    this._rootWindow.activate();
    this.showPanel();
  };
  Scene_DrylandDebug.prototype.closeLists = function() {
    this.dismiss(this._list);
    this.present(this._rootWindow);
  };
  Scene_DrylandDebug.prototype.askTrap = function() {
    this.ask(() => planTrap(this._trapWindow.currentExt()));
  };
  Scene_DrylandDebug.prototype.askScenario = function() {
    this.ask(() => planScenario(this._scenarioWindow.currentExt()));
  };
  Scene_DrylandDebug.prototype.ask = function(plan) {
    this._plan = plan;
    this._helpWindow.setText(text('debug.confirm_text'));
    this.present(this._confirmWindow, 1);
  };
  Scene_DrylandDebug.prototype.cancelConfirm = function() {
    this.dismiss(this._confirmWindow);
    this._list.activate();
    this.showPanel();
  };
  Scene_DrylandDebug.prototype.runJump = function() {
    this._confirmWindow.deactivate();
    try {
      replace(this._plan());
    } catch (error) {
      console.error(error);
      this._helpWindow.setText(text('debug.error') + '\n' + error.message);
      this.dismiss(this._confirmWindow);
      this._list.activate();
    }
  };

  globalThis.DrylandQADebug = Object.freeze({
    available: () => true,
    open: () => SceneManager.push(Scene_DrylandDebug),
    planTrap,
    planScenario,
    scenarios: Object.keys(SCENARIOS),
    traps: TRAPS.slice()
  });
})();
