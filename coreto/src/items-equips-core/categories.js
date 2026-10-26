function itemsCategoryIncludes(type, item) {
    const isItem = DataManager.isItem(item);
    switch (type) {
    case 'AllItems': return isItem;
    case 'RegularItems': return isItem && item.itypeId === 1;
    case 'KeyItems': return isItem && item.itypeId === 2;
    case 'HiddenItemA': return isItem && item.itypeId === 3;
    case 'HiddenItemB': return isItem && item.itypeId === 4;
    case 'Consumable': return isItem && item.consumable;
    case 'Nonconsumable': return isItem && !item.consumable;
    case 'AlwaysUsable': return isItem && item.occasion === 0;
    case 'BattleUsable': return isItem && [0, 1].includes(item.occasion);
    case 'FieldUsable': return isItem && [0, 2].includes(item.occasion);
    case 'NeverUsable': return isItem && item.occasion === 3;
    case 'AllWeapons': return DataManager.isWeapon(item);
    case 'AllArmors': return DataManager.isArmor(item);
    }
    const source = String(type || '');
    for (const [prefix, names, field, accepts] of [
        ['WTYPE', $dataSystem.weaponTypes, 'wtypeId', DataManager.isWeapon],
        ['ATYPE', $dataSystem.armorTypes, 'atypeId', DataManager.isArmor],
        ['ETYPE', $dataSystem.equipTypes, 'etypeId', DataManager.isArmor]
    ]) {
        const numeric = new RegExp(prefix + ':(\\d+)', 'i').exec(source);
        if (numeric) return !!item && (prefix === 'ETYPE' || accepts.call(DataManager, item)) && item[field] === Number(numeric[1]);
        const named = new RegExp(prefix + ':(.*)', 'i').exec(source);
        if (named) return accepts.call(DataManager, item) && item[field] === names.indexOf(named[1].trim());
    }
    const category = /Category:(.*)/i.exec(source);
    return !!(category && item && item.categories.includes(category[1].toUpperCase().trim()));
}

function installItemsCategories(api) {
    const settings = api.settings.Categories;
    Window_ItemCategory.categoryList = settings.List;
    Window_ItemCategory.categoryItemTypes = ['HiddenItemA', 'HiddenItemB', 'Consumable', 'Nonconsumable', 'AlwaysUsable', 'BattleUsable', 'FieldUsable', 'NeverUsable'];
    Scene_Item.prototype.isPureVanillaMode = function() { return !api.settings.ItemScene.EnableLayout && api.settings.ItemScene.DisabledVanilla; };
    Window_ItemCategory.prototype.categoryStyle = function() {
        return SceneManager._scene?.constructor === Scene_Item && SceneManager._scene.isPureVanillaMode() ? 'text' : settings.Style;
    };
    Window_ItemCategory.prototype.makeCommandList = function() { this.addItemCategories(); this.select(this.index()); };
    Window_ItemCategory.prototype.addItemCategories = function() {
        const pure = SceneManager._scene?.constructor === Scene_Item && SceneManager._scene.isPureVanillaMode();
        const categories = pure ? ['RegularItems', 'AllWeapons', 'AllArmors', 'KeyItems'].map(Type => ({Type, Icon: 0, SwitchID: 0, SortBy: 'ID'})) : Window_ItemCategory.categoryList;
        for (const category of categories) this.addItemCategory(category);
    };
    Window_ItemCategory.prototype.addItemCategory = function(category) {
        if (category.SwitchID > 0 && !$gameSwitches.value(category.SwitchID)) return;
        const type = category.Type;
        let name = '';
        const custom = /Category:(.*)/i.exec(type);
        if (custom) name = custom[1].trim();
        else if (Window_ItemCategory.categoryItemTypes.includes(type)) name = settings[type];
        else if (['AllItems', 'RegularItems'].includes(type)) name = TextManager.item;
        else if (type === 'KeyItems') name = TextManager.keyItem;
        else if (type === 'AllWeapons') name = TextManager.weapon;
        else if (type === 'AllArmors') name = TextManager.armor;
        else {
            for (const [prefix, names] of [['WTYPE', $dataSystem.weaponTypes], ['ATYPE', $dataSystem.armorTypes], ['ETYPE', $dataSystem.equipTypes]]) {
                const match = new RegExp(prefix + ':(\\d+)', 'i').exec(type);
                if (match) { name = names[Number(match[1])] || ''; break; }
            }
        }
        if (TextManager.parseLocalizedText && TextManager.isVisuMzLocalizationEnabled()) {
            const key = name.toLowerCase().trim();
            if (key && $dataLocalization[key]) name = $dataLocalization[key][ConfigManager.textLocale || 'English'] || 'UNDEFINED!';
        }
        if (category.Icon > 0 && this.categoryStyle() !== 'text') name = '\\I[' + category.Icon + ']' + name;
        this.addCommand(name, 'category', true, type);
    };
    Window_ItemCategory.prototype.maxCols = function() { return this._list ? this.maxItems() : 4; };
    Window_ItemCategory.prototype.update = function() {
        Window_HorzCommand.prototype.update.call(this);
        if (this._itemWindow) this._itemWindow.setCategory(this.currentExt());
    };
    const setWindow = Window_ItemCategory.prototype.setItemWindow;
    Window_ItemCategory.prototype.setItemWindow = function(window) { setWindow.call(this, window); window._categoryWindow = this; };
    Window_ItemCategory.prototype.itemTextAlign = function() { return settings.TextAlign; };
    Window_ItemCategory.prototype.categoryStyleCheck = function(index) {
        if (index < 0) return 'text';
        const style = this.categoryStyle();
        if (style !== 'auto') return style;
        const name = this.commandName(index);
        if (!/\\I\[(\d+)\]/i.test(name)) return 'text';
        return this.textSizeEx(name).width <= this.itemLineRect(index).width ? 'iconText' : 'icon';
    };
    Window_ItemCategory.prototype.drawItem = function(index) {
        const style = this.categoryStyleCheck(index);
        if (style === 'icon') this.drawItemStyleIcon(index);
        else if (style === 'iconText') this.drawItemStyleIconText(index);
        else Window_HorzCommand.prototype.drawItem.call(this, index);
    };
    Window_ItemCategory.prototype.drawItemStyleIcon = function(index) {
        const match = /\\I\[(\d+)\]/i.exec(this.commandName(index));
        if (!match) return;
        const rect = this.itemLineRect(index);
        this.drawIcon(Number(match[1]), rect.x + Math.floor((rect.width - ImageManager.iconWidth) / 2), rect.y + (rect.height - ImageManager.iconHeight) / 2);
    };
    Window_ItemCategory.prototype.drawItemStyleIconText = function(index) {
        const rect = this.itemLineRect(index), name = this.commandName(index), width = this.textSizeEx(name).width;
        this.changePaintOpacity(this.isCommandEnabled(index));
        const align = this.itemTextAlign();
        const offset = align === 'right' ? rect.width - width : align === 'center' ? Math.floor((rect.width - width) / 2) : 0;
        this.drawTextEx(name, rect.x + offset, rect.y, width);
    };
    const initialize = Window_ItemCategory.prototype.initialize;
    Window_ItemCategory.prototype.initialize = function(rect) { initialize.call(this, rect); this.createCategoryNameWindow(rect); };
    Window_ItemCategory.prototype.createCategoryNameWindow = function(rect) {
        this._categoryNameWindow = new Window_Base(new Rectangle(0, 0, rect.width, rect.height));
        this._categoryNameWindow.opacity = 0;
        this.addChild(this._categoryNameWindow);
        this.updateCategoryNameWindow();
    };
    Window_ItemCategory.prototype.callUpdateHelp = function() {
        Window_HorzCommand.prototype.callUpdateHelp.call(this);
        if (this._categoryNameWindow) this.updateCategoryNameWindow();
    };
    Window_ItemCategory.prototype.updateCategoryNameWindow = function() {
        const window = this._categoryNameWindow;
        window.contents.clear();
        if (this.categoryStyleCheck(this.index()) !== 'icon') return;
        const rect = this.itemLineRect(this.index()), name = this.commandName(this.index()).replace(/\\I\[(\d+)\]/gi, '');
        window.resetFontSettings();
        window.drawText(name, 0, rect.y, window.innerWidth, 'center');
        window.x = window.width / -2 + rect.x + Math.floor(rect.width / 2) + $gameSystem.windowPadding();
        window.y = Math.floor(rect.height / 2);
    };
    Window_ItemList.prototype.includes = function(item) { return itemsCategoryIncludes(this._category, item); };
    Window_ItemList.prototype.canSortListItemScene = function() { return ['Scene_Battle', 'Scene_Item', 'Scene_Equip', 'Scene_Shop'].includes(SceneManager._scene?.constructor.name); };
    Window_ItemList.prototype.sortListItemScene = function() {
        const category = Window_ItemCategory.categoryList.find(entry => entry.Type === this._category);
        const byName = String(category?.SortBy || 'ID').toUpperCase().trim() === 'NAME';
        this._data.sort((a, b) => !a || !b ? 0 : byName ? a.name.localeCompare(b.name) : b.sortPriority - a.sortPriority || a.id - b.id);
    };
    const makeList = Window_ItemList.prototype.makeItemList;
    Window_ItemList.prototype.makeItemList = function() { makeList.call(this); if (this.canSortListItemScene()) this.sortListItemScene(); };
}
