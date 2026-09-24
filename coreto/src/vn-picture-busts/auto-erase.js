const autoEraseTimers = new WeakMap();
function cancelAutoErase(screen, realId) {
    const timers = autoEraseTimers.get(screen);
    const pending = timers?.get(realId);
    if (!pending) return;
    clearTimeout(pending.timer);
    delete pending.picture._coretoVn.autoErase;
    timers.delete(realId);
}
function cancelScreenAutoErase(screen) {
    const timers = autoEraseTimers.get(screen);
    if (!timers) return;
    for (const realId of timers.keys()) cancelAutoErase(screen, realId);
}
function scheduleVnAutoErase(screen, realId, retries) {
    if (retries < 0) return;
    const picture = screen._pictures[realId];
    if (!picture) return;
    cancelAutoErase(screen, realId);
    picture._coretoVn ??= {schemaVersion: 1};
    const intent = {remainingRetries: retries};
    picture._coretoVn.autoErase = intent;
    let timers = autoEraseTimers.get(screen);
    if (!timers) { timers = new Map(); autoEraseTimers.set(screen, timers); }
    const pending = {picture, timer: null};
    timers.set(realId, pending);
    const poll = () => {
        if (globalThis.$gameScreen !== screen || screen._pictures[realId] !== picture || picture._coretoVn.autoErase !== intent) {
            cancelAutoErase(screen, realId);
            return;
        }
        if (picture._opacity <= 0) {
            cancelAutoErase(screen, realId);
            // Use the captured bank slot; the active logical bank may have changed.
            screen._pictures[realId] = null;
            return;
        }
        if (intent.remainingRetries <= 0) { cancelAutoErase(screen, realId); return; }
        pending.timer = setTimeout(() => { intent.remainingRetries--; poll(); }, 100);
    };
    poll();
}
Game_Screen.prototype.vnAutoErasePicture = function(id, retries) {
    scheduleVnAutoErase(this, this.realPictureId(id), retries);
};
for (const method of ['showPicture', 'erasePicture']) {
    const previous = Game_Screen.prototype[method];
    Game_Screen.prototype[method] = function(id, ...args) {
        cancelAutoErase(this, this.realPictureId(id));
        return previous.call(this, id, ...args);
    };
}
const clearPicturesBeforeVn = Game_Screen.prototype.clearPictures;
Game_Screen.prototype.clearPictures = function(...args) {
    cancelScreenAutoErase(this);
    return clearPicturesBeforeVn.apply(this, args);
};
const eraseBattlePicturesBeforeVn = Game_Screen.prototype.eraseBattlePictures;
Game_Screen.prototype.eraseBattlePictures = function(...args) {
    const timers = autoEraseTimers.get(this);
    if (timers) {
        for (const realId of timers.keys()) {
            if (realId > this.maxPictures()) cancelAutoErase(this, realId);
        }
    }
    return eraseBattlePicturesBeforeVn.apply(this, args);
};
for (const method of ['createGameObjects', 'extractSaveContents']) {
    const previous = DataManager[method];
    DataManager[method] = function(...args) {
        if (globalThis.$gameScreen) cancelScreenAutoErase($gameScreen);
        return previous.apply(this, args);
    };
}
