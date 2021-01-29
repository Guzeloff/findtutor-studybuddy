import firebase from "firebase";

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC_Hw3z2iuIUHDgI4bBtQU60zlaJCX44lQ",
  authDomain: "find-tutor-studybuddy-e7179.firebaseapp.com",
  databaseURL: "https://find-tutor-studybuddy-e7179.firebaseio.com",
  projectId: "find-tutor-studybuddy-e7179",
  storageBucket: "find-tutor-studybuddy-e7179.appspot.com",
  messagingSenderId: "52766281085",
  appId: "1:52766281085:web:2e9ec882fab09014f9d014",
  measurementId: "G-Z789YKVXKJ",
});

const db = firebaseApp.firestore(); //getting from db

const auth = firebase.auth(); //getting the AUTH

const storage = firebase.storage(); // storage

export { db, auth, storage, firebase };
