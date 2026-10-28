/*:
 * @target MZ
 * @plugindesc [Dryland] Authored scene dissolves and short audio fades.
 * @author Dryland
 * @base Coreto_0_CoreEngine
 * @orderAfter Dryland_1_ReedTransition
 * @command Capture
 * @text Retain the current scene
 * @desc Capture the scenery and pictures, excluding dialogue and choice windows.
 * @command Reveal
 * @text Reveal the next composition
 * @arg frames
 * @type number
 * @min 1
 * @default 18
 * @command PrepareAudio
 * @text Fade out before a native audio change
 * @arg channel
 * @type select
 * @option Bgm
 * @option Bgs
 * @default Bgm
 * @arg name
 * @type string
 * @default
 * @command FinishAudio
 * @text Fade in after the native audio command
 * @help
 * Events call Capture before replacing a composition and Reveal after it.
 * The retained picture can cross a map transfer; menus/title discard it.
 * Reveal waits before dialogue or choices resume. Approved scene dissolves
 * also run with reduced motion. Existing death/bust animations are unchanged.
 * Audio preserves a playing track when only its volume/pitch/pan changes.
 * Different tracks fade out/in over 0.2 seconds using native AudioManager.
 */
(() => {
  'use strict';
  const plugin = 'Dryland_1_SceneTransitions';
  let bitmap = null;
  let overlay = null;
  let remaining = 0;
  let duration = 0;

  function detach() {
    if (!overlay) return;
    overlay.parent.removeChild(overlay);
    overlay.bitmap = null;
    overlay.destroy();
    overlay = null;
  }

  function clear() {
    detach();
    if (bitmap) bitmap.destroy();
    bitmap = null;
    remaining = 0;
  }

  function attach(scene) {
    if (!bitmap) return;
    overlay = new Sprite(bitmap);
    overlay.name = 'DrylandSceneTransition';
    scene.addChildAt(overlay, scene.getChildIndex(scene._windowLayer));
  }

  PluginManager.registerCommand(plugin, 'Capture', function() {
    clear();
    bitmap = Bitmap.snap(SceneManager._scene._spriteset);
    attach(SceneManager._scene);
  });

  PluginManager.registerCommand(plugin, 'Reveal', function(args) {
    if (!bitmap) return;
    duration = Number(args.frames);
    remaining = duration + 1;
    this.setWaitMode('drylandDissolve');
  });

  PluginManager.registerCommand(plugin, 'PrepareAudio', function(args) {
    const channel = args.channel;
    this._drylandAudioChannel = channel;
    this._drylandAudioChanged = !AudioManager['isCurrent' + channel]({ name: args.name });
    if (this._drylandAudioChanged && AudioManager['_current' + channel]?.name) {
      AudioManager['fadeOut' + channel](0.2);
      this.wait(12);
    }
  });

  PluginManager.registerCommand(plugin, 'FinishAudio', function() {
    if (this._drylandAudioChanged) {
      AudioManager['fadeIn' + this._drylandAudioChannel](0.2);
    }
    delete this._drylandAudioChannel;
    delete this._drylandAudioChanged;
  });

  const updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
  Game_Interpreter.prototype.updateWaitMode = function() {
    if (this._waitMode === 'drylandDissolve') {
      if (remaining > 0) return true;
      this._waitMode = '';
      Input.clear();
      TouchInput.clear();
      return false;
    }
    return updateWaitMode.apply(this, arguments);
  };

  const createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function() {
    createDisplayObjects.apply(this, arguments);
    attach(this);
  };

  const update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    update.apply(this, arguments);
    if (remaining > 0) {
      remaining--;
      overlay.opacity = 255 * Math.min(remaining / duration, 1);
      if (remaining === 0) clear();
    }
  };

  const terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    if (SceneManager._nextScene instanceof Scene_Map) detach();
    else clear();
    terminate.apply(this, arguments);
  };
})();
