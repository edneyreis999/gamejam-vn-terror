# Video recording

Commands assume the uniquely named session established in [session management](session-management.md). Check installed command help before using optional recording or annotation features.

## Record a reproduction

```bash
# Start with the owned browser open, before navigating to the relevant state.
playwright-cli open
playwright-cli video-start reproduction.webm
playwright-cli goto http://localhost:4173
# Walk the authorized reproduction using current observed targets.
playwright-cli video-stop
playwright-cli close
```

Use an owned output destination and retain failed attempts. Stop/export recording before closing the session, and still attempt browser cleanup if recording fails. Inspect the resulting video for the claimed behavior; file creation is not a verdict. Do not assume video records audio or every rendered frame without checking the capture capability.

## Demonstration annotations

For a requested presentation, supported versions can decorate actions and add chapter cards:

```bash
playwright-cli video-start demonstration.webm --cursor --fps=60
playwright-cli video-chapter "Settings" --description="Changing music volume" --duration=2000
playwright-cli video-show-actions --duration=600 --position=top-right --highlight-style="outline: 2px solid #333"
# Perform the demonstration.
playwright-cli video-hide-actions
playwright-cli video-stop
```

Cursor animation and callouts may pace actions; chapter cards and overlays alter the image and elapsed time. Label the result as a demonstration. Do not use these decorations or inserted pauses to claim natural input cadence, performance, or unchanged presentation. Pointer-events behavior does not eliminate their visual impact.

A reusable demonstration script can use `run-code --filename=...`; read [running code](running-code.md). Check version support before using optional `page.screencast` APIs; CLI extensions are not guaranteed to exist on the project's test-runner Page. Such a script is not an extra E2E runner.

## Retain and return

Return the local recording path with its purpose and observation limits. Publishing a recording or posting to a PR requires the caller's explicit publication scope; recording does not authorize it. Preserve the unannotated failure capture separately from a later demonstration.

For action/network diagnosis, use [tracing](tracing.md). Capture settings add overhead and must remain comparable during a measured investigation.
