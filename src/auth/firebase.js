import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDM4_HVsV5sXjmRZzZ8P5RAD9oqn7Q3Jpw",
  authDomain: "todo-app-53a3a.firebaseapp.com",
  projectId: "todo-app-53a3a",
  storageBucket: "todo-app-53a3a.appspot.com",
  messagingSenderId: "661788375653",
  appId: "1:661788375653:web:a8267a069a050fdd60648c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };