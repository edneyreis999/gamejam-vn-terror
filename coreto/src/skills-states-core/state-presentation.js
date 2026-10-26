function installSkillsStatesStatePresentation(settings, buffs) {
    const colorValue = color => color.startsWith('#') ? color : ColorManager.textColor(Number(color));
    ColorManager.stateColor = state => {
        if (typeof state === 'number') state = $dataStates[state];
        const override = /<TURN COLOR:\s*([^>]+)>/i.exec(state.note);
        const classification = skillsStatesStateClassification(state);
        return colorValue(override ? override[1].trim() : settings[classification > 0 ? 'ColorPositive' : classification < 0 ? 'ColorNegative' : 'ColorNeutral']);
    };
    ColorManager.buffColor = () => colorValue(buffs.ColorBuff);
    ColorManager.debuffColor = () => colorValue(buffs.ColorDebuff);
    function drawValue(bitmap, text, x, y, width, height, color, config, kind, align) {
        const saved = {fontFace: bitmap.fontFace, fontSize: bitmap.fontSize, textColor: bitmap.textColor, fontBold: bitmap.fontBold, outlineColor: bitmap.outlineColor};
        bitmap.fontFace = $gameSystem.mainFontFace(); bitmap.fontSize = config[kind + 'FontSize'];
        bitmap.textColor = color; bitmap.fontBold = true; bitmap.outlineColor = 'rgba(0, 0, 0, 1)';
        bitmap.drawText(text, x + config[kind + 'OffsetX'], y + config[kind + 'OffsetY'], width, height, align);
        Object.assign(bitmap, saved);
    }
    function drawValues(bitmap, actor, state, x, y, width, height, turns = true) {
        if (turns && settings.ShowTurns && actor.isStateAffected(state.id) && state.autoRemovalTiming && !/<HIDE STATE TURNS>/i.test(state.note)) {
            drawValue(bitmap, actor.stateTurns(state.id), x, y, width, height, ColorManager.stateColor(state), settings, 'Turn', 'right');
        }
        if (settings.ShowData) drawValue(bitmap, String(actor.getStateDisplay(state.id)), x, y, width, height, ColorManager.normalColor(), settings, 'Data', 'center');
    }
    function drawBuffValues(bitmap, actor, paramId, x, y, width, height) {
        const color = actor._buffs[paramId] > 0 ? ColorManager.buffColor() : ColorManager.debuffColor();
        if (buffs.ShowTurns) drawValue(bitmap, actor._buffTurns[paramId], x, y, width, height, color, buffs, 'Turn', 'right');
        if (buffs.ShowData) drawValue(bitmap, Math.round(actor.paramBuffRate(paramId) * 100) + '%', x, y, width, height, color, buffs, 'Data', 'center');
    }
    const buffIds = actor => actor._buffs.map((level, id) => level ? id : -1).filter(id => id >= 0);
    const drawIcons = Window_StatusBase.prototype.drawActorIcons;
    Window_Base.prototype.drawActorIcons = Window_StatusBase.prototype.drawActorIcons = function(actor, x, y, width) {
        if (!actor) return;
        drawIcons.call(this, actor, x, y, width);
        const size = ImageManager.standardIconWidth;
        const states = actor.states().filter(state => state.iconIndex > 0).slice(0, Math.floor((width || 144) / size));
        const counted = new Set();
        states.forEach((state, index) => {
            drawValues(this.contents, actor, state, x + index * size, y, size, this.lineHeight(), !counted.has(state));
            counted.add(state);
        });
        const offset = actor.stateIcons().length, maximum = Math.floor((width || 144) / size);
        buffIds(actor).slice(0, Math.max(0, maximum - offset)).forEach((paramId, index) => drawBuffValues(this.contents, actor, paramId, x + (offset + index) * size, y, size, this.lineHeight()));
    };
    const initialize = Sprite_StateIcon.prototype.initialize;
    Sprite_StateIcon.prototype.initialize = function() {
        initialize.call(this);
        this._coretoStateText = new Sprite(new Bitmap(ImageManager.iconWidth, Window_Base.prototype.lineHeight()));
        this._coretoStateText.x = -ImageManager.iconWidth / 2;
        this._coretoStateText.y = -this._coretoStateText.bitmap.height / 2;
        this.addChild(this._coretoStateText);
    };
    const update = Sprite_StateIcon.prototype.update;
    Sprite_StateIcon.prototype.update = function() {
        update.call(this);
        const states = this._battler?.states().filter(state => state.iconIndex > 0) || [];
        const state = states[this._animationIndex];
        const paramId = this._battler ? buffIds(this._battler)[this._animationIndex - states.length] : undefined;
        const key = JSON.stringify([state?.id, state && this._battler._stateTurns[state.id], state && this._battler.getStateDisplay(state.id), paramId, paramId !== undefined && this._battler._buffTurns[paramId], paramId !== undefined && this._battler.paramBuffRate(paramId)]);
        if (key !== this._coretoStateTextKey) {
            this._coretoStateTextKey = key;
            const bitmap = this._coretoStateText.bitmap;
            bitmap.clear();
            if (state) drawValues(bitmap, this._battler, state, 0, 0, bitmap.width, bitmap.height);
            else if (paramId !== undefined) drawBuffValues(bitmap, this._battler, paramId, 0, 0, bitmap.width, bitmap.height);
        }
    };
    const destroy = Sprite_StateIcon.prototype.destroy;
    Sprite_StateIcon.prototype.destroy = function(options) {
        this.removeChild(this._coretoStateText);
        this._coretoStateText.bitmap.destroy();
        this._coretoStateText.destroy();
        destroy.call(this, options);
    };
}
