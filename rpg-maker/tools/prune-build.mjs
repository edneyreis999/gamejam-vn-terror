// Poda o build exportado pelo editor (dist/) para caber no limite de 1000 arquivos do itch.io.
// Nunca toca o projeto-fonte: o editor continua com todos os assets.
//
// Uso:
//   npm run prune-build                      relatório, não apaga nada
//   npm run prune-build -- --apply           apaga do build o que o jogo não usa
//   --build <pasta>                          outro build (padrão: dist/The Dryland Drowned)
// Depois de podar, rode `npm run verify-build`: ele testa o build podado e só então gera o zip.
//
// Regra: um asset fica se o nome dele (sem extensão, sem diferenciar maiúsculas) aparece em
// algum texto que o jogo lê — dados, parâmetros e código dos plugins ativos, Languages.tsv,
// HTML e CSS. Dados só de batalha (Enemies, Troops, Animations) contam apenas se o jogo tiver
// batalha. Efeitos ficam se uma animação alcançável os usa. Plugins desligados saem.
// Exceção: o que estiver em prune-build.keep.txt nunca sai.
import { existsSync, readFileSync, readdirSync, rmSync, rmdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const ITCH_LIMIT = 1000;
const repo = fileURLToPath(new URL('../../', import.meta.url));
const source = path.join(repo, 'rpg-maker/The Dryland Drowned');
const { values } = parseArgs({
  options: { build: { type: 'string' }, apply: { type: 'boolean' } }
});
const build = path.resolve(repo, values.build ?? 'dist/The Dryland Drowned');

if (!existsSync(path.join(build, 'index.html')) || !existsSync(path.join(build, 'js/plugins.js'))) {
  fail(`${build} não parece um build do RPG Maker MZ (faltam index.html ou js/plugins.js).`);
}
if (path.relative(source, build) === '' || existsSync(path.join(build, 'game.rmmzproject'))) {
  fail(`${build} é o projeto-fonte. Este script só poda a cópia exportada em dist/.`);
}

const read = file => readFileSync(path.join(build, file), 'utf8').replace(/^﻿/, '');
const readJson = file => JSON.parse(read(file));
const files = walk(build);

// Plugins ativos, na ordem do plugins.js.
const pluginsJs = read('js/plugins.js');
const plugins = JSON.parse(pluginsJs.slice(pluginsJs.indexOf('['), pluginsJs.lastIndexOf(']') + 1));
const enabled = new Set(plugins.filter(plugin => plugin.status).map(plugin => `js/plugins/${plugin.name}.js`));

// Listas de comandos que o jogo pode executar fora de batalha.
const dataFiles = readdirSync(path.join(build, 'data')).filter(file => file.endsWith('.json'));
const maps = dataFiles.filter(file => /^Map\d+\.json$/.test(file)).map(file => readJson(`data/${file}`));
const commonEvents = readJson('data/CommonEvents.json');
const lists = [
  ...commonEvents.filter(Boolean).map(event => event.list),
  ...maps.flatMap(map => (map.events ?? []).filter(Boolean).flatMap(event => event.pages.map(page => page.list)))
];
const commands = lists.flat().filter(Boolean);
const scripts = commands.filter(command => command.code === 355 || command.code === 655).map(command => command.parameters[0]);
const hasBattle = commands.some(command => command.code === 301) ||
  maps.some(map => map.encounterList?.length) ||
  scripts.some(script => /BattleManager\.setup|Scene_Battle/.test(script));

// Texto que o jogo lê. Strings de JSON entram decodificadas, inclusive JSON aninhado em parâmetros.
const texts = [];
const collect = value => {
  if (typeof value === 'string') {
    texts.push(value);
    if (/^[[{"]/.test(value)) try { collect(JSON.parse(value)); } catch { /* texto comum */ }
  } else if (value && typeof value === 'object') Object.values(value).forEach(collect);
};
const battleOnly = new Set(['Enemies.json', 'Troops.json', 'Animations.json']);
for (const file of dataFiles) if (hasBattle || !battleOnly.has(file)) collect(readJson(`data/${file}`));
plugins.filter(plugin => plugin.status).forEach(plugin => collect(plugin.parameters));
for (const file of [...enabled, 'Languages.tsv', 'index.html', ...files.filter(file => file.endsWith('.css'))]) {
  if (existsSync(path.join(build, file))) texts.push(read(file));
}
const corpus = texts.join('\n').toLowerCase();
const mentioned = file => corpus.includes(path.basename(file).replace(/\.[^.]+$/, '').toLowerCase());

// Efeitos: os das animações alcançáveis e as texturas/modelos que esses .efkefc citam.
const animations = readJson('data/Animations.json');
const animationIds = new Set(commands.filter(command => command.code === 212).map(command => command.parameters[1]));
if (hasBattle) animations.filter(Boolean).forEach(animation => animationIds.add(animation.id));
const effects = new Set();
for (const id of animationIds) {
  const name = animations[id]?.effectName;
  if (name) effects.add(`effects/${name}.efkefc`);
}
for (const file of files) if (file.endsWith('.efkefc') && mentioned(file)) effects.add(file);
for (const effect of [...effects]) {
  if (!existsSync(path.join(build, effect))) continue;
  const binary = readFileSync(path.join(build, effect));
  const embedded = (binary.toString('utf16le') + binary.toString('latin1')).toLowerCase();
  for (const file of files) {
    if (file.startsWith('effects/') && !file.endsWith('.efkefc') && embedded.includes(path.basename(file).toLowerCase())) effects.add(file);
  }
}

const protectedPaths = readFileSync(new URL('./prune-build.keep.txt', import.meta.url), 'utf8')
  .split(/\r?\n/).map(line => line.trim()).filter(line => line && !line.startsWith('#'));

function keep(file) {
  if (protectedPaths.some(entry => entry.endsWith('/') ? file.startsWith(entry) : file === entry)) return true;
  if (file.startsWith('js/plugins/')) return enabled.has(file);
  if (file.startsWith('effects/')) return effects.has(file);
  if (file.startsWith('img/system/')) return true;
  if (file.startsWith('img/') || file.startsWith('audio/') || file.startsWith('movies/')) return mentioned(file);
  return true;
}

const junk = files.filter(file => path.basename(file) === '.DS_Store' || path.basename(file).startsWith('._'));
const removed = files.filter(file => !junk.includes(file) && !keep(file));
const kept = files.length - junk.length - removed.length;

console.log(`Build: ${build}`);
console.log(`Batalha alcançável: ${hasBattle ? 'sim' : 'não'} · animações alcançáveis: ${animationIds.size}`);
console.log(`Arquivos: ${files.length - junk.length} → ${kept} (${removed.length} não usados${junk.length ? `, ${junk.length} lixo do macOS` : ''})`);
const byFolder = Object.entries(Object.groupBy(removed, file => path.dirname(file).split('/').slice(0, 2).join('/')))
  .sort((a, b) => b[1].length - a[1].length);
for (const [folder, list] of byFolder) console.log(`  ${String(list.length).padStart(4)}  ${folder}/`);

if (!values.apply) {
  console.log('\nNada foi apagado. Rode com --apply para podar o build.');
} else {
  for (const file of [...junk, ...removed]) rmSync(path.join(build, file));
  removeEmptyFolders(build);
  console.log(`\n${junk.length + removed.length} arquivos apagados de ${build}.`);
}

const entries = walk(build, true).length;
console.log(`Entradas no zip (arquivos + pastas): ${entries}${values.apply ? '' : ' hoje'} · limite do itch.io: ${ITCH_LIMIT}`);

if (values.apply && entries > ITCH_LIMIT) fail(`O build ainda tem ${entries} entradas, acima do limite do itch.io.`);
if (values.apply) console.log('Próximo passo: npm run verify-build');

function walk(root, withFolders = false, relative = '') {
  const result = [];
  for (const entry of readdirSync(path.join(root, relative), { withFileTypes: true })) {
    const file = relative ? `${relative}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      if (withFolders) result.push(`${file}/`);
      result.push(...walk(root, withFolders, file));
    } else result.push(file);
  }
  return result;
}

function removeEmptyFolders(folder) {
  for (const entry of readdirSync(folder, { withFileTypes: true })) {
    if (entry.isDirectory()) removeEmptyFolders(path.join(folder, entry.name));
  }
  if (folder !== build && readdirSync(folder).length === 0) rmdirSync(folder);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
