// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKFdzAjYrB92MEQgQjDo5x9iOrRJ107Jg",
  authDomain: "spothigher-4f966.firebaseapp.com",
  projectId: "spothigher-4f966",
  storageBucket: "spothigher-4f966.appspot.com",
  messagingSenderId: "282720398761",
  appId: "1:282720398761:web:a7b503e9bff6385a87a8b8",
  measurementId: "G-P0MY172KNS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
