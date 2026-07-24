import { NextResponse } from 'next/server';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// Mirror of the INDUSTRY_MAP in config.py
const INDUSTRY_MAP: Record<string, string> = {
  "PENG": "AI-CLOUD-INFRA",
  "SKM": "AI-CLOUD-INFRA",
  "BRUN": "AI-CLOUD-INFRA",
  "DGXX": "AI-CLOUD-INFRA",
  "NBIS": "AI-CLOUD-INFRA",
  "KEEL": "AI-CLOUD-INFRA",
  "SNOW": "AI-CLOUD-INFRA",
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
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get('ticker')?.toUpperCase();

  if (!ticker) {
    return NextResponse.json({ error: 'Ticker is required' }, { status: 400 });
  }

  const folder = INDUSTRY_MAP[ticker];
  let filePath = '';
  let found = false;

  if (folder) {
    if (folder === 'SPACE') {
      filePath = join(process.cwd(), 'Titanite-Research', 'notes', 'SPACE', `${ticker}.md`);
      if (existsSync(filePath)) {
        found = true;
      }
    }

    if (!found) {
      const candidates = [
        join(process.cwd(), 'Titanite-Research', 'notes', 'SPACE', `${ticker}.md`),
        join(process.cwd(), 'Titanite-Research', 'notes', 'SPACE', `${ticker}-RESEARCH-REPORT.md`),
        join(process.cwd(), 'Titanite-Research', 'notes', 'SMALLCAP-AI-INFRA', folder, `${ticker}-RESEARCH-REPORT.md`),
        join(process.cwd(), 'Titanite-Research', 'notes', 'SMALLCAP-AI-INFRA', folder, `${ticker}-Analysis.md`),
        join(process.cwd(), 'Titanite-Research', 'notes', 'SMALLCAP-AI-INFRA', folder, `${ticker}.md`),
        join(process.cwd(), 'Titanite-Research', 'notes', 'SITUATIONAL-AWARENESS', folder, `${ticker}.md`),
        join(process.cwd(), 'Titanite-Research', 'notes', 'SITUATIONAL-AWARENESS', folder, `${ticker}-Analysis.md`),
        join(process.cwd(), 'Titanite-Research', 'notes', 'SITUATIONAL-AWARENESS', folder, `${ticker}-RESEARCH-REPORT.md`),
      ];

      for (const c of candidates) {
        if (existsSync(c)) {
          filePath = c;
          found = true;
          break;
        }
      }
    }
  }

  // Dynamic Fallback: If unmapped or not found via INDUSTRY_MAP, scan framework directories dynamically
  if (!found) {
    const rootNotes = join(process.cwd(), 'Titanite-Research', 'notes');
    const frameworks = ['SITUATIONAL-AWARENESS', 'SMALLCAP-AI-INFRA', 'SPACE'];

    for (const fw of frameworks) {
      const fwPath = join(rootNotes, fw);
      if (!existsSync(fwPath)) continue;

      const items = readdirSync(fwPath);
      for (const item of items) {
        const itemPath = join(fwPath, item);
        const isDir = statSync(itemPath).isDirectory();

        if (!isDir) {
          const upperItem = item.toUpperCase();
          if (upperItem === `${ticker}.MD` || upperItem === `${ticker}-RESEARCH-REPORT.MD`) {
            filePath = itemPath;
            found = true;
            break;
          }
          continue;
        }

        const candidateFiles = [
          join(itemPath, `${ticker}.md`),
          join(itemPath, `${ticker}-RESEARCH-REPORT.md`),
          join(itemPath, `${ticker}-Analysis.md`),
        ];

        for (const c of candidateFiles) {
          if (existsSync(c)) {
            filePath = c;
            found = true;
            break;
          }
        }
        if (found) break;
      }
      if (found) break;
    }
  }

  if (!found) {
    return NextResponse.json({ error: `Report file not found for ${ticker}` }, { status: 404 });
  }

  try {
    const content = readFileSync(filePath, 'utf-8');
    return NextResponse.json({ content });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Failed to read report: ${message}` }, { status: 500 });
  }
}
