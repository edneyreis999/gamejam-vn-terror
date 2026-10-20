import {readFile, access} from 'node:fs/promises';
import {dirname, resolve, join} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';

export const skillRoot = fileURLToPath(new URL('../', import.meta.url));
export const preset = JSON.parse(await readFile(join(skillRoot, 'assets/preset.json'), 'utf8'));
export const pluginId = 'Coreto_5_DesignSystem';
export const hash = bytes => createHash('sha256').update(bytes).digest('hex');

export async function coretoRoot(project, explicit) {
  if (explicit) {
    const root = resolve(explicit);
    await access(join(root, 'tools/coreto/cli.mjs'));
    return root;
  }
  for (let current = resolve(project);; current = dirname(current)) {
    const root = join(current, 'coreto');
    try { await access(join(root, 'tools/coreto/cli.mjs')); return root; }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
    if (dirname(current) === current) throw new Error('Coreto CLI not found. Supply --coreto <installed-coreto-directory>.');
  }
}

export async function coretoModules(root) {
  const [registry, files] = await Promise.all([
    import(pathToFileURL(join(root, 'tools/coreto/plugins-file.mjs'))),
    import(pathToFileURL(join(root, 'tools/coreto/files.mjs')))
  ]);
  return {...registry, ...files};
}

export function decode(value) {
  if (typeof value === 'string') {
    try { return decode(JSON.parse(value)); } catch { return value; }
  }
  if (Array.isArray(value)) return value.map(decode);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,decode(v)]));
  return value;
}

export function encode(value) {
  if (Array.isArray(value)) return JSON.stringify(value.map(encode));
  if (value && typeof value === 'object') return JSON.stringify(Object.fromEntries(Object.entries(value).map(([k,v])=>[k,encode(v)])));
  return String(value);
}

export function merge(base, values) {
  const result = structuredClone(base);
  for (const [key, value] of Object.entries(values)) {
    result[key] = value && typeof value === 'object' && !Array.isArray(value) && base[key]
      ? merge(base[key], value) : value;
  }
  return result;
}

export function invoke(cli, args) {
  let output;
  try { output = execFileSync(process.execPath, [cli, ...args, '--json'], {encoding:'utf8',maxBuffer:8*1024*1024}); }
  catch (error) { throw new Error(`CLI failed: ${args.join(' ')}\n${error.stdout || error.stderr || error.message}`); }
  const result = JSON.parse(output);
  if (!result.ok) throw new Error(`CLI rejected operation: ${JSON.stringify(result)}`);
  return result.result;
}

export function errorResult(error) {
  console.error(JSON.stringify({ok:false,error:{code:error.code || 'DESIGN_SYSTEM_ERROR',message:error.message}}));
  process.exitCode = error.exitCode || 2;
}
