# Design and ownership

## Visual language

Use warm parchment surfaces, dark brown text, purple for selection/action, gold for emphasis and red for errors. Preserve visible keyboard focus, hover, pressed and disabled states. The diamond identifies the focused choice; rounded surfaces retain native window clipping, openness and hit areas. Avoid adding decoration that competes with dialogue or portraits.

Read exact colors, dimensions and typography with `design-system api describe /` through the installed Coreto CLI. Provider settings, profiles and the asset manifest live in `../assets/preset.json`. Cinzel Decorative carries titles, Averia Libre carries headings/speakers, Outfit carries body/input/helper text and Outfit Medium carries actions/menu/labels. Body text defaults to 20px; authored text escapes may override it. The reference composition is 1280×720. Longer localized choices wrap and grow rather than clip.

## Responsibility map

| Owner | Managed presentation |
| --- | --- |
| CoreEngine parameters | General ink/window colors, native window metrics, drawing callback dispatch |
| MessageCore parameters | Font registration, message width/offsets, name-box color/offsets, choice base metrics |
| OptionsCore `DrawJS` parameters | Drawing of language/text-effects rows and four volume controls |
| SaveCore parameters | Box layout and separate file-header/content drawing callbacks |
| ExtMessageFunc parameters | Console images/font/colors/sizing and continue-cursor asset/animation settings |
| DesignSystem parameters/runtime | Surface geometry and state feedback, typography roles/body default, option rectangles, choice wrapping, embedded speaker spacing, corner continue placement, picture-role theming, shared drawing API |

Keep residual DesignSystem behavior where the provider has no equivalent public parameter. MessageCore font registration does not change a game's native message font; the `Body` role supplies that base without editing `System.json`. Choice wrapping remains in DesignSystem because the provider disables its ordinary word wrapping for choice windows. OptionsCore callbacks draw rows but do not own the scene rectangles. ExtMessageFunc owns the cursor but does not expose the same corner placement. Picture roles decorate existing game images without creating game content.

The provider callbacks are supported JavaScript parameters. Delegation here means provider-owned execution configured through the CLI, not a source-code migration into `coreto/`. Shared drawing primitives still appear in independent callbacks because those parameters execute in separate scopes. DesignSystem no longer parses configuration from callback source text or carries duplicate option/save renderers.

## Preset maintenance

`../assets/drawing.js.txt` provides the common path/box/text/icon primitives. `../assets/option.js.txt`, `../assets/save-file.js.txt` and `../assets/save-contents.js.txt` supply focused callback bodies, composed by `../scripts/recipes.mjs`. Preserve native option getters, volume changes, save eligibility, localization and authored save descriptions. The templates consume provider-supplied `this`/arguments; avoid campaign mutation in presentation callbacks.

The `assets` array in `../assets/preset.json` enumerates every bundled image/font/license, its destination and checksum. A changed asset requires updating its hash. The `fonts` array owns registrations; `settings` owns provider values; the installed DesignSystem catalog owns defaults; `profiles` owns project-specific picture mappings. Change the default contract in the engine source and regenerate its bundle; the installed engine remains frozen.

For another game's custom pictures, set `/PictureRoles` to `{Image, Role}` entries using the dedicated CLI; valid roles are secondary, primary, card and panel. Image names refer to already installed `img/pictures` assets without extension. Preserve that game's existing mappings. Add a profile only when those mappings are meant to be reusable.
