import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { db, auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import MovieApp from "../MovieApp";
import {
  Route,
  useNavigate,
  Routes,
  BrowserRouter,
  Redirect,
  Link,
} from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Handlelogin } from "../config/firebase";

const Home = ({ component: Component, ...rest }) => {
  const [email, setEmail] = useState("");
  const state = { Email: "23123213" };
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const userr = auth.currentUser;

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/movies");
      Handlelogin();
      console.log(userr.email);
    } catch (error) {
      console.error();
    }
  };

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/movies");
      Handlelogin();
    } catch (err) {
      console.error(err);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/movies");
    } catch (error) {
      console.error();
    }
  };
  return (
    <div>
      <form>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={signIn}>
          Sign Up
        </button>
      </form>
      <form>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={login}>
          Login
        </button>
      </form>
      <div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
export default Home;
