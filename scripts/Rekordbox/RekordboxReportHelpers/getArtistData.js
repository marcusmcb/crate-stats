const getArtistData = (rekordBoxData) => {
	// set playlist's artist data
	let artistArray = []
	let nullArtistCount = 0
	rekordBoxData.forEach((track) => {
		if (!track.Artist || track.Artist === '') {
			nullArtistCount++
		} else {
			artistArray.push(track.Artist)
		}
	})
}

module.exports = getArtistData
