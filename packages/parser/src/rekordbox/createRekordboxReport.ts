import type { PlaylistReport } from '../types';
import { parseRekordboxTxtText } from './parseRekordboxTxt';

// Keep legacy helper functions for now.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const legacyCreateRekordboxReport = require('../../../../scripts/Rekordbox/createRekordboxReport');

export function createRekordboxReportFromTxtText(txt: string): PlaylistReport {
  const rows = parseRekordboxTxtText(txt);

  // Important: legacy createRekordboxReport() performs its own cleaning (cleanPlaylistKeys/Array + slice).
  // To match legacy behavior, pass the raw parsed rows and let the legacy function do the exact same steps.
  const legacyReport = legacyCreateRekordboxReport(rows);

  return { platform: 'rekordbox', ...legacyReport } as PlaylistReport;
}
