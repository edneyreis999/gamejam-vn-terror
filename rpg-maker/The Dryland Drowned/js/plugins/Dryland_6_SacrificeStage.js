/*:
 * @target MZ
 * @plugindesc [Dryland] Sacrifice focus and owned scene audio.
 * @author Dryland
 * @base Coreto_2_VNPictureBusts
 * @orderAfter Coreto_4_MessageVisibility
 * @orderAfter Coreto_5_DesignSystem
 * @orderAfter Dryland_6_IllustratedChoices
 * @command Prepare
 * @text Prepare candidate presentation variables
 * @command BindCandidate
 * @text Bind candidate expressions
 * @arg picture
 * @type number
 * @arg hero
 * @type string
 * @arg fear
 * @type file
 * @dir img/pictures/
 * @arg brave
 * @type file
 * @dir img/pictures/
 * @arg phrase
 * @type string
 * @command LockVictim
 * @text Preserve the committed victim expression
 * @command End
 * @text Release sacrifice presentation
 * @help
 * CE43 owns the stage, positions and expression files. Prepare projects the
 * campaign into variables 222–225; it never dispatches campaign actions.
 * BindCandidate runs after showing each picture. Focus replaces a preview in
 * the existing message window without starting or completing a reading unit.
 * Native SE commands whose names start with sfx_ belong to this sequence.
 * Replacing a cue never stops UI sounds. End releases only scene resources.
 */
(() => {
  'use strict';
  const plugin = 'Dryland_6_SacrificeStage';
  const slots = [50, 51, 52];
  const candidates = () => slots.map(id => $gameScreen.picture(id)).filter(p => p?._drylandSacrifice);
  const victim = () => $gameSystem._dryland.campaign.pendingOutcome?.victimId;
  const hidden = () => $gameTemp._drylandInterfaceHidden || SceneManager._scene?._messageWindow?.scale.x === 0;
  function express(picture, brave) {
    const binding = picture._drylandSacrifice;
    const name = brave ? binding.brave : binding.fear;
    if (picture.name() !== name) picture.vnChangeGraphic(name);
    picture.tint(brave ? [0, 0, 0, 0] : [-30, -30, -30, 0], 0);
  }
  PluginManager.registerCommand(plugin, 'Prepare', function() {
    const state = $gameSystem._dryland.campaign;
    const ids = state.phase === 'sacrifice_choice' ? state.partyIds : [...state.partyIds, state.pendingOutcome.victimId];
    $gameVariables.setValue(222, ids.length);
    for (let index = 0; index < 3; index++) $gameVariables.setValue(223 + index, ids[index] || '');
  });
  PluginManager.registerCommand(plugin, 'BindCandidate', function(args) {
    const picture = $gameScreen.picture(Number(args.picture));
    picture._drylandSacrifice = { hero: args.hero, fear: args.fear, brave: args.brave, phrase: args.phrase };
    picture._drylandInterfaceElement = 'sacrifice.candidate';
    ImageManager.loadPicture(args.fear);
    ImageManager.loadPicture(args.brave);
    express(picture, args.hero === victim());
  });
  PluginManager.registerCommand(plugin, 'LockVictim', function() {
    for (const picture of candidates()) express(picture, picture._drylandSacrifice.hero === victim());
  });

  let cueBuffers = [];
  function stopCue() {
    for (const buffer of cueBuffers) buffer.stop();
    cueBuffers = [];
  }
  const playSe = AudioManager.playSe;
  AudioManager.playSe = function(se) {
    const owned = /^sfx_[ab][1-8]_/.test(se.name);
    if (owned) stopCue();
    const previous = new Set(this._seBuffers);
    playSe.call(this, se);
    if (owned) cueBuffers = this._seBuffers.filter(buffer => !previous.has(buffer));
  };
  PluginManager.registerCommand(plugin, 'End', function() {
    stopCue();
    if (AudioManager._currentBgs?.name === '05-opressivo') AudioManager.stopBgs();
    for (const id of slots) if ($gameScreen.picture(id)?._drylandSacrifice) $gameScreen.erasePicture(id);
    for (const id of [2, 53]) $gameScreen.erasePicture(id);
  });
  const terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    stopCue();
    terminate.call(this);
  };
  const update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    update.call(this);
    const choices = this._choiceListWindow, message = this._messageWindow;
    if ($gameMessage._drylandChoiceFocus?.key !== 'sacrifice' || !choices?.isOpenAndActive()) {
      delete this._sacrificePreviewKey;
      return;
    }
    this._illustratedChoicePreview?.hide();
    if (hidden()) return;
    const item = choices._list[choices.index()];
    const raw = item && $gameMessage.choices()[item.ext];
    const id = Number(raw?.match(/<Bind Picture: (\d+)>/i)?.[1]);
    let focused = $gameScreen.picture(id);
    if (TouchInput.isHovered() || TouchInput.isMoved()) this._sacrificeMouse = true;
    if (['up', 'down', 'left', 'right'].some(key => Input.isRepeated(key))) this._sacrificeMouse = false;
    if (this._sacrificeMouse) {
      const sprite = this._spriteset._pictureContainer.children.find(p => p._pictureId === id);
      if (!this._illustratedPointerInside || !sprite?.isBeingTouched()) focused = null;
    }
    for (const picture of candidates()) express(picture, picture === focused);
    const key = focused?._drylandSacrifice.phrase || '';
    const text = key ? TextManager.parseLocalizedText(key) : '';
    if (text !== this._sacrificePreviewKey) {
      this._sacrificePreviewKey = text;
      message.updateDimensions();
      message.updatePlacement();
      message.contents.clear();
      message.resetFontSettings();
      const x = message.newLineX({ rtl: false });
      message.drawTextEx(text ? '<WordWrap>' + text : '', x, 0, message.innerWidth - x);
    }
    message.open();
  };
})();
