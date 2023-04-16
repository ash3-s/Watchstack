import React from "react";
import "../App.css";

const GameList = (props) => {
  const FavouriteComponent = props.watchlist;
  return (
    <>
      {props.movies.map((movie, index) => (
        <div className="image-containerr d-flex justify-content-start m-1 ml-5 mt-3">
          {movie.background_image ? (
            <div>
              <img src={movie.background_image} alt={`${movie.title}Poster`} />
              <div>
                <span className="movienamee">
                  {movie.title}
                  {movie.name}
                </span>
              </div>
            </div>
          ) : (
            <div>
              <div className="filler-poster"></div>
              <span className="moviename">Game not Available</span>
            </div>
          )}

          <div
            onClick={(event) => {
              event.stopPropagation();
              props.handleoverlayclick(movie);
              console.log(movie);
            }}
            className="overlay d-flex align-items-center justify-content-center"
          >
            <FavouriteComponent />
            <div
              onClick={(event) => {
                event.stopPropagation();
                props.handleoverlayclick2(movie);
              }}
              className="overlay watchedoverlay d-flex align-items-center justify-content-center"
            >
              <>
                <span className="mr-2">Mark as Played</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-check-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                </svg>
              </>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GameList;