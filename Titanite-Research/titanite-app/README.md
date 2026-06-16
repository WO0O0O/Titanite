# Titanite App

Automated AI Infrastructure Research Pipeline — Python backend for the Titanite Research framework.

## Setup

```bash
cd titanite-app

# With uv (recommended — fast, modern):
uv sync

# Or with pip:
pip install -e ".[dev]"
```

## Usage

```bash
# Extract financial data for a ticker (SC-AI-INFRA framework):
titanite extract --ticker MRLN --framework sc

# Show the extraction buffer for a ticker:
titanite show --ticker MRLN

# List all researched companies sorted by score:
titanite list --tier 1

# Audit portfolio concentration limits:
titanite portfolio audit
```

## Project Structure

```
titanite-app/
├── pyproject.toml          # Dependencies & build config
├── src/
│   └── titanite/
│       ├── cli.py          # Typer CLI entrypoint
│       ├── config.py       # Paths, settings, framework version
│       ├── models/         # Pydantic data models
│       ├── extractors/     # Data fetching (SEC EDGAR, transcripts)
│       ├── scorers/        # Framework scoring logic
│       └── outputs/        # File writers (.md output)
└── tests/                  # Pytest test suite
```
