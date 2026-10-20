function installEventsMoveActivation(settings) {
    function resetActivation(event) {
        event._activationProximity = {type: 'none', distance: 0, regionList: []};
        event._clickTrigger = event._bypassClickStop = false;
        event._screenActivation = event._screenParallel = event._screenParallelOnce = false;
    }
    const clearPage = Game_Event.prototype.clearPageSettings;
    Game_Event.prototype.clearPageSettings = function() { clearPage.call(this); resetActivation(this); };
    const setupPage = Game_Event.prototype.setupPageSettings;
    Game_Event.prototype.setupPageSettings = function() {
        this._activationProximityAutoTriggerBypass = true;
        setupPage.call(this);
        resetActivation(this);
        const comments = (this.page()?.list ?? []).filter(command => [108, 408].includes(command.code)).map(command => command.parameters[0]).join('\n');
        for (const text of [this.event().note, comments]) {
            let match;
            if ((match = /<ACTIVATION REGIONS?: *(\d+(?:\s*,\s*\d+)*)>/i.exec(text))) this._activationProximity = {type: 'region', regionList: match[1].split(',').map(Number), distance: 0};
            else if ((match = /<ACTIVATION (.*?): (\d+)>/i.exec(text))) Object.assign(this._activationProximity, {type: match[1].toLowerCase().trim(), distance: Number(match[2])});
            if (/<CLICK TRIGGER>/i.test(text)) this._clickTrigger = true;
            if (/<BYPASS CLICK STOP>/i.test(text)) this._bypassClickStop = true;
            if (/<SCREEN ACTIVATION>/i.test(text)) { this._screenActivation = true; this._screenParallel = this._screenParallelOnce = false; }
            if (/<SCREEN PARALLEL>/i.test(text)) { this._screenActivation = false; this._screenParallel = true; this._screenParallelOnce = false; }
            else if (/<SCREEN PARALLEL ONCE>/i.test(text)) { this._screenActivation = false; this._screenParallel = this._screenParallelOnce = true; }
        }
        this._activationProximityAutoTriggerBypass = false;
    };
    Game_Event.prototype.hasClickTrigger = function() { return !this._erased && this._clickTrigger; };
    Game_Event.prototype.onClickTrigger = function() { $gameTemp.clearDestination(); this.start(); };
    Game_Event.prototype.isEventClickStopValid = function() {
        return !this._bypassClickStop && !!this.page() && this.list().some(command => ![0, 108, 408].includes(command.code));
    };
    Game_Temp.prototype.isEventClickTriggered = function(x, y) {
        const events = $gameMap.eventsXy(x, y), clicked = events.find(event => event.hasClickTrigger());
        if (clicked) { clicked.onClickTrigger(); return true; }
        if (TouchInput.isLongPressed() && events.some(event => event.isEventClickStopValid())) TouchInput.clear();
        return false;
    };
    const setDestination = Game_Temp.prototype.setDestination;
    Game_Temp.prototype.setDestination = function(x, y) { if (!this.isEventClickTriggered(x, y)) setDestination.call(this, x, y); };
    Game_Event.prototype.activationProximityType = function() { return this._activationProximity?.type || 'none'; };
    Game_Event.prototype.activationProximityDistance = function() { return this._activationProximity?.distance || 0; };
    Game_Event.prototype.activationRegionList = function() { return this._activationProximity?.regionList || []; };
    function activationBusy() { return $gameMap.isEventRunning() || $gameMap.isAnyEventStarting(); }
    Game_Player.prototype.meetActivationRegionConditions = function(event) { return !activationBusy() && event.activationRegionList().includes(this.regionId()); };
    Game_Player.prototype.meetActivationProximityConditions = function(event) {
        return !activationBusy() && !['none', 'region'].includes(event.activationProximityType()) && this.checkEventProximity(event, event.activationProximityType(), event.activationProximityDistance());
    };
    Game_Player.prototype.checkEventTriggerEventsMoveCore = function(triggers) {
        if (activationBusy()) return;
        for (const event of $gameMap.events()) if (event.isTriggerIn(triggers) && (this.meetActivationRegionConditions(event) || this.meetActivationProximityConditions(event))) { event.start(); return; }
    };
    Game_Player.prototype.startMapCommonEventOnOKTarget = function() { return settings.RegionOkTarget; };
    Game_Player.prototype.startMapCommonEventOnOK = function(x, y) {
        const id = settings.RegionOk['Region' + $gameMap.regionId(x, y)];
        if (!activationBusy() && id) $gameTemp.reserveCommonEvent(id);
    };
    Game_Player.prototype.startMapCommonEventOnTouch = function() {
        const id = settings.RegionTouch['Region' + this.regionId()];
        if (!activationBusy() && id) $gameTemp.reserveCommonEvent(id);
    };
    const here = Game_Player.prototype.checkEventTriggerHere, there = Game_Player.prototype.checkEventTriggerThere;
    Game_Player.prototype.checkEventTriggerHere = function(triggers) {
        here.call(this, triggers);
        if (!this.canStartLocalEvents()) return;
        this.checkEventTriggerEventsMoveCore(triggers);
        if (triggers.includes(0) && this.startMapCommonEventOnOKTarget() === 'standing') this.startMapCommonEventOnOK(this.x, this.y);
        else if (triggers.includes(1) || triggers.includes(2)) this.startMapCommonEventOnTouch();
    };
    Game_Player.prototype.checkEventTriggerThere = function(triggers) {
        there.call(this, triggers);
        if (this.canStartLocalEvents() && triggers.includes(0) && this.startMapCommonEventOnOKTarget() === 'front') this.startMapCommonEventOnOK($gameMap.roundXWithDirection(this.x, this.direction()), $gameMap.roundYWithDirection(this.y, this.direction()));
    };
    const touch = Game_Event.prototype.checkEventTriggerTouch;
    Game_Event.prototype.checkEventTriggerTouch = function(x, y) {
        touch.call(this, x, y);
        if ($gameMap.isEventRunning()) return false;
        const box = this._addedHitbox;
        if (box) for (let dx = -box.left; dx <= box.right; dx++) for (let dy = -box.up; dy <= box.down; dy++) touch.call(this, x + dx, y + dy);
        return false;
    };
    Game_Event.prototype.isOnScreen = function() {
        const x = Math.round($gameMap._displayX), y = Math.round($gameMap._displayY);
        return this.x >= x && this.x <= x + Math.ceil($gameMap.screenTileX()) - 1 && this.y >= y && this.y <= y + Math.ceil($gameMap.screenTileY()) - 1;
    };
    Game_Event.prototype.checkRegionEventTrigger = function(parallel) {
        if (!parallel && activationBusy()) return false;
        return !this.activationRegionList().length || $gamePlayer.meetActivationRegionConditions(this);
    };
    Game_Event.prototype.checkActivationProximity = function(parallel) {
        if (!parallel && activationBusy()) return false;
        return ['none', 'region'].includes(this.activationProximityType()) || $gamePlayer.meetActivationProximityConditions(this);
    };
    const auto = Game_Event.prototype.checkEventTriggerAuto, parallel = Game_Event.prototype.updateParallel;
    Game_Event.prototype.checkEventTriggerAuto = function() {
        if (this._activationProximityAutoTriggerBypass) return;
        if (this._screenActivation || this._screenParallel) {
            if (!this.isOnScreen()) { this._screenActivated = false; return; }
            if (!this._screenActivated) {
                this._screenActivated = true;
                if (this._screenActivation) this.start();
                else { this._interpreter ??= new Game_Interpreter(); this._interpreter.setup(this.list(), this._eventId); }
            }
            return;
        }
        if (this._trigger === 3 && this.checkRegionEventTrigger(false) && this.checkActivationProximity(false)) auto.call(this);
    };
    Game_Event.prototype.updateParallel = function() {
        if (!this._interpreter || !this.checkRegionEventTrigger(true) || !this.checkActivationProximity(true)) return;
        if (!this._interpreter.isRunning() && this._screenParallel) { if (!this._screenParallelOnce) this._screenActivated = false; return; }
        parallel.call(this);
    };
}
