const aniEffects=Object.create(null);
for(const family of ['AngleEffects','ColorEffects','OpacityEffects','PositionEffects','ScaleEffects']){
    for(const effect of aniApi.settings[family]){
        const name=effect.Name.toLowerCase().trim();
        if(!name||name==='untitled')continue;
        aniEffects[name]??={};Object.assign(aniEffects[name],effect);
    }
}
function aniEffectData(selection){
    const result={};
    for(const name of selection.replace(/\x1b/gi,'').replace(/WrapBreak\[0\]/gi,'').split(',')){
        const effect=aniEffects[name.toLowerCase().trim()];
        if(effect)Object.assign(result,effect);
    }
    return result;
}
class AniTextGlyph extends Sprite{
    initialize(message,textState,index){
        this._msgWindow=message;this._textEffect=message._textEffect;
        this._textState=JSON.parse(JSON.stringify(textState));this._offset=index;
        super.initialize();
        const icon=textState.iconIndex!==undefined;
        this._textWidth=icon?(ImageManager.standardIconWidth||32)+4:message.textWidth(textState.buffer);
        this._textHeight=icon?(ImageManager.standardIconHeight||32)+4:textState.height;
        this.anchor.set(0.5,0.5);this._textEffectData=aniEffectData(this._textEffect);
        if(icon){
            this.bitmap=ImageManager.loadSystem('IconSet');
            const width=ImageManager.iconWidth,height=ImageManager.iconHeight;
            this.setFrame(textState.iconIndex%16*width,Math.floor(textState.iconIndex/16)*height,width,height);
        }else{
            const width=Math.ceil(this._textWidth*1.5),height=Math.ceil(this._textHeight*1.5);
            this.bitmap=new Bitmap(width,height);
            for(const key of ['fontFace','fontSize','fontBold','fontItalic','textColor','outLineColor','outlineWidth','paintOpacity'])this.bitmap[key]=message.contents[key];
            const color=this.effectData().ForcedColor;
            if(color!==undefined&&color!=='')this.bitmap.textColor=ColorManager.getColor(color);
            this.bitmap.drawText(textState.buffer,0,0,width,height,'center');
        }
        this.update();
    }
    effectData(){return this._textEffectData;}
    update(){
        super.update();
        const message=this._msgWindow;
        this.x=this._textState.x+message.x+message.padding+this._textWidth/2;
        this.y=this._textState.y+message.y+message.padding+this._textHeight/2;
        if(globalThis.Imported?.VisuMZ_2_ExtMessageFunc&&Window_ButtonConsole.POSITION==='top')this.y+=Window_ButtonConsole.BUTTON_HEIGHT||0;
        updateAniEffects(this);
    }
    destroy(options){
        if(this._destroyed)return;
        const bitmap=this._textState.iconIndex===undefined?this.bitmap:null;
        const filter=this._colorFilter;
        super.destroy(options);
        if(filter)filter.destroy();
        this._colorFilter=null;
        if(bitmap&&bitmap._baseTexture)bitmap.destroy();
        this._bitmap=null;
        this._msgWindow=null;
    }
}

function installAniDrawing(){
    const create=Scene_Message.prototype.createAllWindows;
    Scene_Message.prototype.createAllWindows=function(...args){
        const result=create.apply(this,args);this.createAniMsgTextEffectsContainer();return result;
    };
    Scene_Message.prototype.createAniMsgTextEffectsContainer=function(){
        this._AniMsgTextEffectsContainer=new Sprite();this.addWindow(this._AniMsgTextEffectsContainer);
        this._messageWindow.setTextEffectContainer(this._AniMsgTextEffectsContainer);
    };
    const init=Window_Message.prototype.initMembers;
    Window_Message.prototype.initMembers=function(...args){const result=init.apply(this,args);this._textEffect='';return result;};
    Window_Message.prototype.setTextEffectContainer=function(container){this._AniMsgTextEffectsContainer=container;};
    const convert=Window_Base.prototype.preConvertEscapeCharacters;
    Window_Base.prototype.preConvertEscapeCharacters=function(text){return this.convertTextEffectEscapeCodes(convert.call(this,text));};
    Window_Base.prototype.convertTextEffectEscapeCodes=function(text){return text.replace(/\x1bEFFECT<(.*?)>/gi,'').replace(/<CLEAR EFFECT(?:|S)>/gi,'');};
    Window_Message.prototype.convertTextEffectEscapeCodes=function(text){return text.replace(/<CLEAR EFFECT(?:|S)>/gi,'\x1bCLEAREFFECT[0]');};
    const escape=Window_Message.prototype.processEscapeCharacter;
    Window_Message.prototype.processEscapeCharacter=function(code,state){
        if(code==='EFFECT'){
            const value=this.obtainEscapeString(state);
            if(state.drawing&&ConfigManager.textEffects){
                this._textEffect=value.replace(/\x1bC\[(.*?)\]/gi,'').replace(/\x1bPREVCOLOR\[(.*?)\]/gi,'').toLowerCase().trim();
                if(this._textEffect==='normal')this._textEffect='';
            }
        }else if(code==='CLEAREFFECT'){
            this.obtainEscapeParam(state);if(state.drawing)this._textEffect='';
        }else return escape.call(this,code,state);
    };
    const preFlush=Window_Message.prototype.preFlushTextState,postFlush=Window_Message.prototype.postFlushTextState;
    Window_Message.prototype.preFlushTextState=function(state){
        preFlush.call(this,state);
        if(this._textEffect!==''&&state.drawing){
            this.processTextEffectCharacter(state);this._textEffectReturnState=true;
            if(globalThis.Imported?.VisuMZ_3_MessageSounds)this.playMessageSound(state);
            state.drawing=false;
        }
    };
    Window_Message.prototype.postFlushTextState=function(state){
        postFlush.call(this,state);
        if(this._textEffectReturnState!==undefined){
            state.drawing=true;this._textEffectReturnState=undefined;
            if(globalThis.Imported?.VisuMZ_2_ExtMessageFunc)this.moveCustomMessageCursorPauseSign(state);
        }
    };
    Window_Message.prototype.processTextEffectCharacter=function(state){
        const container=this._AniMsgTextEffectsContainer;if(!container)return;
        const glyphState=JSON.parse(JSON.stringify(state));
        for(const letter of state.buffer.split('')){
            glyphState.buffer=letter;
            if(letter.trim()!=='')container.addChild(new AniTextGlyph(this,glyphState,container.children.length));
            glyphState.x+=this.textWidth(letter);
        }
    };
    const icon=Window_Base.prototype.processDrawIcon;
    Window_Base.prototype.processDrawIcon=function(index,state){
        if(this instanceof Window_Message&&state.drawing&&this._textEffect!=='')this.processDrawIconTextEffect(index,state);
        else return icon.call(this,index,state);
    };
    Window_Base.prototype.processDrawIconTextEffect=function(index,state){
        const container=this._AniMsgTextEffectsContainer,glyphState=JSON.parse(JSON.stringify(state));glyphState.iconIndex=index;
        container.addChild(new AniTextGlyph(this,glyphState,container.children.length));state.x+=(ImageManager.standardIconWidth||32)+4;
    };
    const page=Window_Message.prototype.newPage;
    Window_Message.prototype.newPage=function(...args){const result=page.apply(this,args);this._textEffect='';this.clearTextEffects();return result;};
    Window_Message.prototype.clearTextEffects=function(){
        const container=this._AniMsgTextEffectsContainer;if(!container)return;
        for(const glyph of [...container.children]){container.removeChild(glyph);glyph.destroy();}
    };
    for(const [method,visible]of [['open',true],['close',false]]){
        const original=Window_Message.prototype[method];
        Window_Message.prototype[method]=function(...args){const result=original.apply(this,args);if(this._AniMsgTextEffectsContainer)this._AniMsgTextEffectsContainer.visible=visible;return result;};
    }
    const destroy=Window_Message.prototype.destroy;
    Window_Message.prototype.destroy=function(...args){this.clearTextEffects();return destroy.apply(this,args);};
    if(typeof ColorManager.getColor!=='function')ColorManager.getColor=function(value){return isNaN(value)?value:this.textColor(Number(value));};
    VisuMZ.AniMsgTextEffects={version:1.05,Settings:aniApi.settings,Effects:aniEffects};
    globalThis.Imported??={};Imported.Coreto_2_AniMsgTextEffects=true;Imported.VisuMZ_2_AniMsgTextEffects=true;
}
installAniDrawing();
