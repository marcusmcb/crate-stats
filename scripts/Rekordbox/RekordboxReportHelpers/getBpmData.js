const {
	arrayCount,
	findMaxObjectValue,
} = require('../../shared/fileImportHelpers')

const getBpmData = (rekordBoxData) => {
	let bpmArray = []
	let bpmArrayCleaned = []
	let nullBPMCount = 0
	let fromTrack, intoTrack

	rekordBoxData.forEach((track, index) => {
		if (!track['BPM'] || track['BPM'] === '') {
			nullBPMCount++
		} else {
			const bpmNumber = Number(track['BPM'])
			const bpmNumberFixed = bpmNumber.toFixed()

			bpmArray.push(bpmNumber)
			bpmArrayCleaned.push(bpmNumberFixed)

			if (
				index > 0 &&
				bpmNumber - bpmArray[index - 1] >
					(intoTrack?.['BPM'] - fromTrack?.['BPM'] || 0)
			) {
				fromTrack = rekordBoxData[index - 1]
				intoTrack = track
			}
		}
	})

	let bpmCount = arrayCount(bpmArrayCleaned)
	let mostCommonBPMValues = findMaxObjectValue(bpmCount)
	const mostCommonBPM = mostCommonBPMValues[0]
	const mostCommonBPMTimesPlayed = mostCommonBPMValues[1]

	let averageBPM = bpmArray.reduce((a, b) => a + b) / bpmArray.length

	let bpm_data = {
		has_bpm_data: bpmArray.length !== 0,
	}

	if (bpm_data.has_bpm_data) {
		bpm_data = {
			...bpm_data,
			average_bpm: averageBPM.toFixed(),
			bpm_range: {
				minBPM: Math.min(...bpmArray),
				maxBPM: Math.max(...bpmArray),
			},
			empty_bpm_tags: nullBPMCount,
			bpm_array: bpmArray,
			most_common_bpm: {
				value: Number(mostCommonBPM),
				times_played: mostCommonBPMTimesPlayed,
			},
			biggest_bpm_change: {
				diff: intoTrack
					? Number(intoTrack['BPM']) - Number(fromTrack['BPM'])
					: 0,
				from_track: fromTrack
					? {
							title: fromTrack.Track_Title,
							artist: fromTrack.Artist,
							bpm: fromTrack['BPM'],
					  }
					: {},
				to_track: intoTrack
					? {
							title: intoTrack.Track_Title,
							artist: intoTrack.Artist,
							bpm: intoTrack['BPM'],
					  }
					: {},
			},
		}
	}
	return bpm_data
}

module.exports = getBpmData
