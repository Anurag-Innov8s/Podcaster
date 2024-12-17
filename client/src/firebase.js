// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPs13AXpr5Ve1mzZFGKBfzW8bsDVmWkhw",
  authDomain: "podcaster-c015f.firebaseapp.com",
  projectId: "podcaster-c015f",
  storageBucket: "podcaster-c015f.appspot.com",
  messagingSenderId: "952256557806",
  appId: "1:952256557806:web:ff12451774bc1788d139ff",
  measurementId: "G-4EM8V0QPNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;