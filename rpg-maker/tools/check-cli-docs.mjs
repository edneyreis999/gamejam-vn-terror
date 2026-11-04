// Collect current public descriptors before checking the author's review.
import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {parseArgs} from 'node:util';
import path from 'node:path';
const {values} = parseArgs({options:{cli:{type:'string'},project:{type:'string'},scope:{type:'string'},review:{type:'string'},output:{type:'string'},skill:{type:'string'},prepare:{type:'boolean'}}});
for (const key of ['cli','project','scope','output']) if (!values[key]) throw Error('Required: --'+key);
if (!values.prepare && !values.review) throw Error('Required: --review (or --prepare)');
const skill = path.resolve(values.skill || '.agents/skills/rpg-maker-mz-best-practices');
const output = path.resolve(values.output);
await mkdir(output,{recursive:true});
function json(args) {
 const result=spawnSync(process.execPath,[values.cli,...args,'--project',values.project,'--json'],{encoding:'utf8'});
 if(result.error || result.status!==0) throw Error('CLI collection failed: '+(result.error?.message || result.stderr));
 return JSON.parse(result.stdout);
}
const scope=JSON.parse(await readFile(values.scope,'utf8'));
const listed=json(['list']);
const entries=scope.ids.map(id=>{
 if(!listed.ids.includes(id))throw Error('Required descriptor absent from list: '+id);
 return {namespace:scope.namespace,id,descriptor:json(['describe',id])};
});
const inventory=path.join(output,'inventory.json');
await writeFile(inventory,JSON.stringify({schemaVersion:1,checklistVersion:'CP-01-20/v1',entries},null,2)+'\n');
await writeFile(path.join(output,'collection.json'),JSON.stringify({cli:path.resolve(values.cli),project:path.resolve(values.project),scope,skill,collectedAt:new Date().toISOString(),node:process.version},null,2)+'\n');
const command=values.prepare?'prepare':'verify';
const args=[path.join(skill,'scripts/check-cli-docs.py'),command,'--inventory',inventory];
if(values.prepare)args.push('--task',scope.task,'--author','Codex','--output',path.join(output,'review.json'));
else args.push('--review',values.review,'--output',path.join(output,'receipt.json'));
const result=spawnSync('python3',args,{encoding:'utf8'});
if(result.error || result.status!==0)throw Error('CLI documentation checker failed; check --skill and repair the review before retry:\n'+(result.error?.message || result.stderr));
console.log(JSON.stringify({status:values.prepare?'pending':'pass',output,inventory,record:values.prepare?'review.json':'receipt.json'}));
