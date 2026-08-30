(function (global) {
  'use strict';

  var Test = global.ExpeditionTest;

  function fixture() {
    var root = document.createElement('div');
    root.style.position = 'fixed';
    root.style.insetInlineStart = '-10000px';
    root.style.width = '1000px';
    document.body.appendChild(root);
    var controller = global.ExpeditionApp.createController(root);
    return {
      root: root,
      cleanup: function () {
        controller.destroy();
        root.remove();
      }
    };
  }

  Test.test('E2E-001 — entrada file local inicia sessão jogável em português', function () {
    var current = fixture();
    Test.equal(document.documentElement.lang, 'pt-BR');
    Test.includes(current.root.textContent, 'Expedição e Sacrifício');
    var productionScripts = Array.prototype.map.call(document.querySelectorAll('script[src]'), function (script) { return script.getAttribute('src'); });
    Test.truthy(productionScripts.indexOf('data.js') < productionScripts.indexOf('game.js'));
    Test.truthy(productionScripts.indexOf('game.js') < productionScripts.indexOf('app.js'));
    current.root.querySelector('[data-action="begin"]').click();
    Test.includes(current.root.textContent, 'Antes do primeiro caminho');
    current.root.querySelector('[data-action="continue-intro"]').click();
    Test.includes(current.root.textContent, 'Forme a expedição');
    current.cleanup();
  });

  Test.test('E2E-003 — formação por controles focáveis leva H1/H2/H3 e o bardo ao threshold', function () {
    var current = fixture();
    current.root.querySelector('[data-action="begin"]').click();
    current.root.querySelector('[data-action="continue-intro"]').click();
    ['H1', 'H2', 'H3'].forEach(function (heroId) {
      var card = current.root.querySelector('[data-id="' + heroId + '"]');
      card.focus();
      Test.equal(document.activeElement, card);
      Test.equal(card.tagName, 'BUTTON');
      card.click();
      Test.equal(current.root.querySelector('[data-id="' + heroId + '"]').getAttribute('aria-pressed'), 'true');
    });
    var depart = current.root.querySelector('[data-action="depart"]');
    depart.focus();
    depart.click();
    Test.includes(current.root.textContent, 'A mata tomou a construção.');
    var roster = current.root.querySelector('.roster-region');
    ['H1', 'H2', 'H3', 'Força', 'Vontade', 'Destreza', 'Atletismo', 'Percepção', 'Sobrevivência'].forEach(function (copy) {
      Test.includes(roster.textContent, copy);
    });
    Test.includes(roster.textContent, 'Bardo');
    Test.includes(roster.textContent, 'nenhuma competência');
    current.cleanup();
  });
})(window);
