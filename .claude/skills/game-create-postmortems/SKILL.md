---
name: game-create-postmortems
description: Create and maintain incident postmortems under docs, preserving evidence, timeline, and resolution status. Covers writing and status maintenance, not deciding when or why to write a postmortem.
---

# Writing Postmortems

Maintain engine-independent postmortems as durable, evidence-based records of resolved incidents and near misses. This skill covers writing and maintaining a postmortem, not deciding when or why to write one, and not promoting it into another record type.

## Locate the records and inputs

Read applicable project instructions, the incident and its evidence (reports, logs, commits, screenshots, test output, reproductions), and any existing postmortem for the same incident.

Use `docs/postmortems/` at the project root. Each incident is a numbered directory `NNN-<descriptive-slug>/` holding the document `NNN-<descriptive-slug>.md` and its evidence files. Use `001` for the first incident; increment the highest existing number. Recheck the directory before assigning a number. Never reuse a number or overwrite another incident's directory.

Use the facts and evidence already supplied. Ask only about missing or conflicting facts that prevent accurate documentation. Preserve uncertainty explicitly: distinguish observed facts from assumptions, state what was not measured, and do not attribute the incident to a person.

## Write the postmortem

Read [the postmortem template](references/postmortem-template.md) in full and use it. Write one incident per directory: what happened, its impact, the mechanistic cause, the timeline, the fix, and the validation evidence, each with explicit limits.

Ground every claim in checkable evidence. Timeline entries carry system timestamps traceable to a commit, log, or message, not memory; note that a commit time is not when someone noticed. Preserve failed attempts and misleading signals from the response instead of hiding them. Never weaken a test or silence a warning to make the record look clean; preserve the real result and its limits.

Record status and severity honestly. State what the fix resolved and what remains unverified, such as other environments, save migration, or a full playthrough. Use the project's severity scale if one exists; do not invent one.

Preserve evidence inside the directory: a manifest with hashes, timestamps, and verification reach, plus before/after logs and screenshots when they were captured. Link large or local-only artifacts rather than copying them. Never present a later capture as evidence from before the fix.

## Maintain status and append addenda

A postmortem's recorded facts are immutable. Correct wording and repair links in place, but never rewrite the facts or evidence. Record substantive changes — new verification, closed pending work, factual corrections — as dated entries in the record's history that preserve the original text.

Update the resolution status as verification advances, for example when a pending environment is tested or a closure limit is lifted. Move a recommended prevention measure to implemented as it happens, keeping the earlier state visible. Do not assign owners, deadlines, or tracker items; scheduling belongs to the project's task workflow, not this record.

## Record promotion and related links

A postmortem may remain a postmortem permanently. If its decision is later promoted into a GDDR or ADR, record a link to that record here; do not create the target record, which is another skill's work under a separate decision. Not every postmortem warrants promotion.

Maintain links to related specs, tasks, bugs, and design or technical documents where they exist, as references. The postmortem does not become a second task tracker or restate their acceptance state.

## Keep the collection discoverable

Maintain the collection index as `AGENTS.md`, with a synchronized `CLAUDE.md` of identical content, so agents auto-load it. Keep the index thin: one line per incident with its number/title link, resolution status, incident date, and any promotion link. The document owns the full account; the index only summarizes it.

## Check the maintained collection

Verify unique numbers, working local links, and that the index matches the documents. Confirm that recorded facts were not rewritten, that pending work and evidence limits are explicit, and that no promotion target was created by this skill.

Report the created or updated paths and any unresolved facts or documentation mismatch.
