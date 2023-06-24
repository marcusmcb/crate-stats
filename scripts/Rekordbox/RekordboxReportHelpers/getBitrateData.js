const getBitrateData = (rekordBoxData) => {
	let lowerBitrateTracks = []
	let bitrateArray = []
	let nullBitrateCount = 0

	rekordBoxData.forEach((track) => {
		if (!track.Bitrate || track.Bitrate === '') {
			nullBitrateCount++
		} else {
			let bitRate = +track.Bitrate.split(' ')[0]
			bitrateArray.push(track.Bitrate)

			if (bitRate < 320) {
				lowerBitrateTracks.push({
					title: track.Track_Title,
					artist: track.Artist,
					bitrate: track.Bitrate,
				})
			}
		}
	})	

	let bitrate_data = {
		has_bitrate_data:
			bitrateArray.length !== 0 && lowerBitrateTracks.length !== 0,
	}

	if (bitrate_data.has_bitrate_data) {
		bitrate_data = {
			...bitrate_data,
			sub320_tracks: lowerBitrateTracks,
			empty_bitrate_tags: nullBitrateCount,
		}
	}

	return bitrate_data
}

module.exports = getBitrateData
