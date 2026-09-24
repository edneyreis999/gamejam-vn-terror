function installExtendedTail() {
    Game_System.prototype.getMessageTailSettings = function() {
        if (this._messageTailSettings === undefined) this._messageTailSettings = JsonEx.makeDeepCopy(extendedApi.settings.MsgTail);
        return this._messageTailSettings;
    };
    Game_System.prototype.setMessageTailSettings = function(settings) {
        this._messageTailSettings = JsonEx.makeDeepCopy(settings);
    };
    extendedApi.registerCommand('MessageTailSettings', function(args) {
        $gameSystem.setMessageTailSettings(args.Settings);
    });
    const initialize = Window_Message.prototype.initialize;
    Window_Message.prototype.initialize = function(rect) {
        initialize.call(this,rect);
        this.createMessageTailSprite();
    };
    Window_Message.prototype.createMessageTailSprite = function() {
        this._messageTailSprite = new Sprite();
        this._messageTailSprite.visible = false;
        this.addChild(this._messageTailSprite);
    };
    Window_Message.prototype.resetMessageTailSettings = function() {
        this._messageTail = {visible:false,lastFile:'',location:'bottom',direction:'left',positionX:'auto'};
    };
    Window_Message.prototype.parseMessageTailTextCodes = function(state) {
        state.text = this.convertVariableEscapeCharacters(state.text);
        state.text = this.convertMessageTailEscapeCodes(state.text);
    };
    Window_Message.prototype.convertMessageTailEscapeCodes = function(text) {
        text = text.replace(/<TAIL (?:BL|BOTTOM LEFT|DL|DOWN LEFT):[ ](\d+)>/gi, (_, x) => { this.setupMessageTailSettings(true,true,x); return ''; });
        text = text.replace(/<TAIL (?:BR|BOTTOM RIGHT|DL|DOWN RIGHT):[ ](\d+)>/gi, (_, x) => { this.setupMessageTailSettings(true,false,x); return ''; });
        text = text.replace(/<TAIL (?:UL|UPPER LEFT|UP LEFT):[ ](\d+)>/gi, (_, x) => { this.setupMessageTailSettings(false,true,x); return ''; });
        return text.replace(/<TAIL (?:UR|UPPER RIGHT|UP RIGHT):[ ](\d+)>/gi, (_, x) => { this.setupMessageTailSettings(false,false,x); return ''; });
    };
    Window_Message.prototype.setupMessageTailSettings = function(bottom,left,x) {
        if (!this._messageTail) this.resetMessageTailSettings();
        this._messageTail.visible = true;
        this._messageTail.location = bottom ? 'bottom' : 'upper';
        this._messageTail.direction = left ? 'left' : 'right';
        this._messageTail.positionX = Number(x);
    };
    Window_Message.prototype.usesAutoPositionMessageTail = function() {
        const settings = $gameSystem.getMessageTailSettings();
        if (!settings || !settings.autoPositionTail) return false;
        return (settings['bottom'+(settings.autoPositionLeft?'Left':'Right')+'Filename'] || '').trim() !== '';
    };
    const updateAutoPosition = Window_Message.prototype.updateAutoPosition;
    Window_Message.prototype.updateAutoPosition = function() {
        updateAutoPosition.call(this);
        if (!this._autoPositionTarget || !this._messageTailSprite || !this._messageTail) return;
        if (this.usesAutoPositionMessageTail()) {
            const settings = $gameSystem.getMessageTailSettings();
            Object.assign(this._messageTail,{visible:true,lastFile:'',location:'bottom',direction:settings.autoPositionLeft?'left':'right',positionX:'auto'});
        }
    };
    for (const axis of ['X','Y']) {
        const method = 'autoPositionOffset'+axis, previous = Window_Message.prototype[method];
        Window_Message.prototype[method] = function() {
            let offset = previous.call(this);
            const settings = $gameSystem.getMessageTailSettings();
            if (settings && settings.autoPositionTail) offset += settings[method];
            return offset;
        };
    }
    const clamp = Window_Message.prototype.clampPlacementPosition;
    Window_Message.prototype.clampPlacementPosition = function(x,y) {
        this._correctAutoMessageTailOffsetX = 0;
        const before = this.x;
        clamp.call(this,x,y);
        this._correctAutoMessageTailOffsetX = before - this.x;
    };
    Window_Message.prototype.updateMessageTailSprite = function() {
        if (!this._messageTailSprite || !this._messageTail) return;
        this.updateMessageTailBitmap();
        this.updateMessageTailVisibility();
        this.updateMessageTailPosition();
    };
    Window_Message.prototype.getMessageTailMainKey = function() {
        return (this._messageTail.location === 'upper' ? 'upper' : 'bottom') + (this._messageTail.direction === 'left' ? 'Left' : 'Right');
    };
    Window_Message.prototype.updateMessageTailBitmap = function() {
        const sprite = this._messageTailSprite, tail = this._messageTail;
        const filename = $gameSystem.getMessageTailSettings()[this.getMessageTailMainKey()+'Filename'];
        if (tail.lastFile === filename) return;
        tail.lastFile = filename;
        sprite.bitmap = filename ? ImageManager.loadSystem(filename) : new Bitmap(1,1);
    };
    Window_Message.prototype.updateMessageTailVisibility = function() {
        this._messageTailSprite.visible = this._messageTail.visible && this.openness === 255;
    };
    Window_Message.prototype.updateMessageTailPosition = function() {
        const sprite = this._messageTailSprite, tail = this._messageTail;
        const settings = $gameSystem.getMessageTailSettings(), key = this.getMessageTailMainKey();
        sprite.anchor.x = settings[key+'AnchorX'];
        sprite.anchor.y = settings[key+'AnchorY'];
        if (tail.positionX === 'auto') {
            sprite.x = Math.round(this.width / 2);
            sprite.x += this.correctAutoMessageTailOffsetX();
        } else {
            tail.positionX = Number(tail.positionX);
            sprite.x = Math.round(tail.positionX);
        }
        sprite.y = tail.location === 'upper' ? 0 : this.height;
        sprite.x += settings[key+'OffsetX'];
        sprite.y += settings[key+'OffsetY'];
    };
    Window_Message.prototype.correctAutoMessageTailOffsetX = function() {
        return ($gameSystem.getMessageTailSettings().autoCorrectX ?? true) ? this._correctAutoMessageTailOffsetX || 0 : 0;
    };
    const update = Window_Message.prototype.update;
    Window_Message.prototype.update = function() {
        update.call(this);
        this.updateMessageTailSprite();
    };
}
installExtendedTail();
