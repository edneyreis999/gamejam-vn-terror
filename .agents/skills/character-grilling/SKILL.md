---
name: character-grilling
description: Interview to build the character sheet of an RPG character. Human-invoked only; does not write documents or implement anything.
disable-model-invocation: true
---

# Character grilling

Interview the user, one question at a time, to build the character sheet of an RPG character.

1. Start by asking: "Which character is this, and which characters from games, books, series or films inspire their voice?"
2. Use sub-agents to discover what the project already defines about the character (scenes, sheets, story) and for any internet search. Search only what the user cited or what unlocks the next question.
3. Walk the branches in dependency order, covering at least: identity and role in the story, desire and fear, flaw, voice, relationships, arc. Open other branches the character calls for. Ask only questions whose prerequisites are answered and that the project does not already answer.
4. Each question carries a recommended answer and contrasting alternatives.
5. Finish when every branch is resolved, and give the next steps.

Based on Matt Pocock's grilling (MIT).
