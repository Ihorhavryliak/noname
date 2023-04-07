// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { FacebookAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0rDOiMvivqGX-Eiehkj_quRgCbPOuh40",
  authDomain: "noname-a8b8e.firebaseapp.com",
  projectId: "noname-a8b8e",
  storageBucket: "noname-a8b8e.appspot.com",
  messagingSenderId: "1039231032241",
  appId: "1:1039231032241:web:7fb15a72892216e7b7bb90",
  measurementId: "G-QEDNNYHPN0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore();

export const providerGoogle = new GoogleAuthProvider();
export const providerFacebook= new FacebookAuthProvider();