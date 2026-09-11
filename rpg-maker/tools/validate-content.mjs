import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { defaultProject, layoutErrors, localAssets, nativeFiles } from './native-layout.mjs';
import { readPluginParameters } from './plugin-settings.mjs';

const require = createRequire(import.meta.url);
const { parseEventCatalog } = require('../The Dryland Drowned/js/plugins/Dryland_EventBridge.js');
const args = process.argv.slice(2);
let project = defaultProject;
let json = false;
let valid = true;
let projectSpecified = false;
for (let index = 0; index < args.length; index++) {
  if (args[index] === '--json' && !json) json = true;
  else if (args[index] === '--project' && !projectSpecified && args[index + 1] && !args[index + 1].startsWith('--')) {
    project = path.resolve(args[++index]);
    projectSpecified = true;
  } else valid = false;
}
let errors;
if (!valid) {
  errors = [{ code: 'invalid_arguments' }];
  process.exitCode = 2;
} else {
  try {
    const commonEvents = JSON.parse(await readFile(path.join(project, 'data/CommonEvents.json'), 'utf8'));
    const system = JSON.parse(await readFile(path.join(project, 'data/System.json'), 'utf8'));
    const assets = await localAssets(project);
    let configurationErrors = [];
    try {
      await readPluginParameters(project, 'Dryland_EventBridge');
    } catch (error) {
      configurationErrors = [{ code: 'invalid_plugin_configuration', message: error.message }];
    }
    errors = parseEventCatalog(commonEvents, { ...system, drylandAssets: assets }).violations;
    if (errors.length === 0) errors = configurationErrors;
    if (errors.length === 0) {
      const manifest = JSON.parse(await readFile(path.join(project, 'native-layout-manifest.json'), 'utf8'));
      errors = layoutErrors(manifest, await nativeFiles(project), assets);
    }
  } catch {
    errors = [{ code: 'project_unreadable' }];
  }
  process.exitCode = errors.length ? 1 : 0;
}
const result = { ok: errors.length === 0, errors };
console.log(json ? JSON.stringify(result) : (result.ok ? 'Conteúdo e revisão nativa válidos.' : errors.map(error => error.message || `${error.code}${error.id ? ': ' + error.id : ''}`).join('\n')));
