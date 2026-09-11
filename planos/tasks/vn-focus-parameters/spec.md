---
status: approved
delivery_status: accepted
accepted_on: 2026-09-11
---
# Global dialogue focus parameters

Authorized by the user on 2026-09-11, following [the analysis](../../../docs/design/2026-09-11-eventbridge-parametros-de-autoria.md). Incremental baseline: [vn-slot-authorship](../vn-slot-authorship/spec.md). Product authority: [canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md). [ADR001](adrs/adr-001.md) records the accepted scope.

- RQ001: five Portuguese Plugin Manager number fields: ListenerDarkness 0–255/default24; ListenerScale 1–100/default90; SpeakerScale 100–150/default100; ListenerOffset 0–100/default16; FocusDuration 0–60/default20. Whole numbers only; missing fields use documented defaults, explicit invalid values reject with actionable diagnostics naming the Portuguese editor field. These are project settings, not player options; edit them in Plugin Manager → Dryland_EventBridge → Bustos — Foco da conversa, save and reload the game.
- RQ002: Focus commands contain only slot; migrate the seven published calls and canonical fixtures; explicitly focus the first speaker in the45 previously unfocused solo/profile entries, reusing helpers68/71. Preserve all 12 helpers, section identities, text, native choices, assets, vendor files, plugin order and campaign rules. No per-scene override.
- RQ003: both playback and pure reconstruction use the same parsed global style. Scales derive independently from the authored base; darkness becomes equal negative RGB with zero gray. Neutral uses original base, empty target is a no-op, Andirá retains zero offset, unchanged focus is idempotent, reduced/recovery duration is zero. Authored entry transforms retain their original bounds; validated base-relative targets may exceed those authored bounds (for example, a 200% base with a 110% speaker multiplier yields 220%). Normal playback and recovery must both apply that derived target.
- RQ004: initial command migration gets a new native revision. Later style-only changes apply on compatible Continue without invalidating progress. Style is project configuration, never new campaign state. Tooling validates the same parameter domain without executing plugins.js as code. Runtime boot and the CLI pass the validated style to the content graph: an authored Wait immediately following Focus must not exceed FocusDuration, including the valid duration0/wait0 boundary. Existing helpers have no Wait after Focus. If the team adds such waits and later lowers FocusDuration, those waits must be reviewed.
- RQ005: guide editing through Plugin Manager; record remaining maintenance opportunities in a known issue and add the five controls and compatibility requirements to the existing future VNPictureBusts issue. No implementation of those deferred opportunities or participant expansion.

Verification: pure configuration/metadata/CLI cases; all existing units; affected real MZ authoring, recovery, focus and cancellation cases; dedicated native parameter change/reload/Continue test with non-default values and a real screenshot. Final art framing remains user-deferred. No broad unchanged-campaign replay required. No commit/publication.


## Accepted consolidated delivery — 2026-09-11

The user accepted the final development with: “agora ficou bom. atualize a spec com essas ultimas atualizações. e em seguida pode aprovar todo o desenvolvimento.” This closes the delivered bust-dialogue workstream, including its native authoring, positional consolidation and global focus configuration. [Verification](verification.md) owns the acceptance, exact final fingerprint and evidence; [tasks](tasks.md) records the completed graph.

| Increment | Final contribution |
| --- | --- |
| [vn-picture-busts-dialogues](../vn-picture-busts-dialogues/spec.md) | Native dialogue bust authorship, ensemble composition, focus and lifecycle integration. Its original recipes and unresolved historical sensors are preserved as provenance. |
| [vn-slot-authorship](../vn-slot-authorship/spec.md) | Reduced148 auxiliary Common Events to12, IDs68–79; one base per position and reconstruction through the same native authorship, replacing per-hero/per-box recipes. |
| vn-focus-parameters | Five global numeric editor controls; seven published Focus calls carry only slot, and45 first-speaker calls reuse existing helpers. No additional Common Event is required. |

The current contract combines these increments; the later two replace the earlier recipe and per-command style designs. Dialogue text remains in native Show Text/Show Choices. Images and entry scale/position remain in the authored events. All258 section identities and282 indexed narrative boxes are preserved. No PNG was replaced or generated.

The initial migration uses native revision `mz-20260911-focus-parameters-02`; earlier incompatible saves are retained but cannot resume this layout. Start a new game for the migration. Subsequent changes limited to the five settings apply to compatible Continue without changing campaign progress.

The final verification run passed78/78 selected tests, including all74 units and the custom-style Chrome/Options/Continue test. Earlier affected native evidence has its explicit retained scope in verification.md. Independent review reports SHIP after F-001 was corrected. These are recorded results, not new tests performed for the acceptance update.

## Deferred work and maintenance handoff

- [Editor maintenance opportunities](../../../docs/known-issues/KI-20260911-eventbridge-manutencao-visual-no-editor.md): memorial crops, UI styles/images/labels/type/layout and destination backgrounds. No implementation is implied by this acceptance.
- [Participant and VNPictureBusts evolution](../../../docs/known-issues/KI-20260911-bustos-participantes-e-foco-por-posicao.md): future positional participants and automatic speaker/listener focus must retain the five controls, one configuration authority, base-relative transforms and compatible recovery.
- PNG normalization and final framing remain assigned to the user for later editing. Historical prison-art and unavailable-editor observations are not relabeled as successful tests. This approval accepts the delivered functionality with those explicit boundaries.

The [maintenance guide](../../../rpg-maker/README.md#editar-bustos-e-foco-dos-diálogos) is the team's current editing procedure. No further implementation task is pending for this accepted scope. Future behavior changes require a new incremental spec; approval here does not implement the deferred issues or authorize a commit/publication.
