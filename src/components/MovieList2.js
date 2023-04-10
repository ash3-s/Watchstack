import React from "react";
import "../App.css";

const MovieList2 = (props) => {
  //const FavouriteComponent = props.watchlist;
  return (
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
          <div>
            <button
              type="button"
              class="btn btn-primary"
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
  );
};

export default MovieList2;
