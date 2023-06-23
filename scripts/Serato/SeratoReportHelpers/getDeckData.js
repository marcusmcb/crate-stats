const calculateAverageTime = require('../../shared/calculateAverageTime')

const getDeckData = (masterTrackLog) => {
	let deck_data

	let deckOnePlaytimes = []
	let deckTwoPlaytimes = []
	let deckOneAveragePlaytime, deckTwoAveragePlaytime
	let nullDeckCount = 0

	// check if user export contains playtime data - w/o it, the deck analysis is useless
	// add logic if absent to collect and display the number of tracks played on each deck
	if (!hasPlayTimeData) {
		seratoPlaylistAnalysis.deck_data = {
			has_deck_data: false,
		}
		// check if user export does NOT contain deck data
	} else if (
		!masterTrackLog.some((item) => Object.keys(item).includes('deck'))
	) {
		hasDeckData = false
		seratoPlaylistAnalysis.deck_data = {
			has_deck_data: false,
		}
	} else {
		hasDeckData = true
		masterTrackLog.forEach((track) => {
			if (track.deck === '') {
				nullDeckCount++
			} else if (track.deck === '1') {
				deckOnePlaytimes.push(track.playtime.substring(3))
			} else if (track.deck === '2') {
				deckTwoPlaytimes.push(track.playtime.substring(3))
			}
		})

		deckOneAveragePlaytime = calculateAverageTime(deckOnePlaytimes)
		deckTwoAveragePlaytime = calculateAverageTime(deckTwoPlaytimes)

		if (!hasDeckData) {
			deck_data = {
				has_deck_data: false,
			}
		} else {
			deck_data = {
				deck_1_average: deckOneAveragePlaytime,
				deck_2_average: deckTwoAveragePlaytime,
				missing_deck_values: nullDeckCount,
			}
		}
	}

	return deck_data
}

module.exports = getDeckData
