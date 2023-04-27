// Path: scripts\createEngineReport.js
const fs = require('fs')
const path = require('path')

const removeQuotes = (str) => {
  if (str.startsWith('"') && str.endsWith('"')) {
    return str.slice(1, -1)
  }
  return str
}

// add method to remove commas from album field
// causing issue where text after comma appears
// in the next/wrong field

const convertSecondsToMMSS = (seconds) => {
  var minutes = Math.floor(seconds / 60) // Get the number of minutes
  var remainingSeconds = seconds % 60 // Get the remaining seconds

  // Format the minutes and seconds with leading zeros if necessary
  var formattedMinutes = (minutes < 10 ? '0' : '') + minutes
  var formattedSeconds = (remainingSeconds < 10 ? '0' : '') + remainingSeconds

  // Format the output string
  var output = formattedMinutes + ':' + formattedSeconds
  return output
}

function replaceCommasWithWhiteSpace(str) {
  return str.replace(/,/g, ' ')
}

const createEngineReport = () => {
  let engineData = fs.readFileSync(
    path.join(__dirname, './data/engine_data/04_02_2022_Perth.csv'),
    'utf8'
  )

  let engineDataArray = engineData.split('\n')
  let engineDataObjects = []

  engineDataArray.forEach((track, index) => {
    if (index === 0) return // Skip the header row
    let trackArray = track.split(',')
    if (Object.entries(trackArray).length === 1) return
    // console.log(convertSecondsToMMSS(removeQuotes(trackArray[4])))
    let trackObject = {
      track_number: removeQuotes(trackArray[0]),
      title: removeQuotes(trackArray[1]),
      artist: removeQuotes(trackArray[2]),
      album: replaceCommasWithWhiteSpace(removeQuotes(trackArray[3])),
      length: convertSecondsToMMSS(removeQuotes(trackArray[4])),
      bpm: removeQuotes(trackArray[5]),
      genre: removeQuotes(trackArray[6]),
      label: removeQuotes(trackArray[7]),
      composer: removeQuotes(trackArray[8]),
      remixer: removeQuotes(trackArray[9]),
      year: removeQuotes(trackArray[10]),
    }
    engineDataObjects.push(trackObject)
  })
  console.log('. . . . . . .')
  console.log('. . engine . .')
  console.log(engineDataObjects)
  return engineDataObjects
}

module.exports = createEngineReport
