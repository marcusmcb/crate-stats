const calculateAverageTime = require('../../shared/calculateAverageTime')

const getDoublesData = (masterTrackLog) => {
  let doubles_data
  // test and account for sets played with a single working deck (will doubles appear twice? 4x?)
  // check to see if shortest track is in doublesPlayed array
  // if so, reduce track array again to shortest track not from a doubles pair

  const doublesPlayed = []
  const doublesTitles = []

  let deckOneDoublesPlaytime, deckTwoDoublesPlaytime

  for (let i = 0; i < masterTrackLog.length - 1; i++) {
    if (
      masterTrackLog[i].name === masterTrackLog[i + 1].name &&
      masterTrackLog[i].deck !== masterTrackLog[i + 1].deck
    ) {
      doublesPlayed.push(masterTrackLog[i], masterTrackLog[i + 1])
      doublesTitles.push({
        artist: masterTrackLog[i].artist,
        name: masterTrackLog[i].name,
      })
    }
  }

  if (doublesPlayed.length === 0) {    
    doubles_data = {
      has_doubles_data: false,
    }
  } else {    
    if (!hasPlayTimeData && !hasDeckData) {
      doubles_data = {
        doubles_detected: doublesPlayed.length / 2,
        has_playtime_data: false,
      }
    } else {
      let deck1Doubles = []
      let deck2Doubles = []
      doublesPlayed.forEach((track) => {
        if (track.deck === '1') {
          deck1Doubles.push(track.playtime.substring(3))
        } else if (track.deck === '2') {
          deck2Doubles.push(track.playtime.substring(3))
        }
      })
      deckOneDoublesPlaytime = calculateAverageTime(deck1Doubles)
      deckTwoDoublesPlaytime = calculateAverageTime(deck2Doubles)
      doubles_data = {
        doubles_detected: doublesPlayed.length / 2,
        deck_1_doubles_playtime: deckOneDoublesPlaytime,
        deck_2_doubles_playtime: deckTwoDoublesPlaytime,
        doubles_played: doublesTitles,
      }
    }
  }
  return doubles_data
}

module.exports = getDoublesData