function keyboardCodeNames() {
    const names = Array(256).fill("");
    Object.assign(names, {
        3: "CANCEL", 6: "HELP", 8: "BACKSPACE", 9: "TAB",
        12: "CLEAR", 13: "ENTER", 14: "ENTER_SPECIAL", 16: "SHIFT",
        17: "CTRL", 18: "ALT", 19: "PAUSE", 20: "CAPSLOCK",
        21: "KANA", 22: "EISU", 23: "JUNJA", 24: "FINAL",
        25: "HANJA", 27: "ESC", 28: "CONVERT", 29: "NONCONVERT",
        30: "ACCEPT", 31: "MODECHANGE", 32: "SPACE", 33: "PGUP",
        34: "PGDN", 35: "END", 36: "HOME", 37: "LEFT",
        38: "UP", 39: "RIGHT", 40: "DOWN", 41: "SELECT",
        42: "PRINT", 43: "EXECUTE", 44: "PRINTSCREEN", 45: "INSERT",
        46: "DELETE", 58: "COLON", 59: "SEMICOLON", 60: "LESS_THAN",
        61: "EQUALS", 62: "GREATER_THAN", 63: "QUESTION_MARK", 64: "AT",
        91: "OS_KEY", 93: "CONTEXT_MENU", 95: "SLEEP", 106: "MULTIPLY",
        107: "ADD", 108: "SEPARATOR", 109: "SUBTRACT", 110: "DECIMAL",
        111: "DIVIDE", 144: "NUM_LOCK", 145: "SCROLL_LOCK", 146: "WIN_OEM_FJ_JISHO",
        147: "WIN_OEM_FJ_MASSHOU", 148: "WIN_OEM_FJ_TOUROKU", 149: "WIN_OEM_FJ_LOYA", 150: "WIN_OEM_FJ_ROYA",
        160: "CIRCUMFLEX", 161: "EXCLAMATION", 162: "DOUBLE_QUOTE", 163: "HASH",
        164: "DOLLAR", 165: "PERCENT", 166: "AMPERSAND", 167: "UNDERSCORE",
        168: "OPEN_PAREN", 169: "CLOSE_PAREN", 170: "ASTERISK", 171: "PLUS",
        172: "PIPE", 173: "HYPHEN_MINUS", 174: "OPEN_CURLY_BRACKET", 175: "CLOSE_CURLY_BRACKET",
        176: "TILDE", 181: "VOLUME_MUTE", 182: "VOLUME_DOWN", 183: "VOLUME_UP",
        186: "SEMICOLON", 187: "EQUALS", 188: "COMMA", 189: "MINUS",
        190: "PERIOD", 191: "SLASH", 192: "BACK_QUOTE", 219: "OPEN_BRACKET",
        220: "BACK_SLASH", 221: "CLOSE_BRACKET", 222: "QUOTE", 224: "META",
        225: "ALTGR", 227: "WIN_ICO_HELP", 228: "WIN_ICO_00", 230: "WIN_ICO_CLEAR",
        233: "WIN_OEM_RESET", 234: "WIN_OEM_JUMP", 235: "WIN_OEM_PA1", 236: "WIN_OEM_PA2",
        237: "WIN_OEM_PA3", 238: "WIN_OEM_WSCTRL", 239: "WIN_OEM_CUSEL", 240: "WIN_OEM_ATTN",
        241: "WIN_OEM_FINISH", 242: "WIN_OEM_COPY", 243: "WIN_OEM_AUTO", 244: "WIN_OEM_ENLW",
        245: "WIN_OEM_BACKTAB", 246: "ATTN", 247: "CRSEL", 248: "EXSEL",
        249: "EREOF", 250: "PLAY", 251: "ZOOM", 253: "PA1",
        254: "WIN_OEM_CLEAR"
    });
    for (let code = 48; code <= 57; code++) names[code] = String(code - 48);
    for (let code = 65; code <= 90; code++) names[code] = String.fromCharCode(code);
    for (let index = 0; index < 10; index++) names[96 + index] = `NUMPAD${index}`;
    for (let index = 0; index < 24; index++) names[112 + index] = `F${index + 1}`;
    return names;
}

function installInputLabels(settings) {
    const assist = settings.ButtonAssist;
    if (assist.SplitEscape) {
        const actions = Object.values(Input.keyMapper);
        if (!actions.includes("menu") || !actions.includes("cancel")) {
            throw new CoreError("CORE_INPUT_MAPPING", "SplitEscape requires separate menu and cancel keys in Input.keyMapper.", {field:"/ButtonAssist/SplitEscape"});
        }
    }
    const profiles = new Map();
    const matches = new Map();
    for (const data of settings.ControllerButtons) {
        const name = data.Name.toLowerCase().trim();
        profiles.set(name, data);
        matches.set(data.Match.toLowerCase().trim(), name);
    }
    TextManager.stringKeyMap = keyboardCodeNames();
    TextManager.buttonAssistOk = assist.OkText;
    TextManager.buttonAssistCancel = assist.CancelText;
    TextManager.buttonAssistSwitch = assist.SwitchActorText;
    TextManager.makeInputButtonString = function(names) {
        const name = ["UP","DOWN","LEFT","RIGHT"].find(direction => names.includes(direction)) ?? names.pop();
        return assist[`Key${name}`] || assist.KeyUnlisted.format(name);
    };
    TextManager.getKeyboardInputButtonString = function(action) {
        if (!assist.SplitEscape && ["cancel","menu"].includes(action)) action = "escape";
        const names = Object.keys(Input.keyMapper).map(Number)
            .filter(code => !(code >= 96 && code <= 105) && ![18,32].includes(code) && Input.keyMapper[code] === action)
            .map(code => this.stringKeyMap[code]);
        return this.makeInputButtonString(names);
    };
    TextManager.getControllerInputButtonString = function(id, action) {
        const profile = profiles.get(id.toLowerCase().trim());
        return profile ? profile[action] || this.getKeyboardInputButtonString(action) : this.getControllerInputButtonMatch(id, action);
    };
    TextManager.getControllerInputButtonMatch = function(id, action) {
        const normalized = id.toLowerCase().trim();
        for (const [match, name] of matches) {
            if (normalized.includes(match)) return profiles.get(name)[action] || this.getKeyboardInputButtonString(action);
        }
        return this.getKeyboardInputButtonString(action);
    };
    TextManager.getInputButtonString = function(action) {
        const id = Input.getLastUsedGamepadType();
        return id === "Keyboard" ? this.getKeyboardInputButtonString(action) : this.getControllerInputButtonString(id, action);
    };
    TextManager.getInputMultiButtonStrings = function(first, second) {
        return assist.MultiKeyFmt.format(this.getInputButtonString(first), this.getInputButtonString(second));
    };
}
