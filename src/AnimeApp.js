import React, { useEffect, useState } from "react";
import MovieList from "./components/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieHeading from "./components/MovieHeading";
import SearchBox from "./components/SearchBox";
import MovieList2 from "./components/MovieList2";
import { auth } from "./config/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  db,
  AddAnimetoFirestoreWatchList,
  RemoveAnimefromFirestoreWatchList,
  AddAnimetoFirestoreWatchedList,
  RemoveAnimefromFirestoreWatchedList,
} from "./config/firebase";
import {
  getDocs,
  collection,
  getFirestore,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import MovieWatchList from "./components/MovieWatchList";
import Navbar from "./components/Navbar";

const AnimeApp = () => {
  const [anime, setAnime] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [watched, setWatched] = useState([]);
  const navigate = useNavigate();
  const users = collection(db, "Users");

  const getMovieRequest = async (searchValue) => {
    const url = `https://api.themoviedb.org/3/search/tv?api_key=f46cc141482b65a1ce4af7ceec09ccd5&language=en-US&page=1&include_adult=false&query=${searchValue}`;

    const Showresponse = await fetch(url);
    const responseJson = await Showresponse.json();
    if (!responseJson.errors) {
      const animeresponse = responseJson.results;
      const animelistresponse = animeresponse.filter(
        (anime) =>
          (parseInt(anime.genre_ids[0]) == 16 &&
            anime.origin_country[0] == "JP") ||
          (parseInt(anime.genre_ids[1]) == 16 &&
            anime.origin_country[0] == "JP")
      );
      setAnime(animelistresponse);
    }
  };
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    FetchAnimeWatchList();
    FetchAnimeWatchedList();
    console.log(watchlist);
  }, []);

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
  const FetchAnimeWatchedList = () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const db = getFirestore();
      const usersRef = collection(db, "users");
      if (user) {
        const userDocRef = doc(usersRef, user.uid);
        const subcollectionRef = collection(userDocRef, "animewatchedlist");
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
            const animewatchlistfromfirestore = [];
            snapshot.docs.forEach((doc) => {
              animewatchlistfromfirestore.push({ ...doc.data(), id: doc.id });
            });
            setWatched(animewatchlistfromfirestore.reverse());
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
  const addtolist = (anime) => {
    if (watchlist.find((a) => parseInt(a.id) === anime.id)) {
      alert("This show is already in your watchlist!");
      return;
    }
    if (watched.find((a) => parseInt(a.id) === anime.id)) {
      alert("This show is already in your watched list!");
      return;
    }
    const newList = [anime, ...watchlist];
    setWatchlist(newList);
    AddAnimetoFirestoreWatchList(anime);
    console.log(watchlist);
  };
  const removefromlist = (anime) => {
    const newlist = watchlist.filter((favourite) => favourite.id !== anime.id);
    setWatchlist(newlist);
    RemoveAnimefromFirestoreWatchList(anime);
  };
  const addtowatchedlist = (anime) => {
    if (watched.find((a) => parseInt(a.id) === anime.id)) {
      alert("This show is already in your watched list!");
      return;
    }
    const newlist = watchlist.filter((favourite) => favourite.id !== anime.id);
    setWatchlist(newlist);
    const newList = [anime, ...watched];
    setWatched(newList);
    AddAnimetoFirestoreWatchedList(anime);
    RemoveAnimefromFirestoreWatchList(anime);
  };
  const removefromwatched = (anime) => {
    const newlist = watched.filter((favourite) => favourite.id !== anime.id);
    setWatched(newlist);
    RemoveAnimefromFirestoreWatchedList(anime);
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
        <button className="buttonn" onClick={() => navigate("/games")}>
          Games
        </button>
        <button className="buttonn" onClick={() => navigate("/movies")}>
          Movies
        </button>
        <button className=" buttonn" onClick={() => navigate("/tv")}>
          TV Shows
        </button>
        <button className="buttonn " onClick={logout}>
          Logout
        </button>
      </Navbar>
      <div className="container-fluid movie-app">
        <div className="row d-flex align-items-center mt-4 mb-4">
          <MovieHeading heading="Anime" />
        </div>
        <div className="row d-flex align-items-center mt-4 mb-4">
          <SearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            type="anime..."
          />
        </div>
        <div className="row">
          <MovieList
            movies={anime}
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

export default AnimeApp;
