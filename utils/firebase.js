// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfd7UQfFzbIclLk-UdASq842m-t1ysA7I",
  authDomain: "monknotes-d441b.firebaseapp.com",
  projectId: "monknotes-d441b",
  storageBucket: "monknotes-d441b.appspot.com",
  messagingSenderId: "429870175510",
  appId: "1:429870175510:web:c5e567c7615604540bac37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
