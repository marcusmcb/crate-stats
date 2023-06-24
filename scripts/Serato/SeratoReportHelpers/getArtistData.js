const calculateTagHealth = require('../../shared/calculateTagHealth')

const getArtistData = (masterTrackLog) => {
	const artist_data = {
		has_artist_data: false,
	}

	const artistArray = []
	const nullArtistCount = masterTrackLog.reduce((count, track) => {
		if (!track.artist || track.artist === '') {
			return count + 1
		}
		artistArray.push(track.artist)
		return count
	}, 0)

	function findCommonWordPairs(arr) {
		const wordPairs = {}

		for (const str of arr) {
			const words = str.split(' ')

			for (let i = 0; i < words.length - 1; i++) {
				const pair = words[i] + ' ' + words[i + 1]

				if (wordPairs[pair]) {
					wordPairs[pair]++
				} else {
					wordPairs[pair] = 1
				}
			}
		}

		const commonPairs = Object.keys(wordPairs).filter(
			(pair) => wordPairs[pair] > 1
		)

		return commonPairs
	}

	console.log(artistArray)
	console.log('pairs: ')
	console.log(findCommonWordPairs(artistArray))

	const titleArray = []
	const nullTitleCount = masterTrackLog.reduce((count, track) => {
		if (!track.name || track.name === '') {
			return count + 1
		}
		titleArray.push(track.name)
		return count
	}, 0)

	const artistCount = {}
	const uniqueArtists = new Set(artistArray)

	for (const item of artistArray) {
		artistCount[item] = (artistCount[item] || 0) + 1
	}

	const topArtistsPlayed = Object.keys(artistCount).sort(
		(a, b) => artistCount[b] - artistCount[a]
	)
	const topThreeArtists = topArtistsPlayed.slice(0, 3)

	artist_data.has_artist_data = artistArray.length > 0
	artist_data.unique_artists_played = uniqueArtists.size
	artist_data.top_three_artists = topThreeArtists
	artist_data.tag_health = {
		percentage_with_artist_tags: calculateTagHealth(
			artistArray.length,
			masterTrackLog.length
		).toFixed(1),
		empty_artist_tags: nullArtistCount,
		percentage_with_title_tags: calculateTagHealth(
			titleArray.length,
			masterTrackLog.length
		).toFixed(1),
		empty_title_tags: nullTitleCount,
	}

	return artist_data
}

module.exports = getArtistData
