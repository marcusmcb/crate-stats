const parseStartTime = (str, index) => {
    const result = [str.slice(0, index), str.slice(index)]
    return result
  }
  
  module.exports = parseStartTime