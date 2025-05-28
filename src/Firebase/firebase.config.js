// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPnxFjPhEjouWm_0wZb3KQfcMxyKRiOeg",
  authDomain: "coffee-house-a64ba.firebaseapp.com",
  projectId: "coffee-house-a64ba",
  storageBucket: "coffee-house-a64ba.firebasestorage.app",
  messagingSenderId: "876361164128",
  appId: "1:876361164128:web:d48dbfc07c3ced6dceea05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export default auth