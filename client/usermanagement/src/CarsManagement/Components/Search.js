import React, { useState } from "react";

function Search(props) {
  const [search, setSearch] = useState();

  return (
    <div>
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
    </div>
  );
}

export default Search;
