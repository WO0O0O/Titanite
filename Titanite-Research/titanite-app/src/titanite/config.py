"""
Central configuration for the Titanite research pipeline.

All file paths are computed relative to the repository root so the tool
works regardless of where it is invoked from. API keys are read from
environment variables (or a .env file) — never hardcoded.
"""
from __future__ import annotations

import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

# ---------------------------------------------------------------------------
# Repository root resolution
# ---------------------------------------------------------------------------
# config.py is at: titanite-app/src/titanite/config.py
# parent 1: titanite-app/src/titanite/
# parent 2: titanite-app/src/
# parent 3: titanite-app/
# parent 4: titanite/  ← repo root
_CONFIG_FILE = Path(__file__).resolve()
REPO_ROOT = _CONFIG_FILE.parent.parent.parent.parent  # titanite/

# ---------------------------------------------------------------------------
# Research notes paths
# ---------------------------------------------------------------------------
RESEARCH_NOTES_DIR = REPO_ROOT / "notes"
SC_AI_INFRA_DIR = RESEARCH_NOTES_DIR / "SMALLCAP-AI-INFRA"
SITUATIONAL_AWARENESS_DIR = RESEARCH_NOTES_DIR / "SITUATIONAL-AWARENESS"
SPACE_DIR = RESEARCH_NOTES_DIR / "SPACE"
PROMPTS_DIR = RESEARCH_NOTES_DIR / "prompts"

# ---------------------------------------------------------------------------
# Docs paths
# ---------------------------------------------------------------------------
DOCS_DIR = REPO_ROOT / "docs"
TABLE_MD = DOCS_DIR / "TABLE.md"
CATALYST_TRACKER_MD = DOCS_DIR / "CATALYST-TRACKER.md"
TITANITE_HOLDINGS_MD = DOCS_DIR / "TITANITE-HOLDINGS.md"
PORTFOLIO_CONSTRUCTION_MD = DOCS_DIR / "PORTFOLIO-CONSTRUCTION.md"

# ---------------------------------------------------------------------------
# Framework version — must match CHANGELOG.md
# ---------------------------------------------------------------------------
FRAMEWORK_VERSION = "v2.0.0"

# ---------------------------------------------------------------------------
# Industry folder mapping
# Maps ticker → subfolder under SC_AI_INFRA_DIR
# Populated from TABLE.md; can be overridden via CLI flag
# ---------------------------------------------------------------------------
INDUSTRY_MAP: dict[str, str] = {
    "PENG": "AI-CLOUD-INFRA",
    "SKM": "AI-CLOUD-INFRA",
    "BRUN": "AI-CLOUD-INFRA",
    "DGXX": "AI-CLOUD-INFRA",
    "NBIS": "AI-CLOUD-INFRA",
    "KEEL": "AI-CLOUD-INFRA",
    "TLN": "ENERGY",
    "NRGV": "ENERGY",
    "BE": "ENERGY",
    "VST": "ENERGY",
    "CEG": "ENERGY",
    "OKLO": "ENERGY",
    "ASPI": "ENERGY",
    "USAC": "ENERGY",
    "LEU": "ENERGY",
    "FLNC": "ENERGY",
    "LTBR": "ENERGY",
    "FCEL": "ENERGY",
    "NNE": "ENERGY",
    "TE": "ENERGY",
    "AAOI": "photonics",
    "IQE": "photonics",
    "MRVL": "photonics",
    "SIVE": "photonics",
    "AXTI": "photonics",
    "SOITEC": "photonics",
    "MXL": "photonics",
    "ALMU": "photonics",
    "ENAFF": "photonics",
    "POET": "photonics",
    "KOPN": "photonics",
    "LASE": "photonics",
    "3363.TW": "photonics",
    "6451.TW": "photonics",
    "ACCON": "robotics",
    "GAPW": "robotics",
    "OUST": "robotics",
    "MRLN": "robotics",
    "SHT": "Semis",
    "TRT": "Semis",
    "ALBKK": "Semis",
    "XFAB": "Semis",
    "GCTS": "Semis",
    "4078.T": "MLCC",
    "AL2SI": "server-systems",
    "SILC": "server-systems",
    "SEYE": "computer-vision",
    "SEE": "computer-vision",
    "AMPG": "quantum",
    "INFQ": "quantum",
    "XNDU": "quantum",
    "ONDS": "defence",
    "EOS": "directed-energy",
    "LPK": "TGV",
    "P4O": "TGV",
    "TPEG": "3D-metrology",
    "ADTN": "broadband",
    "HLIT": "broadband",
    "NCI": "MLCC",
    "PDC": "MLCC",
    "KAORI": "2-phase-cooling",
    "RBRK": "cyber-security",
    "DLO": "fintech",
    "VRT": "thermal",
    "SHMD": "advanced-packaging-equip",
    "SPCX": "SPACE",
}

# ---------------------------------------------------------------------------
# SEC EDGAR API
# ---------------------------------------------------------------------------
SEC_EDGAR_BASE_URL = "https://data.sec.gov"
SEC_EDGAR_HEADERS = {
    # SEC requires a User-Agent identifying the requester
    "User-Agent": os.getenv(
        "SEC_EDGAR_USER_AGENT",
        "TitaniteResearch research@titanite.local"
    ),
    "Accept-Encoding": "gzip, deflate",
}

# ---------------------------------------------------------------------------
# LLM API (Phase 3 — optional)
# ---------------------------------------------------------------------------
ANTHROPIC_API_KEY: str | None = os.getenv("ANTHROPIC_API_KEY")
OPENAI_API_KEY: str | None = os.getenv("OPENAI_API_KEY")

# Which LLM to use for pre-drafting: "anthropic" | "openai" | "none"
LLM_PROVIDER: str = os.getenv("TITANITE_LLM_PROVIDER", "none")
LLM_MODEL: str = os.getenv("TITANITE_LLM_MODEL", "claude-opus-4-5")


def get_industry_dir(ticker: str, industry_override: str | None = None) -> Path:
    """
    Resolve the SMALLCAP-AI-INFRA subfolder for a given ticker.

    Args:
        ticker: Company ticker symbol (case-insensitive lookup).
        industry_override: If provided, uses this folder name instead of the map.

    Returns:
        Path to the industry subfolder.

    Raises:
        ValueError: If ticker is not in INDUSTRY_MAP and no override is provided.
    """
    if industry_override:
        return SC_AI_INFRA_DIR / industry_override

    folder = INDUSTRY_MAP.get(ticker.upper())
    if not folder:
        raise ValueError(
            f"Ticker '{ticker}' not found in INDUSTRY_MAP. "
            f"Run with --industry <folder> to specify manually, "
            f"or add it to config.py INDUSTRY_MAP."
        )
    return SC_AI_INFRA_DIR / folder


def get_buffer_path(ticker: str, industry_override: str | None = None) -> Path:
    """Returns the expected path for a ticker's extraction buffer file."""
    industry_dir = get_industry_dir(ticker, industry_override)
    return industry_dir / f"{ticker.upper()}-EXTRACTION-BUFFER.md"


def get_report_path(ticker: str, industry_override: str | None = None) -> Path:
    """Returns the expected path for a ticker's research report file."""
    industry_dir = get_industry_dir(ticker, industry_override)
    return industry_dir / f"{ticker.upper()}-RESEARCH-REPORT.md"
