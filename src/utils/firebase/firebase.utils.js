// import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtNkvP0_yiNIgTyWyOpYgfBfV97ZcFE2w",
  authDomain: "crwn-clothing-db-2cd20.firebaseapp.com",
  projectId: "crwn-clothing-db-2cd20",
  storageBucket: "crwn-clothing-db-2cd20.appspot.com",
  messagingSenderId: "347476670720",
  appId: "1:347476670720:web:2a294b5a9c798907db5be5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    let { displayName, email } = userAuth;
    let createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (err) {
      console.log('Error creating the User', err.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) {
    return;
  }

   return await createUserWithEmailAndPassword(auth, email, password);

}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) {
    return;
  }
   return await signInWithEmailAndPassword(auth, email, password);
}