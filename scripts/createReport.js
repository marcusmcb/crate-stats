const scrapeData = require('./scrapeData')
const convertTimestamp = require('./convertTimestamp')

const createReport = async (url) => {

  try {
    // function to scrape data for report
    let response = await scrapeData(url)
    let results = response[0]
    let timestamps = response[1]

    let tracksPlayed = []
    let trackTimestamps = []

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

    // DATA PREP NOTE
    //
    // account for "doubles" (user playing same track on both decks) in data prep
    // create method to check for consecutive duplicate entries in tracksPlayed
    // if so, combine track lengths and consolidate as one entry, reinsert into array

    // combine cleaned data into array of objects 
    // convert length value to timestamp and as length_time property
    // use in front end for easier data viz   


    // add doubles played/scratched to data report

    let trackLog = tracksPlayed.map((result, index) => {
      return {
        trackId: result,
        timestamp: trackTimestamps[index],
        timePlayed: timestamps[index].children[0].data.trim(),
        length: timeDiffs[index]
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
    if (longestSeconds < 10) {
      longestSeconds = '0' + longestSeconds
    }

    // shortest track played
    let min = Math.min(...timeDiffs)
    let minIndex = timeDiffs.indexOf(min)
    let shortestTrack = Math.abs(
      (trackTimestamps[minIndex] - trackTimestamps[minIndex + 1]) / 1000
    )
    let shortestMinutes = Math.floor(shortestTrack / 60) % 60
    let shortestSeconds = shortestTrack % 60
    if (shortestSeconds < 10) {
      shortestSeconds = '0' + shortestSeconds
    }

    // average track length played
    let sumDiff = 0
    for (let m = 0; m < timeDiffs.length; m++) {
      sumDiff += timeDiffs[m]
    }
    let avg = sumDiff / timeDiffs.length
    let w = (avg / 1000).toFixed()
    let minutes = Math.floor(w / 60) % 60
    let seconds = w % 60
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    
    let seratoReport = {
      trackLengthArray: timeDiffs,
      setLength: timestamps.last().text().trim(),
      totalTracksPlayed: trackLog.length,
      longestTrack: {
        name: trackLog[maxIndex].trackId,
        length: longestMinutes + ':' + longestSeconds,
      },
      shortestTrack: {
        name: trackLog[minIndex].trackId,
        length: shortestMinutes + ':' + shortestSeconds,
      },
      avgTrackLength: minutes + ':' + seconds,
      trackLog: trackLog,
    }
    // console.log(seratoReport)
    return seratoReport    
  } catch (err) {
    console.log(err)
  }
}
// FUTURE DEV NOTES
//
// Rewrite this whole script as a standalone webpage
// All the user has to do is copy/paste the link to
// their Serato playlist page and hit analayze
//
// User option to download summary
// User option to aggregate summary (requires data storage $$)

module.exports = createReport
