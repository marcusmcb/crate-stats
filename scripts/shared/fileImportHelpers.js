// convert text data to csv format
const convertToCSV = (data) => {
  const rows = data.split('\n')
  const headers = rows[0].split('\t')
  const csvRows = rows.slice(1).map((row) => {
    const values = row.split('\t')
    return headers
      .map((header, i) => {
        return `"${header}": "${values[i]}"`
      })
      .join(', ')
  })
  let csvData = `{${csvRows.join('}, {')}}`
  return csvData
}

// helper method to replace index icon in csv data
const replaceHash = (string) => {
  return string.replace(/��#/g, 'index')
}

// helper method to return JSON string as array of objects
const convertJsonStringToArray = (jsonString) => {
  return JSON.parse('[' + jsonString + ']')
}

// helper method to remove unnecessary artwork and index values from playlist data
const cleanPlaylistArray = (array) => {
  for (var i = 0; i < array.length; i++) {
    delete array[i].Artwork
    delete array[i].index
  }
  return array
}

// helper method to calculate average track length in MS
const calculateAverage = (arr) => {
  var sum = 0
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  return sum / arr.length
}

// helper method to convert average track length from milliseconds back to MM:SS format
const convertMSToMMSS = (milliseconds) => {
  var minutes = Math.floor(milliseconds / 60000)
  var seconds = ((milliseconds % 60000) / 1000).toFixed(0)
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}

// helper method to convert MM:SS values to milliseconds
const convertMMSStoMS = (times) => {
  return times.map((time) => {
    const [minutes, seconds] = time.split(':')
    return (parseInt(minutes) * 60 + parseInt(seconds)) * 1000
  })
}

// helper method to replace white space with underscores in playlist array objects
const cleanPlaylistKeys = (array) => {
  var newArray = []
  for (var i = 0; i < array.length; i++) {
    var object = {}
    for (var key in array[i]) {
      if (array[i].hasOwnProperty(key)) {
        var newKey = key.replace(/\s/g, '_')
        object[newKey] = array[i][key]
      }
    }
    newArray.push(object)
  }
  return newArray
}

// helper method to create a count of each genre played in set
const arrayCount = (arr) => {
  var counts = {}
  for (var i = 0; i < arr.length; i++) {
    var num = arr[i]
    counts[num] = counts[num] ? counts[num] + 1 : 1
  }
  return counts
}

// helper method to determine number of unique genres played in set
const getUniqueGenres = (arr) => {
  var unique = []
  for (var i = 0; i < arr.length; i++) {
    if (unique.indexOf(arr[i]) === -1) {
      unique.push(arr[i])
    }
  }
  return unique
}

// helper method to sort the top three genres played in set
const sortObject = (obj) => {
  var sorted = {}
  var keys = Object.keys(obj)
  keys.sort(function (a, b) {
    return obj[b] - obj[a]
  })
  for (var i = 0; i < keys.length; i++) {
    sorted[keys[i]] = obj[keys[i]]
  }
  return sorted
}

// determine set length in MS by adding track lengths
const addMSArray = (numbers) => {
  var sum = 0
  for (var i = 0; i < numbers.length; i++) {
    sum += numbers[i]
  }

  let playTimes = []
  var timeCount = 0
  for (var i = 0; i < numbers.length; i++) {
    playTimes.push(getTimeFromMS(Math.abs(timeCount - numbers[i])))
    timeCount = timeCount + numbers[i]
  }
  // console.log(playTimes)
  return sum
}

// convert set length from MS to HH:MM:SS
const getTimeFromMS = (milliseconds) => {
  var seconds = Math.floor(milliseconds / 1000)
  var minutes = Math.floor(seconds / 60)
  var hours = Math.floor(minutes / 60)
  return {
    hours: hours,
    minutes: minutes % 60,
    seconds: seconds % 60,
  }
}

// determine percentage of an array a value represents
const percentageOf = (array, value) => {
  var count = 0
  for (var i = 0; i < array.length; i++) {
    if (array[i].toString() === value.toString()) {
      count++
    }
  }
  return (count / array.length) * 100
}

// determine the average year played
const averageYear = (years) => {
  var sum = 0
  for (var i = 0; i < years.length; i++) {
    sum += years[i]
  }
  var avg = sum / years.length
  return avg
}

// helper method to determine the max value among an object's keys
const findMaxObjectValue = (obj) => {
  var max = 0
  var maxKey = null
  for (var key in obj) {
    if (obj[key] > max) {
      max = obj[key]
      maxKey = key
    }
  }
  return [maxKey, max]
}

const maxBPMDifference = (bpmArray) => {
  var maxDiff = 0
  for (var i = 0; i < rekordBoxData.length - 1; i++) {
    var diff = bpmArray[i + 1] - bpmArray[i]
    if (diff > maxDiff) {
      maxDiff = diff
      fromTrack = rekordBoxData[i]
      intoTrack = rekordBoxData[i + 1]
    }
  }
  return maxDiff
}

const removeEmptyKey = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key === '') {
        delete obj[key]
      }
      if (typeof obj[key] === 'object') {
        removeEmptyKey(obj[key])
      }
    }
  }
  return obj
}

module.exports = {
  maxBPMDifference: maxBPMDifference,
  averageYear: averageYear,
  findMaxObjectValue: findMaxObjectValue,
  convertToCSV: convertToCSV,
  percentageOf: percentageOf,
  replaceHash: replaceHash,
  convertJsonStringToArray: convertJsonStringToArray,
  cleanPlaylistArray: cleanPlaylistArray,
  cleanPlaylistKeys: cleanPlaylistKeys,
  convertMMSStoMS: convertMMSStoMS,
  calculateAverage: calculateAverage,
  convertMSToMMSS: convertMSToMMSS,
  arrayCount: arrayCount,
  getUniqueGenres: getUniqueGenres,
  sortObject: sortObject,
  addMSArray: addMSArray,
  getTimeFromMS: getTimeFromMS,
  removeEmptyKey: removeEmptyKey,
}
