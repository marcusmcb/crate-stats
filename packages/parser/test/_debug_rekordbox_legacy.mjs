import fs from 'node:fs';
import legacyHelpers from '../../../scripts/shared/fileImportHelpers.js';
import legacyCreate from '../../../scripts/Rekordbox/createRekordboxReport.js';

const raw = fs.readFileSync('../../../scripts/data/RekordboxSampleData/rekordbox_sample_03.txt');
const txt = raw[0] === 0xff && raw[1] === 0xfe ? raw.toString('utf16le') : raw.toString('utf8');

const csvJsonString = legacyHelpers.replaceHash(legacyHelpers.convertToCSV(txt));
let arr;
try {
  arr = legacyHelpers.convertJsonStringToArray(csvJsonString);
} catch {
  arr = legacyHelpers.convertJsonStringToArray(String(csvJsonString).replace(/\r/g, ''));
}

console.log('arr length', arr.length);
const report = legacyCreate(arr);
console.log('total_tracks_played', report.track_data.total_tracks_played);
