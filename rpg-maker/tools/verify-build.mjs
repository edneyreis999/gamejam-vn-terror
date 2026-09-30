// Prova que o build podado (dist/) continua sendo o jogo e, só então, gera o zip do itch.io.
//
// Uso: npm run verify-build [-- --build <pasta>]   (padrão: dist/The Dryland Drowned)
//
// 1. O build veio deste checkout: todo arquivo dele é idêntico ao do projeto-fonte (exceto o
//    package.json, que o deploy do editor altera). Os arquivos que o prune-build removeu não
//    existem mais, e é isso que a suíte vai exercitar.
// 2. Cabe no limite do itch.io (entradas = arquivos + pastas).
// 3. A suíte canônica passa rodando contra o build.
// 4. Gera <build>.zip com index.html na raiz e sem __MACOSX, ._* ou .DS_Store.
// Sem suíte verde não há zip, e não existe flag para pular os testes.
import { execFileSync, spawn } from 'node:child_process';
import { createWriteStream, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import readline from 'node:readline';
import { hash } from './native-files.mjs';
import { createProgress } from './test-progress.mjs';

const ITCH_LIMIT = 1000;
const PORT = Number(process.env.DRYLAND_QA_PORT || 18726);
const repo = fileURLToPath(new URL('../../', import.meta.url));
const source = path.join(repo, 'rpg-maker/The Dryland Drowned');
const { values } = parseArgs({ options: { build: { type: 'string' } } });
const build = path.resolve(repo, values.build ?? 'dist/The Dryland Drowned');
const zip = `${build}.zip`;

function fail(message) {
  console.error(`\n${message}`);
  process.exit(1);
}

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

function checkFromThisCheckout() {
  const differing = [];
  for (const file of walk(build)) {
    if (file === 'package.json') continue;
    let original;
    try { original = readFileSync(path.join(source, file)); } catch { differing.push(`${file} (não existe no projeto)`); continue; }
    if (hash(readFileSync(path.join(build, file))) !== hash(original)) differing.push(`${file} (conteúdo diferente)`);
  }
  if (!differing.length) return;
  const shown = differing.slice(0, 20).map(file => `  ${file}`).join('\n');
  const more = differing.length > 20 ? `\n  … e mais ${differing.length - 20}` : '';
  fail(`O build não veio deste checkout: ${differing.length} arquivo(s) diferem do projeto.\n${shown}${more}\n` +
    `Abra no editor ${path.join(source, 'game.rmmzproject')}, refaça o deploy e rode npm run prune-build -- --apply.`);
}

function checkPortFree() {
  return new Promise(resolve => {
    const probe = net.createServer().once('error', () => {
      fail(`A porta ${PORT} está ocupada, e a suíte usa essa porta.\n` +
        `Identifique o processo com lsof -nP -iTCP:${PORT} -sTCP:LISTEN (macOS) ou netstat -ano | findstr :${PORT} (Windows); não encerre processos desconhecidos.`);
    }).once('listening', () => probe.close(resolve)).listen(PORT, '127.0.0.1');
  });
}

function zipEntries() {
  if (process.platform === 'win32') return execFileSync('tar.exe', ['-tf', zip], { encoding: 'utf8' }).split(/\r?\n/).filter(Boolean);
  return execFileSync('zip', ['-sf', zip], { encoding: 'utf8' }).split('\n').slice(1).map(line => line.trim()).filter(line => line && !line.startsWith('Total '));
}

console.log(`Build: ${build}`);
checkFromThisCheckout();
console.log('1/4 O build é deste checkout.');

const entries = walk(build, true).length;
if (entries > ITCH_LIMIT) fail(`O build tem ${entries} entradas, acima do limite de ${ITCH_LIMIT} do itch.io. Rode npm run prune-build -- --apply.`);
console.log(`2/4 ${entries} entradas, limite do itch.io: ${ITCH_LIMIT}.`);

await checkPortFree();
const manifest = JSON.parse(readFileSync(path.join(repo, 'rpg-maker/tests/test-manifest.json'), 'utf8'));
const total = Object.values(manifest.tasks).flat().length;
const tapLog = `${build}.tap.log`;
console.log(`3/4 Rodando a suíte canônica contra o build (${total} testes, cerca de uma hora; saída completa em ${tapLog})…\n`);
const suite = spawn(process.execPath, ['--test', '--test-concurrency=1', 'rpg-maker/tests/**/*.test.mjs'], {
  cwd: repo, stdio: ['ignore', 'pipe', 'inherit'], env: { ...process.env, DRYLAND_QA_PROJECT: build }
});
const log = createWriteStream(tapLog);
const progress = createProgress(total);
readline.createInterface({ input: suite.stdout }).on('line', line => { log.write(`${line}\n`); progress.line(line); });
const status = await new Promise(resolve => suite.on('close', code => resolve(code)));
log.end();
if (status !== 0) fail(`A suíte falhou no build podado (${progress.summary().failed} falha(s) de ${progress.summary().done} concluídos): nenhum zip foi gerado.\nDescubra se a poda removeu algo usado ou se o teste está errado; o diagnóstico completo está em ${tapLog}.`);
if (progress.summary().done !== total) fail(`A suíte terminou com ${progress.summary().done} de ${total} testes registrados: nenhum zip foi gerado.`);

rmSync(zip, { force: true });
// index.html na raiz do zip, como o itch.io espera de um jogo HTML5.
if (process.platform === 'win32') execFileSync('tar.exe', ['-a', '-c', '-f', zip, '.'], { cwd: build });
else execFileSync('zip', ['-r', '-X', '-q', zip, '.', '-x', '*.DS_Store', '-x', '__MACOSX/*', '-x', '*/._*'], { cwd: build });

const packed = zipEntries();
const junk = packed.filter(entry => /(^|\/)(__MACOSX|\._|\.DS_Store)/.test(entry));
if (junk.length || packed.length > ITCH_LIMIT || !packed.includes('index.html')) {
  rmSync(zip, { force: true });
  fail(`Zip inválido (${packed.length} entradas, ${junk.length} lixo do macOS, index.html ${packed.includes('index.html') ? 'na raiz' : 'ausente'}); removido.`);
}
console.log(`\n4/4 Zip: ${zip}\n    ${packed.length} entradas · ${(statSync(zip).size / 1048576).toFixed(1)} MB`);
