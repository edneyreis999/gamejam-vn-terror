import {configurationPublicField, publicDescriptor, validatePublicEntries, validateOperationalCatalog} from '../shared/public-api.mjs';
export function describeVnApi(catalog) {
    validateOperationalCatalog(catalog);
    const parameters = catalog.parameters.map(field => ({...field,
        writing: `Configure ${catalog.pluginId} in the MZ Plugin Manager, or run vn parameters set --path /${field.key} --value <JSON> --json with --project pointing to the MZ game. Reload the editor after writing and restart the game to load parameters. Numeric values use JSON numbers, arraynum uses an array of numbers, eval uses a JSON string containing JavaScript, and func uses a JSON string containing a function body; the CLI serializes the native note format for you.`,
        examples: [`vn parameters get --path /${field.key} --json`, ...(field.examples ?? [])]
    }));
    return validatePublicEntries('vn', [...parameters, ...catalog.commands, ...catalog.commands.flatMap(command => command.args.map(arg => ({...arg,availability: command.availability,usages:[{surface:'command-argument',command:command.key,path:`/commands/${command.key}/${arg.key}`}],examples:[`vn api describe ${command.key} --json`]}))), ...catalog.apis].map(entry => publicDescriptor({...configurationPublicField(entry, catalog), scopeLimit: catalog.limits}, 'vn')));
}
export function vnHelp() {
    return {
        usage: 'node tools/coreto/cli.mjs --project <raiz> vn install [--dry-run] [--json]',
        discovery: 'vn api list | vn api describe <id|name> [--json]',
        parameters: 'vn parameters get|set|reset --path /ScaleY [--value <json>|--input <arquivo>] [--dry-run]',
        commands: 'vn commands list|insert|update|remove --target map:M/event:E/page:P|common-event:C|troop:T/page:P --before N|--index N --command <nome> [--value <json>|--input <arquivo>]',
        validate: 'vn validate --json (somente leitura; sintaxe e referências estáticas)',
        implemented: ['api list','api describe','install','parameters get','parameters set','parameters reset','commands list','commands insert','commands update','commands remove','validate'],
        examples: ['vn install --replace --dry-run --json','vn api describe VN-C01 --json','vn parameters get --path /ScaleY','vn parameters set --path /ScaleY --value 120','vn parameters set --path /ScreenX --value \'"return 100 + arguments[0] * 40;"\'','vn commands insert --target common-event:1 --before 0 --command Fade_FadeIn --value \'{"PictureID":["1"],"Duration":"20"}\'','vn commands list --target troop:1/page:1 --json','vn validate --json'],
        configuration: 'CoretoConfigSource=inherit usa a entrada original, mesmo desativada; sem original usa a própria. own usa somente os valores próprios. O primeiro set/reset funcional em herança materializa os valores efetivos e seleciona own. Trocar ou resetar /CoretoConfigSource não copia valores; reset seleciona inherit. /ConfigurationSource e legacy-if-present são aliases de entrada antigos.',
        writing: 'Install configura um bundle já entregue, sem compilar ou copiar. --replace permanece como alias. Escrita atômica do registry. Reabra o projeto no editor antes de seu próximo save. Arrays usam JSON; expressões JavaScript são strings e nunca são executadas pela CLI.',
        positions: 'Use índices de commands list: insert herda indent; update preserva argumentos omitidos e ID legado; remove apaga o bloco357/657 completo.',
        limits: 'O runtime inclui 29 comandos, saves próprios e importação de saves anteriores. A maioria das listas limita IDs a 1–100; GraphicChange e PlayAni usam IDs exatos. A CLI não ativa ou troca Core, Message ou Battle.',
        exitCodes: {0:'sucesso',2:'uso inválido',3:'entrada ausente',4:'conflito',5:'falha de IO',6:'operação indisponível'}
    };
}
