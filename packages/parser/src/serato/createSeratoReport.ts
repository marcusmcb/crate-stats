import type { PlaylistReport } from '../types';
import { parseSeratoCsvText } from './parseSeratoCsv';

// Temporary: keep using legacy JS section helpers via require until ported.
// This gives us end-to-end correctness first, then we port helpers one-by-one.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const getPlaylistData = require('../../../../scripts/Serato/SeratoReportHelpers/getPlaylistData');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const getArtistData = require('../../../../scripts/Serato/SeratoReportHelpers/getArtistData');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const getBpmData = require('../../../../scripts/Serato/SeratoReportHelpers/getBpmData');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const getGenreData = require('../../../../scripts/Serato/SeratoReportHelpers/getGenreData');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const getAlbumData = require('../../../../scripts/Serato/SeratoReportHelpers/getAlbumData');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const getTrackData = require('../../../../scripts/Serato/SeratoReportHelpers/getTrackData');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const getYearData = require('../../../../scripts/Serato/SeratoReportHelpers/getYearData');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const getKeyData = require('../../../../scripts/Serato/SeratoReportHelpers/getKeyData');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const getDeckData = require('../../../../scripts/Serato/SeratoReportHelpers/getDeckData');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const getDoublesData = require('../../../../scripts/Serato/SeratoReportHelpers/getDoublesData');

export function createSeratoReportFromCsvText(csvText: string): PlaylistReport {
  const rows = parseSeratoCsvText(csvText);

  const seratoPlaylistAnalysis: any = { platform: 'serato' };

  const playlistData = getPlaylistData(rows);
  seratoPlaylistAnalysis.playlist_data = playlistData;

  const masterTrackLog = rows.slice(1);
  masterTrackLog.pop();
  seratoPlaylistAnalysis.master_track_log = masterTrackLog;

  seratoPlaylistAnalysis.artist_data = getArtistData(masterTrackLog);
  seratoPlaylistAnalysis.track_data = getTrackData(masterTrackLog);
  seratoPlaylistAnalysis.bpm_data = getBpmData(masterTrackLog);
  seratoPlaylistAnalysis.genre_data = getGenreData(masterTrackLog);
  seratoPlaylistAnalysis.album_data = getAlbumData(masterTrackLog);
  seratoPlaylistAnalysis.year_data = getYearData(masterTrackLog);
  seratoPlaylistAnalysis.key_data = getKeyData(masterTrackLog);
  seratoPlaylistAnalysis.deck_data = getDeckData(masterTrackLog);
  seratoPlaylistAnalysis.doubles_data = getDoublesData(masterTrackLog);

  seratoPlaylistAnalysis.date_created = Date.now();

  return seratoPlaylistAnalysis as PlaylistReport;
}
