import "./App.css";
import React from "react";
import UserTable from "./UserManagement/Components/UserTable.js";
import Popup from "./UserManagement/Components/Popup.js";
import Pagination from "./UserManagement/Components/Pagination";
import Navigation from "./UserManagement/Components/Navigation";
import UserManagement from "./UserManagement/UserManagement";
import CarsManagement from "./CarsManagement/CarsManagement";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Route path="/UserManagement" component={UserManagement} />
        <Route path="/CarsManagement" component={CarsManagement} />
      </Router>
    </div>
  );
}

export default App;
