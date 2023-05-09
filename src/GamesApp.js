import React, { useEffect, useState } from "react";
import GameList from "./components/GameList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieHeading from "./components/MovieHeading";
import SearchBox from "./components/SearchBox2";
import GameList2 from "./components/GameList2";
import { auth } from "./config/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import {
  db,
  AddGametoFirestoreBacklog,
  RemoveGamefromFirestoreBacklog,
  AddGametoFirestorePlayedList,
  RemoveGamefromFirestorePlayedList,
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

const GamesApp = () => {
  const [games, setGames] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [watched, setWatched] = useState([]);
  const navigate = useNavigate();
  const users = collection(db, "Users");
  /*  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }*/

  const getMovieRequest = async (searchValue) => {
    const url = `https://api.rawg.io/api/games?key=dc8dfd59a1fe4d84a75c1efa345d8a53&search=${searchValue}&page_size=10&search_precise=true`;
    const Movieresponse = await fetch(url);
    const responseJson = await Movieresponse.json();
    //console.log(responseJson);
    if (!responseJson.errors) {
      setGames(responseJson.results);
    }
  };
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    FetchGameBacklog();
    FetchGamePlayedList();
    console.log(watchlist);
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
            const gamebacklogfromfirestore = [];
            snapshot.docs.forEach((doc) => {
              gamebacklogfromfirestore.push({ ...doc.data(), id: doc.id });
            });
            setWatchlist(gamebacklogfromfirestore.reverse());
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
  const FetchGamePlayedList = () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const db = getFirestore();
      const usersRef = collection(db, "users");
      if (user) {
        const userDocRef = doc(usersRef, user.uid);
        const subcollectionRef = collection(userDocRef, "gameplayedlist");
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
            const gameplayedlistfromfirestore = [];
            snapshot.docs.forEach((doc) => {
              gameplayedlistfromfirestore.push({ ...doc.data(), id: doc.id });
            });
            setWatched(gameplayedlistfromfirestore.reverse());
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
  const addtolist = (game) => {
    if (watchlist.find((m) => parseInt(m.id) === game.id)) {
      alert("This Game is already in your Backlog!");
      return;
    }
    if (watched.find((m) => parseInt(m.id) === game.id)) {
      alert("This Game is already in your Played list!");
      return;
    }
    const newList = [game, ...watchlist];
    setWatchlist(newList);
    AddGametoFirestoreBacklog(game);
    console.log(watchlist);
  };
  const removefromlist = (game) => {
    const newlist = watchlist.filter((favourite) => favourite.id !== game.id);
    setWatchlist(newlist);
    RemoveGamefromFirestoreBacklog(game);
  };
  const addtowatchedlist = (game) => {
    if (watched.find((m) => parseInt(m.id) === game.id)) {
      alert("This Game is already in your Played list!");
      return;
    }
    const newlist = watchlist.filter((favourite) => favourite.id !== game.id);
    setWatchlist(newlist);
    const newList = [game, ...watched];
    setWatched(newList);
    AddGametoFirestorePlayedList(game);
    RemoveGamefromFirestoreBacklog(game);
    console.log(watched);
  };
  const removefromwatched = (game) => {
    const newlist = watched.filter((favourite) => favourite.id !== game.id);
    setWatched(newlist);
    RemoveGamefromFirestorePlayedList(game);
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
        {" "}
        <button className="buttonn" onClick={() => navigate("/movies")}>
          Movies
        </button>
        <button className=" buttonn" onClick={() => navigate("/tv")}>
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
        <div className="row d-flex align-items-center mt-4 mb-4">
          <MovieHeading heading="Games" />
        </div>
        <div className="row d-flex align-items-center mt-4 mb-4">
          <SearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            type="games..."
          />
        </div>
        <div className="row">
          <GameList
            movies={games}
            handleoverlayclick={addtolist}
            handleoverlayclick2={addtowatchedlist}
          />
        </div>
        <div className="mt-5">
          <MovieHeading heading="Backlog" />
        </div>
      </div>
      <div className="row ml-3">
        <GameBacklog
          movies={watchlist}
          handleoverlayclick={removefromlist}
          handleoverlayclick2={addtowatchedlist}
        />
      </div>
      <div className="result-card">
        <div className="poster-wrapper">
          <MovieHeading heading="Finished Playing" />
          <GameList2
            movies={watched}
            handleremovefromwatched={removefromwatched}
          />
        </div>
      </div>
    </div>
  );
};

export default GamesApp;
