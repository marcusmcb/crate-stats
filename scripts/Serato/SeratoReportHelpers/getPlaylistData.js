const getPlaylistData = (data) => {
	const parsePlaylistLength = (str) => {
		let colonCount = 0

		for (let i = 0; i < str.length; i++) {
			if (str[i] === ':') {
				colonCount++
			}
			if (colonCount === 2) {
				return str.slice(0, i)
			}
		}
		return str
	}

	const addTimes = (time1, time2) => {
		const [hours1, minutes1] = time1.split(':').map(Number)
		const [hours2, minutes2] = time2.split(':').map(Number)
		let totalHours = hours1 + hours2
		let totalMinutes = minutes1 + minutes2
		if (totalMinutes >= 60) {
			totalHours += Math.floor(totalMinutes / 60)
			totalMinutes %= 60
		}
		// Convert total hours and minutes back to strings, ensuring 2-digit format
		const hoursString = String(totalHours)
		const minutesString = String(totalMinutes).padStart(2, '0')
		return `${hoursString}:${minutesString}`
	}

	let playlistTitle,
		hasStartTimeData,
		hasEndTimeData,
		hasPlaylistLength,
		hasPlaylistTitle,
		hasPlaylistArtist,
		playlist_data

	if (data[0].name) {
		hasPlaylistTitle = true
		playlistTitle = data[0].name
		playlist_data = {
			title: playlistTitle,
		}
	} else {
		playlist_data = {
			has_title: false,
		}
	}

	// check if display name is ''
	let playlistArtist
	if (data[0].artist) {
		hasPlaylistArtist = true
		playlistArtist = data[0].artist
		playlist_data.artist = playlistArtist
	} else {
		hasPlaylistArtist = false
		playlist_data.has_artist = false
	}

	// run check for start, end and play time values in csv
	let playlistStartTime,
		playlistStartTimeParsed,
		playlistEndTime,
		playlistEndTimeParsed,
		playlistDay,
		playlistMonth,
		playlistDateDay,
		startTimeFormatDisplay

	// check if start time data is present and defined in header
	if (data[0]['start time'] && data[0]['start time'] != '') {
		hasStartTimeData = true
		playlistStartTimeParsed = new Date(data[0]['start time'])

		// determine start time format (comma or not present in start time)
		if (data[0]['start time'].indexOf(',') > -1) {
			// comma format
			const [split1, split2] = data[0]['start time'].split(',')
			const [split3, split4, split5] = split2.split(':')
			const amOrPM = split5.split(' ')[1]
			if (split3 > 12) {
				playlistStartTime = split3 - 12 + ':' + split4 + ` ${amOrPM}`
			} else {
				playlistStartTime = split3 + ':' + split4 + ` ${amOrPM}`
			}
		} else {
			// no commas present
			const tempDateString = data[0]['start time'].replace(' ', ', ')
			const amOrPm = tempDateString.split(' ')[2]
			const [split1, split2] = data[0]['start time'].split(' ')
			const [split3, split4] = split2.split(':')

			if (split3 > 12) {
				if (amOrPm === undefined) {
					playlistStartTime = split3 - 12 + ':' + split4 + ' PM'
				} else {
					playlistStartTime = split3 - 12 + ':' + split4 + ` ${amOrPm}`
				}
			} else {
				playlistStartTime = split3 + ':' + split4 + ` ${amOrPm}`
			}
		}

		// check if end time data is present and defined in header
		if (data[0]['end time'] && data[0]['end time'] != '') {
			hasEndTimeData = true
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
			const month = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December',
			]
			playlistDay = weekday[playlistStartTimeParsed.getDay()]
			playlistMonth = month[playlistStartTimeParsed.getMonth()]
			playlistDateDay = playlistStartTimeParsed.getDate()
		} else {
			hasEndTimeData = false
		}
	} else {
		hasStartTimeData = false
		hasEndTimeData = false
	}

	// set playlist length
	let playlistLength
	let playlistLengthParsed
	let playlistDate

	// check if playlist length is present in csv header
	if (data[0].playtime) {
		hasPlaylistLength = true
		// let abc = data[0]['start time'].split(' ')[0]
		// let xyz = new Date(
		//   data[0]['start time'].split(' ')[0] + ', ' + data[0].playtime
		// )

		// check error with playlist length parse display

		playlistLength = data[0].playtime
		playlistDate = playlistStartTime.split(' ')[0]
		playlistLengthParsed = new Date(
			data[0]['start time'].split(' ')[0] + ', ' + data[0].playtime
		)

		// if playlist length is not present, calculate it using start & end times
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

	if (!hasPlaylistLength) {
		playlist_data.has_playlist_length = false
	} else {
		playlist_data.start_time = playlistStartTime.trim()
		playlist_data.start_time_formatted = {
			day: playlistDay,
			month: playlistMonth,
			dateday: playlistDateDay,
			start_time: playlistStartTime.split(' ')[1],
			// time_format: startTimeFormatDisplay,
		}
		playlist_data.playlist_length = playlistLength
		playlist_data.end_time = addTimes(
			parsePlaylistLength(playlistLength),
			playlistStartTime.trim().split(' ')[0]
		)
		playlist_data.start_time = playlistStartTime.trim().split(' ')[0]

		// check for NaN values
		playlist_data.playlist_length_formatted = {
			hours: playlistLengthParsed.getHours(),
			minutes: playlistLengthParsed.getMinutes(),
			seconds: playlistLengthParsed.getSeconds(),
		}
	}
	return playlist_data
}

module.exports = getPlaylistData
