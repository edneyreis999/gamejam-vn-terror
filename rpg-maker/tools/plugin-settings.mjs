import { readFile } from 'node:fs/promises';
import path from 'node:path';

// RPG Maker serializes a JSON array inside this generated JavaScript envelope.
// Parse that data without executing plugin configuration or plugin code.
export function parsePluginList(source) {
  const match = /^(?:\s|\/\/[^\r\n]*(?:\r?\n|$))*var\s+\$plugins\s*=\s*(\[[\s\S]*\])\s*;\s*$/.exec(source);
  if (!match) throw new Error('Formato de js/plugins.js inválido; salve a configuração pelo Plugin Manager.');
  const plugins = JSON.parse(match[1]);
  if (!Array.isArray(plugins)) throw new Error('A lista de plugins deve ser um array.');
  return plugins;
}

export async function readPluginParameters(project, name) {
  const plugins = parsePluginList(await readFile(path.join(project, 'js/plugins.js'), 'utf8'));
  const entries = plugins.filter(plugin => plugin?.name === name);
  if (entries.length !== 1 || entries[0].status !== true) {
    throw new Error(`${name}: mantenha uma única entrada ativa no Plugin Manager.`);
  }
  return entries[0].parameters;
}
