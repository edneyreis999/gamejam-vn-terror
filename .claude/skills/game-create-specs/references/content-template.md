# Content Template

Structure for `_content.md`, the content this increment needs authored or replaced — text, images, audio, maps, animations, data entries — with where the designer edits each piece and which copy is authoritative.

## Rules

- **One authority per piece**: name the single place where future edits happen. Source documents, spreadsheets, or generated files that remain after integration are archived history, not copies to keep synchronized.
- **Editor-first**: prefer locations the designer reaches through the engine's normal editor workflows, where they can find the text, select or replace an image, adjust placement, and see the result without reading code.
- **Status per piece**: final, placeholder, or pending; a placeholder never ships as final without the user's decision.
- **Necessary only**: list the content the increment requires, not a production plan for the whole game.

## Document Skeleton

```markdown
# Content: <Increment Title>

Content this increment needs. Companion to `_spec.md` and `_user_stories.md`.

## Inventory

| ID    | Kind  | Description          | Authoring location               | Authority | Status      | Stories |
| ----- | ----- | -------------------- | -------------------------------- | --------- | ----------- | ------- |
| C-001 | text  | <what it says/does>  | <where the designer edits it>    | <place>   | placeholder | US-001  |
| C-002 | image | <subject and use>    | <where it is selected/placed>    | <place>   | final       | US-002  |

## Sources and Archive

Content authored outside the game: its source, how it enters the game, and what happens to the source afterward.

## Language

The languages the content ships in and which one is authored first.
```
