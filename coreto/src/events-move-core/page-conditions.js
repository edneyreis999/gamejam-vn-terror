function installEventsMovePageConditions() {
    class Game_CPCInterpreter extends Game_Interpreter {
        clear() { super.clear(); this._cpc = false; }
        command108(parameters) {
            super.command108(parameters);
            if (this._comments.some(comment => /<(?:CONDITION|CONDITIONS) MET>/i.test(comment))) this._cpc = true;
            return true;
        }
        execute() { while (this.isRunning()) this.executeCommand(); }
        executeCommonEvent(event) { this._conditionCommonEvent = event; this.execute(); this._conditionCommonEvent = undefined; }
    }
    globalThis.Game_CPCInterpreter = Game_CPCInterpreter;
    const conditions = {
        _commonEvents: [],
        loadCPC(page) {
            let inside = false;
            page.CPC = [];
            for (const command of page.list) {
                if ([108, 408].includes(command.code)) {
                    if (/<PAGE CONDITIONS?>/i.test(command.parameters[0])) inside = true;
                    else if (/<\/PAGE CONDITIONS?>/i.test(command.parameters[0])) inside = false;
                }
                if (inside) page.CPC.push(command);
            }
        },
        determineCommonEventsWithCPC() {
            this._commonEvents = [];
            for (const event of $dataCommonEvents) if (event) { this.loadCPC(event); if (event.CPC.length) this._commonEvents.push(event.id); }
        },
        metCPC(list, eventId, commonEvent) {
            const interpreter = new Game_CPCInterpreter();
            interpreter.setup(list, eventId);
            if (commonEvent) interpreter.executeCommonEvent(commonEvent);
            else interpreter.execute();
            return interpreter._cpc;
        }
    };
    const loaded = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() { loaded.call(this); conditions.determineCommonEventsWithCPC(); };
    const properPage = Game_Event.prototype.findProperPageIndex;
    Game_Event.prototype.findProperPageIndex = function() {
        this._CPCs = this._advancedSwitchVariable = false;
        if (!this.event() || !$gameTemp.isPlaytest() && /<(?:PLAYTEST|PLAY TEST)>/i.test(this.event().note)) return -1;
        return properPage.call(this);
    };
    Game_Event.prototype.hasCPCs = function() { return this._CPCs; };
    Game_Event.prototype.meetsCPC = function(page) {
        conditions.loadCPC(page);
        this._CPCs = page.CPC.length > 0;
        return !page.CPC.length || !!$gameMap.event(this._eventId) && conditions.metCPC(page.CPC, this._eventId);
    };
    const eventConditions = Game_Event.prototype.meetsConditions;
    Game_Event.prototype.meetsConditions = function(page) { return eventConditions.call(this, page) && this.meetsCPC(page); };
    Game_Troop.prototype.CPCsMet = function(page) { conditions.loadCPC(page); return !page.CPC.length || conditions.metCPC(page.CPC, 0); };
    const troopConditions = Game_Troop.prototype.meetsConditions;
    Game_Troop.prototype.meetsConditions = function(page) { return troopConditions.call(this, page) && this.CPCsMet(page); };
    Game_CommonEvent.prototype.hasCPCs = function() { return conditions._commonEvents.includes(this._commonEventId); };
    const commonActive = Game_CommonEvent.prototype.isActive;
    Game_CommonEvent.prototype.isActive = function() { return commonActive.call(this) || conditions.metCPC(this.event().CPC, this._commonEventId, this.event()); };
    const parallelEvents = Game_Map.prototype.parallelCommonEvents;
    Game_Map.prototype.parallelCommonEvents = function() { return [...new Set([...parallelEvents.call(this), ...conditions._commonEvents.map(id => $dataCommonEvents[id])])]; };
    const refreshCheck = Game_Map.prototype.checkNeedForPeriodicRefresh;
    Game_Map.prototype.checkNeedForPeriodicRefresh = function() {
        refreshCheck.call(this);
        this._needsPeriodicRefresh ||= this.events().some(event => event.hasCPCs()) || this._commonEvents.some(event => event.hasCPCs());
    };
    return conditions;
}
