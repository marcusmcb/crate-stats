import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createSeratoReportFromCsvText } from '../src/serato/createSeratoReport';
// Legacy JS implementation (baseline)
// eslint-disable-next-line @typescript-eslint/no-require-imports
const legacyCreateSeratoReport = require('../../../scripts/Serato/createSeratoReport');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const legacyCsvToJson = require('csvtojson');
const fixturePath = join(__dirname, 'fixtures', '_for_testing', 'user_data', '4-23-22.csv');
describe('serato (golden)', () => {
    it('matches legacy output for a known fixture (key sections)', async () => {
        const csvText = readFileSync(fixturePath, 'utf8');
        // Legacy path: csv text -> array of objects -> report
        const legacyRows = await legacyCsvToJson().fromString(csvText);
        const legacyReport = legacyCreateSeratoReport(legacyRows);
        // TS path: csv text -> report
        const tsReport = createSeratoReportFromCsvText(csvText);
        // Compare deterministic sections (ignore date_created)
        expect(tsReport.playlist_data).toEqual(legacyReport.playlist_data);
        expect(tsReport.track_data).toEqual(legacyReport.track_data);
        expect(tsReport.bpm_data).toEqual(legacyReport.bpm_data);
        expect(tsReport.genre_data).toEqual(legacyReport.genre_data);
        expect(tsReport.key_data).toEqual(legacyReport.key_data);
        expect(tsReport.year_data).toEqual(legacyReport.year_data);
        expect(tsReport.deck_data).toEqual(legacyReport.deck_data);
        expect(tsReport.doubles_data).toEqual(legacyReport.doubles_data);
        // Master track log can be large; check length + first/last entries match.
        expect(tsReport.master_track_log.length).toBe(legacyReport.master_track_log.length);
        expect(tsReport.master_track_log[0]).toEqual(legacyReport.master_track_log[0]);
        expect(tsReport.master_track_log.at(-1)).toEqual(legacyReport.master_track_log.at(-1));
    });
});
