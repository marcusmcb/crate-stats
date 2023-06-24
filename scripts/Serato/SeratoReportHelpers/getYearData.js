const parsePlayedAtTime = require('../../shared/parsePlayedAtTime')
const calculateTagHealth = require('../../shared/calculateTagHealth')

const getYearData = (masterTrackLog) => {
	let year_data
	let trackYears = []
	let nullYearCount = 0
	let malformedYearCount = 0
	let yearTagsWithValues = 0

	masterTrackLog.forEach((track) => {
		if (!track.year || track.year === '') {
			nullYearCount++
		} else if (track.year.length !== 4) {
			malformedYearCount++
			yearTagsWithValues++
		} else {
			trackYears.push(Number(track.year))
			yearTagsWithValues++
		}
	})

	let averageYear
	let oldestTracks = []
	let newestTracks = []
	let oldestTrack, newestTrack
	let oldestTrackCount = 0
	let newestTrackCount = 0
	let newestYearPercentage

	let hasYearData

	if (trackYears.length === 0) {
		hasYearData = false
	} else {
		hasYearData = true

		averageYear = trackYears.reduce((a, b) => a + b) / trackYears.length
		oldestTrack = Math.min(...trackYears)
		newestTrack = Math.max(...trackYears)

		masterTrackLog.forEach((track) => {
			if (track.year === oldestTrack.toString()) {
				oldestTrackCount++
				oldestTracks.push(track)
			}
		})

		masterTrackLog.forEach((track) => {
			if (track.year === newestTrack.toString()) {
				newestTrackCount++
				newestTracks.push(track)
			}
		})

		newestYearPercentage = (
			(newestTrackCount / yearTagsWithValues) *
			100
		).toFixed(2)
	}

	if (!hasYearData) {
		year_data = {
			has_year_data: false,
		}
	} else {
		year_data = {
			average_year: Math.round(averageYear),
			range: {
				oldest: oldestTrack,
				newest: newestTrack,
			},
			oldest_track: {
				year: oldestTrack,
				artist: oldestTracks[0].artist,
				name: oldestTracks[0].name,
				count: oldestTrackCount,
				tracks: oldestTracks,
				occurred_at: parsePlayedAtTime(oldestTracks[0]['start time']),
			},
			newest_track: {
				year: newestTrack,
				count: newestTrackCount,
				tracks: newestTracks,
				playlist_percentage: newestYearPercentage,
			},
			tag_health: {
				percentage_with_year_tags: calculateTagHealth(
					yearTagsWithValues,
					masterTrackLog.length
				).toFixed(1),
				empty_year_tags: nullYearCount,
				malformed_year_tags: malformedYearCount,
			},
		}
	}

	return year_data
}

module.exports = getYearData
