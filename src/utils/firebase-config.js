import firebase, { initializeApp } from 'firebase';

export const initFirebase = () => {
    var firebaseConfig = {
        apiKey: "AIzaSyB4mt2fTuA9O58sLoqo3MBqnO8Xq9LfW6c",
        authDomain: "filetfilm-925ac.firebaseapp.com",
        databaseURL: "https://filetfilm-925ac.firebaseio.com",
        projectId: "filetfilm-925ac",
        storageBucket: "filetfilm-925ac.appspot.com",
        messagingSenderId: "735033997010",
        appId: "1:735033997010:web:9eb1bc52368fc2ae419f0b"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
};