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

    function buildRoot() {
      root.textContent = '';
      var skip = element('a', 'skip-link', 'Pular para o conteúdo');
      skip.href = '#main';
      liveRegion = element('div', 'sr-only');
      liveRegion.setAttribute('role', 'status');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      stage = element('div', 'app-stage');
      append(root, skip, liveRegion, stage);
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

    function render(options) {
      if (destroyed) {
        return;
      }
      var view = Engine.derivePlayerView(state);
      var surface = surfaceFor(view);
      stage.textContent = '';
      append(stage, surface);
      document.title = (view.phase === 'ready' ? '' : view.phase === 'formation' ? 'Formação · ' : view.phase === 'dungeon_intro' ? view.dungeon.label + ' · ' : '') + 'Expedição e Sacrifício';
      if (ui.rosterOpen) {
        openRosterDialog();
      }
      if (options && options.announce) {
        liveRegion.textContent = '';
        global.requestAnimationFrame(function () {
          if (!destroyed) {
            liveRegion.textContent = options.announce;
          }
        });
      }
      if (options && options.focusError) {
        var error = stage.querySelector('[data-error-focus]');
        if (error) {
          error.focus();
        }
      } else if (options && options.focusHeading) {
        var heading = stage.querySelector('[data-surface-heading]');
        if (heading) {
          heading.focus();
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
          render({ focusHeading: Boolean(options && options.focusHeading), announce: options && options.announce });
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
      if (dialog && dialog.open) {
        dialog.close();
      }
      var target = restoreFocus;
      restoreFocus = null;
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
    root.addEventListener('cancel', onCancel);
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
        root.removeEventListener('cancel', onCancel);
        root.removeEventListener('error', onOptionalImageError, true);
        var dialog = root.querySelector('#roster-dialog');
        if (dialog && dialog.open) {
          dialog.close();
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
