const getBitrateData = (masterTrackLog) => {

  // *** NOTE ABOUT BITRATE EXPORT FROM SERATO ***
  // bitrate data is visible in serato's play history for certain files
  // however, i cannot get that data to export to csv properly
  // code below will properly extract values if present

  // array of bitrates
  let trackBitrates = []
  let nullBitrateCount = 0
  masterTrackLog.forEach((track) => {
    if (!track.bitrate || track.bitrate === '') {
      nullBitrateCount++
    } else {
      trackBitrates.push(track.bitrate)
    }
  })
}

module.exports = getBitrateData
