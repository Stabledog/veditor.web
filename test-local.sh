#!/usr/bin/env bash
# Run the veditor demo locally for manual testing.
# Fails loudly if prerequisites are missing.
set -euo pipefail

cd "$(dirname "$0")"

# --- Prerequisites ---
command -v node >/dev/null 2>&1 || { echo "ERROR: node is not installed." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "ERROR: npm is not installed." >&2; exit 1; }

if [ ! -d node_modules ]; then
    echo "ERROR: node_modules not found. Run 'npm install' first." >&2
    exit 1
fi

# --- Build ---
echo "Building veditor..."
npm run build || { echo "ERROR: Build failed." >&2; exit 1; }

# --- Serve demo ---
echo ""
echo "Starting demo at http://localhost:5174/"
echo "Press Ctrl+C to stop."
npx vite --port 5174 demo/
