(function (global) {
  'use strict';
  var mode = document.documentElement.dataset.missing;
  global.task03IO = { networkCalls: 0, storageCalls: 0, imageErrors: [] };
  global.fetch = function () {
    global.task03IO.networkCalls++;
    throw new Error('Rede desabilitada nesta sessão de teste.');
  };
  global.XMLHttpRequest = function () {
    global.task03IO.networkCalls++;
    throw new Error('Rede desabilitada nesta sessão de teste.');
  };
  ['getItem', 'setItem', 'removeItem', 'clear'].forEach(function (name) {
    Storage.prototype[name] = function () {
      global.task03IO.storageCalls++;
      throw new Error('Armazenamento indisponível nesta sessão de teste.');
    };
  });
  global.addEventListener(
    'error',
    function (event) {
      if (event.target && event.target.tagName === 'IMG')
        global.task03IO.imageErrors.push(event.target.getAttribute('src'));
    },
    true
  );
  if (!mode) return;
  if (mode === 'hero' || mode === 'preview') {
    var data = JSON.parse(JSON.stringify(global.ExpeditionData));
    if (mode === 'hero') data.heroes.H1.portraitPath = 'assets/heroes/missing-h1.png';
    else data.destinations.physical.previewPath = 'assets/destinations/missing-physical.png';
    global.ExpeditionData = data;
  } else if (mode === 'background') {
    var narrative = JSON.parse(JSON.stringify(global.ExpeditionNarrative));
    Object.keys(narrative.backgrounds).forEach(function (id) {
      if (narrative.backgrounds[id].path)
        narrative.backgrounds[id].path = 'assets/scenes/missing-background.png';
    });
    global.ExpeditionNarrative = narrative;
  }
})(window);
