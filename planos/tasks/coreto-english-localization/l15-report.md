---
status: done
evaluator: independent agent (no part in translation or implementation)
scope: read-only corpus review (reduced by project owner)
---

# L15 report: English readability evaluation

## Coverage

This is a **read-only corpus review**. I did **not** play the game. The
project owner cut the play-through from scope, so I saw no route, ending,
encounter, choice screen or timing in the running game. Everything below
comes from reading the text.

What I read:

- Every row of `rpg-maker/The Dryland Drowned/Languages.tsv` (451 keys), in
  the English column. I checked the Portuguese column for each key to confirm
  that no information, clue or outcome was added, dropped or changed.
- `source-map.md`, for scene, speaker and display context. I leaned on it most
  for the epilogues, closings, memorial and council.
- `translator-guide.md` and `glossary.md`, for the style rules and fixed terms.

Areas covered: UI and options, title warning, prologue, tavern and
destinations, all 16 encounters (intro, three approaches, success and failure
for each), all 16 death passages, farewells, lover scenes and rewards,
sacrifice, memorial, council, all three closings, all eight epilogues, and all
eight recruitment conversations.

Because nothing was played, I could not check how any finding reads on
screen: line length in the window, word wrap, pacing, or what the player just
saw before a line appeared. Priorities are my estimate of the effect on a
native American English player.

## Summary

Overall the English is strong. It reads as natural American English, keeps
the dread, and keeps each character's voice distinct. I found no meaning
drift that changes an outcome, adds a clue or removes one. Most findings are
small wording problems in the one-line failure outcomes, where the English
brings in an object the scene never set up or leaves a referent unclear. A
few are source quirks that the English carries over faithfully but that read
worse in English.

Findings by priority: **1 high, 9 medium, 6 low** (16 total).

## Findings

### F01: "none of them" makes the B7 clue unclear (high)

- **Key:** `enc.b7.result_2.success`
- **Text:** "The group compares the dates and notices that one of them counts down differently. Under its numbers appears a name that belongs to none of them, written before the rest."
- **Problem:** "them" in "one of them" means the dates. Two clauses later, "none of them" is meant to be the heroes (PT: "nenhum dos presentes", none of those present). The nearest antecedent is still "the dates", so the sentence can read as "a name that belongs to none of the dates", which makes no sense. This sentence holds the whole payoff of the approach: the omen is someone else's death.
- **Effect on horror:** The reveal (the shroud is repeating a stranger's death, not ours) lands as confusion instead of relief.
- **Direction:** Name the referent: "a name that belongs to none of the heroes" or "to no one present".

### F02: "tell where they are from the memories" misleads the reader (medium)

- **Key:** `enc.b3.result_3.success`
- **Text:** "That feeling helps them tell where they are from the memories the fire is showing."
- **Problem:** Garden-path sentence. "where they are from" first reads as "their place of origin". The reader has to back up to find "tell X from Y".
- **Effect on horror:** It stalls the escape beat, which should feel like grounding: cold clay against false fire.
- **Direction:** Put the contrast up front, for example "tell the place they are standing in from the memories the fire shows", or "tell what is real from what the fire is showing".
- **Related, same encounter:** `enc.b3.result_2.failure`, "The memory they hold on to has a lie in it; its burned versions wipe out the way back." "its burned versions" (of the memory) takes effort to parse. The intro and approaches call these "the burning versions", so reusing that phrase would help.

### F03: The A1 failure brings in "soot" the scene never showed (medium)

- **Key:** `enc.a1.result_3.failure`
- **Text:** "The soot points to a false center; the group steps into the spin, and the shards cut off the way back."
- **Problem:** The intro and approach 3 talk about watching "the dust and shards". Soot and a "center" appear only here. A player who picked "watch the dust" cannot tell what went wrong. The PT has the same mismatch ("fuligem"), so this is a source issue, but English readers get no help.
- **Effect on horror:** The failure should feel like a fatal misreading of the trap. Instead it reads like a continuity slip.
- **Direction:** Flag it to the narrative owner. If they allow it, use the object the player chose to watch ("The dust points to a false center…").

### F04: "lock" of hair can be read as a mechanical lock (medium)

- **Keys:** `enc.b6.intro.2`, `choice.b6.approach_3`, `enc.b6.result_3.success`
- **Text:** "One thick lock holds up the crossing…"; "Undo the braid of hair without snapping the lock that holds up the walkway."; "The supporting lock holds firm"
- **Problem:** In a scene about boards, a walkway and a crossing, "lock" also suggests a latch or bolt, especially in the approach button, which the player may read on its own. `death.b6.context` says "the lock of hair" and is clear.
- **Effect on horror:** The image of a braid of drowned hair holding the bridge is one of the best in the game. The mechanical reading drains it.
- **Direction:** Keep "hair" close to the word, for example "one thick strand of hair" or "the lock of hair" in the approach. A rope image also works, since the intro already says "like a rope".

### F05: "the right hooks" reads as a direction, and "Unhook the right hooks" repeats itself (medium)

- **Keys:** `choice.a7.approach_1`, `enc.a7.result_1.success`
- **Text:** "Unhook the right hooks and open a way between the sacks." / "The right hooks are released one after another."
- **Problem:** "right" can mean correct (PT "certos") or right-hand side, and in a choice button there is no context to settle it. "Unhook the hooks" is clumsy.
- **Effect on horror:** It weakens the most unsettling encounter (sacks begging in familiar voices) with a stiff button label.
- **Direction:** "Release the correct hooks…" or "Find which hooks to release…".

### F06: Epilogue text boxes break mid-phrase (medium)

- **Keys:** `epilogue.elowen.1`–`.4`, `epilogue.griznik.1`–`.3`, `epilogue.seraphina.1`–`.2`, `epilogue.bimbren.1`–`.2`, `epilogue.vaelith.1`–`.2`, `epilogue.draska.2`–`.3`
- **Text (examples):** "…walking the familiar" / "trails. At some bends…"; "Under each one, he writes the" / "name of a companion…"; "learning to share the decisions she once made" / "alone."
- **Problem:** Each key is its own text box, so the player advances in the middle of a noun phrase ("the familiar | trails", "writes the | name"). The source map says this copies the source. In the Portuguese the breaks came from line layout; in English they fall in odd places.
- **Effect on horror:** The epilogues are the quiet grief after the horror. Breaks mid-phrase make them feel like a glitch. Only "made | alone." reads as a deliberate beat, and that one works.
- **Direction:** Keep the key count, but move words between neighboring keys so each box ends on a full clause or sentence. The only exception is where the break is clearly dramatic ("alone."). Every key already has its own English cell, so this needs no event change.

### F07: Draska's epilogue opens with an unnamed "she" and a meta term (medium)

- **Key:** `epilogue.draska.1`
- **Text:** "After surviving the campaign, she uses her share of the reward to buy the abandoned mine…"
- **Problem:** The other seven epilogues open with the hero's name. This one opens with "she", and the name never appears in Draska's text. Also, the glossary defines "campaign" as the UI term for a playthrough/save file (`ui.save.locked_slot`). Inside the fiction everywhere else the journey is "the expedition".
- **Effect on horror:** It slightly breaks immersion. "Campaign" reads like the game talking about itself.
- **Direction:** Open with "Draska" (if the portrait does not already name her on screen) and use "expedition". PT has the same wording, so check with the owner. The glossary term conflict is English-side.

### F08: "Rode a sack to the press" sounds flippant (medium)

- **Key:** `memorial.cause.a7`
- **Text:** "Rode a sack to the press to open the exit."
- **Problem:** "Rode" suggests choice and even fun (riding a ride). The death passage says the hero climbed into a sack as a counterweight and was carried off and crushed. PT "Seguiu num saco" is neutral.
- **Effect on horror:** The memorial card is a solemn factual caption. This line risks dark comedy.
- **Direction:** "Was carried to the press inside a sack to open the exit," or "Went to the press inside a sack so the exit would open."

### F09: "whoever reads it" (medium)

- **Key:** `enc.b5.result_1.failure`
- **Text:** "The summoning they piece together uses the wrong date, and the oldest mirror swaps the face of whoever reads it."
- **Problem:** "it" could be the mirror or the summoning. Reading a mirror is odd, so the reader stops. PT "quem lê" means whoever reads (the summoning) aloud.
- **Effect on horror:** The punishment (your face gets swapped for saying the words) is strong but blurred.
- **Direction:** "…swaps the face of whoever reads the summoning aloud."

### F10: The A5 failure mentions "the tool", which never appeared (medium)

- **Key:** `enc.a5.result_2.failure`
- **Text:** "The clasp catches the tool in the heated chains, which seal the corridor with fire."
- **Problem:** No tool appears in the intro or approach ("Undo the harness clasp without touching the red-hot chains"). "which" can attach to the tool or the chains. PT has the same line, so this is source-level, but English makes the leap more visible.
- **Effect on horror:** The failure is hard to picture, so the mule loose and the fire closing in lose force.
- **Direction:** "The clasp jams, snagging whatever they used to pry it on the red-hot chains, and the chains seal the corridor with fire." If the owner agrees, drop the tool.

### F11: "The group … it" in outcomes (low)

- **Keys:** `enc.a2.result_2.success`, `enc.a2.result_3.success`, `enc.b5.result_1.success` (and the corpus in general)
- **Text:** "…the group finds its bearings by the wind, the slope of the ground and the plants. Following those signs, it avoids the vines…"
- **Problem:** "it" for the group is correct but sounds mechanical, and here it sits right after "the wind", which can briefly grab the pronoun. More widely, "the group" appears about 108 times and opens many sentences, which makes the encounters sound alike.
- **Effect on horror:** The heroes feel like a unit and not like people. It is mild.
- **Direction:** Where it is safe, use "they" or "everyone". American English allows "the group … they" in narration.

### F12: "The invitation mark is finished before it can be closed" (low)

- **Key:** `enc.b8.result_1.failure`
- **Problem:** The approach is to erase the drawing. "Closed" does not fit a drawing. PT uses the same verb ("fechada"), but in English the reader asks "closed how?"
- **Direction:** "…finished before it can be erased…"

### F13: "Little shutter" and "small window" name the same object (low)

- **Keys:** `choice.b1.approach_3`, `enc.b1.result_3.success` ("small window") vs `enc.b1.result_3.failure` ("little shutter")
- **Problem:** Two names for one object in the same approach's outcomes. A player may think the whistle moved to a different object. PT has the same split (postigo / pequena janela).
- **Direction:** Use "small window" in all three.

### F14: The closing narration reads like stage directions (low)

- **Keys:** `closing.reunite.2`, `closing.destroy.2`, `closing.total_loss.2`
- **Text:** "Afterward, we see Pérola and Floraí free."; "The last scene shows Ivaí alive…"; "…followed by the game over screen."
- **Problem:** A camera narrator ("we see", "the last scene", "the game over screen") steps outside the fiction just after the strongest lines in the game. The English matches the PT, so this is a source-level tone issue, not a translation error.
- **Direction:** Raise it with the narrative owner. If allowed, describe the image directly ("Pérola and Floraí walk free…").

### F15: "Excerpt" and "passage" for Irati's notes; "the bard" (low)

- **Keys:** `council.irati.narrator` ("Irati's last excerpt"), `campaign.irati_02_01.narrator` ("another passage in Irati's hand"), `council.rheed.2` ("would save the bard")
- **Problem:** "Excerpt" is bookish, and "passage" is used everywhere else for physical passages the heroes cross. "The bard" appears nowhere else in the English, so the epithet costs a beat, although "Ivaí's life" just before makes the referent recoverable.
- **Direction:** Use "note" for Irati's writing in both keys. Consider "would save Ivaí" or keep "the bard" if his role is shown elsewhere.

### F16: Minor idiom slips (low)

- `dest.physical.desc`, "a prisoner of stone guards part of the way": "part of the way" is also an idiom for "partway", so it can read as "guards for a stretch". Consider "guards part of the path" or "guards part of the map".
- `conv.gorvak.help2`, "if fear gets its grip on you": more natural is "if fear takes hold of you".
- `epilogue.griznik.3`, "quotes he refuses to lower": "quotes" can read as quotations. Use "prices" or "estimates".
- `council.draska.2`, "It's the least harm I can accept right now.": consider "the least harm I can live with" or "the lesser harm".

## What works well

- **Horror through plain, concrete images.** The English keeps the images and does not dress them up. "He drowns, though the ground is dry." (`closing.reunite.1`) echoes the title in six words. "A moment later, the sound answers in the voice of the last hero who spoke." (`enc.b1.intro.1`) and "a song rises in their own voice and repeats a name no one recognizes" (`enc.b6.intro.1`) are clear and unsettling.
- **Subtext kept.** "Aren't you leaving something out, master?" (`prologue.tavern.rheed.7`) keeps the hint that Ivaí is hiding something, as the guide asks. "The details will come along the way." (`prologue.tavern.ivai.2`) is warm and evasive.
- **Farewells.** Short, in character, and they hit hard: "Live. Then decide what this death means." (Seraphina), "Take the pages. Make my last line count." (Vaelith), "I'll stay here. I'll buy you time to get through. Don't waste it." (Gorvak).
- **Distinct council voices.** Elowen is raw ("You knew, Ivaí! … And don't mistake that for forgiveness."), Draska is pragmatic ("We could check every passage and still die from something you already knew."), Vaelith is scholarly ("You decided I shouldn't read them."), Liora confesses ("I suspected, and I kept quiet."). Each argues the choice from their own backstory.
- **Clear death passages.** They name "the hero" instead of using an ambiguous pronoun, and use singular "they" cleanly ("has to write their own name on the cloth", `death.b7.context`). Each one states cause, sacrifice and cost in order.
- **Choices you can act on.** Most approach labels are a single clear action ("Tear the oldest mirror off the wall and turn it against the others."; "Follow the feathers and the drafts to a passage beyond the cloth's reach."), and the final choice spells out the cost ("Restore the medallion — free the lovers and die").
- **Terms and UI consistent.** Party, Encounter, Retreat, Destinations, Cast, Restore and oath match the glossary everywhere I checked. The sacrifice warning is plain and firm ("There will be no confirmation and no turning back.").
- **Recruitment conversations with personality.** "I can wait. The inscriptions have waited much longer." (Vaelith); "About time, Ivaí. I'm ready. Let's see if you can keep up." (Elowen); "Not every scribe works sitting down."
- **Meaning kept.** Checked against the Portuguese, I found no added, dropped or softened clue, outcome or cost. Where the English has a problem (F03, F10, F12–F14), the Portuguese has it too.

## Limitations

- I am an AI agent, not a human playtester. My sense of what a native player
  stumbles on is a judgment, not an observation, and I did not measure
  reading time or confusion.
- I did not play. I could not check rendering, word wrap, window size,
  pacing, portraits (which may already name Draska in F07), sound, or what
  context comes right before each line. Findings on referents and page
  breaks (F01, F06, F07) most need an on-screen check.
- I read keys in table order, grouped by scene through the source map, not in
  play order, so I may over- or under-rate lines whose meaning depends on the
  moment they appear.
- Findings marked as source-level (F03, F10, F12–F14) may need a narrative
  decision, not a translation fix. I did not decide them.
- No readability score was used.

## Dispositions (translator, 2026-09-29)

Added after the report by the implementing agent; the evaluation above is
unchanged. English cells only; no event, key or Portuguese cell changed.

| Finding | Disposition |
| --- | --- |
| F01 (high) | Fixed: “a name that belongs to none of the heroes”. |
| F02 | Fixed: “tell the ground they are standing on from the memories…”; `enc.b3.result_2.failure` now “the burning versions of that memory”. |
| F03 | Source-level (PT “fuligem”). Left for Edney. |
| F04 | Fixed: “strand” of hair in the intro, approach 3 and its success. |
| F05 | Fixed: “Release the correct hooks…”, “The correct hooks…”. |
| F06 | Fixed: epilogue boxes rebalanced so each ends on a full clause; Draska's “made / alone.” beat kept. |
| F07 | Fixed in EN: opens with “Draska” and uses “expedition” (PT “campanha” kept). Flagged for Edney. |
| F08 | Fixed: “Was carried to the press inside a sack to open the exit.” |
| F09 | Fixed: “whoever reads the summoning aloud”. |
| F10 | Source-level (PT “ferramenta”). Left for Edney. |
| F11 | Fixed where flagged in A2 (“they avoid”); the rest kept (correct usage). |
| F12 | Source-level (PT “fechada”). Left for Edney. |
| F13 | Fixed: “small window” in all three B1 keys. |
| F14 | Source-level tone. Left for Edney. |
| F15 | Fixed: “note” for Irati's writing in both keys; “the bard” kept (recoverable from “Ivaí's life”). |
| F16 | Fixed: “part of the path”, “if fear takes hold of you”, “estimates”, “the least harm I can live with”. |

Re-evaluation of the changed keys by a fresh reviewer was not run (D-024
reduced scope); Edney's review covers them.
