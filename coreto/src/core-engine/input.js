function installInput(settings) {
    const keyboard = settings.KeyboardInput;
    if (keyboard.WASD) {
        Object.assign(Input.keyMapper, {65: "left", 68: "right", 69: "pagedown", 83: "down", 87: "up"});
    }
    if (keyboard.DashToggleR) Input.keyMapper[82] = "dashToggle";
    const clear = Input.clear;
    Input.clear = function() {
        clear.call(this);
        this._inputString = undefined;
        this._inputSpecialKeyCode = undefined;
        this._gamepadWait = this.keyRepeatWait;
    };
    const update = Input.update;
    Input.update = function() {
        update.call(this);
        if (this._gamepadWait) this._gamepadWait--;
    };
    const pollGamepads = Input._pollGamepads;
    Input._pollGamepads = function() {
        if (!this._gamepadWait) pollGamepads.call(this);
    };
    const setup = Input._setupEventHandlers;
    Input._setupEventHandlers = function() {
        if (this._coretoEventsInstalled) return;
        setup.call(this);
        document.addEventListener("keypress", this._onKeyPress.bind(this));
        this._coretoEventsInstalled = true;
    };
    const onKeyDown = Input._onKeyDown;
    Input._onKeyDown = function(event) {
        this._inputSpecialKeyCode = event.keyCode;
        onKeyDown.call(this, event);
        this.setLastGamepadUsed(null);
    };
    Input._onKeyPress = function(event) { this._registerKeyInput(event); };
    Input._registerKeyInput = function(event) {
        this._inputSpecialKeyCode = event.keyCode;
        this._inputString = (this._inputString ?? "") + String.fromCharCode(event.charCode);
    };
    const shouldPreventDefault = Input._shouldPreventDefault;
    Input._shouldPreventDefault = function(code) {
        return code === 8 ? false : shouldPreventDefault.call(this, code);
    };
    Input.isSpecialCode = function(name) {
        for (const [pattern, code] of [[/backspace/i,8],[/enter/i,13],[/escape/i,27]]) {
            if (pattern.test(name)) return this._inputSpecialKeyCode === code;
        }
        return undefined;
    };
    Input.isNumpadPressed = function() { return this._inputSpecialKeyCode >= 48 && this._inputSpecialKeyCode <= 57; };
    Input.isArrowPressed = function() { return [37,38,39,40].includes(this._inputSpecialKeyCode); };
    Input.isGamepadButtonPressed = function(gamepad) { return gamepad.buttons.some(button => button.pressed); };
    Input.isGamepadAxisMoved = function(gamepad) {
        return gamepad.axes[0] < -0.5 || gamepad.axes[0] > 0.5 || gamepad.axes[1] < -0.5 || gamepad.axes[1] > 0.5;
    };
    Input.isGamepadConnected = function() {
        return Array.from(navigator.getGamepads?.() || []).some(gamepad => gamepad?.connected);
    };
    Input.isGamepadTriggered = function() {
        return Array.from(navigator.getGamepads?.() || []).some(gamepad => gamepad?.connected &&
            (this.isGamepadButtonPressed(gamepad) || this.isGamepadAxisMoved(gamepad)));
    };
    Input.setLastGamepadUsed = function(gamepad) { this._lastGamepad = gamepad; };
    Input.getLastUsedGamepadType = function() { return this._lastGamepad ? this._lastGamepad.id : "Keyboard"; };
    const updateGamepad = Input._updateGamepadState;
    Input._updateGamepadState = function(gamepad) {
        updateGamepad.call(this, gamepad);
        if (this.isGamepadButtonPressed(gamepad) || this.isGamepadAxisMoved(gamepad)) this.setLastGamepadUsed(gamepad);
    };
    const isGameActive = SceneManager.isGameActive;
    SceneManager.isGameActive = function() { return settings.QoL.RequireFocus ? isGameActive.call(this) : true; };
    PluginManager.registerCommand(catalog.pluginId, "DebugConsoleLastControllerID", function() {
        if (!$gameTemp.isPlaytest()) return;
        const id = Input.getLastUsedGamepadType();
        console.log(id);
        navigator.clipboard?.writeText(id).catch(error => console.warn(`Controller ID clipboard: ${error.message}`));
    });
}
