// Suite: catálogo canônico
// Invariant: o catálogo preserva a matriz H1–H8 e os dezesseis encontros confirmados.
// Boundary IN: ExpeditionData e ExpeditionEngine.validateCatalog/deriveViability.
// Boundary OUT: transições de campanha, DOM e imagens binárias.
(function (global) {
  'use strict';

  var T = global.ExpeditionTest;
  var Data = global.ExpeditionData;
  var Engine = global.ExpeditionEngine;

  function cloneCatalog() {
    return JSON.parse(JSON.stringify(Data));
  }

  function freezeFixture(value) {
    if (!value || typeof value !== 'object' || Object.isFrozen(value)) {
      return value;
    }
    Object.keys(value).forEach(function (key) { freezeFixture(value[key]); });
    return Object.freeze(value);
  }

  function violationCodes(result) {
    return result.violations.map(function (violation) { return violation.code; });
  }

  T.test('UT-001 — catálogo contém oito competências, rótulos aprovados e famílias 4/4', function () {
    var result = Engine.validateCatalog();
    var labels = Data.competencyOrder.map(function (competencyId) { return Data.competencies[competencyId].label; });
    var families = Data.competencyOrder.map(function (competencyId) { return Data.competencies[competencyId].family; });
    T.truthy(result.ok);
    T.deepEqual(labels, ['Força', 'Destreza', 'Percepção', 'Conhecimento', 'Ocultismo', 'Vontade', 'Sobrevivência', 'Atletismo']);
    T.equal(families.filter(function (family) { return family === 'bodily'; }).length, 4);
    T.equal(families.filter(function (family) { return family === 'liminal'; }).length, 4);
  });

  T.test('UT-002 — H1–H8 correspondem exatamente à matriz confirmada', function () {
    var pairs = {};
    Data.heroOrder.forEach(function (heroId) { pairs[heroId] = Data.heroes[heroId].competencyIds; });
    T.deepEqual(pairs, {
      H1: ['strength', 'will'],
      H2: ['dexterity', 'athletics'],
      H3: ['perception', 'survival'],
      H4: ['knowledge', 'occultism'],
      H5: ['strength', 'knowledge'],
      H6: ['dexterity', 'perception'],
      H7: ['occultism', 'athletics'],
      H8: ['will', 'survival']
    });
  });

  T.test('UT-003 — par de heróis repetido é denunciado sem alterar o catálogo congelado', function () {
    var fixture = cloneCatalog();
    fixture.heroes.H8.competencyIds = fixture.heroes.H1.competencyIds.slice();
    freezeFixture(fixture);
    var result = Engine.validateCatalog(fixture);
    T.includes(violationCodes(result), 'duplicate_hero_pair');
    T.deepEqual(Data.heroes.H8.competencyIds, ['will', 'survival']);
    T.truthy(Object.isFrozen(Data.heroes.H8.competencyIds));
  });

  T.test('UT-004 — cada competência ocupa exatamente dois dos dezesseis espaços dos heróis', function () {
    var occurrences = Engine.validateCatalog().report.heroCompetencyOccurrences;
    Data.competencyOrder.forEach(function (competencyId) {
      T.equal(occurrences[competencyId], 2, competencyId);
    });
  });

  T.test('UT-005 — mapa de encontros contém exatamente A1–A8 e B1–B8', function () {
    T.deepEqual(Object.keys(Data.encounters).sort(), Data.encounterOrder.slice().sort());
    T.equal(Data.encounterOrder.length, 16);
  });

  T.test('UT-006 — encontros com duas ou quatro abordagens são rejeitados', function () {
    var twoApproaches = cloneCatalog();
    twoApproaches.encounters.A1.approaches.pop();
    var fourApproaches = cloneCatalog();
    fourApproaches.encounters.A1.approaches.push(JSON.parse(JSON.stringify(fourApproaches.encounters.A1.approaches[0])));
    T.includes(violationCodes(Engine.validateCatalog(freezeFixture(twoApproaches))), 'invalid_approach_count');
    T.includes(violationCodes(Engine.validateCatalog(freezeFixture(fourApproaches))), 'invalid_approach_count');
    var nullApproach = cloneCatalog();
    nullApproach.encounters.A1.approaches[0] = null;
    T.includes(violationCodes(Engine.validateCatalog(freezeFixture(nullApproach))), 'invalid_approach_definition');
  });

  T.test('UT-007 — competências repetidas nas abordagens do mesmo encontro são rejeitadas', function () {
    var fixture = cloneCatalog();
    fixture.encounters.B2.approaches[2].competencyId = fixture.encounters.B2.approaches[0].competencyId;
    var result = Engine.validateCatalog(freezeFixture(fixture));
    T.includes(violationCodes(result), 'duplicate_approach_competency');
  });

  T.test('UT-008 — cada A usa 2 corpóreas/1 liminar e cada B usa 1 corpórea/2 liminares', function () {
    Data.encounterOrder.forEach(function (encounterId) {
      var currentEncounter = Data.encounters[encounterId];
      var families = currentEncounter.approaches.map(function (currentApproach) {
        return Data.competencies[currentApproach.competencyId].family;
      });
      var bodily = families.filter(function (family) { return family === 'bodily'; }).length;
      var liminal = families.filter(function (family) { return family === 'liminal'; }).length;
      T.deepEqual([bodily, liminal], currentEncounter.pool === 'A' ? [2, 1] : [1, 2], encounterId);
    });
  });

  T.test('UT-009 — cada competência aparece seis vezes nas quarenta e oito abordagens', function () {
    var occurrences = Engine.validateCatalog().report.approachCompetencyOccurrences;
    Data.competencyOrder.forEach(function (competencyId) {
      T.equal(occurrences[competencyId], 6, competencyId);
    });
  });

  T.test('UT-010 — H1/H2/H3 possui ao menos uma abordagem viável em todos os encontros', function () {
    Data.encounterOrder.forEach(function (encounterId) {
      T.truthy(Engine.deriveViability(['H1', 'H2', 'H3'], encounterId).count >= 1, encounterId);
    });
  });

  T.test('UT-011 — H4/H7/H8 encontra estado 0/3 em A1', function () {
    var viability = Engine.deriveViability(['H4', 'H7', 'H8'], 'A1');
    T.equal(viability.label, '0/3');
    T.deepEqual(viability.approaches.map(function (currentApproach) { return currentApproach.viable; }), [false, false, false]);
  });

  T.test('UT-012 — inventários provisórios e caminhos JPEG possuem as quantidades contratadas', function () {
    var report = Engine.validateCatalog().report;
    var paths = Data.encounterOrder.map(function (encounterId) { return Data.encounters[encounterId].imagePath; });
    T.deepEqual({
      paths: new Set(paths).size,
      successes: report.successTextCount,
      failures: report.failureTextCount,
      farewells: report.farewellCount,
      epilogues: report.epilogueCount
    }, { paths: 16, successes: 48, failures: 16, farewells: 8, epilogues: 8 });
    paths.forEach(function (imagePath, index) {
      T.equal(imagePath, 'assets/encounters/' + Data.encounterOrder[index].toLowerCase() + '.jpg');
    });
    var remoteImage = cloneCatalog();
    remoteImage.encounters.A1.imagePath = 'https://example.invalid/a1.jpg';
    T.includes(violationCodes(Engine.validateCatalog(freezeFixture(remoteImage))), 'invalid_encounter_image_path');
  });
})(window);
