import React from "react";
import "../App.css";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

const MovieList = (props) => {
  return (
    <>
      {props.movies.map((movie, index) => (
        <div className="image-container justify-align-content-start m-1 mb-5 ml-4">
          <div>
            {movie.poster_path ? (
              <div className="bor">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={`${movie.title}Poster`}
                />
                <div>
                  <span className="moviename">
                    {movie.title}
                    {movie.name}
                  </span>
                </div>
                <div className="mt-4">
                  <button
                    class="wlbutton"
                    onClick={(event) => {
                      event.stopPropagation();
                      props.handleoverlayclick(movie);
                    }}
                  >
                    Add to Watchlist
                    <PlaylistAddIcon />
                  </button>
                </div>
                <div className="mt-3">
                  <button
                    class="wlbutton2"
                    onClick={(event) => {
                      event.stopPropagation();
                      props.handleoverlayclick2(movie);
                    }}
                  >
                    Mark As Watched <PlaylistAddCheckIcon />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;

/*

<div
            onClick={(event) => {
              event.stopPropagation();
              props.handleoverlayclick(movie);
            }}
            className="overlay d-flex align-items-center justify-content-center "
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
                <span className="mr-2">Mark as Watched</span>
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

          */
