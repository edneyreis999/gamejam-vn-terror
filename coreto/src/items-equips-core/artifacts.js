function installItemsArtifacts(api) {
    const partyPattern = /<(?:STACKABLE |STACK |)(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i;
    const troopPattern = /<(?:STACKABLE |STACK |)(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i;
    DataManager.isPartyArtifact = function(item) { return this.isArmor(item) && partyPattern.test(item.note || ''); };
    DataManager.isTroopArtifact = function(item) { return this.isArmor(item) && troopPattern.test(item.note || ''); };
    DataManager.isArtifact = function(item) { return this.isPartyArtifact(item) || this.isTroopArtifact(item); };
    DataManager.isStackableArtifact = function(item) { return this.isArtifact(item) && /<(?:STACKABLE|STACK) (?:PARTY|ALLY|TROOP|FOE) (?:ARTIFACT|RELIC)>/i.test(item.note || ''); };
    api.artifactIDs = {partyArtifactIDs: [], troopArtifactIDs: []};
    api.SetupArtifactItemIDs = function() {
        for (const side of ['party', 'troop']) api.artifactIDs[side + 'ArtifactIDs'] = $dataArmors.filter(item => item && DataManager['is' + (side === 'party' ? 'Party' : 'Troop') + 'Artifact'](item)).map(item => item.id);
    };
    const boot = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() { boot.call(this); api.SetupArtifactItemIDs(); };
    for (const side of ['party', 'troop']) Game_Party.prototype[side + 'Artifacts'] = function() {
        const items = [];
        for (const id of api.artifactIDs[side + 'ArtifactIDs']) {
            const item = $dataArmors[id];
            if (!item || !this.hasItem(item)) continue;
            const count = DataManager.isStackableArtifact(item) ? this.numItems(item) : 1;
            for (let index = 0; index < count; index++) items.push(item);
        }
        return items;
    };
    Game_Party.prototype.artifacts = function() { return this.partyArtifacts().concat(this.troopArtifacts()); };
    const canEquip = Game_BattlerBase.prototype.canEquip;
    Game_BattlerBase.prototype.canEquip = function(item) { return !DataManager.isArtifact(item) && canEquip.call(this, item); };
    const equips = Game_Actor.prototype.equips;
    Game_Actor.prototype.equips = function() {
        const result = equips.call(this);
        return this._allowArtifactTraitObjects || this._allowArtifactParamBase ? result.concat($gameParty.partyArtifacts()) : result;
    };
    const traits = Game_Actor.prototype.traitObjects;
    Game_Actor.prototype.traitObjects = function() {
        this._allowArtifactTraitObjects = true;
        try { return traits.call(this); }
        finally { this._allowArtifactTraitObjects = undefined; }
    };
    const param = Game_BattlerBase.prototype.param;
    Game_BattlerBase.prototype.param = function(id) {
        this._allowArtifactParamBase = true;
        try { return param.call(this, id); }
        finally { this._allowArtifactParamBase = undefined; }
    };
    const plus = Game_BattlerBase.prototype.paramPlus;
    Game_BattlerBase.prototype.paramPlus = function(id) {
        let value = plus.call(this, id);
        if (this.constructor === Game_Enemy) for (const item of $gameParty.troopArtifacts()) value += item.params[id];
        return value;
    };
    const enemyTraits = Game_Enemy.prototype.traitObjects;
    Game_Enemy.prototype.traitObjects = function() { return enemyTraits.call(this).concat($gameParty.troopArtifacts()); };
    const gain = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
        gain.call(this, item, amount, includeEquip);
        if (!DataManager.isArtifact(item)) return;
        const recipients = this.allMembers().concat(this.inBattle() ? $gameTroop.members() : []);
        for (const actor of recipients) if (actor) actor._cache = {};
    };
    Game_Party.prototype.removeBattleTestArtifacts = function() {
        for (const item of this.armors()) if (DataManager.isArtifact(item)) this.loseItem(item, this.numItems(item));
    };
    const testItems = Game_Party.prototype.setupBattleTestItems;
    Game_Party.prototype.setupBattleTestItems = function() { testItems.call(this); this.removeBattleTestArtifacts(); };
}
