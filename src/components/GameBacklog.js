import React from "react";
import "../App.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoneIcon from "@mui/icons-material/Done";

const GameBacklog = (props) => {
  return (
    <>
      {props.movies.length > 0 ? (
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

                  <span className="movienamee">
                    {movie.title}
                    {movie.name}
                  </span>

                  <div>
                    <button
                      class="wlbutton2 mt-2"
                      onClick={(event) => {
                        event.stopPropagation();
                        props.handleoverlayclick2(movie);
                      }}
                    >
                      Mark As Played
                      <DoneIcon />
                    </button>
                  </div>
                  <div>
                    <button
                      class="wlbutton3 mt-3"
                      onClick={(event) => {
                        event.stopPropagation();
                        props.handleoverlayclick(movie);
                      }}
                    >
                      Remove from Backlog
                      <DeleteOutlineIcon />
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </>
      ) : (
        <h2 className="no-movies ml-5 mt-4 mb-4">
          No items in your list! Add some!
        </h2>
      )}
    </>
  );
};

export default GameBacklog;
