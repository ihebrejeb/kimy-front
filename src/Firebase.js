import firebase from 'firebase' ;


const firebaseConfig = {
    apiKey: "AIzaSyA4SdBwFHn1STBWq6JT67bopV4Wn4umHGY",
    authDomain: "kimy-75dac.firebaseapp.com",
    projectId: "kimy-75dac",
    storageBucket: "kimy-75dac.appspot.com",
    messagingSenderId: "538402468977",
    appId: "1:538402468977:web:d467f620db54ddfcbb17d0"
  };

  
  const firebaseapp = firebase.initializeApp(firebaseConfig) ; 
  const db = firebaseapp.firestore() ; 
  const auth = firebase.auth();

  export {auth}
  export default db ;