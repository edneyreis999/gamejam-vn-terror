function installEventsMoveCalls() {
    let nextRead = 0;
    const reads = new Map();
    const clear = Game_Interpreter.prototype.clear;
    Game_Interpreter.prototype.clear = function() {
        if (this._childInterpreter) this._childInterpreter.clear();
        if (this._callEventMap) {
            if (globalThis[this._callEventMap]) { delete globalThis[this._callEventMap]; reads.delete(this._callEventMap); }
            else reads.set(this._callEventMap, null);
        }
        this._callEventMap = this._callEventData = undefined;
        clear.call(this);
    };
    const setupMap = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        if (mapId !== this.mapId()) {
            let interpreter = this._interpreter;
            while (interpreter && !interpreter._callEventMap) interpreter = interpreter._childInterpreter;
            if (interpreter) this._interpreter.clear();
            for (const owner of [...reads.values()]) if (owner && owner._mapId === this.mapId()) owner.clear();
        }
        setupMap.call(this, mapId);
    };
    const onLoad = DataManager.onLoad;
    DataManager.onLoad = function(object) {
        onLoad.call(this, object);
        for (const [key, owner] of reads) if (owner === null && globalThis[key] === object) { delete globalThis[key]; reads.delete(key); }
    };
    Game_Event.prototype.findPageName = function(name) {
        const wanted = String(name || '').toUpperCase().trim();
        const index = this.event().pages.findIndex(page => page.list.some(command => {
            if (![108, 408].includes(command.code)) return false;
            const match = /<PAGE NAME: (.*)>/i.exec(command.parameters[0]);
            return match && match[1].toUpperCase().trim() === wanted;
        }));
        return index < 0 ? 0 : Math.min(index + 1, 20);
    };
    Game_Interpreter.prototype.pluginCommandCallEvent = function(data) {
        this._callEventData = data;
        this._callEventMap = '$coretoCallEventMap' + nextRead++;
        reads.set(this._callEventMap, this);
        DataManager.loadDataFile(this._callEventMap, 'Map' + String(data.mapId).padStart(3, '0') + '.json');
        this.setWaitMode('CallEvent');
    };
    Game_Interpreter.prototype.startCallEvent = function() {
        const data = this._callEventData, map = globalThis[this._callEventMap];
        const page = map.events[data.eventId]?.pages[data.pageId - 1];
        if (page) this.setupChild(page.list, this.eventId());
        delete globalThis[this._callEventMap];
        reads.delete(this._callEventMap);
        this._callEventMap = this._callEventData = undefined;
    };
    const wait = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        if (this._waitMode !== 'CallEvent') return wait.call(this);
        if (!globalThis[this._callEventMap]) return true;
        this._waitMode = '';
        this.startCallEvent();
        return false;
    };
    function evaluate(expression, interpreter) { return new Function('return ' + expression).call(interpreter); }
    return {
        CallEvent(args) {
            const mapId = evaluate(args.MapId, this);
            this.pluginCommandCallEvent({mapId: mapId <= 0 ? $gameMap.mapId() : mapId, eventId: evaluate(args.EventId, this) || this.eventId(), pageId: evaluate(args.PageId, this)});
        },
        CallEventSamePageNumber(args) {
            this.pluginCommandCallEvent({mapId: $gameMap.mapId(), eventId: this.eventId(), pageId: evaluate(args.PageId, this)});
        },
        CallEventSamePageName(args) {
            const page = $gameMap.event(this.eventId())?.findPageName(args.PageName);
            if (page) this.pluginCommandCallEvent({mapId: $gameMap.mapId(), eventId: this.eventId(), pageId: page});
        }
    };
}
