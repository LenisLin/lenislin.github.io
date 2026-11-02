#!/usr/bin/env bash
# Preview the English-first Jekyll site using project-local dependencies.
# Run from any directory; writes _site and listens only on 127.0.0.1:4000.
set -euo pipefail
cd -- "$(dirname -- "$0")"
export GEM_HOME="$PWD/.bundle/tools"
export GEM_PATH="$GEM_HOME"
export BUNDLE_PATH="$PWD/vendor/bundle"
exec "$GEM_HOME/bin/bundle" exec jekyll serve --host 127.0.0.1 --port 4000 --config _config.yml,_config.local.yml "$@"
