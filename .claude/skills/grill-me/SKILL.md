---
name: grill-me
description: Start an adaptive interview to sharpen a plan, idea, or decision when the user requests grilling. Delegates the interview to grilling; does not implement the outcome or create documents automatically.
disable-model-invocation: true
---

# Grill Me

Load `grilling` using the host's skill-loading mechanism and give it the user's subject, scope, and already settled answers. If no skill-loading tool is available, read the installed [grilling entrypoint](../grilling/SKILL.md) directly. If it is missing, report that dependency instead of pretending to have loaded it.

Follow its interview procedure and return the shared understanding in the conversation. The request authorizes the interview, not implementation or automatic document creation.
