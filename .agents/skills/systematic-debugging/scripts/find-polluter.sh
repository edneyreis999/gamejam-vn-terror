#!/usr/bin/env bash
# Run selected tests sequentially to locate newly created filesystem state.
# Usage: find-polluter.sh <target> <find-path-pattern> -- <command> [args...]
# Each matched test path is appended as one argument to the supplied command.
# Exit: 0 clean selected run, 1 contamination found, 2 incomplete/invalid run.
set -euo pipefail

if (( $# < 4 )) || [[ "$3" != -- ]]; then
  printf '%s\n' 'Usage: find-polluter.sh <target> <find-path-pattern> -- <command> [args...]' >&2
  exit 2
fi
pollution_target=$1
test_pattern=$2
shift 3

exists() { [[ -e "$pollution_target" || -L "$pollution_target" ]]; }
if exists; then
  printf 'Contamination already exists: %s; use a clean disposable workspace.\n' "$pollution_target" >&2
  exit 2
fi

# Materialize discovery so a failed find cannot be mistaken for an empty run.
test_list=$(mktemp)
trap 'rm -f "$test_list"' EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
if ! find . -type f -path "$test_pattern" -print0 > "$test_list"; then
  printf '%s\n' 'Test discovery failed; no clean verdict.' >&2
  exit 2
fi
if [[ ! -s "$test_list" ]]; then
  printf 'No tests matched: %s; no clean verdict.\n' "$test_pattern" >&2
  exit 2
fi

count=0
while IFS= read -r -d '' test_file; do
  if exists; then
    printf 'Contamination appeared between tests: %s; attribution is unknown.\n' "$pollution_target" >&2
    exit 2
  fi
  count=$((count + 1))
  printf '[%d] Running %s\n' "$count" "$test_file"
  test_status=0
  "$@" "$test_file" || test_status=$?
  if exists; then
    printf 'Contamination observed after %s (command exit %d): %s\n' "$test_file" "$test_status" "$pollution_target"
    exit 1
  fi
  if (( test_status != 0 )); then
    printf 'Command failed for %s (exit %d); investigation incomplete.\n' "$test_file" "$test_status" >&2
    exit 2
  fi
done < "$test_list"
printf 'No contamination observed across %d successful commands; coverage is limited to this selection and order.\n' "$count"
