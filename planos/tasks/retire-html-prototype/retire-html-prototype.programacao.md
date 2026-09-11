---
status: approved
discipline: Programação
owner: Edney
---

# Repository and tooling contract

Approved by the user on 2026-09-10 as part of the complete reviewed spec set ("Aprovo"). Implementation, machine checks and final document acceptance are complete; the user accepted V-006 on 2026-09-10 ("está aprovado"), as recorded in [verification](verification.md).

[Spec](spec.md) owns RQ-001–RQ-006; [verification](verification.md) owns acceptance. This contract defines the changed engineering surface without adding gameplay requirements.

## Sources and working paths

| Purpose | Current source |
| --- | --- |
| Design and rule status | `docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md` |
| Open in RPG Maker MZ | `rpg-maker/The Dryland Drowned/game.rmmzproject` |
| Scene and narrative authorship | `rpg-maker/The Dryland Drowned/data/` via the MZ editor |
| Campaign rules and integration | `rpg-maker/The Dryland Drowned/js/plugins/` |
| Verification | `rpg-maker/tests/`, `rpg-maker/tools/validate-content.mjs` |
| Local launch | `rpg-maker/tools/start-game.mjs`, called by the game's package script at acceptance; since 2026-09-11, called by the repository root package script (`npm start`) |
| QA and selected devlog evidence | `docs/qa/` and `docs/qa/deliveries/` |

## Consumer disposition

| Surface | Required handling |
| --- | --- |
| Root `retired HTML artifact` | Delete after all live consumers are resolved; no copied runtime under another name. |
| `AGENTS.md`, `CLAUDE.md`, memory | Use positive MZ guidance, replace obsolete runtime/testing constraints, retain design status and safety boundaries. |
| Canonical GDD | Supersede the requirement to retain an offline reference and describe MZ as current, not a future migration. Preserve gameplay and historical decision identity. |
| `rpg-maker/tests/suites/native-inventory.mjs` | Keep IT-047 in its canonical home; replace module-load execution of historical scripts with independent current-contract assertions. |
| `rpg-maker/tests/fixtures/boundary-recipes.json` | Preserve the reviewed recipes and truthful hash provenance; remove the retired source-path dependency from its description. Inspect callers before changing metadata keys. |
| Common Event source annotations | Sanitize only directory references; retain meaningful source identity, statuses and authored content. Refresh layout manifest through the existing tool. |
| `rpg-maker/asset-provenance/`, pitch and delivery docs | Resolve current assets, retain attribution and acceptance history, remove deleted-path navigation. |
| OpenDesign artboards and generators | Resolve equivalent local assets or remove obsolete examples and tools; no remaining command may recreate the retired directory. |
| Old `.compozy/tasks/` docs and scripts, `planos/`, QA reports/charters/scenarios | Inspect explicitly despite ignore rules. Sanitize documentation without false attribution of historical observations; retire obsolete executable recipes. |
| Other consumers discovered during execution | Apply the same policy and record disposition; this table is an initial inventory, not a whitelist. |

## Verification ownership

The canonical entry point is `rpg-maker/tests/campaign.test.mjs`; reuse its setup and manifest. Remove IT-047's obsolete module-load inputs without deleting its useful browser assertions. Its browser execution is excluded from this increment. Required structural inventory/parser assertions belong in the existing browser-free content unit suite, with an explicit assertion mapping. No duplicate retirement suite is required. The user approved browser-free unit tests and static checks only on 2026-09-10.

The revised oracle must detect a missing required passage, wrong required scene order and missing approach branch. Demonstrate those failures in disposable test inputs or a temporary project copy, then restore them; never mutate the team's live campaign to prove tests fail. Fixed approved text may use reviewed fixtures, with expected results independent of the actual native text under test. Preserve required hero and lover-order coverage.

Use existing pure persistence unit cases for envelope round trips and rejection of incompatible or invalid envelopes. Do not run native browser save cases, launch smoke checks, directed gameplay or Chrome for this increment. Unit results do not prove native storage, title feedback or real Continuar behavior. Preserve existing runtime tests for other scopes rather than deleting them.

## Co-shipping constraints

The user explicitly confirmed that every existing asset inside the MZ project is protected, regardless of detected usage: no deletion, move, rename, replacement, regeneration or byte change. Compare the complete pre/post asset inventory, including paths and hashes. Cleaning provenance text does not authorize touching its referenced assets.

Approved peer-review correction F-001 adds a one-time native-data preservation check. Capture the complete native data file inventory and parsed JSON before edits; compare after cleanup. Identify each permitted explanatory annotation change by file and exact JSON location, with before/after values. Require the same data files and equality of every other value and array position. No blanket removal of comments from comparison is allowed, because comments also carry scene/section metadata. Record the manifest revision separately. This is execution evidence within the existing verification workflow, not a new permanent test suite.

Documentation, dependency cleanup, complete directory deletion and fresh verification ship together. Keep all native art/audio bytes and runtime gameplay behavior unchanged. Any native-file edit must retain manifest consistency and be reported as a possible old-save compatibility boundary under ADR-037.

No new work for other disciplines is assigned. No new QA card, publication, migration generator run or asset-generation pass is required. No new browser capture or playable devlog demonstration is required for this increment. Existing delivery captures remain historical material and are not evidence that this cleanup was playtested.
