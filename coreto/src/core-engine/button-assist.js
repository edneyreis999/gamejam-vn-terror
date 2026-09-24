function installButtonAssist(settings) {
    const assist = settings.ButtonAssist;
    class Window_ButtonAssist extends Window_Base {
        initialize(rect) {
            this._data = {};
            super.initialize(rect);
            this.setBackgroundType(assist.BgType || 0);
            this.refresh();
        }
        lineHeight() { return this.innerHeight || super.lineHeight(); }
        updatePadding() { this.padding = SceneManager._scene.getButtonAssistLocation() === "button" ? 8 : 0; }
        makeFontBigger() { if (this.contents.fontSize <= 96) this.contents.fontSize += 6; }
        makeFontSmaller() { if (this.contents.fontSize >= 24) this.contents.fontSize -= 6; }
        update() {
            super.update();
            this.updateKeyText();
        }
        updateKeyText() {
            const scene = SceneManager._scene;
            for (let slot = 1; slot <= 5; slot++) {
                if (this._data[`key${slot}`] !== scene[`buttonAssistKey${slot}`]() ||
                    this._data[`text${slot}`] !== scene[`buttonAssistText${slot}`]()) {
                    this.refresh();
                    return;
                }
            }
        }
        refresh() {
            this.contents.clear();
            const scene = SceneManager._scene;
            const width = this.innerWidth / 5;
            for (let slot = 1; slot <= 5; slot++) {
                const key = scene[`buttonAssistKey${slot}`]();
                const text = scene[`buttonAssistText${slot}`]();
                this._data[`key${slot}`] = key;
                this._data[`text${slot}`] = text;
                if (key === "" || text === "") continue;
                const x = width * (slot - 1) + this.itemPadding() + scene[`buttonAssistOffset${slot}`]();
                this.drawTextEx(assist.TextFmt.format(key, text), x, 0, width - this.itemPadding() * 2);
            }
        }
    }
    globalThis.Window_ButtonAssist = Window_ButtonAssist;
    const scene = Scene_Base.prototype;
    scene.getButtonAssistLocation = function() { return SceneManager.areButtonsOutsideMainUI() ? assist.Location : "button"; };
    scene.createButtonAssistWindow = function() {};
    scene.buttonAssistKey1 = function() { return TextManager.getInputMultiButtonStrings("pageup", "pagedown"); };
    for (const [index, action] of [[2,"tab"],[3,"shift"],[4,"ok"],[5,"cancel"]]) {
        scene[`buttonAssistKey${index}`] = function() { return TextManager.getInputButtonString(action); };
    }
    scene.buttonAssistText1 = function() { return this._pageupButton?.visible ? TextManager.buttonAssistSwitch : ""; };
    scene.buttonAssistText2 = function() { return ""; };
    scene.buttonAssistText3 = function() { return ""; };
    scene.buttonAssistText4 = function() { return TextManager.buttonAssistOk; };
    scene.buttonAssistText5 = function() { return TextManager.buttonAssistCancel; };
    for (let slot = 1; slot <= 5; slot++) scene[`buttonAssistOffset${slot}`] = function() { return 0; };
    const createWindowLayer = scene.createWindowLayer;
    scene.createWindowLayer = function() {
        createWindowLayer.call(this);
        this.createButtonAssistWindow();
    };
    Scene_MenuBase.prototype.isMenuButtonAssistEnabled = function() { return assist.Enable; };
    Scene_MenuBase.prototype.createButtonAssistWindow = function() {
        if (!this.isMenuButtonAssistEnabled()) return;
        this._buttonAssistWindow = new Window_ButtonAssist(this.buttonAssistWindowRect());
        this.addWindow(this._buttonAssistWindow);
    };
    Scene_MenuBase.prototype.buttonAssistWindowRect = function() {
        const location = this.getButtonAssistLocation();
        if (location === "button") {
            const x = ConfigManager.touchUI ? (Sprite_Button.prototype.blockWidth() + 6) * 2 : 0;
            return new Rectangle(x, this.buttonY(), Graphics.boxWidth - x * 2, this.buttonAreaHeight());
        }
        const height = Window_ButtonAssist.prototype.lineHeight();
        return new Rectangle(0, location === "top" ? 0 : Graphics.boxHeight - height, Graphics.boxWidth, height);
    };
    const mainAreaHeight = Scene_MenuBase.prototype.mainAreaHeight;
    Scene_MenuBase.prototype.mainAreaHeight = function() {
        const height = mainAreaHeight.call(this);
        return this.isMenuButtonAssistEnabled() && this.getButtonAssistLocation() !== "button" ? height - Window_ButtonAssist.prototype.lineHeight() : height;
    };
    const mainAreaTopSide = Scene_MenuBase.prototype.mainAreaTopSideButtonLayout;
    Scene_MenuBase.prototype.mainAreaTopSideButtonLayout = function() {
        if (this.isBottomHelpMode() && this.isMenuButtonAssistEnabled() && this.getButtonAssistLocation() === "top") {
            return Window_ButtonAssist.prototype.lineHeight();
        }
        return mainAreaTopSide.call(this);
    };
}
