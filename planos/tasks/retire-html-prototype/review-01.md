---
round: 01
reviewed_fingerprint: eda639fae1f4a328e2e0bed2cecc9b62fd742e90f576758ea28e278aac1d392b
verdict: FIX_BEFORE_SHIP
status: incorporated-user-approved
---

# Spec Peer Review — Round 01

Reviewed the approved spec set and its frozen local references. The 25 manifest file hashes were checked and no drift was found. Additional read-only corroboration used the existing content/persistence suites and the OpenDesign preparation script. No implementation, tests, browser playtest, asset changes, network access or commits were performed. The parent validated the independent finding against the native hash/revision implementation and the existing content test. F-001 is retained; no duplicate or unsupported finding was retained. The approved spec set remains unchanged. Input hashes are recorded in review-01-inputs.json; additional corroboration hashes are recorded in review-01-corroboration.json.

## Coverage

| Lens | Sources reviewed | Verdict |
| --- | --- | --- |
| Player behavior and scope | spec.md RQ-001, RQ-006; Programação co-shipping constraints | Clear scope: complete retired-tree deletion, preserved game behavior, no renamed fallback. Verification gap is F-001. |
| Authority and disciplines | AGENTS.md; canonical GDD §1.1; standing directives; playbook; glossary; ADR-001; historical ADR-002 | Clear: user direction explicitly supersedes reference retention; historical editorial exception preserves outcomes and creative states. Only engineering ownership changes. |
| Historical documents and raw evidence | spec.md RQ-002/RQ-003; verification.md V-002 and search caveats; docs/qa/README.md | Clear: ignored documentation is explicitly included; raw telemetry exclusion matches the QA storage contract, not a blanket historical-document exemption. Final sanitation includes the maintenance spec itself. |
| MZ data, plugins and lifecycle | spec.md RQ-006; CommonEvents.json event 39; Dryland_EventBridge.js parser; native-layout.mjs; revise-layout.mjs | F-001: unchanged authored content lacks a direct comparison sensor. Otherwise metadata-only scope correctly preserves IDs, order, declarations, interpreter ownership and plugin APIs. |
| Saves and failure recovery | ADR-037; spec.md RQ-006; verification.md V-005/S-002/S-003; EventBridge envelope validation; persistence.mjs IT-059 | Clear: a fresh revision is mandatory, incompatible saves remain intact, compatible Continuar remains supported, and the old save is captured before edits in an isolated profile. No migration promise. |
| Presentation, assets, rendering, input and audio | spec.md RQ-005; verification.md line 16; Programação line 50; asset provenance; package.json | Clear: all existing MZ assets, including unused ones, have path-and-byte protection plus a pre/post inventory; no optimization or generator permission is implied. Existing creative status remains intact. |
| Test oracle independence | native-inventory.mjs; campaign.test.mjs; spec.md RQ-004; Programação verification ownership | Clear: the actual module-load dependency is addressed, the existing suite remains authoritative, fixture review is explicit, count-only or same-input expectations are prohibited, and missing passage/order/branch negative cases are required. |
| QA feasibility and release evidence | verification.md; native-mz-cycle.md; rpg-maker/README.md; package.json | F-001 for native-content preservation evidence. Otherwise targeted directed smoke and persistence checks are feasible, canonical launch is preserved, final human document review remains explicit, and broad creative reacceptance is not falsely claimed. |
| Other state and runtime surfaces | spec.md Technical Design | Clear/not changed: battle, party, switch/variable, transfer, scene and asynchronous ownership receive no new behavior. No reason to require additional architecture or product decisions. |

## Findings

### F-001 — Verify native content preservation independently of the refreshed manifest

- Severity: medium.
- Source: `planos/tasks/retire-html-prototype/verification.md:23` (V-004), together with `planos/tasks/retire-html-prototype/spec.md:93` (the invariant that V-004 must substantiate).
- Evidence: RQ-006 requires unchanged displayed text, speakers, statuses, passage IDs, scene declarations, command order and gameplay parameters. The sensor matrix explicitly requires a pre/post comparison for assets, but no equivalent comparison for native data. V-004 requires a passing validator, unchanged asset bytes and a short entry-to-encounter walk. `rpg-maker/tools/revise-layout.mjs:16` computes a new manifest from whichever native files are present, so its refreshed hashes do not establish that edits were limited to source annotations. `rpg-maker/tests/suites/content.mjs:308`–321 explicitly demonstrates that changed displayed wording plus a refreshed manifest is accepted and shown by the game. IT-047 is also being rewritten and only promises finite current-content obligations, not equality of every protected command and field. The actual directory reference currently found in `rpg-maker/The Dryland Drowned/data/CommonEvents.json:41` is an explanatory comment at event 39, command 0; this makes an exact bounded comparison practical.
- Consequence: an accidental valid change to authored dialogue, event parameters or presentation outside the short smoke route could satisfy the stated sensors while violating the approved no-game-change boundary. Save refusal only detects version mismatch; it does not certify that the new revision preserves content.
- Contract correction: add a one-time pre/post native-data comparison to V-004 and its evidence requirements. Permit only individually identified source-annotation value edits; require all other parsed JSON values, array order and event-command fields to remain equal, and record the separate manifest revision change. Do not exclude all comments because MZ comments also carry executable scene/section metadata. This is an execution evidence requirement, not a new permanent test suite, gameplay decision or full-campaign replay.
- User decision: approved for incorporation on 2026-09-10 ("Pode"). Incorporated into spec.md RQ-006, the Programação co-shipping contract and verification.md V-004. Parent validation accepted this as an evidence gap. No game implementation or tests were performed.

## Incorporation record

The fingerprint above identifies the original reviewed input. Following explicit user authorization, F-001 was incorporated into the approved spec set on 2026-09-10. The earlier statement that inputs remained unchanged describes the review itself; the authorized incorporation changes those document hashes. This record preserves the original FIX_BEFORE_SHIP verdict rather than claiming a second independent review occurred. Implementation sensors remain pending.

## Residual Risks

- Consumer inventory must still be refreshed at implementation time; this review is not a complete cleanup scan or an implementation acceptance result.
- Ignored originals need the outside-repository preservation already required by RQ-003; raw evidence may retain historical strings without becoming current reference guidance.
- Assets have an adequate explicit preservation sensor; its execution, native save checks and final human documentation acceptance remain pending.

## Later approved verification scope

After F-001 incorporation, the user explicitly removed Chrome/browser execution from this increment and confirmed browser-free unit tests plus static comparisons on 2026-09-10 ("Atende"). The amended verification contract supersedes the browser smoke/save-scenario recommendations in this historical review. F-001 native-data preservation remains mandatory. No new independent review or runtime verification is claimed.
