#!/usr/bin/env bash
# ==============================================================================
# Titanite Research — Bi-Weekly Automated Research Batch Updater
# ==============================================================================
# Runs titanite batch-update for active batch tickers and exports JSON payloads
# to public/research-data/ for the Next.js web application.
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "${SCRIPT_DIR}")"
APP_DIR="${REPO_ROOT}/Titanite-Research/titanite-app"
LOG_DIR="${SCRIPT_DIR}/logs"
LOG_FILE="${LOG_DIR}/biweekly_update.log"

mkdir -p "${LOG_DIR}"

echo "======================================================================" >> "${LOG_FILE}"
echo "[$(date -u +'%Y-%m-%dT%H:%M:%SZ')] Starting Bi-Weekly Research Update" >> "${LOG_FILE}"
echo "======================================================================" >> "${LOG_FILE}"

cd "${APP_DIR}"

if [ -f ".venv/bin/activate" ]; then
    # shellcheck disable=SC1091
    source .venv/bin/activate
else
    echo "[ERROR] Virtualenv not found at ${APP_DIR}/.venv" | tee -a "${LOG_FILE}"
    exit 1
fi

# Run Titanite batch update CLI command
python -m titanite batch-update 2>&1 | tee -a "${LOG_FILE}"

echo "[$(date -u +'%Y-%m-%dT%H:%M:%SZ')] Bi-Weekly Research Update Complete" >> "${LOG_FILE}"
