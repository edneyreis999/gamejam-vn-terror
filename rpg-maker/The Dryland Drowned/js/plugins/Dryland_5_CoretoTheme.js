/*:
 * @target MZ
 * @plugindesc [Dryland] [Tier 5] Coreto — Fantasia com respiro (Figma UI).
 * @author Coreto
 * @base Coreto_1_MessageCore
 * @orderAfter Coreto_0_CoreEngine
 * @orderAfter Coreto_1_MessageCore
 * @orderAfter Coreto_1_OptionsCore
 * @orderAfter Coreto_1_SaveCore
 * @orderAfter Coreto_2_ExtMessageFunc
 * @orderAfter Coreto_2_PictureChoices
 * @orderAfter Coreto_4_EventTitleScene
 * @orderAfter Coreto_4_MessageVisibility
 * @orderAfter Dryland_Presentation
 * @orderAfter Dryland_2_ConversationIndicators
 * @param Enabled
 * @text Ativar aparência Coreto
 * @type boolean
 * @default true
 * @param DialogueFontSize
 * @text Tamanho do texto de diálogo
 * @type number
 * @min 16
 * @max 36
 * @default 20
 * @param ChoiceFontSize
 * @text Tamanho do texto de escolhas
 * @type number
 * @min 16
 * @max 32
 * @default 18
 * @param MessageMargin
 * @text Margem lateral do diálogo
 * @type number
 * @min 0
 * @max 80
 * @default 28
 * @help
 * Carregar depois de todos os Coreto e dos especialistas Dryland.
 * MZ 1.10.0. Sem dependências web ou alterações nos bundles Coreto.
 * Fonte visual: Figma mST7JediMzHTA4IkE2skw8, componentes 89:71.
 *
 * Instalar junto com fonts/Outfit.ttf, fonts/AveriaLibre-Regular.ttf,
 * fonts/CinzelDecorative-Regular.ttf e img/system/CoretoTheme_*.png.
 * Inclua estes arquivos na distribuição, mesmo com poda de recursos.
 *
 * Personaliza janelas nativas, escolhas textuais, título por eventos,
 * console de leitura, botões Dryland_Button e entrada nativa de nome.
 * Preserva eventos, idiomas, callbacks, saves, HIDE e escolhas por imagens.
 * Cenários, retratos, pergaminho dos créditos e posições continuam autorados
 * nos eventos. Não cria um novo formulário nem uma nova regra de campanha.
 *
 * API visual para futuras telas (não grava dados):
 * DrylandCoretoTheme.drawField(bitmap, {x,y,width,label,value,helper,state})
 * state: default | focused | error | disabled. Retorna a altura desenhada.
 * DrylandCoretoTheme.drawButton(bitmap, rect, label, state, kind)
 * state: default | hover | selected | selectedHover | pressed | disabled.
 * kind: menu | primary | text.
 * Os textos devem vir de Languages.tsv. O chamador controla input/validação.
 * Desative este plugin e reinicie o playtest para restaurar a aparência.
 */
(() => {
  'use strict';
  const plugin = 'Dryland_5_CoretoTheme';
  const params = PluginManager.parameters(plugin);
  if (params.Enabled === 'false') return;
  const number = (key, fallback, min, max) => {
    const value = Number(params[key] || fallback);
    return Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : fallback;
  };
  // Semantic tokens copied from the editable Figma component library.
  const colors = Object.freeze({
    canvas:'#f8e9cc', panel:'#f9eacf', disabled:'#d3c7b4', text:'#360a0b',
    muted:'#360a0b', heading:'#360a0b', onAccent:'#fff8eb', border:'#704737',
    subtle:'#be9a6b', primary:'#552070', pressed:'#4d1d6b', purple:'#6d1b8b',
    focus:'#8224ad', gold:'#edaa2f', error:'#af2933',
    hover:'#eedff2', accentHover:'#6d3185', card:'#f0dfc0'
  });
  const fonts = Object.freeze({body:'CoretoOutfit', speaker:'CoretoAveria', title:'CoretoCinzel'});
  const dialogueSize = number('DialogueFontSize',20,16,36);
  const choiceSize = number('ChoiceFontSize',18,16,32);
  const margin = number('MessageMargin',28,0,80);
  const icons = {};
  const wrap = (prototype, method, decorate) => {
    const previous = prototype[method];
    if (typeof previous !== 'function') return;
    prototype[method] = function(...args) { return decorate.call(this, previous, args); };
  };
  const isTitle = w => w instanceof Window_TitleCommand ||
    (w instanceof Window_ChoiceList && SceneManager.isSceneTitleMap && SceneManager.isSceneTitleMap());
  const isConsole = w => typeof Window_ButtonConsole !== 'undefined' && w instanceof Window_ButtonConsole;
  function themed(w) {
    return w instanceof Window_Base && !(w instanceof Window_ScrollText) &&
      !(w instanceof Window_MapName) && (w.constructor.name !== 'Window_ButtonAssist'||menuScene()) &&
      !w._coretoPictureText;
  }
  function menuScene(){return SceneManager._scene instanceof Scene_MenuBase;}
  const list = w => themed(w) && w instanceof Window_Selectable &&
    !(w instanceof Window_NameEdit) && !(w instanceof Window_NumberInput) && !isConsole(w);
  function path(ctx,x,y,width,height,radius) {
    const r = Math.min(radius,width/2,height/2);
    ctx.beginPath(); ctx.moveTo(x+r,y); ctx.lineTo(x+width-r,y);
    ctx.quadraticCurveTo(x+width,y,x+width,y+r); ctx.lineTo(x+width,y+height-r);
    ctx.quadraticCurveTo(x+width,y+height,x+width-r,y+height); ctx.lineTo(x+r,y+height);
    ctx.quadraticCurveTo(x,y+height,x,y+height-r); ctx.lineTo(x,y+r);
    ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath();
  }
  function box(bitmap,x,y,width,height,fill,stroke,radius=6,line=1) {
    if (width<=line || height<=line) return;
    const ctx=bitmap.context;
    ctx.save(); path(ctx,x+line/2,y+line/2,width-line,height-line,radius);
    if(fill){ctx.fillStyle=fill;ctx.fill();}
    if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=line;ctx.stroke();}
    ctx.restore(); bitmap.baseTexture.update();
  }
  function blit(bitmap,name,x,y,width,height) {
    const source=icons[name];
    if(source && source.isReady()) bitmap.blt(source,0,0,source.width,source.height,x,y,width,height);
  }
  function textStyle(bitmap,face,size,color) {
    bitmap.fontFace=face;bitmap.fontSize=size;bitmap.fontBold=false;
    bitmap.fontItalic=false;bitmap.outlineWidth=0;bitmap.outlineColor='rgba(0,0,0,0)';bitmap.textColor=color;
  }
  // Pointer feedback is presentation only. Native plugins own selection/clicks.
  let pointerUsed=false;
  wrap(TouchInput,'_onMouseMove',function(previous,args){pointerUsed=true;return previous.apply(this,args);});
  function pointerOver(sprite){
    if(!pointerUsed||!sprite.worldVisible||!sprite.worldAlpha)return false;
    const point=sprite.worldTransform.applyInverse(new Point(TouchInput.x,TouchInput.y));
    return point.x>=-sprite.anchor.x*sprite.width&&point.x<(1-sprite.anchor.x)*sprite.width&&
      point.y>=-sprite.anchor.y*sprite.height&&point.y<(1-sprite.anchor.y)*sprite.height;
  }
  function buttonSurface(bitmap,rect,state,selected=false,primary=false){
    const dark=state==='pressed'||selected||primary;
    const fill=state==='disabled'?colors.disabled:state==='pressed'?colors.pressed:
      state==='hover'?(dark?colors.accentHover:colors.hover):dark?colors.primary:colors.panel;
    box(bitmap,rect.x,rect.y,rect.width,rect.height,fill,
      selected?colors.gold:state==='hover'?colors.focus:colors.border,6,selected||state==='hover'?2:1);
  }
  function staticSurface(bitmap,rect){
    box(bitmap,rect.x,rect.y,rect.width,rect.height,colors.card,null,0);
    bitmap.fillRect(rect.x+12,rect.y+12,4,Math.max(4,rect.height-24),colors.subtle);
  }
  function drawButton(bitmap,rect,label,state='default',kind='menu') {
    const disabled=state==='disabled', active=state==='selected'||state==='selectedHover'||state==='pressed';
    const fill=disabled?colors.disabled:state==='pressed'?colors.pressed:
      state==='selectedHover'?colors.accentHover:state==='hover'?(kind==='primary'?colors.accentHover:colors.hover):
      active||kind==='primary'?colors.primary:kind==='text'?null:colors.panel;
    box(bitmap,rect.x,rect.y,rect.width,rect.height,fill,kind==='text'?null:
      state==='selected'||state==='selectedHover'?colors.gold:state==='hover'?colors.focus:colors.border,6,['hover','selected','selectedHover'].includes(state)?2:1);
    const marker=kind==='menu';
    if(marker&&active)blit(bitmap,'diamond',rect.x+12,rect.y+(rect.height-24)/2,24,24);
    textStyle(bitmap,fonts.body,kind==='menu'?22:20,disabled?colors.muted:
      active||kind==='primary'?colors.onAccent:kind==='text'?colors.heading:colors.text);
    bitmap.drawText(label,rect.x+(marker?48:12),rect.y,rect.width-(marker?60:24),rect.height,marker?'left':'center');
  }
  function drawField(bitmap,options) {
    const {x=0,y=0,width=480,label='',value='',helper='',state='default'}=options;
    textStyle(bitmap,fonts.body,16,colors.text);bitmap.drawText(label,x,y,width,20);
    box(bitmap,x,y+24,width,40,state==='disabled'?colors.disabled:colors.panel,
      state==='focused'?colors.focus:state==='error'?colors.error:colors.border,6,state==='focused'?2:1);
    textStyle(bitmap,fonts.body,18,state==='disabled'?colors.muted:colors.text);
    bitmap.drawText(value,x+18,y+32,width-36,24);
    if(helper){
      const error=state==='error';
      if(error){
        blit(bitmap,'error',x,y+68,24,24);
        textStyle(bitmap,fonts.body,16,colors.onAccent);bitmap.drawText('!',x+9,y+70,8,20);
      }
      textStyle(bitmap,fonts.body,14,colors.text);
      bitmap.drawText(helper,x+(error?32:0),y+68,width-(error?32:0),24);
    }
    return helper?92:64;
  }
  const menuIcons={},tintedIcons=new Map();
  function menuIcon(bitmap,name,x,y,size=32,color=colors.text){
    const source=menuIcons[name];if(!source||!source.isReady())return;
    const key=name+color;let tinted=tintedIcons.get(key);
    if(!tinted){
      tinted=new Bitmap(32,32);tinted.blt(source,0,0,32,32,0,0);
      const ctx=tinted.context;ctx.save();ctx.globalCompositeOperation='source-in';
      ctx.fillStyle=color;ctx.fillRect(0,0,32,32);ctx.restore();tinted.baseTexture.update();
      tintedIcons.set(key,tinted);
    }
    bitmap.blt(tinted,0,0,32,32,x,y,size,size);
  }
  const optionIcons={textLocale:'Language',textEffects:'TextEffects',bgmVolume:'Music',bgsVolume:'Ambience',meVolume:'Jingle',seVolume:'SoundEffects'};
  // Called by the existing OptionsCore DrawJS configuration. Input callbacks,
  // values, localization and persistence remain owned by OptionsCore.
  function drawOption(symbol,index){
    const r=this.itemRect(index),b=this.contents,selected=index===this.index();
    const foreground=selected?colors.onAccent:colors.text;
    b.paintOpacity=255;textStyle(b,fonts.body,22,foreground);
    menuIcon(b,optionIcons[symbol],r.x+16,r.y+(r.height-32)/2,32,foreground);
    const label=this.commandName(index).replace(/^\\I\[\d+\]/,'');
    this.drawTextEx(label,r.x+64,r.y+(r.height-this.lineHeight())/2,r.width*.43-64);
    const x=r.x+r.width*.52,w=r.width*.48-20,y=r.y+(r.height-40)/2;
    const chip=(text,offset,width,current)=>{
      box(b,offset,y,width,40,current?(selected?colors.panel:colors.primary):null,
        selected?colors.onAccent:colors.border,6,1);
      textStyle(b,fonts.body,20,current?(selected?colors.text:colors.onAccent):foreground);
      b.drawText(text,offset+8,y,width-16,40,'center');
    };
    if(symbol==='textLocale'){
      const languages=VisuMZ.MessageCore.Settings.Localization.Languages;
      const gap=12,cw=(w-gap*(languages.length-1))/languages.length;
      languages.forEach((language,i)=>chip(TextManager.getLanguageName(language),x+i*(cw+gap),cw,language===ConfigManager.textLocale));
    }else if(symbol==='textEffects'){
      const value=this.getConfigValue(symbol),cw=(w-12)/2;
      chip(this.booleanStatusText(false),x,cw,!value);chip(this.booleanStatusText(true),x+cw+12,cw,value);
    }else{
      const value=this.getConfigValue(symbol),trackWidth=w-96,trackY=y+16;
      box(b,x,trackY,trackWidth,8,selected?colors.pressed:colors.disabled,selected?colors.panel:colors.border,4);
      const fill=Math.max(0,Math.min(1,value/100))*trackWidth;
      if(fill>0)box(b,x,trackY,fill,8,selected?colors.gold:colors.primary,null,4);
      box(b,x+Math.max(0,Math.min(trackWidth-10,fill-5)),trackY-5,10,18,selected?colors.gold:colors.primary,selected?colors.primary:colors.panel,4);
      textStyle(b,fonts.body,22,foreground);b.drawText(value+'%',x+trackWidth+16,y,80,40,'right');
    }
    b.paintOpacity=255;
  }
  function saveInk(w,id){return w.isEnabled(id)&&w.index()===w.savefileIdToIndex(id)?colors.onAccent:colors.text;}
  function drawSaveFile(id,r){
    const b=this.contents,foreground=saveInk(this,id);b.paintOpacity=255;
    textStyle(b,fonts.speaker,24,foreground);menuIcon(b,'Save',r.x+16,r.y+16,32,foreground);
    const label=id===0?TextManager.autosave:TextManager.file+' '+id;
    b.drawText(label,r.x+60,r.y+12,r.width-156,40,'left');
    if(id>0&&id===DataManager.latestSavefileId()){
      const latest=TextManager.parseLocalizedText(TextManager.latestSave);
      box(b,r.x+r.width-88,r.y+18,72,28,colors.panel,colors.border,6);
      textStyle(b,fonts.body,16,colors.text);b.drawText(latest,r.x+r.width-84,r.y+18,64,28,'center');
    }
    if(!DataManager.savefileInfo(id)){
      // Empty slots retain the same native availability and click targets.
      menuIcon(b,'Save',r.x+(r.width-32)/2,r.y+(r.height-32)/2+12,32,foreground);
    }
  }
  function drawSaveContents(info,r){
    const b=this.contents,foreground=saveInk(this,info.savefileId);b.paintOpacity=255;
    const x=r.x+20,width=r.width-40;
    // Keep authored save artwork in its own region, clear of all metadata.
    const previewHeight=Math.max(0,r.height-158);
    const hasActors=info.faces?.length||info.characters?.length||info.svbattlers?.length;
    const artWidth=info.description?Math.min(96,width*.35):width;
    if(info.picture)this.drawCenteredPicture(info.picture,x,r.y+60,artWidth,previewHeight,true);
    if(hasActors)this.drawActors(info,x,r.y+60,artWidth,previewHeight);
    textStyle(b,fonts.body,18,foreground);
    const time=info.timestamp?new Date(info.timestamp).toLocaleString(ConfigManager.textLocale==='Portuguese'?'pt-BR':'en-US',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'}):'';
    b.drawText(time,x,r.y+r.height-91,width,28,'left');
    menuIcon(b,'Clock',x,r.y+r.height-57,24,foreground);
    b.drawText(info.playtime||'',x+36,r.y+r.height-60,width-36,32,'left');
    if(info.description){
      textStyle(b,fonts.body,18,foreground);
      // Keep the native escape/localization pipeline for authored descriptions.
      const dx=info.picture||hasActors?artWidth+12:0,wrapBefore=this._wordWrap;
      const ctx=b.context;ctx.save();ctx.beginPath();ctx.rect(x+dx,r.y+60,width-dx,previewHeight);ctx.clip();
      this.setWordWrap(true);
      try{this.drawTextEx(info.description,x+dx,r.y+60,width-dx);}
      finally{this.setWordWrap(wrapBefore);ctx.restore();}
    }
  }
  globalThis.DrylandCoretoTheme=Object.freeze({colors,fonts,drawButton,drawField,drawOption,drawSaveContents,drawSaveFile});
  wrap(Scene_Boot.prototype,'loadGameFonts',function(previous,args){
    const result=previous.apply(this,args);
    FontManager.load(fonts.body,'Outfit.ttf');FontManager.load(fonts.speaker,'AveriaLibre-Regular.ttf');
    FontManager.load(fonts.title,'CinzelDecorative-Regular.ttf');
    icons.diamond=ImageManager.loadSystem('CoretoTheme_diamond');
    icons.continue=ImageManager.loadSystem('CoretoTheme_continue');
    icons.error=ImageManager.loadSystem('CoretoTheme_error');
    Object.assign(menuIcons,{
      Settings:ImageManager.loadSystem('CoretoTheme_Settings'),Audio:ImageManager.loadSystem('CoretoTheme_Audio'),
      Language:ImageManager.loadSystem('CoretoTheme_Language'),TextEffects:ImageManager.loadSystem('CoretoTheme_TextEffects'),
      Music:ImageManager.loadSystem('CoretoTheme_Music'),Ambience:ImageManager.loadSystem('CoretoTheme_Ambience'),
      Jingle:ImageManager.loadSystem('CoretoTheme_Jingle'),SoundEffects:ImageManager.loadSystem('CoretoTheme_SoundEffects'),
      Back:ImageManager.loadSystem('CoretoTheme_Back'),Save:ImageManager.loadSystem('CoretoTheme_Save'),Clock:ImageManager.loadSystem('CoretoTheme_Clock'),
      Conversation:ImageManager.loadSystem('CoretoTheme_Conversation')
    });
    return result;
  });

  // Keep native window lifecycle, clipping, openness and visibility ownership.
  // Only replace the generated frame/back textures, never the Window subsystem.
  function surface(w,kind) {
    const key='_coreto'+kind;
    const width=Math.max(1,Math.ceil(w.width)),height=Math.max(1,Math.ceil(w.height));
    let bitmap=w[key];
    if(!bitmap||bitmap.width!==width||bitmap.height!==height){
      if(bitmap)bitmap.destroy();
      bitmap=w[key]=new Bitmap(width,height);
    }else bitmap.clear();
    return bitmap;
  }
  for(const [method,kind] of [['_refreshBack','Back'],['_refreshFrame','Frame']]){
    wrap(Window.prototype,method,function(previous,args){
      if(!themed(this))return previous.apply(this,args);
      const sprite=kind==='Back'?this._backSprite:this._frameSprite;
      const bitmap=surface(this,kind);
      const invisible=this instanceof Window_NameBox||isTitle(this);
      const staticCard=this instanceof Window_Help;
      if(!invisible&&staticCard){if(kind==='Back')staticSurface(bitmap,{x:0,y:0,width:this.width,height:this.height});}
      else if(!invisible&&isConsole(this)){
        if(kind==='Back')buttonSurface(bitmap,{x:0,y:0,width:this.width,height:this.height},this._coretoConsoleState||'default',this._coretoConsoleToggled);
      }
      else if(!invisible)box(bitmap,0,0,this.width,this.height,kind==='Back'?colors.panel:null,
        kind==='Frame'?colors.border:null,10);
      if(!invisible&&kind==='Frame'&&this instanceof Window_Message)
        box(bitmap,3,3,this.width-6,this.height-6,null,colors.subtle,6);
      sprite.bitmap=bitmap;sprite.setFrame(0,0,this.width,this.height);
      sprite.move(0,0);sprite.scale.set(1,1);sprite.setColorTone([0,0,0,0]);
      // Replace the native skin at the source, including its nine-slice parts.
      for(const child of sprite.children){child.bitmap=null;child.visible=false;}
    });
  }
  wrap(Window_Base.prototype,'destroy',function(previous,args){
    const own=[this._coretoBack,this._coretoFrame];
    const result=previous.apply(this,args);
    for(const bitmap of own)if(bitmap)bitmap.destroy();
    return result;
  });
  wrap(Window_Base.prototype,'updateBackOpacity',function(previous,args){
    const result=previous.apply(this,args);if(themed(this))this.backOpacity=255;return result;
  });
  wrap(Window_Base.prototype,'updateTone',function(previous,args){
    if(themed(this))return this.setTone(0,0,0);return previous.apply(this,args);
  });
  function darkTextSurface(w){
    if(w instanceof Window_Message)return $gameMessage.background()!==0;
    if(w instanceof Window_NameBox)return !!w._messageWindow&&darkTextSurface(w._messageWindow);
    if(w instanceof Window_ScrollText)return !globalThis.$dataMap||!/<drylandCreditsScroll>/.test($dataMap.note);
    return false;
  }
  function textContrast(w){
    if(!w.contents)return;
    w.contents.outlineWidth=darkTextSurface(w)?2:0;
    w.contents.outlineColor=darkTextSurface(w)?colors.heading:'rgba(0,0,0,0)';
  }
  function ink(w) {
    if(darkTextSurface(w))return colors.onAccent;
    if(w._coretoConsoleState==='pressed'||w._coretoConsoleToggled)return colors.onAccent;
    const index=w._coretoDrawingIndex;
    if(index!==undefined){
      if(w.isCommandEnabled&&!w.isCommandEnabled(index))return colors.muted;
      if(index===w.index())return colors.onAccent;
    }
    return colors.text;
  }
  wrap(Window_Base.prototype,'resetTextColor',function(previous,args){
    const result=previous.apply(this,args);
    if((themed(this)||this instanceof Window_ScrollText)&&this.contents){this.contents.textColor=ink(this);textContrast(this);}
    return result;
  });
  wrap(Window_Base.prototype,'changeTextColor',function(previous,args){
    if(themed(this))args[0]=ink(this);
    if(this instanceof Window_ScrollText)args[0]=ink(this);
    return previous.apply(this,args);
  });
  wrap(Window_Base.prototype,'changePaintOpacity',function(previous,args){
    if(themed(this))args[0]=true;
    return previous.apply(this,args);
  });
  wrap(Window_Help.prototype,'drawTextEx',function(previous,args){
    args[1]=(args[1]||0)+16;if(args[3])args[3]-=16;
    return previous.apply(this,args);
  });
  wrap(Window_Base.prototype,'resetFontSettings',function(previous,args){
    const result=previous.apply(this,args);
    if(this._coretoPictureText){
      this.contents.fontFace=fonts.body;this.contents.outlineWidth=0;this.contents.outlineColor='rgba(0,0,0,0)';
      return result;
    }
    if(this instanceof Window_ScrollText){textStyle(this.contents,fonts.body,this.contents.fontSize,ink(this));textContrast(this);return result;}
    if(!themed(this))return result;
    let size=22,face=fonts.body;
    if(this instanceof Window_Message)size=dialogueSize;
    else if(this instanceof Window_ChoiceList)size=isTitle(this)?22:choiceSize;
    else if(this instanceof Window_NameBox){size=24;face=fonts.speaker;}
    else if(this instanceof Window_NameEdit)size=18;
    textStyle(this.contents,face,size,ink(this));textContrast(this);return result;
  });
  wrap(Window_Base.prototype,'convertFontSettingsEscapeCharacters',function(previous,args){
    if(themed(this)||this._coretoPictureText||this instanceof Window_ScrollText){
      // Coreto has already normalized commands to ESC; keep that marker so
      // its action parser consumes FontChange instead of drawing it as text.
      args[0]=String(args[0]).replace(/(\x1bFontChange)<(Alegreya|Cinzel)>/gi,(_,command,font)=>
        command+'<'+(font.toLowerCase()==='cinzel'?fonts.title:fonts.body)+'>');
    }
    return previous.apply(this,args);
  });
  wrap(Window_Base.prototype,'calcTextHeight',function(previous,args){
    const height=previous.apply(this,args);
    if(this instanceof Window_Message)return Math.max(height,this.contents.fontSize+6);
    return height;
  });

  // Draw native item states while leaving command lists and handlers intact.
  wrap(Window_Selectable.prototype,'drawItemBackground',function(previous,args){
    if(!list(this))return previous.apply(this,args);
    const index=args[0],rect=this.itemRect(index);
    const enabled=this instanceof Window_SavefileList?this.isEnabled(this.indexToSavefileId(index)):!this.isCommandEnabled||this.isCommandEnabled(index);
    const selected=index===this.index(),hover=enabled&&index===this._coretoHoverIndex;
    const pressed=enabled&&this.active&&((selected&&Input.isPressed('ok'))||(hover&&this._coretoPointerPressed));
    const title=isTitle(this);
    const fill=!enabled?colors.disabled:pressed?colors.pressed:hover?(selected?colors.accentHover:colors.hover):selected?colors.primary:colors.panel;
    box(this.contentsBack,rect.x,rect.y,rect.width,rect.height,fill,
      selected?colors.gold:hover?colors.focus:colors.border,6,(selected&&this.active)||hover?2:1);
    if(selected&&enabled&&(this instanceof Window_ChoiceList||this instanceof Window_TitleCommand)){
      const size=title?24:16;
      blit(this.contentsBack,'diamond',rect.x+8,rect.y+(rect.height-size)/2,size,size);
    }
  });
  const prototypes=[Window_Command.prototype,Window_ChoiceList.prototype,Window_Options.prototype,Window_SavefileList.prototype];
  // Specialised options classes can override drawItem; bind the theme after boot
  // without replacing their native status/control rendering.
  function decorateItem(prototype){
    wrap(prototype,'drawItem',function(previous,args){
      if(!list(this))return previous.apply(this,args);
      const before=this._coretoDrawingIndex;this._coretoDrawingIndex=args[0];
      try{return previous.apply(this,args);}finally{this._coretoDrawingIndex=before;}
    });
  }
  prototypes.forEach(decorateItem);
  if(typeof Window_OptionsCategory!=='undefined')decorateItem(Window_OptionsCategory.prototype);
  // Options categories keep Coreto's labels, layout logic and input handlers.
  wrap(Window_Base.prototype,'drawIcon',function(previous,args){
    if(this.constructor.name==='Window_OptionsCategory'){
      const name=args[0]===245?'Settings':args[0]===80?'Audio':null;
      if(name){menuIcon(this.contents,name,args[1],args[2],32,ink(this));return;}
    }
    return previous.apply(this,args);
  });
  wrap(Window_Options.prototype,'itemHeight',function(previous,args){return Math.max(76,previous.apply(this,args));});
  wrap(Window_Options.prototype,'rowSpacing',function(previous,args){return Math.max(12,previous.apply(this,args));});
  wrap(Window_SavefileList.prototype,'rowSpacing',function(previous,args){return Math.max(16,previous.apply(this,args));});
  wrap(Window_SavefileList.prototype,'colSpacing',function(previous,args){return Math.max(16,previous.apply(this,args));});
  // SaveCore draws loaded data asynchronously; derive the drawing index again
  // so a bitmap load never inherits a different row's selected text color.
  wrap(Window_SavefileList.prototype,'drawContentsLoaded',function(previous,args){
    const before=this._coretoDrawingIndex;this._coretoDrawingIndex=this.savefileIdToIndex(args[0].savefileId);
    try{return previous.apply(this,args);}finally{this._coretoDrawingIndex=before;}
  });
  wrap(Scene_Options.prototype,'categoryWindowRect',function(previous,args){
    const r=previous.apply(this,args);r.x=28;r.y+=16;r.width=Graphics.boxWidth-56;r.height=76;return r;
  });
  wrap(Scene_Options.prototype,'optionsWindowRect',function(previous,args){
    const r=previous.apply(this,args);r.x=28;r.y+=12;r.width=Graphics.boxWidth-56;
    r.height=Math.max(160,this.mainAreaTop()+this.mainAreaHeight()-r.y-20);return r;
  });
  // CoreEngine authors these methods on each concrete scene, not Scene_File.
  for(const prototype of [Scene_Save.prototype,Scene_Load.prototype]){
    wrap(prototype,'helpWindowRect',function(previous,args){
      const r=previous.apply(this,args);r.x=28;r.y+=16;r.width=Graphics.boxWidth-56;return r;
    });
    wrap(prototype,'listWindowRect',function(previous,args){
      const r=previous.apply(this,args);r.x=28;r.y=this._helpWindow.y+this._helpWindow.height+12;r.width=Graphics.boxWidth-56;
      r.height=Math.max(160,this.mainAreaTop()+this.mainAreaHeight()-r.y-20);return r;
    });
  }
  // Existing button-assist still resolves the device's actual key labels.
  // Draw each current pair as a legible key cap instead of the old font/skin.
  if(typeof Window_ButtonAssist!=='undefined'){
    wrap(Window_ButtonAssist.prototype,'refresh',function(previous,args){
      const result=previous.apply(this,args);if(!menuScene())return result;
      const b=this.contents,scene=SceneManager._scene,pairs=[];
      b.clear();b.paintOpacity=255;
      for(let i=1;i<=5;i++){
        const key=scene['buttonAssistKey'+i]?.(),label=scene['buttonAssistText'+i]?.();
        if(key&&label)pairs.push([key,label]);
      }
      const width=this.innerWidth/Math.max(1,pairs.length);
      pairs.forEach(([key,label],i)=>{
        const x=i*width+12,y=Math.max(0,(this.innerHeight-30)/2);
        const cleanKey=key.replace(/\\[{}]/g,'');
        textStyle(b,fonts.body,16,colors.text);
        const kw=Math.min(90,b.measureTextWidth(cleanKey)+20);
        box(b,x,y,kw,30,colors.panel,colors.border,6);
        b.drawText(cleanKey,x+6,y,kw-12,30,'center');
        const text=TextManager.parseLocalizedText(label);textStyle(b,fonts.body,16,colors.text);
        b.drawText(text,x+kw+10,y,width-kw-30,30,'left');
      });return result;
    });
  }
  wrap(Sprite_Button.prototype,'loadButtonImage',function(previous,args){
    if(this._buttonType!=='cancel')return previous.apply(this,args);
    if(this._buttonType==='cancel'){
      {
        // Keep the native 11-cell ButtonSet contract and its 96x48 hit area.
        // Each sprite owns its texture: scene teardown destroys its bitmap.
        const menuButtonSet=new Bitmap(528,144);
        const draw=()=>{for(const [i,state] of ['default','pressed','hover'].entries()){
          const y=i*48;buttonSurface(menuButtonSet,{x:1,y:y+1,width:94,height:46},state);
          menuIcon(menuButtonSet,'Back',32,y+8,32,state==='pressed'?colors.onAccent:colors.text);
        }};
        menuIcons.Back.addLoadListener(draw);
        this.bitmap=menuButtonSet;
      }
      this._coretoMenuButton=true;
    }
  });
  wrap(Sprite_Button.prototype,'updateOpacity',function(previous,args){
    const result=previous.apply(this,args);if(this._coretoMenuButton)this.opacity=255;return result;
  });
  wrap(Sprite_Button.prototype,'updateFrame',function(previous,args){
    const result=previous.apply(this,args);
    if(this._coretoMenuButton&&!this.isPressed()&&pointerOver(this))this.setFrame(0,96,96,48);
    return result;
  });
  wrap(Window.prototype,'_refreshArrows',function(previous,args){
    const result=previous.apply(this,args);
    if(menuScene()&&icons.continue)for(const [sprite,rotation] of [[this._downArrowSprite,0],[this._upArrowSprite,Math.PI]]){
      sprite.bitmap=icons.continue;sprite.setFrame(0,0,16,10);sprite.rotation=rotation;
    }return result;
  });
  wrap(Window_Selectable.prototype,'select',function(previous,args){
    const old=this.index();const result=previous.apply(this,args);
    if(list(this)&&this.contents&&this.contentsBack&&old!==this.index()){
      for(const index of [old,this.index()])if(index>=0&&index<this.maxItems())this.redrawItem(index);
    }
    return result;
  });
  wrap(Window_Selectable.prototype,'update',function(previous,args){
    const result=previous.apply(this,args);
    if(list(this)&&this.contents){
      const oldHover=this._coretoHoverIndex;
      this._coretoHoverIndex=pointerUsed&&this.active&&this.visible&&this.isOpen()&&this.isTouchedInsideFrame()?this.hitIndex():-1;
      this._coretoPointerPressed=this.active&&TouchInput.isPressed()&&this._coretoHoverIndex>=0;
      const signature=[this.active,Input.isPressed('ok'),this._coretoPointerPressed,this._coretoHoverIndex].join('|');
      if(this._coretoState!==signature){
        this._coretoState=signature;
        for(const i of new Set([oldHover,this._coretoHoverIndex,this.index()]))if(i>=0&&i<this.maxItems())this.redrawItem(i);
      }
    }
    return result;
  });
  wrap(Window.prototype,'_updateCursor',function(previous,args){
    const result=previous.apply(this,args);if(list(this))this._cursorSprite.visible=false;return result;
  });
  wrap(Window_ChoiceList.prototype,'itemRectWithPadding',function(previous,args){
    const rect=previous.apply(this,args);const gap=isTitle(this)?36:24;
    rect.x+=gap;rect.width=Math.max(1,rect.width-gap);return rect;
  });
  wrap(Window_ChoiceList.prototype,'maxChoiceWidth',function(previous,args){
    const available=(Graphics.boxWidth-this.padding*2)/Math.max(1,this.maxCols())-this.colSpacing();
    return Math.min(previous.apply(this,args)+(isTitle(this)?36:24),Math.min(620,available));
  });
  wrap(Window_ChoiceList.prototype,'commandName',function(previous,args){
    const source=previous.apply(this,args);
    if(isTitle(this)||this._pictureChoicesHidden||!source||!this.contents)return source;
    const badge=$gameMessage._drylandSocialChoices?this.textWidth(TextManager.getLocalizedText('ui.social.new'))+this.itemPadding()*3:0;
    const width=Math.max(80,this.maxChoiceWidth()-this.itemPadding()*2-24-badge);
    const key=[source,width,ConfigManager.textLocale,choiceSize].join('|');
    this._coretoWrappedLabels=this._coretoWrappedLabels||new Map();
    if(this._coretoWrappedLabels.has(key))return this._coretoWrappedLabels.get(key);
    const lines=[];
    for(const paragraph of source.split(/\n|<BR>|<LINEBREAK>/i)){
      // Keep escape strings and tags intact, including tags containing spaces.
      const words=paragraph.match(/(?:\\\w+(?:<[^>]*>|\[[^\]]*\])?|<[^>]*>|[^\s<])+/g)||[];
      let line='';
      for(const word of words){
        const candidate=line?line+' '+word:word;
        if(line&&this.textSizeEx(candidate).width>width){lines.push(line);line=word;}
        else line=candidate;
      }
      lines.push(line);
    }
    const text=lines.join('\n');
    if(this._coretoWrappedLabels.size>100)this._coretoWrappedLabels.clear();
    this._coretoWrappedLabels.set(key,text);return text;
  });
  wrap(Window_ChoiceList.prototype,'itemHeight',function(previous,args){
    const native=previous.apply(this,args);
    // Explicit line breaks remain authored by Coreto; all rows use the tallest
    // measured label so native scrolling and pointer hit-testing stay aligned.
    let height=isTitle(this)?52:40;
    if(this.contents&&this._list)for(let i=0;i<this._list.length;i++)height=Math.max(height,this.textSizeEx(this.commandName(i)).height+16);
    return Math.max(native,height);
  });
  wrap(Window_ChoiceList.prototype,'rowSpacing',function(previous,args){return isTitle(this)?8:previous.apply(this,args);});
  wrap(Window_ChoiceList.prototype,'choiceAlignText',function(previous,args){return isTitle(this)?'<LEFT>':previous.apply(this,args);});

  // Speaker uses the existing NameBox inside the paper panel. Coreto still
  // controls parsing, HIDE, page breaks, faces and reading completion.
  wrap(Window_Message.prototype,'lineHeight',function(previous,args){return Math.max(26,dialogueSize+6);});
  wrap(Window_Message.prototype,'updateDimensions',function(previous,args){
    const result=previous.apply(this,args);
    if(this._forcedPosition||this._messageAutoSize)return result;
    const width=Math.max(240,Math.min(this.width,Graphics.boxWidth-margin*2));
    const height=Math.min(Graphics.boxHeight,this.height+($gameMessage.speakerName()?32:0));
    if(width!==this.width||height!==this.height){this.width=width;this.height=height;if(this.contents)this.createContents();}
    if(this.alignButtonConsoleButtons)this.alignButtonConsoleButtons();
    return result;
  });
  wrap(Window_Message.prototype,'updatePlacement',function(previous,args){
    const result=previous.apply(this,args);
    if(!this._forcedPosition&&!this._autoPositionTarget){
      this.x=Math.max(0,(Graphics.boxWidth-this.width)/2);
      if(this._positionType===2)this.y=Math.max(0,Graphics.boxHeight-this.height-20);
      if(this._nameBoxWindow)this._nameBoxWindow.updatePlacement();
    }
    return result;
  });
  wrap(Window_Message.prototype,'newLineX',function(previous,args){return previous.apply(this,args)+16;});
  wrap(Window_Message.prototype,'newPage',function(previous,args){
    const result=previous.apply(this,args);
    if($gameMessage.speakerName()&&args[0]){args[0].y+=32;args[0].startY=args[0].y;}
    return result;
  });
  wrap(Window_NameBox.prototype,'resetFontSettings',function(previous,args){
    const result=previous.apply(this,args);textStyle(this.contents,fonts.speaker,24,ink(this));textContrast(this);return result;
  });
  wrap(Window_NameBox.prototype,'resetTextColor',function(previous,args){
    const result=previous.apply(this,args);this.contents.textColor=ink(this);textContrast(this);return result;
  });
  wrap(Window_NameBox.prototype,'updatePlacement',function(previous,args){
    const result=previous.apply(this,args),message=this._messageWindow;
    if(message){this.x=message.x+16;this.y=message.y;this.opacity=0;}
    return result;
  });
  wrap(Window_Message.prototype,'_updatePauseSign',function(previous,args){
    const result=previous.apply(this,args),sprite=this._pauseSignSprite;
    if(sprite&&icons.continue){
      sprite.bitmap=icons.continue;sprite.setFrame(0,0,16,10);sprite.anchor.set(0,0);
      sprite.x=this.width-39;sprite.y=this.height-25-(this.addedHeight?this.addedHeight():0);
      sprite.visible=this.isOpen()&&this.pause;sprite.alpha=1;
    }
    return result;
  });

  // Console colors and labels use their existing state/translation providers.
  if(typeof Window_ButtonConsole!=='undefined'){
    wrap(Window_ButtonConsole.prototype,'resetFontSettings',function(previous,args){
      const result=previous.apply(this,args);textStyle(this.contents,fonts.body,16,colors.heading);return result;
    });
    wrap(Window_ButtonConsole.prototype,'refresh',function(previous,args){
      const result=previous.apply(this,args);
      this.contents.clear();textStyle(this.contents,fonts.body,16,ink(this));
      this.drawText(TextManager.msgButtonConsole(this._type),0,0,this.innerWidth,'center');return result;
    });
    wrap(Window_ButtonConsole.prototype,'update',function(previous,args){
      const result=previous.apply(this,args);
      const disabled=this.textColorID()===Window_ButtonConsole.TEXT_COLOR_DISABLED;
      const over=pointerUsed&&this.visible&&this.isOpen()&&this.isTouchedInsideFrame();
      const state=disabled?'disabled':over?(TouchInput.isPressed()?'pressed':'hover'):'default';
      const toggled=!disabled&&this.textColorID()===Window_ButtonConsole.TEXT_COLOR_TOGGLED;
      if(state!==this._coretoConsoleState||toggled!==this._coretoConsoleToggled){this._coretoConsoleState=state;this._coretoConsoleToggled=toggled;this._refreshBack();this._refreshFrame();this.refresh();}
      return result;
    });
  }

  // Picture-backed buttons keep Coreto picture bindings, transforms and labels.
  // Only known blank UI surfaces are replaced; portraits and
  // scenery, including clickable hero pictures, retain their authored artwork.
  wrap(Sprite_Picture.prototype,'createPictureText',function(previous,args){
    const result=previous.apply(this,args);
    if(this._pictureTextWindow)this._pictureTextWindow._coretoPictureText=true;
    return result;
  });
  const pictureSurfaces=new Set(['Dryland_Button','Dryland_Tag','Dryland_Panel','Dryland_Approach',
    'Dryland_EncounterTitle','Dryland_DestinationCard','Dryland_DestinationLabel','Dryland_SacrificeCard']);
  const pictureSizes={Dryland_Button:[208,54],Dryland_Tag:[128,32],Dryland_Panel:[1100,560],
    Dryland_Approach:[1100,96],Dryland_EncounterTitle:[1100,60],Dryland_DestinationCard:[330,212],
    Dryland_DestinationLabel:[330,48],Dryland_SacrificeCard:[400,440]};
  wrap(Sprite_Picture.prototype,'loadBitmap',function(previous,args){
    const size=pictureSizes[this._pictureName];
    if(!size)return previous.apply(this,args);
    // Never attach the old picture, even for one loading/transition frame.
    // Keep one owned bitmap through hover/selection; this is not an overlay.
    const old=this._coretoButtonBitmap;
    const bitmap=this._coretoButtonBitmap=new Bitmap(size[0],size[1]);
    box(bitmap,0,0,size[0],size[1],colors.panel,colors.border,6);
    this.bitmap=bitmap;this._coretoPictureSignature=null;
    if(old)old.destroy();
  });
  function pictureAction(sprite){
    for(let node=sprite;node;node=node.parent){
      if(node instanceof Sprite_Picture){
        const index=$gameScreen.getPictureChoiceBinding(node._pictureId);
        if(index>=0)return {index,owner:node};
      }
    }
    return {index:-1,owner:sprite};
  }
  wrap(Sprite_Picture.prototype,'update',function(previous,args){
    const picture=this.picture();
    if(this._pictureTextWindow&&(!picture||!pictureSurfaces.has(picture.name())))delete this._pictureTextWindow._coretoPictureInk;
    const result=previous.apply(this,args);
    // Attached destination UI inherits its transparent group's color filter.
    if(picture?.name()==='Dryland_DestinationGroup')this.setColorTone([0,0,0,0]);
    if(!picture||!pictureSurfaces.has(picture.name()))return result;
    if(!this.bitmap||!this.bitmap.isReady())return result;
    // The native focus tone was intended for the old dark artwork. Our own
    // explicit states already convey focus; applying both would wash out ink.
    this.setColorTone([0,0,0,0]);
    const w=this.bitmap.width,h=this.bitmap.height;
    const choice=SceneManager._scene?._choiceListWindow;
    const {index:binding,owner}=pictureAction(this);
    const bound=binding>=0&&!!choice?._list?.[binding];
    const skip=!!picture._drylandScrollSkipKey;
    const interactive=bound||skip;
    const active=(bound&&choice.active)||(skip&&!!SceneManager._scene?._scrollTextWindow?._text);
    const selected=bound&&choice.active&&choice.index()===binding;
    const disabled=bound&&!choice.isCommandEnabled(binding);
    const hover=active&&pointerOver(owner);
    const pressed=active&&((hover&&TouchInput.isPressed())||(selected&&Input.isPressed('ok'))||(skip&&Input.isPressed(picture._drylandScrollSkipKey)));
    // Disabled actions remain legible; HIDE and authored zero-opacity still win.
    if(disabled&&picture.opacity()>0)this.opacity=255;
    const bubble=this._drylandConversationBubble;
    if(bubble&&menuIcons.Conversation){bubble.bitmap=menuIcons.Conversation;bubble.setFrame(0,0,32,32);}
    const state=disabled?'disabled':pressed?'pressed':hover?'hover':selected?'selected':'default';
    const signature=[picture.name(),w,h,state,selected,interactive].join('|');
    if(signature!==this._coretoPictureSignature){
      this._coretoPictureSignature=signature;
      const bitmap=this._coretoButtonBitmap||new Bitmap(w,h);
      this._coretoButtonBitmap=bitmap;bitmap.clear();
      const rect={x:0,y:0,width:w,height:h};
      if(interactive)buttonSurface(bitmap,rect,state,selected);
      else if(picture.name()==='Dryland_Panel')box(bitmap,0,0,w,h,colors.panel,colors.subtle,10);
      else staticSurface(bitmap,rect);
      this.bitmap=bitmap;
      if(this._pictureTextWindow){
        this._pictureTextWindow._coretoPictureInk=!disabled&&(selected||pressed)?colors.onAccent:colors.text;
        $gameScreen.requestPictureTextRefresh(this._pictureId);this.drawPictureText();this.attachPictureText();
      }
    }else this.bitmap=this._coretoButtonBitmap;
    return result;
  });
  wrap(Window_Base.prototype,'changeTextColor',function(previous,args){
    if(this._coretoPictureInk)args[0]=this._coretoPictureInk;
    return previous.apply(this,args);
  });
  wrap(Sprite_Picture.prototype,'destroy',function(previous,args){
    const bitmap=this._coretoButtonBitmap;const result=previous.apply(this,args);
    if(bitmap)bitmap.destroy();return result;
  });

  // Native character-name input: visual field treatment, original keyboard,
  // validation and actor-name commit remain owned by MZ/Coreto.
  wrap(Window_NameEdit.prototype,'refresh',function(previous,args){
    const result=previous.apply(this,args);
    if(!this._actor)return result;
    const first=this.itemRect(0),last=this.itemRect(Math.max(0,this._maxLength-1));
    const x=first.x-12,y=first.y-2,width=Math.min(this.innerWidth-x,last.x+last.width-x+12);
    this.contentsBack.clear();box(this.contentsBack,x,y,width,40,colors.panel,colors.focus,6,2);
    return result;
  });
})();
