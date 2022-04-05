// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDXxJlqGp_0UdNXqf9BGpNdJxbyumoPmV4",
  authDomain: "clone-ba6ee.firebaseapp.com",
  projectId: "clone-ba6ee",
  storageBucket: "clone-ba6ee.appspot.com",
  messagingSenderId: "820352291065",
  appId: "1:820352291065:web:fa0f1ef1c365c706fb1228",
  measurementId: "G-RH2C8536MV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };
