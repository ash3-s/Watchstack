import React from "react";
import "../App.css";

const MovieHeading = (props) => {
  return (
    <div className="col ">
      <h1>{props.heading}</h1>
    </div>
  );
};

export default MovieHeading;
