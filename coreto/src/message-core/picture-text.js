function installPictureText() {
    const zones = ['upperleft','up','upperright','left','center','right','lowerleft','down','lowerright'];
    const screen = Game_Screen.prototype;
    screen.clearAllPictureTexts = function() { this._pictureText=[];this._pictureTextBuffer=[];this._pictureTextRefresh=[]; };
    const clear = screen.clearPictures;
    screen.clearPictures = function(...args) { const result=clear.apply(this,args);this.clearAllPictureTexts();return result; };
    screen.getPictureTextData = function(id) {
        this._pictureText ??= [];this._pictureTextBuffer ??= [];this._pictureTextRefresh ??= [];
        return this._pictureText[this.realPictureId(id)] ??= {};
    };
    screen.getPictureText = function(id,position) { return this.getPictureTextData(id)[position.trim().toLowerCase()] || ''; };
    screen.setPictureText = function(id,text,position) {
        this.getPictureTextData(id)[position.trim().toLowerCase()] = text || '';
        this.requestPictureTextRefresh(id);
    };
    screen.eraseAllPictureTexts = function(id) { this.getPictureTextData(id);this._pictureText[this.realPictureId(id)]=null;this.requestPictureTextRefresh(id); };
    screen.getPictureTextBuffer = function(id) { this.getPictureTextData(id);return this._pictureTextBuffer[this.realPictureId(id)] || 0; };
    screen.setPictureTextBuffer = function(id,padding) { this.getPictureTextData(id);this._pictureTextBuffer[this.realPictureId(id)]=Math.max(0,padding); };
    screen.erasePictureTextBuffer = function(id) { this.getPictureTextData(id);this._pictureTextBuffer[this.realPictureId(id)]=0; };
    screen.requestPictureTextRefresh = function(id) { this.getPictureTextData(id);this._pictureTextRefresh.push(this.realPictureId(id)); };
    screen.requestPictureTextRefreshAll = function() {
        this._pictureText ??= [];this._pictureTextBuffer ??= [];this._pictureTextRefresh ??= [];
        // _pictures already uses real IDs; applying realPictureId again crosses battle slots.
        this._pictures.forEach((picture,id)=>{if(picture)this._pictureTextRefresh.push(id);});
    };
    screen.needsPictureTextRefresh = function(id) { this.getPictureTextData(id);return this._pictureTextRefresh.includes(this.realPictureId(id)); };
    screen.clearPictureTextRefresh = function(id) { this.getPictureTextData(id);const real=this.realPictureId(id);this._pictureTextRefresh=this._pictureTextRefresh.filter(value=>value!==real); };
    screen.hasPictureText = function(id) { return zones.some(zone=>!!this.getPictureText(id,zone)); };
    const erase = screen.erasePicture;
    screen.erasePicture = function(id) { erase.call(this,id);this.eraseAllPictureTexts(id);this.erasePictureTextBuffer(id);this.clearPictureTextRefresh(id); };
    const clearBattle = screen.eraseBattlePictures;
    screen.eraseBattlePictures = function() {
        clearBattle.call(this);
        if (!this._pictureText) return;
        const start=this.maxPictures()+1;
        this._pictureText.length=Math.min(this._pictureText.length,start);
        this._pictureTextBuffer.length=Math.min(this._pictureTextBuffer.length,start);
        this._pictureTextRefresh=this._pictureTextRefresh.filter(id=>id<start);
    };
    const refreshMap = Game_Map.prototype.refresh;
    Game_Map.prototype.refresh = function(...args) { const result=refreshMap.apply(this,args);$gameScreen.requestPictureTextRefreshAll();return result; };
    const sprite = Sprite_Picture.prototype;
    sprite.createPictureText = function() {
        if (this._pictureTextWindow) return;
        this._pictureTextWindow=new Window_Base(new Rectangle(0,0,0,0));
        this._pictureTextWindow.padding=0;
        this._pictureTextSprite=new Sprite();this.addChildAt(this._pictureTextSprite,0);
        this._pictureTextWidth=0;this._pictureTextHeight=0;this._pictureTextCache={};
    };
    sprite.resizePictureText = function() {
        if (this._pictureTextWidth===this.width && this._pictureTextHeight===this.height) return;
        this._pictureTextWidth=this.width;this._pictureTextHeight=this.height;this._pictureTextCache={};
        this._pictureTextWindow.move(0,0,this.width,this.height);
    };
    sprite.anchorPictureText = function() { this._pictureTextSprite.anchor.copyFrom(this.anchor); };
    sprite.anyPictureTextChanges = function() { return $gameScreen.needsPictureTextRefresh(this._pictureId) || zones.some(zone=>this._pictureTextCache[zone]!==$gameScreen.getPictureText(this._pictureId,zone)); };
    sprite.drawPictureTextZone = function(zone) {
        const text=$gameScreen.getPictureText(this._pictureId,zone),window=this._pictureTextWindow;
        this._pictureTextCache[zone]=text;
        const size=window.textSizeEx(text),padding=$gameScreen.getPictureTextBuffer(this._pictureId);
        const index=zones.indexOf(zone),column=index%3,row=Math.floor(index/3);
        const x=column===1?Math.floor((this.width-size.width)/2):column===2?Math.floor(this.width-size.width-padding):padding;
        const y=row===1?Math.floor((this.height-size.height)/2):row===2?Math.floor(this.height-size.height-padding):padding;
        window.drawTextEx(text,x,y);
    };
    sprite.drawPictureText = function() {
        if (!this.anyPictureTextChanges()) return;
        this._pictureTextWindow.createContents();
        zones.forEach(zone=>this.drawPictureTextZone(zone));
        $gameScreen.clearPictureTextRefresh(this._pictureId);
    };
    sprite.attachPictureText = function() { this._pictureTextSprite.bitmap=this._pictureTextWindow.contents; };
    sprite.updatePictureText = function() {
        if (!this.visible) return;
        this.resizePictureText();this.anchorPictureText();this.drawPictureText();this.attachPictureText();
    };
    const updateBitmap=sprite.updateBitmap;
    sprite.updateBitmap=function() { updateBitmap.call(this);this.createPictureText(); };
    const update=sprite.update;
    sprite.update=function() { update.call(this);this.updatePictureText(); };
    messageApi.registerCommand('PictureTextChange',function(args) {
        for (const id of args.PictureIDs) {
            $gameScreen.setPictureTextBuffer(id,args.Padding);
            for (const zone of zones) $gameScreen.setPictureText(id,args[zone],zone);
        }
    });
    messageApi.registerCommand('PictureTextErase',function(args) { for(const id of args.PictureIDs){$gameScreen.eraseAllPictureTexts(id);$gameScreen.erasePictureTextBuffer(id);} });
    messageApi.registerCommand('PictureTextRefresh',function() { $gameScreen.requestPictureTextRefreshAll(); });
}
installPictureText();
