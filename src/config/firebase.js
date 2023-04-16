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
  updateDoc,
  deleteDoc,
  serverTimestamp,
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
      const updateTimestamp = updateDoc(
        doc(userDocRef, "moviewatchlist", `${movie.id}`),
        {
          timestamp: serverTimestamp(),
        }
      );
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
      const updateTimestamp = updateDoc(
        doc(userDocRef, "moviewatchedlist", `${movie.id}`),
        {
          timestamp: serverTimestamp(),
        }
      );
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
      const updateTimestamp = updateDoc(
        doc(userDocRef, "tvwatchlist", `${show.id}`),
        {
          timestamp: serverTimestamp(),
        }
      );
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
      const updateTimestamp = updateDoc(
        doc(userDocRef, "tvwatchedlist", `${show.id}`),
        {
          timestamp: serverTimestamp(),
        }
      );
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

export const AddAnimetoFirestoreWatchList = (anime) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    if (user) {
      const userDocRef = doc(usersRef, user.uid);
      const subcollectionRef = collection(userDocRef, "animewatchlist");
      setDoc(doc(userDocRef, "animewatchlist", `${anime.id}`), anime)
        .then((docRef) => {
          console.log(docRef);
        })
        .catch((error) => {
          console.log(error);
        });
      const updateTimestamp = updateDoc(
        doc(userDocRef, "animewatchlist", `${anime.id}`),
        {
          timestamp: serverTimestamp(),
        }
      );
    } else {
      console.log("error");
    }
  });
  return unsubscribe;
};

export const RemoveAnimefromFirestoreWatchList = (anime) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    if (user) {
      const userDocRef = doc(usersRef, user.uid);
      const subcollectionRef = collection(userDocRef, "animewatchlist");
      deleteDoc(doc(userDocRef, "animewatchlist", `${anime.id}`));
    } else {
      console.log("error");
    }
  });
  return unsubscribe;
};

export const AddAnimetoFirestoreWatchedList = (anime) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    if (user) {
      const userDocRef = doc(usersRef, user.uid);
      const subcollectionRef = collection(userDocRef, "animewatchedlist");
      setDoc(doc(userDocRef, "animewatchedlist", `${anime.id}`), anime)
        .then((docRef) => {
          console.log(docRef);
        })
        .catch((error) => {
          console.log(error);
        });
      const updateTimestamp = updateDoc(
        doc(userDocRef, "animewatchedlist", `${anime.id}`),
        {
          timestamp: serverTimestamp(),
        }
      );
    } else {
      console.log("error");
    }
  });
  return unsubscribe;
};

export const RemoveAnimefromFirestoreWatchedList = (anime) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    if (user) {
      const userDocRef = doc(usersRef, user.uid);
      const subcollectionRef = collection(userDocRef, "animewatchedlist");
      deleteDoc(doc(userDocRef, "animewatchedlist", `${anime.id}`));
    } else {
      console.log("error");
    }
  });
  return unsubscribe;
};

export const AddGametoFirestoreBacklog = (game) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    if (user) {
      const userDocRef = doc(usersRef, user.uid);
      const subcollectionRef = collection(userDocRef, "gamebacklog");
      setDoc(doc(userDocRef, "gamebacklog", `${game.id}`), game)
        .then((docRef) => {
          console.log(docRef);
        })
        .catch((error) => {
          console.log(error);
        });
      const updateTimestamp = updateDoc(
        doc(userDocRef, "gamebacklog", `${game.id}`),
        {
          timestamp: serverTimestamp(),
        }
      );
    } else {
      console.log("error");
    }
  });
  return unsubscribe;
};

export const RemoveGamefromFirestoreBacklog = (game) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    if (user) {
      const userDocRef = doc(usersRef, user.uid);
      const subcollectionRef = collection(userDocRef, "gamebacklog");
      deleteDoc(doc(userDocRef, "gamebacklog", `${game.id}`));
    } else {
      console.log("error");
    }
  });
  return unsubscribe;
};

export const AddGametoFirestorePlayedList = (game) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    if (user) {
      const userDocRef = doc(usersRef, user.uid);
      const subcollectionRef = collection(userDocRef, "gameplayedlist");
      setDoc(doc(userDocRef, "gameplayedlist", `${game.id}`), game)
        .then((docRef) => {
          console.log(docRef);
        })
        .catch((error) => {
          console.log(error);
        });
      const updateTimestamp = updateDoc(
        doc(userDocRef, "gameplayedlist", `${game.id}`),
        {
          timestamp: serverTimestamp(),
        }
      );
    } else {
      console.log("error");
    }
  });
  return unsubscribe;
};

export const RemoveGamefromFirestorePlayedList = (game) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    if (user) {
      const userDocRef = doc(usersRef, user.uid);
      const subcollectionRef = collection(userDocRef, "gameplayedlist");
      deleteDoc(doc(userDocRef, "gameplayedlist", `${game.id}`));
    } else {
      console.log("error");
    }
  });
  return unsubscribe;
};
