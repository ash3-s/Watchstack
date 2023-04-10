import React, { useEffect } from "react";
import Home from "./components/Home";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import MovieApp from "./MovieApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Protected from "./Protected";
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
        path="/home"
        element={
          <Protected>
            <MovieApp />
          </Protected>
        }
      />
    </Routes>
  );
};

export default App;
