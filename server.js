const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const dotenv = require('dotenv')

const createSeratoLiveReport = require('./scripts/createSeratoLiveReport')
const createSeratoReport = require('./scripts/createSeratoReport')
const createTraktorReport = require('./scripts/createTraktorReport')
const createRekordboxReport = require('./scripts/createRekordboxReport')
const createEngineReport = require('./scripts/createEngineReport')

const { addNewPlaylist, getPlaylists, deletePlaylist } = require('./firebase')

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'client/build')))

app.post('/liveplaylist', async (req, res) => {
  let seratoLivePlaylistReport = await createSeratoLiveReport(req.body.url)
  res.send(seratoLivePlaylistReport)
})

app.post('/sendSeratoFile', async (req, res) => {
  let userReport = await createSeratoReport(req.body)
  await addNewPlaylist(userReport)
  res.send(userReport)
})

app.post('/sendTraktorFile', async (req, res) => {
  let userReport = await createTraktorReport(req.body)
  res.send(userReport)
})

app.post('/sendRekordboxFile', async (req, res) => {
  let userReport = await createRekordboxReport(req.body)
  res.send(userReport)
})

app.post('/getPlaylists', async (req, res) => {
  createEngineReport()
  let userPlaylists = await getPlaylists()
  res.send(userPlaylists)
})

app.post('/deletePlaylist', async (req, res) => {
  console.log(req.body)
  let deletedPlaylist = await deletePlaylist(file_id)
})

app.get('*', (req, res) => {
  res.sendSeratoFile(path.join(__dirname + '/client/build/index.html'))
})

app.listen(PORT, () => {
  console.log(`Crate Stats Server is listening on port: ${PORT}`)
})
