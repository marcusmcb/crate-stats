const calculateTagHealth = require('../../shared/calculateTagHealth')
const { arrayCount, sortObject } = require('../../shared/fileImportHelpers')

const getKeyData = (rekordBoxData) => {
	let trackKeys = []
	let nullKeyCount = 0

	rekordBoxData.forEach((track) => {
		if (!track.Key || track.Key === '') {
			nullKeyCount++
		} else {
			trackKeys.push(track.Key)
		}
	})

	let keysPlayed = arrayCount(trackKeys)
	let topKeysPlayed = sortObject(keysPlayed)
	let keys = Object.keys(topKeysPlayed)
	let values = Object.values(topKeysPlayed)
	let mostCommonKey = keys[0]
	let leastCommonKey = keys[keys.length - 1]

	let key_data = {
		has_key_data: trackKeys.length !== 0,
	}

	if (key_data.has_key_data) {
		key_data = {
			...key_data,
			most_common_key: {
				key: mostCommonKey,
				times_played: values[0],
			},
			least_common_key: {
				key: leastCommonKey,
				times_played: values[values.length - 1],
			},
			tag_health: {
				percentage_with_key_tags: calculateTagHealth(
					trackKeys.length,
					rekordBoxData.length
				).toFixed(1),
				empty_key_tags: nullKeyCount,
			},
		}
	}

	return key_data
}

module.exports = getKeyData
