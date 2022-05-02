const chalk = require('chalk')
const calculateAverageTime = require('./calculateAverageTime')
const trackLengthAverage = require('./trackLengthAverage')

const calculateTagHealth = (val1, val2) => {
  return (val1 / val2) * 100
}

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
    averageTrackLength = trackLengthAverage(trackLengths)

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
    console.log(chalk.cyan(' * * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.cyan(' TRACK DATA: '))
    console.log('No track data given.')
    console.log(chalk.cyan(' * * * * * * * * * * * * * * * * * * * * * '))
  } else {
    console.log(chalk.cyan(' * * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.cyan(' TRACK DATA: '))
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
    console.log(chalk.cyan(' * * * * * * * * * * * * * * * * * * * * * '))
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
    console.log(chalk.magenta(' * * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.magenta(' BPM DATA: '))
    console.log('No BPM data given.')
    console.log(chalk.magenta(' * * * * * * * * * * * * * * * * * * * * * '))
  } else {
    console.log(chalk.magenta(' * * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.magenta(' BPM DATA: '))
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
    console.log(chalk.magenta(' * * * * * * * * * * * * * * * * * * * * * '))
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
    console.log(chalk.yellow(' * * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.yellow(' GENRE DATA: '))
    console.log('No genre data given.')
    console.log(chalk.yellow(' * * * * * * * * * * * * * * * * * * * * * '))
  } else {
    console.log(chalk.yellow(' * * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.yellow(' GENRE DATA: '))
    console.log('Number of unique genres played: ', uniqueGenres.size)
    // console.log('Genres: ', uniqueGenres)
    console.log('Top Three Genres: ')
    console.log('1: ', topThreeGenres[0])
    console.log('2: ', topThreeGenres[1])
    console.log('3: ', topThreeGenres[2])
    console.log(chalk.yellow(' * * * * * * * * * * * * * * * * * * * * * '))
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
    console.log(chalk.green(' * * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.green(' ALBUM DATA: '))
    console.log('No album/collection data given.')
    console.log(chalk.green(' * * * * * * * * * * * * * * * * * * * * * '))
  } else {
    console.log(chalk.green(' * * * * * * * * * * * * * * * * * * * * * '))
    console.log(chalk.green(' ALBUM DATA: '))
    console.log('Total unique albums/collections played: ', uniqueAlbums.size)
    console.log('Top Three Albums: ')
    console.log('1: ', topThreeAlbums[0])
    console.log('2: ', topThreeAlbums[1])
    console.log('3: ', topThreeAlbums[2])
    console.log(chalk.green(' * * * * * * * * * * * * * * * * * * * * * '))
  }
}

module.exports = createSeratoReport
