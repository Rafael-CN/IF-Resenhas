// Import the functions you need from the SDKs you need
//import * as firebase from "firebase
//import * as firebase from "firebase/app";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// cada produto do firebase deve ser importad separadamente
//por exemplo auth de autenticação
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFaFr6yq21swMQXBSYZEWLtxCiv3M_CoM",
    authDomain: "ddmii-19e48.firebaseapp.com",
    projectId: "ddmii-19e48",
    storageBucket: "ddmii-19e48.appspot.com",
    messagingSenderId: "501963332658",
    appId: "1:501963332658:web:d970a065b28b10cad8702b",
    measurementId: "G-D52Z8BXCMH",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
export { auth, firestore, storage };
