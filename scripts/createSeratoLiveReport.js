const scrapeData = require('./LiveReportHelpers/scrapeData')
const parseTimeValues = require('./LiveReportHelpers/parseTimeValues')
const parseStartTime = require('./LiveReportHelpers/parseStartTime')
const calculateAverageTime = require('./LiveReportHelpers/calculateAverageTime')

const createReport = async (url) => {
  try {
    // function to scrape data for report
    let response = await scrapeData(url)
    let results = response[0]
    let timestamps = response[1]
    let starttime = response[2]
    let playlistdate = response[3]
    let playlisttitle = response[4]
    let playlistartist = response[5]

    let tracksPlayed = []
    let trackTimestamps = []
    let doublesPlayed = []    

    let starttime_string

    // parse start time for proper display in UI
    if (starttime.length === 7) {
      const [first, second] = parseStartTime(starttime, 5)
      starttime_string = first + ' ' + second.toUpperCase()
    } else {
      const [first, second] = parseStartTime(starttime, 4)
      starttime_string = first + ' ' + second.toUpperCase()
    }

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

    // master track log 
    let trackLog = tracksPlayed.map((result, index) => {
      return {
        trackId: result,
        timestamp: trackTimestamps[index],
        timePlayed: timestamps[index].children[0].data.trim(),
        length: timeDiffs[index],
      }
    })

    // create an array of track lengths in MS and send to
    // calculateAverageTime to convert and return average
    let msArray = []
    
    for (let i = 0; i < trackLog.length - 1; i++) {      
      msArray.push(trackLog[i]['length'])
    }      

    let average_track_length = calculateAverageTime(msArray)    

    // longest track played
    let longestSeconds
    let max = Math.max(...timeDiffs)
    let maxIndex = timeDiffs.indexOf(max)
    let longestTrack = Math.abs(
      (trackTimestamps[maxIndex] - trackTimestamps[maxIndex + 1]) / 1000
    )
    let longestMinutes = Math.floor(longestTrack / 60) % 60
    let tempLongestSeconds = longestTrack % 60

    // check length of longest seconds for display parsing
    if (tempLongestSeconds.toString().length === 1) {
      longestSeconds = '0' + tempLongestSeconds
    } else {
      longestSeconds = tempLongestSeconds
    }

    // shortest track played
    let shortestSeconds
    let min = Math.min(...timeDiffs)
    let minIndex = timeDiffs.indexOf(min)
    let shortestTrack = Math.abs(
      (trackTimestamps[minIndex] - trackTimestamps[minIndex + 1]) / 1000
    )
    let shortestMinutes = Math.floor(shortestTrack / 60) % 60
    let tempShortestSeconds = shortestTrack % 60

    // check length of shortest seconds for display parsing
    if (tempShortestSeconds.toString().length === 1) {
      shortestSeconds = '0' + tempShortestSeconds
    } else {
      shortestSeconds = tempShortestSeconds
    }   

    // playlist length & parse hours/minutes/seconds
    let playlistLength = timestamps.last().text().trim()
    let playlistLengthValues = parseTimeValues(playlistLength)

    // playlist date formatting
    let playlistdate_formatted =
      playlistdate.split(' ')[1] +
      ' ' +
      playlistdate.split(' ')[0] +
      ', ' +
      playlistdate.split(' ')[2]

    let seratoLiveReport = {
      trackLengthArray: timeDiffs,
      djName: playlistartist,
      setLength: {
        lengthValue: playlistLength,
        setlengthhours: playlistLengthValues[0],
        setlengthminutes: playlistLengthValues[1],
        setlengthseconds: playlistLengthValues[2],
      },
      setStartTime: starttime_string,
      totalTracksPlayed: trackLog.length,
      longestTrack: {
        name: trackLog[maxIndex].trackId,
        lengthValue: longestMinutes + ':' + longestSeconds,
        minutes: longestMinutes,
        seconds: 04,
      },
      shortestTrack: {
        name: trackLog[minIndex].trackId,
        lengthValue: shortestMinutes + ':' + shortestSeconds,
        minutes: shortestMinutes,
        seconds: shortestSeconds,
      },
      averageTrackLength: average_track_length,
      avgTrackLength: {        
        lengthValue: average_track_length,
        minutes: average_track_length.split(':')[0],
        seconds: average_track_length.split(':')[1],
      },
      trackLog: trackLog,
      doublesPlayed: doublesPlayed,
      playlistDate: playlistdate_formatted,
      playlistTitle: playlisttitle,
    }
    return seratoLiveReport
  } catch (err) {
    console.log(err)
  }
}
// FUTURE DEV NOTES
//
// calculate average tracks per hour for longer sets
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
// check if shortest track is part of a doubles pair
//
// is there a way to gen data for private playlists? (probably not...)
//
// add logic to determine longest track played @ time
// add logic to determine shortest track played @ time
// subtract playtime from set start time
// add helper method for calcuations

module.exports = createReport
