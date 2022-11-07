const chalk = require("chalk");
const calculateAverageTime = require("./shared/calculateAverageTime");
const getPlaylistData = require("./SeratoReportHelpers/getPlaylistData");
const getArtistData = require('./SeratoReportHelpers/getArtistData')
const calculateTagHealth = require('./SeratoReportHelpers/calculateTagHealth')

const createSeratoReport = (data) => {  

  let hasDeckData,
    hasBPMData,
    hasKeyData,
    hasYearData,
    hasGenreData,    
    hasAlbumData,    
    hasDoublesData;

  let seratoPlaylistAnalysis = {};

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              set playlist metadata
  // - - - - - - - - - - - - - - - - - - - - - - - -

  let seratoPlaylistData = getPlaylistData(data);
  seratoPlaylistAnalysis.playlist_data = seratoPlaylistData;  

  // - - - - - - - - - - - - - - - - - - - - - - - - - - -
  //              set master track list
  // - - - - - - - - - - - - - - - - - - - - - - - - - - -

  const masterTrackLog = data.slice(1);
  masterTrackLog.pop();
  seratoPlaylistAnalysis.master_track_log = masterTrackLog;   

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              artist data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  let seratoArtistData = getArtistData(masterTrackLog)
  seratoPlaylistAnalysis.artist_data = seratoArtistData    

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              track data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  // number of tracks played
  const totalTracksPlayed = masterTrackLog.length;

  // number of unique tracks played
  let uniqueTracks = [];
  for (let i = 0; i < masterTrackLog.length - 1; i++) {
    if (
      masterTrackLog[i].name !== masterTrackLog[i + 1].name &&
      masterTrackLog[i].artist !== masterTrackLog[i + 1].artist
    ) {
      uniqueTracks.push(masterTrackLog[i]);
    }
  }

  // array of track lengths
  let trackLengths = [];
  let nullLengthCount = 0;
  masterTrackLog.forEach((track) => {
    if (!track.playtime || track.playtime === "") {
      nullLengthCount++;
    } else {
      trackLengths.push(track.playtime);
    }
  });

  let averageTrackLength,
    longestTrack,
    longestTrackStartTime,
    shortestTrack,
    shortestTrackStartTime;

  // check if user's csv has playtime data
  if (trackLengths.length === 0) {
    hasPlayTimeData = false;
  } else {
    hasPlayTimeData = true;

    // average track length
    averageTrackLength = calculateAverageTime(trackLengths);

    // longest track
    // add logic check to consider what to do with outliers (abnormally long playtimes)
    // abnormally long track values with skew the average length when calculated

    longestTrack = trackLengths.reduce((a, b) => (a > b ? a : b));
    const longestTrackIndex = trackLengths.indexOf(longestTrack);
    longestTrack = masterTrackLog[longestTrackIndex];
    longestTrackStartTime = longestTrack["start time"];

    // shortest track
    // check if shortest track is part of a doubles pair
    // if so, note as such and query track log for shortest track not in a doubles pair

    shortestTrack = trackLengths.reduce((a, b) => (a < b ? a : b));
    const shortestTrackIndex = trackLengths.indexOf(shortestTrack);
    shortestTrack = masterTrackLog[shortestTrackIndex];
    shortestTrackStartTime = shortestTrack["start time"];
  }

  // check hasPlayTimeData to set track data response
  if (!hasPlayTimeData) {
    seratoPlaylistAnalysis.track_data = {
      has_track_data: false,
    };
  } else {
    seratoPlaylistAnalysis.track_data = {
      total_tracks_played: totalTracksPlayed,
      unique_tracks_played: uniqueTracks.length,
      average_track_length: averageTrackLength.substring(3),
      longest_track: {
        name: longestTrack.name,
        play_time: longestTrack.playtime.substring(3),
        played_at: longestTrackStartTime,
      },
      shortest_track: {
        name: shortestTrack.name,
        play_time: shortestTrack.playtime.substring(3),
        played_at: shortestTrackStartTime,
      },
    };
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              bpm data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  // array of bpms
  let bpmArray = [];
  let nullBPMCount = 0;
  masterTrackLog.forEach((track) => {
    if (!track.bpm || track.bpm === "") {
      nullBPMCount++;
    } else {
      bpmArray.push(new Number(track.bpm));
    }
  });

  let bpmRange, averageBPM, largestBPMDifference, bpmChangeIndex;

  if (bpmArray.length === 0) {
    hasBPMData = false;
  } else {
    hasBPMData = true;

    // identify bpm range
    bpmRange = {
      minBPM: Math.min(...bpmArray),
      maxBPM: Math.max(...bpmArray),
    };

    // identify average BPM
    averageBPM = bpmArray.reduce((a, b) => a + b) / bpmArray.length;

    // identify biggest bpm change
    // check for data outliers (bpms that aren't consistent with the rest of the set)
    // add logic to identify biggest bpm change per hour
    const calculateBPMChanges = (array) => {
      var newArray = [];
      for (var i = 1; i < array.length; i++)
        newArray.push(array[i] - array[i - 1]);
      bpmChangeIndex = newArray.indexOf(Math.max(...newArray));
      return newArray;
    };
    largestBPMDifference = Math.max(...calculateBPMChanges(bpmArray));
  }

  if (!hasBPMData) {
    seratoPlaylistAnalysis.bpm_data = {
      has_bpm_data: false,
    };
  } else {
    seratoPlaylistAnalysis.bpm_data = {
      average_bpm: averageBPM.toFixed(1),
      bpm_range: {
        minimum: bpmRange.minBPM,
        maximum: bpmRange.maxBPM,
      },
      biggest_bpm_change: {
        track_one: {
          bpm: masterTrackLog[bpmChangeIndex].bpm,
          name: masterTrackLog[bpmChangeIndex].name,
        },
        track_two: {
          bpm: masterTrackLog[bpmChangeIndex + 1].bpm,
          name: masterTrackLog[bpmChangeIndex + 1].name,
        },
        occurred_at: masterTrackLog[bpmChangeIndex + 1]["start time"],
      },
      tag_health: {
        percentage_with_bpm_tags: calculateTagHealth(
          bpmArray.length,
          masterTrackLog.length
        ).toFixed(1),
        empty_bpm_tags: nullBPMCount,
      },
    };
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              genre data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  // array of genres (removing 'Other' from result & counting total instances in playlist)
  // add better syntax casing for multi-word genres (convert to lowercase, etc)

  let trackGenres = [];
  let nullGenreCount = 0;
  let otherGenreCount = 0;
  let genreTagsWithValues = 0;

  masterTrackLog.forEach((track) => {
    if (!track.genre || track.genre === "") {
      nullGenreCount++;
    } else if (track.genre === "Other") {
      otherGenreCount++;
      genreTagsWithValues++;
    } else {
      if (track.genre.includes("-")) {
        trackGenres.push(track.genre.replace("-", " "));
        genreTagsWithValues++;
      } else {
        trackGenres.push(track.genre.toLowerCase());
        genreTagsWithValues++;
      }
    }
  });

  let uniqueGenres, topGenresPlayed;
  let topThreeGenres = [];
  let genreCount = {};

  if (trackGenres.length === 0) {
    hasGenreData = false;
  } else {
    hasGenreData = true;

    // identify number of unique genres played
    // add logic to identify unique genres per hour
    trackGenres.forEach((item) => {
      genreCount[item] = (genreCount[item] || 0) + 1;
    });
    uniqueGenres = new Set(trackGenres);

    // identify top three genres played
    topGenresPlayed = Object.keys(genreCount);
    topGenresPlayed.sort((a, b) => {
      return genreCount[b] - genreCount[a];
    });
    topThreeGenres.push(
      topGenresPlayed[0],
      topGenresPlayed[1],
      topGenresPlayed[2]
    );
  }

  if (!hasGenreData) {
    seratoPlaylistAnalysis.genre_data = {
      has_genre_data: false,
    };
  } else {
    seratoPlaylistAnalysis.genre_data = {
      unique_genres_played: uniqueGenres.size,
      top_three_genres: [
        topThreeGenres[0],
        topThreeGenres[1],
        topThreeGenres[2],
      ],
      tag_health: {
        percentage_with_genre_tags: calculateTagHealth(
          genreTagsWithValues,
          masterTrackLog.length
        ).toFixed(1),
        percentage_with_other_as_genre: calculateTagHealth(
          otherGenreCount,
          trackGenres.length
        ).toFixed(1),
        empty_genre_tags: nullGenreCount,
        other_genre_tags: otherGenreCount,
      },
    };
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              album data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  // array of albums
  let trackAlbums = [];
  let nullAlbumCount = 0;
  masterTrackLog.forEach((track) => {
    if (!track.album || track.album === "") {
      nullAlbumCount++;
    } else {
      trackAlbums.push(track.album);
    }
  });

  let albumCount = {};
  let topThreeAlbums = [];
  let uniqueAlbums, topAlbumsPlayed;

  if (trackAlbums.length === 0) {
    hasAlbumData = false;
  } else {
    hasAlbumData = true;

    trackAlbums.forEach((item) => {
      albumCount[item] = (albumCount[item] || 0) + 1;
    });
    uniqueAlbums = new Set(trackAlbums);

    // identify top three genres played
    topAlbumsPlayed = Object.keys(albumCount);
    topAlbumsPlayed.sort((a, b) => {
      return albumCount[b] - albumCount[a];
    });
    topThreeAlbums.push(
      topAlbumsPlayed[0],
      topAlbumsPlayed[1],
      topAlbumsPlayed[2]
    );
  }

  if (!hasAlbumData) {
    seratoPlaylistAnalysis.album_data = {
      has_album_data: false,
    };
  } else {
    seratoPlaylistAnalysis.album_data = {
      unique_albums_played: uniqueAlbums.size,
      top_three_albums: [
        topThreeAlbums[0],
        topThreeAlbums[1],
        topThreeAlbums[2],
      ],
    };
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              year data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  // array of years
  let trackYears = [];
  let nullYearCount = 0;
  let malformedYearCount = 0;
  let yearTagsWithValues = 0;
  masterTrackLog.forEach((track) => {
    if (!track.year || track.year === "") {
      nullYearCount++;
    } else if (track.year.length !== 4) {
      malformedYearCount++;
      yearTagsWithValues++;
    } else {
      trackYears.push(new Number(track.year));
      yearTagsWithValues++;
    }
  });

  let averageYear;
  let oldestTracks = [];
  let newestTracks = [];
  let oldestTrack, newestTrack;
  let oldestTrackCount = 0;
  let newestTrackCount = 0;
  let newestYearPercentage;

  if (trackYears.length === 0) {
    hasYearData = false;
  } else {
    hasYearData = true;

    // identify average age of playlist's tracks
    averageYear = trackYears.reduce((a, b) => a + b) / trackYears.length;

    // identify oldest and newest tracks
    oldestTrack = Math.min(...trackYears);
    newestTrack = Math.max(...trackYears);

    masterTrackLog.forEach((track) => {
      // check to see if there's more than 1 track from the oldest track year
      if (track.year == oldestTrack) {
        oldestTrackCount++;
        oldestTracks.push(track);
      }
    });

    masterTrackLog.forEach((track) => {
      // check to see if there's more than 1 track from the newest track year
      if (track.year == newestTrack) {
        newestTrackCount++;
        newestTracks.push(track);
      }
    });

    // calculate percentage of playlist that was from the most recent year
    // implement similar function to do the same for the oldest track year
    newestYearPercentage = (
      (newestTrackCount / masterTrackLog.length) *
      100
    ).toFixed(2);
    let oldestYearPercentage = (
      (oldestTrackCount / masterTrackLog.length) *
      100
    ).toFixed(2);
  }

  if (!hasYearData) {
    seratoPlaylistAnalysis.year_data = {
      has_year_data: false,
    };
  } else {
    seratoPlaylistAnalysis.year_data = {
      average_year: averageYear.toFixed(),
      oldest_track: {
        year: oldestTrack,
        artist: oldestTracks[0].artist,
        name: oldestTracks[0].name,
        count: oldestTrackCount,
        tracks: oldestTracks,
      },
      newest_track: {
        year: newestTrack,
        count: newestTrackCount,
        tracks: newestTracks,
        playlist_percentage: newestYearPercentage,
      },
      tag_health: {
        percentage_with_year_tags: calculateTagHealth(
          yearTagsWithValues,
          masterTrackLog.length
        ).toFixed(1),
        empty_year_tags: nullYearCount,
        malformed_year_tags: malformedYearCount,
      },
    };
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              key data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  // array of keys
  let trackKeys = [];
  let nullKeyCount = 0;
  masterTrackLog.forEach((track) => {
    if (!track.key || track.key === "") {
      nullKeyCount++;
    } else {
      trackKeys.push(track.key);
    }
  });

  let mostCommonKey, mostCommonKeyCount, leastCommonKey, leastCommonKeyCount;

  // script currently account for each song's root key only
  // add logic to account for and run logic on major/minor keys

  if (trackKeys.length === 0) {
    hasKeyData = false;
  } else {
    hasKeyData = true;

    let rootKeys = [];
    for (let i = 0; i < trackKeys.length; i++) {
      rootKeys.push(trackKeys[i].charAt(0));
    }
    let rootKeyCount = [...rootKeys].reduce((a, e) => {
      a[e] = a[e] ? a[e] + 1 : 1;
      return a;
    }, {});

    // identify most common key played & # of times played
    mostCommonKey = Object.keys(rootKeyCount).reduce((a, b) =>
      rootKeyCount[a] > rootKeyCount[b] ? a : b
    );
    mostCommonKeyCount = Math.max(...Object.values(rootKeyCount));

    // identify least common key played & # of times played
    leastCommonKey = Object.keys(rootKeyCount).reduce((a, b) =>
      rootKeyCount[a] < rootKeyCount[b] ? a : b
    );
    leastCommonKeyCount = Math.min(...Object.values(rootKeyCount));
  }

  if (!hasKeyData) {
    seratoPlaylistAnalysis.has_key_data = false;
    seratoPlaylistAnalysis.key_data = {
      has_key_data: false,
    };
  } else {
    seratoPlaylistAnalysis.key_data = {
      most_common_key: {
        key: mostCommonKey,
        times_played: mostCommonKeyCount,
      },
      least_common_key: {
        key: leastCommonKey,
        times_played: leastCommonKeyCount,
      },
      tag_health: {
        percentage_with_key_tags: calculateTagHealth(
          trackKeys.length,
          masterTrackLog.length
        ).toFixed(1),
        empty_key_tags: nullKeyCount,
      },
    };
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              deck data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  let deckOnePlaytimes = [];
  let deckTwoPlaytimes = [];
  let deckOneAveragePlaytime, deckTwoAveragePlaytime;
  let nullDeckCount = 0;

  // check if user export contains playtime data - w/o it, the deck analysis is useless
  // add logic if absent to collect and display the number of tracks played on each deck
  if (!hasPlayTimeData) {
    seratoPlaylistAnalysis.deck_data = {
      has_deck_data: false,
    };
    // check if user export does NOT contain deck data
  } else if (
    !masterTrackLog.some((item) => Object.keys(item).includes("deck"))
  ) {
    hasDeckData = false;
    seratoPlaylistAnalysis.deck_data = {
      has_deck_data: false,
    };
  } else {
    hasDeckData = true;
    masterTrackLog.forEach((track) => {
      if (track.deck === "") {
        nullDeckCount++;
      } else if (track.deck === "1") {
        deckOnePlaytimes.push(track.playtime);
      } else if (track.deck === "2") {
        deckTwoPlaytimes.push(track.playtime);
      }
    });

    deckOneAveragePlaytime = calculateAverageTime(deckOnePlaytimes).slice(3);
    deckTwoAveragePlaytime = calculateAverageTime(deckTwoPlaytimes).slice(3);

    seratoPlaylistAnalysis.deck_data = {
      deck_1_average: deckOneAveragePlaytime,
      deck_2_average: deckTwoAveragePlaytime,
      missing_deck_values: nullDeckCount,
    };
  }

  // - - - - - - - - - - - - - - - - - - - - - - - -
  //              doubles data & analysis
  // - - - - - - - - - - - - - - - - - - - - - - - -

  // test and account for sets played with a single working deck (will doubles appear twice? 4x?)
  // check to see if shortest track is in doublesPlayed array
  // if so, reduce track array again to shortest track not from a doubles pair

  const doublesPlayed = [];
  const doublesTitles = [];

  let deckOneDoublesPlaytime, deckTwoDoublesPlaytime
  
  for (let i = 0; i < masterTrackLog.length - 1; i++) {
    if (
      masterTrackLog[i].name === masterTrackLog[i + 1].name &&
      masterTrackLog[i].deck !== masterTrackLog[i + 1].deck
    ) {
      doublesPlayed.push(masterTrackLog[i], masterTrackLog[i + 1]);
      doublesTitles.push({
        artist: masterTrackLog[i].artist,
        name: masterTrackLog[i].name,
      });
    }
  }

  if (doublesPlayed.length === 0) {
    hasDoublesData = false;
    seratoPlaylistAnalysis.doubles_data = {
      has_doubles_data: false,
    };
  } else {
    hasDoublesData = true;
    if (!hasPlayTimeData && !hasDeckData) {
      seratoPlaylistAnalysis.doubles_data = {
        doubles_detected: doublesPlayed.length / 2,
        has_playtime_data: false,
      };
    } else {
      let deck1Doubles = [];
      let deck2Doubles = [];
      doublesPlayed.forEach((track) => {
        if (track.deck === "1") {
          deck1Doubles.push(track.playtime);
        } else if (track.deck === "2") {
          deck2Doubles.push(track.playtime);
        }
      });
      deckOneDoublesPlaytime = calculateAverageTime(deck1Doubles);
      deckTwoDoublesPlaytime = calculateAverageTime(deck2Doubles);
      seratoPlaylistAnalysis.doubles_data = {
        doubles_detected: doublesPlayed.length / 2,
        deck_1_doubles_playtime: deckOneDoublesPlaytime,
        deck_2_doubles_playtime: deckTwoDoublesPlaytime,
        doubles_played: doublesTitles,
      };
    }
  }
  console.log(chalk.green("x x x x x x x x x x x x x x x x x x "));
  return seratoPlaylistAnalysis;
};

module.exports = createSeratoReport;
