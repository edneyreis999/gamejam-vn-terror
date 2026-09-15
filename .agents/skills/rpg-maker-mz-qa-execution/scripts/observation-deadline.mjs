export async function withDeadline(operation, milliseconds, label) {
  let timer;
  try {
    return await Promise.race([
      Promise.resolve().then(operation),
      new Promise((_, reject) => { timer = setTimeout(() => {
        const error = new Error(`${label} exceeded ${milliseconds}ms.`);
        error.name = 'ObservationTimeoutError'; reject(error);
      }, milliseconds); })
    ]);
  } finally { clearTimeout(timer); }
}

export async function readObservation(page, label, fn, arg, milliseconds) {
  await withDeadline(() => page.evaluate(label => { globalThis.__qaTelemetry.pendingObservation = {label, rows: [], cancelled: false}; }, label), milliseconds, label);
  try {
    const value = await withDeadline(() => page.evaluate(fn, arg), milliseconds, label);
    await withDeadline(() => page.evaluate(() => { delete globalThis.__qaTelemetry.pendingObservation; }), milliseconds, label);
    return value;
  } catch (error) {
    try {
      error.partialObservation = await withDeadline(() => page.evaluate(() => {
        const pending = globalThis.__qaTelemetry.pendingObservation;
        if (pending) pending.cancelled = true;
        return pending;
      }), Math.min(milliseconds, 5000), `${label} partial trace`);
    } catch (captureError) { error.partialObservationUnavailable = captureError.message; }
    throw error;
  }
}
