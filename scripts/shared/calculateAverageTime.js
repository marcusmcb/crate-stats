const calculateAverageTime = (times) => {
  // Convert the time strings to seconds
  const secondsArray = times.map(time => {
    const [minutes, seconds] = time.split(':');
    return parseInt(minutes) * 60 + parseInt(seconds);
  });

  // Calculate the average of the seconds
  const averageSeconds = secondsArray.reduce((sum, seconds) => sum + seconds, 0) / secondsArray.length;

  // Convert the average seconds back to MM:SS format
  const minutes = Math.floor(averageSeconds / 60);
  const seconds = Math.floor(averageSeconds % 60);
  const averageTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return averageTime;
}

module.exports = calculateAverageTime
