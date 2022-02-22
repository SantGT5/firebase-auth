import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import React from "react";

const firebaseConfig = {
  apiKey: "AIzaSyC4c_cWiWTGrkt4M0DC7wWJKYZkE-r7xS4",
  authDomain: "react-firebase-a0300.firebaseapp.com",
  projectId: "react-firebase-a0300",
  storageBucket: "react-firebase-a0300.appspot.com",
  messagingSenderId: "938633460805",
  appId: "1:938633460805:web:3ca5126e4b0cf29f2df72c",
  measurementId: "G-46H6H7S96K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);

export function useAuth() {
  const [currentUser, setCurrentUser] = React.useState<any>();

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: any) => {
      setCurrentUser(user);
    });
    return unsub;
  }, []);

  currentUser &&
    localStorage.setItem("loggedInUser", JSON.stringify(currentUser));

  return currentUser;
}

export function SignUp(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function LoginIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function LoginWithGoogle() {
  const googleAuthProvider = new GoogleAuthProvider()
  return signInWithPopup(auth ,googleAuthProvider)
}

export function ResetPassword(email: string) {
  return sendPasswordResetEmail(auth, email)
}

export function logout() {
  localStorage.clear();
  return signOut(auth);
}
