import type { PlaylistReport } from '../types';
import { parseTraktorTxtText } from './parseTraktorTxt';

// Keep legacy report generation for now, while we port parsing.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const legacyCreateTraktorReport = require('../../../../scripts/Traktor/createTraktorReport');

export function createTraktorReportFromTxtText(txt: string): PlaylistReport {
  const rows = parseTraktorTxtText(txt);
  const legacyReport = legacyCreateTraktorReport(rows);
  return { platform: 'traktor', ...legacyReport } as PlaylistReport;
}
