import React, { useState } from "react";
import "./Search.css";
import { Button, Input } from "antd";

function Search(props) {
  const [searchVal, setSearchVal] = useState("");
  const [defaultValue, setDefaultValue] = useState(false);

  const resetSearch = () => {
    props.loadData(1);
    setSearchVal("");
    setDefaultValue(true);
  };

  const searchInput = (event) => {
    if (defaultValue == "true") {
      setSearchVal("");
    } else {
      setSearchVal(event.target.value);
    }
  };
  return (
    <div>
      <div className="SearchContainer">
        <Input.Search
          className="searchInputAnt"
          enterButton="Search"
          size="large"
          placeholder="Input search text"
          value={searchVal}
          onSearch={() => props.loadData(1, searchVal)}
          onChange={searchInput}
        />

        <Button type="primary" size="large" onClick={resetSearch}>
          Clear
        </Button>
      </div>
    </div>
  );
}

export default Search;
