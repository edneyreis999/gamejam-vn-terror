function installBattleEnemyAspects(settings) {
    const config=settings.Enemy,aspects=new WeakMap();
    Game_Enemy.prototype.clearBattleCoreAspects=function(){
        aspects.set(this,{name:config.AspectNameFmt.format(this.originalName()),iconIndex:config.AspectIcon,nameColor:config.AspectColor,description:''});
    };
    Game_Enemy.prototype.setupBattleCoreAspects=function(){
        this.clearBattleCoreAspects();
        const data=this.getAspectData(),enemy=this.enemy();
        const name=enemy.note.match(/<Aspect Name: (.+)>/i),icon=enemy.note.match(/<Aspect Icon: (\d+)>/i),color=enemy.note.match(/<Aspect Color: (.+)>/i);
        if(name)data.name=name[1].format(this.originalName());
        if(icon)data.iconIndex=Number(icon[1]);
        if(color)data.nameColor=color[1];
        data.description=enemy.note.match(/<Aspect Description>\s*([\s\S]*?)<\/Aspect Description>/i)?.[1]??'';
    };
    Game_Enemy.prototype.getAspectData=function(){return aspects.get(this);};
    Game_Enemy.prototype.hasAspectData=function(){return this.getAspectData().description.length>0;};
    const setup=Game_Enemy.prototype.setup;
    Game_Enemy.prototype.setup=function(...args){setup.apply(this,args);this.setupBattleCoreAspects();};
}
