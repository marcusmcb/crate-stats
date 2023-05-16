const chalk = require('chalk')
const calculateTagHealth = require('../shared/calculateTagHealth')
const {
  cleanPlaylistArray,
  cleanPlaylistKeys,
  convertMMSStoMS,
  convertMSToMMSS,
  calculateAverage,
  arrayCount,
  getUniqueGenres,
  sortObject,
  findMaxObjectValue,
} = require('../shared/fileImportHelpers')

// TRAKTOR DATA IMPORT:
//
// 1) read text file, return data, and convert to CSV
// 2) replace index icon in CSV with text string
// 3) replace any invalid JSON characters from string
// 4) parsed result as JSON and convert to array
// 5) remove unnecessary params (index, artwork) from traktor data
// 6) replace white space in object keys with underscores

const createTraktorReport = (data) => {
  console.log(chalk.green('-----------------'))
  console.log(chalk.green('  TRAKTOR DATA:'))  
  console.log(chalk.green('-----------------'))

  let traktorData = data

  // run helper methods and remove final undefined obj from array
  traktorData = cleanPlaylistArray(traktorData)
  traktorData = cleanPlaylistKeys(traktorData)
  traktorData = traktorData.slice(0, -1) 

  let traktorPlaylistData = {}

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              track data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  // total tracks played
  const totalTracksPlayed = traktorData.length

  // array of track lengths
  let trackLengths = []
  traktorData.forEach((track) => {
    trackLengths.push(track.Time)
  })

  // determine average track length for playlist
  let msArray = convertMMSStoMS(trackLengths)
  let msAverage = Math.round(calculateAverage(msArray))
  let averageTrackLength = convertMSToMMSS(msAverage)

  if (traktorData.length === 0) {
    traktorPlaylistData.track_data = {
      has_track_data: false,
    }
  } else {
    // append track data and master log to object return
    traktorPlaylistData.master_track_log = traktorData
    traktorPlaylistData.track_data = {
      total_tracks_played: totalTracksPlayed,
      average_track_length: averageTrackLength,
      shortest_track_played: {
        title: traktorData[msArray.indexOf(Math.min(...msArray))].Track_Title,
        artist: traktorData[msArray.indexOf(Math.min(...msArray))].Artist,
        length: traktorData[msArray.indexOf(Math.min(...msArray))].Time,
      },
      longest_track_played: {
        title: traktorData[msArray.indexOf(Math.max(...msArray))].Track_Title,
        artist: traktorData[msArray.indexOf(Math.max(...msArray))].Artist,
        length: traktorData[msArray.indexOf(Math.max(...msArray))].Time,
      },
    }
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              bpm data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  // array of bpms
  let bpmArray = []
  let bpmArrayCleaned = []
  let nullBPMCount = 0
  traktorData.forEach((track) => {
    if (!track['BPM'] || track['BPM'] === '') {
      nullBPMCount++
    } else {
      bpmArray.push(new Number(track['BPM']))
      bpmArrayCleaned.push(new Number(track['BPM']).toFixed())
    }
  })

  // determine most common bpm played in set
  let bpmCount = arrayCount(bpmArrayCleaned)

  // determine average bpm from playlist
  let averageBPM = bpmArray.reduce((a, b) => a + b) / bpmArray.length

  // add logic to account for when mostCommonBPM has more than 1 value
  let mostCommonBPMValues = findMaxObjectValue(bpmCount)
  const mostCommonBPM = mostCommonBPMValues[0]
  const mostCommonBPMTimesPlayed = mostCommonBPMValues[1]

  // helper method to determine biggest single BPM change in set
  let fromTrack
  let intoTrack

  const maxBPMDifference = (bpmArray) => {
    var maxDiff = 0
    for (var i = 0; i < traktorData.length - 1; i++) {
      var diff = bpmArray[i + 1] - bpmArray[i]
      if (diff > maxDiff) {
        maxDiff = diff
        fromTrack = traktorData[i]
        intoTrack = traktorData[i + 1]
      }
    }
    return maxDiff
  }

  if (bpmArray.length === 0) {
    traktorPlaylistData.bpm_data = {
      has_bpm_data: false,
    }
  } else {
    // append bpm data to object return
    traktorPlaylistData.bpm_data = {
      average_bpm: averageBPM.toFixed(),
      bpm_range: {
        minBPM: Math.min(...bpmArray),
        maxBPM: Math.max(...bpmArray),
      },
      empty_bpm_tags: nullBPMCount,
      bpm_array: bpmArray,
      most_common_bpm: {
        value: new Number(mostCommonBPM),
        times_played: mostCommonBPMTimesPlayed,
      },
      biggest_bpm_change: {
        diff: maxBPMDifference(bpmArray),
        from_track: {
          title: fromTrack.Track_Title,
          artist: fromTrack.Artist,
          bpm: fromTrack['BPM'],
        },
        to_track: {
          title: intoTrack.Track_Title,
          artist: intoTrack.Artist,
          bpm: intoTrack['BPM'],
        },
      },
    }
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              genre data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  let genres = []
  let nullGenreCount = 0
  let otherGenreCount = 0
  let genreTagsWithValues = 0
  let topThreeGenres = []

  // determine if genre value is empty or doesn't exist
  // determine if genre given is 'other'
  traktorData.forEach((track) => {
    if (!track.Genre || track.Genre === '') {
      nullGenreCount++
    } else if (track.Genre === 'Other') {
      otherGenreCount++
      genreTagsWithValues++
    } else {
      if (track.Genre.includes('-') || track.Genre.includes('/')) {
        genres.push(track.Genre.replace(/[\/-]/g, ' '))
        genreTagsWithValues++
      } else {
        genres.push(track.Genre.toLowerCase())
        genreTagsWithValues++
      }
    }
  })

  // total genres played & total unique genres played
  const genresPlayed = arrayCount(genres)

  // unique genres played in set
  let uniqueGenres = getUniqueGenres(genres)

  // top three genres played in set
  let topGenresSorted = sortObject(genresPlayed)
  topThreeGenres.push(
    Object.keys(topGenresSorted)[0],
    Object.keys(topGenresSorted)[1],
    Object.keys(topGenresSorted)[2]
  )

  if (genreTagsWithValues === 0) {
    traktorPlaylistData.genre_data = {
      has_genre_data: false,
    }
  } else {
    // append genre data to object return
    traktorPlaylistData.genre_data = {
      total_genres_played: genres.length,
      unique_genres_played: uniqueGenres.length,
      top_three_genres: topThreeGenres,
      tag_health: {
        percentage_with_genre_tags: calculateTagHealth(
          genreTagsWithValues,
          traktorData.length
        ).toFixed(1),
        percentage_with_other_as_genre: calculateTagHealth(
          otherGenreCount,
          genres.length
        ).toFixed(1),
        empty_genre_tags: nullGenreCount,
        other_genre_tags: otherGenreCount,
      },
    }
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              key data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  // array of keys
  let trackKeys = []
  let nullKeyCount = 0
  traktorData.forEach((track) => {
    if (!track.Key || track.Key === '') {
      nullKeyCount++
    } else {
      trackKeys.push(track.Key)
    }
  })

  let keysPlayed = arrayCount(trackKeys)
  let topKeysPlayed = sortObject(keysPlayed)
  let mostCommonKey = Object.keys(topKeysPlayed)[0]
  let mostCommonKeyTimesPlayed = Object.values(topKeysPlayed)[0]
  let keys = Object.keys(topKeysPlayed)
  let values = Object.values(topKeysPlayed)
  let leastCommonKey = keys[keys.length - 1]
  let leastCommonKeyTimesPlayed = values[values.length - 1]

  if (trackKeys.length === 0) {
    traktorPlaylistData.key_data = {
      has_key_data: false,
    }
  } else {
    // append key data to object return
    traktorPlaylistData.key_data = {
      total_keys_played: trackKeys.length,
      most_common_key: {
        key: mostCommonKey,
        times_played: mostCommonKeyTimesPlayed,
      },
      least_common_key: {
        key: leastCommonKey,
        times_played: leastCommonKeyTimesPlayed,
      },
      tag_health: {
        percentage_with_key_tags: calculateTagHealth(
          trackKeys.length,
          traktorData.length
        ).toFixed(1),
        empty_key_tags: nullKeyCount,
      },
    }
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              artist data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  let artistArray = []
  let nullArtistCount = 0
  traktorData.forEach((track) => {
    if (!track.Artist || track.Artist === '') {
      nullArtistCount++
    } else {
      artistArray.push(track.Artist)
    }
  })

  let ratingArray = []
  let nullRatingCount = 0
  let fiveStarTracks = []
  traktorData.forEach((track) => {
    if (!track.Rating || track.Rating === '     ') {
      nullRatingCount++
    } else if (track.Rating === '*****') {
      ratingArray.push(5)
      fiveStarTracks.push({
        title: track.Track_Title,
        artist: track.Artist,
      })
    } else if (track.Rating === '**** ') {
      ratingArray.push(4)
    } else if (track.Rating === '***  ') {
      ratingArray.push(3)
    } else if (track.Rating === '**   ') {
      ratingArray.push(2)
    } else {
      ratingArray.push(1)
    }
  })
  
  let ratingCount = arrayCount(ratingArray)

  if (ratingArray.length === 0) {
    traktorPlaylistData.rating_data = {
      has_rating_data: false,
    }
  } else {
    traktorPlaylistData.rating_data = {
      track_ratings: ratingCount,
      five_star_tracks: fiveStarTracks,
      tag_health: {
        percentage_with_ratings:
          (ratingArray.length / traktorData.length) * 100,
        percentage_with_five_star_ratings:
          (fiveStarTracks.length / traktorData.length) * 100,
      },
    }
  }  
  return traktorPlaylistData
}

module.exports = createTraktorReport
