/*:
 * @target MZ
 * @plugindesc [Dryland] Reed's transparent movie between narration and trap choices.
 * @author Dryland
 * @base Coreto_0_CoreEngine
 * @orderAfter Coreto_0_CoreEngine
 * @orderAfter Dryland_Presentation
 * @command Start
 * @text Start Reed transition
 * @desc Crossfade into the movie over 0.3 seconds before removing the narrator.
 * @command Covered
 * @text Wait for the mist
 * @desc Wait until the mist covers the screen; then reveal the scene with native events.
 * @command Finish
 * @text Wait for the reveal
 * @desc Wait for the movie to end before continuing the event.
 * @help
 * Uses movies/transitionReed.webm, converted from the supplied HEVC alpha master.
 * Start crossfades over the retained bust, then events erase it after 0.3s.
 * Start -> erase Reed's static bust -> Covered -> reveal background -> Finish.
 * Events own the scene and must exclude rereading from this sequence.
 * This narrative movie also plays when reduced motion is enabled.
 * Uses MZ's video element and loading/retry UI, retaining the game underneath.
 * No campaign or save data is stored. Other movies keep native MZ behavior.
 */
(() => {
  'use strict';
  const plugin = 'Dryland_1_ReedTransition';
  const crossfadeDuration = 0.3;
  const coveredAt = 2.5;
  let active = false;

  PluginManager.registerCommand(plugin, 'Start', function() {
    active = true;
    Video.play('movies/transitionReed.webm');
    this.setWaitMode('reedStart');
  });
  PluginManager.registerCommand(plugin, 'Covered', function() {
    if (active) this.setWaitMode('reedCovered');
  });
  PluginManager.registerCommand(plugin, 'Finish', function() {
    if (active) this.setWaitMode('video');
  });

  const updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
  Game_Interpreter.prototype.updateWaitMode = function() {
    if (this._waitMode === 'reedStart' || this._waitMode === 'reedCovered') {
      const starting = this._waitMode === 'reedStart';
      if (active && !Video._loading && starting) {
        Video._element.style.opacity = Math.min(Video._element.currentTime / crossfadeDuration, 1);
      }
      const waiting = active && (Video._loading ||
        Video._element.currentTime < (starting ? crossfadeDuration : coveredAt));
      if (!waiting) this._waitMode = '';
      return waiting;
    }
    return updateWaitMode.apply(this, arguments);
  };

  const visibility = Video._updateVisibility;
  Video._updateVisibility = function(visible) {
    if (!active) return visibility.apply(this, arguments);
    Graphics.showScreen();
    this._element.style.opacity = visible ? Math.min(this._element.currentTime / crossfadeDuration, 1) : 0;
  };

  const onEnd = Video._onEnd;
  Video._onEnd = function() {
    onEnd.apply(this, arguments);
    if (active) {
      active = false;
      Input.clear();
      TouchInput.clear();
    }
  };

  const terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    if (active) {
      Video._element.pause();
      Video._loading = false;
      Video._onEnd();
    }
    return terminate.apply(this, arguments);
  };
})();
