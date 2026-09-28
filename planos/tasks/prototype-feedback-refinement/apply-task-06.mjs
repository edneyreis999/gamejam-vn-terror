import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {game,command as c,plugin,presentation,branch,button,show,message,editMap,editCommonEvents,plate} from './native-authoring.mjs';
const source=readFileSync('planos/tasks/prototype-feedback-refinement/proposed-consequences.md','utf8');
const consequences=[...source.matchAll(/^### ([AB][1-8]) — .+\r?\n\r?\n([^\r\n]+)/gm)].map(match=>({id:match[1],prose:match[2]}));
assert.equal(consequences.length,16);
const splits=source.split(/\r?\n/).filter(line=>/^\| B[17], approach 2 \|/.test(line)).map(line=>{
  const fields=line.split('|').map(value=>value.trim());return {id:fields[1].slice(0,2),before:fields[2],after:fields[3]};
});
assert.equal(splits.length,2);
const bridge=game+'/js/plugins/Dryland_EventBridge.js';let code=readFileSync(bridge,'utf8');
assert.ok(!code.includes("case 'victimName'"),'Task 06 is not applied');
code=code.replace(' * @option outcomeSuccess',' * @option victimName\n * @option outcomeApproachId\n * @option outcomeSuccess');
code=code.replace("      case 'outcomeSuccess':", "      case 'victimName': return state.pendingOutcome?.victimId ? named(catalog.heroes, state.pendingOutcome.victimId).name : '';\n      case 'outcomeApproachId': return state.pendingOutcome?.approachId || '';\n      case 'outcomeSuccess':");
writeFileSync(bridge,code);
const query=(kind,variable)=>plugin('Dryland_EventBridge','Query',{kind,id:'',variable:String(variable),switch:'0'});
const named=prose=>prose.replaceAll('{nome}','\\V[152]');
for(const split of splits)editMap(split.id==='B1'?15:21,list=>{
  const start=list.findIndex(row=>row.code===357&&row.parameters[1]==='Query'&&row.parameters[3].id===`result.${split.id}-2.failure.01`);
  assert.ok(start>=0);
  const first=list.findIndex((row,index)=>index>start&&row.code===101);
  let end=first+1;while(list[end].code===401)end++;
  list.splice(first,end-first,...message(split.before,'',list[first].indent));
});
plate('Dryland_SacrificeContainer',356,424);
editCommonEvents(events=>{
  consequences.forEach(({id,prose},index)=>{
    const list=events[266+index].list;
    assert.ok(list.some(row=>row.code===357&&row.parameters[3].id===`death.${id}.context`));
    const first=list.findIndex(row=>row.code===101);let end=first+1;while(list[end].code===401)end++;
    const split=splits.find(value=>value.id===id);
    list.splice(first,end-first,query('victimName',152),...(split?[query('outcomeApproachId',159),...branch(`$gameVariables.value(159) === '${id}-2'`,message(named(split.after)))]:[]),...message(named(prose)));
  });
  const original=events[43].list;
  const stage=original.slice(0,original.findIndex(row=>row.code===111));
  for(let slot=0;slot<3;slot++) {
    const base=50+slot,child=10+slot,center=39+slot;
    const controls=button(base,'Dryland_SacrificeContainer','',0,0);
    controls[0]=c(231,[base,'Dryland_SacrificeContainer',0,1,44,45,100,100,255,0]);
    const body=[c(122,[44,44,0,4,`$gameVariables.value(${center}) - 178`]),c(122,[45,45,0,0,160]),...controls,presentation('BindInterfacePicture',{picture:String(base),name:'Sacrifício — candidato'})];
    for(let hero=1;hero<=8;hero++) {
      const asset='Dryland_H'+hero,png=readFileSync(game+'/img/pictures/'+asset+'.png'),width=png.readUInt32BE(16),height=png.readUInt32BE(20);
      const scale=Math.min(308/width,328/height)*100;
      body.push(...branch(`$gameVariables.value(${36+slot}) === 'H${hero}'`,[
        show(child,asset,(356-width*scale/100)/2,16,scale),
        plugin('VisuMZ_4_AttachedPictures','PictureAddPicture',{'PictureID:arraynum':JSON.stringify([child]),'TargetID:num':String(base)}),
        presentation('BindInterfacePicture',{picture:String(child),name:'Sacrifício — retrato'})
      ]));
    }
    stage.push(...branch(`$gameSwitches.value(${35+slot})`,body));
  }
  stage.push(c(0));events[43].list=stage;
  for(const row of events[42].list) if(row.code===357&&row.parameters[1]==='PictureTextChange') {
    const args=row.parameters[3],id=JSON.parse(args['PictureIDs:arraynum'])[0];
    args['center:json']=JSON.stringify('');args['down:json']=JSON.stringify('\\FS[26]Sacrificar\n\\V['+(189+id-50)+']');
  }
  const projection=events[304].list;
  for(let index=projection.length-1;index>=0;index--) {
    const row=projection[index];
    if(row.code===122&&[39,40,41].includes(row.parameters[0])) row.parameters[4]=row.parameters[4].replace('* 340','* 380');
    if(row.code===235&&[10,11,12].includes(row.parameters[0])) projection.splice(index+1,0,{...plugin('VisuMZ_4_AttachedPictures','PictureRemovePicture',{'PictureID:arraynum':JSON.stringify([row.parameters[0]])}),indent:row.indent});
  }
  const preload=events[351].list.find(row=>row.code===357&&row.parameters[1]==='SystemLoadImages').parameters[3];
  preload['pictures:arraystr']=JSON.stringify([...JSON.parse(preload['pictures:arraystr']),'Dryland_SacrificeContainer']);
});
const system=game+'/data/System.json';let systemSource=readFileSync(system,'utf8');const data=JSON.parse(systemSource);
assert.equal(data.variables[159],'Elenco — linha 3');
systemSource=systemSource.replace(JSON.stringify(data.variables[159]),JSON.stringify('Consequência — abordagem escolhida'));
data.variables[159]='Consequência — abordagem escolhida';assert.deepEqual(JSON.parse(systemSource),data);writeFileSync(system,systemSource);
