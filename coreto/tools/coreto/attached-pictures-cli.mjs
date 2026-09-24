import catalog from '../../src/attached-pictures/public-api.json' with {type:'json'};
import {complementHelp,executeComplementCli} from './complement-cli.mjs';
export const attachedPicturesHelp=()=>complementHelp(catalog);
export const executeAttachedPicturesCli=(...args)=>executeComplementCli(catalog,...args);
