function installNumberInput(settings) {
    if (!settings.KeyboardInput.EnableNumberInput) return;
    const input = Window_NumberInput.prototype;
    const start = input.start;
    input.start = function() {
        start.call(this);
        Input.clear();
        this.select(this._maxDigits - 1);
    };
    const processDigitChange = input.processDigitChange;
    input.processDigitChange = function() {
        if (!this.isOpenAndActive()) return;
        if (Input.isNumpadPressed()) this.processKeyboardDigitChange();
        else if (Input.isSpecialCode("backspace")) this.processKeyboardBackspace();
        else if (Input._inputSpecialKeyCode === 46) this.processKeyboardDelete();
        else if (Input._inputSpecialKeyCode === 36) this.processKeyboardHome();
        else if (Input._inputSpecialKeyCode === 35) this.processKeyboardEnd();
        else processDigitChange.call(this);
    };
    const processCursorMove = Object.hasOwn(input, 'processCursorMove') ? input.processCursorMove : null;
    input.processCursorMove = function() {
        if (!this.isOpenAndActive()) return;
        if (Input.isNumpadPressed()) this.processKeyboardDigitChange();
        else {
            Input._inputString = undefined;
            (processCursorMove ?? Window_Selectable.prototype.processCursorMove).call(this);
        }
    };
    input.processCursorHomeEndTrigger = function() {};
    input.finishKeyboardNumberChange = function(index = this._maxDigits - 1) {
        Input.clear();
        this.refresh();
        this.playCursorSound();
        this.select(index);
    };
    input.processKeyboardDigitChange = function() {
        const prefix = this._number === 0 ? "" : String(this._number);
        if (Input._inputString === undefined) return;
        if (!/^\d+$/.test(Input._inputString) || prefix.length >= this._maxDigits) {
            Input.clear();
            return;
        }
        const number = Number(prefix + Input._inputString);
        if (Number.isNaN(number)) {
            Input.clear();
            return;
        }
        this._number = number.clamp(0, Number("9".repeat(this._maxDigits)));
        this.finishKeyboardNumberChange();
    };
    input.processKeyboardBackspace = function() {
        this._number = Math.max(0, Number(String(this._number).slice(0, -1)));
        this.finishKeyboardNumberChange();
    };
    input.processKeyboardDelete = function() {
        this._number = Math.max(0, Number(String(this._number).substring(1)));
        this.finishKeyboardNumberChange();
    };
    input.processKeyboardHome = function() {
        if (this.index() !== 0) this.finishKeyboardNumberChange(0);
    };
    input.processKeyboardEnd = function() {
        if (this.index() !== this._maxDigits - 1) this.finishKeyboardNumberChange();
    };
}
