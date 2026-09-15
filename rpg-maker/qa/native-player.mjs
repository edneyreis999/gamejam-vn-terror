import assert from 'node:assert/strict';
import { setTimeout as delay } from 'node:timers/promises';

export class DirectedNativePlayer {
  constructor(context, { onPassage, onAdvance } = {}) { this.context = context; this.serial = 0; this.bustSerial = 0; this.onPassage = onPassage; this.onAdvance = onAdvance; }

  async assertMapOwner(mapId) {
    const actual = await this.context.read('native-map-owner', () => ({
      map: $gameMap.mapId(), event: $gameMap._interpreter._eventId,
      listMatches: JSON.stringify($gameMap._interpreter._list) === JSON.stringify($dataMap.events[1].pages[0].list),
      child: Boolean($gameMap._interpreter._childInterpreter)
    }));
    assert.deepEqual(actual, {map: mapId, event: 1, listMatches: true, child: false});
  }

  async surface() {
    return this.context.read('native-visible-surface', () => {
      const scene = window.SceneManager?._scene;
      const message = scene?._messageWindow, choices = scene?._choiceListWindow;
      return { text: window.$gameMessage?.allText() || '',
        labels: (choices?._list || []).map(item => choices.convertEscapeCharacters(item.name).replace(/<[^>]*>/g, '').replace(/\x1b[A-Za-z]+\[[^\]]*\]/g,'').replace(/\s+/g, ' ').trim()),
        kind: window.$gameMessage?._drylandChoiceFocus?.key || 'title',
        scrolling: !!scene?._scrollTextWindow?._text,
        active: !!choices?.isOpenAndActive(), index: choices?.index(),
        paused: !!message?.pause, hidden: !!message && message.scale.x === 0,
        map: window.$gameMap?.mapId(), error: window.Graphics?._errorPrinter?.textContent || '' };
    });
  }

  async ready() {
    const surface = await this.context.read('native-visible-surface', async () => {
      const read = () => {
        const scene = window.SceneManager?._scene;
        const message = scene?._messageWindow, choices = scene?._choiceListWindow;
        const error = window.Graphics?._errorPrinter?.textContent || '';
        const auto = Boolean(window.$gameTemp?.isMessageAutoForwardMode?.());
        const fast = Boolean(window.$gameTemp?.isExtendedFastForwardMode?.());
        const rawAutoForwardCount = message?._autoForwardCount;
        const autoForwardCount = Number.isFinite(rawAutoForwardCount) ? rawAutoForwardCount : null;
        const visible = Boolean(message && message.scale.x !== 0 && !scene.isBusy() &&
          (scene._scrollTextWindow?._text || (message.pause && message._waitCount === 0) || choices?.isOpenAndActive()));
        return { error, auto, fast, visible,
          autoForwardCount,
          value: { text: window.$gameMessage?.allText() || '',
            labels: (choices?._list || []).map(item => choices.convertEscapeCharacters(item.name).replace(/<[^>]*>/g, '').replace(/\x1b[A-Za-z]+\[[^\]]*\]/g,'').replace(/\s+/g, ' ').trim()),
            kind: window.$gameMessage?._drylandChoiceFocus?.key || 'title',
            scrolling: !!scene?._scrollTextWindow?._text,
            active: !!choices?.isOpenAndActive(), index: choices?.index(),
            paused: !!message?.pause, hidden: !!message && message.scale.x === 0,
            map: window.$gameMap?.mapId(), error } };
      };
      const stallWindow = 30000;
      let deadline = performance.now() + stallWindow;
      let currentText;
      let lowestFiniteAutoForwardCount = null;
      for (;;) {
        const current = read();
        const now = performance.now();
        const finiteAutoForwardCount = current.autoForwardCount !== null && current.autoForwardCount >= 0
          ? current.autoForwardCount : null;
        if (current.value.text !== currentText) {
          currentText = current.value.text;
          lowestFiniteAutoForwardCount = finiteAutoForwardCount;
          deadline = now + stallWindow;
        } else if (current.auto && finiteAutoForwardCount !== null) {
          if (lowestFiniteAutoForwardCount === null) {
            lowestFiniteAutoForwardCount = finiteAutoForwardCount;
          } else if (finiteAutoForwardCount < lowestFiniteAutoForwardCount) {
            lowestFiniteAutoForwardCount = finiteAutoForwardCount;
            deadline = now + stallWindow;
          }
        }
        if (current.error || (current.visible && !current.auto && !current.fast)) return current.value;
        if (now >= deadline) {
          throw Error(`Native surface did not settle before the ready deadline: ${JSON.stringify({
            error: current.error, auto: current.auto, fast: current.fast, visible: current.visible,
            text: current.value.text, kind: current.value.kind, map: current.value.map,
            frame: window.Graphics?.frameCount, autoForwardCount: current.autoForwardCount,
            lowestAutoForwardCount: lowestFiniteAutoForwardCount
          })}`);
        }
        await new Promise(resolve => requestAnimationFrame(resolve));
      }
    });
    assert.equal(surface.error, '');
    return surface;
  }

  async choicesContaining(label) {
    for (let count = 0; count < 100; count++) {
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
    const prior = await this.context.read('choice-before-input',()=>JSON.stringify($gameMessage.choices().map(label=>SceneManager._scene._choiceListWindow.convertEscapeCharacters(label))));
    const index = surface.labels.indexOf(label);
    assert.equal(await this.context.read('choice-eligibility',i=>SceneManager._scene._choiceListWindow._list[i].enabled,index),true,'Choice must be eligible: '+label);
    if (mouse) {
      const point = await this.context.read('visible-choice-geometry', target => {
        const item = SceneManager._scene._choiceListWindow._list.find(item => SceneManager._scene._choiceListWindow.convertEscapeCharacters(item.name).replace(/<[^>]*>/g,'').replace(/\x1b[A-Za-z]+\[[^\]]*\]/g,'').replace(/\s+/g,' ').trim() === target);
        const raw = item.name;
        const binding = /<Bind Picture: (\d+)>/.exec($gameMessage.choices()[item.ext]);
        const scene = SceneManager._scene;
        const canvas = document.querySelector('canvas').getBoundingClientRect();
        let bounds;
        if (binding) bounds = scene._spriteset._pictureContainer.children.find(sprite => sprite._pictureId === Number(binding[1])).getBounds();
        else {
          const window = scene._choiceListWindow;
          const rect = window.itemRect(window._list.findIndex(item=>item.name===raw));
          bounds = { x: window.x + window.padding + rect.x, y: window.y + window.padding + rect.y, width: rect.width, height: rect.height };
        }
        return { x: canvas.x + (bounds.x + bounds.width / 2) * canvas.width / Graphics.width,
          y: canvas.y + (bounds.y + bounds.height / 2) * canvas.height / Graphics.height };
      }, label);
      await this.context.shot(`mouse-target-${++this.serial}`);
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
    await this.context.wait(previous=>!SceneManager._scene._choiceListWindow?.isOpenAndActive()||JSON.stringify($gameMessage.choices().map(label=>SceneManager._scene._choiceListWindow.convertEscapeCharacters(label)))!==previous,prior);
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

  async file(fileId) {
    await this.context.wait(()=>SceneManager._scene instanceof Scene_File && SceneManager._scene._listWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy());
    for(let step=0;step<20;step++){
      const current=await this.context.read('selected-native-file',()=>{const w=SceneManager._scene._listWindow;return w.indexToSavefileId(w.index());});
      if(current===fileId)break;
      await this.context.input.key(current<fileId?'ArrowRight':'ArrowLeft');
    }
    assert.equal(await this.context.read('confirmed-native-file',()=>{const w=SceneManager._scene._listWindow;return w.indexToSavefileId(w.index());}),fileId);
    await this.context.shot(`file-${++this.serial}`);await this.context.input.key('Enter');
  }

  async returnToTavern() {
    const surface = await this.ready();
    if ([37, 38, 39, 40, 41, 42, 43, 44].includes(surface.map)) {
      await this.until('hero');
      await this.choose('Voltar à taverna');
    }
    const tavern = await this.until('formation');
    assert.equal(tavern.map, 3);
    return tavern;
  }

  async until(kind) {
    for(let step=0;step<100;step++){
      const surface=await this.ready();
      if((kind==='credits'&&surface.scrolling)||(surface.active&&surface.kind===kind))return surface;
      assert.ok(surface.paused,`Expected ${kind}: ${JSON.stringify(surface)}`);
      if(this.onPassage)await this.onPassage(this,surface);
      await this.context.shot(`passage-${++this.serial}`);await this.context.input.key('Enter');
      if(this.onAdvance)await this.onAdvance(this,surface);
    }
    throw Error('Too many passages before '+kind);
  }

  async snapshot(label) {
    return this.context.read(label, () => ({ campaign:$gameSystem._dryland.campaign, fileId:$gameSystem.savefileId(), readUnits:$gameSystem._drylandReadUnits, persistence:$gameTemp._drylandPersistence }));
  }

  async click(x, y) {
    await this.context.input.pointer.move(x, y);
    await this.context.input.pointer.down();
    try { await delay(70); } finally { await this.context.input.pointer.up(); }
  }
}
