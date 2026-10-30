---
name: remove-commit-slop
description: Commit slop review. Use before every commit, including requests to commit existing changes. Do not use for general cleanup outside the intended commit.
---

Review every file intended for the commit for long-term usefulness and AI discoverability. Use the next five years as a planning horizon, not an expiration date for project history.

Remove demonstrably redundant or transient content within the intended changes. Preserve supported contracts, decisions, useful evidence and history, and unrelated existing content. When usefulness is uncertain, retain the content and report the concern.

For retained content that is difficult to discover, improve its title, location, or links within the commit scope, preserving references. Finish when every intended file has been reviewed and any edits have been checked for broken references or changed behavior.
