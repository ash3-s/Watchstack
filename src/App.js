import React, { useEffect } from "react";
import Home from "./components/Home";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import MovieApp from "./MovieApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Protected from "./Protected";
import TVApp from "./TVApp";
import AnimeApp from "./AnimeApp";
import GamesApp from "./GamesApp";
import Homepage from "./components/Homepage";
import Protected2 from "./Protected2";
import "./App.css";
import Signup from "./components/Signup";
import Dashboard from "./Dashboard";

const App = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
    } else {
      //console.log(user);
    }
  });

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="/login"
        element={
          <Protected2>
            <Home />
          </Protected2>
        }
      />
      <Route
        path="/signup"
        element={
          <Protected2>
            <Signup />
          </Protected2>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Protected>
            <Dashboard />
          </Protected>
        }
      />
      <Route
        path="/movies"
        element={
          <Protected>
            <MovieApp />
          </Protected>
        }
      />
      <Route
        path="/tv"
        element={
          <Protected>
            <TVApp />
          </Protected>
        }
      />
      <Route
        path="/anime"
        element={
          <Protected>
            <AnimeApp />
          </Protected>
        }
      />
      <Route
        path="/games"
        element={
          <Protected>
            <GamesApp />
          </Protected>
        }
      />
    </Routes>
  );
};

export default App;
