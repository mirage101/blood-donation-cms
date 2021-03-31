/* eslint-disable */
import firebase from 'firebase';

 const firebaseConfig = {
    apiKey: "AIzaSyATIptf6cHr5cQ4-3LAAiMPOWCjlhTXrMc",
    authDomain: "vue-spas-ffe28.firebaseapp.com",
    databaseURL: "https://vue-spas-ffe28.firebaseio.com",
    projectId: "vue-spas-ffe28",
    storageBucket: "vue-spas-ffe28.appspot.com",
    messagingSenderId: "329658329646",
    appId: "1:329658329646:web:f6079be9f7502a17760dbf"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore();
