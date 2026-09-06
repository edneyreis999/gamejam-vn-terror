(function (global) {
  'use strict';

  var Data = global.ExpeditionData;
  var Narrative = global.ExpeditionNarrative;
  var HERO_IDS = Data.heroOrder.slice();
  var DUNGEON_IDS = ['physical', 'supernatural', 'final'];
  var UINT32_RANGE = 4294967296;
  var MULBERRY_INCREMENT = 0x6D2B79F5;
  var ACTION_FIELDS = {
    BEGIN: ['seed'], ADVANCE_TEXT: [], SKIP_SEEN_TEXT: [], SELECT_DESTINATION: ['dungeonId'],
    TOGGLE_HERO: ['heroId'], DEPART: [], ENTER_DUNGEON: [], CHOOSE_APPROACH: ['approachId'],
    SELECT_VICTIM: ['heroId'], REQUEST_RETREAT: [], CANCEL_RETREAT: [], CONFIRM_RETREAT: [],
    CHOOSE_ENDING: ['ending'], NEW_CAMPAIGN: []
  };

  function deepFreeze(value) {
    if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
    Object.getOwnPropertyNames(value).forEach(function (key) { deepFreeze(value[key]); });
    return Object.freeze(value);
  }
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function frozenClone(value) { return deepFreeze(clone(value)); }
  function v(code, message, context) { return { code: code, message: message, context: context || {} }; }
  function resultValidation(items) { return deepFreeze({ ok: items.length === 0, violations: items }); }
  function blanks(n) { return Array.apply(null, Array(n)).map(function () { return null; }); }

  function readyObject() {
    return {
      version: 3, phase: 'ready', seed: null, rngState: null,
      selectedDungeonId: null, dungeonId: null, position: null,
      draftPartyIds: [], partyIds: [], deadHeroIds: [], presentedDeathIds: [],
      assignments: { physical: blanks(5), supernatural: blanks(5), final: blanks(6) },
      progress: { physical: 0, supernatural: 0, final: 0 }, completedDungeonIds: [],
      pendingOutcome: null, reading: null, seenPassageIds: [], mapPieceIds: [],
      medallionComplete: false, endingId: null, climaxPartyIds: [], retreatReturn: null,
      sequence: 0, history: [], invariantViolations: []
    };
  }
  function createReadyState() { return deepFreeze(readyObject()); }
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
  function createMulberry32(seed) {
    var normalized = normalizeSeed(seed);
    if (!normalized.ok) return normalized;
    var currentState = normalized.seed;
    return Object.freeze({
      next: function () { var step = mulberry32Step(currentState); currentState = step.state; return step; },
      getState: function () { return currentState; }
    });
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
  function deriveDestinations(state) {
    var output = {};
    DUNGEON_IDS.forEach(function (id) {
      var status = routeStatus(state, id);
      output[id] = {
        id: id, name: Data.destinations[id].name, rumor: Data.destinations[id].rumor,
        previewPath: Data.destinations[id].previewPath, status: status,
        selected: state.selectedDungeonId === id,
        landmarks: { traversed: state.progress[id], total: Data.destinations[id].landmarkTotal },
        lockReason: status === 'locked' ? 'Encontre e sobreponha as duas peças do mapa.' : (status === 'completed' ? 'Caminho concluído.' : null)
      };
    });
    return deepFreeze(output);
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
  function resolvePassage(id, data, narrative) {
    data = data || Data; narrative = narrative || Narrative;
    var passage = narrative && narrative.passages && narrative.passages[id];
    if (!passage) return null;
    if (typeof passage.text === 'string') return passage.text;
    if (passage.heroText) {
      var hero = data.heroes[passage.heroText.heroId];
      return hero && typeof hero[passage.heroText.field] === 'string' ? hero[passage.heroText.field] : null;
    }
    if (passage.encounterText) {
      var ref = passage.encounterText;
      var encounter = data.encounters[ref.encounterId];
      if (!encounter) return null;
      if (ref.field === 'description' || ref.field === 'deathText') return encounter[ref.field] || null;
      var approach = findApproach(encounter, ref.approachId);
      return approach && (ref.field === 'successText' || ref.field === 'failureText') ? approach[ref.field] || null : null;
    }
    return null;
  }
  function safeAsset(path) {
    return path === null || (typeof path === 'string' && /^assets\/[a-z0-9][a-z0-9._\/-]*$/i.test(path) && path.indexOf('..') < 0 && path.indexOf('\\') < 0);
  }
  function sameArray(left, right) {
    return Array.isArray(left) && Array.isArray(right) && left.length === right.length && left.every(function (item, index) { return item === right[index]; });
  }
  function requiredSceneIds(data) {
    var ids = ['prologue', 'threshold.physical', 'threshold.supernatural', 'threshold.final', 'automatic_retreat', 'lover.physical.first', 'lover.physical.second', 'lover.supernatural.first', 'lover.supernatural.second', 'irati.02', 'map.reveal', 'council', 'ending.reunite', 'ending.destroy', 'ending.bad', 'memorial'];
    (data.encounterOrder || []).forEach(function (encounterId) {
      ids.push('encounter.' + encounterId, 'death.' + encounterId);
      var encounter = data.encounters && data.encounters[encounterId];
      (encounter && encounter.approaches || []).forEach(function (item) {
        ids.push('result.' + item.id + '.success', 'result.' + item.id + '.failure');
      });
    });
    (data.heroOrder || []).forEach(function (heroId) { ids.push('opinion.' + heroId, 'epilogue.' + heroId); });
    return ids;
  }
  function validateCatalog(data, narrative) {
    var issues = [];
    data = data || {}; narrative = narrative || {};
    var canonicalCompetencies = ['strength', 'dexterity', 'perception', 'knowledge', 'occultism', 'will', 'survival', 'athletics'];
    var canonicalHeroes = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8'];
    var canonicalEncounters = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'];
    var competencyLabels = { strength:'Força', dexterity:'Destreza', perception:'Percepção', knowledge:'Conhecimento', occultism:'Ocultismo', will:'Vontade', survival:'Sobrevivência', athletics:'Atletismo' };
    var bodilyCompetencies = ['strength', 'dexterity', 'survival', 'athletics'];
    var heroCompetencyOccurrences = {};
    var approachCompetencyOccurrences = {};
    var pairOwners = {};
    var required = ['label', 'pronouns', 'race', 'profession', 'summary', 'presentationText', 'farewell', 'opinion', 'epilogue'];
    var destinationIds = Object.keys(data.destinations || {}).sort();
    if (!sameArray(destinationIds, DUNGEON_IDS.slice().sort())) issues.push(v('invalid_destination_catalog', 'O catálogo de destinos é inválido.', {}));
    DUNGEON_IDS.forEach(function (id) {
      var destination = data.destinations && data.destinations[id];
      if (!destination || destination.id !== id || typeof destination.name !== 'string' || !destination.name.trim() || typeof destination.rumor !== 'string' || !destination.rumor.trim() || destination.landmarkTotal !== (id === 'final' ? 6 : 5)) {
        issues.push(v('invalid_destination_definition', 'A definição de destino é inválida.', { dungeon: id }));
      }
    });
    canonicalCompetencies.forEach(function (id) {
      heroCompetencyOccurrences[id] = 0;
      approachCompetencyOccurrences[id] = 0;
    });
    if (JSON.stringify(data.competencyOrder || []) !== JSON.stringify(canonicalCompetencies) || JSON.stringify(Object.keys(data.competencies || {}).sort()) !== JSON.stringify(canonicalCompetencies.slice().sort())) {
      issues.push(v('invalid_competency_catalog', 'O catálogo de competências deve conter as oito competências confirmadas.', {}));
    }
    canonicalCompetencies.forEach(function (id) {
      var competency = data.competencies && data.competencies[id];
      var family = bodilyCompetencies.indexOf(id) >= 0 ? 'bodily' : 'liminal';
      if (!competency || competency.id !== id || competency.label !== competencyLabels[id] || competency.family !== family) {
        issues.push(v('invalid_competency_definition', 'Uma competência diverge da definição confirmada.', { competencyId:id }));
      }
    });
    (data.heroOrder || []).forEach(function (id) {
      var hero = data.heroes && data.heroes[id];
      required.forEach(function (field) {
        if (!hero || typeof hero[field] !== 'string' || !hero[field].trim()) issues.push(v('invalid_hero_content', 'A apresentação de um herói está incompleta.', { heroId: id, field: field }));
      });
      if (hero && !safeAsset(hero.portraitPath)) issues.push(v('unsafe_asset_path', 'Um recurso visual deve usar um caminho local permitido.', { path: hero.portraitPath }));
      var pair = hero && Array.isArray(hero.competencyIds) ? hero.competencyIds : [];
      if (pair.length !== 2 || pair.some(function (competencyId) { return canonicalCompetencies.indexOf(competencyId) < 0; })) {
        issues.push(v('invalid_hero_competencies', 'Cada herói deve possuir duas competências válidas.', { heroId:id }));
      }
      pair.forEach(function (competencyId) {
        if (Object.prototype.hasOwnProperty.call(heroCompetencyOccurrences, competencyId)) heroCompetencyOccurrences[competencyId] += 1;
      });
      var pairKey = pair.slice().sort().join('|');
      if (pair.length === 2 && pairOwners[pairKey]) issues.push(v('duplicate_hero_pair', 'Dois heróis repetem o mesmo par de competências.', { heroIds:[pairOwners[pairKey], id] }));
      else if (pair.length === 2) pairOwners[pairKey] = id;
    });
    canonicalCompetencies.forEach(function (id) {
      if (heroCompetencyOccurrences[id] !== 2) issues.push(v('invalid_hero_competency_occurrence', 'Cada competência deve pertencer a dois heróis.', { competencyId:id, occurrences:heroCompetencyOccurrences[id] }));
    });
    if (JSON.stringify(data.heroOrder || []) !== JSON.stringify(canonicalHeroes) || JSON.stringify(Object.keys(data.heroes || {}).sort()) !== JSON.stringify(canonicalHeroes.slice().sort())) issues.push(v('invalid_hero_catalog', 'O catálogo de heróis deve conter H1 a H8.', {}));
    if (JSON.stringify(data.encounterOrder || []) !== JSON.stringify(canonicalEncounters) || JSON.stringify(Object.keys(data.encounters || {}).sort()) !== JSON.stringify(canonicalEncounters.slice().sort())) issues.push(v('invalid_encounter_catalog', 'O catálogo de encontros deve conter A1 a A8 e B1 a B8.', {}));
    (data.encounterOrder || []).forEach(function (encounterId) {
      var encounter = data.encounters && data.encounters[encounterId];
      if (!encounter || !Array.isArray(encounter.approaches) || encounter.approaches.length !== 3 || typeof encounter.description !== 'string' || !encounter.description.trim() || typeof encounter.deathText !== 'string' || !encounter.deathText.trim()) {
        issues.push(v('invalid_encounter_content', 'A apresentação de um encontro está incompleta.', { encounterId: encounterId }));
        if (encounter && Array.isArray(encounter.approaches) && encounter.approaches.length !== 3) issues.push(v('invalid_approach_count', 'Cada encontro deve possuir três abordagens.', { encounterId:encounterId, count:encounter.approaches.length }));
        return;
      }
      var approachCompetencies = encounter.approaches.map(function (item) { return item && item.competencyId; });
      if (new Set(approachCompetencies).size !== approachCompetencies.length) issues.push(v('duplicate_approach_competency', 'Um encontro repete competência entre abordagens.', { encounterId:encounterId }));
      var familyCounts = { bodily:0, liminal:0 };
      encounter.approaches.forEach(function (item) {
        var competency = item && data.competencies && data.competencies[item.competencyId];
        if (!item || typeof item.successText !== 'string' || !item.successText.trim() || typeof item.failureText !== 'string' || !item.failureText.trim() || !competency) issues.push(v('invalid_encounter_content', 'A apresentação de um encontro está incompleta.', { encounterId: encounterId }));
        if (competency) {
          approachCompetencyOccurrences[item.competencyId] += 1;
          familyCounts[competency.family] += 1;
        }
      });
      var expectedFamilyCounts = encounter.pool === 'A' ? [2, 1] : [1, 2];
      if (familyCounts.bodily !== expectedFamilyCounts[0] || familyCounts.liminal !== expectedFamilyCounts[1]) issues.push(v('invalid_pool_family_ratio', 'A distribuição de famílias do encontro é inválida.', { encounterId:encounterId, bodily:familyCounts.bodily, liminal:familyCounts.liminal }));
      if (!safeAsset(encounter.imagePath)) issues.push(v('unsafe_asset_path', 'Um recurso visual deve usar um caminho local permitido.', { path: encounter.imagePath }));
    });
    canonicalCompetencies.forEach(function (id) {
      if (approachCompetencyOccurrences[id] !== 6) issues.push(v('invalid_approach_competency_occurrence', 'Cada competência deve aparecer em seis abordagens.', { competencyId:id, occurrences:approachCompetencyOccurrences[id] }));
    });
    [data.destinations || {}, data.encounters || {}, narrative.speakers || {}, narrative.backgrounds || {}].forEach(function (catalog) {
      Object.keys(catalog).forEach(function (id) {
        var item = catalog[id];
        if (!item || typeof item !== 'object') return;
        var path = item.previewPath !== undefined ? item.previewPath : (item.imagePath !== undefined ? item.imagePath : (item.portraitPath !== undefined ? item.portraitPath : item.path));
        if (path !== undefined && !safeAsset(path)) issues.push(v('unsafe_asset_path', 'Um recurso visual deve usar um caminho local permitido.', { path: path }));
      });
    });
    Object.keys(narrative.passages || {}).forEach(function (passageId) {
      var passage = narrative.passages[passageId];
      var variants = passage ? ['text', 'heroText', 'encounterText'].filter(function (key) { return Object.prototype.hasOwnProperty.call(passage, key); }) : [];
      if (variants.length !== 1 || !resolvePassage(passageId, data, narrative)) issues.push(v('missing_narrative_content', 'Um trecho obrigatório da história está ausente.', { sceneId: null, passageId: passageId }));
    });
    requiredSceneIds(data).forEach(function (sceneId) {
      if (!narrative.scenes || !narrative.scenes[sceneId] || !Array.isArray(narrative.scenes[sceneId].passageIds) || !narrative.scenes[sceneId].passageIds.length) {
        issues.push(v('missing_narrative_content', 'Um trecho obrigatório da história está ausente.', { sceneId: sceneId, passageId: null }));
      }
    });
    Object.keys(narrative.scenes || {}).forEach(function (sceneId) {
      (narrative.scenes[sceneId].passageIds || []).forEach(function (passageId) {
        var passage = narrative.passages && narrative.passages[passageId];
        var variants = passage ? ['text', 'heroText', 'encounterText'].filter(function (key) { return Object.prototype.hasOwnProperty.call(passage, key); }) : [];
        if (!passage || variants.length !== 1 || !resolvePassage(passageId, data, narrative)) issues.push(v('missing_narrative_content', 'Um trecho obrigatório da história está ausente.', { sceneId: sceneId, passageId: passageId }));
      });
    });
    return resultValidation(issues);
  }
  function validateState(state) {
    var issues = [];
    if (!state || state.version !== 3) return resultValidation([v('invalid_state_version', 'A versão do estado da campanha é inválida.', { version: state && state.version })]);
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
      var expectedOutcomeKeys = ['approachId', 'competencyId', 'encounterId', 'success'];
      if (state.phase === 'death_result') expectedOutcomeKeys.push('victimId');
      var outcomeKeys = outcome && typeof outcome === 'object' && !Array.isArray(outcome) ? Object.keys(outcome).sort() : [];
      var outcomeValid = Boolean(
        outcome &&
        typeof outcome === 'object' &&
        !Array.isArray(outcome) &&
        sameArray(outcomeKeys, expectedOutcomeKeys.sort()) &&
        activeEncounter &&
        outcome.encounterId === activeEncounter.id &&
        outcomeApproach &&
        outcome.competencyId === outcomeApproach.competencyId &&
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
        competencyId: outcome && outcome.competencyId || null,
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
      if (!scene || !Array.isArray(state.reading.passageIds) || !Number.isInteger(state.reading.index) || state.reading.index < 0 || state.reading.index >= total || state.reading.passageIds.some(function (id) { return !resolvePassage(id); }) || !planMatches) {
        issues.push(v('invalid_reading_cursor', 'A posição de leitura é inválida.', { sceneId: readingSceneId || null, index: state.reading.index, total: total }));
      }
    }
    var seen = {};
    seenPassages.forEach(function (passageId) {
      if (seen[passageId] || !resolvePassage(passageId)) issues.push(v('invalid_reading_cursor', 'A posição de leitura é inválida.', { sceneId: state.reading && state.reading.sceneId || null, index: state.reading && state.reading.index || 0, total: state.reading && state.reading.passageIds && state.reading.passageIds.length || 0 }));
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
    return deepFreeze({ ok: true, state: deepFreeze(next), effects: deepFreeze(clone(effects || [])) });
  }
  function quarantined(state, violations) {
    var next = readyObject();
    if (state && typeof state === 'object') {
      if (Array.isArray(state.history) && Number.isInteger(state.sequence) && state.sequence >= 0 && state.history.length === state.sequence) {
        next.sequence = state.sequence;
        next.history = clone(state.history);
      }
    }
    next.phase = 'invalid';
    next.reading = null;
    next.invariantViolations = clone(violations);
    return deepFreeze({ ok: true, state: deepFreeze(next), effects: deepFreeze([]) });
  }
  function rejected(state, code, message, context) { return deepFreeze({ ok: false, state: state, error: deepFreeze(v(code, message, context)) }); }

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
    finished.finished = true;
    finished.passageId = passageId;
    return finished;
  }
  function deriveRetreatEligibility(state) {
    return livingHeroIds(state).length >= 3 && ['dungeon_intro', 'encounter_intro', 'encounter_choice'].indexOf(state.phase) >= 0 && !state.pendingOutcome;
  }
  function malformed(action) {
    if (!action || typeof action.type !== 'string' || !Number.isInteger(action.expectedSequence) || !ACTION_FIELDS[action.type]) return true;
    var allowed = ['type', 'expectedSequence'].concat(ACTION_FIELDS[action.type]);
    return Object.keys(action).some(function (key) { return allowed.indexOf(key) < 0; });
  }

  function dispatch(state, action) {
    if (malformed(action)) return rejected(state, 'invalid_action', 'A ação informada é inválida.', {});
    var checked = validateState(state);
    if (!checked.ok) return quarantined(state, checked.violations);
    if (action.expectedSequence !== state.sequence) return rejected(state, 'stale_action', 'Esta ação pertence a uma tela anterior.', { expectedSequence: action.expectedSequence, actualSequence: state.sequence });
    var next, form, seed, encounter, approach, status, random, available, heroId;
    if (action.type === 'BEGIN') {
      if (state.phase !== 'ready') return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: action.type });
      seed = normalizeSeed(action.seed);
      if (!seed.ok) return rejected(state, seed.error.code, seed.error.message, {});
      return accepted(state, { phase: 'intro', seed: seed.seed, rngState: seed.seed, reading: reading('prologue') }, { type: 'campaign_started', seed: seed.seed });
    }
    if (action.type === 'ADVANCE_TEXT' || action.type === 'SKIP_SEEN_TEXT') {
      if (!state.reading) return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: action.type });
      var passageId = state.reading.passageIds[state.reading.index];
      if (action.type === 'SKIP_SEEN_TEXT' && state.seenPassageIds.indexOf(passageId) < 0) return rejected(state, 'text_not_seen', 'Este trecho ainda não foi lido nesta campanha.', { passageId: passageId });
      var step = completeCurrentPassage(state);
      if (action.type === 'SKIP_SEEN_TEXT') {
        var guard = Object.keys(Narrative.passages).length + 1;
        while (step.changes.reading && step.changes.seenPassageIds.indexOf(step.changes.reading.passageIds[step.changes.reading.index]) >= 0 && guard > 0) {
          step = completeCurrentPassage(step.changes);
          guard -= 1;
        }
      }
      return accepted(state, step.changes, { type: 'passage_completed', passageId: passageId }, step.effects);
    }
    if (action.type === 'SELECT_DESTINATION') {
      if (state.phase !== 'formation') return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: action.type });
      if (DUNGEON_IDS.indexOf(action.dungeonId) < 0) return rejected(state, 'invalid_destination', 'Escolha um caminho conhecido.', { dungeon: action.dungeonId });
      status = routeStatus(state, action.dungeonId);
      if (status !== 'available') return rejected(state, 'destination_unavailable', 'Este caminho não está disponível para expedição.', { dungeon: action.dungeonId, status: status });
      return accepted(state, { selectedDungeonId: action.dungeonId }, { type: 'destination_selected', dungeon: action.dungeonId });
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
      return accepted(state, { draftPartyIds: next }, { type: 'hero_toggled', heroId: heroId });
    }
    if (action.type === 'DEPART') {
      if (state.phase !== 'formation') return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: action.type });
      if (!state.selectedDungeonId) return rejected(state, 'destination_required', 'Escolha um caminho antes de partir.', {});
      status = routeStatus(state, state.selectedDungeonId);
      if (status !== 'available') return rejected(state, 'destination_unavailable', 'Este caminho não está disponível para expedição.', { dungeon: state.selectedDungeonId, status: status });
      form = deriveFormation(state);
      if (form.selectedHeroIds.length !== form.required) return rejected(state, 'invalid_party_size', 'Escolha exatamente três heróis sobreviventes.', { count: form.selectedHeroIds.length, required: form.required });
      return accepted(state, { phase: 'dungeon_intro', dungeonId: state.selectedDungeonId, selectedDungeonId: null, position: 1, partyIds: form.selectedHeroIds, draftPartyIds: form.selectedHeroIds, reading: reading('threshold.' + state.selectedDungeonId) }, { type: 'departed', dungeon: state.selectedDungeonId });
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
      return accepted(state, next, { type: 'encounter_revealed', encounterId: encounter.id });
    }
    if (action.type === 'CHOOSE_APPROACH') {
      if (state.phase !== 'encounter_choice') return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: action.type });
      encounter = currentEncounter(state); approach = findApproach(encounter, action.approachId);
      if (!approach) return rejected(state, 'invalid_approach', 'Escolha uma abordagem deste encontro.', { approachId: action.approachId, encounterId: encounter && encounter.id });
      var success = state.partyIds.some(function (id) { return Data.heroes[id].competencyIds.indexOf(approach.competencyId) >= 0; });
      var resultScene = 'result.' + approach.id + '.' + (success ? 'success' : 'failure');
      return accepted(state, { phase: 'approach_result', pendingOutcome: { encounterId: encounter.id, approachId: approach.id, competencyId: approach.competencyId, success: success }, reading: reading(resultScene) }, { type: 'approach_chosen', approachId: approach.id, success: success });
    }
    if (action.type === 'SELECT_VICTIM') {
      if (state.phase !== 'sacrifice_choice') return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: action.type });
      heroId = action.heroId;
      if (state.partyIds.indexOf(heroId) < 0 || state.deadHeroIds.indexOf(heroId) >= 0) return rejected(state, 'invalid_victim', 'Escolha um herói vivo presente na expedição.', { heroId: heroId });
      next = clone(state); next.deadHeroIds.push(heroId); next.partyIds = next.partyIds.filter(function (id) { return id !== heroId; });
      next.draftPartyIds = next.draftPartyIds.filter(function (id) { return id !== heroId; });
      next.phase = 'death_result'; next.pendingOutcome.victimId = heroId;
      next.reading = reading('death.' + next.pendingOutcome.encounterId, ['farewell.' + heroId, 'death.' + next.pendingOutcome.encounterId + '.context']);
      return accepted(state, next, { type: 'hero_died', heroId: heroId });
    }
    if (action.type === 'REQUEST_RETREAT') {
      if (!deriveRetreatEligibility(state)) return rejected(state, 'retreat_unavailable', 'O recuo não está disponível neste momento.', { aliveHeroes: livingHeroIds(state).length });
      return accepted(state, { phase: 'retreat_confirmation', retreatReturn: { phase: state.phase, reading: state.reading ? clone(state.reading) : null }, reading: null }, { type: 'retreat_requested' });
    }
    if (action.type === 'CANCEL_RETREAT') {
      if (state.phase !== 'retreat_confirmation' || !state.retreatReturn) return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: action.type });
      return accepted(state, { phase: state.retreatReturn.phase, reading: state.retreatReturn.reading, retreatReturn: null }, { type: 'retreat_cancelled' });
    }
    if (action.type === 'CONFIRM_RETREAT') {
      if (state.phase !== 'retreat_confirmation') return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: action.type });
      form = formationTransition(state); return accepted(state, form.changes, { type: 'retreat_confirmed' }, form.effects);
    }
    if (action.type === 'CHOOSE_ENDING') {
      if (state.phase !== 'final_choice') return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: action.type });
      if (action.ending !== 'reunite' && action.ending !== 'destroy') return rejected(state, 'invalid_ending', 'Escolha reunir ou destruir o medalhão.', { ending: action.ending });
      return accepted(state, { phase: 'ending', endingId: action.ending, reading: reading('ending.' + action.ending) }, { type: 'ending_chosen', ending: action.ending });
    }
    if (action.type === 'NEW_CAMPAIGN') {
      if (state.phase !== 'campaign_complete') return rejected(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: action.type });
      return deepFreeze({ ok: true, state: createReadyState(), effects: [] });
    }
    return rejected(state, 'invalid_action', 'A ação informada é inválida.', {});
  }

  function passageView(state) {
    if (!state.reading) return null;
    var id = state.reading.passageIds[state.reading.index], passage = Narrative.passages[id];
    return {
      sceneId: state.reading.sceneId, passageId: id, index: state.reading.index, total: state.reading.passageIds.length,
      text: resolvePassage(id), speakerId: passage && passage.speakerId,
      speakerName: passage && passage.speakerId ? (Data.heroes[passage.speakerId] ? Data.heroes[passage.speakerId].label : Narrative.speakers[passage.speakerId].name) : null,
      canSkip: state.seenPassageIds.indexOf(id) >= 0
    };
  }
  function publicHero(id, state) {
    var hero = Data.heroes[id];
    return { id: id, name: hero.label, pronouns: hero.pronouns, race: hero.race, profession: hero.profession, summary: hero.summary, presentationText: hero.presentationText, portraitPath: hero.portraitPath, alive: state.deadHeroIds.indexOf(id) < 0, selected: state.draftPartyIds.indexOf(id) >= 0 };
  }
  function derivePlayerView(state) {
    var encounter = currentEncounter(state);
    return frozenClone({
      version: 3, phase: state.phase, sequence: state.sequence,
      heroes: HERO_IDS.map(function (id) { return publicHero(id, state); }), formation: deriveFormation(state),
      destinations: deriveDestinations(state), reading: passageView(state),
      currentEncounter: encounter ? { id: encounter.id, title: encounter.title, description: encounter.description, imagePath: encounter.imagePath, approaches: encounter.approaches.map(function (item) { return { id: item.id, text: item.text }; }) } : null,
      victims: state.phase === 'sacrifice_choice' ? state.partyIds.map(function (id) { return publicHero(id, state); }) : [],
      deadHeroes: state.deadHeroIds.map(function (id) { return publicHero(id, state); }), climaxHeroes: state.climaxPartyIds.map(function (id) { return publicHero(id, state); }),
      endingChoices: state.phase === 'final_choice' ? [{ id: 'reunite', label: 'Reunir o medalhão' }, { id: 'destroy', label: 'Destruir o medalhão' }] : [],
      ending: state.endingId, canRetreat: deriveRetreatEligibility(state), selectedDestination: state.selectedDungeonId
    });
  }
  function snapshot(state) {
    var encounter = currentEncounter(state), competencyMap = {}, heroNames = {}, current = null, pv = passageView(state);
    HERO_IDS.forEach(function (id) { competencyMap[id] = Data.heroes[id].competencyIds.slice(); heroNames[id] = Data.heroes[id].label; });
    if (encounter) {
      current = { id: encounter.id, viability: 0, approaches: encounter.approaches.map(function (item) {
        var viable = state.partyIds.some(function (id) { return Data.heroes[id].competencyIds.indexOf(item.competencyId) >= 0; });
        return { id: item.id, competency: item.competencyId, viable: viable };
      }) };
      current.viability = current.approaches.filter(function (item) { return item.viable; }).length;
    }
    return frozenClone({
      version: 3, phase: state.phase, sequence: state.sequence, seed: state.seed, rngState: state.rngState, dungeon: state.dungeonId,
      selectedDestination: state.selectedDungeonId, position: state.position, draftParty: state.draftPartyIds, party: state.partyIds,
      aliveHeroes: livingHeroIds(state), deadHeroes: state.deadHeroIds, heroNames: heroNames,
      mapFragments: { found: state.mapPieceIds.length, total: 2 }, destinations: deriveDestinations(state), competencies: competencyMap,
      assignments: state.assignments, currentEncounter: current,
      reading: pv ? { sceneId: pv.sceneId, passageId: pv.passageId, index: pv.index, total: pv.total, canSkip: pv.canSkip } : null,
      seenPassages: state.seenPassageIds,
      rewards: { routeOrder: state.completedDungeonIds.filter(function (id) { return id !== 'final'; }), mapPieces: state.mapPieceIds, medallionComplete: state.medallionComplete },
      ending: state.endingId, climaxParty: state.climaxPartyIds, epilogueHeroes: state.endingId && state.endingId !== 'bad' ? state.climaxPartyIds : [],
      presentedDeaths: state.presentedDeathIds, actionHistory: state.history, invariantViolations: state.invariantViolations
    });
  }

  global.ExpeditionEngine = deepFreeze({
    createReadyState: createReadyState, dispatch: dispatch, derivePlayerView: derivePlayerView, snapshot: snapshot,
    validateCatalog: validateCatalog, validateState: validateState, deriveFormation: deriveFormation,
    deriveDestinations: deriveDestinations, deriveRetreatEligibility: deriveRetreatEligibility,
    deriveViability: deriveViability,
    deriveFinalCandidates: deriveFinalCandidates, normalizeSeed: normalizeSeed,
    selectEligible: selectEligible, resolvePassage: resolvePassage,
    mulberry32Step: mulberry32Step, createMulberry32: createMulberry32
  });
})(window);
