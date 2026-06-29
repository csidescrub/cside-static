#!/usr/bin/env bash
set -euo pipefail

# Simple deploy helper — uses npx so no global install required
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

echo "Logging into Cloudflare (if required)..."
npx wrangler@latest login || true

echo "Deploying assets from ./public to Cloudflare Workers..."
npx wrangler@latest deploy --assets ./public --name cside-static

echo "Deploy finished."
