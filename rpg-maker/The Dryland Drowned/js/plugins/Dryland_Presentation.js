/*:
 * @target MZ
 * @plugindesc Afogados em Terra Seca — integração de apresentação nativa
 * @author Coreto
 * @orderAfter VisuMZ_2_ExtMessageFunc
 * @param LockMovement
 * @text Bloquear movimento do personagem
 * @type boolean
 * @default true
 * @param DisableEventAcceleration
 * @text Bloquear aceleração comum de eventos
 * @type boolean
 * @default true
 * @command BindScrollSkip
 * @text Vincular imagem para pular rolagem
 * @arg picture
 * @text ID da imagem
 * @type number
 * @min 1
 * @arg key
 * @text Tecla nativa
 * @type string
 * @default cancel
 * @command BindInterfacePicture
 * @text Identificar imagem de interface
 * @arg picture
 * @text ID da imagem
 * @type number
 * @min 1
 * @arg name
 * @text Nome do elemento
 * @type string
 * @command InterfaceVisibility
 * @text Registrar visibilidade da interface
 * @arg hidden
 * @text Oculta
 * @type boolean
 * @default false
 * @command ConsumeInput
 * @text Consumir confirmação atual
 * @command ObservationBegin
 * @text Iniciar leitura observacional
 * @arg unit
 * @text Identidade da leitura no mapa
 * @desc 0 usa o ID do evento comum. Em mapas, informe uma identidade reservada pela arquitetura.
 * @type number
 * @min 0
 * @default 0
 * @arg switch
 * @text Já lido — switch de saída
 * @type switch
 * @default 0
 * @command ObservationComplete
 * @text Concluir leitura observacional
 * @command ReadingPermission
 * @text Preparar controles de leitura
 * @arg switch
 * @text Unidade já lida
 * @type switch
 * @default 0
 * @command ReadingEnd
 * @text Encerrar controles de leitura
 * @command ChoiceFocus
 * @text Preparar foco das escolhas
 * @arg key
 * @text Grupo da interface
 * @type string
 * @arg remember
 * @text Restaurar último foco
 * @type boolean
 * @default false
 * @arg horizontal
 * @text Navegação horizontal
 * @type boolean
 * @default false
 * @command MotionPreference
 * @text Consultar movimento reduzido
 * @arg variable
 * @text Variável de saída
 * @type variable
 * @default 47
 * @command ArmEffect
 * @text Preparar efeito desta sessão
 * @arg key
 * @type string
 * @command TakeEffect
 * @text Consumir efeito desta sessão
 * @arg key
 * @type string
 * @arg variable
 * @type variable
 * @help
 * Coloque Iniciar/Concluir leitura observacional junto ao texto nativo.
 * Uma unidade só é marcada como lida ao chegar ao comando Concluir.
 * Use uma unidade por evento comum. Trocar o seletor para outro evento
 * cria uma identidade de leitura diferente. Cancelar não conclui a unidade.
 * Em mapas, informe uma identidade explícita e única por unidade.
 * Maps037–044 reservam 82–113, identidades das leituras dos oito heróis.
 * Para texto de campanha, consulte passageRead no Bridge e passe o switch
 * a Preparar controles de leitura; encerre antes de ReadingComplete.
 * FAST usa o provedor instalado e exige seleção do jogador.
 * Cada nova unidade, escolha e transferência desliga os modos anteriores.
 * Imagens, posições, textos e movimentos são autorados nos eventos.
 */
(() => {
  'use strict';
  const initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    initialize.call(this);
    this._drylandReadUnits = [];
    this.setExtendedFastForwardDisallowed(true);
  };
  const resetModes = () => {
    $gameTemp.setMessageAutoForwardMode(false);
    $gameTemp.setExtendedFastForwardMode(false);
  };
  function readingPermission(interpreter, allowed) {
    PluginManager.callCommand(interpreter, 'VisuMZ_2_ExtMessageFunc', 'ExtFastFwdDisallow', { 'Allow:eval': String(allowed) });
    resetModes();
  }
  const setupInterpreter = Game_Interpreter.prototype.setup;
  Game_Interpreter.prototype.setup = function(list, eventId) {
    setupInterpreter.call(this, list, eventId);
    this._drylandCommonEventId = $dataCommonEvents.find(event => event?.list === list)?.id;
  };
  const clearInterpreter = Game_Interpreter.prototype.clear;
  Game_Interpreter.prototype.clear = function() {
    for (let current = this; current; current = current._childInterpreter) {
      if (current._drylandReadingUnitActive) { readingPermission(this, false); break; }
    }
    clearInterpreter.call(this);
    delete this._drylandCommonEventId;
    delete this._drylandObservedUnit;
    delete this._drylandReadingUnitActive;
  };
  PluginManager.registerCommand('Dryland_Presentation', 'ObservationBegin', function(args) {
    const explicit = Number(args.unit ?? 0);
    const id = explicit === 0 ? this._drylandCommonEventId : explicit;
    if (!Number.isInteger(id) || id < 1) throw new Error('Observational reading requires a Common Event or a positive integer unit ID.');
    this._drylandObservedUnit = id;
    this._drylandReadingUnitActive = true;
    const read = $gameSystem._drylandReadUnits.includes(id);
    if (Number(args.switch) > 0) $gameSwitches.setValue(Number(args.switch), read);
    readingPermission(this, read);
  });
  PluginManager.registerCommand('Dryland_Presentation', 'ObservationComplete', function() {
    const id = this._drylandObservedUnit;
    if (!id) throw new Error('Observational reading has not started.');
    if (!$gameSystem._drylandReadUnits.includes(id)) $gameSystem._drylandReadUnits.push(id);
    delete this._drylandObservedUnit;
    delete this._drylandReadingUnitActive;
    readingPermission(this, false);
  });
  PluginManager.registerCommand('Dryland_Presentation', 'ReadingPermission', function(args) {
    this._drylandReadingUnitActive = true;
    readingPermission(this, Number(args.switch) > 0 && $gameSwitches.value(Number(args.switch)));
  });
  PluginManager.registerCommand('Dryland_Presentation', 'ReadingEnd', function() {
    delete this._drylandReadingUnitActive;
    readingPermission(this, false);
  });
  const consoleColor = Window_ButtonConsole.prototype.textColorID;
  Window_ButtonConsole.prototype.textColorID = function() {
    if (this._type === 'auto' && $gameSystem.isExtendedFastForwardDisallowed()) return Window_ButtonConsole.TEXT_COLOR_DISABLED;
    return consoleColor.call(this);
  };
  const consoleTouch = Window_ButtonConsole.prototype.isTouchScrollEnabled;
  Window_ButtonConsole.prototype.isTouchScrollEnabled = function() {
    return !(this._type === 'auto' && $gameSystem.isExtendedFastForwardDisallowed()) && consoleTouch.call(this);
  };
  const messageTriggered = Window_Message.prototype.isTriggered;
  Window_Message.prototype.isTriggered = function() {
    if ($gameSystem.isExtendedFastForwardDisallowed() && TouchInput.isPressed() &&
        this._buttonConsoleButtons.some(button => button.worldVisible &&
          ['auto', 'fastfwd'].includes(button._type) && button.getBounds().contains(TouchInput.x, TouchInput.y))) return false;
    return messageTriggered.call(this);
  };
  const toggleAuto = Window_Message.prototype.toggleAutoForward;
  Window_Message.prototype.toggleAutoForward = function() {
    if (!$gameSystem.isExtendedFastForwardDisallowed()) toggleAuto.call(this);
  };
  const terminateMap = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    resetModes();
    terminateMap.call(this);
  };
  const loadGame = DataManager.loadGame;
  DataManager.loadGame = function(id) {
    readingPermission(null, false);
    return loadGame.call(this, id).then(result => { resetModes(); return result; });
  };
  const transfer = Game_Interpreter.prototype.command201;
  Game_Interpreter.prototype.command201 = function(params) {
    readingPermission(this, false);
    return transfer.call(this, params);
  };
  PluginManager.registerCommand('Dryland_Presentation', 'ChoiceFocus', function(args) {
    this._drylandChoiceFocus = { key: args.key, remember: args.remember === 'true', horizontal: args.horizontal === 'true' };
  });
  const setupChoices = Game_Interpreter.prototype.setupChoices;
  Game_Interpreter.prototype.setupChoices = function(params) {
    readingPermission(this, false);
    setupChoices.call(this, params);
    $gameMessage._drylandChoiceFocus = this._drylandChoiceFocus;
    delete this._drylandChoiceFocus;
  };
  const clearMessage = Game_Message.prototype.clear;
  Game_Message.prototype.clear = function() {
    clearMessage.call(this);
    delete this._drylandChoiceFocus;
  };
  const startChoices = Window_ChoiceList.prototype.start;
  Window_ChoiceList.prototype.start = function() {
    const options = $gameMessage._drylandChoiceFocus;
    const previous = options?.remember && $gameTemp._drylandFocus?.[options.key];
    startChoices.call(this);
    const remembered = previous ? this._list.findIndex(command => command.name === previous) : this.index();
    const available = this._list.map((command, index) => index).filter(index => this.isCommandEnabled(index));
    this.select(available.find(index => index >= remembered) ?? available[0] ?? -1);
  };
  const selectChoice = Window_ChoiceList.prototype.select;
  const hitChoice = Window_ChoiceList.prototype.hitTest;
  Window_ChoiceList.prototype.hitTest = function(x, y) {
    const index = hitChoice.call(this, x, y);
    return index >= 0 && !this.isCommandEnabled(index) ? -1 : index;
  };
  Window_ChoiceList.prototype.select = function(index) {
    if (interfaceHidden()) return;
    if (index >= 0 && this._list[index] && !this.isCommandEnabled(index)) return;
    selectChoice.call(this, index);
    const options = $gameMessage._drylandChoiceFocus;
    if (options?.remember && this._list[index]) {
      $gameTemp._drylandFocus ||= {};
      $gameTemp._drylandFocus[options.key] = this._list[index].name;
    }
  };
  for (const [name, direction] of [['cursorRight', 1], ['cursorLeft', -1], ['cursorDown', 1], ['cursorUp', -1]]) {
    Window_ChoiceList.prototype[name] = function(wrap) {
      const available = this._list.map((command, index) => index).filter(index => this.isCommandEnabled(index));
      if (!available.length) { this.select(-1); return; }
      const sprites = [];
      const collect = container => {
        for (const child of container?.children || []) {
          if (child._pictureId) sprites.push(child);
          collect(child);
        }
      };
      collect(SceneManager._scene._spriteset?._pictureContainer);
      const positions = available.map(index => {
        const sprite = sprites.find(sprite => $gameScreen.getPictureChoiceBinding(sprite._pictureId) === index);
        const bounds = sprite?._coretoInkArtBounds || {x:0, y:0, width:sprite?.bitmap?.width || 0, height:sprite?.bitmap?.height || 0};
        const point = sprite?.worldTransform.apply(new Point(
          bounds.x + bounds.width / 2 - sprite.anchor.x * sprite.bitmap.width,
          bounds.y + bounds.height / 2 - sprite.anchor.y * sprite.bitmap.height));
        return { index, x: point?.x, y: point?.y };
      });
      if (positions.every(position => Number.isFinite(position.x) && Number.isFinite(position.y))) {
        const current = positions.find(position => position.index === this.index());
        if (!current) { this.select(positions[0].index); return; }
        const horizontal = name === 'cursorRight' || name === 'cursorLeft';
        const axis = horizontal ? 'x' : 'y', cross = horizontal ? 'y' : 'x';
        const ahead = positions.filter(position => (position[axis] - current[axis]) * direction > 8);
        ahead.sort((a, b) => Math.abs(a[cross] - current[cross]) - Math.abs(b[cross] - current[cross]) ||
          Math.abs(a[axis] - current[axis]) - Math.abs(b[axis] - current[axis]));
        if (ahead.length) this.select(ahead[0].index);
        return;
      }
      const current = available.indexOf(this.index());
      this.select(available[(current + direction + available.length) % available.length]);
    };
  }
  PluginManager.registerCommand('Dryland_Presentation', 'MotionPreference', function(args) {
    $gameVariables.setValue(Number(args.variable), matchMedia('(prefers-reduced-motion: reduce)').matches);
  });
  PluginManager.registerCommand('Dryland_Presentation', 'ArmEffect', function(args) {
    $gameTemp._drylandPendingEffects ||= {};
    $gameTemp._drylandPendingEffects[args.key] = true;
  });
  PluginManager.registerCommand('Dryland_Presentation', 'TakeEffect', function(args) {
    $gameVariables.setValue(Number(args.variable), Boolean($gameTemp._drylandPendingEffects?.[args.key]));
    if ($gameTemp._drylandPendingEffects) delete $gameTemp._drylandPendingEffects[args.key];
  });
  // A confirmation belongs to one native window. Require physical release
  // before the next window accepts it, including PictureChoices mouse clicks.
  const heldKeys = new Set();
  let primaryHeld = false;
  for (const [name, down] of [['_onMouseDown', true], ['_onMouseUp', false]]) {
    const original = TouchInput[name];
    TouchInput[name] = function(event) {
      if (event.button === 0) primaryHeld = down;
      original.call(this, event);
    };
  }
  let releaseRequired = false;
  for (const [name, down] of [['_onKeyDown', true], ['_onKeyUp', false]]) {
    const original = Input[name];
    Input[name] = function(event) {
      if (down) heldKeys.add(event.keyCode); else heldKeys.delete(event.keyCode);
      original.call(this, event);
    };
  }
  const lostFocus = Input._onLostFocus;
  Input._onLostFocus = function() { heldKeys.clear(); primaryHeld = false; lostFocus.call(this); };
  const inputUpdate = Input.update;
  Input.update = function() {
    if (releaseRequired && heldKeys.size === 0 && !primaryHeld) {
      releaseRequired = false;
      Input.clear();
      TouchInput.clear();
    }
    inputUpdate.call(this);
  };
  function consumeConfirmation() { releaseRequired = true; Input.clear(); }
  const processOk = Window_ChoiceList.prototype.processOk;
  Window_ChoiceList.prototype.processOk = function() {
    if (releaseRequired || interfaceHidden() || !this.isOpenAndActive() || SceneManager._scene.isBusy()) return;
    if (this.index() < 0 || !this.isCurrentItemEnabled()) return;
    processOk.call(this);
    consumeConfirmation();
  };
  const confirmationTriggered = Window_Message.prototype.isTriggered;
  Window_Message.prototype.isTriggered = function() { return !releaseRequired && confirmationTriggered.call(this); };
  const terminateMessage = Window_Message.prototype.terminateMessage;
  Window_Message.prototype.terminateMessage = function() { terminateMessage.call(this); consumeConfirmation(); };

  function interfaceHidden() {
    return Boolean(globalThis.$gameTemp?._drylandInterfaceHidden || SceneManager._scene?._messageWindow?.scale.x === 0);
  }
  function setInterfaceHidden(hidden) {
    $gameTemp._drylandInterfaceHidden = hidden;
    if (!hidden) SceneManager._scene._choiceListWindow.applyHideChoiceWindow();
    consumeConfirmation();
  }
  const cursorWithVisibility = Window_ChoiceList.prototype.processCursorMove;
  Window_ChoiceList.prototype.processCursorMove = function() {
    if (interfaceHidden() && Input.isTriggered(Window_Message.VISIBILITY_TOGGLE_KEY)) {
      $gameTemp.showMessageWindowVisibility();
      return;
    }
    if (!interfaceHidden()) cursorWithVisibility.call(this);
  };
  const touchWithVisibility = Window_ChoiceList.prototype.processTouch;
  Window_ChoiceList.prototype.processTouch = function() {
    if (interfaceHidden() && TouchInput.isTriggered()) {
      $gameTemp.showMessageWindowVisibility();
      return;
    }
    if (!interfaceHidden()) touchWithVisibility.call(this);
  };
  const cancelWithVisibility = Window_ChoiceList.prototype.processCancel;
  Window_ChoiceList.prototype.processCancel = function() {
    if (!interfaceHidden() && !releaseRequired) cancelWithVisibility.call(this);
  };

  PluginManager.registerCommand('Dryland_Presentation', 'ConsumeInput', consumeConfirmation);
  PluginManager.registerCommand('Dryland_Presentation', 'InterfaceVisibility', function(args) {
    setInterfaceHidden(args.hidden === 'true');
  });
  PluginManager.registerCommand('Dryland_Presentation', 'BindInterfacePicture', function(args) {
    const picture = $gameScreen.picture(Number(args.picture));
    if (picture) picture._drylandInterfaceElement = args.name;
  });
  PluginManager.registerCommand('Dryland_Presentation', 'BindScrollSkip', function(args) {
    const picture = $gameScreen.picture(Number(args.picture));
    if (picture) picture._drylandScrollSkipKey = args.key;
  });
  // Presentation reports activity; renderers only represent this state.
  const previousUiActionActive = Sprite_Picture.prototype.uiActionActive;
  Sprite_Picture.prototype.uiActionActive = function() {
    return (!!this.picture()?._drylandScrollSkipKey && !!SceneManager._scene?._scrollTextWindow?._text) || !!previousUiActionActive?.call(this);
  };
  const pictureUiUpdate = Sprite_Picture.prototype.update;
  Sprite_Picture.prototype.update = function() {
    pictureUiUpdate.call(this);
    if (interfaceHidden() && this.picture()?._drylandInterfaceElement) this.visible = false;
  };
  const updateInterface = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    if (this._scrollTextWindow?._text && !releaseRequired) {
      const skip = this._spriteset._pictureContainer.children.some(sprite => {
        const key = sprite instanceof Sprite_Picture && sprite.picture()?._drylandScrollSkipKey;
        return key && sprite.worldVisible && (Input.isTriggered(key) ||
          (TouchInput.isTriggered() && sprite.getBounds().contains(TouchInput.x, TouchInput.y)));
      });
      if (skip) {
        this._scrollTextWindow.terminateMessage();
        consumeConfirmation();
      }
    }
    if (!this._scrollTextWindow?._text && this._messageWindow && !releaseRequired &&
        (Input.isTriggered('tab') || (interfaceHidden() && TouchInput.isTriggered()))) {
      this._messageWindow.isTriggered();
      consumeConfirmation();
    }
    updateInterface.call(this);
  };
  const settings = PluginManager.parameters('Dryland_Presentation');
  const canMove = Game_Player.prototype.canMove;
  Game_Player.prototype.canMove = function() {
    return settings.LockMovement !== 'true' && canMove.call(this);
  };
  const eventFastForward = Scene_Map.prototype.isFastForward;
  Scene_Map.prototype.isFastForward = function() {
    return settings.DisableEventAcceleration !== 'true' && eventFastForward.call(this);
  };
  // MZ's meVolume setter reads _currentMe, but its playMe/stopMe lifecycle
  // does not maintain that descriptor. Retain the playing cue so changing
  // Temas also updates the current native buffer, including immediate mute.
  const playMe = AudioManager.playMe;
  AudioManager.playMe = function(me) {
    playMe.call(this, me);
    this._currentMe = this._meBuffer ? { ...me } : null;
  };
  const stopMe = AudioManager.stopMe;
  AudioManager.stopMe = function() {
    stopMe.call(this);
    this._currentMe = null;
  };
})();
