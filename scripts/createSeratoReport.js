const chalk = require('chalk')
const calculateAverageTime = require('./calculateAverageTime')

const calculateTagHealth = (val1, val2) => {
  return (val1 / val2) * 100
}

const createSeratoReport = (data) => {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //      set conditional checks for each data property
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  let hasStartTimeData,
    hasEndTimeData,
    hasPlaylistLength,
    hasPlaylistArtist,
    hasPlayTimeData,
    hasDeckData,
    hasBPMData,
    hasKeyData,
    hasYearData,
    hasGenreData,
    hasBitrateData,
    hasAlbumData,
    hasArtistData,
    hasDoublesData

  console.log(chalk.green(' * * * DATA SAMPLE * * * '))
  console.log(data[0])

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              set playlist metadata
  // - - - - - - - - - - - - - - - - - - - - - - - -

  const playlistTitle = data[0].name

  // check if display name is ''
  let playlistArtist
  if (data[0].artist) {
    hasPlaylistArtist = true
    playlistArtist = data[0].artist
  } else {
    hasPlaylistArtist = false
  }

  // run check for start, end and play time values in csv
  let playlistStartTime,
    playlistStartTimeParsed,
    playlistEndTime,
    playlistEndTimeParsed

  if (data[0]['start time'] && data[0]['end time']) {
    hasStartTimeData = true
    hasEndTimeData = true
    playlistStartTime = data[0]['start time']
    const [var1, var2] = playlistStartTime.split(' ')
    playlistStartTimeParsed = new Date(var1 + '  ' + var2)
    playlistEndTime = data[0]['end time']
    const [var3, var4] = playlistEndTime.split(' ')
    playlistEndTimeParsed = new Date(var3 + '  ' + var4)
    const weekday = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
    const playlistDay = weekday[playlistStartTimeParsed.getDay()]
    console.log('playlistDay: ', playlistDay)
    console.log(playlistStartTimeParsed.toDateString())
  } else {
    hasStartTimeData = false
    hasEndTimeData = false
  }

  // set playlist length
  let playlistLength
  let playlistLengthParsed
  let playlistDate

  // check if playtime value is present in csv header
  if (data[0].playtime) {
    hasPlaylistLength = true
    playlistLength = data[0].playtime
    playlistDate = playlistStartTime.split(' ')[0]
    playlistLengthParsed = new Date(playlistDate + ' ' + data[0].playtime)

    // if playtime value not present, calculate it using start & end times
  } else if (hasStartTimeData === true && hasEndTimeData === true) {
    hasPlaylistLength = true
    playlistLength = playlistEndTimeParsed - playlistStartTimeParsed
    playlistDate = playlistStartTime.split(' ')[0]
    // limits playlist length to a max of 24 hours
    let tempDate = new Date(playlistLength).toISOString().slice(11, 19)
    playlistLengthParsed = new Date(playlistDate + ' ' + tempDate)
  } else {
    hasPlaylistLength = false
  }

  console.log(
    chalk.inverse(chalk.red('* * * * * * * * * * * * * * * * * * * * * '))
  )
  console.log(chalk.yellow('SERATO SET LIST DATA '))

  // check if artist value is set in user csv
  if (hasPlaylistArtist != false) {
    console.log(chalk.yellow('for', playlistArtist))
    console.log('')
  } else {
    console.log('')
  }

  console.log('Set Title: ', playlistTitle)
  console.log(playlistStartTime)
  console.log('Start Time: ', playlistStartTimeParsed.toDateString(), playlistStartTime.split(' ')[1], playlistStartTime.split(' ')[2])
  // check for NaN values, empty strings, etc
  console.log(
    'Set Length: ',
    playlistLengthParsed.getHours(),
    'Hour',
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

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              artist data & analysis
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

  let titleArray = []
  let nullTitleCount = 0
  masterTrackLog.forEach((track) => {
    if (!track.name || track.name === '') {
      nullTitleCount++
    } else {
      titleArray.push(track.name)
    }
  })

  let artistCount = {}
  let topThreeArtists = []
  let uniqueArtists, topArtistsPlayed

  if (artistArray.length === 0) {
    hasArtistData = false
  } else {
    hasArtistData = true
    artistArray.forEach((item) => {
      artistCount[item] = (artistCount[item] || 0) + 1
    })
    uniqueArtists = new Set(artistArray)
    // identify top three genres played
    topArtistsPlayed = Object.keys(artistCount)
    topArtistsPlayed.sort((a, b) => {
      return artistCount[b] - artistCount[a]
    })
    topThreeArtists.push(
      topArtistsPlayed[0],
      topArtistsPlayed[1],
      topArtistsPlayed[2]
    )
  }

  if (!hasArtistData) {
    console.log(chalk.yellow('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.yellow('ARTIST DATA: '))
    console.log('')
    console.log('No artist data given.')
  } else {
    console.log(chalk.yellow('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.yellow('ARTIST DATA: '))
    console.log('')
    console.log('Total unique artists played: ', uniqueArtists.size)
    console.log('Top Three Artists: ')
    console.log('1: ', topThreeArtists[0])
    console.log('2: ', topThreeArtists[1])
    console.log('3: ', topThreeArtists[2])

    console.log(chalk.yellow('- - - - - - - - - - - - - - - - - - - - - '))
    console.log(chalk.greenBright('*** Tag Health ***'))
    console.log('')
    console.log(
      calculateTagHealth(artistArray.length, masterTrackLog.length).toFixed(1),
      '% have artist tags'
    )
    console.log('Number of tracks with empty artist values: ', nullArtistCount)
    console.log(
      calculateTagHealth(titleArray.length, masterTrackLog.length).toFixed(1),
      '% have title tags'
    )
    console.log('Number of tracks with empty title values: ', nullTitleCount)
  }

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
  // console.log(chalk.bgMagenta('^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^'))
  // console.log(trackBitrates)
  // console.log(chalk.bgMagenta('^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^'))

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

    // check if shortest track is part of a doubles pair
    // if so, note as such and query track log for shortest track not in a doubles pair
    shortestTrack = trackLengths.reduce((a, b) => (a < b ? a : b))
    const shortestTrackIndex = trackLengths.indexOf(shortestTrack)
    shortestTrack = masterTrackLog[shortestTrackIndex]
    shortestTrackStartTime = shortestTrack['start time']
  }

  // check hasPlayTimeData to set track data response
  if (!hasPlayTimeData) {
    console.log(chalk.cyan('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.cyan('TRACK DATA: '))
    console.log('')
    console.log('No track data given.')
  } else {
    console.log(chalk.cyan('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.cyan('TRACK DATA: '))
    console.log('')
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
    // check for data outliers (bpms that aren't consistent with the rest of the set)
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
    console.log('')
    console.log('No BPM data given.')
  } else {
    console.log(chalk.magenta('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.magenta('BPM DATA: '))
    console.log('')
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
    console.log(chalk.magenta('- - - - - - - - - - - - - - - - - - - - - '))
    console.log(chalk.greenBright('*** Tag Health ***'))
    console.log('')
    console.log(
      calculateTagHealth(bpmArray.length, masterTrackLog.length).toFixed(1),
      '% have BPM tags'
    )
    console.log('Number of tracks with empty BPM values: ', nullBPMCount)
    console.log('Number of tracks with proper tags: ', bpmArray.length)
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
    console.log('')
    console.log('No genre data given.')
  } else {
    console.log(chalk.yellow('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.yellow('GENRE DATA: '))
    console.log('')
    console.log('Number of unique genres played: ', uniqueGenres.size)
    // console.log('Genres: ', uniqueGenres)
    console.log('Top Three Genres: ')
    console.log('1: ', topThreeGenres[0])
    console.log('2: ', topThreeGenres[1])
    console.log('3: ', topThreeGenres[2])
    console.log(chalk.yellow('- - - - - - - - - - - - - - - - - - - - - '))
    console.log(chalk.greenBright('*** Tag Health ***'))
    console.log('')
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
    console.log('')
    console.log('No album/collection data given.')
  } else {
    console.log(chalk.green('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.green('ALBUM DATA: '))
    console.log('')
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
    console.log('')
    console.log('No year data given.')
  } else {
    console.log(chalk.red('* * * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.red('YEAR DATA: '))
    console.log('')
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
    console.log(chalk.red('- - - - - - - - - - - - - - - - - - - - - - - '))
    console.log(chalk.greenBright('*** Tag Health ***'))
    console.log('')
    console.log(
      calculateTagHealth(trackYears.length, masterTrackLog.length).toFixed(1),
      '% have year tags'
    )
    console.log('Number of tracks with empty year values: ', nullYearCount)
    console.log('Number of tracks with proper tags: ', trackYears.length)
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

  let mostCommonKey, mostCommonKeyCount, leastCommonKey, leastCommonKeyCount

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

    // identify least common key played & x times
    leastCommonKey = Object.keys(rootKeyCount).reduce((a, b) =>
      rootKeyCount[a] < rootKeyCount[b] ? a : b
    )
    leastCommonKeyCount = Math.min(...Object.values(rootKeyCount))
  }

  if (!hasKeyData) {
    console.log(chalk.magenta('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.magenta('KEY DATA: '))
    console.log('')
    console.log('No key data given.')
  } else {
    console.log(chalk.magenta('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.magenta('KEY DATA: '))
    console.log('')
    console.log('Most Common Key: ', mostCommonKey)
    console.log('x Played: ', mostCommonKeyCount)
    console.log('Least Common Key: ', leastCommonKey)
    console.log('x Played: ', leastCommonKeyCount)
    console.log(chalk.magenta('- - - - - - - - - - - - - - - - - - - - - '))
    console.log(chalk.greenBright('*** Tag Health ***'))
    console.log('')
    console.log(
      calculateTagHealth(trackKeys.length, masterTrackLog.length).toFixed(1),
      '% have key tags'
    )
    console.log('Number of tracks with empty key values: ', nullKeyCount)
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              deck data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  let deckOnePlaytimes = []
  let deckTwoPlaytimes = []
  let deckOneAveragePlaytime, deckTwoAveragePlaytime
  let nullDeckCount = 0

  // check if user export contains playtime data - w/o it, the deck analysis is useless
  if (!hasPlayTimeData) {
    console.log(chalk.blue('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.blue('DECK DATA: '))
    console.log('')
    console.log('No deck data given.')
    // check if user export does NOT contain deck data
  } else if (
    !masterTrackLog.some((item) => Object.keys(item).includes('deck'))
  ) {
    hasDeckData = false
    console.log(chalk.blue('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.blue('DECK DATA: '))
    console.log('')
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
    console.log('')
    console.log('Deck 1 Average Play Time: ', deckOneAveragePlaytime)
    console.log('Deck 2 Average Play Time: ', deckTwoAveragePlaytime)
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              doubles data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  // test and account for sets played with a single working deck (will doubles appear twice? 4x?)
  // check to see if shortest track is in doublesPlayed array
  // if so, reduce track array again to shortest track not from a doubles pair

  const doublesPlayed = []
  const doublesTitles = []
  for (let i = 0; i < masterTrackLog.length - 1; i++) {
    if (
      masterTrackLog[i].name === masterTrackLog[i + 1].name &&
      masterTrackLog[i].deck !== masterTrackLog[i + 1].deck
    ) {
      doublesPlayed.push(masterTrackLog[i], masterTrackLog[i + 1])
      doublesTitles.push({
        artist: masterTrackLog[i].artist,
        name: masterTrackLog[i].name,
      })
    }
  }

  if (doublesPlayed.length === 0) {
    hasDoublesData = false
    console.log(chalk.yellow('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.yellow('DOUBLES DATA: '))
    console.log('')
    console.log('No doubles detected in this set.')
    console.log(chalk.yellow(' * * * * * * * * * * * * * * * * * * * * * '))
  } else {
    hasDoublesData = true
    console.log(chalk.yellow('* * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.yellow('DOUBLES DATA: '))
    console.log('')
    console.log('Doubles detected: ', doublesPlayed.length / 2)
    doublesTitles.forEach((track) => {
      console.log(track.artist, '-', track.name)
    })
    console.log(chalk.yellow(' - - - - - - - - - - - - - - - - - - - - - '))
    // check if deck data is present or not for doubles detected
    if (!hasPlayTimeData && !hasDeckData) {
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
      console.log('Deck 1 doubles play time: ', deckOneDoublesPlaytime)
      console.log('Deck 2 doubles play time: ', deckTwoDoublesPlaytime)
    }
  }

  console.log(chalk.green('x x x x x x x x x x x x x x x x x x '))
  // console.log(data[0])
  // let [hours, minutes, seconds] = playlistLength.split(':')
  // hours = hours / 2
  // minutes = minutes / 2
  // seconds = seconds / 2
  // const [stHours, stMinutes, stSeconds] = playlistStartTime
  // console.log(playlistStartTime)
  // console.log(stHours, stMinutes, stSeconds)

  console.log(chalk.green('x x x x x x x x x x x x x x x x x x '))
}

module.exports = createSeratoReport
