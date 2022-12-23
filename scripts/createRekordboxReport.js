const calculateTagHealth = require('./shared/calculateTagHealth')
const {
  cleanPlaylistArray,
  cleanPlaylistKeys,
  convertMMSStoMS,
  convertMSToMMSS,
  calculateAverage,
  arrayCount,
  getUniqueGenres,
  sortObject,
  getTimeFromMS,
  addMSArray
} = require('./shared/fileImportHelpers')

const createRekordboxReport = (data) => {
  
  let rekordBoxData = data

  // data cleaning
  rekordBoxData = cleanPlaylistKeys(rekordBoxData)
  rekordBoxData = cleanPlaylistArray(rekordBoxData)  
  rekordBoxData = rekordBoxData.slice(0, -1)  

  // set final return object as a dummy arr
  let rekordBoxPlaylistData = {}

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              track data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  // total tracks played
  const totalTracksPlayed = rekordBoxData.length

  // array of track lengths
  let trackLengths = []
  rekordBoxData.forEach((track) => {
    trackLengths.push(track.Time)
  }) 

  // determine average track length for playlist
  // determine set length from track lengths sum
  const msArray = convertMMSStoMS(trackLengths)  
  const setLengthMS = addMSArray(msArray)  
  const setLengthValues = getTimeFromMS(setLengthMS)
  const msAverage = Math.round(calculateAverage(msArray))
  const averageTrackLength = convertMSToMMSS(msAverage)

  // append track data and master log to object return
  rekordBoxPlaylistData.master_track_log = rekordBoxData
  rekordBoxPlaylistData.playlist_data = {
    set_length: {
      hours: setLengthValues.hours,
      minutes: setLengthValues.minutes,
      seconds: setLengthValues.seconds
    }
  }
  rekordBoxPlaylistData.track_data = {
    total_tracks_played: totalTracksPlayed,
    average_track_length: averageTrackLength,
    shortest_track_played: {
      title: rekordBoxData[msArray.indexOf(Math.min(...msArray))].Track_Title,
      artist: rekordBoxData[msArray.indexOf(Math.min(...msArray))].Artist,
      length: rekordBoxData[msArray.indexOf(Math.min(...msArray))].Time,
    },
    longest_track_played: {
      title: rekordBoxData[msArray.indexOf(Math.max(...msArray))].Track_Title,
      artist: rekordBoxData[msArray.indexOf(Math.max(...msArray))].Artist,
      length: rekordBoxData[msArray.indexOf(Math.max(...msArray))].Time,
    },
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              bpm data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  // array of bpms
  let bpmArray = []
  let nullBPMCount = 0
  rekordBoxData.forEach((track) => {
    if (!track['BPM'] || track['BPM'] === '') {
      nullBPMCount++
    } else {
      bpmArray.push(new Number(track['BPM']))
    }
  })

  // determine average bpm from playlist
  let averageBPM = bpmArray.reduce((a, b) => a + b) / bpmArray.length

  // append bpm data to object return
  rekordBoxPlaylistData.bpm_data = {
    average_bpm: averageBPM.toFixed(),
    bpm_range: {
      minBPM: Math.min(...bpmArray),
      maxBPM: Math.max(...bpmArray),
    },
    empty_bpm_tags: nullBPMCount,
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
  rekordBoxData.forEach((track) => {
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

  // append genre data to object return
  rekordBoxPlaylistData.genre_data = {
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
        genres.length
      ).toFixed(1),
      empty_genre_tags: nullGenreCount,
      other_genre_tags: otherGenreCount,
    },
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              key data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  // array of keys
  let trackKeys = []
  let nullKeyCount = 0
  rekordBoxData.forEach((track) => {
    if (!track.Key || track.Key === '') {
      nullKeyCount++
    } else {
      trackKeys.push(track.Key)
    }
  })

  // determine most and least common keys and times each played
  let keysPlayed = arrayCount(trackKeys)
  let topKeysPlayed = sortObject(keysPlayed)
  let mostCommonKey = Object.keys(topKeysPlayed)[0]
  let mostCommonKeyTimesPlayed = Object.values(topKeysPlayed)[0]
  let keys = Object.keys(topKeysPlayed)
  let values = Object.values(topKeysPlayed)
  let leastCommonKey = keys[keys.length - 1]
  let leastCommonKeyTimesPlayed = values[values.length - 1]

  // append key data to export
  rekordBoxPlaylistData.key_data = {
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
        rekordBoxData.length
      ).toFixed(1),
      empty_key_tags: nullKeyCount,
    },
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              artist data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  let artistArray = []
  let nullArtistCount = 0
  rekordBoxData.forEach((track) => {
    if (!track.Artist || track.Artist === '') {
      nullArtistCount++
    } else {
      artistArray.push(track.Artist)
    }
  })

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              bitrate data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  let lowerBitrateTracks = []

  // logic to check for any lower bitrate tracks < 320 kbps
  rekordBoxData.forEach((track) => {
    if (!track.Bitrate || track.Bitrate === '') {
      nullBitrateCount++
    } else {
      let bitRate = +track.Bitrate.split(' ')[0]
      if (bitRate < 320) {
        lowerBitrateTracks.push(track)
      }
    }
  })

  // logic to check for different file format useage based
  // on bit depth (file type available in RB export?)

  let bitrateArray = []
  let nullBitrateCount = 0
  rekordBoxData.forEach((track) => {
    if (!track.Bitrate || track.Bitrate === '') {
      nullBitrateCount++
    } else {
      bitrateArray.push(track.Bitrate)
    }
  })

  // append bit rate data to export
  rekordBoxPlaylistData.bitrate_data = {
    sub320_tracks: lowerBitrateTracks,
    empty_bitrate_tags: nullBitrateCount,
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              year data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  let yearArray = []
  let nullYearCount = 0

  // get null/malformed year count and populate year array
  rekordBoxData.forEach((track) => {
    if (!track.Year || track.Year === '' || track.Year === '0') {
      nullYearCount++
    } else {
      yearArray.push(new Number(track.Year))
    }
  })

  let oldestTracks = []
  let newestTracks = []

  // determine oldest and most recent years played in set
  let oldestTrackYear = Math.min(...yearArray)
  let newestTrackYear = Math.max(...yearArray)

  // populate oldest/newest track arrays
  rekordBoxData.forEach((track) => {
    if (+track.Year === oldestTrackYear) {
      oldestTracks.push(track)
    } else if (+track.Year === newestTrackYear) {
      newestTracks.push(track)
    }
  })

  // object with the count of each year played
  let yearsPlayed = arrayCount(yearArray)

  function averageYear(years) {
    var sum = 0;
    for (var i = 0; i < years.length; i++) {
      sum += years[i];
    }
    var avg = sum / years.length;
    return avg;
  }

  console.log(Math.round(averageYear(yearArray)))

  // append year data to export
  rekordBoxPlaylistData.year_data = {
    years_played: yearsPlayed,
    average_year: Math.round(averageYear(yearArray)),
    oldest_tracks: {
      year: oldestTrackYear,
      times_played: oldestTracks.length,
      tracks_played: oldestTracks,
    },
    newest_tracks: {
      year: newestTrackYear,
      times_played: newestTracks.length,
      tracks_played: newestTracks,
    },
    tag_health: {
      percentage_with_year_tags: calculateTagHealth(
        yearArray.length,
        rekordBoxData.length
      ).toFixed(1),
      empty_year_tags: nullYearCount,
    },
  }

  // console.log(rekordBoxPlaylistData.year_data.oldest_tracks.tracks_played)
  return rekordBoxPlaylistData
}

module.exports = createRekordboxReport
