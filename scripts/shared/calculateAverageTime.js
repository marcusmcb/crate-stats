const calculateAverageTime = (times) => {
  const totalSeconds = times.reduce((acc, time) => {
    const [minutes, seconds] = time.split(':').map(Number);
    return acc + (minutes * 60) + seconds;
  }, 0);
  const averageSeconds = totalSeconds / times.length;
  const minutes = Math.floor(averageSeconds / 60);
  const seconds = Math.floor(averageSeconds % 60);  
  const averageTime = `${minutes}:${seconds}`  
  return averageTime
}

module.exports = calculateAverageTime
