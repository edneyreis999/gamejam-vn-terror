# Execution graph

Owner: implementation agent, requested by Edney. No external task updates.

1. Assets and native selection → implemented: 16 busts, frame, ambient, 31 converted effects; focus extension and CE42/43. Validate focus independently of campaign writes.
2. Death continuity and prose (depends on 1) → implemented: CE266–289, preserved farewell, 86 localized boxes, cues/fades, one original reading boundary. Preserve native checkpoint and old save schema.
3. Verification (depends on 2) → technically verified: pruned fast suite and normal/reduced public-input journeys passed; A3 timing corrected and retested. See verification.md. Repair only confirmed in-scope defects; retain failed attempts.
4. Human review (depends on 3) → pending: audible mix, edge cleanup/art acceptance. Texts/translations already approved. Suggested playtest: alternate each candidate, confirm, watch A3, repeat with rapid advancement and mute.

Existing legacy integration tests were updated for the new passage length, raw localization keys and retained stage. Removed portrait-framing/old picture-slot assertions from IT-012: project test-value question 3 (appearance), superseded by manual captures. Its death count, sequence, eligibility and consequence assertions remain. Historical injected-state browser fixtures are not used as the public-input delivery proof.
