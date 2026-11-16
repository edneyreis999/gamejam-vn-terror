---
name: no-workarounds
description: Evaluate a proposed fix that suppresses errors, diagnostics, or symptoms. Use for suspected workarounds and unavoidable external defects; not as a mandatory stage for every bug fix.
metadata:
  author: Pedro Nauck
  github: https://github.com/pedronauck
  repository: https://github.com/pedronauck/skills
---

# Fix the Source

Use this skill when a proposed repair suppresses a diagnostic or hides a failure instead of correcting it. Start from the evidence already collected; use [systematic-debugging](../systematic-debugging/SKILL.md) only when the cause remains unclear.

- Trace the observed failure to its owning code or boundary. Correct that cause and verify the original symptom in the existing owning suite or probe.
- Review casts, suppressions, swallowed errors, fixed sleeps, monkey patches, and fallback chains in context. These are investigation signals, not proof that every occurrence is wrong. Read the matching entry in [workaround catalog](references/workaround-catalog.md) when needed.
- Preserve intentional boundary validation, typed failure handling, and compatibility migrations/adapters required by project policy. A documented deprecation window is a product contract.
- Respect the request's authorization: an evaluation-only request produces findings, not edits. Follow the project's extension and ownership contracts. Keep the repair focused; reuse suitable utilities and avoid unrelated architecture cleanup.

## External Defects

When the defect is outside the team's control, isolate the necessary adapter at the boundary, explain the evidence and removal condition, and use the existing suite to protect the affected behavior. Reference an existing upstream issue where available; create external issues only when authorized. Add a canary or review date only if it can reliably detect expiry and earns its maintenance cost.

For evaluation-only work, finish with the evidence-backed assessment, the proposed repair or justified adapter, and remaining uncertainty. For an authorized repair, complete when the original failure is corrected or the bounded external limitation is explicit, and the relevant checks pass. Reuse current results; neither a whole catalog read nor a separate written gate is required for every fix. The [rationale](references/philosophical-foundations.md) is optional background.
