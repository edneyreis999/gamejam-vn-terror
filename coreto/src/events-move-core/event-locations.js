function installEventsMoveLocations() {
    const key = (mapId, eventId) => 'Map' + mapId + '-Event' + eventId;
    Game_System.prototype.getSavedEventLocation = function(event) { this._SavedEventLocations ??= {}; return event ? this._SavedEventLocations[key(event._mapId, event._eventId)] : null; };
    Game_System.prototype.saveEventLocation = function(event) {
        if (!event) return;
        this.createSaveEventLocationData(event._mapId, event._eventId, event.x, event.y, event.direction(), event._pageIndex, event._moveRouteIndex);
    };
    Game_System.prototype.createSaveEventLocationData = function(mapId, eventId, x, y, direction, pageIndex, moveRouteIndex) {
        this._SavedEventLocations ??= {};
        this._SavedEventLocations[key(mapId, eventId)] = {direction, x: Math.round(x), y: Math.round(y), pageIndex, moveRouteIndex};
    };
    Game_System.prototype.deleteSavedEventLocationKey = function(mapId, eventId) { this._SavedEventLocations ??= {}; delete this._SavedEventLocations[key(mapId, eventId)]; };
    Game_System.prototype.deleteSavedEventLocation = function(event) { if (event) this.deleteSavedEventLocationKey(event._mapId, event._eventId); };
    Game_Map.prototype.setupSaveEventLocations = function() { this._saveEventLocations = /<SAVE EVENT LOCATIONS?>/i.test($dataMap.note); };
    Game_Map.prototype.isSaveEventLocations = function() { if (this._saveEventLocations === undefined) this.setupSaveEventLocations(); return this._saveEventLocations; };
    const setupMap = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) { this.setupSaveEventLocations(); setupMap.call(this, mapId); };
    Game_Event.prototype.isSaveEventLocation = function() { return $gameMap.isSaveEventLocations() || this._saveEventLocation; };
    Game_Event.prototype.saveEventLocation = function() { this._requestSaveEventLocation = true; };
    Game_Event.prototype.autosaveEventLocation = function() { if (this.isSaveEventLocation()) this.saveEventLocation(); };
    Game_Event.prototype.processSaveEventLocation = function() { this._requestSaveEventLocation = false; $gameSystem.saveEventLocation(this); };
    Game_Event.prototype.updateSaveEventLocation = function() { if (this._requestSaveEventLocation) this.processSaveEventLocation(); };
    Game_Event.prototype.deleteEventLocation = function() { $gameSystem.deleteSavedEventLocation(this); };
    Game_Event.prototype.restoreSavedEventPosition = function() {
        const data = $gameSystem.getSavedEventLocation(this); if (!data) return;
        this.setPosition(data.x, data.y); this.refreshBushDepth(); this.setDirection(data.direction);
        if (this._pageIndex === data.pageIndex) this._moveRouteIndex = data.moveRouteIndex;
    };
    const initialize = Game_Event.prototype.initialize;
    Game_Event.prototype.initialize = function(mapId, eventId) { initialize.call(this, mapId, eventId); this.restoreSavedEventPosition(); };
    const setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function() {
        setupPage.call(this);
        const comments = (this.page()?.list ?? []).filter(command => [108, 408].includes(command.code)).map(command => command.parameters[0]).join('\n');
        this._saveEventLocation = !!this.page() && /<SAVE EVENT LOCATION>/i.test((this.event()?.note || '') + '\n' + comments);
        this.autosaveEventLocation();
    };
    const update = Game_Event.prototype.update;
    Game_Event.prototype.update = function() { update.call(this); if (!Utils.isMobileDevice()) this.updateSaveEventLocation(); };
    const updateMove = Game_Event.prototype.updateMove;
    Game_Event.prototype.updateMove = function() { updateMove.call(this); this.autosaveEventLocation(); };
    const locate = Game_Event.prototype.locate;
    Game_Event.prototype.locate = function(x, y) {
        if (this._checkRelocateNotetag) {
            const note = this.event().note;
            let match;
            if ((match = /<(?:LOCATION|START|START LOCATION): (.*?)>/i.exec(note))) { const offsets = match[1].split(',').map(Number); x += offsets[0] || 0; y += offsets[1] || 0; }
            if ((match = /<(?:LOCATION|START|START LOCATION) X: (.*?)>/i.exec(note))) x += Number(match[1]);
            if ((match = /<(?:LOCATION|START|START LOCATION) Y: (.*?)>/i.exec(note))) y += Number(match[1]);
        }
        locate.call(this, x, y); this.autosaveEventLocation();
    };
    function value(expression, interpreter) { return new Function('return ' + expression).call(interpreter); }
    return {
        EventLocationSave(args) { $gameMap.event(value(args.EventId, this) || this.eventId())?.saveEventLocation(); },
        EventLocationCreate(args) {
            $gameSystem.createSaveEventLocationData(value(args.MapId, this) || $gameMap.mapId(), value(args.EventId, this) || this.eventId(),
                value(args.PosX, this) || 0, value(args.PosY, this) || 0, args.Direction || 2, Math.max(0, Math.min(19, (value(args.PageId, this) || 1) - 1)), value(args.MoveRouteIndex, this) || 0);
        },
        EventLocationDelete(args) { $gameSystem.deleteSavedEventLocationKey(value(args.MapId, this) || $gameMap.mapId(), value(args.EventId, this) || this.eventId()); }
    };
}
