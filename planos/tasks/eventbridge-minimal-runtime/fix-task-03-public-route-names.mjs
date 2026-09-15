import fs from 'node:fs';
const file='rpg-maker/The Dryland Drowned/data/CommonEvents.json';
const events=JSON.parse(fs.readFileSync(file,'utf8'));
const routes=['physical','supernatural','final'];
const queries=routes.map((id,i)=>({code:357,indent:0,parameters:['Dryland_EventBridge','Query','Query',{kind:'routeName',id,variable:String(173+i)}]}));
events[39].list.unshift(...queries);
for(const c of events[39].list){
 if(c.code===102)c.parameters[0]=c.parameters[0].map((label,i)=>i<3?`\\V[${173+i}]`+label.slice(label.indexOf('<')):label);
 if(c.code!==357 || c.parameters[0]!=='VisuMZ_1_MessageCore'||c.parameters[1]!=='PictureTextChange')continue;
 const args=c.parameters[3],id=JSON.parse(args['PictureIDs:arraynum'])[0];
 if(id<75||id>77)continue;
 const value=JSON.parse(args['upperleft:json']);
 args['upperleft:json']=JSON.stringify(value.replace(['Caminho da Igreja','Parque das Águas\nAssombradas','Vilarejo Partido'][id-75],`\\V[${173+id-75}]`));
}
fs.writeFileSync(file,'[\n'+events.map(e=>JSON.stringify(e)).join(',\n')+'\n]\n');
