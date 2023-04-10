import React from "react";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AddMovietoFirestore = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const db = getFirestore();
      const usersRef = collection(db, "users");
      auth = getAuth();
      if (user) {
        const userDocRef = doc(usersRef, user.uid);
        const subcollectionRef = collection(userDocRef, "moviewatchlist");
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
        console.log("error");
      }
    });
    return unsubscribe;
  }, []);

  return <div>Movie</div>;
};

export default AddMovietoFirestore;
