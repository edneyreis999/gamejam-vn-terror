# VisuMZ_2_AniMsgTextEffects

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_2_AniMsgTextEffects`
- Contract: [RPG Maker MZ] [Tier 2] [AniMsgTextEffects]
- Required plugins: VisuMZ_1_MessageCore
- Declared load order: after VisuMZ_1_MessageCore
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| AniMsgTextEffects | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| TextEffects | Text Effect Settings | — | — | — | — | — |
| AngleEffects:arraystruct | Angle Effects | TextEffects | struct&lt;AngleEffect&gt;\[\] | \["{\"Name:str\":\"Swing\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.25\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SlowSwing\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.10\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"FastSwing\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.40\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"Wag\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.25\",\"PendulumOffset:num\":\"8\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SlowWag\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.10\",\"PendulumOffset:num\":\"8\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"FastWag\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.40\",\"PendulumOffset:num\":\"8\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"Jelly\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.25\",\"PendulumOffset:num\":\"15\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SlowJelly\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.10\",\"PendulumOffset:num\":\"15\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"FastJelly\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.40\",\"PendulumOffset:num\":\"12\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SpinCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-2.4\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SlowSpinCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-1.8\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"FastSpinCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-3.6\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SpinCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+2.4\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SlowSpinCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+1.8\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"FastSpinCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+3.6\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"RollCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-2.4\",\"RotationOffset:num\":\"-12\"}","{\"Name:str\":\"SlowRollCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-1.8\",\"RotationOffset:num\":\"-9\"}","{\"Name:str\":\"FastRollCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-3.6\",\"RotationOffset:num\":\"-15\"}","{\"Name:str\":\"RollCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+2.4\",\"RotationOffset:num\":\"12\"}","{\"Name:str\":\"SlowRollCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+1.8\",\"RotationOffset:num\":\"9\"}","{\"Name:str\":\"FastRollCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+3.6\",\"RotationOffset:num\":\"15\"}"\] | — | Setup the various settings for angle-type Text Effects here. |
| ColorEffects:arraystruct | Color Effects | TextEffects | struct&lt;ColorEffect&gt;\[\] | \["{\"Name:str\":\"Prism\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-6\",\"InitialHueOffset:num\":\"0\"}","{\"Name:str\":\"SlowPrism\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-3\",\"InitialHueOffset:num\":\"0\"}","{\"Name:str\":\"FastPrism\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-9\",\"InitialHueOffset:num\":\"0\"}","{\"Name:str\":\"Rainbow\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-6\",\"InitialHueOffset:num\":\"36\"}","{\"Name:str\":\"SlowRainbow\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-3\",\"InitialHueOffset:num\":\"36\"}","{\"Name:str\":\"FastRainbow\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-9\",\"InitialHueOffset:num\":\"36\"}","{\"Name:str\":\"Gamer\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-6\",\"InitialHueOffset:num\":\"-216\"}","{\"Name:str\":\"SlowGamer\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-3\",\"InitialHueOffset:num\":\"-216\"}","{\"Name:str\":\"FastGamer\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-9\",\"InitialHueOffset:num\":\"-216\"}","{\"Name:str\":\"Red\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[255, 0, 0, 0\]\\\"\]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftRed\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[255, 0, 0, 0\]\\\",\\\"\[0, 0, 0, 0\]\\\"\]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardRed\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[255, 0, 0, 0\]\\\",\\\"\[0, 0, 0, 0\]\\\"\]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Green\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[0, 255, 0, 0\]\\\"\]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftGreen\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[0, 255, 0, 0\]\\\",\\\"\[0, 0, 0, 0\]\\\"\]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardGreen\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[0, 255, 0, 0\]\\\",\\\"\[0, 0, 0, 0\]\\\"\]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Blue\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[0, 0, 255, 0\]\\\"\]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftBlue\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[0, 0, 255, 0\]\\\",\\\"\[0, 0, 0, 0\]\\\"\]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardBlue\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[0, 0, 255, 0\]\\\",\\\"\[0, 0, 0, 0\]\\\"\]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Yellow\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[255, 255, 0, 0\]\\\"\]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftYellow\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[255, 255, 0, 0\]\\\",\\\"\[0, 0, 0, 0\]\\\"\]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardYellow\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[255, 255, 0, 0\]\\\",\\\"\[0, 0, 0, 0\]\\\"\]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Cyan\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[0, 255, 255, 0\]\\\"\]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftCyan\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[0, 255, 255, 0\]\\\",\\\"\[0, 0, 0, 0\]\\\"\]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardCyan\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[0, 255, 255, 0\]\\\",\\\"\[0, 0, 0, 0\]\\\"\]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Magenta\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[255, 0, 255, 0\]\\\"\]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftMagenta\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[255, 0, 255, 0\]\\\",\\\"\[0, 0, 0, 0\]\\\"\]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardMagenta\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[255, 0, 255, 0\]\\\",\\\"\[0, 0, 0, 0\]\\\"\]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"RGB\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[255, 0, 0, 0\]\\\",\\\"\[255, 255, 0, 0\]\\\",\\\"\[0, 255, 0, 0\]\\\",\\\"\[0, 255, 255, 0\]\\\",\\\"\[0, 0, 255, 0\]\\\",\\\"\[255, 0, 255, 0\]\\\"\]\",\"toneDelay:num\":\"20\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"SlowRGB\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[255, 0, 0, 0\]\\\",\\\"\[255, 255, 0, 0\]\\\",\\\"\[0, 255, 0, 0\]\\\",\\\"\[0, 255, 255, 0\]\\\",\\\"\[0, 0, 255, 0\]\\\",\\\"\[255, 0, 255, 0\]\\\"\]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"FastRGB\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[255, 0, 0, 0\]\\\",\\\"\[255, 255, 0, 0\]\\\",\\\"\[0, 255, 0, 0\]\\\",\\\"\[0, 255, 255, 0\]\\\",\\\"\[0, 0, 255, 0\]\\\",\\\"\[255, 0, 255, 0\]\\\"\]\",\"toneDelay:num\":\"10\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"Fes\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[255, 0, 0, 0\]\\\",\\\"\[0, 255, 0, 0\]\\\"\]\",\"toneDelay:num\":\"20\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SlowFes\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[255, 0, 0, 0\]\\\",\\\"\[0, 255, 0, 0\]\\\"\]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"FastFes\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[255, 0, 0, 0\]\\\",\\\"\[0, 255, 0, 0\]\\\"\]\",\"toneDelay:num\":\"10\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Gig\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[255, 0, 0, 0\]\\\",\\\"\[0, 255, 0, 0\]\\\",\\\"\[0, 0, 255, 0\]\\\"\]\",\"toneDelay:num\":\"20\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"SlowGig\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[255, 0, 0, 0\]\\\",\\\"\[0, 255, 0, 0\]\\\",\\\"\[0, 0, 255, 0\]\\\"\]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"FastGig\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"\[\\\"\[255, 0, 0, 0\]\\\",\\\"\[0, 255, 0, 0\]\\\",\\\"\[0, 0, 255, 0\]\\\"\]\",\"toneDelay:num\":\"10\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}"\] | — | Setup the various settings for color-type Text Effects here. |
| OpacityEffects:arraystruct | Opacity Effects | TextEffects | struct&lt;OpacityEffect&gt;\[\] | \["{\"Name:str\":\"Glow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.25\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"SlowGlow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.10\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"FastGlow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.40\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Flow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.25\",\"glowOffset:num\":\"2\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"SlowFlow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.10\",\"glowOffset:num\":\"2\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"FastFlow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.40\",\"glowOffset:num\":\"2\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Blink\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.25\",\"glowOffset:num\":\"15\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"SlowBlink\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.10\",\"glowOffset:num\":\"30\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"FastBlink\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.40\",\"glowOffset:num\":\"8\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Campfire\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmmaaammmaaammmabcdefaaaammmmabcdefmmmaaaa\",\"patternDelay:num\":\"2\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Candle\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmmmmaaaaammmmmaaaaaabcdefgabcdefg\",\"patternDelay:num\":\"2\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Fade\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"abcdefghijklmnopqrrqponmlkjihgfedcba\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Flicker\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"nmonqnmomnmomomno\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Fluorescent\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmamammmmammamamaaamammma\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Halogen\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmnmmommommnonmmonqnmmo\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Strobe\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mamamamamama\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Torch\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmmaaaabcdefgmmmmaaaammmaamm\",\"patternDelay:num\":\"2\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Underwater\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmnnmmnnnmmnn\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}"\] | — | Setup the various settings for opacity-type Text Effects here. |
| PositionEffects:arraystruct | Positioning Effects | TextEffects | struct&lt;PositionEffect&gt;\[\] | \["{\"Name:str\":\"Shake\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"2\",\"ShakeStrengthVert:num\":\"2\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SoftShake\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"1\",\"ShakeStrengthVert:num\":\"1\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"HardShake\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"3\",\"ShakeStrengthVert:num\":\"3\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"Shiver\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"2\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SoftShiver\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"1\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"HardShiver\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"3\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"Vibe\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"2\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SoftVibe\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"1\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"HardVibe\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"3\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"Stagger\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"4\",\"WaveSpeedY:num\":\"0.25\",\"WaveOffsetY:num\":\"15\"}","{\"Name:str\":\"SlowStagger\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"4\",\"WaveSpeedY:num\":\"0.10\",\"WaveOffsetY:num\":\"30\"}","{\"Name:str\":\"FastStagger\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"4\",\"WaveSpeedY:num\":\"0.50\",\"WaveOffsetY:num\":\"30\"}","{\"Name:str\":\"Saw\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.25\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowSaw\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.10\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"FastSaw\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.40\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"Bounce\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.25\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowBounce\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.10\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"FastBounce\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.40\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"Wave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.25\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.25\",\"WaveOffsetY:num\":\"2\"}","{\"Name:str\":\"SlowWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.10\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.10\",\"WaveOffsetY:num\":\"2\"}","{\"Name:str\":\"FastWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.40\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.40\",\"WaveOffsetY:num\":\"2\"}","{\"Name:str\":\"HorzWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.25\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowHorzWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.10\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"FastHorzWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.40\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"VertWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.25\",\"WaveOffsetY:num\":\"2\"}","{\"Name:str\":\"SlowVertWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.10\",\"WaveOffsetY:num\":\"2\"}","{\"Name:str\":\"FastVertWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.40\",\"WaveOffsetY:num\":\"2\"}"\] | — | Setup the various settings for color-type Text Effects here. |
| ScaleEffects:arraystruct | Scaling Effects | TextEffects | struct&lt;ScaleEffects&gt;\[\] | \["{\"Name:str\":\"HorzCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.10\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowHorzCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.08\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"FastHorzCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.15\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"VertCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.10\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowVertCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.08\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"FastVertCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.15\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"HorzRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.10\",\"FlipOffsetX:num\":\"2\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowHorzRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.08\",\"FlipOffsetX:num\":\"2\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"FastHorzRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.15\",\"FlipOffsetX:num\":\"2\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"VertRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.10\",\"FlipOffsetY:num\":\"2\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowVertRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.08\",\"FlipOffsetY:num\":\"2\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"FastVertRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.15\",\"FlipOffsetY:num\":\"2\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"Pulse\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.30\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.30\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"SmallPulse\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.10\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.10\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"BigPulse\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.40\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.40\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"Jiggle\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.30\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"2\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.30\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"2\"}","{\"Name:str\":\"SmallJiggle\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.10\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"2\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.10\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"2\"}","{\"Name:str\":\"BigJiggle\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.40\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"2\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.40\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"2\"}","{\"Name:str\":\"Gooey\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.30\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"33\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"-0.30\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"33\"}","{\"Name:str\":\"SmallGooey\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.10\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"33\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"-0.10\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"33\"}","{\"Name:str\":\"BigGooey\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.40\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"33\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"-0.40\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"33\"}"\] | — | Setup the various settings for color-type Text Effects here. |
| Options:struct | Options Settings | — | struct&lt;Options&gt; | {"Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Effects"} | — | Options settings for Animated Message Text Effects. |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

### Struct: AngleEffect

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Name:str | Name | — | — | Untitled | — | UNIQUE name of this message text effect type. Used in place of 'name' in \Effect&lt;name&gt; for text codes. |
| Angles | — | — | — | — | — | — |
| Pendulum | Pendulum Effect | Angles | — | — | — | — |
| PendulumArc:num | Arc Size | Pendulum | number | 0 | — | What is the pendulum arc size? |
| PendulumSpeed:num | Speed Modifier | Pendulum | — | 0 | — | Arc speed rate for pendulum effect. |
| PendulumOffset:num | Offset Modifier | Pendulum | — | 0 | — | Arc offset modifier for pendulum effect. |
| Rotation | Rotation Effect | Angles | — | — | — | — |
| RotationSpeed:num | Speed Modifier | Rotation | — | 0 | — | Speed to determine many angles will rotate per frame. |
| RotationOffset:num | Offset Modifier | Rotation | — | 0 | — | Initial angle offset modifier for rotation effect. |

### Struct: ColorEffect

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Name:str | Name | — | — | Untitled | — | UNIQUE name of this message text effect type. Used in place of 'name' in \Effect&lt;name&gt; for text codes. |
| Color | — | — | — | — | — | — |
| ForcedColor:str | Forced Color | Color | — | — | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. Leave empty to not use. |
| Hue | Hue Change Effect | Color | — | — | — | — |
| HueShift:num | Hue Shift | Hue | — | 0 | — | Shift hue by how much each frame? |
| InitialHueOffset:num | Offset Modifier | Hue | — | 0 | — | Initial hue offset modifier for hue shift. |
| Tone | Tone Effect | Color | — | — | — | — |
| colorTones:arrayeval | Color Tone(s) | Tone | string\[\] | \[\] | — | What tone(s) do you want for the letters? Format: \[Red, Green, Blue, Gray\] |
| toneDelay:num | Frame Delay | Tone | number | 0 | — | What is the frame delay between tone changes? |
| InitialToneOffset:num | Offset Modifier | Tone | — | 0 | — | Initial tone offset modifier for tone change. |
| SmoothToneChange:eval | Smooth Transition? | Tone | boolean | false | — | Make a smooth transition for tone changes? |

### Struct: OpacityEffect

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Name:str | Name | — | — | Untitled | — | UNIQUE name of this message text effect type. Used in place of 'name' in \Effect&lt;name&gt; for text codes. |
| Opacity | — | — | — | — | — | — |
| InitialOpacity:num | Base Opacity | Opacity | — | 255 | — | What is the starting opacity value? |
| Glow | Glow Effect | Opacity | — | — | — | — |
| glowRate:num | Glow Rate | Glow | — | 0 | — | What is the glow change for this effect? Use a decimal number between 0 and 1. |
| glowSpeed:num | Glow Speed | Glow | — | 0 | — | What is the speed at which glow oscillates at? Use a decimal number between 0 and 1. |
| glowOffset:num | Offset Modifier | Glow | — | 0 | — | Initial opacity offset modifier for glow effect. |
| Pattern | Intensity Pattern | Opacity | — | — | — | — |
| pattern:str | Custom Pattern | Pattern | — | — | — | Create a custom pattern with letters from a to z. Where 'a' is transparent and 'z' is opaque. |
| patternDelay:num | Frame Delay | Pattern | number | 0 | — | What is the frame delay between pattern updates? |
| patternOffset:num | Offset Modifier | Pattern | — | 0 | — | Initial opacity offset modifier for pattern effect. |

### Struct: PositionEffect

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Name:str | Name | — | — | Untitled | — | UNIQUE name of this message text effect type. Used in place of 'name' in \Effect&lt;name&gt; for text codes. |
| Positioning | — | — | — | — | — | — |
| Shake | Frantic Effect | Positioning | — | — | — | — |
| ShakeStrengthHorz:num | Horz Strength | Shake | number | 0 | — | Horizontal frantic randomization strength. Determines random horizontal position for frantic effect. |
| ShakeStrengthVert:num | Vert Strength | Shake | number | 0 | — | — |
| WaveX | Wave (Horz) Effect | Positioning | — | — | — | — |
| WaveDistanceX:num | Distance | WaveX | number | 0 | — | Horizontal distance for wave effect. |
| WaveSpeedX:num | Speed Modifier | WaveX | — | 0 | — | Horizontal speed rate for wave effect. |
| WaveOffsetX:num | Offset Modifier | WaveX | — | 0 | — | Horizontal offset modifier for wave effect. |
| WaveY | Wave (Vert) Effect | Positioning | — | — | — | — |
| WaveDistanceY:num | Distance | WaveY | number | 0 | — | Vertical distance for wave effect. |
| WaveSpeedY:num | Speed Modifier | WaveY | — | 0 | — | Vertical speed rate for wave effect. |
| WaveOffsetY:num | Offset Modifier | WaveY | — | 0 | — | Vertical offset modifier for wave effect. |

### Struct: ScaleEffects

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Name:str | Name | — | — | Untitled | — | UNIQUE name of this message text effect type. Used in place of 'name' in \Effect&lt;name&gt; for text codes. |
| Scaling | — | — | — | — | — | — |
| FlipX | Flip (Horz) Effect | Scaling | — | — | — | — |
| FlipSpeedX:num | Speed Modifier | FlipX | — | 0 | — | Horizontal speed rate for flip effect. |
| FlipOffsetX:num | Offset Modifier | FlipX | — | 0 | — | Horizontal offset modifier for flip effect. |
| FlipY | Flip (Vert) Effect | Scaling | — | — | — | — |
| FlipSpeedY:num | Speed Modifier | FlipY | — | 0 | — | Vertical speed rate for flip effect. |
| FlipOffsetY:num | Offset Modifier | FlipY | — | 0 | — | Vertical offset modifier for flip effect. |
| PulseX | Pulse (Horz) Effect | Scaling | — | — | — | — |
| PulseGrowthX:num | Growth | PulseX | — | 0 | — | Horizontal growth pulse effect. |
| PulseSpeedX:num | Speed Modifier | PulseX | — | 0 | — | Horizontal speed rate for pulse effect. |
| PulseOffsetX:num | Offset Modifier | PulseX | — | 0 | — | Horizontal offset modifier for pulse effect. |
| PulseY | Pulse (Vert) Effect | Scaling | — | — | — | — |
| PulseGrowthY:num | Growth | PulseY | — | 0 | — | Vertical growth pulse effect. |
| PulseSpeedY:num | Speed Modifier | PulseY | — | 0 | — | Vertical speed rate for pulse effect. |
| PulseOffsetY:num | Offset Modifier | PulseY | — | 0 | — | Vertical offset modifier for pulse effect. |

### Struct: Options

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Options | Options | — | — | — | — | — |
| AddOption:eval | Add Option? | Options | boolean | true | — | Add the 'Text Effects' option to the Options menu? |
| AdjustRect:eval | Adjust Window Height | Options | boolean | true | — | Automatically adjust the options window height? |
| Name:str | Option Name | Options | — | Text Effects | — | Command name of the option. |

## Plugin commands

No public plugin commands are declared.
## Public behavior, notetags, text codes, and script surface

```text
Introduction

Ever wanted to animate the text that appears in your Message Window in order
to add just a bit more character to their lines? Perhaps a stagger effect or
a shivering effect? Maybe a swinging effect like a pendulum or a glowing
effect for a specific color? This plugin comes with a plethora of text
effects to pick and use from in addition to letting you create your very own
custom text effects through the Plugin Parameters and just by adjusting the
various effect properties.

Features include all (but not limited to) the following:

* Animate text shown in the Message Window with more than 40+ number of
custom text effects with many having three different variations each.
* Add in your own custom text effects or modify existing text effects. There
is an endless number of custom text effects you can add.
* Options command for players to turn on/off Message Text Effects in case
the text effects may interfere with their ability to read.
* Angle-type text effects will sway back and forth by the angle or
constantly spin in a certain direction.
* Color-type text effects will allow for hue shifts or color tone patterns
to be applied to your message text.
* Opacity-type text effects can cause the opacity of a letter to fade in/out
and/or use custom opacity patterns that can also be used to determine
fade level.
* Positioning-type text effects can shake randomly in specified directions
or move back and forth for specified directions in a wave.
* Scaling-type text effects can flip to its front and back sides or grow
and shrink in size by a certain amount like a pulse.
* You can combine text effects with one another as long as they are of
different types.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Required Plugin List ------

* VisuMZ_1_MessageCore

This plugin requires the above listed plugins to be installed inside your
game's Plugin Manager list in order to work. You cannot start your game with
this plugin enabled without the listed plugins.

------ Tier 2 ------

This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

Available Text Codes

The following are text codes that you may use with this plugin.

While the \Effect<name> part of the text code is hardcoded, the actual
settings for each of the text effect types can be modified through the
Plugin Parameters.

These Text Effects can ONLY be used for the Message Window and nothing else.
Everything else will have the text be displayed normally. This means you
CANNOT use Animated Message Text Effects for the Help Window, Choice Window,
Status Window, etc. Only the main Message Window can support them.

---

=== General Text Effect-Related Text Codes ===

---

--------------------   -----------------------------------------------------
Text Code              Animated Text Effect (Message Window Only)
--------------------   -----------------------------------------------------

\Effect<name>          Changes the text effect to "name" where "name" is
based on the Plugin Parameter "Name" setting. The
text effect will then be applied to regular text
characters and icons. Other visual text code graphics
won't have custom text effects applied to them.

\Effect<Normal>        Returns the text effect type to "normal". No shaking,
angle changing, etc. effects will be seen. Just plain
old normal text.

<Clear Effect>         Same as \Effect<Normal> as it will return the text
effect type to "normal". There are no differences
between usage as it is up to personal preference on
which you want to use.

---

=== Angle-Type Text Effect-Related Text Codes ===

---

--------------------   -----------------------------------------------------
Text Code              Pendulum-Subtype Text Effect (Message Window Only)
--------------------   -----------------------------------------------------

\Effect<Swing>         Angle of letters swing uniformly back and forth.
\Effect<SlowSwing>     Slower version of "Swing" text effect.
\Effect<FastSwing>     Faster version of "Swing" text effect.

\Effect<Wag>           Angle of letters swing in a sequence back and forth.
\Effect<SlowWag>       Slower version of "Wag" text effect.
\Effect<FastWag>       Faster version of "Wag" text effect.

\Effect<Jelly>         Angle and position move back and forth in a sequence.
\Effect<SlowJelly>     Slower version of "Jelly" text effect.
\Effect<FastJelly>     Faster version of "Jelly" text effect.

---

--------------------   -----------------------------------------------------
Text Code              Rotation-Subtype Text Effect (Message Window Only)
--------------------   -----------------------------------------------------

\Effect<SpinCW>        Letters rotate clockwise uniformly.
\Effect<SlowSpinCW>    Slower version of "SpinCW" text effect.
\Effect<FastSpinCW>    Faster version of "SpinCW" text effect.

\Effect<SpinCCW>       Letters rotate counter-clockwise uniformly.
\Effect<SlowSpinCCW>   Slower version of "SpinCCW" text effect.
\Effect<FastSpinCCW>   Faster version of "SpinCCW" text effect.

\Effect<RollCW>        Letters rotate clockwise in a sequence.
\Effect<SlowRollCW>    Slower version of "RollCW" text effect.
\Effect<FastRollCW>    Faster version of "RollCW" text effect.

\Effect<RollCCW>       Letters rotate counter-clockwise in a sequence.
\Effect<SlowRollCCW>   Slower version of "RollCCW" text effect.
\Effect<FastRollCCW>   Faster version of "RollCCW" text effect.

---

=== Color-Type Text Effect-Related Text Codes ===

---

--------------------   -----------------------------------------------------
Text Code              Hue-Subtype Text Effect (Message Window Only)
--------------------   -----------------------------------------------------

\Effect<Prism>         Letters will hue shift uniformly.
\Effect<SlowPrism>     Slower version of "Prism" text effect.
\Effect<FastPrism>     Faster version of "Prism" text effect.

\Effect<Rainbow>       Letters will hue shift in a sequence.
\Effect<SlowRainbow>   Slower version of "Rainbow" text effect.
\Effect<FastRainbow>   Faster version of "Rainbow" text effect.

\Effect<Gamer>         Letters will hue shift in a stagger.
\Effect<SlowGamer>     Slower version of "Gamer" text effect.
\Effect<FastGamer>     Faster version of "Gamer" text effect.

---

--------------------   -----------------------------------------------------
Text Code              Tone-Subtype Text Effect (Message Window Only)
--------------------   -----------------------------------------------------

\Effect<Red>           A static red tone on the text.
\Effect<SoftRed>       Smoothly transition red tone on the text.
\Effect<HardRed>       Instant transition red tone on the text.

\Effect<Green>         A static green tone on the text.
\Effect<SoftGreen>     Smoothly transition green tone on the text.
\Effect<HardGreen>     Instant transition green tone on the text.

\Effect<Blue>          A static blue tone on the text.
\Effect<SoftBlue>      Smoothly transition blue tone on the text.
\Effect<HardBlue>      Instant transition blue tone on the text.

\Effect<Yellow>        A static yellow tone on the text.
\Effect<SoftYellow>    Smoothly transition yellow tone on the text.
\Effect<HardYellow>    Instant transition yellow tone on the text.

\Effect<Cyan>          A static cyan tone on the text.
\Effect<SoftCyan>      Smoothly transition cyan tone on the text.
\Effect<HardCyan>      Instant transition cyan tone on the text.

\Effect<Magenta>       A static magenta tone on the text.
\Effect<SoftMagenta>   Smoothly transition magenta tone on the text.
\Effect<HardMagenta>   Instant transition magenta tone on the text.

\Effect<RGB>           Smooth shifting RGB tones in a sequence.
\Effect<SlowRGB>       Slower version of "RGB" text effect.
\Effect<FastRGB>       Faster version of "RGB" text effect.

\Effect<Fes>           Instant shifting Red/Green tones in a sequence.
\Effect<SlowFes>       Slower version of "Fes" text effect.
\Effect<FastFes>       Faster version of "Fes" text effect.

\Effect<Gig>           Smooth shifting base tones in a sequence.
\Effect<SlowGig>       Slower version of "Gig" text effect.
\Effect<FastGig>       Faster version of "Gig" text effect.

---

=== Opacity-Type Text Effect-Related Text Codes ===

---

--------------------   -----------------------------------------------------
Text Code              Glow-Subtype Text Effect (Message Window Only)
--------------------   -----------------------------------------------------

\Effect<Glow>          Letters fade in and out uniformly.
\Effect<SlowGlow>      Slower version of "Glow" text effect.
\Effect<FastGlow>      Faster version of "Glow" text effect.

\Effect<Flow>          Letters fade in and out in a sequence.
\Effect<SlowFlow>      Slower version of "Flow" text effect.
\Effect<FastFlow>      Faster version of "Flow" text effect.

\Effect<Blink>         Letters blink in and out in a stagger.
\Effect<SlowBlink>     Slower version of "Blink" text effect.
\Effect<FastBlink>     Faster version of "Blink" text effect.

---

--------------------   -----------------------------------------------------
Text Code              Pattern-Subtype Text Effect (Message Window Only)
--------------------   -----------------------------------------------------

\Effect<Campfire>      A specified blinking light pattern for letters.
\Effect<Candle>        A specified blinking light pattern for letters.
\Effect<Fade>          A specified blinking light pattern for letters.
\Effect<Flicker>       A specified blinking light pattern for letters.
\Effect<Fluorescent>   A specified blinking light pattern for letters.
\Effect<Halogen>       A specified blinking light pattern for letters.
\Effect<Strobe>        A specified blinking light pattern for letters.
\Effect<Torch>         A specified blinking light pattern for letters.
\Effect<Underwater>    A specified blinking light pattern for letters.

---

=== Position-Type Text Effect-Related Text Codes ===

---

--------------------   -----------------------------------------------------
Text Code              Frantic-Subtype Text Effect (Message Window Only)
--------------------   -----------------------------------------------------

\Effect<Shake>         Shakes frantically and randomly in any direction.
\Effect<SoftShake>     Less frantic version of "Shake" text effect.
\Effect<HardShake>     More frantic version of "Shake" text effect.

\Effect<Shiver>        Shivers frantically in the left/right direction.
\Effect<SoftShiver>    Less frantic version of "Shiver" text effect.
\Effect<HardShiver>    More frantic version of "Shiver" text effect.

\Effect<Vibe>          Vibrates frantically in the up/down direction.
\Effect<SoftVibe>      Less frantic version of "Vibe" text effect.
\Effect<HardVibe>      More frantic version of "Vibe" text effect.

---

--------------------   -----------------------------------------------------
Text Code              Wave-Subtype Text Effect (Message Window Only)
--------------------   -----------------------------------------------------

\Effect<Stagger>       Moves with letters staggered up and down.
\Effect<SlowStagger>   Slower version of "Stagger" text effect.
\Effect<FastStagger>   Faster version of "Stagger" text effect.

\Effect<Saw>           Moves uniformly left and right.
\Effect<SlowSaw>       Slower version of "Saw" text effect.
\Effect<FastSaw>       Faster version of "Saw" text effect.

\Effect<Bounce>        Moves uniformly up and down.
\Effect<SlowBounce>    Slower version of "Bounce" text effect.
\Effect<FastBounce>    Faster version of "Bounce" text effect.

\Effect<Wave>          Waves by letter in all directions.
\Effect<SlowWave>      Slower version of "Wave" text effect.
\Effect<FastWave>      Faster version of "Wave" text effect.

\Effect<HorzWave>      Waves by letter in horizontal direction.
\Effect<SlowHorzWave>  Slower version of "HorzWave" text effect.
\Effect<FastHorzWave>  Faster version of "HorzWave" text effect.

\Effect<VertWave>      Waves by letter in vertical direction.
\Effect<SlowVertWave>  Slower version of "VertWave" text effect.
\Effect<FastVertWave>  Faster version of "VertWave" text effect.

---

=== Scaling-Type Text Effect-Related Text Codes ===

---

----------------------   ---------------------------------------------------
Text Code                Flip-Subtype Text Effect (Message Window Only)
----------------------   ---------------------------------------------------

\Effect<HorzCard>        Horizontally uniform flipping effect.
\Effect<SlowHorzCard>    Slower version of "HorzCard" text effect.
\Effect<FastHorzCard>    Faster version of "HorzCard" text effect.

\Effect<VertCard>        Vertically uniform flipping effect.
\Effect<SlowVertCard>    Slower version of "VertCard" text effect.
\Effect<FastVertCard>    Faster version of "VertCard" text effect.

\Effect<HorzRibbon>      Horizontally folding flipping effect.
\Effect<SlowHorzRibbon>  Slower version of "HorzRibbon" text effect.
\Effect<FastHorzRibbon>  Faster version of "HorzRibbon" text effect.

\Effect<VertRibbon>      Vertically folding flipping effect.
\Effect<SlowVertRibbon>  Slower version of "VertRibbon" text effect.
\Effect<FastVertRibbon>  Faster version of "VertRibbon" text effect.

---

--------------------   -----------------------------------------------------
Text Code              Pulse-Subtype Text Effect (Message Window Only)
--------------------   -----------------------------------------------------

\Effect<Pulse>         Letters grow bigger and smaller uniformly.
\Effect<SmallPulse>    Smaller version of "Pulse" text effect.
\Effect<BigPulse>      Larger version of "Pulse" text effect.

\Effect<Jiggle>        Letters grow bigger and smaller in a sequence.
\Effect<SmallJiggle>   Smaller version of "Jiggle" text effect.
\Effect<BigJiggle>     Larger version of "Jiggle" text effect.

\Effect<Gooey>         Letters grow bigger and smaller in a stretched form.
\Effect<SmallGooey>    Smaller version of "Gooey" text effect.
\Effect<BigGooey>      Larger version of "Gooey" text effect.

---

=== Combining Text Effects ===

---

\Effect<type, type>
\Effect<type, type, type>
\Effect<type, type, type, type>
\Effect<type, type, type, type, type>

You can combine text effects with one another provided that they are of
different types (NOT subtypes). What this means is you can pick an
angle-type text effect, combine it with a color-type text effect along with
something like a positioning-type text effect and produce results.

You cannot combine same types together such as a positioning-type with
another positioning type.

Examples:

\Effect<Swing, Rainbow>
\Effect<Wag, Flow, HorzWave>
\Effect<Jelly, Shiver, HorzCard>

---

Plugin Parameters: Angle Effects Settings

Setup the various settings for angle-type Text Effects here.

---

General

Name:
- UNIQUE name of this message text effect type.
- Used in place of 'name' in \Effect<name> for text codes.

---

Angles > Pendulum Effect

Arc Size:
- What is the pendulum arc size?

Speed Modifier:
- Arc speed rate for pendulum effect.

Offset Modifier:
- Arc offset modifier for pendulum effect.

---

Angles > Rotation Effect

Speed Modifier:
- Speed to determine many angles will rotate per frame.

Offset Modifier:
- Initial angle offset modifier for rotation effect.

---

Plugin Parameters: Color Effects Settings

Setup the various settings for color-type Text Effects here.

---

General

Name:
- UNIQUE name of this message text effect type.
- Used in place of 'name' in \Effect<name> for text codes.

---

Color

Forced Color:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.
- Leave empty to not use.

---

Color > Hue Change Effect

Hue Shift:
- Shift hue by how much each frame?

Offset Modifier:
- Initial hue offset modifier for hue shift.

---

Color > Tone Effect

Color Tone(s):
- What tone(s) do you want for the letters?
- Format: [Red, Green, Blue, Gray]

Frame Delay:
- What is the frame delay between tone changes?

Offset Modifier:
- Initial tone offset modifier for tone change.

Smooth Transition?:
- Make a smooth transition for tone changes?

---

Plugin Parameters: Opacity Effects Settings

Setup the various settings for opacity-type Text Effects here.

---

General

Name:
- UNIQUE name of this message text effect type.
- Used in place of 'name' in \Effect<name> for text codes.

---

Opacity

Base Opacity:
- What is the starting opacity value?

---

Opacity > Glow Effect

Glow Rate:
- What is the glow change for this effect?
- Use a decimal number between 0 and 1.

Glow Speed:
- What is the speed at which glow oscillates at?
- Use a decimal number between 0 and 1.

Offset Modifier:
- Initial opacity offset modifier for glow effect.

---

Opacity > Intensity Pattern

Custom Pattern:
- Create a custom pattern with letters from a to z.
- Where 'a' is transparent and 'z' is opaque.

Frame Delay:
- What is the frame delay between pattern updates?

Offset Modifier:
- Initial opacity offset modifier for pattern effect.

---

Plugin Parameters: Positioning Effects Settings

Setup the various settings for positioning-type Text Effects here.

---

General

Name:
- UNIQUE name of this message text effect type.
- Used in place of 'name' in \Effect<name> for text codes.

---

Positioning > Wave (Horz) Effect

Distance:
- Horizontal distance for wave effect.

Speed Modifier:
- Horizontal speed rate for wave effect.

Offset Modifier:
- Horizontal offset modifier for wave effect.

---

Positioning > Wave (Vert) Effect

Distance:
- Vertical distance for wave effect.

Speed Modifier:
- Vertical speed rate for wave effect.

Offset Modifier:
- Vertical offset modifier for wave effect.

---

Positioning > Frantic Effect

Horz Strength:
- Horizontal frantic randomization strength.
- Determines random horizontal position for frantic effect.

Vert Strength:
- Vertical frantic randomization strength.
- Determines random vertical position for frantic effect.

---

Plugin Parameters: Scaling Effects Settings

Setup the various settings for scaling-type Text Effects here.

---

General

Name:
- UNIQUE name of this message text effect type.
- Used in place of 'name' in \Effect<name> for text codes.

---

Scaling > Flip (Horz) Effect

Speed Modifier:
- Horizontal speed rate for flip effect.

Offset Modifier:
- Horizontal offset modifier for flip effect.

---

Scaling > Flip (Vert) Effect

Speed Modifier:
- Vertical speed rate for flip effect.

Offset Modifier:
- Vertical offset modifier for flip effect.

---

Scaling > Pulse (Horz) Effect

Growth:
- Horizontal growth pulse effect.

Speed Modifier:
- Horizontal speed rate for pulse effect.

Offset Modifier:
- Horizontal offset modifier for pulse effect.

---

Scaling > Pulse (Vert) Effect

Growth:
- Vertical growth pulse effect.

Speed Modifier:
- Vertical speed rate for pulse effect.

Offset Modifier:
- Vertical offset modifier for pulse effect.

---

Plugin Parameters: Options Settings

Options settings for Animated Message Text Effects.

---

Options

Add Option?:
- Add the 'Animated Text Effects' option to the Options menu?

Adjust Window Height:
- Automatically adjust the options window height?

Option Name:
- Command name of the option.

---
```
