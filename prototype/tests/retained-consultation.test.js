(function (global) {
  'use strict';
  var T = global.ExpeditionTest, D = global.ExpeditionData;
  var Driver = global.ExpeditionBrowserDriver;
  T.test('BASE/IT-003 — consulta do elenco preserva leitura, consequência e terminal e devolve foco', function () {
    var phases = {};
    ['final-sixth-total-loss','final-sixth-solo-council'].forEach(function (name) {
      var recipe = global.ExpeditionBoundaryRecipes[name], session = Driver.create(recipe.seed);
      try {
        recipe.actions.forEach(function (action) {
          var state = session.controller.getState();
          if (state.phase !== 'ready' && !phases[state.phase]) {
            var trigger = session.root.querySelector('[data-action="OPEN_ROSTER"]');
            T.truthy(trigger, 'Consulta herdada indisponível em ' + state.phase);
            var before = JSON.stringify(state); trigger.click();
            var dialog = session.root.querySelector('dialog[open]'); T.truthy(dialog);
            T.equal(document.activeElement.dataset.action,'CLOSE_PANEL'); T.equal(JSON.stringify(session.controller.getState()),before);
            D.heroOrder.forEach(function (id) { T.includes(dialog.textContent,D.heroes[id].label); });
            dialog.querySelector('[data-action="CLOSE_PANEL"]').click();
            T.equal(JSON.stringify(session.controller.getState()),before); T.equal(document.activeElement.dataset.action,'OPEN_ROSTER');
            phases[state.phase] = true;
          }
          Driver.activate(session,action);
        });
      } finally { session.close(); }
    });
    ['formation','dungeon_intro','encounter_intro','encounter_choice','approach_result','sacrifice_choice','death_result','council','ending','memorial'].forEach(function (phase) { T.truthy(phases[phase],phase); });
  });
})(window);
