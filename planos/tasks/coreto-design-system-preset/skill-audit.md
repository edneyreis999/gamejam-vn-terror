# Skill audit — game-coreto-eng-design-system

2026-10-19. Audited against writing-skills. Metadata validator: exit 0.

### A1. Invocation & description

- **Pass.** **Invocation earned:** the skill is model-invoked only because the agent (or another skill) must reach it on its own; otherwise `disable-model-invocation: true` is set and the description is a one-line human-facing summary.
- **Pass.** **Leading word front-loaded:** the description opens with the skill's **leading word**, doing its invocation work.
- **Pass.** **One trigger per branch:** every trigger names a genuinely distinct **branch**; synonym triggers restating one branch are collapsed.
- **Pass.** **Triggers only:** the description carries no identity prose that already lives in the body.
### A2. Information hierarchy

- **Pass.** **Content typed:** every block is a **step** (ordered action ending on a completion criterion) or **reference** (consulted on demand). A flat reference peer-set is a valid shape for a whole skill — no step sequence fabricated to look procedural.
- **Pass.** **Completion criteria:** every step's criterion is checkable (done vs. not-done is decidable) and, where it matters, exhaustive ("every X accounted for", not "produce a list").
- **Pass.** **Disclosure by branch:** material every branch needs is inline; material only some branches reach is disclosed behind a **context pointer**.
- **Pass.** **Pointers worded for when:** every pointer names its trigger condition; must-fire pointers say "in full"; no hedged "see X for more" remains.
- **Pass.** **Co-location:** each concept's definition, rules, and caveats sit under one heading, not scattered across the file.
### A3. Pruning — run sentence by sentence, not section by section

- **Pass.** **Single source of truth:** no meaning lives in two places; inline content duplicating a reference is trimmed to a ≤3-line tripwire.
- **Pass.** **Relevance:** every line still bears on what the skill does.
- **Pass.** **No-op hunt:** the **no-op** test was run on each sentence in isolation ("does it change behaviour versus the default?"); failing sentences were deleted whole, not trimmed.
- **Pass.** **Negation:** prohibitions are rephrased as the positive target behaviour; any that remain are hard guardrails paired with what to do instead.
- **Pass.** **Leading words:** qualities restated across the text are collapsed into single pretrained words, each strong enough to pass the no-op test.
### B1. Metadata & discovery

- **Pass.** **Naming:** the `name` field is 1-64 characters, lowercase, only numbers or single hyphens, and exactly matches the parent directory name.
- **Pass.** **Description length:** under 1,024 characters.
- **Pass.** **Trigger coverage:** the description includes both positive triggers ("Use when…") and negative triggers ("Don't use for…").
- **Pass.** **Third-person tone:** the description avoids "I", "me", "my", "you", "your".
### B2. File structure & paths

- **Pass.** **Standard folders, flat:** only `scripts/`, `references/`, and `assets/`, each exactly one level deep.
- **Pass.** **No human docs:** no README.md, CHANGELOG.md, or installation guides inside the skill.
- **Pass.** **Forward slashes:** all paths in SKILL.md use `/` regardless of OS.
- **Pass.** **Explicit helper paths:** bundled helpers are referenced unambiguously from the agent's working directory (the same path the agent will type), never bare `scripts/…` that silently depends on CWD.
- **Pass.** **No orphans:** every bundled file is reachable from SKILL.md by a pointer.
### B3. Body & scripts

- **Pass.** **Lean body:** SKILL.md is under 500 lines (the spec ceiling — the doctrine's **sprawl** bar usually lands far lower).
- **Pass.** **Imperative mood:** instructions use the third-person imperative ("Extract," "Run," "Validate").
- **Pass.** **Domain-native terms:** uses the domain's own vocabulary consistently (e.g., "component" instead of "file").
- **Pass.** **CLI design:** scripts are tiny single-purpose CLIs taking arguments; descriptive `stdout` on success, `stderr` on failure, so the agent can self-correct.
- **Pass.** **Helper roles:** each referenced helper is labeled read-only, bootstrap, or mutating in SKILL.md.
- **Pass.** **Failure states:** where the skill runs scripts or has known failure states, SKILL.md says how to recover — and a skill with neither carries no error-handling boilerplate.

Evidence: SKILL.md separates application/recovery from theme maintenance; operations.md owns compatibility and command semantics; design.md owns visual language and responsibility mapping; preset.json owns all portable values and the complete asset inventory. Helpers are explicitly classified and invoked via <skill-dir>. All 26 manifest assets and four templates are reachable. The three tooling tests exercise preview, isolation, validation, stale writes, preflight, restoration and idempotency. Body: fewer than 100 lines. Every sentence was reviewed for relevance and duplication.
