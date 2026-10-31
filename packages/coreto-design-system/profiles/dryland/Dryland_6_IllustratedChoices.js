/*:
 * @target MZ
 * @plugindesc [Dryland] Illustrated native choices on shared parchment.
 * @author Dryland
 * @base Coreto_5_DesignSystem
 * @base Dryland_6_ParchmentUI
 * @orderAfter Dryland_6_ParchmentUI
 * @orderAfter Dryland_Presentation
 * @param Reunite
 * @type file
 * @dir img/pictures/
 * @default Dryland_FinalReuniteInk
 * @param Destroy
 * @type file
 * @dir img/pictures/
 * @default Dryland_FinalDestroyInk
 * @help
 * Native events retain picture placement, text, eligibility and actions.
 * Transparent controls retain their hit areas. Approaches reserve space for
 * the tallest localized description. No campaign state is stored.
 */
(() => {
  'use strict';
  if (!globalThis.CoretoDesignSystem) return;
  // One engraving is clipped into matching pieces; no alternate illustration.
  const medallion = {
    image:'Dryland_Medallion', duration:420,
    pieces:[
      [[0,0],[0.5,0],[0.47,0.22],[0.53,0.38],[0.31,0.34],[0,0.42]],
      [[0,0.42],[0.31,0.34],[0.53,0.38],[0.48,0.58],[0.52,0.68],[0.25,0.73],[0,0.65]],
      [[0,0.65],[0.25,0.73],[0.52,0.68],[0.47,0.83],[0.5,1],[0,1]],
      [[0.5,0],[1,0],[1,0.32],[0.73,0.44],[0.53,0.38],[0.47,0.22]],
      [[0.53,0.38],[0.73,0.44],[1,0.32],[1,0.76],[0.76,0.64],[0.52,0.68],[0.48,0.58]],
      [[0.52,0.68],[0.76,0.64],[1,0.76],[1,1],[0.5,1],[0.47,0.83]]
    ],
    states:{
      idle:[[-0.07,0,0],[-0.07,0,0],[-0.07,0,0],[0.07,0,0],[0.07,0,0],[0.07,0,0]],
      whole:Array.from({length:6},()=>[0,0,0]),
      broken:[[-0.16,-0.12,-0.12],[-0.22,0.02,0.09],[-0.13,0.15,-0.13],[0.14,-0.13,0.12],[0.22,0.02,-0.08],[0.15,0.16,0.14]]
    }
  };
  const sizes = {
    Dryland_Button:[208,54], Dryland_Tag:[160,44], Dryland_DestinationCard:[330,212],
    Dryland_DestinationLabel:[330,48], Dryland_SacrificeCard:[400,440],
    Dryland_ApproachPaper:[256,192], Dryland_FinalReunite:[440,100], Dryland_FinalDestroy:[440,100]
  };
  const surfaces = new Set([...Object.keys(sizes),'Dryland_Panel','Dryland_Approach','Dryland_EncounterTitle','Coreto_PartyCard','Coreto_MemorialCard']);
  const key = () => $gameMessage._drylandChoiceFocus?.key;
  const roster = () => [3,45].includes($gameMap.mapId());
  const idOf = picture => $gameScreen._pictures.indexOf(picture);
  const destination = id => id >= 75 && id <= 80;
  // SacrificeStage observes this legacy pointer contract without owning listeners.
  const createWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function() {
    createWindows.apply(this, arguments);
    this._illustratedPointerInside = true;
    this._trackIllustratedPointer = event => {
      this._illustratedPointerMoved = true;
      this._illustratedPointerInside = event.type === 'mousemove' && Graphics.isInsideCanvas(
        Graphics.pageToCanvasX(event.pageX), Graphics.pageToCanvasY(event.pageY));
    };
    document.addEventListener('mousemove', this._trackIllustratedPointer);
    document.addEventListener('mouseleave', this._trackIllustratedPointer);
  };
  const startChoices = Window_ChoiceList.prototype.start;
  Window_ChoiceList.prototype.start = function() {
    startChoices.apply(this, arguments);
    if (key()==='ending') this.select(-1);
  };
  const updateScene = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    updateScene.apply(this, arguments);
    if (key()==='ending' && this._choiceListWindow?.isOpenAndActive() && this._illustratedPointerMoved) {
      const over = sprite => (sprite instanceof Sprite_Picture &&
        ['Dryland_FinalReunite','Dryland_FinalDestroy'].includes(sprite._pictureName) && sprite.isBeingTouched()) ||
        (sprite.children || []).some(over);
      if (!this._illustratedPointerInside || !over(this._spriteset._pictureContainer)) this._choiceListWindow.select(-1);
    }
    this._illustratedPointerMoved = false;
  };
  const terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    document.removeEventListener('mousemove', this._trackIllustratedPointer);
    document.removeEventListener('mouseleave', this._trackIllustratedPointer);
    return terminate.apply(this, arguments);
  };
  CoretoDesignSystem.registerAdapter({
    picturePresentation(picture, sprite) {
      const name = picture?.name() || sprite?._pictureName;
      if (name === 'Dryland_TitleText') return {surface:true,neutral:true,width:800,height:220,kind:'wordmark',feedback:'none',group:'none',
        headingLines:[TextManager.getLocalizedText('title.heading'),TextManager.getLocalizedText('title.subheading')]};
      if (name?.startsWith('Dryland_Memorial_H')) return {neutral:true,group:'sheet'};
      if (name==='Dryland_Gravestone') return {surface:true,neutral:true,width:1120,height:1404,kind:'illustration',group:'sheet',sourceFrame:{x:0,y:0,width:1120,height:850}};
      if (name==='Coreto_MemorialCard') return {surface:true,neutral:true,width:330,height:265,kind:'card',group:'sheet',feedback:'none'};
      if (key()==='approaches' && name?.startsWith('Dryland_Vignette_')) {
        return {neutral:true, interactionPictureId:idOf(picture)-3};
      }
      if(name==='Dryland_DestinationGroup')return {group:'panel',neutral:true};
      if(!surfaces.has(name))return null;
      const final = name==='Dryland_FinalReunite'||name==='Dryland_FinalDestroy';
      const choice = final||['Dryland_DestinationLabel','Dryland_SacrificeCard','Dryland_ApproachPaper'].includes(name);
      const kind = final ? 'button' : ({Dryland_Tag:'tag',Dryland_Button:'button',Dryland_Panel:'panel',Dryland_EncounterTitle:'heading',Dryland_ApproachPaper:'approach'})[name]||'card';
      const id = idOf(picture);
      const slot = roster() ? ({40:'footer-center',42:'footer-start',43:'footer-end'})[id] :
        key()==='sacrifice' && kind==='heading' ? 'panel-heading' : undefined;
      return {surface:true,neutral:true,width:sizes[name]?.[0],height:sizes[name]?.[1],kind,
        feedback:final ? 'secondary' : $gameMap.mapId()===3 && id===40 ? 'none' : choice?'choice':['tag','button'].includes(kind)?'secondary':'none',
        support:kind==='tag',group:kind==='tag'?'none':'panel',slot,
        detailFocus:key()==='destinations' && id>=75 && id<=77,
        preview:final ? {...medallion, state:name==='Dryland_FinalReunite'?'whole':'broken',
          description:'$[ui.medallion.'+(name==='Dryland_FinalReunite'?'restore':'destroy')+'.description]'} : undefined};
    },
    pictureText(picture, zone, raw) {
      const id = idOf(picture);
      if (['Dryland_FinalReunite','Dryland_FinalDestroy'].includes(picture?.name())) {
        return zone==='center' ? '\\HexColor<#360a0b>\\FS[22]$[ui.medallion.'+
          (picture.name()==='Dryland_FinalReunite'?'restore':'destroy')+']' : '';
      }
      if(roster() && id===42 && zone==='center')return '\\HexColor<#360a0b>\\FS[22]$[ui.menu]';
      if(key()!=='destinations' || !destination(id))return raw;
      if(id<=77 && zone==='upperleft') {
        const index=id-75;
        if(!raw.includes('$[dest.'+['physical','supernatural','final'][index]+'.desc]'))return raw;
        return '<WordWrap>\\HexColor<#360a0b>\\FS[21]\\V['+(173+index)+'] (\\V['+(179+index)+']/\\V['+(182+index)+'])<br><br>\\FS[19]$[dest.'+['physical','supernatural','final'][index]+'.desc]';
      }
      if(id>=78 && zone==='center') {
        const value=String($gameVariables.value(176+id-78));
        const actionable=/dest.status.(available|selected)|ui.destination.choose/.test(value);
        const label=actionable?'$[ui.destination.choose]':value;
        return '\\HexColor<#360a0b>\\FS[20]'+label;
      }
      return raw;
    },
    pictureContext: () => {
      const key=$gameMessage._drylandChoiceFocus?.key;
      return ['formation','camp'].includes(key)?'roster':key;
    },
    pictureIndicator: sprite => sprite._drylandConversationBubble
  });
})();
