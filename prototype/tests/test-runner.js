(function (global) {
  'use strict';

  var manifest = global.ExpeditionCaseManifest || [];
  var cases = [];
  var registeredIds = Object.create(null);
  var loadErrors = [];

  global.addEventListener('error', function (event) {
    var target = event.target;
    if (target && target.tagName === 'SCRIPT') {
      loadErrors.push('Falha ao carregar ' + (target.getAttribute('src') || 'script sem caminho') + '.');
    }
  }, true);

  function format(value) {
    if (typeof value === 'string') {
      return JSON.stringify(value);
    }
    try {
      return JSON.stringify(value, null, 2);
    } catch (error) {
      return String(value);
    }
  }

  function fail(message) {
    throw new Error(message);
  }

  function equal(actual, expected, message) {
    if (!Object.is(actual, expected)) {
      fail((message || 'Os valores deveriam ser iguais.') + '\nEsperado: ' + format(expected) + '\nRecebido: ' + format(actual));
    }
  }

  function deepEqual(actual, expected, message) {
    var actualText = JSON.stringify(actual);
    var expectedText = JSON.stringify(expected);
    if (actualText !== expectedText) {
      fail((message || 'As estruturas deveriam ser iguais.') + '\nEsperado: ' + format(expected) + '\nRecebido: ' + format(actual));
    }
  }

  function truthy(value, message) {
    if (!value) {
      fail((message || 'O valor deveria ser verdadeiro.') + '\nRecebido: ' + format(value));
    }
  }

  function falsy(value, message) {
    if (value) {
      fail((message || 'O valor deveria ser falso.') + '\nRecebido: ' + format(value));
    }
  }

  function includes(collection, expected, message) {
    if (!collection || collection.indexOf(expected) < 0) {
      fail((message || 'A coleção deveria conter o valor.') + '\nValor: ' + format(expected) + '\nColeção: ' + format(collection));
    }
  }

  function throws(callback, expectedMessage, message) {
    var caught = null;
    try {
      callback();
    } catch (error) {
      caught = error;
    }
    if (!caught) {
      fail(message || 'A função deveria lançar um erro.');
    }
    if (expectedMessage && String(caught.message).indexOf(expectedMessage) < 0) {
      fail((message || 'O erro não contém a mensagem esperada.') + '\nEsperado: ' + expectedMessage + '\nRecebido: ' + caught.message);
    }
  }

  function registerCaseId(registry, name) {
    var idMatch = /^([A-Z0-9]+\/[A-Z0-9]+-\d{3})(?:\s|$)/.exec(name);
    var id = idMatch ? idMatch[1] : name;
    if (registry[id]) {
      throw new Error('ID de teste duplicado: ' + id + '.');
    }
    registry[id] = true;
  }

  function createRegistration(registry, targetCases) {
    return function (name, callback) {
      registerCaseId(registry, name);
      targetCases.push({ name: name, callback: callback });
    };
  }

  function caseId(name) {
    var match = /^([A-Z0-9]+\/[A-Z0-9]+-\d{3})(?:\s|$)/.exec(name);
    return match ? match[1] : name;
  }

  function auditRegistrations(expected, actual) {
    var errors = [];
    var expectedCounts = Object.create(null);
    var actualCounts = Object.create(null);
    (expected || []).forEach(function (id) {
      expectedCounts[id] = (expectedCounts[id] || 0) + 1;
      if (expectedCounts[id] > 1) errors.push('O manifesto contém ID duplicado: ' + id + '.');
    });
    (actual || []).forEach(function (name) {
      var id = caseId(name);
      actualCounts[id] = (actualCounts[id] || 0) + 1;
      if (actualCounts[id] > 1) errors.push('ID de teste duplicado: ' + id + '.');
    });
    Object.keys(expectedCounts).forEach(function (id) {
      if (!actualCounts[id]) errors.push('Caso obrigatório não registrado: ' + id + '.');
    });
    Object.keys(actualCounts).forEach(function (id) {
      if (!expectedCounts[id]) errors.push('Caso inesperado registrado: ' + id + '.');
    });
    return Object.freeze({ ok: errors.length === 0, errors: Object.freeze(errors) });
  }

  function duplicateGuardIsSound() {
    var isolatedRegistry = Object.create(null);
    var isolatedCases = [];
    var isolatedTest = createRegistration(isolatedRegistry, isolatedCases);
    isolatedTest('V2/E2E-001 — caso original', function () {});
    try {
      isolatedTest('V2/E2E-001 — caso duplicado', function () {});
    } catch (error) {
      return error.message === 'ID de teste duplicado: V2/E2E-001.' && isolatedCases.length === 1;
    }
    return false;
  }

  var registerTest = createRegistration(registeredIds, cases);
  function test(name, callback) {
    try {
      registerTest(name, callback);
    } catch (error) {
      loadErrors.push(error.message);
      throw error;
    }
  }

  async function run() {
    var results = [];
    var registrationErrors = loadErrors.slice();
    registrationErrors = registrationErrors.concat(auditRegistrations(manifest, cases.map(function (item) { return item.name; })).errors);
    if (!duplicateGuardIsSound()) {
      registrationErrors.push('O canário de IDs E2E duplicados não foi rejeitado.');
    }
    ['ExpeditionData', 'ExpeditionNarrative', 'ExpeditionEngine', 'ExpeditionApp'].forEach(function (globalName) {
      if (!global[globalName]) {
        registrationErrors.push('Runtime obrigatório ausente: window.' + globalName + '.');
      }
    });
    registrationErrors.forEach(function (message, index) {
      var name = 'RUNNER-' + String(index + 1).padStart(3, '0') + ' — integridade da suíte';
      results.push({ name: name, status: 'fail', error: message });
      console.error('FAIL ' + name, message);
    });
    for (var index = 0; index < cases.length; index += 1) {
      var current = cases[index];
      try {
        await current.callback();
        results.push({ name: current.name, status: 'pass' });
        console.log('PASS ' + current.name);
      } catch (error) {
        results.push({ name: current.name, status: 'fail', error: error && error.stack ? error.stack : String(error) });
        console.error('FAIL ' + current.name, error);
      }
    }

    var passed = results.filter(function (result) { return result.status === 'pass'; }).length;
    var failed = results.length - passed;
    var report = Object.freeze({ total: results.length, passed: passed, failed: failed, results: results });
    global.__expeditionTestResults = report;

    var summary = document.getElementById('summary');
    summary.textContent = passed + ' aprovados, ' + failed + ' falharam, ' + results.length + ' no total.';
    summary.dataset.status = failed === 0 ? 'pass' : 'fail';

    var list = document.getElementById('results');
    results.forEach(function (result) {
      var item = document.createElement('li');
      item.className = result.status;
      item.textContent = (result.status === 'pass' ? 'PASS — ' : 'FAIL — ') + result.name;
      if (result.error) {
        var detail = document.createElement('pre');
        detail.textContent = result.error;
        item.appendChild(detail);
      }
      list.appendChild(item);
    });

    document.title = (failed === 0 ? 'PASS' : 'FAIL') + ' — ' + passed + '/' + results.length + ' testes';
  }

  global.ExpeditionTest = Object.freeze({
    test: test,
    equal: equal,
    deepEqual: deepEqual,
    truthy: truthy,
    falsy: falsy,
    includes: includes,
    throws: throws,
    auditRegistrations: auditRegistrations
  });

  global.addEventListener('DOMContentLoaded', run, { once: true });
})(window);
