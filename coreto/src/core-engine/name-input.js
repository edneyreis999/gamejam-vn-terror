function installNameInput(settings) {
    const keyboard = settings.KeyboardInput;
    if (keyboard.EnableNameInput) installKeyboardNameInput(keyboard);
    installNameSceneInput(settings);
}

function installKeyboardNameInput(keyboard) {
    if (keyboard.QwertyLayout) {
        Window_NameInput.LATIN1 = [
            "Q","W","E","R","T","Y","U","I","O","P",
            "A","S","D","F","G","H","J","K","L", "'",
            "`","Z","X","C","V","B","N","M",",",".",
            "q","w","e","r","t","y","u","i","o","p",
            "a","s","d","f","g","h","j","k","l",":",
            "~","z","x","c","v","b","n","m",'"',";",
            "1","2","3","4","5","6","7","8","9","0",
            "!","@","#","$","%","^","&","*","(",")",
            "<",">","[","]","-","_","/"," ","Page","OK"
        ];
    }
    const input = Window_NameInput.prototype;
    input.defaultInputMode = function() {
        return Input.isGamepadConnected() ? "default" : keyboard.DefaultMode || "keyboard";
    };
    const initialize = input.initialize;
    input.initialize = function(rect) {
        this._mode = this.defaultInputMode();
        initialize.call(this, rect);
        if (this._mode === "default") this.select(0);
        else {
            Input.clear();
            this.deselect();
        }
    };
    input.switchModes = function(mode) {
        if (this._mode === mode) return;
        this._mode = mode;
        this.refresh();
        this.playOkSound();
        this.select(mode === "default" ? 0 : -1);
    };
    const refresh = input.refresh;
    input.refresh = function() {
        if (this._mode !== "keyboard") return refresh.call(this);
        this.contents.clear();
        this.contentsBack.clear();
        this.resetTextColor();
        const lines = keyboard.NameInputMessage.split("\n");
        const top = (this.innerHeight - lines.length * this.lineHeight()) / 2;
        for (const [index, text] of lines.entries()) {
            const x = (this.innerWidth - this.textSizeEx(text).width) / 2;
            this.drawTextEx(text, x, top + index * this.lineHeight());
        }
    };
    const processHandling = input.processHandling;
    input.processHandling = function() {
        if (!this.isOpenAndActive()) return;
        if (this._mode === "keyboard" && Input.isGamepadTriggered()) {
            Input.clear();
            this.switchModes("default");
            return;
        }
        if (Input.isSpecialCode("backspace")) {
            Input.clear();
            this.processBack();
        } else if (Input.isTriggered("tab")) {
            Input.clear();
            this.switchModes(this._mode === "keyboard" ? "default" : "keyboard");
        } else if (this._mode === "keyboard") this.processKeyboardHandling();
        else if (Input.isSpecialCode("escape")) {
            Input.clear();
            this.switchModes("keyboard");
        } else processHandling.call(this);
    };
    input.processKeyboardHandling = function() {
        if (Input.isSpecialCode("enter")) {
            Input.clear();
            this.onNameOk();
        } else if (Input._inputString !== undefined) {
            for (const character of Input._inputString) {
                if (this._editWindow.add(character)) this.playOkSound();
                else this.playBuzzerSound();
            }
            Input.clear();
        }
    };
    for (const method of ["cursorDown","cursorUp","cursorRight","cursorLeft","cursorPageup","cursorPagedown"]) {
        const original = input[method];
        input[method] = function(...args) {
            if (this._mode === "keyboard" && (method === "cursorPageup" || method === "cursorPagedown" || !Input.isArrowPressed())) return;
            if (Input.isNumpadPressed()) return;
            original.apply(this, args);
            this.switchModes("default");
        };
    }
    const processTouch = input.processTouch;
    input.processTouch = function() {
        if (!this.isOpenAndActive()) return;
        if (this._mode === "keyboard") {
            if ((TouchInput.isTriggered() && this.isTouchedInsideFrame()) || TouchInput.isCancelled()) this.switchModes("default");
        } else processTouch.call(this);
    };
}

function installNameSceneInput(settings) {
    const keyboard = settings.KeyboardInput;
    const onInputOk = Scene_Name.prototype.onInputOk;
    Scene_Name.prototype.onInputOk = function() {
        if (this.doesNameContainBannedWords()) this.onInputBannedWords();
        else onInputOk.call(this);
    };
    Scene_Name.prototype.doesNameContainBannedWords = function() {
        const name = this._editWindow.name().toLowerCase();
        return keyboard.BannedWords.some(word => name.includes(word.toLowerCase()));
    };
    Scene_Name.prototype.onInputBannedWords = function() { SoundManager.playBuzzer(); };
    const scene = Scene_Name.prototype;
    scene.isEnableNameInput = function() { return keyboard.EnableNameInput && !!this._inputWindow; };
    for (const [slot, label] of [[3,"TAB"],[4,"ENTER"],[5,"BKSP"]]) {
        const original = scene[`buttonAssistKey${slot}`];
        scene[`buttonAssistKey${slot}`] = function() {
            return this._inputWindow?._mode === "keyboard" ? settings.ButtonAssist[`Key${label}`] || settings.ButtonAssist.KeyUnlisted.format(label) : original.call(this);
        };
    }
    const key1 = scene.buttonAssistKey1;
    scene.buttonAssistKey1 = function() {
        return this._inputWindow?._mode === "default" ? TextManager.getInputMultiButtonStrings("pageup", "pagedown") : key1.call(this);
    };
    const text1 = scene.buttonAssistText1;
    scene.buttonAssistText1 = function() {
        return this._inputWindow?._mode === "default" ? keyboard.PageChange || "Page" : text1.call(this);
    };
    const text3 = scene.buttonAssistText3;
    scene.buttonAssistText3 = function() {
        if (!this.isEnableNameInput()) return text3.call(this);
        return this._inputWindow._mode === "keyboard" ? keyboard.Keyboard || "Keyboard" : keyboard.Manual || "Manual";
    };
    const text4 = scene.buttonAssistText4;
    scene.buttonAssistText4 = function() { return this.isEnableNameInput() ? keyboard.Finish || "Finish" : text4.call(this); };
}
