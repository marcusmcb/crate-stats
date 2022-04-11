const csvFilePath = './data/test.csv'
const csv = require('csvtojson')

const readUserFile = async () => {
  let userData
  try {
    await csv()
      .fromFile(csvFilePath)
      .then((response) => {
        userData = response
      })
  } catch (error) {
    console.log(error)
  }
  return userData
}

module.exports = readUserFile
