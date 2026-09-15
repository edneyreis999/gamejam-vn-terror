/*:
 * @target MZ
 * @plugindesc Afogados em Terra Seca — integração de eventos nativos
 * @author Coreto
 * @orderAfter Dryland_CampaignRules
 * @param ConfigurationCommonEvent
 * @text Evento de configuração
 * @type common_event
 * @default 4
 * @command ConfigureHero
 * @text Configurar herói
 * @arg id
 * @text Identidade
 * @type select
 * @option H1
 * @option H2
 * @option H3
 * @option H4
 * @option H5
 * @option H6
 * @option H7
 * @option H8
 * @arg name
 * @text Nome público
 * @type string
 * @command ConfigureRoute
 * @text Configurar rota
 * @arg id
 * @text Identidade
 * @type select
 * @option physical
 * @option supernatural
 * @option final
 * @arg name
 * @text Nome público
 * @type string
 * @command ConfigureEncounter
 * @text Configurar encontro
 * @arg id
 * @text Identidade
 * @type select
 * @option A1
 * @option A2
 * @option A3
 * @option A4
 * @option A5
 * @option A6
 * @option A7
 * @option A8
 * @option B1
 * @option B2
 * @option B3
 * @option B4
 * @option B5
 * @option B6
 * @option B7
 * @option B8
 * @arg name
 * @text Nome público
 * @type string
 * @command Query
 * @text Consultar campanha
 * @arg kind
 * @text Dado
 * @type select
 * @option phase
 * @option sequence
 * @option dungeonId
 * @option selectedDungeonId
 * @option endingId
 * @option position
 * @option passageId
 * @option readingScene
 * @option readingIndex
 * @option hasReading
 * @option passageRead
 * @option livingCount
 * @option livingHero
 * @option selectedCount
 * @option selectedHero
 * @option requiredCount
 * @option automaticFormation
 * @option heroAlive
 * @option heroSelected
 * @option heroName
 * @option candidateCount
 * @option candidate
 * @option partyHero
 * @option canDepart
 * @option canRetreat
 * @option routeName
 * @option routeStatus
 * @option routeProgress
 * @option routeTotal
 * @option encounterId
 * @option encounterName
 * @option approachId
 * @option outcomeSuccess
 * @option deadCount
 * @option deadHero
 * @option heroDead
 * @option deathRoute
 * @option deathEncounter
 * @option deathPosition
 * @option climaxHero
 * @option climaxCount
 * @arg id
 * @text Identidade consultada
 * @desc Obrigatória para nomes de herói/rota. Vazia usa o encontro atual.
 * @type string
 * @arg identityVariable
 * @text Identidade pela variável (opcional)
 * @type variable
 * @default 0
 * @arg index
 * @text Posição na lista (começa em zero)
 * @type number
 * @default 0
 * @arg variable
 * @text Variável de saída
 * @type variable
 * @default 0
 * @arg switch
 * @text Switch de saída
 * @type switch
 * @default 0
 * @command ReadingComplete
 * @text Concluir passagem lida
 * @command CaptureContext
 * @text Capturar contexto
 * @desc Capture neste evento antes da escolha ou leitura; filhos capturam seu próprio contexto.
 * @command Action
 * @text Ação da campanha
 * @arg action
 * @type select
 * @option BEGIN
 * @option TOGGLE_HERO
 * @option SELECT_DESTINATION
 * @option DEPART
 * @option ENTER_DUNGEON
 * @option CHOOSE_APPROACH
 * @option SELECT_VICTIM
 * @option REQUEST_RETREAT
 * @option CANCEL_RETREAT
 * @option CONFIRM_RETREAT
 * @option CHOOSE_ENDING
 * @option NEW_CAMPAIGN
 * @arg value
 * @text Identidade
 * @type select
 * @option (nenhuma)
 * @value
 * @option H1
 * @option H2
 * @option H3
 * @option H4
 * @option H5
 * @option H6
 * @option H7
 * @option H8
 * @option physical
 * @option supernatural
 * @option final
 * @option reunite
 * @option destroy
 * @option A1-1
 * @option A1-2
 * @option A1-3
 * @option A2-1
 * @option A2-2
 * @option A2-3
 * @option A3-1
 * @option A3-2
 * @option A3-3
 * @option A4-1
 * @option A4-2
 * @option A4-3
 * @option A5-1
 * @option A5-2
 * @option A5-3
 * @option A6-1
 * @option A6-2
 * @option A6-3
 * @option A7-1
 * @option A7-2
 * @option A7-3
 * @option A8-1
 * @option A8-2
 * @option A8-3
 * @option B1-1
 * @option B1-2
 * @option B1-3
 * @option B2-1
 * @option B2-2
 * @option B2-3
 * @option B3-1
 * @option B3-2
 * @option B3-3
 * @option B4-1
 * @option B4-2
 * @option B4-3
 * @option B5-1
 * @option B5-2
 * @option B5-3
 * @option B6-1
 * @option B6-2
 * @option B6-3
 * @option B7-1
 * @option B7-2
 * @option B7-3
 * @option B8-1
 * @option B8-2
 * @option B8-3
 * @arg valueVariable
 * @text Identidade pela variável (opcional)
 * @type variable
 * @default 0
 * @arg resultVariable
 * @text Resultado
 * @type variable
 * @default 24
 * @command Checkpoint
 * @text Salvar ponto da campanha
 * @arg reason
 * @type select
 * @option new_campaign
 * @option departure
 * @option reveal
 * @option approach
 * @option sacrifice
 * @option consequence
 * @option reward
 * @option council
 * @option ending
 * @help
 * Configure nomes no evento selecionado e consulte fatos com Query.
 * CaptureContext precede uma ação semântica; ReadingComplete conclui a
 * unidade da campanha capturada. Checkpoint chama o SaveCore no arquivo atual.
 * Textos, escolhas, imagens, sons e chamadas de eventos pertencem ao editor.
 * O interpretador e as imagens são salvos nativamente; não há reconstrução.
 * Guia: rpg-maker/README.md.
 */

(function(global) {
  'use strict';
  const clone = value => JSON.parse(JSON.stringify(value));
  const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
  function freeze(value) {
    if (value && typeof value === 'object' && !Object.isFrozen(value)) {
      Object.values(value).forEach(freeze);
      Object.freeze(value);
    }
    return value;
  }
  function validateCheckpoint(reason, state, context) {
    const phases = {
      new_campaign: ['intro'], departure: ['dungeon_intro'], reveal: ['encounter_intro'], approach: ['approach_result'],
      sacrifice: ['death_result'], consequence: ['dungeon_intro', 'sacrifice_choice', 'automatic_retreat', 'dungeon_complete', 'formation'],
      reward: ['dungeon_complete', 'council'], council: ['council'], ending: ['ending']
    };
    const safe = context?.scene === 'Scene_Map' && context.interpreterRunning === true &&
      context.messageBusy === false;
    const phaseMatches = phases[reason]?.includes(state?.phase);
    const cursorSafe = !state?.reading || state.reading.index === 0 || reason === 'reward';
    if (!safe || !phaseMatches || !cursorSafe || (reason === 'departure' && state.reading?.sceneId !== `threshold.${state.dungeonId}`)) {
      return { ok: false, error: { code: 'invalid_checkpoint', message: 'O ponto de salvamento é inválido.' } };
    }
    return { ok: true };
  }
  const commandMessages = freeze({
    invalid_action: 'A ação informada é inválida.',
    invalid_transition: 'Esta ação não está disponível no estado atual.',
    missing_context: 'O contexto da escolha não está disponível.',
    invalid_checkpoint: 'O ponto de salvamento é inválido.',
    invalid_state: 'A campanha contém um estado inválido.'
  });
  const commandError = code => ({ ok: false, error: { code, message: commandMessages[code] } });
  const actionFields = freeze({ BEGIN: null, TOGGLE_HERO: 'heroId', SELECT_DESTINATION: 'dungeonId',
    DEPART: null, ENTER_DUNGEON: null, CHOOSE_APPROACH: 'approachId', SELECT_VICTIM: 'heroId',
    REQUEST_RETREAT: null, CANCEL_RETREAT: null, CONFIRM_RETREAT: null, CHOOSE_ENDING: 'ending',
    NEW_CAMPAIGN: null });
  function validateBridgeAction(args, readVariable, variableCount) {
    if (!args || typeof args !== 'object' || !hasOwn(actionFields, args.action) ||
        Object.keys(args).some(key => !['action', 'value', 'valueVariable', 'resultVariable'].includes(key)) ||
        (args.value !== undefined && typeof args.value !== 'string')) return commandError('invalid_action');
    const variable = Number(args.valueVariable || 0);
    if (!Number.isSafeInteger(variable) || variable < 0 || variable >= variableCount) return commandError('invalid_action');
    const value = variable > 0 ? readVariable(variable) : args.value || '';
    const field = actionFields[args.action];
    const matches = !field ? value === '' : typeof value === 'string' &&
      (field === 'heroId' ? /^H[1-8]$/.test(value) : field === 'dungeonId' ? ['physical','supernatural','final'].includes(value) :
        field === 'approachId' ? /^[AB][1-8]-[1-3]$/.test(value) : ['reunite','destroy'].includes(value));
    return matches ? { ok: true, field, value } : commandError('invalid_action');
  }
  function validateCapturedContext(value) {
    return Number.isSafeInteger(value) && value >= 0 ? { ok: true } : commandError('missing_context');
  }
  function readConfiguration(commonEvent) {
    const configuration = { heroes: {}, routes: {}, encounters: {} };
    const tables = { ConfigureHero: 'heroes', ConfigureRoute: 'routes', ConfigureEncounter: 'encounters' };
    for (const command of commonEvent.list) {
      if (command.code !== 357 || command.parameters[0] !== 'Dryland_EventBridge') continue;
      const table = tables[command.parameters[1]];
      if (table) {
        const { id, name } = command.parameters[3];
        configuration[table][id] = name;
      }
    }
    return configuration;
  }

  function query(rules, catalog, state, kind, id = '', index = 0) {
    const view = rules.playerView(state);
    const reading = state.reading;
    const passage = reading?.passageIds[reading.index] || '';
    const named = (table, identity) => {
      if (!table[identity]) throw new Error(`Unknown identity for ${kind}: ${identity || '(empty)'}`);
      return table[identity];
    };
    switch (kind) {
      case 'phase': case 'sequence': return state[kind];
      case 'dungeonId': case 'selectedDungeonId': case 'endingId': return state[kind] || '';
      case 'position': return state.position || 0;
      case 'passageId': return passage;
      case 'readingScene': return reading?.sceneId || '';
      case 'readingIndex': return reading?.index ?? -1;
      case 'hasReading': return Boolean(reading);
      case 'passageRead': return state.seenPassageIds.includes(id || passage);
      case 'livingCount': return view.formation.livingHeroIds.length;
      case 'livingHero': return view.formation.livingHeroIds[index] || '';
      case 'selectedCount': return view.formation.selectedHeroIds.length;
      case 'selectedHero': return view.formation.selectedHeroIds[index] || '';
      case 'requiredCount': return view.formation.required;
      case 'automaticFormation': return view.formation.automatic;
      case 'heroAlive': return view.formation.livingHeroIds.includes(id);
      case 'heroSelected': return view.formation.selectedHeroIds.includes(id);
      case 'heroName': return named(catalog.heroes, id).name;
      case 'candidateCount': return state.phase === 'sacrifice_choice' ? state.partyIds.length : 0;
      case 'candidate': return state.phase === 'sacrifice_choice' ? state.partyIds[index] || '' : '';
      case 'partyHero': return state.partyIds[index] || '';
      case 'canDepart': return view.canDepart;
      case 'canRetreat': return view.canRetreat;
      case 'routeName': return named(catalog.destinations, id).name;
      case 'routeStatus': return named(view.destinations, id).status;
      case 'routeProgress': return named(view.destinations, id).landmarks.traversed;
      case 'routeTotal': return named(catalog.destinations, id).landmarkTotal;
      case 'encounterId': return view.currentEncounter?.id || '';
      case 'encounterName': return id || view.currentEncounter ? named(catalog.encounters, id || view.currentEncounter.id).name : '';
      case 'approachId': return view.currentEncounter?.approachIds[index] || '';
      case 'outcomeSuccess': return state.pendingOutcome?.success ?? false;
      case 'deadCount': return state.deadHeroIds.length;
      case 'deadHero': return state.deadHeroIds[index] || '';
      case 'heroDead': return state.deadHeroIds.includes(id);
      case 'deathRoute': return state.deathLocations[id]?.routeId || '';
      case 'deathEncounter': return state.deathLocations[id]?.encounterId || '';
      case 'deathPosition': return state.deathLocations[id]?.encounterPosition || 0;
      case 'climaxHero': return state.climaxPartyIds[index] || '';
      case 'climaxCount': return state.climaxPartyIds.length;
      default: throw new Error(`Unknown campaign query: ${kind}`);
    }
  }

  const api = freeze({ readConfiguration, query, validateCheckpoint, validateBridgeAction, validateCapturedContext });
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.DrylandEventBridge = api;
  if (typeof DataManager === 'undefined') return;

  let registry;
  let rules;
  let inFlight = null;
  const idlePersistence = () => ({ status: 'idle', lastSuccessfulSequence: null, lastError: null });
  const persistence = () => $gameTemp._drylandPersistence || idlePersistence();
  function setPersistence(changes) { $gameTemp._drylandPersistence = { ...persistence(), ...changes }; }
  function reportRejection(action, result, context = {}) {
    const error = result.error;
    $gameVariables.setValue(24, error.code);
    $gameTemp._drylandLastRejection = { action: typeof action === 'string' ? action : null,
      code: error.code, message: error.message, context: clone(error.context || context) };
    return result;
  }
  function ensureCampaign() {
    if (!campaign()) throw new Error('Campaign data is missing.');
    return true;
  }

  const databaseLoaded = DataManager.isDatabaseLoaded;
  DataManager.isDatabaseLoaded = function() {
    if (!databaseLoaded.call(this)) return false;
    if (!registry) {
      const eventId = Number(PluginManager.parameters('Dryland_EventBridge').ConfigurationCommonEvent);
      const catalog = global.DrylandCampaignRules.createCatalog(readConfiguration($dataCommonEvents[eventId]));
      registry = { catalog };
      rules = global.DrylandCampaignRules.createRules(catalog);
    }
    return true;
  };
  const setupNewGame = DataManager.setupNewGame;
  DataManager.setupNewGame = function() {
    setupNewGame.call(this);
    $gameSystem._dryland = {
      campaign: rules.createReadyState()
    };
    $gameTemp._drylandPersistence = idlePersistence();
  };
  const saveGame = DataManager.saveGame;
  DataManager.saveGame = function(...args) {
    if (inFlight) return inFlight;
    const sequence = campaign().sequence;
    setPersistence({ status: 'saving', lastError: null });
    try {
      inFlight = Promise.resolve(saveGame.apply(this, args)).then(result => {
        setPersistence({ status: 'saved', lastSuccessfulSequence: sequence, lastError: null });
        return result;
      }, error => {
        setPersistence({ status: 'failed', lastError: { code: 'save_failed' } });
        throw error;
      }).finally(() => { inFlight = null; });
    } catch (error) {
      setPersistence({ status: 'failed', lastError: { code: 'save_failed' } });
      return Promise.reject(error);
    }
    return inFlight;
  };
  const loadGame = DataManager.loadGame;
  DataManager.loadGame = function(savefileId) {
    return Promise.resolve().then(() => loadGame.call(this, savefileId)).then(result => {
      $gameSystem._dryland.campaign = freeze(campaign());
      setPersistence({ status: 'saved', lastSuccessfulSequence: campaign().sequence, lastError: null });
      return result;
    });
  };
  function nextCheckpoint(before, after, action) {
    if (action.type === 'CONFIRM_RETREAT') return 'consequence';
    const reasons = { BEGIN: 'new_campaign', DEPART: 'departure', ENTER_DUNGEON: 'reveal', CHOOSE_APPROACH: 'approach', SELECT_VICTIM: 'sacrifice', CHOOSE_ENDING: 'ending' };
    if (reasons[action.type]) return reasons[action.type];
    if (action.type !== 'COMPLETE_PASSAGE') return '';
    if (before.endingId !== after.endingId && after.endingId) return 'ending';
    if (before.phase !== 'council' && after.phase === 'council') return 'council';
    if (before.mapPieceIds.length !== after.mapPieceIds.length || before.medallionComplete !== after.medallionComplete) return 'reward';
    if (['approach_result', 'death_result', 'automatic_retreat'].includes(before.phase) && before.phase !== after.phase) return 'consequence';
    return '';
  }
  function apply(action) {
    const before = campaign();
    if (!ensureCampaign(action.type)) return { ...commandError('invalid_state'), state: before, effects: [] };
    if (inFlight) {
      return reportRejection(action.type, { ...commandError('invalid_transition'), state: before, effects: [] });
    }
    const transition = rules.dispatch(before, action);
    if (transition.ok) {
      $gameSystem._dryland.campaign = transition.state;
      delete $gameTemp._drylandLastRejection;
      $gameVariables.setValue(46, nextCheckpoint(before, transition.state, action));
    }
    if (!transition.ok) reportRejection(action.type, transition);
    else $gameVariables.setValue(24, 'ok');
    return transition;
  }
  const campaign = () => global.$gameSystem?._dryland?.campaign;
  const plugin = (interpreter, name, command, args) => PluginManager.callCommand(interpreter, name, command, args);
  for (const name of ['ConfigureHero', 'ConfigureRoute', 'ConfigureEncounter']) {
    PluginManager.registerCommand('Dryland_EventBridge', name, function() {});
  }
  PluginManager.registerCommand('Dryland_EventBridge', 'Query', function(args) {
    ensureCampaign();
    const id = Number(args.identityVariable) > 0 ? $gameVariables.value(Number(args.identityVariable)) : args.id || '';
    const value = query(rules, registry.catalog, campaign(), args.kind, id, Number(args.index || 0));
    if (Number(args.variable) > 0) $gameVariables.setValue(Number(args.variable), value);
    if (Number(args.switch) > 0) $gameSwitches.setValue(Number(args.switch), Boolean(value));
  });
  PluginManager.registerCommand('Dryland_EventBridge', 'ReadingComplete', function() {
    ensureCampaign();
    return apply({ type: 'COMPLETE_PASSAGE', passageId: this._drylandReadingPassage, expectedSequence: this._drylandContext });
  });
  PluginManager.registerCommand('Dryland_EventBridge', 'CaptureContext', function() {
    if (!ensureCampaign('CaptureContext')) return;
    this._drylandContext = campaign().sequence;
    this._drylandReadingPassage = campaign().reading?.passageIds[campaign().reading.index];
  });
  PluginManager.registerCommand('Dryland_EventBridge', 'Checkpoint', function(args) {
    if (!ensureCampaign('Checkpoint')) return;
    const state = campaign();
    const checked = validateCheckpoint(args.reason, state, {
      scene: SceneManager._scene?.constructor.name, interpreterRunning: this.isRunning(),
      messageBusy: $gameMessage.isBusy()
    });
    if (!checked.ok) return reportRejection('Checkpoint', checked);
    $gameVariables.setValue(24, 'ok');
    if (inFlight) { this.setWaitMode('dryland-save'); return; }
    // Loading/replaying this exact save-only boundary needs no second write.
    if (persistence().status === 'saved' && persistence().lastSuccessfulSequence === state.sequence) return;
    this.setWaitMode('dryland-save');
    plugin(this, 'VisuMZ_1_SaveCore', 'AutosaveForce', {});
  });
  const updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
  Game_Interpreter.prototype.updateWaitMode = function() {
    if (this._waitMode === 'dryland-save') {
      if (inFlight) return true;
      this._waitMode = '';
      return false;
    }
    return updateWaitMode.call(this);
  };
  PluginManager.registerCommand('Dryland_EventBridge', 'Action', function(args) {
    const checked = validateBridgeAction(args, id => $gameVariables.value(id), $dataSystem.variables.length);
    if (!checked.ok) return reportRejection(args?.action, checked);
    if (!ensureCampaign(args.action)) return;
    if (args.action === 'BEGIN' && campaign().phase === 'ready') {
      const result = apply({ type: 'BEGIN', seed: Date.now() >>> 0, expectedSequence: 0 });
      return result;
    }
    const context = validateCapturedContext(this._drylandContext);
    if (!context.ok) return reportRejection(args.action, context);
    const action = { type: args.action, expectedSequence: this._drylandContext };
    if (checked.field) action[checked.field] = checked.value;
    const result = apply(action);
    $gameVariables.setValue(Number(args.resultVariable || 24), result.ok ? 'ok' : result.error.code);
    return result;
  });
  const clearInterpreter = Game_Interpreter.prototype.clear;
  Game_Interpreter.prototype.clear = function() {
    clearInterpreter.call(this);
    delete this._drylandContext;
    delete this._drylandReadingPassage;
  };

})(globalThis);
