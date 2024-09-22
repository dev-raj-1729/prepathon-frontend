// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
