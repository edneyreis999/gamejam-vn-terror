---
name: game-create-adr
description: Create, update, and supersede Architecture Decision Records (ADRs) under docs, preserving decision history and links. Covers record maintenance, not deciding when or why to create records.
---

# Architecture Decision Records

Maintain engine-independent ADRs for supplied architecture, technical, and operational decisions. This skill covers documentation, not decision selection or implementation.

## Locate the records and inputs

Read applicable project instructions, the supplied decision and its sources, related technical documentation, and existing records covering the same subject. Sources can include a task, specification, technical discussion, incident, or review; none is a mandatory prerequisite.

Use the project's existing ADR directory under `docs/` (commonly `docs/adr/` or `docs/adrs/`). If none exists, use `docs/adrs/` relative to the project root. Keep one canonical collection; do not create parallel task-local copies.

Determine whether the requested work is a new record, an update to an existing record, or a full or partial replacement. Reuse an existing record for the same decision and scope. Follow existing links through supersession chains before identifying the current decision. A later date alone does not supersede an earlier record.

Use the decision and authorization already supplied. Ask only about missing or conflicting decision content that prevents accurate documentation; do not add routine approval checkpoints. Preserve uncertainty explicitly instead of inventing alternatives, rationale, evidence, or acceptance.

## Create a record

Read [the ADR template](references/adr-template.md) in full and use it for each new record. Use `ADR-001` and `adr-001-<descriptive-slug>.md`; increment the highest identifier. Recheck the directory before assigning an ID. Never reuse an identifier or overwrite another record.

Write one coherent decision per record, with explicit scope. Follow the template for its content. Include implementation details only when they define the decision boundary; link supporting artifacts rather than copying entire tasks or documents.

Record the decision status and its source. `Accepted` means the decision was adopted, not that it was implemented or validated. If adoption is unresolved, use `Proposed` and state the gap.

Maintain the collection index as `AGENTS.md`, with a synchronized `CLAUDE.md` of identical content, so agents auto-load it. Keep the index thin: one line per record with its ID/title link, scope, status, decision date, and replacement links where applicable. Keep historical entries visible. The record owns the full decision; the index only summarizes it.

## Update without replacing the decision

Correct wording, repair links, and append evidence in the existing record when its decision and scope remain unchanged. Preserve the original decision date; update `Last updated` and add a dated history entry for substantive clarifications, evidence, or status changes. Do not rewrite earlier evidence as if it had been available at adoption.

An unresolved proposal may be revised in place, with substantive changes recorded in its history. Update its status to `Accepted` or `Rejected` only from the supplied decision outcome, recording that outcome's date and source. Rejected proposals remain in the index.

## Supersede a decision

For a change to an accepted decision or its scope, create a successor record with a new ID. Preserve the predecessor's decision, context, alternatives, rationale, and original adoption history.

1. Identify every affected predecessor, the exact clauses or scope replaced, and what remains in force. Distinguish complementary decisions from replacements.
2. In the successor, link each predecessor and describe the replacement boundary and reason. Use section links where they help identify affected clauses.
3. If the successor is still proposed, label these relationships as proposed replacements. Leave predecessors' effective status unchanged.
4. Once the replacement is accepted, update both sides in the same maintenance operation. Add a prominent dated supersession notice near the top of each predecessor, link the successor, and record the change in both histories.
5. For a full replacement, mark the predecessor `Superseded`. For a partial replacement, mark it `Partially superseded`, name the affected clauses, and explicitly list the provisions still active. Retain earlier supersession links; assess remaining scope against all accepted successors, not just the newest one. If no scope remains active, mark the predecessor `Superseded` and link all applicable successors.
6. Update the index to match the records. Keep stable filenames and IDs so existing references continue to resolve. Do not delete predecessors or silently restore an old decision when a successor is replaced; document an adopted reversal through a new successor.

## Keep related documentation consistent

For accepted changes, update the affected current technical documents or instructions and their record links within the authorized documentation scope. Keep proposed changes out of the current documentation.

Preserve historical task/spec acceptance and evidence. If a required documentation change is outside scope or its owner cannot be resolved, report the specific inconsistency instead of changing unrelated artifacts. Do not create documentation solely to complete a record.

## Check the maintained collection

Verify unique IDs, working local links and section targets, matching index statuses, and reciprocal accepted supersession links. Check for conflicting active provisions, lost scope in partial replacements, and cycles in supersession chains.

Report the created, updated, or reused paths and any unresolved decision content or documentation mismatch.
