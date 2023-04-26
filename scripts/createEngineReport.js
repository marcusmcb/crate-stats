// Path: scripts\createEngineReport.js
const fs = require('fs')
const path = require('path')

const removeQuotes = (str) => {
  if (str.startsWith('"') && str.endsWith('"')) {
    return str.slice(1, -1)
  }
  return str
}

const createEngineReport = () => {
  let engineData = fs.readFileSync(
    path.join(__dirname, './data/engine_data/House.csv'),
    'utf8'
  )
  let engineDataArray = engineData.split('\n')
  let engineDataObjects = []  
  engineDataArray.forEach((track, index) => {
    if (index === 0) return // Skip the header row
    let trackArray = track.split(',')    
    if (Object.entries(trackArray).length === 1) return
    let trackObject = {
      track_number: removeQuotes(trackArray[0]),
      title: removeQuotes(trackArray[1]),
      artist: removeQuotes(trackArray[2]),
      album: removeQuotes(trackArray[3]),
      length: removeQuotes(trackArray[4]),
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
