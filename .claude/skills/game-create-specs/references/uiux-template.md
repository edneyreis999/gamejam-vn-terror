# UI/UX Template

Structure for `_uiux.md`, the inventory of player-facing screens, menus, HUD elements, controls, and feedback this increment touches, with every state they must show. It names surfaces and states; visual design itself belongs to design work and its references.

## Rules

- **Inventory, not design**: name each touched surface, what changes, and its states. Cite a visual reference only when the user supplied or approved one.
- **States from stories**: enumerate states from `_user_stories.md` ACs and ECs, cited by ID, including empty, unavailable, and error states.
- **Truthful UI**: an unavailable action is shown as unavailable or absent, never as working; nothing reveals internal identifiers or development data to the player.
- **Reuse before create**: prefer the game's existing windows, menus, and feedback conventions; a new kind of surface is a shared-pattern question for the interview.
- **Controls**: list each input that drives the surface and what it does; keep the game's existing control conventions unless the user decided otherwise.

## Document Skeleton

```markdown
# UI/UX: <Increment Title>

Player-facing surfaces this increment touches. Companions: `_spec.md` Part I, `_user_stories.md`.

## Surface Map

| #  | Surface   | Kind         | Change          | Stories |
| -- | --------- | ------------ | --------------- | ------- |
| S1 | <surface> | new / modify | <one-line change> | US-001 |

### S1. <Surface name>

- **Today**: current behavior (omit for a new surface).
- **Change**: what this increment does to it.
- **States**: every state the player can see, from the cited ACs and ECs.
- **Controls**: inputs and their effect.
- **Feedback**: sound, animation, or text that confirms an action.
- **Visual reference**: <path> or `none`.
```
