import React, { useState } from "react";
import "./Search.css";

function Search(props) {
  const [search, setSearch] = useState();

  return (
    <div className="SearchContainer">
      <input
        type="text"
        className="form-control SearchInput"
        placeholder="Search..."
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <pre>{JSON.stringify(search, null, 2)}</pre>

      <button
        className="btn btn-light custom-button SearchButton"
        type="submit"
        onClick={() => props.loadData(1, search)}
      >
        Search
      </button>
    </div>
  );
}

export default Search;
