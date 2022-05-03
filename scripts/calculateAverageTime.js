const calculateAverageTime = (array) => {
  var times = [3600, 60, 1],
    parts = array.map((s) =>
      s.split(':').reduce((s, v, i) => s + times[i] * v, 0)
    ),
    avg = Math.round(parts.reduce((a, b) => a + b, 0) / parts.length)

  return times
    .map((t) => [Math.floor(avg / t), (avg %= t)][0])
    .map((v) => v.toString().padStart(2, 0))
    .join(':')
}

module.exports = calculateAverageTime
