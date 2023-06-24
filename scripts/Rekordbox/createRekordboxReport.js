const {
	cleanPlaylistArray,
	cleanPlaylistKeys,
} = require('../shared/fileImportHelpers')

const getTrackData = require('./RekordboxReportHelpers/getTrackData')
const getBpmData = require('./RekordboxReportHelpers/getBpmData')
const getGenreData = require('./RekordboxReportHelpers/getGenreData')
const getKeyData = require('./RekordboxReportHelpers/getKeyData')
const getBitrateData = require('./RekordboxReportHelpers/getBitrateData')
const getYearData = require('./RekordboxReportHelpers/getYearData')
const getRatingData = require('./RekordboxReportHelpers/getRatingData')
const getArtistData = require('./RekordboxReportHelpers/getArtistData')

const createRekordboxReport = (data) => {
	let rekordBoxData = data

	// data cleaning
	rekordBoxData = cleanPlaylistKeys(rekordBoxData)
	rekordBoxData = cleanPlaylistArray(rekordBoxData)
	rekordBoxData = rekordBoxData.slice(0, -1)

	// set final return object as a dummy arr
	let rekordBoxPlaylistData = {}

	// set playlist's master track log
	rekordBoxPlaylistData.master_track_log = rekordBoxData

	// set playlist's track data
	let rekordBoxTrackData = getTrackData(rekordBoxData)
	rekordBoxPlaylistData.track_data = rekordBoxTrackData

	// set playlist's bpm data
	let rekordBoxBPMData = getBpmData(rekordBoxData)
	rekordBoxPlaylistData.bpm_data = rekordBoxBPMData

	// set playlist's genre data
	let rekordBoxGenreData = getGenreData(rekordBoxData)
	rekordBoxPlaylistData.genre_data = rekordBoxGenreData

	// set playlist's key data
	let rekordBoxKeyData = getKeyData(rekordBoxData)
	rekordBoxPlaylistData.key_data = rekordBoxKeyData

	// set playlist's bitrate data
	let rekordBoxBitrateData = getBitrateData(rekordBoxData)
	rekordBoxPlaylistData.bitrate_data = rekordBoxBitrateData

	// set playlist's year data
	let rekordBoxYearData = getYearData(rekordBoxData)
	rekordBoxPlaylistData.year_data = rekordBoxYearData

	// set playlist's rating data
	let rekordBoxRatingData = getRatingData(rekordBoxData)
	rekordBoxPlaylistData.rating_data = rekordBoxRatingData
	
	// set date for report's creation
	rekordBoxPlaylistData.date_created = Date.now()
	return rekordBoxPlaylistData
}

module.exports = createRekordboxReport
