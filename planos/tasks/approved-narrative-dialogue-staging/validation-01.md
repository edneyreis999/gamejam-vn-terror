---
status: completed
date: 2026-09-18
scope: draft-spec-validation
verdict: needs-clarification
resolution: resolved-on-2026-09-18
---

# Draft validation — PRs #15–19 integration

The requested validation found one wording ambiguity to resolve before full-spec approval. No other material design contradiction was identified in the inspected scope. This is an authoring review, not implementation verification or an independent post-approval peer review. The findings and hashes below preserve the reviewed draft; subsequent correction and approval are recorded in the resolution at the end.

## Reviewed inputs

- Local baseline: `82aad84dd5df2376e18d53720747fae8d8c0e9ac`, branch `spec/approved-narrative-dialogue-staging`, with the uncommitted spec set, canonical GDD changes and resumption README.
- [Spec](spec.md), [verification contract](verification.md), product stories, five discipline contracts, three incremental ADRs and both source analyses.
- Canonical GDD, ADR-G001/G002/G003, current native maps/Common Events, CampaignRules, checkpoint/audio ownership and canonical test definitions.
- PR heads rechecked during this review: #15 `537b7e825d695799033223810c7429d190f30172`; #16 `ba53ad9d1d3848a2aef80d34abf1f5d391489b6c`; #17 `85fc7b03f932337d2daaa100dc830c9b6e0c307d`; #18 `2f91f94610ea27671d2bfeb9b5e4bf16abe718de`; #19 `daa4f7cf0d0d074135d12dc96bbe3f77dd749ea8`. All remained open at those pinned heads.

Reviewed document SHA-256 values: `spec.md` = `582c95962a5e7a1e2b4365e72364ba13005cd10cf73adcff136c0c9eb45fdd4c`; `verification.md` = `f8b021ee4efe6cb193efb4b87d6386c6783f9d0299a0570f47f53ac22e81e5f9`; UI/UX contract = `b3650afa855fdc10b3994b6ac80ce7236e1353f3405f9967f8dec75f75387edb`. Later edits require checking whether the finding still applies.

## Finding F-01 — distinguish tavern availability from expedition participation

**Priority: P2. Status at review: open; subsequently resolved below. Location in reviewed draft:** [UI/UX scene ownership](approved-narrative-dialogue-staging.uiux.md#scene-ownership), line 19, Hero interaction Maps037–044 row.

The row states: “Dead heroes and reserves do not gain participation through presentation.” In the row governing hero visits, this can be read as excluding living unselected heroes from their conversations and selection responses. The intended exclusion applies to absent expedition/Council participants and epilogues; living reserves must remain available in the tavern.

Evidence:

- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), lines 55–59, preserves successful selection, the selectable fourth hero's full-party response and Select/Remove labels. Lines 1200–1214 distinguish the available tavern roster, selected heroes and dead heroes.
- [ADR-G001](../../../docs/adrs/adr-g001-mapas-de-interacao-dos-herois.md#decisão) assigns conversation and selection to the visited hero's map.
- `Dryland_CampaignRules.js`, lines 611–620, permits toggling a living hero during manual formation regardless of current selection and rejects adding a fourth member without replacing the party.
- `Map037.json`, event 1/page 1, retains Conversar, Select/Remove and return choices, plus the `TOGGLE_HERO` action. [Scenario S-02](verification.md#runtime-scenarios) already requires all eight visits and full-party responses.

**Impact if implemented literally:** a living unselected hero could lose their dialogue or visible response, contradicting the preserved formation flow and making the full-party branch inaccessible.

**Recommended replacement for the final sentence:** “Living unselected heroes remain available for visits, conversation and selection under the existing formation rules. Dead heroes remain unavailable. Visiting a hero does not add them to the expedition.” Keep the separate Council and epilogue restrictions where those scenes are defined. No new product decision is needed; this clarifies the existing baseline.

## Other reviewed contracts

| Area | Result within this review |
| --- | --- |
| Approved source scope | PRs #15–19 have pinned sources and explicit native owners. Deferred solo prose, untouched trap text, undrawn present-day venue and unproduced ending art remain outside the increment. |
| PR #18 | Exactly 30 supplied success paragraphs in A1–A8/B1–B2; native labels, failures, descriptions, B3–B8 and mechanics remain preserved. |
| Temporal presentation | Older Rheed alone, colored over black; young Rheed and the expedition in the past. Earlier dimmed-background and silent-prologue proposals are explicitly superseded. |
| Reading and progression | Closure follows the existing piece grant in either initial-route order. Council moves Irati after eligible opinions. Multi-box text completes once; eligibility and total-loss precedence remain intact. |
| Native ownership and providers | PR #17 and #19 change distinct plugin entries; their composition is explicit. The inventory covers hero maps and dialogue helpers. Reduced motion is preserved despite removals in the source reference. |
| Saves | New Game/current-version checkpoints are the declared coverage. No per-box persistence, migration or legacy compatibility promise is invented. The earlier prologue checkpoint may replay unsaved reading. |
| Audio | Local cue proposal, temporal replacement, opening-only applause, volume ownership and ending precedence are specified. Listening and final mix remain pending. |
| Verification | Twelve requirements and acceptance rows map to eight sensors and eleven scenarios. Referenced canonical case IDs exist in their named owners. Fixture evidence, directed gameplay, visuals, listening and human acceptance are distinguished. |

## Checks and limits

`git diff --check` passed. All relative Markdown targets in the 15 reviewed documents exist. Requirement/acceptance counts and sensor/scenario counts match. The index is empty and no runtime path was modified. The earlier source-transcription audit remains documentation evidence only.

No automated game suite, playtest, integrated rendering or listening session was run for this validation. It cannot certify the proposed framing, mix or save behavior before implementation. At review delivery, only this report had been added; F-01 was an unapplied recommendation and full-spec approval remained pending.

## Resolution — 2026-09-18

The user replied “aprovado” after receiving this validation. The recommended replacement was applied to the UI/UX hero-visit row without changing formation, Council or epilogue rules. F-01 is closed. The complete spec set is approved; [verification.md](verification.md#validation-closure-and-spec-approval--2026-09-18) owns the current handoff status and subsequent documentation checks. The original review verdict and hashes above remain historical rather than being relabeled as a review of the later revision.
