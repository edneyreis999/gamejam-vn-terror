function installMainMenuImageCommands() {
    function changeActors(ids, filename) {
        for (const value of ids) {
            const id = parseInt(value) || 0;
            if (id > 0) $gameActors.actor(id)?.setMenuImage(filename);
        }
    }
    for (const receiver of [catalog.pluginId, catalog.reference.pluginId]) {
        PluginManager.registerCommand(receiver, 'ChangeActorMenuImageGroup', args => {
            changeActors(JSON.parse(args['Step1:arraynum'] || '[]'), args['Step2:str']);
        });
        PluginManager.registerCommand(receiver, 'ChangeActorMenuImageRange', args => {
            const first = Number(args['Step1Start:num']), last = Number(args['Step1End:num']);
            const start = Math.min(first, last), end = Math.max(first, last);
            for (let id = start; id <= end; id++) changeActors([id], args['Step2:str']);
        });
        PluginManager.registerCommand(receiver, 'ChangeActorMenuImageJS', args => {
            const evaluate = new Function('source', 'return eval(source);');
            const ids = JSON.parse(args['Step1:arrayeval'] || '[]').map(expression => evaluate.call(globalThis.VisuMZ, expression)).flat(1);
            changeActors(ids, args['Step2:str']);
        });
        PluginManager.registerCommand(receiver, 'ChangeActorMenuImageJS_v124', args => {
            const parameters = {...args, ActorJS: new Function(args['ActorJS:func'] === '' ? 'return null;' : JSON.parse(args['ActorJS:func'])), FilenameJS: new Function(args['FilenameJS:func'] === '' ? 'return null;' : JSON.parse(args['FilenameJS:func']))};
            const actor = $gameActors.actor(parameters.ActorJS());
            if (actor) actor.setMenuImage(parameters.FilenameJS());
            else console.log('NO ACTOR FOUND!');
        });
    }
}
