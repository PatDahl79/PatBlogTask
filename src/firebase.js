import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYzrb91znr5wEe-E8_C31NzZRALunVbp0",
  authDomain: "blog-app-d953d.firebaseapp.com",
  projectId: "blog-app-d953d",
  storageBucket: "blog-app-d953d.appspot.com",
  messagingSenderId: "931961983980",
  appId: "1:931961983980:web:8160c03b40f1126f4c26c9"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app ? app.auth() : null;
export const firestore = app ? app.firestore() : null;

