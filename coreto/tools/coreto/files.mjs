import { open, lstat, realpath, rename, rm } from "node:fs/promises";
import { dirname, basename, join } from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { CoreError } from "../../src/core-engine/parameters.mjs";
import { isWithin } from "../project.mjs";

export function hash(content) {
    return createHash("sha256").update(content).digest("hex");
}

export async function readSnapshot(file, root) {
    root = await realpath(root);
    const link = await lstat(file);
    if (!link.isFile() || link.isSymbolicLink() || !isWithin(root, await realpath(file))) {
        throw new CoreError("INVALID_FILE_TARGET", "Use a regular project file inside the selected root.", { field: file }, 5);
    }
    const handle = await open(file, "r");
    try {
        const before = await handle.stat();
        const content = await handle.readFile();
        const after = await handle.stat();
        if (before.mtimeMs !== after.mtimeMs || before.size !== after.size) {
            throw new CoreError("FILE_CONFLICT", "The file changed while it was being read; read it again.", { field: file }, 4);
        }
        return { file, root, content, hash: hash(content), stat: after };
    } finally {
        await handle.close();
    }
}

export async function writeSnapshot(snapshot, content) {
    const temporary = join(dirname(snapshot.file), `.coreto-${basename(snapshot.file)}-${randomUUID()}.tmp`);
    let created = false;
    try {
        const handle = await open(temporary, "wx", snapshot.stat.mode & 0o777);
        created = true;
        try {
            await handle.writeFile(content);
            await handle.chmod(snapshot.stat.mode & 0o777);
            await handle.sync();
        } finally {
            await handle.close();
        }
        const current = await readSnapshot(snapshot.file, snapshot.root);
        if (current.hash !== snapshot.hash || current.stat.ino !== snapshot.stat.ino || current.stat.dev !== snapshot.stat.dev || current.stat.mode !== snapshot.stat.mode) {
            throw new CoreError("FILE_CONFLICT", "The file changed since it was read; inspect the current values before retrying.", { field: snapshot.file }, 4);
        }
        await rename(temporary, snapshot.file);
        let written;
        try {
            written = await readSnapshot(snapshot.file, snapshot.root);
        } catch (error) {
            throw new CoreError("WRITE_UNCONFIRMED", "Replacement completed but could not be confirmed; read the file before retrying.", { field: snapshot.file, cause: error.code }, 4);
        }
        if (written.hash !== hash(content)) {
            throw new CoreError("WRITE_UNCONFIRMED", "The file changed after replacement; read it again before retrying.", { field: snapshot.file }, 4);
        }
        return { beforeHash: snapshot.hash, afterHash: written.hash, bytes: written.content.length };
    } finally {
        if (created) await rm(temporary, { force: true });
    }
}

// A hard link publishes the complete same-directory file atomically without replacing a rival.
export async function publishNewFile(file, root, content, {sourceSnapshot} = {}) {
    root = await realpath(root);
    if (await realpath(dirname(file)) !== root) throw new CoreError('INVALID_FILE_TARGET', 'Publish language files only in the project root.', {field: file}, 2);
    const {link} = await import('node:fs/promises');
    const temporary = join(dirname(file), `.coreto-${basename(file)}-${randomUUID()}.tmp`);
    let created = false;
    try {
        const handle = await open(temporary, 'wx', 0o600);
        created = true;
        try {await handle.writeFile(content); await handle.sync();} finally {await handle.close();}
        if (sourceSnapshot) {
            const current = await readSnapshot(sourceSnapshot.file, root);
            if (current.hash !== sourceSnapshot.hash || current.stat.ino !== sourceSnapshot.stat.ino) {
                throw new CoreError('FILE_CONFLICT', 'Language source changed before publication.', {field: sourceSnapshot.file}, 4);
            }
        }
        try {await link(temporary, file);} catch (error) {
            if (error.code === 'EEXIST') throw new CoreError('LANGUAGE_FILE_EXISTS', 'Language destination already exists. Use or edit that file.', {field: basename(file)}, 4);
            throw error;
        }
        let written;
        try {written = await readSnapshot(file, root);} catch (error) {
            throw new CoreError('WRITE_UNCONFIRMED', 'Publication completed but could not be confirmed. Inspect the destination before retrying.', {field: basename(file), cause: error.code}, 4);
        }
        if (written.hash !== hash(content)) throw new CoreError('WRITE_UNCONFIRMED', 'Published file changed before confirmation. Inspect it before retrying.', {field: basename(file)}, 4);
        return {file: basename(file), bytes: written.content.length, sha256: written.hash};
    } finally {
        if (created) await rm(temporary, {force: true});
    }
}
