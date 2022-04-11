const createUserReport = (data) => {

  // csv import notes:
  //
  // data[0] contains all of the playlist title/artist data
  // remainder of the array is all track info

  // playlist title
  const playlistTitle = data[0].name

  // serato display name
  // check if ''
  const playlistArtist = data[0].artist

  // playlist start time
  const playlistStartTime = data[0][ 'start time' ]

  // playlist end time
  const playlistEndTime = data[0][ 'end time' ]

  // playlist length
  const playlistLength = data[0].playtime

  // array of artists
  let artistArray = []

  // array of track lengths
  const trackLengths = []

  // array of tracks played
  const trackLog = []

  
}

module.exports = createUserReport