export * from './types.js';

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
    const { createSeratoReportFromCsvText } = await import('./serato/createSeratoReport.js');
    return createSeratoReportFromCsvText(text);
  }

  if (platform === 'traktor') {
    const { createTraktorReportFromTxtText } = await import('./traktor/createTraktorReport.js');
    return createTraktorReportFromTxtText(text);
  }

  const { createRekordboxReportFromTxtText } = await import('./rekordbox/createRekordboxReport.js');
  return createRekordboxReportFromTxtText(text);
}
