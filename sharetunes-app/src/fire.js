import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './utility/keys';

const fire = firebase.initializeApp(firebaseConfig);

export default fire;