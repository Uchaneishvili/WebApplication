import React from "react";
import "./Search.css";

function Search() {
  return (
    <div className="SearchContainer">
      <input
        type="text"
        class="form-control SearchInput"
        placeholder="Search..."
      />
      <button class="btn btn-light custom-button SearchButton" type="button">
        Search
      </button>
    </div>
  );
}

export default Search;
