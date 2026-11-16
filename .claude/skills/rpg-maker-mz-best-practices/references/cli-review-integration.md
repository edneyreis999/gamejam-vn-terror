# CLI review integration

Read when preparing/verifying an author review or implementing its project adapter. Resolve `<skill-dir>` to the installed directory containing this skill's `SKILL.md`. The helper uses Python 3's standard library and works from any directory.

## Inputs and format, version 1

The inventory is an object with `schemaVersion: 1`, `checklistVersion: "CP-01-20/v1"` and a nonempty `entries` array. Each entry has `namespace`, `id` and `descriptor`: the complete JSON object returned by the public describe operation, without its transport envelope. Keep collection commands, package identity, paths and timestamps outside `descriptor`. The adapter must collect the independently required task scope; review rows never define inventory membership.

The review has the same two version fields, nonempty `task`, `author`, `reviewedAt`, an `evidence` object and an `entries` array. Every required pair occurs exactly once. Each review entry contains:

- `namespace`, `id`, `descriptorHash` and `classification` (`operational`, `editorial` or `structural`).
- `criteria`, with exactly CP-01 through CP-20. Each has `status`: `pending`; `conformant` plus a nonempty `evidence` array of evidence IDs; or `not_applicable` plus a nonempty `reason`.
- Evidence IDs resolve to objects containing a nonempty `factual` string (source, location and what was checked), and a nonempty `public` array. Each public citation contains `namespace`, `id`, an RFC 6901 `pointer` into that inventory descriptor, and its exact JSON `value`. Empty pointer selects the whole descriptor. Include additional public entries in the scope when citing them. Help or external references can support factual review, but the checked citation must identify where the scoped descriptor publishes that contract or link.

`descriptorHash` is `sha256:` plus the lowercase SHA-256 of UTF-8 JSON serialized by the helper with sorted keys, compact separators, unescaped Unicode and finite numbers. Arrays keep their order. The whole descriptor participates, including schemas, examples, nested fields and availability. Reordering object keys or relocating transport paths leaves the hash unchanged. Changing a nested child invalidates a containing descriptor too. Use the Python helper as the serialization authority.

The [template](../assets/cli-review.template.json) illustrates a pending row; the [example](../assets/cli-review.example.json) contains separate `inventory` and `review` objects for a synthetic interface. Extract those objects into separate files to exercise the example. Neither is a project review.

## Commands and recovery

```sh
python3 "<skill-dir>/scripts/check-cli-docs.py" prepare --inventory inventory.json --task task-id --author author-name --output review.json
python3 "<skill-dir>/scripts/check-cli-docs.py" verify --inventory inventory.json --review review.json --output receipt.json
```

Preparation always starts every checkpoint pending; it never assigns approval, imports old approvals or overwrites an existing output. To revise an existing review, recollect the inventory, retain entries whose descriptor hashes still match, and rereview changed/added entries and their affected containers/delegations. Keep exceptions explicit. A missing or obsolete ID is a scope discrepancy to resolve, not a row to silently discard.

Verification reads both inputs without modifying them. Without `--output`, JSON goes to stdout; only an explicit output path writes a file. Exit 0 from `verify` means the entire required record is valid, 1 means review failures, and 2 means invalid invocation/input or IO failure. Diagnostics on stderr name the entry/checkpoint and repair; they do not print the catalog. A `prepare` exit 0 means only that a pending record was created. A passing receipt records verifier/checklist versions, task, time and every required fingerprint.

Run the bundled qualification with `python3 "<skill-dir>/scripts/test_check_cli_docs.py"`. It uses disposable files, not the game. No package installation is required.

## Project adapter ownership

At the first consuming authoring task, provide one maintained project command that:

1. Takes the installed CLI, game project, independently defined task scope and review record. Discovers public entries through successful complete JSON list/describe responses. Adds affected parents, groups and delegations from catalog composition; the task names other semantic dependencies the composition cannot infer.
2. Resolves this installed skill (with an explicit override), invokes its checker, and fails diagnostically when it is missing. Records scope, collection identity, fingerprints, checker version and result. Keep the adapter in project QA tools, outside spec directories.
3. Recollects descriptions at authoring closure and independent-evaluation preparation. The latter hands over the checked descriptor snapshot, not an old pass receipt. If delivery inputs change, repeat the check for those inputs before handoff.

Use this check for authoring closure and campaign preparation, not as a universal gameplay preflight. The receipt is mandatory workflow evidence, not a sandbox that prevents manual tool calls. It does not replace semantic assertions or independent evaluation, and does not itself authorize a new campaign.
