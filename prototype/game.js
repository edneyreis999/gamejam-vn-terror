(function (global) {
  'use strict';

  var Data = global.ExpeditionData;
  var UINT32_MAX = 4294967295;
  var UINT32_RANGE = 4294967296;
  var MULBERRY_INCREMENT = 0x6D2B79F5;
  var PHASES = [
    'ready',
    'intro',
    'formation',
    'dungeon_intro',
    'encounter_choice',
    'approach_result',
    'sacrifice_choice',
    'sacrifice_confirmation',
    'death_result',
    'retreat_confirmation',
    'automatic_retreat',
    'dungeon_complete',
    'victory',
    'defeat',
    'invalid'
  ];

  function deepFreeze(value) {
    if (!value || typeof value !== 'object' || Object.isFrozen(value)) {
      return value;
    }

    Object.getOwnPropertyNames(value).forEach(function (key) {
      deepFreeze(value[key]);
    });

    return Object.freeze(value);
  }

  function clone(value) {
    if (Array.isArray(value)) {
      return value.map(clone);
    }

    if (value && typeof value === 'object') {
      return Object.keys(value).reduce(function (copy, key) {
        copy[key] = clone(value[key]);
        return copy;
      }, {});
    }

    return value;
  }

  function replace(state, changes) {
    var next = {};
    Object.keys(state).forEach(function (key) {
      next[key] = state[key];
    });
    Object.keys(changes || {}).forEach(function (key) {
      next[key] = changes[key];
    });
    return deepFreeze(next);
  }

  function ok(state, effects) {
    return deepFreeze({ ok: true, state: state, effects: effects || [] });
  }

  function error(state, code, message, context) {
    return deepFreeze({
      ok: false,
      state: state,
      error: {
        code: code,
        message: message,
        context: context || {}
      }
    });
  }

  function makeViolation(code, message, context) {
    return {
      code: code,
      message: message,
      context: context || {}
    };
  }

  function sameMembers(left, right) {
    if (left.length !== right.length) {
      return false;
    }
    return left.slice().sort().join('|') === right.slice().sort().join('|');
  }

  function unique(values) {
    return values.filter(function (value, index) {
      return values.indexOf(value) === index;
    });
  }

  function normalizeSeed(seed) {
    if (typeof seed !== 'number' || !Number.isFinite(seed) || !Number.isInteger(seed) || seed < 0 || seed > UINT32_MAX) {
      return deepFreeze({
        ok: false,
        error: {
          code: 'invalid_seed',
          message: 'Use um número inteiro entre 0 e 4294967295.'
        }
      });
    }

    return deepFreeze({ ok: true, seed: seed >>> 0 });
  }

  function mulberry32Step(currentState) {
    var nextState = (currentState + MULBERRY_INCREMENT) >>> 0;
    var value = nextState;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    value = ((value ^ (value >>> 14)) >>> 0) / UINT32_RANGE;
    return deepFreeze({ state: nextState, value: value });
  }

  function createMulberry32(seed) {
    var normalized = normalizeSeed(seed);
    if (!normalized.ok) {
      return normalized;
    }

    var currentState = normalized.seed;
    return Object.freeze({
      next: function () {
        var step = mulberry32Step(currentState);
        currentState = step.state;
        return step;
      },
      getState: function () {
        return currentState;
      }
    });
  }

  function selectEligible(eligibleIds, randomValue) {
    if (!Array.isArray(eligibleIds) || eligibleIds.length === 0) {
      return deepFreeze({
        ok: false,
        error: { code: 'empty_eligible_set', message: 'Não há encontros elegíveis para sortear.' }
      });
    }
    if (typeof randomValue !== 'number' || !Number.isFinite(randomValue) || randomValue < 0 || randomValue >= 1) {
      return deepFreeze({
        ok: false,
        error: { code: 'invalid_random_value', message: 'O valor aleatório deve estar entre 0 e 1.' }
      });
    }

    var index = Math.floor(randomValue * eligibleIds.length);
    return deepFreeze({ ok: true, index: index, value: eligibleIds[index] });
  }

  function validateCatalog(catalog) {
    var source = catalog || Data;
    var violations = [];
    var competencyIds = Object.keys(source.competencies || {});
    var heroIds = Object.keys(source.heroes || {});
    var encounterIds = Object.keys(source.encounters || {});
    var expectedCompetencies = ['strength', 'dexterity', 'perception', 'knowledge', 'occultism', 'will', 'survival', 'athletics'];
    var expectedHeroes = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8'];
    var expectedEncounters = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'];
    var expectedLabels = {
      strength: 'Força',
      dexterity: 'Destreza',
      perception: 'Percepção',
      knowledge: 'Conhecimento',
      occultism: 'Ocultismo',
      will: 'Vontade',
      survival: 'Sobrevivência',
      athletics: 'Atletismo'
    };
    var heroOccurrences = {};
    var approachOccurrences = {};
    var pairOwners = {};
    var imagePaths = [];
    var successTexts = [];
    var failureTexts = [];

    expectedCompetencies.forEach(function (competencyId) {
      heroOccurrences[competencyId] = 0;
      approachOccurrences[competencyId] = 0;
    });

    if (!sameMembers(competencyIds, expectedCompetencies)) {
      violations.push(makeViolation('invalid_competency_catalog', 'O catálogo deve conter exatamente as oito competências confirmadas.', { ids: competencyIds }));
    }

    competencyIds.forEach(function (competencyId) {
      var competency = source.competencies[competencyId];
      var expectedFamily = ['strength', 'dexterity', 'survival', 'athletics'].indexOf(competencyId) >= 0 ? 'bodily' : 'liminal';
      if (!competency || competency.id !== competencyId || competency.label !== expectedLabels[competencyId] || competency.family !== expectedFamily) {
        violations.push(makeViolation('invalid_competency_definition', 'A competência ' + competencyId + ' diverge da definição confirmada.', { competencyId: competencyId }));
      }
    });

    if (!sameMembers(heroIds, expectedHeroes)) {
      violations.push(makeViolation('invalid_hero_catalog', 'O catálogo deve conter exatamente H1–H8.', { ids: heroIds }));
    }

    heroIds.forEach(function (heroId) {
      var hero = source.heroes[heroId];
      var pair = hero && Array.isArray(hero.competencyIds) ? hero.competencyIds : [];
      if (pair.length !== 2 || pair.some(function (competencyId) { return competencyIds.indexOf(competencyId) < 0; })) {
        violations.push(makeViolation('invalid_hero_competencies', heroId + ' deve possuir exatamente duas competências válidas.', { heroId: heroId, competencyIds: pair }));
      }
      pair.forEach(function (competencyId) {
        if (Object.prototype.hasOwnProperty.call(heroOccurrences, competencyId)) {
          heroOccurrences[competencyId] += 1;
        }
      });
      var pairKey = pair.slice().sort().join('|');
      if (pair.length === 2 && pairOwners[pairKey]) {
        violations.push(makeViolation('duplicate_hero_pair', heroId + ' repete o par de competências de ' + pairOwners[pairKey] + '.', { heroIds: [pairOwners[pairKey], heroId], competencyIds: pair.slice() }));
      } else if (pair.length === 2) {
        pairOwners[pairKey] = heroId;
      }
    });

    expectedCompetencies.forEach(function (competencyId) {
      if (heroOccurrences[competencyId] !== 2) {
        violations.push(makeViolation('invalid_hero_competency_occurrence', 'A competência ' + competencyId + ' deve aparecer em exatamente dois heróis.', { competencyId: competencyId, occurrences: heroOccurrences[competencyId] }));
      }
    });

    if (!sameMembers(encounterIds, expectedEncounters)) {
      violations.push(makeViolation('invalid_encounter_catalog', 'O catálogo deve conter exatamente A1–A8 e B1–B8.', { ids: encounterIds }));
    }

    encounterIds.forEach(function (encounterId) {
      var currentEncounter = source.encounters[encounterId];
      var approaches = currentEncounter && Array.isArray(currentEncounter.approaches) ? currentEncounter.approaches : [];
      var expectedPool = encounterId.charAt(0);
      if (!currentEncounter || currentEncounter.id !== encounterId || currentEncounter.pool !== expectedPool) {
        violations.push(makeViolation('invalid_encounter_definition', 'O encontro ' + encounterId + ' possui identidade ou pool inválido.', { encounterId: encounterId }));
      }
      if (approaches.length !== 3) {
        violations.push(makeViolation('invalid_approach_count', 'O encontro ' + encounterId + ' deve possuir exatamente três abordagens.', { encounterId: encounterId, count: approaches.length }));
      }

      var approachCompetencies = approaches.map(function (currentApproach) {
        return currentApproach && currentApproach.competencyId;
      });
      if (unique(approachCompetencies).length !== approachCompetencies.length) {
        violations.push(makeViolation('duplicate_approach_competency', 'O encontro ' + encounterId + ' repete uma competência entre as abordagens.', { encounterId: encounterId, competencyIds: approachCompetencies }));
      }

      var visibleCopy = [currentEncounter && currentEncounter.title, currentEncounter && currentEncounter.description, currentEncounter && currentEncounter.failureText]
        .concat(approaches.map(function (currentApproach) { return currentApproach && currentApproach.text; }))
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase('pt-BR');
      competencyIds.forEach(function (competencyId) {
        var competency = source.competencies[competencyId];
        if (competency && visibleCopy.indexOf(competency.label.toLocaleLowerCase('pt-BR')) >= 0 && approachCompetencies.indexOf(competencyId) < 0) {
          violations.push(makeViolation('unmapped_competency_reference', 'O conteúdo de ' + encounterId + ' cita uma competência ausente de suas três abordagens.', { encounterId: encounterId, competencyId: competencyId }));
        }
      });

      var bodilyCount = 0;
      var liminalCount = 0;
      approaches.forEach(function (currentApproach, index) {
        var competency = currentApproach && source.competencies && source.competencies[currentApproach.competencyId];
        if (!currentApproach || currentApproach.id !== encounterId + '-' + (index + 1) || !currentApproach.text || !currentApproach.successText || !competency) {
          violations.push(makeViolation('invalid_approach_definition', 'Uma abordagem de ' + encounterId + ' está incompleta ou usa competência inválida.', { encounterId: encounterId, index: index + 1 }));
          return;
        }
        approachOccurrences[currentApproach.competencyId] += 1;
        successTexts.push(currentApproach.successText);
        if (competency.family === 'bodily') {
          bodilyCount += 1;
        } else if (competency.family === 'liminal') {
          liminalCount += 1;
        }
      });

      var validRatio = expectedPool === 'A' ? bodilyCount === 2 && liminalCount === 1 : bodilyCount === 1 && liminalCount === 2;
      if (!validRatio) {
        violations.push(makeViolation('invalid_pool_family_ratio', 'O encontro ' + encounterId + ' viola a proporção de famílias do pool.', { encounterId: encounterId, bodily: bodilyCount, liminal: liminalCount }));
      }

      if (!currentEncounter || !currentEncounter.title || !currentEncounter.description || !currentEncounter.failureText) {
        violations.push(makeViolation('missing_encounter_copy', 'O encontro ' + encounterId + ' não possui todo o texto obrigatório.', { encounterId: encounterId }));
      } else {
        failureTexts.push(currentEncounter.failureText);
      }
      if (!currentEncounter || currentEncounter.imagePath !== 'assets/encounters/' + encounterId.toLowerCase() + '.jpg') {
        violations.push(makeViolation('invalid_encounter_image_path', 'O encontro ' + encounterId + ' deve apontar para um arquivo JPEG local.', { encounterId: encounterId }));
      } else {
        imagePaths.push(currentEncounter.imagePath);
      }
    });

    expectedCompetencies.forEach(function (competencyId) {
      if (approachOccurrences[competencyId] !== 6) {
        violations.push(makeViolation('invalid_approach_competency_occurrence', 'A competência ' + competencyId + ' deve aparecer em exatamente seis abordagens.', { competencyId: competencyId, occurrences: approachOccurrences[competencyId] }));
      }
    });

    if (unique(imagePaths).length !== 16 || imagePaths.length !== 16) {
      violations.push(makeViolation('invalid_image_inventory', 'O catálogo deve conter dezesseis caminhos JPEG únicos.', { paths: imagePaths }));
    }
    if (successTexts.length !== 48) {
      violations.push(makeViolation('invalid_success_copy_inventory', 'O catálogo deve conter quarenta e oito resultados de sucesso.', { count: successTexts.length }));
    }
    if (failureTexts.length !== 16) {
      violations.push(makeViolation('invalid_failure_copy_inventory', 'O catálogo deve conter dezesseis resultados-base de falha.', { count: failureTexts.length }));
    }

    var farewellCount = heroIds.filter(function (heroId) { return Boolean(source.heroes[heroId] && source.heroes[heroId].farewell); }).length;
    var epilogueCount = heroIds.filter(function (heroId) { return Boolean(source.heroes[heroId] && source.heroes[heroId].epilogue); }).length;
    if (farewellCount !== 8) {
      violations.push(makeViolation('invalid_farewell_inventory', 'O catálogo deve conter oito despedidas provisórias.', { count: farewellCount }));
    }
    if (epilogueCount !== 8) {
      violations.push(makeViolation('invalid_epilogue_inventory', 'O catálogo deve conter oito epílogos provisórios.', { count: epilogueCount }));
    }

    return deepFreeze({
      ok: violations.length === 0,
      violations: violations,
      report: {
        competencyIds: competencyIds.slice().sort(),
        heroIds: heroIds.slice().sort(),
        encounterIds: encounterIds.slice().sort(),
        heroCompetencyOccurrences: heroOccurrences,
        approachCompetencyOccurrences: approachOccurrences,
        imagePathCount: imagePaths.length,
        successTextCount: successTexts.length,
        failureTextCount: failureTexts.length,
        farewellCount: farewellCount,
        epilogueCount: epilogueCount
      }
    });
  }

  function createReadyState() {
    return deepFreeze({
      version: 1,
      phase: 'ready',
      seed: null,
      rngState: null,
      dungeonId: null,
      position: null,
      draftPartyIds: [],
      partyIds: [],
      deadHeroIds: [],
      assignments: {
        physical: [null, null, null, null, null],
        supernatural: [null, null, null, null, null],
        final: [null, null, null, null, null, null]
      },
      pendingOutcome: null,
      pendingVictimId: null,
      sequence: 0,
      actionHistory: [],
      invariantViolations: []
    });
  }

  function livingHeroIds(state) {
    return Data.heroOrder.filter(function (heroId) {
      return state.deadHeroIds.indexOf(heroId) < 0;
    });
  }

  function townHeroIds(state) {
    return livingHeroIds(state).filter(function (heroId) {
      return state.partyIds.indexOf(heroId) < 0;
    });
  }

  function partyCompetencyIds(partyIds, catalog) {
    var source = catalog || Data;
    return unique((partyIds || []).reduce(function (all, heroId) {
      var hero = source.heroes[heroId];
      return hero ? all.concat(hero.competencyIds) : all;
    }, []));
  }

  function deriveViability(partyIds, encounterOrId, catalog) {
    var source = catalog || Data;
    var currentEncounter = typeof encounterOrId === 'string' ? source.encounters[encounterOrId] : encounterOrId;
    if (!currentEncounter) {
      return deepFreeze({ count: 0, total: 0, label: '0/0', approaches: [] });
    }
    var covered = partyCompetencyIds(partyIds || [], source);
    var approaches = currentEncounter.approaches.map(function (currentApproach) {
      return {
        id: currentApproach.id,
        competencyId: currentApproach.competencyId,
        viable: covered.indexOf(currentApproach.competencyId) >= 0
      };
    });
    var count = approaches.filter(function (currentApproach) { return currentApproach.viable; }).length;
    return deepFreeze({ count: count, total: approaches.length, label: count + '/' + approaches.length, approaches: approaches });
  }

  function deriveFormation(state) {
    var living = livingHeroIds(state);
    var autoSelected = living.length > 0 && living.length < 3;
    var selected = autoSelected ? living : state.draftPartyIds.filter(function (heroId) {
      return living.indexOf(heroId) >= 0;
    });
    return deepFreeze({
      mode: living.length === 0 ? 'defeat' : (autoSelected ? 'automatic' : 'manual'),
      livingHeroIds: living,
      selectedHeroIds: selected,
      requiredCount: living.length >= 3 ? 3 : living.length,
      autoSelected: autoSelected,
      canDepart: living.length > 0 && selected.length === (living.length >= 3 ? 3 : living.length)
    });
  }

  function deriveRetreatEligibility(state) {
    return livingHeroIds(state).length >= 3 && state.pendingOutcome === null && ['dungeon_intro', 'encounter_choice'].indexOf(state.phase) >= 0;
  }

  function retreatReturnPhase(state) {
    var lastEvent = state.actionHistory[state.actionHistory.length - 1];
    if (lastEvent && lastEvent.type === 'retreat_requested' && ['dungeon_intro', 'encounter_choice'].indexOf(lastEvent.fromPhase) >= 0) {
      return lastEvent.fromPhase;
    }
    return 'encounter_choice';
  }

  function currentEncounterId(state) {
    if (!state.dungeonId || !state.position || !state.assignments[state.dungeonId]) {
      return null;
    }
    return state.assignments[state.dungeonId][state.position - 1] || null;
  }

  function deriveFinalCandidates(stateOrAssignments) {
    var assignments = stateOrAssignments.assignments || stateOrAssignments;
    var usedPhysical = (assignments.physical || []).filter(Boolean);
    var usedSupernatural = (assignments.supernatural || []).filter(Boolean);
    var remainingA = Data.encounterOrder.filter(function (encounterId) {
      return encounterId.charAt(0) === 'A' && usedPhysical.indexOf(encounterId) < 0;
    });
    var remainingB = Data.encounterOrder.filter(function (encounterId) {
      return encounterId.charAt(0) === 'B' && usedSupernatural.indexOf(encounterId) < 0;
    });
    return deepFreeze(remainingA.concat(remainingB));
  }

  function eligibleEncounterIds(state) {
    var assigned;
    var poolIds;
    if (state.dungeonId === 'physical') {
      assigned = state.assignments.physical.filter(Boolean);
      poolIds = Data.encounterOrder.filter(function (encounterId) { return encounterId.charAt(0) === 'A'; });
    } else if (state.dungeonId === 'supernatural') {
      assigned = state.assignments.supernatural.filter(Boolean);
      poolIds = Data.encounterOrder.filter(function (encounterId) { return encounterId.charAt(0) === 'B'; });
    } else if (state.dungeonId === 'final') {
      assigned = state.assignments.final.filter(Boolean);
      poolIds = deriveFinalCandidates(state);
    } else {
      return deepFreeze([]);
    }
    return deepFreeze(poolIds.filter(function (encounterId) { return assigned.indexOf(encounterId) < 0; }));
  }

  function appendHistory(state, event) {
    var sequence = state.sequence + 1;
    var entry = { sequence: sequence };
    Object.keys(event).forEach(function (key) {
      entry[key] = clone(event[key]);
    });
    return replace(state, {
      sequence: sequence,
      actionHistory: state.actionHistory.concat([deepFreeze(entry)])
    });
  }

  function changeWithHistory(state, changes, event) {
    return appendHistory(replace(state, changes), event);
  }

  function revealCurrentPosition(state) {
    var assignments = state.assignments[state.dungeonId];
    var index = state.position - 1;
    if (!assignments || !Number.isInteger(state.position) || index < 0 || index >= assignments.length) {
      return error(state, 'invalid_position', 'A posição atual não pertence à masmorra.', { dungeon: state.dungeonId, position: state.position });
    }

    var existingId = assignments[index];
    if (existingId) {
      return ok(changeWithHistory(state, { phase: 'encounter_choice', pendingOutcome: null, pendingVictimId: null }, {
        type: 'encounter_revisited',
        dungeon: state.dungeonId,
        position: state.position,
        encounterId: existingId
      }));
    }

    var eligible = eligibleEncounterIds(state);
    if (eligible.length === 0 || state.rngState === null) {
      return error(state, 'no_eligible_encounter', 'Não há encontro elegível para esta posição.', { dungeon: state.dungeonId, position: state.position });
    }
    var step = mulberry32Step(state.rngState);
    var selection = selectEligible(eligible, step.value);
    var nextAssignments = {
      physical: state.assignments.physical.slice(),
      supernatural: state.assignments.supernatural.slice(),
      final: state.assignments.final.slice()
    };
    nextAssignments[state.dungeonId][index] = selection.value;
    return ok(changeWithHistory(state, {
      phase: 'encounter_choice',
      rngState: step.state,
      assignments: nextAssignments,
      pendingOutcome: null,
      pendingVictimId: null
    }, {
      type: 'encounter_revealed',
      dungeon: state.dungeonId,
      position: state.position,
      encounterId: selection.value
    }));
  }

  function confirmRetreat(state) {
    if (state.phase !== 'retreat_confirmation') {
      return error(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: 'CONFIRM_RETREAT' });
    }
    return ok(changeWithHistory(state, {
      phase: 'formation',
      position: 1,
      draftPartyIds: [],
      partyIds: [],
      pendingOutcome: null,
      pendingVictimId: null
    }, {
      type: 'party_retreated',
      dungeon: state.dungeonId
    }));
  }

  function advancePosition(state) {
    var total = state.dungeonId === 'final' ? 6 : 5;
    if (!Number.isInteger(state.position) || state.position < 1 || state.position > total) {
      return error(state, 'invalid_position', 'A posição atual não pode avançar.', { dungeon: state.dungeonId, position: state.position });
    }
    if (state.position < total) {
      return ok(changeWithHistory(state, {
        phase: 'dungeon_intro',
        position: state.position + 1,
        pendingOutcome: null,
        pendingVictimId: null
      }, {
        type: 'position_advanced',
        dungeon: state.dungeonId,
        position: state.position + 1
      }));
    }
    if (state.dungeonId === 'final') {
      return ok(changeWithHistory(state, {
        phase: 'victory',
        pendingOutcome: null,
        pendingVictimId: null
      }, {
        type: 'campaign_won',
        survivors: livingHeroIds(state)
      }));
    }
    return ok(changeWithHistory(state, {
      phase: 'dungeon_complete',
      pendingOutcome: null,
      pendingVictimId: null
    }, {
      type: 'dungeon_completed',
      dungeon: state.dungeonId
    }));
  }

  function advanceDungeon(state) {
    if (state.phase !== 'dungeon_complete') {
      return error(state, 'invalid_transition', 'A masmorra atual ainda não foi concluída.', { phase: state.phase });
    }
    var nextDungeon = state.dungeonId === 'physical' ? 'supernatural' : (state.dungeonId === 'supernatural' ? 'final' : null);
    if (!nextDungeon) {
      return error(state, 'invalid_dungeon_order', 'A ordem confirmada das masmorras não permite este avanço.', { dungeon: state.dungeonId });
    }
    var formation = deriveFormation(state);
    if (formation.mode === 'defeat') {
      return ok(changeWithHistory(state, { phase: 'defeat', partyIds: [], draftPartyIds: [] }, { type: 'campaign_lost' }));
    }
    return ok(changeWithHistory(state, {
      phase: 'formation',
      dungeonId: nextDungeon,
      position: 1,
      partyIds: [],
      draftPartyIds: formation.autoSelected ? formation.selectedHeroIds : [],
      pendingOutcome: null,
      pendingVictimId: null
    }, {
      type: 'dungeon_advanced',
      dungeon: nextDungeon
    }));
  }

  function completeCampaign(state) {
    var ids = state.assignments.physical.concat(state.assignments.supernatural, state.assignments.final).filter(Boolean);
    var duplicateIds = unique(ids.filter(function (encounterId, index) { return ids.indexOf(encounterId) !== index; }));
    var missingIds = Data.encounterOrder.filter(function (encounterId) { return ids.indexOf(encounterId) < 0; });
    return deepFreeze({
      ok: ids.length === 16 && duplicateIds.length === 0 && missingIds.length === 0,
      encounterIds: ids,
      duplicateIds: duplicateIds,
      missingIds: missingIds
    });
  }

  function snapshot(state) {
    var currentId = currentEncounterId(state);
    var current = currentId ? Data.encounters[currentId] : null;
    var currentViability = current ? deriveViability(state.partyIds, current) : null;
    var competencies = {};
    Data.heroOrder.forEach(function (heroId) {
      competencies[heroId] = Data.heroes[heroId].competencyIds.slice();
    });
    return deepFreeze({
      version: state.version,
      phase: state.phase,
      seed: state.seed,
      dungeon: state.dungeonId,
      position: state.position,
      party: state.partyIds.slice(),
      aliveHeroes: livingHeroIds(state),
      deadHeroes: state.deadHeroIds.slice(),
      competencies: competencies,
      assignments: {
        physical: state.assignments.physical.slice(),
        supernatural: state.assignments.supernatural.slice(),
        final: state.assignments.final.slice()
      },
      currentEncounter: current ? {
        id: current.id,
        viability: currentViability.label,
        approaches: currentViability.approaches.map(function (currentApproach) {
          return {
            id: currentApproach.id,
            competency: currentApproach.competencyId,
            viable: currentApproach.viable
          };
        })
      } : null,
      actionHistory: clone(state.actionHistory),
      invariantViolations: clone(state.invariantViolations)
    });
  }

  function hasCampaignShape(state) {
    return Boolean(state && Array.isArray(state.partyIds) && Array.isArray(state.deadHeroIds) &&
      Array.isArray(state.draftPartyIds) && state.assignments && Array.isArray(state.assignments.physical) &&
      Array.isArray(state.assignments.supernatural) && Array.isArray(state.assignments.final) &&
      Array.isArray(state.actionHistory) && Array.isArray(state.invariantViolations));
  }

  function validateState(state) {
    var violations = [];
    if (!state || typeof state !== 'object') {
      return deepFreeze({ ok: false, violations: [makeViolation('invalid_state_shape', 'O estado da campanha não é um objeto válido.', {})] });
    }
    if (!hasCampaignShape(state)) {
      violations.push(makeViolation('invalid_state_shape', 'O estado da campanha não possui todas as coleções obrigatórias.', {}));
    }
    if (state.version !== 1) {
      violations.push(makeViolation('invalid_state_version', 'A versão do estado deve ser 1.', { version: state.version }));
    }
    if (PHASES.indexOf(state.phase) < 0) {
      violations.push(makeViolation('invalid_phase', 'A fase da campanha é desconhecida.', { phase: state.phase }));
    }

    var assignmentGroups = state.assignments || {};
    var expectedLengths = { physical: 5, supernatural: 5, final: 6 };
    var seenAssignments = {};
    Object.keys(expectedLengths).forEach(function (dungeonId) {
      var slots = assignmentGroups[dungeonId];
      if (!Array.isArray(slots) || slots.length !== expectedLengths[dungeonId]) {
        violations.push(makeViolation('invalid_assignment_shape', 'A masmorra ' + dungeonId + ' possui posições inválidas.', { dungeon: dungeonId }));
        return;
      }
      slots.forEach(function (encounterId, index) {
        if (encounterId === null) {
          return;
        }
        var currentEncounter = Data.encounters[encounterId];
        var validPool = dungeonId === 'final' || (dungeonId === 'physical' && currentEncounter && currentEncounter.pool === 'A') || (dungeonId === 'supernatural' && currentEncounter && currentEncounter.pool === 'B');
        if (!currentEncounter || !validPool) {
          violations.push(makeViolation('invalid_encounter_assignment', 'Uma posição contém um encontro incompatível.', { dungeon: dungeonId, encounterId: encounterId, position: index + 1 }));
          return;
        }
        if (!seenAssignments[encounterId]) {
          seenAssignments[encounterId] = [];
        }
        seenAssignments[encounterId].push({ dungeon: dungeonId, position: index + 1 });
      });
    });
    Object.keys(seenAssignments).forEach(function (encounterId) {
      var occurrences = seenAssignments[encounterId];
      if (occurrences.length > 1) {
        var sameDungeon = occurrences.every(function (entry) { return entry.dungeon === occurrences[0].dungeon; });
        var dungeonId = sameDungeon ? occurrences[0].dungeon : 'campaign';
        var dungeonLabel = dungeonId === 'physical' ? 'física' : (dungeonId === 'supernatural' ? 'sobrenatural' : (dungeonId === 'final' ? 'final' : 'campanha'));
        violations.push(makeViolation('duplicate_encounter_assignment', 'O encontro ' + encounterId + ' ocupa mais de uma posição na ' + (dungeonId === 'campaign' ? 'campanha' : 'masmorra ' + dungeonLabel) + '.', {
          dungeon: dungeonId,
          encounterId: encounterId,
          positions: occurrences.map(function (entry) { return entry.position; })
        }));
      }
    });

    var dead = Array.isArray(state.deadHeroIds) ? state.deadHeroIds : [];
    var party = Array.isArray(state.partyIds) ? state.partyIds : [];
    var draft = Array.isArray(state.draftPartyIds) ? state.draftPartyIds : [];
    if (unique(dead).length !== dead.length || dead.some(function (heroId) { return Data.heroOrder.indexOf(heroId) < 0; })) {
      violations.push(makeViolation('invalid_dead_roster', 'A lista de mortos contém heróis inválidos ou repetidos.', { deadHeroIds: dead }));
    }
    if (unique(party).length !== party.length || party.some(function (heroId) { return Data.heroOrder.indexOf(heroId) < 0; })) {
      violations.push(makeViolation('invalid_party_roster', 'A expedição contém heróis inválidos ou repetidos.', { partyIds: party }));
    }
    var overlap = party.filter(function (heroId) { return dead.indexOf(heroId) >= 0; });
    if (overlap.length > 0) {
      violations.push(makeViolation('party_death_overlap', 'Um herói morto não pode permanecer na expedição.', { heroIds: overlap }));
    }
    if (unique(draft).length !== draft.length || draft.some(function (heroId) { return Data.heroOrder.indexOf(heroId) < 0 || dead.indexOf(heroId) >= 0; })) {
      violations.push(makeViolation('invalid_draft_party', 'A seleção de formação contém heróis inválidos, mortos ou repetidos.', { draftPartyIds: draft }));
    }

    if (state.phase === 'ready') {
      if (state.seed !== null || state.rngState !== null || state.dungeonId !== null || state.position !== null) {
        violations.push(makeViolation('invalid_ready_payload', 'Uma campanha pronta não pode conter semente ou progresso ativo.', {}));
      }
    } else if (state.phase !== 'invalid') {
      if (!normalizeSeed(state.seed).ok || !normalizeSeed(state.rngState).ok) {
        violations.push(makeViolation('invalid_seeded_payload', 'Uma campanha iniciada precisa de semente e estado aleatório válidos.', { seed: state.seed, rngState: state.rngState }));
      }
      if (state.phase !== 'intro' && ['physical', 'supernatural', 'final'].indexOf(state.dungeonId) < 0) {
        violations.push(makeViolation('invalid_dungeon_payload', 'A fase ativa precisa de uma masmorra válida.', { phase: state.phase, dungeon: state.dungeonId }));
      }
    }

    var outcomePhases = ['approach_result', 'sacrifice_choice', 'sacrifice_confirmation', 'death_result'];
    if (outcomePhases.indexOf(state.phase) >= 0 && !state.pendingOutcome) {
      violations.push(makeViolation('missing_phase_payload', 'A fase de consequência não possui resultado pendente.', { phase: state.phase }));
    }
    if (outcomePhases.indexOf(state.phase) < 0 && state.pendingOutcome && state.phase !== 'invalid') {
      violations.push(makeViolation('unexpected_phase_payload', 'O estado possui um resultado pendente fora da fase de consequência.', { phase: state.phase }));
    }
    if (state.phase === 'sacrifice_confirmation' && !state.pendingVictimId) {
      violations.push(makeViolation('missing_victim_payload', 'A confirmação de sacrifício não possui vítima.', {}));
    }
    if (state.phase !== 'sacrifice_confirmation' && state.pendingVictimId !== null && state.phase !== 'invalid') {
      violations.push(makeViolation('unexpected_victim_payload', 'Há uma vítima pendente fora da confirmação de sacrifício.', { phase: state.phase, heroId: state.pendingVictimId }));
    }

    if (state.phase === 'dungeon_complete') {
      var completedAssignments = assignmentGroups[state.dungeonId];
      var expectedCompletedPositions = expectedLengths[state.dungeonId];
      if (!Array.isArray(completedAssignments) || completedAssignments.filter(Boolean).length !== expectedCompletedPositions) {
        violations.push(makeViolation('incomplete_dungeon', 'A masmorra não pode ser concluída antes de todas as posições.', { dungeon: state.dungeonId }));
      }
    }

    if (state.dungeonId === 'supernatural' && assignmentGroups.physical && assignmentGroups.physical.filter(Boolean).length !== 5) {
      violations.push(makeViolation('impossible_dungeon_transition', 'A masmorra sobrenatural não pode começar antes da conclusão da primeira.', { dungeon: state.dungeonId }));
    }
    if (state.dungeonId === 'final' && assignmentGroups.physical && assignmentGroups.supernatural && (assignmentGroups.physical.filter(Boolean).length !== 5 || assignmentGroups.supernatural.filter(Boolean).length !== 5)) {
      violations.push(makeViolation('impossible_dungeon_transition', 'A masmorra final exige as duas masmorras iniciais concluídas.', { dungeon: state.dungeonId }));
    }
    if (state.phase === 'automatic_retreat' && (party.length !== 0 || livingHeroIds(state).length === 0)) {
      violations.push(makeViolation('invalid_automatic_retreat', 'O recuo automático exige expedição vazia e sobreviventes na cidade.', {}));
    }
    if (state.phase === 'defeat' && livingHeroIds(state).length !== 0) {
      violations.push(makeViolation('invalid_defeat_state', 'A derrota total exige a morte dos oito heróis.', { aliveHeroes: livingHeroIds(state) }));
    }
    if (state.phase === 'victory') {
      var campaign = completeCampaign(state);
      if (!campaign.ok || state.dungeonId !== 'final' || state.position !== 6 || livingHeroIds(state).length === 0) {
        violations.push(makeViolation('invalid_victory_state', 'A vitória exige os dezesseis encontros concluídos e ao menos um sobrevivente.', {}));
      }
    }

    return deepFreeze({ ok: violations.length === 0, violations: violations });
  }

  function enterInvalid(state, violations) {
    if (state && state.phase === 'invalid') {
      return state;
    }
    var hasSnapshotShape = hasCampaignShape(state);
    var priorSnapshot = hasSnapshotShape ? snapshot(state) : deepFreeze({
      version: state && state.version,
      phase: state && state.phase,
      rawState: clone(state)
    });
    var evidence = (violations || []).map(function (currentViolation) {
      var context = clone(currentViolation.context || {});
      context.priorSnapshot = priorSnapshot;
      return {
        code: currentViolation.code,
        message: currentViolation.message,
        context: context
      };
    });
    return replace(hasSnapshotShape ? state : createReadyState(), { phase: 'invalid', invariantViolations: evidence });
  }

  function invalidTransition(state, action) {
    return error(state, 'invalid_transition', 'Esta ação não está disponível no estado atual.', { phase: state.phase, action: action && action.type });
  }

  function dispatch(state, action) {
    if (!state || !action || typeof action.type !== 'string') {
      return error(state, 'invalid_action', 'A ação informada é inválida.', {});
    }
    if (state.phase !== 'invalid') {
      var stateValidation = validateState(state);
      if (!stateValidation.ok) {
        return ok(enterInvalid(state, stateValidation.violations));
      }
    }

    if (action.type === 'BEGIN') {
      if (state.phase !== 'ready') {
        return invalidTransition(state, action);
      }
      var normalized = normalizeSeed(action.seed);
      if (!normalized.ok) {
        return error(state, normalized.error.code, normalized.error.message, {});
      }
      return ok(changeWithHistory(state, {
        phase: 'intro',
        seed: normalized.seed,
        rngState: normalized.seed
      }, {
        type: 'campaign_started',
        seed: normalized.seed
      }));
    }

    if (action.type === 'CONTINUE_INTRO') {
      if (state.phase !== 'intro') {
        return invalidTransition(state, action);
      }
      var introFormation = deriveFormation(state);
      if (introFormation.mode === 'defeat') {
        return ok(changeWithHistory(state, { phase: 'defeat' }, { type: 'campaign_lost' }));
      }
      return ok(changeWithHistory(state, {
        phase: 'formation',
        dungeonId: 'physical',
        position: 1,
        draftPartyIds: introFormation.autoSelected ? introFormation.selectedHeroIds : []
      }, {
        type: 'formation_opened',
        dungeon: 'physical'
      }));
    }

    if (action.type === 'TOGGLE_HERO') {
      if (state.phase !== 'formation') {
        return invalidTransition(state, action);
      }
      var formation = deriveFormation(state);
      if (formation.autoSelected) {
        return error(state, 'formation_locked', 'Todos os sobreviventes devem partir nesta expedição.', { livingHeroIds: formation.livingHeroIds });
      }
      if (formation.livingHeroIds.indexOf(action.heroId) < 0) {
        return error(state, 'invalid_hero', 'O herói não pode entrar nesta formação.', { heroId: action.heroId });
      }
      var selected = state.draftPartyIds.slice();
      var selectedIndex = selected.indexOf(action.heroId);
      if (selectedIndex >= 0) {
        selected.splice(selectedIndex, 1);
      } else if (selected.length >= 3) {
        return error(state, 'invalid_party_size', 'Escolha exatamente três heróis sobreviventes.', { count: selected.length + 1 });
      } else {
        selected.push(action.heroId);
      }
      return ok(changeWithHistory(state, { draftPartyIds: selected }, {
        type: 'formation_selection_changed',
        heroId: action.heroId,
        selected: selected.indexOf(action.heroId) >= 0
      }));
    }

    if (action.type === 'DEPART') {
      if (state.phase !== 'formation') {
        return invalidTransition(state, action);
      }
      var departure = deriveFormation(state);
      if (!departure.canDepart) {
        return error(state, 'invalid_party_size', 'Escolha exatamente três heróis sobreviventes.', { count: departure.selectedHeroIds.length, required: departure.requiredCount });
      }
      return ok(changeWithHistory(state, {
        phase: 'dungeon_intro',
        partyIds: departure.selectedHeroIds,
        draftPartyIds: [],
        position: 1,
        pendingOutcome: null,
        pendingVictimId: null
      }, {
        type: 'party_formed',
        heroes: departure.selectedHeroIds
      }));
    }

    if (action.type === 'ENTER_DUNGEON') {
      if (state.phase !== 'dungeon_intro') {
        return invalidTransition(state, action);
      }
      return revealCurrentPosition(state);
    }

    if (action.type === 'CHOOSE_APPROACH') {
      if (state.phase !== 'encounter_choice') {
        return invalidTransition(state, action);
      }
      var activeEncounterId = currentEncounterId(state);
      var activeEncounter = Data.encounters[activeEncounterId];
      var chosenApproach = activeEncounter && activeEncounter.approaches.filter(function (currentApproach) { return currentApproach.id === action.approachId; })[0];
      if (!chosenApproach) {
        return error(state, 'invalid_approach', 'A abordagem não pertence ao encontro atual.', { approachId: action.approachId, encounterId: activeEncounterId });
      }
      if (state.partyIds.length === 0) {
        return error(state, 'empty_party', 'A expedição não possui heróis para resolver a abordagem.', {});
      }
      var holders = state.partyIds.filter(function (heroId) {
        return Data.heroes[heroId].competencyIds.indexOf(chosenApproach.competencyId) >= 0;
      });
      var success = holders.length > 0;
      var pendingOutcome = {
        encounterId: activeEncounterId,
        approachId: chosenApproach.id,
        competencyId: chosenApproach.competencyId,
        holderHeroIds: holders,
        success: success,
        resultText: success ? chosenApproach.successText : activeEncounter.failureText,
        victimId: null
      };
      return ok(changeWithHistory(state, {
        phase: 'approach_result',
        pendingOutcome: pendingOutcome
      }, {
        type: 'approach_resolved',
        dungeon: state.dungeonId,
        position: state.position,
        encounterId: activeEncounterId,
        approachId: chosenApproach.id,
        competency: chosenApproach.competencyId,
        success: success
      }));
    }

    if (action.type === 'ACK_SUCCESS') {
      if (state.phase !== 'approach_result' || !state.pendingOutcome || !state.pendingOutcome.success) {
        return invalidTransition(state, action);
      }
      return advancePosition(state);
    }

    if (action.type === 'OPEN_SACRIFICE') {
      if (state.phase !== 'approach_result' || !state.pendingOutcome || state.pendingOutcome.success) {
        return invalidTransition(state, action);
      }
      if (state.partyIds.length === 0) {
        return error(state, 'empty_sacrifice_pool', 'Não há herói presente para o sacrifício.', {});
      }
      return ok(changeWithHistory(state, { phase: 'sacrifice_choice' }, {
        type: 'sacrifice_choice_opened',
        encounterId: state.pendingOutcome.encounterId
      }));
    }

    if (action.type === 'SELECT_VICTIM') {
      if (state.phase !== 'sacrifice_choice') {
        return invalidTransition(state, action);
      }
      if (state.partyIds.indexOf(action.heroId) < 0 || state.deadHeroIds.indexOf(action.heroId) >= 0 || !Data.heroes[action.heroId]) {
        return error(state, 'invalid_victim', 'Escolha um herói vivo presente na expedição.', { heroId: action.heroId });
      }
      return ok(changeWithHistory(state, { phase: 'sacrifice_confirmation', pendingVictimId: action.heroId }, {
        type: 'sacrifice_victim_selected',
        encounterId: state.pendingOutcome.encounterId,
        heroId: action.heroId
      }));
    }

    if (action.type === 'CANCEL_SACRIFICE') {
      if (state.phase !== 'sacrifice_confirmation') {
        return invalidTransition(state, action);
      }
      return ok(changeWithHistory(state, { phase: 'sacrifice_choice', pendingVictimId: null }, {
        type: 'sacrifice_confirmation_cancelled',
        encounterId: state.pendingOutcome.encounterId
      }));
    }

    if (action.type === 'CONFIRM_SACRIFICE') {
      if (state.phase !== 'sacrifice_confirmation') {
        return invalidTransition(state, action);
      }
      if (!state.pendingVictimId || state.partyIds.indexOf(state.pendingVictimId) < 0) {
        return error(state, 'invalid_victim', 'Escolha um herói vivo presente na expedição.', { heroId: state.pendingVictimId });
      }
      var victimId = state.pendingVictimId;
      var nextOutcome = clone(state.pendingOutcome);
      nextOutcome.victimId = victimId;
      return ok(changeWithHistory(state, {
        phase: 'death_result',
        partyIds: state.partyIds.filter(function (heroId) { return heroId !== victimId; }),
        deadHeroIds: state.deadHeroIds.concat([victimId]),
        pendingOutcome: nextOutcome,
        pendingVictimId: null
      }, {
        type: 'hero_sacrificed',
        encounterId: state.pendingOutcome.encounterId,
        heroId: victimId
      }));
    }

    if (action.type === 'ACK_DEATH') {
      if (state.phase !== 'death_result' || !state.pendingOutcome || !state.pendingOutcome.victimId) {
        return invalidTransition(state, action);
      }
      var livingAfterDeath = livingHeroIds(state);
      if (livingAfterDeath.length === 0) {
        return ok(changeWithHistory(state, {
          phase: 'defeat',
          partyIds: [],
          draftPartyIds: [],
          pendingOutcome: null,
          pendingVictimId: null
        }, {
          type: 'campaign_lost'
        }));
      }
      if (state.partyIds.length === 0) {
        return ok(changeWithHistory(state, {
          phase: 'automatic_retreat',
          position: 1,
          draftPartyIds: [],
          pendingOutcome: null,
          pendingVictimId: null
        }, {
          type: 'automatic_retreat',
          dungeon: state.dungeonId
        }));
      }
      return advancePosition(state);
    }

    if (action.type === 'REQUEST_RETREAT') {
      if (!deriveRetreatEligibility(state)) {
        return error(state, 'retreat_unavailable', 'O recuo não está disponível neste momento.', { aliveHeroes: livingHeroIds(state).length });
      }
      return ok(changeWithHistory(state, { phase: 'retreat_confirmation' }, {
        type: 'retreat_requested',
        dungeon: state.dungeonId,
        position: state.position,
        fromPhase: state.phase
      }));
    }

    if (action.type === 'CANCEL_RETREAT') {
      if (state.phase !== 'retreat_confirmation') {
        return invalidTransition(state, action);
      }
      var returnPhase = retreatReturnPhase(state);
      return ok(changeWithHistory(state, { phase: returnPhase }, {
        type: 'retreat_cancelled',
        dungeon: state.dungeonId,
        position: state.position,
        returnPhase: returnPhase
      }));
    }

    if (action.type === 'CONFIRM_RETREAT') {
      return confirmRetreat(state);
    }

    if (action.type === 'ACK_AUTO_RETREAT') {
      if (state.phase !== 'automatic_retreat') {
        return invalidTransition(state, action);
      }
      var returnFormation = deriveFormation(state);
      return ok(changeWithHistory(state, {
        phase: returnFormation.mode === 'defeat' ? 'defeat' : 'formation',
        partyIds: [],
        draftPartyIds: returnFormation.autoSelected ? returnFormation.selectedHeroIds : [],
        position: 1
      }, {
        type: 'automatic_retreat_acknowledged',
        dungeon: state.dungeonId
      }));
    }

    if (action.type === 'CONTINUE_DUNGEON') {
      return advanceDungeon(state);
    }

    if (action.type === 'NEW_CAMPAIGN') {
      if (state.phase !== 'victory' && state.phase !== 'defeat') {
        return invalidTransition(state, action);
      }
      return ok(createReadyState());
    }

    return invalidTransition(state, action);
  }

  function heroPlayerRecord(heroId, state) {
    var hero = Data.heroes[heroId];
    return {
      id: hero.id,
      label: hero.label,
      lifeState: state.deadHeroIds.indexOf(heroId) >= 0 ? 'dead' : 'alive',
      competencyLabels: hero.competencyIds.map(function (competencyId) { return Data.competencies[competencyId].label; })
    };
  }

  function deriveFarewell(hero) {
    return hero.farewell || ('“Sigam sem mim.” — despedida provisória de ' + hero.label + '.');
  }

  function derivePlayerView(state) {
    var activeEncounterId = currentEncounterId(state);
    var activeEncounter = activeEncounterId ? Data.encounters[activeEncounterId] : null;
    var dungeonView = {
      physical: { number: 1, total: 3, label: 'Primeiro caminho' },
      supernatural: { number: 2, total: 3, label: 'Segundo caminho' },
      final: { number: 3, total: 3, label: 'Último caminho' }
    };
    var view = {
      version: state.version,
      phase: state.phase,
      dungeon: state.dungeonId ? dungeonView[state.dungeonId] : null,
      position: state.position,
      positionTotal: state.dungeonId === 'final' ? 6 : (state.dungeonId ? 5 : null),
      survivorCount: livingHeroIds(state).length,
      party: state.partyIds.map(function (heroId) { return heroPlayerRecord(heroId, state); }),
      town: townHeroIds(state).map(function (heroId) { return heroPlayerRecord(heroId, state); }),
      dead: state.deadHeroIds.map(function (heroId) { return heroPlayerRecord(heroId, state); }),
      bard: { label: 'Bardo', automatic: true, competencyLabels: [] },
      formation: state.phase === 'formation' ? deriveFormation(state) : null,
      canRetreat: deriveRetreatEligibility(state),
      retreatReturnPhase: state.phase === 'retreat_confirmation' ? retreatReturnPhase(state) : null,
      encounter: null,
      outcome: null,
      chosenApproachText: null,
      death: null,
      eligibleVictims: [],
      pendingVictim: state.pendingVictimId ? heroPlayerRecord(state.pendingVictimId, state) : null,
      ending: null,
      invalidMessage: state.phase === 'invalid' ? Data.copy.invalidState : null
    };

    if (activeEncounter) {
      view.encounter = {
        id: activeEncounter.id,
        title: activeEncounter.title,
        description: activeEncounter.description,
        imagePath: activeEncounter.imagePath,
        approaches: activeEncounter.approaches.map(function (currentApproach) {
          return { id: currentApproach.id, text: currentApproach.text };
        })
      };
    }

    if (state.pendingOutcome && ['approach_result', 'sacrifice_choice', 'sacrifice_confirmation', 'death_result'].indexOf(state.phase) >= 0) {
      var resolvedApproach = activeEncounter && activeEncounter.approaches.filter(function (currentApproach) {
        return currentApproach.id === state.pendingOutcome.approachId;
      })[0];
      var resolvedVictim = state.pendingOutcome.victimId ? Data.heroes[state.pendingOutcome.victimId] : null;
      view.outcome = {
        success: state.pendingOutcome.success,
        competencyLabel: Data.competencies[state.pendingOutcome.competencyId].label,
        partyHasCompetency: state.pendingOutcome.holderHeroIds.length > 0,
        explanation: state.pendingOutcome.resultText,
        victimId: state.pendingOutcome.victimId
      };
      view.chosenApproachText = resolvedApproach ? resolvedApproach.text : '';
      if (state.phase === 'death_result' && resolvedVictim) {
        view.death = {
          heroId: resolvedVictim.id,
          heroLabel: resolvedVictim.label,
          farewell: deriveFarewell(resolvedVictim)
        };
      }
    }
    if (state.phase === 'sacrifice_choice' || state.phase === 'sacrifice_confirmation') {
      view.eligibleVictims = state.partyIds.map(function (heroId) { return heroPlayerRecord(heroId, state); });
    }
    if (state.phase === 'victory') {
      view.ending = {
        statusLabel: Data.copy.provisionalLabel,
        central: Data.copy.centralEnding,
        epilogues: livingHeroIds(state).map(function (heroId) { return { heroId: heroId, text: Data.heroes[heroId].epilogue }; })
      };
    } else if (state.phase === 'defeat') {
      view.ending = {
        statusLabel: Data.copy.provisionalLabel,
        central: Data.copy.badEnding,
        epilogues: []
      };
    }

    return deepFreeze(view);
  }

  /** Frozen domain engine used by the browser controller and deterministic QA suites. */
  global.ExpeditionEngine = deepFreeze({
    createReadyState: createReadyState,
    dispatch: dispatch,
    derivePlayerView: derivePlayerView,
    deriveFarewell: deriveFarewell,
    snapshot: snapshot,
    validateCatalog: validateCatalog,
    validateState: validateState,
    normalizeSeed: normalizeSeed,
    createMulberry32: createMulberry32,
    selectEligible: selectEligible,
    deriveViability: deriveViability,
    deriveFormation: deriveFormation,
    deriveRetreatEligibility: deriveRetreatEligibility,
    deriveFinalCandidates: deriveFinalCandidates,
    eligibleEncounterIds: eligibleEncounterIds,
    revealCurrentPosition: revealCurrentPosition,
    confirmRetreat: confirmRetreat,
    advancePosition: advancePosition,
    advanceDungeon: advanceDungeon,
    completeCampaign: completeCampaign,
    appendHistory: appendHistory,
    enterInvalid: enterInvalid
  });
})(window);
