const parsePlayedAtTime = require('../../shared/parsePlayedAtTime')
const calculateTagHealth = require('../../shared/calculateTagHealth')

const getYearData = (masterTrackLog) => {
	let year_data
	// array of years
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
			trackYears.push(new Number(track.year))
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

	if (trackYears.length === 0) {
		hasYearData = false
	} else {
		hasYearData = true

		// identify average age of playlist's tracks
		averageYear = trackYears.reduce((a, b) => a + b) / trackYears.length

		// identify oldest and newest tracks
		oldestTrack = Math.min(...trackYears)
		newestTrack = Math.max(...trackYears)

		masterTrackLog.forEach((track) => {
			// check to see if there's more than 1 track from the oldest track year
			if (track.year == oldestTrack) {
				oldestTrackCount++
				oldestTracks.push(track)
			}
		})

		masterTrackLog.forEach((track) => {
			// check to see if there's more than 1 track from the newest track year
			if (track.year == newestTrack) {
				newestTrackCount++
				newestTracks.push(track)
			}
		})

		// calculate percentage of playlist that was from the most recent year
		// implement similar function to do the same for the oldest track year
		newestYearPercentage = (
			(newestTrackCount / masterTrackLog.length) *
			100
		).toFixed(2)
		let oldestYearPercentage = (
			(oldestTrackCount / masterTrackLog.length) *
			100
		).toFixed(2)
	}

	if (!hasYearData) {
		year_data = {
			has_year_data: false,
		}
	} else {
		year_data = {
			average_year: averageYear.toFixed(),
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
