(function (global) {
  'use strict';
  var T = global.ExpeditionTest;
  var Driver = global.ExpeditionBrowserDriver;
  var Recipes = global.ExpeditionBoundaryRecipes;
  var Data = global.ExpeditionData;
  var Narrative = global.ExpeditionNarrative;
  function withRecipe(name, inspect) {
    var recipe = Recipes[name], session = Driver.create(recipe.seed), observations = [];
    try {
      var state = Driver.replay(session, recipe, function (event) {
        observations.push({ when:event.when, action:event.action.type, phase:event.state.phase, position:event.state.position,
          dungeonId:event.state.dungeonId, party:event.state.partyIds.slice(), dead:event.state.deadHeroIds.slice(),
          sceneId:event.state.reading && event.state.reading.sceneId,
          passageId:event.state.reading && event.state.reading.passageIds[event.state.reading.index], text:event.root.textContent });
      });
      inspect(state, observations, session);
    } finally { session.close(); }
  }
  function withNoDeaths(order, ending, inspect) {
    var run = Driver.noDeathCampaign(20260831, order, ending);
    try { inspect(run.state, run.visited, run.session); } finally { run.session.close(); }
  }
  T.test('V2/E2E-005 — abordagem viável vence o primeiro encontro por controles públicos', function () {
    var session = Driver.create(20260831);
    try {
      Driver.activate(session,{type:'BEGIN'}); Driver.readAll(session); Driver.selectParty(session,['H1','H2','H3']);
      Driver.activate(session,{type:'SELECT_DESTINATION',dungeonId:'physical'}); Driver.activate(session,{type:'DEPART'});
      Driver.readAll(session); Driver.activate(session,{type:'ENTER_DUNGEON'}); Driver.readAll(session);
      var state=session.controller.getState(), view=global.ExpeditionEngine.derivePlayerView(state);
      var viable=global.ExpeditionEngine.deriveViability(state.partyIds,view.currentEncounter.id).approaches.filter(function(x){return x.viable;})[0];
      T.truthy(viable,'A receita declarada precisa ter abordagem viável.');
      Driver.activate(session,{type:'CHOOSE_APPROACH',approachId:viable.id}); T.truthy(session.controller.getState().pendingOutcome.success);
      Driver.readAll(session); T.equal(session.controller.getState().position,2);
    } finally { session.close(); }
  });
  T.test('V2/E2E-010 — Igreja seguida de Parque entrega as duas peças e só a adição da segunda amante', function () {
    withNoDeaths(['physical','supernatural'],'reunite',function(state,visited){
      var scenes=visited.map(function(x){return x.sceneId;});
      T.truthy(scenes.indexOf('lover.physical.first')<scenes.indexOf('lover.supernatural.second'));
      T.equal(scenes.indexOf('lover.supernatural.first'),-1); T.deepEqual(state.mapPieceIds,['physical','supernatural']);
    });
  });
  T.test('V2/E2E-011 — Parque seguido de Igreja entrega as duas peças e só a adição da segunda amante', function () {
    withNoDeaths(['supernatural','physical'],'reunite',function(state,visited){
      var scenes=visited.map(function(x){return x.sceneId;});
      T.truthy(scenes.indexOf('lover.supernatural.first')<scenes.indexOf('lover.physical.second'));
      T.equal(scenes.indexOf('lover.physical.first'),-1); T.deepEqual(state.mapPieceIds,['supernatural','physical']);
    });
  });
  T.test('V2/E2E-012 — campanha fresca atravessa as três rotas e reúne o medalhão com sobreviventes', function () {
    withNoDeaths(['physical','supernatural'],'reunite',function(state,visited){
      T.deepEqual(state.completedDungeonIds,['physical','supernatural','final']); T.equal(state.deadHeroIds.length,0);
      T.equal(state.endingId,'reunite'); T.truthy(visited.some(function(x){return x.sceneId==='council';}));
    });
  });
  T.test('V2/E2E-013 — decisão pública destrói o medalhão apesar das opiniões do Conselho', function () {
    withNoDeaths(['physical','supernatural'],'destroy',function(state,visited){
      T.equal(state.endingId,'destroy'); T.equal(state.deadHeroIds.indexOf('ivai'),-1);
      T.truthy(visited.some(function(x){return x.sceneId==='ending.destroy';}));
      T.truthy(visited.some(function(x){return x.sceneId==='ending.destroy'&&/Andirá/.test(x.text);}));
    });
  });
  T.test('V2/E2E-014 — oito sacrifícios deliberados levam ao final ruim e memorial coletivo', function () {
    withRecipe('final-sixth-total-loss',function(state,events){
      T.equal(events.filter(function(x){return x.when==='before'&&x.action==='SELECT_VICTIM';}).length,8);
      T.deepEqual(state.deadHeroIds,Data.heroOrder); T.equal(state.endingId,'bad'); T.equal(state.phase,'campaign_complete');
      T.truthy(events.some(function(x){return x.sceneId==='ending.bad';}));
      T.truthy(events.some(function(x){return x.sceneId==='memorial';}));
    });
  });
  T.test('V2/E2E-016 — última morte na quinta posição inicial conclui amante e mapa com reservas vivas', function () {
    withRecipe('initial-fifth-last-party',function(state,events){
      var boundary=events.find(function(x){return x.when==='before'&&x.action==='SELECT_VICTIM'&&x.position===5;});
      T.deepEqual(boundary.party,['H8']); T.truthy(boundary.dead.length<7);
      T.truthy(events.some(function(x){return x.sceneId==='lover.physical.first';}));
      T.deepEqual(state.mapPieceIds,['physical']); T.equal(state.phase,'formation');
    });
  });
  T.test('V2/E2E-017 — última morte na sexta posição final abre Conselho solo e termina reunificação', function () {
    withRecipe('final-sixth-solo-council',function(state,events){
      var boundary=events.find(function(x){return x.when==='before'&&x.action==='SELECT_VICTIM'&&x.dungeonId==='final'&&x.position===6;});
      T.deepEqual(boundary.party,['H8']); T.truthy(boundary.dead.length<7);
      T.truthy(events.some(function(x){return x.passageId==='council.solo';}));
      T.equal(state.endingId,'reunite'); T.deepEqual(state.climaxPartyIds,[]); T.equal(state.phase,'campaign_complete');
    });
  });
  T.test('V2/E2E-018 — morte do único sobrevivente na sexta posição prioriza final ruim antes do Conselho', function () {
    withRecipe('final-sixth-total-loss',function(state,events){
      var last=events.find(function(x){return x.when==='before'&&x.action==='SELECT_VICTIM'&&x.position===6&&x.dungeonId==='final';});
      T.deepEqual(last.party,['H8']); T.equal(last.dead.length,7);
      T.falsy(events.some(function(x){return /^council/.test(x.sceneId||'');})); T.equal(state.endingId,'bad');
    });
  });
  T.test('V2/E2E-019 — campanha sem mortes omite memorial e mostra apenas epílogos elegíveis', function () {
    withNoDeaths(['physical','supernatural'],'reunite',function(state,visited){
      T.equal(state.deadHeroIds.length,0); T.falsy(visited.some(function(x){return /^memorial/.test(x.sceneId);}));
      var got=Array.from(new Set(visited.filter(function(x){return /^epilogue\./.test(x.sceneId);}).map(function(x){return x.sceneId;})));
      T.deepEqual(got,state.climaxPartyIds.map(function(id){return 'epilogue.'+id;}));
    });
  });
  T.test('V2/E2E-022 — pacote sem prologue.01 para na validação fatal', async function () {
    var result=await Driver.fixture('tests/fixtures/fatal-missing-prologue.html','fatal-missing-prologue');
    T.includes(result.text,'estado inválido');T.includes(result.text,'Recarregar a página');T.falsy(result.validation.ok);
    T.truthy(result.validation.violations.some(function(x){return x.code==='missing_narrative_content'&&x.context.passageId==='prologue.01';}));
  });
  T.test('V2/E2E-026 — apresentação empacotada revisa NPCs, cenários, reflexo e dezesseis encontros', function () {
    withNoDeaths(['physical','supernatural'],'reunite',function(_state,visited){
      var ivai=visited.find(function(x){return x.passageId==='prologue.02';});
      var perola=visited.find(function(x){return x.passageId==='lover.physical.warning';});
      var florai=visited.find(function(x){return x.passageId==='lover.supernatural.warning';});
      var andira=visited.find(function(x){return x.passageId==='council.andira';});
      T.equal(ivai.portraitSrc,Narrative.speakers.ivai.portraitPath);T.equal(ivai.backgroundSrc,Narrative.backgrounds.tavern.path);T.truthy(ivai.portraitContained);
      T.equal(perola.portraitSrc,Narrative.speakers.perola.portraitPath);T.equal(perola.backgroundSrc,Narrative.backgrounds.church.path);T.truthy(perola.portraitContained);
      T.equal(florai.portraitSrc,Narrative.speakers.florai.portraitPath);T.equal(florai.backgroundSrc,Narrative.backgrounds.figtree.path);T.truthy(florai.portraitContained);
      T.equal(andira.portraitSrc,Narrative.speakers.andira.portraitPath);T.equal(andira.backgroundSrc,Narrative.backgrounds.council.path);T.truthy(andira.reflection);T.truthy(andira.portraitContained);
      var reviews=visited.filter(function(x){return /^encounter\.[AB]\d$/.test(x.sceneId||'')&&!x.passageId;});
      T.equal(reviews.length,16);T.equal(new Set(reviews.map(function(x){return x.sceneId;})).size,16);
      reviews.forEach(function(review){var id=review.sceneId.split('.')[1],encounter=Data.encounters[id];
        T.equal(review.encounterSrc,encounter.imagePath);T.equal(review.passageText,encounter.description);T.truthy(review.text.indexOf(encounter.title)>=0);
      });
      global.__expeditionPresentationReview={
        npc:[ivai,perola,florai,andira].map(function(item){return {passageId:item.passageId,backgroundSrc:item.backgroundSrc,portraitSrc:item.portraitSrc,reflection:item.reflection,portraitContained:item.portraitContained};}),
        encounters:reviews.map(function(item){return {sceneId:item.sceneId,imagePath:item.encounterSrc,text:item.passageText,titlePresent:item.text.indexOf(Data.encounters[item.sceneId.split('.')[1]].title)>=0};})
      };
    });
  });
})(window);
