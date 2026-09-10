# Structured JSON writes and focused diffs

## Preserve engine shape

- Keep null index slots when an RPG Maker database array uses IDs as indexes.
- Keep each object's `id` aligned with its array position unless the task
  explicitly rebuilds every reference.
- Preserve strings containing notes, formulas, or serialized plugin payloads as
  strings; parse nested content only when its owning contract requires it.
- Do not reorder arrays whose position has runtime meaning.
- Avoid whole-file normalization for a local edit.

## Mutation script contract

A materialized script should:

1. accept or declare the source and destination explicitly;
2. parse JSON before inspecting targets;
3. prove the expected object and old value exist;
4. modify only the selected fields or command list;
5. serialize valid JSON using the project's established style;
6. parse the result again and verify postconditions;
7. summarize changed object IDs or paths.

Idempotence is valuable when a second run should safely confirm the desired
state. It is not a reason to add migration readers or compatibility formats.

## Diff review

Review the structural diff, not only line count. Confirm that null slots,
neighboring objects, caller references, note escapes, command indentation, and
terminal records remain intact. Treat unexplained formatting churn as a failed
scoped edit.
