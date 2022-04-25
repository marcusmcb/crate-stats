const csvFilePath = './data/normal_dj_set.csv'
const csv = require('csvtojson')

const readUserFile = async () => {    
  let userData
  try {
    await csv()
      .fromFile(csvFilePath)
      .then((response) => {
        userData = response
      })
  } catch(error) {
    console.log(error)
  }
  console.log("USER DATA: ", userData[1])
  return userData
}

module.exports = readUserFile
