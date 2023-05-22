const scrapeData = require("./LiveReportHelpers/scrapeData");
const parseTimeValues = require("./LiveReportHelpers/parseTimeValues");
const parseStartTime = require("./LiveReportHelpers/parseStartTime");
const calculateAverageTime = require("./LiveReportHelpers/calculateAverageTime");

const createReport = async (url) => {
  const extractPlaylistName = (inputString) => {
    // Extract the portion of the string between 'playlists/' and '/4-3-2023'
    const regex = /playlists\/(.*?)\//;
    const match = regex.exec(inputString);
    if (match && match[1]) {
      // Replace underscores with whitespace
      const playlistName = match[1].replace(/_/g, " ");
      //   console.log(playlistName);
      return playlistName;
    }
    // Return null if no match is found
    return null;
  };

  const playlistArtistName = extractPlaylistName(url);

  try {
    // function to scrape data for report
    let response = await scrapeData(url);
    let results = response[0];
    let timestamps = response[1];
    let starttime = response[2];
    let playlistdate = response[3];
    console.log(playlistdate);
    let playlistTitle = response[4];
    console.log(starttime);
    let tracksPlayed = [];
    let trackTimestamps = [];
    let doublesPlayed = [];

    function stringToDateTime(timeStr) {
      // Get today's date
      let today = new Date();

      // Split the input string on space into hour-minute and am/pm parts
      let [time, period] = timeStr.split(/(?<=\d)(?=[a-zA-Z])/);

      // Split the hour-minute part into hour and minute
      let [hour, minute] = time.split(":");

      // Convert hour to 24-hour format if needed
      if (period.toLowerCase() === "pm" && hour !== "12") {
        hour = parseInt(hour, 10) + 12;
      } else if (period.toLowerCase() === "am" && hour === "12") {
        hour = "00";
      }

      // Set the hours and minutes to the date
      today.setHours(hour, minute, 0, 0);

      return today;
    }

    console.log("-- start time: ", stringToDateTime(starttime));

    function convertTimeString(timeString) {
      // Get the time components (hours and minutes) by splitting the string
      var timeComponents = timeString.slice(0, -2).split(":");

      // If the original string ends in 'pm' and it's not 12:xx, convert the hours to 24 hour format
      if (
        timeString.toLowerCase().endsWith("pm") &&
        timeComponents[0] !== "12"
      ) {
        timeComponents[0] = parseInt(timeComponents[0]) + 12;
      }

      // If the original string ends in 'am' and it's 12:xx, convert the hours to 0
      if (
        timeString.toLowerCase().endsWith("am") &&
        timeComponents[0] === "12"
      ) {
        timeComponents[0] = "00";
      }

      // Rejoin the time components into a string
      var convertedTime = timeComponents.join(":");

      return convertedTime;
    }

    function convertToISO(time) {
      // Get the current date
      let date = new Date();

      // Get the hours and minutes from the time string
      let hours = parseInt(time.substring(0, time.indexOf(":")));
      let minutes = parseInt(
        time.substring(time.indexOf(":") + 1, time.length - 2)
      );

      // If the time is in the pm, add 12 to the hours (if it isn't already 12)
      if (time.toLowerCase().includes("pm") && hours !== 12) {
        hours += 12;
      }

      // If the time is in the am and it's 12, then it's midnight (0 hours)
      if (time.toLowerCase().includes("am") && hours === 12) {
        hours = 0;
      }

      // Set the hours and minutes of the date
      date.setHours(hours, minutes, 0, 0);

      // Return the date in ISO 8601 format
      return date.toISOString();
    }

    const ISOStartTime = convertToISO(starttime);
    const convertedStartTime = convertTimeString(starttime);

    let startTimeString;

    // parse start time for proper display in UI
    if (starttime.length === 7) {
      const [first, second] = parseStartTime(starttime, 5);
      startTimeString = first + " " + second.toUpperCase();
    } else {
      const [first, second] = parseStartTime(starttime, 4);
      startTimeString = first + " " + second.toUpperCase();
    }

    // loop through tracks played and clean data from scrape
    for (let i = 0; i < results.length; i++) {
      let trackId = results[i].children[0].data.trim();
      tracksPlayed.push(trackId);
    }

    function parseDateAndTime(timeString, playlistDate) {
      // parse the date string
      const date = new Date(playlistDate);

      // parse the time string
      const [hours, minutes, seconds] = timeString.split(":");

      // set the hours, minutes, and seconds of the date
      date.setHours(parseInt(hours, 10));
      date.setMinutes(parseInt(minutes, 10));
      date.setSeconds(parseInt(seconds, 10));

      return date;
    }

    function createDate(timeString, playlistDate) {
      // Parse the playlist date
      let dateParts = playlistDate.split(" ");
      let dateObj = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

      // Parse the time
      let period = timeString.slice(-2); // AM or PM
      let [hours, minutes] = timeString.slice(0, -2).split(":"); // Actual hours and minutes

      // Adjust hours for PM times
      if (period.toLowerCase() === "pm" && hours !== "12") {
        hours = parseInt(hours) + 12;
      } else if (period.toLowerCase() === "am" && hours === "12") {
        hours = "00";
      }

      // Set hours and minutes
      dateObj.setHours(hours, minutes);

      return dateObj;
    }

    let starttimeParsed = createDate(starttime, playlistdate);

    let timestampsParsed = [];

    // loop through track timestamps and clean data from scrape
    for (let j = 0; j < results.length; j++) {
      let timestamp = timestamps[j].children[0].data.trim();
      let timestampParsed = parseDateAndTime(timestamp, playlistdate);
      timestamp = new Date("01/01/1970 " + timestamp);
      timestampsParsed.push(timestampParsed);
      trackTimestamps.push(timestamp);
    }

    console.log("TSP: ", timestampsParsed);
    console.log("STP: ", starttimeParsed)    

    // determine lengths of each track played
    let timeDiffs = [];
    for (let k = 0; k < trackTimestamps.length; k++) {
      let x = trackTimestamps[k + 1] - trackTimestamps[k];
      if (Number.isNaN(x)) {
      } else {
        timeDiffs.push(x);
      }
    }

    // check for doubles and add those tracks to array
    for (let n = 0; n < tracksPlayed.length; n++) {
      if (tracksPlayed[n] === tracksPlayed[n + 1]) {
        doublesPlayed.push({
          name: tracksPlayed[n],
        });
      }
    }

    // master track log
    let trackLog = tracksPlayed.map((result, index) => {
      return {
        trackId: result,
        timestamp: ISOStartTime + trackTimestamps[index],
        timePlayed: timestamps[index].children[0].data.trim(),
        length: timeDiffs[index],
      };
    });

    // console.log(trackTimestamps);
    // console.log(ISOStartTime)

    // create an array of track lengths in MS and send to
    // calculateAverageTime to convert and return average
    let msArray = [];

    for (let i = 0; i < trackLog.length - 1; i++) {
      msArray.push(trackLog[i]["length"]);
    }

    let averageTrackLength = calculateAverageTime(msArray);

    // longest track played
    let longestSeconds;
    let max = Math.max(...timeDiffs);
    let maxIndex = timeDiffs.indexOf(max);
    let longestTrack = Math.abs(
      (trackTimestamps[maxIndex] - trackTimestamps[maxIndex + 1]) / 1000
    );
    let longestMinutes = Math.floor(longestTrack / 60) % 60;
    let tempLongestSeconds = longestTrack % 60;

    // check length of longest seconds for display parsing
    if (tempLongestSeconds.toString().length === 1) {
      longestSeconds = "0" + tempLongestSeconds;
    } else {
      longestSeconds = tempLongestSeconds;
    }

    // shortest track played
    let shortestSeconds;
    let min = Math.min(...timeDiffs);
    let minIndex = timeDiffs.indexOf(min);
    let shortestTrack = Math.abs(
      (trackTimestamps[minIndex] - trackTimestamps[minIndex + 1]) / 1000
    );
    let shortestMinutes = Math.floor(shortestTrack / 60) % 60;
    let tempShortestSeconds = shortestTrack % 60;

    // check length of shortest seconds for display parsing
    if (tempShortestSeconds.toString().length === 1) {
      shortestSeconds = "0" + tempShortestSeconds;
    } else {
      shortestSeconds = tempShortestSeconds;
    }

    // playlist length & parse hours/minutes/seconds
    let playlistLength = timestamps.last().text().trim();
    let playlistLengthValues = parseTimeValues(playlistLength);

    // playlist date formatting
    let playlistDateFormatted =
      playlistdate.split(" ")[1] +
      " " +
      playlistdate.split(" ")[0] +
      ", " +
      playlistdate.split(" ")[2];

    let seratoLiveReport = {
      track_length_array: timeDiffs,
      dj_name: playlistArtistName,
      set_length: {
        length_value: playlistLength,
        hours: new Number(playlistLengthValues[0]),
        minutes: new Number(playlistLengthValues[1]),
        seconds: new Number(playlistLengthValues[2]),
      },
      set_start_time: startTimeString,
      total_tracks_played: trackLog.length,
      longest_track: {
        name: trackLog[maxIndex].trackId,
        length_value: longestMinutes + ":" + longestSeconds,
        minutes: longestMinutes,
        seconds: longestSeconds,
      },
      shortest_track: {
        name: trackLog[minIndex].trackId,
        length_value: shortestMinutes + ":" + shortestSeconds,
        minutes: shortestMinutes,
        seconds: shortestSeconds,
      },
      average_track_length: averageTrackLength,
      track_log: trackLog,
      doubles_played: doublesPlayed,
      playlist_date: playlistDateFormatted,
      playlist_title: playlistTitle,
    };
    return seratoLiveReport;
  } catch (err) {
    console.log(err);
  }
};
// FUTURE DEV NOTES
//
// calculate average tracks per hour for longer sets
//
// add option for user to publicly submit stats and display their
// screen name & total number of hours contributed in ui
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

module.exports = createReport;
