import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJ5waD16Uvgsi-asuMYJpS8F4CHZXyfsM",
  authDomain: "test3-efcbe.firebaseapp.com",
  projectId: "test3-efcbe",
  storageBucket: "test3-efcbe.firebasestorage.app",
  messagingSenderId: "1080509534806",
  appId: "1:1080509534806:web:67a55c9c1c734ea5f461f7",
  measurementId: "G-P99EQPYFZW"
};


// Firebase の初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };