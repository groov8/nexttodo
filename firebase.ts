import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANNMnxBEewVyoeqbGpmn-qFMpFSAei0bk",
  authDomain: "next-todo-859a0.firebaseapp.com",
  projectId: "next-todo-859a0",
  storageBucket: "next-todo-859a0.appspot.com",
  messagingSenderId: "921346429588",
  appId: "1:921346429588:web:145bdd14e874d27eea1a81"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {db, auth, provider};