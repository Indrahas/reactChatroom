import firebase from "firebase/app"
import "firebase/auth"

export const auth = firebase.initializeApp({
  apiKey: "AIzaSyA56-U2158tM1bfoaxMCLhCZKG7tizTpsQ",
  authDomain: "pay1chat.firebaseapp.com",
  projectId: "pay1chat",
  storageBucket: "pay1chat.appspot.com",
  messagingSenderId: "362491129685",
  appId: "1:362491129685:web:cd37ee48f68ab084bf49dc"
}).auth()
