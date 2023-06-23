const calculateAverageTime = require('../../shared/calculateAverageTime')

const getDoublesData = (masterTrackLog) => {
	const doubles_data = {
		has_doubles_data: false,
	}

	const doublesPlayed = []
	const doublesTitles = []

	const deck1Doubles = []
	const deck2Doubles = []

	for (let i = 0; i < masterTrackLog.length - 1; i++) {
		const currentTrack = masterTrackLog[i]
		const nextTrack = masterTrackLog[i + 1]

		if (
			currentTrack.name === nextTrack.name &&
			currentTrack.deck !== nextTrack.deck
		) {
			doublesPlayed.push(currentTrack, nextTrack)
			doublesTitles.push({
				artist: currentTrack.artist,
				name: currentTrack.name,
			})
		}
	}

	if (doublesPlayed.length === 0) {
		return doubles_data
	}

	doublesPlayed.forEach((track) => {
		if (track.deck === '1') {
			deck1Doubles.push(track.playtime.substring(3))
		} else if (track.deck === '2') {
			deck2Doubles.push(track.playtime.substring(3))
		}
	})

	const deck1DoublesPlaytime = calculateAverageTime(deck1Doubles)
	const deck2DoublesPlaytime = calculateAverageTime(deck2Doubles)

	const hasPlayTimeData = masterTrackLog.some((item) =>
		Object.keys(item).includes('playtime')
	)
	const hasDeckData = masterTrackLog.some((item) =>
		Object.keys(item).includes('deck')
	)

	doubles_data.has_doubles_data = true
	doubles_data.doubles_detected = doublesPlayed.length / 2

	if (!hasPlayTimeData && !hasDeckData) {
		doubles_data.has_playtime_data = false
	} else {
		doubles_data.deck_1_doubles_playtime = deck1DoublesPlaytime
		doubles_data.deck_2_doubles_playtime = deck2DoublesPlaytime
		doubles_data.doubles_played = doublesTitles
	}

	return doubles_data
}

module.exports = getDoublesData
