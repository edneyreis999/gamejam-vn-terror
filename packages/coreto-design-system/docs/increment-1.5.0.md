# DesignSystem 1.5.0 — compact image choices and typography

## Authority and scope

Confirmed by the user on 2026-10-29. This incremental specification replaces the approach CTA, image-focus and typography rules of 1.4.0. All earlier campaign, selection, novelty and save contracts remain in force. The consuming game's GDD §19.2 and ADR-G007 were consulted; the latest explicit instruction restricts this implementation to the DesignSystem. The consumer's native data, adapters, registry, languages, assets and other plugins are preserved byte for byte. Only its generated DesignSystem bundle is replaced.

## Confirmed experience

- An approach panel occupies the lower portion of the scene, containing the heading, existing reread action, image choices and a shared Outfit description. Its height reserves the largest localized approach text. Native choices supply all text, availability and actions. No textual approach CTA is drawn.
- Approach images and hero images in roster/sacrifice contexts grow to 110% on focus. The change is discrete, without a tween, including reduced-motion mode. It changes rendered vertices only: authored coordinates, click targets, labels and saves are unaffected. Conversation balloons retain their separate 105%/150ms treatment and color-only reduced-motion response.
- Menus, headings, buttons, labels and dialogue speakers use Averia Libre. Body reading uses Outfit. Legacy bundled face aliases migrate in memory; custom font-family names are preserved. NEW!/its localized equivalent is uppercase, with a raised yellow dot. The novelty condition remains consumer-owned.
- Horizontal control groups have one-pixel vertical separators in #360A0B at 30% opacity. Floating hero labels remain outside those groups. Options have one shared parchment, vertical category/language separators and horizontal section separators.
- Normal, focused, selected, disabled and hidden states retain their existing eligibility and visibility. Focus never consumes novelty. Sacrifice names remain readable without a quill; image scale identifies focus. Destination CTAs and ordinary decision labels retain their approved quills.

## Implementation contract

The existing semantic picture adapter supplies roles and context. Presentation-only sprite placement is applied before hit testing and restored automatically outside approach context. No Game_Picture position or campaign field is modified. Transparent roster hit proxies can be associated with a unique artwork whose opaque bounds overlap by more than 80% intersection-over-union; ambiguous matches are left unchanged. Consumers can instead supply `pictureAction` or `interactionPictureId` explicitly. No filenames, hero IDs, localized strings or map IDs select behavior.

The font-weight defect came from the text-outline pass: Canvas ignores `lineWidth = 0`, so a zero-width outline still stroked the glyph. The DesignSystem skips that pass when outlineWidth is zero; engine/provider sources remain frozen.

## Verification contract

Reuse native behavioral checks for formation/conversation input, approach opening/reread, irreversible sacrifice and console consumption. Reuse package installation, restoration, unknown-field and provider-handler contracts. No appearance tests are added. Inspect real Chrome captures in PT/EN at 1280×720 and 1600×900, including mouse, keyboard and reduced motion. Inspect long descriptions, the novelty marker, options categories/values and speaker names. Compare consumer file hashes against the entry snapshot. Run syntax and deslop review, rebuild from source and package independently.

Effective slow-test ceilings: 10 workers and 10 browsers from the consumer's loki.config.json; actual execution is sequential with one browser, respecting shared fixture ownership. Human artistic acceptance, NW.js and gamepad qualification are not asserted.

Scene: a player reads an illustrated trap on desktop and compares actions without losing the background. Product register; visual variance 3, motion intensity 2, information density 4. Demonstrable moment: move between approach images, reread the trap, then open the unified options parchment. Suggested captures: approach with long description, hovered tavern hero, sacrifice focus, options General/Audio, and the unread conversation badge.

See verification-1.5.0.md for executed results and evidence.
