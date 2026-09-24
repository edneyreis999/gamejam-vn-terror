function installMessageSelectors() {
    const message = Game_Message.prototype;
    message.setWeaponChoice = function(variableId, typeId) {
        this._itemChoiceVariableId=variableId;this._itemChoiceItypeId='weapon';
        this._itemChoiceWtypeId=typeId;this._itemChoiceEtypeId=0;
    };
    message.setArmorChoice = function(variableId, typeId, equipId) {
        this._itemChoiceVariableId=variableId;this._itemChoiceItypeId='armor';
        this._itemChoiceAtypeId=typeId;this._itemChoiceEtypeId=equipId;
    };
    message.setSkillChoice = function(variableId, actorId, typeId) {
        this._itemChoiceVariableId=variableId;this._itemChoiceItypeId='skill';
        this._itemChoiceActorId=actorId;this._itemChoiceStypeId=typeId;
    };
    for (const suffix of ['WtypeId','AtypeId','EtypeId','ActorId','StypeId']) {
        message[`itemChoice${suffix}`] = function() { return this[`_itemChoice${suffix}`] || 0; };
    }
    message.itemChoiceActor = function() { return $gameActors.actor(this.itemChoiceActorId()) || $gameParty.leader() || null; };
    const handlers = {
        SelectWeapon(args) { $gameMessage.setWeaponChoice(args.VariableID,args.WeaponTypeID); },
        SelectArmor(args) { $gameMessage.setArmorChoice(args.VariableID,args.ArmorTypeID,args.EquipTypeID); },
        SelectSkill(args) { $gameMessage.setSkillChoice(args.VariableID,args.ActorID,args.SkillTypeID); }
    };
    for (const [name, handler] of Object.entries(handlers)) {
        messageApi.registerCommand(name, function(args) { handler(args); this.setWaitMode('message'); });
    }
    const interpreter = Game_Interpreter.prototype;
    interpreter.prepareShowTextFollowups = function() {
        const setup = {102:'setupChoices',103:'setupNumInput',104:'setupItemChoice'}[this.nextEventCode()];
        if (setup) { this._index++; this[setup](this.currentCommand().parameters); return; }
        if (this.nextEventCode() !== 357) return;
        const [provider,name,,raw] = this._list[this._index+1].parameters;
        if (![catalog.pluginId,catalog.reference.pluginId].includes(provider) || !handlers[name]) return;
        if (name === 'SelectSkill' && !Imported.VisuMZ_1_SkillsStatesCore) return;
        const schema = catalog.commands.find(command => command.key === name);
        const args = resolveMessageSettings(schema.args,raw,this);
        this._index++;
        handlers[name](args);
    };
    const window = Window_EventItem.prototype;
    const includes = window.includes;
    window.includes = function(item) {
        const kind = $gameMessage.itemChoiceItypeId();
        if (kind === 'weapon') return DataManager.isWeapon(item) && (!$gameMessage.itemChoiceWtypeId() || item.wtypeId === $gameMessage.itemChoiceWtypeId());
        if (kind === 'armor') return DataManager.isArmor(item) && (!$gameMessage.itemChoiceAtypeId() || item.atypeId === $gameMessage.itemChoiceAtypeId()) && (!$gameMessage.itemChoiceEtypeId() || item.etypeId === $gameMessage.itemChoiceEtypeId());
        if (kind === 'skill') {
            if (!DataManager.isSkill(item) || !Imported.VisuMZ_1_SkillsStatesCore) return false;
            const actor = $gameMessage.itemChoiceActor();
            return !!actor && !actor.isSkillHidden(item) && actor.isSkillTypeMatchForUse(item) && (!$gameMessage.itemChoiceStypeId() || DataManager.getSkillTypes(item).includes($gameMessage.itemChoiceStypeId()));
        }
        return includes.call(this,item);
    };
    window.makeSkillList = function() {
        this._data = ($gameMessage.itemChoiceActor()?.skills() || []).filter(item => this.includes(item));
        if (this.includes(null)) this._data.push(null);
    };
    window.makeItemList = function() {
        if ($gameMessage.itemChoiceItypeId() === 'skill' && Imported.VisuMZ_1_SkillsStatesCore) this.makeSkillList();
        else Window_ItemList.prototype.makeItemList.call(this);
    };
    const drawNumber = Window_ItemList.prototype.drawItemNumber;
    Window_ItemList.prototype.drawItemNumber = function(item,x,y,width) {
        if ($gameMessage.itemChoiceItypeId() === 'skill') this.drawSkillCost($gameMessage.itemChoiceActor(),item,x,y,width);
        else drawNumber.apply(this,arguments);
    };
}
installMessageSelectors();
