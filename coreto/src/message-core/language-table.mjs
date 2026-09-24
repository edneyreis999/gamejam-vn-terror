import {CoreError} from '../core-engine/parameters.mjs';

export function isLanguageBasename(value, format) {
    return typeof value === 'string' && !!value && value === value.trim() &&
        !/[\\/:?#%\x00-\x1f\x7f]/.test(value) && !value.startsWith('.') && value.endsWith(`.${format}`);
}

const normalized = value => value.trim().toLowerCase();
function invalid(message, row, column) {
    throw new CoreError('INVALID_LANGUAGE_TABLE', message, {row, column});
}
export function languageDelimiter(format) {
    if (format === 'csv') return ';';
    if (format === 'tsv') return '\t';
    throw new CoreError('INVALID_LANGUAGE_FORMAT', 'Use csv or tsv.', {received: format});
}
export function validateLanguageRows(rows) {
    const header = rows[0];
    if (!header || header.length < 2 || normalized(header[0]) !== 'key') invalid('First column must be Key, followed by language columns.', 1, 1);
    const columns = new Set();
    for (const [index, value] of header.entries()) {
        const key = normalized(value);
        if (!key || columns.has(key)) invalid('Empty or duplicate normalized column.', 1, index + 1);
        columns.add(key);
    }
    const keys = new Set();
    for (const [index, row] of rows.entries()) {
        if (row.length !== header.length) invalid(`Expected ${header.length} cells.`, index + 1, row.length + 1);
        if (row.some(value => /[\r\n]/.test(value))) invalid('Use <br> instead of physical newlines inside a cell.', index + 1, 1);
        if (!index) continue;
        const key = normalized(row[0]);
        if (!key || keys.has(key)) invalid('Empty or duplicate normalized key.', index + 1, 1);
        keys.add(key);
    }
    return rows;
}
export function parseLanguageTable(text, format) {
    const delimiter = languageDelimiter(format);
    text = text.replace(/^\uFEFF/, '');
    const rows = [];
    let row = [], cell = '', state = 'start';
    function endCell() {row.push(cell); cell = ''; state = 'start';}
    for (let index = 0; index < text.length; index++) {
        const char = text[index];
        if (char === '\r' || char === '\n') {
            if (state === 'quoted') invalid('Use <br> instead of physical newlines inside a quoted cell.', rows.length + 1, row.length + 1);
            if (char === '\r' && text[index + 1] !== '\n') invalid('Use LF or CRLF line endings.', rows.length + 1, row.length + 1);
            if (char === '\r') index++;
            endCell(); rows.push(row); row = [];
        } else if (state === 'quoted') {
            if (char === '"') {
                if (text[index + 1] === '"') {cell += '"'; index++;}
                else state = 'closed';
            } else cell += char;
        } else if (char === delimiter) endCell();
        else if (char === '"' && state === 'start') state = 'quoted';
        else if (char === '"' || state === 'closed') invalid('Unexpected character outside a quoted cell.', rows.length + 1, row.length + 1);
        else {cell += char; state = 'plain';}
    }
    if (state === 'quoted') invalid('Unclosed quoted cell.', rows.length + 1, row.length + 1);
    if (row.length || cell || state !== 'start') {endCell(); rows.push(row);}
    return validateLanguageRows(rows);
}
export function serializeLanguageTable(rows, format) {
    const delimiter = languageDelimiter(format);
    validateLanguageRows(rows);
    return rows.map(row => row.map(cell => cell.includes(delimiter) || cell.includes('"') ? `"${cell.replaceAll('"', '""')}"` : cell).join(delimiter)).join('\n') + '\n';
}

// Original 1.54 template data; no runtime implementation is copied.
export const languageTemplate = [
    [
        "Key",
        "English",
        "Bengali",
        "Chinese(Simplified)",
        "Chinese(Traditional)",
        "Czech",
        "Danish",
        "Dutch",
        "Finnish",
        "French",
        "German",
        "Greek",
        "Hindi",
        "Hungarian",
        "Indonesian",
        "Italian",
        "Japanese",
        "Korean",
        "Norwegian",
        "Polish",
        "Portuguese",
        "Romanian",
        "Russian",
        "Slovak",
        "Spanish",
        "Swedish",
        "Tamil",
        "Thai",
        "Turkish"
    ],
    [
        "Greeting",
        "Hello",
        "হ্যালো",
        "你好",
        "你好",
        "Ahoj",
        "Hej",
        "Hallo",
        "Hei",
        "Bonjour",
        "Hallo",
        "Γειά σου",
        "नमस्ते",
        "Szia",
        "Halo",
        "Ciao",
        "こんにちは",
        "안녕하세요",
        "Hei",
        "Cześć",
        "Olá",
        "Salut",
        "Привет",
        "Ahoj",
        "Hola",
        "Hej",
        "வணக்கம்",
        "สวัสดี",
        "Merhaba"
    ],
    [
        "Farewell",
        "Good-bye",
        "বিদায়",
        "再见",
        "再見",
        "Sbohem",
        "Farvel",
        "Tot ziens",
        "Näkemiin",
        "Au revoir",
        "Auf Wiedersehen",
        "Αντίο",
        "अलविदा",
        "Viszontlátásra",
        "Selamat tinggal",
        "Arrivederci",
        "さようなら",
        "안녕히 가세요",
        "Ha det",
        "Do widzenia",
        "Adeus",
        "La revedere",
        "До свидания",
        "Zbohom",
        "Adiós",
        "Hejdå",
        "பிரியாவிடை",
        "ลาก่อน",
        "Hoşça kal"
    ],
    [
        "Wow",
        "Wow",
        "ওহে",
        "哇",
        "哇",
        "Ó",
        "Wow",
        "Wauw",
        "Vau",
        "Waouh",
        "Wow",
        "Ουάου",
        "वाह",
        "Hűha",
        "Wah",
        "Wow",
        "ワオ",
        "와우",
        "Oi",
        "O",
        "Uau",
        "Uau",
        "Вау",
        "Ó",
        "Guau",
        "Oj",
        "ஆஹா",
        "ว้าว",
        "Vay"
    ]
];
