// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZwI_-NSdjHw9g2riYeDyOW1fEBcy0Fps",
  authDomain: "contraband-6190c.firebaseapp.com",
  projectId: "contraband-6190c",
  storageBucket: "contraband-6190c.appspot.com",
  messagingSenderId: "1001308276873",
  appId: "1:1001308276873:web:d9f9f9084bff03fe0ade58",
  measurementId: "G-0YFFXC2EYW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null; // Initialize Analytics only in the browser

export { db, analytics };
