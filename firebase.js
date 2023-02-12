const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
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

const getPlaylists = async () => {
  const playlists = db.collection('playlists')
  playlists.get().then((QuerySnapshot) => {
    QuerySnapshot.forEach((doc) => {
      console.log('------------------------------------------')
      console.log(`${doc.id} => ${JSON.stringify(doc.data(), null, 2)}`)
    })
  })
}

getPlaylists()

module.exports = {
  setNewPlaylist: setNewPlaylist,
}
