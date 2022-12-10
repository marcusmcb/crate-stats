const calculateAverageTime = (times) => {
  const getAverage = (numbers) => {
    const total = numbers.reduce((acc, number) => acc + number, 0)
    return Math.round(total / numbers.length)
  }

  let msAverage = getAverage(times)
  console.log('BUELLER? ', msAverage)

  const convertMilliseconds = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  let average_track_length = convertMilliseconds(msAverage)
  console.log('average_track_length -----', average_track_length.split(':')[0])
  console.log('HERE: ', times)
  return average_track_length
}

module.exports = calculateAverageTime
