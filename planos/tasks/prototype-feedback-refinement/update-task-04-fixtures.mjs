import {readFileSync,writeFileSync} from 'node:fs';
const root='rpg-maker/tests/suites/';
for(const name of ['encounters','persistence','native-checkpoints']) {
  const file=root+name+'.mjs';let source=readFileSync(file,'utf8');
  source="import { openDestinations } from '../helpers/formation.mjs';\n"+source;
  source=source.replaceAll("await activate(browser, 'formation', 8);","await openDestinations(browser);")
    .replaceAll("await activate(browser,'formation',8);","await openDestinations(browser);")
    .replaceAll("await activate(browser, 'formation', 10);","await activate(browser, 'destinations', 4);")
    .replaceAll("await activate(browser,'formation',10);","await activate(browser,'destinations',4);")
    .replace("await activate(browser,'destinations',route);await choices(browser,'formation');","await activate(browser,'destinations',route);await choices(browser,'destinations');")
    .replace("await arm(browser,'departure');await activate(browser,'destinations',4);","await openDestinations(browser);await arm(browser,'departure');await activate(browser,'destinations',4);");
  writeFileSync(file,source);
}
for(const name of ['native-inventory','native-controls']) {
  const file=root+name+'.mjs';let source=readFileSync(file,'utf8');
  source=source.replace("'HeroContainer','NarrativeChoice'].map","'HeroContainer','NarrativeChoice','RouteTarget','RouteInformation','RouteFooter'].map")
    .replace("maxItems()'),11,'Preload","maxItems()'),10,'Preload")
    .replace("$gameMessage.choices().length'),11)","$gameMessage.choices().length'),10)");
  writeFileSync(file,source);
}
