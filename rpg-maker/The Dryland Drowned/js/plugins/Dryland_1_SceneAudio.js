/*:
 * @target MZ
 * @plugindesc Prepares the next scene's audio for native playback commands.
 * @author Dryland
 * @orderAfter Coreto_0_CoreEngine
 * @help
 * Prepare loads without playing. One pending BGM and BGS are retained until
 * the matching native playback command consumes them or Prepare replaces them.
 * Use during the preceding scene, before its fade. No save data is added.
 *
 * @command Prepare
 * @text Prepare next scene audio
 * @arg bgm
 * @type file
 * @dir audio/bgm/
 * @default
 * @arg bgs
 * @type file
 * @dir audio/bgs/
 * @default
 *
 * @command FadeIn
 * @text Fade in current scene audio
 * @arg seconds
 * @type number
 * @decimals 2
 * @min 0
 * @default 1
 */
(() => {
    "use strict";
    const pending = new Map();
    const createBuffer = AudioManager.createBuffer;

    AudioManager.createBuffer = function(folder, name) {
        const prepared = pending.get(folder);
        if (prepared?.name === name) {
            pending.delete(folder);
            return prepared.buffer;
        }
        return createBuffer.apply(this, arguments);
    };

    PluginManager.registerCommand("Dryland_1_SceneAudio", "Prepare", args => {
        for (const kind of ["bgm", "bgs"]) {
            const folder = kind + "/";
            const name = args[kind];
            if (!name || pending.get(folder)?.name === name) continue;
            pending.get(folder)?.buffer.destroy();
            pending.set(folder, {
                name,
                buffer: createBuffer.call(AudioManager, folder, name)
            });
        }
    });

    PluginManager.registerCommand("Dryland_1_SceneAudio", "FadeIn", args => {
        const seconds = Number(args.seconds);
        AudioManager.fadeInBgm(seconds);
        AudioManager.fadeInBgs(seconds);
    });
})();
