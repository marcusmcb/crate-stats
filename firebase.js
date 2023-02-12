const {
  initializeApp,
  applicationDefault,
  cert,
} = require('firebase-admin/app')

const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require('firebase-admin/firestore')

const serviceAccount = require('./firebase/crate-stats-firebase-adminsdk-brtkl-1febc4b47c.json')

initializeApp({
  credential: cert(serviceAccount),
})

const db = getFirestore()

const generateRandomString = () => {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < 12; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

const setNewPlaylist = async (playlistData) => {
  const res = await db
    .collection('playlists')
    .doc(generateRandomString())
    .set(playlistData)
  return res
}

module.exports = {
  setNewPlaylist: setNewPlaylist,
}
