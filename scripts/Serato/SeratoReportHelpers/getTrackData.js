const calculateAverageTime = require('../../shared/calculateAverageTime')
const parsePlayedAtTime = require('../../shared/parsePlayedAtTime')

const getTrackData = (masterTrackLog) => {
	// number of tracks played
  let track_data
	const totalTracksPlayed = masterTrackLog.length

	// number of unique tracks played
	let uniqueTracks = []
	for (let i = 0; i < masterTrackLog.length - 1; i++) {
		if (
			masterTrackLog[i].name !== masterTrackLog[i + 1].name &&
			masterTrackLog[i].artist !== masterTrackLog[i + 1].artist
		) {
			uniqueTracks.push(masterTrackLog[i])
		}
	}

	// array of track lengths
	let trackLengths = []
	let nullLengthCount = 0
	masterTrackLog.forEach((track) => {
		if (!track.playtime || track.playtime === '') {
			nullLengthCount++
		} else {
			trackLengths.push(track.playtime.substring(3))
		}
	})

	console.log(trackLengths)

	let averageTrackLength,
		longestTrack,
		longestTrackStartTime,
		shortestTrack,
		shortestTrackStartTime

	// check if user's csv has playtime data
	if (trackLengths.length === 0) {
		hasPlayTimeData = false
	} else {
		hasPlayTimeData = true

		// average track length
		averageTrackLength = calculateAverageTime(trackLengths)

		// longest track
		// add logic check to consider what to do with outliers (abnormally long playtimes)
		// abnormally long track values with skew the average length when calculated

		longestTrack = trackLengths.reduce((a, b) => (a > b ? a : b))
		const longestTrackIndex = trackLengths.indexOf(longestTrack)
		longestTrack = masterTrackLog[longestTrackIndex]
		longestTrackStartTime = parsePlayedAtTime(longestTrack['start time'])

		// shortest track
		// check if shortest track is part of a doubles pair
		// if so, note as such and query track log for shortest track not in a doubles pair

		shortestTrack = trackLengths.reduce((a, b) => (a < b ? a : b))
		const shortestTrackIndex = trackLengths.indexOf(shortestTrack)
		shortestTrack = masterTrackLog[shortestTrackIndex]
		shortestTrackStartTime = parsePlayedAtTime(shortestTrack['start time'])
	}

	// check hasPlayTimeData to set track data response
	if (!hasPlayTimeData) {
		track_data = {
			has_track_data: false,
		}
	} else {
		track_data = {
			total_tracks_played: totalTracksPlayed,
			unique_tracks_played: uniqueTracks.length,
			average_track_length: averageTrackLength,
			longest_track: {
				name: longestTrack.name,
				artist: longestTrack.artist,
				play_time: longestTrack.playtime.substring(3),
				played_at: longestTrackStartTime,
			},
			shortest_track: {
				name: shortestTrack.name,
				artist: shortestTrack.artist,
				play_time: shortestTrack.playtime.substring(3),
				played_at: shortestTrackStartTime,
			},
			track_length_array: trackLengths,
		}
	}
  return track_data
}

module.exports = getTrackData
