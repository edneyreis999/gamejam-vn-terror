(function (global) {
  'use strict';

  var Data = global.ExpeditionData;
  var Engine = global.ExpeditionEngine;
  var COPY = Object.freeze({
    title: 'EXPEDIÇÃO E SACRIFÍCIO',
    baseline: 'Baseline jogável para validação mecânica',
    rules: 'Escolha três heróis. Leia as armadilhas. Toda falha exige um sacrifício.',
    disclosure: 'As competências dos heróis estão visíveis neste protótipo. As competências das abordagens permanecem ocultas até a escolha.',
    intro: 'O bardo reuniu oito heróis para recuperar duas metades de um mapa e seguir até o último caminho. A natureza do tesouro e o horror familiar permanecem pendentes no GDD.',
    provisional: 'Conteúdo provisório do protótipo',
    dungeonIntroductions: Object.freeze([
      Object.freeze({ title: 'A mata tomou a construção.', detail: 'A primeira metade do mapa está adiante.' }),
      Object.freeze({ title: 'As vozes sabem nomes que ninguém pronunciou.', detail: 'A segunda metade do mapa está adiante.' }),
      Object.freeze({ title: 'As duas metades apontam para o último caminho.', detail: '' })
    ])
  });
  var OPTIONAL_IMAGE_TIMEOUT_MS = 4000;
  var activeQASession = null;

  function deepFreeze(value) {
    if (!value || typeof value !== 'object' || Object.isFrozen(value)) {
      return value;
    }
    Object.keys(value).forEach(function (key) {
      deepFreeze(value[key]);
    });
    return Object.freeze(value);
  }

  function inactiveSnapshot() {
    return Engine.snapshot(Engine.createReadyState());
  }

  var expeditionQA = Object.freeze({
    setSeed: function (seed) {
      return activeQASession ? activeQASession.setSeed(seed) : deepFreeze({
        ok: false,
        error: {
          code: 'campaign_unavailable',
          message: 'A campanha ainda não está disponível.'
        }
      });
    },
    snapshot: function () {
      return activeQASession ? activeQASession.snapshot() : inactiveSnapshot();
    },
    validate: function () {
      return activeQASession ? activeQASession.validate() : deepFreeze({ ok: true, violations: [] });
    }
  });
  global.expeditionQA = expeditionQA;

  function element(tagName, className, text) {
    var node = document.createElement(tagName);
    if (className) {
      node.className = className;
    }
    if (typeof text === 'string') {
      node.textContent = text;
    }
    return node;
  }

  function append(parent) {
    for (var index = 1; index < arguments.length; index += 1) {
      if (arguments[index]) {
        parent.appendChild(arguments[index]);
      }
    }
    return parent;
  }

  function setAction(button, action, id) {
    button.dataset.action = action;
    if (id) {
      button.dataset.id = id;
    }
    return button;
  }

  function actionButton(label, variant, action, id) {
    return setAction(element('button', 'button' + (variant ? ' ' + variant : ''), label), action, id);
  }

  function provisionalLabel() {
    return element('span', 'provisional', COPY.provisional);
  }

  function pageHeading(text, id, className) {
    var heading = element('h1', className || '', text);
    heading.id = id;
    heading.tabIndex = -1;
    heading.dataset.surfaceHeading = '';
    return heading;
  }

  function statusFact(text) {
    return element('span', '', text);
  }

  function renderOpening() {
    var main = element('main', 'artboard opening');
    main.id = 'main';
    var section = element('section', 'opening-content');
    section.setAttribute('aria-labelledby', 'opening-title');
    var eyebrow = element('p', 'eyebrow', COPY.baseline);
    var title = pageHeading('Expedição e Sacrifício', 'opening-title', 'opening-title');
    var rules = element('p', 'lead', COPY.rules);
    var disclosure = element('p', 'lead', COPY.disclosure);
    var start = actionButton('Iniciar campanha', 'primary opening-action', 'begin');
    append(section, eyebrow, title, rules, disclosure, start);
    append(main, section);
    return main;
  }

  function renderHeader(view, contextLabel) {
    var header = element('header', 'game-header');
    var brand = element('div', 'brand');
    append(brand, element('span', 'eyebrow', contextLabel), element('strong', '', COPY.title));
    var status = element('div', 'status-line');
    if (view.position && view.positionTotal) {
      append(status, statusFact('Posição ' + view.position + ' de ' + view.positionTotal));
    }
    append(status, statusFact(view.survivorCount + (view.survivorCount === 1 ? ' herói sobrevivente' : ' heróis sobreviventes')));
    append(header, brand, status);
    return header;
  }

  function renderIntroduction(view) {
    var frame = element('div', 'artboard');
    append(frame, renderHeader(view, 'Prólogo'));
    var main = element('main', 'main-region transition-wrap');
    main.id = 'main';
    var panel = element('section', 'paper-panel introduction-panel');
    panel.setAttribute('aria-labelledby', 'intro-title');
    var title = pageHeading('Antes do primeiro caminho', 'intro-title');
    var prose = element('p', 'intro-copy', COPY.intro);
    var note = element('p', 'helper', 'Identidades, relações e epílogos finais permanecem pendentes. H1–H8 são identificações funcionais deste protótipo.');
    append(panel, provisionalLabel(), title, prose, note, actionButton('Examinar o elenco', 'primary', 'continue-intro'));
    append(main, panel);
    append(frame, main);
    return frame;
  }

  function heroLookup(view) {
    var records = {};
    view.party.concat(view.town, view.dead).forEach(function (hero) {
      records[hero.id] = hero;
    });
    return records;
  }

  function competencyText(hero) {
    return hero.competencyLabels.join(' · ');
  }

  function renderHeroCard(hero, formation) {
    var selected = formation.selectedHeroIds.indexOf(hero.id) >= 0;
    var isDead = hero.lifeState === 'dead';
    var card;
    if (!isDead && !formation.autoSelected) {
      card = setAction(element('button', 'hero-card' + (selected ? ' selected' : '')), 'toggle-hero', hero.id);
      card.type = 'button';
      card.setAttribute('aria-pressed', selected ? 'true' : 'false');
    } else {
      card = element('article', 'hero-card' + (selected ? ' selected automatic' : '') + (isDead ? ' dead' : ''));
    }
    card.dataset.heroId = hero.id;
    append(card, element('strong', '', hero.label));
    hero.competencyLabels.forEach(function (label) {
      append(card, element('span', '', label));
    });
    var stateLabel = isDead ? 'Morto' : (selected ? (formation.autoSelected ? 'Formação automática' : 'Selecionado') : 'Disponível');
    append(card, element('small', '', stateLabel));
    return card;
  }

  function renderFormation(view, ui) {
    var frame = element('div', 'artboard');
    append(frame, renderHeader(view, view.dungeon ? view.dungeon.label : 'Próxima expedição'));
    var main = element('main', 'main-region formation-wrap');
    main.id = 'main';
    var panel = element('section', 'paper-panel formation-panel');
    panel.setAttribute('aria-labelledby', 'formation-title');
    var title = pageHeading('Forme a expedição', 'formation-title');
    var formation = view.formation;
    var instruction = formation.autoSelected
      ? 'Todos os sobreviventes formarão esta expedição.'
      : 'Escolha exatamente três heróis sobreviventes. Suas competências serão verificadas coletivamente.';
    var grid = element('div', 'hero-grid');
    grid.setAttribute('role', 'group');
    grid.setAttribute('aria-label', 'Elenco da campanha');
    var heroes = heroLookup(view);
    Data.heroOrder.forEach(function (heroId) {
      if (heroes[heroId]) {
        append(grid, renderHeroCard(heroes[heroId], formation));
      }
    });

    var footer = element('footer', 'formation-footer');
    var summary = element('div', 'formation-summary');
    var selectedCount = formation.selectedHeroIds.length;
    append(summary,
      element('strong', '', selectedCount + ' de ' + formation.requiredCount + ' selecionados'),
      element('p', 'helper', 'O bardo acompanha o grupo automaticamente e não oferece competências.')
    );
    var departLabel = 'Partir com ' + formation.requiredCount + (formation.requiredCount === 1 ? ' herói' : ' heróis');
    append(footer, summary, actionButton(departLabel, 'primary', 'depart'));
    append(panel, provisionalLabel(), element('p', 'eyebrow', 'Formação'), title, element('p', 'formation-instruction', instruction), grid);
    if (ui.error) {
      append(panel, renderInlineError(ui.error));
    }
    append(panel, footer);
    append(main, panel);
    append(frame, main);
    return frame;
  }

  function renderInlineError(message) {
    var error = element('p', 'inline-error', message + ' Revise a formação e tente novamente.');
    error.id = 'campaign-error';
    error.tabIndex = -1;
    error.setAttribute('role', 'alert');
    error.dataset.errorFocus = '';
    return error;
  }

  function renderProgress(view) {
    var list = element('ol', 'progress-marks');
    list.setAttribute('aria-label', 'Progresso do caminho');
    for (var position = 1; position <= view.positionTotal; position += 1) {
      var item = element('li', '', String(position));
      var status = 'Não alcançada';
      if (position < view.position) {
        item.className = 'done';
        status = 'Concluída';
      } else if (position === view.position) {
        item.className = view.encounter ? 'revealed current' : 'current';
        status = view.encounter ? 'Revelada' : 'Atual, ainda não revelada';
      }
      item.setAttribute('aria-label', 'Posição ' + position + ': ' + status);
      append(list, item);
    }
    return list;
  }

  function rosterGroup(title, heroes, emptyCopy) {
    var section = element('section', 'roster-group');
    append(section, element('h3', '', title));
    var list = element('ul', 'roster-list');
    if (heroes.length === 0) {
      append(list, element('li', 'roster-empty', emptyCopy));
    } else {
      heroes.forEach(function (hero) {
        var item = element('li', 'roster-item' + (hero.lifeState === 'dead' ? ' dead' : ''));
        var label = hero.label + (hero.lifeState === 'dead' ? ' — Morto' : '');
        append(item, element('strong', '', label), element('small', '', competencyText(hero)));
        append(list, item);
      });
    }
    append(section, list);
    return section;
  }

  function renderRoster(view, compact) {
    var panel = element(compact ? 'div' : 'aside', compact ? 'roster-panel' : 'roster-region');
    if (!compact) {
      panel.setAttribute('aria-labelledby', 'roster-title');
    }
    var heading = element('div', 'roster-title');
    var title = element('h2', '', 'Elenco');
    if (!compact) {
      title.id = 'roster-title';
    }
    append(heading, title, element('small', '', view.survivorCount + (view.survivorCount === 1 ? ' vivo' : ' vivos')));
    append(panel, heading,
      rosterGroup('Na expedição', view.party, 'Nenhum herói na expedição.'),
      rosterGroup('Na cidade', view.town, 'Nenhum herói na cidade.'),
      rosterGroup('Mortos', view.dead, 'Nenhum herói morreu.')
    );
    var bard = element('section', 'roster-group');
    append(bard, element('h3', '', 'Companheiro'));
    var bardList = element('ul', 'roster-list');
    var bardItem = element('li', 'roster-item');
    append(bardItem, element('strong', '', view.bard.label), element('small', '', 'Acompanha o grupo · nenhuma competência'));
    append(bardList, bardItem);
    append(bard, bardList);
    append(panel, bard);
    return panel;
  }

  function dungeonCopy(view) {
    var index = view.dungeon ? view.dungeon.number - 1 : 0;
    return COPY.dungeonIntroductions[index] || COPY.dungeonIntroductions[0];
  }

  function renderDungeonThreshold(view) {
    var frame = element('div', 'artboard');
    append(frame, renderHeader(view, view.dungeon.label));
    var grid = element('div', 'game-grid');
    var main = element('main', 'main-region');
    main.id = 'main';
    var scene = element('section', 'scene');
    scene.setAttribute('aria-labelledby', 'threshold-title');
    scene.dataset.imageRegion = '';
    var copy = element('div', 'scene-copy');
    var intro = dungeonCopy(view);
    append(copy,
      provisionalLabel(),
      element('p', 'eyebrow', view.dungeon.label),
      pageHeading(intro.title, 'threshold-title', 'scene-title'),
      element('p', 'prose', intro.detail),
      renderProgress(view)
    );
    append(scene, copy);
    var decision = element('section', 'paper-panel decision-panel');
    append(decision,
      element('p', '', 'Os encontros são atribuídos somente quando cada posição é alcançada. Posições reveladas permanecem fixas nesta campanha.'),
      actionButton('Entrar', 'primary', 'enter-dungeon')
    );
    append(decision, renderRetreatAccess(view));
    append(decision, actionButton('Consultar elenco', 'roster-toggle', 'open-roster'));
    append(main, scene, decision);
    append(grid, main, renderRoster(view, false));
    append(frame, grid, renderRosterDialog(view));
    if (view.phase === 'retreat_confirmation') {
      append(frame, renderRetreatConfirmation());
    }
    return frame;
  }

  function renderRosterDialog(view) {
    var dialog = element('dialog', 'roster-dialog');
    dialog.id = 'roster-dialog';
    dialog.setAttribute('aria-labelledby', 'roster-dialog-title');
    var header = element('div', 'dialog-heading');
    var title = element('h2', '', 'Consultar elenco');
    title.id = 'roster-dialog-title';
    append(header, title, actionButton('Fechar elenco', 'ghost close-button', 'close-roster'));
    append(dialog, header, renderRoster(view, true));
    return dialog;
  }

  function renderEncounterScene(view, label, title, description, titleId, pageLevel) {
    var scene = element('section', 'scene encounter-scene');
    scene.setAttribute('aria-labelledby', titleId);
    scene.dataset.imageRegion = '';
    if (view.encounter && view.encounter.imagePath) {
      var image = element('img', 'encounter-image');
      image.alt = '';
      image.dataset.optionalImage = '';
      image.src = view.encounter.imagePath;
      append(scene, image);
    }
    var copy = element('div', 'scene-copy');
    var heading = pageLevel
      ? pageHeading(title, titleId, 'scene-title')
      : element('h2', 'scene-title', title);
    if (!pageLevel) {
      heading.id = titleId;
    }
    append(copy, element('p', 'eyebrow', label), heading, element('p', 'prose', description));
    if (view.position && view.positionTotal) {
      append(copy, renderProgress(view));
    }
    append(scene, copy);
    return scene;
  }

  function renderCampaignFrame(view, main, confirmation) {
    var frame = element('div', 'artboard');
    append(frame, renderHeader(view, view.dungeon.label));
    var grid = element('div', 'game-grid');
    append(grid, main, renderRoster(view, false));
    append(frame, grid, renderRosterDialog(view));
    if (confirmation) {
      append(frame, confirmation);
    }
    return frame;
  }

  function renderRosterAccess() {
    return actionButton('Consultar elenco', 'roster-toggle', 'open-roster');
  }

  function renderRetreatAccess(view) {
    if (!view.canRetreat && view.phase !== 'retreat_confirmation') {
      return null;
    }
    return actionButton('Recuar para a cidade', 'ghost', 'request-retreat');
  }

  function renderEncounterChoice(view) {
    var main = element('main', 'main-region encounter-region');
    main.id = 'main';
    append(main, renderEncounterScene(view, 'Encontro revelado', view.encounter.title, view.encounter.description, 'encounter-title', true));
    var decision = element('section', 'paper-panel encounter-decision');
    decision.setAttribute('aria-labelledby', 'approach-title');
    var approachTitle = element('h2', '', 'Como o grupo vai atravessar?');
    approachTitle.id = 'approach-title';
    var actions = element('div', 'approach-stack');
    view.encounter.approaches.forEach(function (approach) {
      append(actions, actionButton(approach.text, 'approach-action', 'choose-approach', approach.id));
    });
    append(actions, renderRetreatAccess(view));
    append(decision,
      element('p', 'eyebrow ink-eyebrow', 'Escolha uma abordagem'),
      approachTitle,
      actions,
      element('p', 'helper', 'A escolha de uma abordagem impede o recuo até a consequência terminar.'),
      renderRosterAccess()
    );
    append(main, decision);
    var confirmation = view.phase === 'retreat_confirmation' ? renderRetreatConfirmation() : null;
    return renderCampaignFrame(view, main, confirmation);
  }

  function renderApproachResult(view) {
    var main = element('main', 'main-region encounter-region');
    main.id = 'main';
    append(main, renderEncounterScene(view, 'Abordagem escolhida', view.chosenApproachText, view.encounter.description, 'chosen-approach-title', false));
    var decision = element('section', 'paper-panel result-panel');
    var failure = !view.outcome.success;
    var banner = element('div', 'result-banner' + (failure ? ' failure' : ' success'));
    var resultTitle = pageHeading(failure ? 'Falha letal' : 'Sucesso', 'result-title', 'result-heading');
    append(banner,
      element('p', 'result-label', failure ? 'Consequência obrigatória' : 'Abordagem superada'),
      resultTitle,
      element('h2', 'competency-result', 'Competência exigida: ' + view.outcome.competencyLabel),
      element('p', '', 'O grupo ' + (view.outcome.partyHasCompetency ? 'possui ' : 'não possui ') + view.outcome.competencyLabel + '.'),
      element('p', 'result-explanation', view.outcome.explanation)
    );
    if (failure) {
      append(banner, element('p', 'lethal-warning', 'O fracasso é letal. Alguém precisa ficar para trás.'));
    }
    var actions = element('div', 'result-actions');
    append(actions,
      actionButton(failure ? 'Escolher o sacrifício' : 'Prosseguir', failure ? 'danger' : 'primary', failure ? 'open-sacrifice' : 'ack-success'),
      renderRosterAccess()
    );
    append(decision, banner, actions);
    append(main, decision);
    return renderCampaignFrame(view, main);
  }

  function renderVictimCard(hero, selected) {
    var card = setAction(element('button', 'hero-card victim-card' + (selected ? ' selected' : '')), 'select-victim', hero.id);
    card.type = 'button';
    card.setAttribute('aria-pressed', selected ? 'true' : 'false');
    append(card, element('strong', '', hero.label));
    hero.competencyLabels.forEach(function (label) {
      append(card, element('span', '', label));
    });
    append(card, element('small', '', selected ? 'Selecionado' : 'Sacrificar ' + hero.label));
    return card;
  }

  function renderSacrificeChoice(view) {
    var main = element('main', 'main-region encounter-region');
    main.id = 'main';
    append(main, renderEncounterScene(
      view,
      'A saída está fechando',
      'Alguém precisa ficar para trás.',
      view.outcome.explanation,
      'sacrifice-context-title',
      false
    ));
    var decision = element('section', 'paper-panel sacrifice-panel');
    decision.setAttribute('aria-labelledby', 'sacrifice-title');
    var title = pageHeading('Escolha o sacrifício', 'sacrifice-title', 'decision-heading');
    var victims = element('div', 'hero-grid victim-grid');
    victims.setAttribute('role', 'group');
    victims.setAttribute('aria-label', 'Heróis presentes que podem ser sacrificados');
    view.eligibleVictims.forEach(function (hero) {
      append(victims, renderVictimCard(hero, Boolean(view.pendingVictim && view.pendingVictim.id === hero.id)));
    });
    append(decision,
      element('p', 'eyebrow ink-eyebrow', 'Consequência permanente'),
      title,
      element('p', 'irreversible-copy', 'Esta morte será permanente nesta campanha. O bardo e os heróis na cidade não podem ser escolhidos.'),
      victims,
      renderRosterAccess()
    );
    append(main, decision);
    var confirmation = view.phase === 'sacrifice_confirmation' ? renderSacrificeConfirmation(view) : null;
    return renderCampaignFrame(view, main, confirmation);
  }

  function confirmationActions(cancelLabel, cancelAction, confirmLabel, confirmAction, id) {
    var actions = element('div', 'confirmation-actions');
    append(actions,
      actionButton(cancelLabel, '', cancelAction, id),
      actionButton(confirmLabel, 'danger', confirmAction)
    );
    return actions;
  }

  function renderSacrificeConfirmation(view) {
    var dialog = element('dialog', 'confirmation-dialog sacrifice-confirmation');
    dialog.id = 'required-dialog';
    dialog.dataset.requiredDialog = 'sacrifice';
    dialog.setAttribute('aria-labelledby', 'confirm-sacrifice-title');
    var victim = view.pendingVictim;
    var consequence = element('p', 'confirmation-copy');
    append(consequence,
      element('strong', '', victim.label + ' morrerá'),
      document.createTextNode(' e suas competências, ' + victim.competencyLabels.join(' e ') + ', serão perdidas.')
    );
    append(dialog,
      element('p', 'eyebrow ink-eyebrow', 'Morte permanente'),
      element('h2', '', 'Confirmar sacrifício?'),
      consequence,
      confirmationActions('Voltar à escolha', 'cancel-sacrifice', 'Confirmar sacrifício', 'confirm-sacrifice', victim.id)
    );
    dialog.querySelector('h2').id = 'confirm-sacrifice-title';
    return dialog;
  }

  function renderRetreatConfirmation() {
    var dialog = element('dialog', 'confirmation-dialog retreat-confirmation');
    dialog.id = 'required-dialog';
    dialog.dataset.requiredDialog = 'retreat';
    dialog.setAttribute('aria-labelledby', 'confirm-retreat-title');
    append(dialog,
      element('p', 'eyebrow ink-eyebrow', 'Confirmar recuo'),
      element('h2', '', 'Recuar para a cidade?'),
      element('p', 'confirmation-copy', 'A próxima tentativa voltará ao primeiro encontro. Mortes e encontros revelados permanecerão.'),
      confirmationActions('Continuar expedição', 'cancel-retreat', 'Recuar', 'confirm-retreat')
    );
    dialog.querySelector('h2').id = 'confirm-retreat-title';
    return dialog;
  }

  function renderDeathResult(view) {
    var main = element('main', 'main-region encounter-region');
    main.id = 'main';
    append(main, renderEncounterScene(view, 'A consequência foi cumprida', view.encounter.title, view.outcome.explanation, 'death-context-title', false));
    var decision = element('section', 'paper-panel result-panel death-panel');
    var title = pageHeading(view.death.heroLabel + ' ficou para trás.', 'death-title', 'result-heading');
    var farewell = element('blockquote', 'farewell', view.death.farewell);
    append(decision,
      provisionalLabel(),
      element('p', 'result-label failure-label', 'Morte permanente'),
      title,
      farewell,
      element('p', 'result-explanation', view.outcome.explanation),
      element('p', 'coverage-update', 'O elenco e as competências disponíveis foram recalculados.'),
      actionButton('Prosseguir', 'primary', 'ack-death'),
      renderRosterAccess()
    );
    append(main, decision);
    return renderCampaignFrame(view, main);
  }

  function renderAutomaticRetreat(view) {
    var main = element('main', 'main-region encounter-region');
    main.id = 'main';
    append(main, renderEncounterScene(
      view,
      'Expedição encerrada',
      'O bardo retorna sozinho.',
      'O último herói da expedição morreu. Ainda há sobreviventes na cidade.',
      'automatic-retreat-title',
      true
    ));
    var decision = element('section', 'paper-panel automatic-retreat-panel');
    append(decision,
      element('h2', '', 'Recuo automático'),
      element('p', '', 'O bardo retorna sozinho para reunir os sobreviventes. Mortes e encontros revelados permanecem.'),
      actionButton('Voltar à cidade', 'primary', 'ack-auto-retreat'),
      renderRosterAccess()
    );
    append(main, decision);
    return renderCampaignFrame(view, main);
  }

  function renderMapHalf(label, found) {
    var half = element('li', 'map-half' + (found ? ' found' : ''));
    append(half, element('strong', '', label), element('span', '', found ? 'Recuperada' : 'Ainda desconhecida'));
    return half;
  }

  function renderDungeonTransition(view) {
    var firstHalf = view.dungeon.number === 1;
    var frame = element('div', 'artboard');
    append(frame, renderHeader(view, 'Masmorra concluída'));
    var main = element('main', 'main-region transition-wrap dungeon-transition');
    main.id = 'main';
    main.setAttribute('aria-labelledby', 'transition-title');
    var panel = element('section', 'paper-panel transition-panel');
    var title = firstHalf ? 'Primeira metade do mapa recuperada.' : 'Segunda metade do mapa recuperada.';
    var detail = firstHalf
      ? 'A mata fecha a passagem atrás do grupo. A parte encontrada aponta para outro lugar, onde as vozes conhecem nomes que ninguém pronunciou.'
      : 'As duas metades revelam o caminho final. A natureza do tesouro e o horror familiar permanecem pendentes no GDD.';
    var halves = element('ul', 'map-halves');
    halves.setAttribute('aria-label', 'Partes do mapa');
    append(halves,
      renderMapHalf('Primeira metade', true),
      renderMapHalf('Segunda metade', !firstHalf)
    );
    append(panel,
      provisionalLabel(),
      element('p', 'eyebrow ink-eyebrow', firstHalf ? 'O caminho se amplia' : 'O último caminho aparece'),
      pageHeading(title, 'transition-title', 'transition-title'),
      element('p', 'transition-copy', detail),
      halves,
      actionButton('Preparar a próxima expedição', 'primary', 'continue-dungeon')
    );
    append(main, panel);
    append(frame, main);
    return frame;
  }

  function renderOutcomeHeader(view, label) {
    var header = element('header', 'game-header');
    var brand = element('div', 'brand');
    append(brand, element('span', 'eyebrow', label), element('strong', '', COPY.title));
    var status = element('div', 'status-line');
    append(status, statusFact(view.phase === 'victory' ? '16 encontros atravessados' : 'Derrota total'));
    append(header, brand, status);
    return header;
  }

  function renderVictory(view) {
    var frame = element('div', 'artboard outcome-artboard');
    append(frame, renderOutcomeHeader(view, 'Campanha concluída'));
    var main = element('main', 'main-region outcome-wrap');
    main.id = 'main';
    main.setAttribute('aria-labelledby', 'victory-title');
    var panel = element('section', 'paper-panel outcome-panel victory-panel');
    var epilogues = element('ul', 'epilogue-list');
    view.ending.epilogues.forEach(function (epilogue) {
      var item = element('li', 'epilogue-item');
      append(item, element('strong', '', epilogue.heroId), element('p', '', epilogue.text));
      append(epilogues, item);
    });
    append(panel,
      provisionalLabel(),
      element('p', 'eyebrow ink-eyebrow', 'Vitória'),
      pageHeading(view.ending.central, 'victory-title', 'outcome-title'),
      element('p', 'outcome-copy', 'O protótipo encerra a campanha sem transformar a natureza do tesouro, o horror familiar ou os arcos finais em decisões implícitas.'),
      element('h2', 'epilogue-heading', 'Sobreviventes'),
      epilogues,
      actionButton('Iniciar nova campanha', 'primary', 'new-campaign')
    );
    append(main, panel);
    append(frame, main);
    return frame;
  }

  function renderDefeat(view) {
    var frame = element('div', 'artboard outcome-artboard defeat-artboard');
    append(frame, renderOutcomeHeader(view, 'Campanha encerrada'));
    var main = element('main', 'main-region outcome-wrap');
    main.id = 'main';
    main.setAttribute('aria-labelledby', 'defeat-title');
    var panel = element('section', 'paper-panel outcome-panel defeat-panel');
    append(panel,
      provisionalLabel(),
      element('p', 'eyebrow ink-eyebrow', 'Derrota total'),
      pageHeading('Ninguém retorna.', 'defeat-title', 'outcome-title'),
      element('p', 'outcome-copy', view.ending.central),
      element('p', 'no-epilogues', 'Não há epílogos de sobreviventes nesta campanha.'),
      actionButton('Iniciar nova campanha', 'danger', 'new-campaign')
    );
    append(main, panel);
    append(frame, main);
    return frame;
  }

  function renderReachedPosition(view) {
    var frame = element('div', 'artboard');
    append(frame, renderHeader(view, view.dungeon.label));
    var grid = element('div', 'game-grid');
    var main = element('main', 'main-region');
    main.id = 'main';
    var panel = element('section', 'paper-panel introduction-panel');
    var title = pageHeading('Posição alcançada', 'position-reached-title');
    append(panel, title, element('p', '', 'O encontro desta posição foi revelado. A decisão permanece preservada na sessão atual.'));
    append(main, panel);
    append(grid, main, renderRoster(view, false));
    append(frame, grid, renderRosterDialog(view));
    return frame;
  }

  function renderInvalid(view) {
    var main = element('main', 'artboard invalid-state');
    main.id = 'main';
    var panel = element('section', 'paper-panel invalid-panel');
    var title = pageHeading('O protótipo encontrou um estado inválido.', 'invalid-title');
    append(panel,
      element('p', 'eyebrow', 'Execução interrompida'),
      title,
      element('p', '', view.invalidMessage || 'Recarregue a página e registre a semente no console.'),
      actionButton('Recarregar a página', 'danger', 'reload')
    );
    append(main, panel);
    return main;
  }

  function createController(root) {
    if (!root || root.nodeType !== 1) {
      throw new TypeError('ExpeditionApp.createController exige um elemento raiz.');
    }

    var state = Engine.createReadyState();
    var ui = { error: null, rosterOpen: false };
    var destroyed = false;
    var dispatching = false;
    var restoreFocus = null;
    var stage;
    var liveRegion;
    var assertiveRegion;
    var dialogCloseInProgress = false;
    var pendingDialogFocus = null;
    var pendingSeed = null;
    var invalidLogged = false;
    var qaSession;

    function qaError(code, message) {
      return deepFreeze({ ok: false, error: { code: code, message: message } });
    }

    function setPendingSeed(seed) {
      if (state.phase !== 'ready') {
        return qaError('campaign_already_started', 'Defina a semente antes de iniciar a campanha.');
      }
      var normalized = Engine.normalizeSeed(seed);
      if (!normalized.ok) {
        return qaError('invalid_seed', 'Use um número inteiro entre 0 e 4294967295.');
      }
      pendingSeed = normalized.seed;
      return deepFreeze({ ok: true, seed: pendingSeed });
    }

    function qaSnapshot() {
      var current = Engine.snapshot(state);
      if (state.phase !== 'ready' || pendingSeed === null) {
        return current;
      }
      var copy = {};
      Object.keys(current).forEach(function (key) {
        copy[key] = current[key];
      });
      copy.seed = pendingSeed;
      return deepFreeze(copy);
    }

    function imageAlternativeViolations() {
      return Array.prototype.reduce.call(stage.querySelectorAll('img[data-optional-image]'), function (violations, image) {
        if (!image.hasAttribute('alt')) {
          violations.push(deepFreeze({
            code: 'missing_image_alternative',
            message: 'Uma imagem opcional não declara alternativa textual.',
            context: { path: image.getAttribute('src') || null }
          }));
        }
        return violations;
      }, []);
    }

    function logInvalidState() {
      if (invalidLogged || state.phase !== 'invalid') {
        return;
      }
      invalidLogged = true;
      state.invariantViolations.forEach(function (violation) {
        console.error('invariant_violation', violation);
      });
    }

    function stopForViolations(violations) {
      if (violations.length === 0 || state.phase === 'invalid') {
        return false;
      }
      state = Engine.enterInvalid(state, violations);
      logInvalidState();
      render({ focusHeading: true, assert: 'Execução interrompida. Recarregue a página.' });
      return true;
    }

    function validateCampaign() {
      var catalog = Engine.validateCatalog(Data);
      var stateValidation = state.phase === 'invalid'
        ? { ok: false, violations: state.invariantViolations }
        : Engine.validateState(state);
      var fatal = catalog.violations.concat(stateValidation.violations);
      if (fatal.length > 0) {
        stopForViolations(fatal);
        return deepFreeze({ ok: false, violations: state.phase === 'invalid' ? state.invariantViolations : fatal });
      }
      var accessibility = imageAlternativeViolations();
      return deepFreeze({ ok: accessibility.length === 0, violations: accessibility });
    }

    function buildRoot() {
      root.textContent = '';
      var skip = element('a', 'skip-link', 'Pular para o conteúdo');
      skip.href = '#main';
      liveRegion = element('div', 'sr-only');
      liveRegion.setAttribute('role', 'status');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      assertiveRegion = element('div', 'sr-only');
      assertiveRegion.setAttribute('aria-live', 'assertive');
      assertiveRegion.setAttribute('aria-atomic', 'true');
      stage = element('div', 'app-stage');
      append(root, skip, liveRegion, assertiveRegion, stage);
    }

    function surfaceFor(view) {
      if (view.phase === 'ready') {
        return renderOpening();
      }
      if (view.phase === 'intro') {
        return renderIntroduction(view);
      }
      if (view.phase === 'formation') {
        return renderFormation(view, ui);
      }
      if (view.phase === 'dungeon_intro') {
        return renderDungeonThreshold(view);
      }
      if (view.phase === 'retreat_confirmation') {
        return view.retreatReturnPhase === 'dungeon_intro' ? renderDungeonThreshold(view) : renderEncounterChoice(view);
      }
      if (view.phase === 'encounter_choice') {
        return renderEncounterChoice(view);
      }
      if (view.phase === 'approach_result') {
        return renderApproachResult(view);
      }
      if (view.phase === 'sacrifice_choice' || view.phase === 'sacrifice_confirmation') {
        return renderSacrificeChoice(view);
      }
      if (view.phase === 'death_result') {
        return renderDeathResult(view);
      }
      if (view.phase === 'automatic_retreat') {
        return renderAutomaticRetreat(view);
      }
      if (view.phase === 'dungeon_complete') {
        return renderDungeonTransition(view);
      }
      if (view.phase === 'victory') {
        return renderVictory(view);
      }
      if (view.phase === 'defeat') {
        return renderDefeat(view);
      }
      if (view.phase === 'invalid') {
        return renderInvalid(view);
      }
      return renderReachedPosition(view);
    }

    function openRosterDialog() {
      var dialog = stage.querySelector('#roster-dialog');
      if (!dialog || dialog.open) {
        return;
      }
      try {
        dialog.showModal();
      } catch (error) {
        dialog.setAttribute('open', '');
        dialog.setAttribute('role', 'dialog');
        dialog.setAttribute('aria-modal', 'true');
        console.warn('optional_dialog_failed', error && error.message ? error.message : String(error));
      }
      var close = dialog.querySelector('[data-action="close-roster"]');
      if (close) {
        close.focus();
      }
    }

    function openRequiredDialog() {
      var dialog = stage.querySelector('[data-required-dialog]');
      if (!dialog || dialog.open) {
        return;
      }
      try {
        dialog.showModal();
      } catch (error) {
        dialog.setAttribute('open', '');
        dialog.setAttribute('role', 'dialog');
        dialog.setAttribute('aria-modal', 'true');
        console.warn('required_dialog_failed', error && error.message ? error.message : String(error));
      }
      var cancel = dialog.querySelector('[data-action^="cancel-"]');
      if (cancel) {
        cancel.focus();
      }
    }

    function focusAfterDialogLifecycle(target) {
      if (!target) {
        return;
      }
      target.focus();
      if (dialogCloseInProgress) {
        pendingDialogFocus = target;
      }
    }

    function documentTitle(view) {
      var prefix = '';
      if (view.phase === 'formation') {
        prefix = 'Formação · ';
      } else if (view.phase === 'dungeon_intro') {
        prefix = view.dungeon.label + ' · ';
      } else if (view.phase === 'victory') {
        prefix = 'Vitória · ';
      } else if (view.phase === 'defeat') {
        prefix = 'Derrota · ';
      }
      return prefix + 'Expedição e Sacrifício';
    }

    function render(options) {
      if (destroyed) {
        return;
      }
      var view = Engine.derivePlayerView(state);
      var surface = surfaceFor(view);
      var closingDialogs = stage.querySelectorAll('dialog[open]');
      dialogCloseInProgress = closingDialogs.length > 0;
      Array.prototype.forEach.call(closingDialogs, function (dialog) {
        dialog.addEventListener('close', function () {
          dialogCloseInProgress = false;
          if (pendingDialogFocus && pendingDialogFocus.isConnected) {
            pendingDialogFocus.focus();
          }
          pendingDialogFocus = null;
        }, { once: true });
        dialog.close();
      });
      stage.textContent = '';
      append(stage, surface);
      monitorOptionalImages();
      document.title = documentTitle(view);
      if (ui.rosterOpen) {
        openRosterDialog();
      }
      openRequiredDialog();
      if (options && options.announce) {
        liveRegion.textContent = '';
        global.requestAnimationFrame(function () {
          if (!destroyed) {
            liveRegion.textContent = options.announce;
          }
        });
      }
      if (options && options.assert) {
        assertiveRegion.textContent = '';
        global.requestAnimationFrame(function () {
          if (!destroyed) {
            assertiveRegion.textContent = options.assert;
          }
        });
      }
      if (options && options.focusError) {
        var error = stage.querySelector('[data-error-focus]');
        if (error) {
          focusAfterDialogLifecycle(error);
        }
      } else if (options && options.focusSelector) {
        var focusTarget = stage.querySelector(options.focusSelector);
        if (focusTarget) {
          focusAfterDialogLifecycle(focusTarget);
        }
      } else if (options && options.focusHeading && !stage.querySelector('[data-required-dialog]')) {
        var heading = stage.querySelector('[data-surface-heading]');
        if (heading) {
          focusAfterDialogLifecycle(heading);
        }
      }
    }

    function submit(action, options) {
      if (destroyed) {
        return Object.freeze({ ok: false, error: Object.freeze({ code: 'controller_destroyed', message: 'O controlador foi encerrado.', context: Object.freeze({}) }) });
      }
      if (dispatching) {
        return Object.freeze({ ok: false, error: Object.freeze({ code: 'transition_in_progress', message: 'Uma transição já está em andamento.', context: Object.freeze({}) }) });
      }
      dispatching = true;
      try {
        var stateValidation = Engine.validateState(state);
        if (!stateValidation.ok) {
          stopForViolations(stateValidation.violations);
          return deepFreeze({ ok: true, state: state });
        }
        var submittedAction = action;
        if (action.type === 'BEGIN' && state.phase === 'ready') {
          submittedAction = {
            type: 'BEGIN',
            seed: pendingSeed !== null
              ? pendingSeed
              : (action.seed === undefined ? Date.now() >>> 0 : action.seed)
          };
        }
        var result = Engine.dispatch(state, submittedAction);
        if (result.ok) {
          state = result.state;
          if (submittedAction.type === 'BEGIN' && state.phase !== 'ready') {
            pendingSeed = null;
          }
          logInvalidState();
          ui.error = null;
          ui.rosterOpen = false;
          var renderOptions = {
            focusHeading: Boolean(options && options.focusHeading),
            focusSelector: options && options.focusSelector,
            announce: options && options.announce,
            assert: options && options.assert
          };
          if (options && options.announceOutcome && state.pendingOutcome) {
            if (state.pendingOutcome.success) {
              renderOptions.announce = 'Sucesso. A consequência aguarda confirmação.';
            } else {
              renderOptions.assert = 'Falha letal. Escolha um sacrifício para continuar.';
            }
          }
          render(renderOptions);
        } else {
          ui.error = result.error.message;
          render({ focusError: true, announce: result.error.message });
        }
        return result;
      } finally {
        dispatching = false;
      }
    }

    function closeRoster() {
      var dialog = stage.querySelector('#roster-dialog');
      ui.rosterOpen = false;
      var target = restoreFocus;
      restoreFocus = null;
      if (dialog && dialog.open) {
        if (target) {
          dialog.addEventListener('close', function () {
            if (!destroyed && target.isConnected) {
              target.focus();
            }
          }, { once: true });
        }
        dialog.close();
      }
      if (target && target.isConnected) {
        target.focus();
      }
    }

    function onClick(event) {
      var trigger = event.target.closest('[data-action]');
      if (!trigger || !root.contains(trigger)) {
        return;
      }
      var action = trigger.dataset.action;
      if (action === 'begin') {
        submit({ type: 'BEGIN' }, { focusHeading: true, announce: 'Campanha iniciada.' });
      } else if (action === 'continue-intro') {
        submit({ type: 'CONTINUE_INTRO' }, { focusHeading: true, announce: 'Formação disponível.' });
      } else if (action === 'toggle-hero') {
        var heroId = trigger.dataset.id;
        submit({ type: 'TOGGLE_HERO', heroId: heroId }, {
          focusSelector: '[data-action="toggle-hero"][data-id="' + heroId + '"]',
          announce: heroId + ' atualizado na formação.'
        });
      } else if (action === 'depart') {
        submit({ type: 'DEPART' }, { focusHeading: true, announce: 'Expedição formada.' });
      } else if (action === 'enter-dungeon') {
        submit({ type: 'ENTER_DUNGEON' }, { focusHeading: true, announce: 'Posição alcançada.' });
      } else if (action === 'choose-approach') {
        submit({ type: 'CHOOSE_APPROACH', approachId: trigger.dataset.id }, { focusHeading: true, announceOutcome: true });
      } else if (action === 'ack-success') {
        submit({ type: 'ACK_SUCCESS' }, { focusHeading: true, announce: 'Posição concluída.' });
      } else if (action === 'open-sacrifice') {
        submit({ type: 'OPEN_SACRIFICE' }, { focusHeading: true, assert: 'Escolha obrigatória. Selecione um herói presente para o sacrifício.' });
      } else if (action === 'select-victim') {
        submit({ type: 'SELECT_VICTIM', heroId: trigger.dataset.id }, { assert: 'Confirmação de morte permanente.' });
      } else if (action === 'cancel-sacrifice') {
        submit({ type: 'CANCEL_SACRIFICE' }, { focusSelector: '[data-action="select-victim"][data-id="' + trigger.dataset.id + '"]', announce: 'Confirmação cancelada.' });
      } else if (action === 'confirm-sacrifice') {
        submit({ type: 'CONFIRM_SACRIFICE' }, { focusHeading: true, assert: 'Sacrifício confirmado. O elenco foi recalculado.' });
      } else if (action === 'ack-death') {
        submit({ type: 'ACK_DEATH' }, { focusHeading: true, announce: 'Consequência concluída.' });
      } else if (action === 'request-retreat') {
        submit({ type: 'REQUEST_RETREAT' }, { assert: 'Confirme o recuo para a cidade.' });
      } else if (action === 'cancel-retreat') {
        submit({ type: 'CANCEL_RETREAT' }, { focusSelector: '[data-action="request-retreat"]', announce: 'Recuo cancelado.' });
      } else if (action === 'confirm-retreat') {
        submit({ type: 'CONFIRM_RETREAT' }, { focusHeading: true, announce: 'A expedição voltou à cidade.' });
      } else if (action === 'ack-auto-retreat') {
        submit({ type: 'ACK_AUTO_RETREAT' }, { focusHeading: true, announce: 'Sobreviventes disponíveis para a próxima expedição.' });
      } else if (action === 'continue-dungeon') {
        submit({ type: 'CONTINUE_DUNGEON' }, { focusHeading: true, announce: 'Próxima masmorra disponível.' });
      } else if (action === 'new-campaign') {
        submit({ type: 'NEW_CAMPAIGN' }, { focusHeading: true, announce: 'Nova campanha pronta para começar.' });
      } else if (action === 'open-roster') {
        restoreFocus = trigger;
        ui.rosterOpen = true;
        openRosterDialog();
      } else if (action === 'close-roster') {
        closeRoster();
      } else if (action === 'reload') {
        global.location.reload();
      }
    }

    function onCancel(event) {
      if (event.target.id === 'roster-dialog') {
        event.preventDefault();
        closeRoster();
      } else if (event.target.id === 'required-dialog') {
        event.preventDefault();
        if (state.phase === 'sacrifice_confirmation') {
          var victimId = state.pendingVictimId;
          submit({ type: 'CANCEL_SACRIFICE' }, { focusSelector: '[data-action="select-victim"][data-id="' + victimId + '"]', announce: 'Confirmação cancelada.' });
        } else if (state.phase === 'retreat_confirmation') {
          submit({ type: 'CANCEL_RETREAT' }, { focusSelector: '[data-action="request-retreat"]', announce: 'Recuo cancelado.' });
        }
      }
    }

    function failOptionalImage(image) {
      if (!image || image.tagName !== 'IMG' || !image.hasAttribute('data-optional-image')) {
        return;
      }
      if (image.dataset.optionalImageFailed === 'true') {
        return;
      }
      image.dataset.optionalImageFailed = 'true';
      if (image.optionalImageTimeout) {
        global.clearTimeout(image.optionalImageTimeout);
        image.optionalImageTimeout = null;
      }
      var region = image.closest('[data-image-region]');
      if (region) {
        region.classList.add('image-fallback');
      }
      var path = image.getAttribute('src') || 'sem caminho';
      image.remove();
      console.warn('optional_image_failed', path);
    }

    function onOptionalImageError(event) {
      failOptionalImage(event.target);
    }

    function monitorOptionalImages() {
      Array.prototype.forEach.call(root.querySelectorAll('img[data-optional-image]'), function (image) {
        if (image.optionalImageTimeout || image.complete) {
          return;
        }
        image.addEventListener('load', function () {
          if (image.optionalImageTimeout) {
            global.clearTimeout(image.optionalImageTimeout);
            image.optionalImageTimeout = null;
          }
        }, { once: true });
        image.optionalImageTimeout = global.setTimeout(function () {
          if (image.isConnected && !image.complete) {
            failOptionalImage(image);
          }
        }, OPTIONAL_IMAGE_TIMEOUT_MS);
      });
    }

    buildRoot();
    root.addEventListener('click', onClick);
    root.addEventListener('cancel', onCancel, true);
    root.addEventListener('error', onOptionalImageError, true);

    var catalogValidation = Engine.validateCatalog(Data);
    if (!catalogValidation.ok) {
      state = Engine.enterInvalid(state, catalogValidation.violations);
      logInvalidState();
    }
    render();

    qaSession = Object.freeze({
      setSeed: setPendingSeed,
      snapshot: qaSnapshot,
      validate: validateCampaign
    });
    activeQASession = qaSession;

    return Object.freeze({
      dispatch: function (action) {
        return submit(action, { focusHeading: true });
      },
      getState: function () {
        return state;
      },
      destroy: function () {
        if (destroyed) {
          return;
        }
        destroyed = true;
        if (activeQASession === qaSession) {
          activeQASession = null;
        }
        root.removeEventListener('click', onClick);
        root.removeEventListener('cancel', onCancel, true);
        root.removeEventListener('error', onOptionalImageError, true);
        var dialog = root.querySelector('#roster-dialog');
        if (dialog && dialog.open) {
          dialog.close();
        }
        var requiredDialog = root.querySelector('#required-dialog');
        if (requiredDialog && requiredDialog.open) {
          requiredDialog.close();
        }
        root.textContent = '';
      }
    });
  }

  /** @typedef {'H1'|'H2'|'H3'|'H4'|'H5'|'H6'|'H7'|'H8'} HeroId */
  /** @typedef {'physical'|'supernatural'|'final'} DungeonId */
  /** @typedef {'A1'|'A2'|'A3'|'A4'|'A5'|'A6'|'A7'|'A8'|'B1'|'B2'|'B3'|'B4'|'B5'|'B6'|'B7'|'B8'} EncounterId */
  /** @typedef {'strength'|'dexterity'|'perception'|'athletics'|'survival'|'knowledge'|'will'|'occultism'} CompetencyId */
  /**
   * @typedef {'A1-1'|'A1-2'|'A1-3'|'A2-1'|'A2-2'|'A2-3'|'A3-1'|'A3-2'|'A3-3'|'A4-1'|'A4-2'|'A4-3'|
   * 'A5-1'|'A5-2'|'A5-3'|'A6-1'|'A6-2'|'A6-3'|'A7-1'|'A7-2'|'A7-3'|'A8-1'|'A8-2'|'A8-3'|
   * 'B1-1'|'B1-2'|'B1-3'|'B2-1'|'B2-2'|'B2-3'|'B3-1'|'B3-2'|'B3-3'|'B4-1'|'B4-2'|'B4-3'|
   * 'B5-1'|'B5-2'|'B5-3'|'B6-1'|'B6-2'|'B6-3'|'B7-1'|'B7-2'|'B7-3'|'B8-1'|'B8-2'|'B8-3'} ApproachId
   */
  /**
   * @typedef {'ready'|'intro'|'formation'|'dungeon_intro'|'encounter_choice'|'approach_result'|
   * 'sacrifice_choice'|'sacrifice_confirmation'|'death_result'|'retreat_confirmation'|
   * 'automatic_retreat'|'dungeon_complete'|'victory'|'defeat'|'invalid'} CampaignPhase
   */
  /**
   * @typedef {{type: 'BEGIN', seed: number}|
   * {type: 'TOGGLE_HERO', heroId: HeroId}|
   * {type: 'SELECT_VICTIM', heroId: HeroId}|
   * {type: 'CHOOSE_APPROACH', approachId: ApproachId}|
   * {type: ('CONTINUE_INTRO'|'DEPART'|'ENTER_DUNGEON'|'ACK_SUCCESS'|'OPEN_SACRIFICE'|
   * 'CANCEL_SACRIFICE'|'CONFIRM_SACRIFICE'|'ACK_DEATH'|'REQUEST_RETREAT'|'CANCEL_RETREAT'|
   * 'CONFIRM_RETREAT'|'ACK_AUTO_RETREAT'|'CONTINUE_DUNGEON'|'NEW_CAMPAIGN')}} GameAction
   */
  /**
   * @typedef {Object} PendingOutcome
   * @property {EncounterId} encounterId
   * @property {ApproachId} approachId
   * @property {CompetencyId} competencyId
   * @property {readonly HeroId[]} holderHeroIds
   * @property {boolean} success
   * @property {string} resultText
   * @property {(HeroId|null)} victimId
   */
  /**
   * @typedef {{sequence: number, type: 'campaign_started', seed: number}|
   * {sequence: number, type: 'formation_opened', dungeon: 'physical'}|
   * {sequence: number, type: 'formation_selection_changed', heroId: HeroId, selected: boolean}|
   * {sequence: number, type: 'party_formed', heroes: readonly HeroId[]}|
   * {sequence: number, type: ('encounter_revealed'|'encounter_revisited'), dungeon: DungeonId, position: number, encounterId: EncounterId}|
   * {sequence: number, type: 'approach_resolved', dungeon: DungeonId, position: number, encounterId: EncounterId, approachId: ApproachId, competency: CompetencyId, success: boolean}|
   * {sequence: number, type: ('sacrifice_choice_opened'|'sacrifice_confirmation_cancelled'), encounterId: EncounterId}|
   * {sequence: number, type: ('sacrifice_victim_selected'|'hero_sacrificed'), encounterId: EncounterId, heroId: HeroId}|
   * {sequence: number, type: ('party_retreated'|'dungeon_completed'|'dungeon_advanced'|'automatic_retreat'|'automatic_retreat_acknowledged'), dungeon: DungeonId}|
   * {sequence: number, type: 'position_advanced', dungeon: DungeonId, position: number}|
   * {sequence: number, type: 'retreat_requested', dungeon: DungeonId, position: number, fromPhase: ('dungeon_intro'|'encounter_choice')}|
   * {sequence: number, type: 'retreat_cancelled', dungeon: DungeonId, position: number, returnPhase: ('dungeon_intro'|'encounter_choice')}|
   * {sequence: number, type: 'campaign_won', survivors: readonly HeroId[]}|
   * {sequence: number, type: 'campaign_lost'}} ActionEvent
   */
  /** @typedef {Readonly<Record<string, unknown>>} DiagnosticContext */
  /** @typedef {Readonly<{code: string, message: string, context: DiagnosticContext}>} InvariantViolation */
  /** @typedef {Readonly<Record<string, unknown>>} AppEffect */
  /** @typedef {Readonly<{code: string, message: string, context: DiagnosticContext}>} EngineError */
  /**
   * @typedef {Object} CampaignAssignments
   * @property {Readonly<[(EncounterId|null),(EncounterId|null),(EncounterId|null),(EncounterId|null),(EncounterId|null)]>} physical
   * @property {Readonly<[(EncounterId|null),(EncounterId|null),(EncounterId|null),(EncounterId|null),(EncounterId|null)]>} supernatural
   * @property {Readonly<[(EncounterId|null),(EncounterId|null),(EncounterId|null),(EncounterId|null),(EncounterId|null),(EncounterId|null)]>} final
   */
  /**
   * @typedef {Object} CampaignState
   * @property {1} version
   * @property {CampaignPhase} phase
   * @property {(number|null)} seed
   * @property {(number|null)} rngState
   * @property {(DungeonId|null)} dungeonId
   * @property {(number|null)} position
   * @property {readonly HeroId[]} draftPartyIds
   * @property {readonly HeroId[]} partyIds
   * @property {readonly HeroId[]} deadHeroIds
   * @property {CampaignAssignments} assignments
   * @property {(PendingOutcome|null)} pendingOutcome
   * @property {(HeroId|null)} pendingVictimId
   * @property {number} sequence
   * @property {readonly ActionEvent[]} actionHistory
   * @property {readonly InvariantViolation[]} invariantViolations
   */
  /**
   * @typedef {Object} EngineResult
   * @property {boolean} ok
   * @property {CampaignState=} state
   * @property {readonly AppEffect[]=} effects
   * @property {EngineError=} error
   */
  /**
   * @typedef {Object} ExpeditionController
   * @property {(action: GameAction) => EngineResult} dispatch
   * @property {() => (CampaignState|null)} getState
   * @property {() => void} destroy
   */
  /** @type {Readonly<{createController: (root: HTMLElement) => ExpeditionController}>} */
  var ExpeditionApp = Object.freeze({ createController: createController });
  global.ExpeditionApp = ExpeditionApp;

  function mountEntry() {
    var root = document.getElementById('app');
    if (root && !root.dataset.mounted) {
      root.dataset.mounted = 'true';
      createController(root);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountEntry, { once: true });
  } else {
    mountEntry();
  }
})(window);
