function installEventsMovePassage(settings) {
    const setupMap = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        setupMap.call(this, mapId);
        this.setupRegionRestrictions();
    };
    Game_Map.prototype.setupRegionRestrictions = function() {
        this._regionRules = {};
        for (const [key, value] of Object.entries(settings.Region)) {
            if (Array.isArray(value)) this._regionRules[key] = value.slice();
        }
        for (const match of $dataMap.note.matchAll(/<(\w+) (\w+) REGION: *(\d+(?:\s*,\s*\d+)*)>/gi)) {
            const key = [match[1], match[2]].map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join('');
            if (this._regionRules[key]) this._regionRules[key].push(...match[3].split(',').map(Number));
        }
    };
    function regionRule(type, x, y, direction, action) {
        const region = $gameMap.regionId($gameMap.roundXWithDirection(x, direction), $gameMap.roundYWithDirection(y, direction));
        const groups = ['All'];
        if (type === 'player') groups.push('Player', 'Walk');
        else if (type === 'event') groups.push('Event', 'Walk');
        else groups.push('Vehicle', type[0].toUpperCase() + type.slice(1));
        return groups.some(group => $gameMap._regionRules[group + action]?.includes(region));
    }
    Game_Map.prototype.isRegionAllowPass = function(x, y, direction, type) { return regionRule(type, x, y, direction, 'Allow'); };
    Game_Map.prototype.isRegionForbidPass = function(x, y, direction, type) { return regionRule(type, x, y, direction, 'Forbid'); };
    const playerPassage = Game_Player.prototype.isMapPassable;
    Game_Player.prototype.isMapPassable = function(x, y, direction) {
        if ($gameMap.isRegionAllowPass(x, y, direction, 'player')) return true;
        if (this.isInVehicle()) return this.vehicle().isMapPassable(x, y, direction);
        if ($gameMap.isRegionForbidPass(x, y, direction, 'player')) return false;
        return playerPassage.call(this, x, y, direction);
    };
    const vehiclePassage = Game_Vehicle.prototype.isMapPassable;
    Game_Vehicle.prototype.isMapPassable = function(x, y, direction) {
        if ($gameMap.isRegionAllowPass(x, y, direction, this._type)) return true;
        if ($gameMap.isRegionForbidPass(x, y, direction, this._type)) return false;
        return vehiclePassage.call(this, x, y, direction);
    };
    const baseCanPass = Game_CharacterBase.prototype.canPass;
    Game_CharacterBase.prototype.canPass = function(x, y, direction) {
        if (this._vehicleType === 'airship') return this.vehicle().isAirshipPassable(x, y, direction);
        return baseCanPass.call(this, x, y, direction);
    };
    Game_Vehicle.prototype.isAirshipPassable = function(x, y, direction) {
        if ($gameMap.isRegionAllowPass(x, y, direction, this._type)) return true;
        if ($gameMap.isRegionForbidPass(x, y, direction, this._type)) return false;
        return baseCanPass.call($gamePlayer, x, y, direction);
    };
    Game_Map.prototype.isRegionDockable = function(x, y, direction, type) {
        if (type === 'airship') direction = 5;
        const region = this.regionId(this.roundXWithDirection(x, direction), this.roundYWithDirection(y, direction));
        const key = type[0].toUpperCase() + type.slice(1) + 'Dock';
        return this._regionRules.VehicleDock.includes(region) || this._regionRules[key].includes(region);
    };
    const landOk = Game_Vehicle.prototype.isLandOk;
    Game_Vehicle.prototype.isLandOk = function(x, y, direction) {
        if ($gameMap.isRegionDockable(x, y, direction, this._type)) return true;
        const key = this._type[0].toUpperCase() + this._type.slice(1) + 'DockRegionOnly';
        return !settings.Region[key] && landOk.call(this, x, y, direction);
    };
    Game_Map.prototype.checkEventProximity = function(x, y, event, type, distance) {
        const dx = Math.abs(event.deltaXFrom(x)), dy = Math.abs(event.deltaYFrom(y));
        if (type === 'square') return dx <= distance && dy <= distance;
        if (type === 'circle') return Math.round(Math.hypot(event.x - x, event.y - y)) <= distance;
        if (['radius', 'delta', 'diamond'].includes(type)) return this.distance(x, y, event.x, event.y) <= distance;
        if (type === 'row') return dy <= distance;
        if (type === 'column') return dx <= distance;
        return false;
    };
    Game_Player.prototype.checkEventProximity = function(event, type, distance) {
        return $gameMap.checkEventProximity(this.x, this.y, event, type, distance);
    };
    Game_CharacterBase.prototype.isOnRope = function() { return this.isOnLadder() && this.terrainTag() === settings.TerrainTag.Rope; };
    const setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function() {
        setupPage.call(this);
        this._addedHitbox = {left: 0, right: 0, up: 0, down: 0};
        this._moveOnlyRegions = [];
        const text = [this.event().note, ...(this.page()?.list ?? []).filter(command => command.code === 108 || command.code === 408).map(command => command.parameters[0])].join('\n');
        for (const match of text.matchAll(/<HITBOX (LEFT|RIGHT|UP|DOWN): (\d+)>/gi)) this._addedHitbox[match[1].toLowerCase()] = Number(match[2]);
        for (const match of text.matchAll(/<MOVE ONLY REGIONS?: *(\d+(?:\s*,\s*\d+)*)>/gi)) this._moveOnlyRegions.push(...match[1].split(',').map(Number).filter(region => region !== 0));
    };
    const eventPassage = Game_Event.prototype.isMapPassable;
    Game_Event.prototype.isMapPassable = function(x, y, direction) {
        if (this._moveOnlyRegions.length) return this._moveOnlyRegions.includes($gameMap.regionId($gameMap.roundXWithDirection(x, direction), $gameMap.roundYWithDirection(y, direction)));
        if ($gameMap.isRegionAllowPass(x, y, direction, 'event')) return true;
        if ($gameMap.isRegionForbidPass(x, y, direction, 'event')) return false;
        return eventPassage.call(this, x, y, direction);
    };
    const position = Game_Event.prototype.pos;
    Game_Event.prototype.pos = function(x, y) {
        if (!this._addedHitbox) return position.call(this, x, y);
        const box = this._addedHitbox;
        return x >= this.x - box.left && x <= this.x + box.right && y >= this.y - box.up && y <= this.y + box.down;
    };
    const canPass = Game_Event.prototype.canPass;
    Game_Event.prototype.canPass = function(x, y, direction) {
        const box = this._addedHitbox;
        if (!box) return canPass.call(this, x, y, direction);
        for (let dx = -box.left; dx <= box.right; dx++) {
            for (let dy = -box.up; dy <= box.down; dy++) if (!canPass.call(this, x + dx, y + dy, direction)) return false;
        }
        return true;
    };
    Game_Event.prototype.isCollidedWithEvents = function(x, y) {
        return $gameMap.eventsXyNt(x, y).some(event => event !== this);
    };
}
