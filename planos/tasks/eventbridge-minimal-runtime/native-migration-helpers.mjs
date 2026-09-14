import fs from 'node:fs';
export const root='rpg-maker/The Dryland Drowned/';
export const read=name=>JSON.parse(fs.readFileSync(root+'data/'+name,'utf8'));
export const c=(code,parameters=[],indent=0)=>({code,indent,parameters});
export const pc=(plugin,name,args={})=>c(357,[plugin,name,name,args]);
export const bridge=(name,args={})=>pc('Dryland_EventBridge',name,args);
export const presentation=(name,args={})=>pc('Dryland_Presentation',name,args);
export const call=id=>c(117,[id]);
export const set=(id,value)=>c(122,[id,id,0,4,JSON.stringify(value)]);
export const query=(kind,variable,id='',index=0,switchId=0,identityVariable=0)=>bridge('Query',{kind,id,index:String(index),variable:String(variable),switch:String(switchId),identityVariable:String(identityVariable)});
export const nest=(list,indent=1)=>list.map(cmd=>({...structuredClone(cmd),indent:cmd.indent+indent}));
export const branch=(condition,yes,no)=>[c(111,[12,condition]),...nest(yes),...(no?[c(411),...nest(no)]:[]),c(412)];
export const erase=(from,to=from)=>Array.from({length:to-from+1},(_,i)=>c(235,[from+i]));
export const show=(id,file,x,y,sx=100,sy=sx,opacity=255,origin=1)=>c(231,[id,file,origin,0,x,y,sx,sy,opacity,0]);
export const text=(id,value,anchor='center')=>pc('VisuMZ_1_MessageCore','PictureTextChange',{
 'PictureIDs:arraynum':JSON.stringify([id]),'Padding:eval':'8',...Object.fromEntries(['upperleft','up','upperright','left','center','right','lowerleft','down','lowerright'].map(a=>[a+':json',JSON.stringify(a===anchor?value:'')]))
});
export const focus=id=>{
 const tone=brightness=>JSON.stringify({'Duration:num':'0','easingType:str':'Linear','TargetX:str':'Unchanged','TargetY:str':'Unchanged','TargetScaleX:str':'Unchanged','TargetScaleY:str':'Unchanged','TargetOpacity:str':'Unchanged','BlendMode:num':'-1','TargetToneRed:str':String(brightness),'TargetToneGreen:str':String(brightness),'TargetToneBlue:str':String(brightness),'TargetToneGray:str':'0'});
 return pc('VisuMZ_2_PictureChoices','ChangePictureChoiceSettingsOne',{'PictureIDs:arraynum':JSON.stringify([id]),'OnSelectSettings:struct':tone(65),'OnDeselectSettings:struct':tone(0)});
};
export function append(events,name,list){const id=events.length;events.push({id,name,trigger:0,switchId:1,list:[...list,c(0)]});return id;}
export function choices(items,{cancel=false}={}){
 const result=[];
 for(let start=0;start<items.length;start+=6){
  const group=items.slice(start,start+6);
  result.push(c(102,[group.map(item=>item.label),cancel?-2:-1,start===0?0:-1,2,0]));
  for(const [index,item] of group.entries())result.push(c(402,[index,item.label]),...nest(item.commands),c(0,[],1));
  if(cancel)result.push(c(403),c(0,[],1));
  result.push(c(404));
 }
 return result;
}
export const group=(key,remember=false)=>presentation('ChoiceFocus',{key,horizontal:'true',remember:String(remember)});
export function sections(event){
 const result={};let id;
 for(const command of event.list){
  if([108,408].includes(command.code)){
   for(const line of String(command.parameters[0]).split('\n')){
    if(line.startsWith('@dryland-section ')){id=line.slice(17);result[id]=[];}
    if(line==='@dryland-end')id=null;
   }
  }else if(id && command.code!==657)result[id].push(structuredClone(command));
 }
 return result;
}
export function reduced(list){
 const output=[];
 for(const command of list){
  if(command.code===657)continue;
  const duration=command.code===357 && command.parameters[3]['Duration:eval'];
  if(duration && Number(duration)>0){
   const immediate=structuredClone(command);immediate.parameters[3]['Duration:eval']='0';
   immediate.indent=0;
   const clear = immediate.parameters[1] === 'Basic_ExitBusts' && immediate.parameters[3]['AutoErase:eval'] === 'true' ? JSON.parse(immediate.parameters[3]['PictureID:arrayeval']).map(id=>c(235,[Number(id)])) : [];
   output.push(...nest(branch('$gameVariables.value(47)',[immediate,...clear],[{...command,indent:0}]),command.indent));
  }else if(command.code===230)output.push(...nest(branch('!$gameVariables.value(47)',[{...command,indent:0}]),command.indent));
  else output.push(command);
 }
 return output;
}
export function write(events,system){
 fs.writeFileSync(root+'data/CommonEvents.json','[\n'+events.map(e=>JSON.stringify(e)).join(',\n')+'\n]\n');
 if(system)fs.writeFileSync(root+'data/System.json',JSON.stringify(system)+'\n');
}
export const reading=id=>[bridge('CaptureContext'),call(id),bridge('ReadingComplete')];
