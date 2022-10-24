const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path');

const csv = require('csvtojson')

const createReport = require('./scripts/createReport')
const readUserFile = require('./scripts/readUserFile')
const createUserReport = require('./scripts/createUserReport')
const createSeratoReport = require('./scripts/createSeratoReport')

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/createReport', async (req, res) => { 
  let userData = await readUserFile()
  let userReport = await createUserReport(userData)  
  const url = req.body.url
  res.send(await createReport(url))
})

app.post('/liveplaylist', async (req, res) => {  
  let livePlaylistReport = await createReport(req.body.url)  
  res.send(livePlaylistReport)
})

app.post('/sendFile', async (req, res) => {    
  let userReport = await createSeratoReport(req.body)  
  res.send(userReport)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Crate Stats Server is listening on port: ${PORT}`)
})