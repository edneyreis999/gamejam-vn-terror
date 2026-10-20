import {audioOutput} from './browser-audio.mjs';

export function browserLaunchArguments(config) {
    return [...audioOutput(config).args,
        ...(process.platform === 'win32' && (config.headless ?? true) ? ['--enable-gpu'] : []),
        ...(config.launchArgs ?? [])];
}
