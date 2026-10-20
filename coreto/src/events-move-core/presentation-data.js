function installEventsMovePresentationData(settings) {
    const iconKey = event => event === $gamePlayer ? 'Player' : 'Map' + event._mapId + '-Event' + event._eventId;
    const defaultIcon = () => ({iconIndex: 0, bufferX: settings.Icon.BufferX, bufferY: settings.Icon.BufferY, blendMode: settings.Icon.BlendMode});
    Game_System.prototype.getEventIconData = function(event) { this._EventIcons ??= {}; return event ? this._EventIcons[iconKey(event)] ?? (event === $gamePlayer ? null : this._EventIcons[iconKey(event)] = defaultIcon()) : null; };
    Game_System.prototype.setEventIconData = function(event, iconIndex, bufferX, bufferY, blendMode) { this._EventIcons ??= {}; this._EventIcons[iconKey(event)] = {iconIndex, bufferX, bufferY, blendMode}; };
    Game_System.prototype.setEventIconDataKey = function(map, event, iconIndex, bufferX, bufferY, blendMode, forced) { this._EventIcons ??= {}; this._EventIcons['Map' + map + '-Event' + event] = {iconIndex, bufferX, bufferY, blendMode, forced}; };
    Game_System.prototype.deleteIconsOnEventsDataKey = function(map, event) { this.setEventIconDataKey(map, event, -1, 0, 0, 0, false); };
    Game_System.prototype.deleteIconsOnEventsData = function(event) { this._EventIcons ??= {}; if (event === $gamePlayer) delete this._EventIcons.Player; else if (event) this.deleteIconsOnEventsDataKey(event._mapId, event._eventId); };
    Game_System.prototype.resetIconsOnEventsDataKey = function(map, event) { this._EventIcons ??= {}; const key = 'Map' + map + '-Event' + event, data = this._EventIcons[key]; if (!data || data.iconIndex >= 0 && !data.forced) delete this._EventIcons[key]; };
    Game_System.prototype.resetIconsOnEventsData = function(event) { if (event === $gamePlayer) this.deleteIconsOnEventsData(event); else if (event) this.resetIconsOnEventsDataKey(event._mapId, event._eventId); };
    Game_System.prototype.restoreIconsOnEventsDataKey = function(map, event) { this._EventIcons ??= {}; delete this._EventIcons['Map' + map + '-Event' + event]; if (map === $gameMap.mapId()) $gameMap.event(event)?.setupPageSettings(); };
    Game_System.prototype.eventLabelsVisible = function() { this._EventsMoveCoreSettings ??= {}; return this._EventsMoveCoreSettings.VisibleEventLabels ?? true; };
    Game_System.prototype.setEventLabelsVisible = function(value) { this._EventsMoveCoreSettings ??= {}; this._EventsMoveCoreSettings.VisibleEventLabels = value; };
    Game_CharacterBase.prototype.getEventIconData = function() { return $gameSystem.getEventIconData(this); };
    Game_CharacterBase.prototype.hasEventIcon = function() { return (this.getEventIconData()?.iconIndex || 0) > 0; };
    Game_CharacterBase.prototype.clearAttachPictureSettings = function() { this._attachPicture = {filename: '', type: 'picture', blendMode: 0, maxSize: 0, offsetX: 0, offsetY: 0, scale: 1}; };
    Game_CharacterBase.prototype.attachPictureSettings = function() { if (!this._attachPicture) this.clearAttachPictureSettings(); return this._attachPicture; };
    for (const field of ['Filename', 'Type', 'BlendMode', 'MaxSize', 'OffsetX', 'OffsetY', 'Scale']) Game_CharacterBase.prototype['attachPicture' + field] = function() { return this.attachPictureSettings()[field[0].toLowerCase() + field.slice(1)]; };
    Game_Event.prototype.labelWindowText = function() { return this._labelWindow.text; };
    Game_Event.prototype.labelWindowRange = function() { return this._labelWindow.visibleRange; };
    Game_Event.prototype.labelWindowRangeType = function() { return this._labelWindow.rangeType; };
    Game_Event.prototype.updateEventLabelText = function() {
        const previous = $gameTemp.getSelfTarget(); $gameTemp.registerSelfTarget(this);
        try { this._labelWindow.text = this._labelWindow.originalText.replace(/\\V\[(\d+)\]/gi, (_, id) => $gameVariables.value(Number(id))); }
        finally { $gameTemp.registerSelfTarget(previous); }
    };
    Game_Event.prototype.shadowFilename = function() { return this._shadowGraphic.filename; };
    Game_Event.prototype.isShadowVisible = function() { return this._shadowGraphic.visible && !$gamePlayer._noEventMovementShadow && Game_CharacterBase.prototype.isShadowVisible.call(this); };
    const blend = value => Math.max(0, ['NORMAL', 'ADDITIVE', 'MULTIPLY', 'SCREEN'].indexOf(value.toUpperCase().trim()));
    function parse(event, text) {
        const apply = (pattern, action) => { const match = pattern.exec(text); if (match) action(match); };
        const offsets = (prefix, target, x, y) => {
            apply(new RegExp('<' + prefix + ' X: ([+-]\\d+)>', 'i'), m => target[x] = Number(m[1]));
            apply(new RegExp('<' + prefix + ' Y: ([+-]\\d+)>', 'i'), m => target[y] = Number(m[1]));
            apply(new RegExp('<' + prefix + ': ([+-]\\d+), ([+-]\\d+)>', 'i'), m => { target[x] = Number(m[1]); target[y] = Number(m[2]); });
        };
        const picture = event._attachPicture, label = event._labelWindow, icon = event._eventIcon;
        apply(/<(?:ATTACH )?PICTURE FILENAME: (.*?)>/i, m => { picture.filename = m[1]; picture.type = 'picture'; });
        apply(/<(?:ATTACH )?(?:PICTURE|ENEMY|SV ENEMY) BLEND MODE: (.*?)>/i, m => picture.blendMode = blend(m[1]));
        apply(/<(?:ATTACH )?(?:PICTURE|ENEMY|SV ENEMY) (?:SIZE|MAX SIZE|MAX): (\d+)>/i, m => picture.maxSize = Number(m[1]));
        offsets('(?:ATTACH )?(?:PICTURE|ENEMY|SV ENEMY) OFFSET', picture, 'offsetX', 'offsetY');
        apply(/<(?:ATTACH )?(?:PICTURE|ENEMY|SV ENEMY) SCALE: (\d+)[%％]>/i, m => picture.scale = Number(m[1]) / 100);
        apply(/<(?:ATTACH )?PICTURE TYPE: (.*?)>/i, m => picture.type = m[1].toLowerCase().trim());
        for (const type of ['ENEMY', 'SV ENEMY']) apply(new RegExp('<(?:ATTACH )?' + type + ' FILENAME: (.*?)>', 'i'), m => { picture.filename = m[1]; picture.type = type.toLowerCase(); });
        apply(/<CUSTOM Z: (.*?)>/i, m => event._customZ = Number(m[1]) || 0);
        if (icon.iconIndex >= 0 && !icon.forced) {
            apply(/<ICON: (\d+)>/i, m => icon.iconIndex = Number(m[1]));
            offsets('ICON (?:BUFFER|OFFSET)', icon, 'bufferX', 'bufferY');
            apply(/<ICON BLEND MODE: (.*?)>/i, m => icon.blendMode = blend(m[1]));
            $gameSystem.setEventIconData(event, icon.iconIndex, icon.bufferX, icon.bufferY, icon.blendMode);
        }
        apply(/<LABEL: (.*?)>/i, m => label.originalText = m[1].trim());
        apply(/<LABEL>\s*([\s\S]*)\s*<\/LABEL>/i, m => label.originalText = m[1].trim());
        offsets('LABEL (?:BUFFER|OFFSET)', label, 'offsetX', 'offsetY');
        apply(/<LABEL HUE SHIFT: (.*?)>/i, m => label.hueShift = Number(m[1]));
        apply(/<LABEL RANGE: (\d+)>/i, m => label.visibleRange = Number(m[1]));
        apply(/<LABEL RANGE TYPE: (SQUARE|CIRCLE|RADIUS|DELTA|DIAMOND)>/i, m => label.rangeType = /RADIUS|DELTA|DIAMOND/i.test(m[1]) ? 'delta' : m[1].toLowerCase());
        event.updateEventLabelText();
        if (/<MIRROR SPRITE>/i.test(text)) event._mirrorSprite = true;
        for (const axis of ['X', 'Y']) apply(new RegExp('<SCALE ' + axis + ': (\\d+)[%％]>', 'i'), m => event['_scaleBase' + axis] = Number(m[1]) / 100);
        apply(/<SCALE: (\d+)[%％]>/i, m => event._scaleBaseX = event._scaleBaseY = Number(m[1]) / 100);
        if (/<HIDE SHADOW>/i.test(text)) event._shadowGraphic.visible = false;
        apply(/<SHADOW FILENAME: (.*?)>/i, m => event._shadowGraphic.filename = m[1]);
        offsets('SPRITE OFFSET', event, '_spriteOffsetX', '_spriteOffsetY');
        apply(/<STEP PATTERN: (.*)>/i, m => event._stepPattern = m[1].toUpperCase().trim());
        for (const side of ['up', 'down', 'left', 'right']) apply(new RegExp('<(?:TILE EXPAND|EXPAND TILE) ' + side + ': (\\d+)>', 'i'), m => event._tileExpand[side] = Number(m[1]));
    }
    Game_Event.prototype.checkEventsMoveCoreStringTags = function(text) { parse(this, text); };
    Game_Event.prototype.setupPresentationData = function(active) {
        this.clearAttachPictureSettings(); this.clearSpriteOffsets(); this.clearStepPattern();
        this._scaleBaseX = 1; this._scaleBaseY = 1; this._mirrorSprite = false;
        this._customZ = (this.isTile() || this.isObjectCharacter()) && this._priorityType === 0 ? 0 : false;
        this._tileExpand = {up: 0, down: 0, left: 0, right: 0};
        this._shadowGraphic = {visible: true, filename: settings.Movement.DefaultShadow};
        this._labelWindow = {originalText: '', text: '', visibleRange: settings.Label.VisibleRange, rangeType: settings.Label.RangeType, offsetX: settings.Label.OffsetX, offsetY: settings.Label.OffsetY, hueShift: 0};
        $gameSystem.resetIconsOnEventsData(this); this._eventIcon = this.getEventIconData();
        if (active) {
            this.checkEventsMoveCoreStringTags(this.event().note);
            this.checkEventsMoveCoreStringTags(this.list().filter(command => [108, 408].includes(command.code)).map(command => command.parameters[0]).join('\n'));
        }
    };
    for (const method of ['setupPageSettings', 'clearPageSettings']) {
        const native = Game_Event.prototype[method];
        Game_Event.prototype[method] = function() { native.call(this); this.setupPresentationData(method === 'setupPageSettings'); };
    }
    function value(expression, interpreter) { return new Function('return ' + expression).call(interpreter); }
    function target(args, interpreter) { return [value(args.MapId, interpreter) || $gameMap.mapId(), value(args.EventId, interpreter) || interpreter.eventId()]; }
    function iconValues(args, interpreter) { return [value(args.IconIndex, interpreter), value(args.IconBufferX, interpreter), value(args.IconBufferY, interpreter), args.IconBlendMode]; }
    return {
        ShadowHidePlayer() { $gamePlayer._noMovementShadow = true; },
        ShadowShowPlayer() { $gamePlayer._noMovementShadow = false; },
        ShadowHideFollowers() { $gamePlayer._noFollowerMovementShadow = true; },
        ShadowShowFollowers() { $gamePlayer._noFollowerMovementShadow = false; },
        ShadowHideAllEvents() { $gamePlayer._noEventMovementShadow = true; },
        ShadowShowAllEvents() { $gamePlayer._noEventMovementShadow = false; },
        EventIconChange(args) { $gameSystem.setEventIconDataKey(...target(args, this), ...iconValues(args, this), false); },
        EventIconChangeForced(args) { $gameSystem.setEventIconDataKey(...target(args, this), ...iconValues(args, this), true); },
        EventIconDelete(args) { $gameSystem.deleteIconsOnEventsDataKey(...target(args, this)); },
        EventIconRestore(args) { $gameSystem.restoreIconsOnEventsDataKey(...target(args, this)); },
        PlayerIconChange(args) { $gameSystem.setEventIconData($gamePlayer, ...iconValues(args, this)); },
        PlayerIconDelete() { $gameSystem.deleteIconsOnEventsData($gamePlayer); },
        EventLabelVisible(args) { $gameSystem.setEventLabelsVisible(args.Visibility === 'Toggle' ? !$gameSystem.eventLabelsVisible() : args.Visibility === 'Visible'); },
        EventLabelRefresh() { for (const event of $gameMap.events()) { event.refresh(); event.updateEventLabelText(); } SceneManager._scene?._spriteset?.refreshEventLabels(); }
    };
}
