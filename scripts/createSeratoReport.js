const chalk = require('chalk')
const calculateAverageTime = require('./calculateAverageTime')

const calculateTagHealth = (val1, val2) => {
  return (val1 / val2) * 100
}

const createSeratoReport = (data) => {
  console.log(chalk.green(' * * * DATA SAMPLE * * * '))
  console.log(data[5])

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

  console.log(chalk.inverse('* * * * * * * * * * * * * * * * * * * * * '))
  console.log(chalk.yellow('SERATO SET LIST DATA: '))
  console.log('')
  console.log('Set Title: ', playlistTitle)
  console.log('Start Time: ', playlistStartTime)
  console.log(
    'Playlist Length: ',
    playlistLengthParsed.getHours(),
    'Hours',
    playlistLengthParsed.getMinutes(),
    'Minutes',
    playlistLengthParsed.getSeconds(),
    'Seconds'
  )  

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              set master track list
  // - - - - - - - - - - - - - - - - - - - - - - - -

  const masterTrackLog = data.slice(1)
  masterTrackLog.pop()

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //      set conditional checks for each data property
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  let hasStartTimeData,
    hasEndTimeData,
    hasPlayTimeData,
    hasDeckData,
    hasBPMData,
    hasKeyData,
    hasYearData,
    hasGenreData,
    hasBitrateData,
    hasAlbumData

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

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              track data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  // number of tracks played
  const totalTracksPlayed = masterTrackLog.length

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

  let averageTrackLength,
    longestTrack,
    longestTrackStartTime,
    shortestTrack,
    shortestTrackStartTime

  // check if user's csv has playtime data
  if (trackLengths.length === 0) {
    hasPlayTimeData = false
  } else {
    hasPlayTimeData = true

    // average track length
    averageTrackLength = calculateAverageTime(trackLengths)

    // longest track
    // add logic check to consider what to do with outliers (abnormally long playtimes)
    longestTrack = trackLengths.reduce((a, b) => (a > b ? a : b))
    const longestTrackIndex = trackLengths.indexOf(longestTrack)
    longestTrack = masterTrackLog[longestTrackIndex]
    longestTrackStartTime = longestTrack['start time']

    // shortest track
    shortestTrack = trackLengths.reduce((a, b) => (a < b ? a : b))
    const shortestTrackIndex = trackLengths.indexOf(shortestTrack)
    shortestTrack = masterTrackLog[shortestTrackIndex]
    shortestTrackStartTime = shortestTrack['start time']
  }

  // check hasPlayTimeData to set track data response
  if (!hasPlayTimeData) {
    console.log(chalk.cyan('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.cyan('TRACK DATA: '))
    console.log('No track data given.')    
  } else {
    console.log(chalk.cyan('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.cyan('TRACK DATA: '))
    console.log('Total Tracks Played: ', totalTracksPlayed)
    console.log('Average Track Length: ', averageTrackLength.substring(3))
    console.log(
      'Longest Track: ',
      longestTrack.name,
      '-',
      longestTrack.playtime.substring(3)
    )
    console.log('Played at: ', longestTrackStartTime)
    console.log(
      'Shortest Track: ',
      shortestTrack.name,
      '-',
      shortestTrack.playtime.substring(3)
    )
    console.log('Played at: ', shortestTrackStartTime)    
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              bpm data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  // array of bpms
  let bpmArray = []
  let nullBPMCount = 0
  masterTrackLog.forEach((track) => {
    if (!track.bpm || track.bpm === '') {
      nullBPMCount++
    } else {
      bpmArray.push(new Number(track.bpm))
    }
  })

  let bpmRange, averageBPM, largestBPMDifference, bpmChangeIndex

  if (bpmArray.length === 0) {
    hasBPMData = false
  } else {
    hasBPMData = true

    // identify bpm range
    bpmRange = {
      minBPM: Math.min(...bpmArray),
      maxBPM: Math.max(...bpmArray),
    }

    // identify average BPM
    averageBPM = bpmArray.reduce((a, b) => a + b) / bpmArray.length

    // identify biggest bpm change
    // add logic to identify biggest change per hour
    const calculateBPMChanges = (array) => {
      var newArray = []
      for (var i = 1; i < array.length; i++)
        newArray.push(array[i] - array[i - 1])
      bpmChangeIndex = newArray.indexOf(Math.max(...newArray))
      return newArray
    }
    largestBPMDifference = Math.max(...calculateBPMChanges(bpmArray))
  }

  if (!hasBPMData) {
    console.log(chalk.magenta('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.magenta('BPM DATA: '))
    console.log('No BPM data given.')    
  } else {
    console.log(chalk.magenta('* * * * * * * * * * * * * * * * * * * * * '))
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
    console.log(
      masterTrackLog[bpmChangeIndex].name,
      '-->',
      masterTrackLog[bpmChangeIndex + 1].name
    )    
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              genre data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  // array of genres (removing 'Other' from result & counting total instances in playlist)
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

  let uniqueGenres, topGenresPlayed
  let topThreeGenres = []
  let genreCount = {}

  if (trackGenres.length === 0) {
    hasGenreData = false
  } else {
    hasGenreData = true

    // identify number of unique genres played
    // add logic to identify unique genres per hour
    trackGenres.forEach((item) => {
      genreCount[item] = (genreCount[item] || 0) + 1
    })
    uniqueGenres = new Set(trackGenres)

    // identify top three genres played
    topGenresPlayed = Object.keys(genreCount)
    topGenresPlayed.sort((a, b) => {
      return genreCount[b] - genreCount[a]
    })
    topThreeGenres.push(
      topGenresPlayed[0],
      topGenresPlayed[1],
      topGenresPlayed[2]
    )
  }

  if (!hasGenreData) {
    console.log(chalk.yellow('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.yellow('GENRE DATA: '))
    console.log('No genre data given.')    
  } else {
    console.log(chalk.yellow('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.yellow('GENRE DATA: '))
    console.log('Number of unique genres played: ', uniqueGenres.size)
    // console.log('Genres: ', uniqueGenres)
    console.log('Top Three Genres: ')
    console.log('1: ', topThreeGenres[0])
    console.log('2: ', topThreeGenres[1])
    console.log('3: ', topThreeGenres[2])    
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              album data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

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

  let albumCount = {}
  let topThreeAlbums = []
  let uniqueAlbums, topAlbumsPlayed

  if (trackAlbums.length === 0) {
    hasAlbumData = false
  } else {
    hasAlbumData = true

    trackAlbums.forEach((item) => {
      albumCount[item] = (albumCount[item] || 0) + 1
    })
    uniqueAlbums = new Set(trackAlbums)

    // identify top three genres played
    topAlbumsPlayed = Object.keys(albumCount)
    topAlbumsPlayed.sort((a, b) => {
      return albumCount[b] - albumCount[a]
    })
    topThreeAlbums.push(
      topAlbumsPlayed[0],
      topAlbumsPlayed[1],
      topAlbumsPlayed[2]
    )
  }

  if (!hasAlbumData) {
    console.log(chalk.green('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.green('ALBUM DATA: '))
    console.log('No album/collection data given.')    
  } else {
    console.log(chalk.green('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.green('ALBUM DATA: '))
    console.log('Total unique albums/collections played: ', uniqueAlbums.size)
    console.log('Top Three Albums: ')
    console.log('1: ', topThreeAlbums[0])
    console.log('2: ', topThreeAlbums[1])
    console.log('3: ', topThreeAlbums[2])    
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              year data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  // array of years
  let trackYears = []
  let nullYearCount = 0
  let malformedYearCount = 0
  masterTrackLog.forEach((track) => {
    if (!track.year || track.year === '') {
      nullYearCount++
    } else if (track.year.length !== 4) {
      malformedYearCount++
    } else {
      trackYears.push(new Number(track.year))
    }
  })

  let averageYear
  let oldestTracks = []
  let newestTracks = []
  let oldestTrack, newestTrack
  let oldestTrackCount = 0
  let newestTrackCount = 0

  if (trackYears.length === 0) {
    hasYearData = false
  } else {
    hasYearData = true

    // identify average age of playlist's tracks
    averageYear = trackYears.reduce((a, b) => a + b) / trackYears.length

    // identify oldest and newest tracks
    oldestTrack = Math.min(...trackYears)
    newestTrack = Math.max(...trackYears)

    masterTrackLog.forEach((track) => {
      // check to see if there's more than 1 track from that oldest track year
      if (track.year == oldestTrack) {
        oldestTrackCount++
        oldestTracks.push(track)
      }
    })

    masterTrackLog.forEach((track) => {
      // check to see if there's more than 1 track from that oldest track year
      if (track.year == newestTrack) {
        newestTrackCount++
        newestTracks.push(track)
      }
    })
  }

  if (!hasYearData) {
    console.log(chalk.green('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.green('YEAR DATA: '))
    console.log('No year data given.')    
  } else {
    console.log(chalk.red('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.red('YEAR DATA: '))
    console.log('Average Year: ', averageYear.toFixed())
    console.log('Oldest Track Year: ', oldestTrack)
    console.log(
      'Oldest Track: ',
      oldestTracks[0].artist,
      '-',
      oldestTracks[0].name
    )
    console.log('Count: ', oldestTrackCount)
    console.log('Newest Track Year: ', newestTrack)
    console.log('Count: ', newestTrackCount)    
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              key data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

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

  let mostCommonKey,
    mostCommonKeyCount,
    mostCommonKeyPlaytime,
    leastCommonKey,
    leastCommonKeyCount,
    leastCommonKeyPlaytime

  if (trackKeys.length === 0) {
    hasKeyData = false
  } else {
    hasKeyData = true

    let rootKeys = []
    for (let i = 0; i < trackKeys.length; i++) {
      rootKeys.push(trackKeys[i].charAt(0))
    }
    let rootKeyCount = [...rootKeys].reduce((a, e) => {
      a[e] = a[e] ? a[e] + 1 : 1
      return a
    }, {})

    // identify most common key played & x times
    mostCommonKey = Object.keys(rootKeyCount).reduce((a, b) =>
      rootKeyCount[a] > rootKeyCount[b] ? a : b
    )
    mostCommonKeyCount = Math.max(...Object.values(rootKeyCount))
    mostCommonKeyPlaytime = ''

    // identify least common key played & x times
    leastCommonKey = Object.keys(rootKeyCount).reduce((a, b) =>
      rootKeyCount[a] < rootKeyCount[b] ? a : b
    )
    leastCommonKeyCount = Math.min(...Object.values(rootKeyCount))
    leastCommonKeyPlaytime = ''
  }

  if (!hasKeyData) {
    console.log(chalk.magenta('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.magenta('KEY DATA: '))
    console.log('No key data given.')    
  } else {
    console.log(chalk.magenta('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.magenta('KEY DATA: '))
    console.log('Most Common Key: ', mostCommonKey)
    console.log('x Played: ', mostCommonKeyCount)
    console.log('Least Common Key: ', leastCommonKey)
    console.log('x Played: ', leastCommonKeyCount)    
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              deck data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  let deckOnePlaytimes = []
  let deckTwoPlaytimes = []
  let deckOneAveragePlaytime, deckTwoAveragePlaytime
  let nullDeckCount = 0

  let checkMTLForKey = (key) =>
    masterTrackLog.some((item) => Object.keys(item).includes(key))
  let isKeyPresent = checkMTLForKey('deck')

  // check if user export contains playtime data - w/o it, the deck analysis is useless
  if (!hasPlayTimeData) {
    console.log(chalk.blue('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.blue('DECK DATA: '))
    console.log('No deck data given.')    
    // check if user export does NOT contain deck data
  } else if (
    !masterTrackLog.some((item) => Object.keys(item).includes('deck'))
  ) {
    hasDeckData = false
    console.log(chalk.blue('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.blue('DECK DATA: '))
    console.log('No deck data given.')    
  } else {
    hasDeckData = true
    masterTrackLog.forEach((track) => {
      if (track.deck === '') {
        nullDeckCount++
      } else if (track.deck === '1') {
        deckOnePlaytimes.push(track.playtime)
      } else if (track.deck === '2') {
        deckTwoPlaytimes.push(track.playtime)
      }
    })

    deckOneAveragePlaytime = calculateAverageTime(deckOnePlaytimes)
    deckTwoAveragePlaytime = calculateAverageTime(deckTwoPlaytimes)

    console.log(chalk.blue('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.blue('DECK DATA: '))
    console.log('Deck 1 Average Play Time: ', deckOneAveragePlaytime)
    console.log('Deck 2 Average Play Time: ', deckTwoAveragePlaytime)    
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              doubles data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

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

  if (doublesPlayed.length === 0) {
    console.log(chalk.yellow('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.yellow('DOUBLES DATA: '))
    console.log('No doubles detected in this set.')
    console.log(chalk.yellow(' * * * * * * * * * * * * * * * * * * * * * '))
  } else {
    console.log(chalk.yellow('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.yellow('DOUBLES DATA: '))
    console.log('Doubles detected: ', doublesPlayed.length / 2)
    doublesTitles.forEach((track) => {
      console.log(track.artist, '-', track.name)
    })
    console.log(chalk.yellow(' - - - - - - - - - - - - - - - - - - - - - '))
  }

  // check if deck data is present or not for doubles detected
  if (!masterTrackLog.some((item) => Object.keys(item).includes('deck')) || !masterTrackLog.some((item) => Object.keys(item).includes('playtime'))) {
    console.log('No playtime data available.')
  } else {
    let deck1Doubles = []
    let deck2Doubles = []
    doublesPlayed.forEach((track) => {
      if (track.deck === '1') {
        deck1Doubles.push(track.playtime)
      } else if (track.deck === '2') {
        deck2Doubles.push(track.playtime)
      } 
    })    
    deckOneDoublesPlaytime = calculateAverageTime(deck1Doubles)
    deckTwoDoublesPlaytime = calculateAverageTime(deck2Doubles)
    console.log("Deck 1 doubles play time: ", deckOneDoublesPlaytime)
    console.log("Deck 2 doubles play time: ", deckTwoDoublesPlaytime)
  }
}

module.exports = createSeratoReport
