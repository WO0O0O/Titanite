"""
Titanite Research CLI.

Usage:
    titanite extract --ticker MRLN --framework sc
    titanite show --ticker MRLN
    titanite list --tier 1
    titanite validate --ticker MRLN
    titanite export --output ../../public/research-data/
"""
from __future__ import annotations

import sys
from datetime import date
from pathlib import Path
from typing import Annotated, Optional

import typer
from rich.console import Console
from rich.panel import Panel
from rich.progress import Progress, SpinnerColumn, TextColumn
from rich.table import Table
from rich import box

from titanite import config
from titanite.models.extraction_buffer import ExtractionBuffer, OperationalFlags

app = typer.Typer(
    name="titanite",
    help="Titanite Research — Automated AI Infrastructure Research Pipeline",
    rich_markup_mode="rich",
    no_args_is_help=True,
)
console = Console()

# ---------------------------------------------------------------------------
# Shared options
# ---------------------------------------------------------------------------
TickerArg = Annotated[str, typer.Option("--ticker", "-t", help="Company ticker symbol")]
IndustryOpt = Annotated[
    Optional[str],
    typer.Option("--industry", "-i", help="Industry subfolder override (e.g. 'photonics')"),
]


# ---------------------------------------------------------------------------
# extract
# ---------------------------------------------------------------------------
@app.command()
def extract(
    ticker: TickerArg,
    framework: Annotated[
        str,
        typer.Option("--framework", "-f", help="Framework: sc | leopold | space"),
    ] = "sc",
    industry: IndustryOpt = None,
    dry_run: Annotated[
        bool,
        typer.Option("--dry-run", help="Print the buffer to stdout instead of writing to disk"),
    ] = False,
) -> None:
    """
    [bold]Extract financial data for a ticker from SEC EDGAR.[/bold]

    Pulls the last 3 quarters of revenue, AR, contract assets, and inventory.
    Calculates DSO, receivables growth, and contract asset ratios.
    Writes the result to the correct RESEARCH-NOTES subfolder.
    """
    if framework != "sc":
        console.print(
            f"[yellow]Warning:[/yellow] Only the 'sc' (SC-AI-INFRA) framework is "
            f"currently automated. Leopold and Space-Infra support coming soon."
        )
        raise typer.Exit(1)

    console.print(
        Panel.fit(
            f"[bold cyan]Titanite Extract[/bold cyan] — [bold]{ticker.upper()}[/bold] "
            f"([dim]{framework.upper()} framework[/dim])",
            border_style="cyan",
        )
    )

    try:
        output_path = config.get_buffer_path(ticker, industry)
    except ValueError as e:
        console.print(f"[red]Error:[/red] {e}")
        raise typer.Exit(1) from e

    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console,
    ) as progress:
        task = progress.add_task("Fetching SEC EDGAR XBRL data…", total=None)

        try:
            from titanite.extractors.sec_edgar import extract_financials_sync
            wc_metrics, calc_ratios = extract_financials_sync(ticker)
        except ValueError as e:
            progress.stop()
            console.print(f"[red]SEC EDGAR error:[/red] {e}")
            raise typer.Exit(1) from e
        except Exception as e:
            progress.stop()
            console.print(f"[red]Unexpected error:[/red] {e}")
            raise typer.Exit(1) from e

        progress.update(task, description="Building extraction buffer…")

        buffer = ExtractionBuffer(
            ticker=ticker.upper(),
            audit_completed_at=date.today().isoformat(),
            working_capital_metrics=wc_metrics,
            calculated_ratios=calc_ratios,
            operational_flags=OperationalFlags(),
        )

        progress.update(task, description="Writing buffer file…")

        if dry_run:
            progress.stop()
            import json
            console.print_json(json.dumps(buffer.model_dump(mode="json"), indent=2))
            return

        from titanite.outputs.buffer_writer import write_extraction_buffer
        write_extraction_buffer(buffer, output_path)
        progress.stop()

    console.print(f"\n[green]✓[/green] Extraction buffer written to:")
    console.print(f"  [dim]{output_path}[/dim]")

    # Summary table
    _print_buffer_summary(buffer)

    console.print(
        "\n[yellow]Next steps:[/yellow]\n"
        "  1. Open the buffer file and complete [bold]Step B[/bold] (manual web searches)\n"
        "  2. Set backlog figures from earnings transcripts\n"
        "  3. Review and confirm [bold]operational_flags[/bold]\n"
        "  4. Run [bold]titanite score --ticker {ticker.upper()}[/bold] for Turn 2 scoring"
    )


# ---------------------------------------------------------------------------
# show
# ---------------------------------------------------------------------------
@app.command()
def show(
    ticker: TickerArg,
    industry: IndustryOpt = None,
) -> None:
    """
    [bold]Display the extraction buffer for a ticker.[/bold]

    Reads the existing EXTRACTION-BUFFER.md file and shows a formatted summary.
    """
    try:
        buffer_path = config.get_buffer_path(ticker, industry)
    except ValueError as e:
        console.print(f"[red]Error:[/red] {e}")
        raise typer.Exit(1) from e

    if not buffer_path.exists():
        console.print(
            f"[red]Error:[/red] No extraction buffer found for {ticker.upper()}.\n"
            f"Expected: [dim]{buffer_path}[/dim]\n"
            f"Run: [bold]titanite extract --ticker {ticker.upper()}[/bold]"
        )
        raise typer.Exit(1)

    from titanite.outputs.buffer_writer import read_extraction_buffer
    try:
        buffer = read_extraction_buffer(buffer_path)
    except Exception as e:
        console.print(f"[red]Error parsing buffer:[/red] {e}")
        raise typer.Exit(1) from e

    console.print(
        Panel.fit(
            f"[bold cyan]Extraction Buffer[/bold cyan] — [bold]{ticker.upper()}[/bold] "
            f"([dim]{buffer.audit_completed_at}[/dim])",
            border_style="cyan",
        )
    )
    _print_buffer_summary(buffer)


# ---------------------------------------------------------------------------
# validate
# ---------------------------------------------------------------------------
@app.command()
def validate(
    ticker: TickerArg,
    industry: IndustryOpt = None,
) -> None:
    """
    [bold]Validate an existing extraction buffer against the v2.0.0 schema.[/bold]

    Useful for checking manually-edited buffers haven't broken the schema.
    """
    try:
        buffer_path = config.get_buffer_path(ticker, industry)
    except ValueError as e:
        console.print(f"[red]Error:[/red] {e}")
        raise typer.Exit(1) from e

    if not buffer_path.exists():
        console.print(f"[red]Error:[/red] Buffer not found at {buffer_path}")
        raise typer.Exit(1)

    from titanite.outputs.buffer_writer import read_extraction_buffer
    try:
        buffer = read_extraction_buffer(buffer_path)
        console.print(
            f"[green]✓[/green] [bold]{ticker.upper()}[/bold] buffer is valid "
            f"(framework v2.0.0 schema). Audit date: {buffer.audit_completed_at}"
        )
    except Exception as e:
        console.print(f"[red]✗ Validation failed:[/red] {e}")
        raise typer.Exit(1) from e


# ---------------------------------------------------------------------------
# list
# ---------------------------------------------------------------------------
@app.command(name="list")
def list_companies(
    tier: Annotated[
        Optional[int],
        typer.Option("--tier", help="Filter by tier (1, 2, or 3)"),
    ] = None,
) -> None:
    """
    [bold]List all researched companies from TABLE.md.[/bold]

    Parsed directly from the docs/TABLE.md master index.
    """
    from titanite.parsers.table_parser import parse_table_md
    try:
        companies = parse_table_md(config.TABLE_MD)
    except Exception as e:
        console.print(f"[red]Error reading TABLE.md:[/red] {e}")
        raise typer.Exit(1) from e

    if tier is not None:
        tier_map = {1: "Tier 1", 2: "Tier 2", 3: "Tier 3"}
        tier_str = tier_map.get(tier)
        if tier_str:
            companies = [c for c in companies if c.tier.value == tier_str]

    table = Table(
        title=f"Titanite Research Universe {'(Tier ' + str(tier) + ')' if tier else '(All)'}",
        box=box.ROUNDED,
        show_header=True,
        header_style="bold cyan",
    )
    table.add_column("Ticker", style="bold", width=10)
    table.add_column("Company", width=35)
    table.add_column("Score", justify="center", width=8)
    table.add_column("Tier", justify="center", width=10)
    table.add_column("Sector", width=20)

    tier_colours = {
        "Tier 1": "green",
        "Tier 2": "yellow",
        "Tier 3": "red",
        "Pass": "dim",
        "Disqualified": "red",
    }

    for company in sorted(companies, key=lambda c: c.score, reverse=True):
        colour = tier_colours.get(company.tier.value, "white")
        table.add_row(
            company.ticker,
            company.company_name[:34],
            f"{company.score:.1f}/13",
            f"[{colour}]{company.tier.value}[/{colour}]",
            company.industry_folder,
        )

    console.print(table)
    console.print(f"\n[dim]Total: {len(companies)} companies | Source: {config.TABLE_MD}[/dim]")


# ---------------------------------------------------------------------------
# Helper functions
# ---------------------------------------------------------------------------
def _print_buffer_summary(buffer: ExtractionBuffer) -> None:
    """Print a rich summary table of the key buffer metrics."""
    wc = buffer.working_capital_metrics
    cr = buffer.calculated_ratios
    flags = buffer.operational_flags

    table = Table(box=box.SIMPLE, show_header=False, padding=(0, 1))
    table.add_column("Metric", style="bold")
    table.add_column("Q-2", justify="right")
    table.add_column("Q-1", justify="right")
    table.add_column("Current", justify="right", style="bold")

    def _fmt(v: float) -> str:
        if v >= 1_000_000:
            return f"${v/1_000_000:.1f}M"
        if v >= 1_000:
            return f"${v/1_000:.0f}K"
        return f"${v:.0f}"

    quarters = wc.quarters
    table.add_section()
    table.add_row("Quarter", *quarters)
    table.add_row(
        "Revenue",
        *[_fmt(v) for v in wc.revenue_converted_to_usd],
    )
    table.add_row(
        "Accounts Receivable",
        *[_fmt(v) for v in wc.accounts_receivable_converted_to_usd],
    )
    table.add_row(
        "Contract Assets",
        *[_fmt(v) for v in wc.contract_assets_unbilled_converted_to_usd],
    )
    table.add_row(
        "Inventories",
        *[_fmt(v) for v in wc.inventories_converted_to_usd],
    )

    dso = cr.days_sales_outstanding_dso
    dso_colour = "red" if dso[-1] > 90 else "green" if dso[-1] < 45 else "yellow"
    table.add_row(
        "DSO (days)",
        *[f"{d:.1f}" for d in dso[:-1]],
        f"[{dso_colour}]{dso[-1]:.1f}[/{dso_colour}]",
    )

    console.print(table)

    # Flags panel
    flag_lines = []
    if flags.working_capital_divergence_detected:
        flag_lines.append("[red]⚠ Working Capital Divergence DETECTED[/red]")
    if flags.qualification_cycle_modifier_applies:
        flag_lines.append("[cyan]◈ Qualification-Cycle Modifier ACTIVE[/cyan]")
    if flags.ai_segment_pivot_modifier_applies:
        flag_lines.append("[cyan]◈ AI Segment-Pivot Modifier ACTIVE[/cyan]")
    if flags.potential_channel_stuffing_signals:
        flag_lines.append("[red]⚠ Potential Channel Stuffing Signals[/red]")
    if flags.confirmed_foundry_reference_design_status != "None":
        flag_lines.append(
            f"[green]✓ Foundry Reference Design: {flags.confirmed_foundry_reference_design_status}[/green]"
        )
    if flags.direct_hyperscaler_custom_asic_design_win:
        flag_lines.append("[green]✓ Hyperscaler Custom ASIC Design Win[/green]")

    if flag_lines:
        console.print(Panel("\n".join(flag_lines), title="Operational Flags", border_style="dim"))

    console.print(
        f"[dim]AR growth vs revenue growth: {cr.receivables_growth_vs_revenue_growth_pct:+.1f}%  |  "
        f"Contract assets %: {cr.contract_assets_pct_receivables:.1f}%[/dim]"
    )



# ---------------------------------------------------------------------------
# export
# ---------------------------------------------------------------------------
@app.command()
def export(
    output: Annotated[
        Optional[str],
        typer.Option(
            "--output", "-o",
            help="Output directory for JSON files (default: public/research-data/ relative to web app root)",
        ),
    ] = None,
    verbose: Annotated[bool, typer.Option("--verbose", "-v")] = False,
) -> None:
    """
    [bold]Export all Titanite research data to JSON for the Next.js dashboard.[/bold]

    Reads TABLE.md, CATALYST-TRACKER.md, and TITANITE-HOLDINGS.md and writes:
      - companies.json  (all scored companies)
      - catalysts.json  (active catalysts)
      - holdings.json   (current Titanite holdings)

    Run this after any research update to refresh the dashboard data.
    """
    from titanite.parsers.table_parser import parse_table_md
    from titanite.parsers.catalyst_parser import parse_catalyst_tracker_md
    from titanite.parsers.holdings_parser import parse_holdings_md
    from titanite.outputs.json_exporter import export_research_json

    console.print(
        Panel.fit(
            "[bold cyan]Titanite Export[/bold cyan] — JSON → research-data/",
            border_style="cyan",
        )
    )

    # Resolve output directory
    if output:
        output_dir = Path(output).resolve()
    else:
        # Default: look for a web app sibling directory
        # titanite-app/ → research/ → titanite-research/ → public/research-data/
        # or fallback to a local export/ directory
        candidates = [
            config.REPO_ROOT.parent / "public" / "research-data",  # monorepo layout
            config.REPO_ROOT / "export" / "research-data",          # standalone layout
        ]
        output_dir = next((p for p in candidates), Path("export/research-data").resolve())

    console.print(f"Output directory: [dim]{output_dir}[/dim]")

    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console,
    ) as progress:
        task = progress.add_task("Parsing TABLE.md…", total=None)
        try:
            companies = parse_table_md(config.TABLE_MD)
        except Exception as e:
            progress.stop()
            console.print(f"[red]Error reading TABLE.md:[/red] {e}")
            raise typer.Exit(1) from e

        progress.update(task, description="Parsing CATALYST-TRACKER.md…")
        try:
            catalysts = parse_catalyst_tracker_md(config.CATALYST_TRACKER_MD)
        except Exception as e:
            progress.stop()
            console.print(f"[red]Error reading CATALYST-TRACKER.md:[/red] {e}")
            raise typer.Exit(1) from e

        progress.update(task, description="Parsing TITANITE-HOLDINGS.md…")
        try:
            holdings = parse_holdings_md(config.TITANITE_HOLDINGS_MD, companies)
        except Exception as e:
            progress.stop()
            console.print(f"[yellow]Warning: Could not parse TITANITE-HOLDINGS.md:[/yellow] {e}")
            holdings = []

        progress.update(task, description="Writing JSON files…")
        export_research_json(companies, catalysts, holdings, output_dir)
        progress.stop()

    console.print(f"\n[green]✓[/green] Export complete:")
    console.print(f"  [dim]{output_dir / 'companies.json'}[/dim] — {len(companies)} companies")
    console.print(f"  [dim]{output_dir / 'catalysts.json'}[/dim] — {len(catalysts)} catalysts ({sum(1 for c in catalysts if c.status.value == 'active')} active)")
    console.print(f"  [dim]{output_dir / 'holdings.json'}[/dim] — {len(holdings)} holdings")

    if verbose:
        t1 = [c for c in companies if c.tier.value == "Tier 1"]
        console.print(f"\n[dim]Tier 1 companies: {', '.join(c.ticker for c in t1[:10])}{'…' if len(t1) > 10 else ''}[/dim]")


def main() -> None:
    app()


if __name__ == "__main__":
    main()
