import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Replace with your Firebase project config (Project Settings > General > Your apps)
const firebaseConfig = {
  apiKey: "AIzaSyC7v_fwZ7gyTTwS2yQoi3YEm0gm3nxFME0",
  authDomain: "boss-g-pickleball.firebaseapp.com",
  projectId: "boss-g-pickleball",
  storageBucket: "boss-g-pickleball.firebasestorage.app",
  messagingSenderId: "235747939609",
  appId: "1:235747939609:web:98b4c70ae28f0e2008e188",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
