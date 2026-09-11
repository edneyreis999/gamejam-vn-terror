import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';

export class DirectedNativePlayer {
  constructor(context, { onPassage, onAdvance } = {}) { this.context = context; this.serial = 0; this.bustSerial = 0; this.onPassage = onPassage; this.onAdvance = onAdvance; }

  async surface() {
    return this.context.read('native-visible-surface', () => {
      const scene = window.SceneManager?._scene;
      const message = scene?._messageWindow, choices = scene?._choiceListWindow;
      return { text: window.$gameMessage?.allText() || '',
        labels: (window.$gameMessage?.choices() || []).map(label => label.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()),
        active: !!choices?.isOpenAndActive(), index: choices?.index(),
        paused: !!message?.pause, hidden: !!message && message.scale.x === 0,
        map: window.$gameMap?.mapId(), error: window.Graphics?._errorPrinter?.textContent || '' };
    });
  }

  async ready() {
    await this.context.wait(() => {
      const scene = window.SceneManager?._scene;
      const message = scene?._messageWindow, choices = scene?._choiceListWindow;
      return window.Graphics?._errorPrinter?.textContent || (message && message.scale.x !== 0 &&
        !scene.isBusy() && ((message.pause && message._waitCount === 0) || choices?.isOpenAndActive()));
    });
    const surface = await this.surface();
    assert.equal(surface.error, '');
    return surface;
  }

  async choicesContaining(label) {
    for (let count = 0; count < 100; count++) {
      await this.context.wait(target => {
        const scene = window.SceneManager?._scene;
        const message = scene?._messageWindow, choices = scene?._choiceListWindow;
        const labels = (window.$gameMessage?.choices() || []).map(value => value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim());
        return window.Graphics?._errorPrinter?.textContent || (message && !scene.isBusy() &&
          message.scale.x !== 0 && ((choices?.isOpenAndActive() && labels.includes(target)) ||
            (message.pause && message._waitCount === 0)));
      }, label);
      const surface = await this.ready();
      if (surface.active && surface.labels.includes(label)) return surface;
      assert.ok(surface.paused, `Expected visible ${label}; found ${JSON.stringify(surface)}`);
      if (this.onPassage) await this.onPassage(this, surface);
      await this.context.shot(`passage-${++this.serial}`);
      await this.context.input.key('Enter');
      if (this.onAdvance) await this.onAdvance(this, surface);
    }
    throw new Error(`Too many passages before ${label}`);
  }

  async choose(label, { mouse = false } = {}) {
    const surface = await this.choicesContaining(label);
    assert.equal(surface.labels.filter(value => value === label).length, 1, `Ambiguous visible label: ${label}`);
    const index = surface.labels.indexOf(label);
    if (mouse) {
      const point = await this.context.read('visible-choice-geometry', target => {
        const raw = $gameMessage.choices().find(value => value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim() === target);
        const binding = /<Bind Picture: (\d+)>/.exec(raw);
        const scene = SceneManager._scene;
        const canvas = document.querySelector('canvas').getBoundingClientRect();
        let bounds;
        if (binding) bounds = scene._spriteset._pictureContainer.children.find(sprite => sprite._pictureId === Number(binding[1])).getBounds();
        else {
          const window = scene._choiceListWindow;
          const rect = window.itemRect($gameMessage.choices().indexOf(raw));
          bounds = { x: window.x + window.padding + rect.x, y: window.y + window.padding + rect.y, width: rect.width, height: rect.height };
        }
        return { x: canvas.x + (bounds.x + bounds.width / 2) * canvas.width / Graphics.width,
          y: canvas.y + (bounds.y + bounds.height / 2) * canvas.height / Graphics.height };
      }, label);
      await this.click(point.x, point.y);
    } else {
      for (let step = 0; step < surface.labels.length; step++) {
        const current = await this.surface();
        if (current.index === index) break;
        await this.context.input.key(current.index < index ? 'ArrowDown' : 'ArrowUp');
      }
      assert.equal((await this.surface()).index, index);
      await this.context.shot(`focus-${++this.serial}`);
      await this.context.input.key('Enter');
    }
  }

  async dialogueControls(label, expectedSlots) {
    const context=this.context;
    await context.wait(()=>[60,61,62,63,64,65].every(id=>{const p=$gameScreen.picture(id);return !p||p.tone().every(v=>v===0||v===-24);}));
    const composition=()=>context.read(`${label}-composition`,()=>({text:$gameMessage.allText(),speaker:$gameMessage.speakerName(),
      pictures:[60,61,62,63,64,65].map(id=>{const p=$gameScreen.picture(id);return p?{id,name:p.name(),x:p.x(),y:p.y(),scale:p.scaleX(),tone:p.tone()}:null;})}));
    const before=await composition(),campaign=await this.snapshot(`${label}-campaign`);
    assert.deepEqual(before.pictures.filter(Boolean).map(p=>p.id),expectedSlots);
    for(const restore of ['keyboard','mouse']){
      await context.input.key('Tab');await context.wait(()=>SceneManager._scene._messageWindow.scale.x===0);
      assert.deepEqual(await context.read(`${label}-hidden-art`,()=>SceneManager._scene._spriteset._pictureContainer.children.filter(s=>s._pictureId>=60&&s._pictureId<=65&&s.picture()).map(s=>({id:s._pictureId,visible:s.worldVisible}))),expectedSlots.map(id=>({id,visible:true})));
      await context.shot(`${label}-${restore}-hidden`);
      if(restore==='keyboard')await context.input.key('Tab');
      else {const point=await context.read(`${label}-restore-point`,()=>{const r=document.querySelector('canvas').getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/3};});await this.click(point.x,point.y);}
      await context.wait(()=>SceneManager._scene._messageWindow.scale.x===1);
      assert.deepEqual(await composition(),before,'Restoring input must preserve text and settled focus.');
      assert.deepEqual(await this.snapshot(`${label}-restored-campaign`),campaign);
      await context.shot(`${label}-${restore}-restored`);
    }
  }

  async snapshot(label) {
    return this.context.read(label, () => ({ snapshot: expeditionQA.snapshot(), validation: expeditionQA.validate() }));
  }

  async click(x, y) {
    await this.context.input.pointer.move(x, y);
    await this.context.input.pointer.down();
    try { await delay(70); } finally { await this.context.input.pointer.up(); }
  }
}

// E2E uses real input. Page evaluation only observes QA and the native UI;
// no interpreter, campaign, switch, variable or save is manufactured here.
export class NativePlayer {
  constructor(browser, directory) { this.browser=browser;this.directory=directory;this.log=[];this.captures=new Set();this.serial=0; }
  async observe() {
    const value=await this.browser.evaluate(`(() => {
      const scene=window.SceneManager?._scene,m=scene?._messageWindow,c=scene?._choiceListWindow;
      const entries=window.$gameMessage?._drylandChoices?.entries;
      return {qa:window.expeditionQA?.snapshot(),validation:window.expeditionQA?.validate(),
        scene:scene?.constructor.name,map:window.$gameMap?.mapId(),frame:window.Graphics?.frameCount,
        text:window.$gameMessage?.allText()||'',pause:!!m?.pause,wait:m?._waitCount||0,
        active:!!c?.isOpenAndActive(),busy:!m||!!scene?.isBusy(),kind:window.$gameMessage?._drylandChoices?.kind||'title',
        entries:entries||window.$gameMessage?.choices().map(label=>({label,enabled:true}))||[],index:c?.index(),
        hidden:!!(m&&m.scale.x===0),error:window.Graphics?._errorPrinter?.textContent||'',
        viewport:{width:innerWidth,height:innerHeight,ratio:devicePixelRatio,reduced:matchMedia('(prefers-reduced-motion: reduce)').matches},
        canvas:document.querySelector('canvas')?.getBoundingClientRect().toJSON()};
    })()`);
    if(value.error)throw new Error(value.error);
    if(value.qa?.phase&&value.qa.phase!=='ready')assert.equal(value.validation?.ok,true,JSON.stringify(value.validation));
    return value;
  }
  async record(surface,label='observe',capture=false) {
    const q=surface.qa;
    this.log.push({at:new Date().toISOString(),label,frame:surface.frame,map:surface.map,text:surface.text,
      kind:surface.kind,entries:surface.entries,index:surface.index,viewport:surface.viewport,
      state:q&&{phase:q.phase,sequence:q.sequence,seed:q.seed,rngState:q.rngState,dungeon:q.dungeon,position:q.position,
        draftParty:q.draftParty,party:q.party,deadHeroes:q.deadHeroes,mapFragments:q.mapFragments,
        reading:q.reading,ending:q.ending,climaxParty:q.climaxParty,presentedDeaths:q.presentedDeaths,persistence:q.persistence}});
    if(capture){await this.browser.screenshot(`${this.directory}/${String(++this.serial).padStart(3,'0')}-${label.replace(/[^\w.-]/g,'_')}.png`);}
    await this.flush();
  }
  async flush(){await mkdir(this.directory,{recursive:true});await writeFile(`${this.directory}/transcript.json`,JSON.stringify({browser:this.browser.version,observations:this.log},null,2)+'\n');}
  async ready() {
    const deadline=Date.now()+30000;
    let last;
    while(Date.now()<deadline){
      last=await this.observe();
      if(!last.busy&&!last.hidden){
        if(last.active&&(!last.text||['retreat','title'].includes(last.kind)))return last;
        if(last.text&&last.pause&&last.wait===0)return last;
      }
      await delay(60);
    }
    throw new Error('Native player surface timed out: '+JSON.stringify(last));
  }
  async readUntil(kind) {
    for(let step=0;step<100;step++){
      const s=await this.ready();
      if(s.active&&s.kind===kind&&(!s.text||['retreat','title'].includes(s.kind)))return s;
      if(s.active&&(!s.text||['retreat','title'].includes(s.kind)))throw new Error(`Expected ${kind}, reached ${s.kind}: ${JSON.stringify(s.entries)}`);
      const identity=s.qa?.reading?.sceneId||`${s.map}-${s.kind}`;
      const capture=!this.captures.has(identity);this.captures.add(identity);
      await this.record(s,'passage-'+(s.qa?.reading?.passageId||identity),capture);
      await this.browser.press('Enter',13);
    }
    throw new Error(`Too many passages before ${kind}`);
  }
  async choose(kind,predicate,{mouse=false,label='choice'}={}) {
    const s=await this.readUntil(kind);
    const index=typeof predicate==='number'?predicate:s.entries.findIndex(predicate);
    assert.ok(index>=0&&index<s.entries.length,`${kind}: missing requested choice in ${JSON.stringify(s.entries)}`);
    assert.notEqual(s.entries[index].enabled,false,`${kind}: requested disabled ${s.entries[index].label}`);
    if(mouse){
      const match=/<Bind Picture: (\d+)>/.exec(s.entries[index].label);
      assert.ok(match,'Mouse choice needs its actual native picture target.');
      const p=await this.browser.evaluate(`(()=>{const b=SceneManager._scene._spriteset._pictureContainer.children.find(s=>s._pictureId===${Number(match[1])}).getBounds();const c=document.querySelector('canvas').getBoundingClientRect();return{x:c.x+(b.x+b.width/2)*c.width/Graphics.width,y:c.y+(b.y+b.height/2)*c.height/Graphics.height}})()`);
      await this.record(s,label+':'+s.entries[index].label,true);await this.click(p.x,p.y);
    }else{
      for(let step=0;step<20;step++){
        const current=await this.browser.evaluate('SceneManager._scene._choiceListWindow.index()');
        if(current===index)break;
        await this.browser.press(current<index?'ArrowDown':'ArrowUp',current<index?40:38);
      }
      assert.equal(await this.browser.evaluate('SceneManager._scene._choiceListWindow.index()'),index);
      await this.record({...s,index},label+':'+s.entries[index].label,true);await this.browser.press('Enter',13);
    }
  }
  async click(x,y){
    await this.browser.call('Input.dispatchMouseEvent',{type:'mousePressed',x,y,button:'left',buttons:1,clickCount:1});
    await delay(40);
    await this.browser.call('Input.dispatchMouseEvent',{type:'mouseReleased',x,y,button:'left',buttons:0,clickCount:1});
    await delay(80);
  }
  async begin(seed){
    await this.readUntil('title');
    assert.deepEqual(await this.browser.evaluate(`expeditionQA.setSeed(${seed})`),{ok:true,seed});
    await this.choose('title',e=>e.label==='Jogar');
    return this.readUntil('formation');
  }
  async action(action){
    switch(action.type){
      case 'TOGGLE_HERO':
        await this.choose('formation',e=>e.heroId===action.heroId);
        await this.choose('hero',e=>/^(Selecionar|Retirar do grupo)$/.test(e.label));break;
      case 'SELECT_DESTINATION':
        await this.choose('formation',e=>e.label.startsWith('Destinos'));
        await this.choose('destinations',e=>e.dungeonId===action.dungeonId);break;
      case 'DEPART':await this.choose('formation',e=>e.label.startsWith('Partir'));break;
      case 'CHOOSE_APPROACH':await this.choose('approaches',e=>e.value===action.approachId);break;
      case 'SELECT_VICTIM':await this.choose('sacrifice',e=>e.heroId===action.heroId);break;
      case 'REQUEST_RETREAT':await this.choose('approaches',e=>e.value==='retreat');break;
      case 'CONFIRM_RETREAT':await this.choose('retreat',0);break;
      case 'CANCEL_RETREAT':await this.choose('retreat',1);break;
      case 'CHOOSE_ENDING':await this.choose('ending',action.ending==='reunite'?0:1);break;
      default:throw new Error('Unsupported player decision '+action.type);
    }
  }
  async recipe(recipe,{beforeAction,afterAction}={}){
    await this.begin(recipe.seed);
    for(const action of recipe.actions){
      if(['BEGIN','ADVANCE_TEXT','ENTER_DUNGEON'].includes(action.type))continue;
      if(beforeAction)await beforeAction(action,this);
      await this.action(action);
      if(afterAction)await afterAction(action,this);
    }
  }
  async route(route){
    let s=await this.readUntil('formation');
    for(const heroId of ['H1','H2','H3']){
      if(!s.qa.draftParty.includes(heroId))await this.action({type:'TOGGLE_HERO',heroId});
      s=await this.readUntil('formation');
    }
    await this.action({type:'SELECT_DESTINATION',dungeonId:route});
    await this.action({type:'DEPART'});
    for(let position=1;position<=(route==='final'?6:5);position++){
      s=await this.readUntil('approaches');assert.equal(s.qa.position,position);assert.equal(s.qa.dungeon,route);
      const viable=s.qa.currentEncounter.approaches.find(a=>a.viable);
      assert.ok(viable,'Living competencies must support this successful recipe.');
      await this.action({type:'CHOOSE_APPROACH',approachId:viable.id});
    }
  }
  async resume(){
    const before=await this.observe();
    await this.browser.waitFor("expeditionQA.snapshot().persistence?.status==='saved'");
    await this.record(before,'before-tab-close',true);
    await this.browser.reopen();
    await this.choose('title',e=>e.label==='Continuar');
    const after=await this.ready();
    await this.record(after,'after-tab-reopen-continue',true);
    return after;
  }
  async closing(mode='keyboard'){
    const s=await this.readUntil('credits');
    assert.equal(s.qa.phase,'campaign_complete');
    await writeFile(`${this.directory}/terminal-qa.json`,JSON.stringify(s.qa,null,2)+'\n');
    if(mode==='automatic')await this.browser.waitFor("$gameMap.mapId()===1&&$gameMessage.choices().includes('Continuar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()");
    else await this.choose('credits',0,{mouse:mode==='mouse',label:'credits-'+mode});
    const title=await this.readUntil('title');assert.ok(title.entries.some(e=>e.label==='Continuar'));
    await this.record(title,'terminal-title',true);
    return s.qa;
  }
}
