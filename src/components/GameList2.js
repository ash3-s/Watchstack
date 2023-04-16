import React from "react";
import "../App.css";

const GameList2 = (props) => {
  //const FavouriteComponent = props.watchlist;
  return (
    <>
      {props.movies.map((movie, index) => (
        <div className="result-card">
          {movie.background_image ? (
            <img src={movie.background_image} alt={`${movie.name}Poster`} />
          ) : (
            <div className="filler-poster"></div>
          )}
          <span className="moviename">
            {movie.title}
            {movie.name}
          </span>
          <div>
            <button
              className="bbutton"
              onClick={() => {
                props.handleremovefromwatched(movie);
              }}
            >
              Remove from Played Games
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default GameList2;
