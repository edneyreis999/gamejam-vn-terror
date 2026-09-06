# Inventário verificável dos plugins instalados

Levantamento de 6 de setembro de 2026. Metadados extraídos dos arquivos locais; não equivale a teste de cada recurso. Status vem de `js/plugins.js`. Arquivo presente e ausente dessa lista não está carregado.


**23 arquivos .js; 17 entradas configuradas, todas ativas.** A tabela inclui arquivos que não são plugins distintos, como cópia e separador.

| Arquivo | Versão declarada | Configuração | Dependência obrigatória (`@base`) | Ordem declarada (`@orderAfter`) |
|---|---|---|---|---|
| [--------------------------.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/--------------------------.js) | não declarada | fora de plugins.js | — | — |
| [AltMenuScreen.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/AltMenuScreen.js) | não declarada | fora de plugins.js | — | — |
| [AltSaveScreen.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/AltSaveScreen.js) | não declarada | fora de plugins.js | — | — |
| [ButtonPicture.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/ButtonPicture.js) | não declarada | fora de plugins.js | — | — |
| [TextPicture.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/TextPicture.js) | não declarada | fora de plugins.js | — | — |
| [VisuMZ_0_CoreEngine.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_0_CoreEngine.js) | 1.90 | ativo, posição 1 | — | — |
| [VisuMZ_1_MessageCore.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_1_MessageCore.js) | 1.57 | ativo, posição 2 | — | VisuMZ_0_CoreEngine |
| [VisuMZ_1_OptionsCore.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_1_OptionsCore.js) | 1.28 | ativo, posição 3 | — | VisuMZ_0_CoreEngine |
| [VisuMZ_1_SaveCore.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_1_SaveCore.js) | 1.14 | ativo, posição 4 | — | VisuMZ_0_CoreEngine |
| [VisuMZ_2_ExtMessageFunc.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_2_ExtMessageFunc.js) | 1.22 | ativo, posição 5 | VisuMZ_1_MessageCore | VisuMZ_1_MessageCore |
| [VisuMZ_2_PictureChoices.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_2_PictureChoices.js) | 1.02 | ativo, posição 6 | — | VisuMZ_0_CoreEngine |
| [VisuMZ_2_VNPictureBusts.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_2_VNPictureBusts.js) | 1.03 | ativo, posição 7 | VisuMZ_0_CoreEngine | VisuMZ_0_CoreEngine |
| [VisuMZ_3_ChoiceCmnEvts.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_3_ChoiceCmnEvts.js) | 1.02 | ativo, posição 8 | VisuMZ_1_MessageCore | VisuMZ_1_MessageCore |
| [VisuMZ_3_MessageKeywords.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_3_MessageKeywords.js) | 1.05 | ativo, posição 9 | VisuMZ_1_MessageCore | VisuMZ_1_MessageCore |
| [VisuMZ_3_MessageLog.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_3_MessageLog.js) | 1.08 | ativo, posição 10 | VisuMZ_1_MessageCore | VisuMZ_1_MessageCore |
| [VisuMZ_3_MsgLetterSounds.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_3_MsgLetterSounds.js) | 1.03 | ativo, posição 11 | VisuMZ_1_MessageCore | VisuMZ_1_MessageCore |
| [VisuMZ_3_VisualCutinEffect.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_3_VisualCutinEffect.js) | 1.02 | ativo, posição 12 | VisuMZ_0_CoreEngine | VisuMZ_0_CoreEngine |
| [VisuMZ_4_AttachedPictures.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_4_AttachedPictures.js) | 1.05 | ativo, posição 13 | — | VisuMZ_1_MessageCore |
| [VisuMZ_4_Debugger copy.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_4_Debugger%20copy.js) | 1.02 | fora de plugins.js | — | — |
| [VisuMZ_4_Debugger.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_4_Debugger.js) | 1.02 | ativo, posição 14 | — | — |
| [VisuMZ_4_EventTitleScene.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_4_EventTitleScene.js) | 1.06 | ativo, posição 15 | — | VisuMZ_0_CoreEngine |
| [VisuMZ_4_GabWindow.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_4_GabWindow.js) | 1.05 | ativo, posição 16 | — | VisuMZ_0_CoreEngine |
| [VisuMZ_4_MessageVisibility.js](../../rpg-maker/The%20Dryland%20Drowned/js/plugins/VisuMZ_4_MessageVisibility.js) | 1.03 | ativo, posição 17 | — | VisuMZ_0_CoreEngine, VisuMZ_1_MessageCore, VisuMZ_2_ExtMessageFunc |

## Comandos e parâmetros de primeiro nível

IDs abaixo são os IDs reais declarados no header, não nomes propostos. `Separator_*` e `Category_*` foram omitidos porque só organizam o editor. Os parâmetros de estruturas aninhadas estão no arquivo fonte; valores importantes são analisados na pré-análise.

### AltMenuScreen

**Comandos:** nenhum `@command`.

**Parâmetros de primeiro nível:** nenhum.

### AltSaveScreen

**Comandos:** nenhum `@command`.

**Parâmetros de primeiro nível:** nenhum.

### ButtonPicture

**Comandos:** `set` (L19)

**Parâmetros de primeiro nível:** nenhum.

### TextPicture

**Comandos:** `set` (L18)

**Parâmetros de primeiro nível:** nenhum.

### VisuMZ_0_CoreEngine

**Comandos:** `AnimationPoint` (L4503); `AudioChangeBgmVolume` (L4557); `AudioChangeBgmPitch` (L4570); `AudioChangeBgmPan` (L4583); `AudioChangeBgsVolume` (L4596); `AudioChangeBgsPitch` (L4609); `AudioChangeBgsPan` (L4622); `DebugConsoleLastControllerID` (L4641); `ExportAllMapText` (L4654); `ExportAllTroopText` (L4661); `ExportCurMapText` (L4668); `ExportCurTroopText` (L4675); `OpenURL` (L4688); `GoldChange` (L4705); `MapOnceParallel` (L4723); `PictureCoordinatesMode` (L4743); `PictureEasingType` (L4757); `PictureEraseAll` (L4835); `PictureEraseRange` (L4842); `PictureRotateBy` (L4863); `PictureRotate` (L4934); `PictureShowIcon` (L5005); `ScreenShake` (L5053); `SwitchRandomizeOne` (L5111); `SwitchRandomizeRange` (L5131); `SwitchToggleOne` (L5158); `SwitchToggleRange` (L5171); `SystemSetBattleSystem` (L5196); `SystemLoadImages` (L5235); `SystemSetFontSize` (L5339); `SystemSetSideView` (L5352); `SystemSetWindowPadding` (L5370); `TextPopupShow` (L5390); `VariableEvalReference` (L5410); `VariableJsBlock` (L5447)

**Parâmetros de primeiro nível:** `CoreEngine` (L5500); `QoL:struct` (L5509); `BattleSystem:str` (L5515); `Color:struct` (L5548); `Gold:struct` (L5554); `ImgLoad:struct` (L5560); `KeyboardInput:struct` (L5567); `MenuBg:struct` (L5573); `ButtonAssist:struct` (L5579); `ControllerButtons:arraystruct` (L5585); `MenuLayout:struct` (L5592); `Param:struct` (L5598); `CustomParam:arraystruct` (L5604); `ScreenResolution:struct` (L5612); `ScreenShake:struct` (L5618); `TitleCommandList:arraystruct` (L5624); `TitlePicButtons:arraystruct` (L5631); `UI:struct` (L5638); `Window:struct` (L5644); `jsQuickFunc:arraystruct` (L5650)

### VisuMZ_1_MessageCore

**Comandos:** `MessageWindowProperties` (L2379); `MessageRandomize` (L2413); `MessageWindowXyOffsets` (L2433); `ChoiceWindowDistance` (L2458); `ChoiceWindowProperties` (L2470); `SelectWeapon` (L2528); `SelectArmor` (L2552); `SelectSkill` (L2585); `PictureTextChange` (L2622); `PictureTextErase` (L2716); `PictureTextRefresh` (L2729)

**Parâmetros de primeiro nível:** `MessageCore` (L2750); `General:struct` (L2760); `AutoColor:struct` (L2766); `CustomFonts:arraystruct` (L2772); `TextCodeActions:arraystruct` (L2779); `TextCodeReplace:arraystruct` (L2785); `TextMacros:arraystruct` (L2791); `Localization:struct` (L2798); `LanguageFonts:struct` (L2804); `LanguageImages:struct` (L2812); `TextSpeed:struct` (L2820); `WordWrap:struct` (L2826)

### VisuMZ_1_OptionsCore

**Comandos:** nenhum `@command`.

**Parâmetros de primeiro nível:** `OptionsCore` (L1548); `OptionsSettings:struct` (L1558); `Categories:arraystruct` (L1564); `Rebind:struct` (L1570); `ControllerButtons:arraystruct` (L1577); `MasterVolShortcut:struct` (L1585)

### VisuMZ_1_SaveCore

**Comandos:** `AutosaveEnable` (L688); `AutosaveRequest` (L703); `AutosaveExecute` (L710); `AutosaveForce` (L717); `SaveCurrentSlot` (L730); `SaveDescription` (L737); `SavePicture` (L749)

**Parâmetros de primeiro nível:** `SaveCore` (L776); `Save:struct` (L786); `SaveConfirm:struct` (L792); `Autosave:struct` (L799); `AutosaveConfirm:struct` (L805); `AutosaveOption:struct` (L812); `StyleBreak` (L819); `ActorGraphic:str` (L823); `SaveMenuStyle:str` (L837); `SaveMenu:struct` (L851)

### VisuMZ_2_ExtMessageFunc

**Comandos:** `ExtFastFwdDisallow` (L866); `MsgButtonConsole` (L883); `MessageCursorSettings` (L900); `MessageTailSettings` (L912)

**Parâmetros de primeiro nível:** `ExtMessageFunc` (L933); `Auto:struct` (L943); `FastFwd:struct` (L949); `MsgButtonConsole:struct` (L955); `Buttons:struct` (L961); `MsgCursor:struct` (L968); `MsgTail:struct` (L974); `ScrollWheel:struct` (L981)

### VisuMZ_2_PictureChoices

**Comandos:** `ClearAll` (L437); `ClearPictureID` (L443); `ClearPictureRange` (L456); `ChangePictureChoiceSettingsOne` (L476); `ChangePictureChoiceSettingsRange` (L510)

**Parâmetros de primeiro nível:** `PictureChoices` (L560); `AutoClear:eval` (L570); `SameCheck:eval` (L579)

### VisuMZ_2_VNPictureBusts

**Comandos:** `Basic_EnterBust` (L975); `Basic_ExitBusts` (L1081); `Basic_GraphicChange` (L1170); `Basic_MirrorBust` (L1190); `Basic_OriginChange` (L1215); `Basic_PlayAniBust` (L1244); `Breathing_Enable` (L1293); `Breathing_Disable` (L1339); `Fade_FadeIn` (L1365); `Fade_FadeOut` (L1383); `Fade_OpacityBy` (L1410); `Fade_OpacityTo` (L1434); `Fidgeting_Enable` (L1473); `Fidgeting_Disable` (L1520); `Move_MoveByCoordinates` (L1546); `Move_MoveByPosition` (L1625); `Move_MoveToCoordinates` (L1697); `Move_MoveToPosition` (L1776); `Move_ResetToPosition` (L1848); `Scale_ScaleBy` (L1925); `Scale_ScaleTo` (L1958); `Scale_ScaleReset` (L1991); `Swaying_Enable` (L2022); `Swaying_Disable` (L2055); `Tone_BrightBust` (L2081); `Tone_DimBust` (L2100); `Tone_NormalBust` (L2119); `Tone_PresetBust` (L2137); `Tone_CustomToneBust` (L2167)

**Parâmetros de primeiro nível:** `VNPictureBusts` (L2206); `Anchor` (L2216); `AnchorX:num` (L2219); `AnchorY:num` (L2226); `Scale` (L2233); `ScaleX:num` (L2236); `ScaleY:num` (L2243); `InvertedScale:arraynum` (L2250); `Screen` (L2259); `ScreenX:func` (L2262); `ScreenY:func` (L2270); `Tone` (L2278); `brightTone:eval` (L2281); `dimTone:eval` (L2288)

### VisuMZ_3_ChoiceCmnEvts

**Comandos:** nenhum `@command`.

**Parâmetros de primeiro nível:** nenhum.

### VisuMZ_3_MessageKeywords

**Comandos:** nenhum `@command`.

**Parâmetros de primeiro nível:** `MessageKeywords` (L444); `Keywords:arraystruct` (L454); `Tooltip:struct` (L461); `SupportedWindows:arraystr` (L467)

### VisuMZ_3_MessageLog

**Comandos:** `BypassMessageLogging` (L586); `SystemEnableMessageLogMenu` (L600); `SystemShowMessageLogMenu` (L614)

**Parâmetros de primeiro nível:** `MessageLog` (L636); `General:struct` (L646); `MainMenu:struct` (L652); `BgSettings:struct` (L658); `Vocab:struct` (L664); `Window:struct` (L670)

### VisuMZ_3_MsgLetterSounds

**Comandos:** `MsgSoundChangeMessageSound` (L323); `MsgSoundResetMessageSound` (L386); `SystemEnableMessageSounds` (L392)

**Parâmetros de primeiro nível:** `MessageSounds` (L414); `Enable` (L424); `EnableSound:eval` (L426); `BlackList:arraystr` (L435); `Default` (L442); `name:str` (L445); `Interval:num` (L453); `volume:num` (L460); `VolVariance:num` (L468); `pitch:num` (L475); `PitchVariance:num` (L482); `pan:num` (L489); `PanVariance:num` (L495)

### VisuMZ_3_VisualCutinEffect

**Comandos:** `CutinStart_VisualCutinEffect` (L930); `CutinChange_PortraitSwap` (L1095); `CutinChange_ParallaxSwap` (L1228); `CutinEnd_VisualCutinEffectAll` (L1367); `CutinEnd_VisualCutinEffectType` (L1382); `CutinWait_WaitForEntrance` (L1508); `CutinWait_WaitForExit` (L1514)

**Parâmetros de primeiro nível:** `VisualCutinEffect` (L1534); `Styles:struct` (L1544); `Outline:struct` (L1550); `ExtraDefaults:struct` (L1556); `CutinLayer:str` (L1563)

### VisuMZ_4_AttachedPictures

**Comandos:** `MessageAddPicture` (L419); `MessageRemovePicture` (L432); `PictureAddPicture` (L451); `PictureRemovePicture` (L471)

**Parâmetros de primeiro nível:** `AttachedPictures` (L498); `MsgWindow` (L508); `PictureIDs:arraynum` (L511); `ContainerPosition:num` (L520)

### VisuMZ_4_Debugger

**Comandos:** nenhum `@command`.

**Parâmetros de primeiro nível:** `Debugger` (L331); `Quick:arraystruct` (L341)

### VisuMZ_4_EventTitleScene

**Comandos:** `NewGame` (L350); `LoadScreen` (L364); `Options` (L378)

**Parâmetros de primeiro nível:** `EventTitleScene` (L400); `Coordinates` (L410); `MapID:num` (L413); `MapX:num` (L422); `MapY:num` (L431); `FaceDirection:num` (L440); `Player` (L464); `PlayerTransparent:eval` (L467); `CanInputMove:eval` (L476); `ShowFollowers:eval` (L485)

### VisuMZ_4_GabWindow

**Comandos:** `GabTextOnly` (L672); `GabTextFaceAny` (L700); `GabTextFaceActor` (L743); `GabTextFaceParty` (L777); `GabTextSpriteAny` (L812); `GabTextSpriteActor` (L855); `GabTextSpriteParty` (L889); `GabTextSvActorAny` (L924); `GabTextSvActorActor` (L959); `GabTextSvActorParty` (L993); `GabTextPicture` (L1028); `ClearGab` (L1077); `WaitForGab` (L1083)

**Parâmetros de primeiro nível:** `GabWindow` (L1103); `General:struct` (L1113); `Map:struct` (L1119); `Battle:struct` (L1125)

### VisuMZ_4_MessageVisibility

**Comandos:** nenhum `@command`.

**Parâmetros de primeiro nível:** `MessageVisibility` (L226); `General` (L236); `ToggleKey:str` (L238); `Compatibility` (L252); `VisuMZ_1_MessageCore` (L254); `CommonEventShow:num` (L257); `CommonEventHide:num` (L265); `VisuMZ_2_ExtMessageFunc` (L273); `ButtonName:str` (L276)

## Duplicação e ausência

`VisuMZ_4_Debugger copy.js` é byte a byte igual a `VisuMZ_4_Debugger.js`; apenas o segundo está configurado. O separador não implementa uma feature. `Jhonny_CreditsSkip`, mencionado na lista inicial, não existe nesta pasta. `VisuMZ_4_PictureCmnEvts`, citado pela documentação de AttachedPictures, também não está instalado; não confundir com `VisuMZ_3_ChoiceCmnEvts`.

Os hashes dos arquivos inspecionados estão em [fontes-sha256.json](evidencias/fontes-sha256.json). Não foi copiado código de implementação dos plugins para este relatório.
