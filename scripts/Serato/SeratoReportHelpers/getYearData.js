const parsePlayedAtTime = require('../../shared/parsePlayedAtTime')
const calculateTagHealth = require('../../shared/calculateTagHealth')

const getYearData = (masterTrackLog) => {
  const year_data = {
    has_year_data: false,
  }

  const trackYears = []
  let nullYearCount = 0
  let malformedYearCount = 0
  let yearTagsWithValues = 0

  masterTrackLog.forEach((track) => {
    if (!track.year || track.year === '') {
      nullYearCount++
    } else if (track.year.length !== 4) {
      malformedYearCount++
      yearTagsWithValues++
    } else {
      trackYears.push(Number(track.year))
      yearTagsWithValues++
    }
  })

  if (trackYears.length === 0) {
    return year_data
  }

  const averageYear = trackYears.reduce((a, b) => a + b) / trackYears.length
  const oldestTrack = Math.min(...trackYears)
  const newestTrack = Math.max(...trackYears)

  const oldestTracks = masterTrackLog.filter((track) => track.year === oldestTrack.toString())
  const newestTracks = masterTrackLog.filter((track) => track.year === newestTrack.toString())

  const oldestTrackCount = oldestTracks.length
  const newestTrackCount = newestTracks.length

  const newestYearPercentage = ((newestTrackCount / yearTagsWithValues) * 100).toFixed(2)

  year_data.has_year_data = true
  year_data.average_year = Math.round(averageYear)
  year_data.range = {
    oldest: oldestTrack,
    newest: newestTrack,
  }
  year_data.oldest_track = {
    year: oldestTrack,
    artist: oldestTracks[0].artist,
    name: oldestTracks[0].name,
    count: oldestTrackCount,
    tracks: oldestTracks,
    occurred_at: parsePlayedAtTime(oldestTracks[0]['start time']),
  }
  year_data.newest_track = {
    year: newestTrack,
    count: newestTrackCount,
    tracks: newestTracks,
    playlist_percentage: newestYearPercentage,
  }
  year_data.tag_health = {
    percentage_with_year_tags: calculateTagHealth(yearTagsWithValues, masterTrackLog.length).toFixed(1),
    empty_year_tags: nullYearCount,
    malformed_year_tags: malformedYearCount,
  }

  return year_data
}

module.exports = getYearData
