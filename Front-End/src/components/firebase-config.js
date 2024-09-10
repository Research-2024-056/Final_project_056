// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAl1CspujyMUlGPH4WG1P9nKhuL9eylD-8",
  authDomain: "sliitresearch-42127.firebaseapp.com",
  databaseURL: "https://sliitresearch-42127-default-rtdb.firebaseio.com",
  projectId: "sliitresearch-42127",
  storageBucket: "sliitresearch-42127.appspot.com",
  messagingSenderId: "902258575434",
  appId: "1:902258575434:web:d28650125cc110508a3eb3",
  measurementId: "G-GPVLPEYPJG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectFirestore = getDatabase(app);
const auth = getAuth(app);

export { auth, projectFirestore };
