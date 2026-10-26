import {readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {CoreError} from '../../src/core-engine/parameters.mjs';

export async function readSkillsCatalog(root){
    const catalog=JSON.parse(await readFile(join(root,'skills/catalog.json'),'utf8'));
    if(catalog.schemaVersion!==1||!Array.isArray(catalog.skills))throw new CoreError('SKILL_CATALOG','Expected skills catalog schemaVersion 1.');
    const names=new Set();
    for(const entry of catalog.skills){
        if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.name)||entry.name.length>64||entry.directory!==entry.name||names.has(entry.name)||
            !/^\d+\.\d+\.\d+$/.test(entry.version)||typeof entry.description!=='string'||!entry.description.trim()||
            !Array.isArray(entry.dependencies)||entry.dependencies.some(id=>typeof id!=='string'||!/^Coreto_\d+_\w+$/.test(id))){
            throw new CoreError('SKILL_CATALOG','Invalid or duplicate skill entry: '+entry.name);
        }
        names.add(entry.name);
    }
    return catalog;
}
