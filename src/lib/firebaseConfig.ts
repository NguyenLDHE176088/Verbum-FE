// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0yuvZvE55K9IZBGNPpTPCFQkHPk4Cnlw",
  authDomain: "wdp-verbum.firebaseapp.com",
  projectId: "wdp-verbum",
  storageBucket: "wdp-verbum.appspot.com",
  messagingSenderId: "1025613134719",
  appId: "1:1025613134719:web:e373e70ae1d01af51e384a",
  measurementId: "G-LXMS0FK0K0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;