---
name: rpg-maker-mz-spec-peer-review
description: Pressure-tests an approved RPG Maker MZ spec through an independent local review round. Use when an approved spec's architecture, lifecycle, save compatibility, event behavior, or quality evidence merits challenge. Don't use before approval, to implement findings, or to require an external model.
---

# RPG Maker MZ Spec Peer Review

Peer review is opt-in and local-first.

## 1. Freeze the approved input

Read `AGENTS.md`, `spec.md`, `verification.md`, every affected discipline contract, and resolved local references. Record a fingerprint of reviewed files.

Done when: the round can detect later input drift.

## 2. Run an independent review

Use a native reviewer subagent when available. Otherwise perform the same structured review inline, explicitly switching from authoring to adversarial review. Use [the review template](assets/review.template.md).

Challenge player behavior, scope, authority ownership, plugin/data/event contracts, event-page and interpreter lifecycle, save/load, scenes and battles, rendering, input, audio, assets, test fidelity, human judgment, failure recovery, and release evidence only where affected.

Done when: every applicable lens has a finding or an evidence-backed clear verdict.

## 3. Validate findings

Reject unsupported preferences and duplicates. Classify accepted findings by severity, exact source, consequence, and proposed contract correction. Save `review-NN.md` beside the spec.

Done when: findings refer to the frozen inputs and contain no implementation edits.

## 4. Ask for incorporation

Present the findings and let the user select which ones modify the approved spec. Apply only selected changes through the spec workflow, then offer another round.

Done when: the user decision is recorded and no provider, remote publication, commit, or push was required.
