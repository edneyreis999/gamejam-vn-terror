function installBattleLayout(settings) {
    const config = settings.BattleLayout;
    const scene = Scene_Battle.prototype;
    const status = Window_BattleStatus.prototype;
    function layout() {
        const read = text => text?.match(/<(?:Battle )?Layout:\s*(default|list|xp|portrait|border)>/i)?.[1]?.toLowerCase();
        return read($gameTroop._troopId ? DataManager.createTroopNote($gameTroop._troopId) : '') ?? read($dataMap?.note) ?? config.Style;
    }
    scene.battleLayoutStyle = status.battleLayoutStyle = Window_ActorCommand.prototype.battleLayoutStyle = Window_PartyCommand.prototype.battleLayoutStyle = layout;
    scene.windowAreaHeight = function() {
        const rows = this.battleLayoutStyle() === 'list' ? Math.max(config.ListMinRows,$gameParty.battleMembers().length) : 4;
        return this.calcWindowHeight(rows,true);
    };
    scene.statusWindowRect = function() {
        const style = this.battleLayoutStyle(),height=this.windowAreaHeight();
        if (style === 'border') return new Rectangle((Graphics.boxWidth-Graphics.width)/2,Graphics.boxHeight-height+(Graphics.height-Graphics.boxHeight)/2,Graphics.width,height);
        const width = ['xp','portrait'].includes(style) ? Graphics.boxWidth : Graphics.boxWidth-config.CommandWidth;
        const x = ['xp','portrait'].includes(style) || this.isRightInputMode() ? 0 : config.CommandWidth;
        return new Rectangle(x,Graphics.boxHeight-height,width,height+(style === 'list' ? 0 : 10));
    };
    scene.partyCommandWindowRect = function() {
        const style = this.battleLayoutStyle(),height=this.windowAreaHeight();
        if (style === 'border') {
            const x=(Graphics.boxWidth-Graphics.width)/2,y=this.helpAreaBottom()+(Graphics.boxHeight-Graphics.height)/2;
            return new Rectangle(x,y,Math.floor(Graphics.width/3),this.statusWindowRect().y-y);
        }
        if (['xp','portrait'].includes(style)) return new Rectangle(Graphics.boxWidth/4,Graphics.boxHeight-height*2-10,Graphics.boxWidth/2,height);
        return new Rectangle(this.isRightInputMode() ? Graphics.boxWidth-config.CommandWidth : 0,Graphics.boxHeight-height,config.CommandWidth,height);
    };
    scene.actorCommandWindowRect = scene.partyCommandWindowRect;
    const createActorCommand = scene.createActorCommandWindow;
    scene.createActorCommandWindow = function() {
        createActorCommand.call(this);
        this._actorCommandWindow.y = this.actorCommandWindowRect().y;
    };
    const setupCommand = Window_ActorCommand.prototype.setup;
    Window_ActorCommand.prototype.setup = function(actor) {
        const result = setupCommand.call(this,actor);
        if (actor && ['xp','portrait'].includes(this.battleLayoutStyle())) {
            const count = $gameParty.battleMembers().length;
            const width = Math.round(Graphics.boxWidth/Math.max(3,count));
            const height = this.fittingHeight(Math.min(config.XPActorCommandLines,Math.max(1,this.maxItems()||config.XPActorCommandLines)));
            this.move(Math.round(Graphics.boxWidth*(actor.index()+0.5)/count-width/2),Graphics.boxHeight-SceneManager._scene.windowAreaHeight()-height,width,height);
            this.createContents();
            this.refreshDimmerBitmap();
            this.refresh();
        }
        return result;
    };
    const createWindows = scene.createAllWindows;
    scene.createAllWindows = function() {
        createWindows.call(this);
        if (['xp','portrait'].includes(this.battleLayoutStyle())) {
            this._partyCommandWindow.setBackgroundType(1);
            this._actorCommandWindow.setBackgroundType(1);
        }
    };
    for (const method of ['startPartyCommandSelection','startActorCommandSelection']) {
        const previous=scene[method];
        scene[method]=function() {
            previous.call(this);
            if (this.battleLayoutStyle()==='border') this._helpWindow.show();
        };
    }
    for (const [method, operation] of [['startEnemySelection','close'],['startActorSelection','close'],['onEnemyCancel','open'],['onActorCancel','open']]) {
        const previous=scene[method];
        scene[method]=function() {
            const result=previous.call(this);
            if (['xp','portrait','border'].includes(this.battleLayoutStyle())) this._actorCommandWindow[operation]();
            return result;
        };
    }
    scene.statusWindowX = function() {
        const style = this.battleLayoutStyle();
        if (['xp','portrait','border'].includes(style)) return this.statusWindowRect().x;
        if (this.isAnyInputWindowActive()) return this.isRightInputMode() ? 0 : config.CommandWidth;
        return config.CommandWidth/2;
    };
    scene.skillWindowRect = function() {
        const style = this.battleLayoutStyle();
        if (style === 'border') {
            const rect = this.partyCommandWindowRect();
            rect.x = Graphics.boxWidth-rect.width+(Graphics.width-Graphics.boxWidth)/2;
            return rect;
        }
        const height = this.windowAreaHeight();
        if (config.SkillItemMiddleLayout) return new Rectangle(0,this.helpAreaBottom(),Graphics.boxWidth,Graphics.boxHeight-this.helpAreaBottom()-height);
        return new Rectangle(0,Graphics.boxHeight-height,Graphics.boxWidth,height);
    };
    for (const prototype of [Window_BattleSkill.prototype,Window_BattleItem.prototype]) prototype.maxCols = function() {
        return layout() === 'border' ? config.SkillItemBorderCols : config.SkillItemStandardCols;
    };
    status.updatePadding = function() { this.padding = ['list','border'].includes(this.battleLayoutStyle()) ? $gameSystem.windowPadding() : 8; };
    status.maxCols = function() {
        const style = this.battleLayoutStyle();
        return style === 'list' ? 1 : ['xp','portrait'].includes(style) ? Math.max(1,$gameParty.battleMembers().length) : 4;
    };
    status.itemHeight = function() { return this.battleLayoutStyle() === 'list' ? this.lineHeight()+8 : this.innerHeight; };
    status.rowSpacing = function() { return this.battleLayoutStyle() === 'list' ? 4 : 0; };
    status.extraHeight = function() { return ['list','border'].includes(this.battleLayoutStyle()) ? 0 : 10; };
    const initialize = status.initialize;
    status.initialize = function(rect) {
        initialize.call(this,rect);
        this.frameVisible=['list','border'].includes(this.battleLayoutStyle());
        this._cursorArea=new Sprite();
        this._cursorArea.addChild(this._cursorSprite);
        this.addChildAt(this._cursorArea,this.getChildIndex(this._clientArea));
        this._damageContainer=new Sprite();this.addChild(this._damageContainer);
        if (config.StatusWindowSkinFilename) this.windowskin = ImageManager.loadSystem(config.StatusWindowSkinFilename);
        if (config.StatusWindowSkinHide) this.opacity = 0;
        for (const [field,front] of [['StatusWindowAttachmentBack',false],['StatusWindowAttachmentFront',true]]) {
            if (!config[field]) continue;
            const sprite = new Sprite(ImageManager.loadSystem(config[field]));
            sprite.x=config[field+'OffsetX'];sprite.y=config[field+'OffsetY'];
            if (front) this.addChild(sprite); else this.addChildAt(sprite,0);
        }
    };
    const background = status.drawItemBackground;
    status.drawItemBackground = function(index) { if (!config.StatusWindowSelectableBackHide && !['xp','portrait'].includes(this.battleLayoutStyle())) background.call(this,index); };
    const updateClientArea=status._updateClientArea;
    status._updateClientArea=function() {
        updateClientArea.call(this);
        if (this._cursorArea) {
            this._cursorArea.position.copyFrom(this._clientArea.position);
            this._cursorArea.visible=this.isOpen() && this.battleLayoutStyle()!=='xp';
        }
    };
    const drawImage = status.drawItemImage;
    status.drawItemImage = function(index) {
        const style = this.battleLayoutStyle();
        if (style === 'list' || style === 'xp') return;
        if (style === 'portrait' && this.showPortraits(this.actor(index))) return;
        drawImage.call(this,index);
    };
    const placeName=status.placeActorName,placeState=status.placeStateIcon;
    status.placeActorName = function(actor,x,y) { placeName.call(this,actor,x+config.NameOffsetX,y+config.NameOffsetY); };
    status.placeStateIcon = function(actor,x,y) { placeState.call(this,actor,x+config.StateIconOffsetX,y+config.StateIconOffsetY); };
    status.placeGauge = function(actor,type,x,y) {
        const prefix = {hp:'HpGauge',mp:'MpGauge',tp:'TpGauge',time:'TpbGauge'}[type];
        Window_StatusBase.prototype.placeGauge.call(this,actor,type,x+(config[prefix+'OffsetX']||0),y+(config[prefix+'OffsetY']||0));
    };
    status.drawItemStatus = function(index) {
        const style=this.battleLayoutStyle(),actor=this.actor(index),rect=style==='list'?this.itemRect(index):this.itemRectWithPadding(index);
        if (style === 'list') {
            if (config.ShowFacesListStyle) this.drawActorFace(actor,rect.x+1,rect.y+1,ImageManager.faceWidth,rect.height-2);
            const x=config.ShowFacesListStyle ? Math.min(rect.x+ImageManager.faceWidth+8,rect.x+rect.width-4*136+4) : rect.x,y=rect.y+2;
            this.placeActorName(actor,x,y);
            const gaugeX=x+136;
            this.placeGauge(actor,'hp',gaugeX,y);
            this.placeGauge(actor,'mp',gaugeX+136,y);
            if ($dataSystem.optDisplayTp) this.placeGauge(actor,'tp',gaugeX+272,y);
            this.placeStateIcon(actor,x-20,rect.y+rect.height/2);
            this.placeTimeGauge(actor,x,y);
        } else {
            const x=rect.x+(rect.width-128)/2,y=this.nameY(rect);
            this.placeActorName(actor,x,y);
            const xp=['xp','portrait'].includes(style);
            this.placeStateIcon(actor,x+(xp ? -20 : 12),y+(xp ? 16 : -16));
            this.placeBasicGauges(actor,x,this.basicGaugesY(rect));
            this.placeTimeGauge(actor,x,y);
        }
        if (!$gameSystem.isSideView()) this.refreshFrontviewSprite(actor,index);
        if (style === 'portrait') this.refreshActorPortrait(actor,index);
    };
    status.showPortraits = function(actor) { return !!(actor.getBattlePortrait() || actor.getMenuImage?.()) && (this.battleLayoutStyle() === 'border' ? config.ShowPortraitsBorderStyle : config.ShowPortraits); };
    status.refreshActorPortrait = function(actor,index) {
        const key='battlePortrait-'+actor.actorId();
        const sprite=this.createInnerSprite(key,Sprite);
        if (!this.showPortraits(actor)) { sprite.hide(); return; }
        const filename=actor.getBattlePortraitFilename();
        sprite._battlePortraitFilename=filename;
        sprite.bitmap=ImageManager.loadPicture(filename);
        sprite.anchor.set(0.5,1);
        const scale=this.battleLayoutStyle()==='border'?config.PortraitScaleBorderStyle:config.PortraitScale;
        sprite.scale.set(scale);
        const pair=actor.actor().note.match(/<Battle Portrait Offset:\s*([+-]?\d+),\s*([+-]?\d+)>/i);
        const offsetX=Number(actor.actor().note.match(/<Battle Portrait Offset X:\s*([+-]?\d+)>/i)?.[1]??pair?.[1]??0);
        const offsetY=Number(actor.actor().note.match(/<Battle Portrait Offset Y:\s*([+-]?\d+)>/i)?.[1]??pair?.[2]??0);
        sprite.x=this.width*(index+0.5)/this.maxCols()+offsetX;sprite.y=this.height+offsetY;
        sprite.parent.removeChild(sprite);
        this.addChildAt(sprite,this.getChildIndex(this._clientArea));
        sprite.show();
    };
    const updateStatus = status.update;
    status.update = function() {
        updateStatus.call(this);
        const actors=$gameParty.battleMembers();
        if(this.battleLayoutStyle()==='xp'&&!$gameSystem.isSideView())for(const [index,actor]of actors.entries()){
            const sprite=this.frontviewSprite(actor);
            if(sprite)this.positionFrontviewSprite(sprite,index);
        }
        const portrait=this.battleLayoutStyle()==='portrait';
        if(portrait)for(const [index,actor]of actors.entries()){
            const filename=actor.getBattlePortraitFilename();
            const sprite=this._additionalSprites['battlePortrait-'+actor.actorId()];
            if(filename&&sprite?._battlePortraitFilename!==filename)this.refreshActorPortrait(actor,index);
        }
        for (const [key,sprite] of Object.entries(this._additionalSprites)) {
            if (key.startsWith('battlePortrait-')) sprite.visible = portrait && this.isOpen() && this.visible && actors.some(actor=>key==='battlePortrait-'+actor.actorId());
        }
        if (this.battleLayoutStyle() === 'border') this.updateBorderStyle();
    };
    status.isBorderStylePortraitShown = function() { return config.ShowPortraitsBorderStyle; };
    status.isBorderPortraitSpriteVisible = function() { return !!BattleManager.actor()?.getBattlePortraitFilename() && this.visible; };
    status.createBorderStylePortraitSprite = function() {
        const sprite = this._borderPortraitSprite = new Sprite();
        sprite.anchor.set(0.5,1);
        sprite.scale.set(config.PortraitScaleBorderStyle);
        sprite.opacity=0;
        const current = SceneManager._scene;
        current.addChildAt(sprite,current.getChildIndex(current._windowLayer));
    };
    status.updateBorderStyle = function() {
        if (!this.isBorderStylePortraitShown()) return;
        if (!this._borderPortraitSprite) this.createBorderStylePortraitSprite();
        const sprite=this._borderPortraitSprite,actor=BattleManager.actor();
        const visible=this.isBorderPortraitSpriteVisible();
        const filename=actor?.getBattlePortraitFilename();
        if (visible && (actor !== this._borderPortraitActor || filename !== this._borderPortraitFilename)) {
            this._borderPortraitActor=actor;
            this._borderPortraitFilename=filename;
            sprite.bitmap=ImageManager.loadPicture(filename);
            sprite.x=this.width;sprite.opacity=0;
            this._borderPortraitDuration=20;
        }
        if (visible) {
            const note=actor.actor().note,pair=note.match(/<Battle Portrait Offset:\s*([+-]?\d+),\s*([+-]?\d+)>/i);
            const x=this.width*3/4+Number(note.match(/<Battle Portrait Offset X:\s*([+-]?\d+)>/i)?.[1]??pair?.[1]??0);
            sprite.y=this.y+this.height+Number(note.match(/<Battle Portrait Offset Y:\s*([+-]?\d+)>/i)?.[1]??pair?.[2]??0);
            const duration=this._borderPortraitDuration;
            if (duration>0) {
                sprite.x+=(x-sprite.x)/duration;
                sprite.opacity+=(255-sprite.opacity)/duration;
                this._borderPortraitDuration--;
            } else { sprite.x=x;sprite.opacity=255; }
        } else {
            sprite.opacity-=255/20;
            if (sprite.opacity===0) this._borderPortraitActor=null;
        }
    };
    class Sprite_BattleStatusActor extends Sprite_Actor {
        updateVisibility() { this.visible=!!this._actor && !this._actor.isHidden(); }
        updatePosition() { updateBattleSpritePosition(this,this._homeX,this._homeY); }
    }
    Game_Actor.prototype.isSpriteVisible = function() { return true; };
    const createActors=Spriteset_Battle.prototype.createActors;
    Spriteset_Battle.prototype.createActors=function() {
        createActors.call(this);
        if ($gameSystem.isSideView()) return;
        for (let index=0;index<$gameParty.maxBattleMembers();index++) {
            const sprite=new Sprite_BattleStatusActor();
            this._actorSprites.push(sprite);this._battleField.addChild(sprite);
        }
    };
    status.refreshFrontviewSprite = function(actor,index) {
        if (this instanceof Window_BattleActor) return;
        const key='frontview-'+actor.actorId();
        const sprite=SceneManager._scene._spriteset._actorSprites[index];
        this._additionalSprites[key]=sprite;
        sprite.setBattler(actor);
        sprite.updateBitmap();
        sprite.updateFrame();
        this.positionFrontviewSprite(sprite,index);
        sprite._offsetX=0;sprite._offsetY=0;
        sprite.opacity=this.battleLayoutStyle()==='xp'?255:0;
        sprite.parent.removeChild(sprite);
        this.addChildAt(sprite,this.getChildIndex(this._clientArea));
        sprite.show();
    };
    status.positionFrontviewSprite = function(sprite,index) {
        const rect=this.itemRect(index),style=this.battleLayoutStyle();
        const height=sprite._mainSprite.height||config.XPActorDefaultHeight;
        const y=style==='xp'?{name:this.nameY(rect),top:0,center:(this.innerHeight+height)/2,bottom:this.faceRect(index).height}[config.XPSpriteYLocation]:config.XPActorDefaultHeight;
        const x=style==='list'?rect.width/2:rect.x+rect.width/2+this.padding;
        if(sprite._homeX!==x||sprite._homeY!==y)sprite.setHome(x,y);
    };
    status.frontviewSprite = function(actor) { return this._additionalSprites['frontview-'+actor.actorId()]; };
    const createAnimation = Spriteset_Battle.prototype.createAnimationSprite;
    Spriteset_Battle.prototype.createAnimationSprite = function(targets,animation,...args) {
        createAnimation.call(this,targets,animation,...args);
        const onTop=settings.Actor[['FvAniEachTarget','FvAniCenterAll','FvAniCenterScreen'][animation.displayType]];
        if ($gameSystem.isSideView() || this.isMVAnimation(animation) || !onTop || !targets.some(target=>target.isActor())) return;
        const window=SceneManager._scene._statusWindow;
        if (!window._effectsContainer) { window._effectsContainer=new Sprite();window.addChild(window._effectsContainer); }
        window._effectsContainer.addChild(this._animationSprites[this._animationSprites.length - 1]);
    };
}
