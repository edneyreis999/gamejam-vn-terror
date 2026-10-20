import { parseArgs } from 'node:util';
import { realpath } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { run } from './browser-runtime.mjs';
export { run } from './browser-runtime.mjs';

const mainPath = process.argv[1] && await realpath(resolve(process.argv[1])).catch(error => {
  if (!['ENOENT', 'ENAMETOOLONG'].includes(error.code)) throw error;
});
if (mainPath && import.meta.url === pathToFileURL(mainPath).href) {
  const cancelStartup = message => { if (message?.type === 'qa:cancel') process.exit(1); };
  const releaseStartup = () => process.off('message', cancelStartup);
  process.on('message', cancelStartup);
  process.channel?.unref();
  process.send?.({type:'qa:ready'});
  try {
    const { values } = parseArgs({ options: Object.fromEntries(['project', 'fixture', 'case', 'adapter', 'output', 'diagnostic'].map(key => [key, { type: 'string' }]).concat([['help', { type: 'boolean' }]])) });
    if (values.help) {
      console.log('Usage: node <runner>/directed-browser.mjs --project PATH --fixture PATH --case MODULE.mjs --adapter MODULE.mjs --output NEW_DIRECTORY\nInstall: npm ci --prefix <runner>, where <runner> is the directory containing this script and package-lock.json. Install pinned Chromium with the local Playwright CLI. Screenshots require --diagnostic REASON. Browser width/height/DPR/locale/channel are explicit case.scenario.browser settings. Exit 0: collected (inspect automated report and coverage limits); exit 1: failure.');
    } else {
      for (const key of ['project', 'fixture', 'case', 'adapter', 'output']) if (!values[key]) throw new Error(`Missing --${key}`);
      const sources = [values.case, values.adapter].map(p => resolve(p));
      const [caseModule, adapter] = await Promise.all(sources.map(p => import(pathToFileURL(p).href)));
      const report = await run({ ...values, adapter, caseModule, sources, onCancellationReady: releaseStartup });
      console.log(JSON.stringify({ status: report.status, output: resolve(values.output) }));
      if (report.status === 'fail') process.exitCode = 1;
    }
  } catch (error) { console.error(error.stack); process.exitCode = 1; }
  finally { releaseStartup(); }
}
