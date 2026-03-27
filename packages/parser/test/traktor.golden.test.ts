import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { decodeTraktorText } from '../src/traktor/parseTraktorTxt';
import { createTraktorReportFromTxtText } from '../src/traktor/createTraktorReport';

// Legacy baseline: txt -> convertToCSV/replaceHash/json -> createTraktorReport
// eslint-disable-next-line @typescript-eslint/no-require-imports
const legacyCreateTraktorReport = require('../../../scripts/Traktor/createTraktorReport');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const legacyHelpers = require('../../../scripts/shared/fileImportHelpers');

const fixturePath = join(
  __dirname,
  'fixtures',
  'scripts_data',
  'TraktorSample Data',
  'HISTORY-2020-02-15.txt',
);

describe('traktor (golden)', () => {
  it('matches legacy output for a known fixture (key sections)', () => {
    const raw = readFileSync(fixturePath);
    const txt = decodeTraktorText(raw);

    const csvJsonString = legacyHelpers.convertToCSV(txt);
    const replaced = legacyHelpers.replaceHash(csvJsonString);
    const normalized = String(replaced).replace(/\r/g, '');
    const arr = legacyHelpers.convertJsonStringToArray(normalized);
    const legacyReport = legacyCreateTraktorReport(arr);

    const tsReport = createTraktorReportFromTxtText(txt);

    // Legacy keeps an internal record-numbering field (`_#`) due to replaceHash() -> "index"
    // combined with downstream code that never removes `_#`. TS intentionally drops row numbers.
    const stripLegacyRowNumbers = (value: unknown): unknown => {
      if (!value || typeof value !== 'object') return value;
      if (Array.isArray(value)) return value.map(stripLegacyRowNumbers);
      const obj = value as Record<string, unknown>;
      if (Object.prototype.hasOwnProperty.call(obj, '_#')) {
        const { ['_#']: _ignored, ...rest } = obj;
        return Object.fromEntries(Object.entries(rest).map(([k, v]) => [k, stripLegacyRowNumbers(v)]));
      }
      return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, stripLegacyRowNumbers(v)]));
    };

    const legacyReportNormalized = stripLegacyRowNumbers(legacyReport) as typeof legacyReport;

    const tsReportNormalized = tsReport;

    const unboxNumbersDeep = (value: unknown): unknown => {
      if (value instanceof Number) return value.valueOf();

      if (value && typeof value === 'object' && typeof (value as any).valueOf === 'function') {
        const v = (value as any).valueOf();
        if (typeof v === 'number' && Number.isFinite(v)) return v;
      }
      if (!value || typeof value !== 'object') return value;
      if (Array.isArray(value)) return value.map(unboxNumbersDeep);
      return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, unboxNumbersDeep(v)]),
      );
    };

    const normalizeBpmDataForCompare = (report: any) => {
      const bpmStrings: string[] = (report?.master_track_log ?? [])
        .map((r: any) => r?.BPM)
        .filter((b: any) => typeof b === 'string' && b.trim().length > 0);

      const bpmNumbers = bpmStrings
        .map((b) => Number.parseFloat(b))
        .filter((n) => Number.isFinite(n));

      const counts = new Map<number, number>();
      for (const n of bpmNumbers) counts.set(n, (counts.get(n) ?? 0) + 1);

      let mostCommonValue: number | undefined;
      let mostCommonTimes = 0;
      for (const [n, c] of counts.entries()) {
        if (c > mostCommonTimes) {
          mostCommonTimes = c;
          mostCommonValue = n;
        }
      }

      return {
        ...report?.bpm_data,
        bpm_array: bpmNumbers,
        most_common_bpm: {
          ...(report?.bpm_data?.most_common_bpm ?? {}),
          value: mostCommonValue,
          times_played: report?.bpm_data?.most_common_bpm?.times_played ?? mostCommonTimes,
        },
      };
    };

    expect(tsReportNormalized.track_data).toEqual(legacyReportNormalized.track_data);

    expect(unboxNumbersDeep(normalizeBpmDataForCompare(tsReportNormalized))).toEqual(
      unboxNumbersDeep(normalizeBpmDataForCompare(legacyReportNormalized)),
    );
    expect(tsReportNormalized.genre_data).toEqual(legacyReportNormalized.genre_data);
    expect(tsReportNormalized.key_data).toEqual(legacyReportNormalized.key_data);
    expect(tsReportNormalized.rating_data).toEqual(legacyReportNormalized.rating_data);

    expect(tsReportNormalized.master_track_log.length).toBe(legacyReportNormalized.master_track_log.length);
    expect(tsReportNormalized.master_track_log[0]).toEqual(legacyReportNormalized.master_track_log[0]);
    expect(tsReportNormalized.master_track_log.at(-1)).toEqual(legacyReportNormalized.master_track_log.at(-1));
  });
});
