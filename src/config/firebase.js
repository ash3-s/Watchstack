import { initializeApp } from "firebase/app";

import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
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
export const googleProvider = new GoogleAuthProvider();

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

export const AddMovietoFirestoreWatchedList = (movie) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    if (user) {
      const userDocRef = doc(usersRef, user.uid);
      const subcollectionRef = collection(userDocRef, "moviewatchedlist");
      setDoc(doc(userDocRef, "moviewatchedlist", `${movie.id}`), movie)
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

export const RemoveMoviefromFirestoreWatchedList = (movie) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    if (user) {
      const userDocRef = doc(usersRef, user.uid);
      const subcollectionRef = collection(userDocRef, "moviewatchedlist");
      deleteDoc(doc(userDocRef, "moviewatchedlist", `${movie.id}`));
    } else {
      console.log("error");
    }
  });
  return unsubscribe;
};

export const AddShowtoFirestoreWatchList = (show) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    if (user) {
      const userDocRef = doc(usersRef, user.uid);
      const subcollectionRef = collection(userDocRef, "tvwatchlist");
      setDoc(doc(userDocRef, "tvwatchlist", `${show.id}`), show)
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

export const RemoveShowfromFirestoreWatchList = (show) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    if (user) {
      const userDocRef = doc(usersRef, user.uid);
      const subcollectionRef = collection(userDocRef, "tvwatchlist");
      deleteDoc(doc(userDocRef, "tvwatchlist", `${show.id}`));
    } else {
      console.log("error");
    }
  });
  return unsubscribe;
};

export const AddShowtoFirestoreWatchedList = (show) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    if (user) {
      const userDocRef = doc(usersRef, user.uid);
      const subcollectionRef = collection(userDocRef, "tvwatchedlist");
      setDoc(doc(userDocRef, "tvwatchedlist", `${show.id}`), show)
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

export const RemoveShowfromFirestoreWatchedList = (show) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    if (user) {
      const userDocRef = doc(usersRef, user.uid);
      const subcollectionRef = collection(userDocRef, "tvwatchedlist");
      deleteDoc(doc(userDocRef, "tvwatchedlist", `${show.id}`));
    } else {
      console.log("error");
    }
  });
  return unsubscribe;
};
