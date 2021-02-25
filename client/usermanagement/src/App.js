import "./App.css";
import React from "react";
import UserTable from "./Components/UserTable.js";
import Popup from "./Components/Popup.js";
import Pagination from "./Components/Pagination";

function App() {
  return (
    <div>
      <UserTable />;
      <Popup />;
    </div>
  );
}

export default App;
