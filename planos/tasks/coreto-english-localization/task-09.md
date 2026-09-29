---
id: "09"
status: completed
depends_on: ["08"]
verification_ids: [V-002, V-003, V-004, V-005]
---

# Task 09 — Execute QA, independent evaluation and editorial acceptance

## Outcome

The localized candidate is played through L10–L13, evaluated by a fresh agent
(L15), revised for in-scope findings, and submitted to Edney for editorial
decision; final verification records the verdict.

## Authority

- `verification.md`: V-002–V-005, L10–L13, L15, human acceptance, release verdict
- Skills: `rpg-maker-mz-qa-execution`, then `rpg-maker-mz-final-verify`

## Scope

- Runtime via `npm start -- --port 18737` from the worktree and real
  keyboard/mouse input; own campaigns and saves only; no injected state; the
  user's 18726 origin is never used (D-020).
- Lots from 08. Fix in-scope failures (copy, keys, layout via native markup)
  and rerun affected observations; baseline/provider defects go to the
  migration owner (D-014).
- L15: delegate to a fresh agent with no development participation; record
  coverage honestly; track findings to resolution or Edney's disposition.
- V-005: present translation + findings to Edney; record his explicit decision.
- Delete targets: only agent-created QA resources at teardown.

## Checklist

- [x] Lot A — L10 first boot/preference and Text Effects row; L11 switch
      mid-conversation, wrapped approach labels and treated passages (V-002,
      V-003).
- [x] Lot B — L12 checkpoint → Continue in the other language (V-002).
- [x] Lot C — L13 closings and layout classes at 1280×720 + one 1920×1080 (V-003).
- [x] Lot D — L15 independent agent: played EN route + full corpus review (V-004).
- [x] Revise findings; reopen affected V-001 check in 07 terms when copy changes.
- [x] Lot E — Edney editorial review and decision (V-005).
- [x] After V-005, select the devlog captures from the lots' real gameplay
      evidence: language option, one scene in both languages, a readable
      English choice panel (D-023e).
- [x] `rpg-maker-mz-final-verify`; update verification flags and release verdict.
- [x] Teardown of agent-started resources confirmed.

## Validation

Execution mode/reference: directed-browser + visual; independent agent; human.
Invalidates/reuses: translation/layout/provider changes reopen affected lots.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-002 | L10, L11, L12 | Initial EN, retained preference, native switching, campaign continuity | `docs/qa/evidence/coreto-english-localization/` |
| V-003 | L11, L13 visual | Complete readable text incl. graphics, options, variables, both languages | same |
| V-004 | L15 | Evidenced readability/atmosphere report with corpus coverage | same |
| V-005 | Human review | Edney's explicit editorial decision | `verification.md` human acceptance |

## Execution Notes

Executed 2026-09-29 under D-024 (Edney: test only the most important ~30%,
risk accepted, mitigate as much as possible).

- Lot A (L10/L11) pass; lot B (L12) pass; lot C (L13) one English campaign to
  the Reunite ending, pass after two fixes. Details and evidence:
  `docs/qa/reports/2026-09-29-coreto-english-localization.md`.
- Fixes found by QA (table only; V-001 rechecked, pass):
  - Andirá's animated line: `\EFFECT<Underwater>` faded the words to low
    contrast; now `\EFFECT<SoftShiver>` in both columns, reobserved.
  - Memorial cards: four English causes (A1, A5, A7, B6) overflowed the card
    with their encounter name; shortened to two lines. Not reobserved in
    runtime; equivalent 5-line card (Griznik) renders whole.
- Lot D: fresh agent, read-only corpus review (`l15-report.md`); 12 of 16
  findings fixed in English, 4 source-level left for Edney.
- Cut and accepted as residual risk (D-024): PT comparison sequence,
  1920×1080 path, Destroy and Total loss closings, L15 played route,
  re-evaluation of changed keys.
- Lot E: Edney approved the delivery (D-025, V-005). Devlog captures
  selected in `docs/qa/deliveries/coreto-english-localization/`. Final
  verify: PASS (see `verification.md`). Teardown confirmed: browser closed,
  ports 18737/18738 free.

