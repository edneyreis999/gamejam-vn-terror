import catalog from '../../src/battle-core/public-api.json' with {type:'json'};
import {complementHelp,executeComplementCli} from './complement-cli.mjs';
export const battleHelp=()=>({...complementHelp(catalog),tags:'tags list|set|remove --target skills:ID|items:ID|actors:ID|classes:ID|weapons:ID|armors:ID|enemies:ID|states:ID|map:ID|troop:ID/name|troop:ID/page:N/comment:N|animation:ID. set/remove require --tag <key> and --expected-hash from tags list; set accepts --value <json> or --input <file>. --occurrence N selects a zero-based duplicate.',limits:catalog.limits});
export const executeBattleCli=(...args)=>executeComplementCli(catalog,...args);
