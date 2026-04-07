import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyCwb08el9RNAYbNr5ugGSgkaCiLiFAhWK8",
  authDomain: "seafood-tunu.firebaseapp.com",
  projectId: "seafood-tunu",
  storageBucket: "seafood-tunu.firebasestorage.app",
  messagingSenderId: "937485451700",
  appId: "1:937485451700:web:836a75d24d7bdaa9d832e1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);