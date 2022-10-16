const axios = require('axios')
const cheerio = require('cheerio')

const scrapeData = async (url) => {    
  let results, timestamps, starttime, playlistdate, playlisttitle
  try {
    await axios
      .get(url)
      .then(({ data }) => {
        const $ = cheerio.load(data)
        results = $('div.playlist-trackname')
        timestamps = $('div.playlist-tracktime')
        starttime = $('div.playlist-timestamp').first().text().trim()
        playlistdate = $('span.playlist-start-time').first().text().trim()
        playlisttitle = $('div.playlist-heading h1').text().trim()
      })
      .catch((error) => {
        console.log(error)        
        return error
      })
  } catch (error) {    
    console.log(error)
    return error
  }
  return [results, timestamps, starttime, playlistdate, playlisttitle]
}

module.exports = scrapeData
