import type { PlaylistReport } from '../types.js';
import { parseTraktorTxtText } from './parseTraktorTxt.js';
import { requireFromRepo } from '../legacy/requireFromRepo.js';

// Keep legacy report generation for now, but load it via an absolute path so
// it works when this module is relocated/bundled by Next.
const legacyCreateTraktorReport = requireFromRepo<
  (rows: unknown[]) => Record<string, unknown>
>('scripts/Traktor/createTraktorReport.js');

export function createTraktorReportFromTxtText(txt: string): PlaylistReport {
  const rows = parseTraktorTxtText(txt);
  const legacyReport = legacyCreateTraktorReport(rows);
  return { platform: 'traktor', ...legacyReport } as PlaylistReport;
}
