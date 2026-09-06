(function (global) {
  'use strict';
  var T = global.ExpeditionTest,
    E = global.ExpeditionEngine,
    App = global.ExpeditionApp;
  var D = global.ExpeditionData,
    N = global.ExpeditionNarrative,
    Driver = global.ExpeditionBrowserDriver,
    Recipes = global.ExpeditionBoundaryRecipes;
  function copy(value) {
    return JSON.parse(JSON.stringify(value));
  }
  function key(node, value, shift) {
    var event = new KeyboardEvent('keydown', {
      key: value,
      shiftKey: !!shift,
      bubbles: true,
      cancelable: true
    });
    node.dispatchEvent(event);
    return event;
  }
  // Synthetic events cannot invoke a browser's trusted default action. Model only
  // that I/O boundary here; the public keyboard walk is repeated with CDP in QA.
  function keyboardActivate(session, action, value) {
    var selector =
      '[data-action="' +
      action.type +
      '"]' +
      (action.heroId || action.dungeonId || action.approachId
        ? '[data-value="' + (action.heroId || action.dungeonId || action.approachId) + '"]'
        : '');
    var node = session.root.querySelector(selector);
    T.truthy(node, selector);
    node.focus();
    var down = key(node, value || 'Enter');
    if (!down.defaultPrevented && !node.disabled) Driver.activate(session, action);
    node.dispatchEvent(
      new KeyboardEvent('keyup', { key: value || 'Enter', bubbles: true, cancelable: true })
    );
  }
  function formation(seed) {
    var s = Driver.create(seed === undefined ? 20260831 : seed);
    Driver.activate(s, { type: 'BEGIN' });
    Driver.readAll(s);
    return s;
  }
  function encounter() {
    var s = formation();
    Driver.selectParty(s, ['H1', 'H2', 'H3']);
    Driver.activate(s, { type: 'SELECT_DESTINATION', dungeonId: 'physical' });
    Driver.activate(s, { type: 'DEPART' });
    Driver.readAll(s);
    Driver.activate(s, { type: 'ENTER_DUNGEON' });
    return s;
  }
  function fixture(state) {
    T.truthy(E.validateState(state).ok, JSON.stringify(E.validateState(state)));
    var root = document.createElement('div');
    root.className = 'test-host';
    root.style.cssText = 'position:fixed;left:0;top:0;width:1280px;height:720px;z-index:10000';
    document.body.appendChild(root);
    var c = App.createController(root, state);
    return {
      root: root,
      controller: c,
      close: function () {
        c.destroy();
        root.remove();
      }
    };
  }
  function returnFixture(dead, presented) {
    var state = copy(E.createReadyState());
    Object.assign(state, {
      phase: 'automatic_retreat',
      seed: 1,
      rngState: 1,
      dungeonId: 'physical',
      position: 1,
      deadHeroIds: dead || ['H1', 'H2'],
      presentedDeathIds: presented || [],
      reading: {
        sceneId: 'automatic_retreat',
        passageIds: N.scenes.automatic_retreat.passageIds.slice(),
        index: 0
      }
    });
    state.assignments.physical[0] = 'A1';
    state.progress.physical = 1;
    return fixture(state);
  }
  function clock() {
    var now = 10000,
      serial = 0,
      pending = new Map(),
      all = [],
      orig = { now: Date.now, set: global.setTimeout, clear: global.clearTimeout },
      animations = new WeakMap();
    Date.now = function () {
      return now;
    };
    global.setTimeout = function (fn, delay) {
      var id = ++serial,
        record = { id: id, at: now + Math.max(0, Number(delay) || 0), fn: fn };
      pending.set(id, record);
      all.push(record);
      return id;
    };
    global.clearTimeout = function (id) {
      pending.delete(id);
    };
    function sync(root) {
      if (!root) return;
      root
        .getAnimations({ subtree: true })
        .filter(function (a) {
          return a.animationName === 'tavern-absence';
        })
        .forEach(function (a) {
          if (!animations.has(a)) {
            animations.set(a, now);
            a.pause();
          }
          a.currentTime = now - animations.get(a);
        });
    }
    return {
      sync: sync,
      pending: pending,
      all: all,
      tick: function (ms, root) {
        sync(root);
        var end = now + ms,
          budget = 2000;
        while (budget--) {
          var next = Array.from(pending.values())
            .filter(function (t) {
              return t.at <= end;
            })
            .sort(function (a, b) {
              return a.at - b.at || a.id - b.id;
            })[0];
          if (!next) break;
          now = next.at;
          pending.delete(next.id);
          next.fn();
          sync(root);
        }
        T.truthy(budget > 0, 'Fila de timers não converge.');
        now = end;
        sync(root);
      },
      restore: function () {
        Date.now = orig.now;
        global.setTimeout = orig.set;
        global.clearTimeout = orig.clear;
      }
    };
  }
  function motion(reduced) {
    var original = global.matchMedia,
      listeners = [],
      removed = [];
    var query = {
      matches: !!reduced,
      addEventListener: function (type, fn) {
        listeners.push(fn);
      },
      removeEventListener: function (type, fn) {
        removed.push(fn);
        listeners = listeners.filter(function (x) {
          return x !== fn;
        });
      }
    };
    global.matchMedia = function () {
      return query;
    };
    return {
      removed: removed,
      set: function (value) {
        query.matches = value;
        listeners.slice().forEach(function (fn) {
          fn({ matches: value });
        });
      },
      restore: function () {
        global.matchMedia = original;
      }
    };
  }
  function fading(session) {
    return Array.from(session.root.querySelectorAll('.hero-card.is-fading'));
  }
  function returnAfterTwoDeaths() {
    var s = Driver.create(9);
    Driver.replay(s, { actions: Recipes['final-sixth-total-loss'].actions.slice(0, 24) });
    T.deepEqual(s.controller.getState().deadHeroIds, ['H1', 'H2']);
    Driver.activate(s, { type: 'REQUEST_RETREAT' });
    Driver.activate(s, { type: 'CONFIRM_RETREAT' });
    return s;
  }
  function frame() {
    return new Promise(function (resolve) {
      global.requestAnimationFrame(function () {
        global.requestAnimationFrame(resolve);
      });
    });
  }
  function noChange(session, fn) {
    var before = JSON.stringify(session.controller.getState());
    fn();
    T.equal(JSON.stringify(session.controller.getState()), before);
  }
  function assertEmpty(session, ids) {
    ids.forEach(function (id) {
      T.falsy(session.root.querySelector('.hero-card[data-hero-id="' + id + '"]'));
      T.truthy(session.root.querySelector('.hero-spot[data-hero-id="' + id + '"].is-empty'));
    });
  }
  T.test(
    'V2/UT-089 — reentrada e destroy preservam campanha e o novo dono da inspeção',
    function () {
      var a = Driver.create(1),
        nested;
      try {
        var action = {};
        Object.defineProperty(action, 'type', {
          enumerable: true,
          get: function () {
            nested = a.controller.dispatch({ type: 'BEGIN' });
            return 'BEGIN';
          }
        });
        var outer = a.controller.dispatch(action);
        T.truthy(outer.ok);
        T.deepEqual(nested.error, {
          code: 'transition_in_progress',
          message: 'Uma transição já está em andamento.',
          context: {}
        });
        T.equal(a.controller.getState().sequence, 1);
        a.controller.destroy();
        var b = Driver.create(2);
        try {
          var before = global.expeditionQA.snapshot(),
            old = a.controller.getState();
          T.deepEqual(a.controller.dispatch({ type: 'ADVANCE_TEXT' }).error, {
            code: 'controller_destroyed',
            message: 'O controlador foi encerrado.',
            context: {}
          });
          a.controller.destroy();
          T.equal(a.controller.getState(), old);
          T.deepEqual(global.expeditionQA.snapshot(), before);
          T.deepEqual(global.expeditionQA.setSeed(3), { ok: true, seed: 3 });
        } finally {
          b.close();
        }
      } finally {
        a.close();
      }
    }
  );
  T.test(
    'V2/IT-004 — falhas de retratos e cenários preservam ações; entrada e mapa dispensam raster',
    function () {
      var vectors = [
        { scene: 'entry' },
        { scene: 'hero' },
        { scene: 'ivai' },
        { scene: 'destination' },
        { scene: 'map' },
        { scene: 'background' },
        { scene: 'memorial' }
      ];
      vectors.forEach(function (vector) {
        var s = Driver.create(9);
        try {
          if (vector.scene === 'hero' || vector.scene === 'destination') {
            Driver.activate(s, { type: 'BEGIN' });
            Driver.readAll(s);
            if (vector.scene === 'destination') Driver.activate(s, { type: 'OPEN_DESTINATIONS' });
          } else if (vector.scene === 'ivai' || vector.scene === 'background') {
            Driver.activate(s, { type: 'BEGIN' });
            if (vector.scene === 'ivai') {
              var budget = 5;
              while (
                !s.root.querySelector('.speaker-portrait img') &&
                s.controller.getState().reading &&
                budget--
              )
                Driver.activate(s, { type: 'ADVANCE_TEXT' });
            }
          } else if (vector.scene === 'map') {
            Driver.activate(s, { type: 'BEGIN' });
            Driver.readAll(s);
            Driver.playRoute(s, 'physical');
            Driver.playRoute(s, 'supernatural');
            var map = copy(s.controller.getState());
            s.close();
            map.phase = 'dungeon_complete';
            map.dungeonId = 'supernatural';
            map.position = 5;
            map.selectedDungeonId = null;
            map.reading = {
              sceneId: 'map.reveal',
              passageIds: N.scenes['map.reveal'].passageIds.slice(),
              index: 0
            };
            s = fixture(map);
            T.equal(s.root.querySelectorAll('.map-piece').length, 2);
          } else if (vector.scene === 'memorial') {
            Driver.replay(s, Recipes['final-sixth-total-loss'], function (o) {
              if (o.when === 'after' && o.state.phase === 'memorial') s.memorialSeen = true;
            });
            T.truthy(s.memorialSeen);
            s.close();
            var state = copy(E.createReadyState());
            Object.assign(state, {
              phase: 'memorial',
              seed: 9,
              rngState: 9,
              deadHeroIds: D.heroOrder.slice(),
              endingId: 'bad',
              reading: {
                sceneId: 'memorial',
                passageIds: ['memorial.intro'].concat(
                  D.heroOrder.map(function (id) {
                    return 'memorial.' + id;
                  })
                ),
                index: 1
              }
            });
            s = fixture(state);
          }
          var before = JSON.stringify(s.controller.getState()),
            text = s.root.textContent,
            buttons = Array.from(s.root.querySelectorAll('button')).map(function (b) {
              return b.dataset.action;
            });
          var selector = {
            hero: '.hero-portrait img',
            ivai: '.speaker-portrait img',
            destination: '.destination-preview img',
            background: '.scene-background img',
            memorial: '.speaker-portrait img'
          }[vector.scene];
          var img = selector && s.root.querySelector(selector);
          if (img) {
            var owner = img.parentElement;
            img.dispatchEvent(new Event('error'));
            T.falsy(owner.querySelector('img'));
            T.truthy(owner.querySelector('.image-fallback:not([hidden])'));
          } else {
            T.truthy(
              vector.scene === 'entry' || vector.scene === 'map',
              'Recurso obrigatório do vetor ausente: ' + vector.scene
            );
            T.equal(
              s.root.querySelectorAll(
                vector.scene === 'entry' ? '.entry-screen img' : '.map-pieces img'
              ).length,
              0,
              'Entrada e mapa atuais não dependem de ilustração raster.'
            );
          }
          T.equal(JSON.stringify(s.controller.getState()), before);
          T.truthy(
            s.root.textContent.includes(text) ||
              text
                .split('\n')
                .filter(Boolean)
                .every(function (line) {
                  return s.root.textContent.includes(line);
                })
          );
          T.deepEqual(
            Array.from(s.root.querySelectorAll('button')).map(function (b) {
              return b.dataset.action;
            }),
            buttons
          );
          T.truthy(global.expeditionQA.validate().ok);
        } finally {
          s.close();
        }
      });
    }
  );
  T.test(
    'V2/IT-008 — inspeção única sobrevive ao ponteiro na ficha e fala sem selecionar',
    function () {
      var s = formation();
      try {
        var h1 = s.root.querySelector('[data-value="H1"]');
        noChange(s, function () {
          h1.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
          T.equal(s.root.querySelectorAll('.is-inspected').length, 1);
          ['.hero-sheet', '.hero-speech'].forEach(function (selector) {
            var child = h1.querySelector(selector);
            h1.dispatchEvent(new MouseEvent('mouseout', { bubbles: true, relatedTarget: child }));
            child.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, relatedTarget: h1 }));
            T.truthy(h1.classList.contains('is-inspected'));
          });
          h1.focus();
          key(h1, 'ArrowRight');
          T.equal(document.activeElement.dataset.value, 'H2');
          T.equal(s.root.querySelectorAll('.hero-card.is-inspected').length, 1);
          key(document.activeElement, 'Escape');
          T.equal(s.root.querySelectorAll('.hero-card.is-inspected').length, 0);
        });
      } finally {
        s.close();
      }
    }
  );
  T.test(
    'V2/IT-009 — clique, Enter e Space selecionam; foco isolado mantém escala e estado',
    function () {
      var s = formation();
      try {
        var normal = getComputedStyle(s.root.querySelector('[data-value="H2"]')).transform;
        Driver.activate(s, { type: 'TOGGLE_HERO', heroId: 'H1' });
        keyboardActivate(s, { type: 'TOGGLE_HERO', heroId: 'H2' }, 'Enter');
        keyboardActivate(s, { type: 'TOGGLE_HERO', heroId: 'H3' }, ' ');
        s.root.querySelector('[data-value="H4"]').focus();
        T.deepEqual(s.controller.getState().draftPartyIds, ['H1', 'H2', 'H3']);
        ['H1', 'H2', 'H3'].forEach(function (id) {
          var card = s.root.querySelector('[data-value="' + id + '"]');
          T.equal(card.getAttribute('aria-pressed'), 'true');
          T.truthy(card.classList.contains('is-selected'));
        });
        T.truthy(getComputedStyle(s.root.querySelector('[data-value="H2"]')).transform !== normal);
        keyboardActivate(s, { type: 'TOGGLE_HERO', heroId: 'H2' }, 'Enter');
        T.equal(getComputedStyle(s.root.querySelector('[data-value="H2"]')).transform, normal);
        T.deepEqual(s.controller.getState().draftPartyIds, ['H1', 'H3']);
      } finally {
        s.close();
      }
    }
  );
  T.test(
    'V2/IT-010 — setas escolhem vizinho visual, ignoram mortos, não envolvem bordas e preservam automáticos',
    function () {
      var s = formation();
      try {
        var h2 = s.root.querySelector('[data-value="H2"]');
        h2.focus();
        key(h2, 'ArrowRight');
        T.equal(document.activeElement.dataset.value, 'H3');
        var edge = s.root.querySelector('[data-value="H1"]');
        edge.focus();
        key(edge, 'ArrowLeft');
        T.equal(document.activeElement, edge);
        T.falsy(key(edge, 'Tab').defaultPrevented);
        T.equal(s.root.querySelectorAll('.hero-card[tabindex="0"]').length, 1);
      } finally {
        s.close();
      }
      var state = copy(E.createReadyState());
      Object.assign(state, {
        phase: 'formation',
        seed: 1,
        rngState: 1,
        deadHeroIds: ['H1', 'H2', 'H3', 'H4', 'H5'],
        presentedDeathIds: ['H1', 'H2', 'H3', 'H4', 'H5']
      });
      s = fixture(state);
      try {
        var h6 = s.root.querySelector('[data-value="H6"]');
        h6.focus();
        key(h6, 'ArrowRight');
        T.equal(document.activeElement.dataset.value, 'H7');
        noChange(s, function () {
          s.root.querySelector('[data-value="H7"]').click();
        });
        T.equal(s.root.querySelectorAll('.hero-card[aria-pressed="true"]').length, 3);
        T.falsy(s.root.querySelector('.hero-card[data-value="H5"]'));
      } finally {
        s.close();
      }
    }
  );
  T.test(
    'V2/IT-011 — mortos em desaparecimento são inativos e elenco devolve foco sem alterar campanha',
    function () {
      var time = clock(),
        s = returnFixture(['H1']);
      try {
        Driver.readAll(s);
        time.sync(s.root);
        var dead = s.root.querySelector('.is-fading');
        T.truthy(dead && dead.disabled);
        noChange(s, function () {
          dead.click();
          Driver.activate(s, { type: 'OPEN_ROSTER' });
          var dialog = s.root.querySelector('dialog[open]');
          T.truthy(dialog);
          T.includes(dialog.textContent, 'Gorvak');
          T.includes(dialog.textContent, 'Morto');
          T.equal(document.activeElement.dataset.action, 'CLOSE_PANEL');
          Driver.activate(s, { type: 'CLOSE_PANEL' });
          T.equal(document.activeElement.dataset.action, 'OPEN_ROSTER');
        });
      } finally {
        s.close();
        time.restore();
      }
    }
  );
  T.test('V2/IT-012 — quarto membro gera erro exato visível sem substituir a equipe', function () {
    var s = formation();
    try {
      Driver.selectParty(s, ['H1', 'H2', 'H3']);
      var before = JSON.stringify(s.controller.getState());
      s.root.querySelector('[data-value="H4"]').click();
      T.equal(JSON.stringify(s.controller.getState()), before);
      T.includes(
        s.root.querySelector('[role="alert"]').textContent,
        'Escolha exatamente três heróis sobreviventes.'
      );
      T.deepEqual(global.expeditionQA.snapshot().lastRejectedAction, {
        action: 'TOGGLE_HERO',
        code: 'invalid_party_size',
        message: 'Escolha exatamente três heróis sobreviventes.',
        context: { count: 4 }
      });
      before = JSON.stringify(s.controller.getState());
      s.root.querySelector('[data-action="DEPART"]').click();
      T.equal(JSON.stringify(s.controller.getState()), before);
      T.includes(s.root.querySelector('[role="alert"]').textContent, 'Escolha um caminho antes de partir.');
      T.equal(document.activeElement, s.root.querySelector('[role="alert"]'));
    } finally {
      s.close();
    }
  });
  T.test(
    'V2/IT-013 — modal completo começa em Fechar, contém foco e confirma destino preservando equipe',
    function () {
      var s = formation();
      try {
        Driver.selectParty(s, ['H1', 'H2', 'H3']);
        Driver.activate(s, { type: 'OPEN_DESTINATIONS' });
        var dialog = s.root.querySelector('dialog[open]');
        T.truthy(dialog);
        T.equal(document.activeElement.dataset.action, 'CLOSE_PANEL');
        T.equal(dialog.querySelectorAll('.destination-card').length, 3);
        Object.keys(D.destinations).forEach(function (id) {
          T.includes(dialog.textContent, D.destinations[id].name);
          T.includes(dialog.textContent, D.destinations[id].rumor);
        });
        T.includes(dialog.textContent, '0/5');
        T.includes(dialog.textContent, '0/6');
        T.includes(dialog.textContent, 'Bloqueado');
        var controls = dialog.querySelectorAll('button:not([disabled])');
        controls[controls.length - 1].focus();
        key(document.activeElement, 'Tab');
        T.equal(document.activeElement, controls[0]);
        key(document.activeElement, 'Tab', true);
        T.equal(document.activeElement, controls[controls.length - 1]);
        Driver.activate(s, { type: 'SELECT_DESTINATION', dungeonId: 'physical' });
        T.falsy(s.root.querySelector('dialog[open]'));
        T.equal(document.activeElement.dataset.action, 'OPEN_DESTINATIONS');
        T.deepEqual(s.controller.getState().draftPartyIds, ['H1', 'H2', 'H3']);
        T.includes(
          s.root.querySelector('.selected-destination').textContent,
          D.destinations.physical.name
        );
        Driver.activate(s, { type: 'OPEN_DESTINATIONS' });
        var selected = s.root.querySelector('.destination-card.is-selected');
        T.truthy(selected);
        T.includes(selected.textContent, D.destinations.physical.name);
        T.includes(selected.querySelector('.destination-selection').textContent, 'Destino escolhido');
      } finally {
        s.close();
      }
    }
  );
  T.test('V2/IT-014 — Escape e Fechar preservam a equipe e o destino já escolhido', function () {
    var s = formation();
    try {
      Driver.selectParty(s, ['H1', 'H2', 'H3']);
      Driver.activate(s, { type: 'SELECT_DESTINATION', dungeonId: 'supernatural' });
      ['escape', 'close'].forEach(function (mode) {
        var before = s.controller.getState();
        Driver.activate(s, { type: 'OPEN_DESTINATIONS' });
        var selected = s.root.querySelector('.destination-card.is-selected');
        T.truthy(selected);
        T.includes(selected.textContent, D.destinations.supernatural.name);
        T.includes(selected.querySelector('.destination-selection').textContent, 'Destino escolhido');
        if (mode === 'escape') key(s.root.querySelector('dialog'), 'Escape');
        else Driver.activate(s, { type: 'CLOSE_PANEL' });
        T.equal(s.controller.getState(), before);
        T.equal(document.activeElement.dataset.action, 'OPEN_DESTINATIONS');
      });
    } finally {
      s.close();
    }
  });
  T.test(
    'V2/IT-015 — caminho concluído e final bloqueado informam motivo e não podem ser selecionados',
    function () {
      var s = formation();
      try {
        Driver.playRoute(s, 'physical');
        T.equal(s.controller.getState().selectedDungeonId, 'supernatural');
        Driver.activate(s, { type: 'OPEN_DESTINATIONS' });
        ['.status-completed', '.status-locked'].forEach(function (selector) {
          var card = s.root.querySelector(selector);
          T.truthy(card);
          T.truthy(card.querySelector('.destination-reason').textContent);
          T.falsy(card.querySelector('[data-action="SELECT_DESTINATION"]'));
          noChange(s, function () {
            card.focus();
            card.click();
          });
        });
        T.equal(s.controller.getState().selectedDungeonId, 'supernatural');
      } finally {
        s.close();
      }
    }
  );
  function viewportSession(width, height, missing) {
    return new Promise(function (resolve, reject) {
      var frame = document.createElement('iframe');
      frame.style.cssText =
        'position:fixed;z-index:20000;left:0;top:0;border:0;width:' +
        width +
        'px;height:' +
        height +
        'px';
      var timer = global.setTimeout(function () {
        frame.remove();
        reject(new Error('Documento de viewport não carregou.'));
      }, 4000);
      frame.onload = function () {
        global.clearTimeout(timer);
        try {
          var win = frame.contentWindow,
            root = win.document.getElementById('testgame'),
            controller = win.ExpeditionApp.createController(root);
          resolve({
            root: root,
            controller: controller,
            win: win,
            frame: frame,
            close: function () {
              controller.destroy();
              frame.remove();
            }
          });
        } catch (error) {
          frame.remove();
          reject(error);
        }
      };
      frame.srcdoc =
        '<!doctype html><html data-missing="' +
        (missing || '') +
        '"><head><base href="' +
        new URL('.', global.location.href).href +
        '"><link rel="stylesheet" href="styles.css"><script defer src="data.js"></script><script defer src="narrative.js"></script><script defer src="tests/fixtures/task03-browser-boundaries.js"></script><script defer src="game.js"></script><script defer src="app.js"></script></head><body><div id="testgame"></div></body></html>';
      document.body.appendChild(frame);
    });
  }
  function readableRegion(session, node) {
    var doc = node.ownerDocument,
      win = doc.defaultView,
      r = node.getBoundingClientRect(),
      style = win.getComputedStyle(node);
    T.truthy(
      style.display !== 'none' && style.visibility !== 'hidden' && r.width > 0,
      'A região precisa estar visível: ' +
        node.className +
        ' / ' +
        node.parentElement.dataset.heroId +
        ' / ' +
        node.parentElement.className +
        ' / ativo ' +
        (doc.activeElement && doc.activeElement.className)
    );
    T.truthy(
      r.left >= -1 &&
        r.right <= win.innerWidth + 1 &&
        r.top >= 55 &&
        r.bottom <= win.innerHeight + 1,
      'Região fora da área útil: ' + JSON.stringify({ x: r.x, y: r.y, w: r.width, h: r.height })
    );
    T.truthy(node.scrollWidth <= node.clientWidth + 1, 'Texto não pode exigir rolagem horizontal.');
    var walk = doc.createTreeWalker(node, NodeFilter.SHOW_TEXT),
      text;
    while ((text = walk.nextNode())) {
      if (!text.textContent.trim()) continue;
      var range = doc.createRange();
      range.selectNodeContents(text);
      Array.from(range.getClientRects()).forEach(function (line) {
        var x = line.x + line.width / 2,
          y = line.y + line.height / 2;
        if (x < r.left || x > r.right || y < r.top || y > r.bottom) return;
        var hit = doc.elementFromPoint(x, y);
        T.truthy(hit && node.contains(hit), 'Texto coberto: ' + text.textContent.slice(0, 45));
      });
    }
  }
  async function inspectEveryHero() {
    for (var size of [
      [1280, 720],
      [1920, 1080]
    ]) {
      var s = await viewportSession(size[0], size[1]);
      try {
        Driver.activate(s, { type: 'BEGIN' });
        Driver.readAll(s);
        for (var id of D.heroOrder) {
          for (var selected of [false, true]) {
            Driver.selectParty(s, selected ? [id] : []);
            var card = s.root.querySelector('[data-value="' + id + '"]');
            await frame();
            card.focus();
            await frame();
            T.equal(card.getAttribute('aria-pressed'), String(selected));
            var sheet = card.querySelector('.hero-sheet'),
              speech = card.querySelector('.hero-speech');
            readableRegion(s, sheet);
            readableRegion(s, speech);
            T.includes(sheet.textContent, D.heroes[id].summary);
            T.includes(speech.textContent, D.heroes[id].presentationText);
            var portrait = card.querySelector('.hero-portrait').getBoundingClientRect();
            T.truthy(
              sheet.getBoundingClientRect().bottom <= portrait.top + 2,
              'A ficha permanece acima do retrato.'
            );
            var a = speech.getBoundingClientRect();
            T.truthy(
              a.right <= portrait.left + 1 || a.left >= portrait.right - 1,
              'A fala permanece lateral ao retrato.'
            );
          }
        }
        Array.from(s.root.querySelectorAll('.scene-actions button')).forEach(function (b) {
          var r = b.getBoundingClientRect();
          T.truthy(r.left >= 0 && r.right <= size[0] && r.top >= 0 && r.bottom <= size[1]);
        });
      } finally {
        s.close();
      }
    }
  }
  T.test(
    'V2/IT-016 — todos os heróis selecionados e disponíveis preservam texto e alvos nas duas áreas',
    inspectEveryHero
  );
  T.test(
    'V2/IT-017 — fases e painéis mostram prosa pública sem identificadores ou metadados privados',
    function () {
      var forbidden =
        /\bH[1-8]\b|\b[AB][1-8]\b|rngState|competencyIds|prototype_baseline|sourceStatus|\b(?:strength|agility|dexterity|endurance|perception|reason|spirit|willpower)\b/;
      function audit(s) {
        var strings = [s.root.textContent];
        Array.from(s.root.querySelectorAll('[aria-label],[title],[alt]')).forEach(function (n) {
          ['aria-label', 'title', 'alt'].forEach(function (a) {
            strings.push(n.getAttribute(a) || '');
          });
        });
        strings.forEach(function (text) {
          T.falsy(forbidden.test(text), text.slice(0, 250));
        });
      }
      var s = Driver.create(9),
        phases = new Set();
      try {
        audit(s);
        Driver.replay(s, Recipes['final-sixth-total-loss'], function (o) {
          if (o.when === 'after') {
            phases.add(o.state.phase);
            audit(s);
            if (o.state.phase === 'formation') {
              Driver.activate(s, { type: 'OPEN_DESTINATIONS' });
              audit(s);
              Driver.activate(s, { type: 'CLOSE_PANEL' });
            }
            if (o.state.phase !== 'invalid') {
              Driver.activate(s, { type: 'OPEN_ROSTER' });
              audit(s);
              Driver.activate(s, { type: 'CLOSE_PANEL' });
            }
          }
        });
        T.truthy(
          phases.has('sacrifice_choice') &&
            phases.has('memorial') &&
            phases.has('campaign_complete')
        );
      } finally {
        s.close();
      }
      var run = Driver.noDeathCampaign(20260831, ['physical', 'supernatural'], 'reunite');
      try {
        run.visited.forEach(function (row) {
          T.falsy(forbidden.test(row.text));
        });
        T.truthy(
          run.visited.some(function (row) {
            return row.phase === 'council';
          })
        );
        T.truthy(
          run.visited.some(function (row) {
            return row.phase === 'epilogue';
          })
        );
      } finally {
        run.session.close();
      }
    }
  );
  T.test(
    'V2/IT-026 — cancelar recuo restaura apresentação inédita e confirmar preserva descoberta sem progresso',
    function () {
      var s = encounter();
      try {
        T.equal(s.controller.getState().phase, 'encounter_intro');
        var before = s.controller.getState(),
          reading = copy(before.reading);
        Driver.activate(s, { type: 'REQUEST_RETREAT' });
        var dialog = s.root.querySelector('dialog[open]'),
          cancelEvent = new Event('cancel', { cancelable: true });
        T.truthy(dialog);
        dialog.dispatchEvent(cancelEvent);
        T.truthy(cancelEvent.defaultPrevented);
        T.deepEqual(s.controller.getState().reading, reading);
        T.deepEqual(s.controller.getState().seenPassageIds, before.seenPassageIds);
        T.equal(document.activeElement.dataset.action, 'REQUEST_RETREAT');
        Driver.activate(s, { type: 'REQUEST_RETREAT' });
        Driver.activate(s, { type: 'CANCEL_RETREAT' });
        T.deepEqual(s.controller.getState().reading, reading);
        T.deepEqual(s.controller.getState().seenPassageIds, before.seenPassageIds);
        T.equal(document.activeElement.dataset.action, 'REQUEST_RETREAT');
        Driver.activate(s, { type: 'REQUEST_RETREAT' });
        Driver.activate(s, { type: 'CONFIRM_RETREAT' });
        T.equal(s.controller.getState().phase, 'formation');
        T.deepEqual(s.controller.getState().assignments, before.assignments);
        T.deepEqual(s.controller.getState().progress, before.progress);
      } finally {
        s.close();
      }
    }
  );
  T.test(
    'V2/IT-030 — retorno real do controlador exibe dois mortos em 0, 500 e 1000 ms',
    function () {
      var time = clock(),
        s = returnFixture();
      try {
        Driver.readAll(s);
        time.sync(s.root);
        T.equal(fading(s).length, 2);
        var anchors = Array.from(s.root.querySelectorAll('.hero-spot'))
          .slice(2)
          .map(function (n) {
            return n.style.cssText;
          });
        fading(s).forEach(function (n) {
          T.truthy(Number(getComputedStyle(n).opacity) > 0.95);
          T.truthy(n.disabled);
        });
        time.tick(500, s.root);
        fading(s).forEach(function (n) {
          var opacity = Number(getComputedStyle(n).opacity);
          T.truthy(opacity > 0.4 && opacity < 0.6, 'Opacidade intermediária: ' + opacity);
        });
        time.tick(500, s.root);
        assertEmpty(s, ['H1', 'H2']);
        T.deepEqual(
          Array.from(s.root.querySelectorAll('.hero-spot'))
            .slice(2)
            .map(function (n) {
              return n.style.cssText;
            }),
          anchors
        );
      } finally {
        s.close();
        time.restore();
      }
    }
  );
  T.test(
    'V2/IT-031 — seleção e modal aos 400 ms preservam o fim original aos 1000 ms',
    function () {
      var time = clock(),
        s = returnFixture();
      try {
        Driver.readAll(s);
        time.sync(s.root);
        time.tick(400, s.root);
        Driver.activate(s, { type: 'TOGGLE_HERO', heroId: 'H3' });
        Driver.activate(s, { type: 'OPEN_DESTINATIONS' });
        T.truthy(s.root.querySelector('dialog[open]'));
        T.deepEqual(s.controller.getState().draftPartyIds, ['H3']);
        time.sync(s.root);
        time.tick(100, s.root);
        T.equal(fading(s).length, 2);
        time.tick(500, s.root);
        assertEmpty(s, ['H1', 'H2']);
        T.truthy(s.root.querySelector('dialog[open]'));
        T.deepEqual(s.controller.getState().draftPartyIds, ['H3']);
      } finally {
        s.close();
        time.restore();
      }
    }
  );
  T.test(
    'V2/IT-032 — partida cancela ausência; retorno não repete mortos e nova morte recebe efeito próprio',
    function () {
      var time = clock(),
        s = returnFixture();
      try {
        Driver.readAll(s);
        time.sync(s.root);
        time.tick(400, s.root);
        Driver.selectParty(s, ['H3', 'H4', 'H6']);
        Driver.activate(s, { type: 'SELECT_DESTINATION', dungeonId: 'physical' });
        Driver.activate(s, { type: 'DEPART' });
        var markup = s.root.innerHTML,
          state = s.controller.getState();
        time.tick(600, s.root);
        T.equal(s.root.innerHTML, markup);
        T.equal(s.controller.getState(), state);
        Driver.activate(s, { type: 'REQUEST_RETREAT' });
        Driver.activate(s, { type: 'CONFIRM_RETREAT' });
        assertEmpty(s, ['H1', 'H2']);
        T.equal(fading(s).length, 0);
        Driver.selectParty(s, ['H3', 'H4', 'H6']);
        Driver.activate(s, { type: 'SELECT_DESTINATION', dungeonId: 'physical' });
        Driver.activate(s, { type: 'DEPART' });
        Driver.readAll(s);
        Driver.activate(s, { type: 'ENTER_DUNGEON' });
        Driver.readAll(s);
        Driver.activate(s, { type: 'CHOOSE_APPROACH', approachId: 'A1-1' });
        Driver.readAll(s);
        Driver.activate(s, { type: 'SELECT_VICTIM', heroId: 'H3' });
        Driver.readAll(s);
        Driver.activate(s, { type: 'REQUEST_RETREAT' });
        Driver.activate(s, { type: 'CONFIRM_RETREAT' });
        T.deepEqual(
          fading(s).map(function (n) {
            return n.dataset.value;
          }),
          ['H3']
        );
        assertEmpty(s, ['H1', 'H2']);
        time.tick(1000, s.root);
        assertEmpty(s, ['H1', 'H2', 'H3']);
      } finally {
        s.close();
        time.restore();
      }
    }
  );
  T.test(
    'V2/IT-033 — movimento reduzido elimina ausências imediatamente e não as repete ao desligar',
    function () {
      var pref = motion(true),
        time = clock(),
        s = returnFixture();
      try {
        Driver.readAll(s);
        assertEmpty(s, ['H1', 'H2']);
        Driver.activate(s, { type: 'OPEN_ROSTER' });
        T.includes(s.root.textContent, 'Gorvak');
        T.includes(s.root.textContent, 'Morto');
        Driver.activate(s, { type: 'CLOSE_PANEL' });
        pref.set(false);
        Driver.activate(s, { type: 'TOGGLE_HERO', heroId: 'H3' });
        time.tick(2000, s.root);
        assertEmpty(s, ['H1', 'H2']);
        T.equal(fading(s).length, 0);
      } finally {
        s.close();
        time.restore();
        pref.restore();
      }
    }
  );
  T.test(
    'V2/IT-034 — destroy remove timers, imagens, dialog e listener sem retirar a posse do controlador novo',
    function () {
      var pref = motion(false),
        time = clock(),
        a = returnFixture(),
        b;
      try {
        Driver.readAll(a);
        time.sync(a.root);
        Driver.activate(a, { type: 'OPEN_ROSTER' });
        var dialog = a.root.querySelector('dialog[open]'),
          img = a.root.querySelector('img'),
          lateImage = img.onerror,
          lateTimers = time.all.map(function (t) {
            return t.fn;
          });
        T.truthy(dialog);
        a.controller.destroy();
        T.equal(time.pending.size, 0);
        T.falsy(dialog.open);
        T.equal(img.onerror, null);
        T.truthy(pref.removed.length > 0);
        b = formation(2);
        var snapshot = global.expeditionQA.snapshot(),
          markup = b.root.innerHTML;
        lateTimers.forEach(function (fn) {
          fn();
        });
        if (lateImage) lateImage.call(img);
        pref.set(true);
        T.deepEqual(global.expeditionQA.snapshot(), snapshot);
        T.equal(b.root.innerHTML, markup);
        T.deepEqual(global.expeditionQA.setSeed(4), {
          ok: false,
          error: {
            code: 'campaign_already_started',
            message: 'Defina a semente antes de iniciar a campanha.'
          }
        });
      } finally {
        a.close();
        if (b) b.close();
        time.restore();
        pref.restore();
      }
    }
  );
  T.test(
    'V2/IT-037 — observação imutável durante escolha e fade não altera RNG, vistos nem prazo',
    function () {
      var time = clock(),
        s = returnFixture();
      function observe() {
        var before = JSON.stringify(s.controller.getState()),
          q = global.expeditionQA.snapshot();
        T.deepEqual(Object.keys(global.expeditionQA), ['setSeed', 'snapshot', 'validate']);
        [
          function () {
            q.assignments.physical[0] = 'A8';
          },
          function () {
            q.seenPassages.push('injected');
          },
          function () {
            q.deadHeroes.push('H8');
          }
        ].forEach(function (fn) {
          try {
            fn();
          } catch (error) {
            T.truthy(error instanceof TypeError);
          }
        });
        for (var i = 0; i < 8; i++) {
          global.expeditionQA.snapshot();
          T.truthy(global.expeditionQA.validate().ok);
        }
        T.equal(JSON.stringify(s.controller.getState()), before);
      }
      try {
        Driver.readAll(s);
        time.sync(s.root);
        time.tick(400, s.root);
        observe();
        time.tick(600, s.root);
        assertEmpty(s, ['H1', 'H2']);
        s.close();
        s = encounter();
        Driver.readAll(s);
        T.equal(s.controller.getState().phase, 'encounter_choice');
        observe();
      } finally {
        s.close();
        time.restore();
      }
    }
  );
  var SMALL_RESERVE_RECIPES = {
    1: {
      seed: 2,
      actions: [
        { type: 'BEGIN', seed: 2 },
        { type: 'ADVANCE_TEXT' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ADVANCE_TEXT' },
        { type: 'TOGGLE_HERO', heroId: 'H2' },
        { type: 'TOGGLE_HERO', heroId: 'H5' },
        { type: 'TOGGLE_HERO', heroId: 'H3' },
        { type: 'SELECT_DESTINATION', dungeonId: 'physical' },
        { type: 'DEPART' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ENTER_DUNGEON' },
        { type: 'ADVANCE_TEXT' },
        { type: 'CHOOSE_APPROACH', approachId: 'A6-3' },
        { type: 'ADVANCE_TEXT' },
        { type: 'SELECT_VICTIM', heroId: 'H3' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ENTER_DUNGEON' },
        { type: 'ADVANCE_TEXT' },
        { type: 'CHOOSE_APPROACH', approachId: 'A3-1' },
        { type: 'ADVANCE_TEXT' },
        { type: 'SELECT_VICTIM', heroId: 'H2' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ADVANCE_TEXT' },
        { type: 'REQUEST_RETREAT' },
        { type: 'CONFIRM_RETREAT' },
        { type: 'TOGGLE_HERO', heroId: 'H6' },
        { type: 'TOGGLE_HERO', heroId: 'H7' },
        { type: 'SELECT_DESTINATION', dungeonId: 'physical' },
        { type: 'DEPART' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ENTER_DUNGEON' },
        { type: 'ADVANCE_TEXT' },
        { type: 'CHOOSE_APPROACH', approachId: 'A6-2' },
        { type: 'ADVANCE_TEXT' },
        { type: 'SELECT_VICTIM', heroId: 'H7' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ADVANCE_TEXT' },
        { type: 'REQUEST_RETREAT' },
        { type: 'CONFIRM_RETREAT' },
        { type: 'TOGGLE_HERO', heroId: 'H6' },
        { type: 'TOGGLE_HERO', heroId: 'H8' },
        { type: 'TOGGLE_HERO', heroId: 'H4' },
        { type: 'SELECT_DESTINATION', dungeonId: 'physical' },
        { type: 'DEPART' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ENTER_DUNGEON' },
        { type: 'ADVANCE_TEXT' },
        { type: 'CHOOSE_APPROACH', approachId: 'A6-1' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ENTER_DUNGEON' },
        { type: 'ADVANCE_TEXT' },
        { type: 'CHOOSE_APPROACH', approachId: 'A3-2' },
        { type: 'ADVANCE_TEXT' },
        { type: 'SELECT_VICTIM', heroId: 'H8' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ADVANCE_TEXT' },
        { type: 'REQUEST_RETREAT' },
        { type: 'CONFIRM_RETREAT' },
        { type: 'TOGGLE_HERO', heroId: 'H5' },
        { type: 'TOGGLE_HERO', heroId: 'H6' },
        { type: 'TOGGLE_HERO', heroId: 'H1' },
        { type: 'SELECT_DESTINATION', dungeonId: 'physical' },
        { type: 'DEPART' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ENTER_DUNGEON' },
        { type: 'ADVANCE_TEXT' },
        { type: 'CHOOSE_APPROACH', approachId: 'A6-2' },
        { type: 'ADVANCE_TEXT' },
        { type: 'SELECT_VICTIM', heroId: 'H1' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ENTER_DUNGEON' },
        { type: 'ADVANCE_TEXT' },
        { type: 'CHOOSE_APPROACH', approachId: 'A3-1' },
        { type: 'ADVANCE_TEXT' },
        { type: 'SELECT_VICTIM', heroId: 'H6' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ENTER_DUNGEON' },
        { type: 'ADVANCE_TEXT' },
        { type: 'CHOOSE_APPROACH', approachId: 'A2-1' },
        { type: 'ADVANCE_TEXT' },
        { type: 'SELECT_VICTIM', heroId: 'H4' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ADVANCE_TEXT' }
      ],
      checkpoint: { phase: 'automatic_retreat', alive: ['H5'], position: 3, route: 'physical' }
    },
    2: {
      seed: 1,
      actions: [
        { type: 'BEGIN', seed: 1 },
        { type: 'ADVANCE_TEXT' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ADVANCE_TEXT' },
        { type: 'TOGGLE_HERO', heroId: 'H2' },
        { type: 'TOGGLE_HERO', heroId: 'H4' },
        { type: 'TOGGLE_HERO', heroId: 'H6' },
        { type: 'SELECT_DESTINATION', dungeonId: 'physical' },
        { type: 'DEPART' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ENTER_DUNGEON' },
        { type: 'ADVANCE_TEXT' },
        { type: 'CHOOSE_APPROACH', approachId: 'A6-1' },
        { type: 'ADVANCE_TEXT' },
        { type: 'SELECT_VICTIM', heroId: 'H6' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ADVANCE_TEXT' },
        { type: 'REQUEST_RETREAT' },
        { type: 'CONFIRM_RETREAT' },
        { type: 'TOGGLE_HERO', heroId: 'H2' },
        { type: 'TOGGLE_HERO', heroId: 'H3' },
        { type: 'TOGGLE_HERO', heroId: 'H7' },
        { type: 'SELECT_DESTINATION', dungeonId: 'physical' },
        { type: 'DEPART' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ENTER_DUNGEON' },
        { type: 'ADVANCE_TEXT' },
        { type: 'CHOOSE_APPROACH', approachId: 'A6-1' },
        { type: 'ADVANCE_TEXT' },
        { type: 'SELECT_VICTIM', heroId: 'H4' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ENTER_DUNGEON' },
        { type: 'ADVANCE_TEXT' },
        { type: 'CHOOSE_APPROACH', approachId: 'A1-1' },
        { type: 'ADVANCE_TEXT' },
        { type: 'SELECT_VICTIM', heroId: 'H3' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ADVANCE_TEXT' },
        { type: 'REQUEST_RETREAT' },
        { type: 'CONFIRM_RETREAT' },
        { type: 'TOGGLE_HERO', heroId: 'H7' },
        { type: 'TOGGLE_HERO', heroId: 'H5' },
        { type: 'TOGGLE_HERO', heroId: 'H8' },
        { type: 'TOGGLE_HERO', heroId: 'H1' },
        { type: 'SELECT_DESTINATION', dungeonId: 'physical' },
        { type: 'DEPART' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ENTER_DUNGEON' },
        { type: 'ADVANCE_TEXT' },
        { type: 'CHOOSE_APPROACH', approachId: 'A6-3' },
        { type: 'ADVANCE_TEXT' },
        { type: 'SELECT_VICTIM', heroId: 'H1' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ENTER_DUNGEON' },
        { type: 'ADVANCE_TEXT' },
        { type: 'CHOOSE_APPROACH', approachId: 'A1-2' },
        { type: 'ADVANCE_TEXT' },
        { type: 'SELECT_VICTIM', heroId: 'H5' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ENTER_DUNGEON' },
        { type: 'ADVANCE_TEXT' },
        { type: 'CHOOSE_APPROACH', approachId: 'A5-1' },
        { type: 'ADVANCE_TEXT' },
        { type: 'SELECT_VICTIM', heroId: 'H8' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ADVANCE_TEXT' },
        { type: 'ADVANCE_TEXT' }
      ],
      checkpoint: {
        phase: 'automatic_retreat',
        alive: ['H2', 'H7'],
        position: 3,
        route: 'physical'
      }
    }
  };
  var COMPLETE_RECIPE = {
    seed: 20260831,
    actions: [
      { type: 'BEGIN', seed: 20260831 },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'TOGGLE_HERO', heroId: 'H1' },
      { type: 'TOGGLE_HERO', heroId: 'H2' },
      { type: 'TOGGLE_HERO', heroId: 'H3' },
      { type: 'SELECT_DESTINATION', dungeonId: 'physical' },
      { type: 'DEPART' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ENTER_DUNGEON' },
      { type: 'ADVANCE_TEXT' },
      { type: 'CHOOSE_APPROACH', approachId: 'A7-1' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ENTER_DUNGEON' },
      { type: 'ADVANCE_TEXT' },
      { type: 'CHOOSE_APPROACH', approachId: 'A1-1' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ENTER_DUNGEON' },
      { type: 'ADVANCE_TEXT' },
      { type: 'CHOOSE_APPROACH', approachId: 'A8-1' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ENTER_DUNGEON' },
      { type: 'ADVANCE_TEXT' },
      { type: 'CHOOSE_APPROACH', approachId: 'A4-1' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ENTER_DUNGEON' },
      { type: 'ADVANCE_TEXT' },
      { type: 'CHOOSE_APPROACH', approachId: 'A5-1' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'SELECT_DESTINATION', dungeonId: 'supernatural' },
      { type: 'DEPART' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ENTER_DUNGEON' },
      { type: 'ADVANCE_TEXT' },
      { type: 'CHOOSE_APPROACH', approachId: 'B7-1' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ENTER_DUNGEON' },
      { type: 'ADVANCE_TEXT' },
      { type: 'CHOOSE_APPROACH', approachId: 'B4-3' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ENTER_DUNGEON' },
      { type: 'ADVANCE_TEXT' },
      { type: 'CHOOSE_APPROACH', approachId: 'B5-2' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ENTER_DUNGEON' },
      { type: 'ADVANCE_TEXT' },
      { type: 'CHOOSE_APPROACH', approachId: 'B8-2' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ENTER_DUNGEON' },
      { type: 'ADVANCE_TEXT' },
      { type: 'CHOOSE_APPROACH', approachId: 'B1-1' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'SELECT_DESTINATION', dungeonId: 'final' },
      { type: 'DEPART' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ENTER_DUNGEON' },
      { type: 'ADVANCE_TEXT' },
      { type: 'CHOOSE_APPROACH', approachId: 'B3-1' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ENTER_DUNGEON' },
      { type: 'ADVANCE_TEXT' },
      { type: 'CHOOSE_APPROACH', approachId: 'A6-1' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ENTER_DUNGEON' },
      { type: 'ADVANCE_TEXT' },
      { type: 'CHOOSE_APPROACH', approachId: 'A3-1' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ENTER_DUNGEON' },
      { type: 'ADVANCE_TEXT' },
      { type: 'CHOOSE_APPROACH', approachId: 'B2-1' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ENTER_DUNGEON' },
      { type: 'ADVANCE_TEXT' },
      { type: 'CHOOSE_APPROACH', approachId: 'A2-1' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ENTER_DUNGEON' },
      { type: 'ADVANCE_TEXT' },
      { type: 'CHOOSE_APPROACH', approachId: 'B6-2' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'CHOOSE_ENDING', ending: 'reunite' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' },
      { type: 'ADVANCE_TEXT' }
    ]
  };
  function tabTo(session, node) {
    var doc = session.root.ownerDocument,
      attempts = 40;
    while (doc.activeElement !== node && attempts--) {
      var active = doc.activeElement,
        event = key(active, 'Tab');
      if (!event.defaultPrevented) {
        var scope = session.root.querySelector('dialog[open]') || session.root;
        var stops = Array.from(scope.querySelectorAll('button,[tabindex]')).filter(function (n) {
          var r = n.getBoundingClientRect();
          return !n.disabled && n.tabIndex >= 0 && r.width && r.height;
        });
        T.truthy(stops.length);
        stops[(stops.indexOf(active) + 1) % stops.length].focus();
      }
    }
    T.equal(doc.activeElement, node, 'Tab deve alcançar o controle público.');
  }
  function keyboardAction(session, action) {
    if (
      action.type === 'SELECT_DESTINATION' &&
      !session.root.querySelector('[data-action="SELECT_DESTINATION"]')
    )
      keyboardAction(session, { type: 'OPEN_DESTINATIONS' });
    var value = action.heroId || action.dungeonId || action.approachId;
    var node = session.root.querySelector(
      '[data-action="' + action.type + '"]' + (value ? '[data-value="' + value + '"]' : '')
    );
    T.truthy(node, 'Controle de teclado: ' + action.type);
    if (node.classList.contains('hero-card') && node.tabIndex < 0) {
      var stop = session.root.querySelector('.hero-card[tabindex="0"]');
      tabTo(session, stop);
      var budget = 8;
      while (session.root.ownerDocument.activeElement !== node && budget--)
        key(session.root.ownerDocument.activeElement, 'ArrowRight');
      T.equal(session.root.ownerDocument.activeElement, node);
    } else tabTo(session, node);
    keyboardActivate(session, action, action.heroId === 'H3' ? ' ' : 'Enter');
  }
  T.test(
    'V2/E2E-001 — avisos, prólogo, formação e caminho da Igreja chegam às três abordagens',
    async function () {
      var s = await viewportSession(1280, 720);
      try {
        T.includes(s.root.textContent, 'maiores de 16 anos');
        T.includes(s.root.textContent, 'morte permanente');
        T.equal(s.win.expeditionQA.snapshot().phase, 'ready');
        s.win.expeditionQA.setSeed(20260831);
        Driver.activate(s, { type: 'BEGIN' });
        T.equal(s.win.expeditionQA.snapshot().reading.passageId, 'prologue.01');
        Driver.readAll(s);
        Driver.selectParty(s, ['H1', 'H2', 'H3']);
        Driver.activate(s, { type: 'SELECT_DESTINATION', dungeonId: 'physical' });
        var q = s.win.expeditionQA.snapshot();
        T.deepEqual(q.draftParty, ['H1', 'H2', 'H3']);
        T.equal(q.selectedDestination, 'physical');
        Driver.activate(s, { type: 'DEPART' });
        Driver.readAll(s);
        Driver.activate(s, { type: 'ENTER_DUNGEON' });
        Driver.readAll(s);
        T.equal(s.controller.getState().phase, 'encounter_choice');
        T.equal(s.root.querySelectorAll('.approach-card').length, 3);
        T.equal(
          s.root.querySelectorAll(
            '.expedition-party .hero-portrait, .expedition-party .party-portrait'
          ).length || s.root.querySelectorAll('.expedition-party img').length,
          3
        );
        T.truthy(s.root.querySelector('.encounter-copy .passage-text'));
      } finally {
        s.close();
      }
    }
  );
  T.test('V2/E2E-002 — percurso de teclado passa por sacrifício, retorno e consulta', function () {
    var time = clock(),
      s = Driver.create(9);
    try {
      Recipes['final-sixth-total-loss'].actions.slice(0, 17).forEach(function (action) {
        keyboardAction(s, action);
      });
      T.deepEqual(s.controller.getState().deadHeroIds, ['H1']);
      T.equal(s.controller.getState().phase, 'dungeon_intro');
      keyboardAction(s, { type: 'REQUEST_RETREAT' });
      keyboardAction(s, { type: 'CONFIRM_RETREAT' });
      T.equal(s.controller.getState().phase, 'formation');
      T.equal(fading(s).length, 1);
      keyboardAction(s, { type: 'OPEN_ROSTER' });
      var dialog = s.root.querySelector('dialog[open]');
      T.includes(dialog.textContent, 'Gorvak');
      T.includes(dialog.textContent, 'Morto');
      key(dialog, 'Escape');
      T.falsy(s.root.querySelector('dialog[open]'));
      T.equal(document.activeElement.dataset.action, 'OPEN_ROSTER');
      T.deepEqual(s.controller.getState().deadHeroIds, ['H1']);
    } finally {
      s.close();
      time.restore();
    }
  });
  T.test(
    'V2/E2E-003 — inspeção pública de oito heróis preserva ficha, fala e seleção em dois tamanhos',
    async function () {
      await inspectEveryHero();
      var s = formation();
      try {
        Driver.selectParty(s, ['H1']);
        var h1 = s.root.querySelector('[data-value="H1"]'),
          h2 = s.root.querySelector('[data-value="H2"]');
        h1.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        T.truthy(h1.classList.contains('is-inspected'));
        h1.focus();
        key(h1, 'ArrowRight');
        T.equal(document.activeElement, h2);
        T.truthy(h1.classList.contains('is-selected'));
        T.equal(h1.getAttribute('aria-pressed'), 'true');
        T.includes(h2.querySelector('.hero-sheet').textContent, D.heroes.H2.summary);
      } finally {
        s.close();
      }
    }
  );
  T.test(
    'V2/E2E-004 — preparar nas duas ordens preserva destino após fechar modal e trocar um herói',
    function () {
      [false, true].forEach(function (first) {
        var s = formation();
        try {
          if (first) Driver.activate(s, { type: 'SELECT_DESTINATION', dungeonId: 'physical' });
          Driver.selectParty(s, ['H1', 'H2', 'H3']);
          if (!first) Driver.activate(s, { type: 'SELECT_DESTINATION', dungeonId: 'physical' });
          Driver.activate(s, { type: 'OPEN_DESTINATIONS' });
          Driver.activate(s, { type: 'CLOSE_PANEL' });
          Driver.selectParty(s, ['H1', 'H2', 'H4']);
          T.equal(s.controller.getState().selectedDungeonId, 'physical');
          Driver.activate(s, { type: 'DEPART' });
          T.deepEqual(s.controller.getState().partyIds, ['H1', 'H2', 'H4']);
          T.equal(s.controller.getState().dungeonId, 'physical');
        } finally {
          s.close();
        }
      });
    }
  );
  T.test(
    'V2/E2E-006 — perda deliberada lê despedida, mantém mortos no elenco e retorna com ausência',
    function () {
      var time = clock(),
        s = Driver.create(9);
      try {
        Driver.replay(s, { actions: Recipes['final-sixth-total-loss'].actions.slice(0, 15) });
        T.equal(s.controller.getState().phase, 'death_result');
        T.includes(s.root.textContent, D.heroes.H1.farewell);
        T.deepEqual(s.controller.getState().deadHeroIds, ['H1']);
        T.falsy(s.root.querySelector('[data-action="CONFIRM_SACRIFICE"]'));
        Driver.readAll(s);
        Driver.activate(s, { type: 'REQUEST_RETREAT' });
        Driver.activate(s, { type: 'CONFIRM_RETREAT' });
        T.equal(s.controller.getState().phase, 'formation');
        T.equal(fading(s).length, 1);
        Driver.activate(s, { type: 'OPEN_ROSTER' });
        T.includes(s.root.textContent, 'Gorvak');
        T.includes(s.root.textContent, 'Morto');
        Driver.activate(s, { type: 'CLOSE_PANEL' });
        time.tick(1000, s.root);
        assertEmpty(s, ['H1']);
      } finally {
        s.close();
        time.restore();
      }
    }
  );
  T.test(
    'V2/E2E-007 — duas mortes por ações legais desaparecem juntas no primeiro retorno',
    function () {
      var time = clock(),
        s = returnAfterTwoDeaths();
      try {
        T.equal(s.controller.getState().phase, 'formation');
        T.deepEqual(
          fading(s).map(function (n) {
            return n.dataset.value;
          }),
          ['H1', 'H2']
        );
        time.sync(s.root);
        time.tick(500, s.root);
        fading(s).forEach(function (n) {
          T.truthy(Math.abs(Number(getComputedStyle(n).opacity) - 0.5) < 0.1);
        });
        time.tick(500, s.root);
        assertEmpty(s, ['H1', 'H2']);
        T.equal(s.root.querySelectorAll('.hero-card:not([disabled])').length, 6);
      } finally {
        s.close();
        time.restore();
      }
    }
  );
  T.test(
    'V2/E2E-008 — a mesma jornada sob movimento reduzido mostra lugares vazios imediatamente',
    function () {
      var pref = motion(true),
        s = returnAfterTwoDeaths();
      try {
        assertEmpty(s, ['H1', 'H2']);
        T.equal(fading(s).length, 0);
        Driver.activate(s, { type: 'OPEN_ROSTER' });
        T.includes(s.root.textContent, 'Gorvak');
        T.includes(s.root.textContent, 'Elowen');
        T.includes(s.root.textContent, 'Morto');
        Driver.activate(s, { type: 'CLOSE_PANEL' });
        pref.set(false);
        Driver.activate(s, { type: 'TOGGLE_HERO', heroId: 'H3' });
        assertEmpty(s, ['H1', 'H2']);
      } finally {
        s.close();
        pref.restore();
      }
    }
  );
  T.test(
    'V2/E2E-009 — alternar rotas após recuo preserva sorteio, progresso e limites de texto visto',
    function () {
      var s = encounter();
      try {
        Driver.readAll(s);
        var encounterId = s.controller.getState().assignments.physical[0];
        Driver.activate(s, { type: 'REQUEST_RETREAT' });
        Driver.activate(s, { type: 'CONFIRM_RETREAT' });
        Driver.selectParty(s, ['H1', 'H2', 'H3']);
        Driver.activate(s, { type: 'SELECT_DESTINATION', dungeonId: 'supernatural' });
        Driver.activate(s, { type: 'DEPART' });
        Driver.readAll(s);
        Driver.activate(s, { type: 'ENTER_DUNGEON' });
        Driver.readAll(s);
        Driver.activate(s, { type: 'REQUEST_RETREAT' });
        Driver.activate(s, { type: 'CONFIRM_RETREAT' });
        Driver.selectParty(s, ['H1', 'H2', 'H3']);
        Driver.activate(s, { type: 'SELECT_DESTINATION', dungeonId: 'physical' });
        Driver.activate(s, { type: 'DEPART' });
        Driver.readAll(s);
        var rng = s.controller.getState().rngState;
        Driver.activate(s, { type: 'ENTER_DUNGEON' });
        T.equal(s.controller.getState().rngState, rng);
        T.equal(s.controller.getState().assignments.physical[0], encounterId);
        T.truthy(s.root.querySelector('[data-action="SKIP_SEEN_TEXT"]'));
        Driver.activate(s, { type: 'SKIP_SEEN_TEXT' });
        T.equal(s.controller.getState().phase, 'encounter_choice');
        T.equal(s.controller.getState().progress.physical, 0);
        Driver.activate(s, {
          type: 'CHOOSE_APPROACH',
          approachId: E.derivePlayerView(s.controller.getState()).currentEncounter.approaches[0].id
        });
        T.equal(document.activeElement, s.root.querySelector('.encounter-screen .scene-heading'));
        T.falsy(s.root.querySelector('[data-action="SKIP_SEEN_TEXT"]'));
      } finally {
        s.close();
      }
    }
  );
  T.test(
    'V2/E2E-015 — perdas legais deixam uma ou duas reservas e a expedição seguinte as inclui automaticamente',
    function () {
      [1, 2].forEach(function (count) {
        var recipe = SMALL_RESERVE_RECIPES[count],
          s = Driver.create(recipe.seed),
          mandatory = false;
        try {
          Driver.replay(s, recipe, function (o) {
            if (o.when === 'after' && o.state.phase === 'automatic_retreat') {
              mandatory = true;
              T.equal(o.state.position, 3);
              T.equal(o.state.partyIds.length, 0);
            }
          });
          T.truthy(mandatory);
          T.equal(s.controller.getState().phase, 'formation');
          var alive = D.heroOrder.filter(function (id) {
            return !s.controller.getState().deadHeroIds.includes(id);
          });
          T.equal(alive.length, count);
          T.equal(s.root.querySelectorAll('.hero-card[aria-pressed="true"]').length, count);
          Driver.activate(s, { type: 'SELECT_DESTINATION', dungeonId: 'physical' });
          Driver.activate(s, { type: 'DEPART' });
          T.deepEqual(s.controller.getState().partyIds, alive);
        } finally {
          s.close();
        }
      });
    }
  );
  T.test(
    'V2/E2E-020 — conclusão reinicia nos avisos; documentos novos descartam sacrifício e fade',
    async function () {
      var run = Driver.noDeathCampaign(20260831, ['physical', 'supernatural'], 'reunite'),
        s = run.session;
      try {
        var old = s.root.querySelector('[data-action="NEW_CAMPAIGN"]');
        old.click();
        old.click();
        var q = global.expeditionQA.snapshot();
        T.equal(q.phase, 'ready');
        T.equal(q.aliveHeroes.length, 8);
        T.equal(q.deadHeroes.length, 0);
        T.equal(q.seenPassages.length, 0);
        T.equal(q.mapFragments.found, 0);
        T.equal(q.seed, null);
        Driver.activate(s, { type: 'BEGIN' });
        T.equal(global.expeditionQA.snapshot().reading.passageId, 'prologue.01');
        T.falsy(global.expeditionQA.snapshot().reading.canSkip);
      } finally {
        s.close();
      }
      for (var mode of ['sacrifice', 'fade']) {
        var page = await viewportSession(1280, 720);
        page.win.expeditionQA.setSeed(9);
        Driver.replay(page, {
          actions: Recipes['final-sixth-total-loss'].actions.slice(
            0,
            mode === 'sacrifice' ? 14 : 24
          )
        });
        if (mode === 'fade') {
          Driver.activate(page, { type: 'REQUEST_RETREAT' });
          Driver.activate(page, { type: 'CONFIRM_RETREAT' });
          T.equal(fading(page).length, 2);
        } else T.equal(page.controller.getState().phase, 'sacrifice_choice');
        page.close();
        page = await viewportSession(1280, 720);
        try {
          T.equal(page.win.expeditionQA.snapshot().phase, 'ready');
          T.equal(page.win.expeditionQA.snapshot().aliveHeroes.length, 8);
          T.equal(page.win.expeditionQA.snapshot().seed, null);
        } finally {
          page.close();
        }
      }
    }
  );
  T.test(
    'V2/E2E-021 — documentos isolados com três imagens ausentes continuam até um encontro sem rede',
    async function () {
      for (var missing of ['hero', 'preview', 'background']) {
        var s = await viewportSession(1280, 720, missing);
        try {
          s.win.expeditionQA.setSeed(20260831);
          Driver.activate(s, { type: 'BEGIN' });
          await frame();
          Driver.readAll(s);
          Driver.selectParty(s, ['H1', 'H2', 'H3']);
          Driver.activate(s, { type: 'OPEN_DESTINATIONS' });
          await frame();
          T.includes(s.root.textContent, D.destinations.physical.name);
          Driver.activate(s, { type: 'SELECT_DESTINATION', dungeonId: 'physical' });
          Driver.activate(s, { type: 'DEPART' });
          Driver.readAll(s);
          Driver.activate(s, { type: 'ENTER_DUNGEON' });
          Driver.readAll(s);
          await frame();
          T.equal(s.controller.getState().phase, 'encounter_choice');
          T.equal(s.root.querySelectorAll('.approach-card').length, 3);
          T.truthy(
            s.win.task03IO.imageErrors.some(function (path) {
              return path.includes('missing-');
            }),
            missing
          );
          T.equal(s.win.task03IO.networkCalls, 0);
          T.equal(s.win.task03IO.storageCalls, 0);
          T.truthy(s.win.expeditionQA.validate().ok);
        } finally {
          s.close();
        }
      }
    }
  );
  T.test(
    'V2/E2E-023 — conteúdo crítico permanece alcançável em dois tamanhos e com texto ampliado',
    async function () {
      for (var vector of [
        { w: 1280, h: 720, large: false },
        { w: 1920, h: 1080, large: false },
        { w: 1280, h: 720, large: true }
      ]) {
        var s = await viewportSession(vector.w, vector.h);
        try {
          if (vector.large) {
            var style = s.win.document.createElement('style');
            style.textContent =
              '.passage-text,.hero-summary,.hero-speech,.approach-card{font-size:1.15em!important}';
            s.win.document.head.appendChild(style);
          }
          s.win.expeditionQA.setSeed(20260831);
          T.equal(s.win.innerWidth, vector.w);
          T.equal(s.win.innerHeight, vector.h);
          Driver.replay(s, COMPLETE_RECIPE, function (o) {
            if (o.when !== 'after') return;
            if (['ready', 'formation', 'encounter_choice', 'council'].includes(o.state.phase)) {
              T.truthy(s.root.scrollWidth <= vector.w + 1);
              Array.from(s.root.querySelectorAll('button'))
                .filter(function (b) {
                  return !b.disabled && b.getBoundingClientRect().width;
                })
                .forEach(function (b) {
                  var r = b.getBoundingClientRect();
                  T.truthy(
                    r.left >= -1 && r.right <= vector.w + 1,
                    'Alvo exige rolagem horizontal.'
                  );
                });
            }
          });
          T.equal(s.controller.getState().phase, 'campaign_complete');
        } finally {
          s.close();
        }
      }
      await inspectEveryHero();
      var s = Driver.create(9);
      try {
        Driver.replay(s, { actions: Recipes['final-sixth-total-loss'].actions.slice(0, 14) });
        T.truthy(s.root.querySelector('.irreversible-warning'));
        T.equal(s.root.querySelectorAll('.victim-card').length, 3);
      } finally {
        s.close();
      }
    }
  );
  T.test(
    'V2/E2E-024 — campanha completa usa recursos locais e funciona sem APIs de rede ou armazenamento',
    async function () {
      var s = await viewportSession(1280, 720);
      try {
        s.win.expeditionQA.setSeed(COMPLETE_RECIPE.seed);
        var focusedRouteReturns = 0;
        Driver.replay(s, COMPLETE_RECIPE, function (observation) {
          if (
            observation.when === 'after' &&
            observation.action.type === 'ADVANCE_TEXT' &&
            observation.state.phase === 'formation' &&
            observation.state.completedDungeonIds.length
          ) {
            focusedRouteReturns += 1;
            T.equal(
              s.win.document.activeElement,
              s.root.querySelector('.formation-screen .scene-heading')
            );
          }
        });
        T.truthy(focusedRouteReturns >= 2);
        T.equal(s.controller.getState().phase, 'campaign_complete');
        T.equal(s.controller.getState().endingId, 'reunite');
        T.equal(s.win.task03IO.networkCalls, 0);
        T.equal(s.win.task03IO.storageCalls, 0);
        Array.from(s.win.document.querySelectorAll('script[src],link[href],img[src]')).forEach(
          function (node) {
            var raw = node.getAttribute('src') || node.getAttribute('href');
            T.equal(new URL(raw, s.win.document.baseURI).protocol, 'file:');
          }
        );
        T.equal(s.win.expeditionQA.validate().ok, true);
      } finally {
        s.close();
      }
    }
  );
  T.test(
    'V2/E2E-025 — duas páginas reproduzem a receita inteira e inspeção repetida não altera decisões',
    async function () {
      var traces = [];
      for (var attempt = 0; attempt < 2; attempt++) {
        var s = await viewportSession(1280, 720);
        try {
          T.deepEqual(s.win.expeditionQA.setSeed(20260831), { ok: true, seed: 20260831 });
          var trace = [];
          Driver.replay(s, COMPLETE_RECIPE, function (o) {
            if (o.when === 'after') {
              var before = s.win.expeditionQA.snapshot();
              for (var i = 0; i < 3; i++) {
                T.truthy(s.win.expeditionQA.validate().ok);
                T.deepEqual(s.win.expeditionQA.snapshot(), before);
              }
              trace.push({
                phase: before.phase,
                sequence: before.sequence,
                assignments: before.assignments,
                history: before.actionHistory
              });
            }
          });
          T.equal(s.controller.getState().phase, 'campaign_complete');
          traces.push(trace);
        } finally {
          s.close();
        }
      }
      T.deepEqual(traces[0], traces[1]);
      T.truthy(
        traces[0].some(function (row) {
          return row.phase === 'encounter_choice';
        })
      );
      T.truthy(
        traces[0].some(function (row) {
          return row.phase === 'final_choice';
        })
      );
    }
  );
  T.test(
    'V2/E2E-027 — receita demonstrável liga inspeção, equipe, destino, perda e ausência comum',
    function () {
      var time = clock(),
        s = Driver.create(9);
      try {
        Driver.replay(s, { actions: Recipes['final-sixth-total-loss'].actions.slice(0, 8) });
        var hero = s.root.querySelector('[data-value="H1"]');
        hero.focus();
        T.truthy(
          hero.classList.contains('is-inspected'),
          'Inspeção H1: ' + hero.className + ' / ativo ' + document.activeElement.className
        );
        T.includes(hero.querySelector('.hero-sheet').textContent, D.heroes.H1.summary);
        T.equal(s.root.querySelectorAll('.hero-card[aria-pressed="true"]').length, 3);
        T.equal(s.controller.getState().selectedDungeonId, 'physical');
        Driver.replay(s, { actions: Recipes['final-sixth-total-loss'].actions.slice(8, 17) });
        T.deepEqual(s.controller.getState().deadHeroIds, ['H1']);
        Driver.activate(s, { type: 'REQUEST_RETREAT' });
        Driver.activate(s, { type: 'CONFIRM_RETREAT' });
        time.sync(s.root);
        T.equal(fading(s).length, 1);
        time.tick(500, s.root);
        T.truthy(Math.abs(Number(getComputedStyle(fading(s)[0]).opacity) - 0.5) < 0.1);
        T.equal(s.controller.getState().seed, 9);
        T.equal(s.controller.getState().deadHeroIds.length, 1);
        T.equal(s.root.querySelectorAll('.hero-card:not([disabled])').length, 7);
        time.tick(500, s.root);
        assertEmpty(s, ['H1']);
      } finally {
        s.close();
        time.restore();
      }
    }
  );
})(window);
