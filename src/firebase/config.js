import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyAg931SfJBT0bvmCvi4KRpyuv6CUm16vzw",
    authDomain: "react-firebase-esp32.firebaseapp.com",
    databaseURL: "https://react-firebase-esp32-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "react-firebase-esp32",
    storageBucket: "react-firebase-esp32.appspot.com",
    messagingSenderId: "1063317050322",
    appId: "1:1063317050322:web:3e9c0e6ed708c3d22eee0b"
  };

// init firebase
firebase.initializeApp(firebaseConfig)


const database = firebase.database();

export { database }