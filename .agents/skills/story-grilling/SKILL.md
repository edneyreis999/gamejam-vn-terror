---
name: story-grilling
description: Interview to build the story of an RPG. Human-invoked only; does not write documents or implement anything.
disable-model-invocation: true
---

# Story grilling

Interview the user, one question at a time, to build the story of an RPG.

1. Start by asking: "Which game, book, series or film stories do you want to draw inspiration from for this one?"
2. Use sub-agents to discover what the project already defines about the story and for any internet search. Search only what the user cited or what unlocks the next question.
3. Walk the branches in dependency order, covering at least: world, protagonist and party, conflict and antagonist, structure, endings. Open other branches the story calls for. Ask only questions whose prerequisites are answered and that the project does not already answer.
4. Each question carries a recommended answer and contrasting alternatives.
5. Finish when every branch is resolved, and give the next steps.

Based on Matt Pocock's grilling (MIT).
