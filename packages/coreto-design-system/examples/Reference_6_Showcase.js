/*:
 * @target MZ
 * @plugindesc Coreto DesignSystem reference consumer — no campaign plugins.
 * @base Coreto_5_DesignSystem
 * @help
 * Enable only in a disposable MZ project. Replaces the title with a component
 * gallery. Arrow keys move focus; Enter toggles a seal. No save data is written.
 */
(() => {
  'use strict';
  const theme=CoretoDesignSystem;
  Input.keyMapper[117]='referenceOptions';
  Input.keyMapper[118]='referenceSaves';
  Input.keyMapper[119]='referenceReading';
  const localized=(en,pt)=>ConfigManager.textLocale==='Portuguese'?pt:en;
  class ReferenceCommands extends Window_Command {
    makeCommandList() {
      this.addCommand(localized('Choose path','Escolher caminho'),'choice');
      this.addCommand(localized('Hero name','Nome do herói'),'secondary');
      this.addCommand('Menu','secondary');
      this.addCommand(localized('Unavailable','Indisponível'),'choice',false);
    }
    itemHeight(){return 64;}
    drawItem(index) {
      const rect=this.itemRect(index);
      theme.drawLabel(this,this.commandName(index),rect,{feedback:this.commandSymbol(index),
        focused:this.active&&this.index()===index,enabled:this.isCommandEnabled(index),
        checked:this._marked===index,support:index===1},'Action');
    }
    processOk(){if(!this.isCurrentItemEnabled())return this.playBuzzerSound();this._marked=this._marked===this.index()?null:this.index();this.refresh();}
  }
  class ReferenceScene extends Scene_MenuBase {
    create() {
      super.create();
      const sheet=new Sprite(new Bitmap(Graphics.boxWidth,Graphics.boxHeight));this.addChildAt(sheet,this.getChildIndex(this._windowLayer));this._sheet=sheet;
      this._commands=new ReferenceCommands(new Rectangle(60,190,420,292));this.addWindow(this._commands);this._commands.activate();
      ImageManager.loadSystem(theme.config.PaperImage).addLoadListener(()=>this.paint());
    }
    paint() {
      const b=this._sheet.bitmap;b.clear();b.fillAll(theme.config.Surfaces.border);
      theme.drawParchment(b,36,24,Graphics.boxWidth-72,Graphics.boxHeight-48);
      theme.drawLabel({contents:b},'Coreto · DesignSystem '+theme.version,{x:64,y:48,width:1120,height:64},{},'Title');
      theme.drawLabel({contents:b},localized('F6 Options · F7 Saves · F8 Reading','F6 Opções · F7 Saves · F8 Leitura'),{x:64,y:118,width:1120,height:48},{},'Helper');
      theme.drawChoiceCard(b,{x:510,y:180,width:Graphics.boxWidth-570,height:300},{title:localized('The old trail (2/5)','A trilha antiga (2/5)'),
        description:localized('The description stays stable while the action receives focus.','A descrição permanece estável enquanto a ação recebe foco.'),
        cta:localized('Choose path','Escolher caminho'),state:{focused:true,checked:true}});
      const modes=[{label:localized('Selected','Selecionado'),state:{checked:true}},{label:localized('Focused','Em foco'),state:{focused:true}},{label:localized('Unavailable','Indisponível'),state:{enabled:false,checked:true}}];
      modes.forEach(({label,state},i)=>theme.drawLabel({contents:b},label,{x:70+i*(Graphics.boxWidth-140)/3,y:Graphics.boxHeight-210,width:350,height:56},{...state,feedback:'choice'},'Action'));
      theme.layoutFooter({x:70,y:Graphics.boxHeight-110,width:Graphics.boxWidth-140,height:54}).forEach((rect,i)=>theme.drawLabel({contents:b},['Menu',localized('Party 2/3','Grupo 2/3'),localized('Depart','Partir')][i],rect,{feedback:i===1?'none':'secondary'},'Action',rect.align));
    }
    update() {
      super.update();
      if(Input.isTriggered('referenceOptions'))SceneManager.push(Scene_Options);
      if(Input.isTriggered('referenceSaves'))SceneManager.push(Scene_Load);
      if(Input.isTriggered('referenceReading'))SceneManager.push(ReferenceReading);
    }
    terminate(){this._sheet.bitmap.destroy();super.terminate();}
  }
  class ReferenceReading extends Scene_Message {
    create() {
      super.create();this.createWindowLayer();this.createAllWindows();
      $gameMessage.setSpeakerName(localized('Reader','Leitor'));
      $gameMessage.add(localized('The library draws the interface. Each game owns its words and actions.','A biblioteca desenha a interface. Cada jogo mantém seus textos e ações.'));
      $gameMessage.setChoices([localized('Return to gallery','Voltar à galeria')],0,0);
      $gameMessage.setChoiceCallback(()=>{this._finished=true;});
    }
    update(){super.update();if(this._finished&&!$gameMessage.isBusy())SceneManager.pop();}
  }
  const boot=Scene_Boot.prototype.start;
  Scene_Boot.prototype.start=function(){boot.call(this);const locale=new URLSearchParams(location.search).get('locale');if(['English','Portuguese'].includes(locale))ConfigManager.textLocale=locale;DataManager.setupNewGame();SceneManager.goto(ReferenceScene);};
})();
