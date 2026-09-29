---
status: ready
audience: fresh evaluation agent (no part in translation or implementation)
---

# L15 brief — English readability evaluation

You are playing a short horror visual novel, *The Dryland Drowned*, in
English. Evaluate whether the English is easy to follow while keeping the
horror. You did not write or translate it; judge it as a player would.

## How to play

- Start the game server from the worktree root:
  `npm start -- --port 18737 --no-open`, then open `http://127.0.0.1:18737/`
  in a fresh, isolated browser context. Before clearing that origin's
  storage, confirm with `lsof -nP -iTCP:18737 -sTCP:LISTEN` that the server
  is yours. Never use port 18726 or 18727.
- English is the default. Use only keyboard and mouse: Enter/Z confirm,
  Esc/X cancel, arrows move. Hold a key ~100 ms; instant taps may be missed.
- Create your own campaign with New Game. Do not load someone else's save,
  change variables, or use the console to steer the game. Reading game state
  for your notes is fine.
- Play until an ending, or as far as your time allows. Record where you
  stopped.

## What to record while playing

At each choice (party selection, destination, each encounter's three
approaches, sacrifice, the final choice):

1. In your own words: what is happening, and what does each option mean?
2. Anything you had to reread, any word you did not know in context, any
   unclear “he/she/it/they”, any sentence that felt needlessly long or
   tangled.
3. Whether the uncertainty felt intended by the story (mystery, dread) or
   caused by the wording.

## After playing

Read the remaining English copy in
`rpg-maker/The Dryland Drowned/Languages.tsv` (column `English`), using
`planos/tasks/coreto-english-localization/source-map.md` for scene and
speaker. Cover branches you did not see. Keep what you saw in play separate
from what you only read.

## Report

Write `planos/tasks/coreto-english-localization/l15-report.md` with:

- Coverage: route and ending played, encounters seen, what was read only.
- Findings, each with: key or location, the exact text, the comprehension
  problem, its effect on the horror, a suggested direction (not a rewrite
  mandate), and priority (high/medium/low).
- Things that work well, with examples. A report with no problems still
  needs examples and your reasoning.
- Limitations. You are an agent, not a human playtester.

Do not edit any project file other than your report. Do not use a
readability score as proof. Character and creature names (Ivaí, Andirá,
Boitatá, etc.) are intentionally untranslated.
