import { canonicalCase } from '../helpers/canonical-cases.mjs';
import { assertNativeContent } from '../helpers/native-content.mjs';
import { entry } from '../helpers/native-shared.mjs';

canonicalCase('IT-047', 'native authored content loads the required passages and ordered scenes including both lover orders', { timeout: 60000 }, async t => {
  const browser = await entry(t);
  const native = await browser.evaluate(`({
    events: $dataCommonEvents,
    parsed: DrylandEventBridge.parseEventCatalog($dataCommonEvents, { ...$dataSystem, drylandAssets: $dataDrylandLayout.assets })
  })`);
  assertNativeContent(native.events, native.parsed);
});
