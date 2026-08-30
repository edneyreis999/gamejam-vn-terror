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
      actionButton('Entrar', 'primary', 'enter-dungeon'),
      actionButton('Consultar elenco', 'roster-toggle', 'open-roster')
    );
    append(main, scene, decision);
    append(grid, main, renderRoster(view, false));
    append(frame, grid, renderRosterDialog(view));
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
      image.src = view.encounter.imagePath;
      image.alt = '';
      image.dataset.optionalImage = '';
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
    if (view.canRetreat || view.phase === 'retreat_confirmation') {
      append(actions, actionButton('Recuar para a cidade', 'ghost', 'request-retreat'));
    }
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
      if (view.phase === 'encounter_choice' || view.phase === 'retreat_confirmation') {
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
      document.title = (view.phase === 'ready' ? '' : view.phase === 'formation' ? 'Formação · ' : view.phase === 'dungeon_intro' ? view.dungeon.label + ' · ' : '') + 'Expedição e Sacrifício';
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
        return Object.freeze({ ok: false, error: Object.freeze({ code: 'controller_destroyed', message: 'O controlador foi encerrado.' }) });
      }
      if (dispatching) {
        return Object.freeze({ ok: false, error: Object.freeze({ code: 'transition_in_progress', message: 'Uma transição já está em andamento.' }) });
      }
      dispatching = true;
      try {
        var result = Engine.dispatch(state, action);
        if (result.ok) {
          state = result.state;
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
        submit({ type: 'BEGIN', seed: Date.now() >>> 0 }, { focusHeading: true, announce: 'Campanha iniciada.' });
      } else if (action === 'continue-intro') {
        submit({ type: 'CONTINUE_INTRO' }, { focusHeading: true, announce: 'Formação disponível.' });
      } else if (action === 'toggle-hero') {
        submit({ type: 'TOGGLE_HERO', heroId: trigger.dataset.id }, { announce: trigger.dataset.id + ' atualizado na formação.' });
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

    function onOptionalImageError(event) {
      var image = event.target;
      if (!image || image.tagName !== 'IMG' || !image.hasAttribute('data-optional-image')) {
        return;
      }
      var region = image.closest('[data-image-region]');
      if (region) {
        region.classList.add('image-fallback');
      }
      image.remove();
      console.warn('optional_image_failed', image.getAttribute('src') || 'sem caminho');
    }

    buildRoot();
    root.addEventListener('click', onClick);
    root.addEventListener('cancel', onCancel, true);
    root.addEventListener('error', onOptionalImageError, true);

    var catalogValidation = Engine.validateCatalog(Data);
    if (!catalogValidation.ok) {
      state = Engine.enterInvalid(state, catalogValidation.violations);
    }
    render();

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
