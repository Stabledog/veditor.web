#!/usr/bin/env bash
# Build veditor and deploy dist/ to the gh-pages branch.
# Fails loudly if prerequisites are missing.
set -euo pipefail

cd "$(dirname "$0")"

# --- Prerequisites ---
command -v node >/dev/null 2>&1 || { echo "ERROR: node is not installed." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "ERROR: npm is not installed." >&2; exit 1; }
command -v git >/dev/null 2>&1 || { echo "ERROR: git is not installed." >&2; exit 1; }

if [ ! -d node_modules ]; then
    echo "ERROR: node_modules not found. Run 'npm install' first." >&2
    exit 1
fi

# Verify we have a git remote
git remote get-url origin >/dev/null 2>&1 || {
    echo "ERROR: No git remote 'origin' configured." >&2
    exit 1
}

# Verify working tree is clean (don't deploy uncommitted changes)
if [ -n "$(git status --porcelain)" ]; then
    echo "ERROR: Working tree is not clean. Commit or stash changes first." >&2
    git status --short >&2
    exit 1
fi

# --- Build ---
echo "Building veditor..."
npm run build || { echo "ERROR: Build failed." >&2; exit 1; }

echo ""
echo "Build output:"
ls -lh dist/veditor.*

# --- Deploy ---
echo ""
echo "Deploying dist/ to gh-pages branch..."
npx gh-pages -d dist || { echo "ERROR: Deploy failed." >&2; exit 1; }

echo ""
echo "Deployed successfully."
remote_url=$(git remote get-url origin)
echo "Remote: ${remote_url}"
