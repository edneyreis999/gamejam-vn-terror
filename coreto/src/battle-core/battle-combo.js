function installBattleCombo(settings) {
    const config = settings.ComboWindow;
    class Window_DamageCounter extends Window_Base {
        initialize(rect) {
            super.initialize(rect);
            this.opacity = 0;
            this._homeX = rect.x;
            this._homeY = rect.y;
            this.resetCounter();
        }
        resetCounter() {
            this._targetHits = this._totalHits = 0;
            this._targetDamage = this._totalDamage = 0;
            this._updateDuration = this._visibleDuration = 0;
            this.contents.clear();
        }
        resetFontSettings() {
            super.resetFontSettings();
            if (config.CustomFontFace) this.contents.fontFace = config.CustomFontFace;
        }
        increaseHits(hits) { this._targetHits += hits; this._updateDuration = config.updateDuration; this._visibleDuration = config.minimumStayDuration; }
        increaseTotal(damage) { this._targetDamage += damage; this._updateDuration = config.updateDuration; this._visibleDuration = config.minimumStayDuration; }
        textAlignment() { return config.TextAlign; }
        hitText() { return (this._targetDamage < 0 ? config.hitsHealFmt : config.hitsDmgFmt).format(Math.round(this._totalHits)); }
        damageText() { return (this._targetDamage < 0 ? config.totalHealFmt : config.totalDmgFmt).format(Math.abs(Math.round(this._totalDamage))); }
        visibilityState() { return config.Enable && this._totalHits >= config.minimumHits && (this._visibleDuration > 0 || !!BattleManager._subject); }
        updateCounter() {
            if (this._updateDuration > 0) {
                this._totalHits = this._targetHits;
                this._totalDamage += (this._targetDamage-this._totalDamage)/this._updateDuration;
                this._updateDuration--;
                this.refresh();
            }
        }
        updateOpacity() {
            if (this.visibilityState()) {
                this.contentsOpacity += config.opacitySpeed;
                this.x = this._homeX;
                this.y = this._homeY;
            } else {
                this.contentsOpacity -= config.opacitySpeed;
                this.x += config.fadeShiftX;
                this.y += config.fadeShiftY;
            }
        }
        update() {
            super.update();
            this.updateCounter();
            if (!BattleManager._subject && this._updateDuration === 0 && this._visibleDuration > 0) this._visibleDuration--;
            this.updateOpacity();
        }
        drawComboText(text,y) {
            const width = this.textSizeEx(text).width;
            const align = this.textAlignment();
            const x = align === 'right' ? this.innerWidth-width : align === 'center' ? (this.innerWidth-width)/2 : 0;
            this.drawTextEx(text,Math.max(0,x),y,this.innerWidth);
        }
        refresh() {
            this.contents.clear();
            if (config.ComboWindow_DrawJS) config.ComboWindow_DrawJS.call(this);
            else {
                this.drawComboText(this.hitText(),0);
                this.drawComboText(this.damageText(),this.lineHeight());
            }
        }
    }
    globalThis.Window_DamageCounter = Window_DamageCounter;
    const scene = Scene_Battle.prototype;
    scene.comboWindowOffsetX = function() { return config.PosOffsetX; };
    scene.comboWindowOffsetY = function() { return config.PosOffsetY; };
    scene.damageCounterWindowRect = function() { return config.ComboWindow_RectJS.call(this); };
    const createWindows = scene.createAllWindows;
    scene.createAllWindows = function() {
        createWindows.call(this);
        this._damageCounterWindow = new Window_DamageCounter(this.damageCounterWindowRect());
        this.addWindow(this._damageCounterWindow);
    };
    const counter = () => SceneManager._scene instanceof Scene_Battle ? SceneManager._scene._damageCounterWindow : null;
    globalThis.$comboWindowReset = () => counter()?.resetCounter();
    globalThis.$comboWindowIncreaseHits = hits => counter()?.increaseHits(hits);
    globalThis.$comboWindowIncreaseDamage = damage => counter()?.increaseTotal(damage);
    globalThis.$comboWindowIncreaseHealing = healing => counter()?.increaseTotal(-healing);
    const startAction = BattleManager.startAction;
    BattleManager.startAction = function() { $comboWindowReset(); return startAction.call(this); };
    const executeHpDamage = Game_Action.prototype.executeHpDamage;
    Game_Action.prototype.executeHpDamage = function(target,value) {
        executeHpDamage.call(this,target,value);
        if ($gameParty.inBattle()) {
            $comboWindowIncreaseHits(1);
            $comboWindowIncreaseDamage(value);
        }
    };
}
