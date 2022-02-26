import firebase from 'firebase';

const firebaseConfig = {
    // Your credentials
    apiKey: "AIzaSyCs2JkAef58vyZcwrsixCZzGh88SgNkc2A",
    authDomain: "e-dtech-735b2.firebaseapp.com",
    projectId: "e-dtech-735b2",
    storageBucket: "e-dtech-735b2.appspot.com",
    messagingSenderId: "6655141320",
    appId: "1:6655141320:web:0a0595a571127600b28cfd",
    measurementId: "G-TEVDQSX69W"
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var db = firebase.firestore();
export { auth, firebase, db };
