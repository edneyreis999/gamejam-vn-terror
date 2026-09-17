---
id: 01
status: completed
depends_on: []
verification_ids: [V-001]
---

# Task 01 — Deliver the playable prologue

## Outcome and authority

Implement RQ-001–006 as one native prologue slice, following [spec](spec.md), [Narrativa](prologo-rheed.narrativa.md), [Programação](prologo-rheed.programacao.md), [UI/UX](prologo-rheed.uiux.md), [Technical Art](prologo-rheed.technical-art.md) and [ADR-001](adrs/adr-001.md). Use `rpg-maker-mz-execute-task` with the applicable data/plugin/test skills during execution.

## Scope

- Game root: `rpg-maker/The Dryland Drowned/`. Edit Map002 event 1, its native reading/visual/audio sequence, the prologue plan in CampaignRules and plugin activation/settings. CE351 preload may gain the identified art reference; preserve CE067's other consumers and Map003 behavior.
- Asset prerequisite: user manually imports older Rheed's existing art. Record actual path/hash, inspect it, then bind native picture commands. Preserve existing Ivaí art. No young bust or replacement art.
- Enable installed AttachedPictures in its valid dependency order; preserve engine/vendor bytes. Remove old busts/attachments at speaker changes, especially N05, and before transfer.
- Silence is local to the opening; inherited audio stops, the prologue does not start tavern ambience, and preparation retains normal audio. No global volume change.
- Canonical suite: `rpg-maker/tests/campaign.test.mjs` and its existing imported test modules. Extend the existing entry, reading and native save cases rather than creating a parallel suite.
- Fixture/readiness owner: this task captures a baseline formation save through player actions before changes, creates new native checkpoint saves after changes, and proves read-only observations of reading/phase/pictures/audio are possible. No QA-only mutation, save hook or shipped diagnostic UI.
- Delete targets: none on the filesystem. Replace only the obsolete Map002 prologue content and its plan; do not resurrect CE001 or remove shared helpers without consumer evidence.

## Checklist

- [x] Capture baseline file hashes and old command list; inspect native checkpoint behavior. Baseline formation-save limitation is recorded in verification.md rather than fabricating a save.
- [x] Bind the imported older-Rheed file without replacement or editing.
- [x] Author exact N01–N06, nine boxes and six fresh reading IDs with final-box completion.
- [x] Integrate black background, bust transitions, text-only question, local silence and immediate final transfer.
- [x] Preserve BEGIN/checkpoints, roster, native controls and no-replay behavior; do not introduce save gates/migrations.
- [x] Update canonical fixtures/tests while preserving failure signals.
- [x] Run selected canonical coverage; preserve failed attempts and fresh targeted reruns.
- [x] Review/deslop the scoped diff; record V-001 PASS and supporting runtime evidence. Remaining directed variants and human sensors stay with QA.

## Validation

V-001 primary owner: static/diff plus canonical harness. Command entry: `node --test rpg-maker/tests/campaign.test.mjs`; select existing IDs after inspecting their setup (some cases launch a browser/server). Do not report the suite passed if blocked or only a subset ran. [Verification](verification.md) S01–S05 define later directed expectations; this task prepares their inputs, not their final acceptance.

Evidence root: `docs/qa/evidence/prologo-rheed/task-01/` (create on execution). Store commands/results, hashes and fixture provenance. Changes to Map002, CampaignRules, plugin activation, assets or shared presentation invalidate affected evidence. Earlier startup evidence may inform setup but cannot prove the revised script.

## Execution notes

Implementation started after the user supplied `Reed final.png`. The one-time `implement.mjs` transformation checks the old prologue before changing Map002, the semantic plan and AttachedPictures activation. Native text remains the authoring source afterward. AttachedPictures' default automatic IDs were cleared so activation does not silently attach existing scenes' busts; Map002 explicitly attaches/removes picture 60.

Test rationale: INVARIANT = native passage completion occurs once after its final box; OWNING_LAYER = native content/reading integration; EXISTING_SUITE = content.mjs IT-004 plus native-boot IT-001. SUT_IS_CORRECT_BECAUSE the user-approved script intentionally replaces three old passages with six semantic passages/nine text boxes. Historical recipe prefixes and UI navigation markers therefore require an explicit update; assertions are retained for roster, death, sequence and rejected actions. The first two narrator boxes must not complete N01. The same reasoning updates IT-025's single-box assumption and IT-029's old intro ambience expectation.

Windows prerequisite correction: the existing harness used a macOS-oriented `python3` alias, unavailable here. Its server launcher now selects the installed `python` on Windows (without changing game runtime); Chrome is selected through the already-supported DRYLAND_CHROME variable. An elevated UT retry still found a Windows symlink privilege failure in UT-073, which is not a product pass. Detailed execution results and remaining sensors belong to verification.md.
