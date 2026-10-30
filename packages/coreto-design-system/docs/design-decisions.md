# Current visual decisions — 1.5.0

Confirmed direction; applied finish remains subject to artistic review. This inventory supersedes only the decisions explicitly listed below, not narrative art or campaign rules.

| Component | Current rule | Replaced approach |
| --- | --- | --- |
| Parchment | Approved texture, transparent margin, broad uneven edges, readable center; tiled frame without paint behind its edge | Cream backing outside the torn contour; narrow repetitive scallops |
| Hero labels | Brown text on a localized ivory brushstroke; tapered breaks; no border/shadow; purple underline on focus | One large shared strip, one parchment per hero, rectangular faded supports with gray fringes, hover-only names in footer |
| Selection/activation | Filled purple seal, corrupted wax outline, two asymmetric drips and two internal cuts; 24px reservation; independent of focus | Font check, smooth blob, embossed/red skull reference, outline-only proposal |
| Action focus | Purple, descender-aware underline, feather at decision label/CTA | Automatic feather on every text run; feather on descriptions and names; dimmed alternatives |
| Icons | Purple and 5% drawing-scale increase; fixed hit area; color only with reduced motion | Feather, underline, yellow glow, enlarged hit targets during animation |
| Conversation balloon | One action with name/portrait; 150ms scale transition; fixed target wins overlap; novelty supplied by consumer | Separate keyboard stop, novelty consumed on hover, pulsing animation |
| Panel composition | Group related content; 12px internal margin, 24px heading gap where requested; stable maximum shared-description height | Filling an old gap without rearranging content; label strips reappearing when choice context clears |
| Destination cards | Identity/progress, stable description, separate CTA; whole option retains native interaction | Progress used as the only CTA; multiple underlined paragraphs |
| Approach choices | Heading, reread action, images and shared Outfit description in one lower parchment; image grows 10%, no CTA | Separate upper heading panel, approach CTA with feather |
| Hero image focus | 10% drawing-only growth in roster and sacrifice contexts, fixed hit targets | Provider tint on transparent targets, unchanged artwork |
| Typography | Averia Libre for menus/titles/buttons/names; Outfit for reading; no zero-width outline pass; uppercase novelty badge with raised yellow dot | Outfit Medium on actions and descriptions; residual glyph stroke |
| Separators/options | #360A0B at 30%, vertical between horizontal controls, horizontal between sections; one options parchment | Separate window parchments |
| Footer | Reusable left/center/right slots, supplied labels and values | Hamburger over a label background; campaign-specific footer logic in renderer |
| Reading | Console keyboard selection does not advance waiting prose; consumed activation; hidden interface restores without committing a choice | Shared confirmation press triggering both control and prose |

## Semantic matrix

| Role | Feedback |
| --- | --- |
| Initial menu, dialogue decisions, save slots, final decision | `choice`: purple, underline, feather |
| Destination CTA | `choice`, applied only to CTA |
| Approach and sacrifice images | 1.10 drawing scale, stable labels, no feather |
| Hero name, auxiliary actions, option labels | `secondary`: purple and underline, no feather |
| Icon-only | `icon`: purple and 1.05 scale, no feather/underline |
| Titles, descriptions, status indicators | `none` |

Disabled controls neither focus nor activate. A selected seal does not make a disabled control available. Availability, selected state, novelty and content are inputs, not inferred from filename, localization or map identity. Brown #360a0b and purple #552070 on ivory #f8e9cc have nominal contrast 14.54:1 and 9.59:1 respectively.

The tavern/camp footer labels, destination progress denominator, party limit, sacrifice candidates, return actions, translated CTA strings and narrative illustrations belong to each consuming game. The package supplies composition and treatment, not these rules. The [1.5.0 increment](increment-1.5.0.md) records the latest replacements; 1.4.0 remains an archived baseline.
