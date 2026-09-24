import { CoreError } from "../../src/core-engine/parameters.mjs";

const continuation = new Map([[101, 401], [105, 405], [108, 408], [205, 505], [302, 605], [355, 655], [357, 657]]);
const continuationCodes = new Set(continuation.values());
const closing = new Map([[412, 111], [413, 112], [404, 102], [604, 301]]);
const branchMarkers = new Map([[411, 111], [402, 102], [403, 102], [601, 301], [602, 301], [603, 301]]);

function invalid(message, index) {
    throw new CoreError("INVALID_EVENT_LIST", message, { field: `list/${index}`, hint: "Inspect the existing list in the editor. The CLI does not repair branches or continuations automatically." });
}

export function eventUnits(list) {
    if (!list.length || list.at(-1)?.code !== 0 || list.at(-1)?.indent !== 0) invalid("The list must end with its native code 0 terminator.", list.length - 1);
    const units = [];
    const branches = [];
    for (let index = 0; index < list.length; index++) {
        const command = list[index];
        if (!command || !Number.isInteger(command.code) || !Number.isInteger(command.indent) || command.indent < 0 || !Array.isArray(command.parameters)) invalid("Invalid native event command.", index);
        if (continuationCodes.has(command.code)) invalid("Continuation has no matching adjacent owner.", index);
        const parent = branches.at(-1);
        const markerOwner = closing.get(command.code) ?? branchMarkers.get(command.code);
        if (markerOwner !== undefined) {
            if (parent?.code !== markerOwner || parent.indent !== command.indent) invalid("Branch marker does not match its owner.", index);
            if (closing.has(command.code)) branches.pop();
        } else if (command.indent !== (parent ? parent.indent + 1 : 0)) invalid("Command indentation does not match its branch.", index);
        const start = index;
        const code = continuation.get(command.code);
        while (code !== undefined && list[index + 1]?.code === code) {
            index++;
            if (list[index].indent !== command.indent || !Array.isArray(list[index].parameters)) invalid("Continuation indentation or payload differs from its owner.", index);
            if(code===657 && (list[index].parameters.length!==1 || typeof list[index].parameters[0]!=='string')) invalid('Plugin command annotation must contain one native string.',index);
        }
        units.push({ index: start, endIndex: index + 1, code: command.code, indent: command.indent,
            insertionAllowed: markerOwner === undefined });
        if ([111, 112, 102].includes(command.code) || command.code === 301 && [601, 602, 603].includes(list[index + 1]?.code)) {
            branches.push({ code: command.code, indent: command.indent });
        }
    }
    if (branches.length) invalid("An event branch is not closed.", list.length - 1);
    const labels = new Set(list.filter(command => command.code === 118).map(command => command.parameters[0]));
    for (let index = 0; index < list.length; index++) {
        if (list[index].code === 119 && !labels.has(list[index].parameters[0])) invalid("Jump target label does not exist in this list.", index);
    }
    return units;
}

export function unitAt(units, index, operation) {
    if (!Number.isSafeInteger(index) || index < 0) throw new CoreError("INVALID_POSITION", "Use an integer index from commands list.", { field: "index", received: index });
    const unit = units.find(unit => unit.index === index);
    if (!unit) throw new CoreError("INVALID_POSITION", "Select the start of a complete command, not a continuation.", { field: "index", received: index });
    if (operation === "insert" && !unit.insertionAllowed) throw new CoreError("INVALID_POSITION", "Select a command or blank code 0 inside the branch body, rather than its Else/end marker.", { field: "index", received: index });
    return unit;
}
