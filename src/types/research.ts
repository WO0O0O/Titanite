/**
 * Research types — mirrors the Titanite Python Pydantic models.
 *
 * These types are the canonical contract between the `titanite export` CLI
 * output (public/research-data/*.json) and the Next.js frontend.
 *
 * ⚠️ If you change the JSON schema in json_exporter.py, update these types too.
 * Framework version: v2.0.0
 */

export type ResearchTier =
  | 'Tier 1'
  | 'Tier 2'
  | 'Tier 3'
  | 'Pass'
  | 'Disqualified';

export type ResearchFramework = 'sc' | 'leopold' | 'space';

export type CatalystConfidence = 'High' | 'Medium-High' | 'Medium' | 'Low';

export type CatalystStatus = 'active' | 'hit' | 'missed' | 'cancelled';

/** A single scored company from TABLE.md. */
export interface ResearchedCompany {
  ticker: string;
  companyName: string;
  /** Raw score out of 13.0 */
  score: number;
  tier: ResearchTier;
  /** Subfolder under SMALLCAP-AI-INFRA/ e.g. 'photonics', 'ENERGY' */
  industryFolder: string;
  keySummary: string;
  framework: ResearchFramework;
}

/** A single catalyst from CATALYST-TRACKER.md. */
export interface ResearchCatalyst {
  ticker: string;
  description: string;
  expectedDate: string;
  confidence: CatalystConfidence;
  status: CatalystStatus;
  thesisImpact: string;
  actualDate: string | null;
  deltaDays: number | null;
}

/** Wrapper returned by companies.json */
export interface CompaniesPayload {
  exportedAt: string;
  count: number;
  companies: ResearchedCompany[];
}

/** Wrapper returned by catalysts.json */
export interface CatalystsPayload {
  exportedAt: string;
  activeCount: number;
  totalCount: number;
  catalysts: ResearchCatalyst[];
}

/** Wrapper returned by holdings.json */
export interface HoldingsPayload {
  exportedAt: string;
  count: number;
  holdings: ResearchedCompany[];
}

/** Colour mapping for tier badges — used in both ResearchUniverseTable and HoldingsTable enrichment */
export const TIER_COLOURS: Record<ResearchTier, string> = {
  'Tier 1': 'var(--color-positive)',   // neon green
  'Tier 2': 'var(--color-warning)',    // amber
  'Tier 3': 'var(--color-negative)',   // red
  'Pass': 'var(--color-muted)',        // dim grey
  'Disqualified': 'var(--color-negative)',
};

export const CONFIDENCE_COLOURS: Record<CatalystConfidence, string> = {
  'High': 'var(--color-positive)',
  'Medium-High': '#7ddb7d',
  'Medium': 'var(--color-warning)',
  'Low': 'var(--color-muted)',
};
