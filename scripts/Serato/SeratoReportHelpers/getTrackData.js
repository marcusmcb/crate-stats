const calculateAverageTime = require('../../shared/calculateAverageTime')
const parsePlayedAtTime = require('../../shared/parsePlayedAtTime')

const getTrackData = (masterTrackLog) => {
	const track_data = {
		has_track_data: false,
	}

	const totalTracksPlayed = masterTrackLog.length

	const uniqueTracks = []
	for (let i = 0; i < masterTrackLog.length - 1; i++) {
		if (
			masterTrackLog[i].name !== masterTrackLog[i + 1].name ||
			masterTrackLog[i].artist !== masterTrackLog[i + 1].artist
		) {
			uniqueTracks.push(masterTrackLog[i])
		}
	}

	const trackLengths = []
	let nullLengthCount = 0
	for (const track of masterTrackLog) {
		if (!track.playtime || track.playtime === '') {
			nullLengthCount++
		} else {
			trackLengths.push(track.playtime.substring(3))
		}
	}

	let averageTrackLength
	let longestTrack
	let longestTrackStartTime
	let shortestTrack
	let shortestTrackStartTime

	if (trackLengths.length === 0) {
		return track_data
	}

	const longestTrackIndex = trackLengths.reduce(
		(maxIndex, length, currentIndex) => {
			return length > trackLengths[maxIndex] ? currentIndex : maxIndex
		},
		0
	)
	longestTrack = masterTrackLog[longestTrackIndex]
	longestTrackStartTime = parsePlayedAtTime(longestTrack['start time'])

	const shortestTrackIndex = trackLengths.reduce(
		(minIndex, length, currentIndex) => {
			return length < trackLengths[minIndex] ? currentIndex : minIndex
		},
		0
	)
	shortestTrack = masterTrackLog[shortestTrackIndex]
	shortestTrackStartTime = parsePlayedAtTime(shortestTrack['start time'])

	const trackLengthArray = trackLengths.map((length) => length)

	track_data.has_track_data = true
	track_data.total_tracks_played = totalTracksPlayed
	track_data.unique_tracks_played = uniqueTracks.length
	track_data.average_track_length = calculateAverageTime(trackLengths)
	track_data.longest_track = {
		name: longestTrack.name,
		artist: longestTrack.artist,
		play_time: longestTrack.playtime.substring(3),
		played_at: longestTrackStartTime,
	}
	track_data.shortest_track = {
		name: shortestTrack.name,
		artist: shortestTrack.artist,
		play_time: shortestTrack.playtime.substring(3),
		played_at: shortestTrackStartTime,
	}
	track_data.track_length_array = trackLengthArray

	return track_data
}

module.exports = getTrackData
