import catalog from '../../src/choice-common-events/public-api.json' with {type:'json'};
import {complementHelp,executeComplementCli} from './complement-cli.mjs';
export const choiceCommonEventsHelp=()=>complementHelp(catalog);
export const executeChoiceCommonEventsCli=(...args)=>executeComplementCli(catalog,...args);
