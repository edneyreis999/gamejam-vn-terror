---
status: approved
owner: Programação — Edney
---

# Programação — Native ensemble dialogue

[Spec](spec.md) owns behavior; [verification](verification.md) owns acceptance. [ADR-003](adrs/adr-003.md) authorizes this contract's execution without additional approval checkpoints.

## Implementation ownership

1. Preserve current passage IDs, source/status metadata, text, speaker labels, choices and campaign order while materializing native VNPictureBusts commands and named helpers.
2. Extend the content parser for the exact finite command graph in the spec, including pure helper calls and equality branches over derived Council slot projections. Validate all branches and transitive calls, reject cycles, scripts and unsupported commands, and validate assets without evaluating arguments.
3. Add projection variables 144–146 as derived numeric Council roster outputs; initialize/recompute from existing validated climax eligibility. They must not become campaign inputs. Name them in System and include System in the new native revision.
4. Reserve pictures 60–65 after checking all consumers, including plugin-generated pictures. Reuse 60–62 for left, 63–64 for right, 65 for reflected Andirá. Keep existing background, map, formation, candidate, memorial and overlay ownership. Do not copy ProjectX IDs 1–4 or switches 43–46.
5. Use sequential native presentation helpers. Keep every asset, numeric transform, tone and timing editable in native events. Council helper branches handle per-art base/listening scales without an evaluated variable expression in a vendor argument. No global ScaleReset or additive accumulation.
6. Implement guarded, idempotent conversation boundaries in EventBridge and update CE 3/40/44 callers. A root Present child owns passage completion; helper children may execute effects but cannot commit COMPLETE_PASSAGE. Inspect and adjust broad cleanup in Observe:encounter, Observe:closing and showFormation.
7. Reconcile saved/continued stages from current domain reading and native stack using presentation-only native recipes. Restore ownership/projections and final visual state without replaying text, entrance animation or domain decisions. No new campaign schema or saved speaker cursor.
8. Remove automatic speakerBust/name inference, its callback token and bust-specific command101 alias after coverage is complete. Keep input, choices, domain dispatch and unrelated picture code.
9. Integrate native bitmap readiness/Retry, cancellation and collective exit. Track the owner rather than relying on a final event command or frame sleep. Scene/title/new-game disposal must invalidate pending work.
10. Update README, canonical suites, test manifest only for justified new cases, and existing QA scenarios. Assign a fresh unused manifest revision after native data edits. Do not rerun historical generators.
11. Under [ADR-005](adrs/adr-005.md), prepare genuine QA-save capture and pre-boot restore with native payload/index integrity and producer provenance. Keep this in QA/executor tooling, preserve public save rules and readonly live inspection, and invalidate incompatible archives. Task 09 captures the reusable Council copies after the final native revision stabilizes.

## Native recipe structure

For all eight heroes, tavern callers begin one conversation before the profile, present profile and speech without disposing the hero, then end once. The first Ivaí line authors his entrance. Repeated same-speaker boxes do not reset focus. Migrate all profile, speech, selection and party_full sections for H1–H8: 32 sections / 72 boxes. Selection and full-party feedback remain one-person presentations. A Gorvak example cannot substitute for the remaining recipes or introduce an approval pause.

Council begin/refresh does not erase dialogue-owned pictures. At challenge, native slot branches show all eligible heroes neutrally. Confession introduces Ivaí. Andirá's recipe hides heroes and displays his reflected left-side image while retaining Ivaí. The first opinion stage ends Andirá and restores the roster before focusing the speaker; later opinions retain all participants. The no-hero path bypasses roster recipes. UI/UX specifies the prototype final-choice boundary.

A 2x2 fixture uses the same recipe grammar with two populated slots per side. It is not a new campaign scene. All helpers are trigger None with an indexed marker; existing orchestration remains outside the restricted content graph.

## Risks to resolve through implementation evidence

- A bare native Common Event call establishes command order, not animation completion; explicitly account for nested interpreter and pending transition lifetime.
- The source plugin reset restores global 100% scale; our varied PNGs require per-art authored targets.
- The Council is a multi-passage reading plan, not one event list. Cleanup at every Present boundary would break the accepted composition.
- Native variables are saved by the engine but are derived snapshots here. Recompute them before any branch after load.
- Do not store Bitmap, Sprite, listeners or interpreter references in domain saves. Test native serialized interpreter stacks with helpers active.
- Reduced motion must preserve the same state and text while bypassing interpolation. It must not change authoring source values or campaign decisions.

## Preservation and handoff

Programação owns Edney's implementation and technical evidence. UI/UX and Technical Art now own changed presentation, replacing the earlier draft assumption that only programming was affected. João/Maria may execute directed manual reading checks. No separate narrative or audio contract is needed because neither content nor audio changes.

The data materializer must declare baseline preconditions, exact edited sections/helpers/System fields, unique allocations and postconditions. Preserve the original text/metadata sequence, null slots and native grammar; never overwrite subsequent manual edits silently.

Task decomposition and local implementation are authorized under ADR-003. The [task graph](tasks.md) now assigns native validation, all-eight tavern migration, Council, remaining families, Continue, controls, authoring/2x2 and the ordered QA pair. Every task continues into the next dependency-ready task without a user/discipline approval dependency, including QA and final verification. Fix in-scope failures and retain honest evidence; optional human refinement does not stop execution. Task creation does not claim implementation or runtime verification.
