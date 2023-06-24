const calculateTagHealth = require('../../shared/calculateTagHealth')
const {
	arrayCount,
	getUniqueGenres,
	sortObject,
} = require('../../shared/fileImportHelpers')

const getGenreData = (rekordBoxData) => {
	let genres = []
	let nullGenreCount = 0
	let otherGenreCount = 0
	let genreTagsWithValues = 0

	rekordBoxData.forEach((track) => {
		if (!track.Genre || track.Genre === '') {
			nullGenreCount++
		} else {
			genreTagsWithValues++

			if (track.Genre === 'Other') {
				otherGenreCount++
			} else {
				let genre = track.Genre.toLowerCase()
				if (genre.includes('-') || genre.includes('/')) {
					genre = genre.replace(/[\/-]/g, ' ')
				}

				genres.push(genre)
			}
		}
	})

	let genresPlayed = arrayCount(genres)
	let uniqueGenres = getUniqueGenres(genres)

	let topGenresSorted = sortObject(genresPlayed)
	let topThreeGenres = Object.keys(topGenresSorted).slice(0, 3)

	let genre_data = {
		has_genre_data: genreTagsWithValues !== 0,
	}

	if (genre_data.has_genre_data) {
		genre_data = {
			...genre_data,
			total_genres_played: genres.length,
			unique_genres_played: uniqueGenres.length,
			top_three_genres: topThreeGenres,
			tag_health: {
				percentage_with_genre_tags: calculateTagHealth(
					genreTagsWithValues,
					rekordBoxData.length
				).toFixed(1),
				percentage_with_other_as_genre: calculateTagHealth(
					otherGenreCount,
					rekordBoxData.length
				).toFixed(1),
				empty_genre_tags: nullGenreCount,
				other_genre_tags: otherGenreCount,
			},
		}
	}
	return genre_data
}

module.exports = getGenreData
