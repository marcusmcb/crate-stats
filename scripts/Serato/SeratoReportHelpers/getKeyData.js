const calculateTagHealth = require('../../shared/calculateTagHealth')

const getKeyData = (masterTrackLog) => {
  let key_data
  // array of keys
  let trackKeys = []
  let nullKeyCount = 0
  masterTrackLog.forEach((track) => {
    if (!track.key || track.key === '') {
      nullKeyCount++
    } else {
      trackKeys.push(track.key)
    }
  })

  // console.log(chalk.magenta("----- TRACK KEYS -----"));
  // console.log(chalk.yellow(trackKeys));

  let mostCommonKey, mostCommonKeyCount, leastCommonKey, leastCommonKeyCount

  // script currently account for each song's root key only
  // add logic to account for and run logic on major/minor keys

  if (trackKeys.length === 0) {
    hasKeyData = false
  } else {
    hasKeyData = true

    let rootKeys = []
    for (let i = 0; i < trackKeys.length; i++) {
      rootKeys.push(trackKeys[i].charAt(0))
    }
    let rootKeyCount = [...rootKeys].reduce((a, e) => {
      a[e] = a[e] ? a[e] + 1 : 1
      return a
    }, {})

    // identify most common key played & # of times played
    mostCommonKey = Object.keys(rootKeyCount).reduce((a, b) =>
      rootKeyCount[a] > rootKeyCount[b] ? a : b
    )
    mostCommonKeyCount = Math.max(...Object.values(rootKeyCount))

    // identify least common key played & # of times played
    leastCommonKey = Object.keys(rootKeyCount).reduce((a, b) =>
      rootKeyCount[a] < rootKeyCount[b] ? a : b
    )
    leastCommonKeyCount = Math.min(...Object.values(rootKeyCount))
  }

  if (!hasKeyData) {    
    key_data = {
      has_key_data: false,
    }
  } else {
    key_data = {
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
    }
  }
  return key_data
}

module.exports = getKeyData