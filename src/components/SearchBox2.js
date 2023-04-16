import React from "react";
import "../search.css";

const SearchBox2 = (props) => {
  return (
    <div className="search">
      <input
        type="text"
        name="text"
        class="input"
        placeholder="Browse games.."
        value={props.value}
        onChange={(event) => props.setSearchValue(event.target.value)}
      ></input>
    </div>
  );
};

export default SearchBox2;
