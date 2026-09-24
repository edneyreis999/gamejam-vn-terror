function installExtendedSaveLifecycle() {
    const extract = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        const result = extract.call(this,contents);
        $gameSystem.isMessageButtonConsoleVisible();
        $gameSystem.isExtendedFastForwardDisallowed();
        $gameSystem.getMessageCursorSettings();
        $gameSystem.getMessageTailSettings();
        return result;
    };
}
installExtendedSaveLifecycle();
