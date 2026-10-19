/*:
 * @target MZ
 * @plugindesc [Coreto] [Tier 5] Design System 1.2.0 — Fantasia com respiro
 * @author Coreto
 * @orderAfter Coreto_0_CoreEngine
 * @orderAfter Coreto_1_MessageCore
 * @orderAfter Coreto_1_OptionsCore
 * @orderAfter Coreto_1_SaveCore
 * @orderAfter Coreto_2_ExtMessageFunc
 * @orderAfter Coreto_2_PictureChoices
 * @orderAfter Coreto_2_VNPictureBusts
 * @orderAfter Coreto_2_AniMsgTextEffects
 * @orderAfter Coreto_3_ChoiceCmnEvts
 * @orderAfter Coreto_4_AttachedPictures
 * @orderAfter Coreto_4_EventTitleScene
 * @orderAfter Coreto_4_MessageVisibility
 * @param Enabled
 * @text Ativar design system
 * @desc Configuração visual persistida no projeto.
 * @type boolean
 * @default true
 * @param Windows
 * @text Aplicar às janelas nativas
 * @desc Configuração visual persistida no projeto.
 * @type boolean
 * @default true
 * @param Shapes
 * @text Bordas e ornamentos
 * @desc Configuração visual persistida no projeto.
 * @type struct<Shapes>
 * @default {"PanelRadius":"10","Inset":"3"}
 * @param Choice
 * @text Composição de escolhas
 * @desc Configuração visual persistida no projeto.
 * @type struct<Choice>
 * @default {"PaddingY":"8","MaxWidth":"620"}
 * @param Dialogue
 * @text Composição de diálogo
 * @desc Configuração visual persistida no projeto.
 * @type struct<Dialogue>
 * @default {"ContinuePlacement":"corner","SpeakerInside":"true","SpeakerGap":"4","TextInset":"16"}
 * @param Field
 * @text Campo e ajuda
 * @desc Configuração visual persistida no projeto.
 * @type struct<Field>
 * @default {"Height":"40","PaddingX":"18","Gap":"4"}
 * @param OptionsLayout
 * @text Composição de Opções (lacuna do provedor)
 * @desc Configuração visual persistida no projeto.
 * @type struct<OptionsLayout>
 * @default {"Margin":"28","CategoryHeight":"76","CategoryOffsetY":"16","ListOffsetY":"12","RowGap":"12","Bottom":"20"}
 * @param PictureRoles
 * @text Receitas visuais de pictures
 * @desc Configuração visual persistida no projeto.
 * @type struct<PictureRoles>[]
 * @default []
 * @help
 * Biblioteca visual independente para MZ 1.10.0. Carregue abaixo da Coreto.
 * Sem dependências de plugins; integrações ausentes são ignoradas.
 * Cores globais, fonte básica, layout e cursor: edite nos provedores existentes.
 * Parâmetros são lidos no boot. Reabra o editor após usar a CLI.
 * API: CoretoDesignSystem.drawButton/drawField/drawCard/drawIcon/measure/style.
 * Conteúdo, entrada, validação e persistência pertencem ao consumidor.
 * Instalação inclui fonts/ e img/system/; preserve os arquivos no deploy.
 */
/*~struct~Shapes:
 * @param PanelRadius
 * @text Raio dos painéis
 * @desc Medida do componente; respeita os limites abaixo.
 * @type number
 * @min 0
 * @max 256
 * @default 10
 * @param Inset
 * @text Recuo da borda dupla
 * @desc Medida do componente; respeita os limites abaixo.
 * @type number
 * @min 0
 * @max 24
 * @default 3
 */
/*~struct~Choice:
 * @param PaddingY
 * @text Respiro vertical
 * @desc Medida do componente; respeita os limites abaixo.
 * @type number
 * @min 0
 * @max 256
 * @default 8
 * @param MaxWidth
 * @text Limite de quebra de texto
 * @desc Medida do componente; respeita os limites abaixo.
 * @type number
 * @min 80
 * @max 4096
 * @default 620
 */
/*~struct~Dialogue:
 * @param ContinuePlacement
 * @text Composição da continuação
 * @desc Configuração visual persistida no projeto.
 * @type select
 * @option corner
 * @value corner
 * @option provider
 * @value provider
 * @default corner
 * @param SpeakerInside
 * @text Nome dentro do painel
 * @desc Configuração visual persistida no projeto.
 * @type boolean
 * @default true
 * @param SpeakerGap
 * @text Distância nome / fala
 * @desc Medida do componente; respeita os limites abaixo.
 * @type number
 * @min 0
 * @max 256
 * @default 4
 * @param TextInset
 * @text Recuo adicional do texto
 * @desc Medida do componente; respeita os limites abaixo.
 * @type number
 * @min 0
 * @max 256
 * @default 16
 */
/*~struct~Field:
 * @param Height
 * @text Altura do campo
 * @desc Medida do componente; respeita os limites abaixo.
 * @type number
 * @min 24
 * @max 160
 * @default 40
 * @param PaddingX
 * @text Respiro do valor
 * @desc Medida do componente; respeita os limites abaixo.
 * @type number
 * @min 0
 * @max 256
 * @default 18
 * @param Gap
 * @text Distância entre linhas
 * @desc Medida do componente; respeita os limites abaixo.
 * @type number
 * @min 0
 * @max 256
 * @default 4
 */
/*~struct~OptionsLayout:
 * @param Margin
 * @text Margens laterais
 * @desc Medida do componente; respeita os limites abaixo.
 * @type number
 * @min 0
 * @max 256
 * @default 28
 * @param CategoryHeight
 * @text Altura de categorias
 * @desc Medida do componente; respeita os limites abaixo.
 * @type number
 * @min 40
 * @max 200
 * @default 76
 * @param CategoryOffsetY
 * @text Deslocamento das categorias
 * @desc Medida do componente; respeita os limites abaixo.
 * @type number
 * @min 0
 * @max 256
 * @default 16
 * @param ListOffsetY
 * @text Distância após categorias
 * @desc Medida do componente; respeita os limites abaixo.
 * @type number
 * @min 0
 * @max 256
 * @default 12
 * @param RowGap
 * @text Espaço entre opções
 * @desc Medida do componente; respeita os limites abaixo.
 * @type number
 * @min 0
 * @max 256
 * @default 12
 * @param Bottom
 * @text Margem inferior
 * @desc Medida do componente; respeita os limites abaixo.
 * @type number
 * @min 0
 * @max 256
 * @default 20
 */
/*~struct~PictureRoles:
 * @param Image
 * @text Imagem
 * @desc Imagem PNG em img/system, sem extensão.
 * @type file
 * @dir img/pictures/
 * @default 
 * @param Role
 * @text Papel visual
 * @desc Configuração visual persistida no projeto.
 * @type select
 * @option secondary
 * @value secondary
 * @option primary
 * @value primary
 * @option card
 * @value card
 * @option panel
 * @value panel
 * @default secondary
 */

(() => {
'use strict';
const DEFAULTS={"Enabled":true,"Windows":true,"Surfaces":{"canvas":"#f8e9cc","panel":"#f9eacf","disabled":"#d3c7b4","onAccent":"#fff8eb","border":"#704737","subtle":"#be9a6b","primary":"#552070","pressed":"#4d1d6b","purple":"#6d1b8b","menuSelectedHoverBorder":"#000000","focus":"#8224ad","gold":"#edaa2f","error":"#af2933","hover":"#eedff2","accentHover":"#6d3185","card":"#f0dfc0","cardScene":"#f0dfc0","cardMemorial":"#f0dfc0"},"Shapes":{"ControlRadius":6,"PanelRadius":10,"MenuSelectedWidth":1,"BorderWidth":1,"FocusWidth":2,"FocusGap":3,"Inset":3},"Card":{"StripeX":12,"StripeWidth":4,"PaddingY":12,"TextInset":12,"PaddingRight":12},"Button":{"PaddingX":16,"MinHeight":44,"MarkerSize":24,"MarkerGap":12},"Choice":{"MarkerSize":16,"MarkerGap":8,"PaddingY":8,"MaxWidth":620},"Dialogue":{"ContinuePlacement":"corner","SpeakerInside":true,"SpeakerGap":4,"TextInset":16,"ContrastOutline":2},"Field":{"Height":40,"PaddingX":18,"Gap":4},"Controls":{"OptionHeight":76,"ValueRatio":52,"TrackHeight":8,"ThumbWidth":10,"ThumbHeight":18,"SaveHeader":60,"SaveFooter":98},"Title":{"Face":"CoretoCinzel","Size":52,"Line":56},"Section":{"Face":"CoretoAveria","Size":32,"Line":40},"Speaker":{"Face":"CoretoAveria","Size":24,"Line":28},"Menu":{"Face":"CoretoOutfitMedium","Size":22,"Line":28},"Action":{"Face":"CoretoOutfitMedium","Size":20,"Line":24},"ChoiceText":{"Face":"CoretoOutfitMedium","Size":18},"Input":{"Face":"CoretoOutfit","Size":18,"Line":24},"Label":{"Face":"CoretoOutfitMedium","Size":16,"Line":20},"Helper":{"Face":"CoretoOutfit","Size":14,"Line":20},"Icons":{"diamond":"CoretoTheme_diamond","error":"CoretoTheme_error","Settings":"CoretoTheme_Settings","Audio":"CoretoTheme_Audio","Language":"CoretoTheme_Language","TextEffects":"CoretoTheme_TextEffects","Music":"CoretoTheme_Music","Ambience":"CoretoTheme_Ambience","Jingle":"CoretoTheme_Jingle","SoundEffects":"CoretoTheme_SoundEffects","Back":"CoretoTheme_Back","Save":"CoretoTheme_Save","Clock":"CoretoTheme_Clock","Conversation":"CoretoTheme_Conversation","Menu":"CoretoTheme_Menu"},"OptionsLayout":{"Margin":28,"CategoryHeight":76,"CategoryOffsetY":16,"ListOffsetY":12,"RowGap":12,"Bottom":20},"PictureRoles":[]};

// ---- configuration ----
const plugin='Coreto_5_DesignSystem';
const params=PluginManager.parameters(plugin);
function decode(value){
  if(typeof value==='string'){try{return decode(JSON.parse(value));}catch{return value;}}
  if(Array.isArray(value))return value.map(decode);
  if(value&&typeof value==='object'&&!Array.isArray(value))return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,decode(v)]));
  return value;
}
function merge(base,provided){
  const result={...base};
  for(const k of Object.keys(base)){
    const v=provided?.[k];if(v===undefined)continue;
    if(Array.isArray(base[k]))result[k]=Array.isArray(v)?v:base[k];
    else if(base[k]&&typeof base[k]==='object')result[k]=merge(base[k],v);
    else if(typeof v===typeof base[k]&&(typeof v!=='number'||Number.isFinite(v)))result[k]=v;
    else console.warn('[CoretoDesignSystem] Invalid parameter '+k+'; using default.');
  }
  return result;
}
// The persisted CoreEngine drawing recipe owns shared visual values.
const coreParameters=decode(PluginManager.parameters('Coreto_0_CoreEngine'));
const coreWindow=coreParameters['Window:struct']||coreParameters.Window||{};
const authored=coreWindow['DrawItemBackgroundJS:func']||coreWindow.DrawItemBackgroundJS||'';
const recipeLine=String(authored).split('\n').find(line=>line.startsWith('const config='));
let providerRecipe={};if(recipeLine){try{providerRecipe=JSON.parse(recipeLine.slice(13).replace(/;\s*$/,''));}catch(e){console.warn('[CoretoDesignSystem] Invalid provider recipe',e);}}
const config=merge(merge(DEFAULTS,providerRecipe),decode(params));
if(!config.Enabled)return;
const active=id=>($plugins||[]).some(p=>p.name===id&&p.status);
const providers={core:active('Coreto_0_CoreEngine'),message:active('Coreto_1_MessageCore'),ext:active('Coreto_2_ExtMessageFunc'),options:active('Coreto_1_OptionsCore'),save:active('Coreto_1_SaveCore'),pictures:active('Coreto_2_PictureChoices')};
const colors={...config.Surfaces};
Object.defineProperties(colors,{
  panel:{enumerable:true,get:()=>providers.core?ColorManager.itemBackColor1():config.Surfaces.panel},
  text:{enumerable:true,get:()=>providers.core?ColorManager.normalColor():'#360a0b'},
  heading:{enumerable:true,get:()=>providers.core?ColorManager.systemColor():'#360a0b'},
  muted:{enumerable:true,get:()=>colors.text}
});
const fonts={body:'CoretoOutfit',medium:'CoretoOutfitMedium',speaker:config.Speaker.Face,title:config.Title.Face};
const choiceSize=config.ChoiceText.Size;
const icons={};
const pictureRoles=new Map(config.PictureRoles.filter(r=>r&&typeof r.Image==='string'&&['secondary','primary','card','panel'].includes(r.Role)).map(r=>[r.Image,r.Role]));
const integrations={
  scrollOnPaper:w=>w.textSurface?.()==='paper',
  choiceBadgeWidth:w=>Number(w.choiceAdornmentWidth?.())||0,
  pictures:p=>{
    const kind=pictureRoles.get(p?.name());if(!kind)return null;
    const bitmap=ImageManager.loadPicture(p.name());if(!bitmap.isReady())return null;
    return {surface:true,kind,width:bitmap.width,height:bitmap.height,context:'paper'};
  },
  pictureState:s=>({active:!!s.uiActionActive?.()}),optionIcon:()=>null
};
const wrap=(prototype,method,decorate)=>{
  const previous=prototype?.[method];if(typeof previous!=='function')return;
  prototype[method]=function(...args){return decorate.call(this,previous,args);};
};
const isTitle=w=>w instanceof Window_TitleCommand||(w instanceof Window_ChoiceList&&SceneManager.isSceneTitleMap?.());
const isConsole=w=>typeof Window_ButtonConsole!=='undefined'&&w instanceof Window_ButtonConsole;
const menuScene=()=>SceneManager._scene instanceof Scene_MenuBase;
function themed(w){return config.Windows&&w instanceof Window_Base&&!(w instanceof Window_ScrollText)&&!(w instanceof Window_MapName)&&(w.constructor.name!=='Window_ButtonAssist'||menuScene())&&!w._coretoPictureText;}
const list=w=>themed(w)&&w instanceof Window_Selectable&&!(w instanceof Window_NameEdit)&&!(w instanceof Window_NumberInput)&&!isConsole(w);
wrap(Scene_Boot.prototype,'loadGameFonts',function(previous,args){
  const result=previous.apply(this,args);
  // The native FontManager owns loading/error readiness, including the variable-font weight.
  if(!providers.message){FontManager.load('CoretoOutfit','Outfit.ttf');FontManager.load('CoretoAveria','AveriaLibre-Regular.ttf');FontManager.load('CoretoCinzel','CinzelDecorative-Regular.ttf');}
  if(!providers.message)FontManager.load('CoretoOutfitMedium','Outfit-Medium.ttf');
  for(const [name,filename]of Object.entries(config.Icons)){
    const bitmap=ImageManager.loadSystem(filename);menuIcons[name]=bitmap;icons[name]=bitmap;
  }
  icons.continue=ImageManager.loadSystem('CoretoTheme_continue');
  return result;
});


// ---- drawing ----
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


// ---- components ----
function buttonSurface(bitmap,rect,state,selected=false,primary=false,kind='secondary'){

  const dark=state==='pressed'||selected||primary;

  const fill=state==='disabled'?colors.disabled:state==='pressed'?colors.pressed:state==='hover'||state==='selectedHover'?(dark?colors.accentHover:colors.hover):dark?colors.primary:colors.panel;

  const hover=state==='hover'||state==='selectedHover',resting=state!=='pressed'&&state!=='disabled';
  const border=resting&&selected?(kind==='menu'&&hover?colors.menuSelectedHoverBorder:colors.gold):hover?colors.focus:colors.border;
  const width=hover?config.Shapes.FocusWidth:resting&&selected?(kind==='menu'?config.Shapes.MenuSelectedWidth:config.Shapes.FocusWidth):config.Shapes.BorderWidth;
  box(bitmap,rect.x,rect.y,rect.width,rect.height,fill,border,config.Shapes.ControlRadius,width);

}

function staticSurface(bitmap,rect,context='paper'){

  box(bitmap,rect.x,rect.y,rect.width,rect.height,context==='scene'?colors.cardScene:context==='memorial'?colors.cardMemorial:colors.card,null,0,0);

  bitmap.fillRect(rect.x+config.Card.StripeX,rect.y+config.Card.PaddingY,config.Card.StripeWidth,Math.max(0,rect.height-config.Card.PaddingY*2),colors.subtle);

}

function drawButton(bitmap,rect,label,state='default',kind='menu',focused=false){

  if(kind==='text'||kind==='primary'){if(state==='selected')state='default';if(state==='selectedHover')state='hover';}
  if(kind==='choice'&&state==='pressed')state='selected';
  const selected=['selected','selectedHover'].includes(state),disabled=state==='disabled';

  if(kind!=='text')buttonSurface(bitmap,rect,state,selected,kind==='primary',kind);
  else if(state!=='default')box(bitmap,rect.x,rect.y,rect.width,rect.height,state==='disabled'?colors.disabled:state==='pressed'?colors.pressed:colors.hover,null,config.Shapes.ControlRadius,0);

  const s=config[kind==='menu'?'Menu':kind==='choice'?'ChoiceText':'Action'];

  const marker=kind==='menu'||kind==='choice',m=kind==='menu'?config.Button.MarkerSize:config.Choice.MarkerSize;

  const pad=config.Button.PaddingX,gap=kind==='menu'?config.Button.MarkerGap:config.Choice.MarkerGap;

  if(marker&&(selected||state==='pressed'))blit(bitmap,'diamond',rect.x+pad,rect.y+(rect.height-m)/2,m,m);

  const dark=selected||state==='pressed'||kind==='primary';

  textStyle(bitmap,s.Face,s.Size,disabled?colors.muted:dark?colors.onAccent:colors.text);

  const inset=pad+(marker?m+gap:0);

  bitmap.drawText(label,rect.x+inset,rect.y,Math.max(1,rect.width-inset-pad),rect.height,marker?'left':'center');

  if(focused&&!disabled){const gap=config.Shapes.FocusGap+config.Shapes.FocusWidth;box(bitmap,rect.x-gap,rect.y-gap,rect.width+2*gap,rect.height+2*gap,null,colors.gold,config.Shapes.ControlRadius,config.Shapes.FocusWidth);}

}

function drawField(bitmap,options){

  const {x=0,y=0,width=480,label='',value='',helper='',state='default'}=options;

  const l=config.Label,i=config.Input,h=config.Helper,f=config.Field;

  textStyle(bitmap,l.Face,l.Size,colors.text);bitmap.drawText(label,x,y,width,l.Line);

  const fy=y+l.Line+f.Gap;

  box(bitmap,x,fy,width,f.Height,state==='disabled'?colors.disabled:colors.panel,state==='focused'?colors.focus:state==='error'?colors.error:colors.border,config.Shapes.ControlRadius,state==='focused'?config.Shapes.FocusWidth:config.Shapes.BorderWidth);

  textStyle(bitmap,i.Face,i.Size,colors.text);bitmap.drawText(value,x+f.PaddingX,fy,width-f.PaddingX*2,f.Height);

  if(!helper)return l.Line+f.Gap+f.Height;

  const hy=fy+f.Height+f.Gap,err=state==='error',inset=err?32:0;

  if(err)blit(bitmap,'error',x,hy,24,24);

  const layout=measure(bitmap,helper,width-inset,'Helper');textStyle(bitmap,h.Face,h.Size,colors.text);

  layout.lines.forEach((line,index)=>bitmap.drawText(line,x+inset,hy+index*h.Line,width-inset,h.Line));

  return hy-y+Math.max(err?24:0,layout.height);

}

const menuIcons={},tintedIcons=new Map();

function menuIcon(bitmap,name,x,y,size=32,color=colors.text){

  const source=menuIcons[name];if(!source?.isReady())return;

  if(['error','Conversation','diamond'].includes(name)){bitmap.blt(source,0,0,source.width,source.height,x,y,size*source.width/source.height,size);return;}

  const key=name+color;let tinted=tintedIcons.get(key);

  if(!tinted){

    if(tintedIcons.size>=64){const first=tintedIcons.keys().next().value;tintedIcons.get(first).destroy();tintedIcons.delete(first);}

    tinted=new Bitmap(source.width,source.height);tinted.blt(source,0,0,source.width,source.height,0,0);

    const ctx=tinted.context;ctx.save();ctx.globalCompositeOperation='source-in';ctx.fillStyle=color;ctx.fillRect(0,0,tinted.width,tinted.height);ctx.restore();tinted.baseTexture.update();tintedIcons.set(key,tinted);

  }

  bitmap.blt(tinted,0,0,tinted.width,tinted.height,x,y,size*tinted.width/tinted.height,size);

}

function drawItemBackground(index){

  if(!list(this))return false;

  const rect=this.itemRect(index),enabled=this instanceof Window_SavefileList?this.isEnabled(this.indexToSavefileId(index)):!this.isCommandEnabled||this.isCommandEnabled(index);

  const selected=index===this.index(),hover=enabled&&index===this._coretoHoverIndex;

  const pressed=enabled&&this.active&&((selected&&Input.isPressed('ok'))||(hover&&this._coretoPointerPressed));

  const state=!enabled?'disabled':pressed?'pressed':hover?'hover':selected?'selected':'default';

  buttonSurface(this.contentsBack,rect,state,selected,false,isTitle(this)?'menu':'secondary');

  if(selected&&enabled&&(this instanceof Window_ChoiceList||this instanceof Window_TitleCommand)){

    const size=isTitle(this)?config.Button.MarkerSize:config.Choice.MarkerSize;

    blit(this.contentsBack,'diamond',rect.x+8,rect.y+(rect.height-size)/2,size,size);

  }

  return true;

}



// ---- mz ----
  if(config.Windows){

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

      if(!themed(this)||isConsole(this))return previous.apply(this,args);

      const sprite=kind==='Back'?this._backSprite:this._frameSprite;

      const bitmap=surface(this,kind);

      const invisible=this instanceof Window_NameBox||isTitle(this);

      const staticCard=this instanceof Window_Help;

      if(!invisible&&staticCard){if(kind==='Back')staticSurface(bitmap,{x:0,y:0,width:this.width,height:this.height});}

      else if(!invisible&&isConsole(this)){

        if(kind==='Back')buttonSurface(bitmap,{x:0,y:0,width:this.width,height:this.height},this._coretoConsoleState||'default',this._coretoConsoleToggled);

      }

      else if(!invisible)box(bitmap,0,0,this.width,this.height,kind==='Back'?colors.panel:null,

        kind==='Frame'?colors.border:null,config.Shapes.PanelRadius);

      if(!invisible&&kind==='Frame'&&this instanceof Window_Message)

        box(bitmap,config.Shapes.Inset,config.Shapes.Inset,this.width-config.Shapes.Inset*2,this.height-config.Shapes.Inset*2,null,colors.subtle,config.Shapes.ControlRadius);

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



  function darkTextSurface(w){

    if(w instanceof Window_Message)return $gameMessage.background()!==0;

    if(w instanceof Window_NameBox)return !!w._messageWindow&&darkTextSurface(w._messageWindow);

    if(w instanceof Window_ScrollText)return !integrations.scrollOnPaper(w);

    return false;

  }

  function textContrast(w){

    if(!w.contents)return;

    const general=globalThis.VisuMZ?.MessageCore?.Settings?.General;
    w.contents.outlineWidth=darkTextSurface(w)?config.Dialogue.ContrastOutline:Number(general?.DefaultOutlineWidth||0);

    w.contents.outlineColor=ColorManager.outlineColor();

  }

  function ink(w) {

    if(darkTextSurface(w))return colors.onAccent;
    if(providers.message&&w instanceof Window_NameBox)return ColorManager.textColor(globalThis.VisuMZ.MessageCore.Settings.General.NameBoxWindowDefaultColor);

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

    if(!isConsole(this)&&(themed(this)||this instanceof Window_ScrollText)&&this.contents){this.contents.textColor=ink(this);textContrast(this);}

    return result;

  });

  wrap(Window_Base.prototype,'changeTextColor',function(previous,args){

    if(themed(this)&&this._coretoDrawingIndex!==undefined)args[0]=ink(this);

    if(this instanceof Window_ScrollText)args[0]=ink(this);

    return previous.apply(this,args);

  });

  wrap(Window_Base.prototype,'changePaintOpacity',function(previous,args){

    if(themed(this)&&this._coretoDrawingIndex!==undefined)args[0]=true;

    return previous.apply(this,args);

  });

  wrap(Window_Help.prototype,'drawTextEx',function(previous,args){

    args[1]=(args[1]||0)+16;if(args[3])args[3]-=16;

    return previous.apply(this,args);

  });

  wrap(Window_Base.prototype,'resetFontSettings',function(previous,args){

    const result=previous.apply(this,args);

    // Registered fonts and authored escapes belong to MessageCore. Never reset
    // its choices, picture text, console or speaker typography from this layer.
    if(providers.message){if(!isConsole(this)&&!this._coretoPictureText)textContrast(this);return result;}

    if(this._coretoPictureText){

      this.contents.fontFace=fonts.body;this.contents.outlineWidth=0;this.contents.outlineColor='rgba(0,0,0,0)';

      return result;

    }

    if(this instanceof Window_ScrollText){textStyle(this.contents,fonts.body,this.contents.fontSize,ink(this));textContrast(this);return result;}

    if(!themed(this)||isConsole(this))return result;

    let size=config.Menu.Size,face=config.Menu.Face;

    if(this instanceof Window_Message){size=$gameSystem.mainFontSize();face=$gameSystem.mainFontFace();}

    else if(this instanceof Window_ChoiceList){size=isTitle(this)?config.Menu.Size:config.ChoiceText.Size;face=isTitle(this)?config.Menu.Face:config.ChoiceText.Face;}

    else if(this instanceof Window_NameBox){size=config.Speaker.Size;face=config.Speaker.Face;}

    else if(this instanceof Window_NameEdit){size=config.Input.Size;face=config.Input.Face;}

    textStyle(this.contents,face,size,ink(this));textContrast(this);return result;

  });

  wrap(Window_Base.prototype,'calcTextHeight',function(previous,args){

    const height=previous.apply(this,args);

    if(this instanceof Window_Message)return Math.max(height,this.contents.fontSize+6);

    return height;

  });



  // Draw native item states while leaving command lists and handlers intact.

  if(!providers.core)wrap(Window_Selectable.prototype,'drawItemBackground',function(previous,args){if(!drawItemBackground.call(this,args[0]))return previous.apply(this,args);});

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

  // OptionsCore has hard-coded scene rectangles and no per-scene row metrics.
  if(typeof Window_OptionsCategory!=='undefined')wrap(Window_OptionsCategory.prototype,'itemHeight',function(){return this.innerHeight;});
  wrap(Window_Options.prototype,'rowSpacing',function(previous,args){return Math.max(config.OptionsLayout.RowGap,previous.apply(this,args));});
  wrap(Scene_Options.prototype,'categoryWindowRect',function(previous,args){const r=previous.apply(this,args),c=config.OptionsLayout;r.x=c.Margin;r.y+=c.CategoryOffsetY;r.width=Graphics.boxWidth-c.Margin*2;r.height=c.CategoryHeight;return r;});
  wrap(Scene_Options.prototype,'optionsWindowRect',function(previous,args){const r=previous.apply(this,args),c=config.OptionsLayout;r.x=c.Margin;r.y+=c.ListOffsetY;r.width=Graphics.boxWidth-c.Margin*2;r.height=Math.max(160,this.mainAreaTop()+this.mainAreaHeight()-r.y-c.Bottom);return r;});

  // SaveCore draws loaded data asynchronously; derive the drawing index again

  // so a bitmap load never inherits a different row's selected text color.

  wrap(Window_SavefileList.prototype,'drawContentsLoaded',function(previous,args){

    const before=this._coretoDrawingIndex;this._coretoDrawingIndex=this.savefileIdToIndex(args[0].savefileId);

    try{return previous.apply(this,args);}finally{this._coretoDrawingIndex=before;}

  });

  wrap(Sprite_Button.prototype,'loadButtonImage',function(previous,args){

    if(this._buttonType!=='cancel')return previous.apply(this,args);

    if(this._buttonType==='cancel'){

      {

        // Keep the native 11-cell ButtonSet contract and its 96x48 hit area.

        // Each sprite owns its texture: scene teardown destroys its bitmap.

        const menuButtonSet=new Bitmap(528,144);

        this._coretoOwnedButtonBitmap=menuButtonSet;

        const draw=()=>{if(this._destroyed)return;for(const [i,state] of ['default','pressed','hover'].entries()){

          const y=i*48;buttonSurface(menuButtonSet,{x:1,y:y+1,width:94,height:46},state);

          menuIcon(menuButtonSet,'Back',32,y+8,32,state==='pressed'?colors.onAccent:colors.text);

        }};

        menuIcons.Back.addLoadListener(draw);

        this.bitmap=menuButtonSet;

      }

      this._coretoMenuButton=true;

    }

  });

  wrap(Sprite_Button.prototype,'destroy',function(previous,args){const b=this._coretoOwnedButtonBitmap;this._coretoOwnedButtonBitmap=null;if(b)this.bitmap=null;const result=previous.apply(this,args);if(b)b.destroy();return result;});

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

    const rect=previous.apply(this,args);const gap=isTitle(this)?config.Button.MarkerSize+config.Button.MarkerGap:config.Choice.MarkerSize+config.Choice.MarkerGap;

    rect.x+=gap;rect.width=Math.max(1,rect.width-gap);return rect;

  });

  wrap(Window_ChoiceList.prototype,'maxChoiceWidth',function(previous,args){

    const available=(Graphics.boxWidth-this.padding*2)/Math.max(1,this.maxCols())-this.colSpacing();

    return Math.min(previous.apply(this,args)+(isTitle(this)?config.Button.MarkerSize+config.Button.MarkerGap:config.Choice.MarkerSize+config.Choice.MarkerGap),Math.min(config.Choice.MaxWidth,available));

  });

  wrap(Window_ChoiceList.prototype,'commandName',function(previous,args){

    const source=previous.apply(this,args);

    if(isTitle(this)||this._pictureChoicesHidden||!source||!this.contents)return source;

    const badge=integrations.choiceBadgeWidth(this);

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

    let height=config.Button.MinHeight+(isTitle(this)?this.rowSpacing():0);

    if(this.contents&&this._list)for(let i=0;i<this._list.length;i++)height=Math.max(height,this.textSizeEx(this.commandName(i)).height+config.Choice.PaddingY*2);

    return Math.max(native,height);

  });







  // Speaker uses the existing NameBox inside the paper panel. Coreto still

  // controls parsing, HIDE, page breaks, faces and reading completion.

  wrap(Window_Message.prototype,'lineHeight',function(previous,args){return $gameSystem.mainFontSize()+6;});

  wrap(Window_Message.prototype,'updateDimensions',function(previous,args){

    const result=previous.apply(this,args);

    if(this._forcedPosition||this._messageAutoSize)return result;

    const width=this.width;

    const height=Math.min(Graphics.boxHeight,this.height+(config.Dialogue.SpeakerInside&&$gameMessage.speakerName()?config.Speaker.Line+config.Dialogue.SpeakerGap:0));

    if(width!==this.width||height!==this.height){this.width=width;this.height=height;if(this.contents)this.createContents();}

    if(this.alignButtonConsoleButtons)this.alignButtonConsoleButtons();

    return result;

  });

  wrap(Window_Message.prototype,'newLineX',function(previous,args){return previous.apply(this,args)+config.Dialogue.TextInset;});

  wrap(Window_Message.prototype,'newPage',function(previous,args){

    const result=previous.apply(this,args);

    if(config.Dialogue.SpeakerInside&&$gameMessage.speakerName()&&args[0]){args[0].y+=config.Speaker.Line+config.Dialogue.SpeakerGap;args[0].startY=args[0].y;}

    return result;

  });

  wrap(Window_NameBox.prototype,'resetFontSettings',function(previous,args){

    const result=previous.apply(this,args);if(!providers.message)textStyle(this.contents,config.Speaker.Face,config.Speaker.Size,ink(this));textContrast(this);return result;

  });

  wrap(Window_NameBox.prototype,'resetTextColor',function(previous,args){

    const result=previous.apply(this,args);this.contents.textColor=ink(this);textContrast(this);return result;

  });

  wrap(Window_NameBox.prototype,'updatePlacement',function(previous,args){

    const result=previous.apply(this,args),message=this._messageWindow;

    if(message&&config.Dialogue.SpeakerInside){this.x=message.x+config.Dialogue.TextInset;this.y=message.y;this.opacity=0;
      if(providers.message){const p=decode(PluginManager.parameters('Coreto_1_MessageCore')),g=p['General:struct']||{};this.x+=Number(g['NameBoxWindowOffsetX:num']||0);this.y+=Number(g['NameBoxWindowOffsetY:num']||0);}}

    return result;

  });

  if(!providers.ext)wrap(Window_Message.prototype,'_updatePauseSign',function(previous,args){

    const result=previous.apply(this,args),sprite=this._pauseSignSprite;

    if(sprite&&icons.continue&&config.Dialogue.ContinuePlacement==='corner'){

      sprite.bitmap=icons.continue;sprite.setFrame(0,0,16,10);sprite.anchor.set(0,0);

      sprite.x=this.width-39;sprite.y=this.height-25-(this.addedHeight?this.addedHeight():0);

      sprite.visible=this.isOpen()&&this.pause;sprite.alpha=1;

    }

    return result;

  });



  // Native character-name input: visual field treatment, original keyboard,

  // validation and actor-name commit remain owned by MZ/Coreto.

  wrap(Window_NameEdit.prototype,'refresh',function(previous,args){

    const result=previous.apply(this,args);

    if(!this._actor)return result;

    const first=this.itemRect(0),last=this.itemRect(Math.max(0,this._maxLength-1));

    const x=first.x-12,y=first.y-2,width=Math.min(this.innerWidth-x,last.x+last.width-x+12);

    this.contentsBack.clear();box(this.contentsBack,x,y,width,config.Field.Height,colors.panel,colors.focus,config.Shapes.ControlRadius,config.Shapes.FocusWidth);

    return result;

  });

  }



// ---- coreto ----
  const optionIcons={textLocale:'Language',textEffects:'TextEffects',bgmVolume:'Music',bgsVolume:'Ambience',meVolume:'Jingle',seVolume:'SoundEffects'};

  // Called by the existing OptionsCore DrawJS configuration. Input callbacks,

  // values, localization and persistence remain owned by OptionsCore.

  function drawOption(symbol,index){

    const r=this.itemRect(index),b=this.contents,selected=index===this.index();

    const foreground=selected?colors.onAccent:colors.text;

    b.paintOpacity=255;textStyle(b,config.Menu.Face,config.Menu.Size,foreground);

    menuIcon(b,integrations.optionIcon(symbol)||optionIcons[symbol],r.x+16,r.y+(r.height-32)/2,32,foreground);

    const label=this.commandName(index).replace(/^\\I\[\d+\]/,'');

    this.drawTextEx(label,r.x+64,r.y+(r.height-this.lineHeight())/2,r.width*.43-64);

    const x=r.x+r.width*config.Controls.ValueRatio/100,w=r.width*(1-config.Controls.ValueRatio/100)-20,y=r.y+(r.height-40)/2;

    const chip=(text,offset,width,current)=>{

      box(b,offset,y,width,40,current?(selected?colors.panel:colors.primary):null,

        selected?colors.onAccent:colors.border,6,1);

      textStyle(b,config.Action.Face,config.Action.Size,current?(selected?colors.text:colors.onAccent):foreground);

      b.drawText(text,offset+8,y,width-16,40,'center');

    };

    if(symbol==='textLocale'){

      const languages=(globalThis.VisuMZ?.MessageCore?.Settings?.Localization?.Languages || []);

      const gap=12,cw=(w-gap*(languages.length-1))/languages.length;

      languages.forEach((language,i)=>chip(TextManager.getLanguageName(language),x+i*(cw+gap),cw,language===ConfigManager.textLocale));

    }else if(symbol==='textEffects'){

      const value=this.getConfigValue(symbol),cw=(w-12)/2;

      chip(this.booleanStatusText(false),x,cw,!value);chip(this.booleanStatusText(true),x+cw+12,cw,value);

    }else{

      const value=this.getConfigValue(symbol),trackWidth=w-96,trackY=y+16;

      box(b,x,trackY,trackWidth,config.Controls.TrackHeight,selected?colors.pressed:colors.disabled,selected?colors.panel:colors.border,4);

      const fill=Math.max(0,Math.min(1,value/100))*trackWidth;

      if(fill>0)box(b,x,trackY,fill,config.Controls.TrackHeight,selected?colors.gold:colors.primary,null,4);

      box(b,x+Math.max(0,Math.min(trackWidth-10,fill-5)),trackY-5,config.Controls.ThumbWidth,config.Controls.ThumbHeight,selected?colors.gold:colors.primary,selected?colors.primary:colors.panel,4);

      textStyle(b,config.Menu.Face,config.Menu.Size,foreground);b.drawText(value+'%',x+trackWidth+16,y,80,40,'right');

    }

    b.paintOpacity=255;

  }

  function saveInk(w,id){return w.isEnabled(id)&&w.index()===w.savefileIdToIndex(id)?colors.onAccent:colors.text;}

  function drawSaveFile(id,r){

    const b=this.contents,foreground=saveInk(this,id);b.paintOpacity=255;

    textStyle(b,config.Speaker.Face,config.Speaker.Size,foreground);menuIcon(b,'Save',r.x+16,r.y+16,32,foreground);

    const label=id===0?TextManager.autosave:TextManager.file+' '+id;

    b.drawText(label,r.x+60,r.y+12,r.width-156,40,'left');

    if(id>0&&id===DataManager.latestSavefileId()){

      const latest=TextManager.parseLocalizedText(TextManager.latestSave);

      box(b,r.x+r.width-88,r.y+18,72,28,colors.panel,colors.border,6);

      textStyle(b,config.Label.Face,config.Label.Size,ColorManager.latestSavefile?.()||colors.text);b.drawText(latest,r.x+r.width-84,r.y+18,64,28,'center');

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

    const previewHeight=Math.max(0,r.height-config.Controls.SaveHeader-config.Controls.SaveFooter);

    const hasActors=info.faces?.length||info.characters?.length||info.svbattlers?.length;

    const artWidth=info.description?Math.min(96,width*.35):width;

    if(info.picture)this.drawCenteredPicture(info.picture,x,r.y+config.Controls.SaveHeader,artWidth,previewHeight,true);

    if(hasActors)this.drawActors(info,x,r.y+config.Controls.SaveHeader,artWidth,previewHeight);

    textStyle(b,fonts.body,18,foreground);

    const time=info.timestamp?new Date(info.timestamp).toLocaleString(ConfigManager.textLocale==='Portuguese'?'pt-BR':'en-US',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'}):'';

    b.drawText(time,x,r.y+r.height-91,width,28,'left');

    menuIcon(b,'Clock',x,r.y+r.height-57,24,foreground);

    b.drawText(info.playtime||'',x+36,r.y+r.height-60,width-36,32,'left');

    if(info.description){

      textStyle(b,fonts.body,18,foreground);

      // Keep the native escape/localization pipeline for authored descriptions.

      const dx=info.picture||hasActors?artWidth+12:0,wrapBefore=this._wordWrap;

      const ctx=b.context;ctx.save();ctx.beginPath();ctx.rect(x+dx,r.y+config.Controls.SaveHeader,width-dx,previewHeight);ctx.clip();

      this.setWordWrap(true);

      try{this.drawTextEx(info.description,x+dx,r.y+config.Controls.SaveHeader,width-dx);}

      finally{this.setWordWrap(wrapBefore);ctx.restore();}

    }

  }

// ExtMessageFunc still owns the graphic, frames, anchor and offsets. This only
// provides the missing composition mode: a stable corner instead of text-end.
if(providers.ext)wrap(Window_Message.prototype,'_updatePauseSign',function(previous,args){
  const result=previous.apply(this,args),sprite=this._pauseSignSprite;
  if(config.Windows&&config.Dialogue.ContinuePlacement==='corner'&&sprite&&this.isCustomMessageCursorEnabled?.()){
    const settings=$gameSystem.getMessageCursorSettings();
    sprite.x=this.width-this.padding-config.Dialogue.TextInset+Number(settings.OffsetX||0);
    sprite.y=this.height-this.padding-(this.addedHeight?.()||0)-10+Number(settings.OffsetY||0);
    sprite.visible=this.isOpen()&&this.pause&&!this.isClosing()&&!this.isAnySubWindowActive();
  }
  return result;
});


// ---- pictures ----
// Opt-in picture decoration. The consuming game supplies roles; this module never decides gameplay.

wrap(Sprite_Picture.prototype,'createPictureText',function(previous,args){

  const result=previous.apply(this,args);

  if(this._pictureTextWindow)this._pictureTextWindow._coretoPictureText=true;

  return result;

});

function pictureRole(sprite){return integrations.pictures(sprite.picture(),sprite)||null;}

wrap(Sprite_Picture.prototype,'loadBitmap',function(previous,args){

  const role=pictureRole(this);

  if(!role?.surface){if(this._coretoButtonBitmap){this.bitmap=null;this._coretoButtonBitmap.destroy();this._coretoButtonBitmap=null;}return previous.apply(this,args);}

  const old=this._coretoButtonBitmap;

  this._coretoButtonBitmap=new Bitmap(role.width,role.height);this.bitmap=this._coretoButtonBitmap;

  drawPictureSurface(this,role,{});this._coretoPictureSignature=null;

  if(old)old.destroy();

});

function drawPictureSurface(sprite,role,state){

  const bitmap=sprite._coretoButtonBitmap;bitmap.clear();

  const rect={x:0,y:0,width:bitmap.width,height:bitmap.height};

  if(role.kind==='card')staticSurface(bitmap,rect,'paper');
  else if(role.kind==='panel')box(bitmap,0,0,rect.width,rect.height,colors.panel,colors.subtle,config.Shapes.PanelRadius);

  else buttonSurface(bitmap,rect,state.state||'default',state.selected,role.kind==='primary');

  if(role.icon)menuIcon(bitmap,role.icon,(rect.width-40)/2,(rect.height-32)/2,32,state.selected?colors.onAccent:colors.text);

}

function pictureAction(sprite,role){
  if(role.interactionPictureId){
    const id=role.interactionPictureId,index=$gameScreen.getPictureChoiceBinding?.(id)??-1;
    const find=n=>{if(n instanceof Sprite_Picture&&n._pictureId===id)return n;for(const c of n.children||[]){const found=find(c);if(found)return found;}};
    return {index,owner:find(SceneManager._scene?._spriteset?._pictureContainer||{})||sprite};
  }

  for(let n=sprite;n;n=n.parent)if(n instanceof Sprite_Picture){

    const index=$gameScreen.getPictureChoiceBinding?.(n._pictureId)??-1;if(index>=0)return {index,owner:n};

  }

  return {index:-1,owner:sprite};

}

wrap(Sprite_Picture.prototype,'update',function(previous,args){

  const result=previous.apply(this,args),role=pictureRole(this);

  if(!role){if(this._pictureTextWindow)delete this._pictureTextWindow._coretoPictureInk;if(this._coretoHalo)this._coretoHalo.visible=false;if(this._coretoConceal){this.filters=(this.filters||[]).filter(f=>f!==this._coretoConceal);this._coretoConceal.destroy();this._coretoConceal=null;}return result;}

  const supplied=integrations.pictureState(this,role)||{};

  const choice=SceneManager._scene?._choiceListWindow,{index,owner}=pictureAction(this,role);

  const bound=index>=0&&!!choice?._list?.[index];

  const active=bound&&choice.active;

  const disabled=supplied.disabled??(bound&&!choice.isCommandEnabled(index));

  const selected=supplied.selected??(active&&choice.index()===index);

  const over=(active||supplied.active)&&pointerOver(owner);

  const pressed=(active||supplied.active)&&((over&&TouchInput.isPressed())||(selected&&Input.isPressed('ok')));

  const state=disabled?'disabled':pressed?'pressed':over?'hover':selected?'selected':'default';

  if(role.surface){

    // Correct only the UI surfaces opted into the adapter; authored artwork is untouched.

    // PictureChoices retains ownership of authored tones.

    if(!this._coretoButtonBitmap){this._coretoButtonBitmap=new Bitmap(role.width,role.height);this._coretoPictureSignature=null;}

    const signature=JSON.stringify([role,state,selected]);

    if(signature!==this._coretoPictureSignature){

      this._coretoPictureSignature=signature;drawPictureSurface(this,role,{state,selected});

      if(this._pictureTextWindow){

        this._pictureTextWindow._coretoPictureInk=!disabled&&(selected||pressed||role.kind==='primary')?colors.onAccent:null;

        $gameScreen.requestPictureTextRefresh?.(this._pictureId);this.drawPictureText?.();this.attachPictureText?.();

      }

    }

    this.bitmap=this._coretoButtonBitmap;

  }

  return result;

});

wrap(Window_Base.prototype,'changeTextColor',function(previous,args){

  if(this._coretoPictureInk)args[0]=this._coretoPictureInk;return previous.apply(this,args);

});

wrap(Sprite_Picture.prototype,'destroy',function(previous,args){

  if(this._coretoHalo&&!this._coretoHalo._destroyed){this._coretoHalo.bitmap=null;this._coretoHalo.destroy();}this._coretoHalo=null;

  if(this._coretoConceal){this.filters=(this.filters||[]).filter(f=>f!==this._coretoConceal);this._coretoConceal.destroy();}

  const bitmap=this._coretoButtonBitmap;this._coretoButtonBitmap=null;if(bitmap)this.bitmap=null;const result=previous.apply(this,args);if(bitmap)bitmap.destroy();return result;

});





// ---- api ----
function registerAdapter(adapter){

  for(const key of Object.keys(integrations))if(typeof adapter[key]==='function')integrations[key]=adapter[key];

}

function style(role){

  if(role==='Dialogue')return {Face:$gameSystem.mainFontFace(),Size:$gameSystem.mainFontSize(),Line:$gameSystem.mainFontSize()+6};

  if(role==='ChoiceText')return {...config.ChoiceText,Line:providers.message?Number(globalThis.VisuMZ?.MessageCore?.Settings?.General?.ChoiceWindowLineHeight||24):24};

  const value=config[role];if(!value)throw Error('Unknown Coreto style: '+role);return {...value};

}

function measure(bitmap,text,width,role='Helper'){

  const s=style(role),saved=Object.fromEntries(['fontFace','fontSize','fontBold','fontItalic','outlineWidth','outlineColor','textColor'].map(k=>[k,bitmap[k]]));

  textStyle(bitmap,s.Face,s.Size,colors.text);

  const lines=[];for(const p of String(text).split('\n')){

    let line='';for(const word of p.split(/\s+/)){const next=line?line+' '+word:word;if(line&&bitmap.measureTextWidth(next)>width){lines.push(line);line=word;}else line=next;}lines.push(line);

  }

  Object.assign(bitmap,saved);

  return {lines,width:Math.max(0,width),height:lines.length*s.Line,lineHeight:s.Line};

}

function drawCard(bitmap,rect,text='',context='paper'){

  staticSurface(bitmap,rect,context);

  const s=style('Helper'),layout=measure(bitmap,text,rect.width-config.Card.TextInset-config.Card.PaddingRight,'Helper');

  textStyle(bitmap,s.Face,s.Size,colors.text);

  layout.lines.forEach((line,i)=>bitmap.drawText(line,rect.x+config.Card.TextInset,rect.y+config.Card.PaddingY+i*s.Line,layout.width,s.Line));

  return layout.height+config.Card.PaddingY*2;

}

globalThis.CoretoDesignSystem=Object.freeze({version:'1.2.0',colors,fonts,config,style,measure,registerAdapter,

  drawButton,drawField,drawCard,drawIcon:menuIcon,drawOption,drawSaveContents,drawSaveFile,

  drawItemBackground:typeof drawItemBackground==='function'?drawItemBackground:null,

  dispose(){for(const bitmap of tintedIcons.values())bitmap.destroy();tintedIcons.clear();}

});


})();
