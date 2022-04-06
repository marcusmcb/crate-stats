const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = 5000 || process.env.PORT
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('<h1>Crate Stats Server is up and running</h1>')
})

app.listen(PORT, () => {
  console.log(`Crate Stats Server is listening on port: ${PORT}`)
})