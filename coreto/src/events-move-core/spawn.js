function installEventsMoveSpawn(settings) {
    Game_System.prototype.getMapSpawnedEventData = function(mapId) { this._MapSpawnedEventData ??= []; return this._MapSpawnedEventData[mapId] ??= []; };
    Game_System.prototype.removeTemporaryMapSpawnedEvents = function(mapId) {
        const events = this.getMapSpawnedEventData(mapId);
        for (let index = 0; index < events.length; index++) if (events[index] && !events[index]._spawnPreserved) events[index] = null;
    };
    Game_Map.prototype.removeTemporaryMapSpawnedEvents = function(mapId) { if (mapId !== this.mapId() && $gamePlayer) $gameSystem.removeTemporaryMapSpawnedEvents(this.mapId()); };
    Game_Map.prototype.setupSpawnedEvents = function() { this._spawnedEvents = $gameSystem.getMapSpawnedEventData(this.mapId()); this._needsRefresh = true; this.clearEventCache(); };
    const setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        this.removeTemporaryMapSpawnedEvents(mapId); this._spawnedEvents = []; this.clearEventCache();
        setup.call(this, mapId); this.setupSpawnedEvents();
    };
    const events = Game_Map.prototype.events, event = Game_Map.prototype.event;
    Game_Map.prototype.events = function() { return this._eventCache ??= events.call(this).concat(this._spawnedEvents || []).filter(Boolean); };
    Game_Map.prototype.event = function(id) { return id >= 1000 ? this._spawnedEvents?.[id - 1000] : event.call(this, id); };
    Game_Map.prototype.checkExistingEntitiesAt = function(x, y) { return this.eventsXy(x, y).length > 0 || $gamePlayer.pos(x, y) || this.boat().posNt(x, y) || this.ship().posNt(x, y); };
    Game_Map.prototype.isPassableByAnyDirection = function(x, y) { return [2, 4, 6, 8].some(direction => this.isPassable(x, y, direction)); };
    function sourceEvent(data) {
        const previous = $gameTemp._spawnData;
        $gameTemp._spawnData = data;
        try { return new Game_Event(data.mapId, data.eventId); }
        finally { $gameTemp._spawnData = previous; }
    }
    Game_Map.prototype.isSpawnHitboxCollisionOk = function(data, x, y) {
        const event = sourceEvent(data); event.refresh();
        const box = event._addedHitbox;
        for (let dx = -box.left; dx <= box.right; dx++) for (let dy = -box.up; dy <= box.down; dy++) if (this.checkExistingEntitiesAt(x + dx, y + dy)) return false;
        return true;
    };
    Game_Map.prototype.createSpawnedEventWithData = function(data) {
        const event = sourceEvent(data);
        this._spawnedEvents.push(event); event.setupSpawn(data); this.clearEventCache();
    };
    function resolveTemplate(data) {
        const name = data.template.toUpperCase().trim(), named = VisuMZ.EventTemplates[name];
        if (name && name !== 'UNTITLED') {
            if (!named) return false;
            data.mapId = named.MapID; data.eventId = named.EventID;
        }
        return !!$gameMap.referEvent(data.mapId, data.eventId);
    }
    function eligible(map, data, x, y, collision, passability) {
        if (!map.isValid(x, y)) return false;
        if (collision && (map.checkExistingEntitiesAt(x, y) || !map.isSpawnHitboxCollisionOk(data, x, y))) return false;
        return !passability || map.isPassableByAnyDirection(x, y);
    }
    Game_Map.prototype.prepareSpawnedEventAtXY = function(data, collision, passability) {
        if (!resolveTemplate(data)) return false;
        if (!eligible(this, data, data.x, data.y, collision, passability)) return false;
        this.createSpawnedEventWithData(data); return true;
    };
    function selectTile(map, data, selectors, kind, collision, passability) {
        if (!resolveTemplate(data)) return false;
        const choices = [];
        for (let x = 0; x < map.width(); x++) for (let y = 0; y < map.height(); y++) {
            if (selectors.includes(map[kind](x, y)) && eligible(map, data, x, y, collision, passability)) choices.push([x, y]);
        }
        if (!choices.length) return false;
        [data.x, data.y] = choices[Math.randomInt(choices.length)];
        map.createSpawnedEventWithData(data); return true;
    }
    Game_Map.prototype.prepareSpawnedEventAtRegion = function(data, regions, collision, passability) { return selectTile(this, data, regions, 'regionId', collision, passability); };
    Game_Map.prototype.prepareSpawnedEventAtTerrainTag = function(data, tags, collision, passability) { return selectTile(this, data, tags, 'terrainTag', collision, passability); };
    Game_Event.prototype.setupSpawn = function(data) {
        const name = data.template.toUpperCase().trim(), named = !['', 'UNTITLED'].includes(name) ? VisuMZ.EventTemplates[name] : null;
        if (!['', 'UNTITLED'].includes(name) && !named) return;
        const mapId = named ? named.MapID : data.mapId, eventId = named ? named.EventID : data.eventId;
        if (!this.checkValidEventerMap(mapId, eventId)) return;
        if (named) named.PreSpawnJS.call(this, mapId, eventId, this);
        settings.Template.PreSpawnJS.call(this, mapId, eventId, this);
        this._eventSpawnData = data; this._pageIndex = -2; this._mapId = $gameMap.mapId(); this._eventId = data.spawnEventId; this._spawnPreserved = data.spawnPreserved;
        this.locate(data.x, data.y); this.setDirection(data.direction); this.refresh();
        if (named) named.PostSpawnJS.call(this, mapId, eventId, this);
        settings.Template.PostSpawnJS.call(this, mapId, eventId, this);
        if (SceneManager._scene?._spriteset) SceneManager._scene._spriteset.createSpawnedEvent(this);
    };
    Game_Event.prototype.isSpawnedEvent = function() { return !!this._eventSpawnData; };
    Spriteset_Map.prototype.createSpawnedEvent = function(event) {
        const sprite = new Sprite_Character(event);
        this._characterSprites.push(sprite); this._tilemap.addChild(sprite); sprite.update(); event.resetPattern(); sprite.updateFrame();
    };
    Game_Map.prototype.despawnEventId = function(id) {
        if (id < 1000 || !this._spawnedEvents) return;
        const event = this.event(id); if (!event) return;
        event.locate(-1, -1); event.erase(); this._spawnedEvents[id - 1000] = null; this.clearEventCache();
    };
    Game_Map.prototype.firstSpawnedEvent = function() { return this._spawnedEvents.find(Boolean) || null; };
    Game_Map.prototype.lastSpawnedEvent = function() { return this._spawnedEvents.slice().reverse().find(Boolean) || null; };
    Game_Map.prototype.firstSpawnedEventID = function() { return this.firstSpawnedEvent()?.eventId() || 0; };
    Game_Map.prototype.lastSpawnedEventID = function() { return this.lastSpawnedEvent()?.eventId() || 0; };
    Game_Map.prototype.despawnAtXY = function(x, y) { for (const event of this.eventsXy(x, y)) if (event.isSpawnedEvent()) this.despawnEventId(event.eventId()); };
    Game_Map.prototype.despawnRegions = function(regions) { for (const event of this._spawnedEvents) if (event && regions.includes(event.regionId())) this.despawnEventId(event.eventId()); };
    Game_Map.prototype.despawnTerrainTags = function(tags) { for (const event of this._spawnedEvents) if (event && tags.includes(event.terrainTag())) this.despawnEventId(event.eventId()); };
    Game_Map.prototype.despawnEverything = function() { for (const event of this._spawnedEvents) if (event) this.despawnEventId(event.eventId()); };
    function value(expression, interpreter) { return new Function('return ' + expression).call(interpreter); }
    function spawn(args, kind) {
        const data = {template: args.TemplateName, mapId: value(args.MapId, this) || $gameMap.mapId(), eventId: value(args.EventId, this) || this.eventId(),
            x: kind === 'XY' ? value(args.PosX, this) : -1, y: kind === 'XY' ? value(args.PosY, this) : -1,
            spawnPreserved: args.Preserve, spawnEventId: $gameMap._spawnedEvents.length + 1000};
        if (data.mapId !== $gameMap.mapId() && !VisuMZ.PreloadedMaps[data.mapId]) { alert('Preload map ' + data.mapId + ' in Template.PreloadMaps before spawning its events.'); return; }
        const argumentsList = [data, ...(kind === 'XY' ? [] : [kind === 'Region' ? args.Region : args.TerrainTags]), args.Collision, args.Passability];
        const success = $gameMap['prepareSpawnedEventAt' + kind](...argumentsList);
        if (args.SuccessSwitchId) $gameSwitches.setValue(args.SuccessSwitchId, !!success);
    }
    return {
        SpawnEventAtXY(args) { spawn.call(this, args, 'XY'); },
        SpawnEventAtRegion(args) { spawn.call(this, args, 'Region'); },
        SpawnEventAtTerrainTag(args) { spawn.call(this, args, 'TerrainTag'); },
        SpawnEventDespawnEventID(args) { $gameMap.despawnEventId(value(args.EventID, this) || this.eventId()); },
        SpawnEventDespawnAtXY(args) { $gameMap.despawnAtXY(value(args.PosX, this), value(args.PosY, this)); },
        SpawnEventDespawnRegions(args) { $gameMap.despawnRegions(args.Region); },
        SpawnEventDespawnTerrainTags(args) { $gameMap.despawnTerrainTags(args.TerrainTags); },
        SpawnEventDespawnEverything() { $gameMap.despawnEverything(); }
    };
}
