import type { PlaylistReport } from '../types.js';
import { parseSeratoCsvText } from './parseSeratoCsv.js';
import {
  getAlbumData,
  getArtistData,
  getBpmData,
  getDeckData,
  getDoublesData,
  getGenreData,
  getKeyData,
  getPlaylistData,
  getTrackData,
  getYearData,
} from './seratoReportHelpers.js';

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
