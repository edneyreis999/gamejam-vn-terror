/*:
 * @target MZ
 * @plugindesc Afogados em Terra Seca — regras da campanha
 * @author Coreto
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
  class CatalogError extends Error {
    constructor(violations) {
      super('O catálogo da campanha é inválido.');
      this.name = 'CatalogError';
      this.violations = violations;
    }
  }
  const heroIds = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8'];
  const routeIds = ['physical', 'supernatural', 'final'];
  const encounterIds = ['A', 'B'].flatMap(pool => Array.from({ length: 8 }, (_, i) => pool + (i + 1)));
  const canonicalPairs = [
    ['strength', 'will'], ['dexterity', 'athletics'], ['perception', 'survival'], ['knowledge', 'occultism'],
    ['strength', 'knowledge'], ['dexterity', 'perception'], ['occultism', 'athletics'], ['will', 'survival']
  ];
  const approachPairs = [
    ['strength', 'dexterity', 'perception'], ['dexterity', 'survival', 'knowledge'],
    ['survival', 'athletics', 'occultism'], ['athletics', 'strength', 'will'],
    ['strength', 'dexterity', 'knowledge'], ['strength', 'survival', 'occultism'],
    ['dexterity', 'athletics', 'will'], ['survival', 'athletics', 'perception'],
    ['perception', 'knowledge', 'strength'], ['perception', 'occultism', 'dexterity'],
    ['perception', 'will', 'survival'], ['knowledge', 'occultism', 'athletics'],
    ['knowledge', 'will', 'strength'], ['occultism', 'will', 'dexterity'],
    ['perception', 'knowledge', 'survival'], ['occultism', 'will', 'athletics']
  ];
  const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);
  const uint32 = value => Number.isInteger(value) && value >= 0 && value <= 4294967295;
  function readyObject() {
    return {
      version: 1, phase: 'ready', seed: null, rngState: null,
      selectedDungeonId: null, dungeonId: null, position: null,
      draftPartyIds: [], partyIds: [], deadHeroIds: [], presentedDeathIds: [], deathLocations: {},
      assignments: { physical: Array(5).fill(null), supernatural: Array(5).fill(null), final: Array(6).fill(null) },
      progress: { physical: 0, supernatural: 0, final: 0 }, completedDungeonIds: [],
      pendingOutcome: null, reading: null, seenPassageIds: [], mapPieceIds: [],
      medallionComplete: false, endingId: null, climaxPartyIds: [], retreatReturn: null,
      sequence: 0, history: [], invariantViolations: []
    };
  }

  /** Pure campaign owner. Native presentation supplies only stable passage IDs. */
  function createRules(input) {
    const problems = [];
    for (const id of ['prologue', ...routeIds.map(id => `threshold.${id}`)]) {
      if (!Array.isArray(input?.scenes?.[id]?.passageIds) || !input.scenes[id].passageIds.length || input.scenes[id].passageIds.some(id => !hasOwn(input.passages || {}, id))) {
        problems.push({ code: 'invalid_scene_reference', id });
      }
    }
    for (const [index, id] of heroIds.entries()) {
      const hero = input?.heroes?.[id];
      if (hero?.id !== id || typeof hero.name !== 'string' || !hero.name.trim() || !same(hero.competencyIds, canonicalPairs[index])) problems.push({ code: 'invalid_hero_catalog', id });
    }
    if (!same(Object.keys(input?.heroes || {}).sort(), heroIds)) problems.push({ code: 'invalid_hero_catalog' });
    const competencies = new Set(canonicalPairs.flat());
    const counts = Object.fromEntries([...competencies].map(id => [id, 0]));
    const bodily = new Set(['strength', 'dexterity', 'survival', 'athletics']);
    for (const [index, id] of encounterIds.entries()) {
      const encounter = input?.encounters?.[id];
      const approaches = encounter?.approaches;
      if (encounter?.id !== id || encounter.pool !== id[0] || !Array.isArray(approaches) || approaches.length !== 3 ||
          approaches.some((approach, i) => approach.id !== `${id}-${i + 1}` || !competencies.has(approach.competencyId)) ||
          !same(approaches.map(approach => approach.competencyId), approachPairs[index])) problems.push({ code: 'invalid_encounter_catalog', id });
      else {
        for (const approach of approaches) counts[approach.competencyId]++;
        if (approaches.filter(approach => bodily.has(approach.competencyId)).length !== (id[0] === 'A' ? 2 : 1)) problems.push({ code: 'invalid_encounter_catalog', id });
      }
    }
    if (!same(Object.keys(input?.encounters || {}).sort(), encounterIds) || Object.values(counts).some(count => count !== 6)) problems.push({ code: 'invalid_encounter_catalog' });
    for (const id of routeIds) {
      const route = input?.destinations?.[id];
      if (route?.id !== id || route.landmarkTotal !== (id === 'final' ? 6 : 5) || typeof route.name !== 'string') problems.push({ code: 'invalid_destination_catalog', id });
    }
    if (!same(Object.keys(input?.destinations || {}).sort(), [...routeIds].sort())) problems.push({ code: 'invalid_destination_catalog' });
    if (problems.length) throw new CatalogError(problems);
    const catalog = freeze(clone(input));

    const HERO_IDS = heroIds, DUNGEON_IDS = routeIds;
    const Data = { heroes: catalog.heroes, encounters: catalog.encounters, encounterOrder: encounterIds, destinations: catalog.destinations };
    const Narrative = { scenes: catalog.scenes, passages: catalog.passages };
    const ACTION_FIELDS = {"BEGIN":["seed"],"COMPLETE_PASSAGE":["passageId"],"SKIP_SEEN_TEXT":[],"SELECT_DESTINATION":["dungeonId"],"TOGGLE_HERO":["heroId"],"DEPART":[],"ENTER_DUNGEON":[],"CHOOSE_APPROACH":["approachId"],"SELECT_VICTIM":["heroId"],"REQUEST_RETREAT":[],"CANCEL_RETREAT":[],"CONFIRM_RETREAT":[],"CHOOSE_ENDING":["ending"],"NEW_CAMPAIGN":[]};
    const UINT32_RANGE = 4294967296, MULBERRY_INCREMENT = 0x6D2B79F5;
    const deepFreeze = freeze;
    const sameArray = (a, b) => Array.isArray(a) && Array.isArray(b) && same(a, b);
    const hasPassage = id => hasOwn(catalog.passages, id);
    const historyFields = {
      BEGIN: ['seed'], COMPLETE_PASSAGE: ['passageId'], SKIP_SEEN_TEXT: ['passageId'],
      SELECT_DESTINATION: ['dungeonId'], TOGGLE_HERO: ['heroId'], DEPART: ['dungeonId'],
      ENTER_DUNGEON: ['encounterId'], CHOOSE_APPROACH: ['approachId', 'success'],
      SELECT_VICTIM: ['heroId'], REQUEST_RETREAT: [], CANCEL_RETREAT: [],
      CONFIRM_RETREAT: [], CHOOSE_ENDING: ['ending']
    };
    const historyValues = {
      seed: uint32,
      passageId: id => typeof id === 'string' && hasPassage(id),
      dungeonId: id => routeIds.includes(id),
      heroId: id => heroIds.includes(id),
      encounterId: id => encounterIds.includes(id),
      approachId: id => encounterIds.some(encounterId => Data.encounters[encounterId].approaches.some(approach => approach.id === id)),
      success: value => typeof value === 'boolean',
      ending: id => ['reunite', 'destroy'].includes(id)
    };
    function validHistoryEvent(event) {
      if (!event || typeof event.type !== 'string' || !hasOwn(historyFields, event.type)) return false;
      const fields = historyFields[event.type];
      return Object.keys(event).sort().join(',') === ['sequence', 'type', ...fields].sort().join(',') &&
        fields.every(field => historyValues[field](event[field]));
    }
    const v = (code, message, context = {}) => ({ code, message, context });
    const resultValidation = violations => freeze({ ok: violations.length === 0, violations });
    const createReadyState = () => freeze(readyObject());
    const stateKeys = Object.keys(readyObject()).sort().join(',');
    const requiredPlans = ['prologue', 'automatic_retreat', 'irati.02', 'map.reveal', 'council', 'memorial',
      ...routeIds.map(id => 'threshold.' + id),
      ...['physical', 'supernatural'].flatMap(id => ['first', 'second'].map(order => 'lover.' + id + '.' + order)),
      ...['reunite', 'destroy', 'bad'].map(id => 'ending.' + id),
      ...heroIds.flatMap(id => ['opinion.' + id, 'epilogue.' + id]),
      ...encounterIds.flatMap(id => ['encounter.' + id, 'death.' + id, ...catalog.encounters[id].approaches.flatMap(a => ['result.' + a.id + '.success', 'result.' + a.id + '.failure'])])];
    const missingPlans = requiredPlans.filter(id => !catalog.scenes[id]?.passageIds?.length || catalog.scenes[id].passageIds.some(id => !hasPassage(id)));
    if (missingPlans.length) throw new CatalogError(missingPlans.map(id => ({ code: 'invalid_scene_reference', id })));
    const missingDynamicPassages = heroIds.flatMap(id => ['farewell.' + id, 'memorial.' + id]).filter(id => !hasPassage(id));
    if (missingDynamicPassages.length) throw new CatalogError(missingDynamicPassages.map(id => ({ code: 'missing_section', id })));

    function normalizeSeed(seed) {
      if (typeof seed !== 'number' || !Number.isInteger(seed) || seed < 0 || seed > 4294967295) {
        return deepFreeze({ ok: false, error: { code: 'invalid_seed', message: 'Use um número inteiro entre 0 e 4294967295.' } });
      }
      return deepFreeze({ ok: true, seed: seed >>> 0 });
    }

    function mulberry32Step(state) {
      var nextState = (state + MULBERRY_INCREMENT) >>> 0;
      var value = nextState;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      value = ((value ^ (value >>> 14)) >>> 0) / UINT32_RANGE;
      return deepFreeze({ state: nextState, value: value });
    }

    function selectEligible(entries, random) {
      if (!Array.isArray(entries) || entries.length === 0) return deepFreeze({ ok: false, error: { code: 'empty_eligible_set', message: 'Não há encontros elegíveis para sortear.' } });
      if (typeof random !== 'number' || !Number.isFinite(random) || random < 0 || random >= 1) return deepFreeze({ ok: false, error: { code: 'invalid_random_value', message: 'O valor aleatório deve estar entre 0 e 1.' } });
      var index = Math.floor(random * entries.length);
      return deepFreeze({ ok: true, index: index, value: entries[index] });
    }

    function livingHeroIds(state) {
      return HERO_IDS.filter(function (id) { return state.deadHeroIds.indexOf(id) < 0; });
    }

    function deriveFormation(state) {
      var living = livingHeroIds(state);
      var automatic = living.length <= 3;
      return deepFreeze({
        automatic: automatic, livingHeroIds: living,
        selectedHeroIds: automatic ? living : state.draftPartyIds.filter(function (id) { return living.indexOf(id) >= 0; }),
        required: automatic ? living.length : 3
      });
    }

    function routeStatus(state, id) {
      if (state.completedDungeonIds.indexOf(id) >= 0) return 'completed';
      if (id === 'final' && state.mapPieceIds.length < 2) return 'locked';
      return 'available';
    }

    function deriveFinalCandidates(assignments) {
      var used = assignments.physical.concat(assignments.supernatural).filter(Boolean);
      return Data.encounterOrder.filter(function (id) { return used.indexOf(id) < 0; });
    }

    function findApproach(encounter, id) {
      return encounter ? encounter.approaches.find(function (item) { return item.id === id; }) || null : null;
    }

    function currentEncounter(state) {
      if (!state.dungeonId || !state.position) return null;
      var entries = state.assignments && state.assignments[state.dungeonId];
      if (!Array.isArray(entries)) return null;
      var id = entries[state.position - 1];
      return id ? Data.encounters[id] : null;
    }

    function deriveViability(partyIds, encounterOrId) {
      var encounter = typeof encounterOrId === 'string' ? Data.encounters[encounterOrId] : encounterOrId;
      var members = (partyIds || []).filter(function (id) { return Data.heroes[id]; });
      var approaches = encounter ? encounter.approaches.map(function (item) {
        return {
          id: item.id,
          viable: members.some(function (id) {
            return Data.heroes[id].competencyIds.indexOf(item.competencyId) >= 0;
          })
        };
      }) : [];
      var count = approaches.filter(function (item) { return item.viable; }).length;
      return deepFreeze({ count: count, label: count + '/3', approaches: approaches });
    }

    function validateState(state) {
      var issues = [];
      if (!state || typeof state !== 'object' || Object.keys(state).sort().join(',') !== stateKeys ||
          !Number.isSafeInteger(state.sequence) || typeof state.medallionComplete !== 'boolean' ||
          ['history', 'deadHeroIds', 'presentedDeathIds', 'draftPartyIds', 'partyIds', 'climaxPartyIds', 'seenPassageIds', 'completedDungeonIds', 'mapPieceIds', 'invariantViolations'].some(key => !Array.isArray(state[key])) ||
          ['assignments', 'progress'].some(key => !state[key] || Array.isArray(state[key]) || Object.keys(state[key]).sort().join(',') !== [...routeIds].sort().join(','))) {
        return resultValidation([v('invalid_state', 'A campanha contém um estado inválido.')]);
      }
      if (state.phase === 'ready' && !same(state, readyObject())) return resultValidation([v('invalid_state', 'O estado inicial deve estar vazio.')]);
      if (state.history.some(event => !validHistoryEvent(event))) issues.push(v('invalid_action_history', 'O histórico contém uma ação inválida.'));
      if (!state.deathLocations || Array.isArray(state.deathLocations) || !same(Object.keys(state.deathLocations).sort(), [...state.deadHeroIds].sort())) issues.push(v('invalid_death_locations', 'As mortes não correspondem ao contexto registrado.'));
      else for (const death of Object.values(state.deathLocations)) {
        if (!death || Object.keys(death).sort().join(',') !== 'approachId,encounterId,encounterPosition,routeId' || !routeIds.includes(death.routeId) ||
            !Number.isInteger(death.encounterPosition) || death.encounterPosition < 1 || state.assignments[death.routeId]?.[death.encounterPosition - 1] !== death.encounterId ||
            !catalog.encounters[death.encounterId]?.approaches.some(approach => approach.id === death.approachId)) issues.push(v('invalid_death_locations', 'O contexto da morte é inválido.'));
      }
      if (state.phase === 'formation' && livingHeroIds(state).length <= 3 && !same(state.draftPartyIds, livingHeroIds(state))) issues.push(v('invalid_party', 'A formação automática deve conter todos os sobreviventes.'));
      if (state.reading !== null && (!state.reading || Object.keys(state.reading).sort().join(',') !== 'index,passageIds,sceneId')) issues.push(v('invalid_reading_cursor', 'O cursor de leitura é inválido.'));
      if (state.phase === 'retreat_confirmation') {
        const prior = state.retreatReturn;
        if (!prior || Object.keys(prior).sort().join(',') !== 'phase,reading' || !['dungeon_intro', 'encounter_intro', 'encounter_choice'].includes(prior.phase) ||
            !validateState({ ...state, phase: prior.phase, reading: prior.reading, retreatReturn: null }).ok) issues.push(v('invalid_retreat_context', 'O contexto do recuo é inválido.'));
      } else if (state.retreatReturn !== null) issues.push(v('invalid_retreat_context', 'Não há recuo pendente.'));

      if (!state || state.version !== 1) return resultValidation([v('invalid_state_version', 'A versão do estado da campanha é inválida.', { version: state && state.version })]);
      var phases = ['ready', 'intro', 'formation', 'dungeon_intro', 'encounter_intro', 'encounter_choice', 'approach_result', 'sacrifice_choice', 'death_result', 'retreat_confirmation', 'automatic_retreat', 'dungeon_complete', 'council', 'final_choice', 'ending', 'memorial', 'epilogue', 'campaign_complete', 'invalid'];
      if (phases.indexOf(state.phase) < 0) issues.push(v('invalid_phase', 'A fase da campanha é inválida.', { phase: state.phase }));
      if (!Number.isInteger(state.sequence) || state.sequence < 0 || !Array.isArray(state.history) || state.history.some(function (event, index) {
        return !event || !Number.isInteger(event.sequence) || event.sequence !== index + 1 || event.sequence > state.sequence;
      }) || (Array.isArray(state.history) && state.history.length !== state.sequence)) {
        issues.push(v('invalid_action_history', 'O histórico de ações da campanha é inválido.', { sequence: state.sequence }));
      }
      var dead = Array.isArray(state.deadHeroIds) ? state.deadHeroIds : [];
      var party = Array.isArray(state.partyIds) ? state.partyIds : [];
      var draft = Array.isArray(state.draftPartyIds) ? state.draftPartyIds : [];
      var presented = Array.isArray(state.presentedDeathIds) ? state.presentedDeathIds : [];
      var seenPassages = Array.isArray(state.seenPassageIds) ? state.seenPassageIds : [];
      var completed = Array.isArray(state.completedDungeonIds) ? state.completedDungeonIds : [];
      var mapPieces = Array.isArray(state.mapPieceIds) ? state.mapPieceIds : [];
      var climaxParty = Array.isArray(state.climaxPartyIds) ? state.climaxPartyIds : [];
      if (!Array.isArray(state.deadHeroIds)) issues.push(v('invalid_dead_roster', 'A lista de heróis mortos é inválida.', { heroId: null }));
      if (!Array.isArray(state.partyIds) || !Array.isArray(state.draftPartyIds)) issues.push(v('invalid_party', 'A formação atual é inválida.', { heroId: null }));
      if (!Array.isArray(state.presentedDeathIds)) issues.push(v('invalid_dead_roster', 'A lista de heróis mortos é inválida.', { heroId: null }));
      if (!Array.isArray(state.seenPassageIds)) issues.push(v('invalid_reading_cursor', 'A posição de leitura é inválida.', { sceneId: null, index: 0, total: 0 }));
      if (!Array.isArray(state.completedDungeonIds)) issues.push(v('invalid_progress', 'O progresso de rota é inválido.', { dungeon: null, progress: null }));
      if (!Array.isArray(state.mapPieceIds)) issues.push(v('invalid_reward_state', 'As descobertas não correspondem ao progresso da campanha.', { reward: null }));
      if (!Array.isArray(state.climaxPartyIds)) issues.push(v('invalid_climax_party', 'A formação do Conselho é inválida.', { heroId: null }));
      if (!Array.isArray(state.invariantViolations)) issues.push(v('invalid_invariant_log', 'O registro de invariantes é inválido.', {}));
      dead.forEach(function (id, index) {
        if (HERO_IDS.indexOf(id) < 0 || dead.indexOf(id) !== index) issues.push(v('invalid_dead_roster', 'A lista de heróis mortos é inválida.', { heroId: id }));
      });
      party.forEach(function (id, index) {
        if (HERO_IDS.indexOf(id) < 0 || dead.indexOf(id) >= 0 || party.indexOf(id) !== index) issues.push(v('invalid_party', 'A formação atual é inválida.', { heroId: id }));
      });
      draft.forEach(function (id, index) {
        if (HERO_IDS.indexOf(id) < 0 || dead.indexOf(id) >= 0 || draft.indexOf(id) !== index) issues.push(v('invalid_party', 'A formação atual é inválida.', { heroId: id }));
      });
      if (draft.length > 3 || party.length > 3) issues.push(v('invalid_party', 'A formação atual é inválida.', { heroId: null }));
      presented.forEach(function (id, index, list) {
        if (dead.indexOf(id) < 0 || list.indexOf(id) !== index) issues.push(v('invalid_dead_roster', 'A lista de heróis mortos é inválida.', { heroId: id }));
      });
      if (state.phase !== 'ready' && state.phase !== 'invalid' && (!normalizeSeed(state.seed).ok || !normalizeSeed(state.rngState).ok)) {
        issues.push(v('invalid_rng_state', 'O estado do gerador aleatório é inválido.', { seed: state.seed, rngState: state.rngState }));
      }
      var preparationPhase = ['ready', 'intro', 'formation'].indexOf(state.phase) >= 0;
      var routePhase = ['dungeon_intro', 'encounter_intro', 'encounter_choice', 'approach_result', 'sacrifice_choice', 'death_result', 'retreat_confirmation', 'automatic_retreat', 'dungeon_complete', 'council', 'final_choice'].indexOf(state.phase) >= 0;
      var routeKnown = DUNGEON_IDS.indexOf(state.dungeonId) >= 0;
      if ((preparationPhase && (state.dungeonId !== null || state.position !== null)) ||
          (state.selectedDungeonId !== null && (state.phase !== 'formation' || DUNGEON_IDS.indexOf(state.selectedDungeonId) < 0)) ||
          (routePhase && (!routeKnown || !Number.isInteger(state.position) || state.position < 1 || state.position > Data.destinations[state.dungeonId].landmarkTotal))) {
        issues.push(v('invalid_route_state', 'A rota não corresponde à fase da campanha.', { phase: state.phase, dungeon: state.dungeonId, position: state.position, selectedDestination: state.selectedDungeonId }));
      }
      var hasFinalAssignment = state.assignments && Array.isArray(state.assignments.final) && state.assignments.final.some(function (id) { return id !== null; });
      if ((state.selectedDungeonId === 'final' || state.dungeonId === 'final' || hasFinalAssignment) &&
          (completed.indexOf('physical') < 0 || completed.indexOf('supernatural') < 0 || mapPieces.indexOf('physical') < 0 || mapPieces.indexOf('supernatural') < 0)) {
        issues.push(v('premature_final_route', 'O caminho final exige as duas rotas iniciais concluídas.', { dungeon: 'final' }));
      }
      var assignmentSeen = {};
      DUNGEON_IDS.forEach(function (dungeonId) {
        var expected = Data.destinations[dungeonId].landmarkTotal;
        var entries = state.assignments && state.assignments[dungeonId];
        if (!Array.isArray(entries) || entries.length !== expected) {
          issues.push(v('invalid_assignments', 'As atribuições de encontros são inválidas.', { dungeon: dungeonId }));
          return;
        }
        entries.forEach(function (encounterId) {
          if (encounterId === null) return;
          var encounter = Data.encounters[encounterId];
          var expectedPool = dungeonId === 'physical' ? 'A' : (dungeonId === 'supernatural' ? 'B' : null);
          if (!encounter || (expectedPool && encounter.pool !== expectedPool) || assignmentSeen[encounterId]) issues.push(v('invalid_assignments', 'As atribuições de encontros são inválidas.', { dungeon: dungeonId, encounterId: encounterId }));
          assignmentSeen[encounterId] = true;
        });
        var gap = false;
        entries.forEach(function (encounterId) {
          if (encounterId === null) gap = true;
          else if (gap) issues.push(v('invalid_assignments', 'As atribuições de encontros são inválidas.', { dungeon: dungeonId, encounterId: encounterId }));
        });
      });
      DUNGEON_IDS.forEach(function (dungeonId) {
        var progress = state.progress && state.progress[dungeonId];
        var entries = state.assignments && state.assignments[dungeonId];
        var revealed = Array.isArray(entries) ? entries.filter(function (id) { return id !== null; }).length : 0;
        if (!Number.isInteger(progress) || progress < 0 || progress > Data.destinations[dungeonId].landmarkTotal || progress > revealed || revealed > progress + 1) issues.push(v('invalid_progress', 'O progresso de rota é inválido.', { dungeon: dungeonId, progress: progress }));
      });
      var outcomePhases = ['approach_result', 'sacrifice_choice', 'death_result'];
      if (outcomePhases.indexOf(state.phase) >= 0) {
        var outcome = state.pendingOutcome;
        var activeEncounter = currentEncounter(state);
        var outcomeApproach = outcome && activeEncounter ? findApproach(activeEncounter, outcome.approachId) : null;
        var expectedOutcomeKeys = ['approachId', 'encounterId', 'success', 'victimId'];
        var outcomeKeys = outcome && typeof outcome === 'object' && !Array.isArray(outcome) ? Object.keys(outcome).sort() : [];
        var outcomeValid = Boolean(
          outcome &&
          typeof outcome === 'object' &&
          !Array.isArray(outcome) &&
          sameArray(outcomeKeys, expectedOutcomeKeys.sort()) &&
          activeEncounter &&
          outcome.encounterId === activeEncounter.id &&
          outcomeApproach &&
          (state.phase === 'death_result' || outcome.victimId === null) &&
          typeof outcome.success === 'boolean'
        );
        var outcomeParty = party.slice();
        if (state.phase === 'death_result') {
          outcomeValid = outcomeValid &&
            HERO_IDS.indexOf(outcome && outcome.victimId) >= 0 &&
            dead.indexOf(outcome.victimId) >= 0 &&
            party.indexOf(outcome.victimId) < 0 &&
            draft.indexOf(outcome.victimId) < 0;
          if (outcome && HERO_IDS.indexOf(outcome.victimId) >= 0) outcomeParty.push(outcome.victimId);
        }
        if (outcomeApproach && typeof (outcome && outcome.success) === 'boolean') {
          var expectedSuccess = outcomeParty.some(function (heroId) {
            return Data.heroes[heroId] && Data.heroes[heroId].competencyIds.indexOf(outcomeApproach.competencyId) >= 0;
          });
          outcomeValid = outcomeValid && outcome.success === expectedSuccess;
        }
        if ((state.phase === 'sacrifice_choice' || state.phase === 'death_result') && outcome && outcome.success !== false) outcomeValid = false;
        if (!outcomeValid) issues.push(v('invalid_pending_outcome', 'O resultado pendente não corresponde ao encontro e à formação atuais.', {
          phase: state.phase,
          encounterId: outcome && outcome.encounterId || null,
          activeEncounterId: activeEncounter && activeEncounter.id || null,
          approachId: outcome && outcome.approachId || null,
          
          success: outcome && outcome.success,
          expectedSuccess: typeof expectedSuccess === 'boolean' ? expectedSuccess : null,
          victimId: outcome && outcome.victimId || null
        }));
      } else if (state.pendingOutcome !== null) {
        issues.push(v('invalid_pending_outcome', 'O resultado pendente não corresponde à fase da campanha.', { phase: state.phase }));
      }
      var readingPhases = ['intro', 'encounter_intro', 'approach_result', 'death_result', 'automatic_retreat', 'dungeon_complete', 'council', 'ending', 'memorial', 'epilogue'];
      if (readingPhases.indexOf(state.phase) >= 0 && (!state.reading || typeof state.reading !== 'object')) {
        issues.push(v('invalid_reading_cursor', 'A posição de leitura é inválida.', { sceneId: null, index: 0, total: 0 }));
      }
      if (state.reading && typeof state.reading === 'object') {
        var readingSceneId = typeof state.reading.sceneId === 'string' ? state.reading.sceneId : '';
        var total = Array.isArray(state.reading.passageIds) ? state.reading.passageIds.length : 0;
        var scene = Narrative.scenes[readingSceneId];
        var planMatches = false;
        var expectedSceneId = null;
        if (state.phase === 'intro') expectedSceneId = 'prologue';
        else if (state.phase === 'dungeon_intro') expectedSceneId = 'threshold.' + state.dungeonId;
        else if (state.phase === 'encounter_intro') expectedSceneId = currentEncounter(state) && 'encounter.' + currentEncounter(state).id;
        else if (state.phase === 'approach_result' && state.pendingOutcome) expectedSceneId = 'result.' + state.pendingOutcome.approachId + '.' + (state.pendingOutcome.success ? 'success' : 'failure');
        else if (state.phase === 'automatic_retreat') expectedSceneId = 'automatic_retreat';
        else if (state.phase === 'dungeon_complete') expectedSceneId = readingSceneId.indexOf('lover.' + state.dungeonId + '.') === 0 || readingSceneId === 'irati.02' || readingSceneId === 'map.reveal' ? readingSceneId : null;
        else if (state.phase === 'council') expectedSceneId = 'council';
        else if (state.phase === 'ending') expectedSceneId = 'ending.' + state.endingId;
        else if (state.phase === 'memorial') expectedSceneId = 'memorial';
        else if (state.phase === 'epilogue') expectedSceneId = 'epilogue.' + (readingSceneId.split('.')[1] || '');
        else if (state.phase === 'death_result' && state.pendingOutcome) expectedSceneId = 'death.' + state.pendingOutcome.encounterId;
        if (scene && Array.isArray(state.reading.passageIds)) {
          if (state.phase === 'council' && readingSceneId === 'council') {
            var councilPlan = scene.passageIds.slice(0, 4).concat([climaxParty.length ? 'council.challenge' : 'council.solo', 'council.confession', 'council.andira']);
            climaxParty.forEach(function (id) { councilPlan.push('opinion.' + id); });
            planMatches = sameArray(state.reading.passageIds, councilPlan);
          } else if (state.phase === 'death_result' && state.pendingOutcome && state.pendingOutcome.victimId) {
            planMatches = readingSceneId === 'death.' + state.pendingOutcome.encounterId && sameArray(state.reading.passageIds, ['farewell.' + state.pendingOutcome.victimId, 'death.' + state.pendingOutcome.encounterId + '.context']);
          } else if (state.phase === 'memorial') {
            planMatches = readingSceneId === 'memorial' && sameArray(state.reading.passageIds, ['memorial.intro'].concat(dead.map(function (id) { return 'memorial.' + id; })));
          } else {
            planMatches = sameArray(state.reading.passageIds, scene.passageIds);
          }
        }
        planMatches = planMatches && readingSceneId === expectedSceneId;
        if (!scene || !Array.isArray(state.reading.passageIds) || !Number.isInteger(state.reading.index) || state.reading.index < 0 || state.reading.index >= total || state.reading.passageIds.some(function (id) { return !hasPassage(id); }) || !planMatches) {
          issues.push(v('invalid_reading_cursor', 'A posição de leitura é inválida.', { sceneId: readingSceneId || null, index: state.reading.index, total: total }));
        }
      }
      var seen = {};
      seenPassages.forEach(function (passageId) {
        if (seen[passageId] || !hasPassage(passageId)) issues.push(v('invalid_reading_cursor', 'A posição de leitura é inválida.', { sceneId: state.reading && state.reading.sceneId || null, index: state.reading && state.reading.index || 0, total: state.reading && state.reading.passageIds && state.reading.passageIds.length || 0 }));
        seen[passageId] = true;
      });
      var rewards = {};
      completed.forEach(function (id, index) {
        if (DUNGEON_IDS.indexOf(id) < 0 || completed.indexOf(id) !== index || !state.progress || state.progress[id] !== Data.destinations[id].landmarkTotal) issues.push(v('invalid_progress', 'O progresso de rota é inválido.', { dungeon: id, progress: state.progress && state.progress[id] }));
      });
      mapPieces.forEach(function (id) {
        if ((id !== 'physical' && id !== 'supernatural') || rewards[id] || completed.indexOf(id) < 0) issues.push(v('invalid_reward_state', 'As descobertas não correspondem ao progresso da campanha.', { reward: id }));
        rewards[id] = true;
      });
      if (state.medallionComplete && (completed.indexOf('final') < 0 || seenPassages.indexOf('council.01') < 0)) issues.push(v('invalid_reward_state', 'As descobertas não correspondem ao progresso da campanha.', { reward: 'medallion' }));
      if (mapPieces.length === 2 && completed.indexOf('physical') < 0) issues.push(v('invalid_reward_state', 'As descobertas não correspondem ao progresso da campanha.', { reward: 'physical' }));
      if (mapPieces.length === 2 && completed.indexOf('supernatural') < 0) issues.push(v('invalid_reward_state', 'As descobertas não correspondem ao progresso da campanha.', { reward: 'supernatural' }));
      var climax = {};
      climaxParty.forEach(function (id) {
        if (HERO_IDS.indexOf(id) < 0 || dead.indexOf(id) >= 0 || climax[id] || (['council', 'final_choice', 'ending', 'memorial', 'epilogue', 'campaign_complete'].indexOf(state.phase) >= 0 && party.indexOf(id) < 0)) issues.push(v('invalid_climax_party', 'A formação do Conselho é inválida.', { heroId: id }));
        climax[id] = true;
      });
      if (state.endingId !== null && ['reunite', 'destroy', 'bad'].indexOf(state.endingId) < 0) issues.push(v('invalid_ending_state', 'O desfecho não corresponde ao estado da campanha.', { ending: state.endingId, phase: state.phase }));
      if (state.endingId === 'bad' && (dead.length !== 8 || ['ending', 'memorial', 'campaign_complete'].indexOf(state.phase) < 0)) issues.push(v('invalid_ending_state', 'O desfecho não corresponde ao estado da campanha.', { ending: state.endingId, phase: state.phase }));
      if ((state.endingId === 'reunite' || state.endingId === 'destroy') && (!state.medallionComplete || ['ending', 'memorial', 'epilogue', 'campaign_complete'].indexOf(state.phase) < 0)) issues.push(v('invalid_ending_state', 'O desfecho não corresponde ao estado da campanha.', { ending: state.endingId, phase: state.phase }));
      return resultValidation(issues);
    }

    function reading(sceneId, ids) { return { sceneId: sceneId, passageIds: (ids || Narrative.scenes[sceneId].passageIds).slice(), index: 0 }; }

    function accepted(state, changes, event, effects) {
      var next = Object.assign({}, clone(state), { invariantViolations: [] }, clone(changes || {}));
      next.sequence = state.sequence + 1;
      next.history = state.history.concat([Object.assign({ sequence: next.sequence }, event || {})]);
      return deepFreeze({ ok: true, state: deepFreeze(next), effects: deepFreeze(clone(effects || [])), error: null });
    }

    function rejected(state, code, message, context) { return deepFreeze({ ok: false, state: state, effects: [], error: deepFreeze(v(code, message, context)) }); }

    function formationTransition(state) {
      var living = livingHeroIds(state), automatic = living.length <= 3;
      var newDeaths = state.deadHeroIds.filter(function (id) { return state.presentedDeathIds.indexOf(id) < 0; });
      var available = DUNGEON_IDS.filter(function (id) { return routeStatus(state, id) === 'available'; });
      return {
        changes: {
          phase: 'formation', dungeonId: null, position: null, partyIds: [], pendingOutcome: null, reading: null, retreatReturn: null,
          draftPartyIds: automatic ? living : state.draftPartyIds.filter(function (id) { return living.indexOf(id) >= 0; }),
          selectedDungeonId: available.length === 1 ? available[0] : (available.indexOf(state.selectedDungeonId) >= 0 ? state.selectedDungeonId : null),
          presentedDeathIds: state.presentedDeathIds.concat(newDeaths)
        },
        effects: newDeaths.length ? [{ type: 'tavern_absence', heroIds: newDeaths }] : []
      };
    }

    function completeRoute(state) {
      var next = clone(state), dungeon = state.dungeonId;
      next.progress[dungeon] = Math.max(next.progress[dungeon], state.position);
      if (next.completedDungeonIds.indexOf(dungeon) < 0) next.completedDungeonIds.push(dungeon);
      next.pendingOutcome = null;
      if (dungeon === 'final') {
        next.phase = 'council';
        next.climaxPartyIds = HERO_IDS.filter(function (id) { return next.partyIds.indexOf(id) >= 0 && next.deadHeroIds.indexOf(id) < 0; });
        var plan = Narrative.scenes.council.passageIds.slice(0, 4).concat([next.climaxPartyIds.length ? 'council.challenge' : 'council.solo', 'council.confession', 'council.andira']);
        next.climaxPartyIds.forEach(function (id) { plan = plan.concat(Narrative.scenes['opinion.' + id].passageIds); });
        next.reading = reading('council', plan);
      } else {
        next.phase = 'dungeon_complete';
        var order = next.completedDungeonIds.filter(function (id) { return id !== 'final'; });
        var sceneId = 'lover.' + dungeon + '.' + (order.length === 1 ? 'first' : 'second');
        next.reading = reading(sceneId);
      }
      return next;
    }

    function afterEncounter(state) {
      var next = clone(state);
      next.progress[next.dungeonId] = Math.max(next.progress[next.dungeonId], next.position);
      next.pendingOutcome = null;
      if (livingHeroIds(next).length === 0) { next.phase = 'ending'; next.endingId = 'bad'; next.reading = reading('ending.bad'); return next; }
      if (next.position === Data.destinations[next.dungeonId].landmarkTotal) return completeRoute(next);
      if (!next.partyIds.length) { next.phase = 'automatic_retreat'; next.reading = reading('automatic_retreat'); return next; }
      next.position += 1; next.phase = 'dungeon_intro'; next.reading = null;
      return next;
    }

    function finishReading(state) {
      var next = clone(state), sceneId = state.reading.sceneId;
      next.reading = null;
      if (state.phase === 'intro') return formationTransition(next);
      if (state.phase === 'dungeon_intro') return { changes: next, effects: [] };
      if (state.phase === 'encounter_intro') { next.phase = 'encounter_choice'; return { changes: next, effects: [] }; }
      if (state.phase === 'approach_result') {
        if (state.pendingOutcome.success) return { changes: afterEncounter(next), effects: [] };
        next.phase = 'sacrifice_choice'; return { changes: next, effects: [] };
      }
      if (state.phase === 'death_result') return { changes: afterEncounter(next), effects: [] };
      if (state.phase === 'automatic_retreat') return formationTransition(next);
      if (state.phase === 'dungeon_complete' && sceneId.indexOf('lover.') === 0) {
        var reward = sceneId.indexOf('physical') >= 0 ? 'physical' : 'supernatural';
        if (next.mapPieceIds.indexOf(reward) < 0) next.mapPieceIds.push(reward);
        next.reading = reading(next.mapPieceIds.length === 1 ? 'irati.02' : 'map.reveal');
        return { changes: next, effects: [] };
      }
      if (sceneId === 'irati.02' || sceneId === 'map.reveal') return formationTransition(next);
      if (state.phase === 'council') { next.phase = 'final_choice'; return { changes: next, effects: [] }; }
      if (state.phase === 'ending') {
        if (next.deadHeroIds.length) { next.phase = 'memorial'; next.reading = reading('memorial', ['memorial.intro'].concat(next.deadHeroIds.map(function (id) { return 'memorial.' + id; }))); }
        else if (next.endingId !== 'bad' && next.climaxPartyIds.length) { next.phase = 'epilogue'; next.reading = reading('epilogue.' + next.climaxPartyIds[0]); }
        else next.phase = 'campaign_complete';
        return { changes: next, effects: [] };
      }
      if (state.phase === 'memorial') {
        if (next.endingId !== 'bad' && next.climaxPartyIds.length) { next.phase = 'epilogue'; next.reading = reading('epilogue.' + next.climaxPartyIds[0]); }
        else next.phase = 'campaign_complete';
        return { changes: next, effects: [] };
      }
      if (state.phase === 'epilogue') {
        var current = sceneId.split('.')[1], index = next.climaxPartyIds.indexOf(current);
        if (index >= 0 && index + 1 < next.climaxPartyIds.length) next.reading = reading('epilogue.' + next.climaxPartyIds[index + 1]);
        else { next.phase = 'campaign_complete'; next.reading = null; }
        return { changes: next, effects: [] };
      }
      return { changes: next, effects: [] };
    }

    function completeCurrentPassage(state) {
      var next = clone(state);
      var passageId = next.reading.passageIds[next.reading.index];
      if (next.seenPassageIds.indexOf(passageId) < 0) next.seenPassageIds.push(passageId);
      if (passageId === 'council.01') next.medallionComplete = true;
      if (next.reading.index + 1 < next.reading.passageIds.length) {
        next.reading.index += 1;
        return { changes: next, effects: [], finished: false, passageId: passageId };
      }
      var finished = finishReading(next);
      finished.changes = Object.assign({}, next, finished.changes);
      finished.finished = true;
      finished.passageId = passageId;
      return finished;
    }

    function deriveRetreatEligibility(state) {
      return livingHeroIds(state).length >= 3 && ['dungeon_intro', 'encounter_intro', 'encounter_choice'].indexOf(state.phase) >= 0 && !state.pendingOutcome;
    }

    function malformed(action) {
      if (!action || typeof action.type !== 'string' || !Number.isInteger(action.expectedSequence) || !hasOwn(ACTION_FIELDS, action.type)) return true;
      var allowed = ['type', 'expectedSequence'].concat(ACTION_FIELDS[action.type]);
      return !Number.isSafeInteger(action.expectedSequence) || action.expectedSequence < 0 || Object.keys(action).sort().join(',') !== allowed.sort().join(',');
    }

    function dispatch(state, action) {
      if (malformed(action)) return rejected(state, 'invalid_action', 'A ação informada é inválida.', {});
      var checked = validateState(state);
      if (!checked.ok) return rejected(state, 'invalid_state', 'A campanha contém um estado inválido.', {});
      if (action.expectedSequence !== state.sequence) return rejected(state, 'stale_action', 'Esta ação pertence a uma tela anterior.', { expectedSequence: action.expectedSequence, actualSequence: state.sequence });
      var next, form, seed, encounter, approach, status, random, available, heroId;
      if (action.type === 'BEGIN') {
        if (state.phase !== 'ready') return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: action.type });
        seed = normalizeSeed(action.seed);
        if (!seed.ok) return rejected(state, seed.error.code, seed.error.message, {});
        return accepted(state, { phase: 'intro', seed: seed.seed, rngState: seed.seed, reading: reading('prologue') }, { type: 'BEGIN', seed: seed.seed });
      }
      if (action.type === 'COMPLETE_PASSAGE' || action.type === 'SKIP_SEEN_TEXT') {
        if (!state.reading) return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: action.type });
        var passageId = state.reading.passageIds[state.reading.index];
        if (action.type === 'COMPLETE_PASSAGE' && action.passageId !== passageId) return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', {});
        if (action.type === 'SKIP_SEEN_TEXT' && state.seenPassageIds.indexOf(passageId) < 0) return rejected(state, 'text_not_seen', 'Este trecho ainda não foi lido nesta campanha.', { passageId: passageId });
        var step = completeCurrentPassage(state);
        if (action.type === 'SKIP_SEEN_TEXT') {
          var guard = Object.keys(Narrative.passages).length + 1;
          while (step.changes.reading && step.changes.seenPassageIds.indexOf(step.changes.reading.passageIds[step.changes.reading.index]) >= 0 && guard > 0) {
            step = completeCurrentPassage(step.changes);
            guard -= 1;
          }
        }
        return accepted(state, step.changes, { type: action.type, passageId: passageId }, step.effects);
      }
      if (action.type === 'SELECT_DESTINATION') {
        if (state.phase !== 'formation') return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: action.type });
        if (DUNGEON_IDS.indexOf(action.dungeonId) < 0) return rejected(state, 'invalid_destination', 'Escolha um caminho conhecido.', { dungeon: action.dungeonId });
        status = routeStatus(state, action.dungeonId);
        if (status !== 'available') return rejected(state, 'destination_unavailable', 'Este caminho não está disponível para expedição.', { dungeon: action.dungeonId, status: status });
        return accepted(state, { selectedDungeonId: action.dungeonId }, { type: 'SELECT_DESTINATION', dungeonId: action.dungeonId });
      }
      if (action.type === 'TOGGLE_HERO') {
        if (state.phase !== 'formation') return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: action.type });
        form = deriveFormation(state);
        if (form.automatic) return rejected(state, 'formation_locked', 'A formação inclui automaticamente todos os sobreviventes.', { livingHeroIds: form.livingHeroIds });
        heroId = action.heroId;
        if (HERO_IDS.indexOf(heroId) < 0 || state.deadHeroIds.indexOf(heroId) >= 0) return rejected(state, 'invalid_hero', 'Escolha um herói sobrevivente.', { heroId: heroId });
        next = state.draftPartyIds.slice();
        var heroIndex = next.indexOf(heroId);
        if (heroIndex >= 0) next.splice(heroIndex, 1); else next.push(heroId);
        if (next.length > 3) return rejected(state, 'invalid_party_size', 'Escolha exatamente três heróis sobreviventes.', { count: next.length });
        return accepted(state, { draftPartyIds: next }, { type: 'TOGGLE_HERO', heroId: heroId });
      }
      if (action.type === 'DEPART') {
        if (state.phase !== 'formation') return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: action.type });
        if (!state.selectedDungeonId) return rejected(state, 'destination_required', 'Escolha um caminho antes de partir.', {});
        status = routeStatus(state, state.selectedDungeonId);
        if (status !== 'available') return rejected(state, 'destination_unavailable', 'Este caminho não está disponível para expedição.', { dungeon: state.selectedDungeonId, status: status });
        form = deriveFormation(state);
        if (!form.livingHeroIds.length || form.selectedHeroIds.length !== form.required) return rejected(state, 'invalid_party_size', 'Escolha exatamente três heróis sobreviventes.', { count: form.selectedHeroIds.length, required: form.required });
        return accepted(state, { phase: 'dungeon_intro', dungeonId: state.selectedDungeonId, selectedDungeonId: null, position: 1, partyIds: form.selectedHeroIds, draftPartyIds: form.selectedHeroIds, reading: reading('threshold.' + state.selectedDungeonId) }, { type: 'DEPART', dungeonId: state.selectedDungeonId });
      }
      if (action.type === 'ENTER_DUNGEON') {
        if (state.phase !== 'dungeon_intro' || state.reading) return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: action.type });
        next = clone(state);
        if (!next.assignments[next.dungeonId][next.position - 1]) {
          available = next.dungeonId === 'final' ? deriveFinalCandidates(next.assignments) : Data.encounterOrder.filter(function (id) { return id.charAt(0) === (next.dungeonId === 'physical' ? 'A' : 'B'); });
          available = available.filter(function (id) { return next.assignments[next.dungeonId].indexOf(id) < 0; });
          random = mulberry32Step(next.rngState); next.rngState = random.state;
          next.assignments[next.dungeonId][next.position - 1] = selectEligible(available, random.value).value;
        }
        encounter = Data.encounters[next.assignments[next.dungeonId][next.position - 1]];
        next.phase = 'encounter_intro'; next.reading = reading('encounter.' + encounter.id);
        return accepted(state, next, { type: 'ENTER_DUNGEON', encounterId: encounter.id });
      }
      if (action.type === 'CHOOSE_APPROACH') {
        if (state.phase !== 'encounter_choice') return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: action.type });
        encounter = currentEncounter(state); approach = findApproach(encounter, action.approachId);
        if (!approach) return rejected(state, 'invalid_approach', 'Escolha uma abordagem deste encontro.', { approachId: action.approachId, encounterId: encounter && encounter.id });
        var success = state.partyIds.some(function (id) { return Data.heroes[id].competencyIds.indexOf(approach.competencyId) >= 0; });
        var resultScene = 'result.' + approach.id + '.' + (success ? 'success' : 'failure');
        return accepted(state, { phase: 'approach_result', pendingOutcome: { encounterId: encounter.id, approachId: approach.id, success: success, victimId: null }, reading: reading(resultScene) }, { type: 'CHOOSE_APPROACH', approachId: approach.id, success: success });
      }
      if (action.type === 'SELECT_VICTIM') {
        if (state.phase !== 'sacrifice_choice') return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: action.type });
        heroId = action.heroId;
        if (state.partyIds.indexOf(heroId) < 0 || state.deadHeroIds.indexOf(heroId) >= 0) return rejected(state, 'invalid_victim', 'Escolha um herói vivo presente na expedição.', { heroId: heroId });
        next = clone(state); next.deadHeroIds.push(heroId); next.partyIds = next.partyIds.filter(function (id) { return id !== heroId; });
        next.draftPartyIds = next.draftPartyIds.filter(function (id) { return id !== heroId; });
        next.deathLocations[heroId] = { routeId: next.dungeonId, encounterId: next.pendingOutcome.encounterId, encounterPosition: next.position, approachId: next.pendingOutcome.approachId };
        next.phase = 'death_result'; next.pendingOutcome.victimId = heroId;
        next.reading = reading('death.' + next.pendingOutcome.encounterId, ['farewell.' + heroId, 'death.' + next.pendingOutcome.encounterId + '.context']);
        return accepted(state, next, { type: 'SELECT_VICTIM', heroId: heroId });
      }
      if (action.type === 'REQUEST_RETREAT') {
        if (!deriveRetreatEligibility(state)) return rejected(state, 'retreat_unavailable', 'O recuo não está disponível neste momento.', { aliveHeroes: livingHeroIds(state).length });
        return accepted(state, { phase: 'retreat_confirmation', retreatReturn: { phase: state.phase, reading: state.reading ? clone(state.reading) : null }, reading: null }, { type: 'REQUEST_RETREAT' });
      }
      if (action.type === 'CANCEL_RETREAT') {
        if (state.phase !== 'retreat_confirmation' || !state.retreatReturn) return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: action.type });
        return accepted(state, { phase: state.retreatReturn.phase, reading: state.retreatReturn.reading, retreatReturn: null }, { type: 'CANCEL_RETREAT' });
      }
      if (action.type === 'CONFIRM_RETREAT') {
        if (state.phase !== 'retreat_confirmation') return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: action.type });
        form = formationTransition(state); return accepted(state, form.changes, { type: 'CONFIRM_RETREAT' }, form.effects);
      }
      if (action.type === 'CHOOSE_ENDING') {
        if (state.phase !== 'final_choice') return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: action.type });
        if (action.ending !== 'reunite' && action.ending !== 'destroy') return rejected(state, 'invalid_ending', 'Escolha reunir ou destruir o medalhão.', { ending: action.ending });
        return accepted(state, { phase: 'ending', endingId: action.ending, reading: reading('ending.' + action.ending) }, { type: 'CHOOSE_ENDING', ending: action.ending });
      }
      if (action.type === 'NEW_CAMPAIGN') {
        if (state.phase !== 'campaign_complete') return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: action.type });
        return deepFreeze({ ok: true, state: createReadyState(), effects: [], error: null });
      }
      return rejected(state, 'invalid_action', 'A ação informada é inválida.', {});
    }

    function deriveDestinations(state) {
      return Object.fromEntries(routeIds.map(id => [id, {
        id, name: catalog.destinations[id].name, status: routeStatus(state, id), selected: state.selectedDungeonId === id,
        landmarks: { traversed: state.progress[id], total: catalog.destinations[id].landmarkTotal }
      }]));
    }
    function canDepart(state) {
      const form = deriveFormation(state);
      return state.phase === 'formation' && form.livingHeroIds.length > 0 && form.selectedHeroIds.length === form.required && routeIds.includes(state.selectedDungeonId) && routeStatus(state, state.selectedDungeonId) === 'available';
    }
    // Observation preserves domain field meanings and never draws or advances.
    function snapshot(state) {
      const source = state && typeof state === 'object' ? state : {};
      const list = key => Array.isArray(source[key]) ? source[key] : [];
      const dead = list('deadHeroIds'), party = list('partyIds'), seen = list('seenPassageIds');
      const encounter = currentEncounter(source);
      const current = encounter ? {
        id: encounter.id,
        viability: deriveViability(party, encounter).count,
        approaches: encounter.approaches.map(approach => ({
          id: approach.id, competency: approach.competencyId,
          viable: party.some(id => catalog.heroes[id]?.competencyIds.includes(approach.competencyId))
        }))
      } : null;
      const cursor = source.reading;
      const passageId = Array.isArray(cursor?.passageIds) ? cursor.passageIds[cursor.index] : null;
      const destinations = source.progress && Array.isArray(source.completedDungeonIds) && Array.isArray(source.mapPieceIds)
        ? deriveDestinations(source) : {};
      return clone({
        version: 4, phase: source.phase ?? null, sequence: source.sequence ?? null,
        seed: source.seed ?? null, rngState: source.rngState ?? null,
        dungeon: source.dungeonId ?? null, selectedDestination: source.selectedDungeonId ?? null,
        position: source.position ?? null, draftParty: list('draftPartyIds'), party,
        aliveHeroes: heroIds.filter(id => !dead.includes(id)), deadHeroes: dead,
        heroNames: Object.fromEntries(heroIds.map(id => [id, catalog.heroes[id].name])),
        mapFragments: { found: list('mapPieceIds').length, total: 2 }, destinations,
        competencies: Object.fromEntries(heroIds.map(id => [id, catalog.heroes[id].competencyIds])),
        assignments: source.assignments ?? null, currentEncounter: current,
        reading: passageId ? { sceneId: cursor.sceneId, passageId, index: cursor.index,
          total: cursor.passageIds.length, canSkip: seen.includes(passageId) } : null,
        seenPassages: seen,
        rewards: { routeOrder: list('completedDungeonIds').filter(id => id !== 'final'),
          mapPieces: list('mapPieceIds'), medallionComplete: source.medallionComplete ?? null },
        ending: source.endingId ?? null, climaxParty: list('climaxPartyIds'),
        epilogueHeroes: source.endingId && source.endingId !== 'bad' ? list('climaxPartyIds') : [],
        presentedDeaths: list('presentedDeathIds'), actionHistory: list('history'),
        invariantViolations: list('invariantViolations'), lastRejectedAction: null
      });
    }

    return freeze({
      createReadyState, dispatch, validateState, deriveFormation, deriveDestinations, deriveViability, deriveFinalCandidates, mulberry32Step,
      playerView: state => clone({ phase: state.phase, sequence: state.sequence, reading: state.reading,
        heroes: heroIds.map(id => ({ id, name: catalog.heroes[id].name, alive: !state.deadHeroIds.includes(id), selected: deriveFormation(state).selectedHeroIds.includes(id) })),
        formation: deriveFormation(state), destinations: deriveDestinations(state), canDepart: canDepart(state), canRetreat: deriveRetreatEligibility(state),
        currentEncounter: currentEncounter(state) ? { id: currentEncounter(state).id, name: currentEncounter(state).name, approachIds: currentEncounter(state).approaches.map(approach => approach.id) } : null }),
      snapshot
    });
  }
  const api = freeze({ createRules, CatalogError });
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.DrylandCampaignRules = api;
})(globalThis);
