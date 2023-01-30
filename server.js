const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");

const { collection, addDoc, getDocs } = require("firebase/firestore");

const createSeratoLiveReport = require("./scripts/createSeratoLiveReport");
const createSeratoReport = require("./scripts/createSeratoReport");
const createTraktorReport = require("./scripts/createTraktorReport");
const createRekordboxReport = require("./scripts/createRekordboxReport");
const db = require("./firebase");

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client/build")));

app.post("/liveplaylist", async (req, res) => {
  let seratoLivePlaylistReport = await createSeratoLiveReport(req.body.url);
  res.send(seratoLivePlaylistReport);
});

app.post("/sendFile", async (req, res) => {
  let userReport = await createSeratoReport(req.body);
  console.log("USER REPORT -----", userReport);
  res.send(userReport);
});

app.post("/sendTraktorFile", async (req, res) => {
  let userReport = await createTraktorReport(req.body);
  res.send(userReport);
});

app.post("/sendRekordboxFile", async (req, res) => {
  // console.log(req.body)
  let userReport = await createRekordboxReport(req.body);
  res.send(userReport);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Crate Stats Server is listening on port: ${PORT}`);
});
