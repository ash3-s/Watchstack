import { initializeApp } from "firebase/app";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  setDoc,
  addDoc,
  collection,
  doc,
  query,
  where,
  getDocs,
  deleteDoc,
  snapshotEqual,
} from "firebase/firestore";
import { useEffect } from "react";
const firebaseConfig = {
  apiKey: "AIzaSyCHF_qPanx8qLXh4uySXcgx568PXznTYaU",
  authDomain: "movie-app-d4bc4.firebaseapp.com",
  projectId: "movie-app-d4bc4",
  storageBucket: "movie-app-d4bc4.appspot.com",
  messagingSenderId: "776874130850",
  appId: "1:776874130850:web:422a425669e91b881746fb",
  measurementId: "G-CXXFJY67NT",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const Handlelogin = async () => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      const userID = user.uid;
      setDoc(doc(db, "users", user.uid), {
        name: "Tokyo",
        country: "Japan",
        id: `${userID}`,
      })
        .then((docRef) => {
          console.log(docRef);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log(user);
    }
  });
  return unsubscribe;
};

export const AddMovietoFirestoreWatchList = (movie) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    if (user) {
      const userDocRef = doc(usersRef, user.uid);
      const subcollectionRef = collection(userDocRef, "moviewatchlist");
      setDoc(doc(userDocRef, "moviewatchlist", `${movie.id}`), movie)
        .then((docRef) => {
          console.log(docRef);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("error");
    }
  });
  return unsubscribe;
};

export const RemoveMoviefromFirestoreWatchList = (movie) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    if (user) {
      const userDocRef = doc(usersRef, user.uid);
      const subcollectionRef = collection(userDocRef, "moviewatchlist");
      deleteDoc(doc(userDocRef, "moviewatchlist", `${movie.id}`));
    } else {
      console.log("error");
    }
  });
  return unsubscribe;
};
