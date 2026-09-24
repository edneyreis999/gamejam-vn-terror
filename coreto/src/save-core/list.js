function installSaveList(settings){
    const menu=settings.SaveMenu;
    ImageManager.saveMenuSpriteWidth=menu.SpriteWidth;
    ImageManager.saveMenuSvBattlerWidth=menu.SvBattlerWidth;
    ImageManager.svActorHorzCells=9;ImageManager.svActorVertCells=6;
    TextManager.latestSave=menu.LatestText;
    ColorManager.latestSavefile=function(){return this._colorCache?._stored_latestSavefile||this.getColorDataFromPluginParameters('_stored_latestSavefile',menu.LatestColor);};
    const createGameObjects=DataManager.createGameObjects;
    DataManager.createGameObjects=function(){createGameObjects.call(this);Scene_File.MAX_BATTLE_MEMBERS=$gameParty.maxBattleMembers();};
    const prefixes={list:'List',vertical:'Vert',box:'Box',large:'Large'};
    const list=Window_SavefileList.prototype;
    list.selectSavefile=function(id){this.smoothSelect(Math.max(0,this.savefileIdToIndex(id)));};
    const setMode=list.setMode;
    list.setMode=function(mode,autosave){setMode.call(this,mode,StorageManager.autosaveType()==='current'||$gameTemp._pickLockedSaveSlot?false:autosave);};
    const refresh=list.refresh;
    list.refresh=function(){this._saveDrawGeneration=(this._saveDrawGeneration??0)+1;refresh.call(this);};
    list.menuStyle=function(){return settings.SaveMenuStyle;};
    list.actorStyle=function(){return settings.ActorGraphic;};
    list.numVisibleRows=function(){return menu[prefixes[this.menuStyle()]+'Rows'];};
    list.maxCols=function(){return menu[prefixes[this.menuStyle()]+'Cols'];};
    list.setWordWrap=function(value){this._wordWrap=value;};
    list.resetWordWrap=function(){this.setWordWrap(false);};
    list.drawItem=function(index){
        const id=this.indexToSavefileId(index),info=DataManager.savefileInfo(id);
        if(info)info.savefileId=id;
        this._savefileId=id;
        const rect=this.itemRect(index);
        this.resetFontSettings();this.changePaintOpacity(this.isEnabled(id));
        this.drawContents(info,rect);
    };
    const styleNames={list:'List',vertical:'Vertical',box:'Box',large:'Large'};
    for(const [style,name]of Object.entries(styleNames))for(const kind of ['Contents','FileData']){
        list[`draw${name}Style${kind}`]=function(value,rect){saveCallback(settings,`SaveMenu.${prefixes[style]}${kind}JS`,this,value,rect);};
    }
    list.drawContents=function(info,rect){
        if(!info){this.drawFileData(this._savefileId,rect);return;}
        const bitmap=ImageManager.loadPicture(info.picture||''),generation=this._saveDrawGeneration;
        bitmap.addLoadListener(()=>{
            if(this._destroyed||generation!==this._saveDrawGeneration)return;
            this.drawContentsLoaded(info,rect);
        });
    };
    list.drawContentsLoaded=function(info,rect){
        this[`draw${styleNames[this.menuStyle()]}StyleContents`](info,rect);
        this.resetFontSettings();this.drawFileData(info.savefileId,rect);
    };
    list.drawFileData=function(id,rect){this[`draw${styleNames[this.menuStyle()]}StyleFileData`](id,rect);};
    list.drawLatestMarker=function(id,x,y){
        if(id===0||id!==DataManager.latestSavefileId())return;
        this.changeTextColor(ColorManager.latestSavefile());this.drawText(TextManager.latestSave,x,y,180);
    };
    list.drawPlaytime=function(info,x,y,width,align){if(info.playtime)this.drawText(info.playtime,x,y,width,align||'left');};
    list.getTimestamp=function(info){
        const date=new Date(info.timestamp),pad=value=>String(value).padStart(2,'0');
        return `${String(date.getFullYear()).split('').join('\u200b')}.${date.getMonth()+1}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };
    list.drawTimestamp=function(info,x,y,width,align){
        if(!info.timestamp)return;
        let text=this.getTimestamp(info);
        if(globalThis.Imported?.VisuMZ_0_CoreEngine&&this.useDigitGrouping())text=`{{${text}}}`;
        this.drawText(text,x,y,width,align||'left');
    };
    list.drawCurrency=function(info,x,y,width){if(info.gold!==undefined)Window_SavefileList.prototype.drawCurrencyValue.call(this,info.gold,TextManager.currencyUnit,x,y,width);};
    list.drawDescription=function(info,x,y,width){if(info.description)this.drawTextEx(info.description,x,y,width);};
    list.drawActors=function(info,x,y,width,height){
        const method={face:'drawActorFaces',sprite:'drawActorSprites',svbattler:'drawSvBattlerSprites'}[this.actorStyle()];
        if(method)this[method](info,x,y,width,height);
    };
    list.drawActorFaces=function(info,x,y,width,height){
        const faces=info.faces??[],count=Math.max(Scene_File.MAX_BATTLE_MEMBERS,faces.length),w=Math.min(ImageManager.faceWidth,Math.floor(width/count)),h=Math.min(ImageManager.faceHeight,height-2);
        const start=Math.round(x+(width-w*count)/2);
        faces.forEach(([name,index],i)=>this.drawFace(name,index,start+w*i,y+1,w,h));
    };
    list.drawActorSprites=function(info,x,y,width,height){
        const actors=info.characters??[],step=ImageManager.saveMenuSpriteWidth,start=x+Math.round((width-step*Math.max(Scene_File.MAX_BATTLE_MEMBERS,actors.length))/2)+step/2;
        actors.forEach(([name,index],i)=>this.drawCharacter(name,index,start+step*i,y+height-8));
    };
    list.drawSvBattlerSprites=function(info,x,y,width,height){
        if(!info.svbattlers)return this.drawActorSprites(info,x,y,width,height);
        const actors=info.svbattlers,step=ImageManager.saveMenuSvBattlerWidth,start=x+Math.round((width-step*Math.max(Scene_File.MAX_BATTLE_MEMBERS,actors.length))/2)+step/2;
        actors.forEach((name,i)=>this.drawSvActor(name,start+step*i,y+height-8));
    };
    Window_Base.prototype.drawSvActor=function(name,x,y){
        const bitmap=ImageManager.loadSvActor(name);
        const generation=this._saveDrawGeneration;
        bitmap.addLoadListener(()=>{
            if(this._destroyed||generation!==this._saveDrawGeneration)return;
            const single=/\$/i.test(name),w=bitmap.width/(single?1:ImageManager.svActorHorzCells),h=bitmap.height/(single?1:ImageManager.svActorVertCells);
            this.contents.blt(bitmap,0,0,w,h,x-w/2,y-h);
        });
    };
    list.drawPicture=function(name,x,y,width,height,minimumScale){
        if(name==='')return;
        const bitmap=ImageManager.loadPicture(name),scale=Math.min((width-4)/bitmap.width,(height-4)/bitmap.height,minimumScale?1:1000);
        this.contentsBack.blt(bitmap,0,0,bitmap.width,bitmap.height,x+2,y+2,Math.ceil(bitmap.width*scale),Math.ceil(bitmap.height*scale));
    };
    list.drawCenteredPicture=function(name,x,y,width,height,minimumScale){
        if(!name)return;
        const bitmap=ImageManager.loadPicture(name),generation=this._saveDrawGeneration;
        bitmap.addLoadListener(()=>{
            if(this._destroyed||generation!==this._saveDrawGeneration)return;
            let scale=Math.min((width-4)/bitmap.width,(height-4)/bitmap.height);
            if(minimumScale)scale=Math.min(1,scale);
            const w=Math.ceil(bitmap.width*scale),h=Math.ceil(bitmap.height*scale);
            this.contentsBack.blt(bitmap,0,0,bitmap.width,bitmap.height,x+(width-w)/2,y+(height-h)/2,w,h);
        });
    };
    const loadImages=DataManager.loadSavefileImages;
    DataManager.loadSavefileImages=function(info){
        loadImages.call(this,info);
        for(const name of info.svbattlers??[])ImageManager.loadSvActor(name);
        if(info.picture)ImageManager.loadPicture(info.picture);
    };
    const loadAllImages=DataManager.loadAllSavefileImages;
    DataManager.loadAllSavefileImages=function(){loadAllImages.call(this);this.loadPartyImagesForSavefile();};
    DataManager.loadPartyImagesForSavefile=function(){
        for(const actor of $gameParty.members()){
            if(actor.faceName())ImageManager.loadFace(actor.faceName());
            if(actor.characterName())ImageManager.loadCharacter(actor.characterName());
            if(actor.battlerName())ImageManager.loadSvActor(actor.battlerName());
        }
    };
}
