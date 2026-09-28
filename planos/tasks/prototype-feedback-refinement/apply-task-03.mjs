import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { game, command as c, plugin, presentation, editMap, editCommonEvents, message, show, text, plate, button, erase } from './native-authoring.mjs';

const source=readFileSync('docs/narrativa/herois/Falas-de-cada-herói.md','utf8');
const baseline=JSON.parse(readFileSync(game+'/data/CommonEvents.json','utf8'));
assert.ok(!baseline[38].list.some(item=>item.code===231&&item.parameters[1]==='Dryland_HeroContainer'),'Task 03 is already applied; inspect the current tree before replay');
const heroes=[...source.matchAll(/^H([1-8]) — (.+)\r?\n([\s\S]*?)(?=^H[1-8] — |$(?![\s\S]))/gm)].map(match=>{
  const categories={};let key;
  for(const line of match[3].split(/\r?\n/).map(line=>line.trim())) {
    if(['Apresentação','Ao ser selecionado','Ao ser selecionada','Se o grupo estiver cheio','Despedida','Opinião'].includes(line)) {key=line.startsWith('Ao ser')?'Seleção':line;categories[key]=[];}
    else if(line.includes(': ') && key){const split=line.indexOf(': ');categories[key].push({speaker:line.slice(0,split),prose:line.slice(split+2)});}
  }
  assert.equal(categories.Apresentação.length,6);
  assert.equal(categories.Opinião.length,2);
  return {id:'H'+match[1],name:match[2].trim(),categories};
});
assert.equal(heroes.length,8);
const is=(item,name)=>item.code===357&&item.parameters[1]===name;

function rewriteMessages(list,start,end,dialogue) {
  const starts=[];
  for(let index=start;index<end;index++)if(list[index].code===101)starts.push(index);
  assert.ok(starts.length);
  const segments=starts.map((index,number)=>{
    let after=index+1;while(list[after]?.code===401)after++;
    let previous=start;
    if(number){previous=starts[number-1]+1;while(list[previous]?.code===401)previous++;}
    return {prefix:list.slice(previous,index),after,indent:list[index].indent};
  });
  const output=dialogue.flatMap((line,index)=>{
    const template=segments[Math.min(index,segments.length-1)];
    return [...structuredClone(template.prefix),...message(line.prose,line.speaker,template.indent)];
  });
  output.push(...list.slice(segments.at(-1).after,end));
  list.splice(start,end-start,...output);
}
function observation(list,unit,dialogue) {
  const start=list.findIndex(item=>is(item,'ObservationBegin')&&Number(item.parameters[3].unit)===unit);
  const end=list.findIndex((item,index)=>index>start&&is(item,'ObservationComplete'));
  assert.ok(start>=0&&end>start);
  rewriteMessages(list,start+1,end,dialogue);
}
plate('Dryland_HeroContainer',168,208);
plate('Dryland_NarrativeChoice',480,56);

function styleChoices(list) {
  for(let index=list.length-1;index>=0;index--) {
    const item=list[index];
    if(item.code!==102 || item.parameters[0].some(label=>label.includes('<Bind Picture:')))continue;
    const labels=item.parameters[0],ids=labels.map((_,i)=>50+i),indent=item.indent;
    assert.ok(labels.length<=3);
    const atIndent=rows=>rows.map(row=>({...row,indent:row.indent+indent}));
    let end=index+1;
    while(!(list[end].code===404&&list[end].indent===indent))end++;
    for(let cursor=end-1;cursor>index;cursor--)if([402,403].includes(list[cursor].code)&&list[cursor].indent===indent){
      list.splice(cursor+1,0,...erase(ids).map(row=>({...row,indent:indent+1})));
    }
    item.parameters[0]=labels.map((label,i)=>label+`<Bind Picture: ${ids[i]}><Hide Choice Window>`);
    const controls=labels.flatMap((label,i)=>button(ids[i],'Dryland_NarrativeChoice',label.replace(/<[^>]*>/g,''),704,208+i*72));
    let insert=index;
    while(insert>0&&list[insert-1].code===401)insert--;
    if(insert>0&&list[insert-1].code===101)insert--;
    list.splice(insert,0,...atIndent([...controls,presentation('ConsumeInput')]));
  }
}

for(const [index,hero] of heroes.entries())editMap(37+index,list=>{
  observation(list,83+index*4,hero.categories.Apresentação);
  observation(list,84+index*4,hero.categories.Seleção);
  observation(list,85+index*4,hero.categories['Se o grupo estiver cheio']);
  const accepted=list.findIndex(item=>is(item,'ObservationBegin')&&Number(item.parameters[3].unit)===84+index*4);
  const completed=list.findIndex((item,i)=>i>accepted&&is(item,'ObservationComplete'));
  if(list[completed+1]?.code!==119)list.splice(completed+1,0,c(119,['return'],list[completed].indent));
  styleChoices(list);
});
editMap(23,list=>{
  for(const hero of heroes){
    const start=list.findIndex(item=>is(item,'Query')&&item.parameters[3].id==='opinion.'+hero.id);
    const end=list.findIndex((item,index)=>index>start&&is(item,'ReadingComplete'));
    assert.ok(start>=0&&end>start);
    // Preserve the single opinion speaker's staging before its first box.
    const first=list.findIndex((item,index)=>index>start&&item.code===101);
    rewriteMessages(list,first,end,hero.categories.Opinião);
  }
  // The final panels have their separate owner in task 09.
});
for(let id=7;id<=22;id++)editMap(id,styleChoices);

const positions=[[344,496],[840,196],[744,504],[1000,480],[552,324],[360,184],[1040,212],[152,296]];
editCommonEvents(events=>{
  heroes.forEach((hero,index)=>{
    const list=events[282+index].list,first=list.findIndex(item=>item.code===101);
    let end=first+1;while(list[end].code===401)end++;
    list.splice(first,end-first,...hero.categories.Despedida.flatMap(line=>message(line.prose,line.speaker)));
  });
  const list=events[38].list;
  for(let index=list.length-1;index>=0;index--) {
    const item=list[index],id=item.parameters[0];
    if(item.code===231 && id>=10 && id<=17) {
      const heroIndex=id-10,[x,y]=positions[heroIndex],asset='Dryland_Tavern_H'+(heroIndex+1);
      const png=readFileSync(game+'/img/pictures/'+asset+'.png'),width=png.readUInt32BE(16),height=png.readUInt32BE(20);
      const scale=Math.min(148/width,156/height)*100;
      const rows=[show(id,'Dryland_HeroContainer',x-84,y-104),show(20+heroIndex,asset,(168-width*scale/100)/2,8,scale),
        plugin('VisuMZ_4_AttachedPictures','PictureAddPicture',{'PictureID:arraynum':JSON.stringify([20+heroIndex]),'TargetID:num':String(id)})];
      list.splice(index,1,...rows.map(row=>({...row,indent:item.indent})));
    }
    if(item.code===231 && id>=30 && id<=37)list.splice(index,1);
    if(is(item,'PictureTextChange')) {
      const args=item.parameters[3],ids=JSON.parse(args['PictureIDs:arraynum']);
      if(ids.length===1&&ids[0]>=30&&ids[0]<=37){
        args['PictureIDs:arraynum']=JSON.stringify([ids[0]-20]);
        args['down:json']=args['center:json'].replace('FS[18]','FS[26]');args['center:json']=JSON.stringify('');
      }
    }
  }
  // Every exit that erases a base also releases its owned portrait attachment.
  for(const event of [events[3],events[45],events[349]]) {
    for(let index=event.list.length-1;index>=0;index--){
      const item=event.list[index];
      if(item.code===235&&item.parameters[0]>=10&&item.parameters[0]<=17){
        const child=item.parameters[0]+10;
        event.list.splice(index+1,0,c(235,[child],item.indent),{...plugin('VisuMZ_4_AttachedPictures','PictureRemovePicture',{'PictureID:arraynum':JSON.stringify([child])}),indent:item.indent});
      }
    }
  }
  for(const id of [46])styleChoices(events[id].list);
  const preload=events[351].list.find(item=>is(item,'SystemLoadImages')).parameters[3];
  const images=JSON.parse(preload['pictures:arraystr']);
  for(const name of ['Dryland_HeroContainer','Dryland_NarrativeChoice'])if(!images.includes(name))images.push(name);
  preload['pictures:arraystr']=JSON.stringify(images);
});
