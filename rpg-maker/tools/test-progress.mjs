// Transforma a saída TAP do `node --test` em uma linha de progresso por teste concluído.
// Uso: const progress = createProgress(total, write); progress.line(linhaTap); progress.summary().
// Falhas mostram o bloco de diagnóstico do TAP logo abaixo da linha.
export function createProgress(total, write = line => console.log(line), now = Date.now) {
  const start = now();
  let done = 0;
  let failed = 0;
  let inFailure = false;

  const elapsed = () => {
    const seconds = Math.round((now() - start) / 1000);
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  };

  return {
    line(text) {
      const result = /^(not )?ok \d+ - (.*)$/.exec(text);
      if (result && !/\.mjs$/.test(result[2])) {
        done++;
        inFailure = Boolean(result[1]);
        if (inFailure) failed++;
        const name = result[2].replace(/ — .*/, '');
        write(`[${String(done).padStart(String(total).length)}/${total}] ${inFailure ? '✖ FALHOU' : '✔'} ${name}  (${elapsed()}${failed ? `, ${failed} falha(s)` : ''})`);
        return;
      }
      if (inFailure && /^\s/.test(text)) write(`      ${text.trim()}`);
      else inFailure = false;
    },
    summary: () => ({ done, failed })
  };
}
