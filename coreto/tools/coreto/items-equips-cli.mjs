import catalog from '../../src/items-equips-core/public-api.json' with {type: 'json'};
import {complementHelp, executeComplementCli} from './complement-cli.mjs';
import {validateProject} from './validate.mjs';
import {CoreError} from '../../src/core-engine/parameters.mjs';

export const itemsEquipsHelp = () => ({...complementHelp(catalog),
    implemented: {...complementHelp(catalog).implemented, validate: []},
    validate: 'items-equips validate --project <game> [--json]. Read-only native configuration and command diagnostics.',
    commandEditing: 'Read commands list for the native event target and fileHash. Insert before an index; update/remove require the current index and --expected-hash. Legacy receivers remain valid.',
    tags: 'tags list|set|remove --target items:ID|weapons:ID|armors:ID|skills:ID|classes:ID [--tag KEY] [--value JSON]. Each descriptor lists its supported database kinds. Mutations require --expected-hash from tags list.',
    limits: catalog.limits});

export async function executeItemsEquipsCli(positionals, values, locateProject) {
    if (positionals[1] !== 'validate') return executeComplementCli(catalog, positionals, values, locateProject);
    if (positionals.length !== 2 || Object.entries(values).some(([key, value]) => value !== false && !['project', 'json', 'help'].includes(key))) {
        throw new CoreError('INVALID_USAGE', 'Use items-equips validate --project <game> [--json].');
    }
    const result = await validateProject(await locateProject(values.project), catalog);
    if (!result.valid) throw new CoreError('VALIDATION_FAILED', 'Items validation found errors. Correct the listed targets, then run validate again.', result);
    return {operation: 'items-equips validate', result};
}
