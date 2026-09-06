(function () {
  'use strict';
  window.addEventListener('DOMContentLoaded', function () {
    parent.postMessage({
      fixture: 'index-observer',
      protocol: location.protocol,
      phase: window.expeditionQA.snapshot().phase,
      globals: ['ExpeditionData', 'ExpeditionNarrative', 'ExpeditionEngine', 'ExpeditionApp'].map(function (name) { return !!window[name]; }),
      sources: Array.prototype.map.call(document.scripts, function (node) { return node.getAttribute('src'); }).filter(Boolean)
    }, '*');
  });
})();
