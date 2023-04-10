import React, { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieHeading from "./components/MovieHeading";
import SearchBox from "./components/SearchBox";
import AddtoWatchList from "./components/AddtoWatchList";
import RemovefromWatchList from "./components/RemovefromWatchList";
import MovieList2 from "./components/MovieList2";
import { auth } from "./config/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  db,
  AddMovietoFirestoreWatchList,
  RemoveMoviefromFirestoreWatchList,
} from "./config/firebase";
import { getDocs, collection, getFirestore, doc } from "firebase/firestore";

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
        const ml = getDocs(subcollectionRef)
          .then((snapshot) => {
            const moviewatchlistfromfirestore = [];
            snapshot.docs.forEach((doc) => {
              moviewatchlistfromfirestore.push({ ...doc.data(), id: doc.id });
            });
            setWatchlist(moviewatchlistfromfirestore);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        console.log("error");
      }
      return unsubscribe;
    });
    //console.log(watchlist);
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
    const newList = [...watchlist, movie];
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
    const newList = [...watched, movie];
    setWatched(newList);
    console.log(watched);
  };
  const removefromwatched = (movie) => {
    const newlist = watched.filter((favourite) => favourite.id !== movie.id);
    setWatched(newlist);
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
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <button onClick={logout}> Logout </button>
        <MovieHeading heading="Movies" />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          handleoverlayclick={addtolist}
          handleoverlayclick2={addtowatchedlist}
          watchlist={AddtoWatchList}
        />
      </div>
      <div className="row">
        <MovieHeading heading="Watchlist" />
        <MovieList
          movies={watchlist}
          handleoverlayclick={removefromlist}
          handleoverlayclick2={addtowatchedlist}
          watchlist={RemovefromWatchList}
        />
      </div>
      <div className="result-card">
        <div className="poster-wrapper">
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
