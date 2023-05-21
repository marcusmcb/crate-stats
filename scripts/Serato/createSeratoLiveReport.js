const scrapeData = require('./LiveReportHelpers/scrapeData')
const parseTimeValues = require('./LiveReportHelpers/parseTimeValues')
const parseStartTime = require('./LiveReportHelpers/parseStartTime')
const calculateAverageTime = require('./LiveReportHelpers/calculateAverageTime')

const createReport = async (url) => {
	const extractPlaylistName = (inputString) => {
		// Extract the portion of the string between 'playlists/' and '/4-3-2023'
		const regex = /playlists\/(.*?)\//
		const match = regex.exec(inputString)
		if (match && match[1]) {
			// Replace underscores with whitespace
			const playlistName = match[1].replace(/_/g, ' ')
			console.log(playlistName)
			return playlistName
		}
		// Return null if no match is found
		return null
	}

	const endsWithLive = (str) => {
		return str.endsWith('live')
	}

	console.log(endsWithLive(url))

	const playlistArtistName = extractPlaylistName(url)
	console.log(playlistArtistName)

	try {
		// function to scrape data for report
		let response = await scrapeData(url)
		let results = response[0]
		let timestamps = response[1]
		let starttime = response[2]
		let playlistdate = response[3]
		let playlisttitle = response[4]
		let playlistartist = response[5]

		const parseDateString = (dateString) => {
			// Split the date string into day, month, and year
			const [day, month, year] = dateString.split(' ')
			// Create a month mapping object to convert month names to month numbers
			const monthMapping = {
				Jan: 0,
				Feb: 1,
				Mar: 2,
				Apr: 3,
				May: 4,
				Jun: 5,
				Jul: 6,
				Aug: 7,
				Sep: 8,
				Oct: 9,
				Nov: 10,
				Dec: 11,
			}
			// Parse the date using the Date constructor
			const parsedDate = new Date(year, monthMapping[month], day)
			return parsedDate
		}

		// Example usage
		const parsedDate = parseDateString(playlistdate)
		console.log(parsedDate)

		const formatStartTime = (input) => {
			const [time, period] = input.split(/(?=[ap]m)/i)
			const [hours, minutes] = time.split(':')
			let formattedStartTime = `${hours}:${minutes}`
			if (period.toLowerCase() === 'pm' && parseInt(hours) !== 12) {
				formattedStartTime += ' PM'
			} else if (period.toLowerCase() === 'am' && parseInt(hours) === 12) {
				formattedStartTime += ' AM'
			}
			return formattedStartTime
		}

		// Example usage

		const formattedStartTime = formatStartTime(starttime)
		console.log(formattedStartTime)

		// console.log("... live data ...")
		// // console.log(results)
		// // console.log(timestamps)
		// console.log(starttime)
		// console.log(playlistdate)
		// console.log(playlisttitle)
		// console.log(playlistartist)

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
			djName: playlistArtistName,
			setLength: {
				lengthValue: playlistLength,
				hours: new Number(playlistLengthValues[0]),
				minutes: new Number(playlistLengthValues[1]),
				seconds: new Number(playlistLengthValues[2]),
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

module.exports = createReport
