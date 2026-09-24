function installMessageWindow(settings) {
    const general = settings.General;
    Game_System.prototype.initializeMessageCoreSettings = function() {
        const defaults = {messageRows:general.MessageRows,messageWidth:general.MessageWidth,
            messageWordWrap:settings.WordWrap.MessageWindow,helpWordWrap:settings.WordWrap.HelpWindow,
            choiceLineHeight:general.ChoiceWindowLineHeight,choiceMinWidth:general.ChoiceWindowMinWidth,
            choiceRows:general.ChoiceWindowMaxRows,choiceCols:general.ChoiceWindowMaxCols,choiceTextAlign:general.ChoiceWindowTextAlign,choiceDistance:0};
        this._MessageCoreSettings ??= {};
        for (const [key, value] of Object.entries(defaults)) if (this._MessageCoreSettings[key] === undefined) this._MessageCoreSettings[key] = value;
        this._messageOffsetX ??= general.MsgWindowOffsetX;
        this._messageOffsetY ??= general.MsgWindowOffsetY;
    };
    const initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function(...args) {
        const result = initialize.apply(this,args);
        this.initializeMessageCoreSettings();
        return result;
    };
    for (const [suffix,key] of [['MessageWindowRows','messageRows'],['ChoiceListLineHeight','choiceLineHeight'],
        ['ChoiceListMinChoiceWidth','choiceMinWidth'],['ChoiceListMaxRows','choiceRows'],['ChoiceListMaxColumns','choiceCols'],['ChoiceListTextAlign','choiceTextAlign'],['ChoiceMessageDistance','choiceDistance']]) {
        Game_System.prototype[`get${suffix}`]=function(){return this._MessageCoreSettings[key];};
        Game_System.prototype[`set${suffix}`]=function(value){this._MessageCoreSettings[key]=value;};
    }
    Game_System.prototype.getMessageWindowWidth=function(){return this._MessageCoreSettings.messageWidth;};
    Game_System.prototype.setMessageWindowWidth=function(value){
        value=Math.ceil(value);
        if(value%2!==0)value+=1;
        this._MessageCoreSettings.messageWidth=value||2;
    };
    Game_System.prototype.isMessageWindowWordWrap=function(){return this._MessageCoreSettings.messageWordWrap;};
    Game_System.prototype.isHelpWindowWordWrap=function(){return this._MessageCoreSettings.helpWordWrap;};
    Game_System.prototype.setMessageWindowXyOffsets=function(x,y){this._messageOffsetX=x;this._messageOffsetY=y;};
    Game_System.prototype.getMessageWindowXyOffsets=function(){return{x:this._messageOffsetX,y:this._messageOffsetY};};
    function addedText(text) {
        text = general.EachMessageStart + text + general.EachMessageEnd;
        return text.replace(/<(?:NEXT PAGE|NEXTPAGE)>/gi, '')
            .replace(/<(?:RNG|RAND|RANDOM)>(.*?)<\/(?:RNG|RAND|RANDOM)>/gi, (_, pool) => {
                const options = pool.split('|').map(value => value.trim()).filter(Boolean);
                return options[Math.randomInt(options.length)];
            });
    }
    Game_Interpreter.prototype.command101 = function(params) {
        if ($gameMessage.isBusy()) return false;
        $gameMessage.setFaceImage(params[0], params[1]);
        $gameMessage.setBackground(params[2]);
        $gameMessage.setPositionType(params[3]);
        $gameMessage.setSpeakerName(params[4]);
        $gameMessage._messageEventContext = {mapId: this._mapId, eventId: this.eventId()};
        const rows = $gameSystem.getMessageWindowRows();
        while (this.nextEventCode() === 401 || (rows > 4 && this.nextEventCode() === 101)) {
            if (this.nextEventCode() === 101 && !params.every((value, index) => value === this._list[this._index + 1].parameters[index])) break;
            this._index++;
            const command = this.currentCommand();
            if (command.code === 401) {
                $gameMessage.add(addedText(command.parameters[0]));
                if (/<(?:NEXT PAGE|NEXTPAGE)>/i.test(command.parameters[0])) break;
            }
            if ($gameMessage._texts.length >= rows && this.nextEventCode() !== 401) break;
        }
        this.prepareShowTextFollowups();
        this.setWaitMode('message');
        return true;
    };
    Scene_Message.prototype.messageWindowRect = function() {
        const width = Math.min(Graphics.width, $gameSystem.getMessageWindowWidth());
        const height = this.calcWindowHeight($gameSystem.getMessageWindowRows(), false);
        return new Rectangle((Graphics.boxWidth-width)/2, 0, width, height);
    };
    const window = Window_Message.prototype;
    // Consumers contribute their extra dimensions through these extension points.
    window.addedWidth=function(){return 0;};
    window.addedHeight=function(){return 0;};
    window.updateDimensions=function(){
        const oldWidth=this.width, oldHeight=this.height;
        this.width=Math.min(Graphics.width,this._forcedPosition?.width ?? this._messageAutoSize?.width ?? ($gameSystem.getMessageWindowWidth()+this.addedWidth()));
        this.height=Math.min(Graphics.height,this._forcedPosition?.height ?? this._messageAutoSize?.height ?? (Scene_Base.prototype.calcWindowHeight.call(SceneManager._scene,$gameSystem.getMessageWindowRows(),false)+this.addedHeight()));
        if(this.contents && (oldWidth!==this.width || oldHeight!==this.height))this.createContents();
    };
    window.clampPlacementPosition=function(){
        this.x=Math.max(0,Math.min(this.x,Graphics.boxWidth-this.width));
        this.y=Math.max(0,Math.min(this.y,Graphics.boxHeight-this.height));
    };
    const placement=window.updatePlacement;
    window.updatePlacement=function(...args){
        this.updateDimensions();
        const result=placement.apply(this,args),offset=$gameSystem.getMessageWindowXyOffsets();
        this.x=this._forcedPosition?.x ?? (Graphics.boxWidth-this.width)/2+offset.x;
        this.y=this._forcedPosition?.y ?? this.y+offset.y;
        this.clampPlacementPosition();return result;
    };
    const convert=window.convertEscapeCharacters;
    window.convertEscapeCharacters=function(text){
        text=convert.call(this,text);
        if(this._wordWrap)return text;
        return text.replace(/<(POSITION|COORDINATES|DIMENSIONS|OFFSET): *(.*?)>/gi,(_,tag,source)=>{
            if(this._messageMeasuring)return '';
            const values=source.split(',').map(value=>Number(value)||0),kind=tag.toUpperCase();
            if(kind==='OFFSET')$gameSystem.setMessageWindowXyOffsets(values[0],values[1]??0);
            else {
                const keys=kind==='DIMENSIONS'?['width','height']:kind==='COORDINATES'?['x','y']:['x','y','width','height'];
                this._forcedPosition??={};
                keys.forEach((key,index)=>{if(index<values.length)this._forcedPosition[key]=values[index];});
            }
            return '';
        });
    };
    const startMessage=window.startMessage;
    window.startMessage=function(...args){
        this._forcedPosition=null;
        this.updateDimensions();
        this.setTextDelay(general.MessageTextDelay);
        return startMessage.apply(this,args);
    };
    window.setTextDelay=function(value){this._textDelay=this._textDelayCount=Math.round(value*(11-(ConfigManager.textSpeed ?? 10)));};
    const process=window.processCharacter;
    window.processCharacter=function(state){
        if (!state.drawing) return Window_Base.prototype.processCharacter.call(this,state);
        if (--this._textDelayCount>0) return;
        this._textDelayCount=this._textDelay;
        if (this._textDelay<=0) this._showFast=true;
        return process.call(this,state);
    };
    const triggered=window.isTriggered;
    window.isTriggered=function(){return triggered.apply(this,arguments)||Input.isPressed(general.FastForwardKey);};
    const nameColor=Window_NameBox.prototype.resetTextColor;
    Window_NameBox.prototype.resetTextColor=function(...args){const result=nameColor.apply(this,args);this.changeTextColor(ColorManager.textColor(general.NameBoxWindowDefaultColor));return result;};
    const namePlacement=Window_NameBox.prototype.updatePlacement;
    Window_NameBox.prototype.updatePlacement=function(...args){const result=namePlacement.apply(this,args);this.x+=general.NameBoxWindowOffsetX;this.y+=general.NameBoxWindowOffsetY;return result;};
    messageApi.registerCommand('MessageWindowProperties',function(args){
        if(args.Rows>0)$gameSystem.setMessageWindowRows(args.Rows);
        if(args.Width>0)$gameSystem.setMessageWindowWidth(args.Width);
        if(args.WordWrap!=='No Change')$gameSystem._MessageCoreSettings.messageWordWrap=args.WordWrap==='true';
        const message=SceneManager._scene?._messageWindow;
        if(message){message.updatePlacement();message.createContents();}
    });
    messageApi.registerCommand('MessageWindowXyOffsets',function(args){return $gameSystem.setMessageWindowXyOffsets(args.OffsetX,args.OffsetY);});
}
installMessageWindow(messageApi.settings);

function installMessageAutoLayout(settings) {
    const base = Window_Base.prototype;
    base.setWordWrap = function(value) { this._wordWrap = value; return ''; };
    base.isWordWrapEnabled = function() { return !!this._wordWrap; };
    base.resetWordWrap = function() { this.setWordWrap(false); };
    Window_Help.prototype.resetWordWrap = function() { this.setWordWrap($gameSystem.isHelpWindowWordWrap()); };
    base.clampPlacementPosition = function(keepSize = false, keepPosition = false) {
        if (!keepSize) { this.width = Math.min(this.width, Graphics.width); this.height = Math.min(this.height, Graphics.height); }
        if (keepPosition) return;
        const left = -Math.floor(Graphics.width-Graphics.boxWidth)/2;
        const top = -Math.floor(Graphics.height-Graphics.boxHeight)/2;
        this.x = Math.max(left, Math.min(this.x, left+Graphics.width-this.width));
        this.y = Math.max(top, Math.min(this.y, top+Graphics.height-this.height));
    };
    const window = Window_Message.prototype;
    window.clampPlacementPosition = base.clampPlacementPosition;
    window.resetWordWrap = function() { this.setWordWrap($gameSystem.isMessageWindowWordWrap()); };
    const contentsHeight = window.contentsHeight;
    window.contentsHeight = function() { return contentsHeight.call(this)-this.addedHeight(); };
    const dimmer = window.refreshDimmerBitmap;
    window.refreshDimmerBitmap = function() {
        dimmer.call(this);
        if (settings.General.StretchDimmedBg) this.stretchDimmerSprite();
    };
    window.stretchDimmerSprite = function() {
        this._dimmerSprite.x = Math.round(this.width/2);
        this._dimmerSprite.anchor.x = .5;
        this._dimmerSprite.scale.x = Graphics.width;
    };
    window.autoPositionOffsetX = function() { return 0; };
    window.autoPositionOffsetY = function() { return 0; };
    window.processAutoSize = function(text, width, height) {
        const clean = text.replace(/<AUTO(?:SIZE| SIZE|WIDTH| WIDTH|HEIGHT| HEIGHT|PLAYER| PLAYER)?>/gi, '')
            .replace(/<AUTO ?(?:ACTOR|PARTY|ENEMY|EVENT|PLAYER): .*?>/gi, '');
        this._currentAutoSize = true;
        this.setWordWrap(false);
        const size = this.textSizeExRaw(clean);
        const faceWidth = $gameMessage.faceName() ? ImageManager.faceWidth+20 : 4;
        const dimensions = {};
        if (width) dimensions.width = Math.ceil((size.width+$gameSystem.windowPadding()*2+6+faceWidth)/2)*2;
        if (height) dimensions.height = SceneManager._scene.calcWindowHeight(Math.ceil(size.height/this.lineHeight()), false)+this.addedHeight();
        this._messageAutoSize = {...this._messageAutoSize, ...dimensions};
        this.updateDimensions();
    };
    window.processAutoPosition = function(context, id) {
        const [scene, kind] = context.split(' ');
        let target;
        if (scene === 'battle') {
            if (kind === 'actor') target = $gameActors.actor(id);
            if (kind === 'party') target = $gameParty.members()[id-1];
            if (kind === 'enemy') target = $gameTroop.members()[id-1];
        } else if (scene === 'map') {
            if (kind === 'player') target = $gamePlayer;
            if (kind === 'event') target = $gameMap.event(id);
            if (kind === 'actor' || kind === 'party') {
                const index = kind === 'actor' ? $gameActors.actor(id)?.index() : id-1;
                if (index === 0) target = $gamePlayer;
                else if (index > 0) target = $gamePlayer.followers().follower(index-1);
            }
        }
        this._autoPositionTarget = target;
    };
    window.prepareAutoSizeEscapeCharacters = function(state) {
        if (this._messageMeasuring) return;
        let text = state.text;
        text = text.replace(/<(AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT)>/gi, (_, tag) => {
            const mode = tag.toUpperCase();
            this.processAutoSize(text, !mode.includes('HEIGHT'), !mode.includes('WIDTH'));
            this.processAutoPosition('none');
            return '';
        });
        const scene = SceneManager.isSceneBattle() ? 'battle' : SceneManager.isSceneMap() ? 'map' : null;
        if (scene) text = text.replace(/<AUTO ?(ACTOR|PARTY|ENEMY|EVENT): (.*?)>|<AUTO ?(PLAYER)>/gi, (all, kind, source, player) => {
            kind = (kind || player).toLowerCase();
            if ((scene === 'map' && kind === 'enemy') || (scene === 'battle' && ['event','player'].includes(kind))) return all;
            this.processAutoSize(text, true, true);
            this.processAutoPosition(`${scene} ${kind}`, Number(source) || (kind === 'actor' ? 1 : 0));
            return '';
        });
        state.text = text;
    };
    window.updateAutoPosition = function() {
        if (!this._autoPositionTarget) return;
        const spriteset = SceneManager._scene?._spriteset;
        if (!spriteset) return;
        const sprite = spriteset.findTargetSprite(this._autoPositionTarget);
        if (!sprite) return;
        const zoom = SceneManager.isSceneMap() ? $gameScreen.zoomScale() : 1;
        const offset = $gameSystem.getMessageWindowXyOffsets();
        this.x = Math.round(sprite.x*zoom-this.width/2-(Graphics.width-Graphics.boxWidth)/2+this.autoPositionOffsetX()+offset.x);
        this.y = Math.round((sprite.y-sprite.height-8-this.height)*zoom-(Graphics.height-Graphics.boxHeight)/2+this.autoPositionOffsetY()+offset.y);
        this.clampPlacementPosition(true);
        this._forcedPosition = {...this._forcedPosition, x:this.x, y:this.y, width:this.width, height:this.height};
        if (this._nameBoxWindow) this._nameBoxWindow.updatePlacement();
    };
    const start = window.startMessage;
    window.startMessage = function(...args) {
        this._messageAutoSize = null;
        this._currentAutoSize = false;
        this._autoPositionTarget = null;
        return start.apply(this, args);
    };
    const page = window.newPage;
    window.convertNewPageTextStateMacros = function(state) {
        if (!state) return;
        this._macroBypassWordWrap = false;
        state.text = this.convertTextMacros(state.text);
        if (this._textMacroFound) {
            state.text = this.prepareWordWrapEscapeCharacters(state.text);
            this._macroBypassWordWrap = true;
        }
    };
    window.newPage = function(state) {
        this.convertNewPageTextStateMacros(state);
        this.prepareAutoSizeEscapeCharacters(state);
        page.call(this, state);
        this.updateDimensions();
        this.updateAutoPosition();
    };
    const placement = window.updatePlacement;
    window.updatePlacement = function(...args) {
        const result = placement.apply(this, args);
        this.updateAutoPosition();
        return result;
    };
    const update = window.update;
    window.update = function(...args) {
        const result = update.apply(this, args);
        if (this.isOpen()) this.updateAutoPosition();
        return result;
    };
    const namebox = Window_NameBox.prototype;
    const preConvert = namebox.preConvertEscapeCharacters;
    namebox.preConvertEscapeCharacters = function(text) {
        text = text.replace(/<(LEFT|CENTER|RIGHT)>|<POSITION: (\d+)>/gi, (_, align, index) => {
            if (!this._messageMeasuring) this._relativePosition = index === undefined ? {LEFT:0,CENTER:5,RIGHT:10}[align.toUpperCase()] : Number(index);
            return '';
        }).replace(/<\/(?:LEFT|CENTER|RIGHT)>/gi,'').trim();
        return preConvert.call(this, text);
    };
    namebox.updateRelativePosition = function() {
        if ($gameMessage.isRTL()) return;
        const message = this._messageWindow;
        this.x = message.x+Math.floor(message.width*(this._relativePosition ?? 0)/10)-Math.floor(this.width/2);
        this.x = Math.min(Math.max(this.x, message.x), message.x+message.width-this.width);
    };
    const namePlacement = namebox.updatePlacement;
    namebox.updatePlacement = function(...args) {
        const result = namePlacement.apply(this, args);
        this.updateRelativePosition();
        if (!$gameMessage.isRTL()) this.x += Math.floor(settings.General.NameBoxWindowOffsetX*(5-(this._relativePosition ?? 0))/5);
        this.clampPlacementPosition();
        const message = this._messageWindow;
        if (message.y > this.y && message.y < this.y+this.height-settings.General.NameBoxWindowOffsetY) this.y = message.y+message.height;
        return result;
    };
    const refresh = namebox.refresh;
    namebox.refresh = function(...args) {
        this._relativePosition = 0;
        const result = refresh.apply(this, args);
        if (this._messageWindow) this.updatePlacement();
        return result;
    };
}
installMessageAutoLayout(messageApi.settings);
