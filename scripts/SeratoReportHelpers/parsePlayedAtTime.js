const parsePlayedAtTime = (timeValue) => {
  return (
    timeValue.split(':')[0] +
    ':' +
    timeValue.split(':')[1] +
    ' ' +
    timeValue.split(':')[2].split(' ')[1]
  )
}

module.exports = parsePlayedAtTime