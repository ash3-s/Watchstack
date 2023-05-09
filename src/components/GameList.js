import React from "react";
import "../App.css";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

const GameList = (props) => {
  return (
    <>
      {props.movies.map((movie, index) => (
        <div className="image-containerr ml-5 mb-5">
          {movie.background_image ? (
            <div>
              <img
                className="img-container"
                src={movie.background_image}
                alt={`${movie.title}Poster`}
              />
              <div>
                <span className="movienamee">
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
                  Add to Backlog
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
                  Mark As Played
                  <PlaylistAddCheckIcon />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
};

export default GameList;
