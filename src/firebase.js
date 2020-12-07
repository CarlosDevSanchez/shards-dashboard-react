import firebase from 'firebase/app';
import 'firebase/firebase-storage';

const firebaseConfig = {
    apiKey: "AIzaSyBXKkMH70RYs8-9PJfXdfzVb42jzROeVeM",
    authDomain: "secretosapp-29ea6.firebaseapp.com",
    databaseURL: "https://secretosapp-29ea6.firebaseio.com",
    projectId: "secretosapp-29ea6",
    storageBucket: "secretosapp-29ea6.appspot.com",
    messagingSenderId: "380482307500",
    appId: "1:380482307500:web:43eb1f0b45cb7a973ee609",
    measurementId: "G-D65NBY4ZF7"
};

firebase.initializeApp(firebaseConfig);
export const ref =  firebase.storage();
