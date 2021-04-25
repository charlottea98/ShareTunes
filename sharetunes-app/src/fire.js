import firebase from 'firebase/app';
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAMfGgM-Jx_u1U16HkXPLJcMYwi1SC7hn8",
    authDomain: "sharetunesmedia.firebaseapp.com",
    projectId: "sharetunesmedia",
    storageBucket: "sharetunesmedia.appspot.com",
    messagingSenderId: "238276949788",
    appId: "1:238276949788:web:99222d19b318be544cecd9",
    measurementId: "G-L1BB7TL6X5"
  };

const fire = firebase.initializeApp(firebaseConfig);

export default fire;