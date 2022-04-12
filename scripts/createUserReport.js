const createUserReport = (data) => {
  // fields exported by user are set in the history panel
  // any fields displayed in that panel will be exported with .csv
  // extended values are NOT available in Serato live plalyist scrape (tested & verified)

  // master array of tracks played
  const masterTrackLog = data.slice(1)

  // -----------------------------
  // playlist meta info in data[0]
  // -----------------------------

  // playlist title
  // check if title is just date or has an actual title
  const playlistTitle = data[0].name

  // serato display name
  // check if display name is ''
  const playlistArtist = data[0].artist

  // playlist start time
  const playlistStartTime = data[0]['start time']

  // playlist end time
  const playlistEndTime = data[0]['end time']

  // playlist length
  const playlistLength = data[0].playtime

  // -------------------------
  // data parsing for analysis
  // -------------------------

  // array of artists
  let artistArray = []
  masterTrackLog.forEach((track) => {
    artistArray.push(track.artist)
  })

  // array of bpms
  let bpmArray = []
  masterTrackLog.forEach((track) => {
    bpmArray.push(new Number(track.bpm))
  })

  // array of track lengths
  const trackLengths = []
  masterTrackLog.forEach((track) => {
    trackLengths.push(new Date('01/01/2020 ' + track.playtime))
  })

  // array of keys
  const trackKeys = []
  masterTrackLog.forEach((track) => {
    trackKeys.push(track.key)
  })

  // array of track year values
  const trackYears = []
  let nullYearCount = 0
  masterTrackLog.forEach((track) => {
    if (track.year != '') {
      trackYears.push(new Number(track.year))
    } else {
      nullYearCount++
    }
  })  

  // identify oldest track
  const oldestTrack = Math.min(...trackYears)  
  const newestTrack = Math.max(...trackYears)
  let oldestTrackCount = 0
  trackYears.forEach((item) => {
    // check to see if there's more than 1 track from that oldest track year
    if (item == oldestTrack) {      
      oldestTrackCount++
    }
  })
  let newestTrackCount = 0
  trackYears.forEach((item) => {
    // check to see if there's more than 1 track from that oldest track year
    if (item == newestTrack) {      
      newestTrackCount++
    }
  })

  let averageYear = trackYears.reduce((a, b) => a + b) / trackYears.length  

  // ---------------------------------------------------
  // data analysis and calculations, helper methods, etc
  // ---------------------------------------------------

  // number of tracks played
  const totalTracksPlayed = masterTrackLog.length

  // identify bpm range
  let bpmRange = {
    minBPM: Math.min(...bpmArray),
    maxBPM: Math.max(...bpmArray),
  }

  // identify key range
  let keyRange = {
    // minKey: ,
    // maxKey:
  }

  // identify most/least common keys played
  let rootKeys = []
  for (let i = 0; i < trackKeys.length; i++) {
    rootKeys.push(trackKeys[i].charAt(0))
  }
  let rootKeyCount = [...rootKeys].reduce((a, e) => {
    a[e] = a[e] ? a[e] + 1 : 1
    return a
  }, {})
  console.log('ROOT KEY COUNT: ')
  console.log(rootKeyCount)
  let mostCommonKey = Object.keys(rootKeyCount).reduce((a, b) =>
    rootKeyCount[a] > rootKeyCount[b] ? a : b
  )
  let leastCommonKey = Object.keys(rootKeyCount).reduce((a, b) =>
    rootKeyCount[a] < rootKeyCount[b] ? a : b
  )

  // identify average BPM
  let averageBPM = bpmArray.reduce((a, b) => a + b) / bpmArray.length

  // longest track
  let longestTrack = trackLengths.reduce((a, b) => (a > b ? a : b))
  const longestTrackIndex = trackLengths.indexOf(longestTrack)
  longestTrack = masterTrackLog[longestTrackIndex]

  // shortest track
  let shortestTrack = trackLengths.reduce((a, b) => (a < b ? a : b))
  const shortestTrackIndex = trackLengths.indexOf(shortestTrack)
  shortestTrack = masterTrackLog[shortestTrackIndex]

  // doubles array
  // add logic to determine consecutive doubles
  const doublesPlayed = []

  // duplicates array
  // add logic to determine non-conseuctive duplicates
  const duplicatesPlayed = []

  // "favored deck"
  // determine which deck got more play time during set
  const favoredDeckStats = []

  // console.log('CSV HEADER: ', data[0])
  // console.log('----------------------------------')
  console.log('TRACK DATA SAMPLE:')
  console.log(data[5])
  console.log('----------------------------------')
  // console.log('Playlist Artist: ', playlistArtist)
  console.log('Playlist Title: ', playlistTitle)
  console.log('Playlist Length: ', playlistLength)
  console.log('Start Time: ', playlistStartTime)
  console.log('End Time: ', playlistEndTime)
  console.log('----------------------------------')
  console.log('TRACK DATA: ')
  console.log('Total Tracks Played: ', totalTracksPlayed)
  console.log('Longest Track: ', longestTrack.playtime)
  console.log('Shortest Track: ', shortestTrack.playtime)
  console.log('----------------------------------')
  console.log('BPM DATA: ')
  console.log('Average BPM: ', averageBPM.toFixed(2))
  console.log('----------------------------------')
  console.log('KEY DATA: ')
  console.log('Most Common Key: ', mostCommonKey)
  console.log('Least Common Key: ', leastCommonKey)
  console.log('----------------------------------')  
  console.log("YEAR DATA: ")
  // console.log(trackYears)
  console.log("Oldest Track Year: ", oldestTrack)
  console.log("Count: ", oldestTrackCount)
  console.log("Newest Track Year: ", newestTrack)
  console.log("Count: ", newestTrackCount)
  console.log("Average Year: ", averageYear.toFixed())

  // year tag analysis from the set
  console.log("Number of tracks with null year values: ", nullYearCount)
  console.log("Number of tracks with proper tags: ", trackYears.length)
}

module.exports = createUserReport
