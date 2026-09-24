import {join} from 'node:path';
import {configurationSelection,resolvePluginConfiguration} from '../../src/shared/plugin-configuration.mjs';
import {parsePluginsFile,replacePlugin} from './plugins-file.mjs';
import {readSnapshot,writeSnapshot,hash} from './files.mjs';

export const configurationPlugins = [
    'Coreto_0_CoreEngine', 'Coreto_1_MessageCore', 'Coreto_2_VNPictureBusts',
    'Coreto_2_ExtMessageFunc', 'Coreto_2_AniMsgTextEffects',
    'Coreto_1_OptionsCore', 'Coreto_1_SaveCore', 'Coreto_2_PictureChoices', 'Coreto_3_ChoiceCmnEvts', 'Coreto_4_EventTitleScene', 'Coreto_4_AttachedPictures', 'Coreto_4_MessageVisibility'
];

export async function migrateConfiguration(root,{dryRun=false}={}) {
    const snapshot=await readSnapshot(join(root,'js/plugins.js'),root);
    let source=snapshot.content.toString('utf8');
    const changes=[];
    for(const pluginId of configurationPlugins){
        const parsed=parsePluginsFile(source),index=parsed.plugins.findIndex(plugin=>plugin.name===pluginId);
        if(index<0)continue;
        const catalog={pluginId,reference:{pluginId:pluginId.replace('Coreto_','VisuMZ_')}};
        const before=resolvePluginConfiguration(catalog,parsed.plugins);
        if(!before.migrationRequired)continue;
        const plugin=parsed.plugins[index],parameters={...plugin.parameters,CoretoConfigSource:before.configuredSource};
        if(before.format==='vn-legacy')delete parameters.ConfigurationSource;
        source=replacePlugin(parsed,index,{...plugin,parameters});
        changes.push({pluginId,before:{...configurationSelection(catalog,plugin.parameters),effectiveSource:before.effectiveSource},
            after:{configuredSource:before.configuredSource,effectiveSource:before.effectiveSource,format:'canonical',migrationRequired:false}});
    }
    const migrationRequired=changes.length>0;
    const result={file:snapshot.file,migrationRequired,changed:false,written:false,dryRun,affectedPluginIds:changes.map(change=>change.pluginId),changes,
        beforeHash:snapshot.hash,proposedHash:hash(source),afterHash:snapshot.hash};
    if(migrationRequired&&!dryRun)Object.assign(result,await writeSnapshot(snapshot,source),{changed:true,written:true});
    return result;
}
