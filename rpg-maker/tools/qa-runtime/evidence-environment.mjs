import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { realpath } from 'node:fs/promises';
import { join } from 'node:path';
import os from 'node:os';
import { EvidenceError, fileDigest } from './evidence-identity.mjs';

const execute = promisify(execFile);

// Probe installed files/version without launching a browsing session.
export async function describeEnvironment(browser) {
  if ((browser?.channel ?? 'chrome') !== 'chrome') throw new EvidenceError('incomplete-dependencies', 'Installed-browser probe currently supports Chrome only.');
  if (!browser || !Number.isInteger(browser.width) || !Number.isInteger(browser.height) || !browser.dpr || !browser.locale) {
    throw new EvidenceError('incomplete-dependencies', 'Explicit browser geometry and locale required.');
  }
  let executable, version, paths;
  if (process.platform === 'darwin') {
    const contents = '/Applications/Google Chrome.app/Contents';
    executable = join(contents, 'MacOS/Google Chrome');
    const info = join(contents, 'Info.plist');
    version = (await execute('/usr/libexec/PlistBuddy', ['-c', 'Print :CFBundleShortVersionString', info], { timeout: 5000 })).stdout.trim();
    paths = [info, executable, join(contents, 'Frameworks/Google Chrome Framework.framework/Versions/Current/Google Chrome Framework')];
  } else if (process.platform === 'linux') {
    executable = '/opt/google/chrome/chrome';
    version = (await execute(executable, ['--version'], { timeout: 5000 })).stdout.match(/\d+\.\d+\.\d+\.\d+/)?.[0];
    paths = [executable];
  } else {
    throw new EvidenceError('incomplete-dependencies', 'No verified installed-browser probe for this platform; use normal QA.');
  }
  if (!/^\d+\.\d+\.\d+\.\d+$/.test(version ?? '')) throw new EvidenceError('incomplete-dependencies', 'Chrome installation version unavailable.');
  const installation = [];
  for (const path of paths) {
    const actual = await realpath(path);
    installation.push({ path: actual, ...await fileDigest(actual) });
  }
  return {
    node: process.version, platform: process.platform, release: os.release(), osVersion: os.version(), arch: process.arch,
    browser: { ...browser, channel: 'chrome', query: browser.query ?? '?test', timeoutMs: browser.timeoutMs ?? 15000, keyReleaseMs: browser.keyReleaseMs ?? 35, launchArgs: browser.launchArgs ?? [] },
    installation: { version, executable: await realpath(executable), files: installation }
  };
}
