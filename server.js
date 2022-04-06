const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const createReport = require('./scripts/createReport')

const PORT = 5000 || process.env.PORT
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/createReport', async (req, res) => {
  res.send(await createReport())
})

app.listen(PORT, () => {
  console.log(`Crate Stats Server is listening on port: ${PORT}`)
})