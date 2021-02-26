import React from "react";
import "./Search.css";

function Search() {
  return (
    <div className="SearchContainer">
      <input
        type="text"
        className="form-control SearchInput"
        placeholder="Search..."
      />
      <button
        className="btn btn-light custom-button SearchButton"
        type="button"
      >
        Search
      </button>
    </div>
  );
}

export default Search;
