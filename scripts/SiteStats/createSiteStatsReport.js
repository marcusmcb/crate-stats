const { getPlaylists } = require('../../firebase')
const {
	averageTime,
	calculateAverage,
	mostFrequentElement,
} = require('./siteStatsHelpers')

const createSiteStatsReport = async () => {
	let bpmArray = []
	let keyArray = []
	let trackLengthArray = []
	let totalTracksPlayedArray = []
	let yearsArray = []
	let uniqueGenresPlayedArray = []
	let instanceOfDoublesCount = 0
	let doublesPlayedArray = []

	await getPlaylists().then((data) => {
		data.forEach((item) => {
			if (item.data.key_data.has_key_data !== false) {
				keyArray.push(item.data.key_data.most_common_key.key)
			}
			if (!isNaN(item.data.year_data.average_year)) {
				yearsArray.push(new Number(item.data.year_data.average_year))
			}
			if (item.data.genre_data.unique_genres_played !== undefined) {
				uniqueGenresPlayedArray.push(item.data.genre_data.unique_genres_played)
			}
			if (item.data.doubles_data.has_doubles_data !== false) {
				instanceOfDoublesCount++
				doublesPlayedArray.push(item.data.doubles_data.doubles_detected)
			}
			bpmArray.push(new Number(item.data.bpm_data.average_bpm))
			trackLengthArray.push(item.data.track_data.average_track_length)
			totalTracksPlayedArray.push(item.data.track_data.total_tracks_played)
		})
	})

	console.log(uniqueGenresPlayedArray)

	const siteStatsReport = {
		average_bpm: calculateAverage(bpmArray),
		total_playlists_submitted: bpmArray.length,
		most_common_key: mostFrequentElement(keyArray),
		average_track_length: averageTime(trackLengthArray),
		average_tracks_per_playlist: new Number(
			calculateAverage(totalTracksPlayedArray)
		).toFixed(),
		average_year: calculateAverage(yearsArray),
		unique_genres_played: calculateAverage(uniqueGenresPlayedArray),
		playlists_with_doubles: instanceOfDoublesCount,
		doubles_per_playlist: calculateAverage(doublesPlayedArray),
	}
	return siteStatsReport
}

module.exports = createSiteStatsReport
