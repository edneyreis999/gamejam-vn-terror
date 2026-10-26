import {withDeadline} from './observation-deadline.mjs';

export const defaultWaitTimeout = 30000;

export function configureContext(context, {timeout = defaultWaitTimeout, diagnostics} = {}) {
    if (!Number.isSafeInteger(timeout) || timeout <= 0) throw new Error('Browser wait timeout must be positive integer milliseconds.');
    context.setDefaultTimeout(timeout);
    context.setDefaultNavigationTimeout(timeout);
    diagnostics?.track(context);
    return context;
}

export function failureDiagnostics({identity, budget = 5000} = {}) {
    const pages = new Map(), contexts = new Set(), screenshots = [];
    let capture;
    const trackPage = page => {
        if (pages.has(page)) return;
        const errors = [];
        const record = error => { errors.push(error); if (errors.length > 100) errors.shift(); };
        page.on('pageerror', error => record({type:'page', message:error.message, stack:error.stack}));
        page.on('console', message => { if (message.type() === 'error') record({type:'console', message:message.text()}); });
        pages.set(page, errors);
    };
    return {
        screenshots,
        track(context) {
            if (contexts.has(context)) return;
            contexts.add(context);
            context.on('page', trackPage);
            for (const page of context.pages()) trackPage(page);
        },
        capture(failures) {
            if (!failures?.length) return Promise.resolve();
            return capture ??= (async () => {
                const started = performance.now(), report = {identity, budgetMs:budget,
                    failures:failures.map(error => ({name:error.name, message:error.message, stack:error.stack})), pages:[]};
                for (const [page, errors] of pages) {
                    const row = {url:page.url(), errors:[...errors]};
                    report.pages.push(row);
                    if (page.isClosed()) { row.unavailable = 'Page already closed'; continue; }
                    const observe = async (label, operation, limit) => {
                        const remaining = Math.floor(budget - (performance.now() - started));
                        if (remaining <= 0) { row[label + 'Error'] = 'Diagnostic budget exhausted'; return; }
                        try { return await withDeadline(operation, Math.min(limit, remaining), 'Failure diagnostic: ' + label); }
                        catch (error) { row[label + 'Error'] = error.message; }
                    };
                    row.state = await observe('state', () => page.evaluate(() => {
                        const manager = globalThis.SceneManager, scene = manager?._scene;
                        return {readyState:document.readyState, visibility:document.visibilityState, fonts:document.fonts.status,
                            fade:scene?._fadeDuration, pendingDataErrors:globalThis.DataManager?._errors,
                            scene:scene?.constructor.name, nextScene:manager?._nextScene?.constructor.name,
                            started:scene?._started, changing:manager?.isSceneChanging?.(), busy:scene?.isBusy?.(),
                            commandActive:scene?._commandWindow?.active, frame:globalThis.Graphics?.frameCount};
                    }), 1000);
                    const bytes = await observe('screenshot', () => page.screenshot({timeout:Math.max(1, Math.min(2000, Math.floor(budget - (performance.now() - started))))}), 2000);
                    if (bytes) {
                        row.screenshot = 'failure-page-' + report.pages.length + '.png';
                        screenshots.push({name:row.screenshot, bytes});
                    }
                }
                report.elapsedMs = performance.now() - started;
                return report;
            })();
        }
    };
}
