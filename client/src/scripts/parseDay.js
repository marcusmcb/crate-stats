const parseDay = (dateValue) => {
  let playlistDate = new Date(dateValue)
  let daysOfTheWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  let displayDay = daysOfTheWeek[playlistDate.getDay()]
  return displayDay
}

module.exports = parseDay
