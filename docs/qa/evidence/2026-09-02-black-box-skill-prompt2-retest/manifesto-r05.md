# Manifesto de execução — reteste r05

- Tentativa: R4/r05
- Cartão: `docs/qa/guides/routes/001-criar-guia-de-testes--prompt2.md`
- Revisão executada: r04
- Build/fingerprint informado: `119a360a80ccf09a6f94c46bee1a43af56f86e09` (não recalculado)
- Entrada: `http://127.0.0.1:4187/`
- SLA: 15.000 ms, tolerância zero; início antes da primeira entrada direcional no mapa inicial; fim no primeiro quadro estável dos créditos
- Regra nova do guia: R09 cumpre ao materializar `ArrowLeft` imediatamente antes de `Enter`
- Preflight relido: limite inferior 5.130 ms; soma nominal 12.054 ms; margem 1.500 ms; orçamento previsto 13.554 ms; replay autorizado

| Step ID | Ações públicas congeladas |
|---|---|
| R01 | `Shift` + `ArrowRight` 180 ms; liberar seta e `Shift`; wait 300 ms |
| R02 | 4 × (`Shift` + `ArrowDown` 180 ms; liberar; wait 300 ms) |
| R03 | 2 × (`Shift` + `ArrowRight` 360 ms; liberar; wait 300 ms) |
| R04 | `Shift` + `ArrowLeft` 180 ms; liberar; wait 300 ms |
| R05 | `Shift` + `ArrowUp` 360 ms, 360 ms e 180 ms; liberar e wait 300 ms após cada hold |
| R06 | `Shift` + `ArrowRight` 180 ms; liberar; wait 300 ms |
| R07 | `Shift` + `ArrowUp` 360 ms, 360 ms e 180 ms; liberar e wait 300 ms após cada hold |
| R08 | `Shift` + `ArrowLeft` 720 ms e 270 ms; liberar e wait 300 ms após cada hold |
| R09 | `ArrowLeft` sem `Shift` 180 ms; liberar; wait 300 ms; `Enter` 180 ms; liberar; aguardar até 1.200 ms pelo primeiro quadro estável de créditos |

- Política de divergência: liberar entradas, abortar sem recalibração e usar reset público; não repetir R09 dentro da medição.

## Resultado executado

- Instrumento: `performance.now()` do navegador, monotônico, consultado imediatamente antes de R01 e após a captura do primeiro quadro estável auditado de CF.
- Duração bruta: **12.042,8 ms**; resultado da SLA: **PASS** (`12.042,8 < 15.000`, tolerância zero).
- Marcos temporais: C2 3.815,8 ms; C3 6.169,3 ms; C4 8.523,0 ms; orientação R09 iniciada 10.132,8 ms e liberada 10.317,1 ms; confirmação iniciada 10.619,6 ms e liberada 10.804,0 ms; CF auditado 12.042,8 ms.
- Correspondência: R01–R09 enviados na ordem e com as durações congeladas; a orientação pública de R09 ocorreu imediatamente antes da confirmação, sem entrada intermediária.
- Pós-SLA: créditos permaneceram visíveis por 3.000 ms antes do reset público.
- Reset: `Voltar ao título` → título legível → seleção explícita de `Novo Jogo` → mesmo mapa inicial observado.
- Evidência: todas as imagens deste diretório foram reabertas e inspecionadas visualmente.
