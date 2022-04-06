const axios = require('axios')
const cheerio = require('cheerio')

const scrapeData = async (url) => {
  let results, timestamps
  try {
    await axios
      .get(url)
      .then(({ data }) => {
        const $ = cheerio.load(data)
        results = $('div.playlist-trackname')
        timestamps = $('div.playlist-tracktime')
      })
      .catch((error) => {
        return error
      })
  } catch (err) {
    return err
  }
  return [results, timestamps]
}

module.exports = scrapeData
