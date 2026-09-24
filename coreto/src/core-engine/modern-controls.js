function installModernControls(settings) {
    if (settings.QoL.ModernControls) Object.assign(Input.keyMapper, {35:"end",36:"home"});
    Window_Selectable.prototype.isUseModernControls = function() { return settings.QoL.ModernControls; };
    Window_Selectable.prototype.allowShiftScrolling = function() { return true; };
    const processCursorMove = Window_Selectable.prototype.processCursorMove;
    Window_Selectable.prototype.processCursorMove = function() {
        if (this.isUseModernControls()) {
            this.processCursorMoveModernControls();
            this.processCursorHomeEndTrigger();
        } else processCursorMove.call(this);
    };
    Window_Selectable.prototype.processCursorMoveModernControls = function() {
        if (!this.isCursorMovable()) return;
        const before = this.index();
        for (const direction of ["down","up","right","left"]) {
            if (!Input.isRepeated(direction)) continue;
            if (["down","up"].includes(direction) && Input.isPressed("shift") && this.allowShiftScrolling()) {
                this[direction === "down" ? "cursorPagedown" : "cursorPageup"]();
            } else this[`cursor${direction[0].toUpperCase()}${direction.slice(1)}`](Input.isTriggered(direction));
        }
        if (!this.isHandled("pagedown") && Input.isRepeated("pagedown")) this.cursorPagedown();
        if (!this.isHandled("pageup") && Input.isRepeated("pageup")) this.cursorPageup();
        if (this.index() !== before) this.playCursorSound();
    };
    Window_Selectable.prototype.processCursorHomeEndTrigger = function() {
        if (!this.isCursorMovable()) return;
        const before = this.index();
        if (Input.isTriggered("home")) this.smoothSelect(Math.min(this.index(), 0));
        if (Input.isTriggered("end")) this.smoothSelect(Math.max(this.index(), this.maxItems() - 1));
        if (this.index() !== before) this.playCursorSound();
    };
    const processTouch = Window_Selectable.prototype.processTouch;
    Window_Selectable.prototype.processTouchModernControls = function() { processTouch.call(this); };
    Window_Selectable.prototype.processTouch = function() {
        if (this.isUseModernControls()) this.processTouchModernControls();
        else processTouch.call(this);
    };
    Window_NumberInput.prototype.isUseModernControls = function() { return false; };
}
