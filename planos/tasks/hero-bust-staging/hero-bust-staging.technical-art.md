---
status: authorized
---

# Seven-hero visual adaptation

Preserve the accepted Gorvak style without applying 50% to differently sized PNGs: several are 3840 pixels tall and would lose the head. The target visible alpha top is Gorvak's 166.7px. Use `scale = (725 - 166.7) / (0.6 × imageHeight - alphaTop) × 100`, rounded to two decimals. The listener uses 90% of that value. Y is fixed per artwork in both states; focus never recomputes it. Elowen and Vaelith use a larger scale and lower fixed pivot to account for the unusually large transparent margin below their silhouettes. Their visible silhouette height is approximately Gorvak’s 934.5px, with the same 166.7px speaking top. Retain each hero's existing X placement. This is authoring calibration only; the game receives literal values.

| Map | Hero | PNG height / alpha top | X / fixed Y | Speaking % | Listening % |
| --- | --- | --- | --- | --- | --- |
| 038 | Elowen | 3840 / 564 | 250 / 862.7 | 40 | 36 |
| 039 | Griznik | 2147 / 60 | 320 / 725 | 45.46 | 40.91 |
| 040 | Seraphina | 3840 / 752 | 355 / 725 | 35.97 | 32.37 |
| 041 | Bimbren | 2354 / 88 | 345 / 725 | 54 | 48.6 |
| 042 | Liora | 2397 / 132 | 342 / 725 | 42.74 | 38.47 |
| 043 | Vaelith | 3840 / 495 | 395 / 948.91 | 43.24 | 38.92 |
| 044 | Draska | 2136 / 78 | 280 / 725 | 46.39 | 41.75 |

The alpha formula supplies the initial calibration. Real Chrome inspection required Bimbren at 54%/48.6%: his tall staff, rather than his head, defines the alpha top. The larger scale raises his face above the dialogue window with the staff top still below the scene’s upper edge (alpha top 9.824px speaking / 81.342px listening). Elowen and Vaelith were also enlarged after visual inspection to remove the near-full-body framing caused by transparent canvas margins. The remaining four retain the initial calculated values. All PNGs remain unchanged. The normal entry/focus interval remains 20 frames, listener tone [-24,-24,-24,0], speaker tone [0,0,0,0]. Ivaí remains at X=960/Y=725, scale50/45, entering from X=1544 without mirroring. Preserve the reduced-motion paths and native cleanup. Numerical framing checks do not substitute for visual inspection of faces and props.
