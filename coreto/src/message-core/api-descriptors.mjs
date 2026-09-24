import {configurationPublicField, publicDescriptor, validatePublicEntries, validateOperationalCatalog} from '../shared/public-api.mjs';
import aniCatalog from '../ani-msg-text-effects/public-api.json' with {type:'json'};
import extendedCatalog from '../ext-message-func/public-api.json' with {type:'json'};
import {describeCoreApi} from '../core-engine/api-descriptors.mjs';
import {extendedAuthoringSchema} from '../ext-message-func/authoring-catalog.mjs';

export function describeMessageApi(catalog) {
    validateOperationalCatalog(catalog);
    const schemaMap = owner => new Map(describeCoreApi(owner === extendedCatalog
        ? extendedAuthoringSchema(owner) : {...owner,tags:[],methods:[]}).map(entry => [entry.id,entry]));
    const schemas = schemaMap(catalog);
    const delegatedSchemas = new Map();
    const entries = catalog.entries.map(entry => {
        const owner = entry.delegate ? (entry.delegate.catalog==='../ani-msg-text-effects/public-api.json'?aniCatalog:extendedCatalog) : catalog;
        const source = entry.delegate ? owner.entries.find(item => item.id === entry.id) : entry;
        if (!source) throw new Error(`Missing delegated descriptor: ${entry.id}`);
        if (entry.delegate && !delegatedSchemas.has(owner)) delegatedSchemas.set(owner,schemaMap(owner));
        const schema = (entry.delegate ? delegatedSchemas.get(owner) : schemas).get(entry.id);
        return publicDescriptor(configurationPublicField({...source,...schema,
            context: schema?.context === 'browser runtime' || schema?.context === 'browser runtime; authoring is offline'
                ? source.context : schema?.context ?? source.context}, owner), 'message');
    });
    return validatePublicEntries('message', entries);
}

export function listMessageApi(catalog) {
    return describeMessageApi(catalog).map(({id, title, key, surface, plugin, availability, authoring, usages}) =>
        ({id, title, ...(key ? {key} : {}), surface, plugin, availability, authoring, ...(usages ? {usages} : {})}));
}

export function messageHelp() {
    return {
        install: 'message install [--dry-run] [--json] configures an already delivered bundle and materializes own parameters.',
        configuration: 'CoretoConfigSource: inherit lê toda a entrada original, mesmo desativada; own usa os parâmetros próprios. Install e a primeira edição funcional em inherit materializam own. Editar apenas o seletor não copia valores.',
        usage: 'node tools/coreto/cli.mjs message api list | message api describe <id|name|path> [--json]',
        discovery: 'message api list | message api describe <id|name|path>',
        implemented: ['install', 'api list', 'api describe', 'language create', 'language convert', 'language validate', 'parameters get', 'parameters set', 'parameters reset', 'commands list', 'commands insert', 'commands update', 'commands remove', 'text get', 'text set', 'text validate', 'tags list', 'tags set', 'tags remove'],
        commands: 'message commands list|insert|update|remove --target <event selector> --command <ID> --index I|--before I [--value <json>] [--dry-run]',
        language: 'message language create|convert|validate [--format csv|tsv] [--name basename] [--from source.csv]',
        parameters: 'message parameters get|set|reset --path /Group/Field [--value <json>] [--dry-run]',
        text: 'message text get|set|validate --target map:M/event:E/page:P --index I [--path text|speaker|choices|choice:N|zone] [--value <json>] [--dry-run]',
        tags: 'message tags list|set|remove --target map:M/event:E/page:P/text:I/text --tag MSG-RX-NNN [--value <json>] [--occurrence N] [--dry-run]',
        examples: ['message api describe MSG-M-067 --json', 'message api describe /General/MessageRows --json',
            'message api describe SelectSkill --json', 'message api describe CCE-RX-001 --json',
            'message parameters get --path /General/MessageRows', 'message commands list --target common-event:1', 'message text get --target map:1/event:1/page:1 --index 0', 'message language create --format tsv', 'message language convert --from Languages.csv --format tsv'],
        writing: 'Descoberta e validação são somente leitura. Idiomas são criados na raiz sem sobrescrever arquivos; a conversão preserva o CSV. A autoria escreve diretamente, salvo --dry-run; recarregue no editor antes de salvar. Nenhuma operação executa o jogo ou parâmetros JS.',
        compatibility: 'Consulte dependências e limites em api describe. Métodos de runtime são usados no jogo; somente as operações listadas em implemented podem ser executadas pela CLI.',
        exitCodes: {0: 'sucesso', 2: 'uso inválido', 3: 'entrada ausente', 4: 'conflito ou identificador ambíguo', 5: 'falha de IO', 6: 'operação indisponível'}
    };
}
