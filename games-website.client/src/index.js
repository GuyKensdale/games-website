import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue, get } from 'firebase/database'
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBelNE6kxBXEy1J21y28VV84-FJvQdwgCM",
    authDomain: "games-website-46e37.firebaseapp.com",
    databaseURL: "https://games-website-46e37-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "games-website-46e37",
    storageBucket: "games-website-46e37.appspot.com",
    messagingSenderId: "20350039222",
    appId: "1:20350039222:web:9b7938ca9fab56e803e217",
    measurementId: "G-GMG8TDQWZX"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const db = getFirestore(app);
const auth = getAuth();

export { database, set, db, onValue, ref, auth, get }