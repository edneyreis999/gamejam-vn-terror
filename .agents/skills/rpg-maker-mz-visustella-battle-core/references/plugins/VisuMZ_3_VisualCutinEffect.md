# VisuMZ_3_VisualCutinEffect

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_3_VisualCutinEffect`
- Contract: [RPG Maker MZ] [Tier 3] [VisualCutinEffect]
- Required plugins: VisuMZ_0_CoreEngine
- Declared load order: after VisuMZ_0_CoreEngine
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| VisualCutinEffect | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| Styles:struct | Cutin Style Settings | — | struct&lt;Styles&gt; | {"WholeStyles":"","whole:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","ShowcaseStyles":"","showcase:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"+48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"-48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","HorzSpanStyles":"","lefthorzspan:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","centerhorzspan:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","righthorzspan:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","HorzSlashStyles":"","lefthorzslash:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"-48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"+48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","righthorzslash:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"-48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"+48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","VertSlashStyles":"","leftvertslash:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+48\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-48\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","rightvertslash:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"-48\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+48\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","MajorStyles":"","leftmajor:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"-96\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-96\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","rightmajor:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+96\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+96\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","MinorStyles":"","leftminor:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"-96\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-96\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","centerminor:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"+96\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"+96\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","rightminor:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+96\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+96\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","DiamondStyles":"","leftdiamond:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"-96\",\"enterY:num\":\"+96\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-96\",\"exitY:num\":\"+96\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","centerdiamond:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"+96\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"+96\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","rightdiamond:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+96\",\"enterY:num\":\"+96\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+96\",\"exitY:num\":\"+96\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","GemstoneStyles":"","leftgemstone:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"-96\",\"enterY:num\":\"+96\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-96\",\"exitY:num\":\"+96\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","centergemstone:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"+96\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"+96\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","rightgemstone:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+96\",\"enterY:num\":\"+96\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+96\",\"exitY:num\":\"+96\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","QuadStyles":"","topleftquad:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"-48\",\"enterY:num\":\"-48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-48\",\"exitY:num\":\"-48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","toprightquad:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+48\",\"enterY:num\":\"-48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+48\",\"exitY:num\":\"-48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","bottomleftquad:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"-48\",\"enterY:num\":\"+48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-48\",\"exitY:num\":\"+48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","bottomrightquad:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+48\",\"enterY:num\":\"+48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+48\",\"exitY:num\":\"+48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","CornerStyles":"","topleftcorner:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"-48\",\"enterY:num\":\"-48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-48\",\"exitY:num\":\"-48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","toprightcorner:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+48\",\"enterY:num\":\"-48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+48\",\"exitY:num\":\"-48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","bottomleftcorner:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"-48\",\"enterY:num\":\"+48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-48\",\"exitY:num\":\"+48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","bottomrightcorner:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+48\",\"enterY:num\":\"+48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+48\",\"exitY:num\":\"+48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","RowThirdStyles":"","row1stthird:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"-36\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"+36\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","row2ndthird:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"-36\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"+36\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","row3rdthird:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"-36\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"+36\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","RowFourthStyles":"","row1stfourth:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"-24\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"+24\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","row2ndfourth:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"-24\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"+24\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","row3rdfourth:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"-24\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"+24\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","row4thfourth:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"-24\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"+24\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","RowFifthStyles":"","row1stfifth:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"-24\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"+24\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","row2ndfifth:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"-24\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"+24\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","row3rdfifth:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"-24\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"+24\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","row4thfifth:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"-24\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"+24\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","row5thfifth:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"-24\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"+24\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","ColThirdStyles":"","col1stthird:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+96\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-96\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","col2ndthird:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+96\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-96\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","col3rdthird:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+96\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-96\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","ColFourthStyles":"","col1stfourth:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+96\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-96\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","col2ndfourth:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+96\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-96\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","col3rdfourth:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+96\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-96\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","col4thfourth:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+96\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-96\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","ColFifthStyles":"","col1stfifth:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+96\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-96\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","col2ndfifth:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+96\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-96\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","col3rdfifth:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+96\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-96\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","col4thfifth:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+96\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-96\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","col5thfifth:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+96\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-96\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","PackSixStyles":"","sixpack1:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"-48\",\"enterY:num\":\"-48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-48\",\"exitY:num\":\"-48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","sixpack2:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"-48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"-48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","sixpack3:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+48\",\"enterY:num\":\"-48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+48\",\"exitY:num\":\"-48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","sixpack4:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"-48\",\"enterY:num\":\"+48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-48\",\"exitY:num\":\"+48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","sixpack5:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+0\",\"enterY:num\":\"+48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+0\",\"exitY:num\":\"+48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","sixpack6:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+48\",\"enterY:num\":\"+48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+48\",\"exitY:num\":\"+48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","PackEightStyles":"","eightpack1:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"-48\",\"enterY:num\":\"-48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-48\",\"exitY:num\":\"-48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","eightpack2:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"-24\",\"enterY:num\":\"-48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-24\",\"exitY:num\":\"-48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","eightpack3:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+24\",\"enterY:num\":\"-48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+24\",\"exitY:num\":\"-48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","eightpack4:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+48\",\"enterY:num\":\"-48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+48\",\"exitY:num\":\"-48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","eightpack5:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"-48\",\"enterY:num\":\"+48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-48\",\"exitY:num\":\"+48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","eightpack6:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"-24\",\"enterY:num\":\"+48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-24\",\"exitY:num\":\"+48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","eightpack7:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+24\",\"enterY:num\":\"+48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+24\",\"exitY:num\":\"+48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","eightpack8:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+48\",\"enterY:num\":\"+48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+48\",\"exitY:num\":\"+48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","PackTwelveStyles":"","twelvepack1:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"-48\",\"enterY:num\":\"-48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-48\",\"exitY:num\":\"-48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","twelvepack2:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"-24\",\"enterY:num\":\"-48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-24\",\"exitY:num\":\"-48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","twelvepack3:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+24\",\"enterY:num\":\"-48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+24\",\"exitY:num\":\"-48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","twelvepack4:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+48\",\"enterY:num\":\"-48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+48\",\"exitY:num\":\"-48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","twelvepack5:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"-48\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-48\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","twelvepack6:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"-48\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-48\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","twelvepack7:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+48\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+48\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","twelvepack8:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+48\",\"enterY:num\":\"+0\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+48\",\"exitY:num\":\"+0\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","twelvepack9:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"-48\",\"enterY:num\":\"+48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-48\",\"exitY:num\":\"+48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","twelvepack10:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"-24\",\"enterY:num\":\"+48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"-24\",\"exitY:num\":\"+48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","twelvepack11:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+24\",\"enterY:num\":\"+48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+24\",\"exitY:num\":\"+48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","twelvepack12:struct":"{\"Cutin\":\"\",\"cutinOffsetX:num\":\"+0\",\"cutinOffsetY:num\":\"+0\",\"Enter\":\"\",\"enterX:num\":\"+48\",\"enterY:num\":\"+48\",\"enterEasingType:str\":\"InOutSine\",\"Exit\":\"\",\"exitX:num\":\"+48\",\"exitY:num\":\"+48\",\"exitEasingType:str\":\"InOutSine\",\"Mask\":\"\",\"maskFilename:str\":\"\",\"Outline\":\"\",\"outlineFilename:str\":\"\",\"outlineOffsetX:num\":\"+0\",\"outlineOffsetY:num\":\"+0\"}","End":""} | — | The settings used for each of the various cutin styles. |
| Outline:struct | Outline Settings | — | struct&lt;Outline&gt; | {"Outer":"","outerOutlineColor:str":"#000000","outerOutlineWeight:num":"4","Middle":"","middleOutlineColor:str":"#ffffff","middleOutlineWeight:num":"8","Inner":"","innerOutlineColor:str":"#000000","innerOutlineWeight:num":"4"} | — | The settings used for plugin-generated outlines. |
| ExtraDefaults:struct | "Extra Settings" Defaults | — | struct&lt;Command&gt; | {"Transition":"","enterDuration:num":"12","exitDuration:num":"12","Cutin":"","bgShow:eval":"true","outlineShow:eval":"true","Portrait":"","PortraitBase":"","portraitAnchorX:num":"0.5","portraitAnchorY:num":"0.5","portraitHue:num":"0","portraitOpacity:num":"255","portraitOffsetX:num":"+0","portraitOffsetY:num":"+0","PortraitEnter":"","portraitEnterX:num":"+0","portraitEnterY:num":"+0","portraitEnterEasingType:str":"InOutSine","PortraitExit":"","portraitExitX:num":"+0","portraitExitY:num":"+0","portraitExitEasingType:str":"InOutSine","PortraitFlip":"","portraitFlipHorz:eval":"false","portraitFlipVert:eval":"false","PortraitScale":"","portraitForcedScale:num":"0.0","portraitScaleToFit:eval":"true","portraitScaleMax:eval":"false","PortraitAni":"","animatedPortraitLooping:eval":"true","animatedPortraitWaitFrames:num":"4","Parallax":"","ParallaxBase":"","parallaxBlendMode:num":"0","parallaxHue:num":"0","parallaxOpacity:num":"255","ParallaxScroll":"","parallaxOffsetX:num":"+0.0","parallaxOffsetY:num":"+0.0","parallaxScrollX:num":"+0.0","parallaxScrollY:num":"+0.0"} | — | Default "Extra Settings" values if the "Extra Settings" Plugin Command parameter is left untouched. |
| CutinLayer:str | Cutin Layer | — | select | below | Top - Above Everything Else=top; Below - Below UI Elements (Default)=below | Where do you want the visual cutins layer placed? |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

### Struct: Styles

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| WholeStyles | ---Whole Style--- | — | — | — | — | — |
| whole:struct | Whole | WholeStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| ShowcaseStyles | ---Showcase Style--- | — | — | — | — | — |
| showcase:struct | Showcase | ShowcaseStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"+48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"-48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| HorzSpanStyles | ---Horizontal Span--- | — | — | — | — | — |
| lefthorzspan:struct | LeftHorzSpan | HorzSpanStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| centerhorzspan:struct | CenterHorzSpan | HorzSpanStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| righthorzspan:struct | RightHorzSpan | HorzSpanStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| HorzSlashStyles | ---Horizontal Slash--- | — | — | — | — | — |
| lefthorzslash:struct | LeftHorzSlash | HorzSlashStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"-48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"+48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| righthorzslash:struct | RightHorzSlash | HorzSlashStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"-48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"+48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| VertSlashStyles | ---Vertical Slash--- | — | — | — | — | — |
| leftvertslash:struct | LeftVertSlash | VertSlashStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+48","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-48","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| rightvertslash:struct | RightVertSlash | VertSlashStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"-48","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+48","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| MajorStyles | ---Major Styles--- | — | — | — | — | — |
| leftmajor:struct | LeftMajor | MajorStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"-96","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-96","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| rightmajor:struct | RightMajor | MajorStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+96","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+96","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| MinorStyles | ---Minor Styles--- | — | — | — | — | — |
| leftminor:struct | LeftMinor | MinorStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"-96","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-96","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| centerminor:struct | CenterMinor | MinorStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"+96","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"+96","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| rightminor:struct | RightMinor | MinorStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+96","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+96","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| DiamondStyles | ---Diamond Styles--- | — | — | — | — | — |
| leftdiamond:struct | LeftDiamond | DiamondStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"-96","enterY:num":"+96","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-96","exitY:num":"+96","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| centerdiamond:struct | CenterDiamond | DiamondStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"+96","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"+96","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| rightdiamond:struct | RightDiamond | DiamondStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+96","enterY:num":"+96","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+96","exitY:num":"+96","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| GemstoneStyles | ---Gemstone Styles--- | — | — | — | — | — |
| leftgemstone:struct | LeftGemstone | GemstoneStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"-96","enterY:num":"+96","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-96","exitY:num":"+96","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| centergemstone:struct | CenterGemstone | GemstoneStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"+96","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"+96","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| rightgemstone:struct | RightGemstone | GemstoneStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+96","enterY:num":"+96","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+96","exitY:num":"+96","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| QuadStyles | ---Quadrant Styles--- | — | — | — | — | — |
| topleftquad:struct | TopLeftQuad | QuadStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"-48","enterY:num":"-48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-48","exitY:num":"-48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.0, 0.0 |
| toprightquad:struct | TopRightQuad | QuadStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+48","enterY:num":"-48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+48","exitY:num":"-48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 1.0, 0.0 |
| bottomleftquad:struct | BottomLeftQuad | QuadStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"-48","enterY:num":"+48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-48","exitY:num":"+48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.0, 1.0 |
| bottomrightquad:struct | BottomRightQuad | QuadStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+48","enterY:num":"+48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+48","exitY:num":"+48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 1.0, 1.0 |
| CornerStyles | ---Corner Styles--- | — | — | — | — | — |
| topleftcorner:struct | TopLeftCorner | CornerStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"-48","enterY:num":"-48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-48","exitY:num":"-48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.0, 0.0 |
| toprightcorner:struct | TopRightCorner | CornerStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+48","enterY:num":"-48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+48","exitY:num":"-48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 1.0, 0.0 |
| bottomleftcorner:struct | BottomLeftCorner | CornerStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"-48","enterY:num":"+48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-48","exitY:num":"+48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.0, 1.0 |
| bottomrightcorner:struct | BottomRightCorner | CornerStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+48","enterY:num":"+48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+48","exitY:num":"+48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 1.0, 1.0 |
| RowThirdStyles | ---Row Thirds--- | — | — | — | — | — |
| row1stthird:struct | Row1stThird | RowThirdStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"-36","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"+36","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| row2ndthird:struct | Row2ndThird | RowThirdStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"-36","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"+36","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| row3rdthird:struct | Row3rdThird | RowThirdStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"-36","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"+36","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| RowFourthStyles | ---Row Fourths--- | — | — | — | — | — |
| row1stfourth:struct | Row1stFourth | RowFourthStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"-24","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"+24","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| row2ndfourth:struct | Row2ndFourth | RowFourthStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"-24","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"+24","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| row3rdfourth:struct | Row3rdFourth | RowFourthStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"-24","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"+24","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| row4thfourth:struct | Row4thFourth | RowFourthStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"-24","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"+24","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| RowFifthStyles | ---Row Fifths--- | — | — | — | — | — |
| row1stfifth:struct | Row1stFifth | RowFifthStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"-24","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"+24","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| row2ndfifth:struct | Row2ndFifth | RowFifthStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"-24","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"+24","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| row3rdfifth:struct | Row3rdFifth | RowFifthStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"-24","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"+24","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| row4thfifth:struct | Row4thFifth | RowFifthStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"-24","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"+24","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| row5thfifth:struct | Row5thFifth | RowFifthStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"-24","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"+24","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| ColThirdStyles | ---Column Thirds--- | — | — | — | — | — |
| col1stthird:struct | Col1stThird | ColThirdStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+96","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-96","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| col2ndthird:struct | Col2ndThird | ColThirdStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+96","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-96","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| col3rdthird:struct | Col3rdThird | ColThirdStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+96","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-96","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| ColFourthStyles | ---Column Fourths--- | — | — | — | — | — |
| col1stfourth:struct | Col1stFourth | ColFourthStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+96","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-96","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| col2ndfourth:struct | Col2ndFourth | ColFourthStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+96","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-96","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| col3rdfourth:struct | Col3rdFourth | ColFourthStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+96","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-96","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| col4thfourth:struct | Col4thFourth | ColFourthStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+96","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-96","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| ColFifthStyles | ---Column Fifths--- | — | — | — | — | — |
| col1stfifth:struct | Col1stFifth | ColFifthStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+96","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-96","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| col2ndfifth:struct | Col2ndFifth | ColFifthStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+96","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-96","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| col3rdfifth:struct | Col3rdFifth | ColFifthStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+96","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-96","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| col4thfifth:struct | Col4thFifth | ColFifthStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+96","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-96","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| col5thfifth:struct | Col5thFifth | ColFifthStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+96","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-96","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| PackSixStyles | ---Six Pack--- | — | — | — | — | — |
| sixpack1:struct | SixPack1 | PackSixStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"-48","enterY:num":"-48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-48","exitY:num":"-48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| sixpack2:struct | SixPack2 | PackSixStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"-48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"-48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| sixpack3:struct | SixPack3 | PackSixStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+48","enterY:num":"-48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+48","exitY:num":"-48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| sixpack4:struct | SixPack4 | PackSixStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"-48","enterY:num":"+48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-48","exitY:num":"+48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| sixpack5:struct | SixPack5 | PackSixStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+0","enterY:num":"+48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+0","exitY:num":"+48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| sixpack6:struct | SixPack6 | PackSixStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+48","enterY:num":"+48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+48","exitY:num":"+48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| PackEightStyles | ---Eight Pack--- | — | — | — | — | — |
| eightpack1:struct | EightPack1 | PackEightStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"-48","enterY:num":"-48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-48","exitY:num":"-48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| eightpack2:struct | EightPack2 | PackEightStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"-24","enterY:num":"-48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-24","exitY:num":"-48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| eightpack3:struct | EightPack3 | PackEightStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+24","enterY:num":"-48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+24","exitY:num":"-48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| eightpack4:struct | EightPack4 | PackEightStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+48","enterY:num":"-48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+48","exitY:num":"-48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| eightpack5:struct | EightPack5 | PackEightStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"-48","enterY:num":"+48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-48","exitY:num":"+48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| eightpack6:struct | EightPack6 | PackEightStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"-24","enterY:num":"+48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-24","exitY:num":"+48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| eightpack7:struct | EightPack7 | PackEightStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+24","enterY:num":"+48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+24","exitY:num":"+48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| eightpack8:struct | EightPack8 | PackEightStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+48","enterY:num":"+48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+48","exitY:num":"+48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| PackTwelveStyles | ---Twelve Pack--- | — | — | — | — | — |
| twelvepack1:struct | TwelvePack1 | PackTwelveStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"-48","enterY:num":"-48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-48","exitY:num":"-48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| twelvepack2:struct | TwelvePack2 | PackTwelveStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"-24","enterY:num":"-48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-24","exitY:num":"-48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| twelvepack3:struct | TwelvePack3 | PackTwelveStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+24","enterY:num":"-48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+24","exitY:num":"-48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| twelvepack4:struct | TwelvePack4 | PackTwelveStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+48","enterY:num":"-48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+48","exitY:num":"-48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| twelvepack5:struct | TwelvePack5 | PackTwelveStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"-48","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-48","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| twelvepack6:struct | TwelvePack6 | PackTwelveStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"-48","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-48","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| twelvepack7:struct | TwelvePack7 | PackTwelveStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+48","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+48","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| twelvepack8:struct | TwelvePack8 | PackTwelveStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+48","enterY:num":"+0","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+48","exitY:num":"+0","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| twelvepack9:struct | TwelvePack9 | PackTwelveStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"-48","enterY:num":"+48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-48","exitY:num":"+48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| twelvepack10:struct | TwelvePack10 | PackTwelveStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"-24","enterY:num":"+48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"-24","exitY:num":"+48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| twelvepack11:struct | TwelvePack11 | PackTwelveStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+24","enterY:num":"+48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+24","exitY:num":"+48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| twelvepack12:struct | TwelvePack12 | PackTwelveStyles | struct&lt;StyleData&gt; | {"Cutin":"","cutinOffsetX:num":"+0","cutinOffsetY:num":"+0","Enter":"","enterX:num":"+48","enterY:num":"+48","enterEasingType:str":"InOutSine","Exit":"","exitX:num":"+48","exitY:num":"+48","exitEasingType:str":"InOutSine","Mask":"","maskFilename:str":"","Outline":"","outlineFilename:str":"","outlineOffsetX:num":"+0","outlineOffsetY:num":"+0"} | — | The settings used for this specific cutin style. Anchor X/Y: 0.5, 0.5 |
| End | -------------------- | — | — | — | — | — |

### Struct: StyleData

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Cutin | — | — | — | — | — | — |
| cutinOffsetX:num | Offset X | Cutin | — | +0 | — | Offsets the cutin overall's X location. Negative: left. Positive: right. |
| cutinOffsetY:num | Offset Y | Cutin | — | +0 | — | Offsets the cutin overall's Y location. Negative: up. Positive: down. |
| Enter | Entrance Movement | — | — | — | — | — |
| enterX:num | Entrance X | Enter | — | +0 | — | Sets the whole cutin's X entrance. Negative: from left. Positive: from right. |
| enterY:num | Entrance Y | Enter | — | +0 | — | Sets the whole cutin's Y entrance. Negative: from up. Positive: from down. |
| enterEasingType:str | Entrance Easing | Enter | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. |
| Exit | Exit Movement | — | — | — | — | — |
| exitX:num | Exit X | Exit | — | +0 | — | Sets the whole cutin's X exit. Negative: left. Positive: right. |
| exitY:num | Exit Y | Exit | — | +0 | — | Sets the whole cutin's Y exit. Negative: up. Positive: down. |
| exitEasingType:str | Exit Easing | Exit | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. |
| Mask | — | — | — | — | — | — |
| maskFilename:str | Filename | Mask | file | — | — | Filename used for a custom cutin mask. Leave empty for plugin-generated mask. |
| Outline | — | — | — | — | — | — |
| outlineFilename:str | Filename | Outline | file | — | — | Filename used for a custom cutin outline. Leave empty for plugin-generated outline. |
| outlineOffsetX:num | Offset X | Outline | — | +0 | — | Offsets the cutin outline's X location. Negative: left. Positive: right. |
| outlineOffsetY:num | Offset Y | Outline | — | +0 | — | Offsets the cutin outline's Y location. Negative: up. Positive: down. |

### Struct: Outline

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Outer | Outer Layer | — | — | — | — | — |
| outerOutlineColor:str | Line Color | Outer | — | #000000 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| outerOutlineWeight:num | Line Width | Outer | number | 4 | — | What is the width of the line? |
| Middle | Middle Layer | — | — | — | — | — |
| middleOutlineColor:str | Line Color | Middle | — | #ffffff | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| middleOutlineWeight:num | Line Width | Middle | number | 8 | — | What is the width of the line? |
| Inner | Inner Layer | — | — | — | — | — |
| innerOutlineColor:str | Line Color | Inner | — | #000000 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| innerOutlineWeight:num | Line Width | Inner | number | 4 | — | What is the width of the line? |

### Struct: Command

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Transition | — | — | — | — | — | — |
| enterDuration:num | Entrance Duration | Transition | number | 12 | — | How many frames does it take to fully enter? Used when a Visual Cutin Effect starts. |
| exitDuration:num | Exit Duration | Transition | number | 12 | — | How many frames does it take to fully exit? Used when a Visual Cutin Effect ends. |
| Cutin | Cutin Settings | — | — | — | — | — |
| bgShow:eval | Show BG Color? | Cutin | boolean | true | — | Add a background color for this cutin? Background colors appear behind the parallax. |
| outlineShow:eval | Show Outline? | Cutin | boolean | true | — | Show the cutin outline? |
| Portrait | Portrait Settings | — | — | — | — | — |
| PortraitBase | Base Properties | Portrait | — | — | — | — |
| portraitAnchorX:num | Anchor X | PortraitBase | — | 0.5 | — | Determines the sprite anchor X alignment. 0.0: Left, 0.5: Center, 1.0: Right. |
| portraitAnchorY:num | Anchor Y | PortraitBase | — | 0.5 | — | Determines the sprite anchor Y alignment. 0.0: Top, 0.5: Middle, 1.0: Bottom. |
| portraitHue:num | Hue | PortraitBase | number | 0 | — | Do you wish to adjust this cutin's portrait hue? |
| portraitOpacity:num | Opacity | PortraitBase | number | 255 | — | What is the opacity level of this cutin's portrait? |
| portraitOffsetX:num | Offset X | PortraitBase | — | +0 | — | Offsets the cutin portrait's X location. Negative: left. Positive: right. |
| portraitOffsetY:num | Offset Y | PortraitBase | — | +0 | — | Offsets the cutin portrait's Y location. Negative: up. Positive: down. |
| PortraitEnter | Entrance Properties | Portrait | — | — | — | — |
| portraitEnterX:num | Entrance X | PortraitEnter | — | +0 | — | Sets the cutin portrait's X entrance. Negative: from left. Positive: from right. |
| portraitEnterY:num | Entrance Y | PortraitEnter | — | +0 | — | Sets the cutin portrait's Y entrance. Negative: from up. Positive: from down. |
| portraitEnterEasingType:str | Entrance Easing | PortraitEnter | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. |
| PortraitExit | Exit Properties | Portrait | — | — | — | — |
| portraitExitX:num | Exit X | PortraitExit | — | +0 | — | Sets the cutin portrait's X exit. Negative: to left. Positive: to right. |
| portraitExitY:num | Exit Y | PortraitExit | — | +0 | — | Sets the cutin portrait's Y exit. Negative: to up. Positive: to down. |
| portraitExitEasingType:str | Exit Easing | PortraitExit | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. |
| PortraitFlip | Flip Properties | Portrait | — | — | — | — |
| portraitFlipHorz:eval | Flip Horizontally? | PortraitFlip | boolean | false | — | Flip the cutin portrait horizontally? |
| portraitFlipVert:eval | Flip Vertically? | PortraitFlip | boolean | false | — | Flip the cutin portrait vertically? |
| PortraitScale | Scaling Properties | Portrait | — | — | — | — |
| portraitForcedScale:num | Forced Scaling | PortraitScale | — | 0.0 | — | Do you want to force a scaling ratio? Leave as 0 for none. Disables "Fit to Scale?". |
| portraitScaleToFit:eval | Fit to Scale? | PortraitScale | boolean | true | — | Scale the cutin portrait to fit the cutin style? Cannot be used with "Forced Scaling". |
| portraitScaleMax:eval | Scale Max? | portraitScaleToFit:eval | boolean | false | — | Scale the cutin portrait to the maximum fit or scale the cutin portrait to the minimum fit. |
| PortraitAni | Animated Portraits | Portrait | — | — | — | — |
| animatedPortraitLooping:eval | Loop? | PortraitAni | boolean | true | — | Will loop back to beginning once ended. Requires VisuMZ_4_AnimatedPictures! |
| animatedPortraitWaitFrames:num | Wait Frames | PortraitAni | number | 4 | — | Frames to wait before moving to next cell. Requires VisuMZ_4_AnimatedPictures! |
| Parallax | Parallax Settings | — | — | — | — | — |
| ParallaxBase | Base Settings | Parallax | — | — | — | — |
| parallaxBlendMode:num | Blend Mode | ParallaxBase | select | 0 | 0 - Normal=0; 1 - Additive=1; 2 - Multiply=2; 3 - Screen=3 | What kind of blend mode do you wish to apply to the cutin? |
| parallaxHue:num | Hue | ParallaxBase | number | 0 | — | Do you wish to adjust this cutin's parallax hue? |
| parallaxOpacity:num | Opacity | ParallaxBase | number | 255 | — | What is the opacity level of this cutin's parallax? |
| ParallaxScroll | Scrolling Settings | Parallax | — | — | — | — |
| parallaxOffsetX:num | Offset X | ParallaxScroll | — | +0.0 | — | Offsets the cutin parallax's X location. Negative: left. Positive: right. |
| parallaxOffsetY:num | Offset Y | ParallaxScroll | — | +0.0 | — | Offsets the cutin parallax's Y location. Negative: up. Positive: down. |
| parallaxScrollX:num | Scroll X | ParallaxScroll | — | +0.0 | — | How many pixels does the parallax scroll horizontally? Negative: Scroll to right. Positive: Scroll to left. |
| parallaxScrollY:num | Scroll Y | ParallaxScroll | — | +0.0 | — | How many pixels does the parallax scroll vertically? Negative: Scroll to down. Positive: Scroll to up. |

### Struct: Portrait

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Portrait | Portrait Settings | — | — | — | — | — |
| PortraitBase | Base Properties | Portrait | — | — | — | — |
| portraitAnchorX:num | Anchor X | PortraitBase | — | 0.5 | — | Determines the sprite anchor X alignment. 0.0: Left, 0.5: Center, 1.0: Right. |
| portraitAnchorY:num | Anchor Y | PortraitBase | — | 0.5 | — | Determines the sprite anchor Y alignment. 0.0: Top, 0.5: Middle, 1.0: Bottom. |
| portraitHue:num | Hue | PortraitBase | number | 0 | — | Do you wish to adjust this cutin's portrait hue? |
| portraitOpacity:num | Opacity | PortraitBase | number | 255 | — | What is the opacity level of this cutin's portrait? |
| portraitOffsetX:num | Offset X | PortraitBase | — | +0 | — | Offsets the cutin portrait's X location. Negative: left. Positive: right. |
| portraitOffsetY:num | Offset Y | PortraitBase | — | +0 | — | Offsets the cutin portrait's Y location. Negative: up. Positive: down. |
| PortraitEnter | Entrance Properties | Portrait | — | — | — | — |
| portraitEnterX:num | Entrance X | PortraitEnter | — | +0 | — | Sets the cutin portrait's X entrance. Negative: from left. Positive: from right. |
| portraitEnterY:num | Entrance Y | PortraitEnter | — | +0 | — | Sets the cutin portrait's Y entrance. Negative: from up. Positive: from down. |
| portraitEnterEasingType:str | Entrance Easing | PortraitEnter | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. |
| PortraitExit | Exit Properties | Portrait | — | — | — | — |
| portraitExitX:num | Exit X | PortraitExit | — | +0 | — | Sets the cutin portrait's X exit. Negative: to left. Positive: to right. |
| portraitExitY:num | Exit Y | PortraitExit | — | +0 | — | Sets the cutin portrait's Y exit. Negative: to up. Positive: to down. |
| portraitExitEasingType:str | Exit Easing | PortraitExit | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. |
| PortraitFlip | Flip Properties | Portrait | — | — | — | — |
| portraitFlipHorz:eval | Flip Horizontally? | PortraitFlip | boolean | false | — | Flip the cutin portrait horizontally? |
| portraitFlipVert:eval | Flip Vertically? | PortraitFlip | boolean | false | — | Flip the cutin portrait vertically? |
| PortraitScale | Scaling Properties | Portrait | — | — | — | — |
| portraitForcedScale:num | Forced Scaling | PortraitScale | — | 0.0 | — | Do you want to force a scaling ratio? Leave as 0 for none. Disables "Fit to Scale?". |
| portraitScaleToFit:eval | Fit to Scale? | PortraitScale | boolean | true | — | Scale the cutin portrait to fit the cutin style? Cannot be used with "Forced Scaling". |
| portraitScaleMax:eval | Scale Max? | portraitScaleToFit:eval | boolean | true | — | Scale the cutin portrait to the maximum fit or scale the cutin portrait to the minimum fit. |
| PortraitAni | Animated Portraits | Portrait | — | — | — | — |
| animatedPortraitLooping:eval | Loop? | PortraitAni | boolean | true | — | Will loop back to beginning once ended. Requires VisuMZ_4_AnimatedPictures! |
| animatedPortraitWaitFrames:num | Wait Frames | PortraitAni | number | 4 | — | Frames to wait before moving to next cell. Requires VisuMZ_4_AnimatedPictures! |

### Struct: Parallax

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Parallax | Parallax Settings | — | — | — | — | — |
| ParallaxBase | Base Settings | Parallax | — | — | — | — |
| parallaxBlendMode:num | Blend Mode | ParallaxBase | select | 0 | 0 - Normal=0; 1 - Additive=1; 2 - Multiply=2; 3 - Screen=3 | What kind of blend mode do you wish to apply to the cutin? |
| parallaxHue:num | Hue | ParallaxBase | number | 0 | — | Do you wish to adjust this cutin's parallax hue? |
| parallaxOpacity:num | Opacity | ParallaxBase | number | 255 | — | What is the opacity level of this cutin's parallax? |
| ParallaxScroll | Scrolling Settings | Parallax | — | — | — | — |
| parallaxOffsetX:num | Offset X | ParallaxScroll | — | +0.0 | — | Offsets the cutin parallax's X location. Negative: left. Positive: right. |
| parallaxOffsetY:num | Offset Y | ParallaxScroll | — | +0.0 | — | Offsets the cutin parallax's Y location. Negative: up. Positive: down. |
| parallaxScrollX:num | Scroll X | ParallaxScroll | — | +0.0 | — | How many pixels does the parallax scroll horizontally? Negative: Scroll to right. Positive: Scroll to left. |
| parallaxScrollY:num | Scroll Y | ParallaxScroll | — | +0.0 | — | How many pixels does the parallax scroll vertically? Negative: Scroll to down. Positive: Scroll to up. |

## Plugin commands

### -

- Command ID: `Separator_Begin`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Cutin Add: Add Visual Cutin Effect

- Command ID: `CutinStart_VisualCutinEffect`
- Description: Adds the Visual Cutin Effect using these desired settings. Only one of each cutin-style type can be present at a time.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Basic | Basic Settings | — | — | — | — |
| type:str | Cutin Style Type | select | CenterHorzSpan | -; Whole; -; Showcase; -; LeftHorzSpan; CenterHorzSpan; RightHorzSpan; -; LeftHorzSlash; RightHorzSlash; -; LeftVertSlash; RightVertSlash; -; LeftMajor; RightMajor; -; LeftMinor; CenterMinor; RightMinor; -; LeftDiamond; CenterDiamond; RightDiamond; -; LeftGemstone; CenterGemstone; RightGemstone; -; TopLeftQuad; TopRightQuad; BottomLeftQuad; BottomRightQuad; -; TopLeftCorner; TopRightCorner; BottomLeftCorner; BottomRightCorner; -; Row1stThird; Row2ndThird; Row3rdThird; -; Row1stFourth; Row2ndFourth; Row3rdFourth; Row4thFourth; -; Row1stFifth; Row2ndFifth; Row3rdFifth; Row4thFifth; Row5thFifth; -; Col1stThird; Col2ndThird; Col3rdThird; -; Col1stFourth; Col2ndFourth; Col3rdFourth; Col4thFourth; -; Col1stFifth; Col2ndFifth; Col3rdFifth; Col4thFifth; Col5thFifth; -; SixPack1; SixPack2; SixPack3; SixPack4; SixPack5; SixPack6; -; EightPack1; EightPack2; EightPack3; EightPack4; EightPack5; EightPack6; EightPack7; EightPack8; -; TwelvePack1; TwelvePack2; TwelvePack3; TwelvePack4; TwelvePack5; TwelvePack6; TwelvePack7; TwelvePack8; TwelvePack9; TwelvePack10; TwelvePack11; TwelvePack12; - | What Visual Cutin Effect style type do you wish to use? Refer to VisuMZ wiki for visuals on styles. |
| portraitFilename:str | Portrait Filename | file | &gt;&gt;&gt;ATTENTION&lt;&lt;&lt; | — | Pick a portrait to use for the Visual Cutin Effect. Pick (None) to not use a portrait. |
| parallaxFilename:str | Parallax Filename | file | &gt;&gt;&gt;ATTENTION&lt;&lt;&lt; | — | Pick a parallax to use for the Visual Cutin Effect. Pick (None) to not use a parallax. |
| bgColor:str | Background Color | — | #888888 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ExtraSettings:struct | Extra Settings | struct&lt;Command&gt; | {} | — | Extra Plugin Command settings pertaining to this Visual Cutin Effect. |
| WaitForEntrance:eval | Wait For Entrance | boolean | false | — | Wait until cutin entrance is finished before performing the next event command? @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_CutinChange`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Cutin Change: Portrait Swap

- Command ID: `CutinChange_PortraitSwap`
- Description: Changes target cutin-type's portrait with a different image.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Basic | Basic Settings | — | — | — | — |
| type:str | Cutin Style Type | select | CenterHorzSpan | -; Whole; -; Showcase; -; LeftHorzSpan; CenterHorzSpan; RightHorzSpan; -; LeftHorzSlash; RightHorzSlash; -; LeftVertSlash; RightVertSlash; -; LeftMajor; RightMajor; -; LeftMinor; CenterMinor; RightMinor; -; LeftDiamond; CenterDiamond; RightDiamond; -; LeftGemstone; CenterGemstone; RightGemstone; -; TopLeftQuad; TopRightQuad; BottomLeftQuad; BottomRightQuad; -; TopLeftCorner; TopRightCorner; BottomLeftCorner; BottomRightCorner; -; Row1stThird; Row2ndThird; Row3rdThird; -; Row1stFourth; Row2ndFourth; Row3rdFourth; Row4thFourth; -; Row1stFifth; Row2ndFifth; Row3rdFifth; Row4thFifth; Row5thFifth; -; Col1stThird; Col2ndThird; Col3rdThird; -; Col1stFourth; Col2ndFourth; Col3rdFourth; Col4thFourth; -; Col1stFifth; Col2ndFifth; Col3rdFifth; Col4thFifth; Col5thFifth; -; SixPack1; SixPack2; SixPack3; SixPack4; SixPack5; SixPack6; -; EightPack1; EightPack2; EightPack3; EightPack4; EightPack5; EightPack6; EightPack7; EightPack8; -; TwelvePack1; TwelvePack2; TwelvePack3; TwelvePack4; TwelvePack5; TwelvePack6; TwelvePack7; TwelvePack8; TwelvePack9; TwelvePack10; TwelvePack11; TwelvePack12; - | What Visual Cutin Effect style type to update? This determines which existing cutin-type to change. |
| portraitFilename:str | Portrait Filename | file | &gt;&gt;&gt;ATTENTION&lt;&lt;&lt; | — | Pick a portrait to swap for the Visual Cutin Effect. Pick (None) to not use a portrait. |
| ExtraSettings:struct | Extra Settings | struct&lt;Portrait&gt; | {} | — | Extra Plugin Command settings pertaining to this Visual Cutin Effect's portrait only. @ -------------------------------------------------------------------------- |

### Cutin Change: Parallax Swap

- Command ID: `CutinChange_ParallaxSwap`
- Description: Changes target cutin-type's parallax with a different image.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Basic | Basic Settings | — | — | — | — |
| type:str | Cutin Style Type | select | CenterHorzSpan | -; Whole; -; Showcase; -; LeftHorzSpan; CenterHorzSpan; RightHorzSpan; -; LeftHorzSlash; RightHorzSlash; -; LeftVertSlash; RightVertSlash; -; LeftMajor; RightMajor; -; LeftMinor; CenterMinor; RightMinor; -; LeftDiamond; CenterDiamond; RightDiamond; -; LeftGemstone; CenterGemstone; RightGemstone; -; TopLeftQuad; TopRightQuad; BottomLeftQuad; BottomRightQuad; -; TopLeftCorner; TopRightCorner; BottomLeftCorner; BottomRightCorner; -; Row1stThird; Row2ndThird; Row3rdThird; -; Row1stFourth; Row2ndFourth; Row3rdFourth; Row4thFourth; -; Row1stFifth; Row2ndFifth; Row3rdFifth; Row4thFifth; Row5thFifth; -; Col1stThird; Col2ndThird; Col3rdThird; -; Col1stFourth; Col2ndFourth; Col3rdFourth; Col4thFourth; -; Col1stFifth; Col2ndFifth; Col3rdFifth; Col4thFifth; Col5thFifth; -; SixPack1; SixPack2; SixPack3; SixPack4; SixPack5; SixPack6; -; EightPack1; EightPack2; EightPack3; EightPack4; EightPack5; EightPack6; EightPack7; EightPack8; -; TwelvePack1; TwelvePack2; TwelvePack3; TwelvePack4; TwelvePack5; TwelvePack6; TwelvePack7; TwelvePack8; TwelvePack9; TwelvePack10; TwelvePack11; TwelvePack12; - | What Visual Cutin Effect style type to update? This determines which existing cutin-type to change. |
| parallaxFilename:str | Parallax Filename | file | &gt;&gt;&gt;ATTENTION&lt;&lt;&lt; | — | Pick a parallax to swap for the Visual Cutin Effect. Pick (None) to not use a parallax. |
| ExtraSettings:struct | Extra Settings | struct&lt;Parallax&gt; | {} | — | Extra Plugin Command settings pertaining to this Visual Cutin Effect's parallax only. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_CutinEnd`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Cutin End: End Visual Cutin Effect (All)

- Command ID: `CutinEnd_VisualCutinEffectAll`
- Description: Ends all Visual Cutin Effects currently present.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| WaitForExit:eval | Wait For Exit | boolean | false | — | Wait until cutin exit is finished before performing the next event command? @ -------------------------------------------------------------------------- |

### Cutin End: End Visual Cutin Effect (Type)

- Command ID: `CutinEnd_VisualCutinEffectType`
- Description: Ends the Visual Cutin Effect with the matching type.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| type:str | Cutin Style Type | select | CenterHorzSpan | -; Whole; -; Showcase; -; LeftHorzSpan; CenterHorzSpan; RightHorzSpan; -; LeftHorzSlash; RightHorzSlash; -; LeftVertSlash; RightVertSlash; -; LeftMajor; RightMajor; -; LeftMinor; CenterMinor; RightMinor; -; LeftDiamond; CenterDiamond; RightDiamond; -; LeftGemstone; CenterGemstone; RightGemstone; -; TopLeftQuad; TopRightQuad; BottomLeftQuad; BottomRightQuad; -; TopLeftCorner; TopRightCorner; BottomLeftCorner; BottomRightCorner; -; Row1stThird; Row2ndThird; Row3rdThird; -; Row1stFourth; Row2ndFourth; Row3rdFourth; Row4thFourth; -; Row1stFifth; Row2ndFifth; Row3rdFifth; Row4thFifth; Row5thFifth; -; Col1stThird; Col2ndThird; Col3rdThird; -; Col1stFourth; Col2ndFourth; Col3rdFourth; Col4thFourth; -; Col1stFifth; Col2ndFifth; Col3rdFifth; Col4thFifth; Col5thFifth; -; SixPack1; SixPack2; SixPack3; SixPack4; SixPack5; SixPack6; -; EightPack1; EightPack2; EightPack3; EightPack4; EightPack5; EightPack6; EightPack7; EightPack8; -; TwelvePack1; TwelvePack2; TwelvePack3; TwelvePack4; TwelvePack5; TwelvePack6; TwelvePack7; TwelvePack8; TwelvePack9; TwelvePack10; TwelvePack11; TwelvePack12; - | What Visual Cutin Effect style type do you wish to end? |
| WaitForExit:eval | Wait For Exit | boolean | false | — | Wait until cutin exit is finished before performing the next event command? @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_Wait`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Cutin Wait: Wait for Entrance

- Command ID: `CutinWait_WaitForEntrance`
- Description: Wait until all cutin entrances are finished before performing the next event command. @ --------------------------------------------------------------------------

No arguments are declared.

### Cutin Wait: Wait for Exit

- Command ID: `CutinWait_WaitForExit`
- Description: Wait until all cutin exits are finished before performing the next event command. @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `Separator_End`
- Description: - @ -------------------------------------------------------------------------- @ ========================================================================== @ Plugin Parameters @ ==========================================================================

No arguments are declared.

## Public behavior, notetags, text codes, and script surface

```text
Introduction

A good Visual Cutin Effect can add more impact to a scene, allude to a
different character focus, or add hype to an action sequence in battle.
This plugin allows you to create Visual Cutin Effects of your choosing, with
a plethora of types to pick from. Their different visual appearances each
fit a variety of situations for your game.

Features include all (but not limited to) the following:

* Pick from 20 different cutin styles of all shapes and sizes that have
variations of their own for more than 60+ total cutin choices.
* Select a background color to use, a parallax to go with it, and a portrait
to represent a character in specific.
* Create custom masks and outlines to determine how cutins will be shaped.
* Various options allow for more versatility when creating a cutin effect.
* Animate the cutins via their styles, entrance and exit coordinates, as
well as how the portraits and parallaxes animate.
* Cutins are controlled completely by their Plugin Commands from when they
start to their properties to changing the portraits and parallaxes midway
to the moment they end.
* Additional features with the Battle Core where Action Sequences can create
a Visual Cutin Effect using Battle Portraits for both actors and enemies.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Required Plugin List ------

* VisuMZ_0_CoreEngine

This plugin requires the above listed plugins to be installed inside your
game's Plugin Manager list in order to work. You cannot start your game with
this plugin enabled without the listed plugins.

------ Tier 3 ------

This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

Understanding Visual Cutin Effects

This section will explain various properties of this plugin.

---

Visual Cutin Effect Layer

For the purpose of making cutins visible enough, they will appear over all
spriteset objects (ie tilesets, events, battlebacks, battlers, pictures,
battle animations) but will appear under the majority of windows.

---

One of Each Type

Although you can bring out cutins at practically any time during the map (or
battle as long as you have the VisuMZ Battle Core), you can only bring out
one cutin of each type. For example, only one "LeftMajor" cutin-type can be
used at a time and the existing "LeftMajor" cutin must be ended before using
another "LeftMajor" cutin.

The type-restriction does NOT apply to its variations. For example, you can
use "LeftMajor" with "RightMajor" simultaneously without any problems.
Likewise, you can use "TwelvePack1" with "TwelvePack2" and "TwelvePack3".

What the "One of Each Type" rule means is that you cannot use multiple
"LeftMajor" cutins together. Not that it'd make much sense either since they
would just overlap each other.

---

Order They Start

Cutins are layered in the order they are started with the most recent cutin
at the top and the oldest cutin at the back. This means if you have two
cutins "LeftHorzSlash" and "RightVertSlash", they will overlap each other
based on who has more recently started, with the more recent one on top.

---

Visual Cutin Masking

Visual Cutin Effects will utilize Pixi JS's masking functions to keep their
contents contained within specific boundaries. All the Visual Cutin Effect's
individual parts (ie the portrait, parallax, outline, and background color)
are all affected by the mask and will not appear outside of it.

---

Plugin-Generated Masks and Outlines

If you do not provide custom files for masks and outlines (don't worry, it's
not required), then the plugin will automatically generate them for you.
Each of the 20 different styles and their many variations will have a
generated mask and outline that can be used without the need of custom image
files, especially for those unfamiliar with how Pixi JS masking works.

---

There is NO One-Size-Fits-All

The plugin-generated masks and outlines are of many different shapes and
sizes. And as images used as portraits and parallaxes can be of many varying
shapes and sizes as well, there's not going to be a perfect setting for
everything. Different cutin-types need to be experimented with different
settings in order to find out what works best.

---

Extra Features

There are some extra features found if other VisuStella MZ plugins are found
present in the Plugin Manager list.

---

VisuMZ_1_BattleCore

In order to use Visual Cutin Effects in battle, the VisuMZ Battle Core must
be used in order to properly utilize them. You will also be able to utilize
specific battle portrait-related Action Sequence Plugin Commands found in
the Battle Core, too.

There will be some Battle Core specific notetags that can be used from this
plugin as well.

---

VisuMZ_4_AnimatedPictures

Animated Pictures can also be used as a portrait for a Visual Cutin Effect.
The looping and delay information is set up via the Plugin Command settings.

---

Notetags

The following are notetags that have been added through this plugin. These
notetags will not work with your game if this plugin is OFF or not present.

---

=== Enemy-Related Notetags ===

---

<Cutin Portrait: filename>

- Used for: Enemy Notetags
- Gives the enemy a portrait to use when using Visual Cutin Effects.
- Replace 'filename' with a picture found within your game project's
img/pictures/ folder. Filenames are case sensitive. Leave out the filename
extension from the notetag.

---

<Cutin Flip Horz>
<Cutin Flip Horzontal>
<Cutin Flip Horzontally>

- Used for: Enemy Notetags
- Flips the enemy's portrait horizontally.
- There are no differences between the variations in notetags. The one you
use is entirely up to your own personal preferences.

---

<Cutin Flip Vert>
<Cutin Flip Vertical>
<Cutin Flip Vertically>

- Used for: Enemy Notetags
- Flips the enemy's portrait vertically.
- There are no differences between the variations in notetags. The one you
use is entirely up to your own personal preferences.

---

Plugin Commands

The following are Plugin Commands that come with this plugin. They can be
accessed through the Plugin Command event command.

---

=== Cutin Add - Plugin Commands ===

---

Cutin Add: Add Visual Cutin Effect
- Adds the Visual Cutin Effect using these desired settings.
- Only one of each cutin-style type can be present at a time.

Basic Settings:

Cutin Style Type:
- What Visual Cutin Effect style type do you wish to use?
- Refer to VisuMZ wiki for visuals on styles.

Portrait Filename:
- Pick a portrait to use for the Visual Cutin Effect.
- Pick (None) to not use a portrait.

Parallax Filename:
- Pick a parallax to use for the Visual Cutin Effect.
- Pick (None) to not use a parallax.

Background Color:
- Use #rrggbb for custom colors or regular numbers for text colors
from the Window Skin.

Extra Settings:
- Extra Plugin Command settings pertaining to this Visual Cutin Effect.
- These settings will be displayed in a later section.

Wait for Entrance:
- Wait until cutin entrance is finished before performing the next
event command?

---

=== Cutin Change - Plugin Commands ===

---

Cutin Change: Portrait Swap
- Changes target cutin-type's portrait with a different image.

Basic Settings:

Cutin Style Type:
- What Visual Cutin Effect style type to update?
- This determines which existing cutin-type to change.

Portrait Filename:
- Pick a portrait to swap for the Visual Cutin Effect.
- Pick (None) to not use a portrait.

Extra Settings:
- Extra Plugin Command settings pertaining to this Visual Cutin Effect's
portrait only.
- These settings will be displayed in a later section.
- This Plugin Command will only have the Portrait-related settings.

---

Cutin Change: Parallax Swap
- Changes target cutin-type's parallax with a different image.

Basic Settings:

Cutin Style Type:
- What Visual Cutin Effect style type to update?
- This determines which existing cutin-type to change.

Parallax Filename:
- Pick a parallax to swap for the Visual Cutin Effect.
- Pick (None) to not use a parallax.

Extra Settings:
- Extra Plugin Command settings pertaining to this Visual Cutin Effect's
parallax only.
- These settings will be displayed in a later section.
- This Plugin Command will only have the Parallax-related settings.

---

=== Cutin End - Plugin Commands ===

---

Cutin End: End Visual Cutin Effect (All)
- Ends all Visual Cutin Effects currently present.

Wait for Exit:
- Wait until cutin exit is finished before performing the next
event command?

---

Cutin End: End Visual Cutin Effect (Type)
- Ends the Visual Cutin Effect with the matching type.

Cutin Style Type:
- What Visual Cutin Effect style type do you wish to end?

Wait for Exit:
- Wait until cutin exit is finished before performing the next
event command?

---

=== Cutin Wait - Plugin Commands ===

---

Cutin Wait: Wait for Entrance
- Wait until all cutin entrances are finished before performing the next
event command.

---

Cutin Wait: Wait for Exit
- Wait until all cutin exits are finished before performing the next
event command.

---

=== Extra Settings ===

---

These are the settings found in the "Extra Settings" for various cutin
Plugin Commands.

---

Transition

Entrance Duration:
- How many frames does it take to fully enter?
- Used when a Visual Cutin Effect starts.

Exit Duration:
- How many frames does it take to fully exit?
- Used when a Visual Cutin Effect ends.

---

Cutin Settings

Show BG Color?:
- Add a background color for this cutin?
- Background colors appear behind the parallax.

Show Outline?:
- Show the cutin outline?

---

Portrait Settings > Base Properties

Anchor X:
- Determines the sprite anchor X alignment.
- 0.0: Left, 0.5: Center, 1.0: Right.

Anchor Y:
- Determines the sprite anchor Y alignment.
- 0.0: Top, 0.5: Middle, 1.0: Bottom.

Hue:
- Do you wish to adjust this cutin's portrait hue?

Opacity:
- What is the opacity level of this cutin's portrait?

Offset X:
- Offsets the cutin portrait's X location.
- Negative: left. Positive: right.

Offset Y:
- Offsets the cutin portrait's Y location.
- Negative: up. Positive: down.

---

Portrait Settings > Entrance Properties

Entrance X:
- Sets the cutin portrait's X entrance.
- Negative: from left. Positive: from right.

Entrance Y:
- Sets the cutin portrait's Y entrance.
- Negative: from up. Positive: from down.

Entrance Easing:
- Select which easing type you wish to apply.

---

Portrait Settings > Exit Properties

Exit X:
- Sets the cutin portrait's X exit.
- Negative: to left. Positive: to right.

Exit Y:
- Sets the cutin portrait's Y exit.
- Negative: to up. Positive: to down.

Exit Easing:
- Select which easing type you wish to apply.

---

Portrait Settings > Flip Properties

Flip Horizontally?:
- Flip the cutin portrait horizontally?

Flip Vertically?:
- Flip the cutin portrait vertically?

---

Portrait Settings > Scaling Properties

Forced Scaling:
- Do you want to force a scaling ratio?
- Leave as 0 for none.
- Disables "Fit to Scale?".
- There is NO one size fits all setting for this. Different cutin sizes
will look better with different settings for this parameter.

Fit to Scale?:
- Scale the cutin portrait to fit the cutin style?
- Cannot be used with "Forced Scaling".
- There is NO one size fits all setting for this. Different cutin sizes
will look better with different settings for this parameter.

Scale Max?:
- Scale the cutin portrait to the maximum fit or scale the cutin
portrait to the minimum fit.
- There is NO one size fits all setting for this. Different cutin sizes
will look better with different settings for this parameter.

---

Portrait Settings > Animated Portraits

Loop?:
- Will loop back to beginning once ended.
- Requires VisuMZ_4_AnimatedPictures!

Wait Frames:
- Frames to wait before moving to next cell.
- Requires VisuMZ_4_AnimatedPictures!

---

Parallax Settings > Base Settings

Blend Mode:
- What kind of blend mode do you wish to apply to the cutin?

Hue:
- Do you wish to adjust this cutin's parallax hue?

Opacity:
- What is the opacity level of this cutin's parallax?

---

Parallax Settings > Scrolling Settings

Offset X:
- Offsets the cutin parallax's X location.
- Negative: left. Positive: right.

Offset Y:
- Offsets the cutin parallax's Y location.
- Negative: up. Positive: down.

Scroll X:
- How many pixels does the parallax scroll horizontally?
- Negative: Scroll to right. Positive: Scroll to left.

Scroll Y:
- How many pixels does the parallax scroll vertically?
- Negative: Scroll to down. Positive: Scroll to up.

---

Plugin Parameters: Cutin Style Settings

The settings used for each of the various cutin styles. These adjust the
ways cutins appear in-game.

---

Insert Style Name

Insert Style Variations:
- The settings used for this specific cutin style.
- Each of them will contain the following sub-settings.

---

Cutin

Offset X:
- Offsets the cutin overall's X location.
- Negative: left. Positive: right.

Offset Y:
- Offsets the cutin overall's Y location.
- Negative: up. Positive: down.

---

Entrance Movement

Entrance X:
- Sets the whole cutin's X entrance.
- Negative: from left. Positive: from right.

Entrance Y:
- Sets the whole cutin's Y entrance.
- Negative: from up. Positive: from down.

Entrance Easing:
- Select which easing type you wish to apply.

---

Exit Movement

Exit X:
- Sets the whole cutin's X entrance.
- Negative: to left. Positive: to right.

Exit Y:
- Sets the whole cutin's Y entrance.
- Negative: to up. Positive: to down.

Exit Easing:
- Select which easing type you wish to apply.

---

Mask

Filename:
- Filename used for a custom cutin mask.
- Leave empty for plugin-generated mask.

---

Outline

Filename:
- Filename used for a custom cutin outline.
- Leave empty for plugin-generated outline.

Offset X:
- Offsets the cutin outline's X location.
- Negative: left. Positive: right.

Offset Y:
- Offsets the cutin outline's Y location.
- Negative: up. Positive: down.

---

Plugin Parameters: Outline Settings

The settings used for plugin-generated outlines.

---

Outer Layer

Line Color:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

Line Width:
- What is the width of the line?

---

Middle Layer

Line Color:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

Line Width:
- What is the width of the line?

---

Inner Layer

Line Color:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

Line Width:
- What is the width of the line?

---

Plugin Parameters: "Extra Settings" Defaults

Default "Extra Settings" values if the "Extra Settings" Plugin Command
parameter is left untouched. In other words, if you just want the various
Plugin Commands to use a global set of settings, leave it empty and it will
draw from these instead.

For those wondering, yes, these are replica plugin parameters of the
"Extra Settings" found for the Plugin Commands.

With all that said, keep in mind that there is no one-size-fits all set of
"Extra Settings" that you can set as the default. The plugin-generated masks
and outlines are of many different shapes and sizes. And as images used as
portraits and parallaxes can be of many varying shapes and sizes as well,
there's not going to be a perfect setting for everything. Different
cutin-types need to be experimented with different settings in order to find
out what works best.

---

Transition

Entrance Duration:
- How many frames does it take to fully enter?
- Used when a Visual Cutin Effect starts.

Exit Duration:
- How many frames does it take to fully exit?
- Used when a Visual Cutin Effect ends.

---

Cutin Settings

Show BG Color?:
- Add a background color for this cutin?
- Background colors appear behind the parallax.

Show Outline?:
- Show the cutin outline?

---

Portrait Settings > Base Properties

Anchor X:
- Determines the sprite anchor X alignment.
- 0.0: Left, 0.5: Center, 1.0: Right.

Anchor Y:
- Determines the sprite anchor Y alignment.
- 0.0: Top, 0.5: Middle, 1.0: Bottom.

Hue:
- Do you wish to adjust this cutin's portrait hue?

Opacity:
- What is the opacity level of this cutin's portrait?

Offset X:
- Offsets the cutin portrait's X location.
- Negative: left. Positive: right.

Offset Y:
- Offsets the cutin portrait's Y location.
- Negative: up. Positive: down.

---

Portrait Settings > Entrance Properties

Entrance X:
- Sets the cutin portrait's X entrance.
- Negative: from left. Positive: from right.

Entrance Y:
- Sets the cutin portrait's Y entrance.
- Negative: from up. Positive: from down.

Entrance Easing:
- Select which easing type you wish to apply.

---

Portrait Settings > Exit Properties

Exit X:
- Sets the cutin portrait's X exit.
- Negative: to left. Positive: to right.

Exit Y:
- Sets the cutin portrait's Y exit.
- Negative: to up. Positive: to down.

Exit Easing:
- Select which easing type you wish to apply.

---

Portrait Settings > Flip Properties

Flip Horizontally?:
- Flip the cutin portrait horizontally?

Flip Vertically?:
- Flip the cutin portrait vertically?

---

Portrait Settings > Scaling Properties

Forced Scaling:
- Do you want to force a scaling ratio?
- Leave as 0 for none.
- Disables "Fit to Scale?".
- There is NO one size fits all setting for this. Different cutin sizes
will look better with different settings for this parameter.

Fit to Scale?:
- Scale the cutin portrait to fit the cutin style?
- Cannot be used with "Forced Scaling".
- There is NO one size fits all setting for this. Different cutin sizes
will look better with different settings for this parameter.

Scale Max?:
- Scale the cutin portrait to the maximum fit or scale the cutin
portrait to the minimum fit.
- There is NO one size fits all setting for this. Different cutin sizes
will look better with different settings for this parameter.

---

Portrait Settings > Animated Portraits

Loop?:
- Will loop back to beginning once ended.
- Requires VisuMZ_4_AnimatedPictures!

Wait Frames:
- Frames to wait before moving to next cell.
- Requires VisuMZ_4_AnimatedPictures!

---

Parallax Settings > Base Settings

Blend Mode:
- What kind of blend mode do you wish to apply to the cutin?

Hue:
- Do you wish to adjust this cutin's parallax hue?

Opacity:
- What is the opacity level of this cutin's parallax?

---

Parallax Settings > Scrolling Settings

Offset X:
- Offsets the cutin parallax's X location.
- Negative: left. Positive: right.

Offset Y:
- Offsets the cutin parallax's Y location.
- Negative: up. Positive: down.

Scroll X:
- How many pixels does the parallax scroll horizontally?
- Negative: Scroll to right. Positive: Scroll to left.

Scroll Y:
- How many pixels does the parallax scroll vertically?
- Negative: Scroll to down. Positive: Scroll to up.

---

Plugin Parameters: Cutin Layer Settings

These settings determine where the visual cutin layer is placed.

---

Settings

Cutin Layer:
- Where do you want the visual cutins layer placed?
- Top - Above Everything Else
- Below - Below UI Elements (Default)

---
```
