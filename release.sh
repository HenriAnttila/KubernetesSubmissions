#!/usr/bin/env bash
# i have to automate everything
set -euo pipefail

read -rp "Exercise: " task
[[ -z "$task" ]] && {
  echo "No exercise given." >&2
  exit 1
}

git fetch -q origin main
if [[ "$(git rev-parse main)" != "$(git rev-parse origin/main)" ]]; then
  echo "Warning: local main differs from origin/main; the release will use origin/main."
fi

repo=$(git remote get-url origin | sed -E 's#^(git@github\.com:|https://github\.com/)##; s#\.git$##')

gh release create "$task" --repo "$repo" --target main --title "$task" --notes ""
