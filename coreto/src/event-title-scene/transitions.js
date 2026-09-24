function Scene_TitleTransition() { this.initialize(...arguments); }
Scene_TitleTransition.prototype = Object.create(Scene_Base.prototype);
Scene_TitleTransition.prototype.constructor = Scene_TitleTransition;
Scene_TitleTransition.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    DataManager.setupNewGame();
    SceneManager.goto(Scene_Map);
};
globalThis.Scene_TitleTransition = Scene_TitleTransition;
function Scene_SingleLoadTransition() { this.initialize(...arguments); }
Scene_SingleLoadTransition.prototype = Object.create(Scene_Base.prototype);
Scene_SingleLoadTransition.prototype.constructor = Scene_SingleLoadTransition;
Scene_SingleLoadTransition.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    this._loadPromise = DataManager.loadGame(0).then(()=>this.onLoadSuccess(),error=>this.onLoadFailure(error));
};
Scene_SingleLoadTransition.prototype.onLoadSuccess = function() {
    SoundManager.playLoad();
    this.fadeOutAll();
    Scene_Load.prototype.reloadMapIfUpdated.call(this);
    $gameSystem.onAfterLoad();
    SceneManager.goto(Scene_Map);
};
Scene_SingleLoadTransition.prototype.onLoadFailure = function(error) {
    SoundManager.playBuzzer();
    SceneManager.goto(Scene_EventedTitleMap);
    SceneManager._nextScene._eventTitleLoadError = error;
};
Scene_SingleLoadTransition.prototype.onSaveCoreLoadFailure = Scene_SingleLoadTransition.prototype.onLoadFailure;
globalThis.Scene_SingleLoadTransition = Scene_SingleLoadTransition;
function eventTitleSaveStyle() { return typeof StorageManager.saveStyle === 'function' ? StorageManager.saveStyle() : 'standard'; }
for (const namespace of [catalog.pluginId,catalog.reference.pluginId]) for (const command of catalog.commands) {
    PluginManager.registerCommand(namespace,command.key,function(args) {
        const raw = args['SlowFade:eval'] ?? command.args[0].nativeDefault;
        const slow = Function('return ('+raw+');').call(this);
        const scene = SceneManager._scene;
        if (slow) scene.fadeOutAll();
        if (command.key === 'Options') return SceneManager.push(Scene_Options);
        if (command.key === 'NewGame') {
            if (eventTitleSaveStyle() === 'locked') {
                DataManager.setupNewGame();
                $gameTemp._pickLockedSaveSlot = true;
                return SceneManager.push(Scene_Save);
            }
            return SceneManager.goto(Scene_TitleTransition);
        }
        if (eventTitleSaveStyle() !== 'single') return SceneManager.push(Scene_Load);
        if (DataManager.isAnySavefileExists()) return SceneManager.push(Scene_SingleLoadTransition);
        SoundManager.playBuzzer();
        scene.loadFailureConfirmationWindow();
    });
}
globalThis.Imported ??= {};
Imported.Coreto_4_EventTitleScene = true;
Imported.VisuMZ_4_EventTitleScene = true;
globalThis.VisuMZ ??= {};
VisuMZ.EventTitleScene = {version:Number(catalog.reference.version),Settings:titleSettings};
