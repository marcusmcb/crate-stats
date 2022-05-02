const calculateAverageTime = (arr) => {
  console.log("ARR: ", arr)
  var sum = arr.reduce(function (a, b) {
    return a + +new Date('1970T' + b + 'Z')
  }, 0)
  return new Date(sum / arr.length + 500).toJSON().slice(11, 19)
}

module.exports = calculateAverageTime
