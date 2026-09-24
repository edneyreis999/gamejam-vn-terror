function installWindowEasing() {
    Window_Base.prototype.initCoreEasing = function() {
        this.setupCoreEasing(0, "LINEAR", this.x, this.y, this.scale.x, this.scale.y,
            this.opacity, this.backOpacity, this.contentsOpacity);
    };
    Window_Base.prototype.setupCoreEasing = function(duration, type, targetX, targetY, targetScaleX, targetScaleY, targetOpacity, targetBackOpacity, targetContentsOpacity) {
        this._coreEasing = { duration, wholeDuration: duration, type, targetX, targetY,
            targetScaleX, targetScaleY, targetOpacity, targetBackOpacity, targetContentsOpacity };
    };
    Window_Base.prototype.calcCoreEasing = function(progress) {
        return this._coreEasing ? applyEasing(progress, this._coreEasing.type || "LINEAR") : progress;
    };
    Window_Base.prototype.applyCoreEasing = function(current, target) {
        const state = this._coreEasing;
        if (!state) return target;
        const before = this.calcCoreEasing((state.wholeDuration - state.duration) / state.wholeDuration);
        const after = this.calcCoreEasing((state.wholeDuration - state.duration + 1) / state.wholeDuration);
        const start = (current - target * before) / (1 - before);
        return start + (target - start) * after;
    };
    Window_Base.prototype.updateCoreEasing = function() {
        const state = this._coreEasing;
        if (!state || state.duration <= 0) return;
        this.x = this.applyCoreEasing(this.x, state.targetX);
        this.y = this.applyCoreEasing(this.y, state.targetY);
        this.scale.x = this.applyCoreEasing(this.scale.x, state.targetScaleX);
        this.scale.y = this.applyCoreEasing(this.scale.y, state.targetScaleY);
        this.opacity = this.applyCoreEasing(this.opacity, state.targetOpacity);
        this.backOpacity = this.applyCoreEasing(this.backOpacity, state.targetBackOpacity);
        this.contentsOpacity = this.applyCoreEasing(this.contentsOpacity, state.targetContentsOpacity);
        state.duration--;
    };
    Window_Base.prototype.anchorCoreEasing = function(duration, type) {
        const state = this._coreEasing;
        this.x = state.targetX;
        this.y = state.targetY;
        this.scale.set(state.targetScaleX, state.targetScaleY);
        this.opacity = state.targetOpacity;
        this.backOpacity = state.targetBackOpacity;
        this.contentsOpacity = state.targetContentsOpacity;
        this.setupCoreEasing(duration, type, this.x, this.y, this.scale.x, this.scale.y,
            this.opacity, this.backOpacity, this.contentsOpacity);
    };
    const initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(...args) {
        initialize.apply(this, args);
        this.initCoreEasing();
    };
    const update = Window_Base.prototype.update;
    Window_Base.prototype.update = function() {
        update.call(this);
        this.updateCoreEasing();
    };
}
