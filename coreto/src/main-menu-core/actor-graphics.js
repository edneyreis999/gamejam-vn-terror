function installMainMenuActorGraphics(settings) {
    ImageManager.svActorHorzCells = ImageManager.svActorHorzCells || 9;
    ImageManager.svActorVertCells = ImageManager.svActorVertCells || 6;
    Window_Base.prototype.drawSvActor = function(name, x, y) {
        const bitmap = ImageManager.loadSvActor(name), single = /\$/i.test(name);
        const width = bitmap.width / (single ? 1 : ImageManager.svActorHorzCells);
        const height = bitmap.height / (single ? 1 : ImageManager.svActorVertCells);
        this.contents.blt(bitmap, 0, 0, width, height, x - width / 2, y - height);
    };
    const setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        setup.call(this, actorId);
        this.initMenuImage();
    };
    Game_Actor.prototype.initMenuImage = function() {
        this._menuImage = this.actor().note.match(/<MENU (?:IMAGE|PORTRAIT):[ ](.*)>/i)?.[1] || '';
    };
    Game_Actor.prototype.getMenuImage = function() {
        if (this._menuImage === undefined) this.initMenuImage();
        return this._menuImage;
    };
    Game_Actor.prototype.setMenuImage = function(filename) { this._menuImage = filename; };
    for (const [axis, index] of [['X', 1], ['Y', 2]]) {
        Game_Actor.prototype['getMenuImageOffset' + axis] = function() {
            const note = this.actor().note;
            const individual = note.match(new RegExp('<MENU (?:IMAGE|PORTRAIT) OFFSET ' + axis + ':[ ]([\\+\\-]\\d+)>', 'i'));
            const pair = note.match(/<MENU (?:IMAGE|PORTRAIT) OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i);
            return Number(individual?.[1] ?? pair?.[index] ?? 0);
        };
    }
    const loadFaces = Window_StatusBase.prototype.loadFaceImages;
    Window_StatusBase.prototype.loadFaceImages = function() {
        loadFaces.call(this);
        this.loadOtherActorImages();
    };
    Window_StatusBase.prototype.loadOtherActorImages = function() {
        for (const actor of $gameParty.members()) {
            if (actor.characterName()) ImageManager.loadCharacter(actor.characterName());
            if (actor.battlerName()) ImageManager.loadSvActor(actor.battlerName());
            if (actor.getMenuImage()) ImageManager.loadPicture(actor.getMenuImage());
        }
    };
    Window_StatusBase.prototype.graphicType = function() { return settings.StatusGraphic; };
    Window_EquipStatus.prototype.drawActorFace = function(actor, x, y, width, height) {
        switch (this.graphicType()) {
            case 'none': return;
            case 'sprite': return this.drawItemActorSprite(actor, x, y, width, height);
            case 'svbattler': return this.drawItemActorSvBattler(actor, x, y, width, height);
            default: return Window_StatusBase.prototype.drawActorFace.call(this, actor, x, y, width, height);
        }
    };
    function paintActor(window, actor, draw) {
        if (window.constructor === Window_MenuStatus) window.changePaintOpacity(actor.isBattleMember());
        draw();
        window.changePaintOpacity(true);
    }
    Window_StatusBase.prototype.drawItemActorFace = function(actor, x, y, width, height) {
        width = width || ImageManager.faceWidth; height = height || ImageManager.faceHeight;
        paintActor(this, actor, () => this.drawActorFace(actor, x + Math.floor((width - ImageManager.faceWidth) / 2), y, ImageManager.faceWidth, height - 2));
    };
    Window_StatusBase.prototype.drawItemActorSprite = function(actor, x, y, width, height) {
        width = width || ImageManager.faceWidth; height = height || ImageManager.faceHeight;
        const bitmap = ImageManager.loadCharacter(actor.characterName()), big = ImageManager.isBigCharacter(actor.characterName());
        const cellWidth = bitmap.width / (big ? 3 : 12), cellHeight = bitmap.height / (big ? 4 : 8);
        const index = big ? 0 : actor.characterIndex();
        paintActor(this, actor, () => this.contents.blt(bitmap,
            (index % 4 * 3 + 1) * cellWidth, Math.floor(index / 4) * 4 * cellHeight,
            Math.min(width, cellWidth), Math.min(height, cellHeight),
            Math.floor(x + Math.max(width - cellWidth, 0) / 2), Math.floor(y + Math.max(height - cellHeight, 0) / 2)));
    };
    Window_StatusBase.prototype.drawItemActorSvBattler = function(actor, x, y, width, height) {
        width = width || ImageManager.faceWidth; height = height || ImageManager.faceHeight;
        const bitmap = ImageManager.loadSvActor(actor.battlerName()), isStatic = actor.hasStaticSvBattler?.();
        const sw = bitmap.width / (isStatic ? 1 : ImageManager.svActorHorzCells), sh = bitmap.height / (isStatic ? 1 : ImageManager.svActorVertCells);
        const scale = Math.min(1, width / sw, height / sh), dw = sw * scale, dh = sh * scale;
        paintActor(this, actor, () => this.contents.blt(bitmap, 0, 0, sw, sh, Math.floor(x + (width - dw) / 2), Math.floor(y + (height - dh) / 2), dw, dh));
    };
    Window_StatusBase.prototype.drawItemActorMenuImage = function(actor, x, y, width, height) {
        const bitmap = ImageManager.loadPicture(actor.getMenuImage());
        width = (width || ImageManager.faceWidth) - 2; height = (height || ImageManager.faceHeight) - 2;
        const sw = Math.min(width, bitmap.width), sh = Math.min(height, bitmap.height);
        paintActor(this, actor, () => this.contents.blt(bitmap,
            Math.round((bitmap.width - sw) / 2) - actor.getMenuImageOffsetX(),
            Math.round((bitmap.height - sh) / 2) - actor.getMenuImageOffsetY(), sw, sh,
            x + 1, Math.max(y + 1, y + height - bitmap.height + 1)));
    };
    const styles = settings.ListStyles;
    Window_MenuStatus.prototype.showOnlyBattleMembers = function() {
        return !settings.General.ShowReserve && (!settings.General.HideMainMenuOnly || SceneManager._scene.constructor === Scene_Menu);
    };
    const maxItems = Window_MenuStatus.prototype.maxItems;
    Window_MenuStatus.prototype.maxItems = function() { return this.showOnlyBattleMembers() ? $gameParty.battleMembers().length : maxItems.call(this); };
    Window_MenuStatus.prototype.listStyle = function() {
        return SceneManager._scene.constructor === Scene_Menu ? settings.StatusListStyle : settings.InnerMenuListStyle;
    };
    Window_MenuStatus.prototype.numVisibleRows = function() { return ['vertical', 'portrait', 'solo'].includes(this.listStyle()) ? 1 : $gameParty.maxBattleMembers(); };
    Window_MenuStatus.prototype.maxCols = function() { return ['vertical', 'portrait'].includes(this.listStyle()) ? $gameParty.maxBattleMembers() : 1; };
    const itemHeight = Window_MenuStatus.prototype.itemHeight;
    Window_MenuStatus.prototype.itemHeight = function() {
        const style = this.listStyle();
        if (['vertical', 'portrait', 'solo'].includes(style)) return this.innerHeight;
        if (style === 'thin') return Window_Selectable.prototype.itemHeight.call(this);
        if (style === 'thicker') return this.lineHeight() * 2 + 8;
        return itemHeight.call(this);
    };
    Window_MenuStatus.prototype.drawItem = function(index) {
        this.drawPendingItemBackground(index);
        this.drawItemStatus(index);
    };
    Window_MenuStatus.prototype.drawItemStatus = function(index) {
        this.resetFontSettings();
        const actor = this.actor(index), rect = this.itemRect(index), style = this.listStyle();
        const name = style[0].toUpperCase() + style.slice(1);
        this['drawItemStatus' + name + 'Style'](actor, rect);
    };
    for (const name of ['Default', 'Vertical', 'Thin', 'Thicker']) {
        Window_MenuStatus.prototype['drawItemStatus' + name + 'Style'] = function(actor, rect) { styles[name + 'Style'].call(this, actor, rect); };
    }
    function drawLoaded(window, actor, rect, style) {
        const filename = actor.getMenuImage(), contents = window.contents;
        ImageManager.loadPicture(filename).addLoadListener(() => {
            if (window._destroyed || window.contents !== contents || actor.getMenuImage() !== filename) return;
            const index = $gameParty.members().indexOf(actor);
            if (index < 0 || index >= window.maxItems()) return;
            const current = window.itemRect(index);
            if (['x', 'y', 'width', 'height'].some(key => current[key] !== rect[key])) return;
            window['drawItemStatus' + style + 'OnLoad'](actor, rect);
        });
    }
    Window_MenuStatus.prototype.drawItemStatusPortraitStyle = function(actor, rect) {
        if (actor.getMenuImage()) drawLoaded(this, actor, rect, 'PortraitStyle');
        else this.drawItemStatusVerticalStyle(actor, rect);
    };
    Window_MenuStatus.prototype.drawItemStatusSoloStyle = function(actor, rect) { drawLoaded(this, actor, rect, 'SoloStyle'); };
    for (const style of ['PortraitStyle', 'SoloStyle']) {
        Window_MenuStatus.prototype['drawItemStatus' + style + 'OnLoad'] = function(actor, rect) { styles[style].call(this, actor, rect); };
    }
    Window_MenuStatus.prototype.isExpGaugeDrawn = function() {
        return !['thin', 'thicker'].includes(this.listStyle()) && Window_StatusBase.prototype.isExpGaugeDrawn.call(this);
    };
    const selectLast = Window_MenuStatus.prototype.selectLast;
    Window_MenuStatus.prototype.selectLast = function() {
        if (settings.General.StatusSelectLast) selectLast.call(this);
        else this.smoothSelect(0);
    };
    Window_MenuStatus.prototype.drawActorGraphic = function(actor, x, y, width, height) {
        switch (this.graphicType()) {
            case 'none': return;
            case 'sprite': return this.drawItemActorSprite(actor, x, y + 1, width, height - 2);
            case 'svbattler': return this.drawItemActorSvBattler(actor, x, y + 1, width, height - 2);
            default: return this.drawItemActorFace(actor, x, y, width, height);
        }
    };
}
