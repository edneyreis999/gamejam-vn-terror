import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
let path='rpg-maker/tests/suites/native-inventory.mjs',source=readFileSync(path,'utf8');
assert.ok(source.includes("'FinalChoice']"));
writeFileSync(path,source.replace("'FinalChoice']","'FinalChoice','MemorialLabel']"));
path='rpg-maker/tests/suites/memorial.mjs';source=readFileSync(path,'utf8');
const point="    await writeFile(evidenceRoot+'/memorial-measurements/'+kind+'.json',JSON.stringify(measurements,null,2));";
assert.ok(source.includes(point));
const extra=`
    if(kind==='bad'){
      const fields={names:heroNames,routes:Object.values(catalog.destinations).map(x=>x.name),encounters:Object.values(catalog.encounters).map(x=>x.name)};
      const catalogMeasures=await browser.evaluate('(()=>{const f='+JSON.stringify(fields)+';const b=new Bitmap(1,1);b.fontFace=$gameSystem.mainFontFace();b.fontSize=24;const wrap=t=>{const lines=[];for(const word of t.split(/\\\\s+/)){const last=lines.at(-1);if(last&&b.measureTextWidth(last+" "+word)<=280)lines[lines.length-1]+=" "+word;else lines.push(word);}return lines;};const rows=[];for(const name of f.names)for(const route of f.routes)for(const encounter of f.encounters){const lines=[...wrap(name),...wrap(route),...wrap(encounter)];rows.push({name,route,encounter,lines,width:Math.max(...lines.map(t=>b.measureTextWidth(t))),height:18+lines.length*34});}b.destroy();return rows;})()');
      await writeFile(evidenceRoot+'/memorial-measurements/catalog.json',JSON.stringify(catalogMeasures,null,2));
      for(const item of catalogMeasures)assert.ok(item.width<=280&&item.height<=192,JSON.stringify(item));
    }`;
writeFileSync(path,source.replace(point,point+extra));
path='rpg-maker/tests/suites/native-death-context.mjs';source=readFileSync(path,'utf8');
source=source.replace("const saved=terminal.deathLocations[row.id],caption=normalize(row.caption);assert.ok(caption.includes(normalize(causeText(saved.encounterId))),row.id);","const saved=terminal.deathLocations[row.id],caption=normalize(row.caption);\n  const renderedCause=await browser.evaluate('$gameVariables.value('+String(191+Number(row.id.slice(1)))+')');\n  assert.equal(normalize(renderedCause),normalize(causeText(saved.encounterId)),row.id);");
const start=source.indexOf(' const sizes=await browser.evaluate('),end=source.indexOf(' assert.deepEqual((await state(browser)).deathLocations',start);
assert.ok(start>=0&&end>start);
source=source.slice(0,start)+" // IT-055 owns rendered font/bounds and the full native inscription boxes.\n"+source.slice(end);
writeFileSync(path,source);
