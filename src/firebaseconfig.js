import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCTzFBVwo58qIQ4YbtcJMLdBlgYCYVhXIA",
    authDomain: "internship-489eb.firebaseapp.com",
    projectId: "internship-489eb",
    storageBucket: "internship-489eb.appspot.com",
    messagingSenderId: "1098458152478",
    appId: "1:1098458152478:web:a984d2f234e411a38e780f",
    measurementId: "G-5K8TGM8MEN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)