#!/usr/bin/env node
// Entry point shares the exact CLI parser/validation/transaction implementation.
process.argv.splice(2,0,'preset','apply');
await import('./cli.mjs');
