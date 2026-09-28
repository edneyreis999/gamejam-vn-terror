import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('rpg-maker/The Dryland Drowned');
const targets = ['data/Map002.json', 'data/Map023.json'];
const black = [1, 'Dryland_Black', 0, 0, 0, 0, 100, 100, 255, 0];

for (const relative of targets) {
  const file = path.join(root, relative);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  let found = 0;
  let inserted = 0;
  for (const event of data.events ?? []) {
    if (!event) continue;
    for (const page of event.pages ?? []) {
      const list = page.list ?? [];
      for (let i = 0; i < list.length; i += 1) {
        const command = list[i];
        const args = command?.parameters?.[3];
        if (command?.code !== 357 || command.parameters?.[0] !== 'VisuMZ_2_VNPictureBusts' ||
            command.parameters?.[1] !== 'Basic_EnterBust' || args?.['PictureName:str'] !== 'Reed final') {
          continue;
        }
        found += 1;
        const previous = list[i - 1];
        if (previous?.code === 231 && previous.parameters?.[0] === 1 && previous.parameters?.[1] === 'Dryland_Black') {
          continue;
        }
        list.splice(i, 0, { code: 231, indent: command.indent, parameters: black });
        inserted += 1;
        i += 1;
      }
    }
  }
  if (found === 0) throw new Error(`Nenhuma entrada Reed final encontrada em ${relative}`);
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`${relative}: ${found} referência(s), ${inserted} background(s) preto(s) inserido(s)`);
}
