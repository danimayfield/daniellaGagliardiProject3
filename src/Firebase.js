import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBNnS3aRWCRDGAEhWlk_YFURv-OWhqPNjM",
    authDomain: "project3danimayfield.firebaseapp.com",
    databaseURL: "https://project3danimayfield-default-rtdb.firebaseio.com",
    projectId: "project3danimayfield",
    storageBucket: "project3danimayfield.appspot.com",
    messagingSenderId: "700693839396",
    appId: "1:700693839396:web:430d912f0ca341a1c322b1"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;

