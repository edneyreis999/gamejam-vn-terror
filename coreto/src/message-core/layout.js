Window_Message._autoSizeRegexp = /<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi;
Window_Message._autoPosRegExp = /<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi;

function installMessageMovement() {
    const base = Window_Base.prototype;
    const initialize = base.initialize;
    base.initialize = function(rect) {
        const result = initialize.apply(this, arguments);
        this._messageResetRect = {x: rect.x, y: rect.y, width: rect.width, height: rect.height};
        this._moveDuration = 0;
        return result;
    };
    base.moveTo = function(x, y, width, height, duration = 20, easing = 0) {
        if (![x,y,width,height,duration].every(Number.isFinite) || width < 0 || height < 0 || duration < 0) {
            throw new CoreError('MESSAGE_MOVE_DIMENSIONS', 'Message movement requires finite dimensions and duration.');
        }
        this._messageMoveStart = {x:this.x, y:this.y, width:this.width, height:this.height};
        this._moveTargetX=x; this._moveTargetY=y; this._moveTargetWidth=width; this._moveTargetHeight=height;
        this._moveDuration = this._moveMaxDuration = Math.round(duration);
        this._moveEasingType = easing;
        if (!this._moveDuration) {
            this._moveDuration = this._moveMaxDuration = 1;
            this.updateMove();
        }
    };
    base.moveBy = function(x,y,width,height,duration,easing) {return this.moveTo(this.x+x,this.y+y,this.width+width,this.height+height,duration,easing);};
    base.resetRect = function(duration = 20,easing = 0) {
        const rect=this._messageResetRect;
        return this.moveTo(rect.x,rect.y,rect.width,rect.height,duration,easing);
    };
    Window_Message.prototype.resetRect = function(duration = 20,easing = 0) {
        const rect=this._messageResetRect;
        const y=this._positionType*(Graphics.boxHeight-this.height)/2;
        return this.moveTo(rect.x,y,rect.width,rect.height,duration,easing);
    };
    base.calcMoveEasing = function(progress) {
        if (this._moveEasingType === 0) return progress;
        if (this._moveEasingType === 1) return progress*progress;
        if (this._moveEasingType === 2) return 1-(1-progress)*(1-progress);
        if (this._moveEasingType === 3) return progress < .5 ? 2*progress*progress : 1-2*(1-progress)*(1-progress);
        return VisuMZ.applyMoveEasing(progress,this._moveEasingType);
    };
    base.canMove = function() {return false;};
    Window_Message.prototype.canMove = function() {return true;};
    base.updateMove = function() {
        if (this._moveDuration > 0) {
            const progress = this.calcMoveEasing(1-(--this._moveDuration)/this._moveMaxDuration);
            const start = this._messageMoveStart;
            if (this.canMove()) {
                this.move(
                start.x+(this._moveTargetX-start.x)*progress,
                start.y+(this._moveTargetY-start.y)*progress,
                start.width+(this._moveTargetWidth-start.width)*progress,
                start.height+(this._moveTargetHeight-start.height)*progress);
                this.clampPlacementPosition();
            }
        }
    };
    Window_Message.prototype.updateNameBoxMove = function(previous) {
        if (this._nameBoxWindow) {
            this._nameBoxWindow.x += this.x-previous.x;
            this._nameBoxWindow.y += this.y-previous.y;
        }
    };
    Window_Message.prototype.updateMove = function() {
        const previous = {x:this.x, y:this.y};
        base.updateMove.call(this);
        this.updateNameBoxMove(previous);
    };
    const update = base.update;
    base.update = function(...args) {
        const result = update.apply(this,args);
        this.updateMove();
        return result;
    };
}
installMessageMovement();

function installMessageWrapping(settings) {
    const base=Window_Base.prototype;
    const convert=base.convertEscapeCharacters;
    base.convertEscapeCharacters=function(text){
        text=convert.call(this,text);
        if (!this._messageRawMeasuring) this._wordWrap=this instanceof Window_Message ? $gameSystem?.isMessageWindowWordWrap() : this instanceof Window_Help ? $gameSystem?.isHelpWindowWordWrap() : false;
        return this.prepareWordWrapEscapeCharacters(text);
    };
    base.prepareWordWrapEscapeCharacters=function(text){
        if (text.includes('\x1bTEXTALIGNMENT')) {
            this._wordWrap=false;
            return text.replace(/<(?:BR|LINEBREAK)>/gi,' \n').replace(/<(?:WORDWRAP|WORD WRAP|NOWORDWRAP|NO WORD WRAP)>|<\/(?:NOWORDWRAP|NO WORD WRAP)>/gi,'');
        }
        if (/<(?:WORDWRAP|WORD WRAP)>/i.test(text)) this._wordWrap=true;
        if (/<(?:NOWORDWRAP|NO WORD WRAP)>|<\/(?:WORDWRAP|WORD WRAP)>/i.test(text)) this._wordWrap=false;
        if (this instanceof Window_ChoiceList || /\x1bTEXTALIGNMENT|<AUTO(?: ?(?:SIZE|WIDTH|HEIGHT|PLAYER|ACTOR|PARTY|ENEMY|EVENT))?(?:>|: )/i.test(text)) this._wordWrap=false;
        text=text.replace(/<\/?(?:WORDWRAP|WORD WRAP)>|<(?:NOWORDWRAP|NO WORD WRAP)>/gi,'');
        if (this._wordWrap) {
            text=settings.WordWrap.LineBreakSpace ? text.replace(/[\n\r]+/g,' ') : text.replace(/\r\n?/g,'\n');
            text=text.replace(/<(?:BR|LINEBREAK)>/gi,settings.WordWrap.LineBreakSpace?' \n':'\n');
            text=text.replace(/[\u3040-\u30FF\u4E00-\u9FFF](?!\x1bWrapJpBreak\[0\])/g,character=>character+'\x1bWrapJpBreak[0]');
            text=text.replace(/ /g,'\x1bWrapBreak[0]');
            text=text.replace(/<LINE\x1bWrapBreak0BREAK>/gi,'\n');
        } else text=text.replace(/<(?:BR|LINEBREAK)>/gi,' \n');
        return text;
    };
    Window_Base.WORD_WRAP_PADDING=settings.WordWrap.EndPadding;
    base.textSizeExWordWrap=function(text) {
        const previous=this._messageWrapMeasuring;
        this._messageWrapMeasuring=true;
        try { return this.textSizeExRaw(text); }
        finally { this._messageWrapMeasuring=previous; }
    };
    base.processWrapBreak=function(state,japanese=false) {
        const extra=this.obtainEscapeParam(state);
        if(!japanese)state.x+=(state.rtl?-1:1)*this.textWidth(' ')*(extra>0?2:1);
        if(state.rtl || this._messageWrapMeasuring)return;
        const token=japanese?'\x1bWrapJpBreak[0]':'\x1bWrapBreak[0]';
        const next=state.text.indexOf(token,state.index+1),newline=state.text.indexOf('\n',state.index);
        const end=Math.min(next<0?state.text.length:next,newline<0?state.text.length:newline);
        const width=this.textSizeExWordWrap(state.text.slice(state.index,end)).width;
        let available=(state.width || this.innerWidth)-Window_Base.WORD_WRAP_PADDING;
        if(this.constructor===Window_Message && $gameMessage.faceName())available-=(ImageManager.faceWidth+20)*(settings.WordWrap.TightWrap?2:1);
        if(width>0 && state.x+width>state.startX+available)state.text=state.text.slice(0,state.index)+'\n'+state.text.slice(state.index);
    };
    const process=base.processEscapeCharacter;
    base.processEscapeCharacter=function(code,state) {
        if(code==='WRAPBREAK' || code==='WRAPJPBREAK')return this.processWrapBreak(state,code==='WRAPJPBREAK');
        return process.apply(this,arguments);
    };
}
installMessageWrapping(messageApi.settings);

function installMessageAlignment() {
    const base = Window_Base.prototype;
    base.initTextAlignement = function() { this._textAlignment = 'default'; };
    base.setTextAlignment = function(value) { this._textAlignment = value; };
    base.getTextAlignment = function() { return this._textAlignment ?? 'default'; };
    base.convertTextAlignmentEscapeCharacters = function(text) {
        return text.replace(/<(LEFT|CENTER|RIGHT)>/gi, (_, align) => `\x1bTEXTALIGNMENT[${['LEFT','CENTER','RIGHT'].indexOf(align.toUpperCase())+1}]`)
            .replace(/<\/(?:LEFT|CENTER|RIGHT)>/gi, '\x1bTEXTALIGNMENT[0]');
    };
    base.getPreservedFontSettings = function() {
        return Object.fromEntries(['fontFace','fontSize','fontBold','fontItalic','textColor','outlineColor','outlineWidth','paintOpacity'].map(key => [key, this.contents[key]]));
    };
    base.returnPreservedFontSettings = function(settings) { Object.assign(this.contents, settings); };
    base.textSizeExRaw = function(text) {
        const font = this.getPreservedFontSettings();
        const keys = ['_messageMeasuring','_messageRawMeasuring','_wordWrap','_textAlignment','_textCasing','_textCasingUpperState','_lastAltCase','_colorLock','_textColorStack'];
        const previous = Object.fromEntries(keys.map(key => [key, key === '_textColorStack' ? this[key]?.slice() : this[key]]));
        this._messageMeasuring = true;
        this._messageRawMeasuring = true;
        try {
            const state = this.createTextState(text, 0, 0, 0);
            state.drawing = false;
            this.processAllText(state);
            return {width: state.outputWidth, height: state.outputHeight};
        } finally {
            this.returnPreservedFontSettings(font);
            Object.assign(this, previous);
        }
    };
    base.textSizeExTextAlignment = function(text) { return this.textSizeExRaw(text); };
    base.processTextAlignmentX = function(state) {
        const align = this.getTextAlignment();
        if (!state.drawing || state.rtl || align === 'default') return;
        const remaining = state.text.slice(state.index).split(/\n|\x1bTEXTALIGNMENT/)[0];
        const textWidth = this.textSizeExTextAlignment(remaining).width;
        const width = state.width || this.innerWidth-8;
        const faceIndent = this.constructor === Window_Message && $gameMessage.faceName() ? state.startX : 0;
        state.x = state.startX;
        if (align === 'center') state.x += Math.floor((width-textWidth)/2) - faceIndent/2;
        if (align === 'right') state.x += width-textWidth-faceIndent;
    };
    base.processTextAlignmentChange = function(state) {
        const index = this.obtainEscapeParam(state);
        if (!state.drawing) return;
        this.setTextAlignment(['default','left','center','right'][index] ?? 'default');
        this.processTextAlignmentX(state);
    };
    const process = base.processEscapeCharacter;
    base.processEscapeCharacter = function(code, state) {
        if (code === 'TEXTALIGNMENT') return this.processTextAlignmentChange(state);
        return process.apply(this, arguments);
    };
    const newline = base.processNewLine;
    base.processNewLine = function(state) {
        newline.call(this, state);
        this.processTextAlignmentX(state);
    };
    const clear = Window_Message.prototype.clearFlags;
    const processAllText = base.processAllText;
    base.processAllText = function(state) {
        const result = processAllText.call(this, state);
        if (state.drawing) this.setTextAlignment('default');
        return result;
    };
    Window_Message.prototype.clearFlags = function(...args) {
        const result = clear.apply(this, args);
        this.setTextAlignment('default');
        return result;
    };
}
installMessageAlignment();

function installMessageMapName() {
    const window=Window_MapName.prototype;
    window.realignMapName=function(text) {
        for(const [axis,size,viewport,tags] of [
            ['x',this.width,Graphics.boxWidth,['LEFT','CENTER','RIGHT']],
            ['y',this.height,Graphics.boxHeight,['TOP','MIDDLE','BOTTOM']]
        ]) {
            const position=tags.findIndex(tag=>new RegExp('<'+tag+'>','i').test(text));
            if(position>=0)this[axis]=Math.floor((viewport-size)*position/2);
            text=text.replace(new RegExp('<\\/?(?:'+tags.join('|')+')>','gi'),'');
            const offsets=new RegExp('<'+axis+': ([+-]\\d+)>','gi');
            const last=Array.from(text.matchAll(offsets)).at(-1);
            if(last)this[axis]+=Number(last[1]);
            text=text.replace(offsets,'');
        }
        return text;
    };
    window.refreshWithTextCodeSupport=function() {
        this.contents.clear();
        const name=$gameMap.displayName();
        if(!name)return;
        this.drawBackground(0,0,this.innerWidth,this.lineHeight());
        const text=this.realignMapName(name);
        this.drawTextEx(text,Math.floor((this.innerWidth-this.textSizeEx(text).width)/2),0);
    };
}
installMessageMapName();
