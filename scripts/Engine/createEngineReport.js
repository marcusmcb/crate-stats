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
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60  
  const formattedMinutes = (minutes < 10 ? '0' : '') + minutes
  const formattedSeconds = (remainingSeconds < 10 ? '0' : '') + remainingSeconds

  // Format the output string
  const output = formattedMinutes + ':' + formattedSeconds
  return output
}

function replaceCommasWithWhiteSpace(str) {
  return str.replace(/,/g, ' ')
}

const createEngineReport = () => {
  let engineData = fs.readFileSync(
    path.join(__dirname, '../data/engine_data/04_02_2022_Perth.csv'),
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
      title: replaceCommasWithWhiteSpace(removeQuotes(trackArray[1])),
      artist: replaceCommasWithWhiteSpace(removeQuotes(trackArray[2])),
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
  return engineDataObjects
}

module.exports = createEngineReport
