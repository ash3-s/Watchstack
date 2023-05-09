import React from "react";
import "../App.css";

const GameList2 = (props) => {
  return (
    <>
      {props.movies.length > 0 ? (
        <>
          {props.movies.map((movie, index) => (
            <div className="result-card">
              {movie.background_image ? (
                <img src={movie.background_image} alt={`${movie.name}Poster`} />
              ) : (
                <div className="filler-poster"></div>
              )}
              <span className="moviename mt-4">
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
                  Remove as Played
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h2 className="no-movies mt-4 mb-4">
          No items in your list! Add some!
        </h2>
      )}
    </>
  );
};

export default GameList2;
