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
  convertTime
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
    console.log(traktorData)

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
    console.log(msArray)
    
    traktorPlaylistData.master_track_log = traktorData
    traktorPlaylistData.total_tracks_played = totalTracksPlayed
  } catch (err) {
    console.log('ERR: ', err)
  }
}, 50)
