---
status: approved
slug: qa-debug-tools
created: 2026-10-31
approved_on: 2026-10-31
approval: "Aprovar" (answer to the approval question in the Claude Code spec session, 2026-10-31, with the lighter verification option chosen)
---

# QA Debug Tools

# Part I — Product

## Overview

- **Motivating Problem**: QA has no way to reach a specific point of the campaign quickly. To test the Bottled Saci trap (A1), the tester starts New Game, passes the prologue and keeps playing until the random draw happens to reveal A1. There is no fast travel, no control over the trap order and no shortcut to later stages or endings. The simplest behavior that addresses this: with a separate plugin enabled, the in-game menu offers Debug, and "Go to trap → A1" opens a new campaign directly on the Saci trap, saved and reproducible by its seed.
- Who it is for: the human QA tester, QA agents (user decision, 2026-10-31) and the owner who builds and publishes.
- Why it is valuable: it cuts the time to reach a test point from a full partial playthrough to seconds. A reported seed makes the state reproducible, and disabling one plugin restores the default game without a second build.

## Goals

- A tester reaches any A or B trap, the final route, the Council or any ending in seconds from the in-game menu.
- Every jump produces only states a player could reach, so saves made after a jump stay valid without the plugin.
- A jump is reproducible: the same request gives the same seed and the same result.
- A tester can see which approach succeeds with the current party, when they choose to.
- The published build contains Debug only if the owner explicitly confirms it.

## User Stories

- US-001: activation and default-game guarantee.
- US-002: jump to a chosen trap.
- US-003: named scenarios (final route unlocked, Council, each ending).
- US-004: winning-approach hint.
- US-005: state panel.
- US-006: build gate.
- US-007: agent navigation.
- [Full user stories](_user_stories.md)

## Core Features

- **Debug command in the existing menu**: present only while the plugin is enabled. It opens the Debug tools.
- **Go to trap**: lists A1–A8 and B1–B8. After confirmation it starts a new campaign whose seed makes the chosen trap the first encounter of its own initial route. The game plays the legal path there with an automatic party and stops at the trap's opening save point.
- **Named scenarios**: "Final route unlocked", "Council" and the three endings (Reunite, Destroy, Total loss). Each plays the legal path to that point and stops at its save point.
- **Winning-approach hint**: an on/off option that marks the approaches that succeed with the current party. It is remembered until turned off.
- **State panel**: seed, phase, route and position, party, dead heroes, completed routes and hint status.
- **Build gate**: the post-build step detects Debug enabled in an exported build and asks whether to keep it. "No" and non-interactive runs disable it in the build only.

The jumps and scenarios share one rule: they replace the current campaign after confirmation and reach their target only through the actions the player could take. The hint and the panel only read the campaign.

## Business Rules

- **Legal states only**: Debug never writes campaign state directly. Every change is a validated player action applied in order, so the campaign's validation accepts every resulting state (user decision, 2026-10-31).
- **No forced outcomes**: success still depends on the party's competencies, death still follows a failure and a sacrifice choice, and the hint never chooses for the player.
- **Seed rule**: a jump or scenario chooses the campaign's starting seed. The same request always gives the same seed. Trap draws after the jump follow from that seed exactly as in a normal campaign.
- **Go to trap positions**: only the first position of the trap's own initial route (A → church, B → park). Other positions and final-route traps are not offered (user decision, 2026-10-31).
- **Automatic party**: jumps form the party automatically. The tester does not choose it (user decision, 2026-10-31).
- **Replacement**: a jump or scenario replaces the current campaign after explicit confirmation and saves to the current file, as New Game does. Cancelling changes nothing (user decision, 2026-10-31).
- **Persistence**: jumps end at existing save points, so Continue resumes there. The hint setting persists across reloads until turned off and is not part of the campaign save (user decision, 2026-10-31).
- **Default state**: the plugin is disabled in the source project as delivered; the tester enables it in the Plugin Manager when needed (user decision, 2026-10-31).
- **Build**: the published build has Debug only by the owner's interactive "yes" or an explicit allowance on a non-interactive run. The source project is never modified by the build step.

## User Experience

- **QA tester journey**: enable the plugin in the Plugin Manager → New Game → tavern → menu (☰) → Debug → Go to trap → A1 → confirm → the Saci trap opens with a party of three → optionally turn on the hint → play → report the seed from the panel.
- **Owner journey**: export the build → run the post-build step → if Debug is enabled, answer the question → the step continues with Debug kept or removed.
- **Language**: all Debug text is in PT and EN in `Languages.tsv`, following the project's text rule (user decision, 2026-10-31).
- Screens and controls: see `_uiux.md` (Stage 2).

## Constraints

- RPG Maker MZ in `rpg-maker/The Dryland Drowned/`, current stable desktop Chrome (SD-006). No new dependency or remote service.
- Coreto plugins and `coreto/` stay read-only. Changing Coreto plugin parameters is allowed.
- **Policy change required**: this increment introduces a QA console and a seed chooser. The spec playbook's baseline forbids "a shipped QA console or seed setter", and SD-015 authorizes no save, state or seed editing for spec test preparation. The user decided on 2026-10-31 that the tools serve human QA and QA agents. Delivery depends on an ADR that records this exception and its limits (only legal actions, disabled in the source by default, gated in the build) and amends SD-015 and the playbook baseline.
- Debug-only UI may show internal identifiers (trap IDs, route IDs, seeds) that SD-008 keeps out of normal player UI. The normal UI stays unchanged.

## Non-Goals

- **Forced success (god mode)**: rejected because the campaign rejects success without the needed competency. The winning-approach hint replaces it (user decision, 2026-10-31).
- **Killing a hero on demand** ("fail and sacrifice Hx", "with Hx dead" scenario): not selected on 2026-10-31. The user decided that the Total loss scenario is enough to reach deaths through the real flow, and no known issue is recorded. This narrows the original request by the user's decision.
- **Skip text**: left out by the user on 2026-10-31. Jumps already pass the readings up to their target; after that, the tester reads normally.
- **Choosing the trap's position or a full route order**: first position only (user decision, 2026-10-31).
- **Choosing the party for a jump**: automatic only (user decision, 2026-10-31).
- **Saving a jump to a separate slot**: a jump replaces the current campaign (user decision, 2026-10-31).
- **Any change to gameplay, the GDD or player-facing behavior with the plugin disabled.**

## Open Questions

Stage 1 confirmed by the user on 2026-10-31 ("Confirmo, seguir").

Stage 2 decisions recorded on 2026-10-31 (Part II, Key Decisions). None open. The D-2 ADR is a delivery obligation; see Delivery Obligations.

---

# Part II — Technical

## Scope Boundary

The first playable outcome is Debug in the menu with the state panel and "Go to trap → A1". It addresses the Motivating Problem directly. Within this spec follow the other 15 traps, the five scenarios, the winning-approach hint and the build gate. Out of scope: everything under Non-Goals.

## Delivery Approach

- **Menu entry**: an installed capability. `Coreto_1_MainMenuCore` accepts custom commands in its Command List with a visibility rule (the list already carries hidden custom slots `commonEvent1`/`commonEvent2`, as shown by the `js/plugins.js` entry). The entry is added as a parameter change, visible only when the Debug plugin is loaded. Changing Coreto parameters is allowed (project memory: Coreto parameters before code).
- **Menu reachability**: verified only in the tavern. Common Event 3 opens the menu (command 351) after the ☰ choice, and only Map003 calls it. The user states that a Coreto plugin opens Settings in conversations and decided that the current access is enough (2026-10-31). Unverified; see Known Risks.
- **Custom code, opened by the user**: a new plugin, **Dryland_7_QADebug.js**. It sits one tier above the highest extended project plugin (`Dryland_6_IllustratedChoices`) and loads after `Coreto_1_MainMenuCore`, `Dryland_CampaignRules`, `Dryland_EventBridge`, `Dryland_2_ConversationIndicators` and `Dryland_6_IllustratedChoices`, following `coreto/docs/extensoes.md`.
  - **Owns**: the Debug screen, the seed search, the legal replay to a target, the landing, the hint mark and the state panel.
  - **State it adds**: only the remembered hint setting, kept with the game's settings and not with the campaign save. Saves never depend on it.
  - **Coordination**: it applies actions only through the EventBridge's validated path.
  - **What disappears when disabled**: the menu entry (hidden), the Debug screen and the hint marks. The campaign, saves and every other plugin are unaffected (US-001.AC-2, US-001.EC-1).
- **EventBridge seam (user decision, 2026-10-31)**: `Dryland_EventBridge.js` is project-owned. It gains two small public entries on its existing global API: (1) apply one validated action through the same path events use, including the checkpoint variable, the result variable and the save state; (2) begin a campaign with a supplied seed. Without the Debug plugin, BEGIN keeps using the current clock seed (`Dryland_EventBridge.js:546-548`).
- **Landing (verified pattern, unproven for jumps)**: the maps are phase-driven. Map007's autorun flow event reads the phase and builds the encounter from it, and outside the encounter phases it calls the router CE40 (`data/Map007.json` event 1; `data/CommonEvents.json` CE40, which transfers by phase). Pending save points are written by CE44 from variable 46, which `apply` sets (`Dryland_EventBridge.js:487-492`, `:467-479`). A jump ends the menu, applies the action sequence and hands control to the phase-driven map, whose existing checkpoint saves the landing point.
- **Seed search**: the only draw happens in `ENTER_DUNGEON` (`Dryland_CampaignRules.js:728-734`, mulberry32 from the seed), so the result of a request depends only on the seed and the actions. The search walks seeds in a fixed order with the pure rules, without UI, and returns the first one that meets the request. That makes the same request always give the same seed (US-002.AC-4).
- **Hint**: success is known before choosing (party competency against the approach, `Dryland_CampaignRules.js:744`). The mark reuses the choice-adornment space and style of the NEW label (`Dryland_2_ConversationIndicators.js`, `choiceAdornmentWidth`, `ui.social.new`) with a `debug.*` label.
- **Build gate**: an extension of `rpg-maker/tools/prune-build.mjs`, which already removes disabled plugins (`keep()`). `rpg-maker/tools/verify-build.mjs` must accept the single Debug-status difference in `js/plugins.js`. Its identity step today rejects any differing file except `package.json` (`verify-build.mjs:50-53`).

## Delivery Obligations

- **ADR-G007 first**: before any plugin or tooling change, create the general ADR `docs/adrs/adr-g007-ferramentas-de-debug-para-qa.md` with `game-create-adr`, and index it in `docs/adrs/README.md`. It records D-2: a QA-only Debug plugin, disabled in the source and gated in the build, that changes the campaign only through validated actions and may be used by human QA and QA agents, with provenance in agent evidence. In the same delivery item, amend `docs/_memory/standing_directives.md` SD-015 and the Project Baseline of `docs/_memory/spec-authoring-playbook.md` to cite ADR-G007 as the bounded exception, preserving their other rules. The implementation depends on this record.

- **Green maintained suite (user request, 2026-10-31)**: before the Debug changes land, run the maintained suite (`node rpg-maker/tools/run-tests.mjs --scope all`) and fix every failing test. Follow the AGENTS.md red-test rules: find the cause first. A defect in the game is fixed in the game. An outdated test that protects a rule or persistence is updated. A test that fails the eight test-value questions is deleted, and the commit names the question it failed. Never delete a test only because it is red. The failing set, the cause of each failure and its resolution are recorded in that task. A failure whose fix would change gameplay or a confirmed GDD rule is reported to the user instead of being fixed.

## Programming Responsibilities

- Every jump and scenario reaches its target only through validated actions. The resulting campaign passes the campaign's own validation at every step.
- The same request always produces the same seed and the same campaign path.
- "Go to trap X" reveals X as position 1 of its own initial route with an automatic party of three living heroes.
- Total loss is reached through real failures and sacrifices only.
- A jump lands where the player sees the target and that point is saved, so Continue resumes there.
- A jump never runs on top of a running scene: the previous flow does not continue on the new campaign.
- The hint never alters choice order, selection or outcome. With the hint off or the plugin disabled, the choice is identical to the default game.
- With the plugin disabled, the game boots and plays as before, and saves made with it load without it.
- The build gate never modifies the source project. Its non-interactive default is safe.
- The code stays within the Chromium 88 floor.

## Affected Game Surfaces

- **Plugins**: new `Dryland_7_QADebug.js` (disabled by default); `Dryland_EventBridge.js` (two public entries); `js/plugins.js` (new entry; `Coreto_1_MainMenuCore` Command List gains the Debug command).
- **Text**: `Languages.tsv` gains `debug.*` keys in PT and EN.
- **Tooling**: `prune-build.mjs` (gate), `verify-build.mjs` (accepted difference and report); new automated build-gate tests in `rpg-maker/tests/`.
- **Policy documents**: new general ADR-G007 (Delivery Obligations), plus the SD-015 and playbook baseline amendments.
- **Unchanged**: maps, Common Events, the campaign rules, save format and gameplay.

## Shared Pattern Changes

- **First QA-only plugin, disabled by default** (first of its family). Every other project plugin is active and part of the game. Decision: start of a pattern. Debug and QA tools are separate disabled-by-default plugins, gated by the build. This is recorded in the ADR. No uniformity work exists, since no other component needs to change (agent proposal, accepted with the scope on 2026-10-31).
- **Public action entry on the EventBridge**: today only events apply actions. The new entry is for the Debug plugin; other plugins keep using events and queries (user decision, 2026-10-31).

## Key Decisions

- **D-1 Legal states only**: rejected direct state edits and forced success, because the campaign's validation rejects them (`Dryland_CampaignRules.js:451`, `:318-323`). Source: user, 2026-10-31.
- **D-2 Policy exception for human QA and agents**: amends the playbook's "no shipped QA console or seed setter" and SD-015's "no save/state/seed editing" for this plugin. Its limits: legal actions only, disabled in the source, gated in the build, provenance in agent evidence. Rejected: human QA only. Source: user, 2026-10-31. Requires a general ADR (`game-create-adr`) before implementation closes; this is an architectural and process decision, not a GDDR, since gameplay is unchanged.
- **D-3 Seed search over forced order**: keeps the normal draw and makes reports reproducible. Limited to the first position (user decision). A joint search over two full routes is impractical (about 1.6 × 10⁹ orders).
- **D-4 Expose actions on the EventBridge**: rejected a second apply path inside Debug, because two copies would diverge on checkpoints, variables and save state. Source: user, 2026-10-31.
- **D-5 Automated tests only for the build gate**: rejected disposable-copy tests of the plugin. Accepted residual risk: regressions in jumps are caught only in use. Source: user, 2026-10-31.
- **D-6 Hint in the NEW style on the card; remembered until off; Debug text in Languages.tsv.** Source: user, 2026-10-31.
- **D-8 Lighter scenario verification**: PT-007 checks only Final route unlocked and Total loss; Council, Reunite and Destroy are left unchecked (`_tests.md` Not Verified Here). Source: user, 2026-10-31.
- **D-7 The gate lives in prune-build**: it is the first post-export step and already owns plugin removal. verify-build reports the status and accepts only that difference.

## Known Risks

- **Landing fidelity** (medium): the phase-driven maps suggest that a jump can land through the existing flow. Each stop point (reveal, formation, council, ending) still needs a prototype: the map, pictures, audio context and save. Prototype "Go to A1" first.
- **Menu reachability outside the tavern** (low/medium): only the tavern route is verified. If the Settings route in conversations does not reach the menu, Debug is reachable only in the tavern. The implementation confirms it and reports back to the user before adding any other entry.
- **Ending scenarios need a legal path** (medium): Reunite and Destroy need the medallion complete; Total loss needs eight deaths. The existing boundary recipes in `rpg-maker/tests/fixtures/boundary-recipes.json` prove such paths exist (for example `final-sixth-total-loss`). The automatic party and approach policy must reach them.
- **No automated regression for jumps** (accepted, D-5).

## Assumptions and Defaults

- Plugin name `Dryland_7_QADebug` and the text key prefix `debug.*`.
- The flag to keep Debug on a non-interactive run is `--allow-debug`. The interactive question defaults to "N".
- Seed search order: ascending from 0. The first match wins.
- Automatic party: the first three living heroes in the formation order (`docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md` §1226 order) that meet the request. For a trap jump, that means at least one approach succeeds, when such a party exists.

## File References

- `rpg-maker/The Dryland Drowned/js/plugins/Dryland_EventBridge.js:481-495` — `apply`, the single validated path; `:546-548` — the BEGIN clock seed; `:394-400` — the existing public API.
- `rpg-maker/The Dryland Drowned/js/plugins/Dryland_CampaignRules.js:661-746` — dispatch, the ENTER_DUNGEON draw, approach success; `:312-470` — the validation the jumps must satisfy.
- `rpg-maker/The Dryland Drowned/js/plugins/Dryland_2_ConversationIndicators.js` — the NEW label style to reuse.
- `rpg-maker/The Dryland Drowned/js/plugins/Dryland_6_IllustratedChoices.js` — the approach cards.
- `rpg-maker/The Dryland Drowned/data/CommonEvents.json` CE3 (menu), CE40 (router), CE44 (checkpoints); `data/Map007.json` event 1 (phase-driven trap flow).
- `rpg-maker/tests/helpers/campaign.mjs`, `rpg-maker/tests/fixtures/boundary-recipes.json` — the existing legal-replay pattern.
- `rpg-maker/tools/prune-build.mjs` (`keep()`), `rpg-maker/tools/verify-build.mjs:50-53` — the build gate and identity step.
- `coreto/docs/extensoes.md` — plugin naming and order.
- `docs/_memory/spec-authoring-playbook.md` (Project Baseline), `docs/_memory/standing_directives.md` (SD-015) — the policies D-2 amends.

## Amendments

- **2026-10-31**: added the Green maintained suite obligation: fix every currently failing maintained test before the Debug changes. Source: the user, "adicione também na spec arrumar todos os testes. acho que tem testes falhando".

- **2026-10-31**: creating ADR-G007 (with the SD-015 and playbook amendments) was moved from an open item into the spec as the first delivery obligation. Source: the user, "coloca criar a ADR na spec e em seguida pode quebrar em taks".
