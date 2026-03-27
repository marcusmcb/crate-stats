export * from './types';

export type AnalyzeInput = {
  platform: 'serato' | 'traktor' | 'rekordbox';
  fileName?: string;
  text: string;
};

// Temporary MVP adapter: call into the existing JS implementation by dynamic import.
// This lets us stand up the new Next.js app quickly, then incrementally port to TS.
export async function analyzePlaylist(input: AnalyzeInput) {
  const { platform, text, fileName } = input;

  // The legacy report creators expect either raw file contents or structured payload
  // depending on platform. For now, we pass the raw text and minimal metadata.
  if (platform === 'serato') {
    const { createSeratoReportFromCsvText } = await import('./serato/createSeratoReport');
    return createSeratoReportFromCsvText(text);
  }

  if (platform === 'traktor') {
    const mod = await import('../../../scripts/Traktor/createTraktorReport.js');
    return mod.default ? mod.default({ text, fileName }) : mod({ text, fileName });
  }

  const { createRekordboxReportFromTxtText } = await import(
    './rekordbox/createRekordboxReport'
  );
  return createRekordboxReportFromTxtText(text);
}
