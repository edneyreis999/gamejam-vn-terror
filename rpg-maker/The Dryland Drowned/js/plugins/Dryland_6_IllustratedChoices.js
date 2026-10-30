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
  const parameters = PluginManager.parameters('Dryland_6_IllustratedChoices');
  const sizes = {
    Dryland_Button:[208,54], Dryland_Tag:[160,44], Dryland_DestinationCard:[330,212],
    Dryland_DestinationLabel:[330,48], Dryland_SacrificeCard:[400,440],
    Dryland_ApproachPaper:[256,192], Dryland_FinalReunite:[480,570], Dryland_FinalDestroy:[480,570]
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
      this._illustratedPointerInside = event.type === 'mousemove' && Graphics.isInsideCanvas(
        Graphics.pageToCanvasX(event.pageX), Graphics.pageToCanvasY(event.pageY));
    };
    document.addEventListener('mousemove', this._trackIllustratedPointer);
    document.addEventListener('mouseleave', this._trackIllustratedPointer);
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
      if(name==='Dryland_DestinationGroup')return {group:'panel',neutral:true};
      if(!surfaces.has(name))return null;
      const final = name==='Dryland_FinalReunite'||name==='Dryland_FinalDestroy';
      const choice = final||['Dryland_DestinationLabel','Dryland_SacrificeCard','Dryland_ApproachPaper'].includes(name);
      const kind = ({Dryland_Tag:'tag',Dryland_Button:'button',Dryland_Panel:'panel',Dryland_EncounterTitle:'heading',Dryland_ApproachPaper:'approach'})[name]||'card';
      const id = idOf(picture);
      const slot = roster() ? ({40:'footer-center',42:'footer-start',43:'footer-end'})[id] :
        key()==='sacrifice' && kind==='heading' ? 'panel-heading' : undefined;
      return {surface:true,neutral:true,width:sizes[name]?.[0],height:sizes[name]?.[1],kind,
        feedback:choice?'choice':['tag','button'].includes(kind)?'secondary':'none',
        support:kind==='tag',group:kind==='tag'?'none':'panel',slot,
        image:final?(name==='Dryland_FinalReunite'?parameters.Reunite:parameters.Destroy):undefined};
    },
    pictureText(picture, zone, raw) {
      const id = idOf(picture);
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
        const selected=/dest.status.selected|✓/.test(value);
        return '\\HexColor<#360a0b>\\FS[20]'+(selected?'✓ ':'')+label;
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
