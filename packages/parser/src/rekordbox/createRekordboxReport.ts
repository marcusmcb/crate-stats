import type { PlaylistReport } from '../types.js';
import { parseRekordboxTxtText } from './parseRekordboxTxt.js';
import { requireFromRepo } from '../legacy/requireFromRepo.js';

// Keep legacy report generation for now, but load it via an absolute path so
// it works when this module is relocated/bundled by Next.
const legacyCreateRekordboxReport = requireFromRepo<
  (rows: unknown[]) => Record<string, unknown>
>('scripts/Rekordbox/createRekordboxReport.js');

export function createRekordboxReportFromTxtText(txt: string): PlaylistReport {
  const rows = parseRekordboxTxtText(txt);

  // Important: legacy createRekordboxReport() performs its own cleaning (cleanPlaylistKeys/Array + slice).
  // To match legacy behavior, pass the raw parsed rows and let the legacy function do the exact same steps.
  const legacyReport = legacyCreateRekordboxReport(rows);

  return { platform: 'rekordbox', ...legacyReport } as PlaylistReport;
}
