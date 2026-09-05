# VisuMZ_1_EventsMoveCore

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_1_EventsMoveCore`
- Contract: [RPG Maker MZ] [Tier 1] [EventsMoveCore]
- Required plugins: None declared
- Declared load order: after VisuMZ_0_CoreEngine
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| EventsMoveCore | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| Label:struct | Event Label Settings | — | struct&lt;Label&gt; | {"FontSize:num":"22","IconSize:num":"26","LineHeight:num":"30","OffsetX:num":"0","OffsetY:num":"12","OpacitySpeed:num":"16","VisibleRange:num":"30"} | — | Choose settings regarding the Event Labels. |
| Icon:struct | Event Icon Settings | — | struct&lt;Icon&gt; | {"BufferX:num":"0","BufferY:num":"12","BlendMode:num":"0"} | — | Choose settings regarding the Event Icons. |
| Template:struct | Event Template Settings | — | struct&lt;Template&gt; | {"Settings":"","PreloadMaps:arraynum":"\[\"1\"\]","Prefabs":"","List:arraystruct":"\[\]","JavaScript":"","PreCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments\[1\];\\nconst eventId = arguments\[2\];\\nconst target = arguments\[3\];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostCopyJS:func":"\"// Declare Constants\\nconst mapId = arguments\[1\];\\nconst eventId = arguments\[2\];\\nconst target = arguments\[3\];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments\[1\];\\nconst eventId = arguments\[2\];\\nconst target = arguments\[3\];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostMorphJS:func":"\"// Declare Constants\\nconst mapId = arguments\[1\];\\nconst eventId = arguments\[2\];\\nconst target = arguments\[3\];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PreSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments\[1\];\\nconst eventId = arguments\[2\];\\nconst target = arguments\[3\];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\"","PostSpawnJS:func":"\"// Declare Constants\\nconst mapId = arguments\[1\];\\nconst eventId = arguments\[2\];\\nconst target = arguments\[3\];\\nconst player = $gamePlayer;\\n\\n// Perform Actions\\n\""} | — | Choose settings regarding Event Templates. |
| EventBreak | -------------------------- | — | — | ---------------------------------- | — | — |
| Movement:struct | Movement Settings | — | struct&lt;Movement&gt; | {"Dir8":"","EnableDir8:eval":"true","StrictCollision:eval":"true","FavorHorz:eval":"true","SlowerSpeed:eval":"false","DiagonalSpeedMultiplier:num":"0.85","AutoMove":"","StopAutoMoveEvents:eval":"true","StopAutoMoveMessages:eval":"true","Bitmap":"","BitmapSmoothing:eval":"false","Dash":"","DashModifier:num":"+1.0","EnableDashTilt:eval":"true","TiltLeft:num":"-0.15","TiltRight:num":"0.15","TiltVert:num":"0.05","EventMove":"","RandomMoveWeight:num":"0.10","Shadows":"","ShowShadows:eval":"true","DefaultShadow:str":"Shadow1","TurnInPlace":"","EnableTurnInPlace:eval":"false","TurnInPlaceDelay:num":"10","Vehicle":"","BoatSpeed:num":"4.0","ShipSpeed:num":"5.0","AirshipSpeed:num":"6.0"} | — | Change the rules regarding movement in the game. |
| VS8:struct | VisuStella 8-Dir Settings | — | struct&lt;VS8&gt; | {"Balloons":"","AutoBalloon:eval":"true","BalloonOffsetX:num":"0","BalloonOffsetY:num":"12","Icons":"","AutoBuffer:eval":"true","CarryPose:eval":"true"} | — | Choose settings regarding VisuStella 8-Directional Sprites. |
| MovementBreak | -------------------------- | — | — | ---------------------------------- | — | — |
| Region:struct | Region Rulings | — | struct&lt;Region&gt; | {"Allow":"","AllAllow:arraynum":"\[\]","WalkAllow:arraynum":"\[\]","PlayerAllow:arraynum":"\[\]","EventAllow:arraynum":"\[\]","VehicleAllow:arraynum":"\[\]","BoatAllow:arraynum":"\[\]","ShipAllow:arraynum":"\[\]","AirshipAllow:arraynum":"\[\]","Forbid":"","AllForbid:arraynum":"\[\]","WalkForbid:arraynum":"\[\]","PlayerForbid:arraynum":"\[\]","EventForbid:arraynum":"\[\]","VehicleForbid:arraynum":"\[\]","BoatForbid:arraynum":"\[\]","ShipForbid:arraynum":"\[\]","AirshipForbid:arraynum":"\[\]","Dock":"","VehicleDock:arraynum":"\[\]","BoatDock:arraynum":"\[\]","BoatDockRegionOnly:eval":"false","ShipDock:arraynum":"\[\]","ShipDockRegionOnly:eval":"false","AirshipDock:arraynum":"\[\]","AirshipDockRegionOnly:eval":"false"} | — | Choose settings regarding regions. |
| RegionOk:struct | Common Event on OK Button | Region:struct | struct&lt;RegionCommonEvent&gt; | {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"} | — | Set Common Events that activate upon pressing the OK button while standing on top of designated regions. |
| RegionOkTarget:str | Target Tile | RegionOk:struct | select | front | Tile in front of player.=front; Tile player is standing on top of.=standing | Which tile should be checked for Common Event on OK Button? |
| RegionTouch:struct | Common Event on Touch | Region:struct | struct&lt;RegionCommonEvent&gt; | {"Region1:num":"0","Region2:num":"0","Region3:num":"0","Region4:num":"0","Region5:num":"0","Region6:num":"0","Region7:num":"0","Region8:num":"0","Region9:num":"0","Region10:num":"0","Region11:num":"0","Region12:num":"0","Region13:num":"0","Region14:num":"0","Region15:num":"0","Region16:num":"0","Region17:num":"0","Region18:num":"0","Region19:num":"0","Region20:num":"0","Region21:num":"0","Region22:num":"0","Region23:num":"0","Region24:num":"0","Region25:num":"0","Region26:num":"0","Region27:num":"0","Region28:num":"0","Region29:num":"0","Region30:num":"0","Region31:num":"0","Region32:num":"0","Region33:num":"0","Region34:num":"0","Region35:num":"0","Region36:num":"0","Region37:num":"0","Region38:num":"0","Region39:num":"0","Region40:num":"0","Region41:num":"0","Region42:num":"0","Region43:num":"0","Region44:num":"0","Region45:num":"0","Region46:num":"0","Region47:num":"0","Region48:num":"0","Region49:num":"0","Region50:num":"0","Region51:num":"0","Region52:num":"0","Region53:num":"0","Region54:num":"0","Region55:num":"0","Region56:num":"0","Region57:num":"0","Region58:num":"0","Region59:num":"0","Region60:num":"0","Region61:num":"0","Region62:num":"0","Region63:num":"0","Region64:num":"0","Region65:num":"0","Region66:num":"0","Region67:num":"0","Region68:num":"0","Region69:num":"0","Region70:num":"0","Region71:num":"0","Region72:num":"0","Region73:num":"0","Region74:num":"0","Region75:num":"0","Region76:num":"0","Region77:num":"0","Region78:num":"0","Region79:num":"0","Region80:num":"0","Region81:num":"0","Region82:num":"0","Region83:num":"0","Region84:num":"0","Region85:num":"0","Region86:num":"0","Region87:num":"0","Region88:num":"0","Region89:num":"0","Region90:num":"0","Region91:num":"0","Region92:num":"0","Region93:num":"0","Region94:num":"0","Region95:num":"0","Region96:num":"0","Region97:num":"0","Region98:num":"0","Region99:num":"0","Region100:num":"0","Region101:num":"0","Region102:num":"0","Region103:num":"0","Region104:num":"0","Region105:num":"0","Region106:num":"0","Region107:num":"0","Region108:num":"0","Region109:num":"0","Region110:num":"0","Region111:num":"0","Region112:num":"0","Region113:num":"0","Region114:num":"0","Region115:num":"0","Region116:num":"0","Region117:num":"0","Region118:num":"0","Region119:num":"0","Region120:num":"0","Region121:num":"0","Region122:num":"0","Region123:num":"0","Region124:num":"0","Region125:num":"0","Region126:num":"0","Region127:num":"0","Region128:num":"0","Region129:num":"0","Region130:num":"0","Region131:num":"0","Region132:num":"0","Region133:num":"0","Region134:num":"0","Region135:num":"0","Region136:num":"0","Region137:num":"0","Region138:num":"0","Region139:num":"0","Region140:num":"0","Region141:num":"0","Region142:num":"0","Region143:num":"0","Region144:num":"0","Region145:num":"0","Region146:num":"0","Region147:num":"0","Region148:num":"0","Region149:num":"0","Region150:num":"0","Region151:num":"0","Region152:num":"0","Region153:num":"0","Region154:num":"0","Region155:num":"0","Region156:num":"0","Region157:num":"0","Region158:num":"0","Region159:num":"0","Region160:num":"0","Region161:num":"0","Region162:num":"0","Region163:num":"0","Region164:num":"0","Region165:num":"0","Region166:num":"0","Region167:num":"0","Region168:num":"0","Region169:num":"0","Region170:num":"0","Region171:num":"0","Region172:num":"0","Region173:num":"0","Region174:num":"0","Region175:num":"0","Region176:num":"0","Region177:num":"0","Region178:num":"0","Region179:num":"0","Region180:num":"0","Region181:num":"0","Region182:num":"0","Region183:num":"0","Region184:num":"0","Region185:num":"0","Region186:num":"0","Region187:num":"0","Region188:num":"0","Region189:num":"0","Region190:num":"0","Region191:num":"0","Region192:num":"0","Region193:num":"0","Region194:num":"0","Region195:num":"0","Region196:num":"0","Region197:num":"0","Region198:num":"0","Region199:num":"0","Region200:num":"0","Region201:num":"0","Region202:num":"0","Region203:num":"0","Region204:num":"0","Region205:num":"0","Region206:num":"0","Region207:num":"0","Region208:num":"0","Region209:num":"0","Region210:num":"0","Region211:num":"0","Region212:num":"0","Region213:num":"0","Region214:num":"0","Region215:num":"0","Region216:num":"0","Region217:num":"0","Region218:num":"0","Region219:num":"0","Region220:num":"0","Region221:num":"0","Region222:num":"0","Region223:num":"0","Region224:num":"0","Region225:num":"0","Region226:num":"0","Region227:num":"0","Region228:num":"0","Region229:num":"0","Region230:num":"0","Region231:num":"0","Region232:num":"0","Region233:num":"0","Region234:num":"0","Region235:num":"0","Region236:num":"0","Region237:num":"0","Region238:num":"0","Region239:num":"0","Region240:num":"0","Region241:num":"0","Region242:num":"0","Region243:num":"0","Region244:num":"0","Region245:num":"0","Region246:num":"0","Region247:num":"0","Region248:num":"0","Region249:num":"0","Region250:num":"0","Region251:num":"0","Region252:num":"0","Region253:num":"0","Region254:num":"0","Region255:num":"0"} | — | Set Common Events that activate upon stepping the tiles marked by the designated regions. |
| TerrainTag:struct | Terrain Tag Settings | — | struct&lt;TerrainTag&gt; | {"TerrainTag":"","Rope:num":"1"} | — | Choose settings regarding terrain tags. |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

### Struct: Label

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| SpriteBased:eval | Sprite Based? | — | boolean | true | — | Use sprite-based labels instead of legacy-window version. Legacy-window version will not be supported in future. |
| MobileEnabled:eval | Mobile-Enabled? | — | boolean | true | — | Enable event labels for mobile devices? |
| FontSize:num | Font Size | — | number | 22 | — | The font size used for the Event Labels. |
| IconSize:num | Icon Size | — | number | 26 | — | The size of the icons used in the Event Labels. |
| LineHeight:num | Line Height | — | number | 26 | — | The line height used for the Event Labels. |
| OffsetX:num | Offset X | — | number | 0 | — | Globally offset all labels horizontally by this amount. |
| OffsetY:num | Offset Y | — | number | 12 | — | Globally offset all labels vertically by this amount. |
| OpacitySpeed:num | Fade Speed | — | number | 16 | — | Fade speed for labels. |
| VisibleRange:num | Visible Range | — | number | 30 | — | Range the player has to be within the event to make its label visible. |
| RangeType:str | Range Type | VisibleRange:num | select | square | square; circle; diamond | What do you want the default label visible range type? |

### Struct: Icon

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BufferX:num | Buffer X | — | — | 0 | — | Default X position buffer for event icons. |
| BufferY:num | Buffer Y | — | — | 12 | — | Default Y position buffer for event icons. |
| BlendMode:num | Blend Mode | — | select | 0 | 0 - Normal=0; 1 - Additive=1; 2 - Multiply=2; 3 - Screen=3 | Default blend mode for even icons. |

### Struct: Template

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Settings | — | — | — | — | — | — |
| PreloadMaps:arraynum | Preloaded Maps | Settings | number\[\] | \["1"\] | — | A list of all the ID's of the maps that will be preloaded to serve as template maps for this plugin. |
| Templates | — | — | — | — | — | — |
| List:arraystruct | Event Template List | Templates | struct&lt;EventTemplate&gt;\[\] | \[\] | — | A list of all the Event Templates used by this project. Used for notetags and Plugin Commands. |
| JavaScript | — | — | — | — | — | — |
| PreCopyJS:func | JS: Pre-Copy | JavaScript | note | "// Declare Constants\nconst mapId = arguments\[1\];\nconst eventId = arguments\[2\];\nconst target = arguments\[3\];\nconst player = $gamePlayer;\n\n// Perform Actions\n" | — | Code that's ran before an event is copied. This is global and is ran for all copied events. |
| PostCopyJS:func | JS: Post-Copy | JavaScript | note | "// Declare Constants\nconst mapId = arguments\[1\];\nconst eventId = arguments\[2\];\nconst target = arguments\[3\];\nconst player = $gamePlayer;\n\n// Perform Actions\n" | — | Code that's ran after an event is copied. This is global and is ran for all copied events. |
| PreMorphJS:func | JS: Pre-Morph | JavaScript | note | "// Declare Constants\nconst mapId = arguments\[1\];\nconst eventId = arguments\[2\];\nconst target = arguments\[3\];\nconst player = $gamePlayer;\n\n// Perform Actions\n" | — | Code that's ran before an event is morphed. This is global and is ran for all morphed events. |
| PostMorphJS:func | JS: Post-Morph | JavaScript | note | "// Declare Constants\nconst mapId = arguments\[1\];\nconst eventId = arguments\[2\];\nconst target = arguments\[3\];\nconst player = $gamePlayer;\n\n// Perform Actions\n" | — | Code that's ran after an event is morphed. This is global and is ran for all morphed events. |
| PreSpawnJS:func | JS: Pre-Spawn | JavaScript | note | "// Declare Constants\nconst mapId = arguments\[1\];\nconst eventId = arguments\[2\];\nconst target = arguments\[3\];\nconst player = $gamePlayer;\n\n// Perform Actions\n" | — | Code that's ran before an event is spawned. This is global and is ran for all spawned events. |
| PostSpawnJS:func | JS: Post-Spawn | JavaScript | note | "// Declare Constants\nconst mapId = arguments\[1\];\nconst eventId = arguments\[2\];\nconst target = arguments\[3\];\nconst player = $gamePlayer;\n\n// Perform Actions\n" | — | Code that's ran after an event is spawned. This is global and is ran for all spawned events. |

### Struct: EventTemplate

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Name:str | Name | — | — | Untitled | — | Name of the template. It'll be used as anchor points for notetags and Plugin Commands. |
| MapID:num | Map ID | Name:str | number | 1 | — | ID of the map the template event is stored on. This will automatically add this ID to preloaded list. |
| EventID:num | Event ID | Name:str | number | 1 | — | ID of the event the template event is based on. |
| JavaScript | — | — | — | — | — | — |
| PreCopyJS:func | JS: Pre-Copy | JavaScript | note | "// Declare Constants\nconst mapId = arguments\[1\];\nconst eventId = arguments\[2\];\nconst target = arguments\[3\];\nconst player = $gamePlayer;\n\n// Perform Actions\n" | — | Code that's ran before an event is copied. This is local only for this template. |
| PostCopyJS:func | JS: Post-Copy | JavaScript | note | "// Declare Constants\nconst mapId = arguments\[1\];\nconst eventId = arguments\[2\];\nconst target = arguments\[3\];\nconst player = $gamePlayer;\n\n// Perform Actions\n" | — | Code that's ran after an event is copied. This is local only for this template. |
| PreMorphJS:func | JS: Pre-Morph | JavaScript | note | "// Declare Constants\nconst mapId = arguments\[1\];\nconst eventId = arguments\[2\];\nconst target = arguments\[3\];\nconst player = $gamePlayer;\n\n// Perform Actions\n" | — | Code that's ran before an event is morphed. This is local only for this template. |
| PostMorphJS:func | JS: Post-Morph | JavaScript | note | "// Declare Constants\nconst mapId = arguments\[1\];\nconst eventId = arguments\[2\];\nconst target = arguments\[3\];\nconst player = $gamePlayer;\n\n// Perform Actions\n" | — | Code that's ran after an event is morphed. This is local only for this template. |
| PreSpawnJS:func | JS: Pre-Spawn | JavaScript | note | "// Declare Constants\nconst mapId = arguments\[1\];\nconst eventId = arguments\[2\];\nconst target = arguments\[3\];\nconst player = $gamePlayer;\n\n// Perform Actions\n" | — | Code that's ran before an event is spawned. This is global and is ran for all spawned events. |
| PostSpawnJS:func | JS: Post-Spawn | JavaScript | note | "// Declare Constants\nconst mapId = arguments\[1\];\nconst eventId = arguments\[2\];\nconst target = arguments\[3\];\nconst player = $gamePlayer;\n\n// Perform Actions\n" | — | Code that's ran after an event is spawned. This is global and is ran for all spawned events. |

### Struct: Movement

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Dir8 | 8 Directional Movement | — | — | — | — | — |
| EnableDir8:eval | Enable | Dir8 | boolean | true | — | Allow 8-directional movement by default? Players can move diagonally. |
| StrictCollision:eval | Strict Collision | Dir8 | boolean | true | — | Enforce strict collission rules where the player must be able to pass both cardinal directions? |
| FavorHorz:eval | Favor Horizontal | StrictCollision:eval | boolean | true | — | Favor horizontal if cannot pass diagonally but can pass both horizontally and vertically? |
| SlowerSpeed:eval | Slower Diagonals? | Dir8 | boolean | false | — | Enforce a slower movement speed when moving diagonally? |
| DiagonalSpeedMultiplier:num | Speed Multiplier | SlowerSpeed:eval | — | 0.85 | — | What's the multiplier to adjust movement speed when moving diagonally? |
| AutoMove | Automatic Movement | — | — | — | — | — |
| StopAutoMoveEvents:eval | Stop During Events | AutoMove | boolean | true | — | Stop automatic event movement while events are running. |
| StopAutoMoveMessages:eval | Stop During Messages | AutoMove | boolean | true | — | Stop automatic event movement while a message is running. |
| Bitmap | — | — | — | — | — | — |
| BitmapSmoothing:eval | Smoothing | Bitmap | boolean | false | — | Do you want to smooth or pixelate the map sprites? Pixelating them is better for zooming and tilting. |
| Dash | Dash | — | — | — | — | — |
| DashModifier:num | Dash Modifier | Dash | — | +1.0 | — | Alters the dash speed modifier. |
| DashOnLadder:eval | Dash On Ladder? | Dash | boolean | false | — | Allow dashing while on a ladder or rope? |
| EnableDashTilt:eval | Enable Dash Tilt? | Dash | boolean | true | — | Tilt any sprites that are currently dashing? |
| TiltLeft:num | Tilt Left Amount | EnableDashTilt:eval | — | -0.15 | — | Amount in radians when moving left (upper left, left, lower left). |
| TiltRight:num | Tilt Right Amount | EnableDashTilt:eval | — | 0.15 | — | Amount in radians when moving right (upper right, right, lower right). |
| TiltVert:num | Tilt Vertical Amount | EnableDashTilt:eval | — | 0.05 | — | Amount in radians when moving vertical (up, down). |
| EventMove | Event Movement | — | — | — | — | — |
| RandomMoveWeight:num | Random Move Weight | EventMove | — | 0.10 | — | Use numbers between 0 and 1. Numbers closer to 1 stay closer to their home position. 0 to disable it. |
| ShiftY:num | Shift Y | EventMove | — | -6 | — | How many pixels should non-tile characters be shifted by? Negative: up. Positive: down. |
| PathFind | Path Finding | — | — | — | — | — |
| PathfindMobileEnabled:eval | Mobile-Enabled? | PathFind | boolean | false | — | Enable diagonal pathfinding for mobile devices? |
| Shadows | — | — | — | — | — | — |
| ShowShadows:eval | Show | Shadows | boolean | true | — | Show shadows on all events and player-related sprites. |
| DefaultShadow:str | Default Filename | Shadows | file | Shadow1 | — | Default filename used for shadows found in img/system/ folder. |
| TurnInPlace | Turn in Place | — | — | — | — | — |
| EnableTurnInPlace:eval | Enable | TurnInPlace | boolean | false | — | When not dashing, player will turn in place before moving. This only applies with keyboard inputs. |
| TurnInPlaceDelay:num | Delay in Frames | TurnInPlace | number | 10 | — | The number of frames to wait before moving. |
| Vehicle | Vehicle Speeds | — | — | — | — | — |
| BoatSpeed:num | Boat Speed | Vehicle | — | 4.0 | — | Allows you to adjust the base speed of the boat vehicle. |
| ShipSpeed:num | Ship Speed | Vehicle | — | 5.0 | — | Allows you to adjust the base speed of the ship vehicle. |
| AirshipSpeed:num | Airship Speed | Vehicle | — | 6.0 | — | Allows you to adjust the base speed of the airship vehicle. |

### Struct: Region

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Allow | Allow Regions | — | — | — | — | — |
| AllAllow:arraynum | All Allow | Allow | number\[\] | \[\] | — | Insert Region ID's where the player can enter. Region ID's range from 0 to 255. |
| WalkAllow:arraynum | Walk Allow | Allow | number\[\] | \[\] | — | Insert Region ID's where walking units can enter. Region ID's range from 0 to 255. |
| PlayerAllow:arraynum | Player Allow | WalkAllow:arraynum | number\[\] | \[\] | — | Insert Region ID's where the player can enter. Region ID's range from 0 to 255. |
| EventAllow:arraynum | Event Allow | WalkAllow:arraynum | number\[\] | \[\] | — | Insert Region ID's where events can enter. Region ID's range from 0 to 255. |
| VehicleAllow:arraynum | Vehicle Allow | Allow | number\[\] | \[\] | — | Insert Region ID's where any vehicle can enter. Region ID's range from 0 to 255. |
| BoatAllow:arraynum | Boat Allow | VehicleAllow:arraynum | number\[\] | \[\] | — | Insert Region ID's where boats can enter. Region ID's range from 0 to 255. |
| ShipAllow:arraynum | Ship Allow | VehicleAllow:arraynum | number\[\] | \[\] | — | Insert Region ID's where ships can enter. Region ID's range from 0 to 255. |
| AirshipAllow:arraynum | Airship Allow | VehicleAllow:arraynum | number\[\] | \[\] | — | Insert Region ID's where airships can enter. Region ID's range from 0 to 255. |
| Forbid | Forbid Regions | — | — | — | — | — |
| AllForbid:arraynum | All Forbid | Forbid | number\[\] | \[\] | — | Insert Region ID's where the player cannot enter. Region ID's range from 0 to 255. |
| WalkForbid:arraynum | Walk Forbid | Forbid | number\[\] | \[\] | — | Insert Region ID's where walking units cannot enter. Region ID's range from 0 to 255. |
| PlayerForbid:arraynum | Player Forbid | WalkForbid:arraynum | number\[\] | \[\] | — | Insert Region ID's where the player cannot enter. Region ID's range from 0 to 255. |
| EventForbid:arraynum | Event Forbid | WalkForbid:arraynum | number\[\] | \[\] | — | Insert Region ID's where events cannot enter. Region ID's range from 0 to 255. |
| VehicleForbid:arraynum | Vehicle Forbid | Forbid | number\[\] | \[\] | — | Insert Region ID's where vehicles cannot enter. Region ID's range from 0 to 255. |
| BoatForbid:arraynum | Boat Forbid | VehicleForbid:arraynum | number\[\] | \[\] | — | Insert Region ID's where ships cannot enter. Region ID's range from 0 to 255. |
| ShipForbid:arraynum | Ship Forbid | VehicleForbid:arraynum | number\[\] | \[\] | — | Insert Region ID's where ships cannot enter. Region ID's range from 0 to 255. |
| AirshipForbid:arraynum | Airship Forbid | VehicleForbid:arraynum | number\[\] | \[\] | — | Insert Region ID's where airships cannot enter. Region ID's range from 0 to 255. |
| Dock | Dock Regions | — | — | — | — | — |
| VehicleDock:arraynum | Vehicle Dock | Dock | number\[\] | \[\] | — | Insert Region ID's where any vehicle can dock. Region ID's range from 0 to 255. |
| BoatDock:arraynum | Boat Dock | Dock | number\[\] | \[\] | — | Insert Region ID's where boats can dock. Region ID's range from 0 to 255. |
| BoatDockRegionOnly:eval | Only Region Dockable | BoatDock:arraynum | boolean | false | — | Boats can only dock at designated regions. |
| ShipDock:arraynum | Ship Dock | Dock | number\[\] | \[\] | — | Insert Region ID's where ships can dock. Region ID's range from 0 to 255. |
| ShipDockRegionOnly:eval | Only Region Dockable | ShipDock:arraynum | boolean | false | — | Ships can only dock at designated regions. |
| AirshipDock:arraynum | Airship Dock | Dock | number\[\] | \[\] | — | Insert Region ID's where airships can dock. Region ID's range from 0 to 255. |
| AirshipDockRegionOnly:eval | Only Region Dockable | AirshipDock:arraynum | boolean | false | — | Airships can only dock at designated regions. |

### Struct: RegionCommonEvent

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Region1:num | Region 1 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region2:num | Region 2 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region3:num | Region 3 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region4:num | Region 4 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region5:num | Region 5 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region6:num | Region 6 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region7:num | Region 7 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region8:num | Region 8 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region9:num | Region 9 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region10:num | Region 10 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region11:num | Region 11 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region12:num | Region 12 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region13:num | Region 13 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region14:num | Region 14 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region15:num | Region 15 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region16:num | Region 16 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region17:num | Region 17 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region18:num | Region 18 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region19:num | Region 19 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region20:num | Region 20 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region21:num | Region 21 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region22:num | Region 22 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region23:num | Region 23 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region24:num | Region 24 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region25:num | Region 25 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region26:num | Region 26 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region27:num | Region 27 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region28:num | Region 28 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region29:num | Region 29 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region30:num | Region 30 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region31:num | Region 31 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region32:num | Region 32 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region33:num | Region 33 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region34:num | Region 34 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region35:num | Region 35 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region36:num | Region 36 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region37:num | Region 37 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region38:num | Region 38 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region39:num | Region 39 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region40:num | Region 40 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region41:num | Region 41 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region42:num | Region 42 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region43:num | Region 43 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region44:num | Region 44 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region45:num | Region 45 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region46:num | Region 46 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region47:num | Region 47 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region48:num | Region 48 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region49:num | Region 49 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region50:num | Region 50 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region51:num | Region 51 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region52:num | Region 52 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region53:num | Region 53 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region54:num | Region 54 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region55:num | Region 55 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region56:num | Region 56 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region57:num | Region 57 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region58:num | Region 58 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region59:num | Region 59 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region60:num | Region 60 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region61:num | Region 61 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region62:num | Region 62 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region63:num | Region 63 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region64:num | Region 64 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region65:num | Region 65 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region66:num | Region 66 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region67:num | Region 67 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region68:num | Region 68 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region69:num | Region 69 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region70:num | Region 70 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region71:num | Region 71 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region72:num | Region 72 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region73:num | Region 73 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region74:num | Region 74 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region75:num | Region 75 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region76:num | Region 76 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region77:num | Region 77 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region78:num | Region 78 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region79:num | Region 79 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region80:num | Region 70 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region81:num | Region 71 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region82:num | Region 72 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region83:num | Region 73 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region84:num | Region 74 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region85:num | Region 75 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region86:num | Region 76 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region87:num | Region 77 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region88:num | Region 78 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region89:num | Region 79 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region80:num | Region 80 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region81:num | Region 81 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region82:num | Region 82 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region83:num | Region 83 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region84:num | Region 84 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region85:num | Region 85 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region86:num | Region 86 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region87:num | Region 87 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region88:num | Region 88 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region89:num | Region 89 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region90:num | Region 80 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region91:num | Region 81 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region92:num | Region 82 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region93:num | Region 83 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region94:num | Region 84 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region95:num | Region 85 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region96:num | Region 86 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region97:num | Region 87 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region98:num | Region 88 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region99:num | Region 89 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region90:num | Region 90 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region91:num | Region 91 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region92:num | Region 92 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region93:num | Region 93 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region94:num | Region 94 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region95:num | Region 95 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region96:num | Region 96 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region97:num | Region 97 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region98:num | Region 98 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region99:num | Region 99 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region100:num | Region 100 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region101:num | Region 101 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region102:num | Region 102 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region103:num | Region 103 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region104:num | Region 104 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region105:num | Region 105 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region106:num | Region 106 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region107:num | Region 107 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region108:num | Region 108 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region109:num | Region 109 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region110:num | Region 110 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region111:num | Region 111 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region112:num | Region 112 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region113:num | Region 113 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region114:num | Region 114 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region115:num | Region 115 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region116:num | Region 116 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region117:num | Region 117 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region118:num | Region 118 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region119:num | Region 119 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region120:num | Region 120 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region121:num | Region 121 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region122:num | Region 122 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region123:num | Region 123 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region124:num | Region 124 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region125:num | Region 125 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region126:num | Region 126 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region127:num | Region 127 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region128:num | Region 128 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region129:num | Region 129 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region130:num | Region 130 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region131:num | Region 131 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region132:num | Region 132 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region133:num | Region 133 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region134:num | Region 134 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region135:num | Region 135 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region136:num | Region 136 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region137:num | Region 137 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region138:num | Region 138 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region139:num | Region 139 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region140:num | Region 140 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region141:num | Region 141 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region142:num | Region 142 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region143:num | Region 143 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region144:num | Region 144 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region145:num | Region 145 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region146:num | Region 146 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region147:num | Region 147 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region148:num | Region 148 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region149:num | Region 149 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region150:num | Region 150 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region151:num | Region 151 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region152:num | Region 152 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region153:num | Region 153 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region154:num | Region 154 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region155:num | Region 155 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region156:num | Region 156 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region157:num | Region 157 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region158:num | Region 158 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region159:num | Region 159 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region160:num | Region 160 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region161:num | Region 161 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region162:num | Region 162 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region163:num | Region 163 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region164:num | Region 164 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region165:num | Region 165 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region166:num | Region 166 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region167:num | Region 167 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region168:num | Region 168 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region169:num | Region 169 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region170:num | Region 170 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region171:num | Region 171 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region172:num | Region 172 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region173:num | Region 173 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region174:num | Region 174 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region175:num | Region 175 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region176:num | Region 176 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region177:num | Region 177 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region178:num | Region 178 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region179:num | Region 179 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region180:num | Region 170 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region181:num | Region 171 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region182:num | Region 172 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region183:num | Region 173 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region184:num | Region 174 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region185:num | Region 175 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region186:num | Region 176 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region187:num | Region 177 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region188:num | Region 178 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region189:num | Region 179 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region180:num | Region 180 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region181:num | Region 181 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region182:num | Region 182 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region183:num | Region 183 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region184:num | Region 184 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region185:num | Region 185 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region186:num | Region 186 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region187:num | Region 187 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region188:num | Region 188 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region189:num | Region 189 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region190:num | Region 180 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region191:num | Region 181 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region192:num | Region 182 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region193:num | Region 183 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region194:num | Region 184 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region195:num | Region 185 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region196:num | Region 186 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region197:num | Region 187 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region198:num | Region 188 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region199:num | Region 189 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region190:num | Region 190 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region191:num | Region 191 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region192:num | Region 192 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region193:num | Region 193 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region194:num | Region 194 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region195:num | Region 195 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region196:num | Region 196 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region197:num | Region 197 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region198:num | Region 198 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region199:num | Region 199 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region200:num | Region 200 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region201:num | Region 201 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region202:num | Region 202 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region203:num | Region 203 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region204:num | Region 204 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region205:num | Region 205 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region206:num | Region 206 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region207:num | Region 207 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region208:num | Region 208 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region209:num | Region 209 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region210:num | Region 210 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region211:num | Region 211 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region212:num | Region 212 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region213:num | Region 213 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region214:num | Region 214 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region215:num | Region 215 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region216:num | Region 216 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region217:num | Region 217 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region218:num | Region 218 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region219:num | Region 219 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region220:num | Region 220 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region221:num | Region 221 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region222:num | Region 222 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region223:num | Region 223 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region224:num | Region 224 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region225:num | Region 225 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region226:num | Region 226 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region227:num | Region 227 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region228:num | Region 228 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region229:num | Region 229 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region230:num | Region 230 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region231:num | Region 231 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region232:num | Region 232 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region233:num | Region 233 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region234:num | Region 234 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region235:num | Region 235 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region236:num | Region 236 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region237:num | Region 237 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region238:num | Region 238 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region239:num | Region 239 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region240:num | Region 240 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region241:num | Region 241 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region242:num | Region 242 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region243:num | Region 243 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region244:num | Region 244 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region245:num | Region 245 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region246:num | Region 246 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region247:num | Region 247 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region248:num | Region 248 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region249:num | Region 249 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region250:num | Region 250 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region251:num | Region 251 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region252:num | Region 252 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region253:num | Region 253 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region254:num | Region 254 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |
| Region255:num | Region 255 | — | common_event | 0 | — | Which Common Event does this region activate? Use 0 to not activate any Common Events. |

### Struct: TerrainTag

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| TerrainTag | Terrain Tag ID's | — | — | — | — | — |
| Rope:num | Rope | TerrainTag | number | 1 | — | Which terrain tag number to use for ropes? |

### Struct: VS8

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Balloons | Balloon Icon Settings | — | — | — | — | — |
| AutoBalloon:eval | Auto-Balloon Poses | Balloons | boolean | true | — | Automatically pose VS8 sprites when using balloon icons. |
| BalloonOffsetX:num | Balloon Offset X | Balloons | — | 0 | — | Offset balloon icons on VS8 sprites by x pixels. |
| BalloonOffsetY:num | Balloon Offset Y | Balloons | — | 10 | — | Offset balloon icons on VS8 sprites by y pixels. |
| Icons | — | — | — | — | — | — |
| AutoBuffer:eval | Auto Buffer | Icons | boolean | true | — | Automatically buffer the X and Y coordinates of VS8 sprites? |
| CarryPose:eval | Use Carry Pose | Icons | boolean | true | — | Use the carry pose when moving with an icon overhead. |

### Struct: PopupExtra

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Fade | Fade Settings | — | — | — | — | — |
| fadeInDuration:eval | Fade In Duration | Fade | — | 8 | — | How many frames does it take to fade in? 60 frames = 1 second. |
| fadeOutDuration:eval | Fade Out Duration | Fade | — | 8 | — | How many frames does it take to fade out? 60 frames = 1 second. |
| Offset | Offset Settings | — | — | — | — | — |
| startOffsetX:eval | Starting Offset X | Offset | — | +0 | — | Offsets the starting x position. You may use code. Negative: left. Positive: right. |
| startOffsetY:eval | Starting Offset Y | Offset | — | -48 | — | Offsets the starting y position. You may use code. Negative: up. Positive: down. |
| endOffsetX:eval | Ending Offset X | Offset | — | +0 | — | Offsets the ending x position. You may use code. Negative: left. Positive: right. |
| endOffsetY:eval | Ending Offset Y | Offset | — | -96 | — | Offsets the ending y position. You may use code. Negative: up. Positive: down. |
| Scale | Scaling Settings | — | — | — | — | — |
| startScaleX:eval | Starting Scale X | Scale | — | 0.8 | — | What is the starting scale x? You may use code. 0.0 = 0%, 0.5 = 50%, 1.0 = 100% |
| startScaleY:eval | Starting Scale Y | Scale | — | 0.8 | — | What is the starting scale y? You may use code. 0.0 = 0%, 0.5 = 50%, 1.0 = 100% |
| endScaleX:eval | Ending Scale X | Scale | — | 0.8 | — | What is the ending scale x? You may use code. 0.0 = 0%, 0.5 = 50%, 1.0 = 100% |
| endScaleY:eval | Ending Scale Y | Scale | — | 0.8 | — | What is the ending scale y? You may use code. 0.0 = 0%, 0.5 = 50%, 1.0 = 100% |
| Angle | Angle Settings | — | — | — | — | — |
| startAngle:eval | Starting Offset Angle | Angle | — | +0 | — | What is the starting angle offset? Use numbers between 0 and 360. You may use code. |
| endAngle:eval | Ending Offset Angle | Angle | — | +0 | — | What is the ending angle offset? Use numbers between 0 and 360. You may use code. |
| Misc | Misc Settings | — | — | — | — | — |
| Arc:eval | Arc Peak | Misc | — | +0 | — | This is the height of the popup's trajectory arc in pixels. Positive: up. Negative: down. Code allowed. |

## Plugin commands

### -

- Command ID: `Separator_AutoMove`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Auto Movement: Events

- Command ID: `AutoMoveEvents`
- Description: Allow/stop events from auto movement.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Value:str | Value | select | Allow | Allow; Stop; Toggle | Allow events to move automatically? @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_CallEvent`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Call Event: Remote Read

- Command ID: `CallEvent`
- Description: Runs the page of a different event remotely. This will run the page of the target event on the CURRENT event.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| MapId:eval | Map ID | — | 0 | — | Target event's map. Use 0 for current map. You may use JavaScript code. |
| EventId:eval | Event ID | — | 0 | — | The ID of the event to remotely run. Use 0 for current event. You may use JavaScript code. |
| PageId:eval | Page ID | — | 1 | — | The page of the remote event to run. You may use JavaScript code. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_DashEnable`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Dash Enable: Toggle

- Command ID: `DashEnableToggle`
- Description: Enable/Disable Dashing on maps.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Value:str | Value | select | Enable | Enable; Disable; Toggle | What do you wish to change dashing to? @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_EventIcon`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Event Icon: Change (Temporary)

- Command ID: `EventIconChange`
- Description: Change the icon that appears on an event. This change is temporary and resets upon new events.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| MapId:eval | Map ID | — | 0 | — | The map the target map. Use 0 for current map. You may use JavaScript code. |
| EventId:eval | Event ID | — | 0 | — | The ID of the target event.  Use 0 for current event. You may use JavaScript code. |
| IconIndex:eval | Icon Index | — | 1 | — | Icon index used for the icon. You may use JavaScript code. |
| IconBufferX:eval | Buffer X | — | 0 | — | How much to shift the X position by? You may use JavaScript code. |
| IconBufferY:eval | Buffer Y | — | 12 | — | How much to shift the Y position by? You may use JavaScript code. |
| IconBlendMode:num | Blend Mode | select | 0 | 0 - Normal=0; 1 - Additive=1; 2 - Multiply=2; 3 - Screen=3 | What kind of blend mode do you wish to apply to the icon sprite? @ -------------------------------------------------------------------------- |

### Event Icon: Change (Forced)

- Command ID: `EventIconChangeForced`
- Description: Change the icon that appears on an event. This change is forced and needs to be restored.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| MapId:eval | Map ID | — | 0 | — | The map the target map. Use 0 for current map. You may use JavaScript code. |
| EventId:eval | Event ID | — | 0 | — | The ID of the target event.  Use 0 for current event. You may use JavaScript code. |
| IconIndex:eval | Icon Index | — | 1 | — | Icon index used for the icon. You may use JavaScript code. |
| IconBufferX:eval | Buffer X | — | 0 | — | How much to shift the X position by? You may use JavaScript code. |
| IconBufferY:eval | Buffer Y | — | 12 | — | How much to shift the Y position by? You may use JavaScript code. |
| IconBlendMode:num | Blend Mode | select | 0 | 0 - Normal=0; 1 - Additive=1; 2 - Multiply=2; 3 - Screen=3 | What kind of blend mode do you wish to apply to the icon sprite? @ -------------------------------------------------------------------------- |

### Event Icon: Delete

- Command ID: `EventIconDelete`
- Description: Delete the icon that appears on an event. This will remain deleted and invisible for events.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| MapId:eval | Map ID | — | 0 | — | The map the target map. Use 0 for current map. You may use JavaScript code. |
| EventId:eval | Event ID | — | 0 | — | The ID of the target event. Use 0 for current event. You may use JavaScript code. @ -------------------------------------------------------------------------- |

### Event Icon: Restore

- Command ID: `EventIconRestore`
- Description: Restores a deleted or forced icon that appears on an event.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| MapId:eval | Map ID | — | 0 | — | The map the target map. Use 0 for current map. You may use JavaScript code. |
| EventId:eval | Event ID | — | 0 | — | The ID of the target event. Use 0 for current event. You may use JavaScript code. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_EventLabel`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Event Label: Refresh

- Command ID: `EventLabelRefresh`
- Description: Refresh all Event Labels on screen. @ --------------------------------------------------------------------------

No arguments are declared.

### Event Label: Visible

- Command ID: `EventLabelVisible`
- Description: Change the visibility of Event Labels.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Visibility:str | Visibility | select | Visible | Visible; Hidden; Toggle | What do you wish to change visibility to? @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_EventLocation`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Event Location: Save

- Command ID: `EventLocationSave`
- Description: Memorize an event's map location so it reappears there the next time the map is loaded.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| EventId:eval | Event ID | — | 1 | — | The ID of the target event. You may use JavaScript code. @ -------------------------------------------------------------------------- |

### Event Location: Create

- Command ID: `EventLocationCreate`
- Description: Creates a custom spawn location for a specific map's event so it appears there the next time the map is loaded.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| MapId:eval | Map ID | — | 0 | — | The map the target map. Use 0 for current map. You may use JavaScript code. |
| EventId:eval | Event ID | — | 0 | — | The ID of the target event. Use 0 for current event. You may use JavaScript code. |
| PosX:eval | X Coordinate | — | 0 | — | The X coordinate of the event. You may use JavaScript code. |
| PosY:eval | Y Coordinate | — | 0 | — | The Y coordinate of the event. You may use JavaScript code. |
| Direction:num | Direction | select | 2 | 1 - Lower Left=1; 2 - Down=2; 3 - Lower Right=3; 4 - Left=4; 6 - Right=6; 7 - Upper Left=7; 8 - Up=8; 9 - Upper Right=9 | The direction the event will be facing. |
| Optional | — | — | — | — | — |
| PageId:eval | Page ID | — | 1 | — | The page of the event to set the move route to. You may use JavaScript code. |
| MoveRouteIndex:eval | Move Route Index | — | 0 | — | The point in the move route for this event to be at if the page ID matches the rest of the page conditions. @ -------------------------------------------------------------------------- |

### Event Location: Delete

- Command ID: `EventLocationDelete`
- Description: Deletes an event's saved map location. The event will reappear at its default location.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| MapId:eval | Map ID | — | 0 | — | The map the target map. Use 0 for current map. You may use JavaScript code. |
| EventId:eval | Event ID | — | 0 | — | The ID of the target event. Use 0 for current event. You may use JavaScript code. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_EventPopup`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Event Popup: Player

- Command ID: `MsgPopupPlayer`
- Description: Makes a centered event popup on the player sprite. Requires VisuMZ_1_MessageCore! Cannot be used in battle!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| MessageText:json | Message Text | note | "+\\LastGainObjQuantity\\LastGainObj" | — | Insert the text to be displayed. Text codes can be used. |
| MsgDuration:eval | Message Duration | — | 60 | — | What is the frame duration of the event popup? 60 frames = 1 second. You may use code. |
| PopupExtra:struct | Popup Settings | struct&lt;PopupExtra&gt; | {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"} | — | These settings let you adjust how the popup animates. @ -------------------------------------------------------------------------- |

### Event Popup: Follower

- Command ID: `MsgPopupFollower`
- Description: Makes a centered event popup on target follower sprite. Requires VisuMZ_1_MessageCore! Cannot be used in battle!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| FollowerIndex:eval | Follower Index | — | 0 | — | Which follower index to play popup? Index starts at 0. You may use JavaScript code. |
| MessageText:json | Message Text | note | "\\I\[23\]" | — | Insert the text to be displayed. Text codes can be used. |
| MsgDuration:eval | Message Duration | — | 60 | — | What is the frame duration of the event popup? 60 frames = 1 second. You may use code. |
| PopupExtra:struct | Popup Settings | struct&lt;PopupExtra&gt; | {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"} | — | These settings let you adjust how the popup animates. @ -------------------------------------------------------------------------- |

### Event Popup: Event

- Command ID: `MsgPopupEvent`
- Description: Makes a centered event popup on target event sprite. Requires VisuMZ_1_MessageCore! Cannot be used in battle!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| EventId:eval | Event ID | — | 0 | — | The ID of the event to play popup on. Use 0 for current event. You may use JavaScript code. |
| MessageText:json | Message Text | note | "Line1\nLine2" | — | Insert the text to be displayed. Text codes can be used. |
| MsgDuration:eval | Message Duration | — | 60 | — | What is the frame duration of the event popup? 60 frames = 1 second. You may use code. |
| PopupExtra:struct | Popup Settings | struct&lt;PopupExtra&gt; | {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-48","endOffsetX:eval":"+0","endOffsetY:eval":"-96","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"} | — | These settings let you adjust how the popup animates. @ -------------------------------------------------------------------------- |

### Event Popup: Target Tile

- Command ID: `MsgPopupTargetTile`
- Description: Makes a centered event popup on target tile. Requires VisuMZ_1_MessageCore! Cannot be used in battle!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| TileX:eval | Map Tile X | — | $gameMap.width() / 2 | — | The x coordinate of the map tile. You may use JavaScript code. |
| TileY:eval | Map Tile Y | — | $gameMap.height() / 2 | — | The y coordinate of the map tile. You may use JavaScript code. |
| MessageText:json | Message Text | note | "\\I\[87\]" | — | Insert the text to be displayed. Text codes can be used. |
| MsgDuration:eval | Message Duration | — | 60 | — | What is the frame duration of the event popup? 60 frames = 1 second. You may use code. |
| PopupExtra:struct | Popup Settings | struct&lt;PopupExtra&gt; | {"Fade":"","fadeInDuration:eval":"8","fadeOutDuration:eval":"8","Offset":"","startOffsetX:eval":"+0","startOffsetY:eval":"-24","endOffsetX:eval":"+0","endOffsetY:eval":"-24","Scale":"","startScaleX:eval":"0.8","startScaleY:eval":"0.8","endScaleX:eval":"0.8","endScaleY:eval":"0.8","Angle":"","startAngle:eval":"+0","endAngle:eval":"+0","Misc":"","Arc:eval":"+0"} | — | These settings let you adjust how the popup animates. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_EventTimer`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Event Timer: Expire Event Assign

- Command ID: `EventTimerExpireEvent`
- Description: Sets a Common Event to run upon expiration. Bypasses the default code if one is set.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| CommonEventID:num | Common Event ID | common_event | 1 | — | Select the Common Event to run upon the timer's expiration. @ -------------------------------------------------------------------------- |

### Event Timer: Change Speed

- Command ID: `EventTimerSpeed`
- Description: Changes the timer frame decrease (or increase) speed.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Speed:eval | Speed | — | -1 | — | How many 1/60ths of a second does each frame increase or decrease by? Negative decreases. Positive increases. @ -------------------------------------------------------------------------- |

### Event Timer: Expire Event Clear

- Command ID: `EventTimerExpireClear`
- Description: Clears any set to expire Common Event and instead, run the default Game_Timer expiration code. @ --------------------------------------------------------------------------

No arguments are declared.

### Event Timer: Frames Gain

- Command ID: `EventTimerFramesGain`
- Description: Chooses how many frames, seconds, minutes, or hours are gained or lost for the event timer.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Frames:eval | Frames | — | +0 | — | How many 1/60ths of a second are gained/lost? Positive for gain. Negative for lost. JavaScript allowed. |
| Seconds:eval | Seconds | — | +0 | — | How many seconds are gained/lost? Positive for gain. Negative for lost. JavaScript allowed. |
| Minutes:eval | Minutes | — | +0 | — | How many minutes are gained/lost? Positive for gain. Negative for lost. JavaScript allowed. |
| Hours:eval | Hours | — | +0 | — | How many hours are gained/lost? Positive for gain. Negative for lost. JavaScript allowed. @ -------------------------------------------------------------------------- |

### Event Timer: Frames Set

- Command ID: `EventTimerFramesSet`
- Description: Chooses how many frames, seconds, minutes, or hours are set for the event timer.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Frames:eval | Frames | — | 0 | — | Set frame count to this value. Each frame is 1/60th of a second. JavaScript allowed. |
| Seconds:eval | Seconds | — | 0 | — | Set seconds to this value. JavaScript allowed. |
| Minutes:eval | Minutes | — | 0 | — | Set minutes to this value. Each minute is 60 seconds. JavaScript allowed. |
| Hours:eval | Hours | — | 0 | — | Set hours to this value. Each hour is 60 minutes. JavaScript allowed. @ -------------------------------------------------------------------------- |

### Event Timer: Pause

- Command ID: `EventTimerPause`
- Description: Pauses the current event timer, but does not stop it. @ --------------------------------------------------------------------------

No arguments are declared.

### Event Timer: Resume

- Command ID: `EventTimerResume`
- Description: Resumes the current event timer from the paused state. @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `Separator_Follower`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Follower: Set Global Chase

- Command ID: `FollowerSetGlobalChase`
- Description: Disables all followers from chasing the player or reenables it.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Chase:eval | Chase | boolean | false | — | Sets all followers to chase the player or not. @ -------------------------------------------------------------------------- |

### Follower: Set Target Chase

- Command ID: `FollowerSetTargetChase`
- Description: Disables target follower from chasing the player or reenables it.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| FollowerID:eval | Follower ID | — | 1 | — | Select which follower ID to disable/reenable chasing for. |
| Chase:eval | Chase | boolean | false | — | Sets target follower to chase its target or not. @ -------------------------------------------------------------------------- |

### Follower: Set Control

- Command ID: `FollowerSetControl`
- Description: Sets the event commands to target a follower when "Player" is selected as the target.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| FollowerID:eval | Follower ID | — | 1 | — | Select which follower ID to control. 0 is the player. @ -------------------------------------------------------------------------- |

### Follower: Reset

- Command ID: `FollowerReset`
- Description: Resets all follower controls. Event Commands that target the "Player" return to normal and followers chase again. @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `Separator_GlobalSwitch`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Global Switch: Get Self Switch A B C D

- Command ID: `SwitchGetSelfSwitchABCD`
- Description: Gets the current ON/OFF value from a Self Switch and stores it onto a Global Switch.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| MapId:eval | Map ID | — | 0 | — | The map the source map. Use 0 for current map. You may use JavaScript code. |
| EventId:eval | Event ID | — | 0 | — | The ID of the source event. Use 0 for current event. You may use JavaScript code. |
| Letter:str | Letter | select | A | A; B; C; D | Letter of the target event's Self Switch to obtain data from. |
| Break | - | — | — | — | — |
| TargetSwitchId:num | Target Switch ID | switch | 1 | — | The ID of the target switch. @ -------------------------------------------------------------------------- |

### Global Switch: Get Self Switch ID

- Command ID: `SwitchGetSelfSwitchID`
- Description: Gets the current ON/OFF value from a Self Switch and stores it onto a Global Switch.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| MapId:eval | Map ID | — | 0 | — | The map the source map. Use 0 for current map. You may use JavaScript code. |
| EventId:eval | Event ID | — | 0 | — | The ID of the source event. Use 0 for current event. You may use JavaScript code. |
| SwitchId:num | Switch ID | switch | 1 | — | The ID of the source switch. |
| Break | - | — | — | — | — |
| TargetSwitchId:num | Target Switch ID | switch | 1 | — | The ID of the target switch. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_GlobalVar`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Global Variable: Get Self Variable ID

- Command ID: `VariableGetSelfVariableID`
- Description: Gets the current stored value from a Self Variable and stores it onto a Global Variable.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| MapId:eval | Map ID | — | 0 | — | The map the source map. Use 0 for current map. You may use JavaScript code. |
| EventId:eval | Event ID | — | 0 | — | The ID of the source event. Use 0 for current event. You may use JavaScript code. |
| VariableId:num | Variable ID | variable | 1 | — | The ID of the source variable. |
| Break | - | — | — | — | — |
| TargetVariableId:num | Target Variable ID | variable | 1 | — | The ID of the target variable. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_MorphEvent`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Morph Event: Change

- Command ID: `MorphEventTo`
- Description: Runs the page of a different event remotely.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Step1 | Step 1: To Be Changed | — | — | — | — |
| Step1MapId:eval | Map ID | — | 0 | — | Target event's map. Use 0 for current map. You may use JavaScript code. |
| Step1EventId:eval | Event ID | — | 0 | — | The ID of the target event. Use 0 for current event. You may use JavaScript code. |
| Step2 | Step 2: Change Into | — | — | — | — |
| TemplateName:str | Template Name | — | Untitled | — | Name of the target event template to morph into. Ignored if this is called "Untitled". |
| Step2MapId:eval | Map ID | — | 1 | — | Target event's map. Use 0 for current map. You may use JavaScript code. |
| Step2EventId:eval | Event ID | — | 0 | — | The ID of the target event. Use 0 for current event. You may use JavaScript code. |
| Step2Preserve:eval | Preserve Morph | boolean | true | — | Is the morph effect preserved? Or does it expire upon leaving the map? @ -------------------------------------------------------------------------- |

### Morph Event: Remove

- Command ID: `MorphEventRemove`
- Description: Remove the morph status of an event.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| MapId:eval | Map ID | — | 0 | — | Target event's map. Use 0 for current map. You may use JavaScript code. |
| EventId:eval | Event ID | — | 0 | — | The ID of the event to remove morph from. Use 0 for current event. You may use JavaScript code. |
| RemovePreserve:eval | Remove Preservation | boolean | true | — | Also remove the preservation effect? @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_PlayerIcon`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Player Icon: Change

- Command ID: `PlayerIconChange`
- Description: Change the icon that appears on on the player.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| IconIndex:eval | Icon Index | — | 1 | — | Icon index used for the icon. You may use JavaScript code. |
| IconBufferX:eval | Buffer X | — | 0 | — | How much to shift the X position by? You may use JavaScript code. |
| IconBufferY:eval | Buffer Y | — | 12 | — | How much to shift the Y position by? You may use JavaScript code. |
| IconBlendMode:num | Blend Mode | select | 0 | 0 - Normal=0; 1 - Additive=1; 2 - Multiply=2; 3 - Screen=3 | What kind of blend mode do you wish to apply to the icon sprite? @ -------------------------------------------------------------------------- |

### Player Icon: Delete

- Command ID: `PlayerIconDelete`
- Description: Delete the icon that appears on the player. @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `Separator_PlayerMovement`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Player Movement: Control

- Command ID: `PlayerMovementChange`
- Description: Enable or disable player control over the player character's movement.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Enable:eval | Enable? | boolean | true | — | Let the player control where the player character moves? @ -------------------------------------------------------------------------- |

### Player Movement: Diagonal

- Command ID: `PlayerMovementDiagonal`
- Description: Override settings to for player diagonal movement.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Setting:str | Setting | select | default | Default: Whatever the Map Uses=default; Forcefully Disable Diagonal Movement=disable; Forcefully Enable Diagonal Movement=enable | How do you want to change diagonal movement? @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_SelfData`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Self Data: Reset All

- Command ID: `SelfDataResetAll`
- Description: Reset the Self Switch and Self Variable data of all events within the specified map.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| MapId:eval | Map ID | — | 0 | — | The map the target map. Use 0 for current map. You may use JavaScript code. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_SelfSwitch`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Self Switch: A B C D

- Command ID: `SelfSwitchABCD`
- Description: Change the Self Switch of a different event.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| MapId:eval | Map ID | — | 0 | — | The map the target map. Use 0 for current map. You may use JavaScript code. |
| EventId:eval | Event ID | — | 0 | — | The ID of the target event. Use 0 for current event. You may use JavaScript code. |
| Letter:str | Letter | select | A | A; B; C; D | Letter of the target event's Self Switch to change. |
| Break | - | — | — | — | — |
| Value:str | Value | select | ON | ON; OFF; Toggle | What value do you want to set the Self Switch to? @ -------------------------------------------------------------------------- |

### Self Switch: Switch ID

- Command ID: `SelfSwitchID`
- Description: Change the Self Switch of a different event.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| MapId:eval | Map ID | — | 0 | — | The map the target map. Use 0 for current map. You may use JavaScript code. |
| EventId:eval | Event ID | — | 0 | — | The ID of the target event. Use 0 for current event. You may use JavaScript code. |
| SwitchId:num | Switch ID | switch | 1 | — | The ID of the target switch. |
| Break | - | — | — | — | — |
| Value:str | Value | select | ON | ON; OFF; Toggle | What value do you want to set the Self Switch to? @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_SelfVar`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Self Variable: Variable ID

- Command ID: `SelfVariableID`
- Description: Change the Self Variable of a different event.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| MapId:eval | Map ID | — | 0 | — | The map the target map. Use 0 for current map. You may use JavaScript code. |
| EventId:eval | Event ID | — | 0 | — | The ID of the target event. Use 0 for current event. You may use JavaScript code. |
| VariableId:num | Variable ID | variable | 1 | — | The ID of the target variable. |
| Break | - | — | — | — | — |
| Operation:str | Operation | select | = | = Set==; + Add=+; - Subtract=-; * Multiply=*; / Divide=/; % Modulus=% | Set the operation used. |
| Break2 | - | — | — | — | — |
| Value:eval | Value | — | 0 | — | Insert the value to modify the Self Variable by. You may use JavaScript code. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_SpawnEvent`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Spawn Event: Spawn At X, Y

- Command ID: `SpawnEventAtXY`
- Description: Spawns desired event at X, Y location on the current map.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Step1 | Step 1: Spawned Event | — | — | — | — |
| TemplateName:str | Template Name | — | Untitled | — | Name of the target event template to spawn as. Ignored if this is called "Untitled". |
| MapId:eval | Map ID | — | 1 | — | Target event's map to be used as reference. You may use JavaScript code. |
| EventId:eval | Event ID | — | 1 | — | The ID of the target event to be used as reference. You may use JavaScript code. |
| Step2 | Step 2: Location | — | — | — | — |
| PosX:eval | X Coordinate | combo | $gamePlayer.frontX() | $gamePlayer.frontX(); $gamePlayer.backX(); Math.randomInt($gameMap.width()); 0 | Target Location to spawn at. You may use JavaScript code. |
| PosY:eval | Y Coordinate | combo | $gamePlayer.frontY() | $gamePlayer.frontY(); $gamePlayer.backY(); Math.randomInt($gameMap.height()); 0 | Target Location to spawn at. You may use JavaScript code. |
| Collision:eval | Check Event Collision | boolean | true | — | Check collision with any other events and player? |
| Passability:eval | Check Passability | boolean | true | — | Check passability of the target location. |
| Preserve:eval | Preserve Spawn | boolean | true | — | Is the spawned event preserved? Or does it expire upon leaving the map? |
| Step3 | Step 3: Success Check | — | — | — | — |
| SuccessSwitchId:num | Success Switch ID | switch | 0 | — | Target switch ID to record spawning success. Ignore if ID is 0. OFF means failed. ON means success. @ -------------------------------------------------------------------------- |

### Spawn Event: Spawn At Region

- Command ID: `SpawnEventAtRegion`
- Description: Spawns desired event at a random region-marked location on the current map.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Step1 | Step 1: Spawned Event | — | — | — | — |
| TemplateName:str | Template Name | — | Untitled | — | Name of the target event template to spawn as. Ignored if this is called "Untitled". |
| MapId:eval | Map ID | — | 1 | — | Target event's map. You may use JavaScript code. |
| EventId:eval | Event ID | — | 1 | — | The ID of the target event. You may use JavaScript code. |
| Step2 | Step 2: Location | — | — | — | — |
| Region:arraynum | Region ID(s) | number\[\] | \["1"\] | — | Pick region(s) to spawn this event at. |
| Collision:eval | Check Event Collision | boolean | true | — | Check collision with any other events and player? |
| Passability:eval | Check Passability | boolean | true | — | Check passability of the target location. |
| Preserve:eval | Preserve Spawn | boolean | true | — | Is the spawned event preserved? Or does it expire upon leaving the map? |
| Step3 | Step 3: Success Check | — | — | — | — |
| SuccessSwitchId:num | Success Switch ID | switch | 0 | — | Target switch ID to record spawning success. Ignore if ID is 0. OFF means failed. ON means success. @ -------------------------------------------------------------------------- |

### Spawn Event: Spawn At Terrain Tag

- Command ID: `SpawnEventAtTerrainTag`
- Description: Spawns desired event at a random terrain tag-marked location on the current map.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Step1 | Step 1: Spawned Event | — | — | — | — |
| TemplateName:str | Template Name | — | Untitled | — | Name of the target event template to spawn as. Ignored if this is called "Untitled". |
| MapId:eval | Map ID | — | 1 | — | Target event's map. You may use JavaScript code. |
| EventId:eval | Event ID | — | 1 | — | The ID of the target event. You may use JavaScript code. |
| Step2 | Step 2: Location | — | — | — | — |
| TerrainTags:arraynum | Terrain Tag(s) | number\[\] | \["1"\] | — | Pick terrain tag(s) to spawn this event at. Insert numbers between 0 and 7. |
| Collision:eval | Check Event Collision | boolean | true | — | Check collision with any other events and player? |
| Passability:eval | Check Passability | boolean | true | — | Check passability of the target location. |
| Preserve:eval | Preserve Spawn | boolean | true | — | Is the spawned event preserved? Or does it expire upon leaving the map? |
| Step3 | Step 3: Success Check | — | — | — | — |
| SuccessSwitchId:num | Success Switch ID | switch | 0 | — | Target switch ID to record spawning success. Ignore if ID is 0. OFF means failed. ON means success. @ -------------------------------------------------------------------------- |

### Spawn Event: Despawn Event ID

- Command ID: `SpawnEventDespawnEventID`
- Description: Despawns the selected Event ID on the current map.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| EventID:eval | Event ID | combo | $gameMap.lastSpawnedEventID() | $gameMap.firstSpawnedEventID(); $gameMap.lastSpawnedEventID(); 1001 | The ID of the target event. You may use JavaScript code. @ -------------------------------------------------------------------------- |

### Spawn Event: Despawn At X, Y

- Command ID: `SpawnEventDespawnAtXY`
- Description: Despawns any spawned event(s) at X, Y location on the current map.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PosX:eval | X Coordinate | combo | $gamePlayer.frontX() | $gamePlayer.frontX(); $gamePlayer.backX(); Math.randomInt($gameMap.width()); 0 | Target Location to despawn at. You may use JavaScript code. |
| PosY:eval | Y Coordinate | combo | $gamePlayer.frontY() | $gamePlayer.frontY(); $gamePlayer.backY(); Math.randomInt($gameMap.height()); 0 | Target Location to despawn at. You may use JavaScript code. @ -------------------------------------------------------------------------- |

### Spawn Event: Despawn Region(s)

- Command ID: `SpawnEventDespawnRegions`
- Description: Despawns the selected Region(s) on the current map.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Region:arraynum | Region ID(s) | number\[\] | \["1"\] | — | Pick region(s) and despawn everything inside it. @ -------------------------------------------------------------------------- |

### Spawn Event: Despawn Terrain Tag(s)

- Command ID: `SpawnEventDespawnTerrainTags`
- Description: Despawns the selected Terrain Tags(s) on the current map.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| TerrainTags:arraynum | Terrain Tag(s) | number\[\] | \["1"\] | — | Pick terrain tag(s) and despawn everything inside it. Insert numbers between 0 and 7. @ -------------------------------------------------------------------------- |

### Spawn Event: Despawn Everything

- Command ID: `SpawnEventDespawnEverything`
- Description: Despawns all spawned events on the current map. @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `Separator_End`
- Description: - @ -------------------------------------------------------------------------- @ ========================================================================== @ Plugin Parameters @ ==========================================================================

No arguments are declared.

## Public behavior, notetags, text codes, and script surface

```text
Introduction

The Events & Movement Core plugin adds a lot of new functionality in terms
of event flexibility and movement options to RPG Maker MZ. These range from
adding in old capabilities from previous iterations of RPG Maker to more
mainstream techniques found in other game engines. Movement options are also
expanded to support 8-directional movement as well as sprite sheets provided
that the VisuStella 8 format is used.

Features include all (but not limited to) the following:

* Event commands expanded upon to include old and new functions.
* Event templates for Copying Events, Morphing Events, and Spawning Events.
* 8-directional movement option available and sprite sheet support.
* Aesthetics for tilting the sprite when dashing and having shadows below.
* Pathfinding support for event movement through custom Move Route commands.
* Advanced switches and variable support to run code automatically.
* Turn regular Switches and Variables into Self Switches and Self Variables.
* Put labels and icons over events.
* Allow numerous ways to trigger events, through clicking, proximity, or by
usage of Regions.
* Change the hitbox sizes of events to larger in any direction.
* Synchronize event movement options to move when player/other events move.
* The ability for the player to turn in place.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Tier 1 ------

This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

Features: Advanced Switches and Variables

Switches and variables can now run JavaScript code and return values
instantly. While at first glance, this may seem no different from using
the Control Variables event command's Script option, this can be used to
instantly set up Switch and/or Variable conditions for Parallel Common
Events, Event Page Conditions, Enemy Skill Conditions, and Troop Page
Conditions instantly without needing to make an event command to do so.

---

<JS> code </JS>
- Used for: Switch and Variable names
- Replace 'code' with JavaScript code on what value to return.

---

NOTE: Tagged Switches/Variables are mutually exclusive from one another.
You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.

Features: Self Switches and Variables

RPG Maker MZ by default has 4 Self Switches: A, B, C, D. For some types of
games, this isn't enough. This plugin gives you the ability convert regular
Switches into Self Switches so you could have more.

Self Variables also do not exist in RPG Maker MZ by default. Just like with
Switches, you can turn regular Variables into Self Variables.

---

<Self>
- Used for: Switch and Variable names
- Converts the Switch/Variable into a Self Switch/Variable.

---

After, just use them like you would for normal Switches and Variables in an
event's page conditions. If the <Self> tag is present inside the Switch or
Variable's name, then it will use data unique to only that event.

NOTE: Tagged Switches/Variables are mutually exclusive from one another.
You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.

---

If you need to use a script call to get a Self Switch or Self Variable's
value, you can use the following script calls.

---

Get Self Switch Values:

getSelfSwitchValue(mapID, eventID, switchID)
- Replace 'mapID' with the map ID the target event is located on.
- Replace 'eventID' with the ID of the target event.
- Replace 'switchID' with the ID number if it is a Self Switch made with
<Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
- This will return the true/false value of the Self Switch.
- Example: getSelfSwitchValue(12, 34, 56)
- Example: getSelfSwitchValue(12, 34, 'B')

---

Get Self Variable Values:

getSelfVariableValue(mapID, eventID, variableID)
- Replace 'mapID' with the map ID the target event is located on.
- Replace 'eventID' with the ID of the target event.
- Replace 'variableID' with the ID number of the Self Variable.
- This will return whatever stored value is found in the Self Variable.
- Example: getSelfVariableValue(12, 34, 56)

---

Set Self Switch Values:

setSelfSwitchValue(mapID, eventID, switchID, value)
- Replace 'mapID' with the map ID the target event is located on.
- Replace 'eventID' with the ID of the target event.
- Replace 'switchID' with the ID number if it is a Self Switch made with
<Self> or a capital letter surrounded by quotes if it's A, B, C, or D.
- Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
Do not use quotes.
- This will change the Self Switch's value to true/false.
- Example: setSelfSwitchValue(12, 34, 56, false)
- Example: setSelfSwitchValue(12, 34, 'B', true)

---

Set Self Variable Values:

setSelfVariableValue(mapID, eventID, variableID, value)
- Replace 'mapID' with the map ID the target event is located on.
- Replace 'eventID' with the ID of the target event.
- Replace 'variableID' with the ID number of the Self Variable.
- Replace 'value' with the value you want to set the Self Variable to.
- Example: setSelfVariableValue(12, 34, 56, 88888)

---

---

Features: Map Switches and Variables

Similar to Self Switches and Self Variables, Map Switches and Map Variables
are switches and variables that retain data based on the map the player is
currently located in. In other words, they're self switches and variables
but for maps instead!

These features do not exist in RPG Maker MZ by default. Just like with the
Self Switches and Self Variables, you can turn regular Switches or Variables
into Map Switches and Map Variables using the following name tag:

---

<Map>
- Used for: Switch and Variable names
- Converts the Switch/Variable into a Map Switch/Variable.

---

After, just use them like you would for normal Switches and Variables in an
event's page conditions. If the <Map> tag is present inside the Switch or
Variable's name, then it will use data unique to only that map.

NOTE: Tagged Switches/Variables are mutually exclusive from one another.
You cannot tag them with <JS>, <Self>, <Map>, or <Global> simultaneously.

---

If you need to use a script call to get a Map Switch or Map Variable's
value, you can use the following script calls:

---

Get Map Switch Values:

getMapSwitchValue(mapID, switchID)
- Replace 'mapID' with the map ID the switch is located on.
- Replace 'switchID' with the ID number of the switch to get data.
- Example: getMapSwitchValue(4, 20)

---

Get Variable Switch Values:

getMapVariableValue(mapID, variableID)
- Replace 'mapID' with the map ID the switch is located on.
- Replace 'variableID' with the ID number of the variable to get data.
- Example: getMapVariableValue(6, 9)

---

Set Map Switch Values:

setMapSwitchValue(mapID, switchID, value)
- Replace 'mapID' with the map ID the switch is located on.
- Replace 'switchID' with the ID number of the switch to get data.
- Replace 'value' with either 'true' or 'false' for ON/OFF respectively.
Do not use quotes.
- Example: setMapSwitchValue(4, 20, true)
- Example: setMapSwitchValue(6, 9, false)

---

Set Map Variable Values:

setMapVariableValue(mapID, variableID, value)
- Replace 'mapID' with the map ID the switch is located on.
- Replace 'variableID' with the ID number of the variable to get data.
- Replace 'value' with the value you want to set the Map Variable to.
- Example: setMapVariableValue(6, 9, 420)

---

---

Features: Character Sprite Filename Tags

For the files located inside of your project's /img/characters/ folder, if
the filenames themselves have specific "tags" in them, special properties
will be applied to them. These tags can be combined together with a few
exceptions.

Some of these are new to VisuStella MZ, while others are default to MZ.

---

!filename.png
- Tag: !
- Causes this character's sprite to align with the tile grid instead of
being lifted a few pixels higher.
- This is primarily used for things like doors, chests, and floor plates.
- Default to RPG Maker MZ.

---

$filename.png
- Tag: $
- Causes this character's sprite to use the "big character" format.
- Primarily used for sprites like the big monsters and such which only
have 3x4 cells as opposed to 12x8 cells that regular sprite sheets have.
- Cannot be combined with the [VS8] tag.
- Default to RPG Maker MZ.

---

filename[Invisible].png
- Tag: [Invisible] or [Inv]
- This character's sprite will become invisible on the map screen in-game
while almost everything else about it is visible.
- This is used for those who wish to use sprite labels for things such as
autorun and parallel events.

---

filename[VS8].png
- Tag: [VS8]
- Converts this sprite into a VisuStella-Style 8-Direction Sprite Sheet.
- Refer to the section below.
- Cannot be combined with the $ tag.

---

Features: VisuStella-Style 8-Directional Sprite Sheets

This plugin provides support for the VisuStella-Style 8-Directional Sprite
Sheets, also know as VS8. VS8 sprite sheets offer support for walking
frames, dashing frames, carrying frames, and emotes.

---

To designate a sprite sheet as VS8, simply add [VS8] to the filename.
Something like Actor1.png would become Actor1_[VS8].png.

---

VS8 sprites are formatted as such. Each block below is a set of 3 frames.

Walk Down    Walk DL     Dash Down   Dash DL
Walk Left    Walk DR     Dash Left   Dash DR
Walk Right   Walk UL     Dash Right  Dash UL
Walk Up      Walk UR     Dash Up     Dash UR

Carry Down   Carry DL    Ladder      Emotes 3
Carry Left   Carry DR    Rope        Emotes 4
Carry Right  Carry UL    Emotes 1    Emotes 5
Carry Up     Carry UR    Emotes 2    Emotes 6

---

Here are how each of the emote sets are grouped from left to right.

Emotes 1: Item, Hmph, Victory
Emotes 2: Hurt, Kneel, Collapse
Emotes 3: !, ?, Music Note
Emotes 4: Heart, Anger, Sweat
Emotes 5: Cobweb, ..., Light Bulb
Emotes 6: Sleep0, Sleep1, Sleep2

---

Features: Weighted Random Movement

When creating events to place on the map, you can determine what type of
autonomous movement the event will have. When selecting "Random", the event
will move randomly across the map.

However, with the way "Random" movement works with the RPG Maker MZ default
code, the event is more likely to hit a wall and then hug the said wall as
it maps laps around the map's outer borders making it feel very unnatural
for any player who's been on the map long enough.

This is where "Weighted Random Movement" comes in. It changes up the random
movement behavior to function where the farther the event is, the more
likely the event is to step back towards its "home" position (aka where it
spawned upon loading the map). This is so that a housewife NPC doesn't
suddenly wander off into the middle of an army's training grounds on the
same town map.

The event will stay closer to its home value depending on how high the
weight's value is. There are a number of ways to adjust the weighted value.

---

Plugin Parameters > Movement > Event Movement > Random Move Weight

This Plugin Parameter setting allows you to set the default weight for all
events with "Random" autonomous movement. It is set at a default value of
0.10 to give the event an understandable degree of freedom.

Lower numbers give events more freedom to move. Larger numbers will make the
events stick closer to home.

Change this value to 0 to disable it.

---

You can customize this individually per event by using Notetags and/or
Comment Tags for the events.

<Random Move Weight: x>

- Used for: Event Notetags and Event Page Comment Tags
- If this tag is used on an event with random-type autonomous movement, then
the event will stick closer to their home location (where they are located
upon spawning on the map). How close they stick to their home location
will depend on the weighted 'x' value.
- Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
event more freedom when moving randomly while numbers closer to 1 cause
the event to stick closer to their home position.

<True Random Move>

- Used for: Event Notetags and Event Page Comment Tags
- If this tag is used on an event with random-type autonomous movement, then
that event will ignore the effects of weighted randomized movement.

---

Notetags and Comment Tags

The following are notetags that have been added through this plugin. These
notetags will not work with your game if this plugin is OFF or not present.

Some of these are comment tags. Comment tags are used for events to mark and
affect individual event pages rather than the whole event.

=== Map Notetags ===

The following notetags are used for maps only. While some of these options
are also available in the Plugin Parameters, some of these notetags extend
usage to specific maps marked by these notetags as well.

---

<Diagonal Movement: On>
<Diagonal Movement: Off>

- Used for: Map Notetags
- Turns on/off diagonal movement for those maps.
- If notetag isn't present, use Plugin Parameter setting.

---

<type Allow Region: x>
<type Allow Region: x, x, x>

<type Forbid Region: x>
<type Forbid Region: x, x, x>

<type Dock Region: x>
<type Dock Region: x, x, x>

- Used for: Map Notetags
- Replace 'type' with 'All', 'Walk', 'Player', 'Event', 'Vehicle', 'Boat',
'Ship', or 'Airship'.
- 'Allow' notetag variants allow that type to pass through them no matter
what other passability settings are in place.
- 'Forbid' notetag variants forbid that type from passing through at all.
- 'Dock' notetag variants allow vehicles to dock there. Boats and ships must
face the region direction while airships must land directly on top.

---

<Map Load Common Event: x>
<Map Load Common Events: x, x, x>

- Used for: Map Notetags
- When this map is loaded, run the specified Common Events once available.
- Does NOT trigger if you transfer to a different part of the same map.
- Replace 'x' with a number representing the ID of the Common Event you wish
to reserve and run once ready.

---

<Save Event Locations>

- Used for: Maps Notetags
- Saves the locations of all events on the map so that when you return to
that map at a later point, the events will be in the position they were
last in.

---

<Hide Player>
<Show Player>

- Used for: Map Notetags
- Forcefully hides or shows the player sprite. This is so you don't need to
manually turn the setting on/off each time you enter a specific map.
- These settings will take priority over the event commands.
- If the player sprite is hidden, so are the player's followers.
- If the player sprite is visible, the player's followers will still depend
on their settings.
- These notetags are mutually exclusive from each other.

---

<Hide Followers>
<Show Followers>

- Used for: Map Notetags
- Forcefully hides or shows the player's followers. This is so you don't
need to manually turn them on/off each time you enter a specific map.
- These settings will take priority over the event commands.
- These notetags are mutually exclusive from each other.

---

=== Page Comment Tags ===

The following comment tags are to be put inside of the pages of events,
troops, and common events for them to work!

---

<Page Conditions>
conditions
conditions
conditions
</Page Conditions>

- Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
- This allows you to create custom page conditions that utilize the
Conditional Branch event command to see if the additional page conditions
are met.

---

<Conditions Met>
- Used for: Map Event Page, Troop Page, and Common Event Page Comment Tags
- If used between the <Page Conditions> and </Page Conditions> comment tag,
upon reaching this part of event command list, the custom page conditions
will be considered met.

---

Example:

◆Comment：<Page Conditions>
◆If：Reid has equipped Potion Sword
◆Comment：If Reid has equipped the Potion Sword
：       ：<Condition Met>
◆
：End
◆Comment：</Page Conditions>

If Reid has the "Potion Sword" weapon equipped, then the additional custom
page conditions are met and the event page will be present/active.

If this is a troop condition, the troop page event will activate.

If this is a common event, there will be a parallel common event active.

---

=== Event and Event Page Notetags ===

The following notetags have comment tag variants (with a few exceptions).
If a notetag is used for an event, it will affect the event constantly.
If a comment tag is used, it will only affect the page the comment tag is
on and only that page.

---

<Activation Region: x>
<Activation Regions: x,x,x>

- Used for: Event Notetags and Event Page Comment Tags
- Allows this event to be remotely activated as long as the player is
standing within a tile marked by a designated region.
- Replace 'x' with the regions you wish to remotely activate this event in.
- Action Button: Player must press OK while being in the region.
- Player/Event Touch: Player must step onto the region.
- Autorun/Parallel: Player be in the region.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.
- NOTE: This cannot be used with any other activation tags.

---

<Activation Square: x>
<Activation Circle: x>
<Activation Delta: x>
<Activation Row: x>
<Activation Column: x>

- Used for: Event Notetags and Event Page Comment Tags
- Allows this event to be remotely activated as long as the player is
within range of its activation type.
- Replace 'x' with a number stating the range in tiles.
- Square: A square-shaped range with the event at the center.
- Circle: A circle-shaped range with the event at the center.
- Delta: A diamond-shaped range with the event at the center.
- Row: Spans horizontally across the map. 'x' expands up and down.
- Column: Spans vertically across the map. 'x' expands left and right.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.
- NOTE: This cannot be used with any other activation tags.

---

<Always Update Movement>

- Used for: Event Notetags and Event Page Comment Tags
- Events normally have to be within screen range for them to update their
self movement. If this tag is present, the event is always updating.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.

---

<Click Trigger>

- Used for: Event Notetags and Event Page Comment Tags
- Allows this event to activate upon being clicked on with the mouse.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.

---

<Copy Event: Map x, Event y>
<Copy Event: x, y>

<Copy Event: template>

- Used for: Event Notetags ONLY
- Makes this event copy all of the event settings from a different event
that can be found on a different map (as long as that map is registered
inside of Plugin Parameters => Event Template Settings => Preloaded Maps).
- Replace 'x' with a number representing the copied event's Map ID.
- If '0' is used for the Map ID, reference the current map.
- Replace 'y' with a number representing the copied event's Event ID.
- For the 'template' variant, replace 'template' with the name of the
template made in Plugin Parameters => Event Template Settings =>
Event Template List.
- If this is placed in a notetag, the effect will be present across
all event pages used.

---

<Custom Z: x>

- Used for: Event Notetags and Event Page Comment Tags
- Replace 'x' with a number value to determine the event sprite's Z value
relative to the tilemap.
- For reference from rmmz_core.js:
- 0 : Lower tiles
- 1 : Lower characters
- 3 : Normal characters
- 4 : Upper tiles
- 5 : Upper characters
- 6 : Airship shadow
- 7 : Balloon
- 8 : Animation
- 9 : Destination
- You can use numbers below 0 and above 9.
- Values under 0 go below the tilemap.
- Values above 9 go above everything else on the tilemap.
- These values do NOT go below or above other screen objects that are
NOT attached to the tilemap layer such as parallaxes or weather or
windows because that's simply not how z-axis work with sprite layers.

---

<Encounter Half Square: x>
<Encounter Half Circle: x>
<Encounter Half Delta: x>
<Encounter Half Row: x>
<Encounter Half Column: x>

- Used for: Event Notetags and Event Page Comment Tags
- If the player is within the 'x' area effect of this event, the random
encounter rate will be halved.
- Replace 'x' with a number stating the range in tiles.
- Square: A square-shaped range with the event at the center.
- Circle: A circle-shaped range with the event at the center.
- Delta: A diamond-shaped range with the event at the center.
- Row: Spans horizontally across the map. 'x' expands up and down.
- Column: Spans vertically across the map. 'x' expands left and right.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.

Script Call Check:

$isTileEncounterHalf(x, y)

- This can be used to check if a certain map tile (x, y) has an encounter
rate halving effect on it.
- Returns a boolean (true or false) when used.

---

<Encounter None Square: x>
<Encounter None Circle: x>
<Encounter None Delta: x>
<Encounter None Row: x>
<Encounter None Column: x>

- Used for: Event Notetags and Event Page Comment Tags
- If the player is within the 'x' area effect of this event, the random
encounter rate will be suppressed completely.
- Replace 'x' with a number stating the range in tiles.
- Square: A square-shaped range with the event at the center.
- Circle: A circle-shaped range with the event at the center.
- Delta: A diamond-shaped range with the event at the center.
- Row: Spans horizontally across the map. 'x' expands up and down.
- Column: Spans vertically across the map. 'x' expands left and right.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.

Script Call Check:

$isTileEncounterNone(x, y)

- This can be used to check if a certain map tile (x, y) has an encounter
rate suppression effect on it.
- Returns a boolean (true or false) when used.

---

<Erase if Encounter Half>
<Erase if Encounter None>

- Used for: Event Notetags ONLY
- Automatically erase this event if the player's party has an encounter half
or encounter none effect, or if the event has spawned in an encounter half
or encounter none area.
- This check only occurs in two situations: when the map is first loaded
after being teleported into or when the player leaves a menu and returns
back to the map.
- Events that have been erased due to this effect will NOT return even if
the encounter half/none effect is removed while the player is still on the
map. The event will return if the player exits the map and comes back.

---

<Exit Reset Self Data>

- Used for: Event Notetags ONLY
- When the player leaves the current map, all Self Switches and Self
Variables related to this event will be reset.

---

<Hitbox Left: x>
<Hitbox Right: x>
<Hitbox Up: x>
<Hitbox Down: x>

- Used for: Event Notetags and Event Page Comment Tags
- Replace 'x' with a number to extend the hitbox of the event by that many
tiles towards the listed direction.
- Use multiples of this notetag to extend them to different directions.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.

---

<Icon: x>

- Used for: Event Notetags and Event Page Comment Tags
- Replace 'x' with the Icon ID you wish to put above this event.
- This will not override any Icons designated to the ID through a
Plugin Command.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.

---

<Icon Buffer X: +x>
<Icon Buffer X: -x>

<Icon Buffer Y: +x>
<Icon Buffer Y: -x>

<Icon Buffer: +x, +y>
<Icon Buffer: -x, -y>

- Used for: Event Notetags and Event Page Comment Tags
- Allows you to adjust the positions of the icon on the envent by buffers.
- Replace 'x' and 'y' with the values to adjust the position buffers by.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.

---

<Label: text>

- Used for: Event Notetags and Event Page Comment Tags
- Puts a label over the event's head displaying 'text'.
- Text codes can be used.
- If text codes are used, avoid text codes that use < and > wrappers.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.

---

<Label>
text
text
</Label>

- Used for: Event Notetags and Event Page Comment Tags
- Puts a label over the event's head displaying 'text'.
- This can display multiple lines.
- Text codes can be used.
- You can use text codes with < and > wrappers.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.

---

<Label Range: x>

- Used for: Event Notetags and Event Page Comment Tags
- Sets a range requirement for the player to be in order for the event's
label to appear.
- Replace 'x' with a number value depicting the range in tiles.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.
- If this tag is not used, refer to the default plugin parameter settings.

---

<Label Range Type: Square>
<Label Range Type: Circle>
<Label Range Type: Diamond>

- Used for: Event Notetags and Event Page Comment Tags
- Sets a range type for the label to appear visible for.
- Square: A square-shaped range with the event at the center.
- Circle: A circle-shaped range with the event at the center.
- Diamond: A diamond-shaped range with the event at the center.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.
- If this tag is not used, refer to the default plugin parameter settings.

---

<Label Offset X: +x>
<Label Offset X: -x>

<Label Offset Y: +x>
<Label Offset Y: -x>

<Label Offset: +x, +y>
<Label Offset: -x, -y>

- Used for: Event Notetags and Event Page Comment Tags
- Allows you to adjust the positions of the label on the envent by offsets.
- Replace 'x' and 'y' with the values to adjust the position offsets by.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.

---

<Label Hue Shift: +x>
<Label Hue Shift: -x>

- Used for: Event Notetags and Event Page Comment Tags
- Changes the hue of the event label by +x or -x every frame.
- Keep in mind that since this is changing hue, this will appear to have
no effect if you are using black and white labels.
- Use labels with text codes that add color to them like '\C[4]text'
- This only works with the sprite version of event labels and does not work
with the legacy version.

---

<Location X: +x>
<Location X: -x>

<Location Y: +x>
<Location Y: -x>

<Location: +x, +y>
<Location: +x, -y>
<Location: -x, +y>
<Location: -x, -y>

- Used for: Event Notetags and Event Page Comment Tags
- Adjusts the initial location of this event by +x and +y (or -x and -y).
- This allows you to stack events on top of each other or even move them to
various places of the map.
- Replace 'x' with a number that represents the horizontal tiles to adjust
the initial starting location by.
- Replace 'y' with a number that represents the vertical tiles to adjust
the initial starting location by.

---

<Mirror Sprite>

- Used for: Event Notetags and Event Page Comment Tags
- The event sprite's visual appearance is mirrored.

---

<Move Only Region: x>
<Move Only Regions: x,x,x>

- Used for: Event Notetags and Event Page Comment Tags
- Sets the move range of this event to only the region(s) marked by the
notetag(s) or comment tag(s).
- This will bypass terrain passability.
- This will not bypass event collision.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.

---

<Move Synch Target: Player>

<Move Synch Target: Event x>

- Used for: Event Notetags and Event Page Comment Tags
- Synchronizes the movement of this event with a target (either the player
or another event). This event will only move whenever the synchronized
target moves.
- For 'Event x' variant, replace 'x' with the ID of the event to synch to.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.

---

<Move Synch Type: Random>
<Move Synch Type: Approach>
<Move Synch Type: Away>
<Move Synch Type: Custom>

<Move Synch Type: Mimic>
<Move Synch Type: Reverse Mimic>

<Move Synch Type: Mirror Horizontal>
<Move Synch Type: Mirror Vertical>

- Used for: Event Notetags and Event Page Comment Tags
- Choose the type of movement the event will have if it is synchronized to
a target.
- Random: Move to a random position.
- Approach: Approaches target.
- Away: Flees from target.
- Custom: Follows a custom move route.
- Mimic: Imitates the target's movement style.
- Reverse Mimic: Does the opposite of the target's movement.
- Mirror Horizontal: Moves as if a mirror is placed horizontally.
- Mirror Vertical: Moves as if a mirror is placed vertically.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.

---

<Move Synch Delay: x>

- Used for: Event Notetags and Event Page Comment Tags
- If this tag is present, the event will wait a bit after each move before
moving again.
- Replace 'x' with the number of movement instances in between.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.

---

<Move Synch Distance Opacity: x>

- Used for: Event Notetags and Event Page Comment Tags
- Changes the opacity of the event based on the distance between it and its
move synched target. Closer means more opaque. Further away means more
transparent.
- Replace 'x' with a number representing the opacity change per pixel
distance away. 'x' can use decimal values like 1.05 and 1.5.

---

<Picture Filename: filename>

- Used for: Event Notetags and Event Page Comment Tags
- Applies a picture graphic from the /img/pictures/ folder of your project.
- This graphic will be on top of the character sprite but below the event
icon sprite.
- The picture priority will be the same as the event's priority.
- If it is "below characters", the player can walk on top of it.
- If it is "above characters", the player will behind it.
- If it is "same as characters", the priority will be based on the
current relative Y position. This also means, if the picture is big
enough, it can clip into the top of tree tiles and such.
- Replace 'filename' with a filename from the game project's /img/pictures/
folder. This is case sensitive. Do NOT include the file extension.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.

---

<Picture Type: Enemy>
<Picture Type: SV Enemy>

- Used for: Event Notetags and Event Page Comment Tags
- Used with <Picture Filename: filename> notetag.
- Will use /img/enemies/ or /img/sv_enemies/ instead of /img/pictures/ to
grab a picture graphic from.
- Other picture graphic sprite related notetags will apply as normal.

---

<Picture Max Size: x>
<Picture Scale: y%>

- Used for: Event Notetags and Event Page Comment Tags
- Used with <Picture Filename: filename> notetag.
- If the "Max Size" or "Scale" supplementary notetags are used, the picture
graphic will be scaled proportionally to fit either the exact pixel size
for "Max Size" or the "Scale" ratio.
- Both the "Max Size" and "Scale" notetags require the "Filename" notetag.
- Replace 'x' with a number value representing the exact pixel size for the
"Max Size" notetag.
- Replace 'y' with a number value representing the scale on which to shrink
or enlarge the picture. 100% is normal size. 50% is half size. 200% is
double size.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.

---

<Picture Offset X: +x>
<Picture Offset X: -x>

<Picture Offset Y: +x>
<Picture Offset Y: -x>

<Picture Offset: +x, +y>
<Picture Offset: -x, -y>

- Used for: Event Notetags and Event Page Comment Tags
- Used with <Picture Filename: filename> notetag.
- Offsets the X and Y position of the event picture relative to the event
sprite's own position.
- Replace 'x' and 'y' with numbers indicating the offset in pixels.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.

---

<Picture Wait Frames: x>

- Used for: Event Notetags and Event Page Comment Tags
- Used with <Picture Filename: filename> notetag.
- Requires VisuMZ_4_AnimatedPictures!
- "Wait Frames" is used with VisuMZ's Animated Pictures plugin. This
determines the delay inbetween frame changes.
- Replace 'x' with a number representing the amount of frames to wait
inbetween frame changes.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.

---

<Playtest>

- Used for: Event Notetags.
- This does NOT work when it's in the Event Page Comment Tags.
- If this notetag is found in the event's notebox (NOT comments), then the
event will only appear during a playtest session. It will not appear in a
deployed game where the playtest flag is not on.

---

<Random Move Weight: x>

- Used for: Event Notetags and Event Page Comment Tags
- If this tag is used on an event with random-type autonomous movement, then
the event will stick closer to their home location (where they are located
upon spawning on the map). How close they stick to their home location
will depend on the weighted 'x' value.
- Replace 'x' with a number between 0 and 1. Numbers closer to 0 give the
event more freedom when moving randomly while numbers closer to 1 cause
the event to stick closer to their home position.

---

<True Random Move>

- Used for: Event Notetags and Event Page Comment Tags
- If this tag is used on an event with random-type autonomous movement, then
that event will ignore the effects of weighted randomized movement.

---

<Save Event Location>

- Used for: Event Notetags ONLY
- Saves the locations of the event on the map so that when you return to
that map at a later point, the event will be in the position it was
last in.

---

<Hide Shadow>
- Used for: Event Notetags and Event Page Comment Tags
- Hides the shadow for the event.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.

---

<Scale: x%>

<Scale X: x%>
<Scale Y: y%>

- Used for: Event Notetags and Event Page Comment Tags
- Changes the scale of the sprite to the designated size.
- For <Scale: x%> variant: replace 'x' with a number representing the
scaling overall percentage to be used.
- For <Scale X: x%> variant, replace 'x' with a number representing the x
factor for the horizontal scaling percentage to be used.
- For <Scale Y: y%> variant, replace 'y' with a number representing the y
factor for the vertical scaling percentage to be used.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.

---

<Shadow Filename: filename>

- Used for: Event Notetags and Event Page Comment Tags
- Replaces the shadow graphic used with 'filename' found in the
img/system/ project folder.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.

---

<Sprite Offset X: +x>
<Sprite Offset X: -x>

<Sprite Offset Y: +x>
<Sprite Offset Y: -x>

<Sprite Offset: +x, +y>
<Sprite Offset: -x, -y>

- Used for: Event Notetags and Event Page Comment Tags
- Changes how much the event's sprite is visibly offset by.
- Replace 'x' and 'y' with numbers indicating the offset in pixels.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.

---

<Step Pattern: Left to Right>
<Step Pattern: Right to Left>

<Step Pattern: Spin Clockwise>
<Step Pattern: Spin CW>

<Step Pattern: Spin CounterClockwise>
<Step Pattern: Spin CCW>
<Step Pattern: Spin AntiClockwise>
<Step Pattern: Spin ACW>

- Used for: Event Notetags and Event Page Comment Tags
- Changes the way the event animates if a tag is present.
- Left to Right: Makes the event sprite's step behavior go from frame 0 to
1 to 2, then back to 0 instead of looping backward.
- Right to Left: Makes the event sprite's step behavior go from frame 2 to
1 to 0, then back to 2 instead of looping forward.
- Spin Clockwise: Makes the event sprite's step behavior spin CW.
- Spin CounterClockwise: Makes the event sprite's step behavior spin CCW.
- If this is placed in a notetag, the effect will be present across
all event pages used.
- If this is placed inside a page's comment, the effect will only occur
if that event page is currently active.

---

<Tile Expand Up: x>
<Tile Expand Down: x>
<Tile Expand Left: x>
<Tile Expand Right: x>

- Used for: Event Notetags and Event Page Comment Tags
- Used for events with tile graphics. Expands the graphic up, down, left, or
right from the spritesheet.
- This does NOT expand the hitbox.
- The graphic will be anchored to the tile it's expanded from. This means
even if you expanded downward, the actual event's position will still be
the current event's X/Y coordinates. It's just grown more vertically and
is still centered horizontally.
- This is primarily used to save on having to use too many events for tiles
that expanded past 1x1 tile sizes.

---

Plugin Commands

The following are Plugin Commands that come with this plugin. They can be
accessed through the Plugin Command event command.

---

=== Auto Movement Plugin Commands ===

---

Auto Movement: Events
- Allow/stop events from auto movement.

Value:
- Allow events to move automatically?

---

=== Call Event Plugin Commands ===

---

Call Event: Remote Read
- Runs the page of a different event remotely.
- This will run the page of the target event on the CURRENT event.
- This means that any "This Event" commands will be applied to the event
using this Plugin Command and NOT the target event that page data is being
retrieved from.
- Think of it as the current event using the target called event as a
Common Event ala how RPG Maker 2003 works (for those familiar with it).

Map ID:
- Target event's map. Use 0 for current map.
- You may use JavaScript code.

Event ID:
- The ID of the event to remotely run.
- Use 0 for current event.
- You may use JavaScript code.

Page ID:
- The page of the remote event to run.
- You may use JavaScript code.

---

=== Dash Plugin Commands ===

---

Dash Enable: Toggle
- Enable/Disable Dashing on maps.

Value:
- What do you wish to change dashing to?

---

=== Event Icon Plugin Commands ===

---

Event Icon: Change (Temporary)
- Change the icon that appears on an event.
- This change is temporary and resets upon new events.

Map ID:
- The map the target map. Use 0 for current map.
- You may use JavaScript code.

Event ID:
- The ID of the target event.
- Use 0 for current event.
- You may use JavaScript code.

Icon Index:
- Icon index used for the icon.
- You may use JavaScript code.

Buffer X:
- How much to shift the X position by?
- You may use JavaScript code.

Buffer Y:
- How much to shift the Y position by?
- You may use JavaScript code.

Blend Mode:
- What kind of blend mode do you wish to apply to the icon sprite?

---

Event Icon: Change (Forced)
- Change the icon that appears on an event.
- This change is forced and needs to be restored.

Map ID:
- The map the target map. Use 0 for current map.
- You may use JavaScript code.

Event ID:
- The ID of the target event.
- Use 0 for current event.
- You may use JavaScript code.

Icon Index:
- Icon index used for the icon.
- You may use JavaScript code.

Buffer X:
- How much to shift the X position by?
- You may use JavaScript code.

Buffer Y:
- How much to shift the Y position by?
- You may use JavaScript code.

Blend Mode:
- What kind of blend mode do you wish to apply to the icon sprite?

---

Event Icon: Delete
- Delete the icon that appears on an event.
- This will remain deleted and invisible for events.

Map ID:
- The map the target map. Use 0 for current map.
- You may use JavaScript code.

Event ID:
- The ID of the target event.
- Use 0 for current event.
- You may use JavaScript code.

---

Event Icon: Restore
- Restores a deleted or forced icon that appears on an event.

Map ID:
- The map the target map. Use 0 for current map.
- You may use JavaScript code.

Event ID:
- The ID of the target event.
- Use 0 for current event.
- You may use JavaScript code.

---

=== Event Label Plugin Commands ===

---

Event Label: Refresh
- Refresh all Event Labels on screen.
- This is used to refresh page conditions for map changes that don't
force a refresh.

---

Event Label: Visible
- Change the visibility of Event Labels.

Visibility:
- What do you wish to change visibility to?

---

=== Event Location Plugin Commands ===

---

Event Location: Save
- Memorize an event's map location so it reappears there the next time the
map is loaded.

Event ID:
- The ID of the target event.
- Use 0 for current event.
- You may use JavaScript code.

---

Event Location: Delete
- Deletes an event's saved map location.
- The event will reappear at its default location.

Map ID:
- The map the target map. Use 0 for current map.
- You may use JavaScript code.

Event ID:
- The ID of the target event.
- Use 0 for current event.
- You may use JavaScript code.

---

Event Location: Create
- Creates a custom spawn location for a specific map's event so it appears
there the next time the map is loaded.

Map ID:
- The map the target map. Use 0 for current map.
- You may use JavaScript code.

Event ID:
- The ID of the target event.
- Use 0 for current event.
- You may use JavaScript code.

X Coordinate:
- The X coordinate of the event.
- You may use JavaScript code.

Y Coordinate:
- The Y coordinate of the event.
- You may use JavaScript code.

Direction:
- The direction the event will be facing.

Optional:

Page ID:
- The page of the event to set the move route to.
- You may use JavaScript code.

Move Route Index:
- The point in the move route for this event to be at if the page ID
matches the rest of the page conditions.

---

=== Event Popup Plugin Commands ===

---

Event Popup: Player
- Makes a centered event popup on the player sprite.
- Requires VisuMZ_1_MessageCore!
- Cannot be used in battle!

Message Text:
- Insert the text to be displayed.
- Text codes can be used.

Message Duration:
- What is the frame duration of the event popup?
- 60 frames = 1 second. You may use code.

Popup Settings:
- These settings let you adjust how the popup animates.
- See "Popup Settings" section below.

---

Event Popup: Follower
- Makes a centered event popup on target follower sprite.
- Requires VisuMZ_1_MessageCore!
- Cannot be used in battle!

Follower Index:
- Which follower index to play popup?
- Index starts at 0.
- You may use JavaScript code.

Message Text:
- Insert the text to be displayed.
- Text codes can be used.

Message Duration:
- What is the frame duration of the event popup?
- 60 frames = 1 second.
- You may use code.

Popup Settings:
- These settings let you adjust how the popup animates.
- See "Popup Settings" section below.

---

Event Popup: Event
- Makes a centered event popup on target event sprite.
- Requires VisuMZ_1_MessageCore!
- Cannot be used in battle!

Event ID:
- The ID of the event to play popup on.
- Use 0 for current event.
- You may use JavaScript code.

Message Text:
- Insert the text to be displayed.
- Text codes can be used.

Message Duration:
- What is the frame duration of the event popup?
- 60 frames = 1 second. You may use code.

Popup Settings:
- These settings let you adjust how the popup animates.
- See "Popup Settings" section below.

---

Event Popup: Target Tile
- Makes a centered event popup on target tile.
- Requires VisuMZ_1_MessageCore!
- Cannot be used in battle!

Map Tile X:
Map Tile Y:
- The x/y coordinate of the map tile.
- You may use JavaScript code.

Message Text:
- Insert the text to be displayed.
- Text codes can be used.

Message Duration:
- What is the frame duration of the event popup?
- 60 frames = 1 second. You may use code.

Popup Settings:
- These settings let you adjust how the popup animates.
- See "Popup Settings" section below.

---

Popup Settings

Fade Settings:

Fade In Duration:
- How many frames does it take to fade in?
- 60 frames = 1 second.

Fade Out Duration:
- How many frames does it take to fade out?
- 60 frames = 1 second.

Offset Settings:

Starting Offset X:
- Offsets the starting x position.
- Negative: left. Positive: right.
- You may use code.

Starting Offset Y:
- Offsets the starting y position.
- Negative: up. Positive: down.
- You may use code.

Ending Offset X:
- Offsets the ending x position.
- Negative: left. Positive: right.
- You may use code.

Ending Offset Y:
- Offsets the ending y position.
- Negative: up. Positive: down.
- You may use code.

Scaling Settings:

Starting Scale X:
- What is the starting scale x?
- 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
- You may use code.

Starting Scale Y:
- What is the starting scale y?
- 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
- You may use code.

Ending Scale X:
- What is the ending scale x?
- 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
- You may use code.

Ending Scale Y:
- What is the ending scale y?
- 0.0 = 0%, 0.5 = 50%, 1.0 = 100%
- You may use code.

Angle Settings:

Starting Offset Angle:
- What is the starting angle offset?
- Use numbers between 0 and 360.
- You may use code.

Ending Offset Angle:
- What is the ending angle offset?
- Use numbers between 0 and 360.
- You may use code.

Misc Settings:

Arc Peak:
- This is the height of the popup's trajectory arc in pixels.
- Positive: up. Negative: down.
- You may use code.

---

=== Event Timer Plugin Commands ===

---

Event Timer: Change Speed
- Changes the timer frame decrease (or increase) speed.

Speed:
- How many 1/60ths of a second does each frame increase or decrease by?
- Negative decreases.
- Positive increases.
- JavaScript allowed.

---

Event Timer: Expire Event Assign
- Sets a Common Event to run upon expiration.
- Bypasses the default code if one is set.

Common Event ID:
- Select the Common Event to run upon the timer's expiration.

---

Event Timer: Expire Event Clear
- Clears any set to expire Common Event and instead, run the default
Game_Timer expiration code.

---

Event Timer: Frames Gain
- Chooses how many frames, seconds, minutes, or hours are gained or lost for
the event timer.

Frames:
- How many 1/60ths of a second are gained/lost?
- Positive for gain.
- Negative for lost.
- JavaScript allowed.

Seconds:
- How many seconds are gained/lost?
- Positive for gain.
- Negative for lost.
- JavaScript allowed.

Minutes:
- How many minutes are gained/lost?
- Positive for gain.
- Negative for lost.
- JavaScript allowed.

Hours:
- How many hours are gained/lost?
- Positive for gain.
- Negative for lost.
- JavaScript allowed.

---

Event Timer: Frames Set
- Chooses how many frames, seconds, minutes, or hours are set for the event
timer.

Frames:
- Set frame count to this value.
- Each frame is 1/60th of a second.
- JavaScript allowed.

Seconds:
- Set seconds to this value.
- JavaScript allowed.

Minutes:
- Set minutes to this value.
- Each minute is 60 seconds.
- JavaScript allowed.

Hours:
- Set hours to this value.
- Each hour is 60 minutes.
- JavaScript allowed.

---

Event Timer: Pause
- Pauses the current event timer, but does not stop it.

---

Event Timer: Resume
- Resumes the current event timer from the paused state.

---

=== Follower Control Plugin Commands ===

---

Follower: Set Global Chase
- Disables all followers from chasing the player or reenables it.

Chase:
- Sets all followers to chase the player or not.

---

Follower: Set Target Chase
- Disables target follower from chasing the player or reenables it.

Follower ID:
- Select which follower ID to disable/reenable chasing for.

Chase:
- Sets target follower to chase its target or not.

---

Follower: Set Control
- Sets the event commands to target a follower when "Player" is selected as
the target.

Follower ID:
- Select which follower ID to control.
- 0 is the player.

---

Follower: Reset
- Resets all follower controls. Event Commands that target the "Player"
return to normal and followers chase again.

---

=== Global Switch Plugin Commands ===

---

Global Switch: Get Self Switch A B C D
- Gets the current ON/OFF value from a Self Switch and stores it onto a
Global Switch.

Map ID:
- The map the source map. Use 0 for current map.
- You may use JavaScript code.

Event ID:
- The ID of the source event.
- Use 0 for current event.
- You may use JavaScript code.

Letter:
- Letter of the target event's Self Switch to obtain data from.

-

Target Switch ID:
- The ID of the target switch.

---

Global Switch: Get Self Switch ID
- Gets the current ON/OFF value from a Self Switch and stores it onto a
Global Switch.

Map ID:
- The map the source map. Use 0 for current map.
- You may use JavaScript code.

Event ID:
- The ID of the source event.
- Use 0 for current event.
- You may use JavaScript code.

Switch ID:
- The ID of the source switch.

-

Target Switch ID:
- The ID of the target switch.

---

=== Global Variable Plugin Commands ===

---

Global Variable: Get Self Variable ID
- Gets the current stored value from a Self Variable and stores it onto a
Global Variable.

Map ID:
- The map the source map. Use 0 for current map.
- You may use JavaScript code.

Event ID:
- The ID of the source event.
- Use 0 for current event.
- You may use JavaScript code.

Variable ID:
- The ID of the source variable.

-

Target Variable ID:
- The ID of the target variable.

---

=== Morph Event Plugin Commands ===

---

Morph Event: Change
- Runs the page of a different event remotely.

Step 1:

Map ID:
- Target event's map. Use 0 for current map.
- You may use JavaScript code.

Event ID:
- The ID of the target event.
- Use 0 for current event.
- You may use JavaScript code.

Step 2:

Template Name:
- Name of the target event template to morph into.
- Ignored if this is called "Untitled".

Map ID:
- Target event's map. Use 0 for current map.
- You may use JavaScript code.

Event ID:
- The ID of the target event.
- Use 0 for current event.
- You may use JavaScript code.

Preserve Morph:
- Is the morph effect preserved?
- Or does it expire upon leaving the map?

---

Morph Event: Remove
- Remove the morph status of an event.

Map ID:
- Target event's map. Use 0 for current map.
- You may use JavaScript code.

Event ID:
- The ID of the event to remotely run.
- Use 0 for current event.
- You may use JavaScript code.

Remove Preservation:
- Also remove the preservation effect?

---

=== Player Icon Plugin Commands ===

---

Player Icon: Change
- Change the icon that appears on on the player.

Icon Index:
- Icon index used for the icon.
- You may use JavaScript code.

Buffer X:
- How much to shift the X position by?
- You may use JavaScript code.

Buffer Y:
- How much to shift the Y position by?
- You may use JavaScript code.

Blend Mode:
- What kind of blend mode do you wish to apply to the icon sprite?

---

Player Icon: Delete
- Delete the icon that appears on the player.

---

=== Player Movement Plugin Commands ===

---

Player Movement: Control
- Enable or disable player control over the player character's movement.

Enable?:
- Let the player control where the player character moves?

---

Player Movement: Diagonal
- Override settings to for player diagonal movement.

Setting:
- How do you want to change diagonal movement?
- Default: Whatever the Map Uses
- Forcefully Disable Diagonal Movement
- Forcefully Enable Diagonal Movement

---

=== Self Data Plugin Commands ===

---

Self Data: Reset All
- Reset the Self Switch and Self Variable data of all events within the
specified map.

Map ID:
- The map the target map. Use 0 for current map.
- You may use JavaScript code.

---

=== Self Switch Plugin Commands ===

---

Self Switch: A B C D
- Change the Self Switch of a different event.

Map ID:
- The map the target map. Use 0 for current map.
- You may use JavaScript code.

Event ID:
- The ID of the target event.
- Use 0 for current event.
- You may use JavaScript code.

Letter:
- Letter of the target event's Self Switch to change.

Value:
- What value do you want to set the Self Switch to?

---

Self Switch: Switch ID
- Change the Self Switch of a different event.

Map ID:
- The map the target map. Use 0 for current map.
- You may use JavaScript code.

Event ID:
- The ID of the target event.
- Use 0 for current event.
- You may use JavaScript code.

Switch ID:
- The ID of the target switch.

Value:
- What value do you want to set the Self Switch to?

---

=== Self Variable Plugin Commands ===

---

Self Variable: Variable ID
- Change the Self Variable of a different event.

Map ID:
- The map the target map. Use 0 for current map.
- You may use JavaScript code.

Event ID:
- The ID of the target event.
- Use 0 for current event.
- You may use JavaScript code.

Variable ID:
- The ID of the target variable.

Value:
- What value do you want to set the Self Switch to?

---

=== Spawn Event Plugin Commands ===

---

Spawn Event: Spawn At X, Y
- Spawns desired event at X, Y location on the current map.

Step 1:

Template Name:
- Name of the target event template to spawn as.
- Ignored if this is called "Untitled".

Map ID:
- Target event's map to be used as reference.
- You may use JavaScript code.

Event ID:
- The ID of the target event to be used as reference.
- You may use JavaScript code.

Step 2:

X Coordinate:
- Target Location to spawn at.
- You may use JavaScript code.

Y Coordinate:
- Target Location to spawn at.
- You may use JavaScript code.

Check Event Collision:
- Check collision with any other events and player?

Check Passability:
- Check passability of the target location.

Preserve Spawn:
- Is the spawned event preserved?
- Or does it expire upon leaving the map?

Step 3:

Success Switch ID:
- Target switch ID to record spawning success.
- Ignore if ID is 0. OFF means failed. ON means success.

---

Spawn Event: Spawn At Region
- Spawns desired event at a random region-marked location on the
current map.

Step 1:

Template Name:
- Name of the target event template to spawn as.
- Ignored if this is called "Untitled".

Map ID:
- Target event's map to be used as reference.
- You may use JavaScript code.

Event ID:
- The ID of the target event to be used as reference.
- You may use JavaScript code.

Step 2:

Region ID(s):
- Pick region(s) to spawn this event at.

Check Event Collision:
- Check collision with any other events and player?

Check Passability:
- Check passability of the target location.

Preserve Spawn:
- Is the spawned event preserved?
- Or does it expire upon leaving the map?

Step 3:

Success Switch ID:
- Target switch ID to record spawning success.
- Ignore if ID is 0. OFF means failed. ON means success.

---

Spawn Event: Spawn At Terrain Tag
- Spawns desired event at a random terrain tag-marked location on the
current map.

Step 1:

Template Name:
- Name of the target event template to spawn as.
- Ignored if this is called "Untitled".

Map ID:
- Target event's map to be used as reference.
- You may use JavaScript code.

Event ID:
- The ID of the target event to be used as reference.
- You may use JavaScript code.

Step 2:

Terrain Tag(s):
- Pick terrain tag(s) to spawn this event at.
- Insert numbers between 0 and 7.

Check Event Collision:
- Check collision with any other events and player?

Check Passability:
- Check passability of the target location.

Preserve Spawn:
- Is the spawned event preserved?
- Or does it expire upon leaving the map?

Step 3:

Success Switch ID:
- Target switch ID to record spawning success.
- Ignore if ID is 0. OFF means failed. ON means success.

---

Spawn Event: Despawn Event ID
- Despawns the selected Event ID on the current map.

Event ID
- The ID of the target event.
- You may use JavaScript code.

---

Spawn Event: Despawn At X, Y
- Despawns any spawned event(s) at X, Y location on the current map.

X Coordinate:
- Target Location to despawn at.
- You may use JavaScript code.

Y Coordinate:
- Target Location to despawn at.
- You may use JavaScript code.

---

Spawn Event: Despawn Region(s)
- Despawns the selected Region(s) on the current map.

Region ID(s):
- Pick region(s) and despawn everything inside it.

---

Spawn Event: Despawn Terrain Tag(s)
- Despawns the selected Terrain Tags(s) on the current map.

Terrain Tag(s):
- Pick terrain tag(s) and despawn everything inside it.
- Insert numbers between 0 and 7.

---

Spawn Event: Despawn Everything
- Despawns all spawned events on the current map.

---

Move Route Custom Commands

Some custom commands have been added to the "Set Movement Route" event
command. These can be accessed by pressing the "Script..." command and
typing in the following, which don't need to be in code form.

Keep in mind that since these are custom additions and RPG Maker MZ does not
allow plugins to modify the editor, the "Preview" button will not factor in
the effects of these commands.

If you wish to use a value from a variable, insert $gameVariables.value(x)
or \V[x] in place of the x in any of the below.

If you wish to use a value from a self variable, insert \SelfVar[x] in place
of the x in any of the below. This will only draw from the current event. If
you wish to draw data from outside event self variables, we recommend you
use the \V[x] variant after using the Plugin Commands to draw data from them
for the best accuracy.

---

Animation: x
- Replace 'x' with the ID of the animation to play on moving unit.

---

Balloon: name
- Replace 'name' with any of the following to play a balloon on that the
target moving unit.
- '!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
'Light Bulb', 'Sleep', 'User-Defined 1', 'User-Defined 2',
'User-Defined 3', 'User-Defined 4', 'User-Defined 5'
- Do NOT insert quotes.
- Examples:
- Balloon: !
- Balloon: Sleep
- Balloon: Heart

---

Fade In: x
Fade Out: x
- Fades in/out the sprite's opacity.
- Fade In will continuously raise the opacity level until it reaches 255.
- Fade Out will continuously lower the opacity level until it reaches 0.
- Replace 'x' with the speed to fade in/out the sprite.

---

Force Carry: On
Force Carry: Off
- For usage with the VS8 sprite sheet.
- Use ON to turn force carrying on.
- Use OFF to turn force carrying off.
- Sprites using the VS8 sprite sheet will also show the VS8 Carry frames.

---

Force Dash: On
Force Dash: Off
- Use ON to turn force dashing on.
- Use OFF to turn force dashing off.
- Forces dashing will prompt the player or event to be in the dashing state.
- Sprites using the VS8 sprite sheet will also show the VS8 Dashing frames.

---

Hug: Left
Hug: Right
- Causes the moving unit to hug the left/right side of the wall.

---

Index: x
- Replace 'x' with a number depicting the character index to change the
moving unit's sprite to.

---

Index: +x
Index: -x
- Replace 'x' with the value to change the character index of the moving
unit's sprite by.

---

Jump Forward: x
- Replace 'x' with the number of tiles for the unit to jump forward by.

---

Jump To: x, y
- Replace 'x' and 'y' with the coordinates for the unit to jump to.

---

Jump to Event: x
- Replace 'x' with the ID of the event for the unit to jump to.

---

Jump to Player
- Causes the moving unit to jump to the player.

---

Jump To Home
- Causes the event to jump to its home position.
- This only works on events, not player characters or followers.

---

Move Lower Left Until Stop
Move Down Until Stop
Move Lower Right Until Stop
Move Left Until Stop
Move Right Until Stop
Move Upper Left Until Stop
Move Up Until Stop
Move Upper Right Until Stop
- Causes the moving unit to move that direction until it hits a stop.
- Events will stop moving before they make contact with the player.

---

Crash Move Lower Left Until Stop
Crash Move Down Until Stop
Crash Move Lower Right Until Stop
Crash Move Left Until Stop
Crash Move Right Until Stop
Crash Move Upper Left Until Stop
Crash Move Up Until Stop
Crash Move Upper Right Until Stop
- Causes the moving unit to move that direction until it hits a stop.
- Events can crash into the player and trigger an event.

---

Move To: x, y
- Replace 'x' and 'y' with the map coordinates to move the unit to through
pathfinding.
- This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
not expect the most optimal results.
- Events will go around the player.

---

Crash Move To: x, y
- Replace 'x' and 'y' with the map coordinates to move the unit to through
pathfinding.
- This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
not expect the most optimal results.
- Events can crash into the player and trigger an event.

---

Move to Event: x
- Replace 'x' with the ID of the event to move the unit to.
- This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
not expect the most optimal results.
- Events will go around the player.

---

Crash Move to Event: x
- Replace 'x' with the ID of the event to move the unit to.
- This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
not expect the most optimal results.
- Events can crash into the player and trigger an event.

---

Move to Player
- Moves the unit to the player.
- This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
not expect the most optimal results.

---

Move to Home
- Moves the unit towards their home position on the map.
- This only works on events, not player characters or followers.
- This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
not expect the most optimal results.

---

Crash Move to Home
- Moves the unit towards their home position on the map.
- This only works on events, not player characters or followers.
- This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
not expect the most optimal results.
- Events can crash into the player and trigger an event.

---

Move Lower Left: x
Move Down: x
Move Lower Right: x
Move Left: x
Move Right: x
Move Upper Left: x
Move Up: x
Move Upper Right: x
- Replace 'x' with the number of times to move the unit by in the designated
direction on the map.
- Events can crash into the player and trigger an event.

---

Opacity: x%
- Replace 'x' with the percentage to change the unit's sprite opacity to.

---

Opacity: +x
Opacity: -x
- Replace 'x' with the increment to change the unit's sprite opacity by.

---

Pattern Lock: x
- Replace 'x' with the step pattern to lock the unit's sprite to.

---

Pattern Unlock
- Removes pattern lock effect.

---

Pose: name
- If using a VS8 sprite, this will cause the unit to strike a pose.
- Replace 'name' with any the following:
- 'Item', 'Hmph', 'Victory', 'Hurt', 'Kneel', 'Collapse',
'!', '?', 'Music Note', 'Heart', 'Anger', 'Sweat', 'Cobweb', 'Silence',
'Light Bulb', 'Sleep'
- Do NOT insert quotes.
- Examples:
- Balloon: Item
- Balloon: Victory
- Balloon: ?

---

Step Toward: x, y
- Replace 'x' and 'y' for the desired coordinates for the unit to take one
step towards.
- This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
not expect the most optimal results.

---

Step Toward Event: x
- Replace 'x' with the ID of the event for the unit to take one step to.
- This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
not expect the most optimal results.

---

Step Toward Player
- Causes event to take one step towards the player.
- This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
not expect the most optimal results.

---

Step Toward Home
- Causes the event to take one step towards its home position.
- This only works on events, not player characters or followers.
- This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
not expect the most optimal results.

---

Step Away From: x, y
- Replace 'x' and 'y' for the desired coordinates for the unit to take one
step away from.
- This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
not expect the most optimal results.

---

Step Away From Event: x
- Replace 'x' with the ID of the event for the unit to take one step from.
- This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
not expect the most optimal results.

---

Step Away From Player
- Causes event to take one step away from the player.
- This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
not expect the most optimal results.

---

Step Away From Home
- Causes the event to take one step away from its home position.
- This only works on events, not player characters or followers.
- This uses RPG Maker MZ's pathfinding algorithm. It is not perfect so do
not expect the most optimal results.

---

Turn To: x, y
- Replace 'x' and 'y' for the coordinates to make the unit face towards.
- This supports 8 directional turning.

---

Turn to Event: x
- Replace 'x' with the ID of the event to turn the unit towards.
- This supports 8 directional turning.

---

Turn to Player
- Causes the unit to turn towards the player.
- This supports 8 directional turning.

---

Turn to Home
- Causes the event to turn towards its home position.
- This refers to the original position's X/Y on the map.
- The event will turn and face the tile that is its original X/Y location.
- This only works on events, not player characters or followers.

---

Turn Away From: x, y
- Replace 'x' and 'y' for the coordinates to make the unit face away from.
- This supports 8 directional turning.

---

Turn Away From Event: x
- Replace 'x' with the ID of the event to turn the unit away from.
- This supports 8 directional turning.

---

Turn Away From Player
- Causes the unit to turn away from the player.
- This supports 8 directional turning.

---

Turn Away From Home
- Causes the event to turn away from its home position.
- This only works on events, not player characters or followers.

---

Turn Lower Left
Turn Lower Right
Turn Upper Left
Turn Upper Right
- Causes the unit to turn to one of the diagonal directions.

---

Self Switch x: On
Self Switch x: Off
Self Switch x: Toggle
- Replace 'x' with 'A', 'B', 'C', 'D', or a <Self> Switch ID to adjust the
unit's Self Switch.

---

Self Variable x: y
- Replace 'x' with a <Self> Variable ID to adjust the unit's Self Variable.
- Replace 'y' with a number value to set the Self Variable to.

---

Teleport To: x, y
- Replace 'x' and 'y' with the coordinates to instantly move the unit to.

---

Teleport to Event: x
- Replace 'x' with the ID of the event to instantly move the unit to.

---

Teleport to Player
- Instantly moves the unit to the player's location.

---

Teleport to Home
- Instantly teleports an event to its home position on the map.
- This only works on events, not player characters or followers.

---

If none of the commands are detected above, then a script call will be ran.

---

Plugin Parameters: Event Label Settings

Event Labels are small windows created to display text over an event's head.
They're set up using the <Label> notetags and/or comment tags. Event Labels
are a great way to instantly relay information about the event's role to
the player.

---

Event Labels

Sprite Based?:
- Use sprite-based labels instead of legacy-window version.
- Legacy-window version will not be supported in future.
- Sprite-based labels are more memory efficient and work better
compatibility-wise.

Mobile-Enabled?:
- Enable event labels for mobile devices?

Font Size:
- The font size used for the Event Labels.

Icon Size:
- The size of the icons used in the Event Labels.

Line Height:
- The line height used for the Event Labels.

Offset X:
- Globally offset all labels horizontally by this amount.

Offset Y:
- Globally offset all labels vertically by this amount.

Fade Speed:
- Fade speed for labels.

Visible Range:
- Range the player has to be within the event to make its label visible.

Range Type:
- What do you want the default label visible range type?
- Square
- Diamond
- Circle

---

Plugin Parameters: Event Icon Settings

Icons can be displayed over an event's head through the <Icon> notetags
and/or comment tags. These can be used for a variety of things such as
making them look like they're carrying an item or to indicate they have a
specific role.

---

Event Icon

Buffer X:
- Default X position buffer for event icons.

Buffer Y:
- Default Y position buffer for event icons.

Blend Mode:
- Default blend mode for even icons.
- 0 - Normal
- 1 - Additive
- 2 - Multiply
- 3 - Screen

---

Plugin Parameters: Event Template Settings

Event Templates allow you to store specific maps and/or event data to bring
out on need while having a premade set base. They're similar to prefabs but
aren't things that can be altered individually as one setting for an event
template will serve as a blueprint for all of them that use them.

Event Templates are used for the <Copy Event> notetags, the Morph Event and
Spawn Event Plugin Commands.

---

Settings

Preloaded Maps:
- A list of all the ID's of the maps that will be preloaded to serve as
template maps for this plugin.

---

Templates
- A list of all the Event Templates used by this project. Used for notetags
and Plugin Commands.

Name:
- Name of the template. It'll be used as anchor points for notetags and
Plugin Commands.

Map ID:
- ID of the map the template event is stored on.
- This will automatically add this ID to preloaded list.

Event ID:
- ID of the event the template event is based on.

JavaScript:
JS: Pre-Copy:
JS: Post-Copy:
JS: Pre-Morph:
JS: Post-Morph:
JS: Pre-Spawn:
JS: Post-Spawn:
- Code that's ran during certain circumstances.
- The code will occur at the same time as the ones listed in the main
Event Template Settings Plugin Parameters. However, the ones listed
in these individual entries will only occur for these specific
templates and only if the templates are used.

---

JavaScript

JS: Pre-Copy:
JS: Post-Copy:
JS: Pre-Morph:
JS: Post-Morph:
JS: Pre-Spawn:
JS: Post-Spawn:
- Code that's ran during certain circumstances.
- These are global and are ran for all copies, morphs, and/or spawns.

---

Plugin Parameters: Movement Settings

These plugin parameters allow you to control how movement works in your
game, toggling it from 4-directional to 8-directional, setting up rules to
stop self-movement from events while an event or message is present, and
other aesthetics such as tilting the sprite while dashing, setting shadows
beneath the sprites, and allow for turning in place.

---

8 Directional Movement

Enable:
- Allow 8-directional movement by default? Players can move diagonally.

Strict Collision:
- Enforce strict collission rules where the player must be able to pass
both cardinal directions?

Favor Horizontal:
- Favor horizontal if cannot pass diagonally but can pass both
horizontally and vertically?

Slower Diagonals?
- Enforce a slower movement speed when moving diagonally?

Speed Multiplier
- What's the multiplier to adjust movement speed when moving diagonally?

---

Automatic Movement

Stop During Events:
- Stop automatic event movement while events are running.

Stop During Messages:
- Stop automatic event movement while a message is running.

---

Bitmap

Smoothing:
- Do you want to smooth or pixelate the map sprites?
- Pixelating them is better for zooming and tilting.

---

Dash

Dash Modifier:
- Alters the dash speed modifier.

Dash on Ladder?
- Allow dashing while on a ladder or rope?

Enable Dash Tilt?:
- Tilt any sprites that are currently dashing?

Tilt Left Amount:
- Amount in radians when moving left (upper left, left, lower left).

Tilt Right Amount:
- Amount in radians when moving right (upper right, right, lower right).

Tilt Vertical Amount:
- Amount in radians when moving vertical (up, down).

---

Event Movement

Random Move Weight:
- Use numbers between 0 and 1.
- Numbers closer to 1 stay closer to their home position.
- 0 to disable it.

Shift Y:
- How many pixels should non-tile characters be shifted by?
- Negative: up. Positive: down.

---

Path Finding

Mobile-Enabled?:
- Enable diagonal pathfinding for mobile devices?

---

Shadows

Show:
- Show shadows on all events and player-related sprites.

Default Filename:
- Default filename used for shadows found in img/system/ folder.

---

Turn in Place

Enable:
- When not dashing, player will turn in place before moving.
- This only applies with keyboard inputs.

Delay in Frames:
- The number of frames to wait before moving.

---

Vehicle Speeds

Boat Speed:
- Allows you to adjust the base speed of the boat vehicle.

Ship Speed:
- Allows you to adjust the base speed of the ship vehicle.

Airship Speed:
- Allows you to adjust the base speed of the airship vehicle.

---

Wall Bump

Enable?:
- Enable the sound effect to be played when bumping into a wall?

---

Plugin Parameters: VisuStella 8-Dir Settings

These are settings for sprite sheets using the VS8 format.
For more information on the VS8 format, look in the help section above.

---

Balloon Icon Settings

Auto-Balloon Poses:
- Automatically pose VS8 sprites when using balloon icons.

Balloon Offset X:
- Offset balloon icons on VS8 sprites by x pixels.

Balloon Offset Y:
- Offset balloon icons on VS8 sprites by y pixels.

---

Icons

Auto Buffer:
- Automatically buffer the X and Y coordinates of VS8 sprites?

Use Carry Pose:
- Use the carry pose when moving with an icon overhead.

---

Plugin Parameters: Region Rulings

These settings allow you to decide the passability of the player, events,
and various vehicles through the usage of Regions.

---

Allow Regions

All Allow:
Walk Allow:
Player Allow:
Event Allow:
Vehicle Allow:
Boat Allow:
Ship Allow:
Airship Allow:
- Insert Region ID's where the affected unit type can enter.
- Region ID's range from 0 to 255.

---

Forbid Regions

All Forbid:
Walk Forbid:
Player Forbid:
Event Forbid:
Vehicle Forbid:
Boat Forbid:
Ship Forbid:
Airship Forbid:
- Insert Region ID's where the affected unit type cannot enter.
- Region ID's range from 0 to 255.

---

Dock Regions

Vehicle Dock:
Boat Dock:
Ship Dock:
Airship Dock:
- Insert Region ID's where the affected vehicle can dock
- Region ID's range from 0 to 255.

Only Region Dockable:
- Vehicles are only able to dock at designated regions.

---

Plugin Parameters: Common Event on OK Button

These Plugin Parameters allow you to setup Common Events that activate using
Regions when pressing the OK button while standing on top of them or in
front of them. These let you create near universally interactable objects
using Regions, such as rivers to start up fishing events or locations to
places items on.

---

Regions

Regions 1 - 255:
- Which Common Event does this region activate?
- Use 0 to not activate any Common Events.

---

Target Tile

Target Tile:
- Which tile should be checked for Common Event on OK Button?
- Tile in front of player.
- Tile player is standing on top of.

---

Plugin Parameters: Common Event on Touch

These Plugin Parameters allow you to setup Common Events that trigger when
stepping onto Region-marked tiles. These let you create custom effects that
will occur such as customized damage floors, traps, and/or events.

Areas marked with these regions will not allow random encounters to occur.
This is how RPG Maker works. Assuming you are not using plugins at all, by
putting on touch events all over the map, tiles with those on touch events
will not let random encounters trigger.

---

Regions

Regions 1 - 255:
- Which Common Event does this region activate?
- Use 0 to not activate any Common Events.

---

Plugin Parameters: Terrain Tag Settings

Terrain Tags are used in Database => Tilesets to mark certain tiles and
give them unique properties through terrain tags.

---

Terrain Tag ID's

Rope:
- Which terrain tag number to use for ropes?

---
```
