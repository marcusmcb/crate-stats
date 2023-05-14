const calculateAverage = (arr) => {
	if (!Array.isArray(arr)) {
		return null
	}
	let sum = arr.reduce((a, b) => a + b, 0)
	let average = sum / arr.length
	return average.toFixed(2)
}

const mostFrequentElement = (arr) => {
	if (arr.length === 0) {
		return null
	}
	var frequencyMap = {}
	var maxCount = 0
	var mostFrequentElement = null
	for (var i = 0; i < arr.length; i++) {
		var value = arr[i]
		if (frequencyMap[value] === undefined) {
			frequencyMap[value] = 1
		} else {
			frequencyMap[value]++
		}
		if (frequencyMap[value] > maxCount) {
			maxCount = frequencyMap[value]
			mostFrequentElement = value
		}
	}
	return { element: mostFrequentElement, count: maxCount }
}

const averageTime = (times) => {
	let totalSeconds = 0
	let count = times.length
	times.forEach((time) => {
		let [minutes, seconds] = time.split(':').map(Number)
		totalSeconds += minutes * 60 + seconds
	})
	let averageSeconds = Math.round(totalSeconds / count)
	let averageMinutes = Math.floor(averageSeconds / 60)
	averageSeconds %= 60
	// Use padding to make sure single digit seconds are represented with two digits
	averageSeconds = String(averageSeconds).padStart(2, '0')
	return `${averageMinutes}:${averageSeconds}`
}

module.exports = {
  averageTime: averageTime,
  calculateAverage: calculateAverage,
  mostFrequentElement: mostFrequentElement
}