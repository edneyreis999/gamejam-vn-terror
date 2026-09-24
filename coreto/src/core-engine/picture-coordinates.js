function installPictureCoordinates(metadata) {
    const command = catalog.commands.find(command => command.key === 'PictureCoordinatesMode');
    const waitMode = 'coretoCoordinates';
    let active = null;

    class CoordinatesWindow extends Window_Base {
        constructor(snapshot) {
            const height = Window_Base.prototype.lineHeight();
            super(new Rectangle(0, Graphics.height - height, Graphics.width, height));
            this.setBackgroundType(2);
            this.setSnapshot(snapshot);
        }
        updatePadding() { this.padding = 0; }
        setSnapshot(snapshot) {
            if (this._snapshot && ['origin', 'x', 'y'].every(key => this._snapshot[key] === snapshot[key])) return;
            this._snapshot = snapshot;
            this.contents.clear();
            this.contents.fillRect(0, 0, this.innerWidth, this.innerHeight, ColorManager.itemBackColor1());
            const width = Math.floor(this.innerWidth / 4);
            this.drawText(`Origem: ${snapshot.origin === 0 ? 'Superior esquerda' : 'Centro'}`, 0, 0, width);
            this.drawText(`X: ${snapshot.x}`, width, 0, width, 'center');
            this.drawText(`Y: ${snapshot.y}`, width * 2, 0, width, 'center');
            this.drawTextEx(`${TextManager.getInputButtonString('cancel')}: salvar e sair`, width * 3, 0, width);
        }
    }
    function tracking() { return active?.phase === 'tracking' && active.scene === SceneManager._scene; }
    function removePanel(record) {
        if (!record.panel) return;
        record.panel.parent?.removeChild(record.panel);
        record.panel.destroy();
        if (record.scene._coretoCoordinatesWindow === record.panel) record.scene._coretoCoordinatesWindow = null;
        record.panel = null;
    }
    function clear(record) {
        removePanel(record);
        if (active === record && record.interpreter._waitMode === waitMode) record.interpreter.setWaitMode('');
        if (active === record) active = null;
    }
    function valid(record) {
        const context = record.context;
        const sameContext = context.type === 'troop'
            ? $gameParty.inBattle() && $gameTroop._troopId === context.id
            : !$gameParty.inBattle() && $gameMap.mapId() === context.id;
        return record.scene === SceneManager._scene && sameContext && $gameScreen.picture(record.pictureId) === record.picture;
    }
    function snapshot(record) {
        return {schemaVersion: 1, pictureId: record.pictureId, context: {...record.context},
            origin: record.picture.origin(), x: record.picture._x, y: record.picture._y};
    }
    function validPosition(value) { return [0, 1].includes(value.origin) && Number.isFinite(value.x) && Number.isFinite(value.y); }
    function update() {
        const record = active;
        if (!record || record.phase !== 'tracking') return;
        if (!valid(record) || !validPosition(snapshot(record))) { clear(record); return; }
        if (TouchInput.isCancelled() || Input.isTriggered('cancel')) {
            // The exit event can carry a different pointer position; save the panel already shown.
            const frozen = Object.freeze({...record.panel._snapshot, context: Object.freeze({...record.context}), capturedAt: new Date().toISOString()});
            record.phase = 'writing';
            removePanel(record);
            Input.clear();
            TouchInput.clear();
            record.interpreter.setWaitMode('');
            metadata.writeCoordinates(record.interpreter, frozen).finally(() => clear(record));
            return;
        }
        if (!record.scene._spriteset) updatePosition(record);
    }
    function updatePosition(record) {
        if (!valid(record)) { clear(record); return; }
        if (!Number.isFinite(TouchInput.x) || !Number.isFinite(TouchInput.y)) return;
        const container = record.scene._spriteset?._pictureContainer ?? record.scene;
        const position = container.toLocal(new Point(TouchInput.x, TouchInput.y));
        if (record.picture.isMapScrollLinked()) {
            position.x = position.x / $gameScreen.zoomScale() + $gameMap.displayX() * $gameMap.tileWidth();
            position.y = position.y / $gameScreen.zoomScale() + $gameMap.displayY() * $gameMap.tileHeight();
        }
        if (!Number.isFinite(position.x) || !Number.isFinite(position.y)) return;
        record.picture._x = record.picture._targetX = position.x;
        record.picture._y = record.picture._targetY = position.y;
        record.panel.setSnapshot(snapshot(record));
        const sprite = record.scene._spriteset?._pictureContainer.children.find(sprite => sprite._pictureId === record.pictureId);
        if (sprite) sprite.updatePosition();
    }
    PluginManager.registerCommand(catalog.pluginId, command.key, function(raw) {
        if (!$gameTemp.isPlaytest()) { $textPopup('Coordenadas disponíveis somente em playtest.'); return; }
        if (active) { $textPopup('Uma inspeção de coordenadas já está em andamento.'); return; }
        const args = convertEventArguments(command, raw);
        const pictureId = args.PictureID;
        const context = $gameParty.inBattle() ? {type: 'troop', id: $gameTroop._troopId} : {type: 'map', id: $gameMap.mapId()};
        const picture = $gameScreen.picture(pictureId);
        const scene = SceneManager._scene;
        if (!Number.isSafeInteger(pictureId) || pictureId < 1 || pictureId > $gameScreen.maxPictures() || !picture || !Number.isSafeInteger(context.id) || context.id <= 0 || !scene) {
            $textPopup('Coordenadas: picture ou contexto inválido.');
            return;
        }
        const record = {phase: 'tracking', interpreter: this, scene, pictureId, picture, context, panel: null};
        const value = snapshot(record);
        if (!validPosition(value)) { $textPopup('Coordenadas: posição ou origem inválida.'); return; }
        record.panel = new CoordinatesWindow(value);
        scene._coretoCoordinatesWindow = record.panel;
        scene.addChild(record.panel);
        active = record;
        $gameTemp.clearDestination();
        this.setWaitMode(waitMode);
    });
    const updateScene = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function(...args) {
        if (active?.scene === this) update();
        return updateScene.apply(this, args);
    };
    const updateSpriteset = Spriteset_Base.prototype.update;
    Spriteset_Base.prototype.update = function(...args) {
        const result = updateSpriteset.apply(this, args);
        if (tracking() && active.scene._spriteset === this) updatePosition(active);
        return result;
    };
    const updateWait = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function(...args) {
        if (this._waitMode !== waitMode) return updateWait.apply(this, args);
        if (active?.interpreter === this && active.phase === 'tracking') {
            if (valid(active)) return true;
            clear(active);
        }
        this.setWaitMode('');
        return false;
    };
    for (const [prototype, method] of [[Game_Player.prototype, 'canMove'], [Scene_Map.prototype, 'isMenuEnabled'],
        [Window_Selectable.prototype, 'isOpenAndActive'], [Sprite_Clickable.prototype, 'isClickEnabled']]) {
        const previous = prototype[method];
        prototype[method] = function(...args) { return tracking() ? false : previous.apply(this, args); };
    }
    const setDestination = Game_Temp.prototype.setDestination;
    Game_Temp.prototype.setDestination = function(...args) { if (!tracking()) return setDestination.apply(this, args); };
    for (const method of ['clear', 'terminate']) {
        const previous = Game_Interpreter.prototype[method];
        Game_Interpreter.prototype[method] = function(...args) {
            for (let interpreter = this; interpreter; interpreter = interpreter._childInterpreter) {
                if (active?.interpreter === interpreter) clear(active);
            }
            return previous.apply(this, args);
        };
    }
    for (const method of ['terminate', 'destroy']) {
        const previous = Scene_Base.prototype[method];
        Scene_Base.prototype[method] = function(...args) {
            if (active?.scene === this) clear(active);
            return previous.apply(this, args);
        };
    }
    for (const [object, method] of [[Game_Map.prototype, 'setup'], [DataManager, 'createGameObjects'], [DataManager, 'extractSaveContents']]) {
        const previous = object[method];
        object[method] = function(...args) {
            if (active) clear(active);
            return previous.apply(this, args);
        };
    }
}
