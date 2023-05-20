const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");

const createSeratoLiveReport = require("./scripts/Serato/createSeratoLiveReport");
const createSeratoReport = require("./scripts/Serato/createSeratoReport");
const createTraktorReport = require("./scripts/Traktor/createTraktorReport");
const createRekordboxReport = require("./scripts/Rekordbox/createRekordboxReport");
// const createEngineReport = require("./scripts/Engine/createEngineReport");
const createSiteStatsReport = require("./scripts/SiteStats/createSiteStatsReport")

const { addNewPlaylist, getPlaylists, deletePlaylist } = require("./firebase");

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client/build")));

app.post("/liveplaylist", async (req, res) => {
  const seratoLivePlaylistReport = await createSeratoLiveReport(req.body.url);
  res.send(seratoLivePlaylistReport);
});

app.post("/sendSeratoFile", async (req, res) => {
  const userReport = await createSeratoReport(req.body);
  await addNewPlaylist(userReport)
  res.send(userReport);
});

app.post("/sendTraktorFile", async (req, res) => {
  const userReport = await createTraktorReport(req.body);
  res.send(userReport);
});

app.post("/sendRekordboxFile", async (req, res) => {
  const userReport = await createRekordboxReport(req.body);
  res.send(userReport);
});

app.post("/getSiteStats", async (req, res) => {  
  await createSiteStatsReport().then(data => res.send(data))
});

app.post("/getPlaylists", async (req, res) => {
  // createEngineReport();
  const userPlaylists = await getPlaylists();
  console.log(userPlaylists)
  res.send(userPlaylists);
});

app.post("/addPlaylist", async (req, res) => {  
  const newPlaylist = await addNewPlaylist(req.body);
  res.send(newPlaylist);
});

app.post("/deletePlaylist", async (req, res) => {  
  const deletedPlaylist = await deletePlaylist(req.body.file_id);
  res.send(deletedPlaylist)
});

app.get("*", (req, res) => {
  res.sendSeratoFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Crate Stats Server is listening on port: ${PORT}`);
});
