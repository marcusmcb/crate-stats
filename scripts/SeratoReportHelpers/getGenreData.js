const calculateTagHealth = require('../shared/calculateTagHealth')

const getGenreData = (masterTrackLog) => {
  let genre_data, hasGenreData
  
  // array of genres (removing 'Other' from result & counting total instances in playlist)
  // add better syntax casing for multi-word genres (convert to lowercase, etc)

  let trackGenres = []
  let nullGenreCount = 0
  let otherGenreCount = 0
  let genreTagsWithValues = 0

  masterTrackLog.forEach((track) => {
    if (!track.genre || track.genre === '') {
      nullGenreCount++
    } else if (track.genre === 'Other') {
      otherGenreCount++
      genreTagsWithValues++
    } else {
      if (track.genre.includes('-')) {
        trackGenres.push(track.genre.replace('-', ' '))
        genreTagsWithValues++
      } else {
        trackGenres.push(track.genre.toLowerCase())
        genreTagsWithValues++
      }
    }
  })

  let uniqueGenres, topGenresPlayed
  let topThreeGenres = []
  let genreCount = {}

  if (trackGenres.length === 0) {
    hasGenreData = false
  } else {
    hasGenreData = true

    // identify number of unique genres played
    // add logic to identify unique genres per hour
    trackGenres.forEach((item) => {
      genreCount[item] = (genreCount[item] || 0) + 1
    })
    uniqueGenres = new Set(trackGenres)

    // identify top three genres played
    topGenresPlayed = Object.keys(genreCount)
    topGenresPlayed.sort((a, b) => {
      return genreCount[b] - genreCount[a]
    })
    topThreeGenres.push(
      topGenresPlayed[0],
      topGenresPlayed[1],
      topGenresPlayed[2]
    )
  }

  if (!hasGenreData) {
    genre_data = {
      has_genre_data: false,
    }
  } else {
    genre_data = {
      unique_genres_played: uniqueGenres.size,
      top_three_genres: [
        topThreeGenres[0],
        topThreeGenres[1],
        topThreeGenres[2],
      ],
      tag_health: {
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
      },
    }
  }
  return genre_data
}

module.exports = getGenreData
