const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const dotenv = require('dotenv')

dotenv.config()

const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS)

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

const deletePlaylist = async (playlistId) => {  
  console.log("HERE")
  console.log("FOO: " , typeof playlistId)
	const res = await db.collection('playlists').doc(playlistId).delete()
	return res
}

// const queryPlaylist = async () => {
//   const queryRef = await playlists
//     .where("track_data.total_tracks_played", "<", 50)
//     .get();
//   if (queryRef.empty) {
//     console.log("NOPE");
//     return;
//   } else {
//     queryRef.forEach((doc) => {
//       console.log(doc.data())
//       console.log("YEP");
//     });
//   }
// };



// console.log(queryPlaylist())

module.exports = {
	addNewPlaylist: addNewPlaylist,
	getPlaylists: getPlaylists,
	deletePlaylist: deletePlaylist,
}
