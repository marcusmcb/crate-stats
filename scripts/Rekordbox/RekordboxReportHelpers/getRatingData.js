const { arrayCount } = require('../../shared/fileImportHelpers')

const getRatingData = (rekordBoxData) => {
	let ratingArray = []
	let nullRatingCount = 0
	let fiveStarTracks = []

	rekordBoxData.forEach((track) => {
		const { Rating, Track_Title, Artist } = track
		if (!Rating || Rating.trim() === '') {
			nullRatingCount++
			return
		}

		let rating = Rating.length - Rating.replace(/\*/g, '').length
		ratingArray.push(rating)

		if (rating === 5) {
			fiveStarTracks.push({
				title: Track_Title,
				artist: Artist,
			})
		}
	})

	let ratingCount = arrayCount(ratingArray)

	let rating_data = {
		has_rating_data: ratingArray.length > 0,
	}

	if (rating_data.has_rating_data) {
		rating_data = {
			...rating_data,
			track_ratings: ratingCount,
			five_star_tracks: fiveStarTracks,
			tag_health: {
				percentage_with_ratings:
					(ratingArray.length / rekordBoxData.length) * 100,
				percentage_with_five_star_ratings:
					(fiveStarTracks.length / rekordBoxData.length) * 100,
			},
		}
	}

	return rating_data
}

module.exports = getRatingData
