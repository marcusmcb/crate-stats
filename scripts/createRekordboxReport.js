const fs = require('fs')

const {
  convertJsonStringToArray,
  convertToCSV,
  cleanPlaylistArray,
  cleanPlaylistKeys,
  replaceHash,
  convertMMSStoMS,
  convertMSToMMSS,
  calculateAverage,
  arrayCount,
  getUniqueGenres,
  sortObject,
} = require('./shared/fileImportHelpers')

const calculateTagHealth = require('./shared/calculateTagHealth')

let textData

// read txt data from test file
fs.readFile(
  './_rekordbox_sample_data/rekordbox_sample_03.txt',
  'utf8',
  (err, data) => {
    if (err) {
      console.log(err)
    } else {
      textData = data
      return data
    }
  }
)

setTimeout(() => {
  let csvData = convertToCSV(textData)
  let cleanCSVData = replaceHash(csvData)
  cleanCSVData = cleanCSVData.replace(/[\u0000-\u001F]+/g, '')
  let parsedCSVData = JSON.parse(JSON.stringify(cleanCSVData))
  let rekordBoxData = convertJsonStringToArray(parsedCSVData)
  rekordBoxData = cleanPlaylistKeys(rekordBoxData)
  rekordBoxData = cleanPlaylistArray(rekordBoxData)
  rekordBoxData = rekordBoxData.slice(0, -1)

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
  let msArray = convertMMSStoMS(trackLengths)
  let msAverage = Math.round(calculateAverage(msArray))
  let averageTrackLength = convertMSToMMSS(msAverage)

  // append track data and master log to object return
  rekordBoxPlaylistData.master_track_log = rekordBoxData
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
  
  let keysPlayed = arrayCount(trackKeys)
  let topKeysPlayed = sortObject(keysPlayed)
  let mostCommonKey = Object.keys(topKeysPlayed)[0]
  let mostCommonKeyTimesPlayed = Object.values(topKeysPlayed)[0]
  let keys = Object.keys(topKeysPlayed)
  let values = Object.values(topKeysPlayed)
  let leastCommonKey = keys[keys.length - 1]
  let leastCommonKeyTimesPlayed = values[values.length - 1]

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

  console.log(rekordBoxPlaylistData)
}, 100)
