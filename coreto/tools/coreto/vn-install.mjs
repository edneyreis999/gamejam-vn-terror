import {installConfiguredPlugin} from './configuration-authoring.mjs';

export async function installVn(root,catalog,options={}) {
    return installConfiguredPlugin(root,catalog,options);
}
