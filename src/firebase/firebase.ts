import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzGBXG8P_oXpZfD9IVGneXQ07Toy31z-w",
  authDomain: "summarist-internship-9926d.firebaseapp.com",
  projectId: "summarist-internship-9926d",
  storageBucket: "summarist-internship-9926d.firebasestorage.app",
  messagingSenderId: "226890844734",
  appId: "1:226890844734:web:8122a40ce230b50acd5f6f",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);