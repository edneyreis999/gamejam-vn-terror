import catalog from '../../src/main-menu-core/public-api.json' with {type: 'json'};
import {complementHelp, executeComplementCli} from './complement-cli.mjs';
import {validateProject} from './validate.mjs';
import {CoreError} from '../../src/core-engine/parameters.mjs';

export const mainMenuHelp = () => ({...complementHelp(catalog), implemented: {...complementHelp(catalog).implemented, validate: []}, validate: 'main-menu validate --project <game> [--json]. Read-only diagnostics for configuration, dependencies, load order, native targets and static picture/cursor references. JavaScript is checked but never executed.', tags: 'tags list|set|remove --target actors:ID --tag <key> [--value <json>] [--occurrence N] --expected-hash <fileHash>. Read tags list before each write; aliases and unrelated note bytes are preserved.', commandEditing: 'update changes arguments of the matching command at --index. To change the operation, remove that command and insert the new one, rereading the file hash between writes. Legacy receivers are preserved on update.', limits: catalog.limits});
export async function executeMainMenuCli(positionals, values, locateProject) {
    if (positionals[1] !== 'validate') return executeComplementCli(catalog, positionals, values, locateProject);
    if (positionals.length !== 2 || Object.entries(values).some(([key, value]) => value !== false && !['project', 'json', 'help'].includes(key))) {
        throw new CoreError('INVALID_USAGE', 'Use main-menu validate --project <game> [--json].');
    }
    const result = await validateProject(await locateProject(values.project), catalog);
    if (!result.valid) throw new CoreError('VALIDATION_FAILED', 'MainMenu validation found errors. Correct the listed targets, then run validate again.', result);
    return {operation: 'main-menu validate', result};
}
