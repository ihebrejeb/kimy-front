import firebase from 'firebase' ;
import { useHistory } from "react-router-dom";

const firebaseConfig = {
    apiKey: "AIzaSyBFuAru3tgBnO5-e3lqz1ELSv_J23VhutM",
    authDomain: "kimy-online-classroom.firebaseapp.com",
    projectId: "kimy-online-classroom",
    storageBucket: "kimy-online-classroom.appspot.com",
    messagingSenderId: "538402468977",
    appId: "1:538402468977:web:d467f620db54ddfcbb17d0"
  };

  
  const firebaseapp = firebase.initializeApp(firebaseConfig) ; 
  const db = firebaseapp.firestore() ; 
  const auth = firebase.auth();

  export {auth}

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  
  auth.signInWithPopup(googleProvider).then((res) => {
    console.log(res.user);
    console.log('hola')
    var usr = auth.currentUser;
        console.log('gola');
        console.log(usr);
       // console.log("  Name: " + usr.name);
    console.log("  Email: " + usr.email);
  }).catch((error) => {
    console.log(error.message)
  })
}
  export default db ;