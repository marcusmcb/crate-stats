const calculateTagHealth = require('../../shared/calculateTagHealth')

const getKeyData = (masterTrackLog) => {
	const key_data = {
		has_key_data: false,
	}

	const trackKeys = []
	let nullKeyCount = 0

	masterTrackLog.forEach((track) => {
		if (!track.key || track.key === '') {
			nullKeyCount++
		} else {
			trackKeys.push(track.key)
		}
	})

	if (trackKeys.length === 0) {
		return key_data
	}

	const rootKeys = trackKeys.map((key) => key.charAt(0))
	const rootKeyCount = rootKeys.reduce((count, key) => {
		count[key] = (count[key] || 0) + 1
		return count
	}, {})

	const mostCommonKey = Object.keys(rootKeyCount).reduce((a, b) =>
		rootKeyCount[a] > rootKeyCount[b] ? a : b
	)
	const mostCommonKeyCount = rootKeyCount[mostCommonKey]

	const leastCommonKey = Object.keys(rootKeyCount).reduce((a, b) =>
		rootKeyCount[a] < rootKeyCount[b] ? a : b
	)
	const leastCommonKeyCount = rootKeyCount[leastCommonKey]

	key_data.has_key_data = true
	key_data.most_common_key = {
		key: mostCommonKey,
		times_played: mostCommonKeyCount,
	}
	key_data.least_common_key = {
		key: leastCommonKey,
		times_played: leastCommonKeyCount,
	}
	key_data.tag_health = {
		percentage_with_key_tags: calculateTagHealth(
			trackKeys.length,
			masterTrackLog.length
		).toFixed(1),
		empty_key_tags: nullKeyCount,
	}

	return key_data
}

module.exports = getKeyData
