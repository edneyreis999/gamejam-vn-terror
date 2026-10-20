function installEventsMoveTemplates(settings) {
    const template = settings.Template;
    const callbackNames = ['PreCopyJS', 'PostCopyJS', 'PreMorphJS', 'PostMorphJS', 'PreSpawnJS', 'PostSpawnJS'];
    for (const data of [template, ...template.List]) for (const key of callbackNames) data[key] = new Function(data[key]);
    VisuMZ.PreloadedMaps ??= {};
    VisuMZ.EventTemplates ??= {};
    const pendingMaps = new Map();
    Scene_Boot.prototype.process_VisuMZ_EventsMoveCore_LoadTemplateMaps = function() {
        if (DataManager.isBattleTest() || DataManager.isEventTest()) return;
        const ids = new Set(template.PreloadMaps);
        for (const entry of template.List) { entry.Name = entry.Name.toUpperCase().trim(); VisuMZ.EventTemplates[entry.Name] = entry; ids.add(entry.MapID); }
        for (const id of ids) if (!VisuMZ.PreloadedMaps[id]) {
            const key = '$coretoPreloadedMap' + id;
            pendingMaps.set(id, key);
            DataManager.loadDataFile(key, 'Map' + String(id).padStart(3, '0') + '.json');
        }
    };
    const databaseLoaded = Scene_Boot.prototype.onDatabaseLoaded, ready = Scene_Boot.prototype.isReady;
    Scene_Boot.prototype.onDatabaseLoaded = function() { databaseLoaded.call(this); this.process_VisuMZ_EventsMoveCore_LoadTemplateMaps(); };
    Scene_Boot.prototype.isReady = function() {
        if (!ready.call(this)) return false;
        for (const [id, key] of pendingMaps) {
            if (!globalThis[key]) return false;
            VisuMZ.PreloadedMaps[id] = globalThis[key]; delete globalThis[key]; pendingMaps.delete(id);
        }
        return true;
    };
    Game_Map.prototype.referEvent = function(mapId, eventId) { return (mapId === this.mapId() ? $dataMap : VisuMZ.PreloadedMaps[mapId])?.events[eventId]; };
    Game_Map.prototype.clearEventCache = function() { this._eventCache = undefined; };
    Game_Event.prototype.checkValidEventerMap = function(mapId, eventId) {
        if (!mapId || !eventId) return false;
        if (mapId === $gameMap.mapId() || VisuMZ.PreloadedMaps[mapId]) return true;
        if ($gameTemp.isPlaytest()) console.log('Map ' + mapId + ' must be preloaded before using its event templates.');
        return false;
    };
    const eventData = Game_Event.prototype.event;
    Game_Event.prototype.event = function() {
        const data = this._eventMorphData || this._eventCopyData || this._eventSpawnData || $gameTemp._spawnData;
        return data ? $gameMap.referEvent(data.mapId, data.eventId) : eventData.call(this);
    };
    function eventKey(map, event) { return 'Map' + map + '-Event' + event; }
    Game_System.prototype.getPreservedMorphEventData = function(event) { this._PreservedEventMorphData ??= {}; return event && this._PreservedEventMorphData[eventKey(event._mapId, event._eventId)]; };
    Game_System.prototype.savePreservedMorphEventDataKey = function(mapId, eventId, name, sourceMap, sourceEvent) {
        this._PreservedEventMorphData ??= {};
        this._PreservedEventMorphData[eventKey(mapId, eventId)] = {template: name, mapId: sourceMap, eventId: sourceEvent};
    };
    Game_System.prototype.deletePreservedMorphEventDataKey = function(mapId, eventId) { this._PreservedEventMorphData ??= {}; delete this._PreservedEventMorphData[eventKey(mapId, eventId)]; };
    Game_Event.prototype.setupCopyEvent = function() {
        if (DataManager.isBattleTest() || DataManager.isEventTest()) return;
        const note = this.event().note;
        let mapId = 0, eventId = 0, named, match;
        if ((match = /<COPY EVENT: (?:MAP )?(\d+), (?:EVENT )?(\d+)>/i.exec(note))) { mapId = Number(match[1]) || $gameMap.mapId(); eventId = Number(match[2]); }
        else if ((match = /<COPY EVENT: (.*?)>/i.exec(note))) { named = VisuMZ.EventTemplates[match[1].toUpperCase().trim()]; if (!named) return; mapId = named.MapID; eventId = named.EventID; }
        if (!this.checkValidEventerMap(mapId, eventId)) return;
        template.PreCopyJS.call(this, mapId, eventId, this);
        if (named) named.PreCopyJS.call(this, mapId, eventId, this);
        this._eventCopyData = {mapId, eventId}; this._pageIndex = -2; this.refresh();
        template.PostCopyJS.call(this, mapId, eventId, this);
        if (named) named.PostCopyJS.call(this, mapId, eventId, this);
        $gameMap.clearEventCache();
    };
    Game_Event.prototype.morphInto = function(mapId, eventId, restore) {
        if (!this.checkValidEventerMap(mapId, eventId)) return;
        if (!restore) template.PreMorphJS.call(this, mapId, eventId, this);
        this._eventMorphData = {mapId, eventId}; this._pageIndex = -2; this.refresh();
        if (!restore) template.PostMorphJS.call(this, mapId, eventId, this);
        $gameMap.clearEventCache();
    };
    Game_Event.prototype.morphIntoTemplate = function(name, restore) {
        const data = VisuMZ.EventTemplates[name.toUpperCase().trim()];
        if (!data || !this.checkValidEventerMap(data.MapID, data.EventID)) return;
        if (!restore) data.PreMorphJS.call(this, data.MapID, data.EventID, this);
        this.morphInto(data.MapID, data.EventID, restore);
        if (!restore) data.PostMorphJS.call(this, data.MapID, data.EventID, this);
    };
    Game_Event.prototype.removeMorph = function() { this._eventMorphData = undefined; this._pageIndex = -2; this.refresh(); };
    Game_Event.prototype.setupMorphEvent = function() {
        const data = $gameSystem.getPreservedMorphEventData(this);
        if (!data) return;
        if (data.template.toUpperCase().trim() !== 'UNTITLED') this.morphIntoTemplate(data.template, true);
        else this.morphInto(data.mapId, data.eventId, true);
    };
    const initialize = Game_Event.prototype.initialize;
    Game_Event.prototype.initialize = function(mapId, eventId) {
        this._checkRelocateNotetag = true; initialize.call(this, mapId, eventId); this._checkRelocateNotetag = undefined;
        this.setupCopyEvent(); this.setupMorphEvent();
    };
    function value(expression, interpreter) { return new Function('return ' + expression).call(interpreter); }
    return {
        MorphEventTo(args) {
            const targetMap = value(args.Step1MapId, this) || $gameMap.mapId(), targetId = value(args.Step1EventId, this) || this.eventId();
            const sourceMap = value(args.Step2MapId, this) || $gameMap.mapId(), sourceId = value(args.Step2EventId, this) || this.eventId();
            const name = args.TemplateName.toUpperCase().trim();
            if (!args.Step2Preserve && targetMap !== $gameMap.mapId()) return;
            if (targetMap === $gameMap.mapId()) {
                const event = $gameMap.event(targetId); if (!event) return;
                if (name !== 'UNTITLED') event.morphIntoTemplate(name); else event.morphInto(sourceMap, sourceId);
            }
            if (args.Step2Preserve) $gameSystem.savePreservedMorphEventDataKey(targetMap, targetId, name, sourceMap, sourceId);
        },
        MorphEventRemove(args) {
            const mapId = value(args.MapId, this) || $gameMap.mapId(), eventId = value(args.EventId, this) || this.eventId();
            if (mapId === $gameMap.mapId()) $gameMap.event(eventId)?.removeMorph();
            if (args.RemovePreserve) $gameSystem.deletePreservedMorphEventDataKey(mapId, eventId);
        }
    };
}
