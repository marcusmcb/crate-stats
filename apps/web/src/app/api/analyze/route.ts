import { NextResponse } from 'next/server';
import { analyzePlaylist } from '@cratestats/parser';

export const runtime = 'nodejs';

type AnalyzeBody = {
  platform: 'serato' | 'traktor' | 'rekordbox';
  text: string;
  fileName?: string;
};

export async function POST(req: Request) {
  let body: AnalyzeBody;
  try {
    body = (await req.json()) as AnalyzeBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body?.platform || !body?.text) {
    return NextResponse.json(
      { error: 'Missing required fields: platform, text' },
      { status: 400 },
    );
  }

  // Basic size guardrail for MVP; tune later.
  if (body.text.length > 5_000_000) {
    return NextResponse.json(
      { error: 'File too large for demo (max ~5MB text).' },
      { status: 413 },
    );
  }

  try {
    const report = await analyzePlaylist({
      platform: body.platform,
      text: body.text,
      fileName: body.fileName,
    });

    return NextResponse.json(report);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
