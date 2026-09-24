import {cp, lstat, mkdir, readdir, readFile, realpath} from 'node:fs/promises';
import {join, resolve, dirname, basename} from 'node:path';
import {createHash} from 'node:crypto';
import {parseArgs} from 'node:util';
import {defaultGameRoot, projectRoot, isWithin, isMainModule, nodeCommand} from '../project.mjs';
import {parsePluginsFile} from '../coreto/plugins-file.mjs';
import {serveProject} from '../dev/server.mjs';

export async function prepare({project, output}) {
    const source = await defaultGameRoot(project);
    const target = resolve(output);
    const suffix = [basename(target)];
    let ancestor = dirname(target);
    while (true) {
        try { ancestor = await realpath(ancestor); break; }
        catch (error) {
            if (error.code !== 'ENOENT') throw error;
            suffix.unshift(basename(ancestor)); ancestor = dirname(ancestor);
        }
    }
    const root = join(ancestor, ...suffix);
    if (isWithin(source, root) || isWithin(root, source)) throw new Error('Use a new fixture outside the source game.');
    await mkdir(dirname(root), {recursive: true});
    await mkdir(root);
    await cp(source, root, {recursive: true, filter: async path => {
        const name = path.slice(source.length + 1).split('/')[0];
        if (path !== source && !['game.rmmzproject', 'index.html', 'package.json', 'js', 'data', 'img', 'audio', 'effects', 'fonts', 'css', 'icon', 'movies'].includes(name) && !/\.(csv|tsv)$/.test(name)) return false;
        if ((await lstat(path)).isSymbolicLink()) throw new Error(`Game fixture input must not be a symlink: ${path}`);
        return true;
    }});
    return {fixture: root};
}

export async function describe({fixture}) {
    const root = await projectRoot(fixture);
    const files = [];
    async function inventory(directory, prefix = '') {
        for (const name of (await readdir(directory)).sort()) {
            if (!prefix && ['save', '.RPGMakerMZ-metadata'].includes(name)) continue;
            const path = join(directory, name), relative = join(prefix, name), info = await lstat(path);
            if (info.isDirectory()) await inventory(path, relative);
            else if (info.isFile()) files.push({path: relative, sha256: createHash('sha256').update(await readFile(path)).digest('hex')});
            else throw new Error(`Unsupported game fixture input: ${path}`);
        }
    }
    await inventory(root);
    const system = JSON.parse(await readFile(join(root, 'data/System.json'), 'utf8'));
    const plugins = parsePluginsFile(await readFile(join(root, 'js/plugins.js'), 'utf8')).plugins;
    return {files, mutablePaths: ['save', '.RPGMakerMZ-metadata'], capabilities: ['browser', 'visual', 'public-input'],
        plugins, startState: {mapId: system.startMapId, x: system.startX, y: system.startY}};
}

export async function start({fixture}) {
    return serveProject({root: fixture, port: 0});
}

if (await isMainModule(import.meta.url)) {
    const {values} = parseArgs({options: {project: {type: 'string'}, output: {type: 'string'}}});
    if (!values.project || !values.output) throw new Error(`Usage: ${nodeCommand(import.meta.url)} --project <game> --output <new-fixture>`);
    console.log(JSON.stringify(await prepare({project: values.project, output: values.output})));
}
export const sourceFiles = [new URL('../project.mjs', import.meta.url), new URL('../dev/server.mjs', import.meta.url), new URL('../dev/metadata-store.mjs', import.meta.url), new URL('../coreto/plugins-file.mjs', import.meta.url)];
