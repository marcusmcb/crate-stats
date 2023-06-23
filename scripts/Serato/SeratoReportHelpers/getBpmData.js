const parsePlayedAtTime = require('../../shared/parsePlayedAtTime')
const calculateTagHealth = require('../../shared/calculateTagHealth')

const getBpmData = (masterTrackLog) => {
  const bpm_data = {
    has_bpm_data: false,
  }

  const bpmArray = []
  let nullBPMCount = 0

  masterTrackLog.forEach((track) => {
    if (!track.bpm || track.bpm === '') {
      nullBPMCount++
    } else {
      bpmArray.push(Number(track.bpm))
    }
  })

  if (bpmArray.length === 0) {
    return bpm_data
  }

  const bpmRange = {
    minBPM: Math.min(...bpmArray),
    maxBPM: Math.max(...bpmArray),
  }

  const averageBPM = bpmArray.reduce((a, b) => a + b) / bpmArray.length

  const calculateBPMChanges = (array) => {
    const newArray = []
    for (let i = 1; i < array.length; i++) {
      newArray.push(array[i] - array[i - 1])
    }
    return newArray
  }

  const bpmChanges = calculateBPMChanges(bpmArray)
  const largestBPMDifference = Math.max(...bpmChanges)
  const bpmChangeIndex = bpmChanges.indexOf(largestBPMDifference)

  bpm_data.has_bpm_data = true
  bpm_data.average_bpm = averageBPM.toFixed(1)
  bpm_data.bpm_range = {
    minimum: bpmRange.minBPM,
    maximum: bpmRange.maxBPM,
  }
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
  }
  bpm_data.tag_health = {
    percentage_with_bpm_tags: calculateTagHealth(bpmArray.length, masterTrackLog.length).toFixed(1),
    empty_bpm_tags: nullBPMCount,
  }

  return bpm_data
}

module.exports = getBpmData
