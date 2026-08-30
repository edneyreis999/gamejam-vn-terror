# QA Run Report — 2026-08-30 — browser prototype

- **Scope:** full release walk of the direct-file browser prototype after tasks 01–07
- **Cadence tier:** full
- **Build:** `9ac4adb` (no product fix during QA) · **Environment:** `file://`, HeadlessChrome 152.0.0.0, pt-BR, network offline, no server/mocks
- **Started:** 2026-08-30T14:20:00-03:00 · **Status:** closed

## Personas

| Persona | Base | Device / Network / Locale | Sessions |
|---|---|---|---|
| Joana, jogadora ampliada | Accessibility-Reliant User | laptop / offline / pt-BR | CH-keyboard-zoom-motion |
| Caio, estrategista recorrente | Power User | desktop / offline / pt-BR | CH-seeded-diagnostics-reproduction; CH-tests-entry-canary |
| Rui, revisor de conteúdo | Recovering User | desktop / offline + images blocked / pt-BR | CH-offline-all-images-blocked; CH-sixteen-image-devlog-review |
| Lia, primeira expedicionária | New User | laptop / offline / pt-BR | CH-complete-outcomes-canary |

## Flows in Scope

- `J-complete-campaign` — atravessar 5+5+6, consequências e os dois finais.
- `J-local-offline-launch` — iniciar e abandonar uma sessão direta sem rede.
- `J-reproduce-campaign` — repetir uma seed e comparar snapshots públicos.
- `J-run-browser-contract` — executar o canário de 231 casos pelo HTML local.

## Session Matrix & Results

| # | Charter | Journey / Scenario | Persona | Tour | Status | Issue | Fix commit |
|---|---|---|---|---|---|---|---|
| 1 | CH-keyboard-zoom-motion | J-complete-campaign / FOR, ENC, CAM, ACC | Joana | Interrupt Tour | Pass | | |
| 2 | CH-seeded-diagnostics-reproduction | J-reproduce-campaign / ACC, CAM | Caio | Garbage Tour | Pass | | |
| 3 | CH-sixteen-image-devlog-review | J-complete-campaign / ART, ENC | Rui | Feature Tour | Pass | | |
| 4 | CH-complete-outcomes-canary | J-complete-campaign / CAM, ENC | Lia | Feature Tour | Pass | | |
| 5 | CH-offline-all-images-blocked | J-local-offline-launch / LOC, ART | Rui | Network Tour | Pass | | |
| 6 | CH-tests-entry-canary | J-run-browser-contract / LOC, ACC | Caio | Feature Tour | Pass | | |

Status legend: `Pending | Pass | Fixed | Skipped | Blocked (needs human verify) | Blocked (human decision)`

## Session Debriefs

### CH-keyboard-zoom-motion — Joana

- **Ran:** 14:24 → 14:39 (box respected: yes)
- **Findings:** opening focus ring, roster modal focus/return, sacrifice cancel-first focus, eight-card/epilogue scale and reduced motion were operable. Physical 320×800 evidence used a 160×400 CSS viewport at DPR 2 in Chrome, the effective 200% reflow.
- **Bugs filed/updated:** none.
- **Scenarios settled:** FOR → pass; ENC → pass; CAM → pass; ACC → pass.
- **Paper cuts:** at extreme zoom the journey is intentionally long vertically; controls remain ordered and reachable.
- **Surprises:** native dialog lifecycle returned focus without a timing dependency.
- **Suggested next charter:** human VoiceOver announcement walk.

### CH-seeded-diagnostics-reproduction — Caio

- **Ran:** 14:40 → 14:48 (box respected: yes)
- **Findings:** two fresh sessions with seed `20260830` produced signature `3624e3f0`, 54 history entries and identical assignments: physical `A6,A2,A5,A3,A8`; supernatural `B8,B1,B4,B5,B3`; final `B7,A4,B6,B2,A7,A1`. Both returned `{ok:true,violations:[]}`.
- **Bugs filed/updated:** none.
- **Scenarios settled:** ACC → pass; CAM → pass.
- **Paper cuts:** none.
- **Surprises:** invalid and late seeds preserved the prior/active seed with exact Portuguese diagnostics.
- **Suggested next charter:** replay a future reported player sequence using its recorded seed.

### CH-sixteen-image-devlog-review — Rui

- **Ran:** 14:49 → 15:04 (box respected: yes)
- **Findings:** A1–A8/B1–B8 are 16 unique 1600×900 JPEGs; full and 675×900-centered crop sheets showed no embedded text, hero identity, privileged approach clue, imported Halloween shorthand, or living-religion framing. B2/A6 retained the prior explicit caution and passed as anonymous phenomena.
- **Bugs filed/updated:** none.
- **Scenarios settled:** ART → pass; ENC → pass.
- **Paper cuts:** generated art remains visibly provisional by product copy.
- **Surprises:** narrow crops preserve each phenomenon without making the image functional.
- **Suggested next charter:** human cultural review when final art direction exists.

### CH-complete-outcomes-canary — Lia

- **Ran:** 15:05 → 15:19 (box respected: yes)
- **Findings:** recuo/revisita preserved A1 and future nulls; 0/3, 1/3, 2/3 and 3/3 paths kept competency hidden before choice and explained it afterward; automatic retreat occurred after H1/H2/H3 died; eight deaths produced one defeat; victory/defeat both reset to a clean campaign.
- **Bugs filed/updated:** none.
- **Scenarios settled:** CAM → pass; ENC → pass.
- **Paper cuts:** none sharp or dull.
- **Surprises:** the automatic retreat checkpoint retained the full dead roster while party became empty.
- **Suggested next charter:** narrative-emotion walk after pending identities/endings are authored.

### CH-offline-all-images-blocked — Rui

- **Ran:** 15:20 → 15:27 (box respected: yes)
- **Findings:** network stayed offline; aborting `**/*.jpg` removed the image, set the solid fallback, retained title/description/three choices and still reached victory after 16 reveals with validation green.
- **Bugs filed/updated:** none.
- **Scenarios settled:** LOC → pass; ART → pass.
- **Paper cuts:** console warnings are operator evidence and never leak to the player.
- **Surprises:** no remote request or audio fallback appeared.
- **Suggested next charter:** none until the asset inventory changes.

### CH-tests-entry-canary — Caio

- **Ran:** 15:28 → 15:34 (box respected: yes)
- **Findings:** direct local runner remained inspectable and finished `231 aprovados, 0 falharam, 231 no total.` while `navigator.onLine` was false.
- **Bugs filed/updated:** none.
- **Scenarios settled:** LOC → pass; ACC → pass.
- **Paper cuts:** the first status read at 1.5 seconds was still pending; the semantic title/status later settled normally, so no stall or product defect was recorded.
- **Surprises:** none.
- **Suggested next charter:** rerun as the adjacent canary after any controller/catalog change.

## What Was Fixed

None. No reproduced finding entered the governor.

## Paper Cuts

| Persona | Where (journey/step) | Felt | Sharpness | Outcome |
|---|---|---|---|---|
| Joana | J-complete-campaign, maximum-scale lists | "É uma rolagem longa, mas nunca perdi a próxima ação." | dull | watching |

## Runtime Errors Observed

- Expected `optional_image_failed assets/encounters/a6.jpg` during the all-images-blocked tour; filed as no bug because the player fallback and state remained correct.
- Expected test-fixture optional-image/dialog diagnostics occurred inside the 231-case runner; zero test failures and zero production invariant errors.

## Human Verifications Needed

- [ ] Run a complete VoiceOver read/announcement walk on macOS hardware: confirm headings, live results and native dialogs audibly, not only by DOM/keyboard evidence.
- [ ] Give the provisional 16-image inventory a final cultural/editorial approval before treating any art direction as canon; current QA only confirms the GDD guardrails.

## Decisions for a Human

No product decision blocks the prototype. The two human checks above concern assistive-audio observation and final cultural ownership; both remain outside the implemented prototype's confirmed mechanical scope.

## Learnings

- Public invalid-state corruption is intentionally unreachable: S11 is supported by IT-091/092 and VC-601/602 evidence, while QA execution did not inject catalog/state through a backdoor.
- The browser driver cannot toggle Chrome's UI zoom preference directly. The reflow was exercised in the same Chrome target with a 160×400 CSS viewport at DPR 2, producing physical 320×800 captures equivalent to 200% effective layout; the 231-case journey also applies 2× zoom styling.
- Full campaign and fallback flows remained synchronous and required no timer, audio, network, persistence, or hidden player control.

## Experiential Lens Pass

| Journey | Usability | Accessibility | Perceived performance | Compatibility | Recovery | Production parity |
|---|---|---|---|---|---|---|
| J-complete-campaign | pass | pass, VoiceOver human leg open | pass | pass for contracted Chrome/wide/narrow/200%-effective | pass | pass for direct-file contract |
| J-local-offline-launch | pass | pass | pass | pass for contracted Chrome | pass via reload/fallback | pass, network offline |

Safari, Firefox, mobile browsers, server deployments, authentication, persistence and audio were not exercised because `_spec.md` explicitly excludes them. Generic Playwright/Make/daemon/HTTP/UDS/CLI/config/worktree-runtime legs are not applicable and were not invented.

## Devlog Capture

- **Seed/action context:** seed `23`; start; H4/H7/H8; enter A1; choose the first uncovered approach; open sacrifice; select H4; confirm; open roster.
- **Sequence:** `devlog-01-competencias.png` → `devlog-02-abordagens-sem-rotulo.png` → `devlog-03-falha-explicada.png` → `devlog-04-confirmacao-h4.png` → `devlog-05-roster-recalculado.png`.
- **Observable:** competencies are visible on heroes, approach mappings remain absent before commitment, the lethal result explains Força, confirmation starts on cancel, and H4 appears dead in the recalculated roster.

## Final Status

- **Exit gate (full automated suite):** Chrome 152, direct `file:///Users/edney/projects/coreto/gamejam-vn-terror/prototype/tests.html`, network offline — `231 aprovados, 0 falharam, 231 no total.`
- **Issues by user impact:** Blocks-Completion 0 · Data-Loss 0 · Trust-Damage 0 · Friction 0 · Cosmetic 0
- **Coverage:** 4/4 journeys and 6/6 charters walked; 6/6 scenarios pass. VoiceOver audio observation and final human cultural ownership are explicitly unverified, not silently counted.
- **Verdict:** ready — the contracted Chrome/file prototype is playable, deterministic, offline and evidence-backed; retain the two human checks before treating it as a public accessibility/cultural sign-off.
