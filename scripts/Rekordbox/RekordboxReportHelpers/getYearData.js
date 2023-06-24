const calculateTagHealth = require('../../shared/calculateTagHealth')
const {
	arrayCount,
	percentageOf,
	averageYear,
} = require('../../shared/fileImportHelpers')

const getYearData = (rekordBoxData) => {
	if (!rekordBoxData.length) return { has_year_data: false }

	let yearArray = []
	let nullYearCount = 0
	let oldestTracks = []
	let newestTracks = []

	// populate year array and get null/malformed year count
	rekordBoxData.forEach((track) => {
		if (!track.Year || track.Year === '' || track.Year === '0') {
			nullYearCount++
		} else {
			const yearNumber = Number(track.Year)
			yearArray.push(yearNumber)
		}
	})

	// determine oldest and most recent years played in set
	let oldestTrackYear = Math.min(...yearArray)
	let newestTrackYear = Math.max(...yearArray)

	// populate oldest/newest track arrays
	rekordBoxData.forEach((track) => {
		if (+track.Year === oldestTrackYear) {
			oldestTracks.push(track)
		} else if (+track.Year === newestTrackYear) {
			newestTracks.push(track)
		}
	})

	// object with the count of each year played
	let yearsPlayed = arrayCount(yearArray)

	// percentage of playlist from most recent track year
	const newestYearPercentage = percentageOf(
		yearArray,
		Number(newestTrackYear)
	).toFixed()

	return {
		has_year_data: true,
		years_played: yearsPlayed,
		average_year: Math.round(averageYear(yearArray)),
		oldest_tracks: {
			year: oldestTrackYear,
			times_played: oldestTracks.length,
			tracks_played: oldestTracks,
		},
		newest_tracks: {
			year: newestTrackYear,
			times_played: newestTracks.length,
			tracks_played: newestTracks,
			playlist_percentage: newestYearPercentage,
		},
		tag_health: {
			percentage_with_year_tags: calculateTagHealth(
				yearArray.length,
				rekordBoxData.length
			).toFixed(1),
			empty_year_tags: nullYearCount,
		},
	}
}

module.exports = getYearData
