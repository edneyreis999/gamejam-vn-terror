/*:
 * @target MZ
 * @plugindesc Afogados em Terra Seca — integração de eventos nativos
 * @author Coreto
 * @orderAfter Dryland_CampaignRules
 * @command CaptureContext
 * @text Capturar contexto
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
 * @option SKIP_SEEN_TEXT
 * @option NEW_CAMPAIGN
 * @arg value
 * @type string
 * @command Observe
 * @text Atualizar apresentação
 * @arg target
 * @type select
 * @option formation
 * @option destinations
 * @option encounter
 * @option roster
 * @option closing
 * @command Present
 * @text Apresentar trecho atual
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
 * Incremental implementation: see .compozy/tasks/init-rpg-maker-mz/tasks.md.
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
  const stableId = /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/;
  const speakers = new Set(['narrator', 'ivai', 'perola', 'florai', 'andira', ...Array.from({ length: 8 }, (_, i) => `H${i + 1}`)]);
  const statuses = new Set(['confirmed', 'prototype_baseline', 'provisional']);
  const minimumSections = ['prologue.01', 'prologue.02', 'irati.01'];

  function safeText(text) {
    if (typeof text !== 'string' || /[<>\u001b]/.test(text)) return false;
    return !text.replace(/\\(?:C\[\d+\]|I\[\d+\]|FS\[\d+\]|[{}.!|^$])/gi, '').includes('\\');
  }

  function validPictureCommand(code, p, system) {
    const integer = (value, min, max) => Number.isInteger(value) && value >= min && value <= max;
    if (!integer(p[0], 1, 100)) return false;
    if (code === 235) return p.length === 1;
    if (code === 234) return p.length === 4 && Array.isArray(p[1]) && p[1].length === 4 &&
      p[1].every((value, index) => integer(value, index === 3 ? 0 : -255, 255)) &&
      integer(p[2], 0, 9999) && typeof p[3] === 'boolean';
    if (p.length !== (code === 231 ? 10 : 13) || !integer(p[2], 0, 1) || !integer(p[3], 0, 1) ||
        !p.slice(4, 8).every(Number.isFinite) || p[6] < 0 || p[7] < 0 || !integer(p[8], 0, 255) || !integer(p[9], 0, 3)) return false;
    if (p[3] === 1 && !p.slice(4, 6).every(value => integer(value, 1, (system?.variables?.length || 1) - 1))) return false;
    if (code === 231) return typeof p[1] === 'string' && p[1].length > 0;
    return p[1] === 0 && integer(p[10], 0, 9999) && typeof p[11] === 'boolean' && integer(p[12], 0, 3);
  }

  /** Index native command ranges. No command, escape or metadata is evaluated. */
  function parseEventCatalog(commonEvents, system) {
    const catalog = { version: 1, passages: {}, scenes: {}, heroes: {}, encounters: {}, destinations: {}, competencies: {} };
    const locations = {};
    const violations = [];
    const defects = new Set();
    const declared = new Set();
    const required = new Set(minimumSections);
    const eventIndices = new Map(Array.isArray(commonEvents) ? commonEvents.map((event, index) => [event, index]) : []);
    const knownAssets = new Set(system?.drylandAssets || []);
    function issue(code, id) {
      if (!defects.has(id)) {
        violations.push({ code, id });
        defects.add(id);
      }
    }
    function asset(file, id) {
      if (typeof file !== 'string' || !/^(img|audio)\/[a-z0-9_./ -]+$/i.test(file) ||
          file.split('/').some(part => part === '.' || part === '..' || !part) || !knownAssets.has(file)) {
        issue('invalid_asset_reference', id);
      }
    }
    function declaration(line) {
      const match = /^@(scene|hero|encounter|route|competency) (.+)$/.exec(line);
      if (line.startsWith('@requires ')) {
        line.slice(10).split(/\s+/).filter(Boolean).forEach(id => required.add(id));
      } else if (match) {
        let value;
        try { value = JSON.parse(match[2]); } catch { issue('invalid_scene_reference', match[1]); return; }
        if (!value || !stableId.test(value.id) || ['__proto__', 'constructor', 'prototype'].includes(value.id)) {
          issue('invalid_scene_reference', match[1]); return;
        }
        const fields = {
          scene: ['id', 'backgroundId', 'passageIds'], hero: ['id', 'name', 'competencyIds'],
          encounter: ['id', 'name', 'pool', 'backgroundId', 'approaches'],
          route: ['id', 'name', 'pool', 'landmarkTotal'], competency: ['id', 'name', 'family']
        };
        if (Object.keys(value).some(key => !fields[match[1]].includes(key)) ||
            (hasOwn(value, 'name') && !safeText(value.name)) ||
            (match[1] === 'encounter' && (!Array.isArray(value.approaches) || value.approaches.some(approach =>
              !approach || Object.keys(approach).sort().join(',') !== 'competencyId,id')))) issue('invalid_scene_reference', value.id);
        const table = { scene: 'scenes', hero: 'heroes', encounter: 'encounters', route: 'destinations', competency: 'competencies' }[match[1]];
        if (hasOwn(catalog[table], value.id)) issue('invalid_scene_reference', value.id);
        else catalog[table][value.id] = value;
        if (match[1] === 'hero') {
          required.add(`profile.${value.id}`);
          required.add(`speech.${value.id}`);
        }
      }
    }
    function finish(section, end, closed, event) {
      const { id, start, indent, meta } = section;
      if (!closed) { issue('unclosed_section', id); return; }
      if (!Number.isInteger(event.id) || event.id !== eventIndices.get(event)) issue('invalid_scene_reference', id);
      if (!stableId.test(id) || ['__proto__', 'constructor', 'prototype'].includes(id) || meta.passage !== id) issue('invalid_scene_reference', id);
      if (!speakers.has(meta.speaker)) issue('invalid_speaker', id);
      if (!statuses.has(meta.status)) issue('invalid_status', id);
      if (!meta.source?.trim()) issue('missing_source', id);
      if (meta.scene && !hasOwn(catalog.scenes, meta.scene)) issue('invalid_scene_reference', id);
      let text = '';
      const choices = [];
      const branches = [];
      let previous = event.list[start];
      const allowed = new Set([0, 101, 401, 102, 402, 403, 404, 108, 408, 231, 232, 234, 235]);
      for (let index = start + 1; index < end; index++) {
        const command = event.list[index];
        const p = command.parameters;
        if (!allowed.has(command.code) || !Array.isArray(p) || !Number.isInteger(command.indent) || command.indent < indent) {
          issue('unsupported_content_command', id); continue;
        }
        if ([231, 232, 234, 235].includes(command.code) && !validPictureCommand(command.code, p, system)) issue('unsupported_content_command', id);
        if (command.code === 101) {
          if (typeof p[0] !== 'string' || p.length !== 5 || !safeText(p[4])) issue('unsupported_content_command', id);
          if (p[0]) asset(`img/faces/${p[0]}.png`, id);
        } else if (command.code === 401) {
          if (![101, 401].includes(previous?.code) || previous.indent !== command.indent) issue('unsupported_content_command', id);
          text += typeof p[0] === 'string' ? p[0] : '';
          if (!safeText(p[0])) issue('unsafe_text', id);
        } else if (command.code === 102) {
          if (!Array.isArray(p[0]) || p[0].some(label => !safeText(label))) issue('unsafe_text', id);
          else choices.push(p[0]);
          branches.push({ indent: command.indent, count: p[0]?.length, seen: [] });
        } else if ([402, 403, 404].includes(command.code)) {
          const branch = branches[branches.length - 1];
          if (!branch || branch.indent !== command.indent) issue('unsupported_content_command', id);
          else if (command.code === 402) branch.seen.push(p[0]);
          else if (command.code === 404) {
            if (branch.seen.length !== branch.count || branch.seen.some((value, i) => value !== i)) issue('unsupported_content_command', id);
            branches.pop();
          }
        } else if (command.code === 0 && command.indent === indent) issue('unsupported_content_command', id);
        else if (command.code === 231) asset(`img/pictures/${p[1]}.png`, id);
        else if (command.code === 408 && ![108, 408].includes(previous?.code)) issue('unsupported_content_command', id);
        if (command.indent > (branches[branches.length - 1]?.indent ?? indent) + (branches.length ? 1 : 0)) issue('unsupported_content_command', id);
        previous = command;
      }
      if (branches.length) issue('unsupported_content_command', id);
      if (id.startsWith('choices.')) {
        if (choices.length !== 1 || choices[0].length !== 3) issue('invalid_choice_count', id);
      } else if (!text.trim()) issue('missing_text', id);
      if (meta.asset) asset(meta.asset, id);
      if (!hasOwn(locations, id)) {
        locations[id] = { commonEventId: event.id, start, end, indent };
        catalog.passages[id] = { id, speakerId: meta.speaker === 'narrator' ? null : meta.speaker, status: meta.status, source: meta.source };
      }
    }
    if (!Array.isArray(commonEvents)) return { catalog, locations, violations: [{ code: 'project_unreadable' }] };
    // Read plans first so their physical position in the editor does not matter.
    for (const event of commonEvents.filter(Boolean)) {
      let inside = false;
      for (const command of event.list || []) {
        if (![108, 408].includes(command.code)) continue;
        for (const line of String(command.parameters[0]).split('\n')) {
          if (line.startsWith('@dryland-section ')) inside = true;
          else if (line === '@dryland-end') inside = false;
          else if (!inside) declaration(line);
        }
      }
    }
    for (const event of commonEvents.filter(Boolean)) {
      let section = null;
      for (let index = 0; index < (event.list || []).length; index++) {
        const command = event.list[index];
        if (![108, 408].includes(command.code)) continue;
        for (const line of String(command.parameters[0]).split('\n')) {
          if (line.startsWith('@dryland-section ')) {
            if (section) finish(section, index, false, event);
            const id = line.slice(17).trim();
            if (declared.has(id)) issue('duplicate_section', id);
            declared.add(id);
            section = { id, start: index, indent: command.indent, meta: {} };
          } else if (line === '@dryland-end' && section) {
            if (command.indent !== section.indent) issue('unsupported_content_command', section.id);
            finish(section, index, true, event);
            section = null;
          } else if (section && line.startsWith('@')) {
            const match = /^@(passage|speaker|status|source|scene|asset) (.+)$/.exec(line);
            if (!match || hasOwn(section.meta, match[1])) issue('unsafe_text', section.id);
            else section.meta[match[1]] = match[2];
          }
        }
      }
      if (section) finish(section, event.list.length, false, event);
    }
    for (const id of required) if (!declared.has(id)) issue('missing_section', id);
    for (const scene of Object.values(catalog.scenes)) {
      if (!Array.isArray(scene.passageIds) || !scene.passageIds.length || scene.passageIds.some(id => !hasOwn(locations, id) && !required.has(id))) {
        issue('invalid_scene_reference', scene.id);
      }
    }
    return freeze({ catalog, locations, violations });
  }

  function validateEnvelope(envelope, nativeLayoutVersion, validateState) {
    if (!envelope || Object.keys(envelope).sort().join(',') !== 'campaign,catalogVersion,nativeLayoutVersion,schemaVersion' ||
        envelope.schemaVersion !== 1 || envelope.catalogVersion !== 1) return { ok: false, error: { code: 'invalid_save_envelope' } };
    if (envelope.nativeLayoutVersion !== nativeLayoutVersion) return { ok: false, error: { code: 'incompatible_native_layout' } };
    try {
      if (['ready', 'invalid'].includes(envelope.campaign?.phase) || !validateState(envelope.campaign).ok) return { ok: false, error: { code: 'invalid_state' } };
    } catch { return { ok: false, error: { code: 'invalid_state' } }; }
    return { ok: true };
  }
  function validateCheckpoint(reason, state, context) {
    const phases = {
      new_campaign: ['intro'], departure: ['dungeon_intro'], reveal: ['encounter_intro'], approach: ['approach_result'],
      sacrifice: ['death_result'], consequence: ['dungeon_intro', 'sacrifice_choice', 'automatic_retreat', 'dungeon_complete', 'formation'],
      reward: ['dungeon_complete', 'council'], council: ['council'], ending: ['ending']
    };
    const safe = context?.scene === 'Scene_Map' && context.interpreterRunning === true &&
      context.messageBusy === false && context.presentationActive === false;
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
    invalid_target: 'O alvo de apresentação é inválido.',
    invalid_state: 'A campanha contém um estado inválido.',
    missing_section: 'Um trecho da campanha não está disponível.',
    campaign_unavailable: 'A campanha ainda não está disponível.',
    campaign_already_started: 'Defina a semente antes de iniciar a campanha.',
    invalid_seed: 'Use um número inteiro entre 0 e 4294967295.'
  });
  const commandError = code => ({ ok: false, error: { code, message: commandMessages[code] } });
  const actionFields = freeze({ BEGIN: null, TOGGLE_HERO: 'heroId', SELECT_DESTINATION: 'dungeonId',
    DEPART: null, ENTER_DUNGEON: null, CHOOSE_APPROACH: 'approachId', SELECT_VICTIM: 'heroId',
    REQUEST_RETREAT: null, CANCEL_RETREAT: null, CONFIRM_RETREAT: null, CHOOSE_ENDING: 'ending',
    SKIP_SEEN_TEXT: null, NEW_CAMPAIGN: null });
  function validateBridgeAction(args, readVariable, variableCount) {
    if (!args || typeof args !== 'object' || !hasOwn(actionFields, args.action) ||
        Object.keys(args).some(key => !['action', 'value'].includes(key)) ||
        (args.value !== undefined && typeof args.value !== 'string')) return commandError('invalid_action');
    let value = args.value || '';
    const reference = /^\\V\[([1-9]\d*)\]$/.exec(value);
    if (reference) {
      const id = Number(reference[1]);
      if (!Number.isSafeInteger(id) || id >= variableCount) return commandError('invalid_action');
      value = readVariable(id);
    }
    const field = actionFields[args.action];
    const matches = !field ? value === '' : typeof value === 'string' &&
      (field === 'heroId' ? /^H[1-8]$/.test(value) : field === 'dungeonId' ? ['physical','supernatural','final'].includes(value) :
        field === 'approachId' ? /^[AB][1-8]-[1-3]$/.test(value) : ['reunite','destroy'].includes(value));
    return matches ? { ok: true, field, value } : commandError('invalid_action');
  }
  const observeTargets = new Set(['formation', 'destinations', 'encounter', 'roster', 'closing',
    'memorial', 'memorial_busts', 'memorial_capture', 'memorial_portraits', 'memorial_ready',
    'credits', 'credits_finish', 'credits_cleanup', 'interface_hidden', 'interface_visible']);
  function validateObserve(args) {
    return args && Object.keys(args).join(',') === 'target' && observeTargets.has(args.target)
      ? { ok: true } : commandError('invalid_target');
  }
  function validateCapturedContext(value) {
    return Number.isSafeInteger(value) && value >= 0 ? { ok: true } : commandError('missing_context');
  }
  // Dependency ports remain private to the native owner. QA receives only
  // detached observations and the one expressly permitted prestart seed setter.
  function createQa(getSession, setSeed) {
    return freeze({
      setSeed(value) {
        const session = getSession();
        if (!session) return commandError('campaign_unavailable');
        if (session.loading || session.state?.phase !== 'ready') return commandError('campaign_already_started');
        if (!Number.isInteger(value) || value < 0 || value > 4294967295) return commandError('invalid_seed');
        setSeed(value);
        return { ok: true, seed: value };
      },
      snapshot() {
        const session = getSession();
        if (!session) return commandError('campaign_unavailable');
        return clone({ ...session.rules.snapshot(session.state), lastRejectedAction: session.lastRejectedAction || null,
          persistence: session.persistence });
      },
      validate() {
        const session = getSession();
        return session ? clone(session.rules.validateState(session.state)) : commandError('campaign_unavailable');
      }
    });
  }

  const api = freeze({ parseEventCatalog, validateEnvelope, validateCheckpoint, validateBridgeAction, validateObserve, validateCapturedContext, createQa });
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.DrylandEventBridge = api;
  if (typeof DataManager === 'undefined') return;

  let registry;
  let rules;
  let inFlight = null;
  let pendingSeed = null;
  let loading = false;
  const idlePersistence = () => ({ status: 'idle', lastSuccessfulSequence: null, lastError: null });
  const persistence = () => $gameTemp._drylandPersistence || idlePersistence();
  function setPersistence(changes) { $gameTemp._drylandPersistence = { ...persistence(), ...changes }; }
  Object.defineProperty(global, 'expeditionQA', { value: createQa(() => {
    if (!rules || !global.$gameSystem?._dryland || !global.$gameTemp) return null;
    return { state: campaign(), rules, loading, persistence: persistence(), lastRejectedAction: $gameTemp._drylandLastRejection };
  }, seed => { pendingSeed = seed; }), enumerable: true });
  function reportRejection(action, result, context = {}) {
    const error = result.error;
    $gameVariables.setValue(24, error.code);
    $gameTemp._drylandLastRejection = { action: typeof action === 'string' ? action : null,
      code: error.code, message: error.message, context: clone(error.context || context) };
    return result;
  }
  function ensureCampaign(action) {
    if ($gameTemp._drylandInvalid || !rules.validateState(campaign()).ok) {
      reportRejection(action, commandError('invalid_state'));
      $gameTemp._drylandInvalid = true;
      return false;
    }
    return true;
  }

  DataManager._databaseFiles.push({ name: '$dataDrylandLayout', src: '../native-layout-manifest.json' });
  const databaseLoaded = DataManager.isDatabaseLoaded;
  DataManager.isDatabaseLoaded = function() {
    if (!databaseLoaded.call(this)) return false;
    if (!registry) {
      registry = parseEventCatalog($dataCommonEvents, { ...$dataSystem, drylandAssets: global.$dataDrylandLayout.assets });
      if (registry.violations.length) throw new Error(`Dryland content: ${JSON.stringify(registry.violations)}`);
      rules = global.DrylandCampaignRules.createRules(registry.catalog);
    }
    return true;
  };
  const setupNewGame = DataManager.setupNewGame;
  DataManager.setupNewGame = function() {
    setupNewGame.call(this);
    $gameSystem._dryland = {
      schemaVersion: 1, catalogVersion: 1, nativeLayoutVersion: global.$dataDrylandLayout.nativeLayoutVersion,
      campaign: rules.createReadyState()
    };
    $gameTemp._drylandPersistence = idlePersistence();
  };
  // Single mode has no slot-selection or old-payload inspection at New Game.
  DataManager.selectSavefileForNewGame = function() { $gameSystem.setSavefileId(0); };
  const saveGame = DataManager.saveGame;
  DataManager.saveGame = function(savefileId) {
    if (savefileId !== 0) return Promise.reject(new Error('invalid_checkpoint'));
    if (inFlight) return inFlight;
    const sequence = campaign().sequence;
    setPersistence({ status: 'saving', lastError: null });
    try {
      inFlight = Promise.resolve(saveGame.call(this, 0)).then(result => {
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
  // Validate the decoded object while it is still an I/O result. Native
  // loadGame has not called createGameObjects/extractSaveContents at this point.
  const loadObject = StorageManager.loadObject;
  StorageManager.loadObject = function(name) {
    return loadObject.call(this, name).then(contents => {
      if (name === DataManager.makeSavename(0)) {
        const result = validateEnvelope(contents?.system?._dryland, global.$dataDrylandLayout.nativeLayoutVersion, rules.validateState);
        if (!result.ok) throw new Error(result.error.code);
      }
      return contents;
    });
  };
  const loadGame = DataManager.loadGame;
  DataManager.loadGame = function(savefileId) {
    loading = true;
    return Promise.resolve().then(() => loadGame.call(this, savefileId)).then(result => {
      $gameSystem._dryland.campaign = freeze(campaign());
      setPersistence({ status: 'saved', lastSuccessfulSequence: campaign().sequence, lastError: null });
      return result;
    }).finally(() => { loading = false; pendingSeed = null; });
  };
  function nextCheckpoint(before, after, action) {
    if (action.type === 'CONFIRM_RETREAT') return 'consequence';
    const reasons = { BEGIN: 'new_campaign', DEPART: 'departure', ENTER_DUNGEON: 'reveal', CHOOSE_APPROACH: 'approach', SELECT_VICTIM: 'sacrifice', CHOOSE_ENDING: 'ending' };
    if (reasons[action.type]) return reasons[action.type];
    if (!['COMPLETE_PASSAGE', 'SKIP_SEEN_TEXT'].includes(action.type)) return '';
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
      for (const effect of transition.effects) {
        if (effect.type === 'tavern_absence') $gameTemp._drylandPendingAbsences = effect.heroIds.slice();
      }
    }
    if (!transition.ok) reportRejection(action.type, transition);
    else $gameVariables.setValue(24, 'ok');
    return transition;
  }
  const campaign = () => global.$gameSystem?._dryland?.campaign;
  const publicView = () => rules.playerView(campaign());
  const plugin = (interpreter, name, command, args) => PluginManager.callCommand(interpreter, name, command, args);
  function pictureText(interpreter, id, text, position = 'center') {
    if (!$gameScreen.picture(id)) return;
    const args = { 'PictureIDs:arraynum': JSON.stringify([id]), 'Padding:eval': '8' };
    for (const anchor of ['upperleft', 'up', 'upperright', 'left', 'center', 'right', 'lowerleft', 'down', 'lowerright']) {
      args[`${anchor}:json`] = JSON.stringify(anchor === position ? text : '');
    }
    plugin(interpreter, 'VisuMZ_1_MessageCore', 'PictureTextChange', args);
  }
  function focusSettings(interpreter, id) {
    const tone = brightness => JSON.stringify({
      'Duration:num': '0', 'easingType:str': 'Linear', 'TargetX:str': 'Unchanged', 'TargetY:str': 'Unchanged',
      'TargetScaleX:str': 'Unchanged', 'TargetScaleY:str': 'Unchanged', 'TargetOpacity:str': 'Unchanged', 'BlendMode:num': '-1',
      'TargetToneRed:str': String(brightness), 'TargetToneGreen:str': String(brightness), 'TargetToneBlue:str': String(brightness), 'TargetToneGray:str': '0'
    });
    plugin(interpreter, 'VisuMZ_2_PictureChoices', 'ChangePictureChoiceSettingsOne', {
      'PictureIDs:arraynum': JSON.stringify([id]), 'OnSelectSettings:struct': tone(65), 'OnDeselectSettings:struct': tone(0)
    });
  }
  function refreshFormationVariables() {
    const view = publicView();
    $gameVariables.setValue(25, view.canDepart);
    $gameVariables.setValue(28, view.formation.selectedHeroIds.includes($gameVariables.value(22)));
    $gameVariables.setValue(29, view.formation.automatic);
    return view;
  }
  function clearOverlay() {
    for (let id = 71; id <= 89; id++) $gameScreen.erasePicture(id);
  }
  function showFormation(interpreter) {
    const view = refreshFormationVariables();
    const pending = $gameTemp._drylandPendingAbsences || [];
    delete $gameTemp._drylandPendingAbsences;
    const reduced = global.matchMedia('(prefers-reduced-motion: reduce)').matches;
    $gameVariables.setValue(47, reduced);
    if (pending.length) $gameTemp._drylandAbsencePictures = reduced ? [] : pending.map(id => 9 + Number(id.slice(1)));
    clearOverlay();
    $gameScreen.erasePicture(18);
    for (const [index, hero] of view.heroes.entries()) {
      const id = 10 + index;
      $gameVariables.setValue(48 + index, pending.includes(hero.id));
      if (!hero.alive) {
        if (!$gameTemp._drylandAbsencePictures?.includes(id)) $gameScreen.erasePicture(id);
        $gameScreen.erasePicture(30 + index);
        continue;
      }
      const picture = $gameScreen.picture(id);
      if (!picture) continue;
      $gameScreen.showPicture(30 + index, 'Dryland_Tag', 1, picture.x(), picture.y() + 151, 100, 100, 255, 0);
      pictureText(interpreter, 30 + index, `\\FS[18]${hero.name}${hero.selected ? ' ✓' : ''}`);
      focusSettings(interpreter, id);
    }
    pictureText(interpreter, 40, `\\FS[20]Grupo ${view.formation.selectedHeroIds.length}/${view.formation.required}${view.formation.automatic ? ' · Auto' : ''}`);
    for (const [id, label] of [[41, 'Destinos'], [42, 'Elenco'], [43, 'Partir']]) {
      pictureText(interpreter, id, `\\FS[22]${label}`);
      focusSettings(interpreter, id);
    }
    const destination = Object.values(view.destinations).find(route => route.selected);
    pictureText(interpreter, 44, `\\FS[18]${destination?.name || 'Destino não escolhido'}`);
    $gameScreen.tintPicture(43, view.canDepart ? [0, 0, 0, 0] : [-70, -70, -70, 180], 0);
    const depart = $gameScreen.picture(43);
    if (depart) $gameScreen.movePicture(43, 1, depart.x(), depart.y(), depart.scaleX(), depart.scaleY(), view.canDepart ? 255 : 100, 0, 0, 0);
  }
  function showPanel(interpreter, title, body) {
    clearOverlay();
    $gameScreen.showPicture(71, 'Dryland_Panel', 1, 640, 320, 100, 100, 255, 0);
    pictureText(interpreter, 71, `\\FS[28]${title}\n\n\\FS[22]${body}`, 'upperleft');
  }
  // The Common Event owns all fade movements. Cleanup observes their native
  // opacity and never changes campaign facts or restarts consumed effects.
  const updatePictures = Game_Screen.prototype.updatePictures;
  Game_Screen.prototype.updatePictures = function() {
    updatePictures.call(this);
    if (!$gameTemp?._drylandAbsencePictures?.length) return;
    $gameTemp._drylandAbsencePictures = $gameTemp._drylandAbsencePictures.filter(id => {
      const picture = this.picture(id);
      if (picture && picture.opacity() > 0) return true;
      this.erasePicture(id);
      return false;
    });
  };
  const terminateMap = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    for (const id of $gameTemp._drylandAbsencePictures || []) $gameScreen.erasePicture(id);
    $gameTemp._drylandAbsencePictures = [];
    terminateMap.call(this);
  };
  // Source rectangles keep the existing hero pixels; only native sprites crop.
  const memorialCrops = {"H1":[545,30,550,693],"H2":[735,540,620,782],"H3":[355,30,480,605],"H4":[750,675,550,694],"H5":[430,400,560,706],"H6":[495,100,760,958],"H7":[750,470,440,555],"H8":[320,40,560,706]};
  const memorialBustCrop = crop => [Math.max(0, crop[0] - crop[2] * 0.3), crop[1], crop[2] * 1.6, crop[3] * 1.6];
  function sectionText(id) {
    const location = registry.locations[id];
    return $dataCommonEvents[location.commonEventId].list.slice(location.start, location.end)
      .filter(command => command.code === 401).map(command => command.parameters[0]).join('\n');
  }
  function wrapCaption(text, size) {
    const measure = new Bitmap(1, 1);
    measure.fontFace = $gameSystem.mainFontFace(); measure.fontSize = size;
    const lines = [''];
    for (const word of text.split(/\s+/)) {
      const lastLine = lines[lines.length - 1];
      const next = lastLine ? `${lastLine} ${word}` : word;
      if (measure.measureTextWidth(next) > 280 && lastLine) lines.push(word);
      else lines[lines.length - 1] = next;
    }
    measure.destroy();
    return lines.join('\n');
  }
  function observeMemorial(interpreter, target) {
    if (campaign().phase !== 'memorial') return;
    const dead = Object.keys(memorialCrops).filter(id => campaign().deadHeroIds.includes(id));
    if (target === 'memorial') {
      const small = dead.length <= 4;
      $gameVariables.setValue(62, small);
      $gameTemp._drylandMemorial = { dead, ready: false };
      for (const [index, id] of Object.keys(memorialCrops).entries()) {
        const slot = dead.indexOf(id), columns = Math.min(4, dead.length);
        const x = 640 + (slot % 4 - (columns - 1) / 2) * 310;
        const top = small ? 70 : Math.floor(slot / 4) * 290;
        const height = small ? 300 : 180, scale = height / 1404;
        for (const [base, value] of [[80,slot >= 0],[88,x],[96,top + 495 * scale],
          [104,top + height / 2],[112,x-150],[120,top+(small?245:110)],
          [128,x + (slot % 2 ? 30 : -30)],[136,top + 495 * scale - 20]]) $gameVariables.setValue(base + index, value);
      }
    } else if (target === 'memorial_busts') {
      for (const id of dead) {
        const index = Number(id.slice(1)) - 1;
        if ($gameScreen.picture(10 + index)) $gameScreen.picture(10 + index)._drylandCrop = memorialBustCrop(memorialCrops[id]);
        const picture = $gameScreen.picture(30 + index);
        picture._drylandCrop = [0, 0, 300, 176];
        const context = campaign().deathLocations[id], hero = registry.catalog.heroes[id];
        const cause = wrapCaption(sectionText(`memorial_cause.${context.encounterId}`), 18);
        const location = wrapCaption(`${registry.catalog.destinations[context.routeId].name} · ${registry.catalog.encounters[context.encounterId].name}`, 16);
        pictureText(interpreter, 30 + index, `\\FS[22]${hero.name}\n\\FS[18]${cause}\n\\FS[16]${location}`, 'upperleft');
      }
    } else if (target === 'memorial_capture') {
      $gameTemp._drylandMemorial.previous = Object.fromEntries(dead.map(id => {
        const picture = $gameScreen.picture(9 + Number(id.slice(1)));
        return [id, { crop: picture._drylandCrop, x: picture.x(), y: picture.y(), scale: picture.scaleX() }];
      }));
    } else if (target === 'memorial_portraits') {
      for (const id of dead) {
        const picture = $gameScreen.picture(9 + Number(id.slice(1)));
        picture._drylandCrop = memorialCrops[id];
        if (!$gameVariables.value(47)) picture._drylandCrossfade = $gameTemp._drylandMemorial.previous[id];
      }
    } else if (target === 'memorial_ready') {
      $gameTemp._drylandMemorial.ready = true;
      consumeConfirmation();
    }
  }
  // A temporary native Sprite retains the previous crop while Move Picture
  // fades in the new one. It belongs to that picture and never changes facts.
  const updatePictureSprite = Sprite_Picture.prototype.update;
  Sprite_Picture.prototype.update = function() {
    updatePictureSprite.call(this);
    const picture = this.picture(), cue = picture?._drylandCrossfade;
    if (picture?._drylandCrop) this.setFrame(...picture._drylandCrop);
    if (this._drylandGhost && (this._drylandGhostOwner !== picture || !cue || picture.opacity() >= 255)) {
      this._drylandGhost.destroy(); this._drylandGhost = null;
    }
    if (!cue || picture.opacity() >= 255 || !this.parent) return;
    if (!this._drylandGhost) {
      this._drylandGhost = new Sprite(ImageManager.loadPicture(picture.name()));
      this._drylandGhostOwner = picture;
      this._drylandGhost.anchor.set(0.5);
      this._drylandGhost.x = cue.x; this._drylandGhost.y = cue.y;
      this._drylandGhost.scale.set(cue.scale / 100);
      this.parent.addChildAt(this._drylandGhost, this.parent.getChildIndex(this));
    }
    this._drylandGhost.setFrame(...cue.crop);
    this._drylandGhost.opacity = 255 - picture.opacity();
  };
  function observeCredits(interpreter, target) {
    if (campaign().phase !== 'campaign_complete') return;
    if (target === 'credits') {
      $gameTemp._drylandCredits = { completed: false };
      pictureText(interpreter, 40, sectionText('credits.native'), 'center');
      pictureText(interpreter, 41, '\\FS[22]Pular créditos');
      focusSettings(interpreter, 41);
      consumeConfirmation();
    } else if (target === 'credits_finish') {
      const choice = SceneManager._scene._choiceListWindow;
      if ($gameTemp._drylandCredits?.completed || $gameMessage._drylandChoices?.kind !== 'credits' || !choice?.isOpenAndActive()) return;
      $gameTemp._drylandCredits.completed = true;
      choice.deactivate();
      choice.callOkHandler();
      consumeConfirmation();
    } else if (target === 'credits_cleanup') {
      for (let id = 2; id <= 59; id++) $gameScreen.erasePicture(id);
      delete $gameTemp._drylandCredits;
      consumeConfirmation();
    }
  }

  PluginManager.registerCommand('Dryland_EventBridge', 'Observe', function(args) {
    if (!global.$gameSystem?._dryland) return;
    const checked = validateObserve(args);
    if (!checked.ok) return reportRejection('Observe', checked);
    if (args.target === 'interface_hidden' || args.target === 'interface_visible') {
      setInterfaceHidden(args.target === 'interface_hidden');
      return;
    }
    if (!ensureCampaign('Observe')) return;
    // Queued ChoiceCmnEvts callbacks never restore an obsolete focus or stage.
    if ($dataCommonEvents.slice(30, 38).some(event => event?.list === this._list)) return;
    if (args.target === 'encounter') {
      const view = publicView();
      $gameVariables.setValue(26, view.canRetreat);
      $gameVariables.setValue(31, view.phase);
      $gameVariables.setValue(32, view.currentEncounter?.id || '');
      $gameVariables.setValue(33, Boolean(view.reading));
      $gameVariables.setValue(34, campaign().dungeonId || '');
      $gameVariables.setValue(47, global.matchMedia('(prefers-reduced-motion: reduce)').matches);
      $gameVariables.setValue(56, campaign().reading?.passageIds[campaign().reading.index] || '');
      $gameVariables.setValue(57, campaign().reading?.sceneId || '');
      $gameVariables.setValue(58, campaign().reading?.index ?? -1);
      $gameVariables.setValue(59, campaign().endingId || '');
      $gameVariables.setValue(60, campaign().phase === 'epilogue' ? campaign().reading.sceneId.split('.')[1] : '');
      const candidates = campaign().phase === 'sacrifice_choice' ? campaign().partyIds : [];
      $gameVariables.setValue(35, candidates.length);
      for (let index = 0; index < 3; index++) {
        $gameVariables.setValue(36 + index, candidates[index] || '');
        $gameVariables.setValue(39 + index, 640 + (index - (candidates.length - 1) / 2) * 340);
      }
      $gameVariables.setValue(42, 350);
      $gameVariables.setValue(43, 585);
      clearOverlay();
      if (campaign().phase !== 'memorial' || !$gameTemp._drylandMemorial?.ready) {
        for (let id = 10; id <= 21; id++) $gameScreen.erasePicture(id);
        for (let id = 30; id <= 59; id++) $gameScreen.erasePicture(id);
      }
      if (view.phase === 'encounter_choice') {
        const total = registry.catalog.destinations[campaign().dungeonId].landmarkTotal;
        $gameScreen.showPicture(40, 'Dryland_EncounterTitle', 1, 640, 52, 100, 100, 255, 0);
        pictureText(this, 40, `\\FS[22]Encontro ${campaign().position}/${total} — ${view.currentEncounter.name}`);
        for (const [id, x, label] of [[41, 920, 'Rever descrição'], [42, 1150, 'Recuar']]) {
          if (id === 42 && !view.canRetreat) continue;
          $gameScreen.showPicture(id, 'Dryland_Button', 1, x, 128, 100, 100, 255, 0);
          pictureText(this, id, `\\FS[20]${label}`);
          focusSettings(this, id);
        }
      }
    } else if (args.target === 'formation' && campaign().phase === 'formation') showFormation(this);
    else if (args.target === 'destinations') {
      if (campaign().phase === 'dungeon_intro') {
        for (let id = 10; id <= 59; id++) $gameScreen.erasePicture(id);
        clearOverlay();
        const file = { physical: 'Dryland_Church', supernatural: 'Dryland_Figtree', final: 'Dryland_Council' }[campaign().dungeonId];
        $gameScreen.showPicture(1, file, 0, 0, 0, 100, 100, 255, 0);
      } else {
        for (const [index, route] of Object.values(publicView().destinations).entries()) {
          pictureText(this, 78 + index, `\\FS[20]${route.landmarks.traversed}/${route.landmarks.total} · ${route.status === 'locked' ? 'Bloqueado' : route.status === 'completed' ? 'Concluído' : route.selected ? 'Selecionado' : 'Disponível'}`);
          focusSettings(this, 72 + index);
          if (route.status !== 'available') $gameScreen.tintPicture(72 + index, [-70, -70, -70, 180], 0);
        }
        focusSettings(this, 81);
      }
    } else if (args.target.startsWith('memorial')) {
      observeMemorial(this, args.target);
    } else if (args.target.startsWith('credits')) {
      observeCredits(this, args.target);
    } else if (args.target === 'closing') {
      delete $gameTemp._drylandMemorial;
      plugin(this, 'VisuMZ_1_MessageCore', 'MessageWindowProperties', { 'Rows:num': '4', 'Width:num': '1280', 'WordWrap:str': 'true' });
      clearOverlay();
      for (let id = 2; id <= 59; id++) $gameScreen.erasePicture(id);
    } else if (args.target === 'roster') {
      showPanel(this, 'Elenco', publicView().heroes.map(hero => `${hero.name} — ${hero.alive ? 'Presente' : 'Morto'}${hero.selected ? ' · No grupo' : ''}`).join('\n'));
    }
  });
  PluginManager.registerCommand('Dryland_EventBridge', 'CaptureContext', function() {
    if (!ensureCampaign('CaptureContext')) return;
    this._drylandContext = campaign().sequence;
  });
  PluginManager.registerCommand('Dryland_EventBridge', 'Checkpoint', function(args) {
    if (!ensureCampaign('Checkpoint')) return;
    const state = campaign();
    let presentationActive = false;
    for (let current = $gameMap._interpreter; current; current = current._childInterpreter) {
      if (current._drylandPresentation && current.isRunning()) presentationActive = true;
    }
    const checked = validateCheckpoint(args.reason, state, {
      scene: SceneManager._scene?.constructor.name, interpreterRunning: this.isRunning(),
      messageBusy: $gameMessage.isBusy(), presentationActive
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
      const result = apply({ type: 'BEGIN', seed: pendingSeed ?? (Date.now() >>> 0), expectedSequence: 0 });
      if (result.ok) pendingSeed = null;
      return result;
    }
    const context = validateCapturedContext(this._drylandContext);
    if (!context.ok) return reportRejection(args.action, context);
    const action = { type: args.action, expectedSequence: this._drylandContext };
    if (checked.field) action[checked.field] = checked.value;
    const result = apply(action);
    if (!$gameTemp._drylandInvalid) refreshFormationVariables();
    return result;
  });
  PluginManager.registerCommand('Dryland_EventBridge', 'Present', function() {
    if (!ensureCampaign('Present')) return;
    const state = $gameSystem._dryland.campaign;
    const requested = $gameVariables.value(21);
    const hero = $gameVariables.value(22);
    const inspection = state.phase === 'formation' && state.sequence === this._drylandContext &&
      rules.playerView(state).formation.livingHeroIds.includes(hero) &&
      ['profile', 'speech', 'selection', 'party_full'].some(prefix => requested === `${prefix}.${hero}`);
    const encounter = publicView().currentEncounter;
    const choices = state.phase === 'encounter_choice' && state.sequence === this._drylandContext && requested !== 'reread';
    const reread = state.phase === 'encounter_choice' && state.sequence === this._drylandContext && requested === 'reread';
    const observational = inspection || choices || reread;
    const passageId = inspection ? requested : choices ? `choices.${encounter.id}` : reread ? registry.catalog.scenes[`encounter.${encounter.id}`].passageIds[0] : state.reading?.passageIds[state.reading.index];
    const location = registry.locations[passageId];
    const commands = location && $dataCommonEvents[location.commonEventId]?.list;
    const marker = commands?.[location?.start]?.parameters?.[0];
    if (!location || typeof marker !== 'string' || !marker.split('\n').includes('@dryland-section ' + passageId) ||
        commands[location.end]?.parameters?.[0] !== '@dryland-end') {
      reportRejection('Present', commandError('missing_section'), { passageId: passageId || null });
      $gameTemp._drylandInvalid = true;
      return;
    }
    if (inspection) {
      for (let id = 10; id <= 17; id++) $gameScreen.erasePicture(id);
      for (let id = 30; id <= 44; id++) $gameScreen.erasePicture(id);
    }
    if (reread) for (let id = 40; id <= 59; id++) $gameScreen.erasePicture(id);
    const list = clone($dataCommonEvents[location.commonEventId].list.slice(location.start, location.end));
    list.forEach(command => { command.indent -= location.indent; });
    list.push({ code: 0, indent: 0, parameters: [] });
    this.setupChild(list, this._eventId);
    this._childInterpreter._drylandContext = state.sequence;
    this._childInterpreter._drylandPresentation = { passageId, expectedSequence: state.sequence, observational, choices };
  });
  const clearInterpreter = Game_Interpreter.prototype.clear;
  Game_Interpreter.prototype.clear = function() {
    clearInterpreter.call(this);
    delete this._drylandPresentation;
    delete this._drylandErrorPresentation;
    delete this._drylandContext;
    delete this._drylandChoiceKind;
  };
  const terminateInterpreter = Game_Interpreter.prototype.terminate;
  Game_Interpreter.prototype.terminate = function() {
    const presentation = this._drylandPresentation;
    delete this._drylandPresentation;
    terminateInterpreter.call(this);
    if (presentation && !presentation.observational) apply({ type: 'COMPLETE_PASSAGE', passageId: presentation.passageId, expectedSequence: presentation.expectedSequence });
  };

  // The editor owns the branches; this adapter expands catalog-backed choices
  // and maps their results back to the authored branch, without executing text.
  const comment = Game_Interpreter.prototype.command108;
  Game_Interpreter.prototype.command108 = function(params) {
    const match = /^@dryland-choice (formation|hero|destinations|roster|retreat|sacrifice|ending|credits)$/.exec(params[0]);
    if (match) this._drylandChoiceKind = match[1];
    return comment.call(this, params);
  };
  const setupChoices = Game_Interpreter.prototype.setupChoices;
  const continuousChoices = Game_Interpreter.prototype.addContinuousShowChoices;
  Game_Interpreter.prototype.addContinuousShowChoices = function() {
    return this._drylandChoiceOptions || continuousChoices.call(this);
  };
  Game_Interpreter.prototype.setupChoices = function(params) {
    const kind = this._drylandPresentation?.choices ? 'approaches' : this._drylandChoiceKind;
    delete this._drylandChoiceKind;
    if (!kind) { delete $gameMessage._drylandChoices; return setupChoices.call(this, params); }
    const view = refreshFormationVariables();
    const entries = [];
    const sequence = this._drylandContext;
    if (kind === 'formation') {
      for (const hero of view.heroes.filter(hero => hero.alive)) {
        const index = Number(hero.id.slice(1)) - 1;
        entries.push({ label: `${hero.name}<Bind Picture: ${10 + index}><Choice Common Event: ${30 + index}>`, branch: 0, heroId: hero.id, enabled: true });
      }
      for (const [branch, picture, label, enabled] of [[1, 41, 'Destinos', true], [2, 42, 'Elenco', true], [3, 43, 'Partir', view.canDepart]]) {
        entries.push({ label: `${label}<Bind Picture: ${picture}>`, branch, enabled });
      }
      entries[0].label += '<Hide Choice Window>';
    } else if (kind === 'approaches') {
      for (const [index, label] of params[0].entries()) {
        const id = 50 + index;
        $gameScreen.showPicture(id, 'Dryland_Approach', 1, 640, 375 + index * 115, 100, 100, 255, 0);
        pictureText(this, id, `\\FS[22]${label}`);
        focusSettings(this, id);
        entries.push({ label: `${label}<Bind Picture: ${id}>`, branch: index, value: view.currentEncounter.approachIds[index], enabled: true });
      }
      entries[0].label += '<Hide Choice Window>';
      entries.push({ label: 'Rever descrição<Bind Picture: 41>', branch: 3, value: 'reread', enabled: true });
      if (view.canRetreat) entries.push({ label: 'Recuar<Bind Picture: 42>', branch: 4, value: 'retreat', enabled: true });
    } else if (kind === 'sacrifice') {
      for (const [index, heroId] of campaign().partyIds.entries()) {
        const id = 50 + index, label = `Sacrificar ${registry.catalog.heroes[heroId].name}`;
        pictureText(this, id, `\\FS[20]${label}`);
        focusSettings(this, id);
        entries.push({ label: `${label}<Bind Picture: ${id}>`, branch: 0, heroId, enabled: !campaign().deadHeroIds.includes(heroId) });
      }
      if (entries.length) entries[0].label += '<Hide Choice Window>';
    } else if (kind === 'credits') {
      entries.push({ label: `${params[0][0]}<Bind Picture: 41><Hide Choice Window>`, branch: 0, enabled: true });
    } else if (kind === 'retreat' || kind === 'ending') {
      params[0].forEach((label, branch) => entries.push({ label, branch, enabled: true }));
    } else if (kind === 'hero') {
      entries.push({ label: 'Conversar', branch: 0, enabled: true }, {
        label: view.formation.selectedHeroIds.includes($gameVariables.value(22)) ? 'Retirar do grupo' : 'Selecionar', branch: 1, enabled: !view.formation.automatic
      });
    } else if (kind === 'destinations') {
      for (const [index, route] of Object.values(view.destinations).entries()) entries.push({
        label: `${route.name}<Bind Picture: ${72 + index}>`, branch: 0, dungeonId: route.id, enabled: route.status === 'available'
      });
      entries[0].label += '<Hide Choice Window>';
      entries.push({ label: 'Fechar<Bind Picture: 81>', branch: 1, enabled: true });
    } else entries.push({ label: 'Fechar', branch: 0, enabled: true });
    const options = clone(params);
    options[0] = entries.map(entry => entry.label);
    options[2] = kind === 'formation' ? Math.max(0, entries.findIndex(entry =>
      (entry.heroId || `utility:${entry.branch}`) === ($gameTemp._drylandFormationFocus || $gameVariables.value(22)))) : 0;
    if (kind === 'approaches') options[2] = Math.max(0, entries.findIndex(entry => entry.value === $gameTemp._drylandEncounterFocus));
    options[1] = ['formation', 'approaches', 'sacrifice', 'ending', 'credits'].includes(kind) ? -1 : -2;
    $gameMessage._drylandChoices = { kind, entries, sequence };
    // MessageCore obtains its parameters from addContinuousShowChoices, even
    // when setupChoices received parameters. Keep that expansion local.
    this._drylandChoiceOptions = options;
    try { setupChoices.call(this, options); } finally { delete this._drylandChoiceOptions; }
    $gameMessage.setChoiceCallback(index => {
      const entry = entries[index];
      if (sequence !== campaign().sequence || !entry?.enabled) { this._branch[this._indent] = -2; return; }
      if (entry.heroId) $gameVariables.setValue(22, entry.heroId);
      if (entry.dungeonId) $gameVariables.setValue(30, entry.dungeonId);
      if (entry.value) $gameVariables.setValue(23, entry.value);
      this._branch[this._indent] = entry.branch;
      refreshFormationVariables();
    });
  };
  const clearMessage = Game_Message.prototype.clear;
  Game_Message.prototype.clear = function() {
    clearMessage.call(this);
    delete this._drylandChoices;
  };
  const choiceEnabled = Window_ChoiceList.prototype.isCommandEnabled;
  Window_ChoiceList.prototype.isCommandEnabled = function(index) {
    const choices = $gameMessage._drylandChoices;
    return (!choices || (choices.sequence === campaign().sequence && choices.entries[index]?.enabled)) && choiceEnabled.call(this, index);
  };
  Window_ChoiceList.prototype.isCurrentItemEnabled = function() {
    return this.isCommandEnabled(this.index());
  };
  for (const [name, direction] of [['cursorRight', 1], ['cursorLeft', -1]]) {
    const original = Window_ChoiceList.prototype[name];
    Window_ChoiceList.prototype[name] = function(wrap) {
      if ($gameMessage._drylandChoices?.kind === 'formation') this.select((this.index() + direction + this.maxItems()) % this.maxItems());
      else original.call(this, wrap);
    };
  }
  const selectChoice = Window_ChoiceList.prototype.select;
  Window_ChoiceList.prototype.select = function(index) {
    if (interfaceHidden()) return;
    selectChoice.call(this, index);
    const choices = $gameMessage._drylandChoices;
    if (choices?.kind === 'formation' && choices.sequence === campaign().sequence && choices.entries[index]) {
      const entry = choices.entries[index];
      $gameTemp._drylandFormationFocus = entry.heroId || `utility:${entry.branch}`;
      if (entry.heroId) $gameVariables.setValue(22, entry.heroId);
    }
    if (choices?.kind === 'approaches' && choices.sequence === campaign().sequence && choices.entries[index]) {
      $gameTemp._drylandEncounterFocus = choices.entries[index].value;
    }
  };

  // A confirmation belongs to one native window. Require physical release
  // before the next window accepts it, including PictureChoices mouse clicks.
  const heldKeys = new Set();
  let primaryHeld = false;
  for (const [name, down] of [['_onMouseDown', true], ['_onMouseUp', false]]) {
    const original = TouchInput[name];
    TouchInput[name] = function(event) {
      if (event.button === 0) primaryHeld = down;
      original.call(this, event);
    };
  }
  let releaseRequired = false;
  for (const [name, down] of [['_onKeyDown', true], ['_onKeyUp', false]]) {
    const original = Input[name];
    Input[name] = function(event) {
      if (down) heldKeys.add(event.keyCode); else heldKeys.delete(event.keyCode);
      original.call(this, event);
    };
  }
  const lostFocus = Input._onLostFocus;
  Input._onLostFocus = function() { heldKeys.clear(); primaryHeld = false; lostFocus.call(this); };
  const inputUpdate = Input.update;
  Input.update = function() {
    if (releaseRequired && heldKeys.size === 0 && !primaryHeld) {
      releaseRequired = false;
      Input.clear();
      TouchInput.clear();
    }
    inputUpdate.call(this);
  };
  function consumeConfirmation() { releaseRequired = true; Input.clear(); }
  const processOk = Window_ChoiceList.prototype.processOk;
  Window_ChoiceList.prototype.processOk = function() {
    if (releaseRequired || interfaceHidden() || !this.isOpenAndActive() || SceneManager._scene.isBusy()) return;
    if (!this.isCurrentItemEnabled()) { this.playBuzzerSound(); return; }
    processOk.call(this);
    consumeConfirmation();
  };
  const messageTriggered = Window_Message.prototype.isTriggered;
  Window_Message.prototype.isTriggered = function() { return !releaseRequired && messageTriggered.call(this); };
  const terminateMessage = Window_Message.prototype.terminateMessage;
  Window_Message.prototype.terminateMessage = function() { terminateMessage.call(this); consumeConfirmation(); };

  let bustToken = 0;
  function speakerBust(interpreter, speaker) {
    const hero = Object.values(registry.catalog.heroes).find(hero => hero.name === speaker);
    const id = hero?.id || ({ 'Ivaí': 'ivai', 'Pérola': 'perola', 'Floraí': 'florai', 'Andirá': 'andira' }[speaker] || null);
    const token = ++bustToken;
    $gameScreen.erasePicture(18);
    if (!id) return;
    const bitmap = ImageManager.loadPicture(`Dryland_${id}`);
    bitmap.addLoadListener(() => {
      if (token !== bustToken || !interpreter._drylandPresentation) return;
      plugin(interpreter, 'VisuMZ_2_VNPictureBusts', 'Basic_EnterBust', {
        'PictureID:eval': '18', 'PictureName:str': `Dryland_${id}`, 'Origin:str': 'Bust', 'Position:num': '5',
        'StartOffsetX:eval': '0', 'StartOffsetY:eval': '0', 'EasingType:str': 'Linear', 'HorzMirror:str': 'None', 'Duration:eval': '0'
      });
      // Preserve the complete reflected figure within the water silhouette.
      const scale = String((id === 'andira' ? 48000 : 100000) / bitmap.height);
      plugin(interpreter, 'VisuMZ_2_VNPictureBusts', 'Scale_ScaleTo', {
        'PictureID:arrayeval': '["18"]', 'TargetScaleX:str': scale, 'TargetScaleY:str': scale, 'Duration:eval': '0'
      });
      plugin(interpreter, 'VisuMZ_2_VNPictureBusts', 'Move_MoveToCoordinates', {
        'PictureID:arrayeval': '["18"]', 'TargetX:str': '640', 'TargetY:str': id === 'andira' ? '500' : '1070', 'EasingType:str': 'Linear', 'FlipDirection:str': 'None', 'Duration:eval': '0'
      });
    });
  }
  const showText = Game_Interpreter.prototype.command101;
  Game_Interpreter.prototype.command101 = function(params) {
    const presentation = this._drylandPresentation;
    const state = $gameSystem?._dryland?.campaign;
    const discovery = state?.phase === 'dungeon_complete' && state.reading?.sceneId !== 'map.reveal';
    const closingSpeaker = ['council', 'epilogue'].includes(state?.phase);
    if (presentation && (presentation.observational || presentation.passageId.startsWith('farewell.') || discovery || closingSpeaker) && !$gameMessage.isBusy()) speakerBust(this, params[4]);
    return showText.call(this, params);
  };
  function interfaceHidden() {
    return Boolean(global.$gameTemp?._drylandInterfaceHidden || SceneManager._scene?._messageWindow?.scale.x === 0);
  }
  function setInterfaceHidden(hidden) {
    $gameTemp._drylandInterfaceHidden = hidden;
    if (!hidden) SceneManager._scene._choiceListWindow.applyHideChoiceWindow();
    consumeConfirmation();
  }
  // MZ's meVolume setter reads _currentMe, but its playMe/stopMe lifecycle
  // does not maintain that descriptor. Retain the playing cue so changing
  // Temas also updates the current native buffer, including immediate mute.
  const playMe = AudioManager.playMe;
  AudioManager.playMe = function(me) {
    playMe.call(this, me);
    this._currentMe = this._meBuffer ? { ...me } : null;
  };
  const stopMe = AudioManager.stopMe;
  AudioManager.stopMe = function() {
    stopMe.call(this);
    this._currentMe = null;
  };
  const pictureUiUpdate = Sprite_Picture.prototype.update;
  Sprite_Picture.prototype.update = function() {
    pictureUiUpdate.call(this);
    if (interfaceHidden() && ((this._pictureId >= 30 && this._pictureId <= 59) ||
        (this._pictureId >= 71 && this._pictureId <= 89))) this.visible = false;
  };
  const cursorWithVisibility = Window_ChoiceList.prototype.processCursorMove;
  Window_ChoiceList.prototype.processCursorMove = function() {
    if (!interfaceHidden()) cursorWithVisibility.call(this);
  };
  const touchWithVisibility = Window_ChoiceList.prototype.processTouch;
  Window_ChoiceList.prototype.processTouch = function() {
    if (!interfaceHidden()) touchWithVisibility.call(this);
  };
  const cancelWithVisibility = Window_ChoiceList.prototype.processCancel;
  Window_ChoiceList.prototype.processCancel = function() {
    if (!interfaceHidden() && !releaseRequired) cancelWithVisibility.call(this);
  };
  const waitWithVisibility = Game_Interpreter.prototype.updateWait;
  Game_Interpreter.prototype.updateWait = function() {
    if (interfaceHidden() && this._list === $dataCommonEvents[62]?.list) return true;
    return waitWithVisibility.call(this);
  };
  const executeCommand = Game_Interpreter.prototype.executeCommand;
  Game_Interpreter.prototype.executeCommand = function() {
    if ($gameTemp._drylandInvalid && !this._drylandErrorPresentation) return false;
    return executeCommand.call(this);
  };
  function presentInvalidCampaign(scene) {
    const interpreter = $gameMap._interpreter;
    interpreter.clear();
    scene._messageWindow.terminateMessage();
    scene._choiceListWindow.deactivate();
    scene._choiceListWindow.close();
    // The failure surface replaces the hidden story UI. Restore its native
    // windows directly: the normal visibility common event is behind the
    // invalid-campaign barrier and cannot be responsible for this transition.
    $gameTemp._drylandInterfaceHidden = false;
    for (const window of [scene._messageWindow, scene._choiceListWindow, scene._nameBoxWindow]) {
      window?.scale.set(1, 1);
    }
    for (let id = 2; id <= 89; id++) $gameScreen.erasePicture(id);
    interpreter.setup($dataCommonEvents[66].list, 0);
    interpreter._drylandErrorPresentation = true;
    $gameTemp._drylandInvalidPresented = true;
    consumeConfirmation();
  }
  function currentPresentation() {
    for (let interpreter = $gameMap._interpreter; interpreter; interpreter = interpreter._childInterpreter) {
      if (interpreter._drylandPresentation && !interpreter._drylandPresentation.observational) return interpreter;
    }
    return null;
  }
  function canSkipPresentation(scene) {
    const state = campaign(), cursor = state?.reading, interpreter = currentPresentation();
    const id = cursor?.passageIds?.[cursor.index];
    return Boolean(!inFlight && !$gameTemp._drylandInvalid && !interfaceHidden() && !scene.isBusy() &&
      scene._messageWindow.pause && scene._messageWindow._waitCount === 0 && interpreter &&
      interpreter._drylandPresentation.expectedSequence === state?.sequence && id && Array.isArray(state.seenPassageIds) && state.seenPassageIds.includes(id));
  }
  function skipPresentation(scene) {
    if (releaseRequired || !canSkipPresentation(scene)) return;
    const interpreter = currentPresentation();
    const result = apply({ type: 'SKIP_SEEN_TEXT', expectedSequence: campaign().sequence });
    if (!result.ok) return;
    delete interpreter._drylandPresentation;
    interpreter.terminate();
    scene._messageWindow.terminateMessage();
    consumeConfirmation();
  }
  class Window_DrylandNotice extends Window_Base {
    constructor() {
      super(new Rectangle(160, 12, 960, 90));
      this.hide();
      this._notice = null;
    }
    update() {
      super.update();
      const notice = $gameTemp._drylandLastRejection;
      if (notice !== this._notice) {
        this._notice = notice;
        this.contents.clear();
        if (notice) { this.contents.fontSize = 22; this.drawTextEx(notice.message, 0, 0, this.innerWidth); }
      }
      this.visible = Boolean(notice && !interfaceHidden() && !$gameTemp._drylandInvalid);
    }
  }
  class Window_DrylandSkip extends Window_Command {
    constructor() {
      super(new Rectangle(846, 12, 418, 62));
      this.deactivate();
      this.hide();
    }
    makeCommandList() { this.addCommand('Pular texto já lido (S)', 'skip'); }
    processCursorMove() {}
    processHandling() {}
    processTouch() {}
    update() { super.update(); this.visible = canSkipPresentation(SceneManager._scene); }
  }
  const createAllWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function() {
    createAllWindows.call(this);
    this._drylandNoticeWindow = new Window_DrylandNotice();
    this.addWindow(this._drylandNoticeWindow);
    this._drylandSkipWindow = new Window_DrylandSkip();
    this.addWindow(this._drylandSkipWindow);
  };
  Input.keyMapper[83] = 'drylandSkip';
  const updateSharedUi = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    if (this.constructor === Scene_Map && this._messageWindow) {
      // Native isReady normally runs only when a scene starts. Pictures loaded
      // by later conversations still need the native LoadError/Retry path.
      if (!ImageManager.isReady()) { consumeConfirmation(); return; }
      if ($gameTemp._drylandInvalid && !$gameTemp._drylandInvalidPresented) presentInvalidCampaign(this);
      // Delegate Tab/left-click to the native message trigger, including when
      // PictureChoices has made the choice window itself visually transparent.
      if (!releaseRequired && (Input.isTriggered('tab') || (interfaceHidden() && TouchInput.isTriggered()))) {
        this._messageWindow.isTriggered();
        consumeConfirmation();
      }
      const skip = this._drylandSkipWindow;
      if (skip?.visible && !releaseRequired && (Input.isTriggered('drylandSkip') ||
          (TouchInput.isTriggered() && skip.isTouchedInsideFrame()))) skipPresentation(this);
    }
    updateSharedUi.call(this);
  };

  Game_Player.prototype.canMove = function() { return false; };
  Scene_Map.prototype.isMenuEnabled = function() { return false; };
  Scene_Map.prototype.isFastForward = function() { return false; };
})(globalThis);
