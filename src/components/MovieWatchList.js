import React from "react";
import "../App.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";

const MovieWatchList = (props) => {
  return (
    <>
      {props.movies.length > 0 ? (
        <>
          {props.movies.map((movie, index) => (
            <div className="image-container ml-5 mt-4">
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
                  <div>
                    <button
                      class="shadow__btn mt-2"
                      onClick={(event) => {
                        event.stopPropagation();
                        props.handleoverlayclick2(movie);
                      }}
                    >
                      Mark As Watched
                      <DoneIcon />
                    </button>
                  </div>
                  <div>
                    <button
                      class="shadow__btnn mt-2"
                      onClick={(event) => {
                        event.stopPropagation();
                        props.handleoverlayclick(movie);
                      }}
                    >
                      Remove from WatchList
                      <DeleteOutlineIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h2 className="no-movies ml-5 mb-4 mt-4">
          No items in your list! Add some!
        </h2>
      )}
    </>
  );
};

export default MovieWatchList;
