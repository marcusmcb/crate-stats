const {
	convertMMSStoMS,
	convertMSToMMSS,
	calculateAverage,	
} = require('../../shared/fileImportHelpers')

const getTrackData = (rekordBoxData) => {
	if (!rekordBoxData.length) return { has_track_data: false }

	// total tracks played
	const totalTracksPlayed = rekordBoxData.length

	// array of track lengths
	let trackLengths = rekordBoxData.map((track) => track.Time)

	// convert to milliseconds
	const msArray = convertMMSStoMS(trackLengths)

	// determine average track length for playlist
	const msAverage = Math.round(calculateAverage(msArray))
	const averageTrackLength = convertMSToMMSS(msAverage)

	// find indices of shortest and longest tracks
	const shortestTrackIndex = msArray.indexOf(Math.min(...msArray))
	const longestTrackIndex = msArray.indexOf(Math.max(...msArray))

	// build track_data
	const track_data = {
		total_tracks_played: totalTracksPlayed,
		average_track_length: averageTrackLength,
		shortest_track_played: {
			title: rekordBoxData[shortestTrackIndex].Track_Title,
			artist: rekordBoxData[shortestTrackIndex].Artist,
			length: rekordBoxData[shortestTrackIndex].Time,
		},
		longest_track_played: {
			title: rekordBoxData[longestTrackIndex].Track_Title,
			artist: rekordBoxData[longestTrackIndex].Artist,
			length: rekordBoxData[longestTrackIndex].Time,
		},
	}

	return track_data
}

module.exports = getTrackData
