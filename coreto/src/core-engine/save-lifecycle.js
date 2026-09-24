function installSaveLifecycle({normalizeSystem, normalizeBattle, normalizePicture}) {
    const extract = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(...args) {
        const result = extract.apply(this, args);
        normalizeSystem($gameSystem);
        normalizeBattle($gameSystem);
        $gameScreen.getCoreEngineScreenShakeStyle();
        for (const picture of $gameScreen._pictures) if (picture) normalizePicture(picture);
        return result;
    };
}
