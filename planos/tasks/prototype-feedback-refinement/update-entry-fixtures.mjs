import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
// D-025 changes the public entry. Existing suites continue through the real
// title/notice/file controls; the gate itself is owned by IT-085.
for (const directory of ['rpg-maker/tests/helpers','rpg-maker/tests/suites']) {
  for (const entry of readdirSync(directory).filter(name => name.endsWith('.mjs'))) {
    const file = directory + '/' + entry, before = readFileSync(file,'utf8');
    const after = before.replace(/(?:window\.)?\$gameMessage(?:\?\.)?\.choices\(\)\.includes\('(Jogar|Continuar)'\)/g,"($gameMessage?._drylandChoiceFocus?.key === 'title')")
      .replace(/(?:window\.)?\$gameMessage\?\.choices\(\)\.includes\('Continuar'\)/g,"($gameMessage?._drylandChoiceFocus?.key === 'title')");
    if(after !== before){writeFileSync(file,after);console.log(file);}
  }
}
