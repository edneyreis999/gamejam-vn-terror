/*:
 * @target MZ
 * @plugindesc [Coreto] [Tier 2] [Version 0.1.0] [AniMsgTextEffects]
 * @author Coreto
 * @orderAfter Coreto_1_MessageCore
 * @orderAfter VisuMZ_1_MessageCore
 * @orderAfter Coreto_2_ExtMessageFunc
 * @orderAfter VisuMZ_2_ExtMessageFunc
 * @orderAfter Coreto_2_VNPictureBusts
 * @orderBefore VisuMZ_3_MessageLog
 * @orderBefore VisuMZ_3_MsgLetterSounds
 * @help
 * Requires one Message provider: Coreto_1_MessageCore 0.1.0 or VisuMZ_1_MessageCore 1.54.
 * Disable VisuMZ_2_AniMsgTextEffects before activating this replacement.
 * Use \Effect<Swing>, \Effect<Swing,Prism> and <Clear Effect> in Show Text.
 * inherit reads the legacy entry when present; own uses this entry.
 * Switching CoretoConfigSource does not copy values. See coreto/README.md and the ani-message CLI namespace.
 *
 * @param CoretoConfigSource
 * @text Configuration source
 * @type select
 * @desc inherit reads the original entry when present; own reads this entry. Switching does not copy values.
 * @default inherit
 * @option inherit
 * @value inherit
 * @option own
 * @value own
 *
 * @param AngleEffects:arraystruct
 * @text Angle Effects
 * @type struct<AngleEffect>[]
 * @desc Named angle-effect presets for message glyphs: pendulum amplitudes are degrees, cosine speeds are radians per frame, offsets are frames per glyph, and continuous rotation is degrees per frame. Configure each preset using the fields below.
 * @default ["{\"Name:str\":\"Swing\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.25\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SlowSwing\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.10\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"FastSwing\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.40\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"Wag\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.25\",\"PendulumOffset:num\":\"8\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SlowWag\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.10\",\"PendulumOffset:num\":\"8\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"FastWag\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.40\",\"PendulumOffset:num\":\"8\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"Jelly\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.25\",\"PendulumOffset:num\":\"15\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SlowJelly\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.10\",\"PendulumOffset:num\":\"15\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"FastJelly\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"15\",\"PendulumSpeed:num\":\"0.40\",\"PendulumOffset:num\":\"12\",\"Rotation\":\"\",\"RotationSpeed:num\":\"0\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SpinCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-2.4\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SlowSpinCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-1.8\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"FastSpinCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-3.6\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SpinCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+2.4\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"SlowSpinCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+1.8\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"FastSpinCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+3.6\",\"RotationOffset:num\":\"0\"}","{\"Name:str\":\"RollCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-2.4\",\"RotationOffset:num\":\"-12\"}","{\"Name:str\":\"SlowRollCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-1.8\",\"RotationOffset:num\":\"-9\"}","{\"Name:str\":\"FastRollCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"-3.6\",\"RotationOffset:num\":\"-15\"}","{\"Name:str\":\"RollCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+2.4\",\"RotationOffset:num\":\"12\"}","{\"Name:str\":\"SlowRollCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+1.8\",\"RotationOffset:num\":\"9\"}","{\"Name:str\":\"FastRollCCW\",\"Angles\":\"\",\"Pendulum\":\"\",\"PendulumArc:num\":\"0\",\"PendulumSpeed:num\":\"0\",\"PendulumOffset:num\":\"0\",\"Rotation\":\"\",\"RotationSpeed:num\":\"+3.6\",\"RotationOffset:num\":\"15\"}"]
 *
 * @param ColorEffects:arraystruct
 * @text Color Effects
 * @type struct<ColorEffect>[]
 * @desc Named color-effect presets for message glyphs: hue uses degrees and tones use [red, green, blue, gray] arrays. Configure each preset using the fields below.
 * @default ["{\"Name:str\":\"Prism\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-6\",\"InitialHueOffset:num\":\"0\"}","{\"Name:str\":\"SlowPrism\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-3\",\"InitialHueOffset:num\":\"0\"}","{\"Name:str\":\"FastPrism\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-9\",\"InitialHueOffset:num\":\"0\"}","{\"Name:str\":\"Rainbow\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-6\",\"InitialHueOffset:num\":\"36\"}","{\"Name:str\":\"SlowRainbow\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-3\",\"InitialHueOffset:num\":\"36\"}","{\"Name:str\":\"FastRainbow\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-9\",\"InitialHueOffset:num\":\"36\"}","{\"Name:str\":\"Gamer\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-6\",\"InitialHueOffset:num\":\"-216\"}","{\"Name:str\":\"SlowGamer\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-3\",\"InitialHueOffset:num\":\"-216\"}","{\"Name:str\":\"FastGamer\",\"Color\":\"\",\"ForcedColor:str\":\"#f69679\",\"Hue\":\"\",\"HueShift:num\":\"-9\",\"InitialHueOffset:num\":\"-216\"}","{\"Name:str\":\"Red\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftRed\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardRed\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Green\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 255, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftGreen\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 255, 0, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardGreen\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 255, 0, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Blue\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftBlue\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 0, 255, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardBlue\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 0, 255, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Yellow\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 255, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftYellow\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 255, 0, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardYellow\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 255, 0, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Cyan\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 255, 255, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftCyan\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 255, 255, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardCyan\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[0, 255, 255, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Magenta\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SoftMagenta\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 255, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"HardMagenta\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 255, 0]\\\",\\\"[0, 0, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"0\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"RGB\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[255, 255, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\",\\\"[0, 255, 255, 0]\\\",\\\"[0, 0, 255, 0]\\\",\\\"[255, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"20\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"SlowRGB\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[255, 255, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\",\\\"[0, 255, 255, 0]\\\",\\\"[0, 0, 255, 0]\\\",\\\"[255, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"FastRGB\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[255, 255, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\",\\\"[0, 255, 255, 0]\\\",\\\"[0, 0, 255, 0]\\\",\\\"[255, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"10\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"Fes\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\"]\",\"toneDelay:num\":\"20\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"SlowFes\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"FastFes\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\"]\",\"toneDelay:num\":\"10\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"false\"}","{\"Name:str\":\"Gig\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\",\\\"[0, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"20\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"SlowGig\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\",\\\"[0, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"30\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}","{\"Name:str\":\"FastGig\",\"Color\":\"\",\"ForcedColor:str\":\"\",\"Hue\":\"\",\"HueShift:num\":\"0\",\"InitialHueOffset:num\":\"0\",\"Tone\":\"\",\"colorTones:arrayeval\":\"[\\\"[255, 0, 0, 0]\\\",\\\"[0, 255, 0, 0]\\\",\\\"[0, 0, 255, 0]\\\"]\",\"toneDelay:num\":\"10\",\"InitialToneOffset:num\":\"-1\",\"SmoothToneChange:eval\":\"true\"}"]
 *
 * @param OpacityEffects:arraystruct
 * @text Opacity Effects
 * @type struct<OpacityEffect>[]
 * @desc Named opacity-effect presets for message glyphs: base opacity is 0..255, glow modulates it with a cosine, and a..z patterns multiply it by 0..1. Configure each preset using the fields below.
 * @default ["{\"Name:str\":\"Glow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.25\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"SlowGlow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.10\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"FastGlow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.40\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Flow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.25\",\"glowOffset:num\":\"2\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"SlowFlow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.10\",\"glowOffset:num\":\"2\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"FastFlow\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.40\",\"glowOffset:num\":\"2\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Blink\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.25\",\"glowOffset:num\":\"15\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"SlowBlink\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.10\",\"glowOffset:num\":\"30\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"FastBlink\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0.50\",\"glowSpeed:num\":\"0.40\",\"glowOffset:num\":\"8\",\"Pattern\":\"\",\"pattern:str\":\"\",\"patternDelay:num\":\"0\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Campfire\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmmaaammmaaammmabcdefaaaammmmabcdefmmmaaaa\",\"patternDelay:num\":\"2\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Candle\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmmmmaaaaammmmmaaaaaabcdefgabcdefg\",\"patternDelay:num\":\"2\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Fade\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"abcdefghijklmnopqrrqponmlkjihgfedcba\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Flicker\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"nmonqnmomnmomomno\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Fluorescent\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmamammmmammamamaaamammma\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Halogen\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmnmmommommnonmmonqnmmo\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Strobe\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mamamamamama\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Torch\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmmaaaabcdefgmmmmaaaammmaamm\",\"patternDelay:num\":\"2\",\"patternOffset:num\":\"0\"}","{\"Name:str\":\"Underwater\",\"Opacity\":\"\",\"InitialOpacity:num\":\"255\",\"Glow\":\"\",\"glowRate:num\":\"0\",\"glowSpeed:num\":\"0\",\"glowOffset:num\":\"0\",\"Pattern\":\"\",\"pattern:str\":\"mmnnmmnnnmmnn\",\"patternDelay:num\":\"4\",\"patternOffset:num\":\"0\"}"]
 *
 * @param PositionEffects:arraystruct
 * @text Positioning Effects
 * @type struct<PositionEffect>[]
 * @desc Named position-effect presets for message glyphs: shake and wave distances are pixels, cosine speeds are radians per frame, and wave offsets are frames per glyph. Configure each preset using the fields below.
 * @default ["{\"Name:str\":\"Shake\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"2\",\"ShakeStrengthVert:num\":\"2\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SoftShake\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"1\",\"ShakeStrengthVert:num\":\"1\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"HardShake\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"3\",\"ShakeStrengthVert:num\":\"3\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"Shiver\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"2\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SoftShiver\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"1\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"HardShiver\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"3\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"Vibe\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"2\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SoftVibe\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"1\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"HardVibe\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"3\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"Stagger\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"4\",\"WaveSpeedY:num\":\"0.25\",\"WaveOffsetY:num\":\"15\"}","{\"Name:str\":\"SlowStagger\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"4\",\"WaveSpeedY:num\":\"0.10\",\"WaveOffsetY:num\":\"30\"}","{\"Name:str\":\"FastStagger\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"4\",\"WaveSpeedY:num\":\"0.50\",\"WaveOffsetY:num\":\"30\"}","{\"Name:str\":\"Saw\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.25\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowSaw\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.10\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"FastSaw\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.40\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"Bounce\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.25\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowBounce\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.10\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"FastBounce\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.40\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"Wave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.25\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.25\",\"WaveOffsetY:num\":\"2\"}","{\"Name:str\":\"SlowWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.10\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.10\",\"WaveOffsetY:num\":\"2\"}","{\"Name:str\":\"FastWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.40\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.40\",\"WaveOffsetY:num\":\"2\"}","{\"Name:str\":\"HorzWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.25\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowHorzWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.10\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"FastHorzWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"3\",\"WaveSpeedX:num\":\"0.40\",\"WaveOffsetX:num\":\"1\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"0\",\"WaveSpeedY:num\":\"0\",\"WaveOffsetY:num\":\"0\"}","{\"Name:str\":\"VertWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.25\",\"WaveOffsetY:num\":\"2\"}","{\"Name:str\":\"SlowVertWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.10\",\"WaveOffsetY:num\":\"2\"}","{\"Name:str\":\"FastVertWave\",\"Positioning\":\"\",\"Shake\":\"\",\"ShakeStrengthHorz:num\":\"0\",\"ShakeStrengthVert:num\":\"0\",\"WaveX\":\"\",\"WaveDistanceX:num\":\"0\",\"WaveSpeedX:num\":\"0\",\"WaveOffsetX:num\":\"0\",\"WaveY\":\"\",\"WaveDistanceY:num\":\"3\",\"WaveSpeedY:num\":\"0.40\",\"WaveOffsetY:num\":\"2\"}"]
 *
 * @param ScaleEffects:arraystruct
 * @text Scaling Effects
 * @type struct<ScaleEffects>[]
 * @desc Named scale-effect presets for message glyphs: flips multiply scale by a cosine, and pulses multiply it by 1 + cos(phase) * growth / 2. Speeds are radians per frame and offsets are frames per glyph. Configure each preset using the fields below.
 * @default ["{\"Name:str\":\"HorzCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.10\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowHorzCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.08\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"FastHorzCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.15\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"VertCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.10\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowVertCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.08\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"FastVertCard\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.15\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"HorzRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.10\",\"FlipOffsetX:num\":\"2\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowHorzRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.08\",\"FlipOffsetX:num\":\"2\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"FastHorzRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0.15\",\"FlipOffsetX:num\":\"2\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"VertRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.10\",\"FlipOffsetY:num\":\"2\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"SlowVertRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.08\",\"FlipOffsetY:num\":\"2\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"FastVertRibbon\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0.15\",\"FlipOffsetY:num\":\"2\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0\",\"PulseSpeedX:num\":\"0\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0\",\"PulseSpeedY:num\":\"0\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"Pulse\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.30\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.30\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"SmallPulse\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.10\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.10\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"BigPulse\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.40\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"0\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.40\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"0\"}","{\"Name:str\":\"Jiggle\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.30\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"2\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.30\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"2\"}","{\"Name:str\":\"SmallJiggle\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.10\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"2\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.10\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"2\"}","{\"Name:str\":\"BigJiggle\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.40\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"2\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"0.40\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"2\"}","{\"Name:str\":\"Gooey\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.30\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"33\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"-0.30\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"33\"}","{\"Name:str\":\"SmallGooey\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.10\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"33\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"-0.10\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"33\"}","{\"Name:str\":\"BigGooey\",\"Scaling\":\"\",\"FlipX\":\"\",\"FlipSpeedX:num\":\"0\",\"FlipOffsetX:num\":\"0\",\"FlipY\":\"\",\"FlipSpeedY:num\":\"0\",\"FlipOffsetY:num\":\"0\",\"PulseX\":\"\",\"PulseGrowthX:num\":\"0.40\",\"PulseSpeedX:num\":\"0.25\",\"PulseOffsetX:num\":\"33\",\"PulseY\":\"\",\"PulseGrowthY:num\":\"-0.40\",\"PulseSpeedY:num\":\"0.25\",\"PulseOffsetY:num\":\"33\"}"]
 *
 * @param Options:struct
 * @text Options Settings
 * @type struct<Options>
 * @desc Options settings for Animated Message Text Effects.
 * @default {"Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Effects"}
 *
 */

/*~struct~AngleEffect:
 * @param Name:str
 * @text Name
 * @type text
 * @desc Name used by the message text effect selector. Names are trimmed and case-insensitive. Avoid commas because selection splits on commas. Blank names and Untitled are ignored; normal clears the active effect. Duplicate normalized names merge their fields, with later entries overriding earlier ones; use distinct names for independent presets.
 * @default Untitled
 *
 * @param PendulumArc:num
 * @text Arc Size
 * @type number
 * @desc Pendulum angular amplitude in degrees. The glyph angle adds round(cos((frame + offset * glyphIndex) * speed) * arc). Zero disables pendulum motion; negative arc reverses the angular displacement. Use finite values; there is no additional amplitude clamp.
 * @default 0
 *
 * @param PendulumSpeed:num
 * @text Speed Modifier
 * @type text
 * @desc Pendulum cosine speed in radians per game frame. A nonzero speed has period 2*pi/abs(speed) frames; zero disables pendulum motion. Reversing its sign produces the same cosine. Use finite values.
 * @default 0
 *
 * @param PendulumOffset:num
 * @text Offset Modifier
 * @type text
 * @desc Pendulum phase offset in frames per glyph: phase = (Graphics.frameCount + offset * glyphIndex) * PendulumSpeed radians. Zero aligns glyphs; negative offsets move their phase in the opposite direction. glyphIndex starts at zero among the page animated glyphs/icons. No additional clamp.
 * @default 0
 *
 * @param RotationSpeed:num
 * @text Speed Modifier
 * @type text
 * @desc Continuous rotation in degrees per glyph update. Positive speed rotates counterclockwise and negative clockwise; zero disables continuous rotation. The speed is subtracted from the angle each frame and the angle wraps around 360 degrees. Use finite values.
 * @default 0
 *
 * @param RotationOffset:num
 * @text Offset Modifier
 * @type text
 * @desc Initial continuous-rotation angle in degrees per glyph: starting angle = offset * glyphIndex. Index starts at zero among the page animated glyphs/icons. Applied only when RotationSpeed is nonzero, before its first update. Positive angles turn clockwise; finite negative values are allowed and angles wrap around 360 degrees.
 * @default 0
 *
 */

/*~struct~ColorEffect:
 * @param Name:str
 * @text Name
 * @type text
 * @desc Name used by the message text effect selector. Names are trimmed and case-insensitive. Avoid commas because selection splits on commas. Blank names and Untitled are ignored; normal clears the active effect. Duplicate normalized names merge their fields, with later entries overriding earlier ones; use distinct names for independent presets.
 * @default Untitled
 *
 * @param ForcedColor:str
 * @text Forced Color
 * @type text
 * @desc Forced glyph text color: use a string containing an MZ text-color palette number, such as "2", or a CSS color such as "#ff0000". An empty string keeps the normal message color.
 * @default 
 *
 * @param HueShift:num
 * @text Hue Shift
 * @type text
 * @desc Hue increment in degrees per glyph update. A full color cycle is 360 degrees; positive and negative values traverse it in opposite directions. Zero disables hue animation and InitialHueOffset. Use finite values; the runtime wraps the hue while rendering the cyclic color.
 * @default 0
 *
 * @param InitialHueOffset:num
 * @text Offset Modifier
 * @type text
 * @desc Initial hue angle in degrees per glyph: initial hue = offset * glyphIndex, then HueShift is added on the first update. Index starts at zero among the page animated glyphs/icons. Positive/negative finite offsets shift the cyclic colors in opposite directions; only used when HueShift is nonzero.
 * @default 0
 *
 * @param colorTones:arrayeval
 * @text Color Tone(s)
 * @type string[]
 * @desc Ordered tone sequence. Supply a JSON array of JavaScript source strings, each evaluating to [red, green, blue, gray], for example ["[40, 0, 0, 0]", "[0, 0, 40, 0]"]. Use RGB offsets -255..255 (0 neutral; positive adds, negative subtracts) and gray 0..255 (0 original saturation, 255 grayscale). An empty list disables tone animation. Values are evaluated at configuration loading; use four finite numeric components per tone.
 * @default []
 *
 * @param toneDelay:num
 * @text Frame Delay
 * @type number
 * @desc Delay in game update frames between tone changes. The effective delay is max(value, 1), so the published default 0 advances every frame. Use whole frame counts; an empty tone sequence ignores this field.
 * @default 0
 *
 * @param InitialToneOffset:num
 * @text Offset Modifier
 * @type text
 * @desc Initial tone-sequence offset in whole tone entries per glyph. Initial index is (offset * glyphIndex + floor(Graphics.frameCount / max(toneDelay, 1))) wrapped to the sequence length; negative offsets wrap too. Zero starts glyphs together. Use whole numbers to avoid a missing array entry; an empty tone sequence ignores this field.
 * @default 0
 *
 * @param SmoothToneChange:eval
 * @text Smooth Transition?
 * @type boolean
 * @desc Make a smooth transition for tone changes?
 * @default false
 *
 */

/*~struct~OpacityEffect:
 * @param Name:str
 * @text Name
 * @type text
 * @desc Name used by the message text effect selector. Names are trimmed and case-insensitive. Avoid commas because selection splits on commas. Blank names and Untitled are ignored; normal clears the active effect. Duplicate normalized names merge their fields, with later entries overriding earlier ones; use distinct names for independent presets.
 * @default Untitled
 *
 * @param InitialOpacity:num
 * @text Base Opacity
 * @type text
 * @desc Base glyph opacity from 0 (invisible) to 255 (opaque). Pattern letters multiply this value and glow then adjusts it; the rendered result is clamped to 0..255. Use a finite value in that range.
 * @default 255
 *
 * @param glowRate:num
 * @text Glow Rate
 * @type text
 * @desc Glow depth as a factor of 255 opacity units. The adjustment is round((cos(phase) - 1) * glowRate * 255 / 2), added after the pattern. For a fading glow, use 0..1; 0 disables glow, 1 can subtract up to 255. Negative factors brighten instead; rendered opacity is clamped to 0..255. No additional factor clamp.
 * @default 0
 *
 * @param glowSpeed:num
 * @text Glow Speed
 * @type text
 * @desc Glow cosine speed in radians per game frame. Period is 2*pi/abs(speed) frames when nonzero; zero disables glow. A negative speed gives the same cosine as its positive counterpart. Use finite values.
 * @default 0
 *
 * @param glowOffset:num
 * @text Offset Modifier
 * @type text
 * @desc Glow phase offset in frames per glyph: phase = (Graphics.frameCount + offset * glyphIndex) * glowSpeed radians. Index starts at zero among the page animated glyphs/icons. Zero synchronizes glyphs; finite negative offsets reverse their phase spacing.
 * @default 0
 *
 * @param pattern:str
 * @text Custom Pattern
 * @type text
 * @desc Repeating opacity pattern of letters a..z, case-insensitive with surrounding whitespace trimmed. a multiplies base opacity by 0, z by 1, and intermediate letters by (letterCode - 97)/25. The pattern advances every max(patternDelay, 1) frames and wraps. Empty text disables the pattern and leaves base opacity for glow processing.
 * @default 
 *
 * @param patternDelay:num
 * @text Frame Delay
 * @type number
 * @desc Delay in game update frames between opacity-pattern steps. The effective delay is max(value, 1), so the published default 0 advances every frame. Use whole frame counts; an empty pattern ignores this field.
 * @default 0
 *
 * @param patternOffset:num
 * @text Offset Modifier
 * @type text
 * @desc Initial pattern position in characters per glyph: index = patternOffset * glyphIndex, wrapped to the pattern length, including negative values. Use whole numbers; character lookup truncates any fractional index. Each update step advances one character and wraps. Zero synchronizes glyphs; an empty pattern ignores this field.
 * @default 0
 *
 */

/*~struct~PositionEffect:
 * @param Name:str
 * @text Name
 * @type text
 * @desc Name used by the message text effect selector. Names are trimmed and case-insensitive. Avoid commas because selection splits on commas. Blank names and Untitled are ignored; normal clears the active effect. Duplicate normalized names merge their fields, with later entries overriding earlier ones; use distinct names for independent presets.
 * @default Untitled
 *
 * @param ShakeStrengthHorz:num
 * @text Horz Strength
 * @type number
 * @desc Horizontal random shake amplitude in pixels. Use a nonnegative whole number N: each frame adds a randomly signed integer from 0 through N to the glyph base X. Zero disables horizontal shake. Fractional and negative inputs are not clamped and do not produce this documented amplitude distribution.
 * @default 0
 *
 * @param ShakeStrengthVert:num
 * @text Vert Strength
 * @type number
 * @desc Vertical random shake amplitude in pixels. Use a nonnegative whole number N: each frame adds a randomly signed integer from 0 through N to the glyph base Y. Zero disables vertical shake. Fractional and negative inputs are not clamped and do not produce this documented amplitude distribution.
 * @default 0
 *
 * @param WaveDistanceX:num
 * @text Distance
 * @type number
 * @desc Horizontal wave amplitude in pixels. Adds round(cos(phase) * distance) to the glyph base X; it oscillates between approximately -abs(distance) and +abs(distance). Zero disables this axis and negative distance reverses displacement. Use finite values; no additional clamp.
 * @default 0
 *
 * @param WaveSpeedX:num
 * @text Speed Modifier
 * @type text
 * @desc Horizontal wave cosine speed in radians per game frame. A nonzero speed has period 2*pi/abs(speed) frames; zero disables the wave. Changing the sign yields the same cosine. Use finite values.
 * @default 0
 *
 * @param WaveOffsetX:num
 * @text Offset Modifier
 * @type text
 * @desc Horizontal wave phase offset in frames per glyph: phase = (Graphics.frameCount + offset * glyphIndex) * WaveSpeedX radians. Index starts at zero among the page animated glyphs/icons. Zero aligns glyphs; negative finite offsets reverse their phase spacing.
 * @default 0
 *
 * @param WaveDistanceY:num
 * @text Distance
 * @type number
 * @desc Vertical wave amplitude in pixels. Adds round(cos(phase) * distance) to the glyph base Y; it oscillates between approximately -abs(distance) and +abs(distance). Zero disables this axis and negative distance reverses displacement. Use finite values; no additional clamp.
 * @default 0
 *
 * @param WaveSpeedY:num
 * @text Speed Modifier
 * @type text
 * @desc Vertical wave cosine speed in radians per game frame. A nonzero speed has period 2*pi/abs(speed) frames; zero disables the wave. Changing the sign yields the same cosine. Use finite values.
 * @default 0
 *
 * @param WaveOffsetY:num
 * @text Offset Modifier
 * @type text
 * @desc Vertical wave phase offset in frames per glyph: phase = (Graphics.frameCount + offset * glyphIndex) * WaveSpeedY radians. Index starts at zero among the page animated glyphs/icons. Zero aligns glyphs; negative finite offsets reverse their phase spacing.
 * @default 0
 *
 */

/*~struct~ScaleEffects:
 * @param Name:str
 * @text Name
 * @type text
 * @desc Name used by the message text effect selector. Names are trimmed and case-insensitive. Avoid commas because selection splits on commas. Blank names and Untitled are ignored; normal clears the active effect. Duplicate normalized names merge their fields, with later entries overriding earlier ones; use distinct names for independent presets.
 * @default Untitled
 *
 * @param FlipSpeedX:num
 * @text Speed Modifier
 * @type text
 * @desc X-axis flip cosine speed in radians per game frame; multiplier = cos((frame + FlipOffsetX * glyphIndex) * speed). It cycles from normal scale through zero to mirrored scale with period 2*pi/abs(speed). Zero disables the flip; changing speed sign yields the same cosine. Use finite values.
 * @default 0
 *
 * @param FlipOffsetX:num
 * @text Offset Modifier
 * @type text
 * @desc X-axis flip phase offset in frames per glyph. phase = (Graphics.frameCount + offset * glyphIndex) * FlipSpeedX. Zero aligns glyphs; finite negative offsets reverse phase spacing. Index starts at zero among animated glyphs/icons.
 * @default 0
 *
 * @param FlipSpeedY:num
 * @text Speed Modifier
 * @type text
 * @desc Y-axis flip cosine speed in radians per game frame; multiplier = cos((frame + FlipOffsetY * glyphIndex) * speed). It cycles from normal scale through zero to mirrored scale with period 2*pi/abs(speed). Zero disables the flip; changing speed sign yields the same cosine. Use finite values.
 * @default 0
 *
 * @param FlipOffsetY:num
 * @text Offset Modifier
 * @type text
 * @desc Y-axis flip phase offset in frames per glyph. phase = (Graphics.frameCount + offset * glyphIndex) * FlipSpeedY. Zero aligns glyphs; finite negative offsets reverse phase spacing. Index starts at zero among animated glyphs/icons.
 * @default 0
 *
 * @param PulseGrowthX:num
 * @text Growth
 * @type text
 * @desc X-axis pulse growth factor: multiplier = 1 + cos(phase) * growth/2, applied with the flip and message-window scale. Zero disables pulsing. For growth 1, scale ranges from 0.5 to 1.5 times the base; negative growth reverses the pulse. Values with abs(growth)>2 can mirror the glyph. Use finite values; no additional clamp.
 * @default 0
 *
 * @param PulseSpeedX:num
 * @text Speed Modifier
 * @type text
 * @desc X-axis pulse cosine speed in radians per game frame. Period = 2*pi/abs(speed) frames for nonzero values; zero disables pulsing. Changing the sign yields the same cosine. Use finite values.
 * @default 0
 *
 * @param PulseOffsetX:num
 * @text Offset Modifier
 * @type text
 * @desc X-axis pulse phase offset in frames per glyph. phase = (Graphics.frameCount + offset * glyphIndex) * PulseSpeedX. Zero aligns glyphs; finite negative offsets reverse phase spacing. Index starts at zero among animated glyphs/icons.
 * @default 0
 *
 * @param PulseGrowthY:num
 * @text Growth
 * @type text
 * @desc Y-axis pulse growth factor: multiplier = 1 + cos(phase) * growth/2, applied with the flip and message-window scale. Zero disables pulsing. For growth 1, scale ranges from 0.5 to 1.5 times the base; negative growth reverses the pulse. Values with abs(growth)>2 can mirror the glyph. Use finite values; no additional clamp.
 * @default 0
 *
 * @param PulseSpeedY:num
 * @text Speed Modifier
 * @type text
 * @desc Y-axis pulse cosine speed in radians per game frame. Period = 2*pi/abs(speed) frames for nonzero values; zero disables pulsing. Changing the sign yields the same cosine. Use finite values.
 * @default 0
 *
 * @param PulseOffsetY:num
 * @text Offset Modifier
 * @type text
 * @desc Y-axis pulse phase offset in frames per glyph. phase = (Graphics.frameCount + offset * glyphIndex) * PulseSpeedY. Zero aligns glyphs; finite negative offsets reverse phase spacing. Index starts at zero among animated glyphs/icons.
 * @default 0
 *
 */

/*~struct~Options:
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @desc Add the 'Text Effects' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @desc Preserved setting; Ani 1.05 does not use it to change the Options rectangle.
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @type text
 * @desc Command name of the option.
 * @default Text Effects
 *
 */

(() => {
"use strict";
const catalog = {
  "schemaVersion": 1,
  "pluginId": "Coreto_2_AniMsgTextEffects",
  "version": "0.1.0",
  "reference": {
    "pluginId": "VisuMZ_2_AniMsgTextEffects",
    "version": "1.05"
  },
  "parameters": [
    {
      "id": "ANI-CONFIG-SOURCE",
      "key": "CoretoConfigSource",
      "storageKey": "CoretoConfigSource",
      "label": "Configuration source",
      "description": "inherit reads the original entry when present; own reads this entry. Switching does not copy values.",
      "type": "string",
      "editorType": "select",
      "options": [
        "inherit",
        "own"
      ],
      "default": "inherit",
      "nativeDefault": "inherit",
      "availability": "supported"
    },
    {
      "id": "ANI-M-006",
      "key": "AngleEffects",
      "storageKey": "AngleEffects:arraystruct",
      "label": "Angle Effects",
      "description": "Named angle-effect presets for message glyphs: pendulum amplitudes are degrees, cosine speeds are radians per frame, offsets are frames per glyph, and continuous rotation is degrees per frame. Configure each preset using the fields below.",
      "editorType": "struct<AngleEffect>[]",
      "nativeDefault": "[\"{\\\"Name:str\\\":\\\"Swing\\\",\\\"Angles\\\":\\\"\\\",\\\"Pendulum\\\":\\\"\\\",\\\"PendulumArc:num\\\":\\\"15\\\",\\\"PendulumSpeed:num\\\":\\\"0.25\\\",\\\"PendulumOffset:num\\\":\\\"0\\\",\\\"Rotation\\\":\\\"\\\",\\\"RotationSpeed:num\\\":\\\"0\\\",\\\"RotationOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"SlowSwing\\\",\\\"Angles\\\":\\\"\\\",\\\"Pendulum\\\":\\\"\\\",\\\"PendulumArc:num\\\":\\\"15\\\",\\\"PendulumSpeed:num\\\":\\\"0.10\\\",\\\"PendulumOffset:num\\\":\\\"0\\\",\\\"Rotation\\\":\\\"\\\",\\\"RotationSpeed:num\\\":\\\"0\\\",\\\"RotationOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"FastSwing\\\",\\\"Angles\\\":\\\"\\\",\\\"Pendulum\\\":\\\"\\\",\\\"PendulumArc:num\\\":\\\"15\\\",\\\"PendulumSpeed:num\\\":\\\"0.40\\\",\\\"PendulumOffset:num\\\":\\\"0\\\",\\\"Rotation\\\":\\\"\\\",\\\"RotationSpeed:num\\\":\\\"0\\\",\\\"RotationOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"Wag\\\",\\\"Angles\\\":\\\"\\\",\\\"Pendulum\\\":\\\"\\\",\\\"PendulumArc:num\\\":\\\"15\\\",\\\"PendulumSpeed:num\\\":\\\"0.25\\\",\\\"PendulumOffset:num\\\":\\\"8\\\",\\\"Rotation\\\":\\\"\\\",\\\"RotationSpeed:num\\\":\\\"0\\\",\\\"RotationOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"SlowWag\\\",\\\"Angles\\\":\\\"\\\",\\\"Pendulum\\\":\\\"\\\",\\\"PendulumArc:num\\\":\\\"15\\\",\\\"PendulumSpeed:num\\\":\\\"0.10\\\",\\\"PendulumOffset:num\\\":\\\"8\\\",\\\"Rotation\\\":\\\"\\\",\\\"RotationSpeed:num\\\":\\\"0\\\",\\\"RotationOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"FastWag\\\",\\\"Angles\\\":\\\"\\\",\\\"Pendulum\\\":\\\"\\\",\\\"PendulumArc:num\\\":\\\"15\\\",\\\"PendulumSpeed:num\\\":\\\"0.40\\\",\\\"PendulumOffset:num\\\":\\\"8\\\",\\\"Rotation\\\":\\\"\\\",\\\"RotationSpeed:num\\\":\\\"0\\\",\\\"RotationOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"Jelly\\\",\\\"Angles\\\":\\\"\\\",\\\"Pendulum\\\":\\\"\\\",\\\"PendulumArc:num\\\":\\\"15\\\",\\\"PendulumSpeed:num\\\":\\\"0.25\\\",\\\"PendulumOffset:num\\\":\\\"15\\\",\\\"Rotation\\\":\\\"\\\",\\\"RotationSpeed:num\\\":\\\"0\\\",\\\"RotationOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"SlowJelly\\\",\\\"Angles\\\":\\\"\\\",\\\"Pendulum\\\":\\\"\\\",\\\"PendulumArc:num\\\":\\\"15\\\",\\\"PendulumSpeed:num\\\":\\\"0.10\\\",\\\"PendulumOffset:num\\\":\\\"15\\\",\\\"Rotation\\\":\\\"\\\",\\\"RotationSpeed:num\\\":\\\"0\\\",\\\"RotationOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"FastJelly\\\",\\\"Angles\\\":\\\"\\\",\\\"Pendulum\\\":\\\"\\\",\\\"PendulumArc:num\\\":\\\"15\\\",\\\"PendulumSpeed:num\\\":\\\"0.40\\\",\\\"PendulumOffset:num\\\":\\\"12\\\",\\\"Rotation\\\":\\\"\\\",\\\"RotationSpeed:num\\\":\\\"0\\\",\\\"RotationOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"SpinCW\\\",\\\"Angles\\\":\\\"\\\",\\\"Pendulum\\\":\\\"\\\",\\\"PendulumArc:num\\\":\\\"0\\\",\\\"PendulumSpeed:num\\\":\\\"0\\\",\\\"PendulumOffset:num\\\":\\\"0\\\",\\\"Rotation\\\":\\\"\\\",\\\"RotationSpeed:num\\\":\\\"-2.4\\\",\\\"RotationOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"SlowSpinCW\\\",\\\"Angles\\\":\\\"\\\",\\\"Pendulum\\\":\\\"\\\",\\\"PendulumArc:num\\\":\\\"0\\\",\\\"PendulumSpeed:num\\\":\\\"0\\\",\\\"PendulumOffset:num\\\":\\\"0\\\",\\\"Rotation\\\":\\\"\\\",\\\"RotationSpeed:num\\\":\\\"-1.8\\\",\\\"RotationOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"FastSpinCW\\\",\\\"Angles\\\":\\\"\\\",\\\"Pendulum\\\":\\\"\\\",\\\"PendulumArc:num\\\":\\\"0\\\",\\\"PendulumSpeed:num\\\":\\\"0\\\",\\\"PendulumOffset:num\\\":\\\"0\\\",\\\"Rotation\\\":\\\"\\\",\\\"RotationSpeed:num\\\":\\\"-3.6\\\",\\\"RotationOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"SpinCCW\\\",\\\"Angles\\\":\\\"\\\",\\\"Pendulum\\\":\\\"\\\",\\\"PendulumArc:num\\\":\\\"0\\\",\\\"PendulumSpeed:num\\\":\\\"0\\\",\\\"PendulumOffset:num\\\":\\\"0\\\",\\\"Rotation\\\":\\\"\\\",\\\"RotationSpeed:num\\\":\\\"+2.4\\\",\\\"RotationOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"SlowSpinCCW\\\",\\\"Angles\\\":\\\"\\\",\\\"Pendulum\\\":\\\"\\\",\\\"PendulumArc:num\\\":\\\"0\\\",\\\"PendulumSpeed:num\\\":\\\"0\\\",\\\"PendulumOffset:num\\\":\\\"0\\\",\\\"Rotation\\\":\\\"\\\",\\\"RotationSpeed:num\\\":\\\"+1.8\\\",\\\"RotationOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"FastSpinCCW\\\",\\\"Angles\\\":\\\"\\\",\\\"Pendulum\\\":\\\"\\\",\\\"PendulumArc:num\\\":\\\"0\\\",\\\"PendulumSpeed:num\\\":\\\"0\\\",\\\"PendulumOffset:num\\\":\\\"0\\\",\\\"Rotation\\\":\\\"\\\",\\\"RotationSpeed:num\\\":\\\"+3.6\\\",\\\"RotationOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"RollCW\\\",\\\"Angles\\\":\\\"\\\",\\\"Pendulum\\\":\\\"\\\",\\\"PendulumArc:num\\\":\\\"0\\\",\\\"PendulumSpeed:num\\\":\\\"0\\\",\\\"PendulumOffset:num\\\":\\\"0\\\",\\\"Rotation\\\":\\\"\\\",\\\"RotationSpeed:num\\\":\\\"-2.4\\\",\\\"RotationOffset:num\\\":\\\"-12\\\"}\",\"{\\\"Name:str\\\":\\\"SlowRollCW\\\",\\\"Angles\\\":\\\"\\\",\\\"Pendulum\\\":\\\"\\\",\\\"PendulumArc:num\\\":\\\"0\\\",\\\"PendulumSpeed:num\\\":\\\"0\\\",\\\"PendulumOffset:num\\\":\\\"0\\\",\\\"Rotation\\\":\\\"\\\",\\\"RotationSpeed:num\\\":\\\"-1.8\\\",\\\"RotationOffset:num\\\":\\\"-9\\\"}\",\"{\\\"Name:str\\\":\\\"FastRollCW\\\",\\\"Angles\\\":\\\"\\\",\\\"Pendulum\\\":\\\"\\\",\\\"PendulumArc:num\\\":\\\"0\\\",\\\"PendulumSpeed:num\\\":\\\"0\\\",\\\"PendulumOffset:num\\\":\\\"0\\\",\\\"Rotation\\\":\\\"\\\",\\\"RotationSpeed:num\\\":\\\"-3.6\\\",\\\"RotationOffset:num\\\":\\\"-15\\\"}\",\"{\\\"Name:str\\\":\\\"RollCCW\\\",\\\"Angles\\\":\\\"\\\",\\\"Pendulum\\\":\\\"\\\",\\\"PendulumArc:num\\\":\\\"0\\\",\\\"PendulumSpeed:num\\\":\\\"0\\\",\\\"PendulumOffset:num\\\":\\\"0\\\",\\\"Rotation\\\":\\\"\\\",\\\"RotationSpeed:num\\\":\\\"+2.4\\\",\\\"RotationOffset:num\\\":\\\"12\\\"}\",\"{\\\"Name:str\\\":\\\"SlowRollCCW\\\",\\\"Angles\\\":\\\"\\\",\\\"Pendulum\\\":\\\"\\\",\\\"PendulumArc:num\\\":\\\"0\\\",\\\"PendulumSpeed:num\\\":\\\"0\\\",\\\"PendulumOffset:num\\\":\\\"0\\\",\\\"Rotation\\\":\\\"\\\",\\\"RotationSpeed:num\\\":\\\"+1.8\\\",\\\"RotationOffset:num\\\":\\\"9\\\"}\",\"{\\\"Name:str\\\":\\\"FastRollCCW\\\",\\\"Angles\\\":\\\"\\\",\\\"Pendulum\\\":\\\"\\\",\\\"PendulumArc:num\\\":\\\"0\\\",\\\"PendulumSpeed:num\\\":\\\"0\\\",\\\"PendulumOffset:num\\\":\\\"0\\\",\\\"Rotation\\\":\\\"\\\",\\\"RotationSpeed:num\\\":\\\"+3.6\\\",\\\"RotationOffset:num\\\":\\\"15\\\"}\"]",
      "type": "array",
      "items": {
        "type": "struct",
        "structName": "AngleEffect",
        "fields": [
          {
            "id": "ANI-M-015",
            "key": "Name",
            "storageKey": "Name:str",
            "label": "Name",
            "description": "Name used by the message text effect selector. Names are trimmed and case-insensitive. Avoid commas because selection splits on commas. Blank names and Untitled are ignored; normal clears the active effect. Duplicate normalized names merge their fields, with later entries overriding earlier ones; use distinct names for independent presets.",
            "editorType": "text",
            "nativeDefault": "Untitled",
            "type": "string",
            "default": "Untitled",
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-018",
            "key": "PendulumArc",
            "storageKey": "PendulumArc:num",
            "label": "Arc Size",
            "description": "Pendulum angular amplitude in degrees. The glyph angle adds round(cos((frame + offset * glyphIndex) * speed) * arc). Zero disables pendulum motion; negative arc reverses the angular displacement. Use finite values; there is no additional amplitude clamp.",
            "editorType": "number",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-019",
            "key": "PendulumSpeed",
            "storageKey": "PendulumSpeed:num",
            "label": "Speed Modifier",
            "description": "Pendulum cosine speed in radians per game frame. A nonzero speed has period 2*pi/abs(speed) frames; zero disables pendulum motion. Reversing its sign produces the same cosine. Use finite values.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-020",
            "key": "PendulumOffset",
            "storageKey": "PendulumOffset:num",
            "label": "Offset Modifier",
            "description": "Pendulum phase offset in frames per glyph: phase = (Graphics.frameCount + offset * glyphIndex) * PendulumSpeed radians. Zero aligns glyphs; negative offsets move their phase in the opposite direction. glyphIndex starts at zero among the page animated glyphs/icons. No additional clamp.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-022",
            "key": "RotationSpeed",
            "storageKey": "RotationSpeed:num",
            "label": "Speed Modifier",
            "description": "Continuous rotation in degrees per glyph update. Positive speed rotates counterclockwise and negative clockwise; zero disables continuous rotation. The speed is subtracted from the angle each frame and the angle wraps around 360 degrees. Use finite values.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-023",
            "key": "RotationOffset",
            "storageKey": "RotationOffset:num",
            "label": "Offset Modifier",
            "description": "Initial continuous-rotation angle in degrees per glyph: starting angle = offset * glyphIndex. Index starts at zero among the page animated glyphs/icons. Applied only when RotationSpeed is nonzero, before its first update. Positive angles turn clockwise; finite negative values are allowed and angles wrap around 360 degrees.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          }
        ],
        "default": {
          "Name": "Untitled",
          "PendulumArc": 0,
          "PendulumSpeed": 0,
          "PendulumOffset": 0,
          "RotationSpeed": 0,
          "RotationOffset": 0
        }
      },
      "default": [
        {
          "Name": "Swing",
          "PendulumArc": 15,
          "PendulumSpeed": 0.25,
          "PendulumOffset": 0,
          "RotationSpeed": 0,
          "RotationOffset": 0
        },
        {
          "Name": "SlowSwing",
          "PendulumArc": 15,
          "PendulumSpeed": 0.1,
          "PendulumOffset": 0,
          "RotationSpeed": 0,
          "RotationOffset": 0
        },
        {
          "Name": "FastSwing",
          "PendulumArc": 15,
          "PendulumSpeed": 0.4,
          "PendulumOffset": 0,
          "RotationSpeed": 0,
          "RotationOffset": 0
        },
        {
          "Name": "Wag",
          "PendulumArc": 15,
          "PendulumSpeed": 0.25,
          "PendulumOffset": 8,
          "RotationSpeed": 0,
          "RotationOffset": 0
        },
        {
          "Name": "SlowWag",
          "PendulumArc": 15,
          "PendulumSpeed": 0.1,
          "PendulumOffset": 8,
          "RotationSpeed": 0,
          "RotationOffset": 0
        },
        {
          "Name": "FastWag",
          "PendulumArc": 15,
          "PendulumSpeed": 0.4,
          "PendulumOffset": 8,
          "RotationSpeed": 0,
          "RotationOffset": 0
        },
        {
          "Name": "Jelly",
          "PendulumArc": 15,
          "PendulumSpeed": 0.25,
          "PendulumOffset": 15,
          "RotationSpeed": 0,
          "RotationOffset": 0
        },
        {
          "Name": "SlowJelly",
          "PendulumArc": 15,
          "PendulumSpeed": 0.1,
          "PendulumOffset": 15,
          "RotationSpeed": 0,
          "RotationOffset": 0
        },
        {
          "Name": "FastJelly",
          "PendulumArc": 15,
          "PendulumSpeed": 0.4,
          "PendulumOffset": 12,
          "RotationSpeed": 0,
          "RotationOffset": 0
        },
        {
          "Name": "SpinCW",
          "PendulumArc": 0,
          "PendulumSpeed": 0,
          "PendulumOffset": 0,
          "RotationSpeed": -2.4,
          "RotationOffset": 0
        },
        {
          "Name": "SlowSpinCW",
          "PendulumArc": 0,
          "PendulumSpeed": 0,
          "PendulumOffset": 0,
          "RotationSpeed": -1.8,
          "RotationOffset": 0
        },
        {
          "Name": "FastSpinCW",
          "PendulumArc": 0,
          "PendulumSpeed": 0,
          "PendulumOffset": 0,
          "RotationSpeed": -3.6,
          "RotationOffset": 0
        },
        {
          "Name": "SpinCCW",
          "PendulumArc": 0,
          "PendulumSpeed": 0,
          "PendulumOffset": 0,
          "RotationSpeed": 2.4,
          "RotationOffset": 0
        },
        {
          "Name": "SlowSpinCCW",
          "PendulumArc": 0,
          "PendulumSpeed": 0,
          "PendulumOffset": 0,
          "RotationSpeed": 1.8,
          "RotationOffset": 0
        },
        {
          "Name": "FastSpinCCW",
          "PendulumArc": 0,
          "PendulumSpeed": 0,
          "PendulumOffset": 0,
          "RotationSpeed": 3.6,
          "RotationOffset": 0
        },
        {
          "Name": "RollCW",
          "PendulumArc": 0,
          "PendulumSpeed": 0,
          "PendulumOffset": 0,
          "RotationSpeed": -2.4,
          "RotationOffset": -12
        },
        {
          "Name": "SlowRollCW",
          "PendulumArc": 0,
          "PendulumSpeed": 0,
          "PendulumOffset": 0,
          "RotationSpeed": -1.8,
          "RotationOffset": -9
        },
        {
          "Name": "FastRollCW",
          "PendulumArc": 0,
          "PendulumSpeed": 0,
          "PendulumOffset": 0,
          "RotationSpeed": -3.6,
          "RotationOffset": -15
        },
        {
          "Name": "RollCCW",
          "PendulumArc": 0,
          "PendulumSpeed": 0,
          "PendulumOffset": 0,
          "RotationSpeed": 2.4,
          "RotationOffset": 12
        },
        {
          "Name": "SlowRollCCW",
          "PendulumArc": 0,
          "PendulumSpeed": 0,
          "PendulumOffset": 0,
          "RotationSpeed": 1.8,
          "RotationOffset": 9
        },
        {
          "Name": "FastRollCCW",
          "PendulumArc": 0,
          "PendulumSpeed": 0,
          "PendulumOffset": 0,
          "RotationSpeed": 3.6,
          "RotationOffset": 15
        }
      ],
      "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
    },
    {
      "id": "ANI-M-007",
      "key": "ColorEffects",
      "storageKey": "ColorEffects:arraystruct",
      "label": "Color Effects",
      "description": "Named color-effect presets for message glyphs: hue uses degrees and tones use [red, green, blue, gray] arrays. Configure each preset using the fields below.",
      "editorType": "struct<ColorEffect>[]",
      "nativeDefault": "[\"{\\\"Name:str\\\":\\\"Prism\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"#f69679\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"-6\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"SlowPrism\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"#f69679\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"-3\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"FastPrism\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"#f69679\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"-9\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"Rainbow\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"#f69679\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"-6\\\",\\\"InitialHueOffset:num\\\":\\\"36\\\"}\",\"{\\\"Name:str\\\":\\\"SlowRainbow\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"#f69679\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"-3\\\",\\\"InitialHueOffset:num\\\":\\\"36\\\"}\",\"{\\\"Name:str\\\":\\\"FastRainbow\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"#f69679\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"-9\\\",\\\"InitialHueOffset:num\\\":\\\"36\\\"}\",\"{\\\"Name:str\\\":\\\"Gamer\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"#f69679\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"-6\\\",\\\"InitialHueOffset:num\\\":\\\"-216\\\"}\",\"{\\\"Name:str\\\":\\\"SlowGamer\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"#f69679\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"-3\\\",\\\"InitialHueOffset:num\\\":\\\"-216\\\"}\",\"{\\\"Name:str\\\":\\\"FastGamer\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"#f69679\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"-9\\\",\\\"InitialHueOffset:num\\\":\\\"-216\\\"}\",\"{\\\"Name:str\\\":\\\"Red\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[255, 0, 0, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"30\\\",\\\"InitialToneOffset:num\\\":\\\"0\\\",\\\"SmoothToneChange:eval\\\":\\\"false\\\"}\",\"{\\\"Name:str\\\":\\\"SoftRed\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[255, 0, 0, 0]\\\\\\\",\\\\\\\"[0, 0, 0, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"30\\\",\\\"InitialToneOffset:num\\\":\\\"0\\\",\\\"SmoothToneChange:eval\\\":\\\"true\\\"}\",\"{\\\"Name:str\\\":\\\"HardRed\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[255, 0, 0, 0]\\\\\\\",\\\\\\\"[0, 0, 0, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"30\\\",\\\"InitialToneOffset:num\\\":\\\"0\\\",\\\"SmoothToneChange:eval\\\":\\\"false\\\"}\",\"{\\\"Name:str\\\":\\\"Green\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[0, 255, 0, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"30\\\",\\\"InitialToneOffset:num\\\":\\\"0\\\",\\\"SmoothToneChange:eval\\\":\\\"false\\\"}\",\"{\\\"Name:str\\\":\\\"SoftGreen\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[0, 255, 0, 0]\\\\\\\",\\\\\\\"[0, 0, 0, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"30\\\",\\\"InitialToneOffset:num\\\":\\\"0\\\",\\\"SmoothToneChange:eval\\\":\\\"true\\\"}\",\"{\\\"Name:str\\\":\\\"HardGreen\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[0, 255, 0, 0]\\\\\\\",\\\\\\\"[0, 0, 0, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"30\\\",\\\"InitialToneOffset:num\\\":\\\"0\\\",\\\"SmoothToneChange:eval\\\":\\\"false\\\"}\",\"{\\\"Name:str\\\":\\\"Blue\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[0, 0, 255, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"30\\\",\\\"InitialToneOffset:num\\\":\\\"0\\\",\\\"SmoothToneChange:eval\\\":\\\"false\\\"}\",\"{\\\"Name:str\\\":\\\"SoftBlue\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[0, 0, 255, 0]\\\\\\\",\\\\\\\"[0, 0, 0, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"30\\\",\\\"InitialToneOffset:num\\\":\\\"0\\\",\\\"SmoothToneChange:eval\\\":\\\"true\\\"}\",\"{\\\"Name:str\\\":\\\"HardBlue\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[0, 0, 255, 0]\\\\\\\",\\\\\\\"[0, 0, 0, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"30\\\",\\\"InitialToneOffset:num\\\":\\\"0\\\",\\\"SmoothToneChange:eval\\\":\\\"false\\\"}\",\"{\\\"Name:str\\\":\\\"Yellow\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[255, 255, 0, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"30\\\",\\\"InitialToneOffset:num\\\":\\\"0\\\",\\\"SmoothToneChange:eval\\\":\\\"false\\\"}\",\"{\\\"Name:str\\\":\\\"SoftYellow\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[255, 255, 0, 0]\\\\\\\",\\\\\\\"[0, 0, 0, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"30\\\",\\\"InitialToneOffset:num\\\":\\\"0\\\",\\\"SmoothToneChange:eval\\\":\\\"true\\\"}\",\"{\\\"Name:str\\\":\\\"HardYellow\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[255, 255, 0, 0]\\\\\\\",\\\\\\\"[0, 0, 0, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"30\\\",\\\"InitialToneOffset:num\\\":\\\"0\\\",\\\"SmoothToneChange:eval\\\":\\\"false\\\"}\",\"{\\\"Name:str\\\":\\\"Cyan\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[0, 255, 255, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"30\\\",\\\"InitialToneOffset:num\\\":\\\"0\\\",\\\"SmoothToneChange:eval\\\":\\\"false\\\"}\",\"{\\\"Name:str\\\":\\\"SoftCyan\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[0, 255, 255, 0]\\\\\\\",\\\\\\\"[0, 0, 0, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"30\\\",\\\"InitialToneOffset:num\\\":\\\"0\\\",\\\"SmoothToneChange:eval\\\":\\\"true\\\"}\",\"{\\\"Name:str\\\":\\\"HardCyan\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[0, 255, 255, 0]\\\\\\\",\\\\\\\"[0, 0, 0, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"30\\\",\\\"InitialToneOffset:num\\\":\\\"0\\\",\\\"SmoothToneChange:eval\\\":\\\"false\\\"}\",\"{\\\"Name:str\\\":\\\"Magenta\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[255, 0, 255, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"30\\\",\\\"InitialToneOffset:num\\\":\\\"0\\\",\\\"SmoothToneChange:eval\\\":\\\"false\\\"}\",\"{\\\"Name:str\\\":\\\"SoftMagenta\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[255, 0, 255, 0]\\\\\\\",\\\\\\\"[0, 0, 0, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"30\\\",\\\"InitialToneOffset:num\\\":\\\"0\\\",\\\"SmoothToneChange:eval\\\":\\\"true\\\"}\",\"{\\\"Name:str\\\":\\\"HardMagenta\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[255, 0, 255, 0]\\\\\\\",\\\\\\\"[0, 0, 0, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"30\\\",\\\"InitialToneOffset:num\\\":\\\"0\\\",\\\"SmoothToneChange:eval\\\":\\\"false\\\"}\",\"{\\\"Name:str\\\":\\\"RGB\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[255, 0, 0, 0]\\\\\\\",\\\\\\\"[255, 255, 0, 0]\\\\\\\",\\\\\\\"[0, 255, 0, 0]\\\\\\\",\\\\\\\"[0, 255, 255, 0]\\\\\\\",\\\\\\\"[0, 0, 255, 0]\\\\\\\",\\\\\\\"[255, 0, 255, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"20\\\",\\\"InitialToneOffset:num\\\":\\\"-1\\\",\\\"SmoothToneChange:eval\\\":\\\"true\\\"}\",\"{\\\"Name:str\\\":\\\"SlowRGB\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[255, 0, 0, 0]\\\\\\\",\\\\\\\"[255, 255, 0, 0]\\\\\\\",\\\\\\\"[0, 255, 0, 0]\\\\\\\",\\\\\\\"[0, 255, 255, 0]\\\\\\\",\\\\\\\"[0, 0, 255, 0]\\\\\\\",\\\\\\\"[255, 0, 255, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"30\\\",\\\"InitialToneOffset:num\\\":\\\"-1\\\",\\\"SmoothToneChange:eval\\\":\\\"true\\\"}\",\"{\\\"Name:str\\\":\\\"FastRGB\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[255, 0, 0, 0]\\\\\\\",\\\\\\\"[255, 255, 0, 0]\\\\\\\",\\\\\\\"[0, 255, 0, 0]\\\\\\\",\\\\\\\"[0, 255, 255, 0]\\\\\\\",\\\\\\\"[0, 0, 255, 0]\\\\\\\",\\\\\\\"[255, 0, 255, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"10\\\",\\\"InitialToneOffset:num\\\":\\\"-1\\\",\\\"SmoothToneChange:eval\\\":\\\"true\\\"}\",\"{\\\"Name:str\\\":\\\"Fes\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[255, 0, 0, 0]\\\\\\\",\\\\\\\"[0, 255, 0, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"20\\\",\\\"InitialToneOffset:num\\\":\\\"-1\\\",\\\"SmoothToneChange:eval\\\":\\\"false\\\"}\",\"{\\\"Name:str\\\":\\\"SlowFes\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[255, 0, 0, 0]\\\\\\\",\\\\\\\"[0, 255, 0, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"30\\\",\\\"InitialToneOffset:num\\\":\\\"-1\\\",\\\"SmoothToneChange:eval\\\":\\\"false\\\"}\",\"{\\\"Name:str\\\":\\\"FastFes\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[255, 0, 0, 0]\\\\\\\",\\\\\\\"[0, 255, 0, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"10\\\",\\\"InitialToneOffset:num\\\":\\\"-1\\\",\\\"SmoothToneChange:eval\\\":\\\"false\\\"}\",\"{\\\"Name:str\\\":\\\"Gig\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[255, 0, 0, 0]\\\\\\\",\\\\\\\"[0, 255, 0, 0]\\\\\\\",\\\\\\\"[0, 0, 255, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"20\\\",\\\"InitialToneOffset:num\\\":\\\"-1\\\",\\\"SmoothToneChange:eval\\\":\\\"true\\\"}\",\"{\\\"Name:str\\\":\\\"SlowGig\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[255, 0, 0, 0]\\\\\\\",\\\\\\\"[0, 255, 0, 0]\\\\\\\",\\\\\\\"[0, 0, 255, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"30\\\",\\\"InitialToneOffset:num\\\":\\\"-1\\\",\\\"SmoothToneChange:eval\\\":\\\"true\\\"}\",\"{\\\"Name:str\\\":\\\"FastGig\\\",\\\"Color\\\":\\\"\\\",\\\"ForcedColor:str\\\":\\\"\\\",\\\"Hue\\\":\\\"\\\",\\\"HueShift:num\\\":\\\"0\\\",\\\"InitialHueOffset:num\\\":\\\"0\\\",\\\"Tone\\\":\\\"\\\",\\\"colorTones:arrayeval\\\":\\\"[\\\\\\\"[255, 0, 0, 0]\\\\\\\",\\\\\\\"[0, 255, 0, 0]\\\\\\\",\\\\\\\"[0, 0, 255, 0]\\\\\\\"]\\\",\\\"toneDelay:num\\\":\\\"10\\\",\\\"InitialToneOffset:num\\\":\\\"-1\\\",\\\"SmoothToneChange:eval\\\":\\\"true\\\"}\"]",
      "type": "array",
      "items": {
        "type": "struct",
        "structName": "ColorEffect",
        "fields": [
          {
            "id": "ANI-M-024",
            "key": "Name",
            "storageKey": "Name:str",
            "label": "Name",
            "description": "Name used by the message text effect selector. Names are trimmed and case-insensitive. Avoid commas because selection splits on commas. Blank names and Untitled are ignored; normal clears the active effect. Duplicate normalized names merge their fields, with later entries overriding earlier ones; use distinct names for independent presets.",
            "editorType": "text",
            "nativeDefault": "Untitled",
            "type": "string",
            "default": "Untitled",
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-026",
            "key": "ForcedColor",
            "storageKey": "ForcedColor:str",
            "label": "Forced Color",
            "description": "Forced glyph text color: use a string containing an MZ text-color palette number, such as \"2\", or a CSS color such as \"#ff0000\". An empty string keeps the normal message color.",
            "editorType": "text",
            "nativeDefault": "",
            "type": "string",
            "default": "",
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-028",
            "key": "HueShift",
            "storageKey": "HueShift:num",
            "label": "Hue Shift",
            "description": "Hue increment in degrees per glyph update. A full color cycle is 360 degrees; positive and negative values traverse it in opposite directions. Zero disables hue animation and InitialHueOffset. Use finite values; the runtime wraps the hue while rendering the cyclic color.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-029",
            "key": "InitialHueOffset",
            "storageKey": "InitialHueOffset:num",
            "label": "Offset Modifier",
            "description": "Initial hue angle in degrees per glyph: initial hue = offset * glyphIndex, then HueShift is added on the first update. Index starts at zero among the page animated glyphs/icons. Positive/negative finite offsets shift the cyclic colors in opposite directions; only used when HueShift is nonzero.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-031",
            "key": "colorTones",
            "storageKey": "colorTones:arrayeval",
            "label": "Color Tone(s)",
            "description": "Ordered tone sequence. Supply a JSON array of JavaScript source strings, each evaluating to [red, green, blue, gray], for example [\"[40, 0, 0, 0]\", \"[0, 0, 40, 0]\"]. Use RGB offsets -255..255 (0 neutral; positive adds, negative subtracts) and gray 0..255 (0 original saturation, 255 grayscale). An empty list disables tone animation. Values are evaluated at configuration loading; use four finite numeric components per tone.",
            "editorType": "string[]",
            "nativeDefault": "[]",
            "type": "array",
            "items": {
              "type": "string",
              "javascript": "script",
              "default": "",
              "editorType": "text"
            },
            "default": [],
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-032",
            "key": "toneDelay",
            "storageKey": "toneDelay:num",
            "label": "Frame Delay",
            "description": "Delay in game update frames between tone changes. The effective delay is max(value, 1), so the published default 0 advances every frame. Use whole frame counts; an empty tone sequence ignores this field.",
            "editorType": "number",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-033",
            "key": "InitialToneOffset",
            "storageKey": "InitialToneOffset:num",
            "label": "Offset Modifier",
            "description": "Initial tone-sequence offset in whole tone entries per glyph. Initial index is (offset * glyphIndex + floor(Graphics.frameCount / max(toneDelay, 1))) wrapped to the sequence length; negative offsets wrap too. Zero starts glyphs together. Use whole numbers to avoid a missing array entry; an empty tone sequence ignores this field.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-034",
            "key": "SmoothToneChange",
            "storageKey": "SmoothToneChange:eval",
            "label": "Smooth Transition?",
            "description": "Make a smooth transition for tone changes?",
            "editorType": "boolean",
            "nativeDefault": "false",
            "type": "string",
            "javascript": "script",
            "default": "false",
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          }
        ],
        "default": {
          "Name": "Untitled",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [],
          "toneDelay": 0,
          "InitialToneOffset": 0,
          "SmoothToneChange": "false"
        }
      },
      "default": [
        {
          "Name": "Prism",
          "ForcedColor": "#f69679",
          "HueShift": -6,
          "InitialHueOffset": 0,
          "colorTones": [],
          "toneDelay": 0,
          "InitialToneOffset": 0,
          "SmoothToneChange": "false"
        },
        {
          "Name": "SlowPrism",
          "ForcedColor": "#f69679",
          "HueShift": -3,
          "InitialHueOffset": 0,
          "colorTones": [],
          "toneDelay": 0,
          "InitialToneOffset": 0,
          "SmoothToneChange": "false"
        },
        {
          "Name": "FastPrism",
          "ForcedColor": "#f69679",
          "HueShift": -9,
          "InitialHueOffset": 0,
          "colorTones": [],
          "toneDelay": 0,
          "InitialToneOffset": 0,
          "SmoothToneChange": "false"
        },
        {
          "Name": "Rainbow",
          "ForcedColor": "#f69679",
          "HueShift": -6,
          "InitialHueOffset": 36,
          "colorTones": [],
          "toneDelay": 0,
          "InitialToneOffset": 0,
          "SmoothToneChange": "false"
        },
        {
          "Name": "SlowRainbow",
          "ForcedColor": "#f69679",
          "HueShift": -3,
          "InitialHueOffset": 36,
          "colorTones": [],
          "toneDelay": 0,
          "InitialToneOffset": 0,
          "SmoothToneChange": "false"
        },
        {
          "Name": "FastRainbow",
          "ForcedColor": "#f69679",
          "HueShift": -9,
          "InitialHueOffset": 36,
          "colorTones": [],
          "toneDelay": 0,
          "InitialToneOffset": 0,
          "SmoothToneChange": "false"
        },
        {
          "Name": "Gamer",
          "ForcedColor": "#f69679",
          "HueShift": -6,
          "InitialHueOffset": -216,
          "colorTones": [],
          "toneDelay": 0,
          "InitialToneOffset": 0,
          "SmoothToneChange": "false"
        },
        {
          "Name": "SlowGamer",
          "ForcedColor": "#f69679",
          "HueShift": -3,
          "InitialHueOffset": -216,
          "colorTones": [],
          "toneDelay": 0,
          "InitialToneOffset": 0,
          "SmoothToneChange": "false"
        },
        {
          "Name": "FastGamer",
          "ForcedColor": "#f69679",
          "HueShift": -9,
          "InitialHueOffset": -216,
          "colorTones": [],
          "toneDelay": 0,
          "InitialToneOffset": 0,
          "SmoothToneChange": "false"
        },
        {
          "Name": "Red",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[255, 0, 0, 0]"
          ],
          "toneDelay": 30,
          "InitialToneOffset": 0,
          "SmoothToneChange": "false"
        },
        {
          "Name": "SoftRed",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[255, 0, 0, 0]",
            "[0, 0, 0, 0]"
          ],
          "toneDelay": 30,
          "InitialToneOffset": 0,
          "SmoothToneChange": "true"
        },
        {
          "Name": "HardRed",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[255, 0, 0, 0]",
            "[0, 0, 0, 0]"
          ],
          "toneDelay": 30,
          "InitialToneOffset": 0,
          "SmoothToneChange": "false"
        },
        {
          "Name": "Green",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[0, 255, 0, 0]"
          ],
          "toneDelay": 30,
          "InitialToneOffset": 0,
          "SmoothToneChange": "false"
        },
        {
          "Name": "SoftGreen",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[0, 255, 0, 0]",
            "[0, 0, 0, 0]"
          ],
          "toneDelay": 30,
          "InitialToneOffset": 0,
          "SmoothToneChange": "true"
        },
        {
          "Name": "HardGreen",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[0, 255, 0, 0]",
            "[0, 0, 0, 0]"
          ],
          "toneDelay": 30,
          "InitialToneOffset": 0,
          "SmoothToneChange": "false"
        },
        {
          "Name": "Blue",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[0, 0, 255, 0]"
          ],
          "toneDelay": 30,
          "InitialToneOffset": 0,
          "SmoothToneChange": "false"
        },
        {
          "Name": "SoftBlue",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[0, 0, 255, 0]",
            "[0, 0, 0, 0]"
          ],
          "toneDelay": 30,
          "InitialToneOffset": 0,
          "SmoothToneChange": "true"
        },
        {
          "Name": "HardBlue",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[0, 0, 255, 0]",
            "[0, 0, 0, 0]"
          ],
          "toneDelay": 30,
          "InitialToneOffset": 0,
          "SmoothToneChange": "false"
        },
        {
          "Name": "Yellow",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[255, 255, 0, 0]"
          ],
          "toneDelay": 30,
          "InitialToneOffset": 0,
          "SmoothToneChange": "false"
        },
        {
          "Name": "SoftYellow",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[255, 255, 0, 0]",
            "[0, 0, 0, 0]"
          ],
          "toneDelay": 30,
          "InitialToneOffset": 0,
          "SmoothToneChange": "true"
        },
        {
          "Name": "HardYellow",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[255, 255, 0, 0]",
            "[0, 0, 0, 0]"
          ],
          "toneDelay": 30,
          "InitialToneOffset": 0,
          "SmoothToneChange": "false"
        },
        {
          "Name": "Cyan",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[0, 255, 255, 0]"
          ],
          "toneDelay": 30,
          "InitialToneOffset": 0,
          "SmoothToneChange": "false"
        },
        {
          "Name": "SoftCyan",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[0, 255, 255, 0]",
            "[0, 0, 0, 0]"
          ],
          "toneDelay": 30,
          "InitialToneOffset": 0,
          "SmoothToneChange": "true"
        },
        {
          "Name": "HardCyan",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[0, 255, 255, 0]",
            "[0, 0, 0, 0]"
          ],
          "toneDelay": 30,
          "InitialToneOffset": 0,
          "SmoothToneChange": "false"
        },
        {
          "Name": "Magenta",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[255, 0, 255, 0]"
          ],
          "toneDelay": 30,
          "InitialToneOffset": 0,
          "SmoothToneChange": "false"
        },
        {
          "Name": "SoftMagenta",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[255, 0, 255, 0]",
            "[0, 0, 0, 0]"
          ],
          "toneDelay": 30,
          "InitialToneOffset": 0,
          "SmoothToneChange": "true"
        },
        {
          "Name": "HardMagenta",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[255, 0, 255, 0]",
            "[0, 0, 0, 0]"
          ],
          "toneDelay": 30,
          "InitialToneOffset": 0,
          "SmoothToneChange": "false"
        },
        {
          "Name": "RGB",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[255, 0, 0, 0]",
            "[255, 255, 0, 0]",
            "[0, 255, 0, 0]",
            "[0, 255, 255, 0]",
            "[0, 0, 255, 0]",
            "[255, 0, 255, 0]"
          ],
          "toneDelay": 20,
          "InitialToneOffset": -1,
          "SmoothToneChange": "true"
        },
        {
          "Name": "SlowRGB",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[255, 0, 0, 0]",
            "[255, 255, 0, 0]",
            "[0, 255, 0, 0]",
            "[0, 255, 255, 0]",
            "[0, 0, 255, 0]",
            "[255, 0, 255, 0]"
          ],
          "toneDelay": 30,
          "InitialToneOffset": -1,
          "SmoothToneChange": "true"
        },
        {
          "Name": "FastRGB",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[255, 0, 0, 0]",
            "[255, 255, 0, 0]",
            "[0, 255, 0, 0]",
            "[0, 255, 255, 0]",
            "[0, 0, 255, 0]",
            "[255, 0, 255, 0]"
          ],
          "toneDelay": 10,
          "InitialToneOffset": -1,
          "SmoothToneChange": "true"
        },
        {
          "Name": "Fes",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[255, 0, 0, 0]",
            "[0, 255, 0, 0]"
          ],
          "toneDelay": 20,
          "InitialToneOffset": -1,
          "SmoothToneChange": "false"
        },
        {
          "Name": "SlowFes",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[255, 0, 0, 0]",
            "[0, 255, 0, 0]"
          ],
          "toneDelay": 30,
          "InitialToneOffset": -1,
          "SmoothToneChange": "false"
        },
        {
          "Name": "FastFes",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[255, 0, 0, 0]",
            "[0, 255, 0, 0]"
          ],
          "toneDelay": 10,
          "InitialToneOffset": -1,
          "SmoothToneChange": "false"
        },
        {
          "Name": "Gig",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[255, 0, 0, 0]",
            "[0, 255, 0, 0]",
            "[0, 0, 255, 0]"
          ],
          "toneDelay": 20,
          "InitialToneOffset": -1,
          "SmoothToneChange": "true"
        },
        {
          "Name": "SlowGig",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[255, 0, 0, 0]",
            "[0, 255, 0, 0]",
            "[0, 0, 255, 0]"
          ],
          "toneDelay": 30,
          "InitialToneOffset": -1,
          "SmoothToneChange": "true"
        },
        {
          "Name": "FastGig",
          "ForcedColor": "",
          "HueShift": 0,
          "InitialHueOffset": 0,
          "colorTones": [
            "[255, 0, 0, 0]",
            "[0, 255, 0, 0]",
            "[0, 0, 255, 0]"
          ],
          "toneDelay": 10,
          "InitialToneOffset": -1,
          "SmoothToneChange": "true"
        }
      ],
      "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
    },
    {
      "id": "ANI-M-008",
      "key": "OpacityEffects",
      "storageKey": "OpacityEffects:arraystruct",
      "label": "Opacity Effects",
      "description": "Named opacity-effect presets for message glyphs: base opacity is 0..255, glow modulates it with a cosine, and a..z patterns multiply it by 0..1. Configure each preset using the fields below.",
      "editorType": "struct<OpacityEffect>[]",
      "nativeDefault": "[\"{\\\"Name:str\\\":\\\"Glow\\\",\\\"Opacity\\\":\\\"\\\",\\\"InitialOpacity:num\\\":\\\"255\\\",\\\"Glow\\\":\\\"\\\",\\\"glowRate:num\\\":\\\"0.50\\\",\\\"glowSpeed:num\\\":\\\"0.25\\\",\\\"glowOffset:num\\\":\\\"0\\\",\\\"Pattern\\\":\\\"\\\",\\\"pattern:str\\\":\\\"\\\",\\\"patternDelay:num\\\":\\\"0\\\",\\\"patternOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"SlowGlow\\\",\\\"Opacity\\\":\\\"\\\",\\\"InitialOpacity:num\\\":\\\"255\\\",\\\"Glow\\\":\\\"\\\",\\\"glowRate:num\\\":\\\"0.50\\\",\\\"glowSpeed:num\\\":\\\"0.10\\\",\\\"glowOffset:num\\\":\\\"0\\\",\\\"Pattern\\\":\\\"\\\",\\\"pattern:str\\\":\\\"\\\",\\\"patternDelay:num\\\":\\\"0\\\",\\\"patternOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"FastGlow\\\",\\\"Opacity\\\":\\\"\\\",\\\"InitialOpacity:num\\\":\\\"255\\\",\\\"Glow\\\":\\\"\\\",\\\"glowRate:num\\\":\\\"0.50\\\",\\\"glowSpeed:num\\\":\\\"0.40\\\",\\\"glowOffset:num\\\":\\\"0\\\",\\\"Pattern\\\":\\\"\\\",\\\"pattern:str\\\":\\\"\\\",\\\"patternDelay:num\\\":\\\"0\\\",\\\"patternOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"Flow\\\",\\\"Opacity\\\":\\\"\\\",\\\"InitialOpacity:num\\\":\\\"255\\\",\\\"Glow\\\":\\\"\\\",\\\"glowRate:num\\\":\\\"0.50\\\",\\\"glowSpeed:num\\\":\\\"0.25\\\",\\\"glowOffset:num\\\":\\\"2\\\",\\\"Pattern\\\":\\\"\\\",\\\"pattern:str\\\":\\\"\\\",\\\"patternDelay:num\\\":\\\"0\\\",\\\"patternOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"SlowFlow\\\",\\\"Opacity\\\":\\\"\\\",\\\"InitialOpacity:num\\\":\\\"255\\\",\\\"Glow\\\":\\\"\\\",\\\"glowRate:num\\\":\\\"0.50\\\",\\\"glowSpeed:num\\\":\\\"0.10\\\",\\\"glowOffset:num\\\":\\\"2\\\",\\\"Pattern\\\":\\\"\\\",\\\"pattern:str\\\":\\\"\\\",\\\"patternDelay:num\\\":\\\"0\\\",\\\"patternOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"FastFlow\\\",\\\"Opacity\\\":\\\"\\\",\\\"InitialOpacity:num\\\":\\\"255\\\",\\\"Glow\\\":\\\"\\\",\\\"glowRate:num\\\":\\\"0.50\\\",\\\"glowSpeed:num\\\":\\\"0.40\\\",\\\"glowOffset:num\\\":\\\"2\\\",\\\"Pattern\\\":\\\"\\\",\\\"pattern:str\\\":\\\"\\\",\\\"patternDelay:num\\\":\\\"0\\\",\\\"patternOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"Blink\\\",\\\"Opacity\\\":\\\"\\\",\\\"InitialOpacity:num\\\":\\\"255\\\",\\\"Glow\\\":\\\"\\\",\\\"glowRate:num\\\":\\\"0.50\\\",\\\"glowSpeed:num\\\":\\\"0.25\\\",\\\"glowOffset:num\\\":\\\"15\\\",\\\"Pattern\\\":\\\"\\\",\\\"pattern:str\\\":\\\"\\\",\\\"patternDelay:num\\\":\\\"0\\\",\\\"patternOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"SlowBlink\\\",\\\"Opacity\\\":\\\"\\\",\\\"InitialOpacity:num\\\":\\\"255\\\",\\\"Glow\\\":\\\"\\\",\\\"glowRate:num\\\":\\\"0.50\\\",\\\"glowSpeed:num\\\":\\\"0.10\\\",\\\"glowOffset:num\\\":\\\"30\\\",\\\"Pattern\\\":\\\"\\\",\\\"pattern:str\\\":\\\"\\\",\\\"patternDelay:num\\\":\\\"0\\\",\\\"patternOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"FastBlink\\\",\\\"Opacity\\\":\\\"\\\",\\\"InitialOpacity:num\\\":\\\"255\\\",\\\"Glow\\\":\\\"\\\",\\\"glowRate:num\\\":\\\"0.50\\\",\\\"glowSpeed:num\\\":\\\"0.40\\\",\\\"glowOffset:num\\\":\\\"8\\\",\\\"Pattern\\\":\\\"\\\",\\\"pattern:str\\\":\\\"\\\",\\\"patternDelay:num\\\":\\\"0\\\",\\\"patternOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"Campfire\\\",\\\"Opacity\\\":\\\"\\\",\\\"InitialOpacity:num\\\":\\\"255\\\",\\\"Glow\\\":\\\"\\\",\\\"glowRate:num\\\":\\\"0\\\",\\\"glowSpeed:num\\\":\\\"0\\\",\\\"glowOffset:num\\\":\\\"0\\\",\\\"Pattern\\\":\\\"\\\",\\\"pattern:str\\\":\\\"mmmaaammmaaammmabcdefaaaammmmabcdefmmmaaaa\\\",\\\"patternDelay:num\\\":\\\"2\\\",\\\"patternOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"Candle\\\",\\\"Opacity\\\":\\\"\\\",\\\"InitialOpacity:num\\\":\\\"255\\\",\\\"Glow\\\":\\\"\\\",\\\"glowRate:num\\\":\\\"0\\\",\\\"glowSpeed:num\\\":\\\"0\\\",\\\"glowOffset:num\\\":\\\"0\\\",\\\"Pattern\\\":\\\"\\\",\\\"pattern:str\\\":\\\"mmmmmaaaaammmmmaaaaaabcdefgabcdefg\\\",\\\"patternDelay:num\\\":\\\"2\\\",\\\"patternOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"Fade\\\",\\\"Opacity\\\":\\\"\\\",\\\"InitialOpacity:num\\\":\\\"255\\\",\\\"Glow\\\":\\\"\\\",\\\"glowRate:num\\\":\\\"0\\\",\\\"glowSpeed:num\\\":\\\"0\\\",\\\"glowOffset:num\\\":\\\"0\\\",\\\"Pattern\\\":\\\"\\\",\\\"pattern:str\\\":\\\"abcdefghijklmnopqrrqponmlkjihgfedcba\\\",\\\"patternDelay:num\\\":\\\"4\\\",\\\"patternOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"Flicker\\\",\\\"Opacity\\\":\\\"\\\",\\\"InitialOpacity:num\\\":\\\"255\\\",\\\"Glow\\\":\\\"\\\",\\\"glowRate:num\\\":\\\"0\\\",\\\"glowSpeed:num\\\":\\\"0\\\",\\\"glowOffset:num\\\":\\\"0\\\",\\\"Pattern\\\":\\\"\\\",\\\"pattern:str\\\":\\\"nmonqnmomnmomomno\\\",\\\"patternDelay:num\\\":\\\"4\\\",\\\"patternOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"Fluorescent\\\",\\\"Opacity\\\":\\\"\\\",\\\"InitialOpacity:num\\\":\\\"255\\\",\\\"Glow\\\":\\\"\\\",\\\"glowRate:num\\\":\\\"0\\\",\\\"glowSpeed:num\\\":\\\"0\\\",\\\"glowOffset:num\\\":\\\"0\\\",\\\"Pattern\\\":\\\"\\\",\\\"pattern:str\\\":\\\"mmamammmmammamamaaamammma\\\",\\\"patternDelay:num\\\":\\\"4\\\",\\\"patternOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"Halogen\\\",\\\"Opacity\\\":\\\"\\\",\\\"InitialOpacity:num\\\":\\\"255\\\",\\\"Glow\\\":\\\"\\\",\\\"glowRate:num\\\":\\\"0\\\",\\\"glowSpeed:num\\\":\\\"0\\\",\\\"glowOffset:num\\\":\\\"0\\\",\\\"Pattern\\\":\\\"\\\",\\\"pattern:str\\\":\\\"mmnmmommommnonmmonqnmmo\\\",\\\"patternDelay:num\\\":\\\"4\\\",\\\"patternOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"Strobe\\\",\\\"Opacity\\\":\\\"\\\",\\\"InitialOpacity:num\\\":\\\"255\\\",\\\"Glow\\\":\\\"\\\",\\\"glowRate:num\\\":\\\"0\\\",\\\"glowSpeed:num\\\":\\\"0\\\",\\\"glowOffset:num\\\":\\\"0\\\",\\\"Pattern\\\":\\\"\\\",\\\"pattern:str\\\":\\\"mamamamamama\\\",\\\"patternDelay:num\\\":\\\"4\\\",\\\"patternOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"Torch\\\",\\\"Opacity\\\":\\\"\\\",\\\"InitialOpacity:num\\\":\\\"255\\\",\\\"Glow\\\":\\\"\\\",\\\"glowRate:num\\\":\\\"0\\\",\\\"glowSpeed:num\\\":\\\"0\\\",\\\"glowOffset:num\\\":\\\"0\\\",\\\"Pattern\\\":\\\"\\\",\\\"pattern:str\\\":\\\"mmmaaaabcdefgmmmmaaaammmaamm\\\",\\\"patternDelay:num\\\":\\\"2\\\",\\\"patternOffset:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"Underwater\\\",\\\"Opacity\\\":\\\"\\\",\\\"InitialOpacity:num\\\":\\\"255\\\",\\\"Glow\\\":\\\"\\\",\\\"glowRate:num\\\":\\\"0\\\",\\\"glowSpeed:num\\\":\\\"0\\\",\\\"glowOffset:num\\\":\\\"0\\\",\\\"Pattern\\\":\\\"\\\",\\\"pattern:str\\\":\\\"mmnnmmnnnmmnn\\\",\\\"patternDelay:num\\\":\\\"4\\\",\\\"patternOffset:num\\\":\\\"0\\\"}\"]",
      "type": "array",
      "items": {
        "type": "struct",
        "structName": "OpacityEffect",
        "fields": [
          {
            "id": "ANI-M-035",
            "key": "Name",
            "storageKey": "Name:str",
            "label": "Name",
            "description": "Name used by the message text effect selector. Names are trimmed and case-insensitive. Avoid commas because selection splits on commas. Blank names and Untitled are ignored; normal clears the active effect. Duplicate normalized names merge their fields, with later entries overriding earlier ones; use distinct names for independent presets.",
            "editorType": "text",
            "nativeDefault": "Untitled",
            "type": "string",
            "default": "Untitled",
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-037",
            "key": "InitialOpacity",
            "storageKey": "InitialOpacity:num",
            "label": "Base Opacity",
            "description": "Base glyph opacity from 0 (invisible) to 255 (opaque). Pattern letters multiply this value and glow then adjusts it; the rendered result is clamped to 0..255. Use a finite value in that range.",
            "editorType": "text",
            "nativeDefault": "255",
            "type": "number",
            "default": 255,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-039",
            "key": "glowRate",
            "storageKey": "glowRate:num",
            "label": "Glow Rate",
            "description": "Glow depth as a factor of 255 opacity units. The adjustment is round((cos(phase) - 1) * glowRate * 255 / 2), added after the pattern. For a fading glow, use 0..1; 0 disables glow, 1 can subtract up to 255. Negative factors brighten instead; rendered opacity is clamped to 0..255. No additional factor clamp.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-040",
            "key": "glowSpeed",
            "storageKey": "glowSpeed:num",
            "label": "Glow Speed",
            "description": "Glow cosine speed in radians per game frame. Period is 2*pi/abs(speed) frames when nonzero; zero disables glow. A negative speed gives the same cosine as its positive counterpart. Use finite values.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-041",
            "key": "glowOffset",
            "storageKey": "glowOffset:num",
            "label": "Offset Modifier",
            "description": "Glow phase offset in frames per glyph: phase = (Graphics.frameCount + offset * glyphIndex) * glowSpeed radians. Index starts at zero among the page animated glyphs/icons. Zero synchronizes glyphs; finite negative offsets reverse their phase spacing.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-043",
            "key": "pattern",
            "storageKey": "pattern:str",
            "label": "Custom Pattern",
            "description": "Repeating opacity pattern of letters a..z, case-insensitive with surrounding whitespace trimmed. a multiplies base opacity by 0, z by 1, and intermediate letters by (letterCode - 97)/25. The pattern advances every max(patternDelay, 1) frames and wraps. Empty text disables the pattern and leaves base opacity for glow processing.",
            "editorType": "text",
            "nativeDefault": "",
            "type": "string",
            "default": "",
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-044",
            "key": "patternDelay",
            "storageKey": "patternDelay:num",
            "label": "Frame Delay",
            "description": "Delay in game update frames between opacity-pattern steps. The effective delay is max(value, 1), so the published default 0 advances every frame. Use whole frame counts; an empty pattern ignores this field.",
            "editorType": "number",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-045",
            "key": "patternOffset",
            "storageKey": "patternOffset:num",
            "label": "Offset Modifier",
            "description": "Initial pattern position in characters per glyph: index = patternOffset * glyphIndex, wrapped to the pattern length, including negative values. Use whole numbers; character lookup truncates any fractional index. Each update step advances one character and wraps. Zero synchronizes glyphs; an empty pattern ignores this field.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          }
        ],
        "default": {
          "Name": "Untitled",
          "InitialOpacity": 255,
          "glowRate": 0,
          "glowSpeed": 0,
          "glowOffset": 0,
          "pattern": "",
          "patternDelay": 0,
          "patternOffset": 0
        }
      },
      "default": [
        {
          "Name": "Glow",
          "InitialOpacity": 255,
          "glowRate": 0.5,
          "glowSpeed": 0.25,
          "glowOffset": 0,
          "pattern": "",
          "patternDelay": 0,
          "patternOffset": 0
        },
        {
          "Name": "SlowGlow",
          "InitialOpacity": 255,
          "glowRate": 0.5,
          "glowSpeed": 0.1,
          "glowOffset": 0,
          "pattern": "",
          "patternDelay": 0,
          "patternOffset": 0
        },
        {
          "Name": "FastGlow",
          "InitialOpacity": 255,
          "glowRate": 0.5,
          "glowSpeed": 0.4,
          "glowOffset": 0,
          "pattern": "",
          "patternDelay": 0,
          "patternOffset": 0
        },
        {
          "Name": "Flow",
          "InitialOpacity": 255,
          "glowRate": 0.5,
          "glowSpeed": 0.25,
          "glowOffset": 2,
          "pattern": "",
          "patternDelay": 0,
          "patternOffset": 0
        },
        {
          "Name": "SlowFlow",
          "InitialOpacity": 255,
          "glowRate": 0.5,
          "glowSpeed": 0.1,
          "glowOffset": 2,
          "pattern": "",
          "patternDelay": 0,
          "patternOffset": 0
        },
        {
          "Name": "FastFlow",
          "InitialOpacity": 255,
          "glowRate": 0.5,
          "glowSpeed": 0.4,
          "glowOffset": 2,
          "pattern": "",
          "patternDelay": 0,
          "patternOffset": 0
        },
        {
          "Name": "Blink",
          "InitialOpacity": 255,
          "glowRate": 0.5,
          "glowSpeed": 0.25,
          "glowOffset": 15,
          "pattern": "",
          "patternDelay": 0,
          "patternOffset": 0
        },
        {
          "Name": "SlowBlink",
          "InitialOpacity": 255,
          "glowRate": 0.5,
          "glowSpeed": 0.1,
          "glowOffset": 30,
          "pattern": "",
          "patternDelay": 0,
          "patternOffset": 0
        },
        {
          "Name": "FastBlink",
          "InitialOpacity": 255,
          "glowRate": 0.5,
          "glowSpeed": 0.4,
          "glowOffset": 8,
          "pattern": "",
          "patternDelay": 0,
          "patternOffset": 0
        },
        {
          "Name": "Campfire",
          "InitialOpacity": 255,
          "glowRate": 0,
          "glowSpeed": 0,
          "glowOffset": 0,
          "pattern": "mmmaaammmaaammmabcdefaaaammmmabcdefmmmaaaa",
          "patternDelay": 2,
          "patternOffset": 0
        },
        {
          "Name": "Candle",
          "InitialOpacity": 255,
          "glowRate": 0,
          "glowSpeed": 0,
          "glowOffset": 0,
          "pattern": "mmmmmaaaaammmmmaaaaaabcdefgabcdefg",
          "patternDelay": 2,
          "patternOffset": 0
        },
        {
          "Name": "Fade",
          "InitialOpacity": 255,
          "glowRate": 0,
          "glowSpeed": 0,
          "glowOffset": 0,
          "pattern": "abcdefghijklmnopqrrqponmlkjihgfedcba",
          "patternDelay": 4,
          "patternOffset": 0
        },
        {
          "Name": "Flicker",
          "InitialOpacity": 255,
          "glowRate": 0,
          "glowSpeed": 0,
          "glowOffset": 0,
          "pattern": "nmonqnmomnmomomno",
          "patternDelay": 4,
          "patternOffset": 0
        },
        {
          "Name": "Fluorescent",
          "InitialOpacity": 255,
          "glowRate": 0,
          "glowSpeed": 0,
          "glowOffset": 0,
          "pattern": "mmamammmmammamamaaamammma",
          "patternDelay": 4,
          "patternOffset": 0
        },
        {
          "Name": "Halogen",
          "InitialOpacity": 255,
          "glowRate": 0,
          "glowSpeed": 0,
          "glowOffset": 0,
          "pattern": "mmnmmommommnonmmonqnmmo",
          "patternDelay": 4,
          "patternOffset": 0
        },
        {
          "Name": "Strobe",
          "InitialOpacity": 255,
          "glowRate": 0,
          "glowSpeed": 0,
          "glowOffset": 0,
          "pattern": "mamamamamama",
          "patternDelay": 4,
          "patternOffset": 0
        },
        {
          "Name": "Torch",
          "InitialOpacity": 255,
          "glowRate": 0,
          "glowSpeed": 0,
          "glowOffset": 0,
          "pattern": "mmmaaaabcdefgmmmmaaaammmaamm",
          "patternDelay": 2,
          "patternOffset": 0
        },
        {
          "Name": "Underwater",
          "InitialOpacity": 255,
          "glowRate": 0,
          "glowSpeed": 0,
          "glowOffset": 0,
          "pattern": "mmnnmmnnnmmnn",
          "patternDelay": 4,
          "patternOffset": 0
        }
      ],
      "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
    },
    {
      "id": "ANI-M-009",
      "key": "PositionEffects",
      "storageKey": "PositionEffects:arraystruct",
      "label": "Positioning Effects",
      "description": "Named position-effect presets for message glyphs: shake and wave distances are pixels, cosine speeds are radians per frame, and wave offsets are frames per glyph. Configure each preset using the fields below.",
      "editorType": "struct<PositionEffect>[]",
      "nativeDefault": "[\"{\\\"Name:str\\\":\\\"Shake\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"2\\\",\\\"ShakeStrengthVert:num\\\":\\\"2\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"0\\\",\\\"WaveSpeedX:num\\\":\\\"0\\\",\\\"WaveOffsetX:num\\\":\\\"0\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"0\\\",\\\"WaveSpeedY:num\\\":\\\"0\\\",\\\"WaveOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"SoftShake\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"1\\\",\\\"ShakeStrengthVert:num\\\":\\\"1\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"0\\\",\\\"WaveSpeedX:num\\\":\\\"0\\\",\\\"WaveOffsetX:num\\\":\\\"0\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"0\\\",\\\"WaveSpeedY:num\\\":\\\"0\\\",\\\"WaveOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"HardShake\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"3\\\",\\\"ShakeStrengthVert:num\\\":\\\"3\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"0\\\",\\\"WaveSpeedX:num\\\":\\\"0\\\",\\\"WaveOffsetX:num\\\":\\\"0\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"0\\\",\\\"WaveSpeedY:num\\\":\\\"0\\\",\\\"WaveOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"Shiver\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"2\\\",\\\"ShakeStrengthVert:num\\\":\\\"0\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"0\\\",\\\"WaveSpeedX:num\\\":\\\"0\\\",\\\"WaveOffsetX:num\\\":\\\"0\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"0\\\",\\\"WaveSpeedY:num\\\":\\\"0\\\",\\\"WaveOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"SoftShiver\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"1\\\",\\\"ShakeStrengthVert:num\\\":\\\"0\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"0\\\",\\\"WaveSpeedX:num\\\":\\\"0\\\",\\\"WaveOffsetX:num\\\":\\\"0\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"0\\\",\\\"WaveSpeedY:num\\\":\\\"0\\\",\\\"WaveOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"HardShiver\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"3\\\",\\\"ShakeStrengthVert:num\\\":\\\"0\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"0\\\",\\\"WaveSpeedX:num\\\":\\\"0\\\",\\\"WaveOffsetX:num\\\":\\\"0\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"0\\\",\\\"WaveSpeedY:num\\\":\\\"0\\\",\\\"WaveOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"Vibe\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"0\\\",\\\"ShakeStrengthVert:num\\\":\\\"2\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"0\\\",\\\"WaveSpeedX:num\\\":\\\"0\\\",\\\"WaveOffsetX:num\\\":\\\"0\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"0\\\",\\\"WaveSpeedY:num\\\":\\\"0\\\",\\\"WaveOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"SoftVibe\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"0\\\",\\\"ShakeStrengthVert:num\\\":\\\"1\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"0\\\",\\\"WaveSpeedX:num\\\":\\\"0\\\",\\\"WaveOffsetX:num\\\":\\\"0\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"0\\\",\\\"WaveSpeedY:num\\\":\\\"0\\\",\\\"WaveOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"HardVibe\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"0\\\",\\\"ShakeStrengthVert:num\\\":\\\"3\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"0\\\",\\\"WaveSpeedX:num\\\":\\\"0\\\",\\\"WaveOffsetX:num\\\":\\\"0\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"0\\\",\\\"WaveSpeedY:num\\\":\\\"0\\\",\\\"WaveOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"Stagger\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"0\\\",\\\"ShakeStrengthVert:num\\\":\\\"0\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"0\\\",\\\"WaveSpeedX:num\\\":\\\"0\\\",\\\"WaveOffsetX:num\\\":\\\"0\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"4\\\",\\\"WaveSpeedY:num\\\":\\\"0.25\\\",\\\"WaveOffsetY:num\\\":\\\"15\\\"}\",\"{\\\"Name:str\\\":\\\"SlowStagger\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"0\\\",\\\"ShakeStrengthVert:num\\\":\\\"0\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"0\\\",\\\"WaveSpeedX:num\\\":\\\"0\\\",\\\"WaveOffsetX:num\\\":\\\"0\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"4\\\",\\\"WaveSpeedY:num\\\":\\\"0.10\\\",\\\"WaveOffsetY:num\\\":\\\"30\\\"}\",\"{\\\"Name:str\\\":\\\"FastStagger\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"0\\\",\\\"ShakeStrengthVert:num\\\":\\\"0\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"0\\\",\\\"WaveSpeedX:num\\\":\\\"0\\\",\\\"WaveOffsetX:num\\\":\\\"0\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"4\\\",\\\"WaveSpeedY:num\\\":\\\"0.50\\\",\\\"WaveOffsetY:num\\\":\\\"30\\\"}\",\"{\\\"Name:str\\\":\\\"Saw\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"0\\\",\\\"ShakeStrengthVert:num\\\":\\\"0\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"3\\\",\\\"WaveSpeedX:num\\\":\\\"0.25\\\",\\\"WaveOffsetX:num\\\":\\\"0\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"0\\\",\\\"WaveSpeedY:num\\\":\\\"0\\\",\\\"WaveOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"SlowSaw\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"0\\\",\\\"ShakeStrengthVert:num\\\":\\\"0\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"3\\\",\\\"WaveSpeedX:num\\\":\\\"0.10\\\",\\\"WaveOffsetX:num\\\":\\\"0\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"0\\\",\\\"WaveSpeedY:num\\\":\\\"0\\\",\\\"WaveOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"FastSaw\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"0\\\",\\\"ShakeStrengthVert:num\\\":\\\"0\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"3\\\",\\\"WaveSpeedX:num\\\":\\\"0.40\\\",\\\"WaveOffsetX:num\\\":\\\"0\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"0\\\",\\\"WaveSpeedY:num\\\":\\\"0\\\",\\\"WaveOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"Bounce\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"0\\\",\\\"ShakeStrengthVert:num\\\":\\\"0\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"0\\\",\\\"WaveSpeedX:num\\\":\\\"0\\\",\\\"WaveOffsetX:num\\\":\\\"0\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"3\\\",\\\"WaveSpeedY:num\\\":\\\"0.25\\\",\\\"WaveOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"SlowBounce\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"0\\\",\\\"ShakeStrengthVert:num\\\":\\\"0\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"0\\\",\\\"WaveSpeedX:num\\\":\\\"0\\\",\\\"WaveOffsetX:num\\\":\\\"0\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"3\\\",\\\"WaveSpeedY:num\\\":\\\"0.10\\\",\\\"WaveOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"FastBounce\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"0\\\",\\\"ShakeStrengthVert:num\\\":\\\"0\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"0\\\",\\\"WaveSpeedX:num\\\":\\\"0\\\",\\\"WaveOffsetX:num\\\":\\\"0\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"3\\\",\\\"WaveSpeedY:num\\\":\\\"0.40\\\",\\\"WaveOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"Wave\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"0\\\",\\\"ShakeStrengthVert:num\\\":\\\"0\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"3\\\",\\\"WaveSpeedX:num\\\":\\\"0.25\\\",\\\"WaveOffsetX:num\\\":\\\"1\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"3\\\",\\\"WaveSpeedY:num\\\":\\\"0.25\\\",\\\"WaveOffsetY:num\\\":\\\"2\\\"}\",\"{\\\"Name:str\\\":\\\"SlowWave\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"0\\\",\\\"ShakeStrengthVert:num\\\":\\\"0\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"3\\\",\\\"WaveSpeedX:num\\\":\\\"0.10\\\",\\\"WaveOffsetX:num\\\":\\\"1\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"3\\\",\\\"WaveSpeedY:num\\\":\\\"0.10\\\",\\\"WaveOffsetY:num\\\":\\\"2\\\"}\",\"{\\\"Name:str\\\":\\\"FastWave\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"0\\\",\\\"ShakeStrengthVert:num\\\":\\\"0\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"3\\\",\\\"WaveSpeedX:num\\\":\\\"0.40\\\",\\\"WaveOffsetX:num\\\":\\\"1\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"3\\\",\\\"WaveSpeedY:num\\\":\\\"0.40\\\",\\\"WaveOffsetY:num\\\":\\\"2\\\"}\",\"{\\\"Name:str\\\":\\\"HorzWave\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"0\\\",\\\"ShakeStrengthVert:num\\\":\\\"0\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"3\\\",\\\"WaveSpeedX:num\\\":\\\"0.25\\\",\\\"WaveOffsetX:num\\\":\\\"1\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"0\\\",\\\"WaveSpeedY:num\\\":\\\"0\\\",\\\"WaveOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"SlowHorzWave\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"0\\\",\\\"ShakeStrengthVert:num\\\":\\\"0\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"3\\\",\\\"WaveSpeedX:num\\\":\\\"0.10\\\",\\\"WaveOffsetX:num\\\":\\\"1\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"0\\\",\\\"WaveSpeedY:num\\\":\\\"0\\\",\\\"WaveOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"FastHorzWave\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"0\\\",\\\"ShakeStrengthVert:num\\\":\\\"0\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"3\\\",\\\"WaveSpeedX:num\\\":\\\"0.40\\\",\\\"WaveOffsetX:num\\\":\\\"1\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"0\\\",\\\"WaveSpeedY:num\\\":\\\"0\\\",\\\"WaveOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"VertWave\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"0\\\",\\\"ShakeStrengthVert:num\\\":\\\"0\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"0\\\",\\\"WaveSpeedX:num\\\":\\\"0\\\",\\\"WaveOffsetX:num\\\":\\\"0\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"3\\\",\\\"WaveSpeedY:num\\\":\\\"0.25\\\",\\\"WaveOffsetY:num\\\":\\\"2\\\"}\",\"{\\\"Name:str\\\":\\\"SlowVertWave\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"0\\\",\\\"ShakeStrengthVert:num\\\":\\\"0\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"0\\\",\\\"WaveSpeedX:num\\\":\\\"0\\\",\\\"WaveOffsetX:num\\\":\\\"0\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"3\\\",\\\"WaveSpeedY:num\\\":\\\"0.10\\\",\\\"WaveOffsetY:num\\\":\\\"2\\\"}\",\"{\\\"Name:str\\\":\\\"FastVertWave\\\",\\\"Positioning\\\":\\\"\\\",\\\"Shake\\\":\\\"\\\",\\\"ShakeStrengthHorz:num\\\":\\\"0\\\",\\\"ShakeStrengthVert:num\\\":\\\"0\\\",\\\"WaveX\\\":\\\"\\\",\\\"WaveDistanceX:num\\\":\\\"0\\\",\\\"WaveSpeedX:num\\\":\\\"0\\\",\\\"WaveOffsetX:num\\\":\\\"0\\\",\\\"WaveY\\\":\\\"\\\",\\\"WaveDistanceY:num\\\":\\\"3\\\",\\\"WaveSpeedY:num\\\":\\\"0.40\\\",\\\"WaveOffsetY:num\\\":\\\"2\\\"}\"]",
      "type": "array",
      "items": {
        "type": "struct",
        "structName": "PositionEffect",
        "fields": [
          {
            "id": "ANI-M-046",
            "key": "Name",
            "storageKey": "Name:str",
            "label": "Name",
            "description": "Name used by the message text effect selector. Names are trimmed and case-insensitive. Avoid commas because selection splits on commas. Blank names and Untitled are ignored; normal clears the active effect. Duplicate normalized names merge their fields, with later entries overriding earlier ones; use distinct names for independent presets.",
            "editorType": "text",
            "nativeDefault": "Untitled",
            "type": "string",
            "default": "Untitled",
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-049",
            "key": "ShakeStrengthHorz",
            "storageKey": "ShakeStrengthHorz:num",
            "label": "Horz Strength",
            "description": "Horizontal random shake amplitude in pixels. Use a nonnegative whole number N: each frame adds a randomly signed integer from 0 through N to the glyph base X. Zero disables horizontal shake. Fractional and negative inputs are not clamped and do not produce this documented amplitude distribution.",
            "editorType": "number",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-050",
            "key": "ShakeStrengthVert",
            "storageKey": "ShakeStrengthVert:num",
            "label": "Vert Strength",
            "description": "Vertical random shake amplitude in pixels. Use a nonnegative whole number N: each frame adds a randomly signed integer from 0 through N to the glyph base Y. Zero disables vertical shake. Fractional and negative inputs are not clamped and do not produce this documented amplitude distribution.",
            "editorType": "number",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-052",
            "key": "WaveDistanceX",
            "storageKey": "WaveDistanceX:num",
            "label": "Distance",
            "description": "Horizontal wave amplitude in pixels. Adds round(cos(phase) * distance) to the glyph base X; it oscillates between approximately -abs(distance) and +abs(distance). Zero disables this axis and negative distance reverses displacement. Use finite values; no additional clamp.",
            "editorType": "number",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-053",
            "key": "WaveSpeedX",
            "storageKey": "WaveSpeedX:num",
            "label": "Speed Modifier",
            "description": "Horizontal wave cosine speed in radians per game frame. A nonzero speed has period 2*pi/abs(speed) frames; zero disables the wave. Changing the sign yields the same cosine. Use finite values.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-054",
            "key": "WaveOffsetX",
            "storageKey": "WaveOffsetX:num",
            "label": "Offset Modifier",
            "description": "Horizontal wave phase offset in frames per glyph: phase = (Graphics.frameCount + offset * glyphIndex) * WaveSpeedX radians. Index starts at zero among the page animated glyphs/icons. Zero aligns glyphs; negative finite offsets reverse their phase spacing.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-056",
            "key": "WaveDistanceY",
            "storageKey": "WaveDistanceY:num",
            "label": "Distance",
            "description": "Vertical wave amplitude in pixels. Adds round(cos(phase) * distance) to the glyph base Y; it oscillates between approximately -abs(distance) and +abs(distance). Zero disables this axis and negative distance reverses displacement. Use finite values; no additional clamp.",
            "editorType": "number",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-057",
            "key": "WaveSpeedY",
            "storageKey": "WaveSpeedY:num",
            "label": "Speed Modifier",
            "description": "Vertical wave cosine speed in radians per game frame. A nonzero speed has period 2*pi/abs(speed) frames; zero disables the wave. Changing the sign yields the same cosine. Use finite values.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-058",
            "key": "WaveOffsetY",
            "storageKey": "WaveOffsetY:num",
            "label": "Offset Modifier",
            "description": "Vertical wave phase offset in frames per glyph: phase = (Graphics.frameCount + offset * glyphIndex) * WaveSpeedY radians. Index starts at zero among the page animated glyphs/icons. Zero aligns glyphs; negative finite offsets reverse their phase spacing.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          }
        ],
        "default": {
          "Name": "Untitled",
          "ShakeStrengthHorz": 0,
          "ShakeStrengthVert": 0,
          "WaveDistanceX": 0,
          "WaveSpeedX": 0,
          "WaveOffsetX": 0,
          "WaveDistanceY": 0,
          "WaveSpeedY": 0,
          "WaveOffsetY": 0
        }
      },
      "default": [
        {
          "Name": "Shake",
          "ShakeStrengthHorz": 2,
          "ShakeStrengthVert": 2,
          "WaveDistanceX": 0,
          "WaveSpeedX": 0,
          "WaveOffsetX": 0,
          "WaveDistanceY": 0,
          "WaveSpeedY": 0,
          "WaveOffsetY": 0
        },
        {
          "Name": "SoftShake",
          "ShakeStrengthHorz": 1,
          "ShakeStrengthVert": 1,
          "WaveDistanceX": 0,
          "WaveSpeedX": 0,
          "WaveOffsetX": 0,
          "WaveDistanceY": 0,
          "WaveSpeedY": 0,
          "WaveOffsetY": 0
        },
        {
          "Name": "HardShake",
          "ShakeStrengthHorz": 3,
          "ShakeStrengthVert": 3,
          "WaveDistanceX": 0,
          "WaveSpeedX": 0,
          "WaveOffsetX": 0,
          "WaveDistanceY": 0,
          "WaveSpeedY": 0,
          "WaveOffsetY": 0
        },
        {
          "Name": "Shiver",
          "ShakeStrengthHorz": 2,
          "ShakeStrengthVert": 0,
          "WaveDistanceX": 0,
          "WaveSpeedX": 0,
          "WaveOffsetX": 0,
          "WaveDistanceY": 0,
          "WaveSpeedY": 0,
          "WaveOffsetY": 0
        },
        {
          "Name": "SoftShiver",
          "ShakeStrengthHorz": 1,
          "ShakeStrengthVert": 0,
          "WaveDistanceX": 0,
          "WaveSpeedX": 0,
          "WaveOffsetX": 0,
          "WaveDistanceY": 0,
          "WaveSpeedY": 0,
          "WaveOffsetY": 0
        },
        {
          "Name": "HardShiver",
          "ShakeStrengthHorz": 3,
          "ShakeStrengthVert": 0,
          "WaveDistanceX": 0,
          "WaveSpeedX": 0,
          "WaveOffsetX": 0,
          "WaveDistanceY": 0,
          "WaveSpeedY": 0,
          "WaveOffsetY": 0
        },
        {
          "Name": "Vibe",
          "ShakeStrengthHorz": 0,
          "ShakeStrengthVert": 2,
          "WaveDistanceX": 0,
          "WaveSpeedX": 0,
          "WaveOffsetX": 0,
          "WaveDistanceY": 0,
          "WaveSpeedY": 0,
          "WaveOffsetY": 0
        },
        {
          "Name": "SoftVibe",
          "ShakeStrengthHorz": 0,
          "ShakeStrengthVert": 1,
          "WaveDistanceX": 0,
          "WaveSpeedX": 0,
          "WaveOffsetX": 0,
          "WaveDistanceY": 0,
          "WaveSpeedY": 0,
          "WaveOffsetY": 0
        },
        {
          "Name": "HardVibe",
          "ShakeStrengthHorz": 0,
          "ShakeStrengthVert": 3,
          "WaveDistanceX": 0,
          "WaveSpeedX": 0,
          "WaveOffsetX": 0,
          "WaveDistanceY": 0,
          "WaveSpeedY": 0,
          "WaveOffsetY": 0
        },
        {
          "Name": "Stagger",
          "ShakeStrengthHorz": 0,
          "ShakeStrengthVert": 0,
          "WaveDistanceX": 0,
          "WaveSpeedX": 0,
          "WaveOffsetX": 0,
          "WaveDistanceY": 4,
          "WaveSpeedY": 0.25,
          "WaveOffsetY": 15
        },
        {
          "Name": "SlowStagger",
          "ShakeStrengthHorz": 0,
          "ShakeStrengthVert": 0,
          "WaveDistanceX": 0,
          "WaveSpeedX": 0,
          "WaveOffsetX": 0,
          "WaveDistanceY": 4,
          "WaveSpeedY": 0.1,
          "WaveOffsetY": 30
        },
        {
          "Name": "FastStagger",
          "ShakeStrengthHorz": 0,
          "ShakeStrengthVert": 0,
          "WaveDistanceX": 0,
          "WaveSpeedX": 0,
          "WaveOffsetX": 0,
          "WaveDistanceY": 4,
          "WaveSpeedY": 0.5,
          "WaveOffsetY": 30
        },
        {
          "Name": "Saw",
          "ShakeStrengthHorz": 0,
          "ShakeStrengthVert": 0,
          "WaveDistanceX": 3,
          "WaveSpeedX": 0.25,
          "WaveOffsetX": 0,
          "WaveDistanceY": 0,
          "WaveSpeedY": 0,
          "WaveOffsetY": 0
        },
        {
          "Name": "SlowSaw",
          "ShakeStrengthHorz": 0,
          "ShakeStrengthVert": 0,
          "WaveDistanceX": 3,
          "WaveSpeedX": 0.1,
          "WaveOffsetX": 0,
          "WaveDistanceY": 0,
          "WaveSpeedY": 0,
          "WaveOffsetY": 0
        },
        {
          "Name": "FastSaw",
          "ShakeStrengthHorz": 0,
          "ShakeStrengthVert": 0,
          "WaveDistanceX": 3,
          "WaveSpeedX": 0.4,
          "WaveOffsetX": 0,
          "WaveDistanceY": 0,
          "WaveSpeedY": 0,
          "WaveOffsetY": 0
        },
        {
          "Name": "Bounce",
          "ShakeStrengthHorz": 0,
          "ShakeStrengthVert": 0,
          "WaveDistanceX": 0,
          "WaveSpeedX": 0,
          "WaveOffsetX": 0,
          "WaveDistanceY": 3,
          "WaveSpeedY": 0.25,
          "WaveOffsetY": 0
        },
        {
          "Name": "SlowBounce",
          "ShakeStrengthHorz": 0,
          "ShakeStrengthVert": 0,
          "WaveDistanceX": 0,
          "WaveSpeedX": 0,
          "WaveOffsetX": 0,
          "WaveDistanceY": 3,
          "WaveSpeedY": 0.1,
          "WaveOffsetY": 0
        },
        {
          "Name": "FastBounce",
          "ShakeStrengthHorz": 0,
          "ShakeStrengthVert": 0,
          "WaveDistanceX": 0,
          "WaveSpeedX": 0,
          "WaveOffsetX": 0,
          "WaveDistanceY": 3,
          "WaveSpeedY": 0.4,
          "WaveOffsetY": 0
        },
        {
          "Name": "Wave",
          "ShakeStrengthHorz": 0,
          "ShakeStrengthVert": 0,
          "WaveDistanceX": 3,
          "WaveSpeedX": 0.25,
          "WaveOffsetX": 1,
          "WaveDistanceY": 3,
          "WaveSpeedY": 0.25,
          "WaveOffsetY": 2
        },
        {
          "Name": "SlowWave",
          "ShakeStrengthHorz": 0,
          "ShakeStrengthVert": 0,
          "WaveDistanceX": 3,
          "WaveSpeedX": 0.1,
          "WaveOffsetX": 1,
          "WaveDistanceY": 3,
          "WaveSpeedY": 0.1,
          "WaveOffsetY": 2
        },
        {
          "Name": "FastWave",
          "ShakeStrengthHorz": 0,
          "ShakeStrengthVert": 0,
          "WaveDistanceX": 3,
          "WaveSpeedX": 0.4,
          "WaveOffsetX": 1,
          "WaveDistanceY": 3,
          "WaveSpeedY": 0.4,
          "WaveOffsetY": 2
        },
        {
          "Name": "HorzWave",
          "ShakeStrengthHorz": 0,
          "ShakeStrengthVert": 0,
          "WaveDistanceX": 3,
          "WaveSpeedX": 0.25,
          "WaveOffsetX": 1,
          "WaveDistanceY": 0,
          "WaveSpeedY": 0,
          "WaveOffsetY": 0
        },
        {
          "Name": "SlowHorzWave",
          "ShakeStrengthHorz": 0,
          "ShakeStrengthVert": 0,
          "WaveDistanceX": 3,
          "WaveSpeedX": 0.1,
          "WaveOffsetX": 1,
          "WaveDistanceY": 0,
          "WaveSpeedY": 0,
          "WaveOffsetY": 0
        },
        {
          "Name": "FastHorzWave",
          "ShakeStrengthHorz": 0,
          "ShakeStrengthVert": 0,
          "WaveDistanceX": 3,
          "WaveSpeedX": 0.4,
          "WaveOffsetX": 1,
          "WaveDistanceY": 0,
          "WaveSpeedY": 0,
          "WaveOffsetY": 0
        },
        {
          "Name": "VertWave",
          "ShakeStrengthHorz": 0,
          "ShakeStrengthVert": 0,
          "WaveDistanceX": 0,
          "WaveSpeedX": 0,
          "WaveOffsetX": 0,
          "WaveDistanceY": 3,
          "WaveSpeedY": 0.25,
          "WaveOffsetY": 2
        },
        {
          "Name": "SlowVertWave",
          "ShakeStrengthHorz": 0,
          "ShakeStrengthVert": 0,
          "WaveDistanceX": 0,
          "WaveSpeedX": 0,
          "WaveOffsetX": 0,
          "WaveDistanceY": 3,
          "WaveSpeedY": 0.1,
          "WaveOffsetY": 2
        },
        {
          "Name": "FastVertWave",
          "ShakeStrengthHorz": 0,
          "ShakeStrengthVert": 0,
          "WaveDistanceX": 0,
          "WaveSpeedX": 0,
          "WaveOffsetX": 0,
          "WaveDistanceY": 3,
          "WaveSpeedY": 0.4,
          "WaveOffsetY": 2
        }
      ],
      "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
    },
    {
      "id": "ANI-M-010",
      "key": "ScaleEffects",
      "storageKey": "ScaleEffects:arraystruct",
      "label": "Scaling Effects",
      "description": "Named scale-effect presets for message glyphs: flips multiply scale by a cosine, and pulses multiply it by 1 + cos(phase) * growth / 2. Speeds are radians per frame and offsets are frames per glyph. Configure each preset using the fields below.",
      "editorType": "struct<ScaleEffects>[]",
      "nativeDefault": "[\"{\\\"Name:str\\\":\\\"HorzCard\\\",\\\"Scaling\\\":\\\"\\\",\\\"FlipX\\\":\\\"\\\",\\\"FlipSpeedX:num\\\":\\\"0.10\\\",\\\"FlipOffsetX:num\\\":\\\"0\\\",\\\"FlipY\\\":\\\"\\\",\\\"FlipSpeedY:num\\\":\\\"0\\\",\\\"FlipOffsetY:num\\\":\\\"0\\\",\\\"PulseX\\\":\\\"\\\",\\\"PulseGrowthX:num\\\":\\\"0\\\",\\\"PulseSpeedX:num\\\":\\\"0\\\",\\\"PulseOffsetX:num\\\":\\\"0\\\",\\\"PulseY\\\":\\\"\\\",\\\"PulseGrowthY:num\\\":\\\"0\\\",\\\"PulseSpeedY:num\\\":\\\"0\\\",\\\"PulseOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"SlowHorzCard\\\",\\\"Scaling\\\":\\\"\\\",\\\"FlipX\\\":\\\"\\\",\\\"FlipSpeedX:num\\\":\\\"0.08\\\",\\\"FlipOffsetX:num\\\":\\\"0\\\",\\\"FlipY\\\":\\\"\\\",\\\"FlipSpeedY:num\\\":\\\"0\\\",\\\"FlipOffsetY:num\\\":\\\"0\\\",\\\"PulseX\\\":\\\"\\\",\\\"PulseGrowthX:num\\\":\\\"0\\\",\\\"PulseSpeedX:num\\\":\\\"0\\\",\\\"PulseOffsetX:num\\\":\\\"0\\\",\\\"PulseY\\\":\\\"\\\",\\\"PulseGrowthY:num\\\":\\\"0\\\",\\\"PulseSpeedY:num\\\":\\\"0\\\",\\\"PulseOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"FastHorzCard\\\",\\\"Scaling\\\":\\\"\\\",\\\"FlipX\\\":\\\"\\\",\\\"FlipSpeedX:num\\\":\\\"0.15\\\",\\\"FlipOffsetX:num\\\":\\\"0\\\",\\\"FlipY\\\":\\\"\\\",\\\"FlipSpeedY:num\\\":\\\"0\\\",\\\"FlipOffsetY:num\\\":\\\"0\\\",\\\"PulseX\\\":\\\"\\\",\\\"PulseGrowthX:num\\\":\\\"0\\\",\\\"PulseSpeedX:num\\\":\\\"0\\\",\\\"PulseOffsetX:num\\\":\\\"0\\\",\\\"PulseY\\\":\\\"\\\",\\\"PulseGrowthY:num\\\":\\\"0\\\",\\\"PulseSpeedY:num\\\":\\\"0\\\",\\\"PulseOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"VertCard\\\",\\\"Scaling\\\":\\\"\\\",\\\"FlipX\\\":\\\"\\\",\\\"FlipSpeedX:num\\\":\\\"0\\\",\\\"FlipOffsetX:num\\\":\\\"0\\\",\\\"FlipY\\\":\\\"\\\",\\\"FlipSpeedY:num\\\":\\\"0.10\\\",\\\"FlipOffsetY:num\\\":\\\"0\\\",\\\"PulseX\\\":\\\"\\\",\\\"PulseGrowthX:num\\\":\\\"0\\\",\\\"PulseSpeedX:num\\\":\\\"0\\\",\\\"PulseOffsetX:num\\\":\\\"0\\\",\\\"PulseY\\\":\\\"\\\",\\\"PulseGrowthY:num\\\":\\\"0\\\",\\\"PulseSpeedY:num\\\":\\\"0\\\",\\\"PulseOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"SlowVertCard\\\",\\\"Scaling\\\":\\\"\\\",\\\"FlipX\\\":\\\"\\\",\\\"FlipSpeedX:num\\\":\\\"0\\\",\\\"FlipOffsetX:num\\\":\\\"0\\\",\\\"FlipY\\\":\\\"\\\",\\\"FlipSpeedY:num\\\":\\\"0.08\\\",\\\"FlipOffsetY:num\\\":\\\"0\\\",\\\"PulseX\\\":\\\"\\\",\\\"PulseGrowthX:num\\\":\\\"0\\\",\\\"PulseSpeedX:num\\\":\\\"0\\\",\\\"PulseOffsetX:num\\\":\\\"0\\\",\\\"PulseY\\\":\\\"\\\",\\\"PulseGrowthY:num\\\":\\\"0\\\",\\\"PulseSpeedY:num\\\":\\\"0\\\",\\\"PulseOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"FastVertCard\\\",\\\"Scaling\\\":\\\"\\\",\\\"FlipX\\\":\\\"\\\",\\\"FlipSpeedX:num\\\":\\\"0\\\",\\\"FlipOffsetX:num\\\":\\\"0\\\",\\\"FlipY\\\":\\\"\\\",\\\"FlipSpeedY:num\\\":\\\"0.15\\\",\\\"FlipOffsetY:num\\\":\\\"0\\\",\\\"PulseX\\\":\\\"\\\",\\\"PulseGrowthX:num\\\":\\\"0\\\",\\\"PulseSpeedX:num\\\":\\\"0\\\",\\\"PulseOffsetX:num\\\":\\\"0\\\",\\\"PulseY\\\":\\\"\\\",\\\"PulseGrowthY:num\\\":\\\"0\\\",\\\"PulseSpeedY:num\\\":\\\"0\\\",\\\"PulseOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"HorzRibbon\\\",\\\"Scaling\\\":\\\"\\\",\\\"FlipX\\\":\\\"\\\",\\\"FlipSpeedX:num\\\":\\\"0.10\\\",\\\"FlipOffsetX:num\\\":\\\"2\\\",\\\"FlipY\\\":\\\"\\\",\\\"FlipSpeedY:num\\\":\\\"0\\\",\\\"FlipOffsetY:num\\\":\\\"0\\\",\\\"PulseX\\\":\\\"\\\",\\\"PulseGrowthX:num\\\":\\\"0\\\",\\\"PulseSpeedX:num\\\":\\\"0\\\",\\\"PulseOffsetX:num\\\":\\\"0\\\",\\\"PulseY\\\":\\\"\\\",\\\"PulseGrowthY:num\\\":\\\"0\\\",\\\"PulseSpeedY:num\\\":\\\"0\\\",\\\"PulseOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"SlowHorzRibbon\\\",\\\"Scaling\\\":\\\"\\\",\\\"FlipX\\\":\\\"\\\",\\\"FlipSpeedX:num\\\":\\\"0.08\\\",\\\"FlipOffsetX:num\\\":\\\"2\\\",\\\"FlipY\\\":\\\"\\\",\\\"FlipSpeedY:num\\\":\\\"0\\\",\\\"FlipOffsetY:num\\\":\\\"0\\\",\\\"PulseX\\\":\\\"\\\",\\\"PulseGrowthX:num\\\":\\\"0\\\",\\\"PulseSpeedX:num\\\":\\\"0\\\",\\\"PulseOffsetX:num\\\":\\\"0\\\",\\\"PulseY\\\":\\\"\\\",\\\"PulseGrowthY:num\\\":\\\"0\\\",\\\"PulseSpeedY:num\\\":\\\"0\\\",\\\"PulseOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"FastHorzRibbon\\\",\\\"Scaling\\\":\\\"\\\",\\\"FlipX\\\":\\\"\\\",\\\"FlipSpeedX:num\\\":\\\"0.15\\\",\\\"FlipOffsetX:num\\\":\\\"2\\\",\\\"FlipY\\\":\\\"\\\",\\\"FlipSpeedY:num\\\":\\\"0\\\",\\\"FlipOffsetY:num\\\":\\\"0\\\",\\\"PulseX\\\":\\\"\\\",\\\"PulseGrowthX:num\\\":\\\"0\\\",\\\"PulseSpeedX:num\\\":\\\"0\\\",\\\"PulseOffsetX:num\\\":\\\"0\\\",\\\"PulseY\\\":\\\"\\\",\\\"PulseGrowthY:num\\\":\\\"0\\\",\\\"PulseSpeedY:num\\\":\\\"0\\\",\\\"PulseOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"VertRibbon\\\",\\\"Scaling\\\":\\\"\\\",\\\"FlipX\\\":\\\"\\\",\\\"FlipSpeedX:num\\\":\\\"0\\\",\\\"FlipOffsetX:num\\\":\\\"0\\\",\\\"FlipY\\\":\\\"\\\",\\\"FlipSpeedY:num\\\":\\\"0.10\\\",\\\"FlipOffsetY:num\\\":\\\"2\\\",\\\"PulseX\\\":\\\"\\\",\\\"PulseGrowthX:num\\\":\\\"0\\\",\\\"PulseSpeedX:num\\\":\\\"0\\\",\\\"PulseOffsetX:num\\\":\\\"0\\\",\\\"PulseY\\\":\\\"\\\",\\\"PulseGrowthY:num\\\":\\\"0\\\",\\\"PulseSpeedY:num\\\":\\\"0\\\",\\\"PulseOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"SlowVertRibbon\\\",\\\"Scaling\\\":\\\"\\\",\\\"FlipX\\\":\\\"\\\",\\\"FlipSpeedX:num\\\":\\\"0\\\",\\\"FlipOffsetX:num\\\":\\\"0\\\",\\\"FlipY\\\":\\\"\\\",\\\"FlipSpeedY:num\\\":\\\"0.08\\\",\\\"FlipOffsetY:num\\\":\\\"2\\\",\\\"PulseX\\\":\\\"\\\",\\\"PulseGrowthX:num\\\":\\\"0\\\",\\\"PulseSpeedX:num\\\":\\\"0\\\",\\\"PulseOffsetX:num\\\":\\\"0\\\",\\\"PulseY\\\":\\\"\\\",\\\"PulseGrowthY:num\\\":\\\"0\\\",\\\"PulseSpeedY:num\\\":\\\"0\\\",\\\"PulseOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"FastVertRibbon\\\",\\\"Scaling\\\":\\\"\\\",\\\"FlipX\\\":\\\"\\\",\\\"FlipSpeedX:num\\\":\\\"0\\\",\\\"FlipOffsetX:num\\\":\\\"0\\\",\\\"FlipY\\\":\\\"\\\",\\\"FlipSpeedY:num\\\":\\\"0.15\\\",\\\"FlipOffsetY:num\\\":\\\"2\\\",\\\"PulseX\\\":\\\"\\\",\\\"PulseGrowthX:num\\\":\\\"0\\\",\\\"PulseSpeedX:num\\\":\\\"0\\\",\\\"PulseOffsetX:num\\\":\\\"0\\\",\\\"PulseY\\\":\\\"\\\",\\\"PulseGrowthY:num\\\":\\\"0\\\",\\\"PulseSpeedY:num\\\":\\\"0\\\",\\\"PulseOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"Pulse\\\",\\\"Scaling\\\":\\\"\\\",\\\"FlipX\\\":\\\"\\\",\\\"FlipSpeedX:num\\\":\\\"0\\\",\\\"FlipOffsetX:num\\\":\\\"0\\\",\\\"FlipY\\\":\\\"\\\",\\\"FlipSpeedY:num\\\":\\\"0\\\",\\\"FlipOffsetY:num\\\":\\\"0\\\",\\\"PulseX\\\":\\\"\\\",\\\"PulseGrowthX:num\\\":\\\"0.30\\\",\\\"PulseSpeedX:num\\\":\\\"0.25\\\",\\\"PulseOffsetX:num\\\":\\\"0\\\",\\\"PulseY\\\":\\\"\\\",\\\"PulseGrowthY:num\\\":\\\"0.30\\\",\\\"PulseSpeedY:num\\\":\\\"0.25\\\",\\\"PulseOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"SmallPulse\\\",\\\"Scaling\\\":\\\"\\\",\\\"FlipX\\\":\\\"\\\",\\\"FlipSpeedX:num\\\":\\\"0\\\",\\\"FlipOffsetX:num\\\":\\\"0\\\",\\\"FlipY\\\":\\\"\\\",\\\"FlipSpeedY:num\\\":\\\"0\\\",\\\"FlipOffsetY:num\\\":\\\"0\\\",\\\"PulseX\\\":\\\"\\\",\\\"PulseGrowthX:num\\\":\\\"0.10\\\",\\\"PulseSpeedX:num\\\":\\\"0.25\\\",\\\"PulseOffsetX:num\\\":\\\"0\\\",\\\"PulseY\\\":\\\"\\\",\\\"PulseGrowthY:num\\\":\\\"0.10\\\",\\\"PulseSpeedY:num\\\":\\\"0.25\\\",\\\"PulseOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"BigPulse\\\",\\\"Scaling\\\":\\\"\\\",\\\"FlipX\\\":\\\"\\\",\\\"FlipSpeedX:num\\\":\\\"0\\\",\\\"FlipOffsetX:num\\\":\\\"0\\\",\\\"FlipY\\\":\\\"\\\",\\\"FlipSpeedY:num\\\":\\\"0\\\",\\\"FlipOffsetY:num\\\":\\\"0\\\",\\\"PulseX\\\":\\\"\\\",\\\"PulseGrowthX:num\\\":\\\"0.40\\\",\\\"PulseSpeedX:num\\\":\\\"0.25\\\",\\\"PulseOffsetX:num\\\":\\\"0\\\",\\\"PulseY\\\":\\\"\\\",\\\"PulseGrowthY:num\\\":\\\"0.40\\\",\\\"PulseSpeedY:num\\\":\\\"0.25\\\",\\\"PulseOffsetY:num\\\":\\\"0\\\"}\",\"{\\\"Name:str\\\":\\\"Jiggle\\\",\\\"Scaling\\\":\\\"\\\",\\\"FlipX\\\":\\\"\\\",\\\"FlipSpeedX:num\\\":\\\"0\\\",\\\"FlipOffsetX:num\\\":\\\"0\\\",\\\"FlipY\\\":\\\"\\\",\\\"FlipSpeedY:num\\\":\\\"0\\\",\\\"FlipOffsetY:num\\\":\\\"0\\\",\\\"PulseX\\\":\\\"\\\",\\\"PulseGrowthX:num\\\":\\\"0.30\\\",\\\"PulseSpeedX:num\\\":\\\"0.25\\\",\\\"PulseOffsetX:num\\\":\\\"2\\\",\\\"PulseY\\\":\\\"\\\",\\\"PulseGrowthY:num\\\":\\\"0.30\\\",\\\"PulseSpeedY:num\\\":\\\"0.25\\\",\\\"PulseOffsetY:num\\\":\\\"2\\\"}\",\"{\\\"Name:str\\\":\\\"SmallJiggle\\\",\\\"Scaling\\\":\\\"\\\",\\\"FlipX\\\":\\\"\\\",\\\"FlipSpeedX:num\\\":\\\"0\\\",\\\"FlipOffsetX:num\\\":\\\"0\\\",\\\"FlipY\\\":\\\"\\\",\\\"FlipSpeedY:num\\\":\\\"0\\\",\\\"FlipOffsetY:num\\\":\\\"0\\\",\\\"PulseX\\\":\\\"\\\",\\\"PulseGrowthX:num\\\":\\\"0.10\\\",\\\"PulseSpeedX:num\\\":\\\"0.25\\\",\\\"PulseOffsetX:num\\\":\\\"2\\\",\\\"PulseY\\\":\\\"\\\",\\\"PulseGrowthY:num\\\":\\\"0.10\\\",\\\"PulseSpeedY:num\\\":\\\"0.25\\\",\\\"PulseOffsetY:num\\\":\\\"2\\\"}\",\"{\\\"Name:str\\\":\\\"BigJiggle\\\",\\\"Scaling\\\":\\\"\\\",\\\"FlipX\\\":\\\"\\\",\\\"FlipSpeedX:num\\\":\\\"0\\\",\\\"FlipOffsetX:num\\\":\\\"0\\\",\\\"FlipY\\\":\\\"\\\",\\\"FlipSpeedY:num\\\":\\\"0\\\",\\\"FlipOffsetY:num\\\":\\\"0\\\",\\\"PulseX\\\":\\\"\\\",\\\"PulseGrowthX:num\\\":\\\"0.40\\\",\\\"PulseSpeedX:num\\\":\\\"0.25\\\",\\\"PulseOffsetX:num\\\":\\\"2\\\",\\\"PulseY\\\":\\\"\\\",\\\"PulseGrowthY:num\\\":\\\"0.40\\\",\\\"PulseSpeedY:num\\\":\\\"0.25\\\",\\\"PulseOffsetY:num\\\":\\\"2\\\"}\",\"{\\\"Name:str\\\":\\\"Gooey\\\",\\\"Scaling\\\":\\\"\\\",\\\"FlipX\\\":\\\"\\\",\\\"FlipSpeedX:num\\\":\\\"0\\\",\\\"FlipOffsetX:num\\\":\\\"0\\\",\\\"FlipY\\\":\\\"\\\",\\\"FlipSpeedY:num\\\":\\\"0\\\",\\\"FlipOffsetY:num\\\":\\\"0\\\",\\\"PulseX\\\":\\\"\\\",\\\"PulseGrowthX:num\\\":\\\"0.30\\\",\\\"PulseSpeedX:num\\\":\\\"0.25\\\",\\\"PulseOffsetX:num\\\":\\\"33\\\",\\\"PulseY\\\":\\\"\\\",\\\"PulseGrowthY:num\\\":\\\"-0.30\\\",\\\"PulseSpeedY:num\\\":\\\"0.25\\\",\\\"PulseOffsetY:num\\\":\\\"33\\\"}\",\"{\\\"Name:str\\\":\\\"SmallGooey\\\",\\\"Scaling\\\":\\\"\\\",\\\"FlipX\\\":\\\"\\\",\\\"FlipSpeedX:num\\\":\\\"0\\\",\\\"FlipOffsetX:num\\\":\\\"0\\\",\\\"FlipY\\\":\\\"\\\",\\\"FlipSpeedY:num\\\":\\\"0\\\",\\\"FlipOffsetY:num\\\":\\\"0\\\",\\\"PulseX\\\":\\\"\\\",\\\"PulseGrowthX:num\\\":\\\"0.10\\\",\\\"PulseSpeedX:num\\\":\\\"0.25\\\",\\\"PulseOffsetX:num\\\":\\\"33\\\",\\\"PulseY\\\":\\\"\\\",\\\"PulseGrowthY:num\\\":\\\"-0.10\\\",\\\"PulseSpeedY:num\\\":\\\"0.25\\\",\\\"PulseOffsetY:num\\\":\\\"33\\\"}\",\"{\\\"Name:str\\\":\\\"BigGooey\\\",\\\"Scaling\\\":\\\"\\\",\\\"FlipX\\\":\\\"\\\",\\\"FlipSpeedX:num\\\":\\\"0\\\",\\\"FlipOffsetX:num\\\":\\\"0\\\",\\\"FlipY\\\":\\\"\\\",\\\"FlipSpeedY:num\\\":\\\"0\\\",\\\"FlipOffsetY:num\\\":\\\"0\\\",\\\"PulseX\\\":\\\"\\\",\\\"PulseGrowthX:num\\\":\\\"0.40\\\",\\\"PulseSpeedX:num\\\":\\\"0.25\\\",\\\"PulseOffsetX:num\\\":\\\"33\\\",\\\"PulseY\\\":\\\"\\\",\\\"PulseGrowthY:num\\\":\\\"-0.40\\\",\\\"PulseSpeedY:num\\\":\\\"0.25\\\",\\\"PulseOffsetY:num\\\":\\\"33\\\"}\"]",
      "type": "array",
      "items": {
        "type": "struct",
        "structName": "ScaleEffects",
        "fields": [
          {
            "id": "ANI-M-059",
            "key": "Name",
            "storageKey": "Name:str",
            "label": "Name",
            "description": "Name used by the message text effect selector. Names are trimmed and case-insensitive. Avoid commas because selection splits on commas. Blank names and Untitled are ignored; normal clears the active effect. Duplicate normalized names merge their fields, with later entries overriding earlier ones; use distinct names for independent presets.",
            "editorType": "text",
            "nativeDefault": "Untitled",
            "type": "string",
            "default": "Untitled",
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-062",
            "key": "FlipSpeedX",
            "storageKey": "FlipSpeedX:num",
            "label": "Speed Modifier",
            "description": "X-axis flip cosine speed in radians per game frame; multiplier = cos((frame + FlipOffsetX * glyphIndex) * speed). It cycles from normal scale through zero to mirrored scale with period 2*pi/abs(speed). Zero disables the flip; changing speed sign yields the same cosine. Use finite values.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-063",
            "key": "FlipOffsetX",
            "storageKey": "FlipOffsetX:num",
            "label": "Offset Modifier",
            "description": "X-axis flip phase offset in frames per glyph. phase = (Graphics.frameCount + offset * glyphIndex) * FlipSpeedX. Zero aligns glyphs; finite negative offsets reverse phase spacing. Index starts at zero among animated glyphs/icons.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-065",
            "key": "FlipSpeedY",
            "storageKey": "FlipSpeedY:num",
            "label": "Speed Modifier",
            "description": "Y-axis flip cosine speed in radians per game frame; multiplier = cos((frame + FlipOffsetY * glyphIndex) * speed). It cycles from normal scale through zero to mirrored scale with period 2*pi/abs(speed). Zero disables the flip; changing speed sign yields the same cosine. Use finite values.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-066",
            "key": "FlipOffsetY",
            "storageKey": "FlipOffsetY:num",
            "label": "Offset Modifier",
            "description": "Y-axis flip phase offset in frames per glyph. phase = (Graphics.frameCount + offset * glyphIndex) * FlipSpeedY. Zero aligns glyphs; finite negative offsets reverse phase spacing. Index starts at zero among animated glyphs/icons.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-068",
            "key": "PulseGrowthX",
            "storageKey": "PulseGrowthX:num",
            "label": "Growth",
            "description": "X-axis pulse growth factor: multiplier = 1 + cos(phase) * growth/2, applied with the flip and message-window scale. Zero disables pulsing. For growth 1, scale ranges from 0.5 to 1.5 times the base; negative growth reverses the pulse. Values with abs(growth)>2 can mirror the glyph. Use finite values; no additional clamp.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-069",
            "key": "PulseSpeedX",
            "storageKey": "PulseSpeedX:num",
            "label": "Speed Modifier",
            "description": "X-axis pulse cosine speed in radians per game frame. Period = 2*pi/abs(speed) frames for nonzero values; zero disables pulsing. Changing the sign yields the same cosine. Use finite values.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-070",
            "key": "PulseOffsetX",
            "storageKey": "PulseOffsetX:num",
            "label": "Offset Modifier",
            "description": "X-axis pulse phase offset in frames per glyph. phase = (Graphics.frameCount + offset * glyphIndex) * PulseSpeedX. Zero aligns glyphs; finite negative offsets reverse phase spacing. Index starts at zero among animated glyphs/icons.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-072",
            "key": "PulseGrowthY",
            "storageKey": "PulseGrowthY:num",
            "label": "Growth",
            "description": "Y-axis pulse growth factor: multiplier = 1 + cos(phase) * growth/2, applied with the flip and message-window scale. Zero disables pulsing. For growth 1, scale ranges from 0.5 to 1.5 times the base; negative growth reverses the pulse. Values with abs(growth)>2 can mirror the glyph. Use finite values; no additional clamp.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-073",
            "key": "PulseSpeedY",
            "storageKey": "PulseSpeedY:num",
            "label": "Speed Modifier",
            "description": "Y-axis pulse cosine speed in radians per game frame. Period = 2*pi/abs(speed) frames for nonzero values; zero disables pulsing. Changing the sign yields the same cosine. Use finite values.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          },
          {
            "id": "ANI-M-074",
            "key": "PulseOffsetY",
            "storageKey": "PulseOffsetY:num",
            "label": "Offset Modifier",
            "description": "Y-axis pulse phase offset in frames per glyph. phase = (Graphics.frameCount + offset * glyphIndex) * PulseSpeedY. Zero aligns glyphs; finite negative offsets reverse phase spacing. Index starts at zero among animated glyphs/icons.",
            "editorType": "text",
            "nativeDefault": "0",
            "type": "number",
            "default": 0,
            "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
          }
        ],
        "default": {
          "Name": "Untitled",
          "FlipSpeedX": 0,
          "FlipOffsetX": 0,
          "FlipSpeedY": 0,
          "FlipOffsetY": 0,
          "PulseGrowthX": 0,
          "PulseSpeedX": 0,
          "PulseOffsetX": 0,
          "PulseGrowthY": 0,
          "PulseSpeedY": 0,
          "PulseOffsetY": 0
        }
      },
      "default": [
        {
          "Name": "HorzCard",
          "FlipSpeedX": 0.1,
          "FlipOffsetX": 0,
          "FlipSpeedY": 0,
          "FlipOffsetY": 0,
          "PulseGrowthX": 0,
          "PulseSpeedX": 0,
          "PulseOffsetX": 0,
          "PulseGrowthY": 0,
          "PulseSpeedY": 0,
          "PulseOffsetY": 0
        },
        {
          "Name": "SlowHorzCard",
          "FlipSpeedX": 0.08,
          "FlipOffsetX": 0,
          "FlipSpeedY": 0,
          "FlipOffsetY": 0,
          "PulseGrowthX": 0,
          "PulseSpeedX": 0,
          "PulseOffsetX": 0,
          "PulseGrowthY": 0,
          "PulseSpeedY": 0,
          "PulseOffsetY": 0
        },
        {
          "Name": "FastHorzCard",
          "FlipSpeedX": 0.15,
          "FlipOffsetX": 0,
          "FlipSpeedY": 0,
          "FlipOffsetY": 0,
          "PulseGrowthX": 0,
          "PulseSpeedX": 0,
          "PulseOffsetX": 0,
          "PulseGrowthY": 0,
          "PulseSpeedY": 0,
          "PulseOffsetY": 0
        },
        {
          "Name": "VertCard",
          "FlipSpeedX": 0,
          "FlipOffsetX": 0,
          "FlipSpeedY": 0.1,
          "FlipOffsetY": 0,
          "PulseGrowthX": 0,
          "PulseSpeedX": 0,
          "PulseOffsetX": 0,
          "PulseGrowthY": 0,
          "PulseSpeedY": 0,
          "PulseOffsetY": 0
        },
        {
          "Name": "SlowVertCard",
          "FlipSpeedX": 0,
          "FlipOffsetX": 0,
          "FlipSpeedY": 0.08,
          "FlipOffsetY": 0,
          "PulseGrowthX": 0,
          "PulseSpeedX": 0,
          "PulseOffsetX": 0,
          "PulseGrowthY": 0,
          "PulseSpeedY": 0,
          "PulseOffsetY": 0
        },
        {
          "Name": "FastVertCard",
          "FlipSpeedX": 0,
          "FlipOffsetX": 0,
          "FlipSpeedY": 0.15,
          "FlipOffsetY": 0,
          "PulseGrowthX": 0,
          "PulseSpeedX": 0,
          "PulseOffsetX": 0,
          "PulseGrowthY": 0,
          "PulseSpeedY": 0,
          "PulseOffsetY": 0
        },
        {
          "Name": "HorzRibbon",
          "FlipSpeedX": 0.1,
          "FlipOffsetX": 2,
          "FlipSpeedY": 0,
          "FlipOffsetY": 0,
          "PulseGrowthX": 0,
          "PulseSpeedX": 0,
          "PulseOffsetX": 0,
          "PulseGrowthY": 0,
          "PulseSpeedY": 0,
          "PulseOffsetY": 0
        },
        {
          "Name": "SlowHorzRibbon",
          "FlipSpeedX": 0.08,
          "FlipOffsetX": 2,
          "FlipSpeedY": 0,
          "FlipOffsetY": 0,
          "PulseGrowthX": 0,
          "PulseSpeedX": 0,
          "PulseOffsetX": 0,
          "PulseGrowthY": 0,
          "PulseSpeedY": 0,
          "PulseOffsetY": 0
        },
        {
          "Name": "FastHorzRibbon",
          "FlipSpeedX": 0.15,
          "FlipOffsetX": 2,
          "FlipSpeedY": 0,
          "FlipOffsetY": 0,
          "PulseGrowthX": 0,
          "PulseSpeedX": 0,
          "PulseOffsetX": 0,
          "PulseGrowthY": 0,
          "PulseSpeedY": 0,
          "PulseOffsetY": 0
        },
        {
          "Name": "VertRibbon",
          "FlipSpeedX": 0,
          "FlipOffsetX": 0,
          "FlipSpeedY": 0.1,
          "FlipOffsetY": 2,
          "PulseGrowthX": 0,
          "PulseSpeedX": 0,
          "PulseOffsetX": 0,
          "PulseGrowthY": 0,
          "PulseSpeedY": 0,
          "PulseOffsetY": 0
        },
        {
          "Name": "SlowVertRibbon",
          "FlipSpeedX": 0,
          "FlipOffsetX": 0,
          "FlipSpeedY": 0.08,
          "FlipOffsetY": 2,
          "PulseGrowthX": 0,
          "PulseSpeedX": 0,
          "PulseOffsetX": 0,
          "PulseGrowthY": 0,
          "PulseSpeedY": 0,
          "PulseOffsetY": 0
        },
        {
          "Name": "FastVertRibbon",
          "FlipSpeedX": 0,
          "FlipOffsetX": 0,
          "FlipSpeedY": 0.15,
          "FlipOffsetY": 2,
          "PulseGrowthX": 0,
          "PulseSpeedX": 0,
          "PulseOffsetX": 0,
          "PulseGrowthY": 0,
          "PulseSpeedY": 0,
          "PulseOffsetY": 0
        },
        {
          "Name": "Pulse",
          "FlipSpeedX": 0,
          "FlipOffsetX": 0,
          "FlipSpeedY": 0,
          "FlipOffsetY": 0,
          "PulseGrowthX": 0.3,
          "PulseSpeedX": 0.25,
          "PulseOffsetX": 0,
          "PulseGrowthY": 0.3,
          "PulseSpeedY": 0.25,
          "PulseOffsetY": 0
        },
        {
          "Name": "SmallPulse",
          "FlipSpeedX": 0,
          "FlipOffsetX": 0,
          "FlipSpeedY": 0,
          "FlipOffsetY": 0,
          "PulseGrowthX": 0.1,
          "PulseSpeedX": 0.25,
          "PulseOffsetX": 0,
          "PulseGrowthY": 0.1,
          "PulseSpeedY": 0.25,
          "PulseOffsetY": 0
        },
        {
          "Name": "BigPulse",
          "FlipSpeedX": 0,
          "FlipOffsetX": 0,
          "FlipSpeedY": 0,
          "FlipOffsetY": 0,
          "PulseGrowthX": 0.4,
          "PulseSpeedX": 0.25,
          "PulseOffsetX": 0,
          "PulseGrowthY": 0.4,
          "PulseSpeedY": 0.25,
          "PulseOffsetY": 0
        },
        {
          "Name": "Jiggle",
          "FlipSpeedX": 0,
          "FlipOffsetX": 0,
          "FlipSpeedY": 0,
          "FlipOffsetY": 0,
          "PulseGrowthX": 0.3,
          "PulseSpeedX": 0.25,
          "PulseOffsetX": 2,
          "PulseGrowthY": 0.3,
          "PulseSpeedY": 0.25,
          "PulseOffsetY": 2
        },
        {
          "Name": "SmallJiggle",
          "FlipSpeedX": 0,
          "FlipOffsetX": 0,
          "FlipSpeedY": 0,
          "FlipOffsetY": 0,
          "PulseGrowthX": 0.1,
          "PulseSpeedX": 0.25,
          "PulseOffsetX": 2,
          "PulseGrowthY": 0.1,
          "PulseSpeedY": 0.25,
          "PulseOffsetY": 2
        },
        {
          "Name": "BigJiggle",
          "FlipSpeedX": 0,
          "FlipOffsetX": 0,
          "FlipSpeedY": 0,
          "FlipOffsetY": 0,
          "PulseGrowthX": 0.4,
          "PulseSpeedX": 0.25,
          "PulseOffsetX": 2,
          "PulseGrowthY": 0.4,
          "PulseSpeedY": 0.25,
          "PulseOffsetY": 2
        },
        {
          "Name": "Gooey",
          "FlipSpeedX": 0,
          "FlipOffsetX": 0,
          "FlipSpeedY": 0,
          "FlipOffsetY": 0,
          "PulseGrowthX": 0.3,
          "PulseSpeedX": 0.25,
          "PulseOffsetX": 33,
          "PulseGrowthY": -0.3,
          "PulseSpeedY": 0.25,
          "PulseOffsetY": 33
        },
        {
          "Name": "SmallGooey",
          "FlipSpeedX": 0,
          "FlipOffsetX": 0,
          "FlipSpeedY": 0,
          "FlipOffsetY": 0,
          "PulseGrowthX": 0.1,
          "PulseSpeedX": 0.25,
          "PulseOffsetX": 33,
          "PulseGrowthY": -0.1,
          "PulseSpeedY": 0.25,
          "PulseOffsetY": 33
        },
        {
          "Name": "BigGooey",
          "FlipSpeedX": 0,
          "FlipOffsetX": 0,
          "FlipSpeedY": 0,
          "FlipOffsetY": 0,
          "PulseGrowthX": 0.4,
          "PulseSpeedX": 0.25,
          "PulseOffsetX": 33,
          "PulseGrowthY": -0.4,
          "PulseSpeedY": 0.25,
          "PulseOffsetY": 33
        }
      ],
      "context": "Edit a named preset in this family. In Show Text, use \\EFFECT<MyEffect>animated text<CLEAR EFFECTS>, with MyEffect replaced by your preset Name. Names are case-insensitive; blank and Untitled names are ignored. Text Effects must be enabled in game options. Effects apply to subsequent message glyphs/icons and reset at a new page; other windows do not animate this text. Numeric animation units use game update frames, normally about 60 per second. Selection splits preset names on commas and combines them in the specified order; later selected fields override earlier ones. During loading, duplicate normalized names merge in array order, then in family order Angle, Color, Opacity, Position, Scale; later fields win. Avoid commas in names and reserve normal for clearing the active effect."
    },
    {
      "id": "ANI-M-011",
      "key": "Options",
      "storageKey": "Options:struct",
      "label": "Options Settings",
      "description": "Options settings for Animated Message Text Effects.",
      "editorType": "struct<Options>",
      "nativeDefault": "{\"Options\":\"\",\"AddOption:eval\":\"true\",\"AdjustRect:eval\":\"true\",\"Name:str\":\"Text Effects\"}",
      "type": "struct",
      "structName": "Options",
      "fields": [
        {
          "id": "ANI-M-076",
          "key": "AddOption",
          "storageKey": "AddOption:eval",
          "label": "Add Option?",
          "description": "Add the 'Text Effects' option to the Options menu?",
          "editorType": "boolean",
          "nativeDefault": "true",
          "type": "string",
          "javascript": "script",
          "default": "true"
        },
        {
          "id": "ANI-M-077",
          "key": "AdjustRect",
          "storageKey": "AdjustRect:eval",
          "label": "Adjust Window Height",
          "description": "Preserved setting; Ani 1.05 does not use it to change the Options rectangle.",
          "editorType": "boolean",
          "nativeDefault": "true",
          "type": "string",
          "javascript": "script",
          "default": "true"
        },
        {
          "id": "ANI-M-078",
          "key": "Name",
          "storageKey": "Name:str",
          "label": "Option Name",
          "description": "Command name of the option.",
          "editorType": "text",
          "nativeDefault": "Text Effects",
          "type": "string",
          "default": "Text Effects"
        }
      ],
      "default": {
        "AddOption": "true",
        "AdjustRect": "true",
        "Name": "Text Effects"
      }
    }
  ],
  "commands": [],
  "dependencies": {
    "cores": {
      "Coreto_0_CoreEngine": "0.1.0",
      "VisuMZ_0_CoreEngine": "1.90"
    },
    "messages": {
      "Coreto_1_MessageCore": "0.1.0",
      "VisuMZ_1_MessageCore": "1.54"
    },
    "before": {
      "Coreto_2_ExtMessageFunc": "0.1.0",
      "VisuMZ_2_ExtMessageFunc": "1.22",
      "Coreto_2_VNPictureBusts": "0.1.0"
    },
    "integrations": {
      "VisuMZ_1_OptionsCore": "1.27",
      "VisuMZ_1_SaveCore": "1.13",
      "VisuMZ_3_MessageLog": "1.08",
      "VisuMZ_3_MsgLetterSounds": "1.03"
    }
  }
};
const configurationSourceField = {
    id: 'CORETO-CONFIG-SOURCE',
    key: 'CoretoConfigSource',
    storageKey: 'CoretoConfigSource',
    label: 'Configuration source',
    description: 'inherit reads the original entry when present; own reads this entry. Switching does not copy values.',
    type: 'string',
    editorType: 'select',
    options: ['inherit', 'own'],
    default: 'inherit',
    nativeDefault: 'inherit',
    availability: 'supported'
};

function configurationSelection(catalog, parameters) {
    if (Object.hasOwn(parameters, 'CoretoConfigSource')) {
        return {configuredSource: parameters.CoretoConfigSource, format: 'canonical', migrationRequired: false};
    }
    const oldVn = catalog.pluginId === 'Coreto_2_VNPictureBusts';
    if (oldVn && Object.hasOwn(parameters, 'ConfigurationSource') && !['own', 'legacy-if-present'].includes(parameters.ConfigurationSource)) {
        const error = new Error('Use own or legacy-if-present for the historical VN selector.');
        error.code = 'INVALID_CONFIGURATION_SOURCE';
        error.exitCode = 2;
        throw error;
    }
    const configuredSource = oldVn && parameters.ConfigurationSource === 'own' ? 'own'
        : ['Coreto_0_CoreEngine', 'Coreto_1_MessageCore'].includes(catalog.pluginId) ? 'own' : 'inherit';
    return {configuredSource, format: oldVn && Object.hasOwn(parameters, 'ConfigurationSource') ? 'vn-legacy' : 'implicit', migrationRequired: true};
}

function resolvePluginConfiguration(catalog, plugins, {errorPrefix = 'CORETO', allowMissingOwn = false} = {}) {
    const ownEntries = plugins.filter(plugin => plugin.name === catalog.pluginId);
    const originalId = catalog.reference?.pluginId ?? 'VisuMZ_0_CoreEngine';
    const originals = plugins.filter(plugin => plugin.name === originalId);
    function fail(suffix, message) {
        const error = new Error(message);
        error.code = `${errorPrefix}_CONFIG_${suffix}`;
        error.exitCode = 2;
        throw error;
    }
    if (ownEntries.length > 1 || originals.length > 1 || (!allowMissingOwn && ownEntries.length !== 1)) {
        fail('DUPLICATE', 'Use one own entry and at most one original entry.');
    }
    const own = ownEntries[0];
    if (own && (!own.parameters || typeof own.parameters !== 'object' || Array.isArray(own.parameters))) {
        fail('ENCODING', 'Expected own parameter object.');
    }
    const selection = own ? configurationSelection(catalog, own.parameters)
        : {configuredSource: 'inherit', format: 'absent', migrationRequired: false};
    if (!configurationSourceField.options.includes(selection.configuredSource)) {
        fail('SOURCE', 'CoretoConfigSource must be inherit or own.');
    }
    const source = selection.configuredSource === 'inherit' && originals.length ? originals[0] : own;
    return {...selection, own, source, effectiveSource: source?.name ?? catalog.pluginId,
        materialized: selection.configuredSource === 'own', rawParameters: source?.parameters ?? {}};
}

class CoreError extends Error {
    constructor(code, message, details = {}, exitCode = 2) {
        super(message);
        this.code = code;
        this.details = details;
        this.exitCode = exitCode;
    }
}

function valueError(schema, value, path, expected = schema.type) {
    throw new CoreError("INVALID_VALUE", `Invalid value at ${path}; expected ${expected}.`, {
        field: path, received: value, expected,
        hint: schema.id ? `Use core api describe ${schema.id} to inspect accepted values and defaults.` : "Use core api list to inspect accepted parameter values."
    });
}

function validateValue(schema, value, path) {
    if (schema.type === "struct") {
        if (!value || typeof value !== "object" || Array.isArray(value)) valueError(schema, value, path);
        for (const key of Object.keys(value)) {
            const field = schema.fields.find(field => field.key === key);
            if (!field) throw new CoreError("UNKNOWN_FIELD", `Unknown field ${path}/${key}.`, { field: `${path}/${key}` });
            validateValue(field, value[key], `${path}/${key}`);
        }
        for (const field of schema.fields) {
            if (!Object.hasOwn(value, field.key)) valueError(field, undefined, `${path}/${field.key}`, "a value for this field");
        }
    } else if (schema.type === "array") {
        if (!Array.isArray(value)) valueError(schema, value, path);
        value.forEach((item, index) => validateValue(schema.items, item, `${path}/${index}`));
    } else if (schema.type === "number") {
        if (typeof value !== "number" || !Number.isFinite(value)) valueError(schema, value, path, "a finite number");
        if (schema.integer && !Number.isInteger(value)) valueError(schema, value, path, "an integer");
        if (schema.min !== undefined && value < schema.min) valueError(schema, value, path, `a number >= ${schema.min}`);
        if (schema.max !== undefined && value > schema.max) valueError(schema, value, path, `a number <= ${schema.max}`);
    } else if (schema.type === "boolean" || schema.type === "string") {
        if (typeof value !== schema.type) valueError(schema, value, path);
    } else {
        throw new CoreError("UNSUPPORTED_TYPE", `Unsupported parameter type: ${schema.type}.`, { field: path }, 6);
    }
    const unavailable = schema.unavailableOptions?.find(option => option.value === String(value).trim().toLowerCase());
    if (unavailable) {
        throw new CoreError("CAPABILITY_UNAVAILABLE", `Value is unavailable at ${path}: ${value}.`, {
            field: path, received: value, availability: unavailable.availability,
            hint: unavailable.reason
        }, 6);
    }
    if (schema.options && !schema.options.includes(value)) valueError(schema, value, path, JSON.stringify(schema.options));
    return value;
}

function parseLayer(raw, path) {
    if (typeof raw !== "string") throw new CoreError("INVALID_ENCODING", `Expected a native string at ${path}.`, { field: path, received: raw });
    try {
        return JSON.parse(raw);
    } catch {
        throw new CoreError("INVALID_ENCODING", `Invalid JSON encoding at ${path}.`, { field: path, received: raw });
    }
}

function decodeValue(schema, raw, path) {
    if (raw === undefined) return validateValue(schema, JSON.parse(JSON.stringify(schema.default)), path);
    let value;
    if (schema.type === "struct") {
        const encoded = parseLayer(raw, path);
        if (!encoded || typeof encoded !== "object" || Array.isArray(encoded)) valueError(schema, encoded, path);
        value = Object.fromEntries(schema.fields.map(field => [field.key,
            decodeValue(field, encoded[field.storageKey], `${path}/${field.key}`)]));
    } else if (schema.type === "array") {
        const encoded = parseLayer(raw, path);
        if (!Array.isArray(encoded)) valueError(schema, encoded, path);
        value = encoded.map((item, index) => decodeValue(schema.items, item, `${path}/${index}`));
    } else if (schema.type === "number") {
        if (typeof raw !== "string" || raw.trim() === "") valueError(schema, raw, path);
        value = Number(raw);
    } else if (schema.type === "boolean") {
        if (raw !== "true" && raw !== "false") valueError(schema, raw, path);
        value = raw === "true";
    } else {
        value = schema.encoding === "json" ? parseLayer(raw, path) : raw;
    }
    return validateValue(schema, value, path);
}

function encodeValue(schema, value, path, previous) {
    validateValue(schema, value, path);
    if (schema.type === "struct") {
        const encoded = previous === undefined ? {} : parseLayer(previous, path);
        for (const field of schema.fields) {
            encoded[field.storageKey] = encodeValue(field, value[field.key], `${path}/${field.key}`, encoded[field.storageKey]);
        }
        return JSON.stringify(encoded);
    }
    if (schema.type === "array") {
        const encoded = previous === undefined ? [] : parseLayer(previous, path);
        return JSON.stringify(value.map((item, index) => encodeValue(schema.items, item, `${path}/${index}`, encoded[index])));
    }
    return schema.encoding === "json" ? JSON.stringify(value) : String(value);
}

function parameterAt(parameters, path) {
    if (!path?.startsWith("/") || path === "/") throw new CoreError("INVALID_PATH", "Use a parameter path such as /Gold/GoldMax.", { field: path });
    const segments = path.slice(1).split("/");
    let schema = parameters.find(field => field.key === segments[0]);
    if (!schema) throw new CoreError("UNKNOWN_FIELD", `Unknown parameter ${path}.`, { field: path });
    const chain = [schema];
    for (const segment of segments.slice(1)) {
        schema = schema.type === "struct" ? schema.fields.find(field => field.key === segment) :
            schema.type === "array" && /^(0|[1-9]\d*)$/.test(segment) ? schema.items : undefined;
        if (!schema) throw new CoreError("UNKNOWN_FIELD", `Unknown parameter ${path}.`, { field: path });
        chain.push(schema);
    }
    return { chain, segments };
}

function decodeParameters(parameters, raw) {
    return Object.fromEntries(parameters.map(field => [field.key, decodeValue(field, raw[field.storageKey], `/${field.key}`)]));
}


function aniEncoding(message,field){throw new CoreError('ANI_CONFIG_ENCODING',message,{field});}
function aniJson(raw,path){
    try{return JSON.parse(raw);}catch{aniEncoding(`Invalid JSON at ${path}.`,path);}
}
function completeAniFields(fields,raw,path){
    if(!raw||typeof raw!=='object'||Array.isArray(raw))aniEncoding(`Expected parameter object at ${path}.`,path);
    const output={...raw};
    for(const field of fields){
        if(field.key==='CoretoConfigSource')continue;
        const key=field.storageKey,at=`${path}/${key}`;
        const value=Object.hasOwn(raw,key)?raw[key]:field.nativeDefault;
        if(typeof value!=='string')aniEncoding(`Expected native string at ${at}.`,at);
        if(value===''){output[key]=value;continue;}
        if(field.type==='struct')output[key]=JSON.stringify(completeAniFields(field.fields,aniJson(value,at),at));
        else if(field.type==='array'){
            const items=aniJson(value,at);
            if(!Array.isArray(items))aniEncoding(`Expected array at ${at}.`,at);
            if(field.items.type!=='struct'&&items.some(item=>typeof item!=='string'))aniEncoding(`Expected native string items at ${at}.`,at);
            output[key]=field.items.type==='struct'?JSON.stringify(items.map((item,index)=>{
                if(typeof item!=='string')aniEncoding(`Expected encoded struct at ${at}/${index}.`,at);
                return JSON.stringify(completeAniFields(field.items.fields,aniJson(item,`${at}/${index}`),`${at}/${index}`));
            })):value;
        }else{
            if(field.type==='number'&&!Number.isFinite(Number(value)))aniEncoding(`Expected finite number at ${at}.`,at);
            output[key]=value;
        }
    }
    return output;
}
function resolveAniSource(catalog,plugins){
    const {configuredSource, source} = resolvePluginConfiguration(catalog, plugins, {errorPrefix: 'ANI'});
    return {configuredSource,effectiveSource:source.name,materialized:configuredSource==='own',rawParameters:completeAniFields(catalog.parameters,source.parameters,source.name)};
}

// Native :eval fields use script completion values in a non-strict converter.
const convertAniNative = new Function(`return function convert(target,raw){
    for(const storageKey in raw){
        const match=storageKey.match(/(.*):(.*)/i);
        if(!match)continue;
        const name=match[1],type=match[2].toUpperCase().trim(),value=raw[storageKey];
        try{
            switch(type){
                case 'NUM':target[name]=value===''?0:Number(value);break;
                case 'STR':target[name]=String(value);break;
                case 'EVAL':target[name]=value===''?null:eval(value);break;
                case 'STRUCT':target[name]=convert.call(this,{},value===''?{}:JSON.parse(value));break;
                case 'ARRAYSTRUCT':target[name]=(value===''?[]:JSON.parse(value)).map(item=>convert.call(this,{},JSON.parse(item)));break;
                case 'ARRAYEVAL':target[name]=(value===''?[]:JSON.parse(value)).map(code=>eval(code));break;
                case 'ARRAYNUM':target[name]=(value===''?[]:JSON.parse(value)).map(Number);break;
                case 'ARRAYSTR':target[name]=(value===''?[]:JSON.parse(value)).map(String);break;
                case 'JSON':target[name]=value===''?'':JSON.parse(value);break;
                case 'ARRAYJSON':target[name]=(value===''?[]:JSON.parse(value)).map(item=>JSON.parse(item));break;
                case 'FUNC':target[name]=new Function(value===''?'return 0':JSON.parse(value));break;
                case 'ARRAYFUNC':target[name]=(value===''?[]:JSON.parse(value)).map(code=>new Function(JSON.parse(code)));break;
            }
        }catch(cause){
            const error=new Error('Cannot evaluate Ani parameter '+storageKey+'.',{cause});
            error.field=storageKey;throw error;
        }
    }
    return target;
}`)();
function convertAniParameters(raw,receiver){
    try{return convertAniNative.call(receiver,{},raw);}
    catch(cause){throw new CoreError('ANI_CONFIG_VALUE',cause.message,{field:cause.field,cause:cause.cause?.message});}
}

function installAniMessage(){
    const fail=(code,message)=>{throw new CoreError(code,message);};
    if(Utils.RPGMAKER_NAME!=='MZ'||Utils.RPGMAKER_VERSION!=='1.10.0')fail('ANI_ENGINE_VERSION','Use RPG Maker MZ 1.10.0.');
    const active=$plugins.filter(p=>p.status),providers=active.filter(p=>[catalog.pluginId,catalog.reference.pluginId].includes(p.name));
    if(providers.length!==1||providers[0].name!==catalog.pluginId||globalThis.Coreto?.AniMsgTextEffects)fail('ANI_DUPLICATE_PROVIDER','Enable exactly one Ani provider.');
    const own=providers[0];
    for(const [service,supported]of Object.entries({core:catalog.dependencies.cores,message:catalog.dependencies.messages})){
        const entries=active.filter(p=>Object.hasOwn(supported,p.name));
        if(entries.length!==1)fail('ANI_DEPENDENCY',`Enable exactly one ${service} provider.`);
        const entry=entries[0];
        if(active.indexOf(entry)>=active.indexOf(own))fail('ANI_PLUGIN_ORDER',`Place ${entry.name} before Ani.`);
        const versionMatches=entry.name==='Coreto_0_CoreEngine'?globalThis.Coreto?.CoreEngine?.version===supported[entry.name]:entry.description.includes(`[Version ${supported[entry.name]}]`);
        if(!versionMatches)fail('ANI_DEPENDENCY_VERSION',`Use ${entry.name} ${supported[entry.name]}.`);
    }
    if(!globalThis.VisuMZ?.MessageCore?.Settings||typeof Window_Message.prototype.preFlushTextState!=='function')fail('ANI_MESSAGE_API','Load a supported Message provider before Ani.');
    for(const [name,version]of Object.entries({...catalog.dependencies.before,...catalog.dependencies.integrations})){
        const entries=active.filter(p=>p.name===name);
        if(entries.length>1)fail('ANI_DEPENDENCY_DUPLICATE',`Duplicate ${name}.`);
        if(entries.length&&!entries[0].description.includes(`[Version ${version}]`))fail('ANI_DEPENDENCY_VERSION',`Use ${name} ${version}.`);
        if(entries.length&&Object.hasOwn(catalog.dependencies.before,name)&&active.indexOf(entries[0])>active.indexOf(own))fail('ANI_PLUGIN_ORDER',`Place ${name} before Ani.`);
    }
    if(active.some(p=>/^VisuMZ_3_/.test(p.name)&&active.indexOf(p)<active.indexOf(own)))fail('ANI_PLUGIN_ORDER','Place Ani before tier 3 consumers.');
    const filename=decodeURIComponent(document.currentScript.src.split('?')[0].split('/').pop());
    if(filename!==catalog.pluginId+'.js')fail('ANI_FILENAME',`Keep the filename ${catalog.pluginId}.js.`);
    const source=resolveAniSource(catalog,$plugins),settings=convertAniParameters(source.rawParameters,VisuMZ);
    const api={pluginId:catalog.pluginId,version:catalog.version,...source,settings};
    globalThis.Coreto??={};Coreto.AniMsgTextEffects=api;
    return api;
}
const aniApi=installAniMessage();

function aniWave(frame,index,offset=0,speed=0){
    return Math.cos((frame+offset*index)*speed);
}
function aniCycle(value,length){
    while(value>=length)value-=length;
    while(value<0)value+=length;
    return value;
}
function updateAniEffects(glyph){
    const data=glyph.effectData(),frame=Graphics.frameCount,index=glyph._offset;
    const horizontal=data.ShakeStrengthHorz??0,vertical=data.ShakeStrengthVert??0;
    if(horizontal!==0||vertical!==0){
        glyph.x+=Math.randomInt(horizontal+1)*(Math.random()<0.5?-1:1);
        glyph.y+=Math.randomInt(vertical+1)*(Math.random()<0.5?-1:1);
    }
    for(const axis of ['X','Y']){
        const distance=data['WaveDistance'+axis]??0,speed=data['WaveSpeed'+axis]??0;
        if(distance!==0&&speed!==0)glyph[axis.toLowerCase()]+=Math.round(aniWave(frame,index,data['WaveOffset'+axis],speed)*distance);
    }
    const arc=data.PendulumArc??0,pendulumSpeed=data.PendulumSpeed??0;
    const pendulum=arc!==0&&pendulumSpeed!==0?Math.round(aniWave(frame,index,data.PendulumOffset,pendulumSpeed)*arc):0;
    const rotationSpeed=data.RotationSpeed??0;
    if(rotationSpeed!==0){
        glyph._rotationAngle??=(data.RotationOffset??0)*index;
        glyph._rotationAngle-=rotationSpeed;
        while(glyph._rotationAngle>360)glyph._rotationAngle-=360;
        while(glyph._rotationAngle<0)glyph._rotationAngle+=360;
    }
    glyph.angle=pendulum+(glyph._rotationAngle??0);
    const base=Math.max(glyph._msgWindow.scale.x,glyph._msgWindow.scale.y);
    for(const axis of ['X','Y']){
        const flipSpeed=data['FlipSpeed'+axis]??0,pulseSpeed=data['PulseSpeed'+axis]??0,growth=(data['PulseGrowth'+axis]??0)/2;
        const flip=flipSpeed!==0?aniWave(frame,index,data['FlipOffset'+axis],flipSpeed):1;
        const pulse=growth!==0&&pulseSpeed!==0?1+aniWave(frame,index,data['PulseOffset'+axis],pulseSpeed)*growth:1;
        glyph.scale[axis.toLowerCase()]=base*flip*pulse;
    }
    let opacity=data.InitialOpacity??255;
    const pattern=(data.pattern??'').toLowerCase().trim();
    if(pattern!==''){
        const delay=Math.max(data.patternDelay??1,1);
        glyph._patternIndex??=(data.patternOffset??0)*index;
        glyph._patternIndex=aniCycle(glyph._patternIndex,pattern.length);
        opacity*=Math.max(0,Math.min(25,pattern.charCodeAt(glyph._patternIndex)-97))/25;
        if(frame%delay===0)glyph._patternIndex=aniCycle(glyph._patternIndex+1,pattern.length);
    }
    const glow=(data.glowRate??0)/2*255,glowSpeed=data.glowSpeed??0;
    if(glow!==0&&glowSpeed!==0)opacity+=Math.round(aniWave(frame,index,data.glowOffset,glowSpeed)*glow-glow);
    glyph.opacity=opacity;
    const hueShift=data.HueShift??0;
    if(hueShift!==0){
        glyph._hueValue??=(data.InitialHueOffset??0)*index;
        glyph._hueValue+=hueShift;
        // Ani 1.05 normalizes to the next turn; preserve its public Sprite hue value.
        while(glyph._hueValue>360)glyph._hueValue-=360;
        while(glyph._hueValue<360)glyph._hueValue+=360;
    }
    const tones=data.colorTones??[],delay=Math.max(data.toneDelay??1,1);
    if(tones.length){
        if(glyph._currentTone===undefined){
            glyph._toneIndex=aniCycle((data.InitialToneOffset??0)*index+Math.floor(frame/delay),tones.length);
            glyph._currentTone=tones[glyph._toneIndex].slice();
        }
        if(tones.length>1){
            if(frame%delay===0){
                glyph._toneIndex=aniCycle(glyph._toneIndex+1,tones.length);
                glyph._currentTone=tones[glyph._toneIndex].slice();
            }else if(data.SmoothToneChange){
                const remaining=delay-frame%delay,next=tones[aniCycle(glyph._toneIndex+1,tones.length)];
                for(let channel=0;channel<4;channel++)glyph._currentTone[channel]=(glyph._currentTone[channel]*(remaining-1)+next[channel])/remaining;
            }
        }
    }
    if(glyph._hueValue!==undefined)glyph.setHue(glyph._hueValue);
    if(glyph._currentTone!==undefined)glyph.setColorTone(glyph._currentTone);
}

ConfigManager.textEffects=true;
const aniMakeConfig=ConfigManager.makeData;
ConfigManager.makeData=function(){
    const data=aniMakeConfig.call(this);data.textEffects=this.textEffects;return data;
};
const aniApplyConfig=ConfigManager.applyData;
ConfigManager.applyData=function(data){
    aniApplyConfig.call(this,data);
    this.textEffects='textEffects' in data?data.textEffects:true;
};
TextManager.textEffects=aniApi.settings.Options.Name||'';
const aniGeneralOptions=Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions=function(){
    aniGeneralOptions.call(this);this.addTextEffectsCommands();
};
Window_Options.prototype.addTextEffectsCommands=function(){
    if(aniApi.settings.Options.AddOption)this.addTemplatetextEffectsCommand();
};
Window_Options.prototype.addTemplatetextEffectsCommand=function(){
    this.addCommand(TextManager.textEffects,'textEffects');
};

const aniEffects=Object.create(null);
for(const family of ['AngleEffects','ColorEffects','OpacityEffects','PositionEffects','ScaleEffects']){
    for(const effect of aniApi.settings[family]){
        const name=effect.Name.toLowerCase().trim();
        if(!name||name==='untitled')continue;
        aniEffects[name]??={};Object.assign(aniEffects[name],effect);
    }
}
function aniEffectData(selection){
    const result={};
    for(const name of selection.replace(/\x1b/gi,'').replace(/WrapBreak\[0\]/gi,'').split(',')){
        const effect=aniEffects[name.toLowerCase().trim()];
        if(effect)Object.assign(result,effect);
    }
    return result;
}
class AniTextGlyph extends Sprite{
    initialize(message,textState,index){
        this._msgWindow=message;this._textEffect=message._textEffect;
        this._textState=JSON.parse(JSON.stringify(textState));this._offset=index;
        super.initialize();
        const icon=textState.iconIndex!==undefined;
        this._textWidth=icon?(ImageManager.standardIconWidth||32)+4:message.textWidth(textState.buffer);
        this._textHeight=icon?(ImageManager.standardIconHeight||32)+4:textState.height;
        this.anchor.set(0.5,0.5);this._textEffectData=aniEffectData(this._textEffect);
        if(icon){
            this.bitmap=ImageManager.loadSystem('IconSet');
            const width=ImageManager.iconWidth,height=ImageManager.iconHeight;
            this.setFrame(textState.iconIndex%16*width,Math.floor(textState.iconIndex/16)*height,width,height);
        }else{
            const width=Math.ceil(this._textWidth*1.5),height=Math.ceil(this._textHeight*1.5);
            this.bitmap=new Bitmap(width,height);
            for(const key of ['fontFace','fontSize','fontBold','fontItalic','textColor','outLineColor','outlineWidth','paintOpacity'])this.bitmap[key]=message.contents[key];
            const color=this.effectData().ForcedColor;
            if(color!==undefined&&color!=='')this.bitmap.textColor=ColorManager.getColor(color);
            this.bitmap.drawText(textState.buffer,0,0,width,height,'center');
        }
        this.update();
    }
    effectData(){return this._textEffectData;}
    update(){
        super.update();
        const message=this._msgWindow;
        this.x=this._textState.x+message.x+message.padding+this._textWidth/2;
        this.y=this._textState.y+message.y+message.padding+this._textHeight/2;
        if(globalThis.Imported?.VisuMZ_2_ExtMessageFunc&&Window_ButtonConsole.POSITION==='top')this.y+=Window_ButtonConsole.BUTTON_HEIGHT||0;
        updateAniEffects(this);
    }
    destroy(options){
        if(this._destroyed)return;
        const bitmap=this._textState.iconIndex===undefined?this.bitmap:null;
        const filter=this._colorFilter;
        super.destroy(options);
        if(filter)filter.destroy();
        this._colorFilter=null;
        if(bitmap&&bitmap._baseTexture)bitmap.destroy();
        this._bitmap=null;
        this._msgWindow=null;
    }
}

function installAniDrawing(){
    const create=Scene_Message.prototype.createAllWindows;
    Scene_Message.prototype.createAllWindows=function(...args){
        const result=create.apply(this,args);this.createAniMsgTextEffectsContainer();return result;
    };
    Scene_Message.prototype.createAniMsgTextEffectsContainer=function(){
        this._AniMsgTextEffectsContainer=new Sprite();this.addWindow(this._AniMsgTextEffectsContainer);
        this._messageWindow.setTextEffectContainer(this._AniMsgTextEffectsContainer);
    };
    const init=Window_Message.prototype.initMembers;
    Window_Message.prototype.initMembers=function(...args){const result=init.apply(this,args);this._textEffect='';return result;};
    Window_Message.prototype.setTextEffectContainer=function(container){this._AniMsgTextEffectsContainer=container;};
    const convert=Window_Base.prototype.preConvertEscapeCharacters;
    Window_Base.prototype.preConvertEscapeCharacters=function(text){return this.convertTextEffectEscapeCodes(convert.call(this,text));};
    Window_Base.prototype.convertTextEffectEscapeCodes=function(text){return text.replace(/\x1bEFFECT<(.*?)>/gi,'').replace(/<CLEAR EFFECT(?:|S)>/gi,'');};
    Window_Message.prototype.convertTextEffectEscapeCodes=function(text){return text.replace(/<CLEAR EFFECT(?:|S)>/gi,'\x1bCLEAREFFECT[0]');};
    const escape=Window_Message.prototype.processEscapeCharacter;
    Window_Message.prototype.processEscapeCharacter=function(code,state){
        if(code==='EFFECT'){
            const value=this.obtainEscapeString(state);
            if(state.drawing&&ConfigManager.textEffects){
                this._textEffect=value.replace(/\x1bC\[(.*?)\]/gi,'').replace(/\x1bPREVCOLOR\[(.*?)\]/gi,'').toLowerCase().trim();
                if(this._textEffect==='normal')this._textEffect='';
            }
        }else if(code==='CLEAREFFECT'){
            this.obtainEscapeParam(state);if(state.drawing)this._textEffect='';
        }else return escape.call(this,code,state);
    };
    const preFlush=Window_Message.prototype.preFlushTextState,postFlush=Window_Message.prototype.postFlushTextState;
    Window_Message.prototype.preFlushTextState=function(state){
        preFlush.call(this,state);
        if(this._textEffect!==''&&state.drawing){
            this.processTextEffectCharacter(state);this._textEffectReturnState=true;
            if(globalThis.Imported?.VisuMZ_3_MessageSounds)this.playMessageSound(state);
            state.drawing=false;
        }
    };
    Window_Message.prototype.postFlushTextState=function(state){
        postFlush.call(this,state);
        if(this._textEffectReturnState!==undefined){
            state.drawing=true;this._textEffectReturnState=undefined;
            if(globalThis.Imported?.VisuMZ_2_ExtMessageFunc)this.moveCustomMessageCursorPauseSign(state);
        }
    };
    Window_Message.prototype.processTextEffectCharacter=function(state){
        const container=this._AniMsgTextEffectsContainer;if(!container)return;
        const glyphState=JSON.parse(JSON.stringify(state));
        for(const letter of state.buffer.split('')){
            glyphState.buffer=letter;
            if(letter.trim()!=='')container.addChild(new AniTextGlyph(this,glyphState,container.children.length));
            glyphState.x+=this.textWidth(letter);
        }
    };
    const icon=Window_Base.prototype.processDrawIcon;
    Window_Base.prototype.processDrawIcon=function(index,state){
        if(this instanceof Window_Message&&state.drawing&&this._textEffect!=='')this.processDrawIconTextEffect(index,state);
        else return icon.call(this,index,state);
    };
    Window_Base.prototype.processDrawIconTextEffect=function(index,state){
        const container=this._AniMsgTextEffectsContainer,glyphState=JSON.parse(JSON.stringify(state));glyphState.iconIndex=index;
        container.addChild(new AniTextGlyph(this,glyphState,container.children.length));state.x+=(ImageManager.standardIconWidth||32)+4;
    };
    const page=Window_Message.prototype.newPage;
    Window_Message.prototype.newPage=function(...args){const result=page.apply(this,args);this._textEffect='';this.clearTextEffects();return result;};
    Window_Message.prototype.clearTextEffects=function(){
        const container=this._AniMsgTextEffectsContainer;if(!container)return;
        for(const glyph of [...container.children]){container.removeChild(glyph);glyph.destroy();}
    };
    for(const [method,visible]of [['open',true],['close',false]]){
        const original=Window_Message.prototype[method];
        Window_Message.prototype[method]=function(...args){const result=original.apply(this,args);if(this._AniMsgTextEffectsContainer)this._AniMsgTextEffectsContainer.visible=visible;return result;};
    }
    const destroy=Window_Message.prototype.destroy;
    Window_Message.prototype.destroy=function(...args){this.clearTextEffects();return destroy.apply(this,args);};
    if(typeof ColorManager.getColor!=='function')ColorManager.getColor=function(value){return isNaN(value)?value:this.textColor(Number(value));};
    VisuMZ.AniMsgTextEffects={version:1.05,Settings:aniApi.settings,Effects:aniEffects};
    globalThis.Imported??={};Imported.Coreto_2_AniMsgTextEffects=true;Imported.VisuMZ_2_AniMsgTextEffects=true;
}
installAniDrawing();

})();
