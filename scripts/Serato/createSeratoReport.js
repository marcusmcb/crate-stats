const getPlaylistData = require('./SeratoReportHelpers/getPlaylistData')
const getArtistData = require('./SeratoReportHelpers/getArtistData')
const getBpmData = require('./SeratoReportHelpers/getBpmData')
const getGenreData = require('./SeratoReportHelpers/getGenreData')
const getAlbumData = require('./SeratoReportHelpers/getAlbumData')
const getTrackData = require('./SeratoReportHelpers/getTrackData')
const getYearData = require('./SeratoReportHelpers/getYearData')
const getKeyData = require('./SeratoReportHelpers/getKeyData')
const getDeckData = require('./SeratoReportHelpers/getDeckData')
const getDoublesData = require('./SeratoReportHelpers/getDoublesData')
const { removeEmptyKey } = require('../shared/fileImportHelpers')

const createSeratoReport = (data) => {
	let seratoPlaylistAnalysis = {}

	// set general playlist data
	let seratoPlaylistData = getPlaylistData(data)
	seratoPlaylistAnalysis.playlist_data = seratoPlaylistData

	// set playlist's master track log
	const masterTrackLog = data.slice(1)
	masterTrackLog.pop()
	seratoPlaylistAnalysis.master_track_log = removeEmptyKey(masterTrackLog)

	// set playlist's artist data
	let seratoArtistData = getArtistData(masterTrackLog)
	seratoPlaylistAnalysis.artist_data = seratoArtistData

	// set playlist's track/song data
	let seratoTrackData = getTrackData(masterTrackLog)
	seratoPlaylistAnalysis.track_data = seratoTrackData

	// set playlist's bpm data
	let seratoBpmData = getBpmData(masterTrackLog)
	seratoPlaylistAnalysis.bpm_data = seratoBpmData

	// set playlist's genre data
	let seratoGenreData = getGenreData(masterTrackLog)
	seratoPlaylistAnalysis.genre_data = seratoGenreData

	// set playlist's album/collection data
	let seratoAlbumData = getAlbumData(masterTrackLog)
	seratoPlaylistAnalysis.album_data = seratoAlbumData

	// set playlist's year data
	let seratoYearData = getYearData(masterTrackLog)
	seratoPlaylistAnalysis.year_data = seratoYearData

	// set playlist's key data
	let seratoKeyData = getKeyData(masterTrackLog)
	seratoPlaylistAnalysis.key_data = seratoKeyData

	// set playlist's deck data
	let seratoDeckData = getDeckData(masterTrackLog)
	seratoPlaylistAnalysis.deck_data = seratoDeckData

	// set playlist's doubles data
	let seratoDoublesData = getDoublesData(masterTrackLog)
	seratoPlaylistAnalysis.doubles_data = seratoDoublesData

	// set date for report's creation
	seratoPlaylistAnalysis.date_created = Date.now()
	return seratoPlaylistAnalysis
}

module.exports = createSeratoReport

// need to test with playlists that use more than 2 decks
// need to test with playlists that only use a single deck
