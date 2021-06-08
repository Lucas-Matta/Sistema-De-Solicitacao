import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyBZS997s1KwgBX91qqggfX4CnVUMu-7JSw",
    authDomain: "sistema-4ea50.firebaseapp.com",
    projectId: "sistema-4ea50",
    storageBucket: "sistema-4ea50.appspot.com",
    messagingSenderId: "11390609423",
    appId: "1:11390609423:web:6b3235bdaeff95001b9b7a",
    measurementId: "G-HYV04F1YZK"
  };
  // Verificação para ver se tem conexão aberta
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

export default firebase;