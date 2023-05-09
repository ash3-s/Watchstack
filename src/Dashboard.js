import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { auth } from "./config/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link, useSubmit } from "react-router-dom";
import {
  db,
  RemoveGamefromFirestoreBacklog,
  AddGametoFirestorePlayedList,
  AddMovietoFirestoreWatchedList,
  RemoveMoviefromFirestoreWatchList,
  AddShowtoFirestoreWatchedList,
  RemoveShowfromFirestoreWatchList,
  AddAnimetoFirestoreWatchedList,
  RemoveAnimefromFirestoreWatchList,
} from "./config/firebase";
import {
  getDocs,
  collection,
  getFirestore,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import GameBacklog from "./components/GameBacklog";
import Navbar from "./components/Navbar";
import MovieWatchList from "./components/MovieWatchList";
import "./navbarbuttons.css";

const Dashboard = () => {
  const [backlog, setBacklog] = useState([]);
  const [played, setPlayed] = useState([]);
  const [Moviewatchlist, setMovieWatchlist] = useState([]);
  const [Moviewatched, setMovieWatched] = useState([]);
  const [TVwatchlist, setTVWatchlist] = useState([]);
  const [TVwatched, setTVWatched] = useState([]);
  const [Animewatchlist, setAnimeWatchlist] = useState([]);
  const [Animewatched, setAnimeWatched] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    FetchGameBacklog();
    FetchMovieWatchList();
    FetchShowWatchList();
    FetchAnimeWatchList();
  }, []);

  const FetchGameBacklog = () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const db = getFirestore();
      const usersRef = collection(db, "users");
      if (user) {
        const userDocRef = doc(usersRef, user.uid);
        const subcollectionRef = collection(userDocRef, "gamebacklog");
        const snapshot = getDocs(subcollectionRef);
        const q = query(subcollectionRef, orderBy("timestamp", "desc"));
        getDocs(q)
          .then((querySnapshot) => {
            const gamebacklogfromfirestore = [];
            querySnapshot.forEach((doc) => {
              gamebacklogfromfirestore.push({ ...doc.data(), id: doc.id });
              console.log(doc);
            });
            setBacklog(gamebacklogfromfirestore);
          })
          .catch((err) => {
            console.log(err.message);
          });
        /*const ml = getDocs(subcollectionRef)
          .then((snapshot) => {
            const gamebacklogfromfirestore = [];
            snapshot.docs.forEach((doc) => {
              gamebacklogfromfirestore.push({ ...doc.data(), id: doc.id });
            });
            setBacklog(gamebacklogfromfirestore.reverse());
          })
          .catch((err) => {
            console.log(err.message);
          });*/
      } else {
        console.log("error");
      }
      return unsubscribe;
    });
  };

  const FetchMovieWatchList = () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const db = getFirestore();
      const usersRef = collection(db, "users");
      if (user) {
        const userDocRef = doc(usersRef, user.uid);
        const subcollectionRef = collection(userDocRef, "moviewatchlist");
        const snapshot = getDocs(subcollectionRef);
        const q = query(subcollectionRef, orderBy("timestamp", "desc"));
        getDocs(q)
          .then((querySnapshot) => {
            const moviewatchlistfromfirestore = [];
            querySnapshot.forEach((doc) => {
              moviewatchlistfromfirestore.push({ ...doc.data(), id: doc.id });
              console.log(doc);
            });
            setMovieWatchlist(moviewatchlistfromfirestore);
          })
          .catch((err) => {
            console.log(err.message);
          });

        /*const ml = getDocs(subcollectionRef)
          .then((snapshot) => {
            const moviewatchlistfromfirestore = [];
            snapshot.docs.forEach((doc) => {
              moviewatchlistfromfirestore.push({ ...doc.data(), id: doc.id });
              console.log(doc);
            });
            setWatchlist(moviewatchlistfromfirestore);
          })
          .catch((err) => {
            console.log(err.message);
          });*/
      } else {
        console.log("error");
      }
      return unsubscribe;
    });
  };

  const FetchShowWatchList = () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const db = getFirestore();
      const usersRef = collection(db, "users");
      if (user) {
        const userDocRef = doc(usersRef, user.uid);
        const subcollectionRef = collection(userDocRef, "tvwatchlist");
        const snapshot = getDocs(subcollectionRef);
        const q = query(subcollectionRef, orderBy("timestamp", "desc"));
        getDocs(q)
          .then((querySnapshot) => {
            const tvwatchlistfromfirestore = [];
            querySnapshot.forEach((doc) => {
              tvwatchlistfromfirestore.push({ ...doc.data(), id: doc.id });
            });
            setTVWatchlist(tvwatchlistfromfirestore);
          })
          .catch((err) => {
            console.log(err.message);
          });

        /*const ml = getDocs(subcollectionRef)
          .then((snapshot) => {
            const tvwatchlistfromfirestore = [];
            snapshot.docs.forEach((doc) => {
              tvwatchlistfromfirestore.push({ ...doc.data(), id: doc.id });
            });
            setWatchlist(tvwatchlistfromfirestore.reverse());
          })
          .catch((err) => {
            console.log(err.message);
          });*/
      } else {
        console.log("error");
      }
      return unsubscribe;
    });
  };

  const FetchAnimeWatchList = () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const db = getFirestore();
      const usersRef = collection(db, "users");
      if (user) {
        const userDocRef = doc(usersRef, user.uid);
        const subcollectionRef = collection(userDocRef, "animewatchlist");
        const snapshot = getDocs(subcollectionRef);
        const q = query(subcollectionRef, orderBy("timestamp", "desc"));
        getDocs(q)
          .then((querySnapshot) => {
            const animewatchlistfromfirestore = [];
            querySnapshot.forEach((doc) => {
              animewatchlistfromfirestore.push({ ...doc.data(), id: doc.id });
              console.log(doc);
            });
            setAnimeWatchlist(animewatchlistfromfirestore);
          })
          .catch((err) => {
            console.log(err.message);
          });
        /*const ml = getDocs(subcollectionRef)
          .then((snapshot) => {
            const animewatchlistfromfirestore = [];
            snapshot.docs.forEach((doc) => {
              animewatchlistfromfirestore.push({ ...doc.data(), id: doc.id });
            });
            setWatchlist(animewatchlistfromfirestore.reverse());
          })
          .catch((err) => {
            console.log(err.message);
          });*/
      } else {
        console.log("error");
      }
      return unsubscribe;
    });
  };

  const addtoplayedlist = (game) => {
    const newlist = backlog.filter((favourite) => favourite.id !== game.id);
    setBacklog(newlist);
    const newList = [game, ...played];
    setPlayed(newList);
    AddGametoFirestorePlayedList(game);
    RemoveGamefromFirestoreBacklog(game);
  };

  const removefrombacklog = (game) => {
    const newlist = backlog.filter((favourite) => favourite.id !== game.id);
    setBacklog(newlist);
    RemoveGamefromFirestoreBacklog(game);
  };

  const addtomoviewatchedlist = (movie) => {
    const newlist = Moviewatchlist.filter(
      (favourite) => favourite.id !== movie.id
    );
    setMovieWatchlist(newlist);
    const newList = [movie, ...Moviewatched];
    setMovieWatched(newList);
    AddMovietoFirestoreWatchedList(movie);
    RemoveMoviefromFirestoreWatchList(movie);
  };

  const removefrommoviewatchlist = (movie) => {
    const newlist = Moviewatchlist.filter(
      (favourite) => favourite.id !== movie.id
    );
    setMovieWatchlist(newlist);
    RemoveMoviefromFirestoreWatchList(movie);
  };

  const addtotvwatchedlist = (show) => {
    const newlist = TVwatchlist.filter((favourite) => favourite.id !== show.id);
    setTVWatchlist(newlist);
    const newList = [show, ...TVwatched];
    setTVWatched(newList);
    AddShowtoFirestoreWatchedList(show);
    RemoveShowfromFirestoreWatchList(show);
  };

  const removefromtvwatchlist = (show) => {
    const newlist = TVwatchlist.filter((favourite) => favourite.id !== show.id);
    setTVWatchlist(newlist);
    RemoveShowfromFirestoreWatchList(show);
  };

  const addtoanimewatchedlist = (anime) => {
    const newlist = Animewatchlist.filter(
      (favourite) => favourite.id !== anime.id
    );
    setAnimeWatchlist(newlist);
    const newList = [anime, ...Animewatched];
    setAnimeWatched(newList);
    AddAnimetoFirestoreWatchedList(anime);
    RemoveAnimefromFirestoreWatchList(anime);
  };
  const removefromanimewatchlist = (anime) => {
    const newlist = Animewatchlist.filter(
      (favourite) => favourite.id !== anime.id
    );
    setAnimeWatchlist(newlist);
    RemoveAnimefromFirestoreWatchList(anime);
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar>
        <button className=" buttonn" onClick={() => navigate("/games")}>
          Games
        </button>
        <button className="buttonn" onClick={() => navigate("/movies")}>
          Movies
        </button>
        <button className="buttonn" onClick={() => navigate("/tv")}>
          TV Shows
        </button>
        <button className=" buttonn" onClick={() => navigate("/anime")}>
          Anime
        </button>
        <button className="buttonn " onClick={logout}>
          Logout
        </button>
      </Navbar>
      <div className="container-fluid movie-app">
        <div className="row d-flex align-items-center mt-4 mb-4 ml-4">
          <button
            className="h12 buttonn ml-4"
            onClick={() => navigate("/games")}
          >
            Backlog
          </button>
        </div>

        <div className="row ml-3">
          <GameBacklog
            movies={backlog}
            handleoverlayclick={removefrombacklog}
            handleoverlayclick2={addtoplayedlist}
          />
        </div>
      </div>
      <div>
        <h1 className="h11">Watchlists:</h1>
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4 ml-4">
        <button
          className="h12 buttonn ml-5"
          onClick={() => navigate("/movies")}
        >
          Movies
        </button>
      </div>
      <div className="row ml-4">
        <MovieWatchList
          movies={Moviewatchlist}
          handleoverlayclick={removefrommoviewatchlist}
          handleoverlayclick2={addtomoviewatchedlist}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4 ml-4">
        <button className="h12 buttonn ml-5" onClick={() => navigate("/tv")}>
          TV Shows
        </button>
      </div>
      <div className="row ml-4">
        <MovieWatchList
          movies={TVwatchlist}
          handleoverlayclick={removefromtvwatchlist}
          handleoverlayclick2={addtotvwatchedlist}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4 ml-4">
        <button className="h12 buttonn ml-5" onClick={() => navigate("/anime")}>
          Anime
        </button>
      </div>
      <div className="row ml-4">
        <MovieWatchList
          movies={Animewatchlist}
          handleoverlayclick={removefromanimewatchlist}
          handleoverlayclick2={addtoanimewatchedlist}
        />
      </div>
    </div>
  );
};

export default Dashboard;
