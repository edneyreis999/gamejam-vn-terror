import catalog from '../../src/message-visibility/public-api.json' with {type:'json'};
import {complementHelp,executeComplementCli} from './complement-cli.mjs';
export const messageVisibilityHelp=()=>complementHelp(catalog);
export const executeMessageVisibilityCli=(...args)=>executeComplementCli(catalog,...args);
