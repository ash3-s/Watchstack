import React from "react";
import "../HeroPage.css";
import "../Getstartedbutton.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Homepage = () => {
  const navigate = useNavigate();

  const navigatetologin = () => {
    navigate("/login");
  };

  const navigatetosignup = () => {
    navigate("/signup");
  };
  return (
    <div className="hero-container">
      <div className="hero-image">
        <img
          src="https://wallpapercave.com/wp/wp10615910.jpg"
          alt="Headerimage"
        />
        <div className="hero-text">
          <h1>Track your backlogs and watchlists, all in one place</h1>
          <p>Wanna start tracking all your stuff? Get started right away!</p>
          <button class="learn-more" onClick={navigatetologin}>
            <span class="circle" aria-hidden="true">
              <span class="icon arrow"></span>
            </span>
            <span class="button-text">Get Started</span>
          </button>
        </div>
        <Navbar>
          <div className="login">
            <button className=" buttonn" onClick={navigatetosignup}>
              Sign up
            </button>
            <button className=" buttonn" onClick={navigatetologin}>
              Login
            </button>
          </div>
        </Navbar>
      </div>
    </div>
  );
};

export default Homepage;
