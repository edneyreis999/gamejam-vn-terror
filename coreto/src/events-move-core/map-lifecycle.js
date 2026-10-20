function installEventsMoveMapLifecycle() {
    Game_Map.prototype.requestMapLoadCommonEvents = function() {
        const match = /<MAP LOAD COMMON EVENTS?: (.*)>/i.exec($dataMap?.note || '');
        if (match) for (const id of match[1].split(',').map(Number)) $gameTemp.reserveCommonEvent(id);
    };
    function runHook(map, name) {
        const match = new RegExp('<JS ON MAP ' + name + '>\\s*([\\s\\S]*)\\s*</JS ON MAP ' + name + '>', 'i').exec($dataMap?.note || '');
        if (!match) return;
        try { new Function(match[1]).call(map); }
        catch (error) { console.log('<JS ON MAP ' + name + '> code error'); }
    }
    Game_Map.prototype.requestMapLoadCustomJS = function() { runHook(this, 'LOAD'); };
    Game_Map.prototype.requestMapExitCustomJS = function() { if ($gamePlayer?.isTransferring()) runHook(this, 'EXIT'); };
    const setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) { setup.call(this, mapId); this.requestMapLoadCommonEvents(); this.requestMapLoadCustomJS(); };
    const create = Scene_Map.prototype.create;
    Scene_Map.prototype.create = function() { if ($gameMap) $gameMap.requestMapExitCustomJS(); create.call(this); };
    Game_SelfSwitches.prototype.resetSelfSwitchesForEvent = function(event) {
        if (!event?.event() || !/<(?:EXIT RESET|EXIT|TEMP|TEMPORARY) (?:SELF|SELF SWITCH|SELF SWITCHES|SELF DATA)>/i.test(event.event().note)) return;
        const prefix = $gameMap.mapId() + ',' + event.eventId() + ',';
        for (const key of Object.keys(this._data)) if (key.startsWith(prefix)) delete this._data[key];
    };
    Game_Map.prototype.resetExitSelfSwitches = function() {
        if (this._lastSesetExitSelfSwitchesMapId === this.mapId()) return;
        this._lastSesetExitSelfSwitchesMapId = this.mapId();
        for (const event of this.events()) $gameSelfSwitches.resetSelfSwitchesForEvent(event);
    };
    const display = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() { $gameMap.resetExitSelfSwitches(); display.call(this); };
}
