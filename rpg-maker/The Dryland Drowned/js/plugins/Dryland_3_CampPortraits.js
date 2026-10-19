/*:
 * @target MZ
 * @plugindesc Pixel-aware pointer selection for the layered camp portraits.
 * @author Dryland
 * @base Coreto_2_PictureChoices
 * @orderAfter Coreto_2_PictureChoices
 * @orderAfter Dryland_Presentation
 * @help
 * Dryland_Camp_H1 through H8 use their bitmap alpha for hover and click.
 * Transparent pixels pass through to the next selectable picture. When opaque
 * pixels overlap, the frontmost selectable picture receives the pointer.
 * Native picture IDs own drawing order; native choices own eligibility.
 */
(() => {
  'use strict';

  const isCampPortrait = sprite => /^Dryland_Camp_H[1-8]$/.test(sprite.picture()?.name());
  const isBeingTouched = Sprite_Picture.prototype.isBeingTouched;

  function touchesPixel(sprite) {
    if (!sprite.bitmap?.isReady() || sprite.opacity === 0) return false;
    const local = sprite.worldTransform.applyInverse(new Point(TouchInput.x, TouchInput.y));
    const frame = sprite._frame;
    const x = Math.floor(local.x + sprite.anchor.x * frame.width);
    const y = Math.floor(local.y + sprite.anchor.y * frame.height);
    return x >= 0 && y >= 0 && x < frame.width && y < frame.height &&
      sprite.bitmap.getAlphaPixel(frame.x + x, frame.y + y) > 0;
  }

  Sprite_Picture.prototype.isBeingTouched = function(...args) {
    if (!isCampPortrait(this)) return isBeingTouched.apply(this, args);
    if (!this.hasPictureChoiceBinding() || !touchesPixel(this)) return false;
    const siblings = this.parent.children;
    const index = siblings.indexOf(this);
    for (let i = siblings.length - 1; i > index; i--) {
      const sprite = siblings[i];
      if (!(sprite instanceof Sprite_Picture) || !sprite.isClickEnabled() ||
          !sprite.hasPictureChoiceBinding() || sprite.opacity === 0) continue;
      const touched = isCampPortrait(sprite) ? touchesPixel(sprite) : isBeingTouched.call(sprite);
      if (touched) return false;
    }
    return true;
  };
})();
