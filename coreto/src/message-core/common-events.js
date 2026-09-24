function Game_MessageCommonEvent(commonEventId, eventId) {
    this.initialize(commonEventId, eventId);
}
Game_MessageCommonEvent.prototype.initialize = function(commonEventId, eventId) {
    this._commonEventId = commonEventId;
    this._eventId = eventId || 0;
    this.refresh();
};
Game_MessageCommonEvent.prototype.event = function() { return $dataCommonEvents[this._commonEventId]; };
Game_MessageCommonEvent.prototype.list = function() { return this.event().list; };
Game_MessageCommonEvent.prototype.refresh = function() {
    this._interpreter = new Game_Interpreter();
    this._interpreter.setup(this.list(), this._eventId);
};
Game_MessageCommonEvent.prototype.clear = function() { this._interpreter = null; };
Game_MessageCommonEvent.prototype.update = function() {
    if (!this._interpreter) return;
    if (this._interpreter.isRunning()) this._interpreter.update();
    else this.clear();
};
globalThis.Game_MessageCommonEvent = Game_MessageCommonEvent;

function installMessageCommonEvents() {
    const clearMessage = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function(...args) {
        const result = clearMessage.apply(this, args);
        this._messageEventContext = null;
        return result;
    };
    for (const method of ['initialize', 'setupEvents']) {
        const previous = Game_Map.prototype[method];
        Game_Map.prototype[method] = function(...args) {
            this._messageCommonEvents = [];
            return previous.apply(this, args);
        };
    }
    Game_Map.prototype.addMessageCommonEvent = function(id, eventId = this._interpreter.eventId()) {
        if (!$dataCommonEvents[id]) return;
        (this._messageCommonEvents ??= []).push(new Game_MessageCommonEvent(id, eventId));
    };
    Game_Map.prototype.updateMessageCommonEvents = function() {
        const events = this._messageCommonEvents ?? [];
        for (const event of [...events]) event.update();
        this._messageCommonEvents = events.filter(event => event._interpreter);
    };
    const update = Game_Map.prototype.updateEvents;
    Game_Map.prototype.updateEvents = function(...args) {
        const result = update.apply(this, args);
        this.updateMessageCommonEvents();
        return result;
    };
    Window_Message.prototype.launchMessageCommonEvent = function(id) {
        if ($gameParty.inBattle()) return;
        const context = $gameMessage._messageEventContext;
        const eventId = context?.mapId === $gameMap.mapId() ? context.eventId : $gameMap._interpreter.eventId();
        $gameMap.addMessageCommonEvent(id, eventId);
    };
}
installMessageCommonEvents();
