const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const serviceAccount = require('./firebase/crate-stats-firebase-adminsdk-brtkl-1febc4b47c.json')

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
      playlistArr.push(doc.data())
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
      console.log("YEP")
    })
  }
}

const deletePlaylist = async (fileID) => {

}

// console.log(queryPlaylist())

module.exports = {
  addNewPlaylist: addNewPlaylist,
  getPlaylists: getPlaylists,
  deletePlaylist: deletePlaylist,
}
