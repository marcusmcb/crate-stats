const createUserReport = (data) => {
  // console.log(data)
  // csv import notes:
  //
  // data[0] contains all of the playlist title/artist data
  // remainder of the array is all track info

  // master array of tracks played
  const masterTrackLog = data.slice(1);

  // playlist title
  // check if title is just date or has an actual title
  const playlistTitle = data[0].name;

  // serato display name
  // check if display name is ''
  const playlistArtist = data[0].artist;

  // playlist start time
  const playlistStartTime = data[0]["start time"];

  // playlist end time
  const playlistEndTime = data[0]["end time"];

  // playlist length
  const playlistLength = data[0].playtime;
  console.log('Playlist Length: ', playlistLength)

  // array of artists
  let artistArray = [];
  masterTrackLog.forEach((track) => {
    artistArray.push(track.artist);
  });

  // array of track lengths
  const trackLengths = [];
  masterTrackLog.forEach((track) => {
    trackLengths.push(new Date("01/01/2020 " + track.playtime));
  });

  // longest track
  let longestTrack = trackLengths.reduce((a, b) => (a > b ? a : b));
  const longestTrackIndex = trackLengths.indexOf(longestTrack);
  longestTrack = masterTrackLog[longestTrackIndex];
  console.log("Longest Track: ", longestTrack.playtime);

  // shortest track
  let shortestTrack = trackLengths.reduce((a, b) => (a < b ? a : b));
  const shortestTrackIndex = trackLengths.indexOf(shortestTrack);
  shortestTrack = masterTrackLog[shortestTrackIndex];
  console.log("Shortest Track: ", shortestTrack.playtime);

  // doubles array
  // add logic to determine consecutive doubles
  const doublesPlayed = []

  // duplicates array
  // add logic to determine non-conseuctive duplicates
  const duplicatesPlayed = []

  // "favored deck"
  // determine which deck got more play time during set
  const favoredDeckStats = []

  console.log("----------------------------------");
};

module.exports = createUserReport;
