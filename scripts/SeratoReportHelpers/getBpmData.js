const parsePlayedAtTime = require('../shared/parsePlayedAtTime')
const calculateTagHealth = require('../shared/calculateTagHealth')

const getBpmData = (masterTrackLog) => {  

  let bpm_data, hasBPMData

  // array of bpms
  let bpmArray = []
  let nullBPMCount = 0
  masterTrackLog.forEach((track) => {
    if (!track.bpm || track.bpm === '') {
      nullBPMCount++
    } else {
      bpmArray.push(new Number(track.bpm))
    }
  })

  let bpmRange, averageBPM, largestBPMDifference, bpmChangeIndex

  if (bpmArray.length === 0) {
    hasBPMData = false
  } else {
    hasBPMData = true

    // identify bpm range
    bpmRange = {
      minBPM: Math.min(...bpmArray),
      maxBPM: Math.max(...bpmArray),
    }

    // identify average BPM
    averageBPM = bpmArray.reduce((a, b) => a + b) / bpmArray.length

    // identify biggest bpm change
    // check for data outliers (bpms that aren't consistent with the rest of the set)
    // add logic to identify biggest bpm change per hour
    const calculateBPMChanges = (array) => {
      var newArray = []
      for (var i = 1; i < array.length; i++)
        newArray.push(array[i] - array[i - 1])
      bpmChangeIndex = newArray.indexOf(Math.max(...newArray))
      return newArray
    }
    largestBPMDifference = Math.max(...calculateBPMChanges(bpmArray))
  }

  if (!hasBPMData) {
    bpm_data = {
      has_bpm_data: false,
    }
  } else {
    bpm_data = {
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
        occurred_at: parsePlayedAtTime(masterTrackLog[bpmChangeIndex + 1]['start time']),
      },
      tag_health: {
        percentage_with_bpm_tags: calculateTagHealth(
          bpmArray.length,
          masterTrackLog.length
        ).toFixed(1),
        empty_bpm_tags: nullBPMCount,
      },
      bpm_array: bpmArray
    }
  }
  return bpm_data
}

module.exports = getBpmData