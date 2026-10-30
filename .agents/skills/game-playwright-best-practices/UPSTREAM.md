# Upstream and local adaptation

- Source: [Currents Playwright Best Practices v1.2](https://github.com/currents-dev/playwright-best-practices-skill/tree/283d5cbc5d11aac1abda058b16ad22c317d54dc0/playwright-best-practices).
- Revision: `283d5cbc5d11aac1abda058b16ad22c317d54dc0`, consulted 2026-10-16.
- License: MIT; upstream copyright and terms are preserved in [LICENSE](LICENSE).
- Selected sources: `core/test-suite-structure.md`, `core/fixtures-hooks.md`, `core/assertions-waiting.md`, `core/configuration.md`, `core/page-object-model.md`, `core/test-data.md`, `architecture/when-to-mock.md`, `advanced/clock-mocking.md`, `advanced/mobile-testing.md`, `testing-patterns/canvas-webgl.md`, `testing-patterns/visual-regression.md`, `testing-patterns/i18n.md`, `testing-patterns/accessibility.md`, `debugging/error-testing.md`, `debugging/console-errors.md`, and `debugging/flaky-tests.md`.

Loki extracts shared Playwright guidance into this engine-independent package. Local changes preserve project-owned infrastructure, explicit test units, resource ownership, actual-context traces, complete lifecycle timing, and comparisons without test retries. Canvas, controlled clocks, independent expected values, and conditional game scenarios replace unrelated web-app examples and blanket rules. Engine implementation details remain outside this package.

API references: [fixtures](https://playwright.dev/docs/test-fixtures), [tracing](https://playwright.dev/docs/api/class-tracing), [assertion polling](https://playwright.dev/docs/test-assertions#expectpoll), and [screenshots](https://playwright.dev/docs/test-snapshots). Scenario-specific API links live with their examples. Validate against the consuming project's installed version.
