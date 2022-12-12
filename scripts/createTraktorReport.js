// TRAKTOR DATA IMPORT:
//
// 1) read text file, return data, and convert to CSV
// 2) replace index icon in CSV with text string
// 3) replace any invalid JSON characters from string
// 4) parsed result as JSON and convert to array
// 5) remove unnecessary params (index, artwork) from traktor data
// 6) replace white space in object keys with underscores
const createTraktorReport = (data) => {
  console.log('HERE?', data)
}

module.exports = createTraktorReport

// const {
//   convertJsonStringToArray,
//   convertToCSV,
//   cleanPlaylistArray,
//   cleanPlaylistKeys,
//   replaceHash,
//   convertMMSStoMS,
//   convertMSToMMSS,
//   calculateAverage,
//   arrayCount,
//   getUniqueGenres,
//   sortObject,
// } = require('./shared/fileImportHelpers')

// const fs = require('fs')
// const calculateTagHealth = require('./shared/calculateTagHealth')

// let textData

// // read txt data from test file
// fs.readFile('./HISTORY-2020-02-15.txt', 'utf8', (err, data) => {
//   if (err) {
//     console.log(err)
//   } else {
//     textData = data
//     return data
//   }
// })

// // try block fails without the timeout
// // await result of fs.readFile()?
// setTimeout(() => {
//   try {
//     let csvData = convertToCSV(textData)
//     let cleanCSVData = replaceHash(csvData)
//     cleanCSVData = cleanCSVData.replace(/[\u0000-\u001F]+/g, '')
//     let parsedCSVData = JSON.parse(JSON.stringify(cleanCSVData))
//     let traktorData = convertJsonStringToArray(parsedCSVData)

//     // run helper methods and remove final undefined obj from array
//     traktorData = cleanPlaylistArray(traktorData)
//     traktorData = cleanPlaylistKeys(traktorData)
//     traktorData = traktorData.slice(0, -1)

//     let traktorPlaylistData = {}

//     // - - - - - - - - - - - - - - - - - - - - - - - -
//     //              track data & analysis
//     // - - - - - - - - - - - - - - - - - - - - - - - -

//     // total tracks played
//     const totalTracksPlayed = traktorData.length

//     // array of track lengths
//     let trackLengths = []
//     traktorData.forEach((track) => {
//       trackLengths.push(track.Time)
//     })

//     // determine average track length for playlist
//     let msArray = convertMMSStoMS(trackLengths)
//     let msAverage = Math.round(calculateAverage(msArray))
//     let averageTrackLength = convertMSToMMSS(msAverage)

//     // append track data and master log to object return
//     traktorPlaylistData.master_track_log = traktorData
//     traktorPlaylistData.track_data = {
//       total_tracks_played: totalTracksPlayed,
//       average_track_length: averageTrackLength,
//       shortest_track_played: {
//         title: traktorData[msArray.indexOf(Math.min(...msArray))].Track_Title,
//         artist: traktorData[msArray.indexOf(Math.min(...msArray))].Artist,
//         length: traktorData[msArray.indexOf(Math.min(...msArray))].Time,
//       },
//       longest_track_played: {
//         title: traktorData[msArray.indexOf(Math.max(...msArray))].Track_Title,
//         artist: traktorData[msArray.indexOf(Math.max(...msArray))].Artist,
//         length: traktorData[msArray.indexOf(Math.max(...msArray))].Time,
//       },
//     }

//     // - - - - - - - - - - - - - - - - - - - - - - - -
//     //              bpm data & analysis
//     // - - - - - - - - - - - - - - - - - - - - - - - -

//     // array of bpms
//     let bpmArray = []
//     let nullBPMCount = 0
//     traktorData.forEach((track) => {
//       if (!track['BPM'] || track['BPM'] === '') {
//         nullBPMCount++
//       } else {
//         bpmArray.push(new Number(track['BPM']))
//       }
//     })

//     // determine average bpm from playlist
//     let averageBPM = bpmArray.reduce((a, b) => a + b) / bpmArray.length

//     // append bpm data to object return
//     traktorPlaylistData.bpm_data = {
//       average_bpm: averageBPM.toFixed(),
//       bpm_range: {
//         minBPM: Math.min(...bpmArray),
//         maxBPM: Math.max(...bpmArray),
//       },
//       empty_bpm_tags: nullBPMCount,
//     }

//     // - - - - - - - - - - - - - - - - - - - - - - - -
//     //              genre data & analysis
//     // - - - - - - - - - - - - - - - - - - - - - - - -

//     let genres = []
//     let nullGenreCount = 0
//     let otherGenreCount = 0
//     let genreTagsWithValues = 0
//     let topThreeGenres = []

//     // determine if genre value is empty or doesn't exist
//     // determine if genre given is 'other'
//     traktorData.forEach((track) => {
//       if (!track.Genre || track.Genre === '') {
//         nullGenreCount++
//       } else if (track.Genre === 'Other') {
//         otherGenreCount++
//         genreTagsWithValues++
//       } else {
//         if (track.Genre.includes('-') || track.Genre.includes('/')) {
//           genres.push(track.Genre.replace(/[\/-]/g, ' '))
//           genreTagsWithValues++
//         } else {
//           genres.push(track.Genre.toLowerCase())
//           genreTagsWithValues++
//         }
//       }
//     })

//     // total genres played & total unique genres played
//     const genresPlayed = arrayCount(genres)

//     // unique genres played in set
//     let uniqueGenres = getUniqueGenres(genres)

//     // top three genres played in set
//     let topGenresSorted = sortObject(genresPlayed)
//     topThreeGenres.push(
//       Object.keys(topGenresSorted)[0],
//       Object.keys(topGenresSorted)[1],
//       Object.keys(topGenresSorted)[2]
//     )

//     // append genre data to object return
//     traktorPlaylistData.genre_data = {
//       total_genres_played: genres.length,
//       unique_genres_played: uniqueGenres.length,
//       top_three_genres: topThreeGenres,
//       tag_health: {
//         percentage_with_genre_tags: calculateTagHealth(
//           genreTagsWithValues,
//           traktorData.length
//         ).toFixed(1),
//         percentage_with_other_as_genre: calculateTagHealth(
//           otherGenreCount,
//           genres.length
//         ).toFixed(1),
//         empty_genre_tags: nullGenreCount,
//         other_genre_tags: otherGenreCount,
//       },
//     }
//     console.log(traktorPlaylistData)

//     // - - - - - - - - - - - - - - - - - - - - - - - -
//     //              key data & analysis
//     // - - - - - - - - - - - - - - - - - - - - - - - -

//     // array of keys
//     let trackKeys = []
//     let nullKeyCount = 0
//     traktorData.forEach((track) => {
//       if (!track.Key || track.Key === '') {
//         nullKeyCount++
//       } else {
//         trackKeys.push(track.Key)
//       }
//     })

//     console.log(trackKeys)

//     let keysPlayed = arrayCount(trackKeys)
//     let topKeysPlayed = sortObject(keysPlayed)
//     let mostCommonKey = Object.keys(topKeysPlayed)[0]
//     let mostCommonKeyTimesPlayed = Object.values(topKeysPlayed)[0]
//     let keys = Object.keys(topKeysPlayed)
//     let values = Object.values(topKeysPlayed)
//     let leastCommonKey = keys[keys.length - 1]
//     let leastCommonKeyTimesPlayed = values[values.length - 1]

//     traktorPlaylistData.key_data = {
//       most_common_key: {
//         key: mostCommonKey,
//         times_played: mostCommonKeyTimesPlayed,
//       },
//       least_common_key: {
//         key: leastCommonKey,
//         times_played: leastCommonKeyTimesPlayed,
//       },
//       tag_health: {
//         percentage_with_key_tags: calculateTagHealth(
//           trackKeys.length,
//           traktorData.length
//         ).toFixed(1),
//         empty_key_tags: nullKeyCount,
//       },
//     }

//     // - - - - - - - - - - - - - - - - - - - - - - - -
//     //              artist data & analysis
//     // - - - - - - - - - - - - - - - - - - - - - - - -

//     let artistArray = []
//     let nullArtistCount = 0
//     traktorData.forEach((track) => {
//       if (!track.Artist || track.Artist === '') {
//         nullArtistCount++
//       } else {
//         artistArray.push(track.Artist)
//       }
//     })

//     console.log(artistArray)

//     return traktorPlaylistData

//   } catch (err) {
//     console.log('ERR: ', err)
//   }

// }, 50)
