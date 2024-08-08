// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe0ugH57DwxEww2M5BsY2vqKcpsHGfZlw",
  authDomain: "fir-movies-1236e.firebaseapp.com",
  projectId: "fir-movies-1236e",
  storageBucket: "fir-movies-1236e.appspot.com",
  messagingSenderId: "894981266356",
  appId: "1:894981266356:web:b019fe0db59e443f3d70e1",
  measurementId: "G-7GH31TZWYT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
