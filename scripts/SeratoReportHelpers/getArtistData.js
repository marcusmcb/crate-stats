const calculateTagHealth = require('../shared/calculateTagHealth')

const getArtistData = (masterTrackLog) => {
  
  let artist_data, hasArtistData

  // array of artists
  let artistArray = []
  let nullArtistCount = 0
  masterTrackLog.forEach((track) => {
    if (!track.artist || track.artist === '') {
      nullArtistCount++
    } else {
      artistArray.push(track.artist)
    }
  })

  // add logic check for unique plays of the same artist that appear more than once
  // exclude back-to-back doubles from results
  // implement algorithm to look for word patterns in artist names

  // add logic to see if two songs with the same title by different artists were played in the same set

  let titleArray = []
  let nullTitleCount = 0
  masterTrackLog.forEach((track) => {
    if (!track.name || track.name === '') {
      nullTitleCount++
    } else {
      titleArray.push(track.name)
    }
  })

  let artistCount = {}
  let topThreeArtists = []
  let uniqueArtists, topArtistsPlayed

  if (artistArray.length === 0) {
    hasArtistData = false
  } else {
    hasArtistData = true
    artistArray.forEach((item) => {
      artistCount[item] = (artistCount[item] || 0) + 1
    })
    uniqueArtists = new Set(artistArray)

    // identify top three artists played
    topArtistsPlayed = Object.keys(artistCount)
    topArtistsPlayed.sort((a, b) => {
      return artistCount[b] - artistCount[a]
    })
    topThreeArtists.push(
      topArtistsPlayed[0],
      topArtistsPlayed[1],
      topArtistsPlayed[2]
    )
  }

  if (!hasArtistData) {
    artist_data = {
      has_artist_data: false,
    }
  } else {
    artist_data = {
      unique_artists_played: uniqueArtists.size,
      top_three_artists: [
        topThreeArtists[0],
        topThreeArtists[1],
        topThreeArtists[2],
      ],
      tag_health: {
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
      },
    }
  }
  return artist_data
}

module.exports = getArtistData
