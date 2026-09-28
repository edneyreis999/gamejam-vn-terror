import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
const path='planos/tasks/prototype-feedback-refinement/task-13-directed.mjs';let source=readFileSync(path,'utf8');
assert.ok(source.includes("if(s.phase==='formation'&&before.map!==3)"));
source=source.replace("const id=s.reading?.passageIds[s.reading.index]||'native-'+surface.map;","surface.phase=s.phase;\n  const id=s.reading?.passageIds[s.reading.index]||'native-'+surface.map;");
source=source.replace("if(s.phase==='formation'&&before.map!==3)","if(s.phase==='formation'&&before.phase!=='formation'&&before.map!==3)");
source=source.replace('returns.push({dead:s.deadHeroIds,samples});',"returns.push({fromPhase:before.phase,fromMap:before.map,serial,dead:s.deadHeroIds,samples});");
source=source.replace('for(const name of names){await player.choose',"for(const name of variant==='physical-first'?names:[]){await player.choose");
writeFileSync(path,source);
