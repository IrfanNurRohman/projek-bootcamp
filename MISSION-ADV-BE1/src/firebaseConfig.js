// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Ganti dengan konfigurasi Firebase project kamu
const firebaseConfig = {
  apiKey: "AIzaSyBXnpksTZGoPnONGvBu5ICgmcIafDI_nKc",
  authDomain: "bootcampharisenin-cbf8f.firebaseapp.com",
  projectId: "bootcampharisenin-cbf8f",
  storageBucket: "bootcampharisenin-cbf8f.firebasestorage.app",
  messagingSenderId: "179340502287",
  appId: "1:179340502287:web:f02fa1c60a0346332e4a7a",
  measurementId: "G-PJSB8HBSLC",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
