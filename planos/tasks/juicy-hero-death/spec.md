# Sacrifice: fear and bravery

Approved implementation plan: user request of 2026-10-29, based on ../../002-juicy-morte-heroi/handoff-implementacao.md and its prose/audio companions. All supplied prose and translations were explicitly approved in the conversation. Art finishing and audible mix acceptance remain separate.

## Increment

Replace sacrifice cards/title/name plates with the eight supplied fear/bravery pairs. Native choice focus previews one localized phrase in the existing message window; no campaign action, passage consumption or save occurs on focus. Native SELECT_VICTIM and the sacrifice checkpoint remain authoritative and immediate. Keep one to three living party candidates and exclude Ivaí.

Preserve the selected bust through canonical farewell and the sixteen approved death narratives. Native events own boxes, 48-frame survivor fades before box 3, 60-frame victim fade before the last box (A3 box 9), cue entry and passage completion. Names use EventBridge heroName. Keep one reading completion per original passage. Preserve existing saves; reconstruct older missing presentation from the persisted victim and surviving party without replaying death.

Use the supplied blood frame at initial opacity 55%, 05-opressivo BGS at initial volume 50, no BGM, and the 31 supplied effects at volume 65/pitch100/pan0. Stop only sequence-owned effects when replacing a cue. Preserve player volume controls, HIDE, reduced motion and rapid advancement. Supplied masters remain unchanged.

## Verification

Fast rules/persistence coverage on a pruned fixture, native-data/event/registry checks, runtime compatibility, and a real public-input Chrome journey from New Game through sacrifice and Continue. Verify counts 3/2/1 and all heroes through grouped deaths; focus does not change campaign state, one confirmation records one death, farewell precedes context, and audio ends. Static checks cover all sixteen authored sequences and asset references. No new layout tests. Existing legacy injected-state browser suites cannot establish this journey.

Gamepad and native zoom are excluded by ADR-G003/G005. NW.js is outside this delivery per ADR-G006. Limits are 10 workers/10 browsers from loki.config.json, with fewer active jobs for this sequential campaign. No commit or publication.

Devlog: capture each focus of a trio, then video A3 confirmation through final box plus rapid advancement. Video without audio is not audible-mix evidence.
