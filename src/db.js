/* eslint-disable */
import firebase from 'firebase';

 const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "329658329646",
    appId: "1:329658329646:web:f6079be9f7502a17760dbf"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore();
