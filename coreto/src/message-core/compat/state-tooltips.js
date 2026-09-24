function installStateTooltipOwnership() {
    const boot = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function(...args) {
        const result = boot.apply(this, args);
        if (!Imported.VisuMZ_3_StateTooltips || messageApi.stateTooltipOwnershipInstalled) return result;
        messageApi.stateTooltipOwnershipInstalled = true;
        const tooltip = Window_StateTooltip.prototype;
        tooltip.cancelMessageTooltipSelection = function() {
            if (this._messageTooltipTimer !== undefined) clearTimeout(this._messageTooltipTimer);
            delete this._messageTooltipTimer;
        };
        tooltip.moveStateTooltipToBattler = function(battler) {
            this.cancelMessageTooltipSelection();
            const scene = SceneManager._scene, x = TouchInput.x, y = TouchInput.y;
            this._messageTooltipTimer = setTimeout(() => {
                delete this._messageTooltipTimer;
                if (this._destroyed || SceneManager._scene !== scene || scene._stateTooltipWindow !== this || !battler || battler.isDead() || !battler.isAppeared()) return;
                if (TouchInput.x !== x || TouchInput.y !== y || this.getShowSelectStateTooltipBattler() !== battler) return;
                this.processShowSelectStateTooltipBattler(battler, x, y);
            }, Window_StateTooltip.SELECT_DELAY_BEFORE_SHOW);
        };
        const setBattler = tooltip.setBattler;
        tooltip.setBattler = function(battler) {
            this.cancelMessageTooltipSelection();
            if (this._destroyed) return;
            return setBattler.call(this, battler);
        };
        const destroy = tooltip.destroy;
        tooltip.destroy = function(...args) {
            this.cancelMessageTooltipSelection();
            this._battler = null;
            return destroy.apply(this, args);
        };
        const terminate = Scene_Base.prototype.terminate;
        Scene_Base.prototype.terminate = function(...args) {
            this._stateTooltipWindow?.cancelMessageTooltipSelection();
            return terminate.apply(this, args);
        };
        // Hit testing is cheap and uses PIXI's current world transform. It also detects
        // scrolling/parent transforms with a stationary pointer, unlike x/y caching.
        Window_Selectable.prototype.processTouchStateTooltips = function() {
            if (!this.isStateTooltipEnabled() || SceneManager._scene?._stateTooltipWindow?._touchMoveClose) return;
            this._cache_StateTooltips ??= {};
            const cache = this._cache_StateTooltips;
            if (this.isOpen() && this.visible && this.isStateTooltipTouched()) {
                const battler = this.getStateTooltipBattler();
                if (battler && (cache.battler !== battler || SceneManager.currentTooltipBattler() !== battler)) this.openTouchStateTooltips();
                else if (!battler && cache.battler) this.closeTouchStateTooltips();
            } else if (cache.battler) this.closeTouchStateTooltips();
        };
        const close = Window_Selectable.prototype.closeTouchStateTooltips;
        Window_Selectable.prototype.closeTouchStateTooltips = function() {
            const battler = this._cache_StateTooltips?.battler;
            if (battler && SceneManager.currentTooltipBattler() !== battler) {
                this._cache_StateTooltips = {};
                return;
            }
            return close.call(this);
        };
        return result;
    };
}
installStateTooltipOwnership();
