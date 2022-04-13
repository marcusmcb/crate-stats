const chalk = require('chalk')
const calculateAverageTime = require('./calculateAverageTime')

const createUserReport = (data) => {
  // fields exported by user are set in the history panel
  // any fields displayed in that panel will be exported with .csv
  // extended values are NOT available in Serato live plalyist scrape (tested & verified)

  // master array of tracks played
  const masterTrackLog = data.slice(1)

  // -----------------------------
  // playlist meta info in data[0]
  // -----------------------------

  // check if title is just date or has an actual title
  const playlistTitle = data[0].name
  // check if display name is ''
  const playlistArtist = data[0].artist
  const playlistStartTime = data[0]['start time']
  const playlistEndTime = data[0]['end time']
  const playlistLength = data[0].playtime
  const playlistLengthParsed = new Date('01/01/2020 ' + data[0].playtime)

  // -------------------------
  // data arrays for parsing
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
    // console.log(new Date('01/01/2020 ' + track.playtime))
    trackLengths.push(track.playtime)
  })

  // array of keys
  const trackKeys = []
  let tempKeys = []
  let nullKeyCount = 0
  masterTrackLog.forEach((track) => {
    if (track.key != '') {
      // add validation to check which key format the data is in
      trackKeys.push(track.key)
      tempKeys.push({
        rootKey: track.key.charAt(0),
        keyTone: track.key.substring(1),
        playtime: track.playtime
      })
    } else {
      nullKeyCount++
    }
  })  

  // array of track year values
  const trackYears = []
  let nullYearCount = 0
  masterTrackLog.forEach((track) => {
    if (track.year != '') {
      // add validation to check year is in YYYY format
      // count rejected year tags
      trackYears.push(new Number(track.year))
    } else {
      nullYearCount++
    }
  })

  // array of genre tags
  let trackGenres = []  
  let nullGenreCount = 0
  masterTrackLog.forEach((track) => {
    if (track.genre != '') {
      trackGenres.push(track.genre)
    } else {
      nullGenreCount++
    }
  })  

  let tempTrackGenres = []
  let tempNullGenreCount = 0
  masterTrackLog.forEach((track) => {
    if (track.genre != '') {
      let found = tempTrackGenres.some(item => item.genre === track.genre)
      if (!found) {
        tempTrackGenres.push({
          genre: track.genre,
          count: 1
        })
      } else {
        tempTrackGenres[track.genre].count = tempTrackGenres[track.genre].count + 1
      }
    } else {  
      tempNullGenreCount++
    }
  })

  console.log(tempTrackGenres)

  // -------------------------------------
  //      track / year stats
  // -------------------------------------

  // number of tracks played
  const totalTracksPlayed = masterTrackLog.length
  const calculateTagHealth = (val1, val2) => {
    return (val1 / val2) * 100
  }

  // identify average track length
  let averageTrackLength = calculateAverageTime(trackLengths)

  // identify average year
  let averageYear = trackYears.reduce((a, b) => a + b) / trackYears.length

  // longest track
  let longestTrack = trackLengths.reduce((a, b) => (a > b ? a : b))
  const longestTrackIndex = trackLengths.indexOf(longestTrack)
  longestTrack = masterTrackLog[longestTrackIndex]
  let longestTrackStartTime = longestTrack['start time']

  // shortest track
  let shortestTrack = trackLengths.reduce((a, b) => (a < b ? a : b))
  const shortestTrackIndex = trackLengths.indexOf(shortestTrack)
  shortestTrack = masterTrackLog[shortestTrackIndex]
  let shortestTrackStartTime = shortestTrack['start time']

  // identify oldest and newest tracks
  let oldestTracks = []
  let newestTracks = []
  const oldestTrack = Math.min(...trackYears)
  const newestTrack = Math.max(...trackYears)
  let oldestTrackCount = 0
  masterTrackLog.forEach((track) => {
    // check to see if there's more than 1 track from that oldest track year
    if (track.year == oldestTrack) {
      oldestTrackCount++
      oldestTracks.push(track)
    }
  })
  let newestTrackCount = 0
  masterTrackLog.forEach((track) => {
    // check to see if there's more than 1 track from that oldest track year
    if (track.year == newestTrack) {
      newestTrackCount++
      newestTracks.push(track)
    }
  })

  // -------------------------------------
  //      bpm analysis
  // -------------------------------------

  // identify bpm range
  let bpmRange = {
    minBPM: Math.min(...bpmArray),
    maxBPM: Math.max(...bpmArray),
  }

  // identify average BPM
  let averageBPM = bpmArray.reduce((a, b) => a + b) / bpmArray.length

  // identify biggest bpm change
  let bpmChangeIndex = ''
  const calculateBPMChanges = (array) => {
    var newArray = []
    for (var i = 1; i < array.length; i++)
      newArray.push(array[i] - array[i - 1])
    bpmChangeIndex = newArray.indexOf(Math.max(...newArray))
    return newArray
  }
  const largestBPMDifference = Math.max(...calculateBPMChanges(bpmArray))

  // -------------------------------------
  //      genre data / analysis
  // -------------------------------------

  // identify number of unique genres played
  let genreCount = {}
  trackGenres.forEach((item) => {
    genreCount[item] = (genreCount[item] || 0) + 1
  })
  let uniqueGenres = new Set(trackGenres)

  // identify top three genres played (discounting "Other" if it's the top genre)
  let topThreeGenres = []
  let otherGenreCount
  let topGenresPlayed = Object.keys(genreCount)
  topGenresPlayed.sort((a, b) => {
    return genreCount[b] - genreCount[a]
  })
  if (
    topGenresPlayed[0] === 'Other' ||
    topGenresPlayed[1] === 'Other' ||
    topGenresPlayed[2] === 'Other'
  ) {
    topGenresPlayed = topGenresPlayed.filter((item) => {
      return item !== 'Other'
    })
    topThreeGenres.push(
      topGenresPlayed[0],
      topGenresPlayed[1],
      topGenresPlayed[2]
    )
    otherGenreCount = Math.max(...Object.values(genreCount))
  } else {
    topThreeGenres.push(
      topGenresPlayed[0],
      topGenresPlayed[1],
      topGenresPlayed[2]
    )
    otherGenreCount = Math.max(...Object.values(genreCount))
  }

  // -------------------------------------
  //      key analysis & stats
  // -------------------------------------

  // create array of root keys for analysis
  let rootKeys = []
  for (let i = 0; i < trackKeys.length; i++) {
    rootKeys.push(trackKeys[i].charAt(0))
  }
  let rootKeyCount = [...rootKeys].reduce((a, e) => {
    a[e] = a[e] ? a[e] + 1 : 1
    return a
  }, {})

  // identify most common key played & x times
  let mostCommonKey = Object.keys(rootKeyCount).reduce((a, b) =>
    rootKeyCount[a] > rootKeyCount[b] ? a : b
  )
  let mostCommonKeyCount = Math.max(...Object.values(rootKeyCount))
  let mostCommonKeyPlaytime = ''

  // identify least common key played & x times
  let leastCommonKey = Object.keys(rootKeyCount).reduce((a, b) =>
    rootKeyCount[a] < rootKeyCount[b] ? a : b
  )
  let leastCommonKeyCount = Math.min(...Object.values(rootKeyCount))
  let leastCommonKeyPlaytime = ''

  // identify most common key major/minor
  let majorMinor = []
  for (let i = 0; i < trackKeys.length; i++) {
    majorMinor.push(trackKeys[i].substring(1))
  }

  // -------------------------------------
  //      doubles analysis & stats
  // -------------------------------------

  // check for doubles and parse titles
  const doublesPlayed = []
  const doublesTitles = []
  for (let i = 0; i < masterTrackLog.length - 1; i++) {
    if (masterTrackLog[i].name === masterTrackLog[i + 1].name) {
      doublesPlayed.push(masterTrackLog[i], masterTrackLog[i + 1])
      doublesTitles.push({
        artist: masterTrackLog[i].artist,
        name: masterTrackLog[i].name,
      })
    }
  }
  const doublesCount = doublesPlayed.length / 2

  // duplicates array
  // add logic to determine non-conseuctive duplicates
  const duplicatesPlayed = []

  // -------------------------------------
  //      deck analysis & stats
  // -------------------------------------

  let deckOnePlaytimes = []
  let deckTwoPlaytimes = []
  masterTrackLog.forEach((track) => {
    if (track.deck === '1') {
      deckOnePlaytimes.push(track.playtime)
    } else if (track.deck === '2') {
      deckTwoPlaytimes.push(track.playtime)
    } else {
      console.log('No data.')
    }
  })
  const deckOneAveragePlaytime = calculateAverageTime(deckOnePlaytimes)
  const deckTwoAveragePlaytime = calculateAverageTime(deckTwoPlaytimes)

  // console.log('CSV HEADER: ', data[0])
  // console.log('----------------------------------')
  console.log(chalk.magenta('TRACK DATA SAMPLE:'))
  console.log(data[5])
  console.log('----------------------------------')
  console.log(chalk.cyan('PLAYLIST QUICK STATS: '))
  // console.log('Playlist Artist: ', playlistArtist)
  console.log('Playlist Title: ', playlistTitle)
  console.log('Playlist Length: ', playlistLength)
  console.log(
    playlistLengthParsed.getHours(),
    'Hours',
    playlistLengthParsed.getMinutes(),
    'Minutes',
    playlistLengthParsed.getSeconds(),
    'Seconds'
  )
  console.log('Start Time: ', playlistStartTime)
  console.log('End Time: ', playlistEndTime)
  console.log('----------------------------------')

  console.log(chalk.magenta('TRACK DATA: '))
  console.log('Total Tracks Played: ', totalTracksPlayed)
  console.log('Average Track Length: ', averageTrackLength.substring(3))
  console.log(
    'Longest Track: ',
    longestTrack.playtime.substring(3),
    '--- Played at: ',
    longestTrackStartTime
  )
  console.log(
    'Shortest Track: ',
    shortestTrack.playtime.substring(3),
    '--- Played at: ',
    shortestTrackStartTime
  )
  console.log('Deck 1 Average Playtime: ', deckOneAveragePlaytime.substring(3))
  console.log('Deck 2 Average Playtime: ', deckTwoAveragePlaytime.substring(3))
  console.log('----------------------------------')

  console.log(chalk.magenta('GENRE DATA: '))
  console.log('Number of unique genres played: ', uniqueGenres.size)
  console.log('Top Three Genres: ')
  console.log('1: ', topThreeGenres[0])
  console.log('2: ', topThreeGenres[1])
  console.log('3: ', topThreeGenres[2])
  console.log(chalk.greenBright('*** Tag Health ***'))
  console.log(
    calculateTagHealth(trackGenres.length, masterTrackLog.length).toFixed(1),
    '% have genre tags'
  )
  console.log(
    calculateTagHealth(otherGenreCount, trackGenres.length).toFixed(1),
    "% have 'Other' as their tag"
  )
  console.log('Number of tracks with empty genre values: ', nullGenreCount)
  console.log('Number of tracks with "Other" as the genre: ', otherGenreCount)
  console.log('----------------------------------')

  console.log(chalk.magenta('BPM DATA: '))
  console.log('Average BPM: ', averageBPM.toFixed(1))
  console.log(`BPM Range: ${bpmRange.minBPM} - ${bpmRange.maxBPM}`)
  console.log(
    'Largest BPM Change Between Two Tracks: ',
    masterTrackLog[bpmChangeIndex].bpm,
    'BPM -',
    masterTrackLog[bpmChangeIndex + 1].bpm,
    'BPM'
  )
  console.log('----------------------------------')

  console.log(chalk.magenta('KEY DATA: '))
  console.log('Most Common Key: ', mostCommonKey)
  console.log('x Played: ', mostCommonKeyCount)
  console.log('Least Common Key: ', leastCommonKey)
  console.log('x Played: ', leastCommonKeyCount)
  console.log(chalk.greenBright('*** Tag Health ***'))
  console.log(
    calculateTagHealth(trackKeys.length, masterTrackLog.length).toFixed(1),
    '% have key tags'
  )
  console.log('Number of tracks with empty key values: ', nullKeyCount)
  console.log('Number of tracks with proper tags: ', trackKeys.length)
  console.log('----------------------------------')

  console.log(chalk.magenta('YEAR DATA: '))
  console.log('Oldest Track Year: ', oldestTrack)
  console.log('Oldest Track Name: ', oldestTracks[0].name)
  console.log('Count: ', oldestTrackCount)
  console.log('Newest Track Year: ', newestTrack)
  console.log('Count: ', newestTrackCount)
  console.log('Average Year: ', averageYear.toFixed())
  console.log(chalk.greenBright('*** Tag Health ***'))
  console.log(
    calculateTagHealth(trackYears.length, masterTrackLog.length).toFixed(1),
    '% have year tags'
  )
  console.log('Number of tracks with empty year values: ', nullYearCount)
  console.log('Number of tracks with proper tags: ', trackYears.length)
  console.log('----------------------------------')

  console.log(chalk.magenta('DOUBLES DATA: '))
  console.log('Doubles Played: ', doublesCount)
  console.log('Doubles Titles: ', doublesTitles)
}

module.exports = createUserReport
