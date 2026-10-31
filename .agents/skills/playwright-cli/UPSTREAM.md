# Upstream and local adaptation

- Source: [Microsoft playwright-cli skill](https://github.com/microsoft/playwright-cli/tree/b85c7a736bb473bf55b584e54a09ffa698d6d871/skills/playwright-cli).
- Revision: `b85c7a736bb473bf55b584e54a09ffa698d6d871`, consulted 2026-10-16.
- Upstream package at this revision: `@playwright/cli` 0.1.22, depending on Playwright `1.64.0-alpha-1790635538000`. These identify the reviewed documentation, not required dependency versions for game projects.
- Copyright Microsoft Corporation; licensed under Apache-2.0. Full terms are preserved in [LICENSE](LICENSE).

This is a locally modified documentation package. `SKILL.md` narrows the trigger to browser operation, routes test design and persona QA to their Loki owners, distinguishes skill installation from executable availability, and replaces global cleanup and device/snapshot shortcuts with owned sessions and scenario-driven observations.

Retained operational references cover sessions, custom code, storage, request mocking, tracing, video, DOM attributes, and test debugging. Their local edits apply named-session ownership, explicit failures, evidence retention, version checks, and the distinction between demonstration and test evidence. The test reference retains recording-to-code as an aid; expected values come from the agreed contract.

Example corrections also cover awaited route responses, propagating operation failures, simulated-geolocation reset, and password fields located by label. API checks use the official [BrowserContext](https://playwright.dev/docs/api/class-browsercontext), [routing](https://playwright.dev/docs/api/class-route), and [locator](https://playwright.dev/docs/locators) documentation.

Omitted upstream files: `references/test-generation.md` (its mandatory specs/seeds and plan/generate/heal ownership conflict with Loki) and `references/pr-attachments.md` (external publication is outside this skill's task). No implicit spec amendment, skip/fixme policy, global tool installation, or publication flow is adopted.
