function installMessageSaveLifecycle() {
    const extract = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        const result = extract.call(this, contents);
        $gameSystem.initializeMessageCoreSettings();
        $gameScreen.requestPictureTextRefreshAll();
        $gameMap._messageCommonEvents ??= [];
        return result;
    };
}
installMessageSaveLifecycle();
