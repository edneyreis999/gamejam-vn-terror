# Delivery verification — 2026-11-04

The approved route-map increment is implemented in Map047, `Dryland_6_RouteMap`, CampaignRules/EventBridge, native orchestration and 25 separate image assets. No frozen Coreto, engine or third-party plugin was changed. Human acceptance is not implied by the technical results below. New campaigns are required; personal saves were not edited or deleted.

## Technical evidence

| Boundary | Command/selection | Result and evidence |
| --- | --- | --- |
| Existing fast baseline | Maintained runner, `--scope fast`, before edits | PASS; `.artifacts/test-runs/2026-11-04T05-30-01.884Z` |
| Fast rules and persistence | `node rpg-maker/tools/run-tests.mjs --scope fast` | PASS; [run](../../../.artifacts/test-runs/2026-11-04T06-13-28.620Z/run.json), including UT-079/080 |
| Input and scene handoff | `--ids IT-086,IT-005,IT-051` | PASS; [run](../../../.artifacts/test-runs/2026-11-04T06-06-58.592Z/run.json). IT-005 includes normal/reduced motion. |
| Camp and save regression | IT-013, IT-044 | PASS in `.artifacts/test-runs/2026-11-04T06-10-13.825Z`; that run's aggregate is FAIL because other jobs became stale or failed, not an aggregate pass. |
| Reread and all A1 approach handoffs | IT-049, IT-082 | PASS in `.artifacts/test-runs/2026-11-04T06-15-56.184Z`; its aggregate is FAIL from the subsequently repaired icon lifecycle and an obsolete Council save expectation. |
| Full three-route journey; rewards; Council | `--ids IT-087,IT-052,IT-054` | PASS; [run](../../../.artifacts/test-runs/2026-11-04T06-19-28.047Z/run.json). 16 distinct traps, six camps, both rewards and Council reached through native inputs. |
| Pruned distribution | `--pruned --ids UT-079,UT-080,IT-086,IT-087` | PASS; [run](../../../.artifacts/test-runs/2026-11-04T06-26-08.232Z/run.json). The full journey includes restored route audio after every camp. All 25 assets, Map047 and the active plugin survived pruning; 762 archive entries remain below the 1,000-entry distribution limit. |
| NW.js | `--runtime nw --ids IT-086 --maxWorkers 1 --maxBrowsers 1` | PASS; [run](../../../.artifacts/test-runs/2026-11-04T06-26-27.808Z/run.json). Native NW 0.51.0 / Chromium 88.0.4324.96; [probe](../../../.artifacts/route-map-cli/nw-probe.json) reports Scene_Map and no error printer. |
| Final candidate, pruned | All 63 fast cases + IT-086 | PASS; [run](../../../.artifacts/test-runs/2026-11-04T06-31-50.903Z/run.json), 64 selected cases, zero browsers after cleanup. Includes final tooltip and pointer/keyboard handoff. |
| Runtime syntax/API floor | Installed `check-runtime-compat/run.mjs` against game | PASS: 32 enabled plugins, zero findings. |
| CLI contract | `route-map.mjs validate`; disposable reads/writes; documentation checker | PASS: 28 authored nodes; real writes/rejections in [mutations](../../../.artifacts/route-map-cli/mutations.json). [Review](cli-review.json) and [receipt](../../../.artifacts/route-map-cli/final/receipt.json). |
| Native plugin envelope | Installed `validate_plugins_js_envelope.py` | PASS: structural and native layout, 51 entries. |

Chrome uses configured ceilings of three workers/three browsers. The full fast run used three workers and zero browsers. Source three-journey runs peaked at three browsers. The final pruned run has two slow jobs; the NW check was coordinated with it at one worker/browser, for no more than three live game runtimes combined. These runs own separate ports, profiles and copies; none uses the user's port 18726. Runner records retain cleanup counts.

## Repairs and evidence limits

The new map initially retained the previous scene's picture over its parallax; its native setup now clears pictures. Cross-route testing exposed a late image-load callback acting on a destroyed icon sprite; sizing now occurs only in the live sprite update. No error was suppressed. A stationary mouse click after keyboard focus now selects the actual pointer location. Camp exit now includes the route-map phase in its native route-audio branch.

Some old integration helpers assumed immediate travel to the next trap/reward/Council. They now traverse the new surface through public inputs. Pure historical fixture recipes dispatch the legal arrival action. The explicit route tests call raw rules to observe the waiting boundary. Existing save-count assertions were updated for the additional stable-map checkpoint; no protection was deleted. Two runs that overlapped CLI-source edits were marked stale by the harness and repeated with frozen inputs.

Native-data and event-list validators retain **three and five pre-existing findings**, respectively: the disabled missing CreditsPage plugin, two numeric-array items in CE002, and CE002's choice branches. Reproduced from Git HEAD in a disposable baseline; [comparison](../../../.artifacts/route-map-cli/baseline-validators.json). The new map and changed branches add no validator findings. These validators are not reported as passing.

The native MZ editor was launched for a disposable-copy inspection, but computer control returned `timeoutReached` and `cgWindowNotFound` for both the editor and Finder. The agent-owned editor process was closed. Native editor opening and author usability remain unverified; runtime and CLI evidence do not substitute for that consumer.

The full slow suite was not run. Risk selection covers changed arrival, persistence, trap, camp, reward and Council boundaries under ADR-G006. Unchanged narrative permutations, all sacrifice recipes, gamepad, native zoom and performance benchmarking were not added. Existing tests continue to own their broader coverage.

## Human acceptance and devlog

[_playtest.md](_playtest.md) remains unexecuted by the user. Art, hover legibility, route rhythm and editor usability await their judgment. The church second-trap capture is the demonstration target; random assignments naturally differ from the concept mockup. Screenshot labels in IT-087's early runs were captured before the native transfer settled and are not map-presentation evidence. The maintained capture now waits for Map047. After the full pruned run, only tooltip placement and that capture wait changed; functional full-route evidence is reused, while the current tooltip is checked in the final IT-086 run.

Artwork used built-in image generation. The game holds three separate parallaxes and 22 transparent pictures; all 22 have real alpha. Prompts are archived beside the approved concept. No placeholder art ships.

## Final review

The deslop pass inspected the full tracked and newly added implementation. It retained the existing compact plugin conventions, removed temporary stage diagnostics and kept native data mutation scripts disposable. No test was deleted and no frozen source was changed. Source checks found no whitespace errors. The CLI documentation adapter is reusable project infrastructure; its one-descriptor scope contains the complete nested public interface and publishes the guide.

Final [church capture](../../004-map-darkest-dungeon/implemented-church-second-trap.png): completed second trap, known hover, unobscured pawn, unknown future traps and first camp available. All maintained runner invocations finished with zero live browsers. The disposable editor and CLI copies and one-shot data scripts were removed.

After test cleanup, `npm run start:nw` opened the authored game for the user's requested play session. That playable session is intentionally left open; it is separate from the closed test runtimes.
