const calculateAverageTime = require('../../shared/calculateAverageTime')

const getDeckData = (masterTrackLog) => {
	let deck_data = {
		has_deck_data: false,
	}

	const deckOnePlaytimes = []
	const deckTwoPlaytimes = []
	let nullDeckCount = 0

	const hasPlayTimeData = masterTrackLog.some((item) =>
		Object.keys(item).includes('playtime')
	)
	const hasDeckData = masterTrackLog.some((item) =>
		Object.keys(item).includes('deck')
	)

	if (!hasPlayTimeData || !hasDeckData) {
		return deck_data
	}

	masterTrackLog.forEach((track) => {
		if (track.deck === '') {
			nullDeckCount++
		} else if (track.deck === '1') {
			deckOnePlaytimes.push(track.playtime.substring(3))
		} else if (track.deck === '2') {
			deckTwoPlaytimes.push(track.playtime.substring(3))
		}
	})

	const deckOneAveragePlaytime = calculateAverageTime(deckOnePlaytimes)
	const deckTwoAveragePlaytime = calculateAverageTime(deckTwoPlaytimes)

	deck_data = {
		deck_1_average: deckOneAveragePlaytime,
		deck_2_average: deckTwoAveragePlaytime,
		missing_deck_values: nullDeckCount,
	}

	return deck_data
}

module.exports = getDeckData
