import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DirectedNativePlayer } from '../../../rpg-maker/qa/native-player.mjs';
import { captureNativeSave } from '../../../rpg-maker/qa/native-save-archive.mjs';

const ref = 'planos/tasks/updated-narrative-copy/verification.md#runtime-scenarios';
const names = ['Gorvak','Elowen','Griznik','Seraphina','Bimbren','Liora','Vaelith','Draska'];
const gdd = JSON.parse(await readFile(new URL('../../../rpg-maker/tests/fixtures/gdd-competencies.json', import.meta.url)));
const source = await readFile(new URL('../../../docs/narrativa/herois/%23%20Falas%20de%20cada%20her%C3%B3i.md', import.meta.url), 'utf8');
const speeches = source.split(/^H\d — .+$/m).slice(1).map(body => [...body.matchAll(/^([^:\n]+): (.+)$/gm)].map(match => ({speaker:match[1],text:match[2]})));
const width = Number(process.env.DRYLAND_COPY_WIDTH || 1280);
const variant = `${width}x${width === 1280 ? 720 : 1080}`;
const mode = process.env.DRYLAND_COPY_MODE || 'complete';
export const sourceFiles = [new URL('../../../rpg-maker/qa/native-player.mjs',import.meta.url),new URL('../../../rpg-maker/qa/native-save-archive.mjs',import.meta.url),new URL('../../../rpg-maker/tests/fixtures/gdd-competencies.json',import.meta.url),new URL('../../../docs/narrativa/herois/%23%20Falas%20de%20cada%20her%C3%B3i.md',import.meta.url)];
export const scenario = {
  id:'updated-copy-playthrough', criteria:[{id:'COPY-RUNTIME',variant,expectedRef:ref}],
  requires:['native-mz','public-input'],storage:{expectedRef:ref},
  browser:{width,height:width===1280?720:1080,dpr:1,locale:'pt-BR',channel:'chrome',query:'',
    reducedMotion:mode==='reduced'?'reduce':'no-preference',launchArgs:['--force-device-scale-factor=1'],timeoutMs:45000,executionTimeoutMs:2400000}
};

export async function execute(context) {
  const seenChoices = new Set(), read = [], reread = new Set(), continued = new Set();
  let serial = 0, forcedParty = null, victim = null;
  async function observe(player, surface) {
    await context.wait(()=>ImageManager.isReady()&&[60,61,62,63,64,65].every(id=>{const p=$gameScreen.picture(id);return !p||(!p._duration&&!p._toneDuration);}));
    const metrics = await context.read('reading-position', () => {
      const c=$gameSystem._dryland.campaign,w=SceneManager._scene._messageWindow,t=w._textState;
      return {passage:c.reading?.passageIds[c.reading.index],speaker:$gameMessage.speakerName(),
        text:$gameMessage.allText(),index:t?.index,length:t?.text.length,x:t?.x,y:t?.y,height:t?.height,
        indicator:(()=>{const b=w._pauseSignSprite.getBounds();return {left:b.x,right:b.x+b.width,top:b.y,bottom:b.y+b.height,visible:w._pauseSignSprite.worldVisible};})(),window:{x:w.x,y:w.y,width:w.width,height:w.height},
        innerWidth:w.innerWidth,innerHeight:w.innerHeight,font:w.contents.fontFace,fontSize:w.contents.fontSize,
        units:$gameSystem._drylandReadUnits,phase:c.phase,pictures:[60,61,62,63,64,65].filter(id=>$gameScreen.picture(id)).map(id=>({id,name:$gameScreen.picture(id).name(),scale:$gameScreen.picture(id).scaleX(),tone:$gameScreen.picture(id).tone()}))};
    });
    read.push(metrics);
    await context.shot(`reading-${++serial}-${metrics.passage?.replaceAll('.','-') || surface.map}`);
    const b=metrics.indicator,w=metrics.window;
    assert.ok(b.visible&&b.left>=w.x&&b.right<=w.x+w.width&&b.top>=w.y&&b.bottom<=w.y+w.height, `Advance indicator clips: ${JSON.stringify(metrics)}`);
    if (/^(result\..*success|encounter\.|death\.)/.test(metrics.passage || '')) assert.equal(metrics.pictures.length,0,'Anonymous narration has no bust');
    console.log('READ',metrics.passage || surface.map,metrics.speaker,metrics.text.slice(0,55));
  }
  const player = new DirectedNativePlayer(context,{onPassage:observe});
  async function chooseMouse(label) {
    const surface=await player.choicesContaining(label),index=surface.labels.indexOf(label);
    const point=await context.read('hover-target',index=>{
      const w=SceneManager._scene._choiceListWindow,raw=$gameMessage.choices()[index];
      const binding=/<Bind Picture: (\d+)>/.exec(raw),canvas=document.querySelector('canvas').getBoundingClientRect();
      const r=binding?SceneManager._scene._spriteset._pictureContainer.children.find(s=>s._pictureId===Number(binding[1])).getBounds():w.itemRect(index);
      const x=binding?r.x:w.x+w.padding+r.x,y=binding?r.y:w.y+w.padding+r.y;
      return {x:canvas.x+(x+r.width/2)*canvas.width/Graphics.width,y:canvas.y+(y+r.height/2)*canvas.height/Graphics.height};
    },index);
    await context.input.pointer.move(point.x,point.y);
    await context.wait(index=>SceneManager._scene._choiceListWindow.index()===index,index);
    await player.choose(label,{mouse:true});
  }
  async function consoleButton(type) {
    const point=await context.read('console-'+type,type=>{
      const button=SceneManager._scene._messageWindow._buttonConsoleButtons.find(b=>b._type===type);
      if(!button?.worldVisible)throw Error('Console button not visible: '+type);
      const b=button.getBounds(),c=document.querySelector('canvas').getBoundingClientRect();
      return {x:c.x+(b.x+b.width/2)*c.width/Graphics.width,y:c.y+(b.y+b.height/2)*c.height/Graphics.height};
    },type);
    await player.click(point.x,point.y);
  }
  async function speak(index,kind) {
    const before=(await player.snapshot('before-'+kind)).campaign;
    await chooseMouse(names[index]);
    await chooseMouse(kind==='presentation'?'Conversar':'Selecionar');
    const expected=kind==='presentation'?speeches[index].slice(0,6):[speeches[index][kind==='selected'?6:7]];
    const heard=[];
    for(let step=0;step<30;step++) {
      const surface=await player.ready();
      if(surface.active&&surface.kind==='hero')break;
      await observe(player,surface);
      const speaker=await context.read('speaker',()=>$gameMessage.speakerName());
      if(heard.at(-1)?.text!==surface.text)heard.push({speaker,text:surface.text});
      if(kind==='presentation')assert.deepEqual((await player.snapshot('conversation-preserves-formation')).campaign,before);
      if(index===0&&kind==='presentation'&&step===0) {
        assert.equal(await context.read('unread-fast',()=>$gameSystem.isExtendedFastForwardDisallowed()),true);
        await player.dialogueControls('direct-opening',[60,63]);
        await consoleButton('options');
        await context.wait(()=>SceneManager._scene.constructor.name==='Scene_Options'&&!SceneManager._scene.isBusy());
        await context.input.key('Escape');
        const restored=await player.ready();assert.equal(restored.text,surface.text);
        assert.deepEqual((await player.snapshot('options-preserves-campaign')).campaign,before);
        await context.shot('opening-after-options');
      }
      await context.input.key('Enter');
    }
    assert.deepEqual(heard,expected,`${names[index]} ${kind}`);
    const after=(await player.snapshot('after-'+kind)).campaign;
    if(kind==='full')assert.deepEqual(after,before);
    if(kind==='selected')assert.deepEqual(after.draftPartyIds,[...before.draftPartyIds,'H'+(index+1)]);
    if(kind==='presentation') {
      const units=await context.read('completed-conversation',()=>$gameSystem._drylandReadUnits);
      assert.ok(units.includes(83+4*index)&&!units.includes(82+4*index));
      if(index===0) {
        await player.choose('Conversar');await player.ready();
        assert.equal(await context.read('completed-fast',()=>$gameSystem.isExtendedFastForwardDisallowed()),false);
        await consoleButton('fastfwd');await player.until('hero');
        assert.equal(await context.read('fast-stops-at-menu',()=>Boolean($gameTemp.isExtendedFastForwardMode())),false);
        assert.deepEqual((await player.snapshot('fast-preserves-campaign')).campaign,before);
      }
    }
    await player.returnToTavern();
  }
  async function party(desired) {
    const current=(await player.snapshot('party-before')).campaign.draftPartyIds;
    for(const id of current.filter(id=>!desired.includes(id))) {
      await player.choose(names[Number(id.slice(1))-1]);await player.choose('Retirar do grupo');
      assert.equal((await player.ready()).active,true,'Removal does not play addition speech');await player.returnToTavern();
    }
    for(const id of desired.filter(id=>!current.includes(id))) {
      await player.choose(names[Number(id.slice(1))-1]);await player.choose('Selecionar');await player.returnToTavern();
    }
  }
  await player.choose(context.descriptor.nativeArchive?'Continuar':'Jogar');await player.file(1);
  if(!context.descriptor.nativeArchive) {
    await player.returnToTavern();
    for(let i=0;i<(mode==='memorial'?0:mode==='reduced'?1:8);i++) {
      await speak(i,'presentation');await speak(i,'selected');
      await player.choose(names[i]);await player.choose('Retirar do grupo');await player.returnToTavern();
    }
    if(mode==='reduced')return;
    for(let i=0;i<(mode==='memorial'?0:8);i++) {
      await party(names.map((_,n)=>'H'+(n+1)).filter(id=>id!=='H'+(i+1)).slice(0,3));
      await speak(i,'full');
    }
  }
  for(let step=0;step<650;step++) {
    const surface=await player.ready();
    const state=(await player.snapshot('navigation-'+step)).campaign;
    if(surface.scrolling)break;
    if(surface.active&&surface.kind==='formation') {
      const alive=names.map((_,i)=>'H'+(i+1)).filter(id=>!state.deadHeroIds.includes(id));
      await party(forcedParty || ['H1','H3','H4','H8','H2','H5','H6','H7'].filter(id=>alive.includes(id)).slice(0,3));
      forcedParty=null;
      const route=['physical','supernatural','final'].find(id=>!state.completedDungeonIds.includes(id));
      await player.choose('Destinos');const destinations=await player.until('destinations');
      const name=await context.read('route-name',id=>$dataCommonEvents[4].list.find(c=>c.code===357&&c.parameters[1]==='ConfigureRoute'&&c.parameters[3].id===id).parameters[3].name,route);
      await player.choose(destinations.labels.find(label=>label.includes(name)));await player.choose('Partir');
    } else if(surface.active&&surface.kind==='approaches') {
      const id=state.assignments[state.dungeonId][state.position-1];
      if(!seenChoices.has(id)) {if(mode!=='wide'||seenChoices.size===0)await context.shot('choices-'+id);seenChoices.add(id);console.log('CHOICES',id,seenChoices.size);}
      if(!reread.has(id[0])) {
        reread.add(id[0]);const before=state;
        await player.choose('Rever descrição');await player.until('approaches');
        assert.deepEqual((await player.snapshot('after-reread')).campaign,before);
      }
      const needsDeath=['A1','A5'].includes(id)&&!Object.values(state.deathLocations).some(d=>d.encounterId===id);
      const viable=gdd.encounterPairs[id].map(c=>state.partyIds.some(h=>gdd.heroPairs[h].includes(c)));
      let choice=viable.indexOf(true);
      if(needsDeath) {
        const target=id==='A1'?1:2;
        if(viable[target]) {
          const exclude=gdd.encounterPairs[id][target];
          forcedParty=['H1','H2','H3','H5','H8','H4','H6','H7'].filter(h=>!state.deadHeroIds.includes(h)&&!gdd.heroPairs[h].includes(exclude)).slice(0,3);
          await player.choose('Recuar');const retreat=await player.until('retreat');await player.choose(retreat.labels[0]);await player.returnToTavern();continue;
        }
        choice=target;victim=state.partyIds.includes('H1')?'H1':state.partyIds[0];
      }
      if(choice<0) {
        forcedParty=names.map((_,i)=>'H'+(i+1)).filter(h=>!state.deadHeroIds.includes(h)).sort((a,b)=>Number(gdd.heroPairs[b].some(c=>gdd.encounterPairs[id].includes(c)))-Number(gdd.heroPairs[a].some(c=>gdd.encounterPairs[id].includes(c)))).slice(0,3);
        await player.choose('Recuar');const retreat=await player.until('retreat');await player.choose(retreat.labels[0]);await player.returnToTavern();continue;
      }
      await chooseMouse(surface.labels[choice]);
    } else if(surface.active&&surface.kind==='sacrifice') {
      const name=names[Number(victim.slice(1))-1];
      await chooseMouse(surface.labels.find(label=>label.includes(name)));
    } else if(surface.active&&surface.kind==='ending') {
      await captureNativeSave(context,'own-council-complete');await player.choose(surface.labels[0]);
    } else {
      assert.ok(surface.paused,JSON.stringify(surface));
      if(mode!=='wide'&&['approach_result','death_result'].includes(state.phase)&&!continued.has(state.phase)) {
        continued.add(state.phase);
        const archive=await captureNativeSave(context,'own-'+state.phase);
        await context.reopenPage();await player.choose('Continuar');await player.file(1);await player.ready();
        const restored=(await player.snapshot('restored-'+state.phase)).campaign;
        assert.deepEqual(restored,archive.campaign,'Continue preserves committed campaign before pending reading');
        continue;
      }
      await observe(player,surface);
      if(state.phase==='memorial')await context.shot('memorial-'+step);
      await context.input.key('Enter');
    }
    assert.ok(step<649,'Campaign did not finish');
  }
  const final=(await player.snapshot('final')).campaign;
  if(mode==='memorial-resume') {
    assert.ok(read.some(row=>row.phase==='memorial'));
  } else if(mode==='wide') {
    assert.ok(seenChoices.size>0&&read.some(row=>row.passage?.startsWith('opinion.'))&&read.some(row=>row.phase==='memorial'));
  } else {
    assert.equal(seenChoices.size,16);assert.deepEqual([...continued].sort(),['approach_result','death_result']);
  }
  assert.ok(['A1','A5'].every(id=>Object.values(final.deathLocations).some(d=>d.encounterId===id)));
  if(mode!=='memorial-resume')assert.ok(read.some(row=>row.passage==='farewell.H1'));
  await captureNativeSave(context,'own-terminal');
  context.report.observations.push({label:'copy-result',kind:'copy-result',value:{choices:[...seenChoices],read,continued:[...continued],final}});
}

export async function verify({expected,artifacts,report}) {
  return {criteria:expected.map(row=>({...row,status:'executed-awaiting-review',evidence:artifacts.map(a=>a.path),observed:report.observations.find(row=>row.kind==='copy-result')?.value,limits:['Agent pixel inspection and human reading-comfort acceptance are separate.']})),pendingReviews:['Inspect dialogue, choice, Council and memorial captures.']};
}
