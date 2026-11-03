// Abre o jogo no NW.js; veja nw-runtime.mjs para o porquê de não usar `open` nem o botão do Editor.
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { nwEnvironment, nwExecutable } from './nw-runtime.mjs';

function fail(message) {
  console.error(message);
  process.exit(1);
}

const { values } = parseArgs({ options: { test: { type: 'boolean' } } });

let executable;
try {
  executable = nwExecutable();
} catch (error) {
  fail(error.message);
}

const game = path.resolve(fileURLToPath(new URL('../The Dryland Drowned/', import.meta.url)));
const args = values.test ? [game, 'test'] : [game];

const child = spawn(executable, args, { env: nwEnvironment(), stdio: 'inherit' });
child.on('error', error => fail(`Não foi possível abrir o NW.js: ${error.message}`));
child.on('exit', (code, signal) => {
  if (signal) console.error(`NW.js encerrado pelo sinal ${signal}.`);
  process.exit(code ?? 1);
});
