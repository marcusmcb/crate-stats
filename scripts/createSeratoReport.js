const chalk = require('chalk')
const calculateAverageTime = require('./calculateAverageTime')

const createSeratoReport = (data) => {
  console.log(data[0])

  const noDataGiven = 'No Data Given'

  // - - - - - - - - - - - - - - - - - - - - - - - - 
  //              set playlist metadata
  // - - - - - - - - - - - - - - - - - - - - - - - - 
  
  const playlistTitle = data[0].name
  // check if display name is ''
  const playlistArtist = data[0].artist
  const playlistStartTime = data[0]['start time']
  const playlistEndTime = data[0]['end time']
  const playlistLength = data[0].playtime
  const playlistLengthParsed = new Date('01/01/2020 ' + data[0].playtime)

  // - - - - - - - - - - - - - - - - - - - - - - - - 
  //              set master track list
  // - - - - - - - - - - - - - - - - - - - - - - - - 

  const masterTrackLog = data.slice(1)
  masterTrackLog.pop()
  console.log(masterTrackLog[5])

  // - - - - - - - - - - - - - - - - - - - - - - - - 
  //              set arrays by data value
  // - - - - - - - - - - - - - - - - - - - - - - - - 

  // array of artists
  let artistArray = [] 
  let nullArtistCount = 0
  masterTrackLog.forEach((track) => {
    if (!track.artist || track.artist === '') {
      nullArtistCount++
    } else {
      artistArray.push(track.artist)
    }    
  })
  
  // array of bpms
  let bpmArray = []
  let nullBPMCount = 0
  masterTrackLog.forEach((track) => {
    if (!track.bpm || track.bpm === '') {
      nullBPMCount++
    } else {
      bpmArray.push(track.bpm)
    }
  })
  
  // array of years
  let trackYears = []
  let nullYearCount = 0
  masterTrackLog.forEach((track) => {
    if (!track.year || track.year === '') {
      nullYearCount++
    } else {
      trackYears.push(track.year)
    }
  })

  // array of genres
  let trackGenres = []
  let nullGenreCount = 0
  let otherGenreCount = 0
  masterTrackLog.forEach((track) => {
    if (!track.genre || track.genre === '') {
      nullGenreCount++
    } else if (track.genre === 'Other') {
      otherGenreCount++
    } else {
      trackGenres.push(track.genre)
    }
  })

  // array of keys
  let trackKeys = []
  let nullKeyCount = 0
  masterTrackLog.forEach((track) => {
    if (!track.key || track.key === '') {
      nullKeyCount++
    } else {
      trackKeys.push(track.key)
    }
  })

  // array of bitrates
  let trackBitrates = []
  let nullBitrateCount = 0
  masterTrackLog.forEach((track) => {
    if (!track.bitrate || track.bitrate === '') {
      nullBitrateCount++
    } else {
      trackBitrates.push(track.bitrate)
    }
  })

  // array of track lengths
  let trackLengths = []
  let nullLengthCount = 0
  masterTrackLog.forEach((track) => {
    if (!track.playtime || track.playtime === '') {
      nullLengthCount++
    } else {
      trackLengths.push(track.playtime)
    }
  })  

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
  console.log(trackAlbums)
  console.log(nullAlbumCount)



}

module.exports = createSeratoReport