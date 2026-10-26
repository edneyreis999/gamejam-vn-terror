import {fileURLToPath} from 'node:url';
import {join,basename,dirname} from 'node:path';
import {access} from 'node:fs/promises';
import {readSkillsCatalog} from './skills-catalog.mjs';
import {CoreError} from '../../src/core-engine/parameters.mjs';
const root=fileURLToPath(new URL('../../',import.meta.url));
export const skillsHelp=()=>({usage:'node tools/coreto/cli.mjs skills list | skills describe <name> [--json]',implemented:['list','describe'],
    discovery:'Published consumer skills. Read the returned SKILL.md before applying a preset. Discovery does not install or apply anything.'});
export async function executeSkillsCli(positionals,values){
    const [,operation,name,...rest]=positionals;
    if(rest.length||!['list','describe'].includes(operation)||(operation==='describe')!==Boolean(name)||Object.entries(values).some(([k,v])=>v!==false&&!['json','help'].includes(k)))throw new CoreError('INVALID_USAGE','Use skills list | skills describe <name>.');
    const {skills}=await readSkillsCatalog(root);
    const result=[];
    for(const skill of skills){
        const directory=basename(root)==='coreto'?join(dirname(root),'.agents/skills',skill.directory):join(root,'skills',skill.directory);
        const instructions=join(directory,'SKILL.md');
        let installed=true;
        try{await access(instructions);}catch(error){if(error.code!=='ENOENT')throw error;installed=false;}
        result.push({...skill,directory,instructions,installed});
    }
    const selected=name?result.find(entry=>entry.name===name):result;
    if(!selected)throw new CoreError('TARGET_NOT_FOUND','Unknown skill: '+name,{},3);
    return {operation:'skills '+operation,result:selected};
}
