---
name: grilling
description: Conduct an adaptive interview about a plan, idea, or decision, resolving dependent questions in rounds. Use for requested grilling or when another skill delegates an interview; does not authorize implementation or create documents on its own.
---

# Grilling

Build a shared understanding of the requested subject, within the user's scope. When another skill delegates an interview, use its intended outcome, unresolved decisions, and recording responsibilities as the session boundary.

## Establish what remains open

Reuse the current conversation, accepted decisions, and applicable project instructions. Separate known facts, user choices, and uncertainties. Find facts through targeted inspection instead of asking the user to look them up. Investigate directly; delegation is optional only when available and authorized by the surrounding workflow.

Model the unresolved choices as a decision tree. A choice becomes ready when its prerequisites are settled. Do not turn a small decision into an exhaustive review of the project or invent unrelated branches to keep interviewing.

## Interview in rounds

Ask the ready, independent questions together, numbered. Give concrete choices or examples of plausible answers and, when the evidence supports one, a recommendation with a short reason. Recommendations are proposals, not accepted decisions. Use the host's question interface when suitable or ask in the conversation; no particular tool name or UI is required.

Wait for the user's answers. A question that depends on an unanswered question belongs to a later round. Independent fact-finding can continue while waiting. Recompute the open decisions after each response and avoid asking questions already answered by the conversation or project evidence.

Follow vague answers with a concrete boundary scenario. For "it depends," establish what it depends on. Surface contradictions between answers, project evidence, and existing commitments instead of silently choosing a convenient interpretation. State unavailable facts as uncertainties; ask the user only when the gap matters and cannot be resolved through inspection.

## Conclude within the authorized scope

Stop when the requested outcome can be described correctly and no material decision needed for it is silently assumed. Summarize the settled decisions and any remaining limitations. Ask for clarification only where ambiguity prevents that outcome; do not demand a second approval for clear answers already given.

A standalone interview returns the understanding in the conversation. It does not authorize implementation or create a spec, glossary, ADR, or other file. In a delegated interview, return the settled decisions to the owning skill, which records them and continues within its existing authorization. Do not add an approval checkpoint to that workflow.
