const getPlaylistData = (data) => {
  let playlist_data = {
    has_title: false,
    has_artist: false,
    has_playlist_length: false,
  };

  if (data[0].name) {
    playlist_data.has_title = true;
    playlist_data.title = data[0].name;
  }

  if (data[0].artist) {
    playlist_data.has_artist = true;
    playlist_data.artist = data[0].artist;
  }

  if (data[0]['start time'] && data[0]['start time'] !== '') {
    const startTime = new Date(data[0]['start time']);
    const startTimeFormatted = startTime.toLocaleTimeString([], { timeStyle: 'short' });

    playlist_data.start_time = startTimeFormatted;

    if (data[0]['end time'] && data[0]['end time'] !== '') {
      const endTime = new Date(data[0]['end time']);
      playlist_data.end_time = endTime;

      const playlistLength = endTime - startTime;
      const playlistLengthParsed = new Date(playlistLength);

      playlist_data.has_playlist_length = true;
      playlist_data.playlist_length = playlistLength;
      playlist_data.playlist_length_formatted = {
        hours: playlistLengthParsed.getUTCHours(),
        minutes: playlistLengthParsed.getUTCMinutes(),
        seconds: playlistLengthParsed.getUTCSeconds(),
      };
    }

    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const month = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];

    const playlistDay = weekday[startTime.getDay()];
    const playlistMonth = month[startTime.getMonth()];
    const playlistDateDay = startTime.getDate();

    playlist_data.start_time_formatted = {
      day: playlistDay,
      month: playlistMonth,
      dateday: playlistDateDay,
      start_time: startTimeFormatted.split(' ')[0],
    };
  }

  return playlist_data;
};

module.exports = getPlaylistData;
