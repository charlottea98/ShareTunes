import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

export default firestore;
