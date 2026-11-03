/*:
 * @target MZ
 * @plugindesc [Dryland] Removes color filters while they change nothing on screen.
 * @author Dryland
 * @help
 * Each active filter makes the GPU render its target to a separate texture. The
 * engine creates a sprite's color filter on the first color change and never
 * removes it, and each spriteset keeps two full-screen filters at all times. A
 * filter with no hue, tone, blend alpha, flash or dimming does not alter a pixel,
 * so here it leaves the filter list until a color change needs it again.
 *
 * Turn the plugin off to compare with the original behavior.
 */
(() => {
  'use strict';
  const isClear = values => values.every(value => value === 0);

  function detach(owner, filter) {
    const index = owner.filters ? owner.filters.indexOf(filter) : -1;
    if (index >= 0) owner.filters.splice(index, 1);
  }

  function attach(owner, filter) {
    if (!owner.filters) owner.filters = [];
    if (!owner.filters.includes(filter)) owner.filters.push(filter);
  }

  const updateColorFilter = Sprite.prototype._updateColorFilter;
  Sprite.prototype._updateColorFilter = function() {
    if (this._hue || this._blendColor[3] || !isClear(this._colorTone)) {
      updateColorFilter.call(this);
    } else if (this._colorFilter) {
      detach(this, this._colorFilter);
      this._colorFilter = null;
    }
  };

  const updateBaseFilters = Spriteset_Base.prototype.updateBaseFilters;
  Spriteset_Base.prototype.updateBaseFilters = function() {
    updateBaseFilters.call(this);
    (isClear($gameScreen.tone()) ? detach : attach)(this._baseSprite, this._baseColorFilter);
  };

  const updateOverallFilters = Spriteset_Base.prototype.updateOverallFilters;
  Spriteset_Base.prototype.updateOverallFilters = function() {
    updateOverallFilters.call(this);
    const untouched = !$gameScreen.flashColor()[3] && $gameScreen.brightness() === 255;
    (untouched ? detach : attach)(this, this._overallColorFilter);
  };
})();
