import {CoreError,decodeValue,encodeValue,validateValue} from '../../src/core-engine/parameters.mjs';

export function decodeAuthoredValue(schema,raw,path) {
    if(raw===''&&Object.hasOwn(schema,'emptyValue'))return validateValue(schema,schema.emptyValue,path);
    if(schema.coerceNativeNumbers&&raw!==undefined){
        let encoded;
        try{encoded=JSON.parse(raw);}catch{throw new CoreError('INVALID_ENCODING',`Invalid JSON encoding at ${path}.`,{field:path,received:raw});}
        if(Array.isArray(encoded))return validateValue(schema,encoded.map(Number),path);
    }
    return decodeValue(schema,raw,path);
}

export function encodeAuthoredValue(schema,value,path,previous) {
    const nativePrevious=previous===''&&schema.type==='array'&&Array.isArray(schema.emptyValue)?'[]':previous;
    return encodeValue(schema,value,path,nativePrevious);
}
