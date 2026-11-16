# Collection scripts

Run from this skill's directory. Every script reads only; JSON goes to stdout, Markdown renderers print to stdout, and files are created only by shell redirection (use a scratch directory). Collectors do not run project code, tests or installations, and do not infer agent fault, root cause or error counts.

| Script | Use |
| --- | --- |
| `inventory_sources.py SPEC_DIR --project-root ROOT [--full-text] [--source FILE]... [--receipt NAME]... [--verification-root DIR]` | Spec Markdown, task status, execution notes (`## Execution Notes` or `## Notas de execução`), numbered text with `--full-text`, receipt references. Both `task_NN.md` and `task-NN.md` work. Repeat `--source` for documents outside the spec directory; a shared document may mention unrelated work, so exclude that from conclusions. |
| `collect_execution_metrics.py SPEC_DIR [--metrics-dir DIR]` | Published `execution-metrics/*/*/*.json`: findings and links, quality gaps, failed commands, correction chains, unreadable records as gaps. Does not recompute tokens or durations. |
| `collect_verification.py SPEC_DIR --project-root ROOT [--details]` | Referenced verification summaries, nonzero/signal/blocked results, `test:fail` events with line numbers, fallback stderr. `--details` adds bounded per-job results and reports. Accepts `--receipt`, `--source`, `--verification-root`. |
| `collect_linked_evidence.py SPEC_DIR --project-root ROOT [--depth 2] [--source FILE]...` | Follows local Markdown links to documents, recording missing targets and hashes. Stays inside the project unless `--allow-root` is given. |
| `collect_referenced_files.py --artifact-root DIR --source DOC [--file EXACT]...` | Reads `.json`, `.jsonl`, `.log`, `.txt`, `.stdout`, `.stderr` files named in documents; nested paths need `--file`. |
| `inspect_collected.py JSON VIEW` | Bounded views of collector output. Views: `stats`, `sources`, `notes`, `receipts`, `failures`, `failure-brief`, `details`, `files`, `metrics`. Options: `--match`, `--start`, `--limit`. |
| `render_source_manifest.py JSON...` | Markdown table of files read (with SHA-256), unavailable candidates and receipt signals. |
| `render_execution_inventory.py` and `validate_inventory.py` | See [inventory format](inventory-format.md). |

Receipt discovery is heuristic: it recognizes `acceptance-*` ids, bare 13-digit timestamps and named runs under `.artifacts/verification`, and keeps explicit directory references even when missing. A candidate that does not exist may be a lookup artifact rather than lost evidence. It does not expand brace ranges or infer runs from a prefix; pass those with `--receipt`. Expected negative tests, pre-implementation probes, repeated attempts and superseded campaigns need separate interpretation.
