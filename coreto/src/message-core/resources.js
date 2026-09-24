function installMessageResources(settings) {
    Scene_Boot.prototype.loadCustomFontsMessageCore = function() {
        for (const font of settings.CustomFonts) {
            const family = font.FontFamily;
            if (family.trim() && family.toLowerCase().trim() !== 'unnamed' && font.Filename !== 'Unnamed.ttf') FontManager.load(family, font.Filename);
        }
    };
    const loadFonts = Scene_Boot.prototype.loadGameFonts;
    Scene_Boot.prototype.loadGameFonts = function(...args) {
        const result = loadFonts.apply(this, args);
        this.loadCustomFontsMessageCore();
        return result;
    };
    const base = Window_Base.prototype;
    base.clearMessageResourceRequests = function() {
        for (const request of this._messageResourceRequests ?? []) request.owner = null;
        this._messageResourceRequests = [];
    };
    for (const method of ['createContents', 'destroy']) {
        const previous = base[method];
        base[method] = function(...args) {
            this.clearMessageResourceRequests();
            return previous.apply(this, args);
        };
    }
    for (const Window of [Window_Help, Window_NameBox]) {
        const refresh = Window.prototype.refresh;
        Window.prototype.refresh = function(...args) {
            this.clearMessageResourceRequests();
            this.contentsBack.clear();
            return refresh.apply(this, args);
        };
    }
    const newPage = Window_Message.prototype.newPage;
    Window_Message.prototype.newPage = function(...args) {
        this.clearMessageResourceRequests();
        this.contentsBack.clear();
        return newPage.apply(this, args);
    };
    base.withMessagePicture = function(name, draw) {
        const bitmap = ImageManager.loadPicture(name);
        const request = {owner: this, bitmap, name, locale: ConfigManager.textLocale};
        (this._messageResourceRequests ??= []).push(request);
        bitmap.addLoadListener(function() {
            const owner = request.owner;
            if (!owner) return;
            request.owner = null;
            owner._messageResourceRequests = owner._messageResourceRequests.filter(item => item !== request);
            if (request.locale === ConfigManager.textLocale) draw(owner, bitmap);
        });
    };
    const update = base.update;
    base.update = function(...args) {
        const result = update.apply(this, args);
        for (const request of this._messageResourceRequests ?? []) {
            if (request.bitmap.isError()) throw new CoreError('MESSAGE_IMAGE', `Cannot load message picture: ${request.name}.`, {asset: request.name});
        }
        return result;
    };
    base.processDrawPicture = function(state) {
        const [name, width, height] = this.obtainEscapeString(state).split(',');
        if (!state.drawing) return;
        const x = state.x, y = state.y, opacity = this.contents.paintOpacity;
        this.withMessagePicture(name.trim(), (owner, bitmap) => owner.drawBackPicture(bitmap, x, y, Number(width), Number(height), opacity));
    };
    base.drawBackPicture = function(bitmap, x, y, width, height, opacity) {
        this.contentsBack.paintOpacity = opacity;
        this.contentsBack.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, width || bitmap.width, height || bitmap.height);
        this.contentsBack.paintOpacity = 255;
    };
    base.processDrawCenteredPicture = function(state) {
        const name = this.obtainEscapeString(state).split(',')[0].trim();
        if (!state.drawing) return;
        const snapshot = {width: state.width, startX: state.startX, startY: state.startY};
        const opacity = this.contents.paintOpacity;
        this.withMessagePicture(name, (owner, bitmap) => owner.drawBackCenteredPicture(bitmap, snapshot, opacity));
    };
    base.drawBackCenteredPicture = function(bitmap, state, opacity) {
        const width = state.width || this.innerWidth;
        const selectable = this instanceof Window_Selectable;
        const height = selectable ? this.itemHeight() : this.innerHeight;
        const scale = Math.min(width / bitmap.width, height / bitmap.height, 1);
        const padding = selectable ? this.itemRectWithPadding(0).height - this.lineHeight() : 0;
        const w = bitmap.width * scale, h = bitmap.height * scale;
        this.drawBackPicture(bitmap, state.startX + Math.floor((width-w)/2), state.startY + Math.floor((height-h)/2)-padding, w, h, opacity);
    };
    const escape = base.processEscapeCharacter;
    base.processEscapeCharacter = function(code, state) {
        if (code === 'PICTURE') return this.processDrawPicture(state);
        if (code === 'CENTERPICTURE') return this.processDrawCenteredPicture(state);
        return escape.apply(this, arguments);
    };
    const drawFace = Window_Message.prototype.drawMessageFace;
    Window_Message.prototype.drawMessageFace = function(bitmap) {
        if (this._destroyed || (bitmap && bitmap !== this._faceBitmap) || (this._faceBitmap && !this._faceBitmap.isReady())) return;
        return drawFace.call(this);
    };
}
installMessageResources(messageApi.settings);
