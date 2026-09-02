---
scenario: <scenario-id>
revision: <revision>
verdict: <PASS|FAIL|BLOCKED>
---

# Visual Evidence Bundle

## Reproduction

- Game build/tool version: <value>
- Plugin set/order: <value or manifest path>
- Map/scene: <value>
- Save/setup: <path and hash, or steps>
- Switches/variables/party: <values>
- Resolution/scale: <width x height, scale>
- Input and capture point: <steps and frame/wait condition>

## Files

- Reference: `<path or not applicable>`
- Implementation: `<path>`
- Side-by-side: `<path or not applicable>`
- Diff/metric: `<path/value or not applicable>`
- Runtime log/state: `<path or not applicable>`

## Inspection

| Criterion            | Observation          | Verdict     |
| -------------------- | -------------------- | ----------- |
| <contract criterion> | <direct observation> | <pass/fail> |

## Authorized Deltas

- <Delta and authority, or none>

## Human Review

- Reviewer: <name/role or pending>
- Decision: <accepted/rejected/pending/not required>
- Date/evidence: <value>
