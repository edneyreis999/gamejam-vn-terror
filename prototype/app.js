(function (global) {
  'use strict';

  var Data = global.ExpeditionData;
  var Narrative = global.ExpeditionNarrative;
  var Engine = global.ExpeditionEngine;
  var activeQA = null;
  var HERO_POSITIONS = {
    H1: [9, 69], H2: [25, 73], H3: [38, 61], H4: [48, 76],
    H5: [58, 60], H6: [69, 77], H7: [80, 54], H8: [91, 72]
  };

  function deepFreeze(value) {
    if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
    Object.getOwnPropertyNames(value).forEach(function (key) { deepFreeze(value[key]); });
    return Object.freeze(value);
  }
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }
  function button(label, action, value, className) {
    var node = el('button', className || 'action-button', label);
    node.type = 'button';
    node.dataset.action = action;
    if (value !== undefined) node.dataset.value = value;
    return node;
  }
  function image(path, alt, className) {
    var frame = el('div', 'image-frame ' + (className || ''));
    var img = el('img'); img.src = path; img.alt = alt;
    var fallback = el('p', 'image-fallback', alt + ' — imagem indisponível'); fallback.hidden = true;
    img.onerror = function () {
      console.warn('optional_image_failed', path);
      img.onerror = null; img.remove(); fallback.hidden = false; frame.classList.add('has-missing-image');
    };
    frame.appendChild(img); frame.appendChild(fallback);
    return frame;
  }
  function heading(text, level) { return el('h' + (level || 1), 'scene-heading', text); }

  function createController(root, initialState) {
    if (!root || typeof root.appendChild !== 'function') throw new TypeError('ExpeditionApp.createController exige um elemento raiz.');
    var state = initialState || Engine.createReadyState();
    var destroyed = false, transitioning = false, pendingSeed = null, lastRejectedAction = null;
    var panel = null, panelTrigger = null, renderGeneration = 0, lastActivation = { key: '', at: 0 };
    var inspectedHeroId = null, inspectionSuppressedId = null, rovingHeroId = null;
    var absence = null, ownedTimers = [], mediaQuery = null;

    function later(callback, delay) {
      var id = global.setTimeout(function () {
        ownedTimers = ownedTimers.filter(function (item) { return item !== id; });
        if (!destroyed) callback();
      }, delay);
      ownedTimers.push(id);
      return id;
    }
    function cancelTimer(id) {
      if (id === null || id === undefined) return;
      global.clearTimeout(id);
      ownedTimers = ownedTimers.filter(function (item) { return item !== id; });
    }
    function clearAbsence() {
      if (absence) cancelTimer(absence.timer);
      absence = null;
    }
    function reduceMotion() { return Boolean(mediaQuery && mediaQuery.matches); }
    function onMotionChange(event) {
      if (!event.matches || !absence) return;
      clearAbsence();
      if (state.phase === 'formation') render([]);
    }
    if (typeof global.matchMedia === 'function') {
      mediaQuery = global.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.addEventListener) mediaQuery.addEventListener('change', onMotionChange);
      else if (mediaQuery.addListener) mediaQuery.addListener(onMotionChange);
    }

    function makeSnapshot() {
      var snapshot = clone(Engine.snapshot(state));
      snapshot.lastRejectedAction = lastRejectedAction ? clone(lastRejectedAction) : null;
      return deepFreeze(snapshot);
    }
    function validate() {
      var catalog = Engine.validateCatalog(Data, Narrative);
      if (!catalog.ok) return catalog;
      return Engine.validateState(state);
    }
    function setSeed(seed) {
      if (destroyed || !activeQA || activeQA.controller !== controller) return deepFreeze({ ok: false, error: { code: 'campaign_unavailable', message: 'A campanha ainda não está disponível.' } });
      if (state.phase !== 'ready') return deepFreeze({ ok: false, error: { code: 'campaign_already_started', message: 'Defina a semente antes de iniciar a campanha.' } });
      var normalized = Engine.normalizeSeed(seed);
      if (!normalized.ok) return normalized;
      pendingSeed = normalized.seed;
      return normalized;
    }
    function stamp(action) {
      var stamped = Object.assign({}, action);
      stamped.expectedSequence = state.sequence;
      if (stamped.type === 'BEGIN') stamped.seed = pendingSeed === null ? (Date.now() >>> 0) : pendingSeed;
      return stamped;
    }
    function acceptEffects(effects) {
      var effect = (effects || []).filter(function (item) { return item.type === 'tavern_absence'; })[0];
      if (!effect || reduceMotion()) return;
      clearAbsence();
      var deadline = Date.now() + 1000;
      absence = { heroIds: effect.heroIds.slice(), deadline: deadline, timer: null };
      absence.timer = later(function () {
        if (!absence || absence.deadline !== deadline) return;
        absence = null;
        if (state.phase === 'formation') render([]);
      }, 1000);
    }
    function dispatch(action) {
      if (destroyed) return { ok: false, state: state, error: { code: 'controller_destroyed', message: 'O controlador foi encerrado.', context: {} } };
      if (transitioning) return { ok: false, state: state, error: { code: 'transition_in_progress', message: 'Uma transição já está em andamento.', context: {} } };
      transitioning = true;
      try {
        var submitted = Object.prototype.hasOwnProperty.call(action, 'expectedSequence') ? action : stamp(action);
        var previousPhase = state.phase;
        var result = Engine.dispatch(state, submitted);
        if (result.ok) {
          state = result.state; lastRejectedAction = null; panel = null;
          if (submitted.type === 'BEGIN') pendingSeed = null;
          if (state.phase === 'formation') acceptEffects(result.effects);
          else clearAbsence();
          render(result.effects);
        } else {
          lastRejectedAction = { action: submitted.type, code: result.error.code, message: result.error.message, context: clone(result.error.context) };
          render([]);
        }
        var focusTarget = null;
        if (!result.ok) focusTarget = root.querySelector('[role="alert"]');
        else if (submitted.type === 'CHOOSE_APPROACH' && state.phase === 'approach_result') focusTarget = root.querySelector('.encounter-screen .scene-heading');
        else if (previousPhase === 'dungeon_complete' && state.phase === 'formation') focusTarget = root.querySelector('.formation-screen .scene-heading');
        else if (submitted.type === 'CANCEL_RETREAT') focusTarget = root.querySelector('[data-action="REQUEST_RETREAT"]');
        if (focusTarget) {
          if (!focusTarget.hasAttribute('tabindex')) focusTarget.tabIndex = -1;
          focusTarget.focus();
        }
        return result;
      } finally { transitioning = false; }
    }

    function renderHeader(main) {
      var brand = el('header', 'game-header');
      var identity = el('div', 'header-identity');
      identity.appendChild(el('p', 'eyebrow', 'Afogados em Terra Seca'));
      identity.appendChild(el('p', 'campaign-status', state.phase === 'ready' ? 'Uma campanha de horror e responsabilidade' : 'Campanha em andamento'));
      brand.appendChild(identity);
      if (state.phase !== 'ready' && state.phase !== 'invalid' && state.phase !== 'formation') brand.appendChild(button('Consultar elenco', 'OPEN_ROSTER', undefined, 'header-roster action-button'));
      main.appendChild(brand);
    }
    function renderReady(main) {
      var section = el('section', 'entry-screen');
      section.appendChild(el('p', 'lead', 'Visual novel de horror'));
      section.appendChild(heading('Afogados em Terra Seca'));
      var notices = el('div', 'content-notices');
      notices.appendChild(el('h2', '', 'Classificação e avisos de conteúdo'));
      notices.appendChild(el('p', '', 'Indicado para maiores de 16 anos. Contém morte permanente, sacrifício, afogamento, perseguição, manipulação, preconceito entre povos fantásticos e horror psicológico.'));
      section.appendChild(notices);
      section.appendChild(button('Jogar', 'BEGIN', undefined, 'primary-action'));
      main.appendChild(section);
    }
    function sceneBackground(sceneId) {
      var scene = Narrative.scenes[sceneId];
      var background = scene && Narrative.backgrounds[scene.backgroundId];
      return background && background.path;
    }
    function speakerPortrait(reading) {
      if (!reading || !reading.speakerId) return null;
      if (Data.heroes[reading.speakerId]) return Data.heroes[reading.speakerId].portraitPath;
      return Narrative.speakers[reading.speakerId] && Narrative.speakers[reading.speakerId].portraitPath;
    }
    function readingActions(view) {
      var actions = el('div', 'scene-actions');
      actions.appendChild(button('Avançar', 'ADVANCE_TEXT', undefined, 'primary-action'));
      if (view.reading.canSkip) actions.appendChild(button('Pular texto já lido', 'SKIP_SEEN_TEXT'));
      if (view.canRetreat) actions.appendChild(button('Recuar', 'REQUEST_RETREAT'));
      return actions;
    }
    function readingPassage(view) {
      var passage = el('div', 'passage-panel'); passage.tabIndex = 0; passage.dataset.action = 'ADVANCE_TEXT';
      if (view.reading.speakerName) passage.appendChild(el('p', 'speaker-name', view.reading.speakerName));
      passage.appendChild(el('p', 'passage-text', view.reading.text));
      passage.appendChild(el('p', 'passage-progress', (view.reading.index + 1) + ' de ' + view.reading.total));
      return passage;
    }
    function renderExpedition(main, view) {
      var section = el('section', 'encounter-screen');
      var party = el('div', 'expedition-party'); party.setAttribute('aria-label', 'Heróis da expedição');
      view.heroes.filter(function (hero) { return hero.alive && state.partyIds.indexOf(hero.id) >= 0; }).forEach(function (hero) {
        party.appendChild(image(hero.portraitPath, hero.name, 'expedition-portrait'));
      });
      section.appendChild(party);
      var threshold = view.phase === 'dungeon_intro';
      var destination = view.destinations[state.dungeonId];
      var title = threshold ? 'À entrada do caminho' : view.currentEncounter.title;
      section.appendChild(image(threshold ? destination.previewPath : view.currentEncounter.imagePath, title, 'encounter-art'));
      var choices = el('div', 'approach-grid');
      if (view.phase === 'encounter_choice') {
        view.currentEncounter.approaches.forEach(function (item) { choices.appendChild(button(item.text, 'CHOOSE_APPROACH', item.id, 'approach-card')); });
        if (view.canRetreat) choices.appendChild(button('Recuar', 'REQUEST_RETREAT'));
      } else if (view.reading) choices.appendChild(readingActions(view));
      else {
        choices.appendChild(button('Entrar no encontro', 'ENTER_DUNGEON', undefined, 'primary-action'));
        if (view.canRetreat) choices.appendChild(button('Recuar', 'REQUEST_RETREAT'));
      }
      section.appendChild(choices);
      var passage = view.reading ? readingPassage(view) : el('div', 'encounter-copy');
      var meta = el('div', 'encounter-progress');
      meta.appendChild(el('span', '', destination.name));
      meta.appendChild(el('span', '', 'Encontro ' + state.position + ' de ' + destination.landmarks.total));
      meta.appendChild(el('span', '', 'Progresso conhecido: ' + destination.landmarks.traversed + '/' + destination.landmarks.total));
      passage.insertBefore(heading(title), passage.firstChild);
      passage.insertBefore(meta, passage.firstChild);
      if (!view.reading) passage.appendChild(el('p', 'passage-text', threshold ? 'A expedição alcançou a posição ' + state.position + ' de ' + destination.landmarks.total + '.' : view.currentEncounter.description));
      section.appendChild(passage); main.appendChild(section);
    }
    function renderConsequence(main, view) {
      var section = el('section', 'consequence-screen');
      var card = el('div', 'consequence-card');
      card.appendChild(el('p', 'consequence-label', 'Consequência irreversível'));
      var title = heading(view.reading.passageId.indexOf('farewell.') === 0 ? 'Despedida' : 'A perda');
      title.tabIndex = -1; card.appendChild(title);
      card.appendChild(readingPassage(view)); card.appendChild(readingActions(view));
      section.appendChild(card); main.appendChild(section);
      later(function () { if (title.isConnected) title.focus(); }, 0);
    }
    function renderLovers(main, view) {
      var section = el('section', 'lover-screen');
      var sceneId = view.reading.sceneId;
      var background = sceneBackground(sceneId);
      if (background) section.appendChild(image(background, 'Cenário da descoberta', 'scene-background'));
      var isLover = sceneId.indexOf('lover.') === 0;
      if (isLover) {
        var physical = sceneId.indexOf('lover.physical.') === 0;
        var speaker = Narrative.speakers[physical ? 'perola' : 'florai'];
        section.appendChild(image(speaker.portraitPath, speaker.name + (physical ? ' incorporada à pedra' : ' incorporado às raízes'), 'speaker-portrait lover-portrait'));
        section.appendChild(el('div', 'prison-boundary ' + (physical ? 'stone' : 'roots'), physical ? 'Pedra da prisão sob o altar' : 'Raízes da figueira-prisão'));
      }
      var card = el('div', 'lover-card');
      card.appendChild(heading(isLover ? speaker.name : 'A peça do mapa'));
      card.appendChild(readingPassage(view));
      if (state.mapPieceIds.length) {
        var pieces = el('div', 'map-pieces'); pieces.setAttribute('aria-label', 'Peças do mapa');
        state.mapPieceIds.forEach(function (id) { pieces.appendChild(el('span', 'map-piece', id === 'physical' ? 'Peça anã' : 'Peça élfica')); });
        card.appendChild(pieces);
      }
      card.appendChild(readingActions(view)); section.appendChild(card); main.appendChild(section);
    }
    function councilStage(view) {
      var section = el('section', 'council-screen');
      section.appendChild(image(Narrative.backgrounds.council.path, 'Casa do Conselho', 'scene-background'));
      if ((view.reading && view.reading.speakerId === 'andira') || state.seenPassageIds.indexOf('council.andira') >= 0) {
        section.appendChild(image(Narrative.speakers.andira.portraitPath, 'Andirá somente no reflexo', 'speaker-portrait reflection-portrait'));
      }
      var party = el('div', 'council-party');
      view.climaxHeroes.forEach(function (hero) { party.appendChild(image(hero.portraitPath, hero.name, 'expedition-portrait')); });
      section.appendChild(party);
      return section;
    }
    function renderCouncil(main, view) {
      var section = councilStage(view), card = el('div', 'council-card');
      card.appendChild(heading('A Casa do Conselho')); card.appendChild(readingPassage(view));
      card.appendChild(readingActions(view)); section.appendChild(card); main.appendChild(section);
    }
    function renderClosingPassage(main, view) {
      var section = el('section', 'closing-screen phase-' + view.phase);
      var card = el('div', 'consequence-card');
      var title = { memorial: 'Memorial', epilogue: 'Depois da expedição', automatic_retreat: 'Retorno obrigatório' }[view.phase];
      if (!title) title = { bad: 'Afogados em terra seca', reunite: 'As duas margens', destroy: 'O medalhão destruído' }[view.ending];
      card.appendChild(heading(title));
      if (view.phase === 'memorial' && /^memorial\.H[1-8]$/.test(view.reading.passageId)) {
        var heroId = view.reading.passageId.split('.')[1], hero = Data.heroes[heroId];
        card.appendChild(image(hero.portraitPath, 'Retrato memorial de ' + hero.label, 'speaker-portrait memorial-portrait'));
      }
      card.appendChild(readingPassage(view));
      card.appendChild(readingActions(view)); section.appendChild(card); main.appendChild(section);
    }
    function renderReading(main, view) {
      if (['dungeon_intro', 'encounter_intro', 'approach_result'].indexOf(view.phase) >= 0) { renderExpedition(main, view); return; }
      if (view.phase === 'death_result') { renderConsequence(main, view); return; }
      if (view.phase === 'dungeon_complete') { renderLovers(main, view); return; }
      if (view.phase === 'council') { renderCouncil(main, view); return; }
      if (['ending', 'memorial', 'epilogue', 'automatic_retreat'].indexOf(view.phase) >= 0) { renderClosingPassage(main, view); return; }
      var section = el('section', 'narrative-screen phase-' + view.phase);
      var title = ({ intro: 'O convite de Ivaí', dungeon_complete: 'A peça do mapa', council: 'A Casa do Conselho', ending: 'O destino do medalhão', memorial: 'Memorial', epilogue: 'Depois da expedição', automatic_retreat: 'Retorno obrigatório' }[view.phase] || 'A expedição');
      section.appendChild(heading(title));
      var stage = el('div', 'narrative-stage');
      var background = sceneBackground(view.reading.sceneId);
      if (background) stage.appendChild(image(background, 'Cenário de ' + title, 'scene-background'));
      var portrait = speakerPortrait(view.reading);
      if (portrait) {
        var portraitClass = view.reading.speakerId === 'andira' ? 'speaker-portrait reflection-portrait' : 'speaker-portrait';
        stage.appendChild(image(portrait, view.reading.speakerName || 'Personagem', portraitClass));
      }
      stage.appendChild(readingPassage(view)); section.appendChild(stage);
      section.appendChild(readingActions(view)); main.appendChild(section);
    }
    function renderHeroCard(hero, automatic, fading) {
      var position = HERO_POSITIONS[hero.id];
      var spot = el('div', 'hero-spot hero-spot-' + hero.id.toLowerCase());
      spot.dataset.heroId = hero.id;
      spot.style.setProperty('--hero-x', position[0] + '%');
      spot.style.setProperty('--hero-y', position[1] + '%');
      if (!hero.alive && !fading) {
        spot.classList.add('is-empty');
        spot.appendChild(el('span', 'sr-only', 'Lugar vazio'));
        return spot;
      }
      var card = el('button', 'hero-card' + (hero.selected ? ' is-selected' : '') + (fading ? ' is-fading' : '') + (inspectedHeroId === hero.id && inspectionSuppressedId !== hero.id ? ' is-inspected' : ''));
      card.type = 'button'; card.dataset.action = hero.alive && !automatic ? 'TOGGLE_HERO' : 'INSPECT_HERO'; card.dataset.value = hero.id;
      card.dataset.heroId = hero.id; card.dataset.x = position[0]; card.dataset.y = position[1];
      card.disabled = !hero.alive || fading;
      card.tabIndex = hero.alive && !fading && rovingHeroId === hero.id ? 0 : -1;
      card.setAttribute('aria-pressed', hero.selected ? 'true' : 'false');
      card.setAttribute('aria-label', hero.name + ', ' + (hero.selected ? 'na expedição' : 'fora da expedição') + '. Inspecionar e ' + (automatic ? 'membro automático' : 'alternar participação'));
      if (fading && absence) {
        var remaining = Math.max(0, absence.deadline - Date.now());
        card.style.setProperty('--absence-opacity', String(remaining / 1000));
        card.style.setProperty('--absence-duration', remaining + 'ms');
      }
      card.appendChild(image(hero.portraitPath, 'Retrato de ' + hero.name, 'hero-portrait'));
      if (hero.selected) card.appendChild(el('span', 'membership-label', 'Na expedição'));
      var sheet = el('span', 'hero-sheet');
      sheet.appendChild(el('strong', 'hero-sheet-name', hero.name));
      [['Pronomes', hero.pronouns], ['Raça', hero.race], ['Ocupação', hero.profession], ['Estado', hero.selected ? 'Selecionado' : 'Disponível']].forEach(function (field) {
        var row = el('span', 'hero-sheet-row'); row.appendChild(el('b', '', field[0])); row.appendChild(el('span', '', field[1])); sheet.appendChild(row);
      });
      sheet.appendChild(el('span', 'hero-summary', hero.summary));
      var speech = el('span', 'hero-speech', '“' + hero.presentationText + '”');
      if (position[0] >= 52) speech.classList.add('speech-left'); else speech.classList.add('speech-right');
      card.appendChild(sheet); card.appendChild(speech); spot.appendChild(card);
      return spot;
    }
    function renderFormation(main, view, effects) {
      var section = el('section', 'formation-screen');
      var title = heading('Preparação na taverna'); title.classList.add('sr-only'); section.appendChild(title);
      var tavern = el('div', 'tavern-stage'); tavern.style.backgroundImage = 'url("assets/scenes/taverna.png")';
      var fading = absence && Date.now() < absence.deadline ? absence.heroIds : [];
      var firstLiving = view.heroes.filter(function (hero) { return hero.alive && fading.indexOf(hero.id) < 0; })[0];
      if (!rovingHeroId || !view.heroes.some(function (hero) { return hero.id === rovingHeroId && hero.alive && fading.indexOf(hero.id) < 0; })) rovingHeroId = firstLiving && firstLiving.id;
      view.heroes.forEach(function (hero) {
        var renderedHero = view.formation.automatic && hero.alive ? Object.assign({}, hero, { selected: true }) : hero;
        tavern.appendChild(renderHeroCard(renderedHero, view.formation.automatic, fading.indexOf(hero.id) >= 0));
      });
      section.appendChild(tavern);
      var selected = view.selectedDestination && view.destinations[view.selectedDestination];
      var summary = el('div', 'formation-summary');
      summary.appendChild(el('strong', '', 'Expedição'));
      summary.appendChild(el('span', '', view.formation.selectedHeroIds.length + ' de ' + view.formation.required + ' presentes'));
      summary.appendChild(el('span', 'selected-destination', selected ? 'Destino: ' + selected.name : 'Destino ainda não escolhido'));
      section.appendChild(summary);
      var actions = el('div', 'scene-actions');
      actions.appendChild(button('Consultar elenco', 'OPEN_ROSTER'));
      actions.appendChild(button('Escolher destino', 'OPEN_DESTINATIONS'));
      actions.appendChild(button('Partir', 'DEPART', undefined, 'primary-action'));
      section.appendChild(actions); main.appendChild(section);
    }
    function renderDestinations(main, view) {
      var dialog = el('dialog', 'overlay-panel destination-dialog'); dialog.setAttribute('aria-modal', 'true'); dialog.setAttribute('aria-labelledby', 'destination-dialog-title');
      var close = button('Fechar', 'CLOSE_PANEL'); close.classList.add('dialog-close'); dialog.appendChild(close);
      var title = heading('Escolher destino', 2); title.id = 'destination-dialog-title'; dialog.appendChild(title);
      var cards = el('div', 'destination-grid');
      Object.keys(view.destinations).forEach(function (id) {
        var destination = view.destinations[id], card = el('article', 'destination-card status-' + destination.status);
        if (destination.selected) {
          card.classList.add('is-selected');
          card.setAttribute('aria-label', destination.name + ', destino escolhido');
        }
        card.appendChild(image(destination.previewPath, destination.name, 'destination-preview'));
        card.appendChild(el('h3', '', destination.name)); card.appendChild(el('p', '', destination.rumor));
        var status = destination.status === 'available' ? 'Disponível' : (destination.status === 'completed' ? 'Concluído' : 'Bloqueado');
        card.appendChild(el('p', 'destination-status', status));
        if (destination.selected) card.appendChild(el('p', 'destination-selection', 'Destino escolhido'));
        card.appendChild(el('p', 'destination-progress', 'Progresso conhecido: ' + destination.landmarks.traversed + '/' + destination.landmarks.total));
        if (destination.lockReason) card.appendChild(el('p', 'destination-reason', destination.lockReason));
        if (destination.status === 'available') card.appendChild(button('Escolher ' + destination.name, 'SELECT_DESTINATION', id));
        cards.appendChild(card);
      });
      dialog.appendChild(cards); main.appendChild(dialog);
    }
    function renderRoster(main, view) {
      var dialog = el('dialog', 'overlay-panel roster-dialog'); dialog.setAttribute('aria-modal', 'true'); dialog.setAttribute('aria-labelledby', 'roster-dialog-title');
      var close = button('Fechar', 'CLOSE_PANEL'); close.classList.add('dialog-close'); dialog.appendChild(close);
      var title = heading('Heróis', 2); title.id = 'roster-dialog-title'; dialog.appendChild(title);
      var list = el('ul', 'roster-list');
      view.heroes.forEach(function (hero) {
        var item = el('li', hero.alive ? 'is-alive' : 'is-dead');
        item.appendChild(image(hero.portraitPath, '', 'roster-portrait'));
        var copy = el('div'); copy.appendChild(el('span', 'roster-state', hero.alive ? 'Vivo' : 'Morto'));
        copy.appendChild(el('strong', '', hero.name)); copy.appendChild(el('span', '', hero.profession + ' ' + hero.race.toLowerCase()));
        item.appendChild(copy); list.appendChild(item);
      });
      dialog.appendChild(list); main.appendChild(dialog);
    }
    function renderSacrifice(main, view) {
      var section = el('section', 'sacrifice-screen');
      var card = el('div', 'consequence-card'); section.appendChild(card);
      var warning = heading('A escolha é irreversível', 1); warning.tabIndex = -1; card.appendChild(warning);
      card.appendChild(el('p', 'irreversible-warning', 'A primeira pessoa ativada morrerá imediatamente para abrir a passagem. Não haverá confirmação ou retorno.'));
      var choices = el('div', 'victim-grid');
      view.victims.forEach(function (hero) {
        var victim = button('', 'SELECT_VICTIM', hero.id, 'victim-card');
        victim.appendChild(image(hero.portraitPath, '', 'victim-portrait'));
        victim.appendChild(el('strong', '', 'Sacrificar ' + hero.name)); choices.appendChild(victim);
      });
      card.appendChild(choices); main.appendChild(section);
      later(function () { if (warning.isConnected) warning.focus(); }, 0);
    }
    function renderFinalChoice(main, view) {
      var section = councilStage(view), card = el('div', 'council-card final-choice-screen');
      card.appendChild(heading('O destino do Medalhão das Duas Margens'));
      card.appendChild(el('p', 'passage-text', 'As opiniões dos sobreviventes não votam nem bloqueiam Ivaí. A decisão é sua.'));
      view.endingChoices.forEach(function (choice) { card.appendChild(button(choice.label, 'CHOOSE_ENDING', choice.id, 'ending-choice')); });
      section.appendChild(card); main.appendChild(section);
    }
    function renderRetreat(main) {
      var section = el('dialog', 'overlay-panel'); section.setAttribute('aria-modal', 'true');
      section.appendChild(heading('Recuar para a taverna?', 2));
      section.appendChild(el('p', '', 'Os encontros revelados e o maior progresso concluído serão preservados.'));
      section.appendChild(button('Cancelar', 'CANCEL_RETREAT')); section.appendChild(button('Confirmar recuo', 'CONFIRM_RETREAT', undefined, 'primary-action'));
      main.appendChild(section);
    }
    function renderComplete(main) {
      var section = el('section', 'campaign-complete'); section.appendChild(heading('Campanha concluída'));
      section.appendChild(el('p', 'lead', 'A história desta expedição terminou. Outro caminho exige uma campanha nova.'));
      section.appendChild(button('Jogar novamente', 'NEW_CAMPAIGN', undefined, 'primary-action')); main.appendChild(section);
    }
    function renderInvalid(main) {
      var section = el('section', 'fatal-screen'); section.appendChild(heading('O protótipo encontrou um estado inválido.'));
      section.appendChild(el('p', '', 'Recarregue a página e registre a semente e a sequência de ações.'));
      var reload = button('Recarregar a página', 'RELOAD'); section.appendChild(reload); main.appendChild(section);
    }
    function render(effects) {
      if (destroyed) return;
      renderGeneration += 1;
      Array.prototype.forEach.call(root.querySelectorAll('img'), function (img) { img.onerror = null; });
      Array.prototype.forEach.call(root.querySelectorAll('dialog[open]'), function (dialog) {
        if (typeof dialog.close === 'function') dialog.close();
        else dialog.removeAttribute('open');
      });
      root.textContent = '';
      var main = el('main', 'game-shell'); renderHeader(main);
      var view = Engine.derivePlayerView(state);
      if (view.phase === 'ready') renderReady(main);
      else if (view.phase === 'formation') renderFormation(main, view, effects);
      else if (view.reading) renderReading(main, view);
      else if (view.phase === 'dungeon_intro') renderExpedition(main, view);
      else if (view.phase === 'encounter_choice') renderExpedition(main, view);
      else if (view.phase === 'sacrifice_choice') renderSacrifice(main, view);
      else if (view.phase === 'retreat_confirmation') renderRetreat(main);
      else if (view.phase === 'final_choice') renderFinalChoice(main, view);
      else if (view.phase === 'campaign_complete') renderComplete(main);
      else renderInvalid(main);
      if (lastRejectedAction) {
        var live = el('p', 'action-feedback', lastRejectedAction.message); live.setAttribute('role', 'alert'); main.appendChild(live);
      }
      if (panel === 'destinations' && view.phase === 'formation') renderDestinations(main, view);
      if (panel === 'roster' && view.phase !== 'ready' && view.phase !== 'invalid') renderRoster(main, view);
      root.appendChild(main);
      Array.prototype.forEach.call(root.querySelectorAll('dialog:not([open])'), function (dialog) {
        if (typeof dialog.showModal === 'function') dialog.showModal();
        else dialog.setAttribute('open', '');
      });
      if (panel) {
        var closeButton = root.querySelector('dialog[open] [data-action="CLOSE_PANEL"]');
        if (closeButton) closeButton.focus();
      } else if (panelTrigger) {
        var restoredTrigger = root.querySelector('[data-action="' + panelTrigger + '"]');
        if (restoredTrigger) restoredTrigger.focus();
        panelTrigger = null;
      }
    }
    function actionFromNode(node) {
      var type = node.dataset.action, value = node.dataset.value;
      if (type === 'SELECT_DESTINATION') return { type: type, dungeonId: value };
      if (type === 'TOGGLE_HERO' || type === 'SELECT_VICTIM') return { type: type, heroId: value };
      if (type === 'CHOOSE_APPROACH') return { type: type, approachId: value };
      if (type === 'CHOOSE_ENDING') return { type: type, ending: value };
      return { type: type };
    }
    function setInspection(heroId, suppress) {
      inspectedHeroId = heroId;
      inspectionSuppressedId = suppress ? heroId : null;
      Array.prototype.forEach.call(root.querySelectorAll('.hero-card'), function (card) {
        card.classList.toggle('is-inspected', card.dataset.heroId === heroId && inspectionSuppressedId !== heroId);
      });
    }
    function activate(node, event) {
      if (!node || !node.dataset.action) return;
      var type = node.dataset.action;
      if (type === 'OPEN_DESTINATIONS') { panelTrigger = type; panel = 'destinations'; render([]); return; }
      if (type === 'OPEN_ROSTER') { panelTrigger = type; panel = 'roster'; render([]); return; }
      if (type === 'CLOSE_PANEL') { panel = null; render([]); return; }
      if (type === 'INSPECT_HERO') { setInspection(node.dataset.heroId || node.dataset.value, false); return; }
      if (type === 'RELOAD') { global.location.reload(); return; }
      var key = type + ':' + (node.dataset.value || ''); var now = event.timeStamp || Date.now();
      if (lastActivation.key === key && now - lastActivation.at < 350) return;
      lastActivation = { key: key, at: now };
      var generation = renderGeneration;
      if (!node.isConnected || generation !== renderGeneration) return;
      dispatch(actionFromNode(node));
    }
    function onClick(event) {
      var target = event.target.closest('[data-action]');
      if (!target || !root.contains(target)) return;
      var openDialog = root.querySelector('dialog[open]');
      if (openDialog && !openDialog.contains(target)) return;
      if (target.classList.contains('passage-panel') && event.target.closest('button')) return;
      if (target.classList.contains('passage-panel') && global.getSelection && String(global.getSelection())) return;
      activate(target, event);
    }
    function onMouseOver(event) {
      if (panel) return;
      var card = event.target.closest && event.target.closest('.hero-card');
      if (card && root.contains(card) && !card.disabled) setInspection(card.dataset.heroId, false);
    }
    function onMouseOut(event) {
      var card = event.target.closest && event.target.closest('.hero-card');
      if (!card || card !== root.querySelector('.hero-card.is-inspected')) return;
      if (event.relatedTarget && card.contains(event.relatedTarget)) return;
      if (document.activeElement !== card) setInspection(null, false);
    }
    function onFocusIn(event) {
      var card = event.target.closest && event.target.closest('.hero-card');
      if (!card || card.disabled) return;
      rovingHeroId = card.dataset.heroId;
      Array.prototype.forEach.call(root.querySelectorAll('.hero-card'), function (item) { item.tabIndex = item === card ? 0 : -1; });
      if (inspectionSuppressedId !== card.dataset.heroId) setInspection(card.dataset.heroId, false);
    }
    function onFocusOut(event) {
      var card = event.target.closest && event.target.closest('.hero-card');
      if (!card || (event.relatedTarget && card.contains(event.relatedTarget))) return;
      if (!card.matches(':hover')) setInspection(null, false);
    }
    function onDialogCancel(event) {
      if (!event.target || event.target.tagName !== 'DIALOG') return;
      event.preventDefault();
      if (panel) { panel = null; render([]); return; }
      if (state.phase === 'retreat_confirmation') dispatch({ type: 'CANCEL_RETREAT' });
    }
    function directionalHero(card, key) {
      var source = card.getBoundingClientRect();
      var x = source.left + source.width / 2, y = source.top + source.height / 2;
      return Array.prototype.slice.call(root.querySelectorAll('.hero-card:not([disabled])')).filter(function (candidate) {
        if (candidate === card) return false;
        var rect = candidate.getBoundingClientRect();
        var dx = rect.left + rect.width / 2 - x, dy = rect.top + rect.height / 2 - y;
        if (key === 'ArrowLeft') return dx < 0;
        if (key === 'ArrowRight') return dx > 0;
        if (key === 'ArrowUp') return dy < 0;
        return dy > 0;
      }).sort(function (a, b) {
        var ar = a.getBoundingClientRect(), br = b.getBoundingClientRect();
        var adx = ar.left + ar.width / 2 - x, ady = ar.top + ar.height / 2 - y;
        var bdx = br.left + br.width / 2 - x, bdy = br.top + br.height / 2 - y;
        return (adx * adx + ady * ady) - (bdx * bdx + bdy * bdy);
      })[0] || null;
    }
    function onKeydown(event) {
      if (event.repeat) return;
      if (event.key === 'Escape' && panel) { event.preventDefault(); panel = null; render([]); return; }
      if (event.key === 'Escape' && event.target.classList && event.target.classList.contains('hero-card')) { event.preventDefault(); setInspection(event.target.dataset.heroId, true); return; }
      if (panel && event.key === 'Tab') {
        var controls = Array.prototype.slice.call(root.querySelectorAll('dialog[open] button:not([disabled])'));
        if (controls.length) {
          var activeIndex = controls.indexOf(document.activeElement);
          var nextIndex = event.shiftKey ? activeIndex - 1 : activeIndex + 1;
          if (nextIndex < 0) nextIndex = controls.length - 1;
          if (nextIndex >= controls.length) nextIndex = 0;
          event.preventDefault(); controls[nextIndex].focus();
        }
        return;
      }
      if (!panel && /^Arrow(Left|Right|Up|Down)$/.test(event.key) && event.target.classList && event.target.classList.contains('hero-card')) {
        var nextCard = directionalHero(event.target, event.key);
        if (nextCard) { event.preventDefault(); nextCard.focus(); }
        return;
      }
      if (event.key === 'Enter' && state.reading && !event.target.closest('button')) { event.preventDefault(); dispatch({ type: 'ADVANCE_TEXT' }); }
    }
    root.addEventListener('click', onClick); root.addEventListener('keydown', onKeydown);
    root.addEventListener('cancel', onDialogCancel, true);
    root.addEventListener('mouseover', onMouseOver); root.addEventListener('mouseout', onMouseOut);
    root.addEventListener('focusin', onFocusIn); root.addEventListener('focusout', onFocusOut);
    var controller = {
      dispatch: dispatch,
      getState: function () { return state; },
      destroy: function () {
        if (destroyed) return;
        destroyed = true;
        Array.prototype.forEach.call(root.querySelectorAll('dialog[open]'), function (dialog) {
          if (typeof dialog.close === 'function') dialog.close();
          else dialog.removeAttribute('open');
        });
        clearAbsence(); ownedTimers.slice().forEach(cancelTimer);
        if (mediaQuery) {
          if (mediaQuery.removeEventListener) mediaQuery.removeEventListener('change', onMotionChange);
          else if (mediaQuery.removeListener) mediaQuery.removeListener(onMotionChange);
        }
        root.removeEventListener('click', onClick); root.removeEventListener('keydown', onKeydown);
        root.removeEventListener('cancel', onDialogCancel, true);
        root.removeEventListener('mouseover', onMouseOver); root.removeEventListener('mouseout', onMouseOut);
        root.removeEventListener('focusin', onFocusIn); root.removeEventListener('focusout', onFocusOut);
        Array.prototype.forEach.call(root.querySelectorAll('img'), function (img) { img.onerror = null; });
        panel = null; root.textContent = '';
        if (activeQA && activeQA.controller === controller) activeQA = null;
      }
    };
    activeQA = { controller: controller, setSeed: setSeed, snapshot: makeSnapshot, validate: validate };
    render([]);
    return controller;
  }

  var qa = {};
  Object.defineProperties(qa, {
    setSeed: { enumerable: true, value: function (seed) { return activeQA ? activeQA.setSeed(seed) : deepFreeze({ ok: false, error: { code: 'campaign_unavailable', message: 'A campanha ainda não está disponível.' } }); } },
    snapshot: { enumerable: true, value: function () { return activeQA ? activeQA.snapshot() : null; } },
    validate: { enumerable: true, value: function () { return activeQA ? activeQA.validate() : deepFreeze({ ok: false, violations: [{ code: 'campaign_unavailable', message: 'A campanha ainda não está disponível.', context: {} }] }); } }
  });
  global.expeditionQA = deepFreeze(qa);
  global.ExpeditionApp = deepFreeze({ createController: createController });
  document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('app');
    if (!root) return;
    var catalog = Engine.validateCatalog(Data, Narrative);
    var controller = createController(root);
    if (!catalog.ok) {
      var invalid = clone(controller.getState()); invalid.phase = 'invalid'; invalid.invariantViolations = clone(catalog.violations);
      controller.destroy(); createController(root, deepFreeze(invalid));
    }
  });
})(window);
