// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdHXtl0yxc68KHr7Qrge6IpH2LUJzunAQ",
  authDomain: "realtor-clone-b8fde.firebaseapp.com",
  projectId: "realtor-clone-b8fde",
  storageBucket: "realtor-clone-b8fde.firebasestorage.app",
  messagingSenderId: "936660062538",
  appId: "1:936660062538:web:607f2a5089c134a11931b3",
  measurementId: "G-JR71JB03H5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };