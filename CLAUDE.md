# Authoring Posture

- Follow `AGENTS.md`; consult the canonical unsuffixed GDD before design or implementation work.
- Read `docs/_memory/spec-authoring-playbook.md`, `standing_directives.md`, and `glossary.md` before Compozy spec authoring.
- Preserve confirmed, prototype-baseline, pending, and out-of-scope requirements as distinct states.

# Architecture Principles

- Keep the playable prototype build-free, offline, and directly openable in Chrome unless an approved spec changes that boundary.
- Keep catalog content, game rules, browser rendering, and tests in their existing ownership layers.
- Treat completed Compozy specs as historical baselines; describe later behavior changes in an incremental spec.

# Autonomy Contracts

- Derive facts from the repository and ask the user only for product or trade-off decisions.
- Record significant accepted decisions in the active spec's ADR directory.
- Report only verification that was executed and identify human-only checks explicitly.

# Security Invariants

- Do not add network, storage, executable markup, remote assets, or third-party runtime code to the prototype without an approved design change.
- Keep QA inspection read-only and keep campaign mutation behind validated player actions.

# Workflow Rules

- Use `.gitmessage` for commits and `.github/pull_request_template.md` for pull requests.
- Preserve the demonstrable devlog moment and suggested capture when a change affects them.
