const calculateTagHealth = require('../../shared/calculateTagHealth')

const getGenreData = (masterTrackLog) => {
	const genre_data = {
		has_genre_data: false,
	}

	const trackGenres = []
	let nullGenreCount = 0
	let otherGenreCount = 0
	let genreTagsWithValues = 0

	for (const track of masterTrackLog) {
		if (!track.genre || track.genre === '') {
			nullGenreCount++
		} else if (track.genre === 'Other') {
			otherGenreCount++
			genreTagsWithValues++
		} else {
			let genre = track.genre.toLowerCase()
			if (genre.includes('-')) {
				genre = genre.replace('-', ' ')
			}
			trackGenres.push(genre)
			genreTagsWithValues++
		}
	}

	const genreCount = {}
	const uniqueGenres = new Set(trackGenres)

	for (const genre of trackGenres) {
		genreCount[genre] = (genreCount[genre] || 0) + 1
	}

	const topGenresPlayed = Object.keys(genreCount).sort(
		(a, b) => genreCount[b] - genreCount[a]
	)
	const topThreeGenres = topGenresPlayed.slice(0, 3)

	genre_data.has_genre_data = trackGenres.length > 0
	genre_data.unique_genres_played = uniqueGenres.size
	genre_data.top_three_genres = topThreeGenres
	genre_data.tag_health = {
		percentage_with_genre_tags: calculateTagHealth(
			genreTagsWithValues,
			masterTrackLog.length
		).toFixed(1),
		percentage_with_other_as_genre: calculateTagHealth(
			otherGenreCount,
			trackGenres.length
		).toFixed(1),
		empty_genre_tags: nullGenreCount,
		other_genre_tags: otherGenreCount,
	}

	return genre_data
}

module.exports = getGenreData
