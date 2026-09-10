---
id: <NN>
status: pending
depends_on: []
verification_ids: []
---

# Task <NN> — <Outcome>

## Outcome

<One independently verifiable behavior.>

## Authority

- `spec.md`: <requirement IDs>
- `verification.md`: <verification IDs>
- `<slug>.<discipline>.md`: <owned facts, when affected>
- `<durable local path>`: <owned facts>

## Scope

- Implementation: `<paths or resolved surface>`
- Tests: `<canonical suite>`
- Fixture and readiness owner: <isolated setup and observable effect, or not applicable>
- Data/assets: `<paths or no impact>`
- QA/docs: `<paths or no impact>`
- Delete targets: `<paths or none>`

## Checklist

- [ ] Capture the pre-change signal.
- [ ] Implement the behavior.
- [ ] Add or update canonical tests only when assigned by the verification contract.
- [ ] Produce assigned evidence.
- [ ] Update tracking and affected contracts.

## Validation

Execution mode/reference: <approved scenario row>
Invalidates/reuses: <dependencies, retained evidence and gaps>

| Verification ID | Command or sensor                | Expected observable | Evidence path |
| --------------- | -------------------------------- | ------------------- | ------------- |
| <V-ID>          | <project command/playtest/human> | <observable>        | <path>        |

## Execution Notes

<Decisions, touched surfaces, evidence, risks, and follow-ups; no separate memory file.>
