const parseDisplayDate = (dateString) => {
  let newDateString = dateString.includes("_") ? dateString.split('_')[0] : dateString
  let x = new Date(newDateString)
  var normalizedDate = new Date(x.getTime() - x.getTimezoneOffset() * -60000)
  var formattedDate = normalizedDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
  let daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let displayDay = daysOfTheWeek[x.getDay()]
  return [formattedDate, displayDay]
}

module.exports = parseDisplayDate