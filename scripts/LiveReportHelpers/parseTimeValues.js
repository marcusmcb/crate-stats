const parseTimeValues = (timestamp) => {
  let timestampSplit = timestamp.split(':')
  let hours = timestampSplit[0]
  let minutes = timestampSplit[1]
  let seconds = timestampSplit[2]
  if (hours.charAt(0) === '0') {
    hours = hours.substring(1)
  }
  if (minutes.charAt(0) === '0') {
    minutes = minutes.substring(1)
  }
  if (seconds.charAt(0) === '0') {
    seconds = seconds.substring(1)
  }
  return [hours, minutes, seconds]
}

module.exports = parseTimeValues
