import {readFile,writeFile,readdir} from 'node:fs/promises';
import path from 'node:path';
import {parseArgs} from 'node:util';
import {createRequire} from 'node:module';
const {values,positionals}=parseArgs({allowPositionals:true,options:{project:{type:'string'},set:{type:'string'},insert:{type:'string'},'dry-run':{type:'boolean'},json:{type:'boolean'}}});
const root=path.resolve(values.project||'rpg-maker/The Dryland Drowned');
const plugin='Dryland_6_RouteMap';
const require=createRequire(import.meta.url);
require(path.join(root,'js/plugins',plugin+'.js'));
const api=globalThis.DrylandRouteMap;
const [command='help',mapArg,eventArg,pageArg]=positionals;
const positive=(value,label)=>{const n=Number(value);if(!Number.isSafeInteger(n)||n<1)throw Error(label+' must be a positive integer');return n;};
const read=async file=>JSON.parse(await readFile(file,'utf8'));
const mapPath=id=>path.join(root,'data',`Map${String(positive(id,'map ID')).padStart(3,'0')}.json`);
async function write(file,value){const original=await readFile(file,'utf8');const indent=/\n    ["{]/.test(original)?4:undefined;const content=JSON.stringify(value,null,indent)+(original.endsWith('\n')?'\n':'');if(!values['dry-run'])await writeFile(file,content);return {file,dryRun:!!values['dry-run']};}
const help={id:'route-map',provider:plugin,usage:'node rpg-maker/tools/route-map.mjs [command] [IDs] [--project directory] [--json] [--dry-run]',commands:{
 list:'List public descriptor IDs. describe route-map returns this complete contract.',
 help:'Show commands and authoring conventions.',
 parameters:'Read parameters; --set JSON merges declared parameters. Values are strings.',
 map:'map MAP_ID: read graph and event-authored nodes; coordinates are tile centers.',
 node:'node MAP_ID EVENT_ID: read the event; --set JSON edits name, note, x or y. Positions use integer tiles.',
 commands:'commands MAP_ID EVENT_ID PAGE: read native page commands (PAGE starts at 1); --insert JSON appends one plugin command before the terminator.',
 validate:'Validate all marked route maps and declared orthogonal connections; reports map/event context.'
},notes:{RouteMap:'Map opt-in marker.',RouteNode:'Stable ID unique within a map.',RouteLinks:'Comma-separated IDs; undirected edges, at most four per node. Orthogonal positions required.',RouteReturn:'true (default) permits visited nodes; false disallows returning to visited nodes.',RouteArrival:'first (default) fires once per Begin; always fires at every arrival.',RouteImage:'PNG picture basename without extension, loaded from img/pictures. Overrides the active native page graphic.',RouteLabel:'Display label or $[localization.key].',RouteHidden:'Native page comment excludes this event when that page is active.'},runtimeCommands:{Begin:'Reset attempt, visits and overrides at node; does not fire arrival. Required before other commands.',Restore:'Set current node without resetting visits or firing arrival.',SetNode:'Replace node enabled/revealed (true unless false), label and picture image overrides; saves with the attempt. Empty image uses the native page graphic.',Query:'kind=current writes the current ID to variable; kind=visited writes whether node was visited. switch receives the truthiness of the same value. Output ID 0 disables that output.'},parameters:{NodeSize:'78 pixels, minimum 24; square side and hit target.',StepSize:'9 pixels, minimum 2; connector square side.',StepGap:'5 pixels, minimum 1; spacing between connector squares.',Duration:'650 milliseconds, minimum 0; zero jumps directly without movement sound.',MoveSe:'Empty by default (silent). Audio basename without extension in audio/se, loaded by native MZ (OGG); loops only during animated pawn travel on a RouteMap. Preloaded on scene creation, stopped at arrival or scene exit independently of other SE; no playback on Restore or Continue. Reduced motion and Duration 0 are silent. Afogados uses sfx_b2_passos.',MoveSeVolume:'90 by default; integer percent 0..100 multiplied by player SE volume. Afogados uses 80.',MoveSePitch:'100 by default; integer speed percent 50..150. Afogados uses 120.',MoveSePan:'0 by default; integer stereo position -100 (left)..100 (right). Afogados uses 0.',Ink:'#360a0b; CSS color for lines and text.',Accent:'#62365f; CSS color for position/focus.',Paper:'#ead3ae; CSS color for known node backgrounds.',Pawn:'Dryland_Route_Pawn; PNG basename in img/pictures.',ReducedMotionVariable:'0 means system prefers-reduced-motion; positive native variable ID means nonzero value skips travel. Afogados configures 47.'},lifecycle:'CLI only edits native data; it never plays events. Close/reopen the editor around external writes. Runtime requires active Dryland_6_RouteMap, a map with <RouteMap>, and Begin. Per-map position/visits/overrides survive native saves and transfers; Begin resets them. Save/menu are blocked during travel. Arrival starts the destination native event page once travel ends. Native Common Event and Script commands use standard MZ interpreter semantics, with ignored script completion value; tags never execute JavaScript. RouteHidden pages do not participate. Crossings are not junctions; diagonal links and more than four neighbours are rejected. There is no automatic routing or camera.',examples:["node rpg-maker/tools/route-map.mjs map 47","node rpg-maker/tools/route-map.mjs parameters --set '{\"Duration\":\"400\"}' --dry-run","node rpg-maker/tools/route-map.mjs commands 47 1 1"],guide:'rpg-maker/docs/route-map.md'};
let result;
if(command==='list')result={ids:['route-map']};
else if(command==='help'||command==='describe'){
 if(command==='describe'&&mapArg&&mapArg!=='route-map')throw Error('Unknown descriptor: '+mapArg+'; use list');
 result=help;
}
else if(command==='parameters'){
 const file=path.join(root,'js/plugins.js'),raw=await readFile(file,'utf8'),start=raw.indexOf('['),end=raw.lastIndexOf(']'),entries=JSON.parse(raw.slice(start,end+1)),entry=entries.find(e=>e.name===plugin);
 if(!entry)throw Error('RouteMap is not registered');
 if(values.set){const patch=JSON.parse(values.set);for(const [key,value]of Object.entries(patch)){if(!(key in entry.parameters)||typeof value!=='string')throw Error('Unknown parameter or non-string value: '+key);if(['MoveSeVolume','MoveSePitch','MoveSePan'].includes(key)){const n=Number(value),[min,max]={MoveSeVolume:[0,100],MoveSePitch:[50,150],MoveSePan:[-100,100]}[key];if(value.trim()===''||!Number.isInteger(n)||n<min||n>max)throw Error('Invalid audio parameter: '+key);}if(key==='MoveSe'&&(value.includes('..')||/[\\/]/.test(value)||/\.(ogg|m4a)$/i.test(value)))throw Error('Expected audio/se basename without extension');if(['NodeSize','StepSize','StepGap','Duration','ReducedMotionVariable'].includes(key)&&(!Number.isFinite(Number(value))||Number(value)<({NodeSize:24,StepSize:2,StepGap:1}[key]||0)|| (key==='ReducedMotionVariable'&&!Number.isSafeInteger(Number(value)))))throw Error('Invalid numeric parameter: '+key);}Object.assign(entry.parameters,patch);if(!values['dry-run'])await writeFile(file,raw.slice(0,start)+JSON.stringify(entries,null,4)+raw.slice(end+1));}
 result=entry;
}else if(command==='validate'){
 result=[];for(const name of await readdir(path.join(root,'data'))){if(!/^Map\d+\.json$/.test(name))continue;const map=await read(path.join(root,'data',name));if(!/<RouteMap>/i.test(map.note||''))continue;try{const nodes=api.graph(map.events);result.push({map:name,nodes:nodes.length,ok:true});}catch(error){throw Error(name+': '+error.message);}}
}else if(['map','node','commands'].includes(command)){
 const file=mapPath(mapArg),map=await read(file);
 if(command==='map')result={map:Number(mapArg),note:map.note,nodes:api.graph(map.events)};
 else{const event=map.events[positive(eventArg,'event ID')];if(!event)throw Error('Event does not exist');
  if(command==='node'){
   if(values.set){const patch=JSON.parse(values.set);for(const[key,value]of Object.entries(patch)){if(!['name','note','x','y'].includes(key))throw Error('Unsupported event field: '+key);if(['x','y'].includes(key)&&(!Number.isInteger(value)||value<0||value>=(key==='x'?map.width:map.height)))throw Error('Position outside map');if(['name','note'].includes(key)&&typeof value!=='string')throw Error('Expected string: '+key);}Object.assign(event,patch);api.graph(map.events);await write(file,map);}result=event;
  }else{const page=event.pages[positive(pageArg,'page')-1];if(!page)throw Error('Page does not exist');if(values.insert){const input=JSON.parse(values.insert);if(!Object.keys(help.runtimeCommands).includes(input.command)||!input.args||typeof input.args!=='object')throw Error('Expected {command,args} for a RouteMap command');if(page.list.at(-1)?.code!==0)throw Error('Missing native terminator');page.list.splice(-1,0,{code:357,indent:0,parameters:[plugin,input.command,input.command,input.args]});await write(file,map);}result=page.list;}
 }
}else throw Error('Unknown command: '+command);
console.log(JSON.stringify(result,null,2));
