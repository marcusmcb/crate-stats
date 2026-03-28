import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createRekordboxReportFromTxtText } from '../src/rekordbox/createRekordboxReport';
import { decodeRekordboxText } from '../src/rekordbox/parseRekordboxTxt';
// Legacy baseline: txt -> convertToCSV/replaceHash/json -> createRekordboxReport
// eslint-disable-next-line @typescript-eslint/no-require-imports
const legacyCreateRekordboxReport = require('../../../scripts/Rekordbox/createRekordboxReport');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const legacyHelpers = require('../../../scripts/shared/fileImportHelpers');
const fixturePath = join(__dirname, 'fixtures', 'scripts_data', 'RekordboxSampleData', 'rekordbox_sample_03.txt');
describe('rekordbox (golden)', () => {
    it('matches legacy output for a known fixture (key sections)', () => {
        const raw = readFileSync(fixturePath);
        const txt = decodeRekordboxText(raw);
        // Legacy pipeline used in the app historically
        const csvJsonString = legacyHelpers.convertToCSV(txt);
        const replaced = legacyHelpers.replaceHash(csvJsonString);
        // Some Rekordbox fixtures contain stray CR characters inside fields; legacy JSON parsing is brittle.
        // For baseline comparison, normalize out raw CR so we can obtain the legacy array.
        const normalized = String(replaced).replace(/\r/g, '');
        const arr = legacyHelpers.convertJsonStringToArray(normalized);
        const legacyReport = legacyCreateRekordboxReport(arr);
        const tsReport = createRekordboxReportFromTxtText(txt);
        // The legacy baseline keeps a record-numbering field (`_#`) inside some `tracks_played` arrays
        // due to a mismatch between replaceHash() -> "index" and cleanPlaylistArray() which deletes
        // only `index`. Our TS pipeline intentionally drops record numbers. Normalize baseline so the
        // golden test focuses on user-visible report fields.
        const stripLegacyRowNumbers = (value) => {
            if (!value || typeof value !== 'object')
                return value;
            if (Array.isArray(value))
                return value.map(stripLegacyRowNumbers);
            const obj = value;
            if (Object.prototype.hasOwnProperty.call(obj, '_#')) {
                const { ['_#']: _ignored, ...rest } = obj;
                return Object.fromEntries(Object.entries(rest).map(([k, v]) => [k, stripLegacyRowNumbers(v)]));
            }
            return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, stripLegacyRowNumbers(v)]));
        };
        const legacyReportNormalized = stripLegacyRowNumbers(legacyReport);
        expect(tsReport.track_data).toEqual(legacyReportNormalized.track_data);
        expect(tsReport.bpm_data).toEqual(legacyReportNormalized.bpm_data);
        expect(tsReport.genre_data).toEqual(legacyReportNormalized.genre_data);
        expect(tsReport.key_data).toEqual(legacyReportNormalized.key_data);
        expect(tsReport.bitrate_data).toEqual(legacyReportNormalized.bitrate_data);
        expect(tsReport.year_data).toEqual(legacyReportNormalized.year_data);
        expect(tsReport.rating_data).toEqual(legacyReportNormalized.rating_data);
        expect(tsReport.master_track_log.length).toBe(legacyReportNormalized.master_track_log.length);
        expect(tsReport.master_track_log[0]).toEqual(legacyReportNormalized.master_track_log[0]);
        expect(tsReport.master_track_log.at(-1)).toEqual(legacyReportNormalized.master_track_log.at(-1));
    });
});
