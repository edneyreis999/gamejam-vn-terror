/*:
 * @target MZ
 * @plugindesc Keeps the new-game screen beneath the prologue smoke.
 * @author Dryland
 * @orderAfter Coreto_1_SaveCore
 * @orderAfter Dryland_1_AlphaMovie
 * @help
 * For the project's locked-slot New Game flow, preserves the confirmed
 * screen across scene loading. The prologue releases it under smoke.
 * Normal saves, loading and cancellation keep their existing behavior.
 *
 * @command RevealPrologue
 * @text Reveal prologue beneath smoke
 * @desc Release the previous screen once the entrance movie covers it.
 */
(() => {
    "use strict";
    let pendingFrame = null;

    const startNewGame = Scene_Save.prototype.startNewGameLockedSave;
    Scene_Save.prototype.startNewGameLockedSave = function(...args) {
        pendingFrame = Bitmap.snap(this);
        this._drylandOpeningTransition = true;
        return startNewGame.apply(this, args);
    };

    const fadeOutAll = Scene_Save.prototype.fadeOutAll;
    Scene_Save.prototype.fadeOutAll = function(...args) {
        if (this._drylandOpeningTransition) return;
        return fadeOutAll.apply(this, args);
    };

    const createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function(...args) {
        const result = createDisplayObjects.apply(this, args);
        if (pendingFrame) {
            this._drylandOpeningCover = new Sprite(pendingFrame);
            this.addChild(this._drylandOpeningCover);
            pendingFrame = null;
        }
        return result;
    };

    const startFadeIn = Scene_Map.prototype.startFadeIn;
    Scene_Map.prototype.startFadeIn = function(...args) {
        if (this._drylandOpeningCover) return;
        return startFadeIn.apply(this, args);
    };

    function releaseCover(scene) {
        const cover = scene._drylandOpeningCover;
        if (!cover) return;
        scene.removeChild(cover);
        cover.bitmap.destroy();
        cover.destroy();
        scene._drylandOpeningCover = null;
    }

    PluginManager.registerCommand("Dryland_2_NewGameTransition", "RevealPrologue", function() {
        releaseCover(SceneManager._scene);
    });

    const terminate = Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate = function(...args) {
        releaseCover(this);
        return terminate.apply(this, args);
    };
})();
