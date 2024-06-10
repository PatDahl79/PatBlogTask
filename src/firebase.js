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
let app;

try {
  app = firebase.initializeApp(firebaseConfig);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export const auth = app ? app.auth() : null;

if (auth) {
  console.log("Firebase Auth initialized successfully");
} else {
  console.error("Firebase Auth initialization failed");
}

export default app;
