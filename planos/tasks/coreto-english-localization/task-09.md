---
id: "09"
status: pending
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

- [ ] Lot A — L10 first boot/preference and Text Effects row; L11 switch
      mid-conversation, wrapped approach labels and treated passages (V-002,
      V-003).
- [ ] Lot B — L12 checkpoint → Continue in the other language (V-002).
- [ ] Lot C — L13 closings and layout classes at 1280×720 + one 1920×1080 (V-003).
- [ ] Lot D — L15 independent agent: played EN route + full corpus review (V-004).
- [ ] Revise findings; reopen affected V-001 check in 07 terms when copy changes.
- [ ] Lot E — Edney editorial review and decision (V-005).
- [ ] `rpg-maker-mz-final-verify`; update verification flags and release verdict.
- [ ] Teardown of agent-started resources confirmed.

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

