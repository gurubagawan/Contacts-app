import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBSBZjOzN_29TyYXvHmxwdDKaXZt5OH_Ns",
  authDomain: "inkblot-683ed.firebaseapp.com",
  databaseURL: "https://inkblot-683ed.firebaseio.com",
  projectId: "inkblot-683ed",
  storageBucket: "inkblot-683ed.appspot.com",
  messagingSenderId: "440147040063"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
