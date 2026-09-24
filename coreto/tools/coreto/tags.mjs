import { textOperation } from "./texts.mjs";
import { relative } from "node:path";
import { CoreError } from "../../src/core-engine/parameters.mjs";
import { validateAuthoredCode } from "./javascript.mjs";
import { parseJsonDocument, jsonSpan } from "./json-document.mjs";
import { readSnapshot, writeSnapshot, hash } from "./files.mjs";
import { tagTarget, tagFields } from "./tag-target.mjs";

function descriptor(catalog, key) {
    const tag = catalog.tags.find(tag => tag.key === key || tag.id === key || tag.aliases?.includes(key));
    if (!tag) throw new CoreError("UNKNOWN_TAG", `Unknown Core tag: ${key}.`, {field: "tag", received: key, hint: "Use core api list to find the supported tag families."}, 3);
    return tag;
}

function compilesScript(tag, source) {
    try {
        validateAuthoredCode({javascript: tag.javascript}, source, tag.id);
        return true;
    } catch (error) {
        if (error.code !== "INVALID_JAVASCRIPT") throw error;
        return false;
    }
}

function javascriptSpan(tag, match) {
    const bodyStart = match[0].indexOf(": ") + 2;
    const ends = [];
    for (let end = bodyStart; end < match[0].length; end++) {
        if (match[0][end] === ">" && compilesScript(tag, match[0].slice(bodyStart, end))) ends.push(end);
    }
    if (!ends.length) return {text: match[0], ambiguous: /<[A-Za-z][^<>\r\n]*>/.test(match[0].slice(bodyStart))};
    const text = match[0].slice(0, ends.at(-1) + 1);
    for (const nested of text.slice(bodyStart).matchAll(/<[A-Za-z][^<>\r\n]*>/g)) {
        const start = bodyStart + nested.index;
        if (ends.some(end => end < start) && compilesScript(tag, text.slice(bodyStart, start))) {
            return {text, ambiguous: true};
        }
    }
    return {text, ambiguous: false};
}

function identity(tag, text) {
    const heading = text.slice(1, text.indexOf(":") < 0 ? -1 : text.indexOf(":")).toUpperCase();
    if (tag.javascript || tag.key === "enemy-base" || tag.key === "animation-offset") return heading;
    if (/^(?:param|xparam|sparam)-(?:plus|rate|flat|max)$/.test(tag.key)) return heading + (/[%％]>$/.test(text) ? "/percent" : "/number");
    if (tag.key === "scroll-lock") return /SCROLL LOCK ([XY])/i.exec(text)[1].toUpperCase();
    if (tag.key === "animation-anchor") return heading.replace(/^(?:HEADER|TOP)$/, "HEAD").replace(/^(?:FOOTER|BOTTOM)$/, "FOOT");
    if (tag.key === "taller-tiles") return text.slice(text.indexOf(":") + 1, -1).split(",").map(Number).sort((a,b) => a-b).join(",");
    return tag.key;
}

function occurrences(field, tags) {
    const found = [];
    for (const tag of tags) {
        if (!tag.targets.includes(field.type)) continue;
        const expression = new RegExp(tag.pattern, "gi");
        let match;
        while ((match = expression.exec(field.text))) {
            const span = tag.javascript ? javascriptSpan(tag, match) : {text: match[0], ambiguous: false};
            expression.lastIndex = match.index + span.text.length;
            const previous = field.text.slice(0, match.index);
            const line = previous.split("\n").length - 1;
            found.push({tag: tag.key, id: tag.id, target: field.selector, field: field.path ?? field.listPath,
                start: match.index, end: match.index + span.text.length, line, column: match.index - previous.lastIndexOf("\n") - 1,
                ...(field.type === "troop-comment" ? {commandIndex: field.index + line} : {}),
                text: span.text, value: tag.type === "number" ? Number(match[1]) : span.text, availability: tag.availability,
                identity: identity(tag, span.text), ...(span.ambiguous ? {ambiguousSpan: true} : {}),
                precedence: tag.occurrences, ...(tag.reason ? {reason: tag.reason} : {})});
        }
    }
    found.sort((a, b) => a.start - b.start || a.end - b.end);
    const counts = new Map();
    return found.map(item => {
        const occurrence = counts.get(item.tag) ?? 0;
        counts.set(item.tag, occurrence + 1);
        return {...item, occurrence};
    });
}

function encodeTag(tag, value) {
    if (tag.availability !== "supported") throw new CoreError("CAPABILITY_UNAVAILABLE", tag.reason, {field: "tag", received: tag.key, availability: tag.availability}, 6);
    let text = value;
    if (tag.type === "number") {
        if (!Number.isSafeInteger(value) || value < tag.min || value > tag.max) throw new CoreError("INVALID_TAG_VALUE", "Use a nonnegative safe JSON integer.", {field: "value", received: value});
        text = tag.template.replace("{value}", String(value));
    }
    const match = typeof text === "string" && new RegExp(`^(?:${tag.pattern})$`, "i").exec(text);
    if (!match || /[\r\n]/.test(text)) throw new CoreError("INVALID_TAG_VALUE", "The value must match one complete supported tag format.", {field: "value", received: value, expected: tag.examples, hint: `Run core api describe ${tag.id} --json to inspect formats.`});
    if (tag.javascript) validateAuthoredCode({javascript: tag.javascript}, match[tag.javascript.capture], tag.id);
    return text;
}

function replaceString(document, path, value) {
    const span = jsonSpan(document, path);
    return parseJsonDocument(document.source.slice(0, span.start) + JSON.stringify(value) + document.source.slice(span.end));
}

function writeField(document, field, text) {
    if (field.textTarget) return parseJsonDocument(textOperation(document.source, field.textTarget, {operation: "set", index: field.textIndex, path: field.textPath, value: text}).source);
    if (field.type !== "troop-comment") return replaceString(document, field.path, text);
    const lines = text.split("\n");
    // Tags are single-line; retaining the comment's line count preserves every native command index.
    if (lines.length !== field.parts.length) throw new CoreError("INVALID_COMMENT_CHANGE", "A tag edit must preserve native comment line boundaries.");
    for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i] !== field.parts[i].parameters[0]) document = replaceString(document, [...field.listPath, field.index + i, "parameters", 0], lines[i]);
    }
    return document;
}

export function tagOperation(source, catalog, target, {operation, tag: key, occurrence, value, selector,validateOnly=false}) {
    const document = parseJsonDocument(source);
    const fields = tagFields(document, target, selector);
    const tag = key === undefined ? undefined : descriptor(catalog, key);
    for(const schema of operation==='set'&&tag?[tag]:validateOnly?catalog.tags:[])for(const field of fields){
        if(schema.targets.includes(field.type)&&(operation==='set'||new RegExp(schema.pattern,'i').test(field.text))&&schema.conflicts?.some(pattern=>new RegExp(pattern,'i').test(field.text)))throw new CoreError('INCOMPATIBLE_TAGS','Global cannot share a System name with JS or Self.',{field:field.path});
    }
    if (operation === "list") return {source, result: {occurrences: fields.flatMap(field => occurrences(field, tag ? [tag] : catalog.tags)),
        fields: fields.map(field => ({target: field.selector, type: field.type, field: field.path ?? field.listPath, text: field.text})),
        precedence: "Physical order is not necessarily runtime priority. Troop name precedes comments from all pages; troop overrides map. Consult the tag descriptor."}};
    if (!tag) throw new CoreError("INVALID_USAGE", "Use --tag to identify the expected Core tag family.");
    if (target.type === "troop") throw new CoreError("INVALID_TAG_TARGET", "Choose troop:T/name or a specific existing comment for writes. troop:T is read-only.", {field: "target"});
    const field = fields[0];
    if (!tag.targets.includes(field.type)) throw new CoreError("INVALID_TAG_TARGET", "This tag is not read from the selected native field.", {field: "target", expected: tag.targets});
    const found = occurrences(field, [tag]);
    const encoded = operation === "remove" ? "" : encodeTag(tag, value);
    const candidates = operation === "set" ? found.filter(item => item.identity === identity(tag, encoded)) : found;
    if (occurrence === undefined && candidates.length > 1) throw new CoreError("AMBIGUOUS_TAG", "Multiple matching tags exist. Choose --occurrence from tags list.", {field: "occurrence", candidates}, 4);
    const selected = occurrence === undefined ? candidates[0] : found[occurrence];
    if (occurrence !== undefined && (!Number.isSafeInteger(occurrence) || occurrence < 0 || !selected)) throw new CoreError("TAG_OCCURRENCE_NOT_FOUND", "Choose an existing zero-based occurrence from tags list.", {field: "occurrence", received: occurrence}, 3);
    if (operation === "remove" && !selected) throw new CoreError("TAG_NOT_FOUND", "The selected tag is absent; no file was changed.", {field: "tag", received: key}, 3);
    if (selected?.ambiguousSpan) throw new CoreError("AMBIGUOUS_TAG_SPAN", "Invalid JavaScript overlaps an adjacent tag; its boundary cannot be selected safely.", {field: "tag", hint: "Separate or repair the JavaScript tag in the editor, then list its occurrences again."}, 4);
    const start = selected?.start ?? field.text.length;
    const end = selected?.end ?? start;
    const before = field.text.slice(0, start);
    const after = field.text.slice(end);
    const isNote = field.path?.at(-1) === "note";
    let prefix = "", suffix = "";
    if (!selected && before.length) prefix = isNote ? (/\n$/.test(before) ? "" : "\n") : (/\s$/.test(before) ? "" : " ");
    if (tag.javascript && operation === "set") {
        if (before.length && !/\n$/.test(before)) prefix = "\n";
        if (after.length && !/^[\r\n]/.test(after)) suffix = "\n";
    }
    const text = before + prefix + encoded + suffix + after;
    const written = writeField(document, field, text);
    const writtenField = tagFields(written, target, selector)[0];
    if (writtenField.text !== text) throw new CoreError("INVALID_POSTCONDITION", "The written tag field differs from the requested edit.", {}, 5);
    return {source: written.source, result: {tag: tag.key, occurrence: selected?.occurrence ?? found.length, field: field.path ?? field.listPath,
        before: selected?.text ?? null, after: operation === "remove" ? null : encoded, occurrences: occurrences(writtenField, [tag])}};
}

export async function tagFileOperation(root, catalog, options) {
    const target = tagTarget(root, options.target);
    const snapshot = await readSnapshot(target.file, root);
    if(options.expectedHash!==undefined&&options.expectedHash!==snapshot.hash)throw new CoreError('FILE_CONFLICT','Read the target before retrying.',{fileHash:snapshot.hash},4);
    const change = tagOperation(snapshot.content.toString("utf8"), catalog, target, {...options, selector: options.target});
    const result = {file: relative(root, target.file), fileHash:snapshot.hash, ...change.result};
    if (options.operation !== "list") {
        if (options.dryRun) Object.assign(result, {dryRun: true, written: false, beforeHash: snapshot.hash, proposedHash: hash(change.source)});
        else Object.assign(result, await writeSnapshot(snapshot, change.source), {written: true});
    }
    return {operation: `${catalog.namespace ?? "core"} tags ${options.validateOnly?"validate":options.operation}`, target: options.target, result};
}
