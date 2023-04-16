import React from "react";
import "../App.css";

const MovieList2 = (props) => {
  //const FavouriteComponent = props.watchlist;

  return (
    <div>
      {props.movies.length > 0 ? (
        <>
          {props.movies.map((movie, index) => (
            <div className="result-card">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={`${movie.title}Poster`}
                />
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
                  Remove from Watched
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h2 className="no-movies">No items in your list! Add some!</h2>
      )}
    </div>
  );
};

export default MovieList2;
