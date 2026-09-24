import {fileURLToPath} from "node:url";
import { readFile, realpath, stat, lstat } from "node:fs/promises";
import { resolve, join, relative, isAbsolute, dirname, sep, parse } from "node:path";

export function isWithin(root, path) {
    const part = relative(root, path);
    return part === "" || (!part.startsWith(".." + sep) && part !== ".." && !isAbsolute(part));
}

export async function projectRoot(path) {
    const root = await realpath(resolve(path));
    const marker = await readFile(join(root, "game.rmmzproject"), "utf8");
    if (!marker.startsWith("RPGMZ ")) throw invalidProject(root, "The game.rmmzproject marker must identify RPG Maker MZ.");
    let data;
    try {
        data = await stat(join(root, "data"));
    } catch (error) {
        if (error.code !== "ENOENT") throw error;
        throw invalidProject(root, "The project is missing its data directory.");
    }
    if (!data.isDirectory()) throw invalidProject(root, "The project data path must be a directory.");
    return root;
}

function invalidProject(root, message) {
    return Object.assign(new Error(message), {
        code: "INVALID_PROJECT", exitCode: 2, path: root,
        details: { field: root, hint: "Select a complete RPG Maker MZ project with --project <root>." }
    });
}

export function readPluginMetadata(source) {
    const block = source.match(/\/\*:[\s\S]*?\*\//)?.[0];
    if (!block) throw new Error("Missing RPG Maker plugin header.");
    const parameters = {};
    let parameter;
    let description = "";
    for (const line of block.split(/\r?\n/)) {
        const tag = line.match(/^\s*\*\s*@([\w]+)(?:\s(.*))?$/);
        if (!tag) continue;
        const value = tag[2] ?? "";
        if (tag[1] === "plugindesc") description = value;
        if (tag[1] === "command" || tag[1] === "arg") parameter = undefined;
        if (tag[1] === "param") {
            parameter = value;
            parameters[parameter] = "";
        }
        if (tag[1] === "default" && parameter !== undefined) parameters[parameter] = value;
    }
    return { description, parameters };
}

export const environmentRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export function nodeCommand(url) {
    const path = relative(process.cwd(), fileURLToPath(url)).split(sep).join('/');
    const quoted = /^[\w./-]+$/.test(path) ? path : process.platform === 'win32' ? `"${path}"` : `'${path.replaceAll("'", "'\\''")}'`;
    return `node ${quoted}`;
}

export async function defaultGameRoot(environment = environmentRoot) {
    const selected = await readProjectSelection(environment);
    if (selected) return selected.root;
    try {
        await stat(join(environment, 'game.rmmzproject'));
    } catch (error) {
        if (error.code !== 'ENOENT') throw error;
        return projectRoot(join(environment, 'rpg-maker-mz'));
    }
    return projectRoot(environment);
}

export async function isMainModule(url) {
    if (!process.argv[1] || process.argv[1] === '-') return false;
    return await realpath(resolve(process.argv[1])) === fileURLToPath(url);
}


export const projectSelectionFile = '.coreto-project.json';

export function isGameDirectoryName(name) {
    // `$` also matches before a final newline; require the whole directory name.
    return /^rpg[\p{Zs}\p{Pd}_]*maker(?:[\p{Zs}\p{Pd}_]*mz)?$/iu.exec(name)?.[0] === name;
}

function validateSelection(value, persisted = false) {
    if (typeof value !== 'string' || !value.trim() || value.split(sep === '\\' ? /[\\/]/ : '/').includes('..') ||
        (persisted && (isAbsolute(value) || value.includes('\\')))) {
        throw invalidProject(String(value), 'Invalid project selection; select an existing game under an RPG Maker directory (rpgmaker, rpg-maker, RPG Maker MZ).');
    }
}

export async function selectedProjectRoot(environment, selection) {
    validateSelection(selection);
    const lexicalEnvironment = resolve(environment), canonicalEnvironment = await realpath(lexicalEnvironment);
    const candidate = resolve(lexicalEnvironment, selection);
    let part;
    if (isWithin(lexicalEnvironment, candidate)) part = relative(lexicalEnvironment, candidate);
    else if (isWithin(canonicalEnvironment, candidate)) part = relative(canonicalEnvironment, candidate);
    else {
        // Resolve only the external environment alias; inspect its internal suffix below.
        let ancestor = parse(candidate).root;
        const components = candidate.slice(ancestor.length).split(sep);
        for (const [index, component] of components.entries()) {
            ancestor = join(ancestor, component);
            try {
                if (await realpath(ancestor) === canonicalEnvironment) { part = components.slice(index + 1).join(sep); break; }
            } catch (error) { if (error.code !== 'ENOENT' && error.code !== 'ENOTDIR') throw error; }
        }
        if (part === undefined) throw invalidProject(candidate, 'Selected game must be inside the environment.');
    }
    const root = join(canonicalEnvironment, part);
    if (!isGameDirectoryName(part.split(sep)[0])) throw invalidProject(root, 'Selected game must be under an RPG Maker directory (rpgmaker, rpg-maker, RPG Maker MZ) directly inside the environment.');
    let current = canonicalEnvironment;
    for (const component of part.split(sep)) {
        current = join(current, component);
        let entry;
        try { entry = await lstat(current); }
        catch (error) {
            if (error.code !== 'ENOENT') throw error;
            throw invalidProject(current, 'Selected game does not exist.');
        }
        if (!entry.isDirectory() || entry.isSymbolicLink()) throw invalidProject(current, 'Selected game components must be regular directories.');
    }
    for (const [name, directory] of [['game.rmmzproject', false], ['data', true]]) {
        const path = join(root, name);
        let entry;
        try { entry = await lstat(path); }
        catch (error) {
            if (error.code !== 'ENOENT') throw error;
            throw invalidProject(path, 'Selected game is incomplete.');
        }
        if (directory ? !entry.isDirectory() : !entry.isFile()) throw invalidProject(path, 'Selected game requires a regular marker and data directory.');
    }
    return projectRoot(root);
}

export async function readProjectSelection(environment) {
    const path = join(environment, projectSelectionFile);
    let entry;
    try { entry = await lstat(path); }
    catch (error) { if (error.code === 'ENOENT') return null; throw error; }
    if (!entry.isFile()) throw invalidProject(path, 'Project selection must be a regular file.');
    const bytes = await readFile(path, 'utf8');
    let config;
    try { config = JSON.parse(bytes); }
    catch { throw invalidProject(path, 'Invalid project selection JSON.'); }
    if (!config || Array.isArray(config) || typeof config !== 'object' ||
        config.schemaVersion !== 1 || Object.keys(config).sort().join(',') !== 'project,schemaVersion') {
        throw invalidProject(path, 'Unsupported project selection schema.');
    }
    validateSelection(config.project, true);
    const root = await selectedProjectRoot(environment, config.project);
    return {root, project: relative(await realpath(environment), root).split(sep).join('/'), bytes};
}
