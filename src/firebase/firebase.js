import firebase from 'firebase';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDb51pqmVdlTwL-F-wC4HEfa5tUBLzQjZ0",
    authDomain: "left4dev-b2aab.firebaseapp.com",
    databaseURL: "https://left4dev-b2aab.firebaseio.com",
    projectId: "left4dev-b2aab",
    storageBucket: "left4dev-b2aab.appspot.com",
    messagingSenderId: "306408964348"
  };
var fire = firebase.initializeApp(config);
export default fire;
