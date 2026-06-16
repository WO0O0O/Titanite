Act as the Deep Analytical Scorer framework defined in [SC-AI-SCORER.md](file;file:///Users/danwooster/1.%20DEV/titanite/RESEARCH-NOTES/prompts/SC/SC-AI-SCORER.md)

CRITICAL DIRECTORY & FILE PROTOCOL:

1. Open the file generated in Turn 1 located at [XFAB-EXTRACTION-BUFFER.md](file;file:///Users/danwooster/1.%20DEV/titanite/RESEARCH-NOTES/SMALLCAP-AI-INFRA/Semis/XFAB-EXTRACTION-BUFFER.md) .
2. Read the verified raw extraction JSON block directly from the "## RAW DATA EXTRACTION BUFFER" header.
3. Execute all 15 analytical scoring sections sequentially, applying the mandatory writing style rules (British English, no filler, zero hedging, data-dense) and mathematical constraints.
4. Use your file-creation tool to create a SECOND, separate file named exactly `[TICKER]-RESEARCH-REPORT.md` inside that same technical subfolder.
   Target Path: `RESEARCH-NOTES/SMALLCAP-AI-INFRA/[SUBFOLDER]/[TICKER]-RESEARCH-REPORT.md`
5. Write all 15 scoring sections, the final scorecard, and the synthesis paragraph directly into this new file. Populate the Section 5 Markdown matrix explicitly.

CRITICAL DATA ISOLATION RULE: Do not look at or pull historical valuation data, market cap figures, or revenue targets from index files like TABLE.md during your Section 5 math iterations. You must calculate all targets, multiples, and returns strictly using the fresh USD currency conversions and baseline inputs you establish in the active Gate Check block of this specific run.

ANTI-CONDENSATION CONSTRAINT: You are strictly forbidden from combining, summarizing, or shortening outputs to save tokens. You must write out every section in full detail, including all explicit headers, sub-tier audits, and mathematical mappings required.

Do not stream the analysis or scorecard to this chat window. Reply ONLY with a single sentence confirming the exact path of the new research report file written to disk.

POST-RESEARCH PROTOCOL: Once the research report is written, you must open [TABLE.md](/TABLE.md) and update or insert the ticker under the appropriate Tier and Score sequence (highest score to lowest) in accordance with the post-research rules in the framework.
