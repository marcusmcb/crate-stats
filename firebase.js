const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,
} = require("firebase/firestore/lite");
const dotenv = require("dotenv");

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "crate-stats.firebaseapp.com",
  projectId: "crate-stats",
  storageBucket: "crate-stats.appspot.com",
  messagingSenderId: "191253184984",
  appId: "1:191253184984:web:2ebfcf4a93ccaca19372ad",
  measurementId: "G-QYRB7DGTF6",
};

const firebaseConnection = initializeApp(firebaseConfig);
const db = getFirestore(firebaseConnection);

const playlistData = async (db) => {
  const querySnapshot = await getDocs(collection(db, "playlists"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
};

playlistData(db)

module.exports = db;
