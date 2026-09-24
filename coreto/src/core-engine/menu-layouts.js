function authoredCallback(source, path) {
    const body = compileAuthoredBody(source, path);
    return function(...args) {
        try {
            return body.apply(this, args);
        } catch (error) {
            throw new CoreError("AUTHORED_CODE_FAILED", `${path}: ${error.message}`, { field: path });
        }
    };
}

function installMenuLayouts(settings) {
    Scene_Name.prototype.helpAreaHeight = function() { return 0; };
    const scenes = {
        MainMenu: Scene_Menu, ItemMenu: Scene_Item, SkillMenu: Scene_Skill,
        EquipMenu: Scene_Equip, StatusMenu: Scene_Status, OptionsMenu: Scene_Options,
        SaveMenu: Scene_Save, LoadMenu: Scene_Load, GameEnd: Scene_GameEnd,
        ShopMenu: Scene_Shop, NameMenu: Scene_Name
    };
    for (const [name, Scene] of Object.entries(scenes)) {
        const layout = settings.MenuLayout[name];
        Scene.layoutSettings = { ...layout };
        for (const key of Object.keys(layout).filter(key => key.endsWith("Rect"))) {
            const part = key.slice(0, -4);
            const method = `${part[0].toLowerCase()}${part.slice(1)}WindowRect`;
            const callback = authoredCallback(layout[key], `/MenuLayout/${name}/${key}`);
            Scene.layoutSettings[key] = callback;
            Scene.prototype[method] = callback;
        }
        const create = Scene.prototype.create;
        Scene.prototype.create = function(...args) {
            create.apply(this, args);
            this.setCoreEngineUpdateWindowBg();
        };
        Scene.prototype.setCoreEngineUpdateWindowBg = function() {
            for (const key of Object.keys(layout).filter(key => key.endsWith("BgType"))) {
                const part = key.slice(0, -6);
                this[`_${part[0].toLowerCase()}${part.slice(1)}Window`]?.setBackgroundType(layout[key]);
            }
        };
    }
    Scene_Skill.prototype.onActorChange = function() {
        Scene_MenuBase.prototype.onActorChange.call(this);
        this.refreshActor();
        this._itemWindow.deactivate();
        this._itemWindow.deselect();
        this._skillTypeWindow.activate();
    };
    Scene_Skill.prototype.arePageButtonsEnabled = function() {
        return this._skillTypeWindow && this._skillTypeWindow.active;
    };
}
