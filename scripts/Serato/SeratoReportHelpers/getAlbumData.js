const calculateTagHealth = require('../../shared/calculateTagHealth')

const getAlbumData = (masterTrackLog) => {
  let album_data, hasAlbumData
  // array of albums
  let trackAlbums = []
  let nullAlbumCount = 0
  masterTrackLog.forEach((track) => {
    if (!track.album || track.album === '') {
      nullAlbumCount++
    } else {
      trackAlbums.push(track.album)
    }
  })

  let albumCount = {}
  let topThreeAlbums = []
  let uniqueAlbums, topAlbumsPlayed

  if (trackAlbums.length === 0) {
    hasAlbumData = false
  } else {
    hasAlbumData = true

    trackAlbums.forEach((item) => {
      albumCount[item] = (albumCount[item] || 0) + 1
    })
    uniqueAlbums = new Set(trackAlbums)

    // identify top three genres played
    topAlbumsPlayed = Object.keys(albumCount)
    topAlbumsPlayed.sort((a, b) => {
      return albumCount[b] - albumCount[a]
    })
    topThreeAlbums.push(
      topAlbumsPlayed[0],
      topAlbumsPlayed[1],
      topAlbumsPlayed[2]
    )
  }

  if (!hasAlbumData) {
    album_data = {
      has_album_data: false,
    }
  } else {
    album_data = {
      unique_albums_played: uniqueAlbums.size,
      top_three_albums: [
        topThreeAlbums[0],
        topThreeAlbums[1],
        topThreeAlbums[2],
      ],
      tag_health: {
        percentage_with_album_tags: calculateTagHealth(
          trackAlbums.length,
          masterTrackLog.length
        ).toFixed(1),
        empty_album_tags: nullAlbumCount,
      },
    }
  }
  return album_data
}

module.exports = getAlbumData
