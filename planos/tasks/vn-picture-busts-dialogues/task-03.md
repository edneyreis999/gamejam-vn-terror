---
id: "03"
status: completed
depends_on: ["02"]
verification_ids: []
---

# Task 03 — Stage the Council ensemble and reflected intervention

## Outcome

The Council retains its eligible heroes in stable left positions, introduces Ivaí on the right, temporarily replaces the heroes with reflected Andirá on the left, and restores the same heroes for their opinions without changing campaign facts.

## Authority

- [Spec](spec.md): RQ-002, RQ-003, RQ-005, RQ-008; [verification](verification.md): D-04, contributions to V-004/V-007.
- [Programação](vn-picture-busts-dialogues.programacao.md), [UI/UX](vn-picture-busts-dialogues.uiux.md), [Technical Art](vn-picture-busts-dialogues.technical-art.md), [ADR-002](adrs/adr-002.md) and [ADR-003](adrs/adr-003.md).
- Canonical GDD §§15/19 and MZ closing additions; [shared execution contract](tasks.md).

## Scope

- Implementation: EventBridge Observe/Present/closing cleanup and derived projections; CommonEvents CE 40/41/44/53/54 plus appended pure helpers; inspect Map023 routing without changing it.
- Data: Council challenge/solo/confession/Andirá and eight opinion sections; System variable names 144–146 after the allocation check; updated native manifest. Extend the guarded migration from 02.
- Assets: existing hero/Ivaí/Andirá art and Council background; original orientation, reflection confinement, stable slots and fixed draw order.
- Tests: `rpg-maker/tests/suites/endings.mjs`, `content.mjs` and existing closing helpers; test manifest only for distinct additional invariants. Extend legal Council variant recipes in `rpg-maker/qa/native-journeys.test.mjs` when required.
- Fixture/readiness owner: 0/1/2/3 eligible heroes; each hero in supported occupied slots; recorded legal route/choice recipes for later directed QA. Direct state setup is integration evidence only.
- Delete targets: no files or story content. Change only relevant dialogue cleanup ranges/ownership.

## Checklist

- [x] Capture existing Council order, eligible-roster authority and the native cleanup that would erase participants between passages.
- [x] Derive the three left-slot projections from the ordered eligible climax roster, zero for empty. Recompute before every relevant branch/reconstruction; never let native variable snapshots become campaign inputs.
- [x] At the narrated challenge introduce all eligible heroes neutrally. Preserve narration/solo behavior with no invented hero. Introduce Ivaí only when he speaks, on the right.
- [x] Hide hero busts for Andirá, show him at the accepted left-side reflection, retain Ivaí, then remove Andirá and restore the same hero slots before opinions. Never display all five together or mutate eligibility/party/death.
- [x] Author stable absolute focus/listening targets for every eligible opinion; constrain or omit reflection displacement. Exit collectively before final choices using the delegated UI/UX baseline.
- [x] Keep passage completion exactly once and retain the owner across CE 40/44 Observe refreshes; unrelated backgrounds, overlays and native routing remain intact.
- [x] Replace IT-054's obsolete single-current-bust expectation with independent assertions from the accepted Council sequence. Verify stages/projections in native integration for 0/1/2/3 heroes; capture maximal 3x1, intervention and restored slots. Produce legal recipe inputs for every hero's opinion and both final choices.
- [x] Revise native data, run focused checks and record implementation evidence. Leave global V-004/V-007 verdicts to 09 and continue without human approval.

## Validation

Execution mode: native Chrome integration, with a directed legal Council smoke only where useful for readiness; D-04 supplies the independent expected sequence. Initial filter: `node --test --test-name-pattern='IT-(054|058)|UT-0(27|28|33|34|35)' rpg-maker/tests/campaign.test.mjs`; add new Council-specific IDs rather than relying on this filter alone. Run content validation after revision.

| Check | Sensor | Expected observable | Proposed evidence |
| --- | --- | --- | --- |
| Council sequence | Native stage/slot assertions plus temporal captures | Eligible heroes at demand, reflected intervention, stable return; no extra passage completion or campaign mutation | task-03/<run-id>/council-stages/ |
| Directed readiness | Recorded legal actions, seeds and actual roster | Later QA can reach each required roster/outcome without installing a campaign | task-03/<run-id>/council-recipes.json |

Invalidated by eligibility projections, native commands, observer cleanup, framing or Council domain reading. The task completes when these implementation checks pass; full variant and visual acceptance remain owned by 09. No change to CampaignRules is authorized merely to simplify QA setup.

## Execution Notes

In progress 2026-09-11. Native CE40 observes encounter/closing between passages; its cleanup covers 10–21 and 30–59, leaving 60–65 intact. Map023 routes through CE40 without modification. CampaignRules already freezes climaxPartyIds in H1–H8 order, excluding dead and absent heroes; variables144–146 are now recomputed derived numbers from this validated list at Observe and Council begin. System originally had exactly144 entries (0–143). No campaign rule changed.

Guarded `migrate-native.mjs council` checks the task02 native hash and appends helpers95–108. It stages the challenge, solo/confession, reflected intervention, eight opinions and collective exit in CE53. The first eligible opinion is recognized only by equality of variable144 with its literal hero number; that section restores the roster, subsequent opinions only change focus. Andirá uses slot65 at (330,500), scale31.25%, zero speaking displacement. The three hero rest centers are230px apart with per-art offsets/scales derived once into native literals. Receipt: task-03/migration-council/receipt.json. Native revision mz-20260911-busts-council-01.

IT054 now asserts all six reserved positions independently for every Council stage, derived projections, absence of legacy slot18, confinement of Andirá to the left and collective cleanup before choices. Focused execution and legal recipe research are ongoing. Global V004/V007 remain task09-owned.

The first focused run `2026-09-11T07-38-29-469Z` passed all seven cases and CLI (UT027/028/033/034/035, IT054/058). Scoped visual review inspected the maximal trio, reflected intervention and restored H2 focus at1280×720, finding visible faces/text and preserved sides. IT061 adds canonical hero-slot combinations using legally derived CampaignRules fixtures; its direct installation is integration evidence only. The existing all-success helper was factored to expose Council state without changing its ending behavior. Projections are also refreshed at each restricted native conditional, preventing stale variable values from controlling membership.

Completed 2026-09-11. Fresh IT061 in `2026-09-11T07-50-38-587Z` passed the six consecutive trios plus H7/H8 and H8, including all21 possible occupied hero/slot pairs, stage/focus/projection assertions, no domain mutation and collective cleanup. CLI passed. IT054 in `2026-09-11T07-44-51-191Z` passed zero/three-roster sequences and both outcomes with independent focus oracles; the later conditional projection refresh is exercised by the fresh IT061. All smaller-roster captures inspected retain visible faces/text and compact left placements. Read-only candidate review and deslop found no extra runtime catalog, dependencies, engine/vendor/assets or campaign changes; two unused imports in local execution scripts were removed. Initial unrelated working-tree changes remain excluded.

Legal recipe sources: `rpg-maker/tests/helpers/closing-presentation.mjs` exports councilWithHeroes and councilAfterLosses, both dispatching validated domain actions from ready state. The six consecutive trios use seed0 except H3/H4/H5(seed1). For the pair/singleton, complete initial routes with H1/H2/H3, then depart final with H6/H7/H8 at seed0. Pair H7/H8 suffix: A7-1,A5-2,B8-1,B1-2(sacrifice H6),B2-2,A8-1. Singleton H8 suffix: A7-1,A5-1(sacrifice H7),B8-2,B1-1,B2-2(sacrifice H6),A8-1. Exact producer action serialization is a supporting artifact; native installation remains labeled integration and does not claim directed navigation.

Independent `verify-preservation.mjs` compared all258 sections/282 boxes against immutable originals: unchanged catalog/metadata/text/choices,43 of63 original targets migrated plus the Council challenge,20 original targets remaining for04. Report `task-03/preservation-20260911.json`. Full current-source variant/visual acceptance stays with09. No human judgment or full delivery readiness is claimed.

Exact recipe artifact now exists: [council-recipes.json](../../../docs/qa/evidence/vn-picture-busts-dialogues/task-03/recipe-research-20260911/council-recipes.json), independently replayed action-by-action with source/state/history hashes. It contains six trios and the pair/singleton from ready throughCouncil entry; unsearched combinations are explicitly listed, without suggesting they are required variants or unreachable.
