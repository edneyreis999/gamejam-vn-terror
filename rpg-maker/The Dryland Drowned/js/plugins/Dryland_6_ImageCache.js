/*:
 * @target MZ
 * @plugindesc [Dryland] Keeps recently used pictures across map transfers, up to a size limit.
 * @author Dryland
 * @param RetainedMegapixels
 * @text Retained megapixels
 * @desc Largest total picture area kept across a transfer. Each megapixel uses about 4 MB once decoded.
 * @type number
 * @min 0
 * @default 64
 * @help
 * The engine destroys every cached image on each map transfer, so pictures that
 * were already downloaded, including the ones preloaded for the next scene, load
 * again and appear late. Here a transfer keeps the most recently requested files
 * from img/pictures that have finished loading, up to the limit, and clears
 * everything else as usual.
 *
 * This changes only what a transfer discards. Loading, the readiness check and
 * the native load error and retry behavior stay the same.
 *
 * Set the limit to 0, or turn the plugin off, to restore the original behavior.
 */
(() => {
  'use strict';
  const PICTURES = 'img/pictures/';
  const limit = Number(PluginManager.parameters('Dryland_6_ImageCache').RetainedMegapixels) * 1e6;
  const lastRequest = new Map();
  let requests = 0;
  let inTransfer = false;

  const loadBitmapFromUrl = ImageManager.loadBitmapFromUrl;
  ImageManager.loadBitmapFromUrl = function(url) {
    lastRequest.set(url, ++requests);
    return loadBitmapFromUrl.call(this, url);
  };

  function keepRecentPictures(cache) {
    let area = 0;
    const kept = {};
    const recentFirst = Object.keys(cache).sort((a, b) => (lastRequest.get(b) || 0) - (lastRequest.get(a) || 0));
    for (const url of recentFirst) {
      const bitmap = cache[url];
      const size = bitmap.width * bitmap.height;
      // A picture still downloading would hold the next scene's readiness check until it arrives.
      if (url.startsWith(PICTURES) && bitmap.isReady() && area + size <= limit) {
        kept[url] = bitmap;
        area += size;
      } else {
        bitmap.destroy();
        lastRequest.delete(url);
      }
    }
    return kept;
  }

  const clear = ImageManager.clear;
  ImageManager.clear = function() {
    if (inTransfer) this._cache = keepRecentPictures(this._cache);
    else clear.call(this);
  };

  const onTransfer = Scene_Map.prototype.onTransfer;
  Scene_Map.prototype.onTransfer = function() {
    inTransfer = true;
    try {
      onTransfer.call(this);
    } finally {
      inTransfer = false;
    }
  };
})();
