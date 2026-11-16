---
name: game-write-devlog
description: Devlogs for itch.io. Use when writing or revising development posts from project work, or archiving published devlogs. Do not use for changelogs, internal design records, or general marketing copy.
---

# Write Devlogs

## 1. Check the work and history

Read the project instructions, the selected commits, and their diffs. Consult the game vision and documents related to the subject. When discussing characters or locations, follow their respective indexes. Resolve differences between current documentation and the commit before attributing a decision to that delivery.

Distinguish proposals, confirmed decisions, implementation, and validation. A written character sheet proves writing work; a reference image does not prove finished artwork. Use external sources according to the project's source precedence.

Check local devlogs and the available publication history. Reuse a post's number when revising or archiving it. For a new post, continue the known sequence with the title `DevLog #X — Title`. Ask when sources cannot resolve a numbering conflict.

Finish this step when each post has an identified source, subject, number, and publication state.

## 2. Choose what to tell

Write for itch.io readers, including jam participants who have never seen the repository. Default to English, first-person plural for the team, and approximately 250–350 words unless the user directs otherwise.

Choose a concrete development and explain why it matters to the playing experience or creative process. Use the emotional perspective supplied by the author. When none is available, describe decisions and observable work; do not invent feelings, team conversations, work sessions, player reactions, or test results.

Select one or two details that support the subject. Keep proposed examples clearly identified as proposals, and avoid revealing story twists unless requested. Keep commit identifiers and file paths in metadata, outside the reader-facing text.

Finish this step with a central subject, verifiable examples, and clear limits on what has already been done.

## Writing style

- Write as someone telling another jam participant what they just worked on. Use natural English contractions and everyday vocabulary.
- Prefer observable details to praise for the project. Explain a decision through what it changes, without turning the text into a feature list.
- Vary sentence and paragraph length with the thought. Preserve grammar; informality does not require manufactured mistakes, forced slang, or constant enthusiasm.
- Choose the opening and ending from each post's subject. Compare with previous posts to avoid repeating the same emotional arc or catchphrase.
- Use continuous prose without emojis or decorative emphasis. Reserve lists for content that needs comparison or sequence.
- Cut slogans, rhetorical questions, formulaic contrasts, and generic motivational endings. End with an observation or next piece of work supported by the sources.
- Treat deadline anxiety, humor, and enthusiasm as the author's choices, not mandatory ingredients of every devlog.

## 3. Review and save

For new or rewritten text, obtain an independent review:

1. As the authoring agent, prepare the draft and delegate voice review to another agent. Provide the text, the itch.io audience, this skill's and the user's style preferences, and the facts that must be preserved.
2. Instruct the reviewer to locate the installed `humanizer` skill, read it in full, and apply it to the text. Only the reviewer applies `humanizer`. Request the revised text and a short summary of changes, without publishing or further delegation.
3. After receiving the review, check every factual claim against the sources. Also check language, number, title, possible spoilers, and metadata before saving. If you substantially rewrite the text after review, send the new version to the reviewer and repeat the checks before finishing.

If another agent or the `humanizer` skill is unavailable, report that independent review is pending. Do not replace it with self-review or declare the workflow complete.

Organize each devlog under `docs/devlogs/` in an `NNN-subject/` directory, with its body and frontmatter in `text.md` and its images in `assets/`. For example, `docs/devlogs/002-quests/text.md` uses a three-digit, zero-padded number and a stable descriptive subject. Preserve the directory name when revising or archiving the same post; when moving an existing file into this structure, use its filename without `.md`.

Reference images from `text.md` as `assets/filename`. Track `assets/.gitkeep` while the directory is empty and remove it when adding images. Update index links and local references when moving a post.

Use frontmatter for `status: in-development`, `publication: draft` or `published`, `commit`, and `language`. Include `url` when published and `published_title` when the local title differs from the original. This block is editorial metadata and stays outside the content sent to itch.io.

When archiving, preserve historical copies of published posts and their origin in full; identify an editorial rewrite separately from the historical archive. Marking a local copy as a draft does not change the remote post. Publish or edit on itch.io only when included in the request; authorization already given in the conversation remains valid. After publishing, check the content and public state before recording the link and changing the local state.

Finish when all posts follow this structure, local text and image links resolve, metadata matches the actual publication state, and every new or rewritten text has received independent review and the author's factual checks, including another review after any substantial rewrite.
