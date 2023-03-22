const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
// const serviceAccount = require('./firebase/crate-stats-firebase-adminsdk-brtkl-1febc4b47c.json')
const dotenv = require('dotenv')

dotenv.config()

const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS)

// const serviceAccountTemp = {
//   type: `${process.env.FIREBASE_TYPE}`,
//   project_id: `${process.env.FIREBASE_PROJECT_ID}`,
//   private_key_id: `${process.env.FIREBASE_PRIVATE_KEY_ID}`,
//   private_key: `${process.env.FIREBASE_PRIVATE_KEY}`,
//   client_email: `${process.env.FIREBASE_CLIENT_EMAIL}`,
//   client_id: `${process.env.FIREBASE_CLIENT_ID}`,
//   auth_uri: `${process.env.FIREBASE_AUTH_URI}`,
//   token_uri: `${process.env.FIREBASE_TOKEN_URI}`,
//   auth_provider_x509_cert_url: `${process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL}`,
//   client_x509_cert_url: `${process.env.FIREBASE_CLIENT_X509_CERT_URL}`,
// }

initializeApp({
  credential: cert(serviceAccount),
})

const db = getFirestore()
const playlists = db.collection('playlists')

const generateRandomString = () => {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < 16; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

const addNewPlaylist = async (playlistData) => {
  const res = await db
    .collection('playlists')
    .doc(generateRandomString())
    .set(playlistData)
  return res
}

const getPlaylists = async () => {
  let playlistArr = []
  await playlists.get().then((QuerySnapshot) => {
    QuerySnapshot.forEach((doc) => {
      console.log(doc.id)
      playlistArr.push({
        id: doc.id,
        data: doc.data(),
      })
    })
  })
  return playlistArr
}

const queryPlaylist = async () => {
  const queryRef = await playlists
    .where('track_data.total_tracks_played', '<', 50)
    .get()
  if (queryRef.empty) {
    console.log('NOPE')
    return
  } else {
    queryRef.forEach((doc) => {
      // console.log(doc.data())
      console.log('YEP')
    })
  }
}

const deletePlaylist = async (fileID) => {}

// console.log(queryPlaylist())

module.exports = {
  addNewPlaylist: addNewPlaylist,
  getPlaylists: getPlaylists,
  deletePlaylist: deletePlaylist,
}
