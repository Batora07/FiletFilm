import firebase, { initializeApp } from 'firebase';

export const initFirebase = () => {
    var firebaseConfig = {
        // remplacer par l'API firebaseConfig perso
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
};