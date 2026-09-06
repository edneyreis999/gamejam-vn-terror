(function () {
  'use strict';
  var clock = 1000;
  function activate(action) {
    var value = action.heroId || action.dungeonId || action.approachId || action.ending;
    var suffix = value === undefined ? '' : '[data-value="' + value + '"]';
    if (action.type === 'SELECT_DESTINATION' && !document.querySelector('[data-action="SELECT_DESTINATION"]' + suffix)) {
      activate({ type: 'OPEN_DESTINATIONS' });
    }
    var node = document.querySelector('[data-action="' + action.type + '"]' + suffix);
    if (!node) throw new Error('Controle ausente: ' + action.type + '.');
    clock += 500;
    var event = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
    try { Object.defineProperty(event, 'timeStamp', { value: clock }); } catch (_error) {}
    node.dispatchEvent(event);
  }
  window.addEventListener('DOMContentLoaded', function () {
    var query = new URLSearchParams(location.search);
    var seed = Number(query.get('seed'));
    var mode = query.get('mode');
    var name = query.get('name');
    var configured = window.expeditionQA.setSeed(seed);
    if (!configured.ok) throw new Error(configured.error.message);
    if (mode === 'sacrifice') {
      window.ExpeditionBoundaryRecipes['final-sixth-total-loss'].actions.slice(0, 15).forEach(activate);
    } else {
      activate({ type: 'BEGIN' });
    }
    parent.postMessage({ fixture: name, snapshot: window.expeditionQA.snapshot(), storageAttempts: window.__storageAttempts }, '*');
  });
})();
