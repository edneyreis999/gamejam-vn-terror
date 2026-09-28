import {DirectedNativePlayer} from '../../../rpg-maker/qa/native-player.mjs';
export const scenario={id:'interface-baseline',requires:['native-mz','public-input'],browser:{width:1280,height:720,dpr:1,locale:'pt-BR',channel:'chrome',query:''},criteria:[{id:'baseline',variant:'desktop',expectedRef:'planos/tasks/interface-g007-refinement/spec.md#expected-result'}]};
export async function execute(context){
 const p=new DirectedNativePlayer(context);
 await p.until('title');await context.shot('title');
 await p.choose('Novo jogo');await p.until('age-notice');await context.shot('age');
 await p.file(1);await p.ready();await context.shot('dialogue');
 await context.read('render-methods',()=>Object.fromEntries([['Window',Window],['Message',Window_Message],['Console',Window_ButtonConsole],['Picture',Sprite_Picture],['Name',Window_NameBox]].map(([key,type])=>[key,Object.fromEntries(Object.getOwnPropertyNames(type.prototype).filter(n=>/pause|text|bitmap|color/i.test(n)).map(n=>[n,String(type.prototype[n])]))])));
 await p.until('formation');await context.shot('formation');
 await context.read('baseline-geometry',()=>SceneManager._scene._spriteset._pictureContainer.children.filter(s=>s.picture()).map(s=>({id:s._pictureId,name:s.picture().name(),bounds:s.getBounds(),keys:Object.keys(s).filter(k=>/text|picture|choice/i.test(k)),picture:s.picture()})));
}
export async function verify({artifacts}){return {criteria:[{...scenario.criteria[0],status:'executed-awaiting-review',evidence:artifacts.map(a=>a.path)}],pendingReviews:['Baseline diagnosis']};}
