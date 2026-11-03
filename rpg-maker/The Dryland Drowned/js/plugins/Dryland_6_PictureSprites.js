/*:
 * @target MZ
 * @plugindesc [Dryland] Skips work for unused picture IDs and redraws picture text only when a shown variable changed.
 * @author Dryland
 * @base Coreto_1_MessageCore
 * @base Coreto_5_DesignSystem
 * @orderAfter Coreto_1_MessageCore
 * @orderAfter Coreto_5_DesignSystem
 * @help
 * MessageCore asks every picture to redraw its text on each Game_Map refresh,
 * which any variable or switch write requests. Only text that shows a variable
 * can change that way: a changed string already asks for its own redraw.
 *
 * A text code this plugin does not recognize keeps the original behavior, so an
 * unknown code can cost time but never leave old text on the screen.
 *
 * Each of the 100 picture IDs also runs a full sprite update every frame, used or
 * not. An unused ID now stops after clearing its state once.
 *
 * Turn the plugin off to compare with the original behavior.
 */
(() => {
  'use strict';
  const ZONES = ['upperleft', 'up', 'upperright', 'left', 'center', 'right', 'lowerleft', 'down', 'lowerright'];
  const VARIABLE = /\\V\[(\d+)\]/gi;
  const STATIC_CODE = /\\(?:HexColor<[^>]*>|FS\[\d+\]|FontChange<[^>]*>)/gi;
  const shownVariables = new Map();

  const isUnrecognized = text => text.replace(VARIABLE, '').replace(STATIC_CODE, '').includes('\\');

  function needsRedraw(pictureId, texts) {
    let signature = '';
    let showsVariable = false;
    for (const zone of ZONES) {
      const text = texts[zone];
      if (!text) continue;
      if (isUnrecognized(text)) return true;
      signature += text.replace(VARIABLE, (code, variableId) => {
        showsVariable = true;
        return `\u0000${$gameVariables.value(Number(variableId))}\u0000`;
      }) + '\u0001';
    }
    if (!showsVariable || shownVariables.get(pictureId) === signature) return false;
    shownVariables.set(pictureId, signature);
    return true;
  }

  Game_Screen.prototype.requestPictureTextRefreshAll = function() {
    this._pictureText ??= [];
    this._pictureTextBuffer ??= [];
    this._pictureTextRefresh ??= [];
    this._pictures.forEach((picture, pictureId) => {
      const texts = this._pictureText[pictureId];
      if (picture && texts && needsRedraw(pictureId, texts)) this._pictureTextRefresh.push(pictureId);
    });
  };

  // Every picture ID has a sprite. One full update after a picture goes away clears the sprite's
  // state; from then on an unused ID has nothing to do each frame.
  const updateSprite = Sprite_Picture.prototype.update;
  Sprite_Picture.prototype.update = function() {
    if (!this.visible && !this._pictureName && !this.picture()) return;
    updateSprite.apply(this, arguments);
  };
})();
