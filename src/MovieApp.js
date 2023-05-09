import React, { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieHeading from "./components/MovieHeading";
import SearchBox from "./components/SearchBox";
import MovieList2 from "./components/MovieList2";
import { auth } from "./config/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import {
  db,
  AddMovietoFirestoreWatchList,
  RemoveMoviefromFirestoreWatchList,
  AddMovietoFirestoreWatchedList,
  RemoveMoviefromFirestoreWatchedList,
} from "./config/firebase";
import {
  getDocs,
  collection,
  getFirestore,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import Navbar from "./components/Navbar";
import "./navbarbuttons.css";
import MovieWatchList from "./components/MovieWatchList";

const MovieApp = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [watched, setWatched] = useState([]);
  const navigate = useNavigate();
  const users = collection(db, "Users");
  /*  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }*/

  const getMovieRequest = async (searchValue) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=f46cc141482b65a1ce4af7ceec09ccd5&language=en-US&page=1&include_adult=false&query=${searchValue}`;

    const Movieresponse = await fetch(url);
    const responseJson = await Movieresponse.json();
    //console.log(responseJson);
    if (!responseJson.errors) {
      setMovies(responseJson.results);
    }
  };
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    FetchMovieWatchList();
    FetchMovieWatchedList();
    console.log(watchlist);
  }, []);

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
            setWatchlist(moviewatchlistfromfirestore);
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
  const FetchMovieWatchedList = () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const db = getFirestore();
      const usersRef = collection(db, "users");
      if (user) {
        const userDocRef = doc(usersRef, user.uid);
        const subcollectionRef = collection(userDocRef, "moviewatchedlist");
        const snapshot = getDocs(subcollectionRef);
        const q = query(subcollectionRef, orderBy("timestamp", "desc"));
        getDocs(q)
          .then((querySnapshot) => {
            const moviewatchlistfromfirestore = [];
            querySnapshot.forEach((doc) => {
              moviewatchlistfromfirestore.push({ ...doc.data(), id: doc.id });
              console.log(doc);
            });
            setWatched(moviewatchlistfromfirestore);
          })
          .catch((err) => {
            console.log(err.message);
          });
        /*const ml = getDocs(subcollectionRef)
          .then((snapshot) => {
            const moviewatchlistfromfirestore = [];
            snapshot.docs.forEach((doc) => {
              moviewatchlistfromfirestore.push({ ...doc.data(), id: doc.id });
            });
            setWatched(moviewatchlistfromfirestore.reverse());
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
  const addtolist = (movie) => {
    if (watchlist.find((m) => parseInt(m.id) === movie.id)) {
      alert("This movie is already in your watchlist!");
      return;
    }
    if (watched.find((m) => parseInt(m.id) === movie.id)) {
      alert("This movie is already in your watched list!");
      return;
    }
    const newList = [movie, ...watchlist];
    setWatchlist(newList);
    AddMovietoFirestoreWatchList(movie);
    console.log(watchlist);
  };
  const removefromlist = (movie) => {
    const newlist = watchlist.filter((favourite) => favourite.id !== movie.id);
    setWatchlist(newlist);
    RemoveMoviefromFirestoreWatchList(movie);
  };
  const addtowatchedlist = (movie) => {
    if (watched.find((m) => parseInt(m.id) === movie.id)) {
      alert("This movie is already in your watched list!");
      return;
    }
    const newlist = watchlist.filter((favourite) => favourite.id !== movie.id);
    setWatchlist(newlist);
    const newList = [movie, ...watched];
    setWatched(newList);
    AddMovietoFirestoreWatchedList(movie);
    RemoveMoviefromFirestoreWatchList(movie);
  };
  const removefromwatched = (movie) => {
    const newlist = watched.filter((favourite) => favourite.id !== movie.id);
    setWatched(newlist);
    RemoveMoviefromFirestoreWatchedList(movie);
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
        <div className="row ">
          <MovieHeading heading="MOVIES" />
        </div>
        <div className="row d-flex align-items-center mt-4 mb-4">
          <SearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            type="movies..."
          />
        </div>
        <div className="row">
          <MovieList
            movies={movies}
            handleoverlayclick={addtolist}
            handleoverlayclick2={addtowatchedlist}
          />
        </div>
        <MovieHeading heading="Watchlist" />
      </div>
      <div className="row ml-3">
        <MovieWatchList
          movies={watchlist}
          handleoverlayclick={removefromlist}
          handleoverlayclick2={addtowatchedlist}
        />
      </div>
      <div className="result-card">
        <div className="poster-wrapper wl hea">
          <MovieHeading heading="Finished Watching" />
          <MovieList2
            movies={watched}
            handleremovefromwatched={removefromwatched}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieApp;
