import React from "react";
import "../App.css";

const MovieList2 = (props) => {
  return (
    <>
      {props.movies.length > 0 ? (
        <>
          {props.movies.map((movie, index) => (
            <div className="result-card ml-4">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`${movie.title}Poster`}
              />
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
                  Remove as Watched
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h2 className="no-movies mt-4">No items in your list! Add some!</h2>
      )}
    </>
  );
};

export default MovieList2;
