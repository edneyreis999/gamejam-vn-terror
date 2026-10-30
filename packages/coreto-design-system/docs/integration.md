# Integrate 1.6.1

Requires Node 22+ for authoring and RPG Maker MZ/Coreto at runtime. Preserve provider load order: Core Engine, MessageCore and ExtMessageFunc precede the DesignSystem; OptionsCore/SaveCore and picture providers precede it when used. Consumer adapters follow it. No third-party package installation is needed.

1. Build from sources: `node tools/build.mjs`, then `node tools/manifest.mjs`.
2. Preview: `node cli.mjs install --project <MZ-project> --coreto-cli <Coreto-cli.mjs> --dry-run`.
3. Inspect the diff. Apply the same command without `--dry-run`. The receipt contains prior bytes and new hashes. Existing provider binaries, native events, System.json and saves are untouched.
4. Restart playtest. Reapplying the command must report zero changed files. `--reapply` also preserves customized values and unknown extensions; it is not a factory reset.
5. Restore with `node cli.mjs restore --project <MZ-project> --input <receipt.json>`. Changed-since-install files cause a conflict rather than losing concurrent work.
6. Include the bundle, registered fonts, referenced system assets and font licenses when exporting. The official release manifest records their hashes.

Existing projects opt in through installation; there is no automatic update. The `dryland` preset installs the packaged Dryland integration, including its ordered adapters, windowskin, provider settings and PT/EN UI keys. It never migrates native events. Use `--preset dryland` on both initial installation and subsequent upgrades. The standalone installer detects the installed Coreto CLI from project ancestors or accepts `--coreto-cli`; it does not bundle or modify the other Coreto plugins.

## API

The 1.3.0 API and configuration remain available. `Enabled=false` installs no hooks/API. `Windows=false` retains drawing and opt-in picture components while leaving window hooks alone. Legacy configuration values remain round-trippable, even where the ink direction no longer uses rounded borders or colored button fills.

Primitives: `drawParchment(bitmap,x,y,width,height,frame=true)`, `drawBrush(bitmap,left,top,right,bottom)`, `drawQuill(bitmap,x,y,color?,size?)`, `drawSeal(bitmap,x,y,color?)`.

Version 1.5.0 adds `drawDivider(bitmap,x1,y1,x2,y2)` using the semantic separator token. It also updates the bundled typography aliases to Averia Libre for interface roles in memory, preserving custom family names and serialized parameters. Reading remains Outfit. See [the incremental contract](increment-1.5.0.md).

Controls: `drawControl(window,rect,state,draw)`, `drawLabel(window,text,rect,state,role='Action',align='left')`, `drawIconControl(bitmap,name,rect,state)`. State accepts `feedback: choice|secondary|icon|none`, `focused`, `enabled`, `checked`, and `support` (ivory brush). The low-level icon painter keeps its existing signature. The consumer owns action handlers and hit areas.

Composition: `layoutPanel(rects,padding=12)`, `layoutTitleOptions(rect,titleHeight,gap=24,padding=12)`, `layoutFooter(rect)`, `measureSharedDescription(bitmap,texts,width,role)`, `drawChoiceCard(bitmap,rect,{title,description,cta,image?,state?})`. A card's title/description stay informational; its supplied CTA alone receives feedback. The helpers never decide progress or eligibility.

Provider callbacks delegate through `drawOption.apply(this,arguments)`, `drawSaveFile.apply(this,arguments)`, `drawSaveContents.apply(this,arguments)` and `drawItemBackground.call(this,index)`. Supported option symbols are textLocale, textEffects and the four volume channels. Unknown options and every handler survive. Recognized original drawing callbacks are retained as disabled-theme fallback; conflicting custom drawing is reported before installation.

## Adapters

`registerAdapter(object)` accepts the existing 1.3 hooks and these additive callbacks:

| Callback | Returns |
| --- | --- |
| `choiceFeedback(window,index,name)` | Semantic role; default `choice`. Consumer classifies its own auxiliary choices. |
| `choiceBadge(window,index)` | Informative text excluded from feedback, if any. |
| `interfaceHidden()` | Additional consumer hidden-state flag; native message visibility is also observed. |
| `consumeInput()` | Optional integration hook after native input consumption; no domain mutation. |
| `picturePresentation(gamePicture,sprite?)` | Null, or `{surface,width?,height?,kind,feedback,support?,group?,neutral?,image?,interactionPictureId?,slot?}`. |
| `pictureText(gamePicture,zone,rawText)` | Display-only text; defaults to the original value. Never change the native choice or picture text. |
| `pictureContext(scene)` | `roster`, `sacrifice`, `approaches`, or ordinary grouping. |
| `pictureIndicator(sprite)` | The existing balloon sprite, whose visibility/novelty stays consumer-owned. |
| `pictureAction(sprite)` | Existing native choice index shared by associated targets, or null for ancestor binding. |
| `pictureState(sprite,role)` | Optional `{enabled,focused,checked}`; legacy `{disabled,selected}` also supported. |

`kind` distinguishes `heading`, `panel`, `button`, `approach`, or other cards. `group:'none'` permanently excludes a label from shared parchment, including transitions with no choice context. Other nonempty group values opt a picture into composition. `surface:true` replaces only opted-in UI bitmap content; `image` draws a consumer-supplied illustration. `neutral:true` prevents provider tone/scale feedback on that mapped surface; unregistered art remains provider-owned. PictureChoices owns activation and navigation, AttachedPictures may associate child targets, and MessageCore owns picture text.

Callbacks must be observational and may be called during asset loading. A control cannot be hit until its corresponding sprite asset is ready. New callbacks persist across scenes but never serialize into saves. No filename, translated text, map or hero identity is built into these generic callbacks.

In 1.5.0, `approaches` rearranges opted-in headings, auxiliary buttons and approach images in one lower panel, reserving the largest description. Only sprite placement changes; native picture coordinates remain intact. `roster` and `sacrifice` activate drawing-only 10% image focus. Use `pictureAction` or `interactionPictureId` for explicit associations. For legacy rosters with transparent hit proxies, a unique opaque-artwork bounds match (intersection-over-union above 80%) associates the existing action without reading filenames. Full-frame backgrounds and ambiguous matches are excluded. Native eligibility, clipping and action handlers remain provider-owned.

For the independent reference, copy `examples/Reference_6_Showcase.js` into a disposable MZ project and enable it after DesignSystem. It replaces the title for demonstration only. Arrow keys and Enter exercise native focus and selection without any campaign plugin or save writes.

## Reversibility checklist

- Retain the release archive and SHA-256 outside the game repository.
- Preserve consumer events/adapters separately from package sources.
- Restore only the intended game presentation in a disposable copy.
- Reapply the official package and minimal adapter; compare package hashes.
- Confirm repeated installation changes zero files and no Dryland identifier exists in runtime sources.
- Compare the main consumer updated only by the Dryland profile against the 1.5.0 reference. The same visual composition is required; restoring native event coordinates must not restore the old layout.

## Complete Dryland integration (1.6.0)

See [the 1.6.0 contract](increment-1.6.0.md) for the `pictureText` adapter, semantic composition slots, conflict policy and package-only visual acceptance. In 1.6.1 the generic preset also migrates the recognized legacy console settings. The Dryland profile replaces only recognized legacy renderers and settings; it reports conflicting customizations before any project write.

## Portable package (1.6.1)

Use `install --preset coreto-default` for an independent consumer. Shared console recipes and asset/callback conflict detection apply to both presets. See [the 1.6.1 contract](increment-1.6.1.md). No Dryland file is read or installed by the generic profile.

Example adapter, supplied by the consumer (the selectors and action indices are its own):

```js
CoretoDesignSystem.registerAdapter({
  picturePresentation(picture) {
    if (picture === existingMenuPicture()) {
      return {surface: true, kind: "button", feedback: "secondary", slot: "footer-start"};
    }
    return null;
  },
  pictureText(picture, zone, rawText) {
    return picture === existingMenuPicture() && zone === "center" ? localizedMenuLabel() : rawText;
  },
  pictureAction(sprite) { return existingChoiceIndexFor(sprite); }
});
```

These functions observe existing state; they do not create a choice or call its handler. The provider continues to dispatch the associated action. Return `null` for pictures/actions outside the adapter. See `design/public-api.json` for the complete callable catalog.
