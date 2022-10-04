


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAJac6t2Uj2NU4-52EzJs5aRfB3m1lh-vk",
    authDomain: "todo-app-with-firebase-11058.firebaseapp.com",
    projectId: "todo-app-with-firebase-11058",
    storageBucket: "todo-app-with-firebase-11058.appspot.com",
    messagingSenderId: "645603383988",
    appId: "1:645603383988:web:e1e0ddd6db2199576cd5e1",
    measurementId: "G-YTXCX21GVH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { db, auth };
