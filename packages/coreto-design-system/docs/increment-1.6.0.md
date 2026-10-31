# DesignSystem 1.6.0 — complete Dryland installation

Approved on 2026-10-29. The reference is the local improve/design-system consumer with 1.5.0, including its uncommitted presentation work. The acceptance target is a clean main consumer updated only through this package. This replaces the earlier reversibility criterion that explicitly allowed the old composition to survive.

## Ownership and interface

The generic library owns drawing and composition. The opt-in `dryland` profile owns consumer-specific picture roles, text projections, native action associations and installation settings. It ships the two Dryland adapters and the approved native windowskin and selected final-choice illustrations. No maps, common events, System.json, campaign rules or saves are installed or edited. Main’s newer SacrificeStage expressions, farewell preview and audio remain authoritative. The profile preserves the legacy pointer-boundary observation consumed by that plugin while removing the old renderer. Thus its new sacrifice stage is retained; older consumers still receive the parchment-card heading composition.

`registerAdapter` adds `pictureText(picture, zone, rawText)`, returning the text to draw without changing native picture text or choice labels. `picturePresentation` accepts `slot: footer-start | footer-center | footer-end | panel-heading`. Footer slots align existing controls; panel-heading positions the title 24px above the cards. Position and icon-to-label scale changes belong to sprites, preserving Game_Picture data. Existing adapters remain valid. `pictureState` additionally accepts `checked`; eligibility and activation remain with the native provider.

The Dryland adapter maps its existing footer controls and destination variables into these generic contracts. Concealed destination descriptions stay concealed. The selected destination marker is derived from the existing display state. No localized string is used to choose generic library behavior. All new player labels come from Languages.tsv.

## Installation contract

Run `node cli.mjs install --preset dryland --project <game> --coreto-cli <cli> --dry-run`, inspect the preview, then omit `--dry-run`. A single installation supplies the generated library, ordered adapters, fonts, windowskin, provider delegates, console settings and PT/EN interface labels. The installer accepts known old or current managed values; conflicting renderer, windowskin, managed font/image, console, drawing callback or translation customizations fail before project writes. Unknown options and action handlers are preserved. Source hashes tolerate line-ending-only differences in known JavaScript adapters.

The generic `coreto-default` preset remains unchanged. `dryland` is now an explicit consumer integration rather than the 1.4/1.5 compatibility alias. Reapplication is idempotent. Restore uses the exact-byte transaction receipt and rejects concurrent edits.

## Verification plan

Use a separate main checkout and preserve the local reference. Compare title, saves, options, console, tavern, camp, destinations, approaches, sacrifice and final choices at equal viewport/DPR/locale and equivalent player states. Inspect normal, focused, selected, unavailable, hidden, unread and reduced-motion states. No screenshot assertions are added.

Reuse maintained native behavior checks for formation/conversation, destinations, approach entry/reread, sacrifice, camp, save/load and console consumption. Add package contracts for clean legacy upgrade, conflicts, exact restore and native-data preservation. The destination projection test prevents disclosure of locked narrative content; it is a behavior guarantee, not a layout assertion.

Configured ceilings are 10 workers/10 browsers; actual Chrome execution is sequential because the selected helpers share resources. QA advances campaigns through player inputs; existing test fixtures remain within their established test contracts. Close owned browsers, profiles and servers after every session. Chrome desktop evidence does not qualify NW.js, gamepad or human artistic acceptance.

Devlog: show the original main tavern beside the package-only upgraded tavern, then the matching reference. Demonstrate the relocated menu opening its existing action and returning with campaign state preserved.
