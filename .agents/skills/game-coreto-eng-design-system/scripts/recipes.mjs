import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {skillRoot, preset} from './shared.mjs';

const drawing=await readFile(join(skillRoot,'assets/drawing.js.txt'),'utf8');
export async function recipe(kind) {
  const keys=kind==='option'?['Surfaces','Icons','Menu','Action','Controls']:['Surfaces','Icons','Speaker','Label','Controls'];
  const config=Object.fromEntries(keys.map(k=>[k,preset.defaults[k]]));
  const body=await readFile(join(skillRoot,`assets/${kind}.js.txt`),'utf8');
  const context=kind==='option'?'const integrations={optionIcon:()=>null};':kind==='save-contents'?"const fonts={body:'CoretoOutfit'};":'';
  return `// Coreto DesignSystem ${preset.version}: ${kind}\nconst config=${JSON.stringify(config)};\nconst colors={...config.Surfaces,text:ColorManager.normalColor()};\n${context}\nconst owner=this;\n${drawing}${body}`;
}

export function backgroundRecipe() {
  // Row state remains owned by the theme; CoreEngine owns callback dispatch.
  const shapes=preset.defaults.Shapes;
  const primitives=drawing.slice(0,drawing.indexOf('  function textStyle'));
  return `// Coreto DesignSystem ${preset.version}: item background\n${primitives}\nconst rect=arguments[0];\nfor(let i=0;i<this.maxItems();i++){\n  const r=this.itemRect(i);\n  if(r.x===rect.x&&r.y===rect.y&&globalThis.CoretoDesignSystem?.drawItemBackground?.call(this,i))return;\n}\nbox(this.contentsBack,rect.x,rect.y,rect.width,rect.height,ColorManager.itemBackColor1(),${JSON.stringify(preset.defaults.Surfaces.border)},${shapes.ControlRadius},${shapes.BorderWidth});`;
}
