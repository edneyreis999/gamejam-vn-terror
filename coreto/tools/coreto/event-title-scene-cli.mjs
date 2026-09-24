import catalog from '../../src/event-title-scene/public-api.json' with {type:'json'};
import {complementHelp,executeComplementCli} from './complement-cli.mjs';
export const eventTitleSceneHelp=()=>complementHelp(catalog);
export const executeEventTitleSceneCli=(...args)=>executeComplementCli(catalog,...args);
