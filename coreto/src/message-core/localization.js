function installMessageLocalization(settings) {
    const locale=settings.Localization,format=locale.LangFiletype;
    const usesTable=locale.Enable && locale.Languages.length>0;
    VisuMZ.MessageCore.LocalizationType=format;
    globalThis.$dataLocalization=null;
    TextManager.isVisuMzLocalizationEnabled=function() { return locale.Enable; };
    TextManager.getLocalizedText=function(key) {
        if(!$dataLocalization)return '';
        const row=$dataLocalization[String(key).toLowerCase().trim()];
        if(!row)return undefined;
        return (row[ConfigManager.textLocale || 'English'] || 'UNDEFINED!').replace(/\\/g,'\x1b').replace(/<SEMI(?:|-COLON|COLON)>/gi,';');
    };
    TextManager.parseLocalizedText=function(text) {
        if(!usesTable)return text;
        text=String(text ?? '');
        for(const pattern of [/\$[\[<{](.*?)[\]>}]/gi,
            /\\(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)[\[<{](.*?)[\]>}]/gi,
            /\x1b(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)[\[<{](.*?)[\]>}]/gi]) {
            text=text.replace(pattern,(_,key)=>this.getLocalizedText(key));
        }
        return text;
    };
    const macros=Window_Base.prototype.convertTextMacros;
    Window_Base.prototype.convertTextMacros=function(text) { return TextManager.parseLocalizedText(macros.call(this,text)); };
    const pre=Window_Base.prototype.preConvertEscapeCharacters;
    Window_Base.prototype.preConvertEscapeCharacters=function(text) { return pre.call(this,TextManager.parseLocalizedText(text)); };
    const formatString=String.prototype.format;
    String.prototype.format=function(...args) { return formatString.apply(TextManager.parseLocalizedText(String(this)),args); };
    for(const method of ['drawText','drawTextTopAligned','measureTextWidth']) {
        const previous=Bitmap.prototype[method];
        Bitmap.prototype[method]=function(text,...args) { return previous.call(this,TextManager.parseLocalizedText(text),...args); };
    }
    function implicit(text) {
        if(!locale.Enable || !$dataLocalization || typeof text!=='string' || !$dataLocalization[text.toLowerCase().trim()])return text;
        return TextManager.getLocalizedText(text);
    }
    const addCommand=Window_Command.prototype.addCommand;
    Window_Command.prototype.addCommand=function(name,...args) { return addCommand.call(this,implicit(name),...args); };
    const slot=Window_StatusBase.prototype.actorSlotName;
    Window_StatusBase.prototype.actorSlotName=function(...args) { return implicit(slot.apply(this,args)); };
    const font=Game_System.prototype.mainFontFace;
    Game_System.prototype.mainFontFace=function() {
        if(!locale.Enable || ConfigManager.textFont)return font.call(this);
        return `${settings.LanguageFonts[ConfigManager.textLocale] || 'rmmz-mainfont'}, ${$dataSystem.advanced.fallbackFonts}`;
    };
    const bitmap=ImageManager.loadBitmap;
    ImageManager.loadBitmap=function(folder,name) {
        if(locale.Enable && (settings.LanguageImages.ConvertDefault || ConfigManager.textLocale!==locale.DefaultLocale))name=name.replace(/\[XX\]/g,settings.LanguageImages[ConfigManager.textLocale] || '[XX]');
        return bitmap.call(this,folder,name);
    };
    messageApi.refreshLocalizedScene = function() {
        if (!locale.Enable) return;
        $gameScreen?.requestPictureTextRefreshAll();
        const layer = SceneManager._scene?._windowLayer;
        for (const window of layer?.children ?? []) {
            window.clearMessageResourceRequests?.();
            if (typeof window.refresh === 'function') window.refresh();
        }
    };
    const changeOption = Window_Options.prototype.changeValue;
    Window_Options.prototype.changeValue = function(symbol, value) {
        const previous = ConfigManager.textLocale;
        const result = changeOption.call(this, symbol, value);
        if (symbol === 'textLocale' && previous !== ConfigManager.textLocale) messageApi.refreshLocalizedScene();
        return result;
    };
    const pictureBitmap = Sprite_Picture.prototype.updateBitmap;
    Sprite_Picture.prototype.updateBitmap = function() {
        const previousName = this._pictureName;
        pictureBitmap.call(this);
        if (locale.Enable && this._messagePictureLocale !== ConfigManager.textLocale) {
            this._messagePictureLocale = ConfigManager.textLocale;
            if (this._pictureName && this._pictureName === previousName && this._pictureName.includes('[XX]')) this.loadBitmap();
        }
    };
    DataManager.loadLocalization=function() {
        if(!usesTable)return;
        const filename=locale[format==='csv'?'CsvFilename':'TsvFilename'];
        if(!isLanguageBasename(filename, format)) {
            throw new CoreError('MESSAGE_LANGUAGE_FILENAME','Use a language basename in the project root.',{filename});
        }
        const previous=this._messageLanguageLoad;
        if(previous?.status==='pending')previous.xhr.abort();
        const xhr=new XMLHttpRequest();
        const request={status:'pending',filename,xhr};
        this._messageLanguageLoad=request;
        globalThis.$dataLocalization=null;
        const fail=reason=>{if(this._messageLanguageLoad===request){request.status='error';request.reason=reason;}};
        xhr.open('GET',filename);
        xhr.overrideMimeType('text/plain');
        xhr.timeout=30000;
        xhr.onload=()=>{
            if(this._messageLanguageLoad!==request)return;
            if(xhr.status<200 || xhr.status>=400)return fail(`HTTP ${xhr.status}`);
            try {
                const rows=parseLanguageTable(xhr.responseText,format),header=rows[0],table=Object.create(null);
                for(const row of rows.slice(1))table[row[0].toLowerCase().trim()]=Object.fromEntries(header.slice(1).map((name,index)=>[name.trim(),row[index+1]]));
                globalThis.$dataLocalization=table;
                request.status='ready';
            } catch(error) { fail(`${error.code || error.name}: ${error.message}`); }
        };
        xhr.onerror=()=>fail('Network error');
        xhr.ontimeout=()=>fail('Timeout after 30000ms');
        xhr.send();
    };
    const load=DataManager.loadDatabase;
    DataManager.loadDatabase=function(...args) { load.apply(this,args);this.loadLocalization(); };
    const ready=DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded=function() {
        const loaded=ready.call(this);
        if(!usesTable)return loaded;
        const request=this._messageLanguageLoad;
        if(request?.status==='error')throw ['LoadError',`${request.filename}: ${request.reason}`,()=>this.loadLocalization()];
        return loaded && request?.status==='ready';
    };
}
installMessageLocalization(messageApi.settings);
