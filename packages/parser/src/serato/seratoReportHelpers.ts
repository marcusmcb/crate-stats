import { calculateAverageTime } from '../legacy/calculateAverageTime.js';
import { calculateTagHealthPercent } from '../legacy/calculateTagHealthPercent.js';
import { parsePlayedAtTime } from '../legacy/parsePlayedAtTime.js';

export type SeratoTrack = Record<string, any>;

export function getPlaylistData(data: SeratoTrack[]) {
  const playlist_data: any = {
    has_title: false,
    has_artist: false,
    has_playlist_length: false,
  };

  if (data[0]?.name) {
    playlist_data.has_title = true;
    playlist_data.title = data[0].name;
  }

  if (data[0]?.artist) {
    playlist_data.has_artist = true;
    playlist_data.artist = data[0].artist;
  }

  if (data[0]?.['start time'] && data[0]['start time'] !== '') {
    const startTime = new Date(data[0]['start time']);
    const startTimeFormatted = startTime.toLocaleTimeString([], { timeStyle: 'short' });

    playlist_data.start_time = startTimeFormatted;

    if (data[0]?.['end time'] && data[0]['end time'] !== '') {
      const endTime = new Date(data[0]['end time']);
      playlist_data.end_time = endTime;

      const playlistLength = Number(endTime) - Number(startTime);
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
}

export function getArtistData(masterTrackLog: SeratoTrack[]) {
  const artist_data: any = {
    has_artist_data: false,
  };

  const artistArray: string[] = [];
  const nullArtistCount = masterTrackLog.reduce((count, track) => {
    if (!track.artist || track.artist === '') {
      return count + 1;
    }
    artistArray.push(track.artist);
    return count;
  }, 0);

  const titleArray: string[] = [];
  const nullTitleCount = masterTrackLog.reduce((count, track) => {
    if (!track.name || track.name === '') {
      return count + 1;
    }
    titleArray.push(track.name);
    return count;
  }, 0);

  const artistCount: Record<string, number> = {};
  const uniqueArtists = new Set(artistArray);

  for (const item of artistArray) {
    artistCount[item] = (artistCount[item] || 0) + 1;
  }

  const topArtistsPlayed = Object.keys(artistCount).sort((a, b) => artistCount[b] - artistCount[a]);
  const topThreeArtists = topArtistsPlayed.slice(0, 3);

  artist_data.has_artist_data = artistArray.length > 0;
  artist_data.unique_artists_played = uniqueArtists.size;
  artist_data.top_three_artists = topThreeArtists;
  artist_data.tag_health = {
    percentage_with_artist_tags: calculateTagHealthPercent(artistArray.length, masterTrackLog.length).toFixed(1),
    empty_artist_tags: nullArtistCount,
    percentage_with_title_tags: calculateTagHealthPercent(titleArray.length, masterTrackLog.length).toFixed(1),
    empty_title_tags: nullTitleCount,
  };

  return artist_data;
}

export function getBpmData(masterTrackLog: SeratoTrack[]) {
  const bpm_data: any = {
    has_bpm_data: false,
  };

  const bpmArray: number[] = [];
  let nullBPMCount = 0;

  masterTrackLog.forEach((track) => {
    if (!track.bpm || track.bpm === '') {
      nullBPMCount++;
    } else {
      bpmArray.push(Number(track.bpm));
    }
  });

  if (bpmArray.length === 0) {
    return bpm_data;
  }

  const bpmRange = {
    minBPM: Math.min(...bpmArray),
    maxBPM: Math.max(...bpmArray),
  };

  const averageBPM = bpmArray.reduce((a, b) => a + b) / bpmArray.length;

  const calculateBPMChanges = (array: number[]) => {
    const newArray: number[] = [];
    for (let i = 1; i < array.length; i++) {
      newArray.push(array[i]! - array[i - 1]!);
    }
    return newArray;
  };

  const bpmChanges = calculateBPMChanges(bpmArray);
  const largestBPMDifference = Math.max(...bpmChanges);
  const bpmChangeIndex = bpmChanges.indexOf(largestBPMDifference);

  bpm_data.has_bpm_data = true;
  bpm_data.average_bpm = averageBPM.toFixed(1);
  bpm_data.bpm_range = {
    minimum: bpmRange.minBPM,
    maximum: bpmRange.maxBPM,
  };
  bpm_data.biggest_bpm_change = {
    track_one: {
      bpm: masterTrackLog[bpmChangeIndex].bpm,
      name: masterTrackLog[bpmChangeIndex].name,
    },
    track_two: {
      bpm: masterTrackLog[bpmChangeIndex + 1].bpm,
      name: masterTrackLog[bpmChangeIndex + 1].name,
    },
    occurred_at: parsePlayedAtTime(masterTrackLog[bpmChangeIndex + 1]['start time']),
  };
  bpm_data.tag_health = {
    percentage_with_bpm_tags: calculateTagHealthPercent(bpmArray.length, masterTrackLog.length).toFixed(1),
    empty_bpm_tags: nullBPMCount,
  };

  return bpm_data;
}

export function getGenreData(masterTrackLog: SeratoTrack[]) {
  const genre_data: any = {
    has_genre_data: false,
  };

  const trackGenres: string[] = [];
  let nullGenreCount = 0;
  let otherGenreCount = 0;
  let genreTagsWithValues = 0;

  for (const track of masterTrackLog) {
    if (!track.genre || track.genre === '') {
      nullGenreCount++;
    } else if (track.genre === 'Other') {
      otherGenreCount++;
      genreTagsWithValues++;
    } else {
      let genre = String(track.genre).toLowerCase();
      if (genre.includes('-')) {
        genre = genre.replace('-', ' ');
      }
      trackGenres.push(genre);
      genreTagsWithValues++;
    }
  }

  const genreCount: Record<string, number> = {};
  const uniqueGenres = new Set(trackGenres);

  for (const genre of trackGenres) {
    genreCount[genre] = (genreCount[genre] || 0) + 1;
  }

  const topGenresPlayed = Object.keys(genreCount).sort((a, b) => genreCount[b] - genreCount[a]);
  const topThreeGenres = topGenresPlayed.slice(0, 3);

  genre_data.has_genre_data = trackGenres.length > 0;
  genre_data.unique_genres_played = uniqueGenres.size;
  genre_data.top_three_genres = topThreeGenres;
  genre_data.tag_health = {
    percentage_with_genre_tags: calculateTagHealthPercent(genreTagsWithValues, masterTrackLog.length).toFixed(1),
    percentage_with_other_as_genre: calculateTagHealthPercent(otherGenreCount, trackGenres.length).toFixed(1),
    empty_genre_tags: nullGenreCount,
    other_genre_tags: otherGenreCount,
  };

  return genre_data;
}

export function getAlbumData(masterTrackLog: SeratoTrack[]) {
  const album_data: any = {
    has_album_data: false,
  };

  const trackAlbums: string[] = [];
  let nullAlbumCount = 0;

  masterTrackLog.forEach((track) => {
    if (!track.album || track.album === '') {
      nullAlbumCount++;
    } else {
      trackAlbums.push(track.album);
    }
  });

  if (trackAlbums.length === 0) {
    return album_data;
  }

  const albumCount: Record<string, number> = {};
  trackAlbums.forEach((item) => {
    albumCount[item] = (albumCount[item] || 0) + 1;
  });
  const uniqueAlbums = [...new Set(trackAlbums)];

  const topAlbumsPlayed = Object.keys(albumCount).sort((a, b) => albumCount[b] - albumCount[a]);
  const topThreeAlbums = topAlbumsPlayed.slice(0, 3);

  album_data.has_album_data = true;
  album_data.unique_albums_played = uniqueAlbums.length;
  album_data.top_three_albums = topThreeAlbums;
  album_data.tag_health = {
    percentage_with_album_tags: calculateTagHealthPercent(trackAlbums.length, masterTrackLog.length).toFixed(1),
    empty_album_tags: nullAlbumCount,
  };

  return album_data;
}

export function getTrackData(masterTrackLog: SeratoTrack[]) {
  const track_data: any = {
    has_track_data: false,
  };

  const totalTracksPlayed = masterTrackLog.length;

  const uniqueTracks: SeratoTrack[] = [];
  for (let i = 0; i < masterTrackLog.length - 1; i++) {
    if (
      masterTrackLog[i]?.name !== masterTrackLog[i + 1]?.name ||
      masterTrackLog[i]?.artist !== masterTrackLog[i + 1]?.artist
    ) {
      uniqueTracks.push(masterTrackLog[i]!);
    }
  }

  const trackLengths: string[] = [];
  for (const track of masterTrackLog) {
    if (!track.playtime || track.playtime === '') {
      // legacy tracked this but didn't emit it
    } else {
      trackLengths.push(String(track.playtime).substring(3));
    }
  }

  if (trackLengths.length === 0) {
    return track_data;
  }

  const longestTrackIndex = trackLengths.reduce((maxIndex, length, currentIndex) => {
    return length > trackLengths[maxIndex]! ? currentIndex : maxIndex;
  }, 0);
  const longestTrack = masterTrackLog[longestTrackIndex]!;
  const longestTrackStartTime = parsePlayedAtTime(longestTrack['start time']);

  const shortestTrackIndex = trackLengths.reduce((minIndex, length, currentIndex) => {
    return length < trackLengths[minIndex]! ? currentIndex : minIndex;
  }, 0);
  const shortestTrack = masterTrackLog[shortestTrackIndex]!;
  const shortestTrackStartTime = parsePlayedAtTime(shortestTrack['start time']);

  const trackLengthArray = trackLengths.map((length) => length);

  track_data.has_track_data = true;
  track_data.total_tracks_played = totalTracksPlayed;
  track_data.unique_tracks_played = uniqueTracks.length;
  track_data.average_track_length = calculateAverageTime(trackLengths);
  track_data.longest_track = {
    name: longestTrack.name,
    artist: longestTrack.artist,
    play_time: String(longestTrack.playtime).substring(3),
    played_at: longestTrackStartTime,
  };
  track_data.shortest_track = {
    name: shortestTrack.name,
    artist: shortestTrack.artist,
    play_time: String(shortestTrack.playtime).substring(3),
    played_at: shortestTrackStartTime,
  };
  track_data.track_length_array = trackLengthArray;

  return track_data;
}

export function getYearData(masterTrackLog: SeratoTrack[]) {
  const year_data: any = {
    has_year_data: false,
  };

  const trackYears: number[] = [];
  let nullYearCount = 0;
  let malformedYearCount = 0;
  let yearTagsWithValues = 0;

  masterTrackLog.forEach((track) => {
    if (!track.year || track.year === '') {
      nullYearCount++;
    } else if (String(track.year).length !== 4) {
      malformedYearCount++;
      yearTagsWithValues++;
    } else {
      trackYears.push(Number(track.year));
      yearTagsWithValues++;
    }
  });

  if (trackYears.length === 0) {
    return year_data;
  }

  const averageYear = trackYears.reduce((a, b) => a + b) / trackYears.length;
  const oldestTrack = Math.min(...trackYears);
  const newestTrack = Math.max(...trackYears);

  const oldestTracks = masterTrackLog.filter((track) => track.year === oldestTrack.toString());
  const newestTracks = masterTrackLog.filter((track) => track.year === newestTrack.toString());

  const oldestTrackCount = oldestTracks.length;
  const newestTrackCount = newestTracks.length;

  const newestYearPercentage = ((newestTrackCount / yearTagsWithValues) * 100).toFixed(2);

  year_data.has_year_data = true;
  year_data.average_year = Math.round(averageYear);
  year_data.range = {
    oldest: oldestTrack,
    newest: newestTrack,
  };
  year_data.oldest_track = {
    year: oldestTrack,
    artist: oldestTracks[0].artist,
    name: oldestTracks[0].name,
    count: oldestTrackCount,
    tracks: oldestTracks,
    occurred_at: parsePlayedAtTime(oldestTracks[0]['start time']),
  };
  year_data.newest_track = {
    year: newestTrack,
    count: newestTrackCount,
    tracks: newestTracks,
    playlist_percentage: newestYearPercentage,
  };
  year_data.tag_health = {
    percentage_with_year_tags: calculateTagHealthPercent(yearTagsWithValues, masterTrackLog.length).toFixed(1),
    empty_year_tags: nullYearCount,
    malformed_year_tags: malformedYearCount,
  };

  return year_data;
}

export function getKeyData(masterTrackLog: SeratoTrack[]) {
  const key_data: any = {
    has_key_data: false,
  };

  const trackKeys: string[] = [];
  let nullKeyCount = 0;

  masterTrackLog.forEach((track) => {
    if (!track.key || track.key === '') {
      nullKeyCount++;
    } else {
      trackKeys.push(track.key);
    }
  });

  if (trackKeys.length === 0) {
    return key_data;
  }

  const rootKeys = trackKeys.map((key) => key.charAt(0));
  const rootKeyCount = rootKeys.reduce((count: Record<string, number>, key) => {
    count[key] = (count[key] || 0) + 1;
    return count;
  }, {});

  const mostCommonKey = Object.keys(rootKeyCount).reduce((a, b) =>
    rootKeyCount[a]! > rootKeyCount[b]! ? a : b
  );
  const mostCommonKeyCount = rootKeyCount[mostCommonKey];

  const leastCommonKey = Object.keys(rootKeyCount).reduce((a, b) =>
    rootKeyCount[a]! < rootKeyCount[b]! ? a : b
  );
  const leastCommonKeyCount = rootKeyCount[leastCommonKey];

  key_data.has_key_data = true;
  key_data.most_common_key = {
    key: mostCommonKey,
    times_played: mostCommonKeyCount,
  };
  key_data.least_common_key = {
    key: leastCommonKey,
    times_played: leastCommonKeyCount,
  };
  key_data.tag_health = {
    percentage_with_key_tags: calculateTagHealthPercent(trackKeys.length, masterTrackLog.length).toFixed(1),
    empty_key_tags: nullKeyCount,
  };

  return key_data;
}

export function getDeckData(masterTrackLog: SeratoTrack[]) {
  let deck_data: any = {
    has_deck_data: false,
  };

  const deckOnePlaytimes: string[] = [];
  const deckTwoPlaytimes: string[] = [];
  let nullDeckCount = 0;

  const hasPlayTimeData = masterTrackLog.some((item) => Object.keys(item).includes('playtime'));
  const hasDeckData = masterTrackLog.some((item) => Object.keys(item).includes('deck'));

  if (!hasPlayTimeData || !hasDeckData) {
    return deck_data;
  }

  masterTrackLog.forEach((track) => {
    if (track.deck === '') {
      nullDeckCount++;
    } else if (track.deck === '1') {
      deckOnePlaytimes.push(String(track.playtime).substring(3));
    } else if (track.deck === '2') {
      deckTwoPlaytimes.push(String(track.playtime).substring(3));
    }
  });

  const deckOneAveragePlaytime = calculateAverageTime(deckOnePlaytimes);
  const deckTwoAveragePlaytime = calculateAverageTime(deckTwoPlaytimes);

  deck_data = {
    deck_1_average: deckOneAveragePlaytime,
    deck_2_average: deckTwoAveragePlaytime,
    missing_deck_values: nullDeckCount,
  };

  return deck_data;
}

export function getDoublesData(masterTrackLog: SeratoTrack[]) {
  const doubles_data: any = {
    has_doubles_data: false,
  };

  const doublesPlayed: SeratoTrack[] = [];
  const doublesTitles: Array<{ artist: any; name: any }> = [];

  const deck1Doubles: string[] = [];
  const deck2Doubles: string[] = [];

  for (let i = 0; i < masterTrackLog.length - 1; i++) {
    const currentTrack = masterTrackLog[i]!;
    const nextTrack = masterTrackLog[i + 1]!;

    if (currentTrack.name === nextTrack.name && currentTrack.deck !== nextTrack.deck) {
      doublesPlayed.push(currentTrack, nextTrack);
      doublesTitles.push({
        artist: currentTrack.artist,
        name: currentTrack.name,
      });
    }
  }

  if (doublesPlayed.length === 0) {
    return doubles_data;
  }

  doublesPlayed.forEach((track) => {
    if (track.deck === '1') {
      deck1Doubles.push(String(track.playtime).substring(3));
    } else if (track.deck === '2') {
      deck2Doubles.push(String(track.playtime).substring(3));
    }
  });

  const deck1DoublesPlaytime = calculateAverageTime(deck1Doubles);
  const deck2DoublesPlaytime = calculateAverageTime(deck2Doubles);

  const hasPlayTimeData = masterTrackLog.some((item) => Object.keys(item).includes('playtime'));
  const hasDeckData = masterTrackLog.some((item) => Object.keys(item).includes('deck'));

  doubles_data.has_doubles_data = true;
  doubles_data.doubles_detected = doublesPlayed.length / 2;

  if (!hasPlayTimeData && !hasDeckData) {
    doubles_data.has_playtime_data = false;
  } else {
    doubles_data.deck_1_doubles_playtime = deck1DoublesPlaytime;
    doubles_data.deck_2_doubles_playtime = deck2DoublesPlaytime;
    doubles_data.doubles_played = doublesTitles;
  }

  return doubles_data;
}
