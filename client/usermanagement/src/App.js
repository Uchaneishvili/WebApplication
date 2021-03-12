import "./App.css";
import React from "react";
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
