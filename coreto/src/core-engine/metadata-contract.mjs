export class MetadataError extends Error {
    constructor(code, message, status = 400) {
        super(message);
        this.name = 'MetadataError';
        this.code = code;
        this.status = status;
    }
}

export const metadataTypes = ['ExportAllMapText', 'ExportAllTroopText', 'ExportCurMapText', 'ExportCurTroopText', 'PictureCoordinatesMode'];

function metadataInvalid(message) {
    throw new MetadataError('METADATA_INVALID_DOCUMENT', message);
}

function metadataObject(value, keys) {
    if (!value || typeof value !== 'object' || Array.isArray(value) ||
        Object.keys(value).length !== keys.length || keys.some(key => !Object.hasOwn(value, key))) {
        metadataInvalid(`Expected only these fields: ${keys.join(', ')}.`);
    }
}

function metadataPositiveId(id) {
    return Number.isSafeInteger(id) && id > 0;
}

export function validateMetadataRequestId(id) {
    if (typeof id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
        metadataInvalid('Use a UUID requestId for this session.');
    }
    return id;
}

export function validateMetadataDocument(document) {
    metadataObject(document, ['schemaVersion', 'requestId', 'type', 'context', 'content', 'sources']);
    validateMetadataRequestId(document.requestId);
    if (document.schemaVersion !== 1 || !metadataTypes.includes(document.type)) metadataInvalid('Unsupported document type or schemaVersion.');
    const {type, context, content, sources} = document;
    if (type.startsWith('ExportAll')) {
        if (context !== null) metadataInvalid('Global exports have null context.');
    } else {
        metadataObject(context, ['type', 'id']);
        if (!['map', 'troop'].includes(context.type) || !metadataPositiveId(context.id)) metadataInvalid('Use an existing map or troop context with a positive integer ID.');
        if ((type === 'ExportCurMapText' && context.type !== 'map') || (type === 'ExportCurTroopText' && context.type !== 'troop')) metadataInvalid('The context does not match the export type.');
    }
    if (!sources || typeof sources !== 'object' || Array.isArray(sources)) metadataInvalid('sources must map native data filenames to SHA-256 hashes.');
    for (const [name, hash] of Object.entries(sources)) {
        if (!/^(?:CommonEvents|MapInfos|Troops|Map\d{3,})\.json$/.test(name) || typeof hash !== 'string' || !/^[a-f0-9]{64}$/.test(hash)) metadataInvalid('Invalid data source filename or SHA-256 hash.');
    }
    if (type === 'PictureCoordinatesMode') {
        if (Object.keys(sources).length) metadataInvalid('Coordinate snapshots do not submit authored data sources.');
        metadataObject(content, ['schemaVersion', 'pictureId', 'context', 'origin', 'x', 'y', 'capturedAt']);
        metadataObject(content.context, ['type', 'id']);
        if (content.schemaVersion !== 1 || !metadataPositiveId(content.pictureId) || content.context.type !== context.type || content.context.id !== context.id ||
            ![0, 1].includes(content.origin) || !Number.isFinite(content.x) || !Number.isFinite(content.y) ||
            typeof content.capturedAt !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(content.capturedAt) ||
            !Number.isFinite(Date.parse(content.capturedAt)) || new Date(content.capturedAt).toISOString() !== content.capturedAt) metadataInvalid('Invalid coordinate snapshot.');
    } else {
        if (typeof content !== 'string' || content.includes('\r') || content.includes('\0')) metadataInvalid('Export content must be UTF-8 text with LF newlines and no NUL.');
        const required = ['CommonEvents.json'];
        if (type === 'ExportAllMapText') required.push('MapInfos.json');
        else if (type === 'ExportCurMapText') required.push(`Map${String(context.id).padStart(3, '0')}.json`);
        else required.push('Troops.json');
        if (required.some(name => !Object.hasOwn(sources, name))) metadataInvalid('The export is missing required source hashes.');
        if (type !== 'ExportAllMapText' && Object.keys(sources).length !== required.length) metadataInvalid('Unexpected source for this export.');
    }
    return document;
}

export function metadataFilename({type, context, content}) {
    const id = value => String(value).padStart(3, '0');
    switch (type) {
        case 'ExportAllMapText': return 'Exported_Script_AllMaps.txt';
        case 'ExportAllTroopText': return 'Exported_Script_AllTroops.txt';
        case 'ExportCurMapText': return `Exported_Script_Map${id(context.id)}.txt`;
        case 'ExportCurTroopText': return `Exported_Script_Troop${id(context.id)}.txt`;
        case 'PictureCoordinatesMode': return `PictureCoordinates_${context.type === 'map' ? 'Map' : 'Troop'}${id(context.id)}_Picture${id(content.pictureId)}.json`;
        default: return metadataInvalid('Unknown metadata type.');
    }
}
