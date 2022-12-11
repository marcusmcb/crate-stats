// TRAKTOR DATA IMPORT:
//
// 1) read text file, return data, and convert to CSV
// 2) replace index icon in CSV with text string
// 3) replace any invalid JSON characters from string
// 4) parsed result as JSON and convert to array
// 5) remove unnecessary params (index, artwork) from traktor data
// 6) replace white space in object keys with underscores

const {
  convertJsonStringToArray,
  convertToCSV,
  cleanTraktorArray,
  cleanTraktorKeys,
  replaceHash,
  convertTime,
  convertMSToMMSS,
  calculateAverage
} = require('./TraktorReportHelpers/fileImportHelpers')

const fs = require('fs')

let textData

// read txt data from test file
fs.readFile('./HISTORY-2020-02-15.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    textData = data
    return data
  }
})



// try block fails without the timeout
// await result of fs.readFile()?
setTimeout(() => {
  try {
    let csvData = convertToCSV(textData)
    let cleanCSVData = replaceHash(csvData)
    cleanCSVData = cleanCSVData.replace(/[\u0000-\u001F]+/g, '')
    let parsedCSVData = JSON.parse(JSON.stringify(cleanCSVData))
    let traktorData = convertJsonStringToArray(parsedCSVData)
    traktorData = cleanTraktorArray(traktorData)
    traktorData = cleanTraktorKeys(traktorData)
    traktorData = traktorData.slice(0, -1)     

    // data parsed as array of objects and ready for analysis

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

    let msArray = convertTime(trackLengths)    
    let msAverage = Math.round(calculateAverage(msArray))    
    let averageTrackLength = convertMSToMMSS(msAverage)
    

    traktorPlaylistData.master_track_log = traktorData
    traktorPlaylistData.track_data = {
      total_tracks_played: totalTracksPlayed,
      average_track_length: averageTrackLength,
      shortest_track_played: {
        title: traktorData[msArray.indexOf(Math.min(...msArray))].Track_Title,
        artist: traktorData[msArray.indexOf(Math.min(...msArray))].Artist,
        length: traktorData[msArray.indexOf(Math.min(...msArray))].Time
      },      
      longest_track_played: {
        title: traktorData[msArray.indexOf(Math.max(...msArray))].Track_Title,
        artist: traktorData[msArray.indexOf(Math.max(...msArray))].Artist,
        length: traktorData[msArray.indexOf(Math.max(...msArray))].Time
      },
    }   

    // - - - - - - - - - - - - - - - - - - - - - - - -
    //              bpm data & analysis
    // - - - - - - - - - - - - - - - - - - - - - - - -

    let bpmArray = []
    let nullBPMCount = 0
    traktorData.forEach((track) => {
      if (!track['BPM'] || track['BPM'] === '') {
        nullBPMCount++
      } else {
        bpmArray.push(new Number(track['BPM']))
      }
    })

    let averageBPM = bpmArray.reduce((a, b) => a + b) / bpmArray.length

    traktorPlaylistData.bpm_data = {
      average_bpm: averageBPM.toFixed(),
      bpm_range: {
        minBPM: Math.min(...bpmArray),
        maxBPM: Math.max(...bpmArray)
      },
      empty_bpm_tags: nullBPMCount
    }
    console.log(traktorPlaylistData)        
  } catch (err) {
    console.log('ERR: ', err)
  }
}, 50)
