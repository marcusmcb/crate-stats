const calculateAverageTime = (times) => {
  const getAverage = (numbers) => {
    const total = numbers.reduce((acc, number) => acc + number, 0)
    return Math.round(total / numbers.length)
  }

  const convertMilliseconds = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  let msAverage = getAverage(times)
  let average_track_length = convertMilliseconds(msAverage)  
  return average_track_length
}

module.exports = calculateAverageTime
