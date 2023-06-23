const calculateTagHealth = require('../../shared/calculateTagHealth')

const getAlbumData = (masterTrackLog) => {
	const album_data = {
		has_album_data: false,
	}

	const trackAlbums = []
	let nullAlbumCount = 0

	masterTrackLog.forEach((track) => {
		if (!track.album || track.album === '') {
			nullAlbumCount++
		} else {
			trackAlbums.push(track.album)
		}
	})

	if (trackAlbums.length === 0) {
		return album_data
	}

	const albumCount = {}
	trackAlbums.forEach((item) => {
		albumCount[item] = (albumCount[item] || 0) + 1
	})
	const uniqueAlbums = [...new Set(trackAlbums)]

	const topAlbumsPlayed = Object.keys(albumCount).sort(
		(a, b) => albumCount[b] - albumCount[a]
	)
	const topThreeAlbums = topAlbumsPlayed.slice(0, 3)

	album_data.has_album_data = true
	album_data.unique_albums_played = uniqueAlbums.length
	album_data.top_three_albums = topThreeAlbums
	album_data.tag_health = {
		percentage_with_album_tags: calculateTagHealth(
			trackAlbums.length,
			masterTrackLog.length
		).toFixed(1),
		empty_album_tags: nullAlbumCount,
	}

	return album_data
}

module.exports = getAlbumData
