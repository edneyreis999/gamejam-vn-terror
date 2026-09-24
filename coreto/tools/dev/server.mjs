import { createServer } from "node:http";
import { readFile, realpath, stat } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { parseArgs } from "node:util";
import { createHash, randomBytes } from "node:crypto";
import { isMainModule, projectRoot, isWithin, nodeCommand } from "../project.mjs";
import { createMetadataStore } from "./metadata-store.mjs";
import { MetadataError } from "../../src/core-engine/metadata-contract.mjs";
import {isLanguageBasename} from '../../src/message-core/language-table.mjs';
import {parsePluginsFile} from '../coreto/plugins-file.mjs';

const publicDirectories = new Set(["js", "data", "img", "audio", "effects", "fonts", "css", "icon", "movies"]);
const contentTypes = {
    ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8", ".css": "text/css; charset=utf-8",
    ".wasm": "application/wasm", ".png": "image/png", ".jpg": "image/jpeg",
    ".ogg": "audio/ogg", ".m4a": "audio/mp4", ".woff": "font/woff", ".woff2": "font/woff2",
    ".csv": "text/csv; charset=utf-8", ".tsv": "text/tab-separated-values; charset=utf-8"
};

function isPublicPath(parts,languageFile) {
    return !parts.some(part => part.startsWith(".") || part.includes("\\")) &&
        (!parts.length || (parts.length === 1 && (parts[0] === "index.html" || parts[0] === languageFile)) || publicDirectories.has(parts[0]));
}

async function configuredLanguageFile(root) {
    let source;
    try { source=await readFile(join(root,'js/plugins.js'),'utf8'); }
    catch(error) { if(error.code==='ENOENT')return null;throw error; }
    const {plugins}=parsePluginsFile(source);
    const plugin=plugins.find(plugin=>plugin.status && plugin.name==='Coreto_1_MessageCore');
    if(!plugin)return null;
    const locale=JSON.parse(plugin.parameters['Localization:struct'] || '{}');
    if(locale['Enable:eval']!=='true')return null;
    const format=locale['LangFiletype:str'] || 'tsv';
    if(!['csv','tsv'].includes(format))return null;
    const filename=locale[format==='csv'?'CsvFilename:str':'TsvFilename:str'] ?? `Languages.${format}`;
    return isLanguageBasename(filename, format) ? filename : null;
}

async function requestJson(request) {
    if (request.headers["content-type"]?.split(";")[0].trim() !== "application/json") throw new MetadataError("METADATA_CONTENT_TYPE", "Send application/json.", 415);
    const chunks = [];
    let bytes = 0;
    for await (const chunk of request) {
        bytes += chunk.length;
        if (bytes > 32 * 1024 * 1024) throw new MetadataError("METADATA_DOCUMENT_TOO_LARGE", "A metadata request cannot exceed 32 MiB.", 413);
        chunks.push(chunk);
    }
    try { return JSON.parse(Buffer.concat(chunks).toString("utf8")); }
    catch { throw new MetadataError("METADATA_INVALID_JSON", "The metadata request is not valid JSON."); }
}

function jsonResponse(response, status, value) {
    response.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
    response.end(JSON.stringify(value));
}

export async function serveProject({ root: inputRoot, port = 0, fileSystem, basePath='/' }) {
    const root = await projectRoot(inputRoot);
    if(!/^\/(?:[A-Za-z0-9_-]+\/)*$/.test(basePath))throw new Error('Use a basePath beginning and ending with /, with simple path segments.');
    const languageFile=await configuredLanguageFile(root);
    const metadata = createMetadataStore(root, { fileSystem });
    const token = randomBytes(32).toString("hex");
    const server = createServer(async (request, response) => {
        try {
            if (request.headers.host !== `127.0.0.1:${server.address().port}`) {
                response.writeHead(403).end("Invalid host.");
                return;
            }
            const requestedPath=decodeURIComponent(request.url.split("?")[0]);
            if(!requestedPath.startsWith(basePath)){response.writeHead(404).end('Not found.');return;}
            const path='/'+requestedPath.slice(basePath.length);
            if (["/__coreto/metadata/write", "/__coreto/metadata/receipt"].includes(path)) {
                if (request.method !== "POST") { response.writeHead(405, { Allow: "POST" }).end("Use POST."); return; }
                if (request.headers.origin !== `http://127.0.0.1:${server.address().port}` || request.headers["x-coreto-metadata-token"] !== token) {
                    jsonResponse(response, 403, { status: "failure", error: { code: "METADATA_SESSION_FORBIDDEN", message: "Use the current same-origin development session." } });
                    return;
                }
                const input = await requestJson(request);
                if (path.endsWith("/receipt") && (!input || Object.keys(input).length !== 1 || !Object.hasOwn(input, "requestId"))) throw new MetadataError("METADATA_INVALID_DOCUMENT", "Receipt lookup accepts only requestId.");
                const result = path.endsWith("/write") ? await metadata.submit(input) : metadata.receipt(input.requestId);
                jsonResponse(response, result.status === "success" ? 200 : result.status === "writing" ? 202 : result.error?.httpStatus ?? 409, result);
                return;
            }
            if (!["GET", "HEAD"].includes(request.method)) {
                response.writeHead(405, { Allow: "GET, HEAD" }).end("Method not allowed.");
                return;
            }
            const parts = path.split("/").filter(Boolean);
            if (!isPublicPath(parts,languageFile)) {
                response.writeHead(404).end("Not found.");
                return;
            }
            const target = await realpath(join(root, ...(parts.length ? parts : ["index.html"])));
            if (!isWithin(root, target) || !isPublicPath(relative(root, target).split("/"),languageFile) || !(await stat(target)).isFile()) {
                response.writeHead(404).end("Not found.");
                return;
            }
            let body = await readFile(target);
            if (target === join(root, "index.html")) {
                const session = { schemaVersion: 1, endpoint: basePath+"__coreto/metadata/write", receiptEndpoint: basePath+"__coreto/metadata/receipt", token, timeoutMs: 30000 };
                const script = `<script>globalThis.CoretoMetadataSession=Object.freeze(${JSON.stringify(session)});</script>`;
                const html = body.toString("utf8");
                body = Buffer.from(html.includes("</head>") ? html.replace("</head>", script + "</head>") : script + html);
            }
            const sourceHash = createHash("sha256").update(body).digest("hex");
            response.writeHead(200, {
                "Content-Type": contentTypes[extname(target)] ?? "application/octet-stream",
                "Content-Length": body.length,
                "Cache-Control": "no-store",
                "X-Coreto-Content-SHA256": sourceHash,
                "X-Content-Type-Options": "nosniff"
            });
            response.end(request.method === "HEAD" ? undefined : body);
        } catch (error) {
            if (error instanceof MetadataError) { jsonResponse(response, error.status, { status: "failure", error: { code: error.code, message: error.message } }); return; }
            const status = error instanceof URIError ? 400 : ["ENOENT", "ENOTDIR"].includes(error.code) ? 404 : 500;
            response.writeHead(status).end(status === 500 ? "Unable to read project asset." : "Invalid or missing asset.");
        }
    });
    await new Promise((fulfill, reject) => {
        server.once("error", reject);
        server.listen(port, "127.0.0.1", () => {
            server.removeListener("error", reject);
            fulfill();
        });
    });
    return {
        root, url: `http://127.0.0.1:${server.address().port}${basePath}`, playtestUrl: `http://127.0.0.1:${server.address().port}${basePath}?test`, server,
        async close() {
            const stopped = metadata.close();
            const closing = new Promise((fulfill, reject) => server.close(error => error ? reject(error) : fulfill()));
            server.closeAllConnections();
            await Promise.all([closing, stopped]);
        }
    };
}

if (await isMainModule(import.meta.url)) {
    const { values } = parseArgs({ options: { project: { type: "string" }, fixture: { type: "string" }, port: { type: "string" }, 'base-path': {type:'string',default:'/'} } });
    if (values.project && values.fixture) throw new Error("Select either --project or --fixture.");
    if (!values.project && !values.fixture) throw new Error(`Usage: ${nodeCommand(import.meta.url)} --project <directory> [--port <number>] or --fixture <directory>.`);
    const port = values.port === undefined ? 0 : Number(values.port);
    if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error("Port must be an integer between 0 and 65535.");
    const service = await serveProject({ root: values.project ?? values.fixture, port,basePath:values['base-path'] });
    console.log(JSON.stringify({ root: service.root, url: service.url, playtestUrl: service.playtestUrl, pid: process.pid }));
    process.once("SIGINT", () => service.close());
    process.once("SIGTERM", () => service.close());
}
