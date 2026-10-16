# Verification — dedicated credits map

2026-10-14. Implemented; focused static verification PASS. Runtime verification remains pending. This is not a release readiness verdict.

- Map046 has one unconditional autorun, the existing speed-2 roll with acceleration enabled, skip binding, cleanup, one return-to-title command and a terminal record. Its tile array matches its dimensions.
- CE40 routes the terminal phase to Map046 and exits; it does not restart the credit presentation on that map. CE61 transfers to Map046; CE63 is an empty reserved slot. All map Common Event references resolve.
- `node --check planos/tasks/dedicated-credits-map/migrate.mjs` and `git diff --check` passed. The migration parsed its serialized outputs and verified their round trip. The migration is a one-time transformation with preconditions, not a replay command for an already migrated checkout.
- `node coreto/tools/coreto/cli.mjs --project "rpg-maker/The Dryland Drowned" core validate --json` failed only on preexisting branch errors in CE2/list37 and CE38/list78. Both records were confirmed structurally identical to HEAD. No error was reported for Map046 or the modified credit records. These existing errors were not changed in this scope.
- Natural completion, mouse/keyboard skip and terminal Continue have not been exercised in a new directed campaign. Historical credits evidence does not qualify this changed routing. No browser, server or editor process was opened.

Candidate review: keep Map046 and the scoped CommonEvents/MapInfos edits because the game/editor consumes them. Keep the GDD decision, incremental spec, this evidence summary and the materialized migration for authority and transformation provenance. Existing unrelated working-tree modifications, including Map045 and new artwork, are outside this delivery. Engine, plugins and Coreto were not edited. No staging, commit or publication was performed.

Devlog capture remains pending: Map046, event `Créditos — apresentação`, with the native roll and skip button; follow it through the title in a directed campaign. Final visual judgment remains with the owner.

## Reed parchment follow-up

2026-10-14: replaced the subsequently authored CreditsPage scene command with native speed-2 rolling text. Disabled its registry entry and registered `Dryland_2_CreditsScroll`, preserving vendor/engine/Coreto sources. The specialist scopes the native scroll rectangle and Dim background to `<drylandCreditsScroll>` maps. The inspected existing 1600×900 Reed artwork is copied byte-for-byte to pictures and displayed at 80%; the scroll rectangle occupies a safe inner area of the parchment. Attribution and skip remain unchanged, with smaller type and split name lines to fit the paper.

Plugin and transformation syntax checks and `git diff --check` passed. Static inspection confirmed the tagged map, background image reference, native scroll/skip/title commands and plugin order. No layout test was added: appearance is inspected visually under AGENTS.md test question 3. Rendered alignment, text clipping, contrast and the new directed journey remain pending; source inspection does not prove those visual claims. Review with deslop retained only the narrow extension and required authored data. Keep the specialist, picture asset and transformation as maintained inputs; the original titles1 artwork remains user-owned. No running apps or processes were opened.

2026-10-14 follow-up: user requested removal of Dim. Removed the background override, keeping the native transparent scroll and parchment rectangle. Updated current GDD/spec and descriptions. Syntax and whitespace checks passed; no visual test added.

2026-10-14 edge refinement: added a smooth alpha gradient to the credits scroll client area, preserving the native clipping filter. The top and bottom fade over 40 baseline pixels; no overlay darkens the parchment. The gradient is stationary while text scrolls through it, and is removed if the window is placed outside the tagged credits map. Syntax and whitespace checks passed. Visual inspection of the rendered gradient remains pending; no appearance regression test was added under AGENTS.md question 3. No browser or server was opened.

## WebGL correction after user reproduction

2026-10-14: the user reported a fatal `getProgramParameter` TypeError. Reproduced the exact exception in installed Chrome headless with the game's delivered PixiJS and the specialist's fragment shader, outside any campaign. PixiJS's shader-link diagnostic identified mismatched precision for `inputSize` between vertex and fragment stages. Its compiler returned null after the link failed, causing the reported secondary TypeError during uniform inspection.

Corrected both shared uniforms (`inputSize`, `outputFrame`) to explicit `highp`, matching PixiJS's default vertex shader. No error suppression, engine/vendor changes or removal of the gradient. A fresh real WebGL render passed without shader warnings. Alpha samples from a transparent render target were 0 at both outer edges, 132 at 20 pixels from either edge, and 255 in the center. This proves shader compilation and the gradual alpha effect; the full campaign and parchment composition remain separate, unexecuted checks.

Local-only diagnostic artifacts: `.artifacts/credits-fade-check/` holds the failing reproduction, before/after Chrome output and the pixel-render check. Invoked installed Chrome with `--headless=new --allow-file-access-from-files --dump-dom` and isolated profiles; no campaign state or player saves were loaded or modified. Syntax and focused whitespace checks passed. The narrow two-uniform correction was reviewed under deslop. Headless runs exited and no process using the diagnostic profiles remained; existing user sessions were preserved.
