import fs from 'node:fs';
import path from 'node:path';

export function loadProfile({packageRoot, plugins, read, sha, fail}) {
  const manifest = JSON.parse(fs.readFileSync(path.join(packageRoot, 'manifest.json')));
  const asset = relative => {
    const bytes = fs.readFileSync(path.join(packageRoot, relative));
    if (manifest.files[relative] !== sha(bytes)) fail('Hash do pacote divergente: ' + relative, 4);
    return bytes;
  };
  const profile = JSON.parse(asset('profiles/dryland/profile.json'));
  for (const name of profile.required) {
    if (plugins.filter(p => p.name === name && p.status).length !== 1 || !read('js/plugins/' + name + '.js')) {
      fail('Perfil Dryland requer um provedor instalado e ativo: ' + name, 3);
    }
  }
  const files = profile.files.map(file => {
    const bytes = asset(file.source), current = read(file.destination);
    const known = current && (file.recognized.includes(sha(current)) ||
      file.destination.endsWith('.js') && file.recognized.includes(sha(current.toString().replaceAll('\r\n', '\n'))));
    if (current && !current.equals(bytes) && !known) {
      fail('Personalização conflitante: ' + file.destination, 4);
    }
    return {file: file.destination, bytes};
  });
  return {...profile, files};
}

export function configureProfile(profile, {get, set, fail}) {
  for (const setting of profile.settings) {
    const current = get(setting.namespace, setting.path);
    if (String(current) === String(setting.value)) continue;
    if (String(current) !== String(setting.legacy)) {
      fail('Personalização conflitante: ' + setting.namespace + ' ' + setting.path, 4);
    }
    set(setting.namespace, setting.path, setting.value);
  }
}

export function registerProfile(profile, reg, fail) {
  for (const adapter of profile.adapters) {
    const entries = reg.plugins.filter(p => p.name === adapter.name);
    if (entries.length > 1) fail('Adaptador duplicado: ' + adapter.name, 4);
    const current = entries[0];
    const parameters = {...adapter.parameters, ...current?.parameters};
    if (current) reg.plugins.splice(reg.plugins.indexOf(current), 1);
    const dependency = reg.plugins.findLastIndex(p => p.status &&
      ['Coreto_5_DesignSystem', 'Dryland_Presentation', 'Dryland_6_ParchmentUI'].includes(p.name));
    reg.plugins.splice(dependency + 1, 0, {...adapter, parameters});
  }
}

export function addTranslations(text, entries, fail) {
  const lines = text.split(/\r?\n/), columns = lines[0].replace(/^\ufeff/, '').split('\t');
  for (const entry of entries) {
    const existing = lines.find(line => line.split('\t')[0] === entry.key)?.split('\t');
    if (existing) {
      for (let i = 1; i < columns.length; i++) {
        if (entry[columns[i]] !== undefined && existing[i] !== entry[columns[i]]) {
          fail('Tradução personalizada conflitante: ' + entry.key + ' / ' + columns[i], 4);
        }
      }
      continue;
    }
    text += (text.endsWith('\n') ? '' : '\n') +
      [entry.key, ...columns.slice(1).map(locale => entry[locale] || '')].join('\t') + '\n';
  }
  return text;
}
