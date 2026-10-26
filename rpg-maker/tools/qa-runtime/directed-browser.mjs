import { parseArgs } from 'node:util';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { run } from './browser-runtime.mjs';
export { run } from './browser-runtime.mjs';

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const { values } = parseArgs({ options: Object.fromEntries(['project', 'fixture', 'case', 'adapter', 'output'].map(key => [key, { type: 'string' }]).concat([['help', { type: 'boolean' }]])) });
    if (values.help) {
      console.log('Usage: node directed-browser.mjs --project PATH --fixture PATH --case MODULE.mjs --adapter MODULE.mjs --output NEW_DIRECTORY\nInstall: npm ci --prefix <skill>/scripts. Prepare Chrome separately. Browser width/height/DPR/locale/channel are explicit case.scenario.browser settings. Exit 0: collected (inspect report for pending review); exit 1: failure.');
    } else {
      for (const key of ['project', 'fixture', 'case', 'adapter', 'output']) if (!values[key]) throw new Error(`Missing --${key}`);
      const sources = [values.case, values.adapter].map(p => resolve(p));
      const [caseModule, adapter] = await Promise.all(sources.map(p => import(pathToFileURL(p).href)));
      const report = await run({ ...values, adapter, caseModule, sources });
      console.log(JSON.stringify({ status: report.status, output: resolve(values.output) }));
      if (report.status === 'fail') process.exitCode = 1;
    }
  } catch (error) { console.error(error.stack); process.exitCode = 1; }
}
