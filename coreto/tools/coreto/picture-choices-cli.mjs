import catalog from '../../src/picture-choices/public-api.json' with {type:'json'};
import {complementHelp,executeComplementCli} from './complement-cli.mjs';
export const pictureChoicesHelp=()=>complementHelp(catalog);
export const executePictureChoicesCli=(...args)=>executeComplementCli(catalog,...args);
