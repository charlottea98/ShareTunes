import firebase from 'firebase/app';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: 'AIzaSyBp5KfF5IYEA8dJnfBPVWJ7roYoZ3-i1J0',
    authDomain: 'coffee-app-60321.firebaseapp.com',
    projectId: 'coffee-app-60321',
    storageBucket: 'coffee-app-60321.appspot.com',
    messagingSenderId: '498539007106',
    appId: '1:498539007106:web:1bd7ca5ca88a8eb281f89b',
    measurementId: 'G-3XQHV6NQC3',
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
