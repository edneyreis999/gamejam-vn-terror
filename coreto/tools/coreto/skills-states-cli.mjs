import catalog from '../../src/skills-states-core/public-api.json' with {type: 'json'};
import {CoreError} from '../../src/core-engine/parameters.mjs';
import {validateProject} from './validate.mjs';
import {complementHelp, executeComplementCli} from './complement-cli.mjs';

export const skillsStatesHelp = () => ({...complementHelp(catalog),
    implemented: {...complementHelp(catalog).implemented, validate: []},
    validate: 'skills-states validate --project <game> --json reads configuration, native commands/tags and active provider dependencies without running authored JavaScript or writing files.',
    tags: 'tags list|set|remove --target TYPE:ID; supported owners include skills and trait objects, as listed by api describe. Discover tag IDs with api list. mp-cost and sort-priority take JSON integers; other tags take a complete native tag string. Supply --expected-hash from tags list. The native skill notes remain authoritative.',
    limits: catalog.limits});
export async function executeSkillsStatesCli(positionals, values, locateProject) {
    if (positionals[1] !== 'validate') return executeComplementCli(catalog, positionals, values, locateProject);
    if (positionals.length !== 2 || Object.entries(values).some(([key,value]) => value !== false && !['project','json','help'].includes(key))) {
        throw new CoreError('INVALID_USAGE', 'Use skills-states validate [--project <game>] [--json]; validation accepts no editing arguments.');
    }
    const result = await validateProject(await locateProject(values.project), catalog);
    if (!result.valid) throw new CoreError('VALIDATION_FAILED', 'SkillsStates validation found errors. Correct the listed targets, then run validate again.', result);
    return {operation: 'skills-states validate', result};
}
