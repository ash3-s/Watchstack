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
  AddShowtoFirestoreWatchList,
  RemoveShowfromFirestoreWatchList,
  AddShowtoFirestoreWatchedList,
  RemoveShowfromFirestoreWatchedList,
} from "./config/firebase";
import { getDocs, collection, getFirestore, doc } from "firebase/firestore";

const TVApp = () => {
  const [shows, setShows] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [watched, setWatched] = useState([]);
  const navigate = useNavigate();
  const users = collection(db, "Users");

  const getMovieRequest = async (searchValue) => {
    const url = `https://api.themoviedb.org/3/search/tv?api_key=f46cc141482b65a1ce4af7ceec09ccd5&language=en-US&page=1&include_adult=false&query=${searchValue}`;

    const Showresponse = await fetch(url);
    const responseJson = await Showresponse.json();
    //console.log(responseJson);
    if (!responseJson.errors) {
      setShows(responseJson.results);
    }
  };
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    FetchShowWatchList();
    FetchShowWatchedList();
    console.log(watchlist);
  }, []);

  const FetchShowWatchList = () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const db = getFirestore();
      const usersRef = collection(db, "users");
      if (user) {
        const userDocRef = doc(usersRef, user.uid);
        const subcollectionRef = collection(userDocRef, "tvwatchlist");
        const snapshot = getDocs(subcollectionRef);
        const ml = getDocs(subcollectionRef)
          .then((snapshot) => {
            const tvwatchlistfromfirestore = [];
            snapshot.docs.forEach((doc) => {
              tvwatchlistfromfirestore.push({ ...doc.data(), id: doc.id });
            });
            setWatchlist(tvwatchlistfromfirestore);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        console.log("error");
      }
      return unsubscribe;
    });
  };
  const FetchShowWatchedList = () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const db = getFirestore();
      const usersRef = collection(db, "users");
      if (user) {
        const userDocRef = doc(usersRef, user.uid);
        const subcollectionRef = collection(userDocRef, "tvwatchedlist");
        const snapshot = getDocs(subcollectionRef);
        const ml = getDocs(subcollectionRef)
          .then((snapshot) => {
            const tvwatchlistfromfirestore = [];
            snapshot.docs.forEach((doc) => {
              tvwatchlistfromfirestore.push({ ...doc.data(), id: doc.id });
            });
            setWatched(tvwatchlistfromfirestore);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        console.log("error");
      }
      return unsubscribe;
    });
  };
  const addtolist = (show) => {
    if (watchlist.find((s) => parseInt(s.id) === show.id)) {
      alert("This show is already in your watchlist!");
      return;
    }
    if (watched.find((s) => parseInt(s.id) === show.id)) {
      alert("This show is already in your watched list!");
      return;
    }
    const newList = [...watchlist, show];
    setWatchlist(newList);
    AddShowtoFirestoreWatchList(show);
    console.log(watchlist);
  };
  const removefromlist = (show) => {
    const newlist = watchlist.filter((favourite) => favourite.id !== show.id);
    setWatchlist(newlist);
    RemoveShowfromFirestoreWatchList(show);
  };
  const addtowatchedlist = (show) => {
    if (watched.find((s) => parseInt(s.id) === show.id)) {
      alert("This show is already in your watched list!");
      return;
    }
    const newlist = watchlist.filter((favourite) => favourite.id !== show.id);
    setWatchlist(newlist);
    const newList = [...watched, show];
    setWatched(newList);
    AddShowtoFirestoreWatchedList(show);
    RemoveShowfromFirestoreWatchList(show);
    console.log(watched);
  };
  const removefromwatched = (show) => {
    const newlist = watched.filter((favourite) => favourite.id !== show.id);
    setWatched(newlist);
    RemoveShowfromFirestoreWatchedList(show);
  };
  const logout = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  const gotomoviesapp = () => {
    navigate("/movies");
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <button type="submit" className="btn btn-primary" onClick={logout}>
          Logout
        </button>
        <MovieHeading heading="TV Shows" />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={gotomoviesapp}
        >
          Go to Movies App
        </button>
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={shows}
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

export default TVApp;
