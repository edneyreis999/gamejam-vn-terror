import {join} from 'node:path';
import {CoreError} from '../../src/core-engine/parameters.mjs';
import {readSnapshot} from './files.mjs';

export async function validatePictureReference(root,value,field,read=async file=>(await readSnapshot(join(root,file),root)).content){
    if(value.trim()==='')return;
    if(value.startsWith('/')||value.includes('\\')||value.split('/').some(part=>part==='..'||part===''||part==='.')||value.includes('\0'))throw new CoreError('INVALID_ASSET_PATH','Use a relative picture name inside img/pictures.',{field,received:value});
    const asset=`img/pictures/${value}.png`;
    try{await read(asset);return;}catch(error){if(error.code!=='ENOENT')throw error;}
    const system=JSON.parse(await read('data/System.json'));
    if(system.hasEncryptedImages){try{await read(asset+'_');return;}catch(error){if(error.code!=='ENOENT')throw error;}}
    throw new CoreError('INVALID_REFERENCE','Picture asset does not exist.',{field,asset});
}
