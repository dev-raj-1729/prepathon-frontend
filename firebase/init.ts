// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBII1CCCn5VcVOS5-QGBS274P0VjPSQgTo",
  authDomain: "prepathon-62dcf.firebaseapp.com",
  projectId: "prepathon-62dcf",
  storageBucket: "prepathon-62dcf.appspot.com",
  messagingSenderId: "936972030075",
  appId: "1:936972030075:web:78e0fdd54b04168f7cd2de",
  measurementId: "G-LN98Q5BQZ9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

auth.useDeviceLanguage();

const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();

googleAuthProvider.setCustomParameters({
  prompt: "select_account",
});

export function signInWithGoogle() {
  console.log("Google Sign in");
  signInWithPopup(auth, googleAuthProvider)
    .then((result) => {
      console.log("Signed in with Google");
      console.log(result);
    })
    .catch((error) => {
      console.log("Google Sign In Failed");
      console.log(error);
    });
}

export function signInWithFacebook() {
  signInWithPopup(auth, facebookAuthProvider)
    .then((result) => {
      console.log("Signed in with facebook");
      console.log(result);
    })
    .catch((error) => {
      console.log("Facebook Login Failed");
      console.log(error);
    });
}
