import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiqi9MdMNDyrxWcD7OqfI6XX3twn2AJtg",
  authDomain: "meilingtw.firebaseapp.com",
  projectId: "meilingtw",
  storageBucket: "meilingtw.firebasestorage.app",
  messagingSenderId: "987606418299",
  appId: "1:987606418299:web:53a4e961749e35c1b6f3de",
  measurementId: "G-W1FWYSH1VM"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();
const auth = firebase.auth();

export { firebase, firestore, auth };
