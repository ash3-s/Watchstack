import React, { useEffect } from "react";
import Home from "./components/Home";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import MovieApp from "./MovieApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Protected from "./Protected";
import TVApp from "./TVApp";

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
      <Route path="/" element={<Home />} />
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
    </Routes>
  );
};

export default App;
