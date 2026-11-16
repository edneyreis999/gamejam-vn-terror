# Inventory format and renderer

Hand-written tables are fine. To have the lines quoted and checked mechanically, select the evidence and render it.

1. Collect sources with `inventory_sources.py ... --full-text`, adding every document the selection cites with `--source`.
2. Write a selection TSV. Line 1: `# spec=ID`. Line 2: `# scope text`. Then one tab-separated row per episode: task number or document filename; line spans; category codes; origin code; attempted action and error; cause with certainty.
   - Spans: `10-15,19`, cross-document `14:67` (task 14, line 67), or `*` for the whole document.
   - Categories: `I` Infrastructure, `T` Tests, `M` Implementation, `D` Instruction discovery, `P` Planning and coordination; `T+I` adds secondary categories.
   - Origins: `A` agent action or omission, `U` indeterminate, `E` environment or tool, `R` pre-existing product defect.
3. `python3 -B scripts/render_execution_inventory.py SOURCES.json SELECTION.tsv` prints the table; it fails when a cited line is unavailable instead of dropping evidence. Add a `Sources and limits` text by hand.
4. `python3 -B scripts/render_source_manifest.py SOURCES.json [OTHER.json...]` prints the sources-examined tables.
5. `python3 -B scripts/validate_inventory.py INVENTORY.md [SOURCES_MD...] --collected SOURCES.json` checks local links, table widths, unique occurrence ids and source hashes. It does not validate your classifications.

Write the selection only after reading the cited lines. Classifications are the survey's, not the original executor's.
