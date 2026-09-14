# Task 14 — Responsibility destination audit

Static source audit of the implemented candidate, 2026-09-12. This records where each approved responsibility now lives. Canonical regression and the independent package audit supply separate evidence; editor, visual, audible and human results remain task16 responsibilities.

| Item | Approved destination | Current source inspected |
| --- | --- | --- |
| F01 | Bridge campaign initialization | Dryland_EventBridge.js: readConfiguration/query/validateBridgeAction; CE4; Rules.createReadyState |
| F02 | Bridge reads functional configuration; native calls own content references | Dryland_EventBridge.js: readConfiguration/query/validateBridgeAction; CE4; Rules.createReadyState |
| F03 | Public data in configuration fields; content/image/map associations in native commands | Dryland_EventBridge.js: readConfiguration/query/validateBridgeAction; CE4; Rules.createReadyState |
| F04 | Bridge maps event action to CampaignRules | Dryland_EventBridge.js: readConfiguration/query/validateBridgeAction; CE4; Rules.createReadyState |
| F05 | Bridge data-only projection | Dryland_EventBridge.js: readConfiguration/query/validateBridgeAction; CE4; Rules.createReadyState |
| F06 | Context binding plus domain legality | Dryland_EventBridge.js: readConfiguration/query/validateBridgeAction; CE4; Rules.createReadyState |
| F07 | Remove duplicate Bridge validation | Dryland_EventBridge.js: readConfiguration/query/validateBridgeAction; CE4; Rules.createReadyState |
| F08 | Native scene execution; Bridge explicit reading completion | CE1/5–12/82–116 and campaign wrappers; Presentation ObservationBegin/Complete; no Present/Conversation/SKIP_SEEN_TEXT |
| F09 | Observational native conversation/re-read with data queries | CE1/5–12/82–116 and campaign wrappers; Presentation ObservationBegin/Complete; no Present/Conversation/SKIP_SEEN_TEXT |
| F10 | Remove custom instant skip; provider AUTO/FAST | CE1/5–12/82–116 and campaign wrappers; Presentation ObservationBegin/Complete; no Present/Conversation/SKIP_SEEN_TEXT |
| F11 | Provider buttons/settings and event permissions | CE1/5–12/82–116 and campaign wrappers; Presentation ObservationBegin/Complete; no Present/Conversation/SKIP_SEEN_TEXT |
| F12 | Data/identity-to-native-branch adaptation only in Bridge | CE1/5–12/82–116 and campaign wrappers; Presentation ObservationBegin/Complete; no Present/Conversation/SKIP_SEEN_TEXT |
| F13 | Tavern UI events | CE3/30–39/42/117/262–265/304; native Query → variables/switches → pictures/choices |
| F14 | Authored focus/disabled style in tavern events | CE3/30–39/42/117/262–265/304; native Query → variables/switches → pictures/choices |
| F15 | Destination and arrival events | CE3/30–39/42/117/262–265/304; native Query → variables/switches → pictures/choices |
| F16 | Encounter UI events | CE3/30–39/42/117/262–265/304; native Query → variables/switches → pictures/choices |
| F17 | Sacrifice UI events | CE3/30–39/42/117/262–265/304; native Query → variables/switches → pictures/choices |
| F18 | Tavern-accessible roster event | CE3/30–39/42/117/262–265/304; native Query → variables/switches → pictures/choices |
| F19 | Bridge death/location data queries | Bridge death queries; CE58–60/338–350; Dryland_Memorial_H1–H8 with asset-provenance/eventbridge-memorial.json |
| F20 | Memorial composition events | Bridge death queries; CE58–60/338–350; Dryland_Memorial_H1–H8 with asset-provenance/eventbridge-memorial.json |
| F21 | Prepared assets and native animation; remove runtime cropping | Bridge death queries; CE58–60/338–350; Dryland_Memorial_H1–H8 with asset-provenance/eventbridge-memorial.json |
| F22 | Tavern death-fade events and presentation bookkeeping | Bridge death queries; CE58–60/338–350; Dryland_Memorial_H1–H8 with asset-provenance/eventbridge-memorial.json |
| F23 | Native credits event | CE61 → CE63 native105 →354; BindScrollSkip; CE62 reserved |
| F24 | Native credits completion/skip coordination outside Bridge | CE61 → CE63 native105 →354; BindScrollSkip; CE62 reserved |
| F25 | Manual event-authored bust exits | Native portrait exit commands; serialized Game_Screen/Game_Map; CE351 CoreEngineSystemLoadImages; no reconstruction/loading hooks |
| F26 | Native preservation/checkpoint composition; remove Bridge reconstruction | Native portrait exit commands; serialized Game_Screen/Game_Map; CE351 CoreEngineSystemLoadImages; no reconstruction/loading hooks |
| F27 | CoreEngine Load Images for every tavern image; default loading elsewhere; no project wait/polling/global pause | Native portrait exit commands; serialized Game_Screen/Game_Map; CE351 CoreEngineSystemLoadImages; no reconstruction/loading hooks |
| F28 | Preference and animation branches in presentation/events | Dryland_Presentation MotionPreference/BindInterfacePicture/ConsumeInput/ChoiceFocus; CE64/65 MessageVisibility |
| F29 | MessageVisibility and UI events | Dryland_Presentation MotionPreference/BindInterfacePicture/ConsumeInput/ChoiceFocus; CE64/65 MessageVisibility |
| F30 | Retained confirmation behavior in UI layer | Dryland_Presentation MotionPreference/BindInterfacePicture/ConsumeInput/ChoiceFocus; CE64/65 MessageVisibility |
| F31 | Provider/UI keyboard and focus behavior | Dryland_Presentation MotionPreference/BindInterfacePicture/ConsumeInput/ChoiceFocus; CE64/65 MessageVisibility |
| F32 | Bridge checkpoint request/wait | Bridge checkpoint save observer; SaveCore locked/current/max20; native Title CE2; load errors propagate |
| F33 | SaveCore dedicated file selection/current-file autosave | Bridge checkpoint save observer; SaveCore locked/current/max20; native Title CE2; load errors propagate |
| F34 | Native load; remove Bridge revision/envelope/state gates | Bridge checkpoint save observer; SaveCore locked/current/max20; native Title CE2; load errors propagate |
| F35 | Remove manifest requirement and manual revision ritual | Deleted native-layout-manifest.json/native-layout.mjs/revise-layout.mjs/validate-content.mjs; no expeditionQA/notice/parser; CE66 reserved; retired-tests.json |
| F36 | Remove editorial/source/status/format/convention enforcement | Deleted native-layout-manifest.json/native-layout.mjs/revise-layout.mjs/validate-content.mjs; no expeditionQA/notice/parser; CE66 reserved; retired-tests.json |
| F37 | Remove event-command allowlists and helper ownership restrictions | Deleted native-layout-manifest.json/native-layout.mjs/revise-layout.mjs/validate-content.mjs; no expeditionQA/notice/parser; CE66 reserved; retired-tests.json |
| F38 | Remove expeditionQA and fixed-seed console controls | Deleted native-layout-manifest.json/native-layout.mjs/revise-layout.mjs/validate-content.mjs; no expeditionQA/notice/parser; CE66 reserved; retired-tests.json |
| F39 | Remove custom technical notice/global invalid-campaign barrier | Deleted native-layout-manifest.json/native-layout.mjs/revise-layout.mjs/validate-content.mjs; no expeditionQA/notice/parser; CE66 reserved; retired-tests.json |
| F40 | Native audio integration in presentation adapter, outside Bridge | Presentation playMe/stopMe descriptor; LockMovement/DisableEventAcceleration; CE4 native135[0]; provider FAST/AUTO and native105 speed2 |
| F41 | VN movement control in presentation/events | Presentation playMe/stopMe descriptor; LockMovement/DisableEventAcceleration; CE4 native135[0]; provider FAST/AUTO and native105 speed2 |
| F42 | Native menu-access command via initialization event | Presentation playMe/stopMe descriptor; LockMovement/DisableEventAcceleration; CE4 native135[0]; provider FAST/AUTO and native105 speed2 |
| F43 | Provider/event reading acceleration policy outside Bridge; native credit speed | Presentation playMe/stopMe descriptor; LockMovement/DisableEventAcceleration; CE4 native135[0]; provider FAST/AUTO and native105 speed2 |

The removed editorial/ownership/revision rules have no runtime alias or replacement gate. Tests retaining historical metadata use it only as unknown native save fields that must be ignored. Pure campaign validity/history and rejected stale action checks retain mechanical ownership. Native QA archives validate source/origin/identity only before boot; they do not alter runtime load policy.

Historical authored guides/reports keep their original results behind supersession notices. The current README, plugin help and QA drivers use direct Common Event calls, current-file selection and raw read-only observation. Task15 updates the living journey/scenario plan.
