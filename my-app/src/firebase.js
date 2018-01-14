import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBSBZjOzN_29TyYXvHmxwdDKaXZt5OH_Ns",
  authDomain: "inkblot-683ed.firebaseapp.com",
  databaseURL: "https://inkblot-683ed.firebaseio.com",
  projectId: "inkblot-683ed",
  storageBucket: "inkblot-683ed.appspot.com",
  messagingSenderId: "440147040063"
};


export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

firebase.initializeApp(config);
export default firebase;
