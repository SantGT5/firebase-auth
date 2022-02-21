import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
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
export const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("logged in !");
  } else {
    console.log("No user");
  }
});

export function useAuth() {
  const [currentUser, setCurrentUser] = React.useState();


  React.useEffect (() => {
    const unsub = onAuthStateChanged(auth, (user: any) => {
      setCurrentUser(user)
    })
    return unsub
  }, [])
console.log("useEffect -> ", currentUser)
  return currentUser
}

export function SignUp(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function LoginIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout(){
  return signOut(auth)
}
