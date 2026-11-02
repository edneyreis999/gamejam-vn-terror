// Estado do plugin de Debug de QA (ADR-G007) dentro de um js/plugins.js.
// Só o prune-build e o verify-build usam isto; o projeto-fonte nunca é reescrito por aqui.
export const DEBUG_PLUGIN = 'Dryland_7_QADebug';
const MARK = 'var $plugins =\n';

export function parsePlugins(text) {
  const at = text.indexOf(MARK);
  if (at < 0) throw new Error('js/plugins.js não tem o formato "var $plugins =".');
  const head = text.slice(0, at + MARK.length);
  const body = text.slice(at + MARK.length);
  return { head, plugins: JSON.parse(body.slice(0, body.lastIndexOf(']') + 1)), tail: body.slice(body.lastIndexOf(']') + 1) };
}

export function writePlugins({ head, plugins, tail }) {
  return `${head}${JSON.stringify(plugins, null, 4)}${tail}`;
}

export function debugStatus(text) {
  const entry = parsePlugins(text).plugins.find(plugin => plugin.name === DEBUG_PLUGIN);
  return entry ? Boolean(entry.status) : null;
}

export function withDebugStatus(text, status) {
  const parsed = parsePlugins(text);
  const entry = parsed.plugins.find(plugin => plugin.name === DEBUG_PLUGIN);
  if (entry) entry.status = status;
  return writePlugins(parsed);
}

// O prune-build pode desativar o Debug só no build: é a única diferença aceita em js/plugins.js.
export function differsOnlyByDebug(builtText, originalText) {
  return debugStatus(originalText) !== null && withDebugStatus(builtText, false) === withDebugStatus(originalText, false);
}

export function debugReport(inBuild, inSource) {
  return inBuild ? 'Debug: ativo' : inSource ? 'Debug: inativo (desativado pelo prune-build)' : 'Debug: inativo';
}
