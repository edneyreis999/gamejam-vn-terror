/*:
 * @target MZ
 * @plugindesc Vídeos com alfa sobre a cena, com marcas de tempo nos eventos.
 * @author Coreto
 * @help
 * Play mantém a cena visível e espera o primeiro quadro do WebM.
 * Depois, apague o retrato estático que o vídeo substitui.
 * WaitUntil espera o tempo de reprodução indicado, em segundos;
 * os comandos nativos seguintes podem trocar o cenário sob o vídeo.
 * WaitEnd espera o fim antes de retomar o diálogo.
 * Use arquivos WebM com alfa em movies/. Não inclua a extensão.
 * Filmes nativos fora desta sequência mantêm seu comportamento original.
 *
 * @command Play
 * @text Reproduzir sobre a cena
 * @arg movie
 * @text Vídeo WebM
 * @type file
 * @dir movies/
 *
 * @command WaitUntil
 * @text Esperar marca do vídeo
 * @arg seconds
 * @text Segundos
 * @type number
 * @decimals 3
 * @min 0
 * @default 0
 *
 * @command WaitEnd
 * @text Esperar fim do vídeo
 */
(() => {
    "use strict";
    const pluginName = "Dryland_1_AlphaMovie";
    let overlay = false;

    const updateVisibility = Video._updateVisibility;
    Video._updateVisibility = function(visible) {
        if (overlay && visible) {
            Graphics.showScreen();
            this._element.style.opacity = 1;
        } else {
            updateVisibility.call(this, visible);
        }
    };

    const onEnd = Video._onEnd;
    Video._onEnd = function() {
        onEnd.call(this);
        overlay = false;
    };

    const onError = Video._onError;
    Video._onError = function() {
        if (!overlay) return onError.call(this);
        try {
            onError.call(this);
        } catch (error) {
            this._loading = true;
            console.error("Movie loading failed", this._element.src, this._element.error);
            SceneManager.catchException(error);
        }
    };

    PluginManager.registerCommand(pluginName, "Play", function(args) {
        overlay = true;
        Video.play("movies/" + args.movie + ".webm");
        this.setWaitMode("drylandMovieReady");
    });
    PluginManager.registerCommand(pluginName, "WaitUntil", function(args) {
        this._drylandMovieTime = Number(args.seconds);
        this.setWaitMode("drylandMovieTime");
    });
    PluginManager.registerCommand(pluginName, "WaitEnd", function() {
        this.setWaitMode("video");
    });

    const updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        if (this._waitMode === "drylandMovieReady") {
            if (Video._loading) return true;
        } else if (this._waitMode === "drylandMovieTime") {
            if (Video.isPlaying() && Video._element.currentTime < this._drylandMovieTime) {
                return true;
            }
            delete this._drylandMovieTime;
        } else {
            return updateWaitMode.call(this);
        }
        this._waitMode = "";
        return false;
    };
})();
