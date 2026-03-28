export function calculateAverageTime(times: string[]) {
  const secondsArray = times.map((time) => {
    const [minutes, seconds] = time.split(':');
    return Number.parseInt(minutes ?? '0', 10) * 60 + Number.parseInt(seconds ?? '0', 10);
  });

  const averageSeconds =
    secondsArray.reduce((sum, seconds) => sum + seconds, 0) / secondsArray.length;

  const minutes = Math.floor(averageSeconds / 60);
  const seconds = Math.floor(averageSeconds % 60);

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}
