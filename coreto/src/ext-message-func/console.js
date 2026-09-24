function Window_ButtonConsole() { this.initialize(...arguments); }
Window_ButtonConsole.prototype = Object.create(Window_Scrollable.prototype);
Window_ButtonConsole.prototype.constructor = Window_ButtonConsole;

function Scene_SaveButtonConsole() { this.initialize(...arguments); }
Scene_SaveButtonConsole.prototype = Object.create(Scene_Save.prototype);
Scene_SaveButtonConsole.prototype.constructor = Scene_SaveButtonConsole;
globalThis.Window_ButtonConsole = Window_ButtonConsole;
globalThis.Scene_SaveButtonConsole = Scene_SaveButtonConsole;

function installExtendedConsole() {
    const settings = extendedApi.settings.MsgButtonConsole;
    const buttons = extendedApi.settings.Buttons;
    ColorManager.getColor = function(value) {
        value = String(value);
        return value.match(/#(.*)/i) ? '#'+String(RegExp.$1) : this.textColor(Number(value));
    };
    const constants = {
        DEFAULT_SHOW:'ShowDefault', POSITION:'Position', SKIN:'WindowSkin', FONT_FACE:'FontFace', FONT_SIZE:'FontSize',
        TEXT_COLOR_NORMAL:'NormalColor', TEXT_COLOR_TOGGLED:'ToggledColor', TEXT_COLOR_DISABLED:'DisabledColor',
        BUTTON_OFFSET_X:'ButtonOffsetX', BUTTON_OFFSET_Y:'ButtonOffsetY', BUTTON_WIDTH:'ButtonWidth', BUTTON_HEIGHT:'ButtonHeight', BUTTON_BUFFER:'ButtonBuffer'
    };
    for (const [name, field] of Object.entries(constants)) Window_ButtonConsole[name] = settings[field];
    Window_ButtonConsole.BUTTON_ORDER = buttons.List;
    Window_ButtonConsole.VOCAB = {};
    Window_ButtonConsole.SHORTCUT_KEY = {};
    for (const name of ['Auto','FastFwd','Save','Load','Options','GameEnd']) {
        Window_ButtonConsole.VOCAB[name.toLowerCase()] = buttons[name];
        if (name !== 'FastFwd') Window_ButtonConsole.SHORTCUT_KEY[name.toLowerCase()] = buttons[name+'Key'];
    }
    TextManager.msgButtonConsole = function(type) {
        return Window_ButtonConsole.VOCAB[type] || type.toUpperCase().trim();
    };
    const loadSystemImages = Scene_Boot.prototype.loadSystemImages;
    Scene_Boot.prototype.loadSystemImages = function() {
        loadSystemImages.call(this);
        this.loadSystemImagesForExtMessageFunc();
    };
    Scene_Boot.prototype.loadSystemImagesForExtMessageFunc = function() {
        const settings = extendedApi.settings.MsgButtonConsole;
        for (const key of ['ImgDisabled','ImgEnabled','ImgToggled']) {
            settings[key] = settings[key] ?? '';
            if (settings[key] !== '') ImageManager.loadSystem(settings[key]);
        }
    };
    Game_System.prototype.initMessageButtonConsole = function() { this._messageButtonConsoleVisible = Window_ButtonConsole.DEFAULT_SHOW; };
    Game_System.prototype.isMessageButtonConsoleVisible = function() {
        if (this._messageButtonConsoleVisible === undefined) this.initMessageButtonConsole();
        return this._messageButtonConsoleVisible;
    };
    Game_System.prototype.setMessageButtonConsoleVisible = function(visible) {
        if (this._messageButtonConsoleVisible === undefined) this.initMessageButtonConsole();
        this._messageButtonConsoleVisible = visible;
    };
    extendedApi.registerCommand('MsgButtonConsole', function(args) { $gameSystem.setMessageButtonConsoleVisible(args.Visible); });
    Game_Message.prototype.refreshButtonConsole = function() {
        const scene = SceneManager._scene;
        if (!scene || !scene._messageWindow) return;
        scene._messageWindow.refreshButtonConsole();
    };
    for (const method of ['setMessageAutoForwardMode','setExtendedFastForwardMode']) {
        const previous = Game_Temp.prototype[method];
        Game_Temp.prototype[method] = function(value) { previous.call(this,value); $gameMessage.refreshButtonConsole(); };
    }
    const preConvert = Window_Base.prototype.preConvertEscapeCharacters;
    Window_Base.prototype.preConvertEscapeCharacters = function(text) {
        return preConvert.call(this,text.replace(/<HIDE (?:BUTTON CONSOLE|CONSOLE|BUTTONS)>/gi,'<HIDEBUTTONCONSOLE>'));
    };
    Window_Message.prototype.prepareHideButtonConsoleTextCode = function(state) {
        this._hideButtonConsole = false;
        state.text = state.text.replace('<HIDEBUTTONCONSOLE>',()=>{ this._hideButtonConsole = true; return ''; });
        if (this.hideButtonConsoleAutoSize(state.text)) this._hideButtonConsole = true;
    };
    Window_Message.prototype.hideButtonConsoleAutoSize = function(text) {
        if (!settings.AutoSizeHide) return false;
        return !!(text.match(Window_Message._autoSizeRegexp) || text.match(Window_Message._autoPosRegExp));
    };
    const newPage = Window_Message.prototype.newPage;
    Window_Message.prototype.newPage = function(state) {
        this.prepareHideButtonConsoleTextCode(state);
        this.resetMessageTailSettings();
        this.parseMessageTailTextCodes(state);
        return newPage.call(this,state);
    };
    const initMembers = Window_Message.prototype.initMembers;
    Window_Message.prototype.initMembers = function() { initMembers.apply(this,arguments); this.createButtonConsole(); };
    const addedHeight = Window_Message.prototype.addedHeight;
    Window_Message.prototype.addedHeight = function() {
        let height = addedHeight.call(this);
        if (this._hideButtonConsole) return height;
        if (SceneManager.isSceneMap() && $gameSystem.isMessageButtonConsoleVisible() && ['top','bottom'].includes(Window_ButtonConsole.POSITION.toLowerCase().trim())) height += Window_ButtonConsole.BUTTON_HEIGHT;
        return height;
    };
    const updateDimensions = Window_Message.prototype.updateDimensions;
    Window_Message.prototype.updateDimensions = function() { updateDimensions.apply(this,arguments); this.showButtonConsole(); this.refreshButtonConsole(); };
    Window_Message.prototype.showButtonConsole = function() {
        if (!SceneManager.isSceneMap()) return;
        for (const button of this._buttonConsoleButtons) {
            if (!this._hideButtonConsole && $gameSystem.isMessageButtonConsoleVisible()) button.show(); else button.hide();
        }
        this.alignButtonConsoleButtons();
    };
    Window_Message.prototype.refreshButtonConsole = function() { for (const button of this._buttonConsoleButtons) button.refresh(); };
    Window_Message.prototype.createButtonConsole = function() {
        this._buttonConsoleButtons = [];
        for (const type of Window_ButtonConsole.BUTTON_ORDER) this.addButtonConsoleObject(type);
        this.alignButtonConsoleButtons();
    };
    Window_Message.prototype.addButtonConsoleObject = function(type) {
        type = type.toLowerCase().trim();
        if (type === 'skip' && !Scene_Message.EXT_FAST_FORWARD_ENABLED) return;
        if (type === 'options' && !Imported.VisuMZ_1_OptionsCore) return;
        if (['save','load'].includes(type) && !Imported.VisuMZ_1_SaveCore) return;
        if (type === 'hide' && !Imported.VisuMZ_4_MessageVisibility) return;
        if (['log','backlog'].includes(type) && !Imported.VisuMZ_3_MessageLog) return;
        const button = new Window_ButtonConsole(type,this);
        this._buttonConsoleButtons.push(button);
        this.addChild(button);
    };
    Window_Message.prototype.alignButtonConsoleButtons = function() {
        if (!SceneManager.isSceneMap()) return;
        const position = Window_ButtonConsole.POSITION.toLowerCase().trim();
        const list = this._buttonConsoleButtons;
        this._contentsSprite.x = this._contentsSprite.y = 0;
        if (!$gameSystem.isMessageButtonConsoleVisible()) return;
        if (['top','bottom'].includes(position)) {
            const width = list.length * Window_ButtonConsole.BUTTON_WIDTH + (list.length-1) * Window_ButtonConsole.BUTTON_BUFFER;
            let x = Math.floor((this.width-width)/2) + Window_ButtonConsole.BUTTON_OFFSET_X;
            for (const button of list) { button.x = x; x += Window_ButtonConsole.BUTTON_WIDTH + Window_ButtonConsole.BUTTON_BUFFER; }
        }
        if (position === 'top') {
            for (const button of list) button.y = Window_ButtonConsole.BUTTON_BUFFER;
            if (this._hideButtonConsole) return;
            this._contentsSprite.y = Window_ButtonConsole.BUTTON_HEIGHT + Window_ButtonConsole.BUTTON_OFFSET_Y;
        }
        if (position === 'bottom') for (const button of list) button.y = this.height - Window_ButtonConsole.BUTTON_HEIGHT - Window_ButtonConsole.BUTTON_BUFFER + Window_ButtonConsole.BUTTON_OFFSET_Y;
    };
    Window_Message.prototype.drawMessageFace = function() {
        const width = ImageManager.standardFaceWidth || 144;
        const face = $gameMessage.faceName(), index = $gameMessage.faceIndex(), rtl = $gameMessage.isRTL();
        this.drawFace(face,index,rtl ? this.innerWidth-width-4 : 4,0,width,this.innerHeight-this.addedHeight());
    };
    Window_Message.prototype.toggleAutoForward = function() {
        if (this._hideButtonConsole || !$gameSystem.isMessageButtonConsoleVisible()) return;
        const enabled = !$gameTemp.isMessageAutoForwardMode();
        $gameTemp.setMessageAutoForwardMode(enabled);
        if (enabled) this.playOkSound(); else SoundManager.playCancel();
    };
    function dispatchMenu(window,type) {
        let target;
        let allowed;
        switch (type) {
            case 'save': target = Scene_SaveButtonConsole; allowed = $gameSystem.isSaveEnabled() && SceneManager.isSceneMap(); break;
            case 'load': target = Scene_Load; allowed = DataManager.isAnySavefileExists() && SceneManager.isSceneMap(); break;
            case 'options': target = Scene_Options; allowed = SceneManager.isSceneMap(); break;
            case 'gameend': target = Scene_GameEnd; allowed = SceneManager.isSceneMap(); break;
            default: return;
        }
        if (allowed) { window.playOkSound(); SceneManager.push(target); } else window.playBuzzerSound();
    }
    Window_Message.prototype.processButtonShortcut = function(type) {
        if (this._hideButtonConsole || !$gameSystem.isMessageButtonConsoleVisible()) return;
        dispatchMenu(this,type.toLowerCase().trim());
    };
    Window_Message.prototype.isTriggered = function() {
        if (SceneManager._scene.isExtendedFastForwardMode()) return true;
        for (const type of ['auto','save','load','options','gameend']) if (Input.isTriggered(Window_ButtonConsole.SHORTCUT_KEY[type])) {
            if (type === 'auto') this.toggleAutoForward(); else this.processButtonShortcut(type);
            return false;
        }
        return this.pause && $gameTemp.isMessageAutoForwardMode() ? this.autoForwardTriggered() : messageTriggerBeforeExtended.call(this);
    };
    Window_Message.EXT_SCROLL_WHEEL = {enable:extendedApi.settings.ScrollWheel.Enable,scrollDownNext:extendedApi.settings.ScrollWheel.ScrollDownNext,scrollUpMsgLog:extendedApi.settings.ScrollWheel.ScrollUpMsgLog};
    if (Window_Message.EXT_SCROLL_WHEEL.enable) {
        const triggered = Window_Message.prototype.isTriggered;
        Window_Message.prototype.isTriggered = function() {
            if (triggered.call(this)) return true;
            if (Window_Message.EXT_SCROLL_WHEEL.scrollDownNext && TouchInput.wheelY >= 20) return true;
            if (Window_Message.EXT_SCROLL_WHEEL.scrollUpMsgLog && TouchInput.wheelY <= -20) {
                if (Imported.VisuMZ_3_MessageLog) { this.playOkSound(); SceneManager.push(Scene_MessageLog); }
                return false;
            }
            return false;
        };
    }
    Window_ButtonConsole.prototype.initialize = function(type,parent) {
        this._parentWindow = parent;
        Window_Scrollable.prototype.initialize.call(this,new Rectangle(0,0,Window_ButtonConsole.BUTTON_WIDTH,Window_ButtonConsole.BUTTON_HEIGHT));
        this.createBackImageSprites();
        this._type = type.toLowerCase().trim();
        this.refresh();
        this.hide();
    };
    Window_ButtonConsole.prototype.itemPadding = function() { return 0; };
    Window_ButtonConsole.prototype.loadWindowskin = function() { this.windowskin = ImageManager.loadSystem(Window_ButtonConsole.SKIN); };
    Window_ButtonConsole.prototype.updatePadding = function() { this.padding = 0; };
    Window_ButtonConsole.prototype.updateBackOpacity = function() { this.backOpacity = 255; };
    Window_ButtonConsole.prototype.checkBackImageSprites = function() { Window_ButtonConsole.USE_BACK_IMAGE_SPRITES = ['ImgDisabled','ImgEnabled','ImgToggled'].some(key=>settings[key] !== ''); };
    Window_ButtonConsole.prototype.createBackImageSprites = function() {
        if (Window_ButtonConsole.USE_BACK_IMAGE_SPRITES === undefined) this.checkBackImageSprites();
        if (!Window_ButtonConsole.USE_BACK_IMAGE_SPRITES) return;
        this.opacity = 0;
        this._buttonConsoleSprites = {};
        for (const key of ['ImgDisabled','ImgEnabled','ImgToggled']) if (settings[key] !== '') {
            const sprite = new Sprite(ImageManager.loadSystem(settings[key]));
            this._buttonConsoleSprites[key] = sprite;
            this.addChildToBack(sprite);
            sprite.x = settings[key+'OffsetX'] || 0;
            sprite.y = settings[key+'OffsetY'] || 0;
        }
        this.updateBackImageSpriteVisibility();
    };
    Window_ButtonConsole.prototype.resetFontSettings = function() {
        Window_Scrollable.prototype.resetFontSettings.call(this);
        this.contents.fontFace = Window_ButtonConsole.FONT_FACE;
        this.contents.fontSize = Window_ButtonConsole.FONT_SIZE;
    };
    Window_ButtonConsole.prototype.refresh = function() {
        this.createContents(); this.resetFontSettings();
        const text = TextManager.msgButtonConsole(this._type);
        this.changeTextColor(ColorManager.getColor(this.textColorID()));
        this.drawText(text,0,0,this.innerWidth,'center');
    };
    Window_ButtonConsole.prototype.textColorID = function() {
        switch (this._type) {
            case 'auto': if ($gameTemp.isMessageAutoForwardMode()) return Window_ButtonConsole.TEXT_COLOR_TOGGLED; break;
            case 'fastfwd': {
                if ($gameSystem.isExtendedFastForwardDisallowed()) return Window_ButtonConsole.TEXT_COLOR_DISABLED;
                const scene = SceneManager._scene;
                if (scene && scene.isActivatedExtendedFastForwardMode && scene.isActivatedExtendedFastForwardMode()) return Window_ButtonConsole.TEXT_COLOR_TOGGLED;
                break;
            }
            case 'save': if (!$gameSystem.isSaveEnabled() || !SceneManager.isSceneMap()) return Window_ButtonConsole.TEXT_COLOR_DISABLED; break;
            case 'load': if (!DataManager.isAnySavefileExists() || !SceneManager.isSceneMap()) return Window_ButtonConsole.TEXT_COLOR_DISABLED; break;
            case 'options': case 'gameend': if (!SceneManager.isSceneMap()) return Window_ButtonConsole.TEXT_COLOR_DISABLED; break;
            case 'log': case 'backlog': if (!$gameSystem.isMainMenuMessageLogEnabled() || !SceneManager.isSceneMap()) return Window_ButtonConsole.TEXT_COLOR_DISABLED; break;
        }
        return Window_ButtonConsole.TEXT_COLOR_NORMAL;
    };
    Window_ButtonConsole.prototype.isTouchScrollEnabled = function() { return true; };
    Window_ButtonConsole.prototype.onTouchScrollStart = function() {
        if (this.openness < 255 || !this.visible) return;
        switch (this._type) {
            case 'auto': {
                const enabled = !$gameTemp.isMessageAutoForwardMode(); $gameTemp.setMessageAutoForwardMode(enabled);
                if (enabled) this.playOkSound(); else SoundManager.playCancel();
                break;
            }
            case 'fastfwd': {
                if ($gameSystem.isExtendedFastForwardDisallowed()) { this.playBuzzerSound(); break; }
                const enabled = !$gameTemp.isExtendedFastForwardMode(); $gameTemp.setExtendedFastForwardMode(enabled);
                if (enabled) this.playOkSound(); else SoundManager.playCancel();
                this.refresh(); break;
            }
            case 'save': case 'load': case 'options': case 'gameend': dispatchMenu(this,this._type); break;
            case 'hide': if (Imported.VisuMZ_4_MessageVisibility) $gameTemp.toggleMessageWindowVisibility(); break;
            case 'log': case 'backlog':
                if (Imported.VisuMZ_3_MessageLog) {
                    if ($gameSystem.isMainMenuMessageLogEnabled() && SceneManager.isSceneMap()) { this.playOkSound(); SceneManager.push(Scene_MessageLog); } else this.playBuzzerSound();
                }
                break;
        }
        TouchInput.clear();
    };
    Window_ButtonConsole.prototype.update = function() {
        Window_Scrollable.prototype.update.call(this);
        this.updateConsoleVisibility(); this.updateColor(); this.updateBackImageSpriteVisibility();
    };
    Window_ButtonConsole.prototype.updateConsoleVisibility = function() { if (this._parentWindow) this.openness = this._parentWindow.openness; };
    Window_ButtonConsole.prototype.updateColor = function() {
        if (this._type === 'fastfwd' && this._heldDownFastFwd !== Input.isPressed(VisuMZ.MessageCore.Settings.General.FastForwardKey)) {
            this._heldDownFastFwd = Input.isPressed(VisuMZ.MessageCore.Settings.General.FastForwardKey);
            this.refresh();
        }
    };
    Window_ButtonConsole.prototype.updateBackImageSpriteVisibility = function() {
        if (!Window_ButtonConsole.USE_BACK_IMAGE_SPRITES) return;
        for (const [key,color] of [['ImgDisabled','TEXT_COLOR_DISABLED'],['ImgEnabled','TEXT_COLOR_NORMAL'],['ImgToggled','TEXT_COLOR_TOGGLED']]) {
            if (this._buttonConsoleSprites[key]) this._buttonConsoleSprites[key].visible = this.textColorID() === Window_ButtonConsole[color];
        }
    };
}
installExtendedConsole();
