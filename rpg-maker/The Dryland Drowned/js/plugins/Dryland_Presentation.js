/*:
 * @target MZ
 * @plugindesc Afogados em Terra Seca — integração de apresentação nativa
 * @author Coreto
 * @orderAfter VisuMZ_2_ExtMessageFunc
 * @param LockMovement
 * @text Bloquear movimento do personagem
 * @type boolean
 * @default true
 * @command ChoiceProgress
 * @text Mostrar progresso na escolha atual
 * @arg text
 * @type string
 * @desc Vazio fecha a apresentação de progresso, sem reativar escolhas.
 * @command WindowPicture
 * @text Aplicar janela à apresentação da picture
 * @arg picture
 * @type number
 * @min 1
 * @arg focusPicture
 * @type number
 * @default 0
 * @arg width
 * @type number
 * @default 0
 * @arg height
 * @type number
 * @default 0
 * @arg ink
 * @text Cor clara para fundos escuros
 * @type boolean
 * @default false
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
 * @command ShowSaveNotice
 * @text Exibir aviso de campanha salva
 * @arg picture
 * @type number
 * @min 1
 * @command ClearSaveNotice
 * @text Limpar aviso de salvamento
 * @command WaitForReturnPresentation
 * @text Aguardar ausências do retorno
 * @desc Aguarda os movimentos nativos ativos; uma retomada sem efeito termina imediatamente.
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
  const dialogueInk = '#211c14';
  const contrastInk = '#ffffff';
  ColorManager.drylandDialogueInk = () => dialogueInk;
  const resetDialogueFont = Window_Message.prototype.resetFontSettings;
  Window_Message.prototype.resetFontSettings = function() {
    resetDialogueFont.call(this);
    this.changeTextColor(ColorManager.drylandDialogueInk());
    this.contents.outlineWidth = 0;
  };
  const resetWindowFont = Window_Base.prototype.resetFontSettings;
  Window_Base.prototype.resetFontSettings = function() {
    resetWindowFont.call(this);
    if (this._drylandWindowInk || this instanceof Window_NameBox || this instanceof Window_ChoiceList) {
      const useLightInk = this._drylandWindowInk === 'light' || this instanceof Window_ChoiceList;
      this.changeTextColor(useLightInk ? contrastInk : ColorManager.drylandDialogueInk());
      this.contents.outlineWidth = 0;
    }
  };
  const consoleTextColor = Window_ButtonConsole.prototype.changeTextColor;
  Window_ButtonConsole.prototype.changeTextColor = function(color) {
    consoleTextColor.call(this, ['options', 'hide', 'fastfwd'].includes(this._type) ? ColorManager.drylandDialogueInk() : color);
    if (['options', 'hide', 'fastfwd'].includes(this._type)) this.contents.outlineWidth = 0;
  };
  const resetConsoleFont = Window_ButtonConsole.prototype.resetFontSettings;
  Window_ButtonConsole.prototype.resetFontSettings = function() {
    resetConsoleFont.call(this);
    if (this._type === 'fastfwd') this.contents.outlineWidth = 0;
  };
  PluginManager.registerCommand('Dryland_Presentation', 'WindowPicture', function(args) {
    const picture = $gameScreen.picture(Number(args.picture));
    if (picture) picture._drylandWindowStyle = {
      focusPicture: Number(args.focusPicture), width: Number(args.width), height: Number(args.height),
      ink: args.ink === 'true' ? 'light' : 'dialogue'
    };
  });
  PluginManager.registerCommand('Dryland_Presentation', 'ChoiceProgress', function(args) {
    const window = SceneManager._scene._choiceListWindow;
    if (!args.text) { window.close(); return; }
    window._list[window.index()].name = args.text;
    for (const item of window._list) item.enabled = false;
    window.refresh();
    window.deactivate();
    window.open();
  });
  // Reuse MessageCore's existing text window as the picture's renderer.
  // PictureChoices remains the sole input owner, including attached hero labels.
  const updatePictureText = Sprite_Picture.prototype.updatePictureText;
  Sprite_Picture.prototype.updatePictureText = function() {
    const style = this.picture()?._drylandWindowStyle;
    const windowInk = style ? (style.ink || 'dialogue') : false;
    if (this._pictureTextWindow && this._pictureTextWindow._drylandWindowInk !== windowInk) {
      this._pictureTextWindow._drylandWindowInk = windowInk;
      this._pictureTextCache = {};
    }
    if (style && this.bitmap?.isReady()) {
      if (!this._drylandWindowBitmap) {
        this._drylandWindowBitmap = new Bitmap(style.width || this.bitmap.width, style.height || this.bitmap.height);
        this.bitmap = this._drylandWindowBitmap;
      }
      this.createPictureText();
      this._pictureTextWindow._drylandWindowInk = windowInk;
    }
    updatePictureText.call(this);
    const window = this._pictureTextWindow;
    if (!window || (style && !this.bitmap)) return;
    if (!style) {
      if (window.parent === this) this.removeChild(window);
      window._drylandWindowInk = false;
      window.opacity = 0;
      this._pictureTextSprite.visible = true;
      if (this._drylandWindowBitmap) {
        this._drylandWindowBitmap.destroy();
        this._drylandWindowBitmap = null;
        if (this.picture()) this.loadBitmap();
      }
      return;
    }
    if (window.parent !== this) this.addChildAt(window, 0);
    this._pictureTextSprite.visible = false;
    window.opacity = 255;
    window.x = -this.anchor.x * this.bitmap.width;
    window.y = -this.anchor.y * this.bitmap.height;
    const choices = SceneManager._scene._choiceListWindow;
    const choice = choices?._list[choices.index()];
    const menuChoices = $gameMessage.choices();
    const binding = choice && /<Bind Picture: (\d+)>/.exec(menuChoices[choice.ext]);
    const scrollSkipFocused = style.focusPicture > 0 &&
      this.picture()?._drylandScrollSkipKey && SceneManager._scene._scrollTextWindow?._text;
    const focused = (choices?.isOpenAndActive() && binding && Number(binding[1]) === style.focusPicture) ||
      scrollSkipFocused;
    const boundChoiceIndex = menuChoices.findIndex(text => {
      const match = /<Bind Picture: (\d+)>/.exec(text);
      return match && Number(match[1]) === style.focusPicture;
    });
    const boundChoice = boundChoiceIndex < 0 ? null : choices?._list.find(item => item.ext === boundChoiceIndex);
    const enabled = boundChoiceIndex < 0 || boundChoice?.enabled !== false;
    window.active = Boolean(focused);
    window.contentsOpacity = enabled ? 255 : 110;
    window.backOpacity = enabled ? 255 : 150;
    window.setCursorRect(4, 4, focused ? window.width - 8 : 0, focused ? window.height - 8 : 0);
  };
  const destroyPicture = Sprite_Picture.prototype.destroy;
  Sprite_Picture.prototype.destroy = function(...args) {
    if (this._drylandWindowBitmap) this._drylandWindowBitmap.destroy();
    return destroyPicture.apply(this, args);
  };
  const choiceWidth = Window_ChoiceList.prototype.windowWidth;
  Window_ChoiceList.prototype.windowWidth = function() {
    return $gameMessage._drylandChoiceFocus?.key === 'formation-menu' ? 152 : choiceWidth.call(this);
  };
  const choiceHeight = Window_ChoiceList.prototype.itemHeight;
  Window_ChoiceList.prototype.itemHeight = function() {
    return $gameMessage._drylandChoiceFocus?.key === 'formation-menu' ? 66 : choiceHeight.call(this);
  };
  const choiceRows = Window_ChoiceList.prototype.numVisibleRows;
  Window_ChoiceList.prototype.numVisibleRows = function() {
    return $gameMessage._drylandChoiceFocus?.key === 'formation-menu' ? 4 : choiceRows.call(this);
  };
  Window_ChoiceList.prototype.drawItem = function(index) {
    const rect = this.itemLineRect(index);
    const text = this.commandName(index);
    const width = this.textSizeEx(text).width;
    const x = rect.x + Math.max(0, (rect.width - width) / 2);
    this.resetTextColor();
    this.changeTextColor(contrastInk);
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawTextEx(text, x, rect.y, Math.max(width, rect.width - (x - rect.x)));
    this.changePaintOpacity(true);
  };
  const refreshChoiceCursor = Window_ChoiceList.prototype.refreshCursor;
  Window_ChoiceList.prototype.refreshCursor = function() {
    if ($gameMessage._drylandChoiceFocus?.key === 'formation-menu' && this.index() === 4) {
      this.setCursorRect(0, 0, 0, 0);
      return;
    }
    refreshChoiceCursor.call(this);
  };
  const moveChoiceCursorDown = Window_ChoiceList.prototype.cursorDown;
  Window_ChoiceList.prototype.cursorDown = function(wrap) {
    if ($gameMessage._drylandChoiceFocus?.key === 'formation-menu' && this.index() === 3) {
      this.smoothSelect(0);
      return;
    }
    moveChoiceCursorDown.call(this, wrap);
  };
  const moveChoiceCursorUp = Window_ChoiceList.prototype.cursorUp;
  Window_ChoiceList.prototype.cursorUp = function(wrap) {
    if ($gameMessage._drylandChoiceFocus?.key === 'formation-menu' && this.index() === 0) {
      this.smoothSelect(3);
      return;
    }
    moveChoiceCursorUp.call(this, wrap);
  };
  const placeChoices = Window_ChoiceList.prototype.updatePlacement;
  Window_ChoiceList.prototype.updatePlacement = function() {
    placeChoices.call(this);
    if ($gameMessage._drylandChoiceFocus?.key === 'formation-menu') {
      this.x = Graphics.boxWidth - this.width - 8;
      this.y = 80;
      this.setBackgroundType(0);
      this.backOpacity = 255;
    }
    if ($gameMessage._drylandChoiceFocus?.key === 'age-notice') this.y = 400;
  };
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
  function clearSaveNotice() {
    const notice = $gameTemp._drylandSaveNotice;
    if (notice) {
      const picture = $gameScreen.picture(notice.picture);
      if (picture) picture.show(picture.name(), picture.origin(), picture.x(), picture.y(), picture.scaleX(), picture.scaleY(), 0, picture.blendMode());
    }
    delete $gameTemp._drylandSaveNotice;
  }
  PluginManager.registerCommand('Dryland_Presentation', 'ClearSaveNotice', clearSaveNotice);
  PluginManager.registerCommand('Dryland_Presentation', 'ShowSaveNotice', function(args) {
    clearSaveNotice();
    const id = Number(args.picture), picture = $gameScreen.picture(id);
    if (!picture) return;
    $gameTemp._drylandSaveNotice = {picture: id, remaining: 120};
    picture.show(picture.name(), picture.origin(), picture.x(), picture.y(), picture.scaleX(), picture.scaleY(), 255, picture.blendMode());
  });
  const terminateMap = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    resetModes();
    delete $gameTemp._drylandReturnPictures;
    if (SceneManager.isNextScene(Scene_Title)) delete $gameTemp._drylandPendingEffects;
    clearSaveNotice();
    terminateMap.call(this);
  };
  const loadGame = DataManager.loadGame;
  DataManager.loadGame = function(id) {
    clearSaveNotice();
    readingPermission(null, false);
    delete $gameTemp._drylandPendingEffects;
    delete $gameTemp._drylandReturnPictures;
    return loadGame.call(this, id).then(result => { resetModes(); return result; });
  };
  const transfer = Game_Interpreter.prototype.command201;
  Game_Interpreter.prototype.command201 = function(params) {
    readingPermission(this, false);
    clearSaveNotice();
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
    if (previous) {
      const index = this._list.findIndex(command => command.name === previous && command.enabled);
      if (index >= 0) this.select(index);
    }
  };
  const selectChoice = Window_ChoiceList.prototype.select;
  Window_ChoiceList.prototype.select = function(index) {
    if (interfaceHidden()) return;
    selectChoice.call(this, index);
    const options = $gameMessage._drylandChoiceFocus;
    if (options?.remember && this._list[index]) {
      $gameTemp._drylandFocus ||= {};
      $gameTemp._drylandFocus[options.key] = this._list[index].name;
    }
  };
  for (const [name, direction] of [['cursorRight', 1], ['cursorLeft', -1]]) {
    const original = Window_ChoiceList.prototype[name];
    Window_ChoiceList.prototype[name] = function(wrap) {
      if ($gameMessage._drylandChoiceFocus?.horizontal) this.select((this.index() + direction + this.maxItems()) % this.maxItems());
      else original.call(this, wrap);
    };
  }
  PluginManager.registerCommand('Dryland_Presentation', 'WaitForReturnPresentation', function() {
    if (!$gameTemp._drylandPendingEffects?.['return.moving']) return;
    delete $gameTemp._drylandPendingEffects['return.moving'];
    $gameTemp._drylandReturnPictures = Array.from({length:8}, (_, i) => 10 + i)
      .filter(id => $gameScreen.picture(id)?._duration > 0);
    this.setWaitMode('dryland-return');
  });
  const updateReturnWait = Game_Interpreter.prototype.updateWaitMode;
  Game_Interpreter.prototype.updateWaitMode = function() {
    if (this._waitMode !== 'dryland-return') return updateReturnWait.call(this);
    if ($gameTemp._drylandReturnPictures?.some(id => $gameScreen.picture(id)?._duration > 0)) return true;
    delete $gameTemp._drylandReturnPictures;
    this._waitMode = '';
    return false;
  };
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
    if (!this.isCurrentItemEnabled()) { this.playBuzzerSound(); return; }
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
    if (!interfaceHidden()) cursorWithVisibility.call(this);
  };
  const touchWithVisibility = Window_ChoiceList.prototype.processTouch;
  Window_ChoiceList.prototype.processTouch = function() {
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
  const pictureUiUpdate = Sprite_Picture.prototype.update;
  const pictureTouched = Sprite_Picture.prototype.isBeingTouched;
  Sprite_Picture.prototype.isBeingTouched = function() {
    if (!pictureTouched.call(this)) return false;
    if (!this.picture()?.name().startsWith('Dryland_HeroGroup_')) return true;
    // Native pictures update bottom-first; overlapping groups must hit the visible top layer.
    return !this.parent.children.some(sprite =>
      sprite._pictureId > this._pictureId && sprite.worldVisible &&
      sprite.picture()?.name().startsWith('Dryland_HeroGroup_') &&
      pictureTouched.call(sprite));
  };
  Sprite_Picture.prototype.update = function() {
    pictureUiUpdate.call(this);
    if (interfaceHidden() && this.picture()?._drylandInterfaceElement) this.visible = false;
  };
  const updateInterface = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    if (this._scrollTextWindow?._text && !releaseRequired) {
      const skip = this._spriteset._pictureContainer.children.some(sprite => {
        const key = sprite.picture()?._drylandScrollSkipKey;
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
    const notice = $gameTemp._drylandSaveNotice;
    if (notice && --notice.remaining <= 0) clearSaveNotice();
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
