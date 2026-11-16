# <NNN> — <Incident title: failure symptom in one line>

- **Status:** <Resolution and verification state, e.g. Fix published; verified on <env>; <pending work> outstanding>
- **Incident date:** <YYYY-MM-DD>
- **Resolution date:** <YYYY-MM-DD, or Pending>
- **Last updated:** <YYYY-MM-DD>
- **Severity:** <Project scale value, or Not classified>
- **Scope:** <Systems, content, or situations affected>
- **Audience:** <Who this record is for>
- **Introducing change:** <Commit or PR that introduced the fault, or Unknown>
- **Fixing change:** <Commit or PR of the fix, or Pending>

## Summary

<User-visible impact, the mechanistic cause in one line, and the current state.>

## Impact observed

<Quantified effects where measured; label estimates as estimates; state what was
not measured. Verify data loss explicitly. Distinguish observed effects from
assumptions.>

## Cause

<The mechanism, grounded in code, data, or commits. Separate established facts
from assumptions. Do not attribute the incident to a person.>

## Timeline

<Timestamped, evidence-only entries, each traceable to a commit, log, or message.
Note that commit times are not the moment someone noticed the problem.>

| Time | Event | Relevance |
| --- | --- | --- |
| <YYYY-MM-DD HH:MM> | <What happened> | <Why it matters, or the limit of what it shows> |

## Investigation and reach

<How the cause was found and reproduced, and the reach and limits of any static
or dynamic review. State what was not exercised.>

## Fix applied

<The concrete change and its boundary, and what was intentionally not changed.>

## Validation evidence

<Environment, exact commands, and results with their limits. Preserve failing
infrastructure results instead of hiding them. Reference the evidence files
(manifest, logs, screenshots) rather than pasting everything.>

## Learnings and prevention

<Recommended measures with explicit implementation status: implemented, or
recommended and not yet done. Do not assign owners, deadlines, or tracker items.>

## Limits of closure

<What the fix does not certify: other environments, save compatibility, a full
playthrough, aggregate human acceptance. Keep unknown status explicit.>

## Relationships

<Write None if there are no related records. Otherwise link resulting GDDR/ADR
records if the decision was later promoted, plus related specs, tasks, bugs, and
docs. Promotion is optional and out of scope for this record.>

| Related record | Relationship |
| --- | --- |
| <Relative link> | <Promoted to / Complements / Fixes / Follows from> |

## History

| Date | Change | Source |
| --- | --- | --- |
| <YYYY-MM-DD> | <Original record, or a dated addendum: new verification, status change, or factual correction> | <Link or dated attribution> |

<!-- Replace placeholders with supported content or explicit unknowns. Recorded
facts are immutable: capture later changes as dated addenda in History, never as
rewrites. Remove authoring comments and the example rows from the finished record. -->
