function installMessageActions(settings) {
    const base = Window_Base.prototype;
    const conversion = settings.TextCodeActions.slice().sort((a,b) => b.Match.length - a.Match.length).map(rule => ({...rule, pattern: new RegExp(`\x1b${rule.Match}`, 'gi')}));
    base.convertMessageCoreEscapeActions = function(text) {
        for (const rule of conversion) text = text.replace(rule.pattern, `\x1b${rule.Match.toUpperCase()}${rule.Type ? '' : '[0]'}`);
        return text;
    };
    const resetFont = base.resetFontSettings;
    base.resetFontSettings = function(...args) {
        this._textCasing = 0; this._textCasingUpperState = true; this._lastAltCase = false; this._colorLock = false;
        const result = resetFont.apply(this, args);
        this.contents.fontBold = false; this.contents.fontItalic = false; this.contents.outlineWidth = settings.General.DefaultOutlineWidth;
        return result;
    };
    const measure = base.textSizeEx;
    base.textSizeEx = function(...args) {
        const fields = ['fontFace','fontSize','fontBold','fontItalic','textColor','outlineColor','outlineWidth','paintOpacity'];
        const font = Object.fromEntries(fields.map(key => [key, this.contents[key]]));
        const stateFields = ['_textCasing','_textCasingUpperState','_lastAltCase','_colorLock','_textColorStack','_wordWrap','_messageMeasuring','_textAlignment'];
        const state = Object.fromEntries(stateFields.map(key => [key, key === '_textColorStack' ? this[key]?.slice() : this[key]]));
        this._messageMeasuring = true;
        try {return measure.apply(this, args);} finally {Object.assign(this.contents, font); Object.assign(this, state);}
    };
    const character = base.processCharacter;
    base.processCharacter = function(state) {
        const char = state.text[state.index];
        if (char.charCodeAt(0) < 32 || !this._textCasing) return character.call(this, state);
        let result = char;
        if (this._textCasing === 1) result = char.toLowerCase();
        if (this._textCasing === 2) {if (this._textCasingUpperState) result = char.toUpperCase(); this._textCasingUpperState = /\s/.test(char);}
        if (this._textCasing === 3) result = char.toUpperCase();
        if (this._textCasing === 4) {result = this._lastAltCase ? char.toUpperCase() : char.toLowerCase(); this._lastAltCase = !this._lastAltCase;}
        if (this._textCasing === 5) result = Math.random() < .5 ? char.toUpperCase() : char.toLowerCase();
        state.index++; state.buffer += result;
    };
    base.obtainEscapeString = function(state) {
        const match = /^<(.*?)>/.exec(state.text.slice(state.index));
        if (!match) return '';
        state.index += match[0].length;
        return match[1];
    };
    base.isColorLocked = function() {return !!this._colorLock;};
    base.setColorLock = function(value) {this._colorLock = value;};
    const changeColor = base.changeTextColor;
    base.changeTextColor = function(color) {
        if (this.isColorLocked()) return;
        (this._textColorStack ??= []).unshift(this.contents.textColor);
        return changeColor.call(this, color.replaceAll(',', ''));
    };
    base.processPreviousColor = function(state) {
        this.obtainEscapeParam(state);
        if (state.drawing && !this.isColorLocked()) this.contents.textColor = this._textColorStack?.shift() || ColorManager.normalColor();
    };
    const process = base.processEscapeCharacter;
    base.processEscapeCharacter = function(code, state) {
        if (code === 'PX' || code === 'PY') {
            const axis = code === 'PX' ? 'x' : 'y', start = code === 'PX' ? state.startX : state.startY;
            state[axis] = this.obtainEscapeParam(state) + (settings.General.RelativePXPY ? start : 0); return;
        }
        if (code === 'CASING') {this._textCasing = this.obtainEscapeParam(state); this._textCasingUpperState = true; this._lastAltCase = true; return;}
        if (code === 'COMMONEVENT') {const id = this.obtainEscapeParam(state); if (state.drawing && this.constructor === Window_Message) this.launchMessageCommonEvent(id); return;}
        if (code === 'WAIT') {const frames = this.obtainEscapeParam(state); if (state.drawing && this.constructor === Window_Message) this.startWait(frames); return;}
        if (code === 'FS') {this.contents.fontSize = this.obtainEscapeParam(state).clamp(settings.General.FontSmallerCap, settings.General.FontBiggerCap); return;}
        if (code === 'BOLD' || code === 'ITALIC') {this.contents[code === 'BOLD' ? 'fontBold' : 'fontItalic'] = !!this.obtainEscapeParam(state); return;}
        if (code === 'COLORLOCK') {this.setColorLock(!!this.obtainEscapeParam(state)); return;}
        if (code === 'PREVCOLOR') return this.processPreviousColor(state);
        const rules = settings.TextCodeActions.filter(rule => rule.Match.toUpperCase() === code);
        if (rules.length) {
            for (const rule of rules) {
                if (!rule.Type) this.obtainEscapeParam(state);
                runMessageTextScript(rule, 'ActionJS', this, [state], state.drawing ? 'drawing' : 'measurement');
                if (state.drawing && this.constructor === Window_Message && rule.CommonEvent > 0) this.launchMessageCommonEvent(rule.CommonEvent);
            }
            return;
        }
        return process.apply(this, arguments);
    };
    base.maxFontSizeInLine = function(line) {
        let maximum = this.contents.fontSize;
        for (const match of line.matchAll(/\x1b({|}|FS)(\[(\d+)])?/gi)) {
            const code = match[1].toUpperCase();
            if (code === '{') this.makeFontBigger();
            if (code === '}') this.makeFontSmaller();
            if (code === 'FS') this.contents.fontSize = Number(match[3]).clamp(settings.General.FontSmallerCap, settings.General.FontBiggerCap);
            maximum = Math.max(maximum, this.contents.fontSize);
        }
        return maximum;
    };
    base.makeFontBigger = function() {this.contents.fontSize = Math.min(this.contents.fontSize + settings.General.FontChangeValue, settings.General.FontBiggerCap);};
    base.makeFontSmaller = function() {this.contents.fontSize = Math.max(this.contents.fontSize - settings.General.FontChangeValue, settings.General.FontSmallerCap);};
    // Native Message has wait/audio side effects; measurement uses only the base style processor.
    const messageProcess = Window_Message.prototype.processEscapeCharacter;
    Window_Message.prototype.processEscapeCharacter = function(code, state) {
        if (!state.drawing) return base.processEscapeCharacter.call(this, code, state);
        return messageProcess.apply(this, arguments);
    };
}
installMessageActions(messageApi.settings);
