import React, { useState } from "react";
import "./Search.css";

function Search(props) {
  const [search, setSearch] = useState();
  const [defaultValue, setDefaultValue] = useState(false);

  const resetSearch = () => {
    props.loadData(1);
    setSearch([]);
    setDefaultValue(true);
  };

  const searchInput = (event) => {
    if (defaultValue) {
      setSearch([]);
    } else {
      setSearch(event.target.value);
    }
  };

  return (
    <div className="SearchContainer">
      <input
        type="text"
        className="form-control SearchInput"
        placeholder="Search..."
        value={search}
        onChange={searchInput}
      />
      <pre>{JSON.stringify(search, null, 2)}</pre>

      <button
        className="btn btn-light custom-button SearchButton"
        type="submit"
        onClick={() => props.loadData(1, search)}
      >
        Search
      </button>
      <button
        className="btn btn-light custom-button ClearButton"
        onClick={resetSearch}
      >
        Clear
      </button>
    </div>
  );
}

export default Search;
