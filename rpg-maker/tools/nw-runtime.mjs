// Onde está o NW.js e com que ambiente abri-lo. No macOS, o plist do NW da Steam define
// MallocNanoZone=0, ligado a SIGABRT na abertura; por isso o binário é executado direto e sem a variável.
import { existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const STEAM_APP = path.join('Steam', 'steamapps', 'common', 'RPG Maker MZ');

function defaultCandidates() {
  if (process.platform === 'darwin') {
    return [path.join(
      os.homedir(), 'Library', 'Application Support', STEAM_APP,
      'RPGMZ.app', 'Contents', 'Resources', 'nwjs-mac', 'nwjs.app', 'Contents', 'MacOS', 'nwjs'
    )];
  }
  if (process.platform === 'win32') {
    const programFiles = process.env['ProgramFiles(x86)'] ?? 'C:\\Program Files (x86)';
    return ['nw.exe', 'Game.exe'].map(name => path.join(programFiles, STEAM_APP, 'nwjs-win', name));
  }
  return [];
}

export function nwExecutable() {
  const configured = process.env.CORETO_NWJS;
  if (configured) {
    if (!existsSync(configured)) throw new Error(`CORETO_NWJS aponta para um arquivo inexistente: ${configured}`);
    return configured;
  }
  const candidates = defaultCandidates();
  const found = candidates.find(existsSync);
  if (found) return found;
  const tried = candidates.length ? `\nProcurado em:\n  ${candidates.join('\n  ')}` : '';
  throw new Error(`NW.js não encontrado. Defina CORETO_NWJS com o caminho do executável.${tried}`);
}

export function nwEnvironment() {
  const env = { ...process.env };
  if (process.platform === 'darwin') delete env.MallocNanoZone;
  return env;
}
