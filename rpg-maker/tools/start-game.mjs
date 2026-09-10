import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const root = fileURLToPath(new URL('../The Dryland Drowned/', import.meta.url));
const { values } = parseArgs({
  options: { port: { type: 'string' }, 'no-open': { type: 'boolean' } }
});
const port = Number(values.port ?? process.env.PORT ?? 18726);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('--port ou PORT deve ser um inteiro entre 1 e 65535.');
  process.exit(1);
}
const url = `http://127.0.0.1:${port}/`;
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ogg': 'audio/ogg',
  '.m4a': 'audio/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.wasm': 'application/wasm'
};

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, url).pathname);
  } catch {
    response.writeHead(400).end();
    return;
  }
  const file = path.resolve(root, `.${pathname.endsWith('/') ? `${pathname}index.html` : pathname}`);
  if (!file.startsWith(root)) {
    response.writeHead(403).end();
    return;
  }
  try {
    const data = await readFile(file);
    response.writeHead(200, {
      'Content-Type': mime[path.extname(file)] ?? 'application/octet-stream',
      'Content-Length': data.length,
      'Cache-Control': 'no-cache'
    });
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch (error) {
    if (error.code !== 'ENOENT' && error.code !== 'ENOTDIR') console.error(error);
    response.writeHead(error.code === 'ENOENT' || error.code === 'ENOTDIR' ? 404 : 500).end();
  }
});

server.on('error', error => {
  const inspect = process.platform === 'win32'
    ? `netstat -ano | findstr :${port}`
    : `lsof -nP -iTCP:${port} -sTCP:LISTEN`;
  console.error(error.code === 'EADDRINUSE'
    ? `Porta ${port} ocupada. Confira com ${inspect}. Reutilize o servidor se for deste jogo ou escolha outra porta com npm start -- --port <porta-livre>. Saves ficam vinculados ao endereço e à porta.`
    : error);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => {
  console.log(`Jogo em ${url} — Ctrl+C encerra o servidor.`);
  if (!values['no-open']) {
    let browser;
    if (process.platform === 'darwin') {
      browser = spawn('open', ['-a', 'Google Chrome', url], { stdio: 'inherit' });
    } else if (process.platform === 'win32') {
      browser = spawn('cmd.exe', ['/d', '/s', '/c', `start "" chrome.exe "${url}"`], {
        stdio: 'inherit', windowsVerbatimArguments: true, windowsHide: true
      });
    } else {
      console.log(`Abra ${url} no Chrome.`);
      return;
    }
    browser.on('error', error => console.error(`Abra ${url} no Chrome: ${error.message}`));
    browser.on('exit', code => {
      if (code) console.error(`Abra ${url} manualmente no Chrome.`);
    });
  }
});
