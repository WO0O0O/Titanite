import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Mirror of the INDUSTRY_MAP in config.py
const INDUSTRY_MAP: Record<string, string> = {
  "PENG": "AI-CLOUD-INFRA",
  "SKM": "AI-CLOUD-INFRA",
  "BRUN": "AI-CLOUD-INFRA",
  "DGXX": "AI-CLOUD-INFRA",
  "NBIS": "AI-CLOUD-INFRA",
  "KEEL": "AI-CLOUD-INFRA",
  "TLN": "ENERGY",
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
  if (!folder) {
    return NextResponse.json({ error: `No industry folder mapped for ticker ${ticker}` }, { status: 404 });
  }

  // Resolve path
  let filePath = '';
  if (folder === 'SPACE') {
    filePath = join(process.cwd(), 'research', 'notes', 'SPACE', `${ticker}.md`);
  } else {
    filePath = join(process.cwd(), 'research', 'notes', 'SMALLCAP-AI-INFRA', folder, `${ticker}-RESEARCH-REPORT.md`);
  }

  if (!existsSync(filePath)) {
    // Try alternatives (e.g. -Analysis.md or custom name)
    const candidates = [
      join(process.cwd(), 'research', 'notes', 'SMALLCAP-AI-INFRA', folder, `${ticker}-Analysis.md`),
      join(process.cwd(), 'research', 'notes', 'SMALLCAP-AI-INFRA', folder, `${ticker}.md`),
    ];
    let found = false;
    for (const c of candidates) {
      if (existsSync(c)) {
        filePath = c;
        found = true;
        break;
      }
    }

    if (!found) {
      return NextResponse.json({ error: `Report file not found for ${ticker}` }, { status: 404 });
    }
  }

  try {
    const content = readFileSync(filePath, 'utf-8');
    return NextResponse.json({ content });
  } catch (err: any) {
    return NextResponse.json({ error: `Failed to read report: ${err.message}` }, { status: 500 });
  }
}
