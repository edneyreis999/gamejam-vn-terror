function installResourceLoading(settings) {
    const categories = ["animations", "battlebacks1", "battlebacks2", "characters", "enemies", "faces", "parallaxes", "pictures", "sv_actors", "sv_enemies", "system", "tilesets", "titles1", "titles2"];
    function loadImages(values) {
        for (const category of categories) {
            for (const filename of values[category]) ImageManager.loadBitmap(`img/${category}/`, filename);
        }
    }
    Scene_Boot.prototype.loadGameImagesCoreEngine = function() { loadImages(settings.ImgLoad); };
    const systemImages = Scene_Boot.prototype.loadSystemImages;
    Scene_Boot.prototype.loadSystemImages = function() {
        systemImages.call(this);
        this.loadGameImagesCoreEngine();
    };
    const images = catalog.commands.find(command => command.key === "SystemLoadImages");
    PluginManager.registerCommand(catalog.pluginId, images.key, function(raw) {
        if ($gameParty.inBattle()) return;
        loadImages(convertEventArguments(images, raw));
    });
    const pendingAudio = new Set();
    const audio = catalog.commands.find(command => command.key === "SystemLoadAudio");
    PluginManager.registerCommand(catalog.pluginId, audio.key, function(raw) {
        if ($gameParty.inBattle()) return;
        const args = convertEventArguments(audio, raw);
        for (const category of ["bgm", "bgs", "me", "se"]) {
            for (const filename of args[category]) {
                const buffer = AudioManager.createBuffer(`${category}/`, filename);
                pendingAudio.add(buffer);
                buffer.addLoadListener(() => {
                    pendingAudio.delete(buffer);
                    buffer.destroy();
                });
            }
        }
    });
    const checkErrors = AudioManager.checkErrors;
    AudioManager.checkErrors = function() {
        checkErrors.call(this);
        for (const buffer of pendingAudio) if (buffer.isError()) this.throwLoadError(buffer);
    };
    if (settings.QoL.SubfolderParse) {
        for (const plugin of $plugins) {
            if (plugin.name.includes("/")) plugin.name = plugin.name.slice(plugin.name.lastIndexOf("/") + 1).trim();
        }
    }
    // Await the browser load event even when a cached Image already reports dimensions.
    Bitmap.prototype._startLoading = function() {
        this._image = new Image();
        this._image.onload = this._onLoad.bind(this);
        this._image.onerror = this._onError.bind(this);
        this._destroyCanvas();
        this._loadingState = "loading";
        if (Utils.hasEncryptedImages()) this._startDecrypting();
        else this._image.src = this._url;
    };
}

function installOpenUrl() {
    function openUrl(url) {
        SoundManager.playOk();
        const opened = window.open(url, "_blank");
        if (!opened) throw new CoreError("POPUP_BLOCKED", `The browser blocked opening ${url}. Allow popups for this game and retry.`, { url });
    }
    const command = catalog.commands.find(command => command.key === "OpenURL");
    PluginManager.registerCommand(catalog.pluginId, command.key, function(raw) {
        openUrl(convertEventArguments(command, raw).URL);
    });
    return openUrl;
}
