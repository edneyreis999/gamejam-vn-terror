import {stateTooltipsHelp,executeStateTooltipsCli} from './state-tooltips-cli.mjs';
import {skillsStatesHelp,executeSkillsStatesCli} from './skills-states-cli.mjs';
import {designSystemHelp,executeDesignSystemCli} from './design-system-cli.mjs';
import {skillsHelp,executeSkillsCli} from './skills-cli.mjs';
import {battleHelp,executeBattleCli} from './battle-cli.mjs';
import {mainMenuHelp,executeMainMenuCli} from './main-menu-cli.mjs';
import {itemsEquipsHelp,executeItemsEquipsCli} from './items-equips-cli.mjs';
import {eventsMoveHelp,executeEventsMoveCli} from './events-move-cli.mjs';
import {eventTitleSceneHelp,executeEventTitleSceneCli} from './event-title-scene-cli.mjs';
import {messageVisibilityHelp,executeMessageVisibilityCli} from './message-visibility-cli.mjs';
import {attachedPicturesHelp,executeAttachedPicturesCli} from './attached-pictures-cli.mjs';
import {choiceCommonEventsHelp,executeChoiceCommonEventsCli} from './choice-common-events-cli.mjs';
import {pictureChoicesHelp,executePictureChoicesCli} from './picture-choices-cli.mjs';
import {optionsSaveHelp,executeOptionsSaveCli} from './options-save-cli.mjs';
import {aniHelp,executeAniCli} from './ani-message-cli.mjs';
import {installVn} from './vn-install.mjs';
import {installConfiguredPlugin,configurationParameterOperation} from './configuration-authoring.mjs';
import {migrateConfiguration,configurationPlugins} from './configuration-migrate.mjs';
import {vnAuthoringCatalog,vnParameterOperation} from './vn-authoring.mjs';
import {validateVnProject} from './vn-validate.mjs';
import {describeVnApi, vnHelp} from '../../src/vn-picture-busts/api-descriptors.mjs';
import { readFile, access } from "node:fs/promises";
import { resolve, dirname, join } from "node:path";
import { parseArgs } from "node:util";
import { CoreError, parameterAt, encodeValue } from "../../src/core-engine/parameters.mjs";
import {describeCoreApi} from "../../src/core-engine/api-descriptors.mjs";
import {describeMessageApi, listMessageApi, messageHelp} from "../../src/message-core/api-descriptors.mjs";
import { projectRoot, isMainModule, nodeCommand } from "../project.mjs";
import { readSnapshot, writeSnapshot, hash } from "./files.mjs";
import { commandFileOperation, validateReferences } from "./commands.mjs";
import { validateProject } from "./validate.mjs";
import { textFileOperation } from "./texts.mjs";
import { messageAuthoringCatalog } from "./message-authoring.mjs";
import { tagFileOperation } from "./tags.mjs";

import {messageLanguageOperation} from "./message-language.mjs";
import {extendedAuthoringCatalog,describeExtendedApi,extendedParameterOperation,inspectExtendedText} from './ext-message-authoring.mjs';

const coreCatalog = JSON.parse(await readFile(new URL("../../src/core-engine/public-api.json", import.meta.url), "utf8"));

async function locateProject(explicit) {
    if (explicit) return projectRoot(explicit);
    let directory = process.cwd();
    while (true) {
        try {
            await access(join(directory, "game.rmmzproject"));
        } catch (error) {
            if (error.code !== "ENOENT") throw error;
            const parent = dirname(directory);
            if (parent === directory) throw new CoreError("PROJECT_NOT_FOUND", "Use --project <root> to select an RPG Maker MZ project.", {}, 3);
            directory = parent;
            continue;
        }
        return projectRoot(directory);
    }
}

function helpFor(positionals = []) {
    if(positionals[0]==='design-system')return designSystemHelp();
    if(positionals[0]==='skills')return skillsHelp();
    if(positionals[0]==='main-menu')return mainMenuHelp();
    if(positionals[0]==='skills-states')return skillsStatesHelp();
    if(positionals[0]==='items-equips')return itemsEquipsHelp();
    if(positionals[0]==='battle')return battleHelp();
    if(positionals[0]==='events-move')return eventsMoveHelp();
    if(['options','save'].includes(positionals[0]))return optionsSaveHelp(positionals);
    if(positionals[0]==='config') {
        if(positionals.length>2||positionals[1]&&positionals[1]!=='migrate')throw new CoreError('INVALID_USAGE','Use config migrate --help.');
        return {usage:'node tools/coreto/cli.mjs [--project <root>] config migrate [--dry-run] [--json]',
            examples:['node tools/coreto/cli.mjs --project . config migrate --dry-run --json','node tools/coreto/cli.mjs --project rpg-maker-mz config migrate --json'],
            writing:'Normalizes missing or historical configuration selectors for the existing entries named in supportedProviders, in one registry publication. Other providers are left unchanged. Preserves functional parameters, flags, order and effective source selection. Dry-run and an already normalized registry do not write. Reload the editor afterwards.',
            supportedProviders:configurationPlugins,
            implemented:['config migrate'],exitCodes:{0:'success',2:'invalid input',3:'missing target',4:'conflict; re-read before retrying',5:'IO failure'}};
    }
    if(positionals[0]==='ani-message')return aniHelp(positionals);
    if (positionals[0] === 'message-visibility') return messageVisibilityHelp();
    if (positionals[0] === 'event-title-scene') return eventTitleSceneHelp();
    if (positionals[0] === 'attached-pictures') return attachedPicturesHelp();
    if (positionals[0] === 'choice-common-events') return choiceCommonEventsHelp();
    if (positionals[0] === 'picture-choices') return pictureChoicesHelp();
    if (positionals[0] === 'vn') {
        const [, group, operation, ...rest] = positionals;
        if (group && !['api','parameters','commands','install','validate'].includes(group) || operation && !({api:['list','describe'],parameters:['get','set','reset'],commands:['list','insert','update','remove'],install:[],validate:[]}[group]??[]).includes(operation) || rest.length) throw new CoreError('INVALID_USAGE', 'Use vn api list|describe --help.');
        return vnHelp();
    }
    if (positionals[0] === 'ext-message') {
        const [,group,operation,...rest]=positionals;
        const operations={api:['list','describe'],install:[],parameters:['get','set','reset'],commands:['list','insert','update','remove'],text:['get','set','validate']};
        if(group&&!operations[group]||operation&&!operations[group]?.includes(operation)||rest.length)throw new CoreError('INVALID_USAGE','Use ext-message --help to list operations.');
        return {...messageHelp(),usage:'node tools/coreto/cli.mjs ext-message api list|describe <id> | install | parameters get|set|reset | commands list|insert|update|remove | text get|set|validate',
            install:'ext-message install [--dry-run] [--json] configures an already delivered bundle and materializes own parameters.',
            discovery:'ext-message api list | ext-message api describe <id|name|path>',
            implemented:Object.entries(operations).flatMap(([group,ops])=>ops.length?ops.map(op=>group+' '+op):[group]),
            commands:'ext-message commands list|insert|update|remove --target <selector> --command <ID> --before I|--index I [--value <json>] [--dry-run]',
            parameters:'ext-message parameters get|set|reset --path /Group/Field [--value <json>] [--dry-run]',
            text:'ext-message text get|set|validate --target <selector> --index I [--value <json>] [--dry-run]',language:undefined,tags:undefined,
            examples:['ext-message install --dry-run --json','ext-message api describe /Auto/MinimumWait --json','ext-message parameters set --path /Auto/MinimumWait --value 180','ext-message commands list --target map:1/event:1/page:1',`ext-message text set --target common-event:1 --index 0 --value '"<TAIL BL: 180>Olá"'`],
            writing:'A autoria escreve diretamente, salvo --dry-run. Recarregue o projeto no editor após escrever. Código JS é validado sem execução.',
            compatibility:'inherit lê a entrada legada, inclusive desativada. Install e a primeira edição funcional materializam own. Editar o seletor não copia valores. Recarregue no editor após escrever. O runtime exige os providers; a CLI permite preparar sua instalação.'};
    }
    if (positionals[0] === 'message' && positionals[1] === 'tooltips') return stateTooltipsHelp();
    if (positionals[0] === 'message') {
        const [, group, operation, ...rest] = positionals;
        const operations = {install: [], api: ['list', 'describe'], language: ['create', 'convert', 'validate'], parameters: ['get', 'set', 'reset'], commands: ['list', 'insert', 'update', 'remove'], text: ['get', 'set', 'validate'], tags: ['list', 'set', 'remove']};
        if (group && !operations[group] || operation && !operations[group]?.includes(operation) || rest.length) {
            throw new CoreError('INVALID_USAGE', 'Choose a published message help topic. Run message --help to list operations.');
        }
        return messageHelp();
    }
    const result = {
        namespaces:['skills-states','design-system','skills','main-menu','items-equips','events-move','battle','event-title-scene','message-visibility','attached-pictures','choice-common-events','picture-choices','core','message','vn','ext-message','ani-message','options','save','config'],
        usage: "node tools/coreto/cli.mjs [--project <root>] core parameters get|set|reset --path <path> [--value <json> | --input <file>] [--dry-run] [--json]",
        discovery: "core api list | core api describe <id>",
        install: "core install [--dry-run] [--json] (uses an already delivered bundle)",
        configuration: messageHelp().configuration,
        commands: "core commands list|insert|update|remove --target <selector> [--before <index> | --index <index>] [--command <ID>] [--value <json> | --input <file>] [--dry-run]",
        tags: "core tags list|set|remove --target <selector> [--tag <family>] [--occurrence <zero-based>] [--value <json> | --input <file>] [--dry-run]",
        examples: [
            "core api describe CE-P-Gold.GoldMax:num --json",
            "core tags list --target troop:1 --json",
            "core tags set --target actors:1 --tag max-level --value 120",
            "core tags remove --target actors:1 --tag max-level --occurrence 0",
            "core parameters get --path /Gold/GoldMax",
            "core parameters set --path /Gold/GoldMax --value 500000",
            "core parameters reset --path /Gold/GoldMax --dry-run",
            "core commands list --target map:1/event:1/page:1 --json",
            "core commands insert --target common-event:1 --before 0 --command SwitchToggleOne --value '{\"IDs\":[1]}'",
            "core commands update --target common-event:1 --index 0 --command SwitchToggleOne --value '{\"IDs\":[2]}'",
            "core commands remove --target common-event:1 --index 0 --command SwitchToggleOne"
        ],
        writing: "Writes directly unless --dry-run is set. Reload the project in the editor before its next save.",
        metadata: "ExportAllMapText, ExportAllTroopText, ExportCurMapText and ExportCurTroopText can be authored offline. When the game later reaches them in browser playtest, node tools/dev/server.mjs --project <root> provides the local service. Outputs go to .RPGMakerMZ-metadata/ only after complete extraction and a confirmed receipt; a lost response is queried by requestId without repeating the write.",
        positions: "Use indices from commands list. insert inherits the selected command's indent; select a body command or blank code 0 inside branches. update preserves arguments omitted from the payload. remove deletes the complete 357/657 block. Read the target again before retrying an interrupted write.",
        reset: "A field reset uses that field's default; a group reset uses the group's default. They can differ.",
        implemented: ["api list", "api describe", "parameters get", "parameters set", "parameters reset", "commands list", "commands insert", "commands update", "commands remove", "tags list", "tags set", "tags remove"],
        exitCodes: { 0: "success", 2: "invalid input", 3: "missing target", 4: "conflict", 5: "IO failure", 6: "unavailable capability" }
    };
    result.metadata += " PictureCoordinatesMode also authors offline; exit saves the last displayed native position through the same service.";
    result.validate = "core validate --json (read-only diagnostics; no game execution)";
    result.implemented.push("validate", "install");
    if (!positionals.length) result.integrations = 'StateTooltips (state tooltip appearance, position, vocabulary and supported windows): message api list, message api describe <id>, message tooltips --help. Authors can edit the existing external provider through message tooltips parameters and state descriptions through message tooltips tags.';
    if (!positionals.length) result.discovery += ' | config migrate [--dry-run] [--json] | message api list | message api describe <id> | vn api list | vn api describe <id> | ext-message api list | ext-message api describe <id> | ani-message api list | ani-message api describe <id>';
    const group = positionals[0] === "core" ? positionals[1] : undefined;
    const operation = positionals[2];
    const usage = {
        api: "core api list | core api describe <id|name|path> [--json]",
        parameters: "core parameters get|set|reset --path <path> [--value <json>|--input <file>] [--dry-run] [--json]",
        commands: result.commands,
        tags: result.tags,
        install: result.install,
        validate: result.validate
    };
    if (group && !usage[group]) throw new CoreError("INVALID_USAGE", `Unknown help topic: ${group}.`);
    const operations = {install: [], api: ['list', 'describe'], parameters: ['get', 'set', 'reset'], commands: ['list', 'insert', 'update', 'remove'], tags: ['list', 'set', 'remove'], validate: []};
    if (positionals[0] && positionals[0] !== 'core' || operation && !operations[group]?.includes(operation) || positionals.length > 3) {
        throw new CoreError('INVALID_USAGE', 'Choose a published core help topic. Run --help to list groups.');
    }
    result.topic = ["core", group, operation].filter(Boolean).join(" ");
    if (group) {
        result.usage = operation && group !== 'api' ? usage[group].replace(operations[group].join('|'), operation) : usage[group];
        result.examples = result.examples.filter(example => example.startsWith(`core ${group}${operation ? ` ${operation}` : ""} `));
        if (!result.examples.length) result.examples = [usage[group]];
    }
    return result;
}

function help(positionals = []) {
    if (!positionals.length) return helpFor();
    const [namespace, group, operation, id, ...rest] = positionals;
    if(namespace==='message'&&group==='tooltips'){
        const operations={parameters:['get','set','reset'],tags:['list','set','remove']};
        if(rest.length||operation&&!operations[operation]||id&&!operations[operation]?.includes(id))throw new CoreError('INVALID_USAGE','Use message tooltips --help.');
        return stateTooltipsHelp();
    }
    const info = helpFor([namespace]);
    if(namespace==='skills'){
        if(positionals.length>3||group&&!['list','describe'].includes(group)||operation&&group!=='describe')throw new CoreError('INVALID_USAGE','Use skills --help.');
        return info;
    }
    const topics = Array.isArray(info.implemented)
        ? info.implemented.map(topic => topic.startsWith(namespace+' ') ? topic.slice(namespace.length+1) : topic)
        : Object.entries(info.implemented).flatMap(([name, operations]) => operations.length
            ? operations.map(operation => name+' '+operation) : ['install', 'validate'].includes(name) ? [name] : []);
    const topic = [group, operation].filter(Boolean).join(' ');
    if (group && !topics.some(value => value === topic || !operation && value.startsWith(topic+' ')) ||
        id !== undefined && !(group === 'api' && operation === 'describe') || rest.length) {
        throw new CoreError('INVALID_USAGE', `Unknown help topic: ${positionals.join(' ')}.`, {hint:`Run ${namespace} --help to list published operations.`});
    }
    // Core has operation-specific examples; other providers publish their complete help.
    return namespace === 'core' ? helpFor(positionals.slice(0,3)) : info;
}

function locatedHelp(value) {
    if (typeof value === 'string') return value.replace(/node tools\/(?:coreto\/cli|dev\/server)\.mjs/g, command =>
        nodeCommand(command === 'node tools/coreto/cli.mjs' ? import.meta.url : new URL('../dev/server.mjs', import.meta.url)));
    if (Array.isArray(value)) return value.map(locatedHelp);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, locatedHelp(item)]));
    return value;
}

async function executeCli(args, context) {
    const { values, positionals } = parseArgs({ args, allowPositionals: true, options: {
        family: {type:"string"}, to: {type:"string"}, "expected-hash": {type:"string"},
        format: {type: "string"}, name: {type: "string"}, from: {type: "string"},
        project: { type: "string" }, path: { type: "string" }, value: { type: "string" },
        target: { type: "string" }, before: { type: "string" }, index: { type: "string" }, command: { type: "string" },
        tag: { type: "string" }, occurrence: { type: "string" },
        input: { type: "string" }, "dry-run": { type: "boolean", default: false },
        replace: {type: "boolean", default: false}, json: { type: "boolean", default: false }, help: { type: "boolean", default: false }
    } });
    context.operation = positionals.slice(0, 3).join(" ") || "help";
    context.target = values.target ?? values.path ?? positionals[3] ?? null;
    if (values.help || !positionals.length) {
        const discoveryGuide = positionals[0] === 'skills'
            ? 'Use skills list, then skills describe <name>. These operations inspect the installed package and do not accept --project; read the returned instructions path before applying a skill.'
            : positionals[0] === 'config'
                ? 'Use config migrate --help for supportedProviders and config migrate --dry-run --json with --project pointing to the game to inspect proposed selector changes.'
                : 'Choose the relevant namespace, then use api list without --json for a compact complete index. Use api describe <id> for full documentation. api list --json retains all expanded descriptors and can exceed terminal/tool output limits; use the text index if that response is truncated.';
        return {operation: 'help', result: locatedHelp({...help(positionals), discoveryGuide})};
    }
    const [namespace, group, operation, id, ...rest] = positionals;
    if(namespace==='message'&&group==='tooltips')return executeStateTooltipsCli(positionals,values,locateProject);
    if(namespace==='design-system')return executeDesignSystemCli(positionals,values,locateProject);
    if(namespace==='skills')return executeSkillsCli(positionals,values);
    if(namespace==='message-visibility')return executeMessageVisibilityCli(positionals,values,locateProject);
    if(namespace==='event-title-scene')return executeEventTitleSceneCli(positionals,values,locateProject);
    if(namespace==='attached-pictures')return executeAttachedPicturesCli(positionals,values,locateProject);
    if(namespace==='choice-common-events')return executeChoiceCommonEventsCli(positionals,values,locateProject);
    if(namespace==='picture-choices')return executePictureChoicesCli(positionals,values,locateProject);
    if(namespace==='config'){
        if(group!=='migrate'||operation||id||rest.length||Object.keys(values).some(key=>!['project','json','help','dry-run'].includes(key)&&values[key]!==false))throw new CoreError('INVALID_USAGE','Use config migrate [--dry-run] [--json].');
        return {operation:'config migrate',result:await migrateConfiguration(await locateProject(values.project),{dryRun:values['dry-run']})};
    }
    if(['core','message','vn','ext-message'].includes(namespace)&&group==='install'){
        if(operation||id||rest.length||Object.keys(values).some(key=>!['project','json','help','dry-run',...(namespace==='vn'?['replace']:[])].includes(key)&&values[key]!==false))throw new CoreError('INVALID_USAGE','Use '+namespace+' install [--dry-run] [--json].');
        const names={core:'core-engine',message:'message-core',vn:'vn-picture-busts','ext-message':'ext-message-func'};
        const raw=JSON.parse(await readFile(new URL('../../src/'+names[namespace]+'/public-api.json',import.meta.url),'utf8'));
        const catalog=namespace==='vn'?vnAuthoringCatalog(raw):namespace==='message'?messageAuthoringCatalog(raw):namespace==='ext-message'?extendedAuthoringCatalog:raw;
        return {operation:namespace+' install',result:await (namespace==='vn'?installVn:installConfiguredPlugin)(await locateProject(values.project),catalog,{dryRun:values['dry-run']})};
    }
    if(namespace==='battle')return executeBattleCli(positionals,values,locateProject);
    if(namespace==='main-menu')return executeMainMenuCli(positionals,values,locateProject);
    if(namespace==='skills-states')return executeSkillsStatesCli(positionals,values,locateProject);
    if(namespace==='items-equips')return executeItemsEquipsCli(positionals,values,locateProject);
    if(namespace==='events-move')return executeEventsMoveCli(positionals,values,locateProject);
    if(['options','save'].includes(namespace))return executeOptionsSaveCli(positionals,values,locateProject);
    if(namespace==='ani-message')return executeAniCli(positionals,values,locateProject);
    if(values.family!==undefined||values.to!==undefined||values['expected-hash']!==undefined)throw new CoreError('INVALID_USAGE','Family, destination and expected hash belong to ani-message.');
    if (namespace === 'vn' && group === 'api') {
        if (!['list', 'describe'].includes(operation)) throw new CoreError('INVALID_USAGE','Use vn api list|describe.');
        if (rest.length || (operation === 'describe') !== Boolean(id) || Object.keys(values).some(key => !['project', 'json', 'help'].includes(key) && values[key] !== false)) throw new CoreError('INVALID_USAGE', 'Use vn api list ou vn api describe <id|name> sem argumentos de edição.');
        const vnCatalog = JSON.parse(await readFile(new URL('../../src/vn-picture-busts/public-api.json', import.meta.url), 'utf8'));
        const entries = describeVnApi(vnCatalog);
        if (operation === 'list') return {operation: 'vn api list', result: entries};
        const exact = entries.find(entry => entry.id === id);
        const matches = exact ? [exact] : entries.filter(entry => entry.key === id || entry.storageKey === id || "/"+entry.key === id);
        if (matches.length > 1) throw new CoreError('AMBIGUOUS_API_ENTRY', 'Use o ID exato VN.', {candidates: matches.map(entry => entry.id)}, 4);
        if (!matches.length) throw new CoreError('TARGET_NOT_FOUND', `Entrada VN desconhecida: ${id}.`, {}, 3);
        return {operation: 'vn api describe', result: matches[0]};
    }
    const catalog = namespace === "vn" ? vnAuthoringCatalog(JSON.parse(await readFile(new URL("../../src/vn-picture-busts/public-api.json", import.meta.url), "utf8"))) : namespace === "ext-message" ? extendedAuthoringCatalog : namespace === "message" ? messageAuthoringCatalog(JSON.parse(await readFile(new URL("../../src/message-core/public-api.json", import.meta.url), "utf8"))) : coreCatalog;

    if(namespace==='ext-message'&&group==='api'){
        if(rest.length||!['list','describe'].includes(operation)||operation==='list'&&id||operation==='describe'&&!id||Object.keys(values).some(key=>!['project','json','help'].includes(key)&&values[key]!==false))throw new CoreError('INVALID_USAGE','Use ext-message api list or describe <id|name|path>.');
        const entries=describeExtendedApi();
        if(operation==='list')return {operation:'ext-message api list',result:entries};
        const exact=entries.find(entry=>entry.id===id);
        const matches=exact?[exact]:entries.filter(entry=>entry.key===id||entry.title===id||entry.aliases?.includes(id)||entry.usages?.some(usage=>usage.path===id));
        if(matches.length>1)throw new CoreError('AMBIGUOUS_API_ENTRY','Use an exact Extended ID.',{candidates:matches.map(entry=>entry.id)},4);
        if(!matches.length)throw new CoreError('TARGET_NOT_FOUND','Unknown Extended entry: '+id,{},3);
        return {operation:'ext-message api describe',result:matches[0]};
    }
    if (namespace === 'message') {
        if (group === 'language') {
            if (id || rest.length || Object.keys(values).some(key => !['project', 'json', 'help', 'format', 'name', 'from'].includes(key) && values[key] !== false)) {
                throw new CoreError('INVALID_USAGE', 'Language commands accept --format, --name and conversion --from.');
            }
            const root = await locateProject(values.project);
            return {operation: `message language ${operation}`, result: await messageLanguageOperation(root, operation, values)};
        }
        if (rest.length) throw new CoreError('INVALID_USAGE', 'Informe somente um identificador após message api describe.');
        if (group === 'api') {
        if (!['list', 'describe'].includes(operation) || operation === 'list' && id || operation === 'describe' && !id) {
            throw new CoreError('INVALID_USAGE', 'Use message api list ou message api describe <id|name|path>.');
        }
        const editing = Object.keys(values).filter(key => !['project', 'json', 'help'].includes(key) && values[key] !== false);
        if (editing.length) throw new CoreError('INVALID_USAGE', 'A descoberta não aceita argumentos de edição.', {fields: editing});
        const messageCatalog = catalog;
        if (operation === 'list') return {operation: 'message api list', result: listMessageApi(messageCatalog)};
        const entries = describeMessageApi(messageCatalog);
        const exact = entries.find(entry => entry.id === id);
        const matches = exact ? [exact] : entries.filter(entry => entry.key === id || entry.title === id ||
            entry.aliases.includes(id) || entry.usages?.some(usage => usage.path === id));
        if (matches.length > 1) throw new CoreError('AMBIGUOUS_API_ENTRY', 'Use o ID exato da entrada Message.', {field: 'id', candidates: matches.map(entry => entry.id)}, 4);
        if (!matches.length) throw new CoreError('TARGET_NOT_FOUND', `Entrada Message desconhecida: ${id}.`, {field: 'id', received: id, hint: 'Use message api list para consultar IDs e caminhos.'}, 3);
        return {operation: 'message api describe', result: matches[0]};
        }
    }
    if(values.replace)throw new CoreError('INVALID_USAGE','--replace belongs to vn install.');
    if (values.format || values.name || values.from) throw new CoreError('INVALID_USAGE', 'Language options require message language.');
    if (!["core", "message", "vn", "ext-message"].includes(namespace) || rest.length) throw new CoreError("INVALID_USAGE", "Place the plugin namespace before api: <namespace> api list or <namespace> api describe <id>. Replace <namespace> with the plugin you want; do not add a core prefix for another plugin.");
    if (group === "api" && ["list", "describe"].includes(operation)) {
        const entries = describeCoreApi(catalog);
        if (operation === "list" && !id) return { operation: "core api list", result: entries };
        const exact = entries.find(entry => entry.id === id);
        const matches = exact ? [exact] : entries.filter(entry => entry.key === id || entry.usages.some(usage => usage.path === id));
        if (matches.length > 1) throw new CoreError("AMBIGUOUS_API_ENTRY", `More than one API entry matches ${id}. Use an exact ID or path.`, {field: "id", candidates: matches.map(entry => ({id: entry.id, usages: entry.usages}))}, 4);
        const entry = matches[0];
        if (!entry || operation !== "describe") throw new CoreError("TARGET_NOT_FOUND", `Unknown API entry: ${id}.`, { field: "id", received: id }, 3);
        return { operation: "core api describe", result: entry };
    }
    if(namespace==='ext-message'&&!['parameters','commands','text'].includes(group))throw new CoreError('CAPABILITY_UNAVAILABLE','Use ext-message --help for supported operations.',{},6);
    if (group === "validate") {
        if (operation || id || Object.keys(values).some(key => !["project", "json", "help"].includes(key) && values[key] !== false)) {
            throw new CoreError("INVALID_USAGE", "Use core validate [--project <root>] [--json]; validation accepts no editing arguments.");
        }
        const result = await (namespace==='vn'?validateVnProject:validateProject)(await locateProject(values.project), catalog);
        if (!result.valid) throw new CoreError("VALIDATION_FAILED", `${namespace} validation found errors. Correct the listed targets, then run validate again.`, result);
        return {operation: `${namespace} validate`, result};
    }
    if (group === "text" && ["message","ext-message"].includes(namespace)) {
        if (!["get", "set", "validate"].includes(operation) || id || !/^(0|[1-9]\d*)$/.test(values.index ?? "")) throw new CoreError("INVALID_USAGE", "Use message text get|set|validate --target <selector> --index <head index> [--path text|speaker|choices|zone].");
        if (values.value !== undefined && values.input !== undefined) throw new CoreError("INVALID_USAGE", "Choose --value or --input.");
        const raw = values.input ? await readFile(resolve(values.input), "utf8") : values.value;
        if ((operation === "set") !== (raw !== undefined)) throw new CoreError("INVALID_USAGE", "Only text set requires a JSON value.");
        let value;
        if (raw !== undefined) {
            try { value = JSON.parse(raw); }
            catch { throw new CoreError("INVALID_JSON", "Text values must be a JSON string or array of strings."); }
        }
        return textFileOperation(await locateProject(values.project), {operation, target: values.target, index: Number(values.index), path: values.path, value, dryRun: values["dry-run"], namespace, ...(namespace==='ext-message'?{acceptedType:'message-text',inspect:inspectExtendedText}:{})});
    }
    if (group === "tags") {
        if (!["list", "set", "remove"].includes(operation) || id) throw new CoreError("INVALID_USAGE", "Use tags list, set or remove with --target.");
        if (values.value !== undefined && values.input !== undefined) throw new CoreError("INVALID_USAGE", "Choose --value or --input, not both.");
        if (operation !== "set" && (values.value !== undefined || values.input !== undefined)) throw new CoreError("INVALID_USAGE", "Payloads are only valid for tags set.");
        if (operation === "list" && values.occurrence !== undefined) throw new CoreError("INVALID_USAGE", "Use --occurrence only for set/remove after reading tags list.");
        if (operation !== "list" && !values.tag) throw new CoreError("INVALID_USAGE", "Use --tag to select the expected Core tag family.");
        if (values.occurrence !== undefined && !/^(0|[1-9]\d*)$/.test(values.occurrence)) throw new CoreError("INVALID_POSITION", "Use a zero-based decimal occurrence from tags list.", {field: "occurrence", received: values.occurrence});
        let value;
        if (operation === "set") {
            const raw = values.input ? await readFile(resolve(values.input), "utf8") : values.value;
            if (raw === undefined) throw new CoreError("INVALID_USAGE", "tags set requires --value <json> or --input <file>.");
            try { value = JSON.parse(raw); }
            catch { throw new CoreError("INVALID_JSON", "Tag values must be JSON: a number for numeric tags, or a complete tag in a JSON string.", {field: "value"}); }
        }
        return tagFileOperation(await locateProject(values.project), catalog, {operation, target: values.target, tag: values.tag,
            occurrence: values.occurrence === undefined ? undefined : Number(values.occurrence), value, dryRun: values["dry-run"]});
    }
    if (group === "commands") {
        if (!["list", "insert", "update", "remove"].includes(operation) || id) throw new CoreError("INVALID_USAGE", "Use commands list, insert, update or remove with --target.");
        if (values.value !== undefined && values.input !== undefined) throw new CoreError("INVALID_USAGE", "Choose --value or --input, not both.");
        if (["list", "remove"].includes(operation) && (values.value !== undefined || values.input !== undefined)) throw new CoreError("INVALID_USAGE", "Payloads are only valid for commands insert/update.");
        if (operation === "insert" && (values.before === undefined || values.index !== undefined) || ["update", "remove"].includes(operation) && (values.index === undefined || values.before !== undefined)) {
            throw new CoreError("INVALID_USAGE", "insert requires --before; update/remove require --index. Use an index from commands list.");
        }
        if (operation !== "list" && !values.command) throw new CoreError("INVALID_USAGE", "Use --command <ID> to identify the expected Core command.");
        if (operation !== "list" && !/^(0|[1-9]\d*)$/.test(values.before ?? values.index ?? "")) throw new CoreError("INVALID_POSITION", "Use a decimal index from commands list.", { field: "index", received: values.before ?? values.index });
        const raw = values.input ? await readFile(resolve(values.input), "utf8") : values.value;
        let value = {};
        if (raw !== undefined) {
            try { value = JSON.parse(raw); }
            catch { throw new CoreError("INVALID_JSON", "Command arguments must be a JSON object.", { field: "value" }); }
        }
        return commandFileOperation(await locateProject(values.project), catalog, {
            operation, target: values.target, command: values.command,
            index: Number(values.before ?? values.index), value, dryRun: values["dry-run"]
        });
    }
    if (group !== "parameters") throw new CoreError("CAPABILITY_UNAVAILABLE", "Run --help for supported authoring and discovery operations.", {}, 6);
    if (!["get", "set", "reset"].includes(operation) || id) throw new CoreError("INVALID_USAGE", "Use parameters get, set or reset with --path.");
    if (values.value !== undefined && values.input !== undefined) throw new CoreError("INVALID_USAGE", "Choose --value or --input, not both.");
    if (operation !== "set" && (values.value !== undefined || values.input !== undefined)) throw new CoreError("INVALID_USAGE", "--value and --input are only valid with parameters set.");
    let value;
    if (operation === "set") {
        const raw = values.input ? await readFile(resolve(values.input), "utf8") : values.value;
        if (raw === undefined) throw new CoreError("INVALID_USAGE", "parameters set requires --value <json> or --input <file>.");
        try { value = JSON.parse(raw); }
        catch { throw new CoreError("INVALID_JSON", "The parameter value must be JSON, for example --value 500000.", { field: "value", received: raw }); }
    }
    const root = await locateProject(values.project);
    const snapshot = await readSnapshot(join(root, "js/plugins.js"), root);
    const change = namespace === "ext-message" ? extendedParameterOperation(snapshot.content.toString("utf8"), { operation, path: values.path, value }) : (namespace === 'vn' ? vnParameterOperation : configurationParameterOperation)(snapshot.content.toString("utf8"), catalog, { operation, path: values.path, value });
    const result = { file: "js/plugins.js", ...change.result };
    if (operation !== "get") {
        if (namespace === 'message') {
            const field = parameterAt(catalog.parameters, values.path).chain.at(-1);
            await validateReferences(root, {key: values.path, args: [field]}, {[field.storageKey]: encodeValue(field, change.result.value, values.path)});
        }
        if (values["dry-run"]) Object.assign(result, { dryRun: true, written: false, beforeHash: snapshot.hash, proposedHash: hash(change.source), diff: [{ path: values.path, before: change.result.before, after: change.result.value }] });
        else Object.assign(result, await writeSnapshot(snapshot, change.source), { written: true });
    }
    return { operation: `${namespace} parameters ${operation}`, target: values.path, result };
}

function errorDetails(details, namespace) {
    const {discovery, diagnostics, ...rest} = details;
    const known = helpFor().namespaces.includes(namespace);
    const hint = discovery
        ? `Use ${namespace} api ${discovery.id ? 'describe '+discovery.id : 'list'} to inspect supported inputs.`
        : known && !['config','skills'].includes(namespace)
            ? `Run ${namespace} --help or ${namespace} api list to inspect supported targets and input.`
            : 'Run --help to inspect supported namespaces and input.';
    return {...rest, ...(diagnostics ? {diagnostics:diagnostics.map(item=>errorDetails(item,namespace))} : {}), hint:rest.hint ?? hint};
}

export async function runCli(args) {
    const context = { operation: null, target: null };
    try {
        const result = await executeCli(args, context);
        const namespace = context.operation.split(' ')[0];
        if (result.operation === namespace+' validate') result.result.diagnostics = result.result.diagnostics.map(item=>errorDetails(item,namespace));
        if ([namespace+' commands list',namespace+' commands get'].includes(result.operation) && Object.hasOwn(result.result,'units')) {
            result.result.units = result.result.units.map(unit=>unit.error ? {...unit,error:errorDetails(unit.error,namespace)} : unit);
        }
        return { ...context, ...result };
    } catch (error) {
        Object.assign(error, context);
        if (error.code === 'ERR_PARSE_ARGS_UNKNOWN_OPTION' && args.includes('--namespace')) {
            error.details = {hint: 'Namespace is a positional argument before api, not a flag. Use <namespace> api list or <namespace> api describe <id>.'};
        }
        if (error instanceof CoreError) {
            error.details = errorDetails(error.details, context.operation?.split(' ')[0]);
        }
        throw error;
    }
}

function textField(key, value) {
    if (value === undefined) return [];
    if (key === 'namespaces') return ['Namespaces:', ...value.map(namespace => `  ${namespace} --help`)];
    if (typeof value === 'string') return [`${key}: ${value}`];
    if (Array.isArray(value)) return [`${key}:`, ...value.map(item => '  - '+(typeof item === 'string' ? item : JSON.stringify(item, null, 2)))];
    return [`${key}: ${JSON.stringify(value, null, 2)}`];
}

export function formatText(output) {
    if (!output.ok) {
        const {code, message, hint, ...details} = output.error;
        return [`${code}: ${message}`, ...textField('Target', output.target ?? undefined),
            ...Object.entries(details).flatMap(([key,value]) => textField(key,value)), hint].filter(value=>value!==undefined).join('\n');
    }
    if (output.operation === "help") {
        return Object.entries(output.result).flatMap(([key,value]) => textField(key,value)).join('\n');
    }
    if (/^\S+ api list$/.test(output.operation) && Array.isArray(output.result)) {
        const namespace = output.operation.split(' ')[0];
        const surfaces = ['method', 'command', 'tag', 'parameter'];
        const rank = entry => surfaces.includes(entry.surface) ? surfaces.indexOf(entry.surface) : surfaces.length;
        const entries = [...output.result].sort((left, right) => rank(left) - rank(right));
        const rows = entries.map(entry => [entry.surface, entry.id, entry.label ?? entry.key,
            entry.usages?.find(usage => usage.path)?.path, entry.availability]
            .map(value => String(value ?? '').replace(/\s+/g, ' ')).join('\t'));
        return [`${output.operation} (${entries.length} entries)`,
            `Use ${namespace} api describe <id> for full documentation; --json preserves the complete catalog.`,
            'surface\tid\tname\tpath\tavailability', ...rows].join('\n');
    }
    return `${output.operation}${output.target ? ` ${output.target}` : ""}\n${JSON.stringify(output.result, null, 2)}`;
}

if (await isMainModule(import.meta.url)) {
    const args = process.argv.slice(2);
    const json = args.includes("--json");
    try {
        const result = { schemaVersion: 1, ok: true, ...await runCli(args) };
        console.log(json ? JSON.stringify(result) : formatText(result));
    } catch (error) {
        const code = error.code ?? "IO_ERROR";
        const missing = code === "ENOENT";
        const denied = code === "EACCES" || code === "EPERM";
        const invalidUsage = code.startsWith("ERR_PARSE_ARGS");
        process.exitCode = error.exitCode ?? (missing ? 3 : invalidUsage ? 2 : 5);
        const result = { schemaVersion: 1, ok: false, operation: error.operation, target: error.target, error: {
            code: error.exitCode ? code : missing ? "TARGET_NOT_FOUND" : denied ? "PERMISSION_DENIED" : invalidUsage ? "INVALID_USAGE" : "IO_FAILURE",
            message: error.message, ...error.details,
            ...(!error.exitCode && !invalidUsage ? { cause: code } : {}),
            hint: error.details?.hint ?? (process.exitCode === 5 ? "Check the file path and permissions. Read the target before retrying an interrupted write." : "Run --help to inspect supported namespaces and input."),
            ...(error.path ? { file: error.path } : {})
        } };
        (json ? console.log : console.error)(json ? JSON.stringify(result) : formatText(result));
    }
}
