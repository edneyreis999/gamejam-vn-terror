// Resolve `$[chave]` com a coluna Portuguese de Languages.tsv, do mesmo jeito que o jogo
// (TextManager.getLocalizedText): barra invertida vira ESC e <SEMI> vira ponto e vírgula.
import { readFileSync } from 'node:fs';
import path from 'node:path';

const file = path.resolve('rpg-maker/The Dryland Drowned/Languages.tsv');
const rows = new Map();
for (const line of readFileSync(file, 'utf8').split(/\r?\n/).slice(1)) {
  const cells = line.split('\t');
  if (cells.length >= 3 && cells[0]) rows.set(cells[0].toLowerCase().trim(), cells[2]);
}

export function portuguese(key) {
  const cell = rows.get(String(key).toLowerCase().trim());
  if (cell === undefined) throw new Error(`Languages.tsv sem a chave ${key}`);
  return cell.replace(/\\/g, '\x1b').replace(/<SEMI(?:|-COLON|COLON)>/gi, ';');
}

export const resolve = text => String(text).replace(/\$\[(.*?)\]/g, (_, key) => portuguese(key));
