function fillMissingVnFields(target, defaults) {
    for (const [key, value] of Object.entries(defaults)) {
        if (target[key] === undefined) target[key] = value;
        else if (value && typeof value === 'object' && target[key] && typeof target[key] === 'object') {
            fillMissingVnFields(target[key], value);
        }
    }
}
function validateVnSaveState(contents) {
    for (const picture of contents.screen._pictures) {
        if (!picture || picture._coretoVn === undefined) continue;
        const state = picture._coretoVn;
        if (!state || typeof state !== 'object' || Array.isArray(state) || (state.schemaVersion !== undefined && state.schemaVersion !== 1)) {
            throw new Error('Unsupported VN picture save schema.');
        }
        if (state.autoErase !== undefined && (!state.autoErase || !Number.isFinite(state.autoErase.remainingRetries) || state.autoErase.remainingRetries < 0)) {
            throw new Error('Invalid VN picture save AutoErase budget.');
        }
    }
}
function clearVnSessionAnimations() {
    if (globalThis.$gameTemp) $gameTemp._pictureAnimationQueue = [];
    SceneManager._scene?._spriteset?.removeAllPictureAnimations();
}
const createGameObjectsBeforeVnSave = DataManager.createGameObjects;
DataManager.createGameObjects = function(...args) {
    clearVnSessionAnimations();
    return createGameObjectsBeforeVnSave.apply(this, args);
};
const extractSaveContentsBeforeVnSave = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(...args) {
    validateVnSaveState(args[0]);
    clearVnSessionAnimations();
    const result = extractSaveContentsBeforeVnSave.apply(this, args);
    for (const [realId, picture] of $gameScreen._pictures.entries()) {
        if (!picture) continue;
        picture.getVnBustPosition();
        fillMissingVnFields(picture, vnEffectDefaults());
        if (picture._coretoVn === undefined) picture._coretoVn = {};
        if (picture._coretoVn.schemaVersion === undefined) picture._coretoVn.schemaVersion = 1;
        const state = picture._coretoVn;
        if (state?.schemaVersion === 1 && state.autoErase) {
            scheduleVnAutoErase($gameScreen, realId, state.autoErase.remainingRetries);
        }
    }
    return result;
};
