const scrapeData = require('./scrapeData')
const convertTimestamp = require('./convertTimestamp')
const parseTimeValues = require('./parseTimeValues')

const createReport = async (url) => {  
  try {
    // function to scrape data for report
    let response = await scrapeData(url)    
    let results = response[0]
    let timestamps = response[1]
    let starttime = response[2]
    let playlistdate = response[3]
    let playlisttitle = response[4]

    let tracksPlayed = []
    let trackTimestamps = []
    let doublesPlayed = []

    // loop through tracks played and clean data from scrape
    for (let i = 0; i < results.length; i++) {
      let trackId = results[i].children[0].data.trim()
      tracksPlayed.push(trackId)
    }
    // loop through track timestamps and clean data from scrape
    for (let j = 0; j < results.length; j++) {
      let timestamp = timestamps[j].children[0].data.trim()
      timestamp = new Date('01/01/2020 ' + timestamp)
      trackTimestamps.push(timestamp)
    }

    // determine lengths of each track played
    let timeDiffs = []
    for (let k = 0; k < trackTimestamps.length; k++) {
      let x = trackTimestamps[k + 1] - trackTimestamps[k]
      if (Number.isNaN(x)) {
      } else {
        timeDiffs.push(x)
      }
    }

    // check for doubles and add those tracks to array
    for (let n = 0; n < tracksPlayed.length; n++) {
      if (tracksPlayed[n] === tracksPlayed[n + 1]) {
        doublesPlayed.push({
          name: tracksPlayed[n],
        })
      }
    }

    let trackLog = tracksPlayed.map((result, index) => {
      return {
        trackId: result,
        timestamp: trackTimestamps[index],
        timePlayed: timestamps[index].children[0].data.trim(),
        length: timeDiffs[index],
      }
    })

    // longest track played
    let max = Math.max(...timeDiffs)
    let maxIndex = timeDiffs.indexOf(max)
    let longestTrack = Math.abs(
      (trackTimestamps[maxIndex] - trackTimestamps[maxIndex + 1]) / 1000
    )
    let longestMinutes = Math.floor(longestTrack / 60) % 60
    let longestSeconds = longestTrack % 60

    // shortest track played
    let min = Math.min(...timeDiffs)
    let minIndex = timeDiffs.indexOf(min)
    let shortestTrack = Math.abs(
      (trackTimestamps[minIndex] - trackTimestamps[minIndex + 1]) / 1000
    )
    let shortestMinutes = Math.floor(shortestTrack / 60) % 60
    let shortestSeconds = shortestTrack % 60

    // average track length played
    let sumDiff = 0
    for (let m = 0; m < timeDiffs.length; m++) {
      sumDiff += timeDiffs[m]
    }
    let avg = sumDiff / timeDiffs.length
    let w = (avg / 1000).toFixed()
    let minutes = Math.floor(w / 60) % 60
    let seconds = w % 60

    // playlist length & parse hours/minutes/seconds
    let playlistLength = timestamps.last().text().trim()
    let playlistLengthValues = parseTimeValues(playlistLength)

    let seratoReport = {
      trackLengthArray: timeDiffs,
      setLength: {
        lengthValue: playlistLength,
        setlengthhours: playlistLengthValues[0],
        setlengthminutes: playlistLengthValues[1],
        setlengthseconds: playlistLengthValues[2],
      },
      setStartTime: starttime,
      totalTracksPlayed: trackLog.length,
      longestTrack: {
        name: trackLog[maxIndex].trackId,
        lengthValue: longestMinutes + ':' + 04,
        minutes: longestMinutes,
        seconds: 04,
      },
      shortestTrack: {
        name: trackLog[minIndex].trackId,
        lengthValue: shortestMinutes + ':' + shortestSeconds,
        minutes: shortestMinutes,
        seconds: shortestSeconds,
      },
      avgTrackLength: {
        lengthValue: minutes + ':' + seconds,
        minutes: minutes,
        seconds: seconds,
      },
      trackLog: trackLog,
      doublesPlayed: doublesPlayed,
      playlistDate: playlistdate,
      playlistTitle: playlisttitle,
    }     
    return seratoReport
  } catch (err) {
    console.log(err)
  }
}
// FUTURE DEV NOTES
//
// User option to download summary
// User option to aggregate summary (requires data storage $$)
//
// AVERAGE TRACKS PER HOUR
//
// CLOUD AVERAGE
//
// add option for user to anonymously submit stats to the site
// as part of aggregrate data to compare user results against
//
// add option for user to publicly submit stats and display thier
// screen name & total number of hours contributed in ui
//
// set configs for mongo cluster
// plan for ui to show aggregate data on site load once user base is contributing
//
// PRIVATE REPORTS
//
// is there a way to gen data for private playlists? (probably not...)

module.exports = createReport
