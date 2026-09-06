(function (global) {
  'use strict';
  var T=global.ExpeditionTest, E=global.ExpeditionEngine, App=global.ExpeditionApp;
  var D=global.ExpeditionData, N=global.ExpeditionNarrative, Driver=global.ExpeditionBrowserDriver, Recipes=global.ExpeditionBoundaryRecipes;
  function waitFrame(path) {
    return new Promise(function(resolve,reject){
      var frame=document.createElement('iframe'); frame.hidden=true;
      frame.onload=function(){resolve({frame:frame,win:frame.contentWindow,doc:frame.contentDocument,close:function(){frame.remove();}});};
      frame.onerror=function(){reject(new Error('Fixture não carregou: '+path));}; frame.src=path; document.body.appendChild(frame);
    });
  }
  function waitFrameMessage(path,fixture) {
    return new Promise(function(resolve,reject){
      var timer=setTimeout(function(){cleanup();reject(new Error('Fixture não respondeu: '+fixture));},3000),frame=document.createElement('iframe');
      frame.hidden=true;function cleanup(){clearTimeout(timer);global.removeEventListener('message',receive);frame.remove();}
      function receive(event){if(event.data&&event.data.fixture===fixture){var data=event.data;cleanup();resolve(data);}}
      global.addEventListener('message',receive);frame.onerror=function(){cleanup();reject(new Error('Fixture não carregou: '+path));};
      frame.src=path;document.body.appendChild(frame);
    });
  }
  function replayPrefix(name,count) {
    var recipe=Recipes[name], session=Driver.create(recipe.seed);
    Driver.replay(session,{actions:recipe.actions.slice(0,count)}); return session;
  }
  function key(root,key,repeat,target) {
    (target||root).dispatchEvent(new KeyboardEvent('keydown',{key:key,repeat:!!repeat,bubbles:true,cancelable:true}));
  }
  function atLastPassage(session) {
    var state=session.controller.getState();
    while(state.reading&&state.reading.index<state.reading.passageIds.length-1){Driver.activate(session,{type:'ADVANCE_TEXT'});state=session.controller.getState();}
    T.truthy(state.reading,'O vetor precisa terminar na última passagem.');
  }
  function repeatBoundary(makeSession,inspect) {
    ['double','held'].forEach(function(vector){var s=makeSession();try{var old=s.root.querySelector('.passage-panel');T.truthy(old);
      if(vector==='double'){Driver.activate(s,{type:'ADVANCE_TEXT'});old.click();}else{key(s.root,'Enter',false,old);key(s.root,'Enter',true,s.root);}
      inspect(s,vector);
    }finally{s.close();}});
  }
  function stateAtFirstChoice() {
    var session=Driver.create(20260831);
    Driver.activate(session,{type:'BEGIN'}); Driver.readAll(session); Driver.selectParty(session,['H1','H2','H3']);
    Driver.activate(session,{type:'SELECT_DESTINATION',dungeonId:'physical'}); Driver.activate(session,{type:'DEPART'});
    Driver.readAll(session); Driver.activate(session,{type:'ENTER_DUNGEON'}); Driver.readAll(session); return session;
  }
  function reachCouncilH1H3() {
    var session=Driver.create(20260831), visited=[];
    Driver.activate(session,{type:'BEGIN'}); Driver.readAll(session,visited);
    Driver.playRoute(session,'physical',visited); Driver.playRoute(session,'supernatural',visited);
    Driver.selectParty(session,['H1','H2','H3']); Driver.activate(session,{type:'SELECT_DESTINATION',dungeonId:'final'});
    Driver.activate(session,{type:'DEPART'});
    var guard=200;
    while(guard--){
      var state=session.controller.getState();
      if(state.reading){if(state.phase==='council')break;visited.push({phase:state.phase,sceneId:state.reading.sceneId,passageId:state.reading.passageIds[state.reading.index],text:session.root.textContent});Driver.activate(session,{type:'ADVANCE_TEXT'});continue;}
      if(state.phase==='dungeon_intro'){Driver.activate(session,{type:'ENTER_DUNGEON'});continue;}
      if(state.phase==='encounter_choice'){
        var encounter=E.derivePlayerView(state).currentEncounter.id, options=E.deriveViability(state.partyIds,encounter).approaches;
        var pick=options.filter(function(x){return state.position===6?!x.viable:x.viable;})[0];
        if(!pick) throw new Error('Sem escolha determinística para o encontro final '+state.position+'.');
        Driver.activate(session,{type:'CHOOSE_APPROACH',approachId:pick.id}); continue;
      }
      if(state.phase==='sacrifice_choice'){Driver.activate(session,{type:'SELECT_VICTIM',heroId:'H2'});continue;}
      if(state.phase==='council') break;
      throw new Error('Fase inesperada antes do Conselho: '+state.phase);
    }
    T.truthy(guard>0); T.equal(session.controller.getState().phase,'council');
    return {session:session,visited:visited};
  }
  T.test('V2/IT-001 — index e tests carregam scripts clássicos relativos na ordem declarada em file://',async function(){
    var page=await waitFrame('index.html'),child=await waitFrameMessage('tests/fixtures/index-observer.html','index-observer');
    try{T.equal(page.frame.src,new URL('index.html',location.href).href);T.deepEqual(child.globals,[true,true,true,true]);
      var sources=child.sources.map(function(path){return path.split('/').pop();});
      T.deepEqual(sources.slice(0,4),['data.js','narrative.js','game.js','app.js']);T.equal(child.protocol,'file:');T.equal(child.phase,'ready');
    }finally{page.close();}
  });
  T.test('V2/IT-002 — controlador isolado mostra avisos antes de Jogar e inicia somente prologue.01',function(){
    var s=Driver.create(7); try{T.includes(s.root.textContent,'Classificação e avisos de conteúdo');T.falsy(/salvar|continuar campanha|áudio/i.test(s.root.textContent));
      Driver.activate(s,{type:'BEGIN'});var st=s.controller.getState();T.equal(st.phase,'intro');T.equal(st.reading.passageIds[st.reading.index],'prologue.01');
    }finally{s.close();}
  });
  T.test('V2/IT-003 — double-click e Enter mantido produzem um único BEGIN',function(){
    ['double','repeat'].forEach(function(vector){var s=Driver.create(8);try{var button=s.root.querySelector('[data-action="BEGIN"]');
      if(vector==='double'){button.dispatchEvent(new MouseEvent('click',{bubbles:true}));button.dispatchEvent(new MouseEvent('click',{bubbles:true}));}
      else{button.focus();key(s.root,'Enter',false,button);button.click();key(s.root,'Enter',true,button);}
      T.equal(s.controller.getState().sequence,1);T.equal(s.controller.getState().reading.index,0);
    }finally{s.close();}});
  });
  T.test('V2/IT-005 — pacote sem prologue.01 exibe tela fatal e diagnóstico DX',async function(){
    var p=await waitFrameMessage('tests/fixtures/fatal-missing-prologue.html','fatal-missing-prologue');
    T.includes(p.text,'estado inválido');T.includes(p.text,'Recarregar a página');
    T.falsy(p.validation.ok);T.truthy(p.validation.violations.some(function(x){return x.code==='missing_narrative_content'&&x.context.passageId==='prologue.01';}));
  });
  T.test('V2/IT-006 — passagem literal não cria markup executável',async function(){
    var p=await waitFrameMessage('tests/fixtures/literal-passage.html','literal-passage');
    T.includes(p.text,'<img src=x onerror=alert(1)>');T.equal(p.imgCount,0);
  });
  T.test('V2/IT-007 — cada referência narrativa alcançável resolve e falta real falha fechado',function(){
    T.truthy(E.validateCatalog(D,N).ok);Object.keys(N.scenes).forEach(function(id){N.scenes[id].passageIds.forEach(function(pid){T.truthy(N.passages[pid]);});});
    var broken=JSON.parse(JSON.stringify(N));delete broken.passages[N.scenes.council.passageIds[0]];T.falsy(E.validateCatalog(D,broken).ok);
  });
  T.test('V2/IT-018 — área, botão e Enter avançam uma passagem inteira em vetores separados',function(){
    ['panel','button','enter'].forEach(function(vector){var s=Driver.create(9);try{Driver.activate(s,{type:'BEGIN'});var before=s.controller.getState().sequence;
      if(vector==='panel')s.root.querySelector('.passage-panel').dispatchEvent(new MouseEvent('click',{bubbles:true}));
      if(vector==='button')Driver.activate(s,{type:'ADVANCE_TEXT'});
      if(vector==='enter')key(s.root,'Enter',false,s.root.querySelector('.passage-panel'));
      T.equal(s.controller.getState().sequence,before+1);T.falsy(/typewriter|cursor de texto/i.test(s.root.textContent));
    }finally{s.close();}});
  });
  T.test('V2/IT-019 — repetição não atravessa encontro, vítima, Conselho nem reinício',function(){
    repeatBoundary(function(){return replayPrefix('final-sixth-total-loss',125);},function(s){
      T.equal(s.controller.getState().phase,'encounter_choice');T.equal(s.controller.getState().pendingOutcome,null);
    });
    repeatBoundary(function(){return replayPrefix('final-sixth-total-loss',13);},function(s){
      T.equal(s.controller.getState().phase,'sacrifice_choice');T.equal(s.controller.getState().deadHeroIds.length,0);
    });
    repeatBoundary(function(){var s=reachCouncilH1H3().session;atLastPassage(s);return s;},function(s){
      T.equal(s.controller.getState().phase,'final_choice');T.equal(s.controller.getState().endingId,null);
    });
    ['double','held'].forEach(function(vector){var run=Driver.noDeathCampaign(20260831,['physical','supernatural'],'reunite'),s=run.session;try{
      var old=s.root.querySelector('[data-action="NEW_CAMPAIGN"]');old.click();if(vector==='double')old.click();else key(s.root,'Enter',true,s.root);
      T.equal(s.controller.getState().phase,'ready');T.equal(s.controller.getState().sequence,0);T.equal(s.controller.getState().seed,null);
    }finally{s.close();}});
  });
  T.test('V2/IT-020 — seleção de texto e controle aninhado não acionam o painel',function(){
    var s=Driver.create(10),original=global.getSelection;try{Driver.activate(s,{type:'BEGIN'});var seq=s.controller.getState().sequence,panel=s.root.querySelector('.passage-panel');
      global.getSelection=function(){return 'trecho selecionado';};panel.click();T.equal(s.controller.getState().sequence,seq);
      global.getSelection=function(){return '';};var nested=document.createElement('button');nested.textContent='interno';panel.appendChild(nested);nested.click();T.equal(s.controller.getState().sequence,seq);
    }finally{global.getSelection=original;s.close();}
  });
  T.test('V2/IT-021 — texto revisto oferece skip, para no inédito e registra rejeição corrente',function(){
    var recipe=Recipes['final-sixth-total-loss'],s=Driver.create(recipe.seed),found=false;try{
      for(var i=0;i<recipe.actions.length;i++){if(s.root.querySelector('[data-action="SKIP_SEEN_TEXT"]')){found=true;break;}Driver.activate(s,recipe.actions[i]);}
      T.truthy(found,'A receita precisa revisitar texto concluído.');var before=s.controller.getState().sequence;Driver.activate(s,{type:'SKIP_SEEN_TEXT'});
      T.equal(s.controller.getState().sequence,before+1);var after=s.controller.getState();
      T.truthy(!after.reading||after.seenPassageIds.indexOf(after.reading.passageIds[after.reading.index])<0);
    }finally{s.close();}
    s=Driver.create(20260831);try{Driver.activate(s,{type:'BEGIN'});var beforeState=global.expeditionQA.snapshot();
      var rejected=s.controller.dispatch({type:'SKIP_SEEN_TEXT'}),expected={action:'SKIP_SEEN_TEXT',code:'text_not_seen',message:'Este trecho ainda não foi lido nesta campanha.',context:{passageId:'prologue.01'}};
      T.deepEqual(rejected.error,{code:expected.code,message:expected.message,context:expected.context});T.deepEqual(global.expeditionQA.snapshot().lastRejectedAction,expected);
      T.equal(global.expeditionQA.snapshot().sequence,beforeState.sequence);
    }finally{s.close();}
  });
  T.test('V2/IT-022 — zero a três abordagens viáveis mantêm três ações iguais sem rótulo de solução',function(){
    var base=stateAtFirstChoice(),state=base.controller.getState(),groups={};try{
      var ids=D.heroOrder;for(var mask=0;mask<(1<<ids.length);mask++){var party=ids.filter(function(_id,n){return mask&(1<<n);}).slice(0,3);
        if(party.length>3)continue;var count=E.deriveViability(party,E.derivePlayerView(state).currentEncounter.id).approaches.filter(function(x){return x.viable;}).length;
        if(groups[count])continue;var clone=JSON.parse(JSON.stringify(state));clone.partyIds=party;clone.draftPartyIds=party.slice();groups[count]=clone;if(Object.keys(groups).length===4)break;}
      [0,1,2,3].forEach(function(count){T.truthy(groups[count]);var root=document.createElement('div');document.body.appendChild(root);var c=App.createController(root,groups[count]);
        try{T.equal(root.querySelectorAll('.approach-card').length,3);T.falsy(/viável|competência|executor/i.test(root.textContent));}finally{c.destroy();root.remove();}});
    }finally{base.close();}
  });
  T.test('V2/IT-023 — falha foca aviso e ativar H2 mata imediatamente antes da despedida',async function(){
    var s=replayPrefix('final-sixth-total-loss',14);try{T.equal(s.controller.getState().phase,'sacrifice_choice');await new Promise(function(r){setTimeout(r,0);});
      T.equal(document.activeElement,s.root.querySelector('.scene-heading'));Driver.activate(s,{type:'SELECT_VICTIM',heroId:'H2'});
      T.includes(s.controller.getState().deadHeroIds,'H2');T.equal(s.controller.getState().phase,'death_result');T.includes(s.root.textContent,D.heroes.H2.label);
    }finally{s.close();}
  });
  T.test('V2/IT-024 — candidato único permanece vivo até ativação explícita',function(){
    var s=replayPrefix('initial-fifth-last-party',36);try{T.equal(s.controller.getState().partyIds.length,1);var id=s.controller.getState().partyIds[0];
      s.root.querySelector('.scene-heading').focus();key(s.root,'Enter',true,s.root.querySelector('.scene-heading'));T.falsy(s.controller.getState().deadHeroIds.indexOf(id)>=0);
      Driver.activate(s,{type:'SELECT_VICTIM',heroId:id});T.includes(s.controller.getState().deadHeroIds,id);
    }finally{s.close();}
  });
  T.test('V2/IT-025 — nós antigos e expectedSequence obsoleto não afetam a nova cena',function(){
    var s=stateAtFirstChoice();try{var old=s.root.querySelector('.approach-card'),seq=s.controller.getState().sequence;old.click();var after=s.controller.getState().sequence;old.click();T.equal(s.controller.getState().sequence,after);
      var stale=s.controller.dispatch({type:'CHOOSE_APPROACH',approachId:old.dataset.value,expectedSequence:seq});T.falsy(stale.ok);T.equal(stale.error.code,'stale_action');
    }finally{s.close();}
  });
  T.test('V2/IT-027 — Conselho alcançado com H1,H3 mostra só opiniões presentes e reflexo de Andirá',function(){
    var run=reachCouncilH1H3(),s=run.session;try{T.deepEqual(s.controller.getState().climaxPartyIds,['H1','H3']);
      var seen=[];while(s.controller.getState().reading){var pid=s.controller.getState().reading.passageIds[s.controller.getState().reading.index];seen.push(pid);
        if(pid==='council.andira')T.truthy(s.root.querySelector('.reflection-portrait'));Driver.activate(s,{type:'ADVANCE_TEXT'});}
      T.truthy(seen.indexOf('opinion.H1')<seen.indexOf('opinion.H3'));T.equal(seen.indexOf('opinion.H2'),-1);T.falsy(/Pérola|Floraí/.test(seen.join(' ')));
    }finally{s.close();}
  });
  T.test('V2/IT-028 — desfecho derivado encadeia memorial, H1, H3 e conclusão',function(){
    var run=reachCouncilH1H3(),s=run.session,scenes=[];try{Driver.readAll(s);Driver.activate(s,{type:'CHOOSE_ENDING',ending:'reunite'});
      while(s.controller.getState().reading){scenes.push(s.controller.getState().reading.sceneId);Driver.activate(s,{type:'ADVANCE_TEXT'});}
      T.truthy(scenes.indexOf('memorial')<scenes.indexOf('epilogue.H1'));T.truthy(scenes.indexOf('epilogue.H1')<scenes.indexOf('epilogue.H3'));
      T.equal(s.controller.getState().phase,'campaign_complete');
    }finally{s.close();}
  });
  T.test('V2/IT-029 — reinício em conclusão volta aos avisos sem iniciar nova campanha',function(){
    var run=Driver.noDeathCampaign(20260831,['physical','supernatural'],'reunite'),s=run.session;try{var button=s.root.querySelector('[data-action="NEW_CAMPAIGN"]');
      button.click();button.click();T.equal(s.controller.getState().phase,'ready');T.equal(s.controller.getState().deadHeroIds.length,0);T.truthy(s.root.querySelector('[data-action="BEGIN"]'));
    }finally{s.close();}
  });
  T.test('V2/IT-035 — API QA projeta preparação, prólogo, terminal, Conselho solo e campanha fresca',function(){
    var s=Driver.create();try{T.deepEqual(Object.keys(global.expeditionQA),['setSeed','snapshot','validate']);T.deepEqual(global.expeditionQA.setSeed(42),{ok:true,seed:42});
      Driver.activate(s,{type:'BEGIN'});var prologue=global.expeditionQA.snapshot();T.deepEqual({version:prologue.version,phase:prologue.phase,passage:prologue.reading.passageId,canSkip:prologue.reading.canSkip,ending:prologue.ending},{version:3,phase:'intro',passage:'prologue.01',canSkip:false,ending:null});
      Driver.readAll(s);Driver.selectParty(s,['H1','H2','H3']);Driver.activate(s,{type:'SELECT_DESTINATION',dungeonId:'physical'});var prep=global.expeditionQA.snapshot();
      T.deepEqual({phase:prep.phase,selectedDestination:prep.selectedDestination,draftParty:prep.draftParty,aliveHeroes:prep.aliveHeroes,deadHeroes:prep.deadHeroes},{phase:'formation',selectedDestination:'physical',draftParty:['H1','H2','H3'],aliveHeroes:D.heroOrder.slice(),deadHeroes:[]});
    }finally{s.close();}
    var run=Driver.noDeathCampaign(20260831,['physical','supernatural'],'destroy');s=run.session;try{var ending=global.expeditionQA.snapshot();
      T.deepEqual({phase:ending.phase,ending:ending.ending,witnesses:ending.climaxParty,epilogues:ending.epilogueHeroes,reading:ending.reading,medallion:ending.rewards.medallionComplete},{phase:'campaign_complete',ending:'destroy',witnesses:['H1','H2','H3'],epilogues:['H1','H2','H3'],reading:null,medallion:true});
      Driver.activate(s,{type:'NEW_CAMPAIGN'});var fresh=global.expeditionQA.snapshot();T.deepEqual({phase:fresh.phase,living:fresh.aliveHeroes.length,deaths:fresh.deadHeroes.length,ending:fresh.ending,seen:fresh.seenPassages.length,mapPieces:fresh.mapFragments.found},{phase:'ready',living:8,deaths:0,ending:null,seen:0,mapPieces:0});
    }finally{s.close();}
    s=replayPrefix('final-sixth-solo-council',110);try{Driver.activate(s,{type:'CHOOSE_ENDING',ending:'destroy'});Driver.readAll(s);var solo=global.expeditionQA.snapshot();
      T.deepEqual({ending:solo.ending,witnesses:solo.climaxParty,epilogues:solo.epilogueHeroes,reservesRemain:solo.aliveHeroes.length>0},{ending:'destroy',witnesses:[],epilogues:[],reservesRemain:true});T.truthy(global.expeditionQA.validate().ok);
    }finally{s.close();}
  });
  T.test('V2/IT-036 — setSeed rejeita inválida, campanha iniciada e sessão destruída com mensagens DX',function(){
    var s=Driver.create(),ready=global.expeditionQA.snapshot();
    T.deepEqual(global.expeditionQA.setSeed(-1),{ok:false,error:{code:'invalid_seed',message:'Use um número inteiro entre 0 e 4294967295.'}});T.deepEqual(global.expeditionQA.snapshot(),ready);
    T.deepEqual(global.expeditionQA.setSeed(42),{ok:true,seed:42});Driver.activate(s,{type:'BEGIN'});var started=global.expeditionQA.snapshot();
    T.deepEqual(global.expeditionQA.setSeed(42),{ok:false,error:{code:'campaign_already_started',message:'Defina a semente antes de iniciar a campanha.'}});T.deepEqual(global.expeditionQA.snapshot(),started);s.close();
    T.deepEqual(global.expeditionQA.setSeed(42),{ok:false,error:{code:'campaign_unavailable',message:'A campanha ainda não está disponível.'}});T.equal(global.expeditionQA.snapshot(),null);
  });
  T.test('V2/IT-038 — páginas locais separadas isolam sementes, morte e progresso com storage desabilitado',async function(){
    var results=await Promise.all([
      Driver.fixture('tests/fixtures/isolated-session.html?seed=9&mode=sacrifice&name=isolated-a','isolated-a'),
      Driver.fixture('tests/fixtures/isolated-session.html?seed=10&mode=idle&name=isolated-b','isolated-b')
    ]),a=results[0],b=results[1];
    T.equal(a.snapshot.seed,9);T.equal(b.snapshot.seed,10);T.includes(a.snapshot.deadHeroes,'H1');T.deepEqual(b.snapshot.deadHeroes,[]);
    T.truthy(a.snapshot.sequence>b.snapshot.sequence);T.equal(a.storageAttempts,0);T.equal(b.storageAttempts,0);
  });
  T.test('V2/IT-039 — manifesto estático acusa ausência, duplicata e inesperado isoladamente',function(){
    var manifest=global.ExpeditionCaseManifest,sample=manifest.slice(0,3);T.truthy(T.auditRegistrations(manifest,manifest).ok);
    T.falsy(T.auditRegistrations(sample,sample.slice(1)).ok);T.falsy(T.auditRegistrations(sample,[sample[0],sample[0],sample[1],sample[2]]).ok);
    T.falsy(T.auditRegistrations(sample,sample.concat(['V2/IT-999'])).ok);T.equal(new Set(manifest).size,manifest.length);
  });
  T.test('V2/IT-040 — todos os assets de runtime são locais e decodificam no pacote',async function(){
    var paths=[];D.heroOrder.forEach(function(id){paths.push(D.heroes[id].portraitPath);});Object.keys(D.destinations).forEach(function(id){paths.push(D.destinations[id].previewPath);});
    D.encounterOrder.forEach(function(id){paths.push(D.encounters[id].imagePath);});Object.keys(N.backgrounds).forEach(function(id){if(N.backgrounds[id].path)paths.push(N.backgrounds[id].path);});
    Object.keys(N.speakers).forEach(function(id){paths.push(N.speakers[id].portraitPath);});paths=Array.from(new Set(paths));
    paths.forEach(function(path){T.truthy(/^assets\//.test(path));T.falsy(path.indexOf('..')>=0);});
    await Promise.all(paths.map(function(path){return new Promise(function(resolve,reject){var image=new Image();image.onload=function(){if(image.naturalWidth&&image.naturalHeight)resolve();else reject(new Error('Dimensão vazia: '+path));};image.onerror=function(){reject(new Error('Falha ao decodificar '+path));};image.src=path;});}));
    T.truthy(paths.length>=35);
  });
})(window);
