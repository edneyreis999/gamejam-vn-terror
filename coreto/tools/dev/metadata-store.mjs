import * as fs from 'node:fs/promises';
import {constants} from 'node:fs';
import {join} from 'node:path';
import {createHash,randomUUID} from 'node:crypto';
import {MetadataError,validateMetadataDocument,validateMetadataRequestId,metadataFilename} from '../../src/core-engine/metadata-contract.mjs';

const sha256=content=>createHash('sha256').update(content).digest('hex');
const conflict=()=>new MetadataError('METADATA_SOURCE_CONFLICT','Authored data changed during export. Start a new export after editing has finished.',409);

export function createMetadataStore(root,{fileSystem=fs}={}) {
    const io=fileSystem, receipts=new Map(), pending=new Set(), shutdown=new AbortController();
    // Directory creation/removal and file replacement share one filesystem owner.
    let writes=Promise.resolve();
    const directory=join(root,'.RPGMakerMZ-metadata');
    async function regularFile(path) {
        const info=await io.lstat(path);
        if(!info.isFile()||info.isSymbolicLink())throw new MetadataError('METADATA_INVALID_PATH','Metadata inputs and outputs must be regular files without symlinks.',400);
        const handle=await io.open(path,constants.O_RDONLY|constants.O_NOFOLLOW);
        try {
            const before=await handle.stat(),content=await handle.readFile(),after=await handle.stat();
            if(before.ino!==info.ino||before.dev!==info.dev||before.size!==after.size||before.mtimeMs!==after.mtimeMs)throw conflict();
            return {content,info:after,hash:sha256(content)};
        } finally {await handle.close();}
    }
    async function dataFile(name) {
        const data=join(root,'data');
        if((await io.lstat(data)).isSymbolicLink()||await io.realpath(data)!==data)throw new MetadataError('METADATA_INVALID_PATH','The data directory must remain inside the selected project.',400);
        return regularFile(join(data,name));
    }
    function parseData(content,name) {
        try {return JSON.parse(content);}
        catch {throw new MetadataError('METADATA_INVALID_DATA',`${name} is not valid JSON.`,400);}
    }
    async function validateSources(document) {
        const loaded={};
        for(const [name,expected]of Object.entries(document.sources)){
            const source=await dataFile(name);
            if(source.hash!==expected)throw conflict();
            loaded[name]=parseData(source.content,name);
        }
        if(document.type==='ExportAllMapText') {
            const infos=loaded['MapInfos.json'];
            if(!Array.isArray(infos))throw new MetadataError('METADATA_INVALID_DATA','MapInfos must be a native database array.',400);
            const expected=['MapInfos.json','CommonEvents.json'];
            for(const info of infos.filter(Boolean)){
                if(!Number.isSafeInteger(info.id)||info.id<1)throw new MetadataError('METADATA_INVALID_DATA','MapInfos has an invalid map ID.',400);
                expected.push(`Map${String(info.id).padStart(3,'0')}.json`);
            }
            if(JSON.stringify(Object.keys(loaded).sort())!==JSON.stringify([...new Set(expected)].sort()))throw new MetadataError('METADATA_INCOMPLETE_EXPORT','All-map export must include every map listed in MapInfos.',400);
        }
        if(document.context?.type==='map') {
            const name=`Map${String(document.context.id).padStart(3,'0')}.json`;
            const map=loaded[name]??parseData((await dataFile(name)).content,name);
            if(!Array.isArray(map.events))throw new MetadataError('METADATA_INVALID_CONTEXT','The selected map has no native event array.',400);
        } else if(document.context?.type==='troop') {
            const troops=loaded['Troops.json']??parseData((await dataFile('Troops.json')).content,'Troops.json');
            if(troops[document.context.id]?.id!==document.context.id)throw new MetadataError('METADATA_INVALID_CONTEXT','The selected troop does not exist.',400);
        }
    }
    async function checkedDirectory() {
        const info=await io.lstat(directory);
        if(!info.isDirectory()||info.isSymbolicLink()||await io.realpath(directory)!==directory)throw new MetadataError('METADATA_INVALID_PATH','The metadata directory must be a real directory in the selected project.',400);
        return info;
    }
    async function targetSnapshot(target) {
        try {return await regularFile(target);}catch(error){if(error.code==='ENOENT')return null;throw error;}
    }
    async function write(document) {
        let madeDirectory=false,temporary,renamed=false;
        try {
            shutdown.signal.throwIfAborted();
            await validateSources(document);
            try {await io.mkdir(directory);madeDirectory=true;}catch(error){if(error.code!=='EEXIST')throw error;}
            const directoryInfo=await checkedDirectory();
            const filename=metadataFilename(document),target=join(directory,filename);
            const before=await targetSnapshot(target);
            const content=Buffer.from(typeof document.content==='string'?document.content:JSON.stringify(document.content,null,2)+'\n','utf8');
            temporary=join(directory,`.coreto-${randomUUID()}.tmp`);
            const handle=await io.open(temporary,'wx',before?before.info.mode&0o777:0o600);
            try {await handle.writeFile(content);await handle.sync();}finally {await handle.close();}
            await validateSources(document);
            const currentDirectory=await checkedDirectory(),current=await targetSnapshot(target);
            if(currentDirectory.ino!==directoryInfo.ino||currentDirectory.dev!==directoryInfo.dev)throw new MetadataError('METADATA_TARGET_CONFLICT','The metadata directory changed before commit.',409);
            if(Boolean(before)!==Boolean(current)||before&&(before.hash!==current.hash||before.info.ino!==current.info.ino||before.info.dev!==current.info.dev))throw new MetadataError('METADATA_TARGET_CONFLICT','The destination changed before commit. Inspect it before retrying.',409);
            shutdown.signal.throwIfAborted();
            await io.rename(temporary,target);renamed=true;
            const parent=await io.open(directory,'r');try {await parent.sync();}finally {await parent.close();}
            await validateSources(document);
            const confirmed=await regularFile(target);
            if(confirmed.hash!==sha256(content))throw new MetadataError('METADATA_WRITE_UNCONFIRMED','Replacement occurred but the file could not be confirmed. Inspect the destination before retrying.',409);
            return {status:'success',requestId:document.requestId,relativePath:`.RPGMakerMZ-metadata/${filename}`,bytes:confirmed.content.length,sha256:confirmed.hash};
        } catch(error) {
            const status=renamed?'unknown':'failure';
            return {status,requestId:document.requestId,error:{httpStatus:renamed?409:error instanceof MetadataError?error.status:shutdown.signal.aborted?503:500,code:renamed?'METADATA_WRITE_UNCONFIRMED':error instanceof MetadataError?error.code:shutdown.signal.aborted?'METADATA_SESSION_CLOSED':'METADATA_IO_FAILED',message:renamed?'Replacement occurred but confirmation failed. Inspect the destination before starting a new export.':error instanceof MetadataError?error.message:shutdown.signal.aborted?'The development session ended before commit.':`${error.code??'IO_ERROR'}: unable to write project metadata.`}};
        } finally {
            if(temporary&&!renamed)await io.rm(temporary,{force:true});
            if(madeDirectory&&!renamed){try {await io.rmdir(directory);}catch(error){if(!['ENOTEMPTY','ENOENT'].includes(error.code))throw error;}}
        }
    }
    return {
        async submit(input) {
            if(shutdown.signal.aborted)throw new MetadataError('METADATA_SESSION_CLOSED','This development session has ended.',503);
            const document=structuredClone(validateMetadataDocument(input)),identity=sha256(JSON.stringify(document));
            const existing=receipts.get(document.requestId);
            if(existing){if(existing.identity!==identity)throw new MetadataError('METADATA_REQUEST_CONFLICT','This requestId already identifies another document.',409);return existing.result;}
            const record={identity,result:{status:'writing',requestId:document.requestId}};
            receipts.set(document.requestId,record);
            const operation=writes.then(()=>write(document)).catch(error=>({
                status:'failure',requestId:document.requestId,
                error:{httpStatus:500,code:'METADATA_CLEANUP_FAILED',message:`${error.code??'IO_ERROR'}: temporary-file cleanup failed; inspect the metadata directory before retrying.`}
            })).then(result=>{record.result=result;return result;});
            writes=operation;
            pending.add(operation);
            try {return await operation;}finally {pending.delete(operation);}
        },
        receipt(requestId) {
            validateMetadataRequestId(requestId);
            return receipts.get(requestId)?.result??{status:'unknown',requestId,error:{code:'METADATA_RECEIPT_NOT_FOUND',message:'No receipt exists for this request in the current development session.'}};
        },
        async close() {
            shutdown.abort();
            await Promise.allSettled([...pending]);
        }
    };
}
