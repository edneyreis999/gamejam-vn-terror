function installMapRules(settings) {
    const options = settings.QoL;
    const camera = settings.ScreenResolution;
    const derived = new WeakMap();
    const warned = new WeakSet();

    function mapRules(map) {
        if (!derived.has(map)) {
            const note = $dataMap.note || "";
            const showShadows = /<SHOW TILE SHADOWS>/i.test(note);
            const hideShadows = /<HIDE TILE SHADOWS>/i.test(note);
            const locks = {};
            for (const axis of ["X", "Y"]) {
                const visible = axis === "X" ? Graphics.width / map.tileWidth() : Graphics.height / map.tileHeight();
                const extent = axis === "X" ? map.width() : map.height();
                const looping = axis === "X" ? map.isLoopHorizontal() : map.isLoopVertical();
                if (camera[`AutoScrollLock${axis}`] && !looping && visible % 1 !== 0 && Math.ceil(visible) === extent) {
                    locks[axis] = camera[`DisplayLock${axis}`] || 0;
                    if ($gameScreen.zoomScale() === 1) map[`_display${axis}`] = locks[axis];
                }
                const bare = new RegExp(`<SCROLL LOCK ${axis}>`, "i").test(note);
                if (bare) locks[axis] = camera[`DisplayLock${axis}`];
                const explicit = note.match(new RegExp(`<SCROLL LOCK ${axis}: (.*?)>`, "i"));
                if (!bare && explicit) locks[axis] = Number(explicit[1]);
            }
            derived.set(map, { hideShadows: showShadows ? false : hideShadows || options.NoTileShadows, locks });
        }
        return derived.get(map);
    }

    const setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(...args) {
        derived.delete(this);
        const result = setup.apply(this, args);
        mapRules(this);
        return result;
    };
    Game_Map.prototype.areTileShadowsHidden = function() {
        return mapRules(this).hideShadows;
    };
    Game_Player.prototype.encounterStepsMinimum = function() {
        const match = ($dataMap.note || "").match(/<MINIMUM ENCOUNTER STEPS: (\d+)>/i);
        return match ? Number(match[1]) : options.EncounterRateMinimum;
    };
    Game_Player.prototype.makeEncounterCount = function() {
        const step = $gameMap.encounterStep();
        this._encounterCount = Math.randomInt(step) + Math.randomInt(step) + this.encounterStepsMinimum();
    };
    const collision = Game_Event.prototype.isCollidedWithEvents;
    Game_Event.prototype.isCollidedWithEvents = function(x, y) {
        if (!options.SmartEventCollisionPriority) return collision.call(this, x, y);
        return this.isNormalPriority() && $gameMap.eventsXyNt(x, y).some(event => event.isNormalPriority());
    };

    const setDisplayPos = Game_Map.prototype.setDisplayPos;
    Game_Map.prototype.setDisplayPos = function(...args) {
        const result = setDisplayPos.apply(this, args);
        const { locks } = mapRules(this);
        if ($gameScreen.zoomScale() === 1) {
            if (!this.isLoopHorizontal() && "X" in locks) this._displayX = locks.X;
            if (!this.isLoopVertical() && "Y" in locks) this._displayY = locks.Y;
        }
        return result;
    };
    for (const [name, axis] of [["scrollLeft", "X"], ["scrollRight", "X"], ["scrollUp", "Y"], ["scrollDown", "Y"]]) {
        const scroll = Game_Map.prototype[name];
        Game_Map.prototype[name] = function(...args) {
            const { locks } = mapRules(this);
            if ($gameScreen.zoomScale() === 1 && axis in locks) {
                this[`_display${axis}`] = locks[axis];
                return;
            }
            return scroll.apply(this, args);
        };
    }

    const checkPassage = Game_Map.prototype.checkPassage;
    Game_Map.prototype.checkPassage = function(x, y, bit) {
        if ($gameTemp.isPlaytest() && !DataManager.isEventTest() && !warned.has(this)) {
            const flags = this.tilesetFlags();
            for (const tile of this.allTiles(x, y)) {
                const flag = flags[tile];
                if (flag == null) {
                    warned.add(this);
                    console.error("[CORE_TILESET_FLAGS] Current tileset has incomplete flag data. Review the tileset in the RPG Maker editor; passage data was not changed.");
                    break;
                }
                if ((flag & 0x10) === 0 && ((flag & bit) === 0 || (flag & bit) === bit)) break;
            }
        }
        return checkPassage.call(this, x, y, bit);
    };
}
