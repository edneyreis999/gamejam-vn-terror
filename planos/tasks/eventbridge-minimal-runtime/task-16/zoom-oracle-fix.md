# Proveniência — correção do oráculo de raster no zoom nativo

Data: 2026-09-13  
Escopo autorizado: `.agents/skills/rpg-maker-mz-qa-execution/scripts/browser-runtime.mjs` e este registro.

## Motivo

`surfaces-native-zoom-02/report.json` registrou viewport CSS `1571×835`, DPR
`1.100000023841858` e PNG `1728×918`. O oráculo anterior reconstruía o raster
com `Math.round(innerWidth/innerHeight * dpr)`, produzindo `1728×919` na altura
(`835 × 1.100000023841858 = 918.5000199079514`). Os campos CSS inteiros não
preservam a dimensão física inteira em zoom fracionário.

## Fingerprints

O arquivo era rastreado no commit-base `5d0d9ab0296e7150cfbdd7ab263d304eeab06fdb`.

| Estado | SHA-256 |
| --- | --- |
| Preimagem (`git show HEAD:.agents/skills/rpg-maker-mz-qa-execution/scripts/browser-runtime.mjs`) | `410b0a8f34c74c7fe824d52f1a1342333bf0da272afc484f893bf8f4b30f4007` |
| Pós-correção | `1351387c0c4d57950f21ffeccff64aa5d55e781d7a419a19d62abe2191b9bbe2` |

## Patch aplicado

- Adiciona `physicalViewport()`, que consulta `Page.getLayoutMetrics` pelo
  CDP e usa `layoutViewport.clientWidth/clientHeight` como dimensão física
  inteira independente.
- Exige `visualViewport.scale === 1`; pinch zoom é reportado como falha
  explícita.
- Mede `innerWidth/Height` contra `document.documentElement.clientWidth/Height`
  e rejeita barras de rolagem visíveis, pois os métricos físicos usados
  excluem scrollbar.
- Registra o métrico físico no bloco `nativeZoom` e em cada captura.
- Compara o métrico físico antes/depois da captura e valida o PNG exatamente
  contra ele. Não há tolerância, resize, retry ou ajuste fixo de altura.

Hunk exato no runner (reproduzível com `git diff` restrito ao arquivo):

```diff
@@
+  const physicalViewport = async () => {
+    const metrics = await session.send('Page.getLayoutMetrics');
+    const viewport = metrics?.layoutViewport;
+    const visual = metrics?.visualViewport;
+    if (!viewport || !Number.isSafeInteger(viewport.clientWidth) || !Number.isSafeInteger(viewport.clientHeight)) throw new Error('CDP physical layout viewport unavailable.');
+    if (!visual || visual.scale !== 1) throw new Error(`Capture requires visualViewport.scale=1; got ${visual?.scale ?? 'unavailable'}.`);
+    const scrollbars = await page.evaluate(() => {
+      const root = document.documentElement;
+      return {
+        vertical: innerWidth > root.clientWidth,
+        horizontal: innerHeight > root.clientHeight,
+        width: Math.max(0, innerWidth - root.clientWidth),
+        height: Math.max(0, innerHeight - root.clientHeight)
+      };
+    });
+    if (scrollbars.vertical || scrollbars.horizontal) throw new Error(`Capture requires a scrollbar-free viewport; got ${JSON.stringify(scrollbars)}.`);
+    return { width: viewport.clientWidth, height: viewport.clientHeight, visualScale: visual.scale, scrollbars };
+  };
@@
-      if (bytes.readUInt32BE(16) !== Math.round(expectedGeometry.width * expectedGeometry.dpr) || bytes.readUInt32BE(20) !== Math.round(expectedGeometry.height * expectedGeometry.dpr)) throw new Error(`Capture dimensions mismatch: PNG ${bytes.readUInt32BE(16)}x${bytes.readUInt32BE(20)}, expected ${Math.round(expectedGeometry.width * expectedGeometry.dpr)}x${Math.round(expectedGeometry.height * expectedGeometry.dpr)}.`);
+      if (bytes.readUInt32BE(16) !== rasterBefore.width || bytes.readUInt32BE(20) !== rasterBefore.height) throw new Error(`Capture dimensions mismatch: PNG ${bytes.readUInt32BE(16)}x${bytes.readUInt32BE(20)}, expected CDP physical viewport ${rasterBefore.width}x${rasterBefore.height}.`);
```

## Evidência e validação

- Evidência que motivou a alteração: `docs/qa/evidence/eventbridge-minimal-runtime/task-16/surfaces-native-zoom-02/report.json` (árvore ignorada).
- `node --check .agents/skills/rpg-maker-mz-qa-execution/scripts/browser-runtime.mjs`: PASS.
- `git diff --check -- .agents/skills/rpg-maker-mz-qa-execution/scripts/browser-runtime.mjs`: PASS.
- Nenhum browser, servidor, jogo ou suíte foi executado nesta alteração.

O campo CDP físico legado é marcado como deprecated pelo protocolo, mas ainda
é exposto pelo Chrome usado no QA; os campos `css*` não foram usados porque
continuam em CSS pixels. A validação headed do cenário é necessária para
confirmar os valores reais após a correção.

## Resultado headed posterior

O relatório `docs/qa/evidence/eventbridge-minimal-runtime/task-16/surfaces-native-zoom-03/report.json`
registrou o métrico físico corrigido: raster `1728×918`,
`visualViewport.scale = 1`, barras de rolagem vertical e horizontal ausentes,
DPR `1.100000023841858` e viewport CSS `1571×835`. As 28 capturas PNG desse
run têm dimensões válidas para esse raster. O snapshot do código efetivamente
carregado pelo runner é
`docs/qa/evidence/eventbridge-minimal-runtime/task-16/surfaces-native-zoom-03/source-6.mjs`,
correspondente ao arquivo-fonte
`.agents/skills/rpg-maker-mz-qa-execution/scripts/browser-runtime.mjs`,
SHA-256 `1351387c0c4d57950f21ffeccff64aa5d55e781d7a419a19d62abe2191b9bbe2`.

O status geral de `surfaces-native-zoom-03` permanece `fail` porque a
execução posterior não encontrou a formação esperada (`native-surfaces.test.mjs:47`);
isso é uma falha de navegação do cenário após as capturas, separada da
validação de raster acima. Este registro não transforma esse run em aceitação
global.
